// The floating bar of the exam, the lessons, the practice and the step-by-step pages, drawn like the tab bar of the
// home page (ui/tabs/app-tabs.tsx): the same grey glass capsule above the bottom edge, each button an icon over its
// label in white, the main one (hand in, check, «مطمئنم») on a darker capsule in the app's green. Left to right in the
// questions' language (Danish / English): a button at each end and something in the middle (the position).
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from './icon';
import { faNum } from '@/lib/logic';
import { T, tap } from './kit';
import { LiquidGlass } from './liquid';
import { useColors, useIsDark } from './theme';

// The bar's height, and the room the pages keep for it.
export const BAR_H = 64;
const ITEM_H = BAR_H - 8;

// The colours of the tab bar, shared by both bars: the glass, the chosen / main item's capsule and its green.
export function useBarLook() {
  const dark = useIsDark(), c = useColors();
  return {
    dark,
    grey: dark ? 'rgba(58,58,62,0.78)' : 'rgba(120,120,128,0.72)',
    solid: dark ? 'rgba(52,52,56,0.96)' : 'rgba(112,112,120,0.95)', // Android, where nothing blurs
    capsule: dark ? 'rgba(0,0,0,0.38)' : 'rgba(40,40,44,0.42)',
    green: dark ? c.link : '#5fd16e',
    contrast: dark ? '#2a2a2c' : '#55555a', // a filled icon's inner lines
  };
}

// The capsule itself, floating above the bottom edge (the tab bar and GlassBar).
export function BarShell({ children }: { children: React.ReactNode }) {
  const ins = useSafeAreaInsets(), look = useBarLook();
  const web = Platform.OS === 'web' ? ({ backdropFilter: 'blur(24px) saturate(160%)', WebkitBackdropFilter: 'blur(24px) saturate(160%)' } as any) : null;
  const row = { flexDirection: 'row', direction: 'ltr', alignItems: 'center', width: '100%', maxWidth: 440, padding: 4 } as any;
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', bottom: Math.max(16, ins.bottom), left: 0, right: 0, paddingHorizontal: 20, alignItems: 'center' }}>
      {Platform.OS === 'ios' ? (
        <LiquidGlass r={BAR_H / 2} tint={look.grey} style={row}>{children}</LiquidGlass>
      ) : (
        <View style={[row, { borderRadius: BAR_H / 2, backgroundColor: Platform.OS === 'android' ? look.solid : look.grey,
          borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.18)' }, web]}>{children}</View>
      )}
    </View>
  );
}

// One item of a bar: an icon over its label, white; `main`: on the darker capsule, in green (the tab bar's chosen tab).
// `ltr`: a label read left to right (a position, «۷ / ۲۵»).
export function BarItem({ icon, label, main, filled, dim, ltr, children }: { icon?: IconName; label: string; main?: boolean; filled?: boolean; dim?: boolean; ltr?: boolean;
  children?: React.ReactNode }) {
  const look = useBarLook();
  const color = main ? look.green : '#ffffff';
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2, height: ITEM_H, borderRadius: ITEM_H / 2, overflow: 'hidden', opacity: dim ? 0.4 : 1,
      backgroundColor: main ? look.capsule : 'transparent' }}>
      {children ?? (icon ? <Icon name={icon} size={24} color={color} filled={filled} contrast={look.contrast} /> : null)}
      <T style={{ fontSize: 11, lineHeight: 15, textAlign: 'center', fontWeight: '600', color, writingDirection: ltr ? 'ltr' : undefined }} numberOfLines={1}>{label}</T>
    </View>
  );
}

// Without `end`, the middle (e.g. two answers) takes its room too.
export function GlassBar({ start, middle, end }: { start: React.ReactNode; middle: React.ReactNode; end?: React.ReactNode }) {
  return (
    <BarShell>
      <View style={{ flex: 1 }}>{start}</View>
      <View style={{ flex: 2, flexDirection: 'row', gap: 4 }}>{middle}</View>
      {end ? <View style={{ flex: 1 }}>{end}</View> : null}
    </BarShell>
  );
}

// The position in the middle of the bar (Persian digits) over what is counted, e.g. «قدم» or «سؤال».
export function BarCount({ n, of, label }: { n: number; of: number; label: string }) {
  return (
    <View style={{ flex: 1 }}>
      <BarItem label={label}>
        <T style={{ fontSize: 18, lineHeight: 24, color: '#ffffff', fontWeight: '700', textAlign: 'center', writingDirection: 'ltr' }}>{faNum(n)} / {faNum(of)}</T>
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
