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
import { UI_LANG } from '@/lib/i18n';
import STRINGS from '@/lib/i18n/strings.json';
import { useApp, useExamLang } from '@/lib/store';
import { Icon } from './icon';
import { ArcButton, T } from './kit';
import { Sheet, SheetScroll } from './sheet';
import { DA_FONT, useColors } from './theme';

export function TopicSheet({ q, open, onClose }: { q: Question; open: boolean; onClose: () => void }) {
  const c = useColors();
  const { bank, Q } = useApp();
  const exam = useExamLang();
  const t = bank?.topics[q.c];
  if (!bank || !t) return null;
  const name = topicName(bank, q.c), section = sectionFa(bank, q.c);
  const second = UI_LANG === exam ? null : exam === 'en' ? (STRINGS as Record<string, string[]>)[name]?.[0] ?? null : t.da;
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
        {/* The topic's name, then after a dash its name in the exam's language: the official Danish one, or the English
            one with an English exam; none when the app is in that language already (Mojtaba 2026-10-20). */}
        <T style={{ fontSize: 19, lineHeight: 28, fontWeight: '700' }}>{name}{second ? <T raw style={{ fontSize: 14, fontWeight: '500', color: c.muted, fontFamily: DA_FONT }}>{` - ${second}`}</T> : null}</T>
      </View>
      {/* Close under the name (the sheet keeps 14 between its parts): 10 points in all (Mojtaba 2026-10-20). */}
      <SheetScroll style={{ marginTop: -8 }} contentContainerStyle={{ gap: 10, paddingTop: 4, paddingBottom: 12, paddingHorizontal: 4 }}>
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
