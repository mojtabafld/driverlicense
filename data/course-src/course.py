# Helpers for writing the course's lessons («آموزش گام‌به‌گام») in three languages at once: every text the app shows is
# written (fa, en, da): the Persian goes into mobile/src/lib/course-more.ts, all three into strings.json (en, da), and the
# test questions keep their Danish (as in the exam) with its Persian and English. build.py puts it all together.
# Pictures: each one's prompt for the image model (data/course-art.json; build.py adds the new ones with "order": false,
# so they are made only when the admin orders them).
PROMPTS = {}

ABOVE = ("Educational driving diagram for a Danish driving-theory app, seen straight from above (bird's-eye view), the road "
         "filling most of the picture, right-hand traffic as in Denmark. Signs beside the road are drawn standing upright and "
         "turned towards the viewer so their faces are fully readable.")
ABOVE_STYLE = ("Style: a clean, precise flat vector illustration for a Danish driving-theory app, NOT photorealistic and NOT a 3D "
               "render: simple clean shapes, flat even colours, crisp edges, only very soft shadows, no decoration. Everything that "
               "matters for driving and for the exam (road layout, lane widths, every road marking, signs, vehicles, their positions, "
               "indicators and arrows) is drawn large, accurate, high-contrast and in the official Danish design; correct proportions "
               "(a car is about 4.5 m long, a lane about 3.5 m wide). Simple rounded cars seen from above. No text anywhere.")
VIEW = ("A theory-test illustration of a Danish driving situation, seen from the driver's seat of our car at eye height, looking "
        "straight ahead along our lane, a thin plain dark strip of our dashboard along the bottom edge (no steering wheel, no hands).")
PLAIN = 'Scenery is reduced to plain flat green verges and a few simple trees; no buildings.'
TOWN = 'Scenery is reduced to simple flat house fronts, pavements and a few trees.'


def view_style(cond='daylight, dry road, good visibility', scenery=PLAIN):
    return ("Style: a clean, precise illustration for a Danish driving-theory app, NOT photorealistic and NOT a 3D render: flat "
            f"vector look, simple shapes, flat colours, {cond}. Everything that matters for driving and for the exam (road layout, "
            "lanes, every road marking, signs, other road users, their positions, indicators and brake lights) is drawn large, "
            f"sharp, high-contrast, in correct perspective and in the official Danish design. {scenery} Right-hand traffic, as in "
            "Denmark. No text, letters or numbers anywhere except what is part of a sign's official design.")


def _put(key, text):
    assert key not in PROMPTS, key
    PROMPTS[key] = text


def above(key, body):
    """A diagram from above: the body names the layout, the signs, the road users (our car RED) and what must not appear."""
    _put(key, '\n'.join([ABOVE, body.strip(), ABOVE_STYLE]))


def view(key, body, cond='daylight, dry road, good visibility', scenery=PLAIN):
    """The road ahead from the driver's seat, as in the real test."""
    _put(key, '\n'.join([VIEW, body.strip(), view_style(cond, scenery)]))


def picture(key, text):
    """Any other picture: the whole prompt as it is."""
    _put(key, text.strip())


FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹'


def fa_num(s):
    return ''.join(FA_DIGITS[int(c)] if c.isdigit() else c for c in str(s))


def law(*parts):
    """A step's sources, e.g. law((41, 1), (41, 2), (42, None), 'C 55'): Færdselsloven's paragraphs with their stk.
    (one paragraph's stk. together: «§ 41، بند ۱ و ۲»; the law's name once) and sign or marking codes; a list
    [fa, en, da] is a part already in three languages."""
    groups = []
    for p in parts:
        if isinstance(p, tuple) and groups and isinstance(groups[-1], dict) and groups[-1]['para'] == p[0]:
            groups[-1]['stk'].append(p[1])
        elif isinstance(p, tuple):
            groups.append({'para': p[0], 'stk': [p[1]]})
        else:
            groups.append(p)
    fa, en, da = [], [], []
    named = False
    for g in groups:
        if isinstance(g, dict):
            name = '' if named else 'Færdselsloven '
            named = True
            stk = [x for x in g['stk'] if x]
            if not stk:
                fa.append(f'{name}§ {g["para"]}'); en.append(f'{name}§ {g["para"]}'); da.append(f'{name}§ {g["para"]}')
                continue
            if len(stk) >= 3 and stk == list(range(stk[0], stk[0] + len(stk))):   # a run: «۱ تا ۴»
                fa.append(f'{name}§ {g["para"]}، بند {fa_num(stk[0])} تا {fa_num(stk[-1])}')
                en.append(f'{name}§ {g["para"]}({stk[0]})-({stk[-1]})')
                da.append(f'{name}§ {g["para"]}, stk. {stk[0]}-{stk[-1]}')
                continue
            fa.append(f'{name}§ {g["para"]}، بند ' + ' و '.join(fa_num(x) for x in stk))
            en.append(f'{name}§ {g["para"]}' + ' and '.join(f'({x})' for x in stk))
            da.append(f'{name}§ {g["para"]}, stk. ' + ' og '.join(str(x) for x in stk))
        elif isinstance(g, list):
            fa.append(g[0]); en.append(g[1]); da.append(g[2])
        else:
            fa.append(g); en.append(g); da.append(g)
    return (' | '.join(fa), ' | '.join(en), ' | '.join(da))


