// «هدر ساده»: the pages' headers without their pictures and drawings. The tabs and the inner pages that had a picture
// header (the course, rules, signs, right of way) keep the header's colour, its fade into the page and the title (Hero
// in ui/kit.tsx); only the picture goes. Since 2026-10-18 it is the only header on the main site (Mojtaba: the choice
// in settings is gone); /app (prove.dk's copy) keeps its pictures. The accounts' old `settings.header` is left unused.
import { PROVE_PICS } from '@/lib/config';

const PLAIN = !PROVE_PICS;
// Whether the pages' headers are plain (no picture).
export function usePlainHeader(): boolean {
  return PLAIN;
}
