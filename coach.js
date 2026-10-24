// The personal coach, «مربی هوشمند» (Mojtaba 2026-10-24): Claude reads one user's own results (their tests, the topics and
// questions they get wrong, how often they study, the course lessons done; never their name or email) with what it
// advised them before and the general patterns the daily report has learnt (insights.js, store.meta.aiMemory). It
// writes the coach page (mobile/src/app/coach.tsx), opened from the coach button in the head of «آموزش» or «آزمون»,
// each with its own part, kept apart in user.coaches: `learn`, short advice on what to study with links to the
// learning pages the app lists (its `catalog`); `exam`, the tests' mistakes summed up (by topic, figured here) with
// where to practise. All in the app's language only (topic names too). Made again after new tests or lessons (at most
// every 20 minutes) or after 3 days. Premium; off when «حالت مربی» is off in the settings (settings.coach false).
'use strict';
const insights = require('./insights');
const { clipText } = insights;

const LANG = { fa: 'Persian (simple, natural)', en: 'English', da: 'Danish' };
// The topics' names in English: the app's own translations of their Persian names (mobile/src/lib/i18n/strings.json).
let EN = null;
function enOf(fa) {
  if (!EN) { try { EN = require('./mobile/src/lib/i18n/strings.json'); } catch { EN = {}; } }
  return EN[fa] && EN[fa][0];
}
// A topic's name in the app's language only.
const topicName = (t, c, ui) => (ui === 'da' ? t.da : ui === 'en' ? enOf(t.fa) || t.da : t.fa || t.da) || String(c);

function facts(u, { bank, scoreOf, FULL, PASS_MIN, dayKey }, ui) {
  const now = Date.now(), DAY = 864e5, list = (u.attempts || []).slice(-60);
  const topics = {}, wrongQ = new Map();
  for (const a of list) for (const it of a.items) {
    const q = bank.Q.get(it.id); if (!q) continue;
    const t = (topics[q.c] = topics[q.c] || { tries: 0, wrong: 0, tries14: 0, wrong14: 0 });
    t.tries++; if (!it.ok) t.wrong++;
    if (a.at > now - 14 * DAY) { t.tries14++; if (!it.ok) t.wrong14++; }
    const w = wrongQ.get(it.id) || { wrong: 0, rightAfter: 0 };
    if (!it.ok) { w.wrong++; w.rightAfter = 0; } else if (w.wrong) w.rightAfter++;
    wrongQ.set(it.id, w);
  }
  const name = c => topicName(bank.topics[c] || {}, c, ui);
  const pct = (a, b) => (b ? Math.round((a / b) * 100) : null);
  const study = new Set(u.study || []);
  return {
    tests: list.slice(-25).map(a => ({ daysAgo: Math.floor((now - a.at) / DAY), mode: a.mode || 'random', right: scoreOf(a), of: a.items.length,
      passed: a.items.length >= FULL ? scoreOf(a) >= PASS_MIN : undefined })),
    totalTests: (u.attempts || []).length,
    topics: Object.entries(topics).filter(([, t]) => t.tries >= 3).map(([c, t]) => ({ topic: name(c), tries: t.tries, wrongPct: pct(t.wrong, t.tries),
      last14: t.tries14 ? { tries: t.tries14, wrongPct: pct(t.wrong14, t.tries14) } : undefined })).sort((a, b) => b.wrongPct - a.wrongPct).slice(0, 12),
    stillWrong: [...wrongQ.entries()].filter(([, w]) => w.wrong >= 2 && w.rightAfter < 2).slice(-8).map(([id]) => {
      const q = bank.Q.get(id); return { topic: name(q.c), question: clipText(ui === 'fa' ? q.sfa || q.sda : ui === 'en' ? q.sen || q.sda : q.sda, 140) };
    }),
    studyDaysLast14: Array.from({ length: 14 }, (_, i) => dayKey(now - i * DAY)).filter(d => study.has(d)).length,
    studiedToday: study.has(dayKey(now)),
    savedQuestions: Array.isArray(u.saved) ? u.saved.length : 0,
  };
}

