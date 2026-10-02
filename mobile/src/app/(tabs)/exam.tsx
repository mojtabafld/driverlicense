// Exams: a random exam like the real one, practice with your mistakes, and the latest exams and lessons.
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { FULL, SIZES, faNum, mistakeIds, randomIds, shuffle } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { ActivityList } from '@/ui/activity';
import { Button, Card, Screen, T, tap } from '@/ui/kit';
import { radius, useColors } from '@/ui/theme';

export default function Exam() {
  const c = useColors();
  const { bank, attempts, settings } = useApp();
  const [size, setSize] = useState(FULL);
  const mistakes = mistakeIds(attempts);
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
      <ActivityList attempts={attempts} limit={3} />
    </Screen>
  );
}
