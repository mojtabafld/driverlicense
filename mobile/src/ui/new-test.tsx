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
import { ArcButton, Button, Card, FitLine, T, tap, useCountUp } from './kit';
import { SizeSlider } from './size-slider';
import { ARC, useColors, useM3 } from './theme';
import { mix } from './palette';

export type NewTest = ReturnType<typeof useNewTest>;
export function useNewTest() {
  const { newBank, bank, attempts } = useApp();
  const src = PROVE_BANK ? bank : newBank;
  const { randomLeft } = useFree();
  const [size, setSize] = useState(FULL);
  const [fresh, setFresh] = useState(true);
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
  return { ready: ids.length > 0, ids, last, missed, week, unseen, size, setSize, fresh, setFresh, count, start, randomLeft };
}

// `level` controls spacing and type size; every section remains available by scrolling.
export function NewTestCard({ test, level = 0 }: { test: NewTest; level?: number }) {
  const c = useColors();
  const { limited } = useFree();
  const { premium } = useApp();
  const { ready, ids, last, week, unseen, size, setSize, fresh, setFresh, count, start, randomLeft } = test;
  if (!ready) return null;
  const total = ids.length, answered = last.size, right = [...last.values()].filter(Boolean).length, wrong = answered - right;
  // Before any question is answered (Mojtaba 2026-10-21): the card without its empty progress, the line over the
  // numbers, so on every screen the history card under it shows above the tab bar too.
  const tight = !answered;
  const Setup = ARC ? View : Card;
  return (
    <>
    {/* One card (Mojtaba 2026-10-29): the progress (after a picture he sent; at 0% before the first answer too) on top,
        a thin line, then the random test. */}
    {/* (the main site: no box round it, on the page itself, in sections as the home page's; Mojtaba 2026-11-08) */}
    <Setup testID="exam-setup" style={{ flex: 1, gap: tight || level ? (level >= 3 ? 7 : 10) : 14, ...(ARC
      ? { backgroundColor: 'transparent', borderWidth: 0, shadowOpacity: 0, elevation: 0, paddingVertical: 4, paddingHorizontal: 4 }
      : { paddingVertical: level >= 3 ? 10 : level >= 2 ? 12 : level ? 16 : 20, paddingHorizontal: level >= 2 ? 16 : 20 }) }}>
      <Progress answered={answered} total={total} right={right} wrong={wrong} week={week} level={level} />
      {/* (the smallest phones: no line, the card's gaps part the two halves) */}
      {ARC ? (
        // The random test as a section, its title and what the chosen size means (Mojtaba 2026-11-08)
        <View style={{ gap: 6, paddingTop: level >= 2 ? 8 : 16 }}>
          <T style={{ fontSize: 22, lineHeight: 32, fontWeight: '500' }}>{tr('آزمون تصادفی')}</T>
          <T style={{ fontSize: 14.5, lineHeight: 24, color: c.muted }}>{t('{0} سؤال در {1} دقیقه', faNum(size), faNum(Math.round(size * SECONDS_PER_Q / 60)))}</T>
        </View>
      ) : level >= 3 ? null : <View style={{ height: 1, backgroundColor: c.line }} />}
      {/* The number of questions (no title over it since 2026-10-30: the choice says it), and under it «بدون سؤال
          تکراری» (Mojtaba 2026-10-30). */}
      {/* The number of questions on a slider over the start button, out of the button again (Mojtaba 2026-11-07). */}
      {randomLeft && count ? <SizeSlider value={size} values={SIZES} onChange={setSize} grey={!ARC} /> : null}
      {/* A round check box before the words, as a question's statements are ticked, above the start button, under the slider (Mojtaba 2026-11-07; under the button from 2026-11-06) */}
      <Pressable onPress={() => { tap(); setFresh(!fresh); }} accessibilityRole="checkbox" accessibilityState={{ checked: fresh }} accessibilityLabel={tr('بدون سؤال تکراری')}
        style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, opacity: pressed ? 0.7 : 1 })}>
        <View style={{ width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center',
          backgroundColor: fresh ? c.pick : 'transparent', borderWidth: fresh ? 0 : 1.75, borderColor: c.faint }}>
          {fresh ? <Icon name="check" size={14} color={c.accentText} weight="bold" /> : null}
        </View>
        <T style={{ flex: 1, fontWeight: '700', fontSize: 14, lineHeight: 22 }}>بدون سؤال تکراری</T>
      </Pressable>
      {fresh && unseen.length < size && !(unseen.length === 0 && premium && !limited) ? (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 12, borderRadius: 12, backgroundColor: c.surface2 }}>
          <Icon name="info" size={17} color={c.muted} />
          <T style={{ flex: 1, fontSize: 13, lineHeight: 21, color: c.muted }}>{unseen.length
            ? `فقط ${faNum(unseen.length)} سؤال تازه مانده؛ آزمون با همه‌ی آن‌ها انجام می‌شود.`
            : 'همه‌ی سؤال‌ها را دست‌کم یک بار جواب داده‌اید.'}</T>
        </View>
      ) : null}
      {/* The free tests' notice: only without premium (Mojtaba 2026-10-29). */}
      {limited && !premium ? (
        <View style={{ flexDirection: 'row', alignItems: randomLeft ? 'center' : 'flex-start', gap: 8, padding: tight ? 10 : 12, borderRadius: 12, backgroundColor: randomLeft ? c.surface2 : c.warnSoft }}>
          <Icon name={randomLeft ? 'info' : 'lock'} size={17} color={randomLeft ? c.muted : c.warn} />
          {/* The free tests left: always one line, shorter and smaller on a narrow screen (Mojtaba 2026-10-22). */}
          {randomLeft ? (
            <View style={{ flex: 1 }}>
              <FitLine size={13} min={10.5} style={{ lineHeight: 21, color: c.muted }}>{t('{1} از {0} آزمون تصادفی رایگان مانده است.', faNum(FREE_RANDOM), faNum(randomLeft))}</FitLine>
            </View>
          ) : <T style={{ flex: 1, fontSize: 13, lineHeight: 21, color: c.text }}>{t('{0} آزمون رایگان شما تمام شد. برای آزمون‌های بیشتر، نسخه‌ی ویژه را فعال کنید.', faNum(FREE_RANDOM))}</T>}
        </View>
      ) : null}
      {/* (Premium: no «tested on … of … questions» line here any more; the progress card above says it. Mojtaba 2026-10-29) */}
      {!randomLeft ? (ARC ? <ArcButton label="فعال کردن نسخه‌ی ویژه" onPress={start} icon="lock" /> : <Button label="فعال کردن نسخه‌ی ویژه" onPress={start} icon="lock" kind="grey" />)
        : count ? (ARC ? <ArcButton label={t('شروع آزمون {0} سؤالی', faNum(count))} onPress={start} icon="play" variant="accent" /> : <Button label={`شروع آزمون ${faNum(count)} سؤالی`} onPress={start} icon="play" kind="grey" />)
          : null}
    </Setup>
    </>
  );
}

