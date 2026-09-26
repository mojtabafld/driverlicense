// TeoriPrøve server: serves ./site and a small JSON API with per-user accounts.
// Run locally:  node server.js            (data kept in data/db.json)
// In the cloud: set DATABASE_URL (PostgreSQL) so accounts survive redeploys.
// Optional env: PORT, HOST, INVITE_CODE (required to sign up when set), DB_FILE.
'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { openStore } = require('./store');

const PORT = +process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const SITE = path.join(__dirname, 'site');
const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'data', 'db.json');
const INVITE_CODE = (process.env.INVITE_CODE || '').trim();
const SESSION_DAYS = 60;
const MAX_ATTEMPTS = 500;
const MODES = ['random', 'mistakes', 'top'];
const MAX_WORDS = 3000;

const clip = (v, n) => String(v ?? '').trim().slice(0, n);

let store; // set in main()

// ---------- auth helpers ----------
const hashPw = (pw, salt) => crypto.scryptSync(pw, salt, 64).toString('hex');
function checkPw(pw, user) {
  const a = Buffer.from(hashPw(pw, user.salt), 'hex'), b = Buffer.from(user.hash, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
const isHttps = req => (req.headers['x-forwarded-proto'] || '').split(',')[0].trim() === 'https';
const cookie = (req, value, maxAge) =>
  `tp_session=${value}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${isHttps(req) ? '; Secure' : ''}`;

async function newSession(req, res, username) {
  const token = crypto.randomBytes(32).toString('hex');
  const s = { username, exp: Date.now() + SESSION_DAYS * 864e5 };
  store.sessions[token] = s;
  await store.saveSession(token, s);
  res.setHeader('Set-Cookie', cookie(req, token, SESSION_DAYS * 86400));
}
function sessionUser(req) {
  const m = /(?:^|;\s*)tp_session=([a-f0-9]{64})/.exec(req.headers.cookie || '');
  const s = m && store.sessions[m[1]];
  if (!s) return null;
  if (s.exp < Date.now()) {
    delete store.sessions[m[1]];
    store.deleteSession(m[1]).catch(() => {});
    return null;
  }
  const user = store.users[s.username];
  return user ? { token: m[1], user } : null;
}
const publicUser = u => ({ username: u.username, name: u.name, created: u.created });

// Behind App Platform's load balancer the client address is in X-Forwarded-For.
const clientIp = req => (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress;

// Simple rate limit per IP: 10 failures / 10 minutes (login and invite code).
const fails = new Map();
function tooMany(ip) {
  const f = fails.get(ip);
  return f && f.n >= 10 && Date.now() - f.t < 10 * 60e3;
}
function addFail(ip) {
  const f = fails.get(ip);
  if (!f || Date.now() - f.t > 10 * 60e3) fails.set(ip, { n: 1, t: Date.now() });
  else f.n++;
}
function safeEqual(a, b) {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

// ---------- http helpers ----------
function send(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(obj));
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > 256e3) { reject(new Error('too large')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); } catch { reject(new Error('bad json')); } });
    req.on('error', reject);
  });
}
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' };
// The question bank and pictures are only served to signed-in users.
const isProtected = p => p === '/data.js' || p.startsWith('/img/');

function serveStatic(req, res) {
  let p;
  try { p = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { res.writeHead(400); return res.end(); }
  if (p === '/') p = '/index.html';
  if (isProtected(p) && !sessionUser(req)) { res.writeHead(401, { 'Cache-Control': 'no-store' }); return res.end('Sign in first'); }
  const file = path.normalize(path.join(SITE, p));
  if (!file.startsWith(SITE + path.sep)) { res.writeHead(403); return res.end(); }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end('Not found'); }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream', 'Content-Length': st.size,
      'Cache-Control': ext === '.jpg' ? 'private, max-age=604800' : 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).pipe(res);
  });
}

// ---------- API ----------
const USER_RE = /^[a-zA-Z0-9_.-]{3,32}$/;

