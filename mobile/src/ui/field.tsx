// A text field whose name is its placeholder (no label above it), with an icon and, for passwords, a show / hide
// eye: the sign-in fields, also used on the account page.
import { useState } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';

import { Icon, type IconName } from './icon';
import { tap } from './kit';
import { DA_FONT, useColors, useIsDark } from './theme';

export function Field({ icon, label, value, onChange, secure, ltr, onSubmit }: {
  icon: IconName; label: string; value: string; onChange: (v: string) => void; secure?: boolean; ltr?: boolean; onSubmit?: () => void;
}) {
  const c = useColors(), dark = useIsDark();
  const [show, setShow] = useState(false), [focus, setFocus] = useState(false);
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, height: 54, borderRadius: 14, borderWidth: 1.5,
        borderColor: focus ? c.accent : dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
        backgroundColor: focus ? c.surface : dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.75)',
        ...(Platform.OS === 'web' ? { boxShadow: focus ? `0 0 0 4px ${c.accentSoft}` : '0 1px 2px rgba(0,0,0,.05)', transition: 'border-color .15s, box-shadow .15s, background-color .15s' } as any : {}) }}>
        <Icon name={icon} size={19} color={focus ? c.link : c.faint} />
        <TextInput value={value} onChangeText={onChange} secureTextEntry={secure && !show} autoCapitalize="none" autoCorrect={false}
          placeholder={label} accessibilityLabel={label} placeholderTextColor={c.muted} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          onSubmitEditing={onSubmit} returnKeyType={onSubmit ? 'go' : 'next'}
          style={{ flex: 1, height: 50, fontSize: 16, fontFamily: ltr && value ? DA_FONT : 'Vazirmatn-400', color: c.text, textAlign: ltr && value ? 'left' : 'right',
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

