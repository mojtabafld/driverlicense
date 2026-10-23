# Chapter 5 «مانورها» (after course.ts's overtaking and lane changes): stopping and parking, reversing and turning round,
# pulling out from the kerb, and the chapter's test. Rules from Færdselsloven §§ 2 (nr. 18), 18 stk. 1–2, 21, 26 stk. 3,
# 28, 29, 32 stk. 2 and 46 stk. 2 and Bekendtgørelse om vejafmærkning § 60.
from course import SIGNS_BEK, TOWN, above, intro, law, lesson, q, result, st, summary, teach, view

# ---------- pictures (prompts for the image model) ----------
above('park-side', """
THE SCENE: a straight two-way town street running from the bottom to the top of the picture, one lane in each direction, a white broken centre line, light grey pavements with kerbs on both sides, a few trees on the pavements.
VEHICLES (colour code used strictly):
- a RED car (ours) parked correctly on the RIGHT-hand side of the street, facing up (the driving direction), parallel and close to the kerb;
- at the LEFT-hand kerb a faint semi-transparent ghost of a car parked facing UP, that is against the direction of the lane it stands in, crossed out by a red X in a white circle (wrong side);
- on the right-hand pavement a faint semi-transparent ghost of a car parked with two wheels up on the pavement, crossed out by a red X in a white circle;
- a BLUE car driving up the street in the right-hand lane.
MUST NOT APPEAR: signs, people, text, letters, numbers, left-hand traffic.
""")

above('park-bans', """
THE SCENE: a town crossroads seen from above: a two-way street comes up from the bottom of the picture to the junction; along its right-hand kerb there is first a bus stop (a bus-stop sign on a pole on the pavement and a waiting shelter), then further up a pedestrian crossing (zebra crossing with broad white stripes) across the street, then the junction with a crossing street running from left to right. Pavements with kerbs, small lawns.
MARKS: along the right-hand kerb, the stretches where STOPPING is forbidden are shown as semi-transparent RED strips on the road beside the kerb: a strip on both sides of the bus-stop sign; a strip on the zebra crossing and just before it; a strip from the edge of the crossing street back along our street. Between these red strips, the free stretches of kerb are shown with semi-transparent GREEN strips, and a RED car (ours) is parked in one of the green stretches, parallel to the kerb.
MUST NOT APPEAR: other vehicles, people, other signs, text, letters, numbers, left-hand traffic.
""")

above('park-yellow', """
THE SCENE: a straight two-way town street running from the bottom to the top of the picture, one lane in each direction, a white broken centre line, light grey pavements with kerbs. Along the LEFT-hand kerb runs a continuous SOLID YELLOW line painted on the kerb edge (Danish T 61: stopping forbidden); along the RIGHT-hand kerb runs a BROKEN (dotted) YELLOW line (Danish T 62: parking forbidden). Halfway up the right-hand side, a driveway into a property (a lowered kerb), where the yellow line is interrupted.
VEHICLES AND PEOPLE (colour code used strictly):
- a RED car (ours) stopped briefly at the right-hand kerb beside the dotted yellow line, its hazard lights flashing, a passenger stepping out onto the pavement;
- no car stands in front of the driveway and none along the solid yellow line;
- a BLUE car driving down the street in its lane.
MUST NOT APPEAR: signs, other vehicles, text, letters, numbers, left-hand traffic.
""")

above('park-door', """
THE SCENE: a straight two-way town street running from the bottom to the top of the picture, a white broken centre line, light grey pavements, cars parked along the right-hand kerb.
VEHICLES AND PEOPLE (colour code used strictly):
- a RED car (ours) parked at the right-hand kerb in the middle of the picture; its driver's door (on the left side, towards the traffic) is still CLOSED; a thin yellow dashed arc beside the driver's door shows where the door would swing out;
- a cyclist riding up the street close to the parked cars, about two car lengths behind the red car, with a SOLID GREEN arrow along its path, right past the red car's driver's door;
- other parked cars in GREY in front of and behind the red car.
MUST NOT APPEAR: signs, other moving vehicles, text, letters, numbers, left-hand traffic.
""")

view('exam-park-crossing', """
THE SCENE: a straight two-way town street, one lane in each direction, a white broken centre line, pavements with kerbs. About 15 m ahead a pedestrian crossing (zebra crossing with broad white stripes) crosses the street, with the Danish pedestrian-crossing sign E 17 on the right: an upright square blue sign with a white triangle showing a black walking person on a crossing. Along the right-hand kerb there is a free stretch of kerb right up to the crossing; the cars parked along the kerb stand further back, well before it.
ROAD USERS: no pedestrians on the crossing; no other moving road users.
MUST NOT APPEAR: other signs, yellow lines, text.
""", scenery=TOWN)

above('exam-park-junction', """
THE SCENE: a town crossroads of two straight two-way streets with one lane in each direction, white broken centre lines, light grey pavements with kerbs and small lawns at the corners. No signs, no yellow lines.
VEHICLES (colour code used strictly): a RED car (ours) parked at the right-hand kerb of the bottom street, facing up, with its front only about one car length away from the corner of the crossing street, so it partly hides the view into the junction; a BLUE car coming from the crossing street on the right.
MUST NOT APPEAR: arrows, people, signs, text, letters, numbers, left-hand traffic.
""")

view('exam-park-yellow', """
THE SCENE: a quiet town street with houses; we drive slowly in the right-hand lane looking for a place to stop. Along the right-hand kerb, painted on the kerb edge, runs a BROKEN (dotted) YELLOW line (Danish T 62) for the whole stretch ahead; there are no cars parked along it and no signs.
ROAD USERS: none.
MUST BE CLEARLY VISIBLE: the dotted yellow line along the kerb on the right.
MUST NOT APPEAR: signs, solid yellow lines, other road users, text.
""", scenery=TOWN)

