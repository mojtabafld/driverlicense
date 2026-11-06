// Play Integrity (Mojtaba 2026-11-06): Google Play's word on whether a request comes from this app as Play installed it,
// unchanged, on a real Android device (not a modified copy, an emulator or a rooted phone running a script).
// The Android app, once signed in and at most once a day (mobile/src/lib/integrity.ts): GET integrity/nonce gives a
// one-time value; the app asks Google Play for a token bound to it (the standard request, with the Cloud project's
// number from /api/config); POST integrity/check { token } has Google decode it here (playintegrity.googleapis.com, with
// the service account of GOOGLE_PLAY_SERVICE_ACCOUNT, whose Cloud project is the one linked in Play Console under App
// integrity), and the verdict is kept on the device (user.devices[id].pi) and counted on the «سامانه» page.
// On when PLAY_INTEGRITY_PROJECT (the Cloud project's number; not secret) is set. For now only recorded (log): no
// request is refused for its verdict.
'use strict';
const crypto = require('crypto');
const play = require('./playbilling');

const SCOPE = 'https://www.googleapis.com/auth/playintegrity';
const NONCE_MS = 10 * 60e3;
const project = () => String(process.env.PLAY_INTEGRITY_PROJECT || '').trim().replace(/[^0-9]/g, '');
// The service account that decodes the tokens: PLAY_INTEGRITY_SERVICE_ACCOUNT (a JSON key, as it is or in base64, of a
// service account in the Cloud project linked in Play Console), else Google Play's (GOOGLE_PLAY_SERVICE_ACCOUNT), whose
// own project must then be the linked one.
let own = null, ownSrc = null;
function key() {
  const raw = String(process.env.PLAY_INTEGRITY_SERVICE_ACCOUNT || '').trim();
  if (!raw) return null;
  if (raw !== ownSrc) { ownSrc = raw; own = play.readKey(raw); if (!own) console.error('PLAY_INTEGRITY_SERVICE_ACCOUNT is not a service account JSON key'); }
  return own;
}
const available = () => !!project() && (!!key() || play.available());

const nonces = new Map();
function nonce(username) {
  const now = Date.now();
  for (const [k, v] of nonces) if (v.exp < now) nonces.delete(k);
  const n = crypto.randomBytes(24).toString('base64url');
  nonces.set(n, { username, exp: now + NONCE_MS });
  return n;
}

// The verdict in short: { app, device: [...], lic, ok, at } — ok when Play recognizes the app and the device meets
// Google's basic integrity.
function summary(p) {
  const app = (p.appIntegrity || {}).appRecognitionVerdict || 'UNEVALUATED';
  const device = (p.deviceIntegrity || {}).deviceRecognitionVerdict || [];
  const lic = (p.accountDetails || {}).appLicensingVerdict || 'UNEVALUATED';
  return { app, device, lic, ok: app === 'PLAY_RECOGNIZED' && device.includes('MEETS_DEVICE_INTEGRITY'), at: Date.now() };
}

async function check(username, token) {
  if (!available()) throw Object.assign(new Error('Play Integrity is off'), { status: 404 });
  if (typeof token !== 'string' || token.length < 20 || token.length > 20000) throw Object.assign(new Error('bad token'), { status: 400 });
  const r = await fetch(`https://playintegrity.googleapis.com/v1/${encodeURIComponent(play.pkg())}:decodeIntegrityToken`, {
    method: 'POST', headers: { Authorization: `Bearer ${await play.accessToken(SCOPE, key())}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ integrity_token: token }),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error((d.error && d.error.message) || `Play Integrity ${r.status}`), { status: 502 });
  const p = d.tokenPayloadExternal || {}, req = p.requestDetails || {};
  // bound to a value this server gave this account, not used before, for this app, and fresh
  const n = nonces.get(req.requestHash);
  nonces.delete(req.requestHash);
  const fresh = Math.abs(Date.now() - Number(req.timestampMillis || 0)) < NONCE_MS;
  if (!n || n.exp < Date.now() || n.username !== username || req.requestPackageName !== play.pkg() || !fresh) {
    return { app: 'REPLAYED_OR_FOREIGN', device: [], lic: 'UNEVALUATED', ok: false, at: Date.now() };
  }
  return summary(p);
}

// The «سامانه» page's counts: the devices checked in the last 30 days, by verdict.
function report(users) {
  const since = Date.now() - 30 * 864e5, out = { on: available(), devices: 0, ok: 0, app: {}, device: {} };
  for (const u of Object.values(users)) for (const d of Object.values(u.devices || {})) {
    const v = d.pi;
    if (!v || v.at < since) continue;
    out.devices++; if (v.ok) out.ok++;
    out.app[v.app] = (out.app[v.app] || 0) + 1;
    const dv = v.device.includes('MEETS_STRONG_INTEGRITY') ? 'STRONG' : v.device.includes('MEETS_DEVICE_INTEGRITY') ? 'DEVICE' : v.device.includes('MEETS_BASIC_INTEGRITY') ? 'BASIC' : 'NONE';
    out.device[dv] = (out.device[dv] || 0) + 1;
  }
  return out;
}

module.exports = { available, project, nonce, check, report, summary };
