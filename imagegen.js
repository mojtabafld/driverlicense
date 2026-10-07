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
// The two models, set in the server's environment (DigitalOcean: Settings → web → Environment Variables):
// IMAGE_MODEL: the kie.ai picture model (default GPT Image 2.5 Sunburst; its text-to-image and image-to-image variants);
// IMAGE_PROMPT_MODEL: the Claude model that writes the console's picture prompts (default Claude Opus 5.5).
const IMAGE_MODEL = (process.env.IMAGE_MODEL || '').trim().replace(/-(text|image)-to-image$/, '') || 'gpt-image-2-5-sunburst';
const TEXT_TO_IMAGE = `${IMAGE_MODEL}-text-to-image`, IMAGE_TO_IMAGE = `${IMAGE_MODEL}-image-to-image`;
const PROMPT_MODEL = (process.env.IMAGE_PROMPT_MODEL || '').trim() || 'claude-opus-5-5';
const models = () => ({ prompt: PROMPT_MODEL, image: IMAGE_MODEL });
const UPLOAD = process.env.KIE_UPLOAD_BASE || 'https://kieai.redpandaai.co';
const CLAUDE = process.env.LESSON_AI_MODEL || 'claude-opus-5-5';
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

// A job left unfinished without a kie.ai task (e.g. the server stopped while Claude was writing its description) is
// never polled; after 30 minutes it counts as failed, so it no longer blocks a new picture for its question.
function unstick(item) {
  let n = 0;
  for (const j of item.jobs) if (!j.done && !j.taskId && Date.now() - j.at > 30 * 60e3) { Object.assign(j, { state: 'fail', done: true, error: j.error || 'stuck' }); n++; }
  return n;
}

function init(s, siteDir) {
  store = s; SITE = siteDir;
  const js = fs.readFileSync(path.join(SITE, 'data.js'), 'utf8');
  BANK = JSON.parse(js.slice(js.indexOf('=') + 1).trim().replace(/;$/, ''));
  Q = new Map(BANK.questions.map(q => [q.id, q]));
  if (Object.values(images()).reduce((n, x) => n + unstick(x), 0)) save().catch(() => {});
  if (Object.values(images()).some(x => x.jobs.some(j => !j.done))) schedule();
  pruneAll().then(lessonsToProve).catch(e => console.error('prune pictures', e.message));
  if (Object.values(store.meta.oneOff || {}).some(j => !j.done)) schedule();
  // Nothing is made on its own any more (the image model's credit is limited): only the guide pictures ordered in
  // data/art-orders.json. The intro, «آموزش» cards, profile pictures and the questions' own pictures keep what was made.
  fixIntro().catch(e => console.error('intro pictures', e.message))
    .then(() => GUIDE.start()).catch(e => console.error('guide pictures', e.message))
    .then(() => LEARN.start()).catch(e => console.error('learn pictures', e.message))
    .then(() => COURSE.start()).catch(e => console.error('course pictures', e.message));
}

// The pictures ordered by hand (data/art-orders.json): picture keys or group names (data/guide-groups.json).
function ordered() {
  try {
    const o = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'art-orders.json'), 'utf8'));
    const groups = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'guide-groups.json'), 'utf8'));
    return new Set((o.guide || []).flatMap(x => groups[x] || [x]));
  } catch (e) { console.error('art orders', e.message); return new Set(); }
}
// The «آموزش» cards ordered to be made again: card number → a mark (e.g. the date); each new mark makes that card's
// picture once more (the old one stays on show until the new one is ready).
function learnOrders() {
  try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'art-orders.json'), 'utf8')).learn || {}; }
  catch { return {}; }
}

async function kie(method, url, body) {
  const r = await fetch(KIE + url, { method, headers: { Authorization: `Bearer ${process.env.KIE_API_KEY}`, 'Content-Type': 'application/json' }, body: body && JSON.stringify(body) });
  const d = await r.json().catch(() => ({}));
  if (!r.ok || (d.code && d.code !== 200)) throw new Error(`kie.ai ${r.status}: ${d.msg || d.message || 'error'}`);
  return d.data;
}

// `extra`: one more instruction for this description (e.g. the console's attention to signs and markings).
async function describe(q, extra = '') {
  claude = claude || new Anthropic({ timeout: 120e3, maxRetries: 2 });
  const lines = q.st.map((s, k) => `${k + 1}. ${s.da} → ${s.ok ? 'CORRECT' : 'WRONG'}. Explanation: ${s.eda || '-'}`).join('\n');
  const img = fs.readFileSync(path.join(SITE, q.img));
  const r = await claude.messages.create({
    model: CLAUDE, max_tokens: 1500, system: DESCRIBE,
    messages: [{ role: 'user', content: [
      { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: img.toString('base64') } },
      { type: 'text', text: `Question: ${q.sda}\n${q.sen ? `(English: ${q.sen})\n` : ''}Statements:\n${lines}${extra ? `\n\n${extra}` : ''}` },
    ] }],
  });
  const text = r.content.filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
  if (!text) throw new Error('empty description');
  return text;
}

