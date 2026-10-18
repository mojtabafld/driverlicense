# Chapter 9 «آزمون شبیه‌سازی‌شده»: three simulated exams as the real theory test, 25 picture questions each from every
# chapter, at most 5 mistakes (course.ts's EXAM). A question is named by its lesson and its number among the lesson's test
# questions (1 = the first), and course.ts takes it from there with its picture and statements; no question is in two
# exams, and no picture twice in one exam. Each exam: ready 3, road 3, priority 4, signs 4, manoeuvres 3, people 3,
# special 3, incidents 2, in a mixed order.
from course import intro, summary

GOALS = [('نشان دهید برای آزمون واقعی آماده‌اید.', 'Show that you are ready for the real test.', 'Vise at du er klar til den rigtige prøve.'),
         ('سؤال‌هایی را که اشتباه می‌کنید پیدا کنید و درسشان را دوباره بخوانید.', 'Find the questions you get wrong and read their lessons again.', 'Finde de spørgsmål, du svarer forkert på, og læse deres lektioner igen.')]
EXAM_LINES = [('۲۵ سؤال تصویری از همه‌ی فصل‌ها، با ترتیب درهم.', '25 picture questions from every chapter, in mixed order.', '25 billedspørgsmål fra alle kapitler i blandet rækkefølge.'),
              ('حداکثر ۵ اشتباه برای قبولی، مثل آزمون واقعی.', 'At most 5 mistakes to pass, as in the real test.', 'Højst 5 fejl for at bestå, som ved den rigtige prøve.')]
TEXT = ('مثل آزمون واقعی تئوری: ۲۵ سؤال تصویری از همه‌ی فصل‌ها. هر عبارتی را که درست است علامت بزنید و نادرست‌ها را خالی بگذارید؛ هر علامت اشتباه یا جاافتاده یک اشتباه است و با حداکثر ۵ اشتباه قبول می‌شوید.',
        'Like the real theory test: 25 picture questions from every chapter. Tick each statement that is right and leave the wrong ones unticked; every wrong or missing tick is one mistake, and you pass with at most 5 mistakes.',
        'Som den rigtige teoriprøve: 25 billedspørgsmål fra alle kapitler. Sæt kryds ved hvert udsagn, der er rigtigt, og lad de forkerte stå tomme; hvert forkert eller manglende kryds er én fejl, og du består med højst 5 fejl.')
POINTS = [('با ۵ اشتباه یا کمتر قبول شده‌اید؛ با بیشتر، درس سؤال‌های اشتباه را دوباره بخوانید.', 'With 5 mistakes or fewer you have passed; with more, read the lessons of the questions you got wrong again.', 'Med 5 fejl eller færre har du bestået; med flere læser du lektionerne til de spørgsmål, du svarede forkert på, igen.'),
          ('هر عبارت را با دقت تا آخر بخوانید یا گوش کنید؛ یک کلمه می‌تواند جواب را عوض کند.', 'Read or listen to each statement carefully to the end; one word can change the answer.', 'Læs eller lyt til hvert udsagn omhyggeligt til ende; ét ord kan ændre svaret.'),
          ('هر عبارت جدا سنجیده می‌شود؛ یک سؤال می‌تواند چند جواب درست داشته باشد یا هیچ.', 'Each statement counts on its own; a question can have several right answers, or none.', 'Hvert udsagn tæller for sig; et spørgsmål kan have flere rigtige svar eller ingen.'),
          ('دو آزمون کامل دیگر را هم امتحان کنید؛ سؤال‌هایشان تکراری نیستند.', 'Try the other two full tests too; their questions are not repeated.', 'Prøv også de to andre fulde prøver; deres spørgsmål gentages ikke.')]
FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹'

PICKS = {
    1: [('lane-position', 1), ('right-rule', 1), ('warn-priority', 1), ('car-check', 1), ('overtaking', 2),
        ('crossing', 1), ('speed', 2), ('turns', 1), ('bans', 2), ('motorway', 1),
        ('belts', 2), ('cyclists', 2), ('lanes', 1), ('signal-junctions', 3), ('emergency', 1),
        ('markings', 2), ('darkness', 1), ('distance', 1), ('vulnerable', 1), ('roundabout', 1),
        ('parking', 3), ('traffic-lights', 1), ('weather', 1), ('alcohol', 3), ('breakdown', 3)],
    2: [('speed', 1), ('priority-test', 1), ('warn-priority', 2), ('belts', 1), ('overtaking', 1),
        ('crossing', 2), ('turns', 2), ('motorway', 3), ('bans', 1), ('lane-position', 2),
        ('emergency', 2), ('cyclists', 3), ('roundabout', 2), ('lanes', 2), ('car-check', 3),
        ('markings', 3), ('darkness', 2), ('priority-test', 6), ('vulnerable', 3), ('road-test', 4),
        ('parking', 1), ('traffic-lights', 3), ('weather', 3), ('accident', 2), ('ready-test', 1)],
    3: [('lane-position', 3), ('right-rule', 3), ('warn-priority', 3), ('car-check', 2), ('overtaking', 3),
        ('crossing', 3), ('signal-junctions', 1), ('speed', 3), ('bans', 3), ('motorway', 2),
        ('alcohol', 2), ('cyclists', 1), ('priority-test', 2), ('lanes', 3), ('accident', 1),
        ('markings', 1), ('special-test', 4), ('turns', 3), ('people-test', 3), ('distance', 3),
        ('parking', 2), ('traffic-lights', 2), ('weather', 2), ('belts', 3), ('breakdown', 2)],
}


def full(n):
    fa_n = FA_DIGITS[n]
    title = (f'آزمون کامل {fa_n}', f'Full test {n}', f'Fuld prøve {n}')
    return {'id': f'full-{n}', 'title': title,
            'intro': intro(title, TEXT, GOALS, EXAM_LINES),
            'summary': summary(POINTS, ('law', 'signs', 'plan')),
            'picks': PICKS[n]}


all_picks = [p for ps in PICKS.values() for p in ps]
assert all(len(ps) == 25 for ps in PICKS.values())
assert len(set(all_picks)) == len(all_picks), 'a question in two exams'
FULL = [full(1), full(2), full(3)]
