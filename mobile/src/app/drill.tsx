// «تمرین هوشمند» (?lesson= for one lesson's questions): a short session of the course's own exam questions chosen by
// spaced repetition (lib/drill.ts), one question per page, in the real test's way: the picture, the question in Danish
// (the Persian translation behind the translate button, as in the exam), its statements to tick (ticked «Ja», unticked
// «Nej», in a new order each time), the time per question running when the user has the timer on, and no way back to
// an answered question. The answer is given as «مطمئنم» or «حدس زدم»; then each statement shows whether it was right
// and why, and a mistake shows the rule it breaks (its box, law and «حواستان باشد»); a wrong answer given as sure is
// marked as a misconception. A missed question comes back later in the same session. The end: the session's
// mistakes against the real test's limit (scaled to its 25 questions), the right guesses and misconceptions, and how
// well each lesson practised is now known.
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { transText } from '@/lib/i18n';
import { EXAM } from '@/lib/course';
import { courseText } from '@/lib/course-en';
import { useCourseProgress } from '@/lib/course-progress';
import { buildSession, lessonItems, mastery, realTestMistakes, review, statementOrder, type DrillItem } from '@/lib/drill';
import { useDrillProgress } from '@/lib/drill-progress';
import { SECONDS_PER_Q, faNum } from '@/lib/logic';
import { useApp, useExamLang } from '@/lib/store';
import { Art, RuleBox, TrapBox } from '@/ui/course-parts';
import { BarCount, FootBtn, GlassBar, navIcons } from '@/ui/glass-bar';
import { learnRtl } from '@/ui/swipe';
import { Icon } from '@/ui/icon';
import { Button, Card, Enter, T, TranslateButton, tap } from '@/ui/kit';
import { OptionBox, OptionGroup } from '@/ui/option-box';
import { SubPage } from '@/ui/sub-page';
import { DA_FONT, useColors } from '@/ui/theme';

// One question of the session: its statements' order, and whether it is the second go at a missed one.
type Turn = { item: DrillItem; order: number[]; again?: boolean };
// The answer to one turn: mistakes (wrong statements) out of its statements, and how sure the user was.
type Answer = { id: string; again: boolean; ok: boolean; sure: boolean; mistakes: number; statements: number };
// A missed question comes back after this many others (or at the end).
const AGAIN_AFTER = 3;

const turnOf = (item: DrillItem, again = false): Turn => ({ item, order: statementOrder(item.q.statements.length), again });

// The time left for the question, as a thin bar that empties (amber in the last third, red in the last 10 seconds).
function TimeBar({ left }: { left: number }) {
  const c = useColors();
  const share = left / SECONDS_PER_Q, color = left <= 10 ? c.bad : share <= 1 / 3 ? c.warn : c.link;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Icon name="clock" size={15} color={color} />
      <View style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: 'rgba(127,127,127,0.18)', overflow: 'hidden' }}>
        <View style={{ width: `${share * 100}%`, height: '100%', backgroundColor: color }} />
      </View>
      <T style={{ fontSize: 12.5, color, fontWeight: '600', minWidth: 22, textAlign: 'center' }}>{faNum(left)}</T>
    </View>
  );
}

