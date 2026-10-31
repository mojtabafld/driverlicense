// The app's AI that learns from how it is used (Mojtaba 2026-10-24): three parts, all with Claude (ANTHROPIC_API_KEY).
// - Usage: the pages opened in the app (sent by the app, mobile/src/lib/usage.ts) and the AI features used (counted here
//   by the server), counted per Copenhagen day without any account or device id (store.meta.usage, 90 days).
// - The admin report: once a day (after INSIGHTS_HOUR, default 6, Copenhagen) Claude reads the day's figures, all made
//   anonymous and summed (no names, emails or usernames: the exams' results per question and topic, how many use the
//   app and come back, the pages and features used, the reports sent from the app with emails and numbers taken out),
//   with its own memory of earlier days (store.meta.aiMemory: short notes it rewrites each day, so it keeps what it
//   learnt and follows trends), and writes a report for the admins: what happened, what is wrong, what to improve in
//   the next updates. Kept (the newest 60) in store.meta.aiInsights, shown in the admin panel (/admin) and emailed to
//   REPORT_TO. INSIGHTS_EMAIL=0 keeps it out of the mail; INSIGHTS_MODEL picks the model (default claude-opus-5-5).
// - Question notes: for the questions most answered wrongly, the report proposes a short note on the usual mistake
//   (store.meta.qNotes, Persian and English). An admin approves or rejects it in the panel; an approved note goes into
//   every AI explanation of that question from then on (lesson.js setNotes), so the explanations get better with use.
// The personal coach (each user's own advice from their own results) is coach.js; it reads aiMemory too.
'use strict';
const ai = require('./aigateway');

const MODEL = () => process.env.INSIGHTS_MODEL || 'claude-opus-5-5';
const available = () => !!process.env.ANTHROPIC_API_KEY;
const KEEP_DAYS = 90, KEEP_REPORTS = 60, MAX_MEMORY = 40, MAX_NOTES = 8;
const NAME_RE = /^[a-z0-9][a-z0-9:/_-]{0,59}$/;

let store = null, dayKey = null, saveTimer = null, client = null, running = null;
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

// ---------- the figures for a day's report (anonymous, summed) ----------
const pct = (a, b) => (b ? Math.round((a / b) * 1000) / 10 : null);
const clipText = (t, n) => { t = String(t || '').replace(/\s+/g, ' ').trim(); return t.length > n ? `${t.slice(0, n)}…` : t; };
// A report's text with what could name someone taken out: email addresses, phone numbers, links.
const scrub = t => clipText(String(t || '')
  .replace(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g, '[email]')
  .replace(/(\+?\d[\d\s-]{6,}\d)/g, '[number]')
  .replace(/https?:\/\/\S+/g, '[link]'), 400);

