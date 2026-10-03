// Answer review, drawn like the site's review cards (.rcard): the picture with «سؤال n» and the bookmark, the category
// badge and the «ترجمه» switch, the question, «پاسخ شما» / «پاسخ صحیح» with every statement (and its explanation),
// «تحلیل پاسخ شما» from the AI (or the topic's short lesson), and the AI summary of all mistakes.
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Animated, Easing, Pressable, View } from 'react-native';

import { api } from '@/lib/api';
import type { Item, Question } from '@/lib/bank';
import { imgSource } from '@/lib/img-source';
import { faNum } from '@/lib/logic';
import { sectionFa, topicFa } from '@/lib/names';
import { useApp, useQuestionImage } from '@/lib/store';
import { Icon } from './icon';
import { L, T, physical, tap } from './kit';
import { DA_FONT, radius, useColors, useIsDark } from './theme';

const UI = {
  da: { expl: 'Forklaring:', yes: 'Ja.', no: 'Nej.', prev: 'Forrige', next: 'Næste', handin: 'Aflever', restart: 'Forfra', summary: 'Opsummering', exams: 'Prøver', lessons: 'Lektioner' },
  en: { expl: 'Explanation:', yes: 'Yes.', no: 'No.', prev: 'Previous', next: 'Next', handin: 'Hand in', restart: 'Start over', summary: 'Summary', exams: 'Exams', lessons: 'Lessons' },
};
export const uiText = (lang: 'da' | 'en') => UI[lang];

// Like the site, digits are Persian everywhere in the review, Danish text included (faNum).
// The AI text as on the site: «# » headings, «- » bullets, **bold**; «تیک زد» is worded «انتخاب کرد».
const pickWords = (t: string) => t.replace(/تیک(?:\s|‌)*نزد/g, 'انتخاب نکرد').replace(/تیک(?:\s|‌)*زد/g, 'انتخاب کرد')
  .replace(/تیک(?:\s|‌)*نخورد/g, 'انتخاب نشد').replace(/تیک(?:\s|‌)*خورد/g, 'انتخاب شد');
