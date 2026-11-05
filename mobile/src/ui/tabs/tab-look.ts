import { PALETTE, mix } from '../palette';
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

// The bar's colours (Mojtaba 2026-11-05, after his two pictures): a soft rail a step off the page, the tabs as round
// buttons a step darker (light) or lighter (dark) than it, and the chosen tab a white pill with dark ink. «سنگی» (slate)
// takes the pictures' own colours; every other theme the same steps in its own colour (its accent mixed into the page),
// the white pill faintly tinted with it in the dark mode.
const SLATE = {
  light: { rail: '#dfe1ec', circle: '#cbcedd', muted: '#3e4352', active: '#ffffff', onActive: '#15171c' },
  dark: { rail: '#262a38', circle: '#383c4a', muted: '#c8ccd6', active: '#ffffff', onActive: '#111318' },
};
export function useTabLook() {
  const c = useColors(), dark = useIsDark();
  if (PALETTE === 'slate') { const l = SLATE[dark ? 'dark' : 'light']; return { ...l, edge: l.rail }; }
  const rail = mix(c.accent, c.bg, dark ? 0.84 : 0.86);
  const circle = mix(c.accent, c.bg, dark ? 0.72 : 0.74);
  const active = dark ? mix(c.accent, '#ffffff', 0.92) : '#ffffff';
  const onActive = textOn(active, mix(c.accent, '#0b0d12', dark ? 0.82 : 0.72));
  return {
    rail,
    edge: rail,
    circle,
    muted: dark ? mix(c.accent, '#ffffff', 0.72) : mix(c.accent, '#1b1e26', 0.62),
    active,
    onActive,
  };
}
