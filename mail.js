// Email: the link that confirms a new account's address, and the code that lets a forgotten password be set anew, sent with Resend (resend.com) over its REST API with fetch.
// Env: RESEND_API_KEY (without it there is no email: signing up asks for no address and nothing waits on one) and
// MAIL_FROM (default «TeoriPrøve <no-reply@teori.bitlane.app>»; its domain must be verified in Resend). RESEND_API_BASE only
// points the calls elsewhere for tests.
'use strict';

const key = () => (process.env.RESEND_API_KEY || '').trim();
const available = () => /^re_[A-Za-z0-9_]{8,}$/.test(key());
const from = () => (process.env.MAIL_FROM || 'TeoriPrøve <no-reply@teori.bitlane.app>').trim();
const EMAIL_RE = /^[^\s@<>"',;]{1,64}@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
const normal = e => String(e || '').trim().toLowerCase().slice(0, 254);

const TEXT = {
  fa: { subject: 'تأیید ایمیل حساب TeoriPrøve', hi: n => `سلام ${n}،`, body: 'برای فعال شدن حساب کاربری‌تان روی دکمه‌ی زیر بزنید. این لینک تا ۲۴ ساعت اعتبار دارد.', button: 'فعال کردن حساب', ignore: 'اگر شما این حساب را نساخته‌اید، این ایمیل را نادیده بگیرید.', dir: 'rtl' },
  en: { subject: 'Confirm your TeoriPrøve email', hi: n => `Hi ${n},`, body: 'Tap the button below to activate your account. The link works for 24 hours.', button: 'Activate account', ignore: 'If you did not create this account, you can ignore this email.', dir: 'ltr' },
  da: { subject: 'Bekræft din e-mail til TeoriPrøve', hi: n => `Hej ${n},`, body: 'Tryk på knappen nedenfor for at aktivere din konto. Linket virker i 24 timer.', button: 'Aktivér konto', ignore: 'Hvis du ikke har oprettet kontoen, kan du se bort fra denne e-mail.', dir: 'ltr' },
};
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// The forgotten-password email: a 6-digit code (first in the subject, so a phone's notification shows it and can offer
// it above the keyboard), working for 15 minutes.
const RESET = {
  fa: { subject: c => `${c} کد بازیابی رمز TeoriPrøve`, hi: n => `سلام ${n}،`, body: 'کد بازیابی رمز عبور شما:', note: 'این کد را در برنامه وارد کنید تا رمز عبور جدید را انتخاب کنید. کد تا ۱۵ دقیقه اعتبار دارد.', ignore: 'اگر شما درخواست تغییر رمز نداده‌اید، این ایمیل را نادیده بگیرید؛ رمز فعلی‌تان تغییری نمی‌کند.', dir: 'rtl' },
  en: { subject: c => `${c} is your TeoriPrøve code`, hi: n => `Hi ${n},`, body: 'Your password reset code:', note: 'Enter this code in the app to choose a new password. The code works for 15 minutes.', ignore: 'If you did not ask to change your password, you can ignore this email; your password stays the same.', dir: 'ltr' },
  da: { subject: c => `${c} er din TeoriPrøve-kode`, hi: n => `Hej ${n},`, body: 'Din kode til at nulstille adgangskoden:', note: 'Skriv koden i appen for at vælge en ny adgangskode. Koden virker i 15 minutter.', ignore: 'Hvis du ikke har bedt om at ændre din adgangskode, kan du se bort fra denne e-mail; din adgangskode forbliver den samme.', dir: 'ltr' },
};

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

async function send(to, subject, html, text) {
  const res = await fetch(`${(process.env.RESEND_API_BASE || 'https://api.resend.com').replace(/\/$/, '')}/emails`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: from(), to: [to], subject, html, text }),
    signal: AbortSignal.timeout(15e3),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    console.error('resend', res.status, d.message || d.name);
    throw Object.assign(new Error('ایمیل فرستاده نشد؛ کمی بعد دوباره امتحان کنید.'), { status: 502 });
  }
}

module.exports = { available, sendVerify, sendReset, EMAIL_RE, normal };
