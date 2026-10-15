// Answer review, drawn like the site's review cards (.rcard): the picture with «سؤال n» and the bookmark, the category
// badge and the «ترجمه» switch, the question, «پاسخ شما» / «پاسخ صحیح» with every statement (and its explanation),
// «تحلیل پاسخ شما» from the AI (or the topic's short lesson), and the AI summary of all mistakes.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { Animated, Easing, Platform, Pressable, View, type NativeScrollEvent, type NativeSyntheticEvent, type ScrollView, type TextStyle } from 'react-native';
import { router } from 'expo-router';

import { t as fmt, tr, transText } from '@/lib/i18n';
import { api } from '@/lib/api';
import type { Item, Question } from '@/lib/bank';
import { imgSource } from '@/lib/img-source';
import { faNum } from '@/lib/logic';
import { sectionFa, topicFa } from '@/lib/names';
import { useApp, useQuestionImage } from '@/lib/store';
import { Icon, type IconName } from './icon';
import { Enter, L, SegPill, T, TranslateButton, physical, tap, useArcSeg } from './kit';
import { SpeakButton } from './speak';
import { ZoomableImage } from './zoom';
import { OptionBox, OptionGroup } from './option-box';
import { ARC, DA_FONT, radius, useColors, useIsDark } from './theme';

const UI = {
  da: { expl: 'Forklaring:', yes: 'Ja.', no: 'Nej.', prev: 'Forrige', next: 'Næste', handin: 'Aflever', restart: 'Forfra', done: 'Færdig', exams: 'Prøver', lessons: 'Lektioner' },
  en: { expl: 'Explanation:', yes: 'Yes.', no: 'No.', prev: 'Previous', next: 'Next', handin: 'Hand in', restart: 'Start over', done: 'Done', exams: 'Exams', lessons: 'Lessons' },
};
export const uiText = (lang: 'da' | 'en') => UI[lang];

// Digits are Persian in the Persian text and Latin in the question's own (Danish / English) text.
// The AI text (in the neutral grey look: on the soft `note` panel, headings in the text colour): «# » headings, «- » bullets, **bold**; «تیک زد» is worded «انتخاب کرد».
const pickWords = (t: string) => t.replace(/تیک(?:\s|‌)*نزد/g, 'انتخاب نکرد').replace(/تیک(?:\s|‌)*زد/g, 'انتخاب کرد')
  .replace(/تیک(?:\s|‌)*نخورد/g, 'انتخاب نشد').replace(/تیک(?:\s|‌)*خورد/g, 'انتخاب شد');
// The AI's answer as the chat apps stream it: whole words at a time, quickly (under three seconds however long), the
// newest few words fading in (only when it has just come; text already seen shows whole). TAIL marks where the
// fading words start; an open «**» is closed while it is being written, so no stars show.
const TAIL = '\u2063';
function useTyped(text: string, on: boolean) {
  const [n, setN] = useState(on ? 0 : text.length);
  useEffect(() => {
    if (!on) return;
    let raf = 0, start = 0;
    const ms = Math.min(2600, Math.max(700, text.length * 5));
    const step = (t: number) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / ms);
      setN(Math.round(text.length * k));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, on]);
  if (!on || n >= text.length) return text;
  const gap = text.slice(n).search(/\s/), end = gap < 0 ? text.length : n + gap; // up to the end of a word
  const part = text.slice(0, end);
  const words = [...part.matchAll(/\S+/g)], t = words.length > 3 ? words[words.length - 3].index! : 0; // the last three words
  return `${part.slice(0, t)}${TAIL}${part.slice(t)}${(part.match(/\*\*/g) ?? []).length % 2 ? '**' : ''}`;
}

// The icon of an AI lesson's heading (lesson.js writes these parts), or none.
function headIcon(head: string, c: ReturnType<typeof useColors>): { name: IconName; color: string } | null {
  if (/درباره/.test(head)) return { name: 'help', color: c.info };
  if (/درست بود/.test(head)) return { name: 'checkCircle', color: c.ok };
  if (/^اشتباه شما/.test(head)) return { name: 'xCircle', color: c.bad };
  if (/نکته برای دفعه/.test(head)) return { name: 'bulbCircle', color: c.warn };
  return null;
}

