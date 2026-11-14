// A row of Material cards that slides one card at a time (Mojtaba 2026-11-07, after fonts.google.com's «Figma plugin» /
// «Material Design icon guidelines» carousel): each card a title, a line under it and a cookie tile with its icon; the
// next card peeks in at the end; round arrows at the sides move one card back or on, and a swipe does the same.
// Laid out left to right whatever the language, the first card at the reading start (the right in Persian).
// Since 2026-11-13 (Mojtaba) each card has the gradient cards' look (ui/service-carousel.tsx) at its own size: a soft
// two-colour wash, its number «( 001 )» in small mono letters with the line icon across from it, and at the foot the
// title over its line.
import { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, Platform, Pressable, View } from 'react-native';

import { RTL, tr } from '@/lib/i18n';
import { Icon, type IconName } from './icon';
import { T, tap } from './kit';
import { CardWash, type ServiceTone } from './service-carousel';
import { useColors, useIsDark, useM3 } from './theme';

export type StatItem = { title: string; sub: string; icon: IconName; color?: string; onPress?: () => void; label?: string; tone?: ServiceTone };
const CYCLE: ServiceTone[] = ['purple', 'green', 'blue', 'amber', 'red'];

// (`fill`, the cards' plain colour before 2026-11-13, is kept for the callers.)
// `first`: the first card's number (1 by default).
export function StatCarousel({ items, dense, first = 1 }: { items: StatItem[]; dense?: boolean; fill?: string; first?: number }) {
  const c = useColors(), m = useM3(), dark = useIsDark(), ink = dark ? '#ffffff' : c.text;
  const [w, setW] = useState(0), [at, setAt] = useState(0);
  const [x] = useState(() => new Animated.Value(0));
  // (taller, Mojtaba 2026-11-08: 92 / 108 before)
  const H = dense ? 116 : 140, GAP = 10, PEEK = 50, sign = RTL ? 1 : -1;
  // A card leaves room at both sides for an arrow over the cards around it: the first at the start, the last at the
  // end, the others PEEK from the start.
  const W = Math.max(180, w - PEEK * 2), stepW = W + GAP;
  const offset = (i: number) => i * stepW - (i === 0 ? 0 : i === items.length - 1 ? w - W : PEEK);
  // Smooth (Mojtaba 2026-11-08): the row follows the finger, a little stiffer past the first and last card, and lets
  // go into a spring that carries on the swipe's own speed, settling on the card nearest to where the swipe was
  // heading (one card on at most).
  const go = (i: number, velocity = 0) => {
    const to = Math.max(0, Math.min(items.length - 1, i));
    setAt(to);
    Animated.spring(x, { toValue: offset(to) * sign, velocity, stiffness: 170, damping: 24, mass: 1, overshootClamping: false,
      restDisplacementThreshold: 0.5, restSpeedThreshold: 0.5, useNativeDriver: Platform.OS !== 'web' }).start();
  };
  const atRef = useRef(0); atRef.current = at;
  const offRef = useRef(offset); offRef.current = offset;
  const goRef = useRef(go); goRef.current = go;
  const nRef = useRef(items.length); nRef.current = items.length;
  const start = useRef(0), dragged = useRef(0);  // (a drag's end is not a tap on the card under it)
  const pan = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 8 && Math.abs(g.dx) > Math.abs(g.dy) * 1.2,
    onPanResponderTerminationRequest: () => false,
    onPanResponderGrant: () => { x.stopAnimation(v => { start.current = v; }); },
    onPanResponderMove: (_, g) => {
      const lo = Math.min(0, offRef.current(nRef.current - 1) * sign), hi = Math.max(0, offRef.current(nRef.current - 1) * sign);
      let v = start.current + g.dx;
      if (v < lo) v = lo - (lo - v) * 0.35; else if (v > hi) v = hi + (v - hi) * 0.35;  // (resistance past the ends)
      x.setValue(v);
    },
    onPanResponderRelease: (_, g) => {
      // where the swipe was heading (its position plus a moment of its speed), then the card nearest to it, one on at most
      const aim = start.current + g.dx + g.vx * 220;
      let best = 0;
      for (let i = 1; i < nRef.current; i++) if (Math.abs(offRef.current(i) * sign - aim) < Math.abs(offRef.current(best) * sign - aim)) best = i;
      const to = Math.max(atRef.current - 1, Math.min(atRef.current + 1, best));
      if (to !== atRef.current) tap();
      if (Math.abs(g.dx) > 6) dragged.current = Date.now();
      goRef.current(to, g.vx);
    },
    onPanResponderTerminate: () => goRef.current(atRef.current),
  })).current;
  // On the web a trackpad's or mouse's sideways scroll moves it a card at a time too (vertical scrolling stays the page's).
  const box = useRef<View>(null);
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const el = box.current as unknown as HTMLElement | null;
    if (!el || !el.addEventListener) return;
    let sum = 0, until = 0;
    const wheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (Date.now() < until) return;
      sum += e.deltaX;
      if (Math.abs(sum) > 40) {
        // scrolling right brings what is to the right: the next card in English, the one before in Persian
        const step = (sum > 0) !== RTL ? 1 : -1;
        sum = 0; until = Date.now() + 450;
        goRef.current(atRef.current + step);
      }
    };
    el.addEventListener('wheel', wheel, { passive: false });
    return () => el.removeEventListener('wheel', wheel);
  }, [w]);
  const arrow = (next: boolean) => {
    const show = next ? at < items.length - 1 : at > 0;
    if (!show) return null;
    // (physical sides: the row is laid out left to right; «next» at the reading end)
    const side = next === RTL ? { left: 6 } : { right: 6 };
    return (
      <Pressable onPress={() => { tap(); go(at + (next ? 1 : -1)); }} accessibilityRole="button" accessibilityLabel={tr(next ? 'بعدی' : 'قبلی')} hitSlop={6}
        style={({ pressed }) => ({ position: 'absolute', top: H / 2 - 20, ...side, width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center',
          backgroundColor: m.dialog, opacity: pressed ? 0.8 : 1, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 3 })}>
        {/* chevronLeft points to the reading end (the icon turns it round in English); «back» the other way */}
        <View style={next ? undefined : { transform: [{ scaleX: -1 }] }}><Icon name="chevronLeft" size={22} color={c.text} /></View>
      </Pressable>
    );
  };
  return (
    <View ref={box} onLayout={e => setW(e.nativeEvent.layout.width)} style={{ height: H, overflow: 'hidden', direction: 'ltr', ...(Platform.OS === 'web' ? { touchAction: 'pan-y' } : {}) } as any} {...pan.panHandlers}>
      {w ? (
        <Animated.View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: w, transform: [{ translateX: x }] }}>
          {items.map((it, i) => (
            <Pressable key={i} disabled={!it.onPress} onPress={() => { if (Date.now() - dragged.current < 400) return; tap(); it.onPress?.(); }} accessibilityRole={it.onPress ? 'button' : undefined} accessibilityLabel={it.label}
              style={({ pressed }) => ({ position: 'absolute', top: 0, height: H, width: W, left: RTL ? w - W - i * stepW : i * stepW, borderRadius: 24, overflow: 'hidden',
                opacity: pressed ? 0.85 : 1, paddingHorizontal: 18, paddingVertical: dense ? 12 : 16, justifyContent: 'space-between',
                direction: RTL ? 'rtl' : 'ltr' } as any)}>
              <CardWash tone={it.tone ?? CYCLE[i % CYCLE.length]} />
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                <Icon name={it.icon} size={dense ? 26 : 30} color={ink} />
              </View>
              <View style={{ gap: 2 }}>
                <T numberOfLines={1} style={{ fontSize: dense ? 17 : 19, lineHeight: dense ? 25 : 28, fontWeight: '600', color: it.color ?? ink }}>{it.title}</T>
                <T numberOfLines={dense ? 1 : 2} style={{ fontSize: 13.5, lineHeight: 20, color: ink, opacity: 0.72 }}>{it.sub}</T>
              </View>
            </Pressable>
          ))}
        </Animated.View>
      ) : null}
      {arrow(false)}
      {arrow(true)}
    </View>
  );
}
