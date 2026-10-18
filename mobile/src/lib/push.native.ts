// Notifications in the phone apps (iOS / Android; Mojtaba 2026-10-18): made on the phone itself with expo-notifications,
// no push server needed. The same choices as on the web (the account's /api/notify): the daily reminder at its time
// (repeats every day) and the daily messages, scheduled a week ahead and scheduled again each time the app starts or
// a choice changes. Turned on per device (kept in the secure store); signing out removes what is scheduled. The web
// version is lib/push.ts (the same functions).
import * as Notifications from 'expo-notifications';
import { router, type Href } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { Linking, Platform } from 'react-native';

import { api } from '@/lib/api';
import { tr } from '@/lib/i18n';
import { DAILY, REMIND, TEST, TITLE, dailyMinute } from '@/lib/notify-text';
import type { Notify, PushState } from '@/lib/push';

export type { Notify, PushState } from '@/lib/push';

const KEY = 'tp.notify', CHANNEL = 'reminders', DAYS = 7;
let seed = '';

// Shown also while the app is open.
Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: true, shouldSetBadge: false }),
});

const isOn = () => { try { return SecureStore.getItem(KEY) === '1'; } catch { return false; } };
const setOn = (v: boolean) => { try { SecureStore.setItem(KEY, v ? '1' : '0'); } catch {} };
// Android: the channel the notifications go to (it must exist before the permission is asked on Android 13).
async function channel() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(CHANNEL, { name: tr('یادآوری‌ها'), importance: Notifications.AndroidImportance.DEFAULT });
}
async function allowed() {
  const p = await Notifications.getPermissionsAsync();
  return { ok: p.granted || p.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL, blocked: !p.granted && p.canAskAgain === false };
}

export async function pushState(): Promise<PushState> {
  const a = await allowed();
  if (a.blocked) return 'denied';
  return a.ok && isOn() ? 'on' : 'off';
}

const day = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
// Everything scheduled again from the account's choices.
async function schedule(n: Notify) {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await channel();
  if (n.remind) {
    const [body, url] = REMIND[n.what];
    await Notifications.scheduleNotificationAsync({
      content: { title: tr(TITLE.remind), body: tr(body), data: { url } },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: +n.time.slice(0, 2), minute: +n.time.slice(3, 5), channelId: CHANNEL },
    });
  }
  if (n.daily) {
    for (let k = 0; k < DAYS; k++) {
      const d = new Date(); d.setDate(d.getDate() + k);
      const m = dailyMinute(seed, day(d), n.remind ? n.time : null);
      const at = new Date(d.getFullYear(), d.getMonth(), d.getDate(), Math.floor(m / 60), m % 60);
      if (at.getTime() < Date.now() + 60e3) continue;
      const [body, url] = DAILY[Math.floor(at.getTime() / 864e5) % DAILY.length];
      await Notifications.scheduleNotificationAsync({
        content: { title: tr(TITLE.daily), body: tr(body), data: { url } },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: at, channelId: CHANNEL },
      });
    }
  }
}
const readNotify = async () => (await api<{ notify: Notify }>('GET', 'notify')).notify;

// Turned on in settings (or with the course page's reminder): asks the phone, then schedules.
export async function enablePush(_key?: string): Promise<PushState> {
  await channel();
  const p = await Notifications.requestPermissionsAsync({ ios: { allowAlert: true, allowSound: true, allowBadge: false } });
  const ok = p.granted || p.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
  if (!ok) return p.canAskAgain === false ? 'denied' : 'off';
  setOn(true);
  await schedule(await readNotify());
  return 'on';
}
export async function disablePush(): Promise<PushState> {
  setOn(false);
  await Notifications.cancelAllScheduledNotificationsAsync();
  return pushState();
}
// On start (signed in): the week ahead scheduled again with the account's choices. `user` keeps each account's
// daily times its own.
export async function syncPush(user?: string): Promise<void> {
  if (user) seed = user;
  if (!isOn() || !(await allowed()).ok) return;
  await schedule(await readNotify());
}
// A choice changed (ui/notify-settings.tsx).
export async function applyNotify(n: Notify): Promise<void> {
  if (isOn() && (await allowed()).ok) await schedule(n);
}
// Signing out: nothing more for this account on this phone (the next account's choices come on its sign-in).
export async function forgetPush(_token?: string): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
// «ارسال اعلان آزمایشی»: one now.
export async function testPush(): Promise<number> {
  await channel();
  await Notifications.scheduleNotificationAsync({ content: { title: tr(TITLE.test), body: tr(TEST), data: { url: '/settings' } }, trigger: null });
  return 1;
}
export function openSystemSettings() { Linking.openSettings().catch(() => {}); }

// A tap on a notification opens its page (also when it started the app).
export function useNotificationTaps() {
  const last = Notifications.useLastNotificationResponse();
  useEffect(() => {
    const url = last?.notification.request.content.data?.url;
    if (typeof url !== 'string') return;
    Notifications.clearLastNotificationResponse();
    router.push(url as Href);
  }, [last]);
}
