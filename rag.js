// RAG for the app's search (Mojtaba 2026-10-31): the search no longer sends Claude the whole teaching catalogue
// (up to 300 kB) with every query, and it now knows the 1,100 questions too. Each catalogue entry (a course step,
// a part of the rules, a sign, a right-of-way situation) and each of «آزمون جدید»'s questions with its explanations is
// turned into a meaning vector (OpenAI embeddings, RAG_EMBED_MODEL, default text-embedding-3-small; the vault's
// OpenAI key); a query's vector picks the closest entries and questions (cosine), with entries that carry the
// query's sign code (B11, E 53…) always in, and only those go to Claude, which answers from them alone.
// The vectors are kept in the database (Oracle's VECTOR type, table tp_vectors, by the hash of the model and the
// text: store.vectors), so a restart or a new catalogue version embeds only what is new; the search itself runs in
// memory (a few thousand vectors, a few milliseconds). Without an OpenAI key, or until the vectors are made, the
// search works as before (search.js).
'use strict';
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const MODEL = (process.env.RAG_EMBED_MODEL || '').trim() || 'text-embedding-3-small';
const key = () => process.env.OPENAI_API_KEY || process.env.OPENAI_API || '';
const hash = t => crypto.createHash('sha256').update(`${MODEL}\n${t}`).digest('hex').slice(0, 40);

let store = null;
const vecs = new Map();          // hash → Float32Array (normalised)
const questions = [];            // { id: 'q:5001', text, h }
const catalogs = new Map();      // catalogue version → { entries: [{ id, line, h }], ready }
const queries = new Map();       // query text → Float32Array (the newest 500)
let qReady = false, persisted = false, kept = 0;

const norm = v => { let s = 0; for (const x of v) s += x * x; s = Math.sqrt(s) || 1; const o = new Float32Array(v.length); for (let i = 0; i < v.length; i++) o[i] = v[i] / s; return o; };
const dot = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; };

async function embed(texts) {
  const out = [];
  for (let i = 0; i < texts.length; i += 96) {
    const r = await fetch('https://api.openai.com/v1/embeddings', { method: 'POST', signal: AbortSignal.timeout(60e3),
      headers: { Authorization: `Bearer ${key()}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: MODEL, input: texts.slice(i, i + 96) }) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(`embeddings ${r.status}: ${(d.error && d.error.message) || 'error'}`);
    for (const x of d.data.sort((a, b) => a.index - b.index)) out.push(norm(x.embedding));
  }
  return out;
}
// The vectors of these items made where missing (and kept in the database).
async function ensure(items) {
  const need = items.filter(x => !vecs.has(x.h));
  if (!need.length) return;
  const made = await embed(need.map(x => x.text));
  const rows = need.map((x, i) => { vecs.set(x.h, made[i]); return { k: x.h, emb: made[i] }; });
  if (persisted) await store.vectors.put(rows).then(() => { kept += rows.length; }, e => console.error('RAG: keep vectors', e.message));
}

async function init(s, siteDir) {
  store = s;
  if (!key()) return;
  try {
    const js = fs.readFileSync(path.join(siteDir, 'newq.js'), 'utf8'), d = JSON.parse(js.slice(js.indexOf('=') + 1).trim().replace(/;$/, ''));
    for (const q of d.questions) {
      const st = (q.st || []).map(x => `- ${x.ok ? 'TRUE' : 'FALSE'}: ${x.en || x.da} — ${x.een || x.eda || ''}`).join('\n');
      const text = `${q.sen || q.sda}\n${q.sfa || ''}\n${st}`.slice(0, 4000);
      questions.push({ id: `q:${q.id}`, text, h: hash(text) });
    }
  } catch (e) { console.error('RAG: questions', e.message); }
  setTimeout(async () => {
    try {
      if (store.vectors) {
        try { for (const r of await store.vectors.all()) vecs.set(r.k, r.emb); persisted = true; }
        catch (e) { console.error('RAG: no vectors table, kept in memory only:', e.message); }
      }
      await ensure(questions);
      qReady = true;
      console.log(`RAG: ${questions.length} questions, ${vecs.size} vectors (${persisted ? `the database's VECTOR table, ${kept} new kept now` : 'in memory'})`);
    } catch (e) { console.error('RAG: questions not embedded:', e.message); }
  }, 60e3).unref();
}

// A catalogue version (search.js): its entries' vectors made in the background; usable once all are there.
function catalog(v, text) {
  if (!key() || catalogs.has(v)) return;
  const entries = String(text).split('\n').map(line => ({ id: line.split('\t')[0], line })).filter(x => x.id)
    .map(x => ({ ...x, text: x.line.replace(/\t/g, ' — ').slice(0, 2000) })).map(x => ({ ...x, h: hash(x.text) }));
  const c = { entries, ready: false };
  catalogs.set(v, c);
  while (catalogs.size > 3) catalogs.delete(catalogs.keys().next().value);
  ensure(entries).then(() => { c.ready = true; console.log(`RAG: catalogue ${v}, ${entries.length} entries`); }, e => console.error('RAG: catalogue not embedded:', e.message));
}
const ready = v => !!(catalogs.get(v) || {}).ready;

// The entries (at most `n`) and questions (at most `m`) closest to the query, best first.
const CODE = /\b([A-Za-z])\s?(\d{1,3})(?:[.,](\d))?\b/g;
async function retrieve(q, v, { n = 20, m = 6 } = {}) {
  const c = catalogs.get(v);
  let qv = queries.get(q);
  if (!qv) { [qv] = await embed([q]); queries.set(q, qv); while (queries.size > 500) queries.delete(queries.keys().next().value); }
  const codes = [...q.matchAll(CODE)].map(x => `${x[1]}${x[2]}${x[3] ? `.${x[3]}` : ''}`.toUpperCase());
  const scored = c.entries.map(e => ({ e, s: dot(qv, vecs.get(e.h)) + (codes.some(k => e.line.toUpperCase().replace(/\s/g, '').includes(k)) ? 1 : 0) }))
    .sort((a, b) => b.s - a.s).slice(0, n);
  const qs = qReady ? questions.map(x => ({ x, s: dot(qv, vecs.get(x.h)) })).sort((a, b) => b.s - a.s).slice(0, m) : [];
  return { entries: scored.map(x => x.e), questions: qs.map(x => x.x) };
}

const info = () => ({ model: MODEL, questions: qReady ? questions.length : 0, vectors: vecs.size, persisted, catalogs: [...catalogs].map(([v, c]) => ({ v, entries: c.entries.length, ready: c.ready })) });
module.exports = { init, catalog, ready, retrieve, info };
