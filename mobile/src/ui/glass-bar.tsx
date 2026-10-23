// The floating bar of the exam, the lessons, the practice and the step-by-step pages, drawn like the tab bar of the
// home page (ui/tabs/app-tabs.tsx): the same glass capsule above the bottom edge (BarGlass), each button an icon over
// its label, the main one (hand in, check, «مطمئنم») on a capsule of its own in the app's colour. Left to right in the
// questions' language (Danish / English): a button at each end and something in the middle (the position).
import { BlurView } from 'expo-blur';
import { GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable } from 'expo-glass-effect';
import { LinearGradient } from 'expo-linear-gradient';
import type { RefObject } from 'react';
import { Platform, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RTL } from '@/lib/i18n';
import { Icon, type IconName } from './icon';
import { faNum } from '@/lib/logic';
import { L, T, tap } from './kit';
import { BarLight, useBarLight, useDarkUnder } from './bar-shade';
import { BLUR_ANDROID, useBarBackdrop } from './glass-area';
import { ARC, useColors, useIsDark } from './theme';
import { PALETTE, px, pxa, rgba } from './palette';

// The bar's height, and the room the pages keep for it.
export const BAR_H = 64;
const ITEM_H = BAR_H - 8;

// The colours of the tab bar, shared by both bars: the glass, the chosen / main item's capsule and its green. Light
// enough to stay glass, dark enough that the white labels (4.7:1) and the chosen item's green on its capsule (6:1) read
// well in both themes; the same green in both, whatever the app's colour.
// On the main site's light theme the glass is light (white glass, dark labels, the deep green of the theme for the
// chosen / main item) and turns to the grey glass while something dark lies under it (ui/bar-shade.tsx), as Liquid
// Glass does.
// «سیاه و سفید» (mono): in both themes the glass is the cards' own colour with their edge (Mojtaba 2026-10-23); in the
// dark theme its chosen item sits on a lighter capsule, as on iOS.
// `scheme`: the glass's own light or dark; `sheen`, `rim`, `shadow` and `pillRim` (the capsule's rim): the drawn glass
// (BarGlass).
const MONO = PALETTE === 'mono';
export function useBarLook() {
  const dark = useIsDark(), light = useBarLight(), c = useColors();
  const card = MONO && (light || dark); // (not the grey glass of the light theme over something dark)
  const glass = light
    ? { scheme: 'light' as const, sheen: 'rgba(255,255,255,0.6)', rim: 'inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(255,255,255,0.45)',
      shadow: '0 10px 28px -10px rgba(0,0,0,0.24), 0 1px 3px rgba(0,0,0,0.06)', pillRim: 'inset 0 1px 0 rgba(255,255,255,0.55)' }
    : { scheme: 'dark' as const, sheen: 'rgba(255,255,255,0.09)', rim: 'inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(255,255,255,0.05)',
      shadow: '0 12px 30px -8px rgba(0,0,0,0.6)', pillRim: 'inset 0 1px 0 rgba(255,255,255,0.1)' };
  if (light) {
    return {
      dark, light, ...glass,
      grey: card ? rgba(c.surface, 0.74) : 'rgba(255,255,255,0.82)',
      solid: card ? c.surface : 'rgba(252,252,252,0.97)',
      capsule: ARC ? pxa('#2f55d4', 0.12) : 'rgba(31,111,92,0.12)',
      green: ARC ? px('#2f55d4') : '#1f6f5c',
      fg: '#1d1d1d',
      edge: card ? c.cardBorder : 'rgba(0,0,0,0.08)',
      contrast: ARC ? px('#e6eaf5') : '#e6ede8',
    };
  }
  return {
    dark, light, ...glass,
    grey: card ? rgba(c.surface, 0.74) : dark ? (ARC ? pxa('#1e233a', 0.82) : 'rgba(58,58,62,0.78)') : 'rgba(88,88,94,0.84)',
    solid: card ? c.surface : dark ? (ARC ? pxa('#1a1e31', 0.97) : 'rgba(52,52,56,0.96)') : 'rgba(84,84,90,0.96)', // where nothing blurs
    capsule: card ? 'rgba(255,255,255,0.1)' : dark ? 'rgba(0,0,0,0.38)' : 'rgba(30,30,34,0.6)',
    green: (ARC ? (dark ? px('#8ea8ff') : px('#9db3ff')) : '#6fdc7c'),
    fg: '#ffffff',
    edge: card ? c.cardBorder : 'rgba(255,255,255,0.18)',
    contrast: card ? '#2c2d31' : dark ? (ARC ? px('#1a1e31') : '#1f1f20') : '#3f3f43', // a filled icon's inner lines: the capsule's own colour
  };
}

