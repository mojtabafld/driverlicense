# TeoriPrøve — iOS, Android and web app

One Expo (React Native) code base for iOS, Android and the web. It uses the same server and accounts as
https://kore.mintcloud.info. Design: Apple's **Liquid Glass**, i.e. real glass on iOS 26 (`expo-glass-effect`, native
tab bar via `expo-router/unstable-native-tabs`) and a matching frosted-glass look on Android and the web.

## Parts of the app (tabs at the bottom)
- **خانه**: chance of passing, counts, latest activity.
- **آزمون**: random exam (5–25 questions, timer), practice of mistakes, previous exams.
- **آموزش**: the 44 lessons one by one, or practice by the official sections.
- **تنظیمات**: exam language, Persian translation, timer, account.

The exam (`src/app/run.tsx`) and its result/review (`src/app/result.tsx`) open over the tabs.

## Run it
```bash
cd mobile
npm install
npx expo start            # scan the QR code with Expo Go (iOS/Android), or press w for the web
```
- The app talks to `https://kore.mintcloud.info`. For a local server: `EXPO_PUBLIC_API_URL=http://<your-ip>:3000 npx expo start`.
- Liquid Glass needs a device on **iOS 26**. Older iOS, Android and the web show the frosted-glass fallback.
- Right-to-left layout is forced with the `expo-localization` plugin (`forcesRTL`). This applies in development builds and
  store builds; Expo Go may show left-to-right. For the real look build a development build:
  `npx eas-cli@latest build --profile development --platform ios`.

## Checks
```bash
npx tsc --noEmit
npx expo lint
npx expo export --platform web     # web build in dist/
```

## Server side
The app signs in with `X-Client: app` and gets a session token. It sends it as `Authorization: Bearer …` (pictures on the
web version: `?t=…`, only for `/img/`). The web site keeps using its HttpOnly cookie. See `server.js`.
