// A new Android app is out: once per app start, when the server's newest version (LATEST_APP_VERSION in the dashboard,
// /api/config `app`) is newer than this app's own, the one the settings show («نسخه‌ی نرم‌افزار», app.json's version,
// x.x such as 1.0; Mojtaba 2026-10-20), the app asks its user to install it, with a button to the download and «بعداً».
// Only in the Android app: the web version is always the newest.
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';

import { api } from '@/lib/api';
import { Confirm } from './confirm';

const APP_VERSION = Constants.expoConfig?.version ?? '';
// x.x versions compared part by part (1.10 is newer than 1.9); anything else is never newer.
const parts = (v: string) => (/^\d+\.\d+$/.test(v) ? v.split('.').map(Number) : null);
export const isNewer = (latest: string, mine: string) => {
  const a = parts(latest), b = parts(mine);
  return !!a && !!b && (a[0] !== b[0] ? a[0] > b[0] : a[1] > b[1]);
};

export function UpdatePrompt() {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (Platform.OS !== 'android' || !parts(APP_VERSION)) return;
    api<{ app?: { version: string; url: string } }>('GET', 'config')
      .then(d => { if (d.app && isNewer(d.app.version, APP_VERSION) && d.app.url) setUrl(d.app.url); })
      .catch(() => {});
  }, []);
  return (
    <Confirm open={!!url} icon="sparkles" title="نسخه‌ی جدید اپ"
      text="نسخه‌ی تازه‌ای از اپ منتشر شده است. برای استفاده از آخرین امکانات و اصلاحات، آن را نصب کنید."
      cancel="بعداً" ok="نصب نسخه‌ی جدید" okIcon="refresh" onCancel={() => setUrl(null)}
      onOk={() => { if (url) Linking.openURL(url).catch(() => {}); setUrl(null); }} />
  );
}
