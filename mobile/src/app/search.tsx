// Results of «جستجو با هوش مصنوعی» (?q=…): the closest road signs, right-of-way items, parts of «قوانین» and questions
// (the server's /api/learnsearch, Claude), each with its picture, what kind it is and why it matches; a tap opens it.
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, TextInput, View } from 'react-native';

import { api } from '@/lib/api';
import { imgSource } from '@/lib/img-source';
import { session } from '@/lib/session';
import { useApp, useQuestionImage } from '@/lib/store';
import { GuideImage } from '@/ui/guide-visual';
import { Icon, type IconName } from '@/ui/icon';
import { Card, Enter, T, tap } from '@/ui/kit';
import { RoadSign, type SignKind } from '@/ui/road-signs';
import { searchInputStyle } from '@/ui/search-ai';
import { SubPage } from '@/ui/sub-page';
import { useColors, useIsDark } from '@/ui/theme';

type Result = { id: string; kind: 'signs' | 'priority' | 'rules' | 'question'; title: string; sub: string; group: string; why: string;
  cat?: string; i?: number; key?: string; sign?: string; qid?: number };

const KIND: Record<Result['kind'], { label: string; icon: IconName }> = {
  signs: { label: 'علائم رانندگی', icon: 'sign' }, priority: { label: 'حق تقدم', icon: 'priority' },
  rules: { label: 'قوانین', icon: 'rules' }, question: { label: 'سؤال', icon: 'exam' },
};

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

export default function Search() {
  const c = useColors(), dark = useIsDark();
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
  const go = () => { if (q.trim().length >= 2) setAsked(q.trim()); };
  return (
    <SubPage title="جستجو با هوش مصنوعی" subtitle="نزدیک‌ترین علائم، حق تقدم‌ها، قوانین و سؤال‌ها" gap={10}>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <TextInput value={q} onChangeText={v => setQ(v.slice(0, 200))} returnKeyType="search" onSubmitEditing={go}
          placeholder="چه چیزی را می‌خواهید پیدا کنید؟" placeholderTextColor={c.faint} style={searchInputStyle(c, dark)} />
        <Pressable onPress={() => { tap(); go(); }} accessibilityRole="button" accessibilityLabel="جستجو"
          style={({ pressed }) => ({ width: 46, height: 46, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.surface2 : c.btn })}>
          <Icon name="searchAi" size={20} color={c.btnFg} />
        </Pressable>
      </View>
      {busy ? (
        <View style={{ paddingVertical: 30, alignItems: 'center', gap: 10 }}>
          <ActivityIndicator color={c.link} />
          <T style={{ color: c.muted, fontSize: 13.5 }}>در حال جستجو…</T>
        </View>
      ) : null}
      {shown.error ? <T style={{ color: c.bad, fontSize: 14, textAlign: 'center', paddingVertical: 16 }}>{shown.error}</T> : null}
      {shown.results && !shown.results.length ? <T style={{ color: c.muted, fontSize: 14, textAlign: 'center', paddingVertical: 16 }}>چیزی پیدا نشد؛ با کلمه‌های دیگری امتحان کنید.</T> : null}
      {shown.results?.map(r => (
        <Enter key={r.id}>
          <Card onPress={() => open(r)} style={{ flexDirection: 'row', gap: 12, alignItems: 'center', paddingVertical: 10 }}>
            <Pic r={r} />
            <View style={{ flex: 1, gap: 3 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: c.surface2, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 1 }}>
                  <Icon name={KIND[r.kind].icon} size={12} color={c.muted} />
                  <T style={{ fontSize: 11.5, color: c.muted, fontWeight: '600' }}>{KIND[r.kind].label}</T>
                </View>
                <T style={{ fontSize: 11.5, color: c.faint }} numberOfLines={1}>{r.group}</T>
              </View>
              <T style={{ fontWeight: '700', fontSize: 14.5, lineHeight: 22 }} numberOfLines={2}>{r.title}</T>
              {r.sub && r.kind !== 'question' ? <T style={{ fontSize: 12, color: c.muted, writingDirection: 'ltr', textAlign: 'right' }} numberOfLines={1}>{r.sub}</T> : null}
              {r.why ? <T style={{ fontSize: 12.5, lineHeight: 20, color: c.muted }} numberOfLines={2}>{r.why}</T> : null}
            </View>
            <Icon name="chevronLeft" size={15} color={c.faint} />
          </Card>
        </Enter>
      ))}
    </SubPage>
  );
}
