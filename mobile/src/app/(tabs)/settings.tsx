// Settings and account.
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { getTransLang, RTL, UI_LANG, t as fmt, type UiLang } from '@/lib/i18n';
import { PROVE_PICS } from '@/lib/config';
import { faNum, mistakeIds, pctOf } from '@/lib/logic';
import { fmtDay } from '@/lib/names';
import { useApp } from '@/lib/store';
import { Avatar, AvatarSheet } from '@/ui/avatar';
import { Confirm } from '@/ui/confirm';
import { Icon, type IconName } from '@/ui/icon';
import { PageIcon } from '@/ui/page-icon';
import { Card, OkTick, Screen, Segmented, T, physical, tap } from '@/ui/kit';
import { useColors, useTheme } from '@/ui/theme';
import { VoiceChoice } from '@/ui/speak';
import { Toggle } from '@/ui/toggle';
import { useCoachMode } from '@/lib/coach-mode';
import { PaletteRow } from '@/ui/palette-pick';
import { NotifySettings } from '@/ui/notify-settings';
import { DashboardIcon, DashboardWaves } from '@/ui/dashboard-art';
import { useDashboardLook } from '@/ui/dashboard-style';
import { pctText } from '@/ui/activity';

function Row({ title, sub, right, icon }: { title: string; sub?: string; right: React.ReactNode; icon?: IconName }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 }}>
      {icon ? <DashboardIcon name={icon} size={34} /> : null}
      <View style={{ flex: 1 }}>
        <T style={{ fontWeight: '700' }}>{title}</T>
        {sub ? <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>{sub}</T> : null}
      </View>
      {right}
    </View>
  );
}

// A row that opens a page: its icon, title and a line under it, and an arrow.
function LinkRow({ icon, title, sub, onPress, ok }: { icon: IconName; title: string; sub: string; onPress: () => void; last?: boolean; ok?: boolean }) {
  const c = useColors(), look = useDashboardLook();
  return (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="button" accessibilityLabel={title}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 10,
        marginVertical: 3, borderRadius: 18, backgroundColor: look.row, opacity: pressed ? 0.7 : 1 })}>
      <DashboardIcon name={icon} />
      <View style={{ flex: 1 }}>
        <T style={{ fontWeight: '700' }}>{title}</T>
        {/* `ok`: a round green tick before the line (premium is on). */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {ok ? <OkTick size={16} /> : null}
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20, flexShrink: 1 }}>{sub}</T>
        </View>
      </View>
      <Icon name="chevronLeft" size={16} color={c.faint} weight="semibold" />
    </Pressable>
  );
}

// «تنظیمات زبان»: a row opening its own page (app/language.tsx; Mojtaba 2026-10-25), the app's language under it.
const UI_NAME: Record<UiLang, string> = { fa: 'فارسی', en: 'English', da: 'Dansk' };
function LangSettings() {
  const c = useColors(), look = useDashboardLook();
  const { settings } = useApp();
  return (
    <Pressable onPress={() => { tap(); router.push('/language'); }} accessibilityRole="button" accessibilityLabel="تنظیمات زبان"
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 10, borderRadius: 18, backgroundColor: look.row, opacity: pressed ? 0.7 : 1 })}>
      <DashboardIcon name="translate" />
      <View style={{ flex: 1 }}>
        <T style={{ fontWeight: '700' }}>تنظیمات زبان</T>
        {/* (/app has only the exam's language) */}
        {PROVE_PICS ? <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>{(settings.lang ?? 'da') === 'en' ? 'انگلیسی' : 'دانمارکی'}</T>
          : <T raw style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>{UI_NAME[UI_LANG]}</T>}
      </View>
      <Icon name="chevronLeft" size={16} color={c.faint} weight="semibold" />
    </Pressable>
  );
}

