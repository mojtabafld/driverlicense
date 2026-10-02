// The four parts of the app as native tabs (system tab bar on iOS, Material tabs on Android), in the site's navy.
import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { useColors } from '../theme';
import { TABS } from './tabs';

export default function AppTabs() {
  const c = useColors();
  return (
    <NativeTabs tintColor={c.link} backgroundColor={c.surface} iconColor={c.muted} labelStyle={{ color: c.muted }}
      indicatorColor={c.accentSoft}>
      {TABS.map(t => (
        <NativeTabs.Trigger key={t.name} name={t.name}>
          <NativeTabs.Trigger.Label>{t.label}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf={{ default: t.sf, selected: `${t.sf}.fill` as any }} md={t.md as any} />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
