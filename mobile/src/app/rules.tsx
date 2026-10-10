// «قوانین»: the traffic rules most asked about in the theory test (src/lib/guide.ts), under a header like the tabs'
// with its own vector drawing (RulesArt). Three parts, so the page is a study tool and not just text:
// - «مرور قوانین» (Overview): how many parts have been read (kept on the device), the next one to read, and one practice
//   exam over all the rules' topics;
// - «عددهای مهم آزمون» (Numbers): the numbers the test asks most, at a glance; a tap opens the part that explains one;
// - «قانون‌ها»: each part a card with its drawing, title and size; one opens at a time, with its signs, its points
//   numbered (numbers in bold), «حواستان باشد», a practice exam of exactly its questions and the way on to the next part.
// ?open=<index> opens that part (from «جستجو با هوش مصنوعی»).
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, View, type ScrollView } from 'react-native';

import { RULES, RULE_NUMBERS, type GuidePart } from '@/lib/guide';
import { FULL, faNum, shuffle } from '@/lib/logic';
import { loadRulesRead, saveRulesRead } from '@/lib/prefs';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { TrapBox } from '@/ui/course-parts';
import { RulesArt } from '@/ui/header-art';
import { Icon, type IconName } from '@/ui/icon';
import { Card, Enter, T, tap } from '@/ui/kit';
import { RoadSign, SIGN_NAME } from '@/ui/road-signs';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

const LAW = 'خلاصه‌ای برای آمادگی آزمون تئوری؛ متن کامل قوانین در قانون راهنمایی و رانندگی دانمارک (Færdselsloven) است.';

// A practice exam of these questions.
function startPractice(ids: number[], title: string) { tap(); session.plan = { mode: 'sections', ids, title }; router.push('/run'); }

// A number in the text with its unit («۵۰ کیلومتر در ساعت», «۰٫۵ در هزار», «۳ سال»), drawn in bold.
const NUM = /([۰-۹0-9][۰-۹0-9٬٫,.]*(?:\s?(?:کیلومتر در ساعت|کیلومتر|سانتی‌متر|میلی‌متر|متری|متر|کیلوگرم|سال|در هزار|برابر))?)/;
function Bold({ text, size }: { text: string; size: number }) {
  const c = useColors();
  return (
    <T style={{ flex: 1, fontSize: size, lineHeight: size * 1.72 }}>
      {text.split(NUM).map((s, k) => (k % 2 ? <T key={k} style={{ fontSize: size, lineHeight: size * 1.72, fontWeight: '800', color: c.text }}>{s}</T> : s))}
    </T>
  );
}

// A small round icon over a pill button, like the course's tasks.
function Task({ icon, label, title, action, onPress, main }: { icon: IconName; label: string; title: string; action: string; onPress: () => void; main?: boolean }) {
  const c = useColors();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, opacity: pressed ? 0.8 : 1 })}>
      <View style={{ width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: main ? c.btn : c.accentSoft }}>
        <Icon name={icon} size={19} color={main ? c.btnFg : c.link} />
      </View>
      <View style={{ flex: 1, gap: 1 }}>
        <T style={{ color: c.muted, fontSize: 12 }}>{label}</T>
        <T numberOfLines={1} style={{ fontWeight: '700', fontSize: 15 }}>{title}</T>
      </View>
      <View style={{ paddingHorizontal: 14, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: main ? c.btn : c.surface2 }}>
        <T style={{ fontWeight: '700', fontSize: 13.5, color: main ? c.btnFg : c.text }}>{action}</T>
      </View>
    </Pressable>
  );
}

function Overview({ read, all, next, onNext }: { read: number; all: number[]; next: number | null; onNext: () => void }) {
  const c = useColors();
  const share = RULES.length ? read / RULES.length : 0;
  return (
    <Card style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
          <T style={{ flex: 1, fontWeight: '800', fontSize: 18 }}>مرور قوانین</T>
          <T style={{ color: c.muted, fontSize: 12.5 }}>{faNum(read)} از {faNum(RULES.length)} بخش خوانده‌شده</T>
        </View>
        <View style={{ height: 8, borderRadius: 4, backgroundColor: c.surface2, overflow: 'hidden' }}>
          <View style={{ width: `${Math.max(share * 100, share ? 4 : 0)}%`, height: '100%', borderRadius: 4, backgroundColor: c.ok }} />
        </View>
      </View>
      {next !== null ? (
        <Task icon={RULES[next].icon ?? 'rules'} main label={read ? 'بخش بعدی برای خواندن' : 'از اینجا شروع کنید'} title={RULES[next].title} action="خواندن" onPress={onNext} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Icon name="checkCircle" size={22} color={c.ok} />
          <T style={{ flex: 1, color: c.ok, fontWeight: '700', fontSize: 14 }}>همه‌ی بخش‌ها را خوانده‌اید؛ حالا با آزمون همه‌ی قوانین خودتان را بسنجید.</T>
        </View>
      )}
      {all.length ? (
        <>
          <View style={{ height: 1, backgroundColor: c.line }} />
          <Task icon="play" main={next === null} label={`${faNum(Math.min(all.length, FULL))} سؤال از همه‌ی بخش‌ها`} title="آزمون همه‌ی قوانین" action="شروع"
            onPress={() => startPractice(shuffle(all).slice(0, FULL), 'آزمون همه‌ی قوانین')} />
        </>
      ) : null}
    </Card>
  );
}

