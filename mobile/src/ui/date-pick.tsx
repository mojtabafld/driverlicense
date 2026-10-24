// Picking a day to show the tests of (Mojtaba 2026-10-24): a sheet with a month of days (Monday first, as the
// calendar page), a dot under the days with a test, the chosen day filled; the arrows turn the month. Used by the
// test lists (ui/activity.tsx ActivityList: home's latest tests, the exam tab's history and the history page).
// Days are Copenhagen's, as the server's and the calendar page's.
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { DATE_LOCALE, tr } from '@/lib/i18n';
import { Icon, type IconName } from './icon';
import { ArcButton, T, tap } from './kit';
import { Sheet } from './sheet';
import { useColors } from './theme';

const DAY = 864e5;
export const dayOf = (t: number) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Copenhagen', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(t));
const noon = (k: string) => { const [y, m, d] = k.split('-').map(Number); return Date.UTC(y, m - 1, d, 12); };
const addDays = (k: string, n: number) => new Date(noon(k) + n * DAY).toISOString().slice(0, 10);
const weekday = (k: string) => (new Date(noon(k)).getUTCDay() + 6) % 7;   // Monday 0
export const dayLabel = (k: string, o: Intl.DateTimeFormatOptions) => new Date(noon(k)).toLocaleDateString(DATE_LOCALE, { timeZone: 'UTC', ...o });

export function DatePick({ open, onClose, value, busy, onPick }: { open: boolean; onClose: () => void; value: string | null; busy: Set<string>; onPick: (day: string | null) => void }) {
  const c = useColors();
  const [today] = useState(() => dayOf(Date.now()));
  // The month shown: the chosen day's, else the newest test's, else this one.
  const start = () => (value ?? ([...busy].sort().pop() || today)).slice(0, 7);
  const [month, setMonth] = useState(start);
  // (opened again: back at that month)
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) { setWasOpen(open); if (open) setMonth(start()); }
  const first = `${month}-01`, gridStart = addDays(first, -weekday(first));
  const grid = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i)).filter((k, i) => i < 35 || k.slice(0, 7) === month);
  const heads = grid.slice(0, 7).map(k => dayLabel(k, { weekday: 'short' }));
  const turn = (n: number) => { const [y, m] = month.split('-').map(Number); setMonth(new Date(Date.UTC(y, m - 1 + n, 1, 12)).toISOString().slice(0, 7)); };
  const round = (icon: IconName, onPress: () => void, a11y: string) => (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="button" accessibilityLabel={tr(a11y)} hitSlop={6}
      style={({ pressed }) => ({ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2, opacity: pressed ? 0.7 : 1 })}>
      <Icon name={icon} size={16} color={c.text} weight="semibold" />
    </Pressable>
  );
  return (
    <Sheet open={open} onClose={onClose}>
      <View style={{ gap: 12, paddingBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {/* (the earlier month at the start side, its arrow pointing there; icons turn with the language) */}
          <View style={{ transform: [{ scaleX: -1 }] }}>{round('chevronLeft', () => turn(-1), 'ماه قبل')}</View>
          <T raw style={{ flex: 1, textAlign: 'center', fontWeight: '700', fontSize: 17 }}>{dayLabel(first, { month: 'long', year: 'numeric' })}</T>
          {round('chevronLeft', () => turn(1), 'ماه بعد')}
        </View>
        <View style={{ flexDirection: 'row' }}>
          {heads.map((h, i) => <T key={i} raw style={{ flex: 1, textAlign: 'center', fontSize: 11.5, color: c.faint }}>{h}</T>)}
        </View>
        <View style={{ gap: 4 }}>
          {Array.from({ length: grid.length / 7 }, (_, r) => (
            <View key={r} style={{ flexDirection: 'row' }}>
              {grid.slice(r * 7, r * 7 + 7).map(k => {
                const on = k === value, has = busy.has(k), out = k.slice(0, 7) !== month;
                return (
                  <Pressable key={k} disabled={!has} onPress={() => { tap(); onPick(k); onClose(); }} accessibilityRole="button" accessibilityState={{ selected: on, disabled: !has }}
                    accessibilityLabel={dayLabel(k, { weekday: 'long', day: 'numeric', month: 'long' })}
                    style={({ pressed }) => ({ flex: 1, alignItems: 'center', opacity: pressed ? 0.7 : out ? 0.35 : 1 })}>
                    <View style={{ width: '100%', maxWidth: 46, alignItems: 'center', gap: 3, paddingVertical: 7, borderRadius: 14, backgroundColor: on ? c.cta : 'transparent' }}>
                      <T raw style={{ fontSize: 15.5, lineHeight: 22, fontWeight: on || k === today ? '700' : '500', color: on ? c.ctaFg : has ? (k === today ? c.link : c.text) : c.faint }}>{dayLabel(k, { day: 'numeric' })}</T>
                      <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: has ? (on ? c.ctaFg : c.link) : 'transparent' }} />
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
        <T style={{ color: c.muted, fontSize: 12.5, textAlign: 'center' }}>روزهای نقطه‌دار آزمون دارند؛ روی یکی بزنید.</T>
        {value ? <ArcButton label="نمایش همه‌ی روزها" onPress={() => { onPick(null); onClose(); }} icon="list" variant="secondary" /> : null}
      </View>
    </Sheet>
  );
}
