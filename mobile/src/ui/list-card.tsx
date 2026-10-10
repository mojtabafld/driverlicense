// A row in the teaching pages' lists («آموزش», «علائم رانندگی», «آموزش حق تقدم»): a quiet card with the item's
// picture on a small rounded tile at its right, its title, one line about it and a small note under it (a count, the
// progress), and a round ‹ at its left.
import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Icon } from './icon';
import { Card, T } from './kit';
import { useColors } from './theme';

export const LIST_PIC = { width: 80, height: 60, radius: 14 };

export function ListCard({ pic, title, sub, subLines = 1, note, label, onPress }: { pic: ReactNode; title: string; sub: string; subLines?: number; note?: string; label?: string; onPress: () => void }) {
  const c = useColors();
  return (
    <Card onPress={onPress} style={{ padding: 10 }}>
      <View accessibilityRole="button" accessibilityLabel={label ?? title} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <View style={{ width: LIST_PIC.width, height: LIST_PIC.height, borderRadius: LIST_PIC.radius, overflow: 'hidden' }}>{pic}</View>
        <View style={{ flex: 1, gap: 2 }}>
          <T style={{ fontSize: 15, lineHeight: 22, fontWeight: '600' }} numberOfLines={2}>{title}</T>
          <T style={{ fontSize: 12.5, lineHeight: 19, color: c.muted }} numberOfLines={subLines}>{sub}</T>
          {note ? <T style={{ fontSize: 11.5, lineHeight: 17, color: c.faint }} numberOfLines={1}>{note}</T> : null}
        </View>
        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: c.surface2, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="chevronLeft" size={14} color={c.muted} weight="semibold" />
        </View>
      </View>
    </Card>
  );
}
