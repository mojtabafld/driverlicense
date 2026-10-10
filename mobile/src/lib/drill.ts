// «تمرین هوشمند»: practice on the course's own exam questions (lib/course.ts), in place of going through prove.dk's
// lessons one by one. What makes it stronger than reading a lesson and answering its fixed questions once:
// - spaced repetition (Leitner boxes): a question answered right comes back later and later (BOX_DAYS), one answered
//   wrong drops to the first box and is asked again in the same session;
// - confidence: every answer is given as «مطمئنم» (sure) or «حدس زدم» (a guess); a right guess is not counted as
//   learned, and a wrong answer given as sure is a misconception, shown as such;
// - topics mixed: a session never puts two questions of the same lesson in a row when it can, so the user practises
//   telling which rule applies, as in the real test;
// - every mistake points back to the rule it breaks (the lesson's teach step, with its law and trap);
// - the statements come in a new order every time, so the answers are not learnt by their place.
// The questions keep the real test's format: a picture, the question in Danish, statements to tick (ticked «Ja»,
// unticked «Nej»), every wrong statement one mistake; the session's result is scaled to the real 25-question test.
// Besides each lesson's own test (`exam` steps), EXTRA holds more questions on the same pictures, asking about the
// situation from another side, as the real test often does.
import { COURSE, EXAM, type CourseChapter, type CourseLesson, type CourseStep, type ExamStatement } from './course';

type ExamStep = Extract<CourseStep, { kind: 'exam' }>;
type TeachStep = Extract<CourseStep, { kind: 'teach' }>;
// One practice question: `teach` is the index (among the lesson's teach steps) of the rule it asks about.
type Extra = { id: string; teach: number; art: string; da: string; fa: string; statements: ExamStatement[] };
export type DrillItem = { id: string; chapter: CourseChapter; lesson: CourseLesson; q: ExamStep; teach?: TeachStep };

// The rule each lesson's own test question asks about, by the order of the `exam` steps (index among teach steps).
const LESSON_RULES: Record<string, number[]> = {
  'car-check': [2, 1, 0],
  belts: [2, 1, 0],
  alcohol: [0, 1, 2],
  'right-rule': [1, 3, 2],
  turns: [0, 1, 2],
  overtaking: [1, 1, 1],
  lanes: [2, 1, 3],
  'warn-priority': [1, 2, 4],
  bans: [0, 1, 3],
};

