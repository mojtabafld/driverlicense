// The four parts of the app as native tabs: on iOS Apple's own tab bar (Liquid Glass on iOS 26), untouched except for
// the site's navy as tint; on Android Material tabs in the site's colours.
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

import { useColors } from '../theme';
import { TABS } from './tabs';

export default function AppTabs() {
  const c = useColors();
  const android = Platform.OS === 'android'
    ? { backgroundColor: c.surface, iconColor: c.muted, labelStyle: { color: c.muted }, indicatorColor: c.accentSoft }
    : {};
  return (
    <NativeTabs tintColor={c.link} {...android}>
      {TABS.map(t => (
        <NativeTabs.Trigger key={t.name} name={t.name}>
          <NativeTabs.Trigger.Label>{t.label}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf={{ default: t.sf, selected: `${t.sf}.fill` as any }} md={t.md as any} />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
