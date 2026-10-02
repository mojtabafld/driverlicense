// «بیشترین اشتباهات», like the site's mistakes page: how each topic is going (weakest first), then every question
// answered wrong at least once, grouped by topic, as a review card with the last answer given. Tabs: still wrong /
// fixed (right the last time) / all. Each topic has its short lesson and «تمرین این مبحث».
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Attempt, Question } from '@/lib/bank';
import { faNum, mistakeStats, shuffle, type MistakeStat } from '@/lib/logic';
import { topicFa } from '@/lib/names';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Icon } from '@/ui/icon';
import { Backdrop, Button, Card, T, tap } from '@/ui/kit';
import { ReviewCard } from '@/ui/review';
import { DA_FONT, useColors, useIsDark } from '@/ui/theme';

type Filter = 'open' | 'fixed' | 'all';
type Group = { c: string; list: MistakeStat[]; open: number; fixed: number; wrong: number };

// Accuracy per topic over every answer given in it, and the questions answered wrong at least once grouped by
// topic: most still-wrong first, then the lowest accuracy, then the most mistakes.
function topicGroups(attempts: Attempt[], Q: Map<number, Question>) {
  const acc = new Map<string, { ok: number; n: number }>();
  for (const a of attempts) for (const it of a.items) {
    const q = Q.get(it.id); if (!q) continue;
    const x = acc.get(q.c) || { ok: 0, n: 0 }; x.n++; if (it.ok) x.ok++; acc.set(q.c, x);
  }
  const accOf = (code: string) => { const x = acc.get(code); return x && x.n ? x.ok / x.n : 0; };
  const groups = new Map<string, Group>();
  for (const st of mistakeStats(attempts, id => Q.has(id))) {
    const code = Q.get(st.id)!.c, g = groups.get(code) || { c: code, list: [], open: 0, fixed: 0, wrong: 0 };
    g.list.push(st); g.wrong += st.wrong; if (st.lastOk) g.fixed++; else g.open++; groups.set(code, g);
  }
  const sorted = [...groups.values()].sort((a, b) => b.open - a.open || accOf(a.c) - accOf(b.c) || b.wrong - a.wrong);
  return { acc, sorted, groups };
}

// Start a practice exam of these questions.
function practice(ids: number[], title: string) { session.plan = { mode: 'mistakes', ids, title }; router.push('/run'); }