const EXTRA: Record<string, Extra[]> = {
  'right-rule': [
    {
      id: 'right-rule-x1', teach: 2, art: 'exam-shark',
      da: 'Du vil svinge til højre ad hovedvejen. Hvordan forholder du dig?',
      fa: 'می‌خواهید به راست، وارد جاده‌ی اصلی بپیچید. چه می‌کنید؟',
      statements: [
        { da: 'Jeg holder tilbage for den røde bil fra venstre.', fa: 'به خودروی قرمزی که از چپ می‌آید راه می‌دهم.', ok: true, why: 'دندان‌کوسه یعنی به همه، از هر دو طرف، راه بدهید.' },
        { da: 'Jeg holder tilbage for den hvide varevogn fra højre.', fa: 'به ون سفیدی که از راست می‌آید راه می‌دهم.', ok: true, why: 'راه دادن با دندان‌کوسه برای ترافیک هر دو طرف است.' },
        { da: 'Jeg skal kun holde tilbage for trafikken fra venstre, fordi jeg svinger til højre.', fa: 'چون به راست می‌پیچم، فقط باید به ترافیک سمت چپ راه بدهم.', ok: false, why: 'جهت گردش شما مهم نیست؛ با دندان‌کوسه به همه راه می‌دهید.' },
      ],
    },
    {
      id: 'right-rule-x2', teach: 3, art: 'exam-parking',
      da: 'Du vil køre ud fra parkeringspladsen. En fodgænger går på fortovet foran udkørslen. Hvordan forholder du dig?',
      fa: 'می‌خواهید از پارکینگ بیرون بروید. عابری در پیاده‌روی جلوی خروجی راه می‌رود. چه می‌کنید؟',
      statements: [
        { da: 'Jeg lader fodgængeren gå forbi, før jeg kører over fortovet.', fa: 'می‌گذارم عابر رد شود و بعد از پیاده‌رو می‌گذرم.', ok: true, why: 'هنگام خروج از پارکینگ، اول به عابر پیاده‌رو راه می‌دهید.' },
        { da: 'Fodgængeren skal vente, fordi jeg kører bil.', fa: 'عابر باید صبر کند، چون من با خودرو هستم.', ok: false, why: 'کسی که از پارکینگ بیرون می‌آید به همه راه می‌دهد، از جمله عابر.' },
      ],
    },
  ],
  turns: [
    {
      id: 'turns-x1', teach: 0, art: 'exam-left-oncoming',
      da: 'Du har grønt lys og vil svinge til venstre. Hvornår må du svinge?',
      fa: 'چراغ شما سبز است و می‌خواهید به چپ بپیچید. کِی می‌توانید بپیچید؟',
      statements: [
        { da: 'Når den modkørende bil er kørt forbi, og der ikke kommer flere.', fa: 'وقتی خودروی روبه‌رو رد شد و خودروی دیگری نمی‌آید.', ok: true, why: 'در گردش به چپ، صبر می‌کنید تا ترافیک روبه‌رو رد شود.' },
        { da: 'Med det samme, hvis jeg har blinket i god tid.', fa: 'همین حالا، اگر به‌موقع راهنما زده باشم.', ok: false, why: 'راهنما زدن حق تقدم نمی‌دهد.' },
      ],
    },
    {
      id: 'turns-x2', teach: 1, art: 'exam-right-cyclist',
      da: 'Hvorfor skal du se dig over skulderen, før du svinger til højre her?',
      fa: 'چرا این‌جا باید قبل از گردش به راست از روی شانه نگاه کنید؟',
      statements: [
        { da: 'Fordi en cyklist kan være i den blinde vinkel.', fa: 'چون ممکن است دوچرخه‌سواری در نقطه‌ی کور باشد.', ok: true, why: 'آینه همه‌جا را نشان نمی‌دهد؛ نقطه‌ی کور را باید با نگاه از روی شانه دید.' },
        { da: 'Det er ikke nødvendigt, når jeg har set i spejlet.', fa: 'وقتی در آینه نگاه کرده‌ام، لازم نیست.', ok: false, why: 'دوچرخه‌سوارِ نقطه‌ی کور در آینه دیده نمی‌شود.' },
      ],
    },
  ],
  overtaking: [
    {
      id: 'overtaking-x1', teach: 1, art: 'exam-solid-line',
      da: 'Traktoren kører meget langsomt. Hvordan forholder du dig?',
      fa: 'تراکتور خیلی آهسته می‌رود. چه می‌کنید؟',
      statements: [
        { da: 'Jeg må overhale, hvis jeg kun kører lidt over spærrelinjen.', fa: 'اگر فقط کمی از خط ممتد رد شوم، می‌توانم سبقت بگیرم.', ok: false, why: 'از خط ممتد، حتی کمی، نباید رد شوید.' },
        { da: 'Jeg må køre over hastighedsgrænsen for at komme hurtigt forbi.', fa: 'می‌توانم برای زود رد شدن از حد سرعت تندتر بروم.', ok: false, why: 'حد سرعت هنگام سبقت هم معتبر است.' },
        { da: 'Jeg holder god afstand til traktoren og venter.', fa: 'فاصله‌ی کافی از تراکتور می‌گیرم و صبر می‌کنم.', ok: true, why: 'تا خط ممتد تمام نشده، پشت تراکتور با فاصله می‌مانید.' },
      ],
    },
    {
      id: 'overtaking-x2', teach: 1, art: 'exam-crossing',
      da: 'Fodgængeren til venstre er ved at gå ud på fodgængerfeltet. Hvordan forholder du dig?',
      fa: 'عابرِ سمت چپ دارد وارد گذرگاه عابر می‌شود. چه می‌کنید؟',
      statements: [
        { da: 'Jeg holder tilbage for fodgængeren.', fa: 'به عابر راه می‌دهم.', ok: true, why: 'عابرِ روی گذرگاه یا در حال ورود به آن اول است.' },
        { da: 'Jeg overhaler den blå bil, hvis der ikke kommer modkørende.', fa: 'اگر کسی از روبه‌رو نیاید، از خودروی آبی سبقت می‌گیرم.', ok: false, why: 'درست پیش از گذرگاه عابر سبقت ممنوع است.' },
      ],
    },
  ],
  lanes: [
    {
      id: 'lanes-x1', teach: 3, art: 'exam-motorway',
      da: 'Lastbilen på motorvejen kører ved siden af dig. Hvordan forholder du dig?',
      fa: 'کامیونِ بزرگراه کنار شما می‌رود. چه می‌کنید؟',
      statements: [
        { da: 'Jeg tilpasser farten og kører ind bag lastbilen, når der er plads.', fa: 'سرعتم را تنظیم می‌کنم و وقتی جا شد پشت کامیون وارد می‌شوم.', ok: true, why: 'شما به ترافیک بزرگراه راه می‌دهید و در فاصله‌ی خالی وارد می‌شوید.' },
        { da: 'Jeg blinker til venstre og kører ind, så lastbilen må bremse.', fa: 'راهنمای چپ می‌زنم و وارد می‌شوم تا کامیون ترمز کند.', ok: false, why: 'راهنما زدن حق تقدم نمی‌دهد؛ نباید کسی را مجبور به ترمز کنید.' },
      ],
    },
    {
      id: 'lanes-x2', teach: 2, art: 'exam-zip-merge',
      da: 'To vognbaner bliver til én. Hvordan forholder du dig?',
      fa: 'دو خط یکی می‌شوند. چه می‌کنید؟',
      statements: [
        { da: 'Jeg bliver i min vognbane, til banerne bliver til én, og fletter der.', fa: 'تا جایی که خط‌ها یکی می‌شوند در خط خودم می‌مانم و همان‌جا ادغام می‌کنم.', ok: true, why: 'در ادغام زیپی، تا نقطه‌ی یکی شدن در خط خودتان می‌مانید.' },
        { da: 'Jeg skal skifte vognbane så tidligt som muligt.', fa: 'باید هرچه زودتر خط عوض کنم.', ok: false, why: 'زود عوض کردن خط لازم نیست؛ ادغام در نقطه‌ی یکی شدن و به نوبت است.' },
      ],
    },
  ],
  'warn-priority': [
    {
      id: 'warn-priority-x1', teach: 1, art: 'exam-a11',
      da: 'Hvad betyder tavlen ved vejen?',
      fa: 'تابلوی کنار جاده چه معنایی دارد؟',
      statements: [
        { da: 'Der kommer et kryds, hvor trafikken fra sidevejene har ubetinget vigepligt.', fa: 'تقاطعی در پیش است که ترافیک جاده‌های فرعی باید بی‌قید و شرط راه بدهد.', ok: true, why: 'خط پهنِ A 11 جاده‌ی شماست؛ فرعی‌ها راه می‌دهند.' },
        { da: 'Jeg skal holde tilbage for alle i krydset.', fa: 'باید در تقاطع به همه راه بدهم.', ok: false, why: 'A 11 مثلث هشدار است، نه تابلوی «راه بدهید».' },
      ],
    },
    {
      id: 'warn-priority-x2', teach: 2, art: 'exam-stop',
      da: 'Hvordan forholder du dig ved denne tavle?',
      fa: 'کنار این تابلو چه می‌کنید؟',
      statements: [
        { da: 'Jeg standser helt ved stoplinjen.', fa: 'پشت خط ایست کاملاً می‌ایستم.', ok: true, why: 'B 13 توقف کامل پشت خط ایست می‌خواهد.' },
        { da: 'Jeg må nøjes med at sætte farten ned, når jeg kan se, at vejen er fri.', fa: 'اگر ببینم جاده خالی است، کافی است سرعتم را کم کنم.', ok: false, why: 'پشت تابلوی ایست همیشه کامل می‌ایستید.' },
        { da: 'Når jeg har standset, holder jeg tilbage for trafikken fra begge sider.', fa: 'بعد از ایستادن، به ترافیک هر دو طرف راه می‌دهم.', ok: true, why: 'B 13 هم مثل B 11 راه دادن به همه است.' },
      ],
    },
  ],
  bans: [
    {
      id: 'bans-x1', teach: 1, art: 'exam-c62',
      da: 'Hvad må du ved denne tavle?',
      fa: 'کنار این تابلو چه کاری مجاز است؟',
      statements: [
        { da: 'Jeg må parkere her, mens jeg handler.', fa: 'می‌توانم این‌جا پارک کنم و خرید کنم.', ok: false, why: 'C 62 یعنی پارک ممنوع.' },
        { da: 'Jeg må standse kort for at lade fodgængeren stige ind.', fa: 'می‌توانم کوتاه بایستم تا عابر سوار شود.', ok: true, why: 'زیر C 62 توقف کوتاه برای سوار و پیاده کردن مجاز است.' },
        { da: 'Tavlen forbyder al standsning.', fa: 'این تابلو هر نوع توقفی را ممنوع می‌کند.', ok: false, why: 'توقف ممنوع C 61 است، با ضربدر؛ C 62 فقط یک خط دارد.' },
      ],
    },
    {
      id: 'bans-x2', teach: 0, art: 'exam-c112',
      da: 'Du skal til venstre. Hvordan forholder du dig?',
      fa: 'باید به سمت چپ بروید. چه می‌کنید؟',
      statements: [
        { da: 'Jeg kører ligeud eller til højre og finder en anden vej.', fa: 'مستقیم یا به راست می‌روم و راه دیگری پیدا می‌کنم.', ok: true, why: 'C 11.2 فقط گردش به چپ و دور زدن را ممنوع می‌کند.' },
        { da: 'Jeg må dreje til venstre, hvis der ikke kommer modkørende.', fa: 'اگر کسی از روبه‌رو نیاید، می‌توانم به چپ بپیچم.', ok: false, why: 'ممنوعیت با خالی بودن راه از بین نمی‌رود.' },
      ],
    },
  ],
};

