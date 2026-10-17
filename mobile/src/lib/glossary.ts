// «واژه‌نامه‌ی آزمون» (app/glossary.tsx): the Danish words the theory test and the lessons use most, with their meaning
// in Persian and English and, where it helps, one line on what the test expects. `termsIn` finds the ones a text uses,
// so a course step can show them under it.
export type Term = { da: string; fa: string; en: string; note?: string };

export const GLOSSARY: Term[] = [
  { da: 'vigepligt', fa: 'وظیفه‌ی راه دادن (حق تقدم دادن)', en: 'duty to give way', note: 'کسی که vigepligt دارد باید صبر کند تا دیگری رد شود.' },
  { da: 'ubetinget vigepligt', fa: 'راه دادن مطلق', en: 'unconditional duty to give way', note: 'به همه، از هر دو طرف، راه می‌دهید؛ تابلوی B 11 یا خط دندان‌کوسه.' },
  { da: 'højreregel', fa: 'قاعده‌ی دست راست', en: 'right-hand rule', note: 'در تقاطع بدون علامت، به وسیله‌ای که از راست می‌آید راه بدهید.' },
  { da: 'hajtænder', fa: 'خط‌کشی دندان‌کوسه', en: 'shark teeth (give-way markings)', note: 'مثلث‌های سفید روی جاده؛ یعنی راه دادن مطلق.' },
  { da: 'holde tilbage', fa: 'صبر کردن و راه دادن', en: 'hold back, give way' },
  { da: 'fuldt stop', fa: 'توقف کامل', en: 'full stop', note: 'با تابلوی ایست (B 13) باید کامل بایستید، حتی اگر کسی نیاید.' },
  { da: 'kryds', fa: 'تقاطع', en: 'intersection' },
  { da: 'T-kryds', fa: 'سه‌راهی', en: 'T-junction' },
  { da: 'rundkørsel', fa: 'میدان', en: 'roundabout' },
  { da: 'lyskryds', fa: 'تقاطع چراغ‌دار', en: 'signal-controlled intersection' },
  { da: 'signal', fa: 'چراغ راهنمایی', en: 'traffic signal' },
  { da: 'hovedvej', fa: 'جاده‌ی اصلی', en: 'main road', note: 'تابلوی B 16؛ ترافیک جاده‌های فرعی باید به شما راه بدهد.' },
  { da: 'sidevej', fa: 'جاده‌ی فرعی', en: 'side road' },
  { da: 'motorvej', fa: 'بزرگراه', en: 'motorway' },
  { da: 'motortrafikvej', fa: 'جاده‌ی موتوری', en: 'motor road (expressway)' },
  { da: 'tættere bebygget område', fa: 'منطقه‌ی شهری (داخل شهر)', en: 'built-up area' },
  { da: 'ensrettet', fa: 'یک‌طرفه', en: 'one-way' },
  { da: 'kørebane', fa: 'سواره‌رو', en: 'carriageway' },
  { da: 'vognbane', fa: 'خط عبور', en: 'lane' },
  { da: 'vognbaneskift', fa: 'تغییر خط', en: 'lane change' },
  { da: 'fletning', fa: 'ادغام (یکی شدن دو خط)', en: 'merging', note: 'به نوبت، یکی از این خط و یکی از آن خط (lynlåsprincippet).' },
  { da: 'lynlåsprincippet', fa: 'اصل زیپ (ادغام به نوبت)', en: 'zip merge principle' },
  { da: 'accelerationsbane', fa: 'خط شتاب (ورود به بزرگراه)', en: 'acceleration lane' },
  { da: 'nødspor', fa: 'شانه‌ی اضطراری بزرگراه', en: 'hard shoulder' },
  { da: 'rabat', fa: 'شانه‌ی خاکی جاده', en: 'verge' },
  { da: 'fortov', fa: 'پیاده‌رو', en: 'pavement, sidewalk' },
  { da: 'cykelsti', fa: 'مسیر دوچرخه (جدا از سواره‌رو)', en: 'cycle track' },
  { da: 'cykelbane', fa: 'خط دوچرخه (روی سواره‌رو)', en: 'cycle lane' },
  { da: 'fodgængerovergang', fa: 'گذرگاه عابر پیاده', en: 'pedestrian crossing' },
  { da: 'helle', fa: 'جزیره‌ی وسط خیابان', en: 'traffic island' },
  { da: 'jernbaneoverkørsel', fa: 'تقاطع راه‌آهن', en: 'level crossing' },
  { da: 'kantlinje', fa: 'خط کناره‌ی جاده', en: 'edge line' },
  { da: 'spærrelinje', fa: 'خط ممتد (عبور ممنوع)', en: 'solid line (no crossing)', note: 'از روی خط ممتد نباید رد شد.' },
  { da: 'vognbanelinje', fa: 'خط بریده‌ی جداکننده‌ی خطوط', en: 'lane line' },
  { da: 'afmærkning', fa: 'خط‌کشی جاده', en: 'road markings' },
  { da: 'advarselstavle', fa: 'تابلوی هشدار (A)', en: 'warning sign' },
  { da: 'forbudstavle', fa: 'تابلوی ممنوعیت (C)', en: 'prohibition sign' },
  { da: 'påbudstavle', fa: 'تابلوی الزامی (D)', en: 'mandatory sign' },
  { da: 'oplysningstavle', fa: 'تابلوی اطلاعاتی (E)', en: 'information sign' },
  { da: 'undertavle', fa: 'تابلوی زیرین (توضیح تابلوی بالا)', en: 'additional panel' },
  { da: 'hastighedsgrænse', fa: 'حد سرعت', en: 'speed limit' },
  { da: 'overhaling', fa: 'سبقت', en: 'overtaking' },
  { da: 'standsning', fa: 'توقف کوتاه', en: 'stopping' },
  { da: 'parkering', fa: 'پارک کردن', en: 'parking' },
  { da: 'standsning forbudt', fa: 'توقف ممنوع', en: 'no stopping', note: 'تابلوی C 61.' },
  { da: 'parkering forbudt', fa: 'پارک ممنوع', en: 'no parking', note: 'تابلوی C 62.' },
  { da: 'blind vinkel', fa: 'نقطه‌ی کور', en: 'blind spot', note: 'قبل از گردش به راست، دوچرخه‌سوار در نقطه‌ی کور را بررسی کنید.' },
  { da: 'blinklys', fa: 'راهنما (چراغ راهنما)', en: 'indicator' },
  { da: 'nærlys', fa: 'نور پایین', en: 'dipped headlights' },
  { da: 'fjernlys', fa: 'نور بالا', en: 'main beam' },
  { da: 'positionslys', fa: 'چراغ کوچک (پارک)', en: 'position lights' },
  { da: 'tågelys', fa: 'چراغ مه‌شکن', en: 'fog lights' },
  { da: 'havariblink', fa: 'چراغ خطر (فلاشر)', en: 'hazard warning lights' },
  { da: 'advarselstrekant', fa: 'مثلث خطر', en: 'warning triangle' },
  { da: 'sikkerhedssele', fa: 'کمربند ایمنی', en: 'seat belt' },
  { da: 'autostol', fa: 'صندلی کودک خودرو', en: 'child car seat' },
  { da: 'selepude', fa: 'بالشتک صندلی کودک (بوستر)', en: 'booster cushion' },
  { da: 'airbag', fa: 'کیسه‌ی هوا', en: 'airbag', note: 'صندلی رو به عقب کودک را جلوی کیسه‌ی هوای روشن نگذارید.' },
  { da: 'promille', fa: 'میزان الکل خون (در هزار)', en: 'blood alcohol (per mille)', note: 'حد مجاز ۰٫۵ در هزار.' },
  { da: 'spirituskørsel', fa: 'رانندگی در حالت مستی', en: 'drink-driving' },
  { da: 'reaktionstid', fa: 'زمان واکنش', en: 'reaction time' },
  { da: 'reaktionslængde', fa: 'مسافت واکنش', en: 'reaction distance' },
  { da: 'bremselængde', fa: 'مسافت ترمز', en: 'braking distance', note: 'با دو برابر شدن سرعت، تقریباً چهار برابر می‌شود.' },
  { da: 'standselængde', fa: 'مسافت توقف (واکنش + ترمز)', en: 'stopping distance' },
  { da: 'afstand', fa: 'فاصله', en: 'distance, following gap' },
  { da: 'glat føre', fa: 'جاده‌ی لغزنده', en: 'slippery road' },
  { da: 'akvaplaning', fa: 'سُر خوردن روی آب (آکواپلنینگ)', en: 'aquaplaning' },
  { da: 'mønsterdybde', fa: 'عمق آج لاستیک', en: 'tread depth', note: 'حداقل ۱٫۶ میلی‌متر.' },
  { da: 'dæktryk', fa: 'باد لاستیک', en: 'tyre pressure' },
  { da: 'syn', fa: 'معاینه‌ی فنی خودرو', en: 'vehicle inspection' },
  { da: 'udrykningskøretøj', fa: 'خودروی امدادی', en: 'emergency vehicle', note: 'با آژیر و چراغ آبی؛ راه را برایش باز کنید.' },
  { da: 'knallert', fa: 'موپد', en: 'moped' },
  { da: 'fodgænger', fa: 'عابر پیاده', en: 'pedestrian' },
  { da: 'cyklist', fa: 'دوچرخه‌سوار', en: 'cyclist' },
  { da: 'modkørende', fa: 'ترافیک روبه‌رو', en: 'oncoming traffic' },
  { da: 'bagved', fa: 'پشت سر', en: 'behind' },
  { da: 'førstehjælp', fa: 'کمک‌های اولیه', en: 'first aid' },
  { da: 'færdselsuheld', fa: 'تصادف رانندگی', en: 'road accident' },
  { da: 'klip i kørekortet', fa: 'نمره‌ی منفی گواهینامه', en: 'penalty point on the licence' },
  { da: 'teoriprøve', fa: 'آزمون تئوری', en: 'theory test' },
  { da: 'køreprøve', fa: 'آزمون عملی رانندگی', en: 'driving test' },
  { da: 'Færdselsloven', fa: 'قانون راهنمایی و رانندگی دانمارک', en: 'Danish Road Traffic Act' },
];

