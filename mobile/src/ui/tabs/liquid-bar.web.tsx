// The web's tab bar: the Liquid Glass Navbar itself (src/components/ui/liquid-glass-navbar.tsx), its water drawn by
// WebGL (a CSS drop without it), with the app's own tab icons and labels, centred above the bottom edge.
import { useMemo } from 'react';
import { View } from 'react-native';

import { LiquidNavbar, type LiquidNavItem } from '@/components/ui/liquid-glass-navbar';
import { RTL, tr } from '@/lib/i18n';
import { Icon } from '../icon';
import { useIsDark } from '../theme';
import { BAR_GAP, type LiquidBarProps } from './liquid-bar-types';

export function LiquidBar({ tabs, active, onSelect, bottomInset, compact }: LiquidBarProps) {
  const dark = useIsDark();
  const items = useMemo<LiquidNavItem[]>(() => tabs.map((t, i) => ({
    label: tr(t.label), fx: t.fx,
    // (the item's colour, as the component sets it: soft, and full for the open tab)
    icon: <Icon name={t.icon} size={20} color="currentColor" filled={i === active} />,
  })), [tabs, active]);
  return (
    <View pointerEvents="box-none" {...({ dataSet: { bar: '1' } } as any)}
      style={{ position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', paddingBottom: bottomInset + BAR_GAP }}>
      <LiquidNavbar items={items} active={active} onChange={i => onSelect(i)} tone={dark ? 'dark' : 'light'} compact={compact}
        style={{ direction: RTL ? 'rtl' : 'ltr', fontFamily: RTL ? "'Vazirmatn-500', system-ui, sans-serif" : "'GSans-500', system-ui, sans-serif" }} />
    </View>
  );
}
