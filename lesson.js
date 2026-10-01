// AI lessons written in Persian by Claude:
// - per question in the answer review ("آموزش این سؤال"): what the question is about and, from the user's
//   ticks, why each wrong statement was wrong;
// - per exam or lesson ("جمع‌بندی اشتباهات"): one short lesson over all the questions answered wrongly.
// Lessons are cached in store.meta by question + mistake pattern + exam language, so each combination is
// generated once and later views are free. Needs ANTHROPIC_API_KEY; without it the endpoint says "unavailable"
// and the page keeps showing the topic's fixed lesson.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const Anthropic = require('@anthropic-ai/sdk');

const MODEL = process.env.LESSON_MODEL || 'claude-opus-5-5';
const PER_USER_PER_HOUR = 40; // new (uncached) lessons a user may trigger per hour

const SYSTEM = `شما معلم آزمون تئوری رانندگی دانمارک (گواهینامه‌ی B) برای فارسی‌زبانان هستید.
برای یک سؤال تصویری آزمون، یک آموزش کوتاه و دقیق به فارسی بنویسید که فقط به همین سؤال و اشتباهات همین کاربر مربوط باشد.

قالب پاسخ دقیقاً این سه بخش است (عنوان‌ها همین باشند، هر بخش در خط جدا):
## این سؤال درباره‌ی چیست
یک یا دو جمله: موقعیت تصویر و قانون یا اصل رانندگی که سؤال می‌سنجد.
## اشتباه شما
برای هر گزینه‌ای که کاربر اشتباه جواب داده، یک خط که با «- » شروع شود: متن کوتاه گزینه در «»، اینکه کاربر آن را «انتخاب کردید» یا «انتخاب نکردید» و چرا درست یا نادرست است.
برای پاسخ کاربر همیشه «انتخاب کردید / انتخاب نکردید» بنویسید، نه «تیک زدید / تیک نزدید».
اگر کاربر اشتباهی نداشته، فقط بنویسید «- همه‌ی گزینه‌ها را درست جواب دادید.» و یک جمله درباره‌ی نکته‌ی کلیدی بگویید.
## نکته برای دفعه‌ی بعد
یک یا دو خط با «- »: قاعده‌ی عملی و قابل‌به‌خاطرسپاری برای سؤال‌های مشابه.

قواعد:
- پاسخ درستِ هر گزینه همانی است که در داده آمده؛ آن را تغییر ندهید و با آن تناقض نگویید.
- فقط بر اساس قوانین رانندگی دانمارک و توضیحات داده‌شده بنویسید؛ چیزی از خودتان نسازید.
- حداکثر حدود ۱۲۰ کلمه، ساده و روان، بدون مقدمه و بدون جمع‌بندی اضافه.
- اصطلاح‌های دانمارکی مهم (مثل ubetinget vigepligt) را در صورت لزوم داخل پرانتز بیاورید.
- نکته‌های مهم (قاعده‌ی اصلی، عدد یا شرط کلیدی، دلیل درست یا نادرست بودن) را با **دو ستاره** پررنگ کنید؛ در هر خط حداکثر یکی دو عبارت کوتاه، نه کل جمله.`;

const SUMMARY_SYSTEM = `شما معلم آزمون تئوری رانندگی دانمارک (گواهینامه‌ی B) برای فارسی‌زبانان هستید.
کاربر یک درس یا آزمون را تمام کرده است. فهرست سؤال‌هایی که اشتباه جواب داده، با پاسخ‌های خودش، به شما داده می‌شود.
یک جمع‌بندی آموزشی کوتاه به فارسی بنویسید که دقیقاً بر اساس همین اشتباهات باشد.

قالب پاسخ دقیقاً این بخش‌ها است (عنوان‌ها همین باشند، هر بخش در خط جدا):
## اشتباهات شما در یک نگاه
یک یا دو جمله: اشتباهات بیشتر در چه مباحثی بود.
## سؤال به سؤال
برای هر سؤال یک خط که با «- » شروع شود: «سؤال n» (شماره‌ای که داده شده)، موضوع سؤال در چند کلمه، اینکه کاربر کدام گزینه را به اشتباه «انتخاب کرد» یا «انتخاب نکرد» و قاعده‌ی درست در یک جمله.
## مهم‌ترین نکته‌ها برای مرور
سه تا پنج خط با «- »: قاعده‌های عملی و قابل‌به‌خاطرسپاری که این اشتباهات را برطرف می‌کند. سؤال‌های هم‌موضوع را در یک نکته جمع کنید.

قواعد:
- پاسخ درستِ هر گزینه همانی است که در داده آمده؛ آن را تغییر ندهید و با آن تناقض نگویید.
- فقط بر اساس قوانین رانندگی دانمارک و توضیحات داده‌شده بنویسید؛ چیزی از خودتان نسازید.
- برای پاسخ کاربر همیشه «انتخاب کردید / انتخاب نکردید» بنویسید.
- نکته‌های مهم (قاعده‌ی اصلی، عدد یا شرط کلیدی) را با **دو ستاره** پررنگ کنید؛ در هر خط حداکثر یکی دو عبارت کوتاه.
- ساده و روان، بدون مقدمه و بدون جمع‌بندی اضافه؛ حداکثر حدود ۶۰ کلمه برای بخش اول، یک خط برای هر سؤال، و ۱۲۰ کلمه برای بخش آخر.
- اصطلاح‌های دانمارکی مهم (مثل ubetinget vigepligt) را در صورت لزوم داخل پرانتز بیاورید.`;

let client = null, BANK = null, Q = null;
const inflight = new Map(), usage = new Map();

