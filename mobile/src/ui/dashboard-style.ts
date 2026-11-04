import { createContext } from 'react';
import { mix } from './palette';
import { useColors, useIsDark } from './theme';

export const DashboardContext = createContext(false);

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
