// «جستجو با هوش مصنوعی» on the «آموزش» page: the user writes what they are looking for (in Persian, or Danish), and Claude
// picks the closest items of the app's teaching material: road signs and right-of-way items (mobile/src/lib/guide-data.json),
// the parts of «قوانین» (mobile/src/lib/guide.ts) and the bank's questions (site/data.js), each with why it matches.
// The signs, right-of-way items and rules are sent in full every time (a cached prompt prefix); of the 1000-odd
// questions only the ones whose words best match the search. Answers are kept in memory by search text.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const Anthropic = require('@anthropic-ai/sdk');

const MODEL = process.env.SEARCH_AI_MODEL || 'claude-sonnet-5-5';
const PER_USER_PER_HOUR = 60, MAX_RESULTS = 12;
const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
// Letters folded so Persian / Arabic spellings, half-spaces and Danish letters compare alike.
const norm = s => String(s || '').toLowerCase().replace(/[يى]/g, 'ی').replace(/ك/g, 'ک').replace(/[ة]/g, 'ه').replace(/[أإآ]/g, 'ا')
  .replace(/[ً-ْٰ]/g, '').replace(/[‌‏‎]/g, ' ').replace(/[«»"'()،,.:;!?؟\-–/]/g, ' ').replace(/\s+/g, ' ').trim();
const clip = (s, n) => { s = String(s || '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim(); return s.length > n ? `${s.slice(0, n)}…` : s; };

let ITEMS = new Map(), GUIDE_TEXT = '', QUESTIONS = [], client = null;
const cache = new Map(), usage = new Map();

function init(siteDir) {
  const g = JSON.parse(fs.readFileSync(path.join(__dirname, 'mobile', 'src', 'lib', 'guide-data.json'), 'utf8'));
  const lines = [];
  // Road signs and right of way: one line each, `s:<group>:<index>` / `p:<group>:<index>`.
  for (const [kind, groups] of [['signs', g.signs], ['priority', g.priority]]) for (const cat of groups) cat.items.forEach((it, i) => {
    const id = `${kind[0]}:${cat.id}:${i}`, title = kind === 'signs' ? it.fa : it.title;
    ITEMS.set(id, { id, kind, cat: cat.id, i, key: it.key, title, sub: [it.code, it.da].filter(Boolean).join(' · '), group: cat.title });
    lines.push(`${id} | ${cat.title} | ${[it.code, it.da].filter(Boolean).join(' ')} ${title} | ${clip(it.text, kind === 'signs' ? 90 : 160)}`);
  });
  // The parts of «قوانین»: title, first line and points, `r:<index>`.
  try {
    const ts = fs.readFileSync(path.join(__dirname, 'mobile', 'src', 'lib', 'guide.ts'), 'utf8');
    const block = (/export const RULES[^=]*=\s*\[([\s\S]*?)\n\];/.exec(ts) || [])[1] || '';
    block.split(/\n {2}\},?\s*\n {2}\{/).forEach((part, i) => {
      const title = (/title:\s*'([^']+)'/.exec(part) || [])[1];
      if (!title) return;
      const points = [...(((/points:\s*\[([\s\S]*?)\]/.exec(part) || [])[1]) || '').matchAll(/'([^']+)'/g)].map(m => m[1]);
      const intro = (/intro:\s*'([^']+)'/.exec(part) || [])[1] || '', sign = (((/signs:\s*\[([^\]]*)\]/.exec(part) || [])[1] || '').match(/'([^']+)'/) || [])[1] || '';
      const id = `r:${i}`;
      ITEMS.set(id, { id, kind: 'rules', i, title, sub: '', sign, group: 'قوانین' });
      lines.push(`${id} | قوانین | ${title} | ${clip([intro, ...points].join(' '), 260)}`);
    });
  } catch (e) { console.error('search: rules', e.message); }
  GUIDE_TEXT = lines.join('\n');
  // The questions, with the lessons they are in.
  const js = fs.readFileSync(path.join(siteDir, 'data.js'), 'utf8');
  const bank = JSON.parse(js.slice(js.indexOf('=') + 1).trim().replace(/;$/, ''));
  const lessonOf = new Map();
  bank.tests.forEach((t, k) => t.qs.forEach(id => { if (!lessonOf.has(id)) lessonOf.set(id, { n: +((t.title.match(/\d+/) || [String(k + 1)])[0]), pos: t.qs.indexOf(id) + 1 }); }));
  QUESTIONS = bank.questions.map(q => {
    const topic = (bank.topics[q.c] || {}).fa || '', les = lessonOf.get(q.id);
    const id = `q:${q.id}`;
    ITEMS.set(id, { id, kind: 'question', qid: q.id, img: q.img, title: clip(q.sfa || q.sda, 140), sub: topic,
      group: les ? `درس ${faNum(les.n)} · سؤال ${faNum(les.pos)}` : 'سؤال' });
    const text = [q.sfa, q.sda, topic, ...q.st.map(s => `${s.fa || ''} ${s.da || ''}`)].join(' ');
    return { id, words: norm(text), line: `${id} | ${topic} | ${clip(q.sfa || q.sda, 150)}` };
  });
}

// The questions whose text shares the most words with the search (as candidates; Claude picks among them).
function candidates(query, n = 45) {
  const words = [...new Set(norm(query).split(' ').filter(w => w.length > 1))];
  if (!words.length) return [];
  return QUESTIONS.map(q => ({ q, s: words.reduce((a, w) => a + (q.words.includes(w) ? (w.length > 3 ? 2 : 1) : 0), 0) }))
    .filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, n).map(x => x.q.line);
}

const SYSTEM = `You are the search of a Danish driving-theory app (category B) for Persian speakers. The user writes what they are looking for (usually in Persian, sometimes Danish or English, sometimes a question like "who goes first in a roundabout"). Pick the items of the app's material that best answer it, most relevant first.
Every item is one line: "id | group | title | text". Kinds: s:… road signs, p:… right-of-way situations, r:… parts of the traffic rules, q:… exam questions.
Rules:
- Understand the meaning, not just the words (e.g. "پارک ممنوع" is sign C 62, "چه کسی اول می‌رود" is right of way). Judge by Danish traffic rules.
- Return between 1 and ${MAX_RESULTS} items, only ones that really match; prefer the teaching items (signs, right of way, rules) that explain the topic, then the questions that practise it.
- Use only ids from the lists given; never invent one.
- For each, a short reason in Persian (at most 14 words) saying what in it answers the search.
Answer with JSON only, in exactly this form: {"results":[{"id":"…","why":"…"}]}`;

function allowed(username) {
  const now = Date.now(), list = (usage.get(username) || []).filter(t => now - t < 3600e3);
  usage.set(username, list);
  if (list.length >= PER_USER_PER_HOUR) return false;
  list.push(now); return true;
}

// → { results: [{ id, kind, title, sub, group, why, … }] } (see init for each kind's fields).
async function search(query, username) {
  query = String(query || '').trim().slice(0, 200);
  if (query.length < 2) throw Object.assign(new Error('چیزی برای جستجو بنویسید.'), { status: 400 });
  const key = norm(query);
  if (cache.has(key)) return cache.get(key);
  if (!process.env.ANTHROPIC_API_KEY) throw Object.assign(new Error('جستجوی هوش مصنوعی الان در دسترس نیست.'), { status: 503 });
  if (!allowed(username)) throw Object.assign(new Error('جستجوی زیاد؛ کمی بعد دوباره امتحان کنید.'), { status: 429 });
  client = client || new Anthropic({ timeout: 60e3, maxRetries: 2 });
  const qs = candidates(query);
  const r = await client.messages.create({
    model: MODEL, max_tokens: 1500,
    system: [{ type: 'text', text: SYSTEM }, { type: 'text', text: `Signs, right of way and rules:\n${GUIDE_TEXT}`, cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content: `${qs.length ? `Exam questions that may match:\n${qs.join('\n')}\n\n` : ''}Search: ${query}` }],
  });
  const out = r.content.filter(b => b.type === 'text').map(b => b.text).join('');
  let list = [];
  try { list = JSON.parse((out.match(/\{[\s\S]*\}/) || ['{}'])[0]).results || []; } catch { list = []; }
  const seen = new Set();
  const results = list.filter(x => x && ITEMS.has(x.id) && !seen.has(x.id) && seen.add(x.id)).slice(0, MAX_RESULTS)
    .map(x => ({ ...ITEMS.get(x.id), why: clip(x.why, 120) }));
  const res = { results };
  cache.set(key, res); if (cache.size > 500) cache.delete(cache.keys().next().value);
  return res;
}

module.exports = { init, search };
