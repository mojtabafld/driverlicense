// Progress chart, «نمودار پیشرفت»: a bar for the percent correct of each attempt, ten across the width and older ones
// by dragging the bars (it opens at the newest); green when the attempt passed or reached 80%, else a neutral grey, with
// the 80% pass line; the bars grow in when it opens. Tap a bar to pick that attempt; its details and a review button
// show below. With `fill` it takes the height of the space it is given (the home screen fits the screen without scrolling).
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Svg, { Line, Path, Text as SvgText } from 'react-native-svg';

import { faNum, fmtDate, isFull, isPass, pctOf, scoreOf } from '@/lib/logic';
import type { Attempt } from '@/lib/bank';
import { Icon } from './icon';
import { Button, T, tap, useCountUp } from './kit';
import { useColors } from './theme';

const L = 38, R = 12, TOP = 14, B = 24;
const modeName = (a: Attempt) => (a.mode === 'lesson' ? 'درس' : a.mode === 'mistakes' ? 'تمرین اشتباهات' : a.mode === 'sections' ? 'آموزش دسته‌بندی' : 'آزمون تصادفی');

// `sel` / `onSel`: the picked attempt, when the page holds it (so a tap elsewhere in its card can clear it).
export function ProgressChart({ attempts, onOpen, fill, sel: selOut, onSel }: { attempts: Attempt[]; onOpen: (a: Attempt) => void; fill?: boolean; sel?: number | null; onSel?: (i: number | null) => void }) {
  const c = useColors();
  // «قبول» in green / «مردود» in red, only the word, for the picked exam.
  const verdict = (a: Attempt) => <T style={{ fontSize: 13, fontWeight: '700', color: isPass(a) ? c.ok : c.bad }}>{isPass(a) ? 'قبول' : 'مردود'}</T>;
  const [W, setW] = useState(0), [fillH, setFillH] = useState(0);
  const H = fill ? Math.max(fillH, 60) : 210;
  const [selIn, setSelIn] = useState<number | null>(null);
  const sel = onSel ? selOut ?? null : selIn, setSel = onSel ?? setSelIn;
  const scroller = useRef<ScrollView>(null);
  const grow = useCountUp(1, 900);
  if (attempts.length < 2) {
    // Nothing to draw yet: say so, with a button to the exam tab.
    return (
      <View style={[{ alignItems: 'center', justifyContent: 'center', gap: 14, paddingVertical: 20 }, fill && { flex: 1 }]}>
        <T style={{ color: c.muted, fontSize: 13.5, textAlign: 'center' }}>بعد از حداقل ۲ آزمون، نمودار پیشرفت اینجا نمایش داده می‌شود.</T>
        <Button label="شروع آزمون" onPress={() => router.navigate('/exam')} icon="play" />
      </View>
    );
  }
  const data = attempts.slice(-200), offset = attempts.length - data.length;
  // Ten attempts fill the width; older ones lie to the left, reached by dragging the bars (it opens at the newest).
  const VIEW = 10, VW = Math.max(0, W - L - R);
  const slot = VW / Math.min(VIEW, data.length), CW = slot * data.length, bw = Math.max(4, Math.min(34, slot * 0.66));
  const x = (i: number) => slot * (i + 0.5);
  const y = (v: number) => TOP + (1 - v / 100) * (H - TOP - B);
  const tops = data.map(a => y(pctOf(a) * 100 * grow));
  const good = (a: Attempt) => isPass(a) || pctOf(a) >= 0.8;
  // A bar with rounded top corners from the baseline up to its value.
  const bar = (cx: number, top: number) => {
    const l = cx - bw / 2, r = cx + bw / 2, b = y(0), rr = Math.min(5, bw / 2, Math.max(0, b - top));
    return `M${l} ${b} L${l} ${top + rr} Q${l} ${top} ${l + rr} ${top} L${r - rr} ${top} Q${r} ${top} ${r} ${top + rr} L${r} ${b} Z`;
  };
  const every = slot >= 26 ? 1 : 2;
  const ticks = H < 150 ? [0, 50, 100] : [0, 20, 40, 60, 80, 100];
  const font = 'Vazirmatn-400';
  const a = sel != null ? data[sel] : null;
  return (
    <View style={fill ? { flex: 1, gap: 8 } : { gap: 10 }}>
      <View onLayout={e => { setW(e.nativeEvent.layout.width); if (fill) setFillH(e.nativeEvent.layout.height); }}
        style={[fill ? { flex: 1, minHeight: 60 } : { height: H }, { flexDirection: 'row', direction: 'ltr' } as any]}
        accessibilityRole="image" accessibilityLabel="نمودار نمره‌ی آزمون‌ها">
        {W > 0 ? (
          <>
            {/* The percent scale stays put on the left. */}
            <Svg width={L} height={H} pointerEvents="none">
              {ticks.map(v => (
                <SvgText key={`t${v}`} x={L - 8} y={y(v) + 4} fill={c.muted} fontSize={11} fontFamily={font} textAnchor="end">{`${faNum(v)}٪`}</SvgText>
              ))}
            </Svg>
            <ScrollView ref={scroller} horizontal showsHorizontalScrollIndicator={false} style={{ width: VW, flexGrow: 0, flexShrink: 0, direction: 'ltr' } as any}
              onContentSizeChange={() => scroller.current?.scrollToEnd({ animated: false })}>
              <View style={{ width: CW, height: H }}>
                {/* A tap between the bars clears the pick. */}
                <Pressable onPress={() => setSel(null)} style={{ position: 'absolute', left: 0, top: 0, width: CW, height: H }} />
                <Svg width={CW} height={H} pointerEvents="none">
                  {ticks.map(v => <Line key={v} x1={0} x2={CW} y1={y(v)} y2={y(v)} stroke={c.line} strokeWidth={1} />)}
                  {/* The picked bar stays full strength, the others fade a little. */}
                  {data.map((d, i) => (
                    <Path key={i} d={bar(x(i), tops[i])} fill={good(d) ? c.forest : sel === i ? c.muted : c.faint}
                      fillOpacity={sel === i ? 1 : (good(d) ? 1 : 0.55) * (sel == null ? 1 : 0.3)} />
                  ))}
                  {/* The picked bar: full strength (a grey one darker) with its percent above it. */}
                  {sel != null && data[sel] ? (
                    <SvgText x={x(sel)} y={Math.max(11, tops[sel] - 6)} fill={c.text} fontSize={12} fontWeight="700" fontFamily="Vazirmatn-700" textAnchor="middle">
                      {`${faNum(Math.round(pctOf(data[sel]) * 100))}٪`}
                    </SvgText>
                  ) : null}
                  <Line x1={0} x2={CW} y1={y(80)} y2={y(80)} stroke={c.forest} strokeWidth={1.5} strokeDasharray="5 5" />
                  {data.map((_, i) => ((data.length - 1 - i) % every === 0
                    ? <SvgText key={`x${i}`} x={x(i)} y={H - 6} fill={c.muted} fontSize={11} fontFamily={font} textAnchor="middle">{faNum(i + 1 + offset)}</SvgText>
                    : null))}
                </Svg>
                {/* A tap on an attempt's column picks it (a drag scrolls instead). */}
                {data.map((_, i) => (
                  <Pressable key={`p${i}`} onPress={() => { tap(); setSel(sel === i ? null : i); }} accessibilityLabel={`آزمون ${faNum(i + 1 + offset)}`}
                    style={{ position: 'absolute', left: x(i) - Math.max(bw / 2 + 4, 14), top: Math.max(0, tops[i] - 18), width: Math.max(bw + 8, 28), height: H - Math.max(0, tops[i] - 18) }} />
                ))}
              </View>
            </ScrollView>
          </>
        ) : null}
      </View>
      {fill ? (
        // Fitted to the screen: one fixed line, so the chart keeps its height when an attempt is picked.
        <View style={{ height: 40, justifyContent: 'center' }}>
          {a ? (
            <Pressable onPress={() => onOpen(a)} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, height: 40, paddingHorizontal: 12, borderRadius: 10, backgroundColor: c.surface2 }}>
                <T style={{ flex: 1, fontSize: 13 }} numberOfLines={1}>
                  <T style={{ fontSize: 13, fontWeight: '700' }}>آزمون {faNum(sel! + 1 + offset)}</T>
                  {' · '}{isFull(a) ? <>{`${faNum(scoreOf(a))}/${faNum(a.items.length)} `}{verdict(a)}</> : `${faNum(Math.round(pctOf(a) * 100))}٪ درست`} · {fmtDate(a.at)}
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
              <T style={{ fontWeight: '700' }}>آزمون {faNum(sel! + 1 + offset)} · {modeName(a)}</T>
              <T style={{ color: c.muted, fontSize: 13 }}>
                {fmtDate(a.at)} · {isFull(a) ? <>{`نمره ${faNum(scoreOf(a))}/${faNum(a.items.length)} · `}{verdict(a)}</> : `${faNum(a.items.length)} سؤالی · ${faNum(Math.round(pctOf(a) * 100))}٪ درست`}
              </T>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}><T style={{ color: c.text, fontWeight: '700' }}>مرور</T><Icon name="chevronLeft" size={15} color={c.text} weight="semibold" /></View>
          </View>
        </Pressable>
      ) : <T style={{ color: c.muted, fontSize: 12.5, textAlign: 'center' }}>برای دیدن جزئیات هر آزمون، روی نمودار بزنید.</T>}
    </View>
  );
}
