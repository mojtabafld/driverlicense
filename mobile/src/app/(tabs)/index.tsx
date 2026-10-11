// Home: progress at a glance (chance of passing, counts, progress chart), fitted to the screen without scrolling:
// the chart takes the height left, and on shorter screens the cards get more compact.
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, View, useWindowDimensions } from 'react-native';

import type { Attempt } from '@/lib/bank';
import { PROVE_PICS } from '@/lib/config';
import { faNum, isFull, isPass, lessonNumber, mistakeIds, passEstimate, pctOf, randomIds } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Icon, type IconName } from '@/ui/icon';
import { ArcButton, Button, Card, Ring, Screen, T, useCountUp } from '@/ui/kit';
import { COURSE } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { ProgressChart } from '@/ui/progress-chart';
import { isDark } from '@/lib/sun';
import { Pill, openAttempt, pctText } from '@/ui/activity';
import { ARC, useColors } from '@/ui/theme';
import { TAB_BAR_H } from '@/ui/tabs/app-tabs';

// A count card: a bare icon with the label beside it, then the number and one short line of detail (or, with
// `progress`, a slim progress bar with its percent); it opens its own page (exams, lessons, mistakes). A full
// `progress` (every lesson done) turns the icon, the number and the bar green.
function Stat({ icon, label, value, extra, sub, tone, onPress, short, progress }: { icon: IconName; label: string; value: string; extra?: string; sub?: string; tone?: 'bad' | 'ok'; onPress: () => void; short?: boolean; progress?: number }) {
  const c = useColors();
  const narrow = useWindowDimensions().width < 380; // three cards in a row: smaller icon and label on narrow phones
  if (progress != null && progress >= 1) tone = 'ok';
  const bar = useCountUp(progress != null ? Math.min(1, Math.max(0, progress)) : 0); // the bar fills when the app opens
  const fg = tone === 'bad' ? c.bad : tone === 'ok' ? c.ok : c.link;
  return (
    <Card onPress={onPress} style={{ flex: 1, gap: 4, paddingVertical: 10, paddingHorizontal: narrow ? 8 : 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: narrow ? 5 : 6 }}>
        {/* A bare line icon in the card's colour, no tile behind it. */}
        <Icon name={icon} size={narrow ? 18 : 20} color={fg} weight="semibold" />
        <T style={{ flexShrink: 1, color: c.text, fontSize: narrow ? 12 : 12.5, lineHeight: 20, fontWeight: '700' }} numberOfLines={1}>{label}</T>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <T style={{ flex: 1, fontSize: 22, lineHeight: 30, fontWeight: '800', color: tone === 'bad' ? c.bad : progress != null && tone === 'ok' ? c.ok : c.text }} numberOfLines={1}>
          {value}{extra ? <T style={{ color: progress != null && tone === 'ok' ? c.ok : c.muted, fontSize: 12, fontWeight: '600' }}>{extra}</T> : null}
        </T>
        <Icon name="chevronLeft" size={14} color={c.faint} weight="semibold" />
      </View>
      {progress != null ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, height: 16 }}>
          <View style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: c.surface2, overflow: 'hidden', flexDirection: 'row' }}>
            <View style={{ width: `${bar * 100}%`, borderRadius: 3, backgroundColor: fg }} />
          </View>
          <T style={{ color: tone === 'ok' ? c.ok : c.muted, fontSize: 10.5, lineHeight: 16, fontWeight: '600' }}>{pctText(bar)}</T>
        </View>
      ) : short ? null : <T style={{ color: c.muted, fontSize: 11, lineHeight: 16 }} numberOfLines={1}>{sub}</T>}
    </Card>
  );
}

// A greeting for the time of day where the user is: night whenever it is dark outside there (lib/sun.ts: after civil
// dusk and before dawn, so a bright summer evening at 20:00 is still «عصر» and a dark winter afternoon at 17:00 is
// «شب»); otherwise morning before 12, noon 12–15 and afternoon after.
// «به‌خیر» with a zero-width non-joiner: «به» is a preposition here, so it stays apart from «خیر» (the Academy's rule).
function greeting(d = new Date()) {
  if (isDark(d)) return 'شب به‌خیر';
  const h = d.getHours();
  return h < 12 ? 'صبح به‌خیر' : h < 15 ? 'ظهر به‌خیر' : 'عصر به‌خیر';
}

