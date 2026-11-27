// AI Gateway (Mojtaba 2026-10-31): every call to Claude goes through here (lesson.js, search.js, insights.js and
// coach.js through it, imagegen.js's prompts), so the app has one place for:
//   - the model of each task: config/ai-models.json, else the module's own default (no variable, no vault);
//   - its use and cost: each call's tokens (cache reads and writes too), time and result, by day and by task, kept in
//     store.meta.aiUsage for 60 days, and the last 200 calls in memory; read by the admin (GET /api/aiusage);
//   - a daily budget: AI_DAILY_BUDGET_USD (none by default); once today's cost reaches it, the users' calls are refused
//     until the next day (the admin's own work still goes through);
//   - one client, with retries on overload and timeouts (the SDK's), and Anthropic's own fallback on a refusal
//     (the callers' `fallbacks: 'default'`).
// The picture services' calls (kie.ai, OpenAI images) are counted here too (picture()), without a cost.
'use strict';
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('node:fs');
const path = require('node:path');

// The model of each task from config/ai-models.json (Mojtaba 2026-11-11): model names are not secrets, so they live in
// the repository, where a change is a pull request. Only this file and the modules' own defaults decide a model: no
// environment variable or vault secret does. Read again when the file changes; a value that is not a Claude model id
// is left out (and listed in the report), and a missing or broken file leaves every task on its default. The other
// services' models (pictures, embeddings, speech) are in the same file (modelFor(), read by imagegen.js, rag.js, tts.js).
const MODELS_FILE = path.join(__dirname, 'config', 'ai-models.json');
const MODEL_ID = /^[a-z0-9][a-z0-9._-]*$/i;  // (Claude's ids, and the picture, embedding and speech services')
let fileCache = { mtime: -1, models: {}, voices: {}, bad: [], error: null };
function fileModels() {
  let st;
  try { st = fs.statSync(MODELS_FILE); } catch { fileCache = { mtime: 0, models: {}, voices: {}, bad: [], error: null }; return fileCache; }
  if (st.mtimeMs === fileCache.mtime) return fileCache;
  const next = { mtime: st.mtimeMs, models: {}, voices: {}, bad: [], error: null };
  try {
    const all = JSON.parse(fs.readFileSync(MODELS_FILE, 'utf8'));
    for (const [part, into, pre] of [['models', next.models, ''], ['voices', next.voices, 'voices.']]) {
      for (const [k, id] of Object.entries(all[part] || {})) {
        if (typeof id === 'string' && MODEL_ID.test(id.trim())) into[k] = id.trim(); else next.bad.push(pre + k);
      }
    }
  } catch (e) { next.error = String(e.message || e).slice(0, 200); console.error('config/ai-models.json:', next.error); }
  fileCache = next;
  return next;
}

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
  const fromFile = fileModels().models[task];
  const model = fromFile && /^claude-/.test(fromFile) ? fromFile : params.model;
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

// The model each task runs on (Mojtaba 2026-11-11), for the system page: the modules declare their tasks and default
// (declare()); the file's entry wins over that default.
const declared = [];
function declare(tasks, def) { declared.push({ tasks, def }); }
const modelFor = (task, def) => fileModels().models[task] || def;
// ElevenLabs' voice IDs from the same file's «voices» (tts.js; Mojtaba 2026-11-12).
const voiceFor = (key, def) => fileModels().voices[key] || def;
const MODULES = ['./lesson', './search', './insights', './imagegen', './rag', './tts'];
function effective() {
  for (const m of MODULES) { try { require(m); } catch { /* a module that does not load declares nothing */ } }
  const out = [];
  for (const d of declared) for (const task of d.tasks) {
    const m = modelFor(task, d.def);
    // (a Claude task only takes a Claude id, as call() does)
    out.push({ task, model: /^claude-/.test(d.def) && !/^claude-/.test(m) ? d.def : m, claude: /^claude-/.test(d.def) });
  }
  const ORDER = ['coach', 'lesson', 'search', 'ask', 'search-term', 'picture-describe', 'picture-check', 'picture-prompt', 'picture', 'picture-openai', 'embeddings', 'speech', 'speech-fa'];
  const at = t => (ORDER.indexOf(t) + 1 || 99);
  return out.sort((a, b) => at(a.task) - at(b.task));
}

// For the admin: today by task, the last 14 days' totals, the budget, the last calls.
function report() {
  const u = usage(), days = Object.keys(u.days).sort().slice(-14);
  const sum = d => Object.values(d.tasks).reduce((s, x) => ({ n: s.n + x.n, fail: s.fail + x.fail, usd: s.usd + x.usd, in: s.in + x.in, out: s.out + x.out }), { n: 0, fail: 0, usd: 0, in: 0, out: 0 });
  return {
    today: { day: day(), tasks: (u.days[day()] || { tasks: {} }).tasks, ...sum(u.days[day()] || { tasks: {} }) },
    days: days.map(k => ({ day: k, ...sum(u.days[k]) })),
    budget: budget() || null,
    recent: recent.slice(0, 50),
    effective: effective(),
    file: { bad: fileModels().bad, error: fileModels().error },
  };
}

module.exports = { init, call, text, picture, report, available, declare, modelFor, voiceFor };
