// «آموزش گام‌به‌گام»: the app's own course, written from the official, public sources (not from any other theory app):
// - Færdselsloven (the Danish Road Traffic Act, retsinformation.dk),
// - Bekendtgørelse om vejafmærkning (the rules for road signs and markings, retsinformation.dk),
// - Færdselsstyrelsen's Undervisningsplan for kategori B (the official curriculum for the car licence, fstyr.dk).
// The chapters follow the curriculum's order; each lesson is a few short steps (what you will learn → one idea per
// step with its picture and the rule to remember → check yourself → summary with the sources), and the progress is
// kept with the account (/api/courseprogress). Pictures are made for the course (data/course-art.json → /course-art).
// Chapters without lessons yet are shown as «به‌زودی».

export type Statement = { t: string; ok: boolean };
export type CourseStep =
  | { kind: 'intro'; title: string; text: string; goals: string[] }
  | { kind: 'teach'; title: string; text: string; art?: string; rule?: string; law?: string; points?: string[] }
  | { kind: 'check'; q: string; statements: Statement[]; why: string; art?: string }
  | { kind: 'summary'; points: string[]; sources: string[] };
export type CourseLesson = { id: string; title: string; minutes: number; steps: CourseStep[] };
export type CourseChapter = { id: string; n: number; title: string; sub: string; lessons: CourseLesson[]; planned: string[] };

export const SOURCES = {
  law: 'Færdselsloven (قانون راهنمایی و رانندگی دانمارک)، retsinformation.dk',
  signs: 'Bekendtgørelse om vejafmærkning (مقررات تابلوها و خط‌کشی‌ها)، retsinformation.dk',
  plan: 'Undervisningsplan for kategori B (برنامه‌ی رسمی آموزش گواهینامه‌ی B)، Færdselsstyrelsen، fstyr.dk',
};

