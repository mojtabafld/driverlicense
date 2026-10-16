// The main site's colour themes (2026-10-15, Mojtaba: ten named themes to pick from under «ظاهر» in the settings).
// «اقیانوس» is the hand-tuned blue of theme.ts (arcLight / arcDark); every other theme is made from a few numbers:
// the hue of its accent, the hue and amount of tint in its greys, and its accent colours for the dark and light
// theme. The header and intro drawings were drawn in the ocean blues; px() moves each of their blue colours to the
// chosen theme's hue (same lightness), so the pictures follow the theme too. The choice is kept in the browser and,
// like the app's language, a change reloads the page, so colours worked out when the app starts follow it.
import { Platform } from 'react-native';

import { PROVE_PICS } from '@/lib/config';
import { reloadApp } from '@/lib/reload';

export type PaletteId = 'ocean' | 'violet' | 'lime' | 'coral' | 'amber' | 'emerald' | 'forest' | 'rose' | 'sky' | 'mono';
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

// The theme's colours for the light and dark themes (null for «اقیانوس», which keeps theme.ts's own values).
export function paletteColors() {
  if (PALETTE === 'ocean') return null;
  const S = SPEC, NS = S.nsat, n = (l: number, sat = NS * 0.6) => fromHls(S.nhue, l, sat), nl = (l: number) => n(l, NS * 0.5);
  const aD = S.accD, aL = S.accL;
  const dark = {
    bg: n(0.045), surface: n(0.09), surface2: n(0.12), line: n(0.16), text: n(0.96, 0.1 * Math.min(1, NS * 4)), muted: n(0.66, 0.08 * Math.min(1, NS * 4)), faint: n(0.48, 0.08 * Math.min(1, NS * 4)),
    accent: aD, accentText: S.onD, accentSoft: rgba(aD, 0.18), link: S.accD2, forest: aD,
    ok: '#4fd1a5', okSoft: '#0f2a26', bad: '#f2706e', badSoft: '#341620', warn: '#f5b84a', warnSoft: '#30260f', info: '#ffffff',
    note: n(0.12), submit: '#ffffff', checked: rgba(aD, 0.2), cardBorder: n(0.13), hairline: n(0.13),
    glass: n(0.09), glassStrong: n(0.09), glassBorder: n(0.16),
    pick: aD, pickSoft: S.pickSoftD ?? fromHls(S.hue, 0.16, 0.45),
    nav: n(0.12), navFg: n(0.96, 0.1), navOff: n(0.09), navNum: n(0.66, 0.08),
    strong: '#ffffff', strongFg: n(0.06), btn: '#ffffff', btnFg: n(0.06), cta: '#ffffff', ctaFg: n(0.06),
  };
  const light = {
    bg: nl(0.955), surface: '#ffffff', surface2: nl(0.972), line: nl(0.905), text: n(0.05), muted: n(0.38, 0.1 * Math.min(1, NS * 4)), faint: n(0.52, 0.08 * Math.min(1, NS * 4)),
    accent: aL, accentText: S.onL ?? '#ffffff', accentSoft: rgba(aL, 0.12), link: aL, forest: aL,
    ok: '#0f8a68', okSoft: '#e3f4ee', bad: '#cd1526', badSoft: '#fbe9ea', warn: '#b66400', warnSoft: '#fdf1e2', info: '#000000',
    note: nl(0.95), submit: n(0.1), checked: rgba(aL, 0.12), cardBorder: nl(0.905), hairline: nl(0.935),
    glass: '#ffffff', glassStrong: '#ffffff', glassBorder: nl(0.905),
    pick: aL, pickSoft: S.asat === 0 ? '#efefef' : fromHls(S.hue, 0.955, 0.6),
    nav: nl(0.935), navFg: n(0.05), navOff: nl(0.972), navNum: n(0.38, 0.1),
    strong: n(0.1), strongFg: '#ffffff', btn: n(0.1), btnFg: '#ffffff', cta: aL, ctaFg: S.onL ?? '#ffffff',
  };
  return {
    dark: { ...dark, bgGradient: [dark.bg, dark.bg, dark.bg] as readonly [string, string, string] },
    light: { ...light, bgGradient: [light.bg, light.bg, light.bg] as readonly [string, string, string] },
  };
}
// A swatch for the picker: the theme's page and accent in the dark theme.
export const swatch = (s: Spec) => ({ accent: s.accD, accentL: s.accL, bg: s.id === 'ocean' ? '#121524' : fromHls(s.nhue, 0.09, s.nsat * 0.6) });
