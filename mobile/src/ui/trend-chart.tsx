// Home's progress chart, in the «Dot Graph Card»'s design since 2026-11-18 (Mojtaba sent the component,
// src/components/ui/dot-graph-card.tsx, kept as it came for the web's DOM; drawn here with React Native so the web and
// the phones share it). At the top the title with the range as plain tabs (the last 10 tests, the last week, the last
// month), and the picked test's score as a counter that runs up with a smaller percent sign, its change as a green or
// red tag and whose it is; a thin line; then each test as a column of dots, as many as its percent fills the height,
// the passed ones in the theme's colour and the others pale, popping in on a diagonal stagger; the oldest fade out at
// the left edge; a dashed mark at 80%; the first test's date at the left and the last one's at the right. A tap on a
// column picks it (the others dim, its dots grow and a tooltip shows its date and score); a tap on the picked one
// opens its review. (A line chart, «طرح ۱», 2026-11-17 to 18.)
import { useEffect, useMemo, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Platform, Pressable, View, type TextStyle } from 'react-native';

import type { Attempt } from '@/lib/bank';
import { RTL, t, tr } from '@/lib/i18n';
import { faNum, fmtDate, isPass, pctOf } from '@/lib/logic';
import { T, tap, useCountUp } from './kit';
import { useColors, useIsDark } from './theme';

type Range = 'ten' | 'week' | 'month';
const RANGES: { id: Range; label: () => string }[] = [
  { id: 'ten', label: () => t('{0} آخر', faNum(10)) },
  { id: 'week', label: () => tr('هفته') },
  { id: 'month', label: () => tr('ماه') },
];
const PASS = 0.8, DAY = 864e5;
// a dot and the room between dots (the component's 4 and 5, a little larger for a phone)
const DOT = 5, GAP = 4, STEP = DOT + GAP;
// the pop: each dot's own 0.4 s, starting 0.02 s later per column and 0.04 s per dot up the column
const POP = 0.4, PER_COL = 0.02, PER_DOT = 0.04;
const WEB = Platform.OS === 'web';

