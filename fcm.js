// Notifications to the Android app from the server (Mojtaba 2026-10-30: the admin's news): Firebase Cloud Messaging's
// HTTP v1 API, with a Google service account that may send for the Firebase project (role «Firebase Cloud Messaging API
// Admin»). The account: FCM_SERVICE_ACCOUNT (its JSON, as it is or in base64), else the Google Play key (playbilling.js,
// the same Google Cloud project once Firebase is added to it). The project: FCM_PROJECT_ID, else the key's own.
// The app gives its device token (POST /api/pushsub { fcm }) when its notifications are turned on; without
// google-services.json in its build it has none, and nothing is sent.
'use strict';
const crypto = require('node:crypto');
const playbilling = require('./playbilling');

const parse = raw => { for (const t of [raw, Buffer.from(raw, 'base64').toString('utf8')]) { try { const k = JSON.parse(t); if (k.client_email && k.private_key) return k; } catch {} } return null; };
function account() {
  const raw = (process.env.FCM_SERVICE_ACCOUNT || '').trim();
  return raw ? parse(raw) : playbilling.serviceAccount();
}
const project = () => (process.env.FCM_PROJECT_ID || '').trim() || (account() || {}).project_id || '';
const available = () => !!account() && !!project();

let tok = null;
async function accessToken() {
  if (tok && tok.until > Date.now() + 60e3) return tok.value;
  const k = account(), now = Math.floor(Date.now() / 1000);
  const b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url');
  const body = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({ iss: k.client_email, scope: 'https://www.googleapis.com/auth/firebase.messaging', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 })}`;
  const jwt = `${body}.${crypto.createSign('RSA-SHA256').update(body).sign(k.private_key, 'base64url')}`;
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }) });
  const d = await r.json().catch(() => ({}));
  if (!r.ok || !d.access_token) throw new Error(`fcm token: ${d.error || r.status}`);
  tok = { value: d.access_token, until: Date.now() + (d.expires_in || 3600) * 1000 };
  return tok.value;
}

// One message to one device. Resolves to 'ok', 'gone' (the token no longer works: drop it) or 'error'.
async function send(token, { title, body, url }) {
  const r = await fetch(`https://fcm.googleapis.com/v1/projects/${encodeURIComponent(project())}/messages:send`, {
    method: 'POST', headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: { token, notification: { title, body }, data: { url: url || '/' },
      android: { priority: 'high', notification: { channel_id: 'news', icon: 'notification_icon' } } } }),
  });
  if (r.ok) return 'ok';
  const d = await r.json().catch(() => ({}));
  const code = ((d.error || {}).details || []).map(x => x.errorCode).find(Boolean) || (d.error || {}).status;
  if (r.status === 404 || code === 'UNREGISTERED' || code === 'INVALID_ARGUMENT') return 'gone';
  console.error('fcm', r.status, code || '', (d.error || {}).message || '');
  return 'error';
}

module.exports = { available, send };
