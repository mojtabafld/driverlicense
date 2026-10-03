// Design tokens of the app: the same colours, radii and fonts as the web site (site/style.css).
import { createContext, useContext } from 'react';
import { Platform } from 'react-native';

import type { ThemeMode, ThemeName } from '@/lib/prefs';

// The app's teal (from its intro and store pictures): a deeper teal for filled buttons so white text reads well,
// the brighter one for links and highlights in dark mode.
const light = {
  bg: '#edf4f4', surface: '#ffffff', surface2: '#f1f7f7', line: '#d4e5e5',
  text: '#22383a', muted: '#5b7375', faint: '#88a0a1',
  accent: '#2e8285', accentText: '#FFFFFF', accentSoft: '#dcefef', link: '#2a7679',
  ok: '#2c7a3f', okSoft: '#e4f2e7', bad: '#c62828', badSoft: '#fdeceb', warn: '#a86400', warnSoft: '#fff3df',
  submit: '#2c5525', checked: '#d4e9e9', cardBorder: 'rgba(0,0,0,0.08)', hairline: '#d4e5e5',
  // Older names still used by some screens; on the site's look they are plain surfaces.
  glass: '#ffffff', glassStrong: '#ffffff', glassBorder: '#d4e5e5',
  // Page background: a very soft top-to-bottom gradient around bg, with a hint of the teal.
  bgGradient: ['#f5fafa', '#edf4f4', '#e1eded'] as readonly [string, string, string],
};
const dark: typeof light = {
  bg: '#0f1c1d', surface: '#172a2b', surface2: '#1f3536', line: '#2c4547',
  text: '#e3eeee', muted: '#9bb5b6', faint: '#6f8a8b',
  accent: '#2f8f92', accentText: '#FFFFFF', accentSoft: '#163637', link: '#7ccbcd',
  ok: '#5cc47a', okSoft: '#15301e', bad: '#f07167', badSoft: '#3a1715', warn: '#f0b24a', warnSoft: '#33260d',
  submit: '#3d7a33', checked: '#244241', cardBorder: 'rgba(255,255,255,0.06)', hairline: '#2c4547',
  glass: '#172a2b', glassStrong: '#172a2b', glassBorder: '#2c4547',
  bgGradient: ['#152a2b', '#0f1c1d', '#0a1415'] as readonly [string, string, string],
};
export type Colors = typeof light;
// The theme in use (light or dark) and the mode it comes from (follow the system by default, or fixed); set by
// ThemeModeProvider in src/ui/theme-mode.tsx.
export const ThemeContext = createContext<{ theme: ThemeName; mode: ThemeMode; setMode: (m: ThemeMode) => void }>({ theme: 'light', mode: 'system', setMode: () => {} });
export const useTheme = () => useContext(ThemeContext);
export const useIsDark = () => useContext(ThemeContext).theme === 'dark';
export const useColors = (): Colors => (useIsDark() ? dark : light);
// As on the site: 10 for cards, 8 for tab groups, 4 for buttons, 12 / 20 on the sign-in card.
export const radius = { btn: 4, sm: 8, md: 10, lg: 10, field: 12, xl: 20, pill: 999 };
export const space = (n: number) => n * 4;
// Danish text uses IBM Plex Sans on the web, like the site.
export const DA_FONT = Platform.OS === 'web' ? "'IBM Plex Sans', Vazirmatn-400, Verdana, Helvetica, sans-serif" : undefined;
