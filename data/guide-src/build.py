# Writes the app's teaching data (mobile/src/lib/guide-data.json) and the server's picture prompts (data/guide-art.json)
# from catalog.py (all signs, by group), signs.py (the texts written first, reused by code), priority.py (the rules of
# right of way) and situations.py (the practice situations).
# A sign with an official drawing in data/guide-ref/<code>.png (public domain, from Wikimedia Commons) is drawn from it
# (image to image); the others from their `look`. Every group also gets a thumbnail for its card.
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, '..', '..')
for f in ('signs.py', 'catalog.py', 'priority.py', 'situations.py'):
    exec(open(os.path.join(HERE, f)).read())

SIGN_STYLE = ('Educational picture for a Danish driving-theory app, made to teach what a road sign looks like. A clean flat vector '
  'illustration, NOT photorealistic: exactly ONE Danish road sign (or the one marking or signal described), drawn large and centred, '
  'seen straight from the front; a sign stands on a short plain grey post; the background is plain very light grey (#f2f3f5). '
  'Follow the official Danish design (Bekendtgørelse om vejafmærkning) precisely: the exact shape, border width, colours (signal '
  'red #d0021b, white, black, blue #0059a8, green #00a651, yellow #ffd200) and proportions; draw every symbol clearly with bold, '
  'simple, accurate shapes. No scenery, no other objects, no people, only a very soft shadow, no watermark, no logo, and no text '
  'except what the sign itself carries.')
REF_STYLE = ('Redraw the road sign in the reference image as a clean flat vector illustration for a Danish driving-theory app, NOT '
  'photorealistic. Keep the sign EXACTLY as in the reference: the same shape, border, colours, symbol, numbers and letters, with '
  'nothing added, removed, mirrored or changed. Draw it large and centred, seen straight from the front, standing on a short plain '
  'grey post (a sub-sign plate or a pictogram is drawn alone, without a post), on a plain very light grey background (#f2f3f5), '
  'with only a very soft shadow. No scenery, no other objects, no watermark, no logo, no extra text.')
MARK_STYLE = ('Educational picture for a Danish driving-theory app. A clean flat vector illustration, NOT photorealistic, with simple '
  'shapes and clear outlines, so the important detail is easy to see. Right-hand traffic (Denmark). No people, no watermark, no '
  'logo, and no text except what is described.')
PRIORITY_STYLE = ('Educational right-of-way diagram for a Danish driving-theory app. A clean, detailed flat vector illustration, '
  'NOT photorealistic, seen straight from above (bird\'s-eye view): roads in medium grey with Danish white road markings, green '
  'verges and pavements in light grey, simple rounded cars seen from above, right-hand traffic (Denmark). Colour code, used '
  'strictly: the vehicle that has right of way is a BLUE car with a SOLID GREEN arrow showing its path; the vehicle that must '
  'give way is a RED car with a DASHED ORANGE arrow that stops before the conflict point; other cars are grey; pedestrians wear '
  'yellow; cyclists wear purple. Signs at the roadside drawn small but recognisable in their official Danish design. Keep it '
  'uncluttered with plenty of space around the important part. No text, no letters, no numbers, no watermark, no logo.')
DRILL_STYLE = ('Educational right-of-way practice picture for a Danish driving-theory app. A clean, detailed flat vector '
  'illustration, NOT photorealistic, seen from above at a steep bird\'s-eye angle: grey streets, light grey pavements, green '
  'lawns and a few simple houses and trees at the corners, right-hand traffic (Denmark). Every road user is drawn clearly and '
  'large enough to recognise, and each has ONE thick translucent arrow in its own colour showing exactly the path it will take '
  '(straight on, or turning left or right as described). No numbers, no letters, no text, no watermark, no logo.')
THUMB_STYLE = ('Style: a modern, minimal 3D illustration like the cards of a premium mobile app: only a few simple objects, clean '
  'rounded geometric shapes, smooth matte materials with a soft clay look, soft studio light, subtle soft shadows, no clutter. '
  'The objects are centred with generous empty space around them, on one plain soft pale background colour with no gradient '
  'and no floor line. Danish traffic signs follow their official design (shape and colours). No readable text, no letters, no '
  'numbers unless described, no logos, no watermarks, no faces.')
