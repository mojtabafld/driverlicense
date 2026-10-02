// Liquid Glass surface in the site's colours: Apple's real glass (UIGlassEffect) on iOS 26+, and elsewhere a
// translucent, blurred surface with the same bright edge and soft shadow.
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';

import { useIsDark } from './theme';

const nativeGlass = Platform.OS === 'ios' && (() => { try { return isLiquidGlassAvailable(); } catch { return false; } })();

// iOS 26/27's own colours for the floating bars (tab bar, the exam's bar): the system blue for the chosen item, the
// system label colours, the grey capsule behind the chosen tab, and system green / red.
export function useIOSBar() {
  const dark = useIsDark();
  return dark
    ? { tint: '#0A84FF', label: '#FFFFFF', secondary: 'rgba(235,235,245,0.6)', pill: 'rgba(255,255,255,0.14)', green: '#30D158', red: '#FF453A', fill: 'rgba(120,120,128,0.32)' }
    : { tint: '#007AFF', label: '#000000', secondary: 'rgba(60,60,67,0.6)', pill: 'rgba(118,118,128,0.14)', green: '#34C759', red: '#FF3B30', fill: 'rgba(118,118,128,0.12)' };
}

// `bar`: the material of iOS 26/27's floating tab bar where real glass is missing (web, Android, older iOS): very
// translucent and strongly blurred, a hairline edge, a soft drop shadow.
type Props = { style?: StyleProp<ViewStyle>; children?: React.ReactNode; r?: number; tint?: string; interactive?: boolean; bar?: boolean };
export function LiquidGlass({ style, children, r = 22, tint, interactive, bar }: Props) {
  const dark = useIsDark();
  if (bar && !nativeGlass) {
    const web = Platform.OS === 'web' ? ({
      backdropFilter: 'blur(30px) saturate(190%)', WebkitBackdropFilter: 'blur(30px) saturate(190%)',
      boxShadow: dark
        ? '0 8px 30px rgba(0,0,0,.55), inset 0 0.5px 0 rgba(255,255,255,.14)'
        : '0 8px 30px rgba(0,0,0,.12), 0 1px 3px rgba(0,0,0,.06), inset 0 0.5px 0 rgba(255,255,255,.9)',
    } as any) : null;
    return (
      <View style={[
        { borderRadius: r, borderWidth: 0.5, backgroundColor: dark ? 'rgba(30,30,32,0.74)' : 'rgba(250,250,252,0.74)', borderColor: dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.07)' },
        web ?? { shadowColor: '#000', shadowOpacity: dark ? 0.5 : 0.12, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 3 },
        style,
      ]}>
        {children}
      </View>
    );
  }
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
