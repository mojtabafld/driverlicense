// The home page's greeting starts with a small drawing of the time of day (Mojtaba 2026-10-18): a sun rising for
// «صبح به‌خیر», the full sun at noon, a sun going down for «عصر به‌خیر» and a moon with a star for «شب به‌خیر». Outlines
// in the app's icon style (ui/icon.tsx), each in its own colour, a deeper shade on the light theme and a softer, lighter
// one on the dark theme so it reads on either header.
import Svg, { Circle, G, Path } from 'react-native-svg';

import { useTheme } from './theme';

export type DayPart = 'morning' | 'noon' | 'evening' | 'night';

const TINT: Record<DayPart, [light: string, dark: string]> = {
  morning: ['#E08A00', '#FFC247'],
  noon: ['#D9A400', '#FFD84D'],
  evening: ['#E0602A', '#FF9A6B'],
  night: ['#5B5BD6', '#B4B8FF'],
};

export function GreetIcon({ part, size = 24 }: { part: DayPart; size?: number }) {
  const { theme } = useTheme();
  const color = TINT[part][theme === 'dark' ? 1 : 0];
  const line = { stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  let body: React.ReactNode;
  if (part === 'noon') {
    const rays = Array.from({ length: 8 }, (_, k) => {
      const a = (k / 8) * Math.PI * 2, x = Math.cos(a), y = Math.sin(a);
      return `M${(12 + 6.6 * x).toFixed(2)} ${(12 + 6.6 * y).toFixed(2)}L${(12 + 9 * x).toFixed(2)} ${(12 + 9 * y).toFixed(2)}`;
    }).join('');
    body = <G><Circle cx={12} cy={12} r={3.9} {...line} /><Path d={rays} {...line} /></G>;
  } else if (part === 'night') {
    body = <G><Path d="M19.5 14.6A7.6 7.6 0 0 1 9.4 4.5a7.6 7.6 0 1 0 10.1 10.1z" {...line} />
      <Path d="M17 3.6v3.2M15.4 5.2h3.2" {...line} /></G>;
  } else {
    // The sun half over the horizon, a short ray either side, and an arrow above: up in the morning, down in the evening.
    const arrow = part === 'morning' ? 'M9.4 5.6 12 3l2.6 2.6M12 3v5' : 'M9.4 5.4 12 8l2.6-2.6M12 8V3';
    body = <G><Path d="M7 17.5a5 5 0 0 1 10 0" {...line} /><Path d="M3 21h18M2.8 17.5h1.6M19.6 17.5h1.6M5.4 11.4l1.1 1.1M18.6 11.4l-1.1 1.1" {...line} />
      <Path d={arrow} {...line} /></G>;
  }
  return <Svg width={size} height={size} viewBox="0 0 24 24">{body}</Svg>;
}
