// Shared bottom navigation: the «Liquid Glass Navbar» (Mojtaba 2026-11-13; Material 3's full-width navigation bar
// before): a pill of frosted glass floating above the bottom edge, a drop of water under the open tab that stretches to
// the one tapped, and each tab's icon playing its own little scene. The web draws it with the component itself and its
// WebGL water (liquid-bar.web.tsx, src/components/ui/liquid-glass-navbar.tsx), the phones with React Native
// (liquid-bar.tsx). Expo Router's tabs stay underneath, their trigger row hidden: the pill moves between them.
import { router, usePathname } from 'expo-router';
import { TabList, TabSlot, Tabs, TabTrigger } from 'expo-router/ui';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RTL } from '@/lib/i18n';
import { BottomMenu } from '../bottom-menu';
import { LiquidBar } from './liquid-bar';
import { BAR_GAP, type BarTab } from './liquid-bar-types';
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
  return <LiquidBar tabs={BAR_TABS} active={active} bottomInset={ins.bottom} compact={compact} onSelect={i => router.navigate(TABS[i].href as any)} />;
}

// The quick menu's round button, floating just above the tab bar's pill (ui/bottom-menu.tsx; Mojtaba 2026-11-13).
// (the pill: 46 points of tab, 6 of padding above and below, and its edge)
const PILL_H = 46 + 12 + 2;
function Menu() {
  const ins = useSafeAreaInsets();
  return <BottomMenu bottom={ins.bottom + BAR_GAP + PILL_H + 12} />;
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