// «عددهای مهم آزمون»: two columns of number tiles; a tap opens the part that explains the number.
function Numbers({ onOpen }: { onOpen: (i: number) => void }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {RULE_NUMBERS.map(x => (
        <Pressable key={x.label} onPress={() => { tap(); onOpen(x.rule); }} accessibilityRole="button" accessibilityLabel={`${x.value} ${x.unit}، ${x.label}`}
          style={({ pressed }) => ({ flexBasis: '45%', flexGrow: 1, flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 16,
            backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}>
          <View style={{ minWidth: 52, alignItems: 'center' }}>
            <T style={{ fontSize: 20, lineHeight: 28, fontWeight: '800', textAlign: 'center' }}>{x.value}</T>
            {x.unit ? <T style={{ fontSize: 11, lineHeight: 14, color: c.muted, fontWeight: '700', textAlign: 'center', writingDirection: 'ltr' }}>{x.unit}</T> : null}
          </View>
          <T style={{ flex: 1, fontSize: 12.5, lineHeight: 19, color: c.muted }} numberOfLines={2}>{x.label}</T>
        </Pressable>
      ))}
    </View>
  );
}

// One rule: its card closed (drawing, title, size, read or not), or open with everything in it.
function RulePart({ p, on, read, n, onToggle, onPractise, onNext }: { p: GuidePart; on: boolean; read: boolean; n: number; onToggle: () => void;
  onPractise: () => void; onNext: (() => void) | null }) {
  const c = useColors();
  return (
    <Card style={{ gap: 14, paddingVertical: 12, borderColor: on ? c.text : undefined }}>
      <Pressable onPress={onToggle} accessibilityRole="button" accessibilityState={{ expanded: on }} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: on ? c.btn : c.surface2 }}>
          <Icon name={p.icon ?? 'rules'} size={22} color={on ? c.btnFg : c.text} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <T style={{ fontWeight: '700', fontSize: 16 }}>{p.title}</T>
          <T style={{ fontSize: 12, color: read ? c.ok : c.muted, fontWeight: read ? '700' : '400' }}>
            {read ? 'خوانده‌شده · ' : ''}{faNum(p.points.length)} نکته{n ? `، ${faNum(n)} سؤال تمرینی` : ''}
          </T>
        </View>
        {read && !on ? (
          <View style={{ width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: c.ok }}>
            <Icon name="check" size={13} color="#fff" weight="bold" />
          </View>
        ) : (
          <View style={{ transform: [{ rotate: on ? '180deg' : '0deg' }] }}><Icon name="chevronDown" size={18} color={c.muted} /></View>
        )}
      </Pressable>
      {on ? (
        <View style={{ gap: 14 }}>
          {p.intro ? (
            <View style={{ padding: 12, borderRadius: 14, backgroundColor: c.accentSoft }}>
              <T style={{ fontSize: 14.5, lineHeight: 24, fontWeight: '700' }}>{p.intro}</T>
            </View>
          ) : null}
          {p.signs?.length ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', paddingVertical: 4, borderRadius: 14, backgroundColor: c.surface2 }}>
              {p.signs.map(s => (
                <View key={s} style={{ width: 80, alignItems: 'center', gap: 6, paddingVertical: 8 }}>
                  <RoadSign kind={s} size={54} />
                  <T style={{ fontSize: 11.5, lineHeight: 17, color: c.muted, textAlign: 'center' }}>{SIGN_NAME[s]}</T>
                </View>
              ))}
            </View>
          ) : null}
          <View style={{ gap: 10 }}>
            {p.points.map((t, k) => (
              <View key={k} style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ width: 24, height: 24, borderRadius: 12, marginTop: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
                  <T style={{ fontSize: 12, fontWeight: '700', color: c.muted, textAlign: 'center' }}>{faNum(k + 1)}</T>
                </View>
                <Bold text={t} size={14.5} />
              </View>
            ))}
          </View>
          {p.tip ? <TrapBox text={p.tip} /> : null}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {n ? (
              <Pressable onPress={onPractise} accessibilityRole="button"
                style={({ pressed }) => ({ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, height: 46, borderRadius: 23, backgroundColor: c.btn, opacity: pressed ? 0.85 : 1 })}>
                <Icon name="play" size={15} color={c.btnFg} weight="bold" />
                <T style={{ color: c.btnFg, fontWeight: '700', fontSize: 14 }}>تمرین این بخش ({faNum(Math.min(n, FULL))} سؤال)</T>
              </Pressable>
            ) : null}
            {onNext ? (
              <Pressable onPress={onNext} accessibilityRole="button" accessibilityLabel="بخش بعدی"
                style={({ pressed }) => ({ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, height: 46, borderRadius: 23, backgroundColor: c.surface2, opacity: pressed ? 0.85 : 1 })}>
                <T style={{ fontWeight: '700', fontSize: 14 }}>بعدی</T>
                <Icon name="chevronLeft" size={15} color={c.text} />
              </Pressable>
            ) : null}
          </View>
        </View>
      ) : null}
    </Card>
  );
}

