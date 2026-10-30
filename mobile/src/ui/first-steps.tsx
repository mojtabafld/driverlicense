// The home chart's two buttons before any test (Mojtaba 2026-10-30): «شروع آموزش» with «اولین آزمون» under it, the same
// size, their corners only a little round. Once per app start, after the home header's name has settled, their icons
// play once in turn: the book's pages turn over, then the tick is drawn into the circle (as a hand ticks: the short
// stroke, then the long one). With «reduce motion» they are shown still.
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Platform, Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { tr } from '@/lib/i18n';
import { T, tap, useHeaderNameSettled } from './kit';
import { useColors } from './theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const native = Platform.OS !== 'web';
// Lucide's BookOpen and CircleCheck (24 × 24), as the app's «learn» and «exam» icons.
const BOOK = 'M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z';
// a right-hand page, from the spine, that turns over to the left
const PAGE = 'M12 5a5 5 0 014-2h4v14h-4a5 5 0 00-4 2z';
const TICK = 'M8 12l2.5 2.5L16 9', TICK_LEN = 12;
const SIZE = 18;
let played = false;

export function FirstSteps() {
  const c = useColors(), go = useHeaderNameSettled();
  const [still] = useState(() => played);
  const [pages] = useState(() => [new Animated.Value(still ? 1 : 0), new Animated.Value(still ? 1 : 0)]);
  const [tick] = useState(() => new Animated.Value(still ? 1 : 0));
  useEffect(() => {
    if (still || !go) return;
    played = true;
    let a: Animated.CompositeAnimation | null = null, live = true;
    const turn = (v: Animated.Value) => Animated.timing(v, { toValue: 1, duration: 520, easing: Easing.inOut(Easing.cubic), useNativeDriver: native });
    AccessibilityInfo.isReduceMotionEnabled().catch(() => false).then(reduce => {
      if (!live) return;
      if (reduce) { pages.forEach(p => p.setValue(1)); tick.setValue(1); return; }
      a = Animated.sequence([
        Animated.delay(400),
        Animated.stagger(260, [turn(pages[0]), turn(pages[1])]),
        Animated.delay(150),
        Animated.timing(tick, { toValue: 1, duration: 560, easing: Easing.inOut(Easing.cubic), useNativeDriver: false }),
      ]);
      a.start();
    });
    return () => { live = false; a?.stop(); };
  }, [go, still, pages, tick]);

  const bookIcon = (
    <View style={{ width: SIZE, height: SIZE }}>
      <Svg width={SIZE} height={SIZE} viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 5v16" /><Path d={BOOK} />
      </Svg>
      {/* each turning page: flat on the right, on edge at the spine half way, then on the left, where it fades */}
      {pages.map((p, i) => (
        <Animated.View key={i} pointerEvents="none" style={{ position: 'absolute', width: SIZE, height: SIZE,
          opacity: p.interpolate({ inputRange: [0, 0.01, 0.85, 1], outputRange: [0, 1, 1, 0] }),
          transform: [{ scaleX: p.interpolate({ inputRange: [0, 1], outputRange: [1, -1] }) }] }}>
          <Svg width={SIZE} height={SIZE} viewBox="0 0 24 24">
            <Path d={PAGE} fill={c.surface} stroke={c.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Animated.View>
      ))}
    </View>
  );
  const tickIcon = (
    <Svg width={SIZE} height={SIZE} viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={12} cy={12} r={10} />
      <AnimatedPath d={TICK} strokeDasharray={`${TICK_LEN} ${TICK_LEN}`} strokeDashoffset={tick.interpolate({ inputRange: [0, 1], outputRange: [TICK_LEN, 0] })} />
    </Svg>
  );
  const btn = (icon: React.ReactNode, label: string, to: '/learn' | '/exam') => (
    <Pressable onPress={() => { tap(); router.navigate(to); }} accessibilityRole="button" accessibilityLabel={tr(label)}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 12, height: 42,
        borderRadius: 8, borderWidth: 1, borderColor: c.line, backgroundColor: c.surface, opacity: pressed ? 0.7 : 1 })}>
      {icon}
      <T numberOfLines={1} style={{ fontSize: 13.5, fontWeight: '600', color: c.text, flexShrink: 1 }}>{label}</T>
    </Pressable>
  );
  return (
    // (just under the chart's dashed pass line, which is 30% down: Mojtaba 2026-10-30)
    <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, top: '30%', bottom: 0, alignItems: 'center', paddingTop: 14, paddingHorizontal: 12 }}>
      <View style={{ gap: 8, width: '100%', maxWidth: 220 }}>
        {btn(bookIcon, 'شروع آموزش', '/learn')}
        {btn(tickIcon, 'اولین آزمون', '/exam')}
      </View>
    </View>
  );
}
