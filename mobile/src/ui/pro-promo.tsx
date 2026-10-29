// The premium page shown once per account on this device, the first time a signed-in user without premium reaches the
// app (after the intro and the questions' language), in the look of a picture Mojtaba sent (2026-10-29): three fanned
// cards of what premium opens, each with a glowing tile and its icon, the middle one locked; a «PRO» badge, a large
// two-line title and a line under it; the month pass with its price (it opens the premium page); a pale gradient button
// that starts the free trial without a code (POST trial; the premium page once the account has had a trial); and the
// privacy policy at the foot. «رد کردن» (Skip) and the back arrow close it.
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Easing, Platform, Pressable, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, Pattern, Rect } from 'react-native-svg';

import { API_URL } from '@/lib/config';
import { RTL, t, tr, UI_LANG } from '@/lib/i18n';
import { faNum } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { Icon, type IconName } from './icon';
import { T, tap } from './kit';
import { useColors, useIsDark } from './theme';

// A feature card: a dark inner tile with a faint dot grid and a glowing rounded orb with the feature's icon, the
// feature's name and a line under it. `lock`: a small lock in the tile's corner (the middle card).
function FeatureCard({ w, icon, orb, title, line, lock }: { w: number; icon: IconName; orb: [string, string, string]; title: string; line: string; lock?: boolean }) {
  const c = useColors(), dark = useIsDark();
  const tile = w - 20, o = Math.round(tile * 0.5);
  return (
    <View style={{ width: w, borderRadius: 30, padding: 10, paddingBottom: 16, gap: 10, backgroundColor: dark ? '#262626' : '#ffffff', borderWidth: 1, borderColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
      shadowColor: '#000', shadowOpacity: dark ? 0.5 : 0.12, shadowRadius: 24, shadowOffset: { width: 0, height: 12 } }}>
      <View style={{ width: tile, height: tile, borderRadius: 22, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: dark ? '#141414' : '#f2f2f2' }}>
        <Svg width={tile} height={tile} style={{ position: 'absolute' }}>
          <Defs>
            <Pattern id={`dots-${icon}`} width={10} height={10} patternUnits="userSpaceOnUse">
              <Circle cx={1.5} cy={1.5} r={0.9} fill={dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'} />
            </Pattern>
          </Defs>
          <Rect width={tile} height={tile} fill={`url(#dots-${icon})`} />
        </Svg>
        {/* the orb: a soft diagonal gradient, a glow of its own colour around it, the icon in white */}
        <View style={{ width: o, height: o, borderRadius: Math.round(o * 0.32), shadowColor: orb[1], shadowOpacity: 0.7, shadowRadius: 26, shadowOffset: { width: 0, height: 0 } }}>
          <LinearGradient colors={orb} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1, borderRadius: Math.round(o * 0.32), alignItems: 'center', justifyContent: 'center' }}>
            <LinearGradient colors={['rgba(255,255,255,0.45)', 'rgba(255,255,255,0)']} start={{ x: 0.2, y: 0 }} end={{ x: 0.6, y: 0.7 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: Math.round(o * 0.32) }} />
            <Icon name={icon} size={Math.round(o * 0.42)} color="#ffffff" weight="semibold" />
          </LinearGradient>
        </View>
        {lock ? (
          <View style={{ position: 'absolute', top: 10, ...(RTL ? { right: 10 } : { left: 10 }), width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center',
            backgroundColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)', borderWidth: 1, borderColor: dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)' }}>
            <Icon name="lock" size={16} color={c.text} />
          </View>
        ) : null}
      </View>
      <View style={{ alignItems: 'center', gap: 2, paddingHorizontal: 4 }}>
        <T style={{ fontWeight: '700', fontSize: 15, textAlign: 'center' }} numberOfLines={1}>{title}</T>
        <T style={{ color: c.muted, fontSize: 12, lineHeight: 18, textAlign: 'center' }} numberOfLines={2}>{line}</T>
      </View>
    </View>
  );
}

