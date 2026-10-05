// A statement of a question as an outlined box (like a delivery app's order row): the square check box on the left,
// then the text; the page's own background shows through. `on`: ticked (the edge and the check in the pick colour);
// `mark`: shown wrong in a review (red edge, a soft red tint).
import { View } from 'react-native';

import { Icon } from './icon';
import { useColors } from './theme';

export function OptionBox({ on, mark, children }: { on: boolean; mark?: boolean; children: React.ReactNode }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row', direction: 'ltr', alignItems: 'flex-start', gap: 12, paddingVertical: 16, paddingHorizontal: 16, borderRadius: 18,
      borderWidth: 2, borderColor: mark ? c.bad : on ? c.pick : c.nav, backgroundColor: mark ? c.badSoft : 'transparent' } as any}>
      <View style={{ width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start', marginTop: 1,
        borderColor: on ? c.pick : c.muted, backgroundColor: on ? c.pick : 'transparent' }}>
        {on ? <Icon name="check" size={13} color={c.surface} weight="bold" /> : null}
      </View>
      <View style={{ flex: 1, gap: 4 }}>{children}</View>
    </View>
  );
}