function Question({ turn, ticks, answer, onToggle }: { turn: Turn; ticks: boolean[]; answer: Answer | null; onToggle: (i: number) => void }) {
  const c = useColors(), lang = useExamLang();
  // The translation shows once answered, until hidden; the button shows or hides it at any time.
  const [pick, setPick] = useState<boolean | null>(null);
  const { q, teach } = turn.item, shown = !!answer, fa = pick ?? shown;
  return (
    <View style={{ gap: 12 }}>
      {q.art ? <Art k={q.art} /> : null}
      <View style={{ flexDirection: 'row', direction: 'ltr', justifyContent: 'flex-start', marginBottom: -4 } as any}>
        <TranslateButton on={fa} onPress={() => setPick(!fa)} />
      </View>
      <View style={{ gap: 4 }}>
        <T style={{ fontFamily: DA_FONT, fontSize: 17, fontWeight: '700', lineHeight: 26, writingDirection: 'ltr', textAlign: 'left' }}>{courseText(q.da, lang)}</T>
        {fa && transText(lang, { fa: q.fa, en: courseText(q.da, 'en'), da: q.da }) ? <T style={{ fontSize: 14, lineHeight: 23, color: c.muted }}>{transText(lang, { fa: q.fa, en: courseText(q.da, 'en'), da: q.da })}</T> : null}
      </View>
      <OptionGroup>
      {turn.order.map((k, i) => {
        const s = q.statements[k], on = !!ticks[i], wrong = shown && on !== s.ok;
        return (
          <OptionBox key={k} on={on} mark={wrong} review={shown} n={i} disabled={shown} onPress={() => { tap(); onToggle(i); }}
              extra={shown ? (
              <T style={{ fontSize: 13, lineHeight: 21, color: wrong ? c.bad : c.ok, fontWeight: '600', paddingHorizontal: 4 }}>
                {wrong ? (s.ok ? 'اشتباه؛ این گزینه درست است و باید انتخاب می‌شد. ' : 'اشتباه؛ این گزینه نادرست است و نباید انتخاب می‌شد. ') : 'درست. '}{s.why}
              </T>
            ) : null}>
                <T style={{ fontFamily: DA_FONT, fontSize: 15.5, lineHeight: 22, writingDirection: 'ltr', textAlign: 'left' }}>{courseText(s.da, lang)}</T>
                {fa && transText(lang, { fa: s.fa, en: courseText(s.da, 'en'), da: s.da }) ? <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 21 }}>{transText(lang, { fa: s.fa, en: courseText(s.da, 'en'), da: s.da })}</T> : null}
              </OptionBox>
        );
      })}
      </OptionGroup>
      {answer ? (
        <Enter style={{ gap: 12 }}>
          <Verdict answer={answer} />
          {!answer.ok && teach ? (
            <View style={{ gap: 10 }}>
              <T style={{ fontWeight: '700', fontSize: 15 }}>قاعده‌ی این سؤال: {teach.title}</T>
              {teach.rule ? <RuleBox text={teach.rule} law={teach.law} /> : null}
              {teach.trap ? <TrapBox text={teach.trap} /> : null}
            </View>
          ) : null}
        </Enter>
      ) : null}
    </View>
  );
}

// What the answer says about what the user knows: right and sure, a right guess, a slip, or a misconception.
function Verdict({ answer }: { answer: Answer }) {
  const c = useColors();
  const [icon, color, bg, title, text] = answer.ok
    ? answer.sure ? ['checkCircle', c.ok, c.okSoft, 'درست و مطمئن', 'این سؤال دیرتر دوباره می‌آید تا در حافظه‌ی بلندمدت بماند.'] as const
      : ['help', c.warn, c.warnSoft, 'درست، ولی حدسی', 'جواب حدسی یاد گرفتن حساب نمی‌شود؛ این سؤال زود دوباره می‌آید.'] as const
    : answer.sure ? ['warning', c.bad, c.badSoft, `باور غلط، ${faNum(answer.mistakes)} اشتباه`, 'مطمئن بودید ولی جواب غلط بود؛ این خطرناک‌ترین نوع اشتباه در آزمون است. قاعده‌ی زیر را با دقت بخوانید.'] as const
      : ['xCircle', c.bad, c.badSoft, `${faNum(answer.mistakes)} اشتباه`, 'قاعده‌ی زیر را بخوانید؛ این سؤال چند سؤال بعد دوباره می‌آید.'] as const;
  return (
    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start', padding: 14, borderRadius: 14, backgroundColor: bg }}>
      <Icon name={icon} size={22} color={color} />
      <View style={{ flex: 1, gap: 2 }}>
        <T style={{ fontWeight: '800', fontSize: 15, color }}>{title}</T>
        <T style={{ fontSize: 13.5, lineHeight: 22 }}>{text}</T>
      </View>
    </View>
  );
}

function Stat({ n, label, color }: { n: number; label: string; color?: string }) {
  const c = useColors();
  return (
    <View style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 14, backgroundColor: c.surface2 }}>
      <T style={{ fontSize: 22, lineHeight: 30, fontWeight: '700', color: color ?? c.text, textAlign: 'center' }}>{faNum(n)}</T>
      <T style={{ fontSize: 12, color: c.muted, textAlign: 'center' }}>{label}</T>
    </View>
  );
}

