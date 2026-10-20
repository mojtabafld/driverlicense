// «واژه‌نامه‌ی آزمون»: the Danish words of the theory test (lib/glossary.ts), each on its own card with its meaning in
// the app's language, the meaning in another language under it, and (where it has one) a line on what the test expects,
// in the app's language. A field on top filters them by any of their words, chips by group, and «همه / نشان‌شده‌ها»
// switches to the terms the user bookmarked (the bookmark on each card; kept on the account). ?q= fills the field (a
// term tapped under a course step). Made more modern with groups and bookmarks (Mojtaba 2026-10-20).
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, TextInput, View } from 'react-native';

import { RTL, UI_LANG, getTransLang, tr } from '@/lib/i18n';
import { GLOSSARY, TERM_CATS, searchTerms, type Term, type TermCat } from '@/lib/glossary';
import { faNum } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { Icon } from '@/ui/icon';
import { Card, Segmented, T, physicalAlign, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { NoSwipe } from '@/ui/swipe';
import { DA_FONT, radius, useColors } from '@/ui/theme';

const NOTE_OF = { fa: 0, en: 1, da: 2 } as const;
// The meaning in the app's language first (English in a Danish app); under it the one in the translation language of
// the settings («زبان ترجمه»), unless that is the same meaning or Danish, the term's own language (Mojtaba 2026-10-20).
const mainOf = (t: Term) => (UI_LANG === 'fa' ? t.fa : t.en);
const otherOf = (t: Term) => {
  const l = getTransLang(), v = l === 'fa' ? t.fa : l === 'en' ? t.en : null;
  return v && v !== mainOf(t) ? { v, fa: l === 'fa' } : null;
};
const CAT = Object.fromEntries(TERM_CATS.map(g => [g.id, g])) as Record<TermCat, (typeof TERM_CATS)[number]>;

function TermCard({ t, on, onToggle }: { t: Term; on: boolean; onToggle: () => void }) {
  const c = useColors();
  const g = CAT[t.cat], note = t.note ? t.note[NOTE_OF[UI_LANG]] : null, other = otherOf(t);
  return (
    <Card style={{ gap: 10, padding: 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
        <View style={{ flex: 1, gap: 3 }}>
          <T raw keepDa style={{ fontFamily: DA_FONT, fontSize: 18, lineHeight: 25, fontWeight: '700', writingDirection: 'ltr', textAlign: physicalAlign(RTL ? 'right' : 'left') }}>{t.da}</T>
          <T raw keepDa style={{ fontSize: 14.5, lineHeight: 23, fontWeight: '600', color: c.link }}>{mainOf(t)}</T>
          {other ? <T raw keepDa style={[{ fontSize: 12.5, lineHeight: 19, color: c.faint }, RTL ? { writingDirection: 'ltr', textAlign: physicalAlign('right') } : other.fa ? { fontFamily: 'Vazirmatn-400' } : null]}>{other.v}</T> : null}
        </View>
        <Pressable onPress={() => { tap(); onToggle(); }} hitSlop={8} accessibilityRole="button" accessibilityState={{ selected: on }}
          accessibilityLabel={tr(on ? 'برداشتن نشان' : 'نشان کردن')}
          style={({ pressed }) => ({ width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.7 : 1,
            backgroundColor: on ? c.accentSoft : c.surface2 })}>
          <Icon name="bookmark" size={18} filled={on} color={on ? c.link : c.muted} />
        </Pressable>
      </View>
      {note ? (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 10, borderRadius: 12, backgroundColor: c.surface2 }}>
          <Icon name="info" size={15} color={c.muted} />
          <T raw keepDa style={{ flex: 1, fontSize: 13, lineHeight: 21, color: c.muted }}>{note}</T>
        </View>
      ) : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Icon name={g.icon} size={12} color={c.faint} />
        <T style={{ fontSize: 11.5, color: c.faint }}>{g.fa}</T>
      </View>
    </Card>
  );
}

export default function Glossary() {
  const c = useColors();
  const p = useLocalSearchParams<{ q?: string }>();
  const { terms, toggleTerm } = useApp();
  const [q, setQ] = useState(String(p.q || ''));
  const [tab, setTab] = useState<'all' | 'saved'>('all');
  const [cat, setCat] = useState<TermCat | null>(null);
  // The bookmarked ones in the order they were saved (newest first); the rest in the glossary's order.
  const base = tab === 'saved' ? terms.map(da => GLOSSARY.find(t => t.da === da)).filter((t): t is Term => !!t) : GLOSSARY;
  const list = searchTerms(q, cat ? base.filter(t => t.cat === cat) : base);
  const count = (id: TermCat) => base.filter(t => t.cat === id).length;
  const chip = (id: TermCat | null, label: string, n: number, icon?: (typeof TERM_CATS)[number]['icon']) => {
    const on = cat === id;
    return (
      <Pressable key={id ?? 'all'} onPress={() => { tap(); setCat(id); }} accessibilityRole="button" accessibilityState={{ selected: on }}
        style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1, flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 7, paddingHorizontal: 12,
          borderRadius: radius.pill, borderWidth: 1, borderColor: on ? c.accent : c.line, backgroundColor: on ? c.accentSoft : c.surface })}>
        {icon ? <Icon name={icon} size={14} color={on ? c.link : c.muted} /> : null}
        <T style={{ fontSize: 13, fontWeight: '600', color: on ? c.link : c.text }} numberOfLines={1}>{label}</T>
        <T style={{ fontSize: 11.5, fontWeight: '700', color: on ? c.link : c.faint }}>{faNum(n)}</T>
      </Pressable>
    );
  };
  return (
    <SubPage title="واژه‌نامه‌ی آزمون" subtitle="اصطلاح‌های دانمارکی آزمون تئوری">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, height: 50, borderRadius: 14, borderWidth: 1, borderColor: c.line, backgroundColor: c.surface }}>
        <Icon name="search" size={18} color={c.faint} />
        <TextInput value={q} onChangeText={v => setQ(v.slice(0, 60))} placeholder={tr('یک کلمه بنویسید، دانمارکی یا فارسی')} placeholderTextColor={c.muted}
          accessibilityLabel={tr('جستجو در واژه‌نامه')} autoCapitalize="none" autoCorrect={false}
          style={{ flex: 1, height: 46, fontSize: 16, color: c.text, fontFamily: RTL ? 'Vazirmatn-400' : undefined, textAlign: physicalAlign(RTL ? 'right' : 'left'),
            writingDirection: RTL ? 'rtl' : 'ltr', ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}) }} />
        {q ? <Pressable onPress={() => { tap(); setQ(''); }} hitSlop={8} accessibilityLabel={tr('پاک کردن')}><Icon name="xmark" size={16} color={c.faint} /></Pressable> : null}
      </View>
      <Segmented value={tab} onChange={v => { setTab(v); setCat(null); }}
        options={[{ value: 'all', label: 'همه' }, { value: 'saved', label: `نشان‌شده‌ها (${faNum(terms.length)})` }]} />
      {/* The groups, in a row that scrolls sideways, each with how many terms it has in the list shown; a swipe on it
          scrolls it and does not go back (NoSwipe). */}
      <NoSwipe>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingVertical: 2 }}>
          {chip(null, 'همه‌ی گروه‌ها', base.length)}
          {TERM_CATS.filter(g => count(g.id)).map(g => chip(g.id, g.fa, count(g.id), g.icon))}
        </ScrollView>
      </NoSwipe>
      <T style={{ color: c.muted, fontSize: 12.5 }}>{faNum(list.length)} اصطلاح</T>
      {list.map(t => <TermCard key={t.da} t={t} on={terms.includes(t.da)} onToggle={() => { toggleTerm(t.da).catch(() => {}); }} />)}
      {list.length ? null : (
        <Card style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 14 }}>
          <Icon name={tab === 'saved' && !terms.length ? 'bookmark' : 'search'} size={17} color={c.muted} />
          <T style={{ flex: 1, color: c.muted, fontSize: 13.5, lineHeight: 22 }}>{tab === 'saved' && !terms.length
            ? 'هنوز اصطلاحی را نشان نکرده‌اید. با دکمه‌ی نشان روی هر اصطلاح، آن را اینجا نگه دارید.'
            : 'اصطلاحی پیدا نشد.'}</T>
        </Card>
      )}
      <View style={{ height: 40 }} />
    </SubPage>
  );
}
