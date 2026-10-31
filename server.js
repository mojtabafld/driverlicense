// Teoripro server: serves ./site and a small JSON API with per-user accounts.
// Run locally:  node server.js            (data kept in data/db.json)
// In the cloud: set DATABASE_URL (PostgreSQL) so accounts survive redeploys.
// Optional env: PORT, HOST, INVITE_CODE (required to sign up when set), DB_FILE,
// ADMIN_USERS (comma-separated usernames that get the admin panel), ANTHROPIC_API_KEY (AI lessons in the review),
// LESSON_AI_MODEL (Claude model for those lessons, default claude-opus-5-5), IMAGE_PROMPT_MODEL and IMAGE_MODEL (the console's
// prompt-writing Claude model and the picture model; defaults claude-opus-5-5 and gpt-image-2-5-sunburst), KIE_API_KEY (new question pictures, admin panel),
// INSIGHTS_HOUR / INSIGHTS_EMAIL / INSIGHTS_MODEL (the AI's daily report, insights.js), ELEVENLABS_API_KEY (questions read aloud), STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, PREMIUM_PRICE_WEEK / _MONTH / _QUARTER
// PROMO_CODE / PROMO_DAYS (a free trial code) and PREMIUM_GATE (premium passes bought with Stripe Checkout, payments.js),
// RESEND_API_KEY, MAIL_FROM, REPORT_TO, RESEND_WEBHOOK_SECRET and FORWARD_TO (email, mail.js).
// See README.md for all variables.
'use strict';
process.env.TZ = 'Europe/Copenhagen'; // server-side dates (logs, day buckets) in Copenhagen time
// The secret keys from Oracle Cloud Vault (vault.js; Mojtaba 2026-10-30): with TP_VAULT_SECRET (the secret's OCID) set,
// the secret's KEY=value lines are read first, before any module reads its settings, and take the place of those in
// /etc/teoripro/env. Should the vault not answer (20 seconds), the server goes on with what the env file has.
if (process.env.TP_VAULT_SECRET) {
  try {
    const text = require('node:child_process').execFileSync(process.execPath, [require('node:path').join(__dirname, 'vault.js'), process.env.TP_VAULT_SECRET],
      { encoding: 'utf8', timeout: 20e3, stdio: ['ignore', 'pipe', 'pipe'] });
    let n = 0;
    for (const line of text.split(/\r?\n/)) {
      const m = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
      if (!m || line.trim().startsWith('#')) continue;
      process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2'); n++;
    }
    console.log(`Secrets: ${n} keys from Oracle Cloud Vault`);
  } catch (e) {
    console.error('Secrets: Oracle Cloud Vault not read, the env file\'s keys are used:', String(e.stderr || e.message).trim());
    // With the keys only in the vault (the env file without the database's password), the server would run without
    // them: it stops instead, and systemd starts it again a few seconds later, until the vault answers.
    if (!process.env.ORACLE_PASSWORD && !process.env.DATABASE_URL) { console.error('Secrets: no database keys without the vault; trying again'); process.exit(1); }
  }
}
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { openStore } = require('./store');
const { bank: lessonBank, setNotes, getLesson, getSummary, getTopic, lessonsAvailable, isCurrentLesson, isCurrentSummary, refUi, uiOf } = require('./lesson');
const { search: aiSearch, termPage: aiTermPage, ask: aiAsk } = require('./search');
const imagegen = require('./imagegen');
const guideref = require('./guideref');
const consolepics = require('./consolepics');
const consoleprompts = require('./consoleprompts');
const newqadmin = require('./newqadmin');
const tts = require('./tts');
const webpic = require('./webpic');
const png = require('./png');
const payments = require('./payments');
const playbilling = require('./playbilling');
playbilling.setKeyFile(path.join(path.dirname(process.env.DB_FILE || path.join(__dirname, 'data', 'db.json')), 'play-service-account.json'));
const push = require('./push');
const mail = require('./mail');
mail.setSmtpFile(path.join(path.dirname(process.env.DB_FILE || path.join(__dirname, 'data', 'db.json')), 'smtp.json'));
const insights = require('./insights');
const coach = require('./coach');
const Anthropic = require('@anthropic-ai/sdk');

const PORT = +process.env.PORT || 3000;
// The newest Android app's version, as the settings show it («نسخه‌ی نرم‌افزار», mobile/app.json, x.x such as 1.0), set
// in the dashboard as LATEST_APP_VERSION when a new APK is published (Mojtaba 2026-10-20); an app with an older version
// asks its user to install it (mobile/src/ui/update-prompt.tsx), from APP_DOWNLOAD_URL (default: the latest release's page).
const latestApp = () => {
  const version = String(process.env.LATEST_APP_VERSION || '').trim();
  // The /app copy's own Android app (its releases are «Android /app build N», tags prove-N) from APP_DOWNLOAD_URL_PROVE.
  return /^\d+\.\d+$/.test(version) ? { version, url: (process.env.APP_DOWNLOAD_URL || '').trim() || 'https://github.com/mojtabafld/driverlicense/releases/latest',
    urlProve: (process.env.APP_DOWNLOAD_URL_PROVE || '').trim() || 'https://github.com/mojtabafld/driverlicense/releases' } : undefined;
};
const HOST = process.env.HOST || '0.0.0.0';
const SITE = path.join(__dirname, 'site');
const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'data', 'db.json');
// Invite codes are temporarily switched off: sign-up is open and the form has no invite field.
// Set INVITE_PAUSED back to false to require INVITE_CODE again.
const INVITE_PAUSED = true;
const INVITE_CODE = INVITE_PAUSED ? '' : (process.env.INVITE_CODE || '').trim();
const SESSION_DAYS = 60;
const MAX_ATTEMPTS = 500;
const MODES = ['random', 'mistakes', 'top', 'lesson', 'sections', 'new', 'demo']; // lesson: one of prove.dk's 44 tests, in its order; sections: random questions from chosen official sections; new: «آزمون جدید», the app's own questions (site/newq.js); demo: the 5-question tryout from home's pass ring (not a free test)
const lessonOf = b => (b.mode === 'lesson' && Number.isInteger(+b.lesson) && +b.lesson > 0 ? { lesson: +b.lesson } : {});
const MAX_WORDS = 3000;
const MAX_TERMS = 500; // bookmarked glossary terms per user
const MAX_SAVED = 1000; // bookmarked questions per user
const MAX_LESSON_DRAFTS = 100; // unfinished lessons per user (there are 44)
const ADMINS = new Set((process.env.ADMIN_USERS || '').split(',').map(u => u.trim().toLowerCase()).filter(Boolean));
const isAdmin = u => ADMINS.has(u.username);

const clip = (v, n) => String(v ?? '').trim().slice(0, n);

// Version of what is live: a hash of the question bank and the app's web version (its index.html names its bundles);
// /api/config reports it to check what is live.
// (and «آزمون جدید»'s questions, so a deploy that only adds questions shows in /api/config too)
const VERSION = crypto.createHash('sha256')
  .update([path.join(SITE, 'data.js'), path.join(SITE, 'newq.js'), path.join(__dirname, 'app-web', 'index.html')].filter(f => fs.existsSync(f)).map(f => fs.readFileSync(f)).join('\0'))
  .digest('hex').slice(0, 8);
