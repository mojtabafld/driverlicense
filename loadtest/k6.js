// The capacity test (Mojtaba 2026-10-31), run by .github/workflows/loadtest.yml: up to USERS visitors at once (on
// each of the workflow's runners), each opening the app once as a browser does (the page and its 1.7 MB script,
// which a browser then keeps; the first run downloaded it on every round and choked the test's own machine), then
// doing what an open app does, again and again a few seconds apart: /api/config (the pictures' versions) and
// /api/health (the server and its database). Through Cloudflare, as real visitors come. Ramps up over a third of the
// time, holds, then ramps down. Response bodies are not kept (only health's is read).
// It passes when under 1% of the requests fail and 95% answer within 1.5 s.
import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE = __ENV.BASE || 'https://teori.bitlane.app';
const USERS = +__ENV.USERS || 1000, MIN = +__ENV.MINUTES || 6;
const H = { headers: { 'X-Load-Test': __ENV.LOADTEST_TOKEN || '' } };

export const options = {
  scenarios: { visitors: { executor: 'ramping-vus', startVUs: 0, gracefulRampDown: '20s',
    stages: [{ duration: `${Math.round(MIN * 20)}s`, target: USERS }, { duration: `${Math.round(MIN * 30)}s`, target: USERS }, { duration: `${Math.round(MIN * 10)}s`, target: 0 }] } },
  thresholds: { http_req_failed: ['rate<0.01'], http_req_duration: ['p(95)<1500'] },
  summaryTrendStats: ['avg', 'med', 'p(90)', 'p(95)', 'p(99)', 'max'],
  discardResponseBodies: true,
};

// The web app's main script, from its page (its name changes with each build).
export function setup() {
  const page = http.get(`${BASE}/`, { ...H, responseType: 'text' });
  const m = /<script[^>]+src="([^"]+\.js)"/.exec(page.body || '');
  return { script: m ? m[1] : null };
}

export default function (d) {
  if (__ITER === 0) {   // opening the app: once per visitor
    check(http.get(`${BASE}/`, H), { 'page 200': x => x.status === 200 });
    if (d.script) check(http.get(`${BASE}${d.script.startsWith('/') ? '' : '/'}${d.script}`, H), { 'script 200': x => x.status === 200 });
  }
  check(http.get(`${BASE}/api/config`, H), { 'config 200': x => x.status === 200 });
  check(http.get(`${BASE}/api/health`, { ...H, responseType: 'text' }), { 'health db': x => x.status === 200 && String(x.body).includes('"db":true') });
  sleep(2 + Math.random() * 4);
}
