// The tab bar on every platform (web, iOS, Android), drawn the same way: a floating capsule of grey glass above the
// bottom edge, each tab an icon over its label in white; the chosen tab sits on a darker grey capsule, its icon (filled)
// and label in the app's green. The glass blurs what lies under it where the platform can (iOS's own glass, the web's
// backdrop blur); on Android it is a nearly solid grey. The pages keep room for it under their end (Screen).
// Rose (theme.ts): a pill of frosted glass holding one round glass button per tab, close together, icons only; the
// chosen one filled (near-black with a white icon; in the dark theme light with a dark icon) and a little raised, as the
// reference's menu. Each keeps its name for screen readers and as a tooltip with a mouse.
import { TabList, TabSlot, Tabs, TabTrigger, type TabTriggerSlotProps } from 'expo-router/ui';
import { forwardRef } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { ROSE, useColors, useIsDark } from '../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { T, tap } from '../kit';
import { Icon, type IconName } from '../icon';
import { LiquidGlass } from '../liquid';
import { barSurface, useBarLook, useBarShade } from '../glass-bar';
import { BarLight } from '../bar-shade';
import { TABS } from './tabs';

const TAB_ICON: Record<string, IconName> = { index: 'house', exam: 'exam', learn: 'learn', settings: 'settings' };
// The bar's height (also the room the pages keep for it, with the gap under it: kit.tsx).
export const TAB_BAR_H = 64;

// The round buttons' size and the pill's padding around them (together the bar's height).
const DOT = 54, DOT_PAD = (TAB_BAR_H - DOT) / 2;
const RoseTab = forwardRef<View, TabTriggerSlotProps & { name: string; label: string }>(({ isFocused, name, label, onPress, ...props }, ref) => {
  const c = useColors(), dark = useIsDark();
  const on = isFocused, fg = on ? (dark ? '#1a1416' : '#ffffff') : c.text;
  return (
    <Pressable ref={ref} {...props} onPress={e => { if (!isFocused) tap(); onPress?.(e); }}
      accessibilityRole="tab" accessibilityState={{ selected: on }} accessibilityLabel={label} {...(Platform.OS === 'web' ? { title: label } as any : {})}>
      {({ pressed }: { pressed: boolean }) => (
        <View style={[{ width: DOT, height: DOT, borderRadius: DOT / 2, alignItems: 'center', justifyContent: 'center', borderWidth: 1,
          transform: [{ scale: pressed ? 0.94 : 1 }] },
          on ? { backgroundColor: dark ? '#f6eef0' : '#1f1719', borderColor: dark ? '#ffffff' : '#1f1719' }
            : { backgroundColor: dark ? (pressed ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)') : pressed ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.7)',
                borderColor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.95)' },
          Platform.OS === 'web' ? ({
            transitionProperty: 'background-color, border-color, box-shadow, transform', transitionDuration: '220ms',
            boxShadow: on ? (dark ? '0 6px 16px -6px rgba(0,0,0,0.6)' : '0 8px 18px -8px rgba(31,23,25,0.6)')
              : dark ? 'inset 0 1px 0 rgba(255,255,255,0.05)' : 'inset 0 1px 0 #fff, 0 3px 10px -6px rgba(110,40,48,0.35)',
          } as any) : on ? { shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 } : null]}>
          <Icon name={TAB_ICON[name]} size={23} color={fg} />
        </View>
      )}
    </Pressable>
  );
});
RoseTab.displayName = 'RoseTab';

// Rose's pill under the round buttons.
function RoseShell({ children }: { children?: React.ReactNode }) {
  const dark = useIsDark();
  return (
    <View style={[{ flexDirection: 'row', gap: 6, padding: DOT_PAD, borderRadius: TAB_BAR_H / 2, borderWidth: 1,
      backgroundColor: dark ? (Platform.OS === 'android' ? 'rgba(40,32,35,0.96)' : 'rgba(40,32,35,0.62)') : Platform.OS === 'android' ? 'rgba(236,232,233,0.97)' : 'rgba(255,255,255,0.38)',
      borderColor: dark ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.85)' },
      Platform.OS === 'web' ? ({ backdropFilter: 'blur(24px) saturate(160%)', WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        boxShadow: dark ? '0 14px 34px -12px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.06)' : '0 16px 36px -14px rgba(110,40,48,0.4), inset 0 1px 0 rgba(255,255,255,0.9)' } as any)
        : { shadowColor: '#000', shadowOpacity: dark ? 0.4 : 0.14, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 8 }]}>
      {children}
    </View>
  );
}

