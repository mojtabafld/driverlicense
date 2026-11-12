// Labs MCP (Mojtaba 2026-11-12): Claude's tools for the server's own DevOps work — Containerlab, Docker and Compose,
// the system's services and state — over MCP's Streamable HTTP (JSON-RPC over POST, a JSON answer, no sessions).
// It is a service of its own, apart from Teoripro (/opt/labs-mcp, labs-mcp.service, its settings in
// /etc/labs-mcp/env), because these tools need root and Teoripro runs fenced in as its own user.
// - Listens on 127.0.0.1 only (LABS_MCP_PORT, default 8790); reached from outside through the Cloudflare Tunnel.
// - Access: LABS_MCP_TOKEN (32+ characters) as «Authorization: Bearer …», or in the address /mcp/<token> for a client
//   that cannot send a header (a claude.ai connector). 10 wrong tries from one address in 10 minutes: 10 minutes shut.
// - Every command runs without a shell (execFile, its arguments as a list), with a time limit, and its output clipped.
//   Files are read and written only inside LABS_DIR (default /opt/labs). Each call is logged in /var/log/labs-mcp.log
//   (the tool, its arguments without file contents, the exit code), never the output.
// - run_command (any shell command) is off unless LABS_MCP_SHELL=1; service_action only for the units named in
//   LABS_MCP_UNITS (comma-separated).
'use strict';
const http = require('node:http');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { execFile } = require('node:child_process');

const PORT = +process.env.LABS_MCP_PORT || 8790;
const TOKEN = String(process.env.LABS_MCP_TOKEN || '').trim();
const LABS_DIR = path.resolve(process.env.LABS_DIR || '/opt/labs');
const SHELL_ON = process.env.LABS_MCP_SHELL === '1';
const UNITS = new Set(String(process.env.LABS_MCP_UNITS || '').split(',').map(s => s.trim()).filter(Boolean));
const LOG = process.env.LABS_MCP_LOG || '/var/log/labs-mcp.log';
const VERSION = '1.0.0';
const PROTOCOLS = ['2025-06-18', '2025-03-26', '2024-11-05'];
const MAX_OUT = 60e3;

// ---------- helpers ----------
const clip = (s, n = MAX_OUT) => { s = String(s ?? ''); return s.length > n ? s.slice(0, n) + `\n… (${s.length - n} more characters)` : s; };
const num = (v, def, lo, hi) => { const n = Math.round(+v); return Number.isFinite(n) ? Math.max(lo, Math.min(hi, n)) : def; };
const NAME = /^[A-Za-z0-9][A-Za-z0-9_.:\/@-]{0,200}$/;   // a container, image, lab or node name
const name = (v, what) => { const s = String(v ?? ''); if (!NAME.test(s)) throw new Error(`bad ${what}`); return s; };
const strList = (v, what, max = 64) => {
  if (v === undefined) return [];
  if (!Array.isArray(v) || v.length > max || v.some(x => typeof x !== 'string' || x.length > 4000)) throw new Error(`${what}: a list of strings`);
  return v;
};
// A path inside LABS_DIR (relative to it, or absolute under it); throws for anything else.
function inLabs(p) {
  const full = path.resolve(LABS_DIR, String(p || ''));
  if (full !== LABS_DIR && !full.startsWith(LABS_DIR + path.sep)) throw new Error(`only paths inside ${LABS_DIR}`);
  return full;
}
function run(cmd, args, { timeout = 120e3, cwd, input } = {}) {
  return new Promise(resolve => {
    const p = execFile(cmd, args, { timeout, cwd, maxBuffer: 20e6, env: { ...process.env, LABS_MCP_TOKEN: '' } }, (err, stdout, stderr) => {
      resolve({ code: err ? (typeof err.code === 'number' ? err.code : -1) : 0, killed: !!(err && err.killed), stdout: clip(stdout), stderr: clip(stderr || (err && err.code === 'ENOENT' ? `${cmd} is not installed` : err ? err.message : ''), 20e3) });
    });
    if (input !== undefined) { p.stdin.end(input); }
  });
}
const jsonOr = s => { try { return JSON.parse(s); } catch { return s; } };
// (the arguments shortened, and values after -e / --env and secret-looking words hidden)
const quiet = v => typeof v === 'string' ? clip(v.replace(/((?:^|\s)(?:-e|--env)[ =]\S+?=)\S+/g, '$1…').replace(/((?:token|secret|password|passwd|key)[=:]\s*)\S+/gi, '$1…'), 200)
  : Array.isArray(v) ? v.map((x, i) => (i > 0 && /^(-e|--env)$/.test(v[i - 1]) ? String(x).replace(/=.*/, '=…') : quiet(x))) : v;
