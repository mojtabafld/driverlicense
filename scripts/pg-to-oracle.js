// Copies everything from the PostgreSQL database (DigitalOcean) into the Oracle database (Oracle Cloud), once, for the
// move (Mojtaba 2026-10-29): the accounts, the sessions (so nobody is signed out), the site's documents (meta), the
// deleted accounts' marks and the blobs (the made pictures). Then it counts both sides.
// Run it on the new server, with the app stopped there:
//   DATABASE_URL=<the PostgreSQL URL> ORACLE_CONNECT_STRING=... ORACLE_USER=... ORACLE_PASSWORD=... \
//     [ORACLE_WALLET_DIR=... ORACLE_WALLET_PASSWORD=...] node scripts/pg-to-oracle.js
// Running it again is harmless: every row is written over with the PostgreSQL copy.
'use strict';
const { Pool } = require('pg');
const { openStore } = require('../store');

(async () => {
  if (!process.env.DATABASE_URL || !process.env.ORACLE_CONNECT_STRING) throw new Error('DATABASE_URL and ORACLE_CONNECT_STRING are both needed');
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.delete('sslmode');
  const ca = process.env.DATABASE_CA_CERT;
  const ssl = process.env.DATABASE_SSL === 'false' ? false : ca ? { ca } : { rejectUnauthorized: false };
  let pg = new Pool({ connectionString: url.toString(), ssl, max: 2 });
  // (the tables in the app's own schema when "public" was not allowed: store.js)
  const has = async () => (await pg.query("SELECT to_regclass('tp_users') AS t")).rows[0].t;
  if (!(await has())) { await pg.end(); pg = new Pool({ connectionString: url.toString(), ssl, max: 2, options: '-c search_path=teoriprove' }); }
  if (!(await has())) throw new Error('no tp_users table in PostgreSQL');

  const ora = await openStore({});
  if (ora.kind !== 'oracle') throw new Error('the Oracle settings were not taken');
  const count = async t => +(await pg.query(`SELECT count(*) AS n FROM ${t}`)).rows[0].n;

  const users = (await pg.query('SELECT data FROM tp_users')).rows;
  let n = 0;
  for (const { data } of users) { await ora.saveUser(data); if (++n % 100 === 0) console.log(`accounts ${n}/${users.length}`); }
  console.log(`accounts: ${users.length}`);
  const sessions = (await pg.query('SELECT token, username, exp FROM tp_sessions WHERE exp >= $1', [Date.now()])).rows;
  for (const s of sessions) await ora.saveSession(s.token, { username: s.username, exp: +s.exp });
  console.log(`sessions: ${sessions.length}`);
  const meta = (await pg.query('SELECT key, data FROM tp_meta')).rows;
  for (const m of meta) await ora.saveMeta(m.key, m.data);
  console.log(`documents: ${meta.length}`);
  const gone = (await pg.query('SELECT username, at FROM tp_gone')).rows;
  for (const g of gone) await ora.importGone(g.username, +g.at);
  console.log(`deleted accounts: ${gone.length}`);
  // The blobs one at a time (some are large pictures).
  const keys = (await pg.query('SELECT key FROM tp_blobs ORDER BY key')).rows.map(r => r.key);
  n = 0;
  for (const key of keys) {
    const r = (await pg.query('SELECT mime, data FROM tp_blobs WHERE key = $1', [key])).rows[0];
    await ora.saveBlob(key, r.mime, r.data);
    if (++n % 50 === 0) console.log(`pictures ${n}/${keys.length}`);
  }
  console.log(`pictures: ${keys.length}`);

  // Both sides counted.
  await ora.close();
  const again = await openStore({});
  const oraBlobs = (await again.blobKeys('')).length;
  const check = [
    ['accounts', await count('tp_users'), Object.keys(again.users).length],
    ['documents', await count('tp_meta'), Object.keys(again.meta).length],
    ['pictures', await count('tp_blobs'), oraBlobs],
  ];
  for (const [what, a, b] of check) console.log(`${what}: PostgreSQL ${a}, Oracle ${b}${a === b ? '' : '  <-- different'}`);
  await again.close(); await pg.end();
  if (check.some(([, a, b]) => a !== b)) process.exit(1);
  console.log('Done: everything copied.');
})().catch(e => { console.error('Failed:', e.message); process.exit(1); });
