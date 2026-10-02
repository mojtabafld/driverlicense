# TeoriPrøve — iOS, Android and web app

One Expo (React Native) code base for iOS, Android and the web. It uses the same server and accounts as
https://kore.mintcloud.info. Design: the same look as the web site (colours, background, cards, buttons and fonts from
`site/style.css`, copied into `src/ui/theme.ts`). Two parts use Apple's **Liquid Glass** in the site's colours
(`src/ui/liquid.tsx`: real glass via `expo-glass-effect` on iOS 26, a frosted look elsewhere): the answer options in
exams and lessons, and the tab bar at the bottom. On iOS the tab bar is Apple's own (`expo-router/unstable-native-tabs`),
on the web a copy of the iOS 26 floating glass bar, on Android Material tabs.

Theme: light by default; the moon / sun button in the top bar or «ظاهر» in the settings switches to dark. The choice is
kept on the device (on the web in the site's own `tp.theme` entry, so the site and `/app` share it). Persian text is set
in **Vazirmatn**, bundled with the app (`src/ui/fonts.ts`, five weights), so it does not depend on Google Fonts.

Icons (`src/ui/icon.ios.tsx` / `src/ui/icon.tsx`): on iOS Apple's **SF Symbols** through `expo-symbols`, so each phone shows its own system's
symbols (iOS 27's on iOS 27); the native tab bar uses them too. Apple licenses SF Symbols only for apps on Apple
platforms, so the web and Android use our own drawings in the same style (outline, and filled when chosen).

## Parts of the app (tabs at the bottom)
- **خانه**: chance of passing, counts, progress chart (percent correct of the last 30 attempts, 80% pass line; tap for details), latest activity.
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
- Right-to-left layout is forced with the `expo-localization` plugin (`forcesRTL`). This applies in development builds and
  store builds; Expo Go may show left-to-right. For the real look build a development build:
  `npx eas-cli@latest build --profile development --platform ios`.

## Web version on the site
The web build is served by the main server at **https://kore.mintcloud.info/app** (the site itself is unchanged).
After changing the app, rebuild it and commit `app-web/`:
```bash
cd mobile && npm run build:web     # writes ../app-web (base URL /app)
```
On the web the app talks to the server it is opened from.

## Checks
```bash
npx tsc --noEmit
npx expo lint
npx expo export --platform web     # web build in dist/
```

## Server side
The app signs in with `X-Client: app` and gets a session token. It sends it as `Authorization: Bearer …` (pictures on the
web version: `?t=…`, only for `/img/`). The web site keeps using its HttpOnly cookie. See `server.js`.
