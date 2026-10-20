// A reviewed question's topic, from its category chip under the picture (ui/review.tsx; Mojtaba 2026-10-20): a sheet
// from the bottom with the topic's short lesson (its official section and name, the lesson's points), a practice test
// of the topic's questions and a search of the learning pages for it. It closes with a drag down (or a tap outside,
// the back button), as the app's other sheets.
import { router } from 'expo-router';
import { View } from 'react-native';

import type { Question } from '@/lib/bank';
import { FULL, shuffle } from '@/lib/logic';
import { sectionFa, sectionIcon, topicName } from '@/lib/names';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Icon } from './icon';
import { ArcButton, T } from './kit';
import { Sheet, SheetScroll } from './sheet';
import { DA_FONT, useColors } from './theme';

export function TopicSheet({ q, open, onClose }: { q: Question; open: boolean; onClose: () => void }) {
  const c = useColors();
  const { bank, Q } = useApp();
  const t = bank?.topics[q.c];
  if (!bank || !t) return null;
  const name = topicName(bank, q.c), section = sectionFa(bank, q.c);
  // At most a real test's 25 of the topic's questions, in random order (from the bank in use).
  const practice = () => {
    const ids = shuffle([...Q.values()].filter(x => x.c === q.c).map(x => x.id)).slice(0, FULL);
    onClose();
    session.plan = { mode: 'sections', ids, title: name };
    router.push('/run');
  };
  const search = () => { onClose(); router.push({ pathname: '/course-search', params: { q: name } }); };
  return (
    <Sheet open={open} onClose={onClose} maxHeight="82%">
      <View style={{ gap: 4, paddingHorizontal: 4 }}>
        {section ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Icon name={sectionIcon(q.c)} size={14} color={c.link} />
            <T style={{ fontSize: 12.5, fontWeight: '600', color: c.link }} numberOfLines={1}>{section}</T>
          </View>
        ) : null}
        <T style={{ fontSize: 19, lineHeight: 28, fontWeight: '700' }}>{name}</T>
        <T raw style={{ fontSize: 12.5, color: c.muted, fontFamily: DA_FONT, writingDirection: 'ltr' }}>{t.da}</T>
      </View>
      <SheetScroll contentContainerStyle={{ gap: 10, paddingVertical: 12, paddingHorizontal: 4 }}>
        <T style={{ fontSize: 14, fontWeight: '700', color: c.muted }}>آموزش این مبحث</T>
        {t.lesson.map((l, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 10, padding: 12, borderRadius: 12, backgroundColor: c.surface2 }}>
            <Icon name="checkCircle" size={16} color={c.link} />
            <T style={{ flex: 1, fontSize: 14.5, lineHeight: 24 }}>{l}</T>
          </View>
        ))}
      </SheetScroll>
      <View style={{ gap: 8, paddingTop: 4 }}>
        <ArcButton label="تمرین این مبحث" icon="play" variant="accent" onPress={practice} />
        <ArcButton label="جستجو در آموزش" icon="search" variant="secondary" onPress={search} />
      </View>
    </Sheet>
  );
}
