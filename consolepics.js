// The questions' pictures for the admin's console (/console): each question's original picture (from prove.dk, in
// site/img) beside the pictures made for it (imagegen.js), and which one the app shows.
// Grouped two ways: by lesson (the bank's tests, «درس‌ها و آزمون‌ها») and by the parts of «قوانین» (the questions of
// each part's topics, as the app's practice for that part; the parts are read from mobile/src/lib/guide.ts).
'use strict';
const fs = require('node:fs');
const path = require('node:path');

let BANK = { tests: [], questions: [] }, Q = new Map(), RULES = [];

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
    const q = Q.get(id), x = images[id] || { jobs: [] };
    return { id, text: q.sfa || q.sda || '', da: q.sda || '', made: x.jobs.filter(j => j.blob).map(j => ({ id: j.id, at: j.at })), active: x.active || null };
  };
  const groups = kind === 'rules'
    ? RULES.map(r => ({ title: r.title, items: BANK.questions.filter(q => r.topics.includes(q.c) && q.img).map(q => item(q.id)) }))
    : BANK.tests.map(t => ({ title: t.title, items: t.qs.filter(id => Q.has(id) && Q.get(id).img).map(item) }));
  return { groups };
}

module.exports = { init, list };
