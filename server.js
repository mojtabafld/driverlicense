// TeoriPrøve server: serves ./site and a small JSON API with per-user accounts.
// Run locally:  node server.js            (data kept in data/db.json)
// In the cloud: set DATABASE_URL (PostgreSQL) so accounts survive redeploys.
// Optional env: PORT, HOST, INVITE_CODE (required to sign up when set), DB_FILE,
// ADMIN_USERS (comma-separated usernames that get the admin panel), ANTHROPIC_API_KEY (AI lessons in the review),
// LESSON_AI_MODEL (Claude model for those lessons, default claude-opus-5-5), IMAGE_PROMPT_MODEL and IMAGE_MODEL (the console's
// prompt-writing Claude model and the picture model; defaults claude-opus-5-5 and gpt-image-2-5-sunburst), KIE_API_KEY (new question pictures, admin panel),
// ELEVENLABS_API_KEY (questions read aloud).
// See README.md for all variables.
'use strict';
process.env.TZ = 'Europe/Copenhagen'; // server-side dates (logs, day buckets) in Copenhagen time
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { openStore } = require('./store');
const { getLesson, getSummary, lessonsAvailable, isCurrentLesson, isCurrentSummary } = require('./lesson');
const imagegen = require('./imagegen');
const guideref = require('./guideref');
const consolepics = require('./consolepics');
const tts = require('./tts');
const Anthropic = require('@anthropic-ai/sdk');

const PORT = +process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const SITE = path.join(__dirname, 'site');
const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'data', 'db.json');
// Invite codes are temporarily switched off: sign-up is open and the form has no invite field.
// Set INVITE_PAUSED back to false to require INVITE_CODE again.
const INVITE_PAUSED = true;
const INVITE_CODE = INVITE_PAUSED ? '' : (process.env.INVITE_CODE || '').trim();
const SESSION_DAYS = 60;
const MAX_ATTEMPTS = 500;
const MODES = ['random', 'mistakes', 'top', 'lesson', 'sections']; // lesson: one of prove.dk's 44 tests, in its order; sections: random questions from chosen official sections
const lessonOf = b => (b.mode === 'lesson' && Number.isInteger(+b.lesson) && +b.lesson > 0 ? { lesson: +b.lesson } : {});
const MAX_WORDS = 3000;
const MAX_SAVED = 1000; // bookmarked questions per user
const MAX_LESSON_DRAFTS = 100; // unfinished lessons per user (there are 44)
const ADMINS = new Set((process.env.ADMIN_USERS || '').split(',').map(u => u.trim().toLowerCase()).filter(Boolean));
const isAdmin = u => ADMINS.has(u.username);

const clip = (v, n) => String(v ?? '').trim().slice(0, n);

// Version of what is live: a hash of the question bank and the app's web version (its index.html names its bundles);
// /api/config reports it to check what is live.
const VERSION = crypto.createHash('sha256')
  .update([path.join(SITE, 'data.js'), path.join(__dirname, 'app-web', 'index.html')].map(f => fs.readFileSync(f)).join('\0'))
  .digest('hex').slice(0, 8);
// The admin's console at /console (console/index.html): only the comparison of the teaching pictures with prove.dk's.
const CONSOLE_HTML = fs.readFileSync(path.join(__dirname, 'console', 'index.html'));

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
  return token;
}
// The mobile app (X-Client: app) gets its session token in the response and sends it back as
// "Authorization: Bearer <token>"; the web site keeps using the HttpOnly cookie only.
const isApp = req => req.headers['x-client'] === 'app';
function sessionUser(req) {
  // Every credential the request carries, in this order: the app's own token (Bearer), the token of a picture in the
  // app's web version (an <img> or <audio> cannot send headers: ?t=<token>, only for /img/ and /api/tts), then the site's cookie. The first one
  // that is a live session wins, so a leftover cookie (e.g. one whose session was signed out) never blocks a valid token.
  const url = new URL(req.url, 'http://x');
  const tokens = [
    (/^Bearer ([a-f0-9]{64})$/.exec(req.headers.authorization || '') || [])[1],
    /^\/(img\/|api\/(tts|avatar)$)/.test(url.pathname) ? (/^([a-f0-9]{64})$/.exec(url.searchParams.get('t') || '') || [])[1] : undefined,
    (/(?:^|;\s*)tp_session=([a-f0-9]{64})/.exec(req.headers.cookie || '') || [])[1],
  ].filter(Boolean);
  for (const token of tokens) {
    const s = store.sessions[token];
    if (!s) continue;
    if (s.exp < Date.now()) {
      delete store.sessions[token];
      store.deleteSession(token).catch(() => {});
      continue;
    }
    const user = store.users[s.username];
    if (user) return { token, user };
  }
  return null;
}
// avatar: { preset: n } (one of the made pictures) or { photo: version } (their own, at GET /api/avatar), or none.
const publicUser = u => ({ username: u.username, name: u.name, created: u.created, admin: isAdmin(u) || undefined, avatar: u.avatar || undefined });

