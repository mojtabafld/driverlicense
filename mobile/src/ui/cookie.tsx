// A Material 3 «cookie» tile (Mojtaba 2026-11-07, after the «Self-hosting web fonts» card on fonts.google.com): a
// rounded square whose sides dip in a little, holding an icon in the middle.
import type { ReactNode } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// The outline on a 100×100 box: a superellipse (n 3.2), its sides pressed in by a few per cent.
const D = (() => {
  const out: string[] = [];
  for (let i = 0; i < 96; i++) {
    const t = (i / 96) * 2 * Math.PI, c = Math.cos(t), s = Math.sin(t), n = 3.2;
    const r = Math.pow(Math.pow(Math.abs(c), n) + Math.pow(Math.abs(s), n), -1 / n) * (1 - 0.07 * Math.pow(Math.cos(2 * t), 8));
    out.push(`${i ? 'L' : 'M'}${(50 + 48 * r * c).toFixed(1)} ${(50 + 48 * r * s).toFixed(1)}`);
  }
  return out.join('') + 'Z';
})();

export function Cookie({ size, color, children }: { size: number; color: string; children?: ReactNode }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View pointerEvents="none" style={{ position: 'absolute', left: 0, top: 0, width: size, height: size }}>
        <Svg width={size} height={size} viewBox="0 0 100 100"><Path d={D} fill={color} /></Svg>
      </View>
      <View style={{ zIndex: 1 }}>{children}</View>
    </View>
  );
}