// ---------- the coach page ----------
const PAGE_SCHEMA = {
  learn: {
    type: 'object', additionalProperties: false, required: ['headline', 'points', 'links'],
    properties: {
      headline: { type: 'string' },
      points: { type: 'array', items: { type: 'string' } },
      links: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['id', 'why'], properties: { id: { type: 'string' }, why: { type: 'string' } } } },
    },
  },
  exam: {
    type: 'object', additionalProperties: false, required: ['headline', 'points', 'focus'],
    properties: { headline: { type: 'string' }, points: { type: 'array', items: { type: 'string' } }, focus: { type: 'array', items: { type: 'string' } } },
  },
};
const pageSystem = (kind, ui) => `You are the personal coach inside Teoripro, an app for the Danish driving theory test (licence B).
You get one learner's own results (anonymous), the advice you gave them before on this page, and general patterns seen
across all learners. Write in ${LANG[ui] || LANG.fa}, short and concrete, from their own figures only.
${kind === 'learn' ? `This is the coach's «learning» page:
- headline: one short sentence on what to study now (at most 10 words).
- points: 2 to 4 short points (at most about 20 words each) on what to learn next and why: the topics their tests show
  they do not know yet, the course lessons they have not done that cover them, how to study (a little every day).
- links: 2 to 4 learning pages from the catalog (by its id, exactly as given) that teach what they need most, each with
  why: a few words on what it gives them. Prefer course lessons not done yet; never an id that is not in the catalog.`
  : `This is the coach's «tests» page:
- headline: one short sentence on how their tests go (at most 10 words), honest about the figures.
- points: 2 to 4 short points (at most about 20 words each) summing up their mistakes: where they lose points (topics,
  the kind of question), what got better or worse lately, and what to practise.
- focus: up to 3 topic names (as given in the data) that need practice most.
The real test: 25 pictures, at most 5 mistakes.`}
Build on your earlier advice: say what improved, change course if it did not work. Never invent figures or traffic
rules; small numbers are not trends. Write every word in ${LANG[ui] || LANG.fa} only: no words or terms in any other
language (no Danish terms in brackets, no Persian), and the topic names as given in the data.`;

// The tests' mistakes by topic and lately, figured here (shown on the page as they are, beside the AI's summary).
function mistakeStats(u, deps, ui) {
  const f = facts(u, deps, ui), list = (u.attempts || []).slice(-20);
  const full = list.filter(a => a.items.length >= deps.FULL);
  return {
    tests: (u.attempts || []).length,
    avgPct: list.length ? Math.round(list.reduce((s, a) => s + deps.scoreOf(a) / a.items.length, 0) / list.length * 100) : null,
    passed: full.filter(a => deps.scoreOf(a) >= deps.PASS_MIN).length, full: full.length,
    stillWrong: f.stillWrong.length,
    topics: f.topics.filter(t => t.wrongPct > 0).slice(0, 5).map(t => ({ topic: t.topic, wrongPct: t.wrongPct, tries: t.tries })),
  };
}

// Mistakes the coach has seen (Mojtaba 2026-10-24): when advice is made, each question whose latest answer was wrong
// is watched from then on (u.coachWatch.watch, qid → since); one answered right in a later test is fixed
// (u.coachWatch.fixed, qid → when), and the page says so with a green tick. Wrong again: watched again.
// (`now`: when the advice was made; the tests up to then count.)
function watchMistakes(u, now) {
  const w = (u.coachWatch = u.coachWatch || { watch: {}, fixed: {} }), last = new Map();
  for (const a of u.attempts || []) if (a.at <= now) for (const it of a.items) last.set(it.id, it.ok);
  for (const [id, ok] of last) if (!ok && !w.watch[id]) { w.watch[id] = now; delete w.fixed[id]; }
  const ids = Object.keys(w.watch).sort((a, b) => w.watch[b] - w.watch[a]);
  for (const id of ids.slice(300)) delete w.watch[id];
}
function checkFixed(u) {
  const w = u.coachWatch;
  if (!w) return false;
  let changed = false;
  for (const [id, since] of Object.entries(w.watch)) {
    const hit = (u.attempts || []).find(a => a.at > since && a.items.some(it => it.id === +id && it.ok));
    if (hit) { w.fixed[id] = hit.at; delete w.watch[id]; changed = true; }
  }
  const ids = Object.keys(w.fixed).sort((a, b) => w.fixed[b] - w.fixed[a]);
  for (const id of ids.slice(100)) delete w.fixed[id];
  return changed;
}
// The fixed ones, newest first (at most 10), with their topic and question in the app's language.
function fixedList(u, bank, ui) {
  const f = (u.coachWatch && u.coachWatch.fixed) || {};
  const list = Object.entries(f).sort((a, b) => b[1] - a[1]).map(([id, at]) => ({ q: bank.Q.get(+id), at })).filter(x => x.q);
  return { total: list.length, list: list.slice(0, 10).map(({ q, at }) => ({ qid: q.id, at, topic: topicName(bank.topics[q.c] || {}, q.c, ui),
    question: clipText(ui === 'fa' ? q.sfa || q.sda : ui === 'en' ? q.sen || q.sda : q.sda, 160) })) };
}

