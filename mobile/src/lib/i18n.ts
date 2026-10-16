// The app's language: Persian (as it was written), English or Danish (main site). The texts are written in Persian in
// the code; English and Danish come from i18n/en.json and i18n/da.json, keyed by the Persian text itself, so a text
// is translated wherever it is shown (kit's T does it for every text it shows). A text built with numbers matches its
// key with each number as «#» («درس #» → «Lesson #»), and a quoted part «…» as «@» (that part translated on its own).
// The language is kept in the browser (and in the account's settings, so it follows the user to a new device); a
// change reloads the page, so lists built when the app starts are in the new language too. /app stays Persian.
import { reloadApp } from './reload';
import { Alert, BackHandler, Platform } from 'react-native';

import { PROVE_PICS } from './config';
import STRINGS from './i18n/strings.json';

export type UiLang = 'fa' | 'en' | 'da';
export const UI_LANGS: UiLang[] = ['fa', 'en', 'da'];
const KEY = 'tp.ui';
const valid = (v: unknown): v is UiLang => v === 'fa' || v === 'en' || v === 'da';
// Kept in localStorage on the web and in the secure store on Android (its synchronous calls, read when the app starts).
const web = Platform.OS === 'web';
const read = (): string | null => { try { return web ? localStorage.getItem(KEY) : require('expo-secure-store').getItem(KEY); } catch { return null; } };
const write = (v: string) => { try { if (web) localStorage.setItem(KEY, v); else require('expo-secure-store').setItem(KEY, v); } catch {} };

function initial(): UiLang {
  if (PROVE_PICS) return 'fa';
  // Back from the email's confirmation link (the server's /api/verify): ?ui= names the account's language.
  if (web && typeof window !== 'undefined') {
    const u = new URLSearchParams(window.location.search).get('ui');
    if (valid(u)) { write(u); return u; }
  }
  const v = read(); if (valid(v)) return v;
  return 'fa';
}
export const UI_LANG: UiLang = initial();
// Whether a language was chosen in this browser (else the account's choice is taken when signing in).
export const UI_CHOSEN = valid(read());
// Right to left: Persian only.
export const RTL = UI_LANG === 'fa';

// Keep the language and, when it changes, load the page again in it (web; the Android app takes it when it is opened
// again, so the caller asks for that). Returns whether it changed.
export function setUiLang(l: UiLang): boolean {
  if (PROVE_PICS || !valid(l)) return false;
  write(l);
  if (l === UI_LANG) return false;
  reloadApp(() => askRestart(l));
  return true;
}
// When the app cannot reload itself (reloadApp failed): it says so (in the language it will open in) and closes.
export function askRestart(l: UiLang) {
  const [title, msg, ok] = RESTART[l];
  Alert.alert(title, msg, [{ text: ok, onPress: () => BackHandler.exitApp() }], { cancelable: false });
}
// Keeps the language for the next start without reloading; whether it differs from the one in use.
export function keepUiLang(l: UiLang): boolean {
  if (PROVE_PICS || !valid(l)) return false;
  write(l);
  return l !== UI_LANG;
}
const RESTART: Record<UiLang, [string, string, string]> = {
  fa: ['زبان برنامه', 'برنامه بسته می‌شود؛ دوباره بازش کنید تا به فارسی باز شود.', 'باشه'],
  en: ['App language', 'The app will close; open it again to continue in English.', 'OK'],
  da: ['Appens sprog', 'Appen lukker nu; åbn den igen for at fortsætte på dansk.', 'OK'],
};

const DICT: Record<string, string> | null = UI_LANG === 'fa' ? null
  : Object.fromEntries(Object.entries(STRINGS as unknown as Record<string, [string, string]>).map(([k, v]) => [k, v[UI_LANG === 'en' ? 0 : 1]]));
const PERSIAN = /[؀-ۿ]/;
const NUM = /[0-9۰-۹]+(?:[٫.][0-9۰-۹]+)?/g;
const QUOTE = /«[^«»]*»/g;

// Persian digits (and the Persian decimal sign, percent and punctuation left in numbers) in Latin form.
export function latin(s: string): string {
  return s.replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/٪\s?(\d+(?:٫\d+)?)/g, '$1%')
    .replace(/(\d)٫(\d)/g, UI_LANG === 'da' ? '$1,$2' : '$1.$2').replace(/٪/g, '%');
}

// Texts not found, for finding what still needs a translation (window.__i18nMiss on the web).
const miss: Set<string> = (globalThis as any).__i18nMiss ?? ((globalThis as any).__i18nMiss = new Set<string>());

