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

const TURNS: CourseLesson = {
  id: 'turns',
  title: 'گردش به چپ و راست',
  minutes: 8,
  steps: [
    {
      kind: 'intro',
      title: 'گردش به چپ و راست',
      text: 'در آزمون، سؤال‌های گردش در تقاطع بسیار رایج‌اند، به‌خصوص با چراغ سبز، دوچرخه‌سوار کنار خودرو و عابرانی که از عرض خیابان رد می‌شوند.',
      goals: [
        'بدانید در گردش به چپ به چه کسانی باید راه بدهید.',
        'بدانید در گردش به راست چرا دوچرخه‌سوار و نقطه‌ی کور مهم‌اند.',
        'بدانید عابران خیابانی که واردش می‌شوید حق تقدم دارند، حتی با چراغ سبز.',
      ],
      exam: [
        'تصویری با چراغ سبز و خودرویی از روبه‌رو؛ گزینه‌ی «چون چراغ سبز است اول می‌روم» غلط است.',
        'گردش به راست با دوچرخه‌سواری در مسیر دوچرخه کنار شما.',
        'عابرانی که هنگام گردش از عرض خیابان رد می‌شوند.',
      ],
    },
    {
      kind: 'teach',
      title: 'گردش به چپ: به روبه‌رو راه بدهید',
      art: 'turn-left',
      text: 'وقتی به چپ می‌پیچید، باید به ترافیک روبه‌رو که مستقیم یا به راست می‌رود راه بدهید. با چراغ سبز هم همین است: تا وسط تقاطع جلو بروید، منتظر بمانید و وقتی راه باز شد بپیچید. در تصویر، خودروی قرمز صبر می‌کند تا خودروی آبیِ روبه‌رو رد شود.',
      rule: 'در گردش به چپ، ترافیکِ روبه‌رو که مستقیم یا به راست می‌رود اول است.',
      law: 'Færdselsloven § 26، بند ۶',
      trap: 'چراغ سبز یعنی اجازه‌ی رفتن، نه حق تقدم بر ترافیک روبه‌رو. گزینه‌ی «اول می‌روم چون چراغ سبز است» غلط است.',
    },
    {
      kind: 'teach',
      title: 'گردش به راست: دوچرخه‌سوار و نقطه‌ی کور',
      art: 'turn-right-cyclist',
      text: 'وقتی به راست می‌پیچید، باید به دوچرخه‌سواران و موپدهایی که کنار یا پشت شما، مثلاً در مسیر دوچرخه، مستقیم می‌روند راه بدهید. قبل از پیچیدن در آینه و از روی شانه (نقطه‌ی کور) نگاه کنید. در تصویر، خودروی قرمز صبر می‌کند تا دوچرخه‌سوار رد شود.',
      rule: 'در گردش به راست، دوچرخه‌سوارِ مستقیم‌رو اول است؛ آینه و نقطه‌ی کور را نگاه کنید.',
      law: 'Færdselsloven § 26، بند ۶',
      trap: 'راهنما زدن به شما حق تقدم نمی‌دهد. گزینه‌ی «دوچرخه‌سوار باید صبر کند چون من راهنما زده‌ام» غلط است.',
    },
    {
      kind: 'teach',
      title: 'عابران و دو خودروی روبه‌رو',
      text: 'دو قاعده‌ی دیگر که در آزمون پرسیده می‌شوند:',
      points: [
        'هنگام گردش، به عابرانی که از عرض خیابانی که واردش می‌شوید رد می‌شوند راه بدهید، حتی وقتی چراغ شما سبز است.',
        'وقتی دو خودرو از روبه‌روی هم هر دو به چپ می‌پیچند، معمولاً از سمت چپ از کنار هم رد می‌شوند؛ یعنی هر کدام از کنار مرکز تقاطع رد می‌شود و پشت دیگری می‌پیچد.',
      ],
      rule: 'عابرِ خیابانی که به آن می‌پیچید اول است، با چراغ سبز هم.',
      law: 'Færdselsloven § 27، بندهای ۵ و ۶ · § 16، بند ۵',
      trap: 'گزینه‌ی «عابران باید صبر کنند چون چراغ من سبز است» غلط است.',
    },
    {
      kind: 'exam',
      art: 'exam-left-oncoming',
      da: 'Du har grønt lys og vil svinge til venstre i krydset. En bil kommer imod dig og vil køre ligeud. Hvordan forholder du dig?',
      fa: 'چراغ شما سبز است و می‌خواهید در تقاطع به چپ بپیچید. خودرویی از روبه‌رو می‌آید و می‌خواهد مستقیم برود. چه می‌کنید؟',
      statements: [
        { da: 'Jeg holder tilbage for den modkørende bil.', fa: 'به خودروی روبه‌رو راه می‌دهم.', ok: true, why: 'در گردش به چپ، ترافیکِ روبه‌رو اول است.' },
        { da: 'Jeg kører først, fordi jeg har grønt lys.', fa: 'اول می‌روم، چون چراغم سبز است.', ok: false, why: 'چراغ سبز به شما حق تقدم بر ترافیک روبه‌رو نمی‌دهد.' },
      ],
    },
    {
      kind: 'exam',
      art: 'exam-right-cyclist',
      da: 'Du vil svinge til højre. På cykelstien til højre for dig kører en cyklist ligeud. Hvordan forholder du dig?',
      fa: 'می‌خواهید به راست بپیچید. دوچرخه‌سواری در مسیر دوچرخه سمت راست شما مستقیم می‌رود. چه می‌کنید؟',
      statements: [
        { da: 'Jeg holder tilbage for cyklisten.', fa: 'به دوچرخه‌سوار راه می‌دهم.', ok: true, why: 'در گردش به راست، دوچرخه‌سوارِ مستقیم‌رو اول است.' },
        { da: 'Jeg kigger i spejlet og over skulderen, før jeg svinger.', fa: 'قبل از پیچیدن در آینه و از روی شانه نگاه می‌کنم.', ok: true, why: 'دوچرخه‌سوار ممکن است در نقطه‌ی کور باشد.' },
        { da: 'Cyklisten skal holde tilbage, fordi jeg har blinket først.', fa: 'دوچرخه‌سوار باید صبر کند، چون من اول راهنما زده‌ام.', ok: false, why: 'راهنما زدن حق تقدم نمی‌دهد.' },
      ],
    },
    {
      kind: 'exam',
      art: 'exam-turn-pedestrian',
      da: 'Du svinger til højre ved grønt lys. Fodgængere går over den vej, du svinger ind på. Hvordan forholder du dig?',
      fa: 'با چراغ سبز به راست می‌پیچید. عابرانی از عرض خیابانی که واردش می‌شوید رد می‌شوند. چه می‌کنید؟',
      statements: [
        { da: 'Jeg holder tilbage for fodgængerne.', fa: 'به عابران راه می‌دهم.', ok: true, why: 'عابرِ خیابانی که به آن می‌پیچید اول است.' },
        { da: 'Fodgængerne skal vente, fordi jeg har grønt lys.', fa: 'عابران باید صبر کنند، چون چراغ من سبز است.', ok: false, why: 'با چراغ سبز هم باید به این عابران راه بدهید.' },
      ],
    },
    // The test has 7 statements; one mistake is allowed.
    { kind: 'result', max: 1 },
    {
      kind: 'summary',
      points: [
        'در گردش به چپ، به ترافیک روبه‌رو که مستقیم یا به راست می‌رود راه بدهید، با چراغ سبز هم.',
        'در گردش به راست، به دوچرخه‌سوار و موپدِ مستقیم‌رو راه بدهید؛ آینه و نقطه‌ی کور را نگاه کنید.',
        'به عابران خیابانی که به آن می‌پیچید راه بدهید، حتی با چراغ سبز.',
        'راهنما زدن و چراغ سبز به شما حق تقدم نمی‌دهند؛ این فخ رایج آزمون است.',
      ],
      sources: [SOURCES.law, SOURCES.plan],
    },
  ],
};

