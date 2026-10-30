// «گرم‌کردن»: right after the first sign-in (no test yet), three questions of the app's own bank, asked in a lighter way
// than the exam (Mojtaba 2026-10-30): one statement at a time, answered with two large buttons («درست است» / «نادرست
// است»), each answer judged at once (the card turns green with a pop or red with a shake, and the explanation slides
// in), a running count of right answers, confetti for a question answered all right, and at the end a ring with the
// share of right answers. Each question is saved as its own short tryout (mode 'demo', not a free test), so home's
// chance of passing, test statistics and chart are not empty afterwards. «بعداً» leaves it; it is offered once per
// account ((tabs)/index.tsx).
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { Redirect, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Question } from '@/lib/bank';
import { RTL, t, tr } from '@/lib/i18n';
import { imgSource } from '@/lib/img-source';
import { faNum, grade, shuffle } from '@/lib/logic';
import { sectionIcon } from '@/lib/names';
import { useApp, useQuestionImage } from '@/lib/store';
import { Confetti } from '@/ui/confetti';
import { Icon } from '@/ui/icon';
import { ArcButton, Ring, T, tap } from '@/ui/kit';
import { useColors } from '@/ui/theme';

const COUNT = 3;
const now = () => Date.now();
const native = Platform.OS !== 'web';
const buzz = (ok: boolean) => { if (native) Haptics.notificationAsync(ok ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error).catch(() => {}); };

