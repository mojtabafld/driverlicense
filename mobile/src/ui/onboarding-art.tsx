// Flat illustrations for the intro slides, drawn in the app's own colours on its navy background (a 300 × 260 grid).
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop, Text as SvgText } from 'react-native-svg';

const C = {
  white: '#ffffff', pale: '#d9e9f6', sky: '#8cc3ef', mid: '#3d8fd1', navy: '#024776', ink: '#0d2433', phone: '#16232e',
  green: '#5cc47a', red: '#e5534b', yellow: '#f0b24a', shadow: 'rgba(0,0,0,0.18)', line: '#5fb3ef',
};

// A dotted connector from the phone to one of the things around it.
const Link = ({ d }: { d: string }) => <Path d={d} stroke={C.line} strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.85} />;
const Dot = ({ x, y }: { x: number; y: number }) => <Circle cx={x} cy={y} r={4.5} fill={C.line} />;

// The app's logo: a rounded navy square with a speedometer.
function LogoMark({ x, y, s }: { x: number; y: number; s: number }) {
  const k = s / 32;
  return (
    <G transform={`translate(${x} ${y}) scale(${k})`}>
      <Rect x={2} y={2} width={28} height={28} rx={9} fill={C.navy} />
      <Path d="M9 20.5c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <Circle cx={16} cy={20.5} r={2.2} fill="#fff" />
      <Path d="M16 20.5l3.2-3.8" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" />
    </G>
  );
}

function Phone({ x, y, w = 70, h = 136, children }: { x: number; y: number; w?: number; h?: number; children?: React.ReactNode }) {
  return (
    <G>
      <Ellipse cx={x + w / 2} cy={y + h + 10} rx={w * 0.75} ry={9} fill={C.shadow} />
      <Rect x={x} y={y} width={w} height={h} rx={14} fill={C.phone} />
      <Rect x={x + 5} y={y + 6} width={w - 10} height={h - 12} rx={10} fill={C.white} />
      <Rect x={x + w / 2 - 12} y={y + 9} width={24} height={5} rx={2.5} fill={C.phone} />
      {children}
    </G>
  );
}

// 1. Every question, with pictures and a Persian translation: the phone in the middle with a car, a licence, and
// road signs around it.
export function ArtBank() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 300 260">
      <Link d="M115 110 C 95 100, 90 85, 70 82" /><Dot x={70} y={82} />
      <Link d="M185 100 C 205 95, 210 75, 228 72" /><Dot x={228} y={72} />
      <Link d="M115 160 C 95 175, 85 185, 66 186" /><Dot x={66} y={186} />
      <Link d="M185 165 C 205 175, 215 190, 232 188" /><Dot x={232} y={188} />
      <Phone x={115} y={58}>
        <LogoMark x={128} y={100} s={44} />
        <Rect x={130} y={152} width={40} height={5} rx={2.5} fill={C.pale} />
        <Rect x={136} y={162} width={28} height={5} rx={2.5} fill={C.pale} />
      </Phone>
      {/* Car */}
      <G>
        <Ellipse cx={52} cy={88} rx={38} ry={6} fill={C.shadow} />
        <Path d="M18 76 q2 -12 14 -14 l10 -10 q4 -4 12 -4 h14 q8 0 12 6 l8 10 q10 2 10 12 v6 h-80 z" fill={C.sky} />
        <Path d="M44 54 h12 v10 h-20 z M60 54 h8 q5 0 8 4 l4 6 h-20 z" fill={C.white} opacity={0.9} />
        <Rect x={16} y={74} width={84} height={6} rx={3} fill={C.mid} />
        <Circle cx={36} cy={82} r={8} fill={C.ink} /><Circle cx={36} cy={82} r={3.5} fill={C.pale} />
        <Circle cx={82} cy={82} r={8} fill={C.ink} /><Circle cx={82} cy={82} r={3.5} fill={C.pale} />
      </G>
      {/* Driving licence */}
      <G>
        <Rect x={216} y={30} width={74} height={50} rx={7} fill={C.white} />
        <Rect x={216} y={30} width={74} height={13} rx={7} fill={C.mid} />
        <Rect x={216} y={38} width={74} height={5} fill={C.mid} />
        <SvgText x={224} y={40.5} fill={C.white} fontSize={8} fontWeight="bold">DK</SvgText>
        <Circle cx={233} cy={60} r={9} fill={C.pale} /><Circle cx={233} cy={57} r={4} fill={C.sky} />
        <Path d="M225 68 q8 -8 16 0" fill={C.sky} />
        <Rect x={248} y={52} width={34} height={4} rx={2} fill={C.pale} />
        <Rect x={248} y={60} width={26} height={4} rx={2} fill={C.pale} />
        <Rect x={248} y={68} width={30} height={4} rx={2} fill={C.pale} />
      </G>
      {/* Stop sign */}
      <G>
        <Rect x={44} y={186} width={4} height={44} rx={2} fill={C.pale} />
        <Ellipse cx={46} cy={231} rx={12} ry={3} fill={C.shadow} />
        <Path d="M38 160 h16 l11 11 v16 l-11 11 h-16 l-11 -11 v-16 z" fill={C.red} stroke={C.white} strokeWidth={2.5} />
        <SvgText x={46} y={183} fill={C.white} fontSize={9.5} fontWeight="bold" textAnchor="middle">STOP</SvgText>
      </G>
      {/* Give way and a blue sign */}
      <G>
        <Rect x={240} y={190} width={4} height={42} rx={2} fill={C.pale} />
        <Ellipse cx={242} cy={233} rx={11} ry={3} fill={C.shadow} />
        <Path d="M226 168 h32 l-16 28 z" fill={C.white} stroke={C.red} strokeWidth={4} strokeLinejoin="round" />
        <Rect x={270} y={196} width={3.5} height={36} rx={1.75} fill={C.pale} />
        <Circle cx={272} cy={190} r={11} fill={C.mid} stroke={C.white} strokeWidth={2} />
        <Path d="M267 194 l5 -8 l5 8" stroke={C.white} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </G>
    </Svg>
  );
}

