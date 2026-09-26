// Persistence for users and sessions.
// - DATABASE_URL set  → PostgreSQL (DigitalOcean App Platform / Managed DB); data survives redeploys.
// - otherwise         → a local JSON file (data/db.json), handy for running on your own computer.
// Everything is kept in memory; writes go through saveUser / saveSession / deleteSession.
'use strict';
const fs = require('node:fs');
const path = require('node:path');

async function openStore({ dbFile }) {
  const mem = { users: {}, sessions: {} };

  if (process.env.DATABASE_URL) {
    const { Pool } = require('pg');
    const ca = process.env.DATABASE_CA_CERT;
    // sslmode in the URL would override the ssl object below, so drop it and configure TLS here.
    const url = new URL(process.env.DATABASE_URL);
    url.searchParams.delete('sslmode');
    const ssl = process.env.DATABASE_SSL === 'false' ? false : ca ? { ca } : { rejectUnauthorized: false };
    const makePool = options => new Pool({
      connectionString: url.toString(),
      ssl,
      max: 5,
      options,
    });
    const createTables = async p => {
      await p.query(`CREATE TABLE IF NOT EXISTS tp_users (username TEXT PRIMARY KEY, data JSONB NOT NULL)`);
      await p.query(`CREATE TABLE IF NOT EXISTS tp_sessions (token TEXT PRIMARY KEY, username TEXT NOT NULL, exp BIGINT NOT NULL)`);
    };
    let pool = makePool();
    try {
      await createTables(pool);
    } catch (e) {
      // PostgreSQL 15+ dev databases may not let the app user create tables in "public";
      // fall back to a schema of our own.
      if (e.code !== '42501') throw e;
      await pool.query('CREATE SCHEMA IF NOT EXISTS teoriprove');
      await pool.end();
      pool = makePool('-c search_path=teoriprove');
      await createTables(pool);
    }
    await pool.query(`DELETE FROM tp_sessions WHERE exp < $1`, [Date.now()]);
    for (const r of (await pool.query('SELECT data FROM tp_users')).rows) mem.users[r.data.username] = r.data;
    for (const r of (await pool.query('SELECT token, username, exp FROM tp_sessions')).rows) {
      mem.sessions[r.token] = { username: r.username, exp: +r.exp };
    }
    console.log(`Storage: PostgreSQL (${Object.keys(mem.users).length} users)`);
    return {
      ...mem,
      kind: 'postgres',
      saveUser: u => pool.query(
        'INSERT INTO tp_users (username, data) VALUES ($1, $2) ON CONFLICT (username) DO UPDATE SET data = EXCLUDED.data',
        [u.username, u]),
      saveSession: (token, s) => pool.query(
        'INSERT INTO tp_sessions (token, username, exp) VALUES ($1, $2, $3) ON CONFLICT (token) DO UPDATE SET exp = EXCLUDED.exp',
        [token, s.username, s.exp]),
      deleteSession: token => pool.query('DELETE FROM tp_sessions WHERE token = $1', [token]),
    };
  }

  try { Object.assign(mem, JSON.parse(fs.readFileSync(dbFile, 'utf8'))); } catch {}
  fs.mkdirSync(path.dirname(dbFile), { recursive: true });
  let timer = null, waiting = [];
  // Debounced write; every caller's promise resolves once the next write has landed.
  const flush = () => new Promise(resolve => {
    waiting.push(resolve);
    clearTimeout(timer);
    timer = setTimeout(() => {
      const tmp = dbFile + '.tmp';
      fs.writeFileSync(tmp, JSON.stringify({ users: mem.users, sessions: mem.sessions }));
      fs.renameSync(tmp, dbFile); // atomic replace
      const done = waiting; waiting = [];
      done.forEach(r => r());
    }, 100);
  });
  console.log(`Storage: ${path.relative(process.cwd(), dbFile) || dbFile} (${Object.keys(mem.users).length} users)`);
  return { ...mem, kind: 'file', saveUser: flush, saveSession: flush, deleteSession: flush };
}

module.exports = { openStore };
