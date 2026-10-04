// The list of the questions, from the glass bar of the exam and of the review: a round list button beside the
// position opens a sheet with every question's number; a tap goes to that question. In the exam a number is filled once
// answered and carries a bookmark when marked; in the review it is green when right and red when wrong. The current one
// has a dark ring.
import { Modal, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { faNum } from '@/lib/logic';
import { Icon, type IconName } from './icon';
import { T, tap } from './kit';
import { useColors, useIsDark } from './theme';

export type QItem = { n: number; tone: 'answered' | 'empty' | 'ok' | 'bad'; marked?: boolean };

// One capsule: an icon (the list, or the mistakes page's filter) and the position («۷ / ۲۵») together, so the number is
// part of the button. `dot`: a small accent dot on the icon (a filter in use).
export function ListButton({ n, of, onPress, icon = 'list', label = 'فهرست سؤال‌ها', dot }: { n: number; of: number; onPress: () => void; icon?: IconName; label?: string; dot?: boolean }) {
  const c = useColors();
  return (
    <Pressable onPress={() => { tap(); onPress(); }} hitSlop={6} accessibilityRole="button" accessibilityLabel={`${label}، سؤال ${faNum(n)} از ${faNum(of)}`}
      style={({ pressed }) => ({ flexDirection: 'row', direction: 'ltr', alignItems: 'center', gap: 8, height: 44, paddingLeft: 14, paddingRight: 18, borderRadius: 22,
        opacity: pressed ? 0.75 : 1, transform: [{ scale: pressed ? 0.97 : 1 }], backgroundColor: c.nav } as any)}>
      <View>
        <Icon name={icon} size={19} color={c.navFg} />
        {dot ? <View style={{ position: 'absolute', top: -3, right: -4, width: 9, height: 9, borderRadius: 5, backgroundColor: c.accent, borderWidth: 1.5, borderColor: c.nav }} /> : null}
      </View>
      <T style={{ fontSize: 18, lineHeight: 26, color: c.navFg, fontWeight: '600', writingDirection: 'ltr' }}>{faNum(n)} / {faNum(of)}</T>
    </Pressable>
  );
}

export function QuestionSheet({ open, items, current, onPick, onClose }: { open: boolean; items: QItem[]; current: number; onPick: (k: number) => void; onClose: () => void }) {
  const c = useColors(), dark = useIsDark(), ins = useSafeAreaInsets();
  // Whole columns of 50-point tiles that fit the sheet; the grid is that wide and centred, so its last row starts at
  // the right like the rows above it.
  const cols = Math.max(1, Math.floor((Math.min(useWindowDimensions().width, 560) - 36 + 8) / 58));
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: dark ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.4)' }}>
        <Pressable onPress={() => {}} style={{ maxHeight: '80%', width: '100%', maxWidth: 560, alignSelf: 'center', paddingTop: 20, paddingHorizontal: 18, paddingBottom: ins.bottom + 18, gap: 14,
          borderTopLeftRadius: 26, borderTopRightRadius: 26, backgroundColor: c.surface }}>
          <T style={{ fontSize: 19, lineHeight: 28, fontWeight: '700', textAlign: 'center' }}>سؤال‌ها</T>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, width: cols * 58 - 8, alignSelf: 'center' }}>
            {items.map((q, k) => {
              const filled = q.tone === 'answered', ok = q.tone === 'ok', bad = q.tone === 'bad';
              const bg = filled ? c.strong : ok ? c.okSoft : bad ? c.badSoft : c.surface;
              const fg = filled ? c.strongFg : ok ? c.ok : bad ? c.bad : c.text;
              return (
                <Pressable key={k} onPress={() => { tap(); onPick(k); }} accessibilityRole="button" accessibilityLabel={`سؤال ${faNum(q.n)}`}
                  style={({ pressed }) => ({ width: 50, height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.75 : 1, backgroundColor: bg,
                    borderWidth: k === current ? 2.5 : 1.5, borderColor: k === current ? c.text : filled ? c.strong : ok ? c.ok : bad ? c.bad : c.line })}>
                  <T style={{ fontSize: 16, lineHeight: 24, fontWeight: '600', color: fg, textAlign: 'center' }}>{faNum(q.n)}</T>
                  {q.marked ? (
                    <View style={{ position: 'absolute', top: -5, right: -5, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.warn }}>
                      <Icon name="bookmark" size={11} filled color="#fff" />
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
