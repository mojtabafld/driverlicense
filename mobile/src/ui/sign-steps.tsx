// Signing in and up on the main site and /app, one question per screen (Mojtaba 2026-10-20, after the Saphe app's;
// the screen's parts in ui/step-frame.tsx). No passwords while the server has email (Mojtaba 2026-10-20): signing in
// asks for the email and then the 6-digit code sent there (/api/code, /api/codein); signing up goes through four
// steps, counted at the top: the name, the email, the code (checked, /api/codecheck) and last the questions' language
// (Danish or English, so the language screen after signing in does not come; chosen to begin with as the app's language
// says, Danish for a Danish app and English for any other, Mojtaba 2026-10-21), whose button makes the account. Accounts from before email, with a username
// only, still sign in with their password; without email on the server, signing up asks for a username and a password
// instead of the code. The back button goes a step back, from the first one to the welcome screen.
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, View } from 'react-native';

import { EXAM_FOR, UI_LANG, t as fmt } from '@/lib/i18n';
import { useApp } from '@/lib/store';
import { CodeBoxes } from './code-boxes';
import { Icon } from './icon';
import { T, tap } from './kit';
import { BigField, ExamLangChoice, StepCount, StepFrame } from './step-frame';
import { useColors } from './theme';

type Step = 'id' | 'name' | 'email' | 'user' | 'pw' | 'lang' | 'code';
const MAIL = /^\S+@\S+\.\S+$/;

