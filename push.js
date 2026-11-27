// Web push notifications (the app's settings, «اعلان‌ها»; Mojtaba 2026-10-18). A device that allows notifications
// gives its push subscription (endpoint and keys) and its time zone; the account keeps up to 5 of them (user.push).
// The account's choices (user.notify): `remind` a reminder each day at `time` (HH:MM, the device's local time) to do
// an exam or the next lesson (`what`), and `daily` (on unless turned off) one message a day at a time of its own
// between 10:00 and 20:00 about the course, the exams and the rest of the app. The keys that sign the messages (VAPID)
// come from VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY, or are made once and kept in the store (meta 'vapid').
const crypto = require('crypto');
const webpush = require('web-push');
const fcm = require('./fcm');

let publicKey = null;

async function init(store) {
  let pub = String(process.env.VAPID_PUBLIC_KEY || '').trim(), priv = String(process.env.VAPID_PRIVATE_KEY || '').trim();
  if (!pub || !priv) {
    const kept = store.meta.vapid;
    if (kept && kept.publicKey && kept.privateKey) ({ publicKey: pub, privateKey: priv } = kept);
    else {
      const k = webpush.generateVAPIDKeys();
      await store.saveMeta('vapid', k);
      ({ publicKey: pub, privateKey: priv } = k);
    }
  }
  webpush.setVapidDetails(process.env.VAPID_SUBJECT || 'https://teori.bitlane.app', pub, priv);
  publicKey = pub;
}
const key = () => publicKey;

