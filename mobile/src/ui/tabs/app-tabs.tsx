// The tab bar on every platform (web, iOS, Android): a floating capsule above the bottom edge, white in the light
// theme and black in the dark one, see-through with what is under it blurred (expo-blur; Android, where blur is not
// reliable: nearly solid); the tabs' icons alone (no labels); the chosen tab on a capsule in the theme's colour,
// filling its part of the bar to the bar's rounded ends (Mojtaba 2026-10-25, after a picture he sent). The pages keep room for it under their end (Screen).
// On the home page only, a round button of its own beside the bar, at its end (right in English and Danish, left in
// Persian) starts a random 25-question test at once (StartButton; Mojtaba 2026-10-25).
import { router, usePathname } from 'expo-router';
import { TabList, TabSlot, Tabs, TabTrigger, type TabTriggerSlotProps } from 'expo-router/ui';
import { BlurView } from 'expo-blur';
import { forwardRef } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PROVE_BANK } from '@/lib/config';
import { toPremium, useFree } from '@/lib/free';
import { tr } from '@/lib/i18n';
import { FULL, shuffle } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { tap } from '../kit';
import { Icon, type IconName } from '../icon';
import { rgba } from '../palette';
import { useColors, useIsDark } from '../theme';
import { TABS } from './tabs';

const TAB_ICON: Record<string, IconName> = { index: 'house', exam: 'exam', learn: 'learn', settings: 'settings' };
// The bar's height (also the room the pages keep for it, with the gap under it: kit.tsx).
export const TAB_BAR_H = 64;
const PAD = 4; // the room between the bar's edge and the chosen tab's capsule

const TabButton = forwardRef<View, TabTriggerSlotProps & { name: string; label: string }>(({ isFocused, name, label, onPress, ...props }, ref) => {
  const c = useColors(), r = (TAB_BAR_H - 2 - 2 * PAD) / 2; // (inside the bar's edge and padding: its corners follow the bar's)
  return (
    <Pressable ref={ref} {...props} onPress={e => { if (!isFocused) tap(); onPress?.(e); }} style={{ flex: 1, flexDirection: 'row' }}
      accessibilityRole="tab" accessibilityState={{ selected: isFocused }} accessibilityLabel={tr(label)}>
      <View style={[{ alignSelf: 'stretch', flex: 1, borderRadius: r, alignItems: 'center', justifyContent: 'center', backgroundColor: isFocused ? c.accent : 'transparent' },
        Platform.OS === 'web' ? ({ transitionProperty: 'background-color', transitionDuration: '200ms' } as any) : null]}>
        <Icon name={TAB_ICON[name]} size={24} color={isFocused ? c.accentText : c.text} />
      </View>
    </Pressable>
  );
});
TabButton.displayName = 'TabButton';

// The bar's frosted ground, under its contents: what is under it blurred, white in the light theme and black in the
// dark one (Android, where blur is not reliable: nearly solid); `tint` laid over it.
const ANDROID = Platform.OS === 'android';
const FILL = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as const;
function Frost({ dark, tint }: { dark: boolean; tint?: string }) {
  return (<>
    {ANDROID ? null : <BlurView pointerEvents="none" intensity={40} tint={dark ? 'dark' : 'light'} style={FILL} />}
    <View pointerEvents="none" style={[FILL, { backgroundColor: dark ? `rgba(0,0,0,${ANDROID ? 0.92 : 0.6})` : `rgba(255,255,255,${ANDROID ? 0.94 : 0.66})` }]} />
    {tint ? <View pointerEvents="none" style={[FILL, { backgroundColor: tint }]} /> : null}
  </>);
}

// The start button: a random test of FULL questions from the whole bank (the exam tab's card's bank: the app's own on
// the main site, prove.dk's at /app); without free tests left, the premium page, as the card's button.
function StartButton() {
  const c = useColors(), dark = useIsDark();
  const { newBank, bank } = useApp();
  const src = PROVE_BANK ? bank : newBank;
  const { randomLeft } = useFree();
  const start = () => {
    tap();
    if (!randomLeft) { toPremium(); return; }
    if (!src?.questions.length) return;
    session.plan = { mode: PROVE_BANK ? 'random' : 'new', ids: shuffle(src.questions.map(q => q.id)).slice(0, FULL), title: 'آزمون تصادفی' };
    router.push('/run');
  };
  // (frosted as the bar, tinted with the theme's colour, the icon in it; Mojtaba 2026-10-25)
  const d = TAB_BAR_H;
  return (
    <Pressable onPress={start} accessibilityRole="button" accessibilityLabel={tr('شروع آزمون')} hitSlop={4}
      style={({ pressed }) => ({ width: d, height: d, borderRadius: d / 2, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.8 : 1,
        borderWidth: 1, borderColor: rgba(c.accent, dark ? 0.45 : 0.3) })}>
      <Frost dark={dark} tint={rgba(c.accent, dark ? 0.3 : 0.18)} />
      <View>{/* (over the frosted layers) */}<Icon name="play" size={22} color={dark ? c.link : c.accent} /></View>
    </Pressable>
  );
}

// Same structure as Expo's template: TabList asChild → a custom bar whose direct children are the TabTriggers.
const TabShell = forwardRef<View, { children?: React.ReactNode }>(({ children, ...props }, ref) => {
  const ins = useSafeAreaInsets(), dark = useIsDark(), home = usePathname() === '/';
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', bottom: Math.max(16, ins.bottom), left: 0, right: 0, paddingHorizontal: 20, alignItems: 'center' }}>
      <View pointerEvents="box-none" style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%', maxWidth: 440 }}>
        {/* (data-bar: left out when the page under the bar is read, bar-shade.tsx) */}
        <View ref={ref} {...props} {...({ dataSet: { bar: '1' } } as any)} style={{ flex: 1, height: TAB_BAR_H, borderRadius: TAB_BAR_H / 2, overflow: 'hidden',
          borderWidth: 1, borderColor: dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)' }}>
          <Frost dark={dark} />
          <View style={{ flex: 1, flexDirection: 'row', padding: PAD }}>{children}</View>
        </View>
        {home ? <StartButton /> : null}
      </View>
    </View>
  );
});
TabShell.displayName = 'TabShell';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />
      <TabList asChild>
        <TabShell>
          {TABS.map(t => (
            <TabTrigger key={t.name} name={t.name} href={t.href as any} asChild>
              <TabButton name={t.name} label={t.label} />
            </TabTrigger>
          ))}
        </TabShell>
      </TabList>
    </Tabs>
  );
}
