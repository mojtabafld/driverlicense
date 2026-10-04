// Questions read aloud by ElevenLabs: the question and its statements, in the exam's language (Danish or English),
// as one MP3. Made once per question + language + voice + model and kept in the store's blobs, so later listens are
// free and shared by everyone. Needs ELEVENLABS_API_KEY; ELEVENLABS_VOICE_ID and ELEVENLABS_MODEL choose another
// voice or model (default: the multilingual v2 model, which speaks Danish).
'use strict';
const fs = require('node:fs');
const path = require('node:path');

const API = `${(process.env.ELEVENLABS_BASE || 'https://api.elevenlabs.io').replace(/\/$/, '')}/v1/text-to-speech`;
const VOICE = process.env.ELEVENLABS_VOICE_ID || 'JBFqnCBsd6RMkjVDRZzb';
const MODEL = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2';
const PER_USER_PER_HOUR = 60; // new (not yet made) recordings a user may cause per hour

let Q = null;
const inflight = new Map(), usage = new Map();
const available = () => !!process.env.ELEVENLABS_API_KEY;

function loadBank(siteDir) {
  if (Q) return;
  const js = fs.readFileSync(path.join(siteDir, 'data.js'), 'utf8');
  Q = new Map(JSON.parse(js.slice(js.indexOf('=') + 1).trim().replace(/;$/, '')).questions.map(q => [q.id, q]));
}
function allowed(username) {
  const now = Date.now(), list = (usage.get(username) || []).filter(t => now - t < 3600e3);
  usage.set(username, list);
  if (list.length >= PER_USER_PER_HOUR) return false;
  list.push(now); return true;
}

// What is read: the question, a pause, then each statement with its number.
function script(q, lang) {
  const en = lang === 'en';
  const head = (en && q.sen) || q.sda;
  const lines = q.st.map((s, k) => `${k + 1}. ${(en && s.en) || s.da}`);
  return `${head}\n\n${lines.join('\n\n')}`;
}

// Returns { mime, data } for question `qid` in `lang` ('da' | 'en'), or throws an Error with .status.
async function get({ store, siteDir, qid, lang, username }) {
  loadBank(siteDir);
  const q = Q.get(+qid);
  if (!q) throw Object.assign(new Error('سؤال پیدا نشد.'), { status: 404 });
  lang = lang === 'en' ? 'en' : 'da';
  // A question written new (`rev`) gets a new recording.
  const key = `tts-v1-${q.id}${q.rev ? `r${q.rev}` : ''}-${lang}-${VOICE}-${MODEL}`;
  const have = await store.getBlob(key);
  if (have) return have;
  if (!available()) throw Object.assign(new Error('unavailable'), { status: 503 });
  if (inflight.has(key)) return inflight.get(key);
  if (!allowed(username)) throw Object.assign(new Error('درخواست زیاد؛ کمی بعد دوباره امتحان کنید.'), { status: 429 });
  const job = (async () => {
    const r = await fetch(`${API}/${encodeURIComponent(VOICE)}?output_format=mp3_44100_128`, {
      method: 'POST',
      headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
      body: JSON.stringify({ text: script(q, lang), model_id: MODEL, language_code: lang }),
    });
    if (!r.ok) {
      const msg = await r.text().catch(() => '');
      console.error('tts', q.id, lang, r.status, msg.slice(0, 300));
      throw Object.assign(new Error('خواندن سؤال الان ممکن نیست.'), { status: 502 });
    }
    const data = Buffer.from(await r.arrayBuffer());
    await store.saveBlob(key, 'audio/mpeg', data);
    return { mime: 'audio/mpeg', data };
  })();
  inflight.set(key, job);
  try { return await job; } finally { inflight.delete(key); }
}

module.exports = { get, available };
