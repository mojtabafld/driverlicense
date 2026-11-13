// The tab bar's water pill (Mojtaba 2026-11-13, the «Liquid Glass Navbar» from Nimbus UI): what both forms take, the
// web one (liquid-bar.web.tsx: the component itself, src/components/ui/liquid-glass-navbar.tsx, with its WebGL water)
// and the phones' (liquid-bar.tsx: the same look drawn with React Native's views and animations).
import type { IconName } from '../icon';

// The little scene each tab's icon plays when tapped (the component's NimbusFx, those the app uses).
export type BarFx = 'glow' | 'drop' | 'spin' | 'wave' | 'pop';
export type BarTab = { name: string; label: string; icon: IconName; fx: BarFx };
export type LiquidBarProps = {
  tabs: readonly BarTab[];
  active: number;
  onSelect: (index: number) => void;
  /** the phone's home-indicator area under the pill */
  bottomInset: number;
  /** icons only (a narrow screen) */
  compact: boolean;
};
// The pill floats this far above the bottom edge (inside the room the pages keep for the bar: TAB_BAR_H).
export const BAR_GAP = 10;
