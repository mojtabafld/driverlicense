// Settings and account.
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { useState } from 'react';
import { Animated, Pressable, View } from 'react-native';

import { EXAM_FOR, TRANS_DEFAULT, getTransLang, UI_LANG, setUiLang, t as fmt, type UiLang } from '@/lib/i18n';
import { PROVE_PICS } from '@/lib/config';
import { faNum } from '@/lib/logic';
import { fmtDay } from '@/lib/names';
import { useApp } from '@/lib/store';
import { Avatar, AvatarSheet } from '@/ui/avatar';
import { Collapse, useOpening } from '@/ui/collapse';
import { Confirm } from '@/ui/confirm';
import { Icon, type IconName } from '@/ui/icon';
import { PageIcon } from '@/ui/page-icon';
import { Card, OkTick, Screen, Segmented, T, physical, tap } from '@/ui/kit';
import { useColors, useTheme } from '@/ui/theme';
import { VoiceChoice } from '@/ui/speak';
import { Toggle } from '@/ui/toggle';
import { PaletteRow } from '@/ui/palette-pick';
import { NotifySettings } from '@/ui/notify-settings';

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
function LinkRow({ icon, title, sub, onPress, last, ok }: { icon: IconName; title: string; sub: string; onPress: () => void; last?: boolean; ok?: boolean }) {
  const c = useColors();
  return (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="button" accessibilityLabel={title}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: last ? 0 : 1, borderBottomColor: c.line, opacity: pressed ? 0.7 : 1 })}>
      <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
        <Icon name={icon} size={19} color={c.text} />
      </View>
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

// «تنظیمات زبان» (Mojtaba 2026-10-23): the app's, the exam's and the translation's languages in a part that slides open
// under one row (its icon, title and the app's language, an arrow on the other side turning with it) and shut again.
const UI_NAME: Record<UiLang, string> = { fa: 'فارسی', en: 'English', da: 'Dansk' };
function LangSettings() {
  const c = useColors();
  const { settings, setSettings } = useApp();
  const [open, setOpen] = useState(false);
  const p = useOpening(open);
  const turn = p.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  return (
    <View>
      <Pressable onPress={() => { tap(); setOpen(o => !o); }} accessibilityRole="button" accessibilityState={{ expanded: open }} accessibilityLabel="تنظیمات زبان"
        style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6, opacity: pressed ? 0.7 : 1 })}>
        <View style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
          <Icon name="translate" size={18} color={c.text} />
        </View>
        <View style={{ flex: 1 }}>
          <T style={{ fontWeight: '700' }}>تنظیمات زبان</T>
          {/* (/app has only the exam's language) */}
          {PROVE_PICS ? <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>{(settings.lang ?? 'da') === 'en' ? 'انگلیسی' : 'دانمارکی'}</T>
            : <T raw style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>{UI_NAME[UI_LANG]}</T>}
        </View>
        <Animated.View style={{ transform: [{ rotate: turn }] }}>
          <Icon name="chevronDown" size={16} color={c.faint} weight="semibold" />
        </Animated.View>
      </Pressable>
      <Collapse p={p} open={open}>
        <View style={{ gap: 10, paddingTop: 10, paddingBottom: 4 }}>
          {!PROVE_PICS ? (
            <>
              <Row title="زبان برنامه" right={null} />
              <Segmented value={UI_LANG} onChange={(ui: UiLang) => { if (ui === UI_LANG) return; setSettings({ ui, lang: EXAM_FOR[ui] }).catch(() => {}).finally(() => setUiLang(ui)); }}
                options={[{ value: 'fa', label: 'فارسی', raw: true }, { value: 'en', label: 'English' }, { value: 'da', label: 'Dansk' }]} />
            </>
          ) : null}
          <Row title="زبان آزمون" right={null} />
          <Segmented value={settings.lang ?? 'da'} onChange={lang => setSettings({ lang })} options={[{ value: 'da', label: 'دانمارکی' }, { value: 'en', label: 'انگلیسی' }]} />
          {/* Main site: the translation's language, after the exam's again (Mojtaba 2026-10-22); left alone it follows the app's language (picked on first signing in).
              The exam's own language shows no translation. */}
          {!PROVE_PICS ? (
            <>
              <Row title="زبان ترجمه" right={null} />
              <Segmented value={getTransLang()} onChange={(trans: 'fa' | 'en' | 'da') => setSettings({ trans: trans === TRANS_DEFAULT ? 'auto' : trans })}
                options={[{ value: 'fa', label: 'فارسی', raw: true }, { value: 'en', label: 'انگلیسی' }, { value: 'da', label: 'دانمارکی' }]} />
            </>
          ) : null}
        </View>
      </Collapse>
    </View>
  );
}

