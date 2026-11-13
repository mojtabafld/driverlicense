// The tab bar (Mojtaba 2026-11-13, after github.com/MrJs6781/tab-bar-interaction, itself a recreation of Volorf's
// «Tab Bar Interaction XVIII» on Dribbble; drawn here anew with React Native, so the website and the phone apps share
// it): a white bar with a round notch in its middle, two tabs on each side of it, and under the open tab a small dot in
// the theme's colour that stretches as it travels to the tab tapped and closes up again on arrival; the tab's icon
// pops and fills a little. In the notch floats a round button in the theme's colour with a «+»: pressed, it grows
// upwards into a capsule and three quick starts rise into it one after another (a 5-question test, the smart coach,
// the day's note), the «+» turning and fading as it goes; tapped, a drop of light runs to the one chosen, stretching
// with its speed and squashing on arrival, its icon takes the «+»'s place, and the capsule closes and opens it. A tap
// anywhere else (or Escape on the web) closes it. Everything moves on springs and can be interrupted; with «reduce
// motion» on, nothing plays.
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Platform, Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { RTL, tr } from '@/lib/i18n';
import { randomIds } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Icon, type IconName } from '../icon';
import { tap } from '../kit';
import { mix } from '../palette';
import { useColors, useIsDark } from '../theme';
import { BAR_GAP, type LiquidBarProps } from './liquid-bar-types';

// The design's own measures (a 324 × 84 bar), scaled to the screen: u = min(width, 420) / 420.
export const BAR_W = 324, BAR_H = 84;
// The tabs' centres, left to right; the capsule's actions' heights over its foot (top to bottom).
const NAV_X = [38, 82, 242, 286], ACT_Y = [144, 90, 36];
// The notch: a rounded bar with a round bite out of its top edge, round the floating button.
const SHAPE = 'M22,0H111C116,0 118.6,4 120.3,9.5A42 42 0 0 0 203.7,9.5C205.4,4 208,0 213,0H302C315,0 324,7 324,22V62C324,77 315,84 302,84H22C9,84 0,77 0,62V22C0,7 9,0 22,0Z';
const WEB = Platform.OS === 'web';
const JS = { useNativeDriver: false } as const;

type Act = { icon: IconName; label: string; run: () => void };

function useStill() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setStill).catch(() => {});
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setStill);
    return () => sub.remove();
  }, []);
  return still;
}

// A spring as the design's (ω 14 and critically damped by default), or at once with «reduce motion».
function spring(v: Animated.Value, to: number, still: boolean, w = 14, z = 1, velocity = 0) {
  if (still) { v.setValue(to); return Animated.delay(0); }
  return Animated.spring(v, { toValue: to, stiffness: w * w, damping: 2 * z * w, mass: 1, velocity, restDisplacementThreshold: 0.001, restSpeedThreshold: 0.001, ...JS });
}

// One tab: its icon, filled a little and in the theme's colour when open, popping when tapped.
function NavIcon({ icon, on, play, color, size, still }: { icon: IconName; on: boolean; play: number; color: string; size: number; still: boolean }) {
  const s = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!play || still) return;
    s.setValue(1);
    Animated.sequence([
      Animated.timing(s, { toValue: 1.28, duration: 140, useNativeDriver: !WEB }),
      Animated.spring(s, { toValue: 1, stiffness: 420, damping: 14, useNativeDriver: !WEB }),
    ]).start();
  }, [play]);
  return <Animated.View style={{ transform: [{ scale: s }] }}><Icon name={icon} size={size} color={color} filled={on} /></Animated.View>;
}

