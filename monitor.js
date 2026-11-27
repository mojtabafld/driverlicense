// The server's own monitoring for the admin's «سامانه» page (console/system.html; Mojtaba 2026-10-31): once a minute
// the machine's CPU (all cores, from /proc/stat), its memory in use (/proc/meminfo, without the page cache), the
// network in and out (/proc/net/dev, every interface but lo), and the app's own CPU and memory; the last 24 hours kept
// (in memory, and in store.meta.monitor every ten minutes so a restart keeps them). The disk, the database's and the
// files bucket's sizes every 30 minutes. Only Linux has /proc; elsewhere the machine's numbers are left out.
'use strict';
const fs = require('node:fs');
const os = require('node:os');

const KEEP = 24 * 60;
let store = null, prev = null, points = [], sizes = null, lastSave = 0;

const read = f => { try { return fs.readFileSync(f, 'utf8'); } catch { return ''; } };
function cpuTicks() {
  const l = read('/proc/stat').split('\n')[0].trim().split(/\s+/).slice(1).map(Number);
  if (l.length < 4) return null;
  const idle = l[3] + (l[4] || 0);
  return { idle, total: l.reduce((a, b) => a + b, 0) };
}
function memUsed() {
  const m = Object.fromEntries(read('/proc/meminfo').split('\n').map(x => x.split(/:\s+/)).filter(x => x[1]).map(([k, v]) => [k, parseInt(v, 10) * 1024]));
  return m.MemTotal ? { total: m.MemTotal, used: m.MemTotal - (m.MemAvailable ?? m.MemFree) } : { total: os.totalmem(), used: os.totalmem() - os.freemem() };
}
function netBytes() {
  let rx = 0, tx = 0;
  for (const l of read('/proc/net/dev').split('\n').slice(2)) {
    const [name, rest] = l.split(':'); if (!rest || name.trim() === 'lo') continue;
    const f = rest.trim().split(/\s+/).map(Number); rx += f[0]; tx += f[8];
  }
  return { rx, tx };
}
function now() {
  return { t: Date.now(), cpu: cpuTicks(), net: netBytes(), app: process.cpuUsage() };
}

function sample() {
  const cur = now(), mem = memUsed();
  if (prev) {
    const dt = (cur.t - prev.t) / 1000, p = { t: cur.t };
    if (cur.cpu && prev.cpu) { const dTot = cur.cpu.total - prev.cpu.total; p.cpu = dTot > 0 ? Math.round((1 - (cur.cpu.idle - prev.cpu.idle) / dTot) * 1000) / 10 : 0; }
    p.mem = Math.round(mem.used / mem.total * 1000) / 10;
    p.rx = Math.max(0, Math.round((cur.net.rx - prev.net.rx) / dt / 1024 * 10) / 10);   // kB/s
    p.tx = Math.max(0, Math.round((cur.net.tx - prev.net.tx) / dt / 1024 * 10) / 10);
    const appUs = (cur.app.user - prev.app.user) + (cur.app.system - prev.app.system);
    p.app = Math.round(appUs / 1e4 / dt * 10) / 10;   // % of one core
    p.rss = Math.round(process.memoryUsage().rss / 1048576);
    points.push(p);
    while (points.length > KEEP) points.shift();
  }
  prev = cur;
  if (store && Date.now() - lastSave > 10 * 60e3) { lastSave = Date.now(); store.saveMeta('monitor', { points }).catch(() => {}); }
}

async function measureSizes() {
  const out = { at: Date.now() };
  try { const s = fs.statfsSync('/'); out.disk = { total: s.blocks * s.bsize, used: (s.blocks - s.bfree) * s.bsize }; } catch {}
  try { if (store.size) out.db = (await store.size()).all; } catch {}
  try { if (store.files && await store.files.ready()) { const l = await store.files.list(''); out.bucket = { files: l.length, bytes: l.reduce((n, o) => n + (+o.size || 0), 0) }; } } catch {}
  sizes = out;
}

function start(s) {
  store = s;
  const kept = store.meta.monitor && store.meta.monitor.points;
  if (Array.isArray(kept)) points = kept.filter(p => Date.now() - p.t < KEEP * 60e3);
  sample();
  setInterval(sample, 60e3).unref();
  setTimeout(() => measureSizes().catch(() => {}), 30e3).unref();
  setInterval(() => measureSizes().catch(() => {}), 30 * 60e3).unref();
}
const report = () => ({ points, sizes, host: { cpus: os.cpus().length, memory: memUsed().total, uptime: os.uptime() } });
module.exports = { start, report };
