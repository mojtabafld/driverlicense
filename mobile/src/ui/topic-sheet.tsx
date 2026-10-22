// A reviewed question's topic, from its category chip under the picture (ui/review.tsx; Mojtaba 2026-10-20): a sheet
// from the bottom with the topic's official section and name, a few points on the topic written by AI for this question
// (each with its coloured icon, a few words each), and a button to the topic's own lesson (no search;
// Mojtaba 2026-10-21). It closes with a drag down (or a tap outside,
// the back button), as the app's other sheets.
import { router, type Href } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Easing, View } from 'react-native';

import { api } from '@/lib/api';
import type { Question } from '@/lib/bank';
import { sectionFa, sectionIcon, topicName } from '@/lib/names';
import { UI_LANG, tr } from '@/lib/i18n';
import STRINGS from '@/lib/i18n/strings.json';
import { useApp, useExamLang } from '@/lib/store';
import { Icon, type IconName } from './icon';
import { ArcButton, T } from './kit';
import { Sheet, SheetScroll } from './sheet';
import { DA_FONT, useColors } from './theme';

// The points' kinds as the server writes them (lesson.js getTopic), each with its icon, colour and label.
type Kind = 'look' | 'rule' | 'warn' | 'tip';
type Point = { kind: Kind; text: string };
const KIND: Record<Kind, { icon: IconName; label: string }> = {
  look: { icon: 'eye', label: 'در این سؤال' },
  rule: { icon: 'rules', label: 'قانون' },
  warn: { icon: 'warning', label: 'اشتباه رایج' },
  tip: { icon: 'bulbCircle', label: 'نکته' },
};
const parse = (text: string): Point[] => text.split('\n').map(l => /^\s*(?:[-•]\s*)?\[(look|rule|warn|tip)\]\s*(.+)$/.exec(l))
  .filter((m): m is RegExpExecArray => !!m).map(m => ({ kind: m[1] as Kind, text: m[2].trim() }));
// The course lesson (app/course-lesson.tsx) that teaches each official topic, for the sheet's «رفتن به آموزش» (Mojtaba
// 2026-10-21); the road signs' topic opens the signs, the licence's rules the rules.
const LEARN: Record<string, Href> = {
  '1.2': lesson('car-check'), '3.2': lesson('distance'), '4.4': lesson('alcohol'), '4.5': lesson('vulnerable'),
  '5.1': lesson('markings'), '5.2': lesson('weather'), '6.1': '/signs', '6.2': lesson('distance'),
  '7.1': lesson('parking'), '7.2': lesson('lane-position'), '7.3': lesson('speed'), '7.4': lesson('lanes'),
  '7.5': lesson('parking'), '7.6': lesson('crossing'), '7.7': lesson('lane-position'), '7.8': lesson('distance'),
  '7.9': lesson('overtaking'), '7.10': lesson('speed'), '7.11': lesson('right-rule'), '7.12': lesson('right-rule'),
  '7.13': lesson('turns'), '7.14': lesson('turns'), '7.15': lesson('roundabout'), '7.16': lesson('motorway'),
  '7.17': lesson('lanes'), '7.18': lesson('parking'), '7.19': lesson('darkness'), '7.20': lesson('darkness'),
  '8.1': lesson('alcohol'), '10.3': '/rules',
};
function lesson(id: string): Href { return { pathname: '/course-lesson', params: { id } }; }

// Points already fetched while the app is open (the server keeps them too, so they are written once per question).
const cache = new Map<string, Point[]>();

// A line with its **bold** parts, as written (not translated, and its Danish terms kept as the AI wrote them).
function Bold({ text, color }: { text: string; color: string }) {
  return (
    <T raw keepDa style={{ flex: 1, fontSize: 14.5, lineHeight: 24 }}>
      {text.split(/(\*\*.+?\*\*)/g).map((p, i) => (/^\*\*.+\*\*$/.test(p) ? <T raw keepDa key={i} style={{ fontWeight: '800', color }}>{p.slice(2, -2)}</T> : p))}
    </T>
  );
}

function PointCard({ p }: { p: Point }) {
  const c = useColors();
  const k = KIND[p.kind];
  // «اشتباه رایج» and «نکته» on their own colour's soft background, with the icon on a plain tile there (Mojtaba
  // 2026-10-20); the others on the sheet's grey with the icon on the theme's soft colour.
  const tint = p.kind === 'warn' ? c.warnSoft : p.kind === 'tip' ? c.okSoft : null;
  const fg = p.kind === 'warn' ? c.warn : p.kind === 'tip' ? c.ok : c.link;
  return (
    <View style={{ flexDirection: 'row', gap: 12, padding: 12, borderRadius: 14, backgroundColor: tint ?? c.surface2 }}>
      <View style={{ width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: tint ? c.surface : c.accentSoft }}>
        <Icon name={k.icon} size={18} color={fg} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <T style={{ fontSize: 12, fontWeight: '700', color: fg }}>{k.label}</T>
        <Bold text={p.text} color={c.text} />
      </View>
    </View>
  );
}