// ---------- the account's subscriptions ----------
const validTz = tz => { try { new Intl.DateTimeFormat('en', { timeZone: tz }); return true; } catch { return false; } };
// A device's subscription, on this account only (a device signed in to another account before leaves that one).
function subscribe(users, user, sub, tz) {
  if (!sub || typeof sub.endpoint !== 'string' || !/^https:\/\//.test(sub.endpoint) || sub.endpoint.length > 1000) return false;
  const keys = sub.keys || {};
  if (typeof keys.p256dh !== 'string' || typeof keys.auth !== 'string' || keys.p256dh.length > 200 || keys.auth.length > 100) return false;
  const changed = [];
  for (const u of users) {
    if (u === user || !u.push || !u.push.some(x => x.endpoint === sub.endpoint)) continue;
    u.push = u.push.filter(x => x.endpoint !== sub.endpoint);
    changed.push(u);
  }
  const entry = { endpoint: sub.endpoint, keys: { p256dh: keys.p256dh, auth: keys.auth }, tz: validTz(tz) ? tz : 'Europe/Copenhagen', at: Date.now() };
  user.push = [...(user.push || []).filter(x => x.endpoint !== sub.endpoint), entry].slice(-5);
  return changed;
}
function unsubscribe(user, endpoint) {
  const before = (user.push || []).length;
  user.push = (user.push || []).filter(x => x.endpoint !== endpoint);
  return user.push.length !== before;
}

// The account's choices, with their defaults.
function settingsOf(user) {
  const n = user.notify || {};
  return { remind: !!n.remind, time: /^([01]\d|2[0-3]):[0-5]\d$/.test(n.time || '') ? n.time : '18:00', what: n.what === 'exam' ? 'exam' : 'lesson', daily: n.daily !== false };
}
function setSettings(user, b) {
  const cur = settingsOf(user), n = user.notify || {};
  user.notify = {
    ...n,
    remind: typeof b.remind === 'boolean' ? b.remind : cur.remind,
    time: /^([01]\d|2[0-3]):[0-5]\d$/.test(b.time || '') ? b.time : cur.time,
    what: b.what === 'exam' || b.what === 'lesson' ? b.what : cur.what,
    daily: typeof b.daily === 'boolean' ? b.daily : cur.daily,
  };
  // A new reminder time today may still come today.
  if (b.time && b.time !== cur.time) delete user.notify.remindSent;
  return settingsOf(user);
}

// ---------- the messages ----------
const TEXT = {
  fa: {
    titles: { remind: 'یادآوری روزانه', daily: 'تمرین امروز', test: 'اعلان آزمایشی' },
    remindLesson: 'وقت یادگیری است! درس بعدی آموزش گام‌به‌گام منتظر شماست.',
    remindExam: 'وقت آزمون است! یک آزمون بدهید و ببینید چقدر آماده‌اید.',
    streak: n => `${String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])} روز پشت سر هم تمرین کرده‌اید؛ امروز را هم از دست ندهید.`,
    exam: 'آماده‌ی آزمون هستید؟ یک آزمون ۲۵ سؤالی بدهید و ببینید کجا هستید.',
    done: 'آفرین، امروز تمرین کرده‌اید! یک آزمون کوتاه برای محکم‌کاری؟',
    tips: [
      ['درس بعدی آموزش گام‌به‌گام منتظر شماست؛ فقط چند دقیقه وقت می‌گیرد.', '/course'],
      ['پنج دقیقه مرور تابلوها: کوتاه، ولی در آزمون حسابی به کار می‌آید.', '/signs'],
      ['سؤال‌هایی را که اشتباه جواب داده‌اید دوباره تمرین کنید.', '/mistakes'],
      ['قاعده‌ی دست راست را چقدر خوب بلدید؟ بخش حق تقدم را مرور کنید.', '/priority'],
      ['امروز چند اصطلاح دانمارکی آزمون را یاد بگیرید.', '/glossary'],
      ['قوانین سرعت و پارک را یک بار دیگر مرور کنید.', '/rules'],
    ],
    test: 'اعلان‌ها روشن است. یادآوری‌ها همین‌طور به شما می‌رسند.',
  },
  en: {
    titles: { remind: 'Daily reminder', daily: "Today's practice", test: 'Test notification' },
    remindLesson: 'Time to learn! Your next step-by-step lesson is waiting.',
    remindExam: 'Time for an exam! Take one and see how ready you are.',
    streak: n => `You have practised ${n} days in a row. Keep it going today.`,
    exam: 'Ready for the test? Take a 25-question exam and see where you stand.',
    done: 'Well done, you practised today! A short exam to make it stick?',
    tips: [
      ['Your next step-by-step lesson is waiting. It only takes a few minutes.', '/course'],
      ['Five minutes on road signs: short, but it pays off in the test.', '/signs'],
      ['Practise the questions you got wrong once more.', '/mistakes'],
      ['How well do you know the right-hand rule? Review right of way.', '/priority'],
      ['Learn a few Danish test terms today.', '/glossary'],
      ['Go over the speed and parking rules once more.', '/rules'],
    ],
    test: 'Notifications are on. Your reminders will arrive like this.',
  },
  da: {
    titles: { remind: 'Daglig påmindelse', daily: 'Dagens øvelse', test: 'Testnotifikation' },
    remindLesson: 'Tid til at lære! Din næste lektion trin for trin venter.',
    remindExam: 'Tid til en prøve! Tag en og se, hvor klar du er.',
    streak: n => `Du har øvet dig ${n} dage i træk. Hold den kørende i dag.`,
    exam: 'Klar til prøven? Tag en prøve med 25 spørgsmål og se, hvor du står.',
    done: 'Godt gået, du har øvet dig i dag! En kort prøve for at få det til at sidde fast?',
    tips: [
      ['Din næste lektion trin for trin venter. Den tager kun et par minutter.', '/course'],
      ['Fem minutter med færdselstavler: kort, men det betaler sig til prøven.', '/signs'],
      ['Øv de spørgsmål, du svarede forkert på, en gang til.', '/mistakes'],
      ['Hvor godt kender du højre vigepligt? Gennemgå vigepligt.', '/priority'],
      ['Lær et par danske udtryk fra prøven i dag.', '/glossary'],
      ['Gennemgå reglerne for fart og parkering en gang til.', '/rules'],
    ],
    test: 'Notifikationer er slået til. Dine påmindelser kommer sådan her.',
  },
};
const langOf = user => (TEXT[(user.settings || {}).ui] ? user.settings.ui : 'fa');
const dirOf = l => (l === 'fa' ? 'rtl' : 'ltr');

function reminderMessage(user) {
  const l = langOf(user), s = settingsOf(user);
  return s.what === 'exam' ? { body: TEXT[l].remindExam, url: '/exam' } : { body: TEXT[l].remindLesson, url: '/course' };
}
// The day's message: about the streak, an exam after a while without one, or one of the parts of the app in turn.
function dailyMessage(user, h) {
  const l = langOf(user), T = TEXT[l];
  const day = Math.floor(Date.now() / 864e5);
  if (h.studiedToday) return { body: T.done, url: '/exam' };
  if (h.streak >= 2) return { body: T.streak(h.streak), url: '/course' };
  const exams = (user.attempts || []).filter(a => a.mode !== 'lesson');
  const last = exams.length ? exams[exams.length - 1].at : 0;
  if (Date.now() - last > 3 * 864e5 && day % 2 === 0) return { body: T.exam, url: '/exam' };
  const [body, url] = T.tips[day % T.tips.length];
  return { body, url };
}

// ---------- sending ----------
// To each of the account's devices; a device whose subscription has ended (404 / 410) is dropped. Resolves to the
// number of devices reached and whether the account changed.
async function sendTo(user, msg) {
  const l = langOf(user);
  // The title says what the message is (not the app's name, which the phone shows by itself; Mojtaba 2026-10-18).
  // (The iPhone adds a «from Teoripro» line under the title of a Home Screen web app's notification whatever the
  // title is; with the app's name as the title it was still there, so the title stays what the message is, 2026-10-21.)
  const kind = msg.tag === 'tp-remind' ? 'remind' : msg.tag === 'tp-test' ? 'test' : 'daily';
  // (`msg.title`: a message with its own title, the admin's news)
  const payload = JSON.stringify({ title: msg.title || TEXT[l].titles[kind], body: msg.body, url: msg.url || '/', tag: msg.tag || 'tp', lang: l, dir: dirOf(l) });
  let sent = 0, changed = false;
  for (const sub of [...(user.push || [])]) {
    try {
      await webpush.sendNotification({ endpoint: sub.endpoint, keys: sub.keys }, payload, { TTL: 6 * 3600, urgency: 'normal' });
      sent++;
    } catch (e) {
      if (e && (e.statusCode === 404 || e.statusCode === 410)) { unsubscribe(user, sub.endpoint); changed = true; }
      else console.error('push', user.username, e && (e.statusCode || e.message));
    }
  }
  // The Android app's devices (fcm.js), for a message with its own title (the news; the app makes its reminders itself).
  if (msg.title && fcm.available()) {
    for (const d of [...(user.fcm || [])]) {
      const r = await fcm.send(d.token, { title: msg.title, body: msg.body, url: msg.url }).catch(e => { console.error('fcm', e.message); return 'error'; });
      if (r === 'ok') sent++;
      else if (r === 'gone') { user.fcm = user.fcm.filter(x => x.token !== d.token); changed = true; }
    }
  }
  return { sent, changed };
}
// The Android app's device token (fcm.js), on this account only; up to 5 per account.
function subscribeFcm(users, user, token) {
  if (typeof token !== 'string' || token.length < 20 || token.length > 4096) return false;
  const changed = [];
  for (const u of users) {
    if (u === user || !u.fcm || !u.fcm.some(x => x.token === token)) continue;
    u.fcm = u.fcm.filter(x => x.token !== token); changed.push(u);
  }
  user.fcm = [...(user.fcm || []).filter(x => x.token !== token), { token, at: Date.now() }].slice(-5);
  return changed;
}
function unsubscribeFcm(user, token) {
  const before = (user.fcm || []).length;
  user.fcm = (user.fcm || []).filter(x => x.token !== token);
  return user.fcm.length !== before;
}
// The admin's news to every account with notifications on (web push, and the Android app through FCM), one after
// another in the background. Resolves to the number of devices reached.
async function broadcast(store, news) {
  const msg = { title: news.title || 'Teoripro', body: (news.text || news.title || '').slice(0, 240), url: '/news', tag: `tp-news-${news.id}` };
  let n = 0;
  for (const user of Object.values(store.users)) {
    if (!(user.push || []).length && !(user.fcm || []).length) continue;
    try { const r = await sendTo(user, msg); n += r.sent; if (r.changed) await store.saveUser(user); } catch (e) { console.error('news push', e.message); }
  }
  return n;
}
const testMessage = user => ({ body: TEXT[langOf(user)].test, url: '/settings', tag: 'tp-test' });

// The local date (YYYY-MM-DD) and minute of the day in a time zone.
function localNow(tz, t = Date.now()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    .formatToParts(new Date(t)).map(p => [p.type, p.value]));
  return { date: `${parts.year}-${parts.month}-${parts.day}`, min: +parts.hour * 60 + +parts.minute };
}
const toMin = hhmm => +hhmm.slice(0, 2) * 60 + +hhmm.slice(3, 5);
// The day's own minute for the daily message, between 10:00 and 19:59, the same all day for the account; kept at
// least an hour and a half from its reminder.
function dailyMinute(user, date, s) {
  const n = crypto.createHash('sha256').update(`${user.username}|${date}`).digest().readUInt32BE(0);
  let m = 600 + (n % 600);
  if (s.remind && Math.abs(m - toMin(s.time)) < 90) m = toMin(s.time) >= 900 ? 600 + (n % 150) : 1050 + (n % 150);
  return m;
}

