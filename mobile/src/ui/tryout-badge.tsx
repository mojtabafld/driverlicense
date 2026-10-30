// The pass ring's icon before the first test (Mojtaba 2026-10-30): the seal with a tick, its scalloped edge turning slowly
// like a soft cloud and its tick drawn again and again in green, as if being ticked. A tap starts the tryout test.
import { useEffect, useState } from 'react';
import { Animated, Easing, Platform, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
// Lucide's BadgeCheck, its two paths (24 × 24).
const EDGE = 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z';
const TICK = 'm16 9-5.5 5.5L8 12';
const TICK_LEN = 12; // the tick's length, a little over its true 11.3
const native = Platform.OS !== 'web';

export function TryoutBadge({ size, color, edge }: { size: number; color: string; edge: string }) {
  const [spin] = useState(() => new Animated.Value(0)), [draw] = useState(() => new Animated.Value(0));
  useEffect(() => {
    const turn = Animated.loop(Animated.timing(spin, { toValue: 1, duration: 9000, easing: Easing.linear, useNativeDriver: native }));
    // drawn in 0.7 s, held, faded out, a pause; again
    const tick = Animated.loop(Animated.sequence([
      Animated.timing(draw, { toValue: 1, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
      Animated.delay(1600),
      Animated.timing(draw, { toValue: 2, duration: 350, easing: Easing.in(Easing.quad), useNativeDriver: false }),
      Animated.delay(400),
      Animated.timing(draw, { toValue: 0, duration: 0, useNativeDriver: false }),
    ]));
    turn.start(); tick.start();
    return () => { turn.stop(); tick.stop(); };
  }, [spin, draw]);
  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const offset = draw.interpolate({ inputRange: [0, 1, 2], outputRange: [TICK_LEN, 0, 0] });
  const tickOpacity = draw.interpolate({ inputRange: [0, 0.05, 1, 2], outputRange: [0, 1, 1, 0] });
  return (
    <View style={{ width: size, height: size }}>
      <Animated.View style={{ position: 'absolute', width: size, height: size, transform: [{ rotate }] }}>
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d={EDGE} fill="none" stroke={edge} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </Animated.View>
      <Svg width={size} height={size} viewBox="0 0 24 24" style={{ position: 'absolute' }}>
        <AnimatedPath d={TICK} fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={`${TICK_LEN} ${TICK_LEN}`} strokeDashoffset={offset} opacity={tickOpacity} />
      </Svg>
    </View>
  );
}
