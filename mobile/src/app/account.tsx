// The account, opened from the user card in the settings (an inner page: fixed head, a drag back): the username (fixed),
// the shown name; with email on, the address (to add, change or confirm; the trial code needs a confirmed one). A new
// password (only with the current one) only for accounts that still sign in with one: those with no address, while
// accounts with one sign in with a code sent there (Mojtaba 2026-10-20). Last, deleting the account (moved here from the
// settings, Mojtaba 2026-10-21; main site only): a red button that asks first, with a 6-digit code sent to the account's
// address as the dialog opens («ارسال دوباره‌ی کد» after a minute) or, for accounts without one, the password.
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { PROVE_PICS } from '@/lib/config';
import { t as fmt } from '@/lib/i18n';

import { useApp } from '@/lib/store';
import { Field } from '@/ui/field';
import { Icon } from '@/ui/icon';
import { CodeBoxes } from '@/ui/code-boxes';
import { Confirm } from '@/ui/confirm';
import { ActionButton, Button, Card, L, T, tap } from '@/ui/kit';
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
  const { user, updateAccount, mail, sendVerify, deleteAccount, deleteCode } = useApp();
  const [email, setEmail] = useState(user?.email ?? ''), [mailMsg, setMailMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [name, setName] = useState(user?.name ?? '');
  const [nameMsg, setNameMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [cur, setCur] = useState(''), [pw, setPw] = useState(''), [pw2, setPw2] = useState('');
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState<'name' | 'pw' | 'mail' | null>(null);
  const byPw = !mail || !user?.email, byCode = !byPw;
  const [askDel, setAskDel] = useState(false), [delPw, setDelPw] = useState(''), [delErr, setDelErr] = useState(''), [delBusy, setDelBusy] = useState(false);
  const [delSent, setDelSent] = useState(0), [delNow, setDelNow] = useState(0);
  useEffect(() => { if (!askDel || !delSent) return; const t = setInterval(() => setDelNow(Date.now()), 1000); return () => clearInterval(t); }, [askDel, delSent]);
  const delWait = delSent ? Math.max(0, 60 - Math.floor((delNow - delSent) / 1000)) : 0;
  const sendDel = () => {
    const at = Date.now();
    setDelSent(at); setDelNow(at); setDelErr('');
    deleteCode().catch(e => setDelErr(e instanceof Error && e.message ? e.message : 'ایمیل فرستاده نشد؛ کمی بعد دوباره امتحان کنید.'));
  };
  const openDel = () => { setAskDel(true); if (byCode) sendDel(); };
  const closeDel = () => { if (delBusy) return; setAskDel(false); setDelPw(''); setDelErr(''); };
  const doDelete = async (v = delPw) => {
    if (delBusy) return;
    if (byCode ? v.length !== 6 : !v) return setDelErr(byCode ? 'کد ۶ رقمی را وارد کنید.' : 'رمز عبور را وارد کنید.');
    setDelBusy(true); setDelErr('');
    try { await deleteAccount(byCode ? { code: v } : { password: v }); }
    catch (e) { setDelErr(e instanceof Error && e.message ? e.message : 'حذف نشد؛ دوباره امتحان کنید.'); setDelBusy(false); if (byCode) setDelPw(''); }
  };
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

          {byPw ? <Card style={{ gap: 10 }}>
            <T style={{ fontWeight: '700' }}>تغییر رمز عبور</T>
            <Field icon="lock" label="رمز عبور فعلی" value={cur} onChange={v => { setCur(v); setPwMsg(null); }} secure ltr />
            <Field icon="lock" label="رمز عبور جدید" value={pw} onChange={v => { setPw(v); setPwMsg(null); }} secure ltr />
            <Field icon="lock" label="تکرار رمز عبور جدید" value={pw2} onChange={v => { setPw2(v); setPwMsg(null); }} secure ltr onSubmit={savePw} />
            <Note msg={pwMsg} />
            <Button label={busy === 'pw' ? 'در حال ذخیره…' : 'تغییر رمز عبور'} onPress={savePw} disabled={!!busy} icon="lock" />
          </Card> : null}

          {!PROVE_PICS && !user?.guest ? (
            <Card style={{ gap: 10 }}>
              <T style={{ fontWeight: '700' }}>حذف حساب کاربری</T>
              <T style={{ fontSize: 12.5, lineHeight: 20, color: c.muted }}>حساب شما با همه‌ی آزمون‌ها، درس‌ها، اشتباهات و تنظیمات برای همیشه پاک می‌شود و برنمی‌گردد.</T>
              <ActionButton label="حذف حساب کاربری" icon="trash" tone="danger" onPress={openDel} />
            </Card>
          ) : null}
          <Confirm open={askDel} icon="trash" danger title="حذف حساب کاربری؟"
            text={byCode ? fmt('حساب شما با همه‌ی آزمون‌ها، درس‌ها، اشتباهات و تنظیمات برای همیشه پاک می‌شود و برنمی‌گردد. برای تأیید، کد ۶ رقمی‌ای را که به {0} فرستادیم وارد کنید.', user?.email ?? '')
              : 'حساب شما با همه‌ی آزمون‌ها، درس‌ها، اشتباهات و تنظیمات برای همیشه پاک می‌شود و برنمی‌گردد. برای تأیید، رمز عبور خود را وارد کنید.'}
            cancel="انصراف" ok={delBusy ? 'در حال حذف…' : 'حذف حساب'} okIcon="trash" onCancel={closeDel} onOk={() => doDelete()}>
            <View style={{ gap: 8 }}>
              {byCode ? <>
                <CodeBoxes value={delPw} onChange={v => { setDelPw(v); setDelErr(''); }} bad={!!delErr} />
                {delWait ? <T style={{ fontSize: 13, color: c.faint, textAlign: 'center' }}>{fmt('ارسال دوباره‌ی کد تا {0} ثانیه‌ی دیگر', delWait)}</T>
                  : <Pressable onPress={() => { tap(); sendDel(); }} accessibilityRole="button" hitSlop={8} style={{ alignSelf: 'center' }}>
                    <T style={{ fontSize: 14, fontWeight: '600', color: c.link }}>ارسال دوباره‌ی کد</T>
                  </Pressable>}
              </> : <Field icon="lock" label="رمز عبور" value={delPw} onChange={v => { setDelPw(v); setDelErr(''); }} secure ltr onSubmit={doDelete} />}
              {delErr ? <T style={{ fontSize: 13.5, color: c.bad, textAlign: 'center' }}>{delErr}</T> : null}
            </View>
          </Confirm>
    </SubPage>
  );
}
