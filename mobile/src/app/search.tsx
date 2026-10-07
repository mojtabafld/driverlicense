// Results of «جستجو با هوش مصنوعی» (?q=…): the closest road signs, right-of-way items, parts of «قوانین» and questions
// (the server's /api/learnsearch, Claude) in sections by kind, each with its picture and why it matches; a tap opens it.
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, View } from 'react-native';

import { api } from '@/lib/api';
import { faNum } from '@/lib/logic';
import { imgSource } from '@/lib/img-source';
import { session } from '@/lib/session';
import { useApp, useQuestionImage } from '@/lib/store';
import { GuideImage } from '@/ui/guide-visual';
import { Icon, type IconName } from '@/ui/icon';
import { Card, Enter, T, tap } from '@/ui/kit';
import { RoadSign, type SignKind } from '@/ui/road-signs';
import { SearchField } from '@/ui/search-ai';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

type Result = { id: string; kind: 'signs' | 'priority' | 'rules' | 'question'; title: string; sub: string; group: string; why: string;
  cat?: string; i?: number; key?: string; sign?: string; qid?: number };

const KIND: Record<Result['kind'], { label: string; group: string; icon: IconName }> = {
  signs: { label: 'علائم رانندگی', group: 'علائم رانندگی', icon: 'sign' }, priority: { label: 'حق تقدم', group: 'آموزش حق تقدم', icon: 'priority' },
  rules: { label: 'قوانین', group: 'قوانین', icon: 'rules' }, question: { label: 'سؤال', group: 'آموزش درس‌به‌درس (سؤال‌ها)', icon: 'learn' },
};
// The results in sections by kind, the section of the best match first; within a section in the order given.
function sections(results: Result[]) {
  const out: { kind: Result['kind']; items: Result[] }[] = [];
  for (const r of results) { const s = out.find(x => x.kind === r.kind); if (s) s.items.push(r); else out.push({ kind: r.kind, items: [r] }); }
  return out;
}

function open(r: Result) {
  tap();
  if (r.kind === 'signs' || r.kind === 'priority') router.push({ pathname: '/guide-view', params: { kind: r.kind, cat: r.cat!, i: String(r.i ?? 0) } });
  else if (r.kind === 'rules') router.push({ pathname: '/rules', params: { open: String(r.i ?? 0) } });
  else if (r.qid) { session.plan = { mode: 'sections', ids: [r.qid], title: r.group || 'سؤال' }; router.push('/run'); }
}

function Pic({ r }: { r: Result }) {
  const c = useColors(), { bank } = useApp(), qImage = useQuestionImage();
  const box = { width: 96, borderRadius: 10, overflow: 'hidden' as const, backgroundColor: c.surface2, alignItems: 'center' as const, justifyContent: 'center' as const };
  if ((r.kind === 'signs' || r.kind === 'priority') && r.key) return <View style={box}><GuideImage k={r.key} aspect={4 / 3} radius={10} compact /></View>;
  if (r.kind === 'question') {
    const q = bank?.questions.find(x => x.id === r.qid);
    if (q) return <View style={[box, { aspectRatio: 4 / 3 }]}><Image source={imgSource(qImage(q))} style={{ width: '100%', height: '100%' }} contentFit="cover" transition={150} /></View>;
  }
  if (r.kind === 'rules' && r.sign) return <View style={[box, { aspectRatio: 4 / 3 }]}><RoadSign kind={r.sign as SignKind} size={48} /></View>;
  return <View style={[box, { aspectRatio: 4 / 3 }]}><Icon name={KIND[r.kind].icon} size={30} color={c.link} /></View>;
}

// The filter: «همه» or one of the four kinds, each with how many results it has; a kind with none is greyed.
const KINDS: Result['kind'][] = ['signs', 'priority', 'rules', 'question'];
function FilterMenu({ open, top, value, counts, onPick, onClose }: { open: boolean; top: number; value: Result['kind'] | null; counts: Record<string, number>;
  onPick: (k: Result['kind'] | null) => void; onClose: () => void }) {
  const c = useColors();
  const row = (k: Result['kind'] | null, label: string, icon: IconName, n: number) => {
    const on = value === k, off = k !== null && !n;
    return (
      <Pressable key={k ?? 'all'} disabled={off} onPress={() => { tap(); onPick(k); }} accessibilityRole="button" accessibilityState={{ selected: on, disabled: off }}
        style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 11, paddingHorizontal: 14, borderRadius: 12,
          backgroundColor: on ? c.surface2 : pressed ? c.surface2 : 'transparent', opacity: off ? 0.4 : 1 })}>
        <Icon name={icon} size={18} color={on ? c.link : c.muted} />
        <T style={{ flex: 1, fontSize: 14.5, fontWeight: on ? '700' : '400' }}>{label}</T>
        <T style={{ color: c.faint, fontSize: 12.5 }}>{faNum(n)}</T>
        {on ? <Icon name="check" size={16} color={c.link} /> : <View style={{ width: 16 }} />}
      </Pressable>
    );
  };
  const all = KINDS.reduce((a, k) => a + (counts[k] || 0), 0);
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.12)' }}>
        <View style={{ position: 'absolute', top, left: 16, right: 16, alignItems: 'flex-start' }}>
          <Pressable onPress={() => {}} style={{ width: 290, maxWidth: '100%', backgroundColor: c.surface, borderRadius: 16, padding: 6, borderWidth: 1, borderColor: c.line,
            shadowColor: '#000', shadowOpacity: 0.16, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 10 }}>
            {row(null, 'همه‌ی نتایج', 'list', all)}
            {KINDS.map(k => row(k, KIND[k].group, KIND[k].icon, counts[k] || 0))}
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

