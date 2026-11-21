// Lists the Persian texts of the app that have no English / Danish yet in src/lib/i18n/strings.json (see
// src/lib/i18n.ts): TS/TSX literals, JSX text (# for each {…}), template literals (# for each ${…}), guide-data.json,
// the bank's topics and sections (site/data.js) and the server's error messages. Run: node scripts/i18n-missing.js
// Texts built at run time from other parts can still be missed; on the web, window.__i18nMiss lists those shown.
const fs = require('fs'), path = require('path');
const ts = require('typescript');
const ROOT = path.join(__dirname, '..', 'src');
const P = /[؀-ۿ]/;
const out = new Map(); // key -> {file}
const add = (s, file, jsx) => { s = jsx ? s.replace(/\s+/g, ' ').trim() : s.trim(); s = s.replace(/«#»/g, '«@»'); if (!s || !P.test(s)) return; if (!out.has(s)) out.set(s, file); };
const exprText = (e, sf) => {
  if (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) return e.text;
  return '#';
};
function walk(dir) { for (const f of fs.readdirSync(dir)) { const p = path.join(dir, f); if (fs.statSync(p).isDirectory()) walk(p); else if (/\.tsx?$/.test(f)) file(p); } }
function file(p) {
  const src = fs.readFileSync(p, 'utf8');
  const sf = ts.createSourceFile(p, src, ts.ScriptTarget.Latest, true, p.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const rel = path.relative(ROOT, p);
  const visit = n => {
    if (ts.isJsxElement(n)) {
      const kids = n.children.filter(k => !(ts.isJsxText(k) && !k.text.trim()));
      if (kids.length > 1 && kids.every(k => ts.isJsxText(k) || ts.isJsxExpression(k)) && kids.some(k => ts.isJsxText(k) && P.test(k.text))) {
        add(n.children.map(k => ts.isJsxText(k) ? k.text : k.expression ? exprText(k.expression, sf) : '').join(''), rel, true);
      }
    }
    if (ts.isJsxText(n)) add(n.text, rel, true);
    else if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
      if (!(n.parent && ts.isImportDeclaration(n.parent))) add(n.text, rel);
    } else if (ts.isTemplateExpression(n)) {
      let s = n.head.text; for (const sp of n.templateSpans) s += exprText(sp.expression, sf) + sp.literal.text;
      add(s, rel);
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
}
walk(ROOT);
const g = JSON.parse(fs.readFileSync(ROOT + '/lib/guide-data.json', 'utf8'));
const deep = (v, f) => { if (typeof v === 'string') add(v, f); else if (v && typeof v === 'object') for (const x of Object.values(v)) deep(x, f); };
deep(g, 'lib/guide-data.json');
const d = fs.readFileSync(path.join(ROOT, '..', '..', 'site', 'data.js'), 'utf8');
const B = JSON.parse(d.slice(d.indexOf('{'), d.lastIndexOf('}') + 1));
for (const t of Object.values(B.topics)) { add(t.fa, 'bank.topics'); t.lesson.forEach(x => add(x, 'bank.lessons')); }
for (const s of B.sections) add(s.fa, 'bank.sections');
const srv = fs.readFileSync(path.join(ROOT, '..', '..', 'server.js'), 'utf8');
for (const m of srv.matchAll(/error: '([^']+)'/g)) add(m[1], 'server.js');
const have = require(path.join(ROOT, 'lib', 'i18n', 'strings.json'));
const missing = [...out].filter(([k]) => !have[k]).map(([k, f]) => ({ k, f }));
console.log(JSON.stringify(missing, null, 1));
console.error(`${missing.length} of ${out.size} texts have no translation`);
