// «علائم رانندگی»: every Danish road sign, marking and signal in the groups of the road-marking order (A–Z and the
// sub-signs). On top, «تمرین سریع تابلوها» (app/sign-cards.tsx: flash cards with spaced repetition) with how many
// signs are learned and due (main site only, not /app); then the groups as cards, each with its thumbnail (ui/guide-visual.tsx CatGrid); a card
// opens the group page by page.
import { useRef, useState } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PROVE_PICS } from '@/lib/config';
import { SIGN_CATS } from '@/lib/guide-data';
import { faNum } from '@/lib/logic';
import { ALL_SIGNS, dueSigns, learned, useSignCards } from '@/lib/sign-cards';
import { CatGrid } from '@/ui/guide-visual';
import { SignsArt } from '@/ui/header-art';
import { ArcButton } from '@/ui/kit';
import { PracticeEntry } from '@/ui/practice-entry';
import { SubPage } from '@/ui/sub-page';

function CardsEntry({ tight }: { tight?: boolean }) {
  const { cards, loaded } = useSignCards();
  const due = dueSigns(cards), known = learned(cards);
  return <PracticeEntry title="تمرین سریع تابلوها" href="/sign-cards" tight={tight}
    line={!loaded ? 'تابلو را ببینید و معنی‌اش را انتخاب کنید' : due ? `${faNum(due)} تابلو منتظر مرور است` : `${faNum(known)} از ${faNum(ALL_SIGNS.length)} تابلو یاد گرفته‌اید`} />;
}

// Main site: the first five groups share the screen's height with «نمایش همه» at its foot, like the learn tab's five
// cards; the button shows the rest (the page then scrolls) and, pressed again, only the five (Mojtaba 2026-10-22).
const FIRST = 5;

export default function Signs() {
  // `can`: the page offers «نمایش همه» at all (main site, more groups than five); `open`: every group is shown.
  const can = !PROVE_PICS && SIGN_CATS.length > FIRST, [open, setOpen] = useState(false), all = !can || open;
  const scroll = useRef<ScrollView>(null);
  // Shorter screens (the status bar and the home indicator taken off): the cards without their count, then without their line.
  const ins = useSafeAreaInsets(), h = useWindowDimensions().height - ins.top - ins.bottom;
  return (
    <SubPage title="علائم رانندگی" subtitle="تابلوها، خط‌کشی‌ها و چراغ‌ها" hero={{ pic: 0, icon: 'sign', art: SignsArt }} scrollRef={scroll} fill={!all} gap={all ? 14 : h < 700 ? 6 : 10}>
      {PROVE_PICS ? null : <CardsEntry tight={!all && h < 700} />}
      <CatGrid kind="signs" cats={SIGN_CATS} limit={all ? undefined : FIRST} grow={!all} dense={!all && h < 820} bare={!all && h < 700} tight={!all && h < 700} />
      {/* Shown all, the button stays at the list's end and goes back to the first five, at the page's top (Mojtaba 2026-10-22). */}
      {can ? <ArcButton label={open ? 'نمایش کمتر' : 'نمایش همه'} icon={open ? 'chevronUp' : 'chevronDown'} variant="secondary"
        onPress={() => { if (open) scroll.current?.scrollTo({ y: 0, animated: false }); setOpen(!open); }} /> : null}
    </SubPage>
  );
}
