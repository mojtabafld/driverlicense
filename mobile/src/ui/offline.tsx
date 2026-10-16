// The page shown when there is no internet, laid out like an intro slide: full screen in the intro's colour, a picture of
// the lost connection at the top (main site: the intro's own kind of drawing, ui/intro-art.tsx, in the theme's colours;
// /app: the photo carried by the app, since the server cannot be reached), «check the connection» and «تلاش دوباره».
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ActivityIndicator, Pressable, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from './icon';
import { ARC } from './theme';
import { IntroOffline } from './intro-art';
import { useIntroBg } from './onboarding';
import { T, tap } from './kit';
import { TallPicture } from './tall-picture';
import { px } from './palette';

const PICTURE = require('../../assets/images/offline.jpg');
// /app: the intro's dark forest green (the picture's own background, which it fades into); the main site takes the
// intro's colour of the theme in use (useIntroBg), as the web page's top colour too (app/_layout.tsx).
export const OFFLINE_TOP = ARC ? px('#111d45') : '#14421c';
const OFFLINE_FOOT = ARC ? px('#0a1433') : '#0d3014';
// The intro's button text colour (ui/onboarding.tsx).
const BUTTON_TEXT = ARC ? px('#2f55d4') : '#14421c';

// On the web the picture is a file from the server: loaded (invisibly) while online, so the offline page has it.
export function OfflinePreload() {
  return <Image source={PICTURE} style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }} cachePolicy="memory-disk" accessible={false} />;
}

export function Offline({ onRetry }: { onRetry: () => Promise<void> }) {
  const ins = useSafeAreaInsets(), { height, width } = useWindowDimensions();
  const [busy, setBusy] = useState(false);
  const BG = useIntroBg();
  const top = ARC ? BG[0] : OFFLINE_TOP, foot = ARC ? BG[2] : OFFLINE_FOOT, ink = ARC ? BUTTON_TEXT : OFFLINE_TOP;
  const headH = ins.top + Math.min(Math.round(height * (ARC ? 0.56 : 0.52)), ARC ? 540 : 520), artH = Math.min(height * 0.42, 340);
  const retry = async () => { tap(); setBusy(true); try { await onRetry(); } finally { setBusy(false); } };
  return (
    <View style={{ flex: 1 }} accessibilityRole="alert">
      <LinearGradient colors={[top, top, foot]} locations={[0, 0.8, 1]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      {ARC ? (
        <View style={{ height: headH, alignItems: 'center', justifyContent: 'center', paddingTop: ins.top }}>
          <View style={{ width: Math.min(width - 40, 380), height: artH }}><IntroOffline /></View>
        </View>
      ) : <TallPicture height={headH} bg={OFFLINE_TOP} source={PICTURE} />}
      <View style={{ flex: 1, marginTop: -28, paddingBottom: ins.bottom + 24, paddingHorizontal: 28, width: '100%', maxWidth: 560, alignSelf: 'center' }}>
        <View style={{ flex: 1, gap: 12 }}>
          <T style={{ color: '#fff', fontSize: 28, lineHeight: 42, fontWeight: '800' }}>اتصال به اینترنت برقرار نیست</T>
          <T style={{ color: 'rgba(255,255,255,0.86)', fontSize: 16, lineHeight: 28 }}>اتصال اینترنت را بررسی کنید و دوباره وارد شوید. با برقرار شدن اتصال، اپ خودش دوباره باز می‌شود.</T>
        </View>
        <Pressable disabled={busy} onPress={retry} accessibilityRole="button"
          style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 54, borderRadius: 12, backgroundColor: '#ffffff' })}>
          {busy ? <ActivityIndicator color={ink} /> : <Icon name="refresh" size={18} color={ink} weight="semibold" />}
          <T style={{ color: ink, fontSize: 17, fontWeight: '600' }}>تلاش دوباره</T>
        </Pressable>
      </View>
    </View>
  );
}
