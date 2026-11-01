// Whether the premium offer shown right after sign-up (ui/pro-promo.tsx, from app/_layout.tsx) is still to come or on
// screen (Mojtaba 2026-11-01): the warm-up ((tabs)/index.tsx → app/warmup.tsx) waits until it is closed, skipped or
// left for the premium page, so the first questions never start behind it. 'wait': not decided yet (the intro or the
// language screen first); 'open': on screen; 'done': closed, or not shown at all.
import { useEffect, useState } from 'react';

export type PromoGate = 'wait' | 'open' | 'done';
// (for one account: `key` is app/_layout.tsx's promoKey, «username:created», so a decision made for no account or another
// one never lets the warm-up of a new one through)
type State = { g: PromoGate; key: string };
let gate: State = { g: 'wait', key: '' };
const subs = new Set<(s: State) => void>();

export function setPromoGate(g: PromoGate, key: string) {
  if (g === gate.g && key === gate.key) return;
  gate = { g, key };
  subs.forEach(f => f(gate));
}
// 'done' only when decided for this account's key.
export function usePromoGate(key: string): PromoGate {
  const [s, setS] = useState(gate);
  useEffect(() => { subs.add(setS); setS(gate); return () => { subs.delete(setS); }; }, []);
  return s.key === key ? s.g : 'wait';
}
