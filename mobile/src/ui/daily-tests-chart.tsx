// The last seven Copenhagen calendar days, shown as an accessible Material bar chart.
import { useEffect, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { RTL, t } from '@/lib/i18n';
import { faNum } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { dayLabel, dayOf } from './date-pick';
import { T, tap } from './kit';
import { CardCode, CardWash } from './service-carousel';
import { useColors, useM3 } from './theme';

const DAYS = 7, DAY = 864e5;

// `code`: the card's number «( 002 )» over its title, in the gradient cards' look (Mojtaba 2026-11-13: the test page).
export function DailyTestsChart({ height = 120, code }: { height?: number; code?: string }) {
  const c = useColors(), m = useM3(), { attempts } = useApp();
  const [today, setToday] = useState(() => dayOf(Date.now()));
  useEffect(() => {
    const timer = setInterval(() => setToday(dayOf(Date.now())), 60000);
    return () => clearInterval(timer);
  }, []);
  const days = useMemo(() => {
    // Count calendar dates from noon UTC rather than subtracting 24 hours from local time across DST changes.
    const end = Date.parse(`${today}T12:00:00Z`);
    const keys = Array.from({ length: DAYS }, (_, i) => new Date(end - (DAYS - 1 - i) * DAY).toISOString().slice(0, 10));
    const counts = new Map(keys.map(k => [k, 0]));
    for (const attempt of attempts) {
      if (attempt.mode === 'lesson') continue;
      const k = dayOf(attempt.at);
      if (counts.has(k)) counts.set(k, counts.get(k)! + 1);
    }
    return keys.map(k => ({ k, n: counts.get(k)! }));
  }, [attempts, today]);
  const [pick, setPick] = useState<string | null>(null);
  const selected = days.find(d => d.k === pick);
  const total = days.reduce((sum, d) => sum + d.n, 0), max = Math.max(1, ...days.map(d => d.n));
  return (
    <View testID="daily-tests-card" style={{ borderRadius: 24, padding: 20, gap: 16, overflow: 'hidden', backgroundColor: code ? undefined : c.surface }}>
      {code ? <CardWash tone="purple" /> : null}
      <View style={{ gap: 3 }}>
        {code ? <View style={{ alignItems: 'flex-start', marginBottom: 6 }}><CardCode n={code} /></View> : null}
        <T style={{ fontSize: 22, lineHeight: 32, fontWeight: '500' }}>آزمون‌های روزانه</T>
        <T testID="daily-tests-total" style={{ fontSize: 14, lineHeight: 22, color: c.muted }}>{t('{0} آزمون در ۷ روز گذشته', faNum(total))}</T>
      </View>
      <View testID="daily-tests-bars" style={{ flexDirection: 'row', direction: 'ltr', alignItems: 'flex-end', gap: 6 }}>
        {days.map(d => {
          const on = pick ? pick === d.k : d.k === today;
          return (
            <Pressable key={d.k} testID={`daily-bar-${d.k}`} onPress={() => { tap(); setPick(d.k); }} accessibilityRole="button" accessibilityState={{ selected: on }}
              accessibilityLabel={`${dayLabel(d.k, { weekday: 'long', day: 'numeric', month: 'long' })}: ${t('{0} آزمون', faNum(d.n))}`}
              style={({ pressed }) => ({ flex: 1, minWidth: 0, gap: 8, opacity: pressed ? 0.65 : 1 })}>
              <View style={{ height: height + 28, alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                <T raw style={{ fontSize: 13, lineHeight: 20, fontWeight: '500', textAlign: 'center' }}>{faNum(d.n)}</T>
                <View testID={`daily-bar-fill-${d.k}`} style={{ width: '78%', height: d.n ? height * d.n / max : 4, borderTopLeftRadius: 7, borderTopRightRadius: 7, borderBottomLeftRadius: 3, borderBottomRightRadius: 3,
                  backgroundColor: d.n ? m.primary : c.line, opacity: on ? 1 : 0.85 }} />
              </View>
              <View style={{ minHeight: 26, borderRadius: 13, paddingHorizontal: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: d.k === today ? c.accentSoft : 'transparent' }}>
                <T raw numberOfLines={1} style={{ fontSize: 10.5, lineHeight: 16, color: on || d.k === today ? m.primary : c.muted, textAlign: 'center', fontWeight: d.k === today ? '500' : '400' }}>{dayLabel(d.k, { weekday: RTL ? 'narrow' : 'short' })}</T>
              </View>
            </Pressable>
          );
        })}
      </View>
      {selected ? <T raw testID="daily-tests-selection" style={{ fontSize: 12, lineHeight: 19, color: c.muted }}>{dayLabel(selected.k, { day: 'numeric', month: 'long' })} · {t('{0} آزمون', faNum(selected.n))}</T> : null}
    </View>
  );
}
