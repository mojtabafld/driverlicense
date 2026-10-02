// Practice sets built from the user's mistakes, shared by the exam tab and the mistakes page.
import type { Attempt, Bank, Question } from './bank';
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

// One topic: its still-wrong questions first, then the fixed ones, then other questions of the topic (10 at most).
export function topicPracticeIds(bank: Bank, stats: MistakeStat[], code: string) {
  const first = [...shuffle(stats.filter(st => !st.lastOk).map(st => st.id)), ...shuffle(stats.filter(st => st.lastOk).map(st => st.id))];
  const rest = shuffle(bank.questions.filter(q => q.c === code && !first.includes(q.id)).map(q => q.id));
  return shuffle([...first, ...rest].slice(0, 10));
}

// The still-wrong questions, most-missed first, `n` at most, in random order.
export function mostMissedIds(attempts: Attempt[], Q: Map<number, Question>, n: number) {
  return shuffle(mistakeStats(attempts, id => Q.has(id)).filter(st => !st.lastOk).slice(0, n).map(st => st.id));
}
