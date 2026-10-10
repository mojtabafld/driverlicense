// «اشتباهات»: «تمرین همه‌ی اشتباهات», three panels (topics / fixed, i.e. right the last time / not fixed
// yet) and the weakest 5 topics. A panel opens its own page (/mistakes-view, with a back button): «مبحث» (or «نمایش
// همه») all the topics, «اصلاح‌نشده» or «اصلاح‌شده» those questions by topic; a tapped topic opens its own
// questions. The questions are shown one at a time, as in the
// review, with previous / next on the floating glass bar; above each is its topic, with its short lesson and «تمرین این
// مبحث». The filter button beside the position opens a sheet of the categories (official sections) these mistakes are
// in, with their counts; only the chosen ones are then shown. No question is shown until something is chosen.
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Attempt, Question } from '@/lib/bank';
import { faNum, mistakeStats, shuffle, type MistakeStat } from '@/lib/logic';
import { topicFa, topicName } from '@/lib/names';
import { topicPracticeIds } from '@/lib/practice';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Icon } from '@/ui/icon';
import { FootBtn, GlassBar } from '@/ui/glass-bar';
import { GlassTop } from '@/ui/liquid';
import { SideSwipe } from '@/ui/swipe';
import { ListButton } from '@/ui/question-list';
import { Sheet, SheetScroll } from '@/ui/sheet';
import { ActionButton, Backdrop, Button, Card, Enter, T, tap, usePageMotion, useTopOnFocus } from '@/ui/kit';
import { Marquee } from '@/ui/marquee';
import { ReviewCard, RevealScrollProvider, uiText, useRevealScroll } from '@/ui/review';
import { DA_FONT, useColors } from '@/ui/theme';

const TOPICS_SHOWN = 5; // topics listed on the overview; «نمایش همه» opens the topics page with all of them

export type View_ = 'topics' | 'open' | 'fixed' | { topic: string };
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

export default function Mistakes() { return <MistakesScreen />; }

