// The floating bars' shade on the main site's light theme, as Liquid Glass does it: a light glass over the light page,
// turning dark while something dark (a photo, a dark button) passes under it. The dark things say so with useUnderBar
// (only while their page is the one in front); the bar looks every 200 ms whether one of them lies under it.
import { useIsFocused } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { View, useWindowDimensions, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ARC } from './theme';

const dark = new Set<View>();

// A ref for a dark element of a page: it counts for the bars while its page is in front.
export function useUnderBar() {
  const focused = useIsFocused();
  const [node, setNode] = useState<View | null>(null);
  useEffect(() => {
    if (!ARC || !focused || !node) return;
    dark.add(node);
    return () => { dark.delete(node); };
  }, [focused, node]);
  return setNode;
}

// Whether something dark lies under a bar `h` tall floating `gap` above the bottom (as BarShell): checked only while
// `on` (the light theme of the main site).
export function useDarkUnder(on: boolean, h: number) {
  const { height, width } = useWindowDimensions(), ins = useSafeAreaInsets();
  const [under, setUnder] = useState(false);
  useEffect(() => {
    if (!on) return;
    const bottom = height - Math.max(16, ins.bottom), top = bottom - h, left = 20, right = width - 20;
    let alive = true;
    const look = () => {
      const all = [...dark];
      if (!all.length) { if (alive) setUnder(false); return; }
      let todo = all.length, hit = false;
      for (const v of all) {
        v.measureInWindow((x, y, w, hh) => {
          if (w > 0 && hh > 0 && y < bottom && y + hh > top && x < right && x + w > left) hit = true;
          if (--todo === 0 && alive) setUnder(hit);
        });
      }
    };
    const first = setTimeout(look, 0), t = setInterval(look, 200);
    return () => { alive = false; clearTimeout(first); clearInterval(t); };
  }, [on, h, height, width, ins.bottom]);
  return on && under;
}

// The shade a bar hands its items: true while it is the light glass.
export const BarLight = createContext(false);
export const useBarLight = () => useContext(BarLight);

// A View that counts as dark for the bars (a photo in a list, for one).
export function UnderBar(p: ViewProps) {
  return <View ref={useUnderBar()} {...p} />;
}
