// A one-line Persian title that is never cut off with «…»: when it fits it simply stands there; when it is longer
// than its room it glides slowly to show its end, waits, glides back and waits again, with the edges faded softly.
// The text starts at the right (the reading start) and moves right to bring its left part into view.
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Platform, View, type StyleProp, type TextStyle } from 'react-native';

import { T } from './kit';
import { ROSE, useColors } from './theme';

const SPEED = 32, PAUSE = 1600, FADE = 18; // px per second, ms at each end, width of the faded edges

// `bg`: the colour behind it, for the faded edges (the page colour by default; a card's inside a card).
export function Marquee({ text, style, height, bg }: { text: string; style?: StyleProp<TextStyle>; height: number; bg?: string }) {
  const c = useColors(), edge = bg ?? (ROSE ? c.top : c.bg);
  const [room, setRoom] = useState(0), [full, setFull] = useState(0);
  const [x] = useState(() => new Animated.Value(0));
  // Too long: it travels so that both its ends come out from under the faded edges.
  const over = full > room + 0.5 ? Math.ceil(full - room + FADE * 2) : 0;
  const wide = full ? Math.ceil(full) + 4 : undefined;
  useEffect(() => {
    x.setValue(0);
    if (!over) return;
    let loop: Animated.CompositeAnimation | null = null, live = true;
    AccessibilityInfo.isReduceMotionEnabled().catch(() => false).then(reduce => {
      if (!live || reduce) return;
      const glide = (to: number) => Animated.timing(x, { toValue: to, duration: (over / SPEED) * 1000, easing: Easing.inOut(Easing.quad), useNativeDriver: Platform.OS !== 'web' });
      loop = Animated.loop(Animated.sequence([Animated.delay(PAUSE), glide(over), Animated.delay(PAUSE), glide(0)]));
      loop.start();
    });
    return () => { live = false; loop?.stop(); };
  }, [over, x, text]);
  return (
    <View style={{ flex: 1, height, overflow: 'hidden', direction: 'ltr' } as any} onLayout={e => setRoom(e.nativeEvent.layout.width)} accessible accessibilityRole="header" accessibilityLabel={text}>
      {/* The title at its natural width, measured in a very wide hidden box. */}
      <View pointerEvents="none" style={{ position: 'absolute', top: 0, right: 0, width: 4000, flexDirection: 'row', justifyContent: 'flex-end', opacity: 0 }}>
        <T style={[style, { flexShrink: 0 }]} onLayout={e => setFull(e.nativeEvent.layout.width)}>{text}</T>
      </View>
      {/* Given its full measured width (and a little slack for rounding): left to itself on Android and iOS, a box
          placed by its right edge only is held to its parent's width, which cut the text off with «…». */}
      <Animated.View style={{ position: 'absolute', top: 0, right: over ? FADE : 0, width: wide, flexDirection: 'row', justifyContent: 'flex-end', transform: [{ translateX: x }] }}>
        <T style={[style, { flexShrink: 0, width: wide }]} numberOfLines={1}>{text}</T>
      </Animated.View>
      {over ? (
        <>
          <LinearGradient pointerEvents="none" colors={[edge, `${edge}00`]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: FADE }} />
          <LinearGradient pointerEvents="none" colors={[`${edge}00`, edge]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: FADE }} />
        </>
      ) : null}
    </View>
  );
}
