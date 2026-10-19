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
// A picture task for the image model, in that model's own form. `input`: { prompt, aspect_ratio, resolution, input_urls? }
// (input_urls: the pictures it redraws from, none for text to image). GPT Image and the like are two models (…-text-to-
// image / …-image-to-image) taking input_urls; Google's Nano Banana is one model taking image_input and an output format.
function imageTask(input, model = IMAGE_MODEL) {
  const m = model.replace(/-(text|image)-to-image$/, ''), urls = input.input_urls && input.input_urls.length ? input.input_urls : null;
  const body = /^nano-banana/.test(m)
    ? { model: m, input: { prompt: input.prompt, image_input: urls || [], aspect_ratio: input.aspect_ratio, resolution: input.resolution, output_format: 'png' } }
    : { model: `${m}-${urls ? 'image' : 'text'}-to-image`, input };
  return kie('POST', '/jobs/createTask', { ...body, callBackUrl: `${PUBLIC_URL}/api/kiecallback` });
}
const PROMPT_MODEL = (process.env.IMAGE_PROMPT_MODEL || '').trim() || 'claude-opus-5-5';
const models = () => ({ prompt: PROMPT_MODEL, image: IMAGE_MODEL });
const UPLOAD = process.env.KIE_UPLOAD_BASE || 'https://kieai.redpandaai.co';
const CLAUDE = process.env.LESSON_AI_MODEL || 'claude-opus-5-5';
const PUBLIC_URL = (process.env.PUBLIC_URL || 'https://teori.bitlane.app').replace(/\/$/, '');

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
  // Only what is asked for is made (the image model's credit is limited): the intro's set when INTRO_SET changes, the guide
  // pictures ordered in data/art-orders.json, the header pictures; the «آموزش» cards, profile pictures and the questions'
  // own pictures keep what was made.
  fixIntro().then(() => startIntro()).catch(e => console.error('intro pictures', e.message))
    .then(() => GUIDE.start()).catch(e => console.error('guide pictures', e.message))
    .then(() => LEARN.start()).catch(e => console.error('learn pictures', e.message))
    .then(() => COURSE.start()).catch(e => console.error('course pictures', e.message))
    .then(() => NEWQ.start()).catch(e => console.error('new test pictures', e.message))
    .then(() => adoptHomeTrial()).catch(e => console.error('home trial', e.message))
    .then(() => HERO.start()).catch(e => console.error('header pictures', e.message))
    .then(() => HERO_TRY.start()).catch(e => console.error('trial pictures', e.message))
    .then(() => LOGIN.start()).catch(e => console.error('sign-in pictures', e.message))
    .then(() => STORE.start()).catch(e => console.error('store pictures', e.message));
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
    const d = await imageTask({ prompt: job.prompt, aspect_ratio: '4:3', resolution: '2K' });
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
  if (await NEWQ.poll().catch(() => true)) pending = true;
  if (await AVATAR.poll().catch(() => true)) pending = true;
  if (await HERO.poll().catch(() => true)) pending = true;
  if (await HERO_TRY.poll().catch(() => true)) pending = true;
  if (await LOGIN.poll().catch(() => true)) pending = true;
  if (await STORE.poll().catch(() => true)) pending = true;
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
    const d = await imageTask({ prompt, input_urls: [url], aspect_ratio: '4:3', resolution: '2K' });
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
    const d = await imageTask({ prompt: regionPrompt(instruction), input_urls: urls, aspect_ratio: '4:3', resolution: '2K' });
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
// A large picture kept sharp: at most `max` px on its longer side (averaged down, never halved past it) and stored as a
// good JPEG (a quarter of a PNG's bytes, no visible loss in a soft 3D picture). A file it cannot read is kept as it is.
// The size a PNG or JPEG says it is, read from its header without decoding it (null when unknown).
function imageSize(buf) {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  if (buf[0] === 0xff && buf[1] === 0xd8) for (let o = 2; o + 9 < buf.length;) {
    if (buf[o] !== 0xff) return null;
    const m = buf[o + 1], len = buf.readUInt16BE(o + 2);
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { h: buf.readUInt16BE(o + 5), w: buf.readUInt16BE(o + 7) };
    o += 2 + len;
  }
  return null;
}
// Background clean-up for the model's pictures: the plain background (near its edge colour) is smoothed with an
// edge-preserving (bilateral) filter at 1/8 scale, so its blotchy noise goes but hill shapes and objects stay; a faint
// dither keeps the smooth dark gradients from banding.
function cleanBackground(im, bg) {
  const { w, h, ch, px } = im, S = 8, W = Math.ceil(w / S), H = Math.ceil(h / S);
  const bgc = [parseInt(bg.slice(1, 3), 16), parseInt(bg.slice(3, 5), 16), parseInt(bg.slice(5, 7), 16)];
  const near = i => Math.hypot(px[i] - bgc[0], px[i + 1] - bgc[1], px[i + 2] - bgc[2]);
  const small = new Float32Array(W * H * 3), valid = new Float32Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {   // box-average down, of background-like pixels only
    let r = 0, g = 0, b = 0, n = 0;
    for (let yy = y * S; yy < Math.min(h, y * S + S); yy++) for (let xx = x * S; xx < Math.min(w, x * S + S); xx++) { const i = (yy * w + xx) * ch; if (near(i) > 30) continue; r += px[i]; g += px[i + 1]; b += px[i + 2]; n++; }
    const o = (y * W + x) * 3; valid[y * W + x] = n / (S * S); if (n) { small[o] = r / n; small[o + 1] = g / n; small[o + 2] = b / n; }
  }
  const R = 12, sr2 = 2 * 7 * 7, ss2 = 2 * 6.5 * 6.5, out = new Float32Array(W * H * 3);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {   // bilateral at 1/8 scale (≈ 48 px reach at full size)
    const o = (y * W + x) * 3; let a0 = 0, a1 = 0, a2 = 0, ws = 0;
    if (!valid[y * W + x]) continue;
    for (let dy = -R; dy <= R; dy++) { const yy = y + dy; if (yy < 0 || yy >= H) continue;
      for (let dx = -R; dx <= R; dx++) { const xx = x + dx; if (xx < 0 || xx >= W) continue;
        const q = (yy * W + xx) * 3, d0 = small[q] - small[o], d1 = small[q + 1] - small[o + 1], d2 = small[q + 2] - small[o + 2];
        if (!valid[yy * W + xx]) continue;
        const wt = valid[yy * W + xx] * Math.exp(-(dx * dx + dy * dy) / ss2 - (d0 * d0 + d1 * d1 + d2 * d2) / sr2);
        a0 += small[q] * wt; a1 += small[q + 1] * wt; a2 += small[q + 2] * wt; ws += wt; } }
    if (ws) { out[o] = a0 / ws; out[o + 1] = a1 / ws; out[o + 2] = a2 / ws; }
  }
  const res = Buffer.from(px);
  let seed = 12345; const rnd = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * ch, d = near(i);
    const t = d <= 16 ? 1 : d >= 30 ? 0 : (30 - d) / 14, k = t * t * (3 - 2 * t);   // how background-like
    if (!k) continue;
    // bilinear sample of the smoothed small picture
    const fx = Math.min(W - 1, Math.max(0, (x + 0.5) / S - 0.5)), fy = Math.min(H - 1, Math.max(0, (y + 0.5) / S - 0.5));
    const x0 = Math.floor(fx), y0 = Math.floor(fy), x1 = Math.min(W - 1, x0 + 1), y1 = Math.min(H - 1, y0 + 1), tx = fx - x0, ty = fy - y0;
    // the smooth value's own local edge: where the small picture changes fast (a hill's edge), keep the original pixel
    const cs = [y0 * W + x0, y0 * W + x1, y1 * W + x0, y1 * W + x1], ws4 = [(1 - tx) * (1 - ty), tx * (1 - ty), (1 - tx) * ty, tx * ty];
    let wsum = 0; const v = [0, 0, 0];
    for (let q = 0; q < 4; q++) { const wq = ws4[q] * (valid[cs[q]] ? 1 : 0); wsum += wq; for (let c = 0; c < 3; c++) v[c] += out[cs[q] * 3 + c] * wq; }
    if (!wsum) continue;
    for (let c = 0; c < 3; c++) v[c] /= wsum;
    // only where the smooth value is close to the pixel itself: an edge (a hill's outline, an object's rim) keeps its pixel
    const dv = Math.hypot(v[0] - px[i], v[1] - px[i + 1], v[2] - px[i + 2]), e = dv <= 5 ? 1 : dv >= 10 ? 0 : (10 - dv) / 5;
    const kk = k * e * e * (3 - 2 * e); if (!kk) continue;
    const n = rnd() - 0.5 + rnd() - 0.5;   // faint triangular dither (±1 level)
    for (let c = 0; c < 3; c++) res[i + c] = Math.max(0, Math.min(255, Math.round(px[i + c] * (1 - kk) + (v[c] + n) * kk)));
  }
  return { ...im, px: res };
}
// Gentle unsharp mask on the objects (not the plain background): a 2-pass box blur (≈ Gaussian, r ≈ 1.5 px) and the
// difference added back where it is above a small threshold, so edges get crisper but flat clay and noise do not.
function sharpenObjects(im, bg, amount = 0.55, thr = 3) {
  const { w, h, ch, px } = im, bgc = [parseInt(bg.slice(1, 3), 16), parseInt(bg.slice(3, 5), 16), parseInt(bg.slice(5, 7), 16)];
  const blur = new Float32Array(w * h * 3), tmp = new Float32Array(w * h * 3);
  const pass = (src, dst, get) => {
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) for (let c = 0; c < 3; c++) {   // horizontal 3-tap
      const a = get(y, Math.max(0, x - 1), c), b = get(y, x, c), d = get(y, Math.min(w - 1, x + 1), c); tmp[(y * w + x) * 3 + c] = (a + b + d) / 3; }
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) for (let c = 0; c < 3; c++) {   // vertical 3-tap
      const a = tmp[(Math.max(0, y - 1) * w + x) * 3 + c], b = tmp[(y * w + x) * 3 + c], d = tmp[(Math.min(h - 1, y + 1) * w + x) * 3 + c]; dst[(y * w + x) * 3 + c] = (a + b + d) / 3; }
  };
  pass(null, blur, (y, x, c) => px[(y * w + x) * ch + c]);
  pass(null, blur, (y, x, c) => blur[(y * w + x) * 3 + c]);
  const res = Buffer.from(px);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * ch, d = Math.hypot(px[i] - bgc[0], px[i + 1] - bgc[1], px[i + 2] - bgc[2]);
    const t = d <= 16 ? 0 : d >= 30 ? 1 : (d - 16) / 14;   // objects only
    if (!t) continue;
    for (let c = 0; c < 3; c++) { const diff = px[i + c] - blur[(y * w + x) * 3 + c]; if (Math.abs(diff) < thr) continue;
      res[i + c] = Math.max(0, Math.min(255, Math.round(px[i + c] + amount * t * diff))); }
  }
  return { ...im, px: res };
}
const MAX_DECODE = 40e6;   // pixels: a larger picture is not decoded here (its RGBA copy alone would be 160 MB+)
// `clean`: for the full-scene header and intro pictures: the plain background smoothed (cleanBackground) and the objects'
// edges made crisper (sharpenObjects); 'edges' for the second only (a picture already smoothed). Stored at quality 95.
function sharp(buf, mime, max = 2560, clean = false) {
  try {
    const dim = imageSize(buf);
    if (dim && dim.w * dim.h > MAX_DECODE) return { buf: null, mime, src: `too large ${dim.w}x${dim.h}` };
    let im = png.decode(buf);
    if (!im && buf[0] === 0xff && buf[1] === 0xd8) {   // a JPEG (some models answer with one whatever is asked)
      const j = require('jpeg-js').decode(buf, { useTArray: true, maxMemoryUsageInMB: 1024, maxResolutionInMP: 100 });
      im = { w: j.width, h: j.height, ch: 4, px: Buffer.from(j.data.buffer, j.data.byteOffset, j.data.length) };
    }
    if (!im) return { buf, mime, src: `unreadable ${mime} ${buf.length}B` };
    const k = Math.min(1, max / Math.max(im.w, im.h)); let out = k < 1 ? boxResize(im, Math.round(im.w * k), Math.round(im.h * k)) : im;
    if (clean) { const bgc = png.edgeColour(out); if (clean !== 'edges') out = cleanBackground(out, bgc); out = sharpenObjects(out, bgc); }
    const rgba = Buffer.alloc(out.w * out.h * 4);
    for (let i = 0, j = 0; i < out.w * out.h; i++, j += out.ch) { rgba[i * 4] = out.px[j]; rgba[i * 4 + 1] = out.px[j + (out.ch > 2 ? 1 : 0)]; rgba[i * 4 + 2] = out.px[j + (out.ch > 2 ? 2 : 0)]; rgba[i * 4 + 3] = 255; }
    return { buf: require('jpeg-js').encode({ data: rgba, width: out.w, height: out.h }, clean ? 95 : 88).data, mime: 'image/jpeg', bg: png.edgeColour(out), src: `${im.w}x${im.h}`, out: `${out.w}x${out.h}` };
  } catch (e) { console.error('picture sharpen', e.message); return { buf, mime }; }
}
// Downscaling by averaging every source pixel under each new one (no aliasing, unlike a plain bilinear resize).
function boxResize(im, w, h) {
  const { ch } = im, out = Buffer.alloc(w * h * ch), sx = im.w / w, sy = im.h / h, acc = new Float64Array(ch);
  for (let y = 0; y < h; y++) {
    const y0 = Math.floor(y * sy), y1 = Math.max(y0 + 1, Math.floor((y + 1) * sy));
    for (let x = 0; x < w; x++) {
      const x0 = Math.floor(x * sx), x1 = Math.max(x0 + 1, Math.floor((x + 1) * sx)); acc.fill(0);
      for (let yy = y0; yy < y1; yy++) for (let xx = x0; xx < x1; xx++) { const i = (yy * im.w + xx) * ch; for (let c = 0; c < ch; c++) acc[c] += im.px[i + c]; }
      const n = (y1 - y0) * (x1 - x0), o = (y * w + x) * ch; for (let c = 0; c < ch; c++) out[o + c] = Math.round(acc[c] / n);
    }
  }
  return { w, h, ch, px: out };
}
// Sharpening a made picture with a dedicated upscaler (Topaz, 2×): the drawing stays exactly as it is, only finer detail
// and crisp edges are added, so it holds up when zoomed. The result is kept at up to ENHANCED_MAX px (sharp()).
// (Topaz on kie.ai answered «internal error» for most pictures and the size unchanged for the rest; Recraft's crisp
// upscale is tried instead.) A mark starting «tz» uses Topaz, any other Recraft.
const ENHANCED_MAX = 3840, FULL_MAX = 3600;   // FULL_MAX: a new full-scene picture kept at the model's own size (≈3300 px)
async function enhanceTask(b, name, mark = '') {
  const url = await upload({ mime: b.mime, data: b.data }, `${name}.${b.mime === 'image/jpeg' ? 'jpg' : 'png'}`);
  const body = /^tz/.test(mark) ? { model: 'topaz/image-upscale', input: { image_url: url, upscale_factor: '2' } } : { model: 'recraft/crisp-upscale', input: { image: url } };
  const d = await kie('POST', '/jobs/createTask', { ...body, callBackUrl: `${PUBLIC_URL}/api/kiecallback` });
  return d.taskId;
}
// A sharpening that failed: the picture stays as it was (done, still on show), tried again on a later start.
const enhanceFailed = (job, error) => Object.assign(job, { state: 'done', done: true, stage: null, enh: null, error });
// Asking the image model to redraw a picture as it is, only sharper and at full size (for pictures kept small earlier).
const UPSCALE_PROMPT = 'Redraw this exact picture at high resolution, crisp and detailed. Keep everything exactly as it is: the same objects, shapes, sizes, positions, angles, colours, materials, lighting, background and composition; nothing added, removed, moved or restyled. Only make it sharper, with clean edges and fine smooth detail. No text, no letters, no numbers, no logos, no watermarks.';
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
// Made once by the same image model when the server starts with KIE_API_KEY set: a 3D scene per slide (and one for the
// app's «no internet» page) in the sign-in picture's style, on a plain dark forest-green background (cut out), so the
// app can lay it on its green intro. Kept in store.meta.intro and served at
// /intro/<n>.png; the app falls back to its own drawings until a picture is there. Changing INTRO_SET makes new ones.
const INTRO_SET = 'v8'; // v8: each slide its own scene (v7 full scenes all on the same road, v6 cut-out islands, v5 on dark forest green)
// Each slide is drawn from the sign-in page's dark picture (image to image) for its look only, so all of them share
// its style but each shows what its slide says; the picture fills the slide's header from edge to edge and fades into
// the page below it, so its background is not cut out.
const INTRO_REF = 'sign-in-dark.png';   // in data/hero-ref
const INTRO_CUT = false;
const INTRO_CLEAN = 'cl2';   // the mark of the pictures whose background was smoothed (startIntro)
const INTRO_UP = 'k4';   // the mark of the pictures redrawn sharper at 4K (startIntro)
const INTRO_ENH = '';     // the mark of the pictures sharpened by enhanceTask (startIntro)
const INTRO_STYLE = 'Take ONLY the look from the reference picture: its soft 3D clay style, rounded shapes, smooth matte pastel materials, soft light and soft shadows, colours (white, coral, periwinkle blue, soft greens, warm yellow) and its dark forest green background with soft, slightly lighter dark green rolling hills low in the distance. Do NOT copy its road, car, trees, flag or card: draw only the scene described here, as its own composition. The picture is one full scene that fills the frame from edge to edge, no sky, no frame, no vignette. The main objects stand in the middle of the picture, between about 15% and 70% of its height and within its middle 70% of the width (its sides may be cut off on a narrow screen). The top tenth is calm, plain dark green, and the bottom quarter is one flat, even dark forest green (#14421c) with nothing in it, because the picture fades into the page there. No text, no letters, no numbers, no logos, no brand names, no watermarks.';
const INTRO_PROMPTS = [
  // 1: «آزمون تئوری دانمارک، در جیب شما» — every theory question with its picture, in Danish or English with a Persian
  // translation, and short lessons
  'The whole question bank in your pocket: a large white smartphone standing upright in the centre, its screen showing a question card with a small picture of a road crossing and three blank rounded answer rows; floating around the phone, a fan of many small question cards, each with a tiny traffic-sign picture (a red-and-white triangle, a round speed-limit sign blank in the middle, a blue round arrow sign, a red octagon), and two small rounded speech-bubble cards side by side, one with a small Danish flag and one with a small British flag, joined by a curved double arrow (translation); a small open periwinkle-blue book with a bookmark lies at the phone\'s foot.',
  // 2: «آزمون، درست مثل روز امتحان» — 25 picture questions with a timer and the real pass mark
  'Exam day: a small rounded white school desk with a chair seen at an isometric angle; on the desk a white answer sheet with a neat grid of twenty-five small round answer boxes, most ticked in green, a yellow pencil beside it; above the desk floats a big round white stopwatch with a coral button and its hand near the top, and next to it a large green rosette ribbon badge with a white check mark (passed).',
  // 3: «هوش مصنوعی، همراه شما» — a simple explanation for every question, why the answer was right or wrong
  'A friendly AI teacher: a small, rounded white robot with a softly glowing pale-mint face stands beside a large floating white board card; on the card two small answer rows, one with a coral cross and one with a green check mark; the robot points at it, a big coral speech bubble with three white placeholder lines floats above the robot, a glowing warm-yellow light bulb above the card and two small four-pointed sparkles around.',
  // 4: «پیشرفت‌تان را ببینید» — the progress chart, the chance of passing and practice on the weak topics
  'Seeing your progress: a large floating white chart card with five rising periwinkle-blue bars and a coral arrow climbing over them; beside it a big round ring gauge mostly filled in green (the chance of passing); in front, a round target board in white, coral and green with a small dart in the bullseye (practising the weak topics), and a small golden trophy on a little podium.',
  // 5: the app's «no internet» page (bundled into the app, since it shows when the server cannot be reached).
  'No internet connection: a large rounded white Wi-Fi symbol with a small coral circle and a white diagonal slash over it, floating above a small smartphone lying flat whose screen shows a soft grey cloud; a thin cable with an unplugged plug lies loose beside the phone.',
];
// A new picture at half size (2048 → 1024 px, about a quarter of the bytes), with its plain background cut out
// (see-through, png.cutout), so it lies on the app's own page colour with no edge and no shade of difference; `bg` is
// the colour that was cut. A file it cannot read is kept as it is.
function shrinkIntro(buf, mime) {
  try {
    const im = png.decode(buf); if (!im) return { buf, mime };
    if (!INTRO_CUT) return sharp(buf, mime, FULL_MAX, true);   // a full scene: kept large and sharp, its background smoothed
    const small = im.w > 1200 ? png.half(im) : im, bg = png.edgeColour(small);
    return { buf: png.encode(png.cutout(small, bg)), mime: 'image/png', bg, cut: true };
  } catch (e) { console.error('intro picture shrink', e.message); return { buf, mime }; }
}
// Pictures made before shrinking or cutting existed: done once (a cut picture already has no background to cut).
async function fixIntro() {
  if (!INTRO_CUT) return;
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
  let refUrl = null;   // the style picture, uploaded once for all the slides
  // Pictures made before they were kept large: redrawn sharper from themselves at 4K (the same drawing).
  for (let n = 1; n <= INTRO_PROMPTS.length; n++) {
    const x = it[n];
    if (!x || !x.done || !x.blob || x.up === INTRO_UP || (x.upTries || 0) >= 3) continue;
    const job = it[n] = { ...x, at: Date.now(), done: false, state: 'queued', up: INTRO_UP, upTries: (x.upTries || 0) + 1, error: '' };
    try {
      const own = await blob(x.blob);
      const d = await imageTask({ prompt: UPSCALE_PROMPT, input_urls: [await upload({ mime: own.mime, data: own.data }, `intro-${INTRO_SET}-${n}-up.${own.mime === 'image/jpeg' ? 'jpg' : 'png'}`)], aspect_ratio: '1:1', resolution: '4K' });
      job.taskId = d.taskId; job.state = 'generating';
    } catch (e) { Object.assign(job, { state: 'fail', done: true, error: e.message, up: x.up }); console.error('intro picture', n, 'upscale', e.message); }
    await saveIntro();
  }
  // Made pictures' plain backgrounds smoothed, once (no new drawing, no cost).
  for (let n = 1; n <= INTRO_PROMPTS.length; n++) {
    const x = it[n];
    if (!x || !x.done || !x.blob || x.clean === INTRO_CLEAN) continue;
    const b = await blob(x.blob); if (!b) continue;
    const r = sharp(b.data, b.mime, FULL_MAX, x.clean === 'cl1' ? 'edges' : true);
    if (r.buf) { await store.saveBlob(x.blob, r.mime, r.buf); cache.delete(x.blob); Object.assign(x, { v: Date.now().toString(36), size: r.buf.length }); }
    x.clean = INTRO_CLEAN; await saveIntro(); await new Promise(res => setImmediate(res));
  }
  // Made pictures sharpened (the same drawing, finer detail; kept at up to 3840 px).
  for (let n = 1; n <= INTRO_PROMPTS.length; n++) {
    const x = it[n];
    if (!INTRO_ENH || !x || !x.done || !x.blob || x.up !== INTRO_UP || x.enh === INTRO_ENH || (x.enhTries || 0) >= 3) continue;
    const job = it[n] = { ...x, at: Date.now(), done: false, state: 'enhancing', stage: 'enhance', enh: INTRO_ENH, enhTries: (x.enhTries || 0) + 1, error: '' };
    try { job.taskId = await enhanceTask(await blob(x.blob), `intro-${INTRO_SET}-${n}-enh`, INTRO_ENH); }
    catch (e) { enhanceFailed(job, e.message); console.error('intro picture', n, 'enhance', e.message); }
    await saveIntro();
  }
  for (let n = 1; n <= INTRO_PROMPTS.length; n++) {
    const x = it[n];
    if (x && (x.blob || !x.done || (x.tries || 0) >= 3)) continue;   // done, running, or given up after 3 tries
    const job = it[n] = { at: Date.now(), done: false, state: 'queued', tries: ((x && x.tries) || 0) + 1, prompt: `${INTRO_PROMPTS[n - 1]}
${INTRO_STYLE}` };
    try {
      refUrl = refUrl || await upload({ mime: 'image/png', data: fs.readFileSync(path.join(__dirname, 'data', 'hero-ref', INTRO_REF)) }, `intro-${INTRO_SET}-ref.png`);
      const d = await imageTask({ prompt: job.prompt, input_urls: [refUrl], aspect_ratio: '1:1', resolution: '4K' });
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
    if (job.stage === 'enhance' && !INTRO_ENH) { enhanceFailed(job, 'sharpening switched off'); await saveIntro(); continue; }
    try {
      const d = await kie('GET', `/jobs/recordInfo?taskId=${encodeURIComponent(job.taskId)}`);
      if (d.state === 'success') {
        const url = (JSON.parse(d.resultJson || '{}').resultUrls || [])[0];
        if (!url) throw new Error('no result url');
        const r = await fetch(url); if (!r.ok) throw new Error(`download ${r.status}`);
        const raw = Buffer.from(await r.arrayBuffer()), rawMime = r.headers.get('content-type') || 'image/png';
        const s = job.stage === 'enhance' ? sharp(raw, rawMime, ENHANCED_MAX) : shrinkIntro(raw, rawMime);
        if (!s.buf) throw Object.assign(new Error(s.src || 'unreadable picture'), { final: true });
        job.blob = `intro-${INTRO_SET}-${n}`;
        await store.saveBlob(job.blob, s.mime, s.buf); cache.delete(job.blob);
        Object.assign(job, { state: 'done', done: true, stage: null, clean: INTRO_CLEAN, v: Date.now().toString(36), size: s.buf.length, ...(s.bg ? { bg: s.bg } : {}), ...(s.cut ? { cut: true } : {}) });
      } else if (d.state === 'fail' && job.stage === 'enhance') enhanceFailed(job, d.failMsg || 'failed');
      else if (d.state === 'fail') Object.assign(job, { state: 'fail', done: true, error: d.failMsg || 'failed' }, job.blob && job.upTries ? { up: null } : {});
      else pending = true;
      if (!job.done && job.stage === 'enhance' && Date.now() - job.at > 30 * 60e3) enhanceFailed(job, 'timeout');
      if (!job.done && Date.now() - job.at > 30 * 60e3) Object.assign(job, { state: 'fail', done: true, error: 'timeout' });
    } catch (e) { if (job.stage === 'enhance' && e.final) enhanceFailed(job, e.message); else { job.error = e.message; pending = true; if (Date.now() - job.at > 30 * 60e3) Object.assign(job, { state: 'fail', done: true }); } }
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

// ---------- pictures for the five cards of the app's «آموزش» tab ----------
// Made once like the intro's (when the server starts with KIE_API_KEY set): one minimal, modern 3D picture per card
// (lessons, rules, road signs, right of way, the test's glossary), 4:3 on its own soft background, as large as the card's top. Kept in
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
  // 5: the test's glossary (the Danish words of the theory test with their meaning; Mojtaba 2026-10-19)
  'Background: one plain soft butter yellow (#f5ebcf) colour, no gradient, no floor line. A small rounded dictionary book standing half open in white and butter yellow, its pages blank with a few soft grey lines; two rounded speech bubbles rise from it, one coral and one periwinkle blue, each with three small white dots instead of words; a tiny rounded Danish flag on a short stick (red with a white Nordic cross) leans against the book, and a small rounded coral car stands in front of it.',
];
// A set of pictures made once by the image model (`prompts`, `style`, `aspect`), kept in store.meta[metaKey] and in
// blobs `<prefix>-<set>-<n>`; a new `set` replaces the old pictures. Used by the «آموزش» cards and the profile
// pictures; each has start (on server start), poll (in the poll round), versions (for /api/config) and blob.
// `prompts`: a list (numbered 1…n, each followed by `style`, in `aspect`; an entry may be { prompt, aspect } for its own
// shape) or an object of key → { prompt, aspect, ref }.
// `ref`: a picture in `refDir` the model redraws (image to image), e.g. a sign's official drawing; without it, text only.
// `limit`: at most this many being made at a time (the rest start as earlier ones finish); none = all at once.
// Keyed prompts carry a revision (a hash of the prompt and its reference): when it changes, that one picture is made
// again, and the old one stays on show until the new one is ready.
// A picture that failed because the account ran out of credit (or was rate limited) does not count as a try; it is tried
// again 20 minutes later. `retry`: a mark kept with the set; changing it gives every picture not made yet new tries.
// `allow`: which pictures may be made (key → true); none = all.
// `redo` (a numbered list only): number → a mark; a picture made without that mark is made again (as a changed prompt).
// `resolution`: the image model's size ('2K' unless given); a larger one it turns down is asked for again at '2K'.
// `derive`: number → another picture of the set this one is redrawn from (image to image, its prompt saying what to
// change), e.g. a light version of a dark picture with the same drawing; it waits until that one is made and up to date,
// and is made again whenever that one changes.
// `fixed`: number → a picture file in `refDir` used as it is (one chosen by hand), put in again whenever the file changes.
// `full`: keep the pictures large and sharp (sharp(): up to 2560 px, JPEG) instead of halving them.
// `upscale`: number → a mark; a picture made without that mark is redrawn from itself at `resolution` (UPSCALE_PROMPT), so
// it stays the same drawing, only sharper (the one on show stays until the new one is made).
// `model`: the image model for this set (the server's IMAGE_MODEL unless given).
// `clean`: a mark; pictures get their plain background smoothed (cleanBackground): new ones when made, the ones made
// before once on start (no new drawing, no cost).
// `enhance`: a mark; every made picture without it is sharpened (enhanceTask) and stored at up to 3840 px. A picture
// drawn from another follows that one's drawing (rv), not its sharpening, so it is not drawn again.
function artSet({ metaKey, set, prompts, style = '', aspect = '1:1', prefix, limit = Infinity, refDir = '', retry = '', allow = null, redo = {}, resolution = '2K', derive = {}, fixed = {}, full = false, upscale = {}, model = IMAGE_MODEL, enhance = '', clean = '' }) {
  const meta = () => (store.meta[metaKey] = store.meta[metaKey] && store.meta[metaKey].set === set ? store.meta[metaKey] : { set, items: {} });
  const save = () => store.saveMeta(metaKey, meta());
  const list = Array.isArray(prompts)
    ? prompts.map((p, i) => [String(i + 1), { prompt: `${typeof p === 'string' ? p : p.prompt}\n${style}`, aspect: (typeof p === 'string' ? null : p.aspect) || aspect, rev: redo[String(i + 1)] }])
    : Object.entries(prompts).map(([k, v]) => [k, { prompt: v.prompt, aspect: v.aspect || aspect, ref: v.ref,
      rev: require('node:crypto').createHash('sha1').update(`${v.prompt}|${v.ref || ''}|${v.aspect || aspect}`).digest('hex').slice(0, 10) }]);
  // Never started, failed with tries left, or made from an earlier version of its prompt.
  // (A keyed picture made before revisions existed is kept; a numbered one is ordered again by its `redo` mark, and
  // tried again on the next start when that failed.)
  const stale = (x, rev) => !!(rev && x && x.done && (Array.isArray(prompts) ? x.rev !== rev || (x.state === 'fail' && x.blob && !x.up) : x.rev && x.rev !== rev));
  const NO_CREDIT = /credit|balance|insufficient|quota|402|429|too many/i, LATER = 20 * 60e3;
  const broke = x => !!(x && x.done && !x.blob && NO_CREDIT.test(x.error || ''));
  const due = x => broke(x) && Date.now() - x.at > LATER;
  const may = n => !allow || allow.has(n);
  const srcReady = n => { const f = derive[n]; if (!f) return true; const sx = meta().items[f], l = list.find(([k]) => k === f);
    return !!(sx && sx.done && sx.blob && !stale(sx, l && l[1].rev)); };
  const revOf = (n, rev) => { if (!derive[n]) return rev; const sx = meta().items[derive[n]] || {}; return `${rev || ''}@${sx.rv || sx.v || ''}`; };   // follows its source's version
  const waiting = (x, rev, n) => may(n) && srcReady(n) && (!x || (!x.blob && x.done && (broke(x) ? due(x) : (x.tries || 0) < 3)) || stale(x, revOf(n, rev)));
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
      for (const [n, file] of Object.entries(fixed)) {   // the hand-chosen pictures, from their files
        const data = fs.readFileSync(path.join(refDir, file)), mark = `file:${require('node:crypto').createHash('sha1').update(data).digest('hex').slice(0, 10)}`;
        if ((it[n] || {}).rev !== mark) { await put(n, { mime: 'image/png', data }, `file ${file}`); meta().items[n].rev = mark; await save(); }
      }
      let running = Object.values(it).filter(j => !j.done && j.taskId).length;
      for (const [n, mark] of Object.entries(upscale)) {   // made pictures redrawn sharper from themselves
        const x = it[n], l = list.find(([k]) => k === n);
        const tries = x && x.upMark === mark ? x.upTries || 0 : 0;   // tries with this mark (a new mark gets three again)
        if (!l || !x || !x.done || !x.blob || x.up === mark || tries >= 3 || running >= limit) continue;
        const job = it[n] = { ...x, at: Date.now(), done: false, state: 'queued', up: mark, upMark: mark, upTries: tries + 1, error: '' };
        try {
          const own = await blob(x.blob);
          const d = await imageTask({ prompt: UPSCALE_PROMPT, aspect_ratio: l[1].aspect, resolution, input_urls: [await upload({ mime: own.mime, data: own.data }, `${prefix}-${set}-${n}-up.${own.mime === 'image/jpeg' ? 'jpg' : 'png'}`)] }, model);
          job.taskId = d.taskId; job.state = 'generating'; running++;
        } catch (e) { Object.assign(job, { state: 'fail', done: true, error: e.message, up: x.up }); console.error(metaKey, n, 'upscale', e.message); }
        await save();
      }
      if (clean) for (const [n] of list) {   // made pictures' backgrounds smoothed, once
        const x = it[n];
        if (!x || !x.done || !x.blob || x.clean === clean) continue;
        const b = await blob(x.blob); if (!b) continue;
        const r = sharp(b.data, b.mime, FULL_MAX, x.clean === 'cl1' ? 'edges' : true); if (!r.buf) { x.clean = clean; continue; }
        await store.saveBlob(x.blob, r.mime, r.buf); cache.delete(x.blob);
        Object.assign(x, { clean, rv: x.rv || x.v, v: Date.now().toString(36), size: r.buf.length });
        await save(); await new Promise(res => setImmediate(res));
      }
      if (enhance) for (const [n] of list) {   // made pictures sharpened (the same drawing, finer)
        const x = it[n], mark = typeof enhance === 'string' ? enhance : enhance[n];
        const tries = x && x.enhMark === mark ? x.enhTries || 0 : 0;   // tries with this mark
        if (!mark || !x || !x.done || !x.blob || x.enh === mark || tries >= 3 || running >= limit) continue;
        const job = it[n] = { ...x, at: Date.now(), done: false, state: 'enhancing', stage: 'enhance', enh: mark, enhMark: mark, enhTries: tries + 1, rv: x.rv || x.v, error: '' };
        try { job.taskId = await enhanceTask(await blob(x.blob), `${prefix}-${set}-${n}-enh`, mark); running++; }
        catch (e) { enhanceFailed(job, e.message); console.error(metaKey, n, 'enhance', e.message); }
        await save();
      }
      for (const [n, { prompt, aspect: ar, ref, rev: rev0 }] of list) {
        if (running >= limit) break;
        if (fixed[n]) continue;
        const x = it[n], rev = revOf(n, rev0), from = derive[n];
        if (!waiting(x, rev0, n)) continue;   // done, running, waiting for its source, or given up after 3 tries
        const again = stale(x, rev);
        const job = it[n] = { at: Date.now(), done: false, state: 'queued', tries: (again ? 0 : (x && x.tries) || 0) + (broke(x) ? 0 : 1), prompt, rev,
          ...(again ? { blob: x.blob, v: x.v, size: x.size } : {}) };   // the old picture stays until the new one is made
        try {
          const input = { prompt, aspect_ratio: ar, resolution };
          if (ref) input.input_urls = [await upload({ mime: /\.jpe?g$/i.test(ref) ? 'image/jpeg' : 'image/png', data: fs.readFileSync(path.join(refDir, ref)) }, `${prefix}-${ref}`)];
          if (from) { const sb = await blob(it[from].blob); input.input_urls = [await upload({ mime: sb.mime, data: sb.data }, `${prefix}-${set}-${n}-from-${from}.png`)]; }
          const task = inp => imageTask(inp, model);
          const d = await task(input).catch(e => { if (resolution === '2K' || NO_CREDIT.test(e.message)) throw e; console.error(metaKey, n, resolution, e.message); return task({ ...input, resolution: '2K' }); });
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
      if (job.stage === 'enhance' && !enhance) { enhanceFailed(job, 'sharpening switched off'); await save(); continue; }
      try {
        const d = await kie('GET', `/jobs/recordInfo?taskId=${encodeURIComponent(job.taskId)}`);
        if (d.state === 'success') {
          const url = (JSON.parse(d.resultJson || '{}').resultUrls || [])[0];
          if (!url) throw new Error('no result url');
          const r = await fetch(url); if (!r.ok) throw new Error(`download ${r.status}`);
          const raw = Buffer.from(await r.arrayBuffer()), rawMime = r.headers.get('content-type') || 'image/png';
          const sm = job.stage === 'enhance' ? sharp(raw, rawMime, ENHANCED_MAX, !!clean) : full ? sharp(raw, rawMime, FULL_MAX, !!clean) : shrink(raw, rawMime);
          if (clean && sm.buf) job.clean = clean;
          if (!sm.buf) throw Object.assign(new Error(sm.src || 'unreadable picture'), { final: true });
          job.blob = `${prefix}-${set}-${n}`;
          await store.saveBlob(job.blob, sm.mime, sm.buf); cache.delete(job.blob);
          const v = Date.now().toString(36);
          if (job.stage === 'enhance') job.enhInfo = { from: sm.src, kept: sm.out, mime: rawMime, bytes: raw.length };   // what the upscaler sent back
          Object.assign(job, { state: 'done', done: true, v, rv: job.stage === 'enhance' ? job.rv : v, size: sm.buf.length, stage: null });
        } else if (d.state === 'fail' && job.stage === 'enhance') enhanceFailed(job, d.failMsg || 'failed');
        else if (d.state === 'fail') Object.assign(job, { state: 'fail', done: true, error: d.failMsg || 'failed' }, job.blob && job.upTries ? { up: null } : {});
        else pending = true;
        if (!job.done && job.stage === 'enhance' && Date.now() - job.at > 30 * 60e3) enhanceFailed(job, 'timeout');
        if (!job.done && Date.now() - job.at > 30 * 60e3) Object.assign(job, { state: 'fail', done: true, error: 'timeout' }, job.blob && job.upTries ? { up: null } : {});
      } catch (e) { if (job.stage === 'enhance' && e.final) enhanceFailed(job, e.message); else { job.error = e.message; pending = true; if (Date.now() - job.at > 30 * 60e3) Object.assign(job, { state: 'fail', done: true }); } }
      await save();
    }
    // With a limit, the next ones start as earlier ones finish.
    const now2 = meta().items;
    // (and a picture redrawn from another starts once that one is made)
    if (((limit !== Infinity || Object.keys(derive).length) && list.some(([n, { rev }]) => waiting(now2[n], rev, n))) || (enhance && Object.entries(now2).some(([n, j]) => { const m = typeof enhance === 'string' ? enhance : enhance[n]; return m && j.done && j.blob && j.enh !== m && (j.enhMark !== m || (j.enhTries || 0) < 3); }))) { await startSet(); pending = Object.values(now2).some(j => !j.done && j.taskId) || pending; }
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
// The admin's orders with their prompts; each is made once (and again when its prompt changes).
// A picture with "order": false is written down but not made until the admin orders it (the image model's credit).
const COURSE_ART = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'course-art.json'), 'utf8'));
const COURSE = artSet({ metaKey: 'courseArt', set: 'v1', prompts: COURSE_ART, aspect: '4:3', prefix: 'course',
  allow: new Set(Object.keys(COURSE_ART).filter(k => COURSE_ART[k].order !== false)) });
const courseVersions = COURSE.versions, courseBlob = COURSE.blob;

// ---------- «آزمون جدید»'s question pictures (data/newq-art.json, keyed by the question's number) ----------
// Written by data/newq-src/build.py; one with "order": false is not made until the admin orders it (the image model's
// credit); at most 10 are made at a time.
const NEWQ_ART = (() => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'newq-art.json'), 'utf8')); } catch { return {}; } })();
const NEWQ = artSet({ metaKey: 'newqArt', set: 'v1', prompts: NEWQ_ART, aspect: '4:3', prefix: 'newq', limit: 10,
  allow: new Set(Object.keys(NEWQ_ART).filter(k => NEWQ_ART[k].order !== false)) });
