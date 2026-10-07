// «آموزش گام‌به‌گام»: the app's own course, aimed at one thing: passing the Danish theory test (category B). Written
// from the official, public sources (not from any other theory app):
// - Færdselsloven (the Danish Road Traffic Act, retsinformation.dk),
// - Bekendtgørelse om vejafmærkning (the rules for road signs and markings, retsinformation.dk),
// - Færdselsstyrelsen's Undervisningsplan for kategori B (the official curriculum for the car licence, fstyr.dk).
// The chapters follow the curriculum. Each lesson prepares for the exam: what the exam asks about the topic → one rule
// per step with its picture, the law and the exam's trap → a short test in the exam's own format (a situation in a
// picture, the question in Danish with its translation, «Ja / Nej» for each statement, every wrong answer one mistake)
// → its result against the real test's limit → summary with the sources. Progress is kept with the account
// (/api/courseprogress). Pictures are made for the course (data/course-art.json → /course-art); one not ordered yet
// shows a placeholder. Chapters without lessons yet are shown as «به‌زودی».

// The real test, as the app's exam simulates it.
export const EXAM = { questions: 25, maxMistakes: 5 };

export type ExamStatement = { da: string; fa: string; ok: boolean; why: string };
export type CourseStep =
  | { kind: 'intro'; title: string; text: string; goals: string[]; exam: string[] }
  | { kind: 'teach'; title: string; text: string; art?: string; rule?: string; law?: string; points?: string[]; trap?: string }
  // One question of the lesson's test, in the exam's format.
  | { kind: 'exam'; art?: string; da: string; fa: string; statements: ExamStatement[] }
  // The test's result: the mistakes of its questions (each wrong statement one, as in the real test) against `max`.
  | { kind: 'result'; max: number }
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
  minutes: 8,
  steps: [
    {
      kind: 'intro',
      title: 'قاعده‌ی دست راست (højreregel)',
      text: 'در آزمون تئوری تقریباً همیشه چند سؤال درباره‌ی این است که در تقاطع چه کسی اول می‌رود. این درس شما را برای همین سؤال‌ها آماده می‌کند.',
      goals: [
        'تشخیص دهید کِی قاعده‌ی دست راست اعمال می‌شود و کِی نه.',
        'بدانید دوچرخه و موپد هم شامل این قاعده‌اند.',
        'فخ‌های رایج آزمون در این مبحث را بشناسید.',
      ],
      exam: [
        'تصویری از تقاطع می‌بینید، مثلاً با دوچرخه یا خودرویی که از راست می‌آید، و باید بگویید چه کسی اول می‌رود.',
        'گزینه‌هایی مثل «من اول می‌روم چون جاده‌ی من پهن‌تر است» یا «دوچرخه باید صبر کند» که غلط‌اند.',
        'خروج از پارکینگ یا ملک، که قاعده‌ی دست راست در آن اعمال نمی‌شود.',
      ],
    },
    {
      kind: 'teach',
      title: 'قاعده: به سمت راست راه بدهید',
      art: 'right-rule',
      text: 'در تقاطعی که هیچ تابلوی حق تقدم، خط‌کشی حق تقدم (دندان‌کوسه)، چراغ راهنمایی یا پلیس ندارد، باید به هر وسیله‌ای که از سمت راست شما می‌آید حق تقدم بدهید. در تصویر، خودروی قرمز باید صبر کند تا خودروی آبی که از راست او می‌آید رد شود.',
      rule: 'در تقاطع بدون علامت، به هر وسیله‌ی نقلیه‌ای که از راست می‌آید راه بدهید.',
      law: 'Færdselsloven § 26، بند ۴',
      trap: 'در تصویر آزمون اول دنبال تابلو، دندان‌کوسه و چراغ بگردید. اگر هیچ‌کدام نبود، قاعده‌ی دست راست جواب است.',
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
      trap: 'گزینه‌ای که می‌گوید دوچرخه‌سوار باید به خودرو راه بدهد، در تقاطع بدون علامت غلط است.',
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
      trap: 'وقتی دندان‌کوسه جلوی شماست، گزینه‌ی «فقط به سمت راست راه می‌دهم» غلط است؛ باید به همه راه بدهید.',
    },
    {
      kind: 'teach',
      title: 'خروج از پارکینگ، ملک یا مسیر فرعی',
      art: 'exit-property',
      text: 'وقتی از پارکینگ، پمپ بنزین، ملک، مسیر دوچرخه، پیاده‌رو یا جاده‌ی خاکی وارد خیابان می‌شوید، قاعده‌ی دست راست به کار شما نمی‌آید. در این حالت راه دادن مطلق دارید و باید به همه راه بدهید: اول به عابر پیاده‌رو، بعد به دوچرخه‌سوار و بعد به خودروهای خیابان، از هر طرف که بیایند.',
      rule: 'از پارکینگ یا ملک که بیرون می‌آیید، به همه راه بدهید.',
      law: 'Færdselsloven § 26، بند ۳ · § 27، بند ۲',
      trap: 'در آزمون، خودرویی که از چپ می‌آید شما را وسوسه می‌کند قاعده‌ی دست راست را به کار ببرید؛ ولی از پارکینگ که بیرون می‌آیید، باید به او هم راه بدهید.',
    },
    {
      kind: 'exam',
      art: 'exam-cyclist',
      da: 'Du kører ind i et vejkryds, hvor der ikke er nogen færdselstavler eller afmærkning. En cyklist kommer fra højre. Hvordan forholder du dig?',
      fa: 'وارد تقاطعی می‌شوید که هیچ تابلو یا خط‌کشی ندارد. دوچرخه‌سواری از سمت راست می‌آید. چه می‌کنید؟',
      statements: [
        { da: 'Jeg holder tilbage for cyklisten.', fa: 'به دوچرخه‌سوار راه می‌دهم.', ok: true, why: 'قاعده‌ی دست راست برای دوچرخه هم هست.' },
        { da: 'Jeg kører først, fordi jeg kører i bil.', fa: 'اول می‌روم، چون با خودرو هستم.', ok: false, why: 'نوع وسیله مهم نیست؛ سمت راست اول می‌رود.' },
      ],
    },
    {
      kind: 'exam',
      art: 'exam-parking',
      da: 'Du vil køre ud fra en parkeringsplads til vejen. En bil kommer fra venstre. Hvordan forholder du dig?',
      fa: 'می‌خواهید از پارکینگ وارد خیابان شوید. خودرویی از سمت چپ می‌آید. چه می‌کنید؟',
      statements: [
        { da: 'Jeg holder tilbage for bilen.', fa: 'به خودرو راه می‌دهم.', ok: true, why: 'از پارکینگ که بیرون می‌آیید، راه دادن مطلق دارید.' },
        { da: 'Bilen skal holde tilbage for mig, fordi den kommer fra venstre.', fa: 'خودرو باید به من راه بدهد، چون از چپ می‌آید.', ok: false, why: 'قاعده‌ی دست راست برای کسی که از پارکینگ بیرون می‌آید اعمال نمی‌شود.' },
        { da: 'Jeg holder også tilbage for fodgængere på fortovet.', fa: 'به عابران پیاده‌رو هم راه می‌دهم.', ok: true, why: 'هنگام گذشتن از پیاده‌رو باید به عابران راه بدهید.' },
      ],
    },
    {
      kind: 'exam',
      art: 'exam-shark',
      da: 'Der er hajtænder på kørebanen foran dig, og du vil køre ligeud gennem krydset. Hvordan forholder du dig?',
      fa: 'جلوی شما خط دندان‌کوسه روی جاده است و می‌خواهید مستقیم از تقاطع رد شوید. چه می‌کنید؟',
      statements: [
        { da: 'Jeg holder tilbage for trafikken fra både højre og venstre.', fa: 'به ترافیک هم از راست و هم از چپ راه می‌دهم.', ok: true, why: 'دندان‌کوسه یعنی راه دادن مطلق به همه.' },
        { da: 'Jeg holder kun tilbage for trafikken fra højre.', fa: 'فقط به ترافیک سمت راست راه می‌دهم.', ok: false, why: 'دندان‌کوسه جای قاعده‌ی دست راست را می‌گیرد.' },
      ],
    },
    // The test has 7 statements; one mistake is allowed.
    { kind: 'result', max: 1 },
    {
      kind: 'summary',
      points: [
        'در تقاطع بدون علامت، به هر وسیله‌ای که از راست می‌آید، از جمله دوچرخه، راه بدهید.',
        'پلیس، چراغ، تابلو و خط‌کشی بر قاعده‌ی دست راست مقدم‌اند.',
        'تابلوی B 11 و دندان‌کوسه یعنی راه دادن به همه، از چپ و راست.',
        'هنگام خروج از پارکینگ، ملک یا مسیر فرعی، به همه راه بدهید.',
        'در آزمون اول دنبال پلیس، چراغ، تابلو و خط‌کشی بگردید؛ بعد سراغ قاعده‌ی دست راست بروید.',
      ],
      sources: [SOURCES.law, SOURCES.signs, SOURCES.plan],
    },
  ],
};

