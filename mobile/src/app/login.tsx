// Sign in / sign up: a tall picture header (as on the tab pages; on the main site a flat landscape) with the greeting, then on the page (no card) a mode
// switch, fields with icons and one wide button, then the site's three short facts.
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useApp } from '@/lib/store';
import { Field } from '@/ui/field';
import { Icon } from '@/ui/icon';
import { ArcButton, Backdrop, Button, Hero, SegPill, T, ThemeButton, HeroFade, tap, useArcSeg, useHeaderTop } from '@/ui/kit';
import { ARC, useColors, useIsDark } from '@/ui/theme';
import { LOGIN_BG, LoginArt } from '@/ui/header-art';
import { RTL, tr } from '@/lib/i18n';

// Sign in / sign up switch: a soft track with the chosen side raised. (Main site, light: the track a step darker than
// the page, as the app's switches look on their white cards, «پاسخ شما / پاسخ صحیح» for one.)
function ModeSwitch({ mode, onChange }: { mode: 'login' | 'register'; onChange: (m: 'login' | 'register') => void }) {
  const c = useColors(), dark = useIsDark(), seg = useArcSeg();
  return (
    <View style={[{ flexDirection: 'row', padding: 4, gap: 4, borderRadius: 14, backgroundColor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }, ARC && seg.track, ARC && !dark && { backgroundColor: '#e4e4e4' }]}>
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

// Main site: a drawing like the tab pages' headers across the top (LoginArt, both themes), its foot fading into
// the page as theirs do, the theme switch over it; the greeting and its line under it on the page, in the form's column.
function SceneHead({ title, subtitle }: { title: string; subtitle: string }) {
  const c = useColors(), dark = useIsDark(), ins = useSafeAreaInsets(), { width, height } = useWindowDimensions();
  const sky = dark ? LOGIN_BG.dark : LOGIN_BG.light;
  useHeaderTop(sky);
  const wide = width >= 700, H = Math.round(Math.max(230, Math.min(height * (wide ? 0.5 : 0.36), wide ? 420 : 360)));
  const bold = { fontFamily: RTL ? 'Vazirmatn-700' : Platform.OS === 'web' ? 'Inter-700, Vazirmatn-700, sans-serif' : 'Inter-700', fontWeight: 'normal' as const };
  return (
    <>
      <View style={{ height: H + ins.top, backgroundColor: sky, paddingTop: ins.top, overflow: 'hidden' }}>
        <LoginArt light={!dark} width={width} height={H - 84} />{/* (above the fade, as on the tab pages) */}
        <HeroFade />
        <View style={{ position: 'absolute', top: ins.top + (Platform.OS === 'web' ? 14 : 8), left: 16, right: 16, maxWidth: 980 - 32, alignSelf: 'center', alignItems: 'flex-end' }}>
          <View style={{ borderRadius: 19, backgroundColor: dark ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.55)' }}><ThemeButton /></View>
        </View>
      </View>
      <View style={{ width: '100%', maxWidth: 360 + 48, alignSelf: 'center', paddingHorizontal: 24, paddingTop: 26, paddingBottom: 18, gap: 6 }}>
        <T style={[{ fontSize: 28, lineHeight: 38, color: c.text }, bold]}>{title}</T>
        <T style={{ fontSize: 15, lineHeight: 24, color: c.muted }}>{subtitle}</T>
      </View>
    </>
  );
}

export default function Login() {
  const c = useColors(), dark = useIsDark();
  const { login, register, guest } = useApp();
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
  const asGuest = async () => {
    if (busy) return;
    setErr(''); setBusy(true);
    try { await guest(tr('مهمان')); } catch (e: any) { setErr(e.message); setBusy(false); }
  };
  const title = mode === 'login' ? 'خوش آمدید' : 'ساخت حساب کاربری';
  const subtitle = mode === 'login' ? 'برای ادامه‌ی تمرین وارد حساب خود شوید' : 'برای ذخیره‌ی پیشرفت و اشتباهات‌تان یک حساب بسازید';
  return (
    <Backdrop>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 48 }}>
          {ARC ? <SceneHead title={title} subtitle={subtitle} />
            : <Hero tall lower={mode === 'register' ? 30 : 0} look={{ pic: 7, light: 8, icon: 'person' }} title={title} subtitle={subtitle} />}
          <View style={{ width: '100%', maxWidth: 360 + 48, alignSelf: 'center', gap: 14, paddingHorizontal: 24, paddingTop: ARC ? 0 : 6 }}>
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
            {/* Main site: a plain solid deep green button (the hills' green), its label alone, faded while it can't be used. */}
            {ARC ? <ArcButton big label={busy ? '…' : mode === 'login' ? 'ورود' : 'ساخت حساب'} onPress={submit} disabled={!ready} style={{ marginTop: 4 }} />
              : <Button big label={busy ? '…' : mode === 'login' ? 'ورود' : 'ساخت حساب'} onPress={submit} disabled={!ready} kind="grey" style={{ marginTop: 2 }} icon={mode === 'login' ? 'person' : 'personAdd'} />}
            {/* Main site: a plain link under the button, to use the site without an account (a guest account, server's /api/guest). */}
            {ARC ? (
              <Pressable onPress={() => { tap(); asGuest(); }} disabled={busy} accessibilityRole="link" hitSlop={8} style={{ alignSelf: 'center', paddingVertical: 6, marginTop: 2 }}>
                {({ hovered }: { pressed: boolean; hovered?: boolean }) => <T style={{ color: dark ? c.link : c.cta, fontSize: 15.5, fontWeight: '500', textDecorationLine: hovered ? 'underline' : 'none' }}>ورود به عنوان کاربر مهمان</T>}
              </Pressable>
            ) : null}
            {/* The site's three facts (/app) */}
            {ARC ? null : <View style={{ alignItems: 'center', gap: 4, marginTop: 10 }}>
              {['🇩🇰 آزمون تئوری گواهینامه‌ی دانمارک', 'بیش از ۱۰۰۰ سؤال در ۴۴ آزمون', 'ترجمه‌ی فارسی و آموزش'].map(f => (
                <T key={f} style={{ color: c.muted, fontSize: 12.5, textAlign: 'center' }}>{f}</T>
              ))}
            </View>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Backdrop>
  );
}
