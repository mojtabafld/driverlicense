// The browser's own way back (Safari's edge swipe, the back button, a back gesture) would leave a page that must ask
// first, e.g. the exam. On the web this keeps one extra history entry on top while the page is open: going back only
// removes that entry, which is put back at once, and `onBack` runs instead (it opens the page's «leave?» question).
// `release(then)` takes the extra entry away again before the page leaves on its own (then: the navigation).
// The guard's own history steps are caught before the router hears them (capture, stopped there): the router would
// otherwise reset its state to the same page, which plays the page's entrance again (a flash behind the question).
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
    const onPop = (e: PopStateEvent) => { if (!cur.on) return; e.stopImmediatePropagation(); h.pushState(h.state, ''); cur.onBack(); };
    // A moment after the page has come in, so the router's own entry for it is there first.
    const t = setTimeout(() => { h.pushState(h.state, ''); cur.on = true; window.addEventListener('popstate', onPop, true); }, 400);
    cur.off = () => { clearTimeout(t); window.removeEventListener('popstate', onPop, true); };
    return () => cur.off();
  }, []);
  return useCallback((then: () => void) => {
    const cur = g.current;
    if (Platform.OS !== 'web' || !cur.on) { cur.off(); then(); return; }
    cur.on = false; cur.off();
    const done = (e: PopStateEvent) => { e.stopImmediatePropagation(); window.removeEventListener('popstate', done, true); then(); };
    window.addEventListener('popstate', done, true);
    window.history.back();
  }, []);
}