async function api(req, res, route) {
  const ip = clientIp(req);
  if (req.method === 'GET' && route === 'config') {
    return send(res, 200, { inviteRequired: !!INVITE_CODE });
  }
  if (req.method === 'POST' && route === 'register') {
    if (tooMany(ip)) return send(res, 429, { error: 'تلاش‌های ناموفق زیاد. ۱۰ دقیقه دیگر دوباره امتحان کنید.' });
    const { username, password, name, invite } = await readBody(req);
    if (INVITE_CODE && !safeEqual(String(invite || '').trim(), INVITE_CODE)) {
      addFail(ip);
      return send(res, 403, { error: 'کد دعوت نادرست است.' });
    }
    const u = String(username || '').trim().toLowerCase();
    if (!USER_RE.test(u)) return send(res, 400, { error: 'نام کاربری باید ۳ تا ۳۲ کاراکتر انگلیسی، عدد، نقطه، خط تیره یا زیرخط باشد.' });
    if (typeof password !== 'string' || password.length < 6) return send(res, 400, { error: 'رمز عبور باید حداقل ۶ کاراکتر باشد.' });
    if (store.users[u]) return send(res, 409, { error: 'این نام کاربری قبلاً ثبت شده است.' });
    const salt = crypto.randomBytes(16).toString('hex');
    const user = { username: u, name: String(name || u).trim().slice(0, 40) || u, salt, hash: hashPw(password, salt),
      created: Date.now(), attempts: [], settings: {} };
    store.users[u] = user;
    await store.saveUser(user);
    await newSession(req, res, u);
    return send(res, 200, { user: publicUser(user) });
  }
  if (req.method === 'POST' && route === 'login') {
    if (tooMany(ip)) return send(res, 429, { error: 'تلاش‌های ناموفق زیاد. ۱۰ دقیقه دیگر دوباره امتحان کنید.' });
    const { username, password } = await readBody(req);
    const user = store.users[String(username || '').trim().toLowerCase()];
    if (!user || typeof password !== 'string' || !checkPw(password, user)) {
      addFail(ip);
      return send(res, 401, { error: 'نام کاربری یا رمز عبور اشتباه است.' });
    }
    fails.delete(ip);
    await newSession(req, res, user.username);
    return send(res, 200, { user: publicUser(user) });
  }

  const s = sessionUser(req);
  if (!s) return send(res, 401, { error: 'unauthorized' });
  const user = s.user;

  if (req.method === 'POST' && route === 'logout') {
    delete store.sessions[s.token];
    await store.deleteSession(s.token);
    res.setHeader('Set-Cookie', cookie(req, '', 0));
    return send(res, 200, { ok: true });
  }
  if (req.method === 'GET' && route === 'me') {
    return send(res, 200, { user: publicUser(user), attempts: user.attempts, settings: user.settings || {}, words: user.words || [] });
  }
  if (req.method === 'POST' && route === 'attempts') {
    const b = await readBody(req);
    const items = Array.isArray(b.items) ? b.items.slice(0, 25).map(x => ({
      id: +x.id, ok: !!x.ok, w: Math.max(0, Math.min(4, +x.w || 0)),
      a: Array.isArray(x.a) ? x.a.slice(0, 4).map(v => (v ? 1 : 0)) : undefined, // which statements the user ticked
      m: x.m ? 1 : undefined, // bookmarked ("Gem til senere") during the exam
    })) : [];
    if (!items.length) return send(res, 400, { error: 'empty attempt' });
    const at = { at: Date.now(), secs: Math.max(0, Math.min(36000, +b.secs || 0)), mode: MODES.includes(b.mode) ? b.mode : 'random', items };
    user.attempts.push(at);
    if (user.attempts.length > MAX_ATTEMPTS) user.attempts.splice(0, user.attempts.length - MAX_ATTEMPTS);
    await store.saveUser(user);
    return send(res, 200, { attempt: at });
  }
  if (req.method === 'DELETE' && route === 'attempts') {
    user.attempts = [];
    await store.saveUser(user);
    return send(res, 200, { ok: true });
  }
  // Word bank: POST upserts by the word (case-insensitive), DELETE removes it.
  if (req.method === 'POST' && route === 'words') {
    const b = await readBody(req);
    const w = clip(b.w, 80);
    if (!w) return send(res, 400, { error: 'empty word' });
    user.words = user.words || [];
    const key = w.toLowerCase();
    const old = user.words.find(x => x.w.toLowerCase() === key);
    const entry = {
      w, t: clip(b.t, 200), en: clip(b.en, 200), ctx: clip(b.ctx, 500), ctxFa: clip(b.ctxFa, 500),
      qid: Number.isFinite(+b.qid) ? +b.qid : null, at: old ? old.at : Date.now(),
    };
    if (old) Object.assign(old, entry);
    else {
      if (user.words.length >= MAX_WORDS) return send(res, 400, { error: 'بانک لغات پر است.' });
      user.words.push(entry);
    }
    await store.saveUser(user);
    return send(res, 200, { word: old || entry });
  }
  if (req.method === 'DELETE' && route === 'words') {
    const b = await readBody(req);
    const key = clip(b.w, 80).toLowerCase();
    user.words = (user.words || []).filter(x => x.w.toLowerCase() !== key);
    await store.saveUser(user);
    return send(res, 200, { ok: true });
  }
  if (req.method === 'PUT' && route === 'settings') {
    const b = await readBody(req);
    user.settings = { showFa: !!b.showFa, timer: !!b.timer };
    await store.saveUser(user);
    return send(res, 200, { settings: user.settings });
  }
  send(res, 404, { error: 'not found' });
}

async function main() {
  store = await openStore({ dbFile: DB_FILE });
  http.createServer(async (req, res) => {
    let pathname;
    try { pathname = new URL(req.url, 'http://x').pathname; } catch { res.writeHead(400); return res.end(); }
    const m = /^\/api\/([a-z]+)$/.exec(pathname);
    if (m) {
      try { await api(req, res, m[1]); }
      catch (e) {
        console.error(e);
        if (!res.headersSent) send(res, /json|large/.test(e.message) ? 400 : 500, { error: 'خطای سرور؛ دوباره امتحان کنید.' });
      }
    } else if (req.method === 'GET' || req.method === 'HEAD') serveStatic(req, res);
    else { res.writeHead(405); res.end(); }
  }).listen(PORT, HOST, () => {
    const nets = Object.values(require('node:os').networkInterfaces()).flat().filter(n => n && n.family === 'IPv4' && !n.internal);
    console.log(`TeoriPrøve running:\n  http://localhost:${PORT}`);
    nets.forEach(n => console.log(`  http://${n.address}:${PORT}   (other devices on your Wi-Fi)`));
    if (INVITE_CODE) console.log('  Sign-up requires the invite code (INVITE_CODE).');
  }).on('error', err => {
    if (err.code !== 'EADDRINUSE') throw err;
    console.error(`Port ${PORT} is already in use — TeoriPrøve is probably already running in another terminal tab.\n` +
      `Open http://localhost:${PORT}, or stop the other one first:  kill $(lsof -ti tcp:${PORT} -sTCP:LISTEN)`);
    process.exit(1);
  });
}

main().catch(err => { console.error('Failed to start:', err); process.exit(1); });
