// Sign in / sign up. Main site and /app: the welcome screen (ui/welcome.tsx), then one question per screen
// (ui/sign-steps.tsx). The form below (the older design): a tall picture header with the greeting, then on the page (no card) a mode
// switch, fields with icons and one wide button, then the site's three short facts. With email on (the server's
// RESEND_API_KEY) signing up asks for a shown name, an email and a password (the email is the username), the new account waits
// for the link sent there, and signing in takes the email or, for accounts from before, the username. With email on, a
// «forgotten password» link under the password asks for the address and sends a 6-digit code there; the code, typed in
// six boxes (or taken from the keyboard's suggestion), opens the fields for the new password (the server's
// /api/forgot, /api/resetcheck and /api/reset).
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';

import { useApp } from '@/lib/store';
import { Field } from '@/ui/field';
import { Icon } from '@/ui/icon';
import { InstallHint } from '@/ui/install-hint';
import { ArcButton, Backdrop, Button, Hero, L, SegPill, T, tap, useArcSeg } from '@/ui/kit';
import { ARC, useColors, useIsDark } from '@/ui/theme';
import { t as fmt, tr } from '@/lib/i18n';
import { CodeBoxes } from '@/ui/code-boxes';
import { SignSteps } from '@/ui/sign-steps';
import { Welcome } from '@/ui/welcome';

