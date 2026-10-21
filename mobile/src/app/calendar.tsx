// «تقویم»: what the user did on each day, opened from the calendar button in the head of the learning and exam tabs
// (Mojtaba 2026-10-21, after a planner app's schedule: modern and minimal, in the app's theme). The month's name over a
// week strip (Monday first; the chosen day in the theme's filled colour, a dot under the days with something on them;
// it opens on the whole month, its name folding it to the week), then the chosen day as a timeline: its exams and the course lessons finished, each
// at its time on a card that opens it, with the user's own note on it (the note button on each card). The day's own
// note sits on top, written with the round «+» button. Days are Copenhagen's, as the server's study days.
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Attempt } from '@/lib/bank';
import { lessonById } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { DATE_LOCALE, RTL, t as fmt, tr } from '@/lib/i18n';
import { faNum, scoreOf } from '@/lib/logic';
import { modeName } from '@/lib/names';
import { useNotes } from '@/lib/notes';
import { useApp } from '@/lib/store';
import { openAttempt } from '@/ui/activity';
import { Icon, type IconName } from '@/ui/icon';
import { ArcButton, T, tap } from '@/ui/kit';
import { Sheet } from '@/ui/sheet';
import { SubPage } from '@/ui/sub-page';
import { useColors, type Colors } from '@/ui/theme';

const DAY = 864e5;
const keyOf = (t: number) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Copenhagen', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(t));
const noon = (k: string) => { const [y, m, d] = k.split('-').map(Number); return Date.UTC(y, m - 1, d, 12); };
const addDays = (k: string, n: number) => new Date(noon(k) + n * DAY).toISOString().slice(0, 10);
const weekday = (k: string) => (new Date(noon(k)).getUTCDay() + 6) % 7;   // Monday 0
const label = (k: string, o: Intl.DateTimeFormatOptions) => new Date(noon(k)).toLocaleDateString(DATE_LOCALE, { timeZone: 'UTC', ...o });
const clock = (t: number) => new Date(t).toLocaleTimeString(DATE_LOCALE, { timeZone: 'Europe/Copenhagen', hour: '2-digit', minute: '2-digit' });

type Item = { key: string; at: number; icon: IconName; title: string; sub: string; tone?: 'ok' | 'bad'; open: () => void };

function itemsOf(day: string, attempts: Attempt[], done: Record<string, number>, bank: Parameters<typeof modeName>[1]): Item[] {
  const out: Item[] = [];
  for (const a of attempts) {
    if (keyOf(a.at) !== day) continue;
    const n = a.items.length, s = scoreOf(a), ok = n ? s / n >= 0.8 : false;
    out.push({ key: `a:${a.at}`, at: a.at, icon: a.mode === 'lesson' ? 'learn' : 'exam', title: modeName(a, bank), tone: ok ? 'ok' : 'bad', open: () => openAttempt(a),
      sub: [a.mode === 'lesson' ? tr('درس') : tr('آزمون'), fmt('{0} از {1} درست', faNum(s), faNum(n)), a.secs ? fmt('{0} دقیقه', faNum(Math.max(1, Math.round(a.secs / 60)))) : ''].filter(Boolean).join(' · ') });
  }
  for (const [id, at] of Object.entries(done)) {
    if (keyOf(at) !== day) continue;
    const f = lessonById(id);
    if (!f) continue;
    out.push({ key: `c:${id}`, at, icon: 'learn', title: f.lesson.title, open: () => router.push({ pathname: '/course-lesson', params: { id } }),
      sub: [tr('آموزش گام‌به‌گام'), fmt('فصل {0}', faNum(f.chapter.n)), fmt('{0} دقیقه', faNum(f.lesson.minutes))].join(' · ') });
  }
  return out.sort((x, y) => x.at - y.at);
}

