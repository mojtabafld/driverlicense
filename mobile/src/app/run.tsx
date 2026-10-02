// Taking an exam or a lesson: one picture at a time, statements to tick (on Liquid Glass), a slim strip on top and a
// floating Liquid Glass bar at the bottom with previous / the timer / next.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { imgSource } from '@/lib/img-source';
import { SECONDS_PER_Q, faNum, grade } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp, useQuestionImage } from '@/lib/store';
import { Icon, type IconName } from '@/ui/icon';
import { Backdrop, L, T, ThemeButton, tap } from '@/ui/kit';
import { uiText } from '@/ui/review';
import { LiquidGlass, useIOSBar } from '@/ui/liquid';
import { radius, useColors, useIsDark } from '@/ui/theme';

const ask = (title: string, msg: string, ok: string, onOk: () => void) => {
  if (Platform.OS === 'web') { if (window.confirm(`${title}\n${msg}`)) onOk(); return; }
  Alert.alert(title, msg, [{ text: 'انصراف', style: 'cancel' }, { text: ok, onPress: onOk }]);
};

export default function Run() {
  const c = useColors(), ins = useSafeAreaInsets(), dark = useIsDark(), ios = useIOSBar();
  const { Q, settings, saveAttempt } = useApp();
  const pic = useQuestionImage();
  const [plan] = useState(() => session.plan);
  const qs = useMemo(() => (plan ? plan.ids.map(id => Q.get(id)!).filter(Boolean) : []), [plan, Q]);
  const [i, setI] = useState(0);
  const [ticks, setTicks] = useState<boolean[][]>(() => qs.map(q => q.st.map(() => false)));
  const [left, setLeft] = useState(qs.length * SECONDS_PER_Q);
  const [showFa, setShowFa] = useState(settings.showFa);
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
  const handIn = () => {
    const empty = qs.length - answered;
    if (empty) ask('تحویل آزمون؟', `در ${faNum(empty)} سؤال هیچ گزینه‌ای انتخاب نشده است.`, 'تحویل', finish); else finish();
  };
  const quit = () => ask('خروج از آزمون؟', 'پاسخ‌های این آزمون ذخیره نمی‌شوند.', 'خروج', () => router.back());
  const ui = uiText(lang === 'en' ? 'en' : 'da');
  const mm = `${faNum(Math.floor(left / 60))}:${faNum(String(left % 60).padStart(2, '0'))}`;

  return (
    <Backdrop>
      {/* Top: exit (icon), the exam's name and the position, and the theme switch. SafeAreaView measures the top inset
          itself (in a full-screen modal the hook's value can be stale), and the web gets extra room at the top. */}
      <SafeAreaView edges={['top']} style={{ paddingTop: Platform.OS === 'web' ? 14 : 8, paddingBottom: 10, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: c.line }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%', maxWidth: 760, alignSelf: 'center' }}>
          <Pressable onPress={quit} hitSlop={8} accessibilityRole="button" accessibilityLabel="خروج از آزمون"
            style={({ pressed }) => ({ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.accentSoft : c.surface, borderWidth: 1, borderColor: c.line })}>
            <Icon name="exit" size={20} color={c.link} />
          </Pressable>
          {/* The exam's name in the middle, with the counter (Latin digits) in front of it. */}
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <T style={{ fontWeight: '700', fontSize: 16, lineHeight: 26, textAlign: 'center', flexShrink: 1 }} numberOfLines={1}>{plan.title}</T>
            <View style={{ paddingHorizontal: 8, paddingVertical: 1, borderRadius: 99, backgroundColor: c.accentSoft }}>
              <L style={{ fontSize: 13, lineHeight: 20, fontWeight: '700', color: c.link, fontVariant: ['tabular-nums'] }}>{i + 1}/{qs.length}</L>
            </View>
          </View>
          <ThemeButton />
        </View>
      </SafeAreaView>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: ins.bottom + 100, gap: 12, maxWidth: 760, width: '100%', alignSelf: 'center' }}>
        <Image source={imgSource(pic(q))} style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: radius.md }} contentFit="contain" transition={200} />
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
              <LiquidGlass r={18} interactive tint={on ? (dark ? 'rgba(31,106,165,0.38)' : 'rgba(2,71,118,0.13)') : undefined}
                style={{ flexDirection: 'row', direction: 'ltr', gap: 12, paddingVertical: 15, paddingHorizontal: 14, alignItems: 'flex-start', ...(on ? { borderColor: c.accent, borderWidth: 1.5 } : {}) }}>
                <View style={{ width: 20, height: 20, marginTop: 2, borderRadius: 6, borderWidth: 1.5, borderColor: on ? c.accent : c.muted, backgroundColor: on ? c.accent : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                  {on ? <Icon name="check" size={13} color="#fff" weight="bold" /> : null}
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <L style={{ fontSize: 16.5, lineHeight: 23 }}>{lang === 'en' && s.en ? s.en : s.da}</L>
                  {showFa && s.fa ? <T style={{ color: c.muted, fontSize: 14 }}>{s.fa}</T> : null}
                </View>
              </LiquidGlass>
            </Pressable>
          );
        })}
      </ScrollView>
      {/* A floating Liquid Glass bar in the questions' language (Danish / English, left to right): previous on the left,
          the timer (or the position) between, next / hand in on the right. */}
      <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, bottom: ins.bottom + 14, paddingHorizontal: 16, alignItems: 'center' }}>
        <LiquidGlass bar r={30} style={{ flexDirection: 'row', direction: 'ltr', alignItems: 'center', gap: 8, padding: 6, width: '100%', maxWidth: 520 } as any}>
          <FootBtn label={ui.prev} icon="arrowLeft" lead disabled={i === 0} onPress={() => setI(i - 1)} />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {settings.timer ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Icon name="clock" size={15} color={left < 60 ? ios.red : ios.secondary} />
                <T style={{ fontSize: 17, lineHeight: 24, fontWeight: '800', textAlign: 'center', color: left < 60 ? ios.red : ios.label, fontVariant: ['tabular-nums'] }}>{mm}</T>
              </View>
            ) : null}
            <L style={{ fontSize: settings.timer ? 15 : 20, lineHeight: settings.timer ? 19 : 26, color: settings.timer ? ios.secondary : ios.label, fontWeight: '700', textAlign: 'center', fontVariant: ['tabular-nums'] }}>{i + 1} / {qs.length}</L>
          </View>
          {last ? <FootBtn label={ui.handin} icon="check" submit onPress={handIn} /> : <FootBtn label={ui.next} icon="arrowRight" primary onPress={() => setI(i + 1)} />}
        </LiquidGlass>
      </View>
    </Backdrop>
  );
}

