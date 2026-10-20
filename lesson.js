// AI lessons written by Claude in the app's language (Persian, or English / Danish on the main site):
// - per question in the answer review ("آموزش این سؤال"): what the question is about and, from the user's
//   ticks, why each wrong statement was wrong;
// - per exam or lesson ("جمع‌بندی اشتباهات"): one short lesson over all the questions answered wrongly.
// Claude gets each question's picture too and describes only what it clearly shows.
// Lessons are cached in store.meta by question + mistake pattern + exam language (+ app language when not Persian), so each combination is
// generated once and later views are free. Needs ANTHROPIC_API_KEY; without it the endpoint says "unavailable"
// and the page keeps showing the topic's fixed lesson.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const Anthropic = require('@anthropic-ai/sdk');
const imagegen = require('./imagegen');

const MODEL = process.env.LESSON_AI_MODEL || 'claude-opus-5-5';
const PER_USER_PER_HOUR = 40, ALL_PER_HOUR = 400; // new (uncached) lessons a user may trigger per hour

// How the picture is used: describe only what it clearly shows and what matters for the question.
const IMAGE_RULES = `- موقعیت را فقط با چیزهایی توصیف کنید که در تصویر به‌وضوح دیده می‌شود و به سؤال مربوط است؛ جزئیات بی‌ربط تصویر (رنگ ساختمان‌ها، آسمان و…) را نیاورید.
- چیزی را که در تصویر و متن سؤال دیده نمی‌شود و فقط در «توضیح رسمی» آمده، طوری ننویسید که انگار در تصویر هست؛ اگر لازم است بیاورید، با «طبق توضیح رسمی…» بگویید.
- اگر ترجمه‌ی فارسی با تصویر جور نیست (مثلاً «گاری» برای چیزی که در تصویر ون یا خودرو است)، نام درستِ آنچه در تصویر می‌بینید را بنویسید.
- ساده و روان بنویسید، مثل معلمی که حضوری توضیح می‌دهد؛ جمله‌های کوتاه و قابل‌فهم.`;

// Everything the AI writes for the user must follow Denmark's traffic rules exactly (the user asked for this above all).
const LAW_RULES = `- همه‌ی توضیح‌ها باید دقیقاً بر اساس قوانین فعلی رانندگی دانمارک باشد: Færdselsloven، مقررات تابلوها و خط‌کشی‌ها (bekendtgørelse om vejafmærkning) و برنامه‌ی آموزشی رسمی گواهینامه‌ی B (Undervisningsplan). قوانین یا عادت‌های کشورهای دیگر (مثلاً ایران) یا «عقل سلیم» کلی را جای قانون دانمارک ننویسید.
- پاسخ درست هر گزینه و «توضیح رسمی» داده‌شده معتبرترین منبع است؛ دلیل‌ها را با آن هماهنگ بنویسید و هرگز با آن تناقض نگویید.
- قبل از نوشتن هر جمله بسنجید که طبق قانون دانمارک درست است؛ اگر درباره‌ی عددی (سرعت، فاصله، زمان، الکل…)، کد تابلو یا جزئیاتی مطمئن نیستید، آن را ننویسید و فقط آنچه قطعی است بگویید. هیچ قانون، عدد یا کد تابلویی از خودتان نسازید.
- کد و نام تابلوها را به شکل رسمی دانمارکی بیاورید (مثلاً B 11، C 61) و اصطلاح‌های رسمی را درست به کار ببرید (ubetinget vigepligt، højreregel، vigepligt…).
- قاعده‌ها را دقیق و با شرطشان بگویید (مثلاً «در تقاطع بدون علامت، به وسیله‌ای که از راست می‌آید حق تقدم بدهید»)، نه کلی و مبهم.`;