function Rich({ text: full, onQuestion, typing = false, onGrow }: { text: string; onQuestion?: (n: number) => void; typing?: boolean; onGrow?: () => void }) {
  const c = useColors();
  const text = useTyped(full, typing);
  useEffect(() => { if (typing) onGrow?.(); }, [text, typing, onGrow]); // each written step: keep the line in view
  // Everything after TAIL is drawn faint (the words just arriving).
  let faded = false;
  // `line`: the line's own weight (a heading's), repeated on the inner spans, which would otherwise reset it.
  const piece = (seg: string, k: string, st?: TextStyle, line?: TextStyle) => {
    if (!faded && !seg.includes(TAIL)) return st ? <T key={k} style={st}>{seg}</T> : seg;
    const [a, b] = faded ? ['', seg] : seg.split(TAIL);
    faded = true;
    return <T key={k} style={st ?? line}>{a}<T style={[line, st, { opacity: 0.3 }]}>{b}</T></T>;
  };
  const inline = (s: string, key: string, line?: TextStyle) => s.split(/(\*\*.+?\*\*)/g).flatMap((part, i) => {
    const bold = /^\*\*.+\*\*$/.test(part), body = bold ? part.slice(2, -2) : part;
    // «سؤال ۳» in the summary opens that question.
    return body.split(/(سؤال\s*[0-9۰-۹]+)/g).map((seg, j) => {
      const m = seg.match(/^سؤال\s*([0-9۰-۹]+)$/);
      const k = `${key}-${i}-${j}`;
      if (m && onQuestion && !faded) {
        const n = +m[1].replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
        return <T key={k} onPress={() => onQuestion(n)} style={{ color: c.text, fontWeight: '700' }}>{seg}</T>;
      }
      return piece(seg, k, bold ? { fontWeight: '700' } : undefined, line);
    });
  });
  const out: React.ReactNode[] = [];
  pickWords(text).split('\n').map(l => l.trim()).filter(l => l && l !== TAIL).forEach((raw, i) => {
    if (raw.startsWith(TAIL)) faded = true; // a new line just begun
    const line = raw.startsWith(TAIL) ? raw.slice(1).trim() : raw;
    if (line.startsWith('#')) {
      // The lesson's parts get their icon, in the style of the round check: what it is about, the mistake, the tip.
      const head = line.replace(/^#+\s*/, ''), mark = headIcon(head, c);
      const title = <T style={{ flex: mark ? 1 : undefined, fontSize: 14.5, fontWeight: '800', color: c.text }}>{inline(head, `h${i}`, { fontWeight: '800' })}</T>;
      out.push(mark ? <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12, marginBottom: 4 }}><Icon name={mark.name} size={20} color={mark.color} />{title}</View>
        : <View key={i} style={{ marginTop: 10, marginBottom: 2 }}>{title}</View>);
    }
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
        <Animated.View style={{ opacity: pulse, width: 34, height: 34, borderRadius: 9, backgroundColor: c.strong, alignItems: 'center', justifyContent: 'center' }}><Icon name="sparkles" size={18} color={c.strongFg} /></Animated.View>
        <T style={{ flex: 1, fontSize: 14, fontWeight: '600' }}>{text}…</T>
      </View>
      <Animated.View style={{ opacity: pulse, gap: 9, ...physical({ paddingRight: 44 }) }}>
        {[92, 78, 86, 55].map(w => <View key={w} style={{ height: 10, width: `${w}%`, borderRadius: 99, backgroundColor: c.surface2 }} />)}
      </Animated.View>
    </View>
  );
}

