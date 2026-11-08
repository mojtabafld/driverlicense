// The home page's sections under the chart (Mojtaba 2026-11-08, after fonts.google.com/knowledge): «مباحث» as chips that
// scroll sideways (its «Browse topics»), the chapter you are on as a module (its title, its line, its lessons with a tick
// for each one done and «همه‌ی درس‌ها», as Knowledge's modules and «View all articles»), a featured guide (as its book
// block: the road signs) and the tests: what the real one is like and a random 25-question test (in place of the
// glossary since 2026-11-08).
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';

import { COURSE } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { RTL, t, tr } from '@/lib/i18n';
import type { CourseLesson } from '@/lib/course';
import { FULL, faNum, passMin } from '@/lib/logic';
import { Cookie } from './cookie';
import { Icon, type IconName } from './icon';
import { M3Button, T, tap } from './kit';
import { useTabLook } from './tabs/tab-look';
import { useNewTest } from './new-test';
import { useColors, useM3 } from './theme';

function Head({ title, text }: { title: string; text?: string }) {
  const c = useColors();
  return (
    <View style={{ gap: 6, paddingHorizontal: 4 }}>
      <T style={{ fontSize: 22, lineHeight: 32, fontWeight: '500' }}>{title}</T>
      {text ? <T style={{ fontSize: 14.5, lineHeight: 24, color: c.muted }}>{text}</T> : null}
    </View>
  );
}

// An icon for a lesson, from the words of its title (the course has none of its own).
const ICONS: [RegExp, IconName][] = [[/آزمون/, 'exam'], [/کمربند|صندلی/, 'seatbelt'], [/الکل|مواد|خستگی/, 'glass'], [/خودرو|بازدید|تجهیزات/, 'car'],
  [/سرعت/, 'gauge'], [/فاصله/, 'distance'], [/پارک|توقف/, 'parking'], [/چراغ/, 'headlight'], [/تابلو|علائم/, 'sign'], [/خط/, 'lanes'],
  [/دست راست|تقدم|راه دادن|تقاطع|میدان/, 'priority'], [/تلفن|موبایل|حواس/, 'phone'], [/عابر|دوچرخه|کودک/, 'person'], [/جاده|بزرگراه|مسیر/, 'road']];
const iconOf = (title: string): IconName => (ICONS.find(([re]) => re.test(title)) ?? [null, 'learn'])[1] as IconName;

// The chapter's lessons as fonts.google.com's «Browse topics» (Mojtaba 2026-11-08): outlined square tiles in a row that
// scrolls sideways, each a large line icon in the primary over the lesson's name, a tick at its corner when done, and
// a round arrow at the end that moves the row on by a tile.
function LessonTiles({ lessons, done }: { lessons: CourseLesson[]; done: Record<string, number> }) {
  const c = useColors(), m = useM3();
  const ref = useRef<ScrollView>(null), x = useRef(0);
  const [end, setEnd] = useState(false);
  const TILE = 156, GAP = 12;
  const more = () => {
    tap();
    const node = (ref.current as unknown as { getScrollableNode?: () => HTMLElement })?.getScrollableNode?.();
    if (Platform.OS === 'web' && node?.scrollBy) node.scrollBy({ left: (RTL ? -1 : 1) * (TILE + GAP), behavior: 'smooth' });
    else ref.current?.scrollTo({ x: x.current + TILE + GAP, animated: true });
  };
  return (
    <View>
      <ScrollView ref={ref} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: GAP, paddingHorizontal: 4 }} scrollEventThrottle={32}
        onScroll={e => { const n = e.nativeEvent; x.current = Math.abs(n.contentOffset.x); setEnd(x.current + n.layoutMeasurement.width >= n.contentSize.width - 8); }}>
        {lessons.map(l => {
          const ok = !!done[l.id];
          return (
            <Pressable key={l.id} onPress={() => { tap(); router.push({ pathname: '/course-lesson', params: { id: l.id } }); }} accessibilityRole="button" accessibilityLabel={tr(l.title)}
              style={({ pressed }) => ({ width: TILE, height: TILE, borderRadius: 24, borderWidth: 1, borderColor: c.line, alignItems: 'center', justifyContent: 'center',
                gap: 12, paddingHorizontal: 12, backgroundColor: pressed ? c.surface2 : 'transparent' })}>
              <Icon name={iconOf(l.title)} size={64} color={m.primary} />
              <T numberOfLines={2} style={{ fontSize: 14.5, lineHeight: 21, fontWeight: '500', textAlign: 'center' }}>{tr(l.title)}</T>
              {ok ? <View style={{ position: 'absolute', top: 10, end: 10 } as object}><Icon name="checkCircle" size={20} color={c.ok} filled /></View> : null}
            </Pressable>
          );
        })}
      </ScrollView>
      {end || lessons.length < 3 ? null : (
        <Pressable onPress={more} accessibilityRole="button" accessibilityLabel={tr('بعدی')} hitSlop={6}
          style={({ pressed }) => ({ position: 'absolute', top: TILE / 2 - 22, ...(RTL ? { left: 0 } : { right: 0 }), width: 44, height: 44, borderRadius: 22,
            alignItems: 'center', justifyContent: 'center', backgroundColor: m.dialog, opacity: pressed ? 0.8 : 1,
            shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 3 })}>
          <Icon name="chevronLeft" size={24} color={c.text} />
        </Pressable>
      )}
    </View>
  );
}