// Starts ONE new picture for question `qid` with the chosen model ('flare' | 'sunburst'). Returns the job.
// `prompt`: a scene description written or edited by the admin; without it Claude writes one.
// `pick`: made from the console: the new picture waits beside the others until the admin chooses it (setActive).
async function start(qid, model = 'sunburst', by = '', prompt = '', seed = '', pick = false) {
  if (!available()) throw Object.assign(new Error('KIE_API_KEY تنظیم نشده است.'), { status: 503 });
  const q = Q.get(+qid);
  if (!q) throw Object.assign(new Error('سؤال پیدا نشد.'), { status: 404 });
  const item = images()[q.id] = images()[q.id] || { active: null, v: '', jobs: [] };
  unstick(item);
  // One picture at a time per question, so a double click or a second tab never makes two.
  if (item.jobs.some(j => !j.done)) throw Object.assign(new Error('برای این سؤال یک تصویر در حال ساخت است؛ صبر کنید تا تمام شود.'), { status: 409 });
  prompt = String(prompt || '').trim().slice(0, 20000);
  const job = { id: Date.now().toString(36), model, at: Date.now(), by, state: prompt ? 'queued' : 'describing', done: false, ...(prompt ? { edited: true } : {}), ...(seed ? { seed } : {}), ...(pick ? { pick: true } : {}) };
  item.jobs.push(job); await save();
  try {
    job.prompt = prompt || ownPrompt(q.id) || await describe(q);
    job.state = 'queued'; await save();
    const d = await kie('POST', '/jobs/createTask', { model: TEXT_TO_IMAGE, callBackUrl: `${PUBLIC_URL}/api/kiecallback`, input: { prompt: job.prompt, aspect_ratio: '4:3', resolution: '2K' } });
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
        let buf = Buffer.from(await r.arrayBuffer()), mime = r.headers.get('content-type') || 'image/png';
        if (job.seed) ({ buf, mime } = shrink(buf, mime));
        // Only the marked parts are taken from the result; the rest is the original picture's, untouched.
        if (job.regions) {
          const src = item.jobs.find(j => j.id === job.from && j.blob), sb = src && await blob(src.blob);
          const c = sb && composited(sb, { mime, data: buf }, job.regions);
          // Never the whole new picture in place of a correction: without the original to put the parts on, it fails.
          if (!c) throw Object.assign(new Error('ترکیب بخش‌های اصلاح‌شده با تصویر اصلی ممکن نشد.'), { final: true });
          buf = c.data; mime = c.mime; job.composited = true;
        }
        job.blob = `qimg-${qid}-${job.id}`;
        await store.saveBlob(job.blob, mime, buf);
        Object.assign(job, { state: 'done', done: true, credits: d.creditsConsumed, size: buf.length });
        // The new picture is shown right away (the original can be restored), unless the admin is to choose it first.
        if (!job.pick) { item.active = job.id; item.v = job.id; }
        // Made from the console: it replaces the question's earlier made picture (deleted), and is shown wherever that one was.
        else await replaceWith(item, job);
        if (job.seed) setImmediate(() => checkSeeded(qid, job));
      } else if (d.state === 'fail') {
        Object.assign(job, { state: 'fail', done: true, error: d.failMsg || 'failed' });
      } else { job.state = 'generating'; pending = true; }
      if (Date.now() - job.at > 30 * 60e3 && !job.done) Object.assign(job, { state: 'fail', done: true, error: 'timeout' });
    } catch (e) {
      job.error = e.message;
      if (e.final) Object.assign(job, { state: 'fail', done: true });
      else { pending = true; if (Date.now() - job.at > 30 * 60e3) Object.assign(job, { state: 'fail', done: true }); }
    }
    await save();
  }
  if (await pollIntro().catch(() => true)) pending = true;
  if (await pollLearn().catch(() => true)) pending = true;
  if (await COURSE.poll().catch(() => true)) pending = true;
  if (await AVATAR.poll().catch(() => true)) pending = true;
  if (await GUIDE.poll().catch(() => true)) pending = true;
  if (await pollOneOff().catch(() => true)) pending = true;
  if (pending) schedule();
}

// Show picture `jobId` for question `qid`, or the original when jobId is null.
async function setActive(qid, jobId) {
  const item = images()[+qid];
  if (!item) throw Object.assign(new Error('not found'), { status: 404 });
  if (jobId && !item.jobs.some(j => j.id === jobId && j.blob)) throw Object.assign(new Error('not found'), { status: 404 });
  item.active = jobId || null; item.v = (jobId || 'o') + '.' + Date.now().toString(36);
  await prune(item);
}
// One made picture per question is enough: the shown one, or (the original shown) the newest; the other finished
// jobs and their pictures are deleted. A picture still being made is left alone.
async function prune(item) {
  const made = item.jobs.filter(j => j.blob).sort((a, b) => b.at - a.at);
  const keep = item.active && made.some(j => j.id === item.active) ? item.active : made[0] && made[0].id;
  for (const j of item.jobs.filter(j => j.done && j.id !== keep)) if (j.blob) { await store.deleteBlob(j.blob).catch(() => {}); cache.delete(j.blob); }
  item.jobs = item.jobs.filter(j => !j.done || j.id === keep);
  await save();
}
// A new made picture in place of the question's earlier ones: they are deleted; if one of them was shown, the new one is.
async function replaceWith(item, job) {
  const shown = item.active && item.active !== job.id;
  for (const j of item.jobs.filter(j => j.done && j !== job)) if (j.blob) { await store.deleteBlob(j.blob).catch(() => {}); cache.delete(j.blob); }
  item.jobs = item.jobs.filter(j => !j.done || j === job);
  if (shown) { item.active = job.id; item.v = `${job.id}.${Date.now().toString(36)}`; }
}
// Once: every question keeps only its newest made picture (shown if a made one was shown).
async function pruneAll() {
  if (store.meta.imagesPruned) return;
  for (const item of Object.values(images())) {
    const newest = item.jobs.filter(j => j.blob).sort((a, b) => b.at - a.at)[0];
    if (item.active && newest && item.active !== newest.id) { item.active = newest.id; item.v = `${newest.id}.${Date.now().toString(36)}`; }
    await prune(item);
  }
  store.meta.imagesPruned = Date.now(); await store.saveMeta('imagesPruned', store.meta.imagesPruned);
}

