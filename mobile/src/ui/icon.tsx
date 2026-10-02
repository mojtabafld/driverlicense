// App icons. On iOS they are Apple's SF Symbols (expo-symbols), so each phone shows its own system's version of the
// symbol (iOS 27's on iOS 27). Apple licenses SF Symbols only for apps on Apple platforms, so the web and Android get our
// own drawings in the same style: rounded line ends, one stroke weight, an outline and a filled form.
import { SymbolView, type SymbolWeight } from 'expo-symbols';
import { Platform } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

export type IconName = 'house' | 'exam' | 'learn' | 'settings' | 'moon' | 'sun' | 'check' | 'checkCircle' | 'xCircle' | 'chevronLeft' | 'sparkles';

// SF Symbol per icon: [outline, filled].
const SF: Record<IconName, [string, string]> = {
  house: ['house', 'house.fill'],
  exam: ['checkmark.circle', 'checkmark.circle.fill'],
  learn: ['book', 'book.fill'],
  settings: ['gearshape', 'gearshape.fill'],
  moon: ['moon.fill', 'moon.fill'],
  sun: ['sun.max.fill', 'sun.max.fill'],
  check: ['checkmark', 'checkmark'],
  checkCircle: ['checkmark.circle.fill', 'checkmark.circle.fill'],
  xCircle: ['xmark.circle.fill', 'xmark.circle.fill'],
  chevronLeft: ['chevron.left', 'chevron.left'],
  sparkles: ['sparkles', 'sparkles'],
};

// A gear with 8 rounded teeth around a hole, on a 24 grid.
const gear = (() => {
  const pts: string[] = [];
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2;
    for (const [r, d] of [[7.4, -0.27], [9.6, -0.17], [9.6, 0.17], [7.4, 0.27]] as const) {
      const t = a + d;
      pts.push(`${(12 + r * Math.cos(t)).toFixed(2)} ${(12 + r * Math.sin(t)).toFixed(2)}`);
    }
  }
  return `M${pts.join(' L')} Z`;
})();

type Props = { name: IconName; size?: number; color: string; filled?: boolean; weight?: SymbolWeight; contrast?: string };
export function Icon({ name, size = 24, color, filled = false, weight = 'regular', contrast = '#fff' }: Props) {
  if (Platform.OS === 'ios') {
    return <SymbolView name={SF[name][filled ? 1 : 0] as any} size={size} tintColor={color} weight={weight} type="monochrome" />;
  }
  const sw = weight === 'bold' || weight === 'semibold' ? 2.4 : 1.8;
  const line = { stroke: color, strokeWidth: sw, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  const solid = { fill: color, stroke: color, strokeWidth: 1, strokeLinejoin: 'round' as const };
  let body: React.ReactNode;
  switch (name) {
    case 'house': {
      const d = 'M4 10.6 12 4l8 6.6V19a1.5 1.5 0 0 1-1.5 1.5H15v-5.3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5.3H5.5A1.5 1.5 0 0 1 4 19z';
      body = <Path d={d} {...(filled ? solid : line)} />;
      break;
    }
    case 'exam':
    case 'checkCircle':
      body = filled || name === 'checkCircle'
        ? <G><Circle cx={12} cy={12} r={9.5} fill={color} /><Path d="M7.8 12.4l2.8 2.8 5.6-6" {...line} stroke={contrast} strokeWidth={2.2} /></G>
        : <G><Circle cx={12} cy={12} r={9} {...line} /><Path d="M8 12.4l2.7 2.7L16 9.6" {...line} /></G>;
      break;
    case 'xCircle':
      body = <G><Circle cx={12} cy={12} r={9.5} fill={color} /><Path d="M8.8 8.8l6.4 6.4M15.2 8.8l-6.4 6.4" {...line} stroke={contrast} strokeWidth={2.2} /></G>;
      break;
    case 'learn': {
      const d = 'M12 6.6C10 5 7.4 4.5 3.8 4.8v13.8c3.6-.3 6.2.2 8.2 1.7 2-1.5 4.6-2 8.2-1.7V4.8c-3.6-.3-6.2.2-8.2 1.8z';
      body = filled
        ? <G><Path d={d} {...solid} /><Path d="M12 7v12.6" {...line} stroke={contrast} strokeWidth={1.4} /></G>
        : <G><Path d={d} {...line} /><Path d="M12 6.6v13.7" {...line} /></G>;
      break;
    }
    case 'settings':
      body = filled
        ? <G><Path d={gear} {...solid} /><Circle cx={12} cy={12} r={3} fill={contrast} /></G>
        : <G><Path d={gear} {...line} /><Circle cx={12} cy={12} r={3} {...line} /></G>;
      break;
    case 'moon':
      body = <Path d="M20 14.6A8.5 8.5 0 1 1 9.4 4a7 7 0 0 0 10.6 10.6z" {...solid} />;
      break;
    case 'sun':
      body = (
        <G>
          <Circle cx={12} cy={12} r={4.2} fill={color} />
          <Path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" {...line} strokeWidth={2} />
        </G>
      );
      break;
    case 'check':
      body = <Path d="M5 12.6l4.6 4.6L19 7.6" {...line} strokeWidth={weight === 'bold' ? 3 : sw} />;
      break;
    case 'chevronLeft':
      body = <Path d="M14.5 5.5 8 12l6.5 6.5" {...line} strokeWidth={2.2} />;
      break;
    case 'sparkles':
      body = (
        <G>
          <Path d="M10 3.5l1.7 4.8 4.8 1.7-4.8 1.7L10 16.5l-1.7-4.8L3.5 10l4.8-1.7z" {...solid} />
          <Path d="M18 13.5l.9 2.1 2.1.9-2.1.9L18 19.5l-.9-2.1-2.1-.9 2.1-.9z" {...solid} />
        </G>
      );
      break;
  }
  return <Svg width={size} height={size} viewBox="0 0 24 24">{body}</Svg>;
}
