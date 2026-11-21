# Chapter 6 «عابران، دوچرخه‌ها و کاربران آسیب‌پذیر»: pedestrian crossings, cyclists and mopeds, children, the elderly and
# animals, and the chapter's test. Rules from Færdselsloven §§ 3, 14, 19, 21, 23, 25–28, 41 and 49; on hitting an animal,
# borger.dk.
from course import TOWN, above, intro, law, lesson, q, result, st, summary, teach, view

E17 = ("the Danish pedestrian-crossing sign E 17 on a grey post: an upright square blue sign with a white triangle showing a "
       "black walking person on a crossing")

# ---------- pictures (prompts for the image model) ----------
above('cross-zebra', f"""
THE SCENE: a straight two-way town street running from the bottom to the top of the picture, one lane in each direction, a white broken centre line, light grey pavements with kerbs. In the middle of the picture a pedestrian crossing (Danish S 17: broad white stripes parallel to the street) crosses the whole street, with {E17} on both pavements beside it. No traffic lights.
ROAD USERS (colour code used strictly):
- on the right-hand pavement, at the kerb at the crossing, a pedestrian (an adult with a shopping bag) about to step onto the crossing, a short SOLID GREEN arrow showing the way across;
- a RED car (ours) in the right-hand lane below the crossing, slowing down with its brake lights on, a short DASHED ORANGE arrow from its nose that stops before the crossing.
MUST NOT APPEAR: traffic lights, other vehicles, other people, text, letters, numbers, left-hand traffic.
""")

above('cross-hidden', f"""
THE SCENE: a wide one-way town street running from the bottom to the top of the picture with TWO lanes, both going up, separated by a white broken lane line; light grey pavements with kerbs. In the upper half a pedestrian crossing (broad white stripes) crosses the whole street, with {E17} on both pavements. No traffic lights.
ROAD USERS (colour code used strictly):
- a BLUE van stopped in the LEFT lane just before the crossing;
- a pedestrian walking across the crossing from the left, now right in front of the van, where only someone seen from above can see her: the van hides her from the right lane;
- a RED car (ours) in the RIGHT lane, coming up beside the van, its brake lights on, a short DASHED ORANGE arrow that stops before the crossing.
MUST NOT APPEAR: traffic lights, other vehicles, other people, text, letters, numbers, left-hand traffic.
""")

view('cross-lights', """
THE SCENE: we wait first at the stop line of a junction in town controlled by traffic lights; our light has just turned GREEN. Right in front of us a pedestrian crossing runs across our lane, and its pedestrian light (a small signal with a red standing figure) shows RED. An elderly woman with a walking stick is still walking slowly across the crossing, now in the middle of our lane.
MUST BE CLEARLY VISIBLE: our green light, the pedestrians' red figure, the elderly woman in front of us.
MUST NOT APPEAR: other road users, signs, text.
""", scenery=TOWN)

above('cross-road-walkers', """
THE SCENE: a narrow two-way country road without pavements running from the bottom to the top of the picture, a white broken centre line, plain green verges and fields.
ROAD USERS (colour code used strictly):
- two pedestrians walking one behind the other at the LEFT edge of the road, facing the traffic coming towards them (walking down the picture), in the upper half;
- a RED car (ours) in the right-hand lane in the lower half driving up, with a DASHED ORANGE arrow that keeps well to the right as it passes them;
- the oncoming lane is otherwise empty.
MUST NOT APPEAR: signs, other vehicles, text, letters, numbers, left-hand traffic.
""")

view('exam-cross-kerb', f"""
THE SCENE: a straight two-way town street, one lane in each direction, a white broken centre line, pavements. About 20 m ahead a pedestrian crossing (broad white stripes) crosses the street, with {E17} on the right. No traffic lights. On the right-hand pavement, at the kerb right at the crossing, a woman with a pram stands looking towards us, about to cross.
ROAD USERS: no other road users.
MUST BE CLEARLY VISIBLE: the woman with the pram at the kerb, the crossing, the E 17 sign.
MUST NOT APPEAR: traffic lights, other signs, text.
""", scenery=TOWN)

view('exam-cross-hidden', f"""
THE SCENE: a wide one-way town street with TWO lanes in our direction separated by a white broken lane line; we drive in the RIGHT lane. About 20 m ahead a pedestrian crossing (broad white stripes) crosses the street, with {E17} on the right. In the LEFT lane, a large white van has stopped right before the crossing and hides the left part of the crossing from us. No pedestrians can be seen.
MUST BE CLEARLY VISIBLE: the stopped van in the left lane, the crossing in front of it, our free lane on the right.
MUST NOT APPEAR: traffic lights, other road users, text.
""", scenery=TOWN)

view('exam-cross-late', """
THE SCENE: we wait first at the stop line of a junction in town controlled by traffic lights; our light has just turned GREEN. Just in front of us a pedestrian crossing runs across the street. An elderly man with a walking stick is still on the crossing, in the middle of our lane, walking slowly towards the right.
MUST BE CLEARLY VISIBLE: our green light and the elderly man on the crossing in front of us.
MUST NOT APPEAR: other road users, signs, text.
""", scenery=TOWN)

above('bike-paths', """
THE SCENE: a straight two-way town street running from the bottom to the top of the picture, one lane in each direction, a white broken centre line. On the RIGHT side, between the street and the pavement, a raised cycle path (a separate strip of asphalt, separated from the street by a low kerb) with a white bicycle symbol painted on it. On the LEFT side, a painted cycle lane on the street itself, separated from the car lane by a solid white line, with white bicycle symbols. Light grey pavements beyond both.
ROAD USERS (colour code used strictly):
- on the right-hand cycle path: a cyclist and, behind it, a small moped (a light scooter with a rider in a helmet), both going up, each with a short SOLID GREEN arrow;
- in the right-hand car lane: a large moped with a small number plate (a heavier scooter) going up, with a short SOLID GREEN arrow;
- a RED car (ours) in the right-hand car lane further back, going up;
- a cyclist on the left-hand cycle lane going down.
MUST NOT APPEAR: cars parked on the cycle path or cycle lane, signs, text, letters, numbers, left-hand traffic.
""")

above('bike-overtake', """
THE SCENE: a straight two-way country road running from the bottom to the top of the picture, one lane in each direction, a white broken centre line, solid edge lines, plain green verges.
ROAD USERS (colour code used strictly):
- a cyclist riding up near the right edge of the right-hand lane in the middle of the picture;
- a RED car (ours) overtaking it: already out in the left-hand lane level with the cyclist, leaving a WIDE gap to its side; a DASHED ORANGE arrow from the red car curves back into the right-hand lane well ahead of the cyclist;
- a short DASHED ORANGE double-headed arrow across the gap between the cyclist and the red car shows the side distance;
- the oncoming lane is empty up to the top of the picture.
MUST NOT APPEAR: signs, other vehicles, text, letters, numbers, left-hand traffic.
""")

above('bike-left', """
THE SCENE: a four-way crossroads in town, two straight two-way streets with one lane in each direction, white broken centre lines, light grey pavements with kerbs. No signs, no traffic lights.
ROAD USERS (colour code used strictly):
- a cyclist on the bottom street at the right edge of the right-hand lane, coming up to the junction to turn LEFT, the Danish way in two steps; a SOLID GREEN arrow shows its path: first STRAIGHT up across the junction, keeping right, to the far right-hand corner, where it waits beside the kerb (a small green dot marks the waiting place), then turning and riding across to the LEFT into the left street;
- a faint semi-transparent ghost of a cyclist in the middle of the bottom street by the centre line, crossed out by a red X in a white circle (cyclists do not turn left from the middle of the road);
- a BLUE car on the top street waiting.
MUST NOT APPEAR: other vehicles, people, signs, text, letters, numbers, left-hand traffic.
""")

view('exam-bike-moped', """
THE SCENE: a straight town street with one lane in our direction; on our right, separated from the street by a low kerb, a raised cycle path with a white bicycle symbol, then the pavement. About 15 m ahead, ON THE CYCLE PATH, a small moped (a light scooter, no number plate) is riding in our direction. About 20 m ahead, IN OUR LANE on the street, a large moped (a heavier scooter with a small yellow number plate) is riding in our direction.
MUST BE CLEARLY VISIBLE: which moped is on the cycle path and which on the street.
MUST NOT APPEAR: signs, other road users, text (the number plate is blank).
""", scenery=TOWN)

