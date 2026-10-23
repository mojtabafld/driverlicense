// Comparing the teaching pictures (signs, right of way) with prove.dk's, in the admin panel.
// data/prove-map.json (from data/guide-src/build.py) says where each item's picture is on prove.dk and whether the
// sign's official drawing is on Wikimedia Commons. «دریافت تصاویر مرجع» copies them into the database once (blobs
// ref-prove-<key>, ref-off-<key>), so the comparison does not depend on the prove.dk account. prove.dk's pictures are
// for the admin's comparison (/console) and for the app's copy at /app, which shows them instead of the made pictures
// (/img/guideprove/<key>.png, signed-in users only); for a sign the admin may choose the official drawing (public
// domain) instead of the made picture, which /guide-art/<key>.png then serves.
// store.meta.guideRef = { items: { [key]: { prove?: at, off?: at } }, choice: { [key]: 'official' }, choiceMark, run: {…} }.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const UA = 'Teorivej/1.0 (https://teori.bitlane.app; driving-theory study app)';
const read = f => JSON.parse(fs.readFileSync(path.join(__dirname, f), 'utf8'));
let store = null, imagegen = null, MAP = {}, DATA = { signs: [], priority: [] };

function init(s, ig) {
  store = s; imagegen = ig;
  try { MAP = read('data/prove-map.json'); DATA = read('mobile/src/lib/guide-data.json'); } catch (e) { console.error('guide refs', e.message); }
  const r = meta().run;
  if (r && !r.done) { r.done = true; r.stopped = true; save().catch(() => {}); }   // an import cut short by a restart
  applyChoices();
  // prove.dk's pictures and the official drawings are copied in on their own: a minute after the start, whatever is
  // not there yet (nothing is fetched again).
  if (missing()) setTimeout(() => { if (missing()) startImport(); }, 60e3).unref();
  setTimeout(() => warm().catch(e => console.error('guide web warm', e.message)), 90e3).unref();
}
const missing = () => Object.entries(MAP).some(([k, x]) => { const it = meta().items[k] || {}; return !it.prove || (x.official && !it.off); });
const meta = () => (store.meta.guideRef = store.meta.guideRef || { items: {}, choice: {} });
const save = () => store.saveMeta('guideRef', meta());
// Choices made in the repository (data/guide-choice.json: key → 'official' | 'ai'), e.g. after a review found a made
// picture wrong: applied once for each new `mark`, as if the admin had chosen them; the console can change them later.
function applyChoices() {
  let f;
  try { f = read('data/guide-choice.json'); } catch { return; }
  const m = meta();
  if (!f.mark || m.choiceMark === f.mark) return;
  for (const [k, c] of Object.entries(f.choice || {})) { if (c === 'official') m.choice[k] = 'official'; else if (c === 'ai') delete m.choice[k]; }
  m.choiceMark = f.mark;
  save().catch(e => console.error('guide choices', e.message));
}

// The official drawing on Wikimedia Commons, rendered at 960 px.
function commonsUrl(name) {
  const h = crypto.createHash('md5').update(name).digest('hex'), n = encodeURIComponent(name);
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${h[0]}/${h.slice(0, 2)}/${n}/960px-${n}.png`;
}
// Rate limited (429): waits and tries again, up to four times (5, 10, 20, 40 s).
async function fetchTo(url, blob) {
  let r;
  for (let t = 0; ; t++) {
    r = await fetch(url, { headers: { 'User-Agent': UA } });
    if (r.status !== 429 || t >= 4) break;
    await new Promise(ok => setTimeout(ok, 5000 * 2 ** t));
  }
  if (!r.ok) throw new Error(`${r.status} ${url.slice(0, 80)}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await store.saveBlob(blob, (r.headers.get('content-type') || 'application/octet-stream').split(';')[0], buf);
}

// Copies every picture not copied yet, one after another, in the background.
function startImport() {
  const m = meta();
  if (m.run && !m.run.done) return m.run;
  const keys = Object.keys(MAP);
  const run = m.run = { at: Date.now(), done: false, total: keys.length, n: 0, errors: [] };
  (async () => {
    for (const k of keys) {
      const x = MAP[k], it = m.items[k] = m.items[k] || {};
      try {
        if (!it.prove) { await fetchTo(x.url, `ref-prove-${k}`); it.prove = Date.now(); }
        if (x.official && !it.off) { await fetchTo(commonsUrl(x.commons), `ref-off-${k}`); it.off = Date.now(); await new Promise(r => setTimeout(r, 1500)); }
      } catch (e) { run.errors.push(`${k}: ${e.message}`); }
      run.n++;
      if (run.n % 10 === 0) await save().catch(() => {});
    }
    run.done = true; await save().catch(() => {});
  })().catch(e => { run.done = true; run.errors.push(e.message); save().catch(() => {}); });
  save().catch(() => {});
  return run;
}

