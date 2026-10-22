// Progress chart, «نمودار پیشرفت»: a point for the percent correct of each attempt on a smooth grey line (light grey in
// the light theme, dark grey in the dark one) with a soft green gradient under it, ten across the width and older ones
// by dragging (it opens at the newest); a point is green when the
// attempt passed or reached 80%, else grey, with the 80% pass line; when it opens the line draws itself from left to
// right across the view, its fill and points following it (as Cloudflare's charts do, Mojtaba asked), once per app start. Tap a point to pick
// that attempt (the newest is picked until another is); its details and a review button show below. With `fill` it takes the height of the space it is given,
// at least FILL_MIN (the home screen fits above the tab bar; only a very short screen scrolls a little).
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';
import Svg, { Circle, ClipPath, Defs, G, Line, LinearGradient, Path, Rect, Stop, Text as SvgText } from 'react-native-svg';

import { RTL, tr } from '@/lib/i18n';
import { faNum, fmtDate, isFull, isPass, pctOf, scoreOf } from '@/lib/logic';
import type { Attempt } from '@/lib/bank';
import { Icon } from './icon';
import { Marquee } from './marquee';
import { ArcButton, Button, T, tap, useCountUp } from './kit';
import { ARC, useColors } from './theme';

// The main site (ARC) draws it flat, as a cash-forecast card: no percent scale or grid, the green line edge to edge
// over a soft green fill, the pass line dashed grey with its label, green points on passed attempts and red on failed ones, dates below.
const L = ARC ? 0 : 38, R = ARC ? 0 : 12, TOP = ARC ? 22 : 14, B = 24, FILL_MIN = 120;
// The line drew itself in already since the app started.
let drawnOnce = false;
// (The app's own random exam, mode 'new', is «آزمون تصادفی» too since it took the old one's place; Mojtaba 2026-10-19.)
const modeName = (a: Attempt) => (a.mode === 'lesson' ? 'درس' : a.mode === 'mistakes' ? 'تمرین اشتباهات' : a.mode === 'sections' ? 'آموزش دسته‌بندی' : 'آزمون تصادفی');

