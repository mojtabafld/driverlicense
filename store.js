// Persistence for users and sessions.
// - ORACLE_CONNECT_STRING set → Oracle Database (e.g. an Oracle Cloud Autonomous Database, «AI Database»; Mojtaba
//                               2026-10-29), with ORACLE_USER and ORACLE_PASSWORD (and ORACLE_WALLET_DIR with
//                               ORACLE_WALLET_PASSWORD when the database asks for mutual TLS): openOracle below.
// - DATABASE_URL set          → PostgreSQL (DigitalOcean App Platform / Managed DB); data survives redeploys.
// - otherwise                 → a local JSON file (data/db.json), handy for running on your own computer.
// Everything is kept in memory; writes go through saveUser / deleteUser / saveSession / deleteSession / saveMeta
// (deleteUser removes the user's row and sessions in the database; the caller drops them from memory).
// With PostgreSQL a deploy runs the old server and the new one side by side for a few minutes, each with its own copy in
// memory: catchUp (called by the server in its first minutes) takes in what the old one changed after the new one had
// read the database, and a deleted account's row is marked in tp_gone so a late save of it (by the other server, or a
// background job still holding it) never puts it back (Mojtaba 2026-10-21: a deleted account could sign in again).
// meta holds small site-wide documents by key (e.g. 'visits' for the admin panel's visit counts).
// Blobs (generated question pictures) are binary files kept apart from meta and read on demand: saveBlob / getBlob
// (blobKeys lists the keys that start with a prefix).
'use strict';
const fs = require('node:fs');
const path = require('node:path');

