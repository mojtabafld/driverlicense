// Taking an exam or a lesson: one picture at a time, statements to tick, glass controls at the bottom.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { imgSource } from '@/lib/img-source';
import { SECONDS_PER_Q, faNum, grade } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp, useQuestionImage } from '@/lib/store';
import { Glass } from '@/ui/glass';
import { Backdrop, Button, L, T, tap } from '@/ui/kit';
import { radius, useColors } from '@/ui/theme';

const ask = (title: string, msg: string, ok: string, onOk: () => void) => {
  if (Platform.OS === 'web') { if (window.confirm(`${title}\n${msg}`)) onOk(); return; }
  Alert.alert(title, msg, [{ text: 'انصراف', style: 'cancel' }, { text: ok, onPress: onOk }]);
};

export default function Run() {
  const c = useColors(), ins = useSafeAreaInsets();
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
  const mm = `${faNum(Math.floor(left / 60))}:${faNum(String(left % 60).padStart(2, '0'))}`;

  return (
    <Backdrop>
      <View style={{ paddingTop: ins.top + 8, paddingHorizontal: 14, gap: 10 }}>
        <Glass r={radius.pill} strong style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 6, gap: 8 }}>
          <Pressable onPress={quit} hitSlop={8} style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: c.hairline }}>
            <T style={{ fontSize: 18, textAlign: 'center', lineHeight: 22 }}>✕</T>
          </Pressable>
          <View style={{ flex: 1 }}>
            <T style={{ fontWeight: '800', fontSize: 15 }}>{plan.title}</T>
            <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 18 }}>سؤال {faNum(i + 1)} از {faNum(qs.length)}</T>
          </View>
          {settings.timer ? <Glass r={radius.pill} tint={left < 60 ? c.badSoft : c.accentSoft} style={{ paddingHorizontal: 12, paddingVertical: 6 }}><T style={{ fontWeight: '800', color: left < 60 ? c.bad : c.accent }}>{mm}</T></Glass> : null}
        </Glass>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingVertical: 2 }}>
          {qs.map((_, k) => (
            <Pressable key={k} onPress={() => { tap(); setI(k); }}>
              <View style={{ width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: k === i ? c.accent : ticks[k].some(Boolean) ? c.accentSoft : c.glass, borderWidth: 1, borderColor: c.glassBorder }}>
                <T style={{ fontSize: 12, lineHeight: 16, textAlign: 'center', fontWeight: '700', color: k === i ? c.accentText : c.text }}>{faNum(k + 1)}</T>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: ins.bottom + 110, gap: 12, maxWidth: 760, width: '100%', alignSelf: 'center' }}>
        <Image source={imgSource(pic(q))} style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: radius.lg }} contentFit="contain" transition={200} />
        <View style={{ gap: 4 }}>
          <L style={{ fontSize: 18, fontWeight: '700', lineHeight: 26 }}>{lang === 'en' && q.sen ? q.sen : q.sda}</L>
          {showFa && q.sfa ? <T style={{ color: c.muted }}>{q.sfa}</T> : null}
          <Pressable onPress={() => setShowFa(!showFa)} hitSlop={6}><T style={{ color: c.accent, fontWeight: '700', fontSize: 13 }}>{showFa ? 'پنهان کردن ترجمه' : 'نمایش ترجمه'}</T></Pressable>
        </View>
        {q.st.map((s, k) => {
          const on = ticks[i][k];
          return (
            <Pressable key={k} onPress={() => toggle(k)} style={({ pressed }) => pressed && { transform: [{ scale: 0.985 }] }}>
              <Glass r={radius.md} interactive tint={on ? c.accentSoft : undefined} style={{ flexDirection: 'row', gap: 12, padding: 14, alignItems: 'flex-start', ...(on ? { borderColor: c.accent, borderWidth: 1.5 } : {}) }}>
                <View style={{ width: 26, height: 26, borderRadius: 8, borderWidth: 2, borderColor: on ? c.accent : c.faint, backgroundColor: on ? c.accent : 'transparent', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                  {on ? <T style={{ color: '#fff', fontWeight: '900', textAlign: 'center', lineHeight: 20 }}>✓</T> : null}
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <L>{lang === 'en' && s.en ? s.en : s.da}</L>
                  {showFa && s.fa ? <T style={{ color: c.muted, fontSize: 14 }}>{s.fa}</T> : null}
                </View>
              </Glass>
            </Pressable>
          );
        })}
      </ScrollView>
      <View style={{ position: 'absolute', left: 14, right: 14, bottom: ins.bottom + 12, alignItems: 'center' }}>
        <Glass r={radius.pill} strong style={{ flexDirection: 'row', gap: 8, padding: 6, width: '100%', maxWidth: 520 }}>
          <Button kind="glass" label="قبلی" disabled={i === 0} onPress={() => setI(i - 1)} style={{ flex: 1 }} />
          {last ? <Button label="تحویل آزمون" onPress={handIn} style={{ flex: 1.4 }} /> : <Button label="بعدی" onPress={() => setI(i + 1)} style={{ flex: 1.4 }} />}
        </Glass>
      </View>
    </Backdrop>
  );
}