// The chapters, in the curriculum's order; `planned`: the lessons still to be written (each chapter ends with its test,
// and the course with a full simulated exam).
export const COURSE: CourseChapter[] = [
  { id: 'ready', n: 1, title: 'آماده شدن برای رانندگی', sub: 'خودرو و تجهیزاتش، راننده: خستگی، الکل و دارو', lessons: [],
    planned: ['تجهیزات و بازدید خودرو', 'کمربند و صندلی کودک', 'الکل، دارو و خستگی', 'آزمون فصل'] },
  { id: 'road', n: 2, title: 'جایگاه در جاده و سرعت', sub: 'جای خودرو در خیابان، سرعت مجاز، فاصله و مسافت توقف', lessons: [],
    planned: ['جایگاه در مسیر', 'سرعت مجاز و تنظیم سرعت', 'فاصله و مسافت توقف', 'آزمون فصل'] },
  { id: 'priority', n: 3, title: 'حق تقدم', sub: 'قاعده‌ی دست راست، راه دادن مطلق، تقاطع‌ها و میدان', lessons: [RIGHT_RULE],
    planned: ['گردش به چپ و راست', 'تقاطع‌های چراغ‌دار', 'میدان', 'آزمون فصل'] },
  { id: 'signs', n: 4, title: 'تابلوها، خط‌کشی‌ها و چراغ‌ها', sub: 'گروه‌های تابلو، خط‌کشی‌های جاده و چراغ راهنمایی', lessons: [],
    planned: ['تابلوهای هشدار و حق تقدم', 'تابلوهای ممنوعیت و الزامی', 'خط‌کشی‌ها', 'چراغ راهنمایی', 'آزمون فصل'] },
  { id: 'manoeuvres', n: 5, title: 'مانورها', sub: 'سبقت، تغییر خط، گردش، توقف و پارک', lessons: [],
    planned: ['سبقت گرفتن', 'تغییر خط و ادغام', 'توقف و پارک', 'آزمون فصل'] },
  { id: 'people', n: 6, title: 'عابران، دوچرخه‌ها و کاربران آسیب‌پذیر', sub: 'گذرگاه عابر، مسیر دوچرخه، کودکان و سالمندان', lessons: [],
    planned: ['گذرگاه عابر پیاده', 'دوچرخه و موپد', 'کودکان، سالمندان و حیوانات', 'آزمون فصل'] },
  { id: 'special', n: 7, title: 'جاده‌های ویژه و شرایط سخت', sub: 'بزرگراه، رانندگی در شب و هوای بد', lessons: [],
    planned: ['بزرگراه', 'رانندگی در تاریکی', 'باران، برف و یخ', 'آزمون فصل'] },
  { id: 'incidents', n: 8, title: 'موقعیت‌های خاص', sub: 'خودروهای امدادی، تصادف و خرابی خودرو', lessons: [],
    planned: ['خودروهای امدادی', 'تصادف و کمک‌های اولیه', 'خرابی خودرو در جاده', 'آزمون فصل'] },
  { id: 'final', n: 9, title: 'آزمون شبیه‌سازی‌شده', sub: `مثل آزمون واقعی: ${EXAM.questions} سؤال تصویری، حداکثر ${EXAM.maxMistakes} اشتباه برای قبولی`, lessons: [],
    planned: ['آزمون کامل ۱', 'آزمون کامل ۲', 'آزمون کامل ۳'] },
];

export const lessonById = (id: string) => {
  for (const ch of COURSE) { const l = ch.lessons.find(x => x.id === id); if (l) return { chapter: ch, lesson: l }; }
  return null;
};
export const lessonCount = () => COURSE.reduce((n, ch) => n + ch.lessons.length + ch.planned.length, 0);
export const readyCount = () => COURSE.reduce((n, ch) => n + ch.lessons.length, 0);
