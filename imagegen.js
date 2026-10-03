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
const png = require('./png');

const KIE = process.env.KIE_BASE || 'https://api.kie.ai/api/v1';
// Sunburst (more detail) is the default; Flare is faster and cheaper.
const MODELS = { sunburst: 'gpt-image-2-5-sunburst-text-to-image', flare: 'gpt-image-2-5-flare-text-to-image' };
// Editing one of OUR generated pictures (never the original): image-to-image with a short instruction.
const EDIT_MODELS = { flare: 'gpt-image-2-5-flare-image-to-image', sunburst: 'gpt-image-2-5-sunburst-image-to-image' };
const UPLOAD = process.env.KIE_UPLOAD_BASE || 'https://kieai.redpandaai.co';
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
  fixIntro().catch(e => console.error('intro pictures', e.message)).then(() => startIntro()).catch(e => console.error('intro pictures', e.message));
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
async function start(qid, model = 'sunburst', by = '', prompt = '') {
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
  if (await pollIntro().catch(() => true)) pending = true;
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
const list = () => ({ available: available(), models: Object.keys(MODELS),
  items: Object.fromEntries(Object.entries(store.meta.images || {}).filter(([, x]) => x.jobs.length)) });

const firstQuestion = () => BANK.tests[0].qs[0];

// Uploads a generated picture to kie.ai's temporary file store (kept 3 days) and returns its URL.
async function upload(b, name) {
  const r = await fetch(`${UPLOAD}/api/file-base64-upload`, { method: 'POST', headers: { Authorization: `Bearer ${process.env.KIE_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ base64Data: `data:${b.mime};base64,${b.data.toString('base64')}`, uploadPath: 'teoriprove', fileName: name }) });
  const d = await r.json().catch(() => ({}));
  const url = d.data && (d.data.downloadUrl || d.data.fileUrl);
  if (!r.ok || !url) throw new Error(`upload ${r.status}: ${d.msg || 'failed'}`);
  return url;
}

// Changes only what `instruction` says in generated picture `fromJob`; the rest must stay as it is.
async function edit(qid, fromJob, instruction, model = 'sunburst', by = '') {
  if (!available()) throw Object.assign(new Error('KIE_API_KEY تنظیم نشده است.'), { status: 503 });
  const item = images()[+qid], src = item && item.jobs.find(j => j.id === fromJob && j.blob);
  if (!src) throw Object.assign(new Error('تصویر پیدا نشد.'), { status: 404 });
  if (!EDIT_MODELS[model]) throw Object.assign(new Error('مدل نامعتبر'), { status: 400 });
  instruction = String(instruction || '').trim().slice(0, 2000);
  if (!instruction) throw Object.assign(new Error('دستور ویرایش خالی است.'), { status: 400 });
  if (item.jobs.some(j => !j.done)) throw Object.assign(new Error('برای این سؤال یک تصویر در حال ساخت است؛ صبر کنید تا تمام شود.'), { status: 409 });
  const prompt = `Edit this image. Change ONLY the following and keep everything else exactly as it is — the same composition, camera angle, framing, lighting, colours, road, markings, signs, vehicles, people and every other detail must stay unchanged:\n${instruction}\nNo logos, no watermarks, no new text.`;
  const job = { id: Date.now().toString(36), model, at: Date.now(), by, state: 'queued', done: false, kind: 'edit', from: fromJob, instruction, prompt: src.prompt };
  item.jobs.push(job); await save();
  try {
    const url = await upload(await blob(src.blob), `q${qid}-${src.id}.png`);
    const d = await kie('POST', '/jobs/createTask', { model: EDIT_MODELS[model], callBackUrl: `${PUBLIC_URL}/api/kiecallback`, input: { prompt, input_urls: [url], aspect_ratio: '4:3', resolution: '2K' } });
    job.taskId = d.taskId; job.state = 'generating'; await save();
    schedule();
  } catch (e) {
    job.state = 'fail'; job.error = e.message; job.done = true; await save();
    console.error('imagegen edit', qid, e.message);
  }
  return job;
}

// Deletes a generated picture. If it was shown, the newest remaining picture is shown instead, or the original.
async function remove(qid, jobId) {
  const item = images()[+qid], k = item ? item.jobs.findIndex(j => j.id === jobId) : -1;
  if (k < 0) throw Object.assign(new Error('تصویر پیدا نشد.'), { status: 404 });
  const job = item.jobs[k];
  if (!job.done) throw Object.assign(new Error('این تصویر هنوز در حال ساخت است.'), { status: 409 });
  if (job.blob) { await store.deleteBlob(job.blob); cache.delete(job.blob); }
  item.jobs.splice(k, 1);
  if (item.active === jobId) {
    const next = item.jobs.filter(j => j.blob).sort((a, b) => b.at - a.at)[0];
    item.active = next ? next.id : null; item.v = (item.active || 'o') + '.' + Date.now().toString(36);
  }
  await save();
}

// A scene description only (Claude), for the admin to edit before making a picture.
async function draft(qid) {
  const q = Q.get(+qid);
  if (!q) throw Object.assign(new Error('سؤال پیدا نشد.'), { status: 404 });
  return describe(q);
}

// ---------- pictures for the app's intro (four slides) ----------
// Made once by the same image model when the server starts with KIE_API_KEY set: a detailed 3D isometric scene per
// slide (and one for the app's «no internet» page) on a plain teal background, so the app can lay it on its teal intro. Kept in store.meta.intro and served at
// /intro/<n>.png; the app falls back to its own drawings until a picture is there. Changing INTRO_SET makes new ones.
const INTRO_SET = 'v3';
const INTRO_STYLE = 'Style: a modern, minimal 3D isometric illustration like the onboarding art of a premium mobile app: only a few simple objects, clean rounded geometric shapes, smooth matte materials with a soft clay look, soft ambient light, subtle soft shadows, no clutter, no fine texture; people are small, stylised and faceless. Palette: white, light teal (#9fd3d4), warm coral (#e8957a) and periwinkle blue (#5b74c4), with one or two small accents of green, red or warm yellow. The background is ONE plain, flat, solid muted teal (#3f8c8f) with no gradient, no floor, no horizon and no frame. The group of objects is compact, centred and fills about three quarters of the image. No text, no letters, no numbers, no logos, no brand names, no watermarks.';
const INTRO_PROMPTS = [
  'A smartphone standing upright in the centre with a plain white screen showing a small rounded app tile with a speedometer symbol. Around it, joined to it by thin softly glowing white curved lines with small dots at their ends: a small rounded coral car, a simple driving licence card with a faceless photo silhouette, a red octagonal stop sign and a red-and-white triangular give-way sign on short poles.',
  'A giant closed periwinkle-blue theory book lying flat at an isometric angle, with a winding grey road with white dashes printed across its cover. Two small faceless people sit on the book: one studies on a tablet, the other holds a small clipboard with ticked boxes; a third stands beside the book looking at a phone. A small green round badge with a white check mark rests on the corner of the book.',
  'A large smartphone lying flat at an isometric angle, used as a stage. On its screen stands a small, friendly, rounded white robot with a softly glowing light-teal face, next to a big coral speech bubble with three white placeholder lines, and a small white card showing a red-and-white triangular warning road sign; two four-pointed sparkles float above.',
  'A winding road with white dashes climbs from the lower left to the upper right like a rising path; a small rounded coral car drives up it. At the top of the road stands a small podium with a yellow trophy and a green flag; beside the road floats a simple white card with three rising periwinkle-blue bars.',
  // 5: the app's «no internet» page (bundled into the app, since it shows when the server cannot be reached).
  'No internet connection: a large rounded white Wi-Fi symbol with a small coral circle and a white diagonal slash over it, floating above a small smartphone lying at an isometric angle whose screen shows a soft grey cloud with a little white x; a thin cable with an unplugged plug lies loose beside the phone.',
];
// A new picture at half size (2048 → 1024 px, about a quarter of the bytes) and its background colour, which the app
// paints behind it so the picture's edge does not show. A file it cannot read is kept as it is.
function shrinkIntro(buf, mime) {
  try {
    const im = png.decode(buf); if (!im) return { buf, mime };
    const small = im.w > 1200 ? png.half(im) : im;
    return { buf: png.encode(small), mime: 'image/png', bg: png.edgeColour(small) };
  } catch (e) { console.error('intro picture shrink', e.message); return { buf, mime }; }
}
// Pictures made before shrinking existed: shrunk once.
async function fixIntro() {
  for (const job of Object.values(((store.meta.intro || {}).items) || {})) {
    if (!job.blob || job.bg) continue;
    const b = await store.getBlob(job.blob); if (!b) continue;
    const s = shrinkIntro(b.data, b.mime);
    if (s.bg) { await store.saveBlob(job.blob, s.mime, s.buf); cache.delete(job.blob); Object.assign(job, { bg: s.bg, size: s.buf.length, v: Date.now().toString(36) }); await saveIntro(); }
    await new Promise(r => setImmediate(r));
  }
}
const intro = () => (store.meta.intro = store.meta.intro && store.meta.intro.set === INTRO_SET ? store.meta.intro : { set: INTRO_SET, items: {} });
const saveIntro = () => store.saveMeta('intro', intro());
async function startIntro() {
  if (!available()) return;
  // A new set replaces the old one: its pictures are removed.
  const prev = store.meta.intro;
  if (prev && prev.set !== INTRO_SET) for (const j of Object.values(prev.items || {})) if (j.blob) { await store.deleteBlob(j.blob).catch(() => {}); cache.delete(j.blob); }
  const it = intro().items;
  for (let n = 1; n <= INTRO_PROMPTS.length; n++) {
    const x = it[n];
    if (x && (x.blob || !x.done || (x.tries || 0) >= 3)) continue;   // done, running, or given up after 3 tries
    const job = it[n] = { at: Date.now(), done: false, state: 'queued', tries: ((x && x.tries) || 0) + 1, prompt: `${INTRO_PROMPTS[n - 1]}
${INTRO_STYLE}` };
    try {
      const d = await kie('POST', '/jobs/createTask', { model: MODELS.sunburst, callBackUrl: `${PUBLIC_URL}/api/kiecallback`, input: { prompt: job.prompt, aspect_ratio: '1:1', resolution: '2K' } });
      job.taskId = d.taskId; job.state = 'generating';
    } catch (e) { Object.assign(job, { state: 'fail', done: true, error: e.message }); console.error('intro picture', n, e.message); }
    await saveIntro();
  }
  if (Object.values(it).some(j => !j.done && j.taskId)) schedule();
}
// One poll round for the intro pictures; true while some are still being made.
async function pollIntro() {
  if (!store.meta.intro) return false;
  let pending = false;
  for (const [n, job] of Object.entries(intro().items)) {
    if (job.done || !job.taskId) continue;
    try {
      const d = await kie('GET', `/jobs/recordInfo?taskId=${encodeURIComponent(job.taskId)}`);
      if (d.state === 'success') {
        const url = (JSON.parse(d.resultJson || '{}').resultUrls || [])[0];
        if (!url) throw new Error('no result url');
        const r = await fetch(url); if (!r.ok) throw new Error(`download ${r.status}`);
        const s = shrinkIntro(Buffer.from(await r.arrayBuffer()), r.headers.get('content-type') || 'image/png');
        job.blob = `intro-${INTRO_SET}-${n}`;
        await store.saveBlob(job.blob, s.mime, s.buf); cache.delete(job.blob);
        Object.assign(job, { state: 'done', done: true, v: Date.now().toString(36), size: s.buf.length, ...(s.bg ? { bg: s.bg } : {}) });
      } else if (d.state === 'fail') Object.assign(job, { state: 'fail', done: true, error: d.failMsg || 'failed' });
      else pending = true;
      if (!job.done && Date.now() - job.at > 30 * 60e3) Object.assign(job, { state: 'fail', done: true, error: 'timeout' });
    } catch (e) { job.error = e.message; pending = true; if (Date.now() - job.at > 30 * 60e3) Object.assign(job, { state: 'fail', done: true }); }
    await saveIntro();
  }
  return pending;
}
// For /api/config: slide number → picture version, for the pictures that are ready.
const introNow = () => (store.meta.intro && store.meta.intro.set === INTRO_SET ? store.meta.intro.items || {} : {});
const introVersions = () => Object.fromEntries(Object.entries(introNow()).filter(([, j]) => j.blob).map(([n, j]) => [n, j.v]));
// Slide number → the picture's background colour.
const introColours = () => Object.fromEntries(Object.entries(introNow()).filter(([, j]) => j.blob && j.bg).map(([n, j]) => [n, j.bg]));
const introBlob = async n => { const j = introNow()[n]; return j && j.blob ? blob(j.blob) : null; };

module.exports = { edit, remove, draft, firstQuestion, init, start, poll, setActive, activeBlob, jobBlob, versions, list, available, introVersions, introColours, introBlob };
