// The sign-in page's first screen on the main site and /app (Mojtaba 2026-10-20, after the Saphe app's): the theme
// switch at the top, the app's name, the intro's four subjects as slides (a flat icon in the theme's colour with a
// short line under it, ui/welcome-art.tsx; they turn by themselves, with a swipe or a tap on their dots), then
// «ورود» and «ساخت حساب», each opening the form in that mode (app/login.tsx), and a link to go on as a guest.
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, ScrollView, View, useWindowDimensions, type GestureResponderEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RTL } from '@/lib/i18n';
import { Icon, type IconName } from './icon';
import { L, T, ThemeButton, physical, tap } from './kit';
import { useColors, useIsDark } from './theme';
import { WelcomeAi, WelcomeBank, WelcomeExam, WelcomeProgress } from './welcome-art';
import Svg, { Path } from 'react-native-svg';

// Google's «G», in its four colours, as its sign-in buttons show it.
function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <Path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <Path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <Path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </Svg>
  );
}

const SLIDES = [
  { Art: WelcomeBank, text: 'همه‌ی سؤال‌های آزمون تئوری با ترجمه‌ی فارسی، در جیب شما.' },
  { Art: WelcomeExam, text: 'آزمون ۲۵ سؤالی با زمان‌سنج، درست مثل روز امتحان.' },
  { Art: WelcomeAi, text: 'برای هر سؤال، توضیحی ساده با هوش مصنوعی بگیرید.' },
  { Art: WelcomeProgress, text: 'پیشرفت و احتمال قبولی‌تان را ببینید.' },
];
const EVERY = 4500; // ms on each slide

// A wide button with its icon at the reading side's edge and its label in the middle.
function Wide({ label, icon, primary, onPress, mark }: { label: string; icon?: IconName; primary?: boolean; onPress: () => void; mark?: React.ReactNode }) {
  const c = useColors(), dark = useIsDark();
  const fg = primary ? c.ctaFg : c.text;
  return (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="button"
      style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => ({ height: 54, borderRadius: 16, justifyContent: 'center', alignItems: 'center',
        backgroundColor: primary ? c.cta : dark ? c.surface2 : c.line, opacity: pressed ? 0.85 : hovered ? 0.93 : 1, transform: [{ scale: pressed ? 0.985 : 1 }] })}>
      <View style={{ position: 'absolute', top: 0, bottom: 0, ...physical(RTL ? { right: 18 } : { left: 18 }), justifyContent: 'center' }}>{mark ?? (icon ? <Icon name={icon} size={21} color={fg} /> : null)}</View>
      <T style={{ fontSize: 16.5, fontWeight: '600', color: fg }}>{label}</T>
    </Pressable>
  );
}