// The end of the session: the first answers counted as in the real test, and each lesson's mastery now.
function End({ answers, turns, onMore }: { answers: Answer[]; turns: Turn[]; onMore: () => void }) {
  const c = useColors();
  const { cards } = useDrillProgress();
  const first = answers.filter(a => !a.again);
  const mistakes = first.reduce((n, a) => n + a.mistakes, 0), statements = first.reduce((n, a) => n + a.statements, 0);
  const scaled = realTestMistakes(mistakes, first.length), pass = scaled <= EXAM.maxMistakes;
  const guessed = first.filter(a => a.ok && !a.sure).length, wrongSure = first.filter(a => !a.ok && a.sure).length;
  const lessons = [...new Map(turns.map(t => [t.item.lesson.id, t.item.lesson])).values()];
  return (
    <View style={{ gap: 12 }}>
      <Card style={{ gap: 12, alignItems: 'center', paddingVertical: 22 }}>
        <Icon name={pass ? 'checkCircle' : 'xCircle'} size={44} color={pass ? c.ok : c.bad} />
        <T style={{ fontSize: 21, fontWeight: '800', color: pass ? c.ok : c.bad }}>{pass ? 'در حد قبولی' : 'هنوز زیر حد قبولی'}</T>
        <T style={{ fontSize: 15, textAlign: 'center' }}>{faNum(mistakes)} اشتباه از {faNum(statements)} گزینه در {faNum(first.length)} سؤال</T>
        <T style={{ fontSize: 13, lineHeight: 22, color: c.muted, textAlign: 'center' }}>
          با همین دقت، در آزمون واقعی {faNum(EXAM.questions)} سؤالی حدود {faNum(scaled)} اشتباه می‌کنید؛ حد قبولی حداکثر {faNum(EXAM.maxMistakes)} اشتباه است.
        </T>
      </Card>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Stat n={first.filter(a => a.ok && a.sure).length} label="درست و مطمئن" color={c.ok} />
        <Stat n={guessed} label="درستِ حدسی" color={guessed ? c.warn : undefined} />
        <Stat n={wrongSure} label="باور غلط" color={wrongSure ? c.bad : undefined} />
      </View>
      <Card style={{ gap: 10 }}>
        <T style={{ fontWeight: '700', fontSize: 15 }}>تسلط شما بر درس‌های این جلسه</T>
        {lessons.map(l => {
          const m = mastery(cards, lessonItems(l.id));
          return (
            <View key={l.id} style={{ gap: 4 }}>
              <View style={{ flexDirection: 'row' }}>
                <T style={{ flex: 1, fontSize: 13.5 }}>{l.title}</T>
                <T style={{ fontSize: 12.5, color: c.muted }}>٪{faNum(Math.round(m * 100))}</T>
              </View>
              <View style={{ height: 6, borderRadius: 3, backgroundColor: c.surface2, overflow: 'hidden' }}>
                <View style={{ width: `${m * 100}%`, height: '100%', backgroundColor: c.ok }} />
              </View>
            </View>
          );
        })}
        <T style={{ color: c.faint, fontSize: 12, lineHeight: 19 }}>هر سؤالی که مطمئن و درست جواب دهید یک پله بالا می‌رود و دیرتر برمی‌گردد (۱، ۳، ۷، ۱۶ و ۳۵ روز بعد)؛ با پنج پله، آن را بلدید.</T>
      </Card>
      <Button label="جلسه‌ی دیگر" icon="refresh" onPress={onMore} />
      <Button kind="glass" label="بازگشت" icon="arrowRight" onPress={() => router.back()} />
    </View>
  );
}

