// New pictures for the questions, made by an image model on kie.ai (GPT Image 2.5 Flare / Sunburst).
// To keep the new picture independent of prove.dk's, the image model never sees the original:
//   1. Claude reads the question, its answers and the original picture and writes a short factual description of the
//      traffic situation (road, lanes, markings, Danish signs, lights, vehicles, people, weather, viewpoint);
//   2. the image model draws a new picture from that text only (text-to-image, 4:3);
//   3. the result is kept in the database (store blobs). The original file in site/img is never changed.
// Which picture the site shows is chosen per question in store.meta.images: { [qid]: { active, v, jobs: [...] } };
// `active` is a job's taskId (its picture is shown) or null (the original). `v` changes on every switch so browsers
// load the new picture instead of a cached one. Needs KIE_API_KEY (and ANTHROPIC_API_KEY for the description).
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const Anthropic = require('@anthropic-ai/sdk');

const KIE = process.env.KIE_BASE || 'https://api.kie.ai/api/v1';
// Flare (faster, cheaper) is the default; Sunburst gives more detail.
const MODELS = { flare: 'gpt-image-2-5-flare-text-to-image', sunburst: 'gpt-image-2-5-sunburst-text-to-image' };
const CLAUDE = process.env.LESSON_MODEL || 'claude-opus-5-5';
const PUBLIC_URL = (process.env.PUBLIC_URL || 'https://kore.mintcloud.info').replace(/\/$/, '');

const DESCRIBE = `You write prompts for a text-to-image model that draws NEW pictures for a Danish driving-theory practice site (category B).
You get one theory-test question (Danish), its statements with the correct answers and the official explanations, and the current picture as a reference for the situation only.

Write ONE prompt in English (at most 220 words) that describes the traffic situation as facts, so a new, independent picture can be drawn:
- the viewpoint (e.g. from the driver's seat at eye height looking ahead; if the reference shows the car's dashboard and mirrors, say so);
- the road: type (town street, country road, motorway, junction…), number of lanes, curves or hills, kerbs, cycle tracks, pavements;
- road markings exactly as they matter (white or yellow, solid or broken, arrows, stop lines, zebra crossings);
- traffic signs by their meaning and their official Danish design (shape, colours, numbers) and where they stand;
- traffic lights and the colour that is lit; other vehicles, cyclists and pedestrians: generic type and colour, position and what they are doing;
- time of day, weather, season and road surface when they matter.
Everything the correct answers depend on must be clearly visible in the new picture. Leave out details that do not matter.
Do NOT describe the reference picture's artistic style, exact composition, buildings' look or camera framing beyond the viewpoint, and do not mention the reference.
End with: "Style: realistic, modern, high-quality 3D render, sharp details, natural light. No logos, no watermarks, no brand names, no readable text except on the traffic signs, no recognisable real people."
Answer with the prompt only.`;

let store = null, SITE = null, BANK = null, Q = null, claude = null, timer = null;

const available = () => !!process.env.KIE_API_KEY;
const images = () => (store.meta.images = store.meta.images || {});
const save = () => store.saveMeta('images', images());

function init(s, siteDir) {
  store = s; SITE = siteDir;
  const js = fs.readFileSync(path.join(SITE, 'data.js'), 'utf8');
  BANK = JSON.parse(js.slice(js.indexOf('=') + 1).trim().replace(/;$/, ''));
  Q = new Map(BANK.questions.map(q => [q.id, q]));
  if (Object.values(images()).some(x => x.jobs.some(j => !j.done))) schedule();
}

async function kie(method, url, body) {
  const r = await fetch(KIE + url, { method, headers: { Authorization: `Bearer ${process.env.KIE_API_KEY}`, 'Content-Type': 'application/json' }, body: body && JSON.stringify(body) });
  const d = await r.json().catch(() => ({}));
  if (!r.ok || (d.code && d.code !== 200)) throw new Error(`kie.ai ${r.status}: ${d.msg || d.message || 'error'}`);
  return d.data;
}

async function describe(q) {
  claude = claude || new Anthropic({ timeout: 120e3, maxRetries: 2 });
  const lines = q.st.map((s, k) => `${k + 1}. ${s.da} → ${s.ok ? 'CORRECT' : 'WRONG'}. Explanation: ${s.eda || '-'}`).join('\n');
  const img = fs.readFileSync(path.join(SITE, q.img));
  const r = await claude.messages.create({
    model: CLAUDE, max_tokens: 1500, system: DESCRIBE,
    messages: [{ role: 'user', content: [
      { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: img.toString('base64') } },
      { type: 'text', text: `Question: ${q.sda}\n${q.sen ? `(English: ${q.sen})\n` : ''}Statements:\n${lines}` },
    ] }],
  });
  const text = r.content.filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
  if (!text) throw new Error('empty description');
  return text;
}