export function ProPromo({ onClose }: { onClose: () => void }) {
  const c = useColors(), dark = useIsDark(), ins = useSafeAreaInsets(), { width, height } = useWindowDimensions();
  const { pay, user, startTrial } = useApp();
  const trialDays = pay?.trial && !user?.promoUsed && !user?.premium?.promo ? pay.trial : 0;
  const [busy, setBusy] = useState(false), [err, setErr] = useState('');
  // (No price in the iPhone app, which sells nothing; Android's Play price may differ, so there too only on the web.)
  const month = Platform.OS === 'web' ? pay?.plans.find(p => p.id === 'month') : undefined;
  // The cards come in: the middle one rising, the side ones fanning out from behind it.
  const [inn] = useState(() => new Animated.Value(0));
  useEffect(() => {
    Animated.timing(inn, { toValue: 1, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: Platform.OS !== 'web' }).start();
  }, [inn]);
  const W = Math.min(width, 480), short = height < 720;
  const mid = Math.round(Math.min(W * 0.48, short ? 150 : 220)), side = Math.round(mid * 0.84), heroH = Math.round(mid * 1.5);
  const fan = (dir: -1 | 1) => ({
    position: 'absolute' as const, top: Math.round(mid * 0.16), opacity: inn.interpolate({ inputRange: [0, 1], outputRange: [0, dark ? 0.55 : 0.7] }),
    transform: [
      { translateX: inn.interpolate({ inputRange: [0, 1], outputRange: [0, dir * mid * 0.5] }) },
      { rotate: inn.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${dir * 10}deg`] }) },
    ],
  });
  const close = () => { tap(); onClose(); };
  const toPremium = () => { tap(); onClose(); router.push('/premium'); };
  // The trial on at once, then into the app; anything in the way (e.g. an email still to confirm) is said under the button.
  const buy = () => {
    if (!trialDays) { toPremium(); return; }
    tap(); setBusy(true); setErr('');
    startTrial().then(onClose, (e: any) => { setErr(e?.message || tr('فعال نشد؛ دوباره امتحان کنید.')); setBusy(false); });
  };
  return (
    <View style={{ flex: 1, backgroundColor: c.bg, paddingTop: ins.top + 8, paddingBottom: Math.max(16, ins.bottom) }}>
      <View style={{ flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center', paddingHorizontal: 20 }}>
        {/* the way back and «رد کردن» */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 48 }}>
          <Pressable onPress={close} accessibilityRole="button" accessibilityLabel={tr('بستن')} hitSlop={8}
            style={({ pressed }) => ({ width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface, opacity: pressed ? 0.7 : 1 })}>
            <Icon name="arrowRight" size={22} color={c.text} />
          </Pressable>
          <Pressable onPress={close} accessibilityRole="button" hitSlop={10} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
            <T style={{ fontSize: 16, fontWeight: '600' }}>رد کردن</T>
          </Pressable>
        </View>
        {/* the three cards */}
        <View style={{ flex: 1, minHeight: heroH, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: mid, height: heroH, alignItems: 'center' }}>
            <Animated.View style={fan(RTL ? 1 : -1)}>
              <FeatureCard w={side} icon="coach" orb={['#ff8a3d', '#e2342b', '#7a1020']} title="مربی هوشمند" line="اشتباه‌هایتان را تحلیل می‌کند" />
            </Animated.View>
            <Animated.View style={fan(RTL ? -1 : 1)}>
              <FeatureCard w={side} icon="learn" orb={['#9cf27a', '#2fb35a', '#0d4a2a']} title="درس‌ها و توضیح‌ها" line="توضیح کامل هر سؤال" />
            </Animated.View>
            <Animated.View style={{ opacity: inn, transform: [{ translateY: inn.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }] }}>
              <FeatureCard w={mid} icon="exam" orb={['#ff7ad9', '#5b3bff', '#1a1aff']} title="آزمون‌های نامحدود" line="مثل آزمون واقعی" lock />
            </Animated.View>
          </View>
        </View>
        {/* the badge, the title and its line */}
        <View style={{ alignItems: 'center', gap: short ? 6 : 10, marginTop: short ? 4 : 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <LinearGradient colors={['#ffd1dc', '#f6e7c8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 99 }}>
              <Icon name="sparkles" size={13} color="#1b1b1b" />
              <T raw style={{ color: '#1b1b1b', fontSize: 13, fontWeight: '800', fontFamily: Platform.OS === 'web' ? 'Inter-700, sans-serif' : 'Inter-700' }}>PRO</T>
            </LinearGradient>
            <T raw style={{ fontSize: 14, fontWeight: '700' }}>Teoripro</T>
          </View>
          <T style={{ fontSize: short ? 28 : 34, lineHeight: short ? 40 : 48, fontWeight: '800', textAlign: 'center' }}>{tr('تمرین بیشتر،') + '\n' + tr('قبولی مطمئن‌تر.')}</T>
          <T style={{ color: c.muted, fontSize: 15, lineHeight: 24, textAlign: 'center' }}>همه‌ی آزمون‌ها، مربی هوشمند و درس‌ها را باز کنید.</T>
        </View>
        {/* the pass, the button and the policy */}
        <View style={{ gap: 14, marginTop: short ? 14 : 24 }}>
          <Pressable onPress={toPremium} accessibilityRole="button" style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 16, paddingHorizontal: 20, borderRadius: 24, backgroundColor: c.surface, borderWidth: 1, borderColor: c.cardBorder, opacity: pressed ? 0.8 : 1 })}>
            <View style={{ flex: 1, gap: 2 }}>
              <T style={{ fontSize: 17, fontWeight: '700' }}>نسخه‌ی ویژه</T>
              <T style={{ color: c.muted, fontSize: 13 }} numberOfLines={1}>دسترسی به همه‌ی امکانات</T>
            </View>
            {month ? (
              <T style={{ fontSize: 18, fontWeight: '700' }}>{t('{0} کرون', faNum(month.price))}<T style={{ color: c.muted, fontSize: 15, fontWeight: '500' }}>{` / ${tr('ماه')}`}</T></T>
            ) : null}
          </Pressable>
          <Pressable onPress={buy} disabled={busy} accessibilityRole="button" style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}>
            <LinearGradient colors={['#f6e7c8', '#dfe3dc', '#bcd3ea']} start={{ x: RTL ? 1 : 0, y: 0 }} end={{ x: RTL ? 0 : 1, y: 0 }}
              style={{ height: 60, borderRadius: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <T style={{ color: '#151515', fontSize: 17, fontWeight: '800' }}>{busy ? tr('در حال فعال کردن…') : trialDays ? t('شروع {0} روز رایگان', faNum(trialDays)) : tr('فعال کردن نسخه‌ی ویژه')}</T>
              <Icon name="chevronLeft" size={18} color="#151515" weight="semibold" />
            </LinearGradient>
          </Pressable>
          {err ? <T style={{ color: c.bad, fontSize: 13, lineHeight: 20, textAlign: 'center' }}>{err}</T> : null}
          <Pressable onPress={() => { tap(); Linking.openURL(`${API_URL}/privacy?lang=${UI_LANG}`).catch(() => {}); }} accessibilityRole="link" style={{ alignSelf: 'center' }}>
            <T style={{ color: c.muted, fontSize: 14 }}>سیاست حفظ حریم خصوصی</T>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