const newqVersions = NEWQ.versions, newqBlob = NEWQ.blob;

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

// ---------- the pictures at the top of the app's home, «آموزش», «آزمون» and sign-in pages ----------
// One wide scene each that fills the page's header from edge to edge (no frame, no gradient over it); the page's title
// lies on its right side, so the objects stand on the left and the right is left calm. Served at /hero-art/<n>.png.
const HERO_SET = 'v2';   // v2: 4K, with calm top and bottom edges (the page's buttons above, the fade into the page below)
const HERO_STYLE = 'Style: a modern, minimal 3D illustration like the header picture of a premium mobile app: a few simple objects, clean rounded geometric shapes, smooth matte materials with a soft clay look, soft light, subtle soft shadows, no clutter, no fine texture. Palette: white, pale mint (#cfe9cf), warm coral (#e8957a) and periwinkle blue (#5b74c4), with small accents of green, red or warm yellow. The whole picture is one rich dark forest green (#14421c) background scene that fills the frame edge to edge, with soft darker green shapes of rolling hills low in the background; no border, no frame, no vignette. The top tenth and the bottom quarter of the picture are only calm, plain, even background (the bottom quarter one flat even dark green, no hills, no shadows, no objects), because the picture fades smoothly into the page there. All the objects stand in the LEFT half, vertically centred, at least a tenth of the width away from every edge; the RIGHT half is calm, plain background with nothing in it (a white title will be written there). Danish traffic signs follow their official design. No text, no letters, no numbers, no logos, no brand names, no watermarks, no faces.';
const HERO_PROMPTS = [
  // 1: «آموزش» (learning)
  'Learning to drive: an open periwinkle-blue book lying at an isometric angle, a winding grey road with white dashes rising out of its pages, a small rounded coral car driving on that road, a red-and-white triangular warning sign and a round blue sign on short poles beside the road, and a white graduation cap resting on a corner of the book.',
  // 2: «آزمون» (the test). Laid out like the learning picture (1), its clipboard lying flat as the book does, so the
  // group is as wide and low as that one and fits the low header the same way.
  'A driving theory test: a large white clipboard lying flat at an isometric angle (tilted back like an open book lying on a table, not standing upright), on it three rows of answer boxes, two ticked in green and one crossed in coral; a round white stopwatch with a coral button standing at its front corner, a yellow pencil lying across its lower edge, a red-and-white triangular warning sign on a short pole and a small rounded tree behind it, and a small golden star floating just above. The group is a little narrower than an open book seen at that angle: it spans only the left half of the width (from about 8% to 50%) and the middle of the height (from about 20% to 70%), with the clipboard of medium size.',
  // 3: the home page (a greeting and the progress)
  'On the way to the driving licence: a short winding grey road with white dashes rising from the front towards the back, a small rounded coral car driving up it, a white driving licence card with a faceless photo silhouette standing upright at the end of the road beside a small green flag, and a round white speedometer gauge with a green needle floating beside the road. This picture is shown in a wide, low header that cuts off its top and bottom: the objects are small and stay in a band through the vertical middle (between 30% and 70% of the height) and within the left 45% of the width; above, below and to the right of them only background.',
  // 4: «آموزش گام‌به‌گام» (the app's own course, its steps to the licence)
  'The way to the driving licence, step by step: a grey road with white dashes climbing in a gentle zigzag from the front towards the back, with four round white milestone markers along it (blank, no numbers), the first ones with small green check marks; a small rounded coral car at the start of the road; a red-and-white triangular warning sign with a simple black exclamation mark on a short pole beside it; and at the top end of the road a white driving licence card with a faceless photo silhouette and a round green check badge, standing beside a small green flag. This picture is shown in a wide, low header that cuts off its top and bottom, with the page\'s title on its right: the objects are small and stay in a band through the vertical middle (between 32% and 72% of the height) and within the left 38% of the width, the road climbing towards the upper left, the licence card and the flag at most 38% of the width from the left edge; everything to the right of 40% of the width is only plain background.',
];
// A dark picture redrawn for the light theme: the same drawing, only its background in the light theme's green.
const HERO_RECOLOUR = 'Redraw this exact picture for a light theme. Keep every object exactly as it is: the same objects, shapes, sizes, positions, angles, colours, materials, lighting and composition, nothing added, removed or moved. Change only the background: the dark green background and its darker green hills become one soft, light, airy pastel green (#d9ecd5) with gentle slightly deeper pale green (#c4e1be) hills, and the bottom quarter one flat even light pastel green (#d9ecd5); soften the shadows to suit the light background. No text, no letters, no numbers, no logos, no watermarks.';
// A light picture redrawn for the dark theme, the other way round.
const HERO_RECOLOUR_DARK = 'Redraw this exact picture for a dark theme. Keep every object exactly as it is: the same objects, shapes, sizes, positions, angles, colours, materials, lighting and composition, nothing added, removed or moved. Change only the background: the light pastel green background and its pale green hills become one rich dark forest green (#1b4827) with soft slightly darker green hills, and the bottom quarter one flat even dark forest green (#1b4827); deepen the shadows to suit the dark background. No text, no letters, no numbers, no logos, no watermarks.';
// 4–6: the same three for the light theme, on a soft light green that sits with the light page (its title in dark green).
const HERO_STYLE_LIGHT = HERO_STYLE
  .replace('The whole picture is one rich dark forest green (#14421c) background scene', 'The whole picture is one soft, light, airy pastel green (#d9ecd5) background scene')
  .replace('soft darker green shapes of rolling hills', 'gentle slightly deeper pale green (#c4e1be) shapes of rolling hills')
  .replace('one flat even dark green', 'one flat even light pastel green (#d9ecd5)')
  .replace('(a white title will be written there)', '(a dark green title will be written there)');