// Every practice question, in the course's order: each lesson's own test, then its extra questions.
export const ITEMS: DrillItem[] = COURSE.flatMap(chapter => chapter.lessons.flatMap(lesson => {
  const teach = lesson.steps.filter((s): s is TeachStep => s.kind === 'teach');
  const own = lesson.steps.filter((s): s is ExamStep => s.kind === 'exam')
    .map((q, k) => ({ id: `${lesson.id}-${k + 1}`, chapter, lesson, q, teach: teach[LESSON_RULES[lesson.id]?.[k] ?? -1] }));
  const extra = (EXTRA[lesson.id] || []).map(x => ({ id: x.id, chapter, lesson, q: { kind: 'exam' as const, art: x.art, da: x.da, fa: x.fa, statements: x.statements }, teach: teach[x.teach] }));
  return [...own, ...extra];
}));
export const itemById = (id: string) => ITEMS.find(x => x.id === id);

// ---- spaced repetition ----
// A question's card: its box (0: new or missed … MAX_BOX: mastered), when it is due again, how often it was answered
// and missed, and how often it was missed while sure (a misconception).
export type DrillCard = { b: number; due: number; n: number; w: number; mis: number };
export type DrillState = Record<string, DrillCard>;
export const MAX_BOX = 5;
// Days until a question in each box comes back.
export const BOX_DAYS = [0, 1, 3, 7, 16, 35];
const DAY = 24 * 3600 * 1000;