function loadBank(siteDir) {
  if (BANK) return;
  const js = fs.readFileSync(path.join(siteDir, 'data.js'), 'utf8');
  BANK = JSON.parse(js.slice(js.indexOf('=') + 1).trim().replace(/;$/, ''));
  Q = new Map(BANK.questions.map(q => [q.id, q]));
}

const available = () => !!process.env.ANTHROPIC_API_KEY;

function allowed(username) {
  const now = Date.now(), list = (usage.get(username) || []).filter(t => now - t < 3600e3);
  usage.set(username, list);
  if (list.length >= PER_USER_PER_HOUR) return false;
  list.push(now); return true;
}

function promptFor(q, ticks, lang) {
  const topic = BANK.topics[q.c];
  const known = Array.isArray(ticks);
  const lines = q.st.map((s, k) => {
    const ticked = known ? !!ticks[k] : null;
    const wrong = known && ticked !== !!s.ok;
    return [
      `گزینه ${k + 1}: ${lang === 'en' && s.en ? s.en : s.da}`,
      s.fa ? `  ترجمه: ${s.fa}` : '',
      `  پاسخ درست: ${s.ok ? 'بله (باید انتخاب شود)' : 'خیر (نباید انتخاب شود)'}`,
      `  توضیح رسمی: ${(lang === 'en' && s.een) || s.eda || ''} ${s.efa ? `| ${s.efa}` : ''}`,
      known ? `  پاسخ کاربر: ${ticked ? 'انتخاب کرد' : 'انتخاب نکرد'} → ${wrong ? 'اشتباه' : 'درست'}` : '',
    ].filter(Boolean).join('\n');
  });
  return [
    topic ? `مبحث: ${topic.fa} (${topic.da})` : '',
    topic && topic.lesson ? `نکته‌های مبحث:\n${topic.lesson.map(l => `- ${l}`).join('\n')}` : '',
    `سؤال: ${lang === 'en' && q.sen ? q.sen : q.sda}`,
    q.sfa ? `ترجمه‌ی سؤال: ${q.sfa}` : '',
    '',
    lines.join('\n\n'),
    known ? '' : '\n(پاسخ‌های کاربر برای این آزمون ثبت نشده؛ بخش «اشتباه شما» را با توضیح گزینه‌هایی که معمولاً اشتباه جواب داده می‌شوند پر کنید.)',
  ].filter(Boolean).join('\n');
}

// Returns { text } or throws an Error with .status.
async function getLesson({ store, siteDir, username, qid, ticks, lang }) {
  loadBank(siteDir);
  const q = Q.get(+qid);
  if (!q) throw Object.assign(new Error('سؤال پیدا نشد.'), { status: 404 });
  lang = lang === 'en' ? 'en' : 'da';
  const known = Array.isArray(ticks);
  const mask = known ? q.st.map((s, k) => ((!!ticks[k]) !== !!s.ok ? 1 : 0)).join('') : 'x';
  const key = `lesson:v4:${q.id}:${mask}:${lang}`; // v4: key points in **bold** (v3 had none)
  if (store.meta[key]) return store.meta[key];
  if (!available()) throw Object.assign(new Error('unavailable'), { status: 503 });
  if (!inflight.has(key) && !allowed(username)) throw Object.assign(new Error('درخواست زیاد؛ کمی بعد دوباره امتحان کنید.'), { status: 429 });

  return generate({ store, key, system: SYSTEM, prompt: promptFor(q, known ? ticks : null, lang), maxTokens: 4000 });
}

// Calls Claude once per cache key (concurrent requests for the same key share the call) and caches the text.
async function generate({ store, key, system, prompt, maxTokens }) {
  if (inflight.has(key)) return inflight.get(key);
  const job = (async () => {
    client = client || new Anthropic({ timeout: 120e3, maxRetries: 2 });
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: maxTokens,
      output_config: { effort: 'low' },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system,
      messages: [{ role: 'user', content: prompt }],
    });
    if (response.stop_reason === 'refusal') throw Object.assign(new Error('آموزش ساخته نشد.'), { status: 502 });
    const text = response.content.filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
    if (!text) throw Object.assign(new Error('آموزش خالی بود.'), { status: 502 });
    const lesson = { text, model: response.model, at: Date.now() };
    store.meta[key] = lesson;
    await store.saveMeta(key, lesson);
    return lesson;
  })();
  inflight.set(key, job);
  try { return await job; } finally { inflight.delete(key); }
}

// items: [{ id, a }] — the wrongly answered questions of an exam or lesson, with the user's ticks.
// Cached by the questions + mistake patterns + exam language, so the same result gets the same summary.
async function getSummary({ store, siteDir, username, items, lang }) {
  loadBank(siteDir);
  lang = lang === 'en' ? 'en' : 'da';
  const list = items.map(x => ({ q: Q.get(+x.id), a: x.a })).filter(x => x.q);
  if (!list.length) throw Object.assign(new Error('سؤال پیدا نشد.'), { status: 404 });
  const mask = (q, a) => q.st.map((s, k) => ((!!a[k]) !== !!s.ok ? 1 : 0)).join('');
  const key = `summary:v1:${lang}:${list.map(x => `${x.q.id}.${mask(x.q, x.a)}`).sort().join(',')}`;
  if (store.meta[key]) return store.meta[key];
  if (!available()) throw Object.assign(new Error('unavailable'), { status: 503 });
  if (!inflight.has(key) && !allowed(username)) throw Object.assign(new Error('درخواست زیاد؛ کمی بعد دوباره امتحان کنید.'), { status: 429 });
  const prompt = list.map((x, n) => `### سؤال ${n + 1}\n${promptFor(x.q, x.a, lang)}`).join('\n\n');
  return generate({ store, key, system: SUMMARY_SYSTEM, prompt, maxTokens: 8000 });
}

module.exports = { getLesson, getSummary, lessonsAvailable: available };
