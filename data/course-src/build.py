# Builds the course's newer lessons from the chapter files beside this one (ch2.py … ch8.py, tests.py; old.py has the
# translations of texts changed in course.ts's own lessons):
# - writes their pictures' prompts into data/course-art.json (a new one with "order": false: made by the image model only
#   when the admin orders it; until then the lesson shows the placeholder);
# - writes mobile/src/lib/course-more.ts: the lessons in Persian (as course.ts), each chapter's list, the rule each test
#   question asks about (for «تمرین هوشمند»), the simulated exams' questions and the questions' English;
# - adds every Persian text with its English and Danish to mobile/src/lib/i18n/strings.json (keeping those already there).
# Run: python3 data/course-src/build.py
import importlib
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
sys.path.insert(0, HERE)

from course import PROMPTS  # noqa: E402

MODULES = ['ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'ch8', 'tests', 'old']
OUT_TS = os.path.join(ROOT, 'mobile', 'src', 'lib', 'course-more.ts')
STRINGS = os.path.join(ROOT, 'mobile', 'src', 'lib', 'i18n', 'strings.json')
PERSIAN = re.compile('[؀-ۿ]')

STR = {}     # Persian -> (English, Danish)
EN = {}      # a question's Danish -> its English
notes = []


def tri(t):
    if isinstance(t, str):
        return t
    fa, en, da = t
    if PERSIAN.search(fa):
        if fa in STR and STR[fa] != (en, da):
            notes.append(f'two translations for «{fa}»: {STR[fa]} / {(en, da)}')
        STR.setdefault(fa, (en, da))
    return fa


def q_en(da, en, fa):
    if da in EN and EN[da] != en:
        notes.append(f'two English texts for «{da}»')
    EN.setdefault(da, en)
    if PERSIAN.search(fa):
        STR.setdefault(fa, (en, da))


def ts(v, ind=0):
    """A value as TypeScript source, single-quoted strings, objects one key per line where long."""
    sp = '  ' * ind
    if isinstance(v, bool):
        return 'true' if v else 'false'
    if isinstance(v, (int, float)):
        return str(v)
    if isinstance(v, str):
        return "'" + v.replace('\\', '\\\\').replace("'", "\\'") + "'"
    if isinstance(v, list):
        if not v:
            return '[]'
        items = [ts(x, ind + 1) for x in v]
        one = '[' + ', '.join(items) + ']'
        if len(one) + len(sp) < 110 and '\n' not in one:
            return one
        return '[\n' + ''.join(f'{sp}  {x},\n' for x in items) + f'{sp}]'
    if isinstance(v, dict):
        key = lambda k: k if re.fullmatch(r'[A-Za-z_$][A-Za-z0-9_$]*', k) else ts(k)
        items = [f'{key(k)}: {ts(x, ind + 1)}' for k, x in v.items()]
        one = '{ ' + ', '.join(items) + ' }'
        if len(one) + len(sp) < 110 and '\n' not in one:
            return one
        return '{\n' + ''.join(f'{sp}  {x},\n' for x in items) + f'{sp}}}'
    raise TypeError(type(v))


def step_out(s):
    k = s['kind']
    if k == 'intro':
        return {'kind': 'intro', 'title': tri(s['title']), 'text': tri(s['text']), 'goals': [tri(x) for x in s['goals']], 'exam': [tri(x) for x in s['exam']]}
    if k == 'teach':
        d = {'kind': 'teach', 'title': tri(s['title'])}
        if 'art' in s: d['art'] = s['art']
        d['text'] = tri(s['text'])
        for f in ('rule', 'law', 'trap'):
            if f in s:
                d[f] = tri(s[f])
        if 'points' in s:
            d['points'] = [tri(x) for x in s['points']]
        # keep the field order of course.ts: title, art, text, rule, law, points, trap
        order = ['kind', 'title', 'art', 'text', 'rule', 'law', 'points', 'trap']
        return {f: d[f] for f in order if f in d}
    if k == 'exam':
        q_en(s['da'], s['en'], s['fa'])
        d = {'kind': 'exam'}
        if 'art' in s: d['art'] = s['art']
        d['da'] = s['da']; d['fa'] = s['fa']
        sts = []
        for x in s['statements']:
            q_en(x['da'], x['en'], x['fa'])
            sts.append({'da': x['da'], 'fa': x['fa'], 'ok': x['ok'], 'why': tri(x['why'])})
        d['statements'] = sts
        return d
    if k == 'result':
        return {'kind': 'result', 'max': s['max']}
    if k == 'summary':
        return {'kind': 'summary', 'points': [tri(x) for x in s['points']], 'sources': [tri(x) for x in s['sources']]}
    raise ValueError(k)


def check(lesson):
    """Each test question's statements, the pictures named and the rules pointed to."""
    steps = lesson['steps']
    teach = [s for s in steps if s['kind'] == 'teach']
    for s in steps:
        if s['kind'] == 'exam':
            assert len(s['statements']) >= 2, (lesson['id'], s['da'])
            if s.get('rule') is not None:
                assert 0 <= s['rule'] < len(teach), (lesson['id'], s['da'])
        if s.get('art'):
            if s['art'] not in PROMPTS and s['art'] not in OLD_ART:
                notes.append(f'{lesson["id"]}: no picture «{s["art"]}»')


ART_JSON = os.path.join(ROOT, 'data', 'course-art.json')
OLD_ART = set(json.load(open(ART_JSON)).keys())


def main():
    args = sys.argv[1:]
    mods = []
    for m in MODULES:
        if os.path.exists(os.path.join(HERE, m + '.py')):
            mods.append(importlib.import_module(m))
    chapters = {}
    consts = []
    rules = {}
    full = []
    for m in mods:
        for l in getattr(m, 'LESSONS', []):
            check(l)
            chapters.setdefault(m.CHAPTER, []).append(l['const'])
            consts.append(l)
            r = [s.get('rule') for s in l['steps'] if s['kind'] == 'exam']
            if any(x is not None for x in r):
                rules[l['id']] = [-1 if x is None else x for x in r]
        full += getattr(m, 'FULL', [])
        for t in getattr(m, 'TEXTS', []):   # texts of course.ts's own lessons (old.py)
            tri(t)
    # the pictures' prompts
    used = {s['art'] for l in consts for s in l['steps'] if s.get('art')}
    used |= {k for m in mods for k in getattr(m, 'OWN_ART', [])}   # course.ts's own lessons' new pictures (old.py)
    arts = json.load(open(ART_JSON))
    added = changed = 0
    for k, text in PROMPTS.items():
        if k not in used:
            notes.append(f'picture «{k}» is not used')
            continue
        if k not in arts:
            arts[k] = {'aspect': '4:3', 'prompt': text, 'order': False}
            added += 1
        elif arts[k]['prompt'] != text:
            arts[k]['prompt'] = text
            changed += 1
    open(ART_JSON, 'w').write(json.dumps(arts, ensure_ascii=False, indent=2) + '\n')
    print(f'{len(PROMPTS)} picture prompts: {added} new, {changed} changed')
    # the TypeScript
    out = ['// Generated by data/course-src/build.py from the chapter files beside it (the lessons, their pictures and their',
           '// English and Danish): edit those, not this file. The lessons of chapters 2-8 and the simulated exams of chapter 9,',
           "// in Persian as course.ts's own; their texts' English and Danish are in i18n/strings.json.",
           "import type { CourseLesson } from './course';", '']
    for l in consts:
        obj = {'id': l['id'], 'title': tri(l['title']), 'minutes': l['minutes'], 'steps': [step_out(s) for s in l['steps']]}
        out.append(f'const {l["const"]}: CourseLesson = {ts(obj)};\n')
    out.append('// Each chapter\'s new lessons, after its own in course.ts.')
    out.append('export const MORE: Record<string, CourseLesson[]> = {')
    for ch, cs in chapters.items():
        out.append(f'  {ch}: [{", ".join(cs)}],')
    out.append('};\n')
    out.append('// The teaching step (its index among the lesson\'s teach steps) each test question asks about, for «تمرین هوشمند».')
    out.append(f'export const MORE_RULES: Record<string, number[]> = {ts(rules)};\n')
    out.append('// The simulated exams (chapter 9): their texts, and their questions by lesson and number (1 = its first test question).')
    fx = []
    for e in full:
        fx.append({'id': e['id'], 'title': tri(e['title']), 'intro': step_out(e['intro']), 'summary': step_out(e['summary']),
                   'picks': [[a, b] for a, b in e['picks']]})
    out.append(f'export const FULL: {{ id: string; title: string; intro: Extract<CourseLesson[\'steps\'][number], {{ kind: \'intro\' }}>; summary: Extract<CourseLesson[\'steps\'][number], {{ kind: \'summary\' }}>; picks: [string, number][] }}[] = {ts(fx)};\n')
    out.append('// The test questions\' English, by their Danish (lib/course-en.ts).')
    out.append('export const MORE_EN: Record<string, string> = {')
    for da, en in EN.items():
        out.append(f'  {ts(da)}:\n    {ts(en)},')
    out.append('};')
    open(OUT_TS, 'w').write('\n'.join(out) + '\n')
    # the translations
    have = json.load(open(STRINGS))
    new = {fa: [en, da] for fa, (en, da) in STR.items() if fa not in have}
    differ = [(fa, have[fa], [en, da]) for fa, (en, da) in STR.items() if fa in have and have[fa] != [en, da]]
    if new:
        src = open(STRINGS).read().rstrip()
        assert src.endswith('}')
        body = src[:-1].rstrip()
        add = ',\n'.join(f'{json.dumps(fa, ensure_ascii=False)}:{json.dumps(v, ensure_ascii=False)}' for fa, v in new.items())
        open(STRINGS, 'w').write(body + ',\n' + add + '\n}\n')
    print(f'{len(consts)} lessons, {len(STR)} texts ({len(new)} new in strings.json, {len(differ)} kept as they were)')
    for fa, old, mine in differ:
        print('  kept:', fa, old, '| here:', mine)
    for n in notes:
        print('note:', n)


if __name__ == '__main__':
    main()
