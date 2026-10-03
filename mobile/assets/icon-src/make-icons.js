// Renders the app's icons from symbol.svg (run: NODE_PATH=<playwright> node make-icons.js). Teal background as the
// app's theme (#3a9a9d → #2a7679), the white symbol on top.
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const sym = fs.readFileSync(path.join(__dirname, 'symbol.svg'), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const inner = sym.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const BG = '<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#43a6a8"/><stop offset="1" stop-color="#25696c"/></linearGradient></defs><rect width="1024" height="1024" fill="url(#bg)"/>';
const svg = (body, { bg = false, scale = 1, mono = false } = {}) => {
  const t = (1 - scale) * 512;
  let b = body; if (mono) b = b.replace(/#ff9d7e|#2e8285/g, '#ffffff');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">${bg ? BG : ''}<g transform="translate(${t} ${t}) scale(${scale})">${b}</g></svg>`;
};
const out = path.join(__dirname, '..', 'images');
const pub = path.join(__dirname, '..', '..', 'public');
const jobs = [
  ['icon.png', 1024, svg(inner, { bg: true, scale: 0.86 })],
  ['android-icon-foreground.png', 512, svg(inner, { scale: 0.62 })],
  ['android-icon-background.png', 512, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">${BG}</svg>`],
  ['android-icon-monochrome.png', 432, svg(inner, { scale: 0.62, mono: true })],
  ['favicon.png', 48, svg(inner, { bg: true, scale: 0.92 })],
  // Home-screen icons for the web app (iOS «Add to Home Screen», Android / the manifest): the full square icon.
  [path.join(pub, 'apple-touch-icon.png'), 180, svg(inner, { bg: true, scale: 0.86 })],
  [path.join(pub, 'icon-192.png'), 192, svg(inner, { bg: true, scale: 0.86 })],
  [path.join(pub, 'icon-512.png'), 512, svg(inner, { bg: true, scale: 0.86 })],
  [path.join(pub, 'icon-maskable-512.png'), 512, svg(inner, { bg: true, scale: 0.7 })],
  // The splash: the icon itself as a rounded tile.
  ['splash-icon.png', 512, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><clipPath id="r"><rect x="112" y="112" width="800" height="800" rx="190"/></clipPath><g clip-path="url(#r)">${svg(inner, { bg: true, scale: 0.86 }).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g></svg>`],
];
(async () => {
  const b = await chromium.launch();
  for (const [name, size, s] of jobs) {
    const p = await b.newPage({ viewport: { width: size, height: size } });
    await p.setContent(`<html><body style="margin:0;background:transparent">${s.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`);
    await p.screenshot({ path: path.isAbsolute(name) ? name : path.join(out, name), omitBackground: true });
    await p.close();
  }
  await b.close();
})();
