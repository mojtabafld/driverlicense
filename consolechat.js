// The console's chat about a picture: after a picture is made, the admin tells the AI (in Persian) what to change; the
// AI answers in Persian with what it changed and where, and gives the whole new prompt, which «ساخت تصویر با این پرامپت»
// then makes. One conversation per item ('q:<qid>' or 'g:<key>'), kept in store.meta.consoleChats:
// { [id]: { prompt, msgs: [{ r: 'u' | 'a', t, p?, at }] } } — `prompt` is the latest one (the one the last picture was
// made from, or the AI's last proposal), which the next request changes.
'use strict';
let store = null, imagegen = null, guideref = null, consolepics = null;

function init(s, ig, gr, cp) { store = s; imagegen = ig; guideref = gr; consolepics = cp; }
const chats = () => (store.meta.consoleChats = store.meta.consoleChats || {});
const save = () => store.saveMeta('consoleChats', chats());
const MAX_MSGS = 40;

// The prompt a new conversation starts from: the one the item's current AI picture was made from.
const pictureprompt = id => (id[0] === 'q' ? imagegen.questionPrompt(id.slice(2)) : imagegen.guidePromptNow(id.slice(2))) || '';
function get(id) {
  const c = chats()[id];
  return c ? { prompt: c.prompt || pictureprompt(id), msgs: c.msgs || [] } : { prompt: pictureprompt(id), msgs: [] };
}

// What the item is about, so the AI understands the picture's purpose.
function context(id) {
  if (id[0] === 'q') {
    const d = consolepics.detail(id.slice(2));
    if (!d) return '';
    return `A driving-theory question: ${d.da}\nStatements: ${d.statements.map(s => `${s.da} (${s.ok ? 'correct' : 'wrong'})`).join(' | ')}`;
  }
  const it = guideref.item(id.slice(2));
  return it ? `A teaching picture (${it.kind === 'signs' ? 'road sign' : 'right of way'}): ${[it.sub, it.label, it.da].filter(Boolean).join(' · ')}\n${String(it.text || '').replace(/\*\*/g, '')}` : '';
}

const SYSTEM = `You help the person who checks the pictures of a Danish driving-theory app to correct a picture by changing the prompt it is made from.
You get what the picture is for, the current prompt (English), the conversation so far, and the person's new message (Persian).
Change the prompt exactly as the person asks: translate their request into precise English and work it into the right place of the prompt, making the affected traffic details (signs, road markings, lights, positions, colours, directions) explicit and unambiguous. Keep everything else in the prompt unchanged, including its parts and their order. If the message is only a question, answer it and leave the prompt unchanged.
Answer in exactly this form:
<reply>
In Persian, short: what you changed and where in the prompt (a few bullet lines, quoting the changed English words), or the answer to the question.
</reply>
<prompt>
The complete new prompt in English.
</prompt>`;

async function send(id, message, part) {
  message = String(message || '').trim().slice(0, 3000);
  if (!message) throw Object.assign(new Error('پیامی ننوشته‌اید.'), { status: 400 });
  const c = chats()[id] = chats()[id] || { prompt: pictureprompt(id), msgs: [] };
  if (!c.prompt) c.prompt = id[0] === 'q' ? await imagegen.draft(id.slice(2), part) : await guideref.draft(id.slice(2));
  const history = c.msgs.slice(-12).map(m => `${m.r === 'u' ? 'Person' : 'You'}: ${m.t}`).join('\n');
  const out = await imagegen.writeText(SYSTEM, [`What the picture is for:\n${context(id)}`, `Current prompt:\n${c.prompt}`,
    history ? `Conversation so far:\n${history}` : '', `New message (Persian):\n${message}`].filter(Boolean).join('\n\n'), null, 4000);
  const reply = ((/<reply>([\s\S]*?)<\/reply>/.exec(out) || [])[1] || '').trim();
  const prompt = ((/<prompt>([\s\S]*?)<\/prompt>/.exec(out) || [])[1] || '').trim();
  const next = prompt ? imagegen.withHouseStyle(prompt, part) : c.prompt;
  c.msgs.push({ r: 'u', t: message, at: Date.now() }, { r: 'a', t: reply || (prompt ? 'پرامپت به‌روز شد.' : out), p: next, at: Date.now() });
  c.msgs = c.msgs.slice(-MAX_MSGS);
  c.prompt = next;
  await save();
  return get(id);
}

// A picture was made from `prompt` (the first one or a corrected one): the conversation goes on from it.
async function made(id, prompt) {
  if (!prompt) return;
  const c = chats()[id] = chats()[id] || { msgs: [] };
  c.prompt = prompt;
  await save();
}
async function reset(id) { delete chats()[id]; await save(); return get(id); }

module.exports = { init, get, send, made, reset };
