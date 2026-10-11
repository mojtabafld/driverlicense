// A card's surface. Rose (theme.ts): frosted glass, a translucent white (or, dark, a faint light) on a bright edge with a
// soft warm shadow, blurring what lies under it where the platform can (the web's backdrop blur). The other looks: a flat
// surface like the site's .card, white (or dark), thin border, no blur or shadow.
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';

import { ROSE, radius, useColors, useIsDark } from './theme';

type Props = { style?: StyleProp<ViewStyle>; children?: React.ReactNode; tint?: string; interactive?: boolean; strong?: boolean; r?: number };
export function Glass({ style, children, tint, r = radius.md }: Props) {
  const c = useColors(), dark = useIsDark();
  if (ROSE) {
    return (
      <View style={[{ borderRadius: r, backgroundColor: tint ?? c.glassFill, borderWidth: 1, borderColor: tint ? 'transparent' : c.cardBorder }, glassDepth(dark), style]}>
        {children}
      </View>
    );
  }
  return (
    <View style={[{ borderRadius: r, backgroundColor: tint ?? c.surface, borderWidth: 1, borderColor: tint ? 'transparent' : c.cardBorder }, style]}>
      {children}
    </View>
  );
}

// The glass's blur, top highlight and shadow (rose).
export function glassDepth(dark: boolean): ViewStyle {
  if (Platform.OS === 'web') {
    return {
      backdropFilter: 'blur(22px) saturate(150%)', WebkitBackdropFilter: 'blur(22px) saturate(150%)',
      boxShadow: dark ? 'inset 0 1px 0 rgba(255,255,255,0.06), 0 12px 32px -18px rgba(0,0,0,0.8)'
        : 'inset 0 1px 0 rgba(255,255,255,0.9), 0 14px 34px -20px rgba(110,40,48,0.32), 0 1px 3px rgba(110,40,48,0.05)',
    } as any;
  }
  return { shadowColor: dark ? '#000' : '#6e2830', shadowOpacity: dark ? 0.3 : 0.1, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: dark ? 0 : 1 };
}