// Once (the admin asked for it): every question of the 44 lessons shows its original picture from prove.dk on the main
// site again; the made pictures are kept, to be chosen again in the console.
async function lessonsToProve() {
  if (store.meta.lessonsToProve) return;
  const ids = new Set(BANK.tests.flatMap(t => t.qs));
  let n = 0;
  for (const [qid, item] of Object.entries(images())) {
    if (!ids.has(+qid) || !item.active) continue;
    item.active = null; item.v = `o.${Date.now().toString(36)}`; n++;
  }
  await save();
  store.meta.lessonsToProve = Date.now(); await store.saveMeta('lessonsToProve', store.meta.lessonsToProve);
  console.log(`lesson pictures: ${n} back to prove.dk's`);
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
const list = () => ({ available: available(), models: [IMAGE_MODEL],
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
  instruction = String(instruction || '').trim().slice(0, 2000);
  if (!instruction) throw Object.assign(new Error('دستور ویرایش خالی است.'), { status: 400 });
  if (item.jobs.some(j => !j.done)) throw Object.assign(new Error('برای این سؤال یک تصویر در حال ساخت است؛ صبر کنید تا تمام شود.'), { status: 409 });
  const prompt = `Edit this image. Change ONLY the following and keep everything else exactly as it is — the same composition, camera angle, framing, lighting, colours, road, markings, signs, vehicles, people and every other detail must stay unchanged:\n${instruction}\nNo logos, no watermarks, no new text.`;
  const job = { id: Date.now().toString(36), model, at: Date.now(), by, state: 'queued', done: false, kind: 'edit', from: fromJob, instruction, prompt: src.prompt };
  item.jobs.push(job); await save();
  try {
    const url = await upload(await blob(src.blob), `q${qid}-${src.id}.png`);
    const d = await kie('POST', '/jobs/createTask', { model: IMAGE_TO_IMAGE, callBackUrl: `${PUBLIC_URL}/api/kiecallback`, input: { prompt, input_urls: [url], aspect_ratio: '4:3', resolution: '2K' } });
    job.taskId = d.taskId; job.state = 'generating'; await save();
    schedule();
  } catch (e) {
    job.state = 'fail'; job.error = e.message; job.done = true; await save();
    console.error('imagegen edit', qid, e.message);
  }
  return job;
}

// The console's «اعمال اصلاحات روی همین تصویر»: the image model redraws picture `src` with only the marked parts
// changed (`instruction`, one line per numbered part; `marked`: the picture with the parts outlined and numbered, as
// a guide), then only those parts (`regions`: [{ x, y, w, h }] as fractions) are taken from its result and put on the
// original: everything outside them stays exactly as it was.
const regionPrompt = instruction => `Edit the FIRST image. The SECOND image is the same picture with numbered red rectangles that mark the ONLY places to change. Make exactly these changes, each inside its numbered rectangle, and nothing else:
${instruction}
Everything outside the rectangles must stay exactly as it is in the first image: the same composition, camera angle, framing, scale, lighting, colours and every road, marking, sign, light, vehicle and object. Do not draw any rectangles, numbers or outlines. No logos, no watermarks, no new text.`;
function composited(src, out, regions) {
  try {
    const a = png.decode(src.data), b = png.decode(out.data);
    if (!a || !b) return null;
    return { mime: 'image/png', data: png.encode(png.composite(a, b, regions)) };
  } catch (e) { console.error('picture composite', e.message); return null; }
}
async function editRegions(qid, fromJob, { instruction, marked, regions, prompt, by = '' }) {
  if (!available()) throw Object.assign(new Error('KIE_API_KEY تنظیم نشده است.'), { status: 503 });
  const item = images()[+qid], src = item && item.jobs.find(j => j.id === fromJob && j.blob);
  if (!src) throw Object.assign(new Error('تصویر پیدا نشد.'), { status: 404 });
  if (item.jobs.some(j => !j.done)) throw Object.assign(new Error('برای این سؤال یک تصویر در حال ساخت است؛ صبر کنید تا تمام شود.'), { status: 409 });
  const job = { id: Date.now().toString(36), model: 'sunburst', at: Date.now(), by, state: 'queued', done: false, kind: 'regions', from: fromJob,
    instruction, regions, pick: true, prompt: prompt || src.prompt };
  item.jobs.push(job); await save();
  try {
    const urls = [await upload(await blob(src.blob), `q${qid}-${src.id}.png`), await upload(marked, `q${qid}-${job.id}-marked.jpg`)];
    const d = await kie('POST', '/jobs/createTask', { model: IMAGE_TO_IMAGE, callBackUrl: `${PUBLIC_URL}/api/kiecallback`, input: { prompt: regionPrompt(instruction), input_urls: urls, aspect_ratio: '4:3', resolution: '2K' } });
    job.taskId = d.taskId; job.state = 'generating'; await save();
    schedule();
  } catch (e) {
    job.state = 'fail'; job.error = e.message; job.done = true; await save();
    console.error('imagegen regions', qid, e.message);
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

// A scene description only (Claude), for the admin to edit before making a picture (the console), with the details
// paragraph and the style of the console's part (`part`: lessons = realistic, rules = the illustration style).
async function draft(qid, part = 'lessons') {
  const q = Q.get(+qid);
  if (!q) throw Object.assign(new Error('سؤال پیدا نشد.'), { status: 404 });
  const lines = q.st.map((s, k) => `${k + 1}. ${s.da} → ${s.ok ? 'CORRECT' : 'WRONG'}. Explanation: ${s.eda || '-'}`).join('\n');
  const own = ownPrompts()[q.id];
  let img = null;
  try { img = { mime: 'image/jpeg', data: fs.readFileSync(path.join(SITE, q.img)) }; } catch { /* no picture file */ }
  const text = await writeText(CONSOLE_DESCRIBE, `Question: ${q.sda}\n${q.sen ? `(English: ${q.sen})\n` : ''}Statements:\n${lines}`
    + (own ? `\n\nOur own scene description of this question (keep everything in it, make it more complete and exact):\n${own.text}` : ''), img, 3000);
  return withHouseStyle(text, part);
}
// The console's question prompts: long and exact, in labelled parts, about everything that matters for driving.
const CONSOLE_DESCRIBE = `You write a detailed prompt for an image model that draws a NEW picture for one question of a Danish driving-theory app (category B).
You get the question (Danish), its statements with the correct answers and the official explanations, the current picture as a reference for the situation only, and sometimes our own scene description.

Write ONE prompt in English of 300 to 550 words, in these labelled parts and in this order (leave a part out only if it truly does not apply):
WHAT THE PICTURE TEACHES: one or two sentences: the rule the question tests and exactly which details the correct answers depend on.
VIEWPOINT: where the camera is (e.g. from the driver's seat at eye height looking ahead, with or without the dashboard and mirrors; or from above), and how far it sees.
ROAD LAYOUT: the kind of road (town street, residential road, country road, motorway, slip road, junction, roundabout, level crossing…), the number of lanes in each direction and which lane our car is in, curves and which way they turn, hills, the junction's shape and how far ahead it is, kerbs, cycle tracks, pavements, verges, islands.
ROAD MARKINGS: lane by lane from left to right: white or yellow, solid, broken, double or a solid line beside a broken one, warning lines, arrows and the way each points, stop lines, give-way triangles («shark teeth»), zebra crossings, cycle and bus lanes with their symbols, hatched areas, and where each marking starts and ends.
TRAFFIC SIGNS: every sign, one by one: its Danish code when you know it (e.g. A41, B11, C55, E55), its meaning, its exact official Danish design (shape, border colour, background colour, symbol, numbers or letters, any plate under it with its symbol or distance), which side of the road it stands on, how high and how far ahead.
TRAFFIC LIGHTS AND SIGNALS: each signal head and exactly which lamp or arrow is lit or flashing; railway signals, police officers' arm signals, lane-control signals over motorways, when present.
VEHICLES AND ROAD USERS: each car, lorry, bus, bicycle, moped, pedestrian or animal: generic type and colour, exact position (lane, side, distance), direction of travel, what it is doing, which indicators, brake lights or hazard lights are lit.
CONDITIONS: time of day, weather, road surface (dry, wet, snow, ice), visibility and light, only when they matter for the answer.
MUST NOT APPEAR: anything that would change the answer or confuse it (other signs, markings, vehicles or lights).

Everything the correct answers depend on must be clearly visible, large enough and unambiguous. Use the official Danish designs from the Danish road-sign catalogue and right-hand traffic. Keep buildings, trees and other scenery to a short neutral mention: the picture is about driving, not the surroundings. Do not describe the reference picture's artistic style or framing, do not mention the reference, and do not write a style line: the app adds its own style line after your prompt.
Answer with the prompt only.`;
// How the console's prompts end (data/art-style.json): the details paragraph, then the style line of the part (lessons:
// realistic; signs, right of way and rules: the illustration style of the road-sign pictures). Any other «Style:» line
// and an earlier details paragraph are taken out first.
const artStyle = () => JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'art-style.json'), 'utf8'));
const houseStyle = (part = 'signs') => { const a = artStyle(); return a.styles[a.use[part] || 'illustration']; };
const withHouseStyle = (text, part = 'signs') => {
  const a = artStyle(), body = String(text).replace(/(^|\s)DETAILS \(this picture[^\n]*/g, '$1').replace(/(^|\s)Style\s*:[^\n]*/gi, '$1').trim();
  return `${body}\n${a.details}\n${houseStyle(part)}`;
};

// ---------- our own questions' pictures (data/original_*.json) ----------
// The questions written new for the site (build.py puts their text in place of prove.dk's) each carry `img`, a scene
// description written with the new text. When the server starts with KIE_API_KEY set, each such question gets ONE new
// picture from that text (Sunburst, the more detailed model, so signs and markings come out right), shown at once in
// place of the original; a question is tried again (up to 3 times) only when its picture failed. Changing SEED makes
// new pictures for all of them.
const SEED = 'own-v1';
// A question whose `imgRev` is raised in its JSON gets new pictures (seed own-v1.r<rev>) with the teaching style below.
const seedOf = rev => (rev > 1 ? `${SEED}.r${rev}` : SEED);
// From imgRev 2 on: the pictures are for teaching, so every traffic detail has to be right and easy to read; that
// matters more than looking like a photograph.
const TEACH_STYLE = 'PRIORITY: this picture teaches a driving-theory question. Correct, clearly readable traffic details matter MORE than photographic realism: every sign, road marking, light, vehicle and person listed above must be exactly as described, at the described position, distance and side, with the described line types (solid or broken), arrow directions, bend directions and lit lights. Do not add any other signs, markings, vehicles or people. Right-hand traffic, as in Denmark.\nStyle: a clean, clear 3D driving-simulator render made for teaching: crisp, high-contrast road markings and signs, simple uncluttered surroundings, even daylight, sharp focus everywhere, 4:3. No logos, no watermarks, no brand names, no readable text except numbers on traffic signs, no recognisable real people.';
const styleOf = rev => (rev > 1 ? TEACH_STYLE : SEED_STYLE);
const SEED_STYLE = 'ACCURACY: this picture is used in a driving-theory test, so every sign, road marking, light, vehicle and person listed above must be clearly visible and exactly as described: their position, colour, shape, which lights are lit, solid or broken lines. Do not add any other signs, markings, vehicles or people. Right-hand traffic, as in Denmark.\nStyle: realistic, modern, high-quality 3D render, sharp details, natural light, 4:3. No logos, no watermarks, no brand names, no readable text except numbers on traffic signs, no recognisable real people.';
// After a picture is made, Claude checks it against its description; one with a wrong or missing important detail
// (a sign, a marking, which light is lit, where a vehicle or person is) is made again, up to 3 pictures in all. The
// last one stays shown either way, with Claude's findings in job.check for the admin panel.
const CHECK = `You check a picture made for a Danish driving-theory test against the scene description it was made from.
Only details the test depends on matter: traffic signs (shape, colour, symbol, number, which side of the road), road markings (solid or broken, colour, arrows and their direction, stop lines, zebra crossings), traffic lights and indicators (which lights are lit), the vehicles, cyclists, pedestrians and animals named (type, colour, position, lane, side, roughly the distance described, what they do), what the mirrors show when described, the road layout (number of lanes, which way a bend turns, hills, junctions and roughly how far ahead they are), weather, light and road surface when described, and the viewpoint (e.g. dashboard and mirrors visible). Anything listed under MUST NOT APPEAR must be absent. Be strict: a bend turning the wrong way, a solid line drawn broken, a missing or wrong sign, or a vehicle in the wrong lane is an important mismatch.
Ignore small artistic differences, the look of buildings and trees, and blurred text.
Answer with JSON only: {"ok": true|false, "problems": ["short description of each important mismatch"]}.`;
async function check(qid, job) {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  const b = await blob(job.blob);
  if (!b || !/^image\/(png|jpeg|webp)$/.test(b.mime)) return null;
  claude = claude || new Anthropic({ timeout: 120e3, maxRetries: 2 });
  const r = await claude.messages.create({
    model: CLAUDE, max_tokens: 800, system: CHECK,
    messages: [{ role: 'user', content: [
      { type: 'image', source: { type: 'base64', media_type: b.mime, data: b.data.toString('base64') } },
      { type: 'text', text: `Scene description:\n${job.prompt.split(/\n(?:ACCURACY|PRIORITY):/)[0]}` },
    ] }],
  });
  const text = r.content.filter(x => x.type === 'text').map(x => x.text).join('');
  const m = /\{[\s\S]*\}/.exec(text);
  return m ? JSON.parse(m[0]) : null;
}
async function checkSeeded(qid, job) {
  try {
    const res = await check(qid, job);
    if (!res) return;
    job.check = { ok: !!res.ok, problems: (res.problems || []).slice(0, 8).map(String), at: Date.now() }; await save();
    const item = images()[qid], mine = item.jobs.filter(j => j.seed === job.seed);
    if (!res.ok && mine.length < 3) {
      console.log('own picture', qid, 'made again:', job.check.problems.join('; '));
      await start(+qid, job.model, 'auto', job.prompt, job.seed);
    } else if (!res.ok) {
      // No try was right: show the one with the fewest problems.
      const best = mine.filter(j => j.blob && j.check).sort((a, b) => a.check.problems.length - b.check.problems.length || b.at - a.at)[0];
      if (best && item.active !== best.id) { item.active = best.id; item.v = `${best.id}.${Date.now().toString(36)}`; await save(); }
    }
  } catch (e) { console.error('own picture check', qid, e.message); }
}
const ownPrompts = () => {
  const out = {};
  for (const f of fs.readdirSync(path.join(__dirname, 'data')).filter(f => /^original_.*\.json$/.test(f)).sort()) {
    for (const [k, v] of Object.entries(JSON.parse(fs.readFileSync(path.join(__dirname, 'data', f), 'utf8')))) if (!k.startsWith('_') && v.img) out[k] = { text: v.img, rev: +v.imgRev || 1 };
  }
  return out;
};
// For one of our own questions, its scene description with the style line: a new picture made from the admin panel
// then follows the new text, not the original picture (which may show other things, e.g. another car's colour).
const ownPrompt = qid => { const t = ownPrompts()[qid]; return t ? `${t.text}\n${styleOf(t.rev)}` : ''; };
// A 2048-px picture at half size (about a quarter of the bytes); a file it cannot read is kept as it is.
function shrink(buf, mime) {
  try { const im = png.decode(buf); return im && im.w > 1200 ? { buf: png.encode(png.half(im)), mime: 'image/png' } : { buf, mime }; }
  catch (e) { console.error('picture shrink', e.message); return { buf, mime }; }
}
async function seedOwn() {
  if (!available()) return;
  for (const [qid, { text, rev }] of Object.entries(ownPrompts())) {
    if (!Q.has(+qid)) continue;
    const seed = seedOf(rev);
    const jobs = ((images()[qid] || {}).jobs || []).filter(j => j.seed === seed);
    if (jobs.some(j => j.blob || !j.done) || jobs.length >= 3) continue;   // made, being made, or given up
    await start(+qid, 'sunburst', 'auto', `${text}\n${styleOf(rev)}`, seed).catch(e => console.error('own picture', qid, e.message));
    await new Promise(r => setTimeout(r, 1500));   // a little apart, not 25 requests at once
  }
}

// ---------- pictures for the app's intro (four slides) ----------
// Made once by the same image model when the server starts with KIE_API_KEY set: a detailed 3D isometric scene per
// slide (and one for the app's «no internet» page) on a plain dark forest-green background, so the app can lay it on its green intro. Kept in store.meta.intro and served at
// /intro/<n>.png; the app falls back to its own drawings until a picture is there. Changing INTRO_SET makes new ones.
const INTRO_SET = 'v5'; // v5: on dark forest green (v4 forest green, v3 teal)
const INTRO_STYLE = 'Style: a modern, minimal 3D isometric illustration like the onboarding art of a premium mobile app: only a few simple objects, clean rounded geometric shapes, smooth matte materials with a soft clay look, soft ambient light, subtle soft shadows, no clutter, no fine texture; people are small, stylised and faceless. Palette: white, pale mint (#cfe9cf), warm coral (#e8957a) and periwinkle blue (#5b74c4), with one or two small accents of green, red or warm yellow. The background is ONE plain, flat, solid dark forest green (#14421c) with no gradient, no floor, no horizon and no frame. The group of objects is compact, centred and fills about three quarters of the image. No text, no letters, no numbers, no logos, no brand names, no watermarks.';
const INTRO_PROMPTS = [
  'A smartphone standing upright in the centre with a plain white screen showing a small rounded app tile with a speedometer symbol. Around it, joined to it by thin softly glowing white curved lines with small dots at their ends: a small rounded coral car, a simple driving licence card with a faceless photo silhouette, a red octagonal stop sign and a red-and-white triangular give-way sign on short poles.',
  'A giant closed periwinkle-blue theory book lying flat at an isometric angle, with a winding grey road with white dashes printed across its cover. Two small faceless people sit on the book: one studies on a tablet, the other holds a small clipboard with ticked boxes; a third stands beside the book looking at a phone. A small green round badge with a white check mark rests on the corner of the book.',
  'A large smartphone lying flat at an isometric angle, used as a stage. On its screen stands a small, friendly, rounded white robot with a softly glowing pale-mint face, next to a big coral speech bubble with three white placeholder lines, and a small white card showing a red-and-white triangular warning road sign; two four-pointed sparkles float above.',
  'A winding road with white dashes climbs from the lower left to the upper right like a rising path; a small rounded coral car drives up it. At the top of the road stands a small podium with a yellow trophy and a green flag; beside the road floats a simple white card with three rising periwinkle-blue bars.',
  // 5: the app's «no internet» page (bundled into the app, since it shows when the server cannot be reached).
  'No internet connection: a large rounded white Wi-Fi symbol with a small coral circle and a white diagonal slash over it, floating above a small smartphone lying at an isometric angle whose screen shows a soft grey cloud with a little white x; a thin cable with an unplugged plug lies loose beside the phone.',
];
// A new picture at half size (2048 → 1024 px, about a quarter of the bytes), with its plain background cut out
// (see-through, png.cutout), so it lies on the app's own page colour with no edge and no shade of difference; `bg` is
// the colour that was cut. A file it cannot read is kept as it is.
function shrinkIntro(buf, mime) {
  try {
    const im = png.decode(buf); if (!im) return { buf, mime };
    const small = im.w > 1200 ? png.half(im) : im, bg = png.edgeColour(small);
    return { buf: png.encode(png.cutout(small, bg)), mime: 'image/png', bg, cut: true };
  } catch (e) { console.error('intro picture shrink', e.message); return { buf, mime }; }
}
// Pictures made before shrinking or cutting existed: done once (a cut picture already has no background to cut).
async function fixIntro() {
  for (const job of Object.values(((store.meta.intro || {}).items) || {})) {
    if (!job.blob || job.cut) continue;
    const b = await store.getBlob(job.blob); if (!b) continue;
    const s = shrinkIntro(b.data, b.mime);
    if (s.cut) { await store.saveBlob(job.blob, s.mime, s.buf); cache.delete(job.blob); Object.assign(job, { bg: s.bg, cut: true, size: s.buf.length, v: Date.now().toString(36) }); await saveIntro(); }
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
      const d = await kie('POST', '/jobs/createTask', { model: TEXT_TO_IMAGE, callBackUrl: `${PUBLIC_URL}/api/kiecallback`, input: { prompt: job.prompt, aspect_ratio: '1:1', resolution: '2K' } });
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
        Object.assign(job, { state: 'done', done: true, v: Date.now().toString(36), size: s.buf.length, ...(s.bg ? { bg: s.bg } : {}), ...(s.cut ? { cut: true } : {}) });
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

// ---------- pictures for the four cards of the app's «آموزش» tab ----------
// Made once like the intro's (when the server starts with KIE_API_KEY set): one minimal, modern 3D picture per card
// (lessons, rules, road signs, right of way), 4:3 on its own soft background, as large as the card's top. Kept in
// store.meta.learnArt and served at /learn-art/<n>.png; the app shows its icon tile until a picture is there.
// Changing LEARN_SET makes new ones.
const LEARN_SET = 'v1';
const LEARN_STYLE = 'Style: a modern, minimal 3D illustration like the cards of a premium mobile app: only a few simple objects, clean rounded geometric shapes, smooth matte materials with a soft clay look, soft studio light, subtle soft shadows, no clutter, no fine texture. The objects are centred with generous empty space around them. Danish traffic signs follow their official design (shape and colours). No text, no letters, no numbers, no logos, no brand names, no watermarks, no people\'s faces.';
const LEARN_PROMPTS = [
  // 1: lessons one by one
  'Background: one plain soft pale mint (#d9efe3) colour, no gradient, no floor line. A small stack of three rounded theory books in white, mint green and periwinkle blue, the top one open with a tiny winding grey road with white dashes on its page; a small rounded coral car stands on the road; a pencil and a small green round badge with a white check mark lie beside the books.',
  // 2: rules
  'Background: one plain soft warm peach (#f6e1d3) colour, no gradient, no floor line. A balanced pair of rounded white justice scales in the centre; on one pan a tiny rounded coral car, on the other a small round speed-limit sign (white with a red ring, blank in the middle); a small rounded seat-belt buckle and a tiny traffic cone stand beside the scales.',
  // 3: road signs
  'Background: one plain soft lavender (#e3e1f5) colour, no gradient, no floor line. A small group of rounded road signs on short grey poles at slightly different heights: a white triangular warning sign with a red border, a round white sign with a red ring, a round blue sign with a white arrow, and a red octagonal stop sign (blank, no text); a short piece of grey road with a white broken line lies in front of them.',
  // 4: right of way
  'Background: one plain soft sky blue (#d8e8f6) colour, no gradient, no floor line. A small rounded crossroads seen from above at an isometric angle, grey roads with white markings and white shark-teeth triangles at one side; two small rounded cars (coral and periwinkle blue) wait at the junction while a third (mint green) drives through; a white inverted give-way triangle sign with a red border and a yellow diamond priority-road sign stand at the corners.',
];
// A set of pictures made once by the image model (`prompts`, `style`, `aspect`), kept in store.meta[metaKey] and in
// blobs `<prefix>-<set>-<n>`; a new `set` replaces the old pictures. Used by the «آموزش» cards and the profile
// pictures; each has start (on server start), poll (in the poll round), versions (for /api/config) and blob.
// `prompts`: a list (numbered 1…n, each followed by `style`, in `aspect`) or an object of key → { prompt, aspect, ref }.
// `ref`: a picture in `refDir` the model redraws (image to image), e.g. a sign's official drawing; without it, text only.
// `limit`: at most this many being made at a time (the rest start as earlier ones finish); none = all at once.
// Keyed prompts carry a revision (a hash of the prompt and its reference): when it changes, that one picture is made
// again, and the old one stays on show until the new one is ready.
// A picture that failed because the account ran out of credit (or was rate limited) does not count as a try; it is tried
// again 20 minutes later. `retry`: a mark kept with the set; changing it gives every picture not made yet new tries.
// `allow`: which pictures may be made (key → true); none = all.
// `redo` (a numbered list only): number → a mark; a picture made without that mark is made again (as a changed prompt).
function artSet({ metaKey, set, prompts, style = '', aspect = '1:1', prefix, limit = Infinity, refDir = '', retry = '', allow = null, redo = {} }) {
  const meta = () => (store.meta[metaKey] = store.meta[metaKey] && store.meta[metaKey].set === set ? store.meta[metaKey] : { set, items: {} });
  const save = () => store.saveMeta(metaKey, meta());
  const list = Array.isArray(prompts)
    ? prompts.map((p, i) => [String(i + 1), { prompt: `${p}\n${style}`, aspect, rev: redo[String(i + 1)] }])
    : Object.entries(prompts).map(([k, v]) => [k, { prompt: v.prompt, aspect: v.aspect || aspect, ref: v.ref,
      rev: require('node:crypto').createHash('sha1').update(`${v.prompt}|${v.ref || ''}|${v.aspect || aspect}`).digest('hex').slice(0, 10) }]);
  // Never started, failed with tries left, or made from an earlier version of its prompt.
  // (A keyed picture made before revisions existed is kept; a numbered one is ordered again by its `redo` mark, and
  // tried again on the next start when that failed.)
  const stale = (x, rev) => !!(rev && x && x.done && (Array.isArray(prompts) ? x.rev !== rev || (x.state === 'fail' && x.blob) : x.rev && x.rev !== rev));
  const NO_CREDIT = /credit|balance|insufficient|quota|402|429|too many/i, LATER = 20 * 60e3;
  const broke = x => !!(x && x.done && !x.blob && NO_CREDIT.test(x.error || ''));
  const due = x => broke(x) && Date.now() - x.at > LATER;
  const may = n => !allow || allow.has(n);
  const waiting = (x, rev, n) => may(n) && (!x || (!x.blob && x.done && (broke(x) ? due(x) : (x.tries || 0) < 3)) || stale(x, rev));
  let later = null;   // the timer that tries the credit failures again
  const retryLater = () => { if (!later && Object.entries(meta().items).some(([n, j]) => may(n) && broke(j))) later = setTimeout(() => { later = null; startSet().catch(() => {}); }, LATER + 5e3); };
  let starting = false;
  async function startSet() {
    if (!available() || starting) return;
    starting = true;
    try {
      const prev = store.meta[metaKey];
      if (prev && prev.set !== set) for (const j of Object.values(prev.items || {})) if (j.blob) { await store.deleteBlob(j.blob).catch(() => {}); cache.delete(j.blob); }
      const it = meta().items;
      if (retry && meta().retry !== retry) {   // a new retry mark: every picture not made yet gets its tries back
        for (const j of Object.values(it)) if (j.done && !j.blob) Object.assign(j, { tries: 0, error: '' });
        meta().retry = retry; await save();
      }
      let running = Object.values(it).filter(j => !j.done && j.taskId).length;
      for (const [n, { prompt, aspect: ar, ref, rev }] of list) {
        if (running >= limit) break;
        const x = it[n];
        if (!waiting(x, rev, n)) continue;   // done, running, or given up after 3 tries
        const again = stale(x, rev);
        const job = it[n] = { at: Date.now(), done: false, state: 'queued', tries: (again ? 0 : (x && x.tries) || 0) + (broke(x) ? 0 : 1), prompt, rev,
          ...(again ? { blob: x.blob, v: x.v, size: x.size } : {}) };   // the old picture stays until the new one is made
        try {
          const input = { prompt, aspect_ratio: ar, resolution: '2K' };
          if (ref) input.input_urls = [await upload({ mime: 'image/png', data: fs.readFileSync(path.join(refDir, ref)) }, `${prefix}-${ref}`)];
          const d = await kie('POST', '/jobs/createTask', { model: ref ? IMAGE_TO_IMAGE : TEXT_TO_IMAGE, callBackUrl: `${PUBLIC_URL}/api/kiecallback`, input });
          job.taskId = d.taskId; job.state = 'generating'; running++;
        } catch (e) {
          Object.assign(job, { state: 'fail', done: true, error: e.message }); console.error(metaKey, n, e.message);
          if (NO_CREDIT.test(e.message)) { await save(); break; }   // out of credit: the rest wait too
        }
        await save();
      }
      if (Object.values(it).some(j => !j.done && j.taskId)) schedule();
      retryLater();
    } finally { starting = false; }
  }
  // One poll round; true while some are still being made.
  async function pollSet() {
    if (!store.meta[metaKey]) return false;
    let pending = false;
    for (const [n, job] of Object.entries(meta().items)) {
      if (job.done || !job.taskId) continue;
      try {
        const d = await kie('GET', `/jobs/recordInfo?taskId=${encodeURIComponent(job.taskId)}`);
        if (d.state === 'success') {
          const url = (JSON.parse(d.resultJson || '{}').resultUrls || [])[0];
          if (!url) throw new Error('no result url');
          const r = await fetch(url); if (!r.ok) throw new Error(`download ${r.status}`);
          const sm = shrink(Buffer.from(await r.arrayBuffer()), r.headers.get('content-type') || 'image/png');
          job.blob = `${prefix}-${set}-${n}`;
          await store.saveBlob(job.blob, sm.mime, sm.buf); cache.delete(job.blob);
          Object.assign(job, { state: 'done', done: true, v: Date.now().toString(36), size: sm.buf.length });
        } else if (d.state === 'fail') Object.assign(job, { state: 'fail', done: true, error: d.failMsg || 'failed' });
        else pending = true;
        if (!job.done && Date.now() - job.at > 30 * 60e3) Object.assign(job, { state: 'fail', done: true, error: 'timeout' });
      } catch (e) { job.error = e.message; pending = true; if (Date.now() - job.at > 30 * 60e3) Object.assign(job, { state: 'fail', done: true }); }
      await save();
    }
    // With a limit, the next ones start as earlier ones finish.
    const now2 = meta().items;
    if (limit !== Infinity && list.some(([n, { rev }]) => waiting(now2[n], rev, n))) { await startSet(); pending = Object.values(now2).some(j => !j.done && j.taskId) || pending; }
    return pending;
  }
  const now = () => (store.meta[metaKey] && store.meta[metaKey].set === set ? store.meta[metaKey].items || {} : {});
  const versions = () => Object.fromEntries(Object.entries(now()).filter(([, j]) => j.blob).map(([n, j]) => [n, j.v]));
  const blobOf = async n => { const j = now()[n]; return j && j.blob ? blob(j.blob) : null; };
  // Puts picture `b` ({ mime, data }) in place of picture `n` (e.g. one made on request and chosen in the console); its
  // prompt's revision is kept, so it is not made again.
  // `prompt`: the prompt it was made from (kept with it, so the console can show it).
  async function put(n, b, prompt) {
    const it = meta().items, x = it[n] || {}, key = `${prefix}-${set}-${n}`, rev = (list.find(([k]) => k === n) || [])[1];
    await store.saveBlob(key, b.mime, b.data); cache.delete(key);
    it[n] = { ...x, at: Date.now(), done: true, state: 'done', blob: key, v: Date.now().toString(36), size: b.data.length, rev: (rev && rev.rev) || x.rev, error: '',
      ...(prompt ? { prompt } : {}) };
    delete it[n].taskId;
    await save();
  }
  // The prompt picture `n` was made from (or, not made yet, the one it would be made from).
  const promptOf = n => { const j = now()[n], l = list.find(([k]) => k === n); return (j && j.prompt) || (l && l[1].prompt) || ''; };
  return { start: startSet, poll: pollSet, versions, blob: blobOf, put, promptOf, count: list.length };
}
// Only the cards ordered again in data/art-orders.json («learn») are made.
const LEARN_REDO = learnOrders();
const LEARN = artSet({ metaKey: 'learnArt', set: LEARN_SET, prompts: LEARN_PROMPTS, style: LEARN_STYLE, aspect: '4:3', prefix: 'learn',
  redo: LEARN_REDO, allow: new Set(Object.keys(LEARN_REDO)) });
const startLearn = LEARN.start, pollLearn = LEARN.poll, learnVersions = LEARN.versions, learnBlob = LEARN.blob;
// The «آموزش» cards' pictures' background colour (from their edges), so a card can show the whole picture and fill the
// rest of its picture area with the same colour. Worked out in the background once per picture version.
const learnBg = {};
function learnColours() {
  const out = {};
  for (const [n, v] of Object.entries(learnVersions())) {
    const k = `${n}:${v}`;
    if (learnBg[k] === undefined) {
      learnBg[k] = null;
      learnBlob(n).then(b => { const im = b && png.decode(b.data); learnBg[k] = im ? png.edgeColour(im) : ''; }).catch(() => { learnBg[k] = ''; });
    }
    if (learnBg[k]) out[n] = learnBg[k];
  }
  return out;
}

// ---------- the step-by-step course's pictures («آموزش گام‌به‌گام», data/course-art.json) ----------
// Ordered by the admin with their prompts; each is made once (and again when its prompt changes).
const COURSE = artSet({ metaKey: 'courseArt', set: 'v1', prompts: JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'course-art.json'), 'utf8')), aspect: '4:3', prefix: 'course' });
const courseVersions = COURSE.versions, courseBlob = COURSE.blob;

// ---------- profile pictures to choose from in the settings ----------
// Ten round-friendly, minimal 3D icons on the app's theme (cars, signs, the licence…), each on its own soft colour,
// centred with room around it so it sits well in a circle. Served at /avatar-art/<n>.png.
const AVATAR_SET = 'v1';
const AVATAR_STYLE = 'Style: a modern, minimal 3D icon like a premium app\'s profile picture: ONE simple object, clean rounded geometric shapes, smooth matte materials with a soft clay look, soft studio light, a subtle soft shadow. The object is centred and fills about 60% of the square, with even empty space around it so it fits inside a circle. The background is one plain flat colour with no gradient, no floor and no frame. No text, no letters, no numbers, no logos, no brand names, no watermarks, no faces.';
const AVATAR_PROMPTS = [
  'Background: plain soft pale mint (#d9efe3). A small rounded coral-red car seen from the front at a slight angle.',
  'Background: plain soft lavender (#e3e1f5). A rounded dark grey steering wheel seen from the front.',
  'Background: plain soft warm peach (#f6e1d3). A rounded traffic light on a short pole with the green light glowing softly.',
  'Background: plain soft sky blue (#d8e8f6). A white triangular give-way road sign with a red border, point down, on a short grey pole.',
  'Background: plain soft butter yellow (#f6efcf). A simple pink driving licence card with a faceless round photo silhouette and a few blank lines.',
  'Background: plain soft pale teal (#d3eeee). An orange and white striped traffic cone.',
  'Background: plain soft rose (#f5dbe2). A rounded car key with a small black remote fob.',
  'Background: plain soft sage green (#dfe9d6). A rounded speedometer gauge with a white face and a red needle.',
  'Background: plain soft periwinkle (#dde2f7). A small rounded mint-green car seen from the side.',
  'Background: plain soft sand (#efe5d8). A round red-ringed speed-limit road sign with a blank white middle on a short grey pole.',
];
// ---------- pictures for the teaching pages «علائم رانندگی» and «آموزش حق تقدم» ----------
// One educational picture per sign, marking, signal and right-of-way situation, and one per group for its card
// (data/guide-art.json, written by data/guide-src/build.py with the prompts beside the texts); a sign with an official
// drawing in data/guide-ref is redrawn from it. Made a few at a time; served at /guide-art/<key>.png.
const GUIDE_SET = 'v1';
const GUIDE = artSet({ metaKey: 'guideArt', set: GUIDE_SET, prompts: JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'guide-art.json'), 'utf8')),
  prefix: 'guide', limit: 8, refDir: path.join(__dirname, 'data', 'guide-ref'), retry: 'r1', allow: ordered() });
