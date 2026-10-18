// «آموزش گام‌به‌گام»: preparing for the theory test, under a header like the tabs' but with its own minimal vector
// drawing (CourseArt, ui/header-art.tsx). Two parts, so it is clear at a glance what to do:
// - «برنامه‌ی امروز» (TodayCard): the whole course's progress, the next lesson with one button to it, and «مرور هوشمند»
//   (app/drill.tsx: the course's questions due again today, and the weakest lesson's when it is weak);
// - «مسیر شما تا گواهینامه» (Timeline): the chapters in the official curriculum's order on one rail, each a badge
//   whose ring fills with its lessons done, then its lessons as dots on the rail beside their rows (done: a green tick;
//   the next one: a filled row with a pulsing dot and «ادامه»), and the lessons still being written in one faint line.
//   A chapter still being written is a single line «به‌زودی». The rail is green as far as the next lesson; at its end,
//   the real test's format.
import { router, useFocusEffect } from 'expo-router';

import { toPremium, useFree } from '@/lib/free';
import { useEffect, useState } from 'react';
import { Animated, Easing, Pressable, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { COURSE, EXAM, type CourseChapter, type CourseLesson } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { ITEMS, SESSION_SIZE, dueCount, mastery, newCount, weakLessons } from '@/lib/drill';
import { useDrillProgress } from '@/lib/drill-progress';
import { t, tr } from '@/lib/i18n';
import { useStreak } from '@/lib/streak';
import { Toggle } from '@/ui/toggle';
import { faNum } from '@/lib/logic';
import { CourseArt } from '@/ui/header-art';
import { Icon, type IconName } from '@/ui/icon';
import { Card, Enter, T, tap } from '@/ui/kit';
import { SearchBox } from '@/ui/search-box';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

// `ok` false: only with premium (lib/free.ts), so the premium page opens instead.
const openLesson = (l: CourseLesson, ok = true) => { tap(); if (!ok) return toPremium(); router.push({ pathname: '/course-lesson', params: { id: l.id } }); };
const openDrill = (lesson?: string, ok = true) => { tap(); if (!ok) return toPremium(); router.push({ pathname: '/drill', params: lesson ? { lesson } : {} }); };

// One task of today's plan: its round icon, a small label over its title, a line under it, and a pill button.
function Task({ icon, label, title, line, action, onPress, tone }: { icon: IconName; label: string; title: string; line: string; action: string; onPress: () => void; tone: 'main' | 'soft' }) {
  const c = useColors();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, opacity: pressed ? 0.8 : 1 })}>
      <View style={{ width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', backgroundColor: tone === 'main' ? c.btn : c.accentSoft }}>
        <Icon name={icon} size={20} color={tone === 'main' ? c.btnFg : c.link} />
      </View>
      <View style={{ flex: 1, gap: 1 }}>
        <T style={{ color: c.muted, fontSize: 12 }}>{label}</T>
        <T numberOfLines={1} style={{ fontWeight: '700', fontSize: 15.5 }}>{title}</T>
        <T style={{ color: c.muted, fontSize: 12.5 }}>{line}</T>
      </View>
      <View style={{ paddingHorizontal: 14, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: tone === 'main' ? c.btn : c.surface2 }}>
        <T style={{ fontWeight: '700', fontSize: 13.5, color: tone === 'main' ? c.btnFg : c.text }}>{action}</T>
      </View>
    </Pressable>
  );
}

