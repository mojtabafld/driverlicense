// Small building blocks shared by all screens, styled like the web site.
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Animated, Easing, Platform, Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type TextProps, type TextStyle, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { daFamily, faFamily } from './fonts';
import { Icon, type IconName } from './icon';
import { Glass } from './glass';
import { DA_FONT, UBER, radius, useColors, useTheme } from './theme';

// A style given in physical left/right terms. Phones running right-to-left swap left and right in styles,
// the web does not; this keeps "left" meaning the left edge on both.
export function physical<S extends Record<string, any>>(style: S): S {
  if (Platform.OS === 'web') return style;
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(style)) out[k.replace(/Left|Right|left|right/, w => ({ Left: 'Right', Right: 'Left', left: 'right', right: 'left' } as any)[w])] = v;
  return out as S;
}

// A text alignment given as the physical edge. On phones a right-to-left layout swaps textAlign's left and right (like
// the styles physical() fixes), so there it is given swapped; for text laid out right to left only.
export function physicalAlign<A extends TextStyle['textAlign']>(a: A): A {
  if (Platform.OS === 'web') return a;
  return (a === 'left' ? 'right' : a === 'right' ? 'left' : a) as A;
}

export const tap = () => { if (Platform.OS !== 'web') Haptics.selectionAsync().catch(() => {}); };

// The light motion of Uber Eats between screens, the same on every platform:
// - tab: a page whose tab is chosen comes in with a quick fade and a short rise;
// - push: an inner page (mistakes, account, a past exam) slides in from the side and fades in, and slides back out
//   when left with its back button; the page returned to comes in from the other side;
// - sheet: the exam comes up from the bottom when it starts and goes back down when it is left.
// On phones the native stack already moves pushed pages and the exam, so there only the fade of a tab plays.
export type Motion = 'tab' | 'push' | 'sheet';
let goingBack = false; // set by leave(): the next page shown is the one returned to
export function usePageMotion(motion: Motion) {
  const [v] = useState(() => new Animated.Value(0));
  const [from, setFrom] = useState<1 | -1>(1);
  const own = motion === 'tab' || Platform.OS === 'web';
  useFocusEffect(useCallback(() => {
    const back = goingBack; goingBack = false;
    if (!own) { v.setValue(1); return; }
    setFrom(back ? -1 : 1);
    v.setValue(0);
    Animated.timing(v, { toValue: 1, duration: motion === 'sheet' ? 320 : 260, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [v, own, motion]));
  // Play the way out, then go (`then`, e.g. router.back()); on phones the native stack moves the page itself.
  const leave = useCallback((then: () => void) => {
    goingBack = true;
    if (Platform.OS !== 'web' || motion === 'tab') { then(); return; }
    setFrom(1);
    Animated.timing(v, { toValue: 0, duration: 200, easing: Easing.in(Easing.cubic), useNativeDriver: true }).start(() => then());
  }, [v, motion]);
  // Right to left: a new page comes in from the left (and goes back out there), as Persian reads.
  const shift = motion === 'sheet' ? { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [70, 0] }) }
    : motion === 'push' ? { translateX: v.interpolate({ inputRange: [0, 1], outputRange: [-36 * from, 0] }) }
    : { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) };
  const style = { flex: 1, opacity: motion === 'sheet' ? v.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }) : v, transform: [shift] };
  return { style, leave };
}