const lower = (s: string) => s.toLowerCase();
const SORTED = [...GLOSSARY].sort((a, b) => b.da.length - a.da.length);

// The terms a text uses, by their Danish word or by the start of their Persian meaning (when that is long enough not to
// be a common word, e.g. «دندان‌کوسه» but not «تقاطع»); a longer one first, and a shorter one inside it not again; at
// most `max`.
const faCore = (term: Term) => term.fa.split(' (')[0].replace(/^خط‌کشی /, '');
export function termsIn(text: string, max = 6): Term[] {
  let t = lower(text);
  const out: Term[] = [];
  for (const term of SORTED) {
    const w = lower(term.da), fa = faCore(term);
    const byDa = new RegExp(`(^|[^\\p{L}])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}])`, 'u').test(t);
    const byFa = !byDa && fa.length >= 7 && t.includes(fa);
    if (!byDa && !byFa) continue;
    out.push(term);
    t = t.split(byDa ? w : fa).join(' ');
    if (out.length >= max) break;
  }
  return out;
}

const fold = (s: string) => lower(s).replace(/[‌]/g, ' ').replace(/ي/g, 'ی').replace(/ك/g, 'ک');
export const searchTerms = (q: string) => {
  const w = fold(q.trim());
  if (!w) return GLOSSARY;
  return GLOSSARY.filter(t => fold(`${t.da} ${t.fa} ${t.en}`).includes(w));
};
