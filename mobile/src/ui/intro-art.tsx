// The intro's slides on the main site: minimal flat drawings in the style of the page headers (ui/header-art.tsx),
// two soft circles behind white cards, on the intro's forest green (a 300 × 260 grid). /app keeps onboarding-art.tsx
// and the server's pictures.
import Svg, { Circle, G, Line, Path, Rect, Text as SvgText } from 'react-native-svg';
import { RTL, UI_LANG } from '@/lib/i18n';
import { px } from './palette';

const t = {
  blob: px('#192756'), back: px('#0a1433'), card: '#f4f8f3', cardLine: px('#cdd3e4'), line: px('#d2d7e7'), ok: px('#5470cc'), okDeep: px('#284296'),
  okSoft: px('#dee2f2'), gold: '#f2b84b', you: '#e8957a', avatar: '#8fb8e8', blue: '#5b74c4', red: '#c8102e', pole: px('#cdd3e4'),
};
const Box = ({ children }: { children: React.ReactNode }) => <Svg width="100%" height="100%" viewBox="0 0 300 260">{children}</Svg>;
const Blobs = ({ a = [196, 86, 64], b = [92, 182, 52] }: { a?: number[]; b?: number[] }) => (
  <><Circle cx={a[0]} cy={a[1]} r={a[2]} fill={t.blob} /><Circle cx={b[0]} cy={b[1]} r={b[2]} fill={t.blob} /></>
);
// A white card with a darker copy behind it, a little down and right (the drawings' one shadow).
const Card = ({ x, y, w, h, r = 14, children }: { x: number; y: number; w: number; h: number; r?: number; children?: React.ReactNode }) => (
  <G>
    <Rect x={x + 5} y={y + 7} width={w} height={h} rx={r} fill={t.back} />
    <Rect x={x} y={y} width={w} height={h} rx={r} fill={t.card} stroke={t.cardLine} strokeWidth={1.5} />
    {children}
  </G>
);
const Bar = ({ x, y, w, fill = t.line, h = 5 }: { x: number; y: number; w: number; fill?: string; h?: number }) => <Rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />;
const Seal = ({ x, y, r = 15 }: { x: number; y: number; r?: number }) => (
  <G>
    <Circle cx={x} cy={y} r={r} fill={t.ok} />
    <Path d={`M${x - r * 0.4} ${y} l${r * 0.27} ${r * 0.27} l${r * 0.5} ${-r * 0.55}`} fill="none" stroke="#fff" strokeWidth={r * 0.2} strokeLinecap="round" strokeLinejoin="round" />
  </G>
);
const Flag = ({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) => (
  <G transform={`translate(${x} ${y}) rotate(${rot})`}>
    <Rect width={34} height={24} rx={4} fill={t.red} />
    <Rect x={10} width={5.5} height={24} fill="#fff" />
    <Rect y={9.25} width={34} height={5.5} fill="#fff" />
  </G>
);
// A question row: a round tick box and a text bar; `on`: the picked, right one.
const Option = ({ x, y, w, on }: { x: number; y: number; w: number; on?: boolean }) => (
  <G>
    <Rect x={x} y={y} width={w} height={18} rx={9} fill={on ? t.okSoft : 'none'} stroke={on ? t.ok : t.cardLine} strokeWidth={1.5} />
    <Circle cx={x + 11} cy={y + 9} r={5} fill={on ? t.okDeep : 'none'} stroke={on ? t.okDeep : t.cardLine} strokeWidth={1.5} />
    <Bar x={x + 22} y={y + 6.5} w={w * 0.55} fill={on ? t.okDeep : t.line} />
  </G>
);

// 1. Every question in your pocket: a phone with a question and its picture, a Danish flag and a Persian line beside it.
export function IntroBank() {
  return (
    <Box>
      <Blobs />
      <Card x={106} y={30} w={92} h={176} r={18}>
        <Bar x={140} y={38} w={24} h={4} />
        <Rect x={116} y={52} width={72} height={46} rx={8} fill={px('#d7dcec')} />
        <Path d="M116 88 L140 70 L156 82 L168 74 L188 88 V90 Q188 98 180 98 H124 Q116 98 116 90 Z" fill={px('#b0bada')} />
        <Path d="M146 58 L156 76 L136 76 Z" fill="#fff" stroke={t.red} strokeWidth={3} strokeLinejoin="round" />
        <Bar x={116} y={108} w={60} />
        <Bar x={116} y={117} w={42} />
        <Option x={114} y={132} w={76} />
        <Option x={114} y={156} w={76} on />
        <Option x={114} y={180} w={76} />
      </Card>
      <Flag x={214} y={70} rot={-10} />
      <Card x={44} y={96} w={58} h={40} r={12}>
        <SvgText x={73} y={122} fontSize={15} fontFamily={RTL ? 'Vazirmatn-700' : 'Inter-600'} fontWeight="700" textAnchor="middle" fill={t.okDeep}>{RTL ? 'فارسی' : UI_LANG === 'da' ? 'Dansk' : 'English'}</SvgText>
      </Card>
      <Seal x={206} y={190} r={17} />
      <Circle cx={58} cy={62} r={4} fill={t.gold} />
      <Circle cx={250} cy={136} r={3} fill={t.you} />
      <Circle cx={236} cy={40} r={3.5} fill={t.gold} />
    </Box>
  );
}

// 2. Like the exam day: a question card with its progress bar and a stopwatch.
export function IntroExam() {
  return (
    <Box>
      <Blobs a={[110, 84, 62]} b={[214, 178, 50]} />
      <G transform="rotate(-4 150 130)">
        <Card x={74} y={52} w={150} h={150} r={18}>
          <Bar x={90} y={70} w={70} h={6} />
          <Bar x={90} y={82} w={48} h={6} />
          <Option x={88} y={102} w={122} />
          <Option x={88} y={128} w={122} on />
          <Option x={88} y={154} w={122} />
          <Bar x={90} y={184} w={118} h={5} fill={px('#d7dcec')} />
          <Bar x={90} y={184} w={56} h={5} fill={t.ok} />
        </Card>
      </G>
      <G transform="translate(214 66)">
        <Rect x={-6} y={-38} width={12} height={9} rx={3} fill={t.pole} />
        <Circle r={30} fill={t.card} stroke={t.cardLine} strokeWidth={2} />
        <Circle r={23} fill="none" stroke={px('#d7dcec')} strokeWidth={5} />
        <Path d="M0 -23 A23 23 0 1 1 -21.9 7.1" fill="none" stroke={t.ok} strokeWidth={5} strokeLinecap="round" />
        <Line x1={0} y1={0} x2={0} y2={-14} stroke={t.okDeep} strokeWidth={3} strokeLinecap="round" />
        <Circle r={3.5} fill={t.okDeep} />
      </G>
      <Circle cx={60} cy={204} r={4} fill={t.gold} />
      <Circle cx={262} cy={124} r={3} fill={t.you} />
    </Box>
  );
}

// 3. AI at your side: a question's bubble and the explanation's bubble under it, with sparkles.
const Spark = ({ x, y, s, fill = t.gold }: { x: number; y: number; s: number; fill?: string }) => (
  <Path d={`M${x} ${y - s} Q${x + s * 0.18} ${y - s * 0.18} ${x + s} ${y} Q${x + s * 0.18} ${y + s * 0.18} ${x} ${y + s} Q${x - s * 0.18} ${y + s * 0.18} ${x - s} ${y} Q${x - s * 0.18} ${y - s * 0.18} ${x} ${y - s} Z`} fill={fill} />
);
export function IntroAi() {
  return (
    <Box>
      <Blobs a={[192, 80, 60]} b={[96, 184, 54]} />
      <G>
        <Rect x={147} y={47} width={110} height={52} rx={18} fill={t.back} />
        <Rect x={142} y={40} width={110} height={52} rx={18} fill={px('#d7dcec')} />
        <Path d="M232 88 L246 104 L222 92 Z" fill={px('#d7dcec')} />
        <Bar x={158} y={56} w={76} fill={px('#b0bada')} />
        <Bar x={170} y={70} w={64} fill={px('#b0bada')} />
      </G>
      <Card x={48} y={112} w={168} h={92} r={20}>
        <Path d="M64 200 L52 220 L84 204 Z" fill={t.card} />
        <Circle cx={74} cy={138} r={13} fill={t.okSoft} />
        <Spark x={74} y={138} s={8} fill={t.okDeep} />
        <Bar x={96} y={130} w={100} />
        <Bar x={96} y={142} w={70} />
        <Bar x={64} y={164} w={132} />
        <Bar x={64} y={178} w={96} fill={t.ok} />
      </Card>
      <Spark x={236} y={150} s={14} />
      <Spark x={258} y={124} s={7} />
      <Spark x={46} y={74} s={9} fill={t.pole} />
      <Circle cx={112} cy={46} r={3.5} fill={t.gold} />
    </Box>
  );
}

// 4. See your progress: a rising chart with green points over the pass line, and the chance of passing as a ring.
export function IntroProgress() {
  const pts = [[78, 168], [104, 150], [130, 158], [156, 128], [182, 116], [208, 96]];
  const d = pts.map(([x, y], k) => `${k ? 'L' : 'M'}${x} ${y}`).join(' ');
  return (
    <Box>
      <Blobs a={[206, 76, 58]} b={[86, 190, 52]} />
      <Card x={56} y={66} w={176} h={140} r={18}>
        <Bar x={72} y={80} w={60} h={6} />
        <Line x1={72} y1={134} x2={218} y2={134} stroke={px('#b5baca')} strokeWidth={1.5} strokeDasharray="5 5" />
        <Path d={`${d} L208 190 L78 190 Z`} fill={t.okSoft} />
        <Path d={d} fill="none" stroke={t.okDeep} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        {pts.map(([x, y]) => <Circle key={x} cx={x} cy={y} r={4} fill={y < 134 ? t.okDeep : '#cd1526'} stroke="#fff" strokeWidth={1.5} />)}
      </Card>
      <G transform="translate(236 70)">
        <Circle r={31} fill={t.back} cx={4} cy={5} />
        <Circle r={31} fill={t.card} stroke={t.cardLine} strokeWidth={1.5} />
        <Circle r={22} fill="none" stroke={px('#d7dcec')} strokeWidth={7} />
        <Path d="M0 -22 A22 22 0 1 1 -20.9 6.8" fill="none" stroke={t.ok} strokeWidth={7} strokeLinecap="round" />
        <SvgText y={5} fontSize={14} fontFamily="Vazirmatn-700" fontWeight="700" textAnchor="middle" fill={t.okDeep}>{RTL ? '۸۰٪' : '80%'}</SvgText>
      </G>
      <Seal x={66} y={70} r={14} />
      <Circle cx={262} cy={170} r={3.5} fill={t.gold} />
      <Circle cx={40} cy={136} r={3} fill={t.you} />
    </Box>
  );
}
