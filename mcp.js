// Teoripro's MCP server for Claude (Mojtaba 2026-11-12): the admin's read-only tools, so Claude (Claude Code, or
// claude.ai as a custom connector) reads the app's state itself instead of screenshots or ssh. Streamable HTTP at /mcp,
// JSON-RPC over POST with a JSON answer (no event stream, no sessions).
// - Access: MCP_TOKEN (the vault; 32+ characters) as «Authorization: Bearer …», or in the address, /mcp/<token>, for a
//   client that cannot send a header (a claude.ai connector). Without MCP_TOKEN the endpoint is off. Wrong tokens from
//   one address are slowed down (FAILS in 10 minutes, then 429), and each refusal and each tool call is in the
//   admins' log (audit.js) as «mcp:…».
// - Read only: no tool changes anything. Nothing personal leaves: no email, name, username, IP or device, no key or
//   setting value, only counts and the app's own texts (a user's report keeps its text, which the user wrote to the
//   admins).
'use strict';
const crypto = require('node:crypto');

const PROTOCOLS = ['2025-06-18', '2025-03-26', '2024-11-05'];
const FAILS = 10;
const fails = new Map();   // ip → [times]

module.exports = function makeMcp({ getStore, adminStats, audit, clientIp, version, commit, bank }) {
  const sto = () => getStore();
  const token = () => String(process.env.MCP_TOKEN || '').trim();
  const same = (a, b) => crypto.timingSafeEqual(crypto.createHash('sha256').update(a).digest(), crypto.createHash('sha256').update(b).digest());
  const json = (res, code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(obj)); };
  const clip = (s, n) => { s = String(s ?? ''); return s.length > n ? s.slice(0, n) + '…' : s; };
  const num = (v, def, lo, hi) => { const n = Math.round(+v); return Number.isFinite(n) ? Math.max(lo, Math.min(hi, n)) : def; };
  const stat = xs => xs.length ? { now: xs[xs.length - 1], avg: Math.round(xs.reduce((a, b) => a + b, 0) / xs.length * 10) / 10, max: Math.max(...xs) } : null;

  const TOOLS = [
    { name: 'system_status', title: 'System status',
      description: "The server's state: version and commit running, uptime, storage, number of accounts, the last 24 hours of CPU, memory and network, the stored sizes, and the newest backups.",
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      run: async () => {
        const m = require('./monitor').report(), pts = m.points || [];
        const backups = (await require('./backup').list().catch(() => [])).slice(0, 5);
        return {
          version, commit: commit(), node: process.version, upSeconds: Math.round(process.uptime()), storage: sto().kind || 'file',
          accounts: Object.keys(sto().users).length, host: m.host,
          last24h: { cpuPct: stat(pts.map(p => p.cpu || 0)), appCpuPct: stat(pts.map(p => p.app || 0)), memPct: stat(pts.map(p => p.mem || 0)),
            rxKBs: stat(pts.map(p => p.rx || 0)), txKBs: stat(pts.map(p => p.tx || 0)), points: pts.length },
          sizes: m.sizes, backups,
        };
      } },
    { name: 'ai_usage', title: 'AI usage and models',
      description: "The AI gateway: today's calls and cost by task, the last 14 days, the daily budget, the model each AI part runs on (config/ai-models.json), the RAG index, and the latest calls (task, model, result, time, cost).",
      inputSchema: { type: 'object', properties: { recent: { type: 'integer', minimum: 0, maximum: 50, description: 'How many of the latest calls (default 20).' } }, additionalProperties: false },
      run: async a => {
        const r = require('./aigateway').report();
        const recent = (r.recent || []).slice(0, num(a.recent, 20, 0, 50)).map(x => ({ at: x.at, task: x.task, model: x.model, ok: x.ok, stop: x.stop, error: x.error, in: x.in, out: x.out, usd: x.usd, ms: x.ms }));
        return { today: r.today, days: r.days, budgetUsd: r.budget, models: r.effective, modelsFile: r.file, rag: require('./rag').info(), recent };
      } },
    { name: 'app_stats', title: 'App statistics',
      description: 'Counts over all accounts: users (new, active, guests, premium, trial), tests (today, 7 days, full exams, passed), answers right in the last 30 days, languages, test modes, purchases and revenue, and the same per day for 30 days. No account is named.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      run: async () => { const s = adminStats(); return { totals: s.totals, perDay: s.days, visitsPerDay: s.visitDays }; } },
    { name: 'question_stats', title: 'Hardest questions',
      description: 'The questions answered wrong most often, over every account\'s tests: id, how often answered, the share wrong, the topic and the start of the Danish question. Only questions answered at least min_answers times.',
      inputSchema: { type: 'object', properties: {
        limit: { type: 'integer', minimum: 1, maximum: 100, description: 'How many (default 20).' },
        min_answers: { type: 'integer', minimum: 1, maximum: 10000, description: 'Least answers to be counted (default 20).' },
        ids: { type: 'array', items: { type: 'integer' }, maxItems: 100, description: 'Only these questions (then min_answers and the order by difficulty do not apply).' } }, additionalProperties: false },
      run: async a => {
        const per = new Map();
        for (const u of Object.values(sto().users)) for (const t of u.attempts || []) for (const it of t.items || []) {
          const x = per.get(it.id) || { n: 0, wrong: 0 }; x.n++; if (!it.ok) x.wrong++; per.set(it.id, x);
        }
        const { Q } = bank();
        const row = (id, x) => { const q = Q.get(id) || {}; return { id, answers: x.n, wrongPct: Math.round(x.wrong / x.n * 1000) / 10, topic: q.c, question: clip(q.sda || q.da || '', 160) }; };
        if (Array.isArray(a.ids) && a.ids.length) return { questions: a.ids.slice(0, 100).map(id => row(+id, per.get(+id) || { n: 0, wrong: 0 })) };
        const min = num(a.min_answers, 20, 1, 10000);
        const out = [...per].filter(([, x]) => x.n >= min).sort((p, q) => q[1].wrong / q[1].n - p[1].wrong / p[1].n || q[1].n - p[1].n)
          .slice(0, num(a.limit, 20, 1, 100)).map(([id, x]) => row(id, x));
        return { counted: per.size, questions: out };
      } },
    { name: 'user_reports', title: 'Reports from the app',
      description: "The bug reports and ideas users sent from the app («گزارش خطا»), newest first: when, kind, the text, platform, app version and app language. Who sent it is left out.",
      inputSchema: { type: 'object', properties: { limit: { type: 'integer', minimum: 1, maximum: 100, description: 'How many (default 20).' } }, additionalProperties: false },
      run: async a => ({ reports: (sto().meta.reports || []).slice().reverse().slice(0, num(a.limit, 20, 1, 100))
        .map(r => ({ at: r.at, kind: r.kind, text: clip(r.text, 2000), platform: r.platform, version: r.version, ui: r.ui })) }) },
    { name: 'client_errors', title: 'App errors',
      description: 'Pages of the app that broke, newest first: when, the error, the first lines of its stack, the page and the app version. Who it happened to is left out.',
      inputSchema: { type: 'object', properties: { limit: { type: 'integer', minimum: 1, maximum: 100, description: 'How many (default 20).' } }, additionalProperties: false },
      run: async a => ({ errors: (sto().meta.clientErrors || []).slice().reverse().slice(0, num(a.limit, 20, 1, 100))
        .map(e => ({ at: e.at, message: e.message, stack: String(e.stack || '').split('\n').slice(0, 8).join('\n'), path: e.path, version: e.version })) }) },
    { name: 'duplicate_questions', title: 'Near-duplicate questions',
      description: "Pairs of «آزمون جدید» questions that say nearly the same (RAG similarity), most alike first. Empty while the vectors are still loading after a restart.",
      inputSchema: { type: 'object', properties: { min: { type: 'number', minimum: 0.8, maximum: 0.99, description: 'Least similarity (default 0.93).' } }, additionalProperties: false },
      run: async a => {
        const min = Number.isFinite(+a.min) ? Math.max(0.8, Math.min(0.99, +a.min)) : 0.93;
        return require('./rag').duplicates({ min }) || { pending: true };
      } },
    { name: 'question_notes', title: 'Question notes',
      description: "The short notes on a question's usual mistake that go into the AI explanations: proposed, approved or rejected, in Persian and English.",
      inputSchema: { type: 'object', properties: { status: { type: 'string', enum: ['proposed', 'approved', 'rejected', 'all'], description: 'Which (default proposed: waiting for an admin).' } }, additionalProperties: false },
      run: async a => {
        const want = a.status || 'proposed';
        const all = Object.entries(sto().meta.qNotes || {}).map(([qid, n]) => ({ qid: +qid, status: n.status || 'proposed', fa: n.fa, en: n.en, at: n.at, decided: n.decided, v: n.v }));
        return { notes: want === 'all' ? all : all.filter(n => n.status === want) };
      } },
    { name: 'admin_log', title: "Admins' log",
      description: "The admins' actions and refused requests (audit.js), newest first: when, what, the method and the answer's status. Who and from where are left out.",
      inputSchema: { type: 'object', properties: { limit: { type: 'integer', minimum: 1, maximum: 200, description: 'How many (default 50).' } }, additionalProperties: false },
      run: async a => ({ entries: audit.list().slice(0, num(a.limit, 50, 1, 200)).map(e => ({ at: e.at, act: e.act, m: e.m, code: e.code, n: e.n })) }) },
  ];
  const byName = new Map(TOOLS.map(t => [t.name, t]));

  async function rpc(msg, ip) {
    const id = msg && msg.id, isCall = msg && Object.prototype.hasOwnProperty.call(msg, 'id');
    const ok = result => (isCall ? { jsonrpc: '2.0', id, result } : null);
    const err = (code, message) => (isCall ? { jsonrpc: '2.0', id: id ?? null, error: { code, message } } : null);
    if (!msg || msg.jsonrpc !== '2.0' || typeof msg.method !== 'string') return err(-32600, 'invalid request');
    const p = msg.params || {};
    switch (msg.method) {
      case 'initialize':
        return ok({ protocolVersion: PROTOCOLS.includes(p.protocolVersion) ? p.protocolVersion : PROTOCOLS[0],
          capabilities: { tools: { listChanged: false } }, serverInfo: { name: 'teoripro', title: 'Teoripro', version },
          instructions: 'Read-only tools for the Teoripro driving-theory app (teori.bitlane.app): the server, AI use and models, app statistics, the hardest questions, reports and errors from the app, near-duplicate questions, question notes and the admins\' log. Nothing personal is returned.' });
      case 'ping': return ok({});
      case 'tools/list':
        return ok({ tools: TOOLS.map(({ name, title, description, inputSchema }) => ({ name, title, description, inputSchema, annotations: { title, readOnlyHint: true, openWorldHint: false } })) });
      case 'tools/call': {
        const t = byName.get(p.name);
        if (!t) return err(-32602, `unknown tool: ${clip(p.name, 60)}`);
        audit.record({ by: 'mcp', act: `mcp:${t.name}`, m: 'POST', code: 200, ip });
        try {
          const out = await t.run(p.arguments && typeof p.arguments === 'object' ? p.arguments : {});
          return ok({ content: [{ type: 'text', text: JSON.stringify(out) }], structuredContent: out });
        } catch (e) {
          console.error('mcp', t.name, e);
          return ok({ content: [{ type: 'text', text: `The tool failed: ${clip(e.message, 300)}` }], isError: true });
        }
      }
      default:
        if (msg.method.startsWith('notifications/')) return null;
        return err(-32601, `method not found: ${clip(msg.method, 60)}`);
    }
  }

  // `rest`: what follows /mcp in the address ('' or '/<token>').
  return async function handle(req, res, rest) {
    const ip = clientIp(req), now = Date.now();
    if (!token() || token().length < 32) return json(res, 503, { error: 'MCP is not set up (MCP_TOKEN)' });
    const recent = (fails.get(ip) || []).filter(t => now - t < 10 * 60e3);
    if (recent.length >= FAILS) { res.setHeader('Retry-After', '600'); return json(res, 429, { error: 'too many tries' }); }
    const given = /^Bearer\s+(.+)$/i.exec(String(req.headers.authorization || ''))?.[1]?.trim() || decodeURIComponent(String(rest || '').replace(/^\//, ''));
    if (!given || !same(given, token())) {
      recent.push(now); fails.set(ip, recent);
      if (fails.size > 5000) fails.clear();
      audit.record({ by: 'mcp', act: 'denied:mcp', m: req.method, code: 401, ip });
      res.setHeader('WWW-Authenticate', 'Bearer');
      return json(res, 401, { error: 'unauthorized' });
    }
    if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(res, 405, { error: 'POST only' }); }
    let body;
    try {
      body = await new Promise((resolve, reject) => {
        let size = 0; const chunks = [];
        req.on('data', c => { size += c.length; if (size > 256e3) { reject(new Error('too large')); req.destroy(); } else chunks.push(c); });
        req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch { reject(new Error('bad json')); } });
        req.on('error', reject);
      });
    } catch { return json(res, 400, { jsonrpc: '2.0', id: null, error: { code: -32700, message: 'parse error' } }); }
    const batch = Array.isArray(body), msgs = batch ? body.slice(0, 20) : [body];
    const answers = (await Promise.all(msgs.map(m => rpc(m, ip)))).filter(Boolean);
    if (!answers.length) { res.writeHead(202); return res.end(); }
    return json(res, 200, batch ? answers : answers[0]);
  };
};
