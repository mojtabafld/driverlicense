// The page shown when there is no internet: full screen in the intro's dark forest green, a tall picture of the lost
// connection across the top fading into the page, as on the intro (carried by the app, since the server cannot be reached), «check the connection and sign in again», and «تلاش دوباره».
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ActivityIndicator, Pressable, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from './icon';
import { ARC } from './theme';
import { T, tap } from './kit';
import { TallPicture } from './tall-picture';

const PICTURE = require('../../assets/images/offline.jpg');
// The intro's dark forest green (the picture's own background, which it fades into).
export const OFFLINE_TOP = ARC ? '#111d45' : '#14421c';
const OFFLINE_FOOT = ARC ? '#0a1433' : '#0d3014';

// On the web the picture is a file from the server: loaded (invisibly) while online, so the offline page has it.
export function OfflinePreload() {
  return <Image source={PICTURE} style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }} cachePolicy="memory-disk" accessible={false} />;
}

export function Offline({ onRetry }: { onRetry: () => Promise<void> }) {
  const ins = useSafeAreaInsets(), { height } = useWindowDimensions();
  const [busy, setBusy] = useState(false);
  const headH = ins.top + Math.min(Math.round(height * 0.52), 520);
  const retry = async () => { tap(); setBusy(true); try { await onRetry(); } finally { setBusy(false); } };
  return (
    <View style={{ flex: 1 }} accessibilityRole="alert">
      <LinearGradient colors={[OFFLINE_TOP, OFFLINE_TOP, OFFLINE_FOOT]} locations={[0, 0.8, 1]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <TallPicture height={headH} bg={OFFLINE_TOP} source={PICTURE} />
      <View style={{ flex: 1, marginTop: -28, paddingBottom: ins.bottom + 24, paddingHorizontal: 28, width: '100%', maxWidth: 560, alignSelf: 'center' }}>
        <View style={{ flex: 1, gap: 12 }}>
          <T style={{ color: '#fff', fontSize: 28, lineHeight: 42, fontWeight: '800' }}>اتصال به اینترنت برقرار نیست</T>
          <T style={{ color: 'rgba(255,255,255,0.86)', fontSize: 16, lineHeight: 28 }}>اتصال اینترنت را بررسی کنید و دوباره وارد شوید. با برقرار شدن اتصال، اپ خودش دوباره باز می‌شود.</T>
        </View>
        <Pressable disabled={busy} onPress={retry} accessibilityRole="button"
          style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 54, borderRadius: 12, backgroundColor: '#ffffff' })}>
          {busy ? <ActivityIndicator color={OFFLINE_TOP} /> : <Icon name="refresh" size={18} color={OFFLINE_TOP} weight="semibold" />}
          <T style={{ color: OFFLINE_TOP, fontSize: 17, fontWeight: '600' }}>تلاش دوباره</T>
        </Pressable>
      </View>
    </View>
  );
}
