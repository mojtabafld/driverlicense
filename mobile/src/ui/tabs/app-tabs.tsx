// The four parts of the app as native tabs: on iOS Apple's own tab bar as the system draws it (Liquid Glass, system
// colours, light and dark; the chosen tab in the app's teal); on Android Material tabs in the site's colours.
// The screens pad for the status bar and the tab bar themselves (Screen), so iOS must not add its own inset to their
// first scroll view as well: that pushed the content down twice under a blurred band.
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

import { useColors, useIsDark } from '../theme';
import { TABS } from './tabs';

export default function AppTabs() {
  const c = useColors(), dark = useIsDark();
  const android = Platform.OS === 'android'
    ? { tintColor: c.link, backgroundColor: c.surface, iconColor: c.muted, labelStyle: { color: c.muted }, indicatorColor: c.accentSoft }
    : { tintColor: dark ? c.link : c.accent }; // iOS: the system's bar, with the chosen tab in the app's teal
  return (
    <NativeTabs {...android}>
      {TABS.map(t => (
        <NativeTabs.Trigger key={t.name} name={t.name} disableAutomaticContentInsets={Platform.OS === 'ios'}>
          <NativeTabs.Trigger.Label>{t.label}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf={{ default: t.sf, selected: `${t.sf}.fill` as any }} md={t.md as any} />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
