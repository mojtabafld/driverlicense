// «آموزش گام‌به‌گام»: preparing for the theory test, under a header like the tabs' but with its own minimal vector
// drawing (CourseArt, ui/header-art.tsx). First the progress (a ring, and a button to the next lesson), then how a lesson goes (four
// steps on a line) and the goal (the real test's format), then the way to the licence: the chapters in the official
// curriculum's order on a path, each
// with its lessons (a finished one ticked, the next one marked, those still being written locked «به‌زودی»).
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { COURSE, EXAM, lessonCount, readyCount, type CourseChapter, type CourseLesson } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { faNum } from '@/lib/logic';
import { CourseArt } from '@/ui/header-art';
import { Icon, type IconName } from '@/ui/icon';
import { Button, Card, Enter, Ring, T, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

const HOW: { icon: IconName; text: string }[] = [
  { icon: 'exam', text: 'در آزمون چه می‌پرسند' },
  { icon: 'learn', text: 'قاعده با تصویر و منبع' },
  { icon: 'warning', text: 'اشتباه‌های رایج' },
  { icon: 'checkCircle', text: 'سؤال‌ها به شکل آزمون' },
];

const openLesson = (l: CourseLesson) => { tap(); router.push({ pathname: '/course-lesson', params: { id: l.id } }); };

// How a lesson goes: four round steps joined by a line, each with its line of text under it.
function HowSteps() {
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row' }}>
      {HOW.map((h, i) => (
        <View key={h.text} style={{ flex: 1, alignItems: 'center', gap: 6 }}>
          <View style={{ width: '100%', height: 40, alignItems: 'center', justifyContent: 'center' }}>
            {/* The line to the neighbours, behind the circle (none before the first or after the last). */}
            <View style={{ position: 'absolute', top: 19, height: 2, backgroundColor: c.line, left: i === HOW.length - 1 ? '50%' : 0, right: i === 0 ? '50%' : 0 }} />
            <View style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accentSoft, borderWidth: 2, borderColor: c.surface }}>
              <Icon name={h.icon} size={18} color={c.link} />
            </View>
          </View>
          <T style={{ fontSize: 11.5, lineHeight: 17, color: c.muted, textAlign: 'center', paddingHorizontal: 2 }}>{h.text}</T>
        </View>
      ))}
    </View>
  );
}

