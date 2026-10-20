// app.json, plus for the web build at /app (WEB_BASE=/app, see the build:web script) the base path its pages and
// bundles live under: a copy of the app served at teori.bitlane.app/app with prove.dk's question bank and lessons
// (built by `npm run build:web-app`).
// EXPO_PUBLIC_PROVE=1: the Android (and iOS) app of that copy (lib/config.ts' PROVE_BANK), its own app beside the main one
// (another name and package, so both can be installed; Mojtaba 2026-10-20).
module.exports = ({ config }) => {
  let c = process.env.WEB_BASE ? { ...config, experiments: { ...config.experiments, baseUrl: process.env.WEB_BASE } } : config;
  if (process.env.EXPO_PUBLIC_PROVE === '1') {
    c = { ...c, name: 'TeoriPrøve Prove', slug: c.slug, scheme: 'teoriprove-prove',
      android: { ...c.android, package: 'info.mintcloud.teoriprove.prove' },
      ios: { ...c.ios, bundleIdentifier: 'info.mintcloud.teoriprove.prove' } };
  }
  return c;
};