view('exam-bike-overtake', """
THE SCENE: a two-way country road, one lane in each direction, a white broken centre line, solid edge lines. A cyclist rides at the right edge of our lane about 20 m ahead of us. In the oncoming lane a grey car is coming towards us, about 60 m away, so there is no room to overtake the cyclist with a good side distance before it has passed.
MUST BE CLEARLY VISIBLE: the cyclist ahead, the oncoming car, the narrow road.
MUST NOT APPEAR: signs, other road users, text.
""")

above('exam-bike-left', """
THE SCENE: a four-way crossroads in town, two straight two-way streets with one lane in each direction, white broken centre lines, light grey pavements. No signs, no traffic lights.
ROAD USERS (colour code used strictly):
- a cyclist on the bottom street at the RIGHT edge of the right-hand lane, close to the junction, holding the LEFT arm straight out to the side (showing a left turn);
- a RED car (ours) in the same lane behind the cyclist.
MUST NOT APPEAR: arrows, other vehicles, people, signs, text, letters, numbers, left-hand traffic.
""")

above('kids-ball', """
THE SCENE: a straight two-way residential street running from the bottom to the top of the picture, one lane in each direction, pavements, a row of GREY cars parked nose to tail along the right-hand kerb. A small playground behind the right-hand pavement.
ROAD USERS AND OBJECTS (colour code used strictly):
- a red-and-white ball has rolled out from between two parked cars into the right-hand lane in the middle of the picture;
- a small child is running from the pavement towards the gap between the parked cars, after the ball, hidden from the street by the parked cars;
- a RED car (ours) in the right-hand lane below, braking hard, its brake lights on, a short DASHED ORANGE arrow from its nose that stops well before the ball.
MUST NOT APPEAR: signs, other moving vehicles, text, letters, numbers, left-hand traffic.
""")

above('kids-schoolbus', """
THE SCENE: a straight two-way country road running from the bottom to the top of the picture, a white broken centre line, solid edge lines, plain green verges, a few houses on the right.
ROAD USERS (colour code used strictly):
- a yellow school bus stopped at the right edge of the right-hand lane in the upper half, its hazard lights flashing orange, its door open on the right;
- two children who have just got off: one on the verge beside the bus, one about to walk out onto the road behind the bus;
- a RED car (ours) in the right-hand lane in the lower half, driving up slowly towards the bus, a short DASHED ORANGE arrow from its nose that stops well behind the bus.
MUST NOT APPEAR: signs, other vehicles, text, letters, numbers, left-hand traffic.
""")

above('animals-horse', """
THE SCENE: a straight two-way country road running from the bottom to the top of the picture, a white broken centre line, plain green verges, fields with a fence.
ROAD USERS (colour code used strictly):
- two riders on brown horses, one behind the other, at the right edge of the right-hand lane in the upper half, going up, the riders in high-visibility vests;
- a RED car (ours) out in the left-hand lane passing them slowly with a WIDE gap; a DASHED ORANGE arrow from it curves back into the right-hand lane only well ahead of the horses;
- the oncoming lane is otherwise empty.
MUST NOT APPEAR: signs, other vehicles, text, letters, numbers, left-hand traffic.
""")

view('exam-kids-ball', """
THE SCENE: a straight two-way residential street, one lane in each direction, a row of cars parked along the right-hand kerb, houses with small gardens. About 15 m ahead, a red-and-white ball rolls out from between two parked cars into our lane. No person can be seen.
MUST BE CLEARLY VISIBLE: the ball in our lane coming from between the parked cars.
MUST NOT APPEAR: people, signs, other moving road users, text.
""", scenery='Scenery is reduced to simple flat house fronts, small gardens and a few trees.')

view('exam-animals-horse', """
THE SCENE: a straight two-way country road, one lane in each direction, a white broken centre line, fields with fences on both sides. About 30 m ahead, two riders on brown horses ride one behind the other at the right edge of our lane, in our direction, the riders in high-visibility vests. The oncoming lane is empty as far as we can see.
MUST BE CLEARLY VISIBLE: the two horses and riders ahead.
MUST NOT APPEAR: signs, other road users, text.
""")

view('exam-animals-deer', """
THE SCENE: a two-way country road through a forest at DUSK, one lane in each direction, a white broken centre line and solid edge lines, the light fading. On the right verge about 15 m ahead stands the Danish warning sign A 26 "wild animals" on a grey post: an upright equilateral triangle, point up, with a broad red border and a white centre showing a black leaping deer. About 50 m ahead, a deer has just crossed the road and is disappearing into the trees on the left.
MUST BE CLEARLY VISIBLE: the A 26 sign and the deer at the edge of the road.
MUST NOT APPEAR: other road users, other signs, text.
""", cond='dusk, fading light, our dipped headlights on')


