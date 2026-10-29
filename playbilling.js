// Premium bought in the Android app with Google Play Billing (Mojtaba 2026-10-23): the same three passes as on the
// website (payments.js), as Play «one-time products» pass_week, pass_month and pass_quarter (made in Play Console →
// Monetize → In-app products, prices set there). The app buys one, sends its purchase token here (POST /api/playpurchase);
// this asks Google whether it is paid (Play Developer API, purchases.products.get), checks it was bought for this account
// (the obfuscated account id the app passed: accountId below), adds its days like a Stripe payment (payments.grantPlay)
// and consumes it, so the same pass can be bought again later.
// Env: GOOGLE_PLAY_SERVICE_ACCOUNT, the service account's JSON key (as it is, or in base64), with access to the app in
// Play Console (Users and permissions → the service account → «View financial data» and «Manage orders»); without it
// nothing is sold in the app. GOOGLE_PLAY_PACKAGE, the app's package (default app.bitlane.teoripro).
// Google is called over its REST API with fetch and a signed JWT (no SDK). GOOGLE_PLAY_API_BASE / GOOGLE_OAUTH_URL only
// point the calls elsewhere for tests.
'use strict';
const crypto = require('node:crypto');

const PRODUCTS = { pass_week: 'week', pass_month: 'month', pass_quarter: 'quarter' };
const pkg = () => (process.env.GOOGLE_PLAY_PACKAGE || 'app.bitlane.teoripro').trim();
const api = () => (process.env.GOOGLE_PLAY_API_BASE || 'https://androidpublisher.googleapis.com').replace(/\/$/, '');
const oauth = () => process.env.GOOGLE_OAUTH_URL || 'https://oauth2.googleapis.com/token';

// The service account's key: its JSON, given as it is or in base64; null when missing or unreadable. From the env, else
// from the file the admin dashboard saved it in (Mojtaba 2026-10-29: put there from a phone, with no computer at hand;
// beside the database, readable by the service only).
const fs = require('node:fs');
let keyFile = null;
const setKeyFile = f => { keyFile = f; };
const fileKey = () => { try { return keyFile ? fs.readFileSync(keyFile, 'utf8').trim() : ''; } catch { return ''; } };
let keyCache = null, keySrc = null;
function account() {
  const raw = (process.env.GOOGLE_PLAY_SERVICE_ACCOUNT || '').trim() || fileKey();
  if (!raw) return null;
  if (raw === keySrc) return keyCache;
  keySrc = raw; keyCache = null;
  for (const text of [raw, Buffer.from(raw, 'base64').toString('utf8')]) {
    try { const k = JSON.parse(text); if (k.client_email && k.private_key) { keyCache = k; break; } } catch {}
  }
  if (!keyCache) console.error('GOOGLE_PLAY_SERVICE_ACCOUNT is not a service account JSON key');
  return keyCache;
}
const available = () => !!account();

// The id the app hands Google with a purchase (obfuscatedAccountId, at most 64 characters), so a purchase token counts only
// for the account that bought it.
const accountId = username => crypto.createHash('sha256').update(`teoripro-play:${username}`).digest('hex');

