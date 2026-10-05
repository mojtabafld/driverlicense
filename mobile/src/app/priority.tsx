// «آموزش حق تقدم»: who goes first, at crossroads, roundabouts and elsewhere (src/lib/guide.ts).
import { PRIORITY } from '@/lib/guide';
import { GuidePage } from '@/ui/guide-page';

export default function Priority() {
  return <GuidePage title="آموزش حق تقدم" subtitle="چه کسی اول می‌رود؟ قاعده‌ی دست راست، تقاطع، میدان، عابران و موارد ویژه." parts={PRIORITY} />;
}
