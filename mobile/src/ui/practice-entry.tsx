// The quick practice's card at the top of the road signs' and right of way's pages (app/signs.tsx, app/priority.tsx): its
// round icon, its name, a line on how far the user is, and «شروع»; a tap opens the practice.
import { router, type Href } from 'expo-router';
import { Pressable, View } from 'react-native';

import { tr } from '@/lib/i18n';
import { Icon } from './icon';
import { T, tap } from './kit';
import { useColors, useM3 } from './theme';

export function PracticeEntry({ title, line, href, progress }: { title: string; line: string; href: Href; progress?: number }) {
  const c = useColors(), m = useM3();
  return (
    <Pressable onPress={() => { tap(); router.push(href); }} accessibilityRole="button" accessibilityLabel={tr(title)} testID="guide-practice">
      {({ pressed }) => (
        <View style={{ gap: 16, padding: 16, borderRadius: 24, borderWidth: 1, borderColor: c.line, backgroundColor: pressed ? c.surface2 : 'transparent' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Icon name="shuffle" size={44} color={m.primary} />
            <View style={{ flex: 1, gap: 4 }}>
              <T style={{ fontWeight: '500', fontSize: 16, lineHeight: 23 }}>{title}</T>
              <T style={{ color: c.muted, fontSize: 13, lineHeight: 19 }}>{line}</T>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <View style={{ flex: 1 }}>
              {progress != null ? <View style={{ height: 6, borderRadius: 3, backgroundColor: c.surface2, overflow: 'hidden', flexDirection: 'row' }}
                accessibilityRole="progressbar" accessibilityLabel={tr(title)} accessibilityValue={{ min: 0, max: 100, now: Math.round(Math.max(0, Math.min(1, progress)) * 100) }}>
                <View style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%`, backgroundColor: m.primary, borderRadius: 3 }} />
              </View> : null}
            </View>
            <View style={{ paddingHorizontal: 20, minHeight: 44, borderRadius: 999, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', borderWidth: 1, borderColor: m.primary }}>
              <Icon name="play" size={18} color={m.primary} />
              <T style={{ fontWeight: '500', fontSize: 14, color: m.primary }}>شروع</T>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}
