# TeoriPrøve

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
4. `LESSON_MODEL` is already set by the spec to `claude-opus-5-5`. To use another Claude model for the
   lessons, edit its value in the same screen; the app redeploys with it.
5. Every push to `main` redeploys automatically. Accounts live in PostgreSQL, so they survive redeploys.

`.do/app.yaml` is only read when the app is created. Changing it later does not change the running app:
edit variables in the dashboard. Do not run `doctl apps update --spec .do/app.yaml` on the live app, since
it replaces the whole variable list and would delete the secrets that were added only in the dashboard.

### Environment variables

| Variable | Where it is set | Purpose |
|---|---|---|
| `DATABASE_URL` | Spec (from the attached database) | PostgreSQL connection string. Without it, accounts are stored in `data/db.json`. |
| `DATABASE_CA_CERT` | Spec (from the attached database) | CA certificate of the database. |
| `ANTHROPIC_API_KEY` | Dashboard, encrypted | Turns on the AI lessons in Persian: «آموزش این سؤال» in an exam's answer review explains each question and the user's own mistakes; after a lesson, «جمع‌بندی آموزشی اشتباهات شما» covers all its mistakes in one summary. Key points are in bold. Claude also sees each question's picture and describes only what it clearly shows. Lessons are cached per question (or set of questions) + mistake pattern. Without the key, the topic's fixed lesson is shown. |
| `LESSON_MODEL` | Spec, editable in the dashboard | Claude model for the AI lessons. Default `claude-opus-5-5` (Claude Opus 5.5), also used when the variable is missing. |
| `KIE_API_KEY` | Dashboard, encrypted (optional) | New question pictures for admins («ساخت تصاویر جدید سؤال‌ها» in «تنظیمات و امکانات» on the dashboard): Claude writes a factual description of the situation from the question and its picture, GPT Image 2.5 (Sunburst by default, or Flare; on kie.ai) draws one new picture with the chosen model from that text only. A made picture can be edited in place with a short instruction (image-to-image on our own picture, changing only what the instruction says) or deleted; when no made picture is left, the original is shown again. The new picture is kept in the database and shown instead of the original; the original file is never changed and can be shown again with one click. `PUBLIC_URL` (default https://kore.mintcloud.info) is where kie.ai reports finished pictures. |
| `ELEVENLABS_API_KEY` | Dashboard, encrypted (optional) | Questions read aloud: the speaker button beside «ترجمه» in the exam and the review plays the question and its statements in the exam's language (Danish or English), made by ElevenLabs once per question and language and kept in the database. Without the key the button is hidden. |
| `ELEVENLABS_VOICE_ID_DA_WOMAN` / `_DA_MAN` / `_EN_WOMAN` / `_EN_MAN`, `ELEVENLABS_VOICE_ID_DA` / `ELEVENLABS_VOICE_ID_EN` / `ELEVENLABS_VOICE_ID` / `ELEVENLABS_MODEL` | Dashboard (optional) | The voice follows the language of the text read and the user's choice of a woman's or a man's voice (settings, «صدای خواندن سؤال‌ها», with a sample to hear): e.g. `ELEVENLABS_VOICE_ID_DA_MAN` for Danish in a man's voice; without that one `_DA` / `_EN`, else `ELEVENLABS_VOICE_ID`, else voice `JBFqnCBsd6RMkjVDRZzb`. Model default `eleven_multilingual_v2`. A change makes new recordings. |
| `ELEVENLABS_VOICE_ID_FA_MAN` / `ELEVENLABS_VOICE_ID_FA` / `ELEVENLABS_MODEL_FA` | Dashboard (optional) | The AI analysis and summary read aloud in Persian («گوش دادن» in their panels): voice `_FA_MAN`, else `_FA`, else `ELEVENLABS_VOICE_ID`; model default `eleven_v3` (Persian is not spoken by multilingual v2). |
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

## Mobile app

`mobile/` holds the iOS / Android / web app (Expo, same look as the site; Liquid Glass tab bar and answer options) on the same server and accounts; see `mobile/README.md`. Its web build (`app-web/`, made with `cd mobile && npm run build:web`) is the site at the root (`/`). The same app is built a second time with the base path `/app` (`app-web-app/`, by the same script) and served at `/app/`: that copy shows prove.dk's own pictures (the questions' originals, and prove.dk's for the signs and right of way). `/console` (`console/index.html`) is the admin's sign-in page for comparing the teaching pictures with prove.dk's, and nothing else. Every prompt the console writes for a new picture ends with the app's picture style from `data/art-style.json` (the style of the road-sign pictures: a clean flat vector illustration), in place of any other style line. `site/` now only holds the question bank (`data.js`) and its pictures.
