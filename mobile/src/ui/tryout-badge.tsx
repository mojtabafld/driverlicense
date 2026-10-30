// The pass ring's icon before the first test (Mojtaba 2026-10-30): the seal with a tick. Once the home header's name has
// settled it plays once: its scalloped edge turns like a soft cloud and goes green while the tick is drawn in green, the
// way a hand ticks (from the short stroke up into the long one); then it rests and both take the icon's usual colour.
// A tap on the ring starts the tryout test.
import { useEffect, useState } from 'react';
import { Animated, Easing, Platform, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useHeaderNameSettled } from './kit';

const AnimatedPath = Animated.createAnimatedComponent(Path);
// Lucide's BadgeCheck (24 × 24): its edge, and its tick drawn from the short stroke's start.
const EDGE = 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z';
const TICK = 'M8 12l2.5 2.5L16 9';
const TICK_LEN = 12; // a little over its true 11.3
const native = Platform.OS !== 'web';

export function TryoutBadge({ size, color, rest }: { size: number; color: string; rest: string }) {
  const go = useHeaderNameSettled();
  const [spin] = useState(() => new Animated.Value(0)), [draw] = useState(() => new Animated.Value(0)), [tone] = useState(() => new Animated.Value(0));
  useEffect(() => {
    if (!go) return;
    const a = Animated.sequence([
      // the edge turns once, slowing to a stop, and goes green; the tick is drawn meanwhile
      Animated.parallel([
        Animated.timing(spin, { toValue: 1, duration: 1500, easing: Easing.out(Easing.cubic), useNativeDriver: native }),
        Animated.timing(tone, { toValue: 1, duration: 400, useNativeDriver: false }),
        Animated.sequence([Animated.delay(350), Animated.timing(draw, { toValue: 1, duration: 650, easing: Easing.inOut(Easing.cubic), useNativeDriver: false })]),
      ]),
      Animated.delay(500),
      // and back to the usual colour, the tick staying
      Animated.timing(tone, { toValue: 2, duration: 700, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
    ]);
    a.start();
    return () => a.stop();
  }, [go, spin, draw, tone]);
  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const stroke = tone.interpolate({ inputRange: [0, 1, 2], outputRange: [rest, color, rest] });
  const offset = draw.interpolate({ inputRange: [0, 1], outputRange: [TICK_LEN, 0] });
  return (
    <View style={{ width: size, height: size }}>
      <Animated.View style={{ position: 'absolute', width: size, height: size, transform: [{ rotate }] }}>
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <AnimatedPath d={EDGE} fill="none" stroke={stroke} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </Animated.View>
      <Svg width={size} height={size} viewBox="0 0 24 24" style={{ position: 'absolute' }}>
        <AnimatedPath d={TICK} fill="none" stroke={stroke} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={`${TICK_LEN} ${TICK_LEN}`} strokeDashoffset={offset} />
      </Svg>
    </View>
  );
}
