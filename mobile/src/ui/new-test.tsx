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
  const { ready, ids, last, unseen, size, setSize, fresh, setFresh, count, start, randomLeft } = test;
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
      {tight ? null : <View style={{ height: 1, backgroundColor: c.line, marginVertical: 2 }} />}
      {tight ? null : <Progress answered={answered} total={total} right={right} wrong={wrong} />}
    </Card>
  );
}

// How far through the bank, as one bar in the theme's colour (Mojtaba 2026-10-19: a minimal, modern progress bar, not a
// line of text): the share of the questions answered at least once, filling in when the card shows, its percent beside
// the title; under it how many of how many, and of those how many were right / wrong the last time, each with a dot in
// its colour. The mistakes open the mistakes page (Mojtaba 2026-10-19), where this test's questions are among them.
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
  // (`ring`: a thin edge, for the soft colour of what is not answered yet)
  const dot = (color: string, text: string, ring?: boolean) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color, borderWidth: ring ? 1 : 0, borderColor: c.link }} />
      <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{text}</T>
    </View>
  );
  // Every question answered: the percent and the bar in green, with a round tick before the title (Mojtaba 2026-10-20).
  const done = total > 0 && answered >= total;
  // The right ones in green in every theme and colour (Mojtaba 2026-10-21), the wrong ones in red, on a neutral track.
  // Not answered yet: the bar's empty part and its dot, in a soft tint of the theme (Mojtaba 2026-10-21).
  const rest = c.accentSoft;
  const rightTone = c.ok, inside = share >= 0.22 && right / Math.max(answered, 1) >= 0.5;
  return (
    <View style={{ gap: 9 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {done ? <Icon name="checkCircle" size={17} color={c.ok} contrast={c.okSoft} weight="semibold" /> : null}
          <T style={{ fontSize: 14, fontWeight: '700' }}>پیشرفت شما</T>
        </View>
      </View>
      {/* One bar for both (Mojtaba 2026-10-21): the questions answered, the right ones in the theme's colour and the wrong
          ones (the mistakes not put right yet) in red at the fill's end, the percent in it as before; it opens the mistakes
          page while there are some. */}
      <Pressable disabled={!wrong} onPress={() => { tap(); router.push('/mistakes'); }} accessibilityRole={wrong ? 'button' : undefined}
        accessibilityLabel={wrong ? `${faNum(wrong)} اشتباه` : undefined} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
        <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: total, now: answered }}
          style={{ height: 24, borderRadius: radius.pill, overflow: 'hidden', flexDirection: 'row', backgroundColor: done ? c.okSoft : rest }}>
          <View style={{ width: `${answered ? bar * 100 : 0}%`, minWidth: answered ? 24 : 0, borderRadius: radius.pill, overflow: 'hidden', flexDirection: 'row' }}>
            <View style={{ flex: right, backgroundColor: rightTone }} />
            <View style={{ flex: wrong, backgroundColor: c.bad }} />
            {inside ? (
              // (at the fill's start, on the right ones' colour, so never on the small red part)
              <View pointerEvents="none" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 4 }}>
                <View style={{ paddingHorizontal: 7, paddingVertical: 1, borderRadius: radius.pill, backgroundColor: c.surface }}>
                  {/* In the theme's colour (Mojtaba 2026-10-21), on a small chip so it reads on the green. */}
                  <T raw style={{ color: c.link, fontSize: 12, lineHeight: 16, fontWeight: '800' }}>{pctText(pct)}</T>
                </View>
              </View>
            ) : null}
          </View>
          {inside ? null : <View style={{ justifyContent: 'center', paddingHorizontal: 8 }}><T raw style={{ color: answered ? c.link : c.muted, fontSize: 12.5, lineHeight: 16, fontWeight: '800' }}>{pctText(pct)}</T></View>}
        </View>
      </Pressable>
      {answered ? (
        // The questions answered, then the right and wrong ones, in turn every 5 seconds with the home header's swap
        // (the old fades and lifts away, the new comes in from just below; Mojtaba 2026-10-21); plain text, no link.
        <Animated.View style={{ minHeight: 19, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 14, rowGap: 2, opacity: swap.interpolate({ inputRange: [-1, 0, 1], outputRange: [0, 0, 1] }),
          transform: [{ translateY: swap.interpolate({ inputRange: [-1, 0, 1], outputRange: [6, -6, 0] }) }] }}>
          {phase === 0 ? <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{`${faNum(answered)} از ${faNum(total)} سؤال`}</T> : <>
            {dot(rightTone, `${faNum(right)} درست`)}
            {dot(c.bad, `${faNum(wrong)} اشتباه`)}
            {total > answered ? dot(rest, `${faNum(total - answered)} جواب‌نداده`, true) : null}
          </>}
        </Animated.View>
      ) : <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>هنوز هیچ سؤالی از این آزمون را جواب نداده‌اید.</T>}
    </View>
  );
}