function log(entry) {
  if (entry.args && typeof entry.args === 'object') entry.args = Object.fromEntries(Object.entries(entry.args).map(([k, v]) => [k, k === 'text' ? '…' : quiet(v)]));
  fs.appendFile(LOG, JSON.stringify({ at: new Date().toISOString(), ...entry }) + '\n', () => {});
}

// ---------- the tools ----------
const obj = (properties = {}, required = []) => ({ type: 'object', properties, required, additionalProperties: false });
const S = (description, extra = {}) => ({ type: 'string', description, ...extra });
const I = (description, extra = {}) => ({ type: 'integer', description, ...extra });
const B = description => ({ type: 'boolean', description });
const A = description => ({ type: 'array', items: { type: 'string' }, description });

const TOOLS = [
  // --- the system ---
  { name: 'system_info', title: 'System info', read: true, description: 'Host name, uptime and load, memory, disks, the kernel, and the versions of Docker, Containerlab and Node.',
    schema: obj(), run: async () => {
      const [up, mem, df, uname, dv, cv] = await Promise.all([run('uptime', []), run('free', ['-h']), run('df', ['-h', '-x', 'tmpfs', '-x', 'overlay']), run('uname', ['-a']),
        run('docker', ['version', '--format', '{{.Server.Version}}']), run('containerlab', ['version'])]);
      return { uptime: up.stdout.trim(), memory: mem.stdout, disks: df.stdout, kernel: uname.stdout.trim(), docker: dv.stdout.trim() || dv.stderr.trim(), containerlab: cv.stdout.trim() || cv.stderr.trim(), node: process.version, labsDir: LABS_DIR, shell: SHELL_ON, units: [...UNITS] };
    } },
  { name: 'service_status', title: 'Service status', read: true, description: 'systemctl status of a unit (any unit; read only).',
    schema: obj({ unit: S('The unit, e.g. docker or teoripro.') }, ['unit']),
    run: async a => run('systemctl', ['status', '--no-pager', '--lines', '20', name(a.unit, 'unit')]) },
  { name: 'service_logs', title: 'Service logs', read: true, description: "A unit's journal (journalctl), newest last.",
    schema: obj({ unit: S('The unit.'), lines: I('How many lines (default 100, at most 2000).'), since: S('e.g. "1 hour ago" or "2026-11-12 09:00".', { maxLength: 40 }) }, ['unit']),
    run: async a => run('journalctl', ['-u', name(a.unit, 'unit'), '--no-pager', '-n', String(num(a.lines, 100, 1, 2000)), ...(a.since ? ['--since', String(a.since).slice(0, 40)] : [])]) },
  { name: 'service_action', title: 'Start, stop or restart a service', write: true, description: 'systemctl start, stop or restart, only for the units allowed in LABS_MCP_UNITS.',
    schema: obj({ unit: S('The unit.'), action: S('start, stop or restart.', { enum: ['start', 'stop', 'restart'] }) }, ['unit', 'action']),
    run: async a => {
      const u = name(a.unit, 'unit');
      if (!UNITS.has(u)) throw new Error(`${u} is not in LABS_MCP_UNITS (allowed: ${[...UNITS].join(', ') || 'none'})`);
      if (!['start', 'stop', 'restart'].includes(a.action)) throw new Error('action: start, stop or restart');
      return run('systemctl', [a.action, u]);
    } },
  { name: 'run_command', title: 'Run a shell command', write: true, destructive: true,
    description: 'Runs a command in bash as root on the server, in LABS_DIR. Off unless LABS_MCP_SHELL=1. Use the specific tools first.',
    schema: obj({ command: S('The command line.', { maxLength: 4000 }), timeout: I('Seconds (default 120, at most 1800).') }, ['command']),
    run: async a => {
      if (!SHELL_ON) throw new Error('run_command is off (LABS_MCP_SHELL=1 turns it on)');
      fs.mkdirSync(LABS_DIR, { recursive: true });
      return run('bash', ['-lc', String(a.command)], { cwd: LABS_DIR, timeout: num(a.timeout, 120, 1, 1800) * 1e3 });
    } },

  // --- files in LABS_DIR (topologies, compose files, configs) ---
  { name: 'files_list', title: 'List lab files', read: true, description: `Files in a folder inside LABS_DIR (${LABS_DIR}), with sizes; the topologies (*.clab.yml) are marked.`,
    schema: obj({ dir: S('A folder inside LABS_DIR (default its root).'), depth: I('How deep (default 3, at most 6).') }),
    run: async a => {
      const root = inLabs(a.dir || '.'), depth = num(a.depth, 3, 1, 6), out = [];
      const walk = (d, n) => {
        let items = []; try { items = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
        for (const e of items) {
          if (out.length >= 2000) return;
          const f = path.join(d, e.name), rel = path.relative(LABS_DIR, f);
          if (e.isDirectory()) { out.push({ path: rel + '/', dir: true }); if (n < depth && !/^(clab-|\.git$|node_modules$)/.test(e.name)) walk(f, n + 1); }
          else { let size = 0; try { size = fs.statSync(f).size; } catch {} out.push({ path: rel, size, topology: /\.clab\.ya?ml$/.test(e.name) || undefined }); }
        }
      };
      walk(root, 1);
      return { labsDir: LABS_DIR, files: out };
    } },
  { name: 'file_read', title: 'Read a lab file', read: true, description: 'The text of a file inside LABS_DIR (a topology, a compose file, a config).',
    schema: obj({ path: S('A path inside LABS_DIR.') }, ['path']),
    run: async a => { const f = inLabs(a.path); const st = fs.statSync(f); if (st.size > 2e6) throw new Error('file larger than 2 MB'); return { path: path.relative(LABS_DIR, f), text: fs.readFileSync(f, 'utf8') }; } },
  { name: 'file_write', title: 'Write a lab file', write: true, description: 'Creates or replaces a file inside LABS_DIR (folders made as needed), e.g. a new topology or a compose file.',
    schema: obj({ path: S('A path inside LABS_DIR.'), text: S('The whole content.', { maxLength: 1000000 }) }, ['path', 'text']),
    run: async a => { const f = inLabs(a.path); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, String(a.text)); return { written: path.relative(LABS_DIR, f), bytes: Buffer.byteLength(String(a.text)) }; },
    log: a => ({ path: a.path, bytes: Buffer.byteLength(String(a.text || '')) }) },
  { name: 'file_delete', title: 'Delete a lab file', write: true, destructive: true, description: 'Deletes a file (not a folder) inside LABS_DIR.',
    schema: obj({ path: S('A path inside LABS_DIR.') }, ['path']),
    run: async a => { const f = inLabs(a.path); if (fs.statSync(f).isDirectory()) throw new Error('a folder: not deleted'); fs.unlinkSync(f); return { deleted: path.relative(LABS_DIR, f) }; } },

  // --- Containerlab ---
  { name: 'clab_list', title: 'Running labs', read: true, description: 'Every running lab and its nodes (containerlab inspect --all).',
    schema: obj(), run: async () => { const r = await run('containerlab', ['inspect', '--all', '--format', 'json']); return r.code ? r : jsonOr(r.stdout); } },
  { name: 'clab_inspect', title: 'Inspect a lab', read: true, description: "One lab's nodes, their state, kinds, images and addresses, by its name or its topology file.",
    schema: obj({ name: S('The lab name.'), topology: S('Or its topology file inside LABS_DIR.'), details: B('Full details (default false).') }),
    run: async a => {
      const args = ['inspect', '--format', 'json', ...(a.topology ? ['-t', inLabs(a.topology)] : ['--name', name(a.name, 'lab name')]), ...(a.details ? ['--details'] : [])];
      const r = await run('containerlab', args); return r.code ? r : jsonOr(r.stdout);
    } },
  { name: 'clab_deploy', title: 'Deploy a lab', write: true, description: 'containerlab deploy of a topology file inside LABS_DIR. reconfigure removes the lab\'s old state first.',
    schema: obj({ topology: S('The topology file inside LABS_DIR.'), reconfigure: B('Start the lab from scratch (--reconfigure).'), extra: A('More containerlab deploy flags, e.g. ["--max-workers","4"].') }, ['topology']),
    run: async a => run('containerlab', ['deploy', '-t', inLabs(a.topology), ...(a.reconfigure ? ['--reconfigure'] : []), ...strList(a.extra, 'extra')], { cwd: path.dirname(inLabs(a.topology)), timeout: 1800e3 }) },
  { name: 'clab_redeploy', title: 'Redeploy a lab', write: true, destructive: true, description: 'containerlab redeploy (destroy, then deploy) of a topology inside LABS_DIR.',
    schema: obj({ topology: S('The topology file inside LABS_DIR.'), cleanup: B('Also remove the lab folder (--cleanup).') }, ['topology']),
    run: async a => run('containerlab', ['redeploy', '-t', inLabs(a.topology), ...(a.cleanup ? ['--cleanup'] : [])], { cwd: path.dirname(inLabs(a.topology)), timeout: 1800e3 }) },
  { name: 'clab_destroy', title: 'Destroy a lab', write: true, destructive: true, description: 'containerlab destroy of a lab, by its topology file or name. cleanup also removes its folder (configs, keys).',
    schema: obj({ topology: S('The topology file inside LABS_DIR.'), name: S('Or the lab name.'), cleanup: B('Also remove the lab folder (--cleanup).') }),
    run: async a => run('containerlab', ['destroy', ...(a.topology ? ['-t', inLabs(a.topology)] : ['--name', name(a.name, 'lab name')]), ...(a.cleanup ? ['--cleanup'] : [])], { timeout: 900e3 }) },
  { name: 'clab_exec', title: 'Run a command on lab nodes', write: true, description: "containerlab exec: a command on a lab's nodes (all, or the one named), e.g. a router's CLI command.",
    schema: obj({ lab: S('The lab name.'), node: S('One node (its short name); all nodes when left out.'), command: S('The command, as the node runs it.', { maxLength: 4000 }), format: S('plain or json (default plain).', { enum: ['plain', 'json'] }) }, ['lab', 'command']),
    run: async a => run('containerlab', ['exec', '--name', name(a.lab, 'lab name'), ...(a.node ? ['--label', `clab-node-name=${name(a.node, 'node')}`] : []), '--cmd', String(a.command), '--format', a.format === 'json' ? 'json' : 'plain'], { timeout: 300e3 }) },
  { name: 'clab_save', title: 'Save lab configs', write: true, description: "containerlab save: each node writes its running config into the lab's folder.",
    schema: obj({ name: S('The lab name.') }, ['name']),
    run: async a => run('containerlab', ['save', '--name', name(a.name, 'lab name')], { timeout: 600e3 }) },
  { name: 'clab_graph', title: 'Lab graph', read: true, description: 'The topology as a Mermaid diagram (containerlab graph --mermaid).',
    schema: obj({ topology: S('The topology file inside LABS_DIR.') }, ['topology']),
    run: async a => run('containerlab', ['graph', '-t', inLabs(a.topology), '--mermaid', '--mermaid-direction', 'LR'], { cwd: path.dirname(inLabs(a.topology)) }) },
  { name: 'clab', title: 'Any containerlab command', write: true, destructive: true, description: 'containerlab with the arguments given (no shell), for anything the tools above do not cover, e.g. ["tools","veth","create",…].',
    schema: obj({ args: A('The arguments after "containerlab".'), cwd: S('A folder inside LABS_DIR to run in.') }, ['args']),
    run: async a => run('containerlab', strList(a.args, 'args'), { cwd: a.cwd ? inLabs(a.cwd) : undefined, timeout: 1800e3 }) },

  // --- Docker ---
  { name: 'docker_ps', title: 'Containers', read: true, description: 'The containers (running, or all), with image, state, ports and names.',
    schema: obj({ all: B('Also the stopped ones (default false).') }),
    run: async a => { const r = await run('docker', ['ps', ...(a.all ? ['-a'] : []), '--format', '{{json .}}']); return r.code ? r : r.stdout.trim().split('\n').filter(Boolean).map(jsonOr); } },
  { name: 'docker_inspect', title: 'Inspect', read: true, description: 'docker inspect of a container, an image, a network or a volume.',
    schema: obj({ id: S('Its name or id.') }, ['id']),
    run: async a => { const r = await run('docker', ['inspect', name(a.id, 'id')]); return r.code ? r : jsonOr(r.stdout); } },
  { name: 'docker_logs', title: 'Container logs', read: true, description: "A container's log, newest last.",
    schema: obj({ id: S('Its name or id.'), tail: I('How many lines (default 200, at most 5000).'), since: S('e.g. "10m" or "2026-11-12T09:00".', { maxLength: 40 }) }, ['id']),
    run: async a => run('docker', ['logs', '--tail', String(num(a.tail, 200, 1, 5000)), ...(a.since ? ['--since', String(a.since).slice(0, 40)] : []), name(a.id, 'id')]) },
  { name: 'docker_stats', title: 'Container usage', read: true, description: 'CPU, memory, network and disk use of the running containers, once.',
    schema: obj(), run: async () => { const r = await run('docker', ['stats', '--no-stream', '--format', '{{json .}}']); return r.code ? r : r.stdout.trim().split('\n').filter(Boolean).map(jsonOr); } },
  { name: 'docker_images', title: 'Images', read: true, description: 'The images on the server.',
    schema: obj(), run: async () => { const r = await run('docker', ['images', '--format', '{{json .}}']); return r.code ? r : r.stdout.trim().split('\n').filter(Boolean).map(jsonOr); } },
  { name: 'docker_networks', title: 'Networks and volumes', read: true, description: "Docker's networks and volumes.",
    schema: obj(), run: async () => {
      const [n, v] = await Promise.all([run('docker', ['network', 'ls', '--format', '{{json .}}']), run('docker', ['volume', 'ls', '--format', '{{json .}}'])]);
      const rows = r => r.stdout.trim().split('\n').filter(Boolean).map(jsonOr);
      return { networks: rows(n), volumes: rows(v) };
    } },
  { name: 'docker_container', title: 'Start, stop, restart or remove a container', write: true, destructive: true, description: 'docker start, stop, restart, kill, pause, unpause or rm (rm with force when asked).',
    schema: obj({ id: S('Its name or id.'), action: S('The action.', { enum: ['start', 'stop', 'restart', 'kill', 'pause', 'unpause', 'rm'] }), force: B('For rm: also a running one.') }, ['id', 'action']),
    run: async a => {
      if (!['start', 'stop', 'restart', 'kill', 'pause', 'unpause', 'rm'].includes(a.action)) throw new Error('bad action');
      return run('docker', [a.action, ...(a.action === 'rm' && a.force ? ['-f'] : []), name(a.id, 'id')], { timeout: 300e3 });
    } },
  { name: 'docker_pull', title: 'Pull an image', write: true, description: 'docker pull of an image.',
    schema: obj({ image: S('e.g. ghcr.io/nokia/srlinux:latest') }, ['image']),
    run: async a => run('docker', ['pull', name(a.image, 'image')], { timeout: 1800e3 }) },
  { name: 'docker_run', title: 'Run a container', write: true, description: 'docker run -d with the options and command given (no shell), e.g. options ["--name","web","-p","8080:80"].',
    schema: obj({ image: S('The image.'), options: A('Options before the image.'), command: A('The command and its arguments after the image.') }, ['image']),
    run: async a => run('docker', ['run', '-d', ...strList(a.options, 'options'), name(a.image, 'image'), ...strList(a.command, 'command')], { timeout: 600e3 }) },
  { name: 'docker_exec', title: 'Run a command in a container', write: true, description: 'docker exec: a command inside a running container (run by sh -c inside it).',
    schema: obj({ id: S('Its name or id.'), command: S('The command line.', { maxLength: 4000 }), user: S('Run as this user (optional).') }, ['id', 'command']),
    run: async a => run('docker', ['exec', ...(a.user ? ['-u', name(a.user, 'user')] : []), name(a.id, 'id'), 'sh', '-c', String(a.command)], { timeout: 300e3 }) },
  { name: 'docker_compose', title: 'Docker Compose', write: true, destructive: true, description: 'docker compose in a folder inside LABS_DIR, e.g. ["up","-d"], ["ps"], ["logs","--tail","100"], ["down"].',
    schema: obj({ dir: S('The folder with the compose file, inside LABS_DIR.'), args: A('The arguments after "docker compose".') }, ['dir', 'args']),
    run: async a => run('docker', ['compose', ...strList(a.args, 'args')], { cwd: inLabs(a.dir), timeout: 1800e3 }) },
  { name: 'docker', title: 'Any docker command', write: true, destructive: true, description: 'docker with the arguments given (no shell), for anything the tools above do not cover, e.g. ["system","df"] or ["network","create","lab"].',
    schema: obj({ args: A('The arguments after "docker".') }, ['args']),
    run: async a => run('docker', strList(a.args, 'args'), { timeout: 1800e3 }) },
];
const byName = new Map(TOOLS.map(t => [t.name, t]));

