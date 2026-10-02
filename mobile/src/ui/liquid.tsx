// Liquid Glass surface in the site's colours: Apple's real glass (UIGlassEffect) on iOS 26+, and elsewhere a
// translucent, blurred surface with the same bright edge and soft shadow.
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';

import { useIsDark } from './theme';

const nativeGlass = Platform.OS === 'ios' && (() => { try { return isLiquidGlassAvailable(); } catch { return false; } })();

type Props = { style?: StyleProp<ViewStyle>; children?: React.ReactNode; r?: number; tint?: string; interactive?: boolean };
export function LiquidGlass({ style, children, r = 22, tint, interactive }: Props) {
  const dark = useIsDark();
  if (nativeGlass) {
    return (
      <GlassView style={[{ borderRadius: r, overflow: 'hidden' }, style]} glassEffectStyle="regular" isInteractive={interactive} tintColor={tint}>
        {children}
      </GlassView>
    );
  }
  const web = Platform.OS === 'web' ? ({
    backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    boxShadow: dark
      ? 'inset 0 1px 0 rgba(255,255,255,.14), inset 0 -1px 0 rgba(255,255,255,.04), 0 10px 28px -10px rgba(0,0,0,.6)'
      : 'inset 0 1px 0 rgba(255,255,255,.95), inset 0 -1px 0 rgba(255,255,255,.45), 0 10px 28px -12px rgba(16,40,60,.28)',
  } as any) : null;
  return (
    <View style={[
      { borderRadius: r, borderWidth: 1, backgroundColor: tint ?? (dark ? 'rgba(34,48,61,0.70)' : 'rgba(255,255,255,0.72)'),
        borderColor: dark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.85)' },
      web ?? { shadowColor: '#10283c', shadowOpacity: dark ? 0.5 : 0.14, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 2 },
      style,
    ]}>
      {children}
    </View>
  );
}
