// Home's progress chart since 2026-11-17 (Mojtaba picked «طرح ۱» of three: «منحنی روند با خط قبولی», without its three
// small cards under it): at the top the picked test's score in large type (the newest unless another point is tapped)
// with how it moved from the test before as a green or red chip, and a choice of range (the last 10 tests, the last
// week, the last month); under them the percent of each test as a line over a soft wash of the theme's colour, with
// the pass mark (80%) as a dashed green line over a faint green band; the first test's date at the left and the last
// one's at the right. A tap on a point picks that test; a tap on the picked one opens its review.
import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Defs, Line, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import type { Attempt } from '@/lib/bank';
import { RTL, t, tr } from '@/lib/i18n';
import { faNum, fmtDate, pctOf } from '@/lib/logic';
import { T, tap } from './kit';
import { useColors, useIsDark } from './theme';

type Range = 'ten' | 'week' | 'month';
const RANGES: { id: Range; label: () => string }[] = [
  { id: 'ten', label: () => t('{0} آخر', faNum(10)) },
  { id: 'week', label: () => tr('هفته') },
  { id: 'month', label: () => tr('ماه') },
];
const PASS = 0.8, DAY = 864e5;
const TOP = 8, BOT = 8, SIDE = 8;

export function TrendChart({ attempts, minH, compact, onOpen }: { attempts: Attempt[]; minH: number; compact?: boolean; onOpen: (a: Attempt) => void }) {
  const c = useColors(), dark = useIsDark();
  const [range, setRange] = useState<Range>('ten');
  const [pick, setPick] = useState<number | null>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  // (the moment the week or month counts back from: when the range was last chosen)
  const [now, setNow] = useState(() => Date.now());
  const shown = useMemo(() => {
    if (range === 'ten') return attempts.slice(-10);
    const from = now - (range === 'week' ? 7 : 30) * DAY;
    return attempts.filter(a => a.at >= from);
  }, [attempts, range, now]);
  const at = pick != null && pick < shown.length ? pick : shown.length - 1;
  const cur = shown[at], prev = at > 0 ? shown[at - 1] : (at === 0 && cur ? attempts[attempts.indexOf(cur) - 1] : undefined);
  const diff = cur && prev ? Math.round((pctOf(cur) - pctOf(prev)) * 100) : null;
  const pctStr = (v: number) => `${faNum(Math.round(v * 100))}${RTL ? '٪' : '%'}`;

  const { w, h } = box;
  const x = (i: number) => (shown.length <= 1 ? w / 2 : SIDE + (i * (w - SIDE * 2)) / (shown.length - 1));
  const y = (v: number) => TOP + (1 - v) * (h - TOP - BOT);
  const pts = shown.map((a, i) => [x(i), y(pctOf(a))] as const);
  const line = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`).join(' ');
  const area = pts.length > 1 ? `${line} L${pts[pts.length - 1][0].toFixed(1)} ${h} L${pts[0][0].toFixed(1)} ${h} Z` : '';
  const ink = c.accent, big = compact ? 28 : 34;
  const slot = shown.length > 1 ? (w - SIDE * 2) / (shown.length - 1) : w;

  return (
    <View style={{ flex: 1, gap: compact ? 8 : 12 }}>
      {/* the head: the picked test's score and its change, and the range */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <View style={{ flexShrink: 1, gap: 2 }}>
          <T numberOfLines={1} style={{ fontSize: 12.5, lineHeight: 19, color: c.muted }}>
            {!cur ? 'نمودار پیشرفت' : at === shown.length - 1 && pick == null ? 'نمره‌ی آخرین آزمون' : fmtDate(cur.at)}
          </T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <T raw style={{ fontSize: big, lineHeight: Math.round(big * 1.25), fontFamily: RTL ? 'Vazirmatn-800' : 'GSans-700', color: c.text }}>{cur ? pctStr(pctOf(cur)) : '–'}</T>
            {diff ? (
              <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99, backgroundColor: diff > 0 ? (dark ? 'rgba(74,222,128,0.14)' : 'rgba(22,163,74,0.12)') : (dark ? 'rgba(248,113,113,0.14)' : 'rgba(220,38,38,0.1)') }}>
                <T raw style={{ fontSize: 12, lineHeight: 18, fontWeight: '700', color: diff > 0 ? c.ok : c.bad }}>{`${diff > 0 ? '▲' : '▼'} ${faNum(Math.abs(diff))}${RTL ? '٪' : '%'}`}</T>
              </View>
            ) : null}
          </View>
        </View>
        <View style={{ flexDirection: 'row', padding: 3, gap: 2, borderRadius: 99, backgroundColor: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)' }}>
          {RANGES.map(r => {
            const on = r.id === range;
            return (
              <Pressable key={r.id} onPress={() => { tap(); setRange(r.id); setNow(Date.now()); setPick(null); }} accessibilityRole="button" accessibilityState={{ selected: on }}
                style={{ paddingHorizontal: compact ? 8 : 10, paddingVertical: 4, borderRadius: 99, backgroundColor: on ? c.text : 'transparent' }}>
                <T raw numberOfLines={1} style={{ fontSize: 12, lineHeight: 18, fontWeight: on ? '700' : '500', color: on ? c.bg : c.muted }}>{r.label()}</T>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* the chart: left to right in time, in every language */}
      <View style={{ flex: 1, minHeight: minH }} onLayout={e => { const l = e.nativeEvent.layout; setBox({ w: l.width, h: l.height }); }}
        accessibilityRole="image" accessibilityLabel={tr('نمودار پیشرفت')}>
        {w > 0 && h > 0 ? (
          <View style={{ position: 'absolute', top: 0, left: 0, width: w, height: h, direction: 'ltr' } as any}>
            <Svg width={w} height={h}>
              <Defs>
                <LinearGradient id="trendWash" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={ink} stopOpacity={dark ? 0.42 : 0.3} />
                  <Stop offset="1" stopColor={ink} stopOpacity={0} />
                </LinearGradient>
              </Defs>
              <Rect x={0} y={y(1)} width={w} height={y(PASS) - y(1)} rx={6} fill={c.ok} fillOpacity={dark ? 0.1 : 0.09} />
              <Line x1={0} x2={w} y1={y(PASS)} y2={y(PASS)} stroke={c.ok} strokeWidth={1.5} strokeDasharray="4 4" />
              {area ? <Path d={area} fill="url(#trendWash)" /> : null}
              {pts.length > 1 ? <Path d={line} fill="none" stroke={ink} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" /> : null}
              {pts.map(([px, py], i) => i === at
                ? <Circle key={i} cx={px} cy={py} r={7} fill={ink} stroke={c.surface} strokeWidth={3} />
                : <Circle key={i} cx={px} cy={py} r={3.5} fill={c.surface} stroke={ink} strokeWidth={2} />)}
            </Svg>
            {/* the pass mark's name over its line, at the left (as text, so Persian reads right) */}
            <View pointerEvents="none" style={{ position: 'absolute', left: 4, top: y(PASS) - 19 }}>
              <T raw style={{ fontSize: 11, lineHeight: 16, fontWeight: '700', color: c.ok }}>{t('قبولی {0}', `${faNum(80)}${RTL ? '٪' : '%'}`)}</T>
            </View>
            {/* a column around each point picks it; the picked one opens its review */}
            {shown.map((a, i) => (
              <Pressable key={`p${i}`} accessibilityRole="button" accessibilityLabel={`${fmtDate(a.at)}: ${pctStr(pctOf(a))}`}
                onPress={() => { tap(); if (i === at && (pick != null || i === shown.length - 1)) onOpen(a); else setPick(i); }}
                style={{ position: 'absolute', top: 0, height: h, left: Math.max(0, x(i) - slot / 2), width: Math.max(28, slot) }} />
            ))}
          </View>
        ) : null}
        {!shown.length ? (
          <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
            <T style={{ fontSize: 13, color: c.muted }}>{attempts.length ? 'در این بازه آزمونی نیست' : 'هنوز آزمونی نداده‌اید'}</T>
          </View>
        ) : null}
      </View>
      {shown.length ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', direction: 'ltr' } as any}>
          <T raw style={{ fontSize: 12, lineHeight: 18, color: c.muted }}>{fmtDate(shown[0].at)}</T>
          {shown.length > 1 ? <T raw style={{ fontSize: 12, lineHeight: 18, color: c.muted }}>{fmtDate(shown[shown.length - 1].at)}</T> : null}
        </View>
      ) : null}
    </View>
  );
}
