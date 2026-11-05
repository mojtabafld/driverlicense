import { View } from 'react-native';

import { DashboardIcon } from './dashboard-art';

// The icons of the home's test statistics, progress chart and daily tests cards (Mojtaba 2026-11-05: in the style of
// the app's other icons): the same rounded tile with a line icon as the settings rows (dashboard-art DashboardIcon).
export function HomeChartIcon({ kind, size = 36 }: { kind: 'stats' | 'progress' | 'daily'; size?: number }) {
  return <View accessible={false} aria-hidden><DashboardIcon name={kind === 'stats' ? 'chart' : kind === 'progress' ? 'trend' : 'calendarCheck'} size={size} /></View>;
}
