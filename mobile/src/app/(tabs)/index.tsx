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
import { ArcButton, Button, Card, FitLine, Ring, Screen, T, tap, useCountUp } from '@/ui/kit';
import { COURSE } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { ProgressChart } from '@/ui/progress-chart';
import { isDark } from '@/lib/sun';
import { Pill, openAttempt, pctText } from '@/ui/activity';
import { ARC, useColors } from '@/ui/theme';
import { TAB_BAR_H } from '@/ui/tabs/app-tabs';
import { HomeLicenceArt } from '@/ui/header-art';

// A count card: a bare icon with the label beside it, then the number and one short line of detail (or, with
// `progress`, a slim progress bar with its percent); it opens its own page (exams, lessons, mistakes). A full
// `progress` (every lesson done) turns the icon, the number and the bar green.
// `bare`: no card of its own, a pressable cell in the shared card (main site).
function Stat({ icon, label, value, extra, sub, tone, onPress, short, progress, bare }: { icon: IconName; label: string; value: string; extra?: string; sub?: string; tone?: 'bad' | 'ok'; onPress: () => void; short?: boolean; progress?: number; bare?: boolean }) {
  const c = useColors();
  const narrow = useWindowDimensions().width < 380; // three cards in a row: smaller icon and label on narrow phones
  if (progress != null && progress >= 1) tone = 'ok';
  const bar = useCountUp(progress != null ? Math.min(1, Math.max(0, progress)) : 0); // the bar fills when the app opens
  const fg = tone === 'bad' ? c.bad : tone === 'ok' ? c.ok : c.link;
  const body = (<>
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
  </>);
  const pad = { gap: 4, paddingVertical: 10, paddingHorizontal: narrow ? 8 : 10 };
  return bare ? (
    <Pressable onPress={() => { tap(); onPress(); }} style={({ pressed }) => [{ flex: 1 }, pad, pressed && { opacity: 0.7 }]}>{body}</Pressable>
  ) : <Card onPress={onPress} style={{ flex: 1, ...pad }}>{body}</Card>;
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
      {/* Main site: a smaller lead naming both ways to start, Mojtaba asked. */}
      {PROVE_PICS ? <T style={{ fontWeight: '800', fontSize: 18 }}>از اینجا شروع کنید</T>
        : <T style={{ fontWeight: '700', fontSize: 15, lineHeight: 24 }}>با آموزش گام به گام یا یک آزمون کوتاه شروع کنید.</T>}
      {/* With a course lesson next (main site), the two buttons speak for themselves: no line here, Mojtaba asked. */}
      {next ? null : <T style={{ color: c.muted, fontSize: 14, lineHeight: 23 }}>
        {pt ? `اول درس ${faNum(lessonNumber(pt.title, pi))} را تمرین کنید. بعد با یک آزمون کوتاه ببینید چقدر یاد گرفته‌اید.`
          : 'با یک آزمون کوتاه ببینید چقدر آماده‌اید؛ بعد از آن، احتمال قبولی و نمودار پیشرفت اینجا نمایش داده می‌شوند.'}
      </T>}
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
  // has less room than it needs, steps to a denser one (3: the pass card's line and the lessons bar go, tighter padding,
  // the chart may be lower; the averages row stays, Mojtaba asked), so the chart's card ends just above the tab bar
  // without the page scrolling; a new screen height starts over.
  const [more, setMore] = useState(0);
  useEffect(() => setMore(0), [height]);
  const level = Math.min(3, (height < 680 ? 2 : height < 900 ? 1 : 0) + (ARC ? more : 0));
  const compact = level >= 1, tight = level >= 2, tighter = level >= 3;
  const chartMin = tighter ? (ARC ? 64 : 84) : 120;
  // Main site at the densest level: the «tap the chart» hint under it goes too (the line shows only for a picked attempt).
  const noHint = ARC && tighter;
  const chartNeed = (tighter ? 20 : compact ? 24 : 32) + 2 + 24 + (compact ? 8 : 12) + chartMin + (noHint ? 0 : 8 + 40);
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
  // On the web the box's layout event does not fire when only its top moves (the cards above it filling in), so look
  // again a little after each change.
  useEffect(() => {
    const ts = [300, 1000, 2500].map(ms => setTimeout(fit, ms));
    return () => ts.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
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
    // Main site: a full stop after the name; the LRM keeps it after a Latin name in the RTL line, Mojtaba asked.
    <Screen fill gap={tighter ? 8 : compact ? 10 : 14} title={user?.name ? `${hello}،` : hello} name={user?.name ? (ARC ? `${user.name}.\u200E` : user.name) : undefined} subtitle={tight && !ARC ? undefined : 'آماده‌ی تمرین امروز هستید؟'}
      hero={{ pic: 3, icon: 'house', art: ARC ? HomeLicenceArt : undefined }} barGap={ARC ? 8 : undefined}>
      {/* The four cards at the top: the chance of passing and the three counts. */}
      <View style={{ gap: tighter ? 8 : compact ? 10 : 14 }}>
      <Card style={{ gap: compact ? 10 : 14, padding: tighter ? 10 : compact ? 12 : 16 }}>
        {/* Main site: the ring and its words close together, the pair in the middle of the card, Mojtaba asked. */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: ARC ? 20 : 16, justifyContent: ARC ? 'center' : undefined }}>
          <View>
            <Ring value={est ? est.prob : 0} size={tighter ? 62 : compact ? 74 : 96} stroke={compact ? 8 : 9} color={probColor} label={est ? pctText(est.prob) : '–'} format={est ? pctText : undefined} />
          </View>
          {/* Main site: the title, the pill and the line centred on one another (the pill right under the title), Mojtaba asked. */}
          <View style={{ flex: 1, flexShrink: 1, gap: compact ? 4 : 6, alignItems: ARC ? 'center' : 'flex-start' }}>
            <T style={{ fontWeight: '800', fontSize: 17 }}>احتمال قبولی</T>
            <Pill text={probWord} fg={probColor} bg={probSoft} />
            {/* Main site: no line before the first exam. */}
            {/* Main site: a short line, kept on one line (shrinking only when the card is too narrow), Mojtaba asked. */}
            {ARC && est && !tight ? <FitLine size={12.5} min={8} style={{ color: c.muted, lineHeight: 20, textAlign: 'center' }}>{`بر اساس ${faNum(est.n)} تست اخیر`}</FitLine> : null}
            <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19, textAlign: ARC ? 'center' : undefined, display: tight || tighter || ARC ? 'none' : 'flex' }}>{est ? `بر اساس ${faNum(est.n)} پاسخ اخیر شما در آزمون‌های تصادفی` : 'بعد از اولین آزمون، تخمین زده می‌شود.'}</T>
          </View>
        </View>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: c.line, paddingTop: tighter ? 6 : compact ? 8 : 12, display: tighter && !ARC ? 'none' : 'flex' }}>
          <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
            <FitLine size={12} style={{ color: c.muted, textAlign: 'center' }}>میانگین ۵ آزمون اخیر</FitLine>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 6 }}>
              <T style={{ fontWeight: '800', fontSize: 17, textAlign: 'center' }}>{avg5 != null ? pctText(avg5) : '–'}</T>
              {trend != null ? <T style={{ fontSize: 11, fontWeight: '700', color: trend >= 0 ? c.ok : c.bad }}>{trend >= 0 ? '▲' : '▼'} {pctText(Math.abs(trend))}</T> : null}
            </View>
          </View>
          <View style={{ width: 1, backgroundColor: c.line }} />
          <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
            <FitLine size={12} style={{ color: c.muted, textAlign: 'center' }}>قبولی در آزمون کامل</FitLine>
            <T style={{ fontWeight: '800', fontSize: 17, textAlign: 'center' }}>{fullN ? `${faNum(passN)} از ${faNum(fullN)}` : '–'}</T>
          </View>
        </View>
      </Card>
      {/* Main site: the three counts share one card, split by thin vertical lines, Mojtaba asked. */}
      {ARC ? (
        <Card style={{ flexDirection: 'row', padding: 0 }}>
          <Stat bare onPress={() => router.navigate('/exam')} short={tight} icon="clipboard" label="آزمون‌ها" value={faNum(exams.length)} sub={fullN ? `${faNum(passN)} قبولی` : exams.length ? 'آزمون کامل نداده‌اید' : 'آزمون نداده‌اید'} />
          <View style={{ width: 1, marginVertical: 10, backgroundColor: c.line }} />
          <Stat bare onPress={() => router.navigate('/learn')} short={tight} icon="learn" label="درس‌ها" value={faNum(lessonsDone)} extra={` / ${faNum(lessonsAll)}`} progress={tighter ? undefined : lessonsDone / lessonsAll} />
          <View style={{ width: 1, marginVertical: 10, backgroundColor: c.line }} />
          <Stat bare onPress={() => router.push('/mistakes')} short={tight} icon="warning" label="اشتباهات" value={faNum(mistakes)} tone={mistakes ? 'bad' : 'ok'} sub={mistakes ? 'سؤال برای تمرین' : 'بدون اشتباه'} />
        </Card>
      ) : (
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Stat onPress={() => router.navigate('/exam')} short={tight} icon="clipboard" label="آزمون‌ها" value={faNum(exams.length)} sub={fullN ? `${faNum(passN)} قبولی` : exams.length ? 'آزمون کامل نداده‌اید' : 'آزمون نداده‌اید'} />
        <Stat onPress={() => router.navigate('/learn')} short={tight} icon="learn" label="درس‌ها" value={faNum(lessonsDone)} extra={` / ${faNum(lessonsAll)}`} progress={tighter ? undefined : lessonsDone / lessonsAll} />
        <Stat onPress={() => router.push('/mistakes')} short={tight} icon="warning" label="اشتباهات" value={faNum(mistakes)} tone={mistakes ? 'bad' : 'ok'} sub={mistakes ? 'سؤال برای تمرین' : 'بدون اشتباه'} />
      </View>
      )}
      </View>
      {/* A tap anywhere in the chart's card, off the bars, clears the picked attempt. */}
      {/* Main site: the chart card always, empty until there are attempts; /app keeps the start card. */}
      {exams.length || ARC ? (
      <View ref={chartBox} style={{ flex: 1 }} onLayout={fit}>
      <Pressable onPress={() => setPicked(null)} style={{ flex: 1 }} accessible={false}>
      <Card style={{ flex: 1, gap: compact ? 8 : 12, padding: tighter ? 10 : compact ? 12 : 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <T style={{ fontWeight: '700', fontSize: 16 }}>نمودار پیشرفت</T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            {/* Main site: the chart marks passed attempts green and failed ones red, and draws the pass line dashed grey. */}
            {ARC ? <>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: c.ok }} /><T style={{ color: c.muted, fontSize: 12 }}>قبولی</T>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: c.bad, marginRight: 4 }} /><T style={{ color: c.muted, fontSize: 12 }}>مردودی</T>
              <View style={{ width: 14, borderTopWidth: 1.5, borderStyle: 'dashed', borderColor: c.faint, marginRight: 4 }} /><T style={{ color: c.muted, fontSize: 12 }}>حد قبولی</T>
            </> : <>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: c.forest }} /><T style={{ color: c.muted, fontSize: 12 }}>قبولی</T>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: c.faint, marginRight: 4 }} /><T style={{ color: c.muted, fontSize: 12 }}>مردودی</T>
              <View style={{ width: 14, borderTopWidth: 2, borderStyle: 'dashed', borderColor: c.forest, marginRight: 4 }} /><T style={{ color: c.muted, fontSize: 12 }}>حد قبولی</T>
            </>}
          </View>
        </View>
        <ProgressChart fill minH={chartMin} noHint={noHint} attempts={attempts} onOpen={openAttempt} sel={picked} onSel={setPicked} />
      </Card>
      </Pressable>
      </View>
      ) : <StartCard compact={compact} />}
    </Screen>
  );
}
