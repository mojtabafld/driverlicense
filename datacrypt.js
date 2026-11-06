// The database's data encrypted by the server itself (Mojtaba 2026-11-06), so a copy of the database (its tables, an
// export, a stolen password to it) shows no user's email, name or answers: with DATA_KEY in the vault (any long secret,
// 32+ characters), every document Oracle keeps (tp_users, tp_meta) is AES-256-GCM sealed, and every place an account's
// name (its email) is a key (tp_users, tp_sessions, tp_gone, a meta key with an address in it) holds an HMAC of it
// instead. The server reads both forms, so the rows still in the clear are read as before and sealed by migrate (store.js).
// In memory nothing changes: the server works with the plain documents as before.
// Losing DATA_KEY makes the database unreadable: keep a copy of it apart from the vault. (The nightly backups are made
// from memory and sealed with BACKUP_KEY alone, so they stay a way back.)
'use strict';
const crypto = require('crypto');

const PREFIX = 'TPE1.';     // a sealed document: TPE1.<base64url of iv (12) + tag (16) + the encrypted JSON>
const ID = 'x:';            // a key made from an account's name: x:<base64url HMAC-SHA256>

const secret = () => String(process.env.DATA_KEY || '').trim();
const on = () => secret().length >= 32;
let cache = null;
function keys() {
  const s = secret();
  if (!cache || cache.s !== s) {
    const k = n => Buffer.from(crypto.hkdfSync('sha256', Buffer.from(s), Buffer.from('teoripro-data'), Buffer.from(n), 32));
    cache = { s, enc: k('enc'), idx: k('idx') };
  }
  return cache;
}

const sealed = v => typeof v === 'string' && v.startsWith(PREFIX);
function seal(text) {
  const iv = crypto.randomBytes(12), c = crypto.createCipheriv('aes-256-gcm', keys().enc, iv);
  const body = Buffer.concat([c.update(text, 'utf8'), c.final()]);
  return PREFIX + Buffer.concat([iv, c.getAuthTag(), body]).toString('base64url');
}
// A document as stored, sealed or not, back to its JSON text.
function open(stored) {
  if (!sealed(stored)) return stored;
  if (!on()) throw new Error('The database is encrypted and DATA_KEY is not set: set it in the vault (the same value as before).');
  const b = Buffer.from(stored.slice(PREFIX.length), 'base64url');
  const d = crypto.createDecipheriv('aes-256-gcm', keys().enc, b.subarray(0, 12));
  d.setAuthTag(b.subarray(12, 28));
  try { return Buffer.concat([d.update(b.subarray(28)), d.final()]).toString('utf8'); }
  catch { throw new Error('The database is encrypted with another DATA_KEY: set the vault\'s DATA_KEY back to the value it was encrypted with.'); }
}
const id = name => ID + crypto.createHmac('sha256', keys().idx).update(String(name)).digest('base64url');
const isId = k => typeof k === 'string' && k.startsWith(ID);

module.exports = { on, seal, open, sealed, id, isId };
