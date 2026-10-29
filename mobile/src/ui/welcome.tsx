// The sign-in page's first screen on the main site and /app (Mojtaba 2026-10-24, the «night» look he picked of four, in
// place of the one after the Saphe app's): on a night-blue page in every theme, the app's name, its symbol (the road bent
// into a tick) on a glowing tile in the colour theme's accent, a headline and a line, then the ways in (email first, in that accent) and a link to go
// on as a guest. «ادامه با ایمیل» puts «ورود» and «ساخت حساب» in their place (Mojtaba 2026-10-22), each opening the
// steps in that mode (app/login.tsx), with «گزینه‌های دیگر» to go back to the ways in.
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Animated, Easing, Linking, Platform, Pressable, ScrollView, View, useColorScheme, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { API_URL } from '@/lib/config';
import { RTL, UI_LANG, setUiLang, tr } from '@/lib/i18n';
import { LANGS, LANG_FONT, LANG_NAMES } from './lang-wheel';
import { Sheet } from './sheet';
import { VibeCards } from './vibe-cards';
import { Icon, type IconName } from './icon';
import { L, T, physical, physicalAlign, tap, useHeaderTop } from './kit';
import { defaultAccentDark, defaultAccentLight, defaultPalette } from './palette';
import { useColors } from './theme';
import Svg, { Path } from 'react-native-svg';

// «ادامه با اپل»: hidden until there is an Apple Developer account (Mojtaba 2026-10-21); what it still needs is in
// TODO.md («Sign in with Apple»).
const APPLE = false as boolean;
// Apple's apple, for «ادامه با اپل».
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

// The welcome screen's own colours: the night look on a phone in the dark mode, and its day counterpart (light
// blue-grey to white, dark text) in the light mode, as the phone is set, whatever the app's theme (Mojtaba 2026-10-26;
// it was always the night look). Its accent (the tile, «pro», the first button) is the colour theme set as the default in
// DigitalOcean (DEFAULT_THEME), in that theme's dark or light form, whatever this device has picked (Mojtaba 2026-10-24:
// not a fixed amber).
// `road`: the symbol's road white, unless the accent is nearly white itself («سیاه و سفید»): then in the accent's text
// colour.
const roadOn = (accent: string, on: string) => { const h = accent.replace('#', ''); const v = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); return v.every(x => x > 215) ? on : '#ffffff'; };
// (With «گرافیت» the default, its plain charcoal and light greys instead of the blue-greys.)
const DARK = defaultAccentDark(), LIGHT = defaultAccentLight(), GREY = defaultPalette() === 'graphite';
const NIGHT = { dark: true, top: GREY ? '#2a2a2a' : '#1b2a3f', bottom: GREY ? '#141414' : '#0a0f17', ink: '#ffffff', muted: GREY ? '#a3a3a3' : '#9aa6b6', faint: GREY ? '#808080' : '#7d8896', soft: GREY ? '#d4d4d4' : '#cfd6df', accent: DARK.accent, onAccent: DARK.on,
  glass: 'rgba(255,255,255,0.08)', glassEdge: 'rgba(255,255,255,0.14)', road: roadOn(DARK.accent, DARK.on) };
const DAY = { dark: false, top: GREY ? '#e4e4e4' : '#dfe7f1', bottom: GREY ? '#f7f7f7' : '#f7f9fc', ink: GREY ? '#151515' : '#0f1722', muted: GREY ? '#5f5f5f' : '#566273',
  faint: GREY ? '#808080' : '#76808e', soft: GREY ? '#333333' : '#334155', accent: LIGHT.accent, onAccent: LIGHT.on,
  glass: 'rgba(15,23,34,0.05)', glassEdge: 'rgba(15,23,34,0.11)', road: roadOn(LIGHT.accent, LIGHT.on) };
export function useN() { return useColorScheme() === 'dark' ? NIGHT : DAY; }
// The app's symbol (assets/icon-src/symbol.svg): the road bent into a tick, its broken centre line in the tile's colour.
export function RoadTick({ size }: { size: number }) {
  const N = useN();
  const d = 'M268 531 L432 695 L756 329';
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024">
      <Path d={d} fill="none" stroke={N.road} strokeWidth={184} strokeLinecap="round" strokeLinejoin="round" />
      <Path d={d} fill="none" stroke={N.accent} strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="50 50" strokeDashoffset={-20} />
    </Svg>
  );
}

