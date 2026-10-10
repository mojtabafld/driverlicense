// «آموزش گام‌به‌گام»: preparing for the theory test, under a header like the tabs' but with its own minimal vector
// drawing (CourseArt, ui/header-art.tsx). Two parts, so it is clear at a glance what to do:
// - «برنامه‌ی امروز» (TodayCard): the whole course's progress, the next lesson with one button to it, and «مرور هوشمند»
//   (app/drill.tsx: the course's questions due again today, and the weakest lesson's when it is weak);
// - «نقشه‌ی راه» (RoadMap): the course as a winding road to the licence. Each chapter is a sign across the road (its
//   number, title and how many of its lessons are done; a chapter still being written is a small grey sign «به‌زودی»),
//   its lessons are stops on the road, left and right in turn, with their titles beside them (done: a green tick; the
//   next one: a bigger, pulsing stop with «بعدی»), and the lessons still being written one small locked stop. The part
//   of the road already driven has a green centre line. At the end, the flag: the real test's format.
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Easing, Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { COURSE, EXAM, type CourseChapter, type CourseLesson } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { ITEMS, SESSION_SIZE, dueCount, mastery, newCount, weakLessons } from '@/lib/drill';
import { useDrillProgress } from '@/lib/drill-progress';
import { faNum } from '@/lib/logic';
import { CourseArt } from '@/ui/header-art';
import { Icon, type IconName } from '@/ui/icon';
import { Button, Card, Enter, T, physical, physicalAlign, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

const openLesson = (l: CourseLesson) => { tap(); router.push({ pathname: '/course-lesson', params: { id: l.id } }); };
const openDrill = (lesson?: string) => { tap(); router.push({ pathname: '/drill', params: lesson ? { lesson } : {} }); };

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

// «برنامه‌ی امروز»: the course's progress as a bar, then the next lesson and today's review, each one tap away.
function TodayCard({ next, finished, ready }: { next: { lesson: CourseLesson; chapter: CourseChapter } | null; finished: number; ready: number }) {
  const c = useColors();
  const { cards, loaded } = useDrillProgress();
  const due = dueCount(cards), fresh = newCount(cards), m = mastery(cards), weak = weakLessons(cards)[0];
  const share = ready ? finished / ready : 0;
  const drillLine = !loaded ? 'در حال بارگذاری…' : due ? `${faNum(due)} سؤال منتظر مرور است` : fresh ? `${faNum(Math.min(SESSION_SIZE, fresh))} سؤال تازه، به شکل آزمون` : 'امروز چیزی برای مرور نمانده';
  return (
    <Card style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
          <T style={{ flex: 1, fontWeight: '800', fontSize: 18 }}>برنامه‌ی امروز</T>
          <T style={{ color: c.muted, fontSize: 12.5 }}>{faNum(finished)} از {faNum(ready)} درس · ٪{faNum(Math.round(share * 100))}</T>
        </View>
        <View style={{ height: 8, borderRadius: 4, backgroundColor: c.surface2, overflow: 'hidden' }}>
          <View style={{ width: `${Math.max(share * 100, share ? 4 : 0)}%`, height: '100%', borderRadius: 4, backgroundColor: c.ok }} />
        </View>
      </View>
      {next ? (
        <Task icon="play" tone="main" label={`۱ · درس بعدی · فصل ${faNum(next.chapter.n)}`} title={next.lesson.title}
          line={`${faNum(next.lesson.minutes)} دقیقه · ${faNum(next.lesson.steps.filter(s => s.kind === 'exam').length)} سؤال آزمونی`}
          action={finished ? 'ادامه' : 'شروع'} onPress={() => openLesson(next.lesson)} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Icon name="checkCircle" size={22} color={c.ok} />
          <T style={{ flex: 1, color: c.ok, fontWeight: '700', fontSize: 14 }}>همه‌ی درس‌های آماده را تمام کرده‌اید؛ درس‌های تازه به‌زودی.</T>
        </View>
      )}
      <View style={{ height: 1, backgroundColor: c.line }} />
      <Task icon="refresh" tone="soft" label={`${next ? '۲ · ' : ''}مرور هوشمند · تسلط ٪${faNum(Math.round(m * 100))} از ${faNum(ITEMS.length)} سؤال`} title="تمرین هوشمند"
        line={drillLine} action="شروع" onPress={() => openDrill()} />
      {weak && weak.m < 0.6 && loaded && finished ? (
        <Pressable onPress={() => openDrill(weak.lesson.id)} style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, borderRadius: 12, backgroundColor: c.warnSoft, opacity: pressed ? 0.8 : 1 })}>
          <Icon name="warning" size={16} color={c.warn} />
          <T style={{ flex: 1, fontSize: 13, color: c.text }}>ضعیف‌ترین درس شما: <T style={{ fontWeight: '700', fontSize: 13 }}>{weak.lesson.title}</T></T>
          <T style={{ fontSize: 12.5, fontWeight: '700', color: c.warn }}>تمرین</T>
        </Pressable>
      ) : null}
    </Card>
  );
}

