// «همه»: a small round button with an arrow in the theme's colours, in a card's head (the exam tab's history and mistakes
// cards); it opens the page with all of that card's items. The arrow points forward (left in Persian; icon.tsx mirrors it
// for English and Danish).
import { Pressable } from 'react-native';

import { Icon } from './icon';
import { tap } from './kit';
import { useColors } from './theme';

export function MoreButton({ onPress, label }: { onPress: () => void; label: string }) {
  const c = useColors();
  return (
    <Pressable onPress={() => { tap(); onPress(); }} hitSlop={6} accessibilityRole="button" accessibilityLabel={label}
      style={({ pressed }) => ({ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
        backgroundColor: c.accentSoft, opacity: pressed ? 0.7 : 1 })}>
      <Icon name="arrowLeft" size={18} color={c.link} weight="semibold" />
    </Pressable>
  );
}