# ---------- the lessons ----------
CROSSING = lesson('crossing', 'CROSSING', ('گذرگاه عابر پیاده', 'Pedestrian crossings', 'Fodgængerfelter'), 8, [
    intro(('گذرگاه عابر پیاده (fodgængerfelt)', 'Pedestrian crossings (fodgængerfelt)', 'Fodgængerfelter'),
          ('در آزمون زیاد عابرانی را می‌بینید که کنار یا روی گذرگاه‌اند. قاعده برای گذرگاه بدون چراغ و با چراغ فرق دارد، و رد شدن از کنار خودرویی که پیش از گذرگاه ایستاده، از تله‌های رایج است.',
           'In the test you often see pedestrians at or on a crossing. The rules differ for crossings with and without lights, and passing a vehicle that has stopped before a crossing is a common trap.',
           'Til prøven ser du ofte fodgængere ved eller på et fodgængerfelt. Reglerne er forskellige for fodgængerfelter med og uden signal, og at køre forbi et køretøj, der holder før et fodgængerfelt, er en almindelig fælde.'),
          [('بدانید پیش از گذرگاه بدون چراغ چه باید بکنید.', 'Know what you must do before a crossing without lights.', 'Vide hvad du skal gøre før et fodgængerfelt uden signal.'),
           ('بدانید کِی نباید از کنار خودرویی که پیش از گذرگاه ایستاده رد شوید.', 'Know when you must not pass a vehicle that has stopped before a crossing.', 'Vide hvornår du ikke må køre forbi et køretøj, der holder før et fodgængerfelt.'),
           ('قاعده‌ی گذرگاه چراغ‌دار و عابرانِ روی جاده را بدانید.', 'Know the rules for crossings with lights and for pedestrians on the road.', 'Kende reglerne ved fodgængerfelter med signal og for fodgængere på kørebanen.')],
          [('عابری که کنار جدول ایستاده و می‌خواهد از گذرگاه رد شود.', 'A pedestrian at the kerb who wants to cross.', 'En fodgænger ved kantstenen, der vil gå over.'),
           ('خودرویی که در خط کناری پیش از گذرگاه ایستاده است.', 'A vehicle that has stopped in the next lane before a crossing.', 'Et køretøj, der holder i nabovognbanen før et fodgængerfelt.'),
           ('عابری که هنوز روی گذرگاه است وقتی چراغ شما سبز می‌شود.', 'A pedestrian still on the crossing when your light turns green.', 'En fodgænger, der stadig er på fodgængerfeltet, når du får grønt.')]),
    teach(('گذرگاه بدون چراغ: آهسته کنید و راه بدهید', 'A crossing without lights: slow down and give way', 'Fodgængerfelt uden signal: sænk farten og hold tilbage'),
          ('پیش از گذرگاهی که چراغ ندارد (خط‌کشی S 17 و تابلوی E 17؛ بیرون شهر تابلوی هشدار A 17)، سرعت را طوری تنظیم کنید که عابری که روی گذرگاه است یا می‌خواهد واردش شود، به خطر یا زحمت نیفتد؛ در صورت لزوم بایستید. به پیاده‌رو نگاه کنید: عابری که کنار جدول ایستاده و به خیابان نگاه می‌کند، «در حال ورود» است.',
           'Before a crossing without lights (marking S 17 and sign E 17; outside towns the warning sign A 17), adjust your speed so that pedestrians on the crossing or about to step onto it are not put in danger or trouble; stop if necessary. Watch the pavement: a pedestrian standing at the kerb looking at the street is «about to step out».',
           'Før et fodgængerfelt uden signal (afmærkning S 17 og tavle E 17; uden for byen advarselstavle A 17) skal du afpasse farten, så fodgængere på feltet eller på vej ud på det ikke kommer i fare eller ulejlighed; stands om nødvendigt. Hold øje med fortovet: en fodgænger ved kantstenen, der ser ud på vejen, er «på vej ud».'),
          art='cross-zebra',
          rule=('پیش از گذرگاه بدون چراغ آهسته کنید و برای عابرِ روی گذرگاه یا در حال ورود بایستید.', 'Slow down before a crossing without lights and stop for pedestrians on it or about to step onto it.', 'Sænk farten før et fodgængerfelt uden signal, og stands for fodgængere på feltet eller på vej ud på det.'),
          law=law((27, 7), 'E 17 | S 17 | A 17'),
          trap=('«عابر هنوز روی گذرگاه نیست، پس رد می‌شوم» غلط است؛ عابری که دارد وارد می‌شود هم باید بتواند بی‌خطر رد شود.', '«The pedestrian is not on the crossing yet, so I go on» is wrong; someone about to step out must also be able to cross safely.', '«Fodgængeren er ikke gået ud på feltet endnu, så jeg kører» er forkert; den, der er på vej ud, skal også kunne gå sikkert over.')),
    teach(('خودرویی که پیش از گذرگاه ایستاده', 'A vehicle that has stopped before a crossing', 'Et køretøj, der holder før fodgængerfeltet'),
          ('وقتی به گذرگاه نزدیک می‌شوید، نباید از خودرویی که دید شما را به گذرگاه می‌بندد سبقت بگیرید یا از کنارش رد شوید؛ شاید برای عابری ایستاده که شما نمی‌بینید. در صف هم تا جای ممکن روی گذرگاه نایستید؛ پیش از آن صبر کنید. در تصویر، ون آبی عابر را از دید خودروی قرمز پنهان کرده است.',
           'When you approach a crossing, you must not overtake or pass a vehicle that blocks your view of the crossing; it may have stopped for a pedestrian you cannot see. In a queue, as far as possible do not stop on the crossing either; wait before it. In the picture the blue van hides the pedestrian from the red car.',
           'Når du nærmer dig et fodgængerfelt, må du ikke overhale eller køre forbi et køretøj, der skjuler udsynet over feltet; det kan holde for en fodgænger, du ikke kan se. I kø skal du så vidt muligt heller ikke holde på fodgængerfeltet; vent før det. På billedet skjuler den blå varevogn fodgængeren for den røde bil.'),
          art='cross-hidden',
          rule=('از خودرویی که دید گذرگاه را می‌بندد، سبقت نگیرید و از کنارش رد نشوید.', 'Do not overtake or pass a vehicle that blocks your view of the crossing.', 'Overhal eller kør ikke forbi et køretøj, der skjuler udsynet over fodgængerfeltet.'),
          law=law((25, None), (27, 8)),
          trap=('«خط من خالی است، پس از کنار خودروی ایستاده رد می‌شوم» غلط است.', '«My lane is free, so I drive past the stopped vehicle» is wrong.', '«Min vognbane er fri, så jeg kører forbi det holdende køretøj» er forkert.')),
    teach(('گذرگاه چراغ‌دار و هنگام گردش', 'Crossings with lights, and when you turn', 'Fodgængerfelter med signal og ved sving'),
          ('در گذرگاهی که با چراغ یا پلیس اداره می‌شود، به عابرانی که روی گذرگاه‌اند راه بدهید، حتی وقتی چراغ شما اجازه‌ی حرکت می‌دهد؛ مثلاً کسی که با سبز راه افتاده و هنوز نرسیده است. هنگام گردش در تقاطع آهسته برانید و برای عابرانی که از عرض خیابانِ مقصد رد می‌شوند، در صورت لزوم بایستید.',
           'At a crossing controlled by lights or the police, give way to pedestrians who are on the crossing, even when your light lets you go; for example someone who started on green and has not got across yet. When you turn at a junction, drive slowly and stop if necessary for pedestrians crossing the road you turn into.',
           'Ved et fodgængerfelt, hvor færdslen reguleres af signal eller politi, skal du holde tilbage for fodgængere på feltet, selv om dit signal giver lov til at køre; f.eks. én, der gik over for grønt og ikke er nået over endnu. Når du svinger i et kryds, kører du langsomt og standser om nødvendigt for fodgængere, der går over den vej, du svinger ind på.'),
          art='cross-lights',
          rule=('با چراغ سبز هم به عابری که هنوز روی گذرگاه است راه بدهید.', 'Even on green, give way to a pedestrian still on the crossing.', 'Også for grønt holder du tilbage for en fodgænger, der stadig er på feltet.'),
          law=law((27, 5), (27, 6)),
          trap=('«چراغ عابر قرمز شده، پس او باید عجله کند» غلط است؛ شما صبر می‌کنید.', '«The pedestrian\'s light has turned red, so she must hurry» is wrong; you wait.', '«Fodgængerens lys er blevet rødt, så hun må skynde sig» er forkert; du venter.')),
    teach(('عابرانی که روی جاده راه می‌روند', 'Pedestrians walking on the road', 'Fodgængere på kørebanen'),
          ('در جاده‌ای که پیاده‌رو ندارد، وقتی به عابران می‌رسید یا از آن‌ها سبقت می‌گیرید، به آن‌ها وقت بدهید کنار بروند و با فاصله‌ی کافی رد شوید. هنگام عبور از پیاده‌رو برای ورود یا خروج از ملک، به عابران راه بدهید. به کودکان، سالمندان و کسانی که خوب نمی‌بینند یا نمی‌شنوند، مثلاً نابینا با عصای سفید، توجه ویژه داشته باشید.',
           'On a road without a pavement, when you meet or overtake pedestrians, give them time to step aside and pass with enough room. When you cross a pavement to drive into or out of a property, give way to pedestrians. Show special consideration to children, the elderly and those who do not see or hear well, for example a blind person with a white cane.',
           'På en vej uden fortov skal du, når du møder eller overhaler fodgængere, give dem tid til at gå til side og passere med god afstand. Når du kører over fortovet ind til eller ud fra en ejendom, holder du tilbage for fodgængere. Vis særligt hensyn over for børn, ældre og dem, der ser eller hører dårligt, f.eks. en blind med hvid stok.'),
          art='cross-road-walkers',
          rule=('به عابرانِ روی جاده وقت بدهید کنار بروند و با فاصله رد شوید.', 'Give pedestrians on the road time to step aside and pass with room.', 'Giv fodgængere på kørebanen tid til at gå til side, og passér med god afstand.'),
          law=law((27, 1), (27, 2), (3, 2)),
          trap=('«بوق می‌زنم تا کنار بروند و با همان سرعت رد می‌شوم» غلط است.', '«I sound the horn so that they step aside and pass at the same speed» is wrong.', '«Jeg dytter, så de går til side, og kører forbi med samme fart» er forkert.')),
    q('exam-cross-kerb',
      'Kvinden med barnevognen vil gå over fodgængerfeltet. Hvordan forholder du dig?',
      'The woman with the pram wants to cross at the pedestrian crossing. What do you do?',
      'زنی که کالسکه دارد می‌خواهد از گذرگاه رد شود. چه می‌کنید؟',
      st(True, 'Jeg sænker farten og standser, så hun kan gå over.', 'I slow down and stop so that she can cross.', 'سرعتم را کم می‌کنم و می‌ایستم تا او رد شود.',
         ('عابری که می‌خواهد وارد گذرگاه شود، باید بتواند بی‌خطر رد شود.', 'A pedestrian about to step onto the crossing must be able to cross safely.', 'En fodgænger på vej ud på feltet skal kunne gå sikkert over.')),
      st(False, 'Jeg kører videre, fordi hun ikke er gået ud på fodgængerfeltet endnu.', 'I drive on because she has not stepped onto the crossing yet.', 'ادامه می‌دهم، چون هنوز وارد گذرگاه نشده است.',
         ('قانون عابرِ «در حال ورود» را هم در بر می‌گیرد.', 'The law also covers a pedestrian «about to step out».', 'Loven gælder også fodgængere, der er på vej ud på feltet.')),
      st(False, 'Jeg dytter, så hun ved, at jeg kommer.', 'I sound the horn so that she knows I am coming.', 'بوق می‌زنم تا بداند دارم می‌آیم.',
         ('بوق جای راه دادن را نمی‌گیرد.', 'The horn does not replace giving way.', 'Hornet erstatter ikke at holde tilbage.')),
      rule=0),
    q('exam-cross-hidden',
      'Varevognen i venstre vognbane holder stille før fodgængerfeltet. Hvordan forholder du dig?',
      'The van in the left lane is standing still before the pedestrian crossing. What do you do?',
      'ون در خط چپ پیش از گذرگاه ایستاده است. چه می‌کنید؟',
      st(True, 'Jeg standser, fordi der kan gå en fodgænger foran varevognen.', 'I stop because a pedestrian may be walking in front of the van.', 'می‌ایستم، چون ممکن است عابری جلوی ون باشد.',
         ('نباید از کنار خودرویی که دید گذرگاه را می‌بندد رد شوید.', 'You must not pass a vehicle that blocks your view of the crossing.', 'Du må ikke køre forbi et køretøj, der skjuler udsynet over feltet.')),
      st(False, 'Jeg kører forbi i min egen vognbane, fordi den er fri.', 'I drive past in my own lane because it is free.', 'از خط خودم رد می‌شوم، چون خالی است.',
         ('خالی بودن خط شما مهم نیست؛ دید گذرگاه بسته است.', 'Your free lane does not matter; the view of the crossing is blocked.', 'At din vognbane er fri, er ligegyldigt; udsynet over feltet er spærret.')),
      rule=1),
    q('exam-cross-late',
      'Du får grønt lys, men en ældre mand går stadig over fodgængerfeltet foran dig. Hvordan forholder du dig?',
      'Your light turns green, but an elderly man is still crossing in front of you. What do you do?',
      'چراغ شما سبز می‌شود، ولی مردی سالمند هنوز از گذرگاه جلوی شما رد می‌شود. چه می‌کنید؟',
      st(True, 'Jeg venter, til han er kommet helt over.', 'I wait until he has got all the way across.', 'صبر می‌کنم تا کامل رد شود.',
         ('به عابری که هنوز روی گذرگاه است راه می‌دهید، حتی با چراغ سبز.', 'You give way to a pedestrian still on the crossing, even on green.', 'Du holder tilbage for en fodgænger på feltet, også for grønt.')),
      st(False, 'Jeg kører, fordi jeg har grønt, og han har rødt.', 'I drive off because I have green and he has red.', 'راه می‌افتم، چون چراغ من سبز و چراغ او قرمز است.',
         ('چراغ سبز حق تقدم بر عابرِ روی گذرگاه نمی‌دهد.', 'A green light gives no priority over a pedestrian on the crossing.', 'Grønt lys giver ikke forkørselsret over en fodgænger på feltet.')),
      rule=2),
    result(1),
    summary([('گذرگاه بدون چراغ: آهسته کنید و برای عابرِ روی گذرگاه یا در حال ورود بایستید.', 'A crossing without lights: slow down and stop for pedestrians on it or about to step out.', 'Fodgængerfelt uden signal: sænk farten, og stands for fodgængere på feltet eller på vej ud.'),
             ('از خودرویی که دید گذرگاه را می‌بندد، سبقت نگیرید و از کنارش رد نشوید.', 'Do not overtake or pass a vehicle that blocks your view of the crossing.', 'Overhal eller kør ikke forbi et køretøj, der skjuler udsynet over fodgængerfeltet.'),
             ('با چراغ سبز هم به عابرِ روی گذرگاه راه بدهید.', 'Even on green, give way to a pedestrian on the crossing.', 'Også for grønt holder du tilbage for fodgængere på feltet.'),
             ('به عابرانِ روی جاده وقت بدهید و با فاصله رد شوید.', 'Give pedestrians on the road time, and pass with room.', 'Giv fodgængere på kørebanen tid, og passér med god afstand.')],
            ('law', 'signs', 'plan')),
])

