import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { useIsDark } from './theme';

// Matching pastel tiles for chart headings; independent of text direction.
export function HomeChartIcon({ kind, size = 36 }: { kind: 'stats' | 'progress' | 'daily'; size?: number }) {
  const dark = useIsDark();
  const id = `home-chart-${useId().replace(/:/g, '')}`;
  const daily = kind === 'daily';
  const stats = kind === 'stats';
  const ink = daily ? (dark ? '#f7bf62' : '#d88a00') : stats ? (dark ? '#c4a6ff' : '#6200ee') : (dark ? '#80d8bd' : '#188c70');
  const top = daily ? (dark ? '#49361a' : '#fff0d2') : stats ? (dark ? '#38264f' : '#e8ddff') : (dark ? '#193d34' : '#e1f3ec');
  const bottom = daily ? (dark ? '#302619' : '#fff8ec') : stats ? (dark ? '#291e3c' : '#f4efff') : (dark ? '#152e28' : '#f2faf6');
  return (
    <View accessible={false} aria-hidden style={{ width: size, height: size, flexShrink: 0 }}>
      <Svg width={size} height={size} viewBox="0 0 48 48">
        <Defs>
          <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={top} />
            <Stop offset="1" stopColor={bottom} />
          </LinearGradient>
        </Defs>
        <Rect x="1" y="1" width="46" height="46" rx="14" fill={`url(#${id})`} stroke={ink} strokeOpacity={dark ? 0.28 : 0.18} strokeWidth="1.2" />
        {daily ? <>
          <Rect x="13" y="15" width="22" height="21" rx="4" fill="none" stroke={ink} strokeWidth="2" />
          <Path d="M19 12V18M29 12V18M14 22H34" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
          <Path d="M19 29L22 32L29 26" fill="none" stroke={ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </> : stats ? <>
          <Path d="M18 18V31" stroke={ink} strokeWidth="2" strokeLinecap="round" />
          <Circle cx="18" cy="17" r="3.4" fill={ink} />
          <Circle cx="18" cy="31" r="3.4" fill={ink} />
          <Circle cx="30" cy="17" r="1.8" fill={ink} />
          <Circle cx="30" cy="23" r="1.8" fill={ink} />
          <Circle cx="30" cy="31" r="3.4" fill={ink} />
        </> : <>
          <Path d="M14 15V34H35" fill="none" stroke={ink} strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M18 28L24 22L29 25L35 16M29 16H35V22" fill="none" stroke={ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </>}
      </Svg>
    </View>
  );
}