// (Titles in Persian, as the app's other lists: T shows them in the app's language.)
// One day of the strip or of the month: its number in a rounded tile, filled when chosen; a dot when it has something.
function DayCell({ k, on, today, busy, dim, onPress, c, head }: { k: string; on: boolean; today: boolean; busy: boolean; dim?: boolean; onPress: () => void; c: Colors; head?: string }) {
  return (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="button" accessibilityState={{ selected: on }} accessibilityLabel={label(k, { weekday: 'long', day: 'numeric', month: 'long' })}
      style={({ pressed }) => ({ flex: 1, alignItems: 'center', opacity: pressed ? 0.7 : dim ? 0.35 : 1 })}>
      <View style={{ width: '100%', maxWidth: 46, alignItems: 'center', gap: 4, paddingVertical: head ? 9 : 7, borderRadius: 14, backgroundColor: on ? c.cta : 'transparent' }}>
        {head ? <T raw style={{ fontSize: 11.5, lineHeight: 16, color: on ? c.ctaFg : c.faint }}>{head}</T> : null}
        <T raw style={{ fontSize: 15.5, lineHeight: 22, fontWeight: on || today ? '700' : '500', color: on ? c.ctaFg : today ? c.link : c.text }}>{label(k, { day: 'numeric' })}</T>
        <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: busy ? (on ? c.ctaFg : c.link) : 'transparent' }} />
      </View>
    </Pressable>
  );
}

const Round = ({ icon, onPress, label: a11y, c, flip }: { icon: IconName; onPress: () => void; label: string; c: Colors; flip?: boolean }) => (
  <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="button" accessibilityLabel={tr(a11y)} hitSlop={6}
    style={({ pressed }) => ({ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2, opacity: pressed ? 0.7 : 1 })}>
    <View style={flip ? { transform: [{ scaleX: -1 }] } : null}><Icon name={icon} size={16} color={c.text} weight="semibold" /></View>
  </Pressable>
);