// Starts ONE new picture for question `qid` with the chosen model ('flare' | 'sunburst'). Returns the job.
// `prompt`: a scene description written or edited by the admin; without it Claude writes one.
async function start(qid, model = 'flare', by = '', prompt = '') {
  if (!available()) throw Object.assign(new Error('KIE_API_KEY تنظیم نشده است.'), { status: 503 });
  const q = Q.get(+qid);
  if (!q) throw Object.assign(new Error('سؤال پیدا نشد.'), { status: 404 });
  if (!MODELS[model]) throw Object.assign(new Error('مدل نامعتبر'), { status: 400 });
  const item = images()[q.id] = images()[q.id] || { active: null, v: '', jobs: [] };
  // One picture at a time per question, so a double click or a second tab never makes two.
  if (item.jobs.some(j => !j.done)) throw Object.assign(new Error('برای این سؤال یک تصویر در حال ساخت است؛ صبر کنید تا تمام شود.'), { status: 409 });
  prompt = String(prompt || '').trim().slice(0, 20000);
  const job = { id: Date.now().toString(36), model, at: Date.now(), by, state: prompt ? 'queued' : 'describing', done: false, ...(prompt ? { edited: true } : {}) };
  item.jobs.push(job); await save();
  try {
    job.prompt = prompt || await describe(q);
    job.state = 'queued'; await save();
    const d = await kie('POST', '/jobs/createTask', { model: MODELS[model], callBackUrl: `${PUBLIC_URL}/api/kiecallback`, input: { prompt: job.prompt, aspect_ratio: '4:3', resolution: '2K' } });
    job.taskId = d.taskId; job.state = 'generating'; await save();
    schedule();
  } catch (e) {
    job.state = 'fail'; job.error = e.message; job.done = true; await save();
    console.error('imagegen start', q.id, e.message);
  }
  return job;
}

// Polls kie.ai for unfinished jobs; a finished picture is stored and shown on the site.
function schedule() { if (!timer) timer = setTimeout(poll, 8000); }
async function poll() {
  timer = null;
  let pending = false;
  for (const [qid, item] of Object.entries(images())) for (const job of item.jobs) {
    if (job.done || !job.taskId) continue;
    try {
      const d = await kie('GET', `/jobs/recordInfo?taskId=${encodeURIComponent(job.taskId)}`);
      if (d.state === 'success') {
        const url = (JSON.parse(d.resultJson || '{}').resultUrls || [])[0];
        if (!url) throw new Error('no result url');
        const r = await fetch(url); if (!r.ok) throw new Error(`download ${r.status}`);
        const buf = Buffer.from(await r.arrayBuffer());
        job.blob = `qimg-${qid}-${job.id}`;
        await store.saveBlob(job.blob, r.headers.get('content-type') || 'image/png', buf);
        Object.assign(job, { state: 'done', done: true, credits: d.creditsConsumed, size: buf.length });
        item.active = job.id; item.v = job.id;          // the new picture is shown right away; the original can be restored
      } else if (d.state === 'fail') {
        Object.assign(job, { state: 'fail', done: true, error: d.failMsg || 'failed' });
      } else { job.state = 'generating'; pending = true; }
      if (Date.now() - job.at > 30 * 60e3 && !job.done) Object.assign(job, { state: 'fail', done: true, error: 'timeout' });
    } catch (e) {
      job.error = e.message; pending = true;
      if (Date.now() - job.at > 30 * 60e3) Object.assign(job, { state: 'fail', done: true });
    }
    await save();
  }
  if (pending) schedule();
}

// Show picture `jobId` for question `qid`, or the original when jobId is null.
async function setActive(qid, jobId) {
  const item = images()[+qid];
  if (!item) throw Object.assign(new Error('not found'), { status: 404 });
  if (jobId && !item.jobs.some(j => j.id === jobId && j.blob)) throw Object.assign(new Error('not found'), { status: 404 });
  item.active = jobId || null; item.v = (jobId || 'o') + '.' + Date.now().toString(36);
  await save();
}

// Recently served pictures stay in memory (a few MB each), so the database is not read on every request.
const cache = new Map();
async function blob(key) {
  if (cache.has(key)) return cache.get(key);
  const b = await store.getBlob(key);
  if (b) { cache.set(key, b); if (cache.size > 30) cache.delete(cache.keys().next().value); }
  return b;
}
// For /img/q<id>.jpg: the generated picture that is shown instead of the file, if any.
async function activeBlob(qid) {
  const item = (store.meta.images || {})[qid];
  const job = item && item.active && item.jobs.find(j => j.id === item.active);
  return job && job.blob ? blob(job.blob) : null;
}
const jobBlob = async (qid, jobId) => {
  const item = (store.meta.images || {})[qid], job = item && item.jobs.find(j => j.id === jobId);
  return job && job.blob ? blob(job.blob) : null;
};
// Picture versions the page adds to the image URL (?v=…), for every question whose picture was ever switched.
const versions = () => Object.fromEntries(Object.entries(store.meta.images || {}).filter(([, x]) => x.v).map(([k, x]) => [k, x.v]));
const list = () => ({ available: available(), models: Object.keys(MODELS), items: store.meta.images || {} });

const firstQuestion = () => BANK.tests[0].qs[0];

// A scene description only (Claude), for the admin to edit before making a picture.
async function draft(qid) {
  const q = Q.get(+qid);
  if (!q) throw Object.assign(new Error('سؤال پیدا نشد.'), { status: 404 });
  return describe(q);
}

module.exports = { draft, firstQuestion, init, start, poll, setActive, activeBlob, jobBlob, versions, list, available };
