// «تقویم»: what the user did on each day, opened from the calendar button in the head of the learning and exam tabs
// (Mojtaba 2026-10-21, after a planner app's schedule: modern and minimal, in the app's theme). The month's name over a
// week strip (Monday first; the chosen day in the theme's filled colour, a dot under the days with something on them;
// it opens on this week, its name unfolding the whole month), then the chosen day as a timeline: its exams and the course lessons finished, each
// at its time on a card that opens it, with the user's own note on it (the note button on each card). The day's own
// note sits on top, written with the round «+» button. Days are Copenhagen's, as the server's study days.
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';

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
import { ArcButton, physical, T, tap } from '@/ui/kit';
import { Sheet } from '@/ui/sheet';
import { SubPage } from '@/ui/sub-page';
import { rgba } from '@/ui/palette';
import { useColors, useIsDark, type Colors } from '@/ui/theme';

const DAY = 864e5;
const keyOf = (t: number) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Copenhagen', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(t));
const noon = (k: string) => { const [y, m, d] = k.split('-').map(Number); return Date.UTC(y, m - 1, d, 12); };
const addDays = (k: string, n: number) => new Date(noon(k) + n * DAY).toISOString().slice(0, 10);
const weekday = (k: string) => (new Date(noon(k)).getUTCDay() + 6) % 7;   // Monday 0
const label = (k: string, o: Intl.DateTimeFormatOptions) => new Date(noon(k)).toLocaleDateString(DATE_LOCALE, { timeZone: 'UTC', ...o });
const clock = (t: number) => new Date(t).toLocaleTimeString(DATE_LOCALE, { timeZone: 'Europe/Copenhagen', hour: '2-digit', minute: '2-digit' });

// `kind`: the card's colour (a passed test green, a failed one coral, a lesson blue); `type`: its kind in words under the
// title; `secs`: how long it took (the card's time range ends at `at`).
type Kind = 'pass' | 'fail' | 'lesson';
type Item = { key: string; at: number; icon: IconName; title: string; type: string; secs: number; kind: Kind; open: () => void };

function itemsOf(day: string, attempts: Attempt[], done: Record<string, number>, bank: Parameters<typeof modeName>[1]): Item[] {
  const out: Item[] = [];
  for (const a of attempts) {
    if (keyOf(a.at) !== day) continue;
    const n = a.items.length, s = scoreOf(a), ok = n ? s / n >= 0.8 : false, lesson = a.mode === 'lesson';
    out.push({ key: `a:${a.at}`, at: a.at, icon: lesson ? 'learn' : 'exam', title: modeName(a, bank), kind: lesson ? 'lesson' : ok ? 'pass' : 'fail', open: () => openAttempt(a),
      secs: a.secs || 0, type: [lesson ? tr('درس') : tr('آزمون'), fmt('{0} از {1} درست', faNum(s), faNum(n))].join(' · ') });
  }
  for (const [id, at] of Object.entries(done)) {
    if (keyOf(at) !== day) continue;
    const f = lessonById(id);
    if (!f) continue;
    out.push({ key: `c:${id}`, at, icon: 'learn', title: f.lesson.title, kind: 'lesson', secs: f.lesson.minutes * 60, open: () => router.push({ pathname: '/course-lesson', params: { id } }),
      type: [tr('آموزش گام‌به‌گام'), fmt('فصل {0}', faNum(f.chapter.n))].join(' · ') });
  }
  return out.sort((x, y) => x.at - y.at);
}

// The cards' colours by kind, in the light and dark themes (Mojtaba 2026-10-29, after a planner's day view): a soft tint
// for the card, a stronger one for its icon's round tile and its edge, the full colour for the icon.
function tone(kind: Kind, c: Colors, dark: boolean) {
  const blue = dark ? '#7aa7ff' : '#2f6fdf';
  const full = kind === 'pass' ? c.ok : kind === 'fail' ? (dark ? '#ff8a73' : '#e2583e') : blue;
  return { full, card: rgba(full, dark ? 0.12 : 0.09), tile: rgba(full, dark ? 0.2 : 0.14) };
}

