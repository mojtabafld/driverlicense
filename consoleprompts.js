// Each console item's saved prompt ('q:<qid>' or 'g:<key>'): the one the API wrote («ساخت پرامپت با هوش مصنوعی») or
// the last picture was made from, or one Claude Code edited on the admin's request (through /api/claudeprompt,
// with the CLAUDE_CODE_KEY secret). The console shows it, says when Claude Code edited it, and «ساخت تصویر با این
// پرامپت» makes a picture from it. Kept in store.meta.consolePrompts:
// { [id]: { prompt, by: 'api' | 'claude', at, note?, prev?, used? } } — `prev` the prompt before Claude Code's edit,
// `used` when a picture was last made from this very prompt.
'use strict';
let store = null, imagegen = null, guideref = null, consolepics = null;

function init(s, ig, gr, cp) { store = s; imagegen = ig; guideref = gr; consolepics = cp; }
const all = () => (store.meta.consolePrompts = store.meta.consolePrompts || {});
const save = () => store.saveMeta('consolePrompts', all());
const ID_RE = /^(q:\d{1,6}|g:[a-z0-9-]{3,40})$/;

// Before anything was saved here: the prompt the item's current AI picture was made from.
const pictureprompt = id => (id[0] === 'q' ? imagegen.questionPrompt(id.slice(2)) : imagegen.guidePromptNow(id.slice(2))) || '';
function get(id) {
  const e = all()[id];
  return e ? { id, ...e } : { id, prompt: pictureprompt(id), by: 'api', at: null };
}
// The small part of every entry, for the console's lists (the text itself is fetched when opened).
function marks() {
  const out = {};
  for (const [id, e] of Object.entries(all())) out[id] = { by: e.by, at: e.at, note: e.note || '', used: e.used || null };
  return out;
}

// What the item is about, so whoever edits the prompt knows the picture's purpose.
function about(id) {
  if (id[0] === 'q') {
    const d = consolepics.detail(id.slice(2), store.meta.images || {});
    return d ? { kind: 'question', where: d.lessons.concat(d.rules), topic: d.topic, da: d.da, fa: d.text, statements: d.statements } : null;
  }
  const it = guideref.item(id.slice(2));
  return it ? { kind: it.kind, label: it.label, sub: it.sub, da: it.da, text: it.text } : null;
}

// The API wrote a prompt, or a picture was made from one (the drafted or Claude Code's).
async function saved(id, prompt) {
  if (!prompt) return;
  const e = all()[id];
  if (e && e.prompt === prompt) return;
  all()[id] = { prompt, by: 'api', at: Date.now() };
  await save();
}
async function made(id, prompt) {
  if (!prompt) return;
  const e = all()[id];
  if (e && e.prompt === prompt) e.used = Date.now();
  else all()[id] = { prompt, by: 'api', at: Date.now(), used: Date.now() };
  await save();
}
async function edit(id, prompt, note) {
  prompt = String(prompt || '').trim();
  if (!prompt) throw Object.assign(new Error('empty prompt'), { status: 400 });
  const before = get(id).prompt;
  all()[id] = { prompt: prompt.slice(0, 20000), by: 'claude', at: Date.now(), note: String(note || '').slice(0, 500), prev: before || '' };
  await save();
  return get(id);
}

module.exports = { init, get, marks, about, saved, made, edit, ID_RE };
