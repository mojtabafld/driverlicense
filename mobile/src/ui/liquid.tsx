// Liquid Glass for a page's top bar: Apple's real glass (UIGlassEffect) on iOS 26+, and elsewhere a translucent bar.
// (The floating bars at the bottom: glass-bar.tsx.)
import { GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable } from 'expo-glass-effect';
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';

import { useColors, useIsDark } from './theme';

const nativeGlass = Platform.OS === 'ios' && (() => { try { return isLiquidGlassAvailable() && isGlassEffectAPIAvailable(); } catch { return false; } })();

// A page's top bar fixed over its content, as iOS draws its navigation bars: edge to edge, the page scrolling under it
// blurred. iOS 26+: the system's own glass, in the app's light or dark (not the phone's); web: a translucent bar with a
// backdrop blur and a hairline below; Android (no blur): nearly solid. `onHeight` reports its height so the page can
// pad its content below it.
export function GlassTop({ children, onHeight, style }: { children?: React.ReactNode; onHeight?: (h: number) => void; style?: StyleProp<ViewStyle> }) {
  const dark = useIsDark(), c = useColors();
  const box: ViewStyle = { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 };
  const onLayout = onHeight ? (e: { nativeEvent: { layout: { height: number } } }) => onHeight(e.nativeEvent.layout.height) : undefined;
  if (nativeGlass) {
    return <GlassView onLayout={onLayout} style={[box, style]} glassEffectStyle="regular" colorScheme={dark ? 'dark' : 'light'}>{children}</GlassView>;
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
