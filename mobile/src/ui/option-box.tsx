// A statement of a question. On the main site (arc) the statements of a question are rows of one rounded card
// (OptionGroup), like a list of notices: each row has a small tinted tile on the left (the statement's letter, or a ✓
// when ticked), then the text, with a thin line between rows; every row is as tall as the tallest one. Elsewhere (/app)
// each statement is its own outlined box with a square check box. `on`: ticked; `mark`: shown wrong in a review (a soft
// red tint); `review`: in a review only a wrong statement is coloured, a ticked right one stays quiet. `extra` (the
// explanation after checking) goes under the text inside the row on the main site, under the box elsewhere.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';

import { Icon } from './icon';
import { T } from './kit';
import { ARC, radius, useColors, useIsDark } from './theme';

const LETTERS = 'ABCDEFGH';

// The rows report their text's own height; the group hands back the tallest so all rows match.
const Group = createContext<{ min: number; report: (id: number, h: number) => void; drop: (id: number) => void } | null>(null);
let nextId = 1;

export function OptionGroup({ children }: { children: React.ReactNode }) {
  const c = useColors();
  const heights = useRef(new Map<number, number>());
  const [min, setMin] = useState(0);
  const update = useCallback(() => setMin(Math.max(0, ...heights.current.values())), []);
  const report = useCallback((id: number, h: number) => { if (heights.current.get(id) !== h) { heights.current.set(id, h); update(); } }, [update]);
  const drop = useCallback((id: number) => { heights.current.delete(id); update(); }, [update]);
  const value = useMemo(() => ({ min, report, drop }), [min, report, drop]);
  if (!ARC) return <>{children}</>;
  return (
    <Group.Provider value={value}>
      <View style={{ backgroundColor: c.surface, borderRadius: radius.md, borderWidth: 1, borderColor: c.cardBorder, overflow: 'hidden' }}>{children}</View>
    </Group.Provider>
  );
}

type Props = { on: boolean; mark?: boolean; review?: boolean; n?: number; onPress?: () => void; disabled?: boolean; extra?: React.ReactNode; children: React.ReactNode };

export function OptionBox(p: Props) {
  return ARC ? <OptionRow {...p} /> : <OldBox {...p} />;
}

function OptionRow({ on, mark, review, n = 0, onPress, disabled, extra, children }: Props) {
  const c = useColors(), group = useContext(Group);
  const id = useRef(0);
  if (!id.current) id.current = nextId++;
  const drop = group?.drop;
  useEffect(() => () => drop?.(id.current), [drop]);
  const tile = mark ? (on ? c.bad : c.badSoft) : on ? c.pick : c.surface2;
  return (
    <Pressable onPress={onPress} disabled={disabled || !onPress} accessibilityRole="checkbox" accessibilityState={{ checked: on }}
      style={({ pressed }) => ({ flexDirection: 'row', direction: 'ltr', alignItems: extra ? 'flex-start' : 'center', gap: 14, paddingVertical: 14, paddingHorizontal: 16,
        borderTopWidth: n ? 1 : 0, borderTopColor: c.line,
        backgroundColor: mark ? c.badSoft : pressed ? c.surface2 : on && !review ? c.pickSoft : 'transparent' }) as any}>
      <View style={{ width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: tile,
        borderWidth: mark && !on ? 1.5 : 0, borderColor: c.bad }}>
        {on ? <Icon name="check" size={16} color={mark ? '#fff' : c.surface} weight="bold" />
          : <T style={{ fontSize: 14, lineHeight: 18, fontWeight: '700', color: mark ? c.bad : c.muted }}>{LETTERS[n] ?? ''}</T>}
      </View>
      <View style={{ flex: 1, gap: 8 }}>
        <View style={{ minHeight: Math.max(34, group?.min ?? 0), justifyContent: 'center' }}>
          <View style={{ gap: 4 }} onLayout={(e) => group?.report(id.current, Math.ceil(e.nativeEvent.layout.height))}>{children}</View>
        </View>
        {extra}
      </View>
    </Pressable>
  );
}

// The /app look: one outlined box per statement, with the explanation under it.
function OldBox({ on, mark, review, onPress, disabled, extra, children }: Props) {
  const c = useColors(), dark = useIsDark();
  // A clearly visible mid grey edge (darker than the page's lines) so each statement stands apart.
  const edge = dark ? '#555555' : '#b8b8b8';
  const box = (
    <View style={{ flexDirection: 'row', direction: 'ltr', alignItems: 'flex-start', gap: 12, paddingVertical: 16, paddingHorizontal: 16, borderRadius: 18,
      borderWidth: 2, borderColor: mark ? c.bad : on && !review ? c.pick : edge, backgroundColor: mark ? c.badSoft : 'transparent' } as any}>
      <View style={{ width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start', marginTop: 1,
        borderColor: on ? c.pick : c.muted, backgroundColor: on ? c.pick : 'transparent' }}>
        {on ? <Icon name="check" size={13} color={c.surface} weight="bold" /> : null}
      </View>
      <View style={{ flex: 1, gap: 4 }}>{children}</View>
    </View>
  );
  const pressable = onPress ? (
    <Pressable disabled={disabled} onPress={onPress} accessibilityRole="checkbox" accessibilityState={{ checked: on }}
      style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.985 : 1 }] })}>{box}</Pressable>
  ) : box;
  return extra ? <View style={{ gap: 6 }}>{pressable}{extra}</View> : pressable;
}
