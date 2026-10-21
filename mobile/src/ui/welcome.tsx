// The sign-in page's first screen on the main site and /app (Mojtaba 2026-10-20, after the Saphe app's): the theme
// switch at the top, the app's name, the intro's four subjects as slides (a flat icon in the theme's colour with a
// short line under it, ui/welcome-art.tsx; they turn by themselves, with a swipe or a tap on their dots), then
// «ورود» and «ساخت حساب», each opening the form in that mode (app/login.tsx), and a link to go on as a guest.
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Linking, Platform, Pressable, ScrollView, View, useWindowDimensions, type GestureResponderEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { API_URL } from '@/lib/config';
import { RTL, UI_LANG, setUiLang, tr } from '@/lib/i18n';
import { LANGS, LANG_FONT, LANG_NAMES } from './lang-wheel';
import { Sheet } from './sheet';
import { Icon, type IconName } from './icon';
import { L, T, ThemeButton, physical, physicalAlign, tap } from './kit';
import { useColors, useIsDark } from './theme';
import { WelcomeAi, WelcomeBank, WelcomeExam, WelcomeProgress } from './welcome-art';
import Svg, { Path } from 'react-native-svg';

// Apple's apple, for «ادامه با اپل» (kept off for now; Mojtaba 2026-10-21).
function AppleMark({ size = 20, color }: { size?: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path fill={color} d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </Svg>
  );
}

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
// The app's language from the welcome screen (Mojtaba 2026-10-21), beside the theme button: a sheet of the three, each
// in its own language; another one loads the app again in it (lib/i18n.ts setUiLang).
function LangButton() {
  const c = useColors();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable onPress={() => { tap(); setOpen(true); }} hitSlop={8} accessibilityRole="button" accessibilityLabel={tr('زبان برنامه')}
        style={({ pressed }) => ({ width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2, opacity: pressed ? 0.75 : 1 })}>
        <Icon name="translate" size={19} color={c.text} />
      </Pressable>
      <Sheet open={open} onClose={() => setOpen(false)}>
        <View style={{ gap: 10, paddingHorizontal: 4 }}>
          <T style={{ fontSize: 18, lineHeight: 26, fontWeight: '700' }}>زبان برنامه</T>
          {LANGS.map(l => {
            const on = l === UI_LANG;
            return (
              <Pressable key={l} onPress={() => { tap(); setOpen(false); if (!on) setUiLang(l); }} accessibilityRole="button" accessibilityState={{ selected: on }}
                style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, height: 56, paddingHorizontal: 16, borderRadius: 16,
                  backgroundColor: on ? c.accentSoft : c.surface2, opacity: pressed ? 0.8 : 1 })}>
                <T raw style={{ flex: 1, fontSize: 17, fontFamily: LANG_FONT(l, on ? 700 : 500), fontWeight: 'normal', color: c.text, writingDirection: l === 'fa' ? 'rtl' : 'ltr', textAlign: physicalAlign(RTL ? 'right' : 'left') }}>{LANG_NAMES[l]}</T>
                {on ? <Icon name="checkCircle" size={20} color={c.link} /> : null}
              </Pressable>
            );
          })}
        </View>
      </Sheet>
    </>
  );
}

// A wide button of the welcome screen; `light`: the first one, in the text's colour on the page (as the reference's
// Apple button); `off`: shown but not usable yet, with «به‌زودی».
function Wide({ label, icon, light, onPress, mark, off }: { label: string; icon?: IconName; light?: boolean; onPress?: () => void; mark?: (fg: string) => React.ReactNode; off?: boolean }) {
  const c = useColors(), dark = useIsDark();
  const fg = light ? c.bg : c.text;
  return (
    <Pressable onPress={() => { if (off || !onPress) return; tap(); onPress(); }} accessibilityRole="button" accessibilityState={{ disabled: !!off }}
      style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => ({ height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center',
        backgroundColor: light ? c.text : dark ? c.surface2 : c.line, opacity: off ? 0.45 : pressed ? 0.85 : hovered ? 0.93 : 1, transform: [{ scale: pressed && !off ? 0.985 : 1 }] })}>
      <View style={{ position: 'absolute', top: 0, bottom: 0, ...physical(RTL ? { right: 18 } : { left: 18 }), justifyContent: 'center' }}>{mark ? mark(fg) : icon ? <Icon name={icon} size={21} color={fg} /> : null}</View>
      <T style={{ fontSize: 16.5, fontWeight: '600', color: fg }}>{label}{off ? <T style={{ fontSize: 13, fontWeight: '500', color: fg }}>{`  · ${tr('به‌زودی')}`}</T> : null}</T>
    </Pressable>
  );
}

