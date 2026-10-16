// Taking an exam or a lesson: one picture at a time, statements to tick (on Liquid Glass), a slim strip on top and a
// floating Liquid Glass bar at the bottom with previous / the timer / next.
import { router } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, BackHandler, Easing, Platform, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { transText } from '@/lib/i18n';
import { PROVE_PICS } from '@/lib/config';
import { imgSource } from '@/lib/img-source';
import { SECONDS_PER_Q, faNum, grade } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp, useQuestionImage } from '@/lib/store';
import { Confirm } from '@/ui/confirm';
import { Marquee } from '@/ui/marquee';
import { SlideToConfirm } from '@/ui/slide-confirm';
import { SpeakButton } from '@/ui/speak';
import { ZoomableImage } from '@/ui/zoom';
import { GlassTop } from '@/ui/liquid';
import { FootBtn, GlassBar, navIcons } from '@/ui/glass-bar';
import { ListButton } from '@/ui/question-list';
import { Sheet, SheetScroll } from '@/ui/sheet';
import { OptionBox, OptionGroup } from '@/ui/option-box';
import { learnRtl, Pager } from '@/ui/swipe';
import { useWebBackGuard } from '@/ui/web-back';
import { Icon } from '@/ui/icon';
import { Backdrop, Enter, L, T, TransT, ThemeButton, TranslateButton, physical, tap, usePageMotion } from '@/ui/kit';
import { uiText } from '@/ui/review';
import { radius, useColors, useIsDark } from '@/ui/theme';

// The summary's numbers: in the Latin font and digits on the main site (as the bar's count and the clock), in Persian
// digits in the /app copy.
const Num = PROVE_PICS ? T : L;
const num = (n: number) => (PROVE_PICS ? faNum(n) : String(n));