export default function Warmup() {
  const c = useColors(), ins = useSafeAreaInsets();
  const { newBank, newqArt, settings, saveAttempt } = useApp();
  const pic = useQuestionImage();
  const lang = settings.lang === 'en' ? 'en' : 'da';
  // Three questions of two to four statements, those with a picture first.
  const [qs] = useState<Question[]>(() => {
    const all = shuffle((newBank?.questions ?? []).filter(q => q.st.length >= 2 && q.st.length <= 4));
    return [...all.filter(q => newqArt[q.id]), ...all.filter(q => !newqArt[q.id])].slice(0, COUNT);
  });
  const [i, setI] = useState(0), [k, setK] = useState(0);
  const [answers, setAnswers] = useState<(0 | 1 | null)[][]>(() => qs.map(q => q.st.map(() => null)));
  const [right, setRight] = useState(0), [party, setParty] = useState(0), [done, setDone] = useState(false);
  const started = useRef(0), scroll = useRef<ScrollView>(null);
  useEffect(() => { started.current = now(); }, []);
  const q = qs[i];

  // the card of each question comes in from the side; each statement from below
  const [enter] = useState(() => new Animated.Value(0)), [rise] = useState(() => new Animated.Value(0));
  const [bump] = useState(() => new Animated.Value(1)), [shake] = useState(() => new Animated.Value(0)), [pop] = useState(() => new Animated.Value(0));
  const [bar] = useState(() => new Animated.Value(0));
  useEffect(() => { enter.setValue(0); Animated.timing(enter, { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: native }).start(); }, [i, enter]);
  useEffect(() => { rise.setValue(0); pop.setValue(0); Animated.timing(rise, { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: native }).start(); }, [i, k, rise, pop]);
  useEffect(() => { Animated.timing(bar, { toValue: done ? COUNT : i + (q && answers[i].every(a => a != null) ? 1 : 0), duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start(); }, [i, done, answers, q, bar]);

  const leave = () => { if (router.canGoBack()) router.back(); else router.replace('/'); };
  if (!q) return <Redirect href="/" />;

  const given = answers[i][k], st = q.st[k], all = answers[i].every(a => a != null);
  const answer = (a: 0 | 1) => {
    if (given != null) return;
    const ok = a === st.ok;
    buzz(ok);
    setAnswers(prev => prev.map((row, n) => (n === i ? row.map((x, m) => (m === k ? a : x)) : row)));
    if (ok) {
      setRight(n => n + 1);
      bump.setValue(1.35); Animated.spring(bump, { toValue: 1, friction: 4, useNativeDriver: native }).start();
      Animated.spring(pop, { toValue: 1, friction: 5, tension: 120, useNativeDriver: native }).start();
    } else {
      pop.setValue(1);
      Animated.sequence([10, -10, 7, -6, 3, 0].map(x => Animated.timing(shake, { toValue: x, duration: 55, useNativeDriver: native }))).start();
    }
    // (the explanation and the next button into view, on a short screen)
    setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 120);
    // the question done: saved at once as a short tryout, with confetti when every statement was right
    if (answers[i].filter(x => x == null).length === 1) {
      const ticks = q.st.map((_, m) => (m === k ? a : answers[i][m]) === 1);
      const g = grade(q, ticks);
      saveAttempt({ secs: Math.max(1, Math.round((now() - started.current) / 1000)), mode: 'demo', items: [{ id: g.id, ok: g.ok, w: g.w, a: g.a }] }).catch(() => {});
      started.current = now();
      if (g.ok) setParty(n => n + 1);
    }
  };
  const next = () => {
    tap();
    if (!all) { setK(k + 1); return; }
    scroll.current?.scrollTo({ y: 0, animated: false });
    if (i + 1 < qs.length) { setI(i + 1); setK(0); return; }
    setDone(true);
  };

  const total = qs.reduce((n, x) => n + x.st.length, 0);
  const qRight = answers[i].filter((a, m) => a === q.st[m].ok).length;
  const src = pic(q);
  const main = (x: { da: string; en: string }) => (lang === 'en' ? x.en : x.da);
  const why = (x: { eda: string; een: string; efa: string }) => (RTL ? x.efa : lang === 'en' ? x.een : x.eda);

  if (done) {
    const share = total ? right / total : 0;
    return (
      <View style={{ flex: 1, backgroundColor: c.bg, paddingTop: ins.top + 24, paddingBottom: ins.bottom + 20, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', gap: 18 }}>
        {share >= 0.7 ? <Confetti /> : null}
        <Ring value={share} size={150} stroke={12} color={share >= 0.7 ? c.ok : share >= 0.4 ? c.warn : c.bad} format={v => `${faNum(Math.round(v * 100))}٪`} />
        <T style={{ fontSize: 24, lineHeight: 34, fontWeight: '800', textAlign: 'center' }}>{share >= 0.7 ? 'عالی بود!' : share >= 0.4 ? 'شروع خوبی بود!' : 'گرم شدید!'}</T>
        <T style={{ color: c.muted, fontSize: 14.5, lineHeight: 24, textAlign: 'center', maxWidth: 340 }}>
          {t('{0} از {1} پاسخ درست. نتیجه‌ی شما در احتمال قبولی، آمار آزمون‌ها و نمودار صفحه‌ی اصلی آمد.', right, total)}
        </T>
        <ArcButton big label="رفتن به صفحه‌ی اصلی" icon="house" onPress={() => { tap(); leave(); }} style={{ alignSelf: 'stretch', marginTop: 8 }} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      {party ? <Confetti key={party} /> : null}
      {/* top: leave, the three questions' progress, the right answers so far */}
      <View style={{ paddingTop: ins.top + 10, paddingHorizontal: 16, gap: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={() => { tap(); leave(); }} hitSlop={8} accessibilityRole="button" accessibilityLabel={tr('بعداً')}>
            <T style={{ color: c.muted, fontSize: 14 }}>بعداً</T>
          </Pressable>
          <T style={{ flex: 1, textAlign: 'center', fontWeight: '700', fontSize: 15 }}>{t('گرم‌کردن · سؤال {0} از {1}', i + 1, qs.length)}</T>
          <Animated.View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, height: 30, borderRadius: 15, backgroundColor: c.okSoft, transform: [{ scale: bump }] }}>
            <Icon name="check" size={15} color={c.ok} />
            <T style={{ color: c.ok, fontWeight: '800', fontSize: 14 }}>{faNum(right)}</T>
          </Animated.View>
        </View>
        <View style={{ height: 6, borderRadius: 3, backgroundColor: c.surface2, overflow: 'hidden', flexDirection: 'row' }}>
          <Animated.View style={{ width: bar.interpolate({ inputRange: [0, COUNT], outputRange: ['0%', '100%'] }), backgroundColor: c.ok, borderRadius: 3 }} />
        </View>
      </View>

      <ScrollView ref={scroll} contentContainerStyle={{ padding: 16, paddingBottom: ins.bottom + 24, gap: 14 }}>
        <Animated.View style={{ gap: 12, opacity: enter, transform: [{ translateX: enter.interpolate({ inputRange: [0, 1], outputRange: [RTL ? -40 : 40, 0] }) }] }}>
          {src ? <Image source={imgSource(src)} style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: 16, backgroundColor: c.surface2 }} contentFit="cover" transition={200} />
            : <View style={{ height: 110, borderRadius: 16, backgroundColor: c.surface2, alignItems: 'center', justifyContent: 'center' }}><Icon name={sectionIcon(q.c)} size={44} color={c.muted} /></View>}
          <View style={{ gap: 4 }}>
            <T raw={!RTL} style={{ fontSize: 18, lineHeight: 29, fontWeight: '700' }}>{RTL ? q.sfa : main({ da: q.sda, en: q.sen })}</T>
            {RTL ? <T raw keepDa style={{ color: c.muted, fontSize: 13, lineHeight: 20, writingDirection: 'ltr', textAlign: 'left' }}>{main({ da: q.sda, en: q.sen })}</T> : null}
          </View>
        </Animated.View>

        {/* the statement in turn, with its two answers */}
        <Animated.View style={{ opacity: rise, transform: [{ translateY: rise.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }, { translateX: shake }] }}>
          <View style={{ borderRadius: 18, borderWidth: 2, padding: 16, gap: 14,
            borderColor: given == null ? c.line : given === st.ok ? c.ok : c.bad, backgroundColor: given == null ? c.surface : given === st.ok ? c.okSoft : c.badSoft }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <T style={{ color: c.muted, fontSize: 12.5 }}>{t('گزینه‌ی {0} از {1}', k + 1, q.st.length)}</T>
              <View style={{ flex: 1 }} />
              {given != null ? (
                <Animated.View style={{ transform: [{ scale: pop.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] }) }] }}>
                  <Icon name={given === st.ok ? 'checkCircle' : 'xCircle'} size={26} color={given === st.ok ? c.ok : c.bad} />
                </Animated.View>
              ) : null}
            </View>
            <T raw={!RTL} style={{ fontSize: 16.5, lineHeight: 27, fontWeight: '600' }}>{RTL ? st.fa : main(st)}</T>
            {RTL ? <T raw keepDa style={{ color: c.muted, fontSize: 12.5, lineHeight: 19, writingDirection: 'ltr', textAlign: 'left' }}>{main(st)}</T> : null}
            {given == null ? (
              <View style={{ flexDirection: 'row', gap: 10 }}>
                {([[1, 'درست است', 'check'], [0, 'نادرست است', 'xmark']] as const).map(([a, label, icon]) => (
                  <Pressable key={a} onPress={() => answer(a)} accessibilityRole="button" accessibilityLabel={tr(label)}
                    style={({ pressed }) => ({ flex: 1, height: 54, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
                      backgroundColor: c.surface2, borderWidth: 1, borderColor: c.line, transform: [{ scale: pressed ? 0.96 : 1 }] })}>
                    <Icon name={icon} size={20} color={c.text} />
                    <T style={{ fontWeight: '700', fontSize: 15 }}>{label}</T>
                  </Pressable>
                ))}
              </View>
            ) : (
              <Animated.View style={{ gap: 4, opacity: pop }}>
                <T style={{ fontWeight: '800', fontSize: 15, color: given === st.ok ? c.ok : c.bad }}>{given === st.ok ? 'درست جواب دادید!' : st.ok ? 'این گزینه درست بود.' : 'این گزینه نادرست بود.'}</T>
                <T raw={!RTL} style={{ fontSize: 14, lineHeight: 23 }}>{why(st)}</T>
              </Animated.View>
            )}
          </View>
        </Animated.View>

        {given != null ? (
          <View style={{ gap: 10 }}>
            {all ? (
              <T style={{ textAlign: 'center', fontWeight: '700', fontSize: 15, color: qRight === q.st.length ? c.ok : c.text }}>
                {qRight === q.st.length ? 'آفرین! همه‌ی گزینه‌های این سؤال را درست جواب دادید.' : t('{0} از {1} گزینه‌ی این سؤال درست بود.', qRight, q.st.length)}
              </T>
            ) : null}
            <ArcButton big label={!all ? 'گزینه‌ی بعد' : i + 1 < qs.length ? 'سؤال بعد' : 'دیدن نتیجه'} icon="arrowLeft" onPress={next} />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
