// AI Gateway (Mojtaba 2026-10-31): every call to Claude goes through here (lesson.js, search.js, insights.js and
// coach.js through it, imagegen.js's prompts), so the app has one place for:
//   - the model of each task: the caller's, unless AI_MODEL_<TASK> is set (e.g. AI_MODEL_SEARCH=claude-sonnet-5-5),
//     so a task moves to a cheaper or stronger model with a vault secret and a restart, without a code change;
//   - its use and cost: each call's tokens (cache reads and writes too), time and result, by day and by task, kept in
//     store.meta.aiUsage for 60 days, and the last 200 calls in memory; read by the admin (GET /api/aiusage);
//   - a daily budget: AI_DAILY_BUDGET_USD (none by default); once today's cost reaches it, the users' calls are refused
//     until the next day (the admin's own work still goes through);
//   - one client, with retries on overload and timeouts (the SDK's), and Anthropic's own fallback on a refusal
//     (the callers' `fallbacks: 'default'`).
// The picture services' calls (kie.ai, OpenAI images) are counted here too (picture()), without a cost.
'use strict';
const Anthropic = require('@anthropic-ai/sdk');

// $ per million tokens (input, output, cache read); a cache write costs 1.25 × input.
const PRICES = {
  'claude-fable-5-1': [10, 50, 0.25], 'claude-opus-5-5': [4, 20, 0.2], 'claude-sonnet-5-5': [2, 10, 0.2], 'claude-haiku-5-5': [0.1, 0.5, 0.01],
};
const priceOf = model => PRICES[Object.keys(PRICES).find(k => String(model || '').startsWith(k))] || PRICES['claude-opus-5-5'];
const ADMIN_TASKS = new Set(['picture-prompt', 'picture-describe', 'picture-check', 'insights', 'question-edit']);
const KEEP_DAYS = 60;

let store = null, client = null, dirty = false;
const recent = [];
const day = (t = Date.now()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Copenhagen' }).format(new Date(t));
const usage = () => (store.meta.aiUsage = store.meta.aiUsage || { days: {} });

function init(s) {
  store = s;
  setInterval(() => { if (dirty) { dirty = false; store.saveMeta('aiUsage', usage()).catch(e => console.error('ai usage', e.message)); } }, 60e3).unref();
}
const available = () => !!process.env.ANTHROPIC_API_KEY;
const budget = () => +process.env.AI_DAILY_BUDGET_USD || 0;
const todayCost = () => Object.values((usage().days[day()] || {}).tasks || {}).reduce((s, x) => s + (x.usd || 0), 0);

function note(task, entry) {
  const u = usage(), d = (u.days[day()] = u.days[day()] || { tasks: {} });
  const x = (d.tasks[task] = d.tasks[task] || { n: 0, fail: 0, in: 0, out: 0, cacheRead: 0, cacheWrite: 0, usd: 0, ms: 0 });
  x.n++; if (!entry.ok) x.fail++;
  for (const k of ['in', 'out', 'cacheRead', 'cacheWrite', 'usd', 'ms']) x[k] += entry[k] || 0;
  x.usd = Math.round(x.usd * 1e6) / 1e6;
  for (const k of Object.keys(u.days).sort().slice(0, -KEEP_DAYS)) delete u.days[k];
  recent.unshift({ at: Date.now(), task, ...entry }); recent.length = Math.min(recent.length, 200);
  dirty = true;
}

// One call: `params` as for client.beta.messages.create; `stream` for long answers (finalMessage).
async function call(task, params, { stream = false } = {}) {
  if (!available()) throw Object.assign(new Error('ANTHROPIC_API_KEY تنظیم نشده است.'), { status: 503 });
  if (budget() && !ADMIN_TASKS.has(task) && todayCost() >= budget()) throw Object.assign(new Error('سقف روزانه‌ی هوش مصنوعی پر شده است؛ فردا دوباره امتحان کنید.'), { status: 429 });
  client = client || new Anthropic({ timeout: 300e3, maxRetries: 2 });
  const model = process.env[`AI_MODEL_${task.toUpperCase().replace(/[^A-Z0-9]/g, '_')}`] || params.model;
  // Claude Haiku has no server-side refusal fallback: for it the callers' `fallbacks` and its beta are left out.
  const req = { ...params, model };
  if (/haiku/.test(model)) {
    delete req.fallbacks;
    if (req.betas) { req.betas = req.betas.filter(x => !/^server-side-fallback/.test(x)); if (!req.betas.length) delete req.betas; }
  }
  const t0 = Date.now();
  try {
    const res = stream ? await client.beta.messages.stream(req).finalMessage() : await client.beta.messages.create(req);
    const u = res.usage || {}, [pi, po, pc] = priceOf(res.model || model);
    const e = { model: res.model || model, in: u.input_tokens || 0, out: u.output_tokens || 0, cacheRead: u.cache_read_input_tokens || 0, cacheWrite: u.cache_creation_input_tokens || 0 };
    e.usd = (e.in * pi + e.out * po + e.cacheRead * pc + e.cacheWrite * pi * 1.25) / 1e6;
    note(task, { ...e, ok: res.stop_reason !== 'refusal', stop: res.stop_reason, ms: Date.now() - t0 });
    return res;
  } catch (err) {
    note(task, { model, ok: false, error: String(err.message || err).slice(0, 200), ms: Date.now() - t0 });
    throw err;
  }
}
// The text of an answer (its text blocks joined).
const text = res => res.content.filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
// A picture service's call, counted (kie.ai or OpenAI; their cost is not known here).
function picture(provider, ok, error) { if (store) note(`picture:${provider}`, { model: provider, ok, ...(error ? { error: String(error).slice(0, 200) } : {}) }); }

// For the admin: today by task, the last 14 days' totals, the budget, the last calls.
function report() {
  const u = usage(), days = Object.keys(u.days).sort().slice(-14);
  const sum = d => Object.values(d.tasks).reduce((s, x) => ({ n: s.n + x.n, fail: s.fail + x.fail, usd: s.usd + x.usd, in: s.in + x.in, out: s.out + x.out }), { n: 0, fail: 0, usd: 0, in: 0, out: 0 });
  return {
    today: { day: day(), tasks: (u.days[day()] || { tasks: {} }).tasks, ...sum(u.days[day()] || { tasks: {} }) },
    days: days.map(k => ({ day: k, ...sum(u.days[k]) })),
    budget: budget() || null,
    models: Object.fromEntries(Object.entries(process.env).filter(([k]) => k.startsWith('AI_MODEL_'))),
    recent: recent.slice(0, 50),
  };
}

module.exports = { init, call, text, picture, report, available };
