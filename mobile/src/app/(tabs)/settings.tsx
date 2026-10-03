// Settings and account.
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { Alert, Platform, Pressable, View } from 'react-native';

import { faNum } from '@/lib/logic';
import { fmtDay } from '@/lib/names';
import { useApp } from '@/lib/store';
import { Icon } from '@/ui/icon';
import { Card, Screen, Segmented, T, tap } from '@/ui/kit';
import { useColors, useTheme } from '@/ui/theme';
import { Toggle } from '@/ui/toggle';

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
  const { user, settings, setSettings, logout } = useApp();
  const { mode, setMode } = useTheme();
  const confirmLogout = () => {
    if (Platform.OS === 'web') { if (window.confirm('از حساب کاربری خارج می‌شوید؟')) logout(); return; }
    Alert.alert('خروج از حساب', 'از حساب کاربری خارج می‌شوید؟', [{ text: 'انصراف', style: 'cancel' }, { text: 'خروج', style: 'destructive', onPress: logout }]);
  };
  // Switches in the app's teal.
  return (
    <Screen title="تنظیمات">
      <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        {/* The name opens the account page (name and password); sign-out stays at the end. */}
        <Pressable onPress={() => { tap(); router.push('/account'); }} accessibilityRole="button" accessibilityLabel="حساب کاربری"
          style={({ pressed }) => ({ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14, opacity: pressed ? 0.7 : 1 })}>
          <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: c.accent, alignItems: 'center', justifyContent: 'center' }}>
            <T style={{ color: '#fff', fontSize: 22, fontWeight: '700', textAlign: 'center' }}>{(user?.name || '?').slice(0, 1).toUpperCase()}</T>
          </View>
          <View style={{ flex: 1 }}>
            <T style={{ fontWeight: '700', fontSize: 17 }}>{user?.name}</T>
            {/* The day the account was made */}
            {user?.created ? <T style={{ color: c.muted, fontSize: 13 }} numberOfLines={1}>عضو از {fmtDay(user.created)}</T> : null}
          </View>
          <Icon name="chevronLeft" size={16} color={c.faint} weight="semibold" />
        </Pressable>
        <Pressable onPress={() => { tap(); confirmLogout(); }} hitSlop={8} accessibilityRole="button" accessibilityLabel="خروج از حساب"
          style={({ pressed }) => ({ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.badSoft : c.surface2 })}>
          <Icon name="exit" size={20} color={c.bad} weight="semibold" />
        </Pressable>
      </Card>
      <Card style={{ gap: 10 }}>
        <Row title="ظاهر" sub="«خودکار» مثل تنظیم روشن / تیره‌ی دستگاه شما عوض می‌شود." right={null} />
        <Segmented value={mode} onChange={setMode} options={[{ value: 'system', label: 'خودکار' }, { value: 'light', label: 'روشن' }, { value: 'dark', label: 'تیره' }]} />
      </Card>
      <Card style={{ gap: 10 }}>
        <Row title="زبان آزمون" sub="سؤال‌ها و گزینه‌ها به این زبان نمایش داده می‌شوند." right={null} />
        <Segmented value={settings.lang ?? 'da'} onChange={lang => setSettings({ lang })} options={[{ value: 'da', label: 'دانمارکی' }, { value: 'en', label: 'انگلیسی' }]} />
        <Row title="ترجمه‌ی فارسی زیر گزینه‌ها" right={<Toggle label="ترجمه‌ی فارسی زیر گزینه‌ها" value={settings.showFa} onChange={v => { setSettings({ showFa: v }); }} />} />
        <Row title="زمان‌سنج" sub="برای هر سؤال یک دقیقه، مثل آزمون اصلی." right={<Toggle label="زمان‌سنج" value={settings.timer} onChange={v => { setSettings({ timer: v }); }} />} />
      </Card>
      <Card>
        <Row title="نسخه‌ی نرم‌افزار" right={<T style={{ color: c.muted, writingDirection: 'ltr' }}>{faNum(Constants.expoConfig?.version ?? '1.0.0')}</T>} />
      </Card>
    </Screen>
  );
}
