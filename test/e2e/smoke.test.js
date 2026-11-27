// The web app in a real browser (CI, after the web app is built; Mojtaba 2026-11-15: «CI/CD کامل»): the server is started
// with a file database in a temporary folder and the built app (app-web), a guest signs in, and the main pages open
// without an error, and the dock's start button starts a test. Needs the `playwright` package and its Chromium:
// `npm run test:e2e` (the workflow installs them).
'use strict';
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..', '..');
const PORT = 3980 + Math.floor(Math.random() * 9);
const B = `http://127.0.0.1:${PORT}`;
let server, dir, browser, log = '';

before(async () => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tp-e2e-'));
  const env = { ...process.env, PORT: String(PORT), HOST: '127.0.0.1', DB_FILE: path.join(dir, 'db.json') };
  for (const k of ['TP_VAULT_SECRET', 'ORACLE_CONNECT_STRING', 'DATABASE_URL', 'OCI_BUCKET', 'INVITE_CODE']) delete env[k];
  server = spawn(process.execPath, ['server.js'], { cwd: ROOT, env, stdio: ['ignore', 'pipe', 'pipe'] });
  server.stdout.on('data', d => { log += d; });
  server.stderr.on('data', d => { log += d; });
  let up = false;
  for (let i = 0; i < 60 && !up; i++) {
    try { const r = await fetch(`${B}/api/health`); up = r.ok && (await r.json()).db; } catch { /* not up yet */ }
    if (!up) await new Promise(r => setTimeout(r, 500));
  }
  if (!up) throw new Error(`the server did not start:\n${log}`);
  browser = await chromium.launch();
});
after(async () => {
  if (browser) await browser.close();
  if (server) server.kill();
  if (dir) fs.rmSync(dir, { recursive: true, force: true });
});

// A page of the app as a signed-in guest in the given language, with every page error collected.
async function open(pathname, ui = 'fa') {
  const r = await fetch(`${B}/api/guest`, { method: 'POST', headers: { 'x-client': 'app' } });
  assert.equal(r.status, 200, 'guest');
  const { token } = await r.json();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(([t, u]) => {
    localStorage.setItem('tp.onboarded', '4'); localStorage.setItem('tp_token', t); localStorage.setItem('tp.ui', u);
  }, [token, ui]);
  const page = await ctx.newPage(), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(B + pathname);
  // (a first-run screen, if one shows, is passed)
  const next = page.getByText(/^(Continue|ادامه|Fortsæt)$/).last();
  if (await next.waitFor({ state: 'visible', timeout: 8000 }).then(() => true, () => false)) { await next.click(); await page.goto(B + pathname); }
  return { page, ctx, errors };
}

test('home opens and the dock start button starts a test', async () => {
  const { page, ctx, errors } = await open('/');
  await page.getByTestId('start-test').waitFor({ timeout: 20000 });
  await page.waitForTimeout(3000);   // (the page settles: its cards rise in)
  await page.getByTestId('start-test').click();
  await page.getByTestId('start-10').click();
  await page.waitForURL(/\/run/, { timeout: 15000 });
  assert.deepEqual(errors, []);
  await ctx.close();
});

for (const [p, ui] of [['/learn', 'en'], ['/exam', 'fa'], ['/settings', 'da']]) {
  test(`${p} opens (${ui})`, async () => {
    const { page, ctx, errors } = await open(p, ui);
    await page.getByRole('tablist').waitFor({ timeout: 20000 });
    await page.waitForTimeout(1500);
    assert.equal(await page.getByText(/^(This page didn't open|این صفحه باز نشد)/).count(), 0);
    assert.deepEqual(errors, []);
    await ctx.close();
  });
}
