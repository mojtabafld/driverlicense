// «علائم رانندگی»: every Danish road sign, marking and signal in the groups of the road-marking order (A–Z and the
// sub-signs). The groups as cards, two to a row, each with its thumbnail; a card opens the group page by page.
import { GUIDE_SOURCES, SIGN_CATS } from '@/lib/guide-data';
import { CatGrid } from '@/ui/guide-visual';
import { L, T } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

export default function Signs() {
  const c = useColors();
  return (
    <SubPage title="علائم رانندگی" subtitle="همه‌ی تابلوها، خط‌کشی‌ها و چراغ‌های دانمارک، گروه به گروه؛ روی هر گروه بزنید تا تک‌تک موارد را با تصویر و توضیح ببینید.">
      <CatGrid kind="signs" cats={SIGN_CATS} />
      <T style={{ color: c.faint, fontSize: 11.5, lineHeight: 19, textAlign: 'center' }}>منبع: <L style={{ fontSize: 11.5, color: c.faint }}>{GUIDE_SOURCES}</L>. تصاویر آموزشی‌اند و جزئیات رسمی هر تابلو در متن آن آمده است.</T>
    </SubPage>
  );
}
