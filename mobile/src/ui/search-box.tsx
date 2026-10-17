// The search box of the learning pages (the «آموزش» tab above «آموزش گام‌به‌گام», and the top of that course): a tap
// opens «جستجو در آموزش» (app/course-search.tsx), where the user types; the words are searched in the app's own
// material at once and, with «جستجو», by the AI too (/api/coursesearch, search.js), and the results show on that page.
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { tr } from '@/lib/i18n';
import { Icon } from './icon';
import { T, tap } from './kit';
import { useColors } from './theme';

export function SearchBox() {
  const c = useColors();
  return (
    <Pressable onPress={() => { tap(); router.push('/course-search'); }} accessibilityRole="search" accessibilityLabel={tr('جستجو در آموزش')}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 10, height: 52, paddingStart: 16, paddingEnd: 8, borderRadius: 16,
        backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, opacity: pressed ? 0.85 : 1 })}>
      <Icon name="search" size={19} color={c.faint} />
      <T style={{ flex: 1, color: c.muted, fontSize: 14.5 }} numberOfLines={1}>هر چه می‌خواهید یاد بگیرید، بپرسید…</T>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, height: 34, paddingHorizontal: 10, borderRadius: 11, backgroundColor: c.accentSoft }}>
        <Icon name="sparkles" size={14} color={c.link} />
        <T style={{ fontSize: 12, fontWeight: '700', color: c.link }}>هوشمند</T>
      </View>
    </Pressable>
  );
}