// ---------- usage tracking & admin stats ----------
// Days are counted in Danish time.
const dayFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Copenhagen', year: 'numeric', month: '2-digit', day: '2-digit' });
const dayKey = t => dayFmt.format(new Date(t)); // YYYY-MM-DD
// Remember on which days a user was active (at most one save per user per day).
async function touch(user) {
  user.lastSeen = Date.now();
  const d = dayKey(user.lastSeen);
  if (user.lastDay === d) return;
  user.lastDay = d;
  user.days = [...(user.days || []).filter(x => x !== d).slice(-399), d];
  await store.saveUser(user);
}
// ---------- site visits (admin panel) ----------
// A visit is a load of the page itself (not API calls, pictures or health checks), bots excluded. Unique
// visitors are counted with a salted hash of IP + browser that changes every day; no IP is stored.
// Counts are kept per Copenhagen hour for 31 days and per day for 400 days, saved (debounced) in store.meta.visits.
const hourFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Copenhagen', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23' });
const hourKey = t => { const p = Object.fromEntries(hourFmt.formatToParts(new Date(t)).map(x => [x.type, x.value])); return `${p.year}-${p.month}-${p.day} ${p.hour}`; };
const BOT_RE = /bot|crawl|spider|slurp|preview|facebookexternalhit|curl|wget|python|httpclient|headless|monitor|uptime/i;
let visits, visitSets, visitTimer = null;
function loadVisits() {
  const v = store.meta.visits || {};
  visits = { salt: v.salt || crypto.randomBytes(16).toString('hex'), days: v.days || {}, hours: v.hours || {}, today: v.today || '', dayIds: v.dayIds || [], hourIds: v.hourIds || {} };
  visitSets = { day: new Set(visits.dayIds), hour: Object.fromEntries(Object.entries(visits.hourIds).map(([h, ids]) => [h, new Set(ids)])) };
}
function saveVisits(now = false) {
  if (visitTimer && !now) return;
  clearTimeout(visitTimer); visitTimer = null;
  const write = () => {
    visitTimer = null;
    visits.dayIds = [...visitSets.day];
    visits.hourIds = Object.fromEntries(Object.entries(visitSets.hour).map(([h, set]) => [h, [...set]]));
    return store.saveMeta('visits', visits).catch(e => console.error('saving visits failed', e));
  };
  if (now) return write();
  visitTimer = setTimeout(write, 30e3);
}
function recordVisit(req) {
  if (BOT_RE.test(req.headers['user-agent'] || '')) return;
  const now = Date.now(), d = dayKey(now), h = hourKey(now);
  if (visits.today !== d) { // new day: forget yesterday's visitor ids, drop old counts
    visits.today = d; visitSets.day = new Set(); visitSets.hour = {};
    const minHour = hourKey(now - 31 * 864e5), minDay = dayKey(now - 400 * 864e5);
    for (const k of Object.keys(visits.hours)) if (k < minHour) delete visits.hours[k];
    for (const k of Object.keys(visits.days)) if (k < minDay) delete visits.days[k];
  }
  const id = crypto.createHash('sha256').update(`${visits.salt}|${d}|${clientIp(req)}|${req.headers['user-agent'] || ''}`).digest('hex').slice(0, 12);
  const day = visits.days[d] = visits.days[d] || { v: 0, u: 0 };
  const hour = visits.hours[h] = visits.hours[h] || { v: 0, u: 0 };
  day.v++; hour.v++;
  if (!visitSets.day.has(id)) { visitSets.day.add(id); day.u++; }
  const hs = visitSets.hour[h] = visitSets.hour[h] || new Set();
  if (!hs.has(id)) { hs.add(id); hour.u++; }
  saveVisits();
}

const REPORTS_KEPT = 500, REPORTS_PER_HOUR = 10, reportTimes = new Map(); // bug reports from the app
const FULL = 25, PASS_MIN = 20;
const scoreOf = a => a.items.filter(x => x.ok).length;
function adminStats() {
  const now = Date.now(), today = dayKey(now), DAYS = 30;
  const keys = Array.from({ length: DAYS }, (_, i) => dayKey(now - (DAYS - 1 - i) * 864e5));
  const perDay = Object.fromEntries(keys.map(k => [k, { day: k, tests: 0, active: 0, newUsers: 0 }]));
  const last7 = new Set(keys.slice(-7));
  const t = { users: 0, newToday: 0, new7: 0, activeToday: 0, active7: 0, testsToday: 0, tests7: 0, tests: 0, full: 0, passed: 0,
    correct30: 0, items30: 0, words: 0, drafts: 0, lang: { da: 0, en: 0, none: 0 } };
  const users = [];
  for (const u of Object.values(store.users)) {
    t.users++;
    const created = dayKey(u.created);
    if (perDay[created]) perDay[created].newUsers++;
    if (created === today) t.newToday++;
    if (last7.has(created)) t.new7++;
    const active = new Set(u.days || []);
    let last = u.lastSeen || u.created, testsToday = 0, tests7 = 0, passed = 0, full = 0;
    for (const a of u.attempts) {
      const d = dayKey(a.at);
      active.add(d); last = Math.max(last, a.at); t.tests++;
      if (perDay[d]) { perDay[d].tests++; t.correct30 += scoreOf(a); t.items30 += a.items.length; }
      if (d === today) { t.testsToday++; testsToday++; }
      if (last7.has(d)) { t.tests7++; tests7++; }
      if (a.items.length >= FULL) { full++; if (scoreOf(a) >= PASS_MIN) passed++; }
    }
    for (const d of active) if (perDay[d]) perDay[d].active++;
    if (active.has(today)) t.activeToday++;
    if ([...last7].some(d => active.has(d))) t.active7++;
    t.full += full; t.passed += passed; t.words += (u.words || []).length; if (u.draft) t.drafts++;
    t.lang[(u.settings || {}).lang || 'none']++;
    const lastA = u.attempts[u.attempts.length - 1];
    users.push({ username: u.username, name: u.name, created: u.created, lastActive: last, activeDays: active.size,
      tests: u.attempts.length, testsToday, tests7, full, passed, words: (u.words || []).length, lang: (u.settings || {}).lang || null,
      lastPct: lastA ? Math.round(scoreOf(lastA) / lastA.items.length * 100) : null });
  }
  users.sort((a, b) => b.lastActive - a.lastActive);
  const vd = k => visits.days[k] || { v: 0, u: 0 };
  const visitDays = keys.map(k => ({ day: k, ...vd(k) }));
  t.visitsToday = vd(today).v; t.visitorsToday = vd(today).u;
  t.visits7 = visitDays.slice(-7).reduce((a, x) => a + x.v, 0); t.visits30 = visitDays.reduce((a, x) => a + x.v, 0);
  return { totals: t, days: keys.map(k => perDay[k]), users, visitDays, visitHours: visits.hours };
}

