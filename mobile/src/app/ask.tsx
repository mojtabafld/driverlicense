// «از مربی بپرس» (Mojtaba 2026-10-31), opened from the coach page and from «جستجو در آموزش»: the user asks anything
// about the theory test in their own words, and the AI teacher answers from the app's own material only (the server's
// search.js ask, which looks up the closest teaching entries and practice questions with rag.js), with up to 3 learning
// pages to read more (the search's rows; a locked one opens the premium page). A follow-up goes with the last turns,
// so «و در شب؟» is understood. The talk is kept while the app runs. Premium, as the coach (lib/coach-mode.ts).
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';

import { ApiError } from '@/lib/api';
import { useCoachMode } from '@/lib/coach-mode';
import { RTL, tr } from '@/lib/i18n';
import { aiAsk, type AskTurn } from '@/lib/search';
import { Icon } from '@/ui/icon';
import { ArcButton, Card, Enter, T, physicalAlign, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors, useIsDark } from '@/ui/theme';
import { Row } from './course-search';

const EXAMPLES = ['در میدان چه کسی حق تقدم دارد؟', 'حداکثر سرعت در شهر چقدر است؟', 'فاصله‌ی ترمز را چطور حساب کنم؟', 'چراغ زرد چشمک‌زن یعنی چه؟'];
// The talk, kept while the app runs.
const talk: AskTurn[] = [];

// The answer: its lines, those that start with "- " as points.
function Answer({ text }: { text: string }) {
  const c = useColors();
  return (
    <View style={{ gap: 6 }}>
      {text.split('\n').map(l => l.trim()).filter(Boolean).map((l, i) => l.startsWith('- ') ? (
        <View key={i} style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: c.accent, marginTop: 9 }} />
          <T raw style={{ flex: 1, fontSize: 14.5, lineHeight: 24 }}>{l.slice(2)}</T>
        </View>
      ) : <T raw key={i} style={{ fontSize: 14.5, lineHeight: 24 }}>{l}</T>)}
    </View>
  );
}

