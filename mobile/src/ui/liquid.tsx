// Fixed page headers use the same opaque colour as the page on every platform.
// The floating bottom navigation keeps its own appearance.
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { useColors } from './theme';

// `onHeight` lets the page keep its scrolling content below the fixed header.
export function GlassTop({ children, onHeight, style }: { children?: React.ReactNode; onHeight?: (h: number) => void; style?: StyleProp<ViewStyle> }) {
  const c = useColors();
  const box: ViewStyle = { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 };
  const onLayout = onHeight ? (e: { nativeEvent: { layout: { height: number } } }) => onHeight(e.nativeEvent.layout.height) : undefined;
  return (
    <View onLayout={onLayout} style={[box, { backgroundColor: c.bg }, style]}>
      {children}
    </View>
  );
}
