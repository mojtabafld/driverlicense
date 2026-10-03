// Taking an exam or a lesson: one picture at a time, statements to tick (on Liquid Glass), a slim strip on top and a
// floating Liquid Glass bar at the bottom with previous / the timer / next.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { imgSource } from '@/lib/img-source';
import { SECONDS_PER_Q, faNum, grade } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp, useQuestionImage } from '@/lib/store';
import { Confirm } from '@/ui/confirm';
import { BarCount, FootBtn, GlassBar } from '@/ui/glass-bar';
import { Icon } from '@/ui/icon';
import { Backdrop, L, T, ThemeButton, physical, tap } from '@/ui/kit';
import { uiText } from '@/ui/review';
import { NUM_FONT, radius, useColors, useIsDark } from '@/ui/theme';

export default function Run() {
  const c = useColors(), ins = useSafeAreaInsets(), dark = useIsDark();
  const { Q, settings, saveAttempt } = useApp();
  const pic = useQuestionImage();
  const [plan] = useState(() => session.plan);
  const qs = useMemo(() => (plan ? plan.ids.map(id => Q.get(id)!).filter(Boolean) : []), [plan, Q]);
  const [i, setI] = useState(0);
  const [ticks, setTicks] = useState<boolean[][]>(() => qs.map(q => q.st.map(() => false)));
  const [left, setLeft] = useState(qs.length * SECONDS_PER_Q);
  // The Persian translation starts hidden in an exam; the button under the question shows it.
  const [showFa, setShowFa] = useState(false);
  // Questions marked for a second look before handing in, and the open question (exit / hand in).
  const [flags, setFlags] = useState<number[]>([]);
  const [dialog, setDialog] = useState<'quit' | 'handin' | null>(null);
  const [started] = useState(() => Date.now());
  const done = useRef(false);
  const lang = settings.lang === 'en' ? 'en' : 'da';

  const finish = async () => {
    if (done.current || !plan) return; done.current = true;
    const items = qs.map((q, k) => { const g = grade(q, ticks[k]); return { id: g.id, ok: g.ok, w: g.w, a: g.a }; });
    const secs = Math.round((Date.now() - started) / 1000);
    const attempt = { secs, mode: plan.mode, ...(plan.lesson ? { lesson: plan.lesson } : {}), items };
    session.result = { at: Date.now(), ...attempt }; session.fresh = true;
    saveAttempt(attempt).catch(() => {});
    router.replace('/result');
  };
  useEffect(() => {
    if (!settings.timer) return;
    const t = setInterval(() => setLeft(s => { if (s <= 1) { clearInterval(t); finish(); return 0; } return s - 1; }), 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!plan || !qs.length) { router.back(); return null; }

  const q = qs[i], last = i === qs.length - 1;
  const answered = ticks.filter(t => t.some(Boolean)).length;
  const toggle = (k: number) => { tap(); setTicks(t => t.map((row, r) => (r === i ? row.map((v, j) => (j === k ? !v : v)) : row))); };
  const empty = qs.length - answered;
  const handIn = () => { if (empty || flags.length) setDialog('handin'); else finish(); };
  const quit = () => { tap(); setDialog('quit'); };
  const flagged = flags.includes(i);
  const flag = () => { tap(); setFlags(f => (f.includes(i) ? f.filter(x => x !== i) : [...f, i].sort((a, b) => a - b))); };
  const goTo = (k: number) => { tap(); setDialog(null); setI(k); };
  // The marked questions as small numbered buttons that open them.
  const flagChips = (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', direction: 'ltr' } as any}>
      {flags.map(k => (
        <Pressable key={k} onPress={() => goTo(k)} accessibilityLabel={`سؤال ${k + 1}`}
          style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 99,
            backgroundColor: c.accentSoft, opacity: pressed ? 0.75 : 1 })}>
          <Icon name="bookmark" size={14} filled color={dark ? c.link : c.accent} />
          <L style={{ fontSize: 15, lineHeight: 20, fontWeight: '600', color: dark ? c.link : c.accent, fontFamily: NUM_FONT }}>{k + 1}</L>
        </Pressable>
      ))}
    </View>
  );
  const ui = uiText(lang === 'en' ? 'en' : 'da');
  const mm = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;

  return (
    <Backdrop>
      {/* Top: exit (icon) with the exam's name beside it, the timer (Latin digits) in the middle of the screen, and
          the theme switch. SafeAreaView measures the top inset itself (in a full-screen modal the hook's value can be
          stale), and the web gets extra room at the top. */}
      <SafeAreaView edges={['top']} style={{ paddingTop: Platform.OS === 'web' ? 14 : 8, paddingBottom: 10, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: c.line }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%', maxWidth: 760, alignSelf: 'center' }}>
          <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
            {settings.timer ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, direction: 'ltr' } as any}>
                <Icon name="clock" size={17} color={left < 60 ? c.bad : dark ? c.link : c.accent} weight="semibold" />
                <L style={{ fontSize: 20, lineHeight: 27, fontWeight: '500', color: left < 60 ? c.bad : dark ? c.link : c.accent, fontVariant: ['tabular-nums'], fontFamily: NUM_FONT }}>{mm}</L>
              </View>
            ) : null}
          </View>
          <Pressable onPress={quit} hitSlop={8} accessibilityRole="button" accessibilityLabel="خروج از آزمون"
            style={({ pressed }) => ({ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.accentSoft : c.surface, borderWidth: 1, borderColor: c.line })}>
            <Icon name="exit" size={20} color={c.link} />
          </Pressable>
          {/* Kept clear of the counter in the middle. */}
          <T style={{ fontWeight: '700', fontSize: 15, lineHeight: 24, maxWidth: '30%' }} numberOfLines={1}>{plan.title}</T>
          <View style={{ flex: 1 }} />
          <ThemeButton />
        </View>
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: ins.bottom + 100, gap: 12, maxWidth: 760, width: '100%', alignSelf: 'center' }}>
        <View>
          <Image source={imgSource(pic(q))} style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: radius.md }} contentFit="contain" transition={200} />
          {/* Mark the question to look at it again before handing in. */}
          <Pressable onPress={flag} hitSlop={6} accessibilityRole="button" accessibilityLabel="علامت برای بازبینی" accessibilityState={{ selected: flagged }}
            style={{ position: 'absolute', top: 8, ...physical({ left: 8 }), flexDirection: 'row', alignItems: 'center', gap: 6, height: 36, paddingHorizontal: 12, borderRadius: 18,
              backgroundColor: flagged ? c.accent : dark ? 'rgba(20,30,30,0.6)' : 'rgba(255,255,255,0.85)' }}>
            <Icon name="bookmark" size={16} filled={flagged} color={flagged ? '#fff' : dark ? '#fff' : c.accent} />
            <T style={{ fontSize: 12.5, lineHeight: 20, fontWeight: '600', color: flagged ? '#fff' : dark ? '#fff' : c.accent }}>{flagged ? 'علامت‌خورده' : 'بازبینی بعداً'}</T>
          </Pressable>
        </View>
        <View style={{ gap: 4 }}>
          <L style={{ fontSize: 20, fontWeight: '600', lineHeight: 27 }}>{lang === 'en' && q.sen ? q.sen : q.sda}</L>
          {showFa && q.sfa ? <T style={{ color: c.muted }}>{q.sfa}</T> : null}
          <Pressable onPress={() => { tap(); setShowFa(!showFa); }} hitSlop={6} accessibilityRole="button" accessibilityState={{ selected: showFa }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 99, backgroundColor: c.accentSoft }}>
            <Icon name="translate" size={15} color={c.link} />
            <T style={{ color: c.link, fontWeight: '600', fontSize: 13 }}>{showFa ? 'پنهان کردن ترجمه' : 'نمایش ترجمه'}</T>
          </Pressable>
        </View>
        {q.st.map((s, k) => {
          const on = ticks[i][k];
          return (
            <Pressable key={k} onPress={() => toggle(k)} style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.985 : 1 }] })}>
              {/* The statements are Danish / English, so the row runs left to right: the check box on the left. */}
              {/* Flat white cards with a thin border; the chosen ones in the app's teal. */}
              <View style={{ flexDirection: 'row', direction: 'ltr', gap: 12, paddingVertical: 15, paddingHorizontal: 14, alignItems: 'flex-start', borderRadius: 16,
                borderWidth: 1.5, borderColor: on ? c.accent : c.line, backgroundColor: on ? c.accentSoft : c.surface } as any}>
                <View style={{ width: 20, height: 20, marginTop: 2, borderRadius: 6, borderWidth: 1.5, borderColor: on ? c.accent : c.muted, backgroundColor: on ? c.accent : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                  {on ? <Icon name="check" size={13} color="#fff" weight="bold" /> : null}
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <L style={{ fontSize: 16.5, lineHeight: 23 }}>{lang === 'en' && s.en ? s.en : s.da}</L>
                  {showFa && s.fa ? <T style={{ color: c.muted, fontSize: 14 }}>{s.fa}</T> : null}
                </View>
              </View>
            </Pressable>
          );
        })}
        {/* On the last question: the marked ones, to look at again before handing in. */}
        {last && flags.length ? (
          <View style={{ gap: 10, marginTop: 6, padding: 14, borderRadius: 16, backgroundColor: c.surface, borderWidth: 1.5, borderColor: c.line }}>
            <T style={{ fontSize: 14, fontWeight: '700', textAlign: 'center' }}>سؤال‌های علامت‌خورده برای بازبینی</T>
            {flagChips}
          </View>
        ) : null}
      </ScrollView>
      {/* The floating glass bar: previous on the left, the position between, next / hand in on the right. */}
      <GlassBar
        start={<FootBtn label={ui.prev} icon="arrowLeft" round disabled={i === 0} onPress={() => setI(i - 1)} />}
        middle={<BarCount n={i + 1} of={qs.length} />}
        end={last ? <FootBtn label={ui.handin} icon="check" submit onPress={handIn} /> : <FootBtn label={ui.next} icon="arrowRight" round onPress={() => setI(i + 1)} />} />
      <Confirm open={dialog === 'quit'} title="خروج از آزمون؟" text="پاسخ‌های این آزمون ذخیره نمی‌شوند."
        cancel="ادامه‌ی آزمون" ok="خروج" danger onCancel={() => setDialog(null)} onOk={() => { setDialog(null); router.back(); }} />
      <Confirm open={dialog === 'handin'} title="تحویل آزمون؟"
        text={empty ? `در ${faNum(empty)} سؤال هیچ گزینه‌ای انتخاب نشده است.` : flags.length ? 'این سؤال‌ها را برای بازبینی علامت زده‌اید:' : undefined}
        cancel="بازبینی" ok="تحویل" onCancel={() => setDialog(null)} onOk={() => { setDialog(null); finish(); }}>
        {flags.length ? (
          <View style={{ gap: 8 }}>
            {empty ? <T style={{ fontSize: 13.5, color: c.muted, textAlign: 'center' }}>سؤال‌های علامت‌خورده:</T> : null}
            {flagChips}
          </View>
        ) : null}
      </Confirm>
    </Backdrop>
  );
}
