// A sheet from the bottom of the screen, for the app's lists and choices (the questions of an exam or review, the
// exam's summary, the items of a sign group, the mistakes' categories, the profile pictures): it slides up over a
// dimmed page with a grab handle at its top, and closes with a tap on the dimmed page, the phone's back button, or a
// drag down. The drag works from anywhere on the sheet: on its head at any time, on its list (SheetScroll) once the
// list is scrolled to its top. The sheet follows the finger; past a quarter of its height or on a quick flick down it
// slides out, otherwise it springs back.
// On the web the drag is a PanResponder. On phones it is a gesture-handler pan run alongside the list's own scrolling:
// Android's native list takes every vertical drag for itself (the PanResponder was cancelled), so the pan moves the
// sheet only while the list is at its top.
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Gesture, GestureDetector, GestureHandlerRootView, ScrollView as GHScrollView } from 'react-native-gesture-handler';
import { Animated, Easing, Modal, PanResponder, Platform, Pressable, ScrollView, View, useWindowDimensions, type DimensionValue, type ScrollViewProps, type StyleProp,
  type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColors, useIsDark } from './theme';

// Whether the sheet's list is at its top, so a drag down on it moves the sheet instead of the list.
type Now = { top: boolean; onClose: () => void; h: number; from: number; at: number | null; scroll: React.RefObject<any> };
const WEB = Platform.OS === 'web';
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
      if (d > now.h / 4 || (g.vy > 0.8 && d > 20)) now.onClose();
      else Animated.spring(y, { toValue: 0, useNativeDriver: true, bounciness: 4 }).start();
    },
    onPanResponderTerminate: () => Animated.spring(y, { toValue: 0, useNativeDriver: true, bounciness: 4 }).start(),
  });
}

// The close, light and short (Mojtaba 2026-10-20): the sheet moves down only its own height, slowing to a stop rather
// than speeding off the screen, while it and the dimmed page fade out.
function slideOut(y: Animated.Value, fade: Animated.Value, h: number, then: () => void) {
  Animated.parallel([
    Animated.timing(y, { toValue: h + 24, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    Animated.timing(fade, { toValue: 0, duration: 200, easing: Easing.out(Easing.quad), useNativeDriver: true }),
  ]).start(({ finished }) => { if (finished) then(); });
}

// Out past a quarter of the sheet's height or on a quick flick down (px per second), otherwise back.
function settle(y: Animated.Value, now: Now, d: number, vy: number) {
  if (d > now.h / 4 || (vy > 800 && d > 20)) now.onClose();
  else Animated.spring(y, { toValue: 0, useNativeDriver: true, bounciness: 4 }).start();
}

// The phones' drag: it starts only on a move down; the sheet follows from the moment the list is at its top (`at`:
// the finger's offset then), so a list scrolled down first scrolls back up and then hands over to the sheet.
function sheetPan(y: Animated.Value, now: Now) {
  return Gesture.Pan().runOnJS(true).activeOffsetY(10).failOffsetX([-16, 16]).simultaneousWithExternalGesture(now.scroll)
    .onStart(() => { now.at = null; })
    .onUpdate(e => {
      if (!now.top) { now.at = null; return; }
      if (now.at == null) now.at = e.translationY;
      y.setValue(Math.max(0, e.translationY - now.at));
    })
    .onEnd(e => { const d = now.at == null ? 0 : e.translationY - now.at; now.at = null; settle(y, now, d, e.velocityY); });
}

// `style`: the sheet's own padding and gap (by default 18 at the sides and 14 between its parts).
export function Sheet({ open, onClose, children, maxHeight = '85%', style }: { open: boolean; onClose: () => void; children: React.ReactNode; maxHeight?: DimensionValue;
  style?: StyleProp<ViewStyle> }) {
  const c = useColors(), dark = useIsDark(), ins = useSafeAreaInsets(), { height: winH } = useWindowDimensions();
  const [y] = useState(() => new Animated.Value(winH));
  const [fade] = useState(() => new Animated.Value(1));
  // Still shown while it slides out after `open` goes false.
  const [shown, setShown] = useState(open);
  if (open && !shown) setShown(true);
  const scroll = useRef<any>(null);
  const [now] = useState<Now>(() => ({ top: true, onClose, h: 400, from: 0, at: null, scroll }));
  useEffect(() => { Object.assign(now, { onClose }); }, [now, onClose]);
  useEffect(() => {
    if (open) {
      Object.assign(now, { top: true });
      y.setValue(winH);
      fade.setValue(1);
      Animated.timing(y, { toValue: 0, duration: 300, easing: Easing.bezier(0.2, 0.9, 0.3, 1), useNativeDriver: true }).start();
      return;
    }
    slideOut(y, fade, now.h, () => setShown(false));
    // winH is read only when the sheet opens or closes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, y, fade, now]);
  const [pan] = useState(() => sheetResponder(y, now));
  const [gesture] = useState(() => sheetPan(y, now));
  const dim = Animated.multiply(fade, y.interpolate({ inputRange: [0, Math.max(1, winH * 0.6)], outputRange: [1, 0], extrapolate: 'clamp' }));
  const sheet = (
    <Animated.View {...(WEB ? pan.panHandlers : null)} onLayout={e => { Object.assign(now, { h: e.nativeEvent.layout.height }); }}
      style={[{ maxHeight, width: '100%', maxWidth: 560, alignSelf: 'center', paddingTop: 8, paddingHorizontal: 18, paddingBottom: ins.bottom + 18, gap: 14,
        borderTopLeftRadius: 26, borderTopRightRadius: 26, backgroundColor: c.surface, opacity: fade, transform: [{ translateY: y }] },
        Platform.OS === 'web' ? ({ touchAction: 'none', overscrollBehavior: 'contain' } as any) : null, style]}>
      {/* The grab handle: a sign that the sheet can be dragged down. */}
      <View style={{ alignItems: 'center', marginBottom: -4 }}>
        <View style={{ width: 40, height: 5, borderRadius: 3, backgroundColor: c.line }} />
      </View>
      <ListTop.Provider value={now}>{children}</ListTop.Provider>
    </Animated.View>
  );
  return (
    <Modal visible={shown} transparent animationType="none" statusBarTranslucent onRequestClose={onClose}>
      {/* A modal is its own window on Android, so gestures need their own root in it. */}
      <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: dim, backgroundColor: dark ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.4)' }}>
        <Pressable onPress={onClose} accessibilityLabel="بستن" style={{ flex: 1 }} />
      </Animated.View>
      <View pointerEvents="box-none" style={{ flex: 1, justifyContent: 'flex-end' }}>
        {WEB ? sheet : <GestureDetector gesture={gesture}>{sheet}</GestureDetector>}
      </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

// The sheet's scrolling list: it tells the sheet when it is at its top (a drag down there then moves the sheet), and
// does not bounce past its ends, so that drag goes to the sheet.
export function SheetScroll(props: ScrollViewProps) {
  const now = useContext(ListTop);
  // On phones the gesture-handler list, so the sheet's pan can run alongside its scrolling.
  const List: any = WEB || !now ? ScrollView : GHScrollView;
  return (
    <List ref={WEB ? undefined : now?.scroll} showsVerticalScrollIndicator={false} bounces={false} overScrollMode="never" scrollEventThrottle={16} {...props}
      onScroll={(e: Parameters<NonNullable<ScrollViewProps['onScroll']>>[0]) => { if (now) Object.assign(now, { top: e.nativeEvent.contentOffset.y <= 1 }); props.onScroll?.(e); }} />
  );
}
