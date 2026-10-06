// The browser's own way back (Safari's edge swipe, the back button, a back gesture) would leave a page that must ask
// first, e.g. the exam. On the web this keeps one extra history entry on top while the page is open: going back only
// removes that entry, which is put back at once, and `onBack` runs instead (it opens the page's «leave?» question).
// `release(then)` takes the extra entry away again before the page leaves on its own (then: the navigation).
// Elsewhere (phones) it does nothing; their back button is handled by BackHandler.
import { useCallback, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

type Guard = { on: boolean; onBack: () => void; off: () => void };

export function useWebBackGuard(onBack: () => void) {
  const g = useRef<Guard>({ on: false, onBack, off: () => {} });
  useEffect(() => { g.current.onBack = onBack; }, [onBack]);
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const h = window.history, cur = g.current;
    const onPop = () => { if (!cur.on) return; h.pushState(h.state, ''); cur.onBack(); };
    // A moment after the page has come in, so the router's own entry for it is there first.
    const t = setTimeout(() => { h.pushState(h.state, ''); cur.on = true; window.addEventListener('popstate', onPop); }, 400);
    cur.off = () => { clearTimeout(t); window.removeEventListener('popstate', onPop); };
    return () => cur.off();
  }, []);
  return useCallback((then: () => void) => {
    const cur = g.current;
    if (Platform.OS !== 'web' || !cur.on) { cur.off(); then(); return; }
    cur.on = false; cur.off();
    const done = () => { window.removeEventListener('popstate', done); then(); };
    window.addEventListener('popstate', done);
    window.history.back();
  }, []);
}
