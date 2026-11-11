// The app's AI that learns from how it is used (Mojtaba 2026-10-24): its parts, all with Claude (ANTHROPIC_API_KEY).
// - Usage: the pages opened in the app (sent by the app, mobile/src/lib/usage.ts) and the AI features used (counted here
//   by the server), counted per Copenhagen day without any account or device id (store.meta.usage, 90 days).
// - The AI's answers for the personal coach (coach.js, ask; INSIGHTS_MODEL picks the model, default claude-haiku-5-5:
//   Claude Haiku 5.5 since Mojtaba 2026-11-11, Opus 5.5 before).
//   (The admins' daily report that also lived here was taken out with its dashboard page in #1031.)
// - Question notes: short notes on a question's usual mistake (store.meta.qNotes, Persian and English), proposed by
//   the earlier daily report. An admin approves or rejects it in the panel; an approved note goes into
//   every AI explanation of that question from then on (lesson.js setNotes), so the explanations get better with use.
// The personal coach (each user's own advice from their own results) is coach.js; it reads aiMemory too.
'use strict';
const ai = require('./aigateway');

const MODEL = () => process.env.INSIGHTS_MODEL || 'claude-haiku-5-5';
ai.declare(['coach'], 'INSIGHTS_MODEL', 'claude-haiku-5-5');
const available = () => !!process.env.ANTHROPIC_API_KEY;
const KEEP_DAYS = 90;
const NAME_RE = /^[a-z0-9][a-z0-9:/_-]{0,59}$/;

let store = null, dayKey = null, saveTimer = null;
function init(s, dk) { store = s; dayKey = dk; }

// ---------- usage counters ----------
function usage() { return (store.meta.usage = store.meta.usage || { days: {} }); }
function saveUsage() {
  if (saveTimer) return;
  saveTimer = setTimeout(() => { saveTimer = null; store.saveMeta('usage', usage()).catch(e => console.error('usage save', e.message)); }, 30e3);
  saveTimer.unref && saveTimer.unref();
}
// One count of `name` today (a page as 'screen:/exam', a feature as 'ai:lesson').
function count(name, n = 1) {
  if (!store || !NAME_RE.test(name)) return;
  const u = usage(), d = dayKey(Date.now());
  const day = (u.days[d] = u.days[d] || {});
  if (!day[name] && Object.keys(day).length >= 400) return;
  day[name] = (day[name] || 0) + n;
  const min = dayKey(Date.now() - KEEP_DAYS * 864e5);
  for (const k of Object.keys(u.days)) if (k < min) delete u.days[k];
  saveUsage();
}
// The pages the app sent: at most 60 a time, each a path made of letters, digits and / - _ (ids and queries are left
// out by the app).
function track(screens) {
  if (!Array.isArray(screens)) return 0;
  let n = 0;
  for (const s of screens.slice(0, 60)) {
    const p = String(s || '').toLowerCase().replace(/[?#].*$/, '').replace(/\/\d+(?=\/|$)/g, '/:n').slice(0, 50);
    if (/^\/[a-z0-9/:_-]*$/.test(p)) { count(`screen:${p}`); n++; }
  }
  return n;
}

// ---------- the AI's answers (the coach, coach.js) and the questions' notes ----------
const clipText = (t, n) => { t = String(t || '').replace(/\s+/g, ' ').trim(); return t.length > n ? `${t.slice(0, n)}…` : t; };
async function ask({ system, data, schema, maxTokens = 16000, effort = 'medium', task = 'insights' }) {
  const res = await ai.call(task, {
    model: MODEL(),
    max_tokens: maxTokens,
    output_config: { effort, format: { type: 'json_schema', schema } },
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system,
    messages: [{ role: 'user', content: typeof data === 'string' ? data : JSON.stringify(data) }],
  }, { stream: true });
  if (res.stop_reason === 'refusal') throw new Error('refused');
  if (res.stop_reason === 'max_tokens') throw new Error('answer cut off');
  const text = res.content.filter(b => b.type === 'text').map(b => b.text).join('');
  return { out: JSON.parse(text), model: res.model, usage: res.usage };
}

// An admin's decision on a question's note: approve (with an edit of its text, if given), reject, or remove.
function decide(qid, action, { fa, en, by } = {}) {
  const notes = { ...(store.meta.qNotes || {}) }, n = notes[qid];
  if (!n) return null;
  if (action === 'remove') delete notes[qid];
  else {
    const changed = (fa && fa !== n.fa) || (en && en !== n.en);
    notes[qid] = { ...n, fa: clipText(fa || n.fa, 500), en: clipText(en || n.en, 500), status: action === 'approve' ? 'approved' : 'rejected',
      by, decided: Date.now(), v: (n.v || 1) + (changed && n.status === 'approved' ? 1 : 0) };
  }
  return notes;
}

module.exports = { init, count, track, decide, ask, available, clipText };
