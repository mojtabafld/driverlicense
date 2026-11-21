// What a guest or an account without premium can use on the main site while payments are on (Mojtaba, 2026-10-16):
// FREE_RANDOM random exams, the course's first lesson, the first rule, and the first group of the road signs and of
// right of way. Everything else shows a lock and opens the premium page. /app (prove.dk's copy) has no payments, so
// nothing is limited there.
import { router } from 'expo-router';

import { PROVE_PICS } from './config';
import { COURSE } from './course';
import { useApp } from './store';

export const FREE_RANDOM = 3;
export const FIRST_LESSON = COURSE.flatMap(ch => ch.lessons)[0]?.id;

export const toPremium = () => router.push('/premium');

export function useFree() {
  const { locked, attempts } = useApp();
  const limited = locked && !PROVE_PICS;
  // (with «آزمون جدید»'s, the same kind of exam)
  const randomUsed = attempts.filter(a => a.mode === 'random' || a.mode === 'new').length;
  return {
    limited,
    randomLeft: limited ? Math.max(0, FREE_RANDOM - randomUsed) : Infinity,
    lessonOk: (id?: string) => !limited || id === FIRST_LESSON,
    // The rule parts, and the groups of the road signs and of right of way: only the first one (number 0).
    firstOk: (i: number) => !limited || i === 0,
  };
}