// 7, 8: the sign-in page's taller header (square). The light one (8) is a picture chosen by hand
// (data/hero-ref/sign-in-light.png: a road through green hills with a coral car, a glowing licence card, a check badge and
// a Danish flag), the dark one (7) that picture redrawn on dark green.
const HERO_UP = 'k4f';   // the mark of the full-size redraw
const HERO = artSet({ metaKey: 'heroArt', set: HERO_SET, aspect: '4:3', prefix: 'hero-art', resolution: '4K',
  prompts: [HERO_RECOLOUR_DARK, `${HERO_PROMPTS[1]}\n${HERO_STYLE}`, HERO_RECOLOUR_DARK, `${HERO_PROMPTS[0]}\n${HERO_STYLE_LIGHT}`, HERO_RECOLOUR, `${HERO_PROMPTS[2]}\n${HERO_STYLE_LIGHT}`,
    { prompt: HERO_RECOLOUR_DARK, aspect: '1:1' }, { prompt: 'data/hero-ref/sign-in-light.png', aspect: '1:1' },
    HERO_RECOLOUR_DARK, `${HERO_PROMPTS[3]}\n${HERO_STYLE_LIGHT}`],
  // Each page's two pictures are one drawing: the learning and home dark ones redrawn from their light ones (1 from 4,
  // 3 from 6, the sign-in's 7 from its chosen 8, and the course's 9 from 10), the test's light one from its dark one
  // (5 from 2).
  redo: { 2: 'narrow', 10: 'left' }, derive: { 1: '4', 3: '6', 5: '2', 7: '8', 9: '10' }, fixed: { 8: 'sign-in-light.png' }, refDir: path.join(__dirname, 'data', 'hero-ref'),
  // Kept at the model's full size (FULL_MAX, JPEG); the drawings made before that (at 2560 px) are redrawn from themselves
  // at 4K, and the ones drawn from them (1, 5, 7) follow from those. The home page's two (3, 6) are the trial's (adoptHomeTrial).
  // (sharpening tried on one picture first, to see what the upscaler sends back: heroDiag)
  full: true, upscale: { 2: HERO_UP, 4: HERO_UP, 6: HERO_UP, 8: HERO_UP }, clean: 'cl2', enhance: '' });   // sharpening off (see enhanceTask): kie.ai's upscalers failed or sent pictures too large
