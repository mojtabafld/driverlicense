// Home's progress chart, in the «Mini Chart»'s design since 2026-11-18 (Mojtaba sent the component,
// src/components/ui/mini-chart.tsx, kept as it came for the web with Tailwind; drawn here with React Native so the web
// and the phones share it). At the top a softly pulsing green dot before the title, the range at the other end (the
// last 10 tests, the last week, the last month), and under them the picked test's score with a smaller percent sign,
// its change as a green or red tag and whose it is; then each test as a round-ended bar in the ink's soft tint, as
// tall as its percent, with its day under it. A tap on a bar picks it: it turns the full ink and grows a little, its
// neighbours a shade deeper, the rest fade, and a tooltip over it shows its percent; a tap on the picked one opens its
// review. A dashed line marks the pass mark (80%). (A dot graph and a line chart before, 2026-11-17 to 18.)
import { useEffect, useMemo, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Platform, Pressable, View, type TextStyle } from 'react-native';

import type { Attempt } from '@/lib/bank';
import { RTL, t, tr } from '@/lib/i18n';
import { faNum, fmtDate, pctOf } from '@/lib/logic';
import { T, tap } from './kit';
import { rgba } from './palette';
import { useColors, useIsDark } from './theme';

type Range = 'ten' | 'week' | 'month';
const RANGES: { id: Range; label: () => string }[] = [
  { id: 'ten', label: () => t('{0} آخر', faNum(10)) },
  { id: 'week', label: () => tr('هفته') },
  { id: 'month', label: () => tr('ماه') },
];
const PASS = 0.8, DAY = 864e5, LABEL = 18, TIP = 30;
const WEB = Platform.OS === 'web';
// the day of the month in Copenhagen, under a bar
const dayOf = (at: number) => Number(new Date(at).toLocaleDateString('en-GB', { timeZone: 'Europe/Copenhagen', day: 'numeric' }));

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
  const picked = pick != null && pick < n;
  const at = picked ? pick : n - 1;
  const cur = shown[at], prev = at > 0 ? shown[at - 1] : (at === 0 && cur ? attempts[attempts.indexOf(cur) - 1] : undefined);
  const diff = cur && prev ? Math.round((pctOf(cur) - pctOf(prev)) * 100) : null;
  // (shown as it is, no count-up: Mojtaba 2026-11-18)
  const counted = cur ? Math.round(pctOf(cur) * 100) : 0;
  const pctStr = (v: number) => `${faNum(Math.round(v * 100))}${RTL ? '٪' : '%'}`;

  const big = bigSize ?? (compact ? 28 : 34), text = cardInk ?? c.text;
  const tint = (a: number) => rgba(text, a);
  const { w, h } = box;
  const barH = Math.max(20, h - LABEL - TIP);
  const gap = n > 14 ? 4 : 8, colW = n ? (w - gap * (n - 1)) / n : 0;
  // the bar itself: slim and tall as the component's, never wider than 24 however few the tests (Mojtaba 2026-11-18:
  // with a few tests the bars were as wide as they were tall, round); a low score keeps a short pill, not a dot
  const barW = Math.min(24, colW), least = Math.min(barW * 1.6, barH * 0.25);
  // (heights against the best score shown, as the component's value / maxValue, so low scores still make tall bars; the
  // pass mark shows only when it falls inside)
  const top = Math.max(0.05, ...shown.map(pctOf)), scale = (v: number) => barH * Math.min(1, v / top);
  // (a label under every bar while they fit, else every few)
  const every = Math.max(1, Math.ceil(n / Math.max(1, Math.floor(w / 22))));

  // the dot before the title, pulsing as the component's animate-pulse
  const [pulse] = useState(() => new Animated.Value(1));
  useEffect(() => {
    let alive = true;
    AccessibilityInfo.isReduceMotionEnabled().then(still => {
      if (!alive || still) return;
      Animated.loop(Animated.sequence([
        Animated.timing(pulse, { toValue: 0.4, duration: 1000, easing: Easing.inOut(Easing.cubic), useNativeDriver: !WEB }),
        Animated.timing(pulse, { toValue: 1, duration: 1000, easing: Easing.inOut(Easing.cubic), useNativeDriver: !WEB }),
      ])).start();
    }).catch(() => {});
    return () => { alive = false; pulse.stopAnimation(); };
  }, [pulse]);

  return (
    <View style={{ flex: 1, gap: compact ? 8 : 12 }}>
      {/* the head: the dot and the title, the range; then the score, its change and whose it is */}
      <View style={{ gap: compact ? 2 : 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1 }}>
            <Animated.View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#10b981', opacity: pulse }} />
            <T numberOfLines={1} style={{ fontSize: 17, lineHeight: 25, fontWeight: '600', color: text, flexShrink: 1, ...title }}>نمودار پیشرفت</T>
          </View>
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
            <T raw style={{ fontSize: big, lineHeight: Math.round(big * 1.3), fontFamily: RTL ? 'Vazirmatn-600' : 'GSans-600', color: text }}>{cur ? faNum(counted) : '–'}</T>
            {cur ? <T raw style={{ fontSize: Math.round(big * 0.55), lineHeight: Math.round(big * 1.3), fontFamily: RTL ? 'Vazirmatn-400' : 'GSans-400', color: c.muted, marginStart: 2 } as object}>{RTL ? '٪' : '%'}</T> : null}
          </View>
          {diff ? (
            <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99, backgroundColor: diff > 0 ? (dark ? 'rgba(74,222,128,0.14)' : 'rgba(22,163,74,0.12)') : (dark ? 'rgba(248,113,113,0.14)' : 'rgba(220,38,38,0.1)') }}>
              <T raw style={{ fontSize: 12, lineHeight: 18, fontWeight: '700', color: diff > 0 ? c.ok : c.bad }}>{`${diff > 0 ? '▲' : '▼'} ${faNum(Math.abs(diff))}${RTL ? '٪' : '%'}`}</T>
            </View>
          ) : null}
          {cur ? <T numberOfLines={1} style={{ flexShrink: 1, fontSize: 12.5, lineHeight: 19, color: c.muted }}>{picked ? fmtDate(cur.at) : 'آخرین آزمون'}</T> : null}
        </View>
      </View>

      {/* the bars: left to right in time, in every language */}
      <View style={{ flex: 1, minHeight: minH }} onLayout={e => { const l = e.nativeEvent.layout; setBox({ w: l.width, h: l.height }); }}
        accessibilityRole="image" accessibilityLabel={tr('نمودار پیشرفت')}>
        {w > 0 && h > 0 && n ? (
          <View style={{ position: 'absolute', top: 0, left: 0, width: w, height: h, direction: 'ltr' } as any}>
            {/* the pass mark */}
            {top >= PASS ? <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: TIP + barH - scale(PASS), borderTopWidth: 1, borderStyle: 'dashed', borderColor: c.ok, opacity: 0.6 }} /> : null}
            {shown.map((a, i) => {
              const sel = picked && i === at, near = picked && Math.abs(i - at) === 1;
              const bh = Math.max(least, scale(pctOf(a)));
              return (
                <Pressable key={`b${i}`} accessibilityRole="button" accessibilityLabel={`${fmtDate(a.at)}: ${pctStr(pctOf(a))}`}
                  onPress={() => { tap(); if (sel) onOpen(a); else setPick(i); }}
                  style={{ position: 'absolute', top: 0, height: h, left: i * (colW + gap), width: colW, alignItems: 'center' }}>
                  <View style={{ position: 'absolute', top: TIP + barH - bh, height: bh, width: barW, borderRadius: barW / 2,
                    backgroundColor: sel ? text : near ? tint(0.3) : picked ? tint(0.1) : i === n - 1 ? tint(0.45) : tint(0.2),  // (the newest a shade deeper until one is picked)
                    transform: [{ scaleX: sel ? 1.15 : near ? 1.05 : 1 }] }} />
                  {i % every === (n - 1) % every ? (
                    <T raw numberOfLines={1} style={{ position: 'absolute', bottom: 0, fontSize: 10, lineHeight: 14, fontWeight: '500', color: sel ? text : c.muted, opacity: sel ? 1 : 0.6, width: 30, textAlign: 'center' }}>{faNum(dayOf(a.at))}</T>
                  ) : null}
                </Pressable>
              );
            })}
            {/* the picked bar's tooltip */}
            {picked && cur ? (() => {
              const cx = at * (colW + gap) + colW / 2, bh = Math.max(least, scale(pctOf(cur))), tipW = 56;
              return (
                <View pointerEvents="none" style={{ position: 'absolute', top: Math.max(0, TIP + barH - bh - 28), left: Math.max(0, Math.min(w - tipW, cx - tipW / 2)), width: tipW, alignItems: 'center' }}>
                  <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: text }}>
                    <T raw numberOfLines={1} style={{ fontSize: 12, lineHeight: 17, fontWeight: '600', color: c.bg }}>{pctStr(pctOf(cur))}</T>
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
    </View>
  );
}
