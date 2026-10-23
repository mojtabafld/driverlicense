// Email: the link that confirms a new account's address, the code that lets a forgotten password be set anew, the
// daily study reminder and the reports of «گزارش خطا» to the admins, sent with Resend (resend.com) over its REST API
// with fetch; and the mail Resend receives for the domain (its MX), from Resend's receiving webhook.
// Env: RESEND_API_KEY (without it there is no email: signing up asks for no address and nothing waits on one; reading a
// received email needs a key with full access), MAIL_FROM (default «Grønpil <no-reply@teori.bitlane.app>»; its domain
// must be verified in Resend), REPORT_TO (where reports go, comma-separated; default support@ that domain, so they land
// in Resend's Emails → Receiving), RESEND_WEBHOOK_SECRET (the receiving webhook's signing secret, whsec_…; without it
// the webhook is refused) and FORWARD_TO (an address elsewhere that received emails are forwarded to; optional).
// RESEND_API_BASE only points the calls elsewhere for tests.
'use strict';

const crypto = require('crypto');

const key = () => (process.env.RESEND_API_KEY || '').trim();
const available = () => /^re_[A-Za-z0-9_]{8,}$/.test(key());
const from = () => (process.env.MAIL_FROM || 'Grønpil <no-reply@teori.bitlane.app>').trim();
const EMAIL_RE = /^[^\s@<>"',;]{1,64}@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
const normal = e => String(e || '').trim().toLowerCase().slice(0, 254);
const base = () => (process.env.RESEND_API_BASE || 'https://api.resend.com').replace(/\/$/, '');
// The sending domain (MAIL_FROM's), whose mail Resend also receives.
const domain = () => (/@([^>\s]+)/.exec(from()) || [])[1] || 'teori.bitlane.app';

const TEXT = {
  fa: { subject: 'تأیید ایمیل حساب Grønpil', hi: n => `سلام ${n}،`, body: 'برای فعال شدن حساب کاربری‌تان روی دکمه‌ی زیر بزنید. این لینک تا ۲۴ ساعت اعتبار دارد.', button: 'فعال کردن حساب', ignore: 'اگر شما این حساب را نساخته‌اید، این ایمیل را نادیده بگیرید.', dir: 'rtl' },
  en: { subject: 'Confirm your Grønpil email', hi: n => `Hi ${n},`, body: 'Tap the button below to activate your account. The link works for 24 hours.', button: 'Activate account', ignore: 'If you did not create this account, you can ignore this email.', dir: 'ltr' },
  da: { subject: 'Bekræft din e-mail til Grønpil', hi: n => `Hej ${n},`, body: 'Tryk på knappen nedenfor for at aktivere din konto. Linket virker i 24 timer.', button: 'Aktivér konto', ignore: 'Hvis du ikke har oprettet kontoen, kan du se bort fra denne e-mail.', dir: 'ltr' },
};
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// The forgotten-password email: a 6-digit code (first in the subject, so a phone's notification shows it and can offer
// it above the keyboard), working for 15 minutes.
const RESET = {
  fa: { subject: c => `${c} کد بازیابی رمز Grønpil`, hi: n => `سلام ${n}،`, body: 'کد بازیابی رمز عبور شما:', note: 'این کد را در برنامه وارد کنید تا رمز عبور جدید را انتخاب کنید. کد تا ۱۵ دقیقه اعتبار دارد.', ignore: 'اگر شما درخواست تغییر رمز نداده‌اید، این ایمیل را نادیده بگیرید؛ رمز فعلی‌تان تغییری نمی‌کند.', dir: 'rtl' },
  en: { subject: c => `${c} is your Grønpil code`, hi: n => `Hi ${n},`, body: 'Your password reset code:', note: 'Enter this code in the app to choose a new password. The code works for 15 minutes.', ignore: 'If you did not ask to change your password, you can ignore this email; your password stays the same.', dir: 'ltr' },
  da: { subject: c => `${c} er din Grønpil-kode`, hi: n => `Hej ${n},`, body: 'Din kode til at nulstille adgangskoden:', note: 'Skriv koden i appen for at vælge en ny adgangskode. Koden virker i 15 minutter.', ignore: 'Hvis du ikke har bedt om at ændre din adgangskode, kan du se bort fra denne e-mail; din adgangskode forbliver den samme.', dir: 'ltr' },
};

// The code that signs in, makes a new account or deletes one (server.js /api/code, /api/codein, /api/deletecode;
// Mojtaba 2026-10-20: no passwords on the main site): 6 digits, first in the subject, working for 15 minutes.
const CODE = {
  fa: { subject: c => `${c} کد ورود به Grønpil`, hi: n => (n ? `سلام ${n}،` : 'سلام،'), dir: 'rtl',
    body: { login: 'کد ورود به حساب Grønpil شما:', signup: 'کد ساخت حساب Grønpil شما:', delete: 'کد حذف حساب Grønpil شما:' },
    note: { login: 'این کد را در برنامه وارد کنید تا وارد حساب‌تان شوید. کد تا ۱۵ دقیقه اعتبار دارد.', signup: 'این کد را در برنامه وارد کنید تا حساب‌تان ساخته شود. کد تا ۱۵ دقیقه اعتبار دارد.', delete: 'با وارد کردن این کد در برنامه، حساب شما و همه‌ی اطلاعاتش برای همیشه پاک می‌شود. کد تا ۱۵ دقیقه اعتبار دارد.' },
    ignore: 'اگر این درخواست از طرف شما نبوده، این ایمیل را نادیده بگیرید.' },
  en: { subject: c => `${c} is your Grønpil code`, hi: n => (n ? `Hi ${n},` : 'Hi,'), dir: 'ltr',
    body: { login: 'Your code to log in to Grønpil:', signup: 'Your code to create your Grønpil account:', delete: 'Your code to delete your Grønpil account:' },
    note: { login: 'Enter this code in the app to log in. The code works for 15 minutes.', signup: 'Enter this code in the app to create your account. The code works for 15 minutes.', delete: 'Entering this code in the app deletes your account and all its data for good. The code works for 15 minutes.' },
    ignore: 'If you did not ask for this, you can ignore this email.' },
  da: { subject: c => `${c} er din Grønpil-kode`, hi: n => (n ? `Hej ${n},` : 'Hej,'), dir: 'ltr',
    body: { login: 'Din kode til at logge ind på Grønpil:', signup: 'Din kode til at oprette din Grønpil-konto:', delete: 'Din kode til at slette din Grønpil-konto:' },
    note: { login: 'Skriv koden i appen for at logge ind. Koden virker i 15 minutter.', signup: 'Skriv koden i appen for at oprette din konto. Koden virker i 15 minutter.', delete: 'Når du skriver koden i appen, slettes din konto og alle dens data for altid. Koden virker i 15 minutter.' },
    ignore: 'Hvis du ikke har bedt om dette, kan du se bort fra denne e-mail.' },
};
function sendCode(to, name, code, lang, kind) {
  const t = CODE[lang] || CODE.fa, k = t.body[kind] ? kind : 'login';
  const html = `<div dir="${t.dir}" style="font-family:Tahoma,Arial,sans-serif;font-size:15px;line-height:1.7;color:#1f2937;max-width:480px">
<p>${esc(t.hi(name))}</p><p>${esc(t.body[k])}</p>
<p style="font-family:Menlo,Consolas,monospace;font-size:32px;font-weight:bold;letter-spacing:8px;direction:ltr;text-align:center;background:#f3f4f8;border-radius:12px;padding:14px 0;margin:16px 0">${esc(code)}</p>
<p>${esc(t.note[k])}</p>
<p style="font-size:13px;color:#6b7280">${esc(t.ignore)}</p></div>`;
  return send(to, t.subject(code), html, `${t.hi(name)}\n\n${t.body[k]} ${code}\n\n${t.note[k]}\n\n${t.ignore}`);
}

// After signing up (a confirmed address, server.js /api/codein) and after buying the premium pass (the Stripe webhook,
// the checkout's return, the payments' sync): a welcome with what the app does, and a confirmation of the pass with its
// end and what it opens (Mojtaba 2026-10-20). A pass kept from a deleted account and given back on signing up again
// is said in the welcome (`restored`: its end).
// What the main app has (the site's own questions and course; /app is only a backup with prove.dk's bank, so its 44
// lesson tests and 1000+ questions are not said; Mojtaba 2026-10-21). No counts that change as the app grows.
const FEATURES = {
  fa: ['آزمون با سؤال‌های تازه‌ای که از روی قوانین رسمی دانمارک نوشته شده‌اند، به دانمارکی یا انگلیسی و با ترجمه',
    'آزمون ۲۵ سؤالی با زمان‌سنج، درست مثل روز امتحان، یا آزمونی کوتاه‌تر برای تمرین',
    'آموزش گام‌به‌گام، قوانین، تابلوها، حق تقدم و واژه‌نامه‌ی اصطلاحات آزمون',
    'آزمون اشتباهات و تمرین هوشمند برای مباحثی که بیشتر در آن‌ها اشتباه می‌کنید',
    'تقویم آزمون‌ها و درس‌ها با یادداشت‌های خودتان، و نمودار پیشرفت و احتمال قبولی'],
  en: ['Tests with new questions written from Denmark\'s official rules, in Danish or English with a translation',
    'A 25-question test with a timer, just like on the day, or a shorter one to practise',
    'A step-by-step course, the rules, road signs, right of way and a glossary of the test\'s terms',
    'A test of your mistakes and smart practice of the topics you get wrong most',
    'A calendar of your tests and lessons with your own notes, and your progress and chance of passing'],
  da: ['Prøver med nye spørgsmål skrevet ud fra de officielle danske regler, på dansk eller engelsk med oversættelse',
    'En prøve med 25 spørgsmål og ur, præcis som på dagen, eller en kortere til at øve',
    'Et trin-for-trin-kursus, reglerne, færdselstavler, vigepligt og en ordliste med prøvens begreber',
    'En prøve med dine fejl og smart øvelse i de emner, du oftest svarer forkert på',
    'En kalender over dine prøver og lektioner med dine egne noter, og dine fremskridt og din chance for at bestå'],
};
const PREMIUM_FEATURES = {
  fa: ['تحلیل هر پاسخ با هوش مصنوعی: چرا درست یا اشتباه بود', 'جمع‌بندی اشتباهات هر آزمون و درس با هوش مصنوعی', 'آموزش هر مبحث برای همان سؤال، با هوش مصنوعی',
    'خواندن سؤال‌ها و گزینه‌ها با صدا', 'جستجوی هوشمند در آموزش‌ها', 'همه‌ی درس‌ها و آزمون‌ها، بدون محدودیت'],
  en: ['An AI analysis of every answer: why it was right or wrong', 'An AI summary of the mistakes of every test and lesson', 'An AI lesson on each topic, for that very question',
    'The questions and statements read aloud', 'Smart search in the lessons', 'Every lesson and test, without limits'],
  da: ['En AI-analyse af hvert svar: hvorfor det var rigtigt eller forkert', 'Et AI-resumé af fejlene i hver prøve og lektion', 'En AI-gennemgang af hvert emne til netop det spørgsmål',
    'Spørgsmål og udsagn læst højt', 'Smart søgning i lektionerne', 'Alle lektioner og prøver, uden begrænsning'],
};
const WELCOME = {
  fa: { subject: 'به Grønpil خوش آمدید', hi: n => `سلام ${n}،`, body: 'حساب Grønpil شما ساخته شد. با این برنامه برای آزمون تئوری گواهینامه‌ی دانمارک آماده می‌شوید:',
    restored: d => `اشتراک ویژه‌ی قبلی شما برگردانده شد و تا ${d} فعال است.`, button: 'شروع تمرین', end: 'موفق باشید!', dir: 'rtl' },
  en: { subject: 'Welcome to Grønpil', hi: n => `Hi ${n},`, body: 'Your Grønpil account is ready. With it you get ready for the Danish driving theory test:',
    restored: d => `Your earlier premium pass has been restored and is active until ${d}.`, button: 'Start practising', end: 'Good luck!', dir: 'ltr' },
  da: { subject: 'Velkommen til Grønpil', hi: n => `Hej ${n},`, body: 'Din Grønpil-konto er klar. Med den gør du dig klar til teoriprøven:',
    restored: d => `Dit tidligere premiumabonnement er gendannet og er aktivt til ${d}.`, button: 'Begynd at øve', end: 'Held og lykke!', dir: 'ltr' },
};
const PREMIUM = {
  fa: { subject: 'اشتراک ویژه‌ی Grønpil شما فعال شد', hi: n => `سلام ${n}،`, body: d => `پرداخت شما انجام شد و اشتراک ویژه تا ${d} برای حساب‌تان فعال است. از این امکانات استفاده کنید:`,
    button: 'ورود به برنامه', end: 'از خرید شما سپاسگزاریم.', dir: 'rtl' },
  en: { subject: 'Your Grønpil premium pass is active', hi: n => `Hi ${n},`, body: d => `Your payment went through and premium is active on your account until ${d}. It gives you:`,
    button: 'Open the app', end: 'Thank you for your purchase.', dir: 'ltr' },
  da: { subject: 'Dit Grønpil-premiumabonnement er aktivt', hi: n => `Hej ${n},`, body: d => `Din betaling er gennemført, og premium er aktivt på din konto til ${d}. Det giver dig:`,
    button: 'Åbn appen', end: 'Tak for dit køb.', dir: 'ltr' },
};
const LOCALE = { fa: 'fa-IR-u-ca-gregory', en: 'en-GB', da: 'da-DK' };   // the app's own dates (lib/i18n.ts DATE_LOCALE)
const day = (t, lang) => new Date(t).toLocaleDateString(LOCALE[lang] || LOCALE.fa, { timeZone: 'Europe/Copenhagen', year: 'numeric', month: 'long', day: 'numeric' });
function featureMail(t, lang, name, intro, list, link) {
  const items = list.map(x => `<li style="margin:4px 0">${esc(x)}</li>`).join('');
  const html = `<div dir="${t.dir}" style="font-family:Tahoma,Arial,sans-serif;font-size:15px;line-height:1.7;color:#1f2937;max-width:480px">
<p>${esc(t.hi(name))}</p>${intro.map(p => `<p>${esc(p)}</p>`).join('')}
<ul style="padding-${t.dir === 'rtl' ? 'right' : 'left'}:20px;margin:8px 0 16px">${items}</ul>
<p><a href="${esc(link)}" style="display:inline-block;background:#2f55d4;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:bold">${esc(t.button)}</a></p>
<p>${esc(t.end)}</p></div>`;
  return { html, text: `${t.hi(name)}\n\n${intro.join('\n\n')}\n\n${list.map(x => `- ${x}`).join('\n')}\n\n${link}\n\n${t.end}` };
}
function sendWelcome(to, name, lang, link, restored) {
  const l = WELCOME[lang] ? lang : 'fa', t = WELCOME[l];
  const m = featureMail(t, l, name, [t.body], FEATURES[l], link);
  if (restored) { m.html = m.html.replace('<ul', `<p style="font-weight:bold">${esc(t.restored(day(restored, l)))}</p><ul`); m.text += `\n\n${t.restored(day(restored, l))}`; }
  return send(to, t.subject, m.html, m.text);
}
function sendPremium(to, name, lang, link, until) {
  const l = PREMIUM[lang] ? lang : 'fa', t = PREMIUM[l];
  const m = featureMail(t, l, name, [t.body(day(until, l))], PREMIUM_FEATURES[l], link);
  return send(to, t.subject, m.html, m.text);
}

function sendVerify(to, name, link, lang) {
  const t = TEXT[lang] || TEXT.fa;
  const html = `<div dir="${t.dir}" style="font-family:Tahoma,Arial,sans-serif;font-size:15px;line-height:1.7;color:#1f2937;max-width:480px">
<p>${esc(t.hi(name))}</p><p>${esc(t.body)}</p>
<p><a href="${esc(link)}" style="display:inline-block;background:#14532d;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:bold">${esc(t.button)}</a></p>
<p style="font-size:13px;color:#6b7280;direction:ltr;text-align:left;word-break:break-all">${esc(link)}</p>
<p style="font-size:13px;color:#6b7280">${esc(t.ignore)}</p></div>`;
  return send(to, t.subject, html, `${t.hi(name)}\n\n${t.body}\n\n${link}\n\n${t.ignore}`);
}
function sendReset(to, name, code, lang) {
  const t = RESET[lang] || RESET.fa;
  const html = `<div dir="${t.dir}" style="font-family:Tahoma,Arial,sans-serif;font-size:15px;line-height:1.7;color:#1f2937;max-width:480px">
<p>${esc(t.hi(name))}</p><p>${esc(t.body)}</p>
<p style="font-family:Menlo,Consolas,monospace;font-size:32px;font-weight:bold;letter-spacing:8px;direction:ltr;text-align:center;background:#f3f4f8;border-radius:12px;padding:14px 0;margin:16px 0">${esc(code)}</p>
<p>${esc(t.note)}</p>
<p style="font-size:13px;color:#6b7280">${esc(t.ignore)}</p></div>`;
  return send(to, t.subject(code), html, `${t.hi(name)}\n\n${t.body} ${code}\n\n${t.note}\n\n${t.ignore}`);
}

// The daily study reminder (asked for in «یادآوری روزانه»): the streak so far and a button to the app; `off` turns it off.
const REMIND = {
  fa: { subject: n => (n ? `${n} روز پیاپی؛ امروز هم تمرین کنید` : 'وقت تمرین امروز است'), hi: n => `سلام ${n}،`,
    body: n => (n ? `${n} روز پشت سر هم تمرین کرده‌اید. امروز هنوز تمرین نکرده‌اید؛ چند دقیقه کافی است تا رشته‌ی روزهایتان قطع نشود.` : 'امروز هنوز تمرین نکرده‌اید. چند دقیقه تمرین هر روز، شما را برای آزمون تئوری آماده می‌کند.'),
    button: 'شروع تمرین', off: 'برای خاموش کردن یادآوری، در برنامه به «آموزش گام‌به‌گام» بروید.', dir: 'rtl' },
  en: { subject: n => (n ? `${n} days in a row: practise today too` : 'Time for today\'s practice'), hi: n => `Hi ${n},`,
    body: n => (n ? `You have practised ${n} days in a row. You have not practised today yet; a few minutes keep your streak going.` : 'You have not practised today yet. A few minutes every day get you ready for the theory test.'),
    button: 'Start practising', off: 'To turn the reminder off, open the step-by-step course in the app.', dir: 'ltr' },
  da: { subject: n => (n ? `${n} dage i træk: øv dig også i dag` : 'Tid til dagens træning'), hi: n => `Hej ${n},`,
    body: n => (n ? `Du har øvet dig ${n} dage i træk. Du har ikke øvet dig i dag endnu; et par minutter holder din stime i gang.` : 'Du har ikke øvet dig i dag endnu. Et par minutter hver dag gør dig klar til teoriprøven.'),
    button: 'Begynd at øve', off: 'Du kan slå påmindelsen fra i trin-for-trin-kurset i appen.', dir: 'ltr' },
};
function sendReminder(to, name, streak, link, lang) {
  const t = REMIND[lang] || REMIND.fa;
  const html = `<div dir="${t.dir}" style="font-family:Tahoma,Arial,sans-serif;font-size:15px;line-height:1.7;color:#1f2937;max-width:480px">
<p>${esc(t.hi(name))}</p><p>${esc(t.body(streak))}</p>
<p><a href="${esc(link)}" style="display:inline-block;background:#2f55d4;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:bold">${esc(t.button)}</a></p>
<p style="font-size:13px;color:#6b7280">${esc(t.off)}</p></div>`;
  return send(to, t.subject(streak), html, `${t.hi(name)}\n\n${t.body(streak)}\n\n${link}\n\n${t.off}`);
}

// «گزارش خطا» from the app (server.js /api/report) to REPORT_TO, its details first and then its text; Reply-To the
// account's confirmed address, so answering the email writes to the user.
const reportTo = () => (process.env.REPORT_TO || `support@${domain()}`).split(',').map(normal).filter(e => EMAIL_RE.test(e));
function sendReport(r) {
  const to = reportTo();
  if (!to.length) return Promise.resolve();
  const kind = r.kind === 'idea' ? 'پیشنهاد' : 'خطا';
  const rows = [['نوع', kind], ['کاربر', `${r.name || ''} (${r.username})`], ['ایمیل', r.email || '–'],
    ['دستگاه', `${r.platform || '–'} ${r.version || ''}`.trim()], ['زبان برنامه', r.ui || '–'],
    ['زمان', new Date(r.at).toLocaleString('fa-IR', { timeZone: 'Europe/Copenhagen' })]];
  const html = `<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;font-size:15px;line-height:1.7;color:#1f2937;max-width:560px">
<table style="border-collapse:collapse;font-size:14px;margin-bottom:12px">${rows.map(([k, v]) => `<tr><td style="color:#6b7280;padding:2px 0 2px 16px;white-space:nowrap">${esc(k)}</td><td style="padding:2px 0">${esc(v)}</td></tr>`).join('')}</table>
<div style="white-space:pre-wrap;background:#f3f4f8;border-radius:12px;padding:14px 16px">${esc(r.text)}</div></div>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${r.text}`;
  const first = r.text.split('\n')[0].trim();
  return send(to, `گزارش ${kind}: ${first.length > 70 ? `${first.slice(0, 70)}…` : first}`, html, text, { replyTo: r.email });
}

// Resend's receiving webhook (Webhooks → the event email.received), signed as Svix does: the headers svix-id,
// svix-timestamp and svix-signature («v1,<base64>», several apart by spaces) carry the HMAC-SHA256 of
// «<id>.<timestamp>.<raw body>» with the key in RESEND_WEBHOOK_SECRET (whsec_<base64>), at most 5 minutes old.
// Returns the event, or null.
function verifyWebhook(raw, headers, secret = process.env.RESEND_WEBHOOK_SECRET || '', now = Date.now()) {
  const id = headers['svix-id'], ts = headers['svix-timestamp'], sig = headers['svix-signature'];
  if (!secret || !id || !ts || !sig) return null;
  const t = Number(ts);
  if (!Number.isFinite(t) || Math.abs(now / 1000 - t) > 300) return null;
  const want = crypto.createHmac('sha256', Buffer.from(String(secret).replace(/^whsec_/, ''), 'base64')).update(`${id}.${ts}.`).update(raw).digest();
  const ok = String(sig).split(' ').some(p => {
    const [v, b64] = p.split(',');
    const b = v === 'v1' && b64 ? Buffer.from(b64, 'base64') : null;
    return !!b && b.length === want.length && crypto.timingSafeEqual(b, want);
  });
  if (!ok) return null;
  try { return JSON.parse(raw.toString('utf8')); } catch { return null; }
}
// A received email in full (the webhook carries only who sent it, to whom and the subject): GET /emails/receiving/{id}.
// A key that may only send gets 401 / 403: then null.
async function getReceived(id) {
  const res = await fetch(`${base()}/emails/receiving/${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${key()}` }, signal: AbortSignal.timeout(15e3) });
  if (!res.ok) { console.error('resend receiving', res.status); return null; }
  return res.json();
}
// A received email's text: its text part, else its HTML (markup, or a data: URI of it) as plain text.
function bodyText(e) {
  if (e && typeof e.text === 'string' && e.text.trim()) return e.text.trim();
  let h = e && typeof e.html === 'string' ? e.html : '';
  const m = /^data:[^,]*?(;base64)?,([\s\S]*)$/.exec(h);
  if (m) { try { h = m[1] ? Buffer.from(m[2], 'base64').toString('utf8') : decodeURIComponent(m[2]); } catch { h = ''; } }
  return h.replace(/<(style|script|head)[\s\S]*?<\/\1>/gi, '').replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|tr|li|h\d|blockquote)>/gi, '\n')
    .replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}
