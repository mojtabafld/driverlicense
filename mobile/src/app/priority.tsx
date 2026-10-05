// «آموزش حق تقدم»: who goes first — the rules group by group, then practice situations (who goes first, second, third).
// The groups as cards, two to a row, each with its thumbnail; a card opens the group page by page.
import { GUIDE_SOURCES, PRIORITY_CATS } from '@/lib/guide-data';
import { CatGrid, PracticeButton } from '@/ui/guide-visual';
import { L, T } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

export default function Priority() {
  const c = useColors();
  return (
    <SubPage title="آموزش حق تقدم" subtitle="چه کسی اول می‌رود؟ قواعد گروه به گروه، و در پایان تمرین ترتیب عبور در تقاطع‌ها.">
      <CatGrid kind="priority" cats={PRIORITY_CATS} />
      <PracticeButton topics={['7.11', '7.12', '7.13', '7.14', '7.15']} title="حق تقدم" />
      <T style={{ color: c.faint, fontSize: 11.5, lineHeight: 19, textAlign: 'center' }}>منبع: <L style={{ fontSize: 11.5, color: c.faint }}>{GUIDE_SOURCES}</L>. تصاویر آموزشی‌اند.</T>
    </SubPage>
  );
}
