// The floating bars' shade on the main site's light theme, as Liquid Glass does it: a light glass over the light page,
// turning dark while something dark (a photo, a dark button) passes under it. The dark things say so with useUnderBar
// (only while their page is the one in front); the bar looks every 200 ms whether one of them lies under it.
import { useIsFocused } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { Platform, View, useWindowDimensions, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ARC, useColors } from './theme';

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

// The flat bars over something of their own colour (Mojtaba 2026-10-23): while a card, an exam's answers or the page
// itself lies under the bar in nearly the bar's colour, the bar takes a colour two steps further off, so it stays
// apart from them. On the web what lies under the bar is read from the page (the topmost painted element under a few
// points of the bar, the bar's own skipped: data-bar); in the apps the cards and the answers say so with
// useSurfaceUnder, with their colour.
const surfaces = new Map<View, string>();

export function useSurfaceUnder(color: string) {
  const focused = useIsFocused();
  const [node, setNode] = useState<View | null>(null);
  useEffect(() => {
    if (Platform.OS === 'web' || !focused || !node) return;
    surfaces.set(node, color);
    return () => { surfaces.delete(node); };
  }, [focused, node, color]);
  return setNode;
}

// A part of a page that counts as of the bar's own colour whatever it is painted with (the AI's answer panel, a soft
// wash the page reads as see-through; Mojtaba 2026-10-24): the bar takes its colour two steps off over it too. Its
// ref setter (the apps) and its dataSet (the web: data-barnear).
const NEAR = { barnear: '1' };
export function useNearBar(): [(v: View | null) => void, typeof NEAR] {
  const c = useColors();
  return [useSurfaceUnder(c.surface2), NEAR];
}

// A colour's brightness, 0–1, from #rrggbb or rgb()/rgba() (null for one too see-through to count).
function bright(col: string): number | null {
  let r: number, g: number, b: number, a = 1;
  const m = col.match(/rgba?\(([^)]+)\)/);
  if (m) [r, g, b, a = 1] = m[1].split(',').map(Number);
  else if (/^#[0-9a-f]{6}/i.test(col)) { r = parseInt(col.slice(1, 3), 16); g = parseInt(col.slice(3, 5), 16); b = parseInt(col.slice(5, 7), 16); }
  else return null;
  return a < 0.5 ? null : (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}
// Nearly the same colour: within about one step of the theme's surfaces (0.05 of brightness).
const near = (a: number | null, b: number | null) => a != null && b != null && Math.abs(a - b) < 0.05;

// The colour under a point of the page (web): the first element under it with a colour of its own, the bar's own left
// out; else the page's.
// (`own`: the bar's, for a part marked as of its colour, useNearBar.)
function webUnder(x: number, y: number, own: number | null): number | null {
  const d = (globalThis as any).document;
  for (const el of d.elementsFromPoint(x, y) as any[]) {
    if (el.closest('[data-bar]')) continue;
    if (el.closest('[data-barnear]')) return own;
    const v = bright(getComputedStyle(el).backgroundColor);
    if (v != null) return v;
  }
  return bright(getComputedStyle(d.body).backgroundColor);
}

// Whether something of nearly the colour `color` lies under a bar `h` tall floating above the bottom (as BarShell),
// looked at every 200 ms while `on`.
export function useSimilarUnder(on: boolean, h: number, color: string) {
  const { height, width } = useWindowDimensions(), ins = useSafeAreaInsets();
  const [under, setUnder] = useState(false);
  useEffect(() => {
    if (!on) return;
    const bottom = height - Math.max(16, ins.bottom), top = bottom - h, left = 20, right = width - 20, own = bright(color);
    let alive = true;
    const look = () => {
      if (Platform.OS === 'web') {
        // Just inside the bar's top edge (where what passes under it shows first) and across its middle.
        const xs = [0.2, 0.5, 0.8].map(f => left + (right - left) * f), ys = [top + 5, top + h / 2];
        if (alive) setUnder(xs.some(x => ys.some(y => near(webUnder(x, y, own), own))));
        return;
      }
      // In the apps: the smallest of the registered surfaces across the bar's top edge (an answer inside a card is the
      // answer's colour).
      const all = [...surfaces];
      if (!all.length) { if (alive) setUnder(false); return; }
      let todo = all.length, best: [number, string] | null = null;
      for (const [v, col] of all) {
        v.measureInWindow((x, y, w, hh) => {
          if (w > 0 && hh > 0 && y < top + 5 && y + hh > top + 5 && x < right && x + w > left && (!best || w * hh < best[0])) best = [w * hh, col];
          if (--todo === 0 && alive) setUnder(!!best && near(bright(best[1]), own));
        });
      }
    };
    const first = setTimeout(look, 0), t = setInterval(look, 200);
    return () => { alive = false; clearTimeout(first); clearInterval(t); };
  }, [on, h, color, height, width, ins.bottom]);
  return on && under;
}
// Whether the bar has taken its colour two steps off (useSimilarUnder), handed to its items.
export const BarApart = createContext(false);

// The shade a bar hands its items: true while it is the light glass.
export const BarLight = createContext(false);
export const useBarLight = () => useContext(BarLight);

// A View that counts as dark for the bars (a photo in a list, for one).
export function UnderBar(p: ViewProps) {
  return <View ref={useUnderBar()} {...p} />;
}
