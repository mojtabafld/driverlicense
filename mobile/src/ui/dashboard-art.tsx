import { View } from 'react-native';

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
