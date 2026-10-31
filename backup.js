// A daily backup of the database's own data (Mojtaba 2026-10-31): the accounts (with their tests, settings and saved
// questions), the sign-ins and the site's documents (store.meta: the pictures' lists, the admin's decisions, news…),
// as one gzipped JSON file in the files' bucket (objstore.js): backups/db-<YYYY-MM-DD>.json.gz. The pictures are in
// the bucket already. Made once a day after 03:00 (Copenhagen time) by the first check after it, the newest 14 kept.
// A restore reads the file back: { at, users: { [username]: user }, sessions, meta } (zlib.gunzipSync + JSON.parse).
'use strict';
const zlib = require('node:zlib');

const KEEP = 14, DIR = 'backups/';
const day = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Copenhagen' }).format(new Date());
const hour = () => +new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Copenhagen', hour: 'numeric', hourCycle: 'h23' }).format(new Date());

let store = null, running = false;
async function backup(force = false) {
  if (running || !store || !store.files || !(await store.files.ready())) return null;
  running = true;
  try {
    const name = `${DIR}db-${day()}.json.gz`, have = await store.files.list(DIR);
    if (!force && (hour() < 3 || have.some(o => o.name === name))) return null;
    const data = zlib.gzipSync(JSON.stringify({ at: Date.now(), users: store.users, sessions: store.sessions, meta: store.meta }), { level: 9 });
    await store.files.put(name, data, 'application/gzip');
    const old = (await store.files.list(DIR)).filter(o => /^backups\/db-\d{4}-\d\d-\d\d\.json\.gz$/.test(o.name)).sort((a, b) => b.name.localeCompare(a.name)).slice(KEEP);
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
module.exports = { start, backup, list };