// Days in a row with study (an exam, a lesson, a practice) and the last seven days as dots; under it the daily email
// reminder (lib/streak.ts): on / off and its hour, for an account with a confirmed address.
function StreakCard() {
  const c = useColors();
  const { data, error, load, setReminder } = useStreak();
  useFocusEffect(load);
  if (!data) return null;
  const { streak, today, week, reminder } = data;
  const hourText = `${faNum(reminder.hour)}:${faNum('00')}`;
  return (
    <Card style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', backgroundColor: today ? c.warn : c.surface2 }}>
          <Icon name="flame" size={22} color={today ? '#fff' : c.faint} />
        </View>
        <View style={{ flex: 1, gap: 1 }}>
          <T style={{ fontWeight: '800', fontSize: 16 }}>{streak ? t('{0} روز پیاپی', faNum(streak)) : 'رشته‌ی روزهای تمرین'}</T>
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{today ? 'امروز تمرین کرده‌اید؛ فردا هم برگردید.' : streak ? 'امروز هنوز تمرین نکرده‌اید؛ رشته را قطع نکنید.' : 'هر روز یک درس یا تمرین، رشته را شروع می‌کند.'}</T>
        </View>
        <View style={{ flexDirection: 'row', gap: 4, direction: 'ltr' } as any}>
          {week.map((d, k) => <View key={k} style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: d ? c.warn : c.line, opacity: k === 6 && !d ? 0.5 : 1 }} />)}
        </View>
      </View>
      {data.mail ? (
        <>
          <View style={{ height: 1, backgroundColor: c.line, opacity: 0.6 }} />
          {data.email ? (
            <View style={{ gap: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{ flex: 1, gap: 1 }}>
                  <T style={{ fontWeight: '700', fontSize: 14 }}>یادآوری روزانه با ایمیل</T>
                  <T style={{ color: c.muted, fontSize: 12, lineHeight: 18 }}>{t('هر روز ساعت {0}، اگر هنوز تمرین نکرده باشید', hourText)}</T>
                </View>
                <Toggle value={reminder.on} onChange={v => setReminder(v, reminder.hour)} label={tr('یادآوری روزانه با ایمیل')} />
              </View>
              {reminder.on ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, alignSelf: 'flex-start' }}>
                  <Pressable disabled={reminder.hour <= 5} onPress={() => { tap(); setReminder(true, reminder.hour - 1); }} accessibilityLabel={tr('زودتر')}
                    style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: c.surface2, alignItems: 'center', justifyContent: 'center', opacity: reminder.hour <= 5 ? 0.4 : 1 }}>
                    <T style={{ fontSize: 18, fontWeight: '700', lineHeight: 22 }}>−</T>
                  </Pressable>
                  <T style={{ fontWeight: '700', fontSize: 15, minWidth: 56, textAlign: 'center', writingDirection: 'ltr' }}>{hourText}</T>
                  <Pressable disabled={reminder.hour >= 22} onPress={() => { tap(); setReminder(true, reminder.hour + 1); }} accessibilityLabel={tr('دیرتر')}
                    style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: c.surface2, alignItems: 'center', justifyContent: 'center', opacity: reminder.hour >= 22 ? 0.4 : 1 }}>
                    <T style={{ fontSize: 18, fontWeight: '700', lineHeight: 22 }}>+</T>
                  </Pressable>
                </View>
              ) : null}
            </View>
          ) : (
            <Pressable onPress={() => { tap(); router.push('/account'); }} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Icon name="info" size={16} color={c.muted} />
              <T style={{ flex: 1, color: c.muted, fontSize: 12.5, lineHeight: 19 }}>برای یادآوری روزانه با ایمیل، اول در «حساب کاربری» یک ایمیل تأییدشده ثبت کنید.</T>
            </Pressable>
          )}
          {error ? <T style={{ color: c.bad, fontSize: 12.5 }}>{error}</T> : null}
        </>
      ) : null}
    </Card>
  );
}

