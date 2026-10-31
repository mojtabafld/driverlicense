// Oracle Cloud Object Storage for the server's files (Mojtaba 2026-10-31): the pictures (and every other blob: the
// AI's, prove.dk's, the app's sizes) and the daily backups, in place of the database's tp_blobs table, which filled the
// database and slowed it. With OCI_BUCKET set (e.g. «teoripro», a private bucket in the server's tenancy) and the
// server's instance allowed to manage that bucket's objects (a policy for its dynamic group), wrap(store) puts:
//   - every new blob in the bucket, as blobs/<key>;
//   - a read from the bucket, else from the database (a blob not moved yet);
//   - a delete in both; blobKeys over both.
// In the background, a little after the start, the blobs still in the database are moved: each is put in the bucket,
// read back and compared, and only then taken out of the database (a few at a time, so the server stays quick).
// The ones read most are kept in memory too (64 MB). Signed in as the server's own instance: no key in any file.
// Without OCI_BUCKET everything stays as it was.
'use strict';

const PREFIX = 'blobs/';
let client = null, ns = '', bucket = '';

async function connect() {
  if (client) return client;
  const common = require('oci-common');
  const { ObjectStorageClient } = require('oci-objectstorage');
  const auth = await new common.InstancePrincipalsAuthenticationDetailsProviderBuilder().build();
  const c = new ObjectStorageClient({ authenticationDetailsProvider: auth });
  c.region = auth.getRegion();
  ns = (await c.getNamespace({})).value;
  bucket = process.env.OCI_BUCKET.trim();
  await c.getBucket({ namespaceName: ns, bucketName: bucket });   // there, and allowed
  client = c;
  return c;
}

async function body(stream) {
  if (Buffer.isBuffer(stream)) return stream;
  if (stream && typeof stream.getReader === 'function') {   // a web ReadableStream
    const r = stream.getReader(), parts = [];
    for (;;) { const { done, value } = await r.read(); if (done) break; parts.push(Buffer.from(value)); }
    return Buffer.concat(parts);
  }
  const parts = [];
  for await (const p of stream) parts.push(Buffer.from(p));
  return Buffer.concat(parts);
}
const buf = b => (Buffer.isBuffer(b) ? b : Buffer.from(b.buffer, b.byteOffset, b.byteLength));
const missing = e => e && (e.statusCode === 404 || e.serviceCode === 'ObjectNotFound');

// The bucket's own calls, for the backups too: put / get / remove / list (names under a prefix, with sizes and times).
async function put(name, data, mime = 'application/octet-stream') {
  const c = await connect(), d = buf(data);
  await c.putObject({ namespaceName: ns, bucketName: bucket, objectName: name, putObjectBody: d, contentLength: d.length, contentType: mime });
}
async function get(name) {
  const c = await connect();
  try {
    const r = await c.getObject({ namespaceName: ns, bucketName: bucket, objectName: name });
    return { mime: r.contentType || 'application/octet-stream', data: await body(r.value) };
  } catch (e) { if (missing(e)) return null; throw e; }
}
async function remove(name) {
  const c = await connect();
  try { await c.deleteObject({ namespaceName: ns, bucketName: bucket, objectName: name }); } catch (e) { if (!missing(e)) throw e; }
}
async function list(prefix) {
  const c = await connect(), out = [];
  for (let start; ;) {
    const r = await c.listObjects({ namespaceName: ns, bucketName: bucket, prefix, start, fields: 'name,size,timeCreated' });
    out.push(...r.listObjects.objects);
    if (!(start = r.listObjects.nextStartWith)) break;
  }
  return out;
}

const MEM_MAX = 64e6;
function wrap(store) {
  if (!process.env.OCI_BUCKET || !store.saveBlob) return store;
  const db = { saveBlob: store.saveBlob, getBlob: store.getBlob, deleteBlob: store.deleteBlob, blobKeys: store.blobKeys };
  const mem = new Map(); let memBytes = 0;
  const keep = (k, b) => {
    if (!b || b.data.length > 8e6) return;
    if (mem.has(k)) { memBytes -= mem.get(k).data.length; mem.delete(k); }
    mem.set(k, b); memBytes += b.data.length;
    for (const [x, y] of mem) { if (memBytes <= MEM_MAX) break; mem.delete(x); memBytes -= y.data.length; }
  };
  const forget = k => { const b = mem.get(k); if (b) { memBytes -= b.data.length; mem.delete(k); } };
  // Until the bucket answers once, the database is used as before (a wrong policy never loses a picture).
  let ok = null;
  const ready = () => (ok = ok || connect().then(() => true, e => { console.error(`Files: bucket «${process.env.OCI_BUCKET}» not reached, the database keeps them: ${e.message}`); ok = null; return false; }));

  store.saveBlob = async (key, mime, data) => {
    forget(key);
    if (!(await ready())) return db.saveBlob(key, mime, data);
    await put(PREFIX + key, data, mime);
    keep(key, { mime, data: buf(data) });
    await db.deleteBlob(key).catch(() => {});   // an older copy there would come back if the bucket ever failed
  };
  store.getBlob = async key => {
    if (mem.has(key)) { const b = mem.get(key); mem.delete(key); mem.set(key, b); return b; }
    let b = null;
    if (await ready()) b = await get(PREFIX + key).catch(e => { console.error('Files: read', key, e.message); return null; });
    if (!b) b = await db.getBlob(key);
    keep(key, b);
    return b;
  };
  store.deleteBlob = async key => {
    forget(key);
    if (await ready()) await remove(PREFIX + key);
    await db.deleteBlob(key);
  };
  store.blobKeys = async prefix => {
    const keys = new Set(await db.blobKeys(prefix));
    if (await ready()) for (const o of await list(PREFIX + prefix)) keys.add(o.name.slice(PREFIX.length));
    return [...keys];
  };
  store.files = { put, get, remove, list, ready };
  setTimeout(() => move(db).catch(e => console.error('Files: move', e.message)), 90e3).unref();
  return store;

  // The blobs still in the database, moved into the bucket one by one, each checked before it leaves the database.
  async function move(from) {
    if (!(await ready())) return;
    const keys = await from.blobKeys('');
    if (!keys.length) return console.log('Files: all in the bucket');
    console.log(`Files: moving ${keys.length} files from the database into the bucket`);
    let n = 0, bytes = 0;
    for (const key of keys) {
      try {
        const b = await from.getBlob(key);
        if (!b) continue;
        await put(PREFIX + key, b.data, b.mime);
        const back = await get(PREFIX + key);
        if (!back || !back.data.equals(buf(b.data))) throw new Error('the copy in the bucket differs');
        await from.deleteBlob(key);
        n++; bytes += b.data.length;
        if (n % 100 === 0) console.log(`Files: ${n} of ${keys.length} moved`);
      } catch (e) { console.error('Files: move', key, e.message); }
      await new Promise(r => setTimeout(r, 150));
    }
    console.log(`Files: ${n} files (${Math.round(bytes / 1e6)} MB) moved into the bucket`);
  }
}

module.exports = { wrap };