// The card after one answer: right and sure moves it up a box; right but guessed keeps its box (it is asked again as
// soon as its box says); wrong sends it back to the first box, due at once.
export function review(card: DrillCard | undefined, ok: boolean, sure: boolean, now = Date.now()): DrillCard {
  const c = card ?? { b: 0, due: now, n: 0, w: 0, mis: 0 };
  const b = !ok ? 0 : sure ? Math.min(MAX_BOX, c.b + 1) : c.b;
  return { b, due: now + BOX_DAYS[b] * DAY, n: c.n + 1, w: c.w + (ok ? 0 : 1), mis: c.mis + (!ok && sure ? 1 : 0) };
}

// How well a set of questions is known, 0 … 1: the mean of their boxes (unseen ones count as 0).
export function mastery(state: DrillState, items: DrillItem[] = ITEMS) {
  return items.length ? items.reduce((s, x) => s + (state[x.id]?.b ?? 0), 0) / (items.length * MAX_BOX) : 0;
}
export const lessonItems = (lessonId: string) => ITEMS.filter(x => x.lesson.id === lessonId);
export const dueCount = (state: DrillState, now = Date.now()) => ITEMS.filter(x => state[x.id] && state[x.id].due <= now).length;
export const newCount = (state: DrillState) => ITEMS.filter(x => !state[x.id]).length;

