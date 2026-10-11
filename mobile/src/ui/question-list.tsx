// The list of the questions, from the glass bar of the exam and of the review: the list button (with the
// position) opens a sheet with every question's number; a tap goes to that question. In the exam a number is filled once
// answered and carries a bookmark when marked; in the review it is green when right and red when wrong. The current one
// has a ring in the text colour around it, apart from the tile.
import { Pressable, View, useWindowDimensions } from 'react-native';

import { PROVE_PICS } from '@/lib/config';
import { faNum } from '@/lib/logic';
import { BarItem, useBarLook } from './glass-bar';
import { Icon, type IconName } from './icon';
import { T, tap } from './kit';
import { Sheet, SheetScroll } from './sheet';
import { useColors } from './theme';

export type QItem = { n: number; tone: 'answered' | 'empty' | 'ok' | 'bad'; marked?: boolean };

// The bar's middle item, like a tab of the home page's bar: the icon (the list, or the mistakes page's filter) over the
// position («۷ / ۲۵»), so the number is part of the button. `dot`: a small accent dot on the icon (a filter in use).
export function ListButton({ n, of, onPress, icon = 'list', label = 'فهرست سؤال‌ها', dot }: { n: number; of: number; onPress: () => void; icon?: IconName; label?: string; dot?: boolean }) {
  const c = useColors(), look = useBarLook();
  return (
    <Pressable onPress={() => { tap(); onPress(); }} hitSlop={6} accessibilityRole="button" accessibilityLabel={`${label}، سؤال ${faNum(n)} از ${faNum(of)}`}
      style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.75 : 1 })}>
      {/* The main site writes the count in the Latin font and digits; the /app copy in Persian digits. */}
      <BarItem label={PROVE_PICS ? `${faNum(n)} / ${faNum(of)}` : `${n} / ${of}`} ltr latin={!PROVE_PICS}>
        <View>
          <Icon name={icon} size={24} color={look.fg} />
          {dot ? <View style={{ position: 'absolute', top: -3, right: -4, width: 9, height: 9, borderRadius: 5, backgroundColor: c.accent }} /> : null}
        </View>
      </BarItem>
    </Pressable>
  );
}

// The legend's entries: [label, fill, edge, bookmark] for the tile kinds in `items`. The current question's ring
// speaks for itself and has no entry.
function legend(items: QItem[], c: ReturnType<typeof useColors>): [string, string, string, boolean][] {
  const has = (t: QItem['tone']) => items.some(q => q.tone === t);
  return [
    ...(has('answered') ? [['پاسخ داده‌شده', c.strong, c.strong, false] as [string, string, string, boolean]] : []),
    ...(has('empty') ? [['بی‌پاسخ', c.nav, c.nav, false] as [string, string, string, boolean]] : []),
    ...(has('ok') ? [['درست', c.okSoft, c.ok, false] as [string, string, string, boolean]] : []),
    ...(has('bad') ? [['نادرست', c.badSoft, c.bad, false] as [string, string, string, boolean]] : []),
    ...(items.some(q => q.marked) || has('answered') || has('empty') ? [['علامت‌خورده', c.surface, c.warn, true] as [string, string, string, boolean]] : []),
  ];
}

export function QuestionSheet({ open, items, current, onPick, onClose }: { open: boolean; items: QItem[]; current: number; onPick: (k: number) => void; onClose: () => void }) {
  const c = useColors();
  // Whole columns of 50-point tiles that fit the sheet; the grid is that wide and centred, so its last row starts at
  // the right like the rows above it.
  const cols = Math.max(1, Math.floor((Math.min(useWindowDimensions().width, 560) - 36 - 12 + 8) / 58)); // 12: room for the current ring
  return (
    <Sheet open={open} onClose={onClose} maxHeight="80%">
      <T style={{ fontSize: 19, lineHeight: 28, fontWeight: '700', textAlign: 'center' }}>سؤال‌ها</T>
      <SheetScroll contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, width: cols * 58 - 8 + 12, padding: 6, alignSelf: 'center' }}>
        {items.map((q, k) => {
          // Answered: the strong grey (dark in the light theme, light in the dark one); unanswered: the soft grey of the
          // bar's buttons. A marked one keeps its amber edge and bookmark.
          const ok = q.tone === 'ok', bad = q.tone === 'bad', filled = q.tone === 'answered', empty = q.tone === 'empty';
          const bg = filled ? c.strong : empty ? c.nav : ok ? c.okSoft : bad ? c.badSoft : c.surface;
          const fg = filled ? c.strongFg : empty ? c.navFg : ok ? c.ok : bad ? c.bad : c.text;
          return (
            <Pressable key={k} onPress={() => { tap(); onPick(k); }} accessibilityRole="button" accessibilityLabel={`سؤال ${faNum(q.n)}`}
              style={({ pressed }) => ({ width: 50, height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.75 : 1, backgroundColor: bg,
                borderWidth: 1.5, borderColor: q.marked ? c.warn : filled ? c.strong : empty ? c.nav : ok ? c.ok : bad ? c.bad : c.line })}>
              <T style={{ fontSize: 16, lineHeight: 24, fontWeight: '600', color: fg, textAlign: 'center' }}>{faNum(q.n)}</T>
              {/* The current question: a ring in the text colour around the tile, with a gap of the sheet's colour,
                  so it stands out on any tile (light or dark, answered or not, right or wrong). */}
              {k === current ? <View pointerEvents="none" style={{ position: 'absolute', top: -5, left: -5, right: -5, bottom: -5, borderRadius: 18, borderWidth: 2.5, borderColor: c.text }} /> : null}
              {q.marked ? (
                <View style={{ position: 'absolute', top: -5, right: -5, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.warn }}>
                  <Icon name="bookmark" size={11} filled color="#fff" />
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </SheetScroll>
      {/* What the colours mean, for the kinds of tiles on show. */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', columnGap: 14, rowGap: 6 }}>
        {legend(items, c).map(([l, bg, bd, mark]) => (
          <View key={l} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 14, height: 14, borderRadius: 4, backgroundColor: bg, borderWidth: 1.5, borderColor: bd, alignItems: 'center', justifyContent: 'center' }}>
              {mark ? <Icon name="bookmark" size={8} filled color={bd} /> : null}
            </View>
            <T style={{ fontSize: 12, color: c.muted }}>{l}</T>
          </View>
        ))}
      </View>
    </Sheet>
  );
}
