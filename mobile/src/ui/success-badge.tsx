// A passed test's picture (Mojtaba 2026-11-07, after his «Cleaned successfully» sample; in place of the confetti): a
// green disc with a white tick in two soft halos, a few small green and yellow diamonds scattered round it. It pops in
// once (the disc springs up, the halos and diamonds fade in) and then stays still.
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Platform, View } from 'react-native';

import { Icon } from './icon';
import { tap } from './kit';
import { mix } from './palette';
import { useColors, useIsDark } from './theme';

// The diamonds: where (from the middle, as a share of the size), how big, and which colour.
const BITS: { x: number; y: number; s: number; yellow?: boolean }[] = [
  { x: -0.42, y: -0.3, s: 9 }, { x: 0.4, y: -0.34, s: 8 }, { x: 0.5, y: -0.06, s: 9, yellow: true },
  { x: -0.5, y: 0.02, s: 9, yellow: true }, { x: -0.36, y: 0.3, s: 7 }, { x: 0.42, y: 0.3, s: 8 },
];

export function SuccessBadge({ size = 170 }: { size?: number }) {
  const c = useColors(), dark = useIsDark();
  const green = dark ? '#4ade80' : '#3fca7f', yellow = '#f5c542';
  const disc = size * 0.42, mid = size / 2;
  const [p] = useState(() => new Animated.Value(0));
  useEffect(() => {
    tap();
    let live = true;
    AccessibilityInfo.isReduceMotionEnabled().catch(() => false).then(still => {
      if (!live) return;
      if (still) { p.setValue(1); return; }
      Animated.timing(p, { toValue: 1, duration: 700, easing: Easing.out(Easing.back(1.6)), useNativeDriver: Platform.OS !== 'web' }).start();
    });
    return () => { live = false; };
  }, [p]);
  const fade = p.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0, 0.6, 1], extrapolate: 'clamp' });
  const pop = p.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });
  const halo = (k: number, a: number) => (
    <Animated.View style={{ position: 'absolute', left: mid - (disc * k) / 2, top: mid - (disc * k) / 2, width: disc * k, height: disc * k, borderRadius: (disc * k) / 2,
      backgroundColor: mix(green, c.surface, 1 - a), opacity: fade, transform: [{ scale: pop }] }} />
  );
  return (
    <View style={{ width: size, height: size }} accessible accessibilityRole="image" accessibilityLabel="قبول شدید">
      {halo(1.9, dark ? 0.12 : 0.1)}
      {halo(1.45, dark ? 0.22 : 0.2)}
      {BITS.map((b, i) => (
        <Animated.View key={i} style={{ position: 'absolute', left: mid + b.x * size - b.s / 2, top: mid + b.y * size - b.s / 2, width: b.s, height: b.s, borderRadius: 2,
          backgroundColor: b.yellow ? yellow : mix(green, c.surface, 0.25), opacity: fade,
          transform: [{ rotate: '45deg' }, { scale: p.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0, 1], extrapolate: 'clamp' }) }] }} />
      ))}
      <Animated.View style={{ position: 'absolute', left: mid - disc / 2, top: mid - disc / 2, width: disc, height: disc, borderRadius: disc / 2, backgroundColor: green,
        alignItems: 'center', justifyContent: 'center', transform: [{ scale: pop }], boxShadow: `0 6px 18px ${mix(green, '#000000', 0.2)}55` }}>
        <Icon name="check" size={Math.round(disc * 0.5)} color="#ffffff" weight="bold" />
      </Animated.View>
    </View>
  );
}