export default function Settings() {
  const c = useColors();
  const look = useDashboardLook();
  const { user, attempts, settings, setSettings, logout, tts, pay, premium } = useApp();
  const exams = attempts.filter(a => a.mode !== 'lesson');
  const average = exams.length ? exams.reduce((sum, a) => sum + pctOf(a), 0) / exams.length : null;
  const { mode, setMode } = useTheme();
  const coach = useCoachMode();
  // A guest account cannot be edited or deleted: no account page, no delete line.
  const guest = !!user?.guest;
  // Sign-out asks first, in the app's own dialog.
  const [askOut, setAskOut] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const confirmLogout = () => setAskOut(true);
  // «نسخه‌ی ویژه»: when it can be bought (a Stripe key on the server), or the account has it.
  const showPrem = !!(pay || user?.premium);
  const premRow = <LinkRow icon="sparkles" title="نسخه‌ی ویژه" ok={premium} sub={premium && user?.premium ? fmt('فعال تا {0}', fmtDay(user.premium.until)) : premium ? 'برای حساب شما فعال است' : 'تحلیل هوش مصنوعی و خواندن سؤال‌ها با صدا'} onPress={() => router.push('/premium')} last />;
  // Switches in the app's teal.
  return (
    <Screen dashboard={!PROVE_PICS} lead={<PageIcon name="settings" always />} title="تنظیمات">
      <AvatarSheet open={avatarOpen} onClose={() => setAvatarOpen(false)} />
      {/* «خروج» alone is «Exit» in English and Danish (leaving an exam or a page); here it is signing out, so those take
          «خروج از حساب»'s «Log out» / «Log ud» while Persian keeps the one word (Mojtaba 2026-10-19). */}
      <Confirm open={askOut} icon="exit" danger title="خروج از حساب؟" text="برای ادامه‌ی تمرین دوباره باید وارد حساب خود شوید. پیشرفت شما ذخیره می‌ماند."
        cancel="ماندن" ok={UI_LANG === 'fa' ? 'خروج' : fmt('خروج از حساب')} okIcon="exit" onCancel={() => setAskOut(false)} onOk={() => { setAskOut(false); logout(); }} />
      <Card testID="settings-profile" style={{ gap: 12, padding: 20 }}>
      <DashboardWaves />
      <View style={{ alignItems: 'center', gap: 12, paddingTop: 6, paddingBottom: 4 }}>
        {!guest ? <Pressable onPress={() => { tap(); router.push('/account'); }} accessibilityRole="button" accessibilityLabel="حساب کاربری"
          style={({ pressed }) => ({ position: 'absolute', top: 0, ...physical({ right: 0 }), opacity: pressed ? 0.7 : 1 })}>
          <DashboardIcon name="edit" size={36} />
        </Pressable> : null}
        <Pressable onPress={() => { tap(); confirmLogout(); }} hitSlop={6} accessibilityRole="button" accessibilityLabel="خروج از حساب"
          style={({ pressed }) => ({ position: 'absolute', top: 0, ...physical({ left: 0 }), opacity: pressed ? 0.7 : 1 })}>
          <DashboardIcon name="exit" size={36} color={c.bad} />
        </Pressable>
        <Pressable onPress={() => { tap(); setAvatarOpen(true); }} accessibilityRole="button" accessibilityLabel="عکس پروفایل"
          style={{ width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: look.wash, borderWidth: 1, borderColor: look.edge }}>
          <Avatar size={84} />
          <View style={{ position: 'absolute', bottom: 0, ...physical({ right: 0 }), width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface, borderWidth: 1, borderColor: look.edge }}>
            <Icon name="edit" size={12} color={c.link} />
          </View>
        </Pressable>
        <Pressable disabled={guest} onPress={() => { tap(); router.push('/account'); }} accessibilityRole={guest ? undefined : 'button'} accessibilityLabel="حساب کاربری" style={{ alignItems: 'center', gap: 2 }}>
          <T style={{ fontFamily: RTL ? 'Vazirmatn-700' : 'Inter-700', fontSize: 22, lineHeight: 30, textAlign: 'center' }}>{user?.name}</T>
          {user?.created ? <T style={{ color: c.muted, fontSize: 12.5, textAlign: 'center' }}>عضو از {fmtDay(user.created)}</T> : null}
        </Pressable>
      </View>
      {/* Main site: «نسخه‌ی ویژه» in the profile card, in the box where the tests, average and mistakes were (Mojtaba
          2026-11-05); without it (/app, or no payments) those numbers stay. */}
      {!PROVE_PICS && showPrem ? premRow : (
      <View style={{ flexDirection: 'row', borderRadius: 20, backgroundColor: look.row, paddingVertical: 12 }}>
        {([
          ['آزمون‌ها', faNum(exams.length), 'exam'],
          ['میانگین', average == null ? '–' : pctText(average), 'chart'],
          ['اشتباهات', faNum(mistakeIds(attempts).length), 'warning'],
        ] as const).map(([label, value, icon], i) => <View key={label} style={{ flex: 1, alignItems: 'center', gap: 4, borderLeftWidth: i ? 1 : 0, borderLeftColor: look.edge }}>
          <Icon name={icon} size={17} color={c.link} />
          <T style={{ color: c.muted, fontSize: 11.5, lineHeight: 17 }}>{label}</T>
          <T style={{ fontFamily: RTL ? 'Vazirmatn-700' : 'Inter-700', fontSize: 18, lineHeight: 24 }}>{value}</T>
        </View>)}
      </View>
      )}
      </Card>
      {!PROVE_PICS && !guest ? <Card style={{ gap: 8 }}>
        {/* «حالت مربی» (Mojtaba 2026-10-24): the AI coach, under «نسخه‌ی ویژه»; for premium accounts, on unless turned off
            here (lib/coach-mode.ts); without premium the switch is faded and the line leads to the premium page. */}
        {!PROVE_PICS && !guest ? (
          <Pressable disabled={coach.allowed} onPress={() => router.push('/premium')} accessibilityRole={coach.allowed ? undefined : 'button'}
            style={{ paddingTop: 0 }}>
            <Row icon="coach" title="حالت مربی" sub={coach.allowed ? 'با هوش مصنوعی، از روی آزمون‌ها و درس‌هایتان می‌گوید چه چیزی را تمرین کنید تا بهتر یاد بگیرید.' : 'با هوش مصنوعی به بهتر یاد گرفتن شما کمک می‌کند؛ با نسخه‌ی ویژه.'}
              right={<Toggle label="حالت مربی" value={coach.on} disabled={!coach.allowed} onChange={v => { setSettings({ coach: v }); }} />} />
          </Pressable>
        ) : null}
      </Card> : null}
      {/* /app: «نسخه‌ی ویژه» stays a card of its own. */}
      {PROVE_PICS && showPrem ? <Card style={{ gap: 4 }}>{premRow}</Card> : null}
      {/* One card: the look and the colour theme. */}
      <Card style={{ gap: 10 }}>
        <Row icon="settings" title="ظاهر" right={null} />
        <Segmented value={mode} onChange={setMode} options={[{ value: 'system', label: 'خودکار' }, { value: 'light', label: 'روشن' }, { value: 'dark', label: 'تیره' }]} />
        {/* The colour theme (main site and the Android app): ten named themes; a change reloads the app in it. */}
        {!PROVE_PICS ? (
          <View style={{ marginTop: 4, borderTopWidth: 1, borderTopColor: c.line, paddingTop: 6 }}><PaletteRow /></View>
        ) : null}
      </Card>
      {/* The languages in one card (Mojtaba 2026-10-21): the app's first (main site: Persian, English or Danish, each named
          in its own language; a change reloads the page in it and is kept in the account too), then the exam's and the
          translation's, all three in «تنظیمات زبان», which slides open (Mojtaba 2026-10-23); the exam's other settings under it. */}
      <Card style={{ gap: 10 }}>
        <LangSettings />
        <View style={{ height: 1, backgroundColor: c.line }} />
        {/* The read-aloud voice, when the server can read aloud: each option plays a sample in this language. */}
        {tts ? (
          <View style={{ gap: 10, paddingBottom: 4 }}>
            <Row icon="speaker" title="صدای خواندن سؤال‌ها" right={null} />
            <VoiceChoice />
          </View>
        ) : null}
        {getTransLang() === (settings.lang ?? 'da') ? null : <Row icon="translate" title="ترجمه‌ی فارسی زیر گزینه‌ها" right={<Toggle label="ترجمه‌ی فارسی زیر گزینه‌ها" value={settings.showFa} onChange={v => { setSettings({ showFa: v }); }} />} />}
        <Row icon="clock" title="زمان‌سنج" right={<Toggle label="زمان‌سنج" value={settings.timer} onChange={v => { setSettings({ timer: v }); }} />} />
      </Card>
      {/* Notifications, under the exam's settings (Mojtaba 2026-10-18; main site on the web): reminders and a daily message (ui/notify-settings.tsx). */}
      {!PROVE_PICS ? <NotifySettings /> : null}
      {/* «راهنما»: how to use the app, reporting a problem, and the version. */}
      <Card style={{ gap: 4 }}>
        <T style={{ fontWeight: '700', fontSize: 16, marginBottom: 4 }}>راهنما</T>
        {/* «دستگاه‌های من» (app/devices.tsx): where the account is signed in, and signing the others out. */}
        {!guest ? <LinkRow icon="phone" title="دستگاه‌های من" sub="دستگاه‌هایی که با این حساب وارد شده‌اند" onPress={() => router.push('/devices')} /> : null}
        <LinkRow icon="help" title="راهنمای استفاده" sub="آزمون، آموزش، اشتباهات و امکانات اپ" onPress={() => router.push('/help')} />
        <LinkRow icon="bug" title="گزارش خطا" sub="مشکلی دیدید؟ برای ما بنویسید" onPress={() => router.push('/report')} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 }}>
          <DashboardIcon name="info" />
          <T style={{ flex: 1, fontWeight: '700' }}>نسخه‌ی نرم‌افزار</T>
          <T style={{ color: c.muted, writingDirection: 'ltr' }}>{faNum(Constants.expoConfig?.version ?? '1.0.0')}</T>
        </View>
      </Card>
    </Screen>
  );
}
