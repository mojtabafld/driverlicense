import { useNotificationTaps } from '@/lib/push';
import AppTabs from '@/ui/tabs/app-tabs';

export default function TabsLayout() {
  // A tapped notification opens its page (the phone apps; lib/push.native.ts), once the tabs are there.
  useNotificationTaps();
  return <AppTabs />;
}
