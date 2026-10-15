// The floating bar of the exam, the lessons, the practice and the step-by-step pages, drawn like the tab bar of the
// home page (ui/tabs/app-tabs.tsx): the same grey glass capsule above the bottom edge, each button an icon over its
// label in white, the main one (hand in, check, «مطمئنم») on a darker capsule in the app's green. Left to right in the
// questions' language (Danish / English): a button at each end and something in the middle (the position).
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RTL } from '@/lib/i18n';
import { Icon, type IconName } from './icon';
import { faNum } from '@/lib/logic';
import { L, T, tap } from './kit';
import { LiquidGlass } from './liquid';
import { BarLight, useBarLight, useDarkUnder } from './bar-shade';
import { ARC, useIsDark } from './theme';

// The bar's height, and the room the pages keep for it.
export const BAR_H = 64;
const ITEM_H = BAR_H - 8;

// The colours of the tab bar, shared by both bars: the glass, the chosen / main item's capsule and its green. Light
// enough to stay glass, dark enough that the white labels (4.7:1) and the chosen item's green on its capsule (6:1) read
// well in both themes; the same green in both, whatever the app's colour.
// On the main site's light theme the glass is light (white glass, dark labels, the deep green of the theme for the
// chosen / main item) and turns to the grey glass while something dark lies under it (ui/bar-shade.tsx), as Liquid
// Glass does.
export function useBarLook() {
  const dark = useIsDark(), light = useBarLight();
  if (light) {
    return {
      dark, light,
      grey: 'rgba(255,255,255,0.82)',
      solid: 'rgba(252,252,252,0.97)',
      capsule: 'rgba(31,111,92,0.12)',
      green: '#1f6f5c',
      fg: '#1d1d1d',
      edge: 'rgba(0,0,0,0.08)',
      contrast: '#e6ede8',
    };
  }
  return {
    dark, light,
    grey: dark ? 'rgba(58,58,62,0.78)' : 'rgba(88,88,94,0.84)',
    solid: dark ? 'rgba(52,52,56,0.96)' : 'rgba(84,84,90,0.96)', // Android, where nothing blurs
    capsule: dark ? 'rgba(0,0,0,0.38)' : 'rgba(30,30,34,0.6)',
    green: (ARC ? '#6fdcc2' : '#6fdc7c'),
    fg: '#ffffff',
    edge: 'rgba(255,255,255,0.18)',
    contrast: dark ? '#1f1f20' : '#3f3f43', // a filled icon's inner lines: the capsule's own colour
  };
}

// The shade both bars take: light on the main site's light theme unless something dark lies under the bar.
export function useBarShade() {
  const dark = useIsDark(), under = useDarkUnder(ARC && !dark, BAR_H);
  return ARC && !dark && !under;
}

// The bar's surface, with a short fade between its two shades on the web.
export function barSurface(look: ReturnType<typeof useBarLook>) {
  return [{ borderRadius: BAR_H / 2, backgroundColor: Platform.OS === 'android' ? look.solid : look.grey, borderWidth: 0.5, borderColor: look.edge },
    look.light ? { shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 16, shadowOffset: { width: 0, height: 4 }, elevation: 6 } : null,
    Platform.OS === 'web' ? ({ backdropFilter: 'blur(24px) saturate(160%)', WebkitBackdropFilter: 'blur(24px) saturate(160%)',
      transitionProperty: 'background-color, border-color, box-shadow', transitionDuration: '220ms' } as any) : null];
}

// The capsule itself, floating above the bottom edge (the tab bar and GlassBar).
export function BarShell({ children }: { children: React.ReactNode }) {
  const light = useBarShade();
  return <BarLight.Provider value={light}><Shell>{children}</Shell></BarLight.Provider>;
}
function Shell({ children }: { children: React.ReactNode }) {
  const ins = useSafeAreaInsets(), look = useBarLook();
  const row = { flexDirection: 'row', direction: 'ltr', alignItems: 'center', width: '100%', maxWidth: 440, padding: 4 } as any;
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', bottom: Math.max(16, ins.bottom), left: 0, right: 0, paddingHorizontal: 20, alignItems: 'center' }}>
      {Platform.OS === 'ios' ? (
        <LiquidGlass r={BAR_H / 2} tint={look.grey} style={row}>{children}</LiquidGlass>
      ) : (
        <View style={[row, ...barSurface(look)]}>{children}</View>
      )}
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
