// Home: progress at a glance (chance of passing, counts, progress chart), fitted to the screen without scrolling:
// the chart takes the height left, and on shorter screens the cards get more compact.
// Main site: the chart button beside the profile picture opens the chart view (ui/chart-view.tsx): the chart glides to
// the top and the test statistics and latest tests come in under it (then the page scrolls).
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Animated, AppState, Easing, Pressable, ScrollView, View, useWindowDimensions, type GestureResponderEvent } from 'react-native';

import type { Attempt } from '@/lib/bank';
import { PROVE_BANK, PROVE_PICS } from '@/lib/config';
import { faNum, lessonNumber, mistakeIds, passEstimate, pctOf, randomIds, scoreOf } from '@/lib/logic';
import { RTL } from '@/lib/i18n';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Icon, type IconName } from '@/ui/icon';
import { ArcButton, Button, Card, FitLine, Ring, Screen, T, tap, useCountUp } from '@/ui/kit';
import { COURSE } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { ProgressChart } from '@/ui/progress-chart';
import { isDark } from '@/lib/sun';
import { ActivityList, Pill, openAttempt, pctText } from '@/ui/activity';
import { TestStats } from '@/ui/chart-view';
import { BellButton } from '@/ui/bell-button';
import { Avatar } from '@/ui/avatar';
import { usePlainHeader } from '@/lib/header-style';
import { ARC, useColors } from '@/ui/theme';
import { TAB_BAR_H } from '@/ui/tabs/app-tabs';
import { GreetIcon, type DayPart } from '@/ui/greet-icon';
import { HomeLicenceArt } from '@/ui/header-art';

// A count card: a bare icon with the label beside it, then the number and one short line of detail (or, with
// `progress`, a slim progress bar with its percent); it opens its own page (exams, lessons, mistakes). A full
// `progress` (every lesson done) turns the icon, the number and the bar green.
// `bare`: no card of its own, a pressable cell in the shared card (main site).
// `grow`: this much taller (the room the plain header leaves, shared out on the home page), split above and below.
// `dense`: the densest home page (main site): a little less padding, every line kept.
function Stat({ icon, label, value, extra, sub, tone, onPress, short, progress, bare, grow = 0, dense }: { icon: IconName; label: string; value: string; extra?: string; sub?: string; tone?: 'bad' | 'ok'; onPress: () => void; short?: boolean; progress?: number; bare?: boolean; grow?: number; dense?: boolean }) {
  const c = useColors();
  const narrow = useWindowDimensions().width < 380; // three cards in a row: smaller icon and label on narrow phones
  if (progress != null && progress >= 1) tone = 'ok';
  const bar = useCountUp(progress != null ? Math.min(1, Math.max(0, progress)) : 0); // the bar fills when the app opens
  const fg = tone === 'bad' ? c.bad : tone === 'ok' ? c.ok : c.link;
  const soft = tone === 'bad' ? c.badSoft : tone === 'ok' ? c.okSoft : c.accentSoft;
  const body = (<>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: narrow ? 5 : 6 }}>
        {/* The line icon in the card's colour on a soft tile of that colour (the icon's size as before; Mojtaba 2026-10-25). */}
        <View style={{ width: narrow ? 30 : 34, height: narrow ? 30 : 34, borderRadius: narrow ? 9 : 10, alignItems: 'center', justifyContent: 'center', backgroundColor: soft }}>
          <Icon name={icon} size={narrow ? 18 : 20} color={fg} weight="semibold" />
        </View>
        <T style={{ flexShrink: 1, color: c.text, fontSize: narrow ? 12 : 12.5, lineHeight: 20, fontWeight: '700' }} numberOfLines={1}>{label}</T>
      </View>
      {/* (the number a little further from its label; Mojtaba 2026-10-25) */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: dense ? 6 : 12 }}>
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
  // (a little lower than before: less room above and under; Mojtaba 2026-10-25)
  const pad = { gap: dense ? 2 : 4, paddingVertical: (dense ? 4 : 6) + grow / 4, paddingHorizontal: narrow ? 8 : 10 };
  return bare ? (
    <Pressable onPress={() => { tap(); onPress(); }} style={({ pressed }) => [{ flex: 1 }, pad, pressed && { opacity: 0.7 }]}>{body}</Pressable>
  ) : <Card onPress={onPress} style={{ flex: 1, ...pad }}>{body}</Card>;
}