const OVERTAKING: CourseLesson = {
  id: 'overtaking',
  title: 'سبقت گرفتن',
  minutes: 9,
  steps: [
    {
      kind: 'intro',
      title: 'سبقت گرفتن (overhaling)',
      text: 'سبقت از خطرناک‌ترین مانورهاست و در آزمون تئوری از چند جهت پرسیده می‌شود: کجا ممنوع است، از کدام طرف، و وقتی از شما سبقت می‌گیرند چه باید بکنید.',
      goals: [
        'بدانید پیش از سبقت چه چیزهایی را باید بررسی کنید.',
        'جاهایی را که سبقت ممنوع است بشناسید، از جمله با تابلو و خط ممتد.',
        'بدانید کِی از سمت راست می‌شود سبقت گرفت و وقتی از شما سبقت می‌گیرند چه کنید.',
      ],
      exam: [
        'تصویری با خط ممتد وسط جاده یا تابلوی «سبقت ممنوع» (C 51) و یک وسیله‌ی کند جلوی شما.',
        'خودرویی که جلوی گذرگاه عابر پیاده سرعتش را کم می‌کند.',
        'دوچرخه‌سوار بعد از تابلوی سبقت ممنوع؛ اینجا سبقت از دوچرخه مجاز است.',
      ],
    },
    {
      kind: 'teach',
      title: 'سبقت از سمت چپ، با بررسی کامل',
      art: 'overtake-basics',
      text: 'سبقت از سمت چپ انجام می‌شود. پیش از آن مطمئن شوید که:',
      points: [
        'راه روبه‌رو به اندازه‌ی کافی آزاد است و دید کافی دارید',
        'کسی از پشت در حال سبقت از شما نیست (آینه و نقطه‌ی کور)',
        'خودروی جلو راهنمای چپ نزده و قصد سبقت یا گردش به چپ ندارد',
        'می‌توانید بدون مزاحمت برای خودرویی که از آن سبقت گرفته‌اید به خط خودتان برگردید',
      ],
      rule: 'سبقت از چپ؛ راهنما بزنید، آینه و نقطه‌ی کور را ببینید و فقط وقتی راه کاملاً آزاد است.',
      law: 'Færdselsloven، فصل سبقت (overhaling)',
      trap: 'حد سرعت هنگام سبقت هم معتبر است. گزینه‌ی «برای سبقت می‌توانم کمی از حد مجاز تندتر بروم» غلط است.',
    },
    {
      kind: 'teach',
      title: 'کجا سبقت ممنوع است؟',
      text: 'در این جاها نباید سبقت بگیرید:',
      points: [
        'بعد از تابلوی «سبقت ممنوع» (C 51) تا تابلوی پایانش (C 53)؛ ولی سبقت از دوچرخه، موپد و موتورسیکلت دوچرخ مجاز است',
        'وقتی برای سبقت باید از خط ممتد (Q 44) رد شوید',
        'درست پیش از گذرگاه عابر پیاده و روی آن',
        'جایی که دید کافی ندارید: سر پیچ، بالای سربالایی و نزدیک تقاطع',
      ],
      rule: 'خط ممتد، تابلوی C 51، گذرگاه عابر و جاهای کم‌دید: سبقت نگیرید.',
      law: 'Færdselsloven، فصل سبقت · C 51 · C 53 · Q 44',
      trap: 'تابلوی C 51 سبقت از دوچرخه را ممنوع نمی‌کند. گزینه‌ی «از دوچرخه‌سوار هم نمی‌توانم سبقت بگیرم» غلط است.',
    },
    {
      kind: 'teach',
      title: 'سبقت از سمت راست',
      art: 'overtake-right',
      text: 'از سمت راست فقط در این حالت‌ها می‌شود سبقت گرفت: وقتی خودروی جلو راهنمای چپ زده و برای گردش به چپ کنار وسط جاده آمده، یا در ترافیک چندخطه که خودروها در خط‌های خودشان می‌روند. در تصویر، خودروی خاکستری منتظر گردش به چپ است و خودروی آبی از سمت راستش رد می‌شود.',
      rule: 'از راست فقط وقتی سبقت بگیرید که جلویی برای گردش به چپ کنار کشیده، یا در ترافیک چندخطه.',
      law: 'Færdselsloven، فصل سبقت',
      trap: 'گزینه‌ی «اگر خودروی جلو کند است، از راست سبقت می‌گیرم» غلط است.',
    },
    {
      kind: 'teach',
      title: 'وقتی از شما سبقت می‌گیرند',
      text: 'قاعده‌های طرف دیگر سبقت هم در آزمون می‌آیند:',
      points: [
        'وقتی کسی از شما سبقت می‌گیرد، سرعتتان را زیاد نکنید و تا جای ممکن به راست بروید.',
        'هنگام سبقت از دوچرخه‌سوار، فاصله‌ی جانبی کافی بگذارید؛ اگر نمی‌شود، پشت سرش بمانید.',
      ],
      rule: 'از شما سبقت می‌گیرند؟ سرعت را زیاد نکنید و به راست بروید.',
      law: 'Færdselsloven، فصل سبقت',
      trap: 'گزینه‌ی «سرعتم را زیاد می‌کنم تا سبقت زودتر تمام شود» غلط است.',
    },
    {
      kind: 'exam',
      art: 'exam-solid-line',
      da: 'Du kører bag en traktor på en landevej. Midt på vejen er der en spærrelinje. Hvordan forholder du dig?',
      fa: 'در جاده‌ای بیرون شهر پشت یک تراکتور می‌رانید. وسط جاده خط ممتد است. چه می‌کنید؟',
      statements: [
        { da: 'Jeg bliver bag traktoren, indtil spærrelinjen ophører.', fa: 'تا تمام شدن خط ممتد پشت تراکتور می‌مانم.', ok: true, why: 'برای سبقت باید از خط ممتد رد شوید و این ممنوع است.' },
        { da: 'Jeg må overhale, hvis der ikke kommer modkørende.', fa: 'اگر خودرویی از روبه‌رو نیاید، می‌توانم سبقت بگیرم.', ok: false, why: 'خط ممتد را حتی وقتی راه آزاد است نباید رد کنید.' },
      ],
    },
    {
      kind: 'exam',
      art: 'exam-crossing',
      da: 'Bilen foran dig sætter farten ned foran et fodgængerfelt. Hvordan forholder du dig?',
      fa: 'خودروی جلوی شما پیش از گذرگاه عابر پیاده سرعتش را کم می‌کند. چه می‌کنید؟',
      statements: [
        { da: 'Jeg overhaler bilen, fordi den kører langsomt.', fa: 'از خودرو سبقت می‌گیرم، چون آهسته می‌رود.', ok: false, why: 'درست پیش از گذرگاه عابر و روی آن سبقت ممنوع است.' },
        { da: 'Jeg sætter også farten ned og er klar til at standse.', fa: 'من هم سرعتم را کم می‌کنم و آماده‌ی ایستادن هستم.', ok: true, why: 'ممکن است عابری از جلوی آن خودرو رد شود.' },
      ],
    },
    {
      kind: 'exam',
      art: 'exam-c51-cyclist',
      da: 'Du kører forbi tavlen «Overhaling forbudt». Foran dig kører en cyklist. Hvordan forholder du dig?',
      fa: 'به تابلوی «سبقت ممنوع» رسیده‌اید و از کنارش رد می‌شوید. جلوی شما یک دوچرخه‌سوار می‌رود. چه می‌کنید؟',
      statements: [
        { da: 'Jeg må gerne overhale cyklisten, når det kan ske uden fare.', fa: 'اگر بی‌خطر باشد، می‌توانم از دوچرخه‌سوار سبقت بگیرم.', ok: true, why: 'تابلوی C 51 سبقت از دوچرخه را ممنوع نمی‌کند.' },
        { da: 'Forbuddet gælder også overhaling af cyklisten.', fa: 'ممنوعیت شامل سبقت از دوچرخه‌سوار هم می‌شود.', ok: false, why: 'ممنوعیت فقط برای وسیله‌های موتوری بیش از دو چرخ است.' },
        { da: 'Jeg holder god afstand til cyklisten, når jeg overhaler.', fa: 'هنگام سبقت، فاصله‌ی کافی از دوچرخه‌سوار می‌گیرم.', ok: true, why: 'فاصله‌ی جانبی کافی از دوچرخه‌سوار لازم است.' },
      ],
    },
    // The test has 7 statements; one mistake is allowed.
    { kind: 'result', max: 1 },
    {
      kind: 'summary',
      points: [
        'سبقت از چپ؛ پیش از آن آینه، نقطه‌ی کور، راهنما و آزاد بودن کامل راه.',
        'خط ممتد، تابلوی C 51، گذرگاه عابر و جاهای کم‌دید: سبقت ممنوع.',
        'تابلوی C 51 سبقت از دوچرخه، موپد و موتورسیکلت دوچرخ را ممنوع نمی‌کند.',
        'از راست فقط وقتی جلویی برای گردش به چپ کنار کشیده، یا در ترافیک چندخطه.',
        'وقتی از شما سبقت می‌گیرند، سرعت را زیاد نکنید و به راست بروید.',
      ],
      sources: [SOURCES.law, SOURCES.signs, SOURCES.plan],
    },
  ],
};

