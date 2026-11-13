// The home page's sections under the chart (Mojtaba 2026-11-08, after fonts.google.com/knowledge): «مباحث» as chips that
// scroll sideways (its «Browse topics»), the chapter you are on as a module (its title, its line, its lessons with a tick
// for each one done and «همه‌ی درس‌ها», as Knowledge's modules and «View all articles»), a featured guide (as its book
// block: the road signs) and a random test with a 5–25 question size control (in place of the
// glossary since 2026-11-08).
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';

import { COURSE } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { RTL, tr } from '@/lib/i18n';
import type { CourseLesson } from '@/lib/course';
import { FULL, SIZES, faNum } from '@/lib/logic';
import { Cookie } from './cookie';
import { ServiceCarousel, type ServiceItem } from './service-carousel';
import { Icon, type IconName } from './icon';
import { M3Button, T, tap } from './kit';
import { useTabLook } from './tabs/tab-look';
import { useNewTest } from './new-test';
import { m3Scheme, useColors, useIsDark, useM3 } from './theme';

export function Head({ title, text }: { title: string; text?: string }) {
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
export const iconOf = (title: string): IconName => (ICONS.find(([re]) => re.test(title)) ?? [null, 'learn'])[1] as IconName;

export type TileItem = { key: string; title: string; icon: IconName; done?: boolean; onPress: () => void };
// A row of outlined square tiles that scrolls sideways (fonts.google.com's «Browse topics»; Mojtaba 2026-11-08): each a
// large line icon in the primary over its name, a tick at its corner when done, and a round arrow at the end that
// moves the row on by a tile. Shared by the home page's lessons and the learn tab's chapters.
export function Tiles({ items }: { items: TileItem[] }) {
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
        {items.map(it => (
          <Pressable key={it.key} onPress={() => { tap(); it.onPress(); }} accessibilityRole="button" accessibilityLabel={it.title}
            style={({ pressed }) => ({ width: TILE, height: TILE, borderRadius: 24, borderWidth: 1, borderColor: c.line, alignItems: 'center', justifyContent: 'center',
              gap: 12, paddingHorizontal: 12, backgroundColor: pressed ? c.surface2 : 'transparent' })}>
            <Icon name={it.icon} size={64} color={m.primary} />
            <T numberOfLines={2} style={{ fontSize: 14.5, lineHeight: 21, fontWeight: '500', textAlign: 'center' }}>{it.title}</T>
            {it.done ? <View style={{ position: 'absolute', top: 10, end: 10 } as object}><Icon name="checkCircle" size={20} color={c.ok} filled /></View> : null}
          </Pressable>
        ))}
      </ScrollView>
      {end || items.length < 3 ? null : (
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

function LessonTiles({ lessons, done }: { lessons: CourseLesson[]; done: Record<string, number> }) {
  return <Tiles items={lessons.map(l => ({ key: l.id, title: tr(l.title), icon: iconOf(l.title), done: !!done[l.id],
    onPress: () => router.push({ pathname: '/course-lesson', params: { id: l.id } }) }))} />;
}

// The app's main parts, for the home page's card row.
const PARTS: ServiceItem[] = [
  { number: '001', title: 'آزمون تئوری', description: '۱۱۰۰ سؤال مثل آزمون واقعی؛ ۲۵ سؤال در ۲۵ دقیقه', icon: 'exam', tone: 'blue', onPress: () => router.navigate('/exam') },
  { number: '002', title: 'دوره‌ی گام‌به‌گام', description: 'درس‌های کوتاه به فارسی، از قدم اول تا روز آزمون', icon: 'learn', tone: 'green', onPress: () => router.push('/course') },
  { number: '003', title: 'تابلوها', description: 'همه‌ی تابلوهای دانمارک با معنی و مثال', icon: 'sign', tone: 'red', onPress: () => router.push('/signs') },
  { number: '004', title: 'حق تقدم', description: 'چه کسی اول می‌رود؟ با موقعیت‌های تصویری', icon: 'priority', tone: 'amber', onPress: () => router.push('/priority') },
  { number: '005', title: 'قوانین', description: 'قانون راهنمایی و رانندگی دانمارک به زبان ساده', icon: 'rules', tone: 'purple', onPress: () => router.push('/rules') },
  { number: '006', title: 'واژه‌نامه', description: 'واژه‌های آزمون به دانمارکی، فارسی و انگلیسی', icon: 'translate', tone: 'blue', onPress: () => router.push('/glossary') },
];

export function HomeKnowledge({ gap = 14 }: { gap?: number }) {
  const c = useColors(), m = useM3(), tab = useTabLook();
  const signsScheme = m3Scheme(useIsDark());
  const { done } = useCourseProgress();
  // The chapter you are on: the first with a lesson not done (the last when all are).
  const chapter = COURSE.find(ch => ch.lessons.some(l => !done[l.id])) ?? COURSE[COURSE.length - 1];
  // Home offers a size only: use the whole bank so previous answers never shorten the selected test.
  const test = useNewTest(false);
  const minSize = SIZES[0], step = SIZES[1] - minSize;
  const resize = (delta: number) => { tap(); test.setSize(size => Math.max(minSize, Math.min(FULL, size + delta))); };
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
      {/* «هرچه در تئوری‌پرو هست»: the app's main parts as tall gradient cards that slide sideways, each opening its
          page (ui/service-carousel.tsx; Mojtaba 2026-11-13) */}
      <View style={{ gap: 12 }}>
        <Head title={tr('هرچه در تئوری‌پرو هست')} text={tr('همه‌ی بخش‌های آمادگی برای آزمون، یک‌جا')} />
        <ServiceCarousel items={PARTS} height={280} />
      </View>

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
      <View style={{ borderRadius: 28, backgroundColor: signsScheme?.container ?? c.surface, padding: 22, gap: 14 }}>
        <Cookie size={64} color={signsScheme?.primary ?? tab.indicator}><Icon name="sign" size={32} color={signsScheme?.onPrimary ?? tab.onIndicator} /></Cookie>
        <T style={{ fontSize: 24, lineHeight: 34, fontWeight: '500', color: signsScheme?.onContainer ?? c.text }}>{tr('علائم رانندگی دانمارک')}</T>
        <T style={{ fontSize: 14.5, lineHeight: 24, color: signsScheme?.onContainer ?? c.muted }}>{tr('همه‌ی تابلوها و خط‌کشی‌های آزمون، با معنی و نکته‌ی هر کدام؛ گروه‌به‌گروه، با تصویر.')}</T>
        <View style={{ alignItems: 'flex-start' }}>
          <M3Button kind="outlined" m={m} icon="sign" label={tr('دیدن تابلوها')} onPress={() => router.push('/signs')} />
        </View>
      </View>

      {/* A compact theory test setup: an outlined size stepper and one start action. */}
      <View testID="home-theory-test" style={{ gap: 16, marginBottom: 24 }}>
        <Head title={tr('آزمون تئوری')} />
        <View style={{ direction: 'ltr', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <T testID="home-theory-description" style={{ flex: 1, minWidth: 0, fontSize: 14.5, lineHeight: 24, color: c.muted }}>{tr('آزمون تصادفی با تعداد سؤال دلخواه، برای تمرین با سرعت خودتان.')}</T>
          <View testID="home-theory-controls" style={{ flex: 0.95, minWidth: 0, gap: 10 }}>
            <View style={{ direction: 'ltr', flexDirection: 'row', alignItems: 'center', minHeight: 40, borderRadius: 999, borderWidth: 1, borderColor: m.outline, paddingHorizontal: 4 }}>
              <Pressable onPress={() => resize(-step)} disabled={test.size <= minSize} accessibilityRole="button"
                accessibilityLabel={tr('کاهش تعداد سؤال‌ها')} accessibilityState={{ disabled: test.size <= minSize }}
                hitSlop={{ top: 3, bottom: 3, left: 2, right: 2 }}
                style={({ pressed }) => ({ width: 40, minHeight: 38, borderRadius: 999, alignItems: 'center', justifyContent: 'center', opacity: test.size <= minSize ? 0.38 : 1, backgroundColor: pressed ? c.surface2 : 'transparent' })}>
                <T raw style={{ fontSize: 24, lineHeight: 28, color: c.text }}>−</T>
              </Pressable>
              <T raw testID="home-theory-size" accessibilityLiveRegion="polite" style={{ flex: 1, textAlign: 'center', fontSize: 16, lineHeight: 22, color: c.text, fontWeight: '500' }}>{faNum(test.size)}</T>
              <Pressable onPress={() => resize(step)} disabled={test.size >= FULL} accessibilityRole="button"
                accessibilityLabel={tr('افزایش تعداد سؤال‌ها')} accessibilityState={{ disabled: test.size >= FULL }}
                hitSlop={{ top: 3, bottom: 3, left: 2, right: 2 }}
                style={({ pressed }) => ({ width: 40, minHeight: 38, borderRadius: 999, alignItems: 'center', justifyContent: 'center', opacity: test.size >= FULL ? 0.38 : 1, backgroundColor: pressed ? c.surface2 : 'transparent' })}>
                <T raw style={{ fontSize: 24, lineHeight: 28, color: c.text }}>+</T>
              </Pressable>
            </View>
            <M3Button compact iconSize={16} kind="outlined" m={m} icon={test.randomLeft ? undefined : 'lock'} onPress={test.start} disabled={!test.ready || test.count < test.size}
              labelStyle={test.randomLeft ? { fontSize: 16, lineHeight: 22 } : undefined}
              contentStyle={test.randomLeft ? { paddingHorizontal: 4, gap: 4 } : undefined}
              label={test.randomLeft ? tr('شروع آزمون') : tr('نسخه‌ی ویژه')} />
          </View>
        </View>
      </View>
    </View>
  );
}