// Behind App Platform the client address is in DO-Connecting-IP, which its edge sets itself. X-Forwarded-For is not
// used: its first entry is whatever the client sent, so trusting it let anyone dodge the sign-in rate limit.
const clientIp = req => String(req.headers['do-connecting-ip'] || '').trim() || req.socket.remoteAddress;

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

// The app's web version (mobile/, built into app-web/ with `npm run build:web`) is the site at the root: a
// single-page app, so a path that is no file of it (and nothing else of the server's) gets its index.html; its hashed
// bundles are cached for a year. The same app is built a second time with the base path /app (app-web-app/) and
// served at /app/: that copy shows prove.dk's own pictures (PROVE_PICS in mobile/src/lib/config.ts).
const APP_MIME = { ...MIME, '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.map': 'application/json' };
const WEBS = {
  root: { dir: path.join(__dirname, 'app-web') },
  // Its page links the manifest and the icon of /app (its own start page), and its manifest is that of the root's
  // with /app/ as start and scope.
  app: { dir: path.join(__dirname, 'app-web-app'), base: '/app',
    page: b => Buffer.from(b.toString('utf8').replace('href="/manifest.webmanifest"', 'href="/app/manifest.webmanifest"')),
    manifest: () => { const m = JSON.parse(fs.readFileSync(path.join(__dirname, 'app-web', 'manifest.webmanifest'), 'utf8')); return Buffer.from(JSON.stringify({ ...m, start_url: '/app/', scope: '/app/' })); } },
};
function serveAppWeb(req, res, p, web = WEBS.root) {
  const dir = web.dir, index = path.join(dir, 'index.html');
  if (web.manifest && p === '/manifest.webmanifest') {
    res.writeHead(200, { 'Content-Type': APP_MIME['.webmanifest'], 'Cache-Control': 'public, max-age=86400' });
    return res.end(req.method === 'HEAD' ? undefined : web.manifest());
  }
  let file = path.normalize(path.join(dir, p));
  if (file !== dir && !file.startsWith(dir + path.sep)) { res.writeHead(403); return res.end(); }
  fs.stat(file, (err, st) => {
    const isIndex = err || !st.isFile() || file === index;
    if (isIndex) file = index;
    if (isIndex && req.method === 'GET') recordVisit(req);
    fs.readFile(file, (e, buf) => {
      if (e) { res.writeHead(404); return res.end('Not found'); }
      if (isIndex && web.page) buf = web.page(buf);
      res.writeHead(200, {
        'Content-Type': APP_MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': isIndex ? 'no-store' : p.includes('/_expo/static/') ? 'public, max-age=31536000, immutable' : 'public, max-age=86400',
        'X-Content-Type-Options': 'nosniff',
      });
      res.end(req.method === 'HEAD' ? undefined : buf);
    });
  });
}

