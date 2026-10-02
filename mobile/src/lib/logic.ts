// Exam rules and statistics, the same as on the web site (site/app.js).
import type { Attempt, Bank, Item, Question } from './bank';

export const FULL = 25;
export const SIZES = [5, 10, 15, 20, 25];
export const SECONDS_PER_Q = 60;
// Pass with at most 1 wrong picture in 5 (20 of 25), as in the official test.
export const passMin = (n: number) => n - Math.floor(n / 5);
export const scoreOf = (a: Attempt) => a.items.filter(x => x.ok).length;
export const isFull = (a: Attempt) => a.items.length >= FULL;
export const isPass = (a: Attempt) => isFull(a) && scoreOf(a) >= passMin(a.items.length);
export const pctOf = (a: Attempt) => scoreOf(a) / Math.max(1, a.items.length);

export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// A picture counts as right only when every statement is answered right.
export function grade(q: Question, ticks: boolean[]): Item & { wrong: boolean[] } {
  const a = q.st.map((_, k) => (ticks[k] ? 1 : 0));
  const wrong = q.st.map((s, k) => a[k] !== s.ok);
  return { id: q.id, a, wrong, ok: wrong.every(w => !w), w: wrong.filter(Boolean).length };
}

export const randomIds = (bank: Bank, size: number) => shuffle(bank.questions.map(q => q.id)).slice(0, size);

// Questions whose latest answer was wrong, most recent first.
export function mistakeIds(attempts: Attempt[]): number[] {
  const last = new Map<number, boolean>();
  attempts.forEach(a => a.items.forEach(it => last.set(it.id, it.ok)));
  return [...last].filter(([, ok]) => !ok).map(([id]) => id).reverse();
}

// ---- pass probability (beta-binomial, see site/app.js for the reasoning) ----
const PASS_HALF_LIFE = 50, PASS_MAX_ANSWERS = 200, REPEAT_WEIGHT = 0.5;
function logGamma(x: number): number {
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
    12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
  x -= 1; let a = c[0]; const t = x + 7.5;
  for (let i = 1; i < 9; i++) a += c[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}
const logBeta = (a: number, b: number) => logGamma(a) + logGamma(b) - logGamma(a + b);
function betaBinomTailAtLeast(n: number, k: number, a: number, b: number) {
  let s = 0;
  for (let i = k; i <= n; i++) s += Math.exp(logGamma(n + 1) - logGamma(i + 1) - logGamma(n - i + 1) + logBeta(i + a, n - i + b) - logBeta(a, b));
  return Math.min(1, s);
}
export function passEstimate(attempts: Attempt[]) {
  const seen = new Set<number>(), random: any[] = [], any: any[] = [];
  attempts.forEach((att, e) => att.items.forEach(it => {
    const x = { ok: it.ok, repeat: seen.has(it.id), exam: e };
    any.push(x); if (att.mode === 'random') random.push(x);
    seen.add(it.id);
  }));
  const recent = (random.length ? random : any).slice(-PASS_MAX_ANSWERS);
  if (!recent.length) return null;
  const newer: Record<number, number> = {};
  recent.forEach(x => { for (const k in newer) if (+k < x.exam) newer[k]++; newer[x.exam] = newer[x.exam] || 0; });
  let good = 0, bad = 0;
  recent.forEach(x => { const w = 0.5 ** (newer[x.exam] / PASS_HALF_LIFE) * (x.repeat ? REPEAT_WEIGHT : 1); if (x.ok) good += w; else bad += w; });
  const a = 1 + good, b = 1 + bad;
  return { p: a / (a + b), prob: betaBinomTailAtLeast(FULL, passMin(FULL), a, b), n: recent.length };
}

// Persian digits, as on the site.
export const faNum = (v: number | string) => String(v).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);
export const lessonNumber = (title: string, i: number) => (title.match(/\d+/) || [String(i + 1)])[0];
export const fmtDate = (t: number) => new Date(t).toLocaleDateString('fa-IR-u-ca-gregory', { month: 'short', day: 'numeric' });