above('exam-man-rail-park', """
THE SCENE: a two-way country road running from the bottom to the top of the picture, a white broken centre line, plain green verges; near the top a single railway track crosses the road at a level crossing with red-and-white barriers (raised) and, on the right, the Danish level-crossing cross mark A 74 (a white cross with a red border) on a post. A white stop line across the right-hand lane before the rails.
VEHICLES (colour code used strictly): a RED car (ours) parked at the right edge of the road only about three car lengths before the level crossing, facing up.
MUST NOT APPEAR: trains, arrows, other vehicles, people, other signs, text, letters, numbers, left-hand traffic.
""")


# ---------- the lessons ----------
# The two steps added after the check of «آزمون جدید»'s questions against the lessons (2026-10-23).
above('park-reverse', """
THE SCENE: a residential street running from left to right across the upper part of the picture, with a pavement along its near side; a short driveway leads down from the pavement to a house at the bottom of the picture, with tall green hedges on both sides of the driveway that hide the pavement from it.
VEHICLES AND PEOPLE (colour code used strictly):
- a RED car (ours) in the driveway, its front towards the house, reversing slowly out towards the street with its white reversing lights on; it has stopped with its rear just before the pavement;
- on the pavement, a woman pushing a pram is about to pass right behind the red car, hidden from the driveway by the hedge; a thin yellow dashed line from the red car's driver's seat back over the shoulder to the woman shows the driver looking back;
- a GREY car driving along the street from the left;
- a short SOLID GREEN arrow from the red car's rear back to the edge of the pavement, where it waits.
MUST NOT APPEAR: signs, text, letters, numbers, left-hand traffic.
""")

above('park-pullout', """
THE SCENE: a straight two-way town street running from the bottom to the top of the picture, one lane in each direction, a white broken centre line, pavements with kerbs on both sides, cars parked along the right-hand kerb.
VEHICLES AND PEOPLE (colour code used strictly):
- a RED car (ours) standing at the right-hand kerb in the upper half of the picture, ready to pull out: its LEFT indicator flashing orange, its front wheels still straight; a thin yellow dashed line from the driver's seat back over the left shoulder shows the driver checking the blind spot;
- a cyclist riding up the street at the right side of the lane, just behind the red car, and a BLUE car further back in the same lane, both with SOLID GREEN arrows going straight on past the red car (they go first);
- a short DASHED ORANGE arrow from the red car's front out into the lane: the move it waits with;
- GREY parked cars in front of and behind the red car.
MUST NOT APPEAR: signs, text, letters, numbers, left-hand traffic.
""")

