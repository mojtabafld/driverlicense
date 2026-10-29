// The floating bar of the exam, the lessons, the practice and the step-by-step pages, drawn like the tab bar of the
// home page (ui/tabs/app-tabs.tsx): the same capsule above the bottom edge (BarSurface), each button an icon over its
// label, the main one (hand in, check, «مطمئنم») on a capsule of its own in the app's colour. Left to right in the
// questions' language (Danish / English): a button at each end and something in the middle (the position).
import { BlurView } from 'expo-blur';
import { GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable } from 'expo-glass-effect';
import { Platform, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RTL } from '@/lib/i18n';
import { Icon, type IconName } from './icon';
import { faNum } from '@/lib/logic';
import { L, T, tap } from './kit';
import { BarApart, BarLight, useBarLight, useContentUnder, useDarkUnder } from './bar-shade';
import { useContext } from 'react';
import { ARC, useColors, useIsDark } from './theme';
import { PALETTE, mix, px, pxa, rgba } from './palette';

// The bar's height, and the room the pages keep for it.
export const BAR_H = 64;
const ITEM_H = BAR_H - 8;

// Apple's own Liquid Glass, where the system has it (iOS 26 and later); elsewhere the bars are flat.
const NATIVE_GLASS = Platform.OS === 'ios' && (() => { try { return isLiquidGlassAvailable() && isGlassEffectAPIAvailable(); } catch { return false; } })();

// The colours of the bars, shared by both: the surface, the chosen / main item's capsule and its colour.
// Liquid Glass (iOS 26+): grey glass, light enough to stay glass and dark enough that the white labels (4.7:1) and the
// chosen item's colour on its capsule (6:1) read well; on the main site's light theme the glass is light (dark
// labels, the theme's deep colour for the chosen / main item) and turns to the grey glass while something dark lies
// under it (ui/bar-shade.tsx), as Liquid Glass does. «سیاه و سفید» (mono): the glass is one step off the cards' colour
// (as the flat bars) with their edge in both themes, the chosen item on a lighter capsule in the dark theme.
// Web, Android and older iPhones: flat, one step off the cards' colour so the bar stands out over them (the theme's
// second surface: lighter in the dark themes, a shade darker than the white cards in the light ones; Mojtaba
// 2026-10-23), with their edge; the chosen item on a capsule a little lighter than the bar in the dark theme, tinted with
// the theme's colour in the light one.
// `scheme`: the glass's own light or dark.
const GRAPHITE = PALETTE === 'graphite', MONO = PALETTE === 'mono' || GRAPHITE;
export function useBarLook() {
  const dark = useIsDark(), light = useBarLight(), apart = useContext(BarApart), c = useColors();
  if (!NATIVE_GLASS) {
    // (The capsule see-through: on the web the tab bar's capsule is a positioned layer drawn over the icon.)
    const base = barBase(c.surface2, dark, apart);
    return {
      dark, light, scheme: (dark ? 'dark' : 'light') as 'dark' | 'light',
      grey: base, solid: base, edge: c.cardBorder,
      capsule: dark ? 'rgba(255,255,255,0.1)' : ARC ? pxa('#2f55d4', 0.12) : 'rgba(31,111,92,0.12)',
      green: dark ? (ARC ? px('#8ea8ff') : '#6fdc7c') : (ARC ? px('#2f55d4') : '#1f6f5c'),
      fg: dark ? '#ffffff' : '#1d1d1d',
      contrast: dark ? mix(base, '#ffffff', 0.1) : ARC ? px('#e6eaf5') : '#e6ede8', // a filled icon's inner lines: the capsule's own colour
    };
  }
  const card = MONO && (light || dark); // (not the grey glass of the light theme over something dark)
  if (light) {
    return {
      dark, light, scheme: 'light' as 'dark' | 'light',
      grey: card ? rgba(c.surface2, 0.74) : 'rgba(255,255,255,0.82)',
      solid: card ? c.surface2 : 'rgba(252,252,252,0.97)',
      edge: card ? c.cardBorder : 'rgba(0,0,0,0.08)',
      capsule: ARC ? pxa('#2f55d4', 0.12) : 'rgba(31,111,92,0.12)',
      green: ARC ? px('#2f55d4') : '#1f6f5c',
      fg: '#1d1d1d',
      contrast: ARC ? px('#e6eaf5') : '#e6ede8',
    };
  }
  return {
    dark, light, scheme: 'dark' as 'dark' | 'light',
    grey: card ? rgba(c.surface2, 0.74) : dark ? (ARC ? pxa('#1e233a', 0.82) : 'rgba(58,58,62,0.78)') : 'rgba(88,88,94,0.84)',
    solid: card ? c.surface2 : dark ? (ARC ? pxa('#1a1e31', 0.97) : 'rgba(52,52,56,0.96)') : 'rgba(84,84,90,0.96)',
    edge: card ? c.cardBorder : 'rgba(255,255,255,0.18)',
    capsule: card ? 'rgba(255,255,255,0.1)' : dark ? 'rgba(0,0,0,0.38)' : 'rgba(30,30,34,0.6)',
    green: (ARC ? (dark ? px('#8ea8ff') : px('#9db3ff')) : '#6fdc7c'),
    fg: '#ffffff',
    contrast: card ? '#2c2d31' : dark ? (ARC ? px('#1a1e31') : '#1f1f20') : '#3f3f43',
  };
}

