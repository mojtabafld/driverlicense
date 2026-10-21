// «واژه‌نامه‌ی آزمون»: the Danish words of the theory test (lib/glossary.ts), each on its own card with its meaning in
// the app's language, the meaning in another language under it, and (where it has one) a line on what the test expects,
// in the app's language. A field on top filters them by any of their words, chips by group, and «همه / نشان‌شده‌ها»
// switches to the terms the user bookmarked (the bookmark on each card; kept on the account). ?q= fills the field (a
// term tapped under a course step). Made more modern with groups and bookmarks (Mojtaba 2026-10-20).
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, TextInput, View } from 'react-native';

import { RTL, UI_LANG, getTransLang, tr } from '@/lib/i18n';
import { GLOSSARY, TERM_CATS, searchTerms, type Term, type TermCat } from '@/lib/glossary';
import { toPremium, useFree } from '@/lib/free';
import { faNum } from '@/lib/logic';
import { localSearch, type SearchItem, type SearchKind } from '@/lib/search';
import { useApp, useExamLang } from '@/lib/store';
import { Icon } from '@/ui/icon';
import { ArcButton, Card, Segmented, T, physicalAlign, tap } from '@/ui/kit';
import { Sheet, SheetScroll } from '@/ui/sheet';
import { SubPage } from '@/ui/sub-page';
import { NoSwipe } from '@/ui/swipe';
import { DA_FONT, radius, useColors } from '@/ui/theme';

const NOTE_OF = { fa: 0, en: 1, da: 2 } as const;
// The word itself in the exam's language (Danish, or English when the questions are in English; Mojtaba 2026-10-20),
// under it its meaning in the app's language (in an English or Danish app taking the exam in English, the Danish word,
// which the English one stands for), then the one in the translation language of the settings («زبان ترجمه»), unless
// it would repeat a line above (Mojtaba 2026-10-20).
const headOf = (t: Term, en: boolean) => (en ? t.en : t.da);
const mainOf = (t: Term, en: boolean) => (UI_LANG === 'fa' ? t.fa : en ? t.da : t.en);
const otherOf = (t: Term, en: boolean) => {
  const l = getTransLang(), v = l === 'fa' ? t.fa : l === 'en' ? t.en : t.da;
  return v !== mainOf(t, en) && v !== headOf(t, en) ? { v, fa: l === 'fa' } : null;
};
// The learning page a term is taught on (Mojtaba 2026-10-20): the learning pages' search (lib/search.ts) for its Danish
// word, else the start of its Persian meaning, the kind of page its group suggests first (right of way, a sign, a rule
// or a lesson of the course), else the best hit; none, and the search page opens with the word.
const PREFER: Record<TermCat, SearchKind[]> = {
  priority: ['priority', 'lesson', 'rule'], signs: ['sign', 'rule', 'lesson'], roads: ['lesson', 'rule', 'priority'],
  driving: ['rule', 'lesson'], vehicle: ['rule', 'lesson'], safety: ['rule', 'lesson'], people: ['lesson', 'rule', 'priority'],
};
function pageOf(t: Term): SearchItem | null {
  for (const q of [t.da, t.fa.split(' (')[0]]) {
    const hits = localSearch(q, 30);
    for (const k of PREFER[t.cat]) { const h = hits.find(x => x.kind === k); if (h) return h; }
    if (hits[0]) return hits[0];
  }
  return null;
}
const CAT = Object.fromEntries(TERM_CATS.map(g => [g.id, g])) as Record<TermCat, (typeof TERM_CATS)[number]>;

