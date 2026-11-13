// Shared bottom navigation: the round pill of tabs (Mojtaba 2026-11-13, after the «BottomNavBar» component; the
// notched bar with its «+» capsule and the «Liquid Glass Navbar» before): the open tab's name slides out beside its
// icon on a tint of the theme's colour, the others icons only (pill-bar.tsx). Drawn with React Native, the same on the
// web and the phones. Expo Router's tabs stay underneath, their trigger row hidden: the pill moves between them.
import { router, usePathname } from 'expo-router';
import { TabList, TabSlot, Tabs, TabTrigger } from 'expo-router/ui';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RTL } from '@/lib/i18n';
import { type BarTab } from './liquid-bar-types';
import { PillBar } from './pill-bar';
import { TABS } from './tabs';

// The bar's room at the bottom of each page (with the gap under it: kit.tsx).
export { TAB_BAR_H } from './tab-look';

// Each tab's icon and the scene it plays when tapped: home hops, learning falls like a drop, the test pops, the
// settings' cog spins.
const LOOK: Record<string, Pick<BarTab, 'icon' | 'fx'>> = {
  index: { icon: 'house', fx: 'glow' },
  learn: { icon: 'learn', fx: 'drop' },
  exam: { icon: 'exam', fx: 'pop' },
  settings: { icon: 'settings', fx: 'spin' },
};
const BAR_TABS: BarTab[] = TABS.map(t => ({ name: t.name, label: t.label, ...LOOK[t.name] }));

function Bar() {
  const path = usePathname(), ins = useSafeAreaInsets(), { width } = useWindowDimensions();
  const found = TABS.findIndex(t => t.href === path);
  // (a page inside a tab, e.g. /learn/…: the tab whose address it starts with)
  const active = found >= 0 ? found : Math.max(0, TABS.findIndex(t => t.href !== '/' && path.startsWith(t.href + '/')));
  // Icons only on a narrow screen (the labels are the tabs' accessible names); Persian labels are wider.
  const compact = width < (RTL ? 460 : 420);
  return <PillBar tabs={BAR_TABS} active={active} bottomInset={ins.bottom} compact={compact} onSelect={i => router.navigate(TABS[i].href as any)} />;
}

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />
      <TabList style={{ display: 'none' }}>
        {TABS.map(t => <TabTrigger key={t.name} name={t.name} href={t.href as any} />)}
      </TabList>
      <Bar />
    </Tabs>
  );
}
