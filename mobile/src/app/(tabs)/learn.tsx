// Learning: the 44 lessons one by one, or practice by the official sections (categories).
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { imgSource } from '@/lib/img-source';
import { faNum, isPass, lessonNumber, shuffle } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp, useQuestionImage } from '@/lib/store';
import { Glass } from '@/ui/glass';
import { Button, Card, Screen, Segmented, T, tap } from '@/ui/kit';
import { radius, useColors } from '@/ui/theme';

export default function Learn() {
  const c = useColors();
  const { bank, attempts, Q } = useApp();
  const pic = useQuestionImage();
  const [tab, setTab] = useState<'lessons' | 'sections'>('lessons');
  const [all, setAll] = useState(false);
  const [chosen, setChosen] = useState<number[]>([]);
  if (!bank) return null;
  const runs = (id: number) => attempts.filter(a => a.mode === 'lesson' && a.lesson === id);
  const lessons = all ? bank.tests : bank.tests.slice(0, 10);
  const sectionOf = (code: string) => +String(code).split('.')[0];
  const pool = bank.questions.filter(q => chosen.includes(sectionOf(q.c))).map(q => q.id);
  return (
    <Screen title="آموزش" subtitle="درس‌به‌درس یا بر اساس دسته‌بندی رسمی">
      <Segmented value={tab} onChange={setTab} options={[{ value: 'lessons', label: 'درس‌به‌درس' }, { value: 'sections', label: 'دسته‌بندی' }]} />
      {tab === 'lessons' ? (
        <>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {lessons.map((t, i) => {
              const r = runs(t.id), q = Q.get(t.thumb ?? t.qs[0]);
              const state = r.some(isPass) ? c.ok : r.length ? c.bad : c.glassBorder;
              return (
                <Pressable key={t.id} style={{ width: '47.5%' }} onPress={() => { tap(); session.plan = { mode: 'lesson', ids: t.qs.filter(id => Q.has(id)), lesson: t.id, title: `درس ${faNum(lessonNumber(t.title, i))}` }; router.push('/run'); }}>
                  <Glass r={radius.lg} style={{ padding: 8, gap: 6, borderColor: state, borderWidth: r.length ? 1.5 : undefined }}>
                    {q ? <Image source={imgSource(pic(q))} style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: radius.md }} contentFit="cover" /> : null}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4 }}>
                      <T style={{ fontWeight: '800' }}>درس {faNum(lessonNumber(t.title, i))}</T>
                      <View style={{ flexDirection: 'row', gap: 4 }}>
                        {r.slice(-3).map(a => <View key={a.at} style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: isPass(a) ? c.ok : c.bad }} />)}
                      </View>
                    </View>
                  </Glass>
                </Pressable>
              );
            })}
          </View>
          <Button kind="glass" label={all ? 'نمایش کمتر' : `نمایش همه‌ی ${faNum(bank.tests.length)} درس`} onPress={() => setAll(!all)} />
        </>
      ) : (
        <>
          {bank.sections.map((s, i) => {
            const on = chosen.includes(s.n), n = bank.questions.filter(q => sectionOf(q.c) === s.n).length;
            return (
              <Card key={s.n} onPress={() => setChosen(on ? chosen.filter(x => x !== s.n) : [...chosen, s.n])} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, ...(on ? { backgroundColor: c.accentSoft } : {}) }}>
                <Glass r={radius.sm} tint={on ? c.accent : undefined} style={{ width: 34, height: 34, alignItems: 'center', justifyContent: 'center', ...(on ? { backgroundColor: c.accent } : {}) }}>
                  <T style={{ textAlign: 'center', fontWeight: '800', color: on ? c.accentText : c.accent }}>{faNum(i + 1)}</T>
                </Glass>
                <View style={{ flex: 1 }}>
                  <T style={{ fontWeight: '700' }}>{s.fa}</T>
                  <T style={{ color: c.muted, fontSize: 12, writingDirection: 'ltr', textAlign: 'right' }}>{s.da}</T>
                </View>
                <T style={{ color: c.muted, fontWeight: '700' }}>{faNum(n)}</T>
              </Card>
            );
          })}
          <Button label={chosen.length ? `شروع آموزش (${faNum(Math.min(25, pool.length))} سؤال)` : 'دسته‌ای انتخاب نشده'} disabled={!pool.length}
            onPress={() => { session.plan = { mode: 'sections', ids: shuffle(pool).slice(0, 25), title: 'آموزش بر اساس دسته‌بندی' }; router.push('/run'); }} />
        </>
      )}
    </Screen>
  );
}
