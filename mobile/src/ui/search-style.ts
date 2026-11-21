import type { ViewStyle } from 'react-native';

import { mix } from './palette';
import { useColors } from './theme';

// The same borderless Material search pill for entry buttons and editable search fields.
export function useSearchStyle(focused = false): ViewStyle {
  const c = useColors();
  return {
    flexDirection: 'row', alignItems: 'center', gap: 12, height: 56,
    paddingStart: 20, paddingEnd: 12, borderRadius: 999, borderWidth: 0,
    backgroundColor: focused ? mix(c.surface2, c.link, 0.06) : c.surface2,
  };
}