// «برنامه‌ی امروز»: the course's progress as a bar, then the next lesson and today's review, each one tap away.
function TodayCard({ next, finished, ready }: { next: { lesson: CourseLesson; chapter: CourseChapter } | null; finished: number; ready: number }) {
  const c = useColors();
  const { cards, loaded } = useDrillProgress();
  const { limited, lessonOk } = useFree();
  const due = dueCount(cards), fresh = newCount(cards), m = mastery(cards), weak = weakLessons(cards)[0];
  const share = ready ? finished / ready : 0;
  const drillLine = !loaded ? 'در حال بارگذاری…' : due ? `${faNum(due)} سؤال منتظر مرور است` : fresh ? `${faNum(Math.min(SESSION_SIZE, fresh))} سؤال تازه، به شکل آزمون` : 'امروز چیزی برای مرور نمانده';
  return (
    <Card style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
          <T style={{ flex: 1, fontWeight: '800', fontSize: 18 }}>برنامه‌ی امروز</T>
          <T style={{ color: c.muted, fontSize: 12.5 }}>{faNum(finished)} از {faNum(ready)} درس، ٪{faNum(Math.round(share * 100))}</T>
        </View>
        <View style={{ height: 8, borderRadius: 4, backgroundColor: c.surface2, overflow: 'hidden' }}>
          <View style={{ width: `${Math.max(share * 100, share ? 4 : 0)}%`, height: '100%', borderRadius: 4, backgroundColor: c.ok }} />
        </View>
      </View>
      {next ? (
        <Task icon="play" tone="main" label={`درس بعدی، فصل ${faNum(next.chapter.n)}`} title={next.lesson.title}
          line={`${faNum(next.lesson.minutes)} دقیقه، ${faNum(next.lesson.steps.filter(s => s.kind === 'exam').length)} سؤال آزمونی`}
          action={finished ? 'ادامه' : 'شروع'} onPress={() => openLesson(next.lesson, lessonOk(next.lesson.id))} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Icon name="checkCircle" size={22} color={c.ok} />
          <T style={{ flex: 1, color: c.ok, fontWeight: '700', fontSize: 14 }}>همه‌ی درس‌های آماده را تمام کرده‌اید؛ درس‌های تازه به‌زودی.</T>
        </View>
      )}
      <View style={{ height: 1, backgroundColor: c.line }} />
      <Task icon="refresh" tone="soft" label={`مرور هوشمند، تسلط ٪${faNum(Math.round(m * 100))} از ${faNum(ITEMS.length)} سؤال`} title="تمرین هوشمند"
        line={drillLine} action="شروع" onPress={() => openDrill(undefined, !limited)} />
      {weak && weak.m < 0.6 && loaded && finished ? (
        <Pressable onPress={() => openDrill(weak.lesson.id, lessonOk(weak.lesson.id))} style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, borderRadius: 12, backgroundColor: c.warnSoft, opacity: pressed ? 0.8 : 1 })}>
          <Icon name="warning" size={16} color={c.warn} />
          <T style={{ flex: 1, fontSize: 13, color: c.text }}>ضعیف‌ترین درس شما: <T style={{ fontWeight: '700', fontSize: 13 }}>{weak.lesson.title}</T></T>
          <T style={{ fontSize: 12.5, fontWeight: '700', color: c.warn }}>تمرین</T>
        </Pressable>
      ) : null}
    </Card>
  );
}

// The timeline's rows, top to bottom: a chapter (its badge on the rail), a lesson (a dot on the rail), the lessons still
// being written in a chapter (one faint dot), and the finish.
type Row =
  | { kind: 'chapter'; ch: CourseChapter }
  | { kind: 'lesson'; lesson: CourseLesson }
  | { kind: 'soon'; titles: string[] }
  | { kind: 'finish' };
const ROWS: Row[] = [
  ...COURSE.flatMap((ch): Row[] => [{ kind: 'chapter', ch },
    ...(ch.lessons.length ? [...ch.lessons.map((lesson): Row => ({ kind: 'lesson', lesson })), ...(ch.planned.length ? [{ kind: 'soon', titles: ch.planned } as Row] : [])] : [])]),
  { kind: 'finish' },
];
const RAIL = 44, LINE = 3;
// Folded, the timeline stops after its third lesson; «نمایش همه» under it opens the rest.
const FOLD_AT = ROWS.reduce((at, r, i, a) => (at < 0 && r.kind === 'lesson' && a.slice(0, i + 1).filter(x => x.kind === 'lesson').length === 3 ? i : at), -1);
const FOLDS = FOLD_AT >= 0 && FOLD_AT < ROWS.length - 1;