function Rich({ text, onQuestion }: { text: string; onQuestion?: (n: number) => void }) {
  const c = useColors();
  const inline = (s: string, key: string) => s.split(/(\*\*.+?\*\*)/g).flatMap((part, i) => {
    const bold = /^\*\*.+\*\*$/.test(part), body = bold ? part.slice(2, -2) : part;
    // «سؤال ۳» in the summary opens that question.
    return body.split(/(سؤال\s*[0-9۰-۹]+)/g).map((seg, j) => {
      const m = seg.match(/^سؤال\s*([0-9۰-۹]+)$/);
      const k = `${key}-${i}-${j}`;
      if (m && onQuestion) {
        const n = +m[1].replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
        return <T key={k} onPress={() => onQuestion(n)} style={{ color: c.link, fontWeight: '700', textDecorationLine: 'underline' }}>{seg}</T>;
      }
      return bold ? <T key={k} style={{ fontWeight: '700' }}>{seg}</T> : seg;
    });
  });
  const out: React.ReactNode[] = [];
  pickWords(text).split('\n').map(l => l.trim()).filter(Boolean).forEach((line, i) => {
    if (line.startsWith('#')) out.push(<T key={i} style={{ marginTop: 10, marginBottom: 2, fontSize: 14, fontWeight: '700', color: c.link }}>{inline(line.replace(/^#+\s*/, ''), `h${i}`)}</T>);
    else if (/^[-•*]\s+/.test(line)) out.push(
      <View key={i} style={{ flexDirection: 'row', gap: 8, marginVertical: 1 }}>
        <T style={{ fontSize: 14, lineHeight: 25 }}>•</T>
        <T style={{ flex: 1, fontSize: 14, lineHeight: 25 }}>{inline(line.replace(/^[-•*]\s+/, ''), `l${i}`)}</T>
      </View>);
    else out.push(<T key={i} style={{ fontSize: 14, lineHeight: 25, marginVertical: 2 }}>{inline(line, `p${i}`)}</T>);
  });
  return <View>{out}</View>;
}

// Pulsing sparkles, a line of text and shimmering placeholder lines while the AI writes.
function AiLoading({ text }: { text: string }) {
  const c = useColors();
  const [pulse] = useState(() => new Animated.Value(0.55));
  useEffect(() => {
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0.55, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ]));
    loop.start(); return () => loop.stop();
  }, [pulse]);
  return (
    <View style={{ gap: 12, paddingVertical: 4 }} accessibilityRole="progressbar">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Animated.View style={{ opacity: pulse, width: 34, height: 34, borderRadius: 8, backgroundColor: c.accent, alignItems: 'center', justifyContent: 'center' }}><Icon name="sparkles" size={18} color="#fff" /></Animated.View>
        <T style={{ flex: 1, fontSize: 14, fontWeight: '600' }}>{text}…</T>
      </View>
      <Animated.View style={{ opacity: pulse, gap: 9, ...physical({ paddingRight: 44 }) }}>
        {[92, 78, 86, 55].map(w => <View key={w} style={{ height: 10, width: `${w}%`, borderRadius: 99, backgroundColor: c.surface2 }} />)}
      </Animated.View>
    </View>
  );
}

// The site's «تحلیل پاسخ شما» / «جمع‌بندی آموزشی اشتباهات» button: outlined in teal, filled while its text is shown.
function AiButton({ title, sub, shown, onPress }: { title: string; sub: string; shown: boolean; onPress: () => void }) {
  const c = useColors(), dark = useIsDark();
  const fg = shown ? (dark ? '#0b1520' : '#fff') : c.link;
  return (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="button" accessibilityState={{ expanded: shown }}
      style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.99 : 1 }] })}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, borderWidth: 1.5,
        borderColor: dark ? c.link : c.accent, backgroundColor: shown ? (dark ? c.link : c.accent) : c.surface }}>
        {/* The AI mark in the theme's teal; on the filled (open) button a see-through tile in the label's colour. */}
        <View style={{ width: 34, height: 34, borderRadius: 8, alignItems: 'center', justifyContent: 'center',
          backgroundColor: shown ? (dark ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.22)') : c.accent }}>
          <Icon name="sparkles" size={18} color={shown ? fg : '#fff'} />
        </View>
        <View style={{ flex: 1 }}>
          <T style={{ fontSize: 15, fontWeight: '700', color: fg }}>{title}</T>
          <T style={{ fontSize: 11.5, lineHeight: 17, color: fg, opacity: 0.75 }}>{sub}</T>
        </View>
        <View style={{ transform: [{ rotate: shown ? '180deg' : '0deg' }] }}><Icon name="chevronDown" size={18} color={fg} /></View>
      </View>
    </Pressable>
  );
}

// Lessons already fetched while the app is open (the server also keeps them, so a new visit costs no AI call).
const lessonCache = new Map<string, string>();

function AiTips({ q, a, at, lang }: { q: Question; a?: number[]; at?: number; lang: 'da' | 'en' }) {
  const c = useColors();
  const key = `${q.id}:${a ? a.join('') : ''}:${lang}`;
  const [shown, setShown] = useState(false);
  const [text, setText] = useState<string | null>(() => lessonCache.get(key) ?? null);
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [err, setErr] = useState('');
  const load = () => {
    setState('loading');
    api<{ text: string }>('POST', 'lesson', { qid: q.id, a, lang, at })
      .then(d => { lessonCache.set(key, d.text); setText(d.text); setState('idle'); })
      .catch((e: any) => { setErr(e.status === 429 ? e.message : 'نکات الان آماده نشد؛ دوباره امتحان کنید.'); setState('error'); });
  };
  const press = () => {
    if (state === 'loading') return;
    if (!shown && !text) load();
    setShown(!shown || (!text && state === 'error'));
  };
  return (
    <View style={{ marginTop: 14 }}>
      <AiButton title="تحلیل پاسخ شما" sub="با استفاده از هوش مصنوعی" shown={shown} onPress={press} />
      {shown ? (
        <View style={{ marginTop: 8, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 10, backgroundColor: c.accentSoft }}>
          {state === 'loading' ? <AiLoading text="در حال آماده‌سازی نکات این سؤال بر اساس پاسخ شما" />
            : state === 'error' ? <T style={{ color: c.muted, fontSize: 14 }}>{err}</T>
            : text ? <Rich text={text} /> : null}
        </View>
      ) : null}
    </View>
  );
}

