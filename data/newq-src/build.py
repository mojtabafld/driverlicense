# Builds «آزمون جدید» (the new test) from the batch files beside this one (b01a.py … b11d.py: 11 batches of 100
# questions, each written in four files of 25):
# - site/newq.js: window.NEWQ = { questions: [...] }, each question in site/data.js's shape (id, img, c, sda, sfa, sen and
#   st: da, fa, ok, eda, efa, en, een), served like data.js to signed-in users only, and l: the lesson or page of «آموزش»
#   that teaches it (learn.py; "" when none does), which the topic sheet's «رفتن به آموزش» opens;
# - data/newq-art.json: each question's picture prompt for the image model, a new one with "order": false (made only when
#   the admin orders it; an order already given, and the prompt's other fields, are kept).
# Run: python3 -B data/newq-src/build.py
import importlib
import json
import os
import random
import re
import sys
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
sys.path.insert(0, HERE)

import learn  # noqa: E402
import nq  # noqa: E402

BATCHES = sorted(f[:-3] for f in os.listdir(HERE) if re.fullmatch(r'b\d\d[a-z]?\.py', f))
OUT_JS = os.path.join(ROOT, 'site', 'newq.js')
ART_JSON = os.path.join(ROOT, 'data', 'newq-art.json')
PERSIAN = re.compile('[؀-ۿ]')
FIRST, LAST = 5001, 6100

PREFIX = {True: ('Ja. ', 'Yes. ', 'بله. '), False: ('Nej. ', 'No. ', 'خیر. ')}

# Questions whose text changed after they were published: their number of changes («rev», as in site/data.js), so the AI's
# lessons and topic points cached for the old text (lesson.js qkey) are written again. 6025: 1812, not 1-1-2 (2026-10-23).
REV = {6025: 1}


def check(q, errors, warn):
    k = q['id']
    if not FIRST <= k <= LAST: errors.append(f'{k}: number outside {FIRST}-{LAST}')
    if q['c'] not in nq.CODES: errors.append(f'{k}: unknown subsection {q["c"]}')
    if not 2 <= len(q['st']) <= 4: errors.append(f'{k}: {len(q["st"])} statements')
    for lang, t in (('da', q['da']), ('en', q['en'])):
        if not t.strip() or PERSIAN.search(t): errors.append(f'{k}: question {lang}')
    if not PERSIAN.search(q['fa']): errors.append(f'{k}: question fa has no Persian')
    if not q['da'].rstrip().endswith('?'): warn.append(f'{k}: the Danish question does not end with «?»')
    if not q['pic'] or len(q['pic']) < 200: errors.append(f'{k}: picture prompt missing or too short')
    seen = set()
    for j, s in enumerate(q['st'], 1):
        wda, wen, wfa = s['why']
        for lang, t in (('da', s['da']), ('en', s['en']), ('why da', wda), ('why en', wen)):
            if not t.strip() or PERSIAN.search(t): errors.append(f'{k}.{j}: {lang}')
        for lang, t in (('fa', s['fa']), ('why fa', wfa)):
            if not PERSIAN.search(t): errors.append(f'{k}.{j}: {lang} has no Persian')
        if s['da'] in seen: errors.append(f'{k}.{j}: the same statement twice')
        seen.add(s['da'])
        for t in (wda, wen, wfa):
            if re.match(r'^(Ja|Nej|Yes|No|بله|خیر)[.،,]', t.strip()): errors.append(f'{k}.{j}: «why» starts with its own Ja/Nej')


def order(q):
    """The statements in a fixed order of their own, so that the right ones are not always the first (as they are written):
    a shuffle seeded by the question's number, the same at every build while the number of statements stays the same (the
    answers people gave are stored by position)."""
    k = list(range(len(q['st'])))
    random.Random(q['id']).shuffle(k)
    return [q['st'][i] for i in k]


def out(q):
    st = []
    for s in order(q):
        pda, pen, pfa = PREFIX[s['ok']]
        wda, wen, wfa = s['why']
        st.append({'da': s['da'], 'fa': s['fa'], 'ok': 1 if s['ok'] else 0, 'eda': pda + wda, 'efa': pfa + wfa, 'en': s['en'], 'een': pen + wen})
    return {'id': q['id'], 'img': f'newq-art/{q["id"]}.png', 'c': q['c'], 'sda': q['da'], 'sfa': q['fa'], 'sen': q['en'], 'st': st,
            'l': learn.lesson_for(q) or '', **({'rev': REV[q['id']]} if q['id'] in REV else {})}


def main():
    for m in BATCHES:
        importlib.import_module(m)
    qs = sorted(nq.QUESTIONS, key=lambda q: q['id'])
    errors, warn = [], []
    ids = Counter(q['id'] for q in qs)
    errors += [f'{k}: number used {n} times' for k, n in ids.items() if n > 1]
    texts = Counter(q['da'] + '|' + '|'.join(s['da'] for s in q['st']) for q in qs)
    errors += [f'the same question twice: {t[:80]}' for t, n in texts.items() if n > 1]
    for q in qs:
        check(q, errors, warn)
        l = learn.lesson_for(q)
        if l is not None and l not in learn.LESSONS and l not in learn.PAGES: errors.append(f'{q["id"]}: unknown lesson {l}')
    for w in warn:
        print('note:', w)
    if errors:
        for e in errors:
            print('ERROR:', e)
        sys.exit(1)
    os.makedirs(os.path.dirname(OUT_JS), exist_ok=True)
    with open(OUT_JS, 'w', encoding='utf-8') as f:
        f.write('window.NEWQ=' + json.dumps({'questions': [out(q) for q in qs]}, ensure_ascii=False, separators=(',', ':')) + ';\n')
    arts = json.load(open(ART_JSON, encoding='utf-8')) if os.path.exists(ART_JSON) else {}
    added = changed = 0
    for q in qs:
        k = str(q['id'])
        if k not in arts:
            arts[k] = {'aspect': '4:3', 'prompt': q['pic'], 'order': False}; added += 1
        elif arts[k]['prompt'] != q['pic']:
            arts[k]['prompt'] = q['pic']; changed += 1
    open(ART_JSON, 'w', encoding='utf-8').write(json.dumps(arts, ensure_ascii=False, indent=2) + '\n')
    st = Counter(len(q['st']) for q in qs)
    right = Counter(sum(1 for s in q['st'] if s['ok']) for q in qs)
    topics = Counter(q['c'] for q in qs)
    where = Counter(i for q in qs for i, s in enumerate(order(q), 1) if s['ok'])
    print(f'{len(qs)} questions ({os.path.getsize(OUT_JS) // 1024} KB); pictures: {added} new, {changed} changed')
    print('statements per question:', dict(sorted(st.items())), '| right statements per question:', dict(sorted(right.items())),
          '| right statements by place:', dict(sorted(where.items())))
    print('by subsection:', ', '.join(f'{c} {n}' for c, n in sorted(topics.items(), key=lambda x: [int(p) for p in x[0].split('.')])))
    links = Counter(learn.lesson_for(q) or '(none)' for q in qs)
    print('lessons:', ', '.join(f'{l} {n}' for l, n in links.most_common()))


if __name__ == '__main__':
    main()
