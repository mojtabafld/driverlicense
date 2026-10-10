// The app's teaching pictures (/guide-art, /course-art, …) as they are sent to the browser: the image model's PNGs are
// ~0.7 MB each (1184×888, no transparency), which made switching between signs take seconds. An opaque PNG is sent
// as a JPEG (quality 85, the same size in pixels, about a tenth of the bytes); one with transparency is sent as it is.
// The result is kept in memory (at most CACHE_BYTES, least recently used dropped first) and in the store
// (blob web-<hash>), so a redeploy does not convert every picture again. The key names the picture's version, so a
// new picture is never mixed up with an old one.
'use strict';
const crypto = require('node:crypto');
const jpeg = require('jpeg-js');
const png = require('./png');

const CACHE_BYTES = 48e6, QUALITY = 85;
const mem = new Map(); let memBytes = 0;
const inflight = new Map();
let store = null;
const init = s => { store = s; };

function remember(id, b) {
  if (mem.has(id)) { memBytes -= mem.get(id).data.length; mem.delete(id); }
  mem.set(id, b); memBytes += b.data.length;
  while (memBytes > CACHE_BYTES && mem.size > 1) { const [k, v] = mem.entries().next().value; mem.delete(k); memBytes -= v.data.length; }
}

// An opaque PNG as a JPEG; anything else (or a JPEG that would not be much smaller) unchanged.
function optimize(b) {
  if (!b || b.mime !== 'image/png') return b;
  try {
    const im = png.decode(b.data);
    if (!im || im.ch === 1 || im.ch === 2) return b;
    const n = im.w * im.h, rgba = Buffer.alloc(n * 4);
    for (let i = 0; i < n; i++) {
      const a = im.ch === 4 ? im.px[i * 4 + 3] : 255;
      if (a !== 255) return b;   // transparent parts: keep the PNG
      rgba[i * 4] = im.px[i * im.ch]; rgba[i * 4 + 1] = im.px[i * im.ch + 1]; rgba[i * 4 + 2] = im.px[i * im.ch + 2]; rgba[i * 4 + 3] = 255;
    }
    const out = jpeg.encode({ data: rgba, width: im.w, height: im.h }, QUALITY).data;
    return out.length < b.data.length * 0.7 ? { mime: 'image/jpeg', data: out } : b;
  } catch (e) { console.error('webpic', e.message); return b; }
}

// id: the picture and its version (e.g. "guide:s-a11:muvdlfdu"); load: () => the original blob.
async function get(id, load) {
  if (mem.has(id)) { const b = mem.get(id); mem.delete(id); mem.set(id, b); return b; }
  if (inflight.has(id)) return inflight.get(id);
  const job = (async () => {
    const key = `web-${crypto.createHash('sha1').update(id).digest('hex').slice(0, 24)}`;
    let b = store && await store.getBlob(key).catch(() => null);
    if (!b) {
      const orig = await load();
      if (!orig) return null;
      b = optimize(orig);
      if (store) store.saveBlob(key, b.mime, b.data).catch(e => console.error('webpic save', e.message));
    }
    remember(id, b);
    return b;
  })().finally(() => inflight.delete(id));
  inflight.set(id, job);
  return job;
}

// After a start: the teaching pages' pictures read into memory one at a time, so the first visitors do not wait.
// entries: () => [[id, load], …], read when the warming starts.
function warm(list, gap = 150) {
  let i = 0, entries = [];
  const next = () => {
    if (i >= entries.length || memBytes > CACHE_BYTES * 0.9) return;
    const [id, load] = entries[i++];
    get(id, load).catch(() => {}).finally(() => setTimeout(next, gap).unref());
  };
  setTimeout(() => { try { entries = list(); } catch (e) { console.error('webpic warm', e.message); } next(); }, 5000).unref();
}

module.exports = { init, get, warm, optimize };
