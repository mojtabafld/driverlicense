// «آموزش»: four parts as cards, two by two (the page scrolls under its picture header), each with its picture (made by the server's image
// model; the part's icon on a soft tile until it is there), its title and a line on what is in it; a card opens its
// part's page: the lessons one by one (and practice by category), the rules, the road signs, and right of way.
// Beside the theme switch, «جستجو با هوش مصنوعی» (ui/search-ai.tsx); above the parts, «آموزش گام‌به‌گام» (app/course.tsx).
import { Image } from 'expo-image';
import { router, type Href } from 'expo-router';
import { View, useWindowDimensions } from 'react-native';

import { API_URL } from '@/lib/config';
import { faNum } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { Icon, type IconName } from '@/ui/icon';
import { Card, Screen, T } from '@/ui/kit';
import { SearchAiButton } from '@/ui/search-ai';
import { useColors } from '@/ui/theme';
import { useTour, type TourStep } from '@/ui/tour';

function Part({ n, icon, title, text, note, href, target }: { n: number; icon: IconName; title: string; text: string; note?: string; href: Href; target: object }) {
  const c = useColors();
  const { learnArt, learnBg } = useApp();
  const short = useWindowDimensions().height < 700; // less text on short screens
  const v = learnArt[n];
  return (
    <View {...target} style={{ flex: 1 }}>
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
    </View>
  );
}

// «آموزش گام‌به‌گام» (the app's own course, app/course.tsx): a slim card above the four parts, marked new.
// Hidden for now (SHOW_COURSE); the course itself stays at /course.
const SHOW_COURSE = false;
function CourseCard() {
  const c = useColors();
  return (
    <Card onPress={() => router.push('/course')} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 14 }}>
      <View style={{ width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accentSoft }}>
        <Icon name="play" size={20} color={c.link} weight="semibold" />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <T style={{ fontWeight: '700', fontSize: 15.5 }}>آموزش گام‌به‌گام</T>
          <View style={{ backgroundColor: c.ok, borderRadius: 99, paddingHorizontal: 7, paddingVertical: 1 }}><T style={{ color: '#fff', fontSize: 10.5, fontWeight: '700' }}>جدید</T></View>
        </View>
        <T style={{ color: c.muted, fontSize: 12, lineHeight: 18 }} numberOfLines={1}>آمادگی آزمون تئوری، فصل به فصل، با سؤال‌های شبیه آزمون</T>
      </View>
      <Icon name="chevronLeft" size={15} color={c.faint} weight="semibold" />
    </Card>
  );
}

const TOUR: TourStep[] = [
  { title: 'آموزش درس‌به‌درس', text: 'درس‌های رسمی آزمون تئوری به ترتیب، هر درس با سؤال‌های خودش. می‌توانید بر اساس دسته‌بندی رسمی هم تمرین کنید و تعداد سؤال‌ها را خودتان انتخاب کنید.' },
  { title: 'قوانین', text: 'مهم‌ترین قوانین رانندگی در دانمارک به زبان ساده: سرعت مجاز، الکل، کمربند، چراغ‌ها، سبقت، پارک و بزرگراه. هر بخش یک تمرین با سؤال‌های همان مبحث دارد.' },
  { title: 'علائم رانندگی', text: 'گروه‌های تابلوها با شکل و رنگشان، خط‌کشی‌ها و چراغ راهنمایی. با دانستن شکل و رنگ هر گروه، معنای تابلوهای ناآشنا را هم حدس می‌زنید.' },
  { title: 'آموزش حق تقدم', text: 'چه کسی اول می‌رود؟ قاعده‌ی دست راست، حق تقدم مطلق، گردش به چپ و راست، میدان و عابران؛ از پرتکرارترین موضوع‌های آزمون.' },
];

export default function Learn() {
  const { bank, attempts } = useApp();
  const done = new Set(attempts.filter(a => a.mode === 'lesson').map(a => a.lesson)).size, all = bank?.tests.length ?? 44;
  const tour = useTour('learn', TOUR);
  return (
    <>
    <Screen title="آموزش" subtitle="درس‌ها، تابلوها و قوانین راه" right={<SearchAiButton />}
      hero={{ pic: 1, icon: 'learn' }}>
      <View style={{ gap: 12 }}>
        {SHOW_COURSE ? <CourseCard /> : null}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Part n={1} target={tour.target(0)} icon="learn" title="آموزش درس‌به‌درس" href="/learn-lessons"
            text={`${faNum(all)} درس به ترتیب، هر کدام با سؤال‌های خودش؛ یا تمرین بر اساس دسته‌بندی رسمی.`}
            note={done ? `${faNum(done)} از ${faNum(all)} درس انجام شده` : undefined} />
          <Part n={2} target={tour.target(1)} icon="rules" title="قوانین" href="/rules"
            text="سرعت مجاز، الکل، کمربند، چراغ‌ها، سبقت، پارک، بزرگراه و قوانین مهم دیگر به زبان ساده." />
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Part n={3} target={tour.target(2)} icon="sign" title="علائم رانندگی" href="/signs"
            text="تابلوهای هشدار، حق تقدم، ممنوعیت و الزامی، خط‌کشی‌ها و چراغ راهنمایی." />
          <Part n={4} target={tour.target(3)} icon="priority" title="آموزش حق تقدم" href="/priority"
            text="چه کسی اول می‌رود؟ قاعده‌ی دست راست، تقاطع، گردش، میدان و عابران." />
        </View>
      </View>
    </Screen>
    {tour.overlay}
    </>
  );
}
