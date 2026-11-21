// (Teoripro: the symbol is also copied to ../expo.icon/Assets/teoripro-symbol.svg, the iPhone's layered icon.)
// Renders the app's icons from symbol.svg (run: NODE_PATH=<playwright> node make-icons.js). An orange background
// (#D97757, Claude's orange, Mojtaba 2026-10-18; a faint fade #DE7F5F → #D16C4B), the white symbol on top.
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const sym = fs.readFileSync(path.join(__dirname, 'symbol.svg'), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const inner = sym.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const BG = '<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#de7f5f"/><stop offset="1" stop-color="#d16c4b"/></linearGradient></defs><rect width="1024" height="1024" fill="url(#bg)"/>';
const svg = (body, { bg = false, scale = 1, mono = false } = {}) => {
  const t = (1 - scale) * 512;
  let b = body; if (mono) b = b.replace(/#d97757/g, '#ffffff');
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
  // The Android notification's small icon: the symbol alone, all white on clear (expo-notifications in app.json).
  ['notification-icon.png', 96, svg(inner, { scale: 0.96, mono: true })],
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
