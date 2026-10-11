// One group of «علائم رانندگی» or «آموزش حق تقدم», page by page: the item's picture large, its explanation under it,
// and the floating glass bar of the exams at the bottom (previous / the list with the position / next). The list opens
// a sheet with every item of the group; a tap goes to it. A sideways swipe on the picture or the text turns the page
// (to the left: the next one, as on the bar), the content following the finger. ?kind=signs|priority&cat=<group id>[&i=<index>]
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { PRIORITY_CATS, SIGN_CATS, type GuideKind, type Scenario, type SignItem } from '@/lib/guide-data';
import { faNum } from '@/lib/logic';
import { useApp, useExamLang } from '@/lib/store';
import { PROVE_PICS } from '@/lib/config';
import SIGN_EN from '@/lib/guide-en.json';
import { FootBtn, GlassBar, navIcons } from '@/ui/glass-bar';
import { GuideImage, prefetchGuide, Rich } from '@/ui/guide-visual';
import { Icon } from '@/ui/icon';
import { Backdrop, Card, Enter, L, T, ThemeButton, tap, usePageMotion, headBtn } from '@/ui/kit';
import { GlassTop } from '@/ui/liquid';
import { Marquee } from '@/ui/marquee';
import { ListButton } from '@/ui/question-list';
import { Sheet, SheetScroll } from '@/ui/sheet';
import { learnRtl, swipeWebStyle, usePager } from '@/ui/swipe';
import { radius, useColors, ROSE } from '@/ui/theme';

// The cards of the page (the group's rules, the explanation): one look.
const BOX = { paddingVertical: 14, paddingHorizontal: 16 };

type Item = SignItem | Scenario;
const isSign = (x: Item): x is SignItem => 'code' in x;
const label = (x: Item) => (isSign(x) ? x.fa : x.title);

export default function GuideView() {
  const c = useColors(), ins = useSafeAreaInsets();
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
  const swipe = usePager(i, items.length, setI, learnRtl);
  // The next two pages' pictures and the previous one's are loaded ahead.
  const { guideArt } = useApp();
  useEffect(() => { prefetchGuide([i + 1, i + 2, i - 1].filter(j => j >= 0 && j < items.length).map(j => items[j].key), guideArt); }, [i, items, guideArt]);

  const it = items[i], last = i === items.length - 1;
  const back = () => motion.leave(() => (router.canGoBack() ? router.back() : router.replace('/')));
  const drill = kind === 'priority' && cat.id.startsWith('drill');
  return (
    <Backdrop anim={motion.style}>
      <GlassTop onHeight={setHeadH}>
        <SafeAreaView edges={['top']} style={{ paddingTop: Platform.OS === 'web' ? 14 : 8, paddingBottom: 10, paddingHorizontal: 14 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%', maxWidth: 760, alignSelf: 'center' }}>
            <Pressable onPress={() => { tap(); back(); }} hitSlop={8} accessibilityRole="button" accessibilityLabel="بستن"
              style={({ pressed }) => (ROSE ? headBtn(pressed) : { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.surface2 : c.surface, borderWidth: 1, borderColor: c.line })}>
              {/* ✕, not an arrow: the bar below has the previous / next arrows. */}
              <Icon name="xmark" size={20} color={ROSE ? c.topInk : c.text} />
            </Pressable>
            <View style={{ flex: 1, height: 26 }}>
              <Marquee text={cat.title} height={26} style={{ fontWeight: '700', fontSize: 16, lineHeight: 26, color: ROSE ? c.topInk : undefined }} />
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
        <Animated.View {...swipe.handlers} style={[swipeWebStyle, { transform: [{ translateX: swipe.dx }] }]}>
          {/* The picture and its explanation in one card, the picture flush on top (like the «آموزش» cards); both come
              in again with each page. */}
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <Enter key={`pic-${i}`}>
              <GuideImage k={it.key} aspect={4 / 3} label={isSign(it) ? it.code : undefined} flat zoom />
            </Enter>
            <View style={BOX}>
              <Enter key={`text-${i}`}>
                {isSign(it) ? <SignText item={it} /> : <ScenarioText item={it} legend={!drill} />}
              </Enter>
            </View>
          </Card>
        </Animated.View>
      </ScrollView>
      <GlassBar rtl={learnRtl}
        start={<FootBtn label="قبلی" icon={navIcons(learnRtl).prev} disabled={i === 0} onPress={() => setI(i - 1)} />}
        middle={<ListButton n={i + 1} of={items.length} label="فهرست موارد" onPress={() => setList(true)} />}
        end={last ? <FootBtn label="پایان" icon="check" submit onPress={back} /> : <FootBtn label="بعدی" icon={navIcons(learnRtl).next} onPress={() => setI(i + 1)} />} />
      <ItemSheet open={list} items={items} current={i} onClose={() => setList(false)} onPick={k => { setList(false); setI(k); }} />
    </Backdrop>
  );
}

// The sign's official name in the user's exam language: English (lib/guide-en.json) when the exam is in English.
const signName = (item: SignItem, lang: string) => (lang === 'en' && !PROVE_PICS && (SIGN_EN as Record<string, string>)[item.key]) || item.da;

// A sign: its code, Persian and Danish (or English) names, and what it means and what to do.
function SignText({ item }: { item: SignItem }) {
  const c = useColors(), lang = useExamLang();
  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 2, borderRadius: 8, backgroundColor: c.surface2 }}>
          <L style={{ fontSize: 14, fontWeight: '800', color: c.text }}>{item.code}</L>
        </View>
      </View>
      <T style={{ fontSize: 20, lineHeight: 31, fontWeight: '800' }}>{item.fa}</T>
      {/* The sign's Danish name in a box like «چه کسی اول می‌رود؟», laid out left to right: the green check on the left. */}
      <View style={{ direction: 'ltr', flexDirection: 'row', gap: 10, padding: 12, borderRadius: radius.md, backgroundColor: c.surface2, alignItems: 'flex-start' }}>
        <Icon name="checkCircle" size={20} color={c.ok} />
        <L style={{ flex: 1, fontSize: 14, lineHeight: 21, color: c.text, fontWeight: '600', textAlign: 'left' }}>{signName(item, lang)}</L>
      </View>
      <Rich text={item.text} style={{ fontSize: 15.5, lineHeight: 28 }} />
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
  const c = useColors(), ins = useSafeAreaInsets();
  return (
    <Sheet open={open} onClose={onClose} maxHeight="82%" style={{ paddingHorizontal: 14, paddingBottom: ins.bottom + 14, gap: 12 }}>
      <T style={{ fontSize: 19, lineHeight: 28, fontWeight: '700', textAlign: 'center' }}>فهرست موارد</T>
      <SheetScroll contentContainerStyle={{ gap: 6 }}>
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
      </SheetScroll>
    </Sheet>
  );
}
