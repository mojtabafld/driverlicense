// The personal coach, «مربی هوشمند» (Mojtaba 2026-10-24): Claude reads one user's own results (their tests, the topics and
// questions they get wrong, how often they study; never their name or email) with what it advised them before and how
// they did since, and the general patterns the daily report has learnt (insights.js, store.meta.aiMemory), and writes
// short advice: a headline, a few points, the topics to work on and the page to go to next. Kept on the account
// (user.coach, with the last advice given in user.coach.hist), made again after new tests (at most every 20 minutes)
// or after 3 days. Shown in the app's chart view (mobile/src/ui/coach-card.tsx); premium, as the other AI features.
'use strict';
const insights = require('./insights');
const { clipText } = insights;

const NEXT = ['exam', 'mistakes', 'learn', 'signs', 'priority', 'course'];
const LANG = { fa: 'Persian (simple, natural)', en: 'English', da: 'Danish' };
const SCHEMA = {
  type: 'object', additionalProperties: false, required: ['headline', 'points', 'focus', 'next', 'nextLabel'],
  properties: {
    headline: { type: 'string' },
    points: { type: 'array', items: { type: 'string' } },
    focus: { type: 'array', items: { type: 'string' } },
    next: { type: 'string', enum: NEXT },
    nextLabel: { type: 'string' },
  },
};
const system = ui => `You are the personal coach inside Teoripro, an app for the Danish driving theory test (licence B).
You get one learner's own results (anonymous), the advice you gave them before with how they did since, and general
patterns seen across all learners. Write in ${LANG[ui] || LANG.fa}:
- headline: one short encouraging sentence on where they stand (at most 10 words), honest about the figures.
- points: 2 to 4 short, concrete points: what to do next and why, from their own figures (a topic they keep getting
  wrong, tests to take, mistakes to practise). Build on your earlier advice: say what improved, change course if it did
  not work. At most about 20 words each.
- focus: up to 3 topic names (as given in the data) to work on now.
- next: the one page to open now: exam (a timed test), mistakes (practise their mistakes), learn (lessons by topic),
  signs (road signs), priority (right of way), course (the step-by-step course); nextLabel: its button text, 2 to 4 words.
The real test: 25 pictures, at most 5 mistakes. Never invent figures or traffic rules; small numbers are not trends.`;

function facts(u, { bank, scoreOf, FULL, PASS_MIN, dayKey }) {
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
  const name = c => { const t = bank.topics[c] || {}; return t.fa ? `${t.fa} (${t.da})` : t.da || String(c); };
  const pct = (a, b) => (b ? Math.round((a / b) * 100) : null);
  const study = new Set(u.study || []);
  return {
    tests: list.slice(-25).map(a => ({ daysAgo: Math.floor((now - a.at) / DAY), mode: a.mode || 'random', right: scoreOf(a), of: a.items.length,
      passed: a.items.length >= FULL ? scoreOf(a) >= PASS_MIN : undefined })),
    totalTests: (u.attempts || []).length,
    topics: Object.entries(topics).filter(([, t]) => t.tries >= 3).map(([c, t]) => ({ topic: name(c), tries: t.tries, wrongPct: pct(t.wrong, t.tries),
      last14: t.tries14 ? { tries: t.tries14, wrongPct: pct(t.wrong14, t.tries14) } : undefined })).sort((a, b) => b.wrongPct - a.wrongPct).slice(0, 12),
    stillWrong: [...wrongQ.entries()].filter(([, w]) => w.wrong >= 2 && w.rightAfter < 2).slice(-8).map(([id]) => {
      const q = bank.Q.get(id); return { topic: name(q.c), question: clipText(q.sfa || q.sda, 140) };
    }),
    studyDaysLast14: Array.from({ length: 14 }, (_, i) => dayKey(now - i * DAY)).filter(d => study.has(d)).length,
    studiedToday: study.has(dayKey(now)),
    savedQuestions: Array.isArray(u.saved) ? u.saved.length : 0,
  };
}

// The user's advice: kept, or made now. Returns { coach } or { few: true } (fewer than 2 tests).
async function get(u, ui, deps) {
  ui = LANG[ui] ? ui : 'fa';
  const n = (u.attempts || []).length, c = u.coach, now = Date.now();
  if (n < 2) return { few: true };
  const fresh = c && c.ui === ui && ((c.n === n && now - c.at < 3 * 864e5) || now - c.at < 20 * 60e3);
  if (fresh) return { coach: c };
  const f = facts(u, deps);
  const data = {
    learner: f,
    yourEarlierAdvice: ((c && c.hist) || []).slice(-3),
    generalPatterns: ((deps.store.meta.aiMemory && deps.store.meta.aiMemory.notes) || []).slice(0, 20),
  };
  const { out } = await insights.ask({ system: system(ui), data, schema: SCHEMA, maxTokens: 8000, effort: 'low' });
  const coach = { at: now, n, ui, headline: clipText(out.headline, 120), points: out.points.slice(0, 4).map(p => clipText(p, 240)),
    focus: out.focus.slice(0, 3).map(x => clipText(x, 80)), next: NEXT.includes(out.next) ? out.next : 'exam', nextLabel: clipText(out.nextLabel, 40) };
  // What it advised, with the figures then, for the next advice to build on.
  const last = f.tests[f.tests.length - 1];
  const hist = [...((c && c.hist) || []), { day: deps.dayKey(now), headline: coach.headline, focus: coach.focus, next: coach.next,
    tests: n, lastScore: last ? `${last.right}/${last.of}` : undefined }].slice(-6);
  u.coach = { ...coach, hist };
  await deps.store.saveUser(u);
  return { coach: u.coach };
}

module.exports = { get };
