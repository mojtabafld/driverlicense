// app.json, plus for the web build at /app (WEB_BASE=/app, see the build:web script) the base path its pages and
// bundles live under: the same app, served a second time at kore.mintcloud.info/app with prove.dk's own pictures.
module.exports = ({ config }) => (process.env.WEB_BASE ? { ...config, experiments: { ...config.experiments, baseUrl: process.env.WEB_BASE } } : config);
