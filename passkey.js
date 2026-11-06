// Passkeys (WebAuthn; Mojtaba 2026-11-06): signing in with the phone's or computer's own lock (fingerprint, face,
// PIN), no password or code. A signed-in user adds one in Settings (POST passkey/regoptions, then passkey/register);
// anyone signs in with one (POST passkey/loginoptions, then passkey/login), on the app's web version and the admin
// dashboard alike. Only the public key is kept, on the account (user.passkeys); the private key never leaves the device,
// and a passkey works on this site only, so a look-alike site cannot use it.
'use strict';
const crypto = require('crypto');

let lib;   // @simplewebauthn/server, loaded on first use
const w = () => (lib = lib || require('@simplewebauthn/server'));

const RP_NAME = 'Teori pro';
const CHALLENGE_MS = 5 * 60e3;
const MAX_KEYS = 10;
// The challenges handed out and not used yet: for adding, by username; for signing in, by a random id given with them.
const pending = new Map();
function keep(key, challenge) {
  const now = Date.now();
  for (const [k, v] of pending) if (v.exp < now) pending.delete(k);
  pending.set(key, { challenge, exp: now + CHALLENGE_MS });
}
function take(key) {
  const v = pending.get(key);
  pending.delete(key);
  return v && v.exp > Date.now() ? v.challenge : null;
}

// The site's own name (its host without the port) and its origin, from the request: teori.bitlane.app in use,
// localhost in tests.
const rpOf = origin => new URL(origin).hostname;

// The passkeys a user has, as shown in Settings.
const listOf = u => (u.passkeys || []).map(k => ({ id: k.id, name: k.name, created: k.created, used: k.used || null }));

// A name for a new passkey: the kind of device it was made on (from the browser's own description).
function nameOf(ua) {
  const s = String(ua || '');
  const os = /iPhone|iPad/.test(s) ? 'iPhone' : /Android/.test(s) ? 'Android' : /Mac OS X/.test(s) ? 'Mac' : /Windows/.test(s) ? 'Windows' : /Linux/.test(s) ? 'Linux' : '';
  const br = /Edg\//.test(s) ? 'Edge' : /Chrome\//.test(s) ? 'Chrome' : /Firefox\//.test(s) ? 'Firefox' : /Safari\//.test(s) ? 'Safari' : '';
  return [br, os].filter(Boolean).join(' · ') || 'Passkey';
}

async function regOptions(u, origin) {
  const opts = await w().generateRegistrationOptions({
    rpName: RP_NAME, rpID: rpOf(origin),
    userName: u.email || u.username, userDisplayName: u.name || u.username,
    userID: new TextEncoder().encode(crypto.createHash('sha256').update('tp-user:' + u.username).digest('hex').slice(0, 32)),
    attestationType: 'none',
    // a passkey kept on the device (discoverable), so signing in needs no email first
    authenticatorSelection: { residentKey: 'required', userVerification: 'preferred' },
    excludeCredentials: (u.passkeys || []).map(k => ({ id: k.id, transports: k.transports })),
  });
  keep('reg:' + u.username, opts.challenge);
  return opts;
}

async function register(u, origin, response, ua) {
  const challenge = take('reg:' + u.username);
  if (!challenge) throw Object.assign(new Error('زمان ساخت Passkey تمام شد؛ دوباره امتحان کنید.'), { status: 400 });
  if ((u.passkeys || []).length >= MAX_KEYS) throw Object.assign(new Error('حداکثر ۱۰ Passkey برای هر حساب.'), { status: 400 });
  let v;
  try {
    v = await w().verifyRegistrationResponse({ response, expectedChallenge: challenge, expectedOrigin: origin, expectedRPID: rpOf(origin), requireUserVerification: false });
  } catch (e) { throw Object.assign(new Error('Passkey تأیید نشد.'), { status: 400, cause: e }); }
  if (!v.verified || !v.registrationInfo) throw Object.assign(new Error('Passkey تأیید نشد.'), { status: 400 });
  const c = v.registrationInfo.credential;
  u.passkeys = (u.passkeys || []).filter(k => k.id !== c.id);
  u.passkeys.push({ id: c.id, pk: Buffer.from(c.publicKey).toString('base64url'), counter: c.counter || 0,
    transports: Array.isArray(c.transports) ? c.transports : undefined, name: nameOf(ua), created: Date.now() });
  return listOf(u);
}

async function loginOptions(origin) {
  const opts = await w().generateAuthenticationOptions({ rpID: rpOf(origin), userVerification: 'preferred' });
  const id = crypto.randomBytes(16).toString('hex');
  keep('auth:' + id, opts.challenge);
  return { id, options: opts };
}

// The account the passkey belongs to, once its signature checks out; null otherwise.
async function login(users, origin, id, response) {
  const challenge = take('auth:' + String(id || ''));
  if (!challenge || !response || typeof response.id !== 'string') return null;
  let user = null, key = null;
  for (const u of Object.values(users)) {
    const k = (u.passkeys || []).find(x => x.id === response.id);
    if (k) { user = u; key = k; break; }
  }
  if (!user) return null;
  let v;
  try {
    v = await w().verifyAuthenticationResponse({ response, expectedChallenge: challenge, expectedOrigin: origin, expectedRPID: rpOf(origin),
      credential: { id: key.id, publicKey: Buffer.from(key.pk, 'base64url'), counter: key.counter || 0, transports: key.transports },
      requireUserVerification: false });
  } catch { return null; }
  if (!v.verified) return null;
  key.counter = v.authenticationInfo.newCounter;
  key.used = Date.now();
  return user;
}

function remove(u, id) {
  u.passkeys = (u.passkeys || []).filter(k => k.id !== String(id || ''));
  return listOf(u);
}

module.exports = { regOptions, register, loginOptions, login, remove, listOf };