// `known`: the email or username of the account signed out last (ui/welcome-back.tsx): its code is sent at once (or,
// for a username, its password asked). `email` (the welcome screen's «ادامه با ایمیل», Mojtaba 2026-10-21): one flow
// for both, by the address: an account has it → its sign-in code; none → the sign-up's name, code and language.
export function SignSteps({ start, onBack, known }: { start: 'login' | 'register' | 'email'; onBack: () => void; known?: string }) {
  const c = useColors();
  const { login, register, mail, sendCode, codeIn, checkCode, emailFree } = useApp();
  const unified = start === 'email' && mail;
  const [up, setUp] = useState(start === 'register');
  const knownMail = !!known && known.includes('@') && mail;
  const [step, setStep] = useState<Step>(up ? 'name' : knownMail ? 'code' : known ? 'pw' : 'id');
  const [trail, setTrail] = useState<Step[]>([]);
  const [id, setId] = useState(known ?? ''), [name, setName] = useState(''), [user, setUser] = useState('');
  const [pw, setPw] = useState(''), [code, setCode] = useState(''), [exam, setExam] = useState<'da' | 'en'>(EXAM_FOR[UI_LANG]);
  const [err, setErr] = useState(''), [busy, setBusy] = useState(false);
  // The address the code goes to: the one typed in (signing up) or signed in with.
  const email = (up ? user : id).trim();
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
    if (unified && trail[trail.length - 1] === 'id') setUp(false);   // the address asked again: not known yet whether it signs up
    show(trail[trail.length - 1]);
  };
  const run = async (f: () => Promise<void>) => {
    setErr(''); setBusy(true);
    try { await f(); } catch (e: any) { setErr(e.message); }
    setBusy(false);
  };
  // The code to the address; the code step comes once it is on its way.
  const send = () => run(async () => {
    await sendCode(email, up);
    const at = Date.now(); setSentAt(at); setNow(at); setCode('');
    if (step !== 'code') go('code');
  });
  // The account signed out last: its code goes out as this screen opens.
  const first = useRef(true);
  useEffect(() => { if (first.current && knownMail) { first.current = false; send(); } });
  // The code: signs in, or (signing up) is checked and the last step comes.
  const enter = (v = code) => { if (!busy && v.length === 6) run(async () => { try { if (up) { await checkCode(email, v); go('lang'); } else await codeIn(email, v); } catch (e) { setCode(''); throw e; } }); };
  // What each step asks, whether its answer is ready, and what its button does.
  const steps: Record<Step, { title: string; sub: string; ok: boolean; next: () => void; label?: string }> = {
    id: unified
      ? { title: 'ایمیل‌تان چیست؟', sub: 'برای ورود یا ساخت حساب Teoripro ایمیل خود را وارد کنید؛ یک کد به آن می‌فرستیم.', ok: MAIL.test(id.trim()),
        next: () => run(async () => {
          const e = id.trim(), free = await emailFree(e).then(() => true, (x: any) => { if (x?.status === 409) return false; throw x; });
          if (free) { setUp(true); setUser(e); go('name'); return; }
          await sendCode(e, false); const at = Date.now(); setSentAt(at); setNow(at); setCode(''); go('code');
        }) }
      : { title: mail ? 'ایمیل‌تان چیست؟' : 'نام کاربری‌تان چیست؟', sub: mail ? 'برای ورود به حساب Teoripro ایمیل خود را وارد کنید؛ یک کد ورود به آن می‌فرستیم.' : 'نام کاربری حساب Teoripro خود را وارد کنید.',
        ok: !!id.trim(), next: () => (mail && id.includes('@') ? send() : go('pw')) },
    pw: up
      ? { title: 'یک رمز عبور انتخاب کنید', sub: 'با این رمز، از هر دستگاهی وارد حساب خود می‌شوید.', ok: !!pw, next: () => go('lang') }
      : { title: 'رمز عبورتان را وارد کنید', sub: fmt('برای ورود با {0}', id.trim()), ok: !!pw, label: 'ورود', next: () => run(() => login(id.trim(), pw)) },
    name: { title: 'اسم‌تان چیست؟', sub: 'برنامه شما را با این نام صدا می‌کند.', ok: !!name.trim(),
      // (the address already given: its code at once)
      next: () => (unified ? run(async () => { await sendCode(user.trim(), true); const at = Date.now(); setSentAt(at); setNow(at); setCode(''); go('code'); }) : go(mail ? 'email' : 'user')) },
    email: { title: 'ایمیل‌تان چیست؟', sub: 'برای ساخت حساب Teoripro ایمیل خود را وارد کنید؛ یک کد تأیید به آن می‌فرستیم.', ok: MAIL.test(user.trim()), next: () => run(async () => { await emailFree(user.trim()); await sendCode(user.trim(), true); const at = Date.now(); setSentAt(at); setNow(at); setCode(''); go('code'); }) },
    user: { title: 'یک نام کاربری انتخاب کنید', sub: 'با این نام وارد حساب خود می‌شوید (حروف انگلیسی و عدد).', ok: !!user.trim(), next: () => go('pw') },
    lang: { title: 'سؤال‌ها به چه زبانی باشند؟', sub: 'ترجمه‌ی فارسی در هر دو حالت زیر سؤال‌ها نمایش داده می‌شود. بعداً هم از تنظیمات قابل تغییر است.', ok: true,
      label: 'ساخت حساب', next: () => run(() => (mail ? codeIn(email, code, name.trim(), exam) : register(name.trim(), user.trim(), pw, undefined, exam))) },
    code: { title: 'ایمیل‌تان را ببینید', sub: up ? fmt('یک کد ۶ رقمی به {0} فرستادیم. کد را وارد کنید تا حساب‌تان ساخته شود.', email) : fmt('یک کد ۶ رقمی به {0} فرستادیم. کد را وارد کنید تا وارد حساب‌تان شوید.', email),
      ok: code.length === 6, label: up ? undefined : 'ورود', next: () => enter() },
  };
  const s = steps[step];
  const submit = () => { if (s.ok && !busy) { tap(); s.next(); } };
  // Sign-up's steps are counted; its button says it goes on with signing up.
  const order: Step[] = unified ? ['name', 'code', 'lang'] : mail ? ['name', 'email', 'code', 'lang'] : ['name', 'user', 'pw', 'lang'];
  const at = up ? order.indexOf(step) : -1;
  const label = s.label ?? (up ? 'ادامه‌ی ثبت‌نام' : 'ادامه');
  const pill = (text: string, onPress: () => void, off?: boolean) => (
    <Pressable onPress={() => { if (!off && !busy) { tap(); onPress(); } }} accessibilityRole="button" accessibilityState={{ disabled: !!off }}
      style={({ pressed }) => ({ alignSelf: 'center', paddingVertical: 9, paddingHorizontal: 16, borderRadius: 12, backgroundColor: c.surface2, opacity: off ? 0.6 : pressed ? 0.8 : 1 })}>
      <T style={{ fontSize: 15, fontWeight: '500', color: off ? c.muted : c.text }}>{text}</T>
    </Pressable>
  );
  const field = step === 'id' ? <BigField value={id} onChange={v => { setErr(''); setId(mail ? v.replace(/[^A-Za-z0-9_.+@-]/g, '') : v.replace(/[^A-Za-z0-9_.-]/g, '')); }} placeholder={mail ? 'mail@mail.com' : 'نام کاربری'} ltr onSubmit={submit} good={mail && MAIL.test(id.trim())} bad={!!err} auto={{ autoComplete: mail ? 'email' : 'username', textContentType: mail ? 'emailAddress' : 'username', keyboardType: mail ? 'email-address' : 'default' }} />
    : step === 'pw' ? <BigField value={pw} onChange={setPw} placeholder="رمز عبور" secure ltr onSubmit={submit} auto={{ autoComplete: up ? 'new-password' : 'current-password', textContentType: up ? 'newPassword' : 'password' }} />
    : step === 'name' ? <BigField label="نام" value={name} onChange={setName} placeholder="مثلاً سارا" onSubmit={submit} auto={{ autoComplete: 'given-name', textContentType: 'givenName', autoCapitalize: 'words' }} />
    : step === 'email' ? <BigField value={user} onChange={v => { setErr(''); setUser(v.replace(/\s/g, '')); }} placeholder="mail@mail.com" ltr onSubmit={submit} good={MAIL.test(user.trim())} bad={!!err} auto={{ autoComplete: 'email', textContentType: 'emailAddress', keyboardType: 'email-address' }} />
    : step === 'user' ? <BigField value={user} onChange={v => setUser(v.replace(/[^A-Za-z0-9_.-]/g, ''))} placeholder="نام کاربری" ltr onSubmit={submit} auto={{ autoComplete: 'username-new', textContentType: 'username' }} />
    : step === 'lang' ? <ExamLangChoice value={exam} onChange={setExam} />
    : <CodeBoxes value={code} onChange={v => { setCode(v); if (err) setErr(''); }} onDone={enter} bad={!!err} />;
  return (
    <StepFrame onBack={back} fade={fade} title={s.title} sub={s.sub} button={{ label, ready: s.ok, busy, onPress: s.next }}
      corner={at >= 0 ? <StepCount n={at + 1} of={order.length} what="ساخت حساب کاربری" /> : null}>
      {/* New fields for each step, so the first takes the cursor (autoFocus) and password managers see each one. */}
      <View key={step} style={{ gap: 18 }}>{field}</View>
      {err ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, backgroundColor: c.badSoft }}>
          <Icon name="warning" size={17} color={c.bad} />
          <T style={{ flex: 1, color: c.bad, fontSize: 13.5 }}>{err}</T>
        </View>
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
          {pill(wait ? fmt('ارسال دوباره‌ی کد تا {0} ثانیه‌ی دیگر', wait) : 'ارسال دوباره‌ی کد', send, !!wait)}
          <T style={{ textAlign: 'center', color: c.muted, fontSize: 13, lineHeight: 21 }}>اگر ایمیل را نمی‌بینید، پوشه‌ی هرزنامه (Spam) را هم نگاه کنید.</T>
        </View>
      ) : null}
    </StepFrame>
  );
}
