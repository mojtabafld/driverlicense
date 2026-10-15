// Minimal vector drawings for the headers of the learning pages (Hero's `art`): each a simple emblem of its subject,
// drawn in the theme's colours on two soft circles, no cars and no road signs. «آموزش گام‌به‌گام»: a road of steps to
// the licence; «قوانین»: an open rule book; «حق تقدم»: two crossing ways and who goes first; «علائم رانندگی»: the
// shapes signs are learnt by, on a card, with a magnifier.
import Svg, { Circle, ClipPath, Defs, G, Line, Path, Rect, Text as SvgText } from 'react-native-svg';
import { RTL, latin } from '@/lib/i18n';

type Art = { light: boolean; height: number };

const LIGHT = { blob: '#cfe5ca', road: '#ffffff', dash: '#c4dcbf', ok: '#2f8f46', card: '#ffffff', pole: '#5f7f63', cardLine: '#c4dcbf', avatar: '#8fb8e8', line: '#d6e6d3', you: '#e8957a', blue: '#5b74c4', gold: '#f2b84b' };
const DARK = { blob: '#1f5130', road: '#2c6a3c', dash: '#4c8a5b', ok: '#5cc47a', card: '#f4f8f3', pole: '#cfe3d2', cardLine: '#cfe3d2', avatar: '#8fb8e8', line: '#d6e6d3', you: '#e8957a', blue: '#7d93dc', gold: '#f2b84b' };
type Tone = typeof LIGHT;