// Each part of a page coming in on its own: a fade and a 12px rise (320 ms). Parts that appear together come one after
// another (55 ms apart, at most 8 steps), so a page builds up from the top, as in Uber Eats.
let enterSeq = 0, enterReset: ReturnType<typeof setTimeout> | null = null;
function nextEnterDelay() {
  const d = Math.min(enterSeq, 8) * 55;
  enterSeq++;
  if (enterReset) clearTimeout(enterReset);
  enterReset = setTimeout(() => { enterSeq = 0; }, 120);
  return d;
}
export function useEnter() {
  const [v] = useState(() => new Animated.Value(0));
  useEffect(() => {
    Animated.timing(v, { toValue: 1, duration: 320, delay: nextEnterDelay(), easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [v]);
  return { opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] };
}
// A part of a page that comes in with useEnter; `style` for its place in the layout (e.g. a width).
export function Enter({ children, style }: { children?: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const anim = useEnter();
  return <Animated.View style={[style, anim] as any}>{children}</Animated.View>;
}

// A tab page's content coming in (see usePageMotion).
export function PageIn({ children, motion = 'tab' }: { children?: React.ReactNode; motion?: Motion }) {
  const { style } = usePageMotion(motion);
  return <Animated.View style={style as any}>{children}</Animated.View>;
}

// Page background: the site's bg colour as a very soft gradient (lighter at the top), in both themes. `anim`: the
// style from usePageMotion, for the page's content.
export function Backdrop({ children, anim }: { children?: React.ReactNode; anim?: object }) {
  const c = useColors();
  return (
    <View style={{ flex: 1, overflow: 'hidden', backgroundColor: c.bg }}>
      <LinearGradient colors={c.bgGradient} locations={[0, 0.45, 1]} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={StyleSheet.absoluteFill} />
      {anim ? <Animated.View style={anim as any}>{children}</Animated.View> : children}
    </View>
  );
}

// The site's logo: a rounded navy square with a speedometer.
export function Logo({ size = 28 }: { size?: number }) {
  const c = useColors();
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Rect x={2} y={2} width={28} height={28} rx={9} fill={c.accent} />
      <Path d="M9 20.5c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <Circle cx={16} cy={20.5} r={2.2} fill="#fff" />
      <Path d="M16 20.5l3.2-3.8" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" />
    </Svg>
  );
}

// Light / dark switch, like the site's moon button in its top bar (sets a fixed mode; «خودکار» is in the settings).
export function ThemeButton() {
  const c = useColors(), { theme, setMode } = useTheme(), dark = theme === 'dark';
  return (
    <Pressable onPress={() => { tap(); setMode(dark ? 'light' : 'dark'); }} hitSlop={8} accessibilityRole="button" accessibilityLabel="تغییر تم"
      style={({ pressed }) => ({ width: 38, height: 38, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.surface2 : 'transparent' })}>
      {dark ? <Icon name="sun" size={20} color={c.text} /> : <Icon name="moon" size={19} color={c.muted} />}
    </Pressable>
  );
}

// Top bar with the TeoriPrøve brand and the theme button, in the page's own background so it reads as one surface.
export function TopBar({ right }: { right?: React.ReactNode }) {
  const c = useColors(), ins = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: ins.top + 6 }}>
      <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, maxWidth: 980, width: '100%', alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, direction: 'ltr' } as ViewStyle}>
          {/* The logo first in the page's reading order: at the outer (right) edge, the name inside it. */}
          {/* uber: «Teori» in the text colour and «Prøve» in the accent, like «Uber Eats» */}
          <Text style={{ fontFamily: DA_FONT, fontSize: 18, color: c.link }}>
            <Text style={{ fontWeight: '700', color: UBER ? c.text : c.link }}>Teori</Text>Prøve
          </Text>
          <Logo />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>{right}<ThemeButton /></View>
      </View>
    </View>
  );
}

// Scrollable tab screen: the page heading (with the theme switch beside it; no app name or logo, so the page has the
// room) and the content; leaves room for the tab bar.
// With `fill` the screen does not scroll: its content gets exactly the height between the title and the tab bar
// (the floating bar on the web, the system bar on phones, which the bottom safe area already covers), and `gap`
// can be set tighter for short screens.
export function Screen({ title, subtitle, children, right, fill, gap = 14 }: { title: string; subtitle?: string; children: React.ReactNode; right?: React.ReactNode; fill?: boolean; gap?: number }) {
  const c = useColors(), ins = useSafeAreaInsets();
  const box = { paddingTop: ins.top + (Platform.OS === 'web' ? 18 : 10), paddingHorizontal: 16, gap, maxWidth: 980, width: '100%', alignSelf: 'center' } as const;
  const head = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 2 }}>
      <View style={{ flex: 1 }}>
        <T style={{ fontSize: 26, lineHeight: 34, fontWeight: '700', color: c.text }}>{title}</T>
        {subtitle ? <T style={{ color: c.muted, fontSize: 14, lineHeight: 22 }}>{subtitle}</T> : null}
      </View>
      {right}
      <ThemeButton />
    </View>
  );
  return (
    <Backdrop>
      <PageIn>
      {fill
        ? <View style={[box, { flex: 1, paddingBottom: Platform.OS === 'web' ? 80 + Math.max(16, ins.bottom) : ins.bottom + 10 }]}>{head}{children}</View>
        : <ScrollView contentInsetAdjustmentBehavior="never" showsVerticalScrollIndicator={false} contentContainerStyle={[box, { paddingBottom: ins.bottom + 100 }]}>{head}{children}</ScrollView>}
      </PageIn>
    </Backdrop>
  );
}

