# Teoripro

Practice site for the Danish category B theory test: random 25-question exams in the style of
Færdselsstyrelsen's digital test, Persian translations, explanations and short lessons, per-user
accounts, progress charts and a pass-probability estimate.
In the review of an exam, the bookmark on a question's picture saves it to «سؤالات ذخیره‌شده» (in the
settings and features menu), with the user's own ticks, to review again later. «آموزش درس‌به‌درس» on the
dashboard goes through prove.dk's 44 numbered tests of 25 questions: each is taken like the exam, in prove.dk's
order and without a timer, and its review starts with an AI summary that teaches from the user's mistakes.
During an exam, double-tap (or select) a Danish word to see its Persian meaning (built-in glossary
`data/dict_fa_*.txt`, driving context) and save it to your word bank.

> The questions and pictures come from prove.dk and are copyrighted. Keep this repository private
> and the deployed site limited to invited users (see `INVITE_CODE`).

## Run locally

```bash
npm install
npm start          # http://localhost:3000
```

Accounts are stored in `data/db.json` when `DATABASE_URL` is not set.

## Deploy to DigitalOcean App Platform

### Prerequisites

- A GitHub account with access to this repository (`mojtabafld/driverlicense`).
- A DigitalOcean account with billing set up. The spec uses a basic web instance (`apps-s-1vcpu-0.5gb`)
  and a dev PostgreSQL database in region `fra`.
