// Exams: a random exam like the real one, an exam of your mistakes, and the latest exams and lessons (the card stays,
// with a note, before the first one).
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { FULL, SECONDS_PER_Q, SIZES, faNum, passMin, randomIds } from '@/lib/logic';
import { topicFa } from '@/lib/names';
import { topicPracticeIds, weakTopics } from '@/lib/practice';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { ActivityList } from '@/ui/activity';
import { SizeSlider } from '@/ui/size-slider';
import { Icon } from '@/ui/icon';
import { Button, Card, Screen, T, tap } from '@/ui/kit';
import { useColors } from '@/ui/theme';

// What the chosen number of questions means: 25 is the real exam; fewer is a shorter practice with the same rules.
function sizeHint(n: number) {
  const time = `${faNum(Math.round(n * SECONDS_PER_Q / 60))} دقیقه`, allowed = `${faNum(n - passMin(n))} اشتباه`;
  return n === FULL
    ? `مثل آزمون واقعی: ${faNum(n)} سؤال در ${time}؛ با حداکثر ${allowed} قبول می‌شوید. برای سنجیدن آمادگی، این را انتخاب کنید.`
    : `تمرین کوتاه: ${faNum(n)} سؤال در ${time}، با حداکثر ${allowed} برای قبولی. برای آمادگی کامل، آزمون ${faNum(FULL)} سؤالی را هم امتحان کنید.`;
}

// Start a practice exam of these questions.
function practice(ids: number[], title: string) { session.plan = { mode: 'mistakes', ids, title }; router.push('/run'); }

// «آزمون بر اساس اشتباهات»: an exam of one topic's mistakes, from its chip in the row that scrolls sideways (weakest
// first); «همه» opens the mistakes page. Before the first exam,
// or with no mistakes, it says what it is for and how it fills up.
function MistakesCard() {
  const c = useColors();
  const { bank, attempts, Q } = useApp();
  if (!bank) return null;
  const topics = weakTopics(attempts, Q);
  const open = topics.reduce((n, g) => n + g.open, 0), fixed = topics.reduce((n, g) => n + g.list.length - g.open, 0);
  // What it is, when there is nothing to practise yet.
  const note = !attempts.length
    ? 'هنوز آزمونی نداده‌اید. بعد از اولین آزمون، سؤال‌هایی که اشتباه جواب بدهید اینجا جمع می‌شوند تا با آن‌ها آزمون بدهید و نقطه‌ضعف‌هایتان را برطرف کنید.'
    : !topics.length
      ? 'تا اینجا هیچ اشتباهی نداشته‌اید؛ عالی! هر سؤالی که در آزمون‌ها اشتباه جواب بدهید اینجا اضافه می‌شود تا دوباره تمرینش کنید.'
      : !open ? 'همه‌ی اشتباهات را اصلاح کرده‌اید؛ یعنی آخرین بار درست جوابشان داده‌اید. برای مرور دوباره «همه» را بزنید.' : null;
  return (
    <Card style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: open ? c.badSoft : topics.length ? c.okSoft : c.accentSoft }}>
          <Icon name={open ? 'warning' : topics.length ? 'checkCircle' : 'refresh'} size={19} color={open ? c.bad : topics.length ? c.ok : c.link} contrast={c.okSoft} weight="semibold" />
        </View>
        <View style={{ flex: 1 }}>
          <T style={{ fontWeight: '700', fontSize: 17 }}>آزمون بر اساس اشتباهات</T>
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>
            {open ? <T style={{ fontSize: 12.5, color: c.bad, fontWeight: '700' }}>{faNum(open)} سؤال اصلاح‌نشده</T>
              : topics.length ? `${faNum(fixed)} سؤال اصلاح‌شده` : 'سؤال‌هایی که اشتباه جواب داده‌اید'}
            {open && fixed ? `، ${faNum(fixed)} اصلاح‌شده` : ''}
          </T>
        </View>
        {topics.length ? (
          <Pressable onPress={() => { tap(); router.push('/mistakes'); }} hitSlop={8} style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <T style={{ color: c.text, fontWeight: '700', fontSize: 13 }}>همه</T><Icon name="chevronLeft" size={14} color={c.text} weight="semibold" />
          </Pressable>
        ) : null}
      </View>
      {note ? (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 12, borderRadius: 12, backgroundColor: c.surface2 }}>
          <Icon name="info" size={17} color={c.muted} />
          <T style={{ flex: 1, fontSize: 13, lineHeight: 21, color: c.muted }}>{note}</T>
        </View>
      ) : null}
      {open ? (
        <View style={{ gap: 6 }}>
          <T style={{ color: c.muted, fontSize: 12 }}>مبحث را انتخاب کنید تا آزمونش شروع شود — ضعیف‌ترین اول</T>
          {/* All topics with mistakes, weakest first, in one row that scrolls sideways. */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingVertical: 2 }}>
            {topics.filter(g => g.open).map(g => (
              <Pressable key={g.c} onPress={() => { tap(); practice(topicPracticeIds(g.list), topicFa(bank, g.c)); }}
                accessibilityLabel={`تمرین ${topicFa(bank, g.c)}`}
                style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1, flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 99, borderWidth: 1, borderColor: c.line, backgroundColor: c.surface2 })}>
                <T style={{ fontSize: 13, fontWeight: '600' }} numberOfLines={1}>{bank.topics[g.c]?.fa ?? topicFa(bank, g.c)}</T>
                <View style={{ minWidth: 20, paddingHorizontal: 6, borderRadius: 99, backgroundColor: c.badSoft }}>
                  <T style={{ fontSize: 11.5, lineHeight: 18, fontWeight: '700', color: c.bad, textAlign: 'center' }}>{faNum(g.open)}</T>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </Card>
  );
}

export default function Exam() {
  const c = useColors();
  const { bank, attempts } = useApp();
  const [size, setSize] = useState(FULL);
  const start = () => {
    if (!bank) return;
    session.plan = { mode: 'random', ids: randomIds(bank, size), title: 'آزمون تصادفی' };
    router.push('/run');
  };
  return (
    <Screen title="آزمون">
      <Card style={{ gap: 14 }}>
        {/* The title with its icon, in a tile like the mistakes card's */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accentSoft }}>
            <Icon name="shuffle" size={19} color={c.link} weight="semibold" />
          </View>
          <T style={{ fontWeight: '700', fontSize: 18 }}>آزمون تصادفی</T>
        </View>
        {/* How to choose the number of questions, then what the chosen number means */}
        <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 22 }}>تعداد سؤال‌ها را با کشیدن نوار زیر انتخاب کنید.</T>
        <SizeSlider value={size} values={SIZES} onChange={setSize} grey />
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 12, borderRadius: 12, backgroundColor: c.surface2 }}>
          <Icon name={size === FULL ? 'checkCircle' : 'clock'} size={17} color={c.muted} />
          <T style={{ flex: 1, fontSize: 13, lineHeight: 21, color: c.muted }}>{sizeHint(size)}</T>
        </View>
        <Button label={`شروع آزمون ${faNum(size)} سؤالی`} onPress={start} icon="play" kind="grey" />
      </Card>
      <MistakesCard />
      <ActivityList attempts={attempts} limit={3} title="تاریخچه‌ی آزمون‌ها" />
    </Screen>
  );
}
