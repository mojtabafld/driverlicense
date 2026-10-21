// «آزمون تصادفی» on the exam tab (main site): random questions from the app's own bank (site/newq.js, written from the
// Danish rules, not taken from any other site), 5 to 25 like the real test, optionally only questions not answered
// before («بدون سؤال تکراری»), and how far the user has come through the bank: how many questions answered at least
// once, and of those how many were right the last time. Called «آزمون جدید» until 2026-10-19, beside the random exam of
// the old bank; then it took that card's place and name (Mojtaba). Its exams keep their own mode, 'new'.
// useNewTest holds the card's choices and its start, so the exam tab's header button starts the same test.
// At /app (PROVE_BANK) the same card with prove.dk's bank: its questions, its random exams (mode 'random'), the progress
// through it and its mistakes (Mojtaba 2026-10-20).
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Easing, Platform, Pressable, View } from 'react-native';

import { PROVE_BANK } from '@/lib/config';
import { FREE_RANDOM, toPremium, useFree } from '@/lib/free';
import { t } from '@/lib/i18n';
import { FULL, SIZES, faNum, shuffle } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { pctText } from './activity';
import { Icon } from './icon';
import { ArcButton, Button, Card, T, tap, useCountUp } from './kit';
import { SizeSegment } from './size-segment';
import { SizeSlider } from './size-slider';
import { Toggle } from './toggle';
import { ARC, radius, useColors } from './theme';

export type NewTest = ReturnType<typeof useNewTest>;
export function useNewTest() {
  const { newBank, bank, attempts } = useApp();
  const src = PROVE_BANK ? bank : newBank;
  const { randomLeft } = useFree();
  const [size, setSize] = useState(FULL);
  const [fresh, setFresh] = useState(true);
  const ids = src ? src.questions.map(q => q.id) : [], mine = new Set(ids);
  // Each question's latest answer, and those answered wrong at least once.
  const last = new Map<number, boolean>(), missed = new Set<number>();
  attempts.forEach(a => a.items.forEach(it => { if (mine.has(it.id)) { last.set(it.id, it.ok); if (!it.ok) missed.add(it.id); } }));
  const unseen = ids.filter(id => !last.has(id));
  const pool = fresh ? unseen : ids, count = Math.min(size, pool.length);
  const start = () => {
    if (!randomLeft) { tap(); toPremium(); return; }
    if (!count) return;
    session.plan = { mode: PROVE_BANK ? 'random' : 'new', ids: shuffle(pool).slice(0, count), title: 'آزمون تصادفی' };
    router.push('/run');
  };
  return { ready: ids.length > 0, ids, last, missed, unseen, size, setSize, fresh, setFresh, count, start, randomLeft };
}

