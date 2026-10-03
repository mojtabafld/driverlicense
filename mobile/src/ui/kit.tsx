// Small building blocks shared by all screens, styled like the web site.
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type TextProps, type TextStyle, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { faFamily } from './fonts';
import { Icon, type IconName } from './icon';
import { Glass } from './glass';
import { DA_FONT, radius, useColors, useTheme } from './theme';

// A style given in physical left/right terms. Phones running right-to-left swap left and right in styles,
// the web does not; this keeps "left" meaning the left edge on both.
export function physical<S extends Record<string, any>>(style: S): S {
  if (Platform.OS === 'web') return style;
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(style)) out[k.replace(/Left|Right|left|right/, w => ({ Left: 'Right', Right: 'Left', left: 'right', right: 'left' } as any)[w])] = v;
  return out as S;
}

export const tap = () => { if (Platform.OS !== 'web') Haptics.selectionAsync().catch(() => {}); };

// Page background: the site's bg colour as a very soft gradient (lighter at the top), in both themes.
export function Backdrop({ children }: { children?: React.ReactNode }) {
  const c = useColors();
  return (
    <View style={{ flex: 1, overflow: 'hidden', backgroundColor: c.bg }}>
      <LinearGradient colors={c.bgGradient} locations={[0, 0.45, 1]} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={StyleSheet.absoluteFill} />
      {children}
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
      style={({ pressed }) => ({ width: 38, height: 38, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.accentSoft : 'transparent' })}>
      {dark ? <Icon name="sun" size={20} color={c.link} /> : <Icon name="moon" size={19} color={c.muted} />}
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
          <Text style={{ fontFamily: DA_FONT, fontSize: 18, color: c.link }}>
            <Text style={{ fontWeight: '700' }}>Teori</Text>Prøve
          </Text>
          <Logo />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>{right}<ThemeButton /></View>
      </View>
    </View>
  );
}

// Scrollable tab screen: top bar, then a page heading and the content; leaves room for the tab bar.
// With `fill` the screen does not scroll: its content gets exactly the height between the title and the tab bar
// (the floating bar on the web, the system bar on phones, which the bottom safe area already covers), and `gap`
// can be set tighter for short screens.
export function Screen({ title, subtitle, children, right, fill, gap = 14 }: { title: string; subtitle?: string; children: React.ReactNode; right?: React.ReactNode; fill?: boolean; gap?: number }) {
  const c = useColors(), ins = useSafeAreaInsets();
  const box = { paddingTop: 2, paddingHorizontal: 16, gap, maxWidth: 980, width: '100%', alignSelf: 'center' } as const;
  const head = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 2 }}>
      <View style={{ flex: 1 }}>
        <T style={{ fontSize: 26, lineHeight: 34, fontWeight: '700', color: c.text }}>{title}</T>
        {subtitle ? <T style={{ color: c.muted, fontSize: 14, lineHeight: 22 }}>{subtitle}</T> : null}
      </View>
      {right}
    </View>
  );
  return (
    <Backdrop>
      <TopBar />
      {fill
        ? <View style={[box, { flex: 1, paddingBottom: Platform.OS === 'web' ? 80 + Math.max(16, ins.bottom) : ins.bottom + 10 }]}>{head}{children}</View>
        : <ScrollView contentInsetAdjustmentBehavior="never" showsVerticalScrollIndicator={false} contentContainerStyle={[box, { paddingBottom: ins.bottom + 100 }]}>{head}{children}</ScrollView>}
    </Backdrop>
  );
}

// Persian text (right to left).
// Set in Vazirmatn; the weight picks the font file, so fontWeight itself is reset (no faux bold).
export function T({ style, ...p }: TextProps & { style?: StyleProp<TextStyle> }) {
  const c = useColors();
  const flat = StyleSheet.flatten(style) ?? {};
  const font = flat.fontFamily ? null : { fontFamily: faFamily(flat.fontWeight), fontWeight: 'normal' as const };
  return <Text {...p} style={[{ color: c.text, fontSize: 15, lineHeight: 24, writingDirection: 'rtl', textAlign: 'right' }, style, font]} />;
}
// Danish / English text (left to right).
export function L({ style, ...p }: TextProps & { style?: StyleProp<TextStyle> }) {
  const c = useColors();
  return <Text {...p} style={[{ color: c.text, fontSize: 16, lineHeight: 24, writingDirection: 'ltr', textAlign: 'left', fontFamily: DA_FONT }, style]} />;
}

// The site's .card.
// A tappable card hands its own size (flex, width, alignSelf) to the touch area around it and fills that, so cards
// side by side in a row keep the sizes they ask for.
export function Card({ children, style, onPress }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void }) {
  if (!onPress) return <Glass style={[{ padding: 16 }, style]}>{children}</Glass>;
  const { flex, flexGrow, flexShrink, flexBasis, width, alignSelf, ...rest } = StyleSheet.flatten(style) ?? {};
  const outer = { flex, flexGrow, flexShrink, flexBasis, width, alignSelf };
  return (
    <Pressable onPress={() => { tap(); onPress(); }} style={({ pressed }) => [outer, pressed && { opacity: 0.85 }]}>
      <Glass style={[{ padding: 16 }, rest, flex != null || flexGrow != null ? { flex: 1 } : null]}>{children}</Glass>
    </Pressable>
  );
}

// The site's .btn-primary (navy) and .btn-ghost (surface with a line border); danger is a ghost in red.
type BtnProps = { label: string; onPress: () => void; kind?: 'primary' | 'glass' | 'danger'; disabled?: boolean; style?: StyleProp<ViewStyle>; icon?: IconName; big?: boolean };
// Every button carries a flat icon before its label, in the label's colour.
export function Button({ label, onPress, kind = 'primary', disabled, style, icon, big }: BtnProps) {
  const c = useColors();
  const primary = kind === 'primary';
  const fg = primary ? c.accentText : kind === 'danger' ? c.bad : c.link;
  return (
    <Pressable disabled={disabled} onPress={() => { tap(); onPress(); }} style={({ pressed }) => [{ opacity: disabled ? 0.45 : pressed ? 0.85 : 1 }, style]}>
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
        paddingVertical: big ? 14 : 11, paddingHorizontal: 20, minHeight: big ? 50 : undefined, borderRadius: big ? radius.field : radius.btn,
        backgroundColor: primary ? c.accent : c.surface, borderWidth: primary ? 0 : 1.5, borderColor: kind === 'danger' ? c.badSoft : c.line,
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
              <T style={{ textAlign: 'center', fontSize: 14, fontWeight: '600', color: on ? c.link : c.muted }}>{o.label}</T>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

// Percent ring.
export function Ring({ value, size = 76, stroke = 8, color, label }: { value: number; size?: number; stroke?: number; color?: string; label?: string }) {
  const c = useColors(), r = (size - stroke) / 2, C = 2 * Math.PI * r;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={[StyleSheet.absoluteFill, { transform: [{ rotate: '-90deg' }] }]}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={c.line} strokeWidth={stroke} fill="none" />
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={color ?? c.accent} strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={`${C} ${C}`} strokeDashoffset={C * (1 - Math.max(0, Math.min(1, value)))} />
      </Svg>
      <T style={{ fontWeight: '700', fontSize: size / 4.6, textAlign: 'center' }}>{label}</T>
    </View>
  );
}
