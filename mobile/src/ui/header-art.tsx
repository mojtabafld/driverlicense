// Minimal vector drawings for the headers of the learning pages (Hero's `art`): each a simple emblem of its subject,
// drawn in the theme's colours on two soft circles, no cars and no road signs. «آموزش گام‌به‌گام»: a road of steps to
// the licence; «قوانین»: an open rule book; «حق تقدم»: two crossing ways and who goes first; «علائم رانندگی»: the
// shapes signs are learnt by, on a card, with a magnifier.
import Svg, { Circle, G, Line, Path, Rect, Text as SvgText } from 'react-native-svg';

type Art = { light: boolean; height: number };

const LIGHT = { blob: '#cfe5ca', road: '#ffffff', dash: '#c4dcbf', ok: '#2f8f46', card: '#ffffff', pole: '#5f7f63', cardLine: '#c4dcbf', avatar: '#8fb8e8', line: '#d6e6d3', you: '#e8957a', blue: '#5b74c4', gold: '#f2b84b' };
const DARK = { blob: '#1f5130', road: '#2c6a3c', dash: '#4c8a5b', ok: '#5cc47a', card: '#f4f8f3', pole: '#cfe3d2', cardLine: '#cfe3d2', avatar: '#8fb8e8', line: '#d6e6d3', you: '#e8957a', blue: '#7d93dc', gold: '#f2b84b' };
type Tone = typeof LIGHT;

// The drawing's box: the header's height (less its fading foot), three to two, on the left.
function Frame({ height, children }: { height: number; children: React.ReactNode }) {
  const h = height - 30, w = Math.round(h * 1.5);
  return <Svg width={w} height={h} viewBox="0 0 300 200" style={{ marginLeft: 4 }}>{children}</Svg>;
}
const Blobs = ({ t }: { t: Tone }) => <><Circle cx={228} cy={70} r={58} fill={t.blob} /><Circle cx={62} cy={150} r={44} fill={t.blob} /></>;
const tick = (x: number, y: number) => `M${x - 4.5} ${y} l3 3 l6 -6`;
const Tick = ({ x, y }: { x: number; y: number }) => <Path d={tick(x, y)} fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />;

const ROAD = 'M18 186 C 70 186, 70 140, 118 138 S 160 96, 196 92 S 236 64, 232 40';
export function CourseArt({ light, height }: Art) {
  const t = light ? LIGHT : DARK;
  return (
    <Frame height={height}>
      <Blobs t={t} />
      <Path d={ROAD} fill="none" stroke={t.road} strokeWidth={18} strokeLinecap="round" />
      <Path d={ROAD} fill="none" stroke={t.dash} strokeWidth={2} strokeDasharray="5 7" strokeLinecap="round" />
      {[[58, 170], [118, 138]].map(([x, y]) => <G key={x}><Circle cx={x} cy={y} r={11} fill={t.ok} /><Tick x={x} y={y} /></G>)}
      <Circle cx={196} cy={92} r={11} fill={t.card} stroke={t.you} strokeWidth={3} />
      <Circle cx={196} cy={92} r={4} fill={t.you} />
      <Line x1={232} y1={44} x2={232} y2={6} stroke={t.pole} strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M233 7 L254 13 L233 20 Z" fill={t.ok} />
      <G transform="translate(150 22) rotate(-6)">
        <Rect width={56} height={36} rx={6} fill={t.card} stroke={t.cardLine} strokeWidth={1.5} />
        <Circle cx={14} cy={14} r={5} fill={t.avatar} />
        <Path d="M6 28 q8 -10 16 0 z" fill={t.avatar} />
        <Rect x={26} y={10} width={22} height={3.5} rx={1.75} fill={t.line} />
        <Rect x={26} y={17} width={16} height={3.5} rx={1.75} fill={t.line} />
        <Rect x={26} y={24} width={19} height={3.5} rx={1.75} fill={t.line} />
      </G>
    </Frame>
  );
}

