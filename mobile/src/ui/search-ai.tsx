// «جستجو با هوش مصنوعی» on the «آموزش» page: the button beside the theme switch opens a large search box that slides
// down from the top of the screen (a short ease-out, like Uber's), over the page blurred behind it, with the user's
// earlier searches under the field; «جستجو» opens the results page (/search) with the closest signs, right-of-way
// items, rules and questions.
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Animated, Easing, Modal, Platform, Pressable, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { api } from '@/lib/api';
import { Icon } from './icon';
import { Button, HeroInk, T, tap } from './kit';
import { useColors, useIsDark } from './theme';

// The user's earlier searches, kept with the account (the server adds each search; newest first). Loaded once and
// shared by the search box and the results page; `add` puts a search first at once, `remove` drops one.
let HISTORY: string[] | null = null;
const listeners = new Set<(h: string[]) => void>();
const publish = (h: string[]) => { HISTORY = h; listeners.forEach(f => f(h)); };
export function useSearchHistory() {
  const [items, setItems] = useState<string[]>(HISTORY ?? []);
  useEffect(() => {
    listeners.add(setItems);
    if (HISTORY === null) api<{ items: string[] }>('GET', 'searchhistory').then(d => publish(d.items || [])).catch(() => {});
    return () => { listeners.delete(setItems); };
  }, []);
  return {
    items,
    add: (q: string) => { const t = q.trim(); if (t.length >= 2) publish([t, ...(HISTORY ?? []).filter(x => x !== t)].slice(0, 30)); },
    remove: (q: string) => { publish((HISTORY ?? []).filter(x => x !== q)); api('POST', 'searchhistory', { remove: q }).catch(() => {}); },
  };
}

// Letters folded so Persian / Arabic spellings and half-spaces compare alike.
const fold = (s: string) => s.toLowerCase().replace(/[يى]/g, 'ی').replace(/ك/g, 'ک').replace(/\u200c/g, ' ').replace(/\s+/g, ' ').trim();
// Earlier searches under the field: with nothing typed the latest three, else the ones containing what is typed.
// `boxed`: in a card of its own (on the results page, between the field and the results).
export function SearchHistoryList({ text, items, onPick, onRemove, max = 6, boxed }: { text: string; items: string[]; onPick: (q: string) => void; onRemove: (q: string) => void; max?: number; boxed?: boolean }) {
  const c = useColors();
  const t = fold(text);
  // Nothing typed: only the last three; from the first letter typed, the earlier searches containing it.
  const list = items.filter(x => (t ? fold(x).includes(t) && fold(x) !== t : true)).slice(0, t ? max : 3);
  if (!list.length) return null;
  return (
    <View style={[{ gap: 2 }, boxed ? { backgroundColor: c.surface, borderRadius: 14, borderWidth: 1, borderColor: c.line, padding: 8 } : null]}>
      <T style={{ color: c.faint, fontSize: 12, paddingHorizontal: 4, marginBottom: 2 }}>{t ? 'از جستجوهای قبلی شما' : 'جستجوهای اخیر'}</T>
      {list.map(x => (
        <Pressable key={x} onPress={() => { tap(); onPick(x); }} accessibilityRole="button"
          style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 9, paddingHorizontal: 8, borderRadius: 10, backgroundColor: pressed ? c.surface2 : 'transparent' })}>
          <Icon name="clock" size={16} color={c.faint} />
          <T style={{ flex: 1, fontSize: 14.5 }} numberOfLines={1}>{x}</T>
          <Pressable onPress={() => { tap(); onRemove(x); }} hitSlop={8} accessibilityLabel="حذف از جستجوهای قبلی"><Icon name="xmark" size={14} color={c.faint} /></Pressable>
        </Pressable>
      ))}
    </View>
  );
}

