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

// The official section (the category of the learn page) a question belongs to, e.g. «قواعد پایه‌ی ترافیک»; its
// topic code starts with the section number (7.18 → 7).
export function sectionFa(bank: Bank, c: string): string | null {
  const n = +String(c).split('.')[0];
  return bank.sections.find(s => s.n === n)?.fa ?? null;
}

export const topicFa = (bank: Bank, c: string) => (bank.topics[c] ? `${faNum(c)} ${bank.topics[c].fa}` : 'سایر');
// The topic's name alone, without its number (e.g. a practice exam's title).
export const topicName = (bank: Bank, c: string) => bank.topics[c]?.fa ?? 'سایر';

// Times are shown in Copenhagen time, as on the site.
const TZ = 'Europe/Copenhagen';
// «۲ اکتبر ۲۰۲۶»: a day with its year, e.g. when an account was made.
export const fmtDay = (t: number) =>
  new Date(t).toLocaleDateString('fa-IR-u-ca-gregory', { timeZone: TZ, year: 'numeric', month: 'long', day: 'numeric' });
export const fmtDateTime = (t: number) =>
  new Date(t).toLocaleString('fa-IR-u-ca-gregory', { timeZone: TZ, month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
export const fmtTime = (s: number) => faNum(`${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.round(s % 60)).padStart(2, '0')}`);