// The shade both bars take: light on the main site's light theme unless something dark lies under the bar.
export function useBarShade() {
  const dark = useIsDark(), under = useDarkUnder(ARC && !dark, BAR_H);
  return ARC && !dark && !under;
}

// Apple's own Liquid Glass, where the system has it (iOS 26 and later).
const NATIVE_GLASS = Platform.OS === 'ios' && (() => { try { return isLiquidGlassAvailable() && isGlassEffectAPIAvailable(); } catch { return false; } })();
const WEB_BLUR = { backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  transitionProperty: 'border-color, box-shadow', transitionDuration: '220ms' } as any;
const WEB_FADE = { transitionProperty: 'background-color', transitionDuration: '220ms' } as any;

// The bars' glass. On iOS 26 and later (iOS 27's reworked Liquid Glass and its clear–tinted setting included) it is
// Apple's own glass (UIGlassEffect, its regular style) in the bar's colour, in the app's light or dark rather than the
// phone's, and lively to the touch as the system's bars are. Elsewhere a drawn Liquid Glass: what lies under the bar
// blurred (the web's backdrop blur, Android 12+'s blur of the page behind it (ui/glass-area.tsx), older iPhones' own
// blur), the bar's colour over it, a soft sheen from the top, a rim of light along the edge and a soft shadow; where
// nothing blurs (older Android) the colour is solid. `backdrop`: what the tab bar blurs on Android (a page's bar finds
// its own).
export function BarGlass({ children, style, backdrop }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; backdrop?: RefObject<View | null> | null }) {
  const look = useBarLook(), page = useBarBackdrop(), r = BAR_H / 2;
  if (NATIVE_GLASS) {
    return (
      <GlassView glassEffectStyle="regular" isInteractive tintColor={look.grey} colorScheme={look.scheme} style={[{ borderRadius: r, overflow: 'hidden' }, style]}>
        {children}
      </GlassView>
    );
  }
  const web = Platform.OS === 'web', target = backdrop ?? page;
  const blurAndroid = BLUR_ANDROID && !!target, blurIOS = Platform.OS === 'ios';
  return (
    <View style={[{ borderRadius: r, borderWidth: 1, borderColor: look.edge, boxShadow: look.shadow }, web ? WEB_BLUR : null, style]}>
      <View pointerEvents="none" style={[StyleSheet.absoluteFill, { borderRadius: r - 1, overflow: 'hidden' }]}>
        {blurAndroid ? <BlurView blurTarget={target ?? undefined} blurMethod="dimezisBlurViewSdk31Plus" intensity={40} blurReductionFactor={2} tint={look.scheme} style={StyleSheet.absoluteFill} /> : null}
        {blurIOS ? <BlurView intensity={60} tint={look.scheme} style={StyleSheet.absoluteFill} /> : null}
        <View style={[StyleSheet.absoluteFill, { backgroundColor: web || blurAndroid || blurIOS ? look.grey : look.solid }, web ? WEB_FADE : null]} />
        <LinearGradient colors={[look.sheen, 'rgba(255,255,255,0)']} locations={[0, 0.6]} style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, { borderRadius: r - 1, boxShadow: look.rim }]} />
      </View>
      {children}
    </View>
  );
}

// The capsule itself, floating above the bottom edge (the tab bar and GlassBar).
export function BarShell({ children }: { children: React.ReactNode }) {
  const light = useBarShade();
  return <BarLight.Provider value={light}><Shell>{children}</Shell></BarLight.Provider>;
}
function Shell({ children }: { children: React.ReactNode }) {
  const ins = useSafeAreaInsets();
  const row = { flexDirection: 'row', direction: 'ltr', alignItems: 'center', width: '100%', maxWidth: 440, padding: 4 } as any;
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', bottom: Math.max(16, ins.bottom), left: 0, right: 0, paddingHorizontal: 20, alignItems: 'center' }}>
      <BarGlass style={row}>{children}</BarGlass>
    </View>
  );
}

