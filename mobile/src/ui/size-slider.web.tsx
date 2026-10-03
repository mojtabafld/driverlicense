// Number-of-questions slider on the web: the browser's own range input, so it looks like the user's system
// (iOS-style on iPhone, Material on Android), in the site's navy, with the sizes written under it.
import { createElement } from 'react';
import { View } from 'react-native';

import { tap } from './kit';
import { SizeTicks } from './size-ticks';
import { useColors } from './theme';

// `grey`: in the neutral grey of the exam's position (navNum) instead of the accent.
type Props = { value: number; values: number[]; onChange: (v: number) => void; grey?: boolean };
export function SizeSlider({ value, values, onChange, grey }: Props) {
  const c = useColors();
  const tint = grey ? c.navNum : c.accent;
  return (
    <View style={{ gap: 2 }}>
      {createElement('input', {
        type: 'range', min: values[0], max: values[values.length - 1], step: values[1] - values[0], value,
        'aria-label': 'تعداد سؤال‌ها',
        onChange: (e: { target: { value: string } }) => { tap(); onChange(+e.target.value); },
        style: { width: '100%', height: 32, margin: 0, accentColor: tint, cursor: 'pointer' },
      })}
      <SizeTicks value={value} values={values} color={grey ? c.navNum : undefined} />
    </View>
  );
}
