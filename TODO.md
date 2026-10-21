# To do later

## Lessons
Once the step-by-step course («آموزش گام‌به‌گام», mobile/src/lib/course.ts) is complete, remove the lessons built on
prove.dk's questions and pictures («آموزش درس‌به‌درس»).

## Sign in with Apple
The «ادامه با اپل» button is hidden until there is an Apple Developer account (Mojtaba 2026-10-21). To add it:
- **Apple Developer Program** (99 USD a year), then in Certificates, Identifiers & Profiles:
  - an **App ID** with «Sign in with Apple» on (for the iOS app, if one comes),
  - a **Services ID** (e.g. `app.bitlane.teori.signin`) with «Sign in with Apple» configured for the domain
    `teori.bitlane.app` and the return URL `https://teori.bitlane.app/api/apple/callback`,
  - a **key** with «Sign in with Apple» on: download its `.p8` file once and note its **Key ID** and the **Team ID**.
- **Domain check**: Apple may ask for a file at `https://teori.bitlane.app/.well-known/apple-developer-domain-association.txt`
  (the server then has to serve it).
- **Server settings** in DigitalOcean (encrypted): `APPLE_SERVICES_ID`, `APPLE_TEAM_ID`, `APPLE_KEY_ID`, `APPLE_PRIVATE_KEY`
  (the `.p8` contents).
- **Server** (server.js, like Google's `google/start`, `google/callback`, `google/finish`): `apple/start` → Apple's
  authorize page (`response_mode=form_post`, scope `name email`), `apple/callback` is a **POST** from Apple with `code`
  (and the name only on the first sign-in, in `user`), trade the code at `https://appleid.apple.com/auth/token` with a
  client secret that is a JWT signed (ES256) with the `.p8` key, read `email` / `sub` from the ID token, then the same
  account and one-time-code steps as Google. Keep `user.apple = sub`.
- **Hidden emails**: users may choose «Hide my email» (`…@privaterelay.appleid.com`), which never matches an existing
  account; to email them, register the sending domain (Resend's) under «Sign in with Apple for Email Communication».
- **App** (mobile/src/ui/welcome.tsx): set `APPLE` to true and wire `onPress` like Google's (`lib/store.tsx`
  `googleSignIn`); add the Apple fields to the privacy policy (pages/privacy.html) and build new APKs.
- **App Store**: if an iOS app is published with Google sign-in, Apple requires Sign in with Apple in it too.