// The flat bar's colour: the theme's second surface, one step off the cards; `apart` (something of about that colour
// under the bar: bar-shade.tsx useSimilarUnder) two steps further, lighter in the dark themes, darker in the light ones.
const barBase = (surface2: string, dark: boolean, apart: boolean) => (apart ? mix(surface2, dark ? '#ffffff' : '#000000', dark ? 0.08 : 0.06) : surface2);
// Whether the bars take it: while a part of the page lies under them (bar-shade.tsx useContentUnder; the frosted bars'
// shade one step off, Frost `over`).
export function useBarApart() {
  const c = useColors();
  return useContentUnder(true, BAR_H, c.bg);
}

// The shade both bars take: light on the main site's light theme; on Liquid Glass not while something dark lies under
// the bar (a flat bar hides what is under it, so it keeps its shade).
export function useBarShade() {
  const dark = useIsDark(), under = useDarkUnder(NATIVE_GLASS && ARC && !dark, BAR_H);
  return ARC && !dark && !under;
}

// The bars' surface. iOS 26 and later (iOS 27's reworked Liquid Glass and its clear–tinted setting included): Apple's
// own glass (UIGlassEffect, its regular style) in the bar's colour, in the app's light or dark rather than the phone's,
// and lively to the touch as the system's bars are. Web, Android and older iPhones: flat and minimal (Mojtaba
// 2026-10-04, again 2026-10-23): one step off the cards' colour, with a thin line around it; no see-through, blur, sheen or
// shadow.
export function BarSurface({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const look = useBarLook(), over = useContext(BarApart), r = BAR_H / 2;
  if (NATIVE_GLASS) {
    return (
      <GlassView glassEffectStyle="regular" isInteractive tintColor={look.grey} colorScheme={look.scheme} style={[{ borderRadius: r, overflow: 'hidden' }, style]}>
        {children}
      </GlassView>
    );
  }
  // Web, Android and older iPhones: frosted as the tab bar, white in the light theme and black in the dark one (Mojtaba
  // 2026-10-25). (data-bar: left out when the page under the bar is read, bar-shade.tsx)
  return (
    <View {...({ dataSet: { bar: '1' } } as any)} style={[{ borderRadius: r, overflow: 'hidden', borderWidth: 1, borderColor: look.dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)' }, style]}>
      <Frost dark={look.dark} over={over} />
      {children}
    </View>
  );
}

// The bars' frosted ground (the tab bar's and these), under their contents: what is under it blurred, white in the light
// theme and black in the dark one (Android, where blur is not reliable: nearly solid). `over`: a part of the page lies
// under it (useBarApart): one step off, a light grey in the light theme and a dark grey in the dark one, still blurred,
// so the bar stays apart from a card or an answer under it (Mojtaba 2026-10-26).
const ANDROID = Platform.OS === 'android';
const FILL = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as const;
export function Frost({ dark, over }: { dark: boolean; over?: boolean }) {
  const a = ANDROID ? 0.94 : over ? 0.74 : 0.62;
  // («گرافیت»: charcoal, not black, as its page.)
  const tint = dark ? (over ? (GRAPHITE ? `rgba(62,62,62,${a})` : `rgba(46,48,54,${a})`) : GRAPHITE ? `rgba(38,38,38,${a})` : `rgba(0,0,0,${a})`) : (over ? `rgba(226,230,236,${a})` : `rgba(255,255,255,${a})`);
  return (<>
    {ANDROID ? null : <BlurView pointerEvents="none" intensity={40} tint={dark ? 'dark' : 'light'} style={FILL} />}
    <View pointerEvents="none" style={[FILL, { backgroundColor: tint }, Platform.OS === 'web' ? ({ transitionProperty: 'background-color', transitionDuration: '250ms' } as any) : null]} />
  </>);
}


// The capsule itself, floating above the bottom edge (the tab bar and GlassBar).
export function BarShell({ children }: { children: React.ReactNode }) {
  const light = useBarShade(), apart = useBarApart();
  return <BarLight.Provider value={light}><BarApart.Provider value={apart}><Shell>{children}</Shell></BarApart.Provider></BarLight.Provider>;
}
function Shell({ children }: { children: React.ReactNode }) {
  const ins = useSafeAreaInsets();
  const row = { flexDirection: 'row', direction: 'ltr', alignItems: 'center', width: '100%', maxWidth: 440, padding: 4 } as any;
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', bottom: Math.max(16, ins.bottom), left: 0, right: 0, paddingHorizontal: 20, alignItems: 'center' }}>
      <BarSurface style={row}>{children}</BarSurface>
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
      backgroundColor: main ? look.capsule : 'transparent' }}>
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
