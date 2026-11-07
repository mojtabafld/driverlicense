import type { ViewStyle } from 'react-native';

import { SOFT, useColors, useIsDark, useM3 } from './theme';

export const SHEET_INSET = 16;
export const sheetWidth = (width: number) => Math.min(Math.max(0, width - SHEET_INSET * 2), 560);

// One consistent outline and gap on every edge; safe areas only affect the contents.
export function useSheetFrame(): ViewStyle {
  const c = useColors(), dark = useIsDark(), m = useM3();
  // (Material 3's sheet: corners 28, the surface container a step above the page, no outline; Mojtaba 2026-11-07)
  return {
    borderRadius: SOFT ? 28 : 36,
    borderCurve: 'continuous',
    backgroundColor: SOFT ? m.dialog : c.surface,
    borderWidth: SOFT ? 0 : 1,
    borderColor: dark ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.9)',
    shadowColor: '#000000',
    shadowOpacity: dark ? 0.24 : 0.1,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  };
}
