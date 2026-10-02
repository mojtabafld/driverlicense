// Vazirmatn, the site's Persian font, bundled (only the five weights used) with the app (no network needed). Each weight is its own family, so a
// weight is chosen by family name on every platform.
import { Vazirmatn_400Regular } from '@expo-google-fonts/vazirmatn/400Regular';
import { Vazirmatn_500Medium } from '@expo-google-fonts/vazirmatn/500Medium';
import { Vazirmatn_600SemiBold } from '@expo-google-fonts/vazirmatn/600SemiBold';
import { Vazirmatn_700Bold } from '@expo-google-fonts/vazirmatn/700Bold';
import { Vazirmatn_800ExtraBold } from '@expo-google-fonts/vazirmatn/800ExtraBold';
import type { TextStyle } from 'react-native';

export const FA_FONTS = {
  'Vazirmatn-400': Vazirmatn_400Regular, 'Vazirmatn-500': Vazirmatn_500Medium, 'Vazirmatn-600': Vazirmatn_600SemiBold,
  'Vazirmatn-700': Vazirmatn_700Bold, 'Vazirmatn-800': Vazirmatn_800ExtraBold,
};

// The Vazirmatn family for a fontWeight ('bold' → 700; lighter → 400, heavier → 800).
export function faFamily(weight: TextStyle['fontWeight']): string {
  const w = weight === 'bold' ? 700 : weight === 'normal' || weight == null ? 400 : Number(weight) || 400;
  return `Vazirmatn-${Math.min(800, Math.max(400, Math.round(w / 100) * 100))}`;
}
