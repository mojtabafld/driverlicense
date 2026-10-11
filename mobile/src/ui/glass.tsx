// A flat surface like the site's .card: white (or dark) background, 10px radius, thin border, no blur or shadow.
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { radius, useColors } from './theme';

type Props = { style?: StyleProp<ViewStyle>; children?: React.ReactNode; tint?: string; interactive?: boolean; strong?: boolean; r?: number };
export function Glass({ style, children, tint, r = radius.md }: Props) {
  const c = useColors();
  return (
    <View style={[{ borderRadius: r, backgroundColor: tint ?? c.surface, borderWidth: 1, borderColor: tint ? 'transparent' : c.cardBorder }, style]}>
      {children}
    </View>
  );
}
