// «جستجو با هوش مصنوعی» on the «آموزش» page: the button beside the theme switch opens a box to write what you are looking
// for; «جستجو» opens the results page (/search) with the closest signs, right-of-way items, rules and questions.
import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, Platform, Pressable, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from './icon';
import { Button, T, tap } from './kit';
import { useColors, useIsDark } from './theme';

export const searchInputStyle = (c: ReturnType<typeof useColors>, dark: boolean) => ({
  flex: 1, height: 46, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1.5, borderColor: c.line, color: c.text, fontSize: 15,
  fontFamily: 'Vazirmatn-400', textAlign: 'right' as const, writingDirection: 'rtl' as const, backgroundColor: dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.85)',
});

export function openSearch(q: string) {
  const t = q.trim();
  if (t.length >= 2) router.push({ pathname: '/search', params: { q: t } });
}

export function SearchAiButton() {
  const c = useColors(), dark = useIsDark(), ins = useSafeAreaInsets();
  const [open, setOpen] = useState(false), [q, setQ] = useState('');
  const go = () => { if (q.trim().length < 2) return; setOpen(false); openSearch(q); };
  return (
    <>
      <Pressable onPress={() => { tap(); setOpen(true); }} hitSlop={8} accessibilityRole="button" accessibilityLabel="جستجو با هوش مصنوعی"
        style={({ pressed }) => ({ width: 38, height: 38, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.surface2 : 'transparent' })}>
        <Icon name="searchAi" size={20} color={dark ? c.text : c.muted} />
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable onPress={() => setOpen(false)} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', paddingTop: ins.top + (Platform.OS === 'web' ? 60 : 40), paddingHorizontal: 16 }}>
          <Pressable onPress={() => {}} style={{ width: '100%', maxWidth: 560, alignSelf: 'center', backgroundColor: c.surface, borderRadius: 18, padding: 16, gap: 12, borderWidth: 1, borderColor: c.line }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Icon name="searchAi" size={20} color={c.link} />
              <T style={{ flex: 1, fontWeight: '700', fontSize: 16 }}>جستجو با هوش مصنوعی</T>
              <Pressable onPress={() => setOpen(false)} hitSlop={8} accessibilityLabel="بستن"><Icon name="xmark" size={18} color={c.muted} /></Pressable>
            </View>
            <T style={{ color: c.muted, fontSize: 13, lineHeight: 21 }}>هر چه می‌خواهید بنویسید، مثلاً «پارک ممنوع»، «چه کسی در میدان اول می‌رود؟» یا «حد مجاز الکل».</T>
            <TextInput value={q} onChangeText={v => setQ(v.slice(0, 200))} autoFocus returnKeyType="search" onSubmitEditing={go}
              placeholder="چه چیزی را می‌خواهید پیدا کنید؟" placeholderTextColor={c.faint} style={searchInputStyle(c, dark)} />
            <Button kind="grey" icon="searchAi" label="جستجو" onPress={go} disabled={q.trim().length < 2} />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