// Buttons of the exam's glass bar, as iOS 26/27 draws bar buttons, labelled in the questions' language: next filled in
// the system blue, hand in in the system green, previous a grey capsule with blue text. `lead`: icon before the label.
function FootBtn({ label, onPress, disabled, submit, primary, icon, lead }: { label: string; onPress: () => void; disabled?: boolean; submit?: boolean; primary?: boolean; icon: IconName; lead?: boolean }) {
  const ios = useIOSBar();
  const solid = submit || primary, fg = solid ? '#fff' : ios.tint;
  return (
    <Pressable disabled={disabled} onPress={() => { tap(); onPress(); }} style={({ pressed }) => ({ opacity: disabled ? 0.35 : pressed ? 0.8 : 1 })}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, height: 46, minWidth: 104, paddingHorizontal: 18, borderRadius: 23, justifyContent: 'center',
        backgroundColor: submit ? ios.green : primary ? ios.tint : ios.fill }}>
        {lead ? <Icon name={icon} size={16} color={fg} weight="semibold" /> : null}
        <L style={{ color: fg, fontWeight: '700', fontSize: 15.5, lineHeight: 22, textAlign: 'center' }}>{label}</L>
        {!lead ? <Icon name={icon} size={16} color={fg} weight={icon === 'check' ? 'bold' : 'semibold'} /> : null}
      </View>
    </Pressable>
  );
}