// The groups and their items with what is there for each: the made picture's version, prove.dk's, the official drawing.
function list() {
  const m = meta(), ai = imagegen.guideVersions();
  const row = (key, label, sub) => ({ key, label, sub, ai: ai[key] || null, prove: !!(m.items[key] || {}).prove, official: !!(m.items[key] || {}).off,
    canOfficial: !!(MAP[key] || {}).official, choice: m.choice[key] || 'ai', onProve: !!MAP[key], cand: candOf(key) });
  const groups = [
    ...DATA.signs.map(g => ({ kind: 'signs', id: g.id, title: g.title, items: g.items.map(i => row(i.key, i.fa, i.code)) })),
    ...DATA.priority.map(g => ({ kind: 'priority', id: g.id, title: g.title, items: g.items.map(i => row(i.key, i.title, '')) })),
  ];
  return { groups, run: m.run || null };
}

// A new picture made on request in the console (imagegen's one-off job `guide-<key>`): its state, and its version once
// made. It waits beside the others until the admin chooses it (choice 'cand') or another picture.
const candOf = key => { const j = imagegen.oneOff(`guide-${key}`); return j ? { state: j.state, done: j.done, v: j.v || null, error: j.error || '' } : null; };
const known = key => DATA.signs.concat(DATA.priority).some(g => g.thumb === key || g.items.some(i => i.key === key));

// The console's «ساخت پرامپت با هوش مصنوعی»: Claude writes a new prompt for an item's picture from its title and text
// and the prompt the current picture was made from.
const DRAFT = `You write a detailed prompt for an image model that draws the teaching pictures of a Danish driving-theory app (category B): road signs, road markings, signals and right-of-way situations.
You get one topic (its Danish code and name if it has one, its Persian title and explanation) and the prompt the current picture was made from.

Write ONE prompt in English of 250 to 500 words for a new picture of the same topic. Keep the current prompt's format and every rule it sets (e.g. redrawing the reference sign exactly, the colour code of the cars and arrows, the bird's-eye view), and make it much more complete and exact, in these labelled parts (leave a part out only if it truly does not apply):
WHAT THE PICTURE TEACHES: one or two sentences: the rule and exactly which details show it.
VIEWPOINT AND LAYOUT: the view (front view of a sign, bird's-eye view of a junction…), the road layout, number of lanes and directions, the junction's shape, kerbs, cycle tracks, pavements, islands.
TRAFFIC SIGNS: every sign: its Danish code, its meaning and its exact official Danish design (shape, border colour, background colour, symbol, numbers or letters, any plate under it), size, place and side.
ROAD MARKINGS: lane by lane: white or yellow, solid, broken or double, arrows and the way they point, stop lines, give-way triangles («shark teeth»), zebra crossings, cycle and bus lanes, hatched areas, and where each starts and ends.
SIGNALS: which lamp or arrow of each traffic light is lit, police signals, when present.
ROAD USERS: each vehicle, cyclist and pedestrian: type, colour (keep the current colour code), position, lane, direction, path arrow, lit indicators.
MUST NOT APPEAR: anything that would make the picture wrong or unclear.

Everything the explanation teaches must be clearly visible and correct for Denmark (right-hand traffic, official Danish designs). The focus is on driving: signs, markings, signals and road users; scenery only as little as needed. No readable text except what is on the signs; no logos or watermarks.
The picture MUST be in the app's picture style, the style of its road-sign pictures: a clean flat vector illustration, never photorealistic or a 3D render. Do not write a style line of your own: the app adds its style line after your prompt.
Answer with the prompt only.`;
function itemOf(key) {
  for (const g of DATA.signs) { if (g.thumb === key) return { title: g.title, text: g.blurb || '' }; const i = g.items.find(x => x.key === key); if (i) return { code: i.code, da: i.da, title: i.fa, text: i.text || '' }; }
  for (const g of DATA.priority) { if (g.thumb === key) return { title: g.title, text: g.blurb || '' }; const i = g.items.find(x => x.key === key); if (i) return { title: i.title, text: [i.text, i.first && `Who goes first: ${i.first}`].filter(Boolean).join('\n') }; }
  return null;
}
async function draft(key) {
  const it = itemOf(key), p = imagegen.guidePrompt(key);
  if (!it) throw Object.assign(new Error('این مورد پیدا نشد.'), { status: 404 });
  const part = key.startsWith('p-') ? 'priority' : 'signs';
  return imagegen.withHouseStyle(await imagegen.writeText(DRAFT, [it.code && `Code: ${it.code}`, it.da && `Danish name: ${it.da}`, `Title (Persian): ${it.title}`, it.text && `Explanation (Persian): ${it.text}`,
    p ? `Current prompt:\n${p.prompt}` : '', `The app's style line (added after your prompt):\n${imagegen.houseStyle(part)}`].filter(Boolean).join('\n'), null, 3000), part);
}
// «تایید ساخت تصویر»: a new picture from the (edited) prompt; a sign is redrawn from its official drawing as before.
// Once made it replaces the item's made picture (one per item), shown on the main site if the made picture is chosen.
function generate(key, prompt) {
  if (!itemOf(key)) throw Object.assign(new Error('این مورد پیدا نشد.'), { status: 404 });
  prompt = String(prompt || '').trim().slice(0, 20000);
  if (!prompt) throw Object.assign(new Error('پرامپت خالی است.'), { status: 400 });
  const p = imagegen.guidePrompt(key) || {};
  return imagegen.startOneOff(`guide-${key}`, { prompt, aspect: p.aspect || '4:3', ref: p.ref ? path.join(__dirname, 'data', 'guide-ref', p.ref) : '', target: `guide:${key}` });
}

