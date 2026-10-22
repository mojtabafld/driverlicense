// The main site's colour themes (2026-10-15, Mojtaba: ten named themes to pick from under «ظاهر» in the settings; five
// more on 2026-10-18, fifteen in all: three full rows of the picker).
// «اقیانوس» is the hand-tuned blue of theme.ts (arcLight / arcDark); every other theme is made from a few numbers:
// the hue of its accent, the hue and amount of tint in its greys, and its accent colours for the dark and light
// theme. The header and intro drawings were drawn in the ocean blues; px() moves each of their blue colours to the
// chosen theme's hue (same lightness), so the pictures follow the theme too. The choice is kept in the browser and,
// like the app's language, a change reloads the page, so colours worked out when the app starts follow it.
import { Platform } from 'react-native';

import { PROVE_PICS } from '@/lib/config';
import { reloadApp } from '@/lib/reload';

export type PaletteId = 'ocean' | 'violet' | 'lime' | 'coral' | 'amber' | 'emerald' | 'forest' | 'rose' | 'sky' | 'mono'
  | 'teal' | 'indigo' | 'orchid' | 'gold' | 'slate';
type Spec = {
  id: PaletteId; name: string;
  hue: number; nhue: number; nsat: number; asat?: number;
  accD: string; accD2: string; onD: string; accL: string; onL?: string; pickSoftD?: string;
};
// name: Persian (translated through strings.json like every other text).
export const PALETTES: Spec[] = [
  { id: 'ocean', name: 'اقیانوس', hue: 226, nhue: 226, nsat: 1, accD: '#3e6bf0', accD2: '#8ea8ff', onD: '#ffffff', accL: '#2f55d4' },
  { id: 'violet', name: 'بنفش شب', hue: 262, nhue: 255, nsat: 0.55, accD: '#8b6cff', accD2: '#b5a3ff', onD: '#ffffff', accL: '#6a45e8' },
  { id: 'sky', name: 'آسمان', hue: 200, nhue: 210, nsat: 0.25, accD: '#38bdf8', accD2: '#7dd3fc', onD: '#04202e', accL: '#0284c7' },
  { id: 'emerald', name: 'زمرد', hue: 155, nhue: 165, nsat: 0.1, accD: '#34d399', accD2: '#6ee7b7', onD: '#04261a', accL: '#059669', pickSoftD: '#0e2a21' },
  { id: 'forest', name: 'جنگل', hue: 166, nhue: 166, nsat: 0.18, accD: '#6fb09b', accD2: '#8fcab6', onD: '#0b1a16', accL: '#1f6f5c', pickSoftD: '#14302a' },
  { id: 'lime', name: 'لیمو', hue: 78, nhue: 78, nsat: 0.08, accD: '#c6f24e', accD2: '#d4f57a', onD: '#121410', accL: '#4d7c0f', pickSoftD: '#1f2a10' },
  { id: 'amber', name: 'کهربا', hue: 36, nhue: 30, nsat: 0.12, accD: '#f5a524', accD2: '#f7bd5e', onD: '#1a1206', accL: '#b8650a', pickSoftD: '#2c210e' },
  { id: 'coral', name: 'مرجان', hue: 12, nhue: 20, nsat: 0.05, accD: '#ff6b4d', accD2: '#ff9a85', onD: '#ffffff', accL: '#e5502f', pickSoftD: '#2e1712' },
  { id: 'rose', name: 'گلبهی', hue: 340, nhue: 340, nsat: 0.12, accD: '#ff5c8a', accD2: '#ff8fae', onD: '#ffffff', accL: '#d6336c', pickSoftD: '#2e1420' },
  { id: 'teal', name: 'فیروزه‌ای', hue: 176, nhue: 180, nsat: 0.14, accD: '#2dd4bf', accD2: '#5eead4', onD: '#042f2a', accL: '#0f766e', pickSoftD: '#0f2b28' },
  { id: 'indigo', name: 'نیلی', hue: 239, nhue: 236, nsat: 0.45, accD: '#818cf8', accD2: '#a5b4fc', onD: '#0d1033', accL: '#4338ca', pickSoftD: '#1b1d40' },
  { id: 'orchid', name: 'بنفش یاسی', hue: 284, nhue: 280, nsat: 0.3, accD: '#c084fc', accD2: '#d8b4fe', onD: '#1e0b2e', accL: '#9333ea', pickSoftD: '#2a1838' },
  { id: 'gold', name: 'طلایی', hue: 46, nhue: 42, nsat: 0.12, accD: '#facc15', accD2: '#fde047', onD: '#1a1500', accL: '#a16207', pickSoftD: '#2b250c' },
  { id: 'slate', name: 'سنگی', hue: 215, nhue: 215, nsat: 0.3, asat: 0.35, accD: '#a3b3c8', accD2: '#cbd5e1', onD: '#0f172a', accL: '#475569', pickSoftD: '#1e2632' },
  { id: 'mono', name: 'سیاه و سفید', hue: 226, nhue: 226, nsat: 0, asat: 0, accD: '#f2f2f2', accD2: '#d0d0d0', onD: '#111111', accL: '#151515', pickSoftD: '#262626' },
];
// KEY: the theme picked on this device (kept, whatever the default becomes). Until one is picked, the server's default
// (DEFAULT_THEME on the server, «آسمان» unless set): on the web written into the page (window.__TP_THEME), on a phone
// the one /api/config named last time (DEFAULT_KEY; a change there shows from the next start, with no new app build).
const KEY = 'tp.palette', DEFAULT_KEY = 'tp.paletteDefault';
const valid = (v: unknown): v is PaletteId => PALETTES.some(p => p.id === v);
const web = Platform.OS === 'web';
function read(k: string): string | null {
  try { return web ? localStorage.getItem(k) : require('expo-secure-store').getItem(k); } catch { return null; }
}
function write(k: string, v: string) {
  try { if (web) localStorage.setItem(k, v); else require('expo-secure-store').setItem(k, v); } catch {}
}
function initial(): PaletteId {
  if (PROVE_PICS) return 'ocean';
  const picked = read(KEY); if (valid(picked)) return picked;
  const def = web ? (typeof window !== 'undefined' ? (window as any).__TP_THEME : null) : read(DEFAULT_KEY);
  return valid(def) ? def : 'sky';
}
// The default /api/config names, kept on a phone. With no theme picked on the phone and a default other than the one
// in use (a phone's first start shows «آسمان» before it has asked), the app reloads in it.
export function rememberDefault(id: unknown) {
  if (web || PROVE_PICS || !valid(id)) return;
  write(DEFAULT_KEY, id);
  if (!valid(read(KEY)) && id !== PALETTE) reloadApp();
}
export const PALETTE: PaletteId = initial();
const SPEC = PALETTES.find(p => p.id === PALETTE)!;

