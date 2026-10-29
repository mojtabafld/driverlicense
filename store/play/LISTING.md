# Teoripro on Google Play

What to fill in on Play Console (https://play.google.com/console), section by section. The files beside this one are the
graphics. Character limits: name 30, short description 80, full description 4000.

## Graphics (this folder)

| Field | File | Size |
|---|---|---|
| App icon | `app-icon-512.png` | 512 × 512 |
| Feature graphic | `feature-graphic-1024x500.png` | 1024 × 500 |
| Phone screenshots | `screenshot-1-welcome.png` … `screenshot-5-glossary.png` | 1080 × 2160 (2:1, within Play's limits) |

Screenshots with the questions' pictures (an exam, a sign) are best taken on a phone from the live app, signed in:
the pictures are made on the server and do not show in a local build.

## Store listing

**App name:** Teoripro

### Dansk (default language)

**Kort beskrivelse** (≤ 80):
Øv til teoriprøven til kørekort B – med persisk og engelsk oversættelse.

**Fuld beskrivelse:**
Teoripro hjælper dig med at blive klar til teoriprøven til almindelig bil (kategori B).

• 1.100 øvespørgsmål i samme form som teoriprøven: et billede og flere spørgsmål, du svarer ja eller nej til
• Prøver på tid med 25 billeder – højst 5 fejl, som til den rigtige prøve
• Forklaring på hvert svar, så du forstår hvorfor
• Persisk og engelsk oversættelse af spørgsmål og forklaringer
• Lektioner kapitel for kapitel, færdselsregler, alle skilte og afmærkninger, vigepligt i trafikken
• Ordbog over prøvens danske ord, med betydning på persisk og engelsk
• Gentag dine fejl, til du kan dem
• Lyst og mørkt tema og mange farver

Teoripro er ikke tilknyttet Færdselsstyrelsen. Indholdet bygger på færdselsloven og bekendtgørelsen om vejafmærkning.

### English

**Short description** (≤ 80):
Practise for the Danish driving theory test, in Persian and English too.

**Full description:**
Teoripro gets you ready for the Danish driving theory test for a car (category B).

• 1,100 practice questions in the test's own form: a picture and several questions you answer yes or no
• Timed tests of 25 pictures – at most 5 mistakes, as in the real test
• An explanation for every answer, so you understand why
• Persian and English translation of the questions and explanations
• Lessons chapter by chapter, the traffic rules, every road sign and marking, right of way
• A glossary of the test's Danish words, with their meaning in Persian and English
• Practise your mistakes until you know them
• Light and dark theme and many colours

Teoripro is not affiliated with the Danish Road Traffic Authority (Færdselsstyrelsen). The content is based on the
Danish Road Traffic Act and the regulation on road signs and markings.

### فارسی (Persian)

**توضیح کوتاه** (≤ ۸۰):
تمرین آزمون تئوری گواهینامه‌ی دانمارک، با ترجمه‌ی فارسی و انگلیسی.

**توضیح کامل:**
Teoripro شما را برای آزمون تئوری گواهینامه‌ی خودرو (B) در دانمارک آماده می‌کند.

• ۱۱۰۰ سؤال تمرینی به شکل خود آزمون: یک تصویر و چند سؤال بله/خیر
• آزمون زمان‌دار با ۲۵ تصویر؛ حداکثر ۵ اشتباه، مثل آزمون واقعی
• توضیح برای هر پاسخ، تا بدانید چرا
• ترجمه‌ی فارسی و انگلیسی سؤال‌ها و توضیح‌ها
• آموزش فصل‌به‌فصل، قوانین راهنمایی و رانندگی، همه‌ی تابلوها و خط‌کشی‌ها، حق تقدم
• واژه‌نامه‌ی واژه‌های دانمارکی آزمون با معنی فارسی و انگلیسی
• تمرین دوباره‌ی اشتباه‌ها تا یاد بگیرید
• تم روشن و تیره و رنگ‌های مختلف

Teoripro وابسته به اداره‌ی راهنمایی و رانندگی دانمارک (Færdselsstyrelsen) نیست. محتوا بر پایه‌ی قانون راهنمایی و
رانندگی دانمارک و آیین‌نامه‌ی علائم است.

**Category:** Education · **Tags:** Education, Test preparation (if offered)
**Contact email:** support@teori.bitlane.app · **Website:** https://teori.bitlane.app

## App content (Policy → App content)

| Form | Answer |
|---|---|
| Privacy policy | https://teori.bitlane.app/privacy |
| App access | Some functionality is restricted: give a test account (an email account made for Google's review), or say «Tap “Continue as guest” on the first screen». |
| Ads | No ads |
| Content rating | Questionnaire, category «Education» / reference; no violence, sex, gambling, drugs or user-to-user chat → Everyone / PEGI 3 |
| Target audience | 16 and over (18+ also fine). Not under 13. |
| News app | No |
| Government app | No (and the listing says it is not affiliated) |
| Financial features | None |
| Health | No |
| Data safety | see below |

### Data safety

- **Collected:** Name, Email address (account); App activity (answers, progress, app interactions: the pages opened, counted
  per day without the account); Photos (an optional profile picture);
  App info and performance (crash reports, if any). Shared with third parties: No (processors only: hosting, email,
  payments, AI explanations – these count as service providers, not sharing).
- **Purpose:** App functionality, Account management.
- **Encrypted in transit:** Yes.
- **Users can ask for deletion:** Yes – in the app (Settings → Account → Delete account) and at
  https://teori.bitlane.app/delete-account (the «delete account URL» field).

## Purchases

The Android app sells the premium passes with Google Play Billing (never with Stripe, never pointing to the website). It
shows them only when the server has a Play service account (`GOOGLE_PLAY_SERVICE_ACCOUNT`); until then it sells nothing.
A pass bought on the website works in the app too, and the other way round.

Turning it on, once the app is uploaded to a testing track:

1. **Payments profile**: Play Console → Settings → Payments profile (name, address, bank account).
2. **Products**: Monetize → Products → One-time products → Create, three of them, each «Active»:
   - `pass_week` – Teoripro Premium, 1 uge – 49 kr.
   - `pass_month` – Teoripro Premium, 1 måned – 79 kr.
   - `pass_quarter` – Teoripro Premium, 3 måneder – 149 kr.

   (The ids must be exactly these; prices and names are free, set per country.)
3. **Service account**: Google Cloud Console → a project → IAM → Service accounts → Create (no role needed there) →
   Keys → Add key → JSON. Enable the «Google Play Android Developer API» in the same project. Then Play Console →
   Users and permissions → Invite new users → the service account's email → app permissions for Teoripro: «View
   financial data» and «Manage orders and subscriptions».
4. **Server**: in `/etc/teoripro/env` on the server, `GOOGLE_PLAY_SERVICE_ACCOUNT` = the whole
   JSON file's content (or the file in base64); then restart the service. Keep the file private; it is never put in the
   repository or sent anywhere else.
5. **Testing**: Play Console → Settings → License testing → your Gmail address. Your test purchases then cost nothing.
   Install the app from the internal testing link (not the APK from GitHub: Play Billing works only in a copy installed
   from Play), open «نسخه‌ی ویژه», buy.

Google keeps its service fee (about 15 % for most developers) and pays out monthly.

## Build and upload

1. Once: the upload key in the repository secrets `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`,
   `ANDROID_KEY_ALIAS` (keep a copy of the .jks file and its password somewhere safe).
2. GitHub → Actions → «Android APK» → Run workflow, with «Also build teoriprove.aab for Google Play» ticked.
3. Download `teoriprove.aab` from the new release (Releases).
4. Play Console → Testing → Internal testing → Create new release → accept Play App Signing (first time) → upload the
   .aab → release notes → Save → Review → Roll out.
5. Then Closed testing (a new personal account: at least 12 testers for 14 days), then Production → Send for review.
