// Web version of the tab bar, drawn like iOS 26's: a floating Liquid Glass capsule above the bottom edge; the chosen tab
// sits on a lighter glass pill in the site's navy, with a filled icon (outlined for the others).
import { TabList, TabSlot, Tabs, TabTrigger, type TabTriggerSlotProps } from 'expo-router/ui';
import { forwardRef } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { T } from '../kit';
import { LiquidGlass } from '../liquid';
import { useColors, useIsDark } from '../theme';
import { TABS } from './tabs';

const ICONS: Record<string, string> = {
  index: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  exam: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-1.2 12.6L7 11.8l1.4-1.4 2.4 2.4 4.8-4.8L17 9.4z',
  learn: 'M4 5a2 2 0 0 1 2-2h5v16H6a2 2 0 0 0-2 2zm16 0a2 2 0 0 0-2-2h-5v16h5a2 2 0 0 1 2 2z',
  settings: 'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm8.4 4.6l1.6 1.2-2 3.4-1.9-.7a7 7 0 0 1-1.8 1l-.3 2h-4l-.3-2a7 7 0 0 1-1.8-1l-1.9.7-2-3.4 1.6-1.2a7 7 0 0 1 0-2.2L2 9.7l2-3.4 1.9.7a7 7 0 0 1 1.8-1l.3-2h4l.3 2a7 7 0 0 1 1.8 1l1.9-.7 2 3.4-1.6 1.2a7 7 0 0 1 0 2.2z',
};

const TabButton = forwardRef<View, TabTriggerSlotProps & { name: string; label: string }>(({ isFocused, name, label, ...props }, ref) => {
  const c = useColors(), dark = useIsDark();
  const color = isFocused ? c.link : c.text;
  return (
    <Pressable ref={ref} {...props} style={{ flex: 1 }}>
      <View style={[{ alignItems: 'center', justifyContent: 'center', gap: 1, height: 54, borderRadius: 27, transitionProperty: 'background-color', transitionDuration: '200ms' } as any,
        isFocused && { backgroundColor: dark ? 'rgba(255,255,255,0.10)' : 'rgba(2,71,118,0.12)' }]}>
        <Svg width={24} height={24} viewBox="0 0 24 24">
          <Path d={ICONS[name]} fill={isFocused ? color : 'none'} stroke={isFocused ? 'none' : color} strokeWidth={1.6} strokeLinejoin="round" />
        </Svg>
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