function collect({ bank, scoreOf, FULL, PASS_MIN, visits }) {
  const now = Date.now(), DAY = 864e5, today = dayKey(now);
  const since30 = now - 30 * DAY, since7 = now - 7 * DAY, since14 = now - 14 * DAY;
  const users = Object.values(store.users);
  const qs = new Map(), topics = {};
  const t = { users: users.length, guests: 0, new7: 0, newPrev7: 0, active7: 0, activePrev7: 0, neverTested: 0,
    tests7: 0, testsPrev7: 0, full7: 0, passed7: 0, fullPrev7: 0, passedPrev7: 0, correct7: 0, items7: 0,
    cohort: 0, cohortBack: 0, premium: 0, modes7: {}, ui: {}, qlang: {}, studyStreak3: 0 };
  for (const u of users) {
    if (u.guest) t.guests++;
    if (u.created > since7) t.new7++; else if (u.created > since14) t.newPrev7++;
    const days = new Set(u.days || []);
    const activeIn = (from, to) => [...days].some(d => d >= dayKey(from) && d < dayKey(to)) || (u.attempts || []).some(a => a.at >= from && a.at < to);
    const a7 = activeIn(since7, now + DAY), aP = activeIn(since14, since7);
    if (a7) t.active7++;
    if (aP) t.activePrev7++;
    // Came back: made 8 to 37 days ago and active in the last 7 days.
    if (u.created < now - 8 * DAY && u.created > now - 37 * DAY) { t.cohort++; if (a7) t.cohortBack++; }
    if (!(u.attempts || []).length) t.neverTested++;
    if (u.premium && u.premium.until > now) t.premium++;
    const s = u.settings || {};
    t.ui[s.ui || 'fa'] = (t.ui[s.ui || 'fa'] || 0) + 1;
    t.qlang[s.lang || 'none'] = (t.qlang[s.lang || 'none'] || 0) + 1;
    if ((u.study || []).includes(today) || (u.study || []).includes(dayKey(now - DAY))) t.studyStreak3++;
    for (const a of u.attempts || []) {
      const full = a.items.length >= FULL, ok = scoreOf(a) >= PASS_MIN;
      if (a.at > since7) {
        t.tests7++; t.modes7[a.mode || 'random'] = (t.modes7[a.mode || 'random'] || 0) + 1;
        t.correct7 += scoreOf(a); t.items7 += a.items.length;
        if (full) { t.full7++; if (ok) t.passed7++; }
      } else if (a.at > since14) { t.testsPrev7++; if (full) { t.fullPrev7++; if (ok) t.passedPrev7++; } }
      if (a.at <= since30) continue;
      for (const it of a.items) {
        const q = bank.Q.get(it.id);
        if (!q) continue;
        const x = qs.get(it.id) || { tries: 0, wrong: 0, st: q.st.map(() => 0), known: 0 };
        x.tries++; if (!it.ok) x.wrong++;
        if (Array.isArray(it.a)) { x.known++; q.st.forEach((st, k) => { if (!!it.a[k] !== !!st.ok) x.st[k]++; }); }
        qs.set(it.id, x);
        const tp = (topics[q.c] = topics[q.c] || { tries: 0, wrong: 0 });
        tp.tries++; if (!it.ok) tp.wrong++;
      }
    }
  }
  const notes = store.meta.qNotes || {};
  const hardest = [...qs.entries()].filter(([, x]) => x.tries >= 5)
    .sort((a, b) => b[1].wrong / b[1].tries - a[1].wrong / a[1].tries || b[1].tries - a[1].tries).slice(0, 12)
    .map(([id, x]) => {
      const q = bank.Q.get(id), tp = bank.topics[q.c] || {};
      return { qid: id, topic: tp.da || String(q.c), wrongPct: pct(x.wrong, x.tries), tries: x.tries,
        question: clipText(q.sda, 200), questionFa: clipText(q.sfa, 200),
        statements: q.st.map((st, k) => ({ text: clipText(st.da, 160), fa: clipText(st.fa, 160), correct: st.ok ? 'yes' : 'no',
          wrongPct: x.known ? pct(x.st[k], x.known) : null, official: clipText(st.eda, 220) })),
        note: notes[id] ? notes[id].status : undefined };
    });
  const topicList = Object.entries(topics).filter(([, x]) => x.tries >= 10)
    .map(([c, x]) => ({ topic: (bank.topics[c] || {}).fa || c, da: (bank.topics[c] || {}).da, tries: x.tries, wrongPct: pct(x.wrong, x.tries) }))
    .sort((a, b) => b.wrongPct - a.wrongPct);
  const sumDays = (from, to) => {
    const out = {};
    for (const [d, m] of Object.entries(usage().days)) if (d >= dayKey(from) && d < dayKey(to)) for (const [k, v] of Object.entries(m)) out[k] = (out[k] || 0) + v;
    return out;
  };
  const u7 = sumDays(since7, now + DAY), uP = sumDays(since14, since7);
  const use = Object.keys({ ...u7, ...uP }).map(k => ({ name: k, last7: u7[k] || 0, prev7: uP[k] || 0 })).sort((a, b) => b.last7 - a.last7).slice(0, 50);
  const reports = (store.meta.reports || []).filter(r => r.at > since7).map(r => ({ kind: r.kind, platform: r.platform, version: r.version, ui: r.ui, text: scrub(r.text) }));
  const errs = {};
  for (const e of (store.meta.clientErrors || []).filter(e => e.at > since7)) { const k = clipText(e.message, 140); errs[k] = errs[k] || { message: k, count: 0, paths: new Set() }; errs[k].count++; errs[k].paths.add(e.path); }
  const errors = Object.values(errs).sort((a, b) => b.count - a.count).slice(0, 10).map(e => ({ ...e, paths: [...e.paths].slice(0, 5) }));
  const vd = Object.entries((visits && visits.days) || {}).filter(([d]) => d >= dayKey(since7)).reduce((a, [, x]) => ({ v: a.v + x.v, u: a.u + x.u }), { v: 0, u: 0 });
  return {
    day: today,
    totals: { ...t, passRate7: pct(t.passed7, t.full7), passRatePrev7: pct(t.passedPrev7, t.fullPrev7), correctPct7: pct(t.correct7, t.items7),
      comeBackPct: pct(t.cohortBack, t.cohort), visits7: vd.v, visitors7: vd.u },
    hardestQuestions: hardest, topics: topicList, usage: use, reports, clientErrors: errors,
  };
}

// ---------- the daily report ----------
const SYSTEM = `You are the product analyst inside Teoripro, an app that prepares people (mostly Persian speakers living in
Denmark) for the Danish driving theory test (licence B). Each day you get the app's figures for the last 7 days next to
the 7 days before, all anonymous and summed, and your own memory notes from earlier days.

Write for the app's owner, in Persian, plainly and briefly:
- summary: 3 to 6 short lines on what happened this week (figures with their change), what stands out.
- findings: what is going wrong or right, each with its evidence from the figures (a question many get wrong, a page few
  reach, a feature that grows, users who do not come back, an error that repeats, what the reports ask for).
- suggestions: concrete changes for the next updates of the app or its content, each with its reason and the figure it
  should move. Prefer a few strong ones to many weak ones.
- memory: your notes to yourself for tomorrow (in English, short lines): the trends worth following, what you suggested
  and should check later, facts about the users you learnt. Keep what still holds from your old notes, drop what no
  longer does; at most ${MAX_MEMORY} lines.
- questionNotes: for at most ${MAX_NOTES} of the questions most answered wrongly that have no note yet, a short note (one or
  two sentences) a teacher would add to the question's explanation: the usual mistake and the Danish rule that settles
  it, in Persian (fa) and in English (en). Only what follows from the question's statements, their correct answers and
  official explanations; never contradict them, never invent rules, numbers or sign codes.

Small numbers are noise: say so instead of drawing conclusions from them. Do not guess at individual users.`;