const heroVersions = HERO.versions, heroBlob = HERO.blob;
// The sign-in page's picture on the main site (Mojtaba's mountain reference, 2026-10-15): a flat landscape in solid
// colours, the light theme's (1) and the dark theme's night scene (2). Served at /login-art/<n>.png;
// until one is made the app shows its own vector drawing of the same scene (ui/header-art.tsx LoginScene).
const LOGIN_FLAT = 'Style: a flat vector illustration like a modern minimal mobile app onboarding screen: only solid flat fills, no gradients at all, no shading, no texture, no grain, no outlines, no 3D, no shadows; clean simple geometric shapes with straight or gently curved edges. The picture fills the whole frame edge to edge, no border, no frame, no vignette. No text, no letters, no numbers, no logos, no watermarks, no people.';
const LOGIN_LIGHT = 'A wide calm landscape for the sign-in screen of a Danish driving-theory app. The sky is one flat even pale mint colour (#c8e6da) over the whole upper part. A large round flat orange sun (#f2a541) stands in the upper right of the middle area, well away from the top edge. Behind, a range of sharp triangular mountains in flat soft sage green (#6fb09b); in front of them a lower range of sharp triangular hills in flat deep teal green (#1f6f5c) that reaches down to the bottom edge and fills the whole bottom fifth of the picture with that one flat deep teal green. A light grey road (#eef3f1) with a dashed warm yellow centre line winds from the bottom middle up between the front hills and disappears into a gap in them, narrowing with distance. Beside the road on the left stands one small Danish triangular warning traffic sign (white triangle with a red border, point up) on a thin pale grey pole. Keep the sun, the road and the sign inside the central area of the picture, so the left and right edges and the top edge can be cut off.';
// (2026-10-15, Mojtaba: the dark one its own night scene of the same style, with a driving lesson's things, not a recolour)
const LOGIN_DARK = 'A calm night landscape for the sign-in screen of a Danish driving-theory app, for a dark theme on a pure black page. The sky is one flat even near-black green (#0b1714) over the whole upper part, with a slim flat pale cream crescent moon (#f1e3b5) in the upper right of the middle area, well away from the top edge, and a few tiny flat pale dots of stars. Behind, a range of sharp triangular mountains in flat muted dark teal green (#2b5f52); in front of them a lower range of sharp triangular hills in flat deep dark teal green (#163a31) that reaches down to the bottom edge and fills the whole bottom fifth of the picture with that one flat colour. A dark grey road (#2f3d39) with a dashed warm yellow centre line winds from the bottom middle up between the front hills into a gap in them, narrowing with distance. On the road, a little way up, one small rounded flat learner car in the app teal green (#1f6f5c) seen from behind, with a small white L plate on its back and two soft flat pale yellow headlight beams (simple flat translucent triangles) shining ahead up the road. Beside the road on the left a single flat street lamp with a warm yellow lamp and a flat pale circle of light around it, and a small Danish triangular warning sign (white triangle with a red border, point up) on a thin grey pole on the right. Keep the moon, the car, the lamp and the sign inside the central area of the picture, so the left and right edges and the top edge can be cut off.';
const LOGIN = artSet({ metaKey: 'loginArt', set: 'flat1', aspect: '3:2', prefix: 'login-art', resolution: '2K', full: true,
  prompts: [`${LOGIN_LIGHT}\n${LOGIN_FLAT}`, `${LOGIN_DARK}\n${LOGIN_FLAT}`], redo: { 2: 'night1' } });
