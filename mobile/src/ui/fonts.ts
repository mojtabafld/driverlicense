// Vazirmatn, the site's Persian font, bundled (only the five weights used) with the app (no network needed). Each weight is its own family, so a
// weight is chosen by family name on every platform.
import { Vazirmatn_400Regular } from '@expo-google-fonts/vazirmatn/400Regular';
import { Vazirmatn_500Medium } from '@expo-google-fonts/vazirmatn/500Medium';
import { Vazirmatn_600SemiBold } from '@expo-google-fonts/vazirmatn/600SemiBold';
import { Vazirmatn_700Bold } from '@expo-google-fonts/vazirmatn/700Bold';
import { Vazirmatn_800ExtraBold } from '@expo-google-fonts/vazirmatn/800ExtraBold';
import { Geist_400Regular } from '@expo-google-fonts/geist/400Regular';
import { Geist_400Regular_Italic } from '@expo-google-fonts/geist/400Regular_Italic';
import { Geist_500Medium } from '@expo-google-fonts/geist/500Medium';
import { Geist_600SemiBold } from '@expo-google-fonts/geist/600SemiBold';
import { Geist_700Bold } from '@expo-google-fonts/geist/700Bold';
import type { TextStyle } from 'react-native';

import { PROVE_PICS } from '@/lib/config';

// Arc (src/ui/theme.ts) sets type in two weights, 400 and 500: hierarchy comes from size, colour and spacing. So on
// the main site and in the app a heavier weight is drawn as 500; the /app copy keeps its bold.
const MAX_FA = PROVE_PICS ? 800 : 500, MAX_DA = PROVE_PICS ? 700 : 500;

export const FA_FONTS = {
  'Vazirmatn-400': Vazirmatn_400Regular, 'Vazirmatn-500': Vazirmatn_500Medium, 'Vazirmatn-600': Vazirmatn_600SemiBold,
  'Vazirmatn-700': Vazirmatn_700Bold, 'Vazirmatn-800': Vazirmatn_800ExtraBold,
};

// The font of the Danish / English text (questions, statements, explanations), bundled the same way as Vazirmatn:
// Geist (SIL Open Font License; Mojtaba 2026-11-07: more minimal than Inter, which it replaced) in four weights and
// the regular italic.
export const DA_FONTS = {
  'Geist-400': Geist_400Regular, 'Geist-500': Geist_500Medium, 'Geist-600': Geist_600SemiBold, 'Geist-700': Geist_700Bold,
  'Geist-400i': Geist_400Regular_Italic,
};
// The regular family, for text that sets no weight.
export const DA_REGULAR = 'Geist-400';

// The family for a fontWeight and italic, and whether the italic must be slanted by the browser (never: Geist has
// its own italic).
export function daFamily(weight: TextStyle['fontWeight'], italic?: boolean): { family: string; slant: boolean } {
  const w = weight === 'bold' ? 700 : weight === 'normal' || weight == null ? 400 : Number(weight) || 400;
  if (italic) return { family: 'Geist-400i', slant: false };
  return { family: `Geist-${Math.min(MAX_DA, Math.max(400, Math.round(w / 100) * 100))}`, slant: false };
}

// The Vazirmatn family for a fontWeight ('bold' → 700; lighter → 400, heavier → 800).
export function faFamily(weight: TextStyle['fontWeight']): string {
  const w = weight === 'bold' ? 700 : weight === 'normal' || weight == null ? 400 : Number(weight) || 400;
  return `Vazirmatn-${Math.min(MAX_FA, Math.max(400, Math.round(w / 100) * 100))}`;
}
