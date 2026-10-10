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
    'p-right-t': 'IMPORTANT: this is a T-junction with only THREE arms (left, right and bottom). Above the junction there is NO road at all: the top side is one continuous pavement with a lawn and houses behind it.',
    'pc-right': 'IMPORTANT: no traffic signs and no road markings at all at this junction.',
    's-c26-2': 'IMPORTANT: a thin red diagonal bar runs from the top left to the bottom right across the walking person, as on every Danish prohibition sign of this kind.',
    # From the review of 2026-10-10 (each picture was compared with the official design and the rule it teaches).
    's-a38': 'IMPORTANT: the symbol is a SOLID BLACK band of road along the bottom of the white field, from the left side of the triangle to the right side (like sign A 36 «bump»), but its top edge dips DOWN into one smooth, shallow hollow in the middle. It is not a thin line and it does not float in the middle of the sign.',
    's-f34-1': 'IMPORTANT: the hexagon is WHITE and the number inside it is RED (signal red), as on every Danish detour-route sign; the motorway symbol and the arrow are white on the green sign.',
    'p-order-signal': 'IMPORTANT: only TWO cars in the picture, the red one and the blue one, each in the RIGHT-hand lane of its road (right-hand traffic): the blue car driving up in the right half of the vertical road, the red car driving towards the right in the lower half of the horizontal road. No grey car, no other vehicles. The traffic lights of the vertical road show green, those of the horizontal road show red.',
    'p-turn-left': 'IMPORTANT: the traffic lights must match: the two lights of the vertical road (for the red car from the bottom and for the blue car from the top) both show GREEN; the two lights of the horizontal road show RED. No other vehicles than the red and the blue car. The blue car drives down in the LEFT half of the vertical road (its own right-hand lane), the red car came up in the RIGHT half.',
    'p-turn-two-left': 'IMPORTANT, the whole point of the picture: the two cars turn BEHIND each other, never in front of each other. The car from the bottom drives up its RIGHT-hand lane PAST the centre of the junction and only then turns left, passing ABOVE the centre point into the lane of the left arm nearer the top. The car from the top drives down its own lane (left half) PAST the centre and only then turns left (towards the right side of the picture), passing BELOW the centre point into the lane of the right arm nearer the bottom. So at the moment they meet, the car from the bottom has the other car on its LEFT, and the car from the top has the other car on its LEFT (driver side to driver side). The two arrows go round the centre point like two hooks that do not run alongside each other.',
    'p-signal-arrow': 'IMPORTANT, right-hand traffic: every road has two lanes towards the junction on its RIGHT half and two lanes away from it on its LEFT half, divided by a solid white centre line. The road from the bottom: in its RIGHT half a left-turn lane next to the centre line (a white arrow painted on it bending left) and a straight lane at the kerb; the blue car stands in that left-turn lane, right of the centre line, at its stop line, which runs across the RIGHT half only. The road from the top: the grey car waits at the stop line in the LEFT half of the picture (its own right-hand side), facing down; its lane arrows point down. Lane arrows are only in the lanes leading towards the junction and point in the direction of travel. The light for the blue car shows a green arrow to the left; the light of the grey car shows red.',
    'p-ped-cycle-street': 'IMPORTANT: the sign at the start of the street is the Danish cycle-street sign E 47 «Cykelgade»: a white rectangular zone sign with a black border holding a blue square with a white bicycle, the word "Cykelgade" above the bicycle and the word "Zone" below the blue square. No other sign and no sub-sign.',
    'p-yield-b11': 'IMPORTANT: the row of shark teeth runs only across the RIGHT half of the side road (the lane the red car is in, leading to the junction), not across the lane leaving the junction.',
    'pc-drill-right': 'IMPORTANT: an ordinary crossroads of two straight streets crossing at right angles, NOT a roundabout; no signs, no posts, no markings and no traffic lights at all.',
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
# The groups' picture keys (the card's thumbnail first), so a group can be ordered by name in data/art-orders.json.
groups = {c['id']: [c['thumb']] + [i['key'] for i in c['items']] for c in app['signs'] + app['priority']}
groups['signs'] = [k for c in app['signs'] for k in groups[c['id']]]
groups['priority'] = [k for c in app['priority'] for k in groups[c['id']]]
groups['thumbs'] = [c['thumb'] for c in app['signs'] + app['priority']]
json.dump(groups, open(os.path.join(ROOT, 'data/guide-groups.json'), 'w'), ensure_ascii=False, indent=0)
# Where each item's picture is on prove.dk (for the admin's side-by-side comparison; the files stay there until the admin
# imports them into the database). `official`: the official drawing (Wikimedia Commons «Denmark road
# sign …», public domain) exists for it, which the admin may choose for the app instead of the made picture.
src = json.load(open(os.path.join(HERE, 'prove-src.json')))
codes = {}
for x in src['signs']:
    codes.setdefault(norm(x['code']), []).append(x['img'])
# Official drawings on Commons under a name that does not follow «Denmark road sign <code>» (code → file). They are
# only offered as the official drawing, not used as a reference for the made picture (data/guide-ref is unchanged).
COMMONS = {'A72': 'Denmark_road_sign_A72.svg', 'E16.1': 'Denmark_road_sign_E16_1.svg', 'E16.2': 'Denmark_road_sign_E16_2.svg',
           'E19': 'Denmark_road_sign_E19-L.svg', 'E22.4': 'Denmark_road_sign_E22_4.svg', 'E69.9': 'E69_9.svg',
           'F34.2': 'Denmark_road_sign_F34_2.svg', 'F34.3': 'Denmark_road_sign_F34_3.svg'}
pmap = {}
for c in app['signs']:
    seen2 = {}
    for i in c['items']:
        urls = codes.get(norm(i['code']), [])
        n = seen2[i['code']] = seen2.get(i['code'], 0) + 1
        if len(urls) >= n:
            u = urls[n - 1]; name = u.rsplit('/', 1)[1]
            # The official drawing comes from Wikimedia Commons whenever it is there (data/guide-ref has it).
            ok = n == 1 and os.path.exists(os.path.join(REFS, norm(i['code']) + '.png'))
            commons = f"Denmark_road_sign_{norm(i['code'])}.svg" if ok else COMMONS.get(norm(i['code'])) if n == 1 else None
            pmap[i['key']] = {'url': u, 'official': bool(commons), **({'commons': commons} if commons else {})}
for x in src['priority']:
    k = f"p-drill-{x['id']}"
    if k in art: pmap[k] = {'url': x['picture'], 'official': False}
# Our own right-of-way rule pages have no picture of their own on prove.dk; where one of prove.dk's practice
# situations teaches the same thing, its picture stands beside the rule (prove.dk practice id).
RULE_PROVE = {'p-right-basic': 72, 'p-right-t': 67, 'p-right-left-turn': 77, 'p-right-three-cars': 71,
              'p-yield-b11': 81, 'p-yield-main': 80, 'p-turn-left': 92, 'p-turn-pedestrian': 88,
              'p-special-emergency': 53, 'p-special-tram': 63}
pics = {x['id']: x['picture'] for x in src['priority']}
for k, n in RULE_PROVE.items():
    if k in art and n in pics: pmap[k] = {'url': pics[n], 'official': False}
json.dump(pmap, open(os.path.join(ROOT, 'data/prove-map.json'), 'w'), ensure_ascii=False, indent=0)
print(len(pmap), 'pictures on prove.dk,', sum(1 for v in pmap.values() if v['official']), 'official drawings')
print(len(art), 'pictures,', sum(1 for a in art.values() if a.get('ref')), 'from an official drawing')
