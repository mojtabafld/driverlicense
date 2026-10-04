// Vazirmatn, the site's Persian font, bundled (only the five weights used) with the app (no network needed). Each weight is its own family, so a
// weight is chosen by family name on every platform.
import { Vazirmatn_400Regular } from '@expo-google-fonts/vazirmatn/400Regular';
import { Vazirmatn_500Medium } from '@expo-google-fonts/vazirmatn/500Medium';
import { Vazirmatn_600SemiBold } from '@expo-google-fonts/vazirmatn/600SemiBold';
import { Vazirmatn_700Bold } from '@expo-google-fonts/vazirmatn/700Bold';
import { Vazirmatn_800ExtraBold } from '@expo-google-fonts/vazirmatn/800ExtraBold';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_400Regular_Italic } from '@expo-google-fonts/inter/400Regular_Italic';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import type { TextStyle } from 'react-native';

export const FA_FONTS = {
  'Vazirmatn-400': Vazirmatn_400Regular, 'Vazirmatn-500': Vazirmatn_500Medium, 'Vazirmatn-600': Vazirmatn_600SemiBold,
  'Vazirmatn-700': Vazirmatn_700Bold, 'Vazirmatn-800': Vazirmatn_800ExtraBold,
};

// The font of the Danish / English text (questions, statements, explanations), bundled the same way as Vazirmatn:
// 'uber' (in use): Uber Move, Medium for running text and Bold for the question and anything 600 or heavier;
// 'inter' (the look before, kept): Inter in four weights and the regular italic.
export const LATIN: 'uber' | 'inter' = 'uber';

const INTER = {
  'Inter-400': Inter_400Regular, 'Inter-500': Inter_500Medium, 'Inter-600': Inter_600SemiBold, 'Inter-700': Inter_700Bold,
  'Inter-400i': Inter_400Regular_Italic,
};
const UBER_MOVE = {
  'UberMove-500': require('../../assets/fonts/UberMove-Medium.otf'), 'UberMove-700': require('../../assets/fonts/UberMove-Bold.otf'),
};
export const DA_FONTS = LATIN === 'uber' ? UBER_MOVE : INTER;
// The regular family, for text that sets no weight.
export const DA_REGULAR = LATIN === 'uber' ? 'UberMove-500' : 'Inter-400';

// The family for a fontWeight and italic, and whether the italic must be slanted by the browser (Uber Move has none).
export function daFamily(weight: TextStyle['fontWeight'], italic?: boolean): { family: string; slant: boolean } {
  const w = weight === 'bold' ? 700 : weight === 'normal' || weight == null ? 400 : Number(weight) || 400;
  if (LATIN === 'uber') return { family: w >= 600 ? 'UberMove-700' : 'UberMove-500', slant: !!italic };
  if (italic) return { family: 'Inter-400i', slant: false };
  return { family: `Inter-${Math.min(700, Math.max(400, Math.round(w / 100) * 100))}`, slant: false };
}

// The Vazirmatn family for a fontWeight ('bold' → 700; lighter → 400, heavier → 800).
export function faFamily(weight: TextStyle['fontWeight']): string {
  const w = weight === 'bold' ? 700 : weight === 'normal' || weight == null ? 400 : Number(weight) || 400;
  return `Vazirmatn-${Math.min(800, Math.max(400, Math.round(w / 100) * 100))}`;
}
