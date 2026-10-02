// Design tokens of the app: the same colours, radii and fonts as the web site (site/style.css).
import { Platform, useColorScheme } from 'react-native';

const light = {
  bg: '#ecf1f5', surface: '#ffffff', surface2: '#f2f5f8', line: '#d9e4ec',
  text: '#263945', muted: '#5f7280', faint: '#8a9aa6',
  accent: '#024776', accentText: '#FFFFFF', accentSoft: '#e3ebf2', link: '#024776',
  ok: '#2c7a3f', okSoft: '#e4f2e7', bad: '#c62828', badSoft: '#fdeceb', warn: '#a86400', warnSoft: '#fff3df',
  submit: '#2c5525', checked: '#d9e4ec', cardBorder: 'rgba(0,0,0,0.08)', hairline: '#d9e4ec',
  // Older names still used by some screens; on the site's look they are plain surfaces.
  glass: '#ffffff', glassStrong: '#ffffff', glassBorder: '#d9e4ec',
};
const dark: typeof light = {
  bg: '#111a22', surface: '#1a2631', surface2: '#22303d', line: '#2f4050',
  text: '#e4ecf2', muted: '#9db0bf', faint: '#71859a',
  accent: '#1f6aa5', accentText: '#FFFFFF', accentSoft: '#1d3346', link: '#8cc3ef',
  ok: '#5cc47a', okSoft: '#15301e', bad: '#f07167', badSoft: '#3a1715', warn: '#f0b24a', warnSoft: '#33260d',
  submit: '#3d7a33', checked: '#2a3d4f', cardBorder: 'rgba(255,255,255,0.06)', hairline: '#2f4050',
  glass: '#1a2631', glassStrong: '#1a2631', glassBorder: '#2f4050',
};
export type Colors = typeof light;
export const useColors = (): Colors => (useColorScheme() === 'dark' ? dark : light);
// As on the site: 10 for cards, 8 for tab groups, 4 for buttons, 12 / 20 on the sign-in card.
export const radius = { btn: 4, sm: 8, md: 10, lg: 10, field: 12, xl: 20, pill: 999 };
export const space = (n: number) => n * 4;
// Danish text uses IBM Plex Sans on the web, like the site.
export const DA_FONT = Platform.OS === 'web' ? "'IBM Plex Sans', Vazirmatn, Verdana, Helvetica, sans-serif" : undefined;