export function TrendChart({ attempts, minH, compact, onOpen, title, big: bigSize, ink: cardInk }: { attempts: Attempt[]; minH: number; compact?: boolean; onOpen: (a: Attempt) => void;
  title?: TextStyle; big?: number; ink?: string }) {
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
  const n = shown.length;
  const at = pick != null && pick < n ? pick : n - 1;
  const cur = shown[at], prev = at > 0 ? shown[at - 1] : (at === 0 && cur ? attempts[attempts.indexOf(cur) - 1] : undefined);
  const diff = cur && prev ? Math.round((pctOf(cur) - pctOf(prev)) * 100) : null;
  const pctStr = (v: number) => `${faNum(Math.round(v * 100))}${RTL ? '٪' : '%'}`;
  const counted = useCountUp(cur ? Math.round(pctOf(cur) * 100) : 0, 1200);

  const big = bigSize ?? (compact ? 28 : 34), text = cardInk ?? c.text;
  const on = c.accent, off = dark ? 'rgba(255,255,255,0.26)' : 'rgba(0,0,0,0.2)';
  const { w, h } = box;
  const rows = Math.max(4, Math.floor((h + GAP) / STEP));
  // the columns' spacing: close together as the component's, further apart when there are few; the newest at the right
  const colGap = n > 1 ? Math.max(GAP, Math.min(40, (w - n * DOT) / (n - 1))) : 0;
  const colX = (i: number) => w - DOT - (n - 1 - i) * (DOT + colGap);
  const dotsOf = (a: Attempt) => Math.max(1, Math.round(pctOf(a) * rows));
  const passRow = Math.round(PASS * rows);

  // the pop-in, again on each range and when the data or the size change
  const [pop] = useState(() => new Animated.Value(0));
  const [still, setStill] = useState(false);
  useEffect(() => { AccessibilityInfo.isReduceMotionEnabled().then(setStill).catch(() => {}); }, []);
  const total = Math.max(0, n - 1) * PER_COL + rows * PER_DOT + POP;
  useEffect(() => {
    if (!w) return;
    if (still) { pop.setValue(1); return; }
    pop.setValue(0);
    Animated.timing(pop, { toValue: 1, duration: total * 1000, easing: Easing.linear, useNativeDriver: !WEB }).start();
  }, [range, n, rows, w, still]); // eslint-disable-line react-hooks/exhaustive-deps
  const popOf = (i: number, k: number) => {
    const s = (i * PER_COL + k * PER_DOT) / total, e = Math.min(1, s + POP / total), m = s + (e - s) * 0.7;
    return {
      opacity: pop.interpolate({ inputRange: [0, s, e, 1], outputRange: [0, 0, 1, 1] }),
      // (a little past full size and back, as the component's cubic-bezier(0.34, 1.56, 0.64, 1))
      scale: pop.interpolate({ inputRange: [0, s, m, e, 1], outputRange: [0, 0, 1.12, 1, 1] }),
      y: pop.interpolate({ inputRange: [0, s, e, 1], outputRange: [10, 10, 0, 0] }),
    };
  };
  const picked = pick != null && pick < n;

  return (
    <View style={{ flex: 1, gap: compact ? 8 : 12 }}>
      {/* the head: the title and the tabs on one line, then the score counting up, its change and whose it is */}
      <View style={{ gap: compact ? 2 : 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <T numberOfLines={1} style={{ fontSize: 17, lineHeight: 25, fontWeight: '600', color: text, flexShrink: 1, ...title }}>نمودار پیشرفت</T>
          <View style={{ flexDirection: 'row', gap: compact ? 12 : 16 }}>
            {RANGES.map(r => {
              const sel = r.id === range;
              return (
                <Pressable key={r.id} onPress={() => { tap(); setRange(r.id); setNow(Date.now()); setPick(null); }} accessibilityRole="button" accessibilityState={{ selected: sel }} hitSlop={8}>
                  <T raw numberOfLines={1} style={{ fontSize: 12, lineHeight: 18, fontWeight: sel ? '700' : '500', letterSpacing: RTL ? 0 : 0.5, textTransform: 'uppercase', color: sel ? text : c.muted }}>{r.label()}</T>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {/* (the number and a smaller percent sign after it, in the reading order: the sign at its left in Persian) */}
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <T raw style={{ fontSize: big, lineHeight: Math.round(big * 1.3), fontFamily: RTL ? 'Vazirmatn-500' : 'GSans-500', letterSpacing: RTL ? 0 : -1, color: text }}>{cur ? faNum(counted) : '–'}</T>
            {cur ? <T raw style={{ fontSize: Math.round(big * 0.6), lineHeight: Math.round(big * 1.3), fontFamily: RTL ? 'Vazirmatn-400' : 'GSans-400', color: text, marginStart: 1 } as object}>{RTL ? '٪' : '%'}</T> : null}
          </View>
          {diff ? (
            <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99, backgroundColor: diff > 0 ? (dark ? 'rgba(74,222,128,0.14)' : 'rgba(22,163,74,0.12)') : (dark ? 'rgba(248,113,113,0.14)' : 'rgba(220,38,38,0.1)') }}>
              <T raw style={{ fontSize: 12, lineHeight: 18, fontWeight: '700', color: diff > 0 ? c.ok : c.bad }}>{`${diff > 0 ? '▲' : '▼'} ${faNum(Math.abs(diff))}${RTL ? '٪' : '%'}`}</T>
            </View>
          ) : null}
          {cur ? <T numberOfLines={1} style={{ flexShrink: 1, fontSize: 12.5, lineHeight: 19, color: c.muted }}>{at === n - 1 && pick == null ? 'آخرین آزمون' : fmtDate(cur.at)}</T> : null}
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: c.line, opacity: 0.8 }} />

      {/* the dots: left to right in time, in every language */}
      <View style={{ flex: 1, minHeight: minH }} onLayout={e => { const l = e.nativeEvent.layout; setBox({ w: l.width, h: l.height }); }}
        accessibilityRole="image" accessibilityLabel={tr('نمودار پیشرفت')}>
        {w > 0 && h > 0 && n ? (
          <View style={{ position: 'absolute', top: 0, left: 0, width: w, height: h, direction: 'ltr' } as any}>
            {/* the pass mark */}
            <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, bottom: passRow * STEP - GAP / 2, borderTopWidth: 1, borderStyle: 'dashed', borderColor: c.ok, opacity: 0.7 }} />
            <View pointerEvents="none" style={{ position: 'absolute', left: 0, bottom: passRow * STEP + 2 }}>
              <T raw style={{ fontSize: 10.5, lineHeight: 15, fontWeight: '600', color: c.ok }}>{t('قبولی {0}', `${faNum(80)}${RTL ? '٪' : '%'}`)}</T>
            </View>
            {shown.map((a, i) => {
              const x = colX(i), count = dotsOf(a), good = isPass(a) || pctOf(a) >= PASS, sel = picked && i === at;
              // the oldest fade out at the left edge (the component's mask the other way round: the newest are at the right)
              const edge = Math.min(1, Math.max(0.15, (x + DOT) / Math.max(1, w * 0.15)));
              return (
                <Pressable key={`c${i}`} accessibilityRole="button" accessibilityLabel={`${fmtDate(a.at)}: ${pctStr(pctOf(a))}`}
                  onPress={() => { tap(); if (sel || (!picked && i === n - 1)) onOpen(a); else setPick(i); }}
                  style={{ position: 'absolute', bottom: 0, height: h, left: x - colGap / 2, width: DOT + colGap, opacity: edge * (picked && !sel ? 0.25 : 1) }}>
                  {Array.from({ length: count }, (_, k) => {
                    const p = popOf(i, k);
                    return (
                      <Animated.View key={k} style={{ position: 'absolute', bottom: k * STEP, left: colGap / 2, width: DOT, height: DOT, borderRadius: DOT / 2, backgroundColor: good ? on : off,
                        opacity: p.opacity, transform: [{ translateY: p.y }, { scale: sel ? Animated.multiply(p.scale, 1.4) : p.scale }] }} />
                    );
                  })}
                </Pressable>
              );
            })}
            {/* the picked column's tooltip */}
            {picked && cur ? (() => {
              const x = colX(at), top = h - dotsOf(cur) * STEP - 34, tipW = 130;
              return (
                <View pointerEvents="none" style={{ position: 'absolute', top: Math.max(0, top), left: Math.max(0, Math.min(w - tipW, x + DOT / 2 - tipW / 2)), width: tipW, alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', gap: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, backgroundColor: dark ? '#f4f4f6' : '#111111',
                    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6, shadowOffset: { width: 0, height: 4 }, elevation: 3 }}>
                    <T raw numberOfLines={1} style={{ fontSize: 11, lineHeight: 16, fontWeight: '600', color: dark ? '#111111' : '#ffffff' }}>{fmtDate(cur.at)}</T>
                    <T raw numberOfLines={1} style={{ fontSize: 11, lineHeight: 16, fontWeight: '600', color: '#a0a0a0' }}>{pctStr(pctOf(cur))}</T>
                  </View>
                </View>
              );
            })() : null}
          </View>
        ) : null}
        {!n ? (
          <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
            <T style={{ fontSize: 13, color: c.muted }}>{attempts.length ? 'در این بازه آزمونی نیست' : 'هنوز آزمونی نداده‌اید'}</T>
          </View>
        ) : null}
      </View>
      {n ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', direction: 'ltr' } as any}>
          <T raw style={{ fontSize: 12, lineHeight: 18, fontWeight: '500', color: c.muted }}>{fmtDate(shown[0].at)}</T>
          {n > 1 ? <T raw style={{ fontSize: 12, lineHeight: 18, fontWeight: '500', color: text }}>{fmtDate(shown[n - 1].at)}</T> : null}
        </View>
      ) : null}
    </View>
  );
}
