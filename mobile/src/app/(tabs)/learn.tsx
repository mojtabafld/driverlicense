// «آموزش»: four parts as rows one under the other (the page scrolls under its picture header), each a quiet card
// (ui/list-card.tsx) with its picture on a small tile at its right (made by the server's image model; the part's icon
// until it is there), and to the left of it its title, a line on what is in it and its progress note; a row opens
// its part's page: the app's own course «آموزش گام‌به‌گام» (app/course.tsx), the rules, the road signs, and right of way.
// At /app (prove.dk's copy) the cards stay two by two and the first one is prove.dk's 44 lessons one by one
// (app/learn-lessons.tsx) instead of the app's own course.
import { Image } from 'expo-image';
import { router, type Href } from 'expo-router';
import { View, useWindowDimensions } from 'react-native';

import { API_URL, PROVE_PICS } from '@/lib/config';
import { COURSE } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { faNum } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { Icon, type IconName } from '@/ui/icon';
import { PageIcon } from '@/ui/page-icon';
import { Card, Screen, T } from '@/ui/kit';
import { ListCard } from '@/ui/list-card';
import { SearchBox } from '@/ui/search-box';
import { ARC, useColors } from '@/ui/theme';
import { LearnBookArt } from '@/ui/header-art';

function Part({ n, icon, title, text, note, href }: { n: number; icon: IconName; title: string; text: string; note?: string; href: Href }) {
  const c = useColors();
  const { learnArt, learnBg } = useApp();
  const v = learnArt[n];
  // Short phones: one line under the title and a lower picture, so all five cards fit above the tab bar.
  const short = useWindowDimensions().height < 760;
  // The picture, whole, on its tile in the picture's own background colour; the icon until the picture is made.
  const pic = (
    <View style={{ flex: 1, backgroundColor: (v && learnBg[n]) || c.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
      {v ? <Image source={{ uri: `${API_URL}/learn-art/${n}.png?v=${v}` }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: [{ scale: 1.15 }] }} contentFit="contain" transition={250} />
        : <Icon name={icon} size={26} color={c.link} weight="semibold" />}
    </View>
  );
  return <ListCard grow small={short} onPress={() => router.push(href)} pic={pic} title={title} sub={text} subLines={short ? 1 : 2} note={note} />;
}

// /app (prove.dk's copy) keeps its cards two by two, each with its picture on top.
function Tile({ n, icon, title, text, note, href }: { n: number; icon: IconName; title: string; text: string; note?: string; href: Href }) {
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
          <T style={{ flex: 1, fontWeight: '700', fontSize: 15.5, lineHeight: 23 }} numberOfLines={1}>{title}</T>
          <Icon name="chevronLeft" size={15} color={c.faint} weight="semibold" />
        </View>
        {/* The text takes the same height on every card (its lines and a line for the note, empty when there is
            none), so the four pictures are the same size. */}
        <T style={{ color: c.muted, fontSize: 12, lineHeight: 19, height: (short ? 2 : 3) * 19 }} numberOfLines={short ? 2 : 3}>{text}</T>
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
      heroAction={{ icon: 'search', label: 'جستجو در آموزش', onPress: () => router.push('/course-search') }}>
      {PROVE_PICS ? (
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Tile n={1} icon="learn" title="آموزش درس‌به‌درس" href="/learn-lessons"
              text="۴۴ درس رسمی، یکی‌یکی، یا تمرین بر اساس دسته‌بندی رسمی آزمون."
              note={tried ? `${faNum(tried)} از ${faNum(all)} درس انجام شده` : undefined} />
            <Tile n={2} icon="rules" title="قوانین" href="/rules"
              text="سرعت مجاز، الکل، کمربند، چراغ‌ها، سبقت، پارک، بزرگراه و قوانین مهم دیگر به زبان ساده." />
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Tile n={3} icon="sign" title="علائم رانندگی" href="/signs"
              text="تابلوهای هشدار، حق تقدم، ممنوعیت و الزامی، خط‌کشی‌ها و چراغ راهنمایی." />
            <Tile n={4} icon="priority" title="آموزش حق تقدم" href="/priority"
              text="چه کسی اول می‌رود؟ قاعده‌ی دست راست، تقاطع، گردش، میدان و عابران." />
          </View>
        </View>
      ) : (
        <View style={{ gap: short ? 8 : 10, flex: 1 }}>
          {/* Search the learning pages (the course, rules, signs, right of way) by their words and, with «جستجو», by the
              AI; the results open on their own page (app/course-search.tsx). */}
          <SearchBox />
          <Part n={1} icon="learn" title="آموزش گام‌به‌گام" href="/course"
            text="آمادگی آزمون تئوری، فصل به فصل، با سؤال‌هایی به شکل آزمون واقعی."
            note={finished ? `${faNum(finished)} از ${faNum(ready.length)} درس انجام شده` : undefined} />
          <Part n={2} icon="rules" title="قوانین" href="/rules"
            text="سرعت مجاز، الکل، کمربند، چراغ‌ها، سبقت، پارک، بزرگراه و قوانین مهم دیگر به زبان ساده." />
          <Part n={3} icon="sign" title="علائم رانندگی" href="/signs"
            text="تابلوهای هشدار، حق تقدم، ممنوعیت و الزامی، خط‌کشی‌ها و چراغ راهنمایی." />
          <Part n={4} icon="priority" title="آموزش حق تقدم" href="/priority"
            text="چه کسی اول می‌رود؟ قاعده‌ی دست راست، تقاطع، گردش، میدان و عابران." />
          <Part n={5} icon="translate" title="واژه‌نامه‌ی آزمون" href="/glossary"
            text="اصطلاح‌های دانمارکی آزمون تئوری با معنی فارسی، مثل vigepligt و højreregel." />
        </View>
      )}
    </Screen>
  );
}