// ---------- MCP over HTTP ----------
const fails = new Map();
const same = (a, b) => crypto.timingSafeEqual(crypto.createHash('sha256').update(a).digest(), crypto.createHash('sha256').update(b).digest());
const send = (res, code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(obj)); };
const ipOf = req => String(req.headers['cf-connecting-ip'] || req.socket.remoteAddress || '');

async function rpc(msg, ip) {
  const id = msg && msg.id, isCall = msg && Object.prototype.hasOwnProperty.call(msg, 'id');
  const ok = result => (isCall ? { jsonrpc: '2.0', id, result } : null);
  const err = (code, message) => (isCall ? { jsonrpc: '2.0', id: id ?? null, error: { code, message } } : null);
  if (!msg || msg.jsonrpc !== '2.0' || typeof msg.method !== 'string') return err(-32600, 'invalid request');
  const p = msg.params || {};
  switch (msg.method) {
    case 'initialize':
      return ok({ protocolVersion: PROTOCOLS.includes(p.protocolVersion) ? p.protocolVersion : PROTOCOLS[0], capabilities: { tools: { listChanged: false } },
        serverInfo: { name: 'labs', title: 'Labs (Containerlab, Docker, DevOps)', version: VERSION },
        instructions: `DevOps tools on the owner's server: Containerlab labs, Docker and Compose, systemd services and logs, and the lab files in ${LABS_DIR}. Commands run as root. Prefer the read tools; before a tool that changes or removes something (destroy, rm, compose down, a service stop, run_command), say what it will do and ask the owner unless they asked for exactly that.` });
    case 'ping': return ok({});
    case 'tools/list':
      return ok({ tools: TOOLS.filter(t => t.name !== 'run_command' || SHELL_ON).map(t => ({ name: t.name, title: t.title, description: t.description, inputSchema: t.schema,
        annotations: { title: t.title, readOnlyHint: !!t.read, destructiveHint: !!t.destructive, openWorldHint: false } })) });
    case 'tools/call': {
      const t = byName.get(p.name);
      if (!t) return err(-32602, `unknown tool: ${String(p.name).slice(0, 60)}`);
      const args = p.arguments && typeof p.arguments === 'object' ? p.arguments : {};
      const t0 = Date.now();
      try {
        const out = await t.run(args);
        const failed = out && typeof out === 'object' && 'code' in out && out.code !== 0;
        log({ ip, tool: t.name, args: t.log ? t.log(args) : args, code: failed ? out.code : 0, ms: Date.now() - t0 });
        const text = typeof out === 'string' ? out : JSON.stringify(out);
        return ok({ content: [{ type: 'text', text }], ...(out && typeof out === 'object' && !Array.isArray(out) ? { structuredContent: out } : {}), ...(failed ? { isError: true } : {}) });
      } catch (e) {
        log({ ip, tool: t.name, args: t.log ? t.log(args) : args, error: String(e.message).slice(0, 200), ms: Date.now() - t0 });
        return ok({ content: [{ type: 'text', text: `The tool failed: ${String(e.message).slice(0, 500)}` }], isError: true });
      }
    }
    default:
      if (msg.method.startsWith('notifications/')) return null;
      return err(-32601, `method not found: ${msg.method.slice(0, 60)}`);
  }
}