// Without `detail` the overview; with it, the page of one panel or topic.
export function MistakesScreen({ detail }: { detail?: View_ }) {
  const c = useColors(), ins = useSafeAreaInsets();
  const { attempts, bank, Q, settings } = useApp();
  const view = detail;
  const motion = usePageMotion('push');
  const [lessonOpen, setLessonOpen] = useState<Record<string, boolean>>({});
  const [k, setK] = useState(0); // the question shown
  const [headH, setHeadH] = useState(0); // the glass title bar's height
  // The chosen categories (section numbers; none = all), and the category sheet with its ticks before applying them:
  // it opens with every category ticked when there is no filter, and «همه» ticks them all again.
  const [secs, setSecs] = useState<number[]>([]);
  const [sheet, setSheet] = useState<number[] | null>(null);
  const scroll = useRef<ScrollView>(null);
  useTopOnFocus(scroll); // back at the top whenever the page comes into view
  const reveal = useRevealScroll(scroll, headH); // AI panels scroll this page into view
  if (!bank) return null;
  const lang = settings.lang === 'en' ? 'en' : 'da';

  const { acc, sorted } = topicGroups(attempts, Q);
  const accOf = (code: string) => { const x = acc.get(code); return x && x.n ? x.ok / x.n : 0; };
  const open = sorted.reduce((n, g) => n + g.open, 0), fixed = sorted.reduce((n, g) => n + g.fixed, 0);
  const keep = (st: MistakeStat) => typeof view === 'object' || (view === 'open' ? !st.lastOk : st.lastOk);
  const tone = (p: number) => (p >= 0.8 ? c.ok : p >= 0.6 ? c.warn : c.bad);

  const practiceAll = () => practice(shuffle(sorted.flatMap(g => g.list.filter(st => !st.lastOk).map(st => st.id))).slice(0, 25), 'تمرین اشتباهات');
  const practiceTopic = (code: string) => practice(topicPracticeIds(sorted.find(g => g.c === code)?.list ?? []), topicName(bank, code));
  // A panel or a topic opens its own page.
  const choose = (v: View_) => {
    tap();
    router.push({ pathname: '/mistakes-view', params: typeof v === 'object' ? { topic: v.topic } : { v } });
  };
  const shown = !view || view === 'topics' ? [] : typeof view === 'object' ? sorted.filter(g => g.c === view.topic) : sorted.filter(g => g.list.some(keep));
  const title = !view ? 'اشتباهات' : view === 'topics' ? 'مباحث' : view === 'open' ? 'سؤال‌های اصلاح‌نشده' : view === 'fixed' ? 'سؤال‌های اصلاح‌شده' : topicName(bank, view.topic);
  const sectionOf = (code: string) => +String(code).split('.')[0];
  const all = shown.flatMap(g => g.list.filter(keep).map(st => ({ g, st })));
  const items = secs.length ? all.filter(x => secs.includes(sectionOf(x.g.c))) : all;
  // The categories of the questions on show, with how many of them each has.
  const picked = sheet ?? [], pickedN = picked.length;
  const cats = bank.sections.map(sec => ({ ...sec, count: all.filter(x => sectionOf(x.g.c) === sec.n).length })).filter(x => x.count);
  const at = Math.min(k, Math.max(0, items.length - 1)), cur = items[at];
  const ui = uiText(lang);
  const step = (to: number) => { setK(to); scroll.current?.scrollTo({ y: 0, animated: true }); };
  return (
    <Backdrop anim={motion.style}>
      <RevealScrollProvider value={reveal.value}>
      {/* Question by question a sideways swipe turns the questions; the overview pages go back with a drag from right to
          left. */}
      <SideSwipe pager={cur ? { i: at, n: items.length, go: step } : undefined} back={() => motion.leave(() => router.back())}>
      <ScrollView ref={scroll} {...reveal.scrollProps} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: headH + 14, paddingHorizontal: 16, paddingBottom: ins.bottom + (cur ? 100 : 40), gap: 14, maxWidth: 760, width: '100%', alignSelf: 'center' }}>
        {!view && open ? <Button label="تمرین همه‌ی اشتباهات" icon="refresh" onPress={practiceAll} /> : null}
        {!sorted.length ? <Card><T style={{ textAlign: 'center', color: c.muted, paddingVertical: 8 }}>هنوز اشتباهی ثبت نشده است.</T></Card> : (
          <>
            {/* «وضعیت مباحث»: the three panels, each opening its own page */}
            {view ? null : <Card style={{ gap: 12 }}>
              <View style={{ gap: 2 }}>
                <T style={{ fontSize: 16, fontWeight: '700' }}>وضعیت مباحث</T>
                <T style={{ fontSize: 12.5, color: c.muted }}>روی هر بخش بزنید تا سؤال‌هایش نمایش داده شود</T>
              </View>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {([['topics', faNum(sorted.length), 'مبحث', c.text], ['fixed', faNum(fixed), 'سؤال اصلاح‌شده', c.ok], ['open', faNum(open), 'سؤال اصلاح‌نشده', c.bad]] as const).map(([v, n, l, col]) => (
                  <Pressable key={v} onPress={() => choose(v)} style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.8 : 1 })} accessibilityRole="button">
                    <View style={{ alignItems: 'center', paddingVertical: 8, borderRadius: 8, backgroundColor: c.surface2 }}>
                      <T style={{ fontSize: 18, fontWeight: '800', color: col, textAlign: 'center' }}>{n}</T>
                      <T style={{ fontSize: 11.5, color: c.muted, textAlign: 'center' }}>{l}</T>
                    </View>
                  </Pressable>
                ))}
              </View>
            </Card>}
            {/* The topics, weakest first: the first 5 on the overview, all of them on the topics page */}
            {!view || view === 'topics' ? (
              <Card style={{ gap: 6 }}>
                <T style={{ fontSize: 12.5, color: c.muted }}>ضعیف‌ترین مبحث بالا — روی هر مبحث بزنید</T>
                <View>
                  {(view ? sorted : sorted.slice(0, TOPICS_SHOWN)).map((g, i) => {
                    const p = accOf(g.c);
                    return (
                      <Enter key={g.c}>
                      <Pressable onPress={() => choose({ topic: g.c })} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
                        <View style={{ gap: 6, paddingVertical: 10, borderTopWidth: i ? 1 : 0, borderTopColor: c.line }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            {/* A long topic name glides to show all of it. */}
                            <Marquee text={topicName(bank, g.c)} height={24} bg={c.surface} style={{ fontSize: 14, lineHeight: 24, fontWeight: '700' }} />
                            <T style={{ fontSize: 12.5, fontWeight: '700', color: tone(p) }}>{faNum(Math.round(p * 100))}٪ پاسخ درست</T>
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
                      </Enter>
                    );
                  })}
                </View>
                {!view && sorted.length > TOPICS_SHOWN ? (
                  <Button kind="glass" label={`نمایش همه‌ی ${faNum(sorted.length)} مبحث`} icon="chevronLeft" onPress={() => choose('topics')} />
                ) : null}
                {view ? <T style={{ fontSize: 12.5, lineHeight: 21, color: c.muted }}>پیشنهاد: از بالای این فهرست شروع کنید؛ آموزش کوتاه هر مبحث را بخوانید و سپس با «تمرین این مبحث» سؤال‌های همان مبحث را دوباره جواب دهید تا از «اصلاح‌نشده» به «اصلاح‌شده» بروند.</T> : null}
              </Card>
            ) : null}
            {/* The chosen question with its topic above it */}
            {!view || view === 'topics' ? null : cur ? (() => {
              const { g, st } = cur, t = bank.topics[g.c];
              return (
                <View style={{ gap: 10 }}>
                  <View style={{ gap: 6, marginHorizontal: 2 }}>
                    <T style={{ fontSize: 16, fontWeight: '700' }}>{topicFa(bank, g.c)}</T>
                    <T style={{ fontSize: 12.5, color: c.muted }}>{faNum(Math.round(accOf(g.c) * 100))}٪ پاسخ درست، {faNum(g.open)} مورد، {faNum(g.fixed)} اصلاح‌شده</T>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      {t?.lesson ? (
                        <Pressable onPress={() => { tap(); setLessonOpen({ ...lessonOpen, [g.c]: !lessonOpen[g.c] }); }}
                          style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 99, borderWidth: 1, borderColor: lessonOpen[g.c] ? c.strong : c.line, backgroundColor: lessonOpen[g.c] ? c.strong : c.surface }}>
                          <Icon name="learn" size={15} color={lessonOpen[g.c] ? c.strongFg : c.text} weight="semibold" />
                          <T style={{ fontSize: 13, fontWeight: '600', color: lessonOpen[g.c] ? c.strongFg : c.text }}>آموزش کوتاه</T>
                        </Pressable>
                      ) : null}
                      <Pressable onPress={() => { tap(); practiceTopic(g.c); }}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 99, borderWidth: 1, borderColor: c.line, backgroundColor: c.surface }}>
                        <Icon name="refresh" size={15} color={c.text} weight="semibold" />
                        <T style={{ fontSize: 13, fontWeight: '600', color: c.text }}>تمرین این مبحث</T>
                      </Pressable>
                    </View>
                  </View>
                  {t?.lesson && lessonOpen[g.c] ? (
                    <View style={{ paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12, backgroundColor: c.surface2 }}>
                      <T style={{ fontSize: 15, fontWeight: '700', marginBottom: 6 }}>📘 {topicFa(bank, g.c)} <T style={{ fontSize: 12.5, fontWeight: '500', color: c.muted, fontFamily: DA_FONT }}>({t.da})</T></T>
                      {t.lesson.map((l, i) => <View key={i} style={{ flexDirection: 'row', gap: 8, marginVertical: 3 }}><T style={{ fontSize: 14 }}>•</T><T style={{ flex: 1, fontSize: 14 }}>{l}</T></View>)}
                    </View>
                  ) : null}
                  <ReviewCard key={`${typeof view === 'object' ? view.topic : view}-${st.id}`} q={Q.get(st.id)!} it={{ ok: st.lastOk, a: st.lastA }} lang={lang} fa={settings.showFa} alwaysOpen
                    badge={{ text: `${faNum(st.wrong)} اشتباه در ${faNum(st.seen)} آزمون`, fg: st.lastOk ? c.ok : c.warn, bg: st.lastOk ? c.okSoft : c.warnSoft }} />
                </View>
              );
            })() : <Card><T style={{ textAlign: 'center', color: c.muted, paddingVertical: 8 }}>{view === 'open' ? 'هیچ سؤالی در حالت «اصلاح‌نشده» نیست؛ عالی! ✨' : 'موردی نیست.'}</T></Card>}
          </>
        )}
      </ScrollView>
      </SideSwipe>
      </RevealScrollProvider>
      {/* The title row, fixed on Liquid Glass over the page. */}
      <GlassTop onHeight={setHeadH}>
        <View style={{ paddingTop: ins.top + 10, paddingBottom: 10, paddingHorizontal: 16, width: '100%', maxWidth: 760, alignSelf: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Pressable onPress={() => { tap(); motion.leave(() => router.back()); }} accessibilityLabel="بازگشت" hitSlop={6}
              style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface, borderWidth: 1.5, borderColor: c.line }}>
              <Icon name="arrowRight" size={20} color={c.text} />
            </Pressable>
            {/* A long title glides to show all of it instead of ending in «…». */}
            <Marquee text={title} height={34} style={{ fontSize: 24, lineHeight: 34, fontWeight: '700' }} />
          </View>
        </View>
      </GlassTop>
      {/* As in the review: previous / the position / next, in the questions' language */}
      {cur ? (
        <GlassBar
          start={<FootBtn label={ui.prev} icon="arrowLeft" disabled={!at} onPress={() => step(at - 1)} />}
          middle={<ListButton n={at + 1} of={items.length} icon="filter" label="انتخاب دسته‌بندی‌ها" dot={!!secs.length} onPress={() => setSheet(secs.length ? secs : cats.map(x => x.n))} />}
          end={<FootBtn label={ui.next} icon="arrowRight" disabled={at === items.length - 1} onPress={() => step(at + 1)} />} />
      ) : null}
      {/* The categories of these mistakes, to choose from */}
      <Sheet open={!!sheet} onClose={() => setSheet(null)} style={{ gap: 12 }}>
        <View style={{ gap: 2 }}>
          <T style={{ fontSize: 19, lineHeight: 28, fontWeight: '700', textAlign: 'center' }}>اشتباهات بر اساس دسته‌بندی</T>
          <T style={{ fontSize: 13, color: c.muted, textAlign: 'center' }}>دسته‌هایی را که می‌خواهید مرور کنید انتخاب کنید</T>
        </View>
        <SheetScroll contentContainerStyle={{ gap: 8 }}>
          {cats.map(sec => {
            const on = picked.includes(sec.n);
            return (
              <Pressable key={sec.n} onPress={() => { tap(); setSheet(on ? picked.filter(x => x !== sec.n) : [...picked, sec.n]); }}
                accessibilityRole="checkbox" accessibilityState={{ checked: on }}
                style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 14, borderWidth: 1.5,
                  borderColor: on ? c.strong : c.line, backgroundColor: on ? c.surface2 : c.surface, opacity: pressed ? 0.85 : 1 })}>
                <View style={{ width: 22, height: 22, borderRadius: 6, borderWidth: 2, alignItems: 'center', justifyContent: 'center', borderColor: on ? c.strong : c.muted, backgroundColor: on ? c.strong : 'transparent' }}>
                  {on ? <Icon name="check" size={13} color={c.strongFg} weight="bold" /> : null}
                </View>
                <T style={{ flex: 1, fontSize: 15, fontWeight: '600' }} numberOfLines={1}>{sec.fa}</T>
                <T style={{ fontSize: 13.5, fontWeight: '700', color: c.bad }}>{faNum(sec.count)}</T>
              </Pressable>
            );
          })}
        </SheetScroll>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <ActionButton label="همه" icon="checkCircle" tone="soft" onPress={() => setSheet(cats.map(x => x.n))} style={{ flex: 1 }} />
          <ActionButton disabled={!pickedN} icon="eye" style={{ flex: 2 }} onPress={() => { setSecs(pickedN >= cats.length ? [] : picked); setK(0); setSheet(null); }}
            label={pickedN ? `نمایش ${faNum(cats.filter(x => picked.includes(x.n)).reduce((t, x) => t + x.count, 0))} سؤال` : 'یک دسته را انتخاب کنید'} />
        </View>
      </Sheet>
    </Backdrop>
  );
}
