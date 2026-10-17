// The search box of the learning pages (the «آموزش» tab above «آموزش گام‌به‌گام», and the top of that course): a tap
// opens «جستجو در آموزش» (app/course-search.tsx), where the user types; the words are searched in the app's own
// material (no AI) and the results show on that page.
import { router } from 'expo-router';
import { Pressable } from 'react-native';

import { tr } from '@/lib/i18n';
import { Icon } from './icon';
import { T, tap } from './kit';
import { useColors } from './theme';

export function SearchBox() {
  const c = useColors();
  return (
    <Pressable onPress={() => { tap(); router.push('/course-search'); }} accessibilityRole="search" accessibilityLabel={tr('جستجو در آموزش')}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 10, height: 52, paddingHorizontal: 16, borderRadius: 16,
        backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, opacity: pressed ? 0.85 : 1 })}>
      <Icon name="search" size={19} color={c.faint} />
      <T style={{ flex: 1, color: c.muted, fontSize: 14.5 }} numberOfLines={1}>جستجو در درس‌ها، قوانین و تابلوها…</T>
    </Pressable>
  );
}
