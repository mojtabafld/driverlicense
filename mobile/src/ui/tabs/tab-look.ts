import { deepAccent, mix, railColor } from '../palette';
import { m3Scheme, useColors, useIsDark } from '../theme';

// (the pill's room: its 66 points and the gap under it, pill-bar.tsx)
export const TAB_BAR_H = 84;


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

// The bar's colours: Material 3's navigation bar (Mojtaba 2026-11-07, after his picture of fonts.google.com): the bar a
// surface a step off the page, each tab's icon and label under it in a soft ink, and the open tab's icon on a pill
// (the indicator) in a tint of the theme's colour, its label in the theme's colour. «سنگی» dark takes Material's own
// light and dark schemes (theme.ts M3).
export function useTabLook() {
  const c = useColors(), dark = useIsDark();
  const m = m3Scheme(dark);
  if (m) return { rail: m.card, edge: m.card, indicator: m.container, onIndicator: m.onContainer, muted: m.muted, label: m.primary };
  const rail = railColor(dark, c.accent);   // (the same rail the page and cards are made from: theme.ts)
  const indicator = dark ? deepAccent(c.accent) : mix(c.accent, '#ffffff', 0.78);
  return {
    rail,
    edge: rail,
    indicator,
    onIndicator: dark ? textOn(indicator, '#ffffff') : textOn(indicator, mix(c.accent, '#0b0d12', 0.6)),
    muted: dark ? mix(c.accent, '#ffffff', 0.72) : mix(c.accent, '#1b1e26', 0.62),
    label: dark ? mix(c.accent, '#ffffff', 0.35) : mix(c.accent, '#0b0d12', 0.25),
  };
}
