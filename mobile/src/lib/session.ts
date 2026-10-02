// Hand-off between screens: the exam to run next, and the finished/past attempt to show.
import type { Attempt } from './bank';

export type ExamPlan = { mode: 'random' | 'mistakes' | 'lesson' | 'sections'; ids: number[]; lesson?: number; title: string };
export const session: { plan: ExamPlan | null; result: Attempt | null; fresh: boolean } = { plan: null, result: null, fresh: false };