const loginVersions = LOGIN.versions, loginBlob = LOGIN.blob;
// The home page's pictures redrawn at full size in the trial (/hero-try/1, 2), chosen to replace the ones on show:
// put in once as they are (already cleaned), marked as redrawn so they are not drawn again, and with the drawing's
// version (rv) kept, so the dark one is not redrawn from the light one.
async function adoptHomeTrial() {
  const m = store.meta.heroArt;
  if (!m || m.adopted === 'full1') return;
  const pics = [await HERO_TRY.blob('1'), await HERO_TRY.blob('2')];
  if (!pics[0] || !pics[1]) return;
  for (const [n, b] of [['6', pics[0]], ['3', pics[1]]]) { await HERO.put(n, b); Object.assign(m.items[n], { up: HERO_UP, clean: 'cl2' }); }
  m.adopted = 'full1'; await store.saveMeta('heroArt', m);
}
// The header pictures' state for /api/config's heroDiag: no prompts or keys, only how each was last made / sharpened.
const heroDiag = () => Object.fromEntries(Object.entries((store.meta.heroArt || {}).items || {}).map(([n, j]) =>
  [n, { state: j.state, enh: j.enh || null, enhMark: j.enhMark || null, enhTries: j.enhTries || 0, info: j.enhInfo || null, error: j.error ? String(j.error).slice(0, 160) : null }]));
