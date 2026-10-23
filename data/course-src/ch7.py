# Chapter 7 «جاده‌های ویژه و شرایط سخت»: the motorway (after course.ts's joining it), driving in the dark, rain, snow,
# ice and wind, and the chapter's test. Rules from Færdselsloven §§ 15, 18, 32, 33, 41 and 44–46.
from course import TOWN, above, intro, law, lesson, q, result, st, summary, teach, view

NIGHT = 'night, dark sky, only our dipped headlights and the street or car lights light the scene'

# ---------- pictures (prompts for the image model) ----------
above('mw-lanes', """
THE SCENE: a straight Danish motorway running from the bottom to the top of the picture. Our carriageway (on the right) has THREE lanes going up, separated by white broken lane lines, then a hard shoulder on the far right behind a broad solid white edge line; on the left a central reservation with a crash barrier and the other carriageway beyond it.
VEHICLES (colour code used strictly):
- a large WHITE lorry in the RIGHT lane;
- a GREY lorry in the MIDDLE lane overtaking the white one;
- a BLUE car in the LEFT lane overtaking both, with a SOLID GREEN arrow ahead of it;
- a RED car (ours) in the RIGHT lane behind the white lorry at a good distance.
MUST NOT APPEAR: lorries in the left lane, signs, people, text, letters, numbers, left-hand traffic.
""")

above('mw-exit', """
THE SCENE: a straight Danish motorway running from the bottom to the top of the picture, two lanes going up, a hard shoulder on the right behind a broad solid white edge line. In the middle of the picture an exit: a deceleration lane opens on the right, separated from the motorway by a broken line of short thick dashes, and leads up to the right onto an exit ramp curving away to the upper right.
VEHICLES (colour code used strictly):
- a RED car (ours) on the deceleration lane, braking there (brake lights on), with a DASHED ORANGE arrow up along the exit ramp;
- a BLUE car driving on in the right-hand motorway lane at speed;
- further up, beyond the exit, on the hard shoulder a faint semi-transparent ghost of a car REVERSING back towards the exit, crossed out by a red X in a white circle (never do this).
MUST NOT APPEAR: signs, people, text, letters, numbers, left-hand traffic.
""")

view('exam-mw-queue', """
THE SCENE: a straight Danish motorway, two lanes in our direction, a hard shoulder on the right behind a broad solid edge line, a crash barrier on the left. We drive in the right lane at motorway speed. About 120 m ahead the traffic in both lanes has suddenly come to a standstill: a queue of cars and a lorry standing still with all their brake lights glowing red; the hard shoulder is empty.
MUST BE CLEARLY VISIBLE: the sudden standing queue ahead with brake lights in both lanes, the empty hard shoulder.
MUST NOT APPEAR: signs, people, text.
""")

above('dark-meet', f"""
THE SCENE at NIGHT: a straight two-way country road running from the bottom to the top of the picture, a white broken centre line, solid edge lines, dark fields. The scene is dark; the cars' headlights throw soft pale-yellow cones of light onto the road ahead of them.
VEHICLES (colour code used strictly):
- a RED car (ours) in the right-hand lane in the lower part, driving up, with SHORT, low light cones (dipped headlights) that light only the road just ahead and its right edge;
- a BLUE car in the left-hand lane in the upper part, driving down towards us, also with short dipped-light cones;
- at the bottom, behind the red car, a faint semi-transparent ghost of very LONG bright light cones reaching far up the road, crossed out by a red X in a white circle (high beam must be dipped when meeting).
MUST NOT APPEAR: street lights, signs, people, text, letters, numbers, left-hand traffic.
""")

view('dark-walker', """
THE SCENE: a straight two-way country road at NIGHT without street lights, one lane in each direction, white edge lines. Our dipped headlights light the road for about 40 m ahead and fade out. At the right edge of the road, about 25 m ahead, a pedestrian in DARK clothes walks in our direction, only just visible at the end of the light. Further ahead, about 60 m away, a second pedestrian wears a reflective vest that shines brightly in our lights.
MUST BE CLEARLY VISIBLE: how hard the pedestrian in dark clothes is to see compared with the one with the reflective vest.
MUST NOT APPEAR: other road users, signs, text.
""", cond=NIGHT)

view('dark-dazzle', """
THE SCENE: a two-way country road at NIGHT without street lights, one lane in each direction, a white broken centre line and a white edge line on the right. An oncoming car about 50 m ahead in the other lane has its high beams on: two very bright white lights with large glare and rays that dazzle us; the road beyond it disappears in the glare. The white edge line on our RIGHT stays clearly visible in our own dipped lights.
MUST BE CLEARLY VISIBLE: the dazzling glare of the oncoming lights and the white edge line on the right.
MUST NOT APPEAR: other road users, signs, text.
""", cond=NIGHT)

view('exam-dark-meet', """
THE SCENE: a straight two-way country road at NIGHT without street lights, one lane in each direction, a white broken centre line and edge lines. Our HIGH BEAMS are on: the road is brightly lit far ahead, with the white roadside posts shining. Far ahead, about 300 m away, the headlights of an oncoming car have just appeared over a slight rise.
MUST BE CLEARLY VISIBLE: our long high-beam light on the road, the oncoming car's headlights in the distance.
MUST NOT APPEAR: other road users, signs, text.
""", cond='night, dark sky, our high beams lighting the road far ahead')

view('exam-dark-walker', """
THE SCENE: a two-way country road at NIGHT without street lights, one lane in each direction, white edge lines; our dipped headlights light the road for about 40 m ahead. At the very end of the light, at the right edge of our lane about 30 m ahead, a person in dark clothes walks in our direction, hard to see. No reflectors.
MUST BE CLEARLY VISIBLE: the dark figure at the edge of the light.
MUST NOT APPEAR: other road users, signs, text.
""", cond=NIGHT)

view('exam-dark-follow', """
THE SCENE: a two-way country road at NIGHT without street lights, one lane in each direction, a white broken centre line. We drive about 25 m behind another car in our lane; its red rear lights glow, and our dipped headlights light up the road and the back of that car without dazzling its driver. The oncoming lane is dark and empty.
MUST BE CLEARLY VISIBLE: the car ahead close in front of us, lit by our dipped lights.
MUST NOT APPEAR: other road users, signs, text.
""", cond=NIGHT)

view('wx-aqua', """
THE SCENE: a two-way country road in HEAVY RAIN, one lane in each direction, white edge lines; the road surface is shiny with water, and about 30 m ahead a large stretch of STANDING WATER covers our lane from edge to centre line, rippling with raindrops. Grey sky, spray, raindrops on our windscreen, the wipers part-way across.
MUST BE CLEARLY VISIBLE: the standing water across our lane ahead.
MUST NOT APPEAR: other road users, signs, text.
""", cond='heavy rain, dull grey light, wet shiny road')

view('wx-bridge', """
THE SCENE: a cold clear WINTER morning with low sun: a two-way country road, one lane in each direction, white edge lines, frosty white grass and bare trees on both sides. The road just ahead of us is dry and grey, but about 40 m ahead it runs onto a small concrete bridge over a stream, where the road surface glitters with a thin film of ICE. On the right verge before the bridge stands the Danish warning sign A 31 "slippery road" on a grey post: an upright equilateral triangle, point up, with a broad red border and a white centre showing a black car seen from behind with two curving skid marks.
MUST BE CLEARLY VISIBLE: the dry road before the bridge and the glittering ice on the bridge, the sign.
MUST NOT APPEAR: other road users, other signs, text.
""", cond='cold clear winter morning, low sun, frost')

view('wx-wind', """
THE SCENE: a long high road bridge over the sea in STRONG WIND: a two-way road with two lanes in our direction, crash barriers, the open sea on both sides with white-capped waves, grey clouds racing. On the right just before the bridge stands the Danish warning sign A 95 "side wind" on a grey post: an upright equilateral triangle, point up, with a broad red border and a white centre showing a black wind sock blowing out to the side. In our lane ahead a car with a caravan sways slightly in the wind.
MUST BE CLEARLY VISIBLE: the A 95 sign, the open bridge, the caravan ahead.
MUST NOT APPEAR: other signs, text.
""", cond='strong wind, grey clouds, daylight')

