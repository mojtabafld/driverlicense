import { forwardRef } from 'react';
import { Platform, Pressable, View, type PressableProps, type ViewProps } from 'react-native';

import { tr } from '@/lib/i18n';
import { Icon, type IconName } from '../icon';
import { T } from '../kit';
import { TAB_BAR_H, TAB_ITEM_H, TAB_PAD, useTabLook, type TabLayout } from './tab-look';

// `bottomInset`: the phone's home-indicator area, added under the tabs in the bar's colour.
export const NavRail = forwardRef<View, ViewProps & { bottomInset?: number }>(({ children, style, bottomInset = 0, ...props }, ref) => {
  const look = useTabLook();
  return (
    <View ref={ref} {...props} style={[{ height: TAB_BAR_H + bottomInset, paddingBottom: bottomInset, paddingHorizontal: TAB_PAD,
      backgroundColor: look.rail }, style]}>
      {children}
    </View>
  );
});
NavRail.displayName = 'NavRail';

type NavTabProps = PressableProps & { active: boolean; icon: IconName; label: string; layout: TabLayout };
// Material 3's navigation item (Mojtaba 2026-11-07): the icon, on a pill when open (its filled form), the label under it.
export const NavTab = forwardRef<View, NavTabProps>(({ active, icon, label, layout, ...props }, ref) => {
  const look = useTabLook();
  return (
    <Pressable ref={ref} {...props} accessibilityRole="tab" accessibilityState={{ selected: active }} accessibilityLabel={tr(label)} hitSlop={3}
      style={({ pressed }) => [{ flex: 1, height: TAB_ITEM_H, alignItems: 'center', justifyContent: 'center', gap: 3, opacity: pressed ? 0.75 : 1 }]}>
      <View style={[{ width: layout.compact ? 52 : 60, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: active ? look.indicator : 'transparent' },
        Platform.OS === 'web' ? ({ transitionProperty: 'background-color', transitionDuration: '180ms' } as object) : null]}>
        <Icon name={icon} size={layout.compact ? 22 : 24} color={active ? look.onIndicator : look.muted} filled={active} />
      </View>
      <T raw numberOfLines={1} maxFontSizeMultiplier={1.1} style={{ color: active ? look.label : look.muted, fontSize: layout.compact ? 11.5 : 12.5, lineHeight: 16, fontWeight: active ? '600' : '500' }}>{tr(label)}</T>
    </Pressable>
  );
});
NavTab.displayName = 'NavTab';
