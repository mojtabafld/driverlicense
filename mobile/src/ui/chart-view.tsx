// The home page's chart view (Mojtaba 2026-10-19): a round button beside the profile picture, in its look (the theme's
// link colour on the blush-to-lavender wash) with the plain chart icon of the statistics card (Mojtaba: minimal, as
// that one); pressed, the cards above the chart fold away and the chart glides to the top of the page, and the user's
// test statistics come in under it, then the latest tests, each opening its own page (its result and review). Pressed
// again, all goes back.
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Platform, Pressable, View } from 'react-native';

import type { Attempt } from '@/lib/bank';
import { RTL, t, tr } from '@/lib/i18n';
import { faNum, isFull, isPass, pctOf } from '@/lib/logic';
import { pctText } from './activity';
import { Icon, type IconName } from './icon';
import { StatCarousel } from './stat-carousel';
import { Card, FitLine, T, tap } from './kit';
import { useColors, useIsDark } from './theme';
import { HomeChartIcon } from './chart-icon';

export { HomeChartIcon } from './chart-icon';

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
// All four tiles alike (Mojtaba 2026-11-07, after fonts.google.com's «Self-hosting web fonts» card): the bottom bar's
// indicator colour with its ink, so «سنگی» has Material's secondary container (#004a77 / #c2e7ff dark, the other way
// round light) and the other themes the tint of their own colour.
export function TestStats({ attempts, dense, noHead, noFacts }: { attempts: Attempt[]; dense?: boolean; noHead?: boolean; noFacts?: boolean }) {
  const c = useColors();
  const n = attempts.length, pcts = attempts.map(pctOf);
  const avg = n ? pcts.reduce((s, p) => s + p, 0) / n : null, best = n ? Math.max(...pcts) : null;
  const ok = attempts.filter(passed).length;
  const qs = attempts.reduce((s, a) => s + a.items.length, 0), secs = attempts.reduce((s, a) => s + (a.secs || 0), 0);
  const fact = (icon: IconName, text: string) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Icon name={icon} size={15} color={c.muted} />
      <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{text}</T>
    </View>
  );
  return (
    <Card style={{ padding: 0, paddingHorizontal: 6 }}>
      {noHead ? null : <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10, paddingTop: dense ? 8 : 14, paddingBottom: 2 }}>
        <HomeChartIcon kind="stats" />
        <T style={{ flex: 1, fontWeight: '700', fontSize: 17 }}>آمار آزمون‌ها</T>
      </View>}
      {/* The four numbers as a row of Material cards that slides (Mojtaba 2026-11-07, after fonts.google.com's carousel);
          the tests' card opens their history. */}
      <View style={{ paddingHorizontal: 4, paddingTop: noHead ? 10 : 8, paddingBottom: dense ? 8 : 12 }}>
        <StatCarousel dense={dense} items={[
          { title: t('{0} آزمون', faNum(n)), sub: tr('تاریخچه‌ی آزمون‌هایتان را ببینید'), icon: 'clipboard', onPress: () => router.push('/history'), label: tr('تاریخچه‌ی آزمون‌ها') },
          { title: avg != null ? t('میانگین {0}', pctText(avg)) : tr('میانگین'), sub: tr('میانگین نمره‌ی همه‌ی آزمون‌ها'), icon: 'gauge' },
          { title: best != null ? t('بهترین {0}', pctText(best)) : tr('بهترین'), sub: tr('بالاترین نمره‌ای که گرفته‌اید'), icon: 'trophy' },
          // (every test passed, e.g. 5 of 5: green; any not: the warning colour; Mojtaba 2026-10-20)
          { title: n ? t('قبولی {0} از {1}', faNum(ok), faNum(n)) : tr('قبولی'), sub: tr('آزمون‌هایی که قبول شده‌اید'), icon: 'passed', color: n ? (ok === n ? c.ok : c.warn) : undefined },
        ]} />
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
