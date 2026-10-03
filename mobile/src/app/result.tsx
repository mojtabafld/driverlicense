// Result and answer review, laid out like the site.
// A past exam or lesson: the site's question-by-question review (back button, tabs, a result line that flies into
// «جزئیات آزمون» after 3 seconds, one open card at a time with Forrige / Næste, and the AI summary of the mistakes at the end).
// One just handed in: the site's result card (ring, verdict, numbers, next steps) and the list of review cards.
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

import type { Attempt, Item } from '@/lib/bank';
import { faNum, fmtDate, isFull, passMin, scoreOf, shuffle } from '@/lib/logic';
import { fmtDateTime, fmtTime, modeName } from '@/lib/names';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Icon } from '@/ui/icon';
import { Backdrop, Button, Card, L, T, physical, tap, usePageMotion } from '@/ui/kit';
import { BarCount, FootBtn, GlassBar } from '@/ui/glass-bar';
import { AiSummary, ReviewCard, hasSummary, uiText } from '@/ui/review';
import { NUM_FONT, useColors, useIsDark } from '@/ui/theme';

type Filter = 'wrong' | 'saved' | 'all';
type Row = { it: Item; i: number };

// Leave the review and go to a tab (the review is shown over the tabs).
const goTo = (path: '/' | '/exam' | '/learn') => {
  try { router.dismissAll(); } catch {}
  router.navigate(path);
};

