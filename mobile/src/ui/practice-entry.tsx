// The quick practice's card at the top of the road signs' and right of way's pages (app/signs.tsx, app/priority.tsx): its
// round icon, its name, a line on how far the user is, and «شروع»; a tap opens the practice.
import { router, type Href } from 'expo-router';
import { Pressable, View } from 'react-native';

import { tr } from '@/lib/i18n';
import { Icon } from './icon';
import { Card, T, tap } from './kit';
import { useColors, useM3 } from './theme';

export function PracticeEntry({ title, line, href, progress }: { title: string; line: string; href: Href; progress?: number }) {
  const c = useColors(), m = useM3();
  return (
    <Pressable onPress={() => { tap(); router.push(href); }} accessibilityRole="button" accessibilityLabel={tr(title)} testID="guide-practice">
      {({ pressed }) => (
        <Card style={{ gap: 16, opacity: pressed ? 0.85 : 1, padding: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: c.surface2, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="shuffle" size={26} color={m.primary} />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <T style={{ fontWeight: '500', fontSize: 18, lineHeight: 26 }}>{title}</T>
              <T style={{ color: c.muted, fontSize: 13, lineHeight: 20 }}>{line}</T>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <View style={{ flex: 1 }}>
              {progress != null ? <View style={{ height: 6, borderRadius: 3, backgroundColor: c.surface2, overflow: 'hidden', flexDirection: 'row' }}
                accessibilityRole="progressbar" accessibilityLabel={tr(title)} accessibilityValue={{ min: 0, max: 100, now: Math.round(Math.max(0, Math.min(1, progress)) * 100) }}>
                <View style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%`, backgroundColor: m.primary, borderRadius: 3 }} />
              </View> : null}
            </View>
            <View style={{ paddingHorizontal: 20, minHeight: 44, borderRadius: 999, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: m.primary }}>
              <Icon name="play" size={18} color={m.onPrimary} />
              <T style={{ fontWeight: '500', fontSize: 14, color: m.onPrimary }}>شروع</T>
            </View>
          </View>
        </Card>
      )}
    </Pressable>
  );
}
