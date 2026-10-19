// The home page's chart view (Mojtaba 2026-10-19): a round button beside the profile picture, in its look (the theme's
// link colour on the blush-to-lavender wash) with the plain chart icon of the statistics card (Mojtaba: minimal, as
// that one); pressed, the cards above the chart fold away and the chart glides to the top of the page, and the user's
// test statistics come in under it, then the latest tests, each opening its own page (its result and review). Pressed
// again, all goes back.
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

import type { Attempt } from '@/lib/bank';
import { tr } from '@/lib/i18n';
import { faNum, isFull, isPass, pctOf } from '@/lib/logic';
import { pctText } from './activity';
import { Icon, type IconName } from './icon';
import { Card, FitLine, T, tap } from './kit';
import { useColors, useIsDark } from './theme';
import { WASH_DARK, WASH_LIGHT } from './wash';

// `t`: how far the chart view is open (0 to 1); the button fills with the accent as it opens.
export function ChartButton({ size = 44, on, t, onPress }: { size?: number; on: boolean; t: Animated.Value; onPress: () => void }) {
  const c = useColors(), dark = useIsDark();
  const g = Math.round(size * 0.52); // the icon, about as large as the profile picture's outline beside it
  return (
    <Pressable onPress={() => { tap(); onPress(); }} hitSlop={6} accessibilityRole="button" accessibilityLabel={tr('نمودار و آمار آزمون‌ها')}
      accessibilityState={{ expanded: on }}
      style={({ pressed }) => ({ width: size, height: size, borderRadius: size / 2, overflow: 'hidden', backgroundColor: c.surface, opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.94 : 1 }] })}>
      <LinearGradient pointerEvents="none" colors={dark ? WASH_DARK : WASH_LIGHT} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={StyleSheet.absoluteFill} />
      <View pointerEvents="none" style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }]}>
        <Icon name="chart" size={g} color={c.link} />
      </View>
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center', backgroundColor: c.accent, opacity: t }]}>
        <Icon name="chart" size={g} color={c.accentText} />
      </Animated.View>
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
export function TestStats({ attempts }: { attempts: Attempt[] }) {
  const c = useColors();
  const n = attempts.length, pcts = attempts.map(pctOf);
  const avg = n ? pcts.reduce((s, p) => s + p, 0) / n : null, best = n ? Math.max(...pcts) : null;
  const ok = attempts.filter(passed).length;
  const qs = attempts.reduce((s, a) => s + a.items.length, 0), secs = attempts.reduce((s, a) => s + (a.secs || 0), 0);
  const cell = (label: string, value: string, color?: string) => (
    <View style={{ flex: 1, alignItems: 'center', gap: 2, paddingVertical: 12, paddingHorizontal: 4 }}>
      <FitLine size={12} style={{ color: c.muted, textAlign: 'center' }}>{label}</FitLine>
      <T style={{ fontSize: 18, lineHeight: 26, fontWeight: '800', textAlign: 'center', color: color ?? c.text }} numberOfLines={1}>{value}</T>
    </View>
  );
  const rule = <View style={{ width: 1, marginVertical: 12, backgroundColor: c.line }} />;
  const fact = (icon: IconName, text: string) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Icon name={icon} size={15} color={c.muted} />
      <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{text}</T>
    </View>
  );
  return (
    <Card style={{ padding: 0, paddingHorizontal: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10, paddingTop: 14, paddingBottom: 2 }}>
        <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
          <Icon name="chart" size={19} color={c.text} weight="semibold" />
        </View>
        <T style={{ flex: 1, fontWeight: '700', fontSize: 17 }}>آمار آزمون‌ها</T>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {cell('آزمون‌ها', faNum(n))}
        {rule}
        {cell('میانگین', avg != null ? pctText(avg) : '–')}
        {rule}
        {cell('بهترین', best != null ? pctText(best) : '–')}
        {rule}
        {cell('قبولی', n ? `${faNum(ok)} از ${faNum(n)}` : '–', n ? (ok ? c.ok : c.text) : undefined)}
      </View>
      {n ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', columnGap: 16, rowGap: 4, paddingHorizontal: 10, paddingVertical: 12, borderTopWidth: 1, borderTopColor: c.line }}>
          {fact('exam', `${faNum(qs)} سؤال جواب داده‌اید`)}
          {secs ? fact('clock', spent(secs)) : null}
        </View>
      ) : null}
    </Card>
  );
}
