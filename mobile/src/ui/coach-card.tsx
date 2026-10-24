// «مربی هوشمند», the personal coach (Mojtaba 2026-10-24): the AI's advice from the user's own results (server's coach.js,
// POST /api/coach), under the latest tests in home's chart view: a headline, a few points, the topics to work on and a
// button to the page to open now. Asked again when the number of tests changes (the server keeps it otherwise). Without
// premium it says what it does, with a button to the premium page; with fewer than 2 tests, or no AI on the server,
// nothing shows.
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { api } from '@/lib/api';
import { UI_LANG } from '@/lib/i18n';
import { Icon } from './icon';
import { ArcButton, Card, T } from './kit';
import { useColors } from './theme';

type Coach = { headline: string; points: string[]; focus: string[]; next: string; nextLabel: string; at: number };
type Answer = { coach?: Coach; locked?: boolean; few?: boolean; off?: boolean };
const HREF: Record<string, string> = { exam: '/exam', mistakes: '/mistakes', learn: '/learn', signs: '/signs', priority: '/priority', course: '/course' };

export function CoachCard({ tests }: { tests: number }) {
  const c = useColors();
  const [ans, setAns] = useState<Answer | null>(null);
  const [err, setErr] = useState('');
  useEffect(() => {
    if (tests < 2) return;
    let live = true;
    api<Answer>('POST', 'coach', { ui: UI_LANG }).then(a => { if (live) { setAns(a); setErr(''); } }).catch(e => { if (live) setErr(e.message); });
    return () => { live = false; };
  }, [tests]);
  if (tests < 2 || ans?.off || ans?.few) return null;
  const head = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
        <Icon name="sparkles" size={19} color={c.text} weight="semibold" />
      </View>
      <T style={{ flex: 1, fontWeight: '700', fontSize: 17 }}>مربی هوشمند</T>
    </View>
  );
  if (ans?.locked) return (
    <Card style={{ gap: 10 }}>
      {head}
      <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 22 }}>برنامه‌ی تمرین شخصی شما از روی نتیجه‌هایتان، که با هر آزمون به‌روز می‌شود؛ با نسخه‌ی ویژه.</T>
      <ArcButton label="فعال کردن نسخه‌ی ویژه" onPress={() => router.push('/premium')} icon="lock" variant="secondary" />
    </Card>
  );
  const k = ans?.coach;
  return (
    <Card style={{ gap: 10 }}>
      {head}
      {!k ? (
        err ? <T style={{ color: c.muted, fontSize: 13 }}>{err}</T> : (
          <View style={{ gap: 8 }}>
            {[0.9, 0.7, 0.8].map((w, i) => <View key={i} style={{ height: 12, width: `${w * 100}%`, borderRadius: 6, backgroundColor: c.surface2 }} />)}
          </View>
        )
      ) : <>
        <T raw style={{ fontWeight: '700', fontSize: 15.5, lineHeight: 24 }}>{k.headline}</T>
        <View style={{ gap: 6 }}>
          {k.points.map((p, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, marginTop: 9, backgroundColor: c.accent }} />
              <T raw style={{ flex: 1, fontSize: 14, lineHeight: 23 }}>{p}</T>
            </View>
          ))}
        </View>
        {k.focus.length ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
            {k.focus.map(f => <View key={f} style={{ paddingHorizontal: 10, paddingVertical: 3, borderRadius: 99, backgroundColor: c.surface2 }}><T raw style={{ fontSize: 12.5, lineHeight: 20, color: c.muted }}>{f}</T></View>)}
          </View>
        ) : null}
        <ArcButton label={k.nextLabel} onPress={() => router.navigate((HREF[k.next] || '/exam') as never)} icon="play" />
      </>}
    </Card>
  );
}
