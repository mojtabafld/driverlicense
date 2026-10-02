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
