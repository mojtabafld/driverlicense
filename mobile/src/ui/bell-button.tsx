// The bell beside the profile picture on the home page (Mojtaba 2026-10-29; it was the chart button): the news for
// every user (lib/news.ts), a bare icon in the theme's colour like the other header buttons, with a red dot while there
// is news the device has not seen.
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { tr } from '@/lib/i18n';
import { useNews } from '@/lib/news';
import { Icon } from './icon';
import { tap } from './kit';
import { useColors } from './theme';

export function BellButton({ size = 44 }: { size?: number }) {
  const c = useColors(), { unread } = useNews();
  return (
    <Pressable onPress={() => { tap(); router.push('/news'); }} hitSlop={6} accessibilityRole="button" accessibilityLabel={tr(unread ? 'پیام‌ها، پیام تازه' : 'پیام‌ها')}
      style={({ pressed }) => ({ width: size, height: size, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.6 : 1, transform: [{ scale: pressed ? 0.94 : 1 }] })}>
      <Icon name="bell" size={Math.round(size * 0.52)} color={c.link} />
      {unread ? <View style={{ position: 'absolute', top: size * 0.2, right: size * 0.22, width: 10, height: 10, borderRadius: 5, backgroundColor: c.bad, borderWidth: 2, borderColor: c.bg }} /> : null}
    </Pressable>
  );
}