function fill(tpl: string, nums: string[], quotes: string[]): string {
  let i = 0, j = 0;
  return tpl.replace(/[#@]/g, m => (m === '#' ? latin(nums[i++] ?? '') : quotes[j++] ?? ''));
}

function look(core: string): string | null {
  const hit = DICT![core] ?? DICT![core.replace(/\s+/g, ' ')];
  if (hit != null) return hit;
  const nums: string[] = [], quotes: string[] = [];
  const q = core.replace(QUOTE, m => { quotes.push(m); return '«@»'; });
  const n = q.replace(NUM, m => { nums.push(m); return '#'; });
  const tpl = DICT![n] ?? DICT![n.replace(/\s+/g, ' ')];
  if (tpl == null) return null;
  // A quoted part: translated on its own, in the target language's quotes (the «@» key gives them).
  const inner = quotes.map(m => { const t = tr(m.slice(1, -1)); return t; });
  return fill(tpl, nums, inner);
}

// A Persian text in the app's language (itself in Persian, or when no translation is known).
export function tr(s: string): string {
  const out = tryTr(s);
  if (out != null) return out;
  miss.add(s.trim());
  return s;
}
// The same, or null when the text has no translation.
export function tryTr(s: string): string | null {
  if (!DICT || typeof s !== 'string' || !s) return s;
  if (!PERSIAN.test(s)) return latin(s);
  const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s)!;
  const out = look(m[2]) ?? parts(m[2]);
  return out != null ? m[1] + out + m[3] : null;
}
// A text not found as a whole: one found with a closing mark after it («صبح به‌خیر،»), or a list of found ones
// («تقاطع‌ها، میدان، آزمون فصل»).
const MARK: Record<string, string> = { '،': ',', '؛': ';', '؟': '?', ':': ':', '.': '.', '!': '!' };
function parts(s: string): string | null {
  const end = /^([\s\S]*?)\s*([،؛؟:.!])$/.exec(s);
  if (end) { const v = look(end[1]); if (v != null) return v.replace(/[.!?:;,]$/, '') + MARK[end[2]]; }
  if (s.includes('، ')) {
    const out = s.split('، ').map(x => look(x));
    if (out.every(x => x != null)) return out.join(', ');
  }
  return null;
}

// The language of the translation under a question (Mojtaba, 2026-10-16): by default Persian in a Persian or English
// app, English in a Danish one; the user can pick another in the settings (settings.trans, set by the store through
// setTransLang). The questions' own language follows the app's when it is first chosen (EXAM_FOR).
export type TransLang = 'fa' | 'en' | 'da';
export const TRANS_DEFAULT: TransLang = UI_LANG === 'da' ? 'en' : 'fa';
let transLang: TransLang = TRANS_DEFAULT;
export const getTransLang = () => transLang;
export function setTransLang(l?: TransLang) { transLang = !PROVE_PICS && l ? l : TRANS_DEFAULT; }
export const EXAM_FOR: Record<UiLang, 'da' | 'en'> = { fa: 'en', en: 'en', da: 'da' };
// The translation under a question, when it is not in the exam's own language: from a text's Persian, English and
// Danish forms.
export function transText(exam: 'da' | 'en', v: { fa?: string; en?: string; da?: string }): string | null {
  if (transLang === exam) return null;
  return (transLang === 'fa' ? v.fa : transLang === 'en' ? v.en : v.da) || null;
}
// «Yes.» / «No.» and «Explanation:» in the translation's language.
const WORDS = { fa: { yes: 'بله.', no: 'خیر.', expl: 'توضیح:' }, en: { yes: 'Yes.', no: 'No.', expl: 'Explanation:' }, da: { yes: 'Ja.', no: 'Nej.', expl: 'Forklaring:' } };
export const transWord = (w: 'yes' | 'no' | 'expl') => WORDS[transLang][w];

// A text with parts put in: t('درس بعدی: {0}', title) (the parts are translated too when they are Persian).
export function t(key: string, ...args: (string | number)[]): string {
  const base = DICT ? DICT[key] ?? (miss.add(key), key) : key;
  return latin0(base.replace(/\{(\d+)\}/g, (_, i) => { const v = args[+i]; return typeof v === 'number' ? String(v) : tr(v ?? ''); }));
}
const latin0 = (s: string) => (DICT ? latin(s) : s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]));

// The locale for dates in the app's language.
export const DATE_LOCALE = UI_LANG === 'en' ? 'en-GB' : UI_LANG === 'da' ? 'da-DK' : 'fa-IR-u-ca-gregory';
