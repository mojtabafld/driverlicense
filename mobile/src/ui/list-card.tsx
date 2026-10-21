// A row in the teaching pages' lists («آموزش», «علائم رانندگی», «آموزش حق تقدم»): a quiet card with the item's
// picture on a small rounded tile at its right, its title, one line about it and a small note under it (a count, the
// progress), and a round ‹ at its left.
import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Icon } from './icon';
import { Card, T } from './kit';
import { useColors } from './theme';

export const LIST_PIC = { width: 80, height: 60, radius: 14 };

// `locked`: only with premium (lib/free.ts): faded, with a lock in place of the ‹.
// `small`: a lower picture tile (short screens).
// `grow`: the card takes its share of the height its list is given (its content centred in it), never less than its own:
// its own height and an even part of the room left (flexGrow, not flex: 1, which let a taller card, «آموزش گام‌به‌گام»
// with its progress note, run over the gap under it; Mojtaba 2026-10-18).
// `keepDa`: the Danish words in `sub` stay Danish for users who take the exam in English (the glossary's card, whose
// examples are Danish words).
export function ListCard({ pic, title, sub, subLines = 1, note, label, onPress, locked, grow, small, keepDa }: { pic: ReactNode; title: string; sub?: string; subLines?: number; note?: string; label?: string; onPress: () => void; locked?: boolean; grow?: boolean; small?: boolean; keepDa?: boolean }) {
  const c = useColors();
  return (
    <Card onPress={onPress} style={grow ? { padding: 10, flexGrow: 1, flexShrink: 0, justifyContent: 'center' } : { padding: 10 }}>
      <View accessibilityRole="button" accessibilityLabel={label ?? title} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, opacity: locked ? 0.55 : 1 }}>
        <View style={{ width: small ? 64 : LIST_PIC.width, height: small ? 48 : LIST_PIC.height, borderRadius: small ? 12 : LIST_PIC.radius, overflow: 'hidden' }}>{pic}</View>
        <View style={{ flex: 1, gap: 2 }}>
          {/* Without a line under it the title is bigger (the learn tab's cards; Mojtaba 2026-10-21). */}
          <T style={sub ? { fontSize: 15, lineHeight: 22, fontWeight: '600' } : { fontSize: 17.5, lineHeight: 26, fontWeight: '700' }} numberOfLines={2}>{title}</T>
          {sub ? <T keepDa={keepDa} style={{ fontSize: 12.5, lineHeight: 19, color: c.muted }} numberOfLines={subLines}>{sub}</T> : null}
          {note ? <T style={{ fontSize: 11.5, lineHeight: 17, color: c.faint }} numberOfLines={1}>{note}</T> : null}
        </View>
        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: c.surface2, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={locked ? 'lock' : 'chevronLeft'} size={14} color={c.muted} weight="semibold" />
        </View>
      </View>
    </Card>
  );
}