const server = http.createServer(async (req, res) => {
  let pathname; try { pathname = new URL(req.url, 'http://x').pathname; } catch { res.writeHead(400); return res.end(); }
  if (pathname === '/health') return send(res, 200, { ok: true });
  if (pathname !== '/mcp' && !pathname.startsWith('/mcp/')) { res.writeHead(404); return res.end(); }
  const ip = ipOf(req), now = Date.now();
  if (TOKEN.length < 32) return send(res, 503, { error: 'LABS_MCP_TOKEN is not set (32+ characters)' });
  const recent = (fails.get(ip) || []).filter(t => now - t < 10 * 60e3);
  if (recent.length >= 10) { res.setHeader('Retry-After', '600'); return send(res, 429, { error: 'too many tries' }); }
  const given = /^Bearer\s+(.+)$/i.exec(String(req.headers.authorization || ''))?.[1]?.trim() || decodeURIComponent(pathname.slice(5));
  if (!given || !same(given, TOKEN)) {
    recent.push(now); fails.set(ip, recent); if (fails.size > 5000) fails.clear();
    log({ ip, denied: true });
    res.setHeader('WWW-Authenticate', 'Bearer'); return send(res, 401, { error: 'unauthorized' });
  }
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { error: 'POST only' }); }
  let body;
  try {
    body = await new Promise((resolve, reject) => {
      let size = 0; const chunks = [];
      req.on('data', c => { size += c.length; if (size > 2e6) { reject(new Error('too large')); req.destroy(); } else chunks.push(c); });
      req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch { reject(new Error('bad json')); } });
      req.on('error', reject);
    });
  } catch { return send(res, 400, { jsonrpc: '2.0', id: null, error: { code: -32700, message: 'parse error' } }); }
  const batch = Array.isArray(body), msgs = batch ? body.slice(0, 20) : [body];
  const answers = (await Promise.all(msgs.map(m => rpc(m, ip)))).filter(Boolean);
  if (!answers.length) { res.writeHead(202); return res.end(); }
  return send(res, 200, batch ? answers : answers[0]);
});
server.requestTimeout = 0;   // (a deploy can take many minutes)
server.listen(PORT, '127.0.0.1', () => console.log(`labs-mcp ${VERSION} on 127.0.0.1:${PORT}, labs in ${LABS_DIR}, shell ${SHELL_ON ? 'on' : 'off'}`));