SIGNS_BEK = 'Bekendtgørelse om vejafmærkning'

# The sources a lesson's summary lists (as course.ts's SOURCES, and some more).
SRC = {
    'law': ('Færdselsloven (قانون راهنمایی و رانندگی دانمارک)، retsinformation.dk', "Færdselsloven (the Danish Road Traffic Act), retsinformation.dk", 'Færdselsloven, retsinformation.dk'),
    'signs': ('Bekendtgørelse om vejafmærkning (مقررات تابلوها و خط‌کشی‌ها)، retsinformation.dk', 'Bekendtgørelse om vejafmærkning (the rules for road signs and markings), retsinformation.dk', 'Bekendtgørelse om vejafmærkning, retsinformation.dk'),
    'plan': ('Undervisningsplan for kategori B (برنامه‌ی رسمی آموزش گواهینامه‌ی B)، Færdselsstyrelsen، fstyr.dk', 'Undervisningsplan for kategori B (the official curriculum for the category B licence), Færdselsstyrelsen, fstyr.dk', 'Undervisningsplan for kategori B, Færdselsstyrelsen, fstyr.dk'),
    'vehicle': ('Detailforskrifter for køretøjer (مقررات فنی خودرو)، Færdselsstyrelsen، fstyr.dk', 'Detailforskrifter for køretøjer (the technical rules for vehicles), Færdselsstyrelsen, fstyr.dk', 'Detailforskrifter for køretøjer, Færdselsstyrelsen, fstyr.dk'),
    'firstaid': ('Dansk Førstehjælpsråd: چهار اصل کمک‌های اولیه، førstehjælpsråd.dk', "Dansk Førstehjælpsråd: first aid's four main points, førstehjælpsråd.dk", 'Dansk Førstehjælpsråd: Førstehjælpens fire hovedpunkter, førstehjælpsråd.dk'),
    'animals': ('borger.dk: تصادف با حیوان (Påkørsel af dyr)', 'borger.dk: hitting an animal (Påkørsel af dyr)', 'borger.dk: Påkørsel af dyr'),
}


def intro(title, text, goals, exam):
    return {'kind': 'intro', 'title': title, 'text': text, 'goals': goals, 'exam': exam}


def teach(title, text, art=None, rule=None, law=None, points=None, trap=None):
    d = {'kind': 'teach', 'title': title}
    if art: d['art'] = art
    d['text'] = text
    if rule: d['rule'] = rule
    if law: d['law'] = law
    if points: d['points'] = points
    if trap: d['trap'] = trap
    return d


def st(ok, da, en, fa, why):
    """One statement of a test question: right or not, in Danish (as in the exam), English and Persian, and why
    (fa, en, da)."""
    return {'ok': ok, 'da': da, 'en': en, 'fa': fa, 'why': why}


def q(art, da, en, fa, *statements, rule=None):
    """A test question in the exam's format; `rule`: which teaching step (0, 1, …) it asks about (for «تمرین هوشمند»)."""
    d = {'kind': 'exam'}
    if art: d['art'] = art
    d.update({'da': da, 'en': en, 'fa': fa, 'statements': list(statements), 'rule': rule})
    return d


def result(mx):
    return {'kind': 'result', 'max': mx}


def summary(points, sources=('law', 'plan')):
    return {'kind': 'summary', 'points': points, 'sources': [SRC[s] for s in sources]}


def lesson(id, const, title, minutes, steps):
    return {'id': id, 'const': const, 'title': title, 'minutes': minutes, 'steps': steps}