// `onGoogle`: «ادامه با گوگل» under the two buttons, while the server has Google sign-in on (Mojtaba 2026-10-21).
export function Welcome({ onLogin, onRegister, onGuest, onGoogle, busy, err }: { onLogin: () => void; onRegister: () => void; onGuest: () => void; onGoogle?: () => void; busy: boolean; err: string }) {
  const c = useColors(), dark = useIsDark(), ins = useSafeAreaInsets(), { width, height } = useWindowDimensions();
  const [i, setI] = useState(0);
  const [fade] = useState(() => new Animated.Value(1));
  const at = useRef(0);
  useEffect(() => { at.current = i; }, [i]);
  const go = (n: number) => {
    const to = (n + SLIDES.length) % SLIDES.length;
    if (to === at.current) return;
    Animated.timing(fade, { toValue: 0, duration: 160, easing: Easing.out(Easing.quad), useNativeDriver: Platform.OS !== 'web' }).start(() => {
      setI(to);
      Animated.timing(fade, { toValue: 1, duration: 280, easing: Easing.out(Easing.cubic), useNativeDriver: Platform.OS !== 'web' }).start();
    });
  };
  // Turns by itself; a swipe or a tap on the dots starts the wait again.
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setTimeout(() => go(at.current + 1), EVERY); return () => clearTimeout(t); }, [i, tick]); // eslint-disable-line react-hooks/exhaustive-deps
  const startX = useRef<number | null>(null);
  const onStart = (e: GestureResponderEvent) => { startX.current = e.nativeEvent.pageX; };
  const onEnd = (e: GestureResponderEvent) => {
    if (startX.current == null) return;
    const dx = e.nativeEvent.pageX - startX.current; startX.current = null;
    if (Math.abs(dx) < 40) return;
    // On to the next slide with a swipe against the reading direction.
    tap(); go(at.current + ((dx < 0) !== RTL ? 1 : -1)); setTick(t => t + 1);
  };
  const { Art, text } = SLIDES[i];
  const art = Math.round(Math.min(width * 0.42, height * 0.17, 180));
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: ins.top + (Platform.OS === 'web' ? 14 : 8), paddingBottom: ins.bottom + 28 }} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, width: '100%', maxWidth: 440, alignSelf: 'center', paddingHorizontal: 24 }}>
        {/* At the top right, as in the reference, in every language. */}
        <View style={{ alignItems: RTL ? 'flex-start' : 'flex-end' }}>
          <View style={{ borderRadius: 22, backgroundColor: c.surface2 }}><ThemeButton /></View>
        </View>
        <L style={{ alignSelf: 'center', textAlign: 'center', marginTop: Math.min(36, height * 0.03), fontSize: 46, lineHeight: 56, fontWeight: '500', letterSpacing: -1.2, color: c.text }}>Teori Prøve</L>
        {/* The slides, in the middle of what is left. */}
        <View onTouchStart={onStart} onTouchEnd={onEnd} style={{ flex: 1, minHeight: art + 150, justifyContent: 'center', alignItems: 'center', gap: 26, paddingVertical: 20 }}>
          <Animated.View style={{ opacity: fade, alignItems: 'center', gap: 22, transform: [{ translateY: fade.interpolate({ inputRange: [0, 1], outputRange: [6, 0] }) }] }}>
            <View style={{ width: art * 1.2, height: art }}><Art fg={c.accent} hole={dark ? c.bg : c.text} /></View>
            <T style={{ textAlign: 'center', fontSize: 17, lineHeight: 28, color: c.text, maxWidth: 320, minHeight: 56 }}>{text}</T>
          </Animated.View>
          <View style={{ flexDirection: 'row', gap: 4, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 99, backgroundColor: c.surface2 }}>
            {SLIDES.map((_, n) => (
              <Pressable key={n} onPress={() => { tap(); go(n); setTick(t => t + 1); }} hitSlop={6} accessibilityRole="button" accessibilityState={{ selected: n === i }}
                style={{ padding: 4 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: n === i ? c.text : c.faint, opacity: n === i ? 1 : dark ? 0.55 : 0.45 }} />
              </Pressable>
            ))}
          </View>
        </View>
        <View style={{ gap: 12 }}>
          <View style={{ alignItems: 'center', gap: 4, marginBottom: 8 }}>
            <T style={{ fontSize: 22, lineHeight: 32, fontWeight: '700', textAlign: 'center' }}>ادامه با حساب کاربری</T>
            <T style={{ fontSize: 15.5, lineHeight: 24, color: c.muted, textAlign: 'center' }}>وارد شوید یا یک حساب تازه بسازید</T>
          </View>
          <Wide primary label="ورود" icon="person" onPress={onLogin} />
          <Wide label="ساخت حساب" icon="personAdd" onPress={onRegister} />
          {onGoogle ? <Wide label="ادامه با گوگل" mark={<GoogleG />} onPress={onGoogle} /> : null}
          {err ? <T style={{ color: c.bad, fontSize: 13.5, textAlign: 'center' }}>{err}</T> : null}
          <Pressable onPress={() => { if (!busy) { tap(); onGuest(); } }} accessibilityRole="link" hitSlop={8} style={{ alignSelf: 'center', paddingVertical: 8, marginTop: 6 }}>
            {({ hovered }: { pressed: boolean; hovered?: boolean }) => (
              <T style={{ color: c.muted, fontSize: 14.5, fontWeight: '500', textDecorationLine: hovered ? 'underline' : 'none' }}>{busy ? '…' : 'ورود به عنوان کاربر مهمان'}</T>
            )}
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
