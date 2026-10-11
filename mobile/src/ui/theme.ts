// Design tokens of the app: the same colours, radii and fonts as the web site (site/style.css).
import { createContext, useContext } from 'react';
import { Platform } from 'react-native';

import { PROVE_PICS } from '@/lib/config';
import type { ThemeMode, ThemeName } from '@/lib/prefs';
import { DA_REGULAR } from './fonts';

// Two looks; STYLE picks the one in use. «teal» is the app's look until October 2026 (main at ed597e7), kept whole so
// it can come back by setting STYLE = 'teal'. «uber» follows Uber Eats: black and white surfaces, flat cards with soft
// corners, and one accent for buttons and icons: a jade green, bluer than the green of right answers, and a chosen
// answer is marked in black / white rather than in the accent (see `pick`), so nothing reads as «right» but a result.
// «arc» (October 2026) follows Arc (uiarc.dev, its rules in .claude/skills/arc): white page and cards that rest on a
// hairline border with no shadow, neutral greys from Arc's foundation.css, Arc's green accent only where it means
// something (progress, the chosen tab, a link), near-black main buttons, rounder concentric corners and type in two
// weights. Kept whole so it can come back by setting STYLE = 'arc'.
// «rose» (October 2026, the owner's redesign after the Oripova health app): a warm coral / rose glow at the top of every
// page fading down into a soft light grey, frosted glass cards (translucent white on a bright edge, blurred where the
// platform can), white and coral pill buttons, large light numerals, and a bottom menu of round glass buttons held
// together in one pill, the chosen one filled. Its dark theme is the same glow in a deep wine over near-black.
// The main site and the phone app use it; the /app copy keeps «uber».
const STYLE = (PROVE_PICS ? 'uber' : 'rose') as 'teal' | 'uber' | 'arc' | 'rose';

