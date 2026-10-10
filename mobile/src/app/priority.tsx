// «آموزش حق تقدم»: who goes first — the rules group by group, then practice situations (who goes first, second, third).
// The groups as cards, two to a row, each with its thumbnail; a card opens the group page by page.
import { PRIORITY_CATS } from '@/lib/guide-data';
import { CatGrid } from '@/ui/guide-visual';
import { PriorityArt } from '@/ui/header-art';
import { SubPage } from '@/ui/sub-page';

export default function Priority() {
  return (
    <SubPage title="آموزش حق تقدم" subtitle="چه کسی اول می‌رود؟" hero={{ pic: 0, icon: 'priority', art: PriorityArt }}>
      <CatGrid kind="priority" cats={PRIORITY_CATS} />
    </SubPage>
  );
}
