// Sign in / sign up, set straight on the page (no card), centred: logo, greeting, a mode switch, fields with icons
// and one wide button, then the site's three short facts.
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';

import { useApp } from '@/lib/store';
import { Field } from '@/ui/field';
import { Icon } from '@/ui/icon';
import { Backdrop, Button, Logo, TopBar, T, tap } from '@/ui/kit';
import { useColors, useIsDark } from '@/ui/theme';

// Sign in / sign up switch: a soft track with the chosen side raised.
function ModeSwitch({ mode, onChange }: { mode: 'login' | 'register'; onChange: (m: 'login' | 'register') => void }) {
  const c = useColors(), dark = useIsDark();
  return (
    <View style={{ flexDirection: 'row', padding: 4, gap: 4, borderRadius: 14, backgroundColor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }}>
      {(['login', 'register'] as const).map(m => {
        const on = m === mode;
        return (
          <Pressable key={m} onPress={() => { tap(); onChange(m); }} style={{ flex: 1 }} accessibilityRole="tab" accessibilityState={{ selected: on }}>
            <View style={{ paddingVertical: 9, borderRadius: 10, backgroundColor: on ? c.surface : 'transparent',
              ...(on ? { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 1 } : {}) }}>
              <T style={{ textAlign: 'center', fontSize: 14.5, fontWeight: on ? '700' : '600', color: on ? c.link : c.muted }}>{m === 'login' ? 'ورود' : 'ثبت‌نام'}</T>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function Login() {
  const c = useColors();
  const { login, register } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState(''), [user, setUser] = useState(''), [pw, setPw] = useState('');
  const [err, setErr] = useState(''), [busy, setBusy] = useState(false);
  const ready = !busy && !!user && !!pw;
  const submit = async () => {
    if (!ready) return;
    setErr(''); setBusy(true);
    try { if (mode === 'login') await login(user.trim(), pw); else await register(name.trim(), user.trim(), pw); }
    catch (e: any) { setErr(e.message); setBusy(false); }
  };
  return (
    <Backdrop>
      <TopBar />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingBottom: 48, paddingTop: 8 }}>
          <View style={{ width: '100%', maxWidth: 360, alignSelf: 'center', gap: 14 }}>
            {/* Logo on a soft halo, greeting */}
            <View style={{ alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <View style={{ width: 92, height: 92, borderRadius: 46, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accentSoft, marginBottom: 8 }}>
                <Logo size={56} />
              </View>
              <T style={{ fontSize: 28, lineHeight: 40, fontWeight: '800', textAlign: 'center' }}>{mode === 'login' ? 'خوش آمدید' : 'ساخت حساب کاربری'}</T>
              <T style={{ color: c.muted, textAlign: 'center', fontSize: 14, lineHeight: 23 }}>
                {mode === 'login' ? 'برای ادامه‌ی تمرین وارد حساب خود شوید' : 'برای ذخیره‌ی پیشرفت و اشتباهات‌تان یک حساب بسازید'}
              </T>
            </View>
            <ModeSwitch mode={mode} onChange={m => { setMode(m); setErr(''); }} />
            {mode === 'register' ? <Field icon="person" label="نام نمایشی (مثلاً سارا)" value={name} onChange={setName} /> : null}
            <Field icon={mode === 'register' ? 'clipboard' : 'person'} label="نام کاربری" value={user} onChange={v => setUser(v.replace(/[^A-Za-z0-9_.-]/g, ''))} ltr />
            <Field icon="lock" label="رمز عبور" value={pw} onChange={setPw} secure ltr onSubmit={submit} />
            {err ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, backgroundColor: c.badSoft }}>
                <Icon name="warning" size={17} color={c.bad} />
                <T style={{ flex: 1, color: c.bad, fontSize: 13.5 }}>{err}</T>
              </View>
            ) : null}
            <Button big label={busy ? '…' : mode === 'login' ? 'ورود' : 'ساخت حساب'} onPress={submit} disabled={!ready} kind="grey" style={{ marginTop: 2 }} icon={mode === 'login' ? 'person' : 'personAdd'} />
            {/* The site's three facts */}
            <View style={{ alignItems: 'center', gap: 4, marginTop: 10 }}>
              {['🇩🇰 آزمون تئوری گواهینامه‌ی دانمارک', 'بیش از ۱۰۰۰ سؤال در ۴۴ آزمون', 'ترجمه‌ی فارسی و آموزش'].map(f => (
                <T key={f} style={{ color: c.muted, fontSize: 12.5, textAlign: 'center' }}>{f}</T>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Backdrop>
  );
}
