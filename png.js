// A minimal PNG reader / writer on node:zlib (no image library on the server), for the intro pictures: halve their
// size and find their background colour, and to put corrected parts on a picture. Reads 8-bit, non-interlaced files
// (RGB / RGBA, what the image model returns; grey and palette ones come out as RGB(A)).
'use strict';
const zlib = require('node:zlib');

const SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const CRC = (() => { const t = new Int32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c; } return t; })();
const crc32 = b => { let c = -1; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };

// { w, h, ch, px } with px = w * h * ch bytes, or null for a file it cannot read.
function decode(buf) {
  if (!buf.subarray(0, 8).equals(SIG)) return null;
  let w = 0, h = 0, ch = 0, color = 0, plte = null, trns = null; const idat = [];
  for (let o = 8; o < buf.length;) {
    const len = buf.readUInt32BE(o), type = buf.toString('ascii', o + 4, o + 8), data = buf.subarray(o + 8, o + 8 + len);
    if (type === 'IHDR') {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4);
      const depth = data[8], interlace = data[12]; color = data[9];
      // 8-bit grey (0), RGB (2), palette (3), grey + alpha (4), RGBA (6)
      if (depth !== 8 || interlace !== 0 || ![0, 2, 3, 4, 6].includes(color)) return null;
      ch = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[color];
    } else if (type === 'PLTE') plte = Buffer.from(data);
    else if (type === 'tRNS') trns = Buffer.from(data);
    else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    o += 12 + len;
  }
  if (!w || !idat.length) return null;
  const raw = zlib.inflateSync(Buffer.concat(idat)), stride = w * ch, px = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)], src = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)), row = y * stride;
    for (let x = 0; x < stride; x++) {
      const a = x >= ch ? px[row + x - ch] : 0, b = y ? px[row - stride + x] : 0, c = x >= ch && y ? px[row - stride + x - ch] : 0;
      let v = src[x];
      if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
      px[row + x] = v & 255;
    }
  }
  if (color === 2 || color === 6) return { w, h, ch, px };
  // Grey and palette pictures as RGB(A).
  const n = w * h, alpha = color === 4 || (color === 3 && trns), out = Buffer.alloc(n * (alpha ? 4 : 3));
  for (let i = 0; i < n; i++) {
    let r, g, b, a = 255;
    if (color === 3) { const k = px[i]; if (!plte || k * 3 + 2 >= plte.length) return null; r = plte[k * 3]; g = plte[k * 3 + 1]; b = plte[k * 3 + 2]; if (trns && k < trns.length) a = trns[k]; }
    else { r = g = b = px[i * ch]; if (color === 4) a = px[i * 2 + 1]; }
    const o = i * (alpha ? 4 : 3); out[o] = r; out[o + 1] = g; out[o + 2] = b; if (alpha) out[o + 3] = a;
  }
  return { w, h, ch: alpha ? 4 : 3, px: out };
}

