// A burst of confetti over the whole screen, like the iOS Messages «Confetti» effect (Mojtaba 2026-10-22): coloured
// paper bits fall from above the top edge, swaying and turning, and are gone in about four seconds. It never takes a
// touch. Played when every question of the random test has been answered (ui/new-test.tsx) and when an exam is handed
// in with every answer right (app/result.tsx).
import { useEffect, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, View, useWindowDimensions } from 'react-native';

import { tap } from './kit';

const COLORS = ['#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#00c7be', '#007aff', '#5856d6', '#af52de', '#ff2d55'];
const N = 90, RUN = 4200;

type Bit = { x: number; drift: number; delay: number; fall: number; w: number; h: number; color: string; spin: number; round: boolean };

export function Confetti({ onDone }: { onDone?: () => void }) {
  const { width: W, height: H } = useWindowDimensions();
  const [p] = useState(() => new Animated.Value(0));
  // Each bit's own start (spread over the first 40%), speed, size, colour and turn.
  const [bits] = useState<Bit[]>(() => Array.from({ length: N }, (_, i) => ({
    x: Math.random(), drift: (Math.random() - 0.5) * 120, delay: Math.random() * 0.4, fall: 0.45 + Math.random() * 0.15,
    w: 6 + Math.random() * 6, h: 9 + Math.random() * 8, color: COLORS[i % COLORS.length], spin: (Math.random() < 0.5 ? -1 : 1) * (360 + Math.random() * 720),
    round: Math.random() < 0.2,
  })));
  useEffect(() => {
    tap();
    const run = Animated.timing(p, { toValue: 1, duration: RUN, easing: Easing.linear, useNativeDriver: Platform.OS !== 'web' });
    run.start(({ finished }) => { if (finished) onDone?.(); });
    return () => run.stop();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { zIndex: 50, overflow: 'hidden' }]}>
      {bits.map((b, i) => {
        const a = b.delay, z = Math.min(1, b.delay + b.fall);
        const input = [0, a, (a + z) / 2, z, 1];
        return (
          <Animated.View key={i} style={{
            position: 'absolute', left: b.x * W, top: -30, width: b.w, height: b.round ? b.w : b.h, borderRadius: b.round ? b.w / 2 : 1.5, backgroundColor: b.color,
            opacity: p.interpolate({ inputRange: [0, a, a + 0.01, z - 0.06, z, 1], outputRange: [0, 0, 1, 1, 0, 0] }),
            transform: [
              { translateY: p.interpolate({ inputRange: [0, a, z, 1], outputRange: [0, 0, H + 60, H + 60], easing: Easing.in(Easing.quad) }) },
              { translateX: p.interpolate({ inputRange: input, outputRange: [0, 0, b.drift, b.drift * 0.4, b.drift * 0.4] }) },
              { rotate: p.interpolate({ inputRange: [0, a, z, 1], outputRange: ['0deg', '0deg', `${b.spin}deg`, `${b.spin}deg`] }) },
              { rotateX: p.interpolate({ inputRange: [0, a, z, 1], outputRange: ['0deg', '0deg', `${b.spin * 1.5}deg`, `${b.spin * 1.5}deg`] }) },
            ],
          }} />
        );
      })}
    </View>
  );
}
