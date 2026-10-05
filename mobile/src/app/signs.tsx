// «علائم رانندگی»: every Danish road sign, marking and signal in the groups of the road-marking order (A–Z and the
// sub-signs). The groups as cards, two to a row, each with its thumbnail; a card opens the group page by page.
import { SIGN_CATS } from '@/lib/guide-data';
import { CatGrid } from '@/ui/guide-visual';
import { SubPage } from '@/ui/sub-page';

export default function Signs() {
  return (
    <SubPage title="علائم رانندگی" subtitle="همه‌ی تابلوها، خط‌کشی‌ها و چراغ‌های دانمارک، گروه به گروه؛ روی هر گروه بزنید تا تک‌تک موارد را با تصویر و توضیح ببینید.">
      <CatGrid kind="signs" cats={SIGN_CATS} />
    </SubPage>
  );
}
