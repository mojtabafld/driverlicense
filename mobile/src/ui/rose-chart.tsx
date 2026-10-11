// The home page's progress chart in the rose look (theme.ts), after the reference's health record: no card, laid on the
// glow itself. A thick smooth white line through the percent of each attempt (fading in from its left end, a soft white
// haze under it), the 80% pass line dashed, the scale on the right and the attempts' numbers under it (the newest
// darker). The newest attempt ends the line in a white knob in a halo, its percent beside it in large light numerals and
// its change from the attempt before under that. Ten attempts fill the width; older ones are reached by dragging (it
// opens at the newest). A tap on an attempt picks it (a white point and its percent); its details and a review button
// show in the line under the chart. Fills the height it is given, at least `minH`.
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Svg, { Circle, Defs, Line, LinearGradient, Path, Stop, Text as SvgText } from 'react-native-svg';

import type { Attempt } from '@/lib/bank';
import { faNum, fmtDate, isFull, isPass, pctOf, scoreOf } from '@/lib/logic';
import { Icon } from './icon';
import { L, T, pillGlass, tap, useCountUp } from './kit';
import { useColors, useIsDark } from './theme';

// AX: the scale's width; PAD: room right of the newest point for its percent, as the reference's «84 +17%».
const AX = 30, PAD = 58, TOP = 22, B = 26, VIEW = 10;

