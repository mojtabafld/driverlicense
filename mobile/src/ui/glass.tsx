// A Liquid Glass surface: Apple's real glass (UIGlassEffect) on iOS 26+, and a frosted, translucent card elsewhere.
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { radius, useColors } from './theme';

const nativeGlass = Platform.OS === 'ios' && (() => { try { return isLiquidGlassAvailable(); } catch { return false; } })();

type Props = { style?: StyleProp<ViewStyle>; children?: React.ReactNode; tint?: string; interactive?: boolean; strong?: boolean; r?: number };
export function Glass({ style, children, tint, interactive, strong, r = radius.lg }: Props) {
  const c = useColors();
  if (nativeGlass) {
    return (
      <GlassView style={[{ borderRadius: r, overflow: 'hidden' }, style]} glassEffectStyle="regular" isInteractive={interactive} tintColor={tint}>
        {children}
      </GlassView>
    );
  }
  return (
    <View style={[
      { borderRadius: r, backgroundColor: tint ?? (strong ? c.glassStrong : c.glass), borderWidth: StyleSheet.hairlineWidth * 2, borderColor: c.glassBorder,
        shadowColor: c.shadow, shadowOpacity: 1, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 2 },
      Platform.OS === 'web' && ({ backdropFilter: 'blur(22px) saturate(180%)', WebkitBackdropFilter: 'blur(22px) saturate(180%)' } as any),
      style,
    ]}>
      {children}
    </View>
  );
}
