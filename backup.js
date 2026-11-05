// A daily backup of the database's own data (Mojtaba 2026-10-31): the accounts (with their tests, settings and saved
// questions), the sign-ins and the site's documents (store.meta: the pictures' lists, the admin's decisions, news…),
// as one gzipped JSON file in the files' bucket (objstore.js): backups/db-<YYYY-MM-DD>.json.gz. The pictures are in
// the bucket already. Made once a day after 03:00 (Copenhagen time) by the first check after it, the newest 14 kept.
// A restore reads the file back: { at, users: { [username]: user }, sessions, meta } (zlib.gunzipSync + JSON.parse).
// Encrypted (Mojtaba 2026-11-05) when the vault has BACKUP_KEY (any long secret; 32+ characters): AES-256-GCM with a key
// made from it (scrypt, a salt per file), as backups/db-<day>.json.gz.enc = «TPB1» + salt (16) + iv (12) + tag (16) +
// the gzipped data; scripts/backup-decrypt.js turns one back into the .json.gz. A copy of the bucket alone then holds
// nothing readable. (The sessions in it are only their tokens' hashes since then too.)
'use strict';
const crypto = require('node:crypto');
const zlib = require('node:zlib');

const MAGIC = Buffer.from('TPB1');
const secret = () => String(process.env.BACKUP_KEY || '').trim();
function seal(data, pass) {
  const salt = crypto.randomBytes(16), iv = crypto.randomBytes(12), key = crypto.scryptSync(pass, salt, 32);
  const c = crypto.createCipheriv('aes-256-gcm', key, iv), body = Buffer.concat([c.update(data), c.final()]);
  return Buffer.concat([MAGIC, salt, iv, c.getAuthTag(), body]);
}
function open(buf, pass) {
  if (!buf.subarray(0, 4).equals(MAGIC)) throw new Error('not an encrypted backup');
  const salt = buf.subarray(4, 20), iv = buf.subarray(20, 32), tag = buf.subarray(32, 48), key = crypto.scryptSync(pass, salt, 32);
  const d = crypto.createDecipheriv('aes-256-gcm', key, iv);
  d.setAuthTag(tag);
  return Buffer.concat([d.update(buf.subarray(48)), d.final()]);
}

const KEEP = 14, DIR = 'backups/';
const day = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Copenhagen' }).format(new Date());
const hour = () => +new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Copenhagen', hour: 'numeric', hourCycle: 'h23' }).format(new Date());

let store = null, running = false;
async function backup(force = false) {
  if (running || !store || !store.files || !(await store.files.ready())) return null;
  running = true;
  try {
    const pass = secret().length >= 32 ? secret() : '';
    const base = `${DIR}db-${day()}.json.gz`, name = pass ? `${base}.enc` : base, have = await store.files.list(DIR);
    if (!force && (hour() < 3 || have.some(o => o.name === base || o.name === `${base}.enc`))) return null;
    const gz = zlib.gzipSync(JSON.stringify({ at: Date.now(), users: store.users, sessions: store.sessions, meta: store.meta }), { level: 9 });
    const data = pass ? seal(gz, pass) : gz;
    if (!pass) console.error('Backup: BACKUP_KEY is not set (32+ characters), so this backup is not encrypted');
    await store.files.put(name, data, pass ? 'application/octet-stream' : 'application/gzip');
    const old = (await store.files.list(DIR)).filter(o => /^backups\/db-\d{4}-\d\d-\d\d\.json\.gz(\.enc)?$/.test(o.name)).sort((a, b) => b.name.localeCompare(a.name)).slice(KEEP);
    for (const o of old) await store.files.remove(o.name);
    console.log(`Backup: ${name} (${Math.round(data.length / 1e3)} kB, ${Object.keys(store.users).length} accounts)`);
    return { name, size: data.length };
  } finally { running = false; }
}
function start(s) {
  store = s;
  if (!store.files) return;
  const check = () => backup().catch(e => console.error('Backup', e.message));
  setTimeout(check, 5 * 60e3).unref();
  setInterval(check, 30 * 60e3).unref();
}
// The latest backups, for the admin's dashboard: [{ name, size, at }].
async function list() {
  if (!store || !store.files || !(await store.files.ready())) return [];
  return (await store.files.list(DIR)).map(o => ({ name: o.name.slice(DIR.length), size: o.size, at: o.timeCreated })).sort((a, b) => b.name.localeCompare(a.name));
}
module.exports = { start, backup, list, seal, open };
