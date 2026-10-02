// Web version of the tab bar: a floating Liquid Glass pill at the bottom of the screen.
import { TabList, TabSlot, Tabs, TabTrigger, type TabTriggerSlotProps } from 'expo-router/ui';
import { forwardRef } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Glass } from '../glass';
import { T } from '../kit';
import { radius, useColors } from '../theme';
import { TABS } from './tabs';

const ICONS: Record<string, string> = {
  index: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  exam: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-1.2 12.6L7 11.8l1.4-1.4 2.4 2.4 4.8-4.8L17 9.4z',
  learn: 'M4 5a2 2 0 0 1 2-2h5v16H6a2 2 0 0 0-2 2zm16 0a2 2 0 0 0-2-2h-5v16h5a2 2 0 0 1 2 2z',
  settings: 'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm8.4 4.6l1.6 1.2-2 3.4-1.9-.7a7 7 0 0 1-1.8 1l-.3 2h-4l-.3-2a7 7 0 0 1-1.8-1l-1.9.7-2-3.4 1.6-1.2a7 7 0 0 1 0-2.2L2 9.7l2-3.4 1.9.7a7 7 0 0 1 1.8-1l.3-2h4l.3 2a7 7 0 0 1 1.8 1l1.9-.7 2 3.4-1.6 1.2a7 7 0 0 1 0 2.2z',
};

const TabButton = forwardRef<View, TabTriggerSlotProps & { name: string; label: string }>(({ isFocused, name, label, ...props }, ref) => {
  const c = useColors();
  return (
    <Pressable ref={ref} {...props} style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', gap: 2, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: isFocused ? c.accentSoft : 'transparent' }}>
        <Svg width={24} height={24} viewBox="0 0 24 24"><Path d={ICONS[name]} fill={isFocused ? c.accent : c.muted} /></Svg>
        <T style={{ fontSize: 11.5, lineHeight: 16, textAlign: 'center', fontWeight: isFocused ? '800' : '600', color: isFocused ? c.accent : c.muted }}>{label}</T>
      </View>
    </Pressable>
  );
});
TabButton.displayName = 'TabButton';

// Same structure as Expo's template: TabList asChild → a custom bar whose direct children are the TabTriggers.
function GlassBar({ children, ...props }: { children?: React.ReactNode }) {
  return (
    <View {...props} pointerEvents="box-none" style={{ position: 'absolute', bottom: 18, left: 0, right: 0, alignItems: 'center' }}>
      <Glass r={radius.pill} strong style={{ flexDirection: 'row', width: 360, maxWidth: '92%' as any, padding: 6 }}>{children}</Glass>
    </View>
  );
}

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <GlassBar>
          {TABS.map(t => (
            <TabTrigger key={t.name} name={t.name} href={t.href as any} asChild>
              <TabButton name={t.name} label={t.label} />
            </TabTrigger>
          ))}
        </GlassBar>
      </TabList>
    </Tabs>
  );
}
