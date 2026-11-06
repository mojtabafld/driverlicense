// Cloudflare Access for the admin's requests (Mojtaba 2026-11-06): the admin pages (/admin…) sit behind Cloudflare
// Access, and with this the admin's API calls need its sign-in too. Cloudflare's token (the CF_Authorization cookie,
// or the Cf-Access-Jwt-Assertion header it adds) is checked against the team's public keys: signed by them, for this
// Access application (its AUD tag), not expired, and for an admin's address. So a stolen admin session is of no use
// without also getting past Cloudflare Access.
// ACCESS_ADMIN: 'enforce' (refuse admin rights without it; the default), 'log' (only log what would happen), 'off'. ACCESS_TEAM and ACCESS_AUD name the team (<team>.cloudflareaccess.com) and the application.
'use strict';
const crypto = require('crypto');

// (enforce by default since 2026-11-06: the admin's requests were seen to carry a valid token, «ok» in the log)
const MODE = () => String(process.env.ACCESS_ADMIN || 'enforce').toLowerCase();
const TEAM = () => process.env.ACCESS_TEAM || 'haniscloud';
const AUD = () => process.env.ACCESS_AUD || '4a8fa6907bfe87dd9728087f444c45197944ac117f03feaf4b1d77e1117ca2a6';

let keys = null, keysAt = 0;
async function certs() {
  if (keys && Date.now() - keysAt < 3600e3) return keys;
  const r = await fetch(`https://${TEAM()}.cloudflareaccess.com/cdn-cgi/access/certs`);
  const d = await r.json();
  keys = Object.fromEntries((d.keys || []).map(k => [k.kid, crypto.createPublicKey({ key: k, format: 'jwk' })]));
  keysAt = Date.now();
  return keys;
}
const tokenOf = req => {
  const h = req.headers['cf-access-jwt-assertion'];
  if (h) return String(h);
  const m = /(?:^|;\s*)CF_Authorization=([^;]+)/.exec(req.headers.cookie || '');
  return m ? m[1] : '';
};
// The address the token was issued to when it is valid, else null.
async function verify(token) {
  const [h, p, s] = String(token || '').split('.');
  if (!h || !p || !s) return null;
  const head = JSON.parse(Buffer.from(h, 'base64url').toString('utf8')), body = JSON.parse(Buffer.from(p, 'base64url').toString('utf8'));
  if (head.alg !== 'RS256') return null;
  let k = (await certs())[head.kid];
  if (!k) { keysAt = 0; k = (await certs())[head.kid]; }
  if (!k || !crypto.verify('RSA-SHA256', Buffer.from(`${h}.${p}`), k, Buffer.from(s, 'base64url'))) return null;
  const now = Date.now() / 1000, aud = [].concat(body.aud || []);
  if (!aud.includes(AUD()) || body.iss !== `https://${TEAM()}.cloudflareaccess.com` || !(body.exp > now) || (body.nbf && body.nbf > now + 60)) return null;
  return String(body.email || '').toLowerCase() || null;
}
// Whether this admin request may keep its admin rights. `email`: the admin's own address.
let lastLog = 0;
async function adminOk(req, email) {
  const mode = MODE();
  if (mode === 'off') return true;
  let who = null, why = 'missing';
  try { const t = tokenOf(req); if (t) { who = await verify(t); why = who ? (who === email ? 'ok' : 'other address') : 'bad'; } }
  catch (e) { why = 'error: ' + e.message; }
  if (Date.now() - lastLog > 60e3 || why !== 'ok') { lastLog = Date.now(); console.log(`Cloudflare Access for an admin request: ${why} (${mode})`); }
  return mode === 'enforce' ? why === 'ok' : true;
}
module.exports = { adminOk, verify };
