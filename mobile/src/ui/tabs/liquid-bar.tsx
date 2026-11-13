// The phones' tab bar: the Liquid Glass Navbar (src/components/ui/liquid-glass-navbar.tsx) drawn with React Native,
// since the component itself needs the DOM and WebGL (Mojtaba 2026-11-13). The same pill of frosted glass floating
// above the bottom edge, and the same water drop under the open tab: on a change its leading edge springs to the new
// tab first and its tail follows a moment later, so the drop stretches across and settles with a small squash; each
// tap sends a ripple through the pill, and each icon plays its own little scene (a hop, a drop's bounce, a spin, a
// wave, a pop). With «reduce motion» on, the drop moves and nothing plays.
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Platform, Pressable, View, type LayoutChangeEvent } from 'react-native';

import { RTL, tr } from '@/lib/i18n';
import { Frost } from '../glass-bar';
import { Icon } from '../icon';
import { T, tap } from '../kit';
import { useIsDark } from '../theme';
import { BAR_GAP, type BarFx, type LiquidBarProps } from './liquid-bar-types';

const PAD = 6, ITEM_H = 46;
const JS = { useNativeDriver: false } as const, NATIVE = { useNativeDriver: Platform.OS !== 'web' } as const;

function useReduceMotion() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setStill).catch(() => {});
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setStill);
    return () => sub.remove();
  }, []);
  return still;
}

// One icon and its scene: `play` goes up by one for each tap, and the scene runs again from the start.
function BarIcon({ name, fx, active, play, color, still }: { name: LiquidBarProps['tabs'][number]['icon']; fx: BarFx; active: boolean; play: number; color: string; still: boolean }) {
  const t = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!play || still) return;
    t.setValue(0);
    const dur = fx === 'spin' ? 1000 : fx === 'drop' ? 950 : fx === 'wave' ? 900 : fx === 'pop' ? 500 : 800;
    Animated.timing(t, { toValue: 1, duration: dur, easing: Easing.linear, ...NATIVE }).start();
  }, [play]);
  // Each scene as the component's keyframes, over t from 0 to 1 (and at rest at 1: lifted a little when open).
  const ease = (input: number[], output: number[] | string[]) => t.interpolate({ inputRange: input, outputRange: output as any });
  const lift = active ? -1 : 0, big = active ? 1.08 : 1;
  const tf: any[] = [];
  if (fx === 'glow') tf.push({ translateY: ease([0, 0.3, 0.55, 0.75, 1], [0, -5, 0, -2, lift]) }, { scaleX: ease([0, 0.3, 0.55, 0.75, 1], [1, 1.04, 1.12, 0.98, big]) }, { scaleY: ease([0, 0.3, 0.55, 0.75, 1], [1, 0.96, 0.88, 1.04, big]) });
  else if (fx === 'drop') tf.push({ translateY: ease([0, 0.26, 0.46, 0.62, 0.8, 1], [-1, -13, 3, -3, 0, lift]) }, { scaleX: ease([0, 0.26, 0.46, 0.62, 0.8, 1], [1, 0.88, 1.3, 0.92, 1.04, big]) }, { scaleY: ease([0, 0.26, 0.46, 0.62, 0.8, 1], [1, 1.12, 0.68, 1.08, 0.97, big]) });
  else if (fx === 'spin') tf.push({ perspective: 80 }, { rotateY: ease([0, 1], ['0deg', '360deg']) }, { translateY: lift }, { scale: big });
  else if (fx === 'wave') tf.push({ rotate: ease([0, 0.2, 0.4, 0.6, 0.8, 1], ['0deg', '-15deg', '12deg', '-8deg', '4deg', '0deg']) }, { translateY: lift }, { scale: big });
  else tf.push({ scale: ease([0, 0.6, 1], [0.72, 1.2, big]) }, { translateY: lift });
  return (
    <Animated.View style={{ transform: tf }}>
      <Icon name={name} size={20} color={color} filled={active} />
    </Animated.View>
  );
}

