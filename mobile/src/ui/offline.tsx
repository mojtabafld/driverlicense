// The page shown when there is no internet: full screen in the intro's teal, a picture of the lost connection (carried
// by the app, since the server cannot be reached), «check the connection and sign in again», and «تلاش دوباره».
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ActivityIndicator, Pressable, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from './icon';
import { T, tap } from './kit';

const PICTURE = require('../../assets/images/offline.png');
// The picture's own background colour at the top, so its edge does not show.
export const OFFLINE_TOP = '#3d9097';

// On the web the picture is a file from the server: loaded (invisibly) while online, so the offline page has it.
export function OfflinePreload() {
  return <Image source={PICTURE} style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }} cachePolicy="memory-disk" accessible={false} />;
}

export function Offline({ onRetry }: { onRetry: () => Promise<void> }) {
  const ins = useSafeAreaInsets(), { width, height } = useWindowDimensions();
  const [busy, setBusy] = useState(false);
  const side = Math.min(width - 32, height * 0.48, 460);
  const retry = async () => { tap(); setBusy(true); try { await onRetry(); } finally { setBusy(false); } };
  return (
    <View style={{ flex: 1 }} accessibilityRole="alert">
      <LinearGradient colors={[OFFLINE_TOP, OFFLINE_TOP, '#2a6a6d']} locations={[0, 0.72, 1]} start={{ x: 0.8, y: 0 }} end={{ x: 0.2, y: 1 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <View style={{ flex: 1, paddingTop: ins.top + 24, paddingBottom: ins.bottom + 24, paddingHorizontal: 28, width: '100%', maxWidth: 560, alignSelf: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: -28 }}>
          <Image source={PICTURE} style={{ width: side, height: side }} contentFit="contain" />
        </View>
        <View style={{ gap: 12, paddingBottom: 28 }}>
          <T style={{ color: '#fff', fontSize: 28, lineHeight: 42, fontWeight: '800' }}>اتصال به اینترنت برقرار نیست</T>
          <T style={{ color: 'rgba(255,255,255,0.86)', fontSize: 16, lineHeight: 28 }}>اتصال اینترنت را بررسی کنید و دوباره وارد شوید. با برقرار شدن اتصال، اپ خودش دوباره باز می‌شود.</T>
        </View>
        <Pressable disabled={busy} onPress={retry} accessibilityRole="button"
          style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 54, borderRadius: 27, backgroundColor: '#ffffff' })}>
          {busy ? <ActivityIndicator color="#2a7679" /> : <Icon name="refresh" size={18} color="#2a7679" weight="semibold" />}
          <T style={{ color: '#2a7679', fontSize: 17, fontWeight: '700' }}>تلاش دوباره</T>
        </Pressable>
      </View>
    </View>
  );
}
