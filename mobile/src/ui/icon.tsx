// App icons on the web and Android: our own drawings in the style of Apple's SF Symbols (rounded line ends, one stroke
// weight, an outline and a filled form). Apple licenses SF Symbols only for apps on Apple platforms; iOS uses the real
// ones (src/ui/icon.ios.tsx).
import Svg, { Circle, G, Path } from 'react-native-svg';

import type { IconProps } from './icon-names';

export type { IconName } from './icon-names';

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

export function Icon({ name, size = 24, color, filled = false, weight = 'regular', contrast = '#fff' }: IconProps) {
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
    case 'clipboard':
      body = (
        <G>
          <Path d="M8.5 4.5H6.8A1.8 1.8 0 0 0 5 6.3v13.4a1.8 1.8 0 0 0 1.8 1.8h10.4a1.8 1.8 0 0 0 1.8-1.8V6.3a1.8 1.8 0 0 0-1.8-1.8h-1.7" {...(filled ? { ...solid, strokeWidth: sw } : line)} />
          <Path d="M9.5 3h5a1 1 0 0 1 1 1v1.2a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" {...line} />
          <Path d="M8.6 11h.01M8.6 14.5h.01M8.6 18h.01" {...line} stroke={filled ? contrast : color} strokeWidth={2.4} />
          <Path d="M11.5 11h4M11.5 14.5h4M11.5 18h2.5" {...line} stroke={filled ? contrast : color} />
        </G>
      );
      break;
    case 'warning': {
      const d = 'M10.3 4.3a2 2 0 0 1 3.4 0l7.4 12.9a2 2 0 0 1-1.7 3H4.6a2 2 0 0 1-1.7-3z';
      body = (
        <G>
          <Path d={d} {...(filled ? solid : line)} />
          <Path d="M12 9.5v4" {...line} stroke={filled ? contrast : color} strokeWidth={2} />
          <Circle cx={12} cy={16.9} r={1.1} fill={filled ? contrast : color} />
        </G>
      );
      break;
    }
    case 'arrowRight':
      body = <Path d="M4.5 12h15M13.5 6l6 6-6 6" {...line} strokeWidth={2.2} />;
      break;
    case 'arrowLeft':
      body = <Path d="M19.5 12h-15M10.5 6l-6 6 6 6" {...line} strokeWidth={2.2} />;
      break;
    case 'bookmark': {
      const d = 'M7 3.5h10a1 1 0 0 1 1 1v16l-6-4.2-6 4.2v-16a1 1 0 0 1 1-1z';
      body = <Path d={d} {...(filled ? solid : line)} />;
      break;
    }
    case 'chevronDown':
      body = <Path d="M6 9.5l6 6 6-6" {...line} strokeWidth={2.2} />;
      break;
    case 'chart':
      body = <Path d="M4 20V10M10 20V4M16 20v-7M21 20H3" {...line} />;
      break;
    case 'translate':
      body = (
        <G>
          <Path d="M3.5 6h9M8 4v2M10.5 6c-.8 3.6-3.2 6.4-6.5 8M6 9.5c1.2 2 2.9 3.5 5 4.5" {...line} />
          <Path d="M12.5 20l4-9.5 4 9.5M14 16.8h5" {...line} />
        </G>
      );
      break;
  }
  return <Svg width={size} height={size} viewBox="0 0 24 24">{body}</Svg>;
}
