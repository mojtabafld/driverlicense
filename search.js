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
const Anthropic = require('@anthropic-ai/sdk');

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
    client = client || new Anthropic({ timeout: 60e3, maxRetries: 1 });
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 2000,
      output_config: { effort: 'low', format: { type: 'json_schema', schema: SCHEMA } },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: system(cat.text),
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

module.exports = { search, searchAvailable: available };
