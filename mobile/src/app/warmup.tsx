// «گرم‌کردن»: right after the first sign-in (no test yet), five pictures of the app's own bank, one statement each
// (Mojtaba 2026-10-30: to gauge the user and show how the app and its tests work, without too many questions), asked in
// a lighter, game-like way than the exam:
// - a short start: a big ۳ ۲ ۱ (no page of words before it since 2026-10-30);
// - each picture comes in in steps (the picture, the question, the statement), quiet and minimal, and the one answered
//   leaves lifting and fading;
// - ten seconds for each statement (Mojtaba 2026-10-30; it was five), on a ring that drains and turns from green to
//   amber to red, its number popping each second (and the phone ticking in the last three); time up counts as a wrong answer;
// - each answer judged at once: right, the card turns green with a popping tick, a ripple and a «+۱» rising from the
//   count; wrong (or too late), it turns red and shakes; the explanation follows;
// - five segments at the top fill green or red as the pictures are answered;
// - at the end a ring with the share of right answers and the average time an answer took.
// The five are saved together as one short tryout (mode 'demo', not a free test; each picture's other statements as
// answered right), so home's chance of passing, test statistics and chart are not empty afterwards; «بعداً» leaves it,
// saving the pictures answered so far. It is offered once per account ((tabs)/index.tsx).
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { Redirect, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

import type { Item, Question } from '@/lib/bank';
import { RTL, t, tr } from '@/lib/i18n';
import { imgSource } from '@/lib/img-source';
import { faNum, grade, shuffle } from '@/lib/logic';
import { sectionIcon } from '@/lib/names';
import { useApp, useQuestionImage } from '@/lib/store';
import { Confetti } from '@/ui/confetti';
import { Icon } from '@/ui/icon';
import { ArcButton, Ring, T, tap } from '@/ui/kit';
import { useColors } from '@/ui/theme';

const COUNT = 5, SECONDS = 10;
const now = () => Date.now();
const native = Platform.OS !== 'web';
const buzz = (ok: boolean) => { if (native) Haptics.notificationAsync(ok ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error).catch(() => {}); };
const tick = () => { if (native) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {}); };
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const spring = (v: Animated.Value, to = 1) => Animated.spring(v, { toValue: to, friction: 7, tension: 70, useNativeDriver: native });