// A trial, to compare with the pictures on show; served at /hero-try/<n>.png and not used by the app.
// The home page's header in the style of the «علائم رانندگی» cards (data/hero-ref/card-style.png, one of them, given as a
// reference for the style only): crisp, clean 3D objects with smooth matte materials on one plain soft background, no
// landscape; the header's layout (1: light theme; 2: the dark one, redrawn from it). (The trial before, at full size, was
// taken in: adoptHomeTrial.)
const HERO_CARD_STYLE = 'Use the attached picture ONLY as the reference for the drawing style: the same crisp, clean 3D look with smooth matte materials (a soft clay feel), crisp edges, rounded geometric shapes, the same soft studio light from the upper left, the same subtle soft contact shadows under each object, the same level of detail and the same clean, saturated colours. Do not copy its objects or its layout.\nStyle: a modern, minimal 3D illustration like the cards of a premium mobile app: only a few simple objects, clean rounded geometric shapes, smooth matte materials with a soft clay look, soft studio light, subtle soft shadows, no clutter. Palette: white, warm coral red, fresh green, periwinkle blue, with small accents of yellow. The whole picture is one plain soft light pastel green (#d9ecd5) background from edge to edge, with no gradient, no floor line, no hills, no landscape, no border, no frame and no vignette; the objects stand on it with only their own soft shadows. The top tenth and the bottom quarter of the picture are only plain, even background with nothing in them, because the picture fades smoothly into the page there. All the objects form one compact group in the LEFT half, vertically centred, at least a tenth of the width away from every edge; the RIGHT half is plain, empty background with nothing in it (a dark green title will be written there). Danish traffic signs follow their official design (shape and colours). No readable text, no letters, no numbers, no logos, no brand names, no watermarks, no faces.';
const HERO_CARD_HOME = 'On the way to the driving licence: a short curved piece of grey road with white dashes, like a small rounded road tile, rising from the front towards the back; a small rounded coral-red car driving on it; at its far end a white driving licence card with a faceless photo silhouette standing upright beside a small green flag on a short pole; a round white speedometer gauge with a green needle on a short stand beside the road; and a red-and-white triangular warning sign on a short grey pole.';
const HERO_TRY = artSet({ metaKey: 'heroTry', set: 'card1', aspect: '4:3', prefix: 'hero-try', resolution: '4K', full: true, clean: 'cl2',
  refDir: path.join(__dirname, 'data', 'hero-ref'),
  prompts: { 1: { prompt: `${HERO_CARD_HOME}\n${HERO_CARD_STYLE}`, ref: 'card-style.png' },
    2: { prompt: HERO_RECOLOUR_DARK.replace(' and its pale green hills', '').replace(' with soft slightly darker green hills', ', plain, with no hills') } },
  derive: { 2: '1' } });
