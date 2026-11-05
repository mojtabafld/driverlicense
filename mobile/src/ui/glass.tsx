// A flat surface like the site's .card: white (or dark) background, 10px radius, thin border, no blur or shadow.
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';

import { SOFT, radius, useColors, useIsDark } from './theme';

// «نرم»: a card rests on a faint, wide shadow in the light theme (none in the dark one).
const SHADOW = Platform.OS === 'web' ? { boxShadow: '0 1px 2px rgba(16,16,24,0.04), 0 8px 28px rgba(16,16,24,0.05)' } as any
  : { shadowColor: '#101018', shadowOpacity: 0.06, shadowRadius: 18, shadowOffset: { width: 0, height: 6 }, elevation: 2 };

type Props = { style?: StyleProp<ViewStyle>; children?: React.ReactNode; tint?: string; interactive?: boolean; strong?: boolean; r?: number };
export function Glass({ style, children, tint, r = radius.md }: Props) {
  const c = useColors(), dark = useIsDark();
  return (
    <View style={[{ borderRadius: r, backgroundColor: tint ?? c.surface, borderWidth: 1, borderColor: tint ? 'transparent' : c.cardBorder }, SOFT && !dark && !tint ? SHADOW : null, style]}>
      {children}
    </View>
  );
}
