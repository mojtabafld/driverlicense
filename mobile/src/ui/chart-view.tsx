// The home page's chart view (Mojtaba 2026-10-19): a round button beside the profile picture, in its look (the theme's
// link colour on the blush-to-lavender wash) with a small drawing of the progress chart; pressed, the cards above the
// chart fold away and the chart glides to the top of the page, and the user's test statistics come in under it, then
// the latest tests, each opening its own page (its result and review). Pressed again, all goes back.
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';

import type { Attempt } from '@/lib/bank';
import { tr } from '@/lib/i18n';
import { faNum, isFull, isPass, pctOf } from '@/lib/logic';
import { pctText } from './activity';
import { Icon, type IconName } from './icon';
import { Card, FitLine, T, tap } from './kit';
import { useColors, useIsDark } from './theme';
import { WASH_DARK, WASH_LIGHT } from './wash';

// The drawing: the chart's smooth line rising over its soft fill to a point, and its dashed pass line, in 24 units.
const LINE = 'M3.5 16.5 C5.8 16.5 5.8 12.4 8.1 12.4 C10.3 12.4 10.3 14.6 12.5 14.6 C14.8 14.6 14.8 9.2 17.1 9.2 C18.8 9.2 18.8 6.8 20.5 6.8';
const AREA = `${LINE} L20.5 20.2 L3.5 20.2 Z`;
function Glyph({ size, color, w }: { size: number; color: string; w: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Line x1={3.5} x2={20.5} y1={10.6} y2={10.6} stroke={color} strokeOpacity={0.45} strokeWidth={w * 0.6} strokeDasharray="1.5 1.9" strokeLinecap="round" />
      <Path d={AREA} fill={color} fillOpacity={0.16} />
      <Path d={LINE} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={20.5} cy={6.8} r={w * 1.25} fill={color} />
    </Svg>
  );
}

// `t`: how far the chart view is open (0 to 1); the button fills with the accent as it opens.
export function ChartButton({ size = 44, on, t, onPress }: { size?: number; on: boolean; t: Animated.Value; onPress: () => void }) {
  const c = useColors(), dark = useIsDark();
  const g = Math.round(size * 0.62), w = Math.max(1.5, size / 24) * 24 / g; // the profile picture's line, a little bolder
  return (
    <Pressable onPress={() => { tap(); onPress(); }} hitSlop={6} accessibilityRole="button" accessibilityLabel={tr('نمودار و آمار آزمون‌ها')}
      accessibilityState={{ expanded: on }}
      style={({ pressed }) => ({ width: size, height: size, borderRadius: size / 2, overflow: 'hidden', backgroundColor: c.surface, opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.94 : 1 }] })}>
      <LinearGradient pointerEvents="none" colors={dark ? WASH_DARK : WASH_LIGHT} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={StyleSheet.absoluteFill} />
      <View pointerEvents="none" style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }]}>
        <Glyph size={g} color={c.link} w={w} />
      </View>
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center', backgroundColor: c.accent, opacity: t }]}>
        <Glyph size={g} color={c.accentText} w={w} />
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
