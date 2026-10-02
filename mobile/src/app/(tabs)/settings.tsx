// Settings and account.
import { Alert, Linking, Platform, Pressable, Switch, View } from 'react-native';

import { API_URL } from '@/lib/config';
import { faNum } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { Card, Screen, Segmented, T, tap } from '@/ui/kit';
import { useColors } from '@/ui/theme';

function Row({ title, sub, right }: { title: string; sub?: string; right: React.ReactNode }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 }}>
      <View style={{ flex: 1 }}>
        <T style={{ fontWeight: '700' }}>{title}</T>
        {sub ? <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>{sub}</T> : null}
      </View>
      {right}
    </View>
  );
}

export default function Settings() {
  const c = useColors();
  const { user, settings, setSettings, logout, attempts } = useApp();
  const confirmLogout = () => {
    if (Platform.OS === 'web') { if (window.confirm('از حساب کاربری خارج می‌شوید؟')) logout(); return; }
    Alert.alert('خروج از حساب', 'از حساب کاربری خارج می‌شوید؟', [{ text: 'انصراف', style: 'cancel' }, { text: 'خروج', style: 'destructive', onPress: logout }]);
  };
  // Switches in the site's navy.
  const sw = { trackColor: { false: c.line, true: c.accent }, thumbColor: '#fff', activeThumbColor: '#fff' } as const;
  return (
    <Screen title="تنظیمات">
      <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: c.accent, alignItems: 'center', justifyContent: 'center' }}>
          <T style={{ color: '#fff', fontSize: 22, fontWeight: '700', textAlign: 'center' }}>{(user?.name || '?').slice(0, 1).toUpperCase()}</T>
        </View>
        <View style={{ flex: 1 }}>
          <T style={{ fontWeight: '700', fontSize: 17 }}>{user?.name}</T>
          <T style={{ color: c.muted, fontSize: 13, writingDirection: 'ltr', textAlign: 'right' }}>@{user?.username} · {faNum(attempts.length)} آزمون</T>
        </View>
      </Card>
      <Card style={{ gap: 10 }}>
        <Row title="زبان آزمون" sub="سؤال‌ها و گزینه‌ها به این زبان نمایش داده می‌شوند." right={null} />
        <Segmented value={settings.lang ?? 'da'} onChange={lang => setSettings({ lang })} options={[{ value: 'da', label: 'دانمارکی' }, { value: 'en', label: 'انگلیسی' }]} />
        <Row title="ترجمه‌ی فارسی زیر گزینه‌ها" right={<Switch {...sw} value={settings.showFa} onValueChange={v => { tap(); setSettings({ showFa: v }); }} />} />
        <Row title="زمان‌سنج" sub="برای هر سؤال یک دقیقه، مثل آزمون اصلی." right={<Switch {...sw} value={settings.timer} onValueChange={v => { tap(); setSettings({ timer: v }); }} />} />
      </Card>
      <Card style={{ gap: 6 }}>
        <Pressable onPress={() => Linking.openURL(API_URL)}><Row title="نسخه‌ی وب سایت" sub={API_URL.replace(/^https?:\/\//, '')} right={<T style={{ color: c.link }}>باز کردن</T>} /></Pressable>
        <Pressable onPress={confirmLogout}><Row title="خروج از حساب" right={<T style={{ color: c.bad, fontWeight: '700' }}>خروج</T>} /></Pressable>
      </Card>
    </Screen>
  );
}
