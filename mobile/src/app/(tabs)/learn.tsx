// «آموزش»: five parts as cards one under the other, each with its picture (made by the server's image model; the part's
// icon until it is there) in a rounded pastel frame beside its title, a
// short line on what is in it and its progress note; a card opens its part's page: the app's own course «آموزش گام‌به‌گام» (app/course.tsx), the rules,
// the road signs, right of way and the test's glossary.
// At /app (prove.dk's copy) the cards stay two by two and the first one is prove.dk's 44 lessons one by one
// (app/learn-lessons.tsx) instead of the app's own course.
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, type Href } from 'expo-router';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { API_URL, PROVE_BANK, PROVE_PICS } from '@/lib/config';
import { COURSE } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { faNum } from '@/lib/logic';
import { t, tr } from '@/lib/i18n';
import { useApp } from '@/lib/store';
import { CoachButton } from '@/ui/coach-button';
import { Icon, type IconName } from '@/ui/icon';
import { PageIcon } from '@/ui/page-icon';
import { Card, M3Button, Screen, T, tap } from '@/ui/kit';
import { Head, Tiles, iconOf } from '@/ui/home-knowledge';
import { SearchBox } from '@/ui/search-box';
import { ARC, useColors, useIsDark, useM3 } from '@/ui/theme';
import { LearnBookArt } from '@/ui/header-art';
import { mix, rgba } from '@/ui/palette';

// The five learning cards show their original illustrations inside theme-colored pastel frames.
function Part({ n, icon, title, text, note, href }: { n: number; icon: IconName; title: string; text: string; note?: string; href: Href }) {
  const c = useColors();
  const { learnArt } = useApp();
  // The dark theme draws the card's own dark picture (6–10: the same drawing on a dark tint of its colour; Mojtaba
  // 2026-10-22) once the server has made it, with the light theme's fade; until then the light one.
  const dark = useIsDark(), pn = dark && learnArt[n + 5] ? n + 5 : n, v = learnArt[pn];
  // Short phones: lower cards; very short ones (iPhone SE first generation) without the short line, so all five fit
  // above the tab bar (Mojtaba 2026-10-22). The height left by the status bar and the home indicator counts (an
  // iPhone's 844 points are about 760 there).
  const ins = useSafeAreaInsets(), h = useWindowDimensions().height - ins.top - ins.bottom, short = h < 780, tiny = h < 640;
  const pictureSize = tiny ? 40 : short ? 48 : 68;
  const frameColors = [mix(c.link, c.surface, dark ? 0.82 : 0.86), mix(c.link, c.surface, dark ? 0.92 : 0.96)] as const;
  // The round ‹ at the card's end, beside the words, not on the picture (Mojtaba 2026-10-22).
  const arrow = (
    <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: c.surface2, alignItems: 'center', justifyContent: 'center' }}>
      <Icon name="chevronLeft" size={14} color={c.muted} weight="semibold" />
    </View>
  );
  return (
    <Card onPress={() => router.push(href)} style={{ flexGrow: 1, flexShrink: 0, padding: 0, overflow: 'hidden', minHeight: tiny ? 52 : short ? 62 : 92 }}>
      <View accessibilityRole="button" accessibilityLabel={title} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: tiny ? 6 : short ? 7 : 12, paddingHorizontal: 12 }}>
        <LinearGradient colors={frameColors} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
          style={{ width: pictureSize, height: pictureSize, flexShrink: 0, borderRadius: pictureSize * 14 / 48, borderWidth: 1.2,
            borderColor: rgba(c.link, dark ? 0.28 : 0.18), alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {v ? <Image source={{ uri: `${API_URL}/learn-art/${pn}.png?v=${v}-c3` }} style={{ width: '100%', height: '100%' }} contentFit="contain" transition={250} />
            : <Icon name={icon} size={Math.round(pictureSize * 0.65)} color={c.link} weight="semibold" />}
        </LinearGradient>
        <View style={{ flex: 1, gap: 1 }}>
          <T style={{ fontSize: short ? 16 : 17.5, lineHeight: short ? 22 : 25, fontWeight: '700' }} numberOfLines={short ? 1 : 2}>{title}</T>
          {tiny ? null : <T style={{ fontSize: 12.5, lineHeight: 18, color: c.muted }} numberOfLines={1}>{text}</T>}
          {note ? <T style={{ fontSize: 11.5, lineHeight: 17, color: c.faint }} numberOfLines={1}>{note}</T> : null}
        </View>
        {arrow}
      </View>
    </Card>
  );
}

