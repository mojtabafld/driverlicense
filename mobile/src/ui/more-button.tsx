// «همه»: a small round button with an arrow in the theme's colours, in a card's head (the exam tab's history and mistakes
// cards); it opens the page with all of that card's items. The arrow points forward (left in Persian; icon.tsx mirrors it
// for English and Danish).
// `hint`: each new value (after the button shows) plays a short hint (Mojtaba 2026-10-20): the button opens out into a pill with «نمایش همه»
// (in the app's language) before its arrow, rests a moment and closes back into its circle, both ways with the same
// light easing; not with «reduce motion».
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Platform, Pressable, View } from 'react-native';

import { RTL } from '@/lib/i18n';
import { Icon } from './icon';
import { T, tap } from './kit';
import { useColors } from './theme';

const SIZE = 36, PAD = 12, OPEN_MS = 340, REST_MS = 1900, CLOSE_MS = 340;
// The room between the pill's edge and the word, on the side away from the arrow: on the web the row runs right to
// left in Persian without swapping a start padding, so the physical side; phones swap it themselves.
const room = Platform.OS === 'web' ? (RTL ? { paddingRight: PAD } : { paddingLeft: PAD }) : { paddingStart: PAD };

export function MoreButton({ onPress, label, hint = 0 }: { onPress: () => void; label: string; hint?: number }) {
  const c = useColors();
  const [p] = useState(() => new Animated.Value(0));
  const [textW, setTextW] = useState(0);
  // `played`: the last hint value played or there when the button first showed, so a button that shows again (the
  // home page's chart view builds its card anew each time it opens) does not play the value it finds, only a new one.
  const running = useRef(false), played = useRef(hint);
  useEffect(() => {
    if (!hint || hint === played.current || !textW || running.current) return;
    played.current = hint;
    let live = true;
    AccessibilityInfo.isReduceMotionEnabled().catch(() => false).then(reduce => {
      if (!live || reduce) return;
      running.current = true;
      const ease = Easing.bezier(0.2, 0, 0, 1);
      Animated.sequence([
        Animated.timing(p, { toValue: 1, duration: OPEN_MS, easing: ease, useNativeDriver: false }),
        Animated.delay(REST_MS),
        Animated.timing(p, { toValue: 0, duration: CLOSE_MS, easing: ease, useNativeDriver: false }),
      ]).start(() => { running.current = false; });
    });
    return () => { live = false; };
  }, [hint, textW, p]);
  const word = (
    <T numberOfLines={1} style={{ fontSize: 13, lineHeight: 20, fontWeight: '700', color: c.link }}>نمایش همه</T>
  );
  return (
    <Pressable onPress={() => { tap(); onPress(); }} hitSlop={6} accessibilityRole="button" accessibilityLabel={label}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
      {/* The word's width, measured once out of sight, so the pill opens to fit it in any language. */}
      <View pointerEvents="none" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0 }}>
        <View style={{ width: 400, flexDirection: 'row' }}>
          <View style={{ flexShrink: 0 }} onLayout={e => { const w = Math.ceil(e.nativeEvent.layout.width); if (w && w !== textW) setTextW(w); }}>{word}</View>
        </View>
      </View>
      <Animated.View style={{ height: SIZE, borderRadius: SIZE / 2, backgroundColor: c.accentSoft, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
        {/* The word, opening from nothing to its width (with room from the pill's edge) and fading in as it does. */}
        <Animated.View style={{ overflow: 'hidden', width: p.interpolate({ inputRange: [0, 1], outputRange: [0, textW + PAD + 4] }),
          opacity: p.interpolate({ inputRange: [0, 0.45, 1], outputRange: [0, 0, 1] }) }}>
          <Animated.View style={{ width: textW + PAD + 4, ...room, flexDirection: 'row',
            transform: [{ translateX: p.interpolate({ inputRange: [0, 1], outputRange: [RTL ? -6 : 6, 0] }) }] }}>{word}</Animated.View>
        </Animated.View>
        <View style={{ width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="arrowLeft" size={18} color={c.link} weight="semibold" />
        </View>
      </Animated.View>
    </Pressable>
  );
}
