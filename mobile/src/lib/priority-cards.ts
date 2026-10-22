// «تمرین سریع حق تقدم» (app/priority-cards.tsx; Mojtaba 2026-10-22): flash cards of the right-of-way situations
// (lib/guide-data.ts PRIORITY_CATS), as the road signs' (lib/sign-cards.ts): the same boxes and spaced repetition, kept in
// the same store with the account (/api/signcards; these keys start with «p-», the signs' with «s-»). The question is who
// goes first, with four of the situations' answers to choose from.
import { PRIORITY_CATS, type Scenario } from './guide-data';
import { shuffle } from './logic';
import { isDue, SESSION, type SignCards } from './sign-cards';

export type PriorityCard = Scenario & { group: number };

// Every situation with an answer of its own (two with the same answer cannot be told apart by it).
const seen = new Map<string, number>();
for (const g of PRIORITY_CATS) for (const s of g.items) seen.set(s.first, (seen.get(s.first) ?? 0) + 1);
export const ALL_PRIORITY: PriorityCard[] = PRIORITY_CATS.flatMap((g, group) => g.items.filter(s => s.first && seen.get(s.first) === 1).map(s => ({ ...s, group })));

export const learnedPriority = (cards: SignCards) => ALL_PRIORITY.filter(s => (cards[s.key]?.[0] ?? 0) >= 3).length;
export const duePriority = (cards: SignCards, pool = ALL_PRIORITY) => pool.filter(s => isDue(cards[s.key])).length;

// The next session: due situations (the longest waiting first), then new ones in the groups' order, then the ones
// learned least well.
export function buildPrioritySession(cards: SignCards, pool = ALL_PRIORITY, n = SESSION): PriorityCard[] {
  const due = pool.filter(s => isDue(cards[s.key])).sort((a, b) => cards[a.key][1] - cards[b.key][1]);
  const fresh = pool.filter(s => !cards[s.key]);
  const out = [...due.slice(0, n)];
  for (let g = 0; out.length < n && g < PRIORITY_CATS.length; g++) out.push(...shuffle(fresh.filter(s => s.group === g)).slice(0, n - out.length));
  if (out.length < n) out.push(...pool.filter(s => !out.includes(s)).sort((a, b) => (cards[a.key]?.[0] ?? 0) - (cards[b.key]?.[0] ?? 0)).slice(0, n - out.length));
  return shuffle(out);
}

// Four answers to choose from: the right one and three others, from the same group when it has enough.
export function priorityChoices(s: PriorityCard): string[] {
  const same = ALL_PRIORITY.filter(x => x.group === s.group && x.key !== s.key);
  const other = ALL_PRIORITY.filter(x => x.group !== s.group);
  const pick = shuffle(same).slice(0, 3);
  if (pick.length < 3) pick.push(...shuffle(other).slice(0, 3 - pick.length));
  return shuffle([s.first, ...pick.map(x => x.first)]);
}