// Sign in / sign up switch: a soft track with the chosen side raised. (Main site, light: the track a step darker than
// the page, as the app's switches look on their white cards, «پاسخ شما / پاسخ صحیح» for one.)
function ModeSwitch({ mode, onChange }: { mode: 'login' | 'register'; onChange: (m: 'login' | 'register') => void }) {
  const c = useColors(), dark = useIsDark(), seg = useArcSeg();
  return (
    <View style={[{ flexDirection: 'row', padding: 4, gap: 4, borderRadius: 14, backgroundColor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }, ARC && seg.track, ARC && !dark && { backgroundColor: '#e4e4e4' }]}>
      {(['login', 'register'] as const).map(m => {
        const on = m === mode;
        return (
          <Pressable key={m} onPress={() => { tap(); onChange(m); }} style={{ flex: 1 }} accessibilityRole="tab" accessibilityState={{ selected: on }}>
            <View style={[{ paddingVertical: 9, borderRadius: 10, backgroundColor: on ? c.surface : 'transparent',
              ...(on ? { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 1 } : {}) },
              ARC && { ...seg.pill(on), paddingVertical: 10, shadowOpacity: 0, elevation: 0 }]}>
              {ARC ? <SegPill on={on} /> : null}
              <T style={[{ textAlign: 'center', fontSize: 14.5, fontWeight: on ? '700' : '600', color: on ? c.link : c.muted }, ARC && seg.label(on)]}>{m === 'login' ? 'ورود' : 'ثبت‌نام'}</T>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function Login() {
  const c = useColors(), dark = useIsDark();
  const { login, register, guest, mail, forgot, checkResetCode, resetPassword } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  // Main site and /app: first the welcome screen, whose two buttons open the form in their mode (Mojtaba 2026-10-20).
  const [welcome, setWelcome] = useState(ARC);
  // 'ask': the forgotten-password form; 'code': its code went out and is typed in; 'set': the new password.
  const [lost, setLost] = useState<'' | 'ask' | 'code' | 'set'>('');
  const [code, setCode] = useState(''), [sentAt, setSentAt] = useState(0), [now, setNow] = useState(Date.now());
  // The «send again» link waits a minute after each code (as the server does).
  useEffect(() => { if (lost !== 'code') return; const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, [lost]);
  const wait = Math.max(0, 60 - Math.floor((now - sentAt) / 1000));
  const [name, setName] = useState(''), [user, setUser] = useState(''), [pw, setPw] = useState(''), [email, setEmail] = useState(''), [pw2, setPw2] = useState('');
  const [err, setErr] = useState(''), [busy, setBusy] = useState(false);
  const byMail = mode === 'register' && mail;
  const ready = !busy && !!pw && (byMail ? /^\S+@\S+\.\S+$/.test(email.trim()) && !!name.trim() : !!user);
  const submit = async () => {
    if (!ready) return;
    setErr(''); setBusy(true);
    try { if (mode === 'login') await login(user.trim(), pw); else if (byMail) await register(name.trim(), '', pw, email.trim()); else await register(name.trim(), user.trim(), pw); }
    catch (e: any) { setErr(e.message); setBusy(false); }
  };
  const asGuest = async () => {
    if (busy) return;
    setErr(''); setBusy(true);
    try { await guest(tr('مهمان')); } catch (e: any) { setErr(e.message); setBusy(false); }
  };
  const okMail = /^\S+@\S+\.\S+$/.test(email.trim());
  const sendCode = async () => {
    if (busy || !okMail) return;
    setErr(''); setBusy(true);
    try { await forgot(email.trim()); setCode(''); setSentAt(Date.now()); setNow(Date.now()); setLost('code'); } catch (e: any) { setErr(e.message); }
    setBusy(false);
  };
  const checkCode = async (v = code) => {
    if (busy || v.length !== 6) return;
    setErr(''); setBusy(true);
    try { await checkResetCode(email.trim(), v); setPw(''); setPw2(''); setLost('set'); } catch (e: any) { setErr(e.message); setCode(''); }
    setBusy(false);
  };
  const setNew = async () => {
    if (busy || !pw || !pw2) return;
    if (pw !== pw2) { setErr('تکرار رمز جدید با خود آن یکی نیست.'); return; }
    setErr(''); setBusy(true);
    try { await resetPassword(email.trim(), code, pw); } catch (e: any) { setErr(e.message); setBusy(false); }
  };
  const backToLogin = () => { tap(); setLost(''); setErr(''); setUser(''); setEmail(''); setPw(''); setPw2(''); setCode(''); setMode('login'); };
  const title = lost === 'set' ? 'رمز عبور جدید' : lost ? 'بازیابی رمز عبور' : mode === 'login' ? 'خوش آمدید' : 'ساخت حساب کاربری';
  const subtitle = lost === 'set' ? 'یک رمز عبور جدید برای حساب خود انتخاب کنید'
    : lost === 'code' ? 'کد ۶ رقمی‌ای را که به ایمیل‌تان فرستادیم وارد کنید'
    : lost ? 'ایمیل حساب خود را وارد کنید تا کد بازیابی رمز برایتان فرستاده شود'
    : mode === 'login' ? 'برای ادامه‌ی تمرین وارد حساب خود شوید' : 'برای ذخیره‌ی پیشرفت و اشتباهات‌تان یک حساب بسازید';
  const errBox = err ? (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, backgroundColor: c.badSoft }}>
      <Icon name="warning" size={17} color={c.bad} />
      <T style={{ flex: 1, color: c.bad, fontSize: 13.5 }}>{err}</T>
    </View>
  ) : null;
  const link = (label: string, onPress: () => void) => (
    <Pressable onPress={onPress} disabled={busy} accessibilityRole="link" hitSlop={8} style={{ alignSelf: 'center', paddingVertical: 6, marginTop: 2 }}>
      {({ hovered }: { pressed: boolean; hovered?: boolean }) => <T style={{ color: dark ? c.link : c.cta, fontSize: 15.5, fontWeight: '500', textDecorationLine: hovered ? 'underline' : 'none' }}>{label}</T>}
    </Pressable>
  );
  // The forgotten-password steps, in place of the sign-in form.
  const lostForm = lost === 'ask' ? <>
    <Field icon="send" label="ایمیل" value={email} onChange={v => setEmail(v.replace(/\s/g, ''))} ltr onSubmit={sendCode} />
    {errBox}
    <ArcButton big label={busy ? '…' : 'ارسال کد'} onPress={sendCode} disabled={busy || !okMail} style={{ marginTop: 4 }} />
    {link('بازگشت به ورود', backToLogin)}
  </> : lost === 'code' ? <>
    <L style={{ alignSelf: 'center', fontSize: 15, color: c.muted, marginTop: -6 }}>{email.trim()}</L>
    <CodeBoxes value={code} onChange={v => { setCode(v); if (err) setErr(''); }} onDone={checkCode} bad={!!err} />
    {errBox}
    <ArcButton big label={busy ? '…' : 'ادامه'} onPress={() => checkCode()} disabled={busy || code.length !== 6} style={{ marginTop: 4 }} />
    <T style={{ alignSelf: 'center', textAlign: 'center', color: c.muted, fontSize: 13, lineHeight: 21 }}>اگر ایمیل را نمی‌بینید، پوشه‌ی هرزنامه (Spam) را هم نگاه کنید.</T>
    {wait ? <T style={{ alignSelf: 'center', color: c.faint, fontSize: 14, paddingVertical: 6 }}>{fmt('ارسال دوباره‌ی کد تا {0} ثانیه‌ی دیگر', wait)}</T>
      : link('ارسال دوباره‌ی کد', () => { tap(); sendCode(); })}
    {link('بازگشت به ورود', backToLogin)}
  </> : <>
    <Field icon="lock" label="رمز عبور جدید" value={pw} onChange={setPw} secure ltr />
    <Field icon="lock" label="تکرار رمز عبور جدید" value={pw2} onChange={setPw2} secure ltr onSubmit={setNew} />
    {errBox}
    <ArcButton big label={busy ? '…' : 'ذخیره و ورود'} onPress={setNew} disabled={busy || !pw || !pw2} style={{ marginTop: 4 }} />
    {link('بازگشت به ورود', backToLogin)}
  </>;
  // Main site and /app: the welcome screen, then the form one question at a time (ui/sign-steps.tsx).
  if (ARC) return (
    <Backdrop>
      {welcome ? <Welcome busy={busy} err={err} onGuest={asGuest}
        onLogin={() => { setMode('login'); setErr(''); setWelcome(false); }} onRegister={() => { setMode('register'); setErr(''); setWelcome(false); }} />
        : <SignSteps start={mode} onBack={() => setWelcome(true)} />}
      <InstallHint />
    </Backdrop>
  );
  return (
    <Backdrop>
      <KeyboardAvoidingView behavior={Platform.OS === 'web' ? undefined : 'padding'} style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 48 }}>
          <Hero tall lower={mode === 'register' ? 30 : 0} look={{ pic: 7, light: 8, icon: 'person' }} title={title} subtitle={subtitle} />
          <View style={{ width: '100%', maxWidth: 360 + 48, alignSelf: 'center', gap: 14, paddingHorizontal: 24, paddingTop: ARC ? 0 : 6 }}>
            {lost ? lostForm : <>
            <ModeSwitch mode={mode} onChange={m => { setMode(m); setErr(''); }} />
            {byMail ? <>
              {/* The shown name: home's greeting and the AI's analyses call the user by it. */}
              <Field icon="person" label="نام نمایشی (مثلاً سارا)" value={name} onChange={setName} />
              <Field icon="send" label="ایمیل" value={email} onChange={v => setEmail(v.replace(/\s/g, ''))} ltr />
            </> : <>
              {mode === 'register' ? <Field icon="person" label="نام نمایشی (مثلاً سارا)" value={name} onChange={setName} /> : null}
              {/* With email on, signing in takes the email too (accounts from before keep their username). */}
              <Field icon={mode === 'register' ? 'clipboard' : 'person'} label={mail ? 'ایمیل یا نام کاربری' : 'نام کاربری'} value={user}
                onChange={v => setUser(mail ? v.replace(/[^A-Za-z0-9_.+@-]/g, '') : v.replace(/[^A-Za-z0-9_.-]/g, ''))} ltr />
            </>}
            <Field icon="lock" label="رمز عبور" value={pw} onChange={setPw} secure ltr onSubmit={submit} />
            {/* With email on (main site): the forgotten-password link, centred under the password. */}
            {ARC && mail && mode === 'login' ? (
              <Pressable onPress={() => { tap(); setLost('ask'); setErr(''); if (user.includes('@')) setEmail(user.trim()); }} accessibilityRole="link" hitSlop={8}
                style={{ alignSelf: 'center', marginTop: -4 }}>
                {({ hovered }: { pressed: boolean; hovered?: boolean }) => <T style={{ color: dark ? c.link : c.cta, fontSize: 13.5, fontWeight: '500', textDecorationLine: hovered ? 'underline' : 'none' }}>رمز عبور را فراموش کرده‌اید؟</T>}
              </Pressable>
            ) : null}
            {errBox}
            {/* Main site: a plain solid deep green button (the hills' green), its label alone, faded while it can't be used. */}
            {ARC ? <ArcButton big label={busy ? '…' : mode === 'login' ? 'ورود' : 'ساخت حساب'} onPress={submit} disabled={!ready} style={{ marginTop: 4 }} />
              : <Button big label={busy ? '…' : mode === 'login' ? 'ورود' : 'ساخت حساب'} onPress={submit} disabled={!ready} kind="grey" style={{ marginTop: 2 }} icon={mode === 'login' ? 'person' : 'personAdd'} />}
            {/* Main site: a plain link under the button, to use the site without an account (a guest account, server's /api/guest). */}
            {ARC ? link('ورود به عنوان کاربر مهمان', () => { tap(); asGuest(); }) : null}
            </>}
            {/* The site's three facts (/app) */}
            {ARC ? null : <View style={{ alignItems: 'center', gap: 4, marginTop: 10 }}>
              {['🇩🇰 آزمون تئوری گواهینامه‌ی دانمارک', 'بیش از ۱۰۰۰ سؤال در ۴۴ آزمون', 'ترجمه‌ی فارسی و آموزش'].map(f => (
                <T key={f} style={{ color: c.muted, fontSize: 12.5, textAlign: 'center' }}>{f}</T>
              ))}
            </View>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* After the intro, on the sign-in page: on an iPhone or in Safari, how to add the app to the Home Screen (once). */}
      <InstallHint />
    </Backdrop>
  );
}
