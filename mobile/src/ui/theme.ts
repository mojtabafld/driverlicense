// Design tokens of the app (Liquid Glass look): soft colourful backdrop, translucent glass surfaces, large radii.
import { useColorScheme } from 'react-native';

const light = {
  bg: ['#E8F0FF', '#F4EEFF', '#FFF3E8'] as readonly [string, string, string],
  text: '#0B1B2B', muted: '#5B6B7C', faint: '#8A97A6',
  accent: '#1E6BFF', accentText: '#FFFFFF', accentSoft: 'rgba(30,107,255,0.12)',
  ok: '#1F9D55', okSoft: 'rgba(31,157,85,0.14)', bad: '#E5484D', badSoft: 'rgba(229,72,77,0.13)', warn: '#D97706',
  glass: 'rgba(255,255,255,0.58)', glassStrong: 'rgba(255,255,255,0.78)', glassBorder: 'rgba(255,255,255,0.75)',
  hairline: 'rgba(11,27,43,0.08)', shadow: 'rgba(30,60,120,0.16)',
};
const dark: typeof light = {
  bg: ['#0A1022', '#140F2A', '#1C140A'] as readonly [string, string, string],
  text: '#F2F5FA', muted: '#A3AFBE', faint: '#7B8797',
  accent: '#4C8DFF', accentText: '#FFFFFF', accentSoft: 'rgba(76,141,255,0.18)',
  ok: '#3DD68C', okSoft: 'rgba(61,214,140,0.16)', bad: '#FF6369', badSoft: 'rgba(255,99,105,0.16)', warn: '#F5A524',
  glass: 'rgba(36,40,58,0.52)', glassStrong: 'rgba(40,44,64,0.78)', glassBorder: 'rgba(255,255,255,0.12)',
  hairline: 'rgba(255,255,255,0.08)', shadow: 'rgba(0,0,0,0.5)',
};
export type Colors = typeof light;
export const useColors = (): Colors => (useColorScheme() === 'dark' ? dark : light);
export const radius = { sm: 12, md: 18, lg: 24, xl: 30, pill: 999 };
export const space = (n: number) => n * 4;
