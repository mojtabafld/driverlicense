// Exams: a random exam like the real one, an exam of your mistakes, and the latest exams and lessons (the card stays,
// with a note, before the first one). On the main site the random exam is the app's own questions (ui/new-test.tsx,
// Mojtaba 2026-10-19: it took the old card's place and name); the /app copy keeps the old bank's random exam.
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { FULL, SECONDS_PER_Q, SIZES, faNum, passMin, randomIds } from '@/lib/logic';
import { topicFa, topicName } from '@/lib/names';
import { topicPracticeIds, weakTopics } from '@/lib/practice';
import { session } from '@/lib/session';
import { FREE_RANDOM, toPremium, useFree } from '@/lib/free';
import { t } from '@/lib/i18n';
import { PROVE_PICS } from '@/lib/config';
import { useApp } from '@/lib/store';
import { ActivityList } from '@/ui/activity';
import { SizeSegment } from '@/ui/size-segment';
import { SizeSlider } from '@/ui/size-slider';
import { Icon } from '@/ui/icon';
import { PageIcon } from '@/ui/page-icon';
import { MoreButton } from '@/ui/more-button';
import { ArcButton, Button, Card, Screen, T, tap } from '@/ui/kit';
import { ARC, useColors } from '@/ui/theme';
import { ExamWheelArt } from '@/ui/header-art';
import { NewTestCard, useNewTest } from '@/ui/new-test';

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
// first); the arrow button in its head opens the mistakes page. Before the first exam,
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
      : !open ? 'همه‌ی اشتباهات را اصلاح کرده‌اید؛ یعنی آخرین بار درست جوابشان داده‌اید. برای مرور دوباره، دکمه‌ی فلش بالا را بزنید.' : null;
  return (
    <Card style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: open ? c.badSoft : topics.length ? c.okSoft : c.surface2 }}>
          <Icon name={open ? 'warning' : topics.length ? 'checkCircle' : 'refresh'} size={19} color={open ? c.bad : topics.length ? c.ok : c.text} contrast={c.okSoft} weight="semibold" />
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
          <MoreButton onPress={() => router.push('/mistakes')} label="همه‌ی اشتباهات" />
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
          <T style={{ color: c.muted, fontSize: 12 }}>{ARC ? 'ضعیف‌ترین مبحث بالا — روی هر مبحث بزنید' : 'مبحث را انتخاب کنید تا آزمونش شروع شود — ضعیف‌ترین اول'}</T>
          {/* All topics with mistakes, weakest first, in one row that scrolls sideways. */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingVertical: 2 }}>
            {topics.filter(g => g.open).map(g => (
              <Pressable key={g.c} onPress={() => {
                // Main site: a topic opens the same page as on «اشتباهات» (its questions, then «تمرین این مبحث»), Mojtaba asked.
                tap();
                if (ARC) router.push({ pathname: '/mistakes-view', params: { topic: g.c } });
                else practice(topicPracticeIds(g.list), topicName(bank, g.c));
              }}
                accessibilityLabel={ARC ? topicFa(bank, g.c) : `تمرین ${topicFa(bank, g.c)}`}
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
  // Without premium, FREE_RANDOM random exams (lib/free.ts); then the button opens the premium page.
  const { limited, randomLeft } = useFree();
  const start = () => {
    if (!bank) return;
    if (!randomLeft) { tap(); toPremium(); return; }
    session.plan = { mode: 'random', ids: randomIds(bank, size), title: 'آزمون تصادفی' };
    router.push('/run');
  };
  // Main site: the app's own random exam, its card's choices shared with the header's start button.
  const test = useNewTest(), own = !PROVE_PICS;
  const head = own
    ? { icon: (randomLeft ? 'play' : 'lock') as 'play' | 'lock', label: randomLeft ? `شروع آزمون ${faNum(test.count || test.size)} سؤالی` : 'فعال کردن نسخه‌ی ویژه', onPress: test.start }
    : { icon: (randomLeft ? 'play' : 'lock') as 'play' | 'lock', label: randomLeft ? `شروع آزمون ${faNum(size)} سؤالی` : 'فعال کردن نسخه‌ی ویژه', onPress: start };
  // Scrolled down to the page's end, where the history card is: its arrow button shows «نمایش همه» for a moment, once
  // each time the end is reached (Mojtaba 2026-10-20).
  const [hint, setHint] = useState(0), atEnd = useRef(false);
  const onScrollY = (_y: number, end: boolean) => {
    if (end && !atEnd.current) setHint(h => h + 1);
    atEnd.current = end;
  };
  return (
    <Screen lead={<PageIcon name="exam" />} title="آزمون" subtitle="مثل آزمون واقعی، با زمان و نمره" hero={{ pic: 2, icon: 'exam', art: ARC ? ExamWheelArt : undefined }}
      heroAction={head} onScrollY={onScrollY}>
      {own ? <NewTestCard test={test} /> : (
      <Card style={{ gap: 14 }}>
        {/* The title with its icon, in a tile like the mistakes card's */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
            <Icon name="shuffle" size={19} color={c.text} weight="semibold" />
          </View>
          <T style={{ fontWeight: '700', fontSize: 18 }}>آزمون تصادفی</T>
        </View>
        {/* How to choose the number of questions, then what the chosen number means */}
        {/* Main site: Arc's segmented control, tap a number; /app keeps the slider. */}
        <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 22 }}>{ARC ? 'تعداد سؤال‌ها را انتخاب کنید.' : 'تعداد سؤال‌ها را با کشیدن نوار زیر انتخاب کنید.'}</T>
        {ARC ? <SizeSegment value={size} values={SIZES} onChange={setSize} /> : <SizeSlider value={size} values={SIZES} onChange={setSize} grey />}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 12, borderRadius: 12, backgroundColor: c.surface2 }}>
          <Icon name={size === FULL ? 'checkCircle' : 'clock'} size={17} color={c.muted} />
          <T style={{ flex: 1, fontSize: 13, lineHeight: 21, color: c.muted }}>{sizeHint(size)}</T>
        </View>
        {limited ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 12, borderRadius: 12, backgroundColor: randomLeft ? c.surface2 : c.warnSoft }}>
            <Icon name={randomLeft ? 'info' : 'lock'} size={17} color={randomLeft ? c.muted : c.warn} />
            <T style={{ flex: 1, fontSize: 13, lineHeight: 21, color: randomLeft ? c.muted : c.text }}>{randomLeft
              ? t('در نسخه‌ی رایگان {0} آزمون تصادفی دارید؛ {1} آزمون مانده است.', faNum(FREE_RANDOM), faNum(randomLeft))
              : t('{0} آزمون رایگان شما تمام شد. برای آزمون‌های بیشتر، نسخه‌ی ویژه را فعال کنید.', faNum(FREE_RANDOM))}</T>
          </View>
        ) : null}
        {randomLeft ? (ARC ? <ArcButton label={`شروع آزمون ${faNum(size)} سؤالی`} onPress={start} icon="play" />
          : <Button label={`شروع آزمون ${faNum(size)} سؤالی`} onPress={start} icon="play" kind="grey" />)
          : (ARC ? <ArcButton label="فعال کردن نسخه‌ی ویژه" onPress={start} icon="lock" />
            : <Button label="فعال کردن نسخه‌ی ویژه" onPress={start} icon="lock" kind="grey" />)}
      </Card>
      )}
      {/* The arrow button in its head opens every exam on its own page (/history), like the mistakes card's. */}
      <ActivityList attempts={attempts} limit={3} title="تاریخچه‌ی آزمون‌ها" allHref="/history" hint={hint} />
      {/* Main site: no mistakes card (Mojtaba 2026-10-19); the random test's card has the mistakes bar and its test. */}
      {own ? null : <MistakesCard />}
    </Screen>
  );
}