view('exam-wx-aqua', """
THE SCENE: a straight two-way road outside town in HEAVY RAIN, one lane in each direction, white edge lines, the road shiny with water. About 40 m ahead, deep STANDING WATER covers our whole lane. Raindrops on our windscreen, grey sky, poor visibility.
MUST BE CLEARLY VISIBLE: the standing water across our lane.
MUST NOT APPEAR: other road users, signs, text.
""", cond='heavy rain, dull grey light, wet shiny road')

view('exam-wx-bridge', """
THE SCENE: a cold sunny WINTER day: a two-way country road, one lane in each direction, white edge lines, frost on the fields. The road we are on is dry, and about 50 m ahead it crosses a small bridge over a stream in the shade of tall trees; the bridge's surface looks darker and slightly shiny.
MUST BE CLEARLY VISIBLE: the dry road and the darker, shaded bridge ahead.
MUST NOT APPEAR: road users, signs, text.
""", cond='cold sunny winter day, frost, low sun')

view('exam-wx-snow', """
THE SCENE: a two-way country road covered with packed SNOW, the edge lines hidden under snow, white fields and snow-covered trees on both sides, light snow falling. A dark red car drives in our lane about 30 m ahead of us, its rear lights on.
MUST BE CLEARLY VISIBLE: the snow-covered road and the car ahead.
MUST NOT APPEAR: other road users, signs, text.
""", cond='winter, snowfall, white snow-covered landscape')