export function NewTestCard({ test }: { test: NewTest }) {
  const c = useColors();
  const { newqArt } = useApp();
  const { limited } = useFree();
  const { ready, ids, last, missed, unseen, size, setSize, fresh, setFresh, count, start, randomLeft } = test;
  if (!ready) return null;
  const total = ids.length, answered = last.size, right = [...last.values()].filter(Boolean).length, wrong = answered - right;
  // Before any question is answered (Mojtaba 2026-10-21): the card without its empty progress, the line over the
  // numbers and the pictures' line, so on every screen the history card under it shows above the tab bar too.
  const tight = !answered;
  const pics = ids.filter(id => newqArt[id]).length;
  return (
    <Card style={{ gap: tight ? 11 : 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
          <Icon name="shuffle" size={19} color={c.text} weight="semibold" />
        </View>
        <View style={{ flex: 1 }}>
          <T style={{ fontWeight: '700', fontSize: 18 }}>آزمون تصادفی</T>
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{PROVE_BANK ? `${faNum(total)} سؤال از بانک سؤالات prove.dk` : `${faNum(total)} سؤال تازه`}</T>
        </View>
      </View>
      {tight ? null : <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 22 }}>تعداد سؤال‌ها را انتخاب کنید.</T>}
      {ARC ? <SizeSegment value={size} values={SIZES} onChange={setSize} /> : <SizeSlider value={size} values={SIZES} onChange={setSize} grey />}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <T style={{ fontWeight: '700' }}>بدون سؤال تکراری</T>
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>{`${faNum(unseen.length)} سؤال هنوز جواب داده نشده`}</T>
        </View>
        <Toggle label="بدون سؤال تکراری" value={fresh} onChange={setFresh} />
      </View>
      {fresh && unseen.length < size ? (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 12, borderRadius: 12, backgroundColor: c.surface2 }}>
          <Icon name="info" size={17} color={c.muted} />
          <T style={{ flex: 1, fontSize: 13, lineHeight: 21, color: c.muted }}>{unseen.length
            ? `فقط ${faNum(unseen.length)} سؤال تازه مانده؛ آزمون با همه‌ی آن‌ها انجام می‌شود.`
            : 'همه‌ی سؤال‌ها را دست‌کم یک بار جواب داده‌اید.'}</T>
        </View>
      ) : null}
      {!PROVE_BANK && pics < total && !tight ? <T style={{ color: c.faint, fontSize: 12, lineHeight: 19 }}>تصویرهای این آزمون به‌تدریج اضافه می‌شوند.</T> : null}
      {limited ? (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: tight ? 10 : 12, borderRadius: 12, backgroundColor: randomLeft ? c.surface2 : c.warnSoft }}>
          <Icon name={randomLeft ? 'info' : 'lock'} size={17} color={randomLeft ? c.muted : c.warn} />
          <T style={{ flex: 1, fontSize: 13, lineHeight: 21, color: randomLeft ? c.muted : c.text }}>{randomLeft
            ? t('در نسخه‌ی رایگان {0} آزمون تصادفی دارید؛ {1} آزمون مانده است.', faNum(FREE_RANDOM), faNum(randomLeft))
            : t('{0} آزمون رایگان شما تمام شد. برای آزمون‌های بیشتر، نسخه‌ی ویژه را فعال کنید.', faNum(FREE_RANDOM))}</T>
        </View>
      ) : null}
      {!randomLeft ? (ARC ? <ArcButton label="فعال کردن نسخه‌ی ویژه" onPress={start} icon="lock" /> : <Button label="فعال کردن نسخه‌ی ویژه" onPress={start} icon="lock" kind="grey" />)
        : count ? (ARC ? <ArcButton label={`شروع آزمون ${faNum(count)} سؤالی`} onPress={start} icon="play" variant="accent" /> : <Button label={`شروع آزمون ${faNum(count)} سؤالی`} onPress={start} icon="play" kind="grey" />)
          : null}
      {/* The progress and the mistakes at the card's foot, under the start button (Mojtaba 2026-10-21). */}
      {tight && !missed.size ? null : <View style={{ height: 1, backgroundColor: c.line, marginVertical: 2 }} />}
      {tight ? null : <Progress answered={answered} total={total} right={right} wrong={wrong} />}
      {missed.size ? <MistakesBar open={[...last].filter(([, ok]) => !ok).map(([id]) => id)} missed={missed.size} /> : null}
    </Card>
  );
}

// How far through the bank, as one bar in the theme's colour (Mojtaba 2026-10-19: a minimal, modern progress bar, not a
// line of text): the share of the questions answered at least once, filling in when the card shows, its percent beside
// the title; under it how many of how many, and of those how many were right / wrong the last time, each with a dot in
// its colour. The mistakes open the mistakes page (Mojtaba 2026-10-19), where this test's questions are among them.
// A tall bar with its number in it (Mojtaba 2026-10-21): at the end of the filled part, in white, once that part is
// wide enough; before that just after it, in the bar's colour. `atEnd`: the number is of what is left (the mistakes
// still open), so it sits at the bar's far end, on the part not filled (in white once the fill reaches it).
function LabelBar({ share, shown, tone, soft, label, fill = 1, a11y, atEnd }: { share: number; shown: number; tone: string; soft: string; label: string; fill?: number;
  a11y: { min: number; max: number; now: number }; atEnd?: boolean }) {
  const inside = !atEnd && share >= 0.22;
  return (
    <View accessibilityRole="progressbar" accessibilityValue={a11y}
      style={{ height: 24, borderRadius: radius.pill, overflow: 'hidden', flexDirection: 'row', alignItems: 'stretch', backgroundColor: soft }}>
      <View style={{ width: `${shown * 100}%`, minWidth: share ? 24 : 0, borderRadius: radius.pill, justifyContent: 'center', alignItems: 'flex-end', paddingHorizontal: inside ? 10 : 0 }}>
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderRadius: radius.pill, backgroundColor: tone, opacity: fill }} />
        {inside ? <T raw style={{ color: '#fff', fontSize: 12.5, lineHeight: 16, fontWeight: '800' }}>{label}</T> : null}
      </View>
      {atEnd ? (
        <View pointerEvents="none" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'flex-end', paddingHorizontal: 10 }}>
          <T raw style={{ color: share >= 0.8 ? '#fff' : tone, fontSize: 12.5, lineHeight: 16, fontWeight: '800' }}>{label}</T>
        </View>
      ) : inside ? null : <View style={{ justifyContent: 'center', paddingHorizontal: 8 }}><T raw style={{ color: tone, fontSize: 12.5, lineHeight: 16, fontWeight: '800' }}>{label}</T></View>}
    </View>
  );
}

