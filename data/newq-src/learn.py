# Which part of «آموزش» teaches each question of «آزمون جدید»: a lesson of the course («آموزش گام‌به‌گام», its id in
# mobile/src/lib/course.ts and course-more.ts) or a page beside it (the road signs; a part of the rules page, by its
# index in mobile/src/lib/guide.ts RULES), which the topic sheet's «رفتن به آموزش» opens for the question
# (mobile/src/ui/topic-sheet.tsx). The question's subsection decides first; then what the question is about, from its
# words (and its picture prompt for the signs it shows): situations the course has a lesson of its own for (an accident,
# an emergency vehicle, a fault on the car, an animal, a child, a cyclist, traffic lights, a roundabout …) go to that
# lesson. LINK names the questions the words place wrongly; None: no lesson teaches it, so the sheet shows no button.
# Every question's lesson was checked by hand (2026-10-23), with the lessons that teach what the questions ask.
import re

LESSONS = {'car-check', 'belts', 'alcohol', 'lane-position', 'speed', 'distance', 'right-rule', 'turns', 'signal-junctions',
           'roundabout', 'warn-priority', 'bans', 'markings', 'traffic-lights', 'overtaking', 'lanes', 'parking', 'crossing',
           'cyclists', 'vulnerable', 'motorway', 'darkness', 'weather', 'emergency', 'accident', 'breakdown'}
SIGNS = '/signs'
PHONE, PARKING_RULES, LICENCE = '/rules?open=4', '/rules?open=7', '/rules?open=10'
PAGES = {SIGNS, PHONE, PARKING_RULES, LICENCE}

# The subsection's own lesson, when nothing in the question points elsewhere.
TOPIC = {
    '1.2': 'car-check', '3.2': 'distance', '4.4': 'alcohol', '4.5': 'vulnerable', '5.1': 'lane-position', '5.2': 'weather',
    '6.1': SIGNS, '6.2': 'accident', '7.1': 'parking', '7.2': 'lane-position', '7.3': 'speed', '7.4': 'lanes',
    '7.5': 'parking', '7.6': 'lane-position', '7.7': 'lane-position', '7.8': 'distance', '7.9': 'overtaking',
    '7.10': 'speed', '7.11': 'right-rule', '7.12': 'right-rule', '7.13': 'turns', '7.14': 'turns', '7.15': 'roundabout',
    '7.16': 'motorway', '7.17': 'lanes', '7.18': 'parking', '7.19': 'darkness', '7.20': 'darkness', '8.1': 'alcohol',
    '10.3': LICENCE,
}


def _rx(*words):
    return re.compile('|'.join(words), re.I)


ANIMAL = _rx(r'rådyr', r'\bdyr(et|ene)?\b', r'\bheste?n?\b', r'hestevogn', r'(?<!cykel)rytter', r'ridende', r'\bgæs\b',
             r'\bkøer(ne)?\b', r'\bfår (går|på|og)', r'fårene', r'kreatur', r'\bhund', r'\bkat\b', r'\band med', r'ællinger')
EMERGENCY = _rx(r'udrykning', r'blå blink', r'blåt blink', r'sirene', r'ambulance', r'brandbil', r'politibil', r'hvid dug',
                r'ligtog', r'optog', r'kolonne')
PASSING = _rx(r'uheldssted', r'har været et uheld', r'er sket et uheld')          # driving past an accident
ACCIDENT = _rx(r'\buheld', r'ulykke', r'kommet til skade', r'tilskadekom', r'bevidstløs', r'førstehjælp', r'1-1-2',
               r'kører .{0,40} ned og kører videre', r'ridse', r'påkør', r'sammenstød', r'i grøften', r'ligger en person')
FAULT = _rx(r'går i stå', r'gået i stå', r'motorstop', r'springer det ene', r'speederen', r'røg og en brandlugt',
            r'motorrummet', r'udstødningsgas', r'(lampe|lampen)\b.{0,40}(lyse|lyser)', r'advarselslampe', r'bremsepedalen',
            r'trækker .{0,20}til den ene side', r'rattet .{0,30}ryste', r'gynger', r'skrabende lyd', r'temperaturmåleren',
            r'kontrollampen', r'går i stykker', r'gået i stykker', r'punktering', r'punkteret')
