// Questions read aloud by ElevenLabs: the question and its statements, in the exam's language (Danish or English),
// as one MP3. Made once per question + language + voice + model and kept in the store's blobs, so later listens are
// free and shared by everyone. Needs ELEVENLABS_API_KEY; the voice per language and woman / man and the model can be
// chosen (see voiceOf; default model: multilingual v2, which speaks Danish).
'use strict';
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const API = `${(process.env.ELEVENLABS_BASE || 'https://api.elevenlabs.io').replace(/\/$/, '')}/v1/text-to-speech`;
// The voice follows the language of the text read and the user's choice of a woman's or a man's voice:
// ELEVENLABS_VOICE_ID_DA_WOMAN / _DA_MAN / _EN_WOMAN / _EN_MAN; without the one asked for, ELEVENLABS_VOICE_ID_DA
// (or _EN), else ELEVENLABS_VOICE_ID for both, else a default voice.
const env = k => process.env[k] || '';
const voiceOf = (lang, gender) => {
  const L = lang === 'en' ? 'EN' : 'DA', G = gender === 'man' ? 'MAN' : 'WOMAN';
  return env(`ELEVENLABS_VOICE_ID_${L}_${G}`) || env(`ELEVENLABS_VOICE_ID_${L}`) || env('ELEVENLABS_VOICE_ID') || 'JBFqnCBsd6RMkjVDRZzb';
};
// A short line in each language, to hear a voice before choosing it in the settings.
const SAMPLE = {
  da: 'Hej! Sådan lyder min stemme, når jeg læser spørgsmålene op for dig.',
  en: 'Hi! This is how my voice sounds when I read the questions aloud for you.',
};
const MODEL = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2';
const PER_USER_PER_HOUR = 60, ALL_PER_HOUR = 600; // new (not yet made) recordings a user may cause per hour

let Q = null;
const inflight = new Map(), usage = new Map();
const available = () => !!process.env.ELEVENLABS_API_KEY;

function loadBank(siteDir) {
  if (Q) return;
  const js = fs.readFileSync(path.join(siteDir, 'data.js'), 'utf8');
  Q = new Map(JSON.parse(js.slice(js.indexOf('=') + 1).trim().replace(/;$/, '')).questions.map(q => [q.id, q]));
}
// Each user's hourly allowance, and ALL_PER_HOUR for everyone together ('*' is no username), so many accounts at once
// cannot run up the bill either.
function allowed(username) {
  const now = Date.now(), recent = k => { const l = (usage.get(k) || []).filter(t => now - t < 3600e3); usage.set(k, l); return l; };
  const list = recent(username), all = recent('*');
  if (list.length >= PER_USER_PER_HOUR || all.length >= ALL_PER_HOUR) return false;
  list.push(now); all.push(now); return true;
}

// What is read: the question, a pause, then each statement with its number.
function script(q, lang) {
  const en = lang === 'en';
  const head = (en && q.sen) || q.sda;
  const lines = q.st.map((s, k) => `${k + 1}. ${(en && s.en) || s.da}`);
  return `${head}\n\n${lines.join('\n\n')}`;
}

// Returns { mime, data } for question `qid` in `lang` ('da' | 'en') in the `gender` voice ('woman' | 'man'), or with
// `sample` the voice's short sample line; throws an Error with .status.
async function get({ store, siteDir, qid, lang, gender, sample, username }) {
  lang = lang === 'en' ? 'en' : 'da';
  const voice = voiceOf(lang, gender);
  let text, key;
  if (sample) {
    text = SAMPLE[lang]; key = `tts-sample-v1-${lang}-${voice}-${MODEL}`;
  } else {
    loadBank(siteDir);
    const q = Q.get(+qid);
    if (!q) throw Object.assign(new Error('سؤال پیدا نشد.'), { status: 404 });
    // A question written new (`rev`) gets a new recording.
    text = script(q, lang); key = `tts-v1-${q.id}${q.rev ? `r${q.rev}` : ''}-${lang}-${voice}-${MODEL}`;
  }
  const have = await store.getBlob(key);
  if (have) return have;
  if (!available()) throw Object.assign(new Error('unavailable'), { status: 503 });
  if (inflight.has(key)) return inflight.get(key);
  if (!allowed(username)) throw Object.assign(new Error('درخواست زیاد؛ کمی بعد دوباره امتحان کنید.'), { status: 429 });
  const job = (async () => {
    const r = await fetch(`${API}/${encodeURIComponent(voice)}?output_format=mp3_44100_128`, {
      method: 'POST',
      headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
      body: JSON.stringify({ text, model_id: MODEL, language_code: lang }),
    });
    if (!r.ok) {
      const msg = await r.text().catch(() => '');
      console.error('tts', sample ? 'sample' : qid, lang, r.status, msg.slice(0, 300));
      throw Object.assign(new Error('خواندن سؤال الان ممکن نیست.'), { status: 502 });
    }
    const data = Buffer.from(await r.arrayBuffer());
    await store.saveBlob(key, 'audio/mpeg', data);
    return { mime: 'audio/mpeg', data };
  })();
  inflight.set(key, job);
  try { return await job; } finally { inflight.delete(key); }
}