export default function AskPage() {
  const c = useColors(), dark = useIsDark();
  const p = useLocalSearchParams<{ q?: string }>();
  const { allowed } = useCoachMode();
  const [turns, setTurns] = useState<AskTurn[]>(() => [...talk]);
  const [q, setQ] = useState(String(p.q || ''));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [focus, setFocus] = useState(false);

  const send = async (text = q) => {
    const asked = text.replace(/\s+/g, ' ').trim();
    if (asked.length < 3 || busy) return;
    tap(); setBusy(true); setErr(''); setQ('');
    try {
      const r = await aiAsk(asked, talk);
      talk.push({ q: asked, a: r.answer, sources: r.sources });
      while (talk.length > 20) talk.shift();
      setTurns([...talk]);
    } catch (e) {
      if (e instanceof ApiError && e.status === 402) { router.push('/premium'); return; }
      setErr(e instanceof Error ? e.message : String(e)); setQ(asked);
    } finally { setBusy(false); }
  };

  if (!allowed) {
    return (
      <SubPage title="از مربی بپرس" subtitle="هر سؤالی درباره‌ی آزمون تئوری">
        <Card style={{ gap: 10 }}>
          <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 22 }}>مربی هوشمند هر سؤال شما را از روی آموزش‌های برنامه جواب می‌دهد؛ با نسخه‌ی ویژه.</T>
          <ArcButton label="فعال کردن نسخه‌ی ویژه" onPress={() => router.push('/premium')} icon="lock" />
        </Card>
      </SubPage>
    );
  }

  return (
    <SubPage title="از مربی بپرس" subtitle="هر سؤالی درباره‌ی آزمون تئوری">
      {!turns.length && !busy ? (
        <Enter>
          <View style={{ gap: 10 }}>
            <T style={{ color: c.muted, fontSize: 13, lineHeight: 21 }}>سؤالتان را با کلمه‌های خودتان بنویسید؛ مربی از روی درس‌ها، قوانین، تابلوها و سؤال‌های برنامه جواب می‌دهد و صفحه‌ی آموزش مربوط را نشان می‌دهد.</T>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {EXAMPLES.map(tr).map(e => (
                <Pressable key={e} onPress={() => send(e)} style={({ pressed }) => ({ paddingHorizontal: 12, paddingVertical: 7, borderRadius: 99, backgroundColor: c.surface2, opacity: pressed ? 0.7 : 1 })}>
                  <T raw style={{ fontSize: 13, color: c.text }}>{e}</T>
                </Pressable>
              ))}
            </View>
          </View>
        </Enter>
      ) : null}

      {turns.map((t, i) => (
        <View key={i} style={{ gap: 8 }}>
          <View style={{ alignSelf: 'flex-end', maxWidth: '88%', backgroundColor: c.accentSoft, borderRadius: 16, paddingHorizontal: 14, paddingVertical: 9 }}>
            <T raw style={{ fontSize: 14.5, lineHeight: 23 }}>{t.q}</T>
          </View>
          <Card style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Icon name="coach" size={17} color={c.link} />
              <T style={{ fontWeight: '700', fontSize: 13.5, color: c.link }}>مربی</T>
            </View>
            <Answer text={t.a} />
            {t.sources.length ? (
              <View style={{ gap: 0, marginHorizontal: -8, borderTopWidth: 1, borderTopColor: c.line, paddingTop: 4 }}>
                <T style={{ color: c.muted, fontSize: 12, marginHorizontal: 8, marginTop: 4 }}>بیشتر بخوانید</T>
                {t.sources.map(s => <Row key={s.id} item={s} />)}
              </View>
            ) : null}
          </Card>
        </View>
      ))}
      {busy ? <Card><T style={{ color: c.muted, fontSize: 13.5 }}>مربی در حال نوشتن پاسخ…</T></Card> : null}
      {err ? <T raw style={{ color: c.bad, fontSize: 13 }}>{err}</T> : null}

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8, paddingStart: 14, paddingEnd: 6, paddingVertical: 4, minHeight: 56, borderRadius: 16, borderWidth: 1.5,
        borderColor: focus ? c.accent : dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', backgroundColor: c.surface,
        ...(Platform.OS === 'web' ? { boxShadow: focus ? `0 0 0 4px ${c.accentSoft}` : '0 1px 2px rgba(0,0,0,.05)' } as any : {}) }}>
        <TextInput value={q} onChangeText={v => setQ(v.slice(0, 400))} autoFocus={!turns.length} multiline returnKeyType="send" blurOnSubmit
          onSubmitEditing={() => send()} placeholder={tr(turns.length ? 'سؤال بعدی…' : 'سؤالتان را بنویسید…')} placeholderTextColor={c.muted}
          accessibilityLabel={tr('سؤال از مربی')} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ flex: 1, minHeight: 46, maxHeight: 140, paddingVertical: 12, fontSize: 16, color: c.text, fontFamily: RTL ? 'Vazirmatn-400' : undefined,
            textAlign: physicalAlign(RTL ? 'right' : 'left'), writingDirection: RTL ? 'rtl' : 'ltr', ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}) }} />
        <Pressable onPress={() => send()} disabled={busy || q.trim().length < 3} accessibilityRole="button" accessibilityLabel={tr('ارسال')} hitSlop={6}
          style={({ pressed }) => ({ width: 44, height: 44, marginBottom: 2, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
            backgroundColor: q.trim().length >= 3 && !busy ? c.accent : c.surface2, opacity: pressed ? 0.7 : 1 })}>
          <View style={RTL ? { transform: [{ scaleX: -1 }] } : undefined}><Icon name="send" size={19} color={q.trim().length >= 3 && !busy ? c.accentText : c.faint} /></View>
        </Pressable>
      </View>
      <T style={{ color: c.faint, fontSize: 11.5, lineHeight: 18 }}>پاسخ‌ها فقط از آموزش‌های برنامه نوشته می‌شوند؛ برای قانون دقیق، صفحه‌ی آموزش را هم بخوانید.</T>
      <View style={{ height: 40 }} />
    </SubPage>
  );
}
