// Slide to confirm, like a delivery app's «Complete pickup»: a grey track with its label, and at its right end (the
// start, in the app's right-to-left reading) a square handle in the main button's colour with a dotted arrow, dragged
// to the left end to confirm. While it moves the handle grows into a fill over the track and the label fades out.
// Let go before the end and it glides back; at the end the fill covers it all, «done» shows with a check and
// `onConfirm` runs a moment later. Screen readers get one «activate» action instead of dragging. PanResponder and
// Animated only, so it needs no extra native module.
// `toRight`: mirrored, the handle at the left end, dragged to the right (the main site's exam hand-in, Mojtaba asked).
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Animated, Easing, PanResponder, Platform, View, type LayoutChangeEvent } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { Icon } from './icon';
import { T } from './kit';
import { useColors } from './theme';

const H = 56, KNOB = H, R = 12, DONE_AT = 0.85; // the handle is a square as tall as the track

const buzz = (kind: 'start' | 'done') => {
  if (Platform.OS === 'web') return;
  (kind === 'done' ? Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) : Haptics.selectionAsync()).catch(() => {});
};

// The drag, made once: `room` is how far the handle can travel (the track's width less the handle), set on layout.
function makeSlide(onDone: () => void, onFinishing: () => void, toRight: boolean) {
  const x = new Animated.Value(0);   // 0 … room, as a distance from the handle's start (to the left, or the right with `toRight`)
  const dir = toRight ? 1 : -1;
  const st = { room: 1, done: false, from: 0 };
  const native = false; // the fill's width follows the same value, and width cannot run on the native driver
  const finish = () => {
    st.done = true; buzz('done'); onFinishing();
    Animated.timing(x, { toValue: st.room, duration: 140, easing: Easing.out(Easing.quad), useNativeDriver: native }).start();
    setTimeout(onDone, 420);   // the check shows for a moment
  };
  const pan = PanResponder.create({
    onStartShouldSetPanResponder: () => !st.done,
    onMoveShouldSetPanResponder: () => !st.done,
    onPanResponderTerminationRequest: () => false,
    onPanResponderGrant: () => { x.stopAnimation(v => { st.from = v; }); buzz('start'); },
    onPanResponderMove: (_, g) => x.setValue(Math.min(st.room, Math.max(0, st.from + dir * g.dx))),
    onPanResponderRelease: (_, g) => {
      const v = Math.min(st.room, Math.max(0, st.from + dir * g.dx));
      if (v >= st.room * DONE_AT || (dir * g.vx > 1.2 && v > st.room * 0.4)) finish();
      else Animated.spring(x, { toValue: 0, useNativeDriver: native, bounciness: 4, speed: 18 }).start();
    },
    onPanResponderTerminate: () => Animated.spring(x, { toValue: 0, useNativeDriver: native, bounciness: 4, speed: 18 }).start(),
  });
  return { x, pan, finish, setRoom: (r: number) => { st.room = r; }, isDone: () => st.done };
}

// A dotted arrow pointing left (the way to drag): a dot, a short gap, then the arrow.
function DragArrow({ color }: { color: string }) {
  const line = { stroke: color, strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  return (
    <Svg width={26} height={24} viewBox="0 0 26 24">
      <Path d="M4 12h13M9.5 6.5 4 12l5.5 5.5" {...line} />
      <Circle cx={21.5} cy={12} r={1.4} fill={color} />
    </Svg>
  );
}

export function SlideToConfirm({ label, doneLabel, onConfirm, toRight = false }: { label: string; doneLabel: string; onConfirm: () => void; toRight?: boolean }) {
  const c = useColors();
  const [done, setDone] = useState(false);
  const [s] = useState(() => makeSlide(onConfirm, () => setDone(true), toRight));
  // The handle's own end of the track, and the far end it is dragged to.
  const near = toRight ? 'left' : 'right', far = toRight ? 'right' : 'left';
  const [w, setW] = useState(KNOB + 1);
  const layout = (e: LayoutChangeEvent) => { const tw = e.nativeEvent.layout.width; s.setRoom(Math.max(1, tw - KNOB)); setW(tw); };
  const confirm = () => { if (!s.isDone()) s.finish(); };
  const fill = Animated.add(s.x, KNOB);   // from the right edge to the handle's left side
  // The label is gone by the time the handle has crossed most of it.
  const fade = s.x.interpolate({ inputRange: [0, Math.max(1, (w - KNOB) * 0.55)], outputRange: [1, 0], extrapolate: 'clamp' });
  const text = { fontSize: 16, lineHeight: 24, fontWeight: '600' as const, textAlign: 'center' as const };
  return (
    <View onLayout={layout} accessible accessibilityRole="button" accessibilityLabel={label}
      accessibilityActions={[{ name: 'activate' }]} onAccessibilityAction={confirm}
      style={{ height: H, borderRadius: R, backgroundColor: c.nav, overflow: 'hidden', justifyContent: 'center', direction: 'ltr' } as any}>
      {/* The label on the track, beside the handle; it fades out as the handle comes over it. */}
      <Animated.View pointerEvents="none" style={{ position: 'absolute', [far]: 0, [near]: KNOB, alignItems: 'center', opacity: fade }}>
        <T style={[text, { color: c.navFg }]} numberOfLines={1}>{label}</T>
      </Animated.View>
      {/* The handle and the fill it grows into, from the right end. The same label inside it, standing still with the
          track, shows in the button's text colour where the fill covers it. */}
      <Animated.View {...s.pan.panHandlers}
        style={{ position: 'absolute', top: 0, bottom: 0, [near]: 0, width: fill, borderRadius: R, backgroundColor: c.btn, overflow: 'hidden',
          ...(Platform.OS === 'web' ? { cursor: 'grab', touchAction: 'none' } as any : {}) }}>
        {done ? (
          <View pointerEvents="none" style={{ position: 'absolute', top: 0, bottom: 0, [near]: 0, width: w, [toRight ? 'paddingRight' : 'paddingLeft']: KNOB, alignItems: 'center', justifyContent: 'center' }}>
            <T style={[text, { color: c.btnFg }]} numberOfLines={1}>{doneLabel}</T>
          </View>
        ) : null}
        <View pointerEvents="none" style={{ position: 'absolute', top: 0, bottom: 0, [far]: 0, width: KNOB, alignItems: 'center', justifyContent: 'center' }}>
          {done ? <Icon name="check" size={22} color={c.btnFg} weight="bold" /> : <View style={toRight ? { transform: [{ scaleX: -1 }] } : undefined}><DragArrow color={c.btnFg} /></View>}
        </View>
      </Animated.View>
    </View>
  );
}
