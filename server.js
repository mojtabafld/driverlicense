// TeoriPrøve server: serves ./site and a small JSON API with per-user accounts.
// Run locally:  node server.js            (data kept in data/db.json)
// In the cloud: set DATABASE_URL (PostgreSQL) so accounts survive redeploys.
// Optional env: PORT, HOST, INVITE_CODE (required to sign up when set), DB_FILE,
// ADMIN_USERS (comma-separated usernames that get the admin panel), ANTHROPIC_API_KEY (AI lessons in the review),
// LESSON_AI_MODEL (Claude model for those lessons, default claude-opus-5-5), IMAGE_PROMPT_MODEL and IMAGE_MODEL (the console's
// prompt-writing Claude model and the picture model; defaults claude-opus-5-5 and gpt-image-2-5-sunburst), KIE_API_KEY (new question pictures, admin panel),
// ELEVENLABS_API_KEY (questions read aloud), STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, PREMIUM_PRICE_WEEK / _MONTH / _QUARTER
// PROMO_CODE / PROMO_DAYS (a free trial code) and PREMIUM_GATE (premium passes bought with Stripe Checkout, payments.js),
// RESEND_API_KEY, MAIL_FROM, REPORT_TO, RESEND_WEBHOOK_SECRET and FORWARD_TO (email, mail.js).
// See README.md for all variables.
'use strict';
process.env.TZ = 'Europe/Copenhagen'; // server-side dates (logs, day buckets) in Copenhagen time
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { openStore } = require('./store');
const { getLesson, getSummary, lessonsAvailable, isCurrentLesson, isCurrentSummary, refUi, uiOf } = require('./lesson');
const { search: aiSearch } = require('./search');
const imagegen = require('./imagegen');
const guideref = require('./guideref');
const consolepics = require('./consolepics');
const consoleprompts = require('./consoleprompts');
const tts = require('./tts');
const webpic = require('./webpic');
const payments = require('./payments');
const push = require('./push');
const mail = require('./mail');
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
const ADMIN_HTML = fs.readFileSync(path.join(__dirname, 'console', 'admin.html'));

let store; // set in main()

