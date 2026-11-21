// Vazirmatn, the site's Persian font, bundled (only the five weights used) with the app (no network needed). Each weight is its own family, so a
// weight is chosen by family name on every platform.
import { Vazirmatn_400Regular } from '@expo-google-fonts/vazirmatn/400Regular';
import { Vazirmatn_500Medium } from '@expo-google-fonts/vazirmatn/500Medium';
import { Vazirmatn_600SemiBold } from '@expo-google-fonts/vazirmatn/600SemiBold';
import { Vazirmatn_700Bold } from '@expo-google-fonts/vazirmatn/700Bold';
import { Vazirmatn_800ExtraBold } from '@expo-google-fonts/vazirmatn/800ExtraBold';
import { GoogleSansFlex_400Regular } from '@expo-google-fonts/google-sans-flex/400Regular';
import { GoogleSansFlex_500Medium } from '@expo-google-fonts/google-sans-flex/500Medium';
import { GoogleSansFlex_600SemiBold } from '@expo-google-fonts/google-sans-flex/600SemiBold';
import { GoogleSansFlex_700Bold } from '@expo-google-fonts/google-sans-flex/700Bold';
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
// Google Sans Flex (SIL Open Font License; Mojtaba 2026-11-08, the type of fonts.google.com and Material 3, in place
// of Geist, which replaced Inter on 2026-11-07) in four weights. It has no italic: the browser slants the regular.
export const DA_FONTS = {
  'GSans-400': GoogleSansFlex_400Regular, 'GSans-500': GoogleSansFlex_500Medium, 'GSans-600': GoogleSansFlex_600SemiBold, 'GSans-700': GoogleSansFlex_700Bold,
};
// The regular family, for text that sets no weight.
export const DA_REGULAR = 'GSans-400';

// The family for a fontWeight and italic, and whether the italic must be slanted by the browser (always: no italic of
// its own).
export function daFamily(weight: TextStyle['fontWeight'], italic?: boolean): { family: string; slant: boolean } {
  const w = weight === 'bold' ? 700 : weight === 'normal' || weight == null ? 400 : Number(weight) || 400;
  if (italic) return { family: 'GSans-400', slant: true };
  return { family: `GSans-${Math.min(MAX_DA, Math.max(400, Math.round(w / 100) * 100))}`, slant: false };
}

// The Vazirmatn family for a fontWeight ('bold' → 700; lighter → 400, heavier → 800).
export function faFamily(weight: TextStyle['fontWeight']): string {
  const w = weight === 'bold' ? 700 : weight === 'normal' || weight == null ? 400 : Number(weight) || 400;
  return `Vazirmatn-${Math.min(MAX_FA, Math.max(400, Math.round(w / 100) * 100))}`;
}
