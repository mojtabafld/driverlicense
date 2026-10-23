// The tab bar on every platform (web, iOS, Android), drawn the same way: a floating capsule of glass above the bottom
// edge (BarGlass, glass-bar.tsx: Apple's own Liquid Glass on iOS 26 and later, a drawn one elsewhere), each tab an icon
// over its label; the chosen tab sits on a capsule of its own, its icon filled and its label in the app's colour. The
// glass blurs what lies under it (iOS's own glass, the web's backdrop blur, on Android 12+ the tab pages drawn in a
// blur target). The pages keep room for it under their end (Screen).
import { BlurTargetView } from 'expo-blur';
import { TabList, TabSlot, Tabs, TabTrigger, type TabTriggerSlotProps } from 'expo-router/ui';
import { forwardRef, useRef, type RefObject } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { T, tap } from '../kit';
import { Icon, type IconName } from '../icon';
import { BarGlass, useBarLook, useBarShade } from '../glass-bar';
import { BLUR_ANDROID } from '../glass-area';
import { BarLight } from '../bar-shade';
import { TABS } from './tabs';

const TAB_ICON: Record<string, IconName> = { index: 'house', exam: 'exam', learn: 'learn', settings: 'settings' };
// The bar's height (also the room the pages keep for it, with the gap under it: kit.tsx).
export const TAB_BAR_H = 64;

const TabButton = forwardRef<View, TabTriggerSlotProps & { name: string; label: string }>(({ isFocused, name, label, onPress, ...props }, ref) => {
  const look = useBarLook();
  const color = isFocused ? look.green : look.fg;
  return (
    <Pressable ref={ref} {...props} onPress={e => { if (!isFocused) tap(); onPress?.(e); }} style={{ flex: 1 }}
      accessibilityRole="tab" accessibilityState={{ selected: isFocused }} accessibilityLabel={label}>
      {/* The chosen tab's capsule is a layer of its own under the icon, with its own round corners, and the tab's box
          clips to the same shape (on Android a rounded background on the box itself could show square). */}
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2, height: TAB_BAR_H - 8, borderRadius: (TAB_BAR_H - 8) / 2, overflow: 'hidden' }}>
        <View pointerEvents="none" style={[{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderRadius: (TAB_BAR_H - 8) / 2,
          backgroundColor: isFocused ? look.capsule : 'transparent', boxShadow: isFocused ? look.pillRim : undefined },
          Platform.OS === 'web' ? ({ transitionProperty: 'background-color, box-shadow', transitionDuration: '200ms' } as any) : null]} />
        <Icon name={TAB_ICON[name]} size={24} color={color} filled={isFocused} contrast={look.contrast} />
        <T style={{ fontSize: 11, lineHeight: 15, textAlign: 'center', fontWeight: '600', color }}>{label}</T>
      </View>
    </Pressable>
  );
});
TabButton.displayName = 'TabButton';

// Same structure as Expo's template: TabList asChild → a custom bar whose direct children are the TabTriggers.
// The bar's shade (light, or grey over something dark: glass-bar.tsx) goes to the tabs through BarLight.
// `backdrop`: the tab pages' blur target on Android 12+.
type BarProps = { children?: React.ReactNode; backdrop?: RefObject<View | null> | null };
const GlassTabBar = forwardRef<View, BarProps>((props, ref) => {
  const light = useBarShade();
  return <BarLight.Provider value={light}><TabShell ref={ref} {...props} /></BarLight.Provider>;
});
GlassTabBar.displayName = 'GlassTabBar';
const TabShell = forwardRef<View, BarProps>(({ children, backdrop, ...props }, ref) => {
  const ins = useSafeAreaInsets();
  return (
    <View ref={ref} {...props} pointerEvents="box-none" style={{ position: 'absolute', bottom: Math.max(16, ins.bottom), left: 0, right: 0, paddingHorizontal: 20, alignItems: 'center' }}>
      <BarGlass backdrop={backdrop} style={{ flexDirection: 'row', width: '100%', maxWidth: 440, padding: 4 }}>{children}</BarGlass>
    </View>
  );
});
TabShell.displayName = 'TabShell';

export default function AppTabs() {
  // On Android 12+ the tab pages are drawn in a blur target, so the bar can blur what scrolls under it (glass-area.tsx).
  const backdrop = useRef<View>(null);
  return (
    <Tabs>
      {BLUR_ANDROID
        ? <BlurTargetView ref={backdrop} style={{ flex: 1 }}><TabSlot style={{ flex: 1 }} /></BlurTargetView>
        : <TabSlot style={{ flex: 1 }} />}
      <TabList asChild>
        <GlassTabBar backdrop={BLUR_ANDROID ? backdrop : null}>
          {TABS.map(t => (
            <TabTrigger key={t.name} name={t.name} href={t.href as any} asChild>
              <TabButton name={t.name} label={t.label} />
            </TabTrigger>
          ))}
        </GlassTabBar>
      </TabList>
    </Tabs>
  );
}