const SYSTEM = `شما معلم آزمون تئوری رانندگی دانمارک (گواهینامه‌ی B) برای فارسی‌زبانان هستید.
برای یک سؤال تصویری آزمون، یک آموزش کوتاه و دقیق به فارسی بنویسید که فقط به همین سؤال و اشتباهات همین کاربر مربوط باشد.
تصویر سؤال هم به شما داده می‌شود؛ همان تصویری که کاربر می‌بیند.

قالب پاسخ دقیقاً این سه بخش است (عنوان‌ها همین باشند، هر بخش در خط جدا):
## این سؤال درباره‌ی چیست
یک یا دو جمله‌ی ساده: آنچه در تصویر به‌وضوح دیده می‌شود و به سؤال مربوط است (مثلاً تابلو، خط‌کشی، چراغ، وسیله‌ها و افراد مهم، وضعیت جاده) و قانون یا اصل رانندگی که سؤال می‌سنجد.
## اشتباه شما
فقط برای گزینه‌هایی که در داده «→ اشتباه» دارند، هر کدام یک خط که با «- » شروع شود: متن کوتاه گزینه در «»، اینکه کاربر آن را «انتخاب کردید» یا «انتخاب نکردید»، پاسخ درست آن و دلیلش.
گزینه‌هایی را که «→ درست» دارند در این بخش نیاورید.
برای پاسخ کاربر همیشه «انتخاب کردید / انتخاب نکردید» بنویسید، نه «تیک زدید / تیک نزدید».
## نکته برای دفعه‌ی بعد
یک یا دو خط با «- »: قاعده‌ی عملی و قابل‌به‌خاطرسپاری برای سؤال‌های مشابه.

قواعد:
- پاسخ درستِ هر گزینه همانی است که در داده آمده؛ آن را تغییر ندهید و با آن تناقض نگویید.
${LAW_RULES}
${IMAGE_RULES}
- حداکثر حدود ۱۲۰ کلمه، ساده و روان، بدون مقدمه و بدون جمع‌بندی اضافه.
- اصطلاح‌های دانمارکی مهم (مثل ubetinget vigepligt) را در صورت لزوم داخل پرانتز بیاورید.
- نکته‌های مهم (قاعده‌ی اصلی، عدد یا شرط کلیدی، دلیل درست یا نادرست بودن) را با **دو ستاره** پررنگ کنید؛ در هر خط حداکثر یکی دو عبارت کوتاه، نه کل جمله.`;

// When every statement was answered correctly: no «mistakes» or «next time» sections, just why each answer is right.
const SYSTEM_OK = `شما معلم آزمون تئوری رانندگی دانمارک (گواهینامه‌ی B) برای فارسی‌زبانان هستید.
کاربر به همه‌ی گزینه‌های یک سؤال تصویری آزمون درست جواب داده است. پاسخ او را به فارسی کوتاه و دقیق تحلیل کنید.
تصویر سؤال هم به شما داده می‌شود؛ همان تصویری که کاربر می‌بیند.

قالب پاسخ دقیقاً این دو بخش است (عنوان‌ها همین باشند، هر بخش در خط جدا):
## این سؤال درباره‌ی چیست
یک یا دو جمله‌ی ساده: آنچه در تصویر به‌وضوح دیده می‌شود و به سؤال مربوط است و قانون یا اصل رانندگی که سؤال می‌سنجد.
## پاسخ شما درست بود
خط اول دقیقاً: «- همه‌ی گزینه‌ها را درست جواب دادید.»
سپس برای هر گزینه یک خط که با «- » شروع شود: متن کوتاه گزینه در «»، اینکه آن را «انتخاب کردید» یا «انتخاب نکردید» و در یک جمله چرا این پاسخ درست است.

قواعد:
- بخش «اشتباه شما» یا «نکته برای دفعه‌ی بعد» ننویسید؛ کاربر اشتباهی نداشته است.
- پاسخ درستِ هر گزینه همانی است که در داده آمده؛ آن را تغییر ندهید و با آن تناقض نگویید.
${LAW_RULES}
${IMAGE_RULES}
- حداکثر حدود ۱۰۰ کلمه، بدون مقدمه و بدون جمع‌بندی اضافه.
- اصطلاح‌های دانمارکی مهم را در صورت لزوم داخل پرانتز بیاورید.
- نکته‌های مهم را با **دو ستاره** پررنگ کنید؛ در هر خط حداکثر یکی دو عبارت کوتاه.`;