// One item of a bar: an icon over its label, white; `main`: on the darker capsule, in green (the tab bar's chosen tab).
// `ltr`: a label read left to right (a position, «۷ / ۲۵»).
// `latin`: the label in the Latin font (Inter) and its digits, e.g. the question count «3 / 25» on the main site.
export function BarItem({ icon, label, main, filled, dim, ltr, latin, children }: { icon?: IconName; label: string; main?: boolean; filled?: boolean; dim?: boolean; ltr?: boolean;
  latin?: boolean; children?: React.ReactNode }) {
  const look = useBarLook();
  const color = main ? look.green : look.fg;
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2, height: ITEM_H, borderRadius: ITEM_H / 2, overflow: 'hidden', opacity: dim ? 0.4 : 1,
      backgroundColor: main ? look.capsule : 'transparent', boxShadow: main ? look.pillRim : undefined }}>
      {children ?? (icon ? <Icon name={icon} size={24} color={color} filled={filled} contrast={look.contrast} /> : null)}
      {latin
        ? <L style={{ fontSize: 11, lineHeight: 15, textAlign: 'center', fontWeight: '600', color }} numberOfLines={1}>{label}</L>
        : <T style={{ fontSize: 11, lineHeight: 15, textAlign: 'center', fontWeight: '600', color, writingDirection: ltr ? 'ltr' : undefined }} numberOfLines={1}>{label}</T>}
    </View>
  );
}

// Without `start` or `end`, the middle (e.g. two answers) takes their room too. The way out is the page's ✕ at the top,
// never a button of the bar. `rtl` (the learning pages, read in Persian): `start` (previous) on the right and `end`
// (next) on the left; the arrows are the caller's (see navIcons).
export function GlassBar({ start, middle, end, rtl }: { start?: React.ReactNode; middle: React.ReactNode; end?: React.ReactNode; rtl?: boolean }) {
  const first = rtl ? end : start, second = rtl ? start : end;
  return (
    <BarShell>
      {first ? <View style={{ flex: 1 }}>{first}</View> : null}
      <View style={{ flex: 2, flexDirection: 'row', gap: 4 }}>{middle}</View>
      {second ? <View style={{ flex: 1 }}>{second}</View> : null}
    </BarShell>
  );
}
// (Found among a page's children by Backdrop and GlassArea, which on Android keep it out of what it blurs.)
GlassBar.glassBar = true;
// The previous / next arrows, pointing the way the pages turn.
// (Icons are mirrored in English and Danish (ui/icon.tsx), so there the names are given as in Persian.)
export const navIcons = (rtl?: boolean) => (!!rtl === RTL ? { prev: 'arrowRight', next: 'arrowLeft' } : { prev: 'arrowLeft', next: 'arrowRight' }) as { prev: IconName; next: IconName };

// The position in the middle of the bar (Persian digits) over what is counted, e.g. «قدم» or «سؤال».
export function BarCount({ n, of, label }: { n: number; of: number; label: string }) {
  const look = useBarLook();
  return (
    <View style={{ flex: 1 }}>
      <BarItem label={label}>
        <T style={{ fontSize: 18, lineHeight: 24, color: look.fg, fontWeight: '700', textAlign: 'center', writingDirection: 'ltr' }}>{faNum(n)} / {faNum(of)}</T>
      </BarItem>
    </View>
  );
}

// A button of the bar, as an item of the tab bar: pale when it cannot be used. `submit` (hand in, check, finish): the
// main one, on the darker capsule in green.
export function FootBtn({ label, onPress, disabled, submit, icon }: { label: string; onPress: () => void; disabled?: boolean; submit?: boolean; icon: IconName }) {
  return (
    <Pressable disabled={disabled} onPress={() => { tap(); onPress(); }} accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled }}
      style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.8 : 1 })}>
      <BarItem icon={icon} label={label} main={submit} filled={submit} dim={disabled} />
    </Pressable>
  );
}