function serveStatic(req, res) {
  let p;
  try { p = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { res.writeHead(400); return res.end(); }
  // The admin's console (its page; it signs in and reads /api/guideref itself).
  if (p === '/console' || p === '/console/') {
    res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY' });
    return res.end(req.method === 'HEAD' ? undefined : CONSOLE_HTML);
  }
  // The app's copy with prove.dk's pictures at /app/.
  if (p === '/app') { res.writeHead(301, { Location: '/app/' }); return res.end(); }
  if (p.startsWith('/app/')) return serveAppWeb(req, res, p.slice(4), WEBS.app);
  // The app at the root (everything that is not the API's or a shared file).
  if (!p.startsWith('/img/') && p !== '/data.js' && !p.startsWith('/intro/') && !p.startsWith('/learn-art/') && !p.startsWith('/avatar-art/') && !p.startsWith('/guide-art/')) return serveAppWeb(req, res, p);
  // The app's intro pictures (made by imagegen.js), open to everyone: the intro comes before signing in.
  // The pictures of the «آموزش» tab's cards (made by imagegen.js), served the same way.
  // And the profile pictures to choose from.
  const im = /^\/intro\/([1-9])\.png$/.exec(p), lm = /^\/learn-art\/([1-4])\.png$/.exec(p), am = /^\/avatar-art\/([1-9]|10)\.png$/.exec(p),
    gm2 = /^\/guide-art\/([a-z0-9-]{3,40})\.png$/.exec(p);
  if (im || lm || am || gm2) {
    return (im ? imagegen.introBlob(im[1]) : lm ? imagegen.learnBlob(lm[1]) : am ? imagegen.avatarBlob(am[1]) : guideref.blob(gm2[1])).then(b => {
      if (!b) { res.writeHead(404); return res.end(); }
      // (A sign chosen from prove.dk can be SVG: shown as a picture only, nothing in it runs.)
      res.writeHead(200, { 'Content-Type': b.mime, 'Content-Length': b.data.length, 'Cache-Control': 'public, max-age=2592000', 'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; img-src data:" });
      res.end(req.method === 'HEAD' ? undefined : b.data);
    }).catch(() => { res.writeHead(500); res.end(); });
  }
  if (isProtected(p) && !sessionUser(req)) { res.writeHead(401, { 'Cache-Control': 'no-store' }); return res.end('Sign in first'); }
  // The admin's picture comparison (guideref.js): the made picture, prove.dk's copy and the official drawing, admin only.
  const rm = /^\/img\/guideref\/(ai|prove|official|cand)\/([a-z0-9-]{3,40})$/.exec(p);
  if (rm) {
    const sess = sessionUser(req);
    if (!sess || !isAdmin(sess.user)) { res.writeHead(403); return res.end(); }
    return guideref.refBlob(rm[1], rm[2]).then(b => {
      if (!b) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': b.mime, 'Content-Length': b.data.length, 'Cache-Control': 'private, max-age=300', 'X-Content-Type-Options': 'nosniff' });
      res.end(req.method === 'HEAD' ? undefined : b.data);
    }).catch(() => { res.writeHead(500); res.end(); });
  }
  // prove.dk's picture of a sign or a right-of-way item, for the app's copy at /app (signed-in users, like the questions').
  const pm = /^\/img\/guideprove\/([a-z0-9-]{3,40})\.png$/.exec(p);
  if (pm) {
    return guideref.refBlob('prove', pm[1]).then(b => {
      if (!b) { res.writeHead(404); return res.end(); }
      // (prove.dk's signs are SVG: shown as pictures only, nothing in them runs.)
      res.writeHead(200, { 'Content-Type': b.mime, 'Content-Length': b.data.length, 'Cache-Control': 'private, max-age=604800', 'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; img-src data:" });
      res.end(req.method === 'HEAD' ? undefined : b.data);
    }).catch(() => { res.writeHead(500); res.end(); });
  }
  // A question picture replaced by a generated one (the original file stays; ?orig=1 still shows it), and the generated
  // versions themselves at /img/gen/<qid>/<job> for the admin panel.
  const qm = /^\/img\/q(\d+)\.jpg$/.exec(p), gm = /^\/img\/gen\/(\d+)\/([a-z0-9]+)$/.exec(p);
  if (gm || (qm && !new URL(req.url, 'http://x').searchParams.has('orig'))) {
    return (gm ? imagegen.jobBlob(gm[1], gm[2]) : imagegen.activeBlob(qm[1])).then(b => {
      if (!b) { if (gm) { res.writeHead(404); return res.end(); } return serveFile(req, res, p); }
      res.writeHead(200, { 'Content-Type': b.mime, 'Content-Length': b.data.length, 'Cache-Control': 'private, max-age=604800', 'X-Content-Type-Options': 'nosniff' });
      res.end(req.method === 'HEAD' ? undefined : b.data);
    }).catch(() => serveFile(req, res, p));
  }
  return serveFile(req, res, p);
}

function serveFile(req, res, p) {
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
    return send(res, 200, { inviteRequired: !!INVITE_CODE, version: VERSION, aiLessons: lessonsAvailable(), tts: tts.available(), intro: imagegen.introVersions(), introBg: imagegen.introColours(), learnArt: imagegen.learnVersions(), avatarArt: imagegen.avatarVersions(),
      // ?pics=prove (the app's copy at /app): prove.dk's pictures of the signs and right of way wherever they are copied in.
      guideArt: new URL(req.url, 'http://x').searchParams.get('pics') === 'prove' ? guideref.proveVersions() : guideref.versions() });
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
    // Any password is accepted (no length or character rules); only an empty one is refused.
    if (typeof password !== 'string' || !password.length) return send(res, 400, { error: 'رمز عبور را وارد کنید.' });
    if (store.users[u]) return send(res, 409, { error: 'این نام کاربری قبلاً ثبت شده است.' });
    const salt = crypto.randomBytes(16).toString('hex');
    const user = { username: u, name: String(name || u).trim().slice(0, 40) || u, salt, hash: hashPw(password, salt),
      created: Date.now(), attempts: [], settings: {} };
    store.users[u] = user;
    await store.saveUser(user);
    const token = await newSession(req, res, u);
    return send(res, 200, { user: publicUser(user), ...(isApp(req) ? { token } : {}) });
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
    const token = await newSession(req, res, user.username);
    return send(res, 200, { user: publicUser(user), ...(isApp(req) ? { token } : {}) });
  }

  // kie.ai calls this when a picture is ready; the body is not trusted, it only makes the server check its jobs now.
  if (req.method === 'POST' && route === 'kiecallback') { imagegen.poll().catch(() => {}); return send(res, 200, { ok: true }); }

  const s = sessionUser(req);
  if (!s) return send(res, 401, { error: 'unauthorized' });
  const user = s.user;
  await touch(user);

  if (req.method === 'POST' && route === 'logout') {
    // The session used, and the cookie's one too when it differs: signing out leaves neither behind.
    const ck = /(?:^|;\s*)tp_session=([a-f0-9]{64})/.exec(req.headers.cookie || '');
    for (const t of new Set([s.token, ck && ck[1]].filter(Boolean))) { delete store.sessions[t]; await store.deleteSession(t); }
    res.setHeader('Set-Cookie', cookie(req, '', 0));
    return send(res, 200, { ok: true });
  }
  // The account: { name } changes the shown name; { current, password } the password, only with the current one
  // (failed tries count like failed sign-ins); the username never changes. A new password signs out the user's
  // other sessions.
  if (req.method === 'PUT' && route === 'account') {
    const b = await readBody(req);
    if (b.name !== undefined) {
      const name = String(b.name || '').trim().slice(0, 40);
      if (!name) return send(res, 400, { error: 'نام را وارد کنید.' });
      user.name = name;
    }
    if (b.password !== undefined) {
      if (tooMany(ip)) return send(res, 429, { error: 'تلاش‌های ناموفق زیاد. ۱۰ دقیقه دیگر دوباره امتحان کنید.' });
      if (typeof b.current !== 'string' || !checkPw(b.current, user)) { addFail(ip); return send(res, 403, { error: 'رمز عبور فعلی درست نیست.' }); }
      if (typeof b.password !== 'string' || !b.password.length) return send(res, 400, { error: 'رمز عبور جدید را وارد کنید.' });
      user.salt = crypto.randomBytes(16).toString('hex'); user.hash = hashPw(b.password, user.salt);
      for (const [t, x] of Object.entries(store.sessions)) if (x.username === user.username && t !== s.token) { delete store.sessions[t]; await store.deleteSession(t); }
    }
    await store.saveUser(user);
    return send(res, 200, { user: publicUser(user) });
  }
  // Profile picture: { preset: n } (one of the made pictures), { image: base64 JPEG } (their own, cropped and made
  // small by the app; kept in blob avatar-<username>) or { remove: true }. GET returns their own picture.
  if (route === 'avatar') {
    const key = `avatar-${user.username}`;
    if (req.method === 'GET') {
      const b = user.avatar && user.avatar.photo ? await store.getBlob(key) : null;
      if (!b) return send(res, 404, { error: 'not found' });
      res.writeHead(200, { 'Content-Type': b.mime, 'Content-Length': b.data.length, 'Cache-Control': 'private, max-age=2592000', 'X-Content-Type-Options': 'nosniff' });
      return res.end(b.data);
    }
    if (req.method === 'POST') {
      const b = await readBody(req);
      if (b.remove) { if (user.avatar && user.avatar.photo) await store.deleteBlob(key).catch(() => {}); delete user.avatar; }
      else if (b.preset !== undefined) {
        const n = +b.preset;
        if (!Number.isInteger(n) || n < 1 || n > imagegen.avatarCount) return send(res, 400, { error: 'تصویر نامعتبر است.' });
        if (user.avatar && user.avatar.photo) await store.deleteBlob(key).catch(() => {});
        user.avatar = { preset: n };
      } else {
        const data = Buffer.from(String(b.image || '').replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const jpeg = data.length > 3 && data[0] === 0xff && data[1] === 0xd8, png = data.length > 8 && data.readUInt32BE(0) === 0x89504e47;
        if (!jpeg && !png) return send(res, 400, { error: 'تصویر نامعتبر است.' });
        if (data.length > 180e3) return send(res, 413, { error: 'تصویر خیلی بزرگ است.' });
        await store.saveBlob(key, jpeg ? 'image/jpeg' : 'image/png', data);
        user.avatar = { photo: Date.now().toString(36) };
      }
      await store.saveUser(user);
      return send(res, 200, { user: publicUser(user) });
    }
  }
  // AI lesson for one reviewed question: { qid, a: ticks per statement (optional), lang }.
  // AI lessons and summaries made while reviewing a past exam (`at`) are also linked to that exam
  // (attempt.ai: cache keys, not the texts), so reviewing it again shows them without a new AI call,
  // even after the exam language or the cache version changes.
  const attemptAt = at => (Number.isFinite(+at) && +at > 0 ? user.attempts.find(a => a.at === +at) : null);
  const linkAi = async (att, slot, key) => {
    att.ai = att.ai || {};
    if (slot === 's') { if (att.ai.s === key) return; att.ai.s = key; }
    else { att.ai.q = att.ai.q || {}; if (att.ai.q[slot] === key) return; att.ai.q[slot] = key; }
    await store.saveUser(user);
  };
  if (req.method === 'POST' && route === 'lesson') {
    const b = await readBody(req);
    const qid = +b.qid, att = attemptAt(b.at);
    const ref = att && att.ai && att.ai.q && att.ai.q[qid];
    if (ref && store.meta[ref] && isCurrentLesson(SITE, qid, ref)) return send(res, 200, { text: store.meta[ref].text });
    try {
      const lesson = await getLesson({ store, siteDir: SITE, username: user.username, qid, ticks: Array.isArray(b.a) ? b.a.slice(0, 4) : null, lang: b.lang });
      if (att && att.items.some(it => it.id === qid)) await linkAi(att, qid, lesson.key);
      return send(res, 200, { text: lesson.text });
    } catch (e) {
      if (e instanceof Anthropic.APIError) { console.error('lesson API error', e.status, e.message); return send(res, 502, { error: 'آموزش هوش مصنوعی الان در دسترس نیست.' }); }
      if (e.status) return send(res, e.status, { error: e.message });
      throw e;
    }
  }
  // AI summary of the mistakes of a whole exam or lesson: [{ id, a }] of the wrongly answered questions.
  if (req.method === 'POST' && route === 'summary') {
    const b = await readBody(req);
    const items = Array.isArray(b.items) ? b.items.slice(0, 25).filter(x => x && Array.isArray(x.a)).map(x => ({ id: +x.id, a: x.a.slice(0, 4), n: +x.n || undefined })) : [];
    if (!items.length) return send(res, 400, { error: 'no mistakes' });
    const att = attemptAt(b.at), ref = att && att.ai && att.ai.s;
    if (ref && store.meta[ref] && isCurrentSummary(SITE, items, ref)) return send(res, 200, { text: store.meta[ref].text });
    try {
      const summary = await getSummary({ store, siteDir: SITE, username: user.username, items, lang: b.lang });
      if (att) await linkAi(att, 's', summary.key);
      return send(res, 200, { text: summary.text });
    } catch (e) {
      if (e instanceof Anthropic.APIError) { console.error('summary API error', e.status, e.message); return send(res, 502, { error: 'جمع‌بندی هوش مصنوعی الان در دسترس نیست.' }); }
      if (e.status) return send(res, e.status, { error: e.message });
      throw e;
    }
  }
  // New question pictures (admin): list, start one (qid, model, optional edited prompt), write a description only,
  // choose which picture is shown (job id or null = original).
  if (['imggen', 'imggenstart', 'imggenset', 'imggendraft', 'imggenedit', 'imggendel'].includes(route)) {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    try {
      if (req.method === 'GET' && route === 'imggen') return send(res, 200, imagegen.list());
      const b = await readBody(req);
      // `pick` (the console): the new picture is only shown once the admin chooses it.
      if (req.method === 'POST' && route === 'imggenstart') return send(res, 200, { job: await imagegen.start(+b.qid, b.model, user.username, b.prompt, '', !!b.pick) });
      if (req.method === 'POST' && route === 'imggenedit') return send(res, 200, { job: await imagegen.edit(+b.qid, b.job, b.text, b.model, user.username) });
      if (req.method === 'POST' && route === 'imggendel') { await imagegen.remove(+b.qid, b.job); return send(res, 200, imagegen.list()); }
      // `part`: the console's part the question is in (lessons: realistic; rules: the illustration style).
      if (req.method === 'POST' && route === 'imggendraft') return send(res, 200, { prompt: await imagegen.draft(+b.qid, b.part === 'rules' ? 'rules' : 'lessons') });
      if (req.method === 'POST' && route === 'imggenset') { await imagegen.setActive(+b.qid, b.job || null); return send(res, 200, imagegen.list()); }
    } catch (e) { if (e.status) return send(res, e.status, { error: e.message }); throw e; }
  }
  // A question and its statements read aloud (ElevenLabs), as MP3: ?qid=<id>&lang=da|en&voice=woman|man; with
  // ?sample=1 (no qid) the voice's short sample line, for choosing it in the settings; with ?ai=<id> an AI text's
  // recording made by POST /api/ttsai.
  if (req.method === 'GET' && route === 'tts') {
    const u = new URL(req.url, 'http://x');
    try {
      const b = u.searchParams.has('ai') ? await tts.getAi({ store, id: u.searchParams.get('ai') })
        : await tts.get({ store, siteDir: SITE, qid: u.searchParams.get('qid'), lang: u.searchParams.get('lang'), gender: u.searchParams.get('voice'),
          sample: u.searchParams.get('sample') === '1', username: user.username });
      res.writeHead(200, { 'Content-Type': b.mime, 'Content-Length': b.data.length, 'Cache-Control': 'private, max-age=2592000', 'Accept-Ranges': 'none' });
      return res.end(b.data);
    } catch (e) { if (e.status) return send(res, e.status, { error: e.message }); throw e; }
  }
  // An AI analysis or summary read aloud in Persian: { text } (the text exactly as the server wrote it) → { id }.
  if (req.method === 'POST' && route === 'ttsai') {
    const b = await readBody(req);
    try { return send(res, 200, { id: await tts.prepareAi({ store, text: b.text, username: user.username }) }); }
    catch (e) { if (e.status) return send(res, e.status, { error: e.message }); throw e; }
  }
  // Comparing the teaching pictures with prove.dk's (admin): the list, copying the reference pictures in, and choosing
  // the official drawing (or the made picture) for a sign.
  // guidedraft { key } → { prompt } (Claude), guidegen { key, prompt }: a new picture for an item, to choose with
  // guiderefchoose { key, choice: 'cand' }.
  if (['guideref', 'guiderefimport', 'guiderefchoose', 'guidedraft', 'guidegen'].includes(route)) {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    try {
      if (req.method === 'GET' && route === 'guideref') return send(res, 200, { ...guideref.list(), models: imagegen.models(), marks: store.meta.consoleMarks || {} });
      if (req.method === 'POST' && route === 'guiderefimport') { guideref.startImport(); return send(res, 200, guideref.list()); }
      if (req.method === 'POST' && route === 'guiderefchoose') { const b = await readBody(req); await guideref.choose(String(b.key || ''), b.choice); return send(res, 200, guideref.list()); }
      if (req.method === 'POST' && route === 'guidedraft') { const b = await readBody(req); return send(res, 200, { prompt: await guideref.draft(String(b.key || '')) }); }
      if (req.method === 'POST' && route === 'guidegen') { const b = await readBody(req); return send(res, 200, { job: await guideref.generate(String(b.key || ''), b.prompt) }); }
    } catch (e) { if (e.status) return send(res, e.status, { error: e.message }); throw e; }
  }
  // The questions' pictures for the console, by lesson or by the parts of «قوانین» (?kind=lessons|rules).
  if (req.method === 'GET' && route === 'consolepics') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    return send(res, 200, { ...consolepics.list(new URL(req.url, 'http://x').searchParams.get('kind') === 'rules' ? 'rules' : 'lessons', store.meta.images || {}), models: imagegen.models(), marks: store.meta.consoleMarks || {} });
  }
  // The prompt an item's current AI picture was made from (?id=q:<qid>|g:<key>), and the console's «اصلاح تصویر»:
  // { id, note (Persian), part, prompt? } → { prompt } with the correction worked in.
  if (req.method === 'GET' && route === 'consoleprompt') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    const id = String(new URL(req.url, 'http://x').searchParams.get('id') || '');
    if (!/^(q:\d{1,6}|g:[a-z0-9-]{3,40})$/.test(id)) return send(res, 400, { error: 'bad id' });
    return send(res, 200, { prompt: id[0] === 'q' ? imagegen.questionPrompt(id.slice(2)) : imagegen.guidePromptNow(id.slice(2)) });
  }
  if (req.method === 'POST' && route === 'consolefix') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    const b = await readBody(req), id = String(b.id || '');
    if (!/^(q:\d{1,6}|g:[a-z0-9-]{3,40})$/.test(id)) return send(res, 400, { error: 'bad id' });
    const part = id[0] === 'g' ? (id.startsWith('g:p-') ? 'priority' : 'signs') : b.part === 'rules' ? 'rules' : 'lessons';
    // `prompt`: a prompt being edited in the console (e.g. a fresh draft); else the current picture's.
    const given = typeof b.prompt === 'string' ? b.prompt.trim().slice(0, 20000) : '';
    const prompt = given || (id[0] === 'q' ? imagegen.questionPrompt(id.slice(2)) : imagegen.guidePromptNow(id.slice(2)));
    try { return send(res, 200, { prompt: await imagegen.fixPrompt(prompt, b.note, part) }); }
    catch (e) { if (e.status) return send(res, e.status, { error: e.message }); throw e; }
  }
  // Every marked item in full, newest mark first, for the console's «علامت‌دارها».
  if (req.method === 'GET' && route === 'consolemarked') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    const marks = store.meta.consoleMarks || {}, items = [];
    for (const [id, m] of Object.entries(marks).sort((a, b) => b[1].at - a[1].at)) {
      const d = id[0] === 'q' ? consolepics.detail(id.slice(2), store.meta.images || {}) : guideref.item(id.slice(2));
      if (d) items.push({ ...d, id, mark: m });
    }
    return send(res, 200, { items, marks, models: imagegen.models() });
  }
  // The console's marks: an item ('q:<qid>' or 'g:<key>') flagged to be made again later, with an optional note.
  if (req.method === 'POST' && route === 'consolemark') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    const b = await readBody(req), id = String(b.id || '');
    if (!/^(q:\d{1,6}|g:[a-z0-9-]{3,40})$/.test(id)) return send(res, 400, { error: 'bad id' });
    const marks = store.meta.consoleMarks = store.meta.consoleMarks || {};
    if (b.on) marks[id] = { at: Date.now(), by: user.username, note: clip(b.note, 300) }; else delete marks[id];
    await store.saveMeta('consoleMarks', marks);
    return send(res, 200, { marks });
  }
  if (req.method === 'GET' && route === 'adminstats') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    return send(res, 200, { ...adminStats(), reports: (store.meta.reports || []).slice().reverse() });
  }
  // «گزارش خطا» from the app: { kind: 'bug' | 'idea', text, platform, version }, kept (newest REPORTS_KEPT) in
  // store.meta.reports for the admin panel; at most REPORTS_PER_HOUR from one user.
  if (req.method === 'POST' && route === 'report') {
    const b = await readBody(req);
    const text = String(b.text || '').trim().slice(0, 2000);
    if (text.length < 5) return send(res, 400, { error: 'متن گزارش خیلی کوتاه است.' });
    const now = Date.now(), recent = (reportTimes.get(user.username) || []).filter(t => now - t < 3600e3);
    if (recent.length >= REPORTS_PER_HOUR) return send(res, 429, { error: 'گزارش‌های زیادی فرستاده‌اید؛ کمی بعد دوباره امتحان کنید.' });
    recent.push(now); reportTimes.set(user.username, recent);
    const clip = (v, n) => String(v || '').slice(0, n);
    const list = (store.meta.reports || []).concat({ at: now, username: user.username, name: user.name, kind: b.kind === 'idea' ? 'idea' : 'bug',
      text, platform: clip(b.platform, 20), version: clip(b.version, 20) }).slice(-REPORTS_KEPT);
    await store.saveMeta('reports', list);
    return send(res, 200, { ok: true });
  }
  if (req.method === 'GET' && route === 'me') {
    if (user.draft && user.draft.mode === 'lesson') { // from before lessons had their own drafts
      if (user.draft.lesson) (user.lessonDrafts = user.lessonDrafts || {})[user.draft.lesson] = user.draft;
      delete user.draft; await store.saveUser(user);
    }
    return send(res, 200, { user: publicUser(user), attempts: user.attempts, settings: user.settings || {}, words: user.words || [], saved: user.saved || [], draft: user.draft || null, lessonDrafts: user.lessonDrafts || {}, imgv: imagegen.versions() });
  }
  if (req.method === 'POST' && route === 'attempts') {
    const b = await readBody(req);
    const items = Array.isArray(b.items) ? b.items.slice(0, 25).map(x => ({
      id: +x.id, ok: !!x.ok, w: Math.max(0, Math.min(4, +x.w || 0)),
      a: Array.isArray(x.a) ? x.a.slice(0, 4).map(v => (v ? 1 : 0)) : undefined, // which statements the user ticked
      m: x.m ? 1 : undefined, // bookmarked ("Gem til senere") during the exam
    })) : [];
    if (!items.length) return send(res, 400, { error: 'empty attempt' });
    const at = { at: Date.now(), secs: Math.max(0, Math.min(36000, +b.secs || 0)), mode: MODES.includes(b.mode) ? b.mode : 'random', ...lessonOf(b), items };
    user.attempts.push(at);
    // the exam (or that lesson) is handed in, so it is no longer unfinished
    if (at.mode === 'lesson') { if (user.lessonDrafts) delete user.lessonDrafts[at.lesson]; } else delete user.draft;
    if (user.attempts.length > MAX_ATTEMPTS) user.attempts.splice(0, user.attempts.length - MAX_ATTEMPTS);
    await store.saveUser(user);
    return send(res, 200, { attempt: at });
  }
  // One past exam, identified by its timestamp.
  if (req.method === 'DELETE' && route === 'attempt') {
    const at = +(await readBody(req)).at;
    const n = user.attempts.length;
    user.attempts = user.attempts.filter(a => a.at !== at);
    if (user.attempts.length === n) return send(res, 404, { error: 'آزمون پیدا نشد.' });
    await store.saveUser(user);
    return send(res, 200, { ok: true });
  }
  // All past exams; with { keepLessons: true } the lessons' attempts stay (the past-exams page lists no lessons).
  if (req.method === 'DELETE' && route === 'attempts') {
    const b = await readBody(req);
    user.attempts = b.keepLessons ? user.attempts.filter(a => a.mode === 'lesson') : [];
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
  // Saved questions ("سؤالات ذخیره‌شده"): POST bookmarks a question with the user's ticks from that review
  // (so it can be shown again as «پاسخ شما» / «پاسخ صحیح»), DELETE removes it.
  if (req.method === 'POST' && route === 'saved') {
    const b = await readBody(req);
    const id = +b.id;
    if (!Number.isInteger(id) || id <= 0) return send(res, 400, { error: 'bad question' });
    user.saved = user.saved || [];
    const entry = { id, a: Array.isArray(b.a) ? b.a.slice(0, 4).map(v => (v ? 1 : 0)) : undefined, at: Date.now() };
    const old = user.saved.find(x => x.id === id);
    if (old) Object.assign(old, entry);
    else {
      if (user.saved.length >= MAX_SAVED) return send(res, 400, { error: 'فهرست سؤالات ذخیره‌شده پر است.' });
      user.saved.push(entry);
    }
    await store.saveUser(user);
    return send(res, 200, { saved: old || entry });
  }
  if (req.method === 'DELETE' && route === 'saved') {
    const id = +(await readBody(req)).id;
    user.saved = (user.saved || []).filter(x => x.id !== id);
    await store.saveUser(user);
    return send(res, 200, { ok: true });
  }
  // Unfinished exam, so it can be resumed later: PUT replaces it, DELETE drops it.
  // Exams have one draft; each lesson has its own (user.lessonDrafts by test id), so they never replace each other.
  if (req.method === 'PUT' && route === 'draft') {
    const b = await readBody(req);
    const ids = Array.isArray(b.ids) ? b.ids.slice(0, 25).map(Number).filter(Number.isInteger) : [];
    if (!ids.length) return send(res, 400, { error: 'empty draft' });
    const bools = (v, n) => Array.from({ length: n }, (_, i) => !!(Array.isArray(v) && v[i]));
    const num = (v, max) => Math.max(0, Math.min(max, Math.round(+v || 0)));
    const draft = {
      mode: MODES.includes(b.mode) ? b.mode : 'random', ...lessonOf(b), ids,
      idx: num(b.idx, ids.length - 1),
      answers: ids.map((_, i) => bools(Array.isArray(b.answers) && b.answers[i], 4)),
      seen: bools(b.seen, ids.length), flags: bools(b.flags, ids.length), showFa: bools(b.showFa, ids.length),
      left: num(b.left, 36000), elapsed: num(b.elapsed, 36000 * 24), saved: Date.now(),
    };
    if (draft.mode === 'lesson') {
      if (!draft.lesson) return send(res, 400, { error: 'lesson missing' });
      user.lessonDrafts = user.lessonDrafts || {};
      if (!user.lessonDrafts[draft.lesson] && Object.keys(user.lessonDrafts).length >= MAX_LESSON_DRAFTS) return send(res, 400, { error: 'too many drafts' });
      user.lessonDrafts[draft.lesson] = draft;
    } else user.draft = draft;
    await store.saveUser(user);
    return send(res, 200, { ok: true });
  }
  if (req.method === 'DELETE' && route === 'draft') {
    const lesson = +(await readBody(req)).lesson;
    if (lesson) { if (user.lessonDrafts && user.lessonDrafts[lesson]) { delete user.lessonDrafts[lesson]; await store.saveUser(user); } }
    else if (user.draft) { delete user.draft; await store.saveUser(user); }
    return send(res, 200, { ok: true });
  }
  if (req.method === 'PUT' && route === 'settings') {
    const b = await readBody(req);
    const lang = ['da', 'en'].includes(b.lang) ? b.lang : (user.settings || {}).lang;
    // langChosen: the app asked which language the questions should be in (once per user); it stays set.
    const langChosen = !!b.langChosen || !!(user.settings || {}).langChosen;
    // voice: the read-aloud voice, 'woman' or 'man' (kept when a client that does not know it saves, like the old site).
    const voice = ['woman', 'man'].includes(b.voice) ? b.voice : (user.settings || {}).voice;
    user.settings = { showFa: !!b.showFa, timer: !!b.timer, ...(lang ? { lang } : {}), ...(langChosen ? { langChosen } : {}), ...(voice ? { voice } : {}) };
    await store.saveUser(user);
    return send(res, 200, { settings: user.settings });
  }
  send(res, 404, { error: 'not found' });
}

