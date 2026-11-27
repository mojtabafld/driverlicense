// «تمرین سریع تابلوها» (app/sign-cards.tsx): flash cards of the road signs (lib/guide-data.ts SIGN_CATS) by spaced
// repetition, kept with the account (/api/signcards: sign key → [box, due]). A sign answered right moves up a box
// and comes back later (BOX_DAYS), one answered wrong goes back to the first box and comes again in the same
// session. A session is the signs due again first, then new ones, in the groups' order (the warning signs first).
import { useEffect, useState } from 'react';

import { api } from './api';
import { SIGN_CATS, type SignItem } from './guide-data';
import SIGN_EN from './guide-en.json';
import { UI_LANG } from './i18n';
import { shuffle } from './logic';

export type SignCards = Record<string, [number, number]>;
export type SignCard = SignItem & { group: number; groupTitle: string };

export const SESSION = 10;
const BOX_DAYS = [0, 1, 3, 7, 16, 35];
const DAY = 864e5;

// The sign's meaning in the app's language: Persian, English (guide-en.json) or the Danish name.
export const nameOf = (s: SignItem) => (UI_LANG === 'fa' ? s.fa : UI_LANG === 'en' ? (SIGN_EN as Record<string, string>)[s.key] || s.da : s.da);
// Every sign with a name of its own (two signs with the same name cannot be told apart by it).
const seen = new Map<string, number>();
for (const g of SIGN_CATS) for (const s of g.items) seen.set(nameOf(s), (seen.get(nameOf(s)) ?? 0) + 1);
export const ALL_SIGNS: SignCard[] = SIGN_CATS.flatMap((g, group) => g.items.filter(s => nameOf(s) && seen.get(nameOf(s)) === 1).map(s => ({ ...s, group, groupTitle: g.title })));

export const isDue = (c: [number, number] | undefined, now = Date.now()) => !!c && c[1] <= now;
export const learned = (cards: SignCards) => ALL_SIGNS.filter(s => (cards[s.key]?.[0] ?? 0) >= 3).length;
export const dueSigns = (cards: SignCards, pool = ALL_SIGNS) => pool.filter(s => isDue(cards[s.key])).length;

// The next session: due signs (the longest waiting first), then new ones, from `pool`.
export function buildSession(cards: SignCards, pool = ALL_SIGNS, n = SESSION): SignCard[] {
  const due = pool.filter(s => isDue(cards[s.key])).sort((a, b) => cards[a.key][1] - cards[b.key][1]);
  const fresh = pool.filter(s => !cards[s.key]);
  const out = [...due.slice(0, n)];
  // New ones from the first group that still has some, mixed within it.
  for (let g = 0; out.length < n && g < SIGN_CATS.length; g++) out.push(...shuffle(fresh.filter(s => s.group === g)).slice(0, n - out.length));
  // Nothing due or new: the ones learned least well.
  if (out.length < n) out.push(...pool.filter(s => !out.includes(s)).sort((a, b) => (cards[a.key]?.[0] ?? 0) - (cards[b.key]?.[0] ?? 0)).slice(0, n - out.length));
  return shuffle(out);
}

// Four meanings to choose from: the right one and three others, from the same group when it has enough.
export function choicesFor(s: SignCard): string[] {
  const same = ALL_SIGNS.filter(x => x.group === s.group && x.key !== s.key);
  const other = ALL_SIGNS.filter(x => x.group !== s.group);
  const pick = shuffle(same).slice(0, 3);
  if (pick.length < 3) pick.push(...shuffle(other).slice(0, 3 - pick.length));
  return shuffle([nameOf(s), ...pick.map(nameOf)]);
}

export const nextCard = (c: [number, number] | undefined, right: boolean, now = Date.now()): [number, number] => {
  const box = right ? Math.min(5, (c?.[0] ?? 0) + 1) : 0;
  return [box, now + BOX_DAYS[box] * DAY];
};

let STATE: SignCards | null = null;
const listeners = new Set<(d: SignCards) => void>();
const publish = (d: SignCards) => { STATE = d; listeners.forEach(f => f(d)); };

export function useSignCards() {
  const [cards, setCards] = useState<SignCards>(STATE ?? {});
  const [loaded, setLoaded] = useState(STATE !== null);
  useEffect(() => {
    const on = (d: SignCards) => { setCards(d); setLoaded(true); };
    listeners.add(on);
    if (STATE === null) api<{ cards: SignCards }>('GET', 'signcards').then(d => publish({ ...(d.cards || {}), ...(STATE ?? {}) })).catch(() => publish(STATE ?? {}));
    return () => { listeners.delete(on); };
  }, []);
  return {
    cards, loaded,
    save: (changed: SignCards) => {
      publish({ ...(STATE ?? {}), ...changed });
      api('POST', 'signcards', { cards: changed }).catch(() => {});
    },
  };
}
