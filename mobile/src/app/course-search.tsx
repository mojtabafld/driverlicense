// «جستجو در آموزش» (from the search box of «آموزش گام‌به‌گام»): the user types what they want to learn, in their own
// words. While typing, the entries holding those words show at once (lib/search.ts localSearch: the course's
// teaching steps, the rules, the road signs and the right-of-way situations). «جستجو» (or the keyboard's search key)
// also asks the AI (/api/coursesearch, search.js): a short answer written from the app's own material, and the
// entries that answer the question best, on top. Without premium the AI part shows a lock that opens the premium
// page; the word search stays free. A result opens its page (a locked one, the premium page, as everywhere).
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, TextInput, View } from 'react-native';

import { api, ApiError } from '@/lib/api';
import { RTL, tr, UI_LANG } from '@/lib/i18n';
import { toPremium, useFree } from '@/lib/free';
import { AI_CATALOG, localSearch, searchItem, type SearchItem, type SearchKind } from '@/lib/search';
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
const EXAMPLES = ['چه کسی در تقاطع بدون تابلو حق تقدم دارد؟', 'حد سرعت در بزرگراه', 'B 11', 'حد مجاز الکل', 'صندلی کودک'];

// The server's hash of the catalogue, once it has it: later searches send only that.
let catalogV: string | null = null;
type Ai = { q: string; state: 'busy' | 'done' | 'locked' | 'off' | 'error'; answer?: string; ids?: string[]; error?: string };

async function askAi(q: string): Promise<{ answer: string; results: string[] }> {
  const send = (full: boolean) => api<{ answer: string; results: string[]; v: string }>('POST', 'coursesearch',
    full || !catalogV ? { q, ui: UI_LANG, catalog: AI_CATALOG } : { q, ui: UI_LANG, v: catalogV });
  let r;
  try { r = await send(false); } catch (e) {
    if (e instanceof ApiError && e.status === 409) r = await send(true); else throw e;
  }
  catalogV = r.v;
  return r;
}

