// The server's API tests (CI, .github/workflows/ci.yml and deploy.yml; Mojtaba 2026-11-15: «CI/CD کامل»): the server is
// started on its own, with a file database in a temporary folder and no keys, and asked what the app asks. Run with
// `npm test` (node --test); nothing outside the temporary folder is touched.
'use strict';
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const PORT = 3990 + Math.floor(Math.random() * 9);
const B = `http://127.0.0.1:${PORT}`;
let server, dir, log = '';

before(async () => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tp-test-'));
  const env = { ...process.env, PORT: String(PORT), HOST: '127.0.0.1', DB_FILE: path.join(dir, 'db.json') };
  for (const k of ['TP_VAULT_SECRET', 'ORACLE_CONNECT_STRING', 'DATABASE_URL', 'OCI_BUCKET', 'INVITE_CODE']) delete env[k];
  server = spawn(process.execPath, ['server.js'], { cwd: ROOT, env, stdio: ['ignore', 'pipe', 'pipe'] });
  server.stdout.on('data', d => { log += d; });
  server.stderr.on('data', d => { log += d; });
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(`${B}/api/health`); if (r.ok && (await r.json()).db) return; } catch { /* not up yet */ }
    await new Promise(r => setTimeout(r, 500));
  }
  throw new Error(`the server did not start:\n${log}`);
});
after(() => {
  if (server) server.kill();
  if (dir) fs.rmSync(dir, { recursive: true, force: true });
});

const api = (p, { token, method = 'GET', body } = {}) => fetch(`${B}/api/${p}`, {
  method,
  headers: { 'x-client': 'app', ...(token ? { authorization: `Bearer ${token}` } : {}), ...(body ? { 'content-type': 'application/json' } : {}) },
  body: body ? JSON.stringify(body) : undefined,
});
// (the server lets one address make only a few accounts in a while: the tests share one guest, and one more for signing out)
let shared;
async function guest() { return (shared = shared || await newGuest()); }
async function newGuest() {
  const r = await api('guest', { method: 'POST', body: { name: 'Test' } });
  assert.equal(r.status, 200);
  const j = await r.json();
  assert.match(j.token, /^[a-f0-9]{64}$/);
  assert.equal(j.user.guest, true);
  return j.token;
}

test('health answers with the database', async () => {
  const j = await (await api('health')).json();
  assert.equal(j.ok, true);
  assert.equal(j.db, true);
});

test('config answers', async () => {
  const r = await api('config');
  assert.equal(r.status, 200);
  assert.equal(typeof (await r.json()), 'object');
});

test('the web app and its /app copy are served', async () => {
  for (const p of ['/', '/app']) {
    const r = await fetch(B + p);
    assert.equal(r.status, 200, p);
    assert.match(await r.text(), /<html/i, p);
  }
});

test('without a session the account is refused', async () => {
  assert.equal((await api('me')).status, 401);
  assert.equal((await api('attempts', { method: 'POST', body: { items: [{ id: 1, ok: true }] } })).status, 401);
});

test('a guest gets an account and its data', async () => {
  const token = await guest();
  const j = await (await api('me', { token })).json();
  assert.equal(j.user.guest, true);
  assert.deepEqual(j.attempts, []);
});

test('a finished test is saved and comes back', async () => {
  const token = await guest();
  const items = [{ id: 5001, ok: true, a: [1, 0, 0, 0] }, { id: 5002, ok: false, a: [0, 1, 0, 0] }];
  const r = await api('attempts', { token, method: 'POST', body: { mode: 'new', secs: 60, items } });
  assert.equal(r.status, 200);
  const { attempt } = await r.json();
  assert.equal(attempt.items.length, 2);
  const me = await (await api('me', { token })).json();
  assert.equal(me.attempts.length, 1);
  assert.deepEqual(me.attempts[0].items.map(x => x.ok), [true, false]);
});

test('an empty test is refused', async () => {
  const token = await guest();
  assert.equal((await api('attempts', { token, method: 'POST', body: { items: [] } })).status, 400);
});

test('settings are kept', async () => {
  const token = await guest();
  assert.equal((await api('settings', { token, method: 'PUT', body: { ui: 'en' } })).status, 200);
  const me = await (await api('me', { token })).json();
  assert.equal(me.settings.ui, 'en');
});

test('a guest is not an admin', async () => {
  const token = await guest();
  assert.equal((await api('adminstats', { token })).status, 403);
});

test('signing out ends the session', async () => {
  const token = await newGuest();
  assert.equal((await api('logout', { token, method: 'POST' })).status, 200);
  assert.equal((await api('me', { token })).status, 401);
});
