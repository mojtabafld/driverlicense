// A question picture, tappable: a tap opens it full screen on black, where it can be looked at closely. Two fingers
// spread or pinch it (1× to 4×), a double tap zooms in on that spot or back out, one finger moves it while zoomed, and
// on the web the mouse wheel zooms too. The close button, the phone's back button or Esc closes it. Built on
// PanResponder and Animated only, so it needs no extra native module.
import { Image, type ImageSource } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Modal, PanResponder, Platform, Pressable, View, useWindowDimensions, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from './icon';
import { T, physical, tap } from './kit';

const MAX = 4, DOUBLE = 2.5;

// The picture as it sits on the page, with a small magnifier in its corner; a tap opens the viewer.
export function ZoomableImage({ source, style, ratio = 4 / 3, children, transition }: {
  source: ImageSource; style?: StyleProp<any>; ratio?: number; children?: React.ReactNode; transition?: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <Pressable onPress={() => { tap(); setOpen(true); }} accessibilityRole="imagebutton" accessibilityLabel="بزرگ‌نمایی تصویر">
        <Image source={source} style={style} contentFit="contain" transition={transition} />
        <View pointerEvents="none" style={{ position: 'absolute', bottom: 8, ...physical({ right: 8 }), width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.55)' }}>
          <Icon name="zoom" size={17} color="#fff" />
        </View>
      </Pressable>
      {children}
      {open ? <ImageViewer source={source} ratio={ratio} onClose={() => setOpen(false)} /> : null}
    </View>
  );
}

type Pos = { s: number; x: number; y: number };
type Dims = { W: number; H: number; w: number; h: number };
type Touch = { pageX: number; pageY: number };

// The viewer's gestures, made once per opening. The screen and the picture's size at 1× are read when needed.
function makeZoom(ratio: number) {
  const dims = (): Dims => {
    const { width: W, height: H } = Dimensions.get('window'), w = Math.min(W, H * ratio);
    return { W, H, w, h: w / ratio };
  };
  const anim = { s: new Animated.Value(1), x: new Animated.Value(0), y: new Animated.Value(0) };
  let now: Pos = { s: 1, x: 0, y: 0 };                 // the committed position
  const g = { s: 1, x: 0, y: 0, dist: 1, mid: { x: 0, y: 0 }, pinch: false, moved: false, lastTap: 0 };
  // Keeps the zoomed picture over the screen: it can move only as far as its edges allow.
  const clamp = (s: number, x: number, y: number): Pos => {
    const { W, H, w, h } = dims(), mx = Math.max(0, (w * s - W) / 2), my = Math.max(0, (h * s - H) / 2);
    return { s, x: Math.min(mx, Math.max(-mx, x)), y: Math.min(my, Math.max(-my, y)) };
  };
  const set = (p: Pos) => { now = p; anim.s.setValue(p.s); anim.x.setValue(p.x); anim.y.setValue(p.y); };
  const go = (p: Pos) => {
    now = p;
    const cfg = { duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: Platform.OS !== 'web' };
    Animated.parallel([Animated.timing(anim.s, { toValue: p.s, ...cfg }), Animated.timing(anim.x, { toValue: p.x, ...cfg }), Animated.timing(anim.y, { toValue: p.y, ...cfg })]).start();
  };
  // Zoom to scale `s` keeping the screen point (px, py) where it is.
  const zoomAt = (s: number, px: number, py: number, from: Pos = now): Pos => {
    const { W, H } = dims(), cx = px - W / 2, cy = py - H / 2, k = s / from.s;
    return clamp(s, cx - (cx - from.x) * k, cy - (cy - from.y) * k);
  };
  const startPinch = (t: Touch[]) => Object.assign(g, { ...now, pinch: true,
    dist: Math.max(1, Math.hypot(t[0].pageX - t[1].pageX, t[0].pageY - t[1].pageY)),
    mid: { x: (t[0].pageX + t[1].pageX) / 2, y: (t[0].pageY + t[1].pageY) / 2 } });
  const touches = (e: any) => e.nativeEvent.touches as Touch[];
  const pan = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => false,
    onPanResponderGrant: e => {
      Object.assign(g, { ...now, pinch: false, moved: false });
      const t = touches(e);
      if (t.length >= 2) startPinch(t);
    },
    onPanResponderMove: (e, d) => {
      const t = touches(e);
      if (t.length >= 2) {
        if (!g.pinch) startPinch(t);
        const dist = Math.hypot(t[0].pageX - t[1].pageX, t[0].pageY - t[1].pageY);
        const s = Math.min(MAX * 1.15, Math.max(0.85, g.s * dist / g.dist));
        const mid = { x: (t[0].pageX + t[1].pageX) / 2, y: (t[0].pageY + t[1].pageY) / 2 };
        const p = zoomAt(s, g.mid.x, g.mid.y, g);
        set({ s, x: p.x + mid.x - g.mid.x, y: p.y + mid.y - g.mid.y });
        g.moved = true;
      } else if (!g.pinch) {
        if (Math.abs(d.dx) + Math.abs(d.dy) > 6) g.moved = true;
        if (g.s > 1.01) set(clamp(g.s, g.x + d.dx, g.y + d.dy));
      }
    },
    onPanResponderRelease: e => {
      if (g.pinch || g.moved) {
        // Back within 1×–4× and within the edges.
        const s = Math.min(MAX, Math.max(1, now.s));
        go(s <= 1.01 ? { s: 1, x: 0, y: 0 } : clamp(s, now.x, now.y));
        return;
      }
      // A tap: a second one soon after zooms in on that spot, or back out.
      const t = Date.now(), { pageX, pageY } = e.nativeEvent;
      if (t - g.lastTap < 300) {
        g.lastTap = 0;
        go(now.s > 1.01 ? { s: 1, x: 0, y: 0 } : zoomAt(DOUBLE, pageX, pageY));
      } else g.lastTap = t;
    },
  });
  // The web's mouse wheel: zoom at the pointer.
  const wheel = (deltaY: number, px: number, py: number) => {
    const s = Math.min(MAX, Math.max(1, now.s * Math.exp(-deltaY / 400)));
    set(s <= 1.01 ? { s: 1, x: 0, y: 0 } : zoomAt(s, px, py));
  };
  return { anim, pan, wheel };
}