// The search field: large, with the magnifier inside it at the start. Its text is at least 16px: a smaller one makes
// iPhone Safari zoom the page in when it is focused, and the page stays zoomed after going back.
export function SearchField({ value, onChange, onSubmit, autoFocus, big, onFocus, onBlur }: { value: string; onChange: (v: string) => void; onSubmit: () => void; autoFocus?: boolean; big?: boolean;
  onFocus?: () => void; onBlur?: () => void }) {
  const c = useColors(), dark = useIsDark();
  const h = big ? 58 : 46;
  return (
    <View style={{ flex: 1, height: h, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, borderRadius: 14, borderWidth: 1.5, borderColor: c.line,
      backgroundColor: dark ? 'rgba(255,255,255,0.06)' : c.surface2 }}>
      <Icon name="searchAi" size={big ? 22 : 20} color={c.muted} />
      <TextInput value={value} onChangeText={v => onChange(v.slice(0, 200))} autoFocus={autoFocus} returnKeyType="search" onSubmitEditing={onSubmit} onFocus={onFocus} onBlur={onBlur}
        placeholder="چه چیزی را می‌خواهید پیدا کنید؟" placeholderTextColor={c.faint}
        style={[{ flex: 1, height: h - 4, color: c.text, fontSize: big ? 17 : 16, fontFamily: 'Vazirmatn-400', textAlign: 'right', writingDirection: 'rtl' },
          Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : null]} />
      {value ? <Pressable onPress={() => onChange('')} hitSlop={8} accessibilityLabel="پاک کردن"><Icon name="xmark" size={16} color={c.faint} /></Pressable> : null}
    </View>
  );
}

export function openSearch(q: string) {
  const t = q.trim();
  if (t.length >= 2) router.push({ pathname: '/search', params: { q: t } });
}

export function SearchAiButton() {
  const c = useColors(), dark = useIsDark(), ins = useSafeAreaInsets(), ink = useContext(HeroInk);
  const [open, setOpen] = useState(false), [q, setQ] = useState('');
  const history = useSearchHistory();
  // 0 → 1: the box slides down from above the screen and the blur fades in; back to 0 when it closes.
  const [v] = useState(() => new Animated.Value(0));
  useEffect(() => {
    if (open) Animated.timing(v, { toValue: 1, duration: 300, easing: Easing.bezier(0.2, 0.9, 0.3, 1), useNativeDriver: true }).start();
  }, [open, v]);
  const close = (then?: () => void) => Animated.timing(v, { toValue: 0, duration: 200, easing: Easing.in(Easing.quad), useNativeDriver: true }).start(() => { setOpen(false); then?.(); });
  const search = (text: string) => { if (text.trim().length < 2) return; history.add(text); close(() => openSearch(text)); };
  const go = () => search(q);
  return (
    <>
      <Pressable onPress={() => { tap(); v.setValue(0); setQ(''); setOpen(true); }} hitSlop={8} accessibilityRole="button" accessibilityLabel="جستجو با هوش مصنوعی"
        style={({ pressed }) => ({ width: 38, height: 38, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? (ink ? 'rgba(255,255,255,0.18)' : c.surface2) : 'transparent' })}>
        <Icon name="searchAi" size={20} color={ink ?? (dark ? c.text : c.muted)} />
      </Pressable>
      <Modal visible={open} transparent animationType="none" statusBarTranslucent onRequestClose={() => close()}>
        <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: v }}>
          <BlurView intensity={75} tint={dark ? 'dark' : 'light'} experimentalBlurMethod="dimezisBlurView" style={{ flex: 1 }}>
            <Pressable onPress={() => close()} style={{ flex: 1, backgroundColor: dark ? 'rgba(0,0,0,0.35)' : 'rgba(20,30,30,0.18)' }} accessibilityLabel="بستن" />
          </BlurView>
        </Animated.View>
        <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center',
          transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [-360, 0] }) }] }}>
          <View style={{ width: '100%', maxWidth: 680, backgroundColor: c.surface, borderBottomLeftRadius: 26, borderBottomRightRadius: 26,
            paddingTop: ins.top + (Platform.OS === 'web' ? 22 : 14), paddingBottom: 20, paddingHorizontal: 18, gap: 14,
            shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 24, shadowOffset: { width: 0, height: 10 }, elevation: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <T style={{ flex: 1, fontWeight: '700', fontSize: 20 }}>جستجو با هوش مصنوعی</T>
              <Pressable onPress={() => close()} hitSlop={10} accessibilityLabel="بستن"
                style={({ pressed }) => ({ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.line : c.surface2 })}>
                <Icon name="xmark" size={17} color={c.text} />
              </Pressable>
            </View>
            <View style={{ flexDirection: 'row' }}><SearchField value={q} onChange={setQ} onSubmit={go} autoFocus big /></View>
            {history.items.length ? <SearchHistoryList text={q} items={history.items} onPick={x => { setQ(x); search(x); }} onRemove={history.remove} />
              : <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 22 }}>مثلاً «پارک ممنوع»، «چه کسی در میدان اول می‌رود؟» یا «حد مجاز الکل».</T>}
            <Button kind="grey" big icon="searchAi" label="جستجو" onPress={go} disabled={q.trim().length < 2} />
          </View>
        </Animated.View>
      </Modal>
    </>
  );
}
