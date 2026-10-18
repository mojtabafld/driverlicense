// The profile picture: one of the ten made by the server's image model, the user's own photo, or (with neither) a
// plain outline of a person in the theme's colours (DefaultFace). A tap on it in the settings opens AvatarSheet: the ten pictures
// to choose from, «انتخاب از گالری» (then the photo is cropped to a circle in AvatarCrop: drag to move, pinch or the
// buttons to zoom) and removing the picture.
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ActivityIndicator, Modal, PanResponder, Pressable, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

import { API_URL } from '@/lib/config';
import { imgSource } from '@/lib/img-source';
import { useApp } from '@/lib/store';
import { Icon } from './icon';
import { ActionButton, T, tap } from './kit';
import { Sheet, SheetScroll } from './sheet';
import { useColors, useIsDark } from './theme';
import { WASH_DARK, WASH_LIGHT } from './wash';

const COUNT = 10, OUT = 400; // made pictures to choose from; the saved photo's size in pixels

export function Avatar({ size }: { size: number }) {
  const c = useColors();
  const { user, avatarArt, token } = useApp();
  const a = user?.avatar;
  const src = a?.photo ? imgSource({ uri: `${API_URL}/api/avatar`, v: `v=${a.photo}`, token })
    : a?.preset && avatarArt[a.preset] ? { uri: `${API_URL}/avatar-art/${a.preset}.png?v=${avatarArt[a.preset]}` } : null;
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: src ? c.strong : c.surface }}>
      {src ? <Image source={src} style={{ width: size, height: size }} contentFit="cover" transition={150} />
        : <DefaultFace size={size} />}
    </View>
  );
}

// No picture chosen: a plain outline of a person in the theme's accent on its soft tint (over the card's colour, so it
// reads the same on a header), Mojtaba 2026-10-18.
function DefaultFace({ size }: { size: number }) {
  const c = useColors(), dark = useIsDark(), w = Math.max(1.4, size / 26);
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* On the blush-to-lavender wash (ui/wash.ts), as the AI answer's panel; Mojtaba 2026-10-18. */}
      <LinearGradient pointerEvents="none" colors={dark ? WASH_DARK : WASH_LIGHT} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
<View>
      <Svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24">
        <Circle cx={12} cy={9} r={3.8} fill="none" stroke={c.link} strokeWidth={w * 24 / (size * 0.6)} />
        <Path d="M5 20c1.3-3.4 4-5.2 7-5.2s5.7 1.8 7 5.2" fill="none" stroke={c.link} strokeWidth={w * 24 / (size * 0.6)} strokeLinecap="round" />
      </Svg>
      </View>
    </View>
  );
}