# ---------- the lessons ----------
MOTORWAY = lesson('motorway', 'MOTORWAY', ('بزرگراه', 'The motorway', 'Motorvej'), 8, [
    intro(('بزرگراه (motorvej)', 'The motorway (motorvej)', 'Motorvejen'),
          ('ورود به بزرگراه را در درس تغییر خط دیدید. این درس بقیه‌اش را می‌گوید: چه کسی اجازه دارد بیاید، از کدام خط استفاده کنید، چطور بیرون بروید، چه چیزهایی ممنوع است و با صف ناگهانی چه کنید.',
           'You saw joining the motorway in the lesson on changing lanes. This lesson covers the rest: who may use it, which lane to use, how to leave, what is forbidden and what to do about a sudden queue.',
           'Du så indkørsel på motorvej i lektionen om vognbaneskift. Denne lektion tager resten: hvem der må køre der, hvilken vognbane du bruger, hvordan du kører fra, hvad der er forbudt, og hvad du gør ved pludselig kø.'),
          [('بدانید چه کسی می‌تواند در بزرگراه براند و از کدام خط.', 'Know who may drive on the motorway, and in which lane.', 'Vide hvem der må køre på motorvejen, og i hvilken vognbane.'),
           ('درست از بزرگراه خارج شوید.', 'Leave the motorway correctly.', 'Køre rigtigt fra motorvejen.'),
           ('بدانید چه چیزهایی در بزرگراه ممنوع است.', 'Know what is forbidden on the motorway.', 'Vide hvad der er forbudt på motorvejen.')],
          [('خروجی‌ای که از آن گذشته‌اید.', 'An exit you have driven past.', 'En afkørsel, du er kørt forbi.'),
           ('کامیون‌ها در بزرگراه سه‌خطه.', 'Lorries on a three-lane motorway.', 'Lastbiler på en motorvej med tre vognbaner.'),
           ('صف ناگهانی جلوی شما.', 'A sudden queue ahead of you.', 'Pludselig kø foran dig.')]),
    teach(('چه کسی و کدام خط', 'Who, and which lane', 'Hvem og hvilken vognbane'),
          ('بزرگراه (E 42) و راه‌های ورود و خروجش فقط برای وسیله‌های موتوری است که بتوانند و اجازه داشته باشند در جاده‌ی صاف دست‌کم ۵۰ کیلومتر در ساعت بروند: نه موپد، نه دوچرخه، نه عابر. فقط از ابتدای بزرگراه یا راه ورود ویژه وارد شوید. تا جای ممکن در خط راست برانید و فقط برای سبقت به چپ بروید. در بزرگراهی که در یک جهت سه خط یا بیشتر دارد، کامیون‌های بالای ۳٫۵ تن و وسیله‌های با تریلر بلندتر از ۷ متر فقط از دو خط سمت راست استفاده می‌کنند.',
           'The motorway (E 42) and its slip roads are only for motor vehicles that can and may do at least 50 km/h on a level road: no mopeds, no bicycles, no pedestrians. Join only at the motorway\'s start or by a slip road. Keep to the right lane as far as possible and only move left to overtake. On a motorway with three or more lanes in one direction, lorries over 3.5 t and combinations longer than 7 m may only use the two right-hand lanes.',
           'Motorvejen (E 42) og dens til- og frakørsler er kun for motorkøretøjer, der kan og må køre mindst 50 km/t på vandret vej: ikke knallerter, cykler eller gående. Du kører kun ind ved motorvejens begyndelse eller ad en tilkørsel. Hold så langt til højre som muligt, og kør kun til venstre for at overhale. På motorvej med tre eller flere vognbaner i samme retning må lastbiler over 3,5 t og vogntog over 7 m kun bruge de to vognbaner længst til højre.'),
          art='mw-lanes',
          rule=('بزرگراه فقط برای خودروهایی که دست‌کم ۵۰ می‌روند؛ سمت راست برانید و فقط برای سبقت به چپ بروید.', 'The motorway is only for vehicles that do at least 50; keep right and only go left to overtake.', 'Motorvejen er kun for køretøjer, der kører mindst 50; hold til højre, og kør kun til venstre for at overhale.'),
          law=law((15, 1), (44, 1), (45, 1), (46, 3), 'E 42 | E 44'),
          trap=('«بزرگراه خالی است، پس در خط چپ می‌مانم» غلط است؛ بعد از سبقت به راست برگردید.', '«The motorway is empty, so I stay in the left lane» is wrong; move back right after overtaking.', '«Motorvejen er tom, så jeg bliver i venstre vognbane» er forkert; kør tilbage til højre efter overhalingen.')),
    teach(('خروج از بزرگراه', 'Leaving the motorway', 'Frakørsel fra motorvejen'),
          ('به موقع به خط راست بروید و راهنما بزنید. از همان ابتدای خط کاهش سرعت (frakørselsbane) واردش شوید و ترمز را آن‌جا انجام دهید، نه روی بزرگراه. اگر خروجی را رد کردید، تا خروجی بعدی بروید: دنده عقب، دور زدن و عبور از جزیره‌ی وسط ممنوع است.',
           'Move to the right lane and signal in good time. Enter the deceleration lane (frakørselsbane) right from its start and do your braking there, not on the motorway. If you miss the exit, drive on to the next one: reversing, turning round and crossing the central reservation are forbidden.',
           'Skift i god tid til højre vognbane, og blink. Kør ind på frakørselsbanen lige fra dens begyndelse, og brems der, ikke på motorvejen. Kører du forbi afkørslen, fortsætter du til den næste: bakning, vending og kørsel over midterrabatten er forbudt.'),
          art='mw-exit',
          rule=('از ابتدای خط کاهش سرعت واردش شوید و آن‌جا ترمز کنید؛ خروجی را رد کردید، بروید خروجی بعدی.', 'Enter the deceleration lane at its start and brake there; missed the exit, take the next one.', 'Kør ind på frakørselsbanen ved begyndelsen, og brems der; er du kørt forbi, tager du næste afkørsel.'),
          law=law((18, 5), (46, 1), (46, 2)),
          trap=('«خروجی را رد کردم، پس در شانه‌ی اضطراری کمی دنده عقب می‌روم» بسیار خطرناک و ممنوع است.', '«I missed the exit, so I reverse a little on the hard shoulder» is very dangerous and forbidden.', '«Jeg kørte forbi afkørslen, så jeg bakker lidt i nødsporet» er meget farligt og forbudt.')),
    teach(('آنچه در بزرگراه ممنوع است', 'What is forbidden on the motorway', 'Det er forbudt på motorvejen'),
          ('در بزرگراه و راه‌های ورود و خروجش دور زدن و دنده عقب ممنوع است. توقف و پارک فقط در پارکینگ‌ها و استراحتگاه‌های مشخص‌شده مجاز است؛ کنار تلفن اضطراری هم می‌توانید برای استفاده از آن بایستید. شانه‌ی اضطراری (nødspor) برای خرابی و اضطرار است، نه برای استراحت یا تلفن زدن. عبور از جزیره‌ی وسط یا از شکاف‌های آن ممنوع است.',
           'On the motorway and its slip roads, turning round and reversing are forbidden. Stopping and parking are only allowed at the marked car parks and rest areas; you may also stop at an emergency telephone to use it. The hard shoulder (nødspor) is for breakdowns and emergencies, not for a rest or a phone call. Crossing the central reservation or its openings is forbidden.',
           'På motorvejen og dens til- og frakørsler er vending og bakning forbudt. Standsning og parkering er kun tilladt på de anviste parkerings- og rastepladser; du må også standse ved en nødtelefon for at bruge den. Nødsporet er til motorstop og nødsituationer, ikke til en pause eller en telefonsamtale. Det er forbudt at køre over midterrabatten eller gennem åbninger i den.'),
          rule=('در بزرگراه: نه دور زدن، نه دنده عقب، نه توقف بیرون از پارکینگ و استراحتگاه.', 'On the motorway: no turning, no reversing, no stopping outside car parks and rest areas.', 'På motorvejen: ingen vending, ingen bakning, ingen standsning uden for parkerings- og rastepladser.'),
          law=law((46, 1), (46, 2)),
          trap=('«در شانه‌ی اضطراری کمی می‌ایستم تا تلفن بزنم» غلط است؛ تا استراحتگاه بعدی بروید.', '«I stop for a moment on the hard shoulder to make a call» is wrong; drive on to the next rest area.', '«Jeg holder lidt i nødsporet for at ringe» er forkert; kør til næste rasteplads.')),
    teach(('سرعت بالا و صف ناگهانی', 'High speed and sudden queues', 'Høj fart og pludselig kø'),
          ('با سرعت بالا مسافت توقف بسیار زیاد است؛ فاصله‌ی دست‌کم دو ثانیه را نگه دارید و دور جلو را نگاه کنید. وقتی ناگهان به صفی می‌رسید، به موقع ترمز کنید و می‌توانید برای هشدار به پشت‌سری‌ها چراغ خطر را کوتاه روشن کنید. برای دور زدن صف از شانه‌ی اضطراری استفاده نکنید.',
           'At high speed the stopping distance is very long; keep a distance of at least two seconds and look far ahead. When you suddenly come up to a queue, brake in good time, and you may briefly switch on the hazard lights to warn those behind you. Do not use the hard shoulder to get round the queue.',
           'Ved høj fart er standselængden meget lang; hold mindst to sekunders afstand, og se langt frem. Når du pludselig kommer til en kø, bremser du i god tid, og du kan kort tænde havariblinket for at advare dem bag dig. Brug ikke nødsporet til at komme uden om køen.'),
          rule=('به صف ناگهانی به موقع ترمز کنید و با چراغ خطر به پشت‌سری‌ها هشدار بدهید.', 'Brake in good time for a sudden queue and warn those behind with the hazard lights.', 'Brems i god tid ved pludselig kø, og advar dem bag dig med havariblinket.'),
          law=law((15, 3), (32, 3)),
          trap=('«از شانه‌ی اضطراری از کنار صف رد می‌شوم» غلط است؛ شانه برای امدادگران هم لازم است.', '«I drive past the queue on the hard shoulder» is wrong; rescue services need the hard shoulder too.', '«Jeg kører uden om køen i nødsporet» er forkert; redningskøretøjerne har også brug for nødsporet.')),
    q('mw-exit',
      'Du er kørt forbi den afkørsel, du skulle bruge. Hvordan forholder du dig?',
      'You have driven past the exit you meant to take. What do you do?',
      'از خروجی‌ای که باید از آن بیرون می‌رفتید رد شده‌اید. چه می‌کنید؟',
      st(True, 'Jeg kører videre til næste afkørsel.', 'I drive on to the next exit.', 'تا خروجی بعدی ادامه می‌دهم.',
         ('در بزرگراه دنده عقب و دور زدن ممنوع است.', 'Reversing and turning round are forbidden on the motorway.', 'Bakning og vending er forbudt på motorvej.')),
      st(False, 'Jeg bakker tilbage i nødsporet.', 'I reverse back on the hard shoulder.', 'در شانه‌ی اضطراری دنده عقب برمی‌گردم.',
         ('دنده عقب در بزرگراه، حتی در شانه، بسیار خطرناک و ممنوع است.', 'Reversing on the motorway, even on the hard shoulder, is very dangerous and forbidden.', 'Bakning på motorvej, også i nødsporet, er meget farlig og forbudt.')),
      st(False, 'Jeg vender gennem en åbning i midterrabatten.', 'I turn round through an opening in the central reservation.', 'از شکاف جزیره‌ی وسط دور می‌زنم.',
         ('عبور از جزیره‌ی وسط ممنوع است.', 'Crossing the central reservation is forbidden.', 'Kørsel over midterrabatten er forbudt.')),
      rule=1),
    q('mw-lanes',
      'Motorvejen har tre vognbaner i hver retning. Hvor må de store lastbiler køre?',
      'The motorway has three lanes in each direction. Where may the large lorries drive?',
      'بزرگراه در هر جهت سه خط دارد. کامیون‌های بزرگ کجا می‌توانند برانند؟',
      st(True, 'Kun i de to vognbaner længst til højre.', 'Only in the two right-hand lanes.', 'فقط در دو خط سمت راست.',
         ('کامیون‌های بالای ۳٫۵ تن در بزرگراه سه‌خطه از خط چپ استفاده نمی‌کنند.', 'Lorries over 3.5 t do not use the left lane of a three-lane motorway.', 'Lastbiler over 3,5 t bruger ikke venstre vognbane på en motorvej med tre vognbaner.')),
      st(False, 'I alle tre vognbaner, når de overhaler.', 'In all three lanes when they overtake.', 'در هر سه خط، وقتی سبقت می‌گیرند.',
         ('برای سبقت هم فقط دو خط راست مجاز است.', 'Even for overtaking, only the two right lanes are allowed.', 'Også ved overhaling må de kun bruge de to højre vognbaner.')),
      rule=0),
    q('exam-mw-queue',
      'Trafikken foran dig på motorvejen står pludselig stille. Hvordan forholder du dig?',
      'The traffic in front of you on the motorway suddenly comes to a standstill. What do you do?',
      'ترافیک جلوی شما در بزرگراه ناگهان می‌ایستد. چه می‌کنید؟',
      st(True, 'Jeg bremser i god tid.', 'I brake in good time.', 'به موقع ترمز می‌کنم.',
         ('با سرعت بالا مسافت توقف بسیار زیاد است.', 'At high speed the stopping distance is very long.', 'Ved høj fart er standselængden meget lang.')),
      st(True, 'Jeg kan tænde havariblinket kort for at advare dem bag mig.', 'I may briefly switch on the hazard lights to warn those behind me.', 'می‌توانم چراغ خطر را کوتاه روشن کنم تا به پشت‌سری‌ها هشدار بدهم.',
         ('چراغ خطر به پشت‌سری‌ها خبر می‌دهد که صف ناگهانی است.', 'The hazard lights tell those behind that there is a sudden queue.', 'Havariblinket fortæller dem bag dig, at der er pludselig kø.')),
      st(False, 'Jeg kører ud i nødsporet for at komme uden om køen.', 'I move onto the hard shoulder to get round the queue.', 'وارد شانه‌ی اضطراری می‌شوم تا از صف رد شوم.',
         ('شانه‌ی اضطراری برای خرابی و امدادگران است.', 'The hard shoulder is for breakdowns and rescue services.', 'Nødsporet er til motorstop og redningskøretøjer.')),
      rule=3),
    result(1),
    summary([('بزرگراه فقط برای خودروهایی که دست‌کم ۵۰ می‌روند؛ سمت راست برانید.', 'The motorway is only for vehicles that do at least 50; keep right.', 'Motorvejen er kun for køretøjer, der kører mindst 50; hold til højre.'),
             ('در بزرگراه سه‌خطه، کامیون‌ها فقط در دو خط راست.', 'On a three-lane motorway, lorries only in the two right lanes.', 'På motorvej med tre vognbaner kun lastbiler i de to højre.'),
             ('از ابتدای خط کاهش سرعت واردش شوید؛ خروجی را رد کردید، خروجی بعدی.', 'Enter the deceleration lane at its start; missed the exit, take the next.', 'Kør ind på frakørselsbanen ved begyndelsen; er du kørt forbi, tager du den næste.'),
             ('نه دور زدن، نه دنده عقب، نه توقف بیرون از پارکینگ؛ صف ناگهانی: ترمز به موقع و چراغ خطر.', 'No turning, no reversing, no stopping outside car parks; a sudden queue: brake in time and hazard lights.', 'Ingen vending, bakning eller standsning uden for parkeringspladser; pludselig kø: brems i tide og havariblink.')],
            ('law', 'signs', 'plan')),
])

