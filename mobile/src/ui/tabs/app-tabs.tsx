// Shared bottom navigation: the selected tab is an icon-and-label pill; the other tabs
// are icon-only circles, on a softly tinted rail that follows the selected theme.
// On the home page only, a round button of its own beside the bar, at its end (right in English and Danish, left in
// Persian) starts a random 25-question test at once (StartButton; Mojtaba 2026-10-25).
import { router, usePathname } from 'expo-router';
import { TabList, TabSlot, Tabs, TabTrigger, type TabTriggerSlotProps } from 'expo-router/ui';
import { createContext, forwardRef, useContext } from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PROVE_BANK } from '@/lib/config';
import { toPremium, useFree } from '@/lib/free';
import { tr } from '@/lib/i18n';
import { FULL, shuffle } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { tap } from '../kit';
import { Icon, type IconName } from '../icon';
import { TABS } from './tabs';
import { NavRail, NavTab } from './tab-item';
import { tabLayout, useTabLook } from './tab-look';

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

// The start button: a random test of FULL questions from the whole bank (the exam tab's card's bank: the app's own on
// the main site, prove.dk's at /app); without free tests left, the premium page, as the card's button.
function StartButton() {
  const look = useTabLook(), layout = useContext(Layout);
  const { newBank, bank } = useApp();
  const src = PROVE_BANK ? bank : newBank;
  const { randomLeft } = useFree();
  const start = () => {
    tap();
    if (!randomLeft) { toPremium(); return; }
    if (!src?.questions.length) return;
    session.plan = { mode: PROVE_BANK ? 'random' : 'new', ids: shuffle(src.questions.map(q => q.id)).slice(0, FULL), title: 'آزمون تصادفی' };
    router.push('/run');
  };
  // (in the chosen tab's colours: the theme's colour, its icon in the colour on it; Mojtaba 2026-10-25)
  const d = layout.startSize;
  return (
    // (data-bar: not a part of the page under the bars, bar-shade.tsx)
    <Pressable {...({ dataSet: { bar: '1' } } as any)} onPress={start} accessibilityRole="button" accessibilityLabel={tr('شروع آزمون')} hitSlop={4}
      style={({ pressed }) => ({ width: d, height: d, borderRadius: d / 2, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.8 : 1,
        backgroundColor: look.active })}>
      <Icon name="play" size={22} color={look.onActive} />
    </Pressable>
  );
}

// Same structure as Expo's template: TabList asChild → a custom bar whose direct children are the TabTriggers.
const TabShell = forwardRef<View, { children?: React.ReactNode }>(({ children, ...props }, ref) => {
  const ins = useSafeAreaInsets(), path = usePathname(), home = path === '/', { width } = useWindowDimensions();
  const current = TABS.find(t => t.href === path) ?? TABS[0];
  const layout = tabLayout(width, home, tr(current.label));
  return (
    <Layout.Provider value={layout}>
    <View pointerEvents="box-none" style={{ position: 'absolute', bottom: Math.max(16, ins.bottom), left: 0, right: 0, paddingHorizontal: 16, alignItems: 'center' }}>
      <View pointerEvents="box-none" style={{ flexDirection: 'row', alignItems: 'center', gap: 8, width: '100%', maxWidth: 440 }}>
        {/* (data-bar: left out when the page under the bar is read, bar-shade.tsx) */}
        <NavRail ref={ref} {...props} {...({ dataSet: { bar: '1' } } as any)} style={{ width: layout.railWidth }}>{children}</NavRail>
        {home ? <StartButton /> : null}
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