// «جمع‌بندی آموزشی اشتباهات»: the AI summary of all the mistakes of an exam or lesson.
export function AiSummary({ items, at, lang, onQuestion }: { items: Item[]; at?: number; lang: 'da' | 'en'; onQuestion?: (n: number) => void }) {
  const c = useColors();
  const [shown, setShown] = useState(false);
  const [text, setText] = useState<string | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [err, setErr] = useState('');
  const wrong = items.map((it, i) => ({ it, n: i + 1 })).filter(x => !x.it.ok && x.it.a).map(({ it, n }) => ({ id: it.id, a: it.a!.map(v => (v ? 1 : 0)), n }));
  const press = () => {
    if (state === 'loading') return;
    if (!shown && !text) {
      setState('loading');
      api<{ text: string }>('POST', 'summary', { items: wrong, lang, at })
        .then(d => { setText(d.text); setState('idle'); })
        .catch((e: any) => { setErr(e.status === 503 ? 'آموزش هوش مصنوعی فعال نیست.' : e.message); setState('error'); });
    }
    setShown(!shown || (!text && state === 'error'));
  };
  return (
    <View style={{ marginTop: 22 }}>
      <AiButton title="جمع‌بندی آموزشی اشتباهات" sub="خلاصه‌ی آموزشی همه‌ی اشتباهات این آزمون، با استفاده از هوش مصنوعی" shown={shown} onPress={press} />
      {shown ? (
        <View style={{ marginTop: 8, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 10, backgroundColor: c.accentSoft }}>
          {state === 'loading' ? <AiLoading text="در حال بررسی اشتباهات شما و آماده‌سازی جمع‌بندی آموزشی" />
            : state === 'error' ? <T style={{ color: c.muted, fontSize: 14 }}>{err}</T>
            : text ? <Rich text={text} onQuestion={onQuestion} /> : null}
        </View>
      ) : null}
    </View>
  );
}
export const hasSummary = (items: Item[], ai: boolean) => ai && items.some(it => !it.ok && it.a);

// One statement of a reviewed question: a flat card like the exam's in the flat layout, else the list's bordered box.
// A wrong tick or a missing one is shown in red.
function Statement({ flat, mark, children }: { flat: boolean; mark: boolean; children: React.ReactNode }) {
  const c = useColors();
  if (flat) {
    return <View style={{ paddingVertical: 15, paddingHorizontal: 14, borderRadius: 16, borderWidth: 1.5, borderColor: mark ? c.bad : c.line, backgroundColor: mark ? c.badSoft : c.surface }}>{children}</View>;
  }
  return <View style={{ padding: 14, borderRadius: 12, borderWidth: 1.5, borderColor: mark ? c.bad : c.line, backgroundColor: mark ? c.badSoft : c.surface }}>{children}</View>;
}