export function AvatarSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const c = useColors();
  const { user, avatarArt, setAvatar } = useApp();
  const [busy, setBusy] = useState(false), [err, setErr] = useState('');
  const [photo, setPhoto] = useState<{ uri: string; w: number; h: number } | null>(null);
  const run = (p: Promise<void>) => { setBusy(true); setErr(''); p.then(onClose, (e: any) => setErr(e?.message || 'ذخیره نشد؛ دوباره امتحان کنید.')).finally(() => setBusy(false)); };
  const pick = async () => {
    tap(); setErr('');
    const r = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 1 }).catch(() => null);
    const a = r && !r.canceled ? r.assets[0] : null;
    if (a && a.width && a.height) setPhoto({ uri: a.uri, w: a.width, h: a.height });
  };
  const cur = user?.avatar;
  return (
    <Sheet open={open} onClose={onClose} maxHeight="88%">
      <View style={{ gap: 2 }}>
        <T style={{ fontSize: 19, lineHeight: 28, fontWeight: '700', textAlign: 'center' }}>عکس پروفایل</T>
        <T style={{ fontSize: 13, color: c.muted, textAlign: 'center' }}>یکی از تصویرها را انتخاب کنید یا عکسی از گالری بگذارید</T>
      </View>
      <SheetScroll contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, paddingVertical: 4 }}>
        {Array.from({ length: COUNT }, (_, i) => i + 1).map(n => {
          const v = avatarArt[n], on = cur?.preset === n;
          return (
            <Pressable key={n} disabled={!v || busy} onPress={() => { tap(); run(setAvatar({ preset: n })); }} accessibilityRole="button" accessibilityLabel={`تصویر ${n}`}
              style={({ pressed }) => ({ width: 62, height: 62, borderRadius: 31, padding: 2, borderWidth: 2.5, borderColor: on ? c.text : 'transparent', opacity: pressed ? 0.8 : 1 })}>
              <View style={{ flex: 1, borderRadius: 29, overflow: 'hidden', backgroundColor: c.surface2, alignItems: 'center', justifyContent: 'center' }}>
                {v ? <Image source={{ uri: `${API_URL}/avatar-art/${n}.png?v=${v}` }} style={{ width: '100%', height: '100%' }} contentFit="cover" transition={150} />
                  : <Icon name="person" size={22} color={c.faint} />}
              </View>
            </Pressable>
          );
        })}
      </SheetScroll>
      {err ? <T style={{ color: c.bad, fontSize: 13.5, textAlign: 'center' }}>{err}</T> : null}
      {busy ? <ActivityIndicator /> : null}
      <ActionButton label="انتخاب از گالری" icon="person" onPress={pick} disabled={busy} />
      {cur ? (
        <Pressable onPress={() => { tap(); run(setAvatar({ remove: true })); }} disabled={busy} style={{ alignItems: 'center', paddingVertical: 6 }}>
          <T style={{ color: c.bad, fontWeight: '600', fontSize: 14 }}>حذف عکس پروفایل</T>
        </Pressable>
      ) : null}
      {photo ? <AvatarCrop photo={photo} onCancel={() => setPhoto(null)} onDone={image => { setPhoto(null); run(setAvatar({ image })); }} /> : null}
    </Sheet>
  );
}

// The crop, made once: the photo covers the round frame (side F) and can be moved and zoomed (1–4×) but never leave
// a gap in it. `st`: the picture's offset from the frame's top-left corner and its zoom.
function makeCrop(F: number, w: number, h: number, onChange: (st: { x: number; y: number; z: number }) => void) {
  const base = F / Math.min(w, h);
  const st = { x: (F - w * base) / 2, y: (F - h * base) / 2, z: 1 };
  const clamp = () => {
    const dw = w * base * st.z, dh = h * base * st.z;
    st.x = Math.min(0, Math.max(F - dw, st.x)); st.y = Math.min(0, Math.max(F - dh, st.y));
    onChange({ ...st });
  };
  // Zoom to z about the frame's point (cx, cy), so that point stays under the fingers.
  const zoomTo = (z: number, cx = F / 2, cy = F / 2) => {
    const nz = Math.min(4, Math.max(1, z)), k = nz / st.z;
    st.x = cx - (cx - st.x) * k; st.y = cy - (cy - st.y) * k; st.z = nz; clamp();
  };
  let from = { x: 0, y: 0, z: 1, d: 0 };
  const dist = (t: readonly { pageX: number; pageY: number }[]) => Math.hypot(t[0].pageX - t[1].pageX, t[0].pageY - t[1].pageY);
  const pan = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => false,
    onPanResponderGrant: () => { from = { x: st.x, y: st.y, z: st.z, d: 0 }; },
    onPanResponderMove: (e, g) => {
      const t = e.nativeEvent.touches;
      if (t.length >= 2) {
        const d = dist(t);
        if (!from.d) { from = { x: st.x, y: st.y, z: st.z, d }; return; }
        zoomTo(from.z * (d / from.d));
      } else { st.x = from.x + g.dx; st.y = from.y + g.dy; clamp(); }
    },
    onPanResponderRelease: () => { from.d = 0; },
  });
  // The square of the original picture shown in the frame.
  const area = () => {
    const s = base * st.z, size = Math.min(w, h, F / s);
    return { originX: Math.max(0, Math.round(-st.x / s)), originY: Math.max(0, Math.round(-st.y / s)), width: Math.floor(size), height: Math.floor(size) };
  };
  return { pan, zoom: (f: number) => zoomTo(st.z * f), area, first: { ...st }, base };
}

