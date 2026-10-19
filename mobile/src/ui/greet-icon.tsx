// The home page's greeting starts with a small drawing of the time of day (Mojtaba 2026-10-18): the sun by day, its
// colour changing with the hour (morning, noon, evening), and a moon with a star for «شب به‌خیر». Outlines
// in the app's icon style (ui/icon.tsx), each in its own colour, a deeper shade on the light theme and a softer, lighter
// one on the dark theme so it reads on either header.
// It moves as it shows (Mojtaba 2026-10-19): the sun turns, quickly at first and slowing to rest (a half turn in 2.6 s,
// the time the drawing is on the header), and the moon swings in like a pendulum, settling, while its star twinkles.
// Once, as the drawing appears; not with the phone's «reduce motion».
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Platform, StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

import { useTheme } from './theme';

export type DayPart = 'morning' | 'noon' | 'evening' | 'night';

const TINT: Record<DayPart, [light: string, dark: string]> = {
  morning: ['#E8800C', '#FFAE5C'],
  noon: ['#D4A900', '#FFE066'],
  evening: ['#DC4A2C', '#FF8066'],
  night: ['#5B5BD6', '#B4B8FF'],
};
const NATIVE = Platform.OS !== 'web';

export function GreetIcon({ part, size = 24 }: { part: DayPart; size?: number }) {
  const { theme } = useTheme();
  const color = TINT[part][theme === 'dark' ? 1 : 0];
  const line = { stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  const night = part === 'night';
  // `turn`: the sun's turn or the moon's swing, 0 to 1; `glint`: the star's light.
  const [turn] = useState(() => new Animated.Value(0));
  const [glint] = useState(() => new Animated.Value(1));
  useEffect(() => {
    let live = true, run: Animated.CompositeAnimation | null = null;
    turn.setValue(0); glint.setValue(night ? 0 : 1);
    AccessibilityInfo.isReduceMotionEnabled().catch(() => false).then(reduce => {
      if (!live) return;
      if (reduce) { turn.setValue(1); glint.setValue(1); return; }
      run = night
        ? Animated.parallel([
          Animated.spring(turn, { toValue: 1, friction: 3.2, tension: 26, useNativeDriver: NATIVE }),
          Animated.sequence([Animated.delay(380),
            Animated.timing(glint, { toValue: 1, duration: 240, useNativeDriver: NATIVE }),
            Animated.timing(glint, { toValue: 0.25, duration: 260, useNativeDriver: NATIVE }),
            Animated.timing(glint, { toValue: 1, duration: 300, useNativeDriver: NATIVE })]),
        ])
        : Animated.timing(turn, { toValue: 1, duration: 2600, easing: Easing.out(Easing.cubic), useNativeDriver: NATIVE });
      run.start();
    });
    return () => { live = false; run?.stop(); };
  }, [night, turn, glint]);
  const rotate = turn.interpolate(night ? { inputRange: [0, 1], outputRange: ['-32deg', '0deg'] } : { inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  let body: React.ReactNode;
  if (night) {
    body = <Path d="M19.5 14.6A7.6 7.6 0 0 1 9.4 4.5a7.6 7.6 0 1 0 10.1 10.1z" {...line} />;
  } else {
    // The sun, the same by day; its colour tells the time (Mojtaba 2026-10-18).
    const rays = Array.from({ length: 8 }, (_, k) => {
      const a = (k / 8) * Math.PI * 2, x = Math.cos(a), y = Math.sin(a);
      return `M${(12 + 6.6 * x).toFixed(2)} ${(12 + 6.6 * y).toFixed(2)}L${(12 + 9 * x).toFixed(2)} ${(12 + 9 * y).toFixed(2)}`;
    }).join('');
    body = <G><Circle cx={12} cy={12} r={3.9} {...line} /><Path d={rays} {...line} /></G>;
  }
  return (
    <View style={{ width: size, height: size }}>
      <Animated.View style={{ width: size, height: size, transform: [{ rotate }] }}>
        <Svg width={size} height={size} viewBox="0 0 24 24">{body}</Svg>
      </Animated.View>
      {night ? (
        <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: glint }]}>
          <Svg width={size} height={size} viewBox="0 0 24 24"><Path d="M17 3.6v3.2M15.4 5.2h3.2" {...line} /></Svg>
        </Animated.View>
      ) : null}
    </View>
  );
}
