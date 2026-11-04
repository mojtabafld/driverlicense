import { mix } from '../palette';
import { useColors, useIsDark } from '../theme';

export const TAB_BAR_H = 72;
export const TAB_PAD = 7;
export const TAB_GAP = 6;
export const TAB_ITEM_H = TAB_BAR_H - 2 - TAB_PAD * 2;

export function tabLayout(width: number, home: boolean, activeLabel: string) {
  const rowWidth = Math.min(Math.max(0, width - 32), 440);
  const startSize = width < 360 ? 44 : 56;
  const railWidth = rowWidth - (home ? startSize + 8 : 0);
  const available = railWidth - 2 - TAB_PAD * 2 - TAB_GAP * 3;
  const labelRoom = Math.min(152, Math.max(104, activeLabel.length * 9 + 56));
  const circle = Math.min(TAB_ITEM_H, Math.max(38, (available - labelRoom) / 3));
  return { rowWidth, startSize, railWidth, circle, activeWidth: available - circle * 3, compact: circle < 44 };
}

export type TabLayout = ReturnType<typeof tabLayout>;

export function useTabLook() {
  const c = useColors(), dark = useIsDark();
  const rail = mix(c.accent, c.surface2, dark ? 0.88 : 0.92);
  return {
    rail,
    edge: mix(c.accent, rail, 0.8),
    circle: mix(c.accent, rail, dark ? 0.86 : 0.9),
    muted: mix(c.link, c.text, dark ? 0.65 : 0.45),
    active: dark ? mix(c.accent, '#ffffff', 0.9) : c.surface,
    onActive: dark ? mix(c.accent, '#0b0d18', 0.82) : mix(c.link, c.text, 0.18),
  };
}
