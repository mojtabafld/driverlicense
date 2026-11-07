// A row of Material cards that slides one card at a time (Mojtaba 2026-11-07, after fonts.google.com's «Figma plugin» /
// «Material Design icon guidelines» carousel): each card a title, a line under it and a cookie tile with its icon; the
// next card peeks in at the end; round arrows at the sides move one card back or on, and a swipe does the same.
// Laid out left to right whatever the language, the first card at the reading start (the right in Persian).
import { useRef, useState } from 'react';
import { Animated, Easing, PanResponder, Platform, Pressable, View } from 'react-native';

import { RTL, tr } from '@/lib/i18n';
import { Cookie } from './cookie';
import { Icon, type IconName } from './icon';
import { T, tap } from './kit';
import { useTabLook } from './tabs/tab-look';
import { useColors, useM3 } from './theme';

export type StatItem = { title: string; sub: string; icon: IconName; color?: string; onPress?: () => void; label?: string };

// `fill`: the cards' colour (the inner surface inside a card by default; the card colour on the page).
export function StatCarousel({ items, dense, fill }: { items: StatItem[]; dense?: boolean; fill?: string }) {
  const c = useColors(), tab = useTabLook(), m = useM3();
  const [w, setW] = useState(0), [at, setAt] = useState(0);
  const [x] = useState(() => new Animated.Value(0));
  const H = dense ? 92 : 108, GAP = 10, PEEK = 50, sign = RTL ? 1 : -1;
  // A card leaves room at both sides for an arrow over the cards around it: the first at the start, the last at the
  // end, the others PEEK from the start.
  const W = Math.max(180, w - PEEK * 2), stepW = W + GAP;
  const offset = (i: number) => i * stepW - (i === 0 ? 0 : i === items.length - 1 ? w - W : PEEK);
  const go = (i: number) => {
    const to = Math.max(0, Math.min(items.length - 1, i));
    setAt(to);
    Animated.timing(x, { toValue: offset(to) * sign, duration: 280, easing: Easing.out(Easing.cubic), useNativeDriver: Platform.OS !== 'web' }).start();
  };
  const atRef = useRef(0); atRef.current = at;
  const offRef = useRef(offset); offRef.current = offset;
  const pan = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 12 && Math.abs(g.dx) > Math.abs(g.dy) * 1.3,
    onPanResponderMove: (_, g) => x.setValue(offRef.current(atRef.current) * sign + g.dx),
    onPanResponderRelease: (_, g) => {
      // towards the end of the reading direction brings the next card (to the left in Persian, to the right in English)
      const forward = RTL ? g.dx > 40 : g.dx < -40, back = RTL ? g.dx < -40 : g.dx > 40;
      if (forward || back) tap();
      go(atRef.current + (forward ? 1 : back ? -1 : 0));
    },
    onPanResponderTerminate: () => go(atRef.current),
  })).current;
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
    <View onLayout={e => setW(e.nativeEvent.layout.width)} style={{ height: H, overflow: 'hidden', direction: 'ltr' } as any} {...pan.panHandlers}>
      {w ? (
        <Animated.View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: w, transform: [{ translateX: x }] }}>
          {items.map((it, i) => (
            <Pressable key={i} disabled={!it.onPress} onPress={() => { tap(); it.onPress?.(); }} accessibilityRole={it.onPress ? 'button' : undefined} accessibilityLabel={it.label}
              style={({ pressed }) => ({ position: 'absolute', top: 0, height: H, width: W, left: RTL ? w - W - i * stepW : i * stepW, borderRadius: 24,
                backgroundColor: fill ?? c.surface2, opacity: pressed ? 0.85 : 1, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', gap: 14,
                direction: RTL ? 'rtl' : 'ltr' } as any)}>
              <View style={{ flex: 1, gap: 3 }}>
                <T numberOfLines={1} style={{ fontSize: dense ? 18 : 19.5, lineHeight: dense ? 26 : 28, fontWeight: '500', color: it.color ?? c.text }}>{it.title}</T>
                <T numberOfLines={2} style={{ fontSize: 13.5, lineHeight: 20, color: c.muted }}>{it.sub}</T>
              </View>
              <Cookie size={dense ? 48 : 56} color={tab.indicator}><Icon name={it.icon} size={dense ? 24 : 28} color={tab.onIndicator} /></Cookie>
            </Pressable>
          ))}
        </Animated.View>
      ) : null}
      {arrow(false)}
      {arrow(true)}
    </View>
  );
}
