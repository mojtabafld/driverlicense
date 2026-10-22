// The quick practice's card at the top of the road signs' and right of way's pages (app/signs.tsx, app/priority.tsx): its
// round icon, its name, a line on how far the user is, and «شروع»; a tap opens the practice.
import { router, type Href } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Icon } from './icon';
import { Card, T, tap } from './kit';
import { useColors } from './theme';

// `tight`: less padding (short screens, where the page's first cards share the screen).
export function PracticeEntry({ title, line, href, tight }: { title: string; line: string; href: Href; tight?: boolean }) {
  const c = useColors();
  return (
    <Pressable onPress={() => { tap(); router.push(href); }} accessibilityRole="button">
      {({ pressed }) => (
        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 12, opacity: pressed ? 0.85 : 1, padding: tight ? 10 : 16 }}>
          <View style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: c.btn, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="shuffle" size={20} color={c.btnFg} />
          </View>
          <View style={{ flex: 1, gap: 1 }}>
            <T style={{ fontWeight: '700', fontSize: 15.5 }}>{title}</T>
            <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{line}</T>
          </View>
          <View style={{ paddingHorizontal: 14, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: c.btn }}>
            <T style={{ fontWeight: '700', fontSize: 13.5, color: c.btnFg }}>شروع</T>
          </View>
        </Card>
      )}
    </Pressable>
  );
}
