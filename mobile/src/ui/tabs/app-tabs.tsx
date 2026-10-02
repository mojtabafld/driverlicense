// The four parts of the app as native tabs: on iOS 26 this is Apple's Liquid Glass tab bar, on Android Material tabs.
import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { TABS } from './tabs';

export default function AppTabs() {
  return (
    <NativeTabs minimizeBehavior="onScrollDown">
      {TABS.map(t => (
        <NativeTabs.Trigger key={t.name} name={t.name}>
          <NativeTabs.Trigger.Label>{t.label}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf={{ default: t.sf, selected: `${t.sf}.fill` as any }} md={t.md as any} />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