PARKING = lesson('parking', 'PARKING', ('توقف و پارک', 'Stopping and parking', 'Standsning og parkering'), 10, [
    intro(('توقف و پارک (standsning og parkering)', 'Stopping and parking (standsning og parkering)', 'Standsning og parkering'),
          ('آزمون می‌پرسد کجا می‌توانید بایستید و کجا پارک کنید: فاصله تا گذرگاه عابر، تقاطع، ایستگاه اتوبوس و ریل قطار، خط‌های زرد کنار جدول و این‌که در را چطور باز کنید.',
           'The test asks where you may stop and where you may park: the distance to pedestrian crossings, junctions, bus stops and level crossings, the yellow lines at the kerb, and how to open the door.',
           'Prøven spørger, hvor du må standse, og hvor du må parkere: afstanden til fodgængerfelter, kryds, busstoppesteder og jernbaneoverkørsler, de gule linjer ved kantstenen, og hvordan du åbner døren.'),
          [('فرق توقف و پارک را بدانید.', 'Know the difference between stopping and parking.', 'Kende forskellen på standsning og parkering.'),
           ('فاصله‌های ۵، ۱۰، ۱۲ و ۳۰ متری را بدانید.', 'Know the distances of 5, 10, 12 and 30 m.', 'Kende afstandene på 5, 10, 12 og 30 m.'),
           ('سمت درست پارک و باز کردن بی‌خطر در را بدانید.', 'Know the right side for parking and how to open the door safely.', 'Kende den rigtige side at parkere i, og hvordan du åbner døren sikkert.')],
          [('پیاده کردن مسافر نزدیک گذرگاه عابر.', 'Letting a passenger out near a pedestrian crossing.', 'At sætte en passager af ved et fodgængerfelt.'),
           ('خودروی پارک‌شده نزدیک تقاطع.', 'A car parked close to a junction.', 'En bil, der er parkeret tæt ved et kryds.'),
           ('خط زرد کنار جدول: توقف ممنوع یا پارک ممنوع.', 'A yellow line at the kerb: no stopping or no parking.', 'Gul linje ved kantstenen: standsning eller parkering forbudt.')]),
    teach(('توقف یا پارک؟ و کجای خیابان', 'Stopping or parking, and where in the street', 'Standsning eller parkering, og hvor på vejen'),
          ('هر بار که خودرو را، با یا بدون راننده، نگه می‌دارید، پارک است؛ مگر توقفِ کمتر از ۳ دقیقه، یا توقف برای سوار و پیاده کردن مسافر یا بار زدن و خالی کردن بار. پارک و توقف در سمت راست خیابان در جهت حرکت، موازی و نزدیک جدول است؛ در خیابان یک‌طرفه و جاده‌ی کم‌رفت‌وآمد سمت چپ هم مجاز است. روی مسیر دوچرخه، پیاده‌رو، جزیره و نوار جداکننده‌ی میان سواره‌رو و پیاده‌رو (skillerabat) نه؛ فقط بیرون شهر خودروی تا ۳۵۰۰ کیلوگرم می‌تواند بخشی از خود را روی پیاده‌رو یا آن نوار جداکننده بگذارد.',
           'Every time you leave the car standing, with or without a driver, it is parking, except a stop of less than 3 minutes, or a stop to let passengers in or out or to load or unload goods. You stop and park on the right-hand side of the road in the driving direction, parallel and close to the kerb; in one-way streets and on quiet roads also on the left. Not on a cycle path, a pavement, an island or the separating verge between the road and the pavement (skillerabat); only outside built-up areas may a vehicle of up to 3,500 kg stand partly on the pavement or that separating verge.',
           'Enhver hensætning af bilen, med eller uden fører, er parkering, bortset fra standsning under 3 minutter og standsning for af- og påstigning eller af- og pålæsning af gods. Du standser og parkerer i højre side af vejen i kørselsretningen, parallelt med og tæt ved kantstenen; på ensrettede og mindre trafikerede veje også i venstre side. Ikke på cykelsti, fortov, helle eller skillerabat; kun uden for tættere bebygget område må et køretøj på højst 3.500 kg holde med en del af sig på fortovet eller skillerabatten.'),
          art='park-side',
          rule=('پارک: سمت راست، موازی جدول؛ توقف کمتر از ۳ دقیقه و برای مسافر یا بار، پارک حساب نمی‌شود.', 'Park on the right, parallel to the kerb; a stop of under 3 minutes or for passengers or goods is not parking.', 'Parkér i højre side, parallelt med kantstenen; standsning under 3 minutter eller for passagerer eller gods er ikke parkering.'),
          law=law((28, 2), (28, 3), ['§ 2، شماره‌ی ۱۸', '§ 2(18)', '§ 2, nr. 18']),
          trap=('«کوتاه روی پیاده‌رو می‌ایستم» در شهر غلط است؛ روی پیاده‌رو و مسیر دوچرخه توقف هم ممنوع است.', '«I stand briefly on the pavement» is wrong in town; even stopping on a pavement or cycle path is forbidden.', '«Jeg holder kort på fortovet» er forkert i byen; også standsning på fortov og cykelsti er forbudt.')),
    teach(('جاهایی که توقف هم ممنوع است', 'Where even stopping is forbidden', 'Hvor også standsning er forbudt'),
          ('در این جاها حتی برای پیاده کردن مسافر هم نباید بایستید: روی گذرگاه عابر و تا ۵ متر پیش از آن؛ در تقاطع و تا ۱۰ متر از نزدیک‌ترین لبه‌ی سواره‌روی متقاطع؛ در ایستگاه اتوبوس، روی بخش خط‌کشی‌شده یا تا ۱۲ متر دو طرف تابلو؛ روی تقاطع راه‌آهن؛ جایی که تابلو یا چراغ را می‌پوشانید؛ روی پل بزرگراه، زیرگذر و تونل؛ روی سربالایی یا نزدیکش و در پیچ با دید کم. در تصویر، نوارهای قرمز جاهای ممنوع و نوارهای سبز جاهای آزادند.',
           'In these places you must not stop, not even to let a passenger out: on a pedestrian crossing and up to 5 m before it; in a junction and up to 10 m from the nearest edge of the crossing carriageway; at a bus stop, on its marked stretch or up to 12 m on both sides of the sign; on a level crossing; where you hide a sign or a light; on a bridge over a motorway, a viaduct or in a tunnel; on or near a hilltop and in a blind bend. In the picture the red strips are the forbidden places and the green ones the free ones.',
           'Disse steder må du ikke standse, heller ikke for at sætte en passager af: på fodgængerfelt og 5 m før det; i vejkryds og inden for 10 m fra den tværgående kørebanes nærmeste kant; ved busstoppested på den afmærkede strækning eller 12 m på hver side af skiltet; på jernbaneoverkørsel; hvor du dækker for en tavle eller et signal; på bro over motorvej, viadukt eller i tunnel; på eller nær en bakketop og i et uoverskueligt sving. På billedet er de røde strimler forbudte steder og de grønne frie.'),
          art='park-bans',
          rule=('توقف ممنوع: گذرگاه عابر و ۵ متر پیش از آن، تقاطع و ۱۰ متر، ایستگاه اتوبوس و ۱۲ متر دو طرف تابلو.', 'No stopping: a pedestrian crossing and 5 m before it, a junction and 10 m, a bus stop and 12 m on both sides of the sign.', 'Standsning forbudt: fodgængerfelt og 5 m før, vejkryds og 10 m, busstoppested og 12 m på hver side af skiltet.'),
          law=law((29, 1), (29, 2)),
          trap=('«فقط یک لحظه برای پیاده کردن مسافر پیش از گذرگاه می‌ایستم» غلط است؛ آن‌جا توقف هم ممنوع است.', '«I stop for just a moment before the crossing to let a passenger out» is wrong; even stopping is forbidden there.', '«Jeg standser kun et øjeblik før fodgængerfeltet for at sætte en passager af» er forkert; også standsning er forbudt der.')),
    teach(('جاهایی که فقط پارک ممنوع است', 'Where only parking is forbidden', 'Hvor kun parkering er forbudt'),
          ('در این جاها توقف کوتاه مجاز است، ولی پارک نه: نزدیک‌تر از ۳۰ متر به تقاطع راه‌آهن؛ جلوی ورودی و خروجی ملک؛ روی سواره‌روی جاده‌ی اصلی بیرون شهر؛ کنار خودروی دیگری که لب جدول ایستاده (پارک دوبل)؛ و جایی که راه خودروی دیگری را می‌بندید. خط زرد ممتد کنار جدول (T 61) یعنی توقف ممنوع و خط زرد بریده (T 62) یعنی پارک ممنوع.',
           'In these places a short stop is allowed, but parking is not: closer than 30 m to a level crossing; in front of an entrance or exit to a property; on the carriageway of a main road outside built-up areas; beside another vehicle standing at the kerb (double parking); and where you block another vehicle\'s way. A solid yellow line at the kerb (T 61) means no stopping, and a broken yellow line (T 62) means no parking.',
           'Disse steder må du godt standse kort, men ikke parkere: nærmere end 30 m fra en jernbaneoverkørsel; ud for ind- og udkørsel til ejendom; på kørebanen på hovedvej uden for tættere bebygget område; ved siden af et andet køretøj ved kantstenen (dobbeltparkering); og hvor du spærrer for et andet køretøj. En ubrudt gul linje ved kantstenen (T 61) betyder standsning forbudt, og en punkteret gul linje (T 62) betyder parkering forbudt.'),
          art='park-yellow',
          rule=('زرد ممتد (T 61): توقف ممنوع؛ زرد بریده (T 62): پارک ممنوع؛ ۳۰ متر از ریل قطار پارک نکنید.', 'Solid yellow (T 61): no stopping; broken yellow (T 62): no parking; no parking within 30 m of a level crossing.', 'Ubrudt gul (T 61): standsning forbudt; punkteret gul (T 62): parkering forbudt; parkér ikke inden for 30 m fra en jernbaneoverkørsel.'),
          law=law((29, 3), [f'{SIGNS_BEK} § 60', f'{SIGNS_BEK} § 60', f'{SIGNS_BEK} § 60'], 'T 61 | T 62'),
          trap=('«خط زرد بریده یعنی توقف هم ممنوع» غلط است؛ فقط پارک ممنوع است و پیاده کردن مسافر مجاز است.', '«A broken yellow line means no stopping either» is wrong; only parking is forbidden, and letting a passenger out is allowed.', '«En punkteret gul linje betyder også standsning forbudt» er forkert; kun parkering er forbudt, og du må godt sætte en passager af.')),
    teach(('در را با احتیاط باز کنید', 'Open the door with care', 'Åbn døren forsigtigt'),
          ('در را طوری باز کنید و طوری پیاده و سوار شوید که برای کسی خطر یا مزاحمتی پیش نیاید. پیش از باز کردن در، در آینه و از روی شانه به عقب نگاه کنید؛ دوچرخه‌سوار ممکن است درست کنار در شما باشد. وقتی از خودرو دور می‌شوید، آن را طوری مهار کنید که راه نیفتد (ترمز دستی) و قفلش کنید.',
           'Open the door and get in and out in such a way that it causes no danger or trouble to anyone. Before opening the door, look in the mirror and back over your shoulder; a cyclist may be right beside your door. When you leave the car, secure it so that it cannot start rolling (handbrake) and lock it.',
           'Åbn døren og stig ind og ud, så det ikke giver fare eller ulempe for nogen. Før du åbner døren, ser du i spejlet og tilbage over skulderen; en cyklist kan være lige ved din dør. Når du forlader bilen, sikrer du den, så den ikke kan begynde at køre (håndbremse), og låser den.'),
          art='park-door',
          rule=('پیش از باز کردن در، از روی شانه به عقب نگاه کنید.', 'Look back over your shoulder before you open the door.', 'Se tilbage over skulderen, før du åbner døren.'),
          law=law((28, 4), (28, 5)),
          trap=('«فقط در آینه نگاه می‌کنم» کافی نیست؛ دوچرخه‌سوار ممکن است در نقطه‌ی کور باشد.', '«I only look in the mirror» is not enough; a cyclist may be in the blind spot.', '«Jeg kigger kun i spejlet» er ikke nok; en cyklist kan være i den blinde vinkel.')),
    teach(('دنده‌عقب و دور زدن', 'Reversing and turning round', 'Bakning og vending'),
          ('پیش از دنده‌عقب یا دور زدن مطمئن شوید که برای دیگران خطر یا مزاحمتی ندارد. از روی شانه‌ها به عقب نگاه کنید، نه فقط در آینه یا دوربین، و آهسته دنده‌عقب بروید؛ اگر پشت خودرو را نمی‌بینید، کسی را برای راهنمایی بیاورید یا پیاده شوید و نگاه کنید. جایی که خیابان پهن است، رو به جلو و به چپ دور بزنید؛ وگرنه از یک فرعی، پارکینگ یا ورودی ملک استفاده کنید.',
           'Before you reverse or turn round, make sure it causes no danger or inconvenience to others. Look back over your shoulders, not only in the mirrors or at the camera, and reverse slowly; if you cannot see behind the car, get someone to guide you or get out and look. Where the road is wide enough, turn round forwards to the left; otherwise use a side road, a car park or a driveway.',
           'Før du bakker eller vender, skal du sikre dig, at det kan ske uden fare eller ulempe for andre. Se tilbage over skuldrene, ikke kun i spejlene eller på kameraet, og bak langsomt; kan du ikke se bag bilen, så få en til at dirigere dig, eller stig ud og se efter. Hvor vejen er bred nok, vender du forlæns til venstre; ellers bruger du en sidevej, en parkeringsplads eller en indkørsel.'),
          art='park-reverse',
          rule=('پیش از دنده‌عقب و دور زدن مطمئن شوید بی‌خطر است و از روی شانه نگاه کنید؛ در بزرگراه هرگز.', 'Before reversing or turning round, make sure it is safe and look over your shoulder; never on a motorway.', 'Før bakning og vending: sørg for, at det kan ske uden fare, og se over skulderen; aldrig på motorvej.'),
          law=law((18, 1), (26, 3), (46, 2)),
          points=[('در بزرگراه و راه‌های ورود و خروج آن دور زدن و دنده‌عقب ممنوع است.', 'Turning round and reversing are forbidden on a motorway and its slip roads.', 'Vending og bakning er forbudt på motorvej og på dens til- og frakørselsveje.'),
                  ('در پیچ یا نزدیک سربالایی که دیگران شما را دیر می‌بینند دور نزنید؛ از روی خط ممتد (Q 44) یا جایی که تابلوی C 11.2 یا C 12 ممنوع کرده هم نه.', 'Do not turn round in a bend or near a hilltop where others see you late, nor across a solid line (Q 44) or where sign C 11.2 or C 12 forbids it.', 'Vend ikke i et sving eller nær en bakketop, hvor andre ser dig sent, og heller ikke hen over en spærrelinje (Q 44) eller hvor tavle C 11.2 eller C 12 forbyder det.'),
                  ('وقتی با دنده‌عقب از پارکینگ یا ملک بیرون می‌آیید، به همه راه بدهید، از جمله به عابران پیاده‌رو.', 'When you reverse out of a car park or a property, give way to everyone, also pedestrians on the pavement.', 'Når du bakker ud fra en parkeringsplads eller en ejendom, har du ubetinget vigepligt, også over for gående på fortovet.'),
                  ('جایی که دید کم است، بهتر است با دنده‌عقب وارد شوید تا بعد رو به جلو بیرون بیایید.', 'Where the view is poor, it is better to reverse in, so that you can drive out forwards.', 'Hvor der er dårlig oversigt, er det bedre at bakke ind, så du kan køre forlæns ud.'),
                  ('دوربین دنده‌عقب کمک می‌کند ولی همه‌چیز را نشان نمی‌دهد؛ کودک کوچک ممکن است دیده نشود.', 'A reversing camera helps, but it does not show everything; a small child may be hidden.', 'Et bakkamera hjælper, men det viser ikke alt; et lille barn kan være skjult.')],
          trap=('«دوربین نشان می‌دهد پشت سر خالی است، پس بدون نگاه کردن به عقب دنده‌عقب می‌روم» غلط است.', '«The camera shows it is clear, so I reverse without looking back» is wrong.', '«Kameraet viser, at der er frit, så jeg bakker uden at se mig tilbage» er forkert.')),
    teach(('حرکت از کنار جدول', 'Pulling out from the kerb', 'Igangsætning fra kantstenen'),
          ('پیش از حرکت از کنار جدول یا از جای پارک، در آینه‌ها و از روی شانه‌ی چپ (نقطه‌ی کور) نگاه کنید و راهنما بزنید، و فقط وقتی راه بیفتید که برای کسی خطر یا مزاحمتی ندارد: همه‌ی کسانی که در جاده‌اند اول می‌روند، از جمله دوچرخه‌سوارِ مسیر یا خط دوچرخه‌ای که از آن رد می‌شوید. وقتی می‌خواهید کنار جدول بایستید هم پیش از آن در آینه نگاه کنید، به‌موقع راهنما بزنید و نرم ترمز کنید.',
           'Before you pull out from the kerb or a parking space, look in the mirrors and over your left shoulder (blind spot) and signal, and only move off when it causes no danger or inconvenience to anyone: everyone already on the road goes first, also cyclists on a cycle track or lane you cross. When you want to stop at the kerb, also check the mirror first, signal in good time and brake gently.',
           'Før du kører ud fra kantstenen eller en parkeringsplads, ser du i spejlene og over venstre skulder (den blinde vinkel) og giver tegn, og du kører først, når det kan ske uden fare eller ulempe for andre: alle, der allerede er på vejen, kører først, også cyklister på en cykelsti eller cykelbane, du skal krydse. Vil du standse ved kantstenen, ser du også først i spejlet, giver tegn i god tid og bremser blødt.'),
          art='park-pullout',
          rule=('حرکت از کنار جدول: آینه، نگاه از روی شانه، راهنما؛ همه‌ی کسانی که در جاده‌اند اول می‌روند.', 'Pulling out from the kerb: mirror, look over your shoulder, signal; everyone on the road goes first.', 'Igangsætning fra kantstenen: spejl, se over skulderen, giv tegn; alle på vejen kører først.'),
          law=law((18, 2), (32, 2)),
          points=[('اگر راننده‌ای با چراغ به شما علامت داد که بیرون بیایید، باز هم خودتان نگاه کنید؛ علامت او حق تقدم به شما نمی‌دهد و ممکن است کسی پشت او باشد.', 'If a driver flashes the lights to let you out, still look for yourself; the flash gives you no right of way, and someone may be behind that car.', 'Blinker en anden fører med lyset for at lukke dig ud, ser du alligevel selv efter; blinket giver dig ingen ret, og der kan være andre bag bilen.'),
                  ('در جاده‌ی یخ‌زده آرام گاز بدهید و چرخ‌ها را صاف نگه دارید تا هرز نچرخند.', 'On an icy road, accelerate gently and keep the wheels straight so that they do not spin.', 'På isglat vej giver du forsigtigt gas og holder hjulene lige, så de ikke spinder.')],
          trap=('«راهنما زده‌ام، پس خودروی پشتی باید بگذارد بیرون بیایم» غلط است.', '«I have signalled, so the car behind must let me out» is wrong.', '«Jeg har givet tegn, så bilen bagfra skal lukke mig ud» er forkert.')),
    q('exam-park-crossing',
      'Du vil sætte en passager af. Hvor må du standse?',
      'You want to let a passenger out. Where may you stop?',
      'می‌خواهید مسافری را پیاده کنید. کجا می‌توانید بایستید؟',
      st(True, 'Mindst 5 m før fodgængerfeltet.', 'At least 5 m before the pedestrian crossing.', 'دست‌کم ۵ متر پیش از گذرگاه عابر.',
         ('توقف روی گذرگاه و تا ۵ متر پیش از آن ممنوع است.', 'Stopping on the crossing and up to 5 m before it is forbidden.', 'Standsning på fodgængerfeltet og 5 m før det er forbudt.')),
      st(False, 'Lige før fodgængerfeltet, fordi det kun tager et øjeblik.', 'Just before the crossing because it only takes a moment.', 'درست پیش از گذرگاه، چون فقط یک لحظه طول می‌کشد.',
         ('ممنوعیت توقف شامل توقف کوتاه هم می‌شود.', 'The ban on stopping also covers a short stop.', 'Forbuddet mod standsning gælder også en kort standsning.')),
      st(False, 'På fodgængerfeltet, hvis der ikke er nogen fodgængere.', 'On the crossing if there are no pedestrians.', 'روی گذرگاه، اگر عابری نباشد.',
         ('روی گذرگاه عابر هیچ‌وقت نایستید.', 'Never stop on a pedestrian crossing.', 'Stands aldrig på et fodgængerfelt.')),
      rule=1),
    q('exam-park-junction',
      'Hvor tæt på krydset må du standse eller parkere?',
      'How close to the junction may you stop or park?',
      'تا چه فاصله‌ای از تقاطع می‌توانید بایستید یا پارک کنید؟',
      st(True, 'Ikke nærmere end 10 m fra den tværgående kørebanes nærmeste kant.', 'Not closer than 10 m from the nearest edge of the crossing carriageway.', 'نه نزدیک‌تر از ۱۰ متر به نزدیک‌ترین لبه‌ی سواره‌روی متقاطع.',
         ('خودرویی که نزدیک‌تر بایستد، دید تقاطع را می‌بندد.', 'A car standing closer blocks the view of the junction.', 'En bil, der holder nærmere, spærrer for udsynet i krydset.')),
      st(False, 'Helt op til hjørnet, hvis jeg ikke spærrer for nogen.', 'Right up to the corner if I am not in anyone\'s way.', 'تا خود نبش، اگر راه کسی را نبندم.',
         ('فاصله‌ی ۱۰ متر همیشه لازم است.', 'The 10 m distance always applies.', 'Afstanden på 10 m gælder altid.')),
      rule=1),
    q('exam-park-yellow',
      'Der er en punkteret gul linje langs kantstenen. Hvad må du her?',
      'There is a broken yellow line along the kerb. What may you do here?',
      'کنار جدول خط زرد بریده است. این‌جا چه کاری مجاز است؟',
      st(True, 'Standse kort for at lade en passager stige ud.', 'Stop briefly to let a passenger get out.', 'کوتاه بایستم تا مسافری پیاده شود.',
         ('خط زرد بریده فقط پارک را ممنوع می‌کند.', 'A broken yellow line only forbids parking.', 'En punkteret gul linje forbyder kun parkering.')),
      st(True, 'Holde i 2 minutter for at vente på en, der skal med.', 'Wait for 2 minutes for someone who is coming along.', '۲ دقیقه منتظر کسی بمانم که قرار است سوار شود.',
         ('توقف کمتر از ۳ دقیقه پارک حساب نمی‌شود.', 'A stop of less than 3 minutes does not count as parking.', 'Standsning under 3 minutter er ikke parkering.')),
      st(False, 'Parkere, mens jeg handler.', 'Park while I go shopping.', 'پارک کنم تا خرید کنم.',
         ('خرید یعنی ترک خودرو؛ این پارک است و ممنوع.', 'Shopping means leaving the car: that is parking, and forbidden.', 'At handle betyder at forlade bilen: det er parkering og forbudt.')),
      rule=2),
    result(1),
    summary([('پارک: سمت راست، موازی جدول؛ کمتر از ۳ دقیقه یا برای مسافر و بار، توقف است نه پارک.', 'Park on the right, parallel to the kerb; under 3 minutes or for passengers and goods is stopping, not parking.', 'Parkér i højre side, parallelt med kantstenen; under 3 minutter eller for passagerer og gods er standsning, ikke parkering.'),
             ('توقف ممنوع: گذرگاه عابر و ۵ متر، تقاطع و ۱۰ متر، ایستگاه اتوبوس و ۱۲ متر.', 'No stopping: crossing and 5 m, junction and 10 m, bus stop and 12 m.', 'Standsning forbudt: fodgængerfelt og 5 m, kryds og 10 m, busstoppested og 12 m.'),
             ('پارک ممنوع: ۳۰ متر از ریل قطار، جلوی ورودی ملک، جاده‌ی اصلی بیرون شهر، پارک دوبل.', 'No parking: 30 m from a level crossing, in front of a driveway, on main roads outside towns, double parking.', 'Parkering forbudt: 30 m fra jernbaneoverkørsel, ud for indkørsler, på hovedvej uden for byen, dobbeltparkering.'),
             ('زرد ممتد: توقف ممنوع؛ زرد بریده: پارک ممنوع.', 'Solid yellow: no stopping; broken yellow: no parking.', 'Ubrudt gul: standsning forbudt; punkteret gul: parkering forbudt.'),
             ('پیش از باز کردن در از روی شانه نگاه کنید.', 'Look over your shoulder before opening the door.', 'Se over skulderen, før du åbner døren.'),
             ('پیش از دنده‌عقب و دور زدن از روی شانه نگاه کنید؛ در بزرگراه هرگز.', 'Look over your shoulder before reversing or turning round; never on a motorway.', 'Se over skulderen, før du bakker eller vender; aldrig på motorvej.'),
             ('پیش از حرکت از کنار جدول در آینه و از روی شانه نگاه کنید؛ همه‌ی کسانی که در جاده‌اند اول می‌روند.', 'Before pulling out from the kerb, check the mirrors and over your shoulder; everyone on the road goes first.', 'Før du kører ud fra kantstenen, ser du i spejlene og over skulderen; alle på vejen kører først.')],
            ('law', 'signs', 'plan')),
])

