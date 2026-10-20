// The one-question screens of signing in and up (ui/sign-steps.tsx), the questions' language (ui/lang-pick.tsx) and the
// app's language (ui/lang-wheel.tsx), after the Saphe app's (Mojtaba 2026-10-20), on the page's own colour (black in
// the dark theme): a round back button at the top and, at the other end, where the user is («مرحله‌ی ۱ از ۴»); the
// question as a big title with a line under it; the step's fields or choices; and its button kept at the foot of the
// screen (over the keyboard) under a hairline, faded until the step's answer is there.
import { useState } from 'react';
import { Animated, KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput, View, type TextInputProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { ClipPath, Defs, Path, Rect } from 'react-native-svg';

import { RTL, t as fmt, tr } from '@/lib/i18n';
import { Icon } from './icon';
import { L, T, physical, physicalAlign, tap } from './kit';
import { DA_FONT, useColors, useIsDark } from './theme';

type FrameProps = {
  onBack?: () => void; corner?: React.ReactNode; title: React.ReactNode; sub?: React.ReactNode; children?: React.ReactNode;
  button: { label: React.ReactNode; ready: boolean; busy?: boolean; onPress: () => void }; fade?: Animated.Value;
};
export function StepFrame({ onBack, corner, title, sub, children, button, fade }: FrameProps) {
  const c = useColors(), dark = useIsDark(), ins = useSafeAreaInsets();
  const ready = button.ready && !button.busy;
  const grey = dark ? c.surface2 : c.line;
  const rise = fade ? { opacity: fade, transform: [{ translateY: fade.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }] } : null;
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: c.bg }}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, width: '100%', maxWidth: 480, alignSelf: 'center', paddingHorizontal: 24, paddingTop: ins.top + (Platform.OS === 'web' ? 14 : 8), paddingBottom: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 46 }}>
          {onBack ? (
            <Pressable onPress={() => { tap(); onBack(); }} hitSlop={8} accessibilityRole="button" accessibilityLabel={tr('بازگشت')}
              style={({ pressed }) => ({ width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', backgroundColor: grey, opacity: pressed ? 0.75 : 1 })}>
              <Icon name="arrowRight" size={21} color={c.text} />
            </Pressable>
          ) : <View />}
          {corner}
        </View>
        <Animated.View style={[{ gap: 10, marginTop: 30 }, rise]}>
          {typeof title === 'string' ? <T style={{ fontSize: 29, lineHeight: 42, fontWeight: '800' }}>{title}</T> : title}
          {typeof sub === 'string' ? <T style={{ fontSize: 16, lineHeight: 26, color: c.muted }}>{sub}</T> : sub}
          <View style={{ marginTop: 16, gap: 12 }}>{children}</View>
        </Animated.View>
      </ScrollView>
      <View style={{ borderTopWidth: 1, borderTopColor: c.line, paddingTop: 12, paddingBottom: ins.bottom + 14, paddingHorizontal: 24, backgroundColor: c.bg }}>
        <Pressable onPress={() => { if (ready) { tap(); button.onPress(); } }} disabled={!ready} accessibilityRole="button" accessibilityState={{ disabled: !ready }}
          style={({ pressed }) => ({ width: '100%', maxWidth: 432, alignSelf: 'center', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center',
            backgroundColor: ready ? c.cta : grey, opacity: pressed ? 0.85 : 1 })}>
          {button.busy ? <L style={{ fontSize: 17, color: c.muted }}>…</L>
            : typeof button.label === 'string' ? <T style={{ fontSize: 17, fontWeight: '600', color: ready ? c.ctaFg : c.faint }}>{button.label}</T> : button.label}
          <View style={{ position: 'absolute', top: 0, bottom: 0, ...physical(RTL ? { left: 18 } : { right: 18 }), justifyContent: 'center' }}>
            <Icon name="arrowLeft" size={20} color={ready ? c.ctaFg : c.faint} />
          </View>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

// «مرحله‌ی ۱ از ۴» over what is being done, at the top's far end.
export function StepCount({ n, of, what }: { n: number; of: number; what: string }) {
  const c = useColors();
  return (
    <View style={{ alignItems: 'flex-end' }}>
      <T raw style={{ fontSize: 14, lineHeight: 20, fontWeight: '700', color: c.muted, textAlign: physicalAlign(RTL ? 'left' : 'right') }}>{fmt('مرحله‌ی {0} از {1}', n, of)}</T>
      <T style={{ fontSize: 14, lineHeight: 20, color: c.muted, textAlign: physicalAlign(RTL ? 'left' : 'right') }}>{what}</T>
    </View>
  );
}

// The step's large field: a plain box with a light border, bright while typed in, green once its answer is good
// (`good`, e.g. a whole email address) and red while its answer is refused (`bad`); with a name above it when `label` is given, a clear button while it has text,
// and for passwords an eye.
export function BigField({ value, onChange, placeholder, label, secure, ltr, onSubmit, auto, good, bad, focus: first = true }: {
  value: string; onChange: (v: string) => void; placeholder?: string; label?: string; secure?: boolean; ltr?: boolean; onSubmit: () => void; good?: boolean; bad?: boolean; focus?: boolean;
  auto?: Pick<TextInputProps, 'autoComplete' | 'textContentType' | 'keyboardType' | 'autoCapitalize'>;
}) {
  const c = useColors();
  const [focus, setFocus] = useState(false), [show, setShow] = useState(false);
  const left = ltr || !RTL;
  return (
    <View style={{ gap: 8 }}>
      {label ? <T style={{ fontSize: 15, fontWeight: '500' }}>{label}</T> : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, height: 58, paddingHorizontal: 16, borderRadius: 14, borderWidth: 1.5,
        borderColor: bad ? c.bad : good ? c.ok : focus ? c.text : c.line, backgroundColor: c.surface }}>
        <TextInput value={value} onChangeText={onChange} placeholder={placeholder ? tr(placeholder) : undefined} accessibilityLabel={tr(label || placeholder || '')} placeholderTextColor={c.faint}
          secureTextEntry={secure && !show} autoCapitalize="none" autoCorrect={false} autoFocus={first} onSubmitEditing={onSubmit} returnKeyType="go" {...auto}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ flex: 1, height: 54, fontSize: 17, color: c.text, fontFamily: (ltr && value) || !RTL ? DA_FONT : 'Vazirmatn-400',
            ...(left ? { textAlign: 'left' as const, direction: 'ltr' as const } : { textAlign: physicalAlign('right' as const) }),
            writingDirection: left ? 'ltr' : 'rtl', ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}) }} />
        {secure ? (
          <Pressable onPress={() => { tap(); setShow(!show); }} hitSlop={10} accessibilityLabel={tr(show ? 'پنهان کردن رمز' : 'نمایش رمز')}>
            <Icon name={show ? 'eyeSlash' : 'eye'} size={20} color={show ? c.text : c.faint} />
          </Pressable>
        ) : value ? (
          <Pressable onPress={() => { tap(); onChange(''); }} hitSlop={10} accessibilityLabel={tr('پاک کردن')}
            style={{ width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
            <Icon name="xmark" size={11} color={c.muted} weight="bold" />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

// One of a step's choices: a card with a picture (a flag) at the start, a name and a line under it, and a round mark
// at the end; the chosen one with a bright border and a filled mark.
export function ChoiceCard({ on, onPress, pic, name, note, raw }: { on: boolean; onPress: () => void; pic?: React.ReactNode; name: React.ReactNode; note?: string; raw?: boolean }) {
  const c = useColors();
  return (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="radio" accessibilityState={{ checked: on }}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1, flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16, paddingHorizontal: 16, borderRadius: 18, borderWidth: 1.5,
        borderColor: on ? c.text : c.line, backgroundColor: c.surface })}>
      {pic ? <View style={{ borderRadius: 5, overflow: 'hidden' }}>{pic}</View> : null}
      <View style={{ flex: 1, gap: 2 }}>
        {typeof name === 'string' ? <L style={{ fontSize: 18, lineHeight: 25, fontWeight: '700', color: c.text, textAlign: physicalAlign(RTL ? 'right' : 'left') }}>{name}</L> : name}
        {note ? <T raw={raw} style={{ fontSize: 13, lineHeight: 20, color: c.muted }}>{note}</T> : null}
      </View>
      <View style={{ width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 2,
        borderColor: on ? c.text : c.faint, backgroundColor: on ? c.text : 'transparent' }}>
        {on ? <Icon name="check" size={13} color={c.bg} weight="bold" /> : null}
      </View>
    </Pressable>
  );
}

export function FlagDK() {
  return (
    <Svg width={40} height={30} viewBox="0 0 37 28">
      <Rect width={37} height={28} rx={4} fill="#C8102E" />
      <Rect x={12} width={4} height={28} fill="#fff" />
      <Rect y={12} width={37} height={4} fill="#fff" />
    </Svg>
  );
}
export function FlagGB() {
  return (
    <Svg width={40} height={30} viewBox="0 0 60 45">
      <Defs><ClipPath id="gb"><Rect width={60} height={45} rx={6} /></ClipPath></Defs>
      <Rect width={60} height={45} rx={6} fill="#012169" />
      <Path d="M0 0L60 45M60 0L0 45" stroke="#fff" strokeWidth={9} clipPath="url(#gb)" />
      <Path d="M0 0L60 45M60 0L0 45" stroke="#C8102E" strokeWidth={3} clipPath="url(#gb)" />
      <Path d="M30 0V45M0 22.5H60" stroke="#fff" strokeWidth={13} />
      <Path d="M30 0V45M0 22.5H60" stroke="#C8102E" strokeWidth={7} />
    </Svg>
  );
}
// The questions' language, Danish (as in the real test) or English: its two cards and, on the main site, the tip that
// the translation's language is in the settings.
export const EXAM_LANGS = [
  { v: 'da' as const, Flag: FlagDK, name: 'Dansk', fa: 'دانمارکی', note: 'زبان آزمون رسمی؛ برای آمادگی کامل توصیه می‌شود' },
  { v: 'en' as const, Flag: FlagGB, name: 'English', fa: 'انگلیسی', note: 'اگر با انگلیسی راحت‌ترید' },
];
export function ExamLangChoice({ value, onChange }: { value: 'da' | 'en'; onChange: (v: 'da' | 'en') => void }) {
  const c = useColors();
  return (
    <View style={{ gap: 12 }} accessibilityRole="radiogroup">
      {EXAM_LANGS.map(({ v, Flag, name, fa, note }) => (
        <ChoiceCard key={v} on={value === v} onPress={() => onChange(v)} pic={<Flag />} note={note}
          name={<View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
            <L style={{ fontSize: 18, lineHeight: 25, fontWeight: '700', color: c.text }}>{name}</L>
            {RTL ? <T style={{ fontSize: 14, color: c.muted }}>{fa}</T> : null}
          </View>} />
      ))}
    </View>
  );
}