BELT = _rx(r'sikkerhedssele', r'\bselen\b', r'autostol', r'barnestol', r'selepude', r'135 cm', r'nakkestøtte',
           r'bagudvendt')
DRIVER = _rx(r'promille', r'alkohol', r'drukket', r'\bøl\b', r'medicin', r'\bhash\b', r'cannabis', r'\btræt', r'søvnig',
             r'sovepille', r'feber', r'bedøvelse', r'dråber', r'høfeber', r'\bvred\b', r'kaffekop')
PHONE_RX = _rx(r'telefon', r'mobil', r'headset', r'\bsms')
CHILD = _rx(r'\bbarn', r'børn', r'skole', r'ældre', r'\bblind', r'hvid stok', r'førerhund', r'kørestol', r'rollator',
            r'barnevogn', r'halloween', r'\bbold\b')
BUS = _rx(r'\bbus(sen)?\b.{0,40}stoppested', r'stoppestedet', r'letbane')
CYCLE = _rx(r'(?<!motor)cykl', r'(?<!motor)cykel', r'knallert', r'elløbehjul', r'ladcykel')
PED = _rx(r'fodgængerfelt', r'fodgænger', r'gående', r'\bløbere', r'skateboard', r'rulleskøjter', r'paraply',
          r'mange mennesker', r'folk går', r'personer bærer', r'passager .{0,30}går', r'vinduespudser', r'flok unge')
DARK = _rx(r'\bmørk', r'fjernlys', r'nærlys', r'blænd', r'\bnat\b', r'natten')
ICE = _rx(r'isglat', r'\bglat', r'\bsne\b', r'sneen', r'skrid', r'spinde', r'spinner')
LIGHT_MEANING = _rx(r'skifter til gult', r'rødt og gult', r'skifter fra grønt til gult', r'cykelsymbol', r'busbane',
                    r'blinksignal', r'lyser rødt', r'bliver ved med at være rødt')
LIGHTS = _rx(r'lyssignal', r'signalet', r'\bsignal\b', r'grønt lys', r'rødt lys', r'gult lys', r'\bgrønt\b', r'\brødt\b',
             r'\bgult\b', r'grøn pil', r'rød pil', r'lyskryds', r'blinksignal', r'lyser rødt', r'lyser gult')
NO_LIGHTS = _rx(r'uden lyssignal', r'ingen lyssignal')
LEVEL = _rx(r'jernbaneoverkørsel', r'halvbomme', r'bommene')
UNMARKED = _rx(r'(ingen|uden|hverken) (tavler|tavle)( eller| og)? (hajtænder|afmærkning)?', r'uden tavler')
PRIORITY_SIGN = _rx(r'vigepligtstavle', r'hajtænder', r'stoptavle', r'hovedvej', r'ubetinget vigepligt', r'vigepligt')
PRIORITY_PIC = _rx(r'give-way', r'shark', r'stop sign', r'main-road sign', r'main road', r'yellow diamond', r'warning sign',
                   r'warning triangle')
MARKING = _rx(r'spærrelinje', r'ubrudte? (hvide )?linje', r'punkteret linje', r'midterlinje', r'kantlinje', r'spærreflade',
              r'skraveret', r'malet', r'kantpæle', r'riller', r'brummer', r'vognbanelinje', r'varslingslinje')
LOAD = _rx(r'trailer', r'campingvogn', r'påhængs', r'tagboks', r'tagbøjler', r'cykelholder', r'\blast\b', r'lasten',
           r'kasser', r'haveaffald', r'stige ')
TUNNEL = _rx(r'tunnel')
ROUND = _rx(r'rundkørsel')
STOP_SIGN = _rx(r'standsningsforbud', r'parkeringsforbud', r'standsning forbudt', r'parkering forbudt')

