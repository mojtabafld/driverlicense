# Run: python3 data/guide-src/build.py .   (from the repository root)
# Writes the app's teaching data (mobile/src/lib/guide-data.json) and the server's picture prompts (data/guide-art.json)
# from signs.py and priority.py.
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = sys.argv[1]
exec(open(os.path.join(HERE, 'signs.py')).read())
exec(open(os.path.join(HERE, 'priority.py')).read())

SIGN_STYLE = ('Educational picture for a Danish driving-theory app, made to teach what a road sign looks like. A clean flat vector '
  'illustration, NOT photorealistic: exactly ONE Danish road sign, drawn large, centred and seen straight from the front, mounted '
  'on a short plain grey post, on a plain very light grey background (#f2f3f5). Follow the official Danish design (Bekendtgørelse '
  'om vejafmærkning) precisely: the exact shape, border width, colours (signal red #d0021b, white, black, blue #0059a8, yellow '
  '#ffd200) and proportions; draw the symbol clearly with bold, simple, accurate shapes so every detail can be recognised. No '
  'scenery, no other objects, no people, only a very soft shadow, no watermark, no logo, and no text except what the sign itself '
  'carries (numbers or the word STOP when described).')
SCENE_STYLE = ('Educational picture for a Danish driving-theory app. A clean, detailed flat vector illustration, NOT photorealistic, '
  'with simple shapes, soft flat colours and clear outlines, so the important detail is easy to see. Right-hand traffic (Denmark). '
  'No watermark, no logo, and no text except what is described.')
PRIORITY_STYLE = ('Educational right-of-way diagram for a Danish driving-theory app. A clean, detailed flat vector illustration, '
  'NOT photorealistic, seen straight from above (bird\'s-eye view): roads in medium grey with Danish white road markings, green '
  'verges and pavements in light grey, simple rounded cars seen from above, right-hand traffic (Denmark). Colour code, used '
  'strictly: the vehicle that has right of way is a BLUE car with a SOLID GREEN arrow showing its path; the vehicle that must '
  'give way is a RED car with a DASHED ORANGE arrow that stops before the conflict point; other cars are grey; pedestrians wear '
  'yellow; cyclists wear purple. Signs at the roadside drawn small but recognisable in their official Danish design. Keep it '
  'uncluttered with plenty of space around the important part. No text, no letters, no numbers, no watermark, no logo.')

app = {'signs': [], 'priority': []}
art = {}
for c in S:
    items = []
    for i in c['items']:
        items.append({k: i[k] for k in ('key', 'code', 'da', 'fa', 'text')})
        scene = c['id'] in ('M', 'X')
        art[i['key']] = {
            'aspect': '4:3' if scene else '1:1',
            'prompt': (SCENE_STYLE + '\n' + i['look']) if scene else
                      (SIGN_STYLE + '\nThe sign: Danish road sign ' + i['code'] + ' «' + i['da'] + '». Its official design: ' + i['look']),
        }
    app['signs'].append({'id': c['id'], 'title': c['title'], 'intro': c['intro'], 'shape': c['shape'], 'items': items})
for c in P:
    items = []
    for i in c['items']:
        items.append({k: i[k] for k in ('key', 'title', 'text', 'first', 'law')})
        art[i['key']] = {'aspect': '4:3', 'prompt': PRIORITY_STYLE + '\nThe situation: ' + i['scene']}
    app['priority'].append({'id': c['id'], 'title': c['title'], 'intro': c['intro'], 'items': items})

app['sources'] = ('Bekendtgørelse om vejafmærkning (BEK nr. 1632 af 20/12/2017 med senere ændringer; BEK nr. 425 af 13/04/2023) '
                  'og færdselsloven (LBK nr. 168 af 14/02/2023), retsinformation.dk')
json.dump(app, open(os.path.join(ROOT, 'mobile/src/lib/guide-data.json'), 'w'), ensure_ascii=False, indent=1)
json.dump(art, open(os.path.join(ROOT, 'data/guide-art.json'), 'w'), ensure_ascii=False, indent=1)
print(len(art), 'pictures')
