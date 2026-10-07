// «آموزش گام‌به‌گام»: preparing for the theory test. The real test's format, the overall progress and how the lessons
// work, then the chapters in the official curriculum's order (each ending with its test, the course with full
// simulated exams), each with its lessons (a finished one ticked; those still being written «به‌زودی»), and the sources.
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { COURSE, EXAM, SOURCES, lessonCount, readyCount } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { faNum } from '@/lib/logic';
import { Icon, type IconName } from '@/ui/icon';
import { Card, Enter, T, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

const HOW: { icon: IconName; text: string }[] = [
  { icon: 'exam', text: 'در آزمون چه می‌پرسند' },
  { icon: 'learn', text: 'قاعده با تصویر و منبع' },
  { icon: 'warning', text: 'فخ‌های آزمون' },
  { icon: 'checkCircle', text: 'سؤال‌ها به شکل آزمون واقعی' },
];

export default function Course() {
  const c = useColors();
  const { done } = useCourseProgress();
  const ready = COURSE.flatMap(ch => ch.lessons), finished = ready.filter(l => done[l.id]).length;
  const total = lessonCount();
  return (
    <SubPage title="آموزش گام‌به‌گام" subtitle="آمادگی کامل برای آزمون تئوری گواهینامه‌ی B: فصل به فصل، با سؤال‌هایی به شکل آزمون واقعی، بر اساس قانون و برنامه‌ی رسمی آموزش دانمارک.">
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
      <Enter>
        <Card style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <T style={{ flex: 1, fontWeight: '700', fontSize: 16 }}>پیشرفت شما</T>
            <T style={{ color: c.muted, fontSize: 13 }}>{faNum(finished)} از {faNum(total)} درس</T>
          </View>
          <View style={{ height: 8, borderRadius: 4, backgroundColor: c.surface2, overflow: 'hidden', flexDirection: 'row' }}>
            <View style={{ width: `${Math.round((finished / Math.max(1, total)) * 100)}%`, backgroundColor: c.ok }} />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {HOW.map((h, i) => (
              <View key={h.text} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: c.surface2, borderRadius: 99, paddingVertical: 5, paddingHorizontal: 10 }}>
                <T style={{ fontSize: 12, color: c.faint }}>{faNum(i + 1)}</T>
                <Icon name={h.icon} size={14} color={c.link} />
                <T style={{ fontSize: 12.5, color: c.muted }}>{h.text}</T>
              </View>
            ))}
          </View>
          <T style={{ color: c.faint, fontSize: 12 }}>{faNum(readyCount())} درس آماده است؛ بقیه به‌زودی اضافه می‌شوند.</T>
        </Card>
      </Enter>
      {COURSE.map(ch => (
        <Enter key={ch.id}>
          <Card style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: ch.lessons.length ? c.strong : c.surface2 }}>
                <T style={{ fontWeight: '800', fontSize: 15, color: ch.lessons.length ? c.strongFg : c.muted, textAlign: 'center' }}>{faNum(ch.n)}</T>
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <T style={{ fontWeight: '700', fontSize: 15.5 }}>{ch.title}</T>
                <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{ch.sub}</T>
              </View>
            </View>
            <View style={{ gap: 6 }}>
              {ch.lessons.map(l => {
                const on = !!done[l.id];
                return (
                  <Pressable key={l.id} onPress={() => { tap(); router.push({ pathname: '/course-lesson', params: { id: l.id } }); }} accessibilityRole="button"
                    style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12,
                      borderWidth: 1.5, borderColor: on ? c.ok : c.link, backgroundColor: pressed ? c.surface2 : on ? c.okSoft : c.accentSoft })}>
                    <Icon name={on ? 'checkCircle' : 'play'} size={18} color={on ? c.ok : c.link} />
                    <T style={{ flex: 1, fontWeight: '700', fontSize: 14.5 }}>{l.title}</T>
                    <T style={{ color: c.muted, fontSize: 12 }}>{on ? 'انجام شد' : `${faNum(l.minutes)} دقیقه`}</T>
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
        </Enter>
      ))}
      <Card style={{ gap: 6 }}>
        <T style={{ fontWeight: '700', fontSize: 14 }}>منابع این دوره</T>
        {Object.values(SOURCES).map(s => <T key={s} style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>• {s}</T>)}
        <T style={{ color: c.faint, fontSize: 12, lineHeight: 19 }}>متن‌ها را خودمان بر اساس این منابع نوشته‌ایم و تصاویر برای همین دوره ساخته شده‌اند.</T>
      </Card>
    </SubPage>
  );
}
