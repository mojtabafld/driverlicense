// The admin's decisions on «آزمون جدید»'s own 1100 questions (site/newq.js), made on the picture page
// (console/images.html, «سؤالات»): a question bookmarked to look at again later, taken out of the bank, or rewritten
// by the AI on the admin's instruction (a proposal first, saved only once the admin applies it; the original can be
// brought back). Kept in store.meta.newqAdmin = { marks: { [id]: at }, removed: { [id]: at }, edits: { [id]: { at, by,
// q: { sda, sfa, sen, st } } } }.
// The app gets site/newq.js with the edits in place and each removed question marked `x: 1`: it is kept, so the tests
// already taken with it can still be reviewed, but never picked for a new test (mobile/src/lib/store.tsx).
'use strict';
const fs = require('node:fs');
const path = require('node:path');

let store = null, imagegen = null, ORIG = new Map(), ORDER = [], OTHER = {};
function init(s, ig, siteDir) {
  store = s; imagegen = ig;
  try {
    const js = fs.readFileSync(path.join(siteDir, 'newq.js'), 'utf8'), d = JSON.parse(js.slice(js.indexOf('=') + 1).trim().replace(/;$/, ''));
    const { questions, ...rest } = d;
    OTHER = rest; ORDER = questions.map(q => q.id); ORIG = new Map(questions.map(q => [q.id, q]));
  } catch (e) { console.error('new questions (admin)', e.message); }
}
const meta = () => {
  const m = (store.meta.newqAdmin = store.meta.newqAdmin || {});
  m.marks = m.marks || {}; m.removed = m.removed || {}; m.edits = m.edits || {};
  return m;
};
let built = null;
const save = () => { built = null; return store.saveMeta('newqAdmin', meta()); };
const known = id => { id = Math.trunc(+id); if (!ORIG.has(id)) throw Object.assign(new Error('این سؤال پیدا نشد.'), { status: 404 }); return id; };

// A question as the app gets it: the admin's edit in place, marked when removed.
function current(id) {
  const m = meta(), q = ORIG.get(id), e = m.edits[id];
  return { ...q, ...(e ? e.q : {}), ...(m.removed[id] ? { x: 1 } : {}) };
}
// site/newq.js for the app, built again after each change.
function js() {
  if (!built) built = Buffer.from(`window.NEWQ=${JSON.stringify({ ...OTHER, questions: ORDER.map(current) })};`);
  return built;
}
// The page's flags for its lists: { [id]: { m?: 1, x?: 1, e?: 1, name? } } (name: the edited Persian text).
function flags() {
  const m = meta(), out = {};
  const f = id => (out[id] = out[id] || {});
  for (const id of Object.keys(m.marks)) f(id).m = 1;
  for (const id of Object.keys(m.removed)) f(id).x = 1;
  for (const [id, e] of Object.entries(m.edits)) { f(id).e = 1; f(id).name = e.q.sfa; }
  return out;
}
// One question for the page: as the app has it, the original when edited, and the admin's marks.
function item(id) {
  id = known(id);
  const m = meta(), e = m.edits[id];
  return { id, q: current(id), orig: e ? ORIG.get(id) : null, edited: e ? { at: e.at, by: e.by } : null, marked: !!m.marks[id], removed: !!m.removed[id] };
}
async function mark(id, on) { id = known(id); const m = meta(); if (on) m.marks[id] = Date.now(); else delete m.marks[id]; await save(); return item(id); }
async function remove(id, on) { id = known(id); const m = meta(); if (on) m.removed[id] = Date.now(); else delete m.removed[id]; await save(); return item(id); }

// A question's text checked and cut to its fields (an AI's proposal, or what the admin applies).
const txt = (v, n = 1200) => String(v ?? '').trim().slice(0, n);
function clean(q) {
  const st = Array.isArray(q && q.st) ? q.st.slice(0, 6).map(s => ({ da: txt(s.da), fa: txt(s.fa), ok: s.ok ? 1 : 0, eda: txt(s.eda), efa: txt(s.efa), en: txt(s.en), een: txt(s.een) })) : [];
  const out = { sda: txt(q && q.sda), sfa: txt(q && q.sfa), sen: txt(q && q.sen), st };
  if (!out.sda || !out.sfa || !out.sen || st.length < 2 || st.some(s => !s.da || !s.fa || !s.en)) throw Object.assign(new Error('سؤال ناقص است (متن سؤال در سه زبان و دست‌کم دو گزینه لازم است).'), { status: 400 });
  return out;
}

const EDIT = `You edit one question of a Danish driving-theory practice app (category B, the official theory test's format): a situation, the question in Danish with its Persian and English translations, and 2 to 4 statements to tick, each true (ok 1) or false (ok 0), each with a short explanation in Danish, Persian and English.
The app's admin tells you (in Persian or English) what to change. Do exactly that, and keep everything else as it is.
Whatever you write must be correct under Danish law and the official rules for the theory test (Færdselsloven, Bekendtgørelse om vejafmærkning); every explanation says why the statement is true or false, short and clear, citing the rule where it helps. The three languages always say the same thing. The Persian is natural, fluent Persian.
Answer with JSON only, no other text: {"sda": "...", "sfa": "...", "sen": "...", "st": [{"da": "...", "fa": "...", "en": "...", "ok": 1, "eda": "...", "efa": "...", "een": "..."}, ...], "note": "one short sentence in Persian: what you changed"}`;
// «ویرایش با هوش مصنوعی»: a rewritten question from the admin's instruction, not saved yet.
async function aiEdit(id, instruction) {
  id = known(id);
  instruction = txt(instruction, 2000);
  if (!instruction) throw Object.assign(new Error('بنویسید چه چیزی باید تغییر کند.'), { status: 400 });
  const q = current(id);
  const input = { topic: q.c, sda: q.sda, sfa: q.sfa, sen: q.sen, st: q.st };
  const out = await imagegen.writeText(EDIT, `The question now:\n${JSON.stringify(input, null, 1)}\n\nThe admin's instruction:\n${instruction}`, null, 6000);
  let d;
  try { d = JSON.parse(out.slice(out.indexOf('{'), out.lastIndexOf('}') + 1)); }
  catch { throw Object.assign(new Error('پاسخ هوش مصنوعی خوانده نشد؛ دوباره امتحان کنید.'), { status: 502 }); }
  return { q: clean(d), note: txt(d.note, 400) };
}
// «اعمال»: the (possibly further edited) proposal becomes the question the app shows.
async function applyEdit(id, q, by) {
  id = known(id);
  meta().edits[id] = { at: Date.now(), by, q: clean(q) };
  await save();
  return item(id);
}
async function revert(id) { id = known(id); delete meta().edits[id]; await save(); return item(id); }

module.exports = { init, js, flags, item, mark, remove, aiEdit, applyEdit, revert };
