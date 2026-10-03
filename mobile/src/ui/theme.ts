// Design tokens of the app: the same colours, radii and fonts as the web site (site/style.css).
import { createContext, useContext } from 'react';
import { Platform } from 'react-native';

import type { ThemeMode, ThemeName } from '@/lib/prefs';

// Two looks; STYLE picks the one in use. «teal» is the app's look until October 2026 (main at ed597e7), kept whole so
// it can come back by setting STYLE = 'teal'. «uber» follows Uber Eats: black and white surfaces, flat cards with soft
// corners, and one accent for buttons and icons: a jade green, bluer than the green of right answers, and a chosen
// answer is marked in black / white rather than in the accent (see `pick`), so nothing reads as «right» but a result.
const STYLE: 'teal' | 'uber' = 'uber';

// The app's teal (from its intro and store pictures): a deeper teal for filled buttons so white text reads well,
// the brighter one for links and highlights in dark mode.
const tealLight = {
  bg: '#edf4f4', surface: '#ffffff', surface2: '#f1f7f7', line: '#d4e5e5',
  text: '#22383a', muted: '#5b7375', faint: '#88a0a1',
  accent: '#2e8285', accentText: '#FFFFFF', accentSoft: '#dcefef', link: '#2a7679',
  ok: '#2c7a3f', okSoft: '#e4f2e7', bad: '#c62828', badSoft: '#fdeceb', warn: '#a86400', warnSoft: '#fff3df',
  submit: '#2c5525', checked: '#d4e9e9', cardBorder: 'rgba(0,0,0,0.08)', hairline: '#d4e5e5',
  // Older names still used by some screens; on the site's look they are plain surfaces.
  glass: '#ffffff', glassStrong: '#ffffff', glassBorder: '#d4e5e5',
  // A chosen answer in an exam: its border / check box and its tint.
  pick: '#2e8285', pickSoft: '#dcefef',
  // The round previous / next buttons of the glass bar: fill, arrow, and fill when they cannot be used.
  nav: '#2e8285', navFg: '#ffffff', navOff: '#dcefef',
  // Page background: a very soft top-to-bottom gradient around bg, with a hint of the teal.
  bgGradient: ['#f5fafa', '#edf4f4', '#e1eded'] as readonly [string, string, string],
};
const tealDark: typeof tealLight = {
  bg: '#0f1c1d', surface: '#172a2b', surface2: '#1f3536', line: '#2c4547',
  text: '#e3eeee', muted: '#9bb5b6', faint: '#6f8a8b',
  accent: '#2f8f92', accentText: '#FFFFFF', accentSoft: '#163637', link: '#7ccbcd',
  ok: '#5cc47a', okSoft: '#15301e', bad: '#f07167', badSoft: '#3a1715', warn: '#f0b24a', warnSoft: '#33260d',
  submit: '#3d7a33', checked: '#244241', cardBorder: 'rgba(255,255,255,0.06)', hairline: '#2c4547',
  glass: '#172a2b', glassStrong: '#172a2b', glassBorder: '#2c4547',
  pick: '#2f8f92', pickSoft: '#163637',
  nav: '#2f8f92', navFg: '#ffffff', navOff: '#163637',
  bgGradient: ['#152a2b', '#0f1c1d', '#0a1415'] as readonly [string, string, string],
};
// Uber Eats: near-white page, white cards, near-black text, no tints of colour in the surfaces; the accent is a jade
// green (white text on it), lighter in dark mode on near-black with charcoal cards. `pick`: a chosen answer.
const uberLight: typeof tealLight = {
  bg: '#f3f3f3', surface: '#ffffff', surface2: '#f3f3f3', line: '#e2e2e2',
  text: '#141414', muted: '#5e5e5e', faint: '#9b9b9b',
  accent: '#0d8a73', accentText: '#FFFFFF', accentSoft: '#e3f3ef', link: '#0b7563',
  ok: '#23803f', okSoft: '#e6f4ea', bad: '#d43b30', badSoft: '#fdecea', warn: '#b26a00', warnSoft: '#fff4e0',
  submit: '#0d8a73', checked: '#ddf0eb', cardBorder: 'rgba(0,0,0,0.06)', hairline: '#e2e2e2',
  glass: '#ffffff', glassStrong: '#ffffff', glassBorder: '#e2e2e2',
  pick: '#141414', pickSoft: '#ececec',
  nav: '#e4e4e4', navFg: '#141414', navOff: '#f0f0f0',
  bgGradient: ['#f3f3f3', '#f3f3f3', '#f3f3f3'] as readonly [string, string, string],
};
const uberDark: typeof tealLight = {
  bg: '#0c0c0c', surface: '#181818', surface2: '#222222', line: '#2e2e2e',
  text: '#f6f6f6', muted: '#a7a7a7', faint: '#6f6f6f',
  accent: '#1fa489', accentText: '#FFFFFF', accentSoft: '#11292a', link: '#4fd1b4',
  ok: '#5fc179', okSoft: '#16281b', bad: '#f06a5f', badSoft: '#361715', warn: '#f0b24a', warnSoft: '#33260d',
  submit: '#1fa489', checked: '#163230', cardBorder: 'rgba(255,255,255,0.05)', hairline: '#2e2e2e',
  glass: '#181818', glassStrong: '#181818', glassBorder: '#2e2e2e',
  pick: '#f2f2f2', pickSoft: '#2a2a2a',
  nav: '#3a3a3a', navFg: '#ffffff', navOff: '#262626',
  bgGradient: ['#0c0c0c', '#0c0c0c', '#0c0c0c'] as readonly [string, string, string],
};
const light = STYLE === 'uber' ? uberLight : tealLight;
const dark = STYLE === 'uber' ? uberDark : tealDark;
export const UBER = STYLE === 'uber';
export type Colors = typeof light;
// The theme in use (light or dark) and the mode it comes from (follow the system by default, or fixed); set by
// ThemeModeProvider in src/ui/theme-mode.tsx.
export const ThemeContext = createContext<{ theme: ThemeName; mode: ThemeMode; setMode: (m: ThemeMode) => void }>({ theme: 'light', mode: 'system', setMode: () => {} });
export const useTheme = () => useContext(ThemeContext);
export const useIsDark = () => useContext(ThemeContext).theme === 'dark';
export const useColors = (): Colors => (useIsDark() ? dark : light);
// teal, as on the site: 10 for cards, 8 for tab groups, 4 for buttons, 12 / 20 on the sign-in card; uber: softer
// corners everywhere (12 for buttons, 14 for cards), like the sample.
export const radius = STYLE === 'uber'
  ? { btn: 12, sm: 10, md: 14, lg: 14, field: 12, xl: 20, pill: 999 }
  : { btn: 4, sm: 8, md: 10, lg: 10, field: 12, xl: 20, pill: 999 };
export const space = (n: number) => n * 4;
// Danish text uses IBM Plex Sans on the web, like the site.
export const DA_FONT = Platform.OS === 'web' ? "'IBM Plex Sans', Vazirmatn-400, Verdana, Helvetica, sans-serif" : undefined;
// Numbers that stand out (the exam's timer and position, in a regular weight): Poppins on the web, the system's font on phones.
export const NUM_FONT = Platform.OS === 'web' ? "Poppins, 'IBM Plex Sans', system-ui, sans-serif" : undefined;
