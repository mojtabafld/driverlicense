// Web version of the tab bar, drawn like iOS 26/27's in light and dark: a floating glass capsule above the bottom edge;
// the chosen tab sits on a grey capsule in the system blue with a filled icon, the others in the label colour.
import { TabList, TabSlot, Tabs, TabTrigger, type TabTriggerSlotProps } from 'expo-router/ui';
import { forwardRef } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { T } from '../kit';
import { Icon, type IconName } from '../icon';
import { LiquidGlass, useIOSBar } from '../liquid';
import { useIsDark } from '../theme';
import { TABS } from './tabs';

const TAB_ICON: Record<string, IconName> = { index: 'house', exam: 'exam', learn: 'learn', settings: 'settings' };

const TabButton = forwardRef<View, TabTriggerSlotProps & { name: string; label: string }>(({ isFocused, name, label, ...props }, ref) => {
  const ios = useIOSBar(), dark = useIsDark();
  const color = isFocused ? ios.tint : ios.label;
  return (
    <Pressable ref={ref} {...props} style={{ flex: 1 }}>
      <View style={[{ alignItems: 'center', justifyContent: 'center', gap: 1, height: 54, borderRadius: 27, transitionProperty: 'background-color', transitionDuration: '200ms' } as any,
        isFocused && { backgroundColor: ios.pill }]}>
        <Icon name={TAB_ICON[name]} size={24} color={color} filled={isFocused} contrast={dark ? '#2a2a2c' : '#f2f2f4'} />
        <T style={{ fontSize: 10.5, lineHeight: 14, textAlign: 'center', fontWeight: '600', color }}>{label}</T>
      </View>
    </Pressable>
  );
});
TabButton.displayName = 'TabButton';

// Same structure as Expo's template: TabList asChild → a custom bar whose direct children are the TabTriggers.
// Above the iPhone's home indicator when the page runs full screen (added to the home screen).
function GlassTabBar({ children, ...props }: { children?: React.ReactNode }) {
  const ins = useSafeAreaInsets();
  return (
    <View {...props} pointerEvents="box-none" style={{ position: 'absolute', bottom: Math.max(16, ins.bottom), left: 0, right: 0, paddingHorizontal: 20, alignItems: 'center' }}>
      <LiquidGlass bar r={32} style={{ flexDirection: 'row', width: '100%', maxWidth: 420, padding: 4 }}>{children}</LiquidGlass>
    </View>
  );
}

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
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
