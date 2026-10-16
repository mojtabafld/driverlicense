// The web app on an iPhone or iPad, or in Safari on a Mac, the first time the site opens (before signing up too, over
// the intro; Mojtaba asked): a sheet from the
// bottom showing how to put the app on the Home Screen (iOS: Share, then «Add to Home Screen»; a Mac: File, then
// «Add to Dock»). Not when it already runs from the Home Screen, not in /app, and once per browser.
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Modal, Platform, Pressable, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { PROVE_PICS } from '@/lib/config';
import { UI_CHOSEN } from '@/lib/i18n';
import { Button, T } from './kit';
import { useColors } from './theme';

const KEY = 'tp.a2hs';

function which(): 'ios' | 'mac' | null {
  // After the app's language is chosen (that choice reloads the page), so the sheet is in the user's language.
  if (Platform.OS !== 'web' || PROVE_PICS || !UI_CHOSEN || typeof window === 'undefined') return null;
  try {
    if (localStorage.getItem(KEY)) return null;
    const nav = navigator as Navigator & { standalone?: boolean };
    if (nav.standalone || window.matchMedia?.('(display-mode: standalone)').matches) return null;
    if (/[?&]verified=/.test(window.location.search)) return null;   // the «account active» card first; this next time
    const ua = nav.userAgent;
    if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && nav.maxTouchPoints > 1)) return 'ios';
    if (/Macintosh/.test(ua) && /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR|Firefox/.test(ua)) return 'mac';
  } catch {}
  return null;
}

// Safari's share button (a box with an arrow up) and the «add» square, as drawn in iOS.
const ShareIcon = ({ color }: { color: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M8 9H6.5A1.5 1.5 0 0 0 5 10.5v9A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 17.5 9H16" />
    <Path d="M12 14V3M8.5 6.5 12 3l3.5 3.5" />
  </Svg>
);
const AddIcon = ({ color }: { color: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round">
    <Rect x={4} y={4} width={16} height={16} rx={4} />
    <Path d="M12 8.5v7M8.5 12h7" />
  </Svg>
);
const DockIcon = ({ color }: { color: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Rect x={3} y={4} width={18} height={13} rx={2} />
    <Path d="M7 20h10" />
  </Svg>
);

export function InstallHint() {
  const c = useColors();
  const [kind, setKind] = useState<'ios' | 'mac' | null>(null);
  const up = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const k = which();
    if (!k) return;
    const t = setTimeout(() => {
      setKind(k);
      Animated.timing(up, { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
    }, 1200);
    return () => clearTimeout(t);
  }, [up]);
  if (!kind) return null;
  const close = () => {
    try { localStorage.setItem(KEY, String(Date.now())); } catch {}
    Animated.timing(up, { toValue: 0, duration: 220, easing: Easing.in(Easing.cubic), useNativeDriver: false }).start(() => setKind(null));
  };
  const steps = kind === 'ios'
    ? [
        { icon: <ShareIcon color={c.text} />, text: 'در نوار مرورگر روی دکمه‌ی اشتراک‌گذاری بزنید (اگر آن را نمی‌بینید، اول روی ••• بزنید).' },
        { icon: <AddIcon color={c.text} />, text: 'گزینه‌ی «Add to Home Screen» (افزودن به صفحه‌ی اصلی) را انتخاب کنید.' },
        { icon: <T style={{ fontSize: 13, fontWeight: '800', color: c.text }}>Add</T>, text: 'بالای صفحه روی «Add» بزنید؛ نماد برنامه روی صفحه‌ی اصلی می‌آید.' },
      ]
    : [
        { icon: <DockIcon color={c.text} />, text: 'در منوی File روی «Add to Dock» بزنید.' },
        { icon: <T style={{ fontSize: 13, fontWeight: '800', color: c.text }}>Add</T>, text: 'روی «Add» بزنید؛ برنامه در Dock می‌آید و مثل یک برنامه باز می‌شود.' },
      ];
  return (
    <Modal transparent visible animationType="none" onRequestClose={close}>
      <Animated.View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)', opacity: up }}>
        <Pressable style={{ flex: 1 }} onPress={close} accessibilityLabel="بستن" />
        <Animated.View style={{ alignSelf: 'center', width: '100%', maxWidth: 480, padding: 22, paddingBottom: 30, gap: 16,
          borderTopLeftRadius: 26, borderTopRightRadius: 26, backgroundColor: c.surface, borderWidth: 1, borderBottomWidth: 0, borderColor: c.line,
          transform: [{ translateY: up.interpolate({ inputRange: [0, 1], outputRange: [360, 0] }) }] }}>
          <View style={{ alignSelf: 'center', width: 38, height: 5, borderRadius: 3, backgroundColor: c.line, marginTop: -8 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <Image source={{ uri: '/apple-touch-icon.png' }} style={{ width: 54, height: 54, borderRadius: 13 }} />
            <View style={{ flex: 1, gap: 2 }}>
              <T style={{ fontSize: 17, fontWeight: '800' }}>{kind === 'ios' ? 'برنامه را به صفحه‌ی اصلی گوشی اضافه کنید' : 'برنامه را به Dock اضافه کنید'}</T>
              <T style={{ fontSize: 13, lineHeight: 21, color: c.muted }}>با یک لمس و تمام‌صفحه باز می‌شود، مثل یک برنامه‌ی واقعی.</T>
            </View>
          </View>
          <View style={{ gap: 10 }}>
            {steps.map((s, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 16, backgroundColor: c.surface2 }}>
                <View style={{ width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface, borderWidth: 1, borderColor: c.line }}>{s.icon}</View>
                <T style={{ flex: 1, fontSize: 13.5, lineHeight: 22 }}>{s.text}</T>
              </View>
            ))}
          </View>
          <Button big label="متوجه شدم" onPress={close} style={{ outlineStyle: 'none' } as object} />
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