// The admin's console at /console (console/index.html): only the comparison of the teaching pictures with prove.dk's.
const CONSOLE_HTML = fs.readFileSync(path.join(__dirname, 'console', 'index.html'));
// The privacy policy at /privacy (pages/privacy.html, in English, Danish and Persian; Mojtaba 2026-10-21, for Google sign-in).
const PRIVACY_HTML = fs.readFileSync(path.join(__dirname, 'pages', 'privacy.html'));
// How to delete an account, at /delete-account (pages/delete-account.html, three languages): the address Google Play's
// Data safety form asks for (Mojtaba 2026-10-23).
const DELETE_HTML = fs.readFileSync(path.join(__dirname, 'pages', 'delete-account.html'));
const ADMIN_HTML = fs.readFileSync(path.join(__dirname, 'console', 'admin.html'));
const IMAGES_HTML = fs.readFileSync(path.join(__dirname, 'console', 'images.html'));
const SYSTEM_HTML = fs.readFileSync(path.join(__dirname, 'console', 'system.html'));
// The style each picture was last made in on the admin's picture page (its «سبک تصویر»), so the page opens on it again:
// store.meta.picStyles = { ['newq:<id>' | 'course:<key>' | 'g:<key>']: style }.
const PIC_STYLES = new Set(['flat', 'sim', 'realistic', 'semi', '3d', 'cartoon', 'signs']);
const picStyle = id => ((store.meta.picStyles || {})[id]) || null;
async function setPicStyle(id, style) {
  if (!PIC_STYLES.has(style)) return;
  const m = store.meta.picStyles = store.meta.picStyles || {};
  if (m[id] === style) return;
  m[id] = style;
  await store.saveMeta('picStyles', m);
}

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
  // freeAi: the one free answer analysis is still to be had (true), or the question it was had for.
  freeAi: u.guest ? undefined : u.freeAi ? u.freeAi.qid : true,
  guest: u.guest || undefined, email: u.email || undefined, emailOk: u.email && u.emailOk ? true : undefined, verify: needsVerify(u) || undefined,
  // playId: the id the Android app hands Google Play with a purchase, so it counts for this account only (playbilling.js).
  playId: playbilling.available() && !u.guest ? playbilling.accountId(u.username) : undefined,
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
// Signing in, up and deleting the account with a code instead of a password (Mojtaba 2026-10-20): a random 6-digit
// code to the address, kept as the forgotten password's is (u.reset; the same 15 minutes, 5 tries, one a minute and 6 a
// day; signing in and up at most 3 an hour per account or address, Mojtaba 2026-10-20). For an address with no account
// yet (signing up) the code waits in memory with the same limits (a restart only means asking for a new one). Unlike
// sendResetMail, waiting is said to the app, as it shows a timer.
const signupCodes = new Map();   // address → { h, exp, sent, day, n, tries }
async function sendCodeMail(u, e, lang, kind) {
  const now = Date.now(), v = (u ? u.reset : signupCodes.get(e)) || {};
  if (v.sent && now - v.sent < 60e3) throw Object.assign(new Error('یک دقیقه صبر کنید و دوباره امتحان کنید.'), { status: 429 });
  const day = (v.day && now - v.day < 864e5) ? v.day : now, n = day === v.day ? (v.n || 0) : 0;
  if (n >= 6) throw Object.assign(new Error('امروز ایمیل زیادی فرستاده شده است؛ فردا دوباره امتحان کنید.'), { status: 429 });
  // The codes sent in the last hour (to this account or address), for the hourly limit of signing in and up.
  const hour = (Array.isArray(v.hour) ? v.hour : []).filter(t => now - t < 3600e3);
  if (kind !== 'delete' && hour.length >= 3) throw Object.assign(new Error('در هر ساعت حداکثر ۳ کد فرستاده می‌شود؛ کمی بعد دوباره امتحان کنید.'), { status: 429 });
  const code = String(crypto.randomInt(0, 1e6)).padStart(6, '0');
  const rec = { h: tokenHash(`${u ? u.username : e}:${code}`), exp: now + 15 * 60e3, sent: now, day, n: n + 1, tries: 0, hour: [...hour, now] };
  if (u) { u.reset = rec; await store.saveUser(u); } else signupCodes.set(e, rec);
  const ui = ['fa', 'en', 'da'].includes(lang) ? lang : u ? (u.settings || {}).ui : 'fa';
  await mail.sendCode(u ? u.email || u.username : e, u ? u.name || '' : '', code, ui, kind);
  console.log('code mail sent', kind, u ? u.username : e.replace(/^(.{2}).*@/, '$1…@'));
}
// Past exams a user deletes (one, or the whole history) are kept in meta `removed:<username>:attempts`, the newest
// KEPT_REMOVED, so they can be put back (Mojtaba 2026-10-22: negin's history was gone and there was no copy).
const KEPT_REMOVED = 1000;
async function keepRemoved(u, list) {
  if (!list.length) return;
  const key = `removed:${u.username}:attempts`, old = (store.meta[key] && store.meta[key].attempts) || [];
  await store.saveMeta(key, { at: Date.now(), attempts: old.concat(list.map(a => ({ ...a, removedAt: Date.now() }))).slice(-KEPT_REMOVED) });
  console.log('attempts removed, copy kept', u.username.replace(/^(.{2}).*@/, '$1…@'), list.length);
}
// What stays of a deleted account, by its address (a hash of it, not the address; Mojtaba 2026-10-20), in store.meta.gone:
// that it had the free trial (so the trial cannot be had again with the address), and its bought pass (given back when
// the address signs up again while it lasts; its purchases go with it either way, so the payments' sync, which finds
// accounts by address too, never counts them again for the new account).
// A picture's plain background cut away (png.cutout from its edge colour), halved until at most `max` px wide; the
// picture as it was when it cannot be read.
function cutBackground(b, max) {
  try {
    let im;
    if (b.mime === 'image/png') im = png.decode(b.data);
    else { const j = require('jpeg-js').decode(b.data, { useTArray: true, formatAsRGBA: false, maxMemoryUsageInMB: 1024 }); im = { w: j.width, h: j.height, ch: 3, px: Buffer.from(j.data) }; }
    if (!im || im.ch < 3) return b;
    while (im.w > max) im = png.half(im);
    const bg = png.edgeColour(im), B = [1, 3, 5].map(i => parseInt(bg.slice(i, i + 2), 16)), out = png.cutout(im, bg, 8, 30);
    // (also the background's own colour where it is closed in by the picture, e.g. between a scale's chains)
    for (let i = 0; i < im.w * im.h; i++) {
      const o = i * im.ch;
      if (Math.max(Math.abs(im.px[o] - B[0]), Math.abs(im.px[o + 1] - B[1]), Math.abs(im.px[o + 2] - B[2])) <= 6) out.px[i * 4 + 3] = 0;
    }
    return { mime: 'image/png', data: png.encode(out) };
  } catch (e) { console.error('cut background', e.message); return b; }
}
const mailKey = e => tokenHash(`mail:${mail.normal(e)}`);
const gone = () => { const g = (store.meta.gone = store.meta.gone || { trial: {}, pass: {} }); g.ai = g.ai || {}; return g; };
async function rememberGone(u) {
  const e = u.email || (String(u.username).includes('@') ? u.username : '');
  if (!e) return;
  const g = gone(), k = mailKey(e), keys = [k, ...(u.promoEmail && mail.normal(u.promoEmail) !== mail.normal(e) ? [mailKey(u.promoEmail)] : [])];
  if (u.promoUsed || (u.premium && u.premium.promo)) for (const x of keys) g.trial[x] = u.promoUsed || Date.now();
  const paid = u.premium && (u.premium.buys || []).some(b => !b.refunded);
  if (paid) g.pass[k] = { until: u.premium.until, plan: u.premium.plan, buys: u.premium.buys };
  if (u.freeAi) g.ai[k] = u.freeAi.at || Date.now();   // and that it had its free analysis
  if (keys.some(x => g.trial[x]) || g.pass[k] || g.ai[k]) await store.saveMeta('gone', g);
}
// A new account at an address a deleted account had: no trial again, and its pass back while it lasts. Returns the
// pass's end when one was given back.
async function welcomeBack(u, e) {
  const g = gone(), k = mailKey(e);
  if (g.trial[k]) { u.promoUsed = g.trial[k]; u.promoEmail = mail.normal(e); }
  if (g.ai[k]) u.freeAi = { at: g.ai[k], qid: -1 };
  const p = g.pass[k];
  if (!p) return 0;
  delete g.pass[k];
  await store.saveMeta('gone', g);
  u.premium = { until: p.until, plan: p.plan, buys: p.buys || [], ...(p.until > Date.now() ? { restored: Date.now() } : {}) };
  if (!(p.until > Date.now())) return 0;
  console.log('premium pass given back', u.username, new Date(p.until).toISOString());
  return p.until;
}
// A new account's own message on the news page: the welcome email's words (deleted with the account; Mojtaba 2026-10-30).
function welcomeInbox(u, lang, restored) {
  const m = mail.welcomeNews(u.name, ['fa', 'en', 'da'].includes(lang) ? lang : 'fa', restored);
  u.inbox = [{ id: `w${u.created}`, at: u.created, title: m.title, text: m.text }];
}
// The emails after signing up and after buying the pass (mail.js sendWelcome / sendPremium), not waited for.
const appLink = req => `${req ? originOf(req) : 'https://teori.bitlane.app'}/`;
function premiumMail(u, req) {
  if (!mail.available() || !u.email || !u.premium) return;
  mail.sendPremium(u.email, u.name || u.username, (u.settings || {}).ui, appLink(req), u.premium.until).catch(err => console.error('premium mail', u.username, err.message));
}