export default function Mistakes() {
  const c = useColors(), dark = useIsDark(), ins = useSafeAreaInsets();
  const { attempts, bank, Q, settings } = useApp();
  const [filter, setFilter] = useState<Filter>('open');
  const [lessonOpen, setLessonOpen] = useState<Record<string, boolean>>({});
  const scroll = useRef<ScrollView>(null);
  const groupY = useRef<Record<string, number>>({});
  if (!bank) return null;
  const lang = settings.lang === 'en' ? 'en' : 'da';

  const { acc, sorted } = topicGroups(attempts, Q);
  const accOf = (code: string) => { const x = acc.get(code); return x && x.n ? x.ok / x.n : 0; };
  const open = sorted.reduce((n, g) => n + g.open, 0), fixed = sorted.reduce((n, g) => n + g.fixed, 0);
  const keep = (st: MistakeStat) => filter === 'all' || (filter === 'open' ? !st.lastOk : st.lastOk);
  const tone = (p: number) => (p >= 0.8 ? c.ok : p >= 0.6 ? c.warn : c.bad);

  const practiceAll = () => practice(shuffle(sorted.flatMap(g => g.list.filter(st => !st.lastOk).map(st => st.id))).slice(0, 25), 'تمرین اشتباهات');
  // One topic: its still-wrong questions first, then the fixed ones, then other questions of the topic (10 at most).
  const practiceTopic = (code: string) => {
    const stats = sorted.find(g => g.c === code)?.list ?? [];
    const first = [...shuffle(stats.filter(st => !st.lastOk).map(st => st.id)), ...shuffle(stats.filter(st => st.lastOk).map(st => st.id))];
    const rest = shuffle(bank.questions.filter(q => q.c === code && !first.includes(q.id)).map(q => q.id));
    practice(shuffle([...first, ...rest].slice(0, 10)), topicFa(bank, code));
  };
  const jump = (code: string) => {
    tap();
    const go = () => { const y = groupY.current[code]; if (y != null) scroll.current?.scrollTo({ y: y - 8, animated: true }); };
    if (!sorted.find(g => g.c === code)?.list.some(keep)) { setFilter('all'); setTimeout(go, 50); } else go();
  };

  const tabs: { v: Filter; label: string }[] = [
    { v: 'open', label: `هنوز اشتباه (${faNum(open)})` }, { v: 'fixed', label: `اصلاح‌شده (${faNum(fixed)})` }, { v: 'all', label: `همه (${faNum(open + fixed)})` },
  ];
  return (
    <Backdrop>
      <ScrollView ref={scroll} contentContainerStyle={{ paddingTop: ins.top + 14, paddingHorizontal: 16, paddingBottom: ins.bottom + 40, gap: 14, maxWidth: 760, width: '100%', alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={() => { tap(); router.back(); }} accessibilityLabel="بازگشت" hitSlop={6}
            style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface, borderWidth: 1.5, borderColor: c.line }}>
            <Icon name="arrowRight" size={20} color={c.link} />
          </Pressable>
          <T style={{ flex: 1, fontSize: 24, lineHeight: 34, fontWeight: '700' }}>بیشترین اشتباهات</T>
        </View>
        {open ? <Button label="تمرین همه‌ی اشتباهات" onPress={practiceAll} /> : null}
        {!sorted.length ? <Card><T style={{ textAlign: 'center', color: c.muted, paddingVertical: 8 }}>هنوز اشتباهی ثبت نشده است.</T></Card> : (
          <>
            {/* «وضعیت مباحث»: every topic with mistakes, weakest first */}
            <Card style={{ gap: 12 }}>
              <View style={{ gap: 2 }}>
                <T style={{ fontSize: 16, fontWeight: '700' }}>وضعیت مباحث</T>
                <T style={{ fontSize: 12.5, color: c.muted }}>ضعیف‌ترین مبحث بالا — روی هر مبحث بزنید</T>
              </View>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {[[faNum(open), 'سؤال هنوز اشتباه', c.bad], [faNum(fixed), 'سؤال اصلاح‌شده', c.ok], [faNum(sorted.length), 'مبحث', c.text]].map(([n, l, col]) => (
                  <View key={l} style={{ flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 8, backgroundColor: c.surface2 }}>
                    <T style={{ fontSize: 18, fontWeight: '800', color: col, textAlign: 'center' }}>{n}</T>
                    <T style={{ fontSize: 11.5, color: c.muted, textAlign: 'center' }}>{l}</T>
                  </View>
                ))}
              </View>
              <View>
                {sorted.map((g, i) => {
                  const p = accOf(g.c);
                  return (
                    <Pressable key={g.c} onPress={() => jump(g.c)} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
                      <View style={{ gap: 6, paddingVertical: 10, borderTopWidth: i ? 1 : 0, borderTopColor: c.line }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <T style={{ flex: 1, fontSize: 14, fontWeight: '700' }} numberOfLines={1}>{topicFa(bank, g.c)}</T>
                          <T style={{ fontSize: 12.5, fontWeight: '700', color: tone(p) }}>{faNum(Math.round(p * 100))}٪ دقت</T>
                          <Icon name="chevronLeft" size={14} color={c.faint} />
                        </View>
                        <View style={{ height: 6, borderRadius: 3, backgroundColor: c.surface2, overflow: 'hidden', flexDirection: 'row' }}>
                          <View style={{ width: `${Math.max(p * 100, 2)}%`, borderRadius: 3, backgroundColor: tone(p) }} />
                        </View>
                        <T style={{ fontSize: 12, color: c.muted }}>
                          {g.open ? <T style={{ fontSize: 12, color: c.bad, fontWeight: '700' }}>{faNum(g.open)} مورد</T> : <T style={{ fontSize: 12, color: c.ok, fontWeight: '700' }}>همه اصلاح شد ✓</T>}
                          {g.fixed && g.open ? <T style={{ fontSize: 12, color: c.ok }}>، {faNum(g.fixed)} اصلاح‌شده</T> : null}
                        </T>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
              <T style={{ fontSize: 12.5, lineHeight: 21, color: c.muted }}>پیشنهاد: از بالای این فهرست شروع کنید؛ آموزش کوتاه هر مبحث را بخوانید و سپس با «تمرین این مبحث» سؤال‌های همان مبحث را دوباره جواب دهید تا از «هنوز اشتباه» به «اصلاح‌شده» بروند.</T>
            </Card>
            {/* Tabs */}
            <View style={{ flexDirection: 'row', padding: 3, gap: 3, borderRadius: 8, backgroundColor: c.surface2 }}>
              {tabs.map(o => {
                const on = o.v === filter;
                return (
                  <Pressable key={o.v} onPress={() => { tap(); setFilter(o.v); }} style={{ flex: 1 }} accessibilityRole="tab" accessibilityState={{ selected: on }}>
                    <View style={{ paddingVertical: 7, borderRadius: 6, backgroundColor: on ? c.surface : 'transparent' }}>
                      <T style={{ fontSize: 13, fontWeight: '600', color: on ? c.link : c.muted, textAlign: 'center' }}>{o.label}</T>
                    </View>
                  </Pressable>
                );
              })}
            </View>
            {/* Groups */}
            {sorted.some(g => g.list.some(keep)) ? sorted.map(g => {
              const list = g.list.filter(keep), t = bank.topics[g.c];
              if (!list.length) return null;
              return (
                <View key={g.c} onLayout={e => { groupY.current[g.c] = e.nativeEvent.layout.y; }} style={{ gap: 10 }}>
                  <View style={{ gap: 6, marginTop: 10, marginHorizontal: 2 }}>
                    <T style={{ fontSize: 16, fontWeight: '700' }}>{topicFa(bank, g.c)}</T>
                    <T style={{ fontSize: 12.5, color: c.muted }}>دقت {faNum(Math.round(accOf(g.c) * 100))}٪، {faNum(g.open)} مورد، {faNum(g.fixed)} اصلاح‌شده</T>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      {t?.lesson ? (
                        <Pressable onPress={() => { tap(); setLessonOpen({ ...lessonOpen, [g.c]: !lessonOpen[g.c] }); }}
                          style={{ paddingVertical: 6, paddingHorizontal: 12, borderRadius: 99, borderWidth: 1, borderColor: lessonOpen[g.c] ? (dark ? c.link : c.accent) : c.line, backgroundColor: lessonOpen[g.c] ? c.checked : c.surface }}>
                          <T style={{ fontSize: 13, fontWeight: '600', color: c.link }}>آموزش کوتاه</T>
                        </Pressable>
                      ) : null}
                      <Pressable onPress={() => { tap(); practiceTopic(g.c); }}
                        style={{ paddingVertical: 6, paddingHorizontal: 12, borderRadius: 99, borderWidth: 1, borderColor: c.line, backgroundColor: c.surface }}>
                        <T style={{ fontSize: 13, fontWeight: '600', color: c.link }}>تمرین این مبحث</T>
                      </Pressable>
                    </View>
                  </View>
                  {t?.lesson && lessonOpen[g.c] ? (
                    <View style={{ paddingVertical: 14, paddingHorizontal: 16, borderRadius: 6, backgroundColor: c.accentSoft, borderRightWidth: 4, borderRightColor: dark ? c.link : c.accent }}>
                      <T style={{ fontSize: 15, fontWeight: '700', marginBottom: 6 }}>📘 {topicFa(bank, g.c)} <T style={{ fontSize: 12.5, fontWeight: '500', color: c.muted, fontFamily: DA_FONT }}>({t.da})</T></T>
                      {t.lesson.map((l, i) => <View key={i} style={{ flexDirection: 'row', gap: 8, marginVertical: 3 }}><T style={{ fontSize: 14 }}>•</T><T style={{ flex: 1, fontSize: 14 }}>{l}</T></View>)}
                    </View>
                  ) : null}
                  {list.map(st => (
                    <ReviewCard key={`${filter}-${st.id}`} q={Q.get(st.id)!} it={{ ok: st.lastOk, a: st.lastA }} lang={lang} fa={settings.showFa}
                      badge={{ text: `${faNum(st.wrong)} اشتباه در ${faNum(st.seen)} آزمون`, fg: st.lastOk ? c.ok : c.warn, bg: st.lastOk ? c.okSoft : c.warnSoft }} />
                  ))}
                </View>
              );
            }) : <Card><T style={{ textAlign: 'center', color: c.muted, paddingVertical: 8 }}>{filter === 'open' ? 'هیچ سؤالی در حالت «هنوز اشتباه» نیست؛ عالی! ✨' : 'موردی نیست.'}</T></Card>}
            <T style={{ color: c.muted, fontSize: 12.5, textAlign: 'center' }}>«شما انتخاب کردید / انتخاب نکردید» مربوط به آخرین باری است که این سؤال را جواب داده‌اید.</T>
          </>
        )}
      </ScrollView>
    </Backdrop>
  );
}
