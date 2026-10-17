// A 6-digit code in six separate boxes (the forgotten-password code). One real field lies over the boxes, so the
// phone's keyboard can offer a code it read from a notification or an email (iOS «From Mail», Android «one-time code»
// suggestions) and a tap fills all six at once; pasting a whole code works too. Digits are shown left to right.
import { useRef, useState } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';

import { tr } from '@/lib/i18n';
import { L, tap } from './kit';
import { useColors, useIsDark } from './theme';

const N = 6;
// Persian / Arabic digits typed on a Persian keyboard count as their Latin ones.
const digits = (s: string) => s.replace(/[\u06F0-\u06F9\u0660-\u0669]/g, d => { const n = d.charCodeAt(0); return String(n >= 0x06F0 ? n - 0x06F0 : n - 0x0660); }).replace(/\D/g, '').slice(0, N);

export function CodeBoxes({ value, onChange, onDone, bad }: { value: string; onChange: (v: string) => void; onDone?: (v: string) => void; bad?: boolean }) {
  const c = useColors(), dark = useIsDark();
  const ref = useRef<TextInput>(null);
  const [focus, setFocus] = useState(false);
  const change = (s: string) => { const v = digits(s); onChange(v); if (v.length === N) onDone?.(v); };
  return (
    <Pressable onPress={() => { tap(); ref.current?.focus(); }} accessibilityRole="none" style={{ direction: 'ltr' } as any}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8, direction: 'ltr' } as any}>
        {Array.from({ length: N }, (_, i) => {
          const on = focus && (i === value.length || (i === N - 1 && value.length === N));
          return (
            <View key={i} style={{ flex: 1, maxWidth: 56, height: 58, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5,
              borderColor: bad ? c.bad : on ? c.accent : dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
              backgroundColor: on ? c.surface : dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.75)',
              ...(Platform.OS === 'web' ? { boxShadow: on ? `0 0 0 4px ${c.accentSoft}` : '0 1px 2px rgba(0,0,0,.05)', transition: 'border-color .15s, box-shadow .15s' } as any : {}) }}>
              <L style={{ fontSize: 24, lineHeight: 30, fontWeight: '700', color: c.text }}>{value[i] ?? ''}</L>
            </View>
          );
        })}
      </View>
      {/* The real field: over the boxes, invisible, taking the whole code. */}
      <TextInput ref={ref} value={value} onChangeText={change} autoFocus maxLength={N} keyboardType="number-pad" inputMode="numeric"
        textContentType="oneTimeCode" autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'} caretHidden
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} accessibilityLabel={tr('کد ۶ رقمی')}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.011, color: 'transparent', fontSize: 16,
          ...(Platform.OS === 'web' ? { outlineStyle: 'none', caretColor: 'transparent', letterSpacing: 40 } as any : {}) }} />
    </Pressable>
  );
}
