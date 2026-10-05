// «علائم رانندگی»: the Danish road signs by group (warning A, priority B, prohibition C, mandatory D, information E),
// the road markings and the traffic signals, from the road-marking order. A group's chip shows its rules and its signs
// as cards with their educational picture, code and names; a card opens the sign's full explanation.
import { useState } from 'react';
import { Modal, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GUIDE_SOURCES, SIGN_CATS, type SignItem } from '@/lib/guide-data';
import { Chips, GuideImage, PracticeButton, Rich } from '@/ui/guide-visual';
import { Icon } from '@/ui/icon';
import { Card, L, T, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors, useIsDark } from '@/ui/theme';

const SHORT: Record<string, string> = { A: 'هشدار', B: 'حق تقدم', C: 'ممنوعیت', D: 'الزامی', E: 'اطلاع‌رسانی', M: 'خط‌کشی', X: 'چراغ‌ها' };
const WIDE = new Set(['M', 'X']); // markings and signals are scenes, 4:3; signs are square

export default function Signs() {
  const c = useColors();
  const [cat, setCat] = useState(SIGN_CATS[0].id);
  const [open, setOpen] = useState<SignItem | null>(null);
  const cur = SIGN_CATS.find(x => x.id === cat) ?? SIGN_CATS[0];
  const wide = WIDE.has(cur.id);
  return (
    <SubPage title="علائم رانندگی" subtitle="تابلوها، خط‌کشی‌ها و چراغ‌های دانمارک بر اساس مقررات رسمی؛ روی هر مورد بزنید تا توضیح کاملش را ببینید.">
      <Chips value={cat} onChange={setCat} options={SIGN_CATS.map(x => ({ value: x.id, label: SHORT[x.id] ?? x.title }))} />
      <Card style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <T style={{ flex: 1, fontWeight: '800', fontSize: 17 }}>{cur.title}</T>
          <View style={{ paddingHorizontal: 10, paddingVertical: 3, borderRadius: 99, backgroundColor: c.surface2 }}>
            <T style={{ fontSize: 11.5, fontWeight: '600', color: c.muted }}>{cur.shape}</T>
          </View>
        </View>
        <Rich text={cur.intro} style={{ fontSize: 14, lineHeight: 24, color: c.muted }} />
      </Card>
      {/* The group's items: two columns of cards (one for the wide scenes of markings and signals). */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {cur.items.map(i => (
          <Pressable key={i.key} onPress={() => { tap(); setOpen(i); }} accessibilityRole="button" accessibilityLabel={`${i.code} ${i.fa}`}
            style={({ pressed }) => ({ width: wide ? '100%' : '48.4%', opacity: pressed ? 0.85 : 1 })}>
            <Card style={{ padding: 8, gap: 6 }}>
              <GuideImage k={i.key} aspect={wide ? 4 / 3 : 1} label={i.code} />
              <View style={{ paddingHorizontal: 2, gap: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <View style={{ paddingHorizontal: 7, paddingVertical: 1, borderRadius: 6, backgroundColor: c.surface2 }}>
                    <L style={{ fontSize: 11.5, fontWeight: '700', color: c.text }}>{i.code}</L>
                  </View>
                  <Icon name="chevronLeft" size={13} color={c.faint} />
                </View>
                <T style={{ fontSize: 13.5, lineHeight: 21, fontWeight: '700' }} numberOfLines={2}>{i.fa}</T>
                <L style={{ fontSize: 11, lineHeight: 15, color: c.muted }} numberOfLines={1}>{i.da}</L>
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
      <PracticeButton topics={['6.1']} title="علائم رانندگی" />
      <T style={{ color: c.faint, fontSize: 11.5, lineHeight: 19, textAlign: 'center' }}>منبع: <L style={{ fontSize: 11.5, color: c.faint }}>{GUIDE_SOURCES}</L>. تصاویر آموزشی‌اند و جزئیات رسمی هر تابلو در متن آن آمده است.</T>
      <SignSheet item={open} wide={wide} onClose={() => setOpen(null)} />
    </SubPage>
  );
}

// One sign in full: its picture large, code, Danish and Persian names, and what it means and what to do.
function SignSheet({ item, wide, onClose }: { item: SignItem | null; wide: boolean; onClose: () => void }) {
  const c = useColors(), dark = useIsDark(), ins = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  return (
    <Modal visible={!!item} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: dark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.45)' }}>
        <Pressable onPress={() => {}} style={{ maxHeight: '90%', width: '100%', maxWidth: 560, alignSelf: 'center', borderTopLeftRadius: 26, borderTopRightRadius: 26, backgroundColor: c.surface }}>
          {item ? (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 18, paddingBottom: ins.bottom + 22, gap: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{ paddingHorizontal: 9, paddingVertical: 2, borderRadius: 8, backgroundColor: c.surface2 }}>
                  <L style={{ fontSize: 14, fontWeight: '800', color: c.text }}>{item.code}</L>
                </View>
                <View style={{ flex: 1 }} />
                <Pressable onPress={() => { tap(); onClose(); }} hitSlop={10} accessibilityRole="button" accessibilityLabel="بستن"
                  style={{ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
                  <Icon name="xmark" size={16} color={c.muted} />
                </Pressable>
              </View>
              <View style={{ width: wide ? '100%' : Math.min(width - 36, 320), alignSelf: 'center' }}>
                <GuideImage k={item.key} aspect={wide ? 4 / 3 : 1} label={item.code} radius={16} />
              </View>
              <T style={{ fontSize: 19, lineHeight: 30, fontWeight: '800' }}>{item.fa}</T>
              <L style={{ fontSize: 13.5, lineHeight: 20, color: c.muted }}>{item.da}</L>
              <Rich text={item.text} style={{ fontSize: 15, lineHeight: 27 }} />
            </ScrollView>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