// A tapped term (Mojtaba 2026-10-21): its lesson in a sheet from the bottom, closed with a drag down back to the list:
// the term and its meaning, the part of the learning pages that teaches it (its title, place and text, in the app's
// language), and a button to that page. A locked page: the premium page instead of its text.
function TermSheet({ t, en, onClose }: { t: Term | null; en: boolean; onClose: () => void }) {
  const c = useColors();
  const { lessonOk, firstOk } = useFree();
  const page = useMemo(() => (t ? pageOf(t) : null), [t]);
  // Kept while the sheet slides out after it closes.
  const [last, setLast] = useState<Term | null>(t);
  if (t && t !== last) setLast(t);
  const x = t ?? last;
  if (!x) return null;
  const ok = !page || (page.free === 'lesson' ? lessonOk(page.lesson) : typeof page.free === 'number' ? firstOk(page.free) : true);
  const g = CAT[x.cat], note = x.note ? x.note[NOTE_OF[UI_LANG]] : null, main = mainOf(x, en);
  const parts = page ? page.shown?.body ?? page.text.split(' | ').map(s => s.trim()).filter(Boolean) : [];
  const go = () => { onClose(); if (!page) router.push({ pathname: '/course-search', params: { q: x.da } }); else if (!ok) toPremium(); else router.push(page.href); };
  return (
    <Sheet open={!!t} onClose={onClose} maxHeight="86%">
      <View style={{ gap: 4, paddingHorizontal: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Icon name={g.icon} size={14} color={c.link} />
          <T style={{ fontSize: 12.5, fontWeight: '600', color: c.link }}>{g.fa}</T>
        </View>
        <T raw keepDa style={{ fontFamily: DA_FONT, fontSize: 22, lineHeight: 30, fontWeight: '700', writingDirection: 'ltr', textAlign: physicalAlign(RTL ? 'right' : 'left') }}>{headOf(x, en)}</T>
        <T raw keepDa style={[{ fontSize: 15, lineHeight: 24, fontWeight: '600', color: c.muted }, main === x.da ? { fontFamily: DA_FONT, writingDirection: 'ltr', textAlign: physicalAlign(RTL ? 'right' : 'left') } : null]}>{main}</T>
      </View>
      <SheetScroll style={{ marginTop: -4 }} contentContainerStyle={{ gap: 10, paddingTop: 4, paddingBottom: 8, paddingHorizontal: 4 }}>
        {note ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 12, borderRadius: 14, backgroundColor: c.surface2 }}>
            <Icon name="info" size={16} color={c.muted} />
            <T raw keepDa={!en} style={{ flex: 1, fontSize: 14, lineHeight: 23, color: c.muted }}>{note}</T>
          </View>
        ) : null}
        {page ? <>
          <View style={{ gap: 2, marginTop: 4 }}>
            <T raw style={{ fontSize: 16, lineHeight: 25, fontWeight: '700' }}>{page.shown?.title ?? page.title}</T>
            <T raw style={{ fontSize: 12.5, lineHeight: 19, color: c.faint }}>{page.shown?.where ?? page.where}</T>
          </View>
          {ok ? parts.map((s, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 10, padding: 12, borderRadius: 14, backgroundColor: c.surface2 }}>
              <Icon name="checkCircle" size={16} color={c.link} />
              <T raw keepDa={x.cat === 'signs' && i === 0} style={{ flex: 1, fontSize: 14.5, lineHeight: 24 }}>{s}</T>
            </View>
          )) : (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 14, backgroundColor: c.surface2 }}>
              <Icon name="lock" size={16} color={c.muted} />
              <T style={{ flex: 1, fontSize: 14, lineHeight: 23, color: c.muted }}>این آموزش مخصوص نسخه‌ی ویژه است.</T>
            </View>
          )}
        </> : null}
      </SheetScroll>
      <ArcButton label={!page ? 'جستجو در آموزش' : ok ? 'باز کردن آموزش کامل' : 'نسخه‌ی ویژه'} icon={!page ? 'search' : ok ? 'learn' : 'sparkles'} onPress={go} />
    </Sheet>
  );
}

function TermCard({ t, on, onToggle, en, onOpen }: { t: Term; on: boolean; onToggle: () => void; en: boolean; onOpen: () => void }) {
  const c = useColors();
  const open = () => { tap(); onOpen(); };
  const g = CAT[t.cat], note = t.note ? t.note[NOTE_OF[UI_LANG]] : null, other = otherOf(t, en), main = mainOf(t, en);
  return (
    <Card onPress={open} style={{ gap: 10, padding: 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
        <View style={{ flex: 1, gap: 3 }}>
          <T raw keepDa style={{ fontFamily: DA_FONT, fontSize: 18, lineHeight: 25, fontWeight: '700', writingDirection: 'ltr', textAlign: physicalAlign(RTL ? 'right' : 'left') }}>{headOf(t, en)}</T>
          <T raw keepDa style={[{ fontSize: 14.5, lineHeight: 23, fontWeight: '600', color: c.link }, main === t.da ? { fontFamily: DA_FONT, writingDirection: 'ltr', textAlign: physicalAlign(RTL ? 'right' : 'left') } : null]}>{main}</T>
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
          <T raw keepDa={!en} style={{ flex: 1, fontSize: 13, lineHeight: 21, color: c.muted }}>{note}</T>
        </View>
      ) : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Icon name={g.icon} size={12} color={c.faint} />
        <T style={{ flex: 1, fontSize: 11.5, color: c.faint }}>{g.fa}</T>
        <Icon name="chevronLeft" size={12} color={c.faint} weight="semibold" />
      </View>
    </Card>
  );
}

export default function Glossary() {
  const c = useColors();
  const p = useLocalSearchParams<{ q?: string }>();
  const { terms, toggleTerm } = useApp();
  const en = useExamLang() === 'en';
  const [q, setQ] = useState(String(p.q || ''));
  const [tab, setTab] = useState<'all' | 'saved'>('all');
  const [cat, setCat] = useState<TermCat | null>(null);
  const [sel, setSel] = useState<Term | null>(null); // the term whose lesson is open in the sheet
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
      {list.map(t => <TermCard key={t.da} t={t} en={en} on={terms.includes(t.da)} onToggle={() => { toggleTerm(t.da).catch(() => {}); }} onOpen={() => setSel(t)} />)}
      {list.length ? null : (
        <Card style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 14 }}>
          <Icon name={tab === 'saved' && !terms.length ? 'bookmark' : 'search'} size={17} color={c.muted} />
          <T style={{ flex: 1, color: c.muted, fontSize: 13.5, lineHeight: 22 }}>{tab === 'saved' && !terms.length
            ? 'هنوز اصطلاحی را نشان نکرده‌اید. با دکمه‌ی نشان روی هر اصطلاح، آن را اینجا نگه دارید.'
            : 'اصطلاحی پیدا نشد.'}</T>
        </Card>
      )}
      <View style={{ height: 40 }} />
      <TermSheet t={sel} en={en} onClose={() => setSel(null)} />
    </SubPage>
  );
}