// The timer's clock icon; with `pulse` it fades out and in again (the last two minutes).
function ClockIcon({ color, pulse }: { color: string; pulse: boolean }) {
  const [o] = useState(() => new Animated.Value(1));
  useEffect(() => {
    if (!pulse) { o.setValue(1); return; }
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(o, { toValue: 0.2, duration: 600, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      Animated.timing(o, { toValue: 1, duration: 600, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
    ]));
    loop.start();
    return () => loop.stop();
  }, [pulse, o]);
  return <Animated.View style={{ opacity: o }}><Icon name="clock" size={17} color={color} weight="semibold" /></Animated.View>;
}

export default function Run() {
  const c = useColors(), ins = useSafeAreaInsets(), dark = useIsDark();
  const { Q, settings, saveAttempt } = useApp();
  const motion = usePageMotion('sheet');
  const pic = useQuestionImage();
  const [plan] = useState(() => session.plan);
  const qs = useMemo(() => (plan ? plan.ids.map(id => Q.get(id)!).filter(Boolean) : []), [plan, Q]);
  const [i, setI] = useState(0);
  // Each question starts at its top, however it was reached (the bar, a swipe, the hand-in sheet).
  const scroll = useRef<ScrollView>(null);
  useEffect(() => { scroll.current?.scrollTo({ y: 0, animated: false }); }, [i]);
  const [ticks, setTicks] = useState<boolean[][]>(() => qs.map(q => q.st.map(() => false)));
  const [left, setLeft] = useState(qs.length * SECONDS_PER_Q);
  const [headH, setHeadH] = useState(0); // the glass top bar's height, the page's top padding
  // The Persian translation starts hidden in an exam; the button under the question shows it.
  const [showFa, setShowFa] = useState(false);
  // Questions marked for a second look before handing in, and the open question (exit / hand in).
  const [flags, setFlags] = useState<number[]>([]);
  const [dialog, setDialog] = useState<'quit' | 'handin' | null>(null);
  const [started] = useState(() => Date.now());
  const done = useRef(false);
  const lang = settings.lang === 'en' ? 'en' : 'da';

  // On the web the browser's way back (Safari's edge swipe, the back button) asks too.
  const release = useWebBackGuard(useCallback(() => setDialog('quit'), []));

  const finish = async () => {
    if (done.current || !plan) return; done.current = true;
    // Marked questions are saved as such (m), so the result shows them.
    const items = qs.map((q, k) => { const g = grade(q, ticks[k]); return { id: g.id, ok: g.ok, w: g.w, a: g.a, ...(flags.includes(k) ? { m: 1 as const } : {}) }; });
    const secs = Math.round((Date.now() - started) / 1000);
    const attempt = { secs, mode: plan.mode, ...(plan.lesson ? { lesson: plan.lesson } : {}), items };
    session.result = { at: Date.now(), ...attempt }; session.fresh = true;
    saveAttempt(attempt).catch(() => {});
    release(() => router.replace('/result'));
  };
  useEffect(() => {
    if (!settings.timer) return;
    const t = setInterval(() => setLeft(s => { if (s <= 1) { clearInterval(t); finish(); return 0; } return s - 1; }), 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // The phone's back button asks too, instead of leaving the exam at once.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => { setDialog(d => (d ? null : 'quit')); return true; });
    return () => sub.remove();
  }, []);
  if (!plan || !qs.length) { router.back(); return null; }

  const q = qs[i], last = i === qs.length - 1;
  const answered = ticks.filter(t => t.some(Boolean)).length;
  const toggle = (k: number) => { tap(); setTicks(t => t.map((row, r) => (r === i ? row.map((v, j) => (j === k ? !v : v)) : row))); };
  const empty = qs.length - answered;
  // Hand in opens a summary of every question (answered / not / marked) first; the exam ends from there.
  const handIn = () => { tap(); setDialog('handin'); };
  const quit = () => { tap(); setDialog('quit'); };
  const flagged = flags.includes(i);
  const flag = () => { tap(); setFlags(f => (f.includes(i) ? f.filter(x => x !== i) : [...f, i].sort((a, b) => a - b))); };
  const goTo = (k: number) => { tap(); setDialog(null); setI(k); };
  const ui = uiText(lang === 'en' ? 'en' : 'da');
  // A lesson, a part of the rules or the mistakes (not the exam itself) turns right to left, as Persian reads.
  const rtl = learnRtl && plan.mode !== 'random', arrow = navIcons(rtl);
  const mm = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
  // The clock's colour: the theme's while more than two thirds of the time is left (on a whole minute: 16:00 of 25),
  // then warning (amber), and danger (red) under the last two minutes, when its icon also fades in and out.
  const total = qs.length * SECONDS_PER_Q, atMin = (x: number) => Math.floor(x / 60) * 60;
  const urgent = left < 120; // under two minutes: red, the clock icon pulsing
  const clock = urgent ? c.bad : left <= atMin((total * 2) / 3) ? c.warn : dark ? c.link : c.accent;

  return (
    <Backdrop anim={motion.style}>
      {/* Top: exit (icon) with the exam's name beside it, the timer (Persian digits) in the middle of the screen, and
          the theme switch. SafeAreaView measures the top inset itself (in a full-screen modal the hook's value can be
          stale), and the web gets extra room at the top. */}
      {/* Fixed over the page on Liquid Glass: the question scrolls under it, blurred. */}
      <GlassTop onHeight={setHeadH}>
      <SafeAreaView edges={['top']} style={{ paddingTop: Platform.OS === 'web' ? 14 : 8, paddingBottom: 10, paddingHorizontal: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%', maxWidth: 760, alignSelf: 'center' }}>
          <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
            {settings.timer ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, direction: 'ltr' } as any}>
                <ClockIcon color={clock} pulse={urgent} />
                {/* The main site's clock in the Latin font and digits, the /app copy's in Persian digits. */}
                {PROVE_PICS
                  ? <T style={{ fontSize: 20, lineHeight: 28, fontWeight: '500', color: clock, writingDirection: 'ltr' }}>{faNum(mm)}</T>
                  : <L style={{ fontSize: 20, lineHeight: 28, fontWeight: '500', color: clock, fontVariant: ['tabular-nums'] }}>{mm}</L>}
              </View>
            ) : null}
          </View>
          <Pressable onPress={quit} hitSlop={8} accessibilityRole="button" accessibilityLabel="خروج از آزمون"
            style={({ pressed }) => ({ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.surface2 : c.surface, borderWidth: 1, borderColor: c.line })}>
            {/* ✕, as on every page with a bar of previous / next (the lessons, the practice, the review). */}
            <Icon name="xmark" size={20} color={c.text} />
          </Pressable>
          {/* Kept clear of the counter in the middle; a long name (e.g. a topic's) glides to show all of it. */}
          <View style={{ width: settings.timer ? '24%' : '62%', height: 24 }}>
            <Marquee text={plan.title} height={24} style={{ fontWeight: '700', fontSize: 15, lineHeight: 24 }} />
          </View>
          <View style={{ flex: 1 }} />
          <ThemeButton />
        </View>
      </SafeAreaView>
      </GlassTop>
      {/* A sideways swipe turns to the next or previous question; it never leaves the exam (only the exit button does). */}
      <Pager i={i} n={qs.length} go={setI} rtl={rtl}>
      <ScrollView ref={scroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingTop: headH + 16, paddingBottom: ins.bottom + 100, gap: 12, maxWidth: 760, width: '100%', alignSelf: 'center' }}>
        {/* The picture in its own box with rounded corners like the buttons', the page's own background around the
            question and its statements, which are outlined boxes with a round check. */}
        {/* The picture comes in again with each question. */}
        <Enter key={`pic-${i}`} style={{ borderRadius: radius.btn, overflow: 'hidden' }}>
          <ZoomableImage source={imgSource(pic(q))} style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: radius.btn, backgroundColor: c.surface2 }} transition={200} />
          {/* Mark the question to look at it again before handing in. */}
          <Pressable onPress={flag} hitSlop={6} accessibilityRole="button" accessibilityLabel="علامت برای بازبینی" accessibilityState={{ selected: flagged }}
            style={{ position: 'absolute', top: 8, ...physical({ left: 8 }), width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center',
              backgroundColor: flagged ? c.strong : dark ? 'rgba(20,20,20,0.6)' : 'rgba(255,255,255,0.85)' }}>
            <Icon name="bookmark" size={18} filled={flagged} color={flagged ? c.strongFg : dark ? '#fff' : c.text} />
          </Pressable>
        </Enter>
        {/* Translation on / off: a round icon under the picture, on its left (filled while the translation shows). */}
        <View style={{ flexDirection: 'row', direction: 'ltr', justifyContent: 'flex-start', gap: 10, marginBottom: -4 } as any}>
          <TranslateButton on={showFa} onPress={() => setShowFa(!showFa)} />
          {/* Read the question and its statements aloud, beside the translation switch. */}
          <SpeakButton key={q.id} qid={q.id} lang={lang} />
        </View>
        <View style={{ gap: 4 }}>
          <L style={{ fontSize: 18, fontWeight: '600', lineHeight: 25 }}>{lang === 'en' && q.sen ? q.sen : q.sda}</L>
          {showFa && transText(lang, { fa: q.sfa, en: q.sen, da: q.sda }) ? <TransT style={{ color: c.muted }}>{transText(lang, { fa: q.sfa, en: q.sen, da: q.sda })}</TransT> : null}
        </View>
        <OptionGroup key={`g-${i}`}>
        {q.st.map((s, k) => {
          const on = ticks[i][k];
          return (
            // Keyed by question too, so each new question's statements come in one after another.
            <Enter key={`${i}-${k}`}>
              <OptionBox on={on} n={k} onPress={() => toggle(k)}>
                <L style={{ fontSize: 15.5, lineHeight: 22 }}>{lang === 'en' && s.en ? s.en : s.da}</L>
                {showFa && transText(lang, s) ? <TransT style={{ color: c.muted, fontSize: 14 }}>{transText(lang, s)}</TransT> : null}
              </OptionBox>
            </Enter>
          );
        })}
        </OptionGroup>
      </ScrollView>
      </Pager>
      {/* The floating glass bar: previous on the left, the position between, next / hand in on the right. */}
      <GlassBar rtl={rtl}
        start={<FootBtn label={ui.prev} icon={arrow.prev} disabled={i === 0} onPress={() => setI(i - 1)} />}
        // The list opens the exam's summary: every question (a tap goes to it) and the slide to hand in, so the exam can be
        // handed in from any question, not only the last.
        middle={<ListButton n={i + 1} of={qs.length} exam={plan.mode === 'random'} onPress={handIn} />}
        end={last ? <FootBtn label={ui.handin} icon="check" submit onPress={handIn} /> : <FootBtn label={ui.next} icon={arrow.next} onPress={() => setI(i + 1)} />} />
      <Confirm open={dialog === 'quit'} icon="exit" title="خروج از آزمون؟" text="پاسخ‌های این آزمون ذخیره نمی‌شوند."
        cancel="ادامه‌ی آزمون" ok="خروج" cancelIcon="play" okIcon="exit" danger onCancel={() => setDialog(null)} onOk={() => { setDialog(null); motion.leave(() => release(() => router.back())); }} />
      <Sheet open={dialog === 'handin'} onClose={() => setDialog(null)} maxHeight="88%">
        {/* The title, with a ✕ at the top right that returns to the exam. */}
        <View style={{ minHeight: 40, justifyContent: 'center' }}>
          {/* (main site: a clipboard icon in the accent beside the title, Mojtaba 2026-10-15) */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {!PROVE_PICS ? (
              <View style={{ width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accentSoft }}>
                <Icon name="clipboard" size={18} color={c.accent} />
              </View>
            ) : null}
            <T style={{ fontSize: 19, lineHeight: 28, fontWeight: '700', textAlign: 'center' }}>خلاصه‌ی آزمون</T>
          </View>
          <Pressable onPress={() => { tap(); setDialog(null); }} hitSlop={8} accessibilityRole="button" accessibilityLabel="بازگشت به آزمون"
            style={({ pressed }) => ({ position: 'absolute', top: 0, ...physical({ right: 0 }), width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center',
              backgroundColor: c.nav, opacity: pressed ? 0.8 : 1 })}>
            <Icon name="xmark" size={19} color={c.navFg} weight="semibold" />
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {([[answered, 'پاسخ داده‌شده'], [empty, 'بی‌پاسخ'], [flags.length, 'علامت‌خورده']] as const).map(([n, l]) => (
            <View key={l} style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 14, backgroundColor: c.surface2 }}>
              <Num style={{ fontSize: 22, lineHeight: 30, fontWeight: '600', color: c.text, textAlign: 'center' }}>{num(n)}</Num>
              <T style={{ fontSize: 12, color: c.muted, textAlign: 'center' }}>{l}</T>
            </View>
          ))}
        </View>
        {/* Every question by number: filled when answered, outlined when not, a bookmark when marked; a tap opens it. */}
        <SheetScroll contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', direction: 'ltr' } as any}>
          {qs.map((_, k) => {
            const ans = ticks[k].some(Boolean), marked = flags.includes(k); // as in the question list
            return (
              <Pressable key={k} onPress={() => goTo(k)} accessibilityLabel={`سؤال ${k + 1}`}
                style={({ pressed }) => ({ width: 50, height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.75 : 1,
                  backgroundColor: ans ? c.strong : c.nav, borderWidth: 1.5, borderColor: marked ? c.warn : ans ? c.strong : c.nav })}>
                <Num style={{ fontSize: 16, lineHeight: 24, fontWeight: '600', color: ans ? c.strongFg : c.navFg, textAlign: 'center' }}>{num(k + 1)}</Num>
                {marked ? (
                  <View style={{ position: 'absolute', top: -5, right: -5, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.warn }}>
                    <Icon name="bookmark" size={11} filled color="#fff" />
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </SheetScroll>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          {([['پاسخ داده‌شده', c.strong, c.strong], ['بی‌پاسخ', c.nav, c.nav], ['علامت‌خورده', c.surface, c.warn]] as const).map(([l, bg, bd]) => (
            <View key={l} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 12, height: 12, borderRadius: 4, backgroundColor: bg, borderWidth: 1.5, borderColor: bd }} />
              <T style={{ fontSize: 12, color: c.muted }}>{l}</T>
            </View>
          ))}
        </View>
        {/* Hand in by sliding the handle to the left end, so an exam is never handed in by a stray tap. */}
        {dialog === 'handin' ? <SlideToConfirm toRight={!PROVE_PICS} label="برای تحویل و پایان، بکشید" doneLabel="تحویل شد" onConfirm={() => { setDialog(null); finish(); }} /> : null}
      </Sheet>
    </Backdrop>
  );
}