const SUMMARY_SYSTEM = `شما معلم آزمون تئوری رانندگی دانمارک (گواهینامه‌ی B) برای فارسی‌زبانان هستید.
کاربر یک درس یا آزمون را تمام کرده است. فهرست سؤال‌هایی که اشتباه جواب داده، با پاسخ‌های خودش، به شما داده می‌شود.
یک جمع‌بندی آموزشی کوتاه به فارسی بنویسید که دقیقاً بر اساس همین اشتباهات باشد.
تصویر هر سؤال هم بعد از عنوان آن سؤال به شما داده می‌شود؛ همان تصویری که کاربر دیده است.

قالب پاسخ دقیقاً این بخش‌ها است (عنوان‌ها همین باشند، هر بخش در خط جدا):
## اشتباهات شما در یک نگاه
یک یا دو جمله: اشتباهات بیشتر در چه مباحثی بود.
## سؤال به سؤال
برای هر سؤال یک خط که دقیقاً با «- سؤال n: » شروع شود (n همان شماره‌ای که داده شده، با رقم)، سپس موضوع سؤال در چند کلمه بر اساس آنچه در تصویرش به‌وضوح دیده می‌شود، اینکه کاربر کدام گزینه را به اشتباه «انتخاب کرد» یا «انتخاب نکرد» و قاعده‌ی درست در یک جمله.
## مهم‌ترین نکته‌ها برای مرور
سه تا پنج خط با «- »: قاعده‌های عملی و قابل‌به‌خاطرسپاری که این اشتباهات را برطرف می‌کند. سؤال‌های هم‌موضوع را در یک نکته جمع کنید.

قواعد:
- پاسخ درستِ هر گزینه همانی است که در داده آمده؛ آن را تغییر ندهید و با آن تناقض نگویید.
${LAW_RULES}
- برای پاسخ کاربر همیشه «انتخاب کردید / انتخاب نکردید» بنویسید.
${IMAGE_RULES}
- نکته‌های مهم (قاعده‌ی اصلی، عدد یا شرط کلیدی) را با **دو ستاره** پررنگ کنید؛ در هر خط حداکثر یکی دو عبارت کوتاه.
- ساده و روان، بدون مقدمه و بدون جمع‌بندی اضافه؛ حداکثر حدود ۶۰ کلمه برای بخش اول، یک خط برای هر سؤال، و ۱۲۰ کلمه برای بخش آخر.
- اصطلاح‌های دانمارکی مهم (مثل ubetinget vigepligt) را در صورت لزوم داخل پرانتز بیاورید.`;

