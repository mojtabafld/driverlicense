// Signing in and up on the main site and /app, one question per screen (Mojtaba 2026-10-20, after the Saphe app's):
// a round back button, the question as a big title with a line under it, one large field, and the «ادامه» button
// kept at the foot of the screen (over the keyboard). Signing in asks for the email (or the username of accounts from
// before email) and then the password; signing up for the shown name, the email (or a username when the server has no
// email) and a password; the forgotten password for the email, the 6-digit code sent there (in six boxes) and the new
// password (the server's /api/forgot, /api/resetcheck and /api/reset). The back button goes a step back, from the
// first one to the welcome screen (ui/welcome.tsx).
import { useEffect, useState } from 'react';
import { Animated, Easing, KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput, View, type TextInputProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RTL, t as fmt, tr } from '@/lib/i18n';
import { useApp } from '@/lib/store';
import { CodeBoxes } from './code-boxes';
import { Icon } from './icon';
import { L, T, physical, physicalAlign, tap } from './kit';
import { DA_FONT, useColors, useIsDark } from './theme';

type Step = 'id' | 'name' | 'email' | 'user' | 'pw' | 'ask' | 'code' | 'set';
const MAIL = /^\S+@\S+\.\S+$/;

// The one large field of a step: a plain box with a light border, bright while typed in; passwords with an eye.
function BigField({ value, onChange, placeholder, secure, ltr, onSubmit, auto }: {
  value: string; onChange: (v: string) => void; placeholder: string; secure?: boolean; ltr?: boolean; onSubmit: () => void;
  auto?: Pick<TextInputProps, 'autoComplete' | 'textContentType' | 'keyboardType'>;
}) {
  const c = useColors();
  const [focus, setFocus] = useState(false), [show, setShow] = useState(false);
  const left = ltr || !RTL;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, height: 58, paddingHorizontal: 16, borderRadius: 14, borderWidth: 1.5,
      borderColor: focus ? c.text : c.line, backgroundColor: c.surface }}>
      <TextInput value={value} onChangeText={onChange} placeholder={tr(placeholder)} accessibilityLabel={tr(placeholder)} placeholderTextColor={c.faint}
        secureTextEntry={secure && !show} autoCapitalize="none" autoCorrect={false} autoFocus onSubmitEditing={onSubmit} returnKeyType="go" {...auto}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ flex: 1, height: 54, fontSize: 17, color: c.text, fontFamily: (ltr && value) || !RTL ? DA_FONT : 'Vazirmatn-400',
          ...(left ? { textAlign: 'left' as const, direction: 'ltr' as const } : { textAlign: physicalAlign('right' as const) }),
          writingDirection: left ? 'ltr' : 'rtl', ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}) }} />
      {secure ? (
        <Pressable onPress={() => { tap(); setShow(!show); }} hitSlop={10} accessibilityLabel={tr(show ? 'پنهان کردن رمز' : 'نمایش رمز')}>
          <Icon name={show ? 'eyeSlash' : 'eye'} size={20} color={show ? c.text : c.faint} />
        </Pressable>
      ) : null}
    </View>
  );
}