export default function Calendar() {
  const c = useColors(), ins = useSafeAreaInsets();
  const { attempts, bank } = useApp();
  const { done } = useCourseProgress();
  const { notes, save } = useNotes();
  const [today] = useState(() => keyOf(Date.now()));
  const [day, setDay] = useState(today), [month, setMonth] = useState(true);   // the whole month to begin with (Mojtaba 2026-10-21)
  const [edit, setEdit] = useState<{ key: string; title: string } | null>(null), [text, setText] = useState(''), [busy, setBusy] = useState(false), [err, setErr] = useState('');
  const note = (key: string, title: string) => { setText(notes[key]?.text ?? ''); setErr(''); setEdit({ key, title }); };

  // The days with something on them: an exam, a finished lesson or a note.
  const busyDays = useMemo(() => {
    const s = new Set<string>();
    attempts.forEach(a => s.add(keyOf(a.at)));
    Object.values(done).forEach(at => s.add(keyOf(at)));
    Object.keys(notes).forEach(k => { if (k.startsWith('d:')) s.add(k.slice(2)); });
    return s;
  }, [attempts, done, notes]);
  const items = useMemo(() => itemsOf(day, attempts, done, bank), [day, attempts, done, bank]);
  const dayNote = notes[`d:${day}`];

  const start = addDays(day, -weekday(day)), week = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  const first = `${day.slice(0, 8)}01`, gridStart = addDays(first, -weekday(first));
  const grid = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i)).filter((k, i) => i < 35 || k.slice(0, 7) === day.slice(0, 7));
  const shift = (n: number) => {
    if (!month) { setDay(addDays(day, n * 7)); return; }
    const [y, m] = day.split('-').map(Number), d = new Date(Date.UTC(y, m - 1 + n, 1, 12));
    setDay(d.toISOString().slice(0, 10));
  };
  const heads = week.map(k => label(k, { weekday: 'short' }));
  const keep = async () => {
    if (!edit || busy) return;
    setBusy(true); setErr('');
    try { await save(edit.key, text); setEdit(null); } catch (e) { setErr(e instanceof Error && e.message ? e.message : tr('ذخیره نشد؛ دوباره امتحان کنید.')); }
    setBusy(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <SubPage title="تقویم" subtitle="آزمون‌ها، درس‌ها و یادداشت‌های هر روز" gap={18}>
        <View style={{ gap: 14 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Pressable onPress={() => { tap(); setMonth(m => !m); }} accessibilityRole="button" accessibilityState={{ expanded: month }} hitSlop={6}
              style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 6, opacity: pressed ? 0.7 : 1 })}>
              <T raw style={{ fontSize: 21, lineHeight: 30, fontWeight: '700' }}>{label(day, { month: 'long', year: 'numeric' })}</T>
              <View style={month ? { transform: [{ rotate: '180deg' }] } : null}><Icon name="chevronDown" size={16} color={c.muted} weight="semibold" /></View>
            </Pressable>
            <View style={{ flex: 1 }} />
            {day !== today ? (
              <Pressable onPress={() => { tap(); setDay(today); }} accessibilityRole="button" hitSlop={6}
                style={({ pressed }) => ({ paddingHorizontal: 12, height: 32, borderRadius: 16, justifyContent: 'center', backgroundColor: c.accentSoft, opacity: pressed ? 0.7 : 1 })}>
                <T style={{ fontSize: 13, fontWeight: '600', color: c.link }}>امروز</T>
              </Pressable>
            ) : null}
            <Round icon="chevronLeft" flip label={month ? 'ماه قبل' : 'هفته‌ی قبل'} onPress={() => shift(-1)} c={c} />
            <Round icon="chevronLeft" label={month ? 'ماه بعد' : 'هفته‌ی بعد'} onPress={() => shift(1)} c={c} />
          </View>
          {month ? (
            <View style={{ gap: 2 }}>
              <View style={{ flexDirection: 'row' }}>
                {heads.map((h, i) => <T key={i} raw style={{ flex: 1, textAlign: 'center', fontSize: 11.5, color: c.faint }}>{h}</T>)}
              </View>
              {Array.from({ length: grid.length / 7 }, (_, r) => (
                <View key={r} style={{ flexDirection: 'row' }}>
                  {grid.slice(r * 7, r * 7 + 7).map(k => <DayCell key={k} k={k} on={k === day} today={k === today} busy={busyDays.has(k)} dim={k.slice(0, 7) !== day.slice(0, 7)} c={c}
                    onPress={() => setDay(k)} />)}
                </View>
              ))}
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              {week.map((k, i) => <DayCell key={k} k={k} head={heads[i]} on={k === day} today={k === today} busy={busyDays.has(k)} c={c} onPress={() => setDay(k)} />)}
            </View>
          )}
        </View>
        <View style={{ height: 1, backgroundColor: c.line }} />
        {dayNote ? (
          <Pressable onPress={() => { tap(); note(`d:${day}`, label(day, { weekday: 'long', day: 'numeric', month: 'long' })); }} accessibilityRole="button"
            style={({ pressed }) => ({ flexDirection: 'row', gap: 12, padding: 14, borderRadius: 18, backgroundColor: c.accentSoft, opacity: pressed ? 0.85 : 1 })}>
            <Icon name="note" size={19} color={c.link} />
            <View style={{ flex: 1, gap: 3 }}>
              <T style={{ fontSize: 12.5, fontWeight: '700', color: c.link }}>یادداشت این روز</T>
              <T raw keepDa style={{ fontSize: 14.5, lineHeight: 23 }}>{dayNote.text}</T>
            </View>
          </Pressable>
        ) : null}
        {items.length ? (
          <View style={{ gap: 12 }}>
            {items.map(it => {
              const n = notes[it.key];
              return (
                <View key={it.key} style={{ flexDirection: 'row', gap: 12 }}>
                  <T raw style={{ width: 50, paddingTop: 16, fontSize: 12.5, color: c.muted }}>{clock(it.at)}</T>
                  <View style={{ flex: 1, borderRadius: 18, backgroundColor: n ? c.accentSoft : c.surface, borderWidth: n ? 0 : 1, borderColor: c.line, overflow: 'hidden' }}>
                    <Pressable onPress={() => { tap(); it.open(); }} accessibilityRole="button" style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, opacity: pressed ? 0.75 : 1 })}>
                      <View style={{ width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: n ? c.surface : c.surface2 }}>
                        <Icon name={it.icon} size={19} color={c.text} />
                      </View>
                      <View style={{ flex: 1, gap: 2 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                          {it.tone ? <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: it.tone === 'ok' ? c.ok : c.bad }} /> : null}
                          <T numberOfLines={1} style={{ flex: 1, fontSize: 15, fontWeight: '700' }}>{it.title}</T>
                        </View>
                        <T raw numberOfLines={1} style={{ fontSize: 12.5, lineHeight: 19, color: c.muted }}>{it.sub}</T>
                      </View>
                      <Pressable onPress={() => { tap(); note(it.key, it.title); }} accessibilityRole="button" accessibilityLabel={tr(n ? 'ویرایش یادداشت' : 'افزودن یادداشت')} hitSlop={6}
                        style={({ pressed }) => ({ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: n ? c.surface : c.surface2, opacity: pressed ? 0.7 : 1 })}>
                        <Icon name={n ? 'edit' : 'note'} size={16} color={n ? c.link : c.muted} />
                      </Pressable>
                    </Pressable>
                    {n ? (
                      <View style={{ marginHorizontal: 12, marginBottom: 12, padding: 11, borderRadius: 12, backgroundColor: c.surface }}>
                        <T raw keepDa style={{ fontSize: 13.5, lineHeight: 22, color: c.text }}>{n.text}</T>
                      </View>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={{ alignItems: 'center', gap: 10, paddingVertical: 30 }}>
            <View style={{ width: 54, height: 54, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
              <Icon name="calendar" size={26} color={c.muted} />
            </View>
            <T style={{ fontSize: 15, fontWeight: '600' }}>{day > today ? 'این روز هنوز نیامده است.' : 'در این روز آزمون یا درسی ثبت نشده است.'}</T>
            <T style={{ fontSize: 13, lineHeight: 21, color: c.muted, textAlign: 'center' }}>با دکمه‌ی + برای این روز یادداشت بگذارید.</T>
          </View>
        )}
        <View style={{ height: 70 }} />
      </SubPage>
      {/* The day's note, as the planner's round «+». */}
      <Pressable onPress={() => { tap(); note(`d:${day}`, label(day, { weekday: 'long', day: 'numeric', month: 'long' })); }} accessibilityRole="button"
        accessibilityLabel={tr('یادداشت این روز')}
        style={({ pressed }) => ({ position: 'absolute', bottom: ins.bottom + 22, [RTL ? 'left' : 'right']: 22, width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center',
          backgroundColor: c.cta, opacity: pressed ? 0.85 : 1, shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 5 })}>
        <Icon name={dayNote ? 'edit' : 'plus'} size={24} color={c.ctaFg} weight="semibold" />
      </Pressable>
      <Sheet open={!!edit} onClose={() => { if (!busy) setEdit(null); }} maxHeight="80%">
        {edit ? (
          <View style={{ gap: 10, paddingHorizontal: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Icon name="note" size={18} color={c.link} />
              <T style={{ fontSize: 13, fontWeight: '700', color: c.link }}>یادداشت</T>
            </View>
            <T style={{ fontSize: 17, lineHeight: 25, fontWeight: '700' }}>{edit.title}</T>
            {/* 16px at least: a smaller field makes iPhone zoom the page in as it is typed in, and stay zoomed. */}
            <TextInput value={text} onChangeText={v => { setText(v); if (err) setErr(''); }} multiline autoFocus maxLength={2000} placeholder={tr('چیزی که می‌خواهید به خاطر بسپارید…')}
              placeholderTextColor={c.faint} textAlignVertical="top"
              style={[{ minHeight: 92, maxHeight: 180, padding: 12, borderRadius: 14, backgroundColor: c.surface2, color: c.text, fontSize: 16, lineHeight: 24,
                fontFamily: RTL ? 'Vazirmatn-400' : 'Inter-400', textAlign: RTL ? 'right' : 'left' }, Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : null]} />
            {err ? <T raw style={{ color: c.bad, fontSize: 13 }}>{err}</T> : null}
            <ArcButton label={busy ? 'در حال ذخیره…' : 'ذخیره'} icon="check" onPress={keep} />
            {notes[edit.key] ? (
              <Pressable onPress={() => { tap(); setText(''); setBusy(true); save(edit.key, '').then(() => setEdit(null)).catch(() => {}).finally(() => setBusy(false)); }} accessibilityRole="button"
                style={({ pressed }) => ({ alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, opacity: pressed ? 0.7 : 1 })}>
                <Icon name="trash" size={16} color={c.bad} />
                <T style={{ fontSize: 14, fontWeight: '600', color: c.bad }}>حذف یادداشت</T>
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </Sheet>
    </View>
  );
}
