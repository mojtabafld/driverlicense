// Sign in / sign up on one card, like the site's sign-in page.
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, TextInput, View } from 'react-native';

import { useApp } from '@/lib/store';
import { Backdrop, Button, Logo, Segmented, TopBar, T } from '@/ui/kit';
import { radius, useColors } from '@/ui/theme';

function Field({ label, value, onChange, secure, ltr, placeholder }: { label: string; value: string; onChange: (v: string) => void; secure?: boolean; ltr?: boolean; placeholder?: string }) {
  const c = useColors();
  const [show, setShow] = useState(false), [focus, setFocus] = useState(false);
  return (
    <View style={{ gap: 7 }}>
      <T style={{ color: c.muted, fontSize: 13 }}>{label}</T>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, borderRadius: radius.field, borderWidth: 1.5,
        borderColor: focus ? c.accent : 'transparent', backgroundColor: focus ? c.surface : c.surface2,
        ...(Platform.OS === 'web' && focus ? { boxShadow: `0 0 0 4px ${c.accentSoft}` } as any : {}) }}>
        <TextInput value={value} onChangeText={onChange} secureTextEntry={secure && !show} autoCapitalize="none" autoCorrect={false}
          placeholder={placeholder} placeholderTextColor={c.faint} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ flex: 1, height: 47, fontSize: 15.5, color: c.text, textAlign: ltr ? 'left' : 'right', writingDirection: ltr ? 'ltr' : 'rtl', ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}) }} />
        {secure ? <Pressable onPress={() => setShow(!show)} hitSlop={10}><T style={{ color: c.link, fontWeight: '600', fontSize: 13 }}>{show ? 'پنهان' : 'نمایش'}</T></Pressable> : null}
      </View>
    </View>
  );
}

export default function Login() {
  const c = useColors();
  const { login, register } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState(''), [user, setUser] = useState(''), [pw, setPw] = useState('');
  const [err, setErr] = useState(''), [busy, setBusy] = useState(false);
  const submit = async () => {
    setErr(''); setBusy(true);
    try { if (mode === 'login') await login(user.trim(), pw); else await register(name.trim(), user.trim(), pw); }
    catch (e: any) { setErr(e.message); setBusy(false); }
  };
  return (
    <Backdrop>
      <TopBar />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <View style={{ padding: 28, paddingTop: 32, gap: 16, width: '100%', maxWidth: 400, alignSelf: 'center', borderRadius: radius.xl, backgroundColor: c.surface,
          shadowColor: '#10283c', shadowOpacity: 0.1, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, elevation: 3 }}>
          <View style={{ alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <View style={{ marginBottom: 6 }}><Logo size={48} /></View>
            <T style={{ fontSize: 23, lineHeight: 34, fontWeight: '700', textAlign: 'center' }}>{mode === 'login' ? 'خوش آمدید' : 'ساخت حساب کاربری'}</T>
            <T style={{ color: c.muted, textAlign: 'center', fontSize: 13.5 }}>آزمون تئوری گواهینامه‌ی B دانمارک، با ترجمه‌ی فارسی</T>
          </View>
          <Segmented value={mode} onChange={m => { setMode(m); setErr(''); }} options={[{ value: 'login', label: 'ورود' }, { value: 'register', label: 'ثبت‌نام' }]} />
          {mode === 'register' ? <Field label="نام نمایشی" value={name} onChange={setName} placeholder="مثلاً سارا" /> : null}
          <Field label="نام کاربری" value={user} onChange={v => setUser(v.replace(/[^A-Za-z0-9_.-]/g, ''))} ltr placeholder="username" />
          <Field label="رمز عبور" value={pw} onChange={setPw} secure ltr placeholder="••••••••" />
          {err ? <T style={{ color: c.bad, fontSize: 13.5 }}>{err}</T> : null}
          <Button big label={busy ? '…' : mode === 'login' ? 'ورود' : 'ساخت حساب'} onPress={submit} disabled={busy || !user || !pw} style={{ marginTop: 4 }} />
        </View>
      </KeyboardAvoidingView>
    </Backdrop>
  );
}