// An access token for the Play Developer API: a JWT signed with the service account's key, swapped at Google's OAuth
// endpoint; kept until a minute before it runs out.
let tok = null;
async function accessToken() {
  if (tok && tok.until > Date.now() + 60e3) return tok.value;
  const k = account(), now = Math.floor(Date.now() / 1000);
  const b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url');
  const body = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({ iss: k.client_email, scope: 'https://www.googleapis.com/auth/androidpublisher', aud: oauth(), iat: now, exp: now + 3600 })}`;
  const jwt = `${body}.${crypto.createSign('RSA-SHA256').update(body).sign(k.private_key, 'base64url')}`;
  const r = await fetch(oauth(), { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }) });
  const d = await r.json().catch(() => ({}));
  if (!r.ok || !d.access_token) throw Object.assign(new Error('Google Play is not reachable; try again in a minute.'), { status: 502, detail: d.error });
  tok = { value: d.access_token, until: Date.now() + (d.expires_in || 3600) * 1000 };
  return tok.value;
}

async function call(method, path) {
  const r = await fetch(`${api()}/androidpublisher/v3/applications/${encodeURIComponent(pkg())}/purchases/products/${path}`,
    { method, headers: { Authorization: `Bearer ${await accessToken()}` } });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error((d.error && d.error.message) || `Google Play ${r.status}`), { status: r.status >= 500 ? 502 : r.status === 404 || r.status === 410 ? 404 : 400 });
  return d;
}
const tokenPath = (product, token) => `${encodeURIComponent(product)}/tokens/${encodeURIComponent(token)}`;

// The purchase as Google has it: { plan, paid, pending, mine, orderId, test, consumed }. `username`: the buyer here.
async function check(product, token, username) {
  if (!PRODUCTS[product]) throw Object.assign(new Error('unknown product'), { status: 400 });
  const p = await call('GET', tokenPath(product, token));
  return {
    plan: PRODUCTS[product],
    paid: p.purchaseState === 0,               // 0 purchased, 1 cancelled, 2 pending
    pending: p.purchaseState === 2,
    mine: !p.obfuscatedExternalAccountId || p.obfuscatedExternalAccountId === accountId(username),
    tied: !!p.obfuscatedExternalAccountId,
    orderId: p.orderId,
    test: p.purchaseType === 0 || undefined,   // a license tester's purchase
    consumed: p.consumptionState === 1,
  };
}
// Consumed once its days are on the account: Google then keeps it (no refund after 3 days) and it can be bought again.
const consume = (product, token) => call('POST', `${tokenPath(product, token)}:consume`);

// The dashboard's key card: which key is in use (its account's email only), saving a new one, and asking Google whether it
// works (a token, then the app's in-app products, which needs the account's access to the app in Play Console).
const parseKey = text => {
  for (const t of [String(text || '').trim(), Buffer.from(String(text || '').trim(), 'base64').toString('utf8')]) {
    try { const k = JSON.parse(t); if (k && k.type === 'service_account' && k.client_email && k.private_key) return k; } catch {}
  }
  return null;
};
function info() {
  const k = account();
  return { set: !!k, email: k ? k.client_email : null, from: (process.env.GOOGLE_PLAY_SERVICE_ACCOUNT || '').trim() ? 'env' : k ? 'file' : null, pkg: pkg() };
}
function saveKey(text) {
  const k = parseKey(text);
  if (!k) throw Object.assign(new Error('این فایل کلید JSON یک service account نیست.'), { status: 400 });
  if (!keyFile) throw Object.assign(new Error('no key file'), { status: 500 });
  fs.writeFileSync(keyFile, JSON.stringify(k), { mode: 0o600 });
  try { fs.chmodSync(keyFile, 0o600); } catch {}
  keySrc = null; tok = null;
  return info();
}
async function verify() {
  if (!account()) return { ok: false, step: 'key', error: 'کلیدی نیست.' };
  try { await accessToken(); } catch (e) { return { ok: false, step: 'token', error: String(e.detail || e.message) }; }
  const r = await fetch(`${api()}/androidpublisher/v3/applications/${encodeURIComponent(pkg())}/inappproducts`, { headers: { Authorization: `Bearer ${await accessToken()}` } });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) return { ok: false, step: 'play', error: (d.error && d.error.message) || `Google Play ${r.status}` };
  const found = (d.inappproduct || []).map(p => `${p.sku}${p.status && p.status !== 'active' ? ` (${p.status})` : ''}`);
  return { ok: true, products: found };
}

module.exports = { available, accountId, check, consume, PRODUCTS, products: () => Object.keys(PRODUCTS), setKeyFile, info, saveKey, verify };
