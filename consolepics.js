// The questions' pictures for the admin's console (/console): each question's original picture (from prove.dk, in
// site/img) beside the pictures made for it (imagegen.js), and which one the app shows.
// Grouped two ways: by lesson (the bank's tests, «درس‌ها و آزمون‌ها») and by the parts of «قوانین» (the questions of
// each part's topics, as the app's practice for that part; the parts are read from mobile/src/lib/guide.ts).
'use strict';
const fs = require('node:fs');
const path = require('node:path');

let BANK = { tests: [], questions: [] }, Q = new Map(), RULES = [];
const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

function init(siteDir) {
  try {
    const js = fs.readFileSync(path.join(siteDir, 'data.js'), 'utf8');
    BANK = JSON.parse(js.slice(js.indexOf('=') + 1).trim().replace(/;$/, ''));
    Q = new Map(BANK.questions.map(q => [q.id, q]));
  } catch (e) { console.error('console pictures: bank', e.message); }
  try {
    // RULES in guide.ts: one object per part, each with its title and (usually) its topics.
    const ts = fs.readFileSync(path.join(__dirname, 'mobile', 'src', 'lib', 'guide.ts'), 'utf8');
    const block = (/export const RULES[^=]*=\s*\[([\s\S]*?)\n\];/.exec(ts) || [])[1] || '';
    RULES = block.split(/\n {2}\},?\s*\n {2}\{/).map(part => ({
      title: (/title:\s*'([^']+)'/.exec(part) || [])[1],
      topics: [...((/topics:\s*\[([^\]]*)\]/.exec(part) || [])[1] || '').matchAll(/'([^']+)'/g)].map(m => m[1]),
    })).filter(r => r.title && r.topics.length);
  } catch (e) { console.error('console pictures: rules', e.message); }
}

// kind: 'lessons' | 'rules'; images: store.meta.images (imagegen.js: qid → { jobs, active }).
function list(kind, images = {}) {
  const item = id => {
    const q = Q.get(id), x = images[id] || { jobs: [] }, last = x.jobs[x.jobs.length - 1];
    // `making`: a picture on its way; `failed`: why the last one did not come.
    return { id, text: q.sfa || q.sda || '', da: q.sda || '', made: x.jobs.filter(j => j.blob).map(j => ({ id: j.id, at: j.at })), active: x.active || null,
      making: last && !last.done ? last.state : null, failed: last && last.done && !last.blob ? last.error || 'failed' : null };
  };
  // Exactly the questions the app has there: a lesson's (named as in the app, «درس N»), or a rules part's practice.
  const groups = kind === 'rules'
    ? RULES.map(r => ({ title: r.title, items: BANK.questions.filter(q => r.topics.includes(q.c)).map(q => item(q.id)) }))
    : BANK.tests.map((t, i) => ({ title: `درس ${faNum((t.title.match(/\d+/) || [String(i + 1)])[0])}`, items: t.qs.filter(id => Q.has(id)).map(item) }));
  return { groups };
}

// One question in full for the console's marked list: its text, its statements with the right answers, where it is in
// the app (lessons, parts of «قوانین») and its pictures as in list().
function detail(id, images = {}) {
  const q = Q.get(+id);
  if (!q) return null;
  const x = images[q.id] || { jobs: [] }, last = x.jobs[x.jobs.length - 1];
  const lessons = BANK.tests.map((t, i) => ({ t, i })).filter(({ t }) => t.qs.includes(q.id)).map(({ t, i }) => `درس ${faNum((t.title.match(/\d+/) || [String(i + 1)])[0])} · ${faNum(t.qs.indexOf(q.id) + 1)}`);
  return { qid: q.id, text: q.sfa || q.sda || '', da: q.sda || '', topic: (BANK.topics[q.c] || {}).fa || '',
    statements: q.st.map(s => ({ fa: s.fa || '', da: s.da || '', ok: !!s.ok })),
    lessons, rules: RULES.filter(r => r.topics.includes(q.c)).map(r => r.title),
    made: x.jobs.filter(j => j.blob).map(j => ({ id: j.id, at: j.at })), active: x.active || null,
    making: last && !last.done ? last.state : null, failed: last && last.done && !last.blob ? last.error || 'failed' : null };
}


// The step-by-step course's pictures (data/course-art.json) for the admin's picture page, by the lesson they are in:
// read from the course's files in mobile/src/lib (a lesson's `id` and `title`, then each `art` in it; the drills'
// extra questions under their lesson's id). A picture in no lesson is listed under «سایر».
let COURSE_GROUPS = null;
function courseGroups(keys) {
  if (COURSE_GROUPS) return COURSE_GROUPS;
  const dir = path.join(__dirname, 'mobile', 'src', 'lib'), titles = new Map(), groups = new Map(), seen = new Set();
  // and each picture's name: its step's title (a teaching step) or its question (a test's), from the text around it
  const names = {};
  const nameAt = (ts, at) => {
    const back = ts.slice(Math.max(0, at - 300), at), t = /title: '([^'\n]+)',?\s*$/.exec(back);
    if (t) return t[1];
    const f = /\bfa: '([^'\n]+)'/.exec(ts.slice(at, at + 1500));
    return f ? f[1] : '';
  };
  const add = (title, key, name) => { if (seen.has(key) || !keys.includes(key)) return; seen.add(key); names[key] = name; if (!groups.has(title)) groups.set(title, []); groups.get(title).push(key); };
  for (const f of ['course.ts', 'course-more.ts']) {
    let ts = ''; try { ts = fs.readFileSync(path.join(dir, f), 'utf8'); } catch { continue; }
    let cur = null;
    for (const m of ts.matchAll(/\bid: '([a-z0-9-]+)',\s*\n\s*title: '([^'\n]+)'|\bart: '([a-z0-9-]+)'/g)) {
      if (m[1]) { cur = m[2]; titles.set(m[1], m[2]); } else if (cur) add(cur, m[3], nameAt(ts, m.index));
    }
  }
  try {
    const ts = fs.readFileSync(path.join(dir, 'drill.ts'), 'utf8');
    let cur = null;
    for (const m of ts.matchAll(/^ {2}'?([a-z0-9-]+)'?: \[$|\bart: '([a-z0-9-]+)'/gm)) { if (m[1]) cur = titles.get(m[1]) || null; else if (cur) add(cur, m[2], nameAt(ts, m.index)); }
  } catch {}
  const rest = keys.filter(k => !seen.has(k));
  COURSE_GROUPS = [...groups].map(([title, items]) => ({ title, items: items.map(key => ({ key, name: names[key] || '' })) }));
  if (rest.length) COURSE_GROUPS.push({ title: 'سایر', items: rest.map(key => ({ key, name: '' })) });
  return COURSE_GROUPS;
}

module.exports = { init, list, detail, courseGroups };