export function SignSteps({ start, onBack }: { start: 'login' | 'register'; onBack: () => void }) {
  const c = useColors(), dark = useIsDark(), ins = useSafeAreaInsets();
  const { login, register, mail, forgot, checkResetCode, resetPassword } = useApp();
  const first: Step = start === 'login' ? 'id' : 'name';
  const [step, setStep] = useState<Step>(first);
  const [trail, setTrail] = useState<Step[]>([]);
  const [id, setId] = useState(''), [name, setName] = useState(''), [email, setEmail] = useState(''), [user, setUser] = useState('');
  const [pw, setPw] = useState(''), [pw2, setPw2] = useState(''), [code, setCode] = useState('');
  const [err, setErr] = useState(''), [busy, setBusy] = useState(false);
  // The «send again» link waits a minute after each code (as the server does).
  const [sentAt, setSentAt] = useState(0), [now, setNow] = useState(0);
  useEffect(() => { if (step !== 'code') return; const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, [step]);
  const wait = Math.max(0, 60 - Math.floor((now - sentAt) / 1000));
  // Each step comes in with a short fade and rise.
  const [fade] = useState(() => new Animated.Value(1));
  const native = Platform.OS !== 'web';
  const show = (s: Step) => {
    fade.setValue(0); setErr(''); setStep(s);
    Animated.timing(fade, { toValue: 1, duration: 240, easing: Easing.out(Easing.cubic), useNativeDriver: native }).start();
  };
  const go = (s: Step) => { setTrail(t => [...t, step]); show(s); };
  const back = () => {
    tap();
    if (!trail.length) { onBack(); return; }
    const prev = trail[trail.length - 1];
    setTrail(t => t.slice(0, -1));
    if (prev === 'pw' && step === 'ask') setPw('');
    show(prev);
  };
  const run = async (f: () => Promise<void>) => {
    setErr(''); setBusy(true);
    try { await f(); } catch (e: any) { setErr(e.message); }
    setBusy(false);
  };
  const sendCode = () => run(async () => { await forgot(email.trim()); setCode(''); setSentAt(Date.now()); setNow(Date.now()); if (step !== 'code') go('code'); });
  const checkCode = (v = code) => { if (!busy && v.length === 6) run(async () => { try { await checkResetCode(email.trim(), v); } catch (e) { setCode(''); throw e; } setPw(''); setPw2(''); go('set'); }); };
  // What each step asks, whether its answer is ready, and what «ادامه» does.
  const steps: Record<Step, { title: string; sub: string; ok: boolean; next: () => void; label?: string }> = {
    id: { title: mail ? 'ایمیل‌تان چیست؟' : 'نام کاربری‌تان چیست؟', sub: mail ? 'ایمیل (یا نام کاربری) حساب TeoriPrøve خود را وارد کنید.' : 'نام کاربری حساب TeoriPrøve خود را وارد کنید.',
      ok: !!id.trim(), next: () => go('pw') },
    pw: start === 'login'
      ? { title: 'رمز عبورتان را وارد کنید', sub: fmt('برای ورود با {0}', id.trim()), ok: !!pw, label: 'ورود', next: () => run(() => login(id.trim(), pw)) }
      : { title: 'یک رمز عبور انتخاب کنید', sub: 'با این رمز، از هر دستگاهی وارد حساب خود می‌شوید.', ok: !!pw, label: 'ساخت حساب',
        next: () => run(() => (mail ? register(name.trim(), '', pw, email.trim()) : register(name.trim(), user.trim(), pw))) },
    name: { title: 'اسم‌تان چیست؟', sub: 'برنامه شما را با این نام صدا می‌کند.', ok: !!name.trim(), next: () => go(mail ? 'email' : 'user') },
    email: { title: 'ایمیل‌تان چیست؟', sub: 'برای ساخت حساب TeoriPrøve ایمیل خود را وارد کنید؛ یک لینک تأیید به آن فرستاده می‌شود.', ok: MAIL.test(email.trim()), next: () => go('pw') },
    user: { title: 'یک نام کاربری انتخاب کنید', sub: 'با این نام وارد حساب خود می‌شوید (حروف انگلیسی و عدد).', ok: !!user.trim(), next: () => go('pw') },
    ask: { title: 'بازیابی رمز عبور', sub: 'ایمیل حساب خود را وارد کنید تا کد بازیابی رمز برایتان فرستاده شود.', ok: MAIL.test(email.trim()), label: 'ارسال کد', next: sendCode },
    code: { title: 'ایمیل‌تان را ببینید', sub: fmt('اگر حسابی با {0} باشد، یک کد تأیید برایش فرستادیم. کد را وارد کنید تا ادامه دهید.', email.trim()), ok: code.length === 6, label: 'تأیید کد', next: () => checkCode() },
    set: { title: 'رمز عبور جدید', sub: 'یک رمز عبور جدید برای حساب خود انتخاب کنید.', ok: !!pw && !!pw2, label: 'ذخیره و ورود',
      next: () => { if (pw !== pw2) { setErr('تکرار رمز جدید با خود آن یکی نیست.'); return; } run(() => resetPassword(email.trim(), code, pw)); } },
  };
  const s = steps[step], ready = s.ok && !busy;
  const submit = () => { if (ready) { tap(); s.next(); } };
  const field = step === 'id' ? <BigField value={id} onChange={v => setId(mail ? v.replace(/[^A-Za-z0-9_.+@-]/g, '') : v.replace(/[^A-Za-z0-9_.-]/g, ''))} placeholder={mail ? 'mail@mail.com' : 'نام کاربری'} ltr onSubmit={submit} auto={{ autoComplete: 'username', textContentType: 'username', keyboardType: mail ? 'email-address' : 'default' }} />
    : step === 'pw' ? <BigField value={pw} onChange={setPw} placeholder="رمز عبور" secure ltr onSubmit={submit} auto={{ autoComplete: start === 'login' ? 'current-password' : 'new-password', textContentType: start === 'login' ? 'password' : 'newPassword' }} />
    : step === 'name' ? <BigField value={name} onChange={setName} placeholder="مثلاً سارا" onSubmit={submit} auto={{ autoComplete: 'name', textContentType: 'name' }} />
    : step === 'email' || step === 'ask' ? <BigField value={email} onChange={v => setEmail(v.replace(/\s/g, ''))} placeholder="mail@mail.com" ltr onSubmit={submit} auto={{ autoComplete: 'email', textContentType: 'emailAddress', keyboardType: 'email-address' }} />
    : step === 'user' ? <BigField value={user} onChange={v => setUser(v.replace(/[^A-Za-z0-9_.-]/g, ''))} placeholder="نام کاربری" ltr onSubmit={submit} auto={{ autoComplete: 'username-new', textContentType: 'username' }} />
    : step === 'code' ? <CodeBoxes value={code} onChange={v => { setCode(v); if (err) setErr(''); }} onDone={checkCode} bad={!!err} />
    : <View style={{ gap: 12 }}>
      <BigField value={pw} onChange={setPw} placeholder="رمز عبور جدید" secure ltr onSubmit={submit} auto={{ autoComplete: 'new-password', textContentType: 'newPassword' }} />
      <BigField value={pw2} onChange={setPw2} placeholder="تکرار رمز عبور جدید" secure ltr onSubmit={submit} auto={{ autoComplete: 'new-password', textContentType: 'newPassword' }} />
    </View>;
  const pill = (label: string, onPress: () => void, off?: boolean) => (
    <Pressable onPress={() => { if (!off && !busy) { tap(); onPress(); } }} accessibilityRole="button" accessibilityState={{ disabled: !!off }}
      style={({ pressed }) => ({ alignSelf: 'center', paddingVertical: 9, paddingHorizontal: 16, borderRadius: 12, backgroundColor: c.surface2, opacity: off ? 0.6 : pressed ? 0.8 : 1 })}>
      <T style={{ fontSize: 15, fontWeight: '500', color: off ? c.muted : c.text }}>{label}</T>
    </Pressable>
  );
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, width: '100%', maxWidth: 480, alignSelf: 'center', paddingHorizontal: 24, paddingTop: ins.top + (Platform.OS === 'web' ? 14 : 8), paddingBottom: 24 }}>
        <View style={{ alignItems: 'flex-start' }}>
          <Pressable onPress={back} hitSlop={8} accessibilityRole="button" accessibilityLabel={tr('بازگشت')}
            style={({ pressed }) => ({ width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', backgroundColor: dark ? c.surface2 : c.line, opacity: pressed ? 0.75 : 1 })}>
            <Icon name="arrowRight" size={21} color={c.text} />
          </Pressable>
        </View>
        <Animated.View style={{ gap: 10, marginTop: 34, opacity: fade, transform: [{ translateY: fade.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }] }}>
          <T style={{ fontSize: 29, lineHeight: 42, fontWeight: '800' }}>{s.title}</T>
          <T style={{ fontSize: 16, lineHeight: 26, color: c.muted }}>{s.sub}</T>
          <View style={{ marginTop: 16, gap: 12 }}>
            {/* A new field for each step, so it takes the cursor (autoFocus) and password managers see each one. */}
            <View key={step}>{field}</View>
            {err ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, backgroundColor: c.badSoft }}>
                <Icon name="warning" size={17} color={c.bad} />
                <T style={{ flex: 1, color: c.bad, fontSize: 13.5 }}>{err}</T>
              </View>
            ) : null}
            {/* With email: the forgotten password, under the password field. */}
            {step === 'pw' && start === 'login' && mail ? (
              <View style={{ marginTop: 6 }}>{pill('رمز عبور را فراموش کرده‌اید؟', () => { if (id.includes('@')) setEmail(id.trim()); go('ask'); })}</View>
            ) : null}
            {step === 'code' ? (
              <View style={{ alignItems: 'center', gap: 10, marginTop: 18 }}>
                <T style={{ fontSize: 16, fontWeight: '500' }}>کد را دریافت نکرده‌اید؟</T>
                {pill(wait ? fmt('ارسال دوباره‌ی کد تا {0} ثانیه‌ی دیگر', wait) : 'ارسال دوباره‌ی کد', sendCode, !!wait)}
                <T style={{ textAlign: 'center', color: c.muted, fontSize: 13, lineHeight: 21 }}>اگر ایمیل را نمی‌بینید، پوشه‌ی هرزنامه (Spam) را هم نگاه کنید.</T>
              </View>
            ) : null}
          </View>
        </Animated.View>
      </ScrollView>
      {/* «ادامه» at the foot, over the keyboard, with a hairline above it; faded until the step's answer is there. */}
      <View style={{ borderTopWidth: 1, borderTopColor: c.line, paddingTop: 12, paddingBottom: ins.bottom + 14, paddingHorizontal: 24 }}>
        <Pressable onPress={submit} disabled={!ready} accessibilityRole="button" accessibilityState={{ disabled: !ready }}
          style={({ pressed }) => ({ width: '100%', maxWidth: 432, alignSelf: 'center', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center',
            backgroundColor: ready ? c.cta : dark ? c.surface2 : c.line, opacity: pressed ? 0.85 : 1 })}>
          {busy ? <L style={{ fontSize: 17, color: c.muted }}>…</L>
            : <T style={{ fontSize: 17, fontWeight: '600', color: ready ? c.ctaFg : c.faint }}>{s.label ?? 'ادامه'}</T>}
          <View style={{ position: 'absolute', top: 0, bottom: 0, ...physical(RTL ? { left: 18 } : { right: 18 }), justifyContent: 'center' }}>
            <Icon name="arrowLeft" size={20} color={ready ? c.ctaFg : c.faint} />
          </View>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
