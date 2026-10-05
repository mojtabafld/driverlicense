// Settings and account.
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { faNum } from '@/lib/logic';
import { fmtDay } from '@/lib/names';
import { useApp } from '@/lib/store';
import { Confirm } from '@/ui/confirm';
import { Icon, type IconName } from '@/ui/icon';
import { Card, Screen, Segmented, T, tap } from '@/ui/kit';
import { useColors, useTheme } from '@/ui/theme';
import { VoiceChoice } from '@/ui/speak';
import { Toggle } from '@/ui/toggle';
import { useTour, type TourStep } from '@/ui/tour';

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

// A row that opens a page: its icon, title and a line under it, and an arrow.
function LinkRow({ icon, title, sub, onPress }: { icon: IconName; title: string; sub: string; onPress: () => void }) {
  const c = useColors();
  return (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="button" accessibilityLabel={title}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: c.line, opacity: pressed ? 0.7 : 1 })}>
      <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
        <Icon name={icon} size={19} color={c.text} />
      </View>
      <View style={{ flex: 1 }}>
        <T style={{ fontWeight: '700' }}>{title}</T>
        <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>{sub}</T>
      </View>
      <Icon name="chevronLeft" size={16} color={c.faint} weight="semibold" />
    </Pressable>
  );
}

const TOUR: TourStep[] = [
  { title: 'تنظیمات', text: 'اینجا اپ را به دلخواه خود تنظیم می‌کنید: نام و رمز عبور (با زدن روی نام خود)، ظاهر روشن یا تیره، زبان سؤال‌ها، صدای خواندن سؤال‌ها، ترجمه‌ی فارسی زیر گزینه‌ها و زمان‌سنج. در بخش «راهنما» راهنمای کامل اپ را می‌خوانید یا مشکلی را برای ما گزارش می‌کنید.' },
];

export default function Settings() {
  const c = useColors();
  const { user, settings, setSettings, logout, tts } = useApp();
  const { mode, setMode } = useTheme();
  const tour = useTour('settings', TOUR);
  // Sign-out asks first, in the app's own dialog.
  const [askOut, setAskOut] = useState(false);
  const confirmLogout = () => setAskOut(true);
  // Switches in the app's teal.
  return (
    <>
    <Screen title="تنظیمات">
      <Confirm open={askOut} icon="exit" danger title="خروج از حساب؟" text="برای ادامه‌ی تمرین دوباره باید وارد حساب خود شوید. پیشرفت شما ذخیره می‌ماند."
        cancel="ماندن" ok="خروج" okIcon="exit" onCancel={() => setAskOut(false)} onOk={() => { setAskOut(false); logout(); }} />
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
          {/* Edit: the name opens the account page (name and password). */}
          <View style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: c.nav }}>
            <Icon name="edit" size={19} color={c.navFg} weight="semibold" />
          </View>
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
        {/* The read-aloud voice, when the server can read aloud: each option plays a sample in this language. */}
        {tts ? (
          <View style={{ gap: 10, paddingBottom: 4 }}>
            <Row title="صدای خواندن سؤال‌ها" sub="صدای خانم یا آقا؛ روی هر گزینه بزنید تا نمونه‌اش به زبان آزمون پخش شود." right={null} />
            <VoiceChoice />
          </View>
        ) : null}
        <Row title="ترجمه‌ی فارسی زیر گزینه‌ها" right={<Toggle label="ترجمه‌ی فارسی زیر گزینه‌ها" value={settings.showFa} onChange={v => { setSettings({ showFa: v }); }} />} />
        <Row title="زمان‌سنج" sub="برای هر سؤال یک دقیقه، مثل آزمون اصلی." right={<Toggle label="زمان‌سنج" value={settings.timer} onChange={v => { setSettings({ timer: v }); }} />} />
      </Card>
      {/* «راهنما»: how to use the app, reporting a problem, and the version. */}
      <Card style={{ gap: 4 }}>
        <T style={{ fontWeight: '700', fontSize: 16, marginBottom: 4 }}>راهنما</T>
        <LinkRow icon="help" title="راهنمای استفاده" sub="آزمون، آموزش، اشتباهات و امکانات اپ" onPress={() => router.push('/help')} />
        <LinkRow icon="bug" title="گزارش خطا" sub="مشکلی دیدید؟ برای ما بنویسید" onPress={() => router.push('/report')} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 }}>
          <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
            <Icon name="info" size={19} color={c.text} />
          </View>
          <T style={{ flex: 1, fontWeight: '700' }}>نسخه‌ی نرم‌افزار</T>
          <T style={{ color: c.muted, writingDirection: 'ltr' }}>{faNum(Constants.expoConfig?.version ?? '1.0.0')}</T>
        </View>
      </Card>
    </Screen>
    {tour.overlay}
    </>
  );
}
