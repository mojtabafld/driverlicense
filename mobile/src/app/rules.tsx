// «قوانین»: the traffic rules most asked about in the theory test (src/lib/guide.ts).
import { RULES } from '@/lib/guide';
import { GuidePage } from '@/ui/guide-page';

export default function Rules() {
  return <GuidePage title="قوانین" subtitle="مهم‌ترین قوانین رانندگی در دانمارک به زبان ساده؛ روی هر بخش بزنید تا باز شود." parts={RULES} />;
}