export default function Search() {
  const c = useColors();
  const p = useLocalSearchParams<{ q?: string }>();
  const [q, setQ] = useState(String(p.q || '')), [asked, setAsked] = useState(String(p.q || ''));
  // The answer for search `for`; while it is not the one asked, the page is searching.
  const [state, setState] = useState<{ for: string; results: Result[] | null; error: string }>({ for: '', results: null, error: '' });
  useEffect(() => {
    if (asked.trim().length < 2) return;
    let live = true;
    api<{ results: Result[] }>('POST', 'learnsearch', { q: asked })
      .then(d => { if (live) setState({ for: asked, results: d.results, error: '' }); })
      .catch(e => { if (live) setState({ for: asked, results: null, error: e.message || 'جستجو انجام نشد.' }); });
    return () => { live = false; };
  }, [asked]);
  const busy = asked.trim().length >= 2 && state.for !== asked, shown = busy ? { results: null, error: '' } : state;
  const go = () => { if (q.trim().length >= 2) { setAsked(q.trim()); setKind(null); } };
  // The filter: one kind of result only (null: all); the menu opens under the filter button.
  const [kind, setKind] = useState<Result['kind'] | null>(null), [menu, setMenu] = useState<number | null>(null);
  const filterBtn = useRef<View>(null);
  const counts: Record<string, number> = {};
  for (const r of shown.results ?? []) counts[r.kind] = (counts[r.kind] || 0) + 1;
  const visible = (shown.results ?? []).filter(r => !kind || r.kind === kind);
  return (
    <SubPage title="جستجو با هوش مصنوعی" subtitle="نزدیک‌ترین علائم، حق تقدم‌ها، قوانین و سؤال‌ها" gap={10}>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <SearchField value={q} onChange={setQ} onSubmit={go} />
        <Pressable onPress={() => { tap(); go(); }} accessibilityRole="button" accessibilityLabel="جستجو"
          style={({ pressed }) => ({ width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.surface2 : c.btn })}>
          <Icon name="searchAi" size={19} color={c.btnFg} />
        </Pressable>
        <Pressable ref={filterBtn} onPress={() => { tap(); filterBtn.current?.measureInWindow((_x, y, _w, h) => setMenu(y + h + 6)); }}
          disabled={!shown.results?.length} accessibilityRole="button" accessibilityLabel="فیلتر نتایج"
          style={({ pressed }) => ({ width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5,
            borderColor: kind ? c.link : c.line, backgroundColor: kind ? c.accentSoft : pressed ? c.surface2 : 'transparent', opacity: shown.results?.length ? 1 : 0.45 })}>
          <Icon name="filter" size={19} color={kind ? c.link : c.text} />
        </Pressable>
      </View>
      <FilterMenu open={menu !== null} top={menu ?? 0} value={kind} counts={counts} onPick={k => { setKind(k); setMenu(null); }} onClose={() => setMenu(null)} />
      {kind && shown.results?.length ? (
        <Pressable onPress={() => { tap(); setKind(null); }} style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: c.accentSoft,
          borderRadius: 999, paddingVertical: 5, paddingHorizontal: 12 }} accessibilityRole="button" accessibilityLabel="برداشتن فیلتر">
          <Icon name={KIND[kind].icon} size={14} color={c.link} />
          <T style={{ fontSize: 13, color: c.link, fontWeight: '600' }}>فقط {KIND[kind].group}</T>
          <Icon name="xmark" size={12} color={c.link} />
        </Pressable>
      ) : null}
      {busy ? (
        <View style={{ paddingVertical: 30, alignItems: 'center', gap: 10 }}>
          <ActivityIndicator color={c.link} />
          <T style={{ color: c.muted, fontSize: 13.5 }}>در حال جستجو…</T>
        </View>
      ) : null}
      {shown.error ? <T style={{ color: c.bad, fontSize: 14, textAlign: 'center', paddingVertical: 16 }}>{shown.error}</T> : null}
      {shown.results && !shown.results.length ? <T style={{ color: c.muted, fontSize: 14, textAlign: 'center', paddingVertical: 16 }}>چیزی پیدا نشد؛ با کلمه‌های دیگری امتحان کنید.</T> : null}
      {shown.results ? sections(visible).map(sec => (
        <View key={sec.kind} style={{ gap: 8, marginTop: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 2 }}>
            <Icon name={KIND[sec.kind].icon} size={18} color={c.link} />
            <T style={{ flex: 1, fontWeight: '700', fontSize: 15.5 }}>{KIND[sec.kind].group}</T>
            <T style={{ color: c.faint, fontSize: 12.5 }}>{faNum(sec.items.length)}</T>
          </View>
          {sec.items.map(r => (
            <Enter key={r.id}>
              <Card onPress={() => open(r)} style={{ flexDirection: 'row', gap: 12, alignItems: 'center', paddingVertical: 10 }}>
                <Pic r={r} />
                <View style={{ flex: 1, gap: 3 }}>
                  <T style={{ fontSize: 11.5, color: c.faint }} numberOfLines={1}>{r.group}</T>
                  <T style={{ fontWeight: '700', fontSize: 14.5, lineHeight: 22 }} numberOfLines={2}>{r.title}</T>
                  {r.sub && r.kind !== 'question' ? <T style={{ fontSize: 12, color: c.muted, writingDirection: 'ltr', textAlign: 'right' }} numberOfLines={1}>{r.sub}</T> : null}
                  {r.why ? <T style={{ fontSize: 12.5, lineHeight: 20, color: c.muted }} numberOfLines={2}>{r.why}</T> : null}
                </View>
                <Icon name="chevronLeft" size={15} color={c.faint} />
              </Card>
            </Enter>
          ))}
        </View>
      )) : null}
    </SubPage>
  );
}
