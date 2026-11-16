// «آزمون تصادفی» on the exam tab (main site): random questions from the app's own bank (site/newq.js, written from the
// Danish rules, not taken from any other site), 5 to 25 like the real test, optionally only questions not answered
// before («بدون سؤال تکراری»), and how far the user has come through the bank: how many questions answered at least
// once, and of those how many were right the last time. Called «آزمون جدید» until 2026-10-19, beside the random exam of
// the old bank; then it took that card's place and name (Mojtaba). Its exams keep their own mode, 'new'.
// useNewTest holds the card's choices and its start, so the exam tab's header button starts the same test.
// At /app (PROVE_BANK) the same card with prove.dk's bank: its questions, its random exams (mode 'random'), the progress
// through it and its mistakes (Mojtaba 2026-10-20).
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { PROVE_BANK } from '@/lib/config';
import { FREE_RANDOM, toPremium, useFree } from '@/lib/free';
import { RTL, t, tr } from '@/lib/i18n';
import { FULL, SECONDS_PER_Q, SIZES, faNum, mistakeIds, shuffle } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { pctText } from './activity';
import { Icon, type IconName } from './icon';
import { DailyTestsChart } from './daily-tests-chart';
import { CardWash, type ServiceTone } from './service-carousel';
import { ArcButton, Button, Card, FitLine, T, tap, useCountUp } from './kit';
import { SizeSlider } from './size-slider';
import { ARC, useColors, useIsDark, useM3 } from './theme';
import { mix } from './palette';

export type NewTest = ReturnType<typeof useNewTest>;
export function useNewTest(freshOnly = true) {
  const { newBank, bank, attempts } = useApp();
  const src = PROVE_BANK ? bank : newBank;
  const { randomLeft } = useFree();
  const [size, setSize] = useState(FULL);
  const [fresh, setFresh] = useState(freshOnly);
  const ids = src ? src.questions.map(q => q.id) : [], mine = new Set(ids);
  // Each question's latest answer, and those answered wrong at least once.
  // `week`: how many were answered for the first time in the last 7 days.
  const [now] = useState(() => Date.now()), since = now - 7 * 864e5;
  const last = new Map<number, boolean>(), missed = new Set<number>();
  let week = 0;
  attempts.forEach(a => a.items.forEach(it => { if (mine.has(it.id)) { if (!last.has(it.id) && a.at >= since) week++; last.set(it.id, it.ok); if (!it.ok) missed.add(it.id); } }));
  const unseen = ids.filter(id => !last.has(id));
  const pool = fresh ? unseen : ids, count = Math.min(size, pool.length);
  const start = () => {
    if (!randomLeft) { tap(); toPremium(); return; }
    if (!count) return;
    session.plan = { mode: PROVE_BANK ? 'random' : 'new', ids: shuffle(pool).slice(0, count), title: 'آزمون تصادفی' };
    router.push('/run');
  };
  // The dock's start button (ui/tabs/start-button.tsx): `n` questions, those never answered first, then the others.
  const startWith = (n: number) => {
    if (!randomLeft) { tap(); toPremium(); return; }
    if (!ids.length) return;
    const fresh1 = shuffle(unseen), seenIds = shuffle(ids.filter(id => last.has(id)));
    session.plan = { mode: PROVE_BANK ? 'random' : 'new', ids: [...fresh1, ...seenIds].slice(0, n), title: 'آزمون تصادفی' };
    router.push('/run');
  };
  return { ready: ids.length > 0, ids, last, missed, week, unseen, size, setSize, fresh, setFresh, count, start, startWith, randomLeft };
}

