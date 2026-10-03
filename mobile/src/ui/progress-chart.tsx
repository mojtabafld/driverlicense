// Progress chart, like the site's «نمودار پیشرفت»: percent correct of each of the last 30 attempts, with the 80% pass
// line. Tap the chart to pick the nearest attempt; its details and a review button show below. With `fill` it takes
// the height of the space it is given (the home screen fits the screen without scrolling).
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Defs, Line, LinearGradient, Path, Stop, Text as SvgText } from 'react-native-svg';

import { faNum, fmtDate, isFull, isPass, pctOf, scoreOf } from '@/lib/logic';
import type { Attempt } from '@/lib/bank';
import { Icon } from './icon';
import { Button, T, tap } from './kit';
import { useColors } from './theme';

const L = 38, R = 12, TOP = 14, B = 24;
const modeName = (a: Attempt) => (a.mode === 'lesson' ? 'درس' : a.mode === 'mistakes' ? 'تمرین اشتباهات' : a.mode === 'sections' ? 'آموزش دسته‌بندی' : 'آزمون تصادفی');

export function ProgressChart({ attempts, onOpen, fill }: { attempts: Attempt[]; onOpen: (a: Attempt) => void; fill?: boolean }) {
  const c = useColors();
  // «قبول» in green / «مردود» in red, only the word, for the picked exam.
  const verdict = (a: Attempt) => <T style={{ fontSize: 13, fontWeight: '700', color: isPass(a) ? c.ok : c.bad }}>{isPass(a) ? 'قبول' : 'مردود'}</T>;
  const [W, setW] = useState(0), [fillH, setFillH] = useState(0);
  const H = fill ? Math.max(fillH, 60) : 210;
  const [sel, setSel] = useState<number | null>(null);
  const box = useRef<View>(null);
  if (attempts.length < 2) {
    // Nothing to draw yet: say so, with a button to the exam tab.
    return (
      <View style={[{ alignItems: 'center', justifyContent: 'center', gap: 14, paddingVertical: 20 }, fill && { flex: 1 }]}>
        <T style={{ color: c.muted, fontSize: 13.5, textAlign: 'center' }}>بعد از حداقل ۲ آزمون، نمودار پیشرفت اینجا نمایش داده می‌شود.</T>
        <Button label="شروع آزمون" onPress={() => router.navigate('/exam')} icon={<Icon name="exam" size={18} color="#fff" />} />
      </View>
    );
  }
  const data = attempts.slice(-30), offset = attempts.length - data.length;
  const x = (i: number) => L + i * (W - L - R) / (data.length - 1);
  const y = (v: number) => TOP + (1 - v / 100) * (H - TOP - B);
  const pts = data.map((a, i) => [x(i), y(pctOf(a) * 100)] as const);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${y(0)} L${pts[0][0].toFixed(1)} ${y(0)} Z`;
  const every = Math.ceil(data.length / 8);
  const ticks = H < 150 ? [0, 50, 100] : [0, 20, 40, 60, 80, 100];
  const font = 'Vazirmatn-400';
  const pick = (px: number) => {
    let best = 0, bd = Infinity;
    pts.forEach((p, i) => { const d = Math.abs(p[0] - px); if (d < bd) { bd = d; best = i; } });
    tap(); setSel(best);
  };
  const a = sel != null ? data[sel] : null;
  return (
    <View style={fill ? { flex: 1, gap: 8 } : { gap: 10 }}>
      {/* The tap's x is taken from the page position minus the chart's own, which is reliable on every platform. */}
      <Pressable ref={box} onLayout={e => { setW(e.nativeEvent.layout.width); if (fill) setFillH(e.nativeEvent.layout.height); }}
        onPress={e => { const px = e.nativeEvent.pageX; box.current?.measureInWindow(left => pick(px - left)); }} style={[fill ? { flex: 1, minHeight: 60 } : { height: H }, { direction: 'ltr' } as any]}
        accessibilityRole="image" accessibilityLabel="نمودار نمره‌ی آزمون‌ها">
        {W > 0 ? (
          <Svg width={W} height={H} pointerEvents="none">
            <Defs>
              <LinearGradient id="ga" x1="0" x2="0" y1="0" y2="1">
                <Stop offset="0" stopColor={c.accent} stopOpacity={0.18} /><Stop offset="1" stopColor={c.accent} stopOpacity={0} />
              </LinearGradient>
            </Defs>
            {ticks.map(v => (
              <Line key={v} x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke={c.line} strokeWidth={1} />
            ))}
            {ticks.map(v => (
              <SvgText key={`t${v}`} x={L - 8} y={y(v) + 4} fill={c.muted} fontSize={11} fontFamily={font} textAnchor="end">{`${faNum(v)}٪`}</SvgText>
            ))}
            <Line x1={L} x2={W - R} y1={y(80)} y2={y(80)} stroke={c.ok} strokeWidth={1.5} strokeDasharray="5 5" />
            <Path d={area} fill="url(#ga)" />
            <Path d={line} fill="none" stroke={c.accent} strokeWidth={2} strokeLinejoin="round" />
            {sel != null ? <Line x1={pts[sel][0]} x2={pts[sel][0]} y1={TOP} y2={y(0)} stroke={c.muted} strokeWidth={1} strokeDasharray="3 3" /> : null}
            {pts.map((p, i) => (
              <Circle key={i} cx={p[0]} cy={p[1]} r={i === sel ? 6.5 : 4.5} fill={c.accent} stroke={c.surface} strokeWidth={2} />
            ))}
            {data.map((_, i) => (i % every === 0 || i === data.length - 1
              ? <SvgText key={`x${i}`} x={x(i)} y={H - 6} fill={c.muted} fontSize={11} fontFamily={font} textAnchor="middle">{faNum(i + 1 + offset)}</SvgText>
              : null))}
          </Svg>
        ) : null}
      </Pressable>
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
                <T style={{ color: c.link, fontWeight: '700', fontSize: 13 }}>مرور</T><Icon name="chevronLeft" size={14} color={c.link} weight="semibold" />
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
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}><T style={{ color: c.link, fontWeight: '700' }}>مرور</T><Icon name="chevronLeft" size={15} color={c.link} weight="semibold" /></View>
          </View>
        </Pressable>
      ) : <T style={{ color: c.muted, fontSize: 12.5, textAlign: 'center' }}>برای دیدن جزئیات هر آزمون، روی نمودار بزنید.</T>}
    </View>
  );
}
