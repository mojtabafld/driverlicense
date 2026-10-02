// Small building blocks shared by all screens.
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type TextProps, type TextStyle, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

import { Glass } from './glass';
import { radius, useColors } from './theme';

export const tap = () => { if (Platform.OS !== 'web') Haptics.selectionAsync().catch(() => {}); };

// Colourful soft backdrop behind the glass.
export function Backdrop({ children }: { children?: React.ReactNode }) {
  const c = useColors();
  return (
    <View style={{ flex: 1, overflow: 'hidden' }}>
      <LinearGradient colors={c.bg} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
      <View style={[styles.blob, { backgroundColor: c.accent, top: -80, right: -60 }]} />
      <View style={[styles.blob, { backgroundColor: '#B46BFF', bottom: 120, left: -90, width: 260, height: 260 }]} />
      {children}
    </View>
  );
}

// Scrollable tab screen with a large title; leaves room for the floating tab bar.
export function Screen({ title, subtitle, children, right }: { title: string; subtitle?: string; children: React.ReactNode; right?: React.ReactNode }) {
  const c = useColors(), ins = useSafeAreaInsets();
  return (
    <Backdrop>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ paddingTop: ins.top + 16, paddingHorizontal: 18, paddingBottom: ins.bottom + 120, gap: 14, maxWidth: 760, width: '100%', alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <View style={{ flex: 1 }}>
            <T style={{ fontSize: 32, fontWeight: '800', color: c.text }}>{title}</T>
            {subtitle ? <T style={{ color: c.muted, marginTop: 2 }}>{subtitle}</T> : null}
          </View>
          {right}
        </View>
        {children}
      </ScrollView>
    </Backdrop>
  );
}

// Persian text (right to left).
export function T({ style, ...p }: TextProps & { style?: StyleProp<TextStyle> }) {
  const c = useColors();
  return <Text {...p} style={[{ color: c.text, fontSize: 15, lineHeight: 24, writingDirection: 'rtl', textAlign: 'right' }, style]} />;
}
// Danish / English text (left to right).
export function L({ style, ...p }: TextProps & { style?: StyleProp<TextStyle> }) {
  const c = useColors();
  return <Text {...p} style={[{ color: c.text, fontSize: 16, lineHeight: 24, writingDirection: 'ltr', textAlign: 'left' }, style]} />;
}

export function Card({ children, style, onPress }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void }) {
  const inner = <Glass style={[{ padding: 16 }, style]} interactive={!!onPress}>{children}</Glass>;
  return onPress ? <Pressable onPress={() => { tap(); onPress(); }} style={({ pressed }) => pressed && { transform: [{ scale: 0.985 }] }}>{inner}</Pressable> : inner;
}

type BtnProps = { label: string; onPress: () => void; kind?: 'primary' | 'glass' | 'danger'; disabled?: boolean; style?: StyleProp<ViewStyle>; icon?: React.ReactNode };
export function Button({ label, onPress, kind = 'primary', disabled, style, icon }: BtnProps) {
  const c = useColors();
  const fg = kind === 'primary' ? c.accentText : kind === 'danger' ? c.bad : c.accent;
  const body = (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 15, paddingHorizontal: 20 }}>
      {icon}<T style={{ color: fg, fontWeight: '700', fontSize: 16, textAlign: 'center' }}>{label}</T>
    </View>
  );
  return (
    <Pressable disabled={disabled} onPress={() => { tap(); onPress(); }} style={({ pressed }) => [{ opacity: disabled ? 0.45 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] }, style]}>
      {kind === 'primary'
        ? <Glass r={radius.pill} tint={c.accent} interactive style={{ backgroundColor: c.accent, borderColor: 'transparent' }}>{body}</Glass>
        : <Glass r={radius.pill} interactive>{body}</Glass>}
    </Pressable>
  );
}

// Segmented control on glass.
export function Segmented<V extends string>({ value, options, onChange }: { value: V; options: { value: V; label: string }[]; onChange: (v: V) => void }) {
  const c = useColors();
  return (
    <Glass r={radius.pill} style={{ flexDirection: 'row', padding: 4 }}>
      {options.map(o => (
        <Pressable key={o.value} onPress={() => { tap(); onChange(o.value); }} style={{ flex: 1 }}>
          <View style={{ paddingVertical: 9, borderRadius: radius.pill, backgroundColor: o.value === value ? c.glassStrong : 'transparent' }}>
            <T style={{ textAlign: 'center', fontWeight: o.value === value ? '800' : '600', color: o.value === value ? c.text : c.muted }}>{o.label}</T>
          </View>
        </Pressable>
      ))}
    </Glass>
  );
}

// Percent ring.
export function Ring({ value, size = 76, stroke = 8, color, label }: { value: number; size?: number; stroke?: number; color?: string; label?: string }) {
  const c = useColors(), r = (size - stroke) / 2, C = 2 * Math.PI * r;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={[StyleSheet.absoluteFill, { transform: [{ rotate: '-90deg' }] }]}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={c.hairline} strokeWidth={stroke} fill="none" />
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={color ?? c.accent} strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={`${C} ${C}`} strokeDashoffset={C * (1 - Math.max(0, Math.min(1, value)))} />
      </Svg>
      <T style={{ fontWeight: '800', fontSize: size / 4.6, textAlign: 'center' }}>{label}</T>
    </View>
  );
}

const styles = StyleSheet.create({
  blob: { position: 'absolute', width: 300, height: 300, borderRadius: 999, opacity: 0.18 },
});
