// The sizes written under the number-of-questions slider, the chosen one in navy.
import { View } from 'react-native';

import { faNum } from '@/lib/logic';
import { T } from './kit';
import { useColors } from './theme';

export function SizeTicks({ value, values }: { value: number; values: number[] }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 }}>
      {values.map(n => (
        <T key={n} style={{ width: 26, textAlign: 'center', fontSize: 12.5, fontWeight: n === value ? '800' : '500', color: n === value ? c.link : c.muted }}>{faNum(n)}</T>
      ))}
    </View>
  );
}