// The road map's stops, top to bottom, each with its height on the map; `side` (lessons and «به‌زودی»): -1 the road's
// right (where a right-to-left page starts), 1 its left.
type Stop =
  | { kind: 'sign'; ch: CourseChapter; h: number }
  | { kind: 'lesson'; lesson: CourseLesson; side: number; h: number }
  | { kind: 'soon'; titles: string[]; side: number; h: number }
  | { kind: 'flag'; h: number };

function buildStops(): Stop[] {
  const out: Stop[] = [];
  let k = 0;
  for (const ch of COURSE) {
    const open = ch.lessons.length > 0;
    out.push({ kind: 'sign', ch, h: open ? 92 : 66 });
    if (!open) continue;
    for (const lesson of ch.lessons) out.push({ kind: 'lesson', lesson, side: k++ % 2 ? 1 : -1, h: 104 });
    if (ch.planned.length) out.push({ kind: 'soon', titles: ch.planned, side: k++ % 2 ? 1 : -1, h: 84 });
  }
  out.push({ kind: 'flag', h: 150 });
  return out;
}
const STOPS = buildStops();
// Each stop's top on the map, the map's height, and each lesson's number on the road (1, 2, …).
const TOPS = STOPS.map((_, i) => STOPS.slice(0, i).reduce((h, s) => h + s.h, 0));
const MAP_H = STOPS.reduce((h, s) => h + s.h, 0);
const LESSON_N = new Map(STOPS.filter(s => s.kind === 'lesson').map((s, i) => [(s as Extract<Stop, { kind: 'lesson' }>).lesson.id, i + 1]));
const NODE = 60, NEXT = 74, SOON = 42, ROAD = 30;

// The next lesson's stop: a soft ring growing and fading around it, over and over.
function Pulse({ size, color }: { size: number; color: string }) {
  const [v] = useState(() => new Animated.Value(0));
  useEffect(() => {
    const loop = Animated.loop(Animated.timing(v, { toValue: 1, duration: 1600, easing: Easing.out(Easing.quad), useNativeDriver: true }));
    loop.start();
    return () => loop.stop();
  }, [v]);
  return (
    <Animated.View pointerEvents="none" style={{ position: 'absolute', width: size, height: size, borderRadius: size / 2, backgroundColor: color,
      opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] }), transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, 1.6] }) }] }} />
  );
}

