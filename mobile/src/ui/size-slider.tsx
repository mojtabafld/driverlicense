// Number-of-questions slider on iOS / Android: the system's own slider (UISlider, Material slider) in the site's navy,
// stepping through the allowed sizes, with the sizes written under it.
import Slider from '@react-native-community/slider';
import { View } from 'react-native';

import { tap } from './kit';
import { SizeTicks } from './size-ticks';
import { useColors } from './theme';

type Props = { value: number; values: number[]; onChange: (v: number) => void };
export function SizeSlider({ value, values, onChange }: Props) {
  const c = useColors();
  const step = values[1] - values[0];
  return (
    <View style={{ gap: 2 }}>
      <Slider value={value} minimumValue={values[0]} maximumValue={values[values.length - 1]} step={step}
        onValueChange={v => { if (v !== value) { tap(); onChange(v); } }}
        minimumTrackTintColor={c.accent} maximumTrackTintColor={c.line} thumbTintColor={c.accent}
        accessibilityLabel="تعداد سؤال‌ها" style={{ height: 40 }} />
      <SizeTicks value={value} values={values} />
    </View>
  );
}
