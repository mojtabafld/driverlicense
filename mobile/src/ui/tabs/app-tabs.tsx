// Shared bottom navigation, Material 3's navigation bar (Mojtaba 2026-11-07): four equal tabs, each an icon with its
// label under it, the open one's icon on a tinted pill; on a rounded bar a step off the page (tab-look.ts).
// (The home page's round start button beside the bar, from 2026-10-25, was removed on 2026-11-06, Mojtaba.)
import { usePathname } from 'expo-router';
import { TabList, TabSlot, Tabs, TabTrigger, type TabTriggerSlotProps } from 'expo-router/ui';
import { createContext, forwardRef, useContext } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { tr } from '@/lib/i18n';
import { tap } from '../kit';
import { type IconName } from '../icon';
import { TABS } from './tabs';
import { NavRail, NavTab } from './tab-item';
import { tabLayout } from './tab-look';

const TAB_ICON: Record<string, IconName> = { index: 'house', exam: 'exam', learn: 'learn', settings: 'settings' };
// The bar's height (also the room the pages keep for it, with the gap under it: kit.tsx).
export { TAB_BAR_H } from './tab-look';
const Layout = createContext(tabLayout(393, false, 'Settings'));

const TabButton = forwardRef<View, TabTriggerSlotProps & { name: string; label: string }>(({ isFocused, name, label, onPress, ...props }, ref) => {
  const layout = useContext(Layout);
  return (
    <NavTab ref={ref} {...props} active={!!isFocused} icon={TAB_ICON[name]} label={label} layout={layout}
      onPress={e => { if (!isFocused) tap(); onPress?.(e); }} />
  );
});
TabButton.displayName = 'TabButton';

// Same structure as Expo's template: TabList asChild → a custom bar whose direct children are the TabTriggers.
const TabShell = forwardRef<View, { children?: React.ReactNode }>(({ children, ...props }, ref) => {
  const ins = useSafeAreaInsets(), path = usePathname(), { width } = useWindowDimensions();
  const current = TABS.find(t => t.href === path) ?? TABS[0];
  // (no start button beside the bar on the home page any more, Mojtaba 2026-11-06: the bar takes the whole row)
  const layout = tabLayout(width, false, tr(current.label));
  return (
    <Layout.Provider value={layout}>
    <View pointerEvents="box-none" style={{ position: 'absolute', bottom: Math.max(16, ins.bottom), left: 0, right: 0, paddingHorizontal: 16, alignItems: 'center' }}>
      <View pointerEvents="box-none" style={{ flexDirection: 'row', alignItems: 'center', gap: 8, width: '100%', maxWidth: 440 }}>
        {/* (data-bar: left out when the page under the bar is read, bar-shade.tsx) */}
        <NavRail ref={ref} {...props} {...({ dataSet: { bar: '1' } } as any)} style={{ width: layout.railWidth }}>{children}</NavRail>
      </View>
    </View>
    </Layout.Provider>
  );
});
TabShell.displayName = 'TabShell';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />
      <TabList asChild>
        <TabShell>
          {TABS.map(t => (
            <TabTrigger key={t.name} name={t.name} href={t.href as any} asChild>
              <TabButton name={t.name} label={t.label} />
            </TabTrigger>
          ))}
        </TabShell>
      </TabList>
    </Tabs>
  );
}