// Persian text (right to left).
// Set in Vazirmatn; the weight picks the font file, so fontWeight itself is reset (no faux bold).
export function T({ style, ...p }: TextProps & { style?: StyleProp<TextStyle> }) {
  const c = useColors();
  const flat = StyleSheet.flatten(style) ?? {};
  const font = flat.fontFamily ? null : { fontFamily: faFamily(flat.fontWeight), fontWeight: 'normal' as const };
  // On phones the text is laid out right to left wherever it sits (also in a row set to 'ltr'), so its alignment,
  // the physical edge as on the web, is always swapped the same way.
  const side = Platform.OS === 'web' ? null : { direction: 'rtl' as const, textAlign: physicalAlign(flat.textAlign ?? 'right') };
  return <Text {...p} style={[{ color: c.text, fontSize: 15, lineHeight: 24, writingDirection: 'rtl', textAlign: 'right' }, style, font, side]} />;
}
// Danish / English text (left to right).
// In the Latin font (src/ui/fonts.ts), its weight (and italic) picked by family as for T; on the web Vazirmatn follows
// for the Persian digits.
export function L({ style, ...p }: TextProps & { style?: StyleProp<TextStyle> }) {
  const c = useColors();
  const flat = StyleSheet.flatten(style) ?? {};
  const { family, slant } = daFamily(flat.fontWeight, flat.fontStyle === 'italic');
  const font = { fontFamily: Platform.OS === 'web' ? `${family}, Vazirmatn-400, sans-serif` : family, fontWeight: 'normal' as const, fontStyle: slant ? 'italic' as const : 'normal' as const };
  // Laid out left to right on phones too, so its alignment is the physical edge as given.
  const side = Platform.OS === 'web' ? null : { direction: 'ltr' as const };
  return <Text {...p} style={[{ color: c.text, fontSize: 16, lineHeight: 24, writingDirection: 'ltr', textAlign: 'left' }, style, font, side]} />;
}

// The site's .card.
// A tappable card hands its own size (flex, width, alignSelf) to the touch area around it and fills that, so cards
// side by side in a row keep the sizes they ask for.
// Cards come in with useEnter; their place in the layout (flex, width, margins) stays on the outer box.
export function Card({ children, style, onPress }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void }) {
  const anim = useEnter();
  const { flex, flexGrow, flexShrink, flexBasis, width, alignSelf, margin, marginTop, marginBottom, marginHorizontal, marginVertical, ...rest } = StyleSheet.flatten(style) ?? {};
  const outer = { flex, flexGrow, flexShrink, flexBasis, width, alignSelf, margin, marginTop, marginBottom, marginHorizontal, marginVertical };
  // Grows to the size the card is given; flexGrow, not flex: 1, so that inside a box of no set height (a row of cards)
  // phones keep the content's own height instead of collapsing it to nothing.
  const fill = flex != null || flexGrow != null ? { flexGrow: 1 } : null;
  return (
    <Animated.View style={[outer, anim] as any}>
      {onPress ? (
        <Pressable onPress={() => { tap(); onPress(); }} style={({ pressed }) => [fill, pressed && { opacity: 0.9, transform: [{ scale: 0.985 }] }]}>
          <Glass style={[{ padding: 16 }, rest, fill]}>{children}</Glass>
        </Pressable>
      ) : <Glass style={[{ padding: 16 }, rest, fill]}>{children}</Glass>}
    </Animated.View>
  );
}

