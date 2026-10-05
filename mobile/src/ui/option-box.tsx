// A statement of a question as an outlined box (like a delivery app's order row): the text on the left, a round check
// at the right end; the page's own background shows through. `on`: ticked (the edge and the check in the pick colour);
// `mark`: shown wrong in a review (red edge, a soft red tint).
import { View } from 'react-native';

import { Icon } from './icon';
import { useColors } from './theme';

export function OptionBox({ on, mark, children }: { on: boolean; mark?: boolean; children: React.ReactNode }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row', direction: 'ltr', alignItems: 'center', gap: 12, paddingVertical: 16, paddingHorizontal: 16, borderRadius: 18,
      borderWidth: 2, borderColor: mark ? c.bad : on ? c.pick : c.nav, backgroundColor: mark ? c.badSoft : 'transparent' } as any}>
      <View style={{ flex: 1, gap: 4 }}>{children}</View>
      <View style={{ width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', borderWidth: 2,
        borderColor: on ? c.pick : c.faint, backgroundColor: on ? c.pick : 'transparent' }}>
        {on ? <Icon name="check" size={14} color={c.bg} weight="bold" /> : null}
      </View>
    </View>
  );
}
