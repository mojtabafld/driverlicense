// «راهنمای استفاده», from the settings: how the app works, part by part (src/lib/guide.ts).
import { HELP } from '@/lib/guide';
import { GuidePage } from '@/ui/guide-page';

export default function Help() {
  return <GuidePage title="راهنمای استفاده" subtitle="هر بخش را باز کنید تا ببینید چطور کار می‌کند." parts={HELP} footer="سؤال یا مشکلی دارید؟ از «گزارش خطا» در تنظیمات برای ما بنویسید." />;
}
