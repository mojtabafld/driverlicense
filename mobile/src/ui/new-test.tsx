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
import { Pressable, View, useWindowDimensions } from 'react-native';

import { PROVE_BANK } from '@/lib/config';
import { FREE_RANDOM, toPremium, useFree } from '@/lib/free';
import { RTL, t, tr } from '@/lib/i18n';
import { FULL, SIZES, faNum, mistakeIds, shuffle } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { pctText } from './activity';
import { Icon, type IconName } from './icon';
import { ArcButton, Button, Card, FitLine, T, tap, useCountUp } from './kit';
import { SizeSegment } from './size-segment';
import { SizeSlider } from './size-slider';
import { Toggle } from './toggle';
import { ARC, radius, useColors, useIsDark } from './theme';

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

// `level` (0–3): denser on shorter screens, so the exam tab's cards all end above the tab bar (Mojtaba 2026-10-29).
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
  return (
    <>
    {/* One card (Mojtaba 2026-10-29): the progress (after a picture he sent; at 0% before the first answer too) on top,
        a thin line, then the random test. */}
    <Card style={{ gap: tight || level ? (level >= 3 ? 8 : 10) : 14, paddingVertical: level >= 2 ? 12 : level ? 16 : 20, paddingHorizontal: level >= 2 ? 16 : 20, flexGrow: 1, justifyContent: 'space-between' }}>
      <Progress answered={answered} total={total} right={right} wrong={wrong} week={week} level={level} />
      <View style={{ height: 1, backgroundColor: c.line }} />
      {/* The number of questions (no title over it since 2026-10-30: the choice says it), and under it «بدون سؤال
          تکراری» (Mojtaba 2026-10-30). */}
      {ARC ? <SizeSegment value={size} values={SIZES} onChange={setSize} /> : <SizeSlider value={size} values={SIZES} onChange={setSize} grey />}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <T style={{ fontWeight: '700' }}>بدون سؤال تکراری</T>
        </View>
        <Toggle label="بدون سؤال تکراری" value={fresh} onChange={setFresh} />
      </View>
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
        : count ? (ARC ? <ArcButton label={`شروع آزمون ${faNum(count)} سؤالی`} onPress={start} icon="play" variant="accent" /> : <Button label={`شروع آزمون ${faNum(count)} سؤالی`} onPress={start} icon="play" kind="grey" />)
          : null}
    </Card>
    </>
  );
}

// How far through the bank, as one bar in the theme's colour (Mojtaba 2026-10-19: a minimal, modern progress bar, not a
// line of text): the share of the questions answered at least once, filling in when the card shows, its percent beside
// the title; under it how many were right / wrong the last time and how many are not answered yet, each with a dot in
// its colour. The mistakes open the mistakes page (Mojtaba 2026-10-19), where this test's questions are among them.
// Two #rrggbb colours mixed (`t` of the second); null when either is not one.
function mix(a: string, b: string, t: number): string | null {
  const m = (h: string) => /^#[0-9a-f]{6}$/i.test(h) ? [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)) : null;
  const x = m(a), y = m(b);
  if (!x || !y) return null;
  return `#${x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('')}`;
}