THUMB_BG = ['#d9efe3', '#e3e1f5', '#f6e1d3', '#d8e8f6', '#f6efcf', '#d3eeee', '#f5dbe2', '#dfe9d6', '#dde2f7', '#efe5d8']

# Thumbnails of the right-of-way rule groups written first (priority.py).
PRIORITY_THUMB = {
    'order': 'A small rounded crossroads seen from above at an isometric angle with a traffic light at one corner and a tiny traffic police officer in a yellow vest in the middle raising one arm.',
    'right': 'A small rounded crossroads without markings seen from above at an isometric angle; a rounded blue car comes from the right and a rounded red car waits at the bottom; a curved arrow shows the blue car passing first.',
    'yield': 'A small rounded junction seen from above at an isometric angle with a row of white shark-teeth triangles across the side road, an inverted white give-way triangle sign with a red border and a yellow diamond main-road sign at the corners.',
    'exit': 'A rounded car slowly leaving a small driveway across a light grey pavement onto a street, a tiny pedestrian and a cyclist passing in front of it.',
    'turn': 'A small rounded crossroads seen from above at an isometric angle; a rounded car turning left waits in the middle while an oncoming car goes straight and a cyclist rides straight beside it.',
    'signals': 'A rounded traffic light on a short pole glowing green beside a small rounded crossroads seen from above, with a tiny green arrow light on a second pole.',
    'round': 'A small rounded roundabout seen from above at an isometric angle with a green island in the middle, two rounded cars circling and one waiting at the white shark teeth at an entry.',
    'people': 'A white zebra crossing on a small piece of road with a tiny pedestrian crossing and a rounded car stopped before it, a cyclist on a blue cycle lane beside.',
    'special': 'A rounded white ambulance with a glowing blue light driving through a small crossroads while a rounded car waits at the side, a small yellow tram on tracks behind.',
    'lanes': 'A short piece of motorway seen from above at an isometric angle where two lanes merge into one, rounded cars taking turns like a zipper.',
    'meet': 'A narrow single-lane bridge on a small road seen from above at an isometric angle, a rounded car crossing it and another rounded car waiting at its end beside a small round sign.',
}

PRIORITY_BLURB = {
    'order': 'پلیس، چراغ، تابلو و بعد قوانین عمومی.', 'right': 'در تقاطع بی‌علامت، به راستی راه بدهید.',
    'yield': 'دندان کوسه، ایست و جاده‌ی اصلی.', 'exit': 'خروج از پارکینگ، حیاط و مسیر خاکی.',
    'turn': 'گردش به چپ و راست و راه دادن به دیگران.', 'signals': 'چراغ سبز، فلش و چراغ زرد چشمک‌زن.',
    'round': 'ورود، حرکت و خروج از میدان.', 'people': 'گذرگاه عابر، دوچرخه و ایستگاه اتوبوس.',
    'special': 'امدادی، اتوبوس، قطار و تراموا.', 'lanes': 'ادغام زیپی، تغییر خط و ورود به بزرگراه.',
    'meet': 'وقتی جا برای عبور هر دو نیست.',
    'drill-right': 'ترتیب عبور در تقاطع بدون علامت.', 'drill-yield': 'ترتیب عبور با دندان کوسه.',
    'drill-special': 'امدادی، تراموا و ستون نظامی.',
}

# Notes added to a picture's prompt after looking at what the model drew (key → note), for details it got wrong.
FIX = {
    's-a41-2': 'IMPORTANT: the black line is a smooth, rounded curve bending to the LEFT, with no sharp corner.',
    's-a42-2': 'IMPORTANT: from the bottom the black line goes up and its FIRST bend goes to the LEFT, then it bends to the right: the exact mirror image of sign A 42,1. Do not draw the first bend to the right.',
    's-c26-2': 'IMPORTANT: a thin red diagonal bar runs from the top left to the bottom right across the walking person, as on every Danish prohibition sign of this kind.',
}

def norm(code):
    return re.sub(r'\s', '', code).replace(',', '.')

