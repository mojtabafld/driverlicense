// The app's icons, the same drawings on every platform (iOS, Android, web), in the flat style of Uber Eats: outlines only,
// one stroke weight with rounded ends and corners, no filled forms (only a saved bookmark is filled, to show it is
// saved). `weight` and `contrast` are kept for callers but no longer change the drawing.
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

export function Icon({ name, size = 24, color, filled = false }: IconProps) {
  const line = { stroke: color, strokeWidth: 2.1, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  let body: React.ReactNode;
  switch (name) {
    case 'house':
      body = <G><Path d="M4 10.4 12 4l8 6.4V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z" {...line} /><Path d="M9.5 20.5v-5.5h5v5.5" {...line} /></G>;
      break;
    case 'exam':
    case 'checkCircle':
      body = <G><Circle cx={12} cy={12} r={8.8} {...line} /><Path d="M8.2 12.3l2.6 2.6 5-5.2" {...line} /></G>;
      break;
    case 'xCircle':
      body = <G><Circle cx={12} cy={12} r={8.8} {...line} /><Path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6" {...line} /></G>;
      break;
    case 'learn':
      body = <G><Path d="M12 6.6C10 5 7.4 4.5 3.8 4.8v13.8c3.6-.3 6.2.2 8.2 1.7 2-1.5 4.6-2 8.2-1.7V4.8c-3.6-.3-6.2.2-8.2 1.8z" {...line} /><Path d="M12 6.6v13.7" {...line} /></G>;
      break;
    case 'settings':
      body = <G><Path d={gear} {...line} /><Circle cx={12} cy={12} r={2.8} {...line} /></G>;
      break;
    case 'moon':
      body = <Path d="M20 14.6A8.5 8.5 0 1 1 9.4 4a7 7 0 0 0 10.6 10.6z" {...line} />;
      break;
    case 'sun':
      body = <G><Circle cx={12} cy={12} r={4} {...line} /><Path d="M12 2.8v1.9M12 19.3v1.9M2.8 12h1.9M19.3 12h1.9M5.5 5.5l1.3 1.3M17.2 17.2l1.3 1.3M5.5 18.5l1.3-1.3M17.2 6.8l1.3-1.3" {...line} /></G>;
      break;
    case 'check':
      body = <Path d="M5 12.6l4.6 4.6L19 7.6" {...line} strokeWidth={2.6} />;
      break;
    case 'chevronLeft':
      body = <Path d="M14.5 5.5 8 12l6.5 6.5" {...line} />;
      break;
    case 'sparkles':
      body = <G><Path d="M10 3.8l1.6 4.6 4.6 1.6-4.6 1.6L10 16.2l-1.6-4.6L3.8 10l4.6-1.6z" {...line} /><Path d="M18 14.2l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" {...line} /></G>;
      break;
    case 'clipboard':
      body = (
        <G>
          <Path d="M8.5 4.5H7A2 2 0 0 0 5 6.5v13A2 2 0 0 0 7 21.5h10a2 2 0 0 0 2-2v-13a2 2 0 0 0-2-2h-1.5" {...line} />
          <Path d="M9.5 3h5a1 1 0 0 1 1 1v1.2a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" {...line} />
          <Path d="M9 11.5h6M9 15h6M9 18.5h3.5" {...line} />
        </G>
      );
      break;
    case 'warning':
      body = <G><Path d="M10.3 4.4a2 2 0 0 1 3.4 0l7.3 12.7a2 2 0 0 1-1.7 3H4.7a2 2 0 0 1-1.7-3z" {...line} /><Path d="M12 9.8v3.6M12 16.7v.1" {...line} /></G>;
      break;
    case 'arrowRight':
      body = <Path d="M4.5 12h15M13.5 6l6 6-6 6" {...line} />;
      break;
    case 'arrowLeft':
      body = <Path d="M19.5 12h-15M10.5 6l-6 6 6 6" {...line} />;
      break;
    case 'bookmark':
      body = <Path d="M7.5 3.5h9a1.5 1.5 0 0 1 1.5 1.5v15.5l-6-4.2-6 4.2V5a1.5 1.5 0 0 1 1.5-1.5z" {...line} fill={filled ? color : 'none'} />;
      break;
    case 'chevronDown':
      body = <Path d="M6 9.5l6 6 6-6" {...line} />;
      break;
    case 'chevronUp':
      body = <Path d="M6 14.5l6-6 6 6" {...line} />;
      break;
    case 'chart':
      body = <Path d="M5 20V11M10.5 20V5M16 20v-7M21 20H3" {...line} />;
      break;
    case 'translate':
      body = <G><Path d="M3.5 6h9M8 4v2M10.5 6c-.8 3.6-3.2 6.4-6.5 8M6 9.5c1.2 2 2.9 3.5 5 4.5" {...line} /><Path d="M12.5 20l4-9.5 4 9.5M14 16.8h5" {...line} /></G>;
      break;
    case 'person':
      body = <G><Circle cx={12} cy={8} r={3.8} {...line} /><Path d="M4.5 20c.9-3.6 3.9-5.6 7.5-5.6s6.6 2 7.5 5.6" {...line} /></G>;
      break;
    case 'personAdd':
      body = <G><Circle cx={10} cy={8} r={3.6} {...line} /><Path d="M3 20c.8-3.4 3.6-5.3 7-5.3 1.4 0 2.7.3 3.8.9M18.5 13.5v6M15.5 16.5h6" {...line} /></G>;
      break;
    case 'lock':
      body = <G><Path d="M6.5 10.5h11a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19v-7a1.5 1.5 0 0 1 1.5-1.5z" {...line} /><Path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" {...line} /></G>;
      break;
    case 'speaker':
      body = <G><Path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" {...line} /><Path d="M15.5 9a4.2 4.2 0 0 1 0 6M18.2 6.5a8 8 0 0 1 0 11" {...line} /></G>;
      break;
    case 'stop':
      body = <Path d="M7.5 6.5h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z" {...line} />;
      break;
    case 'zoom':
      body = <G><Circle cx={10.5} cy={10.5} r={6.5} {...line} /><Path d="M15.3 15.3 20.5 20.5M10.5 7.8v5.4M7.8 10.5h5.4" {...line} /></G>;
      break;
    case 'eye':
    case 'eyeSlash':
      body = (
        <G>
          <Path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" {...line} />
          <Circle cx={12} cy={12} r={3} {...line} />
          {name === 'eyeSlash' ? <Path d="M4 4l16 16" {...line} /> : null}
        </G>
      );
      break;
    case 'exit':
      body = <G><Path d="M13.5 4.5H7a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 7 19.5h6.5" {...line} /><Path d="M10.5 12h10M17 8.5l3.5 3.5-3.5 3.5" {...line} /></G>;
      break;
    case 'refresh':
      body = <G><Path d="M19 12a7 7 0 1 1-2.05-4.95" {...line} /><Path d="M19.5 4.5V9H15" {...line} /></G>;
      break;
    case 'trash':
      body = <G><Path d="M4.5 6.5h15M9.5 6.5V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v1.5" {...line} /><Path d="M6.5 6.5l.8 12.2A2 2 0 0 0 9.3 20.5h5.4a2 2 0 0 0 2-1.8l.8-12.2M10 10.5v6M14 10.5v6" {...line} /></G>;
      break;
    case 'shuffle':
      body = <G><Path d="M3.5 7h3.2c2 0 3.2 1 4.3 2.8l2 3.4c1.1 1.8 2.3 2.8 4.3 2.8h3.2M3.5 17h3.2c1.6 0 2.7-.6 3.6-1.8M13.9 8.8c.9-1.2 2-1.8 3.6-1.8h3" {...line} /><Path d="M18 4.5L20.5 7 18 9.5M18 14.5l2.5 2.5-2.5 2.5" {...line} /></G>;
      break;
    case 'edit':
      body = <G><Path d="M15.2 5.3l3.5 3.5L9 18.5l-4.3.8.8-4.3z" {...line} /><Path d="M13.4 7.1l3.5 3.5" {...line} /></G>;
      break;
    case 'play':
      body = <Path d="M8 5.8v12.4a1 1 0 0 0 1.5.86l9.8-6.2a1 1 0 0 0 0-1.72L9.5 4.94A1 1 0 0 0 8 5.8z" {...line} />;
      break;
    case 'xmark':
      body = <Path d="M6.5 6.5l11 11M17.5 6.5l-11 11" {...line} />;
      break;
    case 'list':
      body = <Path d="M9 6.5h11M9 12h11M9 17.5h11M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01" {...line} />;
      break;
    case 'filter':
      body = <Path d="M4.5 7h15M7.5 12h9M10.5 17h3" {...line} />;
      break;
    case 'rules': // scales: the law
      body = <G><Path d="M12 4v16M8 20h8M5 7.5h14M12 5.5l-.01 0" {...line} /><Path d="M7 7.5 4.2 13.5a2.9 2.9 0 0 0 5.6 0zM17 7.5l-2.8 6a2.9 2.9 0 0 0 5.6 0z" {...line} /></G>;
      break;
    case 'sign': // a round sign on its post
      body = <G><Circle cx={12} cy={9} r={6} {...line} /><Path d="M9 9h6M12 15v6M9.5 21h5" {...line} /></G>;
      break;
    case 'priority': // the give-way triangle, point down
      body = <G><Path d="M4.6 5.2h14.8a1.1 1.1 0 0 1 .95 1.65l-7.4 12.8a1.1 1.1 0 0 1-1.9 0L3.65 6.85A1.1 1.1 0 0 1 4.6 5.2z" {...line} /><Path d="M8.8 8.6h6.4L12 14.2z" {...line} /></G>;
      break;
    case 'help':
      body = <G><Circle cx={12} cy={12} r={8.8} {...line} /><Path d="M9.6 9.4a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.1-2.4 3.7M12 16.9v.01" {...line} /></G>;
      break;
    case 'bulbCircle': // a light bulb in a circle (a tip), in the style of checkCircle
      body = <G><Circle cx={12} cy={12} r={8.8} {...line} /><Path d="M12 7a3.4 3.4 0 0 0-2 6.2c.4.3.6.7.6 1.1v.4h2.8v-.4c0-.4.2-.8.6-1.1A3.4 3.4 0 0 0 12 7zM10.8 16.9h2.4" {...line} /></G>;
      break;
    case 'info':
      body = <G><Circle cx={12} cy={12} r={8.8} {...line} /><Path d="M12 11v5.5M12 7.6v.01" {...line} /></G>;
      break;
    case 'bug':
      body = <G><Path d="M8 10.5a4 4 0 0 1 8 0v3.5a4 4 0 0 1-8 0z" {...line} /><Path d="M9.5 6.8 8 5M14.5 6.8 16 5M12 10.5V18M4.5 12.5H8M16 12.5h3.5M5 17.5l3.2-1.4M19 17.5l-3.2-1.4M5 7.8l3.2 1.6M19 7.8l-3.2 1.6" {...line} /></G>;
      break;
    case 'send':
      body = <Path d="M20 4 3.8 10.6l6.6 2.9 2.9 6.6zM20 4l-9.6 9.5" {...line} />;
      break;
    case 'clock':
      body = <G><Circle cx={12} cy={12} r={8.6} {...line} /><Path d="M12 7.5V12l3 2" {...line} /></G>;
      break;
  }
  return <Svg width={size} height={size} viewBox="0 0 24 24">{body}</Svg>;
}
