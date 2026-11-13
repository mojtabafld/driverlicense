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
import { T, tap } from '../kit';
import { mix } from '../palette';
import { useColors, useIsDark } from '../theme';
import { BAR_GAP, type LiquidBarProps } from './liquid-bar-types';

// The open tab's name: this much room (the original's MOBILE_LABEL_WIDTH), and the bar's height.
// (larger than the original's 72 and 52 since 2026-11-13, Mojtaba: «بزرگتر کن»)
const LABEL_W = 88;
export const PILL_BAR_H = 66;
const WEB = Platform.OS === 'web';

function useStill() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setStill).catch(() => {});
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setStill);
    return () => sub.remove();
  }, []);
  return still;
}

function Tab({ icon, label, on, onPress, still }: { icon: LiquidBarProps['tabs'][number]['icon']; label: string; on: boolean; onPress: () => void; still: boolean }) {
  const c = useColors(), dark = useIsDark();
  const open = useRef(new Animated.Value(on ? 1 : 0)).current, fade = useRef(new Animated.Value(on ? 1 : 0)).current;
  const press = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (still) { open.setValue(on ? 1 : 0); fade.setValue(on ? 1 : 0); return; }
    Animated.spring(open, { toValue: on ? 1 : 0, stiffness: 350, damping: 32, mass: 1, useNativeDriver: false }).start();
    Animated.timing(fade, { toValue: on ? 1 : 0, duration: 190, useNativeDriver: false }).start();
  }, [on, still]);
  const ink = on ? c.accent : c.muted;
  return (
    <Pressable onPress={onPress} accessibilityRole="tab" accessibilityState={{ selected: on }} accessibilityLabel={tr(label)}
      onPressIn={() => { if (!still) Animated.spring(press, { toValue: 0.97, stiffness: 500, damping: 30, useNativeDriver: !WEB }).start(); }}
      onPressOut={() => { if (!still) Animated.spring(press, { toValue: 1, stiffness: 500, damping: 30, useNativeDriver: !WEB }).start(); }}>
      {({ hovered }: any) => (
        <Animated.View style={{ flexDirection: 'row', alignItems: 'center', height: 52, minWidth: 54, paddingHorizontal: 15, borderRadius: 999,
          backgroundColor: on ? mix(c.accent, c.surface, dark ? 0.85 : 0.9) : hovered ? c.surface2 : 'transparent', transform: [{ scale: press }] }}>
          <Icon name={icon} size={27} color={ink} filled={on} />
          {/* the name, its room opening beside the icon */}
          {/* (the gap between them as its own room, the same on both sides in either direction) */}
          <Animated.View style={{ width: fade.interpolate({ inputRange: [0, 1], outputRange: [0, 9] }) }} />
          <Animated.View style={{ overflow: 'hidden', width: open.interpolate({ inputRange: [0, 1], outputRange: [0, LABEL_W] }), opacity: fade }}>
            <T raw numberOfLines={1} maxFontSizeMultiplier={1.1} style={{ width: LABEL_W, fontSize: 15.5, lineHeight: 24, fontWeight: '600', color: c.accent }}>{tr(label)}</T>
          </Animated.View>
        </Animated.View>
      )}
    </Pressable>
  );
}

export function PillBar({ tabs, active, onSelect, bottomInset }: LiquidBarProps) {
  const c = useColors(), dark = useIsDark(), still = useStill(), { width } = useWindowDimensions();
  // springs into place the first time it is shown
  const born = useRef(new Animated.Value(still ? 1 : 0)).current;
  useEffect(() => { Animated.spring(born, { toValue: 1, stiffness: 300, damping: 26, mass: 1, useNativeDriver: !WEB }).start(); }, []);
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', paddingBottom: bottomInset + BAR_GAP }}>
      <Animated.View accessibilityRole="tablist" accessibilityLabel={tr('ناوبری')}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6, height: PILL_BAR_H, padding: 6, borderRadius: 999,
          minWidth: Math.min(380, width * 0.95), maxWidth: width * 0.95, backgroundColor: c.surface, borderWidth: 1, borderColor: dark ? mix(c.line, c.text, 0.1) : c.line,
          shadowColor: '#000', shadowOpacity: dark ? 0.5 : 0.16, shadowRadius: 22, shadowOffset: { width: 0, height: 12 }, elevation: 12,
          direction: RTL ? 'rtl' : 'ltr', opacity: born, transform: [{ scale: born.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }] } as any}>
        {tabs.map((t, i) => (
          <Tab key={t.name} icon={t.icon} label={t.label} on={i === active} still={still} onPress={() => { tap(); if (i !== active) onSelect(i); }} />
        ))}
      </Animated.View>
    </View>
  );
}
