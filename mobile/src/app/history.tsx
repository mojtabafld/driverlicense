// «همه‌ی آزمون‌ها»: every exam and lesson done, newest first, opened from «همه» on the exam tab's history card. A row
// opens its review; the bin in the card's head deletes the whole history, as on the tab.
import { faNum } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { ActivityList } from '@/ui/activity';
import { SubPage } from '@/ui/sub-page';

export default function History() {
  const { attempts } = useApp();
  return (
    <SubPage title="همه‌ی آزمون‌ها" subtitle={attempts.length ? `${faNum(attempts.length)} آزمون و درس، جدیدترین اول` : undefined}>
      <ActivityList attempts={attempts} limit={Infinity} title="تاریخچه‌ی آزمون‌ها" />
    </SubPage>
  );
}