// A chapter's number in a ring that fills, in green, with the share of its lessons done (the ones still being written
// count as not done); a full ring turns into a green disc with a tick. Dim while none of the chapter is written yet.
const BADGE = 44, BADGE_STROKE = 4;
function ChapterBadge({ n, share, open }: { n: number; share: number; open: boolean }) {
  const c = useColors(), r = (BADGE - BADGE_STROKE) / 2, C = 2 * Math.PI * r, full = share >= 1;
  return (
    <View style={{ width: BADGE, height: BADGE, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={BADGE} height={BADGE} style={{ position: 'absolute', top: 0, left: 0, transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={BADGE / 2} cy={BADGE / 2} r={r} stroke={c.line} strokeWidth={BADGE_STROKE} fill={full ? c.ok : open ? c.surface : c.surface2} />
        {share > 0 && !full ? <Circle cx={BADGE / 2} cy={BADGE / 2} r={r} stroke={c.ok} strokeWidth={BADGE_STROKE} fill="none" strokeLinecap="round"
          strokeDasharray={`${C} ${C}`} strokeDashoffset={C * (1 - share)} /> : null}
      </Svg>
      {full ? <Icon name="check" size={20} color="#fff" weight="semibold" />
        : <T style={{ fontWeight: '800', fontSize: 15, color: open ? c.text : c.muted, textAlign: 'center' }}>{faNum(n)}</T>}
    </View>
  );
}

// One chapter on the path: its badge on the rail (ChapterBadge) and the line down to the next chapter (green once the
// chapter is all done), beside its card with the lessons and how many of them are done.
function Chapter({ ch, last, done, next }: { ch: CourseChapter; last: boolean; done: Record<string, unknown>; next: string | null }) {
  const c = useColors();
  const open = ch.lessons.length > 0, all = ch.lessons.length + ch.planned.length, finished = ch.lessons.filter(l => done[l.id]).length;
  const share = all ? finished / all : 0, complete = share >= 1;
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <View style={{ width: BADGE, alignItems: 'center' }}>
        <ChapterBadge n={ch.n} share={share} open={open} />
        {last ? null : <View style={{ flex: 1, width: 3, borderRadius: 2, marginVertical: 4, backgroundColor: complete ? c.ok : c.line }} />}
      </View>
      <Card style={{ flex: 1, gap: 10, marginBottom: last ? 0 : 14, opacity: open ? 1 : 0.85 }}>
        <View style={{ gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <T style={{ flex: 1, fontWeight: '700', fontSize: 15.5 }}>{ch.title}</T>
            <T style={{ color: finished ? c.ok : c.faint, fontSize: 12, fontWeight: '700' }}>{faNum(finished)} از {faNum(all)}</T>
          </View>
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{ch.sub}</T>
        </View>
        <View style={{ gap: 6 }}>
          {ch.lessons.map(l => {
            const on = !!done[l.id], isNext = l.id === next;
            return (
              <Pressable key={l.id} onPress={() => openLesson(l)} accessibilityRole="button"
                style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12,
                  borderWidth: 1.5, borderColor: on ? c.ok : isNext ? c.link : c.line, backgroundColor: pressed ? c.surface2 : on ? c.okSoft : isNext ? c.accentSoft : c.surface })}>
                <Icon name={on ? 'checkCircle' : 'play'} size={18} color={on ? c.ok : c.link} />
                <T style={{ flex: 1, fontWeight: '700', fontSize: 14.5 }}>{l.title}</T>
                {isNext ? <View style={{ backgroundColor: c.link, borderRadius: 99, paddingHorizontal: 8, paddingVertical: 1 }}><T style={{ color: c.surface, fontSize: 11, fontWeight: '700' }}>بعدی</T></View>
                  : <T style={{ color: c.muted, fontSize: 12 }}>{on ? 'انجام شد' : `${faNum(l.minutes)} دقیقه`}</T>}
                <Icon name="chevronLeft" size={14} color={c.faint} />
              </Pressable>
            );
          })}
          {ch.planned.map(t => (
            <View key={t} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 9, paddingHorizontal: 12, borderRadius: 12, backgroundColor: c.surface2, opacity: 0.75 }}>
              <Icon name="lock" size={16} color={c.faint} />
              <T style={{ flex: 1, fontSize: 14, color: c.muted }}>{t}</T>
              <T style={{ color: c.faint, fontSize: 12 }}>به‌زودی</T>
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
}

export default function Course() {
  const c = useColors();
  const { done } = useCourseProgress();
  const ready = COURSE.flatMap(ch => ch.lessons), finished = ready.filter(l => done[l.id]).length;
  const next = ready.find(l => !done[l.id]) ?? null;
  const total = lessonCount();
  return (
    <SubPage title="آموزش گام‌به‌گام" subtitle="فصل به فصل، تا گواهینامه" hero={{ pic: 9, light: 10, icon: 'learn', art: CourseArt }}>
      <Enter>
        <Card style={{ gap: 14 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Ring value={ready.length ? finished / ready.length : 0} size={84} stroke={8} color={c.ok} label={`${faNum(finished)}/${faNum(ready.length)}`} />
            <View style={{ flex: 1, gap: 4 }}>
              <T style={{ fontWeight: '800', fontSize: 17 }}>پیشرفت شما</T>
              <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>
                {faNum(finished)} از {faNum(ready.length)} درس آماده انجام شده؛ {faNum(total - readyCount())} درس دیگر به‌زودی اضافه می‌شود.
              </T>
            </View>
          </View>
          {next ? <Button label={finished ? `ادامه: ${next.title}` : `شروع: ${next.title}`} icon="play" onPress={() => openLesson(next)} />
            : <T style={{ color: c.ok, fontWeight: '700', fontSize: 13.5, textAlign: 'center' }}>همه‌ی درس‌های آماده را انجام داده‌اید.</T>}
        </Card>
      </Enter>
      <Enter>
        <Card style={{ gap: 12 }}>
          <T style={{ fontWeight: '700', fontSize: 15.5 }}>هر درس در چهار گام</T>
          <HowSteps />
        </Card>
      </Enter>
      <Enter>
        <Card style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Icon name="exam" size={18} color={c.link} />
            <T style={{ flex: 1, fontWeight: '700', fontSize: 15.5 }}>هدف: قبولی در آزمون تئوری</T>
          </View>
          <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 23 }}>
            در آزمون واقعی {faNum(EXAM.questions)} موقعیت تصویری می‌بینید و برای هر گزینه «Ja» یا «Nej» می‌زنید؛ هر پاسخ غلط یک اشتباه است و با حداکثر {faNum(EXAM.maxMistakes)} اشتباه قبول می‌شوید.
            هر درس با چند سؤال دقیقاً به همین شکل تمام می‌شود و دوره با آزمون‌های کامل شبیه‌سازی‌شده.
          </T>
        </Card>
      </Enter>
      <T style={{ fontWeight: '800', fontSize: 18, marginTop: 4 }}>مسیر شما تا گواهینامه</T>
      <View>
        {COURSE.map((ch, i) => (
          <Enter key={ch.id}><Chapter ch={ch} last={i === COURSE.length - 1} done={done} next={next?.id ?? null} /></Enter>
        ))}
      </View>
    </SubPage>
  );
}