// The lessons by how well they are known, weakest first (only those with questions answered).
export function weakLessons(state: DrillState) {
  const ids = [...new Set(ITEMS.map(x => x.lesson.id))];
  return ids.map(id => ({ lesson: lessonItems(id)[0].lesson, m: mastery(state, lessonItems(id)) }))
    .filter(x => lessonItems(x.lesson.id).some(i => state[i.id])).sort((a, b) => a.m - b.m);
}

// Mixes the questions so that no two of the same lesson follow each other where it can be avoided.
export function interleave(items: DrillItem[]): DrillItem[] {
  const left = items.slice(), out: DrillItem[] = [];
  while (left.length) {
    const prev = out[out.length - 1]?.lesson.id;
    const k = left.findIndex(x => x.lesson.id !== prev);
    out.push(...left.splice(k < 0 ? 0 : k, 1));
  }
  return out;
}

export const SESSION_SIZE = 10;
// A session: the questions due again first (lowest box first), then new ones (from the lessons the user has finished
// first, spread over the lessons), at most `size`, with room for at least two new ones while there are any. When
// nothing is due and nothing is new, the least-known questions. `only`: one lesson's questions.
export function buildSession(state: DrillState, done: Record<string, unknown>, opts: { now?: number; size?: number; only?: string } = {}): DrillItem[] {
  const now = opts.now ?? Date.now(), size = opts.size ?? SESSION_SIZE;
  const pool = opts.only ? lessonItems(opts.only) : ITEMS;
  const due = pool.filter(x => state[x.id] && state[x.id].due <= now).sort((a, b) => state[a.id].b - state[b.id].b || state[a.id].due - state[b.id].due);
  // New ones: from finished lessons first, and across the lessons (each one's first question, then each one's second…).
  const rank = (x: DrillItem) => lessonItems(x.lesson.id).indexOf(x);
  const fresh = pool.filter(x => !state[x.id]).sort((a, b) => Number(!done[a.lesson.id]) - Number(!done[b.lesson.id]) || rank(a) - rank(b));
  let pick = [...due.slice(0, fresh.length ? Math.max(0, size - 2) : size)];
  pick = [...pick, ...fresh.slice(0, size - pick.length)];
  if (pick.length < size) pick = [...pick, ...due.filter(x => !pick.includes(x)).slice(0, size - pick.length)];
  if (!pick.length) pick = pool.slice().sort((a, b) => state[a.id].b - state[b.id].b || state[a.id].due - state[b.id].due).slice(0, size);
  return interleave(shuffleArr(pick));
}

function shuffleArr<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
// The statements of a question in a new order: their indexes.
export const statementOrder = (n: number) => shuffleArr([...Array(n).keys()]);

// A session's mistakes scaled to the real test: about how many mistakes the same rate gives in its 25 questions.
export function realTestMistakes(mistakes: number, questions: number) {
  return questions ? Math.round((mistakes / questions) * EXAM.questions) : 0;
}
