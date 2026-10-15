// Progress chart, «نمودار پیشرفت»: a point for the percent correct of each attempt on a smooth grey line (light grey in
// the light theme, dark grey in the dark one) with a soft green gradient under it, ten across the width and older ones
// by dragging (it opens at the newest); a point is green when the
// attempt passed or reached 80%, else grey, with the 80% pass line; the line rises in when it opens. Tap a point to pick
// that attempt; its details and a review button show below. With `fill` it takes the height of the space it is given,
// at least FILL_MIN (the home screen fits above the tab bar; only a very short screen scrolls a little).
// With more than ten attempts, the first time it is drawn after the app opens, it shows that older attempts are there:
// the bars glide a little towards the older ones and back, under a small arrow that fades in and out.
import { router } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, ScrollView, View } from 'react-native';
import Svg, { Circle, Defs, Line, LinearGradient, Path, Stop, Text as SvgText } from 'react-native-svg';

import { RTL } from '@/lib/i18n';
import { faNum, fmtDate, isFull, isPass, pctOf, scoreOf } from '@/lib/logic';
import type { Attempt } from '@/lib/bank';
import { Icon } from './icon';
import { ArcButton, Button, T, tap, useCountUp } from './kit';
import { ARC, useColors } from './theme';

// The main site (ARC) draws it flat, as a cash-forecast card: no percent scale or grid, the green line edge to edge
// over a soft green fill, the pass line dashed grey with its label, green points on passed attempts and red on failed ones, dates below.
const L = ARC ? 0 : 38, R = ARC ? 0 : 12, TOP = ARC ? 22 : 14, B = 24, FILL_MIN = 120;
// The scroll hint plays once per app start.
let hinted = false;
function takeHint() { if (hinted) return false; hinted = true; return true; }