async function openStore({ dbFile }) {
  const mem = { users: {}, sessions: {}, meta: {} };

  if (process.env.ORACLE_CONNECT_STRING) return openOracle(mem);

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
      await p.query(`CREATE TABLE IF NOT EXISTS tp_gone (username TEXT PRIMARY KEY, at BIGINT NOT NULL)`);
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
      // Each save stamped (`savedAt`; not `saved`, the user's saved questions), so catchUp can tell the newer copy; never a deleted account's row again, unless it
      // is a new account made after the deletion (the same address signing up again).
      saveUser: u => {
        u.savedAt = Date.now();
        return pool.query(
          `INSERT INTO tp_users (username, data) SELECT $1::text, $2::jsonb
             WHERE NOT EXISTS (SELECT 1 FROM tp_gone WHERE username = $1::text AND at >= $3::bigint)
           ON CONFLICT (username) DO UPDATE SET data = EXCLUDED.data`,
          [u.username, JSON.stringify(u), Math.round(+u.created || 0)]);
      },
      saveSession: (token, s) => pool.query(
        'INSERT INTO tp_sessions (token, username, exp) VALUES ($1, $2, $3) ON CONFLICT (token) DO UPDATE SET exp = EXCLUDED.exp',
        [token, s.username, s.exp]),
      deleteSession: token => pool.query('DELETE FROM tp_sessions WHERE token = $1', [token]),
      deleteUser: async username => {
        await pool.query('INSERT INTO tp_gone (username, at) VALUES ($1, $2) ON CONFLICT (username) DO UPDATE SET at = EXCLUDED.at', [username, Date.now()]);
        await pool.query('DELETE FROM tp_sessions WHERE username = $1', [username]);
        await pool.query('DELETE FROM tp_users WHERE username = $1', [username]);
      },
      // The database's newer copies into memory: accounts saved later by the other server, accounts it made, and the
      // sessions it started; accounts it deleted go from memory with their sessions (not one made here this last minute,
      // whose first save may still be on its way), and so does its record of deleted accounts (meta `gone`).
      // Whether the account is still in the database (asked when signing in, as catchUp runs only once a minute).
      exists: async username => (await pool.query('SELECT 1 FROM tp_users WHERE username = $1', [username])).rowCount > 0,
      catchUp: async () => {
        const rows = (await pool.query('SELECT data FROM tp_users')).rows, seen = new Set();
        for (const { data: d } of rows) {
          seen.add(d.username);
          const m = mem.users[d.username];
          if (!m || (+d.savedAt || 0) > (+m.savedAt || 0)) mem.users[d.username] = d;
        }
        const fresh = Date.now() - 60e3;
        for (const [k, u] of Object.entries(mem.users)) if (!seen.has(k) && !((+u.created || 0) > fresh)) delete mem.users[k];
        for (const r of (await pool.query('SELECT token, username, exp FROM tp_sessions')).rows) if (!mem.sessions[r.token]) mem.sessions[r.token] = { username: r.username, exp: +r.exp };
        for (const [t, x] of Object.entries(mem.sessions)) if (!mem.users[x.username]) delete mem.sessions[t];
        const g = (await pool.query("SELECT data FROM tp_meta WHERE key = 'gone'")).rows[0];
        if (g) mem.meta.gone = g.data;
      },
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

// Oracle Database: the same tables, the same behaviour as PostgreSQL above (the documents as JSON text in CLOBs, the
// blobs in BLOBs). node-oracledb in its Thin mode, plain JavaScript: no Oracle Client libraries on the server.
// The connect string as the database's console gives it (its «Database connection», a TLS one; with ORACLE_WALLET_DIR
// the unzipped wallet's folder for mutual TLS). A column is never named KEY, AT or EXP (Oracle's words): k, gone_at,
// expires.
async function openOracle(mem) {
  const oracledb = require('oracledb');
  oracledb.fetchAsString = [oracledb.CLOB];
  oracledb.fetchAsBuffer = [oracledb.BLOB];
  const wallet = process.env.ORACLE_WALLET_DIR;
  const pool = await oracledb.createPool({
    user: process.env.ORACLE_USER, password: process.env.ORACLE_PASSWORD, connectString: process.env.ORACLE_CONNECT_STRING,
    ...(wallet ? { configDir: wallet, walletLocation: wallet, walletPassword: process.env.ORACLE_WALLET_PASSWORD } : {}),
    poolMin: 1, poolMax: 5, poolIncrement: 1,
  });
  // One statement on a connection of the pool, committed at once; rows as objects with the names given in the query.
  const run = async (sql, binds = {}) => {
    const c = await pool.getConnection();
    try { return await c.execute(sql, binds, { autoCommit: true, outFormat: oracledb.OUT_FORMAT_OBJECT }); } finally { await c.close(); }
  };
  const rows = async (sql, binds) => (await run(sql, binds)).rows || [];
  const clob = v => ({ val: v, type: oracledb.DB_TYPE_CLOB });
  // An upsert (MERGE); two servers inserting the same new row at once: the second one's MERGE fails on the key
  // (ORA-00001) and is run again, as an update.
  const merge = async (sql, binds) => {
    try { return await run(sql, binds); } catch (e) { if (e.errorNum !== 1) throw e; return run(sql, binds); }
  };
  for (const ddl of [
    'CREATE TABLE tp_users (username VARCHAR2(400) PRIMARY KEY, data CLOB NOT NULL)',
    'CREATE TABLE tp_sessions (token VARCHAR2(200) PRIMARY KEY, username VARCHAR2(400) NOT NULL, expires NUMBER(19) NOT NULL)',
    'CREATE TABLE tp_meta (k VARCHAR2(400) PRIMARY KEY, data CLOB NOT NULL)',
    'CREATE TABLE tp_gone (username VARCHAR2(400) PRIMARY KEY, gone_at NUMBER(19) NOT NULL)',
    'CREATE TABLE tp_blobs (k VARCHAR2(400) PRIMARY KEY, mime VARCHAR2(100) NOT NULL, data BLOB NOT NULL)',
  ]) {
    try { await run(ddl); } catch (e) { if (e.errorNum !== 955) throw e; } // ORA-00955: it is there already
  }
  await run('DELETE FROM tp_sessions WHERE expires < :now', { now: Date.now() });
  for (const r of await rows('SELECT data AS "data" FROM tp_users')) { const u = JSON.parse(r.data); mem.users[u.username] = u; }
  for (const r of await rows('SELECT token AS "token", username AS "username", expires AS "exp" FROM tp_sessions')) {
    mem.sessions[r.token] = { username: r.username, exp: +r.exp };
  }
  for (const r of await rows('SELECT k AS "k", data AS "data" FROM tp_meta')) mem.meta[r.k] = JSON.parse(r.data);
  console.log(`Storage: Oracle Database (${Object.keys(mem.users).length} users)`);
  return {
    ...mem,
    kind: 'oracle',
    // As PostgreSQL's: stamped, and never a deleted account's row again unless it is a new account made after it.
    saveUser: u => {
      u.savedAt = Date.now();
      return merge(
        `MERGE INTO tp_users t
           USING (SELECT :u AS username FROM dual
                   WHERE NOT EXISTS (SELECT 1 FROM tp_gone g WHERE g.username = :u AND g.gone_at >= :created)) s
           ON (t.username = s.username)
         WHEN MATCHED THEN UPDATE SET t.data = :d
         WHEN NOT MATCHED THEN INSERT (username, data) VALUES (s.username, :d)`,
        { u: u.username, d: clob(JSON.stringify(u)), created: Math.round(+u.created || 0) });
    },
    saveSession: (token, s) => merge(
      `MERGE INTO tp_sessions t USING (SELECT :t AS token FROM dual) s ON (t.token = s.token)
       WHEN MATCHED THEN UPDATE SET t.expires = :e
       WHEN NOT MATCHED THEN INSERT (token, username, expires) VALUES (:t, :u, :e)`,
      { t: token, u: s.username, e: s.exp }),
    deleteSession: token => run('DELETE FROM tp_sessions WHERE token = :t', { t: token }),
    deleteUser: async username => {
      await merge(
        `MERGE INTO tp_gone t USING (SELECT :u AS username FROM dual) s ON (t.username = s.username)
         WHEN MATCHED THEN UPDATE SET t.gone_at = :at
         WHEN NOT MATCHED THEN INSERT (username, gone_at) VALUES (:u, :at)`,
        { u: username, at: Date.now() });
      await run('DELETE FROM tp_sessions WHERE username = :u', { u: username });
      await run('DELETE FROM tp_users WHERE username = :u', { u: username });
    },
    exists: async username => (await rows('SELECT 1 AS "one" FROM tp_users WHERE username = :u', { u: username })).length > 0,
    catchUp: async () => {
      const seen = new Set();
      for (const r of await rows('SELECT data AS "data" FROM tp_users')) {
        const d = JSON.parse(r.data);
        seen.add(d.username);
        const m = mem.users[d.username];
        if (!m || (+d.savedAt || 0) > (+m.savedAt || 0)) mem.users[d.username] = d;
      }
      const fresh = Date.now() - 60e3;
      for (const [k, u] of Object.entries(mem.users)) if (!seen.has(k) && !((+u.created || 0) > fresh)) delete mem.users[k];
      for (const r of await rows('SELECT token AS "token", username AS "username", expires AS "exp" FROM tp_sessions')) {
        if (!mem.sessions[r.token]) mem.sessions[r.token] = { username: r.username, exp: +r.exp };
      }
      for (const [t, x] of Object.entries(mem.sessions)) if (!mem.users[x.username]) delete mem.sessions[t];
      const g = (await rows("SELECT data AS \"data\" FROM tp_meta WHERE k = 'gone'"))[0];
      if (g) mem.meta.gone = JSON.parse(g.data);
    },
    saveMeta: (key, data) => {
      mem.meta[key] = data;
      return merge(
        `MERGE INTO tp_meta t USING (SELECT :k AS k FROM dual) s ON (t.k = s.k)
         WHEN MATCHED THEN UPDATE SET t.data = :d
         WHEN NOT MATCHED THEN INSERT (k, data) VALUES (:k, :d)`,
        { k: key, d: clob(JSON.stringify(data)) });
    },
    saveBlob: (key, mime, buf) => merge(
      `MERGE INTO tp_blobs t USING (SELECT :k AS k FROM dual) s ON (t.k = s.k)
       WHEN MATCHED THEN UPDATE SET t.mime = :m, t.data = :d
       WHEN NOT MATCHED THEN INSERT (k, mime, data) VALUES (:k, :m, :d)`,
      // (a Buffer: node-oracledb refuses a plain Uint8Array, e.g. a picture back from guideweb.js's worker, with NJS-011)
      { k: key, m: mime, d: { val: Buffer.isBuffer(buf) ? buf : Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength), type: oracledb.DB_TYPE_BLOB } }),
    deleteBlob: key => run('DELETE FROM tp_blobs WHERE k = :k', { k: key }),
    blobKeys: async prefix => (await rows("SELECT k AS \"k\" FROM tp_blobs WHERE k LIKE :p || '%'", { p: prefix })).map(r => r.k),
    getBlob: async key => { const r = (await rows('SELECT mime AS "mime", data AS "data" FROM tp_blobs WHERE k = :k', { k: key }))[0]; return r ? { mime: r.mime, data: r.data } : null; },
    // For the move from PostgreSQL (scripts/pg-to-oracle.js): a deleted account's mark, with its time.
    importGone: (username, at) => merge(
      `MERGE INTO tp_gone t USING (SELECT :u AS username FROM dual) s ON (t.username = s.username)
       WHEN MATCHED THEN UPDATE SET t.gone_at = :at
       WHEN NOT MATCHED THEN INSERT (username, gone_at) VALUES (:u, :at)`,
      { u: username, at }),
    close: () => pool.close(5),
    // Once every file is in the bucket (objstore.js): the empty files table's space given back (a DELETE keeps it).
    releaseBlobs: async () => {
      if ((await rows('SELECT COUNT(*) AS "n" FROM tp_blobs'))[0].n > 0) return false;
      await run('TRUNCATE TABLE tp_blobs DROP STORAGE');
      return true;
    },
    // The database's size on disk: its tables, indexes and LOBs (bytes), and tp_blobs' share of it.
    size: async () => {
      const all = (await rows('SELECT NVL(SUM(bytes), 0) AS "b" FROM user_segments'))[0].b;
      const blobs = (await rows("SELECT NVL(SUM(s.bytes), 0) AS \"b\" FROM user_segments s WHERE s.segment_name = 'TP_BLOBS' OR s.segment_name IN (SELECT l.segment_name FROM user_lobs l WHERE l.table_name = 'TP_BLOBS') OR s.segment_name IN (SELECT i.index_name FROM user_indexes i WHERE i.table_name = 'TP_BLOBS')"))[0].b;
      return { all: +all, blobs: +blobs };
    },
  };
}

module.exports = { openStore };
