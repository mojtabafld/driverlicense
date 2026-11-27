import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';

type Bounds = { top: number; left: number; width: number; height: number };

function visibleBounds(): Bounds | null {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const viewport = window.visualViewport;
  return {
    top: viewport?.offsetTop ?? 0,
    left: viewport?.offsetLeft ?? 0,
    width: viewport?.width ?? window.innerWidth,
    height: viewport?.height ?? window.innerHeight,
  };
}

// Safari's fixed-position modal can cover the layout viewport below its visible
// screen. Lay sheets out within the visual viewport, including toolbar/keyboard changes.
export function SheetViewport({ children }: { children: React.ReactNode }) {
  const [bounds, setBounds] = useState(visibleBounds);
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const viewport = window.visualViewport;
    const update = () => {
      const next = visibleBounds();
      setBounds(previous => previous && next && previous.top === next.top && previous.left === next.left
        && previous.width === next.width && previous.height === next.height ? previous : next);
    };
    viewport?.addEventListener('resize', update);
    viewport?.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    update();
    return () => {
      viewport?.removeEventListener('resize', update);
      viewport?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return (
    <View testID="bottom-sheet-viewport" style={bounds
      ? { position: 'absolute', ...bounds, overflow: 'hidden' }
      : { flex: 1 }}>
      {children}
    </View>
  );
}