// The console's «اعمال اصلاحات روی همین تصویر» for a sign or right-of-way picture: its current made picture is corrected
// in the marked parts only (imagegen.startOneOff with a base picture) and goes in its place once made.
async function editRegions(key, { instruction, marked, regions, prompt }) {
  if (!itemOf(key)) throw Object.assign(new Error('این مورد پیدا نشد.'), { status: 404 });
  const base = await imagegen.guideBlob(key);
  if (!base) throw Object.assign(new Error('این مورد هنوز تصویر AI ندارد.'), { status: 404 });
  const p = imagegen.guidePrompt(key) || {}, b = { mime: base.mime, data: base.data };
  return imagegen.startOneOff(`guide-${key}`, { prompt: imagegen.regionPrompt(instruction), aspect: p.aspect || '4:3', target: `guide:${key}`, images: [b, marked], regions, base: b, record: prompt });
}

// What the app (the main site) shows for an item: 'ai' (the made picture), 'official' (a sign's official drawing),
// 'prove' (prove.dk's picture) or
// 'cand' (the new picture made in the console: it becomes the made picture). Choosing keeps one made picture: the
// one not chosen of the old and the new is deleted.
async function choose(key, choice) {
  const m = meta();
  if (choice === 'cand') {
    const b = await imagegen.oneOffBlob(`guide-${key}`);
    if (!b) throw Object.assign(new Error('تصویر تازه‌ای برای این مورد نیست.'), { status: 409 });
    await imagegen.guidePut(key, b);
    await imagegen.dropOneOff(`guide-${key}`);
    delete m.choice[key];
    return save();
  }
  const c = imagegen.oneOff(`guide-${key}`);
  if (c && c.done) await imagegen.dropOneOff(`guide-${key}`);
  if (!MAP[key]) { if (known(key) && choice !== 'official') return save(); throw Object.assign(new Error('این مورد پیدا نشد.'), { status: 404 }); }
  if (choice === 'prove') {
    if (!(m.items[key] || {}).prove) throw Object.assign(new Error('تصویر prove.dk این مورد هنوز دریافت نشده است.'), { status: 409 });
    m.choice[key] = 'prove';
  } else if (choice === 'official') {
    if (!MAP[key].official) throw Object.assign(new Error('برای این مورد طرح رسمی وجود ندارد.'), { status: 400 });
    if (!(m.items[key] || {}).off) throw Object.assign(new Error('طرح رسمی این تابلو هنوز دریافت نشده است.'), { status: 409 });
    m.choice[key] = 'official';
  } else delete m.choice[key];
  return save();
}

// For the admin panel: kind = prove | official | ai.
async function refBlob(kind, key) {
  if (kind === 'ai') return imagegen.guideBlob(key);
  if (kind === 'cand') return imagegen.oneOffBlob(`guide-${key}`);
  if (!MAP[key]) return null;
  return store.getBlob(`${kind === 'official' ? 'ref-off' : 'ref-prove'}-${key}`);
}

// What the app gets: the made pictures (signs on white), with the official drawing wherever the admin chose it.
function versions() {
  const m = meta(), v = imagegen.guideVersions();
  for (const k of Object.keys(v)) if (k.startsWith('s-')) v[k] += 'w';   // the whitened version is a new picture for caches
  for (const [k, c] of Object.entries(m.choice)) {
    const it = m.items[k] || {};
    if (c === 'official' && it.off) v[k] = `o${it.off.toString(36)}`;
    else if (c === 'prove' && it.prove) v[k] = `p${it.prove.toString(36)}`;
  }
  for (const k of Object.keys(v)) v[k] += 'j';   // served small (guideweb.js) since: new pictures for the caches
  return v;
}
// For the app's copy at /app: prove.dk's picture wherever it is copied in («p» + when), else what the app gets.
function proveVersions() {
  const m = meta(), v = versions();
  for (const [k, it] of Object.entries(m.items)) if (it.prove && MAP[k]) v[k] = `p${it.prove.toString(36)}`;
  return v;
}
// What /guide-art/<key>.png is made from: the official drawing or prove.dk's picture wherever the admin chose it, else
// the made picture (a sign's to be whitened).
async function source(key) {
  const m = meta();
  if (m.choice[key] === 'official' && (m.items[key] || {}).off) { const b = await store.getBlob(`ref-off-${key}`); if (b) return { b }; }
  if (m.choice[key] === 'prove' && (m.items[key] || {}).prove) { const b = await store.getBlob(`ref-prove-${key}`); if (b) return { b }; }
  return { b: await imagegen.guideBlob(key), white: key.startsWith('s-') };
}

