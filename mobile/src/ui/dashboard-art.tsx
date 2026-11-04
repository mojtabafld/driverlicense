import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { Icon, type IconName } from './icon';
import { mix } from './palette';
import { useColors, useIsDark } from './theme';

export function DashboardIcon({ name, size = 38, color }: { name: IconName; size?: number; color?: string }) {
  const c = useColors(), dark = useIsDark(), ink = color ?? c.link;
  return <View style={{ width: size, height: size, borderRadius: size * 0.36, flexShrink: 0, alignItems: 'center', justifyContent: 'center',
    backgroundColor: mix(ink, c.surface, dark ? 0.84 : 0.91) }}>
    <Icon name={name} size={Math.round(size * 0.5)} color={ink} />
  </View>;
}

// Decorative waves stay behind real content and never intercept a tap.
export function DashboardWaves() {
  const c = useColors(), dark = useIsDark(), id = `dashboard-${useId().replace(/:/g, '')}`;
  return <View pointerEvents="none" aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 26, overflow: 'hidden' }}>
    <Svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
      <Defs><LinearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor={c.accent} stopOpacity={dark ? 0.18 : 0.14} />
        <Stop offset="1" stopColor={c.link} stopOpacity={dark ? 0.06 : 0.04} />
      </LinearGradient></Defs>
      <Path d="M0 122C55 108 64 186 130 175C196 164 225 112 286 145C342 178 360 103 400 112V200H0Z" fill={`url(#${id})`} />
      <Path d="M0 158C73 129 90 198 169 185C247 172 269 146 325 165C365 179 385 150 400 146V200H0Z" fill={c.accent} fillOpacity={dark ? 0.09 : 0.07} />
    </Svg>
  </View>;
}
