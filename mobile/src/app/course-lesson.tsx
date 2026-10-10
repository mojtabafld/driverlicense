// One lesson of «آموزش گام‌به‌گام» (?id=), one step per page, aimed at the theory test: what the exam asks about the
// topic, one rule per step (its picture, the rule in a box with its law, and «حواستان باشد»: how the exam tries to catch you),
// then the lesson's test in the exam's own format (the situation in a picture, the question in Danish with its Persian
// translation, and its statements as boxes to tick, as in the real test and the app's exam: a ticked statement is
// «Ja», one left unticked «Nej»; «بررسی پاسخ» then shows which were right and why), its result counted in mistakes
// against the real test's limit (and «تکرار آزمون»), and the summary with the sources. The bar at the bottom: back /
// the step / next; next waits until a question is checked, and ✓ on the last step finishes the lesson (kept with the
// account) and goes back to the course.
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { API_URL } from '@/lib/config';
import { EXAM, lessonById, type CourseStep } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { faNum } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { FootBtn, GlassBar } from '@/ui/glass-bar';
import { Icon } from '@/ui/icon';
import { OptionBox } from '@/ui/option-box';
import { Button, Card, Enter, T, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { DA_FONT, useColors } from '@/ui/theme';

const PIC_BG = '#f2f3f5';
// Each exam question's ticks (by step index; unticked until touched) and whether it has been checked.
type Answers = Record<number, boolean[]>;

function Art({ k }: { k: string }) {
  const c = useColors(), { courseArt } = useApp();
  const v = courseArt[k];
  return (
    <View style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: 16, overflow: 'hidden', backgroundColor: PIC_BG, alignItems: 'center', justifyContent: 'center' }}>
      {v ? <Image source={{ uri: `${API_URL}/course-art/${k}.png?v=${v}` }} style={{ width: '100%', height: '100%' }} contentFit="contain" transition={200} />
        : <View style={{ alignItems: 'center', gap: 6, padding: 16 }}><Icon name="exam" size={34} color={c.faint} /><T style={{ color: c.faint, fontSize: 12.5, textAlign: 'center' }}>تصویر این موقعیت هنوز ساخته نشده است</T></View>}
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
      {law ? <T style={{ fontSize: 12, color: c.muted }}>منبع: {law}</T> : null}
    </View>
  );
}

// «حواستان باشد»: how the exam's statements try to catch you on this rule.
function TrapBox({ text }: { text: string }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start', padding: 14, borderRadius: 14, backgroundColor: c.warnSoft }}>
      <Icon name="warning" size={19} color={c.warn} />
      <View style={{ flex: 1, gap: 2 }}>
        <T style={{ fontWeight: '700', fontSize: 13.5, color: c.warn }}>حواستان باشد</T>
        <T style={{ fontSize: 14, lineHeight: 24 }}>{text}</T>
      </View>
    </View>
  );
}

// One question of the lesson's test, as in the exam: the picture, the question in Danish (and Persian), and its
// statements as boxes to tick (ticked «Ja», unticked «Nej»); «بررسی پاسخ» checks it, and each statement then shows
// whether it was right and why.
function ExamQuestion({ step, n, of, ticks, checked, onToggle, onCheck }: { step: Extract<CourseStep, { kind: 'exam' }>; n: number; of: number; ticks: boolean[]; checked: boolean;
  onToggle: (i: number) => void; onCheck: () => void }) {
  const c = useColors();
  const mistakes = step.statements.filter((s, i) => ticks[i] !== s.ok).length;
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: c.strong, borderRadius: 99, paddingVertical: 4, paddingHorizontal: 10 }}>
          <Icon name="exam" size={14} color={c.strongFg} />
          <T style={{ fontSize: 12.5, fontWeight: '700', color: c.strongFg }}>سؤال آزمون {faNum(n)} از {faNum(of)}</T>
        </View>
        <T style={{ flex: 1, color: c.faint, fontSize: 12 }}>مثل آزمون واقعی</T>
      </View>
      {step.art ? <Art k={step.art} /> : null}
      <View style={{ gap: 4 }}>
        <T style={{ fontFamily: DA_FONT, fontSize: 17, fontWeight: '700', lineHeight: 26, writingDirection: 'ltr', textAlign: 'left' }}>{step.da}</T>
        <T style={{ fontSize: 14, lineHeight: 23, color: c.muted }}>{step.fa}</T>
      </View>
      {checked ? null : <T style={{ color: c.faint, fontSize: 12.5, lineHeight: 20 }}>گزینه‌های درست را تیک بزنید؛ گزینه‌ی بدون تیک یعنی «نه».</T>}
      {step.statements.map((s, i) => {
        const on = !!ticks[i], wrong = checked && on !== s.ok;
        return (
          <View key={i} style={{ gap: 6 }}>
            <Pressable disabled={checked} onPress={() => { tap(); onToggle(i); }} accessibilityRole="checkbox" accessibilityState={{ checked: on }}
              style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.985 : 1 }] })}>
              <OptionBox on={on} mark={wrong} review={checked}>
                <T style={{ fontFamily: DA_FONT, fontSize: 15.5, lineHeight: 22, writingDirection: 'ltr', textAlign: 'left' }}>{s.da}</T>
                <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 21 }}>{s.fa}</T>
              </OptionBox>
            </Pressable>
            {checked ? (
              <T style={{ fontSize: 13, lineHeight: 21, color: wrong ? c.bad : c.ok, fontWeight: '600', paddingHorizontal: 4 }}>
                {wrong ? (s.ok ? 'اشتباه؛ این گزینه درست است و باید تیک می‌خورد. ' : 'اشتباه؛ این گزینه نادرست است و نباید تیک می‌خورد. ') : 'درست. '}{s.why}
              </T>
            ) : null}
          </View>
        );
      })}
      {checked ? (
        <Enter>
          <T style={{ fontWeight: '700', fontSize: 14, color: mistakes ? c.warn : c.ok, textAlign: 'center' }}>{mistakes ? `${faNum(mistakes)} اشتباه در این سؤال` : 'بدون اشتباه!'}</T>
        </Enter>
      ) : <Button label="بررسی پاسخ" icon="check" onPress={onCheck} />}
    </View>
  );
}