// `sel` / `onSel`: the picked attempt, when the page holds it (so a tap elsewhere in its card can clear it).
// `minH`: with `fill`, the chart's least height (FILL_MIN unless given).
// `noHint`: with `fill`, the line under the chart shows only for a picked attempt (no «tap the chart» hint), for small screens.
// `noNote`: the empty chart without its line under it (home's chart view on a very short screen, Mojtaba 2026-10-19).
// `onBlank`: a tap on the chart off its points does this instead of clearing the pick (home: it opens or closes its chart
// view, and the picked test stays picked; Mojtaba 2026-10-19).
export function ProgressChart({ attempts, onOpen, fill, sel: selOut, onSel, minH = FILL_MIN, noHint, noNote, onBlank }: { attempts: Attempt[]; onOpen: (a: Attempt) => void; fill?: boolean; sel?: number | null; onSel?: (i: number | null) => void; minH?: number; noHint?: boolean; noNote?: boolean; onBlank?: () => void }) {
  const c = useColors();
  // «قبول» in green / «مردود» in red, only the word, for the picked exam.
  const verdict = (a: Attempt) => <T style={{ fontSize: 13, fontWeight: '700', color: isPass(a) ? c.ok : c.bad }}>{isPass(a) ? 'قبول' : 'مردود'}</T>;
  const [W, setW] = useState(0), [fillH, setFillH] = useState(0);
  const abs = !!fill && ARC;
  const H = fill ? Math.max(fillH, minH) : 210;
  const [selIn, setSelIn] = useState<number | null>(null);
  const chosen = onSel ? selOut ?? null : selIn, setSel = onSel ?? setSelIn;
  const scroller = useRef<ScrollView>(null);
  // The width the chart was last scrolled to the newest at: only a new width (more tests, another screen) scrolls there
  // again, not a new height (home's chart view grows the chart; it kept jumping back to the newest test).
  const endW = useRef(-1);
  // How far the line has drawn itself across the view, 0 to 1: drawn in once per app start (after signing in), and
  // whole at once when the chart is shown again (moving between pages), Mojtaba asked.
  // (The page stays mounted under the tabs and its width drops to 0 while hidden, so once started it does not go back.)
  // It starts only once the line itself is there (two attempts or more) and measured, a moment after: on Android the
  // attempts can come in after the page (and the splash) first shows, and it had drawn itself under the empty chart
  // already (Mojtaba 2026-10-18: no animation in the Android app).
  const [instant] = useState(() => drawnOnce);
  const [go, setGo] = useState(false);
  const shown = W > 0 && attempts.length >= 2;
  useEffect(() => {
    if (!shown || go) return;
    const t = setTimeout(() => { setGo(true); drawnOnce = true; }, Platform.OS === 'web' ? 0 : 350);
    return () => clearTimeout(t);
  }, [shown, go]);
  const anim = useCountUp(go && !instant ? 1 : 0, 1400), draw = instant ? 1 : anim;
  // The box's size. A zero width (the page hidden under another) is ignored. The empty chart measures too, so the
  // chart that replaces it after a test handed in elsewhere has its size at once: its own first layout comes while
  // home is hidden, and the browser gives no new one when home shows again (Mojtaba 2026-10-17: it stayed blank).
  const measure = (e: { nativeEvent: { layout: { width: number; height: number } } }) => {
    const { width, height } = e.nativeEvent.layout;
    if (width <= 0) return;
    setW(width); if (fill) setFillH(height);
  };
  if (attempts.length < 2 && ARC && fill) {
    // Main site, home: the empty chart (its dashed pass line on a faint plot) with a word on when it fills in, Mojtaba asked.
    return (
      <View style={{ flex: 1, minHeight: minH, gap: 8 }}>
        <View pointerEvents="none" onLayout={measure} style={{ flex: 1, borderRadius: 6, backgroundColor: c.forest + '10' }}>
          <View style={{ position: 'absolute', left: 0, right: 0, top: '30%', borderTopWidth: 1, borderStyle: 'dashed', borderColor: c.faint }} />
        </View>
        {/* Where the dates go once there are attempts (not with `noNote`). */}
        {noNote ? null : <T numberOfLines={1} style={{ color: c.muted, fontSize: 12, lineHeight: 19, textAlign: 'center' }}>نمودار بعد از حداقل دو آزمون به‌روز می‌شود.</T>}
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
  // The picked attempt: the newest one unless another is picked (Mojtaba 2026-10-18), so the chart always shows one; a
  // tap that clears the pick goes back to the newest.
  const sel = chosen != null && chosen < data.length ? chosen : data.length ? data.length - 1 : null;
  // Ten attempts fill the width; older ones lie to the left, reached by dragging the bars (it opens at the newest).
  const VIEW = 10, VW = Math.max(0, W - L - R);
  // ARC: the first and last points sit on the edges, so the line runs the full width.
  const slot = ARC ? VW / Math.max(1, Math.min(VIEW, data.length) - 1) : VW / Math.min(VIEW, data.length);
  const CW = ARC ? slot * (data.length - 1) : slot * data.length, bw = Math.max(4, Math.min(34, slot * 0.66));
  const DOT = ARC ? 4 : 5;   // the points' radius (10 across), with a ring in the card's colour
  const x0 = (i: number) => (ARC ? slot * i : slot * (i + 0.5));
  // In every language the chart runs left to right, the oldest at the left and the newest at the right edge, where it
  // opens (Persian too, as English, Mojtaba 2026-10-22; it ran right to left in Persian before). FLIP mirrors it.
  const FLIP = false as boolean;
  const x = (i: number) => (FLIP ? CW - x0(i) : x0(i));
  // ARC: the scale starts a little under the lowest score (in tens, at most 60%), so the line uses the card's height.
  const lo = ARC ? Math.max(0, Math.min(60, Math.floor((Math.min(...data.map(a => pctOf(a) * 100)) - 15) / 10) * 10)) : 0;
  const y = (v: number) => TOP + (1 - (v - lo) / (100 - lo)) * (H - TOP - B);
  const tops = data.map(a => y(pctOf(a) * 100));
  // The drawn part ends here: the older attempts left of the view are there at once, the view fills from its left edge
  // (mirrored right to left with FLIP: the part drawn runs from the right end, `ahead` is a point not reached yet).
  const edge = Math.max(0, CW - VW) + (VW + DOT * 2 + 2) * draw;
  const ahead = (i: number) => (FLIP ? x(i) < CW - edge : x(i) > edge);
  // On Android a clip path whose rectangle changes is not drawn again (react-native-svg), so the line stayed hidden
  // while its points came in (Mojtaba 2026-10-18); the phones get a new clip, by its id, at each step instead.
  const clipId = Platform.OS === 'web' ? 'pcDraw' : `pcDraw${Math.round(edge)}`;
  const good = (a: Attempt) => isPass(a) || pctOf(a) >= 0.8;
  // The line through the points, smooth: each step a curve leaving and reaching its points level, so it never swings
  // above or below them; the area under it down to 0%.
  const line = data.map((_, i) => (i === 0 ? `M${x(0)} ${tops[0]}` : `C${(x(i - 1) + x(i)) / 2} ${tops[i - 1]} ${(x(i - 1) + x(i)) / 2} ${tops[i]} ${x(i)} ${tops[i]}`)).join(' ');
  const area = `${line} L${x(data.length - 1)} ${y(lo)} L${x(0)} ${y(lo)} Z`;
  const every = ARC ? Math.max(1, Math.ceil(90 / slot)) : slot >= 26 ? 1 : 2;
  const ticks = H < 150 ? [0, 50, 100] : [0, 20, 40, 60, 80, 100];
  const font = RTL ? 'Vazirmatn-400' : 'Inter-400';
  const a = sel != null ? data[sel] : null;
  // The picked attempt's name under the chart: «آخرین آزمون» for the newest (picked by default), else its number.
  const pickName = sel === data.length - 1 ? 'آخرین آزمون' : `آزمون ${faNum((sel ?? 0) + 1 + offset)}`;
  return (
    <View style={fill ? { flex: 1, gap: 8 } : { gap: 10 }}>
      <View onLayout={measure}
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
              onContentSizeChange={w => { if (Math.abs(w - endW.current) > 1) { endW.current = w; if (FLIP) scroller.current?.scrollTo({ x: 0, animated: false }); else scroller.current?.scrollToEnd({ animated: false }); } }}>
              {/* ARC: clipped, so the edge points' tap areas do not widen the scroll past the line's end. */}
              <View style={{ width: CW, height: H, overflow: ARC ? 'hidden' : 'visible' }}>
                {/* A tap between the bars clears the pick. */}
                <Pressable onPress={() => { if (onBlank) onBlank(); else setSel(null); }} style={{ position: 'absolute', left: 0, top: 0, width: CW, height: H }} />
                <Svg width={CW} height={H} pointerEvents="none">
                  {ARC ? null : ticks.map(v => <Line key={v} x1={0} x2={CW} y1={y(v)} y2={y(v)} stroke={c.line} strokeWidth={1} />)}
                  <Defs>
                    <LinearGradient id="pcArea" x1="0" y1={String(TOP)} x2="0" y2={String(y(0))} gradientUnits="userSpaceOnUse">
                      <Stop offset="0" stopColor={c.forest} stopOpacity={0.32} />
                      <Stop offset="1" stopColor={c.forest} stopOpacity={0} />
                    </LinearGradient>
                    {/* The part drawn so far: the line and its fill show up to `edge`. */}
                    <ClipPath id={clipId} key={clipId}><Rect x={FLIP ? CW - edge : 0} y={0} width={edge} height={H} /></ClipPath>
                  </Defs>
                  {ARC ? <Line x1={0} x2={CW} y1={y(80)} y2={y(80)} stroke={c.faint} strokeOpacity={0.8} strokeWidth={1} strokeDasharray="4 4" /> : null}
                  <G key={clipId} clipPath={`url(#${clipId})`}>
                    {ARC ? <>
                      <Path d={area} fill={c.forest} fillOpacity={0.13} />
                      <Path d={line} fill="none" stroke={c.cta} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" strokeOpacity={sel == null ? 1 : 0.6} />
                    </> : <>
                      <Path d={area} fill="url(#pcArea)" />
                      <Path d={line} fill="none" stroke={c.faint} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeOpacity={sel == null ? 1 : 0.5} />
                    </>}
                  </G>
                  {/* Each point shows once the line has reached it. */}
                  {/* ARC: a green point on each passed attempt (or 80% and over), a red one on the others. */}
                  {ARC ? data.map((d, i) => ahead(i) ? null : (
                    <Circle key={i} cx={x(i)} cy={tops[i]} r={sel === i ? DOT + 2 : DOT} fill={good(d) ? c.ok : c.bad} stroke={c.surface} strokeWidth={2} />))
                  /* The points: green for a pass, grey below it; the picked one larger, the others fade a little. */
                  : data.map((d, i) => ahead(i) ? null : (
                    <Circle key={i} cx={x(i)} cy={tops[i]} r={sel === i ? DOT + 2 : DOT} fill={good(d) ? c.forest : sel === i ? c.muted : c.faint}
                      stroke={c.surface} strokeWidth={2} fillOpacity={sel == null || sel === i ? 1 : 0.4} />
                  ))}
                  {/* The picked point's percent above it, kept inside the chart at its ends. */}
                  {sel != null && data[sel] ? (
                    <SvgText x={Math.min(CW - 16, Math.max(16, x(sel)))} y={Math.max(11, tops[sel] - DOT - 8)} fill={c.text} fontSize={12} fontWeight="700" fontFamily="Vazirmatn-700" textAnchor="middle">
                      {`${faNum(Math.round(pctOf(data[sel]) * 100))}${RTL ? '٪' : '%'}`}
                    </SvgText>
                  ) : null}
                  {ARC ? null : <Line x1={0} x2={CW} y1={y(80)} y2={y(80)} stroke={c.forest} strokeOpacity={0.7} strokeWidth={1.5} strokeDasharray="5 5" />}
                  {/* ARC: dates under the line, the newest at the right edge and the oldest in view at the left (mirrored with FLIP). */}
                  {data.map((d, i) => ((data.length - 1 - i) % every === 0 && !(ARC && i > 0 && Math.abs(x(i) - (FLIP ? VW : CW - VW)) < 36)
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
          </View>
        ) : null}
      </View>
      {fill && noHint && !a ? null : fill ? (
        // Fitted to the screen: one fixed line, so the chart keeps its height when an attempt is picked.
        <View style={{ height: 40, justifyContent: 'center' }}>
          {a ? (
            <Pressable onPress={() => onOpen(a)} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, height: 40, paddingHorizontal: 12, borderRadius: 10, backgroundColor: c.surface2 }}>
                {/* Too long for a small phone: the line glides once to show its end, then rests at its start
                    (ui/marquee.tsx; Mojtaba 2026-10-18). */}
                <Marquee once flush height={20} bg={c.surface2} style={{ fontSize: 13, lineHeight: 20 }}
                  text={[tr(pickName), isFull(a) ? `${tr(`${faNum(scoreOf(a))}/${faNum(a.items.length)}`)} ${tr(isPass(a) ? 'قبول' : 'مردود')}` : tr(`${faNum(Math.round(pctOf(a) * 100))}٪ درست`), fmtDate(a.at)].join(tr('،') + ' ')}
                  rich={<>
                    <T style={{ fontSize: 13, fontWeight: '700' }}>{pickName}</T>
                    {'، '}{isFull(a) ? <>{`${faNum(scoreOf(a))}/${faNum(a.items.length)} `}{verdict(a)}</> : `${faNum(Math.round(pctOf(a) * 100))}٪ درست`}، {fmtDate(a.at)}
                  </>} />
                <T style={{ color: c.text, fontWeight: '700', fontSize: 13 }}>مرور</T><Icon name="chevronLeft" size={14} color={c.text} weight="semibold" />
              </View>
            </Pressable>
          ) : <T style={{ color: c.muted, fontSize: 12.5, textAlign: 'center' }}>برای دیدن جزئیات هر آزمون، روی نمودار بزنید.</T>}
        </View>
      ) : a ? (
        <Pressable onPress={() => onOpen(a)} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 10, backgroundColor: c.surface2 }}>
            <View style={{ flex: 1 }}>
              <T style={{ fontWeight: '700' }}>{pickName}: {modeName(a)}</T>
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
