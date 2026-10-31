// «جستجو در آموزش» (app/course-search.tsx): everything the learning pages teach as one list of short entries, so a
// search finds the right page whatever the user types: the course's teaching steps, the rule parts, the road signs
// and the right-of-way situations. `localSearch` ranks them by the words typed (instantly, also offline and without
// premium); the server's AI search (/api/coursesearch) gets the same list and picks the entries that answer the
// question, with a short answer of its own. Each entry knows the page that opens it.
import type { Href } from 'expo-router';

import { ApiError, api } from './api';
import { COURSE } from './course';
import { PRIORITY_CATS, SIGN_CATS } from './guide-data';
import { RULES } from './guide';
import { UI_LANG, tr } from './i18n';
import { faNum } from './logic';

export type SearchKind = 'lesson' | 'rule' | 'sign' | 'priority';
// `alt`: the entry's words in the app's language when it is not Persian (the pages show them translated, so an English
// or Danish search has to find them too; Mojtaba 2026-10-21), and `shown`: its title, place and text (its pieces) in
// that language, for the results list and the glossary's sheet.
export type SearchItem = { id: string; kind: SearchKind; title: string; text: string; where: string; href: Href; free?: 'lesson' | number; lesson?: string; alt?: string;
  shown?: { title: string; where: string; body: string[] } };

const clean = (s: string) => s.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const cut = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);
// Each piece in the app's language, as the page shows it (strings.json has the pieces as they are written, before
// their bold marks are taken off).
const alt = (parts: (string | undefined)[]) => (UI_LANG === 'fa' ? undefined : clean(parts.filter((x): x is string => !!x).map(x => tr(x)).join(' | ')));
const shown = (title: string, where: string[], body: (string | undefined)[]) => (UI_LANG === 'fa' ? undefined
  : { title: clean(title), where: where.join(' | '), body: body.filter((x): x is string => !!x).map(x => clean(tr(x))) });

function build(): SearchItem[] {
  const out: SearchItem[] = [];
  for (const ch of COURSE) {
    for (const l of ch.lessons) {
      l.steps.forEach((s, k) => {
        if (s.kind !== 'intro' && s.kind !== 'teach') return;
        const body = s.kind === 'teach' ? [s.text, s.rule, ...(s.points ?? []), s.trap, s.law] : [s.text, ...s.goals];
        out.push({ id: `c:${l.id}:${k}`, kind: 'lesson', title: clean(s.title), text: clean(body.filter(Boolean).join(' | ')),
          where: `${l.title} | فصل ${faNum(ch.n)}`, href: { pathname: '/course-lesson', params: { id: l.id, step: String(k) } }, free: 'lesson', lesson: l.id,
          alt: alt([s.title, ...body, l.title]), shown: shown(tr(s.title), [tr(l.title), `${tr('فصل')} ${ch.n}`], body) });
      });
    }
  }
  RULES.forEach((r, i) => out.push({ id: `r:${i}`, kind: 'rule', title: clean(r.title), text: clean([r.intro, ...r.points, r.tip].filter(Boolean).join(' | ')),
    where: 'قوانین', href: { pathname: '/rules', params: { open: String(i) } }, free: i, alt: alt([r.title, r.intro, ...r.points, r.tip, 'قوانین']), shown: shown(tr(r.title), [tr('قوانین')], [r.intro, ...r.points, r.tip]) }));
  SIGN_CATS.forEach((g, gi) => g.items.forEach((s, i) => out.push({ id: `s:${g.id}:${i}`, kind: 'sign', title: `${s.code.replace(/^([A-Z]+)(\d)/, '$1 $2')}: ${clean(s.fa)}`,
    text: clean(`${s.da} | ${s.text}`), where: g.title, href: { pathname: '/guide-view', params: { kind: 'signs', cat: g.id, i: String(i) } }, free: gi,
    alt: alt([s.fa, s.text, g.title]), shown: shown(`${s.code.replace(/^([A-Z]+)(\d)/, '$1 $2')}: ${tr(s.fa)}`, [tr(g.title)], [s.da, s.text]) })));
  PRIORITY_CATS.forEach((g, gi) => g.items.forEach((p, i) => out.push({ id: `p:${g.id}:${i}`, kind: 'priority', title: clean(p.title),
    text: clean(`${p.text} | ${p.first} | ${p.law}`), where: `حق تقدم | ${g.title}`, href: { pathname: '/guide-view', params: { kind: 'priority', cat: g.id, i: String(i) } }, free: gi,
    alt: alt([p.title, p.text, p.first, p.law, 'حق تقدم', g.title]), shown: shown(tr(p.title), [tr('حق تقدم'), tr(g.title)], [p.text, p.first, p.law]) })));
  return out;
}

export const SEARCH_ITEMS = build();
const BY_ID = new Map(SEARCH_ITEMS.map(x => [x.id, x]));
export const searchItem = (id: string) => BY_ID.get(id);

