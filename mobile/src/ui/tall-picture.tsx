// A tall picture across the top of a page (the intro's slides, the «no internet» page), like the tab pages' picture
// headers: it fills the width from the top edge (under the status bar) and its lower edge melts into the page's colour.
// `children`: what is shown there while there is no picture (e.g. the app's own drawing).
// On a wide screen (a computer) the square picture is not stretched across the whole width, which cut off its top and
// bottom: it keeps at most WIDE × its height, in the middle, its sides melting into the page's colour too.
import { Image, type ImageSource } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

// The fade's steps, slow at both ends (smoothstep), so no edge shows where it begins or ends.
const STOPS = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1] as const;
const ALPHA = STOPS.map(t => Math.round(255 * t * t * (3 - 2 * t)).toString(16).padStart(2, '0'));
const WIDE = 1.3, SIDE = 120;

export function TallPicture({ source, height, bg, fade = 160, children }: { source: ImageSource | number | null; height: number; bg: string; fade?: number; children?: React.ReactNode }) {
  const { width } = useWindowDimensions(), maxW = Math.round(height * WIDE), narrow = width > maxW;
  const fades = ALPHA.map(a => `${bg}${a}`) as unknown as readonly [string, string, ...string[]];
  return (
    <View style={{ height, backgroundColor: bg, overflow: 'hidden' }}>
      {source ? (
        <View style={narrow ? { position: 'absolute', top: 0, bottom: 0, width: maxW, left: (width - maxW) / 2 } : StyleSheet.absoluteFill}>
          <Image source={source} contentFit="cover" transition={0} cachePolicy="memory-disk" style={StyleSheet.absoluteFill} accessibilityIgnoresInvertColors />
          {narrow ? (
            <>
              <LinearGradient pointerEvents="none" colors={fades} locations={STOPS} start={{ x: 1, y: 0.5 }} end={{ x: 0, y: 0.5 }} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: SIDE }} />
              <LinearGradient pointerEvents="none" colors={fades} locations={STOPS} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: SIDE }} />
            </>
          ) : null}
        </View>
      ) : children}
      <LinearGradient pointerEvents="none" colors={fades} locations={STOPS}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: fade }} />
    </View>
  );
}
