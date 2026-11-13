// Shared bottom navigation: the notched tab bar (Mojtaba 2026-11-13, after github.com/MrJs6781/tab-bar-interaction;
// the «Liquid Glass Navbar» before): a white bar with a round notch in its middle, two tabs each side, a stretching
// dot under the open tab, and in the notch a round «+» that grows into a capsule of quick starts (notch-bar.tsx). Drawn
// with React Native, the same on the web and the phones. Expo Router's tabs stay underneath, their trigger row hidden:
// the bar moves between them.
import { router, usePathname } from 'expo-router';
import { TabList, TabSlot, Tabs, TabTrigger } from 'expo-router/ui';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RTL } from '@/lib/i18n';
import { BottomMenu } from '../bottom-menu';
import { BAR_GAP, type BarTab } from './liquid-bar-types';
import { BAR_H, NotchBar } from './notch-bar';
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
  return <NotchBar tabs={BAR_TABS} active={active} bottomInset={ins.bottom} compact={compact} width={width} onSelect={i => router.navigate(TABS[i].href as any)} />;
}

// The quick menu's round button, floating just above the tab bar at the reading end (ui/bottom-menu.tsx; Mojtaba
// 2026-11-13).
function Menu() {
  const ins = useSafeAreaInsets(), { width } = useWindowDimensions();
  return <BottomMenu bottom={ins.bottom + BAR_GAP + BAR_H * (Math.min(width, 420) / 420) + 12} />;
}

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />
      <TabList style={{ display: 'none' }}>
        {TABS.map(t => <TabTrigger key={t.name} name={t.name} href={t.href as any} />)}
      </TabList>
      <Bar />
      <Menu />
    </Tabs>
  );
}
