// Icon names shared by src/ui/icon.tsx (web, Android) and src/ui/icon.ios.tsx (SF Symbols).
import type { SymbolWeight } from 'expo-symbols';

export type IconName = 'house' | 'exam' | 'learn' | 'settings' | 'moon' | 'sun' | 'check' | 'checkCircle' | 'xCircle' | 'chevronLeft' | 'sparkles' | 'clipboard' | 'warning'
  | 'arrowRight' | 'arrowLeft' | 'bookmark' | 'chevronDown' | 'chart' | 'translate'
  | 'person' | 'lock' | 'eye' | 'eyeSlash' | 'clock' | 'exit' | 'trash' | 'refresh' | 'filter'
  | 'play' | 'personAdd' | 'chevronUp' | 'xmark' | 'edit' | 'shuffle';

export type IconProps = { name: IconName; size?: number; color: string; filled?: boolean; weight?: SymbolWeight; contrast?: string };

// SF Symbol per icon: [outline, filled].
export const SF: Record<IconName, [string, string]> = {
  house: ['house', 'house.fill'],
  trash: ['trash', 'trash.fill'],
  play: ['play.fill', 'play.fill'],
  edit: ['pencil', 'pencil'],
  shuffle: ['shuffle', 'shuffle'],
  personAdd: ['person.badge.plus', 'person.badge.plus.fill'],
  chevronUp: ['chevron.up', 'chevron.up'],
  xmark: ['xmark', 'xmark'],
  filter: ['line.3.horizontal.decrease.circle', 'line.3.horizontal.decrease.circle.fill'],
  refresh: ['arrow.clockwise', 'arrow.clockwise'],
  exam: ['checkmark.circle', 'checkmark.circle.fill'],
  learn: ['book', 'book.fill'],
  settings: ['gearshape', 'gearshape.fill'],
  moon: ['moon.fill', 'moon.fill'],
  sun: ['sun.max.fill', 'sun.max.fill'],
  check: ['checkmark', 'checkmark'],
  checkCircle: ['checkmark.circle.fill', 'checkmark.circle.fill'],
  xCircle: ['xmark.circle.fill', 'xmark.circle.fill'],
  chevronLeft: ['chevron.left', 'chevron.left'],
  sparkles: ['sparkles', 'sparkles'],
  clipboard: ['list.bullet.clipboard', 'list.bullet.clipboard.fill'],
  warning: ['exclamationmark.triangle', 'exclamationmark.triangle.fill'],
  arrowRight: ['arrow.right', 'arrow.right'],
  arrowLeft: ['arrow.left', 'arrow.left'],
  bookmark: ['bookmark', 'bookmark.fill'],
  chevronDown: ['chevron.down', 'chevron.down'],
  chart: ['chart.bar', 'chart.bar.fill'],
  translate: ['translate', 'translate'],
  person: ['person', 'person.fill'],
  lock: ['lock', 'lock.fill'],
  eye: ['eye', 'eye.fill'],
  eyeSlash: ['eye.slash', 'eye.slash.fill'],
  clock: ['clock', 'clock.fill'],
  exit: ['rectangle.portrait.and.arrow.right', 'rectangle.portrait.and.arrow.right.fill'],
};
