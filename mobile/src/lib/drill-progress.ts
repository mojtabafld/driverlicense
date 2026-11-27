// The cards of «تمرین هوشمند» (lib/drill.ts), kept with the account (/api/drill), loaded once and shared by the pages;
// `save` keeps changed cards at once (and on the server, as far as it can be reached).
import { useEffect, useState } from 'react';

import { api } from './api';
import type { DrillState } from './drill';

let STATE: DrillState | null = null;
const listeners = new Set<(d: DrillState) => void>();
const publish = (d: DrillState) => { STATE = d; listeners.forEach(f => f(d)); };

export function useDrillProgress() {
  const [cards, setCards] = useState<DrillState>(STATE ?? {});
  const [loaded, setLoaded] = useState(STATE !== null);
  useEffect(() => {
    const on = (d: DrillState) => { setCards(d); setLoaded(true); };
    listeners.add(on);
    if (STATE === null) api<{ cards: DrillState }>('GET', 'drill').then(d => publish({ ...(d.cards || {}), ...(STATE ?? {}) })).catch(() => publish(STATE ?? {}));
    return () => { listeners.delete(on); };
  }, []);
  return {
    cards, loaded,
    save: (changed: DrillState) => {
      publish({ ...(STATE ?? {}), ...changed });
      api('POST', 'drill', { cards: changed }).catch(() => {});
    },
  };
}
