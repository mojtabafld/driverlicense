import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { tr } from '@/lib/i18n';
import { Icon, type IconName } from './icon';
import { T, tap } from './kit';
import { useColors, useM3 } from './theme';

// Shared by Learn's guides and their category pages, so the outline, icon and typography stay identical.
export function LearningTile({ icon, title, text, onPress, label, locked, children, testID }: {
  icon: IconName; title: string; text: string; onPress: () => void; label?: string; locked?: boolean; children?: ReactNode; testID?: string;
}) {
  const c = useColors(), m = useM3();
  return (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="button" accessibilityLabel={tr(label ?? title)} testID={testID}
      style={({ pressed }) => ({ flexBasis: '47%', flexGrow: 1, minHeight: 150, borderRadius: 24, borderWidth: 1, borderColor: c.line, padding: 16, gap: 10,
        justifyContent: 'flex-end', backgroundColor: pressed ? c.surface2 : 'transparent' })}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Icon name={icon} size={44} color={m.primary} />
        {locked ? <Icon name="lock" size={18} color={c.muted} /> : null}
      </View>
      <View style={{ gap: 2 }}>
        <T numberOfLines={2} style={{ fontSize: 16, lineHeight: 23, fontWeight: '500' }}>{title}</T>
        <T numberOfLines={2} style={{ fontSize: 13, lineHeight: 19, color: c.muted }}>{text}</T>
      </View>
      {children}
    </Pressable>
  );
}
