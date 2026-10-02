// Names and labels shared by the home screen and the answer review, worded as on the site.
import type { Attempt, Bank } from './bank';
import { faNum, lessonNumber } from './logic';

// «آزمون تصادفی», «درس ۱۲», …
export function modeName(a: Pick<Attempt, 'mode' | 'lesson'>, bank: Bank | null) {
  if (a.mode === 'lesson') {
    const i = bank ? bank.tests.findIndex(t => t.id === a.lesson) : -1;
    return i >= 0 ? `درس ${faNum(lessonNumber(bank!.tests[i].title, i))}` : 'درس';
  }
  return ({ mistakes: 'تمرین اشتباهات', top: 'پراشتباه‌ترین سؤالات', sections: 'آموزش بر اساس دسته‌بندی' } as Record<string, string>)[a.mode] || 'آزمون تصادفی';
}

// Where a question appears on prove.dk, e.g. «prove.dk 1 · #2» (test number and position), like the site's badges.
const srcCache = new WeakMap<Bank, Map<number, string[]>>();
export function srcLabels(bank: Bank, qid: number): string[] {
  let m = srcCache.get(bank);
  if (!m) {
    m = new Map();
    for (const t of bank.tests) t.qs.forEach((id, i) => {
      const l = `prove.dk ${(t.title.match(/\d+/) || [String(t.id)])[0]} · #${i + 1}`;
      m!.set(id, [...(m!.get(id) || []), l]);
    });
    srcCache.set(bank, m);
  }
  return m.get(qid) || [];
}

export const topicFa = (bank: Bank, c: string) => (bank.topics[c] ? `${faNum(c)} ${bank.topics[c].fa}` : 'سایر');

// Times are shown in Copenhagen time, as on the site.
const TZ = 'Europe/Copenhagen';
export const fmtDateTime = (t: number) =>
  new Date(t).toLocaleString('fa-IR-u-ca-gregory', { timeZone: TZ, month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
export const fmtTime = (s: number) => faNum(`${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.round(s % 60)).padStart(2, '0')}`);
