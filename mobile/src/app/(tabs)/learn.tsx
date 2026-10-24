// «آموزش»: five parts as cards one under the other, each with its picture (made by the server's image model; the part's
// icon until it is there) filling the card from its start and melting into the card's colour under its title, a
// short line on what is in it and its progress note; a card opens its part's page: the app's own course «آموزش گام‌به‌گام» (app/course.tsx), the rules,
// the road signs, right of way and the test's glossary.
// At /app (prove.dk's copy) the cards stay two by two and the first one is prove.dk's 44 lessons one by one
// (app/learn-lessons.tsx) instead of the app's own course.
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, type Href } from 'expo-router';
import { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { API_URL, PROVE_BANK, PROVE_PICS } from '@/lib/config';
import { RTL } from '@/lib/i18n';
import { COURSE } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { faNum } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { CoachButton } from '@/ui/coach-card';
import { Icon, type IconName } from '@/ui/icon';
import { PageIcon } from '@/ui/page-icon';
import { Card, Screen, T, physical } from '@/ui/kit';
import { SearchBox } from '@/ui/search-box';
import { ARC, useColors, useIsDark } from '@/ui/theme';
import { LearnBookArt } from '@/ui/header-art';

// The fade from the picture into the card's own colour: its steps slow at both ends (smoothstep, as ui/tall-picture.tsx),
// from clear over the picture to the full colour under the title.
const FADE = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] as const;
const FADE_AT = FADE.map(t => 0.22 + 0.2 * t) as unknown as readonly [number, number, ...number[]];
// The dark theme (Mojtaba 2026-10-22): the picture's deep colour against the near-black card made a hard band, so
// there the fade is twice as long, starts a little sooner and its colour runs on under it (the picture's room is wider).
const FADE_AT_DARK = FADE.map(t => 0.18 + 0.4 * t) as unknown as readonly [number, number, ...number[]];
const FADE_A = FADE.map(t => Math.round(255 * t * t * (3 - 2 * t)).toString(16).padStart(2, '0'));

// A card of the five (Mojtaba 2026-10-21/22): its picture fills the card from its start (the right in Persian, the left
// in English and Danish), drawn whole at the card's height, and melts into the card's colour
// (light or dark) under the title and its short line, with the round ‹ at the card's end.
function Part({ n, icon, title, text, note, href }: { n: number; icon: IconName; title: string; text: string; note?: string; href: Href }) {
  const c = useColors();
  const { learnArt, learnBg } = useApp();
  // The dark theme draws the card's own dark picture (6–10: the same drawing on a dark tint of its colour; Mojtaba
  // 2026-10-22) once the server has made it, with the light theme's fade; until then the light one.
  const dark = useIsDark(), pn = dark && learnArt[n + 5] ? n + 5 : n, v = learnArt[pn];
  // The card's height (its picture's room is as high), so the picture is drawn whole at that height.
  const [boxH, setBoxH] = useState(0);
  // Short phones: lower cards; very short ones (iPhone SE first generation) without the short line, so all five fit
  // above the tab bar (Mojtaba 2026-10-22). The height left by the status bar and the home indicator counts (an
  // iPhone's 844 points are about 760 there).
  const ins = useSafeAreaInsets(), h = useWindowDimensions().height - ins.top - ins.bottom, short = h < 780, tiny = h < 640;
  const fades = FADE_A.map(a => `${c.surface}${a}`) as unknown as readonly [string, string, ...string[]];
  // The picture's room before the words; the gradient runs from the picture to them.
  const room = <View style={{ width: '30%' }} />, from = { x: RTL ? 1 : 0, y: 0.5 }, to = { x: RTL ? 0 : 1, y: 0.5 };
  // The round ‹ at the card's end, beside the words, not on the picture (Mojtaba 2026-10-22).
  const arrow = (
    <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: c.surface2, alignItems: 'center', justifyContent: 'center' }}>
      <Icon name="chevronLeft" size={14} color={c.muted} weight="semibold" />
    </View>
  );
  return (
    <Card onPress={() => router.push(href)} style={{ flexGrow: 1, flexShrink: 0, padding: 0, overflow: 'hidden', minHeight: tiny ? 52 : short ? 62 : 92 }}>
      <View style={[{ position: 'absolute', top: 0, bottom: 0, width: dark ? '60%' : '42%', backgroundColor: (v && learnBg[pn]) || c.accentSoft, alignItems: 'center', justifyContent: 'center' }, physical(RTL ? { right: 0 } : { left: 0 })]}
        onLayout={e => setBoxH(Math.round(e.nativeEvent.layout.height))}>
        {/* Whole, as high as the card (never cropped top or bottom: smaller on a short card, Mojtaba 2026-10-22), pushed a
            little past the card's edge so the picture's plain margin on that side is cut away; the rest of the room in
            the picture's own background colour. */}
        {v && boxH ? <Image source={{ uri: `${API_URL}/learn-art/${pn}.png?v=${v}` }} style={[{ position: 'absolute', top: 0, height: boxH, width: boxH * 1.5 }, physical(RTL ? { right: -0.15 * boxH * 1.5 } : { left: -0.15 * boxH * 1.5 })]} contentFit="contain" transition={250} />
          : v ? null : <Icon name={icon} size={26} color={c.link} weight="semibold" />}
      </View>
      <LinearGradient pointerEvents="none" colors={fades} locations={dark ? FADE_AT_DARK : FADE_AT} start={from} end={to} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
      <View accessibilityRole="button" accessibilityLabel={title} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: short ? 7 : 12, paddingHorizontal: 12 }}>
        {room}
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
  const { learnArt, learnBg } = useApp();
  const short = useWindowDimensions().height < 700; // less text on short screens
  // The dark theme's own pictures (6–10) here too (Mojtaba 2026-10-22), as on the main site's cards.
  const pn = useIsDark() && learnArt[n + 5] ? n + 5 : n, v = learnArt[pn];
  return (
    <Card onPress={() => router.push(href)} style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
      {/* The picture, whole (never cropped), in the card's top, the rest of
          it in the picture's own background colour; the icon on a soft tile until the picture is made. */}
      <View style={{ height: short ? 96 : 120, backgroundColor: (v && learnBg[pn]) || c.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
        {v ? <Image source={{ uri: `${API_URL}/learn-art/${pn}.png?v=${v}` }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} contentFit="contain" transition={250} />
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
  const ins = useSafeAreaInsets(), short = useWindowDimensions().height - ins.top - ins.bottom < 780;
  const tried = new Set(attempts.filter(a => a.mode === 'lesson').map(a => a.lesson)).size, all = bank?.tests.length ?? 44;
  return (
    // Main site: the five cards share the screen's height between the search box and the tab bar (taller on tall
    // phones, never shorter than their content; Mojtaba 2026-10-18).
    <Screen fill={!PROVE_PICS} gap={short ? 10 : 14} barGap={PROVE_PICS ? undefined : 16} lead={<PageIcon name="learn" />} title="آموزش" subtitle="درس‌ها، تابلوها و قوانین راه" hero={{ pic: 1, icon: 'learn', art: ARC ? LearnBookArt : undefined }}
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
      )}
    </Screen>
  );
}