# Questions the words place wrongly: id -> lesson, page, or None (no lesson teaches it).
LINK = {
    # the car (1.2)
    5325: 'car-check', 5425: 'car-check', 5938: 'car-check', 5943: 'breakdown',
    # other road users (4.5)
    5249: 'turns', 5697: 'distance', 5889: 'distance', 5890: 'parking',
    # roads (5.1, 5.2)
    5300: SIGNS, 5397: 'speed', 5498: 'markings', 5597: 'speed', 5698: 'markings', 5848: 'motorway', 5689: 'lane-position',
    # signs, markings and signals (6.1)
    5835: SIGNS, 5917: 'traffic-lights', 6004: SIGNS, 5216: SIGNS, 5639: SIGNS, 5342: 'traffic-lights', 5815: 'motorway',
    5116: 'bans',
    # general rules (6.2)
    5079: 'signal-junctions', 5190: 'vulnerable', 5250: 'lanes', 5294: 'motorway', 5388: 'vulnerable', 5590: PHONE,
    5793: None, 5886: None, 5888: None, 5887: 'car-check', 5944: LICENCE, 6037: 'accident',
    # moving off and stopping at the kerb (7.1)
    5781: 'motorway',
    # position (7.2)
    5286: 'markings', 6049: 'markings', 5288: 'markings', 5679: 'markings', 5381: 'bans', 5382: 'markings',
    5584: 'cyclists', 5680: 'markings', 5985: 'cyclists',
    # speed (7.3)
    5322: 'distance', 5995: 'distance', 5321: 'distance', 5420: 'distance', 5522: 'distance', 5723: 'crossing',
    5350: 'warn-priority', 5525: 'motorway', 5843: LICENCE, 5845: 'breakdown',
    # passing road users and stationary vehicles (7.6)
    5535: 'right-rule', 5620: 'crossing', 5816: 'crossing', 5925: 'overtaking', 5343: 'distance', 5219: 'parking',
    5926: 'vulnerable',
    # meeting (7.7)
    5200: 'warn-priority', 5367: 'warn-priority', 5773: 'warn-priority', 5673: 'warn-priority', 5368: 'crossing',
    5572: 'traffic-lights', 5876: 'cyclists',
    # overtaking (7.9)
    5432: 'overtaking', 5734: 'overtaking', 5831: 'overtaking', 5911: 'overtaking', 6033: 'cyclists', 5207: 'markings',
    5208: 'markings', 5308: 'markings', 5511: 'markings', 5508: 'markings', 5510: 'markings', 5810: 'markings',
    # approaching and crossing junctions (7.11, 7.12)
    5770: 'warn-priority', 5865: 'right-rule', 5866: 'traffic-lights', 5173: 'roundabout', 5372: 'lanes',
    6001: 'right-rule', 5555: 'warn-priority', 5653: 'markings', 5229: 'crossing', 5043: 'crossing', 5755: 'overtaking',
    5856: 'vulnerable', 5951: 'right-rule', 6082: 'traffic-lights', 5752: 'right-rule', 5955: 'speed',
    5753: 'warn-priority', 5158: 'traffic-lights', 5554: 'traffic-lights',
    # turns and roundabouts (7.13–7.15)
    5463: 'right-rule', 5562: 'right-rule', 5862: 'speed', 5863: 'right-rule', 5462: 'warn-priority',
    5238: 'warn-priority', 5563: 'warn-priority', 5964: 'warn-priority', 5857: 'warn-priority', 5664: 'darkness',
    6021: 'turns', 5247: 'roundabout',
    # motorway (7.16)
    5990: 'alcohol', 5067: 'lanes', 5882: 'lanes', 6064: 'warn-priority', 5685: SIGNS,
    # stopping and parking (7.18)
    5329: 'parking', 5330: SIGNS, 5402: 'parking', 5706: SIGNS, 6016: SIGNS, 6076: SIGNS, 5006: PARKING_RULES,
    5106: 'bans', 5126: 'bans', 5502: 'bans', 5629: 'bans', 5205: SIGNS, 5204: SIGNS, 5802: SIGNS, 6010: SIGNS,
    5427: SIGNS, 5504: SIGNS, 5530: SIGNS, 5606: SIGNS, 5603: SIGNS, 5705: SIGNS, 5728: 'bans', 5805: SIGNS,
    5626: 'speed', 5627: 'speed', 5727: 'markings', 5828: 'motorway', 6035: SIGNS, 5630: SIGNS,
    # special risks (8.1)
    5175: 'belts', 5849: 'car-check',
    # second look (2026-10-23)
    5743: 'crossing', 5063: 'warn-priority', 5968: 'breakdown', 5228: 'right-rule', 5645: 'bans', 5622: SIGNS,
}


