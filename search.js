// AI search of the learning pages («جستجو در آموزش», the step-by-step course's search box): the user types what they
// want to know in any words (Persian, English, Danish, a sign's code…) and Claude picks the entries of the app's own
// teaching material that answer it, with a short answer written from those entries only.
// The material is the app's list of entries (mobile/src/lib/search.ts AI_CATALOG: id, title and the start of the
// text per line). The app sends it with its first search; the server keeps it under its hash (`v`, returned to the
// app, which sends only that from then on), the newest few in memory, and asks for it again (409) when it does not
// know the hash (e.g. after a restart). It goes into the cached system prompt, so a search reads it
// from Anthropic's prompt cache. Results are cached in memory by catalogue + query + app language.
'use strict';
const crypto = require('node:crypto');
const ai = require('./aigateway');
const rag = require('./rag');

const MODEL = process.env.SEARCH_AI_MODEL || process.env.LESSON_AI_MODEL || 'claude-opus-5-5';
const PER_USER_PER_HOUR = 40, ALL_PER_HOUR = 600;
const MAX_CATALOG = 300e3, MAX_RESULTS = 8;

const catalogs = new Map();   // hash → { text, ids: Set }
const results = new Map();    // cache key → { answer, results }
const inflight = new Map(), usage = new Map();
let client = null;

const available = () => !!process.env.ANTHROPIC_API_KEY;
const hashOf = text => crypto.createHash('sha256').update(text).digest('hex').slice(0, 16);

// The app's catalogue: kept under its hash (the newest five versions; older ones are forgotten); returns the hash.
function addCatalog(text) {
  text = String(text || '');
  if (!text || text.length > MAX_CATALOG) return null;
  const v = hashOf(text), ids = new Set(text.split('\n').map(l => l.split('\t')[0]).filter(Boolean));
  catalogs.delete(v); catalogs.set(v, { text, ids });
  rag.catalog(v, text);   // its entries' meaning vectors, for the RAG search (rag.js)
  while (catalogs.size > 5) catalogs.delete(catalogs.keys().next().value);
  return v;
}

function allowed(username) {
  const now = Date.now(), recent = k => { const l = (usage.get(k) || []).filter(t => now - t < 3600e3); usage.set(k, l); return l; };
  const list = recent(username), all = recent('*');
  if (list.length >= PER_USER_PER_HOUR || all.length >= ALL_PER_HOUR) return false;
  list.push(now); all.push(now); return true;
}

const LANG = { fa: 'Persian (فارسی)', en: 'English', da: 'Danish (dansk)' };
const system = catalog => [
  { type: 'text', text: `You are the search of a Danish driving theory test app (category B) for Persian speakers.
The user types what they want to find or know, in any language or spelling (Persian, Finglish, English, Danish, a sign code like B11 or "b 11").
Below is the app's teaching material as a catalogue, one entry per line: id<TAB>title<TAB>start of the text.
Id prefixes: c: a teaching step of the step-by-step course, r: a part of the rules page, s: a road sign, p: a right-of-way situation.

Return JSON:
- "results": the ids of the entries that best answer the query, best first, at most ${MAX_RESULTS}. Only ids from the catalogue. Prefer course steps (c:) when they teach the topic, then rules, signs and situations. Leave out entries that are only loosely related; an empty list when nothing fits.
- "answer": a direct answer to the query in 1 to 3 short sentences, written ONLY from what the catalogue entries say (never add rules, numbers or sign codes that are not in them). When the query is just a topic name, say in one sentence what the entries teach about it. Empty string when nothing in the catalogue fits.
Write the answer in the language named in the request. Keep Danish terms and sign codes as written in the catalogue.

CATALOGUE:
` },
  { type: 'text', text: catalog, cache_control: { type: 'ephemeral', ttl: '1h' } },
];

// The same task with only the retrieved entries, and the app's own questions on the topic as background.
const ragSystem = (entries, questions) => [
  system(entries)[0],
  { type: 'text', text: `${entries}\n\nBACKGROUND (the app's own practice questions on the topic, with their correct answers and explanations; use them to write the answer, but return only catalogue ids):\n${questions || '(none)'}` },
];

