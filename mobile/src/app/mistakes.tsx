// «بیشترین اشتباهات»: three panels (topics / fixed, i.e. right the last time / not fixed yet) and below them what the
// chosen panel stands for. At first, and with «مبحث», the topics (weakest first); with «اصلاح‌نشده» or «اصلاح‌شده»
// those questions by topic; a tapped topic shows its own questions. The questions are shown one at a time, as in the
// review, with previous / next on the floating glass bar; above each is its topic, with its short lesson and «تمرین این
// مبحث». The filter button beside the position opens a sheet of the categories (official sections) these mistakes are
// in, with their counts; only the chosen ones are then shown. No question is shown until something is chosen.
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Attempt, Question } from '@/lib/bank';
import { faNum, mistakeStats, shuffle, type MistakeStat } from '@/lib/logic';
import { topicFa } from '@/lib/names';
import { topicPracticeIds } from '@/lib/practice';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Icon } from '@/ui/icon';
import { BarCount, FootBtn, GlassBar } from '@/ui/glass-bar';
import { Backdrop, Button, Card, T, tap } from '@/ui/kit';
import { ReviewCard, uiText } from '@/ui/review';
import { DA_FONT, useColors, useIsDark } from '@/ui/theme';

type View_ = 'topics' | 'open' | 'fixed' | { topic: string };
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
  const [view, setView] = useState<View_>('topics');
  const [lessonOpen, setLessonOpen] = useState<Record<string, boolean>>({});
  const [k, setK] = useState(0); // the question shown
  // The chosen categories (section numbers; none = all), and the category sheet with its choice before «اعمال».
  const [secs, setSecs] = useState<number[]>([]);
  const [sheet, setSheet] = useState<number[] | null>(null);
  const scroll = useRef<ScrollView>(null);
  const bodyY = useRef(0);
  if (!bank) return null;
  const lang = settings.lang === 'en' ? 'en' : 'da';

  const { acc, sorted } = topicGroups(attempts, Q);
  const accOf = (code: string) => { const x = acc.get(code); return x && x.n ? x.ok / x.n : 0; };
  const open = sorted.reduce((n, g) => n + g.open, 0), fixed = sorted.reduce((n, g) => n + g.fixed, 0);
  const keep = (st: MistakeStat) => typeof view === 'object' || (view === 'open' ? !st.lastOk : st.lastOk);
  const tone = (p: number) => (p >= 0.8 ? c.ok : p >= 0.6 ? c.warn : c.bad);

  const practiceAll = () => practice(shuffle(sorted.flatMap(g => g.list.filter(st => !st.lastOk).map(st => st.id))).slice(0, 25), 'تمرین اشتباهات');
  const practiceTopic = (code: string) => practice(topicPracticeIds(bank, sorted.find(g => g.c === code)?.list ?? [], code), topicFa(bank, code));
  // Show what a panel or a topic stands for, and bring it into view.
  const choose = (v: View_) => {
    tap(); setView(v); setK(0); setSecs([]);
    setTimeout(() => scroll.current?.scrollTo({ y: Math.max(0, bodyY.current - 8), animated: true }), 50);
  };
  const sel = (v: 'topics' | 'open' | 'fixed') => view === v;
  const shown = typeof view === 'object' ? sorted.filter(g => g.c === view.topic) : view === 'topics' ? [] : sorted.filter(g => g.list.some(keep));
  const sectionOf = (code: string) => +String(code).split('.')[0];
  const all = shown.flatMap(g => g.list.filter(keep).map(st => ({ g, st })));
  const items = secs.length ? all.filter(x => secs.includes(sectionOf(x.g.c))) : all;
  // The categories of the questions on show, with how many of them each has.
  const cats = bank.sections.map(sec => ({ ...sec, count: all.filter(x => sectionOf(x.g.c) === sec.n).length })).filter(x => x.count);
  const at = Math.min(k, Math.max(0, items.length - 1)), cur = items[at];
  const ui = uiText(lang);
  const step = (to: number) => { setK(to); scroll.current?.scrollTo({ y: Math.max(0, bodyY.current - 8), animated: true }); };
  return (
    <Backdrop>
      <ScrollView ref={scroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: ins.top + 14, paddingHorizontal: 16, paddingBottom: ins.bottom + (cur ? 100 : 40), gap: 14, maxWidth: 760, width: '100%', alignSelf: 'center' }}>
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
                <T style={{ fontSize: 12.5, color: c.muted }}>روی هر بخش بزنید تا سؤال‌هایش نمایش داده شود</T>
              </View>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {([['topics', faNum(sorted.length), 'مبحث', c.text], ['fixed', faNum(fixed), 'سؤال اصلاح‌شده', c.ok], ['open', faNum(open), 'سؤال اصلاح‌نشده', c.bad]] as const).map(([v, n, l, col]) => {
                  const on = sel(v) || (v === 'topics' && typeof view === 'object');
                  return (
                    <Pressable key={v} onPress={() => choose(v)} style={{ flex: 1 }} accessibilityRole="tab" accessibilityState={{ selected: on }}>
                      <View style={{ alignItems: 'center', paddingVertical: 8, borderRadius: 8, borderWidth: 1.5, borderColor: on ? (dark ? c.link : c.accent) : 'transparent', backgroundColor: on ? c.checked : c.surface2 }}>
                        <T style={{ fontSize: 18, fontWeight: '800', color: col, textAlign: 'center' }}>{n}</T>
                        <T style={{ fontSize: 11.5, color: on ? c.link : c.muted, fontWeight: on ? '700' : '400', textAlign: 'center' }}>{l}</T>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </Card>
            {/* What the chosen panel stands for */}
            <View onLayout={e => { bodyY.current = e.nativeEvent.layout.y; }} style={{ marginTop: -14 }} />
            {view === 'topics' ? (
              <Card style={{ gap: 6 }}>
                <T style={{ fontSize: 12.5, color: c.muted }}>ضعیف‌ترین مبحث بالا — روی هر مبحث بزنید</T>
                <View>
                  {sorted.map((g, i) => {
                    const p = accOf(g.c);
                    return (
                      <Pressable key={g.c} onPress={() => choose({ topic: g.c })} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
                        <View style={{ gap: 6, paddingVertical: 10, borderTopWidth: i ? 1 : 0, borderTopColor: c.line }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <T style={{ flex: 1, fontSize: 14, fontWeight: '700' }} numberOfLines={1}>{topicFa(bank, g.c)}</T>
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
                    );
                  })}
                </View>
                <T style={{ fontSize: 12.5, lineHeight: 21, color: c.muted }}>پیشنهاد: از بالای این فهرست شروع کنید؛ آموزش کوتاه هر مبحث را بخوانید و سپس با «تمرین این مبحث» سؤال‌های همان مبحث را دوباره جواب دهید تا از «اصلاح‌نشده» به «اصلاح‌شده» بروند.</T>
              </Card>
            ) : null}
            {/* The chosen question with its topic above it */}
            {view === 'topics' ? null : cur ? (() => {
              const { g, st } = cur, t = bank.topics[g.c];
              return (
                <View style={{ gap: 10 }}>
                  <View style={{ gap: 6, marginTop: 10, marginHorizontal: 2 }}>
                    <T style={{ fontSize: 16, fontWeight: '700' }}>{topicFa(bank, g.c)}</T>
                    <T style={{ fontSize: 12.5, color: c.muted }}>{faNum(Math.round(accOf(g.c) * 100))}٪ پاسخ درست، {faNum(g.open)} مورد، {faNum(g.fixed)} اصلاح‌شده</T>
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
                  <ReviewCard key={`${typeof view === 'object' ? view.topic : view}-${st.id}`} q={Q.get(st.id)!} it={{ ok: st.lastOk, a: st.lastA }} lang={lang} fa={settings.showFa} alwaysOpen
                    badge={{ text: `${faNum(st.wrong)} اشتباه در ${faNum(st.seen)} آزمون`, fg: st.lastOk ? c.ok : c.warn, bg: st.lastOk ? c.okSoft : c.warnSoft }} />
                </View>
              );
            })() : <Card><T style={{ textAlign: 'center', color: c.muted, paddingVertical: 8 }}>{view === 'open' ? 'هیچ سؤالی در حالت «اصلاح‌نشده» نیست؛ عالی! ✨' : 'موردی نیست.'}</T></Card>}
            {view === 'topics' ? null : <T style={{ color: c.muted, fontSize: 12.5, textAlign: 'center' }}>«شما انتخاب کردید / انتخاب نکردید» مربوط به آخرین باری است که این سؤال را جواب داده‌اید.</T>}
          </>
        )}
      </ScrollView>
      {/* As in the review: previous / the position / next, in the questions' language */}
      {cur ? (
        <GlassBar
          start={<FootBtn label={ui.prev} icon="arrowLeft" round disabled={!at} onPress={() => step(at - 1)} />}
          middle={
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <BarCount n={at + 1} of={items.length} />
              <Pressable onPress={() => { tap(); setSheet(secs); }} hitSlop={6} accessibilityRole="button" accessibilityLabel="انتخاب دسته‌بندی‌ها"
                style={({ pressed }) => ({ width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.75 : 1,
                  backgroundColor: secs.length ? c.accent : c.accentSoft })}>
                <Icon name="filter" size={20} color={secs.length ? '#fff' : c.link} />
              </Pressable>
            </View>
          }
          end={<FootBtn label={ui.next} icon="arrowRight" round disabled={at === items.length - 1} onPress={() => step(at + 1)} />} />
      ) : null}
      {/* The categories of these mistakes, to choose from */}
      <Modal visible={!!sheet} transparent animationType="fade" onRequestClose={() => setSheet(null)}>
        <Pressable onPress={() => setSheet(null)} style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: dark ? 'rgba(0,0,0,0.55)' : 'rgba(20,40,40,0.35)' }}>
          <Pressable onPress={() => {}} style={{ maxHeight: '85%', width: '100%', maxWidth: 560, alignSelf: 'center', paddingTop: 20, paddingHorizontal: 18, paddingBottom: ins.bottom + 18, gap: 12,
            borderTopLeftRadius: 26, borderTopRightRadius: 26, backgroundColor: c.surface }}>
            <View style={{ gap: 2 }}>
              <T style={{ fontSize: 19, lineHeight: 28, fontWeight: '700', textAlign: 'center' }}>اشتباهات بر اساس دسته‌بندی</T>
              <T style={{ fontSize: 13, color: c.muted, textAlign: 'center' }}>دسته‌هایی را که می‌خواهید مرور کنید انتخاب کنید</T>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
              {cats.map(sec => {
                const on = !!sheet?.includes(sec.n);
                return (
                  <Pressable key={sec.n} onPress={() => { tap(); setSheet(on ? sheet!.filter(x => x !== sec.n) : [...(sheet || []), sec.n]); }}
                    accessibilityRole="checkbox" accessibilityState={{ checked: on }}
                    style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 14, borderWidth: 1.5,
                      borderColor: on ? c.accent : c.line, backgroundColor: on ? c.checked : c.surface, opacity: pressed ? 0.85 : 1 })}>
                    <View style={{ width: 22, height: 22, borderRadius: 6, borderWidth: 2, alignItems: 'center', justifyContent: 'center', borderColor: on ? c.accent : c.muted, backgroundColor: on ? c.accent : 'transparent' }}>
                      {on ? <Icon name="check" size={13} color="#fff" weight="bold" /> : null}
                    </View>
                    <T style={{ flex: 1, fontSize: 15, fontWeight: '600' }} numberOfLines={1}>{sec.fa}</T>
                    <T style={{ fontSize: 13.5, fontWeight: '700', color: c.bad }}>{faNum(sec.count)}</T>
                  </Pressable>
                );
              })}
            </ScrollView>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable onPress={() => { tap(); setSheet([]); }} accessibilityRole="button" style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.8 : 1 })}>
                <View style={{ height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accentSoft }}>
                  <T style={{ fontSize: 15, fontWeight: '700', color: c.link, textAlign: 'center' }}>همه</T>
                </View>
              </Pressable>
              <Pressable onPress={() => { tap(); setSecs(sheet || []); setK(0); setSheet(null); }} accessibilityRole="button" style={({ pressed }) => ({ flex: 2, opacity: pressed ? 0.85 : 1 })}>
                <View style={{ height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accent }}>
                  <T style={{ fontSize: 15, fontWeight: '700', color: '#fff', textAlign: 'center' }}>
                    {`نمایش ${faNum((sheet && sheet.length ? cats.filter(x => sheet.includes(x.n)) : cats).reduce((t, x) => t + x.count, 0))} سؤال`}
                  </T>
                </View>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </Backdrop>
  );
}
