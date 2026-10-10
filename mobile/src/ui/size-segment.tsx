// Number-of-questions picker in Arc's segmented-control look: every size is a tap target in one pill track, and the
// raised pill glides to the chosen one (Arc's rule: a few fixed choices are tapped, not dragged).
import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, View } from 'react-native';

import { faNum } from '@/lib/logic';
import { T, tap, useArcSeg } from './kit';

type Props = { value: number; values: number[]; onChange: (v: number) => void };
export function SizeSegment({ value, values, onChange }: Props) {
  const seg = useArcSeg();
  // Each part's place in the track (physical x and width, so it also holds in right to left), and the glide to it.
  const [boxes, setBoxes] = useState<Record<number, { x: number; w: number }>>({});
  const x = useRef(new Animated.Value(0)).current, w = useRef(new Animated.Value(0)).current;
  const placed = useRef(false);
  const box = boxes[value];
  useEffect(() => {
    if (!box) return;
    if (!placed.current) { x.setValue(box.x); w.setValue(box.w); placed.current = true; return; }
    Animated.parallel([
      Animated.spring(x, { toValue: box.x, useNativeDriver: false, bounciness: 0, speed: 18 }),
      Animated.spring(w, { toValue: box.w, useNativeDriver: false, bounciness: 0, speed: 18 }),
    ]).start();
  }, [box?.x, box?.w]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel="تعداد سؤال‌ها" style={[seg.track, { flexDirection: 'row' }]}>
      {box ? <Animated.View pointerEvents="none" style={[seg.pill(true), { position: 'absolute', top: 3, bottom: 3, left: x, width: w }]} /> : null}
      {values.map(n => {
        const on = n === value;
        return (
          <Pressable key={n} accessibilityRole="radio" accessibilityState={{ checked: on }} accessibilityLabel={`${faNum(n)} سؤال`}
            onLayout={e => { const { x: bx, width } = e.nativeEvent.layout; setBoxes(b => ({ ...b, [n]: { x: bx, w: width } })); }}
            onPress={() => { if (!on) { tap(); onChange(n); } }}
            style={({ pressed }) => ({ flex: 1, paddingVertical: 9, borderRadius: 99, opacity: pressed && !on ? 0.6 : 1, ...(Platform.OS === 'web' ? { cursor: 'pointer' } : {}) }) as object}>
            <T style={[seg.label(on), { textAlign: 'center', fontSize: 16, lineHeight: 22, fontVariant: ['tabular-nums'] }]}>{faNum(n)}</T>
          </Pressable>
        );
      })}
    </View>
  );
}
