// The app is Persian: right to left on every phone, whatever the phone's language. expo-localization's forcesRTL
// takes effect only from the second launch on Android (it is applied after React Native has read the direction);
// this sets it in MainApplication.onCreate, before React Native starts, so the very first launch is right to left too.
const { withMainApplication } = require('expo/config-plugins');

module.exports = function withForceRtl(config) {
  return withMainApplication(config, mod => {
    const src = mod.modResults.contents;
    if (src.includes('I18nUtil.instance.forceRTL')) return mod;
    const line = '    com.facebook.react.modules.i18nmanager.I18nUtil.instance.allowRTL(this, true)\n' +
      '    com.facebook.react.modules.i18nmanager.I18nUtil.instance.forceRTL(this, true)\n';
    mod.modResults.contents = src.replace(/(override fun onCreate\(\) \{\n\s*super\.onCreate\(\)\n)/, `$1${line}`);
    if (mod.modResults.contents === src) throw new Error('with-force-rtl: MainApplication.onCreate not found');
    return mod;
  });
};