// The same lessons written in English or Danish (the app's language on the main site): the instructions in English,
// with the headings, the wording of the user's answer and the «question n» lines in the app's language, so the page
// can find them (review.tsx headIcon and the question links).
const OUT = {
  en: { name: 'English', about: 'What this question is about', mistake: 'Your mistake', tip: 'Tip for next time', ok: 'Your answer was right',
    allOk: 'You answered every statement correctly.', did: 'you selected', didNot: 'you did not select', glance: 'Your mistakes at a glance',
    byQ: 'Question by question', q: 'Question', review: 'Key points to review' },
  da: { name: 'Danish', about: 'Hvad spørgsmålet handler om', mistake: 'Din fejl', tip: 'Tip til næste gang', ok: 'Dit svar var rigtigt',
    allOk: 'Du svarede rigtigt på alle udsagn.', did: 'du valgte', didNot: 'du valgte ikke', glance: 'Dine fejl kort fortalt',
    byQ: 'Spørgsmål for spørgsmål', q: 'Spørgsmål', review: 'Vigtigste punkter at repetere' },
};
const LAW_RULES_X = `- Every explanation must follow Denmark's current traffic rules exactly: Færdselsloven, the rules for signs and road markings (bekendtgørelse om vejafmærkning) and the official curriculum for the B licence (Undervisningsplan). Never put the rules or habits of other countries, or general "common sense", in place of Danish law.
- The correct answer of each statement and the given "official explanation" are the most reliable source; write reasons that agree with them and never contradict them.
- Before writing each sentence, check it is right under Danish law; if you are not sure of a number (speed, distance, time, alcohol…), a sign code or a detail, leave it out and say only what is certain. Never invent a rule, number or sign code.
- Give sign codes and names in their official Danish form (e.g. B 11, C 61) and use the official terms correctly (ubetinget vigepligt, højreregel, vigepligt…).
- State rules precisely with their conditions, not vaguely.`;
const IMAGE_RULES_X = `- Describe the situation only with what the picture clearly shows and what matters for the question; leave out unrelated details (colours of buildings, the sky…).
- Do not write anything that is only in the "official explanation" as if it were in the picture; if it is needed, say "according to the official explanation…".
- Write simply and plainly, like a teacher explaining in person; short, clear sentences.`;
const DATA_NOTE = `The question data is labelled in English: "Correct answer: yes" means the statement should be selected, "no" that it should not; "User's answer: … → wrong" marks a statement the user answered wrongly.`;
const systemX = (o, kind) => {
  const lang = o.name;
  const common = `- The correct answer of each statement is the one in the data; do not change it or contradict it.
${LAW_RULES_X}
${IMAGE_RULES_X}
- Write the whole answer in ${lang} only (no Persian). Keep important Danish terms (like ubetinget vigepligt) in brackets where useful.
- Mark the key points (the main rule, a key number or condition, why something is right or wrong) in **double asterisks**; at most one or two short phrases per line, not whole sentences.`;
  if (kind === 'summary') return `You are a teacher for the Danish driving theory test (B licence).
The user has finished a lesson or an exam. You are given the questions they answered wrongly, with their own answers.
Write a short teaching summary in ${lang}, based exactly on these mistakes.
Each question's picture is given after its heading; it is the picture the user saw.
${DATA_NOTE}

The answer has exactly these parts (with these headings, each on its own line):
## ${o.glance}
One or two sentences: which topics most of the mistakes were in.
## ${o.byQ}
For each question one line starting exactly with "- ${o.q} n: " (n the number given, in digits), then the question's topic in a few words from what its picture clearly shows, which statement the user wrongly selected or did not select ("${o.did}" / "${o.didNot}"), and the correct rule in one sentence.
## ${o.review}
Three to five lines starting with "- ": practical, memorable rules that fix these mistakes. Put questions on the same topic in one point.

Rules:
${common}
- Plain and simple, no introduction and no extra conclusion; at most about 60 words for the first part, one line per question, and 120 words for the last part.`;
  if (kind === 'ok') return `You are a teacher for the Danish driving theory test (B licence).
The user answered every statement of a picture question correctly. Analyse their answer briefly and precisely in ${lang}.
The question's picture is given too; it is the picture the user sees.
${DATA_NOTE}

The answer has exactly these two parts (with these headings, each on its own line):
## ${o.about}
One or two simple sentences: what the picture clearly shows that matters for the question, and the traffic rule the question tests.
## ${o.ok}
First line exactly: "- ${o.allOk}"
Then one line per statement starting with "- ": the statement in short in quotes, whether "${o.did}" or "${o.didNot}" it, and in one sentence why that answer is right.

Rules:
- Do not write a "${o.mistake}" or "${o.tip}" part; the user made no mistake.
${common}
- At most about 100 words, no introduction and no extra conclusion.`;
  return `You are a teacher for the Danish driving theory test (B licence).
For one picture question of the exam, write a short, precise lesson in ${lang} about this question and this user's mistakes only.
The question's picture is given too; it is the picture the user sees.
${DATA_NOTE}

The answer has exactly these three parts (with these headings, each on its own line):
## ${o.about}
One or two simple sentences: what the picture clearly shows that matters for the question (signs, markings, lights, important vehicles and people, the road) and the traffic rule the question tests.
## ${o.mistake}
Only for the statements marked "→ wrong" in the data, one line each starting with "- ": the statement in short in quotes, whether "${o.did}" or "${o.didNot}" it, its correct answer and why.
Do not include statements marked "→ right" here.
## ${o.tip}
One or two lines starting with "- ": a practical, memorable rule for similar questions.

Rules:
${common}
- At most about 120 words, plain and simple, no introduction and no extra conclusion.`;
};
// The app's language the lesson is written in: 'fa' (as before, also /app), 'en' or 'da'.
const uiOf = ui => (ui === 'en' || ui === 'da' ? ui : 'fa');
// The app's language a cached lesson / summary (its store.meta key) was written in.
function refUi(ref) {
  const p = String(ref).split(':');
  if (p[0] === 'lesson') return uiOf(p[5]);
  return uiOf((p[2] || '').split('-')[1]);
}

