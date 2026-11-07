// An on / off switch in the theme's colour, drawn by the app (react-native-web's Switch misplaced its knob on a
// right-to-left page): a knob that slides, mirrored for the right-to-left page (on = knob on the left, as iOS does in
// Persian).
import { useEffect, useState } from 'react';
import { Animated, Easing, Pressable } from 'react-native';

import { RTL } from '@/lib/i18n';
import { tap } from './kit';
import { ARC, useColors, useIsDark } from './theme';
import { graphiteCtl } from './palette';

const W = 52, H = 32, LINE = 2, GAP = 3, KNOB = H - (LINE + GAP) * 2;

// `disabled`: shown faded and not to be changed (a premium setting without premium).
// The look (Mojtaba 2026-11-07, after his picture): an outlined track in the theme's colour, its knob a filled disc when
// on and an outlined ring when off; drawn by the app on every platform (the system Switch cannot take this shape).
export function Toggle({ value, onChange, label, disabled }: { value: boolean; onChange: (v: boolean) => void; label?: string; disabled?: boolean }) {
  const c = useColors();
  // («گرافیت»: in its greys; Mojtaba 2026-10-29.)
  const g = graphiteCtl(useIsDark());
  const ink = g?.on ?? (ARC ? c.accent : c.link), dim = ink;
  const [pos] = useState(() => new Animated.Value(value ? 1 : 0));
  useEffect(() => {
    Animated.timing(pos, { toValue: value ? 1 : 0, duration: 180, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [value, pos]);
  // (On is the knob at the end the language reads to: the right in English and Danish, the left in Persian.)
  const inner = W - LINE * 2, from = GAP, to = inner - GAP - KNOB;
  const left = pos.interpolate({ inputRange: [0, 1], outputRange: RTL ? [to, from] : [from, to] });
  const line = pos.interpolate({ inputRange: [0, 1], outputRange: [dim, ink] });
  const fill = pos.interpolate({ inputRange: [0, 1], outputRange: ['rgba(0,0,0,0)', ink] });
  return (
    <Pressable onPress={() => { if (disabled) return; tap(); onChange(!value); }} disabled={disabled} style={{ opacity: disabled ? 0.45 : 1 }}
      accessibilityRole="switch" accessibilityState={{ checked: value, disabled }} accessibilityLabel={label} hitSlop={6}>
      <Animated.View style={{ width: W, height: H, borderRadius: H / 2, borderWidth: LINE, borderColor: line, direction: 'ltr' } as any}>
        <Animated.View style={{ position: 'absolute', top: GAP, left, width: KNOB, height: KNOB, borderRadius: KNOB / 2, borderWidth: LINE, borderColor: line, backgroundColor: fill }} />
      </Animated.View>
    </Pressable>
  );
}
