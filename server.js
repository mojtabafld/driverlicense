// TeoriPrøve server: serves ./site and a small JSON API with per-user accounts.
// Run locally:  node server.js            (data kept in data/db.json)
// In the cloud: set DATABASE_URL (PostgreSQL) so accounts survive redeploys.
// Optional env: PORT, HOST, INVITE_CODE (required to sign up when set), DB_FILE,
// ADMIN_USERS (comma-separated usernames that get the admin panel), ANTHROPIC_API_KEY (AI lessons in the review),
// LESSON_MODEL (Claude model for those lessons, default claude-opus-5-5), KIE_API_KEY (new question pictures, admin panel).
// See README.md for all variables.
'use strict';
process.env.TZ = 'Europe/Copenhagen'; // server-side dates (logs, day buckets) in Copenhagen time
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { openStore } = require('./store');
const { getLesson, getSummary, lessonsAvailable } = require('./lesson');
const imagegen = require('./imagegen');
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

// Version of the front end: a hash of its files (incl. the question bank). index.html links app.js/style.css with ?v=VERSION so a
// browser (or CDN) never keeps an old copy after a deploy, and /api/config reports it to check what is live.
const VERSION = crypto.createHash('sha256')
  .update(['index.html', 'app.js', 'style.css', 'data.js'].map(f => fs.readFileSync(path.join(SITE, f))).join('\0'))
  .digest('hex').slice(0, 8);
const INDEX_HTML = fs.readFileSync(path.join(SITE, 'index.html'), 'utf8')
  .replace('href="style.css"', `href="style.css?v=${VERSION}"`)
  .replace('src="app.js"', `src="app.js?v=${VERSION}"`);

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
  const m = /(?:^|;\s*)tp_session=([a-f0-9]{64})/.exec(req.headers.cookie || '') || /^Bearer ([a-f0-9]{64})$/.exec(req.headers.authorization || '')
    // pictures in the app's web version (an <img> cannot send headers): ?t=<token>, only for /img/
    || (/^\/img\//.test(new URL(req.url, 'http://x').pathname) && /^([a-f0-9]{64})$/.exec(new URL(req.url, 'http://x').searchParams.get('t') || ''));
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
const publicUser = u => ({ username: u.username, name: u.name, created: u.created, admin: isAdmin(u) || undefined });

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
  if (p === '/' || p === '/index.html') {
    if (req.method === 'GET') recordVisit(req);
    res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    return res.end(req.method === 'HEAD' ? undefined : INDEX_HTML);
  }
  if (isProtected(p) && !sessionUser(req)) { res.writeHead(401, { 'Cache-Control': 'no-store' }); return res.end('Sign in first'); }
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
    return send(res, 200, { inviteRequired: !!INVITE_CODE, version: VERSION, aiLessons: lessonsAvailable() });
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
    delete store.sessions[s.token];
    await store.deleteSession(s.token);
    res.setHeader('Set-Cookie', cookie(req, '', 0));
    return send(res, 200, { ok: true });
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
    if (ref && store.meta[ref]) return send(res, 200, { text: store.meta[ref].text });
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
    if (ref && store.meta[ref]) return send(res, 200, { text: store.meta[ref].text });
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
      if (req.method === 'POST' && route === 'imggenstart') return send(res, 200, { job: await imagegen.start(+b.qid, b.model, user.username, b.prompt) });
      if (req.method === 'POST' && route === 'imggenedit') return send(res, 200, { job: await imagegen.edit(+b.qid, b.job, b.text, b.model, user.username) });
      if (req.method === 'POST' && route === 'imggendel') { await imagegen.remove(+b.qid, b.job); return send(res, 200, imagegen.list()); }
      if (req.method === 'POST' && route === 'imggendraft') return send(res, 200, { prompt: await imagegen.draft(+b.qid) });
      if (req.method === 'POST' && route === 'imggenset') { await imagegen.setActive(+b.qid, b.job || null); return send(res, 200, imagegen.list()); }
    } catch (e) { if (e.status) return send(res, e.status, { error: e.message }); throw e; }
  }
  if (req.method === 'GET' && route === 'adminstats') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    return send(res, 200, adminStats());
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
    user.settings = { showFa: !!b.showFa, timer: !!b.timer, ...(lang ? { lang } : {}) };
    await store.saveUser(user);
    return send(res, 200, { settings: user.settings });
  }
  send(res, 404, { error: 'not found' });
}

async function main() {
  store = await openStore({ dbFile: DB_FILE });
  imagegen.init(store, SITE);
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
