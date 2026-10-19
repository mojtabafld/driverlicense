// «آزمون جدید» on the exam tab: random questions from the app's own bank (site/newq.js, written from the Danish rules,
// not taken from any other site), 5 to 25 like the random exam, optionally only questions not answered before («بدون
// سؤال تکراری»), and how far the user has come through the bank: how many questions answered at least once, and of
// those how many were right the last time.
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { FREE_RANDOM, toPremium, useFree } from '@/lib/free';
import { t } from '@/lib/i18n';
import { FULL, SIZES, faNum, shuffle } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Icon } from './icon';
import { ArcButton, Button, Card, T, tap } from './kit';
import { SizeSegment } from './size-segment';
import { SizeSlider } from './size-slider';
import { Toggle } from './toggle';
import { ARC, useColors } from './theme';

export function NewTestCard() {
  const c = useColors();
  const { newBank, attempts, newqArt } = useApp();
  const { limited, randomLeft } = useFree();
  const [size, setSize] = useState(FULL);
  const [fresh, setFresh] = useState(true);
  if (!newBank || !newBank.questions.length) return null;
  const ids = newBank.questions.map(q => q.id), mine = new Set(ids);
  // Each question's latest answer.
  const last = new Map<number, boolean>();
  attempts.forEach(a => a.items.forEach(it => { if (mine.has(it.id)) last.set(it.id, it.ok); }));
  const total = ids.length, answered = last.size, right = [...last.values()].filter(Boolean).length, wrong = answered - right;
  const unseen = ids.filter(id => !last.has(id));
  const pool = fresh ? unseen : ids, count = Math.min(size, pool.length);
  const pics = ids.filter(id => newqArt[id]).length;
  const start = () => {
    if (!randomLeft) { tap(); toPremium(); return; }
    if (!count) return;
    session.plan = { mode: 'new', ids: shuffle(pool).slice(0, count), title: 'آزمون جدید' };
    router.push('/run');
  };
  const pct = (n: number) => `${(n / total) * 100}%` as const;
  return (
    <Card style={{ gap: 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
          <Icon name="sparkles" size={19} color={c.text} weight="semibold" />
        </View>
        <View style={{ flex: 1 }}>
          <T style={{ fontWeight: '700', fontSize: 18 }}>آزمون جدید</T>
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{`${faNum(total)} سؤال تازه، نوشته‌شده از روی قوانین رسمی دانمارک`}</T>
        </View>
      </View>
      {/* How far through the bank: answered at least once (right / wrong the last time), the rest not yet. */}
      <View style={{ gap: 8 }}>
        <T style={{ fontSize: 14, fontWeight: '600' }}>{`${faNum(answered)} از ${faNum(total)} سؤال را جواب داده‌اید`}</T>
        <View style={{ flexDirection: 'row', height: 8, borderRadius: 4, overflow: 'hidden', backgroundColor: c.surface2 }}>
          <View style={{ width: pct(right), backgroundColor: c.ok }} />
          <View style={{ width: pct(wrong), backgroundColor: c.bad }} />
        </View>
        <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>
          {answered ? `${faNum(right)} درست، ${faNum(wrong)} اشتباه (آخرین جواب هر سؤال)` : 'هنوز هیچ سؤالی از این آزمون را جواب نداده‌اید.'}
        </T>
      </View>
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
