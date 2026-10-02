// Exams: a random exam like the real one, or practice with your mistakes.
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { FULL, SIZES, faNum, fmtDate, isFull, isPass, mistakeIds, randomIds, scoreOf, shuffle } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Glass } from '@/ui/glass';
import { Icon } from '@/ui/icon';
import { Button, Card, Screen, T, tap } from '@/ui/kit';
import { radius, useColors } from '@/ui/theme';

export default function Exam() {
  const c = useColors();
  const { bank, attempts, settings } = useApp();
  const [size, setSize] = useState(FULL);
  const mistakes = mistakeIds(attempts);
  const exams = attempts.filter(a => a.mode !== 'lesson').slice().reverse();
  const start = (mode: 'random' | 'mistakes') => {
    if (!bank) return;
    const ids = mode === 'random' ? randomIds(bank, size) : shuffle(mistakes).slice(0, size);
    session.plan = { mode, ids, title: mode === 'random' ? 'آزمون تصادفی' : 'تمرین اشتباهات' };
    router.push('/run');
  };
  return (
    <Screen title="آزمون" subtitle="مثل آزمون واقعی: ۲۵ تصویر، حداقل ۲۰ درست برای قبولی">
      <Card style={{ gap: 14 }}>
        <T style={{ fontWeight: '700', fontSize: 18 }}>آزمون تصادفی</T>
        <T style={{ color: c.muted, fontSize: 13.5 }}>{settings.timer ? `برای هر سؤال ${faNum(1)} دقیقه زمان دارید.` : 'بدون زمان‌سنج.'}</T>
        <View style={{ flexDirection: 'row', gap: 3, padding: 3, borderRadius: radius.sm, backgroundColor: c.bg }}>
          {SIZES.map(n => (
            <Pressable key={n} style={{ flex: 1 }} onPress={() => { tap(); setSize(n); }}>
              <View style={{ paddingVertical: 6, borderRadius: 6, backgroundColor: n === size ? c.accent : 'transparent' }}>
                <T style={{ textAlign: 'center', fontSize: 14, fontWeight: '600', color: n === size ? c.accentText : c.muted }}>{faNum(n)}</T>
              </View>
            </Pressable>
          ))}
        </View>
        <Button label={`شروع آزمون ${faNum(size)} سؤالی`} onPress={() => start('random')} />
      </Card>
      {mistakes.length ? (
        <Card style={{ gap: 10 }}>
          <T style={{ fontWeight: '700', fontSize: 18 }}>تمرین اشتباهات</T>
          <T style={{ color: c.muted, fontSize: 13.5 }}>{faNum(mistakes.length)} سؤال که آخرین بار اشتباه جواب داده‌اید.</T>
          <Button kind="glass" label="شروع تمرین" onPress={() => start('mistakes')} />
        </Card>
      ) : null}
      {exams.length ? <T style={{ fontWeight: '700', fontSize: 18, marginTop: 6 }}>آزمون‌های قبلی</T> : null}
      {exams.slice(0, 10).map(a => (
        <Card key={a.at} onPress={() => { session.result = a; session.fresh = false; router.push('/result'); }} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Glass r={radius.pill} tint={isFull(a) ? (isPass(a) ? c.okSoft : c.badSoft) : c.accentSoft} style={{ paddingHorizontal: 10, paddingVertical: 6 }}>
            <T style={{ fontWeight: '700', color: isFull(a) ? (isPass(a) ? c.ok : c.bad) : c.accent }}>{faNum(scoreOf(a))}/{faNum(a.items.length)}</T>
          </Glass>
          <View style={{ flex: 1 }}>
            <T style={{ fontWeight: '700' }}>{a.mode === 'mistakes' ? 'تمرین اشتباهات' : a.mode === 'sections' ? 'آموزش بر اساس دسته‌بندی' : 'آزمون تصادفی'}{isFull(a) ? (isPass(a) ? ' · قبول' : ' · مردود') : ''}</T>
            <T style={{ color: c.muted, fontSize: 13 }}>{fmtDate(a.at)}</T>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}><T style={{ color: c.link, fontWeight: '700' }}>مرور</T><Icon name="chevronLeft" size={15} color={c.link} weight="semibold" /></View>
        </Card>
      ))}
    </Screen>
  );
}
