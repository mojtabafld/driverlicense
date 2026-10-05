// Comparing the teaching pictures (signs, right of way) with prove.dk's, in the admin panel.
// data/prove-map.json (from data/guide-src/build.py) says where each item's picture is on prove.dk and whether the
// sign's official drawing is on Wikimedia Commons. «دریافت تصاویر مرجع» copies them into the database once (blobs
// ref-prove-<key>, ref-off-<key>), so the comparison does not depend on the prove.dk account. prove.dk's pictures are
// only for the admin's comparison and are never served to the app; for a sign the admin may choose the official drawing
// (public domain) instead of the made picture, which /guide-art/<key>.png then serves.
// store.meta.guideRef = { items: { [key]: { prove?: at, off?: at } }, choice: { [key]: 'official' }, run: {…} }.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const UA = 'TeoriProve/1.0 (https://kore.mintcloud.info; driving-theory study app)';
const read = f => JSON.parse(fs.readFileSync(path.join(__dirname, f), 'utf8'));
let store = null, imagegen = null, MAP = {}, DATA = { signs: [], priority: [] };

function init(s, ig) {
  store = s; imagegen = ig;
  try { MAP = read('data/prove-map.json'); DATA = read('mobile/src/lib/guide-data.json'); } catch (e) { console.error('guide refs', e.message); }
  const r = meta().run;
  if (r && !r.done) { r.done = true; r.stopped = true; save().catch(() => {}); }   // an import cut short by a restart
}
const meta = () => (store.meta.guideRef = store.meta.guideRef || { items: {}, choice: {} });
const save = () => store.saveMeta('guideRef', meta());

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
    canOfficial: !!(MAP[key] || {}).official, choice: m.choice[key] || 'ai', onProve: !!MAP[key] });
  const groups = [
    ...DATA.signs.map(g => ({ kind: 'signs', id: g.id, title: g.title, items: g.items.map(i => row(i.key, i.fa, i.code)) })),
    ...DATA.priority.map(g => ({ kind: 'priority', id: g.id, title: g.title, items: g.items.map(i => row(i.key, i.title, '')) })),
  ];
  return { groups, run: m.run || null };
}

function choose(key, choice) {
  const m = meta();
  if (!MAP[key]) throw Object.assign(new Error('این مورد پیدا نشد.'), { status: 404 });
  if (choice === 'official') {
    if (!MAP[key].official) throw Object.assign(new Error('برای این مورد طرح رسمی وجود ندارد.'), { status: 400 });
    if (!(m.items[key] || {}).off) throw Object.assign(new Error('طرح رسمی این تابلو هنوز دریافت نشده است.'), { status: 409 });
    m.choice[key] = 'official';
  } else delete m.choice[key];
  return save();
}

// For the admin panel: kind = prove | official | ai.
async function refBlob(kind, key) {
  if (kind === 'ai') return imagegen.guideBlob(key);
  if (!MAP[key]) return null;
  return store.getBlob(`${kind === 'official' ? 'ref-off' : 'ref-prove'}-${key}`);
}

// What the app gets: the made pictures, with the official drawing wherever the admin chose it.
function versions() {
  const m = meta(), v = imagegen.guideVersions();
  for (const [k, c] of Object.entries(m.choice)) if (c === 'official' && (m.items[k] || {}).off) v[k] = `o${m.items[k].off.toString(36)}`;
  return v;
}
async function blob(key) {
  const m = meta();
  if (m.choice[key] === 'official' && (m.items[key] || {}).off) { const b = await store.getBlob(`ref-off-${key}`); if (b) return b; }
  return imagegen.guideBlob(key);
}

module.exports = { init, startImport, list, choose, refBlob, versions, blob };