// `catalog`: the learning pages the app can open, [{ id, title, done? }] (course lessons and pages), for `learn`.
async function getPage(u, ui, deps, kind, catalog) {
  ui = LANG[ui] ? ui : 'fa';
  kind = kind === 'learn' ? 'learn' : 'exam';
  const n = (u.attempts || []).length, now = Date.now();
  if (n < 2 && kind === 'exam') return { few: true };
  // Advice made before the mistakes were watched: watched from when it was made.
  const made = Object.values(u.coaches || {}).map(x => x.at).filter(Boolean);
  if (!u.coachWatch && made.length) watchMistakes(u, Math.min(...made));
  const changed = checkFixed(u) || (!!u.coachWatch && made.length > 0);
  const cat = (Array.isArray(catalog) ? catalog : []).slice(0, 120)
    .map(x => ({ id: clipText(x && x.id, 80), title: clipText(x && x.title, 120), done: !!(x && x.done) || undefined })).filter(x => /^[a-z]+:[\w.-]+$/i.test(x.id) && x.title);
  const doneN = cat.filter(x => x.done).length;
  const sig = kind === 'learn' ? `${n}.${doneN}` : `${n}`;
  const all = (u.coaches = u.coaches || {}), c = all[kind];
  const stats = kind === 'exam' ? mistakeStats(u, deps, ui) : undefined;
  // (v 2: in the app's language only, Mojtaba 2026-10-24)
  const fresh = c && c.v === 2 && c.ui === ui && ((c.sig === sig && now - c.at < 3 * 864e5) || now - c.at < 20 * 60e3);
  if (fresh) {
    if (changed) await deps.store.saveUser(u);
    return { coach: c, stats, fixed: fixedList(u, deps.bank, ui) };
  }
  const f = facts(u, deps, ui);
  const data = {
    learner: f,
    ...(kind === 'learn' ? { catalog: cat, courseLessonsDone: doneN } : { mistakes: stats }),
    yourEarlierAdvice: ((c && c.hist) || []).slice(-3),
    generalPatterns: ((deps.store.meta.aiMemory && deps.store.meta.aiMemory.notes) || []).slice(0, 20),
  };
  const { out } = await insights.ask({ system: pageSystem(kind, ui), data, schema: PAGE_SCHEMA[kind], maxTokens: 8000, effort: 'low' });
  const ids = new Map(cat.map(x => [x.id, x.title]));
  const coach = { v: 2, at: now, sig, ui, headline: clipText(out.headline, 120), points: out.points.slice(0, 4).map(p => clipText(p, 240)),
    ...(kind === 'learn'
      ? { links: out.links.filter(l => ids.has(l.id)).slice(0, 4).map(l => ({ id: l.id, title: ids.get(l.id), why: clipText(l.why, 100) })) }
      : { focus: out.focus.slice(0, 3).map(x => clipText(x, 80)) }) };
  const hist = [...((c && c.hist) || []), { day: deps.dayKey(now), headline: coach.headline, tests: n,
    ...(kind === 'learn' ? { links: (coach.links || []).map(l => l.title), lessonsDone: doneN } : { focus: coach.focus, avgPct: stats.avgPct }) }].slice(-6);
  all[kind] = { ...coach, hist };
  watchMistakes(u, now);
  await deps.store.saveUser(u);
  return { coach: all[kind], stats, fixed: fixedList(u, deps.bank, ui) };
}

module.exports = { getPage };
