// «علائم رانندگی»: the groups of road signs, the markings and the traffic lights (src/lib/guide.ts).
import { SIGNS } from '@/lib/guide';
import { GuidePage } from '@/ui/guide-page';

export default function Signs() {
  return <GuidePage title="علائم رانندگی" subtitle="شکل و رنگ هر گروه از تابلوها، خط‌کشی‌ها و چراغ راهنمایی و معنای آن‌ها." parts={SIGNS} />;
}