export function RoseChart({ attempts, onOpen, sel, onSel, minH = 120 }: { attempts: Attempt[]; onOpen: (a: Attempt) => void; sel: number | null; onSel: (i: number | null) => void; minH?: number }) {
  const c = useColors(), dark = useIsDark();
  const [W, setW] = useState(0), [H0, setH] = useState(0);
  const H = Math.max(H0, minH);
  const scroller = useRef<ScrollView>(null);
  const grow = useCountUp(1, 1000);
  const data = attempts.slice(-200), offset = attempts.length - data.length, n = data.length;
  useEffect(() => { scroller.current?.scrollToEnd({ animated: false }); }, [W, n]);
  const VW = Math.max(0, W - AX), slot = (VW - PAD) / Math.min(VIEW, Math.max(n, 2)), CW = Math.max(VW, slot * n + PAD);
  const x = (i: number) => slot * (i + 0.5);
  // The scale starts 20 below the lowest attempt shown (in steps of 20, at most 60), so the line uses the height.
  const lo = Math.min(60, Math.max(0, Math.floor((Math.min(100, ...data.map(a => pctOf(a) * 100)) - 10) / 20) * 20));
  const y = (v: number) => TOP + (1 - (v - lo) / (100 - lo)) * (H - TOP - B);
  const tops = data.map(a => y(lo + (pctOf(a) * 100 - lo) * grow));
  const line = data.map((_, i) => (i === 0 ? `M${x(0)} ${tops[0]}` : `C${(x(i - 1) + x(i)) / 2} ${tops[i - 1]} ${(x(i - 1) + x(i)) / 2} ${tops[i]} ${x(i)} ${tops[i]}`)).join(' ');
  const area = n ? `${line} L${x(n - 1)} ${y(lo)} L${x(0)} ${y(lo)} Z` : '';
  const ticks = [0, 20, 40, 60, 80, 100].filter(v => v >= lo && (H >= 150 || v % 40 === lo % 40 || v === 100));
  const last = n - 1, lastPct = n ? Math.round(pctOf(data[last]) * 100) : 0;
  const delta = n > 1 ? lastPct - Math.round(pctOf(data[last - 1]) * 100) : null;
  const a = sel != null ? data[sel] ?? null : null;
  const every = slot >= 26 ? 1 : 2;
  const ink = c.topInk, label = dark ? 'rgba(255,255,255,0.55)' : 'rgba(60,20,28,0.5)';
  return (
    <View style={{ flex: 1, gap: 6 }}>
      <View onLayout={e => { setW(e.nativeEvent.layout.width); setH(e.nativeEvent.layout.height); }} style={{ flex: 1, minHeight: minH }}
        accessibilityRole="image" accessibilityLabel="نمودار نمره‌ی آزمون‌ها">
        {W > 0 && n ? (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', direction: 'ltr' } as any}>
            <ScrollView ref={scroller} horizontal showsHorizontalScrollIndicator={false} style={{ width: VW, flexGrow: 0, flexShrink: 0, direction: 'ltr' } as any}
              onContentSizeChange={() => scroller.current?.scrollToEnd({ animated: false })}>
              <View style={{ width: CW, height: H }}>
                <Pressable onPress={() => onSel(null)} style={{ position: 'absolute', left: 0, top: 0, width: CW, height: H }} />
                <Svg width={CW} height={H} pointerEvents="none">
                  <Defs>
                    <LinearGradient id="rcHaze" x1="0" y1={String(TOP)} x2="0" y2={String(y(lo))} gradientUnits="userSpaceOnUse">
                      <Stop offset="0" stopColor="#ffffff" stopOpacity={dark ? 0.09 : 0.32} />
                      <Stop offset="1" stopColor="#ffffff" stopOpacity={0} />
                    </LinearGradient>
                    {/* The line fades in from its left end, as the reference's. */}
                    <LinearGradient id="rcLine" x1="0" y1="0" x2={String(Math.max(1, x(Math.min(n - 1, 2))))} y2="0" gradientUnits="userSpaceOnUse">
                      <Stop offset="0" stopColor="#ffffff" stopOpacity={0.25} />
                      <Stop offset="1" stopColor="#ffffff" stopOpacity={1} />
                    </LinearGradient>
                  </Defs>
                  <Line x1={0} x2={CW} y1={y(80)} y2={y(80)} stroke="#ffffff" strokeOpacity={0.6} strokeWidth={1.2} strokeDasharray="4 6" />
                  {n > 1 ? <Path d={area} fill="url(#rcHaze)" /> : null}
                  {n > 1 ? <Path d={line} fill="none" stroke="url(#rcLine)" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" strokeOpacity={sel == null ? 1 : 0.6} /> : null}
                  {/* The picked attempt: a white point (the newest keeps its knob). */}
                  {sel != null && sel !== last && data[sel] ? <Circle cx={x(sel)} cy={tops[sel]} r={6} fill="#ffffff" stroke={c.accent} strokeWidth={2.5} /> : null}
                  {sel != null && sel !== last && data[sel] ? (
                    <SvgText x={x(sel)} y={Math.max(12, tops[sel] - 12)} fill={ink} fontSize={13} fontFamily="Inter-500" textAnchor="middle">{`${Math.round(pctOf(data[sel]) * 100)}%`}</SvgText>
                  ) : null}
                  {/* The newest: a white knob in a soft halo. */}
                  <Circle cx={x(last)} cy={tops[last]} r={15} fill="#ffffff" fillOpacity={0.28} />
                  <Circle cx={x(last)} cy={tops[last]} r={6.5} fill="#ffffff" />
                  {data.map((_, i) => ((last - i) % every === 0
                    ? <SvgText key={`x${i}`} x={x(i)} y={H - 7} fill={i === last ? c.text : label} fontSize={11.5} fontFamily={i === last ? 'Inter-500' : 'Inter-400'} textAnchor="middle">{String(i + 1 + offset)}</SvgText>
                    : null))}
                </Svg>
                {/* The newest's percent and its change, right of the knob. */}
                <View pointerEvents="none" style={{ position: 'absolute', left: x(last) + 16, width: PAD - 10, top: Math.max(0, Math.min(H - B - 52, tops[last] - 26)), alignItems: 'flex-start' }}>
                  <L style={{ fontSize: 30, lineHeight: 36, fontWeight: '300', color: ink, letterSpacing: -0.8 }}>{String(lastPct)}</L>
                  {delta != null ? <L style={{ fontSize: 11.5, lineHeight: 16, color: ink, opacity: 0.85 }}>{`${delta >= 0 ? '+' : '−'}${Math.abs(delta)}%`}</L> : null}
                </View>
                {data.map((_, i) => (
                  <Pressable key={`p${i}`} onPress={() => { tap(); onSel(sel === i ? null : i); }} accessibilityLabel={`آزمون ${faNum(i + 1 + offset)}`}
                    style={{ position: 'absolute', left: x(i) - Math.max(slot / 2, 14), top: Math.max(0, tops[i] - 20), width: Math.max(slot, 28), height: H - Math.max(0, tops[i] - 20) }} />
                ))}
              </View>
            </ScrollView>
            {/* The scale on the right. */}
            <Svg width={AX} height={H} pointerEvents="none">
              {ticks.map(v => <SvgText key={v} x={AX - 2} y={y(v) + 4} fill={label} fontSize={11} fontFamily="Inter-400" textAnchor="end">{String(v)}</SvgText>)}
            </Svg>
          </View>
        ) : null}
      </View>
      {/* The picked attempt in a white glass pill with its review; else how to pick one. */}
      <View style={{ height: 38, justifyContent: 'center' }}>
        {a ? (
          <Pressable onPress={() => onOpen(a)} style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}>
            <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 8, height: 38, paddingHorizontal: 14, borderRadius: 19, borderWidth: 1 }, pillGlass(dark)]}>
              <T style={{ flex: 1, fontSize: 13 }} numberOfLines={1}>
                <T style={{ fontSize: 13, fontWeight: '500' }}>آزمون {faNum(sel! + 1 + offset)}</T>
                {'، '}{isFull(a) ? <>{`${faNum(scoreOf(a))}/${faNum(a.items.length)} `}<T style={{ fontSize: 13, fontWeight: '500', color: isPass(a) ? c.ok : c.bad }}>{isPass(a) ? 'قبول' : 'مردود'}</T></> : `${faNum(Math.round(pctOf(a) * 100))}٪ درست`}، {fmtDate(a.at)}
              </T>
              <T style={{ color: c.text, fontWeight: '500', fontSize: 13 }}>مرور</T><Icon name="chevronLeft" size={14} color={c.text} />
            </View>
          </Pressable>
        ) : <T style={{ color: c.muted, fontSize: 12, textAlign: 'center' }}>برای دیدن جزئیات هر آزمون، روی نمودار بزنید.</T>}
      </View>
    </View>
  );
}