export default function Rules() {
  const c = useColors();
  const { bank } = useApp();
  const p = useLocalSearchParams<{ open?: string }>();
  const first = p.open !== undefined && Number.isInteger(+p.open) ? Math.min(Math.max(0, +p.open), RULES.length - 1) : null;
  const [open, setOpen] = useState<number | null>(first);
  const [read, setRead] = useState<string[]>([]);
  // Opening a part marks it read (the one opened by ?open= too).
  const markRead = useCallback((i: number) => {
    const t = RULES[i].title;
    setRead(r => { if (r.includes(t)) return r; const next = [...r, t]; saveRulesRead(next); return next; });
  }, []);
  useEffect(() => { loadRulesRead().then(r => { setRead(r); if (first !== null) markRead(first); }); }, [first, markRead]);

  // Scrolling to the part just opened: where the content starts under the header, the list in it, and each card in the list.
  const scroll = useRef<ScrollView>(null);
  const at = useRef({ body: 0, list: 0, cards: [] as number[], go: first as number | null });
  const show = useCallback((i: number | null) => {
    tap(); setOpen(i);
    if (i !== null) markRead(i);
    at.current.go = i;
  }, [markRead]);
  useEffect(() => {
    const i = at.current.go;
    if (i === null) return;
    // After the part above it has closed and the cards have their new places.
    const t = setTimeout(() => {
      const y = at.current.body + at.current.list + (at.current.cards[i] ?? 0) - 64;
      scroll.current?.scrollTo({ y: Math.max(0, y), animated: true });
      at.current.go = null;
    }, 80);
    return () => clearTimeout(t);
  }, [open]);

  if (!bank) return null;
  const idsOf = (x: GuidePart) => bank.questions.filter(q => x.topics?.includes(q.c)).map(q => q.id);
  const topics = new Set(RULES.flatMap(x => x.topics ?? []));
  const allIds = bank.questions.filter(q => topics.has(q.c)).map(q => q.id);
  const nextUnread = RULES.findIndex(x => !read.includes(x.title));
  return (
    <SubPage title="قوانین" subtitle="به زبان ساده، با تمرین هر بخش" hero={{ pic: 0, icon: 'rules', art: RulesArt }} scrollRef={scroll} onBodyY={y => { at.current.body = y; }}>
      <Enter><Overview read={RULES.filter(x => read.includes(x.title)).length} all={allIds} next={nextUnread >= 0 ? nextUnread : null}
        onNext={() => nextUnread >= 0 && show(nextUnread)} /></Enter>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
        <T style={{ flex: 1, fontWeight: '800', fontSize: 18 }}>عددهای مهم آزمون</T>
        <T style={{ color: c.muted, fontSize: 12 }}>برای توضیح، روی هر عدد بزنید</T>
      </View>
      <Enter><Numbers onOpen={show} /></Enter>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
        <T style={{ flex: 1, fontWeight: '800', fontSize: 18 }}>قانون‌ها</T>
        <T style={{ color: c.muted, fontSize: 12 }}>{faNum(RULES.length)} بخش</T>
      </View>
      <View style={{ gap: 10 }} onLayout={e => { at.current.list = e.nativeEvent.layout.y; }}>
        {RULES.map((x, i) => {
          const n = idsOf(x).length;
          return (
            <View key={x.title} onLayout={e => { at.current.cards[i] = e.nativeEvent.layout.y; }}>
              <RulePart p={x} on={open === i} read={read.includes(x.title)} n={n}
                onToggle={() => show(open === i ? null : i)}
                onPractise={() => startPractice(shuffle(idsOf(x)).slice(0, FULL), x.title)}
                onNext={i < RULES.length - 1 ? () => show(i + 1) : null} />
            </View>
          );
        })}
      </View>
      <T style={{ color: c.faint, fontSize: 12, lineHeight: 20, textAlign: 'center', marginTop: 6 }}>{LAW}</T>
    </SubPage>
  );
}