export function NotchBar({ tabs, active, onSelect, bottomInset, width }: LiquidBarProps & { width: number }) {
  const c = useColors(), dark = useIsDark(), still = useStill();
  const { bank } = useApp();
  const u = Math.min(width, 420) / 420;
  const accent = c.accent;
  const bar = dark ? mix(accent, '#17141f', 0.8) : '#ffffff';
  const ico = dark ? mix(accent, '#2a2733', 0.6) : mix(accent, '#ffffff', 0.55);
  // (the first tab at the reading start: the right in Persian)
  const slot = (i: number) => (RTL ? NAV_X.length - 1 - i : i);

  // The dot under the open tab: its two ends on springs, the end on the side it moves to quick and the other slow,
  // so it stretches as it travels and closes up on arrival.
  const x0 = NAV_X[slot(active)];
  const dl = useRef(new Animated.Value(x0 - 2.5)).current, dr = useRef(new Animated.Value(x0 + 2.5)).current;
  const at = useRef(x0);
  const [plays, setPlays] = useState<number[]>(() => tabs.map(() => 0));
  useEffect(() => {
    const x = NAV_X[slot(active)];
    if (x === at.current) return;
    const right = x > at.current;
    at.current = x;
    Animated.parallel([
      spring(right ? dr : dl, x + (right ? 2.5 : -2.5), still, 22, 0.8),
      spring(right ? dl : dr, x + (right ? -2.5 : 2.5), still, 12, 0.9),
    ]).start();
  }, [active, still]);
  const press = (i: number) => {
    tap();
    setPlays(p => p.map((n, j) => (j === i ? n + 1 : n)));
    if (i !== active) onSelect(i);
  };

  // The capsule: m from shut (0) to open (1), each action rising on its own spring a moment after the one before.
  const [open, setOpen] = useState(false), [pick, setPick] = useState(-1);
  const m = useRef(new Animated.Value(0)).current;
  const rise = useRef([0, 1, 2].map(() => new Animated.Value(0))).current;
  const dy = useRef(new Animated.Value(ACT_Y[2])).current, ds = useRef(new Animated.Value(0)).current, stretch = useRef(new Animated.Value(0)).current;
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const setShut = (o: boolean) => {
    clear();
    setOpen(o);
    spring(m, o ? 1 : 0, still).start();
    rise.forEach((v, i) => {
      if (!o) { spring(v, 0, still).start(); return; }
      timers.current.push(setTimeout(() => spring(v, 1, still).start(), still ? 0 : 45 + i * 55));
    });
    if (!o) { spring(ds, 0, still).start(); timers.current.push(setTimeout(() => setPick(-1), 300)); }
  };
  useEffect(() => clear, []);
  useEffect(() => {
    if (!WEB || !open) return;
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setShut(false); };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [open]);
  const acts: Act[] = [
    { icon: 'note', label: 'یادداشت سریع', run: () => router.push('/calendar') },
    { icon: 'coach', label: 'مربی هوشمند', run: () => router.push({ pathname: '/coach', params: { from: 'learn' } }) },
    { icon: 'exam', label: 'آزمون کوتاه ۵ سؤالی', run: () => {
      if (!bank) return;
      session.plan = { mode: 'random', ids: randomIds(bank, 5), title: 'آزمون تصادفی' };
      router.push('/run');
    } },
  ];
  // The drop runs to the action chosen (stretching on the way, squashing as it lands), then the capsule closes and
  // the action opens.
  const choose = (i: number) => {
    tap();
    clear();
    if (pick < 0) { dy.setValue(ACT_Y[i]); ds.setValue(0); }
    setPick(i);
    if (!still) {
      stretch.setValue(pick >= 0 && pick !== i ? 1 : 0);
      Animated.timing(stretch, { toValue: 0, duration: 380, ...JS }).start();
    }
    Animated.parallel([spring(dy, ACT_Y[i], still, 17, 0.55), spring(ds, 1, still, 18)]).start();
    timers.current.push(setTimeout(() => { setShut(false); acts[i].run(); }, still ? 0 : 420));
  };

  const pillH = m.interpolate({ inputRange: [0, 1], outputRange: [72 * u, 180 * u] });
  const glyphOff = m.interpolate({ inputRange: [0, 0.45, 1], outputRange: [1, 0, 0], extrapolate: 'clamp' });
  const glyphTurn = m.interpolate({ inputRange: [0, 0.45, 1], outputRange: ['0deg', '45deg', '45deg'], extrapolate: 'clamp' });
  const shown = pick >= 0 ? acts[pick].icon : null;

  return (
    <>
      {open ? <Pressable onPress={() => setShut(false)} accessible={false} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} /> : null}
      <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', paddingBottom: bottomInset + BAR_GAP }}>
        <View accessibilityRole="tablist" style={{ width: BAR_W * u, height: BAR_H * u, direction: 'ltr' } as any}>
          {/* the bar, with its shadow (a drop shadow on the web, the shape's own on iOS) */}
          <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            ...(WEB ? { filter: `drop-shadow(0 ${10 * u}px ${16 * u}px ${dark ? 'rgba(0,0,0,0.45)' : mix(accent, '#ffffff', 0.7) + '99'})` }
              : { shadowColor: dark ? '#000' : accent, shadowOpacity: dark ? 0.45 : 0.3, shadowRadius: 16 * u, shadowOffset: { width: 0, height: 10 * u } }) } as any}>
            <Svg width="100%" height="100%" viewBox={`0 0 ${BAR_W} ${BAR_H}`}><Path d={SHAPE} fill={bar} /></Svg>
          </View>
          {tabs.map((t, i) => {
            const on = i === active;
            return (
              <Pressable key={t.name} onPress={() => press(i)} accessibilityRole="tab" accessibilityState={{ selected: on }} accessibilityLabel={tr(t.label)} hitSlop={6}
                style={({ hovered }: any) => ({ position: 'absolute', top: 16 * u, left: (NAV_X[slot(i)] - 22) * u, width: 44 * u, height: 44 * u,
                  alignItems: 'center', justifyContent: 'center', opacity: !on && hovered ? 0.8 : 1 }) as any}>
                <NavIcon icon={t.icon} on={on} play={plays[i]} color={on ? accent : ico} size={22 * u} still={still} />
              </Pressable>
            );
          })}
          <Animated.View pointerEvents="none" style={{ position: 'absolute', top: 64 * u, height: 5 * u, borderRadius: 3 * u, backgroundColor: accent,
            left: Animated.multiply(dl, u), width: Animated.multiply(Animated.subtract(dr, dl), u) }} />

          {/* the button in the notch, and the capsule it grows into */}
          <Animated.View style={{ position: 'absolute', left: 126 * u, bottom: 48 * u, width: 72 * u, height: pillH, borderRadius: 36 * u, backgroundColor: accent, overflow: 'hidden' }}>
            <Pressable onPress={() => { tap(); setShut(!open); }} accessibilityRole="button" accessibilityLabel={tr(open ? 'بستن' : 'شروع سریع')} accessibilityState={{ expanded: open }}
              style={({ pressed }) => ({ position: 'absolute', left: 0, right: 0, bottom: 0, height: 72 * u, zIndex: 1, alignItems: 'center', justifyContent: 'center' })}>
              {({ pressed }) => <View style={{ width: 40 * u, height: 40 * u, borderRadius: 20 * u, backgroundColor: pressed ? 'rgba(0,0,0,0.12)' : 'transparent' }} />}
            </Pressable>
            {/* the drop of light under the action chosen */}
            <Animated.View pointerEvents="none" style={{ position: 'absolute', left: 12 * u, width: 48 * u, height: 48 * u, borderRadius: 24 * u, backgroundColor: 'rgba(255,255,255,0.5)', zIndex: 2,
              bottom: Animated.multiply(Animated.subtract(dy, 24), u), opacity: Animated.multiply(ds, m.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 1, 1] })),
              transform: [{ scaleX: Animated.multiply(ds, stretch.interpolate({ inputRange: [0, 1], outputRange: [1, 0.7] })) }, { scaleY: Animated.multiply(ds, stretch.interpolate({ inputRange: [0, 1], outputRange: [1, 1.6] })) }] }} />
            {/* the «+» (or the action chosen), riding up with the capsule's top, turning and fading */}
            <Animated.View pointerEvents="none" style={{ position: 'absolute', left: 24 * u, width: 24 * u, height: 24 * u, alignItems: 'center', justifyContent: 'center',
              bottom: Animated.subtract(pillH, 48 * u), opacity: glyphOff, transform: [{ rotate: glyphTurn }] }}>
              {shown ? <ActIcon icon={shown} u={u} accent={accent} /> : <Icon name="plus" size={28 * u} color="#ffffff" weight="bold" />}
            </Animated.View>
            {acts.map((a, i) => (
              <Animated.View key={a.label} pointerEvents={open ? 'auto' : 'none'} style={{ position: 'absolute', left: 12 * u, width: 48 * u, height: 48 * u, zIndex: 3,
                bottom: rise[i].interpolate({ inputRange: [0, 1], outputRange: [-28 * u, (ACT_Y[i] - 24) * u] }),
                opacity: rise[i].interpolate({ inputRange: [0, 0.33, 1], outputRange: [0, 1, 1], extrapolate: 'clamp' }) }}>
                <Pressable onPress={() => choose(i)} accessibilityRole="button" accessibilityLabel={tr(a.label)} accessibilityState={{ selected: pick === i }} disabled={!open}
                  style={{ flex: 1, borderRadius: 24 * u, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' }}>
                  <ActIcon icon={a.icon} u={u} accent={accent} />
                </Pressable>
              </Animated.View>
            ))}
          </Animated.View>
        </View>
      </View>
    </>
  );
}

// An action's icon: the theme's colour on a small white rounded square.
function ActIcon({ icon, u, accent }: { icon: IconName; u: number; accent: string }) {
  return (
    <View style={{ width: 24 * u, height: 24 * u, borderRadius: 7 * u, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
      <Icon name={icon} size={16 * u} color={accent} weight="bold" />
    </View>
  );
}
