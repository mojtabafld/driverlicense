// Asked once per user, after the intro and the first sign-in (and once for users from before it existed): which
// language the questions are in, Danish (as in the real test) or English. Saved in the user's settings with
// `langChosen`, so it is not asked again on any device; it can be changed later in the settings. Under it «ظاهر»:
// light or dark, the device's current one shown chosen (left as it is, the app keeps following the device); a tap
// applies the other at once.
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { ClipPath, Defs, Path, Rect } from 'react-native-svg';

import { useApp } from '@/lib/store';
import { Icon } from './icon';
import { L, T, tap } from './kit';
import { INTRO_BG as BG } from './onboarding';
import { ROSE, useTheme } from './theme';
import type { ThemeName } from '@/lib/prefs';

const BUTTON = '#ffffff', BUTTON_TEXT = ROSE ? '#1f1719' : '#14421c';

function FlagDK() {
  return (
    <Svg width={44} height={32} viewBox="0 0 37 28">
      <Rect width={37} height={28} rx={4} fill="#C8102E" />
      <Rect x={12} width={4} height={28} fill="#fff" />
      <Rect y={12} width={37} height={4} fill="#fff" />
    </Svg>
  );
}
function FlagGB() {
  return (
    <Svg width={44} height={32} viewBox="0 0 60 40">
      <Defs><ClipPath id="gb"><Rect width={60} height={40} rx={6} /></ClipPath></Defs>
      <Rect width={60} height={40} rx={6} fill="#012169" />
      <Path d="M0 0L60 40M60 0L0 40" stroke="#fff" strokeWidth={8} clipPath="url(#gb)" />
      <Path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth={3} clipPath="url(#gb)" />
      <Path d="M30 0V40M0 20H60" stroke="#fff" strokeWidth={12} />
      <Path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth={7} />
    </Svg>
  );
}

const LOOKS: { v: ThemeName; label: string; icon: 'sun' | 'moon' }[] = [
  { v: 'light', label: 'روشن', icon: 'sun' }, { v: 'dark', label: 'تیره', icon: 'moon' },
];

const OPTIONS = [
  { v: 'da' as const, Flag: FlagDK, name: 'Dansk', fa: 'دانمارکی', note: 'زبان آزمون رسمی؛ برای آمادگی کامل توصیه می‌شود' },
  { v: 'en' as const, Flag: FlagGB, name: 'English', fa: 'انگلیسی', note: 'اگر با انگلیسی راحت‌ترید' },
];

export function LangPick({ onDone }: { onDone?: () => void }) {
  const ins = useSafeAreaInsets();
  const { settings, setSettings } = useApp();
  const [lang, setLang] = useState<'da' | 'en'>(settings.lang === 'en' ? 'en' : 'da');
  const [busy, setBusy] = useState(false);
  const { theme, setMode } = useTheme(); // theme: the one in use (the device's while the mode follows it)
  const save = () => { tap(); setBusy(true); setSettings({ lang, langChosen: true }).then(() => onDone?.(), () => setBusy(false)); };
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={BG} locations={[0, 0.8, 1]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <View style={{ flex: 1, paddingTop: ins.top + 24, paddingBottom: ins.bottom + 20, paddingHorizontal: 28, width: '100%', maxWidth: 560, alignSelf: 'center' }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', gap: 26, paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
          <View style={{ gap: 12 }}>
            <View style={{ width: 56, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.14)' }}>
              <Icon name="translate" size={30} color="#fff" />
            </View>
            <T style={{ color: '#fff', fontSize: 30, lineHeight: 44, fontWeight: '800' }}>سؤال‌ها به چه زبانی باشند؟</T>
            <T style={{ color: 'rgba(255,255,255,0.86)', fontSize: 16, lineHeight: 28 }}>ترجمه‌ی فارسی در هر دو حالت زیر سؤال‌ها نمایش داده می‌شود. بعداً هم از تنظیمات قابل تغییر است.</T>
          </View>
          <View style={{ gap: 12 }} accessibilityRole="radiogroup">
            {OPTIONS.map(({ v, Flag, name, fa, note }) => {
              const on = lang === v;
              return (
                <Pressable key={v} onPress={() => { tap(); setLang(v); }} accessibilityRole="radio" accessibilityState={{ checked: on }}
                  style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1, flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: 20, borderWidth: 2,
                    borderColor: on ? '#fff' : 'rgba(255,255,255,0.22)', backgroundColor: on ? '#fff' : 'rgba(255,255,255,0.08)' })}>
                  <View style={{ borderRadius: 5, overflow: 'hidden' }}><Flag /></View>
                  <View style={{ flex: 1, gap: 2 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                      <L style={{ fontSize: 19, lineHeight: 26, fontWeight: '700', color: on ? BUTTON_TEXT : '#fff' }}>{name}</L>
                      <T style={{ fontSize: 14, color: on ? (ROSE ? '#6c5f62' : '#3f5e3f') : 'rgba(255,255,255,0.75)' }}>{fa}</T>
                    </View>
                    <T style={{ fontSize: 12.5, lineHeight: 20, color: on ? (ROSE ? '#7d6f72' : '#557055') : 'rgba(255,255,255,0.7)' }}>{note}</T>
                  </View>
                  <View style={{ width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 2,
                    borderColor: on ? (ROSE ? '#e0605b' : '#228B22') : 'rgba(255,255,255,0.5)', backgroundColor: on ? (ROSE ? '#e0605b' : '#228B22') : 'transparent' }}>
                    {on ? <Icon name="check" size={14} color="#fff" weight="bold" /> : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
          {/* The look: light or dark, the one in use chosen. */}
          <View style={{ gap: 10 }}>
            <T style={{ color: '#fff', fontSize: 17, lineHeight: 26, fontWeight: '700' }}>ظاهر</T>
            <View style={{ flexDirection: 'row', gap: 8, padding: 4, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.10)' }} accessibilityRole="radiogroup">
              {LOOKS.map(({ v, label, icon }) => {
                const on = theme === v;
                return (
                  <Pressable key={v} onPress={() => { tap(); if (!on) setMode(v); }} accessibilityRole="radio" accessibilityState={{ checked: on }}
                    style={({ pressed }) => ({ flex: 1, height: 46, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
                      opacity: pressed ? 0.85 : 1, backgroundColor: on ? '#fff' : 'transparent' })}>
                    <Icon name={icon} size={17} color={on ? BUTTON_TEXT : '#fff'} />
                    <T style={{ fontSize: 14, fontWeight: '600', color: on ? BUTTON_TEXT : '#fff' }}>{label}</T>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>
        <Pressable disabled={busy} onPress={save} accessibilityRole="button"
          style={({ pressed }) => ({ opacity: busy ? 0.6 : pressed ? 0.85 : 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, height: 54, borderRadius: ROSE ? 27 : 12, backgroundColor: BUTTON })}>
          <T style={{ color: BUTTON_TEXT, fontSize: 17, fontWeight: '600' }}>ادامه</T>
          <Icon name="chevronLeft" size={16} color={BUTTON_TEXT} weight="semibold" />
        </Pressable>
      </View>
    </View>
  );
}