const SCHEMA = {
  type: 'object',
  properties: { answer: { type: 'string' }, results: { type: 'array', items: { type: 'string' } } },
  required: ['answer', 'results'],
  additionalProperties: false,
};

// { answer, results: [ids], v }, or throws an Error with .status (409: the catalogue is needed).
async function search({ username, q, v, catalog, ui }) {
  q = String(q || '').replace(/\s+/g, ' ').trim().slice(0, 200);
  if (q.length < 2) throw Object.assign(new Error('چیزی برای جستجو بنویسید.'), { status: 400 });
  v = catalog !== undefined ? addCatalog(catalog) : String(v || '');
  if (!v) throw Object.assign(new Error('فهرست جستجو معتبر نیست.'), { status: 400 });
  const cat = catalogs.get(v);
  if (!cat) throw Object.assign(new Error('catalog'), { status: 409 });
  ui = LANG[ui] ? ui : 'fa';
  const key = `${v}:${ui}:${q.toLowerCase()}`;
  if (results.has(key)) return { ...results.get(key), v };
  if (!available()) throw Object.assign(new Error('unavailable'), { status: 503 });
  if (inflight.has(key)) return { ...(await inflight.get(key)), v };
  if (!allowed(username)) throw Object.assign(new Error('درخواست زیاد؛ کمی بعد دوباره امتحان کنید.'), { status: 429 });
  const job = (async () => {
    // RAG (rag.js): only the entries closest in meaning to the query, and the questions that explain it; the whole
    // catalogue (as before) until its vectors are made or when the embeddings fail.
    let sys = system(cat.text);
    if (rag.ready(v)) {
      try {
        const got = await rag.retrieve(q, v);
        sys = ragSystem(got.entries.map(e => e.line).join('\n'), got.questions.map(x => x.text).join('\n\n'));
      } catch (e) { console.error('RAG search', e.message); }
    }
    const response = await ai.call('search', {
      model: MODEL,
      max_tokens: 2000,
      output_config: { effort: 'low', format: { type: 'json_schema', schema: SCHEMA } },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: sys,
      messages: [{ role: 'user', content: `Answer language: ${LANG[ui]}\nQuery: ${q}` }],
    });
    if (response.stop_reason === 'refusal') throw Object.assign(new Error('جستجو انجام نشد.'), { status: 502 });
    const text = response.content.filter(b => b.type === 'text').map(b => b.text).join('');
    let out;
    try { out = JSON.parse(text); } catch { throw Object.assign(new Error('جستجو انجام نشد.'), { status: 502 }); }
    const ids = [...new Set((Array.isArray(out.results) ? out.results : []).map(String))].filter(id => cat.ids.has(id)).slice(0, MAX_RESULTS);
    const res = { answer: String(out.answer || '').trim().slice(0, 1200), results: ids };
    results.set(key, res);
    while (results.size > 2000) results.delete(results.keys().next().value);
    return res;
  })();
  inflight.set(key, job);
  try { return { ...(await job), v }; } finally { inflight.delete(key); }
}

