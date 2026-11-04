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

function luminance(color: string) {
  const rgb = [1, 3, 5].map(i => {
    const v = parseInt(color.slice(i, i + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}

// Keep the palette's preferred ink whenever it stays readable on the filled pill.
function textOn(fill: string, preferred: string) {
  const a = luminance(fill), b = luminance(preferred);
  if ((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) >= 4.5) return preferred;
  return a > 0.179 ? '#000000' : '#ffffff';
}

export function useTabLook() {
  const c = useColors(), dark = useIsDark();
  const rail = mix(c.accent, c.surface2, dark ? 0.88 : 0.92);
  // A softer accent fill, blended with the theme's card colour in both modes.
  const active = mix(c.accent, c.surface, dark ? 0.48 : 0.12);
  return {
    rail,
    edge: mix(c.accent, rail, 0.8),
    circle: mix(c.accent, rail, dark ? 0.86 : 0.9),
    muted: mix(c.link, c.text, dark ? 0.65 : 0.45),
    active,
    onActive: textOn(active, c.accentText),
  };
}