// The three ways in, as the Saphe app's first screen (Mojtaba 2026-10-21): Apple (off for now), Google (`onGoogle`, while
// the server has it on; else off) and email (`onEmail`: one flow for signing in and up, ui/sign-steps.tsx), then the
// guest link and the line on the privacy policy.
export function Welcome({ onEmail, onGuest, onGoogle, busy, err }: { onEmail: () => void; onGuest: () => void; onGoogle?: () => void; busy: boolean; err: string }) {
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
  const art = Math.round(Math.min(width * 0.42, height * 0.14, 160));   // (three ways in under it now: a little smaller)
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: ins.top + (Platform.OS === 'web' ? 14 : 8), paddingBottom: ins.bottom + 16 }} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, width: '100%', maxWidth: 440, alignSelf: 'center', paddingHorizontal: 24 }}>
        {/* At the top right, as in the reference, in every language. */}
        {/* The language beside it, the theme in the corner (a right-to-left row starts on the right). */}
        <View style={{ flexDirection: 'row', gap: 8, justifyContent: RTL ? 'flex-start' : 'flex-end' }}>
          {RTL ? <View style={{ borderRadius: 22, backgroundColor: c.surface2 }}><ThemeButton /></View> : <LangButton />}
          {RTL ? <LangButton /> : <View style={{ borderRadius: 22, backgroundColor: c.surface2 }}><ThemeButton /></View>}
        </View>
        <L style={{ alignSelf: 'center', textAlign: 'center', marginTop: Math.min(24, height * 0.02), fontSize: 42, lineHeight: 52, fontWeight: '500', letterSpacing: -1.2, color: c.text }}>Teori Prøve</L>
        {/* The slides, in the middle of what is left. */}
        <View onTouchStart={onStart} onTouchEnd={onEnd} style={{ flex: 1, minHeight: art + 130, justifyContent: 'center', alignItems: 'center', gap: 18, paddingVertical: 10 }}>
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
        <View style={{ gap: 10 }}>
          <View style={{ alignItems: 'center', gap: 2, marginBottom: 6 }}>
            <T style={{ fontSize: 20, lineHeight: 29, fontWeight: '700', textAlign: 'center' }}>سفرتان را با TeoriPrøve شروع کنید</T>
            <T style={{ fontSize: 14.5, lineHeight: 22, color: c.muted, textAlign: 'center' }}>آماده‌ی آزمون تئوری، مطمئن پشت فرمان.</T>
          </View>
          <Wide light off label="ادامه با اپل" mark={fg => <AppleMark color={fg} />} />
          <Wide label="ادامه با گوگل" mark={() => <GoogleG />} onPress={onGoogle} off={!onGoogle} />
          <Wide label="ادامه با ایمیل" icon="mail" onPress={onEmail} />
          {err ? <T style={{ color: c.bad, fontSize: 13.5, textAlign: 'center' }}>{err}</T> : null}
          <Pressable onPress={() => { if (!busy) { tap(); onGuest(); } }} accessibilityRole="link" hitSlop={8} style={{ alignSelf: 'center', paddingVertical: 4, marginTop: 2 }}>
            {({ hovered }: { pressed: boolean; hovered?: boolean }) => (
              <T style={{ color: c.muted, fontSize: 14.5, fontWeight: '500', textDecorationLine: hovered ? 'underline' : 'none' }}>{busy ? '…' : 'ورود به عنوان کاربر مهمان'}</T>
            )}
          </Pressable>
          <Pressable onPress={() => { tap(); Linking.openURL(`${API_URL}/privacy?lang=${UI_LANG}`).catch(() => {}); }} accessibilityRole="link" style={{ alignSelf: 'center', marginTop: 2 }}>
            <T style={{ color: c.muted, fontSize: 13, lineHeight: 20, textAlign: 'center' }}>با ادامه، این را می‌پذیرید:</T>
            <T style={{ color: c.text, fontSize: 13.5, lineHeight: 20, fontWeight: '700', textAlign: 'center' }}>سیاست حفظ حریم خصوصی</T>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
