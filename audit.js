// The admins' log (Mojtaba 2026-11-06): what was done with admin rights, by whom, when and from where, so a change or a
// misuse can be traced. Kept in store.meta.audit ({ list }, newest first, the last MAX entries of at most DAYS days) and
// shown on the «سامانه» page (console/system.html). Recorded (server.js):
// - every admin request that changes something (not GET), and the GETs that show keys or users' data (SENSITIVE);
// - every sign-in that gives admin rights (with a code, Google or a passkey), and a wrong code for an admin's address;
// - an admin's request refused (403), e.g. without Cloudflare Access's sign-in.
// Details are the request's small, plain fields only; nothing secret (passwords, keys, codes, tokens) is ever kept.
'use strict';

const MAX = 1000, DAYS = 180;
const SENSITIVE = new Set(['adminstats', 'smtp', 'playkey', 'backups']);
// fields never kept, by name, and routes whose whole body is secret (an SMTP password, Google's key file)
const SECRET = /pass|secret|token|key|code|cred|json|private|smtp/i;
const SECRET_ROUTES = new Set(['smtp', 'smtptest', 'playkey', 'playkeycheck']);

let store = null, timer = null;
const init = s => { store = s; };
const list = () => ((store && store.meta.audit && store.meta.audit.list) || []);

// The body's plain fields worth showing: strings, numbers and booleans, short, none secret by name.
function details(route, body) {
  if (!body || typeof body !== 'object' || SECRET_ROUTES.has(route)) return undefined;
  const out = {};
  for (const [k, v] of Object.entries(body)) {
    if (SECRET.test(k) || Object.keys(out).length >= 6) continue;
    if (typeof v === 'string' && v.length) out[k] = v.length > 60 ? v.slice(0, 60) + '…' : v;
    else if (typeof v === 'number' || typeof v === 'boolean') out[k] = v;
    else if (Array.isArray(v)) out[k] = `[${v.length}]`;
  }
  return Object.keys(out).length ? out : undefined;
}

function record(e) {
  if (!store) return;
  const now = Date.now(), old = now - DAYS * 864e5;
  const l = [{ at: now, ...e }, ...list().filter(x => x.at > old)].slice(0, MAX);
  store.meta.audit = { list: l };
  // saved once for a burst of actions
  clearTimeout(timer);
  timer = setTimeout(() => { Promise.resolve(store.saveMeta('audit', store.meta.audit)).catch(err => console.error('audit save', err.message)); }, 1500);
  timer.unref && timer.unref();
}

// An admin's request: recorded once it is answered (with its status), when it changes something or shows sensitive
// data, or was refused.
function watch(req, res, { route, by, ip, dev, admin }) {
  const changes = req.method !== 'GET';
  if (admin && !changes && !SENSITIVE.has(route)) return;
  res.on('finish', () => {
    if (!admin && res.statusCode !== 403) return;
    record({ by, act: admin ? route : 'denied:' + route, m: req.method, code: res.statusCode, ip, dev, d: admin ? details(route, req.auditBody) : undefined });
  });
}

module.exports = { init, list, record, watch, details };