const guideVersions = GUIDE.versions, guideBlob = GUIDE.blob;

const AVATAR = artSet({ metaKey: 'avatarArt', set: AVATAR_SET, prompts: AVATAR_PROMPTS, style: AVATAR_STYLE, aspect: '1:1', prefix: 'avatar-art' });
const avatarVersions = AVATAR.versions, avatarBlob = AVATAR.blob, avatarCount = AVATAR.count;

// A picture of the teaching pages, as it was ordered: { prompt, aspect, ref } (data/guide-art.json).
const GUIDE_PROMPTS = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'guide-art.json'), 'utf8'));
const guidePrompt = key => GUIDE_PROMPTS[key] || null;

// ---------- single pictures made on request (the console's «ساخت تصویر» for a sign or a right-of-way item) ----------
// store.meta.oneOff = { [id]: { at, prompt, state, done, taskId, blob, error } }; blob `oneoff-<id>`. `ref`: a picture
// file the model redraws (image to image), e.g. a sign's official drawing.
const oneOffs = () => (store.meta.oneOff = store.meta.oneOff || {});
const saveOneOff = () => store.saveMeta('oneOff', oneOffs());
// `target`: where the picture goes once made: 'guide:<key>' puts it in place of that teaching picture (the earlier one is
// gone) and the job is cleared.
// `images` ([{ mime, data }]) are sent instead of `ref`; with `regions` and `base` (the picture being corrected), only
// those parts of the result are put on `base` (kept as blob `oneoff-<id>-base` meanwhile), as in editRegions.
// `record`: the prompt kept with the picture when it differs from what the model is sent (an edit instruction).
async function startOneOff(id, { prompt, aspect = '4:3', ref = '', target = '', images: inputs = null, regions = null, base = null, record = '' }) {
  if (!available()) throw Object.assign(new Error('KIE_API_KEY تنظیم نشده است.'), { status: 503 });
  const old = oneOffs()[id];
  if (old && !old.done) throw Object.assign(new Error('یک تصویر در حال ساخت است؛ صبر کنید تا تمام شود.'), { status: 409 });
  if (old && old.blob) { await store.deleteBlob(old.blob).catch(() => {}); cache.delete(old.blob); }
  const job = oneOffs()[id] = { at: Date.now(), prompt: record || prompt, state: 'queued', done: false, ...(target ? { target } : {}) };
  try {
    const input = { prompt, aspect_ratio: aspect, resolution: '2K' };
    if (inputs) input.input_urls = await Promise.all(inputs.map((b, i) => upload(b, `oneoff-${id}-${i}`)));
    else if (ref) input.input_urls = [await upload({ mime: 'image/png', data: fs.readFileSync(ref) }, `oneoff-${id}`)];
    if (regions && base) { await store.saveBlob(`oneoff-${id}-base`, base.mime, base.data); Object.assign(job, { regions, base: `oneoff-${id}-base` }); }
    const d = await kie('POST', '/jobs/createTask', { model: input.input_urls ? IMAGE_TO_IMAGE : TEXT_TO_IMAGE, callBackUrl: `${PUBLIC_URL}/api/kiecallback`, input });
    Object.assign(job, { taskId: d.taskId, state: 'generating' });
    schedule();
  } catch (e) { Object.assign(job, { state: 'fail', done: true, error: e.message }); }
  await saveOneOff();
  return job;
}
async function pollOneOff() {
  let pending = false;
  for (const [id, job] of Object.entries(oneOffs())) {
    if (job.done || !job.taskId) continue;
    try {
      const d = await kie('GET', `/jobs/recordInfo?taskId=${encodeURIComponent(job.taskId)}`);
      if (d.state === 'success') {
        const url = (JSON.parse(d.resultJson || '{}').resultUrls || [])[0];
        if (!url) throw new Error('no result url');
        const r = await fetch(url); if (!r.ok) throw new Error(`download ${r.status}`);
        let sm = shrink(Buffer.from(await r.arrayBuffer()), r.headers.get('content-type') || 'image/png');
        if (job.regions && job.base) {
          const bb = await store.getBlob(job.base), c = bb && composited(bb, { mime: sm.mime, data: sm.buf }, job.regions);
          await store.deleteBlob(job.base).catch(() => {}); delete job.base;
          if (!c) throw Object.assign(new Error('ترکیب بخش‌های اصلاح‌شده با تصویر اصلی ممکن نشد.'), { final: true });
          sm = { buf: c.data, mime: c.mime }; job.composited = true;
        }
        job.blob = `oneoff-${id}`;
        await store.saveBlob(job.blob, sm.mime, sm.buf); cache.delete(job.blob);
        Object.assign(job, { state: 'done', done: true, v: Date.now().toString(36) });
        if (job.target && job.target.startsWith('guide:')) {
          await GUIDE.put(job.target.slice(6), { mime: sm.mime, data: sm.buf }, job.prompt);
          await store.deleteBlob(job.blob).catch(() => {}); cache.delete(job.blob);
          delete oneOffs()[id];
        }
      } else if (d.state === 'fail') Object.assign(job, { state: 'fail', done: true, error: d.failMsg || 'failed' });
      else pending = true;
      if (!job.done && Date.now() - job.at > 30 * 60e3) Object.assign(job, { state: 'fail', done: true, error: 'timeout' });
      if (job.done && job.base) { await store.deleteBlob(job.base).catch(() => {}); delete job.base; }
    } catch (e) { job.error = e.message; if (e.final) Object.assign(job, { state: 'fail', done: true }); else { pending = true; if (Date.now() - job.at > 30 * 60e3) Object.assign(job, { state: 'fail', done: true }); } }
    await saveOneOff();
  }
  return pending;
}
const oneOff = id => oneOffs()[id] || null;
const oneOffBlob = async id => { const j = oneOffs()[id]; return j && j.blob ? blob(j.blob) : null; };
async function dropOneOff(id) {
  const j = oneOffs()[id];
  if (!j) return;
  if (j.blob) { await store.deleteBlob(j.blob).catch(() => {}); cache.delete(j.blob); }
  delete oneOffs()[id]; await saveOneOff();
}