// The chance of passing as a large number, counting up as the ring fills; «–» before there is an estimate.
function PassPct({ value, size }: { value: number | null; size: number }) {
  const shown = useCountUp(value ?? 0, 1800);
  return <T style={{ fontSize: size, lineHeight: Math.round(size * 1.3), fontWeight: '800' }}>{value == null ? '–' : pctText(shown)}</T>;
}

// A greeting for the time of day where the user is: night whenever it is dark outside there (lib/sun.ts: after civil
// dusk and before dawn, so a bright summer evening at 20:00 is still «عصر» and a dark winter afternoon at 17:00 is
// «شب»); otherwise morning before 12, noon 12–15 and afternoon after.
// «به‌خیر» with a zero-width non-joiner: «به» is a preposition here, so it stays apart from «خیر» (the Academy's rule).
function dayPart(d = new Date()): DayPart {
  if (isDark(d)) return 'night';
  const h = d.getHours();
  return h < 12 ? 'morning' : h < 15 ? 'noon' : 'evening';
}
const GREET: Record<DayPart, string> = { morning: 'صبح به‌خیر', noon: 'ظهر به‌خیر', evening: 'عصر به‌خیر', night: 'شب به‌خیر' };

// The part of the day, kept up to date while the app stays open (the greeting and its drawing follow it).
// Looked at again every 20 seconds, and at once when the app comes back to the front (its timers stand still in the
// background, so a greeting from the morning stayed on into the afternoon; Mojtaba 2026-10-18) or the tab is shown.
function useDayPart() {
  const [g, setG] = useState(() => dayPart());
  useEffect(() => {
    const now = () => setG(dayPart());
    const t = setInterval(now, 20e3);
    const app = AppState.addEventListener('change', st => { if (st === 'active') now(); });
    const web = typeof document !== 'undefined' && typeof document.addEventListener === 'function';
    const vis = () => { if (document.visibilityState === 'visible') now(); };
    if (web) { document.addEventListener('visibilitychange', vis); window.addEventListener('focus', now); }
    return () => { clearInterval(t); app.remove(); if (web) { document.removeEventListener('visibilitychange', vis); window.removeEventListener('focus', now); } };
  }, []);
  useFocusEffect(useCallback(() => { setG(dayPart()); }, []));
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

// The line under the greeting, once the opening is over: these take turns every 10 seconds (Mojtaba 2026-10-18).
const TURNS = ['تمرین امروز را شروع کنید.', 'یک آزمون تصادفی بدهید.', 'پیشرفت خودتان را بررسی کنید.'];

export default function Home() {
  const c = useColors();
  // Screen height decides how compact the page is: below 900 points (the picture header takes its share) less padding
  // and a smaller ring, below 680 the secondary lines go too, so everything stays on one screen above the tab bar.
  const { height, width } = useWindowDimensions();
  // «هدر ساده»: the header is lower (Hero in ui/kit.tsx); the height it leaves is shared out evenly between the three
  // cards (the pass card, the counts, the chart) instead of all going to the chart (Mojtaba 2026-10-18).
  const plain = usePlainHeader();
  const share = plain ? Math.max(0, Math.round((Math.min(Math.round(width * 0.34), 190) + 70 - 128) / 3)) : 0;
  // Main site: the page is fitted to the screen it is on. It starts from the height's level and, while the chart's card
  // has less room than it needs, steps to a denser one (3: the pass card's line and the lessons bar go, tighter padding,
  // the chart may be lower; the averages row stays, Mojtaba asked), so the chart's card ends just above the tab bar
  // without the page scrolling; a new screen height starts over.
  const [more, setMore] = useState(0);
  useEffect(() => setMore(0), [height]);
  const level = Math.min(3, (height < 680 ? 2 : height < 900 ? 1 : 0) + (ARC ? more : 0));
  const compact = level >= 1, tight = level >= 2, tighter = level >= 3;
  const gap = tighter ? 8 : compact ? 10 : 14; // between the page's cards
  // The chart view (Mojtaba 2026-10-19): `view` while it is open (or opening), `t` its motion from 0 to 1, `grow` the
  // chart card's height from and to while it is shown or moving (null when closed: the card takes the height left).
  // Opening, the cards above the chart fold up and fade, so the chart glides to the top keeping its height (on a short
  // screen growing to a comfortable one), and the statistics and the latest tests come in under it; closing, the page
  // goes back to its top and all of it moves back.
  const { user, attempts, bank, premium } = useApp();
  const exams = attempts.filter(a => a.mode !== 'lesson');
  const ins = useSafeAreaInsets(), chartBox = useRef<View>(null);
  const [view, setView] = useState(false), [grow, setGrow] = useState<[number, number] | null>(null), [hint, setHint] = useState(0);
  // The latest tests' card in the chart view, and whether the page is at its end (the hint plays once each time it gets there).
  const listBox = useRef<View>(null), atEnd = useRef(false);
  const [t] = useState(() => new Animated.Value(0));
  const topH = useRef(0), chartH = useRef(0), scroll = useRef<ScrollView>(null);
  // Before the first exam (the chart empty), the chart view's chart is made lower when the statistics and the empty
  // latest tests would otherwise run under the tab bar, so that card ends just above it (small screens; Mojtaba
  // 2026-10-19). `openTop`: where the chart's card will start once the cards above it have folded; `underH`: the
  // height of what comes under it. Both are measured as the view opens, and the lower height is set once both are known.
  // `low`: too little room for the line under the empty chart (iPhone SE), so it goes in the view and the plot keeps
  // some height; the latest tests card says there are none.
  const openTop = useRef<number | null>(null), underH = useRef<number | null>(null);
  const [low, setLow] = useState(false);
  const fitEmpty = () => {
    if (exams.length || openTop.current == null || underH.current == null) return;
    const room = Math.floor(height - (TAB_BAR_H + gap + Math.max(16, ins.bottom)) - openTop.current - gap - underH.current);
    setGrow(g => (g && room < g[1] ? [g[0], Math.max(96, room)] : g));
    setLow(room < 140);
  };
  const toggle = () => {
    const open = !view;
    if (open) {
      const from = Math.max(1, chartH.current);
      setGrow([from, Math.max(from, Math.min(320, Math.round(height * 0.38)))]);
      openTop.current = underH.current = null;
      chartBox.current?.measureInWindow((_x, top) => { openTop.current = top - topH.current - gap; fitEmpty(); });
    } else { scroll.current?.scrollTo({ y: 0, animated: true }); atEnd.current = false; }
    setView(open);
    t.stopAnimation();
    Animated.timing(t, { toValue: open ? 1 : 0, duration: open ? 480 : 420, easing: Easing.inOut(Easing.cubic), useNativeDriver: false })
      .start(({ finished }) => {
        if (finished && !open) { setGrow(null); setLow(false); }
        // Opened: the latest tests' «all» button shows «نمایش همه» for a moment, as on the exam page, once the page is
        // scrolled down to its end (Mojtaba 2026-10-20); at once when that card is already whole above the tab bar.
        if (finished && open) listBox.current?.measureInWindow((_x, y, _w, h) => {
          if (h && y + h <= height - (TAB_BAR_H + gap + Math.max(16, ins.bottom)) + 1 && !atEnd.current) { atEnd.current = true; setHint(n => n + 1); }
        });
      });
  };
  // In the chart view, a swipe down from the page's top (at least 50 points, mostly vertical) closes it, back to the
  // home page as it opens (Mojtaba 2026-10-19). Plain touch events, so the page still scrolls as before; `scrollY`: a
  // swipe down while the page is scrolled scrolls it back up instead. `swiped`: the tap a swipe ends with on the chart's
  // card is not a second toggle.
  const scrollY = useRef(0), touch = useRef<{ x: number; y: number } | null>(null), swiped = useRef(0);
  // The touch's point: on the web it is only in the event's touch lists.
  const at = (e: GestureResponderEvent) => {
    const n = e.nativeEvent, p = n.changedTouches?.[0] ?? n.touches?.[0];
    return { x: p?.pageX ?? n.pageX, y: p?.pageY ?? n.pageY };
  };
  // Closed, the other way: a swipe up on the progress chart's card (at least 50 points, mostly vertical) opens the view,
  // as a tap does (Mojtaba 2026-10-20).
  // Android: the page's scroll takes over a drag once it moves a few points (the chart view's page scrolls), and the touch
  // is cancelled there instead of ending; so in the chart view, at the page's top, a drag down cancelled that way
  // closes it too (Mojtaba 2026-10-21: it did not close on Android).
  const swipe = ARC ? {
    onTouchStart: (e: GestureResponderEvent) => { touch.current = !view || scrollY.current <= 0 ? at(e) : null; },
    onTouchEnd: (e: GestureResponderEvent) => {
      const from = touch.current, to = at(e); touch.current = null;
      if (!from || to.y == null) return;
      const dy = to.y - from.y, dx = to.x - from.x;
      if ((view ? dy > 50 : dy < -50) && Math.abs(dy) > Math.abs(dx) * 2) { swiped.current = Date.now(); toggle(); }
    },
    onTouchCancel: (e: GestureResponderEvent) => {
      const from = touch.current, to = at(e); touch.current = null;
      if (!from || to.y == null || !view || scrollY.current > 0) return;
      const dy = to.y - from.y, dx = to.x - from.x;
      if (dy > 4 && dy > Math.abs(dx) * 2) { swiped.current = Date.now(); toggle(); }
    },
  } : null;
  const chartMin = tighter ? (ARC ? 52 : 84) : 120;
  // Main site at the densest level: the «tap the chart» hint under it goes too (the line shows only for a picked attempt).
  const noHint = ARC && tighter;
  const chartNeed = (tighter ? 20 : compact ? 24 : 32) + 2 + 24 + (compact ? 8 : 12) + chartMin + (noHint ? 0 : 8 + 40);
  // The room from the chart card's top to the tab bar (the card's own height can't tell: it has a least height and the
  // page would scroll instead).
  const fit = () => {
    if (!ARC || level >= 3 || grow) return;
    chartBox.current?.measureInWindow((_x, top) => {
      const room = height - (TAB_BAR_H + gap + Math.max(16, ins.bottom)) - top;
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
  const part = useDayPart(), hello = GREET[part];
  const [picked, setPicked] = useState<number | null>(null); // the chart's picked attempt
  const est = passEstimate(attempts);
  // Main site: the step-by-step course's lessons (lib/course.ts) finished out of those written; /app: prove.dk's lessons tried.
  const { done } = useCourseProgress();
  const ready = COURSE.flatMap(ch => ch.lessons);
  const lessonsDone = PROVE_BANK ? new Set(attempts.filter(a => a.mode === 'lesson').map(a => a.lesson)).size : ready.filter(l => done[l.id]).length;
  const lessonsAll = PROVE_BANK ? bank?.tests.length ?? 44 : Math.max(1, ready.length);
  const mistakes = mistakeIds(attempts).length;
  // Average of the last 5 attempts and its change against the 5 before.
  const avg = (xs: Attempt[]) => (xs.length ? xs.reduce((s, a) => s + pctOf(a), 0) / xs.length : null);
  // «میانگین»: the average of all tests (Mojtaba 2026-10-25; it was of the last 5, with their trend): every test the
  // «آزمون‌ها» count counts and the chart view's statistics average (the course's lessons left out).
  const avgAll = avg(exams);
  const probColor = !est ? c.faint : est.prob >= 0.7 ? c.ok : est.prob >= 0.4 ? c.warn : c.bad;
  const probSoft = !est ? c.surface2 : est.prob >= 0.7 ? c.okSoft : est.prob >= 0.4 ? c.warnSoft : c.badSoft;
  const probWord = !est ? 'هنوز تخمینی نیست' : est.prob >= 0.7 ? 'آماده‌ی آزمون' : est.prob >= 0.4 ? 'نزدیک به قبولی' : 'نیاز به تمرین';
  return (
    // Main site: a full stop after the name; the LRM keeps it after a Latin name in the RTL line, Mojtaba asked.
    <Screen lead={<GreetIcon part={part} size={plain ? 28 : 22} />} fill gap={gap} scrollRef={scroll} onScrollY={(y, end) => { scrollY.current = y; if (!view) { atEnd.current = false; return; } if (end && !atEnd.current) setHint(n => n + 1); atEnd.current = end; }} title={user?.name ? `${hello}،` : hello} name={user?.name ? (ARC ? `${user.name}.\u200E` : user.name) : undefined} subtitle={tight && !ARC ? undefined : 'آماده‌ی تمرین امروز هستید؟'} subtitleAfter={TURNS}
      hero={{ pic: 3, icon: 'house', art: ARC ? HomeLicenceArt : undefined }} heroAction={{ node: <Avatar size={44} premium={premium} bare />, label: 'حساب کاربری و تنظیمات', onPress: () => router.navigate('/settings') }} barGap={ARC ? gap : undefined}
      heroExtra={ARC ? <BellButton /> : undefined}>
      {/* The four cards at the top: the chance of passing and the three counts (folded away in the chart view). */}
      <Animated.View pointerEvents={view ? 'none' : 'auto'} aria-hidden={view || undefined}
        onLayout={e => { if (!grow) topH.current = e.nativeEvent.layout.height; }}
        style={grow ? {
          overflow: 'hidden',
          height: t.interpolate({ inputRange: [0, 1], outputRange: [topH.current, 0] }),
          marginBottom: t.interpolate({ inputRange: [0, 1], outputRange: [0, -gap] }),
          opacity: t.interpolate({ inputRange: [0, 0.55], outputRange: [1, 0], extrapolate: 'clamp' }),
          transform: [{ translateY: t.interpolate({ inputRange: [0, 1], outputRange: [0, -14] }) }],
        } : undefined}>
      <View style={{ gap }}>
      <Card style={{ gap: compact ? 10 : 14, padding: tighter ? 10 : compact ? 12 : 16, paddingVertical: (tighter ? 10 : compact ? 12 : 16) + share / 2 }}>
        {ARC ? <>
          {/* Main site (Mojtaba 2026-10-29): the larger ring at the card's start (the right in Persian) and beside it the
              title with its pill under it, as before; no average or mistakes in this card. */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tighter ? 12 : 18 }}>
            {/* In the ring a trophy in the text colour (it was a flame); its percent between the title and the pill (Mojtaba 2026-10-29). */}
            <Ring value={est ? est.prob : 0} size={tighter ? 76 : compact ? 104 : 120} stroke={tighter ? 8 : 11} color={probColor}>
              <Icon name="trophy" size={Math.round((tighter ? 76 : compact ? 104 : 120) * 0.3)} color={c.text} weight="semibold" />
            </Ring>
            <View style={{ flex: 1, gap: compact ? 2 : 4, alignItems: 'flex-start' }}>
              <T style={{ fontWeight: '800', fontSize: 20 }}>احتمال قبولی</T>
              <PassPct value={est ? est.prob : null} size={tighter ? 26 : 32} />
              <Pill text={probWord} fg={probColor} bg={probSoft} />
            </View>
          </View>
        </> : <>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View><Ring value={est ? est.prob : 0} size={tighter ? 62 : compact ? 74 : 96} stroke={compact ? 8 : 9} color={probColor} label={est ? pctText(est.prob) : '–'} format={est ? pctText : undefined} /></View>
          <View style={{ flex: 1, flexShrink: 1, gap: compact ? 4 : 6, alignItems: 'flex-start' }}>
            <T style={{ fontWeight: '800', fontSize: 17 }}>احتمال قبولی</T>
            <Pill text={probWord} fg={probColor} bg={probSoft} />
            <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19, display: tight || tighter ? 'none' : 'flex' }}>{est ? `بر اساس ${faNum(est.n)} پاسخ اخیر شما در آزمون‌های تصادفی` : 'بعد از اولین آزمون، تخمین زده می‌شود.'}</T>
          </View>
        </View>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: c.line, paddingTop: tighter ? 6 : compact ? 8 : 12, display: tighter ? 'none' : 'flex' }}>
          <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
            <FitLine size={12} style={{ color: c.muted, textAlign: 'center' }}>میانگین</FitLine>
            <T style={{ fontWeight: '800', fontSize: 17, textAlign: 'center' }}>{avgAll != null ? pctText(avgAll) : '–'}</T>
          </View>
          <View style={{ width: 1, backgroundColor: c.line }} />
          <Pressable onPress={() => { tap(); router.push('/mistakes'); }} accessibilityRole="button" style={({ pressed }) => ({ flex: 1, alignItems: 'center', gap: 2, opacity: pressed ? 0.7 : 1 })}>
            <FitLine size={12} style={{ color: c.muted, textAlign: 'center' }}>اشتباهات</FitLine>
            <T style={{ fontWeight: '800', fontSize: 17, textAlign: 'center', color: mistakes ? c.bad : c.text }}>{faNum(mistakes)}</T>
          </Pressable>
        </View>
        </>}
      </Card>
      {/* Main site: the tests' statistics in place of the three counts (Mojtaba 2026-10-29); /app keeps its counts. */}
      {ARC ? <TestStats attempts={exams} dense={compact} noHead={tighter} /> : (
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Stat grow={share} onPress={() => router.navigate('/exam')} short={tight} icon="exam" label="آزمون‌ها" value={faNum(exams.length)} />
        <Stat grow={share} onPress={() => router.navigate('/learn')} short={tight} icon="learn" label="درس‌ها" value={faNum(lessonsDone)} extra={` / ${faNum(lessonsAll)}`} />
        <Stat grow={share} onPress={() => router.push('/mistakes')} short={tight} icon="warning" label="اشتباهات" value={faNum(mistakes)} tone={mistakes ? 'bad' : 'ok'} />
      </View>
      )}
      </View>
      </Animated.View>
      {/* A tap anywhere in the chart's card, off its points: on the main site it opens or closes the chart view as the
          header's chart button does, the picked test staying picked (Mojtaba 2026-10-19); at /app it clears the pick. */}
      {/* Main site: the chart card always, empty until there are attempts; /app keeps the start card. */}
      {exams.length || ARC ? (
      <Animated.View {...swipe} style={grow ? { height: t.interpolate({ inputRange: [0, 1], outputRange: grow }) } : { flex: 1 }}
        onLayout={e => { if (!grow) chartH.current = e.nativeEvent.layout.height; }}>
      <View ref={chartBox} style={{ flex: 1 }} onLayout={fit}>
      <Pressable onPress={() => { if (Date.now() - swiped.current < 400) return; if (ARC) toggle(); else setPicked(null); }} style={{ flex: 1 }} accessible={false}>
      <Card style={{ flex: 1, gap: compact ? 8 : 12, padding: tighter ? 10 : compact ? 12 : 16 }}>
        {ARC ? (() => {
          // As the picture's head (Mojtaba 2026-10-29): the title over a short line at its start; at its end the latest
          // test's right answers large, and under them how its percent moved from the test before (green up, red down).
          const last = exams[exams.length - 1], prev = exams[exams.length - 2];
          const diff = last && prev ? Math.round((pctOf(last) - pctOf(prev)) * 100) : null;
          return (
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
              <View style={{ flex: 1, gap: 2 }}>
                <T style={{ fontWeight: '700', fontSize: 18 }}>نمودار پیشرفت</T>
                <T style={{ color: c.muted, fontSize: 13 }}>پاسخ‌های درست در هر آزمون</T>
              </View>
              {last ? (
                <View style={{ alignItems: 'flex-end', gap: 2 }}>
                  <T style={{ fontSize: 22, lineHeight: 30, fontWeight: '700' }}>{`${faNum(scoreOf(last))}/${faNum(last.items.length)}`}</T>
                  {diff != null && diff !== 0 ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <View style={{ width: 0, height: 0, borderLeftWidth: 5, borderRightWidth: 5, borderLeftColor: 'transparent', borderRightColor: 'transparent',
                        ...(diff > 0 ? { borderBottomWidth: 8, borderBottomColor: c.ok } : { borderTopWidth: 8, borderTopColor: c.bad }) }} />
                      <T raw style={{ fontSize: 13, fontWeight: '600', color: diff > 0 ? c.ok : c.bad }}>{`${faNum(Math.abs(diff))}${RTL ? '٪' : '%'}`}</T>
                    </View>
                  ) : null}
                </View>
              ) : null}
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
        <ProgressChart fill minH={low ? 40 : chartMin} noHint={noHint} noNote={low} attempts={attempts} onOpen={openAttempt} sel={picked} onSel={setPicked} onBlank={ARC ? () => { if (Date.now() - swiped.current >= 400) toggle(); } : undefined} />
      </Card>
      </Pressable>
      </View>
      </Animated.View>
      ) : <StartCard compact={compact} />}
      {/* The chart view: the statistics and the latest tests, coming in under the chart; a row opens its test. */}
      {grow ? (
        <Animated.View {...swipe} onLayout={e => { if (view && underH.current == null) { underH.current = e.nativeEvent.layout.height; fitEmpty(); } }}
          style={{ gap, opacity: t.interpolate({ inputRange: [0.25, 1], outputRange: [0, 1], extrapolate: 'clamp' }),
          transform: [{ translateY: t.interpolate({ inputRange: [0, 1], outputRange: [28, 0] }) }] }}>
          <TestStats attempts={exams} />
          <View ref={listBox}><ActivityList attempts={exams} limit={3} title="آخرین آزمون‌ها" allHref="/history" hint={hint} /></View>
        </Animated.View>
      ) : null}
    </Screen>
  );
}
