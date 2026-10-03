// A minimal PNG reader / writer on node:zlib (no image library on the server), for the intro pictures: halve their
// size and find their background colour. Reads 8-bit, non-interlaced RGB / RGBA files (what the image model returns).
'use strict';
const zlib = require('node:zlib');

const SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const CRC = (() => { const t = new Int32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c; } return t; })();
const crc32 = b => { let c = -1; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };

// { w, h, ch, px } with px = w * h * ch bytes, or null for a file it cannot read.
function decode(buf) {
  if (!buf.subarray(0, 8).equals(SIG)) return null;
  let w = 0, h = 0, ch = 0; const idat = [];
  for (let o = 8; o < buf.length;) {
    const len = buf.readUInt32BE(o), type = buf.toString('ascii', o + 4, o + 8), data = buf.subarray(o + 8, o + 8 + len);
    if (type === 'IHDR') {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4);
      const depth = data[8], color = data[9], interlace = data[12];
      if (depth !== 8 || interlace !== 0 || (color !== 2 && color !== 6)) return null;
      ch = color === 6 ? 4 : 3;
    } else if (type === 'IDAT') idat.push(data);
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
  return { w, h, ch, px };
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

module.exports = { decode, encode, half, edgeColour };
