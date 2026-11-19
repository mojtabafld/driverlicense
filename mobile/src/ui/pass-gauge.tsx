// The chance of passing as a half-circle gauge (Mojtaba 2026-11-19, after a health app's «Overall health» picture and
// the mockup he approved): a warm glow behind it; the title in orange; the arc in three parts, up to 50% orange fading in, 50–70% orange-red, 70% and over pink («ready»),
// filled up to the estimate over a grey track, a tick at the ready mark (70%) and a round badge at the end of each
// part reached; in its middle the percent large, «٪ of 100» in a small pill and the change since the test before in
// blue; under it the verdict (a button to the mistakes under it was taken off the same day, Mojtaba). Drawn the same on the web and the phones.
import { View, useWindowDimensions } from 'react-native';
import Svg, { Defs, Line, LinearGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

import { RTL, t, tr } from '@/lib/i18n';
import { faNum } from '@/lib/logic';
import { Icon, type IconName } from './icon';
import { T } from './kit';
import { mix } from './palette';
import { useColors, useIsDark } from './theme';

const READY = 0.7;
const ZONES: { from: number; to: number; icon: IconName }[] = [
  { from: 0, to: 0.5, icon: 'learn' },
  { from: 0.5, to: 0.7, icon: 'exam' },
  { from: 0.7, to: 1, icon: 'check' },
];

export function PassGauge({ value, change, verdict, verdictColor, verdictSoft, small }: {
  value: number; change: number | null; verdict: string; verdictColor: string; verdictSoft: string; small?: boolean }) {
  const c = useColors(), dark = useIsDark(), { width } = useWindowDimensions();
  // the arc's size: as the mockup's 300 × 176, smaller on a narrow or short screen
  const W = Math.min(small ? 250 : 300, width - 72), S = W / 300, H = 176 * S;
  const R = 128 * S, SW = 26 * S, cx = W / 2, cy = 160 * S;
  const pt = (f: number, r: number) => { const a = Math.PI * (1 - f); return [cx + r * Math.cos(a), cy - r * Math.sin(a)] as const; };
  const arc = (f0: number, f1: number) => {
    const [x0, y0] = pt(f0, R), [x1, y1] = pt(f1, R);
    return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  };
  const v = Math.max(0, Math.min(1, value)), gap = 0.012;
  const track = dark ? '#2c2c31' : '#ececf1', ink = c.text;
  const [mx, my] = pt(READY, R + SW / 2 + 6), [nx, ny] = pt(READY, R - SW / 2 - 6);
  const big = Math.round(52 * Math.max(0.85, S)), badge = Math.round(28 * Math.max(0.85, S));
  const pctSign = RTL ? '٪' : '%';
  const blue = dark ? '#6aaeff' : '#2b8be0';
  // the colours from the theme's own (Mojtaba 2026-11-19: orange, red and pink before): a light shade fading in, the
  // colour itself, a deep shade for «ready»; the glow and the title in it too
  const acc = c.accent, light = mix(acc, '#ffffff', 0.35), deep = dark ? mix(acc, '#ffffff', 0.3) : mix(acc, '#000000', 0.28);
  const zoneColor = [light, acc, deep];
  return (
    <View testID="home-readiness-value" style={{ alignItems: 'center', gap: 6 }}>
      {/* the warm glow behind the top of it */}
      <View pointerEvents="none" style={{ position: 'absolute', top: -60, left: -40, right: -40, height: 340 }}>
        <Svg width="100%" height="100%">
          <Defs>
            <RadialGradient id="gaugeGlow" cx="50%" cy="45%" rx="50%" ry="50%">
              <Stop offset="0" stopColor={acc} stopOpacity={dark ? 0.22 : 0.26} />
              <Stop offset="1" stopColor={acc} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#gaugeGlow)" />
        </Svg>
      </View>
      {/* (the title alone: no «i» beside it since 2026-11-19, Mojtaba) */}
      <T style={{ fontSize: 15, lineHeight: 22, fontWeight: '600', color: dark ? light : deep }}>احتمال قبولی</T>

      <View style={{ width: W, height: H, direction: 'ltr' } as any}>
        <Svg width={W} height={H}>
          <Defs>
            <LinearGradient id="gaugeA" x1="0" y1="1" x2="1" y2="0">
              <Stop offset="0" stopColor={light} stopOpacity={0.15} />
              <Stop offset="0.55" stopColor={light} />
              <Stop offset="1" stopColor={mix(light, acc, 0.5)} />
            </LinearGradient>
          </Defs>
          <Path d={arc(0, 1)} stroke={track} strokeWidth={SW} fill="none" strokeLinecap="round" />
          {ZONES.map((z, i) => {
            const e = Math.min(z.to, v);
            if (e <= z.from + gap * 2) return null;
            return <Path key={i} d={arc(z.from + (i ? gap : 0), e - gap)} stroke={i ? zoneColor[i] : 'url(#gaugeA)'} strokeWidth={SW} fill="none" strokeLinecap="round" />;
          })}
          <Line x1={mx} y1={my} x2={nx} y2={ny} stroke={ink} strokeWidth={2.5} strokeLinecap="round" opacity={0.55} />
        </Svg>
        {/* a round badge at the end of each part reached */}
        {ZONES.map((z, i) => {
          const e = Math.min(z.to, v);
          if (e <= z.from + gap * 2) return null;
          const [bx, by] = pt(Math.max(0.04, e - 0.035), R);
          return (
            <View key={`b${i}`} pointerEvents="none" style={{ position: 'absolute', left: bx - badge / 2, top: by - badge / 2, width: badge, height: badge, borderRadius: badge / 2,
              alignItems: 'center', justifyContent: 'center', backgroundColor: zoneColor[i], shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
              <Icon name={z.icon} size={Math.round(badge * 0.55)} color="#ffffff" />
            </View>
          );
        })}
        {/* the middle: the percent, «٪ of 100», the change */}
        <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: H * 0.36, alignItems: 'center' }}>
          <T raw style={{ fontSize: big, lineHeight: Math.round(big * 1.15), fontFamily: RTL ? 'Vazirmatn-800' : 'GSans-700', color: ink }}>{faNum(Math.round(v * 100))}</T>
          <View style={{ marginTop: 4, paddingHorizontal: 10, paddingVertical: 1, borderRadius: 99, borderWidth: 1, borderColor: c.line, backgroundColor: dark ? '#26262a' : '#ffffff' }}>
            <T raw style={{ fontSize: 12.5, lineHeight: 18, fontWeight: '600', color: c.muted }}>{RTL ? t('{0} از {1}', pctSign, faNum(100)) : `${pctSign} of 100`}</T>
          </View>
        </View>
      </View>
      {/* the change and the verdict */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: -4 }}>
        {change ? (
          <T raw style={{ fontSize: 13.5, lineHeight: 20, fontWeight: '600', color: change > 0 ? blue : c.bad }}>
            {t('{0} نسبت به آزمون قبل', `⁦${change > 0 ? '+' : '−'}${faNum(Math.abs(change))}⁩`)}
          </T>
        ) : null}
        <View testID="home-readiness-status" style={{ paddingHorizontal: 12, paddingVertical: 3, borderRadius: 99, backgroundColor: verdictSoft }}>
          <T numberOfLines={1} style={{ color: verdictColor, fontSize: 12.5, lineHeight: 18, fontWeight: '700' }}>{verdict}</T>
        </View>
      </View>
    </View>
  );
}