// The ten seconds: a ring draining from full, its colour from green through amber to red, the seconds left in it.
function Countdown({ run, left, colors }: { run: Animated.Value; left: number; colors: [string, string, string, string] }) {
  const S = 46, W = 4, r = (S - W) / 2, C = 2 * Math.PI * r;
  const [pop] = useState(() => new Animated.Value(1));
  useEffect(() => { pop.setValue(1.3); Animated.spring(pop, { toValue: 1, friction: 4, useNativeDriver: native }).start(); }, [left, pop]);
  const color = run.interpolate({ inputRange: [0, 0.5, 0.8, 1], outputRange: [colors[0], colors[0], colors[1], colors[2]] });
  return (
    <View style={{ width: S, height: S, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={S} height={S} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={S / 2} cy={S / 2} r={r} stroke={colors[3]} strokeWidth={W} fill="none" />
        <AnimatedCircle cx={S / 2} cy={S / 2} r={r} stroke={color} strokeWidth={W} fill="none" strokeLinecap="round"
          strokeDasharray={`${C} ${C}`} strokeDashoffset={run.interpolate({ inputRange: [0, 1], outputRange: [0, C] })} />
      </Svg>
      <Animated.Text style={{ fontSize: 17, fontWeight: '800', color: left <= 2 ? colors[2] : colors[0], fontFamily: RTL ? 'Vazirmatn-800' : 'Inter-700', transform: [{ scale: pop }] }}>
        {faNum(left)}
      </Animated.Text>
    </View>
  );
}

export default function Warmup() {
  const c = useColors(), ins = useSafeAreaInsets();
  const { newBank, newqArt, settings, saveAttempt } = useApp();
  const pic = useQuestionImage();
  const lang = settings.lang === 'en' ? 'en' : 'da';
  // Five questions, those with a picture first, and one of each one's statements.
  const [qs] = useState<Question[]>(() => {
    const all = shuffle((newBank?.questions ?? []).filter(q => q.st.length >= 2));
    return [...all.filter(q => newqArt[q.id]), ...all.filter(q => !newqArt[q.id])].slice(0, COUNT);
  });
  const [ks] = useState(() => qs.map(q => Math.floor(Math.random() * q.st.length)));
  // stage: the start's ۳ ۲ ۱, the questions, the end
  const [stage, setStage] = useState<'count' | 'play' | 'done'>('count');
  const [three, setThree] = useState(3);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(0 | 1 | null)[]>(() => qs.map(() => null));
  const [late, setLate] = useState<boolean[]>(() => qs.map(() => false));
  const [right, setRight] = useState(0), [left, setLeft] = useState(SECONDS), [avg, setAvg] = useState(0);
  const started = useRef(0), asked = useRef(0), times = useRef<number[]>([]), scroll = useRef<ScrollView>(null);
  // the pictures answered, saved as one test once the last is answered (or on leaving early)
  const items = useRef<Item[]>([]), saved = useRef(false);
  const save = () => {
    if (saved.current || !items.current.length) return;
    saved.current = true;
    saveAttempt({ secs: Math.max(1, Math.round((now() - started.current) / 1000)), mode: 'demo', items: items.current }).catch(() => {});
  };

  // the steps each picture comes in by, the way it leaves, its seconds, the answer's effects
  const [inPic] = useState(() => new Animated.Value(0)), [inQ] = useState(() => new Animated.Value(0)), [inSt] = useState(() => new Animated.Value(0));
  const [out] = useState(() => new Animated.Value(0)), [run] = useState(() => new Animated.Value(0));
  const [bump] = useState(() => new Animated.Value(1)), [plus] = useState(() => new Animated.Value(0)), [shake] = useState(() => new Animated.Value(0));
  const [pop] = useState(() => new Animated.Value(0)), [ripple] = useState(() => new Animated.Value(0)), [big] = useState(() => new Animated.Value(0));
  const timer = useRef<Animated.CompositeAnimation | null>(null), secs = useRef<ReturnType<typeof setInterval> | null>(null);
  const stopClock = () => { timer.current?.stop(); timer.current = null; if (secs.current) clearInterval(secs.current); secs.current = null; };
  useEffect(() => stopClock, []);
  // (the latest answer for the seconds' end, which is set up before it)
  const late$ = useRef<(a: 0 | 1 | null) => void>(() => {});

  // ۳ ۲ ۱: each number grows in and fades, then the first picture
  useEffect(() => {
    if (stage !== 'count') return;
    big.setValue(0);
    const a = Animated.sequence([
      Animated.timing(big, { toValue: 1, duration: 260, easing: Easing.out(Easing.back(2)), useNativeDriver: native }),
      Animated.timing(big, { toValue: 2, duration: 420, easing: Easing.in(Easing.quad), useNativeDriver: native }),
    ]);
    tick();
    a.start(({ finished }) => {
      if (!finished) return;
      if (three > 1) setThree(three - 1);
      else { started.current = now(); setStage('play'); }
    });
    return () => a.stop();
  }, [stage, three, big]);

  // a picture in: its steps one after another, then its seconds start
  useEffect(() => {
    if (stage !== 'play') return;
    [inPic, inQ, inSt, out, pop, ripple, run].forEach(v => v.setValue(0));
    const a = Animated.stagger(110, [spring(inPic), spring(inQ), spring(inSt)]);
    a.start(({ finished }) => {
      if (!finished) return;
      asked.current = now();
      timer.current = Animated.timing(run, { toValue: 1, duration: SECONDS * 1000, easing: Easing.linear, useNativeDriver: false });
      timer.current.start(({ finished: up }) => { if (up) late$.current(null); });
      secs.current = setInterval(() => setLeft(n => { const m = Math.max(0, n - 1); if (m && m <= 3) tick(); return m; }), 1000);
    });
    return () => { a.stop(); stopClock(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, i]);

  const leave = () => { stopClock(); save(); if (router.canGoBack()) router.back(); else router.replace('/'); };
  const q = qs[i];
  // (`answer` is there whenever there is a question)
  useEffect(() => { if (q) late$.current = answer; });
  if (!q) return <Redirect href="/" />;
  const k = ks[i], given = answers[i], st = q.st[k];

  // An answer (null: the time ran out, a wrong answer).
  function answer(a: 0 | 1 | null) {
    if (answers[i] != null) return;
    stopClock();
    times.current.push(Math.min(SECONDS, (now() - asked.current) / 1000));
    const got = a ?? ((1 - st.ok) as 0 | 1), ok = a != null && got === st.ok;
    buzz(ok);
    setAnswers(prev => prev.map((x, n) => (n === i ? got : x)));
    if (a == null) setLate(prev => prev.map((x, n) => (n === i ? true : x)));
    if (ok) {
      setRight(n => n + 1);
      bump.setValue(1.35); Animated.spring(bump, { toValue: 1, friction: 4, useNativeDriver: native }).start();
      plus.setValue(0); Animated.timing(plus, { toValue: 1, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: native }).start();
      ripple.setValue(0); Animated.timing(ripple, { toValue: 1, duration: 650, easing: Easing.out(Easing.cubic), useNativeDriver: native }).start();
      Animated.spring(pop, { toValue: 1, friction: 5, tension: 120, useNativeDriver: native }).start();
    } else {
      pop.setValue(1);
      Animated.sequence([10, -10, 7, -6, 3, 0].map(x => Animated.timing(shake, { toValue: x, duration: 55, useNativeDriver: native }))).start();
    }
    // (the explanation and the next button into view, on a short screen)
    setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 120);
    // this picture's item (its other statements as answered right); the test saved with the last one
    const g = grade(q, q.st.map((s, m) => (m === k ? got : s.ok) === 1));
    items.current = [...items.current, { id: g.id, ok: g.ok, w: g.w, a: g.a }];
    if (i + 1 >= qs.length) save();
  }
  // the answered picture lifts and fades, then the next one comes in (or the end)
  const next = () => {
    tap();
    Animated.timing(out, { toValue: 1, duration: 220, easing: Easing.in(Easing.quad), useNativeDriver: native }).start(() => {
      scroll.current?.scrollTo({ y: 0, animated: false });
      setLeft(SECONDS);
      if (i + 1 < qs.length) { setI(i + 1); return; }
      setAvg(times.current.length ? times.current.reduce((s, x) => s + x, 0) / times.current.length : 0);
      setStage('done');
    });
  };

  const total = qs.length;
  const src = pic(q);
  const main = (x: { da: string; en: string }) => (lang === 'en' ? x.en : x.da);
  const why = (x: { eda: string; een: string; efa: string }) => (RTL ? x.efa : lang === 'en' ? x.een : x.eda);
  // a step coming in: from transparent, a little lower and smaller
  const step = (v: Animated.Value, dy = 14) => ({ opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }),
    transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [dy, 0] }) }, { scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.97, 1] }) }] });
  const away = { opacity: out.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }), transform: [{ translateY: out.interpolate({ inputRange: [0, 1], outputRange: [0, -18] }) }] };
  const isRight = given != null && given === st.ok && !late[i];
  const stIn = step(inSt, 18);

  if (stage === 'count') {
    return (
      <View style={{ flex: 1, backgroundColor: c.bg, paddingTop: ins.top + 12, paddingBottom: ins.bottom + 20, paddingHorizontal: 24 }}>
        <Pressable onPress={() => { tap(); leave(); }} hitSlop={8} accessibilityRole="button" accessibilityLabel={tr('بعداً')} style={{ alignSelf: 'flex-start' }}>
          <T style={{ color: c.muted, fontSize: 14 }}>بعداً</T>
        </Pressable>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <Animated.Text style={{ fontSize: 120, lineHeight: 150, fontFamily: RTL ? 'Vazirmatn-800' : 'Inter-700', color: c.text,
            opacity: big.interpolate({ inputRange: [0, 1, 2], outputRange: [0, 1, 0] }),
            transform: [{ scale: big.interpolate({ inputRange: [0, 1, 2], outputRange: [0.4, 1, 1.5] }) }] }}>{faNum(three)}</Animated.Text>
        </View>
      </View>
    );
  }

  if (stage === 'done') {
    const share = total ? right / total : 0;
    return (
      <View style={{ flex: 1, backgroundColor: c.bg, paddingTop: ins.top + 24, paddingBottom: ins.bottom + 20, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', gap: 18 }}>
        {share >= 0.7 ? <Confetti /> : null}
        <Ring value={share} size={150} stroke={12} color={share >= 0.7 ? c.ok : share >= 0.4 ? c.warn : c.bad} format={v => `${faNum(Math.round(v * 100))}٪`} />
        <T style={{ fontSize: 24, lineHeight: 34, fontWeight: '800', textAlign: 'center' }}>{share >= 0.7 ? 'عالی بود!' : share >= 0.4 ? 'شروع خوبی بود!' : 'گرم شدید!'}</T>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, height: 32, borderRadius: 16, backgroundColor: c.surface2 }}>
            <Icon name="check" size={15} color={c.ok} />
            <T style={{ fontSize: 13.5, fontWeight: '700' }}>{t('{0} از {1} درست', right, total)}</T>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, height: 32, borderRadius: 16, backgroundColor: c.surface2 }}>
            <Icon name="clock" size={15} color={c.text} />
            <T style={{ fontSize: 13.5, fontWeight: '700' }}>{t('میانگین {0} ثانیه', RTL ? avg.toFixed(1).replace('.', '٫') : avg.toFixed(1))}</T>
          </View>
        </View>
        <T style={{ color: c.muted, fontSize: 14, lineHeight: 23, textAlign: 'center', maxWidth: 340 }}>نتیجه‌ی شما در احتمال قبولی، آمار آزمون‌ها و نمودار صفحه‌ی اصلی آمد.</T>
        <ArcButton big label="رفتن به صفحه‌ی اصلی" icon="house" onPress={() => { tap(); leave(); }} style={{ alignSelf: 'stretch', marginTop: 8 }} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      {/* top: leave, five segments (green or red once answered), the right answers so far with a rising «+۱» */}
      <View style={{ paddingTop: ins.top + 10, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Pressable onPress={() => { tap(); leave(); }} hitSlop={8} accessibilityRole="button" accessibilityLabel={tr('بعداً')}>
          <T style={{ color: c.muted, fontSize: 14 }}>بعداً</T>
        </Pressable>
        <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: total, now: i + 1 }} style={{ flex: 1, flexDirection: 'row', gap: 5 }}>
          {qs.map((x, n) => {
            const a = answers[n], ok = a != null && a === x.st[ks[n]].ok && !late[n];
            return <View key={n} style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: a == null ? (n === i ? c.faint : c.surface2) : ok ? c.ok : c.bad }} />;
          })}
        </View>
        <View>
          <Animated.View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, height: 30, borderRadius: 15, backgroundColor: c.okSoft, transform: [{ scale: bump }] }}>
            <Icon name="check" size={15} color={c.ok} />
            <T style={{ color: c.ok, fontWeight: '800', fontSize: 14 }}>{faNum(right)}</T>
          </Animated.View>
          <Animated.Text pointerEvents="none" style={{ position: 'absolute', alignSelf: 'center', top: 4, color: c.ok, fontWeight: '800', fontSize: 15,
            opacity: plus.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0, 1, 0] }), transform: [{ translateY: plus.interpolate({ inputRange: [0, 1], outputRange: [0, -26] }) }] }}>{`+${faNum(1)}`}</Animated.Text>
        </View>
      </View>

      <ScrollView ref={scroll} contentContainerStyle={{ padding: 16, paddingBottom: ins.bottom + 24, gap: 14 }}>
        <Animated.View style={[{ gap: 14 }, away]}>
          <Animated.View style={step(inPic, 10)}>
            {src ? <Image source={imgSource(src)} style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: 20, backgroundColor: c.surface2 }} contentFit="cover" transition={200} />
              : <View style={{ height: 110, borderRadius: 20, backgroundColor: c.surface2, alignItems: 'center', justifyContent: 'center' }}><Icon name={sectionIcon(q.c)} size={44} color={c.muted} /></View>}
          </Animated.View>
          <Animated.View style={[{ gap: 4 }, step(inQ)]}>
            <T raw={!RTL} style={{ fontSize: 18, lineHeight: 29, fontWeight: '700' }}>{RTL ? q.sfa : main({ da: q.sda, en: q.sen })}</T>
            {RTL ? <T raw keepDa style={{ color: c.muted, fontSize: 13, lineHeight: 20, writingDirection: 'ltr', textAlign: 'left' }}>{main({ da: q.sda, en: q.sen })}</T> : null}
          </Animated.View>

          {/* the picture's statement, its seconds, its two answers */}
          <Animated.View style={{ opacity: stIn.opacity, transform: [...stIn.transform, { translateX: shake }] }}>
            <View style={{ borderRadius: 20, borderWidth: 1.5, padding: 16, gap: 14,
              borderColor: given == null ? c.line : isRight ? c.ok : c.bad, backgroundColor: given == null ? c.surface : isRight ? c.okSoft : c.badSoft }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <T style={{ flex: 1, color: c.muted, fontSize: 12.5 }}>درست است یا نادرست؟</T>
                {given == null ? <Countdown run={run} left={left} colors={[c.ok, c.warn, c.bad, c.surface2]} /> : (
                  <View style={{ width: 46, height: 46, alignItems: 'center', justifyContent: 'center' }}>
                    {isRight ? <Animated.View pointerEvents="none" style={{ position: 'absolute', width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: c.ok,
                      opacity: ripple.interpolate({ inputRange: [0, 1], outputRange: [0.7, 0] }), transform: [{ scale: ripple.interpolate({ inputRange: [0, 1], outputRange: [0.8, 2.2] }) }] }} /> : null}
                    <Animated.View style={{ transform: [{ scale: pop.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] }) }] }}>
                      <Icon name={isRight ? 'checkCircle' : late[i] ? 'clock' : 'xCircle'} size={30} color={isRight ? c.ok : c.bad} />
                    </Animated.View>
                  </View>
                )}
              </View>
              <T raw={!RTL} style={{ fontSize: 16.5, lineHeight: 27, fontWeight: '600' }}>{RTL ? st.fa : main(st)}</T>
              {RTL ? <T raw keepDa style={{ color: c.muted, fontSize: 12.5, lineHeight: 19, writingDirection: 'ltr', textAlign: 'left' }}>{main(st)}</T> : null}
              {given == null ? (
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  {([[1, 'درست است', 'check'], [0, 'نادرست است', 'xmark']] as const).map(([a, label, icon]) => (
                    <Pressable key={a} onPress={() => answer(a)} accessibilityRole="button" accessibilityLabel={tr(label)}
                      style={({ pressed }) => ({ flex: 1, height: 54, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
                        backgroundColor: pressed ? c.line : c.surface2, transform: [{ scale: pressed ? 0.95 : 1 }] })}>
                      <Icon name={icon} size={20} color={c.text} />
                      <T style={{ fontWeight: '700', fontSize: 15 }}>{label}</T>
                    </Pressable>
                  ))}
                </View>
              ) : (
                <Animated.View style={{ gap: 4, opacity: pop }}>
                  <T style={{ fontWeight: '800', fontSize: 15, color: isRight ? c.ok : c.bad }}>
                    {isRight ? 'درست جواب دادید!' : late[i] ? (st.ok ? 'وقت تمام شد؛ این گزینه درست بود.' : 'وقت تمام شد؛ این گزینه نادرست بود.') : st.ok ? 'این گزینه درست بود.' : 'این گزینه نادرست بود.'}
                  </T>
                  <T raw={!RTL} style={{ fontSize: 14, lineHeight: 23 }}>{why(st)}</T>
                </Animated.View>
              )}
            </View>
          </Animated.View>

          {given != null ? <ArcButton big label={i + 1 < qs.length ? 'سؤال بعد' : 'دیدن نتیجه'} icon="arrowLeft" onPress={next} /> : null}
        </Animated.View>
      </ScrollView>
    </View>
  );
}
