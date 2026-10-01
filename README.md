# TeoriPrøve

Practice site for the Danish category B theory test: random 25-question exams in the style of
Færdselsstyrelsen's digital test, Persian translations, explanations and short lessons, per-user
accounts, progress charts and a pass-probability estimate.
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

1. Push this repository to GitHub (`mojtabafld/driverlicense`, branch `main`).
2. In DigitalOcean: **Create → Apps → GitHub**, pick the repository and branch `main`.
   App Platform reads `.do/app.yaml`: a Node.js web service plus a dev PostgreSQL database.
   (With the CLI: `doctl apps create --spec .do/app.yaml`.)
3. In the app's **Settings → web → Environment Variables**, add `INVITE_CODE` (encrypted) with a code
   of your choice. Only people who know it can create an account.
4. Every push to `main` redeploys automatically. Accounts live in PostgreSQL, so they survive redeploys.

### Environment variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (set by App Platform from the attached database). |
| `DATABASE_CA_CERT` | CA certificate of the database (set by App Platform). |
| `INVITE_CODE` | When set, sign-up requires this code. |
| `PORT` | Port to listen on (App Platform sets 8080). |
| `ADMIN_USERS` | Comma-separated usernames that see «پنل مدیریت» (admin panel with usage stats) in the settings. |
| `ANTHROPIC_API_KEY` | Turns on the AI lesson («آموزش این سؤال») in the answer review: Claude explains each question and the user's own mistakes in Persian. Lessons are cached per question + mistake pattern. Optional `LESSON_MODEL` (default `claude-opus-5-5`, Claude Opus 5.5). Without the key the topic's fixed lesson is shown. |

## Rebuilding the question data

`build.py` turns `data/raw.json` (+ `data/cats.json`, `data/fa_fix.json`, and `data/en.json` with the English
text of every question from prove.dk) into `site/data.js`,
including the Persian topic lessons and corrected translations:

```bash
python3 build.py
```