async function main() {
  store = await openStore({ dbFile: DB_FILE });
  // One-time: everyone is asked again which language the questions are in (with the app's renewed intro).
  // (2: once more, with the app's look chosen on the same screen.)
  if (store.meta.langAskReset !== 2) {
    for (const u of Object.values(store.users)) if (u.settings && u.settings.langChosen) { delete u.settings.langChosen; await store.saveUser(u); }
    await store.saveMeta('langAskReset', 2);
  }
  // One-time, asked by the owner: remove user negin's 22nd and 23rd attempts (as numbered on the progress chart,
  // oldest first). A copy is kept in meta (`removed:negin:22-23`) so they can be restored.
  if (store.meta.removeNegin2223 !== 1) {
    const u = Object.values(store.users).find(x => x.username === 'negin');
    if (u && Array.isArray(u.attempts) && u.attempts.length >= 23) {
      const gone = u.attempts.splice(21, 2);
      await store.saveMeta('removed:negin:22-23', { attempts: gone });
      await store.saveUser(u);
      console.log('removed negin attempts 22-23', gone.map(x => ({ at: new Date(x.at).toISOString(), mode: x.mode, n: x.items.length })));
    }
    await store.saveMeta('removeNegin2223', 1);
  }
  imagegen.init(store, SITE);
  guideref.init(store, imagegen);
  consolepics.init(SITE);
  loadVisits();
  // Save the visit counts before App Platform stops the old instance on a redeploy.
  process.on('SIGTERM', async () => { await saveVisits(true); process.exit(0); });
  http.createServer(async (req, res) => {
    let pathname;
    try { pathname = new URL(req.url, 'http://x').pathname; } catch { res.writeHead(400); return res.end(); }
    // The app's web version runs on another origin and authenticates with a Bearer token (never cookies),
    // so cross-origin requests are allowed without credentials.
    if (req.headers.origin) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Client');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
    }
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
    console.log(`TeoriPrøve ${VERSION} running:\n  http://localhost:${PORT}`);
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
