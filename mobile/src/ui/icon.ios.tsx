// App icons on iOS: Apple's SF Symbols (expo-symbols), so each phone shows its own system's version of the symbol
// (iOS 27's on iOS 27).
import { SymbolView } from 'expo-symbols';

import { SF, type IconProps } from './icon-names';

export type { IconName } from './icon-names';

export function Icon({ name, size = 24, color, filled = false, weight = 'regular' }: IconProps) {
  return <SymbolView name={SF[name][filled ? 1 : 0] as any} size={size} tintColor={color} weight={weight} type="monochrome" />;
}