const LANES: CourseLesson = {
  id: 'lanes',
  title: 'تغییر خط و ادغام',
  minutes: 8,
  steps: [
    {
      kind: 'intro',
      title: 'تغییر خط و ادغام (vognbaneskift og fletning)',
      text: 'در جاده‌های چندخطه و بزرگراه باید بدانید چه کسی به چه کسی راه می‌دهد. آزمون تئوری این‌جا بیشتر روی یک تفاوت تکیه می‌کند: تغییر خط (شما راه می‌دهید) در برابر ادغام زیپی (به نوبت).',
      goals: [
        'مراحل تغییر خط را بدانید: آینه، نقطه‌ی کور، راهنما و راه دادن.',
        'فرق «خط شما تمام می‌شود» با «دو خط یکی می‌شوند» (ادغام زیپی) را تشخیص دهید.',
        'بدانید ورود به بزرگراه از خط شتاب چطور انجام می‌شود و چه کسی راه می‌دهد.',
      ],
      exam: [
        'دو خط که جلوتر یکی می‌شوند و در هر دو خط صف خودرو است.',
        'ورود به بزرگراه از خط شتاب با یک کامیون در خط راست بزرگراه.',
        'خودرویی که در آینه‌ی بغل، در خط کناری، به شما نزدیک می‌شود.',
      ],
    },
    {
      kind: 'teach',
      title: 'تغییر خط: شما راه می‌دهید',
      art: 'lane-change',
      text: 'کسی که خط عوض می‌کند باید به خودروهای خطی که واردش می‌شود راه بدهد. پیش از تغییر خط:',
      points: [
        'در آینه‌ی وسط و آینه‌ی بغل نگاه کنید',
        'با نگاه از روی شانه نقطه‌ی کور را بررسی کنید',
        'به‌موقع راهنما بزنید',
        'فقط وقتی خط کناری به اندازه‌ی کافی آزاد است، نرم و بدون ترمز گرفتن دیگران خط عوض کنید',
      ],
      rule: 'تغییر خط = راه دادن به خودروهای خط دیگر. آینه، نقطه‌ی کور، راهنما، بعد تغییر خط.',
      law: 'Færdselsloven § 18، بند ۲',
      trap: 'راهنما زدن به شما حق تقدم نمی‌دهد. گزینه‌ی «راهنما زده‌ام، پس آن‌ها باید راه بدهند» غلط است.',
    },
    {
      kind: 'teach',
      title: 'ادغام زیپی: به نوبت، یکی از هر خط',
      art: 'zip-merge',
      text: 'جایی که دو خط هم‌جهت یکی می‌شوند (تابلوی B 15)، ادغام زیپی (fletning) انجام می‌شود: خودروها به نوبت، یکی از این خط و یکی از آن خط، وارد خط واحد می‌شوند. هیچ‌کدام از دو خط حق تقدم ندارد؛ تا نقطه‌ی یکی شدن در خط خودتان بمانید و همان‌جا به نوبت ادغام شوید.',
      points: [
        'دو خط یکی می‌شوند ← ادغام زیپی، به نوبت',
        'فقط خط شما تمام می‌شود و خط کناری ادامه دارد (فلش‌های تغییر خط روی آسفالت) ← تغییر خط؛ شما راه می‌دهید',
      ],
      rule: 'ادغام زیپی: یکی از هر خط، به نوبت. خط شما تمام می‌شود: راه می‌دهید.',
      law: 'Færdselsloven § 18، بند ۴ · B 15',
      trap: 'گزینه‌ی «خودروهای خط چپ حق تقدم دارند» در ادغام زیپی غلط است؛ هیچ خطی حق تقدم ندارد.',
    },
    {
      kind: 'teach',
      title: 'ورود به بزرگراه از خط شتاب',
      text: 'در خط شتاب (accelerationsspor) سرعتتان را به سرعت ترافیک بزرگراه برسانید، در آینه و از روی شانه فاصله‌ای پیدا کنید و راهنما بزنید. شما باید به خودروهای بزرگراه راه بدهید؛ آن‌ها در صورت امکان با تغییر خط یا کم کردن سرعت کمک می‌کنند، اما موظف به راه دادن نیستند.',
      points: [
        'تمام طول خط شتاب را برای رسیدن به سرعت مناسب به کار ببرید',
        'فقط اگر واقعاً جایی برای ورود نیست، آخر خط شتاب بایستید',
        'در بزرگراه و جاده‌های چندخطه در خط راست برانید؛ خط چپ برای سبقت است',
      ],
      rule: 'ورود به بزرگراه: سرعت را یکی کنید و به ترافیک بزرگراه راه بدهید.',
      law: 'Færdselsloven § 18، بند ۳',
      trap: 'گزینه‌ی «خودروهای بزرگراه باید برای من جا باز کنند» غلط است؛ وظیفه‌ی راه دادن با شماست.',
    },
    {
      kind: 'exam',
      art: 'exam-zip-merge',
      da: 'Om lidt bliver de to vognbaner til én. Der er kø i begge baner. Hvordan forholder du dig?',
      fa: 'کمی جلوتر دو خط یکی می‌شوند. در هر دو خط صف است. چه می‌کنید؟',
      statements: [
        { da: 'Jeg fletter, så bilerne skiftevis kører ind fra hver bane.', fa: 'ادغام زیپی می‌کنم؛ خودروها به نوبت از هر خط وارد می‌شوند.', ok: true, why: 'جایی که دو خط یکی می‌شوند، ادغام زیپی به نوبت انجام می‌شود.' },
        { da: 'Bilerne i den venstre bane har forkørselsret.', fa: 'خودروهای خط چپ حق تقدم دارند.', ok: false, why: 'در ادغام زیپی هیچ‌کدام از دو خط حق تقدم ندارد.' },
      ],
    },
    {
      kind: 'exam',
      art: 'exam-motorway',
      da: 'Du kører ad accelerationssporet ind på motorvejen. Hvordan forholder du dig?',
      fa: 'از خط شتاب وارد بزرگراه می‌شوید. چه می‌کنید؟',
      statements: [
        { da: 'Jeg tilpasser farten til trafikken på motorvejen og kører ind, når der er plads.', fa: 'سرعتم را با ترافیک بزرگراه یکی می‌کنم و وقتی جا هست وارد می‌شوم.', ok: true, why: 'شما به ترافیک بزرگراه راه می‌دهید و با سرعت مناسب وارد می‌شوید.' },
        { da: 'Lastbilen på motorvejen har pligt til at give mig plads.', fa: 'کامیونِ بزرگراه موظف است برای من جا باز کند.', ok: false, why: 'وظیفه‌ی راه دادن با شماست؛ کامیون فقط در صورت امکان کمک می‌کند.' },
        { da: 'Jeg standser altid for enden af accelerationssporet.', fa: 'همیشه آخر خط شتاب می‌ایستم.', ok: false, why: 'ایستادن فقط وقتی است که واقعاً جایی برای ورود نیست.' },
      ],
    },
    {
      kind: 'exam',
      art: 'exam-mirror',
      da: 'Du vil skifte til venstre vognbane. I sidespejlet ser du en bil i den venstre bane. Hvordan forholder du dig?',
      fa: 'می‌خواهید به خط چپ بروید. در آینه‌ی بغل خودرویی را در خط چپ می‌بینید. چه می‌کنید؟',
      statements: [
        { da: 'Jeg skifter bane nu, fordi jeg har givet tegn.', fa: 'حالا خط عوض می‌کنم، چون راهنما زده‌ام.', ok: false, why: 'راهنما حق تقدم نمی‌دهد؛ کسی که خط عوض می‌کند راه می‌دهد.' },
        { da: 'Jeg venter, til bilen i venstre bane er kørt forbi.', fa: 'صبر می‌کنم تا خودروی خط چپ رد شود.', ok: true, why: 'باید به خودروهای خطی که واردش می‌شوید راه بدهید.' },
      ],
    },
    // The test has 7 statements; one mistake is allowed.
    { kind: 'result', max: 1 },
    {
      kind: 'summary',
      points: [
        'تغییر خط: آینه، نقطه‌ی کور، راهنما؛ و به خودروهای خط دیگر راه بدهید.',
        'راهنما زدن حق تقدم نمی‌دهد.',
        'دو خط یکی می‌شوند: ادغام زیپی، به نوبت؛ هیچ خطی حق تقدم ندارد.',
        'فقط خط شما تمام می‌شود: شما خط عوض می‌کنید و راه می‌دهید.',
        'ورود به بزرگراه: سرعت را یکی کنید و به ترافیک بزرگراه راه بدهید.',
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
  { id: 'priority', n: 3, title: 'حق تقدم', sub: 'قاعده‌ی دست راست، راه دادن مطلق، تقاطع‌ها و میدان', lessons: [RIGHT_RULE, TURNS],
    planned: ['تقاطع‌های چراغ‌دار', 'میدان', 'آزمون فصل'] },
  { id: 'signs', n: 4, title: 'تابلوها، خط‌کشی‌ها و چراغ‌ها', sub: 'گروه‌های تابلو، خط‌کشی‌های جاده و چراغ راهنمایی', lessons: [],
    planned: ['تابلوهای هشدار و حق تقدم', 'تابلوهای ممنوعیت و الزامی', 'خط‌کشی‌ها', 'چراغ راهنمایی', 'آزمون فصل'] },
  { id: 'manoeuvres', n: 5, title: 'مانورها', sub: 'سبقت، تغییر خط، گردش، توقف و پارک', lessons: [OVERTAKING, LANES],
    planned: ['توقف و پارک', 'آزمون فصل'] },
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