export function LiquidBar({ tabs, active, onSelect, bottomInset, compact }: LiquidBarProps) {
  const dark = useIsDark(), still = useReduceMotion();
  const fg = dark ? '#F1F7FF' : '#0B132B', soft = dark ? 'rgba(241,247,255,0.66)' : 'rgba(11,19,43,0.6)';
  // Where each tab lies in the pill (laid out left to right whatever the language: the first tab at the reading start).
  const [spots, setSpots] = useState<{ x: number; w: number }[]>([]);
  const left = useRef(new Animated.Value(0)).current, right = useRef(new Animated.Value(0)).current;
  const squash = useRef(new Animated.Value(1)).current;
  const ring = useRef(new Animated.Value(1)).current, [ringX, setRingX] = useState(0);
  const [plays, setPlays] = useState<number[]>(() => tabs.map(() => 0));
  const placed = useRef(false), at = useRef({ l: 0, r: 0 });
  const order = RTL ? tabs.map((_, i) => tabs.length - 1 - i) : tabs.map((_, i) => i);

  useEffect(() => {
    const s = spots[active];
    if (!s || spots.length < tabs.length) return;
    const l = s.x, r = s.x + s.w;
    if (!placed.current || still) {
      left.setValue(l); right.setValue(r); at.current = { l, r }; placed.current = true;
      return;
    }
    // the edge on the side it moves to leads; the other follows a moment later, so the drop stretches and closes up
    const toRight = l > at.current.l;
    const lead = { stiffness: 260, damping: 24, mass: 1 }, tail = { stiffness: 120, damping: 16, mass: 1 };
    at.current = { l, r };
    Animated.parallel([
      Animated.spring(toRight ? right : left, { toValue: toRight ? r : l, ...lead, ...JS }),
      Animated.sequence([Animated.delay(70), Animated.spring(toRight ? left : right, { toValue: toRight ? l : r, ...tail, ...JS })]),
      Animated.sequence([Animated.timing(squash, { toValue: 0.82, duration: 120, ...JS }), Animated.spring(squash, { toValue: 1, stiffness: 280, damping: 9, ...JS })]),
    ]).start();
  }, [active, spots, still]);

  const press = (i: number) => {
    tap();
    setPlays(p => p.map((n, j) => (j === i ? n + 1 : n)));
    const s = spots[i];
    if (s && !still) {
      setRingX(s.x + s.w / 2);
      ring.setValue(0);
      Animated.timing(ring, { toValue: 1, duration: 750, easing: Easing.out(Easing.quad), ...NATIVE }).start();
    }
    if (i !== active) onSelect(i);
  };
  const onSpot = (i: number) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    setSpots(p => { const n = p.slice(); n[i] = { x, w: width }; return n; });
  };

  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', paddingBottom: bottomInset + BAR_GAP }}>
      <View accessibilityRole="tablist" style={{ direction: 'ltr', flexDirection: 'row', padding: PAD, gap: 2, borderRadius: 999, overflow: 'hidden',
        borderWidth: 1, borderColor: dark ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.7)',
        shadowColor: '#00285a', shadowOpacity: 0.22, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 8 } as any}>
        <Frost dark={dark} />
        {/* the ripple of the last tap, spreading from that tab and fading */}
        <Animated.View pointerEvents="none" style={{ position: 'absolute', top: PAD + ITEM_H / 2 - 30, left: ringX - 30, width: 60, height: 60, borderRadius: 30,
          backgroundColor: dark ? 'rgba(126,200,255,0.35)' : 'rgba(0,162,255,0.22)',
          opacity: ring.interpolate({ inputRange: [0, 1], outputRange: [0.9, 0] }), transform: [{ scale: ring.interpolate({ inputRange: [0, 1], outputRange: [0.2, 3.2] }) }] }} />
        {/* the drop under the open tab: a rounded lens of light water with a bright rim and a highlight on top */}
        {spots.length >= tabs.length ? (
          <Animated.View pointerEvents="none" style={{ position: 'absolute', top: PAD, height: ITEM_H, left, width: Animated.subtract(right, left), borderRadius: ITEM_H / 2,
            backgroundColor: dark ? 'rgba(160,210,255,0.22)' : 'rgba(205,232,255,0.9)', borderWidth: 1, borderColor: dark ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,1)',
            transform: [{ scaleY: squash }], overflow: 'hidden' }}>
            <View style={{ position: 'absolute', top: 1, left: '12%', right: '12%', height: ITEM_H * 0.42, borderRadius: ITEM_H, backgroundColor: dark ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.85)' }} />
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, backgroundColor: dark ? 'rgba(0,140,255,0.16)' : 'rgba(0,162,255,0.2)' }} />
          </Animated.View>
        ) : null}
        {order.map(i => {
          const t = tabs[i], on = i === active;
          return (
            <Pressable key={t.name} onLayout={onSpot(i)} onPress={() => press(i)} accessibilityRole="tab" accessibilityState={{ selected: on }} accessibilityLabel={tr(t.label)}
              hitSlop={4} style={{ height: ITEM_H, minWidth: compact ? 54 : undefined, paddingHorizontal: compact ? 16 : 18, borderRadius: ITEM_H / 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <BarIcon name={t.icon} fx={t.fx} active={on} play={plays[i]} color={on ? fg : soft} still={still} />
              {compact ? null : <T raw numberOfLines={1} maxFontSizeMultiplier={1.1} style={{ color: on ? fg : soft, fontSize: 14, lineHeight: 18, fontWeight: '500' }}>{tr(t.label)}</T>}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
