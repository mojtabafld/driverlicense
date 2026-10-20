// Signing in and up on the main site and /app, one question per screen (Mojtaba 2026-10-20, after the Saphe app's;
// the screen's parts in ui/step-frame.tsx). Signing in asks for the email (or the username of accounts from before
// email) and then the password. Signing up goes through four steps, counted at the top: the first and last name (the
// shown name), the email (or a username when the server has no email), a password, and the questions' language
// (Danish or English, as the language screen after signing in, which then does not come). The forgotten password asks
// for the email, the 6-digit code sent there (in six boxes) and the new password (the server's /api/forgot,
// /api/resetcheck and /api/reset). The back button goes a step back, from the first one to the welcome screen.
import { useEffect, useState } from 'react';
import { Animated, Easing, Platform, Pressable, View } from 'react-native';

import { t as fmt } from '@/lib/i18n';
import { useApp } from '@/lib/store';
import { CodeBoxes } from './code-boxes';
import { Icon } from './icon';
import { T, tap } from './kit';
import { BigField, ExamLangChoice, StepCount, StepFrame } from './step-frame';
import { useColors } from './theme';

type Step = 'id' | 'name' | 'email' | 'user' | 'pw' | 'lang' | 'ask' | 'code' | 'set';
const MAIL = /^\S+@\S+\.\S+$/;
const SIGN_UP: Step[] = ['name', 'email', 'pw', 'lang'];

