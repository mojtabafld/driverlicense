(() => {
  'use strict';
  // The question bank (data.js) is only served to signed-in users, so it is loaded after login.
  let BANK = null, Q = new Map();
  function loadBank() {
    if (BANK) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'data.js';
      s.onload = () => { BANK = window.BANK; Q = new Map(BANK.questions.map(q => [q.id, q])); resolve(); };
      s.onerror = () => { s.remove(); reject(new Error('بارگذاری سؤال‌ها ناموفق بود')); };
      document.head.appendChild(s);
    });
  }
  // The real test has 25 pictures and allows 5 wrong (80%); shorter practice exams keep the same ratio.
  const FULL = 25, SIZES = [5, 10, 15, 20, 25], SECONDS_PER_Q = 60;
  const passMin = n => n - Math.floor(n / 5);
  // Only full 25-question exams get a pass/fail verdict; shorter practice exams just record the percent correct.
  const isFull = a => a.items.length >= FULL;
  const isPass = a => isFull(a) && scoreOf(a) >= passMin(a.items.length);
  const pctText = a => faNum(Math.round(pct(a) * 100)) + '٪';
  const pct = a => scoreOf(a) / Math.max(1, a.items.length);
  const $app = document.getElementById('app');
  const $modal = document.getElementById('modal');
  const $user = document.getElementById('userBox');

  // ---------- local (per-device) prefs ----------
  const local = {
    get(k, d) { try { const v = localStorage.getItem('tp.' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem('tp.' + k, JSON.stringify(v)); } catch {} },
  };

  // ---------- API ----------
  async function api(method, route, body) {
    const r = await fetch('/api/' + route, {
      method, credentials: 'same-origin',
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(data.error || 'خطا در ارتباط با سرور'); e.status = r.status; throw e; }
    return data;
  }

  // ---------- state ----------
  const state = { user: null, attempts: [], settings: { showFa: true, timer: true }, exam: null, timerId: null, words: [] };

  // ---------- theme (light by default, like the real test) ----------
  const applyTheme = t => document.documentElement.dataset.theme = t;
  applyTheme(local.get('theme', 'light'));
  document.getElementById('themeBtn').onclick = () => {
    const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(t); local.set('theme', t);
  };
  document.querySelector('[data-go="home"]').onclick = () => { if (state.user) home(); };

  // ---------- helpers ----------
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const nl = s => esc(s).replace(/\n/g, '<br>');
  const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
  // Show Persian digits everywhere on the page, Danish content (questions, answers, Danish labels) included;
  // only inputs, code, the exam's "Spørgsmål 3 ud af 25" counter and the review's statement numbers keep Latin digits.
  // Runs on every DOM change, so animated counters and timers are covered.
  // In Danish text "." is a thousands separator (1.000 kr), so only Persian text gets the decimal sign.
  const LATIN_ZONE = 'input, textarea, code, .x-count, .rnum-c, script, style';
  const DANISH_ZONE = '.da, [data-wq], .qtext, .answer .txt, .x-count';
  const toFaDigits = t => t.replace(/(\d)\s?%/g, '$1٪').replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
  const toFa = t => toFaDigits(t.replace(/(\d)\.(\d)/g, '$1٫$2'));
  function persianizeDigits(root) {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      if (!/\d/.test(n.nodeValue)) continue;
      const el = n.parentElement;
      if (!el || el.closest(LATIN_ZONE)) continue;
      n.nodeValue = el.closest(DANISH_ZONE) ? toFaDigits(n.nodeValue) : toFa(n.nodeValue);
    }
  }
  new MutationObserver(ms => {
    for (const m of ms) {
      if (m.type === 'characterData') { if (m.target.parentNode) persianizeDigits(m.target.parentNode); }
      else m.addedNodes.forEach(node => { if (node.nodeType === 1) persianizeDigits(node); else if (node.nodeType === 3 && node.parentNode) persianizeDigits(node.parentNode); });
    }
  }).observe(document.body, { childList: true, subtree: true, characterData: true });
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmtTime = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const scoreOf = a => a.items.filter(x => x.ok).length;
  const fmtDate = t => new Date(t).toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' });
  const fmtDateTime = t => new Date(t).toLocaleString('fa-IR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const modeName = m => ({ mistakes: 'تمرین اشتباهات', top: 'پراشتباه‌ترین سؤالات' }[m] || 'آزمون تصادفی');
  const setExamMode = on => document.body.classList.toggle('exam-mode', on);
  function toast(msg) {
    const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2400);
  }
  function openModal(html, cls = '') {
    $modal.innerHTML = `<div class="sheet card ${cls}">${html}</div>`; $modal.hidden = false;
    $modal.onclick = e => { if (e.target === $modal || e.target.closest('[data-close]')) closeModal(); };
  }
  function closeModal() { $modal.hidden = true; $modal.innerHTML = ''; }
  function confirmBox(title, body, okText, onOk, cancelText = 'انصراف') {
    openModal(`<h3>${title}</h3><p style="color:var(--muted);margin:0">${body}</p>
      <div class="row-btns"><button class="btn btn-ghost" data-close>${cancelText}</button><button class="btn btn-primary" id="mOk">${okText}</button></div>`);
    document.getElementById('mOk').onclick = () => { closeModal(); onOk(); };
  }
  const zoomImg = src => openModal(`<img src="${src}" alt="" data-close>`, 'img');

  // ---------- analytics ----------
  // Questions whose most recent answer was wrong.
  function mistakeIds() {
    const last = new Map();
    for (const a of state.attempts) for (const it of a.items) last.set(it.id, it.ok);
    return [...last].filter(([, ok]) => !ok).map(([id]) => id).filter(id => Q.has(id));
  }
  // Per-question wrong counts across all exams, most-missed first.
  function mistakeStats() {
    const m = new Map();
    state.attempts.forEach((a, ai) => a.items.forEach(it => {
      if (!Q.has(it.id)) return;
      const s = m.get(it.id) || { id: it.id, wrong: 0, seen: 0, lastOk: true, lastA: null, lastAttempt: -1 };
      s.seen++; if (!it.ok) s.wrong++;
      s.lastOk = it.ok; s.lastA = it.a || null; s.lastAttempt = ai;
      m.set(it.id, s);
    }));
    return [...m.values()].filter(s => s.wrong > 0).sort((a, b) => b.wrong - a.wrong || (b.wrong / b.seen) - (a.wrong / a.seen) || b.lastAttempt - a.lastAttempt);
  }
  function binomTailAtLeast(n, k, p) {
    let s = 0, c = 1;
    for (let i = 0; i <= n; i++) {
      if (i > 0) c = c * (n - i + 1) / i;
      if (i >= k) s += c * p ** i * (1 - p) ** (n - i);
    }
    return s;
  }
  // Per-image accuracy from recent exams (newer weigh more, small prior), then P(≥20 of 25 correct).
  function passEstimate() {
    const recent = state.attempts.slice(-10);
    if (!recent.length) return null;
    let ok = 2, tot = 4;
    recent.forEach((a, i) => { const w = 0.85 ** (recent.length - 1 - i); ok += w * scoreOf(a); tot += w * a.items.length; });
    const p = ok / tot;
    return { p, prob: binomTailAtLeast(FULL, passMin(FULL), p), n: recent.length };
  }
  function topicStats() {
    const m = new Map();
    for (const a of state.attempts) for (const it of a.items) {
      const q = Q.get(it.id); if (!q) continue;
      const t = m.get(q.c) || { c: q.c, ok: 0, n: 0 }; t.n++; if (it.ok) t.ok++; m.set(q.c, t);
    }
    return [...m.values()].filter(t => t.n >= 3 && BANK.topics[t.c]).map(t => ({ ...t, acc: t.ok / t.n }));
  }
  function streakDays() {
    const days = new Set(state.attempts.map(a => new Date(a.at).toDateString()));
    const d = new Date(); let n = 0;
    if (!days.has(d.toDateString())) d.setDate(d.getDate() - 1);
    while (days.has(d.toDateString())) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  // ---------- Auth ----------
  function renderUserBox() {
    if (!state.user) { $user.innerHTML = ''; return; }
    $user.innerHTML = `<span class="user-chip"><span class="avatar">${esc(state.user.name.trim()[0] || '?').toUpperCase()}</span><span class="uname">${esc(state.user.name)}</span></span>
      <button class="icon-btn" id="logoutBtn" title="خروج از حساب" aria-label="خروج"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M15 17l5-5-5-5M20 12H9M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
    document.getElementById('logoutBtn').onclick = () => confirmBox('خروج از حساب؟', 'اطلاعات شما روی سرور ذخیره است و با ورود دوباره برمی‌گردد.', 'خروج', async () => {
      await api('POST', 'logout').catch(() => {});
      clearInterval(state.timerId);
      Object.assign(state, { user: null, attempts: [], exam: null, words: [] });
      renderUserBox(); authView('login');
    });
  }

  function authView(mode) {
    clearInterval(state.timerId); setExamMode(false);
    const reg = mode === 'register';
    $app.innerHTML = `<section class="view auth">
      <div class="auth-intro">
        <span class="eyebrow">🇩🇰 آزمون تئوری گواهینامه‌ی B دانمارک</span>
        <h1>با حساب خودت وارد شو و <span>پیشرفتت را دنبال کن</span></h1>
        <p>بیش از هزار سؤال از ۴۴ آزمون، با ظاهری مشابه آزمون دیجیتال واقعی، ترجمه‌ی فارسی، آموزش کوتاه و تخمین احتمال قبولی.</p>
      </div>
      <form class="card auth-card" id="authForm" autocomplete="on">
        <div class="tabs full"><button type="button" data-m="login" class="${reg ? '' : 'on'}">ورود</button><button type="button" data-m="register" class="${reg ? 'on' : ''}">ثبت‌نام</button></div>
        ${reg ? `<label class="field"><span>نام نمایشی</span><input name="name" maxlength="40" placeholder="مثلاً سارا" required></label>` : ''}
        <label class="field"><span>نام کاربری</span><input name="username" class="da" autocomplete="username" autocapitalize="off" spellcheck="false" placeholder="username" required></label>
        <label class="field"><span>رمز عبور</span><input name="password" type="password" class="da" autocomplete="${reg ? 'new-password' : 'current-password'}" minlength="6" required></label>
        ${reg && state.inviteRequired ? `<label class="field"><span>کد دعوت</span><input name="invite" class="da" autocomplete="off" autocapitalize="off" spellcheck="false" required></label>` : ''}
        <div class="form-err" id="authErr"></div>
        <button class="btn btn-primary wide" type="submit">${reg ? 'ساخت حساب' : 'ورود'}</button>
      </form>
    </section>`;
    $app.querySelectorAll('[data-m]').forEach(b => b.onclick = () => authView(b.dataset.m));
    document.getElementById('authForm').onsubmit = async e => {
      e.preventDefault();
      const f = Object.fromEntries(new FormData(e.target));
      const btn = e.target.querySelector('[type=submit]'); btn.disabled = true;
      try {
        await api('POST', reg ? 'register' : 'login', f);
        await loadMe();
        toast(reg ? 'حساب شما ساخته شد 🎉' : `خوش آمدید ${state.user.name}`);
        home();
      } catch (err) {
        document.getElementById('authErr').textContent = err.message; btn.disabled = false;
      }
    };
  }

  async function loadMe() {
    const d = await api('GET', 'me');
    await loadBank();
    state.user = d.user; state.attempts = d.attempts || []; state.words = d.words || [];
    state.settings = Object.assign({ showFa: true, timer: true }, d.settings);
    state.draft = d.draft && d.draft.ids.every(id => Q.has(id)) ? d.draft : null;
    renderUserBox();
  }
  const saveSettings = () => api('PUT', 'settings', state.settings).catch(() => toast('ذخیره‌ی تنظیمات ناموفق بود'));

  // ---------- Exam ----------
  // An unfinished exam is kept on the server as a "draft" (every change, debounced; right away when the page
  // is hidden or the user leaves the exam), so it can be resumed later, also on another device.
  // Time only runs while the exam is open.
  let draftTimer = null;
  const snapshot = ex => ({
    mode: ex.mode, ids: ex.ids, idx: ex.idx, answers: ex.answers, seen: ex.seen, flags: ex.flags, showFa: ex.showFa,
    left: ex.left, elapsed: Math.round((Date.now() - ex.started) / 1000), saved: Date.now(),
  });
  function putDraft(keepalive = false) {
    clearTimeout(draftTimer);
    if (!state.draft) return;
    fetch('/api/draft', { method: 'PUT', keepalive, credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(state.draft) }).catch(() => {});
  }
  function saveDraft(now = false) {
    const ex = state.exam; if (!ex || ex.done) return;
    state.draft = snapshot(ex);
    if (now) putDraft(now === 'keepalive'); else { clearTimeout(draftTimer); draftTimer = setTimeout(putDraft, 1500); }
  }
  function dropDraft() {
    clearTimeout(draftTimer); state.draft = null;
    api('DELETE', 'draft').catch(() => {});
  }
  // Leaving the exam screen (logo, dashboard, …) keeps the unfinished exam as a draft.
  function leaveExam() { clearInterval(state.timerId); saveDraft(true); state.exam = null; }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') saveDraft('keepalive'); });

  function resumeExam() {
    const d = state.draft; if (!d) return;
    closeModal();
    state.exam = {
      ...d, size: d.ids.length, view: 'q', done: false, started: Date.now() - d.elapsed * 1000,
      answers: d.ids.map((id, i) => Q.get(id).st.map((_, k) => !!d.answers[i][k])), // the server keeps 4 per question
    };
    setExamMode(true);
    renderExam(true);
    window.scrollTo({ top: 0 });
    startTimer();
  }
  function draftCard() {
    const d = state.draft; if (!d) return '';
    const answered = d.answers.filter(a => a.some(Boolean)).length;
    return `<div class="card resume">
      <div class="resume-txt"><b>آزمون نیمه‌تمام</b>
        <small>${modeName(d.mode)} · ${faNum(d.ids.length)} سؤالی · ${faNum(answered)} سؤال پاسخ داده شده${state.settings.timer ? ` · ${fmtTime(Math.max(0, d.left))} زمان باقی‌مانده` : ''} · ${fmtDateTime(d.saved)}</small></div>
      <div class="resume-btns"><button class="btn btn-ghost" id="dropDraft">حذف</button><button class="btn btn-primary" id="resume">ادامه‌ی آزمون</button></div>
    </div>`;
  }
  // Start with `first` questions (if any) and top up with random ones to `size`.
  function buildIds(first, size) {
    first = first.slice(0, size);
    const used = new Set(first);
    const fill = shuffle(BANK.questions.map(q => q.id).filter(id => !used.has(id)));
    return shuffle(first.concat(fill.slice(0, size - first.length)));
  }

  // "Start exam" → pick how many questions, then begin.
  function askSize(mode) {
    const last = FULL; // 25 (the real test) is always the highlighted default
    openModal(`<h3>تعداد سؤال‌ها را انتخاب کنید</h3>
      <p style="color:var(--muted);margin:0 0 14px;font-size:14px">${modeName(mode)} · برای هر سؤال ۱ دقیقه زمان دارید.</p>
      <div class="size-grid">${SIZES.map(n => `
        <button class="size-opt ${n === last ? 'last' : ''}" data-size="${n}">
          <b>${faNum(n)}</b><span>سؤال</span>
          <small>${faNum(n)} دقیقه · ${n === FULL ? `قبولی با ${faNum(passMin(n))} درست` : 'فقط درصد درست'}</small>
          ${n === FULL ? '<em>مثل آزمون واقعی</em>' : ''}
        </button>`).join('')}
      </div>
      ${state.draft ? '<p class="size-warn">با شروع آزمون جدید، آزمون نیمه‌تمام قبلی حذف می‌شود.</p>' : ''}
      <button class="btn btn-ghost size-cancel" data-close>انصراف</button>`, 'size-sheet');
    $modal.querySelectorAll('[data-size]').forEach(b => b.onclick = () => {
      const n = +b.dataset.size; newExam(mode, null, n);
    });
  }

  function newExam(mode, ids, size = FULL) {
    closeModal();
    if (!ids) ids = buildIds(mode === 'mistakes' ? shuffle(mistakeIds()) : mode === 'top' ? mistakeStats().map(s => s.id) : [], size);
    state.exam = {
      mode, ids, size: ids.length, idx: 0, view: 'q', done: false, started: Date.now(), left: ids.length * SECONDS_PER_Q,
      answers: ids.map(id => Array(Q.get(id).st.length).fill(false)), // ticked = true statement
      seen: ids.map((_, i) => i === 0), flags: ids.map(() => false), showFa: ids.map(() => state.settings.showFa),
    };
    setExamMode(true);
    renderExam(true);
    window.scrollTo({ top: 0 });
    startTimer();
  }

  function startTimer() {
    clearInterval(state.timerId);
    if (!state.settings.timer) return;
    state.timerId = setInterval(() => {
      const ex = state.exam; if (!ex || ex.done) return clearInterval(state.timerId);
      ex.left--;
      if (ex.left % 15 === 0) saveDraft();
      const el = document.getElementById('timer');
      if (el) { el.textContent = fmtTime(Math.max(0, ex.left)); el.parentElement.classList.toggle('low', ex.left <= 60); }
      if (ex.left <= 0) { clearInterval(state.timerId); toast('زمان تمام شد!'); finish(); }
    }, 1000);
  }

  function qStatus(i) {
    return state.exam.answers[i].some(Boolean) ? 'answered' : 'unanswered';
  }

  // Read aloud in Danish using the browser's speech engine (like "Læs højt" in the real test).
  function speak(text) {
    try {
      const s = window.speechSynthesis; if (!s) return toast('مرورگر شما خواندن متن را پشتیبانی نمی‌کند.');
      s.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'da-DK';
      const v = s.getVoices().find(v => /^da/i.test(v.lang)); if (v) u.voice = v;
      u.rate = 0.95;
      s.speak(u);
    } catch { /* ignore */ }
  }
  const stopSpeak = () => { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch {} };

  const ICON = {
    list: '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M9 12h7M9 16h7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    x: '<svg width="14" height="14" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    // Same bookmark glyph as "Gem til senere" in the digital test.
    bookmark: f => `<svg class="bm" width="14" height="16" viewBox="0 0 14 16"><path d="M2 1.2h10v13.3L7 11 2 14.5z" stroke="currentColor" stroke-width="1.6" fill="${f ? 'currentColor' : 'none'}" stroke-linejoin="round"/></svg>`,
    speaker: '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>',
    la: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    ra: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    tr: '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M4 5h8M8 3v2M6 5c0 4 2.5 7 6 8M10 5c-.5 3.5-2.8 6.5-6 8M13 21l4-9 4 9M14.5 18h5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    book: '<svg class="ico" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/><path d="M9 8h7M9 11.5h5"/></svg>',
    edit: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>',
    trash: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>',
    chevL: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
    zoom: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    clock: '<svg width="15" height="15" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
  };

  // Shared chrome of the digital theory test: dark info strip (overview + exit buttons), white footer with navy buttons.
  function examShell(inner, foot, { overview = false } = {}) {
    const ex = state.exam;
    const saved = ex.flags.filter(Boolean).length;
    return `<section class="exam" dir="ltr">
      <div class="x-strip">
        <span>Teoriprøve B <span class="fa x-mode">· ${modeName(ex.mode)}</span></span>
        <span class="x-strip-r">
          ${state.settings.timer ? `<span class="x-timer ${ex.left <= 60 ? 'low' : ''}">${ICON.clock}<span id="timer">${fmtTime(ex.left)}</span></span>` : ''}
          ${overview
            ? `<button id="closeOv" class="x-sbtn">${ICON.x}<span>Luk</span></button>`
            : `<button id="grid" class="x-sbtn">${ICON.list}<span>Spørgsmålsoversigt</span>${saved ? `<span class="x-badge">${saved}</span>` : ''}</button>`}
          <button id="quit" class="x-sbtn">${ICON.x}<span class="fa">خروج</span></button>
        </span>
      </div>
      ${inner}
      <nav class="x-foot">${foot}</nav>
    </section>`;
  }

  function renderExam(anim, slide) {
    stopSpeak();
    const ex = state.exam;
    if (ex.view === 'overview') return renderOverview();
    const i = ex.idx, q = Q.get(ex.ids[i]), ans = ex.answers[i], fa = ex.showFa[i];
    ex.seen[i] = true;
    saveDraft();
    const inner = `<div class="x-body ${slide || anim ? 'anim' : ''}">
        <div class="photo">
          <img src="${q.img}" alt="" class="${anim || slide ? 'loading' : ''}" onload="this.classList.remove('loading')">
          <button class="zoom" id="zoom" aria-label="بزرگ‌نمایی">${ICON.zoom}</button>
        </div>
        <div class="qside">
          <div class="qtools">
            <button id="readQ">${ICON.speaker}<span>Læs højt</span></button>
            <button id="flag" class="${ex.flags[i] ? 'on' : ''}">${ICON.bookmark(ex.flags[i])}<span>Gem til senere</span></button>
            <button id="trT" class="${fa ? 'on' : ''}">${ICON.tr}<span class="fa">${fa ? 'پنهان‌کردن ترجمه' : 'ترجمه‌ی فارسی'}</span></button>
          </div>
          <p class="qtext" data-wq="${q.id}" data-wst="-1">${nl(q.sda)}</p>
          ${fa ? `<p class="tr fa q-tr">${nl(q.sfa)}</p>` : ''}
          <div class="answers">${q.st.map((s, k) => `
            <label class="answer ${ans[k] ? 'checked' : ''}">
              <input type="checkbox" data-k="${k}" ${ans[k] ? 'checked' : ''}>
              <span class="box" aria-hidden="true"></span>
              <span class="txt"><span class="da-t" data-wq="${q.id}" data-wst="${k}">${nl(s.da)}</span>${fa && s.fa ? `<span class="tr fa">${nl(s.fa)}</span>` : ''}</span>
              <button type="button" class="speak" data-say="${k}" aria-label="Læs højt">${ICON.speaker}</button>
            </label>`).join('')}
          </div>
        </div>
      </div>`;
    const foot = `${i > 0 ? `<button id="prev" class="x-btn">${ICON.la}<span>Forrige</span></button>` : '<span class="x-spacer"></span>'}
      <span class="x-count">Spørgsmål ${i + 1} ud af ${ex.size}</span>
      <button id="next" class="x-btn"><span>Næste</span>${ICON.ra}</button>`;
    $app.innerHTML = examShell(inner, foot);
    bindShell();

    const setAns = (cb, v) => { cb.checked = v; ans[+cb.dataset.k] = v; cb.closest('.answer').classList.toggle('checked', v); saveDraft(); };
    $app.querySelectorAll('.answer input').forEach(cb => cb.onchange = () => setAns(cb, cb.checked));
    // Selecting a word (drag or double-click) inside an answer must not tick it: ignore clicks that end a
    // selection, and undo the toggle from the first click of a double-click.
    $app.querySelectorAll('.answer').forEach(l => {
      const cb = l.querySelector('input');
      l.addEventListener('click', e => {
        if (e.target.closest('.speak')) return;
        if (e.detail > 1 || !window.getSelection().isCollapsed) e.preventDefault();
      });
      l.addEventListener('dblclick', e => { if (!e.target.closest('.speak')) setAns(cb, !cb.checked); });
    });
    // The speaker sits inside the option's label, so it must not toggle the checkbox.
    $app.querySelectorAll('[data-say]').forEach(b => b.onclick = e => { e.preventDefault(); e.stopPropagation(); speak(q.st[+b.dataset.say].da); });
    document.getElementById('readQ').onclick = () => speak([q.sda, ...q.st.map(s => s.da)].join('. '));
    document.getElementById('trT').onclick = () => { ex.showFa[i] = !ex.showFa[i]; renderExam(false); };
    document.getElementById('flag').onclick = () => { ex.flags[i] = !ex.flags[i]; renderExam(false); };
    document.getElementById('zoom').onclick = () => zoomImg(q.img);
    const pv = document.getElementById('prev'); if (pv) pv.onclick = () => go(i - 1);
    // After the last question the real test shows the overview with the hand-in button.
    document.getElementById('next').onclick = () => i === ex.size - 1 ? showOverview() : go(i + 1);
  }

  function bindShell() {
    const g = document.getElementById('grid'); if (g) g.onclick = showOverview;
    const c = document.getElementById('closeOv'); if (c) c.onclick = () => { state.exam.view = 'q'; renderExam(false, true); };
    document.getElementById('quit').onclick = quitDialog;
  }

  function showOverview() { state.exam.view = 'overview'; renderOverview(); window.scrollTo({ top: 0 }); }

  function renderOverview() {
    stopSpeak();
    const ex = state.exam;
    const answered = ex.answers.filter(a => a.some(Boolean)).length;
    const inner = `<div class="x-body ov anim">
        <div class="ov-l">
          <h1>Din spørgsmålsoversigt</h1>
          <p>Spørgsmålsoversigten giver dig et overblik over dine besvarede, ubesvarede og gemte spørgsmål. Du skal trykke på et nummer for at gå til spørgsmålet.</p>
          <p class="fa ov-fa">در این صفحه سؤال‌های پاسخ‌داده، بی‌پاسخ و ذخیره‌شده (نشانه‌گذاری‌شده) را می‌بینید. روی شماره‌ی هر سؤال بزنید تا به آن بروید.</p>
          <ul class="ov-legend">
            <li><span class="lg-box"></span>Ikke besvaret <span class="fa">— بی‌پاسخ</span></li>
            <li><span class="lg-box answered"></span>Besvaret <span class="fa">— پاسخ‌داده</span></li>
            <li>${ICON.bookmark(true)}Gemte spørgsmål <span class="fa">— ذخیره‌شده برای بعد</span></li>
          </ul>
          <div class="ov-sum fa">${faNum(answered)} از ${faNum(ex.size)} سؤال پاسخ داده شده · ${faNum(ex.flags.filter(Boolean).length)} سؤال ذخیره‌شده</div>
        </div>
        <div class="ov-r">
          <div class="ov-label">Spring til dit spørgsmål</div>
          <div class="tiles">${ex.ids.map((_, i) => `
            <button class="tile ${qStatus(i)} ${ex.flags[i] ? 'marked' : ''} ${i === ex.idx ? 'cur' : ''}" data-i="${i}" aria-label="Spørgsmål ${i + 1}">
              ${ex.flags[i] ? ICON.bookmark(true) : ''}${i + 1}
            </button>`).join('')}
          </div>
        </div>
      </div>`;
    const foot = `<button id="prev" class="x-btn">${ICON.la}<span>Forrige</span></button>
      <span class="x-count"></span>
      <button id="handin" class="x-btn submit"><span>Aflever prøven</span>${ICON.ra}</button>`;
    $app.innerHTML = examShell(inner, foot, { overview: true });
    bindShell();
    $app.querySelectorAll('.tile').forEach(t => t.onclick = () => { ex.view = 'q'; go(+t.dataset.i); });
    document.getElementById('prev').onclick = () => { ex.view = 'q'; go(ex.size - 1); };
    document.getElementById('handin').onclick = askFinish;
  }

  function quitDialog() {
    openModal(`<h3>خروج از آزمون</h3>
      <p style="color:var(--muted);margin:0">آزمون را تحویل می‌دهید، برای ادامه در زمانی دیگر نگه می‌دارید، یا حذفش می‌کنید؟</p>
      <div class="quit-btns">
        <button class="btn btn-primary" id="mHand">تحویل و دیدن نتیجه</button>
        <button class="btn btn-ghost" id="mLeave">ذخیره و ادامه در زمانی دیگر</button>
        <div class="quit-row"><button class="btn btn-text" data-close>بازگشت به آزمون</button><button class="btn btn-text danger" id="mDrop">حذف آزمون</button></div>
      </div>`, 'quit-sheet');
    document.getElementById('mLeave').onclick = () => { closeModal(); stopSpeak(); home(); };
    document.getElementById('mDrop').onclick = () => { state.exam.done = true; dropDraft(); closeModal(); stopSpeak(); home(); };
    document.getElementById('mHand').onclick = () => { closeModal(); askFinish(); };
  }

  function go(i) {
    const ex = state.exam; if (i < 0 || i >= ex.size) return;
    ex.view = 'q'; ex.idx = i; renderExam(false, true); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function askFinish() {
    const empty = state.exam.answers.filter(a => !a.some(Boolean)).length;
    if (empty) confirmBox('تحویل آزمون؟', `در ${faNum(empty)} سؤال هیچ گزینه‌ای تیک نخورده است (هر سؤال حداقل یک گزینه‌ی درست دارد).`, 'تحویل و نتیجه', finish);
    else finish();
  }

  // ---------- Results & review ----------
  function gradeExam(ex) {
    return ex.ids.map((id, i) => {
      const q = Q.get(id), a = ex.answers[i].map(v => (v ? 1 : 0));
      const wrong = q.st.map((s, k) => a[k] !== s.ok);
      return { q, a, wrong, ok: wrong.every(w => !w), w: wrong.filter(Boolean).length, m: ex.flags[i] };
    });
  }
  // Rebuild review rows from a stored attempt (older attempts have no per-statement answers).
  function gradeAttempt(att) {
    return att.items.filter(it => Q.has(it.id)).map(it => {
      const q = Q.get(it.id);
      const a = Array.isArray(it.a) ? it.a : null;
      const wrong = a ? q.st.map((s, k) => (a[k] ? 1 : 0) !== s.ok) : null;
      return { q, a, wrong, ok: it.ok, w: it.w, m: !!it.m };
    });
  }
  const summarize = (res, secs, at, mode) => ({
    res, secs, at, mode, correct: res.filter(r => r.ok).length, wrongSt: res.reduce((a, r) => a + r.w, 0),
  });

  async function finish() {
    const ex = state.exam; if (!ex || ex.done) return;
    ex.done = true; clearInterval(state.timerId); stopSpeak();
    clearTimeout(draftTimer); state.draft = null; // the server drops its draft when it stores the attempt
    const res = gradeExam(ex);
    const secs = Math.round((Date.now() - ex.started) / 1000);
    const payload = { secs, mode: ex.mode, items: res.map(r => ({ id: r.q.id, ok: r.ok, w: r.w, a: r.a, m: r.m ? 1 : 0 })) };
    try {
      const { attempt } = await api('POST', 'attempts', payload);
      state.attempts.push(attempt);
    } catch (e) {
      toast(e.status === 401 ? 'نشست شما منقضی شده؛ نتیجه ذخیره نشد. دوباره وارد شوید.' : 'ذخیره‌ی نتیجه روی سرور ناموفق بود.');
    }
    renderReview(summarize(res, secs, Date.now(), ex.mode), 'wrong', true);
  }

  function renderReview(ctx, filter, fresh) {
    setExamMode(false);
    const { res, correct, wrongSt, secs, at, mode } = ctx;
    const n = res.length, full = n >= FULL, pass = full && correct >= passMin(n), pctN = Math.round(correct / Math.max(n, 1) * 100);
    const C = 2 * Math.PI * 74, pct = correct / Math.max(n, 1);
    const list = res.map((r, i) => ({ ...r, i })).filter(r => filter === 'all' || (filter === 'saved' ? r.m : !r.ok));
    const savedN = res.filter(r => r.m).length;
    $app.innerHTML = `<section class="view">
      ${fresh ? '' : `<button class="back-link" id="back">→ ${state.reviewFrom === 'history' ? 'بازگشت به آزمون‌های قبلی' : 'بازگشت به داشبورد'}</button>`}
      <div class="card result-hero">
        <div class="ring">
          <svg width="170" height="170" viewBox="0 0 170 170">
            <circle cx="85" cy="85" r="74" stroke="var(--surface-2)" stroke-width="14" fill="none"/>
            <circle class="fg" cx="85" cy="85" r="74" stroke="${full ? (pass ? 'var(--ok)' : 'var(--bad)') : 'var(--navy)'}" stroke-width="14" fill="none" stroke-linecap="round"
              stroke-dasharray="${C}" stroke-dashoffset="${C}" id="ringFg"/>
          </svg>
          <div class="val"><div>${full ? `<b id="scoreN">0</b><small class="fa" style="text-align:center">از ${n}</small>` : `<b id="scoreN" class="pct">0</b><small class="fa" style="text-align:center">${faNum(correct)} از ${faNum(n)}</small>`}</div></div>
        </div>
        <div>
          <div class="res-meta">${modeName(mode)} · ${fmtDateTime(at)}</div>
          ${full ? `<h2 class="verdict ${pass ? 'ok' : 'bad'}">${pass ? (fresh ? '🎉 قبول شدید!' : '✓ قبول') : (fresh ? 'مردود — دوباره تلاش کنید' : '✗ مردود')}</h2>
          <div style="color:var(--muted)">${pass ? `حداقل ${faNum(passMin(n))} تصویر از ${faNum(n)} کاملاً درست بود.` : `برای قبولی حداقل ${faNum(passMin(n))} تصویر از ${faNum(n)} باید کاملاً درست باشد.`}</div>`
          : `<h2 class="verdict neutral">${faNum(pctN)}٪ پاسخ درست</h2>
          <div style="color:var(--muted)">آزمون تمرینی ${faNum(n)} سؤالی؛ فقط درصد پاسخ‌های درست ثبت می‌شود. قبولی/مردودی فقط برای آزمون کامل ۲۵ سؤالی تعیین می‌شود.</div>`}
          <div class="kpis">
            <span class="kpi">تصاویر درست: <b>${correct}</b></span>
            <span class="kpi">تصاویر اشتباه: <b>${n - correct}</b></span>
            <span class="kpi">گزینه‌های اشتباه: <b>${wrongSt}</b></span>
            <span class="kpi">زمان: <b>${fmtTime(secs)}</b></span>
          </div>
          <div class="res-actions">
            ${n - correct ? `<button class="btn btn-primary wide-btn" id="retryWrong">تمرین دوباره‌ی همین اشتباهات</button>` : ''}
            <button class="btn ${n - correct ? 'btn-ghost' : 'btn-primary'}" id="again">آزمون جدید</button>
            <button class="btn btn-ghost" id="toHome">داشبورد</button>
          </div>
        </div>
      </div>

      <div class="section-title" style="margin-top:28px">
        <span>مرور پاسخ‌ها</span>
        <div class="tabs"><button data-f="wrong" class="${filter === 'wrong' ? 'on' : ''}">اشتباهات (${faNum(n - correct)})</button>${savedN ? `<button data-f="saved" class="${filter === 'saved' ? 'on' : ''}">${ICON.bookmark(true)} ذخیره‌شده‌ها (${faNum(savedN)})</button>` : ''}<button data-f="all" class="${filter === 'all' ? 'on' : ''}">همه (${faNum(n)})</button></div>
      </div>
      ${res.some(r => !r.a) ? '<div class="note">این آزمون قبل از ذخیره‌ی پاسخ‌های تک‌تک گزینه‌ها انجام شده؛ فقط پاسخ‌های درست نمایش داده می‌شوند.</div>' : ''}
      <div class="review">
        ${list.length ? list.map((r, k) => reviewCard(r, k)).join('') : `<div class="card empty">${filter === 'wrong' ? 'هیچ اشتباهی نداشتید! 👏' : 'موردی نیست.'}</div>`}
      </div>
    </section>`;

    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.getElementById('ringFg').style.strokeDashoffset = C * (1 - pct);
    }));
    const sn = document.getElementById('scoreN'), target = full ? correct : pctN; let v = 0;
    const tick = setInterval(() => { sn.textContent = full ? v : v + '%'; if (v++ >= target) clearInterval(tick); }, 1200 / Math.max(target, 1));

    const rw = document.getElementById('retryWrong');
    if (rw) rw.onclick = () => newExam('mistakes', shuffle(res.filter(r => !r.ok).map(r => r.q.id)));
    document.getElementById('again').onclick = () => askSize('random');
    document.getElementById('toHome').onclick = home;
    const back = document.getElementById('back');
    if (back) back.onclick = state.reviewFrom === 'history' ? () => historyView() : home;
    $app.querySelectorAll('[data-f]').forEach(b => b.onclick = () => renderReview(ctx, b.dataset.f, fresh));
    bindReviewCards($app);
    $app.querySelectorAll('.rcard').forEach((c, k) => { if (filter === 'wrong' && k < 3) c.classList.add('open'); });
    window.scrollTo({ top: 0 });
  }

  function bindReviewCards(root) {
    root.querySelectorAll('.rhead').forEach(h => h.onclick = e => {
      if (e.target.tagName === 'IMG') return zoomImg(e.target.src);
      if (!window.getSelection().isCollapsed || e.detail > 1) return;
      h.parentElement.classList.toggle('open');
    });
  }

  function reviewCard(r, n, extraBadge = '') {
    const q = r.q, t = BANK.topics[q.c];
    return `<article class="card rcard" style="animation-delay:${Math.min(n, 8) * 50}ms">
      <div class="rhead">
        <div class="rimg"><img src="${q.img}" alt="" loading="lazy">${r.i != null ? `<span class="rnum">سؤال ${faNum(r.i + 1)}</span>` : ''}</div>
        <div class="rbadges">
          <span class="badge ${r.ok ? 'ok' : 'bad'}">${r.ok ? '✓ درست' : `✗ ${faNum(r.w)} گزینه‌ی اشتباه`}</span>
          ${r.m ? `<span class="badge saved">${ICON.bookmark(true)} ذخیره‌شده</span>` : ''}
          ${extraBadge}
          ${t ? `<span class="badge topic">${esc(t.fa)}</span>` : ''}
        </div>
        <div class="rq">
          <p class="situation da" data-wq="${q.id}" data-wst="-1">${nl(q.sda)}</p>
          <p class="rq-fa fa">${nl(q.sfa)}</p>
        </div>
        <span class="rtoggle"><span class="fa">${'جزئیات و توضیحات'}</span><svg class="chev" width="18" height="18" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg></span>
      </div>
      <div class="rbody">
        ${q.st.map((s, k) => {
          // Like prove.dk: the number is green when the user answered this statement right, red when wrong
          // (grey for old attempts that did not store the ticks), then "Det rigtige svar er: …".
          const res = r.a ? (r.wrong[k] ? 'bad' : 'ok') : 'na';
          const eda = (s.eda || '').trim() || (s.ok ? 'Ja.' : 'Nej.');
          const efa = (s.efa || '').trim() || (s.ok ? 'بله.' : 'خیر.');
          return `<div class="rstmt">
            <div class="rline">
              <span class="rnum-c ${res}" aria-label="${res === 'ok' ? 'پاسخ شما درست' : res === 'bad' ? 'پاسخ شما اشتباه' : ''}">${k + 1}</span>
              <div class="rtxt">
                <div class="da rst-da" data-wq="${q.id}" data-wst="${k}">${nl(s.da)}</div>
                ${s.fa ? `<div class="fa rtr">${nl(s.fa)}</div>` : ''}
              </div>
            </div>
            <div class="ranswer da">Det rigtige svar er: <i data-wq="${q.id}" data-wst="${k}">${nl(eda)}</i></div>
            <div class="ranswer fa">پاسخ درست: <i>${nl(efa)}</i></div>
          </div>`;
        }).join('')}
        ${t ? `<div class="lesson"><h4>📘 آموزش کوتاه: ${esc(t.fa)} <span class="da" style="font-weight:500;color:var(--muted);font-size:12.5px">(${esc(t.da)})</span></h4>
          <ul>${t.lesson.map(l => `<li>${esc(l)}</li>`).join('')}</ul></div>` : ''}
      </div>
    </article>`;
  }

  function openAttempt(idx) {
    const att = state.attempts[idx]; if (!att) return;
    state.reviewFrom = document.querySelector('.hist-page') ? 'history' : 'home';
    renderReview(summarize(gradeAttempt(att), att.secs, att.at, att.mode), 'wrong', false);
  }

  function showMistake(id) {
    const s = mistakeStats().find(x => x.id === id); if (!s) return;
    const q = Q.get(id), a = s.lastA;
    const wrong = a ? q.st.map((st, k) => (a[k] ? 1 : 0) !== st.ok) : null;
    const r = { q, a, wrong, ok: s.lastOk, w: wrong ? wrong.filter(Boolean).length : 0 };
    openModal(`<div class="review">${reviewCard(r, 0, `<span class="badge warn">${faNum(s.wrong)} بار اشتباه از ${faNum(s.seen)} بار</span>`)}</div>
      <p style="color:var(--muted);font-size:13px;margin:10px 0 0">«شما تیک زدید / نزدید» مربوط به آخرین باری است که این سؤال را جواب داده‌اید.</p>
      <div class="row-btns"><button class="btn btn-ghost" data-close>بستن</button></div>`, 'wide');
    bindReviewCards($modal);
    $modal.querySelector('.rcard').classList.add('open');
  }

  // ---------- Dashboard (home) ----------
  function progressChart(atts) {
    if (atts.length < 2) return `<div class="chart-empty">بعد از دست‌کم ۲ آزمون، نمودار پیشرفت اینجا نمایش داده می‌شود.</div>`;
    const data = atts.slice(-30);
    const W = Math.round(Math.min(640, Math.max(300, $app.clientWidth - 70))), H = 230, L = 34, R = 14, T = 14, B = 26;
    const x = i => L + i * (W - L - R) / (data.length - 1);
    const y = v => T + (1 - v / 100) * (H - T - B);   // percent of pictures fully correct
    const pts = data.map((a, i) => [x(i), y(pct(a) * 100)]);
    const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
    const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${y(0)} L${pts[0][0].toFixed(1)} ${y(0)} Z`;
    const grid = [0, 20, 40, 60, 80, 100].map(v => `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${L - 8}" y="${y(v) + 4}" class="axis" text-anchor="end">${v}%</text>`).join('');
    const every = Math.ceil(data.length / 8);
    const xl = data.map((a, i) => i % every === 0 || i === data.length - 1 ? `<text x="${x(i)}" y="${H - 6}" class="axis" text-anchor="middle">${i + 1 + (atts.length - data.length)}</text>` : '').join('');
    return `<div class="chart" id="progChart">
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="نمودار نمره‌ی آزمون‌ها">
        <defs><linearGradient id="ga" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".16"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>
        ${grid}
        <line x1="${L}" x2="${W - R}" y1="${y(80)}" y2="${y(80)}" class="threshold"/>
        <text x="${L + 6}" y="${y(80) - 6}" class="axis thr-label" text-anchor="end" direction="rtl" style="unicode-bidi:embed">حد قبولی ۸۰٪</text>
        <path d="${area}" fill="url(#ga)" class="area"/>
        <path d="${line}" class="line" pathLength="1"/>
        ${pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="4.5" class="pt"/>`).join('')}
        <line class="xhair" x1="0" x2="0" y1="${T}" y2="${y(0)}" style="opacity:0"/>
        ${xl}
      </svg>
      <div class="tip" hidden></div>
    </div>`;
  }
  function bindProgressChart(atts) {
    const el = document.getElementById('progChart'); if (!el) return;
    const data = atts.slice(-30), svg = el.querySelector('svg'), tip = el.querySelector('.tip'), xh = el.querySelector('.xhair');
    const pts = [...el.querySelectorAll('.pt')];
    const offset = atts.length - data.length;
    let cur = -1;
    const move = e => {
      const r = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal;
      const mx = (e.clientX - r.left) / r.width * vb.width;
      let best = 0, bd = Infinity;
      pts.forEach((p, i) => { const d = Math.abs(+p.getAttribute('cx') - mx); if (d < bd) { bd = d; best = i; } });
      cur = best;
      const a = data[best], s = scoreOf(a), cx = +pts[best].getAttribute('cx');
      pts.forEach((p, i) => p.classList.toggle('on', i === best));
      xh.setAttribute('x1', cx); xh.setAttribute('x2', cx); xh.style.opacity = 1;
      tip.hidden = false;
      tip.innerHTML = `<b>آزمون ${faNum(best + 1 + offset)}</b><span>${fmtDate(a.at)} · ${modeName(a.mode)}</span><span>${isFull(a) ? `نمره: <b class="num">${s}/${a.items.length}</b> · ${isPass(a) ? '✓ قبول' : '✗ مردود'}` : `${faNum(a.items.length)} سؤالی · <b>${pctText(a)}</b> درست`}</span><span class="tip-hint">برای مرور کلیک کنید</span>`;
      const px = cx / vb.width * r.width;
      tip.style.left = Math.min(Math.max(px - tip.offsetWidth / 2, 0), r.width - tip.offsetWidth) + 'px';
      tip.style.top = (+pts[best].getAttribute('cy') / vb.height * r.height - tip.offsetHeight - 12) + 'px';
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('click', e => { move(e); if (cur >= 0) openAttempt(cur + offset); });
    el.addEventListener('pointerleave', () => { tip.hidden = true; xh.style.opacity = 0; pts.forEach(p => p.classList.remove('on')); });
  }

  function topicBars(stats) {
    if (!stats.length) return `<div class="chart-empty">بعد از چند آزمون، دقت شما در هر مبحث اینجا نمایش داده می‌شود.</div>`;
    const rows = stats.sort((a, b) => a.acc - b.acc).slice(0, 8);
    return `<div class="bars">${rows.map((t, n) => `
      <div class="bar-row" title="${esc(t.ok)} درست از ${esc(t.n)}">
        <span class="bar-label">${esc(BANK.topics[t.c].fa)}</span>
        <span class="bar-track"><i style="--w:${Math.max(t.acc * 100, 2)}%;animation-delay:${n * 60}ms"></i></span>
        <span class="bar-val num">${Math.round(t.acc * 100)}%</span>
      </div>`).join('')}</div>
      <div class="chart-note">درصد تصاویری که در هر مبحث کاملاً درست جواب داده‌اید (ضعیف‌ترین مباحث بالا).</div>`;
  }

  const HOME_MISTAKES = 5;
  function mistakesSection() {
    const all = mistakeStats();
    if (!all.length) return `<div class="card empty">هنوز اشتباهی ثبت نشده است.</div>`;
    return mistakeCards(all.slice(0, HOME_MISTAKES)) +
      `<button class="tr-toggle more" id="allMistakes">نمایش همه‌ی اشتباهات به تفکیک مبحث (${faNum(all.length)}) ←</button>`;
  }
  function mistakeCards(list) {
    return `<div class="mgrid">${list.map((s, n) => {
      const q = Q.get(s.id), t = BANK.topics[q.c];
      return `<button class="card mcard" data-mid="${s.id}" style="animation-delay:${n * 40}ms">
        <span class="mimg"><img src="${q.img}" alt="" loading="lazy"><span class="mcount">×${s.wrong}</span></span>
        <span class="mbody">
          <span class="mtopic">${t ? esc(t.fa) : ''}</span>
          <span class="mq da">${esc(q.sda)}</span>
          <span class="mmeta">${faNum(s.wrong)} اشتباه از ${faNum(s.seen)} بار · ${s.lastOk ? '<span class="okc">آخرین بار درست</span>' : '<span class="badc">آخرین بار اشتباه</span>'}</span>
        </span>
      </button>`;
    }).join('')}</div>`;
  }
  // All mistakes on their own page, grouped by topic; topics with the most wrong answers first.
  function mistakesView() {
    stopSpeak(); leaveExam(); setExamMode(false); closeModal();
    const groups = new Map();
    for (const s of mistakeStats()) {
      const c = Q.get(s.id).c, g = groups.get(c) || { c, list: [], wrong: 0 };
      g.list.push(s); g.wrong += s.wrong; groups.set(c, g);
    }
    const sorted = [...groups.values()].sort((a, b) => b.wrong - a.wrong || b.list.length - a.list.length);
    const total = sorted.reduce((a, g) => a + g.list.length, 0);
    $app.innerHTML = `<section class="view">
      <button class="back-link" id="back">→ بازگشت به داشبورد</button>
      <div class="words-head"><h1>بیشترین اشتباهات <small class="muted">(${faNum(total)} سؤال در ${faNum(sorted.length)} مبحث)</small></h1></div>
      ${sorted.length ? sorted.map(g => `
        <div class="section-title"><span>${esc(BANK.topics[g.c] ? BANK.topics[g.c].fa : 'سایر')} <small class="muted">(${faNum(g.list.length)} سؤال · ${faNum(g.wrong)} اشتباه)</small></span></div>
        ${mistakeCards(g.list)}`).join('') : '<div class="card empty">هنوز اشتباهی ثبت نشده است.</div>'}
    </section>`;
    document.getElementById('back').onclick = home;
    $app.querySelectorAll('[data-mid]').forEach(b => b.onclick = () => showMistake(+b.dataset.mid));
    window.scrollTo({ top: 0 });
  }

  // Newest first; the dashboard passes a limit and links to the full list on its own page.
  const HOME_HIST = 3;
  // `edit` (past-exams page) adds a delete button next to each exam.
  function historyList(limit = Infinity, edit = false) {
    const atts = state.attempts;
    if (!atts.length) return '<div class="card empty">هنوز آزمونی نداده‌اید. از «شروع آزمون» شروع کنید ✨</div>';
    const shown = atts.map((_, i) => i).reverse().slice(0, limit);
    return shown.map(i => {
      const h = atts[i], s = scoreOf(h), wrongImgs = h.items.length - s;
      const thumbs = h.items.filter(it => !it.ok && Q.has(it.id)).slice(0, 4).map(it => `<img src="${Q.get(it.id).img}" alt="" loading="lazy">`).join('');
      const body = `<span class="pill ${isFull(h) ? (isPass(h) ? 'ok' : 'bad') : 'neutral'}">${isFull(h) ? `${s}/${h.items.length}` : pctText(h)}</span>
        <span class="meta"><b>آزمون ${faNum(i + 1)}</b> · ${faNum(h.items.length)} سؤالی · ${isFull(h) ? (isPass(h) ? 'قبول' : 'مردود') : 'تمرینی'} · ${modeName(h.mode)}<br>
          <small>${fmtDateTime(h.at)} · ${wrongImgs ? `${faNum(wrongImgs)} سؤال غلط` : 'بدون اشتباه'} · ${fmtTime(h.secs)}${h.items.some(it => it.m) ? ` · ${ICON.bookmark(true)} ${faNum(h.items.filter(it => it.m).length)} ذخیره‌شده` : ''}</small></span>
        <span class="hthumbs">${thumbs}</span>`;
      // In delete mode the card is not a link: the delete button takes the place of "مرور".
      return edit
        ? `<div class="card hist editing">${body}<button class="hist-del" data-del-att="${i}" title="حذف آزمون" aria-label="حذف آزمون">${ICON.trash}</button></div>`
        : `<button class="card hist" data-att="${i}">${body}<span class="go">مرور ←</span></button>`;
    }).join('') + (atts.length > limit ? `<button class="tr-toggle more" id="allHist">نمایش همه‌ی آزمون‌ها (${faNum(atts.length)}) ←</button>` : '');
  }

  function home() {
    stopSpeak(); leaveExam(); closeModal(); setExamMode(false);
    const atts = state.attempts;
    const passed = atts.filter(isPass).length, fullN = atts.filter(isFull).length;
    const pcts = atts.map(a => Math.round(pct(a) * 100));
    const last5 = pcts.slice(-5);
    const avg5 = last5.length ? last5.reduce((a, b) => a + b, 0) / last5.length : 0;
    const best = pcts.length ? Math.max(...pcts) : 0;
    const seen = new Set(atts.flatMap(a => a.items.map(i => i.id))).size;
    const mCount = mistakeIds().length, topCount = mistakeStats().length;
    const est = passEstimate();
    const avgSecs = atts.length ? Math.round(atts.reduce((a, b) => a + b.secs, 0) / atts.length) : 0;
    const prev3 = pcts.slice(-6, -3);
    const trend = pcts.length >= 4 ? pcts.slice(-3).reduce((a, b) => a + b, 0) / 3 - prev3.reduce((a, b) => a + b, 0) / prev3.length : null;
    const probPct = est ? Math.round(est.prob * 100) : null;
    const probCls = probPct == null ? '' : probPct >= 80 ? 'ok' : probPct >= 50 ? 'warn' : 'bad';
    const probText = probPct == null ? 'اولین آزمون را بدهید' : probPct >= 80 ? 'آماده‌ی آزمون هستید' : probPct >= 50 ? 'نزدیک هستید؛ تمرین بیشتر' : 'نیاز به تمرین بیشتر';
    const G = 2 * Math.PI * 52;

    $app.innerHTML = `<section class="view">
      ${draftCard()}
      <div class="dash-hero">
        <div>
          <div class="hello">سلام ${esc(state.user.name)} 👋</div>
          <h1>${atts.length ? 'ادامه بده، هر آزمون تو را <span>یک قدم نزدیک‌تر</span> می‌کند' : 'آماده‌ای؟ <span>اولین آزمون</span> را شروع کن'}</h1>
          <div class="actions">
            <button class="btn btn-primary" id="start"><svg width="18" height="18" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg> شروع آزمون</button>
            <button class="btn btn-ghost" id="startM" ${mCount ? '' : 'disabled'}>تمرین اشتباهات (${faNum(mCount)})</button>
          </div>
        </div>
        <div class="card gauge ${probCls}">
          <div class="gauge-ring">
            <svg width="130" height="130" viewBox="0 0 130 130"><circle cx="65" cy="65" r="52" class="g-bg"/><circle cx="65" cy="65" r="52" class="g-fg" stroke-dasharray="${G}" stroke-dashoffset="${G}" id="gFg"/></svg>
            <div class="g-val"><b class="num">${probPct == null ? '–' : probPct + '%'}</b></div>
          </div>
          <div class="g-txt"><div class="g-title">احتمال قبولی</div><div class="g-sub">${probText}</div>
            ${est ? `<div class="g-note">بر اساس ${faNum(est.n)} آزمون اخیر · دقت هر تصویر ${faNum(Math.round(est.p * 100))}٪</div>` : ''}</div>
        </div>
      </div>

      <div class="stats">
        <div class="card stat stat-link" id="statExams" role="button" tabindex="0" title="مشاهده‌ی آزمون‌های قبلی"><span>آزمون‌ها ${atts.length ? ICON.chevL : ''}</span><b>${atts.length}</b><small>${fullN ? `${faNum(passed)} قبولی از ${faNum(fullN)} آزمون کامل` : 'هنوز آزمون کامل ۲۵ سؤالی نداده‌اید'}</small></div>
        <div class="card stat"><span>میانگین ۵ آزمون اخیر (درصد درست)</span><b>${atts.length ? Math.round(avg5) : '–'}<em>٪</em></b><small>${trend == null ? 'روند: داده‌ی کافی نیست' : trend >= 0 ? `▲ ${faNum(Math.round(trend))}٪ رو به بهبود` : `▼ ${faNum(Math.round(Math.abs(trend)))}٪ افت`}</small></div>
        <div class="card stat"><span>بهترین نمره</span><b>${atts.length ? best : '–'}<em>٪</em></b><small>میانگین زمان ${atts.length ? fmtTime(avgSecs) : '–'}</small></div>
        <div class="card stat"><span>پوشش بانک سؤال</span><b>${Math.round(seen / BANK.questions.length * 100)}<em>٪</em></b><small>${faNum(seen)} از ${faNum(BANK.questions.length)} · 🔥 ${faNum(streakDays())} روز پیاپی</small>
          <span class="mini-track"><i style="width:${seen / BANK.questions.length * 100}%"></i></span></div>
      </div>

      <div class="grid2">
        <div class="card panel"><div class="panel-h"><h3>نمودار پیشرفت</h3><span class="legend"><i class="lg-line"></i>نمره هر آزمون <i class="lg-thr"></i>حد قبولی</span></div>${progressChart(atts)}</div>
        <div class="card panel"><div class="panel-h"><h3>نقاط ضعف بر اساس مبحث</h3></div>${topicBars(topicStats())}</div>
      </div>

      <div class="section-title"><span>آزمون‌های قبلی <small class="muted">— برای مرور پاسخ‌ها و اشتباهات روی هر آزمون بزنید</small></span></div>
      <div class="history">${historyList(HOME_HIST)}</div>

      <div class="section-title"><span>بیشترین اشتباهات شما${topCount ? ` <small class="muted">(${faNum(topCount)} سؤال)</small>` : ''}</span>${topCount ? `<button class="tr-toggle" id="startTop">آزمون از پراشتباه‌ترین سؤالات</button>` : ''}</div>
      ${mistakesSection()}

      <div class="section-title">تنظیمات و امکانات</div>
      <div class="card opts">
        <button class="opt opt-link" id="openWords"><span class="opt-ico">${ICON.book}</span><div class="opt-main">لغات ذخیره‌شده</div><span class="opt-go">${(state.words || []).length ? `<b>${faNum(state.words.length)}</b>` : ''}${ICON.chevL}</span></button>
        <div class="opt"><div>نمایش ترجمه‌ی فارسی زیر گزینه‌ها<small>در هر سؤال با دکمه‌ی «ترجمه» هم می‌توانید آن را باز و بسته کنید.</small></div><button class="switch ${state.settings.showFa ? 'on' : ''}" data-set="showFa" aria-label="ترجمه"></button></div>
        <div class="opt"><div>زمان‌سنج<small>برای هر سؤال ۱ دقیقه (آزمون ۲۵ سؤالی = ۲۵ دقیقه، مثل آزمون واقعی)؛ با پایان زمان، آزمون خودکار تحویل داده می‌شود.</small></div><button class="switch ${state.settings.timer ? 'on' : ''}" data-set="timer" aria-label="زمان‌سنج"></button></div>
        <div class="opt"><div>شرط قبولی<small>حداقل ۸۰٪ تصاویر باید کاملاً درست باشند (در آزمون واقعی ۲۵ سؤالی: ۲۰ تصویر؛ ۵ سؤالی: ۴ تصویر). «کاملاً درست» یعنی همه‌ی گزینه‌های درست تیک خورده و هیچ گزینه‌ی نادرستی تیک نخورده باشد.</small></div></div>
      </div>
    </section>`;

    requestAnimationFrame(() => requestAnimationFrame(() => {
      const g = document.getElementById('gFg'); if (g && est) g.style.strokeDashoffset = G * (1 - est.prob);
    }));
    bindProgressChart(atts);
    bindHome();
    window.scrollTo({ top: 0 });
  }

  function bindHome() {
    document.getElementById('start').onclick = () => askSize('random');
    const rs = document.getElementById('resume'); if (rs) rs.onclick = resumeExam;
    const dd = document.getElementById('dropDraft');
    if (dd) dd.onclick = () => confirmBox('حذف آزمون نیمه‌تمام؟', 'پاسخ‌های این آزمون ذخیره نمی‌شوند.', 'حذف', () => { dropDraft(); home(); });
    document.getElementById('openWords').onclick = () => wordsView();
    const se = document.getElementById('statExams');
    if (se && state.attempts.length) { se.onclick = () => historyView(); se.onkeydown = e => { if (e.key === 'Enter') historyView(); }; }
    document.getElementById('startM').onclick = () => askSize('mistakes');
    const st = document.getElementById('startTop'); if (st) st.onclick = () => askSize('top');
    $app.querySelectorAll('[data-mid]').forEach(b => b.onclick = () => showMistake(+b.dataset.mid));
    const am = document.getElementById('allMistakes'); if (am) am.onclick = mistakesView;
    bindHistory();
    $app.querySelectorAll('[data-set]').forEach(b => b.onclick = () => {
      const k = b.dataset.set; state.settings[k] = !state.settings[k]; b.classList.toggle('on', state.settings[k]); saveSettings();
    });
  }
  // Full list of past exams (opened from the "exams" card on the dashboard).
  // "حذف" switches the page into delete mode: a delete button next to each exam, each asking for a yes/no first.
  function historyView(edit = false) {
    stopSpeak(); leaveExam(); setExamMode(false); closeModal();
    edit = edit && state.attempts.length > 0;
    $app.innerHTML = `<section class="view hist-page">
      <button class="back-link" id="back">→ بازگشت به داشبورد</button>
      <div class="words-head"><h1>آزمون‌های قبلی <small class="muted">(${faNum(state.attempts.length)} آزمون)</small></h1>
        ${state.attempts.length ? `<span class="head-btns">${edit ? '<button class="tr-toggle danger" id="clearH">حذف همه</button>' : ''}<button class="tr-toggle ${edit ? '' : 'danger'}" id="editHist">${edit ? 'لغو' : `${ICON.trash} حذف`}</button></span>` : ''}</div>
      <div class="history">${historyList(Infinity, edit)}</div>
    </section>`;
    document.getElementById('back').onclick = home;
    const eh = document.getElementById('editHist'); if (eh) eh.onclick = () => { const y = scrollY; historyView(!edit); scrollTo({ top: y }); };
    const ch = document.getElementById('clearH');
    if (ch) ch.onclick = () => confirmBox('حذف همه‌ی آزمون‌ها؟', `هر ${faNum(state.attempts.length)} آزمون، نمودارها و آمار اشتباهات حساب شما پاک می‌شود.`, 'بله', async () => {
      try { await api('DELETE', 'attempts'); state.attempts = []; historyView(); toast('همه‌ی آزمون‌ها حذف شدند'); } catch (e) { toast(e.message); }
    }, 'خیر');
    $app.querySelectorAll('[data-del-att]').forEach(b => b.onclick = () => {
      const i = +b.dataset.delAtt, att = state.attempts[i];
      confirmBox('حذف آزمون؟', `آزمون ${faNum(i + 1)} (${fmtDateTime(att.at)}) و نتیجه‌اش از تاریخچه و آمار حذف می‌شود.`, 'بله', async () => {
        try {
          await api('DELETE', 'attempt', { at: att.at });
          state.attempts = state.attempts.filter(a => a !== att);
          const y = scrollY; historyView(true); scrollTo({ top: y });
          toast('آزمون حذف شد');
        } catch (e) { toast(e.message); }
      }, 'خیر');
    });
    bindHistory();
    window.scrollTo({ top: 0 });
  }

  function bindHistory() {
    $app.querySelectorAll('[data-att]').forEach(b => b.onclick = () => openAttempt(+b.dataset.att));
    const all = document.getElementById('allHist');
    if (all) all.onclick = () => historyView();
  }

  // ---------- Word bank ----------
  // Select (or double-tap) a Danish word in a question or answer → a bubble immediately shows its Persian
  // meaning (from the built-in glossary BANK.dict) with a one-tap "save" button. Saved words are listed on
  // their own page (from "Settings & tools").
  const findWord = w => (state.words || []).find(x => x.w.toLowerCase() === w.toLowerCase());
  const normWord = w => w.toLowerCase().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
  // Meaning of a word or short phrase: the whole phrase if known, otherwise word by word.
  function glossOf(text) {
    const dict = (BANK && BANK.dict) || {};
    const whole = dict[normWord(text)];
    if (whole) return whole;
    const parts = text.split(/\s+/).map(w => ({ w, m: dict[normWord(w)] })).filter(p => p.m);
    return parts.length ? parts.map(p => (parts.length > 1 ? `${p.w}: ` : '') + p.m.replace(/\s*\(.*?\)\s*/g, ' ').trim()).join(' · ') : '';
  }

  const $bubble = document.createElement('div');
  $bubble.className = 'word-bubble';
  $bubble.hidden = true;
  document.body.appendChild($bubble);
  let selInfo = null, selTimer = null, hideTimer = null;

  function currentSelection() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return null;
    const text = sel.toString().replace(/\s+/g, ' ').trim().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
    if (!text || text.length > 60 || text.split(' ').length > 5 || /[\u0600-\u06EF\u06FA-\u06FF]/.test(text)) return null;
    const range = sel.getRangeAt(0);
    const node = range.commonAncestorContainer;
    const host = (node.nodeType === 1 ? node : node.parentElement)?.closest('[data-wq]');
    if (!host) return null;
    const rect = range.getBoundingClientRect();
    if (!rect.width && !rect.height) return null;
    return { text, qid: +host.dataset.wq, st: +host.dataset.wst, rect };
  }
  function hideBubble() { $bubble.hidden = true; selInfo = null; }
  function placeBubble(r) {
    const bw = $bubble.offsetWidth, bh = $bubble.offsetHeight;
    // Below the selection (keeps clear of the phone's own copy/paste menu above it).
    let top = r.bottom + 10;
    if (top + bh > window.innerHeight - 70) top = r.top - bh - 10;
    $bubble.style.top = Math.max(8, top) + 'px';
    $bubble.style.left = Math.min(Math.max(8, r.left + r.width / 2 - bw / 2), window.innerWidth - bw - 8) + 'px';
  }
  function updateBubble() {
    clearTimeout(hideTimer);
    selInfo = currentSelection();
    if (!selInfo) return hideBubble();
    const saved = findWord(selInfo.text);
    const meaning = saved ? saved.t : glossOf(selInfo.text);
    selInfo.meaning = meaning;
    $bubble.innerHTML = `<div class="wb-head"><span class="wb-word da">${esc(selInfo.text)}</span>
        <button type="button" class="wb-say" aria-label="Læs højt">${ICON.speaker}</button></div>
      <div class="wb-mean fa">${meaning ? esc(meaning) : '<span class="muted">معنی در دسترس نیست</span>'}</div>
      ${saved ? '<div class="wb-saved fa">✓ در بانک لغات</div>' : '<button type="button" class="wb-save fa">＋ ذخیره در بانک لغات</button>'}`;
    $bubble.hidden = false;
    placeBubble(selInfo.rect);
  }
  document.addEventListener('selectionchange', () => { clearTimeout(selTimer); selTimer = setTimeout(updateBubble, 180); });
  window.addEventListener('scroll', () => { if (!$bubble.hidden) hideBubble(); }, { passive: true });
  // Keep the text selected while pressing inside the bubble.
  $bubble.addEventListener('pointerdown', e => e.preventDefault());
  $bubble.addEventListener('mousedown', e => e.preventDefault());
  $bubble.addEventListener('click', async e => {
    const info = selInfo; if (!info) return;
    if (e.target.closest('.wb-say')) return speak(info.text);
    const btn = e.target.closest('.wb-save'); if (!btn) return;
    btn.disabled = true;
    const { ctx, ctxFa } = contextOf(info);
    try {
      const { word } = await api('POST', 'words', { w: info.text, t: info.meaning || '', ctx, ctxFa, qid: info.qid });
      state.words = state.words || [];
      const i = state.words.findIndex(x => x.w.toLowerCase() === word.w.toLowerCase());
      if (i >= 0) state.words[i] = word; else state.words.push(word);
      btn.outerHTML = '<div class="wb-saved fa">✓ در بانک لغات ذخیره شد</div>';
      hideTimer = setTimeout(() => { window.getSelection()?.removeAllRanges(); hideBubble(); }, 1400);
    } catch (err) { btn.disabled = false; toast(err.message); }
  });

  function contextOf(info) {
    const q = Q.get(info.qid); if (!q) return { ctx: '', ctxFa: '' };
    const s = info.st >= 0 ? q.st[info.st] : null;
    return s ? { ctx: s.da, ctxFa: s.fa } : { ctx: q.sda, ctxFa: q.sfa };
  }
  const markWord = (text, w) => {
    const i = text.toLowerCase().indexOf(w.toLowerCase());
    return i < 0 ? esc(text) : esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + w.length)) + '</mark>' + esc(text.slice(i + w.length));
  };

  function wordsView(query = '') {
    stopSpeak(); leaveExam(); setExamMode(false); closeModal();
    const all = (state.words || []).slice().sort((a, b) => b.at - a.at);
    const q = query.trim().toLowerCase();
    const list = q ? all.filter(x => x.w.toLowerCase().includes(q) || (x.t || '').includes(q) || (x.en || '').toLowerCase().includes(q)) : all;
    $app.innerHTML = `<section class="view">
      <button class="back-link" id="back">→ بازگشت به داشبورد</button>
      <div class="words-head">
        <h1><span class="h-ico">${ICON.book}</span>بانک لغات <small class="muted">(${faNum(all.length)} لغت)</small></h1>
        ${all.length ? `<label class="field words-search"><input id="wSearch" value="${esc(query)}" placeholder="جستجو در لغات (دانمارکی، فارسی یا انگلیسی)" autocomplete="off"></label>` : ''}
      </div>
      ${all.length ? '' : `<div class="card empty">هنوز لغتی ذخیره نکرده‌اید.<br>در حین آزمون، روی یک کلمه‌ی دانمارکی دوبار بزنید (یا آن را انتخاب کنید) و «ذخیره در بانک لغات» را بزنید.</div>`}
      <div class="words">${list.map((x, n) => `
        <article class="card wcard" style="animation-delay:${Math.min(n, 10) * 30}ms" data-w="${esc(x.w)}">
          <div class="wtop">
            <div class="wmain"><span class="wword da">${esc(x.w)}</span><button class="speak" data-sayw="${esc(x.w)}" aria-label="Læs højt">${ICON.speaker}</button></div>
            <div class="wact">
              <button class="wbtn" data-edit title="ویرایش ترجمه" aria-label="ویرایش ترجمه">${ICON.edit}</button>
              <button class="wbtn danger" data-del title="حذف" aria-label="حذف">${ICON.trash}</button>
            </div>
          </div>
          <div class="wt fa">${x.t ? esc(x.t) : '<span class="muted">بدون ترجمه</span>'}</div>
          ${x.en ? `<div class="wen da">${esc(x.en)}</div>` : ''}
          ${x.ctx ? `<div class="wctx"><div class="da">${markWord(x.ctx, x.w)}</div>${x.ctxFa ? `<div class="fa">${esc(x.ctxFa)}</div>` : ''}</div>` : ''}
          <div class="wdate">${fmtDateTime(x.at)}</div>
        </article>`).join('')}
        ${all.length && !list.length ? '<div class="card empty">لغتی با این جستجو پیدا نشد.</div>' : ''}
      </div>
    </section>`;
    document.getElementById('back').onclick = home;
    const s = document.getElementById('wSearch');
    if (s) {
      s.oninput = () => { clearTimeout(s._t); s._t = setTimeout(() => { wordsView(s.value); const n = document.getElementById('wSearch'); n.focus(); n.setSelectionRange(n.value.length, n.value.length); }, 250); };
    }
    $app.querySelectorAll('[data-sayw]').forEach(b => b.onclick = () => speak(b.dataset.sayw));
    $app.querySelectorAll('.wcard').forEach(card => {
      const w = card.dataset.w, entry = findWord(w);
      card.querySelector('[data-del]').onclick = () => confirmBox('حذف لغت؟', `«${esc(w)}» از بانک لغات حذف شود؟`, 'حذف', async () => {
        try { await api('DELETE', 'words', { w }); state.words = state.words.filter(x => x !== entry); wordsView(query); }
        catch (e) { toast(e.message); }
      });
      card.querySelector('[data-edit]').onclick = () => {
        const box = card.querySelector('.wt');
        box.innerHTML = `<form class="wedit"><input value="${esc(entry.t || '')}" autocomplete="off"><button class="btn btn-primary">ذخیره</button></form>`;
        const f = box.querySelector('form'), inp = f.querySelector('input'); inp.focus();
        f.onsubmit = async e => {
          e.preventDefault();
          try { const { word } = await api('POST', 'words', { ...entry, t: inp.value }); Object.assign(entry, word); wordsView(query); }
          catch (err) { toast(err.message); }
        };
      };
    });
    if (!query) window.scrollTo({ top: 0 });
  }

  // ---------- keyboard ----------
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !$modal.hidden) return closeModal();
    const ex = state.exam; if (!ex || ex.done || !$modal.hidden) return;
    if (e.target.tagName === 'INPUT' && e.target.type !== 'checkbox') return;
    if (ex.view === 'overview') return;
    if (e.key === 'ArrowRight') ex.idx === ex.size - 1 ? showOverview() : go(ex.idx + 1); // LTR like the real test
    else if (e.key === 'ArrowLeft') go(ex.idx - 1);
    else if (/^[1-4]$/.test(e.key)) { const cb = $app.querySelectorAll('.answer input')[+e.key - 1]; if (cb) cb.click(); }
  });
  window.addEventListener('beforeunload', e => { if (state.exam && !state.exam.done) { e.preventDefault(); e.returnValue = ''; } });

  // ---------- boot ----------
  (async () => {
    if (location.protocol === 'file:') {
      $app.innerHTML = `<div class="card empty" style="margin-top:40px">برای ورود با حساب کاربری، سایت را از طریق سرور باز کنید:<br><code class="da">node server.js</code> و سپس <code class="da">http://localhost:3000</code></div>`;
      return;
    }
    try { state.inviteRequired = !!(await api('GET', 'config')).inviteRequired; } catch { /* offline: assume no invite */ }
    try { await loadMe(); home(); }
    catch (e) {
      if (e.status && e.status !== 401) toast(e.message);
      authView('login');
    }
  })();
})();