function Progress({ answered, total, right, wrong }: { answered: number; total: number; right: number; wrong: number }) {
  const c = useColors();
  const share = total ? answered / total : 0;
  const bar = useCountUp(share, 1100);
  // A whole percent: never 0 once a question is answered, never 100 before all of them are.
  const pct = answered >= total ? 1 : Math.min(0.99, Math.max(answered ? 0.01 : 0, share));
  const [phase, setPhase] = useState(0);
  const [swap] = useState(() => new Animated.Value(1));
  useEffect(() => {
    if (!answered) return;
    const native = Platform.OS !== 'web';
    const t = setInterval(() => {
      Animated.timing(swap, { toValue: 0, duration: 220, easing: Easing.in(Easing.quad), useNativeDriver: native }).start(({ finished }) => {
        if (!finished) return;
        setPhase(p => 1 - p);
        swap.setValue(-1);
        Animated.timing(swap, { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: native }).start();
      });
    }, 5000);
    return () => { clearInterval(t); swap.stopAnimation(); swap.setValue(1); };
  }, [answered > 0, swap]); // eslint-disable-line react-hooks/exhaustive-deps
  const dot = (color: string, text: string) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: color }} />
      <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{text}</T>
    </View>
  );
  // Every question answered: the percent and the bar in green, with a round tick before the title (Mojtaba 2026-10-20).
  const done = total > 0 && answered >= total, tone = done ? c.ok : c.accent;
  return (
    <View style={{ gap: 9 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {done ? <Icon name="checkCircle" size={17} color={c.ok} contrast={c.okSoft} weight="semibold" /> : null}
          <T style={{ fontSize: 14, fontWeight: '700' }}>پیشرفت شما</T>
        </View>
      </View>
      <LabelBar share={answered ? share : 0} shown={answered ? bar : 0} tone={tone} soft={done ? c.okSoft : c.accentSoft} label={pctText(pct)} a11y={{ min: 0, max: total, now: answered }} />
      {answered ? (
        // The questions answered, then the right and wrong ones, in turn every 5 seconds with the home header's swap
        // (the old fades and lifts away, the new comes in from just below; Mojtaba 2026-10-21); plain text, no link.
        <Animated.View style={{ minHeight: 19, flexDirection: 'row', alignItems: 'center', columnGap: 14, opacity: swap.interpolate({ inputRange: [-1, 0, 1], outputRange: [0, 0, 1] }),
          transform: [{ translateY: swap.interpolate({ inputRange: [-1, 0, 1], outputRange: [6, -6, 0] }) }] }}>
          {phase === 0 ? <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{`${faNum(answered)} از ${faNum(total)} سؤال`}</T> : <>
            {dot(c.ok, `${faNum(right)} درست`)}
            {dot(c.bad, `${faNum(wrong)} اشتباه`)}
          </>}
        </Animated.View>
      ) : <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>هنوز هیچ سؤالی از این آزمون را جواب نداده‌اید.</T>}
    </View>
  );
}

// Under the progress, once a question of this test was answered wrong (Mojtaba 2026-10-19): the mistakes put right
// (right the last time) as a share of all this test's questions ever answered wrong, so the bar fills as they are fixed
// (it emptied as they were fixed until Mojtaba asked for it the other way); its title counts those still wrong. In the
// same look as the progress bar above, in a paler shade of the theme's colour. «آزمون اشتباهات» starts a test of them
// (at most a real test's 25, in random order).
function MistakesBar({ open, missed }: { open: number[]; missed: number }) {
  const c = useColors();
  const fixed = missed - open.length, share = fixed / missed;
  // All put right: the count and the bar in green, with a round tick before the title, as the progress above; until
  // then in the theme's warning orange, mistakes still to put right (Mojtaba 2026-10-20).
  const done = !open.length, tone = done ? c.ok : c.warn;
  const bar = useCountUp(share, 1100);
  return (
    <View style={{ gap: 9 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {done ? <Icon name="checkCircle" size={17} color={c.ok} contrast={c.okSoft} weight="semibold" /> : null}
          <T style={{ fontSize: 14, fontWeight: '700' }}>اشتباهات اصلاح‌نشده</T>
        </View>
      </View>
      {/* The bar, with the mistakes still open in it, opens the mistakes page (as the count beside the title did). */}
      <Pressable onPress={() => { tap(); router.push('/mistakes'); }} accessibilityRole="button" accessibilityLabel={`${faNum(open.length)} اشتباه`}
        style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}>
        {/* (in it how many are put right, «x از y»; the line under it gone, Mojtaba 2026-10-21) */}
        <LabelBar share={fixed ? share : 0} shown={fixed ? bar : 0} tone={tone} soft={done ? c.okSoft : c.warnSoft} fill={0.85}
          label={t('{0} از {1}', faNum(fixed), faNum(missed))} a11y={{ min: 0, max: missed, now: fixed }} />
      </Pressable>
      {/* No mistakes test button here any more (Mojtaba 2026-10-21): the bar opens the mistakes page. */}
      {open.length ? null : <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>همه‌ی اشتباهات این آزمون را اصلاح کرده‌اید.</T>}
    </View>
  );
}
