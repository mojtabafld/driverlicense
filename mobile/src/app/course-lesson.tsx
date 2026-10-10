// One lesson of «آموزش گام‌به‌گام» (?id=), one step per page, aimed at the theory test, in three parts named over the
// step bar (یادگیری / آزمون / جمع‌بندی): what the lesson teaches (what the exam asks about the topic folded away under it),
// one rule per step (its picture, the rule in a box with its law, and «تله‌ی آزمون»: how the exam tries to catch you,
// hidden until tapped so the user first thinks of it),
// then the lesson's test in the exam's own format (the situation in a picture, the question in Danish with its Persian
// translation, and its statements as boxes to tick, as in the real test and the app's exam: a ticked statement is
// «Ja», one left unticked «Nej»; «بررسی پاسخ» then shows which were right and why), its result counted in mistakes
// against the real test's limit, question by question (and «تکرار آزمون»), and the summary with the sources. The bar
// at the bottom: back / the step / next; on a question «بررسی» checks it in place of next, and «پایان درس» on the last
// step finishes the lesson (kept with the account) and shows the finish: straight on to the next lesson, the lesson's
// questions in «تمرین هوشمند», or back to the road map.
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { COURSE, EXAM, lessonById, type CourseStep } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { faNum } from '@/lib/logic';
import { BarCount, FootBtn, GlassBar } from '@/ui/glass-bar';
import { Icon } from '@/ui/icon';
import { OptionBox } from '@/ui/option-box';
import { Art, RuleBox, TrapBox } from '@/ui/course-parts';
import { Button, Card, Enter, T, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { DA_FONT, useColors } from '@/ui/theme';

// Each exam question's ticks (by step index; unticked until touched) and whether it has been checked.
type Answers = Record<number, boolean[]>;

// One question of the lesson's test, as in the exam: the picture, the question in Danish (and Persian), and its
// statements as boxes to tick (ticked «Ja», unticked «Nej»); «بررسی پاسخ» checks it, and each statement then shows
// whether it was right and why.
function ExamQuestion({ step, n, of, ticks, checked, onToggle }: { step: Extract<CourseStep, { kind: 'exam' }>; n: number; of: number; ticks: boolean[]; checked: boolean;
  onToggle: (i: number) => void }) {
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
      {checked ? null : <T style={{ color: c.faint, fontSize: 12.5, lineHeight: 20 }}>گزینه‌های درست را تیک بزنید (گزینه‌ی بدون تیک یعنی «نه») و بعد «بررسی» را بزنید.</T>}
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
      ) : null}
    </View>
  );
}

// «تله‌ی آزمون»: hidden at first behind a dashed box, so the user thinks of the catch before reading it.
function TrapReveal({ text }: { text: string }) {
  const c = useColors();
  const [open, setOpen] = useState(false);
  if (open) return <Enter><TrapBox text={text} /></Enter>;
  return (
    <Pressable onPress={() => { tap(); setOpen(true); }} accessibilityRole="button"
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 14, borderWidth: 1.5, borderStyle: 'dashed', borderColor: c.warn, opacity: pressed ? 0.8 : 1 })}>
      <Icon name="warning" size={19} color={c.warn} />
      <View style={{ flex: 1, gap: 2 }}>
        <T style={{ fontWeight: '700', fontSize: 14, color: c.warn }}>تله‌ی آزمون در این قاعده</T>
        <T style={{ fontSize: 12.5, color: c.muted }}>اول خودتان حدس بزنید آزمون چطور گولتان می‌زند، بعد بزنید تا ببینید.</T>
      </View>
      <Icon name="eye" size={18} color={c.warn} />
    </Pressable>
  );
}

// A list of short lines, each after a small mark.
function Points({ items, mark }: { items: string[]; mark: 'dot' | 'check' }) {
  const c = useColors();
  return items.map(p => (
    <View key={p} style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
      {mark === 'check' ? <Icon name="check" size={16} color={c.ok} /> : <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: c.link, marginTop: 10 }} />}
      <T style={{ flex: 1, fontSize: 14.5, lineHeight: 24 }}>{p}</T>
    </View>
  ));
}

type Result = { mistakes: number; statements: number; perQ: number[] };