// The site's .tabs: wrong / saved (only when some were bookmarked during the exam) / all.
function Tabs({ value, onChange, n, wrong, savedN }: { value: Filter; onChange: (f: Filter) => void; n: number; wrong: number; savedN: number }) {
  const c = useColors();
  const opts: { v: Filter; label: string }[] = [
    { v: 'wrong', label: `اشتباهات (${faNum(wrong)})` },
    ...(savedN ? [{ v: 'saved' as Filter, label: `ذخیره‌شده‌ها (${faNum(savedN)})` }] : []),
    { v: 'all', label: `همه (${faNum(n)})` },
  ];
  return (
    <View style={{ flexDirection: 'row', padding: 3, gap: 3, borderRadius: 8, backgroundColor: c.surface2, alignSelf: 'flex-start' }}>
      {opts.map(o => {
        const on = o.v === value;
        return (
          <Pressable key={o.v} onPress={() => { tap(); onChange(o.v); }} accessibilityRole="tab" accessibilityState={{ selected: on }}>
            <View style={{ paddingVertical: 7, paddingHorizontal: 14, borderRadius: 6, backgroundColor: on ? c.surface : 'transparent' }}>
              <T style={{ fontSize: 14, fontWeight: '600', color: on ? c.link : c.muted, textAlign: 'center' }}>{o.label}</T>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

function RingSvg({ size, stroke, pct, color, track }: { size: number; stroke: number; pct: number; color: string; track: string }) {
  const r = (size - stroke) / 2, C = 2 * Math.PI * r;
  return (
    <Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
      <Circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
      <Circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={`${C} ${C}`} strokeDashoffset={C * (1 - pct)} />
    </Svg>
  );
}

// The site's footer buttons of the step review (.st-nav): ghost «Forrige», primary «Næste».
const OldNote = () => {
  const c = useColors();
  return (
    <View style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6, backgroundColor: c.warnSoft }}>
      <T style={{ fontSize: 13, color: c.warn }}>این آزمون قبل از ذخیره‌ی پاسخ‌های تک‌تک گزینه‌ها انجام شده؛ فقط پاسخ‌های درست نمایش داده می‌شوند.</T>
    </View>
  );
};
const Empty = ({ text }: { text: string }) => {
  const c = useColors();
  return <Card><T style={{ textAlign: 'center', color: c.muted, paddingVertical: 8 }}>{text}</T></Card>;
};

export default function Result() {
  const c = useColors(), dark = useIsDark(), ins = useSafeAreaInsets();
  const { Q, settings, bank, aiLessons } = useApp();
  const motion = usePageMotion('push');
  const [a] = useState<Attempt | null>(() => session.result);
  const [fresh, setFresh] = useState(() => session.fresh);
  const n = a?.items.length ?? 0, right = a ? scoreOf(a) : 0, wrongN = n - right;
  const [filter, setFilter] = useState<Filter>(() => (fresh || wrongN ? 'wrong' : 'all'));
  const [k, setK] = useState(0);
  // The result line of a past review: shown for 3 s, then it shrinks and fades into the «جزئیات آزمون» button, which
  // fades in as it arrives (and brings the line back). `fade` goes 1 → 0; `to` is the way from the line to the button.
  const [line, setLine] = useState<'shown' | 'hidden'>('shown');
  const [faded, setFaded] = useState(false), [flying, setFlying] = useState(false);
  const [fade] = useState(() => new Animated.Value(1));
  const [btnIn] = useState(() => new Animated.Value(0));
  const [to, setTo] = useState({ x: 0, y: 0 });
  // Then the room it leaves closes smoothly (its height to 0, the gap below it too) instead of the page jumping.
  const [room] = useState(() => new Animated.Value(1));
  const [panelH, setPanelH] = useState(0);
  const panelRef = useRef<View>(null), btnRef = useRef<View>(null);
  const scroll = useRef<ScrollView>(null);
  useEffect(() => {
    if (fresh) return;
    let raf = 0;
    const t = setTimeout(() => {
      setFaded(true); setFlying(true); // the button takes its place (still invisible), so it can be measured
      raf = requestAnimationFrame(() => {
        const go = (x: number, y: number) => {
          setTo({ x, y });
          Animated.parallel([
            Animated.timing(fade, { toValue: 0, duration: 520, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }),
            Animated.timing(btnIn, { toValue: 1, duration: 260, delay: 300, easing: Easing.out(Easing.quad), useNativeDriver: true }),
          ]).start(() => Animated.timing(room, { toValue: 0, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: false })
            .start(() => { setLine('hidden'); setFlying(false); room.setValue(1); }));
        };
        const p = panelRef.current, b = btnRef.current;
        if (!p || !b) return go(0, -20);
        p.measureInWindow((px, py, pw, ph) => b.measureInWindow((bx, by, bw, bh) =>
          go(bx + bw / 2 - (px + pw / 2), by + bh / 2 - (py + ph / 2))));
      });
    }, 3000);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [fresh, fade, btnIn, room]);
  useEffect(() => { if (!a) router.back(); }, [a]);
  if (!a) return null;

  const lang = settings.lang === 'en' ? 'en' : 'da', ui = uiText(lang);
  const full = isFull(a), pass = full && right >= passMin(n), pct = right / Math.max(n, 1), pctN = Math.round(pct * 100);
  const isLesson = a.mode === 'lesson';
  const fa = isLesson ? false : settings.showFa;
  const rows: Row[] = a.items.map((it, i) => ({ it, i })).filter(r => Q.has(r.it.id));
  const list = rows.filter(r => filter === 'all' || (filter === 'saved' ? r.it.m : !r.it.ok));
  const savedN = a.items.filter(it => it.m).length;
  const tone = full ? (pass ? 'ok' : 'bad') : 'neutral';
  const toneFg = tone === 'ok' ? c.ok : tone === 'bad' ? c.bad : c.link, toneBg = tone === 'ok' ? c.okSoft : tone === 'bad' ? c.badSoft : c.accentSoft;
  const anyOld = a.items.some(it => !it.a);
  const showSummary = hasSummary(a.items, aiLessons);
  const toTop = () => scroll.current?.scrollTo({ y: 0, animated: true });
  const changeFilter = (f: Filter) => { setFilter(f); setK(0); };
  // «سؤال n» in the AI summary shows that question.
  const jumpTo = (num: number) => { setFilter('all'); setK(Math.max(0, rows.findIndex(r => r.i === num - 1))); toTop(); };
  const step = (to: number) => { tap(); setK(to); toTop(); };

  // ---- A past exam or lesson: question by question ----
  if (!fresh) {
    const total = list.length, end = k >= total, r = list[k];
    // The floating glass bar, as in the exam: previous / the position / next; on the last question the summary (AI
    // sparkles, or a list), and at the summary the exam page (the lessons page after a lesson). All round icon buttons.
    const nav = (
      <GlassBar
        start={<FootBtn label={ui.prev} icon="arrowLeft" round disabled={!k} onPress={() => step(k - 1)} />}
        middle={end ? null : <BarCount n={k + 1} of={total} />}
        end={end ? (isLesson ? <FootBtn label={ui.lessons} icon="learn" round onPress={() => goTo('/learn')} />
            : <FootBtn label={ui.exams} icon="exam" round onPress={() => goTo('/exam')} />)
          : k === total - 1 ? <FootBtn label={ui.summary} icon={showSummary ? 'sparkles' : 'clipboard'} round onPress={() => step(k + 1)} />
          : <FootBtn label={ui.next} icon="arrowRight" round onPress={() => step(k + 1)} />} />
    );
    return (
      <Backdrop anim={motion.style}>
        <ScrollView ref={scroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: ins.top + 14, paddingHorizontal: 16, paddingBottom: ins.bottom + 100, gap: 12, maxWidth: 760, width: '100%', alignSelf: 'center' }}>
          {/* .rev-top: back button, tabs, «جزئیات آزمون» */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
            <Pressable onPress={() => { tap(); motion.leave(() => router.back()); }} accessibilityLabel="بازگشت" hitSlop={6}
              style={({ pressed }) => ({ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.accentSoft : c.surface, borderWidth: 1.5, borderColor: c.line })}>
              <Icon name="arrowRight" size={20} color={c.link} />
            </Pressable>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap', flexShrink: 1 }}>
              <Tabs value={filter} onChange={changeFilter} n={n} wrong={wrongN} savedN={savedN} />
              {faded ? (
                <Animated.View ref={btnRef} style={{ opacity: btnIn, transform: [{ scale: btnIn.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) }] }}>
                  <Pressable onPress={() => { tap(); fade.setValue(1); setLine(line === 'shown' ? 'hidden' : 'shown'); }} accessibilityState={{ expanded: line === 'shown' }}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 5, paddingHorizontal: 12, borderRadius: 99, backgroundColor: c.accentSoft }}>
                    <Icon name="chart" size={16} color={c.link} />
                    <T style={{ fontSize: 13.5, fontWeight: '700', color: c.link }}>{line === 'shown' && !flying ? 'پنهان‌کردن جزئیات' : 'جزئیات آزمون'}</T>
                  </Pressable>
                </Animated.View>
              ) : null}
            </View>
          </View>
          {/* .res-line */}
          {line === 'shown' ? (
            <Animated.View onLayout={e => { if (!flying) setPanelH(e.nativeEvent.layout.height); }}
              style={flying && panelH ? { height: room.interpolate({ inputRange: [0, 1], outputRange: [0, panelH] }), marginBottom: room.interpolate({ inputRange: [0, 1], outputRange: [-12, 0] }) } : null}>
            <Animated.View ref={panelRef} style={{ opacity: fade, transform: [
              { translateX: fade.interpolate({ inputRange: [0, 1], outputRange: [to.x, 0] }) },
              { translateY: fade.interpolate({ inputRange: [0, 1], outputRange: [to.y, 0] }) },
              { scale: fade.interpolate({ inputRange: [0, 1], outputRange: [0.12, 1] }) },
            ], flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, backgroundColor: toneBg }}>
              <View style={{ width: 66, height: 66, alignItems: 'center', justifyContent: 'center' }}>
                <RingSvg size={66} stroke={5} pct={pct} color={toneFg} track={dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'} />
                <T style={{ fontSize: 15, fontWeight: '800', color: toneFg, textAlign: 'center' }}>{faNum(pctN)}٪</T>
              </View>
              <View style={{ flex: 1, gap: 6 }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 12, rowGap: 2 }}>
                  <T style={{ fontSize: 15, fontWeight: '700', color: toneFg }}>{full ? (pass ? '✓ قبول' : '✗ مردود') : `${faNum(pctN)}٪ درست`}</T>
                  <T style={{ fontSize: 15, color: toneFg }}>{wrongN ? `${faNum(wrongN)} سؤال از ${faNum(n)} سؤال غلط` : `هر ${faNum(n)} سؤال درست`}</T>
                </View>
                <T style={{ fontSize: 12.5, color: c.muted }}>{modeName(a, bank)}، {fmtDate(a.at)}</T>
              </View>
            </Animated.View>
            </Animated.View>
          ) : null}
          {anyOld ? <OldNote /> : null}
          {!total ? <Empty text="موردی نیست." />
            : end ? (
              showSummary ? <AiSummary items={a.items} at={a.at} lang={lang} onQuestion={jumpTo} />
                : <Empty text={wrongN ? 'جمع‌بندی هوش مصنوعی در دسترس نیست.' : 'در این درس هیچ اشتباهی نداشتید! 👏'} />
            ) : <ReviewCard key={`${filter}-${r.i}`} q={Q.get(r.it.id)!} it={r.it} index={r.i} lang={lang} fa={fa} at={a.at} alwaysOpen />}
        </ScrollView>
        {total ? nav : null}
      </Backdrop>
    );
  }

  // ---- Just handed in: result card and the review list ----
  const retry = () => { session.plan = { mode: 'mistakes', ids: shuffle(a.items.filter(it => !it.ok).map(it => it.id)), title: 'تمرین اشتباهات' }; router.replace('/run'); };
  const li = isLesson && bank ? bank.tests.findIndex(t => t.id === a.lesson) : -1;
  const nextLesson = li >= 0 && bank && bank.tests[li + 1] ? bank.tests[li + 1] : null;
  const startNext = () => {
    if (!nextLesson) return;
    session.plan = { mode: 'lesson', ids: nextLesson.qs.filter(id => Q.has(id)), lesson: nextLesson.id, title: modeName({ mode: 'lesson', lesson: nextLesson.id }, bank) };
    router.replace('/run');
  };
  // From the summary into the question-by-question review (all questions, from `at`).
  const review = (at = 0) => { tap(); setFilter('all'); setK(Math.max(0, at)); setFresh(false); };
  const marked = a.items.filter(it => it.m).length;
  return (
    <Backdrop anim={motion.style}>
      <ScrollView ref={scroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingTop: ins.top + 14, paddingHorizontal: 16, paddingBottom: ins.bottom + 24, maxWidth: 560, width: '100%', alignSelf: 'center' }}>
        {/* «خلاصه‌ی آزمون»: the only thing shown after handing in. */}
        <Card style={{ alignItems: 'center', gap: 14, padding: 20, paddingTop: 22, borderRadius: 24 }}>
          {/* Back to the exam (or lessons) page: an icon in the top right corner. */}
          <Pressable onPress={() => { tap(); goTo(isLesson ? '/learn' : '/exam'); }} hitSlop={8} accessibilityRole="button" accessibilityLabel={isLesson ? 'بازگشت به درس‌ها' : 'بازگشت به صفحه‌ی آزمون'}
            style={({ pressed }) => ({ position: 'absolute', top: 14, ...physical({ right: 14 }), width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', zIndex: 2,
              backgroundColor: pressed ? c.accentSoft : c.surface2 })}>
            <Icon name="arrowRight" size={20} color={c.link} />
          </Pressable>
          <T style={{ fontSize: 19, lineHeight: 30, fontWeight: '700', textAlign: 'center' }}>خلاصه‌ی آزمون</T>
          <View style={{ width: 150, height: 150, alignItems: 'center', justifyContent: 'center' }}>
            <RingSvg size={150} stroke={12} pct={pct} color={full ? (pass ? c.ok : c.bad) : c.accent} track={c.surface2} />
            {full
              ? <><T style={{ fontSize: 38, lineHeight: 46, fontWeight: '700', textAlign: 'center' }}>{faNum(right)}</T><T style={{ color: c.muted, fontSize: 13, textAlign: 'center' }}>از {faNum(n)}</T></>
              : <><T style={{ fontSize: 32, lineHeight: 42, fontWeight: '700', textAlign: 'center' }}>{faNum(pctN)}٪</T><T style={{ color: c.muted, fontSize: 13, textAlign: 'center' }}>{faNum(right)} از {faNum(n)}</T></>}
          </View>
          <View style={{ alignItems: 'center', gap: 2 }}>
            <T style={{ fontSize: 22, lineHeight: 34, fontWeight: '800', textAlign: 'center', color: full ? (pass ? c.ok : c.bad) : c.link }}>
              {full ? (pass ? '🎉 قبول شدید!' : 'مردود — دوباره تلاش کنید') : `${faNum(pctN)}٪ پاسخ درست`}
            </T>
            <T style={{ color: c.muted, fontSize: 13, textAlign: 'center' }}>{modeName(a, bank)} · {fmtDateTime(a.at)}</T>
          </View>
          <View style={{ flexDirection: 'row', gap: 8, width: '100%' }}>
            {([['درست', faNum(right), c.ok], ['اشتباه', faNum(wrongN), wrongN ? c.bad : c.muted], ['علامت‌خورده', faNum(marked), c.warn], ['زمان', fmtTime(a.secs), c.text]] as const).map(([l, v, col]) => (
              <View key={l} style={{ flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 12, backgroundColor: c.surface2 }}>
                <T style={{ fontSize: 16, lineHeight: 24, fontWeight: '700', color: col, textAlign: 'center' }}>{v}</T>
                <T style={{ fontSize: 11.5, color: c.muted, textAlign: 'center' }}>{l}</T>
              </View>
            ))}
          </View>
          {/* Every question: green right, red wrong, a bookmark when marked; a tap opens its review. */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 7, justifyContent: 'center', direction: 'ltr' } as any}>
            {a.items.map((it, j) => (
              <Pressable key={j} onPress={() => review(rows.findIndex(r => r.i === j))} accessibilityLabel={`سؤال ${j + 1}`}
                style={({ pressed }) => ({ width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.75 : 1,
                  backgroundColor: it.ok ? c.okSoft : c.badSoft, borderWidth: 1.5, borderColor: it.m ? c.warn : it.ok ? c.okSoft : c.badSoft })}>
                <L style={{ fontSize: 15, lineHeight: 20, fontWeight: '600', color: it.ok ? c.ok : c.bad, fontFamily: NUM_FONT }}>{j + 1}</L>
                {it.m ? (
                  <View style={{ position: 'absolute', top: -5, right: -5, width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: c.warn }}>
                    <Icon name="bookmark" size={10} filled color="#fff" />
                  </View>
                ) : null}
              </Pressable>
            ))}
          </View>
          <View style={{ width: '100%', gap: 10, marginTop: 4 }}>
            <Button label="بازبینی آزمون" icon="eye" onPress={() => review(0)} />
            {wrongN ? <Button kind="glass" label="تمرین اشتباهات" icon="refresh" onPress={retry} /> : null}
            {isLesson && nextLesson ? <Button kind="glass" label="درس بعدی" icon="arrowLeft" onPress={startNext} /> : null}
          </View>
        </Card>
      </ScrollView>
    </Backdrop>
  );
}