let client = null, BANK = null, Q = null;
const inflight = new Map(), usage = new Map();

function loadBank(siteDir) {
  if (BANK) return;
  const js = fs.readFileSync(path.join(siteDir, 'data.js'), 'utf8');
  BANK = JSON.parse(js.slice(js.indexOf('=') + 1).trim().replace(/;$/, ''));
  SITE = siteDir;
  Q = new Map(BANK.questions.map(q => [q.id, q]));
  // and «آزمون جدید»'s own questions (site/newq.js, the same shape), when there are any
  try { const n = fs.readFileSync(path.join(siteDir, 'newq.js'), 'utf8'); for (const q of JSON.parse(n.slice(n.indexOf('=') + 1).trim().replace(/;$/, '')).questions) Q.set(q.id, q); } catch {}
}

const available = () => !!process.env.ANTHROPIC_API_KEY;

// Each user's hourly allowance, and ALL_PER_HOUR for everyone together ('*' is no username), so many accounts at once
// cannot run up the bill either.
function allowed(username) {
  const now = Date.now(), recent = k => { const l = (usage.get(k) || []).filter(t => now - t < 3600e3); usage.set(k, l); return l; };
  const list = recent(username), all = recent('*');
  if (list.length >= PER_USER_PER_HOUR || all.length >= ALL_PER_HOUR) return false;
  list.push(now); all.push(now); return true;
}

// The question's picture as an image block: the one the page shows, so a new picture made for the question
// (imagegen.js) when there is one, else the file; null when it is missing.
let SITE = null;
async function imageOf(q) {
  try {
    const b = await imagegen.activeBlob(q.id).catch(() => null);
    if (b && /^image\/(png|jpeg|webp|gif)$/.test(b.mime)) return { type: 'image', source: { type: 'base64', media_type: b.mime, data: b.data.toString('base64') } };
    const data = fs.readFileSync(path.join(SITE, q.img.split('?')[0])).toString('base64');
    return { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data } };
  } catch { return null; }
}
// A question written new (`rev` in the bank) gets its own cache keys, so no lesson made for its old text is shown.
const qkey = q => `${q.id}${q.rev ? `r${q.rev}` : ''}`;