// The site's .btn-primary (navy) and .btn-ghost (surface with a line border); danger is a ghost in red.
type BtnProps = { label: string; onPress: () => void; kind?: 'primary' | 'glass' | 'danger' | 'grey'; disabled?: boolean; style?: StyleProp<ViewStyle>; icon?: IconName; big?: boolean };
// Every button carries a flat icon before its label, in the label's colour.
export function Button({ label, onPress, kind = 'primary', disabled, style, icon, big }: BtnProps) {
  const c = useColors();
  // grey: a solid neutral (charcoal in light mode, light grey in dark), so it never looks disabled.
  // In the Uber look every main button is that grey and outlined ones take the text colour, so no button is green.
  const grey = kind === 'grey' || (UBER && kind === 'primary'), primary = kind === 'primary' && !grey;
  const fg = primary ? c.accentText : grey ? c.strongFg : kind === 'danger' ? c.bad : UBER ? c.text : c.link;
  return (
    <Pressable disabled={disabled} onPress={() => { tap(); onPress(); }} style={({ pressed }) => [{ opacity: disabled ? 0.45 : pressed ? 0.9 : 1, transform: [{ scale: pressed && !disabled ? 0.98 : 1 }] }, style]}>
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
        paddingVertical: big ? 14 : 11, paddingHorizontal: 20, minHeight: big ? 50 : undefined, borderRadius: big ? radius.field : radius.btn,
        backgroundColor: primary ? c.accent : grey ? c.strong : c.surface, borderWidth: primary || grey ? 0 : 1.5, borderColor: kind === 'danger' ? c.badSoft : c.line,
      }}>
        {icon ? <Icon name={icon} size={18} color={fg} weight="semibold" /> : null}<T style={{ color: fg, fontWeight: '600', fontSize: 15, lineHeight: 22, textAlign: 'center' }}>{label}</T>
      </View>
    </Pressable>
  );
}

// The site's .tabs: grey track, the chosen one is a white tab with navy text.
export function Segmented<V extends string>({ value, options, onChange }: { value: V; options: { value: V; label: string }[]; onChange: (v: V) => void }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row', padding: 3, gap: 3, borderRadius: radius.sm, backgroundColor: c.surface2 }}>
      {options.map(o => {
        const on = o.value === value;
        return (
          <Pressable key={o.value} onPress={() => { tap(); onChange(o.value); }} style={{ flex: 1 }}>
            <View style={{ paddingVertical: 7, borderRadius: 6, backgroundColor: on ? c.surface : 'transparent' }}>
              <T style={{ textAlign: 'center', fontSize: 14, fontWeight: '600', color: on ? (UBER ? c.text : c.link) : c.muted }}>{o.label}</T>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

// Percent ring.
// A number easing from 0 to `target` (and on to a new target from where it is), about 0.9 s, slowing at the end: the
// home page's chance ring and its percent count up, and the lessons bar fills, when the app opens.
export function useCountUp(target: number, ms = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0; const from = v, t0 = Date.now();
    const step = () => {
      const k = Math.min(1, (Date.now() - t0) / ms), e = 1 - Math.pow(1 - k, 3);
      setV(from + (target - from) * e);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, ms]);
  return v;
}

// `format`: the label from the ring's value as it fills (so the number counts up with it); else the fixed `label`.
export function Ring({ value, size = 76, stroke = 8, color, label, format }: { value: number; size?: number; stroke?: number; color?: string; label?: string; format?: (v: number) => string }) {
  const c = useColors(), r = (size - stroke) / 2, C = 2 * Math.PI * r;
  const shown = useCountUp(Math.max(0, Math.min(1, value)), 1800);
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={[StyleSheet.absoluteFill, { transform: [{ rotate: '-90deg' }] }]}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={c.line} strokeWidth={stroke} fill="none" />
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={color ?? c.accent} strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={`${C} ${C}`} strokeDashoffset={C * (1 - shown)} />
      </Svg>
      <T style={{ fontWeight: '700', fontSize: size / 4.6, textAlign: 'center' }}>{format ? format(shown) : label}</T>
    </View>
  );
}
