// The app starts in Persian: right to left on every phone, whatever the phone's language. React Native reads the
// direction before any JavaScript runs, so on the very first launch it is set here, in MainApplication.onCreate.
// Only then: after that the app's JavaScript keeps the direction with the language chosen (lib/i18n.ts; English and
// Danish left to right), and Android remembers it, so setting it again on every launch would mirror those languages.
const { withMainApplication } = require('expo/config-plugins');

module.exports = function withForceRtl(config) {
  return withMainApplication(config, mod => {
    const src = mod.modResults.contents;
    if (src.includes('I18nUtil.instance.forceRTL')) return mod;
    const line =
      '    getSharedPreferences("tp.dir", 0).let { p ->\n' +
      '      if (!p.getBoolean("set", false)) {\n' +
      '        com.facebook.react.modules.i18nmanager.I18nUtil.instance.allowRTL(this, true)\n' +
      '        com.facebook.react.modules.i18nmanager.I18nUtil.instance.forceRTL(this, true)\n' +
      '        p.edit().putBoolean("set", true).apply()\n' +
      '      }\n' +
      '    }\n';
    mod.modResults.contents = src.replace(/(override fun onCreate\(\) \{\n\s*super\.onCreate\(\)\n)/, `$1${line}`);
    if (mod.modResults.contents === src) throw new Error('with-force-rtl: MainApplication.onCreate not found');
    return mod;
  });
};