type CardProps = {
  q: Question; it: Pick<Item, 'ok' | 'a'>; index?: number; lang: 'da' | 'en'; fa: boolean; at?: number;
  // Step-by-step review: always open, without the «جزئیات و توضیحات» switch at the bottom.
  alwaysOpen?: boolean; startOpen?: boolean;
  // An extra badge before the category, e.g. «۳ اشتباه در ۴ آزمون» on the mistakes page.
  badge?: { text: string; fg: string; bg: string };
};
export function ReviewCard({ q, it, index, lang, fa: faStart, at, alwaysOpen, startOpen, badge }: CardProps) {
  const c = useColors(), dark = useIsDark();
  const { bank, aiLessons, saved, toggleSaved } = useApp();
  const pic = useQuestionImage();
  const [open, setOpen] = useState(!!(alwaysOpen || startOpen));
  const [fa, setFa] = useState(faStart);
  const [view, setView] = useState<'mine' | 'right'>(it.a ? 'mine' : 'right');
  const isSaved = saved.some(x => x.id === q.id);
  const t = bank?.topics[q.c];
  const ui = UI[lang];
  const on = open || alwaysOpen;
  // Step-by-step review is laid out like the exam itself: no card around it, the full width for the picture, the
  // question in the exam's size and the statements on glass rows. The list keeps its cards.
  const flat = !!alwaysOpen;
  return (
    <View style={flat ? { gap: 4 } : { backgroundColor: c.surface, borderRadius: 10, borderWidth: 1, borderColor: c.cardBorder, overflow: 'hidden',
      shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 1 }}>
      {/* Head: picture, badges, question */}
      <Pressable disabled={alwaysOpen} onPress={() => setOpen(!open)} style={{ padding: flat ? 0 : 12, gap: flat ? 12 : 10 }}>
        <View>
          <Image source={imgSource(pic(q))} style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: flat ? radius.md : 6, backgroundColor: c.surface2 }} contentFit="contain" />
          {index != null ? (
            <View style={{ position: 'absolute', top: 8, ...physical({ right: 8 }), backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 99, paddingHorizontal: 9, paddingVertical: 1 }}>
              <T style={{ color: '#fff', fontSize: 12, lineHeight: 20, fontWeight: '600' }}>سؤال {faNum(index + 1)}</T>
            </View>
          ) : null}
          <Pressable onPress={() => { tap(); toggleSaved(q.id, it.a).catch(() => {}); }} hitSlop={6} accessibilityLabel="ذخیره‌ی سؤال" accessibilityState={{ selected: isSaved }}
            style={{ position: 'absolute', top: 8, ...physical({ left: 8 }), width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center',
              backgroundColor: dark ? (isSaved ? 'rgba(20,30,40,0.75)' : 'rgba(20,30,40,0.5)') : (isSaved ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)'),
              borderWidth: 1, borderColor: dark ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.7)' }}>
            <Icon name="bookmark" size={17} filled={isSaved} color={dark ? (isSaved ? c.link : '#fff') : c.accent} />
          </Pressable>
        </View>
        {/* One line: a long category name is cut with «…» so «ترجمه» stays beside it. */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {badge ? (
            <View style={{ flexShrink: 0, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 99, backgroundColor: badge.bg }}>
              <T style={{ fontSize: 12.5, lineHeight: 20, fontWeight: '700', color: badge.fg }}>{badge.text}</T>
            </View>
          ) : null}
          {/* The question's category (official section) */}
          {bank && sectionFa(bank, q.c) ? (
            <View style={{ flexShrink: 1, minWidth: 0, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 99, backgroundColor: c.surface2 }}>
              <T style={{ fontSize: 12.5, lineHeight: 20, fontWeight: '600', color: c.muted }} numberOfLines={1} ellipsizeMode="tail">{sectionFa(bank, q.c)}</T>
            </View>
          ) : null}
          <View style={{ flex: 1, minWidth: 4 }} />
          <Pressable onPress={() => { tap(); setFa(!fa); }} accessibilityRole="button" accessibilityState={{ selected: fa }}
            style={{ flexShrink: 0, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 9, paddingVertical: 2, borderRadius: 999, borderWidth: 1,
              borderColor: fa ? (dark ? c.link : c.accent) : c.line, backgroundColor: fa ? c.checked : 'transparent' }}>
            <Icon name="translate" size={14} color={fa ? c.link : c.muted} />
            <T style={{ fontSize: 12.5, lineHeight: 20, fontWeight: fa ? '600' : '400', color: fa ? c.link : c.muted }}>ترجمه</T>
          </Pressable>
        </View>
        <View style={{ gap: 8 }}>
          <L style={flat ? { fontSize: 18, lineHeight: 25, fontWeight: '600' } : { fontSize: 16, lineHeight: 24, fontWeight: '600' }}>{faNum(lang === 'en' && q.sen ? q.sen : q.sda)}</L>
          {fa && q.sfa ? (
            // The Persian translation on a soft teal tint, no side line.
            <View style={{ paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, backgroundColor: c.accentSoft }}>
              <T style={{ fontSize: 14.5, lineHeight: 25 }}>{q.sfa}</T>
            </View>
          ) : null}
        </View>
      </Pressable>
      {/* Body: your answer / the right answer, explanations, tips */}
      {on ? (
        <View style={flat ? { marginTop: 8 } : { marginHorizontal: 12, marginBottom: 12, padding: 12, backgroundColor: c.bg, borderWidth: 1, borderColor: c.line, borderRadius: 12 }}>
          {it.a ? (
            <View style={{ flexDirection: 'row', gap: 3, padding: 3, marginTop: 2, marginBottom: 14, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, borderRadius: 8 }}>
              {(['mine', 'right'] as const).map(v => {
                const sel = view === v;
                return (
                  <Pressable key={v} onPress={() => { tap(); setView(v); }} style={{ flex: 1 }} accessibilityRole="tab" accessibilityState={{ selected: sel }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 7, borderRadius: 6, backgroundColor: sel ? c.accent : 'transparent' }}>
                      {v === 'mine' ? <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: it.ok ? c.ok : c.bad, ...(sel ? { borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.85)', width: 10, height: 10, borderRadius: 5 } : {}) }} /> : null}
                      <T style={{ fontSize: 14, fontWeight: '600', color: sel ? '#fff' : c.muted, textAlign: 'center' }}>{v === 'mine' ? 'پاسخ شما' : 'پاسخ صحیح'}</T>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ) : <T style={{ fontWeight: '700', color: c.ok, marginTop: 4, marginBottom: 12 }}>پاسخ صحیح</T>}
          <View style={{ gap: flat ? 10 : 6, marginBottom: 12 }}>
            {q.st.map((s, k) => {
              const me = !!(it.a && it.a[k]);
              const mark = view === 'mine' && it.a && (me ? !s.ok : !!s.ok); // a wrong tick or a missing one
              const checked = view === 'mine' ? me : !!s.ok;
              const eda = (lang === 'en' ? s.een || s.eda : s.eda || '').trim() || (s.ok ? ui.yes : ui.no);
              const efa = (s.efa || '').trim() || (s.ok ? 'بله.' : 'خیر.');
              return (
                <Statement key={k} flat={flat} mark={!!mark}>
                  <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start', direction: 'ltr' } as any}>
                    <View style={{ width: 22, height: 22, marginTop: 1, borderRadius: 6, borderWidth: 2, alignItems: 'center', justifyContent: 'center',
                      borderColor: checked ? c.accent : c.muted, backgroundColor: checked ? c.accent : c.surface }}>
                      {checked ? <Icon name="check" size={13} color="#fff" weight="bold" /> : null}
                    </View>
                    <View style={{ flex: 1, gap: 4 }}>
                      <L style={{ fontSize: 14.5, lineHeight: 22 }}>{faNum(lang === 'en' && s.en ? s.en : s.da)}</L>
                      {fa && s.fa ? <T style={{ color: c.muted, fontSize: 14, lineHeight: 22 }}>{s.fa}</T> : null}
                    </View>
                  </View>
                  {view === 'right' ? (
                    <View style={physical({ paddingLeft: 32 })}>
                      <L style={{ marginTop: 10, fontSize: 15, lineHeight: 24 }}>{ui.expl} <L style={{ fontStyle: 'italic', fontSize: 15, lineHeight: 24 }}>{faNum(eda)}</L></L>
                      {fa ? <T style={{ marginTop: 4, fontSize: 14, color: c.muted }}>توضیح: {efa}</T> : null}
                    </View>
                  ) : null}
                </Statement>
              );
            })}
          </View>
          {aiLessons ? <AiTips q={q} a={it.a} at={at} lang={lang} />
            : t ? (
              <View style={{ marginTop: 14, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12, backgroundColor: c.accentSoft }}>
                <T style={{ fontSize: 15, fontWeight: '700', marginBottom: 6 }}>📘 آموزش کوتاه: {bank ? topicFa(bank, q.c) : ''} <T style={{ fontSize: 12.5, fontWeight: '500', color: c.muted, fontFamily: DA_FONT }}>({t.da})</T></T>
                {t.lesson.map((l, i) => (
                  <View key={i} style={{ flexDirection: 'row', gap: 8, marginVertical: 3 }}><T style={{ fontSize: 14 }}>•</T><T style={{ flex: 1, fontSize: 14 }}>{l}</T></View>
                ))}
              </View>
            ) : null}
        </View>
      ) : null}
      {!alwaysOpen ? (
        <Pressable onPress={() => { tap(); setOpen(!open); }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12, paddingHorizontal: 16, borderTopWidth: 1, borderTopColor: c.line }}>
          <T style={{ fontSize: 13, fontWeight: '600', color: on ? c.muted : c.link }}>جزئیات و توضیحات</T>
          <View style={{ transform: [{ rotate: on ? '180deg' : '0deg' }] }}><Icon name="chevronDown" size={18} color={on ? c.muted : c.link} /></View>
        </Pressable>
      ) : null}
    </View>
  );
}