// The drawing's box: the header's height (less its fading foot), three to two, on the left.
// In English and Danish it is on the right (the title at the left). `edge`: where the drawing's own shapes end on the
// right (viewBox units, the tab pages' drawings end at about 192 of 300): it is then laid as the mirror of the Persian
// page, its shapes as close to the right edge as they are to the left one in Persian. Without it, a little further out
// towards the right edge (the course, rules, signs and right of way, whose shapes run to the box's end).
function Frame({ height, edge, children }: { height: number; edge?: number; children: React.ReactNode }) {
  const h = height - 30, w = Math.round(h * 1.5), s = w / 300;
  const right = edge == null ? -Math.round(w * 0.14) : Math.round(4 + 8 * s - (300 - edge) * s);
  return <Svg width={w} height={h} viewBox="0 0 300 200" style={RTL ? { marginLeft: 4 } : { marginRight: right }}>{children}</Svg>;
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
    <Frame height={height} edge={192}>
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
    <G><Circle cx={x} cy={y} r={14} fill={fill} /><SvgText x={x} y={y + 5.5} fontSize={16} fontFamily="Vazirmatn-700" fontWeight="700" textAnchor="middle" fill="#fff">{RTL ? n : latin(n)}</SvgText></G>
  );
  return (
    <Frame height={height} edge={190}>
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
    <Frame height={height} edge={196}>
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

// The home page's header (main site; Mojtaba picked it from three samples), kept to the drawing box's left 60% (x ≤ 185),
// clear of the greeting on the right.
const HomeBlobs = ({ t }: { t: Tone }) => <><Circle cx={140} cy={66} r={50} fill={t.blob} /><Circle cx={46} cy={148} r={38} fill={t.blob} /></>;
// «گواهینامه»: the licence card the app leads to, with a Danish flag and a green seal.
export function HomeLicenceArt({ light, height }: Art) {
  const t = light ? LIGHT : DARK;
  return (
    <Frame height={height} edge={192}>
      <HomeBlobs t={t} />
      <G transform="translate(22 66) rotate(-8) scale(0.84)">
        <Rect x={6} y={10} width={150} height={96} rx={14} fill={light ? '#b9d7b3' : '#143a20'} />
        <Rect width={150} height={96} rx={14} fill={t.card} stroke={t.cardLine} strokeWidth={1.5} />
        <Rect x={14} y={14} width={26} height={18} rx={3} fill="#c8102e" />
        <Rect x={22} y={14} width={4} height={18} fill="#fff" />
        <Rect x={14} y={21} width={26} height={4} fill="#fff" />
        <Rect x={48} y={18} width={40} height={4} rx={2} fill={t.line} />
        <Rect x={48} y={26} width={26} height={4} rx={2} fill={t.line} />
        <Rect x={14} y={42} width={40} height={42} rx={8} fill="#e3eef9" />
        <Circle cx={34} cy={57} r={8} fill={t.avatar} />
        <Path d="M20 80 q14 -18 28 0 z" fill={t.avatar} />
        {[[50, 64], [62, 50], [74, 58]].map(([y, w]) => <Rect key={y} x={66} y={y} width={w} height={5} rx={2.5} fill={t.line} />)}
        <SvgText x={128} y={30} fontSize={14} fontWeight="700" textAnchor="middle" fill={t.ok}>B</SvgText>
      </G>
      <Circle cx={150} cy={140} r={19} fill={t.ok} />
      <Circle cx={150} cy={140} r={24} fill="none" stroke={t.ok} strokeOpacity={0.35} strokeWidth={2} />
      <Path d="M141.5 140 l6 6 l11 -12" fill="none" stroke="#fff" strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={26} cy={48} r={3} fill={t.gold} />
      <Circle cx={176} cy={30} r={4} fill={t.gold} />
      <Circle cx={182} cy={168} r={2.5} fill={t.you} />
    </Frame>
  );
}


// The exam tab's header (main site): «فرمان و آزمون», a steering wheel behind a question card with the right answer ticked.
export function ExamWheelArt({ light, height }: Art) {
  const t = light ? LIGHT : DARK;
  const wheel = light ? '#6f9c77' : '#cfe3d2';
  return (
    <Frame height={height} edge={192}>
      <HomeBlobs t={t} />
      <G opacity={light ? 0.85 : 0.75}>
        <Circle cx={66} cy={104} r={50} fill="none" stroke={wheel} strokeWidth={10} />
        <Circle cx={66} cy={104} r={11} fill={wheel} />
        <Path d="M18 98 Q 66 88 114 98" fill="none" stroke={wheel} strokeWidth={8} strokeLinecap="round" />
        <Path d="M66 115 L66 152" stroke={wheel} strokeWidth={8} strokeLinecap="round" />
      </G>
      <G transform="translate(86 52) rotate(4) scale(0.8)">
        <Rect x={4} y={8} width={120} height={112} rx={14} fill={light ? '#b9d7b3' : '#143a20'} />
        <Rect width={120} height={112} rx={14} fill={t.card} stroke={t.cardLine} strokeWidth={1.5} />
        <Rect x={14} y={14} width={70} height={6} rx={3} fill={t.line} />
        <Rect x={14} y={25} width={48} height={6} rx={3} fill={t.line} />
        {[0, 1, 2].map(i => {
          const y = 42 + i * 22, right = i === 1;
          return (
            <G key={i}>
              <Rect x={12} y={y} width={96} height={17} rx={8.5} fill={right ? '#e2f1df' : 'none'} stroke={right ? t.ok : t.cardLine} strokeWidth={1.5} />
              <Circle cx={24} cy={y + 8.5} r={5} fill={right ? t.ok : 'none'} stroke={right ? t.ok : t.cardLine} strokeWidth={1.5} />
              <Rect x={36} y={y + 6} width={right ? 50 : 40 + i * 6} height={5} rx={2.5} fill={right ? t.ok : t.line} opacity={right ? 0.55 : 1} />
            </G>
          );
        })}
      </G>
      <Circle cx={182} cy={52} r={13} fill={t.ok} />
      <Tick x={182} y={52} />
      <Circle cx={22} cy={34} r={3.5} fill={t.gold} />
    </Frame>
  );
}

// The learning tab's header (main site): an open book, a warning sign on its left page and text on its right, a
// graduation cap above it and a green seal at its corner.
export function LearnBookArt({ light, height }: Art) {
  const t = light ? LIGHT : DARK;
  const back = light ? '#b9d7b3' : '#143a20';
  return (
    <Frame height={height} edge={192}>
      <HomeBlobs t={t} />
      <G transform="translate(16 82) rotate(-4) scale(0.86)">
        <Path d="M4 16 Q 44 2 84 16 L84 106 Q 44 92 4 106 Z M84 16 Q 124 2 164 16 L164 106 Q 124 92 84 106 Z" fill={back} transform="translate(4 6)" />
        <Path d="M0 16 Q 40 2 80 16 L80 106 Q 40 92 0 106 Z" fill={t.card} stroke={t.cardLine} strokeWidth={1.5} />
        <Path d="M80 16 Q 120 2 160 16 L160 106 Q 120 92 80 106 Z" fill={t.card} stroke={t.cardLine} strokeWidth={1.5} />
        <Line x1={80} y1={16} x2={80} y2={106} stroke={t.cardLine} strokeWidth={1.5} />
        <Path d="M40 34 L60 68 L20 68 Z" fill="#fff" stroke="#c8102e" strokeWidth={5} strokeLinejoin="round" />
        <Rect x={22} y={80} width={36} height={5} rx={2.5} fill={t.line} />
        {[[30, 52], [42, 60], [54, 44], [66, 56], [78, 38]].map(([y, w]) => <Rect key={y} x={94} y={y} width={w} height={5} rx={2.5} fill={t.line} />)}
        <Path d="M136 9 v26 l7 -6 l7 6 v-26 z" fill={t.you} />
      </G>
      <G transform="translate(112 34) rotate(-10) scale(0.9)">
        <Path d="M0 18 L30 6 L60 18 L30 30 Z" fill={light ? '#2a5a35' : '#e8f1e6'} />
        <Path d="M12 23 v12 q18 9 36 0 v-12 l-18 7 z" fill={light ? '#2a5a35' : '#e8f1e6'} opacity={0.85} />
        <Path d="M52 21 v14" stroke={t.gold} strokeWidth={2.2} strokeLinecap="round" />
        <Circle cx={52} cy={37} r={3} fill={t.gold} />
      </G>
      <Circle cx={170} cy={150} r={15} fill={t.ok} />
      <Tick x={170} y={150} />
      <Circle cx={24} cy={40} r={3.5} fill={t.gold} />
    </Frame>
  );
}

// The sign-in page's picture (main site): a flat landscape in solid colours, no fades: a sky, a sun, two ranges of
// hills, and a road winding up from the page through the near hills to the horizon, a warning sign at its side. Drawn
// at the box's own size (no stretching): the hills repeat in tiles of about a phone's width from the middle out, so a
// wide screen shows a longer range rather than bigger hills.
export const LOGIN_SKY = { light: '#d4eadb', dark: '#0f2417' };
export function LoginScene({ light, width, height }: { light: boolean; width: number; height: number }) {
  const w = width, h = height;
  const t = light
    ? { sky: LOGIN_SKY.light, sun: '#f2a33f', far: '#7db590', near: '#1f5a32', road: '#e9efe7', dash: '#f6c445', pole: '#c9d3c8' }
    : { sky: LOGIN_SKY.dark, sun: '#f2a33f', far: '#2b6a3d', near: '#183f25', road: '#33473a', dash: '#e8b93c', pole: '#5c6d61' };
  const T = Math.min(w, 460), mid = w / 2;
  // A range: peaks (x as a share of a tile from its middle, y as a share of the height), repeated across the width.
  const range = (pts: [number, number][]) => {
    const n = Math.ceil(w / T / 2) + 1, out: string[] = [];
    for (let k = -n; k <= n; k++) for (const [x, y] of pts) out.push(`${(mid + (k + x) * T).toFixed(1)} ${(y * h).toFixed(1)}`);
    return `M${mid - (n + 1) * T} ${h} L${out.join(' L')} L${mid + (n + 1) * T} ${h} Z`;
  };
  const far = range([[-0.5, 0.6], [-0.3, 0.38], [-0.12, 0.55], [0.1, 0.3], [0.32, 0.56]]);
  const near = range([[-0.5, 0.82], [-0.3, 0.64], [-0.1, 0.76], [0.12, 0.6], [0.34, 0.8]]);
  // The road: from the page's edge (wide), curving up to a gap in the near hills (a point).
  const u = T / 390, top = 0.68 * h;
  const road = `M${mid - 92 * u} ${h} C ${mid - 40 * u} ${h - 0.12 * h}, ${mid + 66 * u} ${top + 0.14 * h}, ${mid + 6 * u} ${top}`
    + ` C ${mid + 56 * u} ${top + 0.13 * h}, ${mid + 40 * u} ${h - 0.12 * h}, ${mid + 112 * u} ${h} Z`;
  const line = `M${mid + 10 * u} ${h} C ${mid + 6 * u} ${h - 0.12 * h}, ${mid + 62 * u} ${top + 0.14 * h}, ${mid + 6 * u} ${top + 4}`;
  const sun = { x: mid + T * 0.22, y: h * 0.3, r: Math.max(26, T * 0.11) };
  const sign = { x: mid - 128 * u, y: h - 0.07 * h, s: Math.max(0.8, u) };
  return (
    <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <Rect width={w} height={h} fill={t.sky} />
      <Circle cx={sun.x} cy={sun.y} r={sun.r} fill={t.sun} />
      <Path d={far} fill={t.far} />
      <Path d={near} fill={t.near} />
      <Defs><ClipPath id="login-road"><Path d={road} /></ClipPath></Defs>
      <Path d={road} fill={t.road} />
      <Path clipPath="url(#login-road)" d={line} fill="none" stroke={t.dash} strokeWidth={3.2 * u} strokeDasharray={`${12 * u} ${11 * u}`} strokeLinecap="round" />
      <G transform={`translate(${sign.x} ${sign.y}) scale(${sign.s})`}>
        <Rect x={-2.5} y={-58} width={5} height={58} rx={2} fill={t.pole} />
        <Path d="M0 -92 L22 -54 L-22 -54 Z" fill="#c8102e" stroke="#c8102e" strokeWidth={4} strokeLinejoin="round" />
        <Path d="M0 -80 L12.5 -59 L-12.5 -59 Z" fill="#ffffff" />
      </G>
    </Svg>
  );
}
