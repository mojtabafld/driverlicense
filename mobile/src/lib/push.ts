// Notifications on the web (the server's push.js; settings, «اعلان‌ها»): this device's push subscription, given to the
// signed-in account. On an iPhone or iPad they only work in the app added to the Home Screen (Safari's rule), so there
// the settings ask for that first. The phone apps (iOS / Android builds) have none yet.
import { Platform } from 'react-native';

import { api } from '@/lib/api';

// unsupported: no notifications here; install: an iPhone / iPad outside the Home Screen app; denied: blocked in the
// browser's settings; off: allowed or not asked yet, this device not subscribed; on: subscribed.
export type PushState = 'unsupported' | 'install' | 'denied' | 'off' | 'on';
export type Notify = { remind: boolean; time: string; what: 'lesson' | 'exam'; daily: boolean };

const web = Platform.OS === 'web' && typeof window !== 'undefined';
const ios = () => web && (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
const standalone = () => web && (window.matchMedia?.('(display-mode: standalone)').matches || (navigator as any).standalone === true);
const capable = () => web && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

async function registration(): Promise<ServiceWorkerRegistration> {
  const r = (await navigator.serviceWorker.getRegistration('/')) ?? (await navigator.serviceWorker.register('/sw.js', { scope: '/' }));
  await navigator.serviceWorker.ready;
  return r;
}
const current = async () => (await registration()).pushManager.getSubscription();

export async function pushState(): Promise<PushState> {
  if (!capable()) return ios() && !standalone() ? 'install' : 'unsupported';
  if (Notification.permission === 'denied') return 'denied';
  if (Notification.permission !== 'granted') return 'off';
  try { return (await current()) ? 'on' : 'off'; } catch { return 'off'; }
}

function keyBytes(b64: string): Uint8Array {
  const s = atob((b64 + '='.repeat((4 - (b64.length % 4)) % 4)).replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(s, ch => ch.charCodeAt(0));
}
const tz = () => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return 'Europe/Copenhagen'; } };

// Asks the browser (called straight from the tap: Safari asks only then), subscribes and gives the account this device.
export async function enablePush(key: string): Promise<PushState> {
  if (!capable()) return pushState();
  const asked = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
  if (asked !== 'granted') return asked === 'denied' ? 'denied' : 'off';
  const r = await registration();
  const sub = (await r.pushManager.getSubscription()) ?? (await r.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes(key) as BufferSource }));
  await api('POST', 'pushsub', { sub: sub.toJSON(), tz: tz() });
  return 'on';
}

// Allowed earlier on this device: gives the signed-in account this device again (after signing in, or a new
// subscription from the browser). Quiet when there is nothing to do.
export async function syncPush(): Promise<void> {
  if (!capable() || Notification.permission !== 'granted') return;
  const sub = await current().catch(() => null);
  if (sub) await api('POST', 'pushsub', { sub: sub.toJSON(), tz: tz() }).catch(() => {});
}

// Signing out: the account forgets this device (with the account's token, before it goes).
export async function forgetPush(token: string): Promise<void> {
  if (!capable() || Notification.permission !== 'granted') return;
  const sub = await current().catch(() => null);
  if (sub) await api('POST', 'pushunsub', { endpoint: sub.endpoint }, token).catch(() => {});
}

// Turned off in settings: the account forgets this device and the browser drops the subscription.
export async function disablePush(): Promise<PushState> {
  if (!capable()) return pushState();
  const sub = await current().catch(() => null);
  if (sub) {
    await api('POST', 'pushunsub', { endpoint: sub.endpoint }).catch(() => {});
    await sub.unsubscribe().catch(() => false);
  }
  return pushState();
}