function chunk(type, data) {
  const out = Buffer.alloc(12 + data.length), td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  out.writeUInt32BE(data.length, 0); td.copy(out, 4); out.writeUInt32BE(crc32(td), 8 + data.length);
  return out;
}
function encode({ w, h, ch, px }) {
  const stride = w * ch, raw = Buffer.alloc(h * (stride + 1));
  for (let y = 0; y < h; y++) {                       // filter "Up" on every row: small and quick
    raw[y * (stride + 1)] = 2;
    for (let x = 0; x < stride; x++) raw[y * (stride + 1) + 1 + x] = (px[y * stride + x] - (y ? px[(y - 1) * stride + x] : 0)) & 255;
  }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = ch === 4 ? 6 : 2;
  return Buffer.concat([SIG, chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

// Halves width and height (each new pixel is the mean of four).
function half({ w, h, ch, px }) {
  const W = w >> 1, H = h >> 1, out = Buffer.alloc(W * H * ch);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) for (let k = 0; k < ch; k++) {
    const i = (2 * y * w + 2 * x) * ch + k;
    out[(y * W + x) * ch + k] = (px[i] + px[i + ch] + px[i + w * ch] + px[i + w * ch + ch] + 2) >> 2;
  }
  return { w: W, h: H, ch, px: out };
}

// The background colour: the median of the pixels along the four edges, as #rrggbb.
function edgeColour({ w, h, ch, px }) {
  const r = [], g = [], b = [];
  const at = (x, y) => { const i = (y * w + x) * ch; r.push(px[i]); g.push(px[i + 1]); b.push(px[i + 2]); };
  for (let x = 0; x < w; x += 4) { at(x, 2); at(x, h - 3); }
  for (let y = 0; y < h; y += 4) { at(2, y); at(w - 3, y); }
  const med = a => a.sort((p, q) => p - q)[a.length >> 1];
  return '#' + [med(r), med(g), med(b)].map(v => v.toString(16).padStart(2, '0')).join('');
}

// The picture with its plain background made see-through (RGBA): starting from the four edges, every pixel joined to
// them that is close to the background colour `bg` (#rrggbb) is taken as background seen through: fully clear when it
// is the background colour, partly clear when a little off it (soft shadows, anti-aliased object edges), its colour
// unmixed from the background so it looks the same over any page of that colour. The objects stay solid.
function cutout({ w, h, ch, px }, bg, near = 16, far = 72) {
  const B = [1, 3, 5].map(i => parseInt(bg.slice(i, i + 2), 16));
  const BL = B[1] - (B[0] + B[2]) / 2;
  const out = Buffer.alloc(w * h * 4), dist = new Float32Array(w * h), seen = new Uint8Array(w * h), queue = new Int32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const o = i * ch;
    // How far from the background: the largest channel difference, plus (three times) the difference in how much the
    // colour leans to the background's hue, so dark objects of another hue (hair, tyres) are not taken for its shade.
    const lean = px[o + 1] - (px[o] + px[o + 2]) / 2;
    dist[i] = Math.max(Math.abs(px[o] - B[0]), Math.abs(px[o + 1] - B[1]), Math.abs(px[o + 2] - B[2])) + 3 * Math.abs(lean - BL);
    out[i * 4] = px[o]; out[i * 4 + 1] = px[o + 1]; out[i * 4 + 2] = px[o + 2]; out[i * 4 + 3] = 255;
  }
  let head = 0, tail = 0;
  const add = i => { if (!seen[i] && dist[i] <= far) { seen[i] = 1; queue[tail++] = i; } };
  for (let x = 0; x < w; x++) { add(x); add((h - 1) * w + x); }
  for (let y = 0; y < h; y++) { add(y * w); add(y * w + w - 1); }
  while (head < tail) {
    const i = queue[head++], x = i % w, y = (i / w) | 0;
    if (x > 0) add(i - 1); if (x < w - 1) add(i + 1); if (y > 0) add(i - w); if (y < h - 1) add(i + w);
  }
  for (let i = 0; i < w * h; i++) {
    if (!seen[i]) continue;
    const a = Math.min(1, Math.max(0, (dist[i] - near) / (far - near)));
    out[i * 4 + 3] = Math.round(a * 255);
    for (let k = 0; k < 3; k++) out[i * 4 + k] = a ? Math.min(255, Math.max(0, Math.round((out[i * 4 + k] - (1 - a) * B[k]) / a))) : B[k];
  }
  return { w, h, ch: 4, px: out };
}

// Scales a picture to w × h (bilinear), with `ch` channels (an alpha channel is added as opaque or dropped).
function resize(im, w, h, ch = im.ch) {
  const out = Buffer.alloc(w * h * ch), sx = im.w / w, sy = im.h / h;
  for (let y = 0; y < h; y++) {
    const fy = Math.min(im.h - 1, Math.max(0, (y + 0.5) * sy - 0.5)), y0 = Math.floor(fy), y1 = Math.min(im.h - 1, y0 + 1), ty = fy - y0;
    for (let x = 0; x < w; x++) {
      const fx = Math.min(im.w - 1, Math.max(0, (x + 0.5) * sx - 0.5)), x0 = Math.floor(fx), x1 = Math.min(im.w - 1, x0 + 1), tx = fx - x0;
      for (let k = 0; k < ch; k++) {
        if (k >= im.ch) { out[(y * w + x) * ch + k] = 255; continue; }
        const p = (yy, xx) => im.px[(yy * im.w + xx) * im.ch + k];
        out[(y * w + x) * ch + k] = Math.round((p(y0, x0) * (1 - tx) + p(y0, x1) * tx) * (1 - ty) + (p(y1, x0) * (1 - tx) + p(y1, x1) * tx) * ty);
      }
    }
  }
  return { w, h, ch, px: out };
}

// `base` with only the parts in `boxes` ([{ x, y, w, h }] as fractions) taken from `top` (scaled to base's size): outside
// the boxes every pixel stays base's. Inside, `top` fades in over a narrow band along the box's edge, so there is no seam.
function composite(base, top, boxes) {
  const t = top.w === base.w && top.h === base.h && top.ch === base.ch ? top : resize(top, base.w, base.h, base.ch);
  const px = Buffer.from(base.px), { w, h, ch } = base;
  for (const b of boxes) {
    const x0 = Math.max(0, Math.floor(b.x * w)), y0 = Math.max(0, Math.floor(b.y * h));
    const x1 = Math.min(w, Math.ceil((b.x + b.w) * w)), y1 = Math.min(h, Math.ceil((b.y + b.h) * h));
    const band = Math.max(3, Math.min(24, Math.round(Math.min(x1 - x0, y1 - y0) * 0.06)));
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      const d = Math.min(x - x0, x1 - 1 - x, y - y0, y1 - 1 - y), a = Math.min(1, (d + 1) / band), i = (y * w + x) * ch;
      for (let k = 0; k < ch; k++) px[i + k] = Math.round(base.px[i + k] * (1 - a) + t.px[i + k] * a);
    }
  }
  return { w, h, ch, px };
}

module.exports = { decode, encode, half, edgeColour, cutout, resize, composite };
