// The tab bar on every platform (web, iOS, Android), drawn the same way: a floating capsule above the bottom edge
// (BarSurface, glass-bar.tsx: Apple's own Liquid Glass on iOS 26 and later, flat in the cards' colour elsewhere), each
// tab an icon over its label; the chosen tab sits on a capsule of its own, its icon filled and its label in the app's
// colour. The pages keep room for it under their end (Screen).
import { TabList, TabSlot, Tabs, TabTrigger, type TabTriggerSlotProps } from 'expo-router/ui';
import { forwardRef } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { T, tap } from '../kit';
import { Icon, type IconName } from '../icon';
import { BarSurface, useBarApart, useBarLook, useBarShade } from '../glass-bar';
import { BarApart, BarLight } from '../bar-shade';
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
          backgroundColor: isFocused ? look.capsule : 'transparent' },
          Platform.OS === 'web' ? ({ transitionProperty: 'background-color', transitionDuration: '200ms' } as any) : null]} />
        <Icon name={TAB_ICON[name]} size={24} color={color} filled={isFocused} contrast={look.contrast} />
        <T style={{ fontSize: 11, lineHeight: 15, textAlign: 'center', fontWeight: '600', color }}>{label}</T>
      </View>
    </Pressable>
  );
});
TabButton.displayName = 'TabButton';

// Same structure as Expo's template: TabList asChild → a custom bar whose direct children are the TabTriggers.
// The bar's shade (light, or grey over something dark: glass-bar.tsx) goes to the tabs through BarLight.
const GlassTabBar = forwardRef<View, { children?: React.ReactNode }>((props, ref) => {
  const light = useBarShade(), apart = useBarApart();
  return <BarLight.Provider value={light}><BarApart.Provider value={apart}><TabShell ref={ref} {...props} /></BarApart.Provider></BarLight.Provider>;
});
GlassTabBar.displayName = 'GlassTabBar';
const TabShell = forwardRef<View, { children?: React.ReactNode }>(({ children, ...props }, ref) => {
  const ins = useSafeAreaInsets();
  return (
    <View ref={ref} {...props} pointerEvents="box-none" style={{ position: 'absolute', bottom: Math.max(16, ins.bottom), left: 0, right: 0, paddingHorizontal: 20, alignItems: 'center' }}>
      <BarSurface style={{ flexDirection: 'row', width: '100%', maxWidth: 440, padding: 4 }}>{children}</BarSurface>
    </View>
  );
});
TabShell.displayName = 'TabShell';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />
      <TabList asChild>
        <GlassTabBar>
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
