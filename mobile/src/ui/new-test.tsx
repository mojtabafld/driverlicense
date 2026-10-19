// «آزمون تصادفی» on the exam tab (main site): random questions from the app's own bank (site/newq.js, written from the
// Danish rules, not taken from any other site), 5 to 25 like the real test, optionally only questions not answered
// before («بدون سؤال تکراری»), and how far the user has come through the bank: how many questions answered at least
// once, and of those how many were right the last time. Called «آزمون جدید» until 2026-10-19, beside the random exam of
// the old bank; then it took that card's place and name (Mojtaba). Its exams keep their own mode, 'new'.
// useNewTest holds the card's choices and its start, so the exam tab's header button starts the same test.
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

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
  const { newBank, attempts } = useApp();
  const { randomLeft } = useFree();
  const [size, setSize] = useState(FULL);
  const [fresh, setFresh] = useState(true);
  const ids = newBank ? newBank.questions.map(q => q.id) : [], mine = new Set(ids);
  // Each question's latest answer.
  const last = new Map<number, boolean>();
  attempts.forEach(a => a.items.forEach(it => { if (mine.has(it.id)) last.set(it.id, it.ok); }));
  const unseen = ids.filter(id => !last.has(id));
  const pool = fresh ? unseen : ids, count = Math.min(size, pool.length);
  const start = () => {
    if (!randomLeft) { tap(); toPremium(); return; }
    if (!count) return;
    session.plan = { mode: 'new', ids: shuffle(pool).slice(0, count), title: 'آزمون تصادفی' };
    router.push('/run');
  };
  return { ready: ids.length > 0, ids, last, unseen, size, setSize, fresh, setFresh, count, start, randomLeft };
}

export function NewTestCard({ test }: { test: NewTest }) {
  const c = useColors();
  const { newqArt } = useApp();
  const { limited } = useFree();
  const { ready, ids, last, unseen, size, setSize, fresh, setFresh, count, start, randomLeft } = test;
  if (!ready) return null;
  const total = ids.length, answered = last.size, right = [...last.values()].filter(Boolean).length, wrong = answered - right;
  const pics = ids.filter(id => newqArt[id]).length;
  return (
    <Card style={{ gap: 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
          <Icon name="shuffle" size={19} color={c.text} weight="semibold" />
        </View>
        <View style={{ flex: 1 }}>
          <T style={{ fontWeight: '700', fontSize: 18 }}>آزمون تصادفی</T>
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{`${faNum(total)} سؤال تازه، نوشته‌شده از روی قوانین رسمی دانمارک`}</T>
        </View>
      </View>
      <Progress answered={answered} total={total} right={right} wrong={wrong} />
      <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 22 }}>تعداد سؤال‌ها را انتخاب کنید.</T>
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
      {pics < total ? <T style={{ color: c.faint, fontSize: 12, lineHeight: 19 }}>تصویرهای این آزمون به‌تدریج اضافه می‌شوند.</T> : null}
      {limited ? (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 12, borderRadius: 12, backgroundColor: randomLeft ? c.surface2 : c.warnSoft }}>
          <Icon name={randomLeft ? 'info' : 'lock'} size={17} color={randomLeft ? c.muted : c.warn} />
          <T style={{ flex: 1, fontSize: 13, lineHeight: 21, color: randomLeft ? c.muted : c.text }}>{randomLeft
            ? t('در نسخه‌ی رایگان {0} آزمون تصادفی دارید؛ {1} آزمون مانده است.', faNum(FREE_RANDOM), faNum(randomLeft))
            : t('{0} آزمون رایگان شما تمام شد. برای آزمون‌های بیشتر، نسخه‌ی ویژه را فعال کنید.', faNum(FREE_RANDOM))}</T>
        </View>
      ) : null}
      {!randomLeft ? (ARC ? <ArcButton label="فعال کردن نسخه‌ی ویژه" onPress={start} icon="lock" /> : <Button label="فعال کردن نسخه‌ی ویژه" onPress={start} icon="lock" kind="grey" />)
        : count ? (ARC ? <ArcButton label={`شروع آزمون ${faNum(count)} سؤالی`} onPress={start} icon="play" /> : <Button label={`شروع آزمون ${faNum(count)} سؤالی`} onPress={start} icon="play" kind="grey" />)
          : null}
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
  const dot = (color: string, text: string, onPress?: () => void) => {
    const body = (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: color }} />
        <T style={{ color: onPress ? c.text : c.muted, fontSize: 12.5, lineHeight: 19, fontWeight: onPress ? '600' : undefined }}>{text}</T>
        {onPress ? <Icon name="chevronLeft" size={12} color={c.muted} weight="semibold" /> : null}
      </View>
    );
    return onPress ? (
      <Pressable onPress={() => { tap(); onPress(); }} hitSlop={8} accessibilityRole="button" style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>{body}</Pressable>
    ) : body;
  };
  return (
    <View style={{ gap: 9 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <T style={{ flex: 1, fontSize: 14, fontWeight: '700' }}>پیشرفت شما</T>
        <T style={{ fontSize: 15, lineHeight: 22, fontWeight: '800', color: answered ? c.accent : c.muted }}>{pctText(pct)}</T>
      </View>
      <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: total, now: answered }}
        style={{ height: 10, borderRadius: radius.pill, overflow: 'hidden', flexDirection: 'row', backgroundColor: c.accentSoft }}>
        <View style={{ width: `${answered ? bar * 100 : 0}%`, minWidth: answered ? 10 : 0, borderRadius: radius.pill, backgroundColor: c.accent }} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', columnGap: 12, rowGap: 2 }}>
        <T style={{ flex: 1, color: c.muted, fontSize: 12.5, lineHeight: 19 }}>
          {answered ? `${faNum(answered)} از ${faNum(total)} سؤال` : 'هنوز هیچ سؤالی از این آزمون را جواب نداده‌اید.'}
        </T>
        {answered ? dot(c.ok, `${faNum(right)} درست`) : null}
        {answered ? dot(c.bad, `${faNum(wrong)} اشتباه`, wrong ? () => router.push('/mistakes') : undefined) : null}
      </View>
    </View>
  );
}