// The next lesson's dot: a soft ring growing and fading around it, over and over.
function Pulse({ size, color }: { size: number; color: string }) {
  const [v] = useState(() => new Animated.Value(0));
  useEffect(() => {
    const loop = Animated.loop(Animated.timing(v, { toValue: 1, duration: 1600, easing: Easing.out(Easing.quad), useNativeDriver: true }));
    loop.start();
    return () => loop.stop();
  }, [v]);
  return (
    <Animated.View pointerEvents="none" style={{ position: 'absolute', width: size, height: size, borderRadius: size / 2, backgroundColor: color,
      opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] }), transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, 1.9] }) }] }} />
  );
}

// A chapter's number in a ring that fills, in green, with the share of its lessons done (the ones still being written
// count as not done); a full ring turns into a green disc with a tick. Small and grey with a lock while none of it is written.
const BADGE = 40, BADGE_STROKE = 4;
function ChapterBadge({ n, share, open }: { n: number; share: number; open: boolean }) {
  const c = useColors(), r = (BADGE - BADGE_STROKE) / 2, C = 2 * Math.PI * r, full = share >= 1;
  if (!open) {
    return (
      <View style={{ width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2, borderWidth: 1.5, borderColor: c.line }}>
        <Icon name="lock" size={13} color={c.faint} />
      </View>
    );
  }
  return (
    <View style={{ width: BADGE, height: BADGE, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={BADGE} height={BADGE} style={{ position: 'absolute', top: 0, left: 0, transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={BADGE / 2} cy={BADGE / 2} r={r} stroke={c.line} strokeWidth={BADGE_STROKE} fill={full ? c.ok : c.surface} />
        {share > 0 && !full ? <Circle cx={BADGE / 2} cy={BADGE / 2} r={r} stroke={c.ok} strokeWidth={BADGE_STROKE} fill="none" strokeLinecap="round"
          strokeDasharray={`${C} ${C}`} strokeDashoffset={C * (1 - share)} /> : null}
      </Svg>
      {full ? <Icon name="check" size={18} color="#fff" weight="bold" />
        : <T style={{ fontWeight: '800', fontSize: 14, color: c.text, textAlign: 'center' }}>{faNum(n)}</T>}
    </View>
  );
}

// One row of the timeline: the rail (the line in from the row above, the row's marker, the line on down; each part of
// the line green once driven) beside the row's content.
function Rail({ marker, top, bottom, first, last, children, markerH }: { marker: React.ReactNode; top: boolean; bottom: boolean; first: boolean; last: boolean;
  children: React.ReactNode; markerH: number }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <View style={{ width: RAIL, alignItems: 'center' }}>
        <View style={{ height: 10, width: LINE, backgroundColor: first ? 'transparent' : top ? c.ok : c.line }} />
        <View style={{ height: markerH, alignItems: 'center', justifyContent: 'center' }}>{marker}</View>
        <View style={{ flex: 1, minHeight: 8, width: LINE, backgroundColor: last ? 'transparent' : bottom ? c.ok : c.line }} />
      </View>
      <View style={{ flex: 1, paddingTop: 10, paddingBottom: 14, minHeight: markerH + 10, justifyContent: 'flex-start' }}>{children}</View>
    </View>
  );
}

// The course as a timeline: chapters on a rail, each with its lessons under it; the rail is green as far as the next lesson.
function Timeline({ done, next, all }: { done: Record<string, unknown>; next: string | null; all: boolean }) {
  const c = useColors();
  const rows = all || !FOLDS ? ROWS : ROWS.slice(0, FOLD_AT + 1);
  const { lessonOk } = useFree();
  const nextAt = ROWS.findIndex(r => r.kind === 'lesson' && r.lesson.id === next);
  // Rows above the next lesson's are driven (all of them when every ready lesson is done).
  const reach = nextAt >= 0 ? nextAt : ROWS.reduce((at, r, i) => (r.kind === 'lesson' ? i : at), 0);
  return (
    <View>
      {rows.map((r, i) => {
        // Folded, the rail runs on a little past the last row shown.
        const edges = { top: i <= reach, bottom: i < reach, first: i === 0, last: i === ROWS.length - 1 };
        if (r.kind === 'chapter') {
          const { ch } = r, open = ch.lessons.length > 0, all = ch.lessons.length + ch.planned.length, finished = ch.lessons.filter(l => done[l.id]).length;
          return (
            <Rail key={ch.id} {...edges} markerH={BADGE} marker={<ChapterBadge n={ch.n} share={all ? finished / all : 0} open={open} />}>
              {open ? (
                <View style={{ gap: 2, minHeight: BADGE, justifyContent: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <T style={{ color: c.muted, fontSize: 12, fontWeight: '700' }}>فصل {faNum(ch.n)}</T>
                    <View style={{ flex: 1, height: 1, backgroundColor: c.line }} />
                    <T style={{ color: finished ? c.ok : c.faint, fontSize: 12, fontWeight: '700' }}>{finished === all ? 'تمام شد' : `${faNum(finished)} از ${faNum(all)}`}</T>
                  </View>
                  <T style={{ fontWeight: '800', fontSize: 17 }}>{ch.title}</T>
                  <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{ch.sub}</T>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: BADGE }}>
                  <T numberOfLines={1} style={{ flex: 1, fontSize: 14, color: c.muted }}><T style={{ fontSize: 14, color: c.faint }}>فصل {faNum(ch.n)}: </T>{ch.title}</T>
                  <View style={{ backgroundColor: c.surface2, borderRadius: 99, paddingHorizontal: 8, paddingVertical: 2 }}>
                    <T style={{ fontSize: 11.5, color: c.faint }}>به‌زودی، {faNum(ch.planned.length)} درس</T>
                  </View>
                </View>
              )}
            </Rail>
          );
        }
        if (r.kind === 'lesson') {
          const on = !!done[r.lesson.id], isNext = r.lesson.id === next, locked = !lessonOk(r.lesson.id);
          const dot = isNext ? 20 : 16;
          return (
            <Rail key={r.lesson.id} {...edges} markerH={52} marker={
              <View style={{ width: dot, height: dot, alignItems: 'center', justifyContent: 'center' }}>
                {isNext ? <Pulse size={dot} color={c.btn} /> : null}
                <View style={{ width: dot, height: dot, borderRadius: dot / 2, alignItems: 'center', justifyContent: 'center',
                  backgroundColor: on ? c.ok : isNext ? c.btn : c.surface, borderWidth: on || isNext ? 0 : 2.5, borderColor: c.line }}>
                  {on ? <Icon name="check" size={10} color="#fff" weight="bold" /> : null}
                </View>
              </View>}>
              <Pressable onPress={() => openLesson(r.lesson, !locked)} accessibilityRole="button"
                style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 52, marginTop: -10, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 16,
                  backgroundColor: isNext ? c.btn : c.surface, borderWidth: isNext ? 0 : 1, borderColor: c.line, opacity: pressed ? 0.85 : locked ? 0.55 : 1, transform: [{ scale: pressed ? 0.985 : 1 }] })}>
                <View style={{ flex: 1, gap: 2 }}>
                  <T style={{ fontWeight: '700', fontSize: 15, color: isNext ? c.btnFg : c.text }}>{r.lesson.title}</T>
                  <T style={{ fontSize: 12, color: isNext ? c.btnFg : on ? c.ok : c.muted, opacity: isNext ? 0.8 : 1, fontWeight: on ? '700' : '400' }}>
                    {on ? 'انجام شد، دوباره ببینید' : `${faNum(r.lesson.minutes)} دقیقه، ${faNum(r.lesson.steps.filter(s => s.kind === 'exam').length)} سؤال آزمونی`}
                  </T>
                </View>
                {locked ? <Icon name="lock" size={15} color={isNext ? c.btnFg : c.muted} /> : isNext ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: c.btnFg, borderRadius: 99, paddingHorizontal: 12, height: 32 }}>
                    <Icon name="play" size={13} color={c.btn} weight="bold" />
                    <T style={{ color: c.btn, fontWeight: '700', fontSize: 13 }}>{Object.keys(done).length ? 'ادامه' : 'شروع'}</T>
                  </View>
                ) : <Icon name="chevronLeft" size={14} color={c.faint} />}
              </Pressable>
            </Rail>
          );
        }
        if (r.kind === 'soon') {
          return (
            <Rail key={`soon-${i}`} {...edges} markerH={16} marker={<View style={{ width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: c.line, borderStyle: 'dashed', backgroundColor: c.surface2 }} />}>
              <T numberOfLines={2} style={{ marginTop: -6, fontSize: 12.5, lineHeight: 20, color: c.faint }}>
                <T style={{ fontSize: 12.5, fontWeight: '700', color: c.muted }}>به‌زودی: </T>{r.titles.join('، ')}
              </T>
            </Rail>
          );
        }
        return (
          <Rail key="finish" {...edges} markerH={BADGE} marker={
            <View style={{ width: BADGE, height: BADGE, borderRadius: BADGE / 2, alignItems: 'center', justifyContent: 'center', backgroundColor: c.text }}>
              <Icon name="exam" size={18} color={c.surface} />
            </View>}>
            <View style={{ gap: 2, minHeight: BADGE, justifyContent: 'center' }}>
              <T style={{ fontWeight: '800', fontSize: 16 }}>مقصد: قبولی در آزمون تئوری</T>
              <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{faNum(EXAM.questions)} موقعیت تصویری؛ با حداکثر {faNum(EXAM.maxMistakes)} اشتباه قبول می‌شوید.</T>
            </View>
          </Rail>
        );
      })}
    </View>
  );
}

