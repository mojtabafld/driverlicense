// Each console item's saved prompt ('q:<qid>' or 'g:<key>'): the one the API wrote («ساخت پرامپت با هوش مصنوعی») or
// the last picture was made from, or one Claude Code edited on the admin's request (through /api/claudeprompt,
// with the CLAUDE_CODE_KEY secret). The console shows it, says when Claude Code edited it, and «ساخت تصویر با این
// پرامپت» makes a picture from it. Kept in store.meta.consolePrompts:
// { [id]: { prompt, by: 'api' | 'claude' | 'region', at, note?, reply?, box?, prev?, used? } } — 'region': the API
// corrected it for parts of the picture the admin marked in the console (`note` what they asked, `reply` what the API
// says it changed, `box` the marked parts); `prev` the prompt before an edit, `used` when a picture was last made from
// this very prompt.
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
  for (const [id, e] of Object.entries(all())) out[id] = { by: e.by, at: e.at, note: e.note || '', reply: e.reply || '', used: e.used || null };
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

// The console's «اصلاح بخش‌هایی از تصویر»: the admin marks one or more parts of the picture and says (in Persian) what
// is wrong in each; the API changes only what the prompt says about those parts. `marked`: the picture with the parts
// outlined in red and numbered, `regions`: [{ box: { x, y, w, h } as fractions, message, crop }] in that order, each
// `crop` the part close up (pictures as { mime, data }, drawn by the console).
const REGION = `You correct the prompt an image model used to draw a picture for a Danish driving-theory app (category B).
You get: the picture with one or more NUMBERED RED RECTANGLES around the parts the person is talking about, a close-up of each part (in the same order), the current prompt, and the person's correction for each numbered part in Persian.
1. For each numbered part, work out exactly what is inside it: which signs, markings, signals, vehicles, people or objects, and where they are in the scene.
2. Change ONLY what the prompt says about the things in those parts, exactly as the person asks for each: translate each request into precise English and make the affected details explicit and unambiguous (position, side, lane, distance, size, colour, direction, number, official design). Everything must agree with Danish traffic rules and the official Danish designs of signs, markings and signals. If it helps, add a line to MUST NOT APPEAR that rules out a mistake. When two corrections touch the same thing, apply both consistently.
3. Keep every other sentence of the prompt word for word, with its parts and their order.
4. The new picture has no rectangles or numbers: never mention the rectangles, numbers, close-ups or "marked areas" in the prompt; name each place in terms of the scene.
Answer in exactly this form:
<reply>
In Persian, short: for each part, a line «بخش n: …» on what is in it and what you changed (quoting the changed English words).
</reply>
<prompt>
The complete new prompt in English.
</prompt>`;
const pct = v => Math.round(v * 100), faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
async function region(id, { regions, marked, part }) {
  regions = (regions || []).map(r => ({ ...r, message: String(r.message || '').trim().slice(0, 2000) })).filter(r => r.message).slice(0, 8);
  if (!regions.length) throw Object.assign(new Error('برای بخش‌های انتخاب‌شده بنویسید چه چیزی باید اصلاح شود.'), { status: 400 });
  const before = get(id).prompt;
  if (!before) throw Object.assign(new Error('برای این مورد پرامپتی ذخیره نشده؛ اول «ساخت پرامپت با هوش مصنوعی» را بزنید.'), { status: 400 });
  const parts = regions.map((r, i) => `Part ${i + 1}${r.box ? ` (from ${pct(r.box.x)}% to ${pct(r.box.x + r.box.w)}% of the width from the left, from ${pct(r.box.y)}% to ${pct(r.box.y + r.box.h)}% of the height from the top)` : ''}: ${r.message}`).join('\n');
  const text = [`What the picture is for:\n${JSON.stringify(about(id))}`,
    `The images: first the whole picture with the numbered rectangles, then the close-ups of parts 1 to ${regions.length} in order.`,
    `Current prompt:\n${before}`, `The person's corrections (Persian), one per numbered part:\n${parts}`].join('\n\n');
  const out = await imagegen.writeText(REGION, text, [marked, ...regions.map(r => r.crop)], 8000);
  const reply = ((/<reply>([\s\S]*?)<\/reply>/.exec(out) || [])[1] || '').trim();
  const prompt = ((/<prompt>([\s\S]*?)<\/prompt>/.exec(out) || [])[1] || '').trim();
  if (!prompt) throw Object.assign(new Error('هوش مصنوعی پرامپت تازه‌ای نفرستاد؛ دوباره امتحان کنید.'), { status: 502 });
  all()[id] = { prompt: imagegen.withHouseStyle(prompt, part).slice(0, 20000), by: 'region', at: Date.now(),
    note: regions.map((r, i) => `${regions.length > 1 ? `بخش ${faNum(i + 1)}: ` : ''}${r.message}`).join('\n'), reply: reply.slice(0, 4000),
    box: regions.map(r => r.box || null), prev: before };
  await save();
  return get(id);
}

module.exports = { init, get, marks, about, saved, made, edit, region, ID_RE };
