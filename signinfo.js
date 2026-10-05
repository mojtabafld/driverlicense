// Keywords for the road signs of «علائم رانندگی», written by Claude: for each sign its English name and a few key terms
// (Danish, English and Persian) as they come up in theory-test questions. Made once per group, the first time someone
// opens it (one request for the whole group), and kept in store.meta.signInfo = { [key]: { en, kw: [{ da, en, fa }] } }.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const Anthropic = require('@anthropic-ai/sdk');

const MODEL = process.env.LESSON_MODEL || 'claude-opus-5-5';
const SYSTEM = `You help Persian speakers learn the Danish road signs for the Danish driving-theory test (category B).
For every sign you get (code, official Danish name, Persian title and the Persian explanation), give:
- "en": the sign's usual English name, short (at most 8 words);
- "kw": 3 or 4 key terms a learner should connect with this sign, as they appear in Danish theory-test questions (e.g. "vigepligt", "hajtænder", "fodgængerfelt", "overhaling"), each with "da" (the Danish term, lower case unless a proper name), "en" (its English equivalent) and "fa" (a short Persian meaning, 1–4 words). Prefer terms about what the driver must do or watch for; do not repeat the sign's full name as a term.
Answer with JSON only: {"items":[{"code":"…","en":"…","kw":[{"da":"…","en":"…","fa":"…"}]}]} in the same order as given.`;

let store = null, client = null, DATA = { signs: [] };
const inflight = new Map();

function init(s) {
  store = s;
  try { DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'mobile', 'src', 'lib', 'guide-data.json'), 'utf8')); } catch (e) { console.error('sign info', e.message); }
}
const available = () => !!process.env.ANTHROPIC_API_KEY;
const meta = () => (store.meta.signInfo = store.meta.signInfo || {});

// What is known for group `cat` ({ [key]: { en, kw } }); the missing ones are written first when Claude is available.
async function forGroup(cat) {
  const g = DATA.signs.find(x => x.id === cat);
  if (!g) throw Object.assign(new Error('گروه پیدا نشد.'), { status: 404 });
  const m = meta(), missing = g.items.filter(i => !m[i.key]);
  if (missing.length && available()) {
    if (!inflight.has(cat)) inflight.set(cat, write(missing).finally(() => inflight.delete(cat)));
    await inflight.get(cat).catch(e => console.error('sign info', cat, e.message));
  }
  return Object.fromEntries(g.items.filter(i => m[i.key]).map(i => [i.key, m[i.key]]));
}

async function write(items) {
  client = client || new Anthropic({ timeout: 180e3, maxRetries: 2 });
  const list = items.map(i => `${i.code} | ${i.da} | ${i.fa} | ${i.text.replace(/\*\*/g, '')}`).join('\n');
  const r = await client.beta.messages.create({
    model: MODEL, max_tokens: 12000, output_config: { effort: 'low' },
    betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default',
    system: SYSTEM, messages: [{ role: 'user', content: `The signs (code | Danish name | Persian title | Persian explanation):\n${list}` }],
  });
  const text = r.content.filter(b => b.type === 'text').map(b => b.text).join('').trim();
  const json = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
  const m = meta(), byCode = new Map((json.items || []).map(x => [String(x.code).replace(/\s/g, ''), x]));
  items.forEach((i, k) => {
    const x = byCode.get(i.code) || (json.items || [])[k];
    if (!x || !x.en || !Array.isArray(x.kw)) return;
    m[i.key] = { en: String(x.en).slice(0, 80), kw: x.kw.slice(0, 4).map(w => ({ da: String(w.da || '').slice(0, 40), en: String(w.en || '').slice(0, 40), fa: String(w.fa || '').slice(0, 40) })).filter(w => w.da) };
  });
  await store.saveMeta('signInfo', m);
}

module.exports = { init, forGroup, available };
