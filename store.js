// Persistence for users and sessions.
// - DATABASE_URL set  → PostgreSQL (DigitalOcean App Platform / Managed DB); data survives redeploys.
// - otherwise         → a local JSON file (data/db.json), handy for running on your own computer.
// Everything is kept in memory; writes go through saveUser / deleteUser / saveSession / deleteSession / saveMeta
// (deleteUser removes the user's row and sessions in the database; the caller drops them from memory).
// meta holds small site-wide documents by key (e.g. 'visits' for the admin panel's visit counts).
// Blobs (generated question pictures) are binary files kept apart from meta and read on demand: saveBlob / getBlob
// (blobKeys lists the keys that start with a prefix).
'use strict';
const fs = require('node:fs');
const path = require('node:path');

async function openStore({ dbFile }) {
  const mem = { users: {}, sessions: {}, meta: {} };

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
      await p.query(`CREATE TABLE IF NOT EXISTS tp_meta (key TEXT PRIMARY KEY, data JSONB NOT NULL)`);
      await p.query(`CREATE TABLE IF NOT EXISTS tp_blobs (key TEXT PRIMARY KEY, mime TEXT NOT NULL, data BYTEA NOT NULL)`);
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
    for (const r of (await pool.query('SELECT key, data FROM tp_meta')).rows) mem.meta[r.key] = r.data;
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
      deleteUser: async username => { await pool.query('DELETE FROM tp_sessions WHERE username = $1', [username]); await pool.query('DELETE FROM tp_users WHERE username = $1', [username]); },
      // Sent as JSON text: given a JavaScript array (the app's reports, the received emails) pg writes a PostgreSQL
      // array literal, which a JSONB column refuses, so such a save always failed. Kept in memory too, as the file
      // store does.
      saveMeta: (key, data) => {
        mem.meta[key] = data;
        return pool.query('INSERT INTO tp_meta (key, data) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data', [key, JSON.stringify(data)]);
      },
      saveBlob: (key, mime, buf) => pool.query(
        'INSERT INTO tp_blobs (key, mime, data) VALUES ($1, $2, $3) ON CONFLICT (key) DO UPDATE SET mime = EXCLUDED.mime, data = EXCLUDED.data', [key, mime, buf]),
      deleteBlob: key => pool.query('DELETE FROM tp_blobs WHERE key = $1', [key]),
      blobKeys: async prefix => (await pool.query("SELECT key FROM tp_blobs WHERE key LIKE $1 || '%'", [prefix])).rows.map(r => r.key),
      getBlob: async key => { const r = (await pool.query('SELECT mime, data FROM tp_blobs WHERE key = $1', [key])).rows[0]; return r ? { mime: r.mime, data: r.data } : null; },
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
      fs.writeFileSync(tmp, JSON.stringify({ users: mem.users, sessions: mem.sessions, meta: mem.meta }));
      fs.renameSync(tmp, dbFile); // atomic replace
      const done = waiting; waiting = [];
      done.forEach(r => r());
    }, 100);
  });
  console.log(`Storage: ${path.relative(process.cwd(), dbFile) || dbFile} (${Object.keys(mem.users).length} users)`);
  mem.meta = mem.meta || {};
  // Blobs as files next to the JSON file (data/blobs/<key>), with the type in a small sidecar.
  const blobDir = path.join(path.dirname(dbFile), 'blobs'), blobPath = key => path.join(blobDir, key.replace(/[^a-zA-Z0-9_.-]/g, '_'));
  const saveBlob = async (key, mime, buf) => { fs.mkdirSync(blobDir, { recursive: true }); fs.writeFileSync(blobPath(key), buf); fs.writeFileSync(blobPath(key) + '.mime', mime); };
  const getBlob = async key => { try { return { data: fs.readFileSync(blobPath(key)), mime: fs.readFileSync(blobPath(key) + '.mime', 'utf8') }; } catch { return null; } };
  const deleteBlob = async key => { for (const f of [blobPath(key), blobPath(key) + '.mime']) try { fs.unlinkSync(f); } catch {} };
  // (The keys as their file names: the same for the keys made only of letters, digits and - _ .)
  const blobKeys = async prefix => { try { return fs.readdirSync(blobDir).filter(f => f.startsWith(prefix) && !f.endsWith('.mime')); } catch { return []; } };
  return { ...mem, kind: 'file', saveUser: flush, deleteUser: flush, saveSession: flush, deleteSession: flush, saveMeta: (key, data) => { mem.meta[key] = data; return flush(); }, saveBlob, getBlob, deleteBlob, blobKeys };
}

module.exports = { openStore };
