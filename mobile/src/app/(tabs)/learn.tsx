// «آموزش»: four parts as cards, each with its icon and a line on what is in it; a card opens its part's page:
// the lessons one by one (and practice by category), the rules, the road signs, and right of way.
import { router, type Href } from 'expo-router';
import { View } from 'react-native';

import { faNum } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { Icon, type IconName } from '@/ui/icon';
import { Card, Screen, T } from '@/ui/kit';
import { useColors } from '@/ui/theme';

function Part({ icon, title, text, note, href }: { icon: IconName; title: string; text: string; note?: string; href: Href }) {
  const c = useColors();
  return (
    <Card onPress={() => router.push(href)} style={{ width: '47.5%', flexGrow: 1, gap: 10, padding: 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <View style={{ width: 46, height: 46, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accentSoft }}>
          <Icon name={icon} size={24} color={c.link} weight="semibold" />
        </View>
        <Icon name="chevronLeft" size={16} color={c.faint} weight="semibold" />
      </View>
      <T style={{ fontWeight: '700', fontSize: 16, lineHeight: 24 }}>{title}</T>
      <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20, flexGrow: 1 }}>{text}</T>
      {note ? <T style={{ color: c.text, fontSize: 12, lineHeight: 18, fontWeight: '600' }}>{note}</T> : null}
    </Card>
  );
}

export default function Learn() {
  const { bank, attempts } = useApp();
  const done = new Set(attempts.filter(a => a.mode === 'lesson').map(a => a.lesson)).size, all = bank?.tests.length ?? 44;
  return (
    <Screen title="آموزش" subtitle="یک بخش را انتخاب کنید">
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        <Part icon="learn" title="آموزش درس‌به‌درس" href="/learn-lessons"
          text={`${faNum(all)} درس به ترتیب، هر کدام با سؤال‌های خودش؛ یا تمرین بر اساس دسته‌بندی رسمی.`}
          note={done ? `${faNum(done)} از ${faNum(all)} درس انجام شده` : undefined} />
        <Part icon="rules" title="قوانین" href="/rules"
          text="سرعت مجاز، الکل، کمربند، چراغ‌ها، سبقت، پارک، بزرگراه و قوانین مهم دیگر به زبان ساده." />
        <Part icon="sign" title="علائم رانندگی" href="/signs"
          text="تابلوهای هشدار، حق تقدم، ممنوعیت و الزامی، خط‌کشی‌ها و چراغ راهنمایی." />
        <Part icon="priority" title="آموزش حق تقدم" href="/priority"
          text="چه کسی اول می‌رود؟ قاعده‌ی دست راست، تقاطع، گردش، میدان و عابران." />
      </View>
    </Screen>
  );
}
