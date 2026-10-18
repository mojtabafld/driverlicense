// Design tokens of the app: the same colours, radii and fonts as the web site (site/style.css).
import { createContext, useContext } from 'react';
import { Platform } from 'react-native';

import { PROVE_PICS } from '@/lib/config';
import type { ThemeMode, ThemeName } from '@/lib/prefs';
import { DA_REGULAR } from './fonts';
import { paletteColors } from './palette';

// Two looks; STYLE picks the one in use. «teal» is the app's look until October 2026 (main at ed597e7), kept whole so
// it can come back by setting STYLE = 'teal'. «uber» follows Uber Eats: black and white surfaces, flat cards with soft
// corners, and one accent for buttons and icons: a jade green, bluer than the green of right answers, and a chosen
// answer is marked in black / white rather than in the accent (see `pick`), so nothing reads as «right» but a result.
// «arc» (October 2026) follows Arc (uiarc.dev, its rules in .claude/skills/arc): white page and cards that rest on a
// hairline border with no shadow, neutral greys from Arc's foundation.css, Arc's green accent only where it means
// something (progress, the chosen tab, a link), near-black main buttons, rounder concentric corners and type in two
// weights. The main site and the phone app use it; the /app copy keeps «uber».
const STYLE = (PROVE_PICS ? 'uber' : 'arc') as 'teal' | 'uber' | 'arc';

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
// (Main site, 2026-10-15: accent, links, icons and the chart in the reference's button green #1f6f5c; in the dark theme its
// lighter sage #6fb09b.)
const arcLight: typeof tealLight = {
  // (2026-10-15, Mojtaba: the light theme in the dark theme's blues: a cool grey page, white cards, blue accent and ticks,
  // navy main buttons and a soft blue on the chosen row.)
  bg: '#f3f4f8', surface: '#ffffff', surface2: '#f5f6fa', line: '#e5e8f0',
  text: '#0b0d18', muted: '#565c73', faint: '#7a8098',
  accent: '#2f55d4', accentText: '#ffffff', accentSoft: 'rgba(47,85,212,0.12)', link: '#2f55d4',
  forest: '#2f55d4', ok: '#0f8a68', okSoft: '#e3f4ee', bad: '#cd1526', badSoft: '#fbe9ea', warn: '#b66400', warnSoft: '#fdf1e2', info: '#000000',
  note: '#e9eefc', submit: '#121a3a', checked: 'rgba(47,85,212,0.12)', cardBorder: '#e5e8f0', hairline: '#eef0f6',
  glass: '#ffffff', glassStrong: '#ffffff', glassBorder: '#e5e8f0',
  pick: '#3e6bf0', pickSoft: '#edf1fe',
  nav: '#eef0f6', navFg: '#0b0d18', navOff: '#f5f6fa', navNum: '#565c73',
  strong: '#121a3a', strongFg: '#ffffff',
  btn: '#121a3a', btnFg: '#ffffff',
  // The main site's call to action (home's next lesson, the exam's start: ArcButton).
  cta: '#2f55d4', ctaFg: '#ffffff',
  bgGradient: ['#f3f4f8', '#f3f4f8', '#f3f4f8'] as readonly [string, string, string],
};
// (2026-10-15, Mojtaba: the dark theme after a coaching app's screens: a blue-black page, navy cards with thin
// lines, a blue accent for ticks and links, a navy highlight on the chosen row and white main buttons.)
const arcDark: typeof tealLight = {
  bg: '#07080f', surface: '#121524', surface2: '#1a1e31', line: '#232840',
  text: '#f3f4f8', muted: '#9a9fb8', faint: '#6e7491',
  accent: '#4a73f5', accentText: '#ffffff', accentSoft: 'rgba(74,115,245,0.18)', link: '#8ea8ff',
  forest: '#5b82ff', ok: '#4fd1a5', okSoft: '#0f2a26', bad: '#f2706e', badSoft: '#341620', warn: '#f5b84a', warnSoft: '#30260f', info: '#ffffff',
  note: '#1a1e31', submit: '#ffffff', checked: 'rgba(74,115,245,0.2)', cardBorder: '#1c2136', hairline: '#1c2136',
  glass: '#121524', glassStrong: '#121524', glassBorder: '#232840',
  pick: '#3e6bf0', pickSoft: '#15204a',
  nav: '#1a1e31', navFg: '#f3f4f8', navOff: '#121524', navNum: '#9a9fb8',
  strong: '#ffffff', strongFg: '#0b0d18',
  btn: '#ffffff', btnFg: '#0b0d18',
  cta: '#ffffff', ctaFg: '#0b0d18',
  bgGradient: ['#07080f', '#07080f', '#07080f'] as readonly [string, string, string],
};
// The main site's chosen colour theme (ui/palette.ts) replaces arc's own ocean colours.
const PAL = STYLE === 'arc' ? paletteColors() : null;
const light: typeof tealLight = STYLE === 'arc' ? (PAL?.light ?? arcLight) : STYLE === 'uber' ? uberLight : tealLight;
const dark: typeof tealLight = STYLE === 'arc' ? (PAL?.dark ?? arcDark) : STYLE === 'uber' ? uberDark : tealDark;
// UBER: the neutral looks (uber and arc), where main buttons are black / white rather than the accent.
export const UBER = STYLE !== 'teal';
export const ARC = STYLE === 'arc';
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
export const radius = STYLE === 'arc'
  ? { btn: 18, sm: 14, md: 22, lg: 26, field: 18, xl: 34, pill: 999 }
  : STYLE === 'uber'
  ? { btn: 12, sm: 10, md: 14, lg: 14, field: 12, xl: 20, pill: 999 }
  : { btn: 4, sm: 8, md: 10, lg: 10, field: 12, xl: 20, pill: 999 };
export const space = (n: number) => n * 4;
// Danish / English text: the Latin font bundled with the app (src/ui/fonts.ts); L picks the weight, this is its regular.
export const DA_FONT = Platform.OS === 'web' ? `${DA_REGULAR}, Vazirmatn-400, Helvetica, sans-serif` : DA_REGULAR;
// Numbers that stand out (the exam's timer and position, in a regular weight): Poppins on the web, the system's font on phones.
export const NUM_FONT = Platform.OS === 'web' ? 'Poppins, Inter-500, system-ui, sans-serif' : undefined;