function Row({ item }: { item: SearchItem }) {
  const c = useColors();
  const { lessonOk, firstOk } = useFree();
  const ok = item.free === 'lesson' ? lessonOk(item.lesson) : typeof item.free === 'number' ? firstOk(item.free) : true;
  const k = KIND[item.kind];
  return (
    <Pressable onPress={() => { tap(); if (!ok) return toPremium(); router.push(item.href); }} accessibilityRole="button" accessibilityLabel={item.title}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 11, paddingHorizontal: 12, borderRadius: 14, opacity: ok ? (pressed ? 0.7 : 1) : 0.55 })}>
      <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: c.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={k.icon} size={19} color={c.link} />
      </View>
      <View style={{ flex: 1, gap: 1 }}>
        <T raw style={{ fontSize: 14.5, lineHeight: 22, fontWeight: '600' }} numberOfLines={2}>{item.title}</T>
        <T style={{ fontSize: 12, lineHeight: 18, color: c.muted }} numberOfLines={1}>{tr(k.label)}: <T raw style={{ fontSize: 12, lineHeight: 18, color: c.muted }}>{item.where}</T></T>
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
  const [ai, setAi] = useState<Ai | null>(null);
  const asked = useRef('');
  const local = localSearch(q);
  const go = (text = q) => {
    const s = text.trim();
    if (s.length < 2 || (asked.current === s && ai && ai.state !== 'error')) return;
    tap(); asked.current = s;
    setAi({ q: s, state: 'busy' });
    askAi(s).then(r => { if (asked.current === s) setAi({ q: s, state: 'done', answer: r.answer, ids: r.results }); })
      .catch(e => {
        if (asked.current !== s) return;
        const status = e instanceof ApiError ? e.status : 0;
        setAi({ q: s, state: status === 402 ? 'locked' : status === 503 ? 'off' : 'error', error: e instanceof Error ? e.message : undefined });
      });
  };
  useEffect(() => { if (p.q) go(String(p.q)); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const aiItems = ai?.state === 'done' ? (ai.ids ?? []).map(searchItem).filter((x): x is SearchItem => !!x) : [];
  const shownAi = new Set(aiItems.map(x => x.id));
  const rest = local.filter(x => !shownAi.has(x.id));
  const typed = q.trim().length >= 2;
  return (
    <SubPage title="جستجو در آموزش" subtitle="هر چه می‌خواهید یاد بگیرید، بپرسید">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingStart: 14, paddingEnd: 6, height: 56, borderRadius: 16, borderWidth: 1.5,
        borderColor: focus ? c.accent : dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', backgroundColor: c.surface,
        ...(Platform.OS === 'web' ? { boxShadow: focus ? `0 0 0 4px ${c.accentSoft}` : '0 1px 2px rgba(0,0,0,.05)' } as any : {}) }}>
        <Icon name="search" size={20} color={focus ? c.link : c.faint} />
        <TextInput value={q} onChangeText={v => setQ(v.slice(0, 200))} autoFocus={!p.q} returnKeyType="search" onSubmitEditing={() => go()}
          placeholder={tr('مثلاً: چه کسی در میدان حق تقدم دارد؟')} placeholderTextColor={c.muted} accessibilityLabel={tr('جستجو در آموزش')}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ flex: 1, height: 52, fontSize: 15.5, color: c.text, fontFamily: RTL ? 'Vazirmatn-400' : undefined, textAlign: physicalAlign(RTL ? 'right' : 'left'),
            writingDirection: RTL ? 'rtl' : 'ltr', ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}) }} />
        {q ? (
          <Pressable onPress={() => { tap(); setQ(''); setAi(null); asked.current = ''; }} hitSlop={8} accessibilityLabel={tr('پاک کردن')} style={{ padding: 6 }}>
            <Icon name="xmark" size={16} color={c.faint} />
          </Pressable>
        ) : null}
        <Pressable onPress={() => go()} disabled={!typed} accessibilityRole="button" accessibilityLabel={tr('جستجوی هوشمند')}
          style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 5, height: 42, paddingHorizontal: 12, borderRadius: 12, backgroundColor: c.cta, opacity: !typed ? 0.4 : pressed ? 0.8 : 1 })}>
          <Icon name="sparkles" size={16} color={c.ctaFg} />
          <T style={{ color: c.ctaFg, fontSize: 13.5, fontWeight: '700' }}>جستجو</T>
        </Pressable>
      </View>

      {!typed ? (
        <Enter>
          <View style={{ gap: 10 }}>
            <T style={{ color: c.muted, fontSize: 13, lineHeight: 21 }}>سؤالتان را با کلمه‌های خودتان بنویسید؛ هوش مصنوعی از درس‌ها، قوانین و تابلوهای برنامه جواب کوتاه و صفحه‌های مربوط را پیدا می‌کند.</T>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {EXAMPLES.map(tr).map(e => (
                <Pressable key={e} onPress={() => { setQ(e); go(e); }} style={({ pressed }) => ({ paddingHorizontal: 12, paddingVertical: 7, borderRadius: 99, backgroundColor: c.surface2, opacity: pressed ? 0.7 : 1 })}>
                  <T raw style={{ fontSize: 13, color: c.text }}>{e}</T>
                </Pressable>
              ))}
            </View>
          </View>
        </Enter>
      ) : null}

      {ai && typed ? (
        <Enter key={`${ai.q}-${ai.state}`}>
          <Card style={{ gap: 10, borderWidth: 1.5, borderColor: c.accentSoft }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Icon name="sparkles" size={18} color={c.link} />
              <T style={{ flex: 1, fontWeight: '800', fontSize: 15 }}>پاسخ هوشمند</T>
              {ai.state === 'busy' ? <ActivityIndicator size="small" color={c.link} /> : null}
            </View>
            {ai.state === 'busy' ? <T style={{ color: c.muted, fontSize: 13.5 }}>در حال گشتن در درس‌ها…</T> : null}
            {ai.state === 'locked' ? (
              <Pressable onPress={() => { tap(); toPremium(); }} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Icon name="lock" size={16} color={c.muted} />
                <T style={{ flex: 1, color: c.muted, fontSize: 13.5, lineHeight: 21 }}>جستجوی هوشمند مخصوص نسخه‌ی ویژه است. نتیجه‌های کلمه‌ای پایین را ببینید.</T>
              </Pressable>
            ) : null}
            {ai.state === 'off' || ai.state === 'error' ? (
              <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 21 }}>{ai.state === 'off' ? tr('جستجوی هوشمند الان در دسترس نیست.') : ai.error || tr('جستجوی هوشمند الان در دسترس نیست.')}</T>
            ) : null}
            {ai.state === 'done' ? (
              ai.answer || aiItems.length ? (
                <>
                  {ai.answer ? <T raw style={{ fontSize: 14.5, lineHeight: 25, textAlign: physicalAlign(UI_LANG === 'fa' ? 'right' : 'left'), writingDirection: UI_LANG === 'fa' ? 'rtl' : 'ltr' }}>{ai.answer}</T> : null}
                  {aiItems.length ? <View style={{ marginHorizontal: -12 }}>{aiItems.map(x => <Row key={x.id} item={x} />)}</View> : null}
                </>
              ) : <T style={{ color: c.muted, fontSize: 13.5 }}>در درس‌ها چیزی درباره‌ی این پیدا نشد.</T>
            ) : null}
          </Card>
        </Enter>
      ) : null}

      {typed ? (
        rest.length ? (
          <View style={{ gap: 8 }}>
            <T style={{ fontWeight: '800', fontSize: 15 }}>{ai?.state === 'done' && aiItems.length ? 'نتیجه‌های دیگر' : 'نتیجه‌ها'}</T>
            <List items={rest} />
          </View>
        ) : !ai ? (
          <Card style={{ gap: 6, alignItems: 'center' }}>
            <T style={{ color: c.muted, fontSize: 13.5, textAlign: 'center', lineHeight: 21 }}>این کلمه‌ها در درس‌ها پیدا نشد. «جستجو» را بزنید تا هوش مصنوعی با معنی سؤال بگردد.</T>
          </Card>
        ) : null
      ) : null}
      <View style={{ height: 40 }} />
    </SubPage>
  );
}