CYCLISTS = lesson('cyclists', 'CYCLISTS', ('دوچرخه و موپد', 'Bicycles and mopeds', 'Cykler og knallerter'), 8, [
    intro(('دوچرخه و موپد (cykler og knallerter)', 'Bicycles and mopeds (cykler og knallerter)', 'Cykler og knallerter'),
          ('در دانمارک دوچرخه همه جا هست و آزمون پر از دوچرخه‌سوار است: مسیر و خط دوچرخه، موپد کوچک و بزرگ، سبقت از دوچرخه‌سوار و این‌که دوچرخه‌سوار چطور به چپ می‌پیچد.',
           'In Denmark bicycles are everywhere and the test is full of cyclists: cycle paths and cycle lanes, small and large mopeds, overtaking a cyclist, and how a cyclist turns left.',
           'I Danmark er der cykler overalt, og prøven er fuld af cyklister: cykelstier og cykelbaner, lille og stor knallert, overhaling af en cyklist, og hvordan en cyklist svinger til venstre.'),
          [('بدانید دوچرخه و موپد کجا می‌روند.', 'Know where bicycles and mopeds ride.', 'Vide hvor cykler og knallerter kører.'),
           ('از دوچرخه‌سوار بی‌خطر سبقت بگیرید.', 'Overtake a cyclist safely.', 'Overhale en cyklist sikkert.'),
           ('بدانید دوچرخه‌سوار چطور به چپ می‌پیچد.', 'Know how a cyclist turns left.', 'Vide hvordan en cyklist svinger til venstre.')],
          [('موپد کوچک در مسیر دوچرخه و موپد بزرگ در خیابان.', 'A small moped on the cycle path and a large moped on the street.', 'En lille knallert på cykelstien og en stor knallert på kørebanen.'),
           ('سبقت از دوچرخه‌سوار وقتی خودرویی از روبه‌رو می‌آید.', 'Overtaking a cyclist when a car is coming towards you.', 'Overhaling af en cyklist, når der kommer en bil imod dig.'),
           ('دوچرخه‌سواری که دست چپش را بیرون آورده است.', 'A cyclist holding the left arm out.', 'En cyklist, der rækker venstre arm ud.')]),
    teach(('مسیر دوچرخه، خط دوچرخه و موپدها', 'Cycle paths, cycle lanes and mopeds', 'Cykelstier, cykelbaner og knallerter'),
          ('مسیر دوچرخه (cykelsti) با جدول از خیابان جداست و خط دوچرخه (cykelbane) با خط ممتد و نماد دوچرخه روی خود خیابان کشیده شده؛ در هیچ‌کدام نباید برانید یا پارک کنید و فقط برای پیچیدن از آن‌ها رد می‌شوید. موپد کوچک (lille knallert، حداکثر ۳۰ کیلومتر) باید در مسیر دوچرخه برود و موپد بزرگ (stor knallert، حداکثر ۴۵ کیلومتر، با پلاک) در خیابان.',
           'A cycle path (cykelsti) is separated from the street by a kerb, and a cycle lane (cykelbane) is painted on the street itself with a solid line and bicycle symbols; you must not drive or park in either, and you only cross them to turn. A small moped (lille knallert, at most 30 km/h) must ride on the cycle path, and a large moped (stor knallert, at most 45 km/h, with a number plate) on the street.',
           'En cykelsti er adskilt fra kørebanen med en kantsten, og en cykelbane er afmærket på selve kørebanen med en ubrudt linje og cykelsymboler; du må hverken køre eller parkere i dem og krydser dem kun for at svinge. En lille knallert (højst 30 km/t) skal køre på cykelstien og en stor knallert (højst 45 km/t, med nummerplade) på kørebanen.'),
          art='bike-paths',
          rule=('در مسیر و خط دوچرخه نرانید و نایستید؛ موپد کوچک در مسیر دوچرخه، موپد بزرگ در خیابان.', 'Do not drive or stop on cycle paths and lanes; small mopeds on the cycle path, large mopeds on the street.', 'Kør og stands ikke på cykelstier og cykelbaner; lille knallert på cykelstien, stor knallert på kørebanen.'),
          law=law((14, 1), (14, 2), (28, 3)),
          trap=('«برای یک توقف کوتاه روی مسیر دوچرخه می‌ایستم» غلط است؛ آن‌جا توقف هم ممنوع است.', '«I stop briefly on the cycle path» is wrong; even stopping is forbidden there.', '«Jeg holder kort på cykelstien» er forkert; også standsning er forbudt der.')),
    teach(('سبقت از دوچرخه‌سوار', 'Overtaking a cyclist', 'Overhaling af en cyklist'),
          ('از دوچرخه‌سوار با فاصله‌ی پهلوی زیاد سبقت بگیرید؛ توصیه می‌شود دست‌کم ۱٫۵ متر، و در سرعت بیشتر بیشتر. دوچرخه‌سوار ممکن است برای دور شدن از چاله یا با باد ناگهان کج شود. اگر به خاطر ترافیک روبه‌رو جا نیست، پشت سرش بمانید تا راه باز شود. ممنوعیت سبقت در تقاطع، سربالایی و پیچ برای سبقت از دوچرخه‌ی دوچرخ اعمال نمی‌شود، ولی باز هم باید بی‌خطر باشد.',
           'Overtake a cyclist with a wide side distance: at least 1.5 m is recommended, and more at higher speeds. A cyclist may swerve suddenly to avoid a pothole or in the wind. If there is no room because of oncoming traffic, stay behind until the way is clear. The bans on overtaking at junctions, hilltops and bends do not apply to overtaking a two-wheeled bicycle, but it must still be safe.',
           'Overhal en cyklist med god afstand til siden: mindst 1,5 m anbefales, og mere ved højere fart. En cyklist kan pludselig svinge ud for at undgå et hul eller i blæst. Er der ikke plads på grund af modkørende, bliver du bag cyklisten, til vejen er fri. Forbuddene mod overhaling i kryds, på bakketoppe og i sving gælder ikke for overhaling af en tohjulet cykel, men det skal stadig kunne ske uden fare.'),
          art='bike-overtake',
          rule=('با فاصله‌ی پهلوی زیاد سبقت بگیرید؛ اگر جا نیست، پشت دوچرخه‌سوار بمانید.', 'Overtake with a wide side distance; if there is no room, stay behind the cyclist.', 'Overhal med god sideafstand; er der ikke plads, bliver du bag cyklisten.'),
          law=law((21, 4), (23, 2)),
          trap=('«دوچرخه‌سوار باید کنار برود تا من رد شوم» غلط است؛ شما صبر می‌کنید تا جا باشد.', '«The cyclist must move over so that I can pass» is wrong; you wait until there is room.', '«Cyklisten må køre ind til siden, så jeg kan komme forbi» er forkert; du venter, til der er plads.')),
    teach(('دوچرخه‌سوار به چپ چطور می‌پیچد؟', 'How does a cyclist turn left?', 'Hvordan svinger en cyklist til venstre?'),
          ('در دانمارک دوچرخه‌سوار برای گردش به چپ کنار وسط خیابان نمی‌رود: سمت راست می‌ماند، مستقیم تا آن طرف تقاطع می‌رود و فقط وقتی برای دیگران مزاحمتی ندارد، می‌پیچد. پس دوچرخه‌سواری که جلوی شما دست چپش را بیرون آورده، معمولاً اول مستقیم می‌رود. دوچرخه‌سواران اگر جا باشد و خطری نداشته باشد، می‌توانند دو نفری کنار هم برانند.',
           'In Denmark a cyclist turning left does not move to the middle of the street: they keep to the right, ride straight across to the far side of the junction, and turn only when it causes no trouble for others. So a cyclist in front of you holding out the left arm will usually first go straight on. Cyclists may ride two side by side if there is room and it is safe.',
           'I Danmark trækker en cyklist, der vil svinge til venstre, ikke ind mod midten af vejen: cyklisten holder til højre, kører ligeud over krydset til den modsatte side og svinger først, når det kan ske uden ulempe for andre. En cyklist foran dig, der rækker venstre arm ud, kører derfor som regel først ligeud. Cyklister må køre to ved siden af hinanden, når der er plads, og det kan ske uden fare.'),
          art='bike-left',
          rule=('دوچرخه‌سوار برای گردش به چپ اول مستقیم تا آن طرف تقاطع می‌رود، بعد می‌پیچد.', 'A cyclist turning left first rides straight across the junction, then turns.', 'En cyklist, der skal til venstre, kører først ligeud over krydset og svinger derefter.'),
          law=law((49, 1), (49, 3)),
          trap=('«دوچرخه‌سوار مثل خودرو کنار خط وسط می‌رود» در دانمارک غلط است.', '«A cyclist moves to the centre line like a car» is wrong in Denmark.', '«En cyklist trækker ind mod midten som en bil» er forkert i Danmark.')),
    q('exam-bike-moped',
      'Hvilke af knallerterne kører det rigtige sted?',
      'Which of the mopeds are riding in the right place?',
      'کدام‌یک از موپدها جای درستی می‌رانند؟',
      st(True, 'Den lille knallert på cykelstien.', 'The small moped on the cycle path.', 'موپد کوچکی که در مسیر دوچرخه است.',
         ('موپد کوچک باید در مسیر دوچرخه برود.', 'A small moped must ride on the cycle path.', 'En lille knallert skal køre på cykelstien.')),
      st(True, 'Den store knallert på kørebanen.', 'The large moped on the road.', 'موپد بزرگی که در خیابان است.',
         ('موپد بزرگ وسیله‌ی موتوری است و در خیابان می‌رود.', 'A large moped is a motor vehicle and rides on the street.', 'En stor knallert er et motorkøretøj og kører på kørebanen.')),
      st(False, 'Begge knallerter skal køre på cykelstien.', 'Both mopeds must ride on the cycle path.', 'هر دو موپد باید در مسیر دوچرخه بروند.',
         ('فقط موپد کوچک در مسیر دوچرخه می‌رود.', 'Only the small moped rides on the cycle path.', 'Kun den lille knallert kører på cykelstien.')),
      rule=0),
    q('exam-bike-overtake',
      'Du vil overhale cyklisten. Der kommer en bil imod dig. Hvordan forholder du dig?',
      'You want to overtake the cyclist. A car is coming towards you. What do you do?',
      'می‌خواهید از دوچرخه‌سوار سبقت بگیرید. خودرویی از روبه‌رو می‌آید. چه می‌کنید؟',
      st(True, 'Jeg venter med at overhale, til den modkørende bil er kørt forbi.', 'I wait to overtake until the oncoming car has passed.', 'برای سبقت صبر می‌کنم تا خودروی روبه‌رو رد شود.',
         ('با خودرویی که از روبه‌رو می‌آید، جای کافی برای فاصله از دوچرخه‌سوار نیست.', 'With a car coming towards you there is not enough room to keep away from the cyclist.', 'Med en modkørende bil er der ikke plads nok til god afstand til cyklisten.')),
      st(False, 'Jeg overhaler med det samme, men tæt på cyklisten.', 'I overtake at once, but close to the cyclist.', 'همین حالا سبقت می‌گیرم، ولی نزدیک به دوچرخه‌سوار.',
         ('سبقت نزدیک به دوچرخه‌سوار بسیار خطرناک است.', 'Overtaking close to a cyclist is very dangerous.', 'Overhaling tæt på en cyklist er meget farlig.')),
      st(True, 'Når jeg overhaler, holder jeg god afstand til siden.', 'When I overtake, I keep a good distance to the side.', 'وقتی سبقت می‌گیرم، از پهلو فاصله‌ی خوبی نگه می‌دارم.',
         ('فاصله‌ی پهلوی کافی لازم است.', 'Enough side distance is needed.', 'Der skal være tilstrækkelig afstand til siden.')),
      rule=1),
    q('exam-bike-left',
      'Cyklisten foran dig rækker venstre arm ud. Hvordan vil cyklisten normalt svinge til venstre?',
      'The cyclist in front of you holds out the left arm. How will the cyclist normally turn left?',
      'دوچرخه‌سوار جلوی شما دست چپش را بیرون آورده است. معمولاً چطور به چپ می‌پیچد؟',
      st(True, 'Cyklisten kører ligeud over krydset og svinger først på den anden side.', 'The cyclist rides straight across the junction and turns only on the other side.', 'مستقیم از تقاطع رد می‌شود و آن طرف می‌پیچد.',
         ('در دانمارک دوچرخه‌سوار در دو مرحله به چپ می‌پیچد.', 'In Denmark a cyclist turns left in two steps.', 'I Danmark svinger en cyklist til venstre i to tempi.')),
      st(False, 'Cyklisten trækker ind mod midten af vejen før krydset.', 'The cyclist moves to the middle of the road before the junction.', 'پیش از تقاطع به وسط خیابان می‌رود.',
         ('دوچرخه‌سوار پیش از تقاطع سمت راست می‌ماند.', 'A cyclist keeps to the right before the junction.', 'Cyklisten holder til højre før krydset.')),
      rule=2),
    result(1),
    summary([('در مسیر و خط دوچرخه نرانید و نایستید؛ موپد کوچک در مسیر دوچرخه، موپد بزرگ در خیابان.', 'Do not drive or stop on cycle paths and lanes; small mopeds on the cycle path, large mopeds on the street.', 'Kør og stands ikke på cykelstier og cykelbaner; lille knallert på cykelstien, stor knallert på kørebanen.'),
             ('از دوچرخه‌سوار با فاصله‌ی زیاد سبقت بگیرید؛ اگر جا نیست، صبر کنید.', 'Overtake a cyclist with plenty of room; if there is none, wait.', 'Overhal en cyklist med god plads; er der ingen, venter du.'),
             ('دوچرخه‌سوار به چپ در دو مرحله می‌پیچد: اول مستقیم، بعد آن طرف.', 'A cyclist turns left in two steps: first straight on, then on the far side.', 'En cyklist svinger til venstre i to tempi: først ligeud, så på den anden side.')],
            ('law', 'plan')),
])

