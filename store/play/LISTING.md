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

• Over 2.000 øvespørgsmål i samme form som teoriprøven: et billede og flere spørgsmål, du svarer ja eller nej til
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

• Over 2,000 practice questions in the test's own form: a picture and several questions you answer yes or no
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

• بیش از ۲۰۰۰ سؤال تمرینی به شکل خود آزمون: یک تصویر و چند سؤال بله/خیر
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

- **Collected:** Name, Email address (account); App activity (answers, progress); Photos (an optional profile picture);
  App info and performance (crash reports, if any). Shared with third parties: No (processors only: hosting, email,
  payments, AI explanations – these count as service providers, not sharing).
- **Purpose:** App functionality, Account management.
- **Encrypted in transit:** Yes.
- **Users can ask for deletion:** Yes – in the app (Settings → Account → Delete account) and at
  https://teori.bitlane.app/delete-account (the «delete account URL» field).

## Purchases

The Android app sells nothing (Play's billing rule): it shows no plans, no buy button and no link to pay. A premium pass
on the account (bought on the website) works in the app too. If in-app sales are wanted later: Google Play Billing, or
the EEA's User Choice Billing.

## Build and upload

1. Once: the upload key in the repository secrets `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`,
   `ANDROID_KEY_ALIAS` (keep a copy of the .jks file and its password somewhere safe).
2. GitHub → Actions → «Android APK» → Run workflow, with «Also build teoriprove.aab for Google Play» ticked.
3. Download `teoriprove.aab` from the new release (Releases).
4. Play Console → Testing → Internal testing → Create new release → accept Play App Signing (first time) → upload the
   .aab → release notes → Save → Review → Roll out.
5. Then Closed testing (a new personal account: at least 12 testers for 14 days), then Production → Send for review.
