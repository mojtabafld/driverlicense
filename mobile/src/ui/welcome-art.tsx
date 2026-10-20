// The four pictures of the sign-in page's slides (ui/welcome.tsx), one for each subject of the intro: bold flat icons
// in the style of Mojtaba's reference (2026-10-20, a solid blue camera): one solid shape in the theme's colour with
// white details and dark cut-outs (`hole`: the page's black in the dark theme, the text's dark in the light one, as the
// camera's lens), no shading (a 120 × 100 grid).
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

type Art = { fg: string; hole: string };
const Box = ({ children }: { children: React.ReactNode }) => <Svg width="100%" height="100%" viewBox="0 0 120 100">{children}</Svg>;

// Every question of the test with its translation (Mojtaba 2026-10-20, a new picture): a fan of question cards, the
// front one with a warning sign and two answers, and a round badge with arrows both ways for the translation.
export function WelcomeBank({ fg, hole }: Art) {
  return (
    <Box>
      <Rect x={30} y={14} width={56} height={72} rx={12} fill={fg} opacity={0.35} transform="rotate(-14 58 50)" />
      <Rect x={34} y={12} width={56} height={72} rx={12} fill={fg} opacity={0.6} transform="rotate(-6 62 48)" />
      <Rect x={40} y={10} width={56} height={74} rx={12} fill={fg} />
      <Path d="M68 21 L81 43 H55 Z" fill="#fff" stroke="#fff" strokeWidth={5} strokeLinejoin="round" />
      <Path d="M68 29 L74.5 40 H61.5 Z" fill={fg} />
      <Rect x={50} y={54} width={36} height={6} rx={3} fill="#fff" />
      <Rect x={50} y={66} width={26} height={6} rx={3} fill="#fff" opacity={0.7} />
      <Circle cx={92} cy={78} r={17} fill={hole} />
      <Path d="M84 74 H99 M95 70 L99 74 L95 78" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M100 83 H85 M89 79 L85 83 L89 87" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
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

// Seeing the progress and the chance of passing.
export function WelcomeProgress({ fg, hole }: Art) {
  // A gauge, as a speedometer: its white arc over the top, the needle well into the passing side (redrawn, Mojtaba
  // 2026-10-20; before, rising bars with a tick).
  return (
    <Box>
      <Circle cx={60} cy={56} r={44} fill={fg} />
      <Path d="M31.8 66.3 A30 30 0 1 1 88.2 66.3" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" opacity={0.45} />
      <Path d="M31.8 66.3 A30 30 0 0 1 81.2 34.8" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" />
      <Path d="M60 56 L77 39" stroke={hole} strokeWidth={6} strokeLinecap="round" />
      <Circle cx={60} cy={56} r={7.5} fill={hole} />
      <Circle cx={60} cy={56} r={3} fill="#fff" />
      <Rect x={47} y={76} width={26} height={8} rx={4} fill="#fff" />
    </Box>
  );
}