// (Titles in Persian, as the app's other lists: T shows them in the app's language.)
// One day of the strip or of the month: its number in a rounded tile, filled when chosen; a dot when it has something.
function DayCell({ k, on, today, busy, dim, onPress, c, head }: { k: string; on: boolean; today: boolean; busy: boolean; dim?: boolean; onPress: () => void; c: Colors; head?: string }) {
  return (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="button" accessibilityState={{ selected: on }} accessibilityLabel={label(k, { weekday: 'long', day: 'numeric', month: 'long' })}
      style={({ pressed }) => ({ flex: 1, alignItems: 'center', opacity: pressed ? 0.7 : dim ? 0.35 : 1 })}>
      <View style={{ width: '100%', maxWidth: 50, alignItems: 'center', gap: 4, paddingVertical: head ? 10 : 7, borderRadius: 14, backgroundColor: on ? c.strong : 'transparent' }}>
        {head ? <T raw numberOfLines={1} style={{ fontSize: RTL ? 10 : 11.5, lineHeight: 16, color: on ? c.strongFg : c.faint }}>{head}</T> : null}
        <T raw style={{ fontSize: 15.5, lineHeight: 22, fontWeight: on || today ? '700' : '500', color: on ? c.strongFg : today ? c.link : c.text }}>{label(k, { day: 'numeric' })}</T>
        <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: busy ? (on ? c.strongFg : c.faint) : 'transparent' }} />
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
  const c = useColors(), dark = useIsDark();
  const { attempts, bank } = useApp();
  const { done } = useCourseProgress();
  const { notes, save } = useNotes();
  const [today] = useState(() => keyOf(Date.now()));
  const [day, setDay] = useState(today), [month, setMonth] = useState(false);   // this week to begin with, the month a tap on its name away (Mojtaba 2026-10-22)
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

  const range = `${label(week[0], { day: 'numeric', month: 'short' })} – ${label(week[6], { day: 'numeric', month: 'short' })}`;
  const dayTitle = label(day, { weekday: 'long', day: 'numeric', month: 'long' });
  const dayNoteOpen = () => note(`d:${day}`, dayTitle);
  return (
    <View style={{ flex: 1 }}>
      <SubPage title="تقویم" gap={18}>
        {/* The head (Mojtaba 2026-10-29, after a planner's): the week (or month) in small words over its dates, which
            unfold the month, a short line under them, and at the end a dark square «+» for the day's note. */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ flex: 1, gap: 2 }}>
            <T style={{ fontSize: 14, color: c.muted }}>{month ? 'این ماه' : day === today || week.includes(today) ? 'این هفته' : 'هفته'}</T>
            <Pressable onPress={() => { tap(); setMonth(m => !m); }} accessibilityRole="button" accessibilityState={{ expanded: month }} hitSlop={6}
              style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', opacity: pressed ? 0.7 : 1 })}>
              <T raw style={{ fontSize: 22, lineHeight: 32, fontWeight: '700' }}>{month ? label(day, { month: 'long', year: 'numeric' }) : range}</T>
              <View style={month ? { transform: [{ rotate: '180deg' }] } : null}><Icon name="chevronDown" size={18} color={c.text} weight="semibold" /></View>
            </Pressable>
            <T style={{ fontSize: 13.5, color: c.muted }}>قدم‌های کوچک، هدف‌های بزرگ.</T>
          </View>
          <Pressable onPress={() => { tap(); dayNoteOpen(); }} accessibilityRole="button" accessibilityLabel={tr('یادداشت این روز')}
            style={({ pressed }) => ({ width: 50, height: 50, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: c.strong, opacity: pressed ? 0.85 : 1 })}>
            <Icon name={dayNote ? 'edit' : 'plus'} size={22} color={c.strongFg} weight="semibold" />
          </Pressable>
        </View>
        {/* The week (or the month) in a card of its own; the arrows step a week or a month. */}
        <View style={{ padding: 10, gap: 6, borderRadius: 22, backgroundColor: c.surface, borderWidth: 1, borderColor: c.cardBorder }}>
          {month ? (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4 }}>
                <Round icon="chevronLeft" flip label="ماه قبل" onPress={() => shift(-1)} c={c} />
                {day !== today ? (
                  <Pressable onPress={() => { tap(); setDay(today); }} accessibilityRole="button" hitSlop={6}
                    style={({ pressed }) => ({ paddingHorizontal: 12, height: 30, borderRadius: 15, justifyContent: 'center', backgroundColor: c.surface2, opacity: pressed ? 0.7 : 1 })}>
                    <T style={{ fontSize: 13, fontWeight: '600' }}>امروز</T>
                  </Pressable>
                ) : null}
                <Round icon="chevronLeft" label="ماه بعد" onPress={() => shift(1)} c={c} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                {heads.map((h, i) => <T key={i} raw style={{ flex: 1, textAlign: 'center', fontSize: 11.5, color: c.faint }}>{h}</T>)}
              </View>
              {Array.from({ length: grid.length / 7 }, (_, r) => (
                <View key={r} style={{ flexDirection: 'row' }}>
                  {grid.slice(r * 7, r * 7 + 7).map(k => <DayCell key={k} k={k} on={k === day} today={k === today} busy={busyDays.has(k)} dim={k.slice(0, 7) !== day.slice(0, 7)} c={c}
                    onPress={() => setDay(k)} />)}
                </View>
              ))}
            </>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              {week.map((k, i) => <DayCell key={k} k={k} head={heads[i]} on={k === day} today={k === today} busy={busyDays.has(k)} c={c} onPress={() => setDay(k)} />)}
            </View>
          )}
        </View>
        {/* The chosen day, with «امروز» at its end (green on today; on another day a tap goes back to today). */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <T raw style={{ flex: 1, fontSize: 18, lineHeight: 27, fontWeight: '700' }}>{dayTitle}</T>
          <Pressable disabled={day === today} onPress={() => { tap(); setDay(today); }} accessibilityRole="button"
            style={({ pressed }) => ({ paddingHorizontal: 14, height: 32, borderRadius: 16, justifyContent: 'center', backgroundColor: day === today ? c.okSoft : c.surface2, opacity: pressed ? 0.7 : 1 })}>
            <T style={{ fontSize: 13.5, fontWeight: '600', color: day === today ? c.ok : c.text }}>امروز</T>
          </Pressable>
        </View>
        {/* The day: each exam and lesson at its time on a card tinted by its kind, a coloured edge at its start; then a
            dashed card that adds the day's note. */}
        <View style={{ gap: 14 }}>
          {items.map(it => {
            const n = notes[it.key], tn = tone(it.kind, c, dark);
            const from = it.secs ? it.at - it.secs * 1000 : it.at;
            return (
              <View key={it.key} style={{ flexDirection: 'row', gap: 12 }}>
                <T raw style={{ width: 50, paddingTop: 14, fontSize: 16, lineHeight: 22, color: c.muted }}>{clock(from)}</T>
                <View style={[{ flex: 1, borderRadius: 18, backgroundColor: tn.card, overflow: 'hidden' }, physical(RTL ? { borderRightWidth: 3, borderRightColor: tn.full } : { borderLeftWidth: 3, borderLeftColor: tn.full })]}>
                  <Pressable onPress={() => { tap(); it.open(); }} accessibilityRole="button" style={({ pressed }) => ({ flexDirection: 'row', gap: 12, padding: 14, opacity: pressed ? 0.75 : 1 })}>
                    <View style={{ width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: tn.tile }}>
                      <Icon name={it.icon} size={20} color={tn.full} weight="semibold" />
                    </View>
                    <View style={{ flex: 1, gap: 4 }}>
                      <T numberOfLines={1} style={{ fontSize: 16, fontWeight: '700' }}>{it.title}</T>
                      <T raw numberOfLines={1} style={{ fontSize: 13, color: c.muted }}>{it.type}</T>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                        <Icon name="clock" size={15} color={c.text} />
                        <T raw style={{ flex: 1, fontSize: 13.5 }}>{it.secs ? `${clock(from)} – ${clock(it.at)}` : clock(it.at)}</T>
                        <Icon name="chevronLeft" size={15} color={c.muted} weight="semibold" />
                      </View>
                    </View>
                    <Pressable onPress={() => { tap(); note(it.key, it.title); }} accessibilityRole="button" accessibilityLabel={tr(n ? 'ویرایش یادداشت' : 'افزودن یادداشت')} hitSlop={8}
                      style={({ pressed }) => ({ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.6 : 1 })}>
                      <Icon name={n ? 'edit' : 'note'} size={18} color={tn.full} />
                    </Pressable>
                  </Pressable>
                  {n ? (
                    <View style={{ marginHorizontal: 14, marginBottom: 14, padding: 11, borderRadius: 12, backgroundColor: c.surface }}>
                      <T raw keepDa style={{ fontSize: 13.5, lineHeight: 22, color: c.text }}>{n.text}</T>
                    </View>
                  ) : null}
                </View>
              </View>
            );
          })}
          {!items.length ? (
            <T style={{ fontSize: 13.5, lineHeight: 22, color: c.muted, textAlign: 'center', paddingVertical: 6 }}>{day > today ? 'این روز هنوز نیامده است.' : 'در این روز آزمون یا درسی ثبت نشده است.'}</T>
          ) : null}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ width: 50 }} />
            <Pressable onPress={() => { tap(); dayNoteOpen(); }} accessibilityRole="button"
              style={({ pressed }) => ({ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderRadius: 18, borderWidth: 1.5, borderStyle: 'dashed', borderColor: c.line, opacity: pressed ? 0.7 : 1 })}>
              <View style={{ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
                <Icon name="plus" size={18} color={c.muted} />
              </View>
              <T style={{ fontSize: 14.5, color: c.muted }}>{dayNote ? 'ویرایش یادداشت این روز' : 'افزودن یادداشت برای این روز'}</T>
            </Pressable>
          </View>
        </View>
        {/* «یادداشت سریع»: the day's note, or an invitation to write one. */}
        <Pressable onPress={() => { tap(); dayNoteOpen(); }} accessibilityRole="button"
          style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: 20, backgroundColor: c.surface2, opacity: pressed ? 0.8 : 1 })}>
          <View style={{ width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface }}>
            <Icon name="bulbCircle" size={22} color={c.text} />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <T style={{ fontSize: 15, fontWeight: '700' }}>یادداشت سریع</T>
            {dayNote ? <T raw keepDa numberOfLines={2} style={{ fontSize: 13.5, lineHeight: 21, color: c.muted }}>{dayNote.text}</T>
              : <T style={{ fontSize: 13.5, color: c.muted }}>فکرهایتان را اینجا بنویسید…</T>}
          </View>
          <Icon name="chevronLeft" size={16} color={c.muted} weight="semibold" />
        </Pressable>
        <View style={{ height: 20 }} />
      </SubPage>
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