function promptFor(q, ticks, lang, ui = 'fa') {
  if (ui !== 'fa') return promptForX(q, ticks, lang);
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

// The same data with English labels and without the Persian translations, for a lesson in English or Danish.
function promptForX(q, ticks, lang) {
  const topic = BANK.topics[q.c];
  const known = Array.isArray(ticks);
  const lines = q.st.map((s, k) => {
    const ticked = known ? !!ticks[k] : null;
    const wrong = known && ticked !== !!s.ok;
    return [
      `Statement ${k + 1}: ${lang === 'en' && s.en ? s.en : s.da}`,
      `  Correct answer: ${s.ok ? 'yes (should be selected)' : 'no (should not be selected)'}`,
      `  Official explanation: ${(lang === 'en' && s.een) || s.eda || ''}`,
      known ? `  User's answer: ${ticked ? 'selected' : 'not selected'} → ${wrong ? 'wrong' : 'right'}` : '',
    ].filter(Boolean).join('\n');
  });
  return [
    topic ? `Topic: ${topic.da}` : '',
    `Question: ${lang === 'en' && q.sen ? q.sen : q.sda}`,
    '',
    lines.join('\n\n'),
    known ? '' : '\n(The user\'s answers were not recorded for this exam; fill the mistakes part with the statements that are commonly answered wrongly.)',
  ].filter(Boolean).join('\n');
}

// Returns { text, key } (key: where the lesson is cached in store.meta) or throws an Error with .status.
async function getLesson({ store, siteDir, username, qid, ticks, lang, ui }) {
  loadBank(siteDir);
  const q = Q.get(+qid);
  if (!q) throw Object.assign(new Error('سؤال پیدا نشد.'), { status: 404 });
  lang = lang === 'en' ? 'en' : 'da';
  ui = uiOf(ui);
  const known = Array.isArray(ticks);
  const mask = known ? q.st.map((s, k) => ((!!ticks[k]) !== !!s.ok ? 1 : 0)).join('') : 'x';
  const allRight = known && !mask.includes('1');
  const key = `lesson:v7:${qkey(q)}:${mask}:${lang}${ui === 'fa' ? '' : `:${ui}`}`; // v7: written strictly by Denmark's traffic rules (LAW_RULES)
  if (store.meta[key]) return { ...store.meta[key], key };
  if (!available()) throw Object.assign(new Error('unavailable'), { status: 503 });
  if (!inflight.has(key) && !allowed(username)) throw Object.assign(new Error('درخواست زیاد؛ کمی بعد دوباره امتحان کنید.'), { status: 429 });

  return { ...(await generate({ store, key, system: ui !== 'fa' ? systemX(OUT[ui], allRight ? 'ok' : 'lesson') : allRight ? SYSTEM_OK : SYSTEM, prompt: [await imageOf(q), { type: 'text', text: promptFor(q, known ? ticks : null, lang, ui) }].filter(Boolean), maxTokens: 4000 })), key };
}

// Calls Claude once per cache key (concurrent requests for the same key share the call) and caches the text.
async function generate({ store, key, system, prompt, maxTokens }) {
  if (inflight.has(key)) return inflight.get(key);
  const job = (async () => {
    client = client || new Anthropic({ timeout: 120e3, maxRetries: 2 });
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: maxTokens,
      output_config: { effort: 'medium' },   // checked against the Danish rules, not written off the cuff
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

// items: [{ id, a, n }] — the wrongly answered questions of an exam or lesson, with the user's ticks and the
// question's number in that exam (the summary refers to «سؤال n», which the page turns into a link).
// Cached by the questions + numbers + mistake patterns + exam language, so the same result gets the same summary.
async function getSummary({ store, siteDir, username, items, lang, ui }) {
  loadBank(siteDir);
  lang = lang === 'en' ? 'en' : 'da';
  ui = uiOf(ui);
  const list = items.map((x, k) => ({ q: Q.get(+x.id), a: x.a, n: Number.isInteger(x.n) && x.n > 0 ? x.n : k + 1 })).filter(x => x.q);
  if (!list.length) throw Object.assign(new Error('سؤال پیدا نشد.'), { status: 404 });
  const mask = (q, a) => q.st.map((s, k) => ((!!a[k]) !== !!s.ok ? 1 : 0)).join('');
  const key = `summary:v4:${lang}${ui === 'fa' ? '' : `-${ui}`}:${list.map(x => `${x.n}.${qkey(x.q)}.${mask(x.q, x.a)}`).sort().join(',')}`; // v4: strictly by Denmark's traffic rules
  if (store.meta[key]) return { ...store.meta[key], key };
  if (!available()) throw Object.assign(new Error('unavailable'), { status: 503 });
  if (!inflight.has(key) && !allowed(username)) throw Object.assign(new Error('درخواست زیاد؛ کمی بعد دوباره امتحان کنید.'), { status: 429 });
  const pics = await Promise.all(list.map(x => imageOf(x.q)));
  const prompt = list.flatMap((x, i) => [{ type: 'text', text: `### ${ui === 'fa' ? 'سؤال' : 'Question'} ${x.n}` }, pics[i], { type: 'text', text: promptFor(x.q, x.a, lang, ui) }].filter(Boolean));
  return { ...(await generate({ store, key, system: ui !== 'fa' ? systemX(OUT[ui], 'summary') : SUMMARY_SYSTEM, prompt, maxTokens: 8000 })), key };
}

// The topic sheet of a reviewed question (mobile/src/ui/topic-sheet.tsx; Mojtaba 2026-10-20): a few short points on
// the question's topic written for this question (its picture, statements and official explanations), not the topic's
// fixed lesson. Each line starts with its kind in brackets, which the sheet shows with its own coloured icon:
// [look] what to notice in this situation, [rule] the rule it tests, [warn] the usual mistake, [tip] a way to remember.
const TOPIC_KINDS = '[look], [rule], [warn] and [tip]';
const topicSystem = lang => `You are a teacher for the Danish driving theory test (B licence).
For one picture question of the exam, write a short lesson on the question's topic, as it applies to this very question:
its picture, its statements and their official explanations. It is shown under the topic's name, so do not repeat the name.
The question's picture is given too; it is the picture the user sees.

Write 3 to 5 lines and nothing else (no headings, no introduction). Each line starts with exactly one of the kinds
${TOPIC_KINDS} in square brackets, then a space and one or two short sentences:
- [look] (once, first): what in this picture and question matters for the topic (signs, markings, lights, road users).
- [rule] (one or two): the Danish rule of the topic that decides this question, precisely and with its conditions.
- [warn] (at most one): the mistake people often make here.
- [tip] (at most one): a short practical way to remember it for similar questions.

Rules:
- The correct answer of each statement is the one in the data; never contradict it or the official explanation.
${LAW_RULES_X}
${IMAGE_RULES_X}
- Write in ${lang} only, at most about 30 words per line. Keep important Danish terms (like ubetinget vigepligt) in brackets where useful.
- Mark one key phrase per line in **double asterisks**, not whole sentences.`;
const TOPIC_LANG = { fa: 'Persian (natural, simple Persian for Persian speakers)', en: 'English', da: 'Danish' };

// Returns { text, key } or throws an Error with .status, as getLesson.
async function getTopic({ store, siteDir, username, qid, lang, ui }) {
  loadBank(siteDir);
  const q = Q.get(+qid);
  if (!q) throw Object.assign(new Error('سؤال پیدا نشد.'), { status: 404 });
  lang = lang === 'en' ? 'en' : 'da';
  ui = uiOf(ui);
  const key = `topic:v1:${qkey(q)}:${lang}:${ui}`;
  if (store.meta[key]) return { ...store.meta[key], key };
  if (!available()) throw Object.assign(new Error('unavailable'), { status: 503 });
  if (!inflight.has(key) && !allowed(username)) throw Object.assign(new Error('درخواست زیاد؛ کمی بعد دوباره امتحان کنید.'), { status: 429 });
  const topic = BANK.topics[q.c];
  const data = [
    topic ? `Topic: ${topic.da}${topic.en ? ` (${topic.en})` : ''}` : '',
    topic && topic.lesson ? `The topic's fixed points (Persian, for reference):\n${topic.lesson.map(l => `- ${l}`).join('\n')}` : '',
    promptForX(q, null, lang).replace(/\n\n\(The user's answers[^)]*\)\)?$/, ''),
  ].filter(Boolean).join('\n\n');
  return { ...(await generate({ store, key, system: topicSystem(TOPIC_LANG[ui]), prompt: [await imageOf(q), { type: 'text', text: data }].filter(Boolean), maxTokens: 3000 })), key };
}

// Whether a lesson / summary linked to a past exam (attempt.ai) was made for the questions' current text: one made
// before a question was written new is not shown, and a new one is made instead.
function isCurrentLesson(siteDir, qid, ref) {
  loadBank(siteDir);
  const q = Q.get(+qid);
  return !q || String(ref).split(':')[2] === qkey(q);
}
function isCurrentSummary(siteDir, items, ref) {
  loadBank(siteDir);
  return items.every(x => { const q = Q.get(+x.id); return !q || !q.rev || String(ref).includes(`.${qkey(q)}.`); });
}

module.exports = { getLesson, getSummary, getTopic, lessonsAvailable: available, isCurrentLesson, isCurrentSummary, refUi, uiOf };
