// One group of «علائم رانندگی» or «آموزش حق تقدم», page by page: the item's picture large, its explanation under it,
// and the floating glass bar of the exams at the bottom (previous / the list with the position / next). The list opens
// a sheet with every item of the group; a tap goes to it. A sideways swipe on the picture or the text turns the page
// (to the left: the next one, as on the bar), the content following the finger. ?kind=signs|priority&cat=<group id>[&i=<index>]
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Modal, PanResponder, Platform, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { api } from '@/lib/api';
import { PRIORITY_CATS, SIGN_CATS, type GuideKind, type Scenario, type SignItem } from '@/lib/guide-data';
import { faNum } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { FootBtn, GlassBar } from '@/ui/glass-bar';
import { GuideImage, Rich } from '@/ui/guide-visual';
import { Icon } from '@/ui/icon';
import { Backdrop, Card, Enter, L, T, ThemeButton, tap, usePageMotion } from '@/ui/kit';
import { GlassTop } from '@/ui/liquid';
import { Marquee } from '@/ui/marquee';
import { ListButton } from '@/ui/question-list';
import { radius, useColors, useIsDark } from '@/ui/theme';

// The cards of the page (the group's rules, the explanation): one look.
const BOX = { paddingVertical: 14, paddingHorizontal: 16 };

type SignInfo = { en: string; kw: { da: string; en: string; fa: string }[] };
type Item = SignItem | Scenario;
const isSign = (x: Item): x is SignItem => 'code' in x;
const label = (x: Item) => (isSign(x) ? x.fa : x.title);

