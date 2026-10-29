// The home page's chart view (Mojtaba 2026-10-19): a round button beside the profile picture, in its look (the theme's
// link colour on the blush-to-lavender wash) with the plain chart icon of the statistics card (Mojtaba: minimal, as
// that one); pressed, the cards above the chart fold away and the chart glides to the top of the page, and the user's
// test statistics come in under it, then the latest tests, each opening its own page (its result and review). Pressed
// again, all goes back.
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Platform, Pressable, View } from 'react-native';

import type { Attempt } from '@/lib/bank';
import { RTL, tr } from '@/lib/i18n';
import { faNum, isFull, isPass, pctOf } from '@/lib/logic';
import { pctText } from './activity';
import { Icon, type IconName } from './icon';
import { Card, FitLine, T, tap } from './kit';
import { useColors } from './theme';

// `t`: how far the chart view is open (0 to 1); the button fills with the accent as it opens.
export function ChartButton({ size = 44, on, t, onPress }: { size?: number; on: boolean; t: Animated.Value; onPress: () => void }) {
  const c = useColors();
  const g = Math.round(size * 0.52); // the icon, about as large as the profile picture's outline beside it
  return (
    <Pressable onPress={() => { tap(); onPress(); }} hitSlop={6} accessibilityRole="button" accessibilityLabel={tr('نمودار و آمار آزمون‌ها')}
      accessibilityState={{ expanded: on }}
      style={({ pressed }) => ({ width: size, height: size, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.6 : 1, transform: [{ scale: pressed ? 0.94 : 1 }] })}>
      {/* The icon alone, no round background (Mojtaba 2026-10-29); open, a short line under it in the theme's colour. */}
      <Icon name="chart" size={g} color={c.link} />
      <Animated.View pointerEvents="none" style={{ position: 'absolute', bottom: 2, width: 16, height: 2.5, borderRadius: 2, backgroundColor: c.link, opacity: t }} />
    </Pressable>
  );
}

// Green or red for an attempt, as in the lists: a full test by the real pass rule, a shorter one at 80%.
const passed = (a: Attempt) => (isFull(a) ? isPass(a) : pctOf(a) >= 0.8);
// «۲ ساعت و ۱۵ دقیقه تمرین», «۴۰ دقیقه تمرین» (each whole, as strings.json has them).
function spent(secs: number) {
  const m = Math.max(1, Math.round(secs / 60)), h = Math.floor(m / 60);
  return h ? (m % 60 ? `${faNum(h)} ساعت و ${faNum(m % 60)} دقیقه تمرین` : `${faNum(h)} ساعت تمرین`) : `${faNum(m)} دقیقه تمرین`;
}

// «آمار آزمون‌ها»: how many tests, the average and the best score, how many passed, in one card split by thin lines (as
// home's counts), and under them how many questions were answered in how much time.
// A row of short facts (an icon and a few words each) on one line: centred when it fits, else it glides slowly to show
// its other end and back, with pauses, its edges faded (as Marquee does for a text, ui/marquee.tsx); not with
// «reduce motion».
const GAP = 16, SPEED = 32, PAUSE = 1600, FADE = 14;
function GlideRow({ height, children }: { height: number; children: React.ReactNode }) {
  const [room, setRoom] = useState(0), [full, setFull] = useState(0);
  const [x] = useState(() => new Animated.Value(0));
  const over = room && full > room + 0.5 ? Math.ceil(full - room + FADE * 2) : 0;
  useEffect(() => {
    x.setValue(0);
    if (!over) return;
    let loop: Animated.CompositeAnimation | null = null, live = true;
    AccessibilityInfo.isReduceMotionEnabled().catch(() => false).then(reduce => {
      if (!live || reduce) return;
      const glide = (to: number) => Animated.timing(x, { toValue: to, duration: (over / SPEED) * 1000, easing: Easing.inOut(Easing.quad), useNativeDriver: Platform.OS !== 'web' });
      loop = Animated.loop(Animated.sequence([Animated.delay(PAUSE), glide(RTL ? over : -over), Animated.delay(PAUSE), glide(0)]));
      loop.start();
    });
    return () => { live = false; loop?.stop(); };
  }, [over, x]);
  const row = (measure?: boolean) => (
    <View onLayout={measure ? e => setFull(e.nativeEvent.layout.width) : undefined} style={{ flexDirection: 'row', alignItems: 'center', columnGap: GAP, flexShrink: 0 }}>{children}</View>
  );
  return (
    <View onLayout={e => setRoom(e.nativeEvent.layout.width)} style={{ height, overflow: 'hidden', justifyContent: 'center',
      ...(over && Platform.OS === 'web' ? { maskImage: `linear-gradient(to right, transparent, #000 ${FADE}px, #000 calc(100% - ${FADE}px), transparent)` } : null) } as object}>
      {/* The row at its natural width, measured in a very wide hidden box. */}
      <View pointerEvents="none" style={{ position: 'absolute', top: 0, ...(RTL ? { right: 0 } : { left: 0 }), width: 4000, flexDirection: 'row', justifyContent: RTL ? 'flex-end' : 'flex-start', opacity: 0 }}>{row(true)}</View>
      {over ? (
        <Animated.View style={{ position: 'absolute', top: 0, bottom: 0, ...(RTL ? { right: FADE } : { left: FADE }), justifyContent: 'center', transform: [{ translateX: x }] }}>{row()}</Animated.View>
      ) : <View style={{ flexDirection: 'row', justifyContent: 'center' }}>{row()}</View>}
    </View>
  );
}