function Progress({ answered, total, right, wrong, week, level = 0 }: { answered: number; total: number; right: number; wrong: number; week: number; level?: number }) {
  const c = useColors(), [open, setOpen] = useState(false);
  const share = total ? answered / total : 0;
  const big = useCountUp(share, 1100);
  // A whole percent: never 0 once a question is answered, never 100 before all of them are.
  const pct = answered >= total ? 1 : Math.min(0.99, Math.max(answered ? 0.01 : 0, share));
  const shown = answered >= total ? 1 : Math.min(pct, big);
  const done = total > 0 && answered >= total, left = total - answered, dark = useIsDark();
  const { attempts } = useApp();
  const tests = attempts.filter(a => a.mode !== 'lesson').length, mistakes = mistakeIds(attempts).length;
  // A pill: an icon in its colour and its words, a tap opening its page. The three share one line on every screen: on a
  // narrow one they give up room and their words get smaller (FitLine; Mojtaba 2026-10-30).
  // (narrower phones: smaller icons, room and words, so nothing is cut off; a step smaller still on small ones,
  // Mojtaba 2026-10-30)
  const { width: winW } = useWindowDimensions(), tight = winW < 345 ? 2 : winW < 400 ? 1 : 0;
  const tag = (icon: IconName, color: string, text: string, go?: () => void) => (
    <Pressable disabled={!go} onPress={() => { tap(); go?.(); }} accessibilityRole={go ? 'button' : undefined} accessibilityLabel={text}
      // (together as wide as the progress bar under them, each grown from its own width; a little larger: Mojtaba 2026-10-30)
      style={({ pressed }) => ({ flexGrow: 1, flexShrink: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: [5, 4, 3][tight],
        paddingVertical: [10, 9, 8][tight], paddingHorizontal: [10, 8, 6][tight], borderRadius: radius.pill, backgroundColor: c.surface2, opacity: pressed ? 0.75 : 1 })}>
      <Icon name={icon} size={[16, 15, 13][tight]} color={color} weight="semibold" />
      {/* (one size for each width of screen; English and Danish, longer, a step smaller) */}
      <T style={{ flexShrink: 1, color, fontWeight: '700', fontSize: [13, 11.5, 10.5, 10][tight + (RTL ? 0 : 1)] }} numberOfLines={1} maxFontSizeMultiplier={1.1}>{text}</T>
    </Pressable>
  );
  // The right ones green, the wrong ones red (the mistakes not put right yet), the rest a neutral grey (Mojtaba 2026-10-21).
  const soft = (x: string) => (dark ? x : mix(x, c.surface, 0.2) ?? x);
  const rightTone = soft(c.ok), wrongTone = soft(c.bad), rest = dark ? mix(c.line, '#ffffff', 0.08) ?? c.line : mix(c.line, '#000000', 0.04) ?? c.line;
  const big2 = [60, 48, 40, 34][level] ?? 34;
  const dot = (color: string, text: string) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: color }} />
      <T style={{ color: c.muted, fontSize: 13, lineHeight: 20 }}>{text}</T>
    </View>
  );
  // A segment of the bar: its true share of the questions (Mojtaba 2026-10-29: 5 right and 35 wrong looked the same),
  // only kept from vanishing (a dot) while it has any.
  const seg = (n: number, color: string) => (n ? <View style={{ flexGrow: n, flexShrink: 1, flexBasis: 0, minWidth: 6, height: 12, borderRadius: 6, backgroundColor: color }} /> : null);
  // In the style of a picture Mojtaba sent (2026-10-29): the title with a «…» button at its end (it was this week's gain;
  // 2026-10-30), the percent large and light with a pill of the questions left beside it, the bar in three rounded parts with gaps, and a dot for each under it.
  return (
    // (its rows straight in the card, so the card spreads all its rows at even gaps; Mojtaba 2026-10-29)
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <T style={{ fontSize: 17, fontWeight: '700' }}>پیشرفت شما</T>
        </View>
        {/* (a «…» button at the title's end: the card opens to more on the progress, each part's count and share;
            Mojtaba 2026-10-30) */}
        <Pressable onPress={() => { tap(); setOpen(o => !o); }} hitSlop={8} accessibilityRole="button" accessibilityState={{ expanded: open }} accessibilityLabel={tr('جزئیات پیشرفت')}
          style={({ pressed }) => ({ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: open ? c.surface2 : 'transparent', opacity: pressed ? 0.7 : 1 })}>
          <Icon name="more" size={20} color={c.text} weight="semibold" />
        </Pressable>
      </View>
      {/* The percent large; the pills (in one line at the end, under the counts): the questions left (or, all answered,
          only a green circled tick), the tests' history and the mistakes, each opening its page, their icons in their
          own colours (Mojtaba 2026-10-30: the history and the mistakes were two cards under this one). */}
      <T raw style={{ fontSize: big2, lineHeight: Math.round(big2 * 1.13), fontFamily: RTL ? 'Vazirmatn-800' : 'Inter-700', color: done ? c.ok : c.text }}>{pctText(shown)}</T>
      <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: total, now: answered }} style={{ flexDirection: 'row', gap: 4 }}>
        {seg(right, rightTone)}
        {seg(wrong, wrongTone)}
        {seg(left, rest)}
      </View>
      {open ? (
        // Opened: each part on its own row, its count and its share of all the questions, with a thin bar.
        <View style={{ gap: 10 }}>
          {([['درست', right, rightTone], ['اشتباه', wrong, wrongTone], ['جواب‌نداده', left, rest]] as const).map(([label, n, color]) => (
            <View key={label} style={{ gap: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: color }} />
                <T style={{ flex: 1, fontSize: 14 }}>{label}</T>
                <T raw style={{ fontSize: 14, fontWeight: '700' }}>{faNum(n)}</T>
                <T raw style={{ width: 52, textAlign: 'right', fontSize: 13, color: c.muted }}>{pctText(total ? n / total : 0)}</T>
              </View>
              <View style={{ height: 6, borderRadius: 3, backgroundColor: c.surface2, overflow: 'hidden' }}>
                <View style={{ width: `${total ? (n / total) * 100 : 0}%`, minWidth: n ? 6 : 0, height: 6, borderRadius: 3, backgroundColor: color }} />
              </View>
            </View>
          ))}
        </View>
      ) : null}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 16, rowGap: 2, display: level >= 3 || open ? 'none' : 'flex' }}>
        {dot(rightTone, `${tr('درست')} ${faNum(right)}`)}
        {dot(wrongTone, `${tr('اشتباه')} ${faNum(wrong)}`)}
        {left ? dot(rest, `${tr('جواب‌نداده')} ${faNum(left)}`) : null}
      </View>
      {/* (the pills under the counts of right, wrong and unanswered; Mojtaba 2026-10-30) */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        {done ? (
          <View accessibilityLabel={tr('همه جواب داده شد')} style={{ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: c.okSoft }}>
            <Icon name="checkCircle" size={20} color={c.ok} weight="semibold" />
          </View>
        ) : tag('exam', c.link, t('{0} سؤال مانده', faNum(left)), wrong ? () => router.push('/mistakes') : undefined)}
        {tag('clock', c.text, t('{0} آزمون', faNum(tests)), () => router.push('/history'))}
        {tag('warning', mistakes ? c.bad : c.ok, t('{0} اشتباه', faNum(mistakes)), () => router.push('/mistakes'))}
      </View>
    </>
  );
}