export function HomeKnowledge({ gap = 14 }: { gap?: number }) {
  const c = useColors(), m = useM3(), tab = useTabLook();
  const { done } = useCourseProgress();
  // The chapter you are on: the first with a lesson not done (the last when all are).
  const chapter = COURSE.find(ch => ch.lessons.some(l => !done[l.id])) ?? COURSE[COURSE.length - 1];
  const test = useNewTest();
  const open = (go: () => void) => () => { tap(); go(); };
  const chip = (label: string, onPress: () => void, icon?: IconName) => (
    <Pressable key={label} onPress={open(onPress)} accessibilityRole="button"
      style={({ pressed }) => ({ height: 40, paddingHorizontal: 16, borderRadius: 999, borderWidth: 1, borderColor: m.outline, flexDirection: 'row', alignItems: 'center', gap: 6,
        backgroundColor: pressed ? c.surface2 : 'transparent' })}>
      {icon ? <Icon name={icon} size={18} color={c.text} /> : null}
      <T numberOfLines={1} style={{ fontSize: 14, fontWeight: '500' }}>{label}</T>
    </Pressable>
  );
  return (
    <View style={{ gap: gap + 16, paddingTop: 8 }}>
      {/* «مباحث»: the course's chapters and the other guides as chips, sideways */}
      <View style={{ gap: 12 }}>
        <Head title={tr('مباحث')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 4 }}>
          {COURSE.map(ch => chip(tr(ch.title), () => router.push({ pathname: '/course-lesson', params: { id: (ch.lessons.find(l => !done[l.id]) ?? ch.lessons[0]).id } })))}
          {chip(tr('علائم رانندگی'), () => router.push('/signs'), 'sign')}
          {chip(tr('حق تقدم'), () => router.push('/priority'), 'priority')}
          {chip(tr('قوانین'), () => router.push('/rules'), 'rules')}
          {chip(tr('همه‌ی مباحث'), () => router.navigate('/learn'), 'arrowLeft')}
        </ScrollView>
      </View>

      {/* The chapter you are on, as a module */}
      <View style={{ gap: 12 }}>
        <Head title={tr(chapter.title)} text={tr(chapter.sub)} />
        <LessonTiles lessons={chapter.lessons} done={done} />
        <View style={{ alignItems: 'center' }}>
          <M3Button kind="outlined" m={m} icon="learn" onPress={() => router.push('/course')}
            label={tr('همه‌ی درس‌ها')} />
        </View>
      </View>

      {/* A featured guide, as Knowledge's book block: the road signs */}
      <View style={{ borderRadius: 28, backgroundColor: c.surface, padding: 22, gap: 14 }}>
        <Cookie size={64} color={tab.indicator}><Icon name="sign" size={32} color={tab.onIndicator} /></Cookie>
        <T style={{ fontSize: 24, lineHeight: 34, fontWeight: '500' }}>{tr('علائم رانندگی دانمارک')}</T>
        <T style={{ fontSize: 14.5, lineHeight: 24, color: c.muted }}>{tr('همه‌ی تابلوها و خط‌کشی‌های آزمون، با معنی و نکته‌ی هر کدام؛ گروه‌به‌گروه، با تصویر.')}</T>
        <View style={{ alignItems: 'flex-start' }}>
          <M3Button kind="outlined" m={m} icon="sign" label={tr('دیدن تابلوها')} onPress={() => router.push('/signs')} />
        </View>
      </View>

      {/* The tests (Mojtaba 2026-11-08, in place of the glossary): what the real test is like, and a random 25-question
          test started from here as the exam tab's start button does (new questions first, the free tests' limit). */}
      <View style={{ gap: 12 }}>
        <Head title={tr('آزمون تئوری')} text={t('آزمون واقعی {0} سؤال دارد و برای قبولی دست‌کم {1} پاسخ باید درست باشد. هر سؤال یک تصویر و چند جمله دارد که درست یا نادرست بودن هر کدام را باید بگویید.', faNum(FULL), faNum(passMin(FULL)))} />
        <View style={{ borderRadius: 24, backgroundColor: c.surface, overflow: 'hidden' }}>
          {([['exam', t('{0} سؤال تصادفی، مثل آزمون واقعی', faNum(FULL))], ['warning', t('حداکثر {0} اشتباه برای قبولی', faNum(FULL - passMin(FULL)))],
            ['eyeSlash', tr('سؤال‌هایی که دیده‌اید کنار گذاشته می‌شوند')], ['checkCircle', tr('نتیجه و مرور همه‌ی پاسخ‌ها بعد از آزمون')]] as [IconName, string][]).map(([icon, text], i) => (
            <View key={text} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 18, paddingVertical: 14, borderTopWidth: i ? 1 : 0, borderTopColor: c.line }}>
              <Icon name={icon} size={20} color={c.muted} />
              <T style={{ flex: 1, fontSize: 15, lineHeight: 23 }}>{text}</T>
            </View>
          ))}
        </View>
        <View style={{ alignItems: 'center' }}>
          <M3Button kind="outlined" m={m} icon="play" big onPress={test.start}
            label={test.randomLeft ? t('شروع آزمون تصادفی {0} سؤالی', faNum(test.count || FULL)) : tr('فعال کردن نسخه‌ی ویژه')} />
        </View>
      </View>
    </View>
  );
}