DARKNESS = lesson('darkness', 'DARKNESS', ('رانندگی در تاریکی', 'Driving in the dark', 'Kørsel i mørke'), 8, [
    intro(('رانندگی در تاریکی (kørsel i mørke)', 'Driving in the dark (kørsel i mørke)', 'Kørsel i mørke'),
          ('آزمون درباره‌ی نور بالا و پایین، سرعت در تاریکی، خیره شدن چشم و دیدن عابر می‌پرسد. در تاریکی خیلی کمتر و دیرتر می‌بینید.',
           'The test asks about high and dipped beams, speed in the dark, being dazzled and seeing pedestrians. In the dark you see far less and later.',
           'Prøven spørger om fjernlys og nærlys, fart i mørke, blænding og om at se fodgængere. I mørke ser du meget mindre og senere.'),
          [('بدانید کِی نور بالا و کِی نور پایین.', 'Know when to use high beam and when dipped beam.', 'Vide hvornår du bruger fjernlys, og hvornår nærlys.'),
           ('در تاریکی سرعت را با دید چراغ‌ها تنظیم کنید.', 'Adjust your speed to your lights\' reach in the dark.', 'Tilpasse farten til lygternes rækkevidde i mørke.'),
           ('بدانید وقتی چشمتان خیره شد چه کنید.', 'Know what to do when you are dazzled.', 'Vide hvad du gør, når du bliver blændet.')],
          [('خودرویی که از روبه‌رو می‌آید وقتی نور بالا روشن است.', 'A car coming towards you while your high beam is on.', 'En modkørende bil, mens du har fjernlys på.'),
           ('عابری با لباس تیره کنار جاده.', 'A pedestrian in dark clothes at the roadside.', 'En fodgænger i mørkt tøj ved vejkanten.'),
           ('رانندگی پشت خودروی دیگر در تاریکی.', 'Driving behind another car in the dark.', 'Kørsel bag en anden bil i mørke.')]),
    teach(('نور بالا و نور پایین', 'High beam and dipped beam', 'Fjernlys og nærlys'),
          ('در تاریکی نور بالا (fjernlys) لازم است، وقتی دید نور پایین برای سرعت شما کافی نیست. نور بالا ممنوع است: در جاده‌ای که به اندازه‌ی کافی روشن است، وقتی از روبه‌روی کسی رد می‌شوید که ممکن است چشمش خیره شود، وقتی پشت خودروی دیگری می‌رانید و وقتی قطار کنار جاده می‌رود. آن وقت نور پایین (nærlys). به موقع نور را کم کنید و پیش از کم کردن، سرعت را کم کنید.',
           'In the dark, high beam (fjernlys) is needed when the dipped beam does not let you see far enough for your speed. High beam is forbidden: on a road that is lit well enough, when you meet someone who could be dazzled, when you drive behind another vehicle, and when a train runs beside the road. Then use dipped beam (nærlys). Dip in good time, and slow down before you dip.',
           'I mørke skal du bruge fjernlys, når nærlyset ikke giver udsyn nok til din fart. Fjernlys er forbudt: hvor vejen er tilstrækkeligt oplyst, når du møder nogen, der kan blive blændet, når du kører bag et andet køretøj, og når et tog kører langs vejen. Så skal du bruge nærlys. Blænd ned i god tid, og sænk farten, før du blænder ned.'),
          art='dark-meet',
          rule=('نور بالا وقتی لازم است؛ پیش از روبه‌رو شدن، پشت خودروی دیگر و در جاده‌ی روشن، نور پایین.', 'High beam when needed; dipped beam when meeting, behind another vehicle and on lit roads.', 'Fjernlys når det er nødvendigt; nærlys ved mødekørsel, bag andre og på oplyst vej.'),
          law=law((33, 2), (33, 3), (33, 4), (41, 1)),
          trap=('«نور بالا را تا رسیدن خودروی روبه‌رو نگه می‌دارم» غلط است؛ به موقع کم کنید.', '«I keep the high beam on until the oncoming car reaches me» is wrong; dip in good time.', '«Jeg beholder fjernlyset, til den modkørende er lige ved mig» er forkert; blænd ned i god tid.')),
    teach(('سرعت در تاریکی', 'Speed in the dark', 'Fart i mørke'),
          ('در تاریکی باید آن‌قدر آهسته برانید که در فاصله‌ای که چراغ‌هایتان روشن می‌کنند، بتوانید بایستید. نور پایین فقط چند ده متر جلو را روشن می‌کند. عابری با لباس تیره را با نور پایین فقط از حدود ۲۵ تا ۳۰ متری می‌بینید؛ با جلیقه‌ی شب‌نما یا شبرنگ از فاصله‌ای چند برابر. در تصویر، عابرِ تیره‌پوش نزدیک‌تر است ولی دیرتر دیده می‌شود.',
           'In the dark you must drive so slowly that you can stop within the distance your lights reach. Dipped beam lights only a few tens of metres ahead. With dipped beam you see a pedestrian in dark clothes only from about 25-30 m; with a reflective vest or reflectors from several times as far. In the picture the pedestrian in dark clothes is closer but seen later.',
           'I mørke skal du køre så langsomt, at du kan standse inden for den strækning, dine lygter lyser op. Nærlys lyser kun nogle få snese meter frem. En fodgænger i mørkt tøj ser du med nærlys først på omkring 25-30 m; med refleksvest eller refleks på flere gange så lang afstand. På billedet er fodgængeren i mørkt tøj nærmere, men ses senere.'),
          art='dark-walker',
          rule=('در تاریکی آن‌قدر آهسته برانید که در محدوده‌ی نور چراغ‌ها بایستید.', 'In the dark, drive so slowly that you can stop within your lights\' reach.', 'I mørke kører du så langsomt, at du kan standse inden for lygternes rækkevidde.'),
          law=law((41, 1), (41, 2)),
          trap=('«با نور پایین عابر را همیشه به موقع می‌بینم» غلط است.', '«With dipped beam I always see pedestrians in time» is wrong.', '«Med nærlys ser jeg altid fodgængere i god tid» er forkert.')),
    teach(('خیره شدن چشم', 'Being dazzled', 'Blænding'),
          ('اگر نور خودروی روبه‌رو چشمتان را خیره کرد، سرعت را کم کنید (در صورت لزوم بایستید) و به لبه‌ی راست جاده نگاه کنید، نه به چراغ‌ها. با نور بالا جواب ندهید. شیشه‌ی جلو را از بیرون و داخل تمیز نگه دارید تا کمتر خیره شوید، و چراغ‌هایتان را طوری به کار نبرید که دیگران خیره شوند.',
           'If an oncoming car\'s lights dazzle you, slow down (stop if necessary) and look at the right edge of the road, not at the lights. Do not answer with your high beam. Keep the windscreen clean inside and out so that you are dazzled less, and never use your lights so that others are dazzled.',
           'Bliver du blændet af en modkørende bils lys, sænker du farten (standser om nødvendigt) og ser ud mod højre vejkant, ikke ind i lyset. Svar ikke med fjernlys. Hold forruden ren både udvendigt og indvendigt, så du blændes mindre, og brug aldrig dine lygter, så andre blændes.'),
          art='dark-dazzle',
          rule=('چشمتان خیره شد: سرعت را کم کنید و به لبه‌ی راست جاده نگاه کنید.', 'Dazzled: slow down and look at the right edge of the road.', 'Blændet: sænk farten, og se ud mod højre vejkant.'),
          law=law((33, 6), (41, 2)),
          trap=('«با نور بالا جواب می‌دهم تا او هم کم کند» غلط و خطرناک است.', '«I answer with my high beam so that he dips too» is wrong and dangerous.', '«Jeg svarer med fjernlys, så han også blænder ned» er forkert og farligt.')),
    teach(('چراغ مه‌شکن', 'Fog lights', 'Tågelygter'),
          ('چراغ مه‌شکن (جلو و عقب) فقط در مه و بارش شدید مجاز است. مه‌شکن عقب بسیار پرنور است و در هوای صاف یا باران معمولی پشت‌سری‌ها را خیره می‌کند. در تاریکی، باران و برف چراغ روز کافی نیست، چون عقب خودرو را روشن نمی‌کند؛ نور پایین لازم است.',
           'Fog lights (front and rear) are only allowed in fog and heavy rain or snow. The rear fog light is very bright and dazzles those behind in clear weather or ordinary rain. In the dark, in rain and in snow, daytime running lights are not enough because they do not light the back of the car; dipped beam is needed.',
           'Tågelygter (for og bag) må kun bruges i tåge og under kraftig nedbør. Tågebaglygten er meget kraftig og blænder dem bag dig i klart vejr eller almindelig regn. I mørke, regn og sne er kørelys ikke nok, fordi det ikke tænder baglygterne; der skal nærlys til.'),
          rule=('چراغ مه‌شکن فقط در مه و بارش شدید.', 'Fog lights only in fog and heavy rain or snow.', 'Tågelygter kun i tåge og under kraftig nedbør.'),
          law=law((33, 5), (33, 6)),
          trap=('«مه‌شکن عقب را در باران معمولی روشن می‌کنم تا بهتر دیده شوم» غلط است.', '«I switch the rear fog light on in ordinary rain to be seen better» is wrong.', '«Jeg tænder tågebaglygten i almindelig regn for at blive set bedre» er forkert.')),
    q('exam-dark-meet',
      'Du kører med fjernlys. Langt fremme kommer en bil imod dig. Hvordan forholder du dig?',
      'You are driving with high beam. Far ahead a car is coming towards you. What do you do?',
      'با نور بالا می‌رانید. دور در جلو خودرویی از روبه‌رو می‌آید. چه می‌کنید؟',
      st(True, 'Jeg skifter til nærlys i god tid.', 'I switch to dipped beam in good time.', 'به موقع نور پایین می‌زنم.',
         ('نور بالا در روبه‌رو شدن ممنوع است، چون راننده‌ی دیگر خیره می‌شود.', 'High beam is forbidden when meeting, because the other driver is dazzled.', 'Fjernlys er forbudt ved mødekørsel, fordi den anden fører blændes.')),
      st(False, 'Jeg beholder fjernlyset, til bilen er lige ved mig.', 'I keep the high beam on until the car is right next to me.', 'نور بالا را نگه می‌دارم تا خودرو درست کنارم برسد.',
         ('باید خیلی زودتر نور را کم کنید.', 'You must dip much earlier.', 'Du skal blænde ned meget før.')),
      st(True, 'Jeg sænker farten, før jeg blænder ned, hvis nærlyset ikke lyser langt nok frem.', 'I slow down before I dip if the dipped beam does not reach far enough.', 'اگر نور پایین به اندازه‌ی کافی جلو را روشن نکند، پیش از کم کردن نور سرعتم را کم می‌کنم.',
         ('قانون می‌خواهد سرعت پیش از کم کردن نور تنظیم شود.', 'The law asks you to adjust your speed before dipping.', 'Loven kræver, at farten tilpasses før nedblændingen.')),
      rule=0),
    q('exam-dark-walker',
      'Der går en person i mørkt tøj ved vejkanten. Hvad gælder?',
      'A person in dark clothes is walking at the roadside. What applies?',
      'فردی با لباس تیره کنار جاده راه می‌رود. کدام درست است؟',
      st(True, 'Personen er svær at se, så jeg sænker farten.', 'The person is hard to see, so I slow down.', 'دیدن او سخت است، پس سرعتم را کم می‌کنم.',
         ('عابر تیره‌پوش با نور پایین خیلی دیر دیده می‌شود.', 'A pedestrian in dark clothes is seen very late with dipped beam.', 'En fodgænger i mørkt tøj ses meget sent med nærlys.')),
      st(False, 'Med nærlys kan jeg altid se fodgængere i god tid.', 'With dipped beam I can always see pedestrians in good time.', 'با نور پایین همیشه عابران را به موقع می‌بینم.',
         ('نور پایین فقط چند ده متر را روشن می‌کند.', 'Dipped beam lights only a few tens of metres.', 'Nærlys lyser kun nogle få snese meter.')),
      st(True, 'Jeg holder god afstand, når jeg passerer personen.', 'I keep a good distance when I pass the person.', 'وقتی از کنارش رد می‌شوم، فاصله‌ی خوبی نگه می‌دارم.',
         ('به عابرانِ روی جاده جای کافی بدهید.', 'Give pedestrians on the road enough room.', 'Giv fodgængere på vejen plads nok.')),
      rule=1),
    q('exam-dark-follow',
      'Du kører tæt bag en anden bil i mørke. Hvilket lys bruger du?',
      'You are driving close behind another car in the dark. Which lights do you use?',
      'در تاریکی نزدیک پشت خودروی دیگری می‌رانید. از کدام نور استفاده می‌کنید؟',
      st(True, 'Nærlys, så jeg ikke blænder føreren foran mig.', 'Dipped beam, so that I do not dazzle the driver in front.', 'نور پایین، تا راننده‌ی جلو خیره نشود.',
         ('پشت خودروی دیگر نور بالا ممنوع است.', 'High beam is forbidden behind another vehicle.', 'Fjernlys er forbudt bag et andet køretøj.')),
      st(False, 'Fjernlys, så jeg kan se forbi bilen.', 'High beam, so that I can see past the car.', 'نور بالا، تا بتوانم آن طرف خودرو را ببینم.',
         ('نور بالا از آینه‌ها راننده‌ی جلو را خیره می‌کند.', 'High beam dazzles the driver in front through the mirrors.', 'Fjernlys blænder føreren foran gennem spejlene.')),
      rule=0),
    result(1),
    summary([('نور بالا وقتی لازم است؛ هنگام روبه‌رو شدن، پشت خودروی دیگر و در جاده‌ی روشن، نور پایین.', 'High beam when needed; dipped beam when meeting, behind another vehicle and on lit roads.', 'Fjernlys når det er nødvendigt; nærlys ved mødekørsel, bag andre og på oplyst vej.'),
             ('پیش از کم کردن نور، سرعت را کم کنید؛ در محدوده‌ی نور چراغ‌ها بایستید.', 'Slow down before dipping; be able to stop within your lights\' reach.', 'Sænk farten før nedblænding; kunne standse inden for lygternes rækkevidde.'),
             ('عابر تیره‌پوش با نور پایین فقط از حدود ۲۵ تا ۳۰ متری دیده می‌شود.', 'With dipped beam a pedestrian in dark clothes is seen only from about 25-30 m.', 'En fodgænger i mørkt tøj ses med nærlys først på omkring 25-30 m.'),
             ('چشمتان خیره شد: آهسته کنید و به لبه‌ی راست نگاه کنید؛ مه‌شکن فقط در مه و بارش شدید.', 'Dazzled: slow down and look at the right edge; fog lights only in fog and heavy rain or snow.', 'Blændet: sænk farten, og se mod højre kant; tågelygter kun i tåge og kraftig nedbør.')]),
])

