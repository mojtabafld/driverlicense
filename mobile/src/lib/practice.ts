// Practice sets built from the user's mistakes, shared by the exam tab and the mistakes page.
import type { Attempt, Question } from './bank';
import { mistakeStats, shuffle, type MistakeStat } from './logic';

// Topics with questions answered wrong, most still-wrong first (then most mistakes).
export function weakTopics(attempts: Attempt[], Q: Map<number, Question>) {
  const by = new Map<string, { c: string; open: number; wrong: number; list: MistakeStat[] }>();
  for (const st of mistakeStats(attempts, id => Q.has(id))) {
    const c = Q.get(st.id)!.c, g = by.get(c) || { c, open: 0, wrong: 0, list: [] };
    g.list.push(st); g.wrong += st.wrong; if (!st.lastOk) g.open++; by.set(c, g);
  }
  return [...by.values()].sort((a, b) => b.open - a.open || b.wrong - a.wrong);
}

// One topic: exactly its still-wrong questions (the number shown beside the topic), in random order; when all of
// them are already fixed, its fixed ones.
export function topicPracticeIds(stats: MistakeStat[]) {
  const open = stats.filter(st => !st.lastOk);
  return shuffle((open.length ? open : stats).map(st => st.id));
}

// The still-wrong questions, most-missed first, `n` at most, in random order.
export function mostMissedIds(attempts: Attempt[], Q: Map<number, Question>, n: number) {
  return shuffle(mistakeStats(attempts, id => Q.has(id)).filter(st => !st.lastOk).slice(0, n).map(st => st.id));
}
