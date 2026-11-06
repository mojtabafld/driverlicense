// The SHA-256 fingerprint of the certificate Google Play signs the app with (Play App Signing), for the site's
// assetlinks.json (android-certs.json; passkey.js): Android lets the app use the site's passkeys only when that file
// names the certificate the installed app is signed with. Asked of Play's own API for the bundle just uploaded
// (generatedApks), with the service account of the PLAY_SERVICE_ACCOUNT_JSON secret. The fingerprint is public (Play
// Console shows it under App integrity); this only prints it. Run by .github/workflows/android.yml.
// Usage: PLAY_SERVICE_ACCOUNT_JSON=… node scripts/play-signing-cert.js <package> <versionCode>
'use strict';
const crypto = require('crypto');

const [pkg, version] = process.argv.slice(2);
const sa = JSON.parse(process.env.PLAY_SERVICE_ACCOUNT_JSON || '{}');
const b64 = x => Buffer.from(x).toString('base64url');

async function token() {
  const now = Math.floor(Date.now() / 1000);
  const head = b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const body = b64(JSON.stringify({ iss: sa.client_email, scope: 'https://www.googleapis.com/auth/androidpublisher', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 600 }));
  const sig = crypto.createSign('RSA-SHA256').update(`${head}.${body}`).sign(sa.private_key).toString('base64url');
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${head}.${body}.${sig}` }) });
  const d = await r.json();
  if (!d.access_token) throw new Error('token: ' + JSON.stringify(d).slice(0, 200));
  return d.access_token;
}
// Play gives the hash as hex or base64; shown as the colon-separated hex Play Console and assetlinks.json use.
const hex = h => {
  const s = String(h || '').trim();
  const raw = /^[0-9a-fA-F:]{64,95}$/.test(s) ? Buffer.from(s.replace(/:/g, ''), 'hex') : Buffer.from(s, 'base64');
  return raw.toString('hex').toUpperCase().match(/../g).join(':');
};

(async () => {
  const t = await token();
  for (let i = 0; i < 20; i++) {
    const r = await fetch(`https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${pkg}/generatedApks/${version}`, { headers: { Authorization: `Bearer ${t}` } });
    const d = await r.json().catch(() => ({}));
    const hashes = [...new Set((d.generatedApks || []).map(g => g.certificateSha256Hash).filter(Boolean))];
    if (hashes.length) { for (const h of hashes) console.log(`Play app signing certificate SHA-256: ${hex(h)}`); return; }
    console.log(`(not ready yet: ${r.status} ${JSON.stringify(d).slice(0, 160)})`);
    await new Promise(res => setTimeout(res, 30000));
  }
  console.log('Play did not give the signing certificate; see Play Console → App integrity.');
})().catch(e => { console.log('Could not read the signing certificate:', e.message); });
