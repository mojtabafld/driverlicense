// The teaching pictures (/guide-art/<key>.png) as the app downloads them, made off the main thread (worker_threads):
// the made pictures are 1184 × 888 PNGs of about half a megabyte, so the app gets them as JPEG at three sizes,
// l (full, for the item's page and its zoom), m (half, the groups' cards) and s (a quarter, the lists' thumbnails),
// about a tenth of the bytes. A sign's plain light grey background is turned white first (see whiten). A picture with
// see-through parts (an official drawing) stays PNG, only made smaller; anything that is not a PNG passes unchanged.
// convert() runs in the worker; the main thread's side is in guideref.js (webBlob).
'use strict';
const { parentPort, isMainThread } = require('node:worker_threads');
const png = require('./png');
const jpeg = require('jpeg-js');

const QUALITY = { l: 84, m: 82, s: 80 };

// A sign's made picture with its plain light grey background turned white (a levels step against the picture's edge
// colour, so the sign's own colours only lighten a touch), as it looks on the dark theme's cards.
function whiten(im) {
  const hex = png.edgeColour(im), bg = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)), ch = im.ch, px = im.px;
  // Only a light, nearly grey background is whitened (a marking's road scene or a dark edge is left alone).
  if (!(bg.every(x => x >= 215) && Math.max(...bg) - Math.min(...bg) <= 18)) return;
  const k = bg.map(x => 255 / x);
  for (let i = 0; i < px.length; i += ch) for (let j = 0; j < 3; j++) px[i + j] = Math.min(255, Math.round(px[i + j] * k[j]));
}

const opaque = im => { if (im.ch !== 4) return true; for (let i = 3; i < im.px.length; i += 4) if (im.px[i] !== 255) return false; return true; };
function toJpeg(im, q) {
  const rgba = Buffer.alloc(im.w * im.h * 4);
  for (let i = 0, j = 0; i < im.px.length; i += im.ch, j += 4) { rgba[j] = im.px[i]; rgba[j + 1] = im.px[i + 1]; rgba[j + 2] = im.px[i + 2]; rgba[j + 3] = 255; }
  return jpeg.encode({ data: rgba, width: im.w, height: im.h }, q).data;
}

// { l, m, s } = { mime, data } each, or null when the picture is to be served as it is.
function convert(buf, mime, white) {
  if (mime !== 'image/png') return null;
  const im = png.decode(buf);
  if (!im || im.ch < 3) return null;
  if (white) whiten(im);
  const asJpeg = opaque(im), out = {};
  let cur = im;
  for (const size of ['l', 'm', 's']) {
    if (size !== 'l' && cur.w >= 200) cur = png.half(cur);
    out[size] = asJpeg ? { mime: 'image/jpeg', data: toJpeg(cur, QUALITY[size]) } : { mime: 'image/png', data: png.encode(cur) };
  }
  return out;
}

if (!isMainThread && parentPort) {
  parentPort.on('message', ({ id, data, mime, white }) => {
    try {
      const out = convert(Buffer.from(data), mime, white);
      parentPort.postMessage({ id, out });
    } catch (e) { parentPort.postMessage({ id, error: e.message }); }
  });
}

module.exports = { convert };