// The greeting, kept up to date while the app stays open.
function useGreeting() {
  const [g, setG] = useState(() => greeting());
  useEffect(() => {
    const t = setInterval(() => setG(greeting()), 60e3);
    return () => clearInterval(t);
  }, []);
  return g;
}

// In place of the (still empty) chart until the first exam: where to begin, the course's next lesson first and a
// short test (5 questions) after it.
function StartCard({ compact }: { compact: boolean }) {
  const c = useColors();
  const { bank, attempts, Q } = useApp();
  const { done } = useCourseProgress();
  // At /app the next of prove.dk's lessons not tried yet, in place of the app's own course.
  const tried = new Set(attempts.filter(a => a.mode === 'lesson').map(a => a.lesson));
  const pi = PROVE_PICS && bank ? bank.tests.findIndex(t => !tried.has(t.id)) : -1, pt = bank && pi >= 0 ? bank.tests[pi] : null;
  const next = PROVE_PICS ? null : COURSE.flatMap(ch => ch.lessons).find(l => !done[l.id]) ?? null;
  return (
    <Card style={{ flex: 1, gap: compact ? 10 : 14, padding: compact ? 14 : 18, justifyContent: 'center' }}>
      <T style={{ fontWeight: '800', fontSize: 18 }}>از اینجا شروع کنید</T>
      <T style={{ color: c.muted, fontSize: 14, lineHeight: 23 }}>
        {next ? `اول درس کوتاه «${next.title}» را بخوانید (${faNum(next.minutes)} دقیقه). بعد با یک آزمون کوتاه ببینید چقدر یاد گرفته‌اید.`
          : pt ? `اول درس ${faNum(lessonNumber(pt.title, pi))} را تمرین کنید. بعد با یک آزمون کوتاه ببینید چقدر یاد گرفته‌اید.`
          : 'با یک آزمون کوتاه ببینید چقدر آماده‌اید؛ بعد از آن، احتمال قبولی و نمودار پیشرفت اینجا نمایش داده می‌شوند.'}
      </T>
      {/* Main site: Arc's primary button (verb and object), the short test beside it Arc's secondary one. */}
      {next ? <ArcButton label={Object.keys(done).length ? 'شروع آموزش' : 'شروع درس اول'} icon="play" onPress={() => router.push({ pathname: '/course-lesson', params: { id: next.id } })} />
        : pt ? <Button label={tried.size ? 'درس بعدی' : 'شروع درس اول'} icon="play" onPress={() => {
          session.plan = { mode: 'lesson', ids: pt.qs.filter(id => Q.has(id)), lesson: pt.id, title: `درس ${faNum(lessonNumber(pt.title, pi))}` };
          router.push('/run');
        }} /> : null}
      {(() => {
        const short = () => {
          if (!bank) return;
          session.plan = { mode: 'random', ids: randomIds(bank, 5), title: 'آزمون تصادفی' };
          router.push('/run');
        };
        return ARC ? <ArcButton variant={next ? 'secondary' : 'primary'} label="آزمون کوتاه ۵ سؤالی" icon="exam" onPress={short} />
          : <Button kind={next || pt ? 'glass' : 'primary'} label="آزمون کوتاه ۵ سؤالی" icon="exam" onPress={short} />;
      })()}
    </Card>
  );
}

