// The place of a question's picture that is not made yet (a question of «آزمون جدید» before the admin orders its
// picture from the image model), in the picture's own size, like the course's (ui/course-parts.tsx Art).
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { Icon } from './icon';
import { T } from './kit';
import { useColors } from './theme';

export function PicPending({ style }: { style?: StyleProp<ViewStyle> }) {
  const c = useColors();
  return (
    <View style={[{ width: '100%', aspectRatio: 4 / 3, alignItems: 'center', justifyContent: 'center', gap: 6, padding: 16, backgroundColor: c.surface2 }, style]}>
      <Icon name="exam" size={34} color={c.faint} />
      <T style={{ color: c.faint, fontSize: 12.5, textAlign: 'center' }}>تصویر این موقعیت هنوز ساخته نشده است</T>
    </View>
  );
}
