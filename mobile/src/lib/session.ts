// Hand-off between screens: the exam to run next, and the finished/past attempt to show.
import type { Attempt } from './bank';

// new: «آزمون جدید», random questions of the app's own (lib/new-test.ts), an exam like the random one; demo: a short
// tryout of the test page from home's pass ring before the first test (not one of the free tests; Mojtaba 2026-10-30).
export type ExamPlan = { mode: 'random' | 'mistakes' | 'lesson' | 'sections' | 'new' | 'demo'; ids: number[]; lesson?: number; title: string };
export const session: { plan: ExamPlan | null; result: Attempt | null; fresh: boolean } = { plan: null, result: null, fresh: false };