export default function Course() {
  const c = useColors();
  const { done } = useCourseProgress();
  const ready = COURSE.flatMap(ch => ch.lessons.map(lesson => ({ lesson, chapter: ch })));
  const finished = ready.filter(x => done[x.lesson.id]).length;
  const next = ready.find(x => !done[x.lesson.id]) ?? null;
  const [all, setAll] = useState(false);
  return (
    <SubPage title="آموزش گام‌به‌گام" subtitle="فصل به فصل، تا گواهینامه" hero={{ pic: 9, light: 10, icon: 'learn', art: CourseArt }}>
      <Enter><SearchBox /></Enter>
      <Enter><StreakCard /></Enter>
      <Enter><TodayCard next={next} finished={finished} ready={ready.length} /></Enter>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
        <T style={{ flex: 1, fontWeight: '800', fontSize: 18 }}>مسیر شما تا گواهینامه</T>
        <T style={{ color: c.muted, fontSize: 12 }}>{faNum(COURSE.length)} فصل</T>
      </View>
      <Enter><Timeline done={done} next={next?.lesson.id ?? null} all={all} /></Enter>
      {FOLDS ? (
        <Pressable onPress={() => { tap(); setAll(v => !v); }} accessibilityRole="button"
          style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, height: 46, borderRadius: 14,
            backgroundColor: c.accentSoft, opacity: pressed ? 0.75 : 1 })}>
          <T style={{ color: c.link, fontWeight: '700', fontSize: 14 }}>{all ? 'نمایش کمتر' : 'نمایش همه'}</T>
          <Icon name={all ? 'chevronUp' : 'chevronDown'} size={15} color={c.link} weight="semibold" />
        </Pressable>
      ) : null}
    </SubPage>
  );
}