VULNERABLE = lesson('vulnerable', 'VULNERABLE', ('کودکان، سالمندان و حیوانات', 'Children, the elderly and animals', 'Børn, ældre og dyr'), 8, [
    intro(('کودکان، سالمندان و حیوانات', 'Children, the elderly and animals', 'Børn, ældre og dyr'),
          ('قانون می‌خواهد به کودکان، سالمندان و کسانی که خوب نمی‌بینند یا نمی‌شنوند، توجه ویژه داشته باشید. آزمون موقعیت‌هایی مثل توپی که به خیابان می‌آید، اتوبوس مدرسه، سوار اسب و آهو را نشان می‌دهد.',
           'The law asks you to show special consideration to children, the elderly and people who do not see or hear well. The test shows situations such as a ball rolling into the street, a school bus, a rider on a horse and a deer.',
           'Loven kræver særligt hensyn over for børn, ældre og personer, der ser eller hører dårligt. Prøven viser situationer som en bold, der triller ud på vejen, en skolebus, en rytter til hest og et rådyr.'),
          [('بدانید نزدیک کودکان و اتوبوس مدرسه چطور برانید.', 'Know how to drive near children and school buses.', 'Vide hvordan du kører nær børn og skolebusser.'),
           ('به سالمندان و افراد با محدودیت توجه کنید.', 'Show consideration for the elderly and people with impairments.', 'Vise hensyn over for ældre og personer med handicap.'),
           ('از کنار حیوانات بی‌خطر رد شوید و بدانید اگر به حیوانی زدید چه کنید.', 'Pass animals safely and know what to do if you hit one.', 'Passere dyr sikkert og vide hvad du gør, hvis du rammer et.')],
          [('توپی که از بین خودروهای پارک‌شده به خیابان می‌آید.', 'A ball rolling into the street from between parked cars.', 'En bold, der triller ud mellem parkerede biler.'),
           ('سوار اسب در جاده‌ی بیرون شهر.', 'A rider on a horse on a country road.', 'En rytter til hest på en landevej.'),
           ('تابلوی آهو هنگام غروب و آهویی که از جاده رد شده.', 'The deer sign at dusk and a deer that has crossed the road.', 'Tavlen for dyrevildt i skumringen og et dyr, der er løbet over vejen.')]),
    teach(('کودکان', 'Children', 'Børn'),
          ('کودکان کوچک‌اند، دیده نمی‌شوند و غیرقابل پیش‌بینی‌اند؛ ممکن است دنبال توپ از بین خودروهای پارک‌شده بیرون بدوند. نزدیک مدرسه، زمین بازی و تابلوی A 22 آهسته برانید و آماده‌ی ایستادن باشید. توپی که به خیابان می‌آید، معمولاً یعنی کودکی پشت سرش می‌آید.',
           'Children are small, hard to see and unpredictable; they may run out after a ball from between parked cars. Near schools, playgrounds and the A 22 sign, drive slowly and be ready to stop. A ball rolling into the street usually means a child is coming after it.',
           'Børn er små, svære at se og uforudsigelige; de kan løbe ud efter en bold mellem parkerede biler. Ved skoler, legepladser og tavle A 22 kører du langsomt og er klar til at standse. En bold, der triller ud på vejen, betyder som regel, at der kommer et barn efter den.'),
          art='kids-ball',
          rule=('نزدیک کودکان آهسته برانید؛ پشت توپ معمولاً یک کودک می‌آید.', 'Drive slowly near children; a child usually comes after a ball.', 'Kør langsomt nær børn; efter en bold kommer der som regel et barn.'),
          law=law((3, 2), (41, 2), 'A 22'),
          trap=('«کودک باید مراقب باشد، نه من» غلط است؛ از کودک نمی‌شود انتظار رفتار درست داشت.', '«The child must watch out, not me» is wrong; you cannot expect a child to behave correctly.', '«Barnet må passe på, ikke mig» er forkert; du kan ikke forvente, at et barn opfører sig rigtigt.')),
    teach(('اتوبوس مدرسه و اتوبوس شهری', 'School buses and town buses', 'Skolebusser og bybusser'),
          ('به اتوبوس مدرسه‌ای که برای سوار و پیاده کردن کودکان ایستاده یا دارد راه می‌افتد، با توجه ویژه نزدیک شوید و مراقب کودکانی باشید که روی جاده‌اند یا می‌خواهند واردش شوند. در شهر، وقتی اتوبوسی در ایستگاه راهنما می‌زند که راه بیفتد، سرعت را کم کنید و در صورت لزوم بایستید تا بیرون بیاید.',
           'Approach a school bus that has stopped to let children on or off, or is pulling away, with special attention, and watch for children on the road or about to step onto it. In towns, when a bus at a stop signals that it is pulling out, slow down and stop if necessary to let it out.',
           'En skolebus, der holder for at lade børn stige på eller af eller kører fra stoppestedet, skal du nærme dig med særlig agtpågivenhed og holde øje med børn på kørebanen eller på vej ud på den. I byen skal du sænke farten og om nødvendigt standse, når en bus ved et stoppested blinker for at køre ud, så den kan komme ud.'),
          art='kids-schoolbus',
          rule=('کنار اتوبوس مدرسه‌ی ایستاده مراقب کودکان باشید؛ در شهر بگذارید اتوبوس از ایستگاه بیرون بیاید.', 'Watch for children by a stopped school bus; in towns, let a bus pull out of its stop.', 'Pas på børn ved en holdende skolebus; i byen lader du bussen køre ud fra stoppestedet.'),
          law=law((19, 1), (19, 2)),
          trap=('«اتوبوس در سمت خودش ایستاده، پس با همان سرعت رد می‌شوم» غلط است.', '«The bus is standing on its own side, so I pass at the same speed» is wrong.', '«Bussen holder i sin egen side, så jeg kører forbi med samme fart» er forkert.')),
    teach(('سالمندان و افراد با محدودیت', 'The elderly and people with impairments', 'Ældre og personer med handicap'),
          ('سالمندان ممکن است آهسته راه بروند، کمتر ببینند یا بشنوند و سرعت شما را درست تخمین نزنند. نابینا عصای سفید یا سگ راهنما دارد و ناشنوا صدای خودرو را نمی‌شنود. به آن‌ها وقت بدهید، بوق نزنید و آهسته و با فاصله رد شوید.',
           'Elderly people may walk slowly, see or hear less and misjudge your speed. A blind person has a white cane or a guide dog, and a deaf person does not hear the car. Give them time, do not sound the horn, and pass slowly with room.',
           'Ældre kan gå langsomt, se eller høre dårligere og misbedømme din fart. En blind har hvid stok eller førerhund, og en døv hører ikke bilen. Giv dem tid, dyt ikke, og passér langsomt med god afstand.'),
          rule=('به سالمندان و نابینایان (عصای سفید) وقت بدهید و آهسته رد شوید.', 'Give the elderly and blind people (white cane) time and pass slowly.', 'Giv ældre og blinde (hvid stok) tid, og passér langsomt.'),
          law=law((3, 2)),
          trap=('«بوق می‌زنم تا متوجه من شود» برای سالمند یا نابینا کمکی نمی‌کند و می‌ترساندش.', '«I sound the horn so that he notices me» does not help an elderly or blind person and startles him.', '«Jeg dytter, så han lægger mærke til mig» hjælper ikke en ældre eller blind og forskrækker ham.')),
    teach(('حیوانات', 'Animals', 'Dyr'),
          ('از اسب آهسته و با فاصله‌ی زیاد رد شوید، صدای ناگهانی نکنید و بوق نزنید؛ اسب ممکن است بترسد. تابلوهای A 23 (سوار اسب)، A 26 (حیوان وحشی) و A 27 (گاو و دام) هشدار می‌دهند. آهوها اغلب هنگام غروب و طلوع و گروهی می‌آیند: اگر یکی از جاده رد شد، منتظر بقیه باشید. اگر به حیوانی زدید (آهو، سگ یا گربه)، محل را علامت بگذارید و پیش از رفتن به Dyrenes Vagtcentral با شماره‌ی ۱۸۱۲ زنگ بزنید.',
           'Pass horses slowly with a wide gap, make no sudden noise and do not sound the horn; a horse may take fright. The signs A 23 (riders), A 26 (wild animals) and A 27 (cattle) warn you. Deer often come at dusk and dawn and in groups: if one has crossed, expect more. If you hit an animal (a deer, a dog or a cat), mark the place and call Dyrenes Vagtcentral on 1812 before you drive on.',
           'Passér heste langsomt med god afstand, undgå pludselige lyde, og dyt ikke; hesten kan blive bange. Tavlerne A 23 (ridende), A 26 (dyrevildt) og A 27 (kreaturer) advarer. Rådyr kommer ofte i skumringen og ved daggry og i flok: er ét løbet over, så regn med flere. Rammer du et dyr (et rådyr, en hund eller en kat), markerer du stedet og ringer til Dyrenes Vagtcentral på 1812, før du kører videre.'),
          art='animals-horse',
          rule=('از اسب آهسته و با فاصله رد شوید؛ بعد از یک آهو منتظر بقیه باشید؛ اگر به حیوانی زدید: ۱۸۱۲.', 'Pass horses slowly and wide; after one deer expect more; if you hit an animal: 1812.', 'Passér heste langsomt og med afstand; efter ét rådyr kommer der flere; rammer du et dyr: 1812.'),
          law=law((41, 2), 'A 23 | A 26 | A 27'),
          trap=('«بوق می‌زنم تا سوار متوجه من شود» غلط است؛ اسب می‌ترسد.', '«I sound the horn so that the rider notices me» is wrong; the horse takes fright.', '«Jeg dytter, så rytteren ser mig» er forkert; hesten bliver bange.')),
    q('exam-kids-ball',
      'En bold triller ud på vejen mellem de parkerede biler. Hvordan forholder du dig?',
      'A ball rolls out into the road between the parked cars. What do you do?',
      'توپی از بین خودروهای پارک‌شده به خیابان می‌آید. چه می‌کنید؟',
      st(True, 'Jeg bremser og er klar til at standse, fordi et barn kan løbe efter bolden.', 'I brake and am ready to stop because a child may run after the ball.', 'ترمز می‌کنم و آماده‌ی ایستادن هستم، چون ممکن است کودکی دنبال توپ بدود.',
         ('پشت توپ معمولاً یک کودک می‌آید.', 'A child usually comes after a ball.', 'Efter en bold kommer der som regel et barn.')),
      st(False, 'Jeg kører uden om bolden og fortsætter med samme fart.', 'I drive round the ball and continue at the same speed.', 'از کنار توپ رد می‌شوم و با همان سرعت ادامه می‌دهم.',
         ('خطر توپ نیست؛ کودکی است که شاید پشت خودروها باشد.', 'The danger is not the ball but a child who may be behind the cars.', 'Faren er ikke bolden, men et barn, der kan være bag bilerne.')),
      rule=0),
    q('exam-animals-horse',
      'Der rider to personer på heste foran dig. Hvordan forholder du dig?',
      'Two people are riding horses ahead of you. What do you do?',
      'دو نفر جلوی شما سوار اسب‌اند. چه می‌کنید؟',
      st(True, 'Jeg sænker farten og passerer i god afstand.', 'I slow down and pass at a good distance.', 'سرعتم را کم می‌کنم و با فاصله‌ی زیاد رد می‌شوم.',
         ('اسب ممکن است بترسد؛ آهسته و با فاصله رد شوید.', 'A horse may take fright; pass slowly and wide.', 'En hest kan blive bange; passér langsomt og med afstand.')),
      st(False, 'Jeg dytter, så rytterne ved, at jeg kommer.', 'I sound the horn so that the riders know I am coming.', 'بوق می‌زنم تا سوارها بدانند دارم می‌آیم.',
         ('بوق اسب را می‌ترساند.', 'The horn frightens the horse.', 'Hornet skræmmer hesten.')),
      st(True, 'Jeg er klar til at standse, hvis en hest bliver urolig.', 'I am ready to stop if a horse becomes restless.', 'اگر اسبی ناآرام شد، آماده‌ی ایستادنم.',
         ('حیوان غیرقابل پیش‌بینی است.', 'An animal is unpredictable.', 'Et dyr er uforudsigeligt.')),
      rule=3),
    q('exam-animals-deer',
      'Et rådyr er lige løbet over vejen foran dig. Hvordan forholder du dig?',
      'A deer has just run across the road in front of you. What do you do?',
      'آهویی همین حالا از جاده‌ی جلوی شما رد شده است. چه می‌کنید؟',
      st(True, 'Jeg sænker farten, fordi der kan komme flere dyr.', 'I slow down because more animals may come.', 'سرعتم را کم می‌کنم، چون ممکن است حیوانات دیگری هم بیایند.',
         ('آهوها اغلب گروهی می‌آیند.', 'Deer often come in groups.', 'Rådyr kommer ofte i flok.')),
      st(False, 'Faren er overstået, når dyret er kommet over vejen.', 'The danger is over once the animal has crossed the road.', 'وقتی حیوان از جاده رد شد، خطر تمام شده است.',
         ('بعد از یک آهو، منتظر بقیه باشید.', 'After one deer, expect more.', 'Efter ét rådyr skal du regne med flere.')),
      st(True, 'Hvis jeg rammer et dyr, markerer jeg stedet og ringer til Dyrenes Vagtcentral på 1812.', 'If I hit an animal, I mark the place and call Dyrenes Vagtcentral on 1812.', 'اگر به حیوانی بزنم، محل را علامت می‌گذارم و به Dyrenes Vagtcentral با شماره‌ی ۱۸۱۲ زنگ می‌زنم.',
         ('این کار را پیش از ادامه‌ی راه انجام می‌دهید.', 'You do this before you drive on.', 'Det gør du, før du kører videre.')),
      rule=3),
    result(1),
    summary([('نزدیک کودکان آهسته برانید؛ پشت توپ معمولاً یک کودک می‌آید.', 'Drive slowly near children; a child usually comes after a ball.', 'Kør langsomt nær børn; efter en bold kommer der som regel et barn.'),
             ('کنار اتوبوس مدرسه مراقب کودکان باشید؛ در شهر بگذارید اتوبوس از ایستگاه بیرون بیاید.', 'Watch for children by a school bus; in towns, let a bus pull out of its stop.', 'Pas på børn ved skolebussen; i byen lader du bussen køre ud.'),
             ('به سالمندان و نابینایان وقت بدهید؛ بوق نزنید.', 'Give the elderly and blind people time; do not sound the horn.', 'Giv ældre og blinde tid; dyt ikke.'),
             ('از اسب آهسته و با فاصله رد شوید؛ بعد از یک آهو منتظر بقیه باشید؛ تصادف با حیوان: ۱۸۱۲.', 'Pass horses slowly and wide; after one deer expect more; hitting an animal: 1812.', 'Passér heste langsomt og med afstand; efter ét rådyr kommer flere; påkørt dyr: 1812.')],
            ('law', 'animals', 'plan')),
])

