// A gauge: a 270° arc open at the bottom, its filled part a gradient (Mojtaba 2026-11-05, after a picture he sent of a
// «steps today» card: the arc around a large number, an icon over it and a line under it). Home's chance of passing.
// `from` / `to`: the gradient's two ends (start of the arc → its end); `track`: the unfilled arc.
import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { useCountUp } from './kit';

const SWEEP = 270;
// A point on the circle at `deg` (0° at the top, clockwise).
const at = (cx: number, cy: number, r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};

export function Gauge({ value, size, stroke, from, to, track, children }: {
  value: number; size: number; stroke: number; from: string; to: string; track: string; children?: React.ReactNode;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const shown = useCountUp(Math.max(0, Math.min(1, value)), 1800);
  const r = (size - stroke) / 2, c = size / 2;
  const [x0, y0] = at(c, c, r, -SWEEP / 2), [x1, y1] = at(c, c, r, SWEEP / 2);
  const d = `M ${x0} ${y0} A ${r} ${r} 0 1 1 ${x1} ${y1}`;
  const len = (Math.PI * 2 * r * SWEEP) / 360;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute', left: 0, top: 0 }}>
        <Defs>
          <LinearGradient id={`g${id}`} x1="0" y1="1" x2="1" y2="0">
            <Stop offset="0" stopColor={from} />
            <Stop offset="1" stopColor={to} />
          </LinearGradient>
        </Defs>
        <Path d={d} stroke={track} strokeWidth={stroke} fill="none" strokeLinecap="round" />
        {shown > 0.001 ? (
          <Path d={d} stroke={`url(#g${id})`} strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={`${len} ${len}`} strokeDashoffset={len * (1 - shown)} />
        ) : null}
      </Svg>
      {children}
    </View>
  );
}

// Two soft waves along a card's bottom edge, in the theme's colour (the picture's background), behind its content.
export function CardWaves({ color, height, strength = 1 }: { color: string; height: number; strength?: number }) {
  return (
    <Svg width="100%" height={height} viewBox="0 0 400 100" preserveAspectRatio="none" pointerEvents="none"
      style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
      <Path d="M0 60 C 80 30, 150 85, 230 55 S 350 30, 400 50 L 400 100 L 0 100 Z" fill={color} fillOpacity={0.18 * strength} />
      <Path d="M0 78 C 90 55, 170 98, 260 72 S 360 60, 400 70 L 400 100 L 0 100 Z" fill={color} fillOpacity={0.22 * strength} />
    </Svg>
  );
}
