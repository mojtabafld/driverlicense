// The four pictures of the sign-in page's slides (ui/welcome.tsx), one for each subject of the intro: bold flat icons
// in the style of Mojtaba's reference (2026-10-20, a solid blue camera): one solid shape in the theme's colour with
// white details and dark cut-outs (`hole`: the page's black in the dark theme, the text's dark in the light one, as the
// camera's lens), no shading (a 120 × 100 grid).
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

type Art = { fg: string; hole: string };
const Box = ({ children }: { children: React.ReactNode }) => <Svg width="100%" height="100%" viewBox="0 0 120 100">{children}</Svg>;

// The question bank in the pocket: a phone with a question on it (a warning sign and two answers).
export function WelcomeBank({ fg, hole }: Art) {
  return (
    <Box>
      <Rect x={33} y={4} width={54} height={92} rx={13} fill={fg} />
      <Rect x={39} y={14} width={42} height={70} rx={6} fill="#fff" />
      <Rect x={53} y={8} width={14} height={3} rx={1.5} fill={hole} />
      <Path d="M60 22 L71 41 H49 Z" fill={fg} stroke={fg} strokeWidth={4} strokeLinejoin="round" />
      <Path d="M60 29 L65.5 38.5 H54.5 Z" fill="#fff" />
      <Circle cx={47} cy={55} r={3.5} fill={fg} />
      <Rect x={54} y={52.5} width={21} height={5} rx={2.5} fill={fg} opacity={0.35} />
      <Circle cx={47} cy={68} r={3.5} fill="none" stroke={fg} strokeWidth={2} />
      <Rect x={54} y={65.5} width={16} height={5} rx={2.5} fill={fg} opacity={0.35} />
      <Rect x={52} y={88} width={16} height={3} rx={1.5} fill="#fff" opacity={0.7} />
    </Box>
  );
}

// The exam as on the day: a stopwatch.
export function WelcomeExam({ fg, hole }: Art) {
  return (
    <Box>
      <Rect x={52} y={4} width={16} height={9} rx={3} fill={fg} />
      <Rect x={57} y={11} width={6} height={8} fill={fg} />
      <Rect x={84} y={16} width={10} height={12} rx={3} fill={fg} transform="rotate(42 89 22)" />
      <Circle cx={60} cy={57} r={39} fill={fg} />
      <Circle cx={60} cy={57} r={29} fill="#fff" />
      <Circle cx={60} cy={57} r={22} fill={hole} />
      <Path d="M60 57 L60 40" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
      <Path d="M60 57 L71 63" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
      <Circle cx={60} cy={57} r={4.5} fill={fg} />
      <Circle cx={74} cy={45} r={3} fill="#fff" />
    </Box>
  );
}

// The AI by the user's side: a speech bubble with sparkles.
export function WelcomeAi({ fg, hole }: Art) {
  const star = (x: number, y: number, r: number) => `M${x} ${y - r} C${x + r * 0.12} ${y - r * 0.12} ${x + r * 0.12} ${y - r * 0.12} ${x + r} ${y} C${x + r * 0.12} ${y + r * 0.12} ${x + r * 0.12} ${y + r * 0.12} ${x} ${y + r} C${x - r * 0.12} ${y + r * 0.12} ${x - r * 0.12} ${y + r * 0.12} ${x - r} ${y} C${x - r * 0.12} ${y - r * 0.12} ${x - r * 0.12} ${y - r * 0.12} ${x} ${y - r} Z`;
  return (
    <Box>
      <G>
        <Rect x={14} y={10} width={92} height={66} rx={22} fill={fg} />
        <Path d="M34 70 L30 94 L56 74 Z" fill={fg} stroke={fg} strokeWidth={4} strokeLinejoin="round" />
      </G>
      <Circle cx={60} cy={43} r={24} fill="#fff" />
      <Path d={star(60, 43, 16)} fill={hole} />
      <Path d={star(77, 24, 7)} fill="#fff" />
      <Circle cx={42} cy={64} r={3} fill="#fff" />
    </Box>
  );
}

// Seeing the progress: a card with rising bars and a tick.
export function WelcomeProgress({ fg, hole }: Art) {
  return (
    <Box>
      <Rect x={18} y={8} width={84} height={84} rx={22} fill={fg} />
      <Rect x={32} y={56} width={12} height={22} rx={4} fill="#fff" />
      <Rect x={50} y={44} width={12} height={34} rx={4} fill="#fff" />
      <Rect x={68} y={30} width={12} height={48} rx={4} fill="#fff" />
      <Circle cx={84} cy={24} r={13} fill={hole} />
      <Path d="M78.5 24 l4 4 l7.5 -8" fill="none" stroke="#fff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
    </Box>
  );
}