// The site's «تحلیل پاسخ شما» button: outlined in teal, filled while its text is shown.
function AiButton({ title, sub, shown, onPress }: { title: string; sub: string; shown: boolean; onPress: () => void }) {
  const c = useColors(), dark = useIsDark();
  // In the neutral `strong` grey: outlined while closed (the AI mark on a solid tile), filled while its text shows.
  const fg = shown ? c.strongFg : c.text;
  return (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="button" accessibilityState={{ expanded: shown }}
      style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.99 : 1 }] })}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1.5,
        borderColor: shown ? c.strong : c.line, backgroundColor: shown ? c.strong : c.surface }}>
        <View style={{ width: 34, height: 34, borderRadius: 9, alignItems: 'center', justifyContent: 'center',
          backgroundColor: shown ? (dark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.14)') : c.strong }}>
          <Icon name="sparkles" size={18} color={c.strongFg} />
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

// When an AI button opens, the page glides down so the button sits near the top, just under the glass top bar, with
// its panel below it; while the answer is being typed the page follows its last line (`follow`), as chat apps do,
// keeping it above the bottom bar. Web: the browser's own scrolling on the nodes. Phones: the page's ScrollView,
// handed down with RevealScroll (useRevealScroll), scrolled by what measureInWindow reports.
type RevealCtx = { scroll: RefObject<ScrollView | null>; y: { current: number }; top: number };
const RevealScroll = createContext<RevealCtx | null>(null);
export const RevealScrollProvider = RevealScroll.Provider;
// For a page whose ScrollView holds review cards or the AI summary: the value for RevealScrollProvider and the
// ScrollView's props that keep its scroll position known. `top`: the height of the bar over the page's top.
export function useRevealScroll(scroll: RefObject<ScrollView | null>, top: number) {
  const y = useRef(0);
  const value = useMemo(() => ({ scroll, y, top }), [scroll, top]);
  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => { y.current = e.nativeEvent.contentOffset.y; }, []);
  return { value, scrollProps: { onScroll, scrollEventThrottle: 16 } };
}
// The ScrollView's box on the screen: x, y, width, height.
function measureScroll(ctx: RevealCtx, then: (sy: number, sh: number) => void) {
  const sv = ctx.scroll.current as any, node = sv?.getNativeScrollRef?.() ?? sv;
  if (!node?.measureInWindow) return;
  node.measureInWindow((_x: number, sy: number, _w: number, sh: number) => then(sy, sh));
}
function useReveal(open: boolean) {
  const ref = useRef<View>(null), panel = useRef<View>(null);
  const ctx = useContext(RevealScroll);
  useEffect(() => {
    if (!open) return;
    if (Platform.OS !== 'web') {
      if (!ctx) return;
      const t = setTimeout(() => measureScroll(ctx, sy => ref.current?.measureInWindow((_x, ey) => {
        const to = Math.max(0, ctx.y.current + ey - sy - ctx.top - 10);
        if (Math.abs(to - ctx.y.current) > 4) ctx.scroll.current?.scrollTo({ y: to, animated: true });
      })), 60);
      return () => clearTimeout(t);
    }
    const el = ref.current as unknown as HTMLElement | null;
    if (!el?.scrollIntoView) return;
    const t = setTimeout(() => { el.style.scrollMarginTop = 'calc(env(safe-area-inset-top) + 76px)'; el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
    return () => clearTimeout(t);
  }, [open, ctx]);
  const follow = useCallback(() => {
    if (Platform.OS !== 'web') {
      if (!ctx) return;
      measureScroll(ctx, (sy, sh) => panel.current?.measureInWindow((_x, py, _w, ph) => {
        const over = py + ph - (sy + sh - 110);
        if (over <= 0) return;
        ctx.y.current += over;
        ctx.scroll.current?.scrollTo({ y: ctx.y.current, animated: false });
      }));
      return;
    }
    const el = panel.current as unknown as HTMLElement | null;
    if (!el?.getBoundingClientRect) return;
    const over = el.getBoundingClientRect().bottom - (window.innerHeight - 110);
    if (over <= 0) return;
    let p = el.parentElement;
    while (p && !(p.scrollHeight > p.clientHeight && /(auto|scroll)/.test(getComputedStyle(p).overflowY))) p = p.parentElement;
    p?.scrollBy({ top: over });
  }, [ctx]);
  return { ref, panel, follow };
}

// Closing an AI panel folds it away (height and fade) instead of cutting it off, so a page scrolled to the bottom
// glides back up with it rather than jumping. `close(then)` runs the fold, then `then` (which hides the panel).
function useFold() {
  const [h, setH] = useState(0), [closing, setClosing] = useState(false);
  const [anim] = useState(() => new Animated.Value(1));
  const close = (then: () => void) => {
    setClosing(true);
    Animated.timing(anim, { toValue: 0, duration: 520, easing: Easing.inOut(Easing.quad), useNativeDriver: false })
      .start(() => { then(); setClosing(false); anim.setValue(1); });
  };
  const style = closing ? { height: anim.interpolate({ inputRange: [0, 1], outputRange: [0, h] }), opacity: anim, overflow: 'hidden' as const } : undefined;
  const onLayout = (e: { nativeEvent: { layout: { height: number } } }) => { if (!closing) setH(e.nativeEvent.layout.height); };
  return { close, closing, style, onLayout };
}

// Lessons already fetched while the app is open (the server also keeps them, so a new visit costs no AI call).
const lessonCache = new Map<string, string>();

function AiTips({ q, a, at, lang }: { q: Question; a?: number[]; at?: number; lang: 'da' | 'en' }) {
  const c = useColors();
  const key = `${q.id}:${a ? a.join('') : ''}:${lang}`;
  const [shown, setShown] = useState(false);
  const [text, setText] = useState<string | null>(() => lessonCache.get(key) ?? null);
  const [typing, setTyping] = useState(false); // fetched just now: typed out
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [err, setErr] = useState('');
  const { locked } = useApp();
  const load = () => {
    setState('loading');
    api<{ text: string }>('POST', 'lesson', { qid: q.id, a, lang, at })
      .then(d => { lessonCache.set(key, d.text); setTyping(true); setText(d.text); setState('idle'); })
      .catch((e: any) => { setErr(e.status === 429 ? e.message : 'نکات الان آماده نشد؛ دوباره امتحان کنید.'); setState('error'); });
  };
  const fold = useFold();
  const press = () => {
    if (state === 'loading') return;
    // Without premium where it is needed: the premium page instead.
    if (locked && !text) { router.push('/premium'); return; }
    if (!shown && !text) load();
    if (fold.closing) return;
    const next = !shown || (!text && state === 'error');
    if (shown) setTyping(false); // typed once: shown whole when opened again
    if (shown && !next) fold.close(() => setShown(false));
    else setShown(next);
  };
  const { ref, panel, follow } = useReveal(shown);
  return (
    <View ref={ref} style={{ marginTop: 14 }}>
      <AiButton title="تحلیل پاسخ شما" sub={locked && !text ? 'مخصوص نسخه‌ی ویژه' : 'با استفاده از هوش مصنوعی'} shown={shown} onPress={press} />
      {shown ? (
        <Animated.View style={fold.style}><View onLayout={fold.onLayout} style={{ paddingTop: 8 }}>
        <View ref={panel} style={{ paddingVertical: 16, paddingHorizontal: 18, borderRadius: 18, backgroundColor: c.note }}>
          {state === 'loading' ? <AiLoading text="در حال آماده‌سازی نکات این سؤال بر اساس پاسخ شما" />
            : state === 'error' ? <T style={{ color: c.muted, fontSize: 14 }}>{err}</T>
            : text ? <Rich text={text} typing={typing} onGrow={follow} /> : null}
        </View>
        </View></Animated.View>
      ) : null}
    </View>
  );
}

// One statement of a reviewed question in the list's bordered box (the step-by-step review uses OptionBox).
// A wrong tick or a missing one is shown in red.
function Statement({ mark, children }: { mark: boolean; children: React.ReactNode }) {
  const c = useColors();
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
  const c = useColors(), dark = useIsDark(), seg = useArcSeg();
  const { bank, aiLessons, saved, toggleSaved } = useApp();
  const pic = useQuestionImage();
  const [open, setOpen] = useState(!!(alwaysOpen || startOpen));
  const [fa, setFa] = useState(faStart);
  const [view, setView] = useState<'mine' | 'right'>(it.a ? 'mine' : 'right');
  const isSaved = saved.some(x => x.id === q.id);
  const t = bank?.topics[q.c];
  const ui = UI[lang];
  const on = open || alwaysOpen;
  // Step-by-step review is laid out like the exam itself: the picture across the whole width, the page's own
  // background, the question in the exam's size and the statements as outlined boxes with a round check. The list
  // keeps its cards.
  const flat = !!alwaysOpen;
  return (
    <View style={flat ? { gap: 4 } : { backgroundColor: c.surface, borderRadius: 10, borderWidth: 1, borderColor: c.cardBorder, overflow: 'hidden',
      shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 1 }}>
      {/* Head: picture, badges, question */}
      <Pressable disabled={alwaysOpen} onPress={() => setOpen(!open)} style={{ padding: flat ? 0 : 12, gap: flat ? 12 : 10 }}>
        <View style={flat ? { borderRadius: radius.btn, overflow: 'hidden' } : null}>
          <ZoomableImage source={imgSource(pic(q))} style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: flat ? radius.btn : 6, backgroundColor: c.surface2 }} />
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
        {/* One line: a long category name is cut with «…» so the translation switch stays beside it. */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {badge ? (
            <View style={{ flexShrink: 0, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 99, backgroundColor: badge.bg }}>
              <T style={{ fontSize: 12.5, lineHeight: 20, fontWeight: '700', color: badge.fg }}>{badge.text}</T>
            </View>
          ) : null}
          {/* The question's category (official section) */}
          {bank && sectionFa(bank, q.c) ? (
            <View style={{ flexShrink: 1, minWidth: 0, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 99, backgroundColor: c.accentSoft }}>
              <T style={{ fontSize: 12.5, lineHeight: 20, fontWeight: '600', color: c.link }} numberOfLines={1} ellipsizeMode="tail">{sectionFa(bank, q.c)}</T>
            </View>
          ) : null}
          <View style={{ flex: 1, minWidth: 4 }} />
          {/* Read aloud and the translation switch at the row's left end, the same round buttons as in the exam. */}
          <SpeakButton key={q.id} qid={q.id} lang={lang} />
          <TranslateButton on={fa} onPress={() => setFa(!fa)} />
        </View>
        <View style={{ gap: 8 }}>
          <L style={flat ? { fontSize: 18, lineHeight: 25, fontWeight: '600' } : { fontSize: 16, lineHeight: 24, fontWeight: '600' }}>{lang === 'en' && q.sen ? q.sen : q.sda}</L>
          {fa && transText(lang, { fa: q.sfa, en: q.sen, da: q.sda }) ? (
            // The Persian translation on the theme's soft grey (on the card colour in the step-by-step review, whose page is grey), no side line.
            <View style={{ paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, backgroundColor: flat ? c.surface : c.surface2 }}>
              <T style={{ fontSize: 14.5, lineHeight: 25 }}>{transText(lang, { fa: q.sfa, en: q.sen, da: q.sda })}</T>
            </View>
          ) : null}
        </View>
      </Pressable>
      {/* Body: your answer / the right answer, explanations, tips */}
      {on ? (
        <View style={flat ? { marginTop: 8 } : { marginHorizontal: 12, marginBottom: 12, padding: 12, backgroundColor: c.bg, borderWidth: 1, borderColor: c.line, borderRadius: 12 }}>
          {it.a ? (
            <View style={[{ flexDirection: 'row', gap: 3, padding: 3, marginTop: 2, marginBottom: 14, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, borderRadius: radius.btn },
              ARC && { ...seg.track, borderWidth: 0 }]}>
              {(['mine', 'right'] as const).map(v => {
                const sel = view === v;
                return (
                  <Pressable key={v} onPress={() => { tap(); setView(v); }} style={{ flex: 1 }} accessibilityRole="tab" accessibilityState={{ selected: sel }}>
                    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 8, borderRadius: radius.btn - 3, backgroundColor: sel ? c.strong : 'transparent' }, ARC && seg.pill(sel)]}>
                      {ARC ? <SegPill on={sel} /> : null}
                      {/* arc: the dot keeps its status colour on the raised pill, no ring */}
                      {v === 'mine' ? <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: it.ok ? c.ok : c.bad, ...(sel && !ARC ? { borderWidth: 1.5, borderColor: c.strongFg, width: 10, height: 10, borderRadius: 5 } : {}) }} /> : null}
                      <T style={[{ fontSize: 14, fontWeight: '600', color: sel ? c.strongFg : c.muted, textAlign: 'center' }, ARC && seg.label(sel)]}>{v === 'mine' ? 'پاسخ شما' : 'پاسخ صحیح'}</T>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ) : <T style={{ fontWeight: '700', color: c.ok, marginTop: 4, marginBottom: 12 }}>پاسخ صحیح</T>}
          <View style={{ gap: flat ? 10 : 6, marginBottom: 12 }}>
            <OptionList flat={flat}>
            {q.st.map((s, k) => {
              const me = !!(it.a && it.a[k]);
              const mark = view === 'mine' && it.a && (me ? !s.ok : !!s.ok); // a wrong tick or a missing one
              const checked = view === 'mine' ? me : !!s.ok;
              const eda = (lang === 'en' ? s.een || s.eda : s.eda || '').trim() || (s.ok ? ui.yes : ui.no);
              const efa = (transText(lang, { fa: s.efa, en: s.een, da: s.eda }) || '').trim() || tr(s.ok ? 'بله.' : 'خیر.');
              const sfa = transText(lang, s);
              const expl = view === 'right' ? (
                <View>
                  <L style={{ marginTop: ARC ? 0 : 6, fontSize: 14.5, lineHeight: 23 }}>{ui.expl} <L style={{ fontStyle: 'italic', fontSize: 14.5, lineHeight: 23 }}>{eda}</L></L>
                  {fa && sfa ? <T style={{ marginTop: 4, fontSize: 14, color: c.muted }}>{fmt('توضیح: {0}', efa)}</T> : null}
                </View>
              ) : null;
              return (
                flat ? (
                  <Enter key={k}><OptionBox on={checked} mark={!!mark} review n={k} extra={ARC ? expl : undefined}>
                    <L style={{ fontSize: 15, lineHeight: 22 }}>{lang === 'en' && s.en ? s.en : s.da}</L>
                    {fa && sfa ? <T style={{ color: c.muted, fontSize: 14, lineHeight: 22 }}>{sfa}</T> : null}
                    {ARC ? null : expl}
                  </OptionBox></Enter>
                ) : (
                <Enter key={k}><Statement mark={!!mark}>
                  <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start', direction: 'ltr' } as any}>
                    <View style={{ width: 22, height: 22, marginTop: 1, borderRadius: 6, borderWidth: 2, alignItems: 'center', justifyContent: 'center',
                      borderColor: checked ? c.pick : c.muted, backgroundColor: checked ? c.pick : c.surface }}>
                      {checked ? <Icon name="check" size={13} color={c.surface} weight="bold" /> : null}
                    </View>
                    <View style={{ flex: 1, gap: 4 }}>
                      <L style={{ fontSize: 14.5, lineHeight: 22 }}>{lang === 'en' && s.en ? s.en : s.da}</L>
                      {fa && sfa ? <T style={{ color: c.muted, fontSize: 14, lineHeight: 22 }}>{sfa}</T> : null}
                    </View>
                  </View>
                  {view === 'right' ? (
                    <View style={physical({ paddingLeft: 32 })}>
                      <L style={{ marginTop: 10, fontSize: 15, lineHeight: 24 }}>{ui.expl} <L style={{ fontStyle: 'italic', fontSize: 15, lineHeight: 24 }}>{eda}</L></L>
                      {fa && sfa ? <T style={{ marginTop: 4, fontSize: 14, color: c.muted }}>{fmt('توضیح: {0}', efa)}</T> : null}
                    </View>
                  ) : null}
                </Statement></Enter>
                )
              );
            })}
            </OptionList>
          </View>
          {aiLessons ? <AiTips q={q} a={it.a} at={at} lang={lang} />
            : t ? (
              <View style={{ marginTop: 14, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12, backgroundColor: c.surface2 }}>
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
          <T style={{ fontSize: 13, fontWeight: '600', color: on ? c.muted : c.text }}>جزئیات و توضیحات</T>
          <View style={{ transform: [{ rotate: on ? '180deg' : '0deg' }] }}><Icon name="chevronDown" size={18} color={on ? c.muted : c.text} /></View>
        </Pressable>
      ) : null}
    </View>
  );
}

// The always-open review's statements sit in one card on the main site; the folding list keeps its own boxes.
function OptionList({ flat, children }: { flat: boolean; children: React.ReactNode }) {
  return flat ? <OptionGroup>{children}</OptionGroup> : <>{children}</>;
}