// Once a minute: the reminders whose time has come (up to an hour late, after a restart) and the day's messages.
// `h(user)`: { streak, studiedToday } from the server.
async function tick(store, h) {
  for (const user of Object.values(store.users)) {
    if (!user.push || !user.push.length) continue;
    const s = settingsOf(user), tz = user.push[user.push.length - 1].tz || 'Europe/Copenhagen';
    const { date, min } = localNow(tz);
    let save = false;
    if (s.remind && user.notify.remindSent !== date && min >= toMin(s.time) && min < toMin(s.time) + 60) {
      user.notify.remindSent = date; save = true;
      const r = await sendTo(user, { ...reminderMessage(user), tag: 'tp-remind' });
      save = save || r.changed;
    }
    const at = dailyMinute(user, date, s);
    if (s.daily && (user.notify || {}).dailySent !== date && min >= at && min < at + 60) {
      user.notify = { ...(user.notify || {}), dailySent: date }; save = true;
      const r = await sendTo(user, { ...dailyMessage(user, h(user)), tag: 'tp-daily' });
      save = save || r.changed;
    }
    if (save) await store.saveUser(user);
  }
}

module.exports = { init, key, subscribe, unsubscribe, subscribeFcm, unsubscribeFcm, broadcast, settingsOf, setSettings, sendTo, testMessage, tick, localNow, dailyMinute, dailyMessage };