export default function Drill() {
  const c = useColors();
  const p = useLocalSearchParams<{ lesson?: string }>();
  const only = p.lesson ? String(p.lesson) : undefined;
  const { settings } = useApp();
  const { done } = useCourseProgress();
  const { cards, loaded, save } = useDrillProgress();
  const [turns, setTurns] = useState<Turn[] | null>(null);
  const [i, setI] = useState(0);
  const [ticks, setTicks] = useState<boolean[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [left, setLeft] = useState(SECONDS_PER_Q);
  const scroll = useRef<ScrollView>(null);
  // The answers follow the turns one by one, so the open turn's answer (once given) is answers[i].
  const answer = answers.length > i ? answers[i] : null;

  const start = () => {
    const t = buildSession(cards, done, { only }).map(x => turnOf(x));
    setTurns(t); setI(0); setAnswers([]); setTicks(t[0] ? t[0].order.map(() => false) : []); setLeft(SECONDS_PER_Q);
  };
  // The session is made once the cards are in (while rendering, so the first questions show at once).
  if (loaded && !turns) start();

  const turn = turns?.[i];
  const submit = (sure: boolean) => {
    if (!turns || !turn || answer) return;
    const st = turn.item.q.statements;
    const mistakes = turn.order.filter((k, j) => !!ticks[j] !== st[k].ok).length;
    const ok = mistakes === 0;
    const a: Answer = { id: turn.item.id, again: !!turn.again, ok, sure, mistakes, statements: st.length };
    save({ [turn.item.id]: review(cards[turn.item.id], ok, sure) });
    setAnswers([...answers, a]);
    // Down to the verdicts, so none stays hidden under the bar.
    setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 80);
    // A missed question comes back a few questions later (once).
    if (!ok && !turn.again) {
      const at = Math.min(turns.length, i + 1 + AGAIN_AFTER);
      setTurns([...turns.slice(0, at), turnOf(turn.item, true), ...turns.slice(at)]);
    }
  };
  // The time per question, while the timer is on: when it runs out, the ticks so far are the answer, as a guess.
  const running = !!settings.timer && !!turn && !answer;
  const submitNow = useRef(submit);
  useEffect(() => { submitNow.current = submit; });
  useEffect(() => {
    if (!running) return;
    const end = Date.now() + SECONDS_PER_Q * 1000;
    const t = setInterval(() => {
      const rest = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      setLeft(rest);
      if (!rest) { clearInterval(t); submitNow.current(false); }
    }, 250);
    return () => clearInterval(t);
  }, [running, i]);

  const next = () => {
    if (!turns) return;
    const n = i + 1;
    setI(n); setLeft(SECONDS_PER_Q); setTicks(turns[n] ? turns[n].order.map(() => false) : []);
  };
  const finished = !!turns && i >= turns.length;
  const title = only ? `تمرین: ${lessonItems(only)[0]?.lesson.title ?? ''}` : 'تمرین هوشمند';

  return (
    <View style={{ flex: 1 }}>
      <SubPage theme title={title} gap={12} scrollKey={finished ? 'end' : i} scrollRef={scroll} close={!finished}
        // Only forwards, and only once answered: the practice has no way back to a question.
        pager={finished || !turns?.length ? undefined : { i: 0, n: answer ? 2 : 1, go: k => { if (k === 1) next(); }, rtl: learnRtl }}>
        {!turns ? <T style={{ color: c.muted, textAlign: 'center', marginTop: 40 }}>در حال آماده کردن سؤال‌ها…</T>
          : !turns.length ? <T style={{ color: c.muted, textAlign: 'center', marginTop: 40 }}>هنوز سؤالی برای تمرین نیست.</T>
          : finished ? <Enter><End answers={answers} turns={turns} onMore={start} /></Enter>
          : turn ? (
            <>
              <View style={{ gap: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: c.strong, borderRadius: 99, paddingVertical: 4, paddingHorizontal: 10 }}>
                    <Icon name="exam" size={14} color={c.strongFg} />
                    <T style={{ fontSize: 12.5, lineHeight: 18, fontWeight: '700', textAlign: 'center', color: c.strongFg }}>سؤال {faNum(i + 1)} از {faNum(turns.length)}</T>
                  </View>
                  {turn.again ? <View style={{ backgroundColor: c.warnSoft, borderRadius: 99, paddingVertical: 3, paddingHorizontal: 9 }}><T style={{ fontSize: 11.5, lineHeight: 17, fontWeight: '700', textAlign: 'center', color: c.warn }}>دوباره</T></View> : null}
                  <T style={{ flex: 1, color: c.faint, fontSize: 12, textAlign: 'left' }} numberOfLines={1}>{turn.item.lesson.title}</T>
                </View>
                <View style={{ flexDirection: 'row', gap: 3 }}>
                  {turns.map((t, k) => {
                    const a = answers[k];
                    return <View key={k} style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: a ? (a.ok ? c.ok : c.bad) : k === i ? c.link : c.line }} />;
                  })}
                </View>
                {settings.timer && !answer ? <TimeBar left={left} /> : null}
              </View>
              <Enter key={i}><Question turn={turn} ticks={ticks} answer={answer} onToggle={k => setTicks(ticks.map((v, j) => (j === k ? !v : v)))} /></Enter>
              {answer ? null : <T style={{ color: c.muted, fontSize: 12.5, textAlign: 'center' }}>جواب دادید؟ پایین صفحه بگویید چقدر مطمئنید.</T>}
            </>
          ) : null}
        <View style={{ height: 90 }} />
      </SubPage>
      {turns && turns.length > 0 && !finished ? (
        <GlassBar rtl={learnRtl}
          // Until the question is answered, the two answers («حدس زدم» / «مطمئنم») sit in the bar, always in view; then the
          // position and «بعدی».
          middle={answer ? <BarCount n={i + 1} of={turns.length} label="سؤال" /> : (
            <>
              <FootBtn label="حدس زدم" icon="help" onPress={() => submit(false)} />
              <FootBtn label="مطمئنم" icon="check" submit onPress={() => submit(true)} />
            </>
          )}
          end={answer ? <FootBtn label={i === turns.length - 1 ? 'نتیجه' : 'بعدی'} icon={i === turns.length - 1 ? 'check' : navIcons(learnRtl).next} onPress={next} /> : null} />
      ) : null}
    </View>
  );
}
