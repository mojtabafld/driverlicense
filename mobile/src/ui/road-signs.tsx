// Road signs and markings drawn in SVG for the teaching pages (signs, rules, right of way): the shapes and colours of
// each group as they look on Danish roads, with a simple symbol; small pictures to recognise the group by, not exact
// copies of the official drawings. Each comes with its Persian name (SIGN_NAME) for the caption under it.
import Svg, { Circle, G, Path, Polygon, Rect, Text as SvgText } from 'react-native-svg';

export type SignKind = 'warning' | 'crossroads' | 'children' | 'roadworks' | 'yield' | 'stop' | 'mainRoad' | 'yieldOncoming'
  | 'noEntry' | 'speed50' | 'noOvertaking' | 'noStopping' | 'noParking' | 'mandatoryRight' | 'cyclePath' | 'roundabout'
  | 'parking' | 'crossing' | 'lights' | 'lineSolid' | 'lineDashed' | 'lineWarning' | 'sharkTeeth';

export const SIGN_NAME: Record<SignKind, string> = {
  warning: 'خطر', crossroads: 'تقاطع خطرناک', children: 'کودکان', roadworks: 'کار در جاده',
  yield: 'حق تقدم بدهید', stop: 'ایست', mainRoad: 'جاده‌ی اصلی', yieldOncoming: 'حق تقدم با روبه‌رو',
  noEntry: 'ورود ممنوع', speed50: 'حداکثر ۵۰', noOvertaking: 'سبقت ممنوع', noStopping: 'توقف ممنوع', noParking: 'پارک ممنوع',
  mandatoryRight: 'گردش به راست اجباری', cyclePath: 'مسیر دوچرخه', roundabout: 'میدان',
  parking: 'پارکینگ', crossing: 'گذرگاه عابر', lights: 'چراغ راهنمایی',
  lineSolid: 'خط ممتد', lineDashed: 'خط بریده', lineWarning: 'خط هشدار', sharkTeeth: 'دندان کوسه',
};

const RED = '#d32027', BLUE = '#1d5fae', YELLOW = '#f7c81e', INK = '#1b1b1b', WHITE = '#ffffff', ROAD = '#5d6166';

// A warning triangle (point up) with a symbol inside.
const Tri = ({ children }: { children?: React.ReactNode }) => (
  <G>
    <Path d="M50 6 96 88H4z" fill={RED} stroke={RED} strokeWidth={4} strokeLinejoin="round" />
    <Path d="M50 25 80 78H20z" fill={WHITE} />
    {children}
  </G>
);
// A prohibition circle: white (or blue) inside a red ring.
const Ring = ({ fill = WHITE, children }: { fill?: string; children?: React.ReactNode }) => (
  <G><Circle cx={50} cy={50} r={46} fill={RED} /><Circle cx={50} cy={50} r={34} fill={fill} />{children}</G>
);
const Blue = ({ children }: { children?: React.ReactNode }) => <G><Circle cx={50} cy={50} r={46} fill={BLUE} />{children}</G>;
const Square = ({ children }: { children?: React.ReactNode }) => <G><Rect x={6} y={6} width={88} height={88} rx={10} fill={BLUE} />{children}</G>;
const Road = ({ children }: { children?: React.ReactNode }) => <G><Rect x={4} y={4} width={92} height={92} rx={12} fill={ROAD} />{children}</G>;
const person = (x: number, y: number, s = 1, color = INK) => (
  <G fill={color} stroke={color} strokeWidth={5 * s} strokeLinecap="round">
    <Circle cx={x} cy={y} r={4.5 * s} stroke="none" />
    <Path d={`M${x} ${y + 6 * s}v${13 * s}M${x} ${y + 19 * s}l${-6 * s} ${11 * s}M${x} ${y + 19 * s}l${6 * s} ${11 * s}M${x - 6 * s} ${y + 12 * s}h${12 * s}`} fill="none" />
  </G>
);

