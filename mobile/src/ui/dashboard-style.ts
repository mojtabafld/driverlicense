import { createContext } from 'react';
import { PALETTE, mix } from './palette';
import { SOFT, useColors, useIsDark } from './theme';

export const DashboardContext = createContext(false);
// The cards' corner on the four tab pages (home, learning, exam, settings; ui/kit.tsx Screen): squarer than elsewhere
// (Mojtaba 2026-11-05: 6, it was 10, 14 and before that 22, and 26 on the dashboards). Null outside them.
// («نرم», 2026-11-05: 28, the large soft corners of his pictures; 6 before it.)
export const TAB_CARD_RADIUS = SOFT ? 16 : 6;   // (16 since 2026-11-05 evening: squarer, he asked; it was 28)
export const CardRadiusContext = createContext<number | null>(null);

export function useDashboardLook() {
  const c = useColors(), dark = useIsDark();
  // («نرم»: neutral greys, no tint of the theme's colour in the surfaces)
  // (no outline round the cards in «سنگی» dark: Material 3's cards are a surface without one; Mojtaba 2026-11-07)
  if (SOFT) return { dark, edge: dark && PALETTE === 'slate' ? c.surface : c.line, wash: c.surface2, row: c.surface2, hero: c.surface };
  return {
    dark,
    edge: mix(c.link, c.surface, dark ? 0.91 : 0.96),
    wash: mix(c.link, c.surface, dark ? 0.87 : 0.94),
    row: mix(c.link, c.surface, dark ? 0.96 : 0.98),
    hero: mix(c.link, c.surface, dark ? 0.92 : 0.96),
  };
}
