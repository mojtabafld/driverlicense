// A tall picture across the top of a page (the intro's slides, the «no internet» page), like the tab pages' picture
// headers: it fills the width from the top edge (under the status bar) and its lower edge melts into the page's colour.
// `children`: what is shown there while there is no picture (e.g. the app's own drawing).
import { Image, type ImageSource } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

// The fade's steps, slow at both ends (smoothstep), so no edge shows where it begins or ends.
const STOPS = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1] as const;
const ALPHA = STOPS.map(t => Math.round(255 * t * t * (3 - 2 * t)).toString(16).padStart(2, '0'));

export function TallPicture({ source, height, bg, fade = 160, children }: { source: ImageSource | number | null; height: number; bg: string; fade?: number; children?: React.ReactNode }) {
  return (
    <View style={{ height, backgroundColor: bg, overflow: 'hidden' }}>
      {source ? <Image source={source} contentFit="cover" transition={0} cachePolicy="memory-disk" style={StyleSheet.absoluteFill} accessibilityIgnoresInvertColors /> : children}
      <LinearGradient pointerEvents="none" colors={ALPHA.map(a => `${bg}${a}`) as unknown as readonly [string, string, ...string[]]} locations={STOPS}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: fade }} />
    </View>
  );
}
