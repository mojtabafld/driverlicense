// As on iOS: a tap at the very top of the screen (the status bar and the header row, not a button there) scrolls the
// page back to the top, smoothly. Web only: the app's pages scroll inside their own views, not the document, so the
// browser's own status-bar tap does not reach them. Native apps get this from the system scroll views.
import { useEffect } from 'react';
import { Platform } from 'react-native';

const BAND = 56; // points from the top edge (plus the safe area) that count as «the top»

export function useTapTopToScroll() {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    const insetTop = () => {
      const probe = document.createElement('div');
      probe.style.cssText = 'position:fixed;top:0;height:env(safe-area-inset-top);visibility:hidden';
      document.body.appendChild(probe);
      const h = probe.offsetHeight;
      probe.remove();
      return h;
    };
    const onClick = (e: MouseEvent) => {
      if (e.clientY > insetTop() + BAND) return;
      if ((e.target as HTMLElement | null)?.closest('[role=button],[role=switch],[role=tab],a,button,input,textarea')) return;
      // Every scrolled view that is on screen: the visible page's (hidden pages under the stack keep their place).
      document.querySelectorAll<HTMLElement>('div').forEach(el => {
        if (el.scrollTop <= 0 || !el.getClientRects().length) return;
        const oy = getComputedStyle(el).overflowY;
        if (oy !== 'auto' && oy !== 'scroll') return;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.bottom <= 0 || r.top >= window.innerHeight || getComputedStyle(el).visibility === 'hidden') return;
        el.scrollTo({ top: 0, behavior: 'smooth' });
      });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
