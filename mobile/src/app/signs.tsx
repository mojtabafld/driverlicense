// «علائم رانندگی»: every Danish road sign, marking and signal in the groups of the road-marking order (A–Z and the
// sub-signs). The groups as cards, each with its thumbnail (ui/guide-visual.tsx CatGrid); a card opens the group
// page by page.
import { SIGN_CATS } from '@/lib/guide-data';
import { CatGrid } from '@/ui/guide-visual';
import { SignsArt } from '@/ui/header-art';
import { SubPage } from '@/ui/sub-page';

export default function Signs() {
  return (
    <SubPage title="علائم رانندگی" subtitle="تابلوها، خط‌کشی‌ها و چراغ‌ها" hero={{ pic: 0, icon: 'sign', art: SignsArt }}>
      <CatGrid kind="signs" cats={SIGN_CATS} />
    </SubPage>
  );
}
