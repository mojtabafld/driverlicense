// app.json, plus for the web build at /app (WEB_BASE=/app, see the build:web script) the base path its pages and
// bundles live under: a fixed copy of the app, served at teori.bitlane.app/app with prove.dk's own pictures
// (built only by `npm run build:web-app`).
module.exports = ({ config }) => (process.env.WEB_BASE ? { ...config, experiments: { ...config.experiments, baseUrl: process.env.WEB_BASE } } : config);
