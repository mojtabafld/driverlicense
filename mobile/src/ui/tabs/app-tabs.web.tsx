// Web version of the tab bar, drawn like iOS 26's: a floating Liquid Glass capsule above the bottom edge; the chosen tab
// sits on a lighter glass pill in the site's navy, with a filled icon (outlined for the others).
import { TabList, TabSlot, Tabs, TabTrigger, type TabTriggerSlotProps } from 'expo-router/ui';
import { forwardRef } from 'react';
import { Pressable, View } from 'react-native';

import { T } from '../kit';
import { Icon, type IconName } from '../icon';
import { LiquidGlass } from '../liquid';
import { useColors, useIsDark } from '../theme';
import { TABS } from './tabs';


const TAB_ICON: Record<string, IconName> = { index: 'house', exam: 'exam', learn: 'learn', settings: 'settings' };

const TabButton = forwardRef<View, TabTriggerSlotProps & { name: string; label: string }>(({ isFocused, name, label, ...props }, ref) => {
  const c = useColors(), dark = useIsDark();
  const color = isFocused ? c.link : c.text;
  return (
    <Pressable ref={ref} {...props} style={{ flex: 1 }}>
      <View style={[{ alignItems: 'center', justifyContent: 'center', gap: 1, height: 54, borderRadius: 27, transitionProperty: 'background-color', transitionDuration: '200ms' } as any,
        isFocused && { backgroundColor: dark ? 'rgba(255,255,255,0.10)' : 'rgba(2,71,118,0.12)' }]}>
        <Icon name={TAB_ICON[name]} size={24} color={color} filled={isFocused} contrast={dark ? c.bg : '#fff'} />
        <T style={{ fontSize: 10.5, lineHeight: 14, textAlign: 'center', fontWeight: '600', color }}>{label}</T>
      </View>
    </Pressable>
  );
});
TabButton.displayName = 'TabButton';

// Same structure as Expo's template: TabList asChild → a custom bar whose direct children are the TabTriggers.
function GlassTabBar({ children, ...props }: { children?: React.ReactNode }) {
  return (
    <View {...props} pointerEvents="box-none" style={{ position: 'absolute', bottom: 16, left: 0, right: 0, paddingHorizontal: 20, alignItems: 'center' }}>
      <LiquidGlass r={32} style={{ flexDirection: 'row', width: '100%', maxWidth: 420, padding: 4 }}>{children}</LiquidGlass>
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
