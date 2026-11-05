import { createContext } from 'react';
import { mix } from './palette';
import { useColors, useIsDark } from './theme';

export const DashboardContext = createContext(false);
// The cards' corner on the four tab pages (home, learning, exam, settings; ui/kit.tsx Screen): squarer than elsewhere
// (Mojtaba 2026-11-05: 14, it was 22, and 26 on the dashboards). Null outside them.
export const TAB_CARD_RADIUS = 14;
export const CardRadiusContext = createContext<number | null>(null);

export function useDashboardLook() {
  const c = useColors(), dark = useIsDark();
  return {
    dark,
    edge: mix(c.link, c.surface, dark ? 0.91 : 0.96),
    wash: mix(c.link, c.surface, dark ? 0.87 : 0.94),
    row: mix(c.link, c.surface, dark ? 0.96 : 0.98),
    hero: mix(c.link, c.surface, dark ? 0.92 : 0.96),
  };
}