const heroTryBlob = HERO_TRY.blob;

// ---------- the pictures behind the app's store screenshots (Play Store / App Store) ----------
// Six tall scenes, one per feature, laid behind a phone with the app on it and a big title (composed outside the app):
// the objects stand large in the lower right corner, partly cut by the right edge, the rest one calm dark green.
// Served at /store-art/<n>.png; not used by the app. (Each prompt carries its own style; a changed prompt does not
// redraw a made picture.)
const STORE_STYLE = 'Style: a modern, minimal 3D illustration for a premium mobile app\'s store page: a few simple objects, clean rounded geometric shapes, smooth matte materials with a soft clay look, soft studio light, gentle soft shadows, no clutter, no fine texture. Palette: white, pale mint (#cfe9cf), warm coral (#e8957a) and periwinkle blue (#5b74c4), with small accents of green, red or warm yellow. The background is one rich, even, dark forest green (#14421c) from edge to edge, with no hills, no floor line, no border, no frame and no vignette. The objects form ONE large group in the LOWER RIGHT of the tall picture: from about 58% of the height down to about 95%, and from about 40% of the width to the right edge, the rightmost object running off the right edge a little; the whole upper 55% and the left side are plain, empty dark green (a title and a phone will be laid there). Danish traffic signs follow their official design. No text, no letters, no numbers, no logos, no brand names, no watermarks, no faces, no phones, no screens.';
const STORE_PROMPTS = [
  'Ready for the driving licence: a large rounded coral car seen from the front at an angle, and beside it a white driving licence card with a faceless photo silhouette and a green check badge, a small Danish flag on a short pole.',
  'A real theory test: a large white clipboard with answer boxes ticked in green and one crossed in coral, a round white stopwatch with a coral button, and a yellow pencil.',
  'Learning step by step: a large open periwinkle-blue book with a winding grey road rising from its pages, a small coral car on the road, and a white graduation cap.',
  'Danish traffic signs: a cluster of large traffic signs on short grey poles: a red-and-white triangular warning sign, a round red-ringed no-entry sign, a round blue mandatory arrow sign and a yellow diamond priority road sign.',
  'Understanding each sign: a large red-and-white triangular warning sign on a short pole and a big rounded magnifying glass in front of it, with a small open notebook.',
  'Right of way at a crossroads: a small rounded grey crossroads with white markings seen from above at an angle, two small rounded cars (coral and periwinkle) meeting at it, a small give-way triangle sign and a traffic light.',
];
// 7: a trial of the first one in another style, a flat cartoon vector illustration instead of 3D clay (same layout).
const STORE_VECTOR_STYLE = 'Style: a clean, colorful cartoon vector illustration with a polished, modern, friendly Scandinavian aesthetic, like the illustrations of a professional educational app. Smooth, simple, rounded shapes; crisp, clean outlines of even weight in a slightly darker shade of each shape\'s own colour (not black); soft cel shading with one gentle highlight and one soft shadow tone per shape; vibrant natural colours: coral red, warm white, sunny yellow, fresh leaf green, sky blue and Danish red. Flat vector look: not a 3D render, not clay, no photorealism, no glossy reflections, no texture, no grain, no noise. The background is one rich, even, flat dark forest green (#1c4526) from edge to edge, with no hills, no floor line, no border, no frame and no vignette. The objects form ONE large group in the LOWER RIGHT of the tall picture: from about 58% of the height down to about 95%, and from about 40% of the width to the right edge, the rightmost object running off the right edge a little; the whole upper 55% and the left side are plain, empty dark green (a title and a phone will be laid there). Danish traffic signs follow their official design. No text, no letters, no numbers, no logos, no brand names, no watermarks, no faces, no phones, no screens.';
const STORE_VECTOR_1 = 'Ready for the driving licence: a friendly, rounded coral-red hatchback car seen from the front at a three-quarter angle, its headlights bright; beside it a large white Danish driving licence card standing upright, with a simple faceless photo silhouette, a few pale blue lines and a round green badge with a white check mark; a small Danish flag (red with a white Nordic cross) on a short white pole; at the base a little Scandinavian birch tree and two soft rounded grass tufts.';
const STORE = artSet({ metaKey: 'storeArt', set: 'v1', aspect: '2:3', prefix: 'store-art', resolution: '4K', full: true, clean: 'cl2',
  prompts: [...STORE_PROMPTS.map(p => `${p}\n${STORE_STYLE}`), `${STORE_VECTOR_1}\n${STORE_VECTOR_STYLE}`] });
const storeBlob = STORE.blob;

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
    const d = await imageTask(input);
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

module.exports = { edit, remove, draft, firstQuestion, init, start, poll, setActive, activeBlob, jobBlob, versions, list, available, introVersions, introColours, introBlob, learnVersions, learnBlob, learnColours, courseVersions, courseBlob, newqVersions, newqBlob, avatarVersions, avatarBlob, avatarCount, heroVersions, heroBlob, heroTryBlob, loginVersions, loginBlob, storeBlob, heroDiag, guideVersions, guideBlob,
  guidePrompt, guidePut: GUIDE.put, houseStyle, withHouseStyle, startOneOff, oneOff, oneOffBlob, dropOneOff, writeText, models,
  questionPrompt, guidePromptNow: GUIDE.promptOf, editRegions, regionPrompt };
