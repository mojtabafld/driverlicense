// The notifications' texts in the phone apps (lib/push.native.ts schedules them on the phone itself), in Persian and
// put in the app's language with tr (i18n/strings.json). The same messages as the server's web push (push.js).
export const TITLE = { remind: 'یادآوری روزانه', daily: 'تمرین امروز', test: 'اعلان آزمایشی' } as const;
export const REMIND = {
  lesson: ['وقت یادگیری است! درس بعدی آموزش گام‌به‌گام منتظر شماست.', '/course'],
  exam: ['وقت آزمون است! یک آزمون بدهید و ببینید چقدر آماده‌اید.', '/exam'],
} as const;
// One a day, in turn: the parts of the app and, among them, an exam.
export const DAILY: readonly (readonly [string, string])[] = [
  ['درس بعدی آموزش گام‌به‌گام منتظر شماست؛ فقط چند دقیقه وقت می‌گیرد.', '/course'],
  ['پنج دقیقه مرور تابلوها: کوتاه، ولی در آزمون حسابی به کار می‌آید.', '/signs'],
  ['آماده‌ی آزمون هستید؟ یک آزمون ۲۵ سؤالی بدهید و ببینید کجا هستید.', '/exam'],
  ['سؤال‌هایی را که اشتباه جواب داده‌اید دوباره تمرین کنید.', '/mistakes'],
  ['قاعده‌ی دست راست را چقدر خوب بلدید؟ بخش حق تقدم را مرور کنید.', '/priority'],
  ['امروز چند اصطلاح دانمارکی آزمون را یاد بگیرید.', '/glossary'],
  ['قوانین سرعت و پارک را یک بار دیگر مرور کنید.', '/rules'],
];
export const TEST = 'اعلان‌ها روشن است. یادآوری‌ها همین‌طور به شما می‌رسند.';

// The day's own minute for the daily message, between 10:00 and 19:59, the same all day for the account; kept at
// least an hour and a half from its reminder (as push.js does).
export function dailyMinute(seed: string, date: string, remind: string | null): number {
  let h = 2166136261;
  for (const ch of `${seed}|${date}`) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  let m = 600 + (h % 600);
  if (remind) {
    const r = +remind.slice(0, 2) * 60 + +remind.slice(3, 5);
    if (Math.abs(m - r) < 90) m = r >= 900 ? 600 + (h % 150) : 1050 + (h % 150);
  }
  return m;
}