// The app's teal (from its intro and store pictures): a deeper teal for filled buttons so white text reads well,
// the brighter one for links and highlights in dark mode.
const tealLight = {
  bg: '#edf4f4', surface: '#ffffff', surface2: '#f1f7f7', line: '#d4e5e5',
  text: '#22383a', muted: '#5b7375', faint: '#88a0a1',
  accent: '#2e8285', accentText: '#FFFFFF', accentSoft: '#dcefef', link: '#2a7679',
  forest: '#228B22', ok: '#2c7a3f', okSoft: '#e4f2e7', bad: '#c62828', badSoft: '#fdeceb', warn: '#a86400', warnSoft: '#fff3df', info: '#000000',
  note: '#e3eeee', submit: '#2c5525', checked: '#d4e9e9', cardBorder: 'rgba(0,0,0,0.08)', hairline: '#d4e5e5',
  // Older names still used by some screens; on the site's look they are plain surfaces.
  glass: '#ffffff', glassStrong: '#ffffff', glassBorder: '#d4e5e5',
  // A chosen answer in an exam: its border / check box and its tint.
  pick: '#2e8285', pickSoft: '#dcefef',
  // The round previous / next buttons of the glass bar: fill, arrow, and fill when they cannot be used.
  nav: '#2e8285', navFg: '#ffffff', navOff: '#dcefef', navNum: '#2e8285', // navNum: the position between them
  // A solid neutral (the exam tab's start button and size slider): not the pale grey of a disabled control.
  strong: '#2e8285', strongFg: '#ffffff',
  // The main flat button (start exam, sign in, hand in, the dialogs' confirm): `btn` with `btnFg` on it.
  btn: '#2e8285', btnFg: '#ffffff',
  // Page background: a very soft top-to-bottom gradient around bg, with a hint of the teal.
  // The call to action (ArcButton): here the main button's colours.
  cta: '#2e8285', ctaFg: '#ffffff',
  bgGradient: ['#f5fafa', '#edf4f4', '#e1eded'] as readonly [string, string, string],
};
const tealDark: typeof tealLight = {
  bg: '#0f1c1d', surface: '#172a2b', surface2: '#1f3536', line: '#2c4547',
  text: '#e3eeee', muted: '#9bb5b6', faint: '#6f8a8b',
  accent: '#2f8f92', accentText: '#FFFFFF', accentSoft: '#163637', link: '#7ccbcd',
  forest: '#3CA046', ok: '#5cc47a', okSoft: '#15301e', bad: '#f07167', badSoft: '#3a1715', warn: '#f0b24a', warnSoft: '#33260d', info: '#ffffff',
  note: '#1d3233', submit: '#3d7a33', checked: '#244241', cardBorder: 'rgba(255,255,255,0.06)', hairline: '#2c4547',
  glass: '#172a2b', glassStrong: '#172a2b', glassBorder: '#2c4547',
  pick: '#2f8f92', pickSoft: '#163637',
  nav: '#2f8f92', navFg: '#ffffff', navOff: '#163637', navNum: '#7ccbcd',
  strong: '#2f8f92', strongFg: '#ffffff',
  btn: '#2f8f92', btnFg: '#ffffff',
  cta: '#2f8f92', ctaFg: '#ffffff',
  bgGradient: ['#152a2b', '#0f1c1d', '#0a1415'] as readonly [string, string, string],
};
// Uber Eats: near-white page, white cards, near-black text, no tints of colour in the surfaces; one green throughout,
// forest green (the accent, «right» and the chart alike; white text on it), lighter in dark mode on near-black with
// charcoal cards. `pick`: a chosen answer.
const uberLight: typeof tealLight = {
  bg: '#f3f3f3', surface: '#ffffff', surface2: '#f3f3f3', line: '#e2e2e2',
  text: '#141414', muted: '#5e5e5e', faint: '#9b9b9b',
  accent: '#228B22', accentText: '#FFFFFF', accentSoft: '#e6f2e6', link: '#1d7a1d',
  forest: '#228B22', ok: '#228B22', okSoft: '#e6f2e6', bad: '#d43b30', badSoft: '#fdecea', warn: '#b26a00', warnSoft: '#fff4e0', info: '#000000',
  note: '#e8e8e8', submit: '#333333', checked: '#dcefdc', cardBorder: 'rgba(0,0,0,0.06)', hairline: '#e2e2e2',
  glass: '#ffffff', glassStrong: '#ffffff', glassBorder: '#e2e2e2',
  pick: '#141414', pickSoft: '#ececec',
  nav: '#e4e4e4', navFg: '#141414', navOff: '#f0f0f0', navNum: '#5e5e5e',
  strong: '#333333', strongFg: '#ffffff',
  btn: '#222222', btnFg: '#ffffff', // near-black, the light theme's counterpart
  cta: '#222222', ctaFg: '#ffffff',
  bgGradient: ['#f3f3f3', '#f3f3f3', '#f3f3f3'] as readonly [string, string, string],
};
const uberDark: typeof tealLight = {
  bg: '#0c0c0c', surface: '#181818', surface2: '#222222', line: '#2e2e2e',
  text: '#f6f6f6', muted: '#a7a7a7', faint: '#6f6f6f',
  accent: '#3CA046', accentText: '#FFFFFF', accentSoft: '#14261a', link: '#5cbf68',
  forest: '#3CA046', ok: '#3CA046', okSoft: '#16281b', bad: '#f06a5f', badSoft: '#361715', warn: '#f0b24a', warnSoft: '#33260d', info: '#ffffff',
  note: '#242424', submit: '#e6e6e6', checked: '#17301e', cardBorder: 'rgba(255,255,255,0.05)', hairline: '#2e2e2e',
  glass: '#181818', glassStrong: '#181818', glassBorder: '#2e2e2e',
  pick: '#f2f2f2', pickSoft: '#2a2a2a',
  nav: '#3a3a3a', navFg: '#ffffff', navOff: '#262626', navNum: '#a7a7a7',
  strong: '#e6e6e6', strongFg: '#141414',
  btn: '#c4c4c4', btnFg: '#0c0c0c', // soft light grey with black text
  cta: '#c4c4c4', ctaFg: '#0c0c0c',
  bgGradient: ['#0c0c0c', '#0c0c0c', '#0c0c0c'] as readonly [string, string, string],
};
// Arc: the values of foundation.css (oklch greys and status colours as hex), with data-accent="green".
const arcLight: typeof tealLight = {
  bg: '#ffffff', surface: '#ffffff', surface2: '#f8f8f8', line: '#e9e9e9',
  text: '#0b0b0b', muted: '#585858', faint: '#7d7d7d',
  accent: '#0db879', accentText: '#102016', accentSoft: 'rgba(13,184,121,0.13)', link: '#087c54',
  forest: '#0db879', ok: '#007b12', okSoft: '#e5f4e8', bad: '#cd1526', badSoft: '#fbe9ea', warn: '#b66400', warnSoft: '#fdf1e2', info: '#000000',
  note: '#f1f1f1', submit: '#1d1d1d', checked: 'rgba(13,184,121,0.13)', cardBorder: '#e9e9e9', hairline: '#f3f3f3',
  glass: '#ffffff', glassStrong: '#ffffff', glassBorder: '#e9e9e9',
  pick: '#1d1d1d', pickSoft: '#f1f1f1',
  nav: '#f1f1f1', navFg: '#0b0b0b', navOff: '#f8f8f8', navNum: '#585858',
  strong: '#1d1d1d', strongFg: '#ffffff',
  btn: '#1d1d1d', btnFg: '#ffffff',
  // The main site's call to action (home's next lesson, the exam's start: ArcButton): a deep green like the page headers.
  cta: '#1f5a32', ctaFg: '#ffffff',
  bgGradient: ['#ffffff', '#ffffff', '#ffffff'] as readonly [string, string, string],
};
const arcDark: typeof tealLight = {
  bg: '#141414', surface: '#191919', surface2: '#242424', line: '#2b2b2b',
  text: '#f2f2f2', muted: '#b4b4b4', faint: '#8c8c8c',
  accent: '#53dca6', accentText: '#0b1a12', accentSoft: 'rgba(13,184,121,0.2)', link: '#53dca6',
  forest: '#53dca6', ok: '#4cd676', okSoft: '#14281b', bad: '#ff736d', badSoft: '#3a1816', warn: '#ffb90e', warnSoft: '#33270b', info: '#ffffff',
  note: '#242424', submit: '#e8e8e8', checked: 'rgba(13,184,121,0.2)', cardBorder: '#2b2b2b', hairline: '#222222',
  glass: '#191919', glassStrong: '#191919', glassBorder: '#2b2b2b',
  pick: '#e8e8e8', pickSoft: '#2b2b2b',
  nav: '#2b2b2b', navFg: '#f2f2f2', navOff: '#1f1f1f', navNum: '#b4b4b4',
  strong: '#e8e8e8', strongFg: '#141414',
  btn: '#e8e8e8', btnFg: '#141414',
  cta: '#2f7d47', ctaFg: '#ffffff',
  bgGradient: ['#141414', '#141414', '#141414'] as readonly [string, string, string],
};
// Rose: warm near-black ink with rose-tinted greys; the accent a coral (the glow's own colour, a little deeper so white
// reads on it); right answers stay green and wrong ones a crimson set apart from the coral. `surface` is a solid
// near-white for what must hide what lies under it; cards themselves are glass (ui/glass.tsx, `glassFill`).
// top / topInk: the glow's colour at the top of the page and the text on it (page titles, the round head buttons).
const roseLight = {
  bg: '#ecebec', surface: '#fbfafa', surface2: '#f3f0f1', line: 'rgba(60,20,28,0.10)',
  text: '#1f1719', muted: '#6c5f62', faint: '#a1959a', accent: '#e0605b', accentText: '#ffffff', accentSoft: '#fae3e0', link: '#c0433f',
  forest: '#e0605b', ok: '#24935a', okSoft: '#e1f2e8', bad: '#c72a40', badSoft: '#fbe5e8', warn: '#c26a12', warnSoft: '#fcefe0', info: '#000000',
  note: 'rgba(255,255,255,0.5)', submit: '#1f1719', checked: 'rgba(224,96,91,0.13)', cardBorder: 'rgba(255,255,255,0.78)', hairline: 'rgba(60,20,28,0.06)',
  glass: 'rgba(255,255,255,0.58)', glassStrong: 'rgba(255,255,255,0.78)', glassBorder: 'rgba(255,255,255,0.8)',
  pick: '#1f1719', pickSoft: 'rgba(255,255,255,0.7)',
  nav: 'rgba(255,255,255,0.62)', navFg: '#1f1719', navOff: 'rgba(255,255,255,0.35)', navNum: '#6c5f62',
  strong: '#1f1719', strongFg: '#ffffff',
  btn: '#1f1719', btnFg: '#ffffff',
  cta: '#e0605b', ctaFg: '#ffffff',
  bgGradient: ['#c8585d', '#ecebec', '#ebebeb'] as readonly [string, string, string],
  top: '#c8585d', topInk: '#ffffff',
  // The glow, top to bottom (Backdrop), and the warm gradient of a highlighted card (the coral buttons, the score).
  glow: ['#c4545a', '#d27675', '#df9f9c', '#e6c9c9', '#ebe3e4', '#ecebec'] as readonly string[],
  warm: ['#f2a067', '#ec7a62', '#e05e66'] as readonly string[],
  glassFill: 'rgba(255,255,255,0.55)',
};
const roseDark: typeof roseLight = {
  bg: '#141011', surface: '#211a1c', surface2: '#2a2124', line: 'rgba(255,235,238,0.10)',
  text: '#f6eef0', muted: '#bcadb0', faint: '#857679', accent: '#ff7d72', accentText: '#ffffff', accentSoft: '#3d2222', link: '#ff9a90',
  forest: '#ff7d72', ok: '#4fd18a', okSoft: '#17291f', bad: '#ff6b7f', badSoft: '#3b1b22', warn: '#ffb35c', warnSoft: '#35271a', info: '#ffffff',
  note: 'rgba(255,255,255,0.05)', submit: '#f6eef0', checked: 'rgba(255,125,114,0.16)', cardBorder: 'rgba(255,255,255,0.09)', hairline: 'rgba(255,255,255,0.05)',
  glass: 'rgba(255,255,255,0.06)', glassStrong: 'rgba(255,255,255,0.1)', glassBorder: 'rgba(255,255,255,0.1)',
  pick: '#f6eef0', pickSoft: 'rgba(255,255,255,0.1)',
  nav: 'rgba(255,255,255,0.09)', navFg: '#f6eef0', navOff: 'rgba(255,255,255,0.04)', navNum: '#bcadb0',
  strong: '#f6eef0', strongFg: '#1a1416',
  btn: '#f6eef0', btnFg: '#1a1416',
  cta: '#ec6a63', ctaFg: '#ffffff',
  bgGradient: ['#5a2029', '#141011', '#141011'] as readonly [string, string, string],
  top: '#5a2029', topInk: '#ffffff',
  glow: ['#5e212b', '#4a1b23', '#33151a', '#221416', '#171112', '#141011'] as readonly string[],
  warm: ['#e98a5c', '#e3645c', '#cf4a5c'] as readonly string[],
  glassFill: 'rgba(255,255,255,0.055)',
};
// The other looks have no glow: their top is the page's own colour.
const plain = (t: typeof tealLight) => ({ ...t, top: t.bgGradient[0], topInk: t.text, glow: [...t.bgGradient] as readonly string[], warm: [t.accent, t.accent, t.accent] as readonly string[], glassFill: t.surface });
const light = STYLE === 'rose' ? roseLight : plain(STYLE === 'arc' ? arcLight : STYLE === 'uber' ? uberLight : tealLight);
const dark = STYLE === 'rose' ? roseDark : plain(STYLE === 'arc' ? arcDark : STYLE === 'uber' ? uberDark : tealDark);
// UBER: the neutral looks (uber and arc), where main buttons are black / white rather than the accent.
export const UBER = STYLE !== 'teal';
// ARC: the main site's behaviour that came with Arc (fitted home page, Arc's buttons and switches), kept by «rose».
export const ARC = STYLE === 'arc' || STYLE === 'rose';
export const ROSE = STYLE === 'rose';
// forest: the progress chart's green (forest green, a little lighter in the dark theme).
// note: the AI text's panel, a soft neutral fill set apart from the white statement cards.
export type Colors = typeof light;
// The theme in use (light or dark) and the mode it comes from (follow the system by default, or fixed); set by
// ThemeModeProvider in src/ui/theme-mode.tsx.
export const ThemeContext = createContext<{ theme: ThemeName; mode: ThemeMode; setMode: (m: ThemeMode) => void }>({ theme: 'light', mode: 'system', setMode: () => {} });
export const useTheme = () => useContext(ThemeContext);
export const useIsDark = () => useContext(ThemeContext).theme === 'dark';
export const useColors = (): Colors => (useIsDark() ? dark : light);
// teal, as on the site: 10 for cards, 8 for tab groups, 4 for buttons, 12 / 20 on the sign-in card; uber: softer
// corners everywhere (12 for buttons, 14 for cards), like the sample.
// arc: Arc's --radius-control 18 (buttons, fields), --radius-panel 26 (panels, larger cards), --radius-surface 34;
// everyday cards 22 so their small inner parts keep concentric corners.
export const radius = STYLE === 'rose'
  ? { btn: 18, sm: 14, md: 24, lg: 28, field: 18, xl: 34, pill: 999 }
  : STYLE === 'arc'
  ? { btn: 18, sm: 14, md: 22, lg: 26, field: 18, xl: 34, pill: 999 }
  : STYLE === 'uber'
  ? { btn: 12, sm: 10, md: 14, lg: 14, field: 12, xl: 20, pill: 999 }
  : { btn: 4, sm: 8, md: 10, lg: 10, field: 12, xl: 20, pill: 999 };
export const space = (n: number) => n * 4;
// Danish / English text: the Latin font bundled with the app (src/ui/fonts.ts); L picks the weight, this is its regular.
export const DA_FONT = Platform.OS === 'web' ? `${DA_REGULAR}, Vazirmatn-400, Helvetica, sans-serif` : DA_REGULAR;
// Numbers that stand out (the exam's timer and position, in a regular weight): Poppins on the web, the system's font on phones.
export const NUM_FONT = Platform.OS === 'web' ? 'Poppins, Inter-500, system-ui, sans-serif' : undefined;