function Step({ step, n, of, ticks, checked, onToggle, result, onRetry }: { step: CourseStep; n: number; of: number; ticks: boolean[]; checked: boolean;
  onToggle: (i: number) => void; result: Result; onRetry: () => void }) {
  const c = useColors();
  const [examOpen, setExamOpen] = useState(false);
  if (step.kind === 'intro') {
    return (
      <View style={{ gap: 12 }}>
        <Card style={{ gap: 12 }}>
          <T style={{ fontSize: 22, fontWeight: '800', lineHeight: 34 }}>{step.title}</T>
          <T style={{ fontSize: 15, lineHeight: 26, color: c.muted }}>{step.text}</T>
          <T style={{ fontWeight: '700', fontSize: 14.5, marginTop: 4 }}>بعد از این درس می‌توانید:</T>
          <Points items={step.goals} mark="check" />
        </Card>
        <Card style={{ gap: 10 }} onPress={() => setExamOpen(!examOpen)}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Icon name="exam" size={18} color={c.link} />
            <T style={{ flex: 1, fontWeight: '700', fontSize: 15 }}>در آزمون از این مبحث چه می‌پرسند؟</T>
            <Icon name={examOpen ? 'chevronUp' : 'chevronDown'} size={16} color={c.faint} />
          </View>
          {examOpen ? <Points items={step.exam} mark="dot" /> : null}
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
          {step.points ? <Points items={step.points} mark="dot" /> : null}
        </Card>
        {step.rule ? <RuleBox text={step.rule} law={step.law} /> : null}
        {step.trap ? <TrapReveal text={step.trap} /> : null}
      </View>
    );
  }
  if (step.kind === 'exam') return <ExamQuestion step={step} n={n} of={of} ticks={ticks} checked={checked} onToggle={onToggle} />;
  if (step.kind === 'result') {
    const pass = result.mistakes <= step.max;
    return (
      <View style={{ gap: 12 }}>
        <Card style={{ gap: 12, alignItems: 'center', paddingVertical: 22 }}>
          <Icon name={pass ? 'checkCircle' : 'xCircle'} size={44} color={pass ? c.ok : c.bad} />
          <T style={{ fontSize: 21, fontWeight: '800', color: pass ? c.ok : c.bad }}>{pass ? 'قبول' : 'هنوز نه'}</T>
          <T style={{ fontSize: 15, textAlign: 'center' }}>{faNum(result.mistakes)} اشتباه از {faNum(result.statements)} گزینه، حد قبولی: حداکثر {faNum(step.max)} اشتباه</T>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
            {result.perQ.map((m, k) => (
              <View key={k} style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 99, backgroundColor: m ? c.badSoft : c.okSoft }}>
                <Icon name={m ? 'xCircle' : 'checkCircle'} size={14} color={m ? c.bad : c.ok} />
                <T style={{ fontSize: 12.5, fontWeight: '700', color: m ? c.bad : c.ok }}>سؤال {faNum(k + 1)}{m ? `: ${faNum(m)} اشتباه` : ''}</T>
              </View>
            ))}
          </View>
          <T style={{ fontSize: 13, lineHeight: 22, color: c.muted, textAlign: 'center' }}>
            در آزمون واقعی {faNum(EXAM.questions)} سؤال تصویری جواب می‌دهید و با حداکثر {faNum(EXAM.maxMistakes)} اشتباه قبول می‌شوید؛ این‌جا هم مثل آزمون واقعی، هر گزینه‌ی غلط یک اشتباه است.
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

// The finish of a lesson: what is next, one tap away.
function Finished({ title, result, next, onDrill }: { title: string; result: Result; next: { id: string; title: string } | null; onDrill: () => void }) {
  const c = useColors();
  return (
    <View style={{ gap: 12 }}>
      <Card style={{ gap: 10, alignItems: 'center', paddingVertical: 28 }}>
        <View style={{ width: 76, height: 76, borderRadius: 38, alignItems: 'center', justifyContent: 'center', backgroundColor: c.ok }}>
          <Icon name="check" size={38} color="#fff" weight="bold" />
        </View>
        <T style={{ fontSize: 22, fontWeight: '800', marginTop: 6 }}>درس تمام شد!</T>
        <T style={{ fontSize: 14.5, color: c.muted, textAlign: 'center' }}>«{title}» در نقشه‌ی راه شما تیک خورد.</T>
        <T style={{ fontSize: 13.5, color: c.muted, textAlign: 'center' }}>آزمون درس: {faNum(result.mistakes)} اشتباه از {faNum(result.statements)} گزینه</T>
      </Card>
      {next ? <Button icon="play" label={`درس بعدی: ${next.title}`} onPress={() => router.replace({ pathname: '/course-lesson', params: { id: next.id } })} /> : null}
      <Button kind="glass" icon="refresh" label="تمرین سؤال‌های این درس در تمرین هوشمند" onPress={onDrill} />
      <Button kind="glass" icon="arrowRight" label="بازگشت به نقشه‌ی راه" onPress={() => router.back()} />
    </View>
  );
}

// The part of the lesson a step belongs to, named over the step bar.
const PHASE: Record<CourseStep['kind'], string> = { intro: 'یادگیری', teach: 'یادگیری', exam: 'آزمون درس', result: 'آزمون درس', summary: 'جمع‌بندی' };

export default function CourseLesson() {
  const p = useLocalSearchParams<{ id?: string }>();
  const id = String(p.id || '');
  return <Lesson key={id} id={id} />;
}

function Lesson({ id }: { id: string }) {
  const c = useColors();
  const found = lessonById(id);
  const { done, finish } = useCourseProgress();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [complete, setComplete] = useState(false);
  // Checking a question scrolls down to the answers' verdicts, so none stays hidden under the bar.
  const scroll = useRef<ScrollView>(null);
  useEffect(() => { if (!found) router.back(); }, [found]);
  if (!found) return null;
  const { lesson, chapter } = found, steps = lesson.steps, step = steps[i], last = i === steps.length - 1;
  const examSteps = steps.map((s, k) => ({ s, k })).filter((x): x is { s: Extract<CourseStep, { kind: 'exam' }>; k: number } => x.s.kind === 'exam');
  const ansOf = (k: number, s: Extract<CourseStep, { kind: 'exam' }>) => answers[k] ?? s.statements.map(() => false);
  const ans = step.kind === 'exam' ? ansOf(i, step) : [];
  const toCheck = step.kind === 'exam' && !checked[i];
  const toggle = (k: number) => setAnswers({ ...answers, [i]: ans.map((a, j) => (j === k ? !a : a)) });
  const check = () => { setChecked({ ...checked, [i]: true }); setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 80); };
  // The test's result: every statement answered wrongly is one mistake, as in the real test.
  const perQ = examSteps.map(({ s, k }) => { const a = ansOf(k, s); return s.statements.filter((st, j) => a[j] !== st.ok).length; });
  const result: Result = { mistakes: perQ.reduce((a, b) => a + b, 0), statements: examSteps.reduce((n, { s }) => n + s.statements.length, 0), perQ };
  const retry = () => { setAnswers({}); setChecked({}); setI(examSteps[0]?.k ?? 0); };
  const n = examSteps.findIndex(x => x.k === i) + 1;
  // The next lesson on the road not done yet, after this one.
  const ready = COURSE.flatMap(ch => ch.lessons), at = ready.findIndex(l => l.id === lesson.id);
  const next = [...ready.slice(at + 1), ...ready.slice(0, at)].find(l => !done[l.id]) ?? null;
  const end = () => { finish(lesson.id); setComplete(true); };
  const phase = PHASE[step.kind];
  return (
    <View style={{ flex: 1 }}>
      <SubPage title={lesson.title} gap={12} scrollKey={complete ? -1 : i} scrollRef={scroll} close={!complete}
        guard={!complete && Object.keys(checked).length ? { title: 'خروج از درس؟', text: 'جواب‌های آزمون این درس ذخیره نمی‌شوند.' } : null}>
        {complete ? (
          <Enter><Finished title={lesson.title} result={result} next={next} onDrill={() => router.replace({ pathname: '/drill', params: { lesson: lesson.id } })} /></Enter>
        ) : (
          <>
            <View style={{ gap: 6 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ backgroundColor: step.kind === 'exam' || step.kind === 'result' ? c.strong : c.accentSoft, borderRadius: 99, paddingHorizontal: 9, paddingVertical: 2 }}>
                  <T style={{ fontSize: 12, fontWeight: '700', color: step.kind === 'exam' || step.kind === 'result' ? c.strongFg : c.link }}>{phase}</T>
                </View>
                <T style={{ flex: 1, color: c.muted, fontSize: 12.5 }} numberOfLines={1}>فصل {faNum(chapter.n)}: {chapter.title}</T>
              </View>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                {steps.map((s, k) => <View key={k} style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: k <= i ? (s.kind === 'exam' || s.kind === 'result' ? c.strong : c.link) : c.surface2 }} />)}
              </View>
            </View>
            <Enter key={i}><Step step={step} n={n} of={examSteps.length} ticks={ans} checked={!!checked[i]} onToggle={toggle} result={result} onRetry={retry} /></Enter>
            <View style={{ height: 90 }} />
          </>
        )}
      </SubPage>
      {complete ? null : (
        <GlassBar
          start={<FootBtn label="قبلی" icon="arrowLeft" disabled={!i} onPress={() => setI(i - 1)} />}
          middle={<BarCount n={i + 1} of={steps.length} label="قدم" />}
          end={toCheck ? <FootBtn label="بررسی" icon="check" submit onPress={check} />
            : last ? <FootBtn label="پایان درس" icon="check" submit onPress={end} />
              : <FootBtn label="بعدی" icon="arrowRight" onPress={() => setI(i + 1)} />} />
      )}
    </View>
  );
}
