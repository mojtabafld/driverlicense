// Settings and account.
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { EXAM_FOR, TRANS_DEFAULT, getTransLang, UI_LANG, setUiLang, t as fmt, type UiLang } from '@/lib/i18n';
import { PROVE_PICS } from '@/lib/config';
import { faNum } from '@/lib/logic';
import { fmtDay } from '@/lib/names';
import { useApp } from '@/lib/store';
import { Avatar, AvatarSheet } from '@/ui/avatar';
import { Confirm } from '@/ui/confirm';
import { Field } from '@/ui/field';
import { Icon, type IconName } from '@/ui/icon';
import { PageIcon } from '@/ui/page-icon';
import { Card, OkTick, Screen, Segmented, T, physical, tap } from '@/ui/kit';
import { useColors, useTheme } from '@/ui/theme';
import { VoiceChoice } from '@/ui/speak';
import { Toggle } from '@/ui/toggle';
import { PaletteRow } from '@/ui/palette-pick';

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

export default function Settings() {
  const c = useColors();
  const { user, settings, setSettings, logout, deleteAccount, tts, pay, premium } = useApp();
  const { mode, setMode } = useTheme();
  // A guest account cannot be edited or deleted: no account page, no delete line.
  const guest = !!user?.guest;
  // Sign-out asks first, in the app's own dialog.
  const [askOut, setAskOut] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const confirmLogout = () => setAskOut(true);
  // Deleting the account (main site only, not /app) asks first, with the password, in the same dialog.
  const [askDel, setAskDel] = useState(false), [delPw, setDelPw] = useState(''), [delErr, setDelErr] = useState(''), [delBusy, setDelBusy] = useState(false);
  const closeDel = () => { if (delBusy) return; setAskDel(false); setDelPw(''); setDelErr(''); };
  const doDelete = async () => {
    if (delBusy) return;
    if (!delPw) return setDelErr('رمز عبور را وارد کنید.');
    setDelBusy(true); setDelErr('');
    try { await deleteAccount(delPw); }
    catch (e) { setDelErr(e instanceof Error && e.message ? e.message : 'حذف نشد؛ دوباره امتحان کنید.'); setDelBusy(false); }
  };
  // «نسخه‌ی ویژه»: when it can be bought (a Stripe key on the server), or the account has it.
  const showPrem = !!(pay || user?.premium);
  const premRow = <LinkRow icon="sparkles" title="نسخه‌ی ویژه" ok={premium} sub={premium && user?.premium ? fmt('فعال تا {0}', fmtDay(user.premium.until)) : premium ? 'برای حساب شما فعال است' : 'تحلیل هوش مصنوعی و خواندن سؤال‌ها با صدا'} onPress={() => router.push('/premium')} last />;
  // Switches in the app's teal.
  return (
    <Screen lead={<PageIcon name="settings" always />} title="تنظیمات">
      <AvatarSheet open={avatarOpen} onClose={() => setAvatarOpen(false)} />
      <Confirm open={askOut} icon="exit" danger title="خروج از حساب؟" text="برای ادامه‌ی تمرین دوباره باید وارد حساب خود شوید. پیشرفت شما ذخیره می‌ماند."
        cancel="ماندن" ok="خروج" okIcon="exit" onCancel={() => setAskOut(false)} onOk={() => { setAskOut(false); logout(); }} />
      {!PROVE_PICS ? (
        <Confirm open={askDel} icon="trash" danger title="حذف حساب کاربری؟"
          text="حساب شما با همه‌ی آزمون‌ها، درس‌ها، اشتباهات و تنظیمات برای همیشه پاک می‌شود و برنمی‌گردد. برای تأیید، رمز عبور خود را وارد کنید."
          cancel="انصراف" ok={delBusy ? 'در حال حذف…' : 'حذف حساب'} okIcon="trash" onCancel={closeDel} onOk={doDelete}>
          <View style={{ gap: 8 }}>
            <Field icon="lock" label="رمز عبور" value={delPw} onChange={v => { setDelPw(v); setDelErr(''); }} secure ltr onSubmit={doDelete} />
            {delErr ? <T style={{ fontSize: 13.5, color: c.bad, textAlign: 'center' }}>{delErr}</T> : null}
          </View>
        </Confirm>
      ) : null}
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
        {/* Delete the account: a quiet red line under the user, it asks first (main site only). */}
        {!PROVE_PICS && !guest ? (
          <Pressable onPress={() => { tap(); setAskDel(true); }} accessibilityRole="button" accessibilityLabel="حذف حساب کاربری"
            style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6, paddingTop: 12, borderTopWidth: 1, borderTopColor: c.line, opacity: pressed ? 0.6 : 1 })}>
            <Icon name="trash" size={16} color={c.bad} />
            <T style={{ flex: 1, color: c.bad, fontWeight: '700', fontSize: 14 }}>حذف حساب کاربری</T>
          </Pressable>
        ) : null}
      </Card>
      {/* /app: «نسخه‌ی ویژه» stays a card of its own. */}
      {PROVE_PICS && showPrem ? <Card style={{ gap: 4 }}>{premRow}</Card> : null}
      {/* The app's language (main site): Persian, English or Danish, each named in its own language; a change reloads
          the page in it and is kept in the account too. */}
      {/* One card: the app's language (main site) and the look. */}
      <Card style={{ gap: 10 }}>
      {!PROVE_PICS ? (
        <>
          <Row title="زبان برنامه" sub="متن‌ها، درس‌ها و منوهای اپ به این زبان نمایش داده می‌شوند." right={null} />
          <Segmented value={UI_LANG} onChange={(ui: UiLang) => { if (ui === UI_LANG) return; setSettings({ ui, lang: EXAM_FOR[ui] }).catch(() => {}).finally(() => setUiLang(ui)); }}
            options={[{ value: 'fa', label: 'فارسی', raw: true }, { value: 'en', label: 'English' }, { value: 'da', label: 'Dansk' }]} />
          <View style={{ marginTop: 4, borderTopWidth: 1, borderTopColor: c.line }} />
        </>
      ) : null}
        <Row title="ظاهر" sub="«خودکار» مثل تنظیم روشن / تیره‌ی دستگاه شما عوض می‌شود." right={null} />
        <Segmented value={mode} onChange={setMode} options={[{ value: 'system', label: 'خودکار' }, { value: 'light', label: 'روشن' }, { value: 'dark', label: 'تیره' }]} />
        {/* The colour theme (main site and the Android app): ten named themes; a change reloads the app in it. */}
        {!PROVE_PICS ? (
          <View style={{ marginTop: 4, borderTopWidth: 1, borderTopColor: c.line, paddingTop: 6 }}><PaletteRow /></View>
        ) : null}
      </Card>
      <Card style={{ gap: 10 }}>
        <Row title="زبان آزمون" sub="سؤال‌ها و گزینه‌ها به این زبان نمایش داده می‌شوند." right={null} />
        <Segmented value={settings.lang ?? 'da'} onChange={lang => setSettings({ lang })} options={[{ value: 'da', label: 'دانمارکی' }, { value: 'en', label: 'انگلیسی' }]} />
        {/* Main site: the translation's language; left alone it follows the app's language (picked on first signing in).
            The exam's own language shows no translation. */}
        {!PROVE_PICS ? (
          <>
            <Row title="زبان ترجمه" sub="ترجمه‌ی زیر سؤال‌ها و گزینه‌ها به این زبان نمایش داده می‌شود." right={null} />
            <Segmented value={getTransLang()} onChange={(trans: 'fa' | 'en' | 'da') => setSettings({ trans: trans === TRANS_DEFAULT ? 'auto' : trans })}
              options={[{ value: 'fa', label: 'فارسی', raw: true }, { value: 'en', label: 'انگلیسی' }, { value: 'da', label: 'دانمارکی' }]} />
          </>
        ) : null}
        {/* The read-aloud voice, when the server can read aloud: each option plays a sample in this language. */}
        {tts ? (
          <View style={{ gap: 10, paddingBottom: 4 }}>
            <Row title="صدای خواندن سؤال‌ها" sub="صدای خانم یا آقا؛ روی هر گزینه بزنید تا نمونه‌اش به زبان آزمون پخش شود." right={null} />
            <VoiceChoice />
          </View>
        ) : null}
        {getTransLang() === (settings.lang ?? 'da') ? null : <Row title="ترجمه‌ی فارسی زیر گزینه‌ها" right={<Toggle label="ترجمه‌ی فارسی زیر گزینه‌ها" value={settings.showFa} onChange={v => { setSettings({ showFa: v }); }} />} />}
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
  );
}
