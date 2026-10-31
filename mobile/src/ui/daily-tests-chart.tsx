// The exam tab's «آزمون‌های روزانه» chart, under the counts of right, wrong and unanswered (Mojtaba 2026-10-31, after a
// picture he sent): how many tests were taken on each of the last seven days (Copenhagen's days; lessons' tests not
// counted), as a smooth violet line over a soft fill, a point for each day, a light scale at the side, the days under
// it, and the average a day in the head. One day is picked (at first the busiest, else today): a thin line down to it
// and a bubble with its date and count; a tap on another day picks it. Time runs left to right in every language.
// `height`: the drawing's height (the exam tab makes it smaller on shorter screens).
import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Defs, Line, LinearGradient, Path, Stop } from 'react-native-svg';

import { RTL, t } from '@/lib/i18n';
import { faNum } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { dayLabel, dayOf } from './date-pick';
import { Icon } from './icon';
import { T, tap } from './kit';
import { useColors, useIsDark } from './theme';

const DAYS = 7, DAY = 864e5;
const LABEL_W = 26, PAD_X = 10, TOP = 8, BOTTOM = 22;

// A smooth line through the points (monotone, so it never swings above the busiest day or under zero).
function smooth(p: [number, number][]): string {
  if (p.length < 2) return p.length ? `M${p[0][0]},${p[0][1]}` : '';
  const n = p.length, d: number[] = [], m: number[] = [];
  for (let i = 0; i < n - 1; i++) d.push((p[i + 1][1] - p[i][1]) / (p[i + 1][0] - p[i][0]));
  m.push(d[0]);
  for (let i = 1; i < n - 1; i++) m.push(d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2);
  m.push(d[n - 2]);
  for (let i = 0; i < n - 1; i++) {
    if (d[i] === 0) { m[i] = 0; m[i + 1] = 0; continue; }
    const a = m[i] / d[i], b = m[i + 1] / d[i], s = a * a + b * b;
    if (s > 9) { const k = 3 / Math.sqrt(s); m[i] = k * a * d[i]; m[i + 1] = k * b * d[i]; }
  }
  let out = `M${p[0][0]},${p[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const h = (p[i + 1][0] - p[i][0]) / 3;
    out += ` C${p[i][0] + h},${p[i][1] + m[i] * h} ${p[i + 1][0] - h},${p[i + 1][1] - m[i + 1] * h} ${p[i + 1][0]},${p[i + 1][1]}`;
  }
  return out;
}

export function DailyTestsChart({ height = 120 }: { height?: number }) {
  const c = useColors(), dark = useIsDark(), { attempts } = useApp();
  const violet = dark ? '#8f85ff' : '#6d5dfc';
  const days = useMemo(() => {
    const now = Date.now(), keys = Array.from({ length: DAYS }, (_, i) => dayOf(now - (DAYS - 1 - i) * DAY));
    const n = new Map(keys.map(k => [k, 0]));
    for (const a of attempts) { if (a.mode === 'lesson') continue; const k = dayOf(a.at); if (n.has(k)) n.set(k, n.get(k)! + 1); }
    return keys.map(k => ({ k, n: n.get(k)! }));
  }, [attempts]);
  const busiest = days.reduce((b, d, i) => (d.n > days[b].n ? i : b), DAYS - 1);
  const [pick, setPick] = useState<number | null>(null), sel = pick ?? busiest;
  const [w, setW] = useState(0);
  const avg = days.reduce((s, d) => s + d.n, 0) / DAYS;
  // The scale: 0, half and the top, a round number at or above the busiest day.
  const max = Math.max(...days.map(d => d.n)), top = max <= 4 ? 4 : max <= 10 ? Math.ceil(max / 2) * 2 : Math.ceil(max / 5) * 5;
  const plotW = Math.max(0, w - LABEL_W - PAD_X * 2), plotH = height - TOP - BOTTOM;
  const x = (i: number) => PAD_X + (plotW * i) / (DAYS - 1), y = (v: number) => TOP + plotH * (1 - v / top);
  const pts = days.map((d, i) => [x(i), y(d.n)] as [number, number]);
  const line = smooth(pts), area = line ? `${line} L${x(DAYS - 1)},${y(0)} L${x(0)},${y(0)} Z` : '';
  // one decimal at most, with the Persian decimal sign in Persian
  const one = (v: number) => { const x = (Math.round(v * 10) / 10).toString(); return RTL ? x.replace('.', '٫') : x; };
  // The bubble above its point; when the point is too high for that, beside it (on the side with room).
  const bubbleW = 92, bubbleH = 44, [sx, sy] = w ? pts[sel] : [0, 0], high = sy - bubbleH - 10 < 0;
  const bx = !w ? 0 : high ? (sx + 12 + bubbleW <= PAD_X * 2 + plotW ? sx + 12 : sx - 12 - bubbleW) : Math.min(Math.max(sx - bubbleW / 2, 0), PAD_X * 2 + plotW - bubbleW);
  const by = high ? Math.max(0, sy - bubbleH / 2) : sy - bubbleH - 10;
  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ width: 28, height: 28, borderRadius: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: dark ? 'rgba(143,133,255,0.16)' : 'rgba(109,93,252,0.12)' }}>
          <Icon name="chart" size={16} color={violet} weight="semibold" />
        </View>
        <T style={{ flex: 1, fontSize: 15, fontWeight: '700' }} numberOfLines={1}>آزمون‌های روزانه</T>
        <T style={{ fontSize: 12.5, color: c.muted }} numberOfLines={1}>{t('میانگین {0} در روز', faNum(one(avg)))}</T>
      </View>
      <View onLayout={e => setW(e.nativeEvent.layout.width)} style={{ height, direction: 'ltr' } as any}>
        {w ? (
          <>
            <Svg width={w} height={height}>
              <Defs>
                <LinearGradient id="dtArea" x1="0" y1={String(TOP)} x2="0" y2={String(y(0))} gradientUnits="userSpaceOnUse">
                  <Stop offset="0" stopColor={violet} stopOpacity={dark ? 0.35 : 0.25} />
                  <Stop offset="1" stopColor={violet} stopOpacity={0} />
                </LinearGradient>
              </Defs>
              {[0, top / 2, top].map(v => <Line key={v} x1={PAD_X} x2={PAD_X + plotW} y1={y(v)} y2={y(v)} stroke={c.line} strokeWidth={1} strokeDasharray={v ? '3 4' : undefined} />)}
              <Line x1={pts[sel][0]} x2={pts[sel][0]} y1={TOP} y2={y(0)} stroke={c.line} strokeWidth={1.2} />
              <Path d={area} fill="url(#dtArea)" />
              <Path d={line} fill="none" stroke={violet} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
              {pts.map(([px, py], i) => (
                <Circle key={i} cx={px} cy={py} r={i === sel ? 6 : 4} fill={i === sel ? violet : c.surface} stroke={i === sel ? c.surface : violet} strokeWidth={i === sel ? 3 : 2} />
              ))}
            </Svg>
            {/* the scale's numbers at the side, the days under the drawing */}
            {[0, top / 2, top].map(v => (
              <T key={v} raw style={{ position: 'absolute', right: 0, width: LABEL_W - 4, top: y(v) - 8, fontSize: 10.5, lineHeight: 16, color: c.muted, textAlign: 'right' }}>{faNum(one(v))}</T>
            ))}
            {days.map((d, i) => (
              <T key={d.k} raw style={{ position: 'absolute', left: pts[i][0] - 20, width: 40, top: height - 17, fontSize: 10.5, lineHeight: 16, textAlign: 'center',
                color: i === sel ? c.text : c.muted, fontWeight: i === sel ? '700' : '400' }}>{faNum(Number(d.k.slice(8)))}</T>
            ))}
            {/* a tap anywhere over a day picks it */}
            {days.map((d, i) => (
              <Pressable key={`p${d.k}`} onPress={() => { tap(); setPick(i); }} accessibilityRole="button"
                accessibilityLabel={`${dayLabel(d.k, { day: 'numeric', month: 'long' })}: ${t('{0} آزمون', faNum(d.n))}`}
                style={{ position: 'absolute', top: 0, bottom: 0, left: pts[i][0] - plotW / (DAYS - 1) / 2, width: plotW / (DAYS - 1) }} />
            ))}
            {/* the picked day's bubble */}
            <View pointerEvents="none" style={{ position: 'absolute', left: bx, top: by, width: bubbleW, height: bubbleH, justifyContent: 'center', paddingHorizontal: 8, borderRadius: 10,
              backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, alignItems: 'center', direction: RTL ? 'rtl' : 'ltr',
              shadowColor: '#000', shadowOpacity: dark ? 0.3 : 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 } as any}>
              <T raw style={{ fontSize: 11, lineHeight: 15, color: c.muted }} numberOfLines={1}>{dayLabel(days[sel].k, { day: 'numeric', month: 'long' })}</T>
              <T style={{ fontSize: 13, lineHeight: 18, fontWeight: '700' }} numberOfLines={1}>{t('{0} آزمون', faNum(days[sel].n))}</T>
            </View>
          </>
        ) : null}
      </View>
    </View>
  );
}