export function SignSteps({ start, onBack }: { start: 'login' | 'register'; onBack: () => void }) {
  const c = useColors();
  const { login, register, mail, forgot, checkResetCode, resetPassword } = useApp();
  const up = start === 'register';
  const [step, setStep] = useState<Step>(up ? 'name' : 'id');
  const [trail, setTrail] = useState<Step[]>([]);
  const [id, setId] = useState(''), [first, setFirst] = useState(''), [last, setLast] = useState(''), [email, setEmail] = useState(''), [user, setUser] = useState('');
  const [pw, setPw] = useState(''), [pw2, setPw2] = useState(''), [code, setCode] = useState(''), [exam, setExam] = useState<'da' | 'en'>('da');
  const [err, setErr] = useState(''), [busy, setBusy] = useState(false);
  // The «send again» link waits a minute after each code (as the server does).
  const [sentAt, setSentAt] = useState(0), [now, setNow] = useState(0);
  useEffect(() => { if (step !== 'code') return; const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, [step]);
  const wait = Math.max(0, 60 - Math.floor((now - sentAt) / 1000));
  // Each step comes in with a short fade and rise.
  const [fade] = useState(() => new Animated.Value(1));
  const show = (s: Step) => {
    fade.setValue(0); setErr(''); setStep(s);
    Animated.timing(fade, { toValue: 1, duration: 240, easing: Easing.out(Easing.cubic), useNativeDriver: Platform.OS !== 'web' }).start();
  };
  const go = (s: Step) => { setTrail(t => [...t, step]); show(s); };
  const back = () => {
    if (!trail.length) { onBack(); return; }
    setTrail(t => t.slice(0, -1));
    show(trail[trail.length - 1]);
  };
  const run = async (f: () => Promise<void>) => {
    setErr(''); setBusy(true);
    try { await f(); } catch (e: any) { setErr(e.message); }
    setBusy(false);
  };
  const sendCode = () => run(async () => { await forgot(email.trim()); setCode(''); setSentAt(Date.now()); setNow(Date.now()); if (step !== 'code') go('code'); });
  const checkCode = (v = code) => { if (!busy && v.length === 6) run(async () => { try { await checkResetCode(email.trim(), v); } catch (e) { setCode(''); throw e; } setPw(''); setPw2(''); go('set'); }); };
  const name = `${first.trim()} ${last.trim()}`.trim();
  const create = () => run(() => (mail ? register(name, '', pw, email.trim(), exam) : register(name, user.trim(), pw, undefined, exam)));
  // What each step asks, whether its answer is ready, and what its button does.
  const steps: Record<Step, { title: string; sub: string; ok: boolean; next: () => void; label?: string }> = {
    id: { title: mail ? 'ایمیل‌تان چیست؟' : 'نام کاربری‌تان چیست؟', sub: mail ? 'ایمیل (یا نام کاربری) حساب TeoriPrøve خود را وارد کنید.' : 'نام کاربری حساب TeoriPrøve خود را وارد کنید.',
      ok: !!id.trim(), next: () => go('pw') },
    pw: up
      ? { title: 'یک رمز عبور انتخاب کنید', sub: 'با این رمز، از هر دستگاهی وارد حساب خود می‌شوید.', ok: !!pw, next: () => go('lang') }
      : { title: 'رمز عبورتان را وارد کنید', sub: fmt('برای ورود با {0}', id.trim()), ok: !!pw, label: 'ورود', next: () => run(() => login(id.trim(), pw)) },
    name: { title: 'اسم‌تان چیست؟', sub: 'نام و نام خانوادگی خود را بنویسید تا ساخت حساب TeoriPrøve را ادامه دهید.', ok: !!first.trim(), next: () => go(mail ? 'email' : 'user') },
    email: { title: 'ایمیل‌تان چیست؟', sub: 'برای ساخت حساب TeoriPrøve ایمیل خود را وارد کنید؛ یک لینک تأیید به آن فرستاده می‌شود.', ok: MAIL.test(email.trim()), next: () => go('pw') },
    user: { title: 'یک نام کاربری انتخاب کنید', sub: 'با این نام وارد حساب خود می‌شوید (حروف انگلیسی و عدد).', ok: !!user.trim(), next: () => go('pw') },
    lang: { title: 'سؤال‌ها به چه زبانی باشند؟', sub: 'ترجمه‌ی فارسی در هر دو حالت زیر سؤال‌ها نمایش داده می‌شود. بعداً هم از تنظیمات قابل تغییر است.', ok: true, label: 'ساخت حساب', next: create },
    ask: { title: 'بازیابی رمز عبور', sub: 'ایمیل حساب خود را وارد کنید تا کد بازیابی رمز برایتان فرستاده شود.', ok: MAIL.test(email.trim()), label: 'ارسال کد', next: sendCode },
    code: { title: 'ایمیل‌تان را ببینید', sub: fmt('اگر حسابی با {0} باشد، یک کد تأیید برایش فرستادیم. کد را وارد کنید تا ادامه دهید.', email.trim()), ok: code.length === 6, label: 'تأیید کد', next: () => checkCode() },
    set: { title: 'رمز عبور جدید', sub: 'یک رمز عبور جدید برای حساب خود انتخاب کنید.', ok: !!pw && !!pw2, label: 'ذخیره و ورود',
      next: () => { if (pw !== pw2) { setErr('تکرار رمز جدید با خود آن یکی نیست.'); return; } run(() => resetPassword(email.trim(), code, pw)); } },
  };
  const s = steps[step];
  const submit = () => { if (s.ok && !busy) { tap(); s.next(); } };
  // Sign-up's steps are counted (the username takes the email's place); its button says it goes on with signing up.
  const at = up ? SIGN_UP.indexOf(step === 'user' ? 'email' : step) : -1;
  const label = s.label ?? (up ? 'ادامه‌ی ثبت‌نام' : 'ادامه');
  const pill = (text: string, onPress: () => void, off?: boolean) => (
    <Pressable onPress={() => { if (!off && !busy) { tap(); onPress(); } }} accessibilityRole="button" accessibilityState={{ disabled: !!off }}
      style={({ pressed }) => ({ alignSelf: 'center', paddingVertical: 9, paddingHorizontal: 16, borderRadius: 12, backgroundColor: c.surface2, opacity: off ? 0.6 : pressed ? 0.8 : 1 })}>
      <T style={{ fontSize: 15, fontWeight: '500', color: off ? c.muted : c.text }}>{text}</T>
    </Pressable>
  );
  const field = step === 'id' ? <BigField value={id} onChange={v => setId(mail ? v.replace(/[^A-Za-z0-9_.+@-]/g, '') : v.replace(/[^A-Za-z0-9_.-]/g, ''))} placeholder={mail ? 'mail@mail.com' : 'نام کاربری'} ltr onSubmit={submit} auto={{ autoComplete: 'username', textContentType: 'username', keyboardType: mail ? 'email-address' : 'default' }} />
    : step === 'pw' ? <BigField value={pw} onChange={setPw} placeholder="رمز عبور" secure ltr onSubmit={submit} auto={{ autoComplete: up ? 'new-password' : 'current-password', textContentType: up ? 'newPassword' : 'password' }} />
    : step === 'name' ? <>
      <BigField label="نام کوچک" value={first} onChange={setFirst} onSubmit={submit} auto={{ autoComplete: 'given-name', textContentType: 'givenName', autoCapitalize: 'words' }} />
      <BigField label="نام خانوادگی" value={last} onChange={setLast} onSubmit={submit} focus={false} auto={{ autoComplete: 'family-name', textContentType: 'familyName', autoCapitalize: 'words' }} />
    </>
    : step === 'email' || step === 'ask' ? <BigField value={email} onChange={v => setEmail(v.replace(/\s/g, ''))} placeholder="mail@mail.com" ltr onSubmit={submit} good={MAIL.test(email.trim())} auto={{ autoComplete: 'email', textContentType: 'emailAddress', keyboardType: 'email-address' }} />
    : step === 'user' ? <BigField value={user} onChange={v => setUser(v.replace(/[^A-Za-z0-9_.-]/g, ''))} placeholder="نام کاربری" ltr onSubmit={submit} auto={{ autoComplete: 'username-new', textContentType: 'username' }} />
    : step === 'lang' ? <ExamLangChoice value={exam} onChange={setExam} />
    : step === 'code' ? <CodeBoxes value={code} onChange={v => { setCode(v); if (err) setErr(''); }} onDone={checkCode} bad={!!err} />
    : <>
      <BigField value={pw} onChange={setPw} placeholder="رمز عبور جدید" secure ltr onSubmit={submit} auto={{ autoComplete: 'new-password', textContentType: 'newPassword' }} />
      <BigField value={pw2} onChange={setPw2} placeholder="تکرار رمز عبور جدید" secure ltr onSubmit={submit} focus={false} auto={{ autoComplete: 'new-password', textContentType: 'newPassword' }} />
    </>;
  return (
    <StepFrame onBack={back} fade={fade} title={s.title} sub={s.sub} button={{ label, ready: s.ok, busy, onPress: s.next }}
      corner={at >= 0 ? <StepCount n={at + 1} of={SIGN_UP.length} what="ساخت حساب کاربری" /> : null}>
      {/* New fields for each step, so the first takes the cursor (autoFocus) and password managers see each one. */}
      <View key={step} style={{ gap: 18 }}>{field}</View>
      {err ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, backgroundColor: c.badSoft }}>
          <Icon name="warning" size={17} color={c.bad} />
          <T style={{ flex: 1, color: c.bad, fontSize: 13.5 }}>{err}</T>
        </View>
      ) : null}
      {/* With email: the forgotten password, under the password field. */}
      {step === 'pw' && !up && mail ? (
        <View style={{ marginTop: 6 }}>{pill('رمز عبور را فراموش کرده‌اید؟', () => { if (id.includes('@')) setEmail(id.trim()); go('ask'); })}</View>
      ) : null}
      {step === 'lang' ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16, backgroundColor: c.surface2 }}>
          <Icon name="bulbCircle" size={26} color={c.muted} />
          <T style={{ flex: 1, color: c.muted, fontSize: 14, lineHeight: 23 }}>در تنظیمات می‌توانید زبان ترجمه‌ی سؤال‌ها و گزینه‌ها را تغییر دهید.</T>
        </View>
      ) : null}
      {step === 'code' ? (
        <View style={{ alignItems: 'center', gap: 10, marginTop: 18 }}>
          <T style={{ fontSize: 16, fontWeight: '500' }}>کد را دریافت نکرده‌اید؟</T>
          {pill(wait ? fmt('ارسال دوباره‌ی کد تا {0} ثانیه‌ی دیگر', wait) : 'ارسال دوباره‌ی کد', sendCode, !!wait)}
          <T style={{ textAlign: 'center', color: c.muted, fontSize: 13, lineHeight: 21 }}>اگر ایمیل را نمی‌بینید، پوشه‌ی هرزنامه (Spam) را هم نگاه کنید.</T>
        </View>
      ) : null}
    </StepFrame>
  );
}
