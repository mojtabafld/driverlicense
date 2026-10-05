(() => {
  'use strict';
  // The question bank (data.js) is only served to signed-in users, so it is loaded after login.
  let BANK = null, Q = new Map();
  function loadBank() {
    if (BANK) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'data.js';
      s.onload = () => {
        BANK = window.BANK; Q = new Map(BANK.questions.map(q => [q.id, q]));
        // Where each question sits in prove.dk's numbered tests ("prove.dk 12 · #7" = test 12, question 7); a few are in two.
        // Our test ids are prove.dk's, so each label links to that test there (prove.dk has no link to a single question).
        BANK.tests.forEach(t => t.qs.forEach((id, i) => {
          const q = Q.get(id);
          if (q) (q.src = q.src || []).push({ label: `prove.dk ${(t.title.match(/\d+/) || [t.id])[0]} · #${i + 1}`, test: t.id });
        }));
        resolve();
      };
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
  const state = { user: null, attempts: [], settings: { showFa: true, timer: true }, exam: null, timerId: null, words: [], saved: [], lessonDrafts: {} };

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
  // Topics are the official teaching-plan subsections (e.g. "7.19"); shown with their number.
  const topicFa = c => (BANK.topics[c] ? `${faNum(c)} ${BANK.topics[c].fa}` : 'سایر');
  // Show Persian digits everywhere on the page, Danish content (questions, answers, Danish labels) included;
  // only inputs, code, the exam's "Spørgsmål 3 ud af 25" counter and the review's statement numbers keep Latin digits.
  // Runs on every DOM change, so animated counters and timers are covered.
  // In Danish text "." is a thousands separator (1.000 kr), so only Persian text gets the decimal sign.
  const LATIN_ZONE = 'input, textarea, code, .x-count, .st-pos, .rnum-c, .badge.src, script, style';
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
  // All dates and times are shown in Copenhagen time, whatever the device's time zone.
  const TZ = 'Europe/Copenhagen';
  const fmtDate = t => new Date(t).toLocaleDateString('fa-IR-u-ca-gregory', { timeZone: TZ, month: 'short', day: 'numeric' });
  const fmtDateTime = t => new Date(t).toLocaleString('fa-IR-u-ca-gregory', { timeZone: TZ, month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const dayKey = t => new Date(t).toLocaleDateString('en-CA', { timeZone: TZ }); // YYYY-MM-DD in Copenhagen
  const modeName = (m, lesson) => (m === 'lesson' ? lessonName(lesson) : { mistakes: 'تمرین اشتباهات', top: 'پراشتباه‌ترین سؤالات', sections: 'آموزش بر اساس دسته‌بندی' }[m] || 'آزمون تصادفی');
  // Lessons are learning, not a timed test: no clock.
  const timed = ex => state.settings.timer && ex.mode !== 'lesson';
  // exam-mode: the exam screens (no site header). focus-mode: a past review, also without the header; every view
  // starts with setExamMode(false), which leaves both.
  const setExamMode = on => { document.body.classList.toggle('exam-mode', on); document.body.classList.remove('focus-mode'); };
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
    openModal(`<h3>${title}</h3>${body ? `<p style="color:var(--muted);margin:0">${body}</p>` : ''}
      <div class="row-btns"><button class="btn btn-ghost" data-close>${cancelText}</button><button class="btn btn-primary" id="mOk">${okText}</button></div>`);
    document.getElementById('mOk').onclick = () => { closeModal(); onOk(); };
  }
  const zoomImg = src => openModal(`<img src="${src}" alt="" data-close>`, 'img');

  // ---------- exam language (Danish or English, per user; the Persian translation is shown with either) ----------
  const LANGS = { da: 'دانمارکی', en: 'انگلیسی' };
  const examLang = () => (state.settings.lang === 'en' ? 'en' : 'da');
  const qText = q => (examLang() === 'en' && q.sen) || q.sda;
  const stText = s => (examLang() === 'en' && s.en) || s.da;
  const stExpl = s => (examLang() === 'en' ? s.een : s.eda) || '';
  // Labels of the exam screens, as in the real test in each language.
  const EXAM_UI = {
    da: { read: 'Læs højt', save: 'Gem til senere', prev: 'Forrige', next: 'Næste', count: (i, n) => `Spørgsmål ${i} ud af ${n}`,
      overview: 'Spørgsmålsoversigt', ovTitle: 'Din spørgsmålsoversigt',
      ovText: 'Spørgsmålsoversigten giver dig et overblik over dine besvarede, ubesvarede og gemte spørgsmål. Du skal trykke på et nummer for at gå til spørgsmålet.',
      notAnswered: 'Ikke besvaret', answered: 'Besvaret', saved: 'Gemte spørgsmål', jump: 'Spring til dit spørgsmål', q: 'Spørgsmål',
      handin: 'Aflever prøven', correct: 'Det rigtige svar er:', yes: 'Ja.', no: 'Nej.', expl: 'Forklaring:' },
    en: { read: 'Read aloud', save: 'Save for later', prev: 'Previous', next: 'Next', count: (i, n) => `Question ${i} of ${n}`,
      overview: 'Question overview', ovTitle: 'Your question overview',
      ovText: 'The question overview gives you an overview of your answered, unanswered and saved questions. Tap a number to go to the question.',
      notAnswered: 'Not answered', answered: 'Answered', saved: 'Saved questions', jump: 'Jump to your question', q: 'Question',
      handin: 'Hand in the test', correct: 'The correct answer is:', yes: 'Yes.', no: 'No.', expl: 'Explanation:' },
  };
  const ui = () => EXAM_UI[examLang()];

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
      s.lastOk = it.ok; s.lastA = it.a || null; s.lastAttempt = ai; s.lastAt = a.at;
      m.set(it.id, s);
    }));
    return [...m.values()].filter(s => s.wrong > 0).sort((a, b) => b.wrong - a.wrong || (b.wrong / b.seen) - (a.wrong / a.seen) || b.lastAttempt - a.lastAttempt);
  }
  // ---- pass probability ----
  // Real rule (Færdselsstyrelsen, as on prove.dk): pass with at most 5 wrong pictures, i.e. ≥20 of 25 fully right.
  // Model: every picture is answered fully right with an unknown probability p. What we know about p is a Beta
  // distribution fitted to the user's own answers, and the chance of passing is the beta-binomial probability of
  // ≥20 right out of 25. Unlike plugging a single p into a binomial, this keeps the remaining uncertainty about p,
  // so a few lucky or unlucky pictures cannot swing the estimate to 0% or 100%.
  // Which answers count, and how much:
  //  - only exams with random questions (any length), like the real test; "mistakes" / "most-missed" practice
  //    is made of the user's hard questions and would pull p down (used only when there is nothing else);
  //  - recent answers weigh more (half-life of 50 answered pictures, last 200 considered), since users improve;
  //  - a picture the user had already seen before counts half: the official test has its own pictures, so
  //    remembered answers overstate what the user will get right there.
  // Prior: uniform Beta(1, 1).
  const PASS_HALF_LIFE = 50, PASS_MAX_ANSWERS = 200, REPEAT_WEIGHT = 0.5;
  function logGamma(x) { // Lanczos approximation
    const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
      12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
    x -= 1; let a = c[0]; const t = x + 7.5;
    for (let i = 1; i < 9; i++) a += c[i] / (x + i);
    return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
  }
  const logBeta = (a, b) => logGamma(a) + logGamma(b) - logGamma(a + b);
  // P(X ≥ k) for X ~ BetaBinomial(n, a, b)
  function betaBinomTailAtLeast(n, k, a, b) {
    let s = 0;
    for (let i = k; i <= n; i++) s += Math.exp(logGamma(n + 1) - logGamma(i + 1) - logGamma(n - i + 1) + logBeta(i + a, n - i + b) - logBeta(a, b));
    return Math.min(1, s);
  }
  function passEstimate() {
    const seen = new Set(), random = [], any = [];
    state.attempts.forEach((att, e) => att.items.forEach(it => {
      const x = { ok: it.ok, repeat: seen.has(it.id), exam: e };
      any.push(x); if (att.mode === 'random') random.push(x);
      seen.add(it.id);
    }));
    const onlyRandom = random.length > 0;
    const recent = (onlyRandom ? random : any).slice(-PASS_MAX_ANSWERS);
    if (!recent.length) return null;
    // Age of an answer = how many counted answers come from later exams (all answers of one exam are equally recent).
    const newer = {};
    recent.forEach(x => { for (const k in newer) if (+k < x.exam) newer[k]++; newer[x.exam] = newer[x.exam] || 0; });
    let good = 0, bad = 0;
    recent.forEach(x => {
      const w = 0.5 ** (newer[x.exam] / PASS_HALF_LIFE) * (x.repeat ? REPEAT_WEIGHT : 1);
      if (x.ok) good += w; else bad += w;
    });
    const a = 1 + good, b = 1 + bad;
    return { p: a / (a + b), prob: betaBinomTailAtLeast(FULL, passMin(FULL), a, b), n: recent.length, weight: good + bad, onlyRandom };
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
    const days = new Set(state.attempts.map(a => dayKey(a.at)));
    let t = Date.now(), n = 0;
    if (!days.has(dayKey(t))) t -= 864e5;
    while (days.has(dayKey(t))) { n++; t -= 864e5; }
    return n;
  }

  // ---------- Auth ----------
  function renderUserBox() {
    if (!state.user) { $user.innerHTML = ''; return; }
    $user.innerHTML = `<span class="user-chip"><span class="avatar">${esc(state.user.name.trim()[0] || '?').toUpperCase()}</span><span class="uname">${esc(state.user.name)}</span></span>
      <button class="icon-btn" id="logoutBtn" title="خروج از حساب" aria-label="خروج"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M15 17l5-5-5-5M20 12H9M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
    document.getElementById('logoutBtn').onclick = () => confirmBox('خروج از حساب؟', '', 'خروج', async () => {
      await api('POST', 'logout').catch(() => {});
      clearInterval(state.timerId);
      Object.assign(state, { user: null, attempts: [], exam: null, words: [] });
      renderUserBox(); authView('login');
    });
  }

  function authView(mode) {
    clearInterval(state.timerId); setExamMode(false);
    const reg = mode === 'register';
    const ico = d => `<svg class="in-ico" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
    const userIco = ico('<circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>');
    const lockIco = ico('<rect x="5" y="10.5" width="14" height="10" rx="2.5" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" stroke-width="1.8" fill="none"/>');
    const nameIco = ico('<path d="M4 20l1-4L16 5l3 3L8 19z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/>');
    const keyIco = ico('<circle cx="8" cy="15" r="4" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M11 12l8-8M16 7l2 2" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>');
    const eye = '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>';
    $app.innerHTML = `<section class="view auth">
      <form class="auth-card" id="authForm" autocomplete="on">
        <div class="auth-head">
          <svg viewBox="0 0 32 32" width="48" height="48" aria-hidden="true"><rect x="2" y="2" width="28" height="28" rx="9" fill="var(--accent)"/><path d="M9 20.5c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="16" cy="20.5" r="2.2" fill="#fff"/><path d="M16 20.5l3.2-3.8" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>
          <h1>${reg ? 'ساخت حساب کاربری' : 'خوش آمدید'}</h1>
          <p>${reg ? 'برای ذخیره‌ی پیشرفت و اشتباهات‌تان یک حساب بسازید' : 'برای ادامه‌ی تمرین وارد حساب خود شوید'}</p>
        </div>
        <div class="tabs full"><button type="button" data-m="login" class="${reg ? '' : 'on'}">ورود</button><button type="button" data-m="register" class="${reg ? 'on' : ''}">ثبت‌نام</button></div>
        ${reg ? `<label class="field"><span>نام نمایشی</span><span class="in-wrap">${nameIco}<input name="name" maxlength="40" placeholder="مثلاً سارا" required></span></label>` : ''}
        <label class="field user-field"><span>نام کاربری</span><span class="in-wrap">${userIco}<input name="username" class="da" autocomplete="username" autocapitalize="off" spellcheck="false" placeholder="username" maxlength="32" ${reg ? 'minlength="3"' : ''} lang="en" dir="ltr" required></span>
          <span class="field-tip" role="alert" hidden>نام کاربری فقط با حروف انگلیسی، عدد و . _ - نوشته می‌شود</span></label>
        <label class="field"><span>رمز عبور</span><span class="in-wrap">${lockIco}<input name="password" type="password" class="da" dir="ltr" placeholder="••••••••" autocomplete="${reg ? 'new-password' : 'current-password'}" required><button type="button" class="in-eye" id="pwEye" aria-label="نمایش رمز" aria-pressed="false">${eye}</button></span></label>
        ${reg && state.inviteRequired ? `<label class="field"><span>کد دعوت</span><span class="in-wrap">${keyIco}<input name="invite" class="da" dir="ltr" autocomplete="off" autocapitalize="off" spellcheck="false" required></span></label>` : ''}
        <div class="form-err" id="authErr"></div>
        <button class="btn btn-primary wide auth-submit" type="submit">${reg ? 'ساخت حساب' : 'ورود'}</button>
      </form>
      <ul class="auth-feats">
        <li>🇩🇰 آزمون تئوری گواهینامه‌ی B</li><li>بیش از ۱۰۰۰ سؤال در ۴۴ آزمون</li><li>ترجمه‌ی فارسی و آموزش</li>
      </ul>
    </section>`;
    const pw = $app.querySelector('input[name=password]'), pe = document.getElementById('pwEye');
    pe.onclick = () => { const show = pw.type === 'password'; pw.type = show ? 'text' : 'password'; pe.setAttribute('aria-pressed', show); pe.setAttribute('aria-label', show ? 'پنهان کردن رمز' : 'نمایش رمز'); pe.classList.toggle('on', show); pw.focus(); };
    $app.querySelectorAll('[data-m]').forEach(b => b.onclick = () => authView(b.dataset.m));
    // Username: English letters, digits and . _ - only. Anything else (e.g. typed with a Persian keyboard)
    // is removed as it is typed or pasted, and a tooltip next to the box says why.
    const uIn = $app.querySelector('input[name=username]'), tip = $app.querySelector('.field-tip');
    const cleanUser = () => {
      const v = uIn.value, ok = v.replace(/[^A-Za-z0-9_.-]/g, '');
      if (ok === v) return;
      const pos = Math.max(0, (uIn.selectionStart || ok.length) - (v.length - ok.length));
      uIn.value = ok; uIn.setSelectionRange(pos, pos);
      tip.hidden = false; tip.classList.remove('show'); void tip.offsetWidth; tip.classList.add('show');
      clearTimeout(tip._t); tip._t = setTimeout(() => { tip.hidden = true; }, 3500);
    };
    uIn.addEventListener('input', e => { if (!e.isComposing) cleanUser(); });
    uIn.addEventListener('compositionend', cleanUser);
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
    // Questions whose picture was replaced (or restored): a new ?v= so browsers do not keep the old picture.
    Object.entries(d.imgv || {}).forEach(([id, v]) => { const q = Q.get(+id); if (q) q.img = `img/q${id}.jpg?v=${encodeURIComponent(v)}`; });
    state.user = d.user; state.attempts = d.attempts || []; state.words = d.words || []; state.saved = d.saved || [];
    state.settings = Object.assign({ showFa: true, timer: true }, d.settings);
    const usable = x => x && x.ids.every(id => Q.has(id));
    state.draft = usable(d.draft) ? d.draft : null;
    state.lessonDrafts = Object.fromEntries(Object.entries(d.lessonDrafts || {}).filter(([, x]) => usable(x)));
    renderUserBox();
  }
  function setLang(lang) {
    if (state.settings.lang === lang) return;
    state.settings.lang = lang; saveSettings();
    $app.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
    toast(`زبان آزمون: ${LANGS[lang]}`);
  }
  // Asked once per account (new and existing users alike) until a language is chosen.
  function askLang() {
    openModal(`<h3>زبان آزمون را انتخاب کنید</h3>
      <p style="color:var(--muted);margin:0">سؤال‌ها به کدام زبان نمایش داده شوند؟ ترجمه‌ی فارسی در هر دو حالت هست و بعداً هم می‌توانید در «تنظیمات و امکانات» آن را عوض کنید.</p>
      <div class="lang-pick"><button class="btn btn-primary" data-pick="da">دانمارکی<small class="da">Dansk</small></button><button class="btn btn-primary" data-pick="en">انگلیسی<small class="da">English</small></button></div>`);
    $modal.onclick = null; // a choice is required
    $modal.querySelectorAll('[data-pick]').forEach(b => b.onclick = () => { closeModal(); setLang(b.dataset.pick); });
  }
  const saveSettings = () => api('PUT', 'settings', state.settings).catch(() => toast('ذخیره‌ی تنظیمات ناموفق بود'));

  // ---------- Exam ----------
  // An unfinished exam is kept on the server as a "draft" (every change, debounced; right away when the page
  // is hidden or the user leaves the exam), so it can be resumed later, also on another device.
  // Time only runs while the exam is open.
  // Random/mistake exams share one draft (state.draft, shown on the dashboard); each lesson has its own
  // (state.lessonDrafts by test id, offered when that lesson is opened again).
  let draftTimer = null, pendingDraft = null;
  const snapshot = ex => ({
    mode: ex.mode, lesson: ex.lesson, ids: ex.ids, idx: ex.idx, answers: ex.answers, seen: ex.seen, flags: ex.flags, showFa: ex.showFa,
    left: ex.left, elapsed: Math.round((Date.now() - ex.started) / 1000), saved: Date.now(),
  });
  function putDraft(keepalive = false) {
    clearTimeout(draftTimer);
    const d = pendingDraft; pendingDraft = null;
    if (!d) return;
    fetch('/api/draft', { method: 'PUT', keepalive, credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }).catch(() => {});
  }
  function saveDraft(now = false) {
    const ex = state.exam; if (!ex || ex.done) return;
    const d = pendingDraft = snapshot(ex);
    if (ex.mode === 'lesson') state.lessonDrafts[ex.lesson] = d; else state.draft = d;
    if (now) putDraft(now === 'keepalive'); else { clearTimeout(draftTimer); draftTimer = setTimeout(putDraft, 1500); }
  }
  // `lesson`: drop that lesson's draft; without it, the exam draft.
  function dropDraft(lesson) {
    clearTimeout(draftTimer); pendingDraft = null;
    if (lesson) delete state.lessonDrafts[lesson]; else state.draft = null;
    api('DELETE', 'draft', lesson ? { lesson } : undefined).catch(() => {});
  }
  // Leaving the exam screen (logo, dashboard, …) keeps the unfinished exam as a draft.
  function leaveExam() { clearInterval(state.timerId); saveDraft(true); state.exam = null; }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') saveDraft('keepalive'); });

  function resumeExam(d = state.draft) {
    if (!d) return;
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
        <small>${modeName(d.mode, d.lesson)} · ${faNum(d.ids.length)} سؤالی · ${faNum(answered)} سؤال پاسخ داده شده${timed(d) ? ` · ${fmtTime(Math.max(0, d.left))} زمان باقی‌مانده` : ''} · ${fmtDateTime(d.saved)}</small></div>
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
          <small>${faNum(n)} دقیقه${n === FULL ? ` · قبولی با ${faNum(passMin(n))} درست` : ''}</small>
          ${n === FULL ? '<em>مشابه آزمون اصلی</em>' : ''}
        </button>`).join('')}
      </div>
      ${state.draft ? '<p class="size-warn">با شروع آزمون جدید، آزمون نیمه‌تمام قبلی حذف می‌شود.</p>' : ''}
      <button class="btn btn-ghost size-cancel" data-close>انصراف</button>`, 'size-sheet');
    $modal.querySelectorAll('[data-size]').forEach(b => b.onclick = () => {
      const n = +b.dataset.size; newExam(mode, null, n);
    });
  }

  function newExam(mode, ids, size = FULL, lesson) {
    closeModal();
    if (!ids) ids = buildIds(mode === 'mistakes' ? shuffle(mistakeIds()) : mode === 'top' ? mistakeStats().map(s => s.id) : [], size);
    state.exam = {
      mode, lesson, ids, size: ids.length, idx: 0, view: 'q', done: false, started: Date.now(), left: ids.length * SECONDS_PER_Q,
      answers: ids.map(id => Array(Q.get(id).st.length).fill(false)), // ticked = true statement
      seen: ids.map((_, i) => i === 0), flags: ids.map(() => false), showFa: ids.map(() => mode !== 'lesson' && state.settings.showFa), // lessons start without the translation
    };
    setExamMode(true);
    renderExam(true);
    window.scrollTo({ top: 0 });
    startTimer();
  }

  function startTimer() {
    clearInterval(state.timerId);
    if (!timed(state.exam)) return;
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

  // Read aloud in the exam language using the browser's speech engine (like "Læs højt" in the real test).
  function speak(text) {
    try {
      const s = window.speechSynthesis; if (!s) return toast('مرورگر شما خواندن متن را پشتیبانی نمی‌کند.');
      s.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const en = examLang() === 'en';
      u.lang = en ? 'en-GB' : 'da-DK';
      const v = s.getVoices().find(v => (en ? /^en/i : /^da/i).test(v.lang)); if (v) u.voice = v;
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
    // AI "sparkles" (a big four-point star and a small one), used for the AI lesson.
    ai: '<svg class="ai-ico" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 2.5l1.9 5.6L17.5 10l-5.6 1.9L10 17.5l-1.9-5.6L2.5 10l5.6-1.9z"/><path d="M18.5 13.5l.95 2.55L22 17l-2.55.95L18.5 20.5l-.95-2.55L15 17l2.55-.95z"/></svg>',
    chart: '<svg class="ico" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
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
        <span>Teoriprøve B <span class="fa x-mode">· ${modeName(ex.mode, ex.lesson)}</span></span>
        <span class="x-strip-r">
          ${timed(ex) ? `<span class="x-timer ${ex.left <= 60 ? 'low' : ''}">${ICON.clock}<span id="timer">${fmtTime(ex.left)}</span></span>` : ''}
          ${overview
            ? `<button id="closeOv" class="x-sbtn">${ICON.x}<span>Luk</span></button>`
            : `<button id="grid" class="x-sbtn">${ICON.list}<span>${ui().overview}</span>${saved ? `<span class="x-badge">${saved}</span>` : ''}</button>`}
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
            <button id="readQ">${ICON.speaker}<span>${ui().read}</span></button>
            <button id="flag" class="${ex.flags[i] ? 'on' : ''}">${ICON.bookmark(ex.flags[i])}<span>${ui().save}</span></button>
            <button id="trT" class="${fa ? 'on' : ''}">${ICON.tr}<span class="fa">${fa ? 'پنهان‌کردن ترجمه' : 'ترجمه‌ی فارسی'}</span></button>
          </div>
          <p class="qtext" data-wq="${q.id}" data-wst="-1">${nl(qText(q))}</p>
          ${fa ? `<p class="tr fa q-tr">${nl(q.sfa)}</p>` : ''}
          <div class="answers">${q.st.map((s, k) => `
            <label class="answer ${ans[k] ? 'checked' : ''}">
              <input type="checkbox" data-k="${k}" ${ans[k] ? 'checked' : ''}>
              <span class="box" aria-hidden="true"></span>
              <span class="txt"><span class="da-t" data-wq="${q.id}" data-wst="${k}">${nl(stText(s))}</span>${fa && s.fa ? `<span class="tr fa">${nl(s.fa)}</span>` : ''}</span>
              <button type="button" class="speak" data-say="${k}" aria-label="${ui().read}">${ICON.speaker}</button>
            </label>`).join('')}
          </div>
        </div>
      </div>`;
    const foot = `${i > 0 ? `<button id="prev" class="x-btn">${ICON.la}<span>${ui().prev}</span></button>` : '<span class="x-spacer"></span>'}
      <span class="x-count">${ui().count(i + 1, ex.size)}</span>
      <button id="next" class="x-btn"><span>${ui().next}</span>${ICON.ra}</button>`;
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
    $app.querySelectorAll('[data-say]').forEach(b => b.onclick = e => { e.preventDefault(); e.stopPropagation(); speak(stText(q.st[+b.dataset.say])); });
    document.getElementById('readQ').onclick = () => speak([qText(q), ...q.st.map(stText)].join('. '));
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
          <h1>${ui().ovTitle}</h1>
          <p>${ui().ovText}</p>
          <p class="fa ov-fa">در این صفحه سؤال‌های پاسخ‌داده، بی‌پاسخ و ذخیره‌شده (نشانه‌گذاری‌شده) را می‌بینید. روی شماره‌ی هر سؤال بزنید تا به آن بروید.</p>
          <ul class="ov-legend">
            <li><span class="lg-box"></span>${ui().notAnswered} <span class="fa">— بی‌پاسخ</span></li>
            <li><span class="lg-box answered"></span>${ui().answered} <span class="fa">— پاسخ‌داده</span></li>
            <li>${ICON.bookmark(true)}${ui().saved} <span class="fa">— ذخیره‌شده برای بعد</span></li>
          </ul>
          <div class="ov-sum fa">${faNum(answered)} از ${faNum(ex.size)} سؤال پاسخ داده شده · ${faNum(ex.flags.filter(Boolean).length)} سؤال ذخیره‌شده</div>
        </div>
        <div class="ov-r">
          <div class="ov-label">${ui().jump}</div>
          <div class="tiles">${ex.ids.map((_, i) => `
            <button class="tile ${qStatus(i)} ${ex.flags[i] ? 'marked' : ''} ${i === ex.idx ? 'cur' : ''}" data-i="${i}" aria-label="${ui().q} ${i + 1}">
              ${ex.flags[i] ? ICON.bookmark(true) : ''}${i + 1}
            </button>`).join('')}
          </div>
        </div>
      </div>`;
    const foot = `<button id="prev" class="x-btn">${ICON.la}<span>${ui().prev}</span></button>
      <span class="x-count"></span>
      <button id="handin" class="x-btn submit"><span>${ui().handin}</span>${ICON.ra}</button>`;
    $app.innerHTML = examShell(inner, foot, { overview: true });
    bindShell();
    $app.querySelectorAll('.tile').forEach(t => t.onclick = () => { ex.view = 'q'; go(+t.dataset.i); });
    document.getElementById('prev').onclick = () => { ex.view = 'q'; go(ex.size - 1); };
    document.getElementById('handin').onclick = askFinish;
  }

  function quitDialog() {
    openModal(`<h3>خروج از آزمون</h3>
      <p style="color:var(--muted);margin:0">آزمون را تحویل می‌دهید، برای ادامه در زمانی دیگر نگه می‌دارید، یا لغوش می‌کنید؟</p>
      <div class="quit-btns">
        <button class="btn btn-primary" id="mHand">تحویل و دیدن نتیجه</button>
        <button class="btn btn-ghost" id="mLeave">ذخیره و ادامه در زمانی دیگر</button>
        <div class="quit-row"><button class="btn btn-text" data-close>بازگشت به آزمون</button><button class="btn btn-text danger" id="mDrop">لغو آزمون</button></div>
      </div>`, 'quit-sheet');
    document.getElementById('mLeave').onclick = () => { closeModal(); stopSpeak(); state.exam.mode === 'lesson' ? studyList() : home(); };
    document.getElementById('mDrop').onclick = () => {
      const ex = state.exam; ex.done = true; dropDraft(ex.mode === 'lesson' ? ex.lesson : undefined); closeModal(); stopSpeak();
      ex.mode === 'lesson' ? studyList() : home();
    };
    document.getElementById('mHand').onclick = () => { closeModal(); askFinish(); };
  }

  function go(i) {
    const ex = state.exam; if (i < 0 || i >= ex.size) return;
    ex.view = 'q'; ex.idx = i; renderExam(false, true); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function askFinish() {
    const empty = state.exam.answers.filter(a => !a.some(Boolean)).length;
    if (empty) confirmBox('تحویل آزمون؟', `در ${faNum(empty)} سؤال هیچ گزینه‌ای انتخاب نشده است (هر سؤال حداقل یک گزینه‌ی درست دارد).`, 'تحویل و نتیجه', finish);
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
  const summarize = (res, secs, at, mode, lesson) => ({
    res, secs, at, mode, lesson, correct: res.filter(r => r.ok).length, wrongSt: res.reduce((a, r) => a + r.w, 0),
  });

  async function finish() {
    const ex = state.exam; if (!ex || ex.done) return;
    ex.done = true; clearInterval(state.timerId); stopSpeak();
    clearTimeout(draftTimer); pendingDraft = null; // the server drops the draft when it stores the attempt
    if (ex.mode === 'lesson') delete state.lessonDrafts[ex.lesson]; else state.draft = null;
    const res = gradeExam(ex);
    const secs = Math.round((Date.now() - ex.started) / 1000);
    let at = Date.now(); // the stored attempt's time once saved: AI lessons made in its review are kept with it
    const payload = { secs, mode: ex.mode, lesson: ex.lesson, items: res.map(r => ({ id: r.q.id, ok: r.ok, w: r.w, a: r.a, m: r.m ? 1 : 0 })) };
    try {
      const { attempt } = await api('POST', 'attempts', payload);
      state.attempts.push(attempt); at = attempt.at;
    } catch (e) {
      toast(e.status === 401 ? 'نشست شما منقضی شده؛ نتیجه ذخیره نشد. دوباره وارد شوید.' : 'ذخیره‌ی نتیجه روی سرور ناموفق بود.');
    }
    renderReview(summarize(res, secs, at, ex.mode, ex.lesson), 'wrong', true);
  }

  function renderReview(ctx, filter, fresh) {
    setExamMode(false);
    const { res, correct, secs, at, mode, lesson } = ctx;
    state.reviewAt = at; // AI lessons / summary of this review are linked to this attempt on the server
    const isLesson = mode === 'lesson', li = isLesson ? BANK.tests.findIndex(t => t.id === lesson) : -1;
    // A past exam or lesson (not the one just handed in) is reviewed one question at a time, each with its
    // AI lesson on request, and ends with the AI summary of all the mistakes.
    const stepMode = !fresh;
    const n = res.length, full = n >= FULL, pass = full && correct >= passMin(n), pctN = Math.round(correct / Math.max(n, 1) * 100);
    const C = 2 * Math.PI * 74, pct = correct / Math.max(n, 1);
    const list = res.map((r, i) => ({ ...r, i })).filter(r => filter === 'all' || (filter === 'saved' ? r.m : !r.ok));
    const savedN = res.filter(r => r.m).length;
    const tabsHtml = `<div class="tabs"><button data-f="wrong" class="${filter === 'wrong' ? 'on' : ''}">اشتباهات (${faNum(n - correct)})</button>${savedN ? `<button data-f="saved" class="${filter === 'saved' ? 'on' : ''}">${ICON.bookmark(true)} ذخیره‌شده‌ها (${faNum(savedN)})</button>` : ''}<button data-f="all" class="${filter === 'all' ? 'on' : ''}">همه (${faNum(n)})</button></div>`;
    $app.innerHTML = `<section class="view">
      ${fresh ? '' : `<div class="rev-top">${(() => {
        const backTo = { history: 'بازگشت به آزمون‌های قبلی', lessons: 'بازگشت به آموزش درس‌به‌درس' }[state.reviewFrom] || 'بازگشت به داشبورد';
        return stepMode ? `<button class="back-icon" id="back" title="${backTo}" aria-label="${backTo}">${ICON.ra}</button>` : `<button class="back-link" id="back">→ ${backTo}</button>`;
      })()}
        ${stepMode ? `<div class="rev-tools">${tabsHtml}<button class="det-link" id="detLink" ${ctx.lineGone == null ? 'hidden' : ''} aria-expanded="${!ctx.lineGone}">${ICON.chart}<span>${ctx.lineGone === false ? 'پنهان‌کردن جزئیات' : 'جزئیات آزمون'}</span></button></div>` : ''}</div>`}
      ${stepMode ? `<div class="res-line ${full ? (pass ? 'ok' : 'bad') : 'neutral'} ${ctx.lineGone ? 'gone' : ''}" id="resLine">
        <span class="mini-ring rl-ring" title="${faNum(pctN)}٪ پاسخ درست"><svg viewBox="0 0 46 46"><circle cx="23" cy="23" r="19" class="mr-bg"/><circle cx="23" cy="23" r="19" class="mr-fg" stroke-dasharray="${2 * Math.PI * 19}" stroke-dashoffset="${2 * Math.PI * 19}" style="--off:${2 * Math.PI * 19 * (1 - pct)}"/></svg><i>${faNum(pctN)}٪</i></span>
        <span class="rl-main"><span class="rl-top"><b>${full ? (pass ? '✓ قبول' : '✗ مردود') : `${faNum(pctN)}٪ درست`}</b><span>${n - correct ? `${faNum(n - correct)} سؤال از ${faNum(n)} سؤال غلط` : `هر ${faNum(n)} سؤال درست`}</span></span>
          <small>${modeName(mode, lesson)}، ${fmtDate(at)}</small></span>
      </div>` : `<div class="card result-hero">
        <div class="ring">
          <svg width="170" height="170" viewBox="0 0 170 170">
            <circle cx="85" cy="85" r="74" stroke="var(--surface-2)" stroke-width="14" fill="none"/>
            <circle class="fg" cx="85" cy="85" r="74" stroke="${full ? (pass ? 'var(--ok)' : 'var(--bad)') : 'var(--navy)'}" stroke-width="14" fill="none" stroke-linecap="round"
              stroke-dasharray="${C}" stroke-dashoffset="${C}" id="ringFg"/>
          </svg>
          <div class="val"><div>${full ? `<b id="scoreN">0</b><small class="fa" style="text-align:center">از ${n}</small>` : `<b id="scoreN" class="pct">0</b><small class="fa" style="text-align:center">${faNum(correct)} از ${faNum(n)}</small>`}</div></div>
        </div>
        <div>
          <div class="res-meta">${modeName(mode, lesson)} · ${fmtDateTime(at)}</div>
          ${full ? `<h2 class="verdict ${pass ? 'ok' : 'bad'}">${pass ? (fresh ? '🎉 قبول شدید!' : '✓ قبول') : (fresh ? 'مردود — دوباره تلاش کنید' : '✗ مردود')}</h2>
          <div style="color:var(--muted)">${pass ? `حداقل ${faNum(passMin(n))} تصویر از ${faNum(n)} کاملاً درست بود.` : `برای قبولی حداقل ${faNum(passMin(n))} تصویر از ${faNum(n)} باید کاملاً درست باشد.`}</div>`
          : `<h2 class="verdict neutral">${faNum(pctN)}٪ پاسخ درست</h2>
          <div style="color:var(--muted)">آزمون تمرینی ${faNum(n)} سؤالی؛ فقط درصد پاسخ‌های درست ثبت می‌شود. قبولی/مردودی فقط برای آزمون کامل ۲۵ سؤالی تعیین می‌شود.</div>`}
          <div class="kpis">
            <span class="kpi">تصاویر درست: <b>${correct}</b></span>
            <span class="kpi">تصاویر اشتباه: <b>${n - correct}</b></span>
            <span class="kpi">زمان: <b>${fmtTime(secs)}</b></span>
          </div>
          <div class="res-actions">
            ${isLesson ? '<button class="btn btn-ghost wide-btn" id="toHome">داشبورد</button>' : ''}
            ${n - correct ? `<button class="btn btn-primary wide-btn" id="retryWrong">تمرین دوباره‌ی همین اشتباهات</button>` : ''}
            ${isLesson
              ? `${BANK.tests[li + 1] ? `<button class="btn ${n - correct ? 'btn-ghost' : 'btn-primary'}" id="nextLesson">درس بعدی</button>` : ''}<button class="btn btn-ghost" id="toLessons">فهرست درس‌ها</button>`
              : `<button class="btn ${n - correct ? 'btn-ghost' : 'btn-primary'}" id="again">آزمون جدید</button>
            <button class="btn btn-ghost" id="toHome">داشبورد</button>`}
          </div>
        </div>
      </div>`}

      ${stepMode ? '' : `<div class="section-title" style="margin-top:28px">
        <span>مرور پاسخ‌ها</span>${tabsHtml}
      </div>`}
      ${res.some(r => !r.a) ? '<div class="note">این آزمون قبل از ذخیره‌ی پاسخ‌های تک‌تک گزینه‌ها انجام شده؛ فقط پاسخ‌های درست نمایش داده می‌شوند.</div>' : ''}
      ${stepMode ? '<div id="stepBox"></div>' : `<div class="review">
        ${list.length ? list.map((r, k) => reviewCard(r, k, '', false, true, isLesson ? false : state.settings.showFa)).join('') : `<div class="card empty">${filter === 'wrong' ? 'هیچ اشتباهی نداشتید! 👏' : 'موردی نیست.'}</div>`}
      </div>
      ${summaryBox(res)}`}
    </section>`;

    const sn = document.getElementById('scoreN');
    if (sn) { // the result card (not on a past lesson's step-by-step review)
      requestAnimationFrame(() => requestAnimationFrame(() => {
        document.getElementById('ringFg').style.strokeDashoffset = C * (1 - pct);
      }));
      const target = full ? correct : pctN; let v = 0;
      const tick = setInterval(() => { sn.textContent = full ? v : v + '%'; if (v++ >= target) clearInterval(tick); }, 1200 / Math.max(target, 1));
    }

    const rw = document.getElementById('retryWrong');
    if (rw) rw.onclick = () => newExam('mistakes', shuffle(res.filter(r => !r.ok).map(r => r.q.id)));
    const ag = document.getElementById('again'); if (ag) ag.onclick = () => askSize('random');
    const nl2 = document.getElementById('nextLesson'); if (nl2) nl2.onclick = () => startLesson(li + 1);
    const tl = document.getElementById('toLessons'); if (tl) tl.onclick = studyList;
    const th = document.getElementById('toHome'); if (th) th.onclick = home;
    const back = document.getElementById('back');
    if (back) back.onclick = { history: () => historyView(), lessons: studyList }[state.reviewFrom] || home;
    $app.querySelectorAll('[data-f]').forEach(b => b.onclick = () => renderReview(ctx, b.dataset.f, fresh));
    if (stepMode) {
      document.body.classList.add('focus-mode'); // past review: no site header, the questions get the room
      reviewStep(res, list, 0, false, isLesson ? false : state.settings.showFa);
      // The result line shows for 5 seconds, then fades out; «جزئیات آزمون» next to the back link brings it back.
      const line = document.getElementById('resLine'), det = document.getElementById('detLink');
      // ctx.lineGone: undefined until the first fade, then whether it is hidden (kept when switching tabs)
      const setLine = show => {
        ctx.lineGone = !show; line.classList.toggle('gone', !show); det.setAttribute('aria-expanded', show);
        det.querySelector('span').textContent = show ? 'پنهان‌کردن جزئیات' : 'جزئیات آزمون';
      };
      clearTimeout(state.resLineTimer);
      if (ctx.lineGone == null) state.resLineTimer = setTimeout(() => { if (line.isConnected) { setLine(false); det.hidden = false; } }, 5000);
      det.onclick = () => setLine(line.classList.contains('gone'));
    }
    else {
      bindReviewCards($app);
      bindSummary(res);
      $app.querySelectorAll('.rcard').forEach((c, k) => { if (filter === 'wrong' && k < 3) c.classList.add('open'); });
    }
    window.scrollTo({ top: 0 });
    if (fresh && pass) setTimeout(celebrate, 450); // just handed in and passed (a full 25-question exam or lesson)
  }

  // ---------- Celebration when an exam is passed ----------
  // A short, light canvas animation over the result page: two confetti bursts from the bottom corners and a
  // few small fireworks, about 4 seconds, then it fades away. Nothing for users who prefer reduced motion.
  function celebrate() {
    try { if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; } catch {}
    const c = document.createElement('canvas');
    c.className = 'celebrate'; c.setAttribute('aria-hidden', 'true');
    document.body.appendChild(c);
    const ctx = c.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = innerWidth, H = innerHeight;
    c.width = W * dpr; c.height = H * dpr; ctx.scale(dpr, dpr);
    const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#ff70a6', '#00c2d1'];
    const pick = () => colors[(Math.random() * colors.length) | 0];
    const parts = [];
    const confetti = (x, dir) => {
      const n = Math.round(Math.min(90, W / 8));
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + dir * (0.12 + Math.random() * 0.55), v = H / 55 + Math.random() * H / 70;
        parts.push({ k: 'c', x, y: H + 10, vx: Math.cos(a) * v, vy: Math.sin(a) * v, w: 6 + Math.random() * 6, h: 3 + Math.random() * 4,
          r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.35, col: pick(), life: 1 });
      }
    };
    const firework = () => {
      const x = W * (0.2 + Math.random() * 0.6), y = H * (0.15 + Math.random() * 0.3), col = pick(), n = 34;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2, v = 1.6 + Math.random() * 2.6;
        parts.push({ k: 'f', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, col, life: 1, size: 2 + Math.random() * 1.5 });
      }
    };
    confetti(0, 1); confetti(W, -1);
    [250, 750, 1300, 1900].forEach(t => setTimeout(firework, t));
    const start = performance.now();
    const frame = now => {
      const t = now - start;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        if (p.k === 'c') {
          p.vx *= 0.985; p.vy = p.vy * 0.985 + 0.32; p.x += p.vx; p.y += p.vy; p.r += p.vr;
          if (t > 2600) p.life -= 0.02;
          ctx.save(); ctx.globalAlpha = Math.max(0, p.life); ctx.translate(p.x, p.y); ctx.rotate(p.r);
          ctx.fillStyle = p.col; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r * 2)) + 1); ctx.restore();
        } else {
          p.vx *= 0.97; p.vy = p.vy * 0.97 + 0.04; p.x += p.vx; p.y += p.vy; p.life -= 0.012;
          ctx.globalAlpha = Math.max(0, p.life); ctx.fillStyle = p.col;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      if (t < 4200) requestAnimationFrame(frame); else c.remove();
    };
    requestAnimationFrame(frame);
  }

  // «جمع‌بندی آموزشی اشتباهات» under the questions: prepared only when the user asks for it, then shown / hidden.
  const summaryBox = res => (res.some(r => !r.ok && r.a) && state.aiLessons
    ? `<div class="ai-lesson ai-click ai-summary" id="aiSummary">
        <button class="ai-start" type="button" aria-expanded="false"><span class="ai-spark">${ICON.ai}</span><span class="ai-txt"><b>جمع‌بندی آموزشی اشتباهات</b><small>خلاصه‌ی آموزشی همه‌ی اشتباهات این آزمون، با استفاده از هوش مصنوعی</small></span><svg class="ai-chev" width="18" height="18" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg></button>
        <div class="ai-body" hidden></div></div>` : '');

  // One step of a past lesson's review: question k of `list` (open, with its short AI lesson), or, after the
  // last one, the summary of all the mistakes. Previous/next and the counter follow the exam language.
  // `fa`: whether the Persian translation starts shown (hidden in lessons).
  function reviewStep(res, list, k, scroll = true, fa = false) {
    const box = document.getElementById('stepBox'); if (!box) return;
    const total = list.length, end = k >= total;
    const nav = `<nav class="st-nav" dir="ltr">
        <button class="btn btn-ghost" id="rsPrev" ${k ? '' : 'disabled'}>${ICON.la}<span>${ui().prev}</span></button>
        <span class="st-pos">${end ? '' : `<span class="st-long">${ui().count(k + 1, total)}</span><span class="st-short">${k + 1} / ${total}</span>`}</span>
        ${end ? `<button class="btn btn-ghost" id="rsFirst"><span class="fa">مرور از اول</span></button>`
          : k === total - 1 ? `<button class="btn btn-primary" id="rsNext"><span class="fa">جمع‌بندی اشتباهات</span>${ICON.ra}</button>`
          : `<button class="btn btn-primary" id="rsNext"><span>${ui().next}</span>${ICON.ra}</button>`}
      </nav>`;
    box.innerHTML = !total ? '<div class="card empty">موردی نیست.</div>'
      : end ? `${summaryBox(res) || `<div class="card empty">${res.some(r => !r.ok) ? 'جمع‌بندی هوش مصنوعی در دسترس نیست.' : 'در این درس هیچ اشتباهی نداشتید! 👏'}</div>`}${nav}`
      : `<div class="review">${reviewCard(list[k], 0, '', true, true, fa)}</div>${nav}`;
    if (!total) return;
    document.getElementById('rsPrev').onclick = () => reviewStep(res, list, k - 1, true, fa);
    const nx = document.getElementById('rsNext'); if (nx) nx.onclick = () => reviewStep(res, list, k + 1, true, fa);
    const fs = document.getElementById('rsFirst'); if (fs) fs.onclick = () => reviewStep(res, list, 0, true, fa);
    if (end) bindSummary(res); else bindReviewCards(box);
    if (scroll) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function bindReviewCards(root) {
    root.querySelectorAll('.rhead').forEach(h => h.onclick = e => {
      const bm = e.target.closest('.rbm');
      if (bm) return toggleSaved(bm);
      if (e.target.tagName === 'IMG') return zoomImg(e.target.src);
      if (e.target.closest('a')) return; // the prove.dk link opens in a new tab without toggling the card
      const tr = e.target.closest('.rtr-btn');
      if (tr) { // like the exam's "ترجمه‌ی فارسی" button: show or hide the Persian of this question only
        const hide = h.parentElement.classList.toggle('no-fa');
        tr.classList.toggle('on', !hide); tr.setAttribute('aria-pressed', !hide);
        return;
      }
      if (!window.getSelection().isCollapsed || e.detail > 1) return;
      if (h.closest('#stepBox')) return; // question-by-question review: the card always stays open
      h.parentElement.classList.toggle('open');
    });
    // "جزئیات و توضیحات" sits at the bottom of the card, under the answers and the lesson
    root.querySelectorAll('.rtoggle').forEach(b => b.onclick = () => {
      const card = b.closest('.rcard');
      card.classList.toggle('open');
    });
    root.querySelectorAll('.rviews').forEach(v => v.onclick = e => {
      const b = e.target.closest('.rseg'); if (!b) return;
      v.querySelectorAll('.rseg').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
      v.nextElementSibling.className = `rstmts v-${b.dataset.v}`;
    });
    // «تحلیل پاسخ شما»: the first click prepares the tips, later clicks hide and show them.
    root.querySelectorAll('.rcard .ai-start').forEach(b => b.onclick = () => {
      const box = b.closest('.ai-lesson'), body = box.querySelector('.ai-body');
      if (box.dataset.state === 'loading') return;
      if (box.dataset.state === 'done') body.hidden = !body.hidden;
      else aiLesson(b.closest('.rcard'));
      box.classList.toggle('shown', !body.hidden); b.setAttribute('aria-expanded', !body.hidden);
    });
  }
  // ---------- Saved questions (bookmark on a review card's picture) ----------
  const isSaved = id => state.saved.some(x => x.id === id);
  // Every bookmark of that question on the page follows the new state.
  function markSaved(id, on) {
    document.querySelectorAll(`.rbm[data-bm="${id}"]`).forEach(b => {
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', on);
      b.title = on ? 'حذف از سؤالات ذخیره‌شده' : 'ذخیره برای مرور بعدی';
      b.innerHTML = ICON.bookmark(on);
    });
    const c = document.getElementById('savedCount'); if (c) c.textContent = faNum(state.saved.length);
  }
  async function toggleSaved(btn) {
    const id = +btn.dataset.bm, on = !isSaved(id);
    const a = btn.dataset.a ? btn.dataset.a.split('').map(Number) : undefined;
    markSaved(id, on); // right away; undone if the server refuses
    try {
      if (on) {
        const { saved } = await api('POST', 'saved', { id, a });
        state.saved = [...state.saved.filter(x => x.id !== id), saved];
        toast('سؤال ذخیره شد؛ در «سؤالات ذخیره‌شده» آن را می‌بینید');
      } else {
        await api('DELETE', 'saved', { id });
        state.saved = state.saved.filter(x => x.id !== id);
        toast('از سؤالات ذخیره‌شده حذف شد');
      }
      markSaved(id, on);
    } catch (e) { markSaved(id, !on); toast(e.message); }
  }
  // A question's result for the user's ticks `a` (as in a graded exam item).
  function resultOf(q, a) {
    if (!a) return { q };
    const wrong = q.st.map((s, k) => !!a[k] !== !!s.ok);
    return { q, a, wrong, w: wrong.filter(Boolean).length, ok: !wrong.some(Boolean) };
  }

  // AI tips for a reviewed question (server: /api/lesson, Claude, cached per question + mistakes), prepared when
  // the user asks for them with «تحلیل پاسخ شما». Without AI lessons, the topic's fixed lesson is shown instead.
  // Older cached tips said «تیک زدید / نزدید»; the site says «انتخاب کردید / نکردید» everywhere.
  const pickWords = t => t.replace(/تیک(?:\s|\u200c)*نزد/g, 'انتخاب نکرد').replace(/تیک(?:\s|\u200c)*زد/g, 'انتخاب کرد').replace(/تیک(?:\s|\u200c)*نخورد/g, 'انتخاب نشد').replace(/تیک(?:\s|\u200c)*خورد/g, 'انتخاب شد');
  const lessonHtml = text => {
    text = pickWords(text);
    let html = '', list = false;
    const close = () => { if (list) { html += '</ul>'; list = false; } };
    for (const raw of text.split('\n')) {
      const line = raw.trim(); if (!line) continue;
      if (line.startsWith('#')) { close(); html += `<h5>${esc(line.replace(/^#+\s*/, ''))}</h5>`; }
      else if (/^[-•*]\s+/.test(line)) { if (!list) { html += '<ul>'; list = true; } html += `<li>${esc(line.replace(/^[-•*]\s+/, ''))}</li>`; }
      else { close(); html += `<p>${esc(line)}</p>`; }
    }
    close(); return html.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  };
  // Waiting state of an AI lesson: pulsing sparkles, a line of text and shimmering placeholder lines.
  const aiLoading = text => `<div class="ai-loading" role="status"><div class="ai-load-h"><span class="ai-spark">${ICON.ai}</span><span>${text}</span><span class="ai-dots"><i></i><i></i><i></i></span></div>
    <div class="ai-skel"><i style="width:92%"></i><i style="width:78%"></i><i style="width:86%"></i><i style="width:55%"></i></div></div>`;
  // Lessons already fetched on this page visit, so opening one again needs no request at all
  // (the server also keeps every lesson, so later visits get it without a new AI call).
  const lessonCache = new Map();
  function aiLesson(card) {
    const box = card.querySelector('.ai-lesson'); if (!box || box.dataset.state) return;
    box.dataset.state = 'loading';
    const body = box.querySelector('.ai-body'); body.hidden = false;
    const a = box.dataset.a ? box.dataset.a.split('').map(Number) : undefined;
    const key = `${box.dataset.q}:${box.dataset.a}:${examLang()}`;
    const show = text => {
      box.dataset.state = 'done'; lessonCache.set(key, text);
      body.innerHTML = `<div class="ai-reveal">${lessonHtml(text)}</div>`;
    };
    if (lessonCache.has(key)) return show(lessonCache.get(key));
    body.innerHTML = aiLoading('در حال آماده‌سازی نکات این سؤال بر اساس پاسخ شما');
    api('POST', 'lesson', { qid: +box.dataset.q, a, lang: examLang(), at: state.reviewAt || undefined })
      .then(d => show(d.text))
      .catch(e => { // the button stays, so it can be tried again
        delete box.dataset.state;
        body.innerHTML = `<p class="muted">${esc(e.status === 429 ? e.message : 'نکات الان آماده نشد؛ دوباره امتحان کنید.')}</p>`;
      });
  }

  // Picture, badges and question of a review card (also used by the lessons' practice card).
  // The bookmark on the picture saves the question, with the ticks shown in this card, to «سؤالات ذخیره‌شده».
  function cardHead(q, r, extraBadge = '', fa = state.settings.showFa) {
    const on = isSaved(q.id);
    return `<div class="rhead">
        <div class="rimg"><img src="${q.img}" alt="" loading="lazy">${r.i != null ? `<span class="rnum">سؤال ${faNum(r.i + 1)}</span>` : ''}
          <button class="rbm ${on ? 'on' : ''}" data-bm="${q.id}" data-a="${r.a ? r.a.map(v => (v ? 1 : 0)).join('') : ''}" aria-pressed="${on}" title="${on ? 'حذف از سؤالات ذخیره‌شده' : 'ذخیره برای مرور بعدی'}" aria-label="ذخیره‌ی سؤال">${ICON.bookmark(on)}</button></div>
        <div class="rbadges">
          ${extraBadge}
          ${q.src ? q.src.map(x => `<a class="badge src" href="https://prove.dk/${examLang() === 'en' ? 'en/' : ''}app/newtest/${x.test}" target="_blank" rel="noopener" title="باز کردن این آزمون در prove.dk">${esc(x.label)}</a>`).join('') : ''}
          <button class="rtr-btn ${fa ? 'on' : ''}" aria-pressed="${fa}" title="نمایش / پنهان‌کردن ترجمه‌ی فارسی">${ICON.tr}<span class="fa">ترجمه</span></button>
        </div>
        <div class="rq">
          <p class="situation da" data-wq="${q.id}" data-wst="-1">${nl(qText(q))}</p>
          <p class="rq-fa fa">${nl(q.sfa)}</p>
        </div>
      </div>`;
  }

  // `lessons` false (a lesson's review): no per-question lesson, the AI summary above covers the mistakes.
  // `fa`: whether the Persian translation starts shown (hidden in lessons, as in the lesson itself).
  function reviewCard(r, n, extraBadge = '', open = false, lessons = true, fa = lessons && state.settings.showFa) {
    const q = r.q, t = BANK.topics[q.c];
    return `<article class="card rcard ${open ? 'open' : ''} ${fa ? '' : 'no-fa'}" style="animation-delay:${Math.min(n, 8) * 50}ms">
      ${cardHead(q, r, extraBadge, fa)}
      <div class="rbody">
        ${r.a ? `<div class="rviews" role="tablist">
          <button class="rseg mine on" data-v="mine" role="tab" aria-selected="true" title="${r.ok ? 'پاسخ شما درست بود' : 'پاسخ شما اشتباه بود'}"><i class="rseg-dot ${r.ok ? 'good' : 'bad'}"></i>پاسخ شما</button>
          <button class="rseg right" data-v="right" role="tab" aria-selected="false">پاسخ صحیح</button>
        </div>` : '<div class="rviews-title">پاسخ صحیح</div>'}
        <div class="rstmts ${r.a ? 'v-mine' : 'v-right'}">
        ${q.st.map((s, k) => {
          // "پاسخ شما": the user's ticks; a wrong tick or a missing one is marked red.
          // "پاسخ صحیح": the right ticks, with the explanation under every option.
          const me = !!(r.a && r.a[k]);
          const m = !r.a ? '' : me && s.ok ? 'm-good' : me ? 'm-extra' : s.ok ? 'm-miss' : 'm-none';
          const eda = stExpl(s).trim() || (s.ok ? ui().yes : ui().no);
          const efa = (s.efa || '').trim() || (s.ok ? 'بله.' : 'خیر.');
          return `<div class="rstmt ${me ? 'me' : ''} ${s.ok ? 'ok' : ''} ${m}">
            <div class="rline">
              <span class="rbox" aria-hidden="true"></span>
              <div class="rtxt">
                <div class="da rst-da" data-wq="${q.id}" data-wst="${k}">${nl(stText(s))}</div>
                ${s.fa ? `<div class="fa rtr">${nl(s.fa)}</div>` : ''}
              </div>
            </div>
            <div class="rexpl">
              <div class="ranswer da">${ui().expl} <i data-wq="${q.id}" data-wst="${k}">${nl(eda)}</i></div>
              <div class="ranswer fa">توضیح: <i>${nl(efa)}</i></div>
            </div>
          </div>`;
        }).join('')}
        </div>
        ${lessons && state.aiLessons ? `<div class="ai-lesson ai-click" data-q="${q.id}" data-a="${r.a ? r.a.map(v => (v ? 1 : 0)).join('') : ''}">
          <button class="ai-start" type="button" aria-expanded="false"><span class="ai-spark">${ICON.ai}</span><span class="ai-txt"><b>تحلیل پاسخ شما</b><small>با استفاده از هوش مصنوعی</small></span><svg class="ai-chev" width="18" height="18" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg></button>
          <div class="ai-body" hidden></div></div>` : ''}
        ${lessons && t ? `<div class="lesson topic-lesson" ${state.aiLessons ? 'hidden' : ''}><h4>📘 آموزش کوتاه: ${esc(topicFa(q.c))} <span class="da" style="font-weight:500;color:var(--muted);font-size:12.5px">(${esc(t.da)})</span></h4>
          <ul>${t.lesson.map(l => `<li>${esc(l)}</li>`).join('')}</ul></div>` : ''}
      </div>
      <button class="rtoggle"><span class="fa">جزئیات و توضیحات</span><svg class="chev" width="18" height="18" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg></button>
    </article>`;
  }

  function openAttempt(idx) {
    const att = state.attempts[idx]; if (!att) return;
    state.reviewFrom = document.querySelector('.hist-page') ? 'history' : document.querySelector('.study-page') ? 'lessons' : 'home';
    // A past exam or lesson is reviewed question by question, starting on its mistakes («اشتباهات»);
    // with no mistakes, all of its questions.
    const res = gradeAttempt(att);
    renderReview(summarize(res, att.secs, att.at, att.mode, att.lesson), res.some(r => !r.ok) ? 'wrong' : 'all', false);
  }

  function showMistake(id) {
    state.reviewAt = null;
    const s = mistakeStats().find(x => x.id === id); if (!s) return;
    const q = Q.get(id), a = s.lastA;
    const wrong = a ? q.st.map((st, k) => (a[k] ? 1 : 0) !== st.ok) : null;
    const r = { q, a, wrong, ok: s.lastOk, w: wrong ? wrong.filter(Boolean).length : 0 };
    openModal(`<div class="review">${reviewCard(r, 0, `<span class="badge warn">${faNum(s.wrong)} اشتباه در ${faNum(s.seen)} آزمون</span>`)}</div>
      <p style="color:var(--muted);font-size:13px;margin:10px 0 0">«شما انتخاب کردید / انتخاب نکردید» مربوط به آخرین باری است که این سؤال را جواب داده‌اید.</p>
      <div class="row-btns"><button class="btn btn-ghost" data-close>بستن</button></div>`, 'wide');
    bindReviewCards($modal);
    const card = $modal.querySelector('.rcard'); card.classList.add('open');
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
      tip.innerHTML = `<b>آزمون ${faNum(best + 1 + offset)}</b><span>${fmtDate(a.at)} · ${modeName(a.mode, a.lesson)}</span><span>${isFull(a) ? `نمره: <b class="num">${s}/${a.items.length}</b> · ${isPass(a) ? '✓ قبول' : '✗ مردود'}` : `${faNum(a.items.length)} سؤالی · <b>${pctText(a)}</b> درست`}</span><span class="tip-hint">برای مرور کلیک کنید</span>`;
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
        <span class="bar-label">${esc(topicFa(t.c))}</span>
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
      `<button class="tr-toggle more act-btn" id="startTop">آزمون از پراشتباه‌ترین سؤالات ←</button>`;
  }
  function mistakeCards(list) {
    return `<div class="mgrid">${list.map((s, n) => {
      const q = Q.get(s.id), t = BANK.topics[q.c];
      return `<button class="card mcard" data-mid="${s.id}" style="animation-delay:${n * 40}ms">
        <span class="mimg"><img src="${q.img}" alt="" loading="lazy"><span class="mcount">×${s.wrong}</span></span>
        <span class="mbody">
          <span class="mtopic">${t ? esc(topicFa(q.c)) : ''}</span>
          <span class="mq da">${esc(qText(q))}</span>
          <span class="mmeta">${faNum(s.wrong)} اشتباه در ${faNum(s.seen)} آزمون · ${s.lastOk ? '<span class="okc">آخرین بار درست</span>' : '<span class="badc">آخرین بار اشتباه</span>'}${s.lastAt ? ` · ${fmtDate(s.lastAt)}` : ''}</span>
        </span>
      </button>`;
    }).join('')}</div>`;
  }
  // All mistakes on their own page, grouped by topic, to see which topics need work and practise them.
  // "Still wrong" = the last answer to that question was wrong; "fixed" = answered wrong before but right last time.
  // Topics are ordered by how many questions are still wrong, then by accuracy in that topic.
  function mistakesView(filter = 'open') {
    stopSpeak(); leaveExam(); setExamMode(false); closeModal();
    const acc = new Map(); // accuracy per topic over every answer given in it
    for (const a of state.attempts) for (const it of a.items) {
      const q = Q.get(it.id); if (!q) continue;
      const x = acc.get(q.c) || { ok: 0, n: 0 }; x.n++; if (it.ok) x.ok++; acc.set(q.c, x);
    }
    const groups = new Map();
    for (const st of mistakeStats()) {
      const c = Q.get(st.id).c, g = groups.get(c) || { c, list: [], open: 0, fixed: 0, wrong: 0 };
      g.list.push(st); g.wrong += st.wrong; st.lastOk ? g.fixed++ : g.open++; groups.set(c, g);
    }
    const accOf = c => { const x = acc.get(c); return x && x.n ? x.ok / x.n : 0; };
    const sorted = [...groups.values()].sort((a, b) => b.open - a.open || accOf(a.c) - accOf(b.c) || b.wrong - a.wrong);
    const open = sorted.reduce((n, g) => n + g.open, 0), fixed = sorted.reduce((n, g) => n + g.fixed, 0);
    const keep = st => filter === 'all' || (filter === 'open' ? !st.lastOk : st.lastOk);
    const pctCls = p => (p >= 0.8 ? 'ok' : p >= 0.6 ? 'warn' : 'bad');
    $app.innerHTML = `<section class="view mistakes-page">
      <button class="back-link" id="back">→ بازگشت به داشبورد</button>
      <div class="words-head"><h1>بیشترین اشتباهات</h1>${open ? '<button class="btn btn-primary" id="practiceOpen">تمرین همه‌ی اشتباهات</button>' : ''}</div>
      ${sorted.length ? `
      <div class="card panel msum">
        <div class="panel-h"><h3>وضعیت مباحث</h3><small class="muted">ضعیف‌ترین مبحث بالا — روی هر مبحث بزنید</small></div>
        <div class="msum-kpis"><span><b class="badc">${faNum(open)}</b> سؤال هنوز اشتباه</span><span><b class="okc">${faNum(fixed)}</b> سؤال اصلاح‌شده</span><span><b>${faNum(sorted.length)}</b> مبحث</span></div>
        <div class="mtopics">${sorted.map(g => `
          <button class="mtopic-row" data-jump="${g.c}">
            <span class="mt-name">${esc(topicFa(g.c))}</span>
            <span class="bar-track"><i class="${pctCls(accOf(g.c))}" style="--w:${Math.max(accOf(g.c) * 100, 2)}%"></i></span>
            <span class="mt-acc">${faNum(Math.round(accOf(g.c) * 100))}٪ دقت</span>
            <span class="mt-cnt">${g.open ? `<span class="badc">${faNum(g.open)} مورد</span>` : '<span class="okc">همه اصلاح شد ✓</span>'}${g.fixed && g.open ? `، <span class="okc">${faNum(g.fixed)} اصلاح‌شده</span>` : ''}</span>
          </button>`).join('')}</div>
        <p class="mtip">پیشنهاد: از بالای این فهرست شروع کنید؛ آموزش کوتاه هر مبحث را بخوانید و سپس با «تمرین این مبحث» سؤال‌های همان مبحث را دوباره جواب دهید تا از «هنوز اشتباه» به «اصلاح‌شده» بروند.</p>
      </div>
      <div class="tabs mtabs"><button data-mf="open" class="${filter === 'open' ? 'on' : ''}">هنوز اشتباه (${faNum(open)})</button><button data-mf="fixed" class="${filter === 'fixed' ? 'on' : ''}">اصلاح‌شده (${faNum(fixed)})</button><button data-mf="all" class="${filter === 'all' ? 'on' : ''}">همه (${faNum(open + fixed)})</button></div>
      ${sorted.map(g => {
        const list = g.list.filter(keep), t = BANK.topics[g.c];
        if (!list.length) return '';
        return `<div class="mgroup" id="mt-${g.c}">
          <div class="section-title"><span>${esc(topicFa(g.c))} <small class="muted">(دقت ${faNum(Math.round(accOf(g.c) * 100))}٪، ${faNum(g.open)} مورد، ${faNum(g.fixed)} اصلاح‌شده)</small></span>
            <span class="mg-btns">${t && t.lesson ? `<button class="tr-toggle" data-lesson="${g.c}">آموزش کوتاه</button>` : ''}<button class="tr-toggle" data-practice="${g.c}">تمرین این مبحث</button></span></div>
          ${t && t.lesson ? `<div class="lesson" id="lesson-${g.c}" hidden><h4>📘 ${esc(topicFa(g.c))} <span class="da" style="font-weight:500;color:var(--muted);font-size:12.5px">(${esc(t.da)})</span></h4><ul>${t.lesson.map(l => `<li>${esc(l)}</li>`).join('')}</ul></div>` : ''}
          ${mistakeCards(list)}</div>`;
      }).join('') || `<div class="card empty">${filter === 'open' ? 'هیچ سؤالی در حالت «هنوز اشتباه» نیست؛ عالی! ✨' : 'موردی نیست.'}</div>`}` : '<div class="card empty">هنوز اشتباهی ثبت نشده است.</div>'}
    </section>`;
    document.getElementById('back').onclick = home;
    const po = document.getElementById('practiceOpen'); if (po) po.onclick = () => askSize('mistakes');
    $app.querySelectorAll('[data-mf]').forEach(b => b.onclick = () => { const y = scrollY; mistakesView(b.dataset.mf); scrollTo({ top: y }); });
    $app.querySelectorAll('[data-jump]').forEach(b => b.onclick = () => {
      let el = document.getElementById('mt-' + b.dataset.jump);
      if (!el) { mistakesView('all'); el = document.getElementById('mt-' + b.dataset.jump); }
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    $app.querySelectorAll('[data-lesson]').forEach(b => b.onclick = () => { const l = document.getElementById('lesson-' + b.dataset.lesson); l.hidden = !l.hidden; });
    $app.querySelectorAll('[data-practice]').forEach(b => b.onclick = () => practiceTopic(b.dataset.practice));
    $app.querySelectorAll('[data-mid]').forEach(b => b.onclick = () => showMistake(+b.dataset.mid));
    window.scrollTo({ top: 0 });
  }
  // Practice one topic: its still-wrong questions first, then fixed ones, then other questions of the topic (10 at most).
  function practiceTopic(c) {
    const stats = mistakeStats().filter(st => Q.get(st.id).c === c);
    const first = [...shuffle(stats.filter(st => !st.lastOk).map(st => st.id)), ...shuffle(stats.filter(st => st.lastOk).map(st => st.id))];
    const rest = shuffle(BANK.questions.filter(q => q.c === c && !first.includes(q.id)).map(q => q.id));
    const ids = [...first, ...rest].slice(0, 10);
    newExam('mistakes', shuffle(ids));
  }

  // Newest first; the dashboard passes a limit and links to the full list on its own page.
  const HOME_HIST = 3;
  // `edit` (past-exams page) adds a delete button next to each exam.
  // Past exams only: lessons have their own page («آموزش درس‌به‌درس»). Exams are numbered among themselves;
  // data-att keeps the index in state.attempts.
  const examIdx = () => state.attempts.map((_, i) => i).filter(i => state.attempts[i].mode !== 'lesson');
  const lessonIdx = () => state.attempts.map((_, i) => i).filter(i => state.attempts[i].mode === 'lesson');
  // kind 'random': the exams (first section of the past-exams page); 'lesson': finished lessons;
  // 'all': both, newest first (dashboard). Exams keep their number among exams, lessons show the lesson's name.
  function historyList(limit = Infinity, edit = false, kind = 'random') {
    const atts = state.attempts, idx = kind === 'lesson' ? lessonIdx() : kind === 'all' ? atts.map((_, i) => i) : examIdx();
    if (!idx.length) return kind === 'lesson' ? '<div class="card empty">هنوز درسی را تمام نکرده‌اید.</div>' : '<div class="card empty">هنوز آزمونی نداده‌اید. از «شروع آزمون» شروع کنید ✨</div>';
    const num = new Map(examIdx().map((i, k) => [i, k + 1]));
    const label = i => (atts[i].mode === 'lesson' ? lessonName(atts[i].lesson) : `آزمون ${faNum(num.get(i))}`);
    const shown = idx.slice().reverse().slice(0, limit);
    return shown.map(i => {
      const h = atts[i], s = scoreOf(h), wrongImgs = h.items.length - s;
      const thumbs = h.items.filter(it => !it.ok && Q.has(it.id)).slice(0, 4).map(it => `<img src="${Q.get(it.id).img}" alt="" loading="lazy">`).join('');
      const body = `<span class="pill ${isFull(h) ? (isPass(h) ? 'ok' : 'bad') : 'neutral'}">${isFull(h) ? `${s}/${h.items.length}` : pctText(h)}</span>
        <span class="meta"><b>${label(i)}</b> · ${faNum(h.items.length)} سؤالی · ${isFull(h) ? (isPass(h) ? 'قبول' : 'مردود') : 'تمرینی'}${h.mode === 'mistakes' || h.mode === 'top' || h.mode === 'sections' ? ` · ${modeName(h.mode)}` : ''}<br>
          <small>${fmtDate(h.at)} · ${wrongImgs ? `${faNum(wrongImgs)} سؤال غلط` : 'بدون اشتباه'} · <span class="nowrap">مدت زمان آزمون: ${fmtTime(h.secs)}</span>${h.items.some(it => it.m) ? ` · ${ICON.bookmark(true)} ${faNum(h.items.filter(it => it.m).length)} ذخیره‌شده` : ''}</small></span>
        <span class="hthumbs">${thumbs}</span>`;
      // In delete mode the card is not a link: the delete button takes the place of "مرور".
      return edit
        ? `<div class="card hist editing">${body}<button class="hist-del" data-del-att="${i}" data-label="${label(i)}" title="حذف آزمون" aria-label="حذف آزمون">${ICON.trash}</button></div>`
        : `<button class="card hist" data-att="${i}">${body}<span class="go">مرور ←</span></button>`;
    }).join('') + (idx.length > limit ? `<button class="tr-toggle more act-btn" id="allHist">نمایش همه‌ی آزمون‌ها (${faNum(idx.length)}) ←</button>` : '');
  }

  function home() {
    stopSpeak(); leaveExam(); closeModal(); setExamMode(false);
    const atts = state.attempts;
    // «آزمون‌ها» card: every exam taken, random ones and lessons (the past-exams page it opens lists both)
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
            ${mCount ? `<button class="btn btn-ghost" id="startM">تمرین اشتباهات (${faNum(mCount)})</button>` : '' /* only once there are mistakes */}
            <button class="btn btn-ghost study-btn" id="openStudy">${ICON.book} آموزش درس‌به‌درس <small>(${faNum(BANK.tests.length)} درس)</small></button>
          </div>
        </div>
      </div>

      <div class="stats">
        <div class="card stat stat-link" id="statExams" role="button" tabindex="0" title="مشاهده‌ی آزمون‌های قبلی"><span>آزمون‌ها ${atts.length ? ICON.chevL : ''}</span><b>${atts.length}</b><small>${fullN ? `${faNum(passed)} قبولی از ${faNum(fullN)} آزمون کامل` : 'هنوز آزمون کامل ۲۵ سؤالی نداده‌اید'}</small></div>
        <div class="card stat"><span>میانگین ۵ آزمون اخیر (درصد درست)</span><b>${atts.length ? Math.round(avg5) : '–'}<em>٪</em></b><small>${trend == null ? 'روند: داده‌ی کافی نیست' : trend >= 0 ? `▲ ${faNum(Math.round(trend))}٪ رو به بهبود` : `▼ ${faNum(Math.round(Math.abs(trend)))}٪ افت`}</small></div>
        <div class="card stat"><span>بهترین نمره</span><b>${atts.length ? best : '–'}<em>٪</em></b><small>میانگین زمان ${atts.length ? fmtTime(avgSecs) : '–'}</small></div>
        <div class="card stat"><span>سؤالات تمرین‌شده</span><b>${Math.round(seen / BANK.questions.length * 100)}<em>٪</em></b><small>${faNum(seen)} از ${faNum(BANK.questions.length)} · 🔥 ${faNum(streakDays())} روز پیاپی</small>
          <span class="mini-track"><i style="width:${seen / BANK.questions.length * 100}%"></i></span></div>
      </div>

      <div class="card panel"><div class="panel-h"><h3>نمودار پیشرفت</h3><span class="legend"><i class="lg-line"></i>نمره هر آزمون <i class="lg-thr"></i>حد قبولی</span></div>${progressChart(atts)}</div>
      <div class="card gauge gauge-panel ${probCls}">
          <div class="gauge-ring">
            <svg width="130" height="130" viewBox="0 0 130 130"><circle cx="65" cy="65" r="52" class="g-bg"/><circle cx="65" cy="65" r="52" class="g-fg" stroke-dasharray="${G}" stroke-dashoffset="${G}" id="gFg"/></svg>
            <div class="g-val"><b class="num">${probPct == null ? '–' : probPct + '%'}</b></div>
          </div>
          <div class="g-txt"><div class="g-title">احتمال قبولی</div><div class="g-sub">${probText}</div>
            ${est ? `<div class="g-note">${est.onlyRandom ? `بر اساس ${faNum(est.n)} سؤال آخر آزمون‌ها${est.weight < 50 ? ' · برآورد اولیه' : ''}` : `بر اساس ${faNum(est.n)} سؤال آزمون‌های تمرینی`}</div>` : ''}</div>
      </div>

      <div class="section-title"><span>آزمون‌های قبلی <small class="muted">— برای مرور پاسخ‌ها و اشتباهات روی هر آزمون بزنید</small></span></div>
      <div class="history">${historyList(HOME_HIST, false, 'all')}</div>

      <div class="section-title"><span>بیشترین اشتباهات شما${topCount ? ` <small class="muted">(${faNum(topCount)} سؤال)</small>` : ''}</span></div>
      ${mistakesSection()}
      <div class="card panel topic-panel"><div class="panel-h"><h3>نقاط ضعف بر اساس مبحث</h3></div>${topicBars(topicStats())}
        ${topCount ? `<button class="tr-toggle more act-btn" id="allMistakes">نمایش همه‌ی اشتباهات به تفکیک مبحث (${faNum(topCount)}) ←</button>` : ''}</div>

      <div class="section-title">تنظیمات و امکانات</div>
      <div class="card opts">
        <button class="opt opt-link" id="openSaved"><span class="opt-ico">${ICON.bookmark(true)}</span><div class="opt-main">سؤالات ذخیره‌شده</div><span class="opt-go">${state.saved.length ? `<b>${faNum(state.saved.length)}</b>` : ''}${ICON.chevL}</span></button>
        <button class="opt opt-link" id="openWords"><span class="opt-ico">${ICON.book}</span><div class="opt-main">لغات ذخیره‌شده</div><span class="opt-go">${(state.words || []).length ? `<b>${faNum(state.words.length)}</b>` : ''}${ICON.chevL}</span></button>
        ${state.user.admin ? `<button class="opt opt-link" id="openImgGen"><span class="opt-ico">${ICON.ai}</span><div class="opt-main">ساخت تصاویر جدید سؤال‌ها</div><span class="opt-go">${ICON.chevL}</span></button>` : ''}
        ${state.user.admin ? `<button class="opt opt-link" id="openAdmin"><span class="opt-ico">${ICON.chart}</span><div class="opt-main">پنل مدیریت</div><span class="opt-go">${ICON.chevL}</span></button>` : ''}
        <div class="opt"><div>زبان آزمون<small>سؤال‌ها و گزینه‌ها به این زبان نمایش داده می‌شوند؛ ترجمه‌ی فارسی در هر دو حالت هست.</small></div>
          <div class="seg" role="group" aria-label="زبان آزمون">${Object.entries(LANGS).map(([k, v]) => `<button data-lang="${k}" class="${examLang() === k ? 'on' : ''}">${v}</button>`).join('')}</div></div>
        <div class="opt"><div>نمایش ترجمه‌ی فارسی زیر گزینه‌ها<small>در هر سؤال با دکمه‌ی «ترجمه» هم می‌توانید آن را باز و بسته کنید.</small></div><button class="switch ${state.settings.showFa ? 'on' : ''}" data-set="showFa" aria-label="ترجمه"></button></div>
        <div class="opt"><div>زمان‌سنج<small>برای هر سؤال ۱ دقیقه (آزمون ۲۵ سؤالی = ۲۵ دقیقه، مشابه آزمون اصلی)؛ با پایان زمان، آزمون خودکار تحویل داده می‌شود.</small></div><button class="switch ${state.settings.timer ? 'on' : ''}" data-set="timer" aria-label="زمان‌سنج"></button></div>
      </div>
    </section>`;

    requestAnimationFrame(() => requestAnimationFrame(() => {
      const g = document.getElementById('gFg'); if (g && est) g.style.strokeDashoffset = G * (1 - est.prob);
    }));
    bindProgressChart(atts);
    bindHome();
    window.scrollTo({ top: 0 });
    // Nothing is focused when the dashboard opens (the login button that had focus is gone).
    if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
    if (!state.settings.lang) askLang();
  }

  function bindHome() {
    document.getElementById('start').onclick = () => askSize('random');
    const rs = document.getElementById('resume'); if (rs) rs.onclick = () => resumeExam();
    const dd = document.getElementById('dropDraft');
    if (dd) dd.onclick = () => confirmBox('حذف آزمون نیمه‌تمام؟', 'پاسخ‌های این آزمون ذخیره نمی‌شوند.', 'حذف', () => { dropDraft(); home(); });
    document.getElementById('openWords').onclick = () => wordsView();
    document.getElementById('openSaved').onclick = () => savedView();
    document.getElementById('openStudy').onclick = () => studyList();
    const oa = document.getElementById('openAdmin'); if (oa) oa.onclick = adminView;
    const og = document.getElementById('openImgGen'); if (og) og.onclick = imgGenView;
    const se = document.getElementById('statExams');
    if (se && state.attempts.length) { se.onclick = () => historyView(); se.onkeydown = e => { if (e.key === 'Enter') historyView(); }; }
    const sm = document.getElementById('startM'); if (sm) sm.onclick = () => askSize('mistakes');
    const st = document.getElementById('startTop'); if (st) st.onclick = () => askSize('top');
    $app.querySelectorAll('[data-mid]').forEach(b => b.onclick = () => showMistake(+b.dataset.mid));
    const am = document.getElementById('allMistakes'); if (am) am.onclick = () => mistakesView();
    bindHistory();
    $app.querySelectorAll('[data-lang]').forEach(b => b.onclick = () => setLang(b.dataset.lang));
    $app.querySelectorAll('[data-set]').forEach(b => b.onclick = () => {
      const k = b.dataset.set; state.settings[k] = !state.settings[k]; b.classList.toggle('on', state.settings[k]); saveSettings();
    });
  }
  // Full list of past exams (opened from the "exams" card on the dashboard).
  // "حذف" switches the page into delete mode: a delete button next to each exam, each asking for a yes/no first.
  function historyView(edit = false) {
    stopSpeak(); leaveExam(); setExamMode(false); closeModal();
    // Two sections, each opened with its button: random exams and finished lessons (kept open while on the page).
    const secs = [['random', 'آزمون‌های تصادفی', ICON.list, examIdx().length], ['lesson', 'آزمون‌های درس‌به‌درس', ICON.book, lessonIdx().length]];
    const examN = secs[0][3] + secs[1][3];
    edit = edit && examN > 0;
    const open = state.histOpen = state.histOpen || {};
    $app.innerHTML = `<section class="view hist-page">
      <button class="back-link" id="back">→ بازگشت به داشبورد</button>
      <div class="words-head"><h1>آزمون‌های قبلی <small class="muted">(${faNum(examN)} آزمون)</small></h1>
        ${examN ? `<span class="head-btns">${edit ? '<button class="tr-toggle danger" id="clearH">حذف همه</button>' : ''}<button class="tr-toggle ${edit ? '' : 'danger'}" id="editHist">${edit ? 'لغو' : `${ICON.trash} حذف`}</button></span>` : ''}</div>
      ${secs.map(([k, title, ico, n]) => `<div class="hist-sec ${open[k] ? 'open' : ''}">
        <button class="hist-sec-h" data-sec="${k}" aria-expanded="${!!open[k]}"><span class="opt-ico">${ico}</span><span class="hs-t"><b>${title}</b><small>${n ? `${faNum(n)} آزمون` : 'هنوز آزمونی نیست'}</small></span><svg class="hs-chev" width="20" height="20" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg></button>
        <div class="history" ${open[k] ? '' : 'hidden'}>${historyList(Infinity, edit, k)}</div>
      </div>`).join('')}
    </section>`;
    $app.querySelectorAll('[data-sec]').forEach(b => b.onclick = () => {
      const k = b.dataset.sec, on = open[k] = !open[k];
      b.parentElement.classList.toggle('open', on); b.setAttribute('aria-expanded', on); b.nextElementSibling.hidden = !on;
    });
    document.getElementById('back').onclick = home;
    // «حذف» opens both sections so any exam can be picked for deletion; «لغو» puts them back as they were.
    const eh = document.getElementById('editHist');
    if (eh) eh.onclick = () => {
      const y = scrollY;
      if (!edit) { state.histOpenBefore = { ...open }; open.random = open.lesson = true; }
      else if (state.histOpenBefore) { state.histOpen = state.histOpenBefore; state.histOpenBefore = null; }
      historyView(!edit); scrollTo({ top: y });
    };
    const ch = document.getElementById('clearH');
    if (ch) ch.onclick = () => confirmBox('حذف همه‌ی آزمون‌ها؟', `هر ${faNum(examN)} آزمون (تصادفی و درس‌به‌درس) و نتیجه‌شان از نمودارها، آمار اشتباهات و پیشرفت درس‌ها پاک می‌شود.`, 'بله', async () => {
      try { await api('DELETE', 'attempts'); state.attempts = []; historyView(); toast('همه‌ی آزمون‌ها حذف شدند'); } catch (e) { toast(e.message); }
    }, 'خیر');
    $app.querySelectorAll('[data-del-att]').forEach(b => b.onclick = () => {
      const i = +b.dataset.delAtt, att = state.attempts[i];
      confirmBox('حذف آزمون؟', `${b.dataset.label} (${fmtDateTime(att.at)}) و نتیجه‌اش از تاریخچه و آمار حذف می‌شود.`, 'بله', async () => {
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

  // ---------- Saved questions page ----------
  // Bookmarked questions, newest first, shown like the exam review: «پاسخ شما» (the ticks saved with the
  // bookmark) and «پاسخ صحیح»; the newest three are open, as in the exam review. Removing a bookmark here
  // keeps the card until the page is opened again, so it can be undone.
  function savedView() {
    stopSpeak(); leaveExam(); setExamMode(false); closeModal(); state.reviewAt = null;
    const list = state.saved.filter(x => Q.has(x.id)).slice().sort((a, b) => b.at - a.at);
    $app.innerHTML = `<section class="view saved-page">
      <button class="back-link" id="back">→ بازگشت به داشبورد</button>
      <div class="words-head"><h1><span class="h-ico">${ICON.bookmark(true)}</span>سؤالات ذخیره‌شده <small class="muted">(<span id="savedCount">${faNum(list.length)}</span> سؤال)</small></h1></div>
      ${list.length ? '' : `<div class="card empty">هنوز سؤالی ذخیره نکرده‌اید.<br>در مرور آزمون‌های قبلی یا در «آموزش درس‌به‌درس»، روی نشانک گوشه‌ی تصویر هر سؤال بزنید تا اینجا ذخیره شود.</div>`}
      <div class="review">${list.map((x, n) => reviewCard(resultOf(Q.get(x.id), x.a), n, `<span class="badge saved">${ICON.bookmark(true)} ${fmtDate(x.at)}</span>`, n < 3)).join('')}</div>
    </section>`;
    document.getElementById('back').onclick = home;
    bindReviewCards($app);
    window.scrollTo({ top: 0 });
  }

  // ---------- Lessons: prove.dk's 44 numbered tests of 25 questions, in their order ----------
  // A lesson is taken like the exam (same screens, the questions in prove.dk's order, no timer). When it is
  // handed in, the review starts with an AI summary that teaches from the user's own mistakes.
  // The tiles show each lesson's last and best result, from the stored attempts.
  const studyNote = t => {
    const m = /\(([^)]*)\)/.exec(t.title); if (!m) return '';
    return /nye regler/i.test(m[1]) ? 'فقط قوانین جدید' : /nyeste billeder/i.test(m[1]) ? 'جدیدترین تصاویر' : m[1];
  };
  const studyNum = (t, i) => (t.title.match(/\d+/) || [i + 1])[0];
  // Answered questions of a lesson's unfinished attempt (0 when there is none).
  const draftOf = id => { const d = state.lessonDrafts[id]; return d ? Math.max(1, d.answers.filter(a => a.some(Boolean)).length) : 0; };
  const lessonName = id => {
    const i = BANK.tests.findIndex(t => t.id === id);
    return i < 0 ? 'درس' : `درس ${faNum(studyNum(BANK.tests[i], i))}`;
  };

  const STUDY_FIRST = 10; // lessons shown before «نمایش همه»
  function studyList() {
    stopSpeak(); leaveExam(); setExamMode(false); closeModal();
    const byLesson = new Map();
    state.attempts.forEach(a => { if (a.mode === 'lesson' && a.lesson) (byLesson.get(a.lesson) || byLesson.set(a.lesson, []).get(a.lesson)).push(a); });
    const doneN = BANK.tests.filter(t => byLesson.has(t.id)).length;
    $app.innerHTML = `<section class="view study-page">
      <button class="back-link" id="back">→ بازگشت به داشبورد</button>
      <div class="words-head"><h1><span class="h-ico">${ICON.book}</span>آموزش درس‌به‌درس</h1></div>
      <div class="card study-prog">
        <div class="sp-row"><b>${faNum(BANK.tests.length)} درس ${faNum(FULL)} سؤالی</b><span>پیشرفت: <b>${faNum(doneN)}</b> از ${faNum(BANK.tests.length)} درس <span class="muted">(${faNum(Math.round(doneN / BANK.tests.length * 100))}٪)</span></span></div>
        <span class="mini-track"><i style="width:${doneN / BANK.tests.length * 100}%"></i></span>
      </div>
      <div class="study-grid">${BANK.tests.map((t, i) => {
        const atts = byLesson.get(t.id) || [], last = atts[atts.length - 1], note = studyNote(t);
        // The last three times the lesson was finished, oldest first: green = passed, red = failed.
        const recent = atts.slice(-3);
        // Thumbnail: the first question of the lesson with a real scene picture (build.py picks it).
        const img = (Q.get(t.thumb || t.qs[0]) || {}).img;
        // The tile starts the lesson; each result circle opens the review of that attempt.
        // border: grey = never opened, light red = opened but never passed, light green = passed at least once
        const tileState = atts.some(isPass) ? 'st-pass' : atts.length || draftOf(t.id) ? 'st-fail' : 'st-new';
        return `<div class="card study-tile ${tileState}" ${i >= STUDY_FIRST ? 'data-more hidden' : ''} style="animation-delay:${Math.min(i, 12) * 25}ms">
          <button class="st-open" data-st="${i}">
            ${img ? `<span class="st-thumb"><img src="${img}" alt="" loading="lazy"></span>` : ''}
            <span class="st-top"><b>درس ${faNum(studyNum(t, i))}</b></span>
            <span class="st-sub">${note ? esc(note) : `${faNum(t.qs.length)} سؤال`}</span>
            ${draftOf(t.id) ? `<span class="st-draft">نیمه‌تمام: ${faNum(draftOf(t.id))} از ${faNum(t.qs.length)}</span>` : ''}
          </button>
          <span class="st-runs">${recent.length ? recent.map((a, k) => `<button class="${isPass(a) ? 'ok' : 'bad'}" data-run="${state.attempts.indexOf(a)}" title="مرور: ${isPass(a) ? 'قبول' : 'مردود'} · ${scoreOf(a)}/${a.items.length} · ${fmtDate(a.at)}" aria-label="مرور آزمون ${faNum(k + 1)} این درس">${faNum(k + 1)}</button>`).join('') : draftOf(t.id) ? '' : '<span class="st-count">شروع نشده</span>'}</span>
        </div>`;
      }).join('')}</div>
      ${BANK.tests.length > STUDY_FIRST ? `<button class="tr-toggle more study-more" id="studyMore" aria-expanded="false">نمایش همه‌ی ${faNum(BANK.tests.length)} درس</button>` : ''}
      ${sectionPicker()}
    </section>`;
    document.getElementById('back').onclick = home;
    bindSectionPicker();
    const more = document.getElementById('studyMore');
    if (more) more.onclick = () => {
      const show = more.getAttribute('aria-expanded') !== 'true';
      $app.querySelectorAll('.study-tile[data-more]').forEach(t => { t.hidden = !show; });
      more.setAttribute('aria-expanded', show); more.blur();
      more.textContent = show ? 'نمایش کمتر' : `نمایش همه‌ی ${faNum(BANK.tests.length)} درس`;
      if (!show) $app.querySelector('.study-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    $app.querySelectorAll('[data-st]').forEach(b => b.onclick = () => startLesson(+b.dataset.st));
    $app.querySelectorAll('[data-run]').forEach(b => b.onclick = () => openAttempt(+b.dataset.run));
    // No lesson looks selected when the page opens: nothing keeps focus, and hover highlights wait until the
    // pointer actually moves (the click that opened the page often ends right over the first tile).
    if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
    const page = $app.querySelector('.study-page');
    page.classList.add('no-hover');
    page.addEventListener('pointermove', () => page.classList.remove('no-hover'), { once: true });
    window.scrollTo({ top: 0 });
  }
  // ---------- Study by category (official main sections) ----------
  // The main sections of the official teaching plan for category B (Undervisningsplan for kategori B) that the
  // theory test asks about (2 and 9 are practical only); a topic code ("7.19") starts with its section number.
  // The user picks sections, then how many questions; they come in random order.
  const sectionOf = c => +String(c).split('.')[0];
  const sectionPool = nums => BANK.questions.filter(q => nums.includes(sectionOf(q.c))).map(q => q.id);
  // Questions the user has already answered in any exam or lesson.
  const seenIds = () => new Set(state.attempts.flatMap(a => a.items.map(it => it.id)));
  // The user's accuracy per section, from the topics answered at least 3 times.
  function sectionAcc() {
    const m = new Map();
    for (const t of topicStats()) { const n = sectionOf(t.c), x = m.get(n) || { ok: 0, n: 0 }; x.ok += t.ok; x.n += t.n; m.set(n, x); }
    return new Map([...m].map(([n, x]) => [n, x.ok / x.n]));
  }
  function sectionPicker() {
    const acc = sectionAcc();
    const pctCls = p => (p >= 0.8 ? 'ok' : p >= 0.6 ? 'warn' : 'bad');
    const weak = [...acc.values()].some(a => a < 0.75);
    return `<div class="sec-pick" id="secPick">
      <button class="hist-sec-h" id="secToggle" aria-expanded="false"><span class="opt-ico">${ICON.book}</span><span class="hs-t"><b>آموزش بر اساس دسته‌بندی</b><small>دسته‌های برنامه‌ی آموزشی رسمی را انتخاب کنید و فقط همان مباحث را تمرین کنید</small></span><svg class="hs-chev" width="20" height="20" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg></button>
      <div class="sec-body" hidden>
        <div class="sec-row"><button type="button" class="tr-toggle" id="secAll">انتخاب همه</button><button type="button" class="tr-toggle" id="secNone">هیچ‌کدام</button>${weak ? '<button type="button" class="tr-toggle" id="secWeak">مباحث ضعیف من</button>' : ''}</div>
        <div class="cat-grid">${(BANK.sections || []).map((sec, i) => `
          <label class="cat-card cat-head"><input type="checkbox" value="${sec.n}">
            <span class="cat-num">${faNum(i + 1)}</span>
            <span class="cat-txt"><b>${sec.fa}</b><small class="da">${sec.da}</small></span>
            ${acc.has(sec.n) ? `<span class="cat-acc ${pctCls(acc.get(sec.n))}">${faNum(Math.round(acc.get(sec.n) * 100))}٪ پاسخ درست</span>` : ''}
            <span class="cat-n">${faNum(sectionPool([sec.n]).length)}<small>سؤال</small></span></label>`).join('')}</div>
        <div class="sec-foot">
          <div class="sec-foot-h"><b>تعداد سؤال‌ها</b><span class="sec-total" id="secTotal"></span></div>
          <label class="sec-new"><input type="checkbox" id="secNew" checked><span class="sw" aria-hidden="true"></span><span>فقط سؤال‌های غیرتکراری</span></label>
          <div class="sec-sizes" id="secSizes"></div>
          <button class="btn btn-primary wide" id="secStart" disabled>شروع آموزش</button>
        </div>
      </div>
    </div>`;
  }
  function bindSectionPicker() {
    const box = document.getElementById('secPick'); if (!box) return;
    const body = box.querySelector('.sec-body'), tog = document.getElementById('secToggle');
    const boxes = [...box.querySelectorAll('.cat-card input')];
    let size = null;
    const chosen = () => boxes.filter(b => b.checked).map(b => +b.value);
    const fresh = document.getElementById('secNew'), seen = seenIds();
    const poolIds = () => sectionPool(chosen()).filter(id => !fresh.checked || !seen.has(id));
    const update = () => {
      const nums = chosen(), pool = poolIds().length;
      boxes.forEach(b => b.closest('.cat-card').classList.toggle('on', b.checked));
      document.getElementById('secTotal').textContent = nums.length ? `${faNum(pool)} سؤال${fresh.checked ? ' غیرتکراری' : ''} در ${faNum(nums.length)} دسته` : 'دسته‌ای انتخاب نشده';
      const sizes = SIZES.filter(n => n <= pool); if (pool && pool < FULL && !sizes.includes(pool)) sizes.push(pool);
      if (!sizes.includes(size)) size = sizes.includes(FULL) ? FULL : sizes[sizes.length - 1] || null;
      document.getElementById('secSizes').innerHTML = sizes.length
        ? sizes.map(n => `<button type="button" class="sec-size ${n === size ? 'on' : ''}" data-n="${n}"><b>${faNum(n)}</b><small>سؤال</small></button>`).join('')
        : `<span class="muted">${nums.length ? 'در این دسته‌ها سؤال غیرتکراری باقی نمانده است.' : ''}</span>`;
      box.querySelectorAll('.sec-size').forEach(b => b.onclick = () => { size = +b.dataset.n; update(); });
      document.getElementById('secStart').disabled = !size;
    };
    tog.onclick = () => {
      const on = body.hidden; body.hidden = !on; box.classList.toggle('open', on); tog.setAttribute('aria-expanded', on);
      tog.blur();
      if (!on) return;
      // Nothing is picked when the panel opens, and a card under the resting pointer is not highlighted while the
      // panel scrolls into view; hover comes back once the pointer moves again.
      boxes.forEach(b => { b.checked = false; }); update();
      box.classList.add('no-hover');
      setTimeout(() => box.addEventListener('pointermove', () => box.classList.remove('no-hover'), { once: true }), 700);
      box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    boxes.forEach(b => b.onchange = update);
    fresh.onchange = update;
    document.getElementById('secAll').onclick = () => { boxes.forEach(b => { b.checked = true; }); update(); };
    document.getElementById('secNone').onclick = () => { boxes.forEach(b => { b.checked = false; }); update(); };
    const weak = document.getElementById('secWeak');
    if (weak) weak.onclick = () => { const acc = sectionAcc(); boxes.forEach(b => { b.checked = acc.get(+b.value) < 0.75; }); update(); };
    document.getElementById('secStart').onclick = () => {
      const ids = shuffle(poolIds()).slice(0, size);
      const go = () => newExam('sections', ids);
      if (state.draft) confirmBox('شروع آموزش جدید؟', 'با شروع این آموزش، آزمون نیمه‌تمام قبلی حذف می‌شود.', 'شروع', go); else go();
    };
    update();
  }

  // An unfinished attempt of this lesson is offered first: continue it, or start the lesson again.
  function startLesson(i) {
    const t = BANK.tests[i]; if (!t) return;
    const fresh = () => newExam('lesson', t.qs.filter(id => Q.has(id)), FULL, t.id);
    const d = state.lessonDrafts[t.id];
    if (!d) return fresh();
    const answered = d.answers.filter(a => a.some(Boolean)).length;
    openModal(`<h3>${lessonName(t.id)} نیمه‌تمام است</h3>
      <div class="ld-info">
        <div><span>پاسخ داده شده</span><b>${faNum(answered)} از ${faNum(d.ids.length)} سؤال</b></div>
        <div><span>آخرین سؤال</span><b>سؤال ${faNum(d.idx + 1)}</b></div>
        <div><span>آخرین بار</span><b>${fmtDateTime(d.saved)}</b></div>
      </div>
      <p style="color:var(--muted);margin:0">درس قبلی را از همان‌جا ادامه می‌دهید یا درس را از اول شروع می‌کنید؟ با شروع دوباره، پاسخ‌های قبلی این درس حذف می‌شوند.</p>
      <div class="quit-btns">
        <button class="btn btn-primary" id="ldGo">ادامه‌ی درس قبلی</button>
        <button class="btn btn-ghost" id="ldNew">شروع دوباره‌ی درس</button>
        <div class="quit-row"><button class="btn btn-text" data-close>انصراف</button></div>
      </div>`, 'quit-sheet');
    document.getElementById('ldGo').onclick = () => resumeExam(d);
    document.getElementById('ldNew').onclick = () => { dropDraft(t.id); fresh(); };
  }

  // AI summary at the top of a lesson's review: one lesson over all its mistakes (server: /api/summary).
  // Each «سؤال n» in it is a link that opens that question with the user's answer in a pop-up.
  function bindSummary(res) {
    const box = document.getElementById('aiSummary'); if (!box) return;
    const btn = box.querySelector('.ai-start'), body = box.querySelector('.ai-body');
    btn.onclick = () => {
      if (box.dataset.state === 'loading') return;
      if (box.dataset.state === 'done') body.hidden = !body.hidden;
      else aiSummary(res);
      box.classList.toggle('shown', !body.hidden); btn.setAttribute('aria-expanded', !body.hidden);
    };
  }
  function aiSummary(res) {
    const box = document.getElementById('aiSummary'); if (!box) return;
    const body = box.querySelector('.ai-body');
    box.dataset.state = 'loading'; body.hidden = false;
    const items = res.map((r, i) => ({ r, n: i + 1 })).filter(x => !x.r.ok && x.r.a)
      .map(({ r, n }) => ({ id: r.q.id, a: r.a.map(v => (v ? 1 : 0)), n }));
    body.innerHTML = aiLoading('در حال بررسی اشتباهات شما و آماده‌سازی جمع‌بندی آموزشی');
    const linkify = html => html.replace(/سؤال\s*([0-9۰-۹]+)/g, (m, d) => {
      const n = +d.replace(/[۰-۹]/g, c => '۰۱۲۳۴۵۶۷۸۹'.indexOf(c));
      return res[n - 1] ? `<button type="button" class="q-link" data-qn="${n}" title="نمایش سؤال ${faNum(n)} و پاسخ شما">سؤال ${faNum(n)}<svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-8 8M10 6H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>` : m;
    });
    body.onclick = e => {
      const l = e.target.closest('.q-link'); if (!l) return;
      const n = +l.dataset.qn, r = res[n - 1];
      openModal(`<div class="review">${reviewCard({ ...r, i: n - 1 }, 0, '', true)}</div>
        <div class="row-btns"><button class="btn btn-ghost" data-close>بستن</button></div>`, 'wide');
      bindReviewCards($modal);
    };
    api('POST', 'summary', { items, lang: examLang(), at: state.reviewAt || undefined })
      .then(d => { box.dataset.state = 'done'; body.innerHTML = `<div class="ai-reveal">${linkify(lessonHtml(d.text))}</div>`; })
      .catch(e => { delete box.dataset.state; body.innerHTML = `<p class="muted">${esc(e.status === 503 ? 'آموزش هوش مصنوعی فعال نیست.' : e.message)}</p>`; });
  }

  // ---------- Admin panel (users listed in the server's ADMIN_USERS) ----------
  // One series per chart, so a single colour and no legend; each bar has a tooltip with its day and value.
  function dayBars(days, key, unit) {
    const max = Math.max(1, ...days.map(d => d[key]));
    const label = d => new Date(d.day + 'T12:00Z').toLocaleDateString('fa-IR-u-ca-gregory', { timeZone: 'UTC', month: 'short', day: 'numeric' }); // d.day is already a Copenhagen day
    return `<div class="dbars" role="img" aria-label="${unit} در ۳۰ روز اخیر">${days.map(d => `
        <span class="dbar" data-tip="${label(d)}: ${faNum(d[key])} ${unit}"><i style="height:${d[key] ? Math.max(4, d[key] / max * 100) : 0}%"></i></span>`).join('')}</div>
      <div class="dbars-axis"><span>${label(days[0])}</span><span>بیشینه: ${faNum(max)}</span><span>${label(days[days.length - 1])}</span></div>`;
  }
  // 24 hourly bars of one Copenhagen day, from the server's per-hour visit counts ("YYYY-MM-DD HH").
  function hourBars(hours, day) {
    const rows = Array.from({ length: 24 }, (_, h) => ({ h, ...(hours[`${day} ${String(h).padStart(2, '0')}`] || { v: 0, u: 0 }) }));
    const max = Math.max(1, ...rows.map(r => r.v));
    const hh = h => `${String(h).padStart(2, '0')}:00`;
    return `<div class="dbars hbars" role="img" aria-label="بازدید ساعتی">${rows.map(r => `
        <span class="dbar" data-tip="${hh(r.h)}: ${faNum(r.v)} بازدید · ${faNum(r.u)} بازدیدکننده"><i style="height:${r.v ? Math.max(4, r.v / max * 100) : 0}%"></i></span>`).join('')}</div>
      <div class="dbars-axis"><span>۰۰:۰۰</span><span>۰۶:۰۰</span><span>۱۲:۰۰</span><span>۱۸:۰۰</span><span>۲۳:۰۰</span></div>
      <div class="hlist">${rows.filter(r => r.v).map(r => `<span><b>${hh(r.h)}</b> ${faNum(r.v)} بازدید · ${faNum(r.u)} نفر</span>`).join('') || '<span class="muted">در این روز بازدیدی ثبت نشده است.</span>'}</div>`;
  }
  const dayLabel = day => new Date(day + 'T12:00Z').toLocaleDateString('fa-IR-u-ca-gregory', { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric' });

  async function adminView() {
    stopSpeak(); leaveExam(); setExamMode(false); closeModal();
    $app.innerHTML = '<section class="view"><div class="card empty">در حال بارگذاری آمار…</div></section>';
    let d;
    try { d = await api('GET', 'adminstats'); } catch (e) { toast(e.message); return home(); }
    const t = d.totals, pct = (a, b) => (b ? Math.round(a / b * 100) : 0);
    const stat = (label, value, sub) => `<div class="card stat"><span>${label}</span><b>${value}</b><small>${sub}</small></div>`;
    $app.innerHTML = `<section class="view admin">
      <button class="back-link" id="back">→ بازگشت به داشبورد</button>
      <div class="words-head"><h1><span class="h-ico">${ICON.chart}</span>پنل مدیریت</h1><button class="tr-toggle" id="reloadAdmin">به‌روزرسانی</button></div>
      <div style="margin:0 0 14px"><button class="btn btn-primary" id="openGuideRef">مقایسه‌ی تصاویر علائم و حق تقدم با prove.dk</button></div>
      <div class="stats">
        ${stat('بازدید امروز', faNum(t.visitsToday), `${faNum(t.visitorsToday)} بازدیدکننده`)}
        ${stat('بازدید ۷ روز اخیر', faNum(t.visits7), `${faNum(t.visits30)} بازدید در ۳۰ روز`)}
        ${stat('کاربران', faNum(t.users), `${faNum(t.newToday)} امروز · ${faNum(t.new7)} در ۷ روز اخیر`)}
        ${stat('کاربران فعال امروز', faNum(t.activeToday), `${faNum(t.active7)} کاربر در ۷ روز اخیر`)}
        ${stat('آزمون‌های امروز', faNum(t.testsToday), `${faNum(t.tests7)} آزمون در ۷ روز اخیر`)}
        ${stat('کل آزمون‌ها', faNum(t.tests), `${faNum(t.full)} آزمون کامل · ${faNum(pct(t.passed, t.full))}٪ قبولی`)}
        ${stat('دقت میانگین (۳۰ روز)', `${faNum(pct(t.correct30, t.items30))}<em>٪</em>`, 'تصاویر کاملاً درست از کل تصاویر')}
        ${stat('زبان آزمون', `${faNum(t.lang.da)} / ${faNum(t.lang.en)}`, `دانمارکی / انگلیسی${t.lang.none ? ` · ${faNum(t.lang.none)} انتخاب‌نشده` : ''}`)}
        ${stat('آزمون‌های نیمه‌تمام', faNum(t.drafts), 'کاربرانی که آزمون ناتمام دارند')}
        ${stat('لغات ذخیره‌شده', faNum(t.words), 'مجموع بانک لغات همه‌ی کاربران')}
      </div>
      <div class="grid2">
        <div class="card panel"><div class="panel-h"><h3>بازدید روزانه</h3><small class="muted">۳۰ روز اخیر</small></div>${dayBars(d.visitDays, 'v', 'بازدید')}</div>
        <div class="card panel"><div class="panel-h"><h3>بازدید ساعتی</h3>
          <select id="hourDay" class="day-pick">${d.visitDays.slice().reverse().map(x => `<option value="${x.day}">${dayLabel(x.day)} (${faNum(x.v)})</option>`).join('')}</select></div>
          <div id="hourChart">${hourBars(d.visitHours, d.visitDays[d.visitDays.length - 1].day)}</div></div>
      </div>
      <div class="section-title">بازدید به تفکیک روز <small class="muted">(به وقت کپنهاگ؛ بازدیدکننده = دستگاه یکتا در آن روز)</small></div>
      <div class="card table-wrap vtable-wrap"><table class="utable">
        <thead><tr><th>روز</th><th>بازدید</th><th>بازدیدکننده</th></tr></thead>
        <tbody>${d.visitDays.slice().reverse().map(x => `<tr><td>${dayLabel(x.day)}</td><td class="num-strong">${faNum(x.v)}</td><td>${faNum(x.u)}</td></tr>`).join('')}</tbody>
      </table></div>
      <div class="grid2">
        <div class="card panel"><div class="panel-h"><h3>آزمون‌ها در هر روز</h3><small class="muted">۳۰ روز اخیر</small></div>${dayBars(d.days, 'tests', 'آزمون')}</div>
        <div class="card panel"><div class="panel-h"><h3>کاربران فعال در هر روز</h3><small class="muted">۳۰ روز اخیر</small></div>${dayBars(d.days, 'active', 'کاربر فعال')}</div>
        <div class="card panel"><div class="panel-h"><h3>ثبت‌نام‌های جدید در هر روز</h3><small class="muted">۳۰ روز اخیر</small></div>${dayBars(d.days, 'newUsers', 'ثبت‌نام')}</div>
      </div>
      <div class="section-title">گزارش‌های خطا و پیشنهادها <small class="muted">(${faNum((d.reports || []).length)} گزارش، جدیدترین اول)</small></div>
      <div class="card table-wrap"><table class="utable">
        <thead><tr><th>زمان</th><th>کاربر</th><th>نوع</th><th>متن</th><th>دستگاه</th></tr></thead>
        <tbody>${(d.reports || []).map(r => `<tr><td>${fmtDateTime(r.at)}</td><td><b>${esc(r.name || '')}</b><small class="da">${esc(r.username)}</small></td>
          <td>${r.kind === 'idea' ? 'پیشنهاد' : 'مشکل'}</td><td style="white-space:pre-wrap;min-width:240px" dir="auto">${esc(r.text)}</td>
          <td><small class="da">${esc(r.platform)} ${esc(r.version)}</small></td></tr>`).join('') || '<tr><td colspan="5" class="muted">هنوز گزارشی نرسیده است.</td></tr>'}</tbody>
      </table></div>
      <div class="section-title">کاربران <small class="muted">(${faNum(d.users.length)} نفر، به ترتیب آخرین فعالیت)</small></div>
      <div class="card table-wrap"><table class="utable">
        <thead><tr><th>کاربر</th><th>تعداد آزمون</th><th>امروز</th><th>۷ روز اخیر</th><th>قبولی / کامل</th><th>آخرین نمره</th><th>آخرین فعالیت</th><th>روزهای فعال</th><th>عضویت</th><th>زبان</th><th>لغات</th></tr></thead>
        <tbody>${d.users.map(u => `<tr>
          <td><b>${esc(u.name)}</b><small class="da">${esc(u.username)}</small></td>
          <td class="num-strong">${faNum(u.tests)}</td><td>${faNum(u.testsToday)}</td><td>${faNum(u.tests7)}</td>
          <td>${faNum(u.passed)} / ${faNum(u.full)}</td><td>${u.lastPct == null ? '–' : faNum(u.lastPct) + '٪'}</td>
          <td>${fmtDateTime(u.lastActive)}</td><td>${faNum(u.activeDays)}</td><td>${fmtDate(u.created)}</td>
          <td>${u.lang ? LANGS[u.lang] : '–'}</td><td>${faNum(u.words)}</td></tr>`).join('')}</tbody>
      </table></div>
    </section>`;
    document.getElementById('back').onclick = home;
    document.getElementById('reloadAdmin').onclick = adminView;
    document.getElementById('openGuideRef').onclick = guideRefView;
    document.getElementById('hourDay').onchange = e => { document.getElementById('hourChart').innerHTML = hourBars(d.visitHours, e.target.value); };
    window.scrollTo({ top: 0 });
  }

  // Comparing the app's teaching pictures (signs, right of way) with prove.dk's, side by side (admin only, guideref.js).
  // prove.dk's pictures are copied into the database once («دریافت تصاویر مرجع») and only shown here; for a sign whose
  // official drawing (public domain, Wikimedia Commons) is there, the admin chooses which one the app shows.
  async function guideRefView() {
    stopSpeak(); leaveExam(); setExamMode(false); closeModal();
    const st = guideRefView.st = guideRefView.st || { g: 0 };
    let d; try { d = await api('GET', 'guideref'); } catch (e) { toast(e.message); return adminView(); }
    const g = d.groups[Math.min(st.g, d.groups.length - 1)], run = d.run;
    const pic = (kind, key, v, on) => `<img loading="lazy" src="img/guideref/${kind}/${key}?v=${esc(String(v || ''))}" alt="" style="width:100%;aspect-ratio:4/3;object-fit:contain;background:#f2f3f5;border-radius:10px;${on ? 'outline:3px solid var(--ok, #2fae4f);outline-offset:2px' : ''}">`;
    const none = t => `<div style="width:100%;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;background:var(--surface2, #eee);border-radius:10px" class="muted">${t}</div>`;
    const opts = d.groups.map((x, i) => `<option value="${i}" ${i === st.g ? 'selected' : ''}>${x.kind === 'signs' ? 'علائم' : 'حق تقدم'} · ${esc(x.title)} (${faNum(x.items.length)})</option>`).join('');
    const running = run && !run.done;
    $app.innerHTML = `<section class="view admin">
      <button class="back-link" id="back">→ بازگشت به پنل مدیریت</button>
      <div class="words-head"><h1>مقایسه‌ی تصاویر با prove.dk</h1></div>
      <p class="muted" style="margin:0 0 10px">تصاویر prove.dk یک بار در پایگاه داده‌ی خودمان ذخیره می‌شوند و فقط در همین صفحه برای مقایسه دیده می‌شوند. برای تابلوهایی که طرح رسمی‌شان (مالکیت عمومی، از Wikimedia Commons) موجود است، می‌توانید طرح رسمی را به‌جای تصویر ساخته‌شده در برنامه نشان دهید.</p>
      <div class="card panel" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <button class="btn btn-primary" id="grImport" ${running ? 'disabled' : ''}>دریافت تصاویر مرجع</button>
        <span class="muted">${running ? `در حال دریافت… ${faNum(run.n)} از ${faNum(run.total)}` : run ? `آخرین دریافت: ${fmtDateTime(run.at)} · ${faNum(run.n)} مورد${run.errors.length ? ` · ${faNum(run.errors.length)} خطا` : ''}${run.stopped ? ' (نیمه‌کاره ماند؛ دوباره بزنید)' : ''}` : 'هنوز دریافت نشده است.'}</span>
        <label style="margin-inline-start:auto">گروه <select id="grGroup">${opts}</select></label>
      </div>
      ${run && run.errors.length ? `<details class="card panel"><summary class="muted">خطاهای دریافت</summary><pre dir="ltr" style="white-space:pre-wrap;font-size:12px">${esc(run.errors.slice(0, 50).join('\n'))}</pre></details>` : ''}
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,520px),1fr));gap:12px">
      ${g.items.map(x => `<div class="card panel" style="display:flex;flex-direction:column;gap:8px">
        <div><b>${x.sub ? `<span dir="ltr">${esc(x.sub)}</span> · ` : ''}${esc(x.label)}</b></div>
        <div style="display:grid;grid-template-columns:repeat(${x.canOfficial ? 3 : 2},1fr);gap:8px;align-items:start">
          <div>${x.ai ? pic('ai', x.key, x.ai, x.choice === 'ai') : none('ساخته نشده')}<small class="muted">تصویر ساخته‌شده (AI)</small></div>
          <div>${x.prove ? pic('prove', x.key, '') : none(x.onProve ? 'دریافت نشده' : 'در prove.dk نیست')}<small class="muted">prove.dk (فقط مقایسه)</small></div>
          ${x.canOfficial ? `<div>${x.official ? pic('official', x.key, '', x.choice === 'official') : none('دریافت نشده')}<small class="muted">طرح رسمی (Commons)</small></div>` : ''}
        </div>
        ${x.canOfficial ? `<div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="tr-toggle ${x.choice === 'ai' ? 'on' : ''}" data-gr="${x.key}" data-c="ai" ${x.choice === 'ai' ? 'disabled' : ''}>${x.choice === 'ai' ? '✓ ' : ''}تصویر ساخته‌شده در برنامه</button>
          <button class="tr-toggle ${x.choice === 'official' ? 'on' : ''}" data-gr="${x.key}" data-c="official" ${x.choice === 'official' || !x.official ? 'disabled' : ''}>${x.choice === 'official' ? '✓ ' : ''}طرح رسمی در برنامه</button></div>` : ''}
      </div>`).join('')}
      </div>
    </section>`;
    document.getElementById('back').onclick = adminView;
    document.getElementById('grGroup').onchange = e => { st.g = +e.target.value; guideRefView(); };
    document.getElementById('grImport').onclick = async () => { try { await api('POST', 'guiderefimport', {}); } catch (e) { toast(e.message); } guideRefView(); };
    $app.querySelectorAll('[data-gr]').forEach(b => b.onclick = async () => {
      try { await api('POST', 'guiderefchoose', { key: b.dataset.gr, choice: b.dataset.c }); toast('ذخیره شد'); } catch (e) { toast(e.message); }
      guideRefView();
    });
    clearTimeout(guideRefView.t);
    if (running) guideRefView.t = setTimeout(() => { if (document.getElementById('grImport')) guideRefView(); }, 4000);
  }

  // Own page for the new question pictures (admin only), opened from «تنظیمات و امکانات».
  function imgGenView() {
    stopSpeak(); leaveExam(); setExamMode(false); closeModal();
    $app.innerHTML = `<section class="view">
      <button class="back-link" id="back">→ بازگشت به داشبورد</button>
      <div class="words-head"><h1><span class="h-ico">${ICON.ai}</span>ساخت تصاویر جدید سؤال‌ها</h1></div>
      <p class="muted" style="margin:0 0 12px">تصویر از روی توضیح متنیِ صحنه ساخته می‌شود؛ تصویر اصلی همیشه نگه داشته می‌شود و با یک کلیک برمی‌گردد.</p>
      <div class="card panel" id="imgGen"><div class="muted">در حال بارگذاری…</div></div>
    </section>`;
    document.getElementById('back').onclick = home;
    imgGenPanel();
    window.scrollTo({ top: 0 });
  }
  // New question pictures (admin): start one, watch its progress, and choose which picture the site shows.
  async function imgGenPanel() {
    const box = document.getElementById('imgGen'); if (!box) return;
    let d; try { d = await api('GET', 'imggen'); } catch (e) { box.innerHTML = `<div class="muted">${esc(e.message)}</div>`; return; }
    const stateFa = { describing: 'در حال نوشتن توضیح صحنه…', queued: 'در صف…', generating: 'در حال ساخت تصویر…', done: 'آماده', fail: 'ناموفق' };
    const rows = Object.entries(d.items).sort((a, b) => b[1].jobs.slice(-1)[0].at - a[1].jobs.slice(-1)[0].at);
    // Questions are chosen by lesson and number in the lesson; the question's id is only shown small.
    const where = qid => { for (let i = 0; i < BANK.tests.length; i++) { const k = BANK.tests[i].qs.indexOf(+qid); if (k >= 0) return { i, k }; } return null; };
    const whereFa = qid => { const w = where(qid); return w ? `درس ${faNum(studyNum(BANK.tests[w.i], w.i))} · سؤال ${faNum(w.k + 1)}` : `سؤال ${faNum(qid)}`; };
    const sel = imgGenPanel.sel = imgGenPanel.sel || { i: 0, k: 0 };
    // Edited scene descriptions survive the panel's own refreshes: drafts by key ('new' = the form, else a job id).
    const drafts = imgGenPanel.drafts = imgGenPanel.drafts || {}, openSet = imgGenPanel.open = imgGenPanel.open || new Set();
    // Made pictures are listed by lesson and question only; a row opens to show its pictures (kept open on refresh).
    const exp = imgGenPanel.exp = imgGenPanel.exp || new Set();
    const lessonOpts = BANK.tests.map((t, i) => `<option value="${i}" ${i === sel.i ? 'selected' : ''}>درس ${faNum(studyNum(t, i))}</option>`).join('');
    const qOpts = i => BANK.tests[i].qs.map((id, k) => `<option value="${k}" ${k === sel.k ? 'selected' : ''}>سؤال ${faNum(k + 1)}${d.items[id] ? ' ✓' : ''}</option>`).join('');
    const pending = rows.some(([, x]) => x.jobs.some(j => !j.done));
    box.innerHTML = `${d.available ? '' : '<div class="form-err">KIE_API_KEY روی سرور تنظیم نشده است.</div>'}
      <form class="ig-form" id="igForm"><label>درس <select name="lesson" id="igLesson">${lessonOpts}</select></label>
        <label>سؤال <select name="q" id="igQ">${qOpts(sel.i)}</select></label>
        <div class="ig-pick" id="igPick"></div>
        <label>مدل <select name="model">${d.models.map(m => `<option value="${m}" ${m === imgGenPanel.model ? 'selected' : ''}>${m === 'flare' ? 'GPT Image 2.5 Flare' : 'GPT Image 2.5 Sunburst'}</option>`).join('')}</select></label>
        <button class="btn btn-primary ig-go" ${d.available ? '' : 'disabled'}>ساخت تصویر جدید</button></form>
      ${rows.length ? '<div class="ig-list-h">تصاویر ساخته‌شده</div>' : ''}
      ${rows.length ? rows.map(([qid, x]) => `<div class="ig-q ${exp.has(qid) ? 'open' : ''}">
        <button type="button" class="ig-h" data-ig-exp="${qid}" aria-expanded="${exp.has(qid)}"><b>${whereFa(qid)}</b>${x.jobs.some(j => !j.done) ? '<span class="ig-spin sm"></span>' : ''}<svg class="hs-chev" width="18" height="18" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg></button>
        <div class="ig-row" ${exp.has(qid) ? '' : 'hidden'}>
          <div class="ig-cell ${x.active ? '' : 'on'}"><img src="img/q${qid}.jpg?orig=1" alt=""><span>تصویر اصلی</span>
            ${x.active ? `<button class="tr-toggle" data-ig-set="${qid}" data-job="">برگرداندن تصویر اصلی</button>` : '<em>نمایش داده می‌شود</em>'}</div>
          ${x.jobs.slice().reverse().map(j => `<div class="ig-cell ${x.active === j.id ? 'on' : ''}">
            ${j.blob ? `<img src="img/gen/${qid}/${j.id}" alt="">` : `<div class="ig-wait">${j.done ? '✗' : '<span class="ig-spin"></span>'}</div>`}
            <span>${j.model === 'sunburst' ? 'Sunburst' : 'Flare'}${j.kind === 'edit' ? ' · ویرایش' : ''} · ${fmtDateTime(j.at)} · ${stateFa[j.state] || j.state}${j.error && j.state === 'fail' ? ` <small class="da">(${esc(j.error)})</small>` : ''}</span>
            ${j.instruction ? `<small class="ig-instr">دستور ویرایش: <span class="da" dir="auto">${esc(j.instruction)}</span></small>` : ''}
            ${j.blob ? (x.active === j.id ? '<em>نمایش داده می‌شود</em>' : `<button class="tr-toggle" data-ig-set="${qid}" data-job="${j.id}">نمایش این تصویر در سایت</button>`) : ''}
            ${j.blob ? `<div class="ig-fix">
              <textarea data-draft="e:${j.id}" rows="2" dir="auto" placeholder="فقط چه چیزی در این تصویر عوض شود؟ مثلاً: the traffic light should show red">${esc(drafts['e:' + j.id] || '')}</textarea>
              <button type="button" class="btn btn-primary ig-regen" data-ig-edit="${qid}" data-job="${j.id}" ${d.available ? '' : 'disabled'}>اعمال این ویرایش</button></div>` : ''}
            ${j.done ? `<button type="button" class="ig-del" data-ig-del="${qid}" data-job="${j.id}">حذف این تصویر</button>` : ''}
            ${j.prompt ? `<details data-open="${j.id}" ${openSet.has(j.id) ? 'open' : ''}><summary>توضیح صحنه${j.edited ? ' <small class="muted">(ویرایش‌شده)</small>' : ''}</summary>
              <textarea class="da" dir="ltr" data-draft="${j.id}" rows="8">${esc(drafts[j.id] != null ? drafts[j.id] : j.prompt)}</textarea>
              <button type="button" class="btn btn-primary ig-regen" data-ig-regen="${qid}" data-job="${j.id}" ${d.available ? '' : 'disabled'}>ساخت مجدد تصویر براساس این متن</button></details>` : ''}</div>`).join('')}
        </div></div>`).join('') : '<div class="muted">هنوز تصویری ساخته نشده است.</div>'}`;
    // Preview of the chosen question: its current picture and text, so the right one is picked.
    const ls = document.getElementById('igLesson'), qs = document.getElementById('igQ'), pick = document.getElementById('igPick');
    const showPick = () => {
      const id = BANK.tests[sel.i].qs[sel.k], q = Q.get(id);
      pick.innerHTML = q ? `<img src="${q.img}" alt=""><span><b>${whereFa(id)}</b> <small class="muted da">#${id}</small><br><span class="da">${esc(q.sda)}</span></span>` : '';
    };
    ls.onchange = () => { sel.i = +ls.value; sel.k = 0; qs.innerHTML = qOpts(sel.i); showPick(); };
    qs.onchange = () => { sel.k = +qs.value; showPick(); };
    showPick();
    document.getElementById('igForm').onsubmit = async e => {
      e.preventDefault(); const f = Object.fromEntries(new FormData(e.target)); e.target.querySelector('button').disabled = true;
      toast('در حال شروع… (نوشتن توضیح صحنه چند ثانیه طول می‌کشد)');
      try { await api('POST', 'imggenstart', { qid: BANK.tests[sel.i].qs[sel.k], model: f.model }); exp.add(String(BANK.tests[sel.i].qs[sel.k])); } catch (err) { toast(err.message); }
      imgGenPanel();
    };
    box.querySelectorAll('[data-draft]').forEach(t => t.oninput = () => { drafts[t.dataset.draft] = t.value; });
    box.querySelectorAll('[data-ig-exp]').forEach(b => b.onclick = () => {
      const q = b.dataset.igExp, on = !exp.has(q); on ? exp.add(q) : exp.delete(q);
      b.setAttribute('aria-expanded', on); b.parentNode.classList.toggle('open', on); b.nextElementSibling.hidden = !on;
    });
    document.querySelector('#igForm [name=model]').onchange = e => { imgGenPanel.model = e.target.value; };
    box.querySelectorAll('details[data-open]').forEach(x => x.ontoggle = () => { x.open ? openSet.add(x.dataset.open) : openSet.delete(x.dataset.open); });
    box.querySelectorAll('[data-ig-regen]').forEach(b => b.onclick = async () => {
      const text = (drafts[b.dataset.job] != null ? drafts[b.dataset.job] : box.querySelector(`[data-draft="${b.dataset.job}"]`).value).trim();
      if (!text) return toast('توضیح صحنه خالی است.');
      b.disabled = true; toast('در حال ساخت مجدد تصویر براساس این متن…');
      try { await api('POST', 'imggenstart', { qid: +b.dataset.igRegen, model: document.querySelector('#igForm [name=model]').value, prompt: text }); delete drafts[b.dataset.job]; } catch (err) { toast(err.message); }
      imgGenPanel();
    });
    box.querySelectorAll('[data-ig-edit]').forEach(b => b.onclick = async () => {
      const key = 'e:' + b.dataset.job, text = (drafts[key] || '').trim();
      if (!text) return toast('بنویسید چه چیزی در تصویر عوض شود.');
      b.disabled = true; toast('در حال ویرایش تصویر…');
      try { await api('POST', 'imggenedit', { qid: +b.dataset.igEdit, job: b.dataset.job, text, model: document.querySelector('#igForm [name=model]').value }); delete drafts[key]; } catch (err) { toast(err.message); }
      imgGenPanel();
    });
    box.querySelectorAll('[data-ig-del]').forEach(b => b.onclick = () => confirmBox('حذف این تصویر؟', 'این تصویر ساخته‌شده برای همیشه حذف می‌شود. اگر روی سایت نمایش داده می‌شد، جدیدترین تصویر باقی‌مانده و اگر نبود، تصویر اصلی نمایش داده می‌شود.', 'حذف', async () => {
      try { await api('POST', 'imggendel', { qid: +b.dataset.igDel, job: b.dataset.job }); await loadMe(); toast('تصویر حذف شد'); } catch (err) { toast(err.message); }
      imgGenPanel();
    }));
    box.querySelectorAll('[data-ig-set]').forEach(b => b.onclick = async () => {
      try { await api('POST', 'imggenset', { qid: +b.dataset.igSet, job: b.dataset.job || null }); await loadMe(); toast('تصویر سایت عوض شد'); } catch (err) { toast(err.message); }
      imgGenPanel();
    });
    clearTimeout(imgGenPanel.t);
    // Refresh while a picture is being made, but never while a description is being edited.
    const tick = () => { const b = document.getElementById('imgGen'); if (!b) return; if (b.contains(document.activeElement) && document.activeElement.tagName === 'TEXTAREA') imgGenPanel.t = setTimeout(tick, 8000); else imgGenPanel(); };
    if (pending) imgGenPanel.t = setTimeout(tick, 8000);
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
        <button type="button" class="wb-say" aria-label="${ui().read}">${ICON.speaker}</button></div>
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
    return s ? { ctx: stText(s), ctxFa: s.fa } : { ctx: qText(q), ctxFa: q.sfa };
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
            <div class="wmain"><span class="wword da">${esc(x.w)}</span><button class="speak" data-sayw="${esc(x.w)}" aria-label="${ui().read}">${ICON.speaker}</button></div>
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
    try { const c = await api('GET', 'config'); state.inviteRequired = !!c.inviteRequired; state.aiLessons = !!c.aiLessons; } catch { /* offline: assume no invite */ }
    try { await loadMe(); home(); }
    catch (e) {
      if (e.status && e.status !== 401) toast(e.message);
      authView('login');
    }
  })();
})();