// The hint over the bars: a round arrow towards the older attempts, fading in, swaying, fading out.
function ScrollHint({ run, onDone }: { run: boolean; onDone: () => void }) {
  const c = useColors();
  const [o] = useState(() => new Animated.Value(0)), [dx] = useState(() => new Animated.Value(0));
  useEffect(() => {
    if (!run) return;
    const ease = Easing.inOut(Easing.cubic);
    const sway = Animated.sequence([
      Animated.timing(dx, { toValue: -8, duration: 420, easing: ease, useNativeDriver: true }),
      Animated.timing(dx, { toValue: 0, duration: 420, easing: ease, useNativeDriver: true }),
    ]);
    const anim = Animated.sequence([
      Animated.timing(o, { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      sway, sway,
      Animated.delay(500),
      Animated.timing(o, { toValue: 0, duration: 480, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
    ]);
    anim.start(({ finished }) => { if (finished) onDone(); });
    return () => anim.stop();
  }, [run, o, dx, onDone]);
  if (!run) return null;
  return (
    <Animated.View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', opacity: o }}>
      <Animated.View style={{ flexDirection: 'row', direction: 'ltr', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 22,
        backgroundColor: c.strong, transform: [{ translateX: dx }], shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 3 } as any}>
        <Icon name="arrowLeft" size={18} color={c.strongFg} weight="semibold" />
      </Animated.View>
    </Animated.View>
  );
}
const modeName = (a: Attempt) => (a.mode === 'lesson' ? 'درس' : a.mode === 'mistakes' ? 'تمرین اشتباهات' : a.mode === 'sections' ? 'آموزش دسته‌بندی' : 'آزمون تصادفی');

// `sel` / `onSel`: the picked attempt, when the page holds it (so a tap elsewhere in its card can clear it).
// `minH`: with `fill`, the chart's least height (FILL_MIN unless given).
// `noHint`: with `fill`, the line under the chart shows only for a picked attempt (no «tap the chart» hint), for small screens.
export function ProgressChart({ attempts, onOpen, fill, sel: selOut, onSel, minH = FILL_MIN, noHint }: { attempts: Attempt[]; onOpen: (a: Attempt) => void; fill?: boolean; sel?: number | null; onSel?: (i: number | null) => void; minH?: number; noHint?: boolean }) {
  const c = useColors();
  // «قبول» in green / «مردود» in red, only the word, for the picked exam.
  const verdict = (a: Attempt) => <T style={{ fontSize: 13, fontWeight: '700', color: isPass(a) ? c.ok : c.bad }}>{isPass(a) ? 'قبول' : 'مردود'}</T>;
  const [W, setW] = useState(0), [fillH, setFillH] = useState(0);
  const abs = !!fill && ARC;
  const H = fill ? Math.max(fillH, minH) : 210;
  const [selIn, setSelIn] = useState<number | null>(null);
  const sel = onSel ? selOut ?? null : selIn, setSel = onSel ?? setSelIn;
  const scroller = useRef<ScrollView>(null);
  const grow = useCountUp(1, 900);
  const [hint, setHint] = useState(false);
  const hideHint = useCallback(() => setHint(false), []);
  const n = Math.min(attempts.length, 200), many = attempts.length > 10;
  // Once the bars have grown in: glide towards the older attempts and back, with the hint over them.
  // Keyed by being ready only, so a later change of width does not cut the hint short.
  const ready = many && W > 0;
  useEffect(() => {
    if (!ready || !takeHint()) return;
    const vw = Math.max(0, W - L - R), sl = vw / Math.min(10, n), end = Math.max(0, sl * n - vw);
    const t1 = setTimeout(() => setHint(true), 1000);
    const t2 = setTimeout(() => scroller.current?.scrollTo({ x: Math.max(0, end - sl * 2.5), animated: true }), 1350);
    const t3 = setTimeout(() => scroller.current?.scrollToEnd({ animated: true }), 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);
  if (attempts.length < 2 && ARC && fill) {
    // Main site, home: the empty chart (its dashed pass line on a faint plot) with a word on when it fills in, Mojtaba asked.
    return (
      <View style={{ flex: 1, minHeight: minH, gap: 8 }}>
        <View pointerEvents="none" style={{ flex: 1, borderRadius: 6, backgroundColor: c.forest + '10' }}>
          <View style={{ position: 'absolute', left: 0, right: 0, top: '30%', borderTopWidth: 1, borderStyle: 'dashed', borderColor: c.faint }} />
        </View>
        {/* Where the dates go once there are attempts. */}
        <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20, textAlign: 'center' }}>بعد از حداقل دو آزمون، نمودار پیشرفت به‌روز می‌شود.</T>
      </View>
    );
  }
  if (attempts.length < 2) {
    // Nothing to draw yet: say so, with a button to the exam tab.
    return (
      <View style={[{ alignItems: 'center', justifyContent: 'center', gap: 14, paddingVertical: 20 }, fill && { flex: 1 }]}>
        <T style={{ color: c.muted, fontSize: 12.5, textAlign: 'center' }}>بعد از حداقل ۲ آزمون، نمودار پیشرفت اینجا نمایش داده می‌شود.</T>
        {/* On the main site the theme's call to action, as home's and the exam's other start buttons (ArcButton). */}
        {ARC ? <ArcButton label="شروع آزمون" onPress={() => router.navigate('/exam')} icon="play" />
          : <Button label="شروع آزمون" onPress={() => router.navigate('/exam')} icon="play" />}
      </View>
    );
  }
  const data = attempts.slice(-200), offset = attempts.length - data.length;
  // Ten attempts fill the width; older ones lie to the left, reached by dragging the bars (it opens at the newest).
  const VIEW = 10, VW = Math.max(0, W - L - R);
  // ARC: the first and last points sit on the edges, so the line runs the full width.
  const slot = ARC ? VW / Math.max(1, Math.min(VIEW, data.length) - 1) : VW / Math.min(VIEW, data.length);
  const CW = ARC ? slot * (data.length - 1) : slot * data.length, bw = Math.max(4, Math.min(34, slot * 0.66));
  const DOT = ARC ? 4 : 5;   // the points' radius (10 across), with a ring in the card's colour
  const x = (i: number) => (ARC ? slot * i : slot * (i + 0.5));
  // ARC: the scale starts a little under the lowest score (in tens, at most 60%), so the line uses the card's height.
  const lo = ARC ? Math.max(0, Math.min(60, Math.floor((Math.min(...data.map(a => pctOf(a) * 100)) - 15) / 10) * 10)) : 0;
  const y = (v: number) => TOP + (1 - (v - lo) / (100 - lo)) * (H - TOP - B);
  const tops = data.map(a => y(lo + (pctOf(a) * 100 - lo) * grow));
  const good = (a: Attempt) => isPass(a) || pctOf(a) >= 0.8;
  // The line through the points, smooth: each step a curve leaving and reaching its points level, so it never swings
  // above or below them; the area under it down to 0%.
  const line = data.map((_, i) => (i === 0 ? `M${x(0)} ${tops[0]}` : `C${(x(i - 1) + x(i)) / 2} ${tops[i - 1]} ${(x(i - 1) + x(i)) / 2} ${tops[i]} ${x(i)} ${tops[i]}`)).join(' ');
  const area = `${line} L${x(data.length - 1)} ${y(lo)} L${x(0)} ${y(lo)} Z`;
  const every = ARC ? Math.max(1, Math.ceil(90 / slot)) : slot >= 26 ? 1 : 2;
  const ticks = H < 150 ? [0, 50, 100] : [0, 20, 40, 60, 80, 100];
  const font = RTL ? 'Vazirmatn-400' : 'Inter-400';
  const a = sel != null ? data[sel] : null;
  return (
    <View style={fill ? { flex: 1, gap: 8 } : { gap: 10 }}>
      <View onLayout={e => { setW(e.nativeEvent.layout.width); if (fill) setFillH(e.nativeEvent.layout.height); }}
        style={[fill ? { flex: 1, minHeight: minH } : { height: H }, { flexDirection: 'row', direction: 'ltr' } as any]}
        accessibilityRole="image" accessibilityLabel="نمودار نمره‌ی آزمون‌ها">
        {W > 0 ? (
          /* Main site: laid over the box, so the box (and the chart's height) can also shrink when the home page gets denser. */
          <View style={abs ? { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', direction: 'ltr' } as any : { flex: 1, flexDirection: 'row', direction: 'ltr' } as any}>
            {/* The percent scale stays put on the left. */}
            {ARC ? null : <Svg width={L} height={H} pointerEvents="none">
              {ticks.map(v => (
                <SvgText key={`t${v}`} x={L - 8} y={y(v) + 4} fill={c.muted} fontSize={11} fontFamily={font} textAnchor="end">{`${faNum(v)}${RTL ? '٪' : '%'}`}</SvgText>
              ))}
            </Svg>}
            <ScrollView ref={scroller} horizontal showsHorizontalScrollIndicator={false} style={{ width: VW, flexGrow: 0, flexShrink: 0, direction: 'ltr' } as any}
              onContentSizeChange={() => scroller.current?.scrollToEnd({ animated: false })} onScrollBeginDrag={() => setHint(false)}>
              {/* ARC: clipped, so the edge points' tap areas do not widen the scroll past the line's end. */}
              <View style={{ width: CW, height: H, overflow: ARC ? 'hidden' : 'visible' }}>
                {/* A tap between the bars clears the pick. */}
                <Pressable onPress={() => setSel(null)} style={{ position: 'absolute', left: 0, top: 0, width: CW, height: H }} />
                <Svg width={CW} height={H} pointerEvents="none">
                  {ARC ? null : ticks.map(v => <Line key={v} x1={0} x2={CW} y1={y(v)} y2={y(v)} stroke={c.line} strokeWidth={1} />)}
                  <Defs>
                    <LinearGradient id="pcArea" x1="0" y1={String(TOP)} x2="0" y2={String(y(0))} gradientUnits="userSpaceOnUse">
                      <Stop offset="0" stopColor={c.forest} stopOpacity={0.32} />
                      <Stop offset="1" stopColor={c.forest} stopOpacity={0} />
                    </LinearGradient>
                  </Defs>
                  {ARC ? <>
                    <Path d={area} fill={c.forest} fillOpacity={0.13} />
                    <Line x1={0} x2={CW} y1={y(80)} y2={y(80)} stroke={c.faint} strokeOpacity={0.8} strokeWidth={1} strokeDasharray="4 4" />
                    <Path d={line} fill="none" stroke={c.cta} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" strokeOpacity={sel == null ? 1 : 0.6} />
                  </> : <>
                    <Path d={area} fill="url(#pcArea)" />
                    <Path d={line} fill="none" stroke={c.faint} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeOpacity={sel == null ? 1 : 0.5} />
                  </>}
                  {/* ARC: a green point on each passed attempt (or 80% and over), a red one on the others. */}
                  {ARC ? data.map((d, i) => (
                    <Circle key={i} cx={x(i)} cy={tops[i]} r={sel === i ? DOT + 2 : DOT} fill={good(d) ? c.ok : c.bad} stroke={c.surface} strokeWidth={2} />))
                  /* The points: green for a pass, grey below it; the picked one larger, the others fade a little. */
                  : data.map((d, i) => (
                    <Circle key={i} cx={x(i)} cy={tops[i]} r={sel === i ? DOT + 2 : DOT} fill={good(d) ? c.forest : sel === i ? c.muted : c.faint}
                      stroke={c.surface} strokeWidth={2} fillOpacity={sel == null || sel === i ? 1 : 0.4} />
                  ))}
                  {/* The picked point's percent above it. */}
                  {sel != null && data[sel] ? (
                    <SvgText x={x(sel)} y={Math.max(11, tops[sel] - DOT - 8)} fill={c.text} fontSize={12} fontWeight="700" fontFamily="Vazirmatn-700" textAnchor="middle">
                      {`${faNum(Math.round(pctOf(data[sel]) * 100))}${RTL ? '٪' : '%'}`}
                    </SvgText>
                  ) : null}
                  {ARC ? null : <Line x1={0} x2={CW} y1={y(80)} y2={y(80)} stroke={c.forest} strokeOpacity={0.7} strokeWidth={1.5} strokeDasharray="5 5" />}
                  {/* ARC: dates under the line, the newest at the right edge and the oldest in view at the left. */}
                  {data.map((d, i) => ((data.length - 1 - i) % every === 0 && !(ARC && i > 0 && Math.abs(x(i) - (CW - VW)) < 36)
                    ? <SvgText key={`x${i}`} x={ARC ? Math.min(CW - 36, Math.max(36, x(i))) : x(i)} y={H - 6} fill={c.muted} fontSize={11} fontFamily={font}
                        textAnchor="middle">{ARC ? fmtDate(d.at) : faNum(i + 1 + offset)}</SvgText>
                    : null))}
                </Svg>
                {/* A tap on an attempt's column (around its point) picks it (a drag scrolls instead). */}
                {data.map((_, i) => (
                  <Pressable key={`p${i}`} onPress={() => { tap(); setSel(sel === i ? null : i); }} accessibilityLabel={`آزمون ${faNum(i + 1 + offset)}`}
                    style={{ position: 'absolute', left: x(i) - Math.max(bw / 2 + 4, 14), top: Math.max(0, tops[i] - 18), width: Math.max(bw + 8, 28), height: H - Math.max(0, tops[i] - 18) }} />
                ))}
              </View>
            </ScrollView>
            {/* Main site: no «حد قبولی ۸۰٪» under the dashed line (the legend names it), Mojtaba asked. */}
            <ScrollHint run={hint} onDone={hideHint} />
          </View>
        ) : null}
      </View>
      {fill && noHint && !a ? null : fill ? (
        // Fitted to the screen: one fixed line, so the chart keeps its height when an attempt is picked.
        <View style={{ height: 40, justifyContent: 'center' }}>
          {a ? (
            <Pressable onPress={() => onOpen(a)} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, height: 40, paddingHorizontal: 12, borderRadius: 10, backgroundColor: c.surface2 }}>
                <T style={{ flex: 1, fontSize: 13 }} numberOfLines={1}>
                  <T style={{ fontSize: 13, fontWeight: '700' }}>آزمون {faNum(sel! + 1 + offset)}</T>
                  {'، '}{isFull(a) ? <>{`${faNum(scoreOf(a))}/${faNum(a.items.length)} `}{verdict(a)}</> : `${faNum(Math.round(pctOf(a) * 100))}٪ درست`}، {fmtDate(a.at)}
                </T>
                <T style={{ color: c.text, fontWeight: '700', fontSize: 13 }}>مرور</T><Icon name="chevronLeft" size={14} color={c.text} weight="semibold" />
              </View>
            </Pressable>
          ) : <T style={{ color: c.muted, fontSize: 12.5, textAlign: 'center' }}>برای دیدن جزئیات هر آزمون، روی نمودار بزنید.</T>}
        </View>
      ) : a ? (
        <Pressable onPress={() => onOpen(a)} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 10, backgroundColor: c.surface2 }}>
            <View style={{ flex: 1 }}>
              <T style={{ fontWeight: '700' }}>آزمون {faNum(sel! + 1 + offset)}: {modeName(a)}</T>
              <T style={{ color: c.muted, fontSize: 13 }}>
                {fmtDate(a.at)}، {isFull(a) ? <>{`نمره ${faNum(scoreOf(a))}/${faNum(a.items.length)}، `}{verdict(a)}</> : `${faNum(a.items.length)} سؤالی، ${faNum(Math.round(pctOf(a) * 100))}٪ درست`}
              </T>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}><T style={{ color: c.text, fontWeight: '700' }}>مرور</T><Icon name="chevronLeft" size={15} color={c.text} weight="semibold" /></View>
          </View>
        </Pressable>
      ) : <T style={{ color: c.muted, fontSize: 12.5, textAlign: 'center' }}>برای دیدن جزئیات هر آزمون، روی نمودار بزنید.</T>}
    </View>
  );
}
