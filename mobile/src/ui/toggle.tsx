// An on / off switch in the app's teal. On the web the Switch of react-native-web misplaces its knob on a right-to-left
// page (it ends up outside the track), so the app draws its own there: an iOS-sized track with a white knob that
// slides, mirrored for the right-to-left page (on = knob on the left, as iOS does in Persian). Native keeps the system
// Switch.
import { useEffect, useState } from 'react';
import { Animated, Easing, Platform, Pressable, Switch } from 'react-native';

import { RTL } from '@/lib/i18n';
import { tap } from './kit';
import { ARC, useColors } from './theme';

const W = 51, H = 31, PAD = 2, KNOB = H - PAD * 2;

export function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label?: string }) {
  const c = useColors();
  // Main site: on in the deep green of its buttons (`cta`), so switches and buttons match.
  const on = ARC ? c.cta : c.accent;
  const [pos] = useState(() => new Animated.Value(value ? 1 : 0));
  useEffect(() => {
    Animated.timing(pos, { toValue: value ? 1 : 0, duration: 180, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [value, pos]);
  if (Platform.OS !== 'web') {
    return <Switch value={value} onValueChange={v => { tap(); onChange(v); }} trackColor={{ false: c.line, true: on }} thumbColor="#fff" accessibilityLabel={label} />;
  }
  // (On is the knob at the right in English and Danish.)
  const left = pos.interpolate({ inputRange: [0, 1], outputRange: RTL ? [W - PAD - KNOB, PAD] : [PAD, W - PAD - KNOB] });
  const bg = pos.interpolate({ inputRange: [0, 1], outputRange: [c.line, on] });
  return (
    <Pressable onPress={() => { tap(); onChange(!value); }} accessibilityRole="switch" accessibilityState={{ checked: value }} accessibilityLabel={label} hitSlop={6}>
      <Animated.View style={{ width: W, height: H, borderRadius: H / 2, backgroundColor: bg, direction: 'ltr' } as any}>
        <Animated.View style={{ position: 'absolute', top: PAD, left, width: KNOB, height: KNOB, borderRadius: KNOB / 2, backgroundColor: '#fff',
          shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 3, shadowOffset: { width: 0, height: 1 } }} />
      </Animated.View>
    </Pressable>
  );
}
