// A new Android app is out: once per app start, when the server's newest build (LATEST_APP_VERSION in the dashboard,
// /api/config `app`) is newer than this app's own (EXPO_PUBLIC_APP_BUILD, put in by the APK workflow), the app asks its
// user to install it, with a button to the download and «بعداً» (Mojtaba 2026-10-19). Only in the Android app: the web
// version is always the newest, and builds made without a number (development) never ask.
import { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';

import { api } from '@/lib/api';
import { Confirm } from './confirm';

const APP_BUILD = parseInt(process.env.EXPO_PUBLIC_APP_BUILD || '', 10) || 0;

export function UpdatePrompt() {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (Platform.OS !== 'android' || !APP_BUILD) return;
    api<{ app?: { build: number; url: string } }>('GET', 'config')
      .then(d => { if (d.app && d.app.build > APP_BUILD && d.app.url) setUrl(d.app.url); })
      .catch(() => {});
  }, []);
  return (
    <Confirm open={!!url} icon="sparkles" title="نسخه‌ی جدید اپ"
      text="نسخه‌ی تازه‌ای از اپ منتشر شده است. برای استفاده از آخرین امکانات و اصلاحات، آن را نصب کنید."
      cancel="بعداً" ok="نصب نسخه‌ی جدید" okIcon="refresh" onCancel={() => setUrl(null)}
      onOk={() => { if (url) Linking.openURL(url).catch(() => {}); setUrl(null); }} />
  );
}
