// Slide to confirm, like a delivery app's «Complete pickup»: a grey track with its label, and at its right end (the
// start, in the app's right-to-left reading) a square handle in the main button's colour with a dotted arrow, dragged
// to the left end to confirm. While it moves the handle grows into a fill that covers the label, the part of the label
// under it in the button's text colour. Let go before the end and it glides back; at the end the fill covers it all,
// the label turns into a check and `onConfirm` runs a moment later. Screen readers get one «activate» action instead
// of dragging. PanResponder and Animated only, so it needs no extra native module.
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
function makeSlide(onDone: () => void, onFinishing: () => void) {
  const x = new Animated.Value(0);   // 0 … room, as a distance to the LEFT
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
    onPanResponderMove: (_, g) => x.setValue(Math.min(st.room, Math.max(0, st.from - g.dx))),
    onPanResponderRelease: (_, g) => {
      const v = Math.min(st.room, Math.max(0, st.from - g.dx));
      if (v >= st.room * DONE_AT || (g.vx < -1.2 && v > st.room * 0.4)) finish();
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

export function SlideToConfirm({ label, doneLabel, onConfirm }: { label: string; doneLabel: string; onConfirm: () => void }) {
  const c = useColors();
  const [done, setDone] = useState(false);
  const [s] = useState(() => makeSlide(onConfirm, () => setDone(true)));
  const [w, setW] = useState(KNOB + 1);
  const layout = (e: LayoutChangeEvent) => { const tw = e.nativeEvent.layout.width; s.setRoom(Math.max(1, tw - KNOB)); setW(tw); };
  const confirm = () => { if (!s.isDone()) s.finish(); };
  const fill = Animated.add(s.x, KNOB);   // from the right edge to the handle's left side
  const text = { fontSize: 16, lineHeight: 24, fontWeight: '600' as const, textAlign: 'center' as const };
  return (
    <View onLayout={layout} accessible accessibilityRole="button" accessibilityLabel={label}
      accessibilityActions={[{ name: 'activate' }]} onAccessibilityAction={confirm}
      style={{ height: H, borderRadius: R, backgroundColor: c.nav, overflow: 'hidden', justifyContent: 'center', direction: 'ltr' } as any}>
      {/* The label on the track, beside the handle. */}
      <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: KNOB, alignItems: 'center' }}>
        <T style={[text, { color: c.navFg }]} numberOfLines={1}>{label}</T>
      </View>
      {/* The handle and the fill it grows into, from the right end. The same label inside it, standing still with the
          track, shows in the button's text colour where the fill covers it. */}
      <Animated.View {...s.pan.panHandlers}
        style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: fill, borderRadius: R, backgroundColor: c.btn, overflow: 'hidden',
          ...(Platform.OS === 'web' ? { cursor: 'grab', touchAction: 'none' } as any : {}) }}>
        {/* Cut off just before the arrow, as the label runs into the moving handle. */}
        <View pointerEvents="none" style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: done ? 0 : KNOB, overflow: 'hidden' }}>
          <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: w, paddingRight: done ? 0 : KNOB, paddingLeft: done ? KNOB : 0, alignItems: 'center', justifyContent: 'center' }}>
            <T style={[text, { color: c.btnFg }]} numberOfLines={1}>{done ? doneLabel : label}</T>
          </View>
        </View>
        <View pointerEvents="none" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: KNOB, alignItems: 'center', justifyContent: 'center' }}>
          {done ? <Icon name="check" size={22} color={c.btnFg} weight="bold" /> : <DragArrow color={c.btnFg} />}
        </View>
      </Animated.View>
    </View>
  );
}
