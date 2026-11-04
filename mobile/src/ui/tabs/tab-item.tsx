import { forwardRef } from 'react';
import { Platform, Pressable, View, type PressableProps, type ViewProps } from 'react-native';

import { tr } from '@/lib/i18n';
import { Icon, type IconName } from '../icon';
import { T } from '../kit';
import { TAB_BAR_H, TAB_GAP, TAB_ITEM_H, TAB_PAD, useTabLook, type TabLayout } from './tab-look';

export const NavRail = forwardRef<View, ViewProps>(({ children, style, ...props }, ref) => {
  const look = useTabLook();
  return (
    <View ref={ref} {...props} style={[{ height: TAB_BAR_H, borderRadius: TAB_BAR_H / 2, borderWidth: 1, borderColor: look.edge,
      backgroundColor: look.rail, padding: TAB_PAD, flexDirection: 'row', alignItems: 'center', gap: TAB_GAP }, style]}>
      {children}
    </View>
  );
});
NavRail.displayName = 'NavRail';

type NavTabProps = PressableProps & { active: boolean; icon: IconName; label: string; layout: TabLayout };
export const NavTab = forwardRef<View, NavTabProps>(({ active, icon, label, layout, ...props }, ref) => {
  const look = useTabLook();
  const size = active ? TAB_ITEM_H : layout.circle;
  return (
    <Pressable ref={ref} {...props} accessibilityRole="tab" accessibilityState={{ selected: active }} accessibilityLabel={tr(label)} hitSlop={3}
      style={({ pressed }) => [{ width: active ? layout.activeWidth : layout.circle, height: TAB_ITEM_H, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.75 : 1 },
        Platform.OS === 'web' ? ({ transitionProperty: 'width', transitionDuration: '180ms' } as object) : null]}>
      <View style={{ width: active ? '100%' : size, height: size, borderRadius: size / 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: layout.compact ? 6 : 8, paddingHorizontal: active ? (layout.compact ? 8 : 12) : 0, backgroundColor: active ? look.active : look.circle }}>
        <Icon name={icon} size={layout.compact ? 22 : 24} color={active ? look.onActive : look.muted} />
        {active ? <T raw numberOfLines={1} maxFontSizeMultiplier={1.15} style={{ flexShrink: 1, minWidth: 0, color: look.onActive, fontSize: layout.compact ? 13 : 15, lineHeight: 22, fontWeight: '600' }}>{tr(label)}</T> : null}
      </View>
    </Pressable>
  );
});
NavTab.displayName = 'NavTab';
