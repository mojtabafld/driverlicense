// A sheet from the bottom of the screen, for the app's lists and choices (the questions of an exam or review, the
// exam's summary, the items of a sign group, the mistakes' categories, the profile pictures): it slides up over a
// dimmed page with a grab handle at its top, and closes with a tap on the dimmed page, the phone's back button, or a
// drag down. The drag works from anywhere on the sheet: on its head at any time, on its list (SheetScroll) once the
// list is scrolled to its top. The sheet follows the finger; past a quarter of its height or on a quick flick down it
// slides out, otherwise it springs back.
import { createContext, useContext, useEffect, useState } from 'react';
import { Animated, Easing, Modal, PanResponder, Platform, Pressable, ScrollView, View, useWindowDimensions, type DimensionValue, type ScrollViewProps, type StyleProp,
  type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColors, useIsDark } from './theme';

// Whether the sheet's list is at its top, so a drag down on it moves the sheet instead of the list.
type Now = { top: boolean; onClose: () => void; h: number; from: number };
const ListTop = createContext<Now | null>(null);

const down = (g: { dx: number; dy: number }) => g.dy > 8 && g.dy > Math.abs(g.dx) * 1.4;

function sheetResponder(y: Animated.Value, now: Now) {
  return PanResponder.create({
    // On the sheet's head (nothing there takes the move); on its list only while the list is at its top.
    onMoveShouldSetPanResponder: (_, g) => down(g),
    onMoveShouldSetPanResponderCapture: (_, g) => down(g) && now.top,
    onPanResponderGrant: (_, g) => { Object.assign(now, { from: g.dy }); },
    onPanResponderMove: (_, g) => y.setValue(Math.max(0, g.dy - now.from)),
    onPanResponderTerminationRequest: () => false,
    onPanResponderRelease: (_, g) => {
      const d = g.dy - now.from;
      if (d > now.h / 4 || (g.vy > 0.8 && d > 20)) {
        Animated.timing(y, { toValue: now.h + 40, duration: 180, easing: Easing.in(Easing.quad), useNativeDriver: true }).start(() => now.onClose());
      } else Animated.spring(y, { toValue: 0, useNativeDriver: true, bounciness: 4 }).start();
    },
    onPanResponderTerminate: () => Animated.spring(y, { toValue: 0, useNativeDriver: true, bounciness: 4 }).start(),
  });
}

// `style`: the sheet's own padding and gap (by default 18 at the sides and 14 between its parts).
export function Sheet({ open, onClose, children, maxHeight = '85%', style }: { open: boolean; onClose: () => void; children: React.ReactNode; maxHeight?: DimensionValue;
  style?: StyleProp<ViewStyle> }) {
  const c = useColors(), dark = useIsDark(), ins = useSafeAreaInsets(), { height: winH } = useWindowDimensions();
  const [y] = useState(() => new Animated.Value(winH));
  // Still shown while it slides out after `open` goes false.
  const [shown, setShown] = useState(open);
  if (open && !shown) setShown(true);
  const [now] = useState<Now>(() => ({ top: true, onClose, h: 400, from: 0 }));
  useEffect(() => { Object.assign(now, { onClose }); }, [now, onClose]);
  useEffect(() => {
    if (open) {
      Object.assign(now, { top: true });
      y.setValue(winH);
      Animated.timing(y, { toValue: 0, duration: 300, easing: Easing.bezier(0.2, 0.9, 0.3, 1), useNativeDriver: true }).start();
      return;
    }
    Animated.timing(y, { toValue: winH, duration: 200, easing: Easing.in(Easing.quad), useNativeDriver: true }).start(({ finished }) => { if (finished) setShown(false); });
    // winH is read only when the sheet opens or closes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, y, now]);
  const [pan] = useState(() => sheetResponder(y, now));
  const dim = y.interpolate({ inputRange: [0, Math.max(1, winH * 0.6)], outputRange: [1, 0], extrapolate: 'clamp' });
  return (
    <Modal visible={shown} transparent animationType="none" statusBarTranslucent onRequestClose={onClose}>
      <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: dim, backgroundColor: dark ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.4)' }}>
        <Pressable onPress={onClose} accessibilityLabel="بستن" style={{ flex: 1 }} />
      </Animated.View>
      <View pointerEvents="box-none" style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Animated.View {...pan.panHandlers} onLayout={e => { Object.assign(now, { h: e.nativeEvent.layout.height }); }}
          style={[{ maxHeight, width: '100%', maxWidth: 560, alignSelf: 'center', paddingTop: 8, paddingHorizontal: 18, paddingBottom: ins.bottom + 18, gap: 14,
            borderTopLeftRadius: 26, borderTopRightRadius: 26, backgroundColor: c.surface, transform: [{ translateY: y }] },
            Platform.OS === 'web' ? ({ touchAction: 'none', overscrollBehavior: 'contain' } as any) : null, style]}>
          {/* The grab handle: a sign that the sheet can be dragged down. */}
          <View style={{ alignItems: 'center', marginBottom: -4 }}>
            <View style={{ width: 40, height: 5, borderRadius: 3, backgroundColor: c.line }} />
          </View>
          <ListTop.Provider value={now}>{children}</ListTop.Provider>
        </Animated.View>
      </View>
    </Modal>
  );
}

// The sheet's scrolling list: it tells the sheet when it is at its top (a drag down there then moves the sheet), and
// does not bounce past its ends, so that drag goes to the sheet.
export function SheetScroll(props: ScrollViewProps) {
  const now = useContext(ListTop);
  return (
    <ScrollView showsVerticalScrollIndicator={false} bounces={false} overScrollMode="never" scrollEventThrottle={16} {...props}
      onScroll={e => { if (now) Object.assign(now, { top: e.nativeEvent.contentOffset.y <= 1 }); props.onScroll?.(e); }} />
  );
}