// /app (prove.dk's copy) keeps its cards two by two, each with its picture on top.
function Tile({ n, icon, title, note, href }: { n: number; icon: IconName; title: string; note?: string; href: Href }) {
  const c = useColors();
  const { learnArt } = useApp();
  const short = useWindowDimensions().height < 700; // less text on short screens
  // The dark theme's own pictures (6–10) here too (Mojtaba 2026-10-22), as on the main site's cards.
  const pn = useIsDark() && learnArt[n + 5] ? n + 5 : n, v = learnArt[pn];
  return (
    <Card onPress={() => router.push(href)} style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
      {/* The picture, whole (never cropped), in the card's top, the rest of
          it in the picture's own background colour; the icon on a soft tile until the picture is made. */}
      <View style={{ height: short ? 96 : 120, backgroundColor: v ? 'transparent' : c.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
        {v ? <Image source={{ uri: `${API_URL}/learn-art/${pn}.png?v=${v}-c3` }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} contentFit="contain" transition={250} />
          : <Icon name={icon} size={40} color={c.link} weight="semibold" />}
      </View>
      <View style={{ padding: 12, gap: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <T style={{ flex: 1, fontWeight: '700', fontSize: 17.5, lineHeight: 26 }} numberOfLines={1}>{title}</T>
          <Icon name="chevronLeft" size={15} color={c.faint} weight="semibold" />
        </View>
        {/* A line for the note on every card (empty when there is none), so the four pictures are the same size. */}
        <T style={{ color: c.text, fontSize: 11.5, lineHeight: 17, height: 17, fontWeight: '600' }} numberOfLines={1}>{note ?? ''}</T>
      </View>
    </Card>
  );
}

// The main site's learn tab in the home page's language (Mojtaba 2026-11-08, after fonts.google.com/knowledge): the
// search, then the course as a section (its title, a line with how far you are, its chapters as outlined tiles that
// scroll sideways, «همه‌ی فصل‌ها»), then the guides as a grid of outlined tiles (rules, signs, right of way, glossary).
const CHAPTER_ICON: Record<string, IconName> = { ready: 'car', road: 'road', priority: 'priority', signs: 'sign', manoeuvres: 'parking',
  people: 'person', special: 'headlight', incidents: 'warning', final: 'exam' };
function LearnSections() {
  const c = useColors(), m = useM3();
  const { done } = useCourseProgress();
  const lessons = COURSE.flatMap(ch => ch.lessons), finished = lessons.filter(l => done[l.id]).length;
  const guide = (icon: IconName, title: string, text: string, href: Href) => (
    <Pressable key={title} onPress={() => { tap(); router.push(href); }} accessibilityRole="button" accessibilityLabel={tr(title)}
      style={({ pressed }) => ({ flexBasis: '47%', flexGrow: 1, minHeight: 150, borderRadius: 24, borderWidth: 1, borderColor: c.line, padding: 16, gap: 10,
        justifyContent: 'flex-end', backgroundColor: pressed ? c.surface2 : 'transparent' })}>
      <Icon name={icon} size={44} color={m.primary} />
      <View style={{ gap: 2 }}>
        <T numberOfLines={2} style={{ fontSize: 16, lineHeight: 23, fontWeight: '500' }}>{title}</T>
        <T numberOfLines={2} style={{ fontSize: 13, lineHeight: 19, color: c.muted }}>{text}</T>
      </View>
    </Pressable>
  );
  return (
    <View style={{ gap: 28 }}>
      <SearchBox />
      <View style={{ gap: 12 }}>
        <Head title={tr('آموزش گام‌به‌گام')}
          text={finished ? t('فصل به فصل، مثل آزمون. {0} از {1} درس را تمام کرده‌اید.', faNum(finished), faNum(lessons.length))
            : t('فصل به فصل، مثل آزمون: {0} درس در {1} فصل، هر کدام با تمرین و آزمون کوتاه.', faNum(lessons.length), faNum(COURSE.length))} />
        <Tiles items={COURSE.map(ch => ({ key: ch.id, title: tr(ch.title), icon: CHAPTER_ICON[ch.id] ?? iconOf(ch.title), done: ch.lessons.every(l => done[l.id]),
          onPress: () => router.push({ pathname: '/course-lesson', params: { id: (ch.lessons.find(l => !done[l.id]) ?? ch.lessons[0]).id } }) }))} />
        <View style={{ alignItems: 'center' }}>
          <M3Button kind="outlined" m={m} icon="learn" label={tr('همه‌ی فصل‌ها')} onPress={() => router.push('/course')} />
        </View>
      </View>
      <View style={{ gap: 12 }}>
        <Head title={tr('راهنماها')} text={tr('قوانین، تابلوها و حق تقدم به زبان ساده، و واژه‌های دانمارکی آزمون.')} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {guide('rules', 'قوانین', 'قوانین مهم به زبان ساده', '/rules')}
          {guide('sign', 'علائم رانندگی', 'تابلوها و خط‌کشی‌ها', '/signs')}
          {guide('priority', 'آموزش حق تقدم', 'چه کسی اول می‌رود؟', '/priority')}
          {guide('translate', 'واژه‌نامه‌ی آزمون', 'واژه‌های دانمارکی آزمون', '/glossary')}
        </View>
      </View>
    </View>
  );
}

export default function Learn() {
  const { done } = useCourseProgress();
  const { bank, attempts } = useApp();
  const ready = COURSE.flatMap(ch => ch.lessons), finished = ready.filter(l => done[l.id]).length;
  const ins = useSafeAreaInsets(), short = useWindowDimensions().height - ins.top - ins.bottom < 780;
  const tried = new Set(attempts.filter(a => a.mode === 'lesson').map(a => a.lesson)).size, all = bank?.tests.length ?? 44;
  return (
    // Main site: the five cards share the screen's height between the search box and the tab bar (taller on tall
    // phones, never shorter than their content; Mojtaba 2026-10-18).
    <Screen fill={!PROVE_PICS && PROVE_BANK} gap={short ? 10 : 14} barGap={PROVE_PICS || !PROVE_BANK ? undefined : 16} lead={<PageIcon name="learn" />} title="آموزش" subtitle="درس‌ها، تابلوها و قوانین راه" hero={{ pic: 1, icon: 'learn', art: ARC ? LearnBookArt : undefined }}
      heroAction={{ icon: 'calendar', label: 'تقویم', onPress: () => router.push('/calendar') }} heroExtra={<CoachButton from="learn" />}>
      {PROVE_PICS ? (
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Tile n={1} icon="learn" title="آموزش درس‌به‌درس" href="/learn-lessons"
              note={tried ? `${faNum(tried)} از ${faNum(all)} درس انجام شده` : undefined} />
            <Tile n={2} icon="rules" title="قوانین" href="/rules" />
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Tile n={3} icon="sign" title="علائم رانندگی" href="/signs" />
            <Tile n={4} icon="priority" title="آموزش حق تقدم" href="/priority" />
          </View>
        </View>
      ) : (
        PROVE_BANK ? (
        <View style={{ gap: short ? 8 : 10, flex: 1 }}>
          {/* Search the learning pages (the course, rules, signs, right of way) by their words and, with «جستجو», by the
              AI; the results open on their own page (app/course-search.tsx). */}
          <SearchBox />
          {/* /app: prove.dk's 44 numbered tests in place of the app's own course (Mojtaba 2026-10-20). */}
          {PROVE_BANK ? (
            <Part n={1} icon="learn" title="آموزش درس‌به‌درس" href="/learn-lessons" text={`${faNum(all)} درس رسمی`}
              note={tried ? `${faNum(tried)} از ${faNum(all)} درس انجام شده` : undefined} />
          ) : (
            <Part n={1} icon="learn" title="آموزش گام‌به‌گام" href="/course" text="فصل به فصل، مثل آزمون"
              note={finished ? `${faNum(finished)} از ${faNum(ready.length)} درس انجام شده` : undefined} />
          )}
          <Part n={2} icon="rules" title="قوانین" href="/rules" text="قوانین مهم به زبان ساده" />
          <Part n={3} icon="sign" title="علائم رانندگی" href="/signs" text="تابلوها و خط‌کشی‌ها" />
          <Part n={4} icon="priority" title="آموزش حق تقدم" href="/priority" text="چه کسی اول می‌رود؟" />
          <Part n={5} icon="translate" title="واژه‌نامه‌ی آزمون" href="/glossary" text="واژه‌های دانمارکی آزمون" />
        </View>
        ) : <LearnSections />
      )}
    </Screen>
  );
}
