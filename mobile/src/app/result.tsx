// Result and answer review, laid out like the site.
// A past exam or lesson: the site's question-by-question review (back button, tabs, a result line that fades after
// 5 seconds, one open card at a time with Forrige / Næste, and the AI summary of the mistakes at the end).
// One just handed in: the site's result card (ring, verdict, numbers, next steps) and the list of review cards.
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

import type { Attempt, Item } from '@/lib/bank';
import { faNum, fmtDate, isFull, passMin, scoreOf, shuffle } from '@/lib/logic';
import { fmtDateTime, fmtTime, modeName } from '@/lib/names';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Icon } from '@/ui/icon';
import { Backdrop, Button, Card, T, tap } from '@/ui/kit';
import { BarCount, FootBtn, GlassBar } from '@/ui/glass-bar';
import { AiSummary, ReviewCard, hasSummary, uiText } from '@/ui/review';
import { useColors, useIsDark } from '@/ui/theme';

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
  const [a] = useState<Attempt | null>(() => session.result);
  const [fresh] = useState(() => session.fresh);
  const n = a?.items.length ?? 0, right = a ? scoreOf(a) : 0, wrongN = n - right;
  const [filter, setFilter] = useState<Filter>(() => (fresh || wrongN ? 'wrong' : 'all'));
  const [k, setK] = useState(0);
  // The result line of a past review: shown, then hidden after 5 s; «جزئیات آزمون» brings it back.
  const [line, setLine] = useState<'shown' | 'hidden'>('shown');
  const [faded, setFaded] = useState(false);
  const [fade] = useState(() => new Animated.Value(1));
  const scroll = useRef<ScrollView>(null);
  useEffect(() => {
    if (fresh) return;
    const t = setTimeout(() => Animated.timing(fade, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => { setLine('hidden'); setFaded(true); }), 5000);
    return () => clearTimeout(t);
  }, [fresh, fade]);
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
    // The floating glass bar, as in the exam: previous / the position / next (the summary, then «from the start»).
    const nav = (
      <GlassBar
        start={<FootBtn label={ui.prev} icon="arrowLeft" lead disabled={!k} onPress={() => step(k - 1)} />}
        middle={end ? null : <BarCount n={k + 1} of={total} />}
        end={end ? <FootBtn label={ui.restart} icon="arrowRight" onPress={() => step(0)} />
          : k === total - 1 ? <FootBtn label={ui.summary} icon="arrowRight" primary onPress={() => step(k + 1)} />
          : <FootBtn label={ui.next} icon="arrowRight" primary onPress={() => step(k + 1)} />} />
    );
    return (
      <Backdrop>
        <ScrollView ref={scroll} contentContainerStyle={{ paddingTop: ins.top + 14, paddingHorizontal: 16, paddingBottom: ins.bottom + 100, gap: 12, maxWidth: 760, width: '100%', alignSelf: 'center' }}>
          {/* .rev-top: back button, tabs, «جزئیات آزمون» */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
            <Pressable onPress={() => { tap(); router.back(); }} accessibilityLabel="بازگشت" hitSlop={6}
              style={({ pressed }) => ({ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.accentSoft : c.surface, borderWidth: 1.5, borderColor: c.line })}>
              <Icon name="arrowRight" size={20} color={c.link} />
            </Pressable>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap', flexShrink: 1 }}>
              <Tabs value={filter} onChange={changeFilter} n={n} wrong={wrongN} savedN={savedN} />
              {faded ? (
                <Pressable onPress={() => { tap(); fade.setValue(1); setLine(line === 'shown' ? 'hidden' : 'shown'); }} accessibilityState={{ expanded: line === 'shown' }}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 5, paddingHorizontal: 12, borderRadius: 99, backgroundColor: c.accentSoft }}>
                  <Icon name="chart" size={16} color={c.link} />
                  <T style={{ fontSize: 13.5, fontWeight: '700', color: c.link }}>{line === 'shown' ? 'پنهان‌کردن جزئیات' : 'جزئیات آزمون'}</T>
                </Pressable>
              ) : null}
            </View>
          </View>
          {/* .res-line */}
          {line === 'shown' ? (
            <Animated.View style={{ opacity: fade, flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, backgroundColor: toneBg }}>
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
  return (
    <Backdrop>
      <ScrollView ref={scroll} contentContainerStyle={{ paddingTop: ins.top + 14, paddingHorizontal: 16, paddingBottom: ins.bottom + 40, gap: 14, maxWidth: 760, width: '100%', alignSelf: 'center' }}>
        {/* .result-hero */}
        <Card style={{ alignItems: 'center', gap: 14, padding: 22 }}>
          <View style={{ width: 170, height: 170, alignItems: 'center', justifyContent: 'center' }}>
            <RingSvg size={170} stroke={14} pct={pct} color={full ? (pass ? c.ok : c.bad) : c.accent} track={c.surface2} />
            {full
              ? <><T style={{ fontSize: 42, lineHeight: 50, fontWeight: '700', textAlign: 'center' }}>{faNum(right)}</T><T style={{ color: c.muted, fontSize: 13, textAlign: 'center' }}>از {faNum(n)}</T></>
              : <><T style={{ fontSize: 36, lineHeight: 46, fontWeight: '700', textAlign: 'center' }}>{faNum(pctN)}٪</T><T style={{ color: c.muted, fontSize: 13, textAlign: 'center' }}>{faNum(right)} از {faNum(n)}</T></>}
          </View>
          <View style={{ width: '100%', alignItems: 'center', gap: 4 }}>
            <T style={{ color: c.muted, fontSize: 13, textAlign: 'center' }}>{modeName(a, bank)} · {fmtDateTime(a.at)}</T>
            <T style={{ fontSize: 26, lineHeight: 38, fontWeight: '800', textAlign: 'center', color: full ? (pass ? c.ok : c.bad) : c.link }}>
              {full ? (pass ? '🎉 قبول شدید!' : 'مردود — دوباره تلاش کنید') : `${faNum(pctN)}٪ پاسخ درست`}
            </T>
            <T style={{ color: c.muted, textAlign: 'center', fontSize: 14 }}>
              {full ? (pass ? `حداقل ${faNum(passMin(n))} تصویر از ${faNum(n)} کاملاً درست بود.` : `برای قبولی حداقل ${faNum(passMin(n))} تصویر از ${faNum(n)} باید کاملاً درست باشد.`)
                : `آزمون تمرینی ${faNum(n)} سؤالی؛ فقط درصد پاسخ‌های درست ثبت می‌شود. قبولی/مردودی فقط برای آزمون کامل ۲۵ سؤالی تعیین می‌شود.`}
            </T>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 14, marginBottom: 4, width: '100%' }}>
              {[['تصاویر درست', faNum(right)], ['تصاویر اشتباه', faNum(wrongN)], ['زمان', fmtTime(a.secs)]].map(([k1, v]) => (
                <View key={k1} style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 6, borderRadius: 6, backgroundColor: c.surface2 }}>
                  <T style={{ fontSize: 13, textAlign: 'center' }}>{k1}: <T style={{ fontSize: 13, fontWeight: '700' }}>{v}</T></T>
                </View>
              ))}
            </View>
          </View>
          {/* .res-actions */}
          <View style={{ width: '100%', gap: 10 }}>
            {isLesson ? <Button kind="glass" label="داشبورد" onPress={() => goTo('/')} /> : null}
            {wrongN ? <Button label="تمرین دوباره‌ی همین اشتباهات" onPress={retry} /> : null}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {isLesson ? (
                <>
                  {nextLesson ? <Button style={{ flex: 1 }} kind={wrongN ? 'glass' : 'primary'} label="درس بعدی" onPress={startNext} /> : null}
                  <Button style={{ flex: 1 }} kind="glass" label="فهرست درس‌ها" onPress={() => goTo('/learn')} />
                </>
              ) : (
                <>
                  <Button style={{ flex: 1 }} kind={wrongN ? 'glass' : 'primary'} label="آزمون جدید" onPress={() => goTo('/exam')} />
                  <Button style={{ flex: 1 }} kind="glass" label="داشبورد" onPress={() => goTo('/')} />
                </>
              )}
            </View>
          </View>
        </Card>
        {/* .section-title: «مرور پاسخ‌ها» and the tabs */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', marginTop: 16, marginHorizontal: 2 }}>
          <T style={{ fontSize: 16, fontWeight: '700' }}>مرور پاسخ‌ها</T>
          <Tabs value={filter} onChange={changeFilter} n={n} wrong={wrongN} savedN={savedN} />
        </View>
        {anyOld ? <OldNote /> : null}
        {list.length ? list.map((r, j) => (
          <ReviewCard key={`${filter}-${r.i}`} q={Q.get(r.it.id)!} it={r.it} index={r.i} lang={lang} fa={fa} at={a.at} startOpen={filter === 'wrong' && j < 3} />
        )) : <Empty text={filter === 'wrong' ? 'هیچ اشتباهی نداشتید! 👏' : 'موردی نیست.'} />}
        {showSummary ? <AiSummary items={a.items} at={a.at} lang={lang} onQuestion={() => { setFilter('all'); toTop(); }} /> : null}
      </ScrollView>
    </Backdrop>
  );
}