// Whether the code is the one waiting for a new account at this address; a wrong code counts as a try.
function signupCodeOk(e, code) {
  const r = signupCodes.get(e);
  if (!r || !(r.exp > Date.now()) || (r.tries || 0) >= RESET_TRIES) return false;
  if (safeEqual(r.h, tokenHash(`${e}:${String(code || '').replace(/\D/g, '')}`))) return true;
  r.tries = (r.tries || 0) + 1;
  return false;
}
// The account a forgotten-password address belongs to: by its address, or by a username that is this address.
function resetUser(e) {
  const same = v => !!v && mail.normal(v) === e;
  return Object.values(store.users).find(x => !x.guest && same(x.email)) || Object.values(store.users).find(x => !x.guest && same(x.username));
}
// The account found when signing in, if it is still in the database: one the other server deleted during a deploy
// (store.js catchUp) goes from memory with its sessions, and none is found.
async function live(u) {
  if (!u || !store.exists || (+u.created || 0) > Date.now() - 60e3 || (await store.exists(u.username))) return u;
  delete store.users[u.username];
  for (const [t, x] of Object.entries(store.sessions)) if (x.username === u.username) delete store.sessions[t];
  return undefined;
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
// Google sign-in (the route google/start): the web client's ID (public) and its secret, kept in the dashboard only.
const GOOGLE_ID = (process.env.GOOGLE_CLIENT_ID || '181063268831-njoti40kij1q7af2hk20m06ed09vqvg7.apps.googleusercontent.com').trim();
const GOOGLE_SECRET = () => (process.env.GOOGLE_CLIENT_SECRET || '').trim();
const googleOn = () => !!GOOGLE_ID && !!GOOGLE_SECRET();
// The sign-ins on their way (state → where to go back, for 10 minutes) and the one-time codes (a minute).
const googleStates = new Map(), googleCodes = new Map();
setInterval(() => { const t = Date.now(); for (const [k, v] of googleStates) if (t - v.at > 10 * 60e3) googleStates.delete(k); for (const [k, v] of googleCodes) if (t - v.at > 60e3) googleCodes.delete(k); }, 60e3).unref();
const RULES_TO_ACCOUNT = Date.parse('2026-10-21T00:00:00Z');   // «قوانین»'s reading moved from the browser to the account
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
        premiumMail(u);
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
// What insights.js and coach.js read: the bank, the scoring, the day and, for the report's mail, where the panel is.
const usageTimes = new Map();
const aiDeps = () => ({ store, bank: lessonBank(SITE), scoreOf, FULL, PASS_MIN, dayKey, visits });
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
      until: prem.until || null, plan: prem.plan || null, promo: !!prem.promo, paid, saved: Array.isArray(u.saved) ? u.saved.length : 0, modes,
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
// On a server of our own (Oracle Cloud, deploy/oracle) behind a proxy on the same machine, every request comes from
// 127.0.0.1: CLIENT_IP_HEADER names the header that proxy sets with the visitor's address (cf-connecting-ip behind a
// Cloudflare Tunnel, x-forwarded-for behind Caddy: its last entry, the one Caddy added), read only for requests from
// this machine itself, so nobody can set it from outside (Mojtaba 2026-10-29).
const IP_HEADER = String(process.env.CLIENT_IP_HEADER || '').trim().toLowerCase();
const fromHere = a => /^(127\.|::1$|::ffff:127\.)/.test(a || '');
const clientIp = req => {
  const d = String(req.headers['do-connecting-ip'] || '').trim();
  if (d) return d;
  const r = req.socket.remoteAddress;
  if (IP_HEADER && fromHere(r)) { const v = String(req.headers[IP_HEADER] || '').split(',').pop().trim(); if (v) return v; }
  return r;
};

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
// The capacity test (.github/workflows/loadtest.yml) sends LOADTEST_TOKEN in X-Load-Test: all its requests come from
// one address, so they pass the per-address limit above. Without LOADTEST_TOKEN set nothing passes (Mojtaba 2026-10-31).
function loadTest(req) {
  const want = process.env.LOADTEST_TOKEN || '', got = String(req.headers['x-load-test'] || '');
  return want.length >= 16 && got.length === want.length && crypto.timingSafeEqual(Buffer.from(got), Buffer.from(want));
}
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
// The question bank and pictures are only served to signed-in users (and «آزمون جدید»'s questions, site/newq.js).
const isProtected = p => p === '/data.js' || p === '/newq.js' || p.startsWith('/img/');

// The app's web version (mobile/, built into app-web/ with `npm run build:web`) is the site at the root: a
// single-page app, so a path that is no file of it (and nothing else of the server's) gets its index.html; its hashed
// bundles are cached for a year. A copy of the app built with the base path /app (app-web-app/) is served at /app/:
// that copy shows prove.dk's own pictures (PROVE_PICS in mobile/src/lib/config.ts). It is a fixed copy, kept as it was
// built (`npm run build:web` builds the root only; `npm run build:web-app` builds the copy again), and its question
// bank and the questions' pictures are fixed too (frozen/app/, FROZEN in config.ts).
const APP_MIME = { ...MIME, '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.map': 'application/json' };
// DEFAULT_THEME: the main site's colour theme for everyone who has not picked one (mobile/src/ui/palette.ts; default
// graphite). Written into the root page and /app's, so the web versions start in it; phones read it from /api/config.
const THEMES = ['ocean', 'violet', 'lime', 'coral', 'amber', 'emerald', 'forest', 'rose', 'sky', 'mono', 'teal', 'indigo', 'orchid', 'slate', 'graphite'];
const defaultTheme = () => { const t = String(process.env.DEFAULT_THEME || '').trim().toLowerCase(); return THEMES.includes(t) ? t : 'graphite'; };
const withTheme = html => html.replace('<head>', `<head><script>window.__TP_THEME=${JSON.stringify(defaultTheme())}</script>`);
const WEBS = {
  root: { dir: path.join(__dirname, 'app-web'), page: b => Buffer.from(withTheme(b.toString('utf8'))) },
  // Its page links the manifest and the icon of /app (its own start page), and its manifest is that of the root's
  // with /app/ as start and scope.
  app: { dir: path.join(__dirname, 'app-web-app'), base: '/app',
    // (and the same default theme as the root page: without it the copy started in sky, Mojtaba 2026-10-21)
    page: b => Buffer.from(withTheme(b.toString('utf8')).replace('href="/manifest.webmanifest"', 'href="/app/manifest.webmanifest"')),
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
  if (p === '/privacy' || p === '/privacy/' || p === '/app/privacy') {
    res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'public, max-age=3600', 'X-Content-Type-Options': 'nosniff', ...PAGE_HEADERS });
    return res.end(req.method === 'HEAD' ? undefined : PRIVACY_HTML);
  }
  if (p === '/delete-account' || p === '/delete-account/' || p === '/app/delete-account') {
    res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'public, max-age=3600', 'X-Content-Type-Options': 'nosniff', ...PAGE_HEADERS });
    return res.end(req.method === 'HEAD' ? undefined : DELETE_HTML);
  }
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
  // The admin's picture page, opened from the dashboard's «ایجاد تصاویر» (console/images.html).
  if (p === '/admin/images') {
    res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex', ...PAGE_HEADERS });
    return res.end(req.method === 'HEAD' ? undefined : IMAGES_HTML);
  }
  // The admin's «سامانه» page: the architecture with the server's live numbers (console/system.html, /api/system).
  if (p === '/admin/system') {
    res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex', ...PAGE_HEADERS });
    return res.end(req.method === 'HEAD' ? undefined : SYSTEM_HTML);
  }
  // The app's fixed copy with prove.dk's pictures at /app/.
  if (p === '/app') { res.writeHead(301, { Location: '/app/' }); return res.end(); }
  if (p.startsWith('/app/')) return serveAppWeb(req, res, p.slice(4), WEBS.app);
  // The app at the root (everything that is not the API's or a shared file).
  if (!p.startsWith('/img/') && p !== '/data.js' && p !== '/newq.js' && !p.startsWith('/newq-art/') && !p.startsWith('/intro/') && !p.startsWith('/learn-art/') && !p.startsWith('/course-art/') && !p.startsWith('/avatar-art/') && !p.startsWith('/hero-art/') && !p.startsWith('/hero-try/') && !p.startsWith('/login-art/') && !p.startsWith('/store-art/') && !p.startsWith('/guide-art/')) return serveAppWeb(req, res, p);
  // The app's intro pictures (made by imagegen.js), open to everyone: the intro comes before signing in.
  // The pictures of the «آموزش» tab's cards (made by imagegen.js), served the same way.
  // And the profile pictures to choose from, and the pictures at the top of the «آموزش» and «آزمون» pages.
  const im = /^\/intro\/([1-9])\.png$/.exec(p), lm = /^\/learn-art\/([1-9]|10)\.png$/.exec(p), am = /^\/avatar-art\/([1-9]|10)\.png$/.exec(p), hm = /^\/hero-art\/([1-9]|10)\.png$/.exec(p), tm = /^\/hero-try\/([1-2])\.png$/.exec(p), lg = /^\/login-art\/([1-8])\.png$/.exec(p), sm = /^\/store-art\/([1-7])\.png$/.exec(p),
    gm2 = /^\/guide-art\/([a-z0-9-]{3,40})\.png$/.exec(p), cm = /^\/course-art\/([a-z0-9-]{3,40})\.png$/.exec(p), nm = /^\/newq-art\/(\d{4,5})\.png$/.exec(p);
  if (im || lm || am || hm || tm || lg || sm || gm2 || cm || nm) {
    const load = () => (im ? imagegen.introBlob(im[1]) : lm ? imagegen.learnBlob(lm[1]) : am ? imagegen.avatarBlob(am[1]) : hm ? imagegen.heroBlob(hm[1]) : tm ? imagegen.heroTryBlob(tm[1]) : lg ? imagegen.loginBlob(lg[1]) : sm ? imagegen.storeBlob(sm[1]) : cm ? imagegen.courseBlob(cm[1]) : nm ? imagegen.newqBlob(nm[1]) : guideref.webBlob(gm2[1], new URL(req.url, 'http://x').searchParams.get('s') || 'l'));
    // Sent smaller and kept in memory (webpic.js) when the picture's version is known; the others as they are.
    const ver = im ? imagegen.introVersions()[im[1]] : lm ? imagegen.learnVersions()[lm[1]] : am ? imagegen.avatarVersions()[am[1]] : hm ? imagegen.heroVersions()[hm[1]] : lg ? imagegen.loginVersions()[lg[1]]
      : cm ? imagegen.courseVersions()[cm[1]] : nm ? imagegen.newqVersions()[nm[1]] : undefined;   // (/guide-art has its own sizes and store: guideref.webBlob)
    // The «آموزش» cards' pictures with their plain background cut away (Mojtaba 2026-10-29: in the dark theme the
    // picture's own background showed on the card), at most 720 px wide, as a transparent PNG.
    const loadCut = () => load().then(b => (b ? cutBackground(b, 720) : b));
    return (ver ? webpic.get(`${p}:${ver}${lm ? ':cut3' : ''}`, lm ? loadCut : load, im ? 1280 : undefined) : load()).then(b => {
      if (!b) { res.writeHead(404); return res.end(); }
      // (A sign chosen from prove.dk can be SVG: shown as a picture only, nothing in it runs.)
      res.writeHead(200, { 'Content-Type': b.mime, 'Content-Length': b.data.length, 'Cache-Control': 'public, max-age=2592000', 'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; img-src data:" });
      res.end(req.method === 'HEAD' ? undefined : b.data);
    }).catch(() => { res.writeHead(500); res.end(); });
  }
  if (isProtected(p) && !sessionUser(req)) { res.writeHead(401, { 'Cache-Control': 'no-store' }); return res.end('Sign in first'); }
  // «آزمون جدید»'s questions with the admin's edits and removals (newqadmin.js).
  if (p === '/newq.js') {
    const b = newqadmin.js();
    res.writeHead(200, { 'Content-Type': MIME['.js'], 'Content-Length': b.length, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    return res.end(req.method === 'HEAD' ? undefined : b);
  }
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
  if (route !== 'config' && !loadTest(req) && !apiAllowed(ip)) return send(res, 429, { error: 'درخواست زیاد؛ کمی بعد دوباره امتحان کنید.' });
  // For the uptime check (.github/workflows/uptime.yml): the server answers and its database too.
  if (req.method === 'GET' && route === 'health') {
    let db = false;
    try { db = store.exists ? (await Promise.race([store.exists('__health__'), new Promise((_, no) => setTimeout(() => no(new Error('slow')), 8e3))]), true) : true; } catch {}
    const files = store.files ? await store.files.ready() : null;
    return send(res, db ? 200 : 503, { ok: db, db, files, up: Math.round(process.uptime()), mem: Math.round(process.memoryUsage().rss / 1e6) });
  }
  if (req.method === 'GET' && route === 'config') {
    return send(res, 200, { inviteRequired: !!INVITE_CODE, mail: mail.available() || undefined, google: googleOn() || undefined, theme: defaultTheme(), version: VERSION, app: latestApp(), aiLessons: lessonsAvailable(), tts: tts.available(), intro: imagegen.introVersions(), introBg: imagegen.introColours(), learnArt: imagegen.learnVersions(), learnBg: imagegen.learnColours(), courseArt: imagegen.courseVersions(), newqArt: imagegen.newqVersions(), avatarArt: imagegen.avatarVersions(), heroArt: imagegen.heroVersions(), loginArt: imagegen.loginVersions(), heroDiag: imagegen.heroDiag(),
      // Premium can be bought (a Stripe key is set): its plans (id, days, kroner), whether the AI and read-aloud need it, test mode.
      pay: payFor((sessionUser(req) || {}).user) ? { plans: payments.plans(), gate: payments.gated() || undefined, test: payments.testMode() || undefined,
        promo: payments.promoCodes().length ? payments.promoDays() : undefined, trial: payments.promoDays() } : undefined,
      // Premium can be bought in the Android app with Google Play (GOOGLE_PLAY_SERVICE_ACCOUNT): its product ids.
      play: playbilling.available() ? { products: playbilling.products() } : undefined,
      // ?pics=prove (the app's copy at /app): prove.dk's pictures of the signs and right of way wherever they are copied in.
      guideArt: new URL(req.url, 'http://x').searchParams.get('pics') === 'prove' ? guideref.proveVersions() : guideref.versions(),
      // the questions' made pictures' versions too, so the app sees a new one without signing in again
      imgv: imagegen.versions() });
  }
  if (req.method === 'POST' && route === 'register') {
    if (tooMany(ip)) return send(res, 429, { error: 'تلاش‌های ناموفق زیاد. ۱۰ دقیقه دیگر دوباره امتحان کنید.' });
    // `exam`: the questions' language when it was chosen while signing up (the app then does not ask it again).
    const { username, password, name, invite, email, lang, exam } = await readBody(req);
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
      created: Date.now(), attempts: [], settings: { header: 'plain', ...(exam === 'da' || exam === 'en' ? { lang: exam, langChosen: true } : {}) }, ...(mail.available() && e ? { email: e, mustVerify: true } : {}) };
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
    const user = await live(store.users[id] || (id.includes('@') ? Object.values(store.users).find(x => x.email === id) : undefined));
    if (!user || typeof password !== 'string' || !(await checkPw(password, user))) {
      addFail(ip);
      return send(res, 401, { error: 'ایمیل (یا نام کاربری) یا رمز عبور اشتباه است.' });
    }
    fails.delete(ip);
    const token = await newSession(req, res, user.username);
    return send(res, 200, { user: publicUser(user), ...(isApp(req) ? { token } : {}) });
  }

  // Signing in with Google (Mojtaba 2026-10-21), the authorization-code flow, on the web and in the Android apps alike:
  // GET google/start?ret=web|app&base=/|/app/&scheme=…&lang=… goes to Google's own page; Google comes back to
  // google/callback, whose code the server trades (with GOOGLE_CLIENT_SECRET) for the user's verified email and name.
  // The account with that address signs in; without one, an account is made (as a code sign-up: the trial and pass of a
  // deleted one kept, the welcome email; the questions' language is asked after, as for any account). The browser or
  // app then gets a one-time code (a minute) in its address, which POST google/finish { code } trades for the session,
  // so no session token is ever in an address.
  if (req.method === 'GET' && route === 'google/start') {
    if (!googleOn()) return send(res, 404, { error: 'ورود با گوگل فعال نیست.' });
    const q = new URL(req.url, 'http://x').searchParams;
    const st = crypto.randomBytes(18).toString('hex');
    googleStates.set(st, { at: Date.now(), ret: q.get('ret') === 'app' ? 'app' : 'web', base: q.get('base') === '/app/' ? '/app/' : '/',
      scheme: ['teoriprove', 'teoriprove-prove'].includes(q.get('scheme')) ? q.get('scheme') : 'teoriprove', lang: ['fa', 'en', 'da'].includes(q.get('lang')) ? q.get('lang') : 'fa' });
    const u = new URL(process.env.GOOGLE_AUTH_URL || 'https://accounts.google.com/o/oauth2/v2/auth');   // (the env: a stand-in for tests)
    for (const [k, v] of Object.entries({ client_id: GOOGLE_ID, redirect_uri: `${originOf(req)}/api/google/callback`, response_type: 'code', scope: 'openid email profile', state: st, prompt: 'select_account' })) u.searchParams.set(k, v);
    res.writeHead(302, { Location: u.toString(), 'Cache-Control': 'no-store' });
    return res.end();
  }
  if (req.method === 'GET' && route === 'google/callback') {
    const q = new URL(req.url, 'http://x').searchParams, st = googleStates.get(String(q.get('state') || ''));
    googleStates.delete(String(q.get('state') || ''));
    const back = (o, params) => {
      const where = o && o.ret === 'app' ? `${o.scheme}://google` : `${originOf(req)}${o ? o.base : '/'}`;
      res.writeHead(302, { Location: `${where}?${new URLSearchParams(params)}`, 'Cache-Control': 'no-store' });
      res.end();
    };
    if (!st || Date.now() - st.at > 10 * 60e3) return back(st, { google_error: 'expired' });
    if (q.get('error') || !q.get('code')) return back(st, { google_error: 'cancelled' });
    try {
      const r = await fetch(process.env.GOOGLE_TOKEN_URL || 'https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ code: q.get('code'), client_id: GOOGLE_ID, client_secret: GOOGLE_SECRET(), redirect_uri: `${originOf(req)}/api/google/callback`, grant_type: 'authorization_code' }) });
      const t = await r.json();
      if (!r.ok || !t.id_token) throw new Error(t.error || `token ${r.status}`);
      // The ID token came straight from Google over TLS, so its claims can be read without checking its signature.
      const c = JSON.parse(Buffer.from(t.id_token.split('.')[1], 'base64url').toString('utf8'));
      if (c.aud !== GOOGLE_ID || !['accounts.google.com', 'https://accounts.google.com'].includes(c.iss) || !c.email || c.email_verified === false) throw new Error('bad id token');
      const e = mail.normal(c.email);
      let u = await live(resetUser(e));
      if (!u) {
        if (!registerAllowed(ip)) return back(st, { google_error: 'busy' });
        const salt = crypto.randomBytes(16).toString('hex'), now = Date.now();
        u = { username: e, name: String(c.given_name || c.name || e.split('@')[0]).trim().slice(0, 40) || e, salt, hash: await hashPw(crypto.randomBytes(24).toString('hex'), salt),
          created: now, attempts: [], settings: { header: 'plain' }, email: e, emailOk: now, okOnce: now, google: String(c.sub || '') };
        const restored = await welcomeBack(u, e);
        welcomeInbox(u, st.lang, restored);
        store.users[e] = u;
        await store.saveUser(u);
        console.log('account made with Google', e.replace(/^(.{2}).*@/, '$1…@'));
        mail.sendWelcome(e, u.name, st.lang, appLink(req), restored).catch(err => console.error('welcome mail', err.message));
      } else {
        if (!u.google && c.sub) u.google = String(c.sub);
        if (!u.emailOk && u.email) { u.emailOk = u.okOnce = Date.now(); delete u.verify; delete u.mustVerify; }
        await store.saveUser(u);
      }
      const once = crypto.randomBytes(18).toString('hex');
      googleCodes.set(once, { username: u.username, at: Date.now() });
      return back(st, { google: once });
    } catch (err) {
      console.error('google sign-in', err.message);
      return back(st, { google_error: 'failed' });
    }
  }
  if (req.method === 'POST' && route === 'google/finish') {
    const k = String((await readBody(req)).code || ''), g = googleCodes.get(k);
    googleCodes.delete(k);
    const u = g && Date.now() - g.at < 60e3 ? store.users[g.username] : null;
    if (!u) { addFail(ip); return send(res, 400, { error: 'ورود با گوگل کامل نشد؛ دوباره امتحان کنید.' }); }
    const token = await newSession(req, res, u.username);
    return send(res, 200, { user: publicUser(u), ...(isApp(req) ? { token } : {}) });
  }
  // POST code { email, lang, signup }: the code that signs in (an account with this address; else 404) or, with
  // `signup`, makes a new account (no account with it yet; else 409). Counted as a failed try, as «forgot».
  if (req.method === 'POST' && route === 'code') {
    if (!mail.available()) return send(res, 404, { error: 'ایمیل فعال نیست.' });
    if (tooMany(ip)) return send(res, 429, { error: 'تلاش‌های ناموفق زیاد. ۱۰ دقیقه دیگر دوباره امتحان کنید.' });
    const { email, lang, signup } = await readBody(req);
    const e = mail.normal(email);
    if (!mail.EMAIL_RE.test(e)) return send(res, 400, { error: 'یک ایمیل درست وارد کنید.' });
    addFail(ip);
    const u = await live(resetUser(e));
    if (signup && u) return send(res, 409, { error: 'با این ایمیل قبلاً حساب ساخته شده است؛ از «ورود» وارد شوید.' });
    if (!signup && !u) return send(res, 404, { error: 'حسابی با این ایمیل ثبت نشده است.' });
    if (signup && !registerAllowed(ip)) return send(res, 429, { error: 'ساخت حساب از این اتصال زیاد بوده است؛ کمی بعد دوباره امتحان کنید.' });
    try { await sendCodeMail(u, e, lang, signup ? 'signup' : 'login'); }
    catch (err) { if (err.status) return send(res, err.status, { error: err.message }); console.error('code mail', err.message); return send(res, 502, { error: 'ایمیل فرستاده نشد؛ کمی بعد دوباره امتحان کنید.' }); }
    return send(res, 200, { ok: true });
  }
  // POST emailfree { email }: whether an address can still sign up (no account has it), asked at sign-up's email step so
  // a taken address is said there (Mojtaba 2026-10-20); else 409. Counted as a failed try, as «code».
  if (req.method === 'POST' && route === 'emailfree') {
    if (tooMany(ip)) return send(res, 429, { error: 'تلاش‌های ناموفق زیاد. ۱۰ دقیقه دیگر دوباره امتحان کنید.' });
    const e = mail.normal((await readBody(req)).email);
    if (!mail.EMAIL_RE.test(e)) return send(res, 400, { error: 'یک ایمیل درست وارد کنید.' });
    addFail(ip);
    if (await live(resetUser(e))) return send(res, 409, { error: 'با این ایمیل قبلاً حساب ساخته شده است؛ از «ورود» وارد شوید.' });
    return send(res, 200, { ok: true });
  }
  // POST codecheck { email, code }: whether a sign-up code is right, before its last step (the questions' language)
  // makes the account with codein. A wrong code counts as a try.
  if (req.method === 'POST' && route === 'codecheck') {
    if (tooMany(ip)) return send(res, 429, { error: 'تلاش‌های ناموفق زیاد. ۱۰ دقیقه دیگر دوباره امتحان کنید.' });
    const { email, code } = await readBody(req);
    if (!signupCodeOk(mail.normal(email), code)) { addFail(ip); return send(res, 400, { error: BAD_CODE }); }
    return send(res, 200, { ok: true });
  }
  // POST codein { email, code, name, exam }: the code from /api/code. For an account with this address it signs in (and
  // confirms the address); for a new one it makes the account (its shown name, the questions' language chosen while
  // signing up; a random password nobody knows) and signs in.
  if (req.method === 'POST' && route === 'codein') {
    if (tooMany(ip)) return send(res, 429, { error: 'تلاش‌های ناموفق زیاد. ۱۰ دقیقه دیگر دوباره امتحان کنید.' });
    const b = await readBody(req), { email, code, name, exam } = b;
    const e = mail.normal(email);
    let u = await live(resetUser(e));
    if (u) {
      if (!(await resetCodeOk(u, code))) { addFail(ip); return send(res, 400, { error: BAD_CODE }); }
      delete u.reset;
      if (!u.emailOk && u.email) { u.emailOk = u.okOnce = Date.now(); delete u.verify; delete u.mustVerify; }
      await store.saveUser(u);
    } else {
      if (!signupCodeOk(e, code)) { addFail(ip); return send(res, 400, { error: BAD_CODE }); }
      signupCodes.delete(e);
      const salt = crypto.randomBytes(16).toString('hex');
      const now = Date.now();
      u = { username: e, name: String(name || e.split('@')[0]).trim().slice(0, 40) || e, salt, hash: await hashPw(crypto.randomBytes(24).toString('hex'), salt),
        created: now, attempts: [], settings: { header: 'plain', ...(exam === 'da' || exam === 'en' ? { lang: exam, langChosen: true } : {}) }, email: e, emailOk: now, okOnce: now };
      const back = await welcomeBack(u, e);
      welcomeInbox(u, b.lang, back);
      store.users[e] = u;
      await store.saveUser(u);
      console.log('account made with a code', e.replace(/^(.{2}).*@/, '$1…@'));
      mail.sendWelcome(e, u.name, ['fa', 'en', 'da'].includes(b.lang) ? b.lang : 'fa', appLink(req), back).catch(err => console.error('welcome mail', err.message));
    }
    fails.delete(ip);
    const token = await newSession(req, res, u.username);
    return send(res, 200, { user: publicUser(u), ...(isApp(req) ? { token } : {}) });
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
    const u = await live(resetUser(e));
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
        premiumMail(u, req);
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
      ? `intent://verified?ok=${ok ? 1 : 0}#Intent;scheme=teoriprove;package=app.bitlane.teoripro;S.browser_fallback_url=${encodeURIComponent(originOf(req) + web)};end`
      : null;
    res.writeHead(302, { Location: app || web, 'Cache-Control': 'no-store' });
    return res.end();
  }

  const s = sessionUser(req);
  if (!s) return send(res, 401, { error: 'unauthorized' });
  const user = s.user;
  // The «سامانه» page's numbers (console/system.html): the machine and the app over 24 hours (monitor.js), the sizes,
  // the AI's use, RAG, the backups, the version running.
  if (req.method === 'GET' && route === 'system') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    let head = '';
    try { const h = fs.readFileSync(path.join(__dirname, '.git', 'HEAD'), 'utf8').trim(); head = h.startsWith('ref: ') ? fs.readFileSync(path.join(__dirname, '.git', h.slice(5)), 'utf8').trim() : h; } catch {}
    const ai = require('./aigateway').report();
    return send(res, 200, {
      at: Date.now(), up: Math.round(process.uptime()), node: process.version, version: VERSION, commit: head.slice(0, 7),
      users: Object.keys(store.users).length, storage: store.kind || 'file', files: store.files ? await store.files.ready() : null,
      monitor: require('./monitor').report(), ai: { today: ai.today, days: ai.days, budget: ai.budget, models: ai.models },
      rag: require('./rag').info(), backups: (await require('./backup').list().catch(() => [])).slice(0, 14),
    });
  }
  // The AI gateway's use for the admin (aigateway.js): today by task, the last 14 days, the budget, the last calls.
  // The admin's list of «آزمون جدید»'s questions that say nearly the same (rag.js duplicates), for the «سامانه» page.
  if (req.method === 'GET' && route === 'ragdupes') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    const min = Math.min(0.99, Math.max(0.85, +new URL(req.url, 'http://x').searchParams.get('min') || 0.93));
    return send(res, 200, require('./rag').duplicates({ min }) || { pending: true });
  }
  if (req.method === 'GET' && route === 'aiusage') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    return send(res, 200, { ...require('./aigateway').report(), rag: require('./rag').info() });
  }
  // The admin's backups (backup.js): the list, and one made now.
  if (route === 'backups' || route === 'backupnow') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    try {
      if (req.method === 'POST' && route === 'backupnow') return send(res, 200, { made: await require('./backup').backup(true), list: await require('./backup').list() });
      if (req.method === 'GET' && route === 'backups') return send(res, 200, { list: await require('./backup').list(), bucket: !!store.files });
    } catch (e) { console.error('backup', e.message); return send(res, 502, { error: e.message }); }
  }
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
        premiumMail(user, req);
        console.log('premium bought', user.username, s.metadata && s.metadata.plan, s.amount_total, s.currency, s.livemode ? 'live' : 'test');
      }
    }
    return send(res, 200, { user: publicUser(user) });
  }
  // POST playpurchase { product, token }: a pass bought in the Android app with Google Play (playbilling.js). Google is
  // asked whether it is paid and bought for this account; then its days are added (once per token) and it is consumed.
  if (req.method === 'POST' && route === 'playpurchase') {
    if (!playbilling.available()) return send(res, 404, { error: 'خرید در اپ فعال نیست.' });
    if (user.guest) return send(res, 403, { error: 'برای خرید نسخه‌ی ویژه، اول حساب کاربری بسازید.' });
    const b = await readBody(req), product = String(b.product || ''), token = String(b.token || '');
    if (!playbilling.PRODUCTS[product] || !/^[A-Za-z0-9._-]{20,1000}$/.test(token)) return send(res, 400, { error: 'bad purchase' });
    if (!payments.hasPlay(user, token)) {
      let p;
      try { p = await playbilling.check(product, token, user.username); } catch (e) { if (e.status) return send(res, e.status, { error: e.message }); throw e; }
      if (!p.tied || !p.mine) return send(res, 403, { error: 'forbidden' });
      if (p.pending) return send(res, 200, { user: publicUser(user), pending: true });
      if (!p.paid) return send(res, 402, { error: 'پرداخت انجام نشده است.' });
      // A token counted on another account (it cannot be: it is tied to this one) or consumed already is not counted again.
      if (p.consumed) return send(res, 409, { error: 'این خرید قبلاً ثبت شده است.' });
      if (payments.grantPlay(user, { token, plan: p.plan, orderId: p.orderId, test: p.test })) {
        await store.saveUser(user);
        premiumMail(user, req);
        console.log('premium bought (Google Play)', user.username, p.plan, p.orderId, p.test ? 'test' : 'live');
      }
    }
    // Consumed once counted (again if a first try failed); the days stay either way.
    try { await playbilling.consume(product, token); } catch (e) { if (e.status !== 404 && e.status !== 400) console.error('play consume', e.message); }
    return send(res, 200, { user: publicUser(user) });
  }
  // POST trial: the same free trial (PROMO_DAYS days, 3 unless set) without a code, for every account once (Mojtaba
  // 2026-10-29: the first premium page offers it); the code's rules otherwise: not for guest accounts and, with email on,
  // only for a confirmed address, one trial per address.
  if (req.method === 'POST' && route === 'trial') {
    if (!payFor(user)) return send(res, 404, { error: 'دوره‌ی رایگان فعال نیست.' });
    if (user.guest) return send(res, 403, { error: 'برای دوره‌ی رایگان، اول با نام کاربری خودتان حساب بسازید.' });
    if (mail.available()) {
      if (!user.email || !user.emailOk) return send(res, 403, { error: 'برای دوره‌ی رایگان، اول ایمیل خود را در «حساب کاربری» ثبت و تأیید کنید.' });
      if (gone().trial[mailKey(user.email)] || Object.values(store.users).some(x => x !== user && ((x.premium && x.premium.promo && x.premium.promo.email === user.email) || (x.promoEmail && x.promoEmail === user.email)))) return send(res, 409, { error: 'شما قبلاً از دوره‌ی رایگان استفاده کرده‌اید.' });
    }
    if (!payments.grantPromo(user, 'TRIAL', user.emailOk ? user.email : undefined)) return send(res, 409, { error: 'شما قبلاً از دوره‌ی رایگان استفاده کرده‌اید.' });
    await store.saveUser(user);
    console.log('premium trial (no code)', user.username);
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
      if (gone().trial[mailKey(user.email)] || Object.values(store.users).some(x => x !== user && ((x.premium && x.premium.promo && x.premium.promo.email === user.email) || (x.promoEmail && x.promoEmail === user.email)))) return send(res, 409, { error: 'شما قبلاً از کد تخفیف استفاده کرده‌اید.' });
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
  // POST deletecode: the code that deletes the account, to its address (accounts with one, while email is on).
  if (req.method === 'POST' && route === 'deletecode') {
    if (!mail.available() || !user.email) return send(res, 404, { error: 'ایمیل فعال نیست.' });
    try { await sendCodeMail(user, user.email, (await readBody(req)).lang, 'delete'); }
    catch (err) { if (err.status) return send(res, err.status, { error: err.message }); console.error('delete code mail', err.message); return send(res, 502, { error: 'ایمیل فرستاده نشد؛ کمی بعد دوباره امتحان کنید.' }); }
    return send(res, 200, { ok: true });
  }
  // Delete the account, asked from the settings with the code sent to its address (deletecode) or, for accounts
  // without one, the user's password (failed tries count like failed sign-ins):
  // the user, all their sessions, their own profile picture, their error reports and the emails received from their
  // address are removed, and the cookie cleared.
  if (req.method === 'DELETE' && route === 'account') {
    if (tooMany(ip)) return send(res, 429, { error: 'تلاش‌های ناموفق زیاد. ۱۰ دقیقه دیگر دوباره امتحان کنید.' });
    const b = await readBody(req);
    if (b.code != null ? !(await resetCodeOk(user, b.code)) : typeof b.password !== 'string' || !(await checkPw(b.password, user))) { addFail(ip); return send(res, 403, { error: b.code != null ? BAD_CODE : 'رمز عبور درست نیست.' }); }
    const u = user.username;
    await rememberGone(user);
    for (const [t, x] of Object.entries(store.sessions)) if (x.username === u) delete store.sessions[t];
    delete store.users[u];
    await store.deleteUser(u);
    if (store.meta[`removed:${u}:attempts`]) await store.saveMeta(`removed:${u}:attempts`, { at: Date.now(), attempts: [] }); // a deleted account's tests go too
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
  if (['summary', 'ttsai', 'topic'].includes(route) && needsPremium(user)) return send(res, 402, { error: PREMIUM_NEEDED, premium: true });
  // Without premium where it is needed: one analysis free per account (not guests, whom anyone can make again; Mojtaba
  // 2026-10-20), its question kept (user.freeAi), so that analysis opens again later and no other one does.
  if (req.method === 'POST' && route === 'lesson') {
    const b = await readBody(req);
    insights.count('ai:lesson');
    const qid = +b.qid, att = attemptAt(b.at);
    const paid = !needsPremium(user), free = !paid && !user.guest && (!user.freeAi || user.freeAi.qid === qid);
    if (!paid && !free) return send(res, 402, { error: PREMIUM_NEEDED, premium: true });
    const ref = att && att.ai && att.ai.q && att.ai.q[qid];
    if (ref && store.meta[ref] && isCurrentLesson(SITE, qid, ref) && refUi(ref) === uiOf(b.ui)) return send(res, 200, { text: store.meta[ref].text });
    try {
      const lesson = await getLesson({ store, siteDir: SITE, username: user.username, qid, ticks: Array.isArray(b.a) ? b.a.slice(0, 4) : null, lang: b.lang, ui: b.ui });
      if (att && att.items.some(it => it.id === qid)) await linkAi(att, qid, lesson.key);
      if (!paid && !user.freeAi) { user.freeAi = { at: Date.now(), qid }; await store.saveUser(user); return send(res, 200, { text: lesson.text, user: publicUser(user) }); }
      return send(res, 200, { text: lesson.text });
    } catch (e) {
      if (e instanceof Anthropic.APIError) { console.error('lesson API error', e.status, e.message); return send(res, 502, { error: 'آموزش هوش مصنوعی الان در دسترس نیست.' }); }
      if (e.status) return send(res, e.status, { error: e.message });
      throw e;
    }
  }
  // The topic sheet's points for one reviewed question, written by AI (lesson.js getTopic): { qid, lang, ui }.
  if (req.method === 'POST' && route === 'topic') {
    const b = await readBody(req);
    insights.count('ai:topic');
    try {
      return send(res, 200, { text: (await getTopic({ store, siteDir: SITE, username: user.username, qid: +b.qid, lang: b.lang, ui: b.ui })).text });
    } catch (e) {
      if (e instanceof Anthropic.APIError) { console.error('topic API error', e.status, e.message); return send(res, 502, { error: 'آموزش هوش مصنوعی الان در دسترس نیست.' }); }
      if (e.status) return send(res, e.status, { error: e.message });
      throw e;
    }
  }
  // AI search of the learning pages (search.js): { q, ui, v } or, the first time / when the server asks (409), { q, ui, catalog }.
  if (req.method === 'POST' && route === 'coursesearch') {
    insights.count('ai:search');
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
  // «از مربی بپرس» (search.js ask): { q, ui, v, history: [{ q, a }] } or, the first time / when the server asks (409),
  // { q, ui, catalog, history }. Premium, as the coach.
  if (req.method === 'POST' && route === 'ask') {
    insights.count('ai:ask');
    if (needsPremium(user)) return send(res, 402, { error: PREMIUM_NEEDED, premium: true });
    const b = await readBody(req, 700e3);
    try {
      return send(res, 200, await aiAsk({ username: user.username, q: b.q, v: b.v, catalog: b.catalog, ui: b.ui, history: b.history }));
    } catch (e) {
      if (e instanceof Anthropic.APIError) { console.error('ask API error', e.status, e.message); return send(res, 502, { error: 'مربی الان در دسترس نیست.' }); }
      if (e.status) return send(res, e.status, { error: e.message });
      throw e;
    }
  }
  // «سؤال‌های مشابه» after a test (rag.js similar): { ids } of the questions answered wrongly → { ids } of «آزمون جدید»'s
  // questions closest to them (none taken out by the admin). [] when the meaning vectors are not there.
  if (req.method === 'POST' && route === 'similar') {
    const b = await readBody(req), Q = lessonBank(SITE).Q;
    const qs = (Array.isArray(b.ids) ? b.ids : []).slice(0, 25).map(id => Q.get(+id)).filter(Boolean);
    try {
      const ids = (await require('./rag').similar(qs)).filter(id => { const q = Q.get(id); return q && !q.x; });
      return send(res, 200, { ids });
    } catch (e) { console.error('similar', e.message); return send(res, 200, { ids: [] }); }
  }
  // «آموزش این واژه» in the glossary (search.js termPage): { term: { da, en, fa, cat }, v } or, the first time / when the
  // server asks (409), { term, catalog }. For every account: each term is asked about once, then kept.
  if (req.method === 'POST' && route === 'termpage') {
    insights.count('ai:term');
    const b = await readBody(req, 700e3);
    try {
      return send(res, 200, await aiTermPage({ store, username: user.username, term: b.term, v: b.v, catalog: b.catalog }));
    } catch (e) {
      if (e instanceof Anthropic.APIError) { console.error('term page API error', e.status, e.message); return send(res, 502, { error: 'جستجوی هوشمند الان در دسترس نیست.' }); }
      if (e.status) return send(res, e.status, { error: e.message });
      throw e;
    }
  }
  // AI summary of the mistakes of a whole exam or lesson: [{ id, a }] of the wrongly answered questions.
  if (req.method === 'POST' && route === 'summary') {
    const b = await readBody(req);
    insights.count('ai:summary');
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
  // The calendar's notes (mobile/src/app/calendar.tsx; Mojtaba 2026-10-21): the user's own lines on a day (key d:YYYY-MM-DD),
  // a course lesson (c:<lesson id>) or an exam (a:<its time>). GET → { notes: key → { text, at } }; POST { key, text }
  // keeps one, an empty text removes it.
  if (route === 'notes' && (req.method === 'GET' || req.method === 'POST')) {
    if (req.method === 'POST') {
      const b = await readBody(req), key = String(b.key || ''), text = String(b.text ?? '').trim();
      if (!/^(d:\d{4}-\d{2}-\d{2}|c:[a-z0-9-]{2,40}|a:\d{10,14})$/.test(key)) return send(res, 400, { error: 'bad note' });
      if (text.length > 2000) return send(res, 400, { error: 'یادداشت بیش از حد بلند است.' });
      const notes = { ...(user.notes || {}) };
      if (text) notes[key] = { text, at: Date.now() }; else delete notes[key];
      if (Object.keys(notes).length > 1000) return send(res, 400, { error: 'یادداشت‌ها بیش از حد زیاد است.' });
      user.notes = notes;
      await store.saveUser(user);
    }
    return send(res, 200, { notes: user.notes || {} });
  }
  // «قوانین»: the parts the user has read (their titles), kept with the account so they go when it is deleted (Mojtaba
  // 2026-10-21; before, in the browser, a deleted account's reading showed for the next one). GET → { read }; POST
  // { title } adds one; POST { titles } takes the list kept in the browser until now, once, and only for an account made
  // before this change (a newer one on the same browser may follow a deleted one).
  if (route === 'rulesread' && (req.method === 'GET' || req.method === 'POST')) {
    if (req.method === 'POST') {
      const b = await readBody(req), ok = t => typeof t === 'string' && t.length > 0 && t.length <= 120;
      const add = ok(b.title) ? [b.title] : Array.isArray(b.titles) && !user.rulesImported && (+user.created || 0) < RULES_TO_ACCOUNT ? b.titles.filter(ok) : [];
      if (Array.isArray(b.titles)) user.rulesImported = true;
      user.rulesRead = [...new Set([...(user.rulesRead || []), ...add])].slice(0, 100);
      await store.saveUser(user);
    }
    return send(res, 200, { read: user.rulesRead || [] });
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
    const b = await readBody(req);
    // The Android app: its device token for the server's notifications (fcm.js), beside the phone's own reminders.
    if (b.fcm) {
      const moved = push.subscribeFcm(Object.values(store.users), user, b.fcm);
      if (!moved) return send(res, 400, { error: 'bad token' });
      for (const u of moved) await store.saveUser(u);
      await store.saveUser(user);
      return send(res, 200, { ok: true });
    }
    const moved = push.subscribe(Object.values(store.users), user, b.sub, b.tz);
    if (!moved) return send(res, 400, { error: 'bad subscription' });
    for (const u of moved) await store.saveUser(u);
    await store.saveUser(user);
    return send(res, 200, { ok: true, devices: user.push.length });
  }
  if (req.method === 'POST' && route === 'pushunsub') {
    const b = await readBody(req);
    if (b.fcm ? push.unsubscribeFcm(user, String(b.fcm)) : push.unsubscribe(user, String(b.endpoint || ''))) await store.saveUser(user);
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
    insights.count('ai:read-aloud');
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
        const b = await readBody(req), job = await guideref.generate(String(b.key || ''), b.prompt, b.provider === 'openai' ? 'openai' : 'kie');
        await consoleprompts.made(`g:${String(b.key || '')}`, job.prompt);
        await setPicStyle(`g:${String(b.key || '')}`, b.style);
        return send(res, 200, { job });
      }
    } catch (e) { if (e.status) return send(res, e.status, { error: e.message }); throw e; }
  }
  // The admin's picture page (/admin/images): the step-by-step course's pictures by lesson and «آزمون جدید»'s by topic
  // (?set=course|newq), each with its version, and a new one on its way or failed; a picture's prompt; and a new
  // picture from an edited prompt.
  // …and its questions' bookmarks, removal from the bank and AI edits (newqadmin.js): newqitem?id, and POST newqmark
  // { id, on }, newqremove { id, on }, newqai { id, instruction } (a proposal), newqapply { id, q }, newqrevert { id }.
  if (route.startsWith('newq') && ['newqitem', 'newqmark', 'newqremove', 'newqai', 'newqapply', 'newqrevert'].includes(route)) {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    try {
      if (req.method === 'GET' && route === 'newqitem') return send(res, 200, newqadmin.item(new URL(req.url, 'http://x').searchParams.get('id')));
      if (req.method !== 'POST') return send(res, 405, { error: 'method' });
      const b = await readBody(req, 2e5);
      if (route === 'newqmark') return send(res, 200, await newqadmin.mark(b.id, !!b.on));
      if (route === 'newqremove') return send(res, 200, await newqadmin.remove(b.id, !!b.on));
      if (route === 'newqai') return send(res, 200, await newqadmin.aiEdit(b.id, b.instruction));
      if (route === 'newqapply') return send(res, 200, await newqadmin.applyEdit(b.id, b.q, user.username));
      if (route === 'newqrevert') return send(res, 200, await newqadmin.revert(b.id));
    } catch (e) { if (e.status) return send(res, e.status, { error: e.message }); console.error(route, e.message); return send(res, 502, { error: 'انجام نشد؛ دوباره امتحان کنید.' }); }
  }
  // …and a prompt rewritten for the style chosen there (imagegen.restyle): { prompt, style } → { prompt }.
  if (req.method === 'POST' && route === 'restyle') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    const b = await readBody(req);
    try { return send(res, 200, { prompt: await imagegen.restyle(b.prompt, String(b.style || '')) }); }
    catch (e) { if (e.status) return send(res, e.status, { error: e.message }); console.error('restyle', e.message); return send(res, 502, { error: 'تغییر سبک پرامپت ممکن نشد؛ دوباره امتحان کنید.' }); }
  }
  // …the picture services there are, to choose from: { kie: { ok, name }, openai: { ok, name } }.
  if (req.method === 'GET' && route === 'imageproviders') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    return send(res, 200, imagegen.providers());
  }
  // …a prompt in Persian ({ prompt } → { text }) and the prompt with the admin's request worked in ({ prompt, request } → { prompt }).
  if (req.method === 'POST' && (route === 'prompttr' || route === 'promptrevise')) {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    const b = await readBody(req);
    try {
      if (route === 'prompttr') return send(res, 200, { text: await imagegen.translatePrompt(b.prompt) });
      return send(res, 200, { prompt: await imagegen.revisePrompt(b.prompt, b.request) });
    } catch (e) { if (e.status) return send(res, e.status, { error: e.message }); console.error(route, e.message); return send(res, 502, { error: 'انجام نشد؛ دوباره امتحان کنید.' }); }
  }
  if (route === 'courseart' || route === 'courseprompt' || route === 'coursegen') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    const q = new URL(req.url, 'http://x').searchParams;
    try {
      if (req.method === 'GET' && route === 'courseart') {
        const set = q.get('set') === 'newq' ? 'newq' : 'course', v = imagegen.artVersions(set);
        const item = ({ key, name, da }) => { const j = imagegen.oneOff(`${set}-${key}`); return { key, name, da, v: v[key] || null, making: j && !j.done ? j.state : null, failed: j && j.done && !j.blob && j.error ? j.error : null }; };
        const groups = set === 'newq' ? consolepics.newqGroups() : consolepics.courseGroups(imagegen.artKeys('course'));
        // (a question's bookmark, removal and AI edit: newqadmin.js)
        const fl = set === 'newq' ? newqadmin.flags() : {};
        const more = x => { const f = fl[x.key]; return f ? { ...x, name: f.name || x.name, marked: !!f.m, removed: !!f.x, edited: !!f.e } : x; };
        return send(res, 200, { groups: groups.map(g => ({ title: g.title, items: g.items.map(x => more(item(x))) })) });
      }
      if (req.method === 'GET' && route === 'courseprompt') {
        const set = q.get('set') === 'newq' ? 'newq' : 'course', key = String(q.get('key') || ''), j = imagegen.oneOff(`${set}-${key}`), prompt = imagegen.artPrompt(set, key);
        if (prompt == null) return send(res, 404, { error: 'این تصویر پیدا نشد.' });
        return send(res, 200, { key, prompt: j && !j.done ? j.prompt : prompt, style: picStyle(`${set}:${key}`) });
      }
      if (req.method === 'POST' && route === 'coursegen') {
        const b = await readBody(req);
        const set = b.set === 'newq' ? 'newq' : 'course', job = await imagegen.artGen(set, String(b.key || ''), b.prompt, b.provider === 'openai' ? 'openai' : 'kie');
        await setPicStyle(`${set}:${String(b.key || '')}`, b.style);
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
    return send(res, 200, { ...consoleprompts.get(id), style: picStyle(id) });
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
  // The pages the app opened (mobile/src/lib/usage.ts): counted per day without the account (insights.js); at most once
  // in 15 seconds from one account.
  if (req.method === 'POST' && route === 'usage') {
    const b = await readBody(req), now = Date.now();
    if (now - (usageTimes.get(user.username) || 0) < 15e3) return send(res, 429, { error: 'too often' });
    usageTimes.set(user.username, now);
    return send(res, 200, { n: insights.track(b.screens) });
  }
  // The personal coach (coach.js): { ui, kind: 'learn' | 'exam', catalog? } → { coach, stats? } | { few } | { locked }
  // (premium, as the other AI features) | { disabled } («حالت مربی» off).
  if (req.method === 'POST' && route === 'coach') {
    const b = await readBody(req);
    if (!insights.available()) return send(res, 200, { off: true });
    if (needsPremium(user) || user.guest) return send(res, 200, { locked: true });
    if ((user.settings || {}).coach === false) return send(res, 200, { disabled: true });
    const kind = b.kind === 'learn' ? 'learn' : 'exam';
    insights.count(`ai:coach-${kind}`);
    try { return send(res, 200, await coach.getPage(user, uiOf(b.ui), aiDeps(), kind, b.catalog)); }
    catch (e) {
      console.error('coach', e.status || '', e.message);
      return send(res, 502, { error: 'مربی هوشمند الان در دسترس نیست.' });
    }
  }
  // (The AI's daily report and its card in the dashboard were removed, Mojtaba 2026-10-30; the question notes already
  // approved still go into the AI's analyses.)
  if (req.method === 'POST' && route === 'qnote') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    const b = await readBody(req);
    if (!['approve', 'reject', 'remove'].includes(b.action)) return send(res, 400, { error: 'bad action' });
    const notes = insights.decide(+b.qid, b.action, { fa: typeof b.fa === 'string' ? b.fa.trim() : '', en: typeof b.en === 'string' ? b.en.trim() : '', by: user.username });
    if (!notes) return send(res, 404, { error: 'not found' });
    await store.saveMeta('qNotes', notes);
    setNotes(notes);
    return send(res, 200, { ok: true });
  }
  // News for every user (Mojtaba 2026-10-29): short messages the admin writes in the dashboard (general information,
  // updates, new tips), newest first; the app shows them behind the bell on the home page, with a red dot while one is
  // newer than the last the device has seen. store.meta.news: [{ id, at, title, text, by }], at most 100 kept.
  if (req.method === 'GET' && route === 'news') {
    // (only the messages since the account was made, and its own ones, e.g. its welcome; Mojtaba 2026-10-30)
    const since = user.created || 0;
    const items = [...(store.meta.news || []).filter(x => x.at >= since), ...(user.inbox || [])].sort((a, b) => b.at - a.at).slice(0, 50);
    return send(res, 200, { items: items.map(({ id, at, title, text }) => ({ id, at, title, text })) });
  }
  if (req.method === 'POST' && route === 'news') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    const b = await readBody(req);
    const title = String(b.title || '').trim().slice(0, 140), text = String(b.text || '').trim().slice(0, 4000);
    if (!title && !text) return send(res, 400, { error: 'عنوان یا متن پیام را بنویسید.' });
    const item = { id: crypto.randomBytes(6).toString('hex'), at: Date.now(), title, text, by: user.username };
    const news = [...(store.meta.news || []), item].slice(-100);
    store.meta.news = news;
    await store.saveMeta('news', news);
    // and a notification to everyone with notifications on, unless the admin turned it off (in the background)
    if (b.notify !== false) push.broadcast(store, item).then(n => console.log('news push', item.id, n)).catch(e => console.error('news push', e.message));
    return send(res, 200, { item, notify: b.notify !== false });
  }
  if (req.method === 'DELETE' && route === 'news') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    const id = new URL(req.url, 'http://x').searchParams.get('id') || '';
    const news = (store.meta.news || []).filter(x => x.id !== id);
    store.meta.news = news;
    await store.saveMeta('news', news);
    return send(res, 200, { ok: true });
  }
  // The Google Play key card in the dashboard: GET its state (the account's email, never the key), POST { key } a new one
  // (the JSON file's text), POST playkeycheck to ask Google whether it works.
  // The SMTP card in the dashboard: GET its settings (never the password), POST { host, port, user, pass } saves them
  // (an empty password keeps the saved one), DELETE removes them (back to Resend), POST smtptest { to } sends a test.
  if (route === 'smtp' || route === 'smtptest') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    if (req.method === 'GET' && route === 'smtp') return send(res, 200, mail.smtpInfo());
    if (req.method === 'DELETE' && route === 'smtp') { mail.clearSmtp(); return send(res, 200, mail.smtpInfo()); }
    if (req.method === 'POST' && route === 'smtp') {
      try { mail.saveSmtp(await readBody(req)); } catch (e) { return send(res, e.status || 500, { error: e.message }); }
      return send(res, 200, mail.smtpInfo());
    }
    if (req.method === 'POST' && route === 'smtptest') {
      const b = await readBody(req), to = mail.normal(b.to || user.email);
      if (!mail.EMAIL_RE.test(to)) return send(res, 400, { error: 'یک ایمیل درست بنویسید.' });
      try { await mail.sendTest(to); return send(res, 200, { ok: true }); } catch (e) { return send(res, 502, { error: e.detail || e.message }); }
    }
  }
  // POST resettrial { email }: an address made new again for the free trial and the one free analysis (an admin's
  // exception, e.g. for testing; Mojtaba 2026-10-30): its deleted accounts' records go, and on its account(s) the trial
  // marks and a trial-only pass.
  if (req.method === 'POST' && route === 'resettrial') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    const e = mail.normal((await readBody(req)).email);
    if (!mail.EMAIL_RE.test(e)) return send(res, 400, { error: 'یک ایمیل درست بنویسید.' });
    const g = gone(), k = mailKey(e);
    const had = !!(g.trial[k] || g.ai[k]);
    delete g.trial[k]; delete g.ai[k];
    await store.saveMeta('gone', g);
    let accounts = 0;
    for (const u of Object.values(store.users)) {
      const ue = mail.normal(u.email || (String(u.username).includes('@') ? u.username : ''));
      if (ue !== e && mail.normal(u.promoEmail || '') !== e) continue;
      delete u.promoUsed; delete u.promoEmail; delete u.freeAi;
      if (u.premium && u.premium.promo && !(u.premium.buys || []).some(b => !b.refunded)) delete u.premium;
      else if (u.premium) delete u.premium.promo;
      await store.saveUser(u); accounts++;
    }
    console.log('trial reset by', user.username, accounts, had);
    return send(res, 200, { ok: true, accounts, records: had });
  }
  if (route === 'playkey' || route === 'playkeycheck') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    if (req.method === 'GET' && route === 'playkey') return send(res, 200, playbilling.info());
    if (req.method === 'POST' && route === 'playkey') {
      const b = await readBody(req, 64e3);
      try { playbilling.saveKey(b.key); } catch (e) { return send(res, e.status || 500, { error: e.message }); }
      return send(res, 200, { ...playbilling.info(), check: await playbilling.verify().catch(e => ({ ok: false, error: e.message })) });
    }
    if (req.method === 'POST' && route === 'playkeycheck') return send(res, 200, { ...playbilling.info(), check: await playbilling.verify().catch(e => ({ ok: false, error: e.message })) });
  }
  if (req.method === 'GET' && route === 'adminstats') {
    if (!isAdmin(user)) return send(res, 403, { error: 'forbidden' });
    return send(res, 200, { ...adminStats(), reports: (store.meta.reports || []).slice().reverse(), clientErrors: (store.meta.clientErrors || []).slice().reverse(), inbox: (store.meta.inbox || []).slice().reverse(),
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
    store.meta.reports = (store.meta.reports || []).concat(r).slice(-REPORTS_KEPT);
    await store.saveMeta('reports', store.meta.reports);
    if (mail.available()) mail.sendReport(r).then(() => console.log('report emailed', user.username)).catch(e => console.error('report email', e.message));
    return send(res, 200, { ok: true });
  }
  // A page of the app that broke (mobile/src/app/_layout.tsx ErrorBoundary; Mojtaba 2026-10-21): its error, where and
  // on what, kept (the newest 100) in store.meta.clientErrors for the admin panel and written to the log.
  if (req.method === 'POST' && route === 'clienterror') {
    const b = await readBody(req), clip = (v, n) => String(v || '').slice(0, n);
    const e = { at: Date.now(), username: user.username, message: clip(b.message, 500), stack: clip(b.stack, 3000), path: clip(b.path, 200), agent: clip(req.headers['user-agent'], 200), version: clip(b.version, 40) };
    console.error('client error', e.username, e.path, e.message, '|', e.stack.split('\n').slice(0, 4).join(' | '));
    store.meta.clientErrors = (store.meta.clientErrors || []).concat(e).slice(-100);
    await store.saveMeta('clientErrors', store.meta.clientErrors);
    return send(res, 200, { ok: true });
  }
  if (req.method === 'GET' && route === 'me') {
    if (user.draft && user.draft.mode === 'lesson') { // from before lessons had their own drafts
      if (user.draft.lesson) (user.lessonDrafts = user.lessonDrafts || {})[user.draft.lesson] = user.draft;
      delete user.draft; await store.saveUser(user);
    }
    return send(res, 200, { user: publicUser(user), attempts: user.attempts, settings: user.settings || {}, words: user.words || [], saved: Array.isArray(user.saved) ? user.saved : [], terms: user.terms || [], draft: user.draft || null, lessonDrafts: user.lessonDrafts || {}, imgv: imagegen.versions() });
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
    const removed = user.attempts.filter(a => a.at === at);
    user.attempts = user.attempts.filter(a => a.at !== at);
    if (user.attempts.length === n) return send(res, 404, { error: 'آزمون پیدا نشد.' });
    await keepRemoved(user, removed);
    await store.saveUser(user);
    return send(res, 200, { ok: true });
  }
  // All past exams; with { keepLessons: true } the lessons' attempts stay (the past-exams page lists no lessons).
  if (req.method === 'DELETE' && route === 'attempts') {
    const b = await readBody(req);
    await keepRemoved(user, b.keepLessons ? user.attempts.filter(a => a.mode !== 'lesson') : user.attempts);
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
  // Bookmarked glossary terms («واژه‌نامه‌ی آزمون»): the whole list of their Danish words, newest first.
  if (req.method === 'PUT' && route === 'terms') {
    const b = await readBody(req);
    const seen = new Set();
    user.terms = (Array.isArray(b.terms) ? b.terms : []).map(t => clip(t, 60)).filter(t => t && !seen.has(t) && seen.add(t)).slice(0, MAX_TERMS);
    await store.saveUser(user);
    return send(res, 200, { terms: user.terms });
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
    if (!Array.isArray(user.saved)) user.saved = [];
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
    user.saved = (Array.isArray(user.saved) ? user.saved : []).filter(x => x.id !== id);
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
    // coach: «حالت مربی» (the AI coach, premium), on unless turned off; kept when a client that does not know it saves.
    const coachOn = typeof b.coach === 'boolean' ? b.coach : (user.settings || {}).coach !== false;
    user.settings = { showFa: !!b.showFa, timer: !!b.timer, ...(lang ? { lang } : {}), ...(langChosen ? { langChosen } : {}), ...(voice ? { voice } : {}), ...(ui ? { ui } : {}), ...(trans ? { trans } : {}), ...(mode ? { mode } : {}), ...(palette ? { palette } : {}), ...(header ? { header } : {}), ...(coachOn ? {} : { coach: false }) };
    await store.saveUser(user);
    return send(res, 200, { settings: user.settings });
  }
  send(res, 404, { error: 'not found' });
}

async function main() {
  store = await openStore({ dbFile: DB_FILE });
  // The pictures and other files in Oracle Cloud Object Storage when OCI_BUCKET is set (objstore.js), and a daily
  // backup of the database's data there (backup.js).
  store = require('./objstore').wrap(store);
  // Every Claude call's model, use, cost and the daily budget (aigateway.js).
  require('./aigateway').init(store);
  // The machine's and the app's numbers, once a minute, for the «سامانه» page (monitor.js).
  require('./monitor').start(store);
  require('./backup').start(store);
  insights.init(store, dayKey);
  setNotes(store.meta.qNotes);
  // A deploy's first minutes, while the old server may still be answering (store.js catchUp).
  if (store.catchUp) {
    const t = setInterval(() => store.catchUp().catch(e => console.error('catch up', e.message)), 60e3);
    setTimeout(() => clearInterval(t), 20 * 60e3).unref();
  }
  // Repair (2026-10-21): for a few hours each save wrote its time into `saved` (store.js, now `savedAt`), over the
  // user's saved questions; those accounts get an empty list back (what they had is not in the row any more).
  for (const u of Object.values(store.users)) {
    if (u.saved === undefined || Array.isArray(u.saved)) continue;
    console.log('saved questions lost, list reset for', u.username);
    u.saved = [];
    await store.saveUser(u);
  }
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
  // One-time, asked by the owner (2026-10-20): user negin keeps only what was done on prove.dk's questions (the bank's
  // numbers below 5001, where the app's own bank, site/newq.js, starts): every test with a question of the app's own
  // bank goes, and so do such saved questions and an unfinished test of them. A copy of all that is removed is kept in
  // meta (`removed:negin:own-bank`) so it can be put back.
  if (store.meta.neginProveOnly !== 1) {
    const u = store.users.negin, prove = id => Number.isInteger(+id) && +id > 0 && +id < 5001;
    if (u) {
      const attempts = (u.attempts || []).filter(a => !(a.items || []).every(it => prove(it.id)));
      const saved = (u.saved || []).filter(x => !prove(x.id));
      const draft = u.draft && !(u.draft.ids || []).every(prove) ? u.draft : null;
      await store.saveMeta('removed:negin:own-bank', { at: Date.now(), attempts, saved, draft });
      u.attempts = (u.attempts || []).filter(a => (a.items || []).every(it => prove(it.id)));
      u.saved = (u.saved || []).filter(x => prove(x.id));
      if (draft) delete u.draft;
      await store.saveUser(u);
      console.log('negin: prove.dk only; removed', attempts.length, 'tests', saved.length, 'saved', draft ? 'and the unfinished test' : '', '; kept', u.attempts.length, 'tests');
      await store.saveMeta('neginProveOnly', 1);
    } else console.log('negin prove only: no such user');
  }
  // Read-only report (2026-10-22, Mojtaba: negin's past tests are gone): what the account and the copies kept in meta hold.
  {
    const sum = list => {
      const a = Array.isArray(list) ? list : [], modes = {};
      for (const x of a) modes[x.mode] = (modes[x.mode] || 0) + 1;
      const ts = a.map(x => +x.at).filter(Boolean).sort((p, q) => p - q), d = t => t ? new Date(t).toISOString() : null;
      return { n: a.length, modes, first: d(ts[0]), last: d(ts[ts.length - 1]) };
    };
    const hits = Object.values(store.users).filter(x => /negin/i.test(`${x.username} ${x.name || ''} ${x.email || ''}`));
    for (const u of hits) console.log('negin report: user', JSON.stringify({ username: u.username.replace(/^(.{3}).*@/, '$1…@'), name: u.name, created: new Date(+u.created || 0).toISOString(),
      savedAt: u.savedAt ? new Date(u.savedAt).toISOString() : null, attempts: sum(u.attempts), saved: (u.saved || []).length, study: (u.study || []).length, course: Object.keys(u.course || {}).length }));
    if (!hits.length) console.log('negin report: no user');
    for (const k of Object.keys(store.meta).filter(k => /negin/i.test(k))) {
      const m = store.meta[k];
      console.log('negin report: meta', k, JSON.stringify(m && typeof m === 'object' ? { at: m.at ? new Date(m.at).toISOString() : null, attempts: sum(m.attempts), saved: (m.saved || []).length, draft: !!m.draft } : m));
    }
    console.log('negin report: gone', JSON.stringify(Object.keys(store.meta.gone || {})));
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
  // One-time, asked by the owner (2026-10-22): ten sample tests (data/demo-attempts.json, 13-22 Oct, 48% to 100%) added
  // to his own account mojtaba.devops@gmail.com, to see the app's states. Nothing he had is changed; the added tests'
  // times are kept in meta (`demo:<username>:attempts`) so they can be taken out again.
  if (store.meta.demoMojtaba !== 1) {
    const email = 'mojtaba.devops@gmail.com';
    const found = Object.values(store.users).filter(x => [x.email, x.username].some(v => String(v || '').trim().toLowerCase() === email));
    for (const u of found) {
      const had = new Set((u.attempts || []).map(a => a.at));
      const add = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'demo-attempts.json'), 'utf8')).filter(a => !had.has(a.at));
      u.attempts = (u.attempts || []).concat(add).sort((p, q) => p.at - q.at);
      await store.saveMeta(`demo:${u.username}:attempts`, { at: Date.now(), added: add.map(a => a.at) });
      await store.saveUser(u);
      console.log('demo tests for', u.username.replace(/^(.{3}).*@/, '$1…@'), 'added', add.length, 'now', u.attempts.length, 'tests');
    }
    if (found.length) await store.saveMeta('demoMojtaba', 1);
    else console.log('demo tests: no account with', email);
  }
  imagegen.init(store, SITE);
  guideref.init(store, imagegen);
  consolepics.init(SITE);
  newqadmin.init(store, imagegen, SITE);
  // The search's meaning vectors (rag.js): the 1,100 questions now, the catalogue when the app sends it.
  require('./rag').init(store, SITE);
  setTimeout(() => imagegen.learnColours(), 3000);   // the «آموزش» pictures' colours ready for the first visits
  consoleprompts.init(store, imagegen, guideref, consolepics);
  webpic.init(store);
  // The course's pictures ready in memory soon after a start (webpic.js).
  webpic.warm(() => Object.entries(imagegen.courseVersions()).map(([k, v]) => [`/course-art/${k}.png:${v}`, () => imagegen.courseBlob(k)]));
  webpic.warm(() => Object.entries(imagegen.newqVersions()).map(([k, v]) => [`/newq-art/${k}.png:${v}`, () => imagegen.newqBlob(k)]));
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
    const m = /^\/api\/([a-z]+(?:\/[a-z]+)?)$/.exec(pathname);   // (google/callback: one more part)
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
    console.log(`Teoripro ${VERSION} running:\n  http://localhost:${PORT}`);
    nets.forEach(n => console.log(`  http://${n.address}:${PORT}   (other devices on your Wi-Fi)`));
    if (INVITE_CODE) console.log('  Sign-up requires the invite code (INVITE_CODE).');
    syncPayments();
  }).on('error', err => {
    if (err.code !== 'EADDRINUSE') throw err;
    console.error(`Port ${PORT} is already in use — Teoripro is probably already running in another terminal tab.\n` +
      `Open http://localhost:${PORT}, or stop the other one first:  kill $(lsof -ti tcp:${PORT} -sTCP:LISTEN)`);
    process.exit(1);
  });
}

main().catch(err => { console.error('Failed to start:', err); process.exit(1); });
