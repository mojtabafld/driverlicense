// «آموزش»: five parts as cards one under the other, each with its picture (made by the server's image model; the part's
// icon until it is there) filling the card from the picture's side and melting into the card's colour under its title
// and progress note; a card opens its part's page: the app's own course «آموزش گام‌به‌گام» (app/course.tsx), the rules,
// the road signs, right of way and the test's glossary.
// At /app (prove.dk's copy) the cards stay two by two and the first one is prove.dk's 44 lessons one by one
// (app/learn-lessons.tsx) instead of the app's own course.
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, type Href } from 'expo-router';
import { View, useWindowDimensions } from 'react-native';

import { API_URL, PROVE_BANK, PROVE_PICS } from '@/lib/config';
import { RTL } from '@/lib/i18n';
import { COURSE } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { faNum } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { Icon, type IconName } from '@/ui/icon';
import { PageIcon } from '@/ui/page-icon';
import { Card, Screen, T, physical } from '@/ui/kit';
import { SearchBox } from '@/ui/search-box';
import { ARC, useColors } from '@/ui/theme';
import { LearnBookArt } from '@/ui/header-art';

// The fade from the picture into the card's own colour: its steps slow at both ends (smoothstep, as ui/tall-picture.tsx),
// from clear over the picture to the full colour under the title.
const FADE = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1] as const;
const FADE_AT = FADE.map(t => 0.34 + 0.24 * t) as unknown as readonly [number, number, ...number[]];
const FADE_A = FADE.map(t => Math.round(255 * t * t * (3 - 2 * t)).toString(16).padStart(2, '0'));

// A card of the five (Mojtaba 2026-10-21): its picture fills the card from its end (the left in Persian, the right in
// English and Danish) and melts into the card's colour, light or dark, under the title at its start.
function Part({ n, icon, title, note, href }: { n: number; icon: IconName; title: string; note?: string; href: Href }) {
  const c = useColors();
  const { learnArt } = useApp();
  const v = learnArt[n];
  const short = useWindowDimensions().height < 760;
  const fades = FADE_A.map(a => `${c.surface}${a}`) as unknown as readonly [string, string, ...string[]];
  // The gradient runs from the picture's side to the other one.
  const from = RTL ? { x: 0, y: 0.5 } : { x: 1, y: 0.5 }, to = RTL ? { x: 1, y: 0.5 } : { x: 0, y: 0.5 };
  return (
    <Card onPress={() => router.push(href)} style={{ flexGrow: 1, flexShrink: 0, padding: 0, overflow: 'hidden', minHeight: short ? 76 : 92 }}>
      <View style={[{ position: 'absolute', top: 0, bottom: 0, width: '58%', backgroundColor: c.accentSoft, alignItems: 'center', justifyContent: 'center' }, physical(RTL ? { left: 0 } : { right: 0 })]}>
        {v ? <Image source={{ uri: `${API_URL}/learn-art/${n}.png?v=${v}` }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} contentFit="cover" transition={250} />
          : <Icon name={icon} size={26} color={c.link} weight="semibold" />}
      </View>
      <LinearGradient pointerEvents="none" colors={fades} locations={FADE_AT} start={from} end={to} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
      <View accessibilityRole="button" accessibilityLabel={title} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12, paddingHorizontal: 16 }}>
        {/* The title over the fade, the picture's room beside it; no arrow (Mojtaba 2026-10-21). */}
        <View style={{ flex: 1, gap: 2 }}>
          <T style={{ fontSize: 17.5, lineHeight: 26, fontWeight: '700' }} numberOfLines={2}>{title}</T>
          {note ? <T style={{ fontSize: 11.5, lineHeight: 17, color: c.faint }} numberOfLines={1}>{note}</T> : null}
        </View>
        <View style={{ width: '48%' }} />
      </View>
    </Card>
  );
}

// /app (prove.dk's copy) keeps its cards two by two, each with its picture on top.
function Tile({ n, icon, title, note, href }: { n: number; icon: IconName; title: string; note?: string; href: Href }) {
  const c = useColors();
  const { learnArt, learnBg } = useApp();
  const short = useWindowDimensions().height < 700; // less text on short screens
  const v = learnArt[n];
  return (
    <Card onPress={() => router.push(href)} style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
      {/* The picture, whole (never cropped), in the card's top, the rest of
          it in the picture's own background colour; the icon on a soft tile until the picture is made. */}
      <View style={{ height: short ? 96 : 120, backgroundColor: (v && learnBg[n]) || c.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
        {v ? <Image source={{ uri: `${API_URL}/learn-art/${n}.png?v=${v}` }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} contentFit="contain" transition={250} />
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

export default function Learn() {
  const { done } = useCourseProgress();
  const { bank, attempts } = useApp();
  const ready = COURSE.flatMap(ch => ch.lessons), finished = ready.filter(l => done[l.id]).length;
  const short = useWindowDimensions().height < 760;
  const tried = new Set(attempts.filter(a => a.mode === 'lesson').map(a => a.lesson)).size, all = bank?.tests.length ?? 44;
  return (
    // Main site: the five cards share the screen's height between the search box and the tab bar (taller on tall
    // phones, never shorter than their content; Mojtaba 2026-10-18).
    <Screen fill={!PROVE_PICS} gap={short ? 10 : 14} barGap={PROVE_PICS ? undefined : 8} lead={<PageIcon name="learn" />} title="آموزش" subtitle="درس‌ها، تابلوها و قوانین راه" hero={{ pic: 1, icon: 'learn', art: ARC ? LearnBookArt : undefined }}
      heroAction={{ icon: 'calendar', label: 'تقویم', onPress: () => router.push('/calendar') }}>
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
        <View style={{ gap: short ? 8 : 10, flex: 1 }}>
          {/* Search the learning pages (the course, rules, signs, right of way) by their words and, with «جستجو», by the
              AI; the results open on their own page (app/course-search.tsx). */}
          <SearchBox />
          {/* /app: prove.dk's 44 numbered tests in place of the app's own course (Mojtaba 2026-10-20). */}
          {PROVE_BANK ? (
            <Part n={1} icon="learn" title="آموزش درس‌به‌درس" href="/learn-lessons"
              note={tried ? `${faNum(tried)} از ${faNum(all)} درس انجام شده` : undefined} />
          ) : (
            <Part n={1} icon="learn" title="آموزش گام‌به‌گام" href="/course"
              note={finished ? `${faNum(finished)} از ${faNum(ready.length)} درس انجام شده` : undefined} />
          )}
          <Part n={2} icon="rules" title="قوانین" href="/rules" />
          <Part n={3} icon="sign" title="علائم رانندگی" href="/signs" />
          <Part n={4} icon="priority" title="آموزش حق تقدم" href="/priority" />
          <Part n={5} icon="translate" title="واژه‌نامه‌ی آزمون" href="/glossary" />
        </View>
      )}
    </Screen>
  );
}
