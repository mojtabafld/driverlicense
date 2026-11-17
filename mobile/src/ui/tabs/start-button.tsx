// The start button beside the dock (Mojtaba 2026-11-14, in the random test card's place): a round button of the dock's
// height at its end, on the home and test pages only. A tap opens a menu over it with the number of questions (5 to
// 25, like the real test); choosing one starts the random test at once (useNewTest's startWith: questions never
// answered first). Without free tests left the button opens the premium page instead. A tap outside, or on the
// button again, closes the menu.
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Platform, Pressable, StyleSheet, View } from 'react-native';

import { RTL, t, tr } from '@/lib/i18n';
import { SECONDS_PER_Q, SIZES, faNum } from '@/lib/logic';
import { Icon } from '../icon';
import { T, tap } from '../kit';
import { useNewTest } from '../new-test';
import { lightness, useColors, useIsDark } from '../theme';
import { DOCK } from './pill-bar';

const WEB = Platform.OS === 'web';
const BIG = 64;  // (a little larger than the tabs' circles)

export function StartBackdrop({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return <Pressable accessibilityLabel={tr('بستن')} onPress={onClose} style={[StyleSheet.absoluteFill, { backgroundColor: 'transparent' }]} />;
}

export function StartButton({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const c = useColors(), dark = useIsDark(), test = useNewTest();
  const d = dark ? DOCK.dark : DOCK.light;
  const show = useRef(new Animated.Value(0)).current;
  const [still, setStill] = useState(false);
  useEffect(() => { AccessibilityInfo.isReduceMotionEnabled().then(setStill).catch(() => {}); }, []);
  useEffect(() => {
    if (still) { show.setValue(open ? 1 : 0); return; }
    Animated.spring(show, { toValue: open ? 1 : 0, stiffness: 380, damping: 30, useNativeDriver: !WEB }).start();
  }, [open, still]);
  if (!test.ready) return null;
  const press = () => {
    tap();
    if (!test.randomLeft) { setOpen(false); test.startWith(0); return; }
    setOpen(!open);
  };
  const pick = (n: number) => { tap(); setOpen(false); test.startWith(n); };
  const sizes = [...SIZES].reverse();
  return (
    <View style={{ width: BIG, height: BIG }}>
      {/* the menu, growing up from the button */}
      <Animated.View pointerEvents={open ? 'auto' : 'none'} accessibilityRole="menu"
        style={{ position: 'absolute', bottom: BIG + 14, left: (BIG - 220) / 2, width: 220, padding: 6, gap: 2, borderRadius: 24,
          backgroundColor: dark ? 'rgba(40,40,44,0.94)' : 'rgba(244,244,247,0.96)', borderWidth: 1, borderColor: d.rim,
          shadowColor: '#000', shadowOpacity: dark ? 0.45 : 0.12, shadowRadius: 24, shadowOffset: { width: 0, height: 10 }, elevation: 14,
          ...(WEB ? { backdropFilter: 'blur(20px) saturate(1.4)', WebkitBackdropFilter: 'blur(20px) saturate(1.4)' } : null),
          opacity: show, transform: [{ translateY: show.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }, { scale: show.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) }],
          transformOrigin: 'bottom center', direction: RTL ? 'rtl' : 'ltr' } as any}>
        <T style={{ fontSize: 13, lineHeight: 20, color: c.muted, fontWeight: '600', paddingHorizontal: 12, paddingTop: 6, paddingBottom: 4 }}>{tr('تعداد سؤال‌ها')}</T>
        {sizes.map(n => (
          <Pressable key={n} testID={`start-${n}`} accessibilityRole="menuitem" onPress={() => pick(n)}>
            {({ pressed, hovered }: any) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, height: 46, paddingHorizontal: 12, borderRadius: 16,
                backgroundColor: pressed ? d.on : hovered ? d.hover : 'transparent' }}>
                <T raw numberOfLines={1} style={{ flex: 1, fontSize: 15, lineHeight: 22, fontWeight: '600', color: d.ink }}>{t('{0} سؤال', faNum(n))}</T>
                <T raw numberOfLines={1} style={{ fontSize: 13, lineHeight: 20, color: c.muted }}>{t('{0} دقیقه', faNum(Math.round(n * SECONDS_PER_Q / 60)))}</T>
              </View>
            )}
          </Pressable>
        ))}
      </Animated.View>
      <Pressable testID="start-test" onPress={press} accessibilityRole="button" accessibilityState={{ expanded: open }} accessibilityLabel={tr('شروع آزمون')}
        style={({ pressed }: any) => ({ width: BIG, height: BIG, borderRadius: BIG / 2, alignItems: 'center', justifyContent: 'center',
          // raised and in the theme's own colour, apart from the plain tabs around it (Mojtaba 2026-11-17)
          backgroundColor: c.accent, borderWidth: 3, borderColor: c.bg, transform: [{ translateY: -8 }, { scale: pressed ? 0.94 : 1 }],
          shadowColor: c.accent, shadowOpacity: dark ? 0.5 : 0.45, shadowRadius: 14, shadowOffset: { width: 0, height: 6 }, elevation: 8 } as any)}>
        <Icon name={!test.randomLeft ? 'lock' : open ? 'xmark' : 'play'} size={28} color={lightness(c.accent) > 0.62 ? '#111114' : '#ffffff'} filled />
      </Pressable>
    </View>
  );
}