// FORWARD_TO, when set: a received email goes on there too, Reply-To its sender (or where it asked answers to go, e.g. a
// report's user); never to an address of the receiving domain (it would come in again, and again).
function forward(e, text) {
  const to = normal(process.env.FORWARD_TO || '');
  if (!EMAIL_RE.test(to)) return Promise.resolve(false);
  const dom = to.split('@')[1];
  if (dom === domain() || [...(e.to || []), ...(e.received_for || [])].some(a => normal(a).endsWith(`@${dom}`))) return Promise.resolve(false);
  const replyTo = (Array.isArray(e.reply_to) && e.reply_to[0]) || e.from;
  const head = `از: ${e.from}\nبه: ${(e.to || []).join('، ')}\nموضوع: ${e.subject || ''}`;
  const html = `<div dir="auto" style="font-family:Tahoma,Arial,sans-serif;font-size:14px;line-height:1.7;color:#1f2937;max-width:600px">
<p style="color:#6b7280;font-size:13px;white-space:pre-wrap;margin:0 0 12px">${esc(head)}</p><div style="white-space:pre-wrap">${esc(text)}</div></div>`;
  return send([to], `Fwd: ${e.subject || ''}`.trim(), html, `${head}\n\n${text}`, { replyTo }).then(() => true);
}

async function send(to, subject, html, text, { replyTo } = {}) {
  const body = { from: from(), to: Array.isArray(to) ? to : [to], subject, html, text };
  if (replyTo) body.reply_to = replyTo;
  const res = await fetch(`${base()}/emails`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15e3),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    console.error('resend', res.status, d.message || d.name);
    throw Object.assign(new Error('ایمیل فرستاده نشد؛ کمی بعد دوباره امتحان کنید.'), { status: 502 });
  }
}

module.exports = { available, sendVerify, sendReset, sendCode, sendWelcome, sendPremium, sendReminder, sendReport, reportTo, verifyWebhook, getReceived, bodyText, forward, EMAIL_RE, normal };
