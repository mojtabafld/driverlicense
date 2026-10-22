// «علائم رانندگی»: every Danish road sign, marking and signal in the groups of the road-marking order (A–Z and the
// sub-signs). On top, «تمرین سریع تابلوها» (app/sign-cards.tsx: flash cards with spaced repetition) with how many
// signs are learned and due (main site only, not /app); then the groups as cards, each with its thumbnail (ui/guide-visual.tsx CatGrid); a card
// opens the group page by page.
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PROVE_PICS } from '@/lib/config';
import { SIGN_CATS } from '@/lib/guide-data';
import { faNum } from '@/lib/logic';
import { ALL_SIGNS, dueSigns, learned, useSignCards } from '@/lib/sign-cards';
import { CatGrid } from '@/ui/guide-visual';
import { SignsArt } from '@/ui/header-art';
import { Icon } from '@/ui/icon';
import { ArcButton, Card, T, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

function CardsEntry({ tight }: { tight?: boolean }) {
  const c = useColors();
  const { cards, loaded } = useSignCards();
  const due = dueSigns(cards), known = learned(cards);
  return (
    <Pressable onPress={() => { tap(); router.push('/sign-cards'); }} accessibilityRole="button">
      {({ pressed }) => (
        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 12, opacity: pressed ? 0.85 : 1, padding: tight ? 10 : 16 }}>
          <View style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: c.btn, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="shuffle" size={20} color={c.btnFg} />
          </View>
          <View style={{ flex: 1, gap: 1 }}>
            <T style={{ fontWeight: '700', fontSize: 15.5 }}>تمرین سریع تابلوها</T>
            <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>
              {!loaded ? 'تابلو را ببینید و معنی‌اش را انتخاب کنید' : due ? `${faNum(due)} تابلو منتظر مرور است` : `${faNum(known)} از ${faNum(ALL_SIGNS.length)} تابلو یاد گرفته‌اید`}
            </T>
          </View>
          <View style={{ paddingHorizontal: 14, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: c.btn }}>
            <T style={{ fontWeight: '700', fontSize: 13.5, color: c.btnFg }}>شروع</T>
          </View>
        </Card>
      )}
    </Pressable>
  );
}

// Main site: the first five groups share the screen's height with «نمایش همه» at its foot, like the learn tab's five
// cards; the button shows the rest, and the page scrolls (Mojtaba 2026-10-22).
const FIRST = 5;

export default function Signs() {
  const [all, setAll] = useState(PROVE_PICS || SIGN_CATS.length <= FIRST);
  // Shorter screens (the status bar and the home indicator taken off): the cards without their count, then without their line.
  const ins = useSafeAreaInsets(), h = useWindowDimensions().height - ins.top - ins.bottom;
  return (
    <SubPage title="علائم رانندگی" subtitle="تابلوها، خط‌کشی‌ها و چراغ‌ها" hero={{ pic: 0, icon: 'sign', art: SignsArt }} fill={!all} gap={all ? 14 : h < 700 ? 6 : 10}>
      {PROVE_PICS ? null : <CardsEntry tight={!all && h < 700} />}
      <CatGrid kind="signs" cats={SIGN_CATS} limit={all ? undefined : FIRST} grow={!all} dense={!all && h < 820} bare={!all && h < 700} tight={!all && h < 700} />
      {all ? null : <ArcButton label="نمایش همه" icon="chevronDown" variant="secondary" onPress={() => setAll(true)} />}
    </SubPage>
  );
}
