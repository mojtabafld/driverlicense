// Sign in / sign up, set straight on the page (no card), centred: logo, greeting, a mode switch, fields with icons
// and one wide button, then the site's three short facts.
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput, View } from 'react-native';

import { useApp } from '@/lib/store';
import { Icon, type IconName } from '@/ui/icon';
import { Backdrop, Button, Logo, TopBar, T, tap } from '@/ui/kit';
import { DA_FONT, useColors, useIsDark } from '@/ui/theme';

// A field whose name is its placeholder (no label above it).
function Field({ icon, label, value, onChange, secure, ltr, onSubmit }: {
  icon: IconName; label: string; value: string; onChange: (v: string) => void; secure?: boolean; ltr?: boolean; onSubmit?: () => void;
}) {
  const c = useColors(), dark = useIsDark();
  const [show, setShow] = useState(false), [focus, setFocus] = useState(false);
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, height: 54, borderRadius: 14, borderWidth: 1.5,
        borderColor: focus ? c.accent : dark ? 'rgba(255,255,255,0.06)' : 'rgba(2,71,118,0.08)',
        backgroundColor: focus ? c.surface : dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.75)',
        ...(Platform.OS === 'web' ? { boxShadow: focus ? `0 0 0 4px ${c.accentSoft}` : '0 1px 2px rgba(16,40,60,.05)', transition: 'border-color .15s, box-shadow .15s, background-color .15s' } as any : {}) }}>
        <Icon name={icon} size={19} color={focus ? c.link : c.faint} />
        <TextInput value={value} onChangeText={onChange} secureTextEntry={secure && !show} autoCapitalize="none" autoCorrect={false}
          placeholder={label} accessibilityLabel={label} placeholderTextColor={c.muted} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          onSubmitEditing={onSubmit} returnKeyType={onSubmit ? 'go' : 'next'}
          style={{ flex: 1, height: 50, fontSize: 15.5, fontFamily: ltr && value ? DA_FONT : 'Vazirmatn-400', color: c.text, textAlign: ltr && value ? 'left' : 'right',
            writingDirection: ltr ? 'ltr' : 'rtl', ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}) }} />
        {secure ? (
          <Pressable onPress={() => { tap(); setShow(!show); }} hitSlop={10} accessibilityLabel={show ? 'پنهان کردن رمز' : 'نمایش رمز'}>
            <Icon name={show ? 'eyeSlash' : 'eye'} size={19} color={show ? c.link : c.faint} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

// Sign in / sign up switch: a soft track with the chosen side raised.
function ModeSwitch({ mode, onChange }: { mode: 'login' | 'register'; onChange: (m: 'login' | 'register') => void }) {
  const c = useColors(), dark = useIsDark();
  return (
    <View style={{ flexDirection: 'row', padding: 4, gap: 4, borderRadius: 14, backgroundColor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(2,71,118,0.07)' }}>
      {(['login', 'register'] as const).map(m => {
        const on = m === mode;
        return (
          <Pressable key={m} onPress={() => { tap(); onChange(m); }} style={{ flex: 1 }} accessibilityRole="tab" accessibilityState={{ selected: on }}>
            <View style={{ paddingVertical: 9, borderRadius: 10, backgroundColor: on ? c.surface : 'transparent',
              ...(on ? { shadowColor: '#10283c', shadowOpacity: 0.12, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 1 } : {}) }}>
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
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingBottom: 48, paddingTop: 8 }}>
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
            <Button big label={busy ? '…' : mode === 'login' ? 'ورود' : 'ساخت حساب'} onPress={submit} disabled={!ready} style={{ marginTop: 2 }} />
            {/* The site's three facts */}
            <View style={{ alignItems: 'center', gap: 4, marginTop: 10 }}>
              {['🇩🇰 آزمون تئوری گواهینامه‌ی B', 'بیش از ۱۰۰۰ سؤال در ۴۴ آزمون', 'ترجمه‌ی فارسی و آموزش'].map(f => (
                <T key={f} style={{ color: c.muted, fontSize: 12.5, textAlign: 'center' }}>{f}</T>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Backdrop>
  );
}
