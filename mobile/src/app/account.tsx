// The account, opened from the user card in the settings: the username (fixed), the shown name, and a new password
// (only with the current one).
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useApp } from '@/lib/store';
import { Field } from '@/ui/field';
import { Icon } from '@/ui/icon';
import { Backdrop, Button, Card, L, T, tap } from '@/ui/kit';
import { useColors } from '@/ui/theme';

// A line under a form: what went wrong, or that it was saved.
function Note({ msg }: { msg: { ok: boolean; text: string } | null }) {
  const c = useColors();
  if (!msg) return null;
  return <T style={{ fontSize: 13.5, color: msg.ok ? c.ok : c.bad }}>{msg.text}</T>;
}
const errText = (e: unknown) => (e instanceof Error && e.message ? e.message : 'ذخیره نشد؛ دوباره امتحان کنید.');

export default function Account() {
  const c = useColors(), ins = useSafeAreaInsets();
  const { user, updateAccount } = useApp();
  const [name, setName] = useState(user?.name ?? '');
  const [nameMsg, setNameMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [cur, setCur] = useState(''), [pw, setPw] = useState(''), [pw2, setPw2] = useState('');
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState<'name' | 'pw' | null>(null);

  const saveName = async () => {
    const n = name.trim();
    if (!n) return setNameMsg({ ok: false, text: 'نام را وارد کنید.' });
    setBusy('name'); setNameMsg(null);
    try { await updateAccount({ name: n }); setNameMsg({ ok: true, text: 'نام ذخیره شد.' }); }
    catch (e) { setNameMsg({ ok: false, text: errText(e) }); }
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
    <Backdrop>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingTop: ins.top + 14, paddingHorizontal: 16, paddingBottom: ins.bottom + 40, gap: 14, maxWidth: 560, width: '100%', alignSelf: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Pressable onPress={() => { tap(); router.back(); }} accessibilityLabel="بازگشت" hitSlop={6}
              style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface, borderWidth: 1.5, borderColor: c.line }}>
              <Icon name="arrowRight" size={20} color={c.link} />
            </Pressable>
            <T style={{ flex: 1, fontSize: 24, lineHeight: 34, fontWeight: '700' }}>حساب کاربری</T>
          </View>

          <Card style={{ gap: 6 }}>
            <T style={{ fontWeight: '700' }}>نام کاربری</T>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, height: 50, borderRadius: 14, backgroundColor: c.surface2 }}>
              <Icon name="lock" size={18} color={c.faint} />
              <L style={{ flex: 1, color: c.muted, textAlign: 'right' }}>@{user?.username}</L>
            </View>
            <T style={{ fontSize: 12.5, color: c.muted }}>نام کاربری قابل تغییر نیست.</T>
          </Card>

          <Card style={{ gap: 10 }}>
            <T style={{ fontWeight: '700' }}>نام</T>
            <Field icon="person" label="نام شما" value={name} onChange={v => { setName(v); setNameMsg(null); }} onSubmit={saveName} />
            <Note msg={nameMsg} />
            <Button label={busy === 'name' ? 'در حال ذخیره…' : 'ذخیره‌ی نام'} onPress={saveName} disabled={!!busy || name.trim() === (user?.name ?? '')} />
          </Card>

          <Card style={{ gap: 10 }}>
            <T style={{ fontWeight: '700' }}>تغییر رمز عبور</T>
            <Field icon="lock" label="رمز عبور فعلی" value={cur} onChange={v => { setCur(v); setPwMsg(null); }} secure ltr />
            <Field icon="lock" label="رمز عبور جدید" value={pw} onChange={v => { setPw(v); setPwMsg(null); }} secure ltr />
            <Field icon="lock" label="تکرار رمز عبور جدید" value={pw2} onChange={v => { setPw2(v); setPwMsg(null); }} secure ltr onSubmit={savePw} />
            <Note msg={pwMsg} />
            <Button label={busy === 'pw' ? 'در حال ذخیره…' : 'تغییر رمز عبور'} onPress={savePw} disabled={!!busy} />
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </Backdrop>
  );
}