WEATHER = lesson('weather', 'WEATHER', ('باران، برف و یخ', 'Rain, snow and ice', 'Regn, sne og is'), 8, [
    intro(('باران، برف و یخ', 'Rain, snow and ice', 'Regn, sne og is'),
          ('آزمون با تصویر جاده‌ی خیس، برف و یخ می‌پرسد که چطور برانید: آب‌سواری، یخ روی پل، برف و باد شدید.',
           'With pictures of wet roads, snow and ice, the test asks how you drive: aquaplaning, ice on bridges, snow and strong wind.',
           'Med billeder af våd vej, sne og is spørger prøven, hvordan du kører: vandplaning, is på broer, sne og kraftig vind.'),
          [('بدانید آب‌سواری چیست و چه باید کرد.', 'Know what aquaplaning is and what to do.', 'Vide hvad vandplaning er, og hvad du gør.'),
           ('بدانید یخ کجا اول تشکیل می‌شود و روی یخ چطور برانید.', 'Know where ice forms first and how to drive on it.', 'Vide hvor isen først dannes, og hvordan du kører på den.'),
           ('در برف و باد شدید درست برانید.', 'Drive correctly in snow and strong wind.', 'Køre rigtigt i sne og kraftig vind.')],
          [('آب ایستاده روی جاده در باران شدید.', 'Standing water on the road in heavy rain.', 'Vand på vejen i kraftig regn.'),
           ('پلی در سایه در روزی سرد.', 'A bridge in the shade on a cold day.', 'En bro i skygge på en kold dag.'),
           ('جاده‌ی برفی و خودرویی جلوی شما.', 'A snowy road and a car in front of you.', 'En snedækket vej og en bil foran dig.')]),
    teach(('باران و آب‌سواری', 'Rain and aquaplaning', 'Regn og vandplaning'),
          ('در باران مسافت ترمز طولانی‌تر می‌شود. آب ایستاده می‌تواند لاستیک‌ها را از جاده بلند کند (آب‌سواری، vandplaning): فرمان ناگهان سبک می‌شود و خودرو به فرمان جواب نمی‌دهد. پیشگیری: سرعت کمتر و آج کافی. اگر پیش آمد، پا را از گاز بردارید، ترمز شدید نکنید و فرمان را صاف نگه دارید تا لاستیک‌ها دوباره بگیرند.',
           'In rain the braking distance gets longer. Standing water can lift the tyres off the road (aquaplaning, vandplaning): the steering suddenly goes light and the car does not respond. Prevention: lower speed and enough tread. If it happens, take your foot off the accelerator, do not brake hard, and hold the steering wheel straight until the tyres grip again.',
           'I regn bliver bremselængden længere. Vand på vejen kan løfte dækkene fra vejen (vandplaning): styretøjet bliver pludselig let, og bilen reagerer ikke på rattet. Forebyggelse: lavere fart og nok mønster. Sker det, slipper du speederen, bremser ikke hårdt og holder rattet lige, til dækkene får fat igen.'),
          art='wx-aqua',
          rule=('در باران آهسته‌تر برانید؛ در آب‌سواری: پا از گاز، بدون ترمز شدید، فرمان صاف.', 'Drive slower in rain; when aquaplaning: off the accelerator, no hard braking, wheel straight.', 'Kør langsommere i regn; ved vandplaning: slip speederen, ingen hård opbremsning, rattet lige.'),
          law=law((41, 1), (41, 2)),
          trap=('«ABS و لاستیک نو جلوی آب‌سواری را می‌گیرند» غلط است؛ سرعت از همه مهم‌تر است.', '«ABS and new tyres prevent aquaplaning» is wrong; speed matters most.', '«ABS og nye dæk forhindrer vandplaning» er forkert; farten betyder mest.')),
    teach(('یخ و برف', 'Ice and snow', 'Is og sne'),
          ('نزدیک صفر درجه یخ اول روی پل‌ها، در سایه، در جنگل و در گودی‌ها تشکیل می‌شود؛ حتی وقتی بقیه‌ی جاده خشک است. روی یخ و برف مسافت ترمز چند برابر می‌شود. نرم فرمان بدهید، نرم ترمز کنید و نرم گاز بدهید و فاصله را خیلی بیشتر کنید. لاستیک زمستانی توصیه می‌شود، ولی اجباری نیست. تابلوی A 31 جاده‌ی لغزنده را هشدار می‌دهد.',
           'Around 0 °C, ice forms first on bridges, in the shade, in forests and in hollows, even when the rest of the road is dry. On ice and snow the braking distance is several times longer. Steer, brake and accelerate gently, and keep a much larger distance. Winter tyres are recommended but not compulsory. Sign A 31 warns of a slippery road.',
           'Omkring 0 °C dannes isen først på broer, i skygge, i skov og i lavninger, også når resten af vejen er tør. På is og sne er bremselængden flere gange så lang. Styr, brems og giv gas blødt, og hold meget større afstand. Vinterdæk anbefales, men er ikke påbudt. Tavle A 31 advarer om glat vej.'),
          art='wx-bridge',
          rule=('نزدیک صفر درجه روی پل و در سایه انتظار یخ داشته باشید؛ نرم برانید و فاصله را چند برابر کنید.', 'Around 0 °C expect ice on bridges and in the shade; drive gently and keep a much larger distance.', 'Omkring 0 °C skal du regne med is på broer og i skygge; kør blødt, og hold meget større afstand.'),
          law=law((41, 2), 'A 31'),
          trap=('«جاده خشک است، پس پل هم خشک است» غلط است.', '«The road is dry, so the bridge is dry too» is wrong.', '«Vejen er tør, så broen er også tør» er forkert.')),
    teach(('باد شدید', 'Strong wind', 'Kraftig vind'),
          ('باد شدید از پهلو، به‌خصوص روی پل‌ها، در جاده‌های باز و بیرون آمدن از تونل یا پشت جنگل، می‌تواند خودرو را ناگهان هل بدهد. فرمان را محکم بگیرید و سرعت را کم کنید. خودروهای سبک، کاروان، موتورسیکلت و دوچرخه بیشتر کج می‌شوند؛ با فاصله از کنارشان رد شوید. تابلوی A 95 باد پهلو را هشدار می‌دهد.',
           'A strong side wind, especially on bridges, on open roads and when you come out of a tunnel or past a forest, can suddenly push the car. Hold the wheel firmly and slow down. Light cars, caravans, motorcycles and bicycles are pushed more; pass them with room. Sign A 95 warns of side wind.',
           'Kraftig sidevind, især på broer, på åbne strækninger og når du kommer ud af en tunnel eller forbi en skov, kan pludselig skubbe bilen. Hold godt fast i rattet, og sænk farten. Lette biler, campingvogne, motorcykler og cykler bliver skubbet mere; passér dem med god afstand. Tavle A 95 advarer om sidevind.'),
          art='wx-wind',
          rule=('در باد شدید فرمان را محکم بگیرید و آهسته‌تر برانید، به‌خصوص روی پل.', 'In strong wind hold the wheel firmly and drive slower, especially on bridges.', 'I kraftig vind holder du godt fast i rattet og kører langsommere, især på broer.'),
          law=law((41, 1), 'A 95'),
          trap=('«پشت کامیون می‌چسبم تا از باد در امان باشم» خطرناک است؛ وقتی بیرون می‌آیید، باد ناگهانی می‌زند.', '«I stay close behind the lorry to shelter from the wind» is dangerous; when you come out, the gust hits suddenly.', '«Jeg holder tæt bag lastbilen for at få læ» er farligt; når du kommer frem, rammer vindstødet pludseligt.')),
    teach(('دیده شدن در هوای بد', 'Being seen in bad weather', 'At blive set i dårligt vejr'),
          ('در باران، برف و مه نور پایین روشن کنید؛ چراغ روز عقب خودرو را روشن نمی‌کند. برف‌پاک‌کن و مایع شیشه‌شوی را آماده نگه دارید و پیش از حرکت همه‌ی شیشه‌ها، چراغ‌ها و برف روی سقف را پاک کنید. چراغ مه‌شکن فقط در مه و بارش شدید.',
           'In rain, snow and fog switch on the dipped beam; daytime running lights do not light the back of the car. Keep the wipers and washer fluid ready, and before you drive, clear all windows, the lights and the snow on the roof. Fog lights only in fog and heavy rain or snow.',
           'I regn, sne og tåge tænder du nærlys; kørelys tænder ikke baglygterne. Hold viskere og sprinklervæske klar, og rens alle ruder, lygter og sneen på taget, før du kører. Tågelygter kun i tåge og under kraftig nedbør.'),
          rule=('در هوای بد نور پایین؛ پیش از حرکت شیشه‌ها، چراغ‌ها و سقف را از برف پاک کنید.', 'In bad weather dipped beam; before you drive, clear the windows, lights and the snow on the roof.', 'I dårligt vejr nærlys; før du kører, renser du ruder, lygter og sne på taget.'),
          law=law((33, 5), (41, 1)),
          trap=('«یک سوراخ کوچک در یخ شیشه‌ی جلو کافی است» غلط است؛ همه‌ی شیشه‌ها باید تمیز باشند.', '«A small hole in the ice on the windscreen is enough» is wrong; all windows must be clear.', '«Et lille kighul i isen på forruden er nok» er forkert; alle ruder skal være rene.')),
    q('exam-wx-aqua',
      'Der står meget vand på vejen foran dig. Hvordan forholder du dig?',
      'There is a lot of water on the road in front of you. What do you do?',
      'آب زیادی روی جاده‌ی جلوی شما ایستاده است. چه می‌کنید؟',
      st(True, 'Jeg sænker farten, før jeg kører ind i vandet.', 'I slow down before I drive into the water.', 'پیش از رسیدن به آب سرعتم را کم می‌کنم.',
         ('با سرعت کم، خطر آب‌سواری کمتر است.', 'At low speed the risk of aquaplaning is smaller.', 'Ved lav fart er risikoen for vandplaning mindre.')),
      st(False, 'Jeg holder farten, fordi bilen har gode dæk.', 'I keep my speed because the car has good tyres.', 'سرعتم را نگه می‌دارم، چون لاستیک‌های خوبی دارم.',
         ('لاستیک خوب هم با سرعت زیاد در آب سر می‌خورد.', 'Even good tyres slide on water at high speed.', 'Også gode dæk glider på vand ved høj fart.')),
      st(True, 'Hvis styretøjet bliver let, slipper jeg speederen og holder rattet lige.', 'If the steering goes light, I release the accelerator and hold the wheel straight.', 'اگر فرمان سبک شد، پا را از گاز برمی‌دارم و فرمان را صاف نگه می‌دارم.',
         ('این واکنش درست به آب‌سواری است.', 'This is the right reaction to aquaplaning.', 'Det er den rigtige reaktion på vandplaning.')),
      rule=0),
    q('exam-wx-bridge',
      'Det er koldt, og vejen er tør. Hvad skal du være opmærksom på ved broen?',
      'It is cold and the road is dry. What must you be aware of at the bridge?',
      'هوا سرد است و جاده خشک. نزدیک پل باید به چه توجه کنید؟',
      st(True, 'Der kan være isglat på broen, selv om vejen før den er tør.', 'The bridge may be icy even though the road before it is dry.', 'ممکن است روی پل یخ باشد، حتی اگر جاده‌ی پیش از آن خشک است.',
         ('پل‌ها و جاهای سایه زودتر یخ می‌زنند.', 'Bridges and shaded places freeze sooner.', 'Broer og steder i skygge fryser først.')),
      st(True, 'Jeg sænker farten før broen.', 'I slow down before the bridge.', 'پیش از پل سرعتم را کم می‌کنم.',
         ('روی یخ ترمز نکنید؛ پیش از آن سرعت را کم کنید.', 'You should not brake on the ice; slow down before it.', 'Du skal ikke bremse på isen; sænk farten før den.')),
      st(False, 'Broen er lige så sikker som resten af vejen.', 'The bridge is just as safe as the rest of the road.', 'پل هم به اندازه‌ی بقیه‌ی جاده امن است.',
         ('پل از زیر هم سرد می‌شود و زودتر یخ می‌زند.', 'A bridge is cooled from below too and freezes sooner.', 'En bro afkøles også nedefra og fryser før.')),
      rule=1),
    q('exam-wx-snow',
      'Vejen er dækket af sne. Hvordan forholder du dig?',
      'The road is covered with snow. What do you do?',
      'جاده با برف پوشیده شده است. چه می‌کنید؟',
      st(True, 'Jeg holder en meget større afstand til bilen foran.', 'I keep a much larger distance to the car in front.', 'فاصله‌ام را با خودروی جلو خیلی بیشتر می‌کنم.',
         ('روی برف مسافت ترمز چند برابر است.', 'On snow the braking distance is several times longer.', 'På sne er bremselængden flere gange så lang.')),
      st(True, 'Jeg bremser, styrer og giver gas blødt.', 'I brake, steer and accelerate gently.', 'نرم ترمز می‌کنم، نرم فرمان می‌دهم و نرم گاز می‌دهم.',
         ('حرکت ناگهانی روی برف خودرو را سُر می‌دهد.', 'Sudden movements on snow make the car skid.', 'Bratte bevægelser på sne får bilen til at skride.')),
      st(False, 'Jeg kan køre som normalt, fordi bilen har vinterdæk.', 'I can drive as normal because the car has winter tyres.', 'می‌توانم مثل همیشه برانم، چون لاستیک زمستانی دارم.',
         ('لاستیک زمستانی کمک می‌کند، ولی روی برف هم مسافت ترمز بلندتر است.', 'Winter tyres help, but on snow the braking distance is still longer.', 'Vinterdæk hjælper, men bremselængden er stadig længere på sne.')),
      rule=1),
    result(1),
    summary([('در باران آهسته کنید؛ در آب‌سواری پا را از گاز بردارید و فرمان را صاف نگه دارید.', 'Slow down in rain; when aquaplaning, release the accelerator and hold the wheel straight.', 'Sænk farten i regn; ved vandplaning slipper du speederen og holder rattet lige.'),
             ('نزدیک صفر درجه یخ اول روی پل و در سایه است؛ روی یخ و برف فاصله را چند برابر کنید.', 'Around 0 °C ice comes first on bridges and in the shade; on ice and snow keep a much larger distance.', 'Omkring 0 °C kommer isen først på broer og i skygge; på is og sne holder du meget større afstand.'),
             ('در باد شدید فرمان را محکم بگیرید و آهسته کنید.', 'In strong wind hold the wheel firmly and slow down.', 'I kraftig vind holder du godt fast i rattet og sænker farten.'),
             ('در هوای بد نور پایین؛ پیش از حرکت همه‌ی شیشه‌ها را پاک کنید.', 'In bad weather dipped beam; clear all windows before you drive.', 'I dårligt vejr nærlys; rens alle ruder, før du kører.')],
            ('law', 'signs', 'plan')),
])

