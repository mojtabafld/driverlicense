// «جستجو در آموزش» (from the search box on the «آموزش» tab and at the top of «آموزش گام‌به‌گام»): the user types
// words and the entries holding all of them show at once (lib/search.ts localSearch: the course's teaching steps, the
// rules, the road signs and the right-of-way situations), best match first. Search is by the app's own words only, no
// AI. A result opens its page (a locked one, the premium page, as everywhere).
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';

import { RTL, tr } from '@/lib/i18n';
import { toPremium, useFree } from '@/lib/free';
import { ASK_ON, localSearch, type SearchItem, type SearchKind } from '@/lib/search';
import { Icon, type IconName } from '@/ui/icon';
import { Card, Enter, T, physicalAlign, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors, useIsDark } from '@/ui/theme';

const KIND: Record<SearchKind, { icon: IconName; label: string }> = {
  lesson: { icon: 'learn', label: 'درس دوره' },
  rule: { icon: 'rules', label: 'قانون' },
  sign: { icon: 'sign', label: 'تابلو' },
  priority: { icon: 'priority', label: 'حق تقدم' },
};
// Short words that the search finds (it looks for all the words typed, so short phrases work best).
const EXAMPLES = ['حق تقدم', 'حد سرعت', 'B 11', 'الکل', 'صندلی کودک', 'میدان'];

export function Row({ item }: { item: SearchItem }) {
  const c = useColors();
  const { lessonOk, firstOk } = useFree();
  const ok = item.free === 'lesson' ? lessonOk(item.lesson) : typeof item.free === 'number' ? firstOk(item.free) : true;
  const k = KIND[item.kind];
  return (
    <Pressable onPress={() => { tap(); if (!ok) return toPremium(); router.push(item.href); }} accessibilityRole="button" accessibilityLabel={item.shown?.title ?? item.title}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 11, paddingHorizontal: 12, borderRadius: 14, opacity: ok ? (pressed ? 0.7 : 1) : 0.55 })}>
      <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: c.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={k.icon} size={19} color={c.link} />
      </View>
      <View style={{ flex: 1, gap: 1 }}>
        {/* In the app's language (lib/search.ts `shown`; Persian as written). */}
        <T raw style={{ fontSize: 14.5, lineHeight: 22, fontWeight: '600' }} numberOfLines={2}>{item.shown?.title ?? item.title}</T>
        <T style={{ fontSize: 12, lineHeight: 18, color: c.muted }} numberOfLines={1}>{tr(k.label)}: <T raw style={{ fontSize: 12, lineHeight: 18, color: c.muted }}>{item.shown?.where ?? item.where}</T></T>
      </View>
      <Icon name={ok ? 'chevronLeft' : 'lock'} size={14} color={c.faint} />
    </Pressable>
  );
}

function List({ items }: { items: SearchItem[] }) {
  const c = useColors();
  return (
    <Card style={{ padding: 4, gap: 0 }}>
      {items.map((x, i) => (
        <View key={x.id}>
          {i ? <View style={{ height: 1, backgroundColor: c.line, marginHorizontal: 12, opacity: 0.6 }} /> : null}
          <Row item={x} />
        </View>
      ))}
    </Card>
  );
}

export default function CourseSearch() {
  const c = useColors(), dark = useIsDark();
  const p = useLocalSearchParams<{ q?: string }>();
  const [q, setQ] = useState(String(p.q || ''));
  const [focus, setFocus] = useState(false);
  const results = localSearch(q);
  const typed = q.trim().length >= 2 || /\d/.test(q);
  return (
    <SubPage title="جستجو در آموزش" subtitle="درس‌ها، قوانین، تابلوها و حق تقدم">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingStart: 14, paddingEnd: 6, height: 56, borderRadius: 16, borderWidth: 1.5,
        borderColor: focus ? c.accent : dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', backgroundColor: c.surface,
        ...(Platform.OS === 'web' ? { boxShadow: focus ? `0 0 0 4px ${c.accentSoft}` : '0 1px 2px rgba(0,0,0,.05)' } as any : {}) }}>
        <Icon name="search" size={20} color={focus ? c.link : c.faint} />
        <TextInput value={q} onChangeText={v => setQ(v.slice(0, 200))} autoFocus={!p.q} returnKeyType="search"
          placeholder={tr('مثلاً: حق تقدم در میدان')} placeholderTextColor={c.muted} accessibilityLabel={tr('جستجو در آموزش')}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ flex: 1, height: 52, fontSize: 16, color: c.text, fontFamily: RTL ? 'Vazirmatn-400' : undefined, textAlign: physicalAlign(RTL ? 'right' : 'left'),
            writingDirection: RTL ? 'rtl' : 'ltr', ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}) }} />
        {q ? (
          <Pressable onPress={() => { tap(); setQ(''); }} hitSlop={8} accessibilityLabel={tr('پاک کردن')} style={{ padding: 6 }}>
            <Icon name="xmark" size={16} color={c.faint} />
          </Pressable>
        ) : null}
      </View>

      {!typed ? (
        <Enter>
          <View style={{ gap: 10 }}>
            <T style={{ color: c.muted, fontSize: 13, lineHeight: 21 }}>چند کلمه بنویسید؛ درس‌ها، قوانین، تابلوها و موقعیت‌های حق تقدمی که همه‌ی آن کلمه‌ها را دارند همین‌جا نمایش داده می‌شوند.</T>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {EXAMPLES.map(tr).map(e => (
                <Pressable key={e} onPress={() => { tap(); setQ(e); }} style={({ pressed }) => ({ paddingHorizontal: 12, paddingVertical: 7, borderRadius: 99, backgroundColor: c.surface2, opacity: pressed ? 0.7 : 1 })}>
                  <T raw style={{ fontSize: 13, color: c.text }}>{e}</T>
                </Pressable>
              ))}
            </View>
          </View>
        </Enter>
      ) : results.length ? (
        <View style={{ gap: 8 }}>
          <T style={{ fontWeight: '800', fontSize: 15 }}>نتیجه‌ها</T>
          <List items={results} />
        </View>
      ) : (
        <Card style={{ gap: 6, alignItems: 'center' }}>
          <T style={{ color: c.muted, fontSize: 13.5, textAlign: 'center', lineHeight: 21 }}>چیزی با این کلمه‌ها پیدا نشد. کلمه‌های کمتر یا کوتاه‌تری امتحان کنید.</T>
        </Card>
      )}
      {/* A question rather than words: the coach answers it (app/ask.tsx). */}
      {ASK_ON ? <Pressable onPress={() => { tap(); router.push({ pathname: '/ask', params: typed ? { q } : {} }); }} accessibilityRole="button"
        style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 14, backgroundColor: c.accentSoft, opacity: pressed ? 0.7 : 1 })}>
        <Icon name="sparkles" size={18} color={c.link} />
        <T style={{ flex: 1, fontSize: 13.5, lineHeight: 21, color: c.link, fontWeight: '600' }}>سؤال دارید؟ از مربی بپرسید</T>
        <Icon name="chevronLeft" size={14} color={c.link} />
      </Pressable> : null}
      <View style={{ height: 40 }} />
    </SubPage>
  );
}
