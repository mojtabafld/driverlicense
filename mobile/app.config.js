// app.json, plus for the web build at /app (WEB_BASE=/app, see the build:web script) the base path its pages and
// bundles live under: a copy of the app served at teori.bitlane.app/app with prove.dk's question bank and lessons
// (built by `npm run build:web-app`).
// EXPO_PUBLIC_PROVE=1: the Android (and iOS) app of that copy (lib/config.ts' PROVE_BANK), its own app beside the main one
// (another name and package, so both can be installed; Mojtaba 2026-10-20).
module.exports = ({ config }) => {
  let c = process.env.WEB_BASE ? { ...config, experiments: { ...config.experiments, baseUrl: process.env.WEB_BASE } } : config;
  if (process.env.EXPO_PUBLIC_PROVE === '1') {
    c = { ...c, name: 'Teoripro Prove', slug: c.slug, scheme: 'teoriprove-prove',
      android: { ...c.android, package: 'app.bitlane.teoripro.app' },
      ios: { ...c.ios, bundleIdentifier: 'app.bitlane.teoripro.app' } };
  }
  // Android: Firebase's config for the server's notifications (fcm.js, lib/push.native.ts), when it is in the folder
  // (Firebase console → the project → the Android app app.bitlane.teoripro → google-services.json; Mojtaba 2026-10-30).
  const gs = require('path').join(__dirname, 'google-services.json');
  if (process.env.EXPO_PUBLIC_PROVE !== '1' && require('fs').existsSync(gs)) c = { ...c, android: { ...c.android, googleServicesFile: './google-services.json' } };
  return c;
};