// `dense`: the home page on a short screen: less room (the line of facts under the numbers stays; Mojtaba 2026-10-29).
// `noHead`: the shortest screens: the numbers alone, without the card's title.
// `noFacts`: without the line of facts under the numbers (the smallest phones).
export function TestStats({ attempts, dense, noHead, noFacts }: { attempts: Attempt[]; dense?: boolean; noHead?: boolean; noFacts?: boolean }) {
  const c = useColors();
  const n = attempts.length, pcts = attempts.map(pctOf);
  const avg = n ? pcts.reduce((s, p) => s + p, 0) / n : null, best = n ? Math.max(...pcts) : null;
  const ok = attempts.filter(passed).length;
  const qs = attempts.reduce((s, a) => s + a.items.length, 0), secs = attempts.reduce((s, a) => s + (a.secs || 0), 0);
  const cell = (label: string, value: string, color?: string) => (
    <View style={{ flex: 1, alignItems: 'center', gap: 2, paddingVertical: dense ? 6 : 12, paddingHorizontal: 4 }}>
      <FitLine size={12} style={{ color: c.muted, textAlign: 'center' }}>{label}</FitLine>
      <T style={{ fontSize: 18, lineHeight: 26, fontWeight: '800', textAlign: 'center', color: color ?? c.text }} numberOfLines={1}>{value}</T>
    </View>
  );
  const rule = <View style={{ width: 1, marginVertical: dense ? 6 : 12, backgroundColor: c.line }} />;
  const fact = (icon: IconName, text: string) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Icon name={icon} size={15} color={c.muted} />
      <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{text}</T>
    </View>
  );
  return (
    <Card style={{ padding: 0, paddingHorizontal: 6 }}>
      {noHead ? null : <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10, paddingTop: dense ? 8 : 14, paddingBottom: 2 }}>
        <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
          <Icon name="chart" size={19} color={c.text} weight="semibold" />
        </View>
        <T style={{ flex: 1, fontWeight: '700', fontSize: 17 }}>آمار آزمون‌ها</T>
      </View>}
      <View style={{ flexDirection: 'row' }}>
        {cell('آزمون‌ها', faNum(n))}
        {rule}
        {cell('میانگین', avg != null ? pctText(avg) : '–')}
        {rule}
        {cell('بهترین', best != null ? pctText(best) : '–')}
        {rule}
        {/* Every test passed (e.g. 5 of 5): green; any not: the warning colour (Mojtaba 2026-10-20). */}
        {cell('قبولی', n ? `${faNum(ok)} از ${faNum(n)}` : '–', n ? (ok === n ? c.ok : c.warn) : undefined)}
      </View>
      {n && !noFacts ? (
        // One line on any screen; too long for it, it glides through (Mojtaba 2026-10-20).
        <View style={{ paddingHorizontal: 10, paddingVertical: dense ? 8 : 12, borderTopWidth: 1, borderTopColor: c.line }}>
          <GlideRow height={19}>
            {fact('exam', `${faNum(qs)} سؤال جواب داده‌اید`)}
            {secs ? fact('clock', spent(secs)) : null}
          </GlideRow>
        </View>
      ) : null}
    </Card>
  );
}
