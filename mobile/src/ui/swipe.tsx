// Sideways swipes.
// usePager: turning pages (questions, signs, situations) — the content follows the finger (with resistance at the first
// and last page); past a third of the width or a quick flick it slides out, the page changes, and the new one slides
// in. Drag to the left: the next page (as the bar's arrow on the right); to the right: the previous one. `rtl` (the
// learning pages, read in Persian): the other way round, a drag to the right brings the next page, which comes in from
// the left (as the bar's «بعدی» on the left).
// useSwipeBack: an inner page goes back with a drag from right to left — the way such a page leaves (it came in from
// the left, as Persian reads); the page follows the finger and slides out past a third of the width or on a flick.
// Both take only clearly sideways moves, so scrolling up and down is left alone.
import { useEffect, useState } from 'react';
import { Animated, Easing, PanResponder, Platform, View, useWindowDimensions, type StyleProp, type ViewStyle } from 'react-native';

import { RTL } from '@/lib/i18n';
import { tap } from './kit';
import { PROVE_PICS } from '@/lib/config';

// On the web the browser keeps only vertical scrolling for itself (no sideways history swipe over these views).
const WEB = Platform.OS === 'web' ? ({ touchAction: 'pan-y' } as any) : null;
// A touch that began in a row that scrolls sideways itself (NoSwipe, e.g. the glossary's group chips) is that row's:
// the page's sideways swipes leave it alone (on the iPhone's web app it went back instead of scrolling the row;
// Mojtaba 2026-10-20).
const hold = { on: false };
const sideways = (_: unknown, g: { dx: number; dy: number }) => !hold.on && Math.abs(g.dx) > 14 && Math.abs(g.dx) > Math.abs(g.dy) * 1.8;
export function NoSwipe({ style, children }: { style?: StyleProp<ViewStyle>; children: React.ReactNode }) {
  const off = () => { hold.on = false; };
  return <View style={style} onTouchStart={() => { hold.on = true; }} onTouchEnd={off} onTouchCancel={off}>{children}</View>;
}

// The learning pages (not the exam) turn right to left, as Persian reads; only on the main site, the /app copy stays as
// it was.
export const learnRtl = !PROVE_PICS && RTL;

type PagerNow = { i: number; n: number; width: number; go: (k: number) => void; rtl: boolean };
export function usePager(i: number, n: number, go: (k: number) => void, rtl = false) {
  const { width } = useWindowDimensions();
  const [dx] = useState(() => new Animated.Value(0));
  // The page's current values for the gesture's handlers, kept up to date after each render.
  const [now] = useState<PagerNow>(() => ({ i, n, width, go, rtl }));
  useEffect(() => { Object.assign(now, { i, n, width, go, rtl }); }, [now, i, n, width, go, rtl]);
  const [pan] = useState(() => pagerResponder(dx, now));
  return { dx, handlers: pan.panHandlers };
}
function pagerResponder(dx: Animated.Value, now: PagerNow) {
  const settle = () => Animated.spring(dx, { toValue: 0, useNativeDriver: true, bounciness: 4 }).start();
  return PanResponder.create({
    onMoveShouldSetPanResponder: sideways,
    onMoveShouldSetPanResponderCapture: sideways,
    onPanResponderMove: (_, g) => {
      // `fwd`: the drag towards the next page (to the left, or to the right when rtl).
      const fwd = now.rtl ? g.dx : -g.dx;
      const edge = (fwd < 0 && now.i === 0) || (fwd > 0 && now.i === now.n - 1);
      dx.setValue(edge ? g.dx / 3 : g.dx);
    },
    onPanResponderRelease: (_, g) => {
      const w = now.width, s = now.rtl ? -1 : 1;
      const fwd = -s * g.dx, vfwd = -s * g.vx;
      const dir = fwd > w / 3 || vfwd > 0.5 ? 1 : fwd < -w / 3 || vfwd < -0.5 ? -1 : 0;
      const to = now.i + dir;
      if (!dir || to < 0 || to >= now.n) return settle();
      tap();
      Animated.timing(dx, { toValue: -s * dir * w, duration: 160, easing: Easing.in(Easing.quad), useNativeDriver: true }).start(() => {
        now.go(to);
        dx.setValue(s * dir * w * 0.35);
        Animated.timing(dx, { toValue: 0, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
      });
    },
    onPanResponderTerminate: settle,
  });
}

type BackNow = { width: number; back: () => void };
export const swipeWebStyle = WEB;
// The back swipe's look: the lean and a slight fade with it.
export const backLean = (dx: Animated.Value) => ({ opacity: dx.interpolate({ inputRange: [-72, 0], outputRange: [0.75, 1] }), transform: [{ translateX: dx }] });
export function useSwipeBack(back: () => void) {
  const { width } = useWindowDimensions();
  const [dx] = useState(() => new Animated.Value(0));
  const [now] = useState<BackNow>(() => ({ width, back }));
  useEffect(() => { Object.assign(now, { width, back }); }, [now, width, back]);
  const [pan] = useState(() => backResponder(dx, now));
  return { dx, handlers: pan.panHandlers };
}
function backResponder(dx: Animated.Value, now: BackNow) {
  // Light and minimal: the page only leans a little with the finger (a quarter of the drag, at most 72 px) and fades a
  // touch; past a third of the width or on a flick it goes back at once (the page's own short way out plays).
  const settle = () => Animated.timing(dx, { toValue: 0, duration: 160, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  const leftwards = (e: unknown, g: { dx: number; dy: number }) => g.dx < 0 && sideways(e, g);
  return PanResponder.create({
    onMoveShouldSetPanResponder: leftwards,
    onMoveShouldSetPanResponderCapture: leftwards,
    onPanResponderMove: (_, g) => dx.setValue(Math.max(-72, Math.min(0, g.dx * 0.25))),
    onPanResponderRelease: (_, g) => {
      if (g.dx < -now.width / 3 || g.vx < -0.5) { tap(); now.back(); setTimeout(() => dx.setValue(0), 300); } else settle();
    },
    onPanResponderTerminate: settle,
  });
}

// The same as components, for pages whose values are known only after their own early returns.
export function Pager({ i, n, go, rtl, style, children }: { i: number; n: number; go: (k: number) => void; rtl?: boolean; style?: StyleProp<ViewStyle>; children: React.ReactNode }) {
  const p = usePager(i, n, go, rtl);
  return <Animated.View {...p.handlers} style={[{ flex: 1 }, WEB, style, { transform: [{ translateX: p.dx }] }]}>{children}</Animated.View>;
}
export function SwipeBack({ back, style, children }: { back: () => void; style?: StyleProp<ViewStyle>; children: React.ReactNode }) {
  const p = useSwipeBack(back);
  return <Animated.View {...p.handlers} style={[{ flex: 1 }, WEB, style, backLean(p.dx)]}>{children}</Animated.View>;
}
// One or the other on the same page: with `pager` the questions turn, without it a drag from right to left goes back.
export function SideSwipe({ pager, back, children }: { pager?: { i: number; n: number; go: (k: number) => void; rtl?: boolean }; back: () => void; children: React.ReactNode }) {
  const p = usePager(pager?.i ?? 0, pager?.n ?? 0, pager?.go ?? noop, pager?.rtl), b = useSwipeBack(back);
  const on = pager ? p : b;
  return <Animated.View {...on.handlers} style={[{ flex: 1 }, WEB, pager ? { transform: [{ translateX: p.dx }] } : backLean(b.dx)]}>{children}</Animated.View>;
}
const noop = () => {};
