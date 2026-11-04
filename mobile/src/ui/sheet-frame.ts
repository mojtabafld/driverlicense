import type { ViewStyle } from 'react-native';

import { useColors, useIsDark } from './theme';

export const SHEET_INSET = 8;
export const sheetWidth = (width: number) => Math.min(Math.max(0, width - SHEET_INSET * 2), 560);

// The same softly outlined frame for every bottom popup, slightly inset at the sides.
export function useSheetFrame(): ViewStyle {
  const c = useColors(), dark = useIsDark();
  return {
    borderRadius: 36,
    borderCurve: 'continuous',
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: dark ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.9)',
    shadowColor: '#000000',
    shadowOpacity: dark ? 0.24 : 0.1,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  };
}