const SCHEMA = {
  type: 'object', additionalProperties: false, required: ['summary', 'findings', 'suggestions', 'memory', 'questionNotes'],
  properties: {
    summary: { type: 'string' },
    findings: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['title', 'detail', 'severity'],
      properties: { title: { type: 'string' }, detail: { type: 'string' }, severity: { type: 'string', enum: ['high', 'medium', 'low'] } } } },
    suggestions: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['title', 'detail', 'area', 'priority'],
      properties: { title: { type: 'string' }, detail: { type: 'string' }, area: { type: 'string', enum: ['content', 'ux', 'feature', 'bug', 'growth', 'ai'] },
        priority: { type: 'string', enum: ['high', 'medium', 'low'] } } } },
    memory: { type: 'array', items: { type: 'string' } },
    questionNotes: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['qid', 'fa', 'en'],
      properties: { qid: { type: 'integer' }, fa: { type: 'string' }, en: { type: 'string' } } } },
  },
};

// Claude once, with a JSON answer of `schema`. Shared with coach.js.
// `task`: its name in the AI gateway's use (insights for the admin's report, coach for a user's page).
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

// The day's report: made (once at a time), kept and returned. `force`: also when today's is there already.
function run(deps, { force = false, by = 'schedule' } = {}) {
  if (running) return running;
  running = (async () => {
    const day = dayKey(Date.now());
    const prev = store.meta.aiInsights || { reports: [] };
    if (!force && prev.lastDay === day) return null;
    // A day whose report failed three times waits for tomorrow (or an admin's «now»).
    if (!force && prev.failed && prev.failed.day === day && prev.failed.n >= 3) return null;
    // Marked first, so a second server (a deploy's overlap) does not make it too.
    await store.saveMeta('aiInsights', { ...prev, lastDay: day });
    try { return await make(deps, prev, day, by); } catch (e) {
      const failed = { day, at: Date.now(), error: clipText(e.message, 200), n: prev.failed && prev.failed.day === day ? prev.failed.n + 1 : 1 };
      await store.saveMeta('aiInsights', { ...prev, failed });
      throw e;
    }
  })();
  return running.finally(() => { running = null; });
}
// The report itself (run): the figures, Claude's answer, kept with its memory and the proposed notes.
async function make(deps, prev, day, by) {
  const figures = collect(deps);
  const memory = (store.meta.aiMemory && store.meta.aiMemory.notes) || [];
  const last = (prev.reports || [])[(prev.reports || []).length - 1];
  const data = {
    today: day, figures, yourMemory: memory,
    yourLastSuggestions: last ? last.suggestions.map(s => s.title) : [],
    approvedNotes: Object.entries(store.meta.qNotes || {}).filter(([, n]) => n.status === 'approved').map(([id]) => +id),
  };
  const { out, model, usage: tokens } = await module.exports.ask({ system: SYSTEM, data, schema: SCHEMA });
  const report = { at: Date.now(), day, by, model, summary: out.summary, findings: out.findings.slice(0, 12), suggestions: out.suggestions.slice(0, 12),
    figures: { totals: figures.totals, topics: figures.topics.slice(0, 8), usage: figures.usage.slice(0, 15) },
    tokens: tokens && { input: tokens.input_tokens, output: tokens.output_tokens } };
  await store.saveMeta('aiInsights', { lastDay: day, reports: [...(prev.reports || []), report].slice(-KEEP_REPORTS) });
  if (deps.onReport) Promise.resolve(deps.onReport(report)).catch(e => console.error('insights mail', e.message));
  await store.saveMeta('aiMemory', { at: Date.now(), notes: out.memory.map(m => clipText(m, 300)).slice(0, MAX_MEMORY) });
  // New notes wait for an admin; a question that has a note (any state) keeps it.
  const notes = { ...(store.meta.qNotes || {}) }, known = new Set(figures.hardestQuestions.map(q => q.qid));
  let added = 0;
  for (const n of out.questionNotes.slice(0, MAX_NOTES)) {
    if (!known.has(n.qid) || notes[n.qid] || !n.fa.trim() || !n.en.trim()) continue;
    notes[n.qid] = { status: 'pending', fa: clipText(n.fa, 500), en: clipText(n.en, 500), at: Date.now(), v: 1 };
    added++;
  }
  if (added) await store.saveMeta('qNotes', notes);
  console.log('insights: report made', day, by, added ? `${added} question notes proposed` : '');
  return report;
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

module.exports = { init, count, track, collect, run, decide, ask, available, scrub, clipText };