export default function Home() {
  const c = useColors();
  // Screen height decides how compact the page is: below 900 points (the picture header takes its share) less padding
  // and a smaller ring, below 680 the secondary lines go too, so everything stays on one screen above the tab bar.
  const { height } = useWindowDimensions();
  // Main site: the page is fitted to the screen it is on. It starts from the height's level and, while the chart's card
  // has less room than it needs, steps to a denser one (3: the averages row, the pass card's line and the lessons bar go,
  // tighter padding, the chart may be a little lower), so the chart's card ends just above the tab bar without the page scrolling; a new screen height
  // starts over.
  const [more, setMore] = useState(0);
  useEffect(() => setMore(0), [height]);
  const level = Math.min(3, (height < 680 ? 2 : height < 900 ? 1 : 0) + (ARC ? more : 0));
  const compact = level >= 1, tight = level >= 2, tighter = level >= 3;
  const chartMin = tighter ? 84 : 120;
  const chartNeed = (tighter ? 20 : compact ? 24 : 32) + 2 + 24 + (compact ? 8 : 12) + chartMin + 8 + 40;
  // The room from the chart card's top to the tab bar (the card's own height can't tell: it has a least height and the
  // page would scroll instead).
  const ins = useSafeAreaInsets(), chartBox = useRef<View>(null);
  const fit = () => {
    if (!ARC || level >= 3) return;
    chartBox.current?.measureInWindow((_x, top) => {
      const room = height - (TAB_BAR_H + 8 + Math.max(16, ins.bottom)) - top;
      if (top > 0 && room < chartNeed - 1) setMore(m => m + 1);
    });
  };
  const { user, attempts, bank } = useApp();
  const hello = useGreeting();
  const [picked, setPicked] = useState<number | null>(null); // the chart's picked attempt
  const est = passEstimate(attempts);
  const exams = attempts.filter(a => a.mode !== 'lesson');
  const fullN = attempts.filter(isFull).length, passN = attempts.filter(isPass).length;
  const lessonsDone = new Set(attempts.filter(a => a.mode === 'lesson').map(a => a.lesson)).size, lessonsAll = bank?.tests.length ?? 44;
  const mistakes = mistakeIds(attempts).length;
  // Average of the last 5 attempts and its change against the 5 before.
  const avg = (xs: Attempt[]) => (xs.length ? xs.reduce((s, a) => s + pctOf(a), 0) / xs.length : null);
  const avg5 = avg(attempts.slice(-5)), prev5 = avg(attempts.slice(-10, -5));
  const trend = avg5 != null && prev5 != null ? avg5 - prev5 : null;
  const probColor = !est ? c.faint : est.prob >= 0.7 ? c.ok : est.prob >= 0.4 ? c.warn : c.bad;
  const probSoft = !est ? c.surface2 : est.prob >= 0.7 ? c.okSoft : est.prob >= 0.4 ? c.warnSoft : c.badSoft;
  const probWord = !est ? 'هنوز تخمینی نیست' : est.prob >= 0.7 ? 'آماده‌ی آزمون' : est.prob >= 0.4 ? 'نزدیک به قبولی' : 'نیاز به تمرین';
  return (
    <Screen fill gap={tighter ? 8 : compact ? 10 : 14} title={user?.name ? `${hello}،` : hello} name={user?.name || undefined} subtitle={tight ? undefined : 'آماده‌ی تمرین امروز هستید؟'}
      hero={{ pic: 3, icon: 'house' }} barGap={ARC && exams.length ? 8 : undefined}>
      {/* The four cards at the top: the chance of passing and the three counts. */}
      <View style={{ gap: tighter ? 8 : compact ? 10 : 14 }}>
      <Card style={{ gap: compact ? 10 : 14, padding: tighter ? 10 : compact ? 12 : 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Ring value={est ? est.prob : 0} size={tighter ? 62 : compact ? 74 : 96} stroke={compact ? 8 : 9} color={probColor} label={est ? pctText(est.prob) : '–'} format={est ? pctText : undefined} />
          <View style={{ flex: 1, gap: compact ? 4 : 6, alignItems: 'flex-start' }}>
            <T style={{ fontWeight: '800', fontSize: 17 }}>احتمال قبولی</T>
            <Pill text={probWord} fg={probColor} bg={probSoft} />
            <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19, display: tight || tighter ? 'none' : 'flex' }}>{est ? `بر اساس ${faNum(est.n)} پاسخ اخیر شما در آزمون‌های تصادفی` : 'بعد از اولین آزمون، تخمین زده می‌شود.'}</T>
          </View>
        </View>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: c.line, paddingTop: compact ? 8 : 12, display: tighter ? 'none' : 'flex' }}>
          <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
            <T style={{ color: c.muted, fontSize: 12, textAlign: 'center' }}>میانگین ۵ آزمون اخیر</T>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 6 }}>
              <T style={{ fontWeight: '800', fontSize: 17, textAlign: 'center' }}>{avg5 != null ? pctText(avg5) : '–'}</T>
              {trend != null ? <T style={{ fontSize: 11, fontWeight: '700', color: trend >= 0 ? c.ok : c.bad }}>{trend >= 0 ? '▲' : '▼'} {pctText(Math.abs(trend))}</T> : null}
            </View>
          </View>
          <View style={{ width: 1, backgroundColor: c.line }} />
          <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
            <T style={{ color: c.muted, fontSize: 12, textAlign: 'center' }}>قبولی در آزمون کامل</T>
            <T style={{ fontWeight: '800', fontSize: 17, textAlign: 'center' }}>{fullN ? `${faNum(passN)} از ${faNum(fullN)}` : '–'}</T>
          </View>
        </View>
      </Card>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Stat onPress={() => router.navigate('/exam')} short={tight} icon="clipboard" label="آزمون‌ها" value={faNum(exams.length)} sub={fullN ? `${faNum(passN)} قبولی` : exams.length ? 'آزمون کامل نداده‌اید' : 'آزمون نداده‌اید'} />
        <Stat onPress={() => router.navigate('/learn')} short={tight} icon="learn" label="درس‌ها" value={faNum(lessonsDone)} extra={` / ${faNum(lessonsAll)}`} progress={tighter ? undefined : lessonsDone / lessonsAll} />
        <Stat onPress={() => router.push('/mistakes')} short={tight} icon="warning" label="اشتباهات" value={faNum(mistakes)} tone={mistakes ? 'bad' : 'ok'} sub={mistakes ? 'سؤال برای تمرین' : 'بدون اشتباه'} />
      </View>
      </View>
      {/* A tap anywhere in the chart's card, off the bars, clears the picked attempt. */}
      {exams.length ? (
      <View ref={chartBox} style={{ flex: 1 }} onLayout={fit}>
      <Pressable onPress={() => setPicked(null)} style={{ flex: 1 }} accessible={false}>
      <Card style={{ flex: 1, gap: compact ? 8 : 12, padding: tighter ? 10 : compact ? 12 : 16 }}>
        {ARC ? (() => {
          // Main site, as a forecast card: a small grey caption, the last attempt's score large, and its change against
          // the attempt before (green up, red down).
          const last = Math.round(pctOf(attempts[attempts.length - 1]) * 100);
          const before = attempts.length > 1 ? Math.round(pctOf(attempts[attempts.length - 2]) * 100) : null;
          const d = before == null ? 0 : last - before;
          return (
            <View style={{ gap: 2 }}>
              <T style={{ color: c.muted, fontSize: 12.5 }}>نمره‌ی آخرین آزمون</T>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10 }}>
                <T style={{ fontSize: tighter ? 24 : 32, fontWeight: '400', lineHeight: tighter ? 34 : 44 }}>{faNum(last)}٪</T>
                {before != null && d !== 0 ? (
                  <T style={{ color: d > 0 ? c.ok : c.bad, fontSize: 13, fontWeight: '600' }}>{d > 0 ? '↗' : '↘'} {faNum(Math.abs(d))}٪ نسبت به آزمون قبل</T>
                ) : before != null ? <T style={{ color: c.muted, fontSize: 13 }}>مثل آزمون قبل</T> : null}
              </View>
            </View>
          );
        })() : (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <T style={{ fontWeight: '700', fontSize: 16 }}>نمودار پیشرفت</T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: c.forest }} /><T style={{ color: c.muted, fontSize: 12 }}>قبولی</T>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: c.faint, marginRight: 4 }} /><T style={{ color: c.muted, fontSize: 12 }}>مردودی</T>
            <View style={{ width: 14, borderTopWidth: 2, borderStyle: 'dashed', borderColor: c.forest, marginRight: 4 }} /><T style={{ color: c.muted, fontSize: 12 }}>حد قبولی</T>
          </View>
        </View>
        )}
        <ProgressChart fill minH={chartMin} attempts={attempts} onOpen={openAttempt} sel={picked} onSel={setPicked} />
      </Card>
      </Pressable>
      </View>
      ) : <StartCard compact={compact} />}
    </Screen>
  );
}