def key_of(code, seen):
    k = 's-' + norm(code).lower().replace('.', '-')
    seen[k] = seen.get(k, 0) + 1
    return k if seen[k] == 1 else f'{k}-{seen[k]}'

OLD = {norm(i['code']): i for c in S for i in c['items']}
REFS = os.path.join(ROOT, 'data', 'guide-ref')
SCENE_CATS = {'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'V', 'X', 'Y', 'Z'}   # markings and signals: drawn from text as scenes

app = {'signs': [], 'priority': []}
art = {}
seen = {}
bg = 0
def thumb(k, prompt):
    global bg
    art[k] = {'aspect': '4:3', 'prompt': f'Background: one plain soft pale colour ({THUMB_BG[bg % len(THUMB_BG)]}). {prompt}\n{THUMB_STYLE}'}
    bg += 1

for c in C:
    items = []
    for x in c['items']:
        if isinstance(x, str):
            o = OLD[norm(x)]
            x = {'code': norm(x), 'da': o['da'], 'fa': o['fa'], 'text': o['text'], 'look': o['look']}
        k = key_of(x['code'], seen)
        items.append({'key': k, 'code': x['code'], 'da': x['da'], 'fa': x['fa'], 'text': x['text']})
        ref = f"{norm(x['code'])}.png"
        if os.path.exists(os.path.join(REFS, ref)) and not k.endswith('-2') and c['id'] not in SCENE_CATS:
            art[k] = {'aspect': '4:3', 'ref': ref,
                      'prompt': f"{REF_STYLE}\nThe sign: Danish road sign {x['code']} «{x['da']}». Its official design: {x['look']}"}
        elif c['id'] in SCENE_CATS or x['look'].startswith('a short piece of grey asphalt'):
            art[k] = {'aspect': '4:3', 'prompt': f"{MARK_STYLE}\nDanish {x['code']} «{x['da']}»: {x['look']}"}
        else:
            art[k] = {'aspect': '4:3', 'prompt': f"{SIGN_STYLE}\nThe sign: Danish road sign {x['code']} «{x['da']}». Its official design: {x['look']}"}
    thumb('c-' + c['id'].lower(), c['thumb'])
    app['signs'].append({'id': c['id'], 'title': c['title'], 'blurb': c['blurb'], 'intro': c['intro'], 'thumb': 'c-' + c['id'].lower(), 'items': items})

def pcat(c, style, tprompt):
    items = []
    for i in c['items']:
        items.append({k: i[k] for k in ('key', 'title', 'text', 'first', 'law')})
        art[i['key']] = {'aspect': '4:3', 'prompt': style + '\nThe situation: ' + i['scene']}
    thumb('pc-' + c['id'], tprompt)
    app['priority'].append({'id': c['id'], 'title': c['title'], 'blurb': PRIORITY_BLURB[c['id']],
                            'intro': c['intro'], 'thumb': 'pc-' + c['id'], 'items': items})
for c in P:
    pcat(c, PRIORITY_STYLE, PRIORITY_THUMB[c['id']])
for c in O:
    pcat(c, DRILL_STYLE, c['thumb'])

app['sources'] = ('Bekendtgørelse om vejafmærkning (BEK nr. 1632 af 20/12/2017 med senere ændringer) og færdselsloven '
                  '(LBK nr. 168 af 14/02/2023), retsinformation.dk')
json.dump(app, open(os.path.join(ROOT, 'mobile/src/lib/guide-data.json'), 'w'), ensure_ascii=False, indent=1)
for k, note in FIX.items():
    art[k]['prompt'] += '\n' + note
# The cards' thumbnails first, so the group pages look complete early; then the items in page order.
art = {**{k: v for k, v in art.items() if k.startswith(('c-', 'pc-'))}, **{k: v for k, v in art.items() if not k.startswith(('c-', 'pc-'))}}
json.dump(art, open(os.path.join(ROOT, 'data/guide-art.json'), 'w'), ensure_ascii=False, indent=1)
print(len(art), 'pictures,', sum(1 for a in art.values() if a.get('ref')), 'from an official drawing')