// `level` controls spacing and type size; every section remains available by scrolling.
export function NewTestCard({ test, level = 0 }: { test: NewTest; level?: number }) {
  const c = useColors();
  const { limited } = useFree();
  const { premium } = useApp();
  const { ready, ids, last, week } = test;
  if (!ready) return null;
  const total = ids.length, answered = last.size, right = [...last.values()].filter(Boolean).length, wrong = answered - right;
  // Before any question is answered (Mojtaba 2026-10-21): the card without its empty progress, the line over the
  // numbers, so on every screen the history card under it shows above the tab bar too.
  const tight = !answered;
  const Setup = ARC ? View : Card;
  return (
    <>
    {/* Test setup and its start action come first; progress and daily activity follow below. */}
    {/* (the main site: no box round it, on the page itself, in sections as the home page's; Mojtaba 2026-11-08) */}
    <Setup testID="exam-setup" style={{ flex: 1, gap: tight || level ? (level >= 3 ? 7 : 10) : 14, ...(ARC
      ? { backgroundColor: 'transparent', borderWidth: 0, shadowOpacity: 0, elevation: 0, paddingVertical: 4, paddingHorizontal: 4 }
      : { paddingVertical: level >= 3 ? 10 : level >= 2 ? 12 : level ? 16 : 20, paddingHorizontal: level >= 2 ? 16 : 20 }) }}>
      {/* (The random test's own card taken off on 2026-11-14, Mojtaba: the round start button beside the dock
          starts it now, its number of questions chosen in the menu over it, ui/tabs/start-button.tsx.) */}
      <Progress answered={answered} total={total} right={right} wrong={wrong} week={week} level={level} />
    </Setup>
    </>
  );
}