// Shimmering placeholder cards while the AI writes.
function Loading() {
  const c = useColors();
  const [pulse] = useState(() => new Animated.Value(0.5));
  useEffect(() => {
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0.5, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ]));
    loop.start(); return () => loop.stop();
  }, [pulse]);
  return (
    <Animated.View style={{ opacity: pulse, gap: 10 }} accessibilityRole="progressbar">
      {[88, 72].map(w => (
        <View key={w} style={{ flexDirection: 'row', gap: 12, padding: 12, borderRadius: 14, backgroundColor: c.surface2 }}>
          <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: c.line }} />
          <View style={{ flex: 1, gap: 8, paddingTop: 4 }}>
            <View style={{ height: 9, width: '30%', borderRadius: 99, backgroundColor: c.line }} />
            <View style={{ height: 9, width: `${w}%`, borderRadius: 99, backgroundColor: c.line }} />
          </View>
        </View>
      ))}
    </Animated.View>
  );
}

export function TopicSheet({ q, open, onClose }: { q: Question; open: boolean; onClose: () => void }) {
  const c = useColors();
  const { bank, aiLessons, locked } = useApp();
  const exam = useExamLang();
  // The points written by AI for this question (Mojtaba 2026-10-20), when the server has them for this account;
  // else, and while they fail, the topic's fixed points as rules.
  const ai = aiLessons && !locked;
  const key = `${q.id}:${exam}:${UI_LANG}`;
  const [points, setPoints] = useState<Point[] | null>(() => cache.get(key) ?? null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!open || !ai || points || failed) return;
    let live = true;
    api<{ text: string }>('POST', 'topic', { qid: q.id, lang: exam, ui: UI_LANG })
      .then(d => { const p = parse(d.text); if (!live) return; if (p.length) { cache.set(key, p); setPoints(p); } else setFailed(true); })
      .catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [open, ai, points, failed, q.id, exam, key]);
  const t = bank?.topics[q.c];
  if (!bank || !t) return null;
  const name = topicName(bank, q.c), section = sectionFa(bank, q.c);
  const second = UI_LANG === exam ? null : exam === 'en' ? (STRINGS as Record<string, string[]>)[name]?.[0] ?? null : t.da;
  const learn = LEARN[q.c];
  const toLearn = () => { if (!learn) return; onClose(); router.push(learn); };
  // Without the AI: the topic's first two fixed points only, kept short as the AI's (Mojtaba 2026-10-21), in the app's
  // language (strings.json has them in English and Danish; the AI's points come written in it already; Mojtaba 2026-10-22).
  const fixed: Point[] = t.lesson.slice(0, 2).map(l => ({ kind: 'rule', text: tr(l) }));
  const shown = points ?? (ai && !failed ? null : fixed);
  return (
    <Sheet open={open} onClose={onClose} maxHeight="82%">
      <View style={{ gap: 4, paddingHorizontal: 4 }}>
        {section ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Icon name={sectionIcon(q.c)} size={14} color={c.link} />
            <T style={{ fontSize: 12.5, fontWeight: '600', color: c.link }} numberOfLines={1}>{section}</T>
          </View>
        ) : null}
        {/* The topic's name, then after a dash its name in the exam's language: the official Danish one, or the English
            one with an English exam; none when the app is in that language already (Mojtaba 2026-10-20). */}
        <T style={{ fontSize: 19, lineHeight: 28, fontWeight: '700' }}>{name}{second ? <T raw style={{ fontSize: 14, fontWeight: '500', color: c.muted, fontFamily: DA_FONT }}>{` - ${second}`}</T> : null}</T>
      </View>
      {/* Close under the name (the sheet keeps 14 between its parts): 10 points in all (Mojtaba 2026-10-20). */}
      <SheetScroll style={{ marginTop: -8 }} contentContainerStyle={{ gap: 10, paddingTop: 4, paddingBottom: 12, paddingHorizontal: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <T style={{ flex: 1, fontSize: 14, fontWeight: '700', color: c.muted }}>آموزش این مبحث</T>
          {points ? <><Icon name="sparkles" size={13} color={c.faint} /><T style={{ fontSize: 11.5, color: c.faint }}>با هوش مصنوعی</T></> : null}
        </View>
        {shown ? shown.map((p, i) => <PointCard key={i} p={p} />) : <Loading />}
      </SheetScroll>
      <View style={{ gap: 8, paddingTop: 4 }}>
        {learn ? <ArcButton label="رفتن به آموزش" icon="learn" onPress={toLearn} /> : null}
      </View>
    </Sheet>
  );
}