// ---------- auth helpers ----------
// scrypt runs on the thread pool (not the event loop), so a flood of sign-in tries does not stall every other request.
const hashPw = (pw, salt) => new Promise((resolve, reject) => crypto.scrypt(pw, salt, 64, (e, k) => (e ? reject(e) : resolve(k.toString('hex')))));
async function checkPw(pw, user) {
  const a = Buffer.from(await hashPw(pw, user.salt), 'hex'), b = Buffer.from(user.hash, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
const isHttps = req => (req.headers['x-forwarded-proto'] || '').split(',')[0].trim() === 'https';
const originOf = req => `${isHttps(req) ? 'https' : 'http'}://${String(req.headers.host || 'localhost').replace(/[^a-zA-Z0-9.:-]/g, '')}`;
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
// premium: a pass bought with Stripe (payments.js), until when (also once it has run out); admins have its features too.
const publicUser = u => ({ username: u.username, name: u.name, created: u.created, admin: isAdmin(u) || undefined, avatar: u.avatar || undefined,
  premium: u.premium && u.premium.until ? { until: u.premium.until, plan: u.premium.plan, promo: u.premium.promo ? true : undefined } : undefined,
  // email: the account's address; verify: it is not confirmed yet (while email is on, the app waits for the link).
  guest: u.guest || undefined, email: u.email || undefined, emailOk: u.email && u.emailOk ? true : undefined, verify: needsVerify(u) || undefined,
  // promoUsed: this account, or another with its confirmed address, has had the trial code (the premium page hides the code box).
  promoUsed: !!u.promoUsed || !!(u.premium && u.premium.promo) || !!(u.email && u.emailOk && Object.values(store.users).some(x => x !== u && x.premium && x.premium.promo && x.premium.promo.email === u.email)) || undefined });
// Email confirmation (mail.js, RESEND_API_KEY): accounts made while it is on give an address and can use the app once its
// link is opened (mustVerify, or a username that is an email, until the first confirmation, okOnce; a later new address
// does not hold the app up; the app waits even when the email could not be sent, Mojtaba asked); accounts from before, and guests, are not held up, and may add an address later in
// «حساب کاربری» (needed for the trial code). A link works for 24 hours.
const needsVerify = u => mail.available() && !!u.email && !u.emailOk && (!!u.mustVerify || (String(u.username).includes('@') && !u.okOnce));
const emailTaken = (e, u) => Object.values(store.users).some(x => x !== u && x.email === e);
const tokenHash = t => crypto.createHash('sha256').update(String(t)).digest('hex');
// A new link for the user's address (the old one stops working), at most one a minute and 6 a day.
async function sendVerifyMail(req, u, lang) {
  const now = Date.now(), v = u.verify || {};
  if (v.sent && now - v.sent < 60e3) throw Object.assign(new Error('یک دقیقه صبر کنید و دوباره امتحان کنید.'), { status: 429 });
  const day = (v.day && now - v.day < 864e5) ? v.day : now, n = day === v.day ? (v.n || 0) : 0;
  if (n >= 6) throw Object.assign(new Error('امروز ایمیل زیادی فرستاده شده است؛ فردا دوباره امتحان کنید.'), { status: 429 });
  const token = crypto.randomBytes(32).toString('hex');
  u.verify = { h: tokenHash(token), exp: now + 864e5, sent: now, day, n: n + 1 };
  await store.saveUser(u);
  await mail.sendVerify(u.email, u.name || u.username, `${originOf(req)}/api/verify?t=${token}`, ['fa', 'en', 'da'].includes(lang) ? lang : (u.settings || {}).ui);
}
// Forgotten password: a random 6-digit code to the account's address, working for 15 minutes and for at most 5 wrong
// tries; a new code at most once a minute and 6 times a day per account. Setting the new password ends the account's other sessions and confirms the address (the code
// proved it).
const RESET_TRIES = 5;
async function sendResetMail(u, lang) {
  const now = Date.now(), v = u.reset || {};
  if (v.sent && now - v.sent < 60e3) return console.log('reset mail: wait a minute', u.username);
  const day = (v.day && now - v.day < 864e5) ? v.day : now, n = day === v.day ? (v.n || 0) : 0;
  if (n >= 6) return console.log('reset mail: 6 today', u.username);
  const code = String(crypto.randomInt(0, 1e6)).padStart(6, '0');
  u.reset = { h: tokenHash(`${u.username}:${code}`), exp: now + 15 * 60e3, sent: now, day, n: n + 1, tries: 0 };
  await store.saveUser(u);
  await mail.sendReset(u.email || u.username, u.name || u.username, code, ['fa', 'en', 'da'].includes(lang) ? lang : (u.settings || {}).ui);
  console.log('reset mail sent', u.username);
}
// The account a forgotten-password address belongs to: by its address, or by a username that is this address.
function resetUser(e) {
  const same = v => !!v && mail.normal(v) === e;
  return Object.values(store.users).find(x => !x.guest && same(x.email)) || Object.values(store.users).find(x => !x.guest && same(x.username));
}
// Whether the code is the account's current one; a wrong code counts as a try (the code is dropped after 5).
async function resetCodeOk(u, code) {
  const r = u && u.reset;
  if (!r || !r.h || !(r.exp > Date.now()) || (r.tries || 0) >= RESET_TRIES) return false;
  if (safeEqual(r.h, tokenHash(`${u.username}:${String(code || '').replace(/\D/g, '')}`))) return true;
  r.tries = (r.tries || 0) + 1;
  await store.saveUser(u);
  return false;
}
const BAD_CODE = 'کد درست نیست یا دیگر معتبر نیست.';
const hasPremium = u => payments.active(u) || isAdmin(u);
// While payments are on (unless PREMIUM_GATE=0), the AI analysis and the read-aloud answer 402 to accounts without a pass.
const PREMIUM_NEEDED = 'این امکان مخصوص نسخه‌ی ویژه است.';
// With a test key (sk_/rk_test_) payments are only for the admins and the usernames in PREMIUM_TESTERS (comma-separated),
// so nobody else meets a test checkout or a lock while it is tried out; with a live key they are for everyone.
const TESTERS = new Set((process.env.PREMIUM_TESTERS || '').split(',').map(u => u.trim().toLowerCase()).filter(Boolean));
const payFor = u => payments.available() && (!payments.testMode() || !!(u && (isAdmin(u) || TESTERS.has(u.username))));
// Stripe's newest paid premium sessions that no account has counted yet are added to their buyer's pass: the account
// named in the session (client_reference_id, else metadata.username), else the one with the buyer's email. So a payment
// still counts when its webhook did not arrive and the buyer did not come back to the site. At start, every 10 minutes
// and from the premium page, at most every 30 seconds.
let lastPaySync = 0, syncReported = false;
async function syncPayments() {
  if (!payments.available() || Date.now() - lastPaySync < 30e3) return;
  lastPaySync = Date.now();
  try {
    const paid = await payments.recentPaid(), missing = [];
    for (const s of paid) {
      const name = String(s.client_reference_id || (s.metadata || {}).username || '');
      const email = mail.normal((s.customer_details || {}).email || '');
      const u = store.users[name] || (email && Object.values(store.users).find(x => x.email && x.emailOk && mail.normal(x.email) === email));
      if (u && payments.grant(u, s)) {
        await store.saveUser(u);
        console.log('premium bought (sync)', u.username, s.metadata && s.metadata.plan, s.amount_total, s.currency, s.livemode ? 'live' : 'test');
      } else if (!u) missing.push(s.id + ' ' + name);
    }
    // Once per start: how many paid sessions Stripe has, and those with no account here.
    if (!syncReported) { syncReported = true; console.log('pay sync:', paid.length, 'paid sessions', missing.length ? 'no account for: ' + missing.join(', ') : ''); }
  } catch (e) { console.error('pay sync', e.message); }
}
setInterval(() => { syncPayments(); }, 10 * 60e3).unref();
const needsPremium = u => payments.gated() && payFor(u) && !hasPremium(u);

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
// ---------- study days, streak and the daily reminder ----------
// A study day is one on which the user handed in an exam, finished a course lesson or practised (drill, sign cards);
// the streak is the run of study days up to today (or up to yesterday, while today is still open).
function studied(user) {
  const d = dayKey(Date.now());
  if ((user.study || []).includes(d)) return;
  user.study = [...(user.study || []).slice(-399), d];
}
function streakOf(user) {
  const days = new Set(user.study || []);
  let t = Date.now(), n = 0;
  if (!days.has(dayKey(t))) t -= 864e5;
  while (days.has(dayKey(t))) { n++; t -= 864e5; }
  return n;
}
// Every 10 minutes: an email to each user with the reminder on whose hour (Copenhagen) has come, who has not studied
// today and was not reminded today; only to a confirmed address.
const hourOf = t => +new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Copenhagen', hour: '2-digit', hourCycle: 'h23' }).format(new Date(t));
async function sendReminders() {
  if (!mail.available()) return;
  const now = Date.now(), today = dayKey(now), hour = hourOf(now);
  for (const u of Object.values(store.users)) {
    const r = u.reminder;
    if (!r || !r.on || !u.email || !u.emailOk || r.sent === today || hour < r.hour || (u.study || []).includes(today)) continue;
    r.sent = today;
    try {
      await mail.sendReminder(u.email, u.name || u.username, streakOf(u), `${r.origin || 'https://teori.bitlane.app'}/course`, (u.settings || {}).ui);
    } catch (e) { console.error('reminder', u.username, e.message); }
    await store.saveUser(u);
  }
}
setInterval(() => { sendReminders().catch(e => console.error('reminders', e.message)); }, 10 * 60e3).unref();
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
const INBOX_KEPT = 200; // emails Resend received for the domain (mail.js), for the admin panel
const FULL = 25, PASS_MIN = 20;
const scoreOf = a => a.items.filter(x => x.ok).length;
function adminStats() {
  const now = Date.now(), today = dayKey(now), DAYS = 30;
  const keys = Array.from({ length: DAYS }, (_, i) => dayKey(now - (DAYS - 1 - i) * 864e5));
  const perDay = Object.fromEntries(keys.map(k => [k, { day: k, tests: 0, active: 0, newUsers: 0 }]));
  const last7 = new Set(keys.slice(-7));
  const t = { users: 0, newToday: 0, new7: 0, activeToday: 0, active7: 0, testsToday: 0, tests7: 0, tests: 0, full: 0, passed: 0,
    correct30: 0, items30: 0, words: 0, drafts: 0, lang: { da: 0, en: 0, none: 0 },
    premium: 0, promo: 0, guests: 0, unverified: 0, buys: 0, revenue: 0, refunded: 0, ui: { fa: 0, en: 0, da: 0 }, modes: {} };
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
    // For the admin dashboard (/admin): the account's state (guest, premium, email) and what it uses.
    const prem = u.premium || {}, pass = isAdmin(u) ? 'admin' : payments.active(u) ? (prem.promo && !(prem.buys || []).some(b => !b.refunded && !b.test) ? 'trial' : 'premium') : prem.until ? 'expired' : 'free';
    if (pass === 'premium' || pass === 'trial') t.premium++;
    if (prem.promo) t.promo++;
    if (u.guest) t.guests++;
    if (needsVerify(u)) t.unverified++;
    let paid = 0;
    for (const b of prem.buys || []) { if (b.test) continue; if (b.refunded) { t.refunded++; continue; } t.buys++; paid += b.amount || 0; }
    t.revenue += paid;
    const ui = (u.settings || {}).ui; if (t.ui[ui] !== undefined) t.ui[ui]++;
    const modes = {};
    for (const a of u.attempts) { modes[a.mode || 'random'] = (modes[a.mode || 'random'] || 0) + 1; t.modes[a.mode || 'random'] = (t.modes[a.mode || 'random'] || 0) + 1; }
    users.push({ username: u.username, name: u.name, created: u.created, lastActive: last, activeDays: active.size,
      tests: u.attempts.length, testsToday, tests7, full, passed, words: (u.words || []).length, lang: (u.settings || {}).lang || null,
      lastPct: lastA ? Math.round(scoreOf(lastA) / lastA.items.length * 100) : null,
      guest: !!u.guest, email: u.email || null, emailOk: !!u.emailOk, verifyPending: needsVerify(u), ui: ui || null, pass,
      until: prem.until || null, plan: prem.plan || null, promo: !!prem.promo, paid, saved: (u.saved || []).length, modes,
      avgPct: u.attempts.length ? Math.round(u.attempts.reduce((x, a) => x + scoreOf(a) / a.items.length, 0) / u.attempts.length * 100) : null });
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
// New accounts: at most 5 an hour from one address and 40 an hour in all, so a script cannot make accounts in bulk
// (each account has its own hourly allowance of AI lessons and recordings).
const REG_PER_IP_HOUR = 5, REG_ALL_HOUR = 40, regs = new Map();
function registerAllowed(ip) {
  const now = Date.now(), recent = k => { const l = (regs.get(k) || []).filter(t => now - t < 3600e3); regs.set(k, l); return l; };
  const mine = recent(ip), all = recent('*');
  if (mine.length >= REG_PER_IP_HOUR || all.length >= REG_ALL_HOUR) return false;
  mine.push(now); all.push(now); return true;
}
// Every API call: at most API_PER_MIN a minute from one address (the app makes a few dozen at most), so one client
// cannot keep the server and its database busy. /api/config (the health check) is not counted.
const API_PER_MIN = 240, apiHits = new Map();
function apiAllowed(ip) {
  const now = Date.now(), h = apiHits.get(ip);
  if (!h || now - h.t > 60e3) { apiHits.set(ip, { t: now, n: 1 }); return true; }
  return ++h.n <= API_PER_MIN;
}
// The counters above forget old entries, so they cannot grow without end.
setInterval(() => {
  const now = Date.now();
  for (const [k, f] of fails) if (now - f.t > 10 * 60e3) fails.delete(k);
  for (const [k, h] of apiHits) if (now - h.t > 60e3) apiHits.delete(k);
  for (const [k, l] of regs) if (!l.length || now - l[l.length - 1] > 3600e3) regs.delete(k);
  for (const [k, l] of reportTimes) if (!l.length || now - l[l.length - 1] > 3600e3) reportTimes.delete(k);
}, 5 * 60e3).unref();
function safeEqual(a, b) {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

// ---------- http helpers ----------
function send(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(obj));
}
// The body as it came (the Stripe webhook's signature is over the exact bytes).
function readRaw(req, limit = 512e3) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > limit) { reject(new Error('too large')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
function readBody(req, limit = 256e3) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > limit) { reject(new Error('too large')); req.destroy(); } else chunks.push(c); });
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
// bundles are cached for a year. A copy of the app built with the base path /app (app-web-app/) is served at /app/:
// that copy shows prove.dk's own pictures (PROVE_PICS in mobile/src/lib/config.ts). It is a fixed copy, kept as it was
// built (`npm run build:web` builds the root only; `npm run build:web-app` builds the copy again), and its question
// bank and the questions' pictures are fixed too (frozen/app/, FROZEN in config.ts).
const APP_MIME = { ...MIME, '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.map': 'application/json' };
// DEFAULT_THEME: the main site's colour theme for everyone who has not picked one (mobile/src/ui/palette.ts; default
// sky). Written into the root page, so the web version starts in it; phones read it from /api/config.
const THEMES = ['ocean', 'violet', 'lime', 'coral', 'amber', 'emerald', 'forest', 'rose', 'sky', 'mono', 'teal', 'indigo', 'orchid', 'gold', 'slate'];
const defaultTheme = () => { const t = String(process.env.DEFAULT_THEME || '').trim().toLowerCase(); return THEMES.includes(t) ? t : 'sky'; };
const WEBS = {
  root: { dir: path.join(__dirname, 'app-web'),
    page: b => Buffer.from(b.toString('utf8').replace('<head>', `<head><script>window.__TP_THEME=${JSON.stringify(defaultTheme())}</script>`)) },
  // Its page links the manifest and the icon of /app (its own start page), and its manifest is that of the root's
  // with /app/ as start and scope.
  app: { dir: path.join(__dirname, 'app-web-app'), base: '/app',
    page: b => Buffer.from(b.toString('utf8').replace('href="/manifest.webmanifest"', 'href="/app/manifest.webmanifest"')),
    manifest: () => { const m = JSON.parse(fs.readFileSync(path.join(__dirname, 'app-web', 'manifest.webmanifest'), 'utf8')); return Buffer.from(JSON.stringify({ ...m, start_url: '/app/', scope: '/app/' })); } },
};
// The pages themselves: never shown inside another site's frame (clickjacking), no plugins, no <base> tricks, and
// only the origin (not the path) sent to other sites.
const PAGE_HEADERS = { 'X-Frame-Options': 'DENY', 'Content-Security-Policy': "frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
  'Referrer-Policy': 'strict-origin-when-cross-origin' };
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
        // (The service worker, sw.js, is looked for again on every start, so a new one reaches the devices at once.)
        'Cache-Control': isIndex ? 'no-store' : p.includes('/_expo/static/') ? 'public, max-age=31536000, immutable' : p === '/sw.js' ? 'no-cache' : 'public, max-age=86400',
        'X-Content-Type-Options': 'nosniff', ...(isIndex ? PAGE_HEADERS : {}),
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
    res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...PAGE_HEADERS });
    return res.end(req.method === 'HEAD' ? undefined : CONSOLE_HTML);
  }
  // The admin dashboard: users, exams and use of the app (its page signs in and reads /api/adminstats itself).
  if (p === '/admin' || p === '/admin/') {
    res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex', ...PAGE_HEADERS });
    return res.end(req.method === 'HEAD' ? undefined : ADMIN_HTML);
  }
  // The app's fixed copy with prove.dk's pictures at /app/.
  if (p === '/app') { res.writeHead(301, { Location: '/app/' }); return res.end(); }
  if (p.startsWith('/app/')) return serveAppWeb(req, res, p.slice(4), WEBS.app);
  // The app at the root (everything that is not the API's or a shared file).
  if (!p.startsWith('/img/') && p !== '/data.js' && !p.startsWith('/intro/') && !p.startsWith('/learn-art/') && !p.startsWith('/course-art/') && !p.startsWith('/avatar-art/') && !p.startsWith('/hero-art/') && !p.startsWith('/hero-try/') && !p.startsWith('/login-art/') && !p.startsWith('/store-art/') && !p.startsWith('/guide-art/')) return serveAppWeb(req, res, p);
  // The app's intro pictures (made by imagegen.js), open to everyone: the intro comes before signing in.
  // The pictures of the «آموزش» tab's cards (made by imagegen.js), served the same way.
  // And the profile pictures to choose from, and the pictures at the top of the «آموزش» and «آزمون» pages.
  const im = /^\/intro\/([1-9])\.png$/.exec(p), lm = /^\/learn-art\/([1-4])\.png$/.exec(p), am = /^\/avatar-art\/([1-9]|10)\.png$/.exec(p), hm = /^\/hero-art\/([1-9]|10)\.png$/.exec(p), tm = /^\/hero-try\/([1-2])\.png$/.exec(p), lg = /^\/login-art\/([1-2])\.png$/.exec(p), sm = /^\/store-art\/([1-7])\.png$/.exec(p),
    gm2 = /^\/guide-art\/([a-z0-9-]{3,40})\.png$/.exec(p), cm = /^\/course-art\/([a-z0-9-]{3,40})\.png$/.exec(p);
  if (im || lm || am || hm || tm || lg || sm || gm2 || cm) {
    const load = () => (im ? imagegen.introBlob(im[1]) : lm ? imagegen.learnBlob(lm[1]) : am ? imagegen.avatarBlob(am[1]) : hm ? imagegen.heroBlob(hm[1]) : tm ? imagegen.heroTryBlob(tm[1]) : lg ? imagegen.loginBlob(lg[1]) : sm ? imagegen.storeBlob(sm[1]) : cm ? imagegen.courseBlob(cm[1]) : guideref.webBlob(gm2[1], new URL(req.url, 'http://x').searchParams.get('s') || 'l'));
    // Sent smaller and kept in memory (webpic.js) when the picture's version is known; the others as they are.
    const ver = im ? imagegen.introVersions()[im[1]] : lm ? imagegen.learnVersions()[lm[1]] : am ? imagegen.avatarVersions()[am[1]] : hm ? imagegen.heroVersions()[hm[1]] : lg ? imagegen.loginVersions()[lg[1]]
      : cm ? imagegen.courseVersions()[cm[1]] : undefined;   // (/guide-art has its own sizes and store: guideref.webBlob)
    return (ver ? webpic.get(`${p}:${ver}`, load, im ? 1280 : undefined) : load()).then(b => {
      if (!b) { res.writeHead(404); return res.end(); }
      // (A sign chosen from prove.dk can be SVG: shown as a picture only, nothing in it runs.)
      res.writeHead(200, { 'Content-Type': b.mime, 'Content-Length': b.data.length, 'Cache-Control': 'public, max-age=2592000', 'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; img-src data:" });
      res.end(req.method === 'HEAD' ? undefined : b.data);
    }).catch(() => { res.writeHead(500); res.end(); });
  }
  if (isProtected(p) && !sessionUser(req)) { res.writeHead(401, { 'Cache-Control': 'no-store' }); return res.end('Sign in first'); }
  // The fixed copy of the app at /app (?frozen=app): its question bank (the questions and the 44 lessons) and the
  // questions' original pictures as they were when it was fixed (frozen/app/), so later changes do not reach it.
  if ((p === '/data.js' || /^\/img\/q\d+\.jpg$/.test(p)) && new URL(req.url, 'http://x').searchParams.get('frozen') === 'app') return serveFile(req, res, p, FROZEN_APP);
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

const FROZEN_APP = path.join(__dirname, 'frozen', 'app');
function serveFile(req, res, p, root = SITE) {
  const file = path.normalize(path.join(root, p));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
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

let lastKiePoll = 0;
async function api(req, res, route) {
  const ip = clientIp(req);
  if (route !== 'config' && !apiAllowed(ip)) return send(res, 429, { error: 'درخواست زیاد؛ کمی بعد دوباره امتحان کنید.' });
  if (req.method === 'GET' && route === 'config') {
    return send(res, 200, { inviteRequired: !!INVITE_CODE, mail: mail.available() || undefined, theme: defaultTheme(), version: VERSION, aiLessons: lessonsAvailable(), tts: tts.available(), intro: imagegen.introVersions(), introBg: imagegen.introColours(), learnArt: imagegen.learnVersions(), learnBg: imagegen.learnColours(), courseArt: imagegen.courseVersions(), avatarArt: imagegen.avatarVersions(), heroArt: imagegen.heroVersions(), loginArt: imagegen.loginVersions(), heroDiag: imagegen.heroDiag(),
      // Premium can be bought (a Stripe key is set): its plans (id, days, kroner), whether the AI and read-aloud need it, test mode.
      pay: payFor((sessionUser(req) || {}).user) ? { plans: payments.plans(), gate: payments.gated() || undefined, test: payments.testMode() || undefined,
        promo: payments.promoCodes().length ? payments.promoDays() : undefined } : undefined,
      // ?pics=prove (the app's copy at /app): prove.dk's pictures of the signs and right of way wherever they are copied in.
      guideArt: new URL(req.url, 'http://x').searchParams.get('pics') === 'prove' ? guideref.proveVersions() : guideref.versions() });
  }
  if (req.method === 'POST' && route === 'register') {
    if (tooMany(ip)) return send(res, 429, { error: 'تلاش‌های ناموفق زیاد. ۱۰ دقیقه دیگر دوباره امتحان کنید.' });
    const { username, password, name, invite, email, lang } = await readBody(req);
    if (INVITE_CODE && !safeEqual(String(invite || '').trim(), INVITE_CODE)) {
      addFail(ip);
      return send(res, 403, { error: 'کد دعوت نادرست است.' });
    }
    // The main site (email on) signs up with an email only: the address is the username too. Other clients send a
    // username as before.
    const byMail = mail.available() && !username && !!email;
    const u = byMail ? mail.normal(email) : String(username || '').trim().toLowerCase();
    if (!registerAllowed(ip)) return send(res, 429, { error: 'ساخت حساب از این اتصال زیاد بوده است؛ کمی بعد دوباره امتحان کنید.' });
    if (byMail ? !mail.EMAIL_RE.test(u) : !USER_RE.test(u)) return send(res, 400, byMail ? { error: 'یک ایمیل درست وارد کنید.' } : { error: 'نام کاربری باید ۳ تا ۳۲ کاراکتر انگلیسی، عدد، نقطه، خط تیره یا زیرخط باشد.' });
    // Any password is accepted (no length or character rules); only an empty one is refused.
    if (typeof password !== 'string' || !password.length) return send(res, 400, { error: 'رمز عبور را وارد کنید.' });
    if (store.users[u]) return send(res, 409, { error: byMail ? 'با این ایمیل قبلاً حساب ساخته شده است.' : 'این نام کاربری قبلاً ثبت شده است.' });
    // The main site's sign-up always sends an address; older clients (the /app copy, older phone apps) send none, and
    // those accounts are not held up (only the trial code needs a confirmed address).
    const e = mail.normal(email);
    if (mail.available() && e) {
      if (!mail.EMAIL_RE.test(e)) return send(res, 400, { error: 'یک ایمیل درست وارد کنید.' });
      if (emailTaken(e)) return send(res, 409, { error: 'با این ایمیل قبلاً حساب ساخته شده است.' });
    }
    const salt = crypto.randomBytes(16).toString('hex');
    const shown = String(name || (byMail ? u.split('@')[0] : u)).trim().slice(0, 40) || u;
    const user = { username: u, name: shown, salt, hash: await hashPw(password, salt),
      created: Date.now(), attempts: [], settings: { header: 'plain' }, ...(mail.available() && e ? { email: e, mustVerify: true } : {}) };
    store.users[u] = user;
    await store.saveUser(user);
    // The link goes out now; when it cannot, the app's «send again» button tries again.
    if (user.email) await sendVerifyMail(req, user, lang).catch(err => console.error('verify mail', u, err.message));
    const token = await newSession(req, res, u);
    return send(res, 200, { user: publicUser(user), ...(isApp(req) ? { token } : {}) });
  }
  // «ورود به عنوان کاربر مهمان» (the sign-in page): a new account with a made-up name and a random password nobody sees,
  // kept in this browser by its session; progress is saved as for anyone. Refused where signing up needs an invite.
  if (req.method === 'POST' && route === 'guest') {
    if (INVITE_CODE) return send(res, 403, { error: 'ورود مهمان در این سایت ممکن نیست.' });
    if (!registerAllowed(ip)) return send(res, 429, { error: 'ساخت حساب از این اتصال زیاد بوده است؛ کمی بعد دوباره امتحان کنید.' });
    const { name } = await readBody(req);
    let u; do u = `guest-${crypto.randomBytes(4).toString('hex')}`; while (store.users[u]);
    const salt = crypto.randomBytes(16).toString('hex');
    const user = { username: u, name: String(name || '').trim().slice(0, 40) || 'مهمان', salt, hash: await hashPw(crypto.randomBytes(24).toString('hex'), salt),
      created: Date.now(), attempts: [], settings: { header: 'plain' }, guest: true };
    store.users[u] = user;
    await store.saveUser(user);
    const token = await newSession(req, res, u);
    return send(res, 200, { user: publicUser(user), ...(isApp(req) ? { token } : {}) });
  }
  if (req.method === 'POST' && route === 'login') {
    if (tooMany(ip)) return send(res, 429, { error: 'تلاش‌های ناموفق زیاد. ۱۰ دقیقه دیگر دوباره امتحان کنید.' });
    // By username (accounts from before) or by email (the username of accounts made with one, or an address added later).
    const { username, password } = await readBody(req);
    const id = String(username || '').trim().toLowerCase();
    const user = store.users[id] || (id.includes('@') ? Object.values(store.users).find(x => x.email === id) : undefined);
    if (!user || typeof password !== 'string' || !(await checkPw(password, user))) {
      addFail(ip);
      return send(res, 401, { error: 'ایمیل (یا نام کاربری) یا رمز عبور اشتباه است.' });
    }
    fails.delete(ip);
    const token = await newSession(req, res, user.username);
    return send(res, 200, { user: publicUser(user), ...(isApp(req) ? { token } : {}) });
  }

  // POST forgot { email, lang }: a 6-digit code to that address, when an account has it (else 404). Counted as a
  // failed try, so one address cannot ask again and again (nor test many addresses).
  if (req.method === 'POST' && route === 'forgot') {
    if (!mail.available()) return send(res, 404, { error: 'ایمیل فعال نیست.' });
    if (tooMany(ip)) return send(res, 429, { error: 'تلاش‌های ناموفق زیاد. ۱۰ دقیقه دیگر دوباره امتحان کنید.' });
    const { email, lang } = await readBody(req);
    const e = mail.normal(email);
    if (!mail.EMAIL_RE.test(e)) return send(res, 400, { error: 'یک ایمیل درست وارد کنید.' });
    addFail(ip);
    const u = resetUser(e);
    // No account with this address: said at once (Mojtaba, 2026-10-17), so the user is not left waiting for a code.
    if (!u) { console.log('reset mail: no account for', e.replace(/^(.{2}).*@/, '$1…@')); return send(res, 404, { error: 'حسابی با این ایمیل ثبت نشده است.' }); }
    await sendResetMail(u, lang).catch(err => console.error('reset mail', u.username, err.message));
    return send(res, 200, { ok: true });
  }
  // POST resetcheck { email, code }: whether the code is right (before the new password is asked for).
  // POST reset { email, code, password }: the new password; signs in with it.
  if (req.method === 'POST' && (route === 'resetcheck' || route === 'reset')) {
    if (tooMany(ip)) return send(res, 429, { error: 'تلاش‌های ناموفق زیاد. ۱۰ دقیقه دیگر دوباره امتحان کنید.' });
    const { email, code, password } = await readBody(req);
    const u = resetUser(mail.normal(email));
    if (!(await resetCodeOk(u, code))) { addFail(ip); return send(res, 400, { error: BAD_CODE }); }
    if (route === 'resetcheck') return send(res, 200, { ok: true });
    if (typeof password !== 'string' || !password.length) return send(res, 400, { error: 'رمز عبور را وارد کنید.' });
    u.salt = crypto.randomBytes(16).toString('hex'); u.hash = await hashPw(password, u.salt);
    delete u.reset;
    if (!u.emailOk && u.email) { u.emailOk = u.okOnce = Date.now(); delete u.verify; delete u.mustVerify; }
    await store.saveUser(u);
    for (const [k, x] of Object.entries(store.sessions)) if (x.username === u.username) { delete store.sessions[k]; await store.deleteSession(k); }
    console.log('password reset', u.username);
    const token = await newSession(req, res, u.username);
    return send(res, 200, { user: publicUser(u), ...(isApp(req) ? { token } : {}) });
  }

  // kie.ai calls this when a picture is ready; the body is not trusted, it only makes the server check its jobs now.
  // (At most once every 10 seconds, however often it is called.)
  if (req.method === 'POST' && route === 'kiecallback') {
    if (Date.now() - lastKiePoll > 10e3) { lastKiePoll = Date.now(); imagegen.poll().catch(() => {}); }
    return send(res, 200, { ok: true });
  }

  // Stripe's webhook (Developers → Webhooks, events checkout.session.completed, checkout.session.async_payment_succeeded
  // and charge.refunded): only a correctly signed event counts. A paid session adds its plan's days to its account's
  // pass; a fully refunded payment takes them off again.
  if (req.method === 'POST' && route === 'stripehook') {
    const ev = payments.verifyEvent(await readRaw(req), req.headers['stripe-signature']);
    if (!ev) return send(res, 400, { error: 'bad signature' });
    const o = (ev.data && ev.data.object) || {};
    if ((ev.type === 'checkout.session.completed' || ev.type === 'checkout.session.async_payment_succeeded') && o.payment_status === 'paid') {
      const u = store.users[String(o.client_reference_id || '')];
      if (u && payments.grant(u, o)) {
        await store.saveUser(u);
        console.log('premium bought', u.username, o.metadata && o.metadata.plan, o.amount_total, o.currency, o.livemode ? 'live' : 'test');
      }
    } else if (ev.type === 'charge.refunded' && o.refunded && o.payment_intent) {
      const u = Object.values(store.users).find(x => x.premium && (x.premium.buys || []).some(b => b.pi === o.payment_intent));
      if (u && payments.refund(u, o.payment_intent)) {
        await store.saveUser(u);
        console.log('premium refunded', u.username);
      }
    }
    return send(res, 200, { received: true });
  }

  // Resend's receiving webhook (Webhooks → event email.received, signed; mail.js): an email Resend received for the
  // domain (support@…: a report's copy, a user's answer) is kept, newest INBOX_KEPT, for the admin panel's
  // «ایمیل‌های دریافتی», and forwarded to FORWARD_TO when set. Sent again by Resend, an email is kept once.
  if (req.method === 'POST' && route === 'inbound') {
    const ev = mail.verifyWebhook(await readRaw(req), req.headers);
    if (!ev) return send(res, 400, { error: 'bad signature' });
    const d = ev.data || {};
    if (ev.type === 'email.received' && d.email_id && !(store.meta.inbox || []).some(x => x.id === d.email_id)) {
      const full = await mail.getReceived(d.email_id).catch(e => { console.error('resend receiving', e.message); return null; });
      const e = { ...d, ...(full || {}) }, text = full ? mail.bodyText(full) : '';
      const cut = (v, n) => String(v || '').slice(0, n), list = (x, n) => (Array.isArray(x) ? x : []).slice(0, n);
      const item = { at: Date.parse(d.created_at) || Date.now(), id: cut(d.email_id, 80), from: cut(e.from, 200), to: list(e.to, 10).map(x => cut(x, 200)),
        replyTo: list(e.reply_to, 3).map(x => cut(x, 200)), subject: cut(e.subject, 300), text: text.slice(0, 8000), full: !!full,
        attachments: list(e.attachments, 20).map(a => ({ name: cut(a && a.filename, 120), size: (a && a.size) || 0 })) };
      store.meta.inbox = (store.meta.inbox || []).concat(item).slice(-INBOX_KEPT);
      await store.saveMeta('inbox', store.meta.inbox);
      console.log('email received', item.id, full ? '' : '(no full access to read it)');
      if (full) mail.forward(e, text).then(sent => { if (sent) console.log('email forwarded', item.id); }).catch(err => console.error('forward', err.message));
    }
    return send(res, 200, { received: true });
  }

  // Claude Code reads and edits a console item's saved prompt for the admin (consoleprompts.js), with the
  // X-Claude-Code-Key header matching the CLAUDE_CODE_KEY secret (nothing here without it):
  // GET ?id=q:<qid>|g:<key> → the prompt and what the item is about; POST { id, prompt, note } saves the new prompt,
  // which the console shows as edited by Claude Code. GET without an id lists the items with a saved prompt.
  if (route === 'claudeprompt' && (req.method === 'GET' || req.method === 'POST')) {
    const key = process.env.CLAUDE_CODE_KEY || '';
    if (tooMany(ip)) return send(res, 429, { error: 'too many' });
    if (key.length < 24 || !safeEqual(String(req.headers['x-claude-code-key'] || ''), key)) { addFail(ip); return send(res, 403, { error: 'forbidden' }); }
    const b = req.method === 'POST' ? await readBody(req) : {}, id = String(req.method === 'GET' ? new URL(req.url, 'http://x').searchParams.get('id') || '' : b.id || '');
    if (req.method === 'GET' && !id) return send(res, 200, { prompts: consoleprompts.marks() });
    if (!consoleprompts.ID_RE.test(id)) return send(res, 400, { error: 'bad id' });
    try {
      if (req.method === 'GET') return send(res, 200, { ...consoleprompts.get(id), about: consoleprompts.about(id) });
      return send(res, 200, await consoleprompts.edit(id, b.prompt, b.note));
    } catch (e) { if (e.status) return send(res, e.status, { error: e.message }); throw e; }
  }

  // The link in the confirmation email: confirms that account's address and opens the app.
  if (req.method === 'GET' && route === 'verify') {
    const h = tokenHash(new URL(req.url, 'http://x').searchParams.get('t') || '');
    const u = Object.values(store.users).find(x => x.verify && x.verify.h && safeEqual(x.verify.h, h));
    let ok = false;
    if (u && u.verify.exp > Date.now()) { u.emailOk = u.okOnce = Date.now(); delete u.verify; delete u.mustVerify; await store.saveUser(u); ok = true; console.log('email confirmed', u.username); }
    // On an Android phone the link opens the app when it is installed (an intent link: Chrome and Gmail's browser
    // start the app, else they go on to the web page); elsewhere the web page, which says the account is active.
    // ui: the account's app language, so the page (and its «account active» card) opens in it in any browser.
    const ui = u && ['fa', 'en', 'da'].includes((u.settings || {}).ui) ? `&ui=${u.settings.ui}` : '';
    const web = `/?verified=${ok ? 1 : 0}${ui}`, ua = String(req.headers['user-agent'] || '');
    const app = /Android/i.test(ua) && !/; wv\)/.test(ua)
      ? `intent://verified?ok=${ok ? 1 : 0}#Intent;scheme=teoriprove;package=info.mintcloud.teoriprove;S.browser_fallback_url=${encodeURIComponent(originOf(req) + web)};end`
      : null;
    res.writeHead(302, { Location: app || web, 'Cache-Control': 'no-store' });
    return res.end();
  }

  const s = sessionUser(req);
  if (!s) return send(res, 401, { error: 'unauthorized' });
  const user = s.user;
  await touch(user);
  // POST verifysend { email?, lang }: the confirmation link again, or to a new address (which then needs confirming).
  if (req.method === 'POST' && route === 'verifysend') {
    if (!mail.available()) return send(res, 404, { error: 'ایمیل فعال نیست.' });
    if (user.guest) return send(res, 403, { error: 'برای ثبت ایمیل، اول با نام کاربری خودتان حساب بسازید.' });
    const b = await readBody(req);
    if (b.email !== undefined) {
      const e = mail.normal(b.email);
      if (!mail.EMAIL_RE.test(e)) return send(res, 400, { error: 'یک ایمیل درست وارد کنید.' });
      if (emailTaken(e, user)) return send(res, 409, { error: 'با این ایمیل قبلاً حساب ساخته شده است.' });
      // A confirmed address cannot be changed (Mojtaba asked).
      if (e !== user.email && user.emailOk) return send(res, 403, { error: 'ایمیل تأییدشده قابل تغییر نیست.' });
      if (e !== user.email) { user.email = e; delete user.emailOk; }
    }
    if (!user.email) return send(res, 400, { error: 'یک ایمیل درست وارد کنید.' });
    if (user.emailOk) return send(res, 200, { user: publicUser(user) });
    try { await sendVerifyMail(req, user, b.lang); } catch (e) { if (e.status) return send(res, e.status, { error: e.message, user: publicUser(user) }); throw e; }
    return send(res, 200, { user: publicUser(user) });
  }
  // An account waiting for its link can only read itself, ask for the link again and sign out.
  if (needsVerify(user) && !(route === 'me' || route === 'logout' || route === 'pushunsub' || (route === 'settings' && req.method === 'PUT'))) {
    return send(res, 403, { error: 'اول ایمیل خود را با لینکی که برایتان فرستادیم تأیید کنید.', verify: true });
  }

  if (req.method === 'POST' && route === 'logout') {
    // The session used, and the cookie's one too when it differs: signing out leaves neither behind.
    const ck = /(?:^|;\s*)tp_session=([a-f0-9]{64})/.exec(req.headers.cookie || '');
    for (const t of new Set([s.token, ck && ck[1]].filter(Boolean))) { delete store.sessions[t]; await store.deleteSession(t); }
    res.setHeader('Set-Cookie', cookie(req, '', 0));
    return send(res, 200, { ok: true });
  }
  // Premium: POST checkout { plan: week | month | quarter, lang } → { url } of a Stripe Checkout page for this account;
  // POST checkoutdone { id } (the session Stripe sent the user back with) checks it with Stripe at once, so the pass is
  // there even before the webhook.
  // POST paysync: the premium page asks the server to look at Stripe's newest paid sessions (at most every 30 seconds).
  if (req.method === 'POST' && route === 'paysync') {
    if (payFor(user)) await syncPayments();
    return send(res, 200, { user: publicUser(user) });
  }
  if (req.method === 'POST' && route === 'checkout') {
    if (!payFor(user)) return send(res, 404, { error: 'پرداخت فعال نیست.' });
    // Guests buy nothing (the pass would be lost with the browser's session): they make an account first.
    if (user.guest) return send(res, 403, { error: 'برای خرید نسخه‌ی ویژه، اول حساب کاربری بسازید.' });
    const b = await readBody(req);
    try { return send(res, 200, { url: await payments.createCheckout(user.username, String(b.plan || ''), originOf(req), b.lang) }); }
    catch (e) { if (e.status) return send(res, e.status, { error: e.message }); throw e; }
  }
  if (req.method === 'POST' && route === 'checkoutdone') {
    if (!payFor(user)) return send(res, 404, { error: 'پرداخت فعال نیست.' });
    const id = String((await readBody(req)).id || '');
    if (!/^cs_(test|live)_[A-Za-z0-9]{10,200}$/.test(id)) return send(res, 400, { error: 'bad session' });
    if (!payments.hasSession(user, id)) {
      let s;
      try { s = await payments.getSession(id); } catch (e) { if (e.status) return send(res, e.status, { error: e.message }); throw e; }
      if (s.client_reference_id !== user.username) return send(res, 403, { error: 'forbidden' });
      if (s.payment_status !== 'paid') return send(res, 200, { user: publicUser(user), pending: true });
      if (payments.grant(user, s)) {
        await store.saveUser(user);
        console.log('premium bought', user.username, s.metadata && s.metadata.plan, s.amount_total, s.currency, s.livemode ? 'live' : 'test');
      }
    }
    return send(res, 200, { user: publicUser(user) });
  }
  // POST promo { code }: a free trial of PROMO_DAYS days with one of the PROMO_CODE codes, once per account (not for guest
  // accounts, which anyone can make again). Wrong codes count like failed sign-ins.
  if (req.method === 'POST' && route === 'promo') {
    if (!payFor(user) || !payments.promoCodes().length) return send(res, 404, { error: 'کد تخفیف فعال نیست.' });
    if (tooMany(ip)) return send(res, 429, { error: 'تلاش‌های ناموفق زیاد. ۱۰ دقیقه دیگر دوباره امتحان کنید.' });
    const code = String((await readBody(req)).code || '').trim().toUpperCase().slice(0, 64);
    const match = payments.promoCodes().find(c => safeEqual(code, c));
    if (!match) { addFail(ip); return send(res, 400, { error: 'کد تخفیف درست نیست.' }); }
    if (user.guest) return send(res, 403, { error: 'برای استفاده از کد تخفیف، اول با نام کاربری خودتان حساب بسازید.' });
    // With email on: only for a confirmed address, and one trial per address (whichever account had it).
    if (mail.available()) {
      if (!user.email || !user.emailOk) return send(res, 403, { error: 'برای استفاده از کد تخفیف، اول ایمیل خود را در «حساب کاربری» ثبت و تأیید کنید.' });
      if (Object.values(store.users).some(x => x !== user && ((x.premium && x.premium.promo && x.premium.promo.email === user.email) || (x.promoEmail && x.promoEmail === user.email)))) return send(res, 409, { error: 'شما قبلاً از کد تخفیف استفاده کرده‌اید.' });
    }
    if (!payments.grantPromo(user, match, user.emailOk ? user.email : undefined)) return send(res, 409, { error: 'شما قبلاً از کد تخفیف استفاده کرده‌اید.' });
    await store.saveUser(user);
    console.log('premium trial', user.username, match);
    return send(res, 200, { user: publicUser(user) });
  }
  // The account: { name } changes the shown name; { current, password } the password, only with the current one
  // (failed tries count like failed sign-ins); the username never changes. A new password signs out the user's
  // other sessions.
  // A guest account can be neither changed nor deleted (it has no password anyone knows); it signs out instead.
  if ((req.method === 'PUT' || req.method === 'DELETE') && route === 'account' && user.guest) return send(res, 403, { error: 'حساب مهمان قابل ویرایش یا حذف نیست.' });
  if (req.method === 'PUT' && route === 'account') {
    const b = await readBody(req);
    if (b.name !== undefined) {
      const name = String(b.name || '').trim().slice(0, 40);
      if (!name) return send(res, 400, { error: 'نام را وارد کنید.' });
      user.name = name;
    }
    if (b.password !== undefined) {
      if (tooMany(ip)) return send(res, 429, { error: 'تلاش‌های ناموفق زیاد. ۱۰ دقیقه دیگر دوباره امتحان کنید.' });
      if (typeof b.current !== 'string' || !(await checkPw(b.current, user))) { addFail(ip); return send(res, 403, { error: 'رمز عبور فعلی درست نیست.' }); }
      if (typeof b.password !== 'string' || !b.password.length) return send(res, 400, { error: 'رمز عبور جدید را وارد کنید.' });
      user.salt = crypto.randomBytes(16).toString('hex'); user.hash = await hashPw(b.password, user.salt);
      for (const [t, x] of Object.entries(store.sessions)) if (x.username === user.username && t !== s.token) { delete store.sessions[t]; await store.deleteSession(t); }
    }
    await store.saveUser(user);
    return send(res, 200, { user: publicUser(user) });
  }
  // Delete the account, asked from the settings with the user's password (failed tries count like failed sign-ins):
  // the user, all their sessions, their own profile picture, their error reports and the emails received from their
  // address are removed, and the cookie cleared.
  if (req.method === 'DELETE' && route === 'account') {
    if (tooMany(ip)) return send(res, 429, { error: 'تلاش‌های ناموفق زیاد. ۱۰ دقیقه دیگر دوباره امتحان کنید.' });
    const b = await readBody(req);
    if (typeof b.password !== 'string' || !(await checkPw(b.password, user))) { addFail(ip); return send(res, 403, { error: 'رمز عبور درست نیست.' }); }
    const u = user.username;
    for (const [t, x] of Object.entries(store.sessions)) if (x.username === u) delete store.sessions[t];
    delete store.users[u];
    await store.deleteUser(u);
    if (user.avatar && user.avatar.photo) await store.deleteBlob(`avatar-${u}`).catch(() => {});
    if ((store.meta.reports || []).some(r => r.username === u)) {
      store.meta.reports = store.meta.reports.filter(r => r.username !== u);
      await store.saveMeta('reports', store.meta.reports);
    }
    // (and the emails received from the account's address, or about its reports)
    const addr = mail.normal(user.email), mine = x => !!addr && (mail.normal(x.from).includes(addr) || (x.replyTo || []).some(a => mail.normal(a).includes(addr)));
    if (addr && (store.meta.inbox || []).some(mine)) {
      store.meta.inbox = store.meta.inbox.filter(x => !mine(x));
      await store.saveMeta('inbox', store.meta.inbox);
    }
    reportTimes.delete(u);
    res.setHeader('Set-Cookie', cookie(req, '', 0));
    return send(res, 200, { ok: true });
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
  // AI lesson for one reviewed question: { qid, a: ticks per statement (optional), lang, ui: the app's language it is written in }.
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
  if (['lesson', 'summary', 'ttsai'].includes(route) && needsPremium(user)) return send(res, 402, { error: PREMIUM_NEEDED, premium: true });
  if (req.method === 'POST' && route === 'lesson') {
    const b = await readBody(req);
    const qid = +b.qid, att = attemptAt(b.at);
    const ref = att && att.ai && att.ai.q && att.ai.q[qid];
    if (ref && store.meta[ref] && isCurrentLesson(SITE, qid, ref) && refUi(ref) === uiOf(b.ui)) return send(res, 200, { text: store.meta[ref].text });
    try {
      const lesson = await getLesson({ store, siteDir: SITE, username: user.username, qid, ticks: Array.isArray(b.a) ? b.a.slice(0, 4) : null, lang: b.lang, ui: b.ui });
      if (att && att.items.some(it => it.id === qid)) await linkAi(att, qid, lesson.key);
      return send(res, 200, { text: lesson.text });
    } catch (e) {
      if (e instanceof Anthropic.APIError) { console.error('lesson API error', e.status, e.message); return send(res, 502, { error: 'آموزش هوش مصنوعی الان در دسترس نیست.' }); }
      if (e.status) return send(res, e.status, { error: e.message });
      throw e;
    }
  }
  // AI search of the learning pages (search.js): { q, ui, v } or, the first time / when the server asks (409), { q, ui, catalog }.
  if (req.method === 'POST' && route === 'coursesearch') {
    if (needsPremium(user)) return send(res, 402, { error: PREMIUM_NEEDED, premium: true });
    const b = await readBody(req, 700e3);
    try {
      return send(res, 200, await aiSearch({ username: user.username, q: b.q, v: b.v, catalog: b.catalog, ui: b.ui }));
    } catch (e) {
      if (e instanceof Anthropic.APIError) { console.error('search API error', e.status, e.message); return send(res, 502, { error: 'جستجوی هوشمند الان در دسترس نیست.' }); }
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
    if (ref && store.meta[ref] && isCurrentSummary(SITE, items, ref) && refUi(ref) === uiOf(b.ui)) return send(res, 200, { text: store.meta[ref].text });
    try {
      const summary = await getSummary({ store, siteDir: SITE, username: user.username, items, lang: b.lang, ui: b.ui });
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
      if (req.method === 'POST' && route === 'imggenstart') {
        const job = await imagegen.start(+b.qid, b.model, user.username, b.prompt, '', !!b.pick);
        if (b.pick) await consoleprompts.made(`q:${+b.qid}`, job.prompt);   // the item's saved prompt (consoleprompts.js)
        return send(res, 200, { job });
      }
      if (req.method === 'POST' && route === 'imggenedit') return send(res, 200, { job: await imagegen.edit(+b.qid, b.job, b.text, b.model, user.username) });
      if (req.method === 'POST' && route === 'imggendel') { await imagegen.remove(+b.qid, b.job); return send(res, 200, imagegen.list()); }
      // `part`: the console's part the question is in (lessons: realistic; rules: the illustration style).
      if (req.method === 'POST' && route === 'imggendraft') {
        const prompt = await imagegen.draft(+b.qid, b.part === 'rules' ? 'rules' : 'lessons');
        await consoleprompts.saved(`q:${+b.qid}`, prompt);
        return send(res, 200, { prompt });
      }
      if (req.method === 'POST' && route === 'imggenset') { await imagegen.setActive(+b.qid, b.job || null); return send(res, 200, imagegen.list()); }
    } catch (e) { if (e.status) return send(res, e.status, { error: e.message }); throw e; }
  }
  // A question and its statements read aloud (ElevenLabs), as MP3: ?qid=<id>&lang=da|en&voice=woman|man; with
  // ?sample=1 (no qid) the voice's short sample line, for choosing it in the settings; with ?ai=<id> an AI text's
  // recording made by POST /api/ttsai.
  if (req.method === 'GET' && route === 'tts') {
    const u = new URL(req.url, 'http://x');
    if (u.searchParams.get('sample') !== '1' && needsPremium(user)) return send(res, 402, { error: PREMIUM_NEEDED, premium: true });
    try {
      const b = u.searchParams.has('ai') ? await tts.getAi({ store, id: u.searchParams.get('ai') })
        : await tts.get({ store, siteDir: SITE, qid: u.searchParams.get('qid'), lang: u.searchParams.get('lang'), gender: u.searchParams.get('voice'),
          sample: u.searchParams.get('sample') === '1', username: user.username });
      res.writeHead(200, { 'Content-Type': b.mime, 'Content-Length': b.data.length, 'Cache-Control': 'private, max-age=2592000', 'Accept-Ranges': 'none' });
      return res.end(b.data);
    } catch (e) { if (e.status) return send(res, e.status, { error: e.message }); throw e; }
  }
  // «آموزش گام‌به‌گام»: the lessons of the course this user has finished (lesson id → when). GET → { done };
  // POST { lesson } marks one finished.
  if (route === 'courseprogress' && (req.method === 'GET' || req.method === 'POST')) {
    if (req.method === 'POST') {
      const b = await readBody(req), id = String(b.lesson || '');
      if (!/^[a-z0-9-]{2,40}$/.test(id)) return send(res, 400, { error: 'bad lesson' });
      user.course = { ...(user.course || {}), [id]: Date.now() };
      if (Object.keys(user.course).length > 500) return send(res, 400, { error: 'too many' });
      studied(user);
      await store.saveUser(user);
    }
    return send(res, 200, { done: user.course || {} });
  }
  // «تمرین هوشمند»: the user's spaced-repetition cards (question id → { b: box, due, n: answers, w: wrong, mis: wrong
  // while sure }). GET → { cards }; POST { cards } keeps the given ones.
  if (route === 'drill' && (req.method === 'GET' || req.method === 'POST')) {
    if (req.method === 'POST') {
      const b = await readBody(req), cards = { ...(user.drill || {}) };
      const num = (v, max) => (Number.isFinite(v) && v >= 0 && v <= max ? Math.floor(v) : null);
      for (const [id, c] of Object.entries(b.cards && typeof b.cards === 'object' ? b.cards : {})) {
        if (!/^[a-z0-9-]{2,40}$/.test(id) || !c || typeof c !== 'object') return send(res, 400, { error: 'bad card' });
        const card = { b: num(c.b, 5), due: num(c.due, 9e15), n: num(c.n, 1e6), w: num(c.w, 1e6), mis: num(c.mis, 1e6) };
        if (Object.values(card).some(v => v === null)) return send(res, 400, { error: 'bad card' });
        cards[id] = card;
      }
      if (Object.keys(cards).length > 1000) return send(res, 400, { error: 'too many' });
      user.drill = cards;
      studied(user);
      await store.saveUser(user);
    }
    return send(res, 200, { cards: user.drill || {} });
  }
  // The streak and the daily reminder: GET → { streak, today, week: the last 7 days studied (oldest first), reminder,
  // mail: email on, email: the account's confirmed address }; POST { on, hour } sets the reminder (on needs a
  // confirmed address).
  // «اعلان‌ها» (push.js): GET → { key: the public key to subscribe with, notify: the account's choices, devices };
  // POST { remind, time, what, daily } changes them. pushsub { sub, tz } adds this device, pushunsub
  // { endpoint } removes it (signing out), pushtest sends a message to the account's devices now.
  if (route === 'notify' && (req.method === 'GET' || req.method === 'POST')) {
    if (req.method === 'POST') { push.setSettings(user, await readBody(req)); await store.saveUser(user); }
    return send(res, 200, { key: push.key(), notify: push.settingsOf(user), devices: (user.push || []).length });
  }
  if (req.method === 'POST' && route === 'pushsub') {
    const b = await readBody(req), moved = push.subscribe(Object.values(store.users), user, b.sub, b.tz);
    if (!moved) return send(res, 400, { error: 'bad subscription' });
    for (const u of moved) await store.saveUser(u);
    await store.saveUser(user);
    return send(res, 200, { ok: true, devices: user.push.length });
  }
  if (req.method === 'POST' && route === 'pushunsub') {
    const b = await readBody(req);
    if (push.unsubscribe(user, String(b.endpoint || ''))) await store.saveUser(user);
    return send(res, 200, { ok: true });
  }
  if (req.method === 'POST' && route === 'pushtest') {
    if (!(user.push || []).length) return send(res, 400, { error: 'no device' });
    const r = await push.sendTo(user, push.testMessage(user));
    if (r.changed) await store.saveUser(user);
    return send(res, 200, { sent: r.sent });
  }
  if (route === 'streak' && (req.method === 'GET' || req.method === 'POST')) {
    if (req.method === 'POST') {
      const b = await readBody(req), hour = Number.isInteger(+b.hour) && +b.hour >= 5 && +b.hour <= 22 ? +b.hour : 18;
      if (b.on && !(mail.available() && user.email && user.emailOk)) return send(res, 400, { error: 'برای یادآوری ایمیلی، اول یک ایمیل تأییدشده در «حساب کاربری» ثبت کنید.' });
      user.reminder = { ...(user.reminder || {}), on: !!b.on, hour, origin: originOf(req) };
      await store.saveUser(user);
    }
    const days = new Set(user.study || []), now = Date.now();
    return send(res, 200, { streak: streakOf(user), today: days.has(dayKey(now)), week: [6, 5, 4, 3, 2, 1, 0].map(k => days.has(dayKey(now - k * 864e5))),
      reminder: { on: !!(user.reminder && user.reminder.on), hour: (user.reminder && user.reminder.hour) || 18 },
      mail: mail.available() || undefined, email: user.email && user.emailOk ? user.email : undefined });
  }
  // «تمرین سریع تابلوها»: the user's sign cards (sign key → [box, due]). GET → { cards }; POST { cards } keeps the given ones.
  if (route === 'signcards' && (req.method === 'GET' || req.method === 'POST')) {
    if (req.method === 'POST') {
      const b = await readBody(req), cards = { ...(user.signCards || {}) };
      for (const [k, c] of Object.entries(b.cards && typeof b.cards === 'object' ? b.cards : {})) {
        if (!/^[a-z0-9-]{2,40}$/.test(k) || !Array.isArray(c) || c.length !== 2) return send(res, 400, { error: 'bad card' });
        const [box, due] = c.map(Number);
        if (!Number.isInteger(box) || box < 0 || box > 5 || !Number.isFinite(due) || due < 0 || due > 9e15) return send(res, 400, { error: 'bad card' });
        cards[k] = [box, Math.floor(due)];
      }
      if (Object.keys(cards).length > 1000) return send(res, 400, { error: 'too many' });
      user.signCards = cards;
      studied(user);
      await store.saveUser(user);
    }
    return send(res, 200, { cards: user.signCards || {} });
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
      if (req.method === 'GET' && route === 'guideref') return send(res, 200, { ...guideref.list(), models: imagegen.models(), marks: store.meta.consoleMarks || {}, prompts: consoleprompts.marks() });
      if (req.method === 'POST' && route === 'guiderefimport') { guideref.startImport(); return send(res, 200, guideref.list()); }
      if (req.method === 'POST' && route === 'guiderefchoose') { const b = await readBody(req); await guideref.choose(String(b.key || ''), b.choice); return send(res, 200, guideref.list()); }
      if (req.method === 'POST' && route === 'guidedraft') {
        const b = await readBody(req), prompt = await guideref.draft(String(b.key || ''));
        await consoleprompts.saved(`g:${String(b.key || '')}`, prompt);
        return send(res, 200, { prompt });
      }
      if (req.method === 'POST' && route === 'guidegen') {
        const b = await readBody(req), job = await guideref.generate(String(b.key || ''), b.prompt);
        await consoleprompts.made(`g:${String(b.key || '')}`, job.prompt);
        return send(res, 200, { job });
      }
    } catch (e) { if (e.status) return send(res, e.status, { error: e.message }); throw e; }
  }
  // The questions' pictures for the console, by lesson or by the parts of «قوانین» (?kind=lessons|rules).
  if (req.method === 'GET' && route === 'consolepics') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    return send(res, 200, { ...consolepics.list(new URL(req.url, 'http://x').searchParams.get('kind') === 'rules' ? 'rules' : 'lessons', store.meta.images || {}), models: imagegen.models(), marks: store.meta.consoleMarks || {}, prompts: consoleprompts.marks() });
  }
  // An item's saved prompt (consoleprompts.js): ?id=q:<qid>|g:<key> → { id, prompt, by: 'api' | 'claude', at, note, prev }.
  if (req.method === 'GET' && route === 'consoleprompt') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    const id = String(new URL(req.url, 'http://x').searchParams.get('id') || '');
    if (!consoleprompts.ID_RE.test(id)) return send(res, 400, { error: 'bad id' });
    return send(res, 200, consoleprompts.get(id));
  }
  // «اصلاح بخش‌هایی از تصویر» (consoleprompts.region): { id, part, mode, marked, regions: [{ box, message, crop }] } —
  // the pictures as JPEG data URLs drawn by the console; the API changes the saved prompt for the marked parts only,
  // and with mode 'image' the saved picture is corrected in those parts, the rest of it left exactly as it is.
  if (req.method === 'POST' && route === 'consoleregion') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    const b = await readBody(req, 8e6), id = String(b.id || '');
    if (!consoleprompts.ID_RE.test(id)) return send(res, 400, { error: 'bad id' });
    const pic = u => { const m = /^data:(image\/(?:jpeg|png));base64,([A-Za-z0-9+/=]+)$/.exec(String(u || '')); return m ? { mime: m[1], data: Buffer.from(m[2], 'base64') } : null; };
    const n = v => Math.min(1, Math.max(0, +v || 0)), boxOf = x => (x ? { x: n(x.x), y: n(x.y), w: n(x.w), h: n(x.h) } : null);
    const marked = pic(b.marked);
    if (!marked) return send(res, 400, { error: 'تصویر نرسید.' });
    const regions = (Array.isArray(b.regions) ? b.regions : []).slice(0, 8).map(r => ({ box: boxOf(r && r.box), message: r && r.message, crop: pic(r && r.crop) }));
    const part = id[0] === 'g' ? (id.startsWith('g:p-') ? 'priority' : 'signs') : b.part === 'rules' ? 'rules' : 'lessons';
    // mode 'image': the saved picture itself is corrected in those parts (for a question, its newest made picture).
    const mode = b.mode === 'image' ? 'image' : 'prompt';
    const jobs = id[0] === 'q' ? (((store.meta.images || {})[id.slice(2)] || {}).jobs || []).filter(j => j.blob).sort((x, y) => y.at - x.at) : [];
    if (mode === 'image' && id[0] === 'q' && !jobs.length) return send(res, 400, { error: 'این سؤال هنوز تصویر AI ندارد.' });
    try { return send(res, 200, await consoleprompts.region(id, { regions, marked, part, mode, from: jobs[0] && jobs[0].id, by: user.username })); }
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
    return send(res, 200, { items, marks, models: imagegen.models(), prompts: consoleprompts.marks() });
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
    return send(res, 200, { ...adminStats(), reports: (store.meta.reports || []).slice().reverse(), inbox: (store.meta.inbox || []).slice().reverse(),
      mail: { on: mail.available(), reportTo: mail.reportTo(), inbound: !!process.env.RESEND_WEBHOOK_SECRET, forward: !!process.env.FORWARD_TO } });
  }
  // «گزارش خطا» from the app: { kind: 'bug' | 'idea', text, platform, version }, kept (newest REPORTS_KEPT) in
  // store.meta.reports for the admin panel and emailed to the admins (mail.js: REPORT_TO, Reply-To the account's
  // confirmed address); at most REPORTS_PER_HOUR from one user. An email that could not go does not fail the report.
  if (req.method === 'POST' && route === 'report') {
    const b = await readBody(req);
    const text = String(b.text || '').trim().slice(0, 2000);
    if (text.length < 5) return send(res, 400, { error: 'متن گزارش خیلی کوتاه است.' });
    const now = Date.now(), recent = (reportTimes.get(user.username) || []).filter(t => now - t < 3600e3);
    if (recent.length >= REPORTS_PER_HOUR) return send(res, 429, { error: 'گزارش‌های زیادی فرستاده‌اید؛ کمی بعد دوباره امتحان کنید.' });
    recent.push(now); reportTimes.set(user.username, recent);
    const clip = (v, n) => String(v || '').slice(0, n);
    const r = { at: now, username: user.username, name: user.name, kind: b.kind === 'idea' ? 'idea' : 'bug', text, platform: clip(b.platform, 20),
      version: clip(b.version, 20), email: user.email && user.emailOk ? user.email : undefined, ui: clip((user.settings || {}).ui, 4) || undefined };
    const list = (store.meta.reports || []).concat(r).slice(-REPORTS_KEPT);
    await store.saveMeta('reports', list);
    if (mail.available()) mail.sendReport(r).then(() => console.log('report emailed', user.username)).catch(e => console.error('report email', e.message));
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
    studied(user);
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
    // ui: the app's own language (Persian, English or Danish), so it follows the user to another device.
    const ui = ['fa', 'en', 'da'].includes(b.ui) ? b.ui : (user.settings || {}).ui;
    // trans: the language of the translation under the questions, when the user picked one ('auto' goes back to the default).
    const trans = b.trans === 'auto' ? undefined : ['fa', 'en', 'da'].includes(b.trans) ? b.trans : (user.settings || {}).trans;
    // mode (automatic, light or dark) and palette (the colour theme): the look, so it comes back on signing in again.
    const mode = ['system', 'light', 'dark'].includes(b.mode) ? b.mode : (user.settings || {}).mode;
    const palette = THEMES.includes(b.palette) ? b.palette : (user.settings || {}).palette;
    // header: «هدر ساده» on or off (the pages' headers without their pictures), like the look, per account.
    const header = ['plain', 'pictures'].includes(b.header) ? b.header : (user.settings || {}).header;
    user.settings = { showFa: !!b.showFa, timer: !!b.timer, ...(lang ? { lang } : {}), ...(langChosen ? { langChosen } : {}), ...(voice ? { voice } : {}), ...(ui ? { ui } : {}), ...(trans ? { trans } : {}), ...(mode ? { mode } : {}), ...(palette ? { palette } : {}), ...(header ? { header } : {}) };
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
  // One-time (2026-10-18): «هدر ساده» becomes everyone's header; each can turn the pictures back on in settings.
  if (!store.meta.plainHeaderAll) {
    for (const u of Object.values(store.users)) if ((u.settings || {}).header !== 'plain') { u.settings = { ...(u.settings || {}), header: 'plain' }; await store.saveUser(u); }
    await store.saveMeta('plainHeaderAll', 1);
  }
  // One-time (2026-10-18): the trial code's use kept on the account itself (payments.grantPromo), for the accounts that
  // have had it.
  if (!store.meta.promoUsedMark) {
    for (const u of Object.values(store.users)) {
      const p = u.premium && u.premium.promo;
      if (!p || u.promoUsed) continue;
      u.promoUsed = p.at || Date.now();
      if (p.email) u.promoEmail = p.email;
      await store.saveUser(u);
    }
    await store.saveMeta('promoUsedMark', 1);
  }
  // One-time (2026-10-18): the daily email reminder became a notification (the course page, push.js); an email
  // reminder that was on is the notification reminder at the same hour now (it reaches a device once notifications
  // are allowed there), and no reminder emails go out any more.
  if (!store.meta.remindToPush) {
    for (const u of Object.values(store.users)) {
      if (!u.reminder || !u.reminder.on) continue;
      u.notify = { ...(u.notify || {}), remind: true, time: `${String(u.reminder.hour || 18).padStart(2, '0')}:00` };
      u.reminder.on = false;
      await store.saveUser(u);
    }
    await store.saveMeta('remindToPush', 1);
  }
  // Web push (push.js): its keys, then once a minute the reminders and the day's messages that are due.
  await push.init(store);
  setInterval(() => {
    push.tick(store, u => ({ streak: streakOf(u), studiedToday: (u.study || []).includes(dayKey(Date.now())) })).catch(e => console.error('push tick', e.message));
  }, 60e3).unref();
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
  // One-time, asked by the owner: user test starts over as if just registered (same username, name and password).
  // A copy of what it had is kept in meta (`removed:test:reset`) so it can be restored.
  if (store.meta.resetTest !== 1) {
    const u = store.users.test;
    if (u) {
      await store.saveMeta('removed:test:reset', { user: { ...u, salt: undefined, hash: undefined } });
      if (u.avatar && u.avatar.photo) await store.deleteBlob('avatar-test').catch(() => {});
      for (const k of Object.keys(u)) if (!['username', 'name', 'salt', 'hash'].includes(k)) delete u[k];
      Object.assign(u, { created: Date.now(), attempts: [], settings: {} });
      await store.saveUser(u);
      await store.saveMeta('resetTest', 1);
      console.log('reset user test', Object.keys(u));
    } else console.log('reset user test: no such user');
  }
  // One-time, asked by the owner (2026-10-18): the premium pass of alirezakoohpeima5@gmail.com ends today, at the end of
  // 18 October in Copenhagen. Its earlier end is kept in meta (`premium:<username>:until`) so it can be put back.
  if (store.meta.endPremiumAlireza !== 1) {
    const email = 'alirezakoohpeima5@gmail.com', end = Date.parse('2026-10-18T23:59:59+02:00');
    const found = Object.values(store.users).filter(x => [x.email, x.username].some(v => String(v || '').trim().toLowerCase() === email));
    for (const u of found) {
      if (u.premium && u.premium.until > end) {
        await store.saveMeta(`premium:${u.username}:until`, { until: u.premium.until });
        u.premium.until = end;
        await store.saveUser(u);
      }
      console.log('premium of', u.username, 'ends', new Date((u.premium || {}).until || 0).toISOString());
    }
    if (found.length) await store.saveMeta('endPremiumAlireza', 1);
    else console.log('end premium: no account with', email);
  }
  imagegen.init(store, SITE);
  guideref.init(store, imagegen);
  consolepics.init(SITE);
  setTimeout(() => imagegen.learnColours(), 3000);   // the «آموزش» pictures' colours ready for the first visits
  consoleprompts.init(store, imagegen, guideref, consolepics);
  webpic.init(store);
  // The course's pictures ready in memory soon after a start (webpic.js).
  webpic.warm(() => Object.entries(imagegen.courseVersions()).map(([k, v]) => [`/course-art/${k}.png:${v}`, () => imagegen.courseBlob(k)]));
  loadVisits();
  // Save the visit counts before App Platform stops the old instance on a redeploy.
  process.on('SIGTERM', async () => { await saveVisits(true); process.exit(0); });
  const server = http.createServer(async (req, res) => {
    // Browsers keep to HTTPS for this site from the first visit on.
    if (isHttps(req)) res.setHeader('Strict-Transport-Security', 'max-age=31536000');
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
  });
  // A client that sends its request very slowly is dropped instead of holding a connection open for minutes.
  server.headersTimeout = 30e3; server.requestTimeout = 120e3;
  server.listen(PORT, HOST, () => {
    const nets = Object.values(require('node:os').networkInterfaces()).flat().filter(n => n && n.family === 'IPv4' && !n.internal);
    console.log(`TeoriPrøve ${VERSION} running:\n  http://localhost:${PORT}`);
    nets.forEach(n => console.log(`  http://${n.address}:${PORT}   (other devices on your Wi-Fi)`));
    if (INVITE_CODE) console.log('  Sign-up requires the invite code (INVITE_CODE).');
    syncPayments();
  }).on('error', err => {
    if (err.code !== 'EADDRINUSE') throw err;
    console.error(`Port ${PORT} is already in use — TeoriPrøve is probably already running in another terminal tab.\n` +
      `Open http://localhost:${PORT}, or stop the other one first:  kill $(lsof -ti tcp:${PORT} -sTCP:LISTEN)`);
    process.exit(1);
  });
}

main().catch(err => { console.error('Failed to start:', err); process.exit(1); });