- For the AI lessons: an Anthropic API key from [console.anthropic.com](https://console.anthropic.com)
  with credit on the account.
- Optional for local work: Node.js 20 or newer, and Python 3 to rebuild the question data.

### Steps

1. In DigitalOcean: **Create → Apps → GitHub**, pick the repository and branch `main`.
   App Platform reads `.do/app.yaml`: a Node.js web service plus a dev PostgreSQL database.
   (With the CLI: `doctl apps create --spec .do/app.yaml`.)
2. In the app's **Settings → web → Environment Variables**, add the secrets, each with **Encrypt** ticked:
   - `ANTHROPIC_API_KEY`: turns on the AI lesson after an exam.
   - `INVITE_CODE` (optional): only people who know it can create an account.
3. Add `ADMIN_USERS` there too, with your username, to get the admin panel.
4. `LESSON_AI_MODEL` is already set by the spec to `claude-opus-5-5`. To use another Claude model for the
   lessons, edit its value in the same screen; the app redeploys with it.
5. Every push to `main` redeploys automatically. Accounts live in PostgreSQL, so they survive redeploys.

`.do/app.yaml` is only read when the app is created. Changing it later does not change the running app:
edit variables in the dashboard. Do not run `doctl apps update --spec .do/app.yaml` on the live app, since
it replaces the whole variable list and would delete the secrets that were added only in the dashboard.

### Security limits

- Sign-in, password change and the Claude Code key: 10 failed tries per address per 10 minutes.
- New accounts: 5 per address per hour, 40 per hour in all.
- Every API call except `/api/config` (the health check): 240 per address per minute.
- AI lessons, AI search and recordings: each user's hourly allowance (40 / 60 / 60) and an hourly total for everyone (400 / 600 / 600).
- Pages are sent with `X-Frame-Options: DENY`, a `frame-ancestors 'none'` CSP, a Referrer-Policy and HSTS.
- Teaching pictures (`/course-art`, `/learn-art`, …; not `/guide-art`) are sent as JPEG when they have no transparency (`webpic.js`), about a tenth of the PNG's size, and kept in memory and in the database.
- The signs' and right of way's pictures (`/guide-art`) at three sizes (`?s=m` half, `?s=s` a quarter) as JPEG, made once per version in a worker thread (`guideweb.js`) and kept in the database (blobs `gw-…`).

### Environment variables

| Variable | Where it is set | Purpose |
|---|---|---|
| `DATABASE_URL` | Spec (from the attached database) | PostgreSQL connection string. Without it, accounts are stored in `data/db.json`. |
| `DATABASE_CA_CERT` | Spec (from the attached database) | CA certificate of the database. |
| `ANTHROPIC_API_KEY` | Dashboard, encrypted | Turns on the AI lessons in Persian: «آموزش این سؤال» in an exam's answer review explains each question and the user's own mistakes; after a lesson, «جمع‌بندی آموزشی اشتباهات شما» covers all its mistakes in one summary. Key points are in bold. Claude also sees each question's picture and describes only what it clearly shows. Lessons are cached per question (or set of questions) + mistake pattern. Without the key, the topic's fixed lesson is shown. |
| `LESSON_AI_MODEL` | Spec, editable in the dashboard | Claude model for the AI lessons and analyses after an exam. Default `claude-opus-5-5` (Claude Opus 5.5), also used when the variable is missing. |
| `IMAGE_PROMPT_MODEL` | Dashboard, optional | Claude model that writes the picture prompts in `/console`. Default `claude-opus-5-5`. |
| `IMAGE_MODEL` | Dashboard, optional | kie.ai picture model for every new picture (its `-text-to-image` and `-image-to-image` variants are used). Default `gpt-image-2-5-sunburst`. |
| `KIE_API_KEY` | Dashboard, encrypted (optional) | New question pictures for admins («ساخت تصاویر جدید سؤال‌ها» in «تنظیمات و امکانات» on the dashboard): Claude writes a factual description of the situation from the question and its picture, GPT Image 2.5 (Sunburst by default, or Flare; on kie.ai) draws one new picture with the chosen model from that text only. A made picture can be edited in place with a short instruction (image-to-image on our own picture, changing only what the instruction says) or deleted; when no made picture is left, the original is shown again. The new picture is kept in the database and shown instead of the original; the original file is never changed and can be shown again with one click. `PUBLIC_URL` (default https://teori.bitlane.app) is where kie.ai reports finished pictures. |
| `ELEVENLABS_API_KEY` | Dashboard, encrypted (optional) | Questions read aloud: the speaker button beside «ترجمه» in the exam and the review plays the question and its statements in the exam's language (Danish or English), made by ElevenLabs once per question and language and kept in the database. Without the key the button is hidden. |
| `STRIPE_SECRET_KEY` | Dashboard, encrypted (optional) | Premium («نسخه‌ی ویژه») passes bought with Stripe Checkout (`payments.js`): a week, a month or three months, one payment each in DKK, no automatic renewal (buying again extends the pass). `sk_test_…` for test mode (pay with card 4242 4242 4242 4242), `sk_live_…` for real payments. Without the key nothing can be bought and nothing is locked. |
| `STRIPE_WEBHOOK_SECRET` | Dashboard, encrypted (optional) | Signing secret (`whsec_…`) of the Stripe webhook to `https://<site>/api/stripehook` with the events `checkout.session.completed`, `checkout.session.async_payment_succeeded` and `charge.refunded`. The return page also checks the payment, so premium works without it, but late (MobilePay) payments and refunds need it. |
| `PREMIUM_PRICE_WEEK`, `PREMIUM_PRICE_MONTH`, `PREMIUM_PRICE_QUARTER` | Dashboard (optional) | The passes' prices in kroner, defaults `49`, `79` and `149`. |
| `PREMIUM_TESTERS` | Dashboard (optional) | With a test key, payments and the lock are only for the admins and these comma-separated usernames; everyone else sees the app as before. With a live key they are for everyone. |
| `RESEND_API_KEY` | Dashboard, encrypted (optional) | Email with Resend: signing up on the main site asks for an address and the new account waits until the link sent there is opened (24 h; «send again» and a corrected address on that page). Accounts from before and guests are not held up; they can add an address under «حساب کاربری». The trial code needs a confirmed address, one trial per address. `MAIL_FROM`: sender, default `Teoripro <no-reply@teori.bitlane.app>` (its domain verified in Resend). |
| `REPORT_TO` | Dashboard (optional) | Where «گزارش خطا» reports are emailed (comma-separated); default `support@` the `MAIL_FROM` domain, which Resend receives (MX), so they show in Resend → Emails → Receiving. Reply-To is the user's confirmed address. |
| `RESEND_WEBHOOK_SECRET` | Dashboard, encrypted (optional) | The signing secret (`whsec_…`) of a Resend webhook for the event `email.received` pointing at `https://teori.bitlane.app/api/inbound`: received emails are then kept for the admin panel («ایمیل‌های دریافتی»). Reading their text needs a `RESEND_API_KEY` with full access. |
| `FORWARD_TO` | Dashboard (optional) | An address elsewhere (e.g. your own inbox) that received emails are forwarded to, Reply-To their sender. Never an address of the receiving domain. |
| `DEFAULT_THEME` | Dashboard (optional) | The main site's colour theme for everyone who has not picked one in the settings (ocean, violet, sky, emerald, forest, lime, amber, coral, rose, mono, teal, indigo, orchid, gold, slate; default sky). A theme someone picked stays. Phones take a new value from their next start. |
| `PROMO_CODE` | Dashboard, encrypted (optional) | Discount codes (comma-separated, any case) that give a free Premium trial on the premium page; each account can have one trial, whichever code, and guest accounts none. `PROMO_DAYS`: its length, default 3. |
| `PREMIUM_GATE` | Dashboard (optional) | With a Stripe key set, the AI analysis and the read-aloud are only for accounts with a pass (and admins). `0`: everyone keeps them and passes can still be bought. |
| `ELEVENLABS_VOICE_ID_DA_WOMAN` / `_DA_MAN` / `_EN_WOMAN` / `_EN_MAN`, `ELEVENLABS_VOICE_ID_DA` / `ELEVENLABS_VOICE_ID_EN` / `ELEVENLABS_VOICE_ID` / `ELEVENLABS_MODEL` | Dashboard (optional) | The voice follows the language of the text read and the user's choice of a woman's or a man's voice (settings, «صدای خواندن سؤال‌ها», with a sample to hear): e.g. `ELEVENLABS_VOICE_ID_DA_MAN` for Danish in a man's voice; without that one `_DA` / `_EN`, else `ELEVENLABS_VOICE_ID`, else voice `JBFqnCBsd6RMkjVDRZzb`. Model default `eleven_multilingual_v2`. A change makes new recordings. |
| `ELEVENLABS_VOICE_ID_FA_MAN` / `ELEVENLABS_VOICE_ID_FA` / `ELEVENLABS_MODEL_FA` | Dashboard (optional) | The AI analysis and summary read aloud in Persian («گوش دادن» in their panels): voice `_FA_MAN`, else `_FA`, else `ELEVENLABS_VOICE_ID`; model default `eleven_v3` (Persian is not spoken by multilingual v2). |
| `LATEST_APP_VERSION` | Dashboard (optional) | The newest Android app's version, as the settings show it («نسخه‌ی نرم‌افزار»: `version` in `mobile/app.json`), in the form x.x (e.g. `1.0`). Raise the version in `app.json` for a new APK and set this to it after publishing: an Android app with an older version asks its user once per start to install the new one. |
| `APP_DOWNLOAD_URL` | Dashboard (optional) | Where that message's install button goes; default the latest GitHub release's page. |
| `APP_DOWNLOAD_URL_PROVE` | Dashboard (optional) | The same for the app of `/app` («Teoripro Prove», built by the «Android APK» workflow with `copy: prove`, released as «Android /app build N»); default the repository's releases page. |
| `INVITE_CODE` | Dashboard, encrypted (optional) | When set, sign-up requires this code. |
| `ADMIN_USERS` | Dashboard (optional) | Comma-separated usernames that see «پنل مدیریت» (admin panel with usage stats) in the settings. |
| `PORT` | App Platform (8080) | Port to listen on (3000 locally). |
| `HOST` | Not needed | Address to listen on (default `0.0.0.0`). |
| `DATABASE_SSL` | Not needed | Set to `false` to connect to PostgreSQL without SSL (e.g. a local database). |
| `DB_FILE` | Not needed | Path of the JSON account file when there is no database (default `data/db.json`). |

## Rebuilding the question data

`build.py` turns `data/raw.json` (+ `data/cats.json`, `data/fa_fix.json`, and `data/en.json` with the English
text of every question from prove.dk) into `site/data.js`,
including the Persian topic lessons and corrected translations. Topics are the subsections of the official
teaching plan (Undervisningsplan for kategori B, e.g. `7.19`); prove.dk's categories are mapped onto them in
`CAT_CODE`/`ID_CODE`:

```bash
python3 build.py
```

### Our own questions

`data/original_lesson1.json` holds new questions for lesson 1 (Teoriprøve 1), written new from the topics of prove.dk's,
in Danish, English and Persian. `build.py` puts them in place of prove.dk's text (same ids, topics and right answers, so
earlier answers stay valid). Each has an `img` scene description: when the server starts with `KIE_API_KEY` set, it
has the image model (GPT Image 2.5 Sunburst on kie.ai) draw one new picture per question from that text, once, and
shows it instead of the original (see `SEED` in `imagegen.js`). Claude then checks each picture against its description
(signs, markings, lit lights, vehicles' positions); one with a wrong detail is made again, up to 3 pictures per question,
and the findings show in the admin panel's job list. More lessons can be added as `data/original_<name>.json`.
prove.dk's original text of these questions is kept in `data/raw.json` and `data/backup/lesson1-prove-original.json`,
and the original pictures stay in `site/img` (shown with `?orig=1`, as the app's copy at `/app/` does).

### «آزمون جدید» (the new test)

A bank of its own, not taken from prove.dk or any other site: questions in the real test's format (a picture, a
question, two to four statements each answered yes or no), written from Færdselsloven, its bekendtgørelser and the
official curriculum, in Danish, English and Persian, every statement with why it is right or wrong. The questions are
in `data/newq-src/b01a.py` … (25 per file, numbers 5001–6100); `python3 -B data/newq-src/build.py` checks them and
writes `site/newq.js` (served to signed-in users only, like `site/data.js`) and `data/newq-art.json`, each question's
picture prompt. A new prompt gets `"order": false`: the server makes no picture for it (the question shows a
placeholder) until that is removed or set to `true` and the server is deployed; then it makes them with the image
model, 10 at a time, served at `/newq-art/<number>.png`. Every one of the 1,100 questions has its prompt there (4:3),
in four parts: a fixed opening that sets the point of view (from the driver's seat, from above, or an object such as the
dashboard); THE SCENE, the question's own scene; MUST BE CLEARLY VISIBLE / MUST NOT APPEAR; and the fixed style block
(flat vector, the official Danish sign designs, right-hand traffic, no text but what a sign carries). When a prompt
changes, the build marks it changed so its picture is made again. The statements are shown in a fixed order of their own (a
shuffle seeded by the question's number), so the right ones are not always the first.

## Mobile app

`mobile/` holds the iOS / Android / web app (Expo, same look as the site; Liquid Glass tab bar and answer options) on the same server and accounts; see `mobile/README.md`. Its web build (`app-web/`, made with `cd mobile && npm run build:web`) is the site at the root (`/`). The same app is built a second time with the base path `/app` (`app-web-app/`, by the same script) and served at `/app/`: that copy shows prove.dk's own pictures (the questions' originals, and prove.dk's for the signs and right of way). `/console` (`console/index.html`) is the admin's sign-in page for comparing the teaching pictures with prove.dk's, and nothing else. Every prompt the console writes for a new picture ends with the details paragraph (exact signs, markings and lights) and the style line of its part from `data/art-style.json`: realistic for the lessons' questions, the road-sign pictures' flat vector illustration for the signs, right of way and rules. `site/` now only holds the question bank (`data.js`) and its pictures.
