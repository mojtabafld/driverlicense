// Liquid Glass surface in the site's colours: Apple's real glass (UIGlassEffect) on iOS 26+, and elsewhere a
// translucent, blurred surface with the same bright edge and soft shadow.
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';

import { useColors, useIsDark } from './theme';

const nativeGlass = Platform.OS === 'ios' && (() => { try { return isLiquidGlassAvailable(); } catch { return false; } })();

// iOS 26/27's own colours for the floating bars (tab bar, the exam's bar): the system blue for the chosen item, the
// system label colours, the grey capsule behind the chosen tab, and system green / red.
export function useIOSBar() {
  const dark = useIsDark();
  return dark
    ? { tint: '#0A84FF', label: '#FFFFFF', secondary: 'rgba(235,235,245,0.6)', pill: 'rgba(255,255,255,0.14)', green: '#30D158', red: '#FF453A', fill: 'rgba(120,120,128,0.32)' }
    : { tint: '#007AFF', label: '#000000', secondary: 'rgba(60,60,67,0.6)', pill: 'rgba(118,118,128,0.14)', green: '#34C759', red: '#FF3B30', fill: 'rgba(118,118,128,0.12)' };
}

// `bar`: the floating bars (the exam's bar with previous / next and the list, the web's tab bar) where real glass is
// missing (web, Android, older iOS): flat and minimal, a solid surface in the page's card colour with a thin line
// around it; no see-through, blur, sheen or shadow.
type Props = { style?: StyleProp<ViewStyle>; children?: React.ReactNode; r?: number; tint?: string; interactive?: boolean; bar?: boolean };
export function LiquidGlass({ style, children, r = 22, tint, interactive, bar }: Props) {
  const dark = useIsDark(), c = useColors();
  if (bar && !nativeGlass) {
    return (
      <View style={[{ borderRadius: r, borderWidth: 1, backgroundColor: c.surface, borderColor: c.line }, style]}>
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
      : 'inset 0 1px 0 rgba(255,255,255,.95), inset 0 -1px 0 rgba(255,255,255,.45), 0 10px 28px -12px rgba(20,60,60,.26)',
  } as any) : null;
  return (
    <View style={[
      { borderRadius: r, borderWidth: 1, backgroundColor: tint ?? (dark ? 'rgba(28,48,49,0.70)' : 'rgba(255,255,255,0.72)'),
        borderColor: dark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.85)' },
      web ?? { shadowColor: '#103c3c', shadowOpacity: dark ? 0.5 : 0.14, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 2 },
      style,
    ]}>
      {children}
    </View>
  );
}

// A page's top bar fixed over its content, as iOS draws its navigation bars: edge to edge, the page scrolling under it
// blurred. iOS 26+: the system's own glass; web: a translucent bar with a backdrop blur and a hairline below; Android
// (no blur): nearly solid. `onHeight` reports its height so the page can pad its content below it.
export function GlassTop({ children, onHeight, style }: { children?: React.ReactNode; onHeight?: (h: number) => void; style?: StyleProp<ViewStyle> }) {
  const dark = useIsDark(), c = useColors();
  const box: ViewStyle = { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 };
  const onLayout = onHeight ? (e: { nativeEvent: { layout: { height: number } } }) => onHeight(e.nativeEvent.layout.height) : undefined;
  if (nativeGlass) {
    return <GlassView onLayout={onLayout} style={[box, style]} glassEffectStyle="regular">{children}</GlassView>;
  }
  const web = Platform.OS === 'web' ? ({ backdropFilter: 'blur(22px) saturate(180%)', WebkitBackdropFilter: 'blur(22px) saturate(180%)' } as any) : null;
  return (
    <View onLayout={onLayout} style={[box, {
      backgroundColor: `${c.bg}${web ? 'BD' : 'F5'}`, // the page colour, about 74% (web) / 96% see-through
      borderBottomWidth: 0.5, borderBottomColor: dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)',
    }, web, style]}>
      {children}
    </View>
  );
}