// 2. An exam like the real one: a test sheet with ticks, a stopwatch, and a pass badge.
export function ArtExam() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 300 260">
      <Ellipse cx={150} cy={236} rx={100} ry={12} fill={C.shadow} />
      {/* Sheet */}
      <G>
        <Rect x={86} y={34} width={128} height={190} rx={14} fill={C.white} />
        <Rect x={124} y={24} width={52} height={20} rx={8} fill={C.mid} />
        <Rect x={100} y={58} width={100} height={52} rx={8} fill={C.pale} />
        <Path d="M108 102 l18 -24 l14 16 l10 -10 l14 18 z" fill={C.sky} />
        <Circle cx={182} cy={72} r={6} fill={C.yellow} />
        {[124, 150, 176].map((y, i) => (
          <G key={y}>
            <Rect x={100} y={y} width={18} height={18} rx={5} fill={i === 1 ? C.white : C.navy} stroke={C.navy} strokeWidth={2} />
            {i !== 1 ? <Path d={`M104 ${y + 9} l4 4 l7 -8`} stroke={C.white} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" /> : null}
            <Rect x={126} y={y + 3} width={i === 2 ? 52 : 70} height={5} rx={2.5} fill={C.pale} />
            <Rect x={126} y={y + 11} width={i === 0 ? 44 : 36} height={4} rx={2} fill={C.pale} />
          </G>
        ))}
        <Rect x={100} y={204} width={100} height={8} rx={4} fill={C.pale} />
        <Rect x={100} y={204} width={80} height={8} rx={4} fill={C.green} />
      </G>
      {/* Stopwatch */}
      <G>
        <Rect x={46} y={58} width={14} height={8} rx={3} fill={C.pale} />
        <Circle cx={53} cy={96} r={30} fill={C.white} />
        <Circle cx={53} cy={96} r={24} fill="none" stroke={C.pale} strokeWidth={5} />
        <Path d="M53 72 A24 24 0 1 1 30 102" fill="none" stroke={C.mid} strokeWidth={5} strokeLinecap="round" />
        <Path d="M53 96 V82 M53 96 l8 6" stroke={C.navy} strokeWidth={3} strokeLinecap="round" />
        <Circle cx={53} cy={96} r={3} fill={C.navy} />
      </G>
      {/* Pass badge */}
      <G>
        <Circle cx={246} cy={170} r={32} fill={C.green} />
        <Circle cx={246} cy={170} r={25} fill="none" stroke={C.white} strokeWidth={2} opacity={0.6} />
        <Path d="M233 171 l9 9 l17 -19" stroke={C.white} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M230 198 l-6 22 l11 -5 l6 10 l5 -22 z M262 198 l6 22 l-11 -5 l-6 10 l-5 -22 z" fill={C.yellow} />
      </G>
    </Svg>
  );
}

