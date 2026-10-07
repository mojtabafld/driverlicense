// «قوانین»: the traffic rules most asked about in the theory test (src/lib/guide.ts). ?open=<index> opens that part
// (from «جستجو با هوش مصنوعی»).
import { useLocalSearchParams } from 'expo-router';

import { RULES } from '@/lib/guide';
import { GuidePage } from '@/ui/guide-page';

export default function Rules() {
  const p = useLocalSearchParams<{ open?: string }>();
  const open = p.open !== undefined && Number.isInteger(+p.open) ? Math.min(Math.max(0, +p.open), RULES.length - 1) : 0;
  return <GuidePage title="قوانین" subtitle="مهم‌ترین قوانین رانندگی در دانمارک به زبان ساده؛ روی هر بخش بزنید تا باز شود." parts={RULES} initialOpen={open} />;
}