SPECIAL_TEST = lesson('special-test', 'SPECIAL_TEST', ('آزمون فصل', 'Chapter test', 'Kapiteltest'), 6, [
    intro(('آزمون فصل ۷', 'Chapter 7 test', 'Kapiteltest 7'),
          ('حالا بزرگراه، تاریکی و هوای بد را با هم مرور می‌کنیم. سؤال‌ها مثل آزمون واقعی‌اند و درس‌ها در هم آمده‌اند؛ هر علامت اشتباه یا جاافتاده یک اشتباه است.',
           'Now we go over the motorway, darkness and bad weather together. The questions are like the real test and the lessons are mixed; every wrong or missing tick is one mistake.',
           'Nu gennemgår vi motorvej, mørke og dårligt vejr samlet. Spørgsmålene er som ved den rigtige prøve, og lektionerne er blandet; hvert forkert eller manglende kryds er én fejl.'),
          [('نشان دهید در شرایط سخت درست تصمیم می‌گیرید.', 'Show that you make the right decisions in difficult conditions.', 'Vise at du træffer de rigtige beslutninger under svære forhold.'),
           ('نقطه‌های ضعفتان را پیش از فصل بعد پیدا کنید.', 'Find your weak points before the next chapter.', 'Finde dine svage punkter før næste kapitel.')],
          [('چه کسی اجازه دارد در بزرگراه براند و خروجی ردشده.', 'Who may use the motorway, and a missed exit.', 'Hvem der må køre på motorvej, og en afkørsel, du er kørt forbi.'),
           ('خیره شدن چشم، باد شدید و صف ناگهانی.', 'Being dazzled, strong wind and a sudden queue.', 'Blænding, kraftig vind og pludselig kø.')]),
    q('exam-motorway',
      'Hvem må køre på motorvejen?',
      'Who may drive on the motorway?',
      'چه کسانی می‌توانند در بزرگراه برانند؟',
      st(True, 'Motorkøretøjer, der kan og må køre mindst 50 km/t.', 'Motor vehicles that can and may drive at least 50 km/h.', 'وسیله‌های موتوری که بتوانند و اجازه داشته باشند دست‌کم ۵۰ کیلومتر بروند.', ('این شرط قانونی ورود به بزرگراه است.', 'This is the legal condition for using the motorway.', 'Det er lovens betingelse for at køre på motorvej.')),
      st(False, 'Knallerter, hvis de holder sig i nødsporet.', 'Mopeds if they keep to the hard shoulder.', 'موپدها، اگر در شانه‌ی اضطراری بمانند.', ('موپد در بزرگراه ممنوع است.', 'Mopeds are not allowed on the motorway.', 'Knallerter må ikke køre på motorvej.'))),
    q('mw-exit',
      'Hvor skal du bremse ned, når du kører fra motorvejen?',
      'Where must you slow down when you leave the motorway?',
      'وقتی از بزرگراه خارج می‌شوید، کجا باید سرعت را کم کنید؟',
      st(True, 'På frakørselsbanen.', 'On the deceleration lane.', 'در خط کاهش سرعت.', ('خط کاهش سرعت برای همین است؛ از ابتدایش واردش شوید.', 'That is what the deceleration lane is for; enter it at its start.', 'Det er det, frakørselsbanen er til; kør ind på den ved begyndelsen.')),
      st(False, 'I motorvejens højre vognbane, før frakørselsbanen begynder.', 'In the motorway\'s right lane before the deceleration lane begins.', 'در خط راست بزرگراه، پیش از شروع خط کاهش سرعت.', ('ترمز روی بزرگراه پشت‌سری‌ها را غافلگیر می‌کند.', 'Braking on the motorway surprises those behind you.', 'At bremse på motorvejen overrasker dem bag dig.'))),
    q('exam-mw-queue',
      'Hvorfor må du ikke bruge nødsporet til at komme uden om køen?',
      'Why must you not use the hard shoulder to get round the queue?',
      'چرا نباید برای دور زدن صف از شانه‌ی اضطراری استفاده کنید؟',
      st(True, 'Fordi nødsporet skal være frit for redningskøretøjer og biler med motorstop.', 'Because the hard shoulder must be free for rescue vehicles and cars that have broken down.', 'چون شانه‌ی اضطراری باید برای امدادگران و خودروهای خراب آزاد بماند.', ('شانه‌ی اضطراری فقط برای اضطرار است.', 'The hard shoulder is only for emergencies.', 'Nødsporet er kun til nødsituationer.')),
      st(False, 'Det må jeg godt, når køen står helt stille.', 'I may do so when the queue is at a complete standstill.', 'وقتی صف کاملاً ایستاده، مجاز است.', ('صف ایستاده هم شانه را مجاز نمی‌کند.', 'A standing queue does not make the hard shoulder allowed.', 'En holdende kø gør ikke nødsporet tilladt.'))),
    q('dark-dazzle',
      'Du bliver blændet af en modkørende bil. Hvordan forholder du dig?',
      'You are dazzled by an oncoming car. What do you do?',
      'نور خودروی روبه‌رو چشمتان را خیره کرده است. چه می‌کنید؟',
      st(True, 'Jeg sænker farten og ser ud mod højre vejkant.', 'I slow down and look towards the right edge of the road.', 'سرعتم را کم می‌کنم و به لبه‌ی راست جاده نگاه می‌کنم.', ('این‌طور کمتر خیره می‌شوید و جاده را دنبال می‌کنید.', 'That way you are dazzled less and can follow the road.', 'Sådan blændes du mindre og kan følge vejen.')),
      st(False, 'Jeg blinker med fjernlyset, så han skifter til nærlys.', 'I flash my high beam so that he switches to dipped beam.', 'با نور بالا چراغ می‌زنم تا او نورش را کم کند.', ('این کار هر دو نفر را خیره می‌کند.', 'That dazzles both of you.', 'Det blænder jer begge.'))),
    q('wx-wind',
      'Det blæser kraftigt fra siden på broen. Hvordan forholder du dig?',
      'There is a strong side wind on the bridge. What do you do?',
      'روی پل باد شدیدی از پهلو می‌وزد. چه می‌کنید؟',
      st(True, 'Jeg holder godt fast i rattet og sænker farten.', 'I hold the wheel firmly and slow down.', 'فرمان را محکم می‌گیرم و سرعتم را کم می‌کنم.', ('باد ناگهانی می‌تواند خودرو را هل بدهد.', 'A sudden gust can push the car.', 'Et pludseligt vindstød kan skubbe bilen.')),
      st(True, 'Jeg holder god afstand til campingvognen foran.', 'I keep a good distance to the caravan in front.', 'از کاروان جلویی فاصله‌ی خوبی نگه می‌دارم.', ('کاروان در باد بیشتر کج می‌شود.', 'A caravan sways more in the wind.', 'En campingvogn svajer mere i vinden.')),
      st(False, 'Jeg kører tæt bag campingvognen for at få læ.', 'I drive close behind the caravan to get shelter.', 'نزدیک پشت کاروان می‌رانم تا از باد در امان باشم.', ('فاصله‌ی کم خطرناک است.', 'A short distance is dangerous.', 'En kort afstand er farlig.'))),
    q('exam-wx-snow',
      'Hvad gør bremselængden på sne længere end på tør vej?',
      'What makes the braking distance on snow longer than on a dry road?',
      'چرا مسافت ترمز روی برف از جاده‌ی خشک طولانی‌تر است؟',
      st(True, 'Dækkene har dårligere vejgreb.', 'The tyres have less grip on the road.', 'لاستیک‌ها چسبندگی کمتری به جاده دارند.', ('روی برف و یخ چسبندگی خیلی کم است.', 'On snow and ice the grip is very low.', 'På sne og is er vejgrebet meget lille.')),
      st(False, 'Reaktionstiden bliver længere.', 'The reaction time gets longer.', 'زمان واکنش طولانی‌تر می‌شود.', ('برف زمان واکنش را تغییر نمی‌دهد؛ مسافت ترمز را بلند می‌کند.', 'Snow does not change the reaction time; it makes the braking distance longer.', 'Sne ændrer ikke reaktionstiden; den gør bremselængden længere.'))),
    result(2),
    summary([('بزرگراه: فقط خودروهای دست‌کم ۵۰؛ ترمز در خط کاهش سرعت؛ شانه فقط برای اضطرار.', 'Motorway: only vehicles doing at least 50; brake on the deceleration lane; the hard shoulder only for emergencies.', 'Motorvej: kun køretøjer, der kører mindst 50; brems på frakørselsbanen; nødsporet kun til nødsituationer.'),
             ('چشمتان خیره شد: آهسته کنید و به لبه‌ی راست نگاه کنید.', 'Dazzled: slow down and look at the right edge.', 'Blændet: sænk farten, og se mod højre kant.'),
             ('باد شدید: فرمان محکم، سرعت کم، فاصله از کاروان؛ روی برف چسبندگی کم و مسافت ترمز بلند.', 'Strong wind: firm grip, lower speed, distance to caravans; on snow little grip and long braking distance.', 'Kraftig vind: godt fat, lavere fart, afstand til campingvogne; på sne lille vejgreb og lang bremselængde.')],
            ('law', 'plan')),
])

CHAPTER = 'special'
LESSONS = [MOTORWAY, DARKNESS, WEATHER, SPECIAL_TEST]
