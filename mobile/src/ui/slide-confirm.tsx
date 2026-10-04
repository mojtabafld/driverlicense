// Slide to confirm, like unlocking a phone: a round-cornered track with a handle at its right end (the start, in the
// app's right-to-left reading), dragged to the left end to confirm. Let go before the end and it glides back; at the
// end the track fills, the label turns into a check and `onConfirm` runs a moment later. Flat and minimal, in the
// main button's colours (ActionButton). Screen readers get one «activate» action instead of dragging.
// PanResponder and Animated only, so it needs no extra native module.
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Animated, Easing, PanResponder, Platform, View, type LayoutChangeEvent } from 'react-native';

import { Icon, type IconName } from './icon';
import { T } from './kit';
import { useColors } from './theme';

const H = 60, PAD = 4, KNOB = H - PAD * 2, DONE_AT = 0.85;

const buzz = (kind: 'start' | 'done') => {
  if (Platform.OS === 'web') return;
  (kind === 'done' ? Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) : Haptics.selectionAsync()).catch(() => {});
};

// The drag, made once: `room` is how far the handle can travel (the track's width less the handle), set on layout.
function makeSlide(onDone: () => void, onFinishing: () => void) {
  const x = new Animated.Value(0);   // 0 … room, as a distance to the LEFT
  const st = { room: 1, done: false, from: 0 };
  const native = Platform.OS !== 'web';
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

export function SlideToConfirm({ label, doneLabel, icon = 'chevronLeft', onConfirm }: { label: string; doneLabel: string; icon?: IconName; onConfirm: () => void }) {
  const c = useColors();
  const [done, setDone] = useState(false);
  const [s] = useState(() => makeSlide(onConfirm, () => setDone(true)));
  const [room, setRoom] = useState(1);
  const layout = (e: LayoutChangeEvent) => { const r = Math.max(1, e.nativeEvent.layout.width - KNOB - PAD * 2); s.setRoom(r); setRoom(r); };
  const confirm = () => { if (!s.isDone()) s.finish(); };
  // The label fades as the handle leaves; the fill grows behind it.
  const fade = s.x.interpolate({ inputRange: [0, room * 0.6], outputRange: [1, 0], extrapolate: 'clamp' });
  const fill = s.x.interpolate({ inputRange: [0, room], outputRange: [KNOB + PAD * 2, room + KNOB + PAD * 2], extrapolate: 'clamp' });
  return (
    <View onLayout={layout} accessible accessibilityRole="button" accessibilityLabel={label}
      accessibilityActions={[{ name: 'activate' }]} onAccessibilityAction={confirm}
      style={{ height: H, borderRadius: 14, backgroundColor: c.nav, overflow: 'hidden', justifyContent: 'center', direction: 'ltr' } as any}>
      {/* The trail behind the handle, from the right edge to the handle. */}
      <Animated.View pointerEvents="none" style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: fill, borderRadius: 14, backgroundColor: c.btn, opacity: done ? 1 : 0.22 }} />
      <Animated.View pointerEvents="none" style={{ position: 'absolute', left: KNOB, right: KNOB, opacity: done ? 0 : fade, alignItems: 'center' }}>
        <T style={{ fontSize: 15.5, lineHeight: 24, fontWeight: '600', color: c.navFg, textAlign: 'center' }} numberOfLines={1}>{label}</T>
      </Animated.View>
      {done ? (
        <View pointerEvents="none" style={{ position: 'absolute', left: KNOB + PAD * 2, right: 0, alignItems: 'center' }}>
          <T style={{ fontSize: 15.5, lineHeight: 24, fontWeight: '600', color: c.btnFg, textAlign: 'center' }}>{doneLabel}</T>
        </View>
      ) : null}
      {/* The handle, at the right end to begin with. */}
      <Animated.View {...s.pan.panHandlers}
        style={{ position: 'absolute', top: PAD, right: PAD, width: KNOB, height: KNOB, borderRadius: 11, alignItems: 'center', justifyContent: 'center',
          backgroundColor: c.btn, transform: [{ translateX: Animated.multiply(s.x, -1) }], ...(Platform.OS === 'web' ? { cursor: 'grab', touchAction: 'none' } as any : {}) }}>
        <Icon name={done ? 'check' : icon} size={22} color={c.btnFg} weight="bold" />
      </Animated.View>
    </View>
  );
}