def lesson_for(q):
    """q: a question as nq.QUESTIONS has it (id, c, da, pic, st with da). The lesson or page that teaches it, or None."""
    k = q['id']
    if k in LINK:
        return LINK[k]
    c, text, pic = q['c'], q['da'], q.get('pic', '')
    if c == '10.3':
        return LICENCE
    # situations with a lesson of their own, whatever the subsection
    if ANIMAL.search(text):
        return 'vulnerable'
    if EMERGENCY.search(text) or PASSING.search(text):
        return 'emergency'
    if ACCIDENT.search(text) and c in ('6.2', '7.6', '7.16'):
        return 'accident'
    if FAULT.search(text) and c in ('1.2', '6.2', '7.16'):
        return 'breakdown'
    if BELT.search(text) and c in ('1.2', '8.1'):
        return 'belts'
    if DRIVER.search(text) and c in ('4.4', '8.1', '6.2'):
        return 'alcohol'
    if PHONE_RX.search(text) and c == '8.1':
        return PHONE
    if TUNNEL.search(text):
        return 'darkness'
    # by subsection, refined by what the question is about
    if c in ('7.13', '7.14'):
        if ROUND.search(text): return 'roundabout'
        if LIGHTS.search(text) and not NO_LIGHTS.search(text): return 'signal-junctions'
        return 'turns'
    if c in ('7.11', '7.12'):
        if ROUND.search(text): return 'roundabout'
        if LEVEL.search(text): return 'traffic-lights' if re.search(r'blink|lys', text, re.I) and not NO_LIGHTS.search(text) else 'breakdown'
        if LIGHT_MEANING.search(text): return 'traffic-lights'
        if LIGHTS.search(text) and not NO_LIGHTS.search(text): return 'signal-junctions'
        if UNMARKED.search(text): return 'right-rule'
        if PRIORITY_SIGN.search(text): return 'warn-priority'
        if 'tavle' in text and PRIORITY_PIC.search(pic): return 'warn-priority'
        return 'right-rule'
    if c == '6.1':
        if LIGHTS.search(text): return 'traffic-lights'
        if MARKING.search(text): return 'markings'
        return SIGNS
    if c in ('7.6', '4.5'):
        if CHILD.search(text) or BUS.search(text): return 'vulnerable'
        if CYCLE.search(text): return 'cyclists'
        if DARK.search(text): return 'darkness'
        if PED.search(text): return 'crossing'
        return TOPIC[c]
    if c == '7.9':
        return 'cyclists' if CYCLE.search(text) else 'overtaking'
    if c == '7.7':
        return 'darkness' if DARK.search(text) else 'lane-position'
    if c == '7.3':
        if CHILD.search(text): return 'vulnerable'
        if DARK.search(text): return 'darkness'
        if ICE.search(text): return 'weather'
        return 'speed'
    if c == '7.1':
        if CHILD.search(text) or BUS.search(text): return 'vulnerable'
        if ICE.search(text): return 'weather'
        return 'parking'
    if c == '7.18':
        return 'bans' if STOP_SIGN.search(text) else 'parking'
    if c == '8.1':
        return 'car-check' if LOAD.search(text) else 'alcohol'
    if c == '1.2':
        return 'car-check'
    return TOPIC[c]