export function RulesArt({ light, height }: Art) {
  const t = light ? LIGHT : DARK;
  return (
    <Frame height={height}>
      <Blobs t={t} />
      <G transform="translate(14 58) scale(0.86)">
        <Path d="M0 18 Q 50 0 100 18 L100 120 Q 50 102 0 120 Z" fill={t.card} stroke={t.cardLine} strokeWidth={2} />
        <Path d="M100 18 Q 150 0 200 18 L200 120 Q 150 102 100 120 Z" fill={t.card} stroke={t.cardLine} strokeWidth={2} />
        <Line x1={100} y1={18} x2={100} y2={120} stroke={t.cardLine} strokeWidth={2} />
        <SvgText x={50} y={80} fontSize={46} fontWeight="700" textAnchor="middle" fill={t.ok}>§</SvgText>
        {[[40, 64], [56, 52], [72, 60], [88, 44]].map(([y, w]) => <Rect key={y} x={118} y={y} width={w} height={5} rx={2.5} fill={t.line} />)}
        <Path d="M168 10 v34 l8 -7 l8 7 v-34 z" fill={t.you} />
      </G>
      <Circle cx={170} cy={34} r={15} fill={t.ok} />
      <Tick x={170} y={34} />
    </Frame>
  );
}

// (Who goes first: the one from the right, so the way coming up from below goes first, «۱», the one from the left
// second.)
export function PriorityArt({ light, height }: Art) {
  const t = light ? LIGHT : DARK;
  const badge = (x: number, y: number, fill: string, n: string) => (
    <G><Circle cx={x} cy={y} r={14} fill={fill} /><SvgText x={x} y={y + 5.5} fontSize={16} fontFamily="Vazirmatn-700" fontWeight="700" textAnchor="middle" fill="#fff">{n}</SvgText></G>
  );
  return (
    <Frame height={height}>
      <Blobs t={t} />
      <Rect x={14} y={100} width={170} height={32} rx={16} fill={t.road} />
      <Rect x={84} y={34} width={32} height={160} rx={16} fill={t.road} />
      <Line x1={28} y1={116} x2={170} y2={116} stroke={t.dash} strokeWidth={2} strokeDasharray="5 7" strokeLinecap="round" />
      <Line x1={100} y1={48} x2={100} y2={182} stroke={t.dash} strokeWidth={2} strokeDasharray="5 7" strokeLinecap="round" />
      <Path d="M34 116 h30" stroke={t.blue} strokeWidth={5} strokeLinecap="round" />
      <Path d="M58 108 l10 8 l-10 8" fill="none" stroke={t.blue} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M100 176 v-32" stroke={t.ok} strokeWidth={5} strokeLinecap="round" />
      <Path d="M92 152 l8 -10 l8 10" fill="none" stroke={t.ok} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      {badge(134, 168, t.ok, '۱')}
      {badge(40, 84, t.blue, '۲')}
      <Circle cx={160} cy={58} r={15} fill={t.card} stroke={t.cardLine} strokeWidth={2} />
      <SvgText x={160} y={64} fontSize={17} fontWeight="700" textAnchor="middle" fill={t.you}>?</SvgText>
    </Frame>
  );
}

export function SignsArt({ light, height }: Art) {
  const t = light ? LIGHT : DARK;
  return (
    <Frame height={height}>
      <Blobs t={t} />
      <G transform="translate(-6 30) scale(0.82)">
        <Rect x={34} y={40} width={190} height={130} rx={16} fill={t.card} stroke={t.cardLine} strokeWidth={2} />
        <Path d="M76 70 L100 112 L52 112 Z" fill="none" stroke={t.you} strokeWidth={6} strokeLinejoin="round" />
        <Circle cx={130} cy={92} r={21} fill="none" stroke={t.blue} strokeWidth={6} />
        <Rect x={162} y={71} width={40} height={40} rx={8} fill="none" stroke={t.ok} strokeWidth={6} />
        {[[52, 130, 60], [52, 144, 90], [130, 130, 72]].map(([x, y, w]) => <Rect key={`${x}${y}`} x={x} y={y} width={w} height={6} rx={3} fill={t.line} />)}
        <Circle cx={200} cy={160} r={20} fill={t.card} stroke={t.pole} strokeWidth={5} />
        <Line x1={214} y1={174} x2={230} y2={190} stroke={t.pole} strokeWidth={7} strokeLinecap="round" />
      </G>
      <Circle cx={168} cy={44} r={14} fill={t.gold} />
      <Path d="M164 50 h8 M163 42 a5 5 0 1 1 10 0 q0 3 -3 5 h-4 q-3 -2 -3 -5" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
    </Frame>
  );
}