export function ImageViewer({ source, ratio = 4 / 3, onClose }: { source: ImageSource; ratio?: number; onClose: () => void }) {
  const { width: W, height: H } = useWindowDimensions(), ins = useSafeAreaInsets();
  // The picture's size at 1×: as large as fits the screen.
  const w = Math.min(W, H * ratio), h = w / ratio;
  const [z] = useState(() => makeZoom(ratio));
  const [hint, setHint] = useState(true);
  useEffect(() => { const t = setTimeout(() => setHint(false), 2600); return () => clearTimeout(t); }, []);

  // The web: the mouse wheel zooms at the pointer, Esc closes.
  const box = useRef<View>(null);
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const el = box.current as unknown as HTMLElement | null;
    const wheel = (ev: WheelEvent) => { ev.preventDefault(); z.wheel(ev.deltaY, ev.clientX, ev.clientY); };
    const key = (ev: KeyboardEvent) => { if (ev.key === 'Escape') onClose(); };
    el?.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('keydown', key);
    return () => { el?.removeEventListener('wheel', wheel); window.removeEventListener('keydown', key); };
  }, [z, onClose]);

  return (
    <Modal visible transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <View ref={box} style={{ flex: 1, backgroundColor: '#000' }} {...z.pan.panHandlers}>
        <Animated.View style={{ position: 'absolute', left: (W - w) / 2, top: (H - h) / 2, width: w, height: h,
          transform: [{ translateX: z.anim.x }, { translateY: z.anim.y }, { scale: z.anim.s }] } as Animated.WithAnimatedValue<ViewStyle>}>
          <Image source={source} style={{ width: '100%', height: '100%' }} contentFit="contain" />
        </Animated.View>
        {hint ? (
          <View pointerEvents="none" style={{ position: 'absolute', left: 16, right: 16, bottom: ins.bottom + 24, alignItems: 'center' }}>
            <T style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13.5, textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 99, overflow: 'hidden' }}>
              {Platform.OS === 'web' ? 'برای بزرگ‌نمایی دو بار کلیک کنید یا چرخ ماوس را بچرخانید' : 'برای بزرگ‌نمایی دو انگشت را باز کنید یا دو بار ضربه بزنید'}
            </T>
          </View>
        ) : null}
      </View>
      <Pressable onPress={() => { tap(); onClose(); }} hitSlop={10} accessibilityRole="button" accessibilityLabel="بستن"
        style={({ pressed }) => ({ position: 'absolute', top: ins.top + 12, ...physical({ right: 16 }), width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.16)', opacity: pressed ? 0.7 : 1 })}>
        <Icon name="xmark" size={22} color="#fff" />
      </Pressable>
    </Modal>
  );
}