// 3. The AI tutor: a conversation on the phone (your question, its explanation) with sparkles around it.
export function ArtAi() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 300 260">
      <Defs>
        <LinearGradient id="ai" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#5fb3ef" /><Stop offset="1" stopColor="#3d6fd1" />
        </LinearGradient>
      </Defs>
      <Phone x={96} y={30} w={108} h={196}>
        {/* Question picture */}
        <Rect x={110} y={52} width={80} height={46} rx={8} fill={C.pale} />
        <Path d="M116 92 l20 -26 l14 16 l10 -10 l22 20 z" fill={C.sky} />
        {/* Your wrong answer */}
        <Rect x={130} y={108} width={60} height={22} rx={10} fill="#fdeceb" />
        <Path d="M138 115 l8 8 M146 115 l-8 8" stroke={C.red} strokeWidth={2.4} strokeLinecap="round" />
        <Rect x={152} y={116} width={30} height={5} rx={2.5} fill="#f3b9b4" />
        {/* The AI's explanation */}
        <Rect x={108} y={138} width={78} height={62} rx={12} fill="url(#ai)" />
        <Path d="M120 152 l2.5 6 l6 2.5 l-6 2.5 l-2.5 6 l-2.5 -6 l-6 -2.5 l6 -2.5 z" fill={C.white} />
        <Rect x={134} y={152} width={42} height={5} rx={2.5} fill={C.white} opacity={0.9} />
        <Rect x={134} y={162} width={34} height={5} rx={2.5} fill={C.white} opacity={0.7} />
        <Rect x={116} y={176} width={60} height={5} rx={2.5} fill={C.white} opacity={0.7} />
        <Rect x={116} y={186} width={44} height={5} rx={2.5} fill={C.white} opacity={0.7} />
      </Phone>
      {/* Sparkles */}
      <Path d="M56 70 l6 16 l16 6 l-16 6 l-6 16 l-6 -16 l-16 -6 l16 -6 z" fill={C.white} />
      <Path d="M246 54 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 z" fill={C.sky} />
      <Path d="M252 160 l5 13 l13 5 l-13 5 l-5 13 l-5 -13 l-13 -5 l13 -5 z" fill={C.white} />
      <Path d="M48 176 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 z" fill={C.sky} />
      {/* "AI" chip */}
      <G>
        <Rect x={214} y={104} width={50} height={30} rx={15} fill={C.white} />
        <SvgText x={239} y={124} fill={C.navy} fontSize={15} fontWeight="bold" textAnchor="middle">AI</SvgText>
      </G>
    </Svg>
  );
}

// 4. Progress: a card with a rising line above the pass line, bars per week, and a target.
export function ArtProgress() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 300 260">
      <Ellipse cx={150} cy={234} rx={112} ry={12} fill={C.shadow} />
      <Rect x={40} y={46} width={220} height={176} rx={18} fill={C.white} />
      <Rect x={58} y={62} width={70} height={7} rx={3.5} fill={C.pale} />
      <Rect x={58} y={75} width={44} height={6} rx={3} fill={C.pale} />
      {/* Pass line */}
      <Path d="M58 120 H242" stroke={C.green} strokeWidth={2} strokeDasharray="6 5" />
      {/* Bars */}
      {[[66, 168], [96, 150], [126, 140], [156, 120], [186, 106], [216, 96]].map(([x, y], i) => (
        <Rect key={x} x={x} y={y} width={18} height={204 - y} rx={5} fill={i === 5 ? C.mid : C.pale} />
      ))}
      {/* Rising line */}
      <Path d="M75 160 L105 146 L135 136 L165 112 L195 100 L225 84" stroke={C.navy} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {[[75, 160], [105, 146], [135, 136], [165, 112], [195, 100]].map(([x, y]) => <Circle key={x} cx={x} cy={y} r={4} fill={C.white} stroke={C.navy} strokeWidth={2.5} />)}
      <Circle cx={225} cy={84} r={7} fill={C.navy} /><Circle cx={225} cy={84} r={3} fill={C.white} />
      {/* Target */}
      <G>
        <Circle cx={252} cy={52} r={26} fill={C.red} />
        <Circle cx={252} cy={52} r={18} fill={C.white} />
        <Circle cx={252} cy={52} r={10} fill={C.red} />
        <Path d="M252 52 L280 24" stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
        <Path d="M276 20 l10 -2 l-2 10 z" fill={C.yellow} />
      </G>
      {/* Percent bubble */}
      <G>
        <Rect x={22} y={110} width={58} height={30} rx={15} fill={C.green} />
        <SvgText x={51} y={130} fill={C.white} fontSize={14} fontWeight="bold" textAnchor="middle">92%</SvgText>
      </G>
    </Svg>
  );
}
