// The home page's greeting starts with a small drawing of the time of day (Mojtaba 2026-10-18): the sun by day, its
// colour changing with the hour (morning, noon, evening), and a moon with a star for «شب به‌خیر». Outlines
// in the app's icon style (ui/icon.tsx), each in its own colour, a deeper shade on the light theme and a softer, lighter
// one on the dark theme so it reads on either header.
import Svg, { Circle, G, Path } from 'react-native-svg';

import { useTheme } from './theme';

export type DayPart = 'morning' | 'noon' | 'evening' | 'night';

const TINT: Record<DayPart, [light: string, dark: string]> = {
  morning: ['#E8800C', '#FFAE5C'],
  noon: ['#D4A900', '#FFE066'],
  evening: ['#DC4A2C', '#FF8066'],
  night: ['#5B5BD6', '#B4B8FF'],
};

export function GreetIcon({ part, size = 24 }: { part: DayPart; size?: number }) {
  const { theme } = useTheme();
  const color = TINT[part][theme === 'dark' ? 1 : 0];
  const line = { stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  let body: React.ReactNode;
  if (part === 'night') {
    body = <G><Path d="M19.5 14.6A7.6 7.6 0 0 1 9.4 4.5a7.6 7.6 0 1 0 10.1 10.1z" {...line} />
      <Path d="M17 3.6v3.2M15.4 5.2h3.2" {...line} /></G>;
  } else {
    // The sun, the same by day; its colour tells the time (Mojtaba 2026-10-18).
    const rays = Array.from({ length: 8 }, (_, k) => {
      const a = (k / 8) * Math.PI * 2, x = Math.cos(a), y = Math.sin(a);
      return `M${(12 + 6.6 * x).toFixed(2)} ${(12 + 6.6 * y).toFixed(2)}L${(12 + 9 * x).toFixed(2)} ${(12 + 9 * y).toFixed(2)}`;
    }).join('');
    body = <G><Circle cx={12} cy={12} r={3.9} {...line} /><Path d={rays} {...line} /></G>;
  }
  return <Svg width={size} height={size} viewBox="0 0 24 24">{body}</Svg>;
}
