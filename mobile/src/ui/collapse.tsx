// A part that slides open and shut under the row above it (the settings' «تنظیمات زبان»; Mojtaba 2026-10-23): its
// height eases between none and the content's own while the content fades in and drops into place, and back. The
// content stays mounted (it is measured while shut) and takes no taps while shut. `useOpening` gives the eased
// progress, 0 shut to 1 open, for an arrow that turns with it too.
import { useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';

export function useOpening(open: boolean, ms = 320) {
  const [p] = useState(() => new Animated.Value(open ? 1 : 0));
  useEffect(() => {
    Animated.timing(p, { toValue: open ? 1 : 0, duration: ms, easing: Easing.bezier(0.25, 0.8, 0.25, 1), useNativeDriver: false }).start();
  }, [open, ms, p]);
  return p;
}

export function Collapse({ p, open, children }: { p: Animated.Value; open: boolean; children: React.ReactNode }) {
  const [h, setH] = useState(0);
  return (
    <Animated.View pointerEvents={open ? 'auto' : 'none'} aria-hidden={!open}
      style={{ height: p.interpolate({ inputRange: [0, 1], outputRange: [0, h] }), overflow: 'hidden' }}>
      <Animated.View onLayout={e => setH(e.nativeEvent.layout.height)}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity: p, transform: [{ translateY: p.interpolate({ inputRange: [0, 1], outputRange: [-10, 0] }) }] }}>
        {children}
      </Animated.View>
    </Animated.View>
  );
}