const RIGHT_RULE: CourseLesson = {
  id: 'right-rule',
  title: 'قاعده‌ی دست راست',
  minutes: 6,
  steps: [
    {
      kind: 'intro',
      title: 'قاعده‌ی دست راست (højreregel)',
      text: 'در دانمارک وقتی هیچ علامتی نمی‌گوید چه کسی اول برود، قاعده‌ی دست راست تعیین می‌کند. این قاعده در آزمون تئوری بسیار پرسیده می‌شود.',
      goals: [
        'بدانید قاعده‌ی دست راست کجا و برای چه کسانی اعمال می‌شود.',
        'بدانید چه چیزهایی جای این قاعده را می‌گیرند.',
        'بدانید وقتی از پارکینگ یا ملک وارد خیابان می‌شوید چه باید بکنید.',
      ],
    },
    {
      kind: 'teach',
      title: 'قاعده: به سمت راست راه بدهید',
      art: 'right-rule',
      text: 'در تقاطعی که هیچ تابلوی حق تقدم، خط‌کشی حق تقدم (دندان‌کوسه)، چراغ راهنمایی یا پلیس ندارد، باید به هر وسیله‌ای که از سمت راست شما می‌آید حق تقدم بدهید. در تصویر، خودروی قرمز باید صبر کند تا خودروی آبی که از راست او می‌آید رد شود.',
      rule: 'در تقاطع بدون علامت، به هر وسیله‌ی نقلیه‌ای که از راست می‌آید راه بدهید.',
      law: 'Færdselsloven § 26، بند ۴',
    },
    {
      kind: 'teach',
      title: 'چه کسانی را شامل می‌شود؟',
      text: 'قاعده‌ی دست راست برای همه‌ی وسیله‌های نقلیه‌ای است که از راست می‌آیند، نه فقط خودروها.',
      points: [
        'خودرو، کامیون و اتوبوس',
        'موتورسیکلت و موپد',
        'دوچرخه‌سوار؛ دوچرخه هم وسیله‌ی نقلیه است',
        'در سه‌راهی هم اعمال می‌شود؛ پهن‌تر بودن جاده‌ی شما مهم نیست',
      ],
      rule: 'پهنای جاده مهم نیست؛ تا وقتی علامتی نیست، سمت راست اول می‌رود (به‌جز کسی که از مسیر خاکی، پارکینگ یا ملک وارد می‌شود؛ دو قدم بعد).',
      law: 'Færdselsloven § 26، بند ۴',
    },
    {
      kind: 'teach',
      title: 'چه چیزهایی جای این قاعده را می‌گیرند؟',
      text: 'قاعده‌ی دست راست فقط وقتی معتبر است که چیز دیگری تعیین تکلیف نکرده باشد. این‌ها به ترتیب مقدم‌اند:',
      points: [
        'دستور پلیس، بر همه چیز مقدم است',
        'چراغ راهنمایی',
        'تابلوی «حق تقدم بدهید» (B 11) یا خط دندان‌کوسه (S 11): باید به همه، از چپ و راست، راه بدهید',
        'تابلوی ایست (B 13): کامل بایستید و به همه راه بدهید',
        'تابلوی جاده‌ی اصلی (B 16): در جاده‌ی اصلی، ترافیکِ جاده‌های فرعی باید به شما راه بدهد',
      ],
      rule: 'اول پلیس، بعد چراغ، بعد تابلو و خط‌کشی؛ اگر هیچ‌کدام نبود، قاعده‌ی دست راست.',
      law: 'Færdselsloven § 26، بند ۲ · B 11 · B 13 · B 16 · S 11',
    },
    {
      kind: 'teach',
      title: 'خروج از پارکینگ، ملک یا مسیر فرعی',
      art: 'exit-property',
      text: 'وقتی از پارکینگ، پمپ بنزین، ملک، مسیر دوچرخه، پیاده‌رو یا جاده‌ی خاکی وارد خیابان می‌شوید، قاعده‌ی دست راست به کار شما نمی‌آید. در این حالت راه دادن مطلق دارید و باید به همه راه بدهید: اول به عابر پیاده‌رو، بعد به دوچرخه‌سوار و بعد به خودروهای خیابان، از هر طرف که بیایند.',
      rule: 'از پارکینگ یا ملک که بیرون می‌آیید، به همه راه بدهید.',
      law: 'Færdselsloven § 26، بند ۳ · § 27، بند ۲',
    },
    {
      kind: 'check',
      q: 'در تقاطعی بدون هیچ علامتی، دوچرخه‌سواری از سمت راست شما به تقاطع می‌رسد. چه می‌کنید؟',
      statements: [
        { t: 'به دوچرخه‌سوار حق تقدم می‌دهم.', ok: true },
        { t: 'چون با خودرو هستم، اول من می‌روم.', ok: false },
      ],
      why: 'قاعده‌ی دست راست برای همه‌ی وسیله‌های نقلیه است و دوچرخه هم وسیله‌ی نقلیه است.',
    },
    {
      kind: 'check',
      q: 'از پارکینگ یک فروشگاه وارد خیابان می‌شوید. خودرویی از سمت چپ شما در خیابان می‌آید. چه می‌کنید؟',
      statements: [
        { t: 'به خودرو راه می‌دهم، چون از پارکینگ بیرون می‌آیم.', ok: true },
        { t: 'اول من می‌روم، چون آن خودرو از چپ من می‌آید.', ok: false },
      ],
      why: 'هنگام خروج از پارکینگ یا ملک، راه دادن مطلق دارید و قاعده‌ی دست راست به کار شما نمی‌آید.',
    },
    {
      kind: 'check',
      q: 'سر تقاطع، تابلوی مثلثی وارونه (B 11) و خط دندان‌کوسه دارید. به چه کسانی راه می‌دهید؟',
      statements: [
        { t: 'به همه‌ی ترافیک جاده‌ای که واردش می‌شوم، از چپ و راست.', ok: true },
        { t: 'فقط به خودروهایی که از سمت راست می‌آیند.', ok: false },
      ],
      why: 'تابلوی B 11 و دندان‌کوسه جای قاعده‌ی دست راست را می‌گیرند و یعنی راه دادن مطلق به همه.',
    },
    {
      kind: 'summary',
      points: [
        'در تقاطع بدون علامت، به هر وسیله‌ای که از راست می‌آید، از جمله دوچرخه، راه بدهید.',
        'پلیس، چراغ، تابلو و خط‌کشی بر قاعده‌ی دست راست مقدم‌اند.',
        'تابلوی B 11 و دندان‌کوسه یعنی راه دادن به همه، از چپ و راست.',
        'هنگام خروج از پارکینگ، ملک یا مسیر فرعی، به همه راه بدهید.',
      ],
      sources: [SOURCES.law, SOURCES.signs, SOURCES.plan],
    },
  ],
};