const TabButton = forwardRef<View, TabTriggerSlotProps & { name: string; label: string }>((p, ref) => (ROSE ? <RoseTab ref={ref} {...p} /> : <PlainTab ref={ref} {...p} />));
TabButton.displayName = 'TabButton';
const PlainTab = forwardRef<View, TabTriggerSlotProps & { name: string; label: string }>(({ isFocused, name, label, onPress, ...props }, ref) => {
  const look = useBarLook();
  const color = isFocused ? look.green : look.fg;
  return (
    <Pressable ref={ref} {...props} onPress={e => { if (!isFocused) tap(); onPress?.(e); }} style={{ flex: 1 }}
      accessibilityRole="tab" accessibilityState={{ selected: isFocused }} accessibilityLabel={label}>
      {/* The chosen tab's capsule is a layer of its own under the icon, with its own round corners, and the tab's box
          clips to the same shape (on Android a rounded background on the box itself could show square). */}
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2, height: TAB_BAR_H - 8, borderRadius: (TAB_BAR_H - 8) / 2, overflow: 'hidden' }}>
        <View pointerEvents="none" style={[{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderRadius: (TAB_BAR_H - 8) / 2,
          backgroundColor: isFocused ? look.capsule : 'transparent' },
          Platform.OS === 'web' ? ({ transitionProperty: 'background-color', transitionDuration: '200ms' } as any) : null]} />
        <Icon name={TAB_ICON[name]} size={24} color={color} filled={isFocused} contrast={look.contrast} />
        <T style={{ fontSize: 11, lineHeight: 15, textAlign: 'center', fontWeight: '600', color }}>{label}</T>
      </View>
    </Pressable>
  );
});
PlainTab.displayName = 'PlainTab';

// Same structure as Expo's template: TabList asChild → a custom bar whose direct children are the TabTriggers.
// The bar's shade (light, or grey over something dark: glass-bar.tsx) goes to the tabs through BarLight.
const GlassTabBar = forwardRef<View, { children?: React.ReactNode }>((props, ref) => {
  const light = useBarShade();
  return <BarLight.Provider value={light}><TabShell ref={ref} {...props} /></BarLight.Provider>;
});
GlassTabBar.displayName = 'GlassTabBar';
const TabShell = forwardRef<View, { children?: React.ReactNode }>(({ children, ...props }, ref) => {
  const ins = useSafeAreaInsets(), look = useBarLook(), grey = look.grey;
  if (ROSE) return (
    <View ref={ref} {...props} pointerEvents="box-none" style={{ position: 'absolute', bottom: Math.max(16, ins.bottom), left: 0, right: 0, alignItems: 'center' }}>
      <RoseShell>{children}</RoseShell>
    </View>
  );
  return (
    <View ref={ref} {...props} pointerEvents="box-none" style={{ position: 'absolute', bottom: Math.max(16, ins.bottom), left: 0, right: 0, paddingHorizontal: 20, alignItems: 'center' }}>
      {Platform.OS === 'ios' ? (
        <LiquidGlass r={TAB_BAR_H / 2} tint={grey} style={{ flexDirection: 'row', width: '100%', maxWidth: 440, padding: 4 }}>{children}</LiquidGlass>
      ) : (
        <View style={[{ flexDirection: 'row', width: '100%', maxWidth: 440, padding: 4 }, ...barSurface(look)]}>{children}</View>
      )}
    </View>
  );
});
TabShell.displayName = 'TabShell';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />
      <TabList asChild>
        <GlassTabBar>
          {TABS.map(t => (
            <TabTrigger key={t.name} name={t.name} href={t.href as any} asChild>
              <TabButton name={t.name} label={t.label} />
            </TabTrigger>
          ))}
        </GlassTabBar>
      </TabList>
    </Tabs>
  );
}