// What the app downloads (guideweb.js): the picture at size l | m | s, made once per version in a worker thread and
// kept in the database (blobs gw-<size>-<key>-<version>), so neither a restart nor a new deploy makes it again; the
// last ones used are also kept in memory. A visit never waits on the work of another: each picture is made once at a
// time, and the ones not made yet are made in the background a little after the start (warm).
let worker = null, jobs = new Map(), seq = 0;
function work(b, white) {
  if (!worker) {
    const { Worker } = require('node:worker_threads');
    worker = new Worker(path.join(__dirname, 'guideweb.js'));
    worker.unref();
    worker.on('message', ({ id, out, error }) => { const j = jobs.get(id); jobs.delete(id); if (j) error ? j.reject(new Error(error)) : j.resolve(out); });
    const fail = e => { worker = null; for (const j of jobs.values()) j.reject(e || new Error('worker stopped')); jobs.clear(); };
    worker.on('error', fail); worker.on('exit', () => fail());
  }
  const id = ++seq, data = new Uint8Array(b.data).buffer;   // a copy of its own, handed over to the worker
  return new Promise((resolve, reject) => { jobs.set(id, { resolve, reject }); worker.postMessage({ id, data, mime: b.mime, white }, [data]); });
}
const SIZES = ['l', 'm', 's'], MEM_MAX = 48e6;
const mem = new Map(); let memBytes = 0;
const remember = (id, b) => {
  if (mem.has(id)) return;
  mem.set(id, b); memBytes += b.data.length;
  for (const [k, x] of mem) { if (memBytes <= MEM_MAX) break; mem.delete(k); memBytes -= x.data.length; }
};
const making = new Map();
const blobName = (size, key, v) => `gw-${size}-${key}-${v}`;
async function make(key, v) {
  const { b, white } = await source(key);
  if (!b) return null;
  let out = null;
  try { out = await work(b, white); } catch (e) { console.error('guide web', key, e.message); }
  if (!out) out = { l: b, m: b, s: b };   // not a PNG, or the work failed: the picture as it is
  for (const size of SIZES) { await store.saveBlob(blobName(size, key, v), out[size].mime, out[size].data); remember(`${size}:${key}:${v}`, out[size]); }
  return out;
}
async function webBlob(key, size = 'l') {
  if (!SIZES.includes(size)) size = 'l';
  const v = versions()[key];
  if (!v) return null;
  const id = `${size}:${key}:${v}`;
  if (mem.has(id)) { const b = mem.get(id); mem.delete(id); mem.set(id, b); return b; }
  const saved = await store.getBlob(blobName(size, key, v));
  if (saved) { remember(id, saved); return saved; }
  const mk = `${key}:${v}`;
  if (!making.has(mk)) making.set(mk, make(key, v).finally(() => making.delete(mk)));
  const out = await making.get(mk);
  return out && out[size];
}
// Makes every picture not in the database yet, one after another, and deletes the ones of older versions.
async function warm() {
  if (!store.blobKeys) return;
  const have = new Set(await store.blobKeys('gw-')), v = versions(), want = new Set();
  for (const [key, ver] of Object.entries(v)) for (const size of SIZES) want.add(blobName(size, key, ver));
  for (const k of have) if (!want.has(k)) await store.deleteBlob(k);
  for (const [key, ver] of Object.entries(v)) {
    if (have.has(blobName('s', key, ver)) || making.has(`${key}:${ver}`)) continue;
    await webBlob(key).catch(e => console.error('guide web', key, e.message));
  }
}

// One sign or right-of-way item in full for the console's marked list: its row as in list(), its group and its text.
function item(key) {
  for (const g of list().groups) {
    const r = g.items.find(x => x.key === key);
    if (r) { const t = itemOf(key) || {}; return { ...r, kind: g.kind, group: g.title, text: t.text || '', da: t.da || '' }; }
  }
  return null;
}

module.exports = { init, startImport, editRegions, list, item, choose, draft, generate, refBlob, versions, proveVersions, webBlob };