// A wide button with its icon at the reading side's edge and its label in the middle.
// The app's language from the welcome screen (Mojtaba 2026-10-21), beside the theme button: a sheet of the three, each
// in its own language; another one loads the app again in it (lib/i18n.ts setUiLang).
function LangButton() {
  const c = useColors(), N = useN();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable onPress={() => { tap(); setOpen(true); }} hitSlop={8} accessibilityRole="button" accessibilityLabel={tr('زبان برنامه')}
        style={({ pressed }) => ({ width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', backgroundColor: N.glass, borderWidth: 1, borderColor: N.glassEdge, opacity: pressed ? 0.75 : 1 })}>
        <Icon name="translate" size={19} color={N.ink} />
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

// A wide button of the welcome screen; `main`: the first one, in the accent, the others glass on the night page;
// `off`: shown but not usable yet, with «به‌زودی».
function Wide({ label, icon, main, onPress, mark, off }: { label: string; icon?: IconName; main?: boolean; onPress?: () => void; mark?: (fg: string) => React.ReactNode; off?: boolean }) {
  const N = useN(), fg = main ? N.onAccent : N.ink;
  return (
    <Pressable onPress={() => { if (off || !onPress) return; tap(); onPress(); }} accessibilityRole="button" accessibilityState={{ disabled: !!off }}
      style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => ({ height: 54, borderRadius: 18, justifyContent: 'center', alignItems: 'center',
        backgroundColor: main ? N.accent : N.glass, borderWidth: main ? 0 : 1, borderColor: N.glassEdge,
        opacity: off ? 0.45 : pressed ? 0.85 : hovered ? 0.93 : 1, transform: [{ scale: pressed && !off ? 0.985 : 1 }] })}>
      <View style={{ position: 'absolute', top: 0, bottom: 0, ...physical(RTL ? { right: 18 } : { left: 18 }), justifyContent: 'center' }}>{mark ? mark(fg) : icon ? <Icon name={icon} size={21} color={fg} /> : null}</View>
      <T style={{ fontSize: 16.5, fontWeight: main ? '700' : '600', color: fg }}>{label}{off ? <T style={{ fontSize: 13, fontWeight: '500', color: fg }}>{`  · ${tr('به‌زودی')}`}</T> : null}</T>
    </Pressable>
  );
}

// The ways in, as the Saphe app's first screen (Mojtaba 2026-10-21): Apple (hidden for now, APPLE), Google (`onGoogle`, while
// the server has it on; else off) and email (its two choices, then `onEmail` in that mode, ui/sign-steps.tsx), then the
// guest link and the line on the privacy policy.
export function Welcome({ onEmail, onGuest, onGoogle, busy, err, mailFirst }: { onEmail: (mode: 'login' | 'register') => void; mailFirst?: boolean; onGuest: () => void; onGoogle?: () => void; busy: boolean; err: string }) {
  const c = useColors(), ins = useSafeAreaInsets(), { width, height } = useWindowDimensions(), N = useN();
  // The email's choices in place of the ways in, with a short fade (`mailFirst`: back from their steps, they show again).
  const [byMail, setByMail] = useState(!!mailFirst);
  const [ways] = useState(() => new Animated.Value(1));
  const pick = (on: boolean) => {
    ways.setValue(0); setByMail(on);
    Animated.timing(ways, { toValue: 1, duration: 240, easing: Easing.out(Easing.cubic), useNativeDriver: Platform.OS !== 'web' }).start();
  };
  // The browser's top (and the phone's status bar on the web) in the page's top colour.
  useHeaderTop(N.top);
  // The headline's size: as large as the column lets it be on one line, at most 26 (bold Vazirmatn about 0.45 of the
  // size a letter, Inter 0.5).
  const headline = byMail ? 'ادامه با ایمیل' : 'راه قبولی در آزمون تئوری';
  const head = Math.min(26, Math.floor((Math.min(width, 440) - 48) / (tr(headline).length * (UI_LANG === 'fa' ? 0.45 : 0.5))));
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={N.dark ? 'light' : 'dark'} />
      <LinearGradient pointerEvents="none" colors={[N.top, N.bottom, N.bottom]} locations={[0, 0.6, 1]} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: ins.top + (Platform.OS === 'web' ? 14 : 8), paddingBottom: ins.bottom + 16 }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, width: '100%', maxWidth: 440, alignSelf: 'center', paddingHorizontal: 24 }}>
          {/* The language only, at the top; the theme is the phone's (ui/theme.ts useSystemTheme; Mojtaba 2026-10-21). */}
          <View style={{ alignItems: RTL ? 'flex-start' : 'flex-end' }}>
            <LangButton />
          </View>
          {/* The name as a logo: «Teori» large and bold, «pro» on a pill of the accent; left to right in every language. */}
          <View accessible accessibilityRole="header" accessibilityLabel="Teoripro"
            style={{ alignSelf: 'center', flexDirection: 'row', direction: 'ltr', alignItems: 'center', gap: 6, marginTop: Math.min(18, height * 0.015) } as any}>
            <L style={{ fontSize: 42, lineHeight: 52, fontWeight: '800', letterSpacing: -1.6, color: N.ink }}>Teori</L>
            <View style={{ backgroundColor: N.accent, borderRadius: 14, paddingHorizontal: 11, paddingTop: 1, paddingBottom: 3, marginTop: 4 }}>
              <L style={{ fontSize: 30, lineHeight: 38, fontWeight: '800', letterSpacing: -0.6, color: N.onAccent }}>pro</L>
            </View>
          </View>
          {/* The three cards of what the app does, in the middle of what is left (Mojtaba 2026-10-29; it was the symbol
              on its glowing tile). */}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 12, marginHorizontal: -24 }}>
            <VibeCards room={Math.max(200, height - ins.top - ins.bottom - (byMail ? 420 : 500))} />
          </View>
          <Animated.View style={{ gap: 12, opacity: ways, transform: [{ translateY: ways.interpolate({ inputRange: [0, 1], outputRange: [6, 0] }) }] }}>
            <View style={{ alignItems: 'center', gap: 2, marginBottom: 10 }}>
              {/* On one line on every screen: the font as large as the column lets it be. */}
              <T numberOfLines={1} style={{ fontSize: head, lineHeight: Math.round(head * 1.45), fontWeight: '800', textAlign: 'center', color: N.ink }}>{headline}</T>
              <T style={{ fontSize: 14.5, lineHeight: 22, color: N.muted, textAlign: 'center', display: height < 720 ? 'none' : 'flex' }}>{byMail ? 'وارد شوید یا یک حساب تازه بسازید' : 'تمرین مثل آزمون واقعی، با توضیح فارسی'}</T>
            </View>
            {byMail ? <>
              <Wide main label="ورود" icon="login" onPress={() => onEmail('login')} />
              <Wide label="ساخت حساب" icon="personAdd" onPress={() => onEmail('register')} />
              <Pressable onPress={() => { tap(); pick(false); }} accessibilityRole="button" hitSlop={8} style={{ alignSelf: 'center', paddingVertical: 6, marginTop: 2 }}>
                {({ hovered }: { pressed: boolean; hovered?: boolean }) => (
                  <T style={{ color: N.ink, fontSize: 15.5, fontWeight: '600', textDecorationLine: hovered ? 'underline' : 'none' }}>گزینه‌های دیگر</T>
                )}
              </Pressable>
            </> : <>
              <Wide main label="ادامه با ایمیل" icon="mail" onPress={() => pick(true)} />
              {APPLE ? <Wide label="ادامه با اپل" mark={fg => <AppleMark color={fg} />} /> : null}
              <Wide label="ادامه با گوگل" mark={() => <GoogleG />} onPress={onGoogle} off={!onGoogle} />
            </>}
            {err && !byMail ? <T style={{ color: c.bad, fontSize: 13.5, textAlign: 'center' }}>{err}</T> : null}
            {byMail ? null : <Pressable onPress={() => { if (!busy) { tap(); onGuest(); } }} accessibilityRole="link" hitSlop={8} style={{ alignSelf: 'center', paddingVertical: 4, marginTop: 2 }}>
              {({ hovered }: { pressed: boolean; hovered?: boolean }) => (
                <T style={{ color: N.soft, fontSize: 15, fontWeight: '600', textDecorationLine: hovered ? 'underline' : 'none' }}>{busy ? '…' : 'ورود به عنوان کاربر مهمان'}</T>
              )}
            </Pressable>}
            <Pressable onPress={() => { tap(); Linking.openURL(`${API_URL}/privacy?lang=${UI_LANG}`).catch(() => {}); }} accessibilityRole="link" style={{ alignSelf: 'center', marginTop: 2 }}>
              <T style={{ color: N.faint, fontSize: 13, lineHeight: 20, textAlign: 'center' }}>با ادامه، این را می‌پذیرید:</T>
              <T style={{ color: N.ink, fontSize: 13.5, lineHeight: 20, fontWeight: '700', textAlign: 'center' }}>سیاست حفظ حریم خصوصی</T>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