// What the AI gets: id, title and the start of the text, one entry per line (the same for every search, so the
// server's prompt cache holds it).
export const AI_CATALOG = SEARCH_ITEMS.map(x => `${x.id}\t${x.title}\t${cut(x.text, x.kind === 'sign' ? 90 : 160)}`).join('\n');

// «آموزش این واژه» in the glossary (Mojtaba 2026-10-23): the server's AI picks, from this whole catalogue (the course's
// steps, the rules, the signs and the right-of-way situations), the one entry that best teaches a term (search.js
// termPage). The app sends the catalogue's hash, and the catalogue itself the first time or when the server asks for it
// (409). Null when nothing fits; throws when it cannot ask (offline, no AI on the server, too many questions).
let catalogV: string | null = null;
export async function aiTermPage(term: { da: string; en: string; fa: string; cat: string }): Promise<SearchItem | null> {
  const ask = (full: boolean) => api<{ id: string | null; v: string }>('POST', 'termpage', full ? { term, catalog: AI_CATALOG } : { term, v: catalogV });
  let r: { id: string | null; v: string };
  try { r = await ask(!catalogV); } catch (e) { if (!(e instanceof ApiError) || e.status !== 409) throw e; r = await ask(true); }
  catalogV = r.v;
  return r.id ? BY_ID.get(r.id) ?? null : null;
}

// «از مربی بپرس» (app/ask.tsx; Mojtaba 2026-10-31): the user's own question answered by the server's AI from the app's
// own material (search.js ask, with rag.js), with up to 3 entries to read more; the talk's last turns go with it.
// The catalogue as for aiTermPage (its hash, the catalogue itself when the server asks). Throws an ApiError (402: premium).
// Whether «از مربی بپرس» shows in the app (off for now, Mojtaba 2026-10-31: its links from the coach page and the
// search are hidden; the page and the server's /api/ask stay).
export const ASK_ON = false;
export type AskTurn = { q: string; a: string; sources: SearchItem[] };
export async function aiAsk(q: string, history: AskTurn[]): Promise<{ answer: string; sources: SearchItem[] }> {
  const prev = history.slice(-3).map(t => ({ q: t.q, a: t.a }));
  const ask = (full: boolean) => api<{ answer: string; sources: string[]; v: string }>('POST', 'ask', { q, ui: UI_LANG, history: prev, ...(full ? { catalog: AI_CATALOG } : { v: catalogV }) });
  let r: { answer: string; sources: string[]; v: string };
  try { r = await ask(!catalogV); } catch (e) { if (!(e instanceof ApiError) || e.status !== 409) throw e; r = await ask(true); }
  catalogV = r.v;
  return { answer: r.answer, sources: r.sources.map(id => BY_ID.get(id)).filter((x): x is SearchItem => !!x) };
}

// Persian / Arabic letters written alike, zero-width joiners, diacritics and Persian / Arabic digits made one form,
// and letters folded to lower case without accents (ø, å and æ kept as Danish writes them), so «تابلو ایست»,
// «تابلوي ايست» and «B13» / «b 13» all match.
export function norm(s: string) {
  return s.toLowerCase()
    .replace(/[ً-ٰٟ]/g, '').replace(/[‌‍‏‎]/g, ' ')
    .replace(/ي/g, 'ی').replace(/ى/g, 'ی').replace(/ك/g, 'ک').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ؤ/g, 'و')
    .replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/([a-z])\s+(\d)/g, '$1$2')
    .replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

// (In English or Danish the translated title counts as the title too, and the rest of the translated words as text.)
const INDEX = SEARCH_ITEMS.map(x => {
  const a = x.alt ? norm(x.alt) : '', head = x.alt ? norm(tr(x.title)) : '';
  return { x, title: ` ${norm(x.title)} ${head} `, text: ` ${norm(x.text)} ${norm(x.where)} ${a} ` };
});

// The entries holding the words typed, best first: a whole word in the title counts most, then the start of a word,
// then anywhere; every word must be found somewhere (in Persian «ها» / «ی» endings are left to the part match).
export function localSearch(q: string, max = 30): SearchItem[] {
  const words = norm(q).split(' ').filter(w => w.length > 1 || /\d/.test(w));
  if (!words.length) return [];
  const scored: { x: SearchItem; s: number }[] = [];
  for (const e of INDEX) {
    let s = 0, all = true;
    for (const w of words) {
      const t = e.title.includes(` ${w} `) ? 12 : e.title.includes(` ${w}`) ? 8 : e.title.includes(w) ? 5
        : e.text.includes(` ${w} `) ? 3 : e.text.includes(` ${w}`) ? 2 : e.text.includes(w) ? 1 : 0;
      if (!t) { all = false; break; }
      s += t;
    }
    if (all) scored.push({ x: e.x, s: s + (e.x.kind === 'lesson' ? 1 : 0) });
  }
  return scored.sort((a, b) => b.s - a.s).slice(0, max).map(r => r.x);
}