function Step({ step, n, of, ticks, checked, onToggle, onCheck, result, onRetry }: { step: CourseStep; n: number; of: number; ticks: boolean[]; checked: boolean;
  onToggle: (i: number) => void; onCheck: () => void; result: { mistakes: number; statements: number }; onRetry: () => void }) {
  const c = useColors();
  if (step.kind === 'intro') {
    return (
      <View style={{ gap: 12 }}>
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
        <Card style={{ gap: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Icon name="exam" size={18} color={c.link} />
            <T style={{ fontWeight: '700', fontSize: 15 }}>در آزمون از این مبحث چه می‌پرسند؟</T>
          </View>
          {step.exam.map(e => (
            <View key={e} style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: c.link, marginTop: 10 }} />
              <T style={{ flex: 1, fontSize: 14, lineHeight: 24 }}>{e}</T>
            </View>
          ))}
          <T style={{ color: c.faint, fontSize: 12.5, lineHeight: 20 }}>در پایان درس، چند سؤال دقیقاً به شکل آزمون واقعی جواب می‌دهید.</T>
        </Card>
      </View>
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
        {step.trap ? <TrapBox text={step.trap} /> : null}
      </View>
    );
  }
  if (step.kind === 'exam') return <ExamQuestion step={step} n={n} of={of} ticks={ticks} checked={checked} onToggle={onToggle} onCheck={onCheck} />;
  if (step.kind === 'result') {
    const pass = result.mistakes <= step.max;
    return (
      <View style={{ gap: 12 }}>
        <Card style={{ gap: 12, alignItems: 'center', paddingVertical: 22 }}>
          <Icon name={pass ? 'checkCircle' : 'xCircle'} size={44} color={pass ? c.ok : c.bad} />
          <T style={{ fontSize: 21, fontWeight: '800', color: pass ? c.ok : c.bad }}>{pass ? 'قبول' : 'هنوز نه'}</T>
          <T style={{ fontSize: 15, textAlign: 'center' }}>{faNum(result.mistakes)} اشتباه از {faNum(result.statements)} گزینه · حد قبولی: حداکثر {faNum(step.max)} اشتباه</T>
          <T style={{ fontSize: 13, lineHeight: 22, color: c.muted, textAlign: 'center' }}>
            در آزمون واقعی {faNum(EXAM.questions)} سؤال تصویری جواب می‌دهید و با حداکثر {faNum(EXAM.maxMistakes)} اشتباه قبول می‌شوید؛ این آزمون کوچک هم مثل آزمون واقعی، هر پاسخ غلط را یک اشتباه حساب می‌کند.
          </T>
        </Card>
        {!pass ? <Button kind="grey" icon="refresh" label="تکرار آزمون این درس" onPress={onRetry} /> : null}
      </View>
    );
  }
  return (
    <View style={{ gap: 12 }}>
      <Card style={{ gap: 10 }}>
        <T style={{ fontSize: 19, fontWeight: '800' }}>جمع‌بندی برای آزمون</T>
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
  const [answers, setAnswers] = useState<Answers>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  useEffect(() => { if (!found) router.back(); }, [found]);
  if (!found) return null;
  const { lesson, chapter } = found, steps = lesson.steps, step = steps[i], last = i === steps.length - 1;
  const examSteps = steps.map((s, k) => ({ s, k })).filter((x): x is { s: Extract<CourseStep, { kind: 'exam' }>; k: number } => x.s.kind === 'exam');
  const ansOf = (k: number, s: Extract<CourseStep, { kind: 'exam' }>) => answers[k] ?? s.statements.map(() => false);
  const ans = step.kind === 'exam' ? ansOf(i, step) : [];
  const blocked = step.kind === 'exam' && !checked[i];
  const toggle = (k: number) => setAnswers({ ...answers, [i]: ans.map((a, j) => (j === k ? !a : a)) });
  const check = () => setChecked({ ...checked, [i]: true });
  // The test's result: every statement answered wrongly is one mistake, as in the real test.
  const result = examSteps.reduce((r, { s, k }) => {
    const a = ansOf(k, s);
    return { mistakes: r.mistakes + s.statements.filter((st, j) => a[j] !== st.ok).length, statements: r.statements + s.statements.length };
  }, { mistakes: 0, statements: 0 });
  const retry = () => { setAnswers({}); setChecked({}); setI(examSteps[0]?.k ?? 0); };
  const n = examSteps.findIndex(x => x.k === i) + 1;
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
            {steps.map((s, k) => <View key={k} style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: k <= i ? (s.kind === 'exam' || s.kind === 'result' ? c.strong : c.link) : c.surface2 }} />)}
          </View>
        </View>
        <Enter key={i}><Step step={step} n={n} of={examSteps.length} ticks={ans} checked={!!checked[i]} onToggle={toggle} onCheck={check} result={result} onRetry={retry} /></Enter>
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