// ---------- the AI's Persian texts (the analysis of an answer, the summary of an exam's mistakes) read aloud ----------
// Only a text the server itself wrote (kept in store.meta by lesson.js) is read, so the endpoint cannot be used to
// read anything else. Persian needs a model that speaks it (ELEVENLABS_MODEL_FA, default eleven_v3) and the voice
// ELEVENLABS_VOICE_ID_FA_MAN (else _FA, else ELEVENLABS_VOICE_ID, else the default). Long texts are read in parts
// (the model takes a few thousand characters at a time) and the MP3 parts joined.
const FA_MODEL = () => process.env.ELEVENLABS_MODEL_FA || 'eleven_v3';
const faVoice = () => env('ELEVENLABS_VOICE_ID_FA_MAN') || env('ELEVENLABS_VOICE_ID_FA') || env('ELEVENLABS_VOICE_ID') || 'JBFqnCBsd6RMkjVDRZzb';
const PART = 2400;
const aiKey = id => `tts-ai-v1-${id}-${faVoice()}-${FA_MODEL()}`;
// The words as spoken: no markdown, «تیک زد» worded as the app shows it.
function speech(text) {
  return text.replace(/\*\*/g, '').replace(/^#+\s*/gm, '').replace(/^[-•*]\s+/gm, '')
    .replace(/تیک(?:\s|‌)*نزد/g, 'انتخاب نکرد').replace(/تیک(?:\s|‌)*زد/g, 'انتخاب کرد')
    .replace(/تیک(?:\s|‌)*نخورد/g, 'انتخاب نشد').replace(/تیک(?:\s|‌)*خورد/g, 'انتخاب شد')
    .replace(/\n{3,}/g, '\n\n').trim();
}
// Parts of at most PART characters, cut at paragraph, then sentence ends.
function parts(text) {
  const out = []; let cur = '';
  for (const para of text.split(/\n+/)) {
    const pieces = para.length > PART ? para.split(/(?<=[.!؟?])\s+/) : [para];
    for (const p of pieces) {
      if (cur && cur.length + p.length + 1 > PART) { out.push(cur); cur = ''; }
      cur = cur ? `${cur}\n${p}` : p;
      while (cur.length > PART) { out.push(cur.slice(0, PART)); cur = cur.slice(PART); }
    }
  }
  if (cur) out.push(cur);
  return out;
}
const known = (store, text) => Object.values(store.meta).some(v => v && typeof v === 'object' && v.text === text);
// Makes (once) the recording of an AI text and returns its id for GET /api/tts?ai=<id>.
async function prepareAi({ store, text, username }) {
  text = String(text || '');
  if (!text || !known(store, text)) throw Object.assign(new Error('این متن قابل خواندن نیست.'), { status: 403 });
  const id = crypto.createHash('sha1').update(text).digest('hex').slice(0, 20), key = aiKey(id);
  if (await store.getBlob(key)) return id;
  if (!available()) throw Object.assign(new Error('unavailable'), { status: 503 });
  if (inflight.has(key)) { await inflight.get(key); return id; }
  if (!allowed(username)) throw Object.assign(new Error('درخواست زیاد؛ کمی بعد دوباره امتحان کنید.'), { status: 429 });
  const job = (async () => {
    const bufs = [];
    for (const part of parts(speech(text))) {
      const r = await fetch(`${API}/${encodeURIComponent(faVoice())}?output_format=mp3_44100_128`, {
        method: 'POST',
        headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
        body: JSON.stringify({ text: part, model_id: FA_MODEL() }),
      });
      if (!r.ok) {
        const msg = await r.text().catch(() => '');
        console.error('tts ai', r.status, msg.slice(0, 300));
        throw Object.assign(new Error('خواندن متن الان ممکن نیست.'), { status: 502 });
      }
      bufs.push(Buffer.from(await r.arrayBuffer()));
    }
    const data = Buffer.concat(bufs);
    await store.saveBlob(key, 'audio/mpeg', data);
    return { mime: 'audio/mpeg', data };
  })();
  inflight.set(key, job);
  try { await job; } finally { inflight.delete(key); }
  return id;
}
async function getAi({ store, id }) {
  if (!/^[0-9a-f]{20}$/.test(String(id))) throw Object.assign(new Error('not found'), { status: 404 });
  const b = await store.getBlob(aiKey(id));
  if (!b) throw Object.assign(new Error('not found'), { status: 404 });
  return b;
}

module.exports = { get, available, prepareAi, getAi };