// Option 1: a filled progress card with one proportional segmented bar, then a separate daily bar-chart card.
function Progress({ answered, total, right, wrong, level = 0 }: { answered: number; total: number; right: number; wrong: number; week: number; level?: number }) {
  const c = useColors(), m = useM3(), [open, setOpen] = useState(false);
  const share = total ? answered / total : 0, animated = useCountUp(share, 1100);
  const shown = total && answered >= total ? 1 : Math.min(0.99, Math.max(0, animated));
  const left = Math.max(0, total - answered);
  const { attempts } = useApp();
  const tests = attempts.filter(a => a.mode !== 'lesson').length, mistakes = mistakeIds(attempts).length;
  const colors = [c.ok, c.bad, mix(c.muted, c.surface, 0.65)];
  const counts = [right, wrong, left];
  const labels = ['درست', 'اشتباه', 'جواب‌نداده'];
  const numberFont = RTL ? 'Vazirmatn-700' : 'GSans-700';
  const shortcut = (icon: IconName, label: string, color: string, onPress: () => void) => (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="button" accessibilityLabel={label}
      style={({ pressed }) => ({ flex: 1, minWidth: 0, minHeight: 46, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
        paddingHorizontal: 12, borderRadius: 999, borderWidth: 1, borderColor: color, backgroundColor: pressed ? mix(c.surface, color, 0.12) : 'transparent' })}>
      <Icon name={icon} size={16} color={color} />
      <T raw numberOfLines={1} style={{ flexShrink: 1, fontSize: 14, lineHeight: 22, color }}>{label}</T>
    </Pressable>
  );
  return (
    <View style={{ gap: 14 }}>
      <View testID="exam-progress-card" style={{ padding: 20, gap: 16, borderRadius: 24, backgroundColor: c.surface }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <T style={{ flex: 1, fontSize: 22, lineHeight: 32, fontWeight: '500' }}>پیشرفت شما</T>
          <Pressable onPress={() => { tap(); setOpen(v => !v); }} accessibilityRole="button" accessibilityLabel={tr('جزئیات پیشرفت')} accessibilityState={{ expanded: open }} hitSlop={8}
            style={({ pressed }) => ({ width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: pressed ? c.surface2 : 'transparent' })}>
            <Icon name="more" size={22} color={c.muted} />
          </Pressable>
        </View>
        <View style={{ gap: 2 }}>
          <T raw testID="exam-progress-percent" style={{ fontSize: level >= 3 ? 48 : 60, lineHeight: level >= 3 ? 58 : 70, fontFamily: numberFont }}>{pctText(shown)}</T>
          <T style={{ fontSize: 14, lineHeight: 22, color: c.muted }}>{t('{0} از {1} سؤال', faNum(answered), faNum(total))}</T>
        </View>
        <View testID="exam-progress-bar" accessibilityRole="progressbar" accessibilityLabel={tr('پیشرفت شما')} accessibilityValue={{ min: 0, max: total, now: answered }} aria-valuemin={0} aria-valuemax={total} aria-valuenow={answered}
          style={{ flexDirection: 'row', height: 26, gap: 4, borderRadius: 8, overflow: 'hidden' }}>
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
      <DailyTestsChart height={level >= 3 ? 96 : 120} />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {shortcut('clock', t('{0} آزمون', faNum(tests)), m.primary, () => router.push('/history'))}
        {shortcut('warning', t('{0} اشتباه', faNum(mistakes)), mistakes ? m.error : m.primary, () => router.push('/mistakes'))}
      </View>
    </View>
  );
}