PEOPLE_TEST = lesson('people-test', 'PEOPLE_TEST', ('آزمون فصل', 'Chapter test', 'Kapiteltest'), 6, [
    intro(('آزمون فصل ۶', 'Chapter 6 test', 'Kapiteltest 6'),
          ('حالا عابران، دوچرخه‌سواران، کودکان و حیوانات را با هم مرور می‌کنیم. سؤال‌ها مثل آزمون واقعی‌اند و درس‌ها در هم آمده‌اند؛ هر علامت اشتباه یا جاافتاده یک اشتباه است.',
           'Now we go over pedestrians, cyclists, children and animals together. The questions are like the real test and the lessons are mixed; every wrong or missing tick is one mistake.',
           'Nu gennemgår vi fodgængere, cyklister, børn og dyr samlet. Spørgsmålene er som ved den rigtige prøve, og lektionerne er blandet; hvert forkert eller manglende kryds er én fejl.'),
          [('نشان دهید مراقب آسیب‌پذیرترین کاربران جاده هستید.', 'Show that you look after the most vulnerable road users.', 'Vise at du passer på de mest sårbare trafikanter.'),
           ('نقطه‌های ضعفتان را پیش از فصل بعد پیدا کنید.', 'Find your weak points before the next chapter.', 'Finde dine svage punkter før næste kapitel.')],
          [('گذرگاه عابر، عابران روی جاده و موپد کوچک.', 'Pedestrian crossings, pedestrians on the road and small mopeds.', 'Fodgængerfelter, fodgængere på kørebanen og lille knallert.'),
           ('فاصله از دوچرخه‌سوار و اتوبوس مدرسه.', 'The distance to a cyclist and a school bus.', 'Afstand til en cyklist og en skolebus.')]),
    q('cross-hidden',
      'Varevognen holder stille før fodgængerfeltet. Må den røde bil køre forbi den?',
      'The van is standing still before the pedestrian crossing. May the red car drive past it?',
      'ون پیش از گذرگاه ایستاده است. خودروی قرمز می‌تواند از کنارش رد شود؟',
      st(False, 'Ja, i den højre vognbane, når den er fri.', 'Yes, in the right lane when it is free.', 'بله، در خط راست، وقتی خالی است.', ('ون دید گذرگاه را بسته است.', 'The van blocks the view of the crossing.', 'Varevognen skjuler udsynet over feltet.')),
      st(True, 'Nej, ikke så længe varevognen skjuler udsynet over fodgængerfeltet.', 'No, not while the van hides the view of the crossing.', 'نه، تا وقتی ون دید گذرگاه را بسته است.', ('از خودرویی که دید گذرگاه را می‌بندد، رد نشوید.', 'Do not pass a vehicle that blocks your view of the crossing.', 'Kør ikke forbi et køretøj, der skjuler udsynet over feltet.'))),
    q('bike-overtake',
      'Hvor stor afstand skal du holde til siden, når du overhaler en cyklist?',
      'How much distance must you keep to the side when you overtake a cyclist?',
      'وقتی از دوچرخه‌سوار سبقت می‌گیرید، از پهلو چقدر فاصله نگه می‌دارید؟',
      st(True, 'God afstand, gerne mindst 1,5 m.', 'A good distance, preferably at least 1.5 m.', 'فاصله‌ی زیاد، ترجیحاً دست‌کم ۱٫۵ متر.', ('دوچرخه‌سوار ممکن است ناگهان کج شود.', 'A cyclist may swerve suddenly.', 'En cyklist kan pludselig svinge ud.')),
      st(False, 'Det er nok, at jeg ikke rører cyklisten.', 'It is enough that I do not touch the cyclist.', 'کافی است به دوچرخه‌سوار نخورم.', ('فاصله‌ی کم دوچرخه‌سوار را به خطر می‌اندازد.', 'A small distance puts the cyclist in danger.', 'En lille afstand bringer cyklisten i fare.'))),
    q('kids-schoolbus',
      'Skolebussen holder for at lukke børn af. Hvordan forholder du dig?',
      'The school bus has stopped to let children off. What do you do?',
      'اتوبوس مدرسه برای پیاده کردن کودکان ایستاده است. چه می‌کنید؟',
      st(True, 'Jeg sænker farten og holder øje med børn, der går ud på kørebanen.', 'I slow down and watch for children stepping onto the road.', 'سرعتم را کم می‌کنم و مراقب کودکانی هستم که وارد جاده می‌شوند.', ('کنار اتوبوس مدرسه توجه ویژه لازم است.', 'Special attention is needed by a school bus.', 'Ved en skolebus kræves særlig agtpågivenhed.')),
      st(False, 'Jeg kører forbi med samme fart, fordi bussen holder i sin egen side.', 'I drive past at the same speed because the bus is standing on its own side.', 'با همان سرعت رد می‌شوم، چون اتوبوس سمت خودش ایستاده است.', ('کودکان ممکن است از پشت اتوبوس بیرون بیایند.', 'Children may come out from behind the bus.', 'Børn kan komme ud bag bussen.'))),
    q('bike-paths',
      'Hvor skal en lille knallert køre, når der er en cykelsti?',
      'Where must a small moped ride when there is a cycle path?',
      'وقتی مسیر دوچرخه هست، موپد کوچک کجا باید برود؟',
      st(True, 'På cykelstien.', 'On the cycle path.', 'در مسیر دوچرخه.', ('موپد کوچک باید در مسیر دوچرخه برود.', 'A small moped must ride on the cycle path.', 'En lille knallert skal køre på cykelstien.')),
      st(False, 'På kørebanen ligesom en bil.', 'On the road like a car.', 'در خیابان، مثل خودرو.', ('موپد بزرگ در خیابان می‌رود، نه موپد کوچک.', 'A large moped rides on the street, not a small one.', 'Det er den store knallert, der kører på kørebanen.'))),
    q('cross-road-walkers',
      'Der er ikke noget fortov. Hvordan passerer du fodgængerne?',
      'There is no pavement. How do you pass the pedestrians?',
      'پیاده‌رو نیست. چطور از کنار عابران رد می‌شوید؟',
      st(True, 'Jeg sænker farten og passerer i god afstand.', 'I slow down and pass at a good distance.', 'سرعتم را کم می‌کنم و با فاصله‌ی زیاد رد می‌شوم.', ('به عابران وقت و جای کافی بدهید.', 'Give pedestrians time and enough room.', 'Giv fodgængerne tid og plads nok.')),
      st(False, 'Jeg dytter, så de går ind til siden.', 'I sound the horn so that they move over.', 'بوق می‌زنم تا کنار بروند.', ('بوق جای فاصله و آهسته راندن را نمی‌گیرد.', 'The horn does not replace distance and slowing down.', 'Hornet erstatter ikke afstand og lav fart.'))),
    q('exam-cross-kerb',
      'Hvad gælder ved et fodgængerfelt uden signaler?',
      'What applies at a pedestrian crossing without lights?',
      'در گذرگاه عابر بدون چراغ کدام درست است؟',
      st(True, 'Jeg skal afpasse farten, så fodgængere kan gå over uden fare.', 'I must adjust my speed so that pedestrians can cross safely.', 'باید سرعتم را طوری تنظیم کنم که عابران بی‌خطر رد شوند.', ('قانون این را برای گذرگاه بدون چراغ می‌خواهد.', 'The law asks this at a crossing without lights.', 'Det kræver loven ved et fodgængerfelt uden signal.')),
      st(False, 'Fodgængerne skal vente, til der ikke kommer biler.', 'The pedestrians must wait until no cars are coming.', 'عابران باید صبر کنند تا خودرویی نیاید.', ('در گذرگاه، شما برای عابر می‌ایستید، نه برعکس.', 'At a crossing you stop for the pedestrian, not the other way round.', 'Ved fodgængerfeltet standser du for fodgængeren, ikke omvendt.'))),
    result(2),
    summary([('از خودرویی که دید گذرگاه را می‌بندد رد نشوید؛ در گذرگاه بدون چراغ برای عابر بایستید.', 'Do not pass a vehicle that blocks your view of a crossing; stop for pedestrians at crossings without lights.', 'Kør ikke forbi et køretøj, der skjuler fodgængerfeltet; stands for fodgængere ved felter uden signal.'),
             ('از دوچرخه‌سوار با دست‌کم ۱٫۵ متر فاصله سبقت بگیرید؛ موپد کوچک در مسیر دوچرخه.', 'Overtake cyclists with at least 1.5 m; small mopeds ride on the cycle path.', 'Overhal cyklister med mindst 1,5 m; lille knallert kører på cykelstien.'),
             ('کنار اتوبوس مدرسه آهسته کنید؛ از عابرانِ روی جاده با فاصله رد شوید.', 'Slow down by a school bus; pass pedestrians on the road with room.', 'Sænk farten ved skolebussen; passér fodgængere på vejen med afstand.')],
            ('law', 'plan')),
])

CHAPTER = 'people'
LESSONS = [CROSSING, CYCLISTS, VULNERABLE, PEOPLE_TEST]