export default function GuideView() {
  const c = useColors(), ins = useSafeAreaInsets(), dark = useIsDark();
  const motion = usePageMotion('push');
  const p = useLocalSearchParams<{ kind?: string; cat?: string; i?: string }>();
  const kind: GuideKind = p.kind === 'priority' ? 'priority' : 'signs';
  const cats = kind === 'signs' ? SIGN_CATS : PRIORITY_CATS;
  const cat = (cats as { id: string }[]).find(x => x.id === p.cat) as (typeof cats)[number] | undefined ?? cats[0];
  const items = cat.items as Item[];
  const [i, setI] = useState(() => Math.min(Math.max(0, Number(p.i) || 0), items.length - 1));
  const [headH, setHeadH] = useState(0);
  const [intro, setIntro] = useState(false); // the group's general rules, folded
  const [list, setList] = useState(false);
  const scroll = useRef<ScrollView>(null);
  // Each page starts at its top.
  useEffect(() => { scroll.current?.scrollTo({ y: 0, animated: false }); }, [i]);
  const swipe = useSwipe(i, items.length, setI);
  // The sign group's keywords and English names, written by the server's Claude the first time the group is opened.
  const [info, setInfo] = useState<Record<string, SignInfo>>({});
  const [infoLoading, setInfoLoading] = useState(kind === 'signs');
  useEffect(() => {
    if (kind !== 'signs') return;
    let live = true;
    api<{ items: Record<string, SignInfo> }>('GET', `signinfo?cat=${encodeURIComponent(cat.id)}`)
      .then(r => { if (live) setInfo(r.items || {}); }).catch(() => {}).finally(() => { if (live) setInfoLoading(false); });
    return () => { live = false; };
  }, [kind, cat.id]);

  const it = items[i], last = i === items.length - 1;
  const back = () => motion.leave(() => (router.canGoBack() ? router.back() : router.replace('/')));
  const drill = kind === 'priority' && cat.id.startsWith('drill');
  return (
    <Backdrop anim={motion.style}>
      <GlassTop onHeight={setHeadH}>
        <SafeAreaView edges={['top']} style={{ paddingTop: Platform.OS === 'web' ? 14 : 8, paddingBottom: 10, paddingHorizontal: 14 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%', maxWidth: 760, alignSelf: 'center' }}>
            <Pressable onPress={() => { tap(); back(); }} hitSlop={8} accessibilityRole="button" accessibilityLabel="بازگشت"
              style={({ pressed }) => ({ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.surface2 : c.surface, borderWidth: 1, borderColor: c.line })}>
              <Icon name="arrowRight" size={20} color={c.text} />
            </Pressable>
            <View style={{ flex: 1, height: 26 }}>
              <Marquee text={cat.title} height={26} style={{ fontWeight: '700', fontSize: 16, lineHeight: 26 }} />
            </View>
            <ThemeButton />
          </View>
        </SafeAreaView>
      </GlassTop>
      <ScrollView ref={scroll} showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingTop: headH + 14, paddingBottom: ins.bottom + 100, gap: 12, maxWidth: 760, width: '100%', alignSelf: 'center' }}>
        {/* The group's general rules, the same on every page; folded until asked for. */}
        <Pressable onPress={() => { tap(); setIntro(!intro); }} accessibilityRole="button" accessibilityState={{ expanded: intro }}>
          <Card style={[BOX, { gap: 8 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Icon name="info" size={17} color={c.muted} />
              <T style={{ flex: 1, fontSize: 14, fontWeight: '700' }}>قواعد کلی این گروه</T>
              <View style={{ transform: [{ rotate: intro ? '90deg' : '-90deg' }] }}><Icon name="chevronLeft" size={14} color={c.faint} /></View>
            </View>
            {intro ? <Rich text={cat.intro} style={{ fontSize: 14, lineHeight: 24, color: c.muted }} /> : null}
          </Card>
        </Pressable>
        <Animated.View {...swipe.handlers} style={{ transform: [{ translateX: swipe.dx }] }}>
          {/* The picture and its explanation in one card, the picture flush on top (like the «آموزش» cards); both come
              in again with each page. */}
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            {/* In the light theme a white frame around the picture (its own light grey background stands out on the card). */}
            <Enter key={`pic-${i}`} style={dark ? null : { padding: 10, paddingBottom: 0 }}>
              <GuideImage k={it.key} aspect={4 / 3} label={isSign(it) ? it.code : undefined} flat={dark} radius={radius.md - 4} zoom />
            </Enter>
            <View style={BOX}>
              <Enter key={`text-${i}`}>
                {isSign(it) ? <SignText item={it} info={info[it.key]} loading={infoLoading} /> : <ScenarioText item={it} legend={!drill} />}
              </Enter>
            </View>
          </Card>
        </Animated.View>
      </ScrollView>
      <GlassBar
        start={<FootBtn label="قبلی" icon="arrowLeft" round disabled={i === 0} onPress={() => setI(i - 1)} />}
        middle={<ListButton n={i + 1} of={items.length} label="فهرست موارد" onPress={() => setList(true)} />}
        end={last ? <FootBtn label="پایان" icon="check" submit round onPress={back} /> : <FootBtn label="بعدی" icon="arrowRight" round onPress={() => setI(i + 1)} />} />
      <ItemSheet open={list} items={items} current={i} onClose={() => setList(false)} onPick={k => { setList(false); setI(k); }} />
    </Backdrop>
  );
}

// Turning the page by a sideways swipe: the content follows the finger (with resistance at the first and last page);
// past a third of the width or a quick flick it slides out, the page changes, and the new one slides in.
type SwipeNow = { i: number; n: number; width: number; setI: (k: number) => void };
function useSwipe(i: number, n: number, setI: (k: number) => void) {
  const { width } = useWindowDimensions();
  const [dx] = useState(() => new Animated.Value(0));
  // The page's current values for the gesture's handlers, kept up to date after each render.
  const [now] = useState<SwipeNow>(() => ({ i, n, width, setI }));
  useEffect(() => { Object.assign(now, { i, n, width, setI }); }, [now, i, n, width, setI]);
  const [pan] = useState(() => swipeResponder(dx, now));
  return { dx, handlers: pan.panHandlers };
}
function swipeResponder(dx: Animated.Value, now: SwipeNow) {
  const sideways = (_: unknown, g: { dx: number; dy: number }) => Math.abs(g.dx) > 14 && Math.abs(g.dx) > Math.abs(g.dy) * 1.8;
  const settle = () => Animated.spring(dx, { toValue: 0, useNativeDriver: true, bounciness: 4 }).start();
  return PanResponder.create({
    onMoveShouldSetPanResponder: sideways,
    onMoveShouldSetPanResponderCapture: sideways,
    onPanResponderMove: (_, g) => {
      const edge = (g.dx > 0 && now.i === 0) || (g.dx < 0 && now.i === now.n - 1);
      dx.setValue(edge ? g.dx / 3 : g.dx);
    },
    onPanResponderRelease: (_, g) => {
      const w = now.width;
      const dir = g.dx < -w / 3 || g.vx < -0.5 ? 1 : g.dx > w / 3 || g.vx > 0.5 ? -1 : 0;
      const to = now.i + dir;
      if (!dir || to < 0 || to >= now.n) return settle();
      tap();
      Animated.timing(dx, { toValue: -dir * w, duration: 160, easing: Easing.in(Easing.quad), useNativeDriver: true }).start(() => {
        now.setI(to);
        dx.setValue(dir * w * 0.35);
        Animated.timing(dx, { toValue: 0, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
      });
    },
    onPanResponderTerminate: settle,
  });
}

// A sign: its code, Persian and Danish names, and what it means and what to do.
function SignText({ item, info, loading }: { item: SignItem; info?: SignInfo; loading: boolean }) {
  const c = useColors();
  const { settings } = useApp();
  const en = settings.lang === 'en';
  return (
    <View style={{ gap: 10 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 2, borderRadius: 8, backgroundColor: c.surface2 }}>
          <L style={{ fontSize: 14, fontWeight: '800', color: c.text }}>{item.code}</L>
        </View>
      </View>
      <T style={{ fontSize: 20, lineHeight: 31, fontWeight: '800' }}>{item.fa}</T>
      <Rich text={item.text} style={{ fontSize: 15.5, lineHeight: 28 }} />
      {/* The sign's name in the exam's language and its key terms (written by Claude, signinfo.js), in the soft grey box
          of «چه کسی اول می‌رود؟», with its check icon. */}
      <View style={{ flexDirection: 'row', gap: 10, padding: 12, borderRadius: radius.md, backgroundColor: c.surface2, alignItems: 'flex-start' }}>
        <Icon name="checkCircle" size={20} color={c.ok} />
        <View style={{ flex: 1, gap: 8 }}>
          <View style={{ gap: 2 }}>
            <T style={{ fontSize: 12.5, color: c.muted, fontWeight: '600' }}>کلمات کلیدی</T>
            <T style={{ fontSize: 15, lineHeight: 25, fontWeight: '700' }}>{en ? info?.en ?? item.da : item.da}</T>
          </View>
          {info?.kw.length ? (
            // The terms on one line in the box's font, separated by commas: the term in the exam's language and its
            // Persian meaning after it.
            <T style={{ fontSize: 15, lineHeight: 26 }}>
              {info.kw.map((w, k) => (
                <T key={k} style={{ fontSize: 15, lineHeight: 26 }}>
                  {k ? '، ' : ''}<T style={{ fontSize: 15, lineHeight: 26, fontWeight: '700' }}>{en ? w.en : w.da}</T>
                  <T style={{ fontSize: 14, lineHeight: 26, color: c.muted }}> ({w.fa})</T>
                </T>
              ))}
            </T>
          ) : loading ? <T style={{ fontSize: 12.5, color: c.faint }}>کلمات کلیدی در حال آماده شدن…</T> : null}
        </View>
      </View>
    </View>
  );
}

// A right-of-way situation: its title, what happens, who goes first and the legal basis; with the pictures' colour code
// for the rule groups (the practice situations show each road user's own arrow instead).
function ScenarioText({ item, legend }: { item: Scenario; legend: boolean }) {
  const c = useColors();
  return (
    <View style={{ gap: 10 }}>
      <T style={{ fontSize: 20, lineHeight: 31, fontWeight: '800' }}>{item.title}</T>
      <Rich text={item.text} style={{ fontSize: 15.5, lineHeight: 28 }} />
      <View style={{ flexDirection: 'row', gap: 10, padding: 12, borderRadius: radius.md, backgroundColor: c.surface2, alignItems: 'flex-start' }}>
        <Icon name="checkCircle" size={20} color={c.ok} />
        <View style={{ flex: 1, gap: 2 }}>
          <T style={{ fontSize: 12.5, color: c.muted, fontWeight: '600' }}>چه کسی اول می‌رود؟</T>
          <T style={{ fontSize: 15, lineHeight: 25, fontWeight: '700' }}>{item.first}</T>
        </View>
      </View>
      <T style={{ fontSize: 12.5, lineHeight: 20, color: c.faint }}>مبنای قانونی: {item.law}</T>
      {legend ? <Legend /> : null}
    </View>
  );
}

// The rule pictures' colour code.
function Legend() {
  const c = useColors();
  const row = (color: string, dashed: boolean, text: string) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View style={{ width: 20, height: 11, borderRadius: 4, backgroundColor: color }} />
      <View style={{ width: 20, borderTopWidth: 3, borderStyle: dashed ? 'dashed' : 'solid', borderColor: dashed ? '#f08c00' : '#2fae4f' }} />
      <T style={{ flex: 1, fontSize: 12.5, lineHeight: 19, color: c.muted }}>{text}</T>
    </View>
  );
  return (
    <View style={{ gap: 6, paddingTop: 4 }}>
      {row('#2f6fde', false, 'خودروی آبی با فلش سبز: حق تقدم دارد و اول می‌رود.')}
      {row('#d93a3a', true, 'خودروی قرمز با فلش نارنجی بریده: باید راه بدهد.')}
    </View>
  );
}

// Every item of the group: number, small picture, code and name; the current one marked; a tap goes to it.
function ItemSheet({ open, items, current, onPick, onClose }: { open: boolean; items: Item[]; current: number; onPick: (k: number) => void; onClose: () => void }) {
  const c = useColors(), dark = useIsDark(), ins = useSafeAreaInsets();
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: dark ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.4)' }}>
        <Pressable onPress={() => {}} style={{ maxHeight: '82%', width: '100%', maxWidth: 560, alignSelf: 'center', paddingTop: 20, paddingHorizontal: 14, paddingBottom: ins.bottom + 14, gap: 12,
          borderTopLeftRadius: 26, borderTopRightRadius: 26, backgroundColor: c.surface }}>
          <T style={{ fontSize: 19, lineHeight: 28, fontWeight: '700', textAlign: 'center' }}>فهرست موارد</T>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
            {items.map((x, k) => {
              const on = k === current;
              return (
                <Pressable key={x.key} onPress={() => { tap(); onPick(k); }} accessibilityRole="button" accessibilityLabel={`${faNum(k + 1)}. ${label(x)}`} accessibilityState={{ selected: on }}
                  style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 6, paddingStart: 10, borderRadius: 14, opacity: pressed ? 0.75 : 1,
                    backgroundColor: on ? c.surface2 : 'transparent', borderWidth: 1.5, borderColor: on ? c.text : 'transparent' })}>
                  <T style={{ width: 28, fontSize: 14, fontWeight: '700', color: c.muted, textAlign: 'center' }}>{faNum(k + 1)}</T>
                  <View style={{ width: 56 }}><GuideImage k={x.key} aspect={4 / 3} radius={8} compact /></View>
                  <View style={{ flex: 1, gap: 1 }}>
                    {isSign(x) ? <L style={{ fontSize: 12, fontWeight: '700', color: c.muted }}>{x.code}</L> : null}
                    <T style={{ fontSize: 14, lineHeight: 21, fontWeight: on ? '700' : '500' }} numberOfLines={2}>{label(x)}</T>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