// Option 1: a filled progress card with one proportional segmented bar, then a separate daily bar-chart card.
// (Mojtaba 2026-11-13: the cards in the gradient cards' look, ui/service-carousel.tsx, at their own size: a soft
// two-colour wash, the number «( 001 )» over the title; the two shortcuts under them small cards of the same kind.)
// The daily chart's card without its bars: its padding, title lines, gaps, the bars' counts and the day labels (the
// compact card, on a short screen, with its title and count on one line and less padding).
const CHART_EXTRA = 180, CHART_EXTRA_COMPACT = 136;
function Progress({ answered, total, right, wrong, level = 0 }: { answered: number; total: number; right: number; wrong: number; week: number; level?: number }) {
  const c = useColors(), m = useM3(), dark = useIsDark(), [open, setOpen] = useState(false), [chartRoom, setChartRoom] = useState(CHART_EXTRA + 120);
  const extra = level >= 3 ? CHART_EXTRA_COMPACT : CHART_EXTRA;
  const share = total ? answered / total : 0, animated = useCountUp(share, 1100);
  const shown = total && answered >= total ? 1 : Math.min(0.99, Math.max(0, animated));
  const left = Math.max(0, total - answered);
  const { attempts } = useApp();
  const tests = attempts.filter(a => a.mode !== 'lesson').length, mistakes = mistakeIds(attempts).length;
  const colors = [c.ok, c.bad, mix(c.muted, c.surface, 0.65)];
  const counts = [right, wrong, left];
  const labels = ['درست', 'اشتباه', 'جواب‌نداده'];
  const numberFont = RTL ? 'Vazirmatn-700' : 'GSans-700';
  const ink = dark ? '#ffffff' : c.text;
  const shortcut = (code: string, tone: ServiceTone, icon: IconName, label: string, color: string, onPress: () => void) => (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="button" accessibilityLabel={label}
      style={({ pressed }) => ({ flex: 1, minWidth: 0, minHeight: 46, paddingHorizontal: 16, paddingVertical: level >= 3 ? 10 : 14, gap: level >= 3 ? 6 : 10, borderRadius: 24, overflow: 'hidden', opacity: pressed ? 0.85 : 1 })}>
      <CardWash tone={tone} />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Icon name={icon} size={22} color={color} />
      </View>
      <T raw numberOfLines={1} style={{ fontSize: 15, lineHeight: 22, fontWeight: '600', color: ink }}>{label}</T>
    </Pressable>
  );
  return (
    <View style={{ gap: 14, flexGrow: 1 }}>
      {/* (a short screen, level 3: a tighter card, the percent on the title's line; Mojtaba 2026-11-16, so the page
          ends above the dock on small phones too) */}
      <View testID="exam-progress-card" style={{ padding: level >= 3 ? 14 : 20, gap: level >= 3 ? 10 : 16, borderRadius: 24, overflow: 'hidden' }}>
        <CardWash tone="blue" />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <T style={{ flex: 1, fontSize: level >= 3 ? 19 : 22, lineHeight: 32, fontWeight: '500' }}>پیشرفت شما</T>
          {level >= 3 ? <T raw style={{ fontSize: 30, lineHeight: 38, fontFamily: numberFont }}>{pctText(shown)}</T> : null}
          <Pressable onPress={() => { tap(); setOpen(v => !v); }} accessibilityRole="button" accessibilityLabel={tr('جزئیات پیشرفت')} accessibilityState={{ expanded: open }} hitSlop={8}
            style={({ pressed }) => ({ width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: pressed ? c.surface2 : 'transparent' })}>
            <Icon name="more" size={22} color={c.muted} />
          </Pressable>
        </View>
        <View style={{ gap: 2 }}>
          {level >= 3 ? null : <T raw testID="exam-progress-percent" style={{ fontSize: 60, lineHeight: 70, fontFamily: numberFont }}>{pctText(shown)}</T>}
          <T style={{ fontSize: 14, lineHeight: 22, color: c.muted }}>{t('{0} از {1} سؤال', faNum(answered), faNum(total))}</T>
        </View>
        <View testID="exam-progress-bar" accessibilityRole="progressbar" accessibilityLabel={tr('پیشرفت شما')} accessibilityValue={{ min: 0, max: total, now: answered }} aria-valuemin={0} aria-valuemax={total} aria-valuenow={answered}
          style={{ flexDirection: 'row', height: level >= 3 ? 16 : 26, gap: 4, borderRadius: 8, overflow: 'hidden' }}>
          {counts.map((n, i) => n ? <View key={labels[i]} testID={`exam-progress-segment-${i}`} style={{ flexGrow: n, flexBasis: 0, minWidth: 0, borderRadius: 6, backgroundColor: colors[i] }} /> : null)}
        </View>
        <View testID="exam-answer-counts" style={{ flexDirection: 'row', gap: 8 }}>
          {counts.map((n, i) => <View key={labels[i]} testID={`exam-count-${i}`} style={{ flex: 1, minWidth: 0, gap: 3 }}>
            <T raw style={{ fontSize: 22, lineHeight: 30, fontFamily: numberFont }}>{faNum(n)}</T>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: colors[i] }} />
              <T style={{ flexShrink: 1, fontSize: 12, lineHeight: 18, color: c.muted }}>{labels[i]}</T>
            </View>
          </View>)}
        </View>
        {open ? <View testID="exam-progress-details" style={{ gap: 12, paddingTop: 8, borderTopWidth: 1, borderTopColor: c.line }}>
          {counts.map((n, i) => <View key={labels[i]} style={{ gap: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
              <T style={{ fontSize: 13, color: c.muted }}>{labels[i]}</T>
              <T raw style={{ fontSize: 13, color: c.muted }}>{pctText(total ? n / total : 0)}</T>
            </View>
            <View style={{ height: 5, borderRadius: 3, backgroundColor: c.surface2, overflow: 'hidden', flexDirection: 'row' }}>
              <View style={{ width: `${total ? n / total * 100 : 0}%`, height: 5, borderRadius: 3, backgroundColor: colors[i] }} />
            </View>
          </View>)}
        </View> : null}
      </View>
      {/* The daily chart takes the room the screen leaves, so the cards under it end just above the dock on every
          phone (Mojtaba 2026-11-16): its bars as tall as that room allows, between 40 and 220 points. (It lies over
          its measured room, so its own height never sets the room.) */}
      <View style={{ flexGrow: 1, minHeight: extra + 24 }} onLayout={e => { const h = e.nativeEvent.layout.height; setChartRoom(h); }}>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <DailyTestsChart height={Math.max(24, Math.min(220, chartRoom - extra))} code="003" compact={level >= 3} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {shortcut('004', 'amber', 'clock', t('{0} آزمون', faNum(tests)), ink, () => router.push('/history'))}
        {shortcut('005', 'red', 'warning', t('{0} اشتباه', faNum(mistakes)), mistakes ? m.error : ink, () => router.push('/mistakes'))}
      </View>
    </View>
  );
}
