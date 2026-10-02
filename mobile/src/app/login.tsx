// Sign in / sign up on a single glass card.
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, TextInput, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { useApp } from '@/lib/store';
import { Glass } from '@/ui/glass';
import { Backdrop, Button, Segmented, T } from '@/ui/kit';
import { radius, useColors } from '@/ui/theme';

function Field({ label, value, onChange, secure, ltr, placeholder }: { label: string; value: string; onChange: (v: string) => void; secure?: boolean; ltr?: boolean; placeholder?: string }) {
  const c = useColors();
  const [show, setShow] = useState(false);
  return (
    <View style={{ gap: 6 }}>
      <T style={{ color: c.muted, fontSize: 13, fontWeight: '600' }}>{label}</T>
      <Glass r={radius.md} strong style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 }}>
        <TextInput value={value} onChangeText={onChange} secureTextEntry={secure && !show} autoCapitalize="none" autoCorrect={false}
          placeholder={placeholder} placeholderTextColor={c.faint}
          style={{ flex: 1, height: 50, fontSize: 16, color: c.text, textAlign: ltr ? 'left' : 'right', writingDirection: ltr ? 'ltr' : 'rtl', ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}) }} />
        {secure ? <Pressable onPress={() => setShow(!show)} hitSlop={10}><T style={{ color: c.accent, fontWeight: '700', fontSize: 13 }}>{show ? 'پنهان' : 'نمایش'}</T></Pressable> : null}
      </Glass>
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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Glass r={radius.xl} style={{ padding: 24, gap: 16, width: '100%', maxWidth: 420, alignSelf: 'center' }}>
          <View style={{ alignItems: 'center', gap: 6 }}>
            <Svg width={56} height={56} viewBox="0 0 32 32"><Rect x={2} y={2} width={28} height={28} rx={9} fill={c.accent} /><Path d="M9 20.5c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round" /><Circle cx={16} cy={20.5} r={2.2} fill="#fff" /><Path d="M16 20.5l3.2-3.8" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" /></Svg>
            <T style={{ fontSize: 24, fontWeight: '800', textAlign: 'center' }}>{mode === 'login' ? 'خوش آمدید' : 'ساخت حساب کاربری'}</T>
            <T style={{ color: c.muted, textAlign: 'center', fontSize: 13.5 }}>آزمون تئوری گواهینامه‌ی B دانمارک، با ترجمه‌ی فارسی</T>
          </View>
          <Segmented value={mode} onChange={m => { setMode(m); setErr(''); }} options={[{ value: 'login', label: 'ورود' }, { value: 'register', label: 'ثبت‌نام' }]} />
          {mode === 'register' ? <Field label="نام نمایشی" value={name} onChange={setName} placeholder="مثلاً سارا" /> : null}
          <Field label="نام کاربری" value={user} onChange={v => setUser(v.replace(/[^A-Za-z0-9_.-]/g, ''))} ltr placeholder="username" />
          <Field label="رمز عبور" value={pw} onChange={setPw} secure ltr placeholder="••••••••" />
          {err ? <T style={{ color: c.bad, fontSize: 13.5 }}>{err}</T> : null}
          <Button label={busy ? '…' : mode === 'login' ? 'ورود' : 'ساخت حساب'} onPress={submit} disabled={busy || !user || !pw} />
        </Glass>
      </KeyboardAvoidingView>
    </Backdrop>
  );
}