MANOEUVRES_TEST = lesson('manoeuvres-test', 'MANOEUVRES_TEST', ('آزمون فصل', 'Chapter test', 'Kapiteltest'), 6, [
    intro(('آزمون فصل ۵', 'Chapter 5 test', 'Kapiteltest 5'),
          ('حالا سبقت، تغییر خط، توقف و پارک را با هم مرور می‌کنیم. سؤال‌ها مثل آزمون واقعی‌اند و درس‌ها در هم آمده‌اند؛ هر علامت اشتباه یا جاافتاده یک اشتباه است.',
           'Now we go over overtaking, changing lanes, stopping and parking together. The questions are like the real test and the lessons are mixed; every wrong or missing tick is one mistake.',
           'Nu gennemgår vi overhaling, vognbaneskift, standsning og parkering samlet. Spørgsmålene er som ved den rigtige prøve, og lektionerne er blandet; hvert forkert eller manglende kryds er én fejl.'),
          [('نشان دهید قاعده‌های سبقت و پارک را در موقعیت‌های مختلف به کار می‌برید.', 'Show that you can use the rules for overtaking and parking in different situations.', 'Vise at du kan bruge reglerne om overhaling og parkering i forskellige situationer.'),
           ('نقطه‌های ضعفتان را پیش از فصل بعد پیدا کنید.', 'Find your weak points before the next chapter.', 'Finde dine svage punkter før næste kapitel.')],
          [('سبقت از راست و آنچه پیش از سبقت باید بدانید.', 'Overtaking on the right and what to check before overtaking.', 'Overhaling til højre, og hvad du skal sikre dig før en overhaling.'),
           ('خط زرد، باز کردن در و پارک نزدیک ریل قطار.', 'Yellow lines, opening the door and parking near a level crossing.', 'Gule linjer, at åbne døren og parkering ved en jernbaneoverkørsel.')]),
    q('overtake-right',
      'Den grå bil holder ved midterlinjen og blinker til venstre. Må den blå bil køre forbi den til højre?',
      'The grey car is waiting by the centre line, signalling left. May the blue car pass it on the right?',
      'خودروی خاکستری کنار خط وسط ایستاده و راهنمای چپ زده است. خودروی آبی می‌تواند از راست آن رد شود؟',
      st(True, 'Ja, når der er plads til højre, og det kan ske uden fare.', 'Yes, when there is room on the right and it can be done safely.', 'بله، وقتی سمت راست جا هست و بی‌خطر است.', ('از خودرویی که به چپ می‌پیچد، می‌شود از راست سبقت گرفت.', 'You may overtake a car turning left on its right.', 'Du må overhale en bil, der svinger til venstre, til højre.')),
      st(False, 'Nej, det er altid forbudt at overhale til højre.', 'No, overtaking on the right is always forbidden.', 'نه، سبقت از راست همیشه ممنوع است.', ('سبقت از راست وقتی خودروی جلو به چپ می‌پیچد مجاز است.', 'Overtaking on the right is allowed when the car ahead is turning left.', 'Overhaling til højre er tilladt, når bilen foran svinger til venstre.'))),
    q('overtake-basics',
      'Hvad skal føreren af den blå bil sikre sig, før overhalingen begynder?',
      'What must the driver of the blue car make sure of before the overtaking begins?',
      'راننده‌ی خودروی آبی پیش از شروع سبقت باید از چه مطمئن شود؟',
      st(True, 'At der er frit for modkørende langt nok frem.', 'That the road is clear of oncoming traffic far enough ahead.', 'که تا فاصله‌ی کافی، از روبه‌رو کسی نمی‌آید.', ('باید بتوانید سبقت را بی‌خطر تمام کنید.', 'You must be able to finish the overtaking safely.', 'Du skal kunne gennemføre overhalingen uden fare.')),
      st(True, 'At ingen bagfra er begyndt at overhale den.', 'That nobody behind has started to overtake it.', 'که کسی از پشت سبقت از او را شروع نکرده باشد.', ('پیش از سبقت در آینه و از روی شانه به عقب نگاه کنید.', 'Look in the mirror and over your shoulder before overtaking.', 'Se i spejlet og over skulderen, før du overhaler.')),
      st(False, 'At den grå bil kører langsommere end 50 km/t.', 'That the grey car is driving slower than 50 km/h.', 'که خودروی خاکستری کمتر از ۵۰ کیلومتر در ساعت برود.', ('سرعت خودروی جلو شرط سبقت نیست؛ بی‌خطر بودن شرط است.', 'The speed of the car ahead is not the condition; safety is.', 'Forankørendes hastighed er ikke betingelsen; det er, at det kan ske uden fare.'))),
    q('exam-park-crossing',
      'Hvorfor må du ikke standse lige før fodgængerfeltet?',
      'Why must you not stop just before the pedestrian crossing?',
      'چرا نباید درست پیش از گذرگاه عابر بایستید؟',
      st(True, 'Fordi bilen kan skjule fodgængere for andre trafikanter.', 'Because the car can hide pedestrians from other road users.', 'چون خودرو ممکن است عابران را از دید دیگران پنهان کند.', ('برای همین توقف تا ۵ متر پیش از گذرگاه ممنوع است.', 'That is why stopping up to 5 m before the crossing is forbidden.', 'Derfor er standsning forbudt 5 m før fodgængerfeltet.')),
      st(True, 'Fordi standsning er forbudt mindre end 5 m før fodgængerfeltet.', 'Because stopping is forbidden less than 5 m before the crossing.', 'چون توقف کمتر از ۵ متر پیش از گذرگاه ممنوع است.', ('این قانون است.', 'That is the law.', 'Det er loven.')),
      st(False, 'Fordi det kun er forbudt at parkere der.', 'Because only parking is forbidden there.', 'چون آن‌جا فقط پارک ممنوع است.', ('آن‌جا توقف هم ممنوع است، نه فقط پارک.', 'There even stopping is forbidden, not only parking.', 'Der er også standsning forbudt, ikke kun parkering.'))),
    q('park-yellow',
      'Hvad betyder den ubrudte gule linje langs den venstre kantsten?',
      'What does the solid yellow line along the left kerb mean?',
      'خط زرد ممتد کنار جدولِ سمت چپ چه معنایی دارد؟',
      st(True, 'Standsning forbudt.', 'No stopping.', 'توقف ممنوع.', ('زرد ممتد (T 61) یعنی توقف هم ممنوع است.', 'Solid yellow (T 61) means even stopping is forbidden.', 'Ubrudt gul (T 61) betyder, at også standsning er forbudt.')),
      st(False, 'Kun parkering forbudt.', 'Only parking forbidden.', 'فقط پارک ممنوع.', ('پارک ممنوع، خط زرد بریده (T 62) است.', 'No parking is the broken yellow line (T 62).', 'Parkering forbudt er den punkterede gule linje (T 62).'))),
    q('park-door',
      'Du vil stige ud af bilen. Hvordan forholder du dig?',
      'You want to get out of the car. What do you do?',
      'می‌خواهید از خودرو پیاده شوید. چه می‌کنید؟',
      st(True, 'Jeg ser mig tilbage efter cyklister, før jeg åbner døren.', 'I look back for cyclists before I open the door.', 'پیش از باز کردن در، به عقب نگاه می‌کنم تا دوچرخه‌سوار نباشد.', ('دوچرخه‌سوار ممکن است درست کنار در باشد.', 'A cyclist may be right next to the door.', 'En cyklist kan være lige ved døren.')),
      st(False, 'Jeg åbner døren hurtigt, så jeg ikke er i vejen længe.', 'I open the door quickly so that I am not in the way for long.', 'در را سریع باز می‌کنم تا زیاد سر راه نباشم.', ('باز کردن ناگهانی در، دوچرخه‌سوار را به خطر می‌اندازد.', 'Opening the door suddenly puts the cyclist in danger.', 'At åbne døren brat bringer cyklisten i fare.'))),
    q('exam-man-rail-park',
      'Må bilen parkere her?',
      'May the car park here?',
      'این خودرو می‌تواند این‌جا پارک کند؟',
      st(True, 'Nej, parkering er forbudt nærmere end 30 m fra en jernbaneoverkørsel.', 'No, parking is forbidden closer than 30 m to a level crossing.', 'نه، پارک نزدیک‌تر از ۳۰ متر به تقاطع راه‌آهن ممنوع است.', ('خودروی پارک‌شده دید قطار و ریل را می‌بندد.', 'A parked car blocks the view of the train and the rails.', 'En parkeret bil spærrer for udsynet til toget og sporet.')),
      st(False, 'Ja, når bommene er oppe.', 'Yes, when the barriers are up.', 'بله، وقتی راه‌بندها بالا هستند.', ('ممنوعیت پارک به راه‌بند ربطی ندارد.', 'The parking ban has nothing to do with the barriers.', 'Parkeringsforbuddet har intet med bommene at gøre.'))),
    result(2),
    summary([('از خودرویی که به چپ می‌پیچد، می‌شود از راست سبقت گرفت.', 'You may overtake a car turning left on its right.', 'Du må overhale en bil, der svinger til venstre, til højre.'),
             ('پیش از سبقت: راه روبه‌رو باز، کسی پشت سر در حال سبقت نباشد.', 'Before overtaking: the road ahead clear, nobody behind already overtaking.', 'Før overhaling: frit for modkørende, og ingen bagfra er begyndt at overhale.'),
             ('توقف ممنوع: ۵ متر پیش از گذرگاه؛ زرد ممتد: توقف ممنوع.', 'No stopping 5 m before a crossing; solid yellow: no stopping.', 'Standsning forbudt 5 m før fodgængerfelt; ubrudt gul: standsning forbudt.'),
             ('پارک نزدیک‌تر از ۳۰ متر به ریل قطار ممنوع است؛ پیش از باز کردن در به عقب نگاه کنید.', 'No parking within 30 m of a level crossing; look back before opening the door.', 'Parkering forbudt inden for 30 m fra jernbaneoverkørsel; se tilbage, før du åbner døren.')],
            ('law', 'signs', 'plan')),
])

CHAPTER = 'manoeuvres'
LESSONS = [PARKING, MANOEUVRES_TEST]