// A chapter's sign across the road: its number, title and progress; dim and small while it is still being written.
function ChapterSign({ ch, done }: { ch: CourseChapter; done: Record<string, unknown> }) {
  const c = useColors();
  const open = ch.lessons.length > 0, all = ch.lessons.length + ch.planned.length, finished = ch.lessons.filter(l => done[l.id]).length;
  const complete = open && finished === all;
  if (!open) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, backgroundColor: c.surface2, borderWidth: 1, borderColor: c.line, maxWidth: '86%' }}>
        <Icon name="lock" size={14} color={c.faint} />
        <T numberOfLines={1} style={{ flexShrink: 1, fontSize: 13, color: c.muted }}>فصل {faNum(ch.n)} · {ch.title}</T>
        <T style={{ fontSize: 11.5, color: c.faint }}>به‌زودی</T>
      </View>
    );
  }
  return (
    <View style={{ alignItems: 'center', gap: 4, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 14, backgroundColor: c.surface, borderWidth: 1.5, borderColor: complete ? c.ok : c.line, maxWidth: '90%' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <View style={{ backgroundColor: complete ? c.ok : c.text, borderRadius: 99, paddingHorizontal: 8, paddingVertical: 1 }}>
          <T style={{ color: c.surface, fontSize: 11.5, fontWeight: '700' }}>فصل {faNum(ch.n)}</T>
        </View>
        <T style={{ color: finished ? c.ok : c.faint, fontSize: 12, fontWeight: '700' }}>{complete ? 'تمام شد' : `${faNum(finished)} از ${faNum(all)} درس`}</T>
      </View>
      <T numberOfLines={1} style={{ fontWeight: '800', fontSize: 15.5, textAlign: 'center' }}>{ch.title}</T>
    </View>
  );
}

// A lesson's stop: done (a green tick), the next one (bigger, pulsing, «بعدی»), or still to do (its number).
function LessonStop({ lesson, n, on, isNext }: { lesson: CourseLesson; n: number; on: boolean; isNext: boolean }) {
  const c = useColors(), size = isNext ? NEXT : NODE;
  return (
    <Pressable onPress={() => openLesson(lesson)} accessibilityRole="button" accessibilityLabel={lesson.title}
      style={({ pressed }) => ({ width: size, height: size, alignItems: 'center', justifyContent: 'center', transform: [{ scale: pressed ? 0.94 : 1 }] })}>
      {isNext ? <Pulse size={size} color={c.btn} /> : null}
      <View style={{ width: size, height: size, borderRadius: size / 2, alignItems: 'center', justifyContent: 'center',
        backgroundColor: on ? c.ok : isNext ? c.btn : c.surface, borderWidth: on || isNext ? 0 : 3, borderColor: c.line,
        boxShadow: '0 3px 0 rgba(0,0,0,0.12)' } as any}>
        {on ? <Icon name="check" size={26} color="#fff" weight="bold" />
          : isNext ? <Icon name="play" size={28} color={c.btnFg} weight="bold" />
            : <T style={{ fontWeight: '800', fontSize: 19, color: c.text }}>{faNum(n)}</T>}
      </View>
    </Pressable>
  );
}

// The course as a winding road: the stops (STOPS) in a column, the road drawn under them through their centres.
function RoadMap({ done, next }: { done: Record<string, unknown>; next: string | null }) {
  const c = useColors();
  const [w, setW] = useState(0);
  const amp = Math.min(w * 0.24, 110);
  // Each stop's centre: x from the middle of the map (its side times `amp`), y from the stops above it.
  const pts = STOPS.map((s, i) => ({ x: w / 2 - ('side' in s ? s.side * amp : 0), y: TOPS[i] + s.h / 2 }));
  const height = MAP_H;
  // A smooth road through the centres: each piece leaves and arrives straight down.
  const road = (upto: number) => pts.slice(0, upto + 1).reduce((d, p, i) => {
    if (!i) return `M ${p.x} ${p.y - 40} L ${p.x} ${p.y}`;
    const q = pts[i - 1], my = (q.y + p.y) / 2;
    return `${d} C ${q.x} ${my} ${p.x} ${my} ${p.x} ${p.y}`;
  }, '');
  const full = road(pts.length - 1);
  // The road driven so far: up to the next lesson's stop (or all of it once every ready lesson is done).
  const nextAt = STOPS.findIndex(s => s.kind === 'lesson' && s.lesson.id === next);
  const lastLesson = STOPS.reduce((at, s, i) => (s.kind === 'lesson' ? i : at), 0);
  const driven = road(nextAt >= 0 ? nextAt : lastLesson);
  return (
    <View onLayout={e => setW(e.nativeEvent.layout.width)} style={{ height: w ? height : 400 }}>
      {w ? (
        <>
          <Svg width={w} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
            <Path d={full} stroke={c.line} strokeWidth={ROAD} fill="none" strokeLinecap="round" />
            <Path d={full} stroke={c.surface} strokeWidth={2.5} fill="none" strokeDasharray="10 12" strokeLinecap="round" />
            <Path d={driven} stroke={c.ok} strokeWidth={4} fill="none" strokeDasharray="10 12" strokeLinecap="round" />
          </Svg>
          {STOPS.map((s, i) => {
            const p = pts[i], top = p.y - s.h / 2;
            if (s.kind === 'sign') {
              return <View key={s.ch.id} style={{ position: 'absolute', top, left: 0, right: 0, height: s.h, alignItems: 'center', justifyContent: 'center' }}><ChapterSign ch={s.ch} done={done} /></View>;
            }
            if (s.kind === 'flag') {
              return (
                <View key="flag" style={{ position: 'absolute', top, left: 0, right: 0, height: s.h, alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                  <View style={{ width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface, borderWidth: 3, borderColor: c.line }}>
                    <Icon name="exam" size={24} color={c.text} />
                  </View>
                  <View style={{ alignItems: 'center', gap: 2, paddingHorizontal: 24 }}>
                    <T style={{ fontWeight: '800', fontSize: 15.5 }}>مقصد: قبولی در آزمون تئوری</T>
                    <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19, textAlign: 'center' }}>
                      {faNum(EXAM.questions)} موقعیت تصویری؛ با حداکثر {faNum(EXAM.maxMistakes)} اشتباه قبول می‌شوید.
                    </T>
                  </View>
                </View>
              );
            }
            // A lesson or «به‌زودی»: the stop on the road, its text beside it, towards the middle of the page.
            const size = s.kind === 'soon' ? SOON : s.kind === 'lesson' && s.lesson.id === next ? NEXT : NODE;
            const textW = w / 2 + amp - size / 2 - 14, onRight = s.side < 0;
            const box = physical(onRight ? { right: w - p.x + size / 2 + 12 } : { left: p.x + size / 2 + 12 });
            const align = physicalAlign(onRight ? 'right' : 'left');
            if (s.kind === 'soon') {
              return (
                <View key={`soon-${i}`} style={{ position: 'absolute', top, left: 0, right: 0, height: s.h }}>
                  <View style={[{ position: 'absolute', top: s.h / 2 - SOON / 2, width: SOON, height: SOON, borderRadius: SOON / 2, alignItems: 'center', justifyContent: 'center',
                    backgroundColor: c.surface2, borderWidth: 2, borderColor: c.line, borderStyle: 'dashed' }, physical({ left: p.x - SOON / 2 })]}>
                    <Icon name="lock" size={16} color={c.faint} />
                  </View>
                  <View style={[{ position: 'absolute', top: 0, height: s.h, width: textW, justifyContent: 'center', gap: 1 }, box]}>
                    <T style={{ fontSize: 12.5, fontWeight: '700', color: c.muted, textAlign: align }}>به‌زودی · {faNum(s.titles.length)} درس</T>
                    <T numberOfLines={2} style={{ fontSize: 12, lineHeight: 18, color: c.faint, textAlign: align }}>{s.titles.join('، ')}</T>
                  </View>
                </View>
              );
            }
            const on = !!done[s.lesson.id], isNext = s.lesson.id === next;
            return (
              <View key={s.lesson.id} style={{ position: 'absolute', top, left: 0, right: 0, height: s.h }}>
                <View style={[{ position: 'absolute', top: s.h / 2 - size / 2 }, physical({ left: p.x - size / 2 })]}>
                  <LessonStop lesson={s.lesson} n={LESSON_N.get(s.lesson.id) ?? 0} on={on} isNext={isNext} />
                </View>
                <Pressable onPress={() => openLesson(s.lesson)} style={[{ position: 'absolute', top: 0, height: s.h, width: textW, justifyContent: 'center', gap: 3 }, box]}>
                  <T numberOfLines={2} style={{ fontWeight: '700', fontSize: 15, lineHeight: 22, textAlign: align }}>{s.lesson.title}</T>
                  {isNext ? (
                    <View style={{ alignSelf: onRight ? 'flex-end' : 'flex-start', backgroundColor: c.btn, borderRadius: 99, paddingHorizontal: 9, paddingVertical: 1 }}>
                      <T style={{ color: c.btnFg, fontSize: 11.5, fontWeight: '700' }}>بعدی · {faNum(s.lesson.minutes)} دقیقه</T>
                    </View>
                  ) : <T style={{ color: on ? c.ok : c.muted, fontSize: 12, fontWeight: on ? '700' : '400', textAlign: align }}>{on ? 'انجام شد' : `${faNum(s.lesson.minutes)} دقیقه`}</T>}
                </Pressable>
              </View>
            );
          })}
        </>
      ) : null}
    </View>
  );
}

export default function Course() {
  const c = useColors();
  const { done } = useCourseProgress();
  const ready = COURSE.flatMap(ch => ch.lessons.map(lesson => ({ lesson, chapter: ch })));
  const finished = ready.filter(x => done[x.lesson.id]).length;
  const next = ready.find(x => !done[x.lesson.id]) ?? null;
  return (
    <SubPage title="آموزش گام‌به‌گام" subtitle="فصل به فصل، تا گواهینامه" hero={{ pic: 9, light: 10, icon: 'learn', art: CourseArt }}>
      <Enter><TodayCard next={next} finished={finished} ready={ready.length} /></Enter>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
        <T style={{ flex: 1, fontWeight: '800', fontSize: 18 }}>نقشه‌ی راه تا گواهینامه</T>
        <T style={{ color: c.muted, fontSize: 12 }}>هر ایستگاه یک درس</T>
      </View>
      <Enter><RoadMap done={done} next={next?.lesson.id ?? null} /></Enter>
      {next ? <Button label={`ادامه: ${next.lesson.title}`} icon="play" onPress={() => openLesson(next.lesson)} /> : null}
    </SubPage>
  );
}