// Keep the theme and, when it changes, start the app again in it (lib/reload.ts).
export function setPalette(id: PaletteId) {
  if (PROVE_PICS || !valid(id)) return;
  write(KEY, id);
  if (id !== PALETTE) reloadApp();
}

// Keeps the theme for the next start without reloading (an account's own theme, on signing in); whether it differs
// from the one in use.
export function keepPalette(id: unknown): boolean {
  if (PROVE_PICS || !valid(id)) return false;
  write(KEY, id);
  return id !== PALETTE;
}
// Signing out: the device goes back to the server's default theme (DEFAULT_THEME); whether that differs from the one in use.
export function forgetPalette(): boolean {
  if (PROVE_PICS) return false;
  try { if (web) localStorage.removeItem(KEY); else require('expo-secure-store').deleteItemAsync(KEY).catch(() => {}); } catch {}
  const def = web ? (typeof window !== 'undefined' ? (window as any).__TP_THEME : null) : read(DEFAULT_KEY);
  return (valid(def) ? def : 'sky') !== PALETTE;
}

// Colour arithmetic (HSL), as Python's colorsys.
type RGB = [number, number, number];
const parse = (hex: string): RGB => {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255) as RGB;
};
const toHex = (c: RGB) => '#' + c.map(v => Math.max(0, Math.min(255, Math.round(v * 255))).toString(16).padStart(2, '0')).join('');
function toHls([r, g, b]: RGB): [number, number, number] {
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  if (max === min) return [0, l, 0];
  const d = max - min, s = l <= 0.5 ? d / (max + min) : d / (2 - max - min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, l, s];
}
function fromHls(h: number, l: number, s: number): string {
  if (s === 0) return toHex([l, l, l]);
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q, k = h / 360;
  const f = (t: number) => { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
  return toHex([f(k + 1 / 3), f(k), f(k - 1 / 3)]);
}
const rgba = (hex: string, a: number) => `rgba(${parse(hex).map(v => Math.round(v * 255)).join(',')},${a})`;

// A drawing's ocean colour in the chosen theme: blues move to the theme's hue (its strong blues to the accent hue,
// the soft and dark ones to the tint of its greys); other colours stay.
const SPECIAL: Record<string, string> = { '#2f55d4': SPEC.accL, '#3e6bf0': SPEC.accL, '#8ea8ff': SPEC.accD2, '#9db3ff': SPEC.accD2 };
export function px(hex: string): string {
  if (PALETTE === 'ocean') return hex;
  const k = hex.toLowerCase();
  if (SPECIAL[k]) return SPECIAL[k];
  const [h, l, s] = toHls(parse(hex));
  if (!(h >= 200 && h <= 240 && s > 0.12)) return hex;
  if (s > 0.45 && l > 0.3 && l < 0.8) return fromHls(SPEC.hue, l, Math.min(1, s * (SPEC.asat ?? 1)));
  return fromHls(SPEC.nhue, l, Math.min(1, s * SPEC.nsat));
}
// The same for an rgba() of an ocean colour.
export const pxa = (hex: string, a: number) => rgba(px(hex), a);

// The theme's colours for the light and dark themes. (2026-10-22, Mojtaba, after a green planner app's screens: the
// chosen colour tints the whole page, not only its accent. Light: a soft pale wash of the hue that fades to near white
// down the page, near-white cards with a hint of it, text, titles and main buttons in a deep shade of the hue, the chosen
// row in a pale tint. Dark: the same turned over: a deep wash of the hue, cards a step lighter, and pale buttons of the
// hue with deep text on them.) t: how much colour the greys take (none for «سیاه و سفید»).
export function paletteColors() {
  const S = SPEC, H = S.hue, t = S.asat ?? 1, h = (l: number, s: number) => fromHls(H, l, Math.min(1, s * t));
  const aD = S.accD, mono = t === 0;
  const deep = mono ? '#151515' : h(0.13, 0.72), ink = mono ? '#111111' : h(0.1, 0.55), mid = mono ? '#151515' : h(0.24, 0.75);
  const dTop = h(0.13, 0.42), dMid = h(0.075, 0.38), dBot = fromHls(S.nhue, 0.045, Math.min(1, 0.3 * t));
  const dark = {
    bg: dMid, surface: h(0.12, 0.3), surface2: h(0.155, 0.28), line: h(0.2, 0.24), text: h(0.95, 0.35), muted: h(0.7, 0.16), faint: h(0.52, 0.12),
    accent: aD, accentText: S.onD, accentSoft: rgba(aD, 0.18), link: S.accD2, forest: aD,
    ok: '#4fd1a5', okSoft: '#0f2a26', bad: '#f2706e', badSoft: '#341620', warn: '#f5b84a', warnSoft: '#30260f', info: '#ffffff',
    note: h(0.155, 0.28), submit: h(0.88, 0.55), checked: rgba(aD, 0.2), cardBorder: h(0.17, 0.26), hairline: h(0.16, 0.26),
    glass: h(0.12, 0.3), glassStrong: h(0.12, 0.3), glassBorder: h(0.2, 0.24),
    pick: aD, pickSoft: S.pickSoftD ?? h(0.18, 0.45),
    nav: h(0.16, 0.28), navFg: h(0.95, 0.35), navOff: h(0.12, 0.3), navNum: h(0.7, 0.16),
    strong: h(0.88, 0.55), strongFg: deep, btn: h(0.88, 0.55), btnFg: deep, cta: h(0.88, 0.55), ctaFg: deep,
  };
  const lTop = h(0.895, 0.55), lMid = h(0.93, 0.42), lBot = fromHls(S.nhue, 0.96, Math.min(1, 0.18 * t));
  const light = {
    bg: lMid, surface: h(0.988, 0.5), surface2: h(0.955, 0.36), line: h(0.88, 0.26), text: ink, muted: h(0.36, 0.2), faint: h(0.52, 0.13),
    accent: mid, accentText: '#ffffff', accentSoft: rgba(deep, 0.08), link: mid, forest: deep,
    ok: '#0f8a68', okSoft: '#e3f4ee', bad: '#cd1526', badSoft: '#fbe9ea', warn: '#b66400', warnSoft: '#fdf1e2', info: '#000000',
    note: h(0.93, 0.3), submit: deep, checked: rgba(deep, 0.1), cardBorder: h(0.9, 0.28), hairline: h(0.925, 0.28),
    glass: h(0.988, 0.5), glassStrong: h(0.988, 0.5), glassBorder: h(0.9, 0.28),
    pick: deep, pickSoft: mono ? '#efefef' : h(0.91, 0.45),
    nav: h(0.92, 0.32), navFg: ink, navOff: h(0.955, 0.36), navNum: h(0.36, 0.2),
    strong: deep, strongFg: '#ffffff', btn: deep, btnFg: '#ffffff', cta: deep, ctaFg: '#ffffff',
  };
  return {
    dark: { ...dark, bgGradient: [dTop, dMid, dBot] as readonly [string, string, string] },
    light: { ...light, bgGradient: [lTop, lMid, lBot] as readonly [string, string, string] },
  };
}
// A swatch for the picker: the theme's page (dark and light) and accent.
export const swatch = (s: Spec) => ({ accent: s.accD, accentL: s.accL, bg: fromHls(s.hue, 0.1, 0.4 * (s.asat ?? 1)), bgL: fromHls(s.hue, 0.93, 0.5 * (s.asat ?? 1)) });