// The prompt a question's made picture came from: the one shown, else the newest made one ('' when none was made).
function questionPrompt(qid) {
  const item = images()[+qid];
  if (!item) return '';
  const made = item.jobs.filter(j => j.blob).sort((a, b) => b.at - a.at);
  const j = made.find(x => x.id === item.active) || made[0];
  return (j && j.prompt) || '';
}
// A short text from Claude (e.g. a picture's prompt written for the console), with an optional picture to look at.
async function writeText(system, text, image, maxTokens = 1500) {
  if (!process.env.ANTHROPIC_API_KEY) throw Object.assign(new Error('ANTHROPIC_API_KEY تنظیم نشده است.'), { status: 503 });
  claude = claude || new Anthropic({ timeout: 120e3, maxRetries: 2 });
  // `image`: one { mime, data } or a list of them (e.g. a marked picture and a close-up).
  const images = (Array.isArray(image) ? image : image ? [image] : []).filter(Boolean);
  const content = [...images.map(i => ({ type: 'image', source: { type: 'base64', media_type: i.mime, data: i.data.toString('base64') } })), { type: 'text', text }];
  const r = await claude.messages.create({ model: PROMPT_MODEL, max_tokens: maxTokens, system, messages: [{ role: 'user', content }] });
  const out = r.content.filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
  if (!out) throw new Error('empty answer');
  return out;
}

module.exports = { edit, remove, draft, firstQuestion, init, start, poll, setActive, activeBlob, jobBlob, versions, list, available, introVersions, introColours, introBlob, learnVersions, learnBlob, learnColours, courseVersions, courseBlob, avatarVersions, avatarBlob, avatarCount, guideVersions, guideBlob,
  guidePrompt, guidePut: GUIDE.put, houseStyle, withHouseStyle, startOneOff, oneOff, oneOffBlob, dropOneOff, writeText, models,
  questionPrompt, guidePromptNow: GUIDE.promptOf, editRegions, regionPrompt };
