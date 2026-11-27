// The app's icons, from Material Symbols (fonts.google.com/icons; Outlined, weight 400; Mojtaba 2026-11-07, in place of
// Lucide): the same drawings on every platform (iOS, Android, web). Each of the app's icon names (icon-names.ts) points
// to one symbol in icon-paths.ts, which holds its outline and its filled form as SVG paths, so only the few dozen used
// are in the bundle. `filled` draws the filled form (a saved bookmark, the open tab in the bottom bar); `weight` and
// `contrast` are kept for callers but do not change the drawing.
import Svg, { Path } from 'react-native-svg';

import { RTL } from '@/lib/i18n';
import type { IconProps } from './icon-names';
import { SYMBOLS } from './icon-paths';

export type { IconName } from './icon-names';

export function Icon({ name, size = 24, color, filled = false }: IconProps) {
  const [outline, solid] = SYMBOLS[name];
  // The arrows are meant for Persian (right to left); in English and Danish they point the other way.
  const flip = !RTL && (name === 'chevronLeft' || name === 'arrowLeft' || name === 'arrowRight');
  return (
    <Svg width={size} height={size} viewBox="0 -960 960 960" style={flip ? { transform: [{ scaleX: -1 }] } : undefined}>
      <Path d={filled && solid ? solid : outline} fill={color} />
    </Svg>
  );
}
