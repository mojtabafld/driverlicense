// The tab bar (Mojtaba 2026-11-13, after the «BottomNavBar» component, src/components/ui/bottom-nav-bar.tsx, made for
// Tailwind and the web): the same bar drawn with React Native, so the website and the phone apps share it. A round
// pill on the page's card colour with a thin edge and a deep shadow, floating a little above the bottom edge; each tab
// a round button with its icon, the open one on a soft tint of the theme's colour with its name sliding out beside the
// icon (the name's room opening on a spring, the words fading in), the others icons only. The bar springs into place
// (a little small and clear at first); a pressed tab gives a little.
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Platform, Pressable, View, useWindowDimensions } from 'react-native';


import { RTL, tr } from '@/lib/i18n';
import { Icon } from '../icon';
import { tap } from '../kit';
import { LinearGradient } from 'expo-linear-gradient';
import { useColors, useIsDark } from '../theme';
import { BAR_GAP, type LiquidBarProps } from './liquid-bar-types';

// The open tab's name: this much room (the original's MOBILE_LABEL_WIDTH), and the bar's height.
// (LABEL_W: the most a name may take, the name's own width below it; the bar larger than the original's 52 since
// 2026-11-13, Mojtaba: «بزرگتر کن»)
export const PILL_BAR_H = 66;
const WEB = Platform.OS === 'web';
// The dock's colours (Mojtaba 2026-11-13, after his picture of a soft grey app): a frosted light grey track with a white
// rim, the open tab a white pill with its icon and name in near-black, the others' icons near-black too; the dark theme
// the same in reverse, a frosted dark grey track with the open tab a lighter grey pill and white ink.
export const DOCK = {
  light: { track: 'rgba(232,232,236,0.82)', rim: 'rgba(255,255,255,0.95)', on: '#ffffff', ink: '#111114', hover: 'rgba(255,255,255,0.55)' },
  dark: { track: 'rgba(40,40,44,0.82)', rim: 'rgba(255,255,255,0.09)', on: '#3a3a40', ink: '#f4f4f6', hover: 'rgba(255,255,255,0.06)' },
};
// The room under the pill (less since 2026-11-13, Mojtaba: «فضای خالی پایین داکر زیاده»): the small gap, and on a phone
// with a home indicator the pill reaches a little into that strip (the indicator line stays clear under it).
// (8 points higher since 2026-11-15, Mojtaba: «داکر پایینی مقدار کمی بالاتر قرار بگیره»)
export const under = (inset: number) => (inset > 0 ? Math.max(BAR_GAP, inset - 14) : BAR_GAP) + 8;

function useStill() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setStill).catch(() => {});
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setStill);
    return () => sub.remove();
  }, []);
  return still;
}

// The dock since 2026-11-17 (Mojtaba, after his picture of a finance app: «ثابت پایین صفحه و بدون بک گراند»): no bar
// behind the icons, only the page fading out under them; the tabs spread across the bottom as plain line icons, the
// open one a filled circle in the ink colour (near-black in the light theme, near-white in the dark) with its icon
// filled in the page's colour. Icons only: the names stay the tabs' accessible names. The start button
// (start-button.tsx) takes the row's last place on the home and test pages; elsewhere its place stays empty, so the
// icons never move between pages.
export const DOT = 56;
function Tab({ icon, label, on, onPress, still }: { icon: LiquidBarProps['tabs'][number]['icon']; label: string; on: boolean; onPress: () => void; still: boolean }) {
  const c = useColors(), dark = useIsDark(), d = dark ? DOCK.dark : DOCK.light;
  const fill = useRef(new Animated.Value(on ? 1 : 0)).current, press = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    // (instant on the phones: an animation on the JS thread while the new page is drawn lags on Android; 2026-11-15)
    if (still || !WEB) { fill.setValue(on ? 1 : 0); return; }
    Animated.timing(fill, { toValue: on ? 1 : 0, duration: 180, useNativeDriver: false }).start();
  }, [on, still]);
  return (
    <Pressable onPress={onPress} accessibilityRole="tab" accessibilityState={{ selected: on }} accessibilityLabel={tr(label)} hitSlop={4}
      onPressIn={() => { if (!still) Animated.spring(press, { toValue: 0.92, stiffness: 500, damping: 30, useNativeDriver: !WEB }).start(); }}
      onPressOut={() => { if (!still) Animated.spring(press, { toValue: 1, stiffness: 500, damping: 30, useNativeDriver: !WEB }).start(); }}>
      {({ hovered }: any) => (
        <Animated.View style={{ width: DOT, height: DOT, borderRadius: DOT / 2, alignItems: 'center', justifyContent: 'center', transform: [{ scale: press }],
          backgroundColor: on ? d.ink : hovered ? d.hover : 'transparent',
          ...(on ? { shadowColor: '#000', shadowOpacity: dark ? 0.4 : 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 5 }, elevation: 4 } : null) }}>
          <Icon name={icon} size={26} color={on ? c.bg : d.ink} filled={on} />
        </Animated.View>
      )}
    </Pressable>
  );
}

// `side`: the start button (start-button.tsx) in the row's last place, or null for an empty place.
export const SIDE_GAP = 10;
export function PillBar({ tabs, active, onSelect, bottomInset, side }: LiquidBarProps & { side?: React.ReactNode }) {
  const c = useColors(), still = useStill(), { width } = useWindowDimensions();
  const rowW = Math.min(width - 24, 460), pad = under(bottomInset);
  // (the page's colour, clear at the top and nearly whole at the icons, so the page runs out under them unseen)
  const fadeH = PILL_BAR_H + pad + 30;
  const stops = [0, 0.3, 0.55, 0.75, 1];
  const fade = stops.map(t => `${c.bg}${Math.round(255 * Math.min(1, t * 1.25) ** 1.4).toString(16).padStart(2, '0')}`);
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', paddingBottom: pad }}>
      <LinearGradient pointerEvents="none" colors={fade as unknown as readonly [string, string, ...string[]]} locations={stops as unknown as readonly [number, number, ...number[]]}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: fadeH }} />
      <View accessibilityRole="tablist" accessibilityLabel={tr('ناوبری')}
        style={{ width: rowW, height: PILL_BAR_H, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8, direction: RTL ? 'rtl' : 'ltr' } as any}>
        {tabs.map((t, i) => (
          <Tab key={t.name} icon={t.icon} label={t.label} on={i === active} still={still} onPress={() => { tap(); if (i !== active) onSelect(i); }} />
        ))}
        <View style={{ width: DOT, height: DOT }}>{side}</View>
      </View>
    </View>
  );
}
