// The search box of the learning pages (the «آموزش» tab above «آموزش گام‌به‌گام», and the top of that course): a tap
// opens «جستجو در آموزش» (app/course-search.tsx), where the user types; the words are searched in the app's own
// material (no AI) and the results show on that page.
import { router } from 'expo-router';
import { Pressable } from 'react-native';

import { tr } from '@/lib/i18n';
import { Icon } from './icon';
import { T, tap } from './kit';
import { useColors } from './theme';
import { useSearchStyle } from './search-style';

export function SearchBox({ compact = false }: { compact?: boolean }) {
  const c = useColors(), searchStyle = useSearchStyle();
  return (
    <Pressable onPress={() => { tap(); router.push('/course-search'); }} accessibilityRole="search" accessibilityLabel={tr('جستجو در آموزش')}
      style={({ pressed }) => [searchStyle, { opacity: pressed ? 0.85 : 1 }]}>
      <Icon name="search" size={24} color={c.muted} />
      <T style={{ flex: 1, color: c.muted, fontSize: 16 }} numberOfLines={1}>{compact ? 'جستجو' : 'جستجو در درس‌ها، قوانین و تابلوها…'}</T>
    </Pressable>
  );
}
