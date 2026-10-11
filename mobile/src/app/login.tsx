// Sign in / sign up: a tall picture header (as on the tab pages) with the greeting, then on the page (no card) a mode
// switch, fields with icons and one wide button, then the site's three short facts.
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';

import { useApp } from '@/lib/store';
import { Field } from '@/ui/field';
import { Icon } from '@/ui/icon';
import { ArcButton, Backdrop, Button, Hero, SegPill, T, tap, useArcSeg } from '@/ui/kit';
import { ARC, useColors, useIsDark } from '@/ui/theme';

// Sign in / sign up switch: a soft track with the chosen side raised.
function ModeSwitch({ mode, onChange }: { mode: 'login' | 'register'; onChange: (m: 'login' | 'register') => void }) {
  const c = useColors(), dark = useIsDark(), seg = useArcSeg();
  return (
    <View style={[{ flexDirection: 'row', padding: 4, gap: 4, borderRadius: 14, backgroundColor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }, ARC && seg.track]}>
      {(['login', 'register'] as const).map(m => {
        const on = m === mode;
        return (
          <Pressable key={m} onPress={() => { tap(); onChange(m); }} style={{ flex: 1 }} accessibilityRole="tab" accessibilityState={{ selected: on }}>
            <View style={[{ paddingVertical: 9, borderRadius: 10, backgroundColor: on ? c.surface : 'transparent',
              ...(on ? { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 1 } : {}) },
              ARC && { ...seg.pill(on), paddingVertical: 10, shadowOpacity: 0, elevation: 0 }]}>
              {ARC ? <SegPill on={on} /> : null}
              <T style={[{ textAlign: 'center', fontSize: 14.5, fontWeight: on ? '700' : '600', color: on ? c.link : c.muted }, ARC && seg.label(on)]}>{m === 'login' ? 'ورود' : 'ثبت‌نام'}</T>
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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 48 }}>
          <Hero tall lower={mode === 'register' ? 30 : 0} look={{ pic: 7, light: 8, icon: 'person' }} title={mode === 'login' ? 'خوش آمدید' : 'ساخت حساب کاربری'}
            subtitle={mode === 'login' ? 'برای ادامه‌ی تمرین وارد حساب خود شوید' : 'برای ذخیره‌ی پیشرفت و اشتباهات‌تان یک حساب بسازید'} />
          <View style={{ width: '100%', maxWidth: 360 + 48, alignSelf: 'center', gap: 14, paddingHorizontal: 24, paddingTop: 6 }}>
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
            {/* Main site: the same deep green as the home and exam buttons (ArcButton), faded while it can't be used. */}
            {ARC ? <ArcButton label={busy ? '…' : mode === 'login' ? 'ورود' : 'ساخت حساب'} onPress={submit} disabled={!ready} style={{ marginTop: 2 }} icon={mode === 'login' ? 'person' : 'personAdd'} />
              : <Button big label={busy ? '…' : mode === 'login' ? 'ورود' : 'ساخت حساب'} onPress={submit} disabled={!ready} kind="grey" style={{ marginTop: 2 }} icon={mode === 'login' ? 'person' : 'personAdd'} />}
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