// «آموزش این واژه» in the glossary (Mojtaba 2026-10-23): the entry of the same catalogue that best teaches one of the
// test's Danish terms ({ da, en, fa, cat }: the word, its English and Persian, its glossary group), asked of the same
// model with the same cached system prompt as the search, so it reads the catalogue from the prompt cache. Each term's
// pick is kept in the store (meta 'termpages': per catalogue version, the newest three), so a term is asked about once,
// for every account: { id (null: nothing fits), v }, or throws with .status like `search` (409: the catalogue is needed).
const TERM_VERSIONS = 3;
async function termPage({ store, username, term, v, catalog }) {
  const t = term && typeof term === 'object' ? term : {};
  const one = (s, n) => String(s || '').replace(/\s+/g, ' ').trim().slice(0, n);
  const da = one(t.da, 80), en = one(t.en, 120), fa = one(t.fa, 160), group = one(t.cat, 20);
  if (!da) throw Object.assign(new Error('واژه‌ای برای جستجو نیست.'), { status: 400 });
  v = catalog !== undefined ? addCatalog(catalog) : String(v || '');
  if (!v) throw Object.assign(new Error('فهرست جستجو معتبر نیست.'), { status: 400 });
  const cat = catalogs.get(v);
  if (!cat) throw Object.assign(new Error('catalog'), { status: 409 });
  const slot = `v:${v}`;   // (a prefix, so a version never reads as a number and keeps its place among the keys)
  const kept = (store.meta.termpages || {})[slot] || {};
  if (Object.prototype.hasOwnProperty.call(kept, da)) return { id: kept[da] && cat.ids.has(kept[da]) ? kept[da] : null, v };
  if (!available()) throw Object.assign(new Error('unavailable'), { status: 503 });
  const key = `term:${v}:${da}`;
  if (inflight.has(key)) return { ...(await inflight.get(key)), v };
  if (!allowed(username)) throw Object.assign(new Error('درخواست زیاد؛ کمی بعد دوباره امتحان کنید.'), { status: 429 });
  const job = (async () => {
    const response = await ai.call('search-term', {
      model: MODEL,
      max_tokens: 1000,
      output_config: { effort: 'low', format: { type: 'json_schema', schema: SCHEMA } },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: system(cat.text),
      messages: [{ role: 'user', content: `Answer language: ${LANG.fa}
Query: the learning page for a term of the app's glossary of the theory test.
Term (Danish): «${da}»
English: ${en}
Persian: ${fa}
Glossary group: ${group}
Pick the entries where a learner best learns what this term means and the rule about it, best first, at most 3. First an entry whose title or text has the term itself or its meaning. For a road sign or road marking, its sign entry (s:); for right of way, a right-of-way situation (p:) or the course step (c:) that teaches it; otherwise the course step (c:) or the rules part (r:) that explains it. Leave "answer" empty.` }],
    });
    if (response.stop_reason === 'refusal') throw Object.assign(new Error('جستجو انجام نشد.'), { status: 502 });
    const text = response.content.filter(b => b.type === 'text').map(b => b.text).join('');
    let out;
    try { out = JSON.parse(text); } catch { throw Object.assign(new Error('جستجو انجام نشد.'), { status: 502 }); }
    const id = (Array.isArray(out.results) ? out.results : []).map(String).find(x => cat.ids.has(x)) || null;
    // Kept under this version, the newest last; older versions beyond the newest three are dropped.
    const all = { ...(store.meta.termpages || {}) }, mine = { ...(all[slot] || {}), [da]: id || '' };
    delete all[slot]; all[slot] = mine;
    for (const k of Object.keys(all).slice(0, -TERM_VERSIONS)) delete all[k];
    store.meta.termpages = all;
    await store.saveMeta('termpages', all);
    return { id };
  })();
  inflight.set(key, job);
  try { return { ...(await job), v }; } finally { inflight.delete(key); }
}

