// The web's stand-in for lib/play-billing.ts: nothing is bought with Google Play on the web (Stripe is, app/premium.tsx).
export type PlayItem = { id: string; price: string };

export function usePlayBilling(_onMsg: (m: { ok: boolean; text: string }) => void) {
  return { on: false, items: null as PlayItem[] | null, busy: false, buy: async (_id: string) => {} };
}
