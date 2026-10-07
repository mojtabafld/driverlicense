// One lesson of «آموزش گام‌به‌گام» (?id=), one step per page: what you will learn, one idea per step (its picture, the
// rule to remember in a box and the law it comes from), «خودتان را بسنجید» (yes / no for each statement, then which were
// right and why), and the summary with the sources. The bar at the bottom: back / the step / next; next waits until a
// check is answered, and on the last step ✓ finishes the lesson (kept with the account) and goes back to the course.
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { API_URL } from '@/lib/config';
import { lessonById, type CourseStep } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { faNum } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { FootBtn, GlassBar } from '@/ui/glass-bar';
import { Icon } from '@/ui/icon';
import { Card, Enter, T, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

const PIC_BG = '#f2f3f5';

function Art({ k }: { k: string }) {
  const c = useColors(), { courseArt } = useApp();
  const v = courseArt[k];
  return (
    <View style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: 16, overflow: 'hidden', backgroundColor: PIC_BG, alignItems: 'center', justifyContent: 'center' }}>
      {v ? <Image source={{ uri: `${API_URL}/course-art/${k}.png?v=${v}` }} style={{ width: '100%', height: '100%' }} contentFit="contain" transition={200} />
        : <View style={{ alignItems: 'center', gap: 6 }}><Icon name="priority" size={34} color={c.faint} /><T style={{ color: c.faint, fontSize: 12.5 }}>تصویر در حال آماده شدن است</T></View>}
    </View>
  );
}

function RuleBox({ text, law }: { text: string; law?: string }) {
  const c = useColors();
  return (
    <View style={{ gap: 8, padding: 14, borderRadius: 14, backgroundColor: c.accentSoft, borderWidth: 1, borderColor: c.link }}>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
        <Icon name="bulbCircle" size={20} color={c.link} />
        <T style={{ flex: 1, fontWeight: '700', fontSize: 15, lineHeight: 25, color: c.text }}>{text}</T>
      </View>
      {law ? <T style={{ fontSize: 12, color: c.muted, writingDirection: 'rtl' }}>منبع: {law}</T> : null}
    </View>
  );
}

// «خودتان را بسنجید»: بله / خیر for each statement; once all are answered, each shows whether it was right.
function Check({ step, answers, onAnswer }: { step: Extract<CourseStep, { kind: 'check' }>; answers: (boolean | null)[]; onAnswer: (i: number, v: boolean) => void }) {
  const c = useColors();
  const all = answers.every(a => a !== null), right = step.statements.every((s, i) => answers[i] === s.ok);
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Icon name="checkCircle" size={18} color={c.link} />
        <T style={{ fontSize: 13, fontWeight: '700', color: c.link }}>خودتان را بسنجید</T>
      </View>
      <T style={{ fontSize: 17, fontWeight: '700', lineHeight: 29 }}>{step.q}</T>
      {step.statements.map((s, i) => {
        const a = answers[i], wrong = all && a !== s.ok;
        return (
          <View key={i} style={{ gap: 10, padding: 14, borderRadius: 14, borderWidth: 1.5, borderColor: all ? (wrong ? c.bad : c.ok) : c.line, backgroundColor: all ? (wrong ? c.badSoft : c.okSoft) : c.surface }}>
            <T style={{ fontSize: 15, lineHeight: 25 }}>{s.t}</T>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {([[true, 'بله'], [false, 'خیر']] as const).map(([v, label]) => {
                const on = a === v;
                return (
                  <Pressable key={label} disabled={all} onPress={() => { tap(); onAnswer(i, v); }} accessibilityRole="button" accessibilityState={{ selected: on }}
                    style={{ flex: 1, paddingVertical: 9, borderRadius: 10, alignItems: 'center', borderWidth: 1.5, borderColor: on ? c.strong : c.line, backgroundColor: on ? c.strong : 'transparent' }}>
                    <T style={{ fontWeight: '700', fontSize: 14, color: on ? c.strongFg : c.text }}>{label}</T>
                  </Pressable>
                );
              })}
            </View>
            {all ? <T style={{ fontSize: 13, color: wrong ? c.bad : c.ok, fontWeight: '600' }}>{wrong ? `پاسخ درست: ${s.ok ? 'بله' : 'خیر'}` : 'درست'}</T> : null}
          </View>
        );
      })}
      {all ? (
        <Enter>
          <View style={{ gap: 6, padding: 14, borderRadius: 14, backgroundColor: right ? c.okSoft : c.warnSoft }}>
            <T style={{ fontWeight: '700', fontSize: 14.5, color: right ? c.ok : c.warn }}>{right ? 'آفرین، درست بود!' : 'دوباره نگاه کنید:'}</T>
            <T style={{ fontSize: 14, lineHeight: 24 }}>{step.why}</T>
          </View>
        </Enter>
      ) : null}
    </View>
  );
}

