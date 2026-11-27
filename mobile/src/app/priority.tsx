// «آموزش حق تقدم»: who goes first — the rules group by group, then practice situations (who goes first, second, third).
// On top, «تمرین سریع حق تقدم» (app/priority-cards.tsx: flash cards with spaced repetition, as the signs'; Mojtaba
// 2026-10-22) with how many situations are learned and due (main site only, not /app); then the groups as cards, each
// with its thumbnail (ui/guide-visual.tsx CatGrid); a card opens the group page by page.
import { useRef, useState } from 'react';
import { ScrollView } from 'react-native';

import { PROVE_PICS } from '@/lib/config';
import { PRIORITY_CATS } from '@/lib/guide-data';
import { faNum } from '@/lib/logic';
import { ALL_PRIORITY, duePriority, learnedPriority } from '@/lib/priority-cards';
import { useSignCards } from '@/lib/sign-cards';
import { CatGrid } from '@/ui/guide-visual';
import { PriorityArt } from '@/ui/header-art';
import { ArcButton } from '@/ui/kit';
import { PracticeEntry } from '@/ui/practice-entry';
import { SubPage } from '@/ui/sub-page';

function CardsEntry() {
  const { cards, loaded } = useSignCards();
  const due = duePriority(cards), known = learnedPriority(cards);
  return <PracticeEntry title="تمرین سریع حق تقدم" href="/priority-cards" progress={loaded ? known / ALL_PRIORITY.length : undefined}
    line={!loaded ? 'وضعیت را ببینید و بگویید چه کسی اول می‌رود' : due ? `${faNum(due)} موقعیت منتظر مرور است` : `${faNum(known)} از ${faNum(ALL_PRIORITY.length)} موقعیت یاد گرفته‌اید`} />;
}

// Keep the first five groups and «نمایش همه», with the same scrollable Material cards as the road signs' page.
const FIRST = 5;

export default function Priority() {
  // `can`: the page offers «نمایش همه» at all (main site, more groups than five); `open`: every group is shown.
  const can = !PROVE_PICS && PRIORITY_CATS.length > FIRST, [open, setOpen] = useState(false), all = !can || open;
  const scroll = useRef<ScrollView>(null);
  return (
    <SubPage title="آموزش حق تقدم" subtitle="چه کسی اول می‌رود؟" hero={{ pic: 0, icon: 'priority', art: PriorityArt }} scrollRef={scroll} dashboard={!PROVE_PICS} theme>
      {PROVE_PICS ? null : <CardsEntry />}
      <CatGrid kind="priority" cats={PRIORITY_CATS} limit={all ? undefined : FIRST} />
      {/* Shown all, the button stays at the list's end and goes back to the first five, at the page's top (Mojtaba 2026-10-22). */}
      {can ? <ArcButton label={open ? 'نمایش کمتر' : 'نمایش همه'} icon={open ? 'chevronUp' : 'chevronDown'} variant="secondary"
        onPress={() => { if (open) scroll.current?.scrollTo({ y: 0, animated: false }); setOpen(!open); }} /> : null}
    </SubPage>
  );
}
