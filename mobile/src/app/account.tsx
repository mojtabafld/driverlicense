// The account, opened from the user card in the settings (an inner page: fixed head, a drag back): the username (fixed), the shown name, and a new password
// (only with the current one); with email on, the address (to add, change or confirm; the trial code needs a confirmed one).
import { useState } from 'react';
import { View } from 'react-native';

import { useApp } from '@/lib/store';
import { Field } from '@/ui/field';
import { Icon } from '@/ui/icon';
import { Button, Card, L, T } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

// A line under a form: what went wrong, or that it was saved.
function Note({ msg }: { msg: { ok: boolean; text: string } | null }) {
  const c = useColors();
  if (!msg) return null;
  return <T style={{ fontSize: 13.5, color: msg.ok ? c.ok : c.bad }}>{msg.text}</T>;
}
const errText = (e: unknown) => (e instanceof Error && e.message ? e.message : 'ذخیره نشد؛ دوباره امتحان کنید.');

export default function Account() {
  const c = useColors();
  const { user, updateAccount, mail, sendVerify } = useApp();
  const [email, setEmail] = useState(user?.email ?? ''), [mailMsg, setMailMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [name, setName] = useState(user?.name ?? '');
  const [nameMsg, setNameMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [cur, setCur] = useState(''), [pw, setPw] = useState(''), [pw2, setPw2] = useState('');
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState<'name' | 'pw' | 'mail' | null>(null);
  // Unsaved changes: a new name not saved yet, or anything typed in the password fields.
  const dirty = name.trim() !== (user?.name ?? '') || !!(cur || pw || pw2);

  const saveName = async () => {
    const n = name.trim();
    if (!n) return setNameMsg({ ok: false, text: 'نام را وارد کنید.' });
    setBusy('name'); setNameMsg(null);
    try { await updateAccount({ name: n }); setNameMsg({ ok: true, text: 'نام ذخیره شد.' }); }
    catch (e) { setNameMsg({ ok: false, text: errText(e) }); }
    setBusy(null);
  };
  const saveMail = async () => {
    const e = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(e)) return setMailMsg({ ok: false, text: 'یک ایمیل درست وارد کنید.' });
    setBusy('mail'); setMailMsg(null);
    try { await sendVerify(e); setMailMsg({ ok: true, text: 'لینک تأیید فرستاده شد؛ روی لینک داخل ایمیل بزنید.' }); }
    catch (err) { setMailMsg({ ok: false, text: errText(err) }); }
    setBusy(null);
  };
  const savePw = async () => {
    if (!cur) return setPwMsg({ ok: false, text: 'رمز عبور فعلی را وارد کنید.' });
    if (!pw) return setPwMsg({ ok: false, text: 'رمز عبور جدید را وارد کنید.' });
    if (pw !== pw2) return setPwMsg({ ok: false, text: 'تکرار رمز جدید با خود آن یکی نیست.' });
    setBusy('pw'); setPwMsg(null);
    try { await updateAccount({ current: cur, password: pw }); setCur(''); setPw(''); setPw2(''); setPwMsg({ ok: true, text: 'رمز عبور عوض شد. دستگاه‌های دیگر باید دوباره وارد شوند.' }); }
    catch (e) { setPwMsg({ ok: false, text: errText(e) }); }
    setBusy(null);
  };

  return (
    <SubPage title="حساب کاربری" maxWidth={560} guard={dirty ? { title: 'خروج بدون ذخیره؟', text: 'تغییراتی که ذخیره نکرده‌اید از بین می‌روند.' } : null}>
          {/* An account made with its email has that as its username: the email card below shows it. */}
          {user?.username.includes('@') ? null : <Card style={{ gap: 6 }}>
            <T style={{ fontWeight: '700' }}>نام کاربری</T>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, height: 50, borderRadius: 14, backgroundColor: c.surface2 }}>
              <Icon name="lock" size={18} color={c.faint} />
              <L style={{ flex: 1, color: c.muted, textAlign: 'right' }}>@{user?.username}</L>
            </View>
            <T style={{ fontSize: 12.5, color: c.muted }}>نام کاربری قابل تغییر نیست.</T>
          </Card>}

          <Card style={{ gap: 10 }}>
            <T style={{ fontWeight: '700' }}>نام</T>
            <Field icon="person" label="نام شما" value={name} onChange={v => { setName(v); setNameMsg(null); }} onSubmit={saveName} />
            <Note msg={nameMsg} />
            <Button label={busy === 'name' ? 'در حال ذخیره…' : 'ذخیره‌ی نام'} onPress={saveName} disabled={!!busy || name.trim() === (user?.name ?? '')} icon="check" />
          </Card>

          {mail && !user?.username.startsWith('guest-') ? (
            <Card style={{ gap: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <T style={{ fontWeight: '700', flex: 1 }}>ایمیل</T>
                {user?.email ? <T style={{ fontSize: 12.5, fontWeight: '700', color: user.emailOk ? c.ok : c.bad }}>{user.emailOk ? 'تأیید شده' : 'تأیید نشده'}</T> : null}
              </View>
              {/* A confirmed address is fixed (Mojtaba asked): shown, not editable. */}
              {user?.emailOk ? <T raw style={{ color: c.muted, fontSize: 14, writingDirection: 'ltr', textAlign: 'left' }}>{user.email}</T> : <>
                <Field icon="send" label="ایمیل" value={email} onChange={v => { setEmail(v.replace(/\s/g, '')); setMailMsg(null); }} ltr onSubmit={saveMail} />
                <Note msg={mailMsg} />
                <Button label={busy === 'mail' ? 'در حال فرستادن…' : 'فرستادن لینک تأیید'} onPress={saveMail} disabled={!!busy || !email.trim()} icon="send" />
              </>}
            </Card>
          ) : null}

          <Card style={{ gap: 10 }}>
            <T style={{ fontWeight: '700' }}>تغییر رمز عبور</T>
            <Field icon="lock" label="رمز عبور فعلی" value={cur} onChange={v => { setCur(v); setPwMsg(null); }} secure ltr />
            <Field icon="lock" label="رمز عبور جدید" value={pw} onChange={v => { setPw(v); setPwMsg(null); }} secure ltr />
            <Field icon="lock" label="تکرار رمز عبور جدید" value={pw2} onChange={v => { setPw2(v); setPwMsg(null); }} secure ltr onSubmit={savePw} />
            <Note msg={pwMsg} />
            <Button label={busy === 'pw' ? 'در حال ذخیره…' : 'تغییر رمز عبور'} onPress={savePw} disabled={!!busy} icon="lock" />
          </Card>
    </SubPage>
  );
}