function Step({ step, answers, onAnswer }: { step: CourseStep; answers: (boolean | null)[]; onAnswer: (i: number, v: boolean) => void }) {
  const c = useColors();
  if (step.kind === 'intro') {
    return (
      <Card style={{ gap: 12 }}>
        <T style={{ fontSize: 22, fontWeight: '800', lineHeight: 34 }}>{step.title}</T>
        <T style={{ fontSize: 15, lineHeight: 26, color: c.muted }}>{step.text}</T>
        <T style={{ fontWeight: '700', fontSize: 14.5, marginTop: 4 }}>در این درس یاد می‌گیرید:</T>
        {step.goals.map(g => (
          <View key={g} style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
            <Icon name="check" size={16} color={c.ok} />
            <T style={{ flex: 1, fontSize: 14.5, lineHeight: 24 }}>{g}</T>
          </View>
        ))}
      </Card>
    );
  }
  if (step.kind === 'teach') {
    return (
      <View style={{ gap: 12 }}>
        {step.art ? <Art k={step.art} /> : null}
        <Card style={{ gap: 10 }}>
          <T style={{ fontSize: 19, fontWeight: '800', lineHeight: 30 }}>{step.title}</T>
          <T style={{ fontSize: 15, lineHeight: 27 }}>{step.text}</T>
          {step.points?.map(p => (
            <View key={p} style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: c.link, marginTop: 10 }} />
              <T style={{ flex: 1, fontSize: 14.5, lineHeight: 25 }}>{p}</T>
            </View>
          ))}
        </Card>
        {step.rule ? <RuleBox text={step.rule} law={step.law} /> : null}
      </View>
    );
  }
  if (step.kind === 'check') return <Card><Check step={step} answers={answers} onAnswer={onAnswer} /></Card>;
  return (
    <View style={{ gap: 12 }}>
      <Card style={{ gap: 10 }}>
        <T style={{ fontSize: 19, fontWeight: '800' }}>جمع‌بندی</T>
        {step.points.map(p => (
          <View key={p} style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
            <Icon name="checkCircle" size={17} color={c.ok} />
            <T style={{ flex: 1, fontSize: 14.5, lineHeight: 25 }}>{p}</T>
          </View>
        ))}
      </Card>
      <Card style={{ gap: 6 }}>
        <T style={{ fontWeight: '700', fontSize: 14 }}>منابع</T>
        {step.sources.map(s => <T key={s} style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>• {s}</T>)}
      </Card>
    </View>
  );
}

export default function CourseLesson() {
  const c = useColors();
  const p = useLocalSearchParams<{ id?: string }>();
  const found = lessonById(String(p.id || ''));
  const { finish } = useCourseProgress();
  const [i, setI] = useState(0);
  // Answers of each check step (by step index): null until answered.
  const [answers, setAnswers] = useState<Record<number, (boolean | null)[]>>({});
  useEffect(() => { if (!found) router.back(); }, [found]);
  if (!found) return null;
  const { lesson, chapter } = found, steps = lesson.steps, step = steps[i], last = i === steps.length - 1;
  const ans = step.kind === 'check' ? answers[i] ?? step.statements.map(() => null) : [];
  const blocked = step.kind === 'check' && ans.some(a => a === null);
  const answer = (k: number, v: boolean) => setAnswers({ ...answers, [i]: ans.map((a, j) => (j === k ? v : a)) });
  const done = () => { finish(lesson.id); router.back(); };
  return (
    <View style={{ flex: 1 }}>
      <SubPage title={lesson.title} gap={12} scrollKey={i}>
        <View style={{ gap: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <T style={{ flex: 1, color: c.muted, fontSize: 12.5 }}>فصل {faNum(chapter.n)} · {chapter.title}</T>
            <T style={{ color: c.muted, fontSize: 12.5 }}>قدم {faNum(i + 1)} از {faNum(steps.length)}</T>
          </View>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            {steps.map((_, k) => <View key={k} style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: k <= i ? c.link : c.surface2 }} />)}
          </View>
        </View>
        <Enter key={i}><Step step={step} answers={ans} onAnswer={answer} /></Enter>
        <View style={{ height: 90 }} />
      </SubPage>
      <GlassBar
        start={<FootBtn label="قبلی" icon="arrowLeft" round disabled={!i} onPress={() => setI(i - 1)} />}
        middle={<T style={{ fontWeight: '700', fontSize: 15 }}>{faNum(i + 1)} / {faNum(steps.length)}</T>}
        end={last ? <FootBtn label="پایان درس" icon="check" round onPress={done} />
          : <FootBtn label="بعدی" icon="arrowRight" round disabled={blocked} onPress={() => setI(i + 1)} />} />
    </View>
  );
}