// «از مربی بپرس» (Mojtaba 2026-10-31): the user's own question about the theory test, in any words, answered like a
// teacher from the app's own material only: the catalogue's entries closest in meaning to it and «آزمون جدید»'s
// questions on it with their explanations (rag.js; the whole catalogue until its vectors are made), with the entries
// to read more (their ids; the app opens their pages). The last few turns of the talk go with it, so a follow-up
// («و در شب؟») is understood. { answer, sources: [ids], v }, or an Error with .status (409: the catalogue is needed).
const ASK_SCHEMA = {
  type: 'object',
  properties: { answer: { type: 'string' }, sources: { type: 'array', items: { type: 'string' } } },
  required: ['answer', 'sources'],
  additionalProperties: false,
};
const askSystem = (entries, questions) => [
  { type: 'text', text: `You are the friendly teacher inside a Danish driving theory test app (category B) for Persian speakers.
The learner asks a question in their own words (any language or spelling). Answer it like a good teacher: clearly, correctly and briefly, using ONLY the app's material below (its teaching entries, and its practice questions with their correct answers and explanations). Never add rules, numbers, distances, speeds or sign codes that the material does not give. Denmark's rules only.
If the material does not answer the question, or the question is not about driving, the traffic rules or the theory test, say so in one friendly sentence and suggest what they could ask instead; then "sources" is empty.

Return JSON:
- "answer": the answer in the language named in the request, 2 to 6 short sentences; a few lines that start with "- " when steps or a list read better. Keep Danish terms and sign codes as the material writes them. No headings, no markdown other than "- " lines.
- "sources": the ids of the teaching entries (never of practice questions) where the learner reads more about it, best first, at most 3; only ids that appear in the material.
Id prefixes: c: a step of the step-by-step course, r: a part of the rules page, s: a road sign, p: a right-of-way situation.

TEACHING ENTRIES (id<TAB>title<TAB>start of the text):
` },
  { type: 'text', text: `${entries}\n\nPRACTICE QUESTIONS (background):\n${questions || '(none)'}`, ...(questions === null ? { cache_control: { type: 'ephemeral', ttl: '1h' } } : {}) },
];
async function ask({ username, q, v, catalog, ui, history }) {
  q = String(q || '').replace(/\s+/g, ' ').trim().slice(0, 400);
  if (q.length < 3) throw Object.assign(new Error('سؤالتان را بنویسید.'), { status: 400 });
  v = catalog !== undefined ? addCatalog(catalog) : String(v || '');
  if (!v) throw Object.assign(new Error('فهرست جستجو معتبر نیست.'), { status: 400 });
  const cat = catalogs.get(v);
  if (!cat) throw Object.assign(new Error('catalog'), { status: 409 });
  ui = LANG[ui] ? ui : 'fa';
  if (!available()) throw Object.assign(new Error('unavailable'), { status: 503 });
  if (!allowed(username)) throw Object.assign(new Error('درخواست زیاد؛ کمی بعد دوباره امتحان کنید.'), { status: 429 });
  const turns = (Array.isArray(history) ? history : []).slice(-3)
    .map(t => ({ q: String((t && t.q) || '').slice(0, 400), a: String((t && t.a) || '').slice(0, 1500) })).filter(t => t.q && t.a);
  let sys = askSystem(cat.text, null);
  if (rag.ready(v)) {
    try {
      // (A follow-up is looked up with the question before it, so «و در شب؟» finds the same topic.)
      const got = await rag.retrieve(turns.length ? `${turns[turns.length - 1].q} ${q}` : q, v, { n: 14, m: 6 });
      sys = askSystem(got.entries.map(e => e.line).join('\n'), got.questions.map(x => x.text).join('\n\n'));
    } catch (e) { console.error('RAG ask', e.message); }
  }
  const messages = [];
  for (const t of turns) messages.push({ role: 'user', content: t.q }, { role: 'assistant', content: JSON.stringify({ answer: t.a, sources: [] }) });
  messages.push({ role: 'user', content: `Answer language: ${LANG[ui]}\nQuestion: ${q}` });
  const response = await ai.call('ask', {
    model: MODEL,
    max_tokens: 2000,
    output_config: { effort: 'low', format: { type: 'json_schema', schema: ASK_SCHEMA } },
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system: sys,
    messages,
  });
  if (response.stop_reason === 'refusal') throw Object.assign(new Error('پاسخی پیدا نشد.'), { status: 502 });
  let out;
  try { out = JSON.parse(ai.text(response)); } catch { throw Object.assign(new Error('پاسخی پیدا نشد.'), { status: 502 }); }
  const sources = [...new Set((Array.isArray(out.sources) ? out.sources : []).map(String).filter(x => cat.ids.has(x)))].slice(0, 3);
  return { answer: String(out.answer || '').trim().slice(0, 2500), sources, v };
}

module.exports = { search, termPage, ask, searchAvailable: available };