function draw(kind: SignKind) {
  switch (kind) {
    case 'warning': return <Tri><Path d="M50 42v18" stroke={INK} strokeWidth={8} strokeLinecap="round" /><Circle cx={50} cy={69} r={4.5} fill={INK} /></Tri>;
    case 'crossroads': return <Tri><Path d="M50 38v34M36 57h28" stroke={INK} strokeWidth={8} strokeLinecap="round" /></Tri>;
    case 'children': return <Tri>{person(43, 44, 0.8)}{person(58, 48, 0.65)}</Tri>;
    case 'roadworks': return <Tri>{person(45, 42, 0.8)}<Path d="M53 60l10 12M58 74h14" stroke={INK} strokeWidth={4.5} strokeLinecap="round" /></Tri>;
    case 'yield': return <G><Path d="M4 12h92L50 94z" fill={RED} stroke={RED} strokeWidth={4} strokeLinejoin="round" /><Path d="M24 24h52L50 70z" fill={WHITE} /></G>;
    case 'stop': {
      const pts = Array.from({ length: 8 }, (_, i) => { const a = (Math.PI / 8) * (2 * i + 1); return `${50 + 46 * Math.cos(a)},${50 + 46 * Math.sin(a)}`; }).join(' ');
      return <G><Polygon points={pts} fill={RED} stroke={WHITE} strokeWidth={3} /><SvgText x={50} y={59} fontSize={25} fontWeight="bold" fill={WHITE} textAnchor="middle">STOP</SvgText></G>;
    }
    case 'mainRoad': return <G><Path d="M50 3 97 50 50 97 3 50z" fill={WHITE} stroke="#9a9a9a" strokeWidth={1.5} /><Path d="M50 18 82 50 50 82 18 50z" fill={YELLOW} /></G>;
    case 'yieldOncoming': return <Ring><Path d="M38 30v40M30 62l8 10 8-10" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" /><Path d="M62 70V34M55 41l7-9 7 9" stroke={RED} strokeWidth={4.5} fill="none" strokeLinecap="round" strokeLinejoin="round" /></Ring>;
    case 'noEntry': return <G><Circle cx={50} cy={50} r={46} fill={RED} /><Rect x={20} y={42} width={60} height={16} rx={2} fill={WHITE} /></G>;
    case 'speed50': return <Ring><SvgText x={50} y={62} fontSize={34} fontWeight="bold" fill={INK} textAnchor="middle">50</SvgText></Ring>;
    case 'noOvertaking': return <Ring><Rect x={29} y={40} width={18} height={26} rx={5} fill={RED} /><Rect x={53} y={40} width={18} height={26} rx={5} fill={INK} /></Ring>;
    case 'noStopping': return <Ring fill={BLUE}><Path d="M26 26l48 48M74 26 26 74" stroke={RED} strokeWidth={9} /></Ring>;
    case 'noParking': return <Ring fill={BLUE}><Path d="M26 26l48 48" stroke={RED} strokeWidth={9} /></Ring>;
    case 'mandatoryRight': return <Blue><Path d="M38 76V48a8 8 0 0 1 8-8h22M60 30l10 10-10 10" stroke={WHITE} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" /></Blue>;
    case 'cyclePath': return <Blue><G stroke={WHITE} strokeWidth={4.5} fill="none" strokeLinecap="round" strokeLinejoin="round"><Circle cx={32} cy={60} r={12} /><Circle cx={68} cy={60} r={12} /><Path d="M32 60l11-18h17l8 18M43 42l8 18h9M40 36h8M60 42l-3-8h6" /></G></Blue>;
    case 'roundabout': return <Blue><G stroke={WHITE} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {[0, 120, 240].map(r => <G key={r} rotation={r} origin="50, 50"><Path d="M30 40a24 24 0 0 1 26-15" /><Path d="M50 18l7 7-8 6" /></G>)}
    </G></Blue>;
    case 'parking': return <Square><SvgText x={50} y={74} fontSize={62} fontWeight="bold" fill={WHITE} textAnchor="middle">P</SvgText></Square>;
    case 'crossing': return <Square><Path d="M50 14 88 84H12z" fill={WHITE} />{person(50, 44, 0.9)}<Path d="M26 80h48" stroke={INK} strokeWidth={4} strokeDasharray="7 5" /></Square>;
    case 'lights': return <G><Rect x={30} y={4} width={40} height={92} rx={10} fill={INK} /><Circle cx={50} cy={22} r={10} fill={RED} /><Circle cx={50} cy={50} r={10} fill={YELLOW} /><Circle cx={50} cy={78} r={10} fill="#2fae4f" /></G>;
    case 'lineSolid': return <Road><Path d="M50 10v80" stroke={WHITE} strokeWidth={6} /></Road>;
    case 'lineDashed': return <Road><Path d="M50 10v80" stroke={WHITE} strokeWidth={6} strokeDasharray="10 14" /></Road>;
    case 'lineWarning': return <Road><Path d="M50 10v80" stroke={WHITE} strokeWidth={6} strokeDasharray="22 7" /></Road>;
    case 'sharkTeeth': return <Road>{[14, 34, 54, 74].map(x => <Path key={x} d={`M${x} 40h14l-7 20z`} fill={WHITE} />)}</Road>;
  }
}

export function RoadSign({ kind, size = 56 }: { kind: SignKind; size?: number }) {
  return <Svg width={size} height={size} viewBox="0 0 100 100" accessibilityLabel={SIGN_NAME[kind]}>{draw(kind)}</Svg>;
}
