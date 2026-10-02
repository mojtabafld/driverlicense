// Exams: a random exam like the real one, practice with your mistakes, and the latest exams and lessons.
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { FULL, SIZES, faNum, mistakeIds, randomIds, shuffle } from '@/lib/logic';
import { topicFa } from '@/lib/names';
import { mostMissedIds, topicPracticeIds, weakTopics } from '@/lib/practice';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { ActivityList } from '@/ui/activity';
import { Icon } from '@/ui/icon';
import { Button, Card, Screen, T, tap } from '@/ui/kit';
import { radius, useColors } from '@/ui/theme';

// Start a practice exam of these questions.
function practice(ids: number[], title: string) { session.plan = { mode: 'mistakes', ids, title }; router.push('/run'); }

// «تمرین اشتباهات», compact: how many are still wrong, the two weakest topics in one row (tap one to practise it), a quick
// practice of the 10 most-missed and one of all of them; «همه» opens the mistakes page.
function MistakesCard() {
  const c = useColors();
  const { bank, attempts, Q } = useApp();
  if (!bank) return null;
  const topics = weakTopics(attempts, Q);
  const open = topics.reduce((n, g) => n + g.open, 0), fixed = topics.reduce((n, g) => n + g.list.length - g.open, 0);
  const all = mistakeIds(attempts).filter(id => Q.has(id));
  return (
    <Card style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: open ? c.badSoft : c.okSoft }}>
          <Icon name={open ? 'warning' : 'checkCircle'} size={19} color={open ? c.bad : c.ok} contrast={c.okSoft} weight="semibold" />
        </View>
        <View style={{ flex: 1 }}>
          <T style={{ fontWeight: '700', fontSize: 17 }}>تمرین اشتباهات</T>
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>
            {open ? <T style={{ fontSize: 12.5, color: c.bad, fontWeight: '700' }}>{faNum(open)} سؤال هنوز اشتباه</T> : 'اشتباهی برای تمرین نمانده'}
            {fixed ? `، ${faNum(fixed)} اصلاح‌شده` : ''}
          </T>
        </View>
        {topics.length ? (
          <Pressable onPress={() => { tap(); router.push('/mistakes'); }} hitSlop={8} style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <T style={{ color: c.link, fontWeight: '700', fontSize: 13 }}>همه</T><Icon name="chevronLeft" size={14} color={c.link} weight="semibold" />
          </Pressable>
        ) : null}
      </View>
      {open ? (
        <>
          <View style={{ gap: 6 }}>
            <T style={{ color: c.muted, fontSize: 12 }}>ضعیف‌ترین مباحث — برای تمرین همان مبحث بزنید</T>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {topics.filter(g => g.open).slice(0, 2).map(g => (
                <Pressable key={g.c} onPress={() => { tap(); practice(topicPracticeIds(bank, g.list, g.c), topicFa(bank, g.c)); }}
                  style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1, flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 6, paddingHorizontal: 8, borderRadius: 99, borderWidth: 1, borderColor: c.line, backgroundColor: c.surface2 })}>
                  <T style={{ flexShrink: 1, fontSize: 12.5, fontWeight: '600' }} numberOfLines={1}>{bank.topics[g.c]?.fa ?? topicFa(bank, g.c)}</T>
                  <View style={{ minWidth: 20, paddingHorizontal: 6, borderRadius: 99, backgroundColor: c.badSoft }}>
                    <T style={{ fontSize: 11.5, lineHeight: 18, fontWeight: '700', color: c.bad, textAlign: 'center' }}>{faNum(g.open)}</T>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button style={{ flex: 1 }} label={`تمرین ${faNum(Math.min(10, open))} سؤال`} onPress={() => practice(mostMissedIds(attempts, Q, 10), 'تمرین اشتباهات')} />
            {all.length > 10 ? <Button style={{ flex: 1 }} kind="glass" label={`همه (${faNum(Math.min(25, all.length))})`} onPress={() => practice(shuffle(all).slice(0, 25), 'تمرین اشتباهات')} /> : null}
          </View>
        </>
      ) : null}
    </Card>
  );
}

export default function Exam() {
  const c = useColors();
  const { bank, attempts, settings } = useApp();
  const [size, setSize] = useState(FULL);
  const start = () => {
    if (!bank) return;
    session.plan = { mode: 'random', ids: randomIds(bank, size), title: 'آزمون تصادفی' };
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
        <Button label={`شروع آزمون ${faNum(size)} سؤالی`} onPress={start} />
      </Card>
      <MistakesCard />
      <ActivityList attempts={attempts} limit={3} />
    </Screen>
  );
}
