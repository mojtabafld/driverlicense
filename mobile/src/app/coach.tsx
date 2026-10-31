// «مربی هوشمند», the coach page (Mojtaba 2026-10-24), opened from the coach button in the head of «آموزش» or «آزمون»
// (ui/coach-button.tsx), with that tab's part only:
// - «آموزش»: the AI's short advice on what to study, from the user's tests and the course lessons done, with links to
//   the learning pages that teach it (the app sends the pages it can open, the server's coach.js picks from them);
// - «آزمون»: the tests' mistakes summed up: the figures (by topic) and the AI's summary of where to practise, with a
//   button to practise the mistakes.
// Premium («حالت مربی» in the settings, lib/coach-mode.ts); the server keeps each part until there are new tests or
// lessons. Everything on it is in the app's language only (the AI writes in it, the topics come named in it).
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { api } from '@/lib/api';
import { useCoachMode } from '@/lib/coach-mode';
import { COURSE } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { UI_LANG, tr } from '@/lib/i18n';
import { faNum } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { Icon } from '@/ui/icon';
import { ArcButton, Card, T, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

type Kind = 'learn' | 'exam';
type Link = { id: string; title: string; why: string };
type Coach = { headline: string; points: string[]; links?: Link[]; focus?: string[]; at: number };
type Stats = { tests: number; avgPct: number | null; passed: number; full: number; stillWrong: number; topics: { topic: string; wrongPct: number; tries: number }[] };
type Fixed = { total: number; list: { qid: number; at: number; topic: string; question: string }[] };
type Answer = { coach?: Coach; stats?: Stats; fixed?: Fixed; few?: boolean; locked?: boolean; disabled?: boolean; off?: boolean };

// The learning pages besides the course's lessons, for the coach to link to.
const PAGES: [string, string][] = [['signs', 'تابلوها، خط‌کشی‌ها و چراغ‌ها'], ['priority', 'آموزش حق تقدم'], ['rules', 'قوانین'],
  ['sign-cards', 'تمرین سریع تابلوها'], ['priority-cards', 'تمرین سریع حق تقدم'], ['glossary', 'واژه‌نامه‌ی آزمون'], ['learn-lessons', 'آموزش درس‌به‌درس']];
const open = (id: string) => {
  const [kind, key] = id.split(':');
  if (kind === 'course') router.push({ pathname: '/course-lesson', params: { id: key } });
  else router.push(`/${key}` as never);
};
// Kept while the app runs, so opening the page again does not ask again at once.
const kept: Partial<Record<Kind, Answer>> = {};

export default function CoachPage() {
  const c = useColors();
  const p = useLocalSearchParams<{ from?: string }>();
  const kind: Kind = p.from === 'learn' ? 'learn' : 'exam';
  const { allowed, on } = useCoachMode();
  const { attempts } = useApp();
  const { done } = useCourseProgress();
  const catalog = useMemo(() => [
    ...COURSE.flatMap(ch => ch.lessons.map(l => ({ id: `course:${l.id}`, title: `${tr(ch.title)}: ${tr(l.title)}`, done: !!done[l.id] }))),
    ...PAGES.map(([k, t]) => ({ id: `page:${k}`, title: tr(t) })),
  ], [done]);
  const [ans, setAns] = useState<Partial<Record<Kind, Answer>>>(kept);
  const [err, setErr] = useState<Partial<Record<Kind, string>>>({});
  const n = attempts.length;
  useEffect(() => {
    if (!on) return;
    let live = true;
    api<Answer>('POST', 'coach', { ui: UI_LANG, kind, ...(kind === 'learn' ? { catalog } : {}) })
      .then(a => { if (!live) return; kept[kind] = a; setAns(x => ({ ...x, [kind]: a })); setErr(x => ({ ...x, [kind]: '' })); })
      .catch(e => { if (live) setErr(x => ({ ...x, [kind]: e.message })); });
    return () => { live = false; };
  // (the catalog's done lessons and the number of tests decide whether the server makes new advice)
  }, [on, kind, n, catalog]);

  const a = ans[kind], k = a?.coach;
  const icon = (name: 'coach' | 'learn' | 'exam') => (
    <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
      <Icon name={name} size={19} color={c.text} weight="semibold" />
    </View>
  );
  const skeleton = (
    <View style={{ gap: 8 }}>
      {[0.6, 0.95, 0.85, 0.9].map((w, i) => <View key={i} style={{ height: i ? 12 : 16, width: `${w * 100}%`, borderRadius: 6, backgroundColor: c.surface2 }} />)}
    </View>
  );
  const advice = k ? (
    <>
      <T raw style={{ fontWeight: '700', fontSize: 16, lineHeight: 25 }}>{k.headline}</T>
      <View style={{ gap: 6 }}>
        {k.points.map((pt, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
            {/* A filled round tick in the theme's colour (Mojtaba 2026-10-24). */}
            <View style={{ width: 20, height: 20, borderRadius: 10, marginTop: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accent }}>
              <Icon name="check" size={13} color={c.accentText} weight="bold" />
            </View>
            <T raw style={{ flex: 1, fontSize: 14, lineHeight: 23 }}>{pt}</T>
          </View>
        ))}
      </View>
    </>
  ) : err[kind] ? <T style={{ color: c.muted, fontSize: 13 }}>{err[kind]}</T> : skeleton;

  let body: React.ReactNode;
  if (!allowed) {
    body = (
      <Card style={{ gap: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>{icon('coach')}<T style={{ flex: 1, fontWeight: '700', fontSize: 17 }}>حالت مربی</T></View>
        <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 22 }}>با هوش مصنوعی به بهتر یاد گرفتن شما کمک می‌کند؛ با نسخه‌ی ویژه.</T>
        <ArcButton label="فعال کردن نسخه‌ی ویژه" onPress={() => router.push('/premium')} icon="lock" />
      </Card>
    );
  } else if (!on || a?.disabled) {
    body = (
      <Card style={{ gap: 10 }}>
        <T style={{ fontWeight: '700', fontSize: 16 }}>حالت مربی خاموش است</T>
        <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 22 }}>آن را در تنظیمات روشن کنید.</T>
        <ArcButton label="تنظیمات" onPress={() => router.navigate('/settings')} icon="settings" variant="secondary" />
      </Card>
    );
  } else if (a?.off) {
    body = <Card><T style={{ color: c.muted, fontSize: 13.5 }}>مربی هوشمند الان در دسترس نیست.</T></Card>;
  } else if (kind === 'exam' && (a?.few || n < 2)) {
    body = (
      <Card style={{ gap: 10 }}>
        <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 22 }}>بعد از حداقل ۲ آزمون، خلاصه‌ی اشتباهات شما اینجا نمایش داده می‌شود.</T>
        <ArcButton label="شروع آزمون" onPress={() => router.navigate('/exam')} icon="play" />
      </Card>
    );
  } else if (kind === 'learn') {
    body = <>
      <Card style={{ gap: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>{icon('learn')}<T style={{ flex: 1, fontWeight: '700', fontSize: 17 }}>چه چیزی یاد بگیرم؟</T></View>
        {advice}
      </Card>
      {k?.links?.length ? (
        <Card style={{ gap: 2, paddingVertical: 6 }}>
          {k.links.map((l, i) => (
            <Pressable key={l.id} onPress={() => { tap(); open(l.id); }} accessibilityRole="link"
              style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderTopWidth: i ? 1 : 0, borderTopColor: c.line, opacity: pressed ? 0.7 : 1 })}>
              <View style={{ width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accentSoft }}>
                <Icon name={l.id.startsWith('course:') ? 'learn' : l.id.includes('sign') ? 'sign' : l.id.includes('priority') ? 'priority' : 'rules'} size={17} color={c.link} />
              </View>
              <View style={{ flex: 1 }}>
                <T raw style={{ fontWeight: '700', fontSize: 14.5, lineHeight: 22 }}>{catalog.find(x => x.id === l.id)?.title ?? l.title}</T>
                <T raw style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{l.why}</T>
              </View>
              <Icon name="chevronLeft" size={16} color={c.muted} />
            </Pressable>
          ))}
        </Card>
      ) : null}
    </>;
  } else {
    const s = a?.stats;
    body = <>
      {s ? (
        <Card style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>{icon('exam')}<T style={{ flex: 1, fontWeight: '700', fontSize: 17 }}>اشتباهات آزمون‌ها</T></View>
          <View style={{ flexDirection: 'row' }}>
            {[['آزمون‌ها', faNum(s.tests)], ['میانگین', s.avgPct == null ? '–' : `${faNum(s.avgPct)}٪`], ['قبولی', `${faNum(s.passed)}/${faNum(s.full)}`], ['سؤال برای تمرین', faNum(s.stillWrong)]].map(([l, v]) => (
              <View key={l} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
                <T style={{ color: c.muted, fontSize: 11.5, lineHeight: 16, textAlign: 'center' }} numberOfLines={2}>{l}</T>
                <T style={{ fontSize: 17, fontWeight: '800', textAlign: 'center' }}>{v}</T>
              </View>
            ))}
          </View>
          {s.topics.length ? (
            <View style={{ gap: 8 }}>
              {s.topics.map(t => (
                <View key={t.topic} style={{ gap: 4 }}>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <T raw style={{ flex: 1, fontSize: 13 }} numberOfLines={1}>{t.topic}</T>
                    <T style={{ fontSize: 13, color: c.bad, fontWeight: '700' }}>{`${faNum(t.wrongPct)}٪ اشتباه`}</T>
                  </View>
                  <View style={{ height: 6, borderRadius: 3, backgroundColor: c.surface2, overflow: 'hidden' }}>
                    <View style={{ width: `${Math.min(100, t.wrongPct)}%`, height: '100%', borderRadius: 3, backgroundColor: c.bad }} />
                  </View>
                </View>
              ))}
            </View>
          ) : null}
        </Card>
      ) : null}
      <Card style={{ gap: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>{icon('coach')}<T style={{ flex: 1, fontWeight: '700', fontSize: 17 }}>کجا تمرین لازم دارید؟</T></View>
        {advice}
        {k?.focus?.length ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
            {k.focus.map(f => <View key={f} style={{ paddingHorizontal: 10, paddingVertical: 3, borderRadius: 99, backgroundColor: c.surface2 }}><T raw style={{ fontSize: 12.5, lineHeight: 20, color: c.muted }}>{f}</T></View>)}
          </View>
        ) : null}
        <ArcButton label="تمرین اشتباهات" onPress={() => router.push('/mistakes')} icon="play" />
      </Card>
    </>;
  }

  return (
    <SubPage title="مربی هوشمند" subtitle={kind === 'learn' ? 'پیشنهاد آموزش از روی آزمون‌ها و درس‌های شما' : 'خلاصه‌ی اشتباهات آزمون‌های شما'}>
      {/* The mistakes answered right since the coach's advice (server's coach.js), each with a green tick. */}
      {allowed && on && a?.fixed?.total ? (
        <Card style={{ gap: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: c.okSoft }}>
              <Icon name="check" size={20} color={c.ok} weight="bold" />
            </View>
            <View style={{ flex: 1 }}>
              <T style={{ fontWeight: '700', fontSize: 16 }}>{`${faNum(a.fixed.total)} اشتباه حل شد`}</T>
              <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>این‌ها را بعد از پیشنهاد مربی درست جواب دادید.</T>
            </View>
          </View>
          {a.fixed.list.map((f, i) => (
            <View key={f.qid} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 10, borderTopWidth: i ? 1 : 0, borderTopColor: c.line }}>
              <Icon name="checkCircle" size={22} color={c.ok} />
              <View style={{ flex: 1 }}>
                <T raw style={{ fontSize: 13.5, lineHeight: 21 }} numberOfLines={2}>{f.question}</T>
                <T raw style={{ color: c.muted, fontSize: 12, lineHeight: 18 }} numberOfLines={1}>{f.topic}</T>
              </View>
            </View>
          ))}
        </Card>
      ) : null}
      {body}
      {/* «از مربی بپرس» (app/ask.tsx): any question, answered from the app's own material. */}
      {allowed && on ? (
        <Card onPress={() => { tap(); router.push('/ask'); }} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accentSoft }}>
            <Icon name="sparkles" size={19} color={c.link} weight="semibold" />
          </View>
          <View style={{ flex: 1 }}>
            <T style={{ fontWeight: '700', fontSize: 16 }}>از مربی بپرس</T>
            <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>هر سؤالی درباره‌ی آزمون؛ جواب از روی آموزش‌های برنامه.</T>
          </View>
          <Icon name="chevronLeft" size={14} color={c.faint} />
        </Card>
      ) : null}
    </SubPage>
  );
}