export default function Settings() {
  const c = useColors();
  const { user, settings, setSettings, logout, tts, pay, premium } = useApp();
  const { mode, setMode } = useTheme();
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
    <Screen lead={<PageIcon name="settings" always />} title="تنظیمات">
      <AvatarSheet open={avatarOpen} onClose={() => setAvatarOpen(false)} />
      {/* «خروج» alone is «Exit» in English and Danish (leaving an exam or a page); here it is signing out, so those take
          «خروج از حساب»'s «Log out» / «Log ud» while Persian keeps the one word (Mojtaba 2026-10-19). */}
      <Confirm open={askOut} icon="exit" danger title="خروج از حساب؟" text="برای ادامه‌ی تمرین دوباره باید وارد حساب خود شوید. پیشرفت شما ذخیره می‌ماند."
        cancel="ماندن" ok={UI_LANG === 'fa' ? 'خروج' : fmt('خروج از حساب')} okIcon="exit" onCancel={() => setAskOut(false)} onOk={() => { setAskOut(false); logout(); }} />
      <Card style={{ gap: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        {/* The name opens the account page (name and password); sign-out stays at the end. */}
        <Pressable onPress={() => { if (guest) return; tap(); router.push('/account'); }} disabled={guest} accessibilityRole="button" accessibilityLabel="حساب کاربری"
          style={({ pressed }) => ({ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14, opacity: pressed ? 0.7 : 1 })}>
          {/* The profile picture (or the first letter, in the theme's colours): a tap opens the pictures to choose from. */}
          <Pressable onPress={() => { tap(); setAvatarOpen(true); }} hitSlop={4} accessibilityRole="button" accessibilityLabel="عکس پروفایل">
            <Avatar size={52} />
            <View style={{ position: 'absolute', bottom: -2, ...physical({ right: -2 }), width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface, borderWidth: 1.5, borderColor: c.line }}>
              <Icon name="edit" size={11} color={c.text} />
            </View>
          </Pressable>
          <View style={{ flex: 1 }}>
            <T style={{ fontWeight: '700', fontSize: 17 }}>{user?.name}</T>
            {/* The day the account was made */}
            {user?.created ? <T style={{ color: c.muted, fontSize: 13 }} numberOfLines={1}>عضو از {fmtDay(user.created)}</T> : null}
          </View>
          {/* Edit: the name opens the account page (name and password). */}
          {guest ? null : <View style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: c.nav }}>
            <Icon name="edit" size={19} color={c.navFg} weight="semibold" />
          </View>}
        </Pressable>
        <Pressable onPress={() => { tap(); confirmLogout(); }} hitSlop={8} accessibilityRole="button" accessibilityLabel="خروج از حساب"
          style={({ pressed }) => ({ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.badSoft : c.surface2 })}>
          <Icon name="exit" size={20} color={c.bad} weight="semibold" />
        </Pressable>
      </View>
        {/* Main site: «نسخه‌ی ویژه» is a line of the user's card, under the name. */}
        {!PROVE_PICS && showPrem ? (
          <View style={{ marginTop: 6, borderTopWidth: 1, borderTopColor: c.line }}>{premRow}</View>
        ) : null}
      </Card>
      {/* /app: «نسخه‌ی ویژه» stays a card of its own. */}
      {PROVE_PICS && showPrem ? <Card style={{ gap: 4 }}>{premRow}</Card> : null}
      {/* One card: the look and the colour theme. */}
      <Card style={{ gap: 10 }}>
        <Row title="ظاهر" right={null} />
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
            <Row title="صدای خواندن سؤال‌ها" right={null} />
            <VoiceChoice />
          </View>
        ) : null}
        {getTransLang() === (settings.lang ?? 'da') ? null : <Row title="ترجمه‌ی فارسی زیر گزینه‌ها" right={<Toggle label="ترجمه‌ی فارسی زیر گزینه‌ها" value={settings.showFa} onChange={v => { setSettings({ showFa: v }); }} />} />}
        <Row title="زمان‌سنج" right={<Toggle label="زمان‌سنج" value={settings.timer} onChange={v => { setSettings({ timer: v }); }} />} />
      </Card>
      {/* Notifications, under the exam's settings (Mojtaba 2026-10-18; main site on the web): reminders and a daily message (ui/notify-settings.tsx). */}
      {!PROVE_PICS ? <NotifySettings /> : null}
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
  );
}