// The chapters, in the curriculum's order; `planned`: the lessons still to be written.
export const COURSE: CourseChapter[] = [
  { id: 'ready', n: 1, title: 'آماده شدن برای رانندگی', sub: 'خودرو و تجهیزاتش، راننده: خستگی، الکل و دارو', lessons: [],
    planned: ['تجهیزات و بازدید خودرو', 'کمربند و صندلی کودک', 'الکل، دارو و خستگی'] },
  { id: 'road', n: 2, title: 'جایگاه در جاده و سرعت', sub: 'جای خودرو در خیابان، سرعت مجاز، فاصله و مسافت توقف', lessons: [],
    planned: ['جایگاه در مسیر', 'سرعت مجاز و تنظیم سرعت', 'فاصله و مسافت توقف'] },
  { id: 'priority', n: 3, title: 'حق تقدم', sub: 'قاعده‌ی دست راست، راه دادن مطلق، تقاطع‌ها و میدان', lessons: [RIGHT_RULE],
    planned: ['گردش به چپ و راست', 'تقاطع‌های چراغ‌دار', 'میدان'] },
  { id: 'signs', n: 4, title: 'تابلوها، خط‌کشی‌ها و چراغ‌ها', sub: 'گروه‌های تابلو، خط‌کشی‌های جاده و چراغ راهنمایی', lessons: [],
    planned: ['تابلوهای هشدار و حق تقدم', 'تابلوهای ممنوعیت و الزامی', 'خط‌کشی‌ها', 'چراغ راهنمایی'] },
  { id: 'manoeuvres', n: 5, title: 'مانورها', sub: 'سبقت، تغییر خط، گردش، توقف و پارک', lessons: [],
    planned: ['سبقت گرفتن', 'تغییر خط و ادغام', 'توقف و پارک'] },
  { id: 'people', n: 6, title: 'عابران، دوچرخه‌ها و کاربران آسیب‌پذیر', sub: 'گذرگاه عابر، مسیر دوچرخه، کودکان و سالمندان', lessons: [],
    planned: ['گذرگاه عابر پیاده', 'دوچرخه و موپد', 'کودکان، سالمندان و حیوانات'] },
  { id: 'special', n: 7, title: 'جاده‌های ویژه و شرایط سخت', sub: 'بزرگراه، رانندگی در شب و هوای بد', lessons: [],
    planned: ['بزرگراه', 'رانندگی در تاریکی', 'باران، برف و یخ'] },
  { id: 'incidents', n: 8, title: 'موقعیت‌های خاص', sub: 'خودروهای امدادی، تصادف و خرابی خودرو', lessons: [],
    planned: ['خودروهای امدادی', 'تصادف و کمک‌های اولیه', 'خرابی خودرو در جاده'] },
];

export const lessonById = (id: string) => {
  for (const ch of COURSE) { const l = ch.lessons.find(x => x.id === id); if (l) return { chapter: ch, lesson: l }; }
  return null;
};
export const lessonCount = () => COURSE.reduce((n, ch) => n + ch.lessons.length + ch.planned.length, 0);
export const readyCount = () => COURSE.reduce((n, ch) => n + ch.lessons.length, 0);
