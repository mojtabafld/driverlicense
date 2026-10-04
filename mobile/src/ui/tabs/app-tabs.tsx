// The four parts of the app as native tabs: on iOS Apple's own tab bar as the system draws it (Liquid Glass, system
// colours, light and dark; the chosen tab in the app's teal); on Android Material tabs in the site's colours. The icons
// are the app's own drawings on every platform.
// The screens pad for the status bar and the tab bar themselves (Screen), so iOS must not add its own inset to their
// first scroll view as well: that pushed the content down twice under a blurred band.
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

import { UBER, useColors, useIsDark } from '../theme';
import { TABS } from './tabs';

// The same four drawings as the web's tab bar and the rest of the app (src/ui/icon.tsx: house, check in a circle, book,
// gear), as pictures the system tints in the tab colours, so the tab icons look alike on iOS, Android and the web.
// Made from those drawings into assets/images/tabs (26 pt, @2x and @3x).
const TAB_IMG: Record<string, number> = {
  index: require('../../../assets/images/tabs/house.png'),
  exam: require('../../../assets/images/tabs/exam.png'),
  learn: require('../../../assets/images/tabs/learn.png'),
  settings: require('../../../assets/images/tabs/settings.png'),
};

export default function AppTabs() {
  const c = useColors(), dark = useIsDark();
  const android = Platform.OS === 'android'
    ? { tintColor: UBER ? c.text : c.link, backgroundColor: c.surface, iconColor: c.muted, labelStyle: { color: c.muted }, indicatorColor: UBER ? c.surface2 : c.accentSoft }
    : { tintColor: UBER ? c.text : dark ? c.link : c.accent }; // iOS: the system's bar, the chosen tab in the app's teal (text colour in the Uber look)
  return (
    <NativeTabs {...android}>
      {TABS.map(t => (
        <NativeTabs.Trigger key={t.name} name={t.name} disableAutomaticContentInsets={Platform.OS === 'ios'}>
          <NativeTabs.Trigger.Label>{t.label}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon src={TAB_IMG[t.name]} renderingMode="template" />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
