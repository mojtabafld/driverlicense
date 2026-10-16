// Back from the link in the confirmation email (the server's /api/verify): a small card over the app saying the
// account is active, its tick drawn in with a ring spreading out. On the web the page opens with ?verified=1; on an
// Android phone with the app installed the link opens the app as teoriprove://verified?ok=1 (app/verified.tsx).
import * as Haptics from 'expo-haptics';
import * as Linking from 'expo-linking';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Modal, Platform, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useApp } from '@/lib/store';
import { Button, T } from './kit';
import { useColors } from './theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const native = Platform.OS !== 'web';
const CHECK = 'M14 27 L23 36 L40 18', CHECK_LEN = 38;

const fromWeb = () => {
  return Platform.OS === 'web' && typeof window !== 'undefined' && /[?&]verified=1\b/.test(window.location.search);
};

export function VerifiedPopup() {
  const c = useColors();
  const { refresh } = useApp();
  const [open, setOpen] = useState(fromWeb);
  const url = Linking.useURL(), seen = useRef<string | null>(null);
  useEffect(() => {
    if (!native || !url || seen.current === url || !/verified\/?\?ok=1\b/.test(url)) return;
    seen.current = url; setOpen(true);
  }, [url]);

  const pop = useRef(new Animated.Value(0)).current, ring = useRef(new Animated.Value(0)).current;
  const draw = useRef(new Animated.Value(0)).current, text = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!open) return;
    refresh().catch(() => {});
    // So a reload does not show it again (after the router has read the address).
    if (!native) setTimeout(() => { if (/[?&]verified=1\b/.test(window.location.search)) window.history.replaceState(null, '', window.location.pathname); }, 500);
    if (native) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    [pop, ring, draw, text].forEach(v => v.setValue(0));
    // The circle springs in; the tick draws itself while it settles, a ring spreads out, then the text rises.
    Animated.parallel([
      Animated.spring(pop, { toValue: 1, friction: 5, tension: 120, delay: 150, useNativeDriver: native }),
      Animated.timing(draw, { toValue: 1, duration: 420, delay: 380, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
      Animated.timing(ring, { toValue: 1, duration: 900, delay: 330, easing: Easing.out(Easing.quad), useNativeDriver: native }),
      Animated.timing(text, { toValue: 1, duration: 420, delay: 520, easing: Easing.out(Easing.cubic), useNativeDriver: native }),
    ]).start();
  }, [open, refresh, pop, ring, draw, text]);

  if (!open) return null;
  const S = 84;
  return (
    <Modal transparent visible animationType="fade" statusBarTranslucent onRequestClose={() => setOpen(false)}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: 'rgba(0,0,0,0.45)' }}>
        <View style={{ width: '100%', maxWidth: 340, alignItems: 'center', gap: 6, paddingTop: 30, paddingBottom: 20, paddingHorizontal: 22,
          borderRadius: 26, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line }}>
          <View style={{ width: S, height: S, alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
            <Animated.View style={{ position: 'absolute', width: S, height: S, borderRadius: S / 2, borderWidth: 2, borderColor: c.ok,
              opacity: ring.interpolate({ inputRange: [0, 0.1, 1], outputRange: [0, 0.6, 0] }), transform: [{ scale: ring.interpolate({ inputRange: [0, 1], outputRange: [1, 1.7] }) }] }} />
            <Animated.View style={{ width: S, height: S, borderRadius: S / 2, alignItems: 'center', justifyContent: 'center', backgroundColor: c.okSoft,
              borderWidth: 2, borderColor: c.ok, opacity: pop.interpolate({ inputRange: [0, 0.3], outputRange: [0, 1], extrapolate: 'clamp' }), transform: [{ scale: pop }] }}>
              <Svg width={54} height={54} viewBox="0 0 54 54">
                <AnimatedPath d={CHECK} stroke={c.ok} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none"
                  strokeDasharray={`${CHECK_LEN}`} strokeDashoffset={draw.interpolate({ inputRange: [0, 1], outputRange: [CHECK_LEN, 0] })} />
              </Svg>
            </Animated.View>
          </View>
          <Animated.View style={{ alignItems: 'center', gap: 6, alignSelf: 'stretch', opacity: text,
            transform: [{ translateY: text.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }] }}>
            <T style={{ fontSize: 19, fontWeight: '800', textAlign: 'center' }}>حساب شما فعال شد</T>
            <T style={{ fontSize: 14, lineHeight: 23, color: c.muted, textAlign: 'center' }}>ایمیل شما تأیید شد و حساب شما آماده است.</T>
            <View style={{ alignSelf: 'stretch', marginTop: 14 }}>
              <Button big label="ادامه" onPress={() => setOpen(false)} style={native ? undefined : ({ outlineStyle: 'none' } as object)} />
            </View>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
}