function AvatarCrop({ photo, onCancel, onDone }: { photo: { uri: string; w: number; h: number }; onCancel: () => void; onDone: (base64: string) => void }) {
  const c = useColors(), ins = useSafeAreaInsets();
  const F = Math.min(useWindowDimensions().width - 48, 320);
  const [st, setSt] = useState<{ x: number; y: number; z: number } | null>(null);
  const [crop] = useState(() => makeCrop(F, photo.w, photo.h, setSt));
  const [busy, setBusy] = useState(false), [err, setErr] = useState('');
  const now = st ?? crop.first, s = crop.base * now.z;
  const save = async () => {
    setBusy(true); setErr('');
    try {
      const a = crop.area();
      const img = await ImageManipulator.manipulate(photo.uri).crop(a).resize({ width: Math.min(OUT, a.width) }).renderAsync();
      const r = await img.saveAsync({ format: SaveFormat.JPEG, compress: 0.8, base64: true });
      if (!r.base64) throw new Error('no data');
      onDone(r.base64);
    } catch { setErr('عکس آماده نشد؛ عکس دیگری را امتحان کنید.'); setBusy(false); }
  };
  const B = 400; // the dimming ring's width, enough to cover the frame's corners
  return (
    <Modal visible transparent animationType="fade" onRequestClose={onCancel}>
      <View style={{ flex: 1, backgroundColor: '#0b0b0b', paddingTop: ins.top + 20, paddingBottom: ins.bottom + 20, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center', gap: 22 }}>
        <View style={{ gap: 4, alignItems: 'center' }}>
          <T style={{ color: '#fff', fontSize: 19, fontWeight: '700' }}>انتخاب محدوده</T>
          <T style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13.5, textAlign: 'center' }}>عکس را بکشید تا جابه‌جا شود؛ با دو انگشت یا دکمه‌ها بزرگ و کوچک کنید.</T>
        </View>
        {/* The photo in the frame, laid out left to right so its offsets are physical. */}
        <View {...crop.pan.panHandlers} style={{ width: F, height: F, overflow: 'hidden', direction: 'ltr', backgroundColor: '#222' } as any}>
          <Image source={{ uri: photo.uri }} style={{ position: 'absolute', left: now.x, top: now.y, width: photo.w * s, height: photo.h * s }} contentFit="fill" />
          {/* Dimmed outside the circle, with its edge. */}
          <View pointerEvents="none" style={{ position: 'absolute', left: -B, top: -B, width: F + B * 2, height: F + B * 2, borderRadius: F / 2 + B, borderWidth: B, borderColor: 'rgba(0,0,0,0.55)' }} />
          <View pointerEvents="none" style={{ position: 'absolute', left: 0, top: 0, width: F, height: F, borderRadius: F / 2, borderWidth: 2, borderColor: 'rgba(255,255,255,0.9)' }} />
        </View>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {[['−', 1 / 1.25], ['+', 1.25]].map(([l, f]) => (
            <Pressable key={l as string} onPress={() => { tap(); crop.zoom(f as number); }} accessibilityLabel={l === '+' ? 'بزرگ‌تر' : 'کوچک‌تر'}
              style={({ pressed }) => ({ width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? '#3a3a3a' : '#2a2a2a' })}>
              <T style={{ color: '#fff', fontSize: 24, lineHeight: 30, fontWeight: '600' }}>{l as string}</T>
            </Pressable>
          ))}
        </View>
        {err ? <T style={{ color: c.bad, fontSize: 13.5, textAlign: 'center' }}>{err}</T> : null}
        <View style={{ width: '100%', maxWidth: 360, flexDirection: 'row', gap: 10 }}>
          {/* Fixed colours: the crop is always on black. */}
          {([['انصراف', onCancel, '#2a2a2a', '#ffffff'], [busy ? 'در حال ذخیره…' : 'ذخیره', save, '#ffffff', '#111111']] as const).map(([label, onPress, bg, fg]) => (
            <Pressable key={bg} disabled={busy} onPress={() => { tap(); onPress(); }} accessibilityRole="button"
              style={({ pressed }) => ({ flex: 1, height: 54, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: bg, opacity: busy ? 0.6 : pressed ? 0.85 : 1 })}>
              <T style={{ fontSize: 16, fontWeight: '600', color: fg }}>{label}</T>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
}
