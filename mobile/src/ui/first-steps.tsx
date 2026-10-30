// «شروع اولین آزمون»: home's «آمار آزمون‌ها» card before any test, in place of its numbers (Mojtaba 2026-10-30; it was on
// the empty chart, with «شروع آموزش», which went). It opens the exam tab. Once per app start, after the home header's
// name has settled, the tick is drawn into its circle as a hand ticks (the short stroke, then the long one); with
// «reduce motion» it is shown still.
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Pressable } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { tr } from '@/lib/i18n';
import { T, tap, useHeaderNameSettled } from './kit';
import { useColors } from './theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);
// Lucide's CircleCheck (24 × 24), the app's «exam» icon, its tick drawn from the short stroke's start.
const TICK = 'M8 12l2.5 2.5L16 9', TICK_LEN = 12;
const SIZE = 18;
let played = false;

export function FirstTest({ dense }: { dense?: boolean }) {
  const c = useColors(), go = useHeaderNameSettled();
  const [still] = useState(() => played);
  const [tick] = useState(() => new Animated.Value(still ? 1 : 0));
  useEffect(() => {
    if (still || !go) return;
    played = true;
    let a: Animated.CompositeAnimation | null = null, live = true;
    AccessibilityInfo.isReduceMotionEnabled().catch(() => false).then(reduce => {
      if (!live) return;
      if (reduce) { tick.setValue(1); return; }
      a = Animated.sequence([Animated.delay(400), Animated.timing(tick, { toValue: 1, duration: 560, easing: Easing.inOut(Easing.cubic), useNativeDriver: false })]);
      a.start();
    });
    return () => { live = false; a?.stop(); };
  }, [go, still, tick]);
  return (
    <Pressable onPress={() => { tap(); router.navigate('/exam'); }} accessibilityRole="button" accessibilityLabel={tr('شروع اولین آزمون')}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 12, height: dense ? 40 : 44,
        borderRadius: 8, borderWidth: 1, borderColor: c.line, backgroundColor: c.surface2, opacity: pressed ? 0.7 : 1 })}>
      <Svg width={SIZE} height={SIZE} viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Circle cx={12} cy={12} r={10} />
        <AnimatedPath d={TICK} strokeDasharray={`${TICK_LEN} ${TICK_LEN}`} strokeDashoffset={tick.interpolate({ inputRange: [0, 1], outputRange: [TICK_LEN, 0] })} />
      </Svg>
      <T numberOfLines={1} style={{ fontSize: 14, fontWeight: '600', color: c.text, flexShrink: 1 }}>شروع اولین آزمون</T>
    </Pressable>
  );
}
