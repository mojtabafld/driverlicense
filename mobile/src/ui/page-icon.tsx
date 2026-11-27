// A small drawing before a tab's title (Mojtaba 2026-10-18), in the style of the home page's time-of-day drawing
// (ui/greet-icon.tsx) but in the colour theme's own colour: «آموزش» a book, «آزمون» a tick, «تنظیمات» a gear. With the
// pictures header (no «هدر ساده») the header has its own big drawing, so there is none (`always`: the settings page,
// which has no picture header).
import { usePlainHeader } from '@/lib/header-style';
import { Icon, type IconName } from './icon';
import { useColors } from './theme';

export function PageIcon({ name, always, size = 24 }: { name: IconName; always?: boolean; size?: number }) {
  const c = useColors(), plain = usePlainHeader();
  if (!plain && !always) return null;
  return <Icon name={name} size={size} color={c.link} weight="semibold" />;
}
