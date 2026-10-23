# Chapter 8 «موقعیت‌های خاص»: emergency vehicles, accidents and first aid, breaking down and faults while driving, and the
# chapter's test. Rules from Færdselsloven §§ 7, 9, 29, 31, 47 and 67 stk. 3; first aid's four main points from Dansk
# Førstehjælpsråd.
from course import SRC, TOWN, above, intro, law, lesson, picture, q, result, st, summary, teach, view

BLUE = 'its blue lights flashing (drawn as bright blue glows with small rays on its roof)'

# ---------- pictures (prompts for the image model) ----------
above('em-pull', f"""
THE SCENE: a straight two-way road outside town running from the bottom to the top of the picture, one lane in each direction, a white broken centre line, solid edge lines, plain green verges.
VEHICLES (colour code used strictly):
- a RED car (ours) in the right-hand lane in the middle of the picture, pulling over to the far right edge and slowing down, with a short DASHED ORANGE arrow curving to the right edge;
- a white ambulance with yellow-and-green chequered sides behind it (lower in the picture), {BLUE}, overtaking: a SOLID GREEN arrow from its nose past the red car on the left;
- the oncoming lane is empty.
MUST NOT APPEAR: signs, other vehicles, people, text, letters, numbers, left-hand traffic.
""")

above('em-red', f"""
THE SCENE: a junction in town controlled by traffic lights; our street comes up from the bottom and has two lanes going up to the stop line. Traffic lights are drawn as small poles with a three-lamp head, the lights for our street showing RED. Pavements with kerbs.
VEHICLES (colour code used strictly):
- a RED car (ours) first at the stop line in the RIGHT lane, moving a little to the right edge to make room (short DASHED ORANGE arrow to the right), without driving into the junction;
- a GREY car first at the stop line in the LEFT lane, also moving slightly to its left;
- behind them a red fire engine, {BLUE}, with a SOLID GREEN arrow showing its way up between the two cars;
- the junction itself is empty.
MUST NOT APPEAR: people, signs, text, letters, numbers, left-hand traffic.
""")

view('exam-em-behind', f"""
THE SCENE: a straight two-way road outside town, one lane in each direction, a white broken centre line and solid edge lines; we drive in the right-hand lane. At the top centre of the picture, our interior rear-view mirror shows a white ambulance close behind us, {BLUE}. The road ahead is empty, with a wide right verge.
MUST BE CLEARLY VISIBLE: the ambulance with blue lights in the rear-view mirror.
MUST NOT APPEAR: other road users, signs, text.
""")

view('exam-em-red', f"""
THE SCENE: we wait first at the stop line of a junction in town controlled by traffic lights; our light shows RED. Cars pass through the junction from left to right in front of us on their green light. At the top centre of the picture, our interior rear-view mirror shows a red fire engine right behind us, {BLUE}.
MUST BE CLEARLY VISIBLE: our red light, the crossing traffic in the junction, the fire engine in the mirror.
MUST NOT APPEAR: signs, text.
""", scenery=TOWN)

view('exam-em-oncoming', f"""
THE SCENE: a two-way road outside town, one lane in each direction, a white broken centre line and solid edge lines; we drive in the right-hand lane. About 80 m ahead a white ambulance is coming towards us in the other lane, {BLUE}, and it is overtaking a slow lorry, so it is partly over the centre line.
MUST BE CLEARLY VISIBLE: the oncoming ambulance with blue lights and the lorry it overtakes.
MUST NOT APPEAR: signs, other road users, text.
""")

view('exam-em-cloth', """
THE SCENE: a straight two-way town street, one lane in each direction, a white broken centre line; we drive in the right-hand lane. At the top centre of the picture, our interior rear-view mirror shows an ordinary dark blue family car close behind us with a large plain white cloth fastened across the front of its bonnet and grille, its headlights on. The street ahead is clear, with parked cars along the right kerb further on.
MUST BE CLEARLY VISIBLE: the white cloth on the front of the car in the rear-view mirror.
MUST NOT APPEAR: blue lights, ambulances, signs, text.
""", scenery=TOWN)

above('acc-minor', """
THE SCENE: a quiet two-way town street running from the bottom to the top of the picture, a white broken centre line, light grey pavements with kerbs.
VEHICLES AND PEOPLE (colour code used strictly):
- a RED car (ours) and a BLUE car stopped at the right-hand kerb one behind the other after a small collision (the red car's front just touching the blue car's rear), both with hazard lights flashing orange;
- the two drivers standing on the pavement beside the cars, one writing on a notepad and the other holding a phone, exchanging details;
- no one is hurt.
MUST NOT APPEAR: signs, ambulances, other vehicles, text, letters, numbers, left-hand traffic.
""")

above('acc-scene', """
THE SCENE: an accident scene on a straight two-way country road running from the bottom to the top of the picture, a white broken centre line, plain green verges.
VEHICLES, OBJECTS AND PEOPLE (colour code used strictly):
- a GREY car that has run off the road onto the right verge in the upper half, slightly damaged, its hazard lights flashing orange;
- a RED car (ours) stopped at the right edge of the road some distance behind it, also with hazard lights flashing;
- a red-and-white warning triangle standing on the road at the right edge well behind the red car (lower in the picture);
- a person in a yellow reflective vest standing on the verge, holding a mobile phone to the ear (calling 112);
- another person in a yellow reflective vest kneeling on the verge beside an injured person lying on the grass next to the grey car.
MUST NOT APPEAR: ambulances, police, signs, text, letters, numbers, left-hand traffic.
""")

picture('acc-recovery', """
An educational first-aid illustration for a Danish driving-theory app: a person lying on the grass in the recovery position (Danish «aflåst sideleje»), seen from the side and slightly above: on the side, the upper leg bent at the knee in front of the body to keep it stable, the upper hand under the cheek, the head tilted slightly back so the mouth points down and the airway stays open. A kneeling helper beside them watches the breathing. Plain soft green background, no surroundings.
MUST NOT APPEAR: blood, injuries, text, letters, numbers, logos.
Style: a clean, precise flat vector illustration, NOT photorealistic: simple shapes, flat colours, crisp edges, friendly and calm. No text anywhere.
""")

view('exam-acc-arrive', """
THE SCENE: a straight two-way country road, one lane in each direction, white edge lines, fields. About 60 m ahead a car has run off the road into the shallow ditch on the right, its front down in the ditch, its orange hazard lights flashing. No other people or vehicles can be seen; nobody has stopped yet.
MUST BE CLEARLY VISIBLE: the car in the ditch with its hazard lights.
MUST NOT APPEAR: ambulances, police, other road users, signs, text.
""")

above('exam-acc-person', """
THE SCENE: the verge of a country road after an accident: a GREY car stands on the verge with its hazard lights flashing; on the grass beside it lies an adult on their back, eyes closed, not moving (unconscious), chest gently rising (breathing). A helper in a yellow reflective vest kneels beside the person.
MUST NOT APPEAR: blood, injuries, ambulances, signs, text, letters, numbers.
""")

above('exam-acc-park', """
THE SCENE: a small car park in town seen from above, with white-marked parking bays, some empty.
VEHICLES (colour code used strictly): a RED car (ours) that has just backed out of a bay and touched the side of a parked BLUE car with its rear corner, leaving a small scratch on the blue car's door (drawn as a short light line). Nobody is near the blue car.
MUST NOT APPEAR: people, signs, other moving vehicles, text, letters, numbers.
""")

above('bd-bend', """
THE SCENE: a two-way country road coming up from the bottom of the picture and bending sharply to the RIGHT in the middle, with a group of dense trees on the inside of the bend that hides the view through it; white broken centre line and solid edge lines, green verges.
VEHICLES AND OBJECTS (colour code used strictly):
- a RED car (ours) broken down at the right edge of the right-hand lane just AFTER the bend (upper right), its hazard lights flashing orange;
- a person in a yellow reflective vest has placed a red-and-white warning triangle at the right edge of the road BEFORE the bend (lower in the picture), so that drivers see it before they reach the bend;
- a BLUE car coming up from the bottom, still before the triangle, with a SOLID GREEN arrow that slows and curves out round the red car.
MUST NOT APPEAR: signs, other vehicles, text, letters, numbers, left-hand traffic.
""")

above('bd-motorway', """
THE SCENE: a straight Danish motorway running from the bottom to the top of the picture: two lanes going up, a hard shoulder on the right behind a broad solid white edge line, then a crash barrier along the verge and grass beyond it.
VEHICLES, OBJECTS AND PEOPLE (colour code used strictly):
- a RED car (ours) broken down on the hard shoulder in the upper half, as far to the right as possible, its hazard lights flashing orange;
- its three passengers in yellow reflective vests standing on the grass BEHIND the crash barrier, away from the traffic, one phoning;
- a red-and-white warning triangle on the hard shoulder far behind the red car (near the bottom of the picture);
- BLUE and GREY cars driving up in the two lanes.
MUST NOT APPEAR: signs, people on the road, text, letters, numbers, left-hand traffic.
""")

above('bd-rail', """
THE SCENE: a two-way country road running from the bottom to the top of the picture, crossed in the middle by a double railway track at a level crossing, with red-and-white barriers on both sides (just starting to come down) and red lamps flashing at both sides.
VEHICLES AND PEOPLE (colour code used strictly):
- a RED car (ours) stuck in the middle of the level crossing, on the rails, its hazard lights flashing orange;
- its driver and passenger running away from the car and the rails along the road, already off the track, with SOLID GREEN arrows showing them moving away;
- no train visible yet.
MUST NOT APPEAR: trains, other vehicles, signs, text, letters, numbers, left-hand traffic.
""")

above('exam-bd-motorway', """
THE SCENE: a straight Danish motorway running from the bottom to the top of the picture: two lanes going up, a hard shoulder on the right behind a broad solid white edge line, a crash barrier along the right verge.
VEHICLES (colour code used strictly): a RED car (ours) has just stopped on the hard shoulder with a breakdown, its hazard lights flashing orange; BLUE and GREY cars drive up in both lanes. Nobody has got out yet.
MUST NOT APPEAR: people, warning triangles, signs, text, letters, numbers, left-hand traffic.
""")

above('exam-bd-bend', """
THE SCENE: a two-way country road coming up from the bottom of the picture and bending sharply to the RIGHT in the middle, with dense trees on the inside of the bend hiding the view through it; white broken centre line, solid edge lines, green verges.
VEHICLES (colour code used strictly): a RED car (ours) broken down at the right edge of the right-hand lane just AFTER the bend, its hazard lights flashing orange. No warning triangle has been placed yet. No other vehicles.
MUST NOT APPEAR: people, warning triangles, signs, text, letters, numbers, left-hand traffic.
""")

view('exam-bd-rail', """
THE SCENE: our car has stopped ON a railway level crossing: the rails run across the road right under and in front of our car's bonnet. Ahead and at both sides, red-and-white barriers are coming down and the red lamps at the crossing flash. The road beyond the crossing is empty.
MUST BE CLEARLY VISIBLE: the rails under the front of our car, the lowering barriers, the flashing red lamps.
MUST NOT APPEAR: trains, other road users, text.
""")


# ---------- the lessons ----------
EMERGENCY = lesson('emergency', 'EMERGENCY', ('خودروهای امدادی', 'Emergency vehicles', 'Udrykningskøretøjer'), 7, [
    intro(('خودروهای امدادی (udrykningskøretøjer)', 'Emergency vehicles (udrykningskøretøjer)', 'Udrykningskøretøjer'),
          ('آمبولانس، آتش‌نشانی و پلیسی که با چراغ آبی و آژیر می‌آیند، باید هر چه زودتر رد شوند. آزمون می‌پرسد چطور راه را باز کنید، پشت چراغ قرمز چه کنید و وقتی از روبه‌رو می‌آیند چه.',
           'Ambulances, fire engines and police coming with blue lights and siren must get through as fast as possible. The test asks how to make way, what to do at a red light and what to do when they come towards you.',
           'Ambulancer, brandbiler og politi, der kommer med blåt blink og sirene, skal hurtigst muligt frem. Prøven spørger, hvordan du giver plads, hvad du gør ved rødt lys, og hvad du gør, når de kommer imod dig.'),
          [('بدانید وقتی خودروی امدادی می‌آید چه باید بکنید.', 'Know what to do when an emergency vehicle comes.', 'Vide hvad du skal gøre, når et udrykningskøretøj kommer.'),
           ('پشت چراغ قرمز بی‌خطر راه باز کنید.', 'Make way safely at a red light.', 'Give plads sikkert ved rødt lys.'),
           ('به دسته‌ها و محل حادثه احترام بگذارید.', 'Respect processions and accident scenes.', 'Respektere kolonner og uheldssteder.')],
          [('آمبولانس با چراغ آبی پشت سر شما.', 'An ambulance with blue lights behind you.', 'En ambulance med blåt blink bag dig.'),
           ('آتش‌نشانی پشت شما وقتی چراغ قرمز است.', 'A fire engine behind you at a red light.', 'En brandbil bag dig ved rødt lys.'),
           ('آمبولانسی که از روبه‌رو می‌آید و سبقت می‌گیرد.', 'An ambulance coming towards you while overtaking.', 'En modkørende ambulance, der overhaler.')]),
    teach(('آژیر و چراغ آبی: راه را باز کنید', 'Siren and blue lights: make way', 'Sirene og blåt blink: giv plads'),
          ('وقتی خودروی امدادی با چراغ آبی و آژیر می‌آید، باید به موقع راه را برایش باز کنید و در صورت لزوم بایستید. به سمت راست بروید و سرعت را کم کنید، در جایی که بی‌خطر است؛ نه وسط تقاطع، نه روی گذرگاه عابر و نه با ترمز ناگهانی جلوی آن. پشت سرش نچسبید تا از ترافیک رد شوید. خودرویی که جلویش پارچه‌ی سفیدی به‌وضوح بسته شده، بیمار یا مجروح بدحالی را می‌برد و مثل خودروی امدادی است: به آن هم راه بدهید.',
           'When an emergency vehicle comes with blue lights and siren, you must make way for it in good time and stop if necessary. Move to the right and slow down where it is safe: not in the middle of a junction, not on a pedestrian crossing and not by braking suddenly in front of it. Do not follow close behind it to get through the traffic. A car with a white cloth clearly fixed on its front is carrying a seriously ill or injured person and counts as an emergency vehicle: make way for it too.',
           'Når et udrykningskøretøj kommer med blåt blink og sirene, skal du i god tid holde vejen fri for det og om nødvendigt standse. Kør ind til højre, og sænk farten et sted, hvor det er sikkert: ikke midt i et kryds, ikke på et fodgængerfelt og ikke ved at bremse brat foran det. Kør ikke tæt efter det for at komme frem i trafikken. En bil med en hvid dug anbragt iøjnefaldende foran kører med en alvorligt syg eller tilskadekommen og er ligestillet med et udrykningskøretøj: giv også den plads.'),
          art='em-pull',
          rule=('به خودروی امدادیِ با چراغ آبی و آژیر به موقع راه بدهید و در صورت لزوم بایستید.', 'Make way in good time for an emergency vehicle with blue lights and siren, and stop if necessary.', 'Hold vejen fri i god tid for et udrykningskøretøj med blåt blink og sirene, og stands om nødvendigt.'),
          law=law((7, 2), (7, 4)),
          trap=('«گاز می‌دهم تا جلویش نمانم» غلط است؛ کنار بروید و آهسته کنید.', '«I speed up so as not to be in its way» is wrong; move over and slow down.', '«Jeg speeder op, så jeg ikke er i vejen» er forkert; kør til side, og sænk farten.')),
    teach(('پشت چراغ قرمز', 'At a red light', 'Ved rødt lys'),
          ('اگر پشت چراغ قرمز ایستاده‌اید و خودروی امدادی از پشت می‌آید، آرام بمانید. اگر می‌توانید بی‌خطر کمی کنار بروید، این کار را بکنید تا راه باز شود؛ ولی بدون نگاه کردن و با خطر برای ترافیک متقاطع وارد تقاطع نشوید. خودروی امدادی اغلب از خط روبه‌رو یا بین خودروها رد می‌شود.',
           'If you are waiting at a red light and an emergency vehicle comes from behind, stay calm. If you can move over a little safely, do so to open the way; but do not drive into the junction without looking or so that you endanger the crossing traffic. The emergency vehicle often gets through in the oncoming lane or between the cars.',
           'Holder du for rødt, og et udrykningskøretøj kommer bagfra, så bevar roen. Kan du flytte dig lidt til side uden fare, gør du det for at give plads; men kør ikke ind i krydset uden at se dig for eller så du bringer den krydsende trafik i fare. Udrykningskøretøjet kommer ofte forbi i modsat vognbane eller mellem bilerne.'),
          art='em-red',
          rule=('پشت چراغ قرمز فقط وقتی بی‌خطر است کنار بروید؛ بی‌احتیاط وارد تقاطع نشوید.', 'At a red light, only move over when it is safe; do not drive into the junction carelessly.', 'Ved rødt lys flytter du dig kun, når det er sikkert; kør ikke uforsigtigt ind i krydset.'),
          law=law((7, 2)),
          trap=('«فوراً از چراغ قرمز رد می‌شوم» بدون نگاه کردن غلط و خطرناک است.', '«I drive straight through the red light» without looking is wrong and dangerous.', '«Jeg kører straks over for rødt» uden at se mig for er forkert og farligt.')),
    teach(('دسته‌ها و محل حادثه', 'Processions and accident scenes', 'Kolonner og uheldssteder'),
          ('به ستون‌های ارتش و امدادی، گروه کودکانی که سرپرستی همراهشان است، دسته‌ی تشییع جنازه و دیگر دسته‌های بسته راه آزاد بدهید و از میانشان نگذرید. به محل حادثه یا آتش‌سوزی آن‌قدر نزدیک نشوید که کار امدادگران یا رفت‌وآمد خودروهایشان را سخت کنید. اگر کمکتان لازم نیست، برای تماشا نایستید و به راهتان ادامه بدهید.',
           'Give free passage to columns of the armed forces and the rescue services, groups of children supervised by a leader, funeral processions and other closed processions, and do not drive through them. Do not get so close to an accident or a fire that you hinder the rescue work or the vehicles driving to and from it. If your help is not needed, do not stop to watch; drive on.',
           'Giv fri passage for forsvarets og redningsberedskabets kolonner, grupper af børn under opsyn af en leder, ligtog og andre sluttede optog, og kør ikke igennem dem. Kom ikke så nær til et uheldssted eller brandsted, at redningsarbejdet eller kørslen til og fra stedet bliver hæmmet. Er der ikke brug for din hjælp, så stands ikke for at kigge, men kør videre.'),
          rule=('به دسته‌ها راه آزاد بدهید؛ آن‌قدر به محل حادثه نزدیک نشوید که کار امدادگران سخت شود.', 'Give free passage to processions; do not get so close to an accident that you hinder the rescue work.', 'Giv fri passage for optog; kom ikke så nær til et uheldssted, at redningsarbejdet hæmmes.'),
          law=law((7, 5), (7, 6)),
          trap=('«کنار محل حادثه می‌ایستم تا ببینم چه شده» غلط است؛ تماشاچی‌ها کار امدادگران را سخت می‌کنند.', '«I stop by the accident to see what happened» is wrong; onlookers hinder the rescue work.', '«Jeg standser ved uheldsstedet for at se, hvad der er sket» er forkert; nysgerrige hæmmer redningsarbejdet.')),
    q('exam-em-behind',
      'En ambulance med blåt blink og sirene kommer bagfra. Hvordan forholder du dig?',
      'An ambulance with blue lights and siren is coming from behind. What do you do?',
      'آمبولانسی با چراغ آبی و آژیر از پشت می‌آید. چه می‌کنید؟',
      st(True, 'Jeg kører ind til højre og sænker farten, så den kan komme forbi.', 'I move to the right and slow down so that it can get past.', 'به راست می‌روم و سرعتم را کم می‌کنم تا رد شود.',
         ('باید به موقع راه را باز کنید.', 'You must make way in good time.', 'Du skal holde vejen fri i god tid.')),
      st(True, 'Jeg standser, hvis det er nødvendigt.', 'I stop if it is necessary.', 'در صورت لزوم می‌ایستم.',
         ('قانون در صورت لزوم توقف را می‌خواهد.', 'The law asks you to stop if necessary.', 'Loven kræver, at du om nødvendigt standser.')),
      st(False, 'Jeg speeder op, så jeg ikke er i vejen.', 'I speed up so that I am not in the way.', 'گاز می‌دهم تا سر راهش نباشم.',
         ('گاز دادن راه را باز نمی‌کند و خطرناک است.', 'Speeding up does not make way and is dangerous.', 'At speede op giver ikke plads og er farligt.')),
      rule=0),
    q('exam-em-red',
      'Du holder for rødt, og bag dig kommer en brandbil med blåt blink og sirene. Hvordan forholder du dig?',
      'You are waiting at a red light, and a fire engine with blue lights and siren comes up behind you. What do you do?',
      'پشت چراغ قرمز ایستاده‌اید و ماشین آتش‌نشانی با چراغ آبی و آژیر پشت شما می‌آید. چه می‌کنید؟',
      st(True, 'Jeg giver plads, hvis jeg kan gøre det uden fare.', 'I make room if I can do it safely.', 'اگر بی‌خطر بتوانم، راه باز می‌کنم.',
         ('فقط وقتی بی‌خطر است کنار بروید.', 'Only move over when it is safe.', 'Flyt dig kun, når det kan ske uden fare.')),
      st(False, 'Jeg kører straks over for rødt uden at se mig for.', 'I drive through the red light at once without looking.', 'فوراً بدون نگاه کردن از چراغ قرمز رد می‌شوم.',
         ('در تقاطع خودروهای متقاطع با چراغ سبز در حرکت‌اند.', 'In the junction the crossing cars are driving on green.', 'I krydset kører den krydsende trafik for grønt.')),
      rule=1),
    q('exam-em-oncoming',
      'En ambulance med blåt blink kommer imod dig og overhaler en lastbil. Hvordan forholder du dig?',
      'An ambulance with blue lights is coming towards you, overtaking a lorry. What do you do?',
      'آمبولانسی با چراغ آبی از روبه‌رو می‌آید و از کامیونی سبقت می‌گیرد. چه می‌کنید؟',
      st(True, 'Jeg holder godt til højre og sænker farten.', 'I keep well to the right and slow down.', 'خوب به راست می‌روم و سرعتم را کم می‌کنم.',
         ('برای خودروی امدادی از هر طرف که بیاید، راه را باز می‌کنید.', 'You make way for an emergency vehicle whichever side it comes from.', 'Du holder vejen fri for udrykningen, uanset hvilken side den kommer fra.')),
      st(True, 'Jeg standser, hvis den ellers ikke kan komme forbi.', 'I stop if it could not get past otherwise.', 'اگر وگرنه نتواند رد شود، می‌ایستم.',
         ('در صورت لزوم باید بایستید.', 'If necessary you must stop.', 'Om nødvendigt skal du standse.')),
      st(False, 'En modkørende ambulance angår ikke mig.', 'An oncoming ambulance does not concern me.', 'آمبولانسی که از روبه‌رو می‌آید به من مربوط نیست.',
         ('وظیفه‌ی باز کردن راه برای همه است.', 'The duty to make way applies to everyone.', 'Pligten til at holde vejen fri gælder alle.')),
      rule=0),
    result(1),
    summary([('خودروی امدادی با چراغ آبی و آژیر: به موقع راه باز کنید و در صورت لزوم بایستید.', 'An emergency vehicle with blue lights and siren: make way in good time and stop if necessary.', 'Udrykning med blåt blink og sirene: hold vejen fri i god tid, og stands om nødvendigt.'),
             ('به راست بروید و آهسته کنید، نه وسط تقاطع و نه با ترمز ناگهانی.', 'Move right and slow down, not in a junction and not by braking suddenly.', 'Kør til højre, og sænk farten, ikke midt i et kryds og ikke med en brat opbremsning.'),
             ('پشت چراغ قرمز فقط وقتی بی‌خطر است کنار بروید.', 'At a red light, only move over when it is safe.', 'Ved rødt flytter du dig kun, når det er sikkert.'),
             ('خودرویی با پارچه‌ی سفید جلویش مثل خودروی امدادی است.', 'A car with a white cloth on its front counts as an emergency vehicle.', 'En bil med hvid dug foran er ligestillet med et udrykningskøretøj.'),
             ('به دسته‌ها راه آزاد بدهید؛ کار امدادگران را با تماشا سخت نکنید.', 'Give free passage to processions; do not hinder the rescue work by watching.', 'Giv fri passage for optog; hæm ikke redningsarbejdet ved at kigge.')]),
])

ACCIDENT = lesson('accident', 'ACCIDENT', ('تصادف و کمک‌های اولیه', 'Accidents and first aid', 'Ulykker og førstehjælp'), 9, [
    intro(('تصادف و کمک‌های اولیه', 'Accidents and first aid', 'Ulykker og førstehjælp'),
          ('آزمون می‌پرسد اگر در تصادفی دخیل بودید یا به آن رسیدید چه کنید: وظیفه‌های قانونی، چهار اصل کمک‌های اولیه و کمک به آدم بیهوش.',
           'The test asks what to do if you are involved in an accident or come upon one: the legal duties, first aid\'s four main points and helping an unconscious person.',
           'Prøven spørger, hvad du gør, hvis du er impliceret i et uheld eller kommer til et: pligterne efter loven, førstehjælpens fire hovedpunkter og hjælp til en bevidstløs.'),
          [('وظیفه‌هایتان را در تصادف بدانید.', 'Know your duties in an accident.', 'Kende dine pligter ved et uheld.'),
           ('چهار اصل کمک‌های اولیه را به ترتیب بدانید.', 'Know first aid\'s four main points in order.', 'Kende førstehjælpens fire hovedpunkter i rækkefølge.'),
           ('بدانید با آدم بیهوش چه کنید.', 'Know what to do with an unconscious person.', 'Vide hvad du gør med en bevidstløs.')],
          [('رسیدن به تصادفی که هنوز کسی آن‌جا نیست.', 'Coming upon an accident where nobody has stopped yet.', 'At komme til et uheld, hvor ingen har standset endnu.'),
           ('آدم بیهوشی که نفس می‌کشد.', 'An unconscious person who is breathing.', 'En bevidstløs, der trækker vejret.'),
           ('خسارت کوچک به خودروی پارک‌شده وقتی صاحبش نیست.', 'Small damage to a parked car whose owner is not there.', 'En lille skade på en parkeret bil, hvis ejer ikke er der.')]),
    teach(('اگر در تصادف دخیل بودید', 'If you are involved in an accident', 'Hvis du er impliceret i et uheld'),
          ('هر کس در تصادف دخیل باشد، چه مقصر باشد چه نه، باید فوراً بایستد. بعد باید: تا جای ممکن به آسیب‌دیدگان کمک کند، در ایمن کردن ترافیک شرکت کند و اگر طرف دیگر یا صاحب مال آسیب‌دیده بخواهد، نام و نشانی‌اش را به او بدهد. اگر به کسی آسیبی بیش از جزئی زد، هر چه زودتر به پلیس خبر بدهد؛ اگر به مالی زد و کسی آن‌جا نبود، هر چه زودتر به صاحبش یا پلیس خبر بدهد. وقتی کسی کشته یا به‌شدت زخمی شده، صحنه را تغییر ندهید، مگر خودرویی برای ترافیک خطرناک باشد.',
           'Everyone involved in an accident, at fault or not, must stop at once. Then they must: help the injured as far as possible, take part in making the traffic safe, and give their name and address to the other party or the owner of damaged property if they ask for it. If you have caused more than slight injury to someone, tell the police as soon as possible; if you damaged property and nobody is there, tell the owner or the police as soon as possible. When someone has been killed or badly hurt, do not change the scene, unless a vehicle is a danger to traffic.',
           'Enhver, der er impliceret i et færdselsuheld, skal straks standse, hvad enten det er ens skyld eller ej. Derefter skal man: i muligt omfang hjælpe tilskadekomne, deltage i at sikre færdslen og opgive navn og adresse til den anden part eller ejeren af beskadigede ting, hvis de beder om det. Har man forvoldt ikke ubetydelig skade på en anden person, underretter man snarest politiet; har man skadet ting, og er der ingen til stede, underretter man snarest ejeren eller politiet. Er nogen dræbt eller alvorligt skadet, må stedet ikke ændres, medmindre et køretøj er til fare for færdslen.'),
          art='acc-minor',
          rule=('در تصادف: بایستید، کمک کنید، ترافیک را ایمن کنید، نام و نشانی بدهید؛ آسیب جانی: به پلیس خبر بدهید.', 'In an accident: stop, help, make the traffic safe, give your name and address; injuries: tell the police.', 'Ved uheld: stands, hjælp, sikr færdslen, opgiv navn og adresse; personskade: underret politiet.'),
          law=law((9, 1), (9, 2), (9, 3)),
          trap=('«تقصیر من نبود، پس می‌روم» غلط است؛ هر کس دخیل است باید بایستد.', '«It was not my fault, so I drive on» is wrong; everyone involved must stop.', '«Det var ikke min skyld, så jeg kører» er forkert; alle impliceret skal standse.')),
    teach(('چهار اصل کمک‌های اولیه', 'First aid\'s four main points', 'Førstehjælpens fire hovedpunkter'),
          ('۱) جلوی ادامه‌ی حادثه را بگیرید: محل را ایمن کنید (چراغ خطر، مثلث خطر، جلیقه‌ی شب‌نما، خاموش کردن موتور خودروی تصادفی). ۲) کمک نجات‌بخش بدهید: هوشیاری و تنفس را بررسی کنید، راه هوایی را باز کنید، اگر عادی نفس نمی‌کشد ماساژ قلبی بدهید، خونریزی شدید را بند بیاورید. ۳) با ۱۱۲ تماس بگیرید. ۴) کمک‌های معمولی بدهید: آرام کنید، گرم نگه دارید، تنها نگذارید. در تصویر، یک نفر محل را ایمن کرده و زنگ می‌زند و دیگری به آسیب‌دیده کمک می‌کند.',
           '1) Stop the accident: make the place safe (hazard lights, warning triangle, reflective vest, switch off the crashed car\'s engine). 2) Give life-saving first aid: check consciousness and breathing, open the airway, give chest compressions if the person is not breathing normally, stop heavy bleeding. 3) Call 112. 4) Give general first aid: comfort, keep warm, do not leave alone. In the picture one person has made the place safe and is calling, and another is helping the injured person.',
           '1) Stands ulykken: sikr stedet (havariblink, advarselstrekant, refleksvest, sluk motoren i den forulykkede bil). 2) Giv livreddende førstehjælp: tjek bevidsthed og vejrtrækning, skab frie luftveje, giv hjertemassage, hvis personen ikke trækker vejret normalt, stop kraftig blødning. 3) Ring 112. 4) Giv almindelig førstehjælp: berolig, hold varm, lad ikke personen være alene. På billedet har én sikret stedet og ringer, mens en anden hjælper den tilskadekomne.'),
          art='acc-scene',
          rule=('اول محل را ایمن کنید، بعد کمک نجات‌بخش، بعد ۱۱۲، بعد کمک‌های معمولی.', 'First make the place safe, then life-saving first aid, then 112, then general first aid.', 'Først sikr stedet, så livreddende førstehjælp, så 112, så almindelig førstehjælp.'),
          law=law((9, 2), 'Dansk Førstehjælpsråd'),
          trap=('«به آسیب‌دیده آب یا خوراکی می‌دهم» غلط است؛ ممکن است جراحی لازم داشته باشد یا خفه شود.', '«I give the injured person water or food» is wrong; they may need surgery or could choke.', '«Jeg giver den tilskadekomne vand eller mad» er forkert; personen kan få brug for operation eller blive kvalt.')),
    teach(('آدم بیهوش', 'An unconscious person', 'En bevidstløs'),
          ('اگر بیهوش است ولی عادی نفس می‌کشد، او را به پهلو در وضعیت ریکاوری (aflåst sideleje) بخوابانید تا راه هوایی باز بماند و تنفسش را زیر نظر داشته باشید. اگر عادی نفس نمی‌کشد، با ۱۱۲ تماس بگیرید و احیای قلبی را شروع کنید: ۳۰ فشار روی قفسه‌ی سینه و ۲ تنفس، و اگر دستگاه شوک (hjertestarter) هست، از آن استفاده کنید.',
           'If the person is unconscious but breathing normally, lay them on their side in the recovery position (aflåst sideleje) so that the airway stays open, and keep watching the breathing. If they are not breathing normally, call 112 and start CPR: 30 chest compressions and 2 rescue breaths, and use a defibrillator (hjertestarter) if there is one.',
           'Er personen bevidstløs, men trækker vejret normalt, lægger du den i aflåst sideleje, så luftvejene holdes frie, og holder øje med vejrtrækningen. Trækker personen ikke vejret normalt, ringer du 112 og starter hjerte-lunge-redning: 30 tryk på brystet og 2 indblæsninger, og bruger en hjertestarter, hvis der er en.'),
          art='acc-recovery',
          rule=('بیهوش و نفس عادی: وضعیت ریکاوری؛ نفس نمی‌کشد: ۱۱۲ و احیا ۳۰ به ۲.', 'Unconscious and breathing normally: the recovery position; not breathing: 112 and CPR 30:2.', 'Bevidstløs og normal vejrtrækning: aflåst sideleje; ingen normal vejrtrækning: 112 og hjerte-lunge-redning 30:2.'),
          law=law('Dansk Førstehjælpsråd'),
          trap=('«آدم بیهوش را به پشت می‌خوابانم تا راحت باشد» غلط است؛ زبانش ممکن است راه هوایی را ببندد.', '«I lay the unconscious person on their back to be comfortable» is wrong; the tongue may block the airway.', '«Jeg lægger den bevidstløse på ryggen, så den ligger godt» er forkert; tungen kan spærre luftvejene.')),
    q('exam-acc-arrive',
      'Du kommer som den første til et uheld. Hvordan forholder du dig?',
      'You are the first to arrive at an accident. What do you do?',
      'اولین کسی هستید که به یک تصادف می‌رسید. چه می‌کنید؟',
      st(True, 'Jeg standser og sikrer ulykkesstedet med havariblink og advarselstrekant.', 'I stop and make the scene safe with hazard lights and a warning triangle.', 'می‌ایستم و محل را با چراغ خطر و مثلث خطر ایمن می‌کنم.',
         ('اصل اول: جلوی ادامه‌ی حادثه را بگیرید.', 'The first point: stop the accident.', 'Første hovedpunkt: stands ulykken.')),
      st(True, 'Jeg ringer 112, hvis nogen er kommet til skade.', 'I call 112 if anyone is injured.', 'اگر کسی آسیب دیده، با ۱۱۲ تماس می‌گیرم.',
         ('۱۱۲ امداد را می‌فرستد.', '112 sends help.', '112 sender hjælp.')),
      st(False, 'Jeg kører forbi, fordi jeg ikke selv var med i uheldet.', 'I drive past because I was not in the accident myself.', 'رد می‌شوم، چون خودم در تصادف نبودم.',
         ('هر کس موظف است تا جایی که می‌تواند به کسی که در خطر جانی است کمک کند.', 'Everyone has a duty to help, as far as they can, someone whose life is in danger.', 'Alle har pligt til efter evne at hjælpe en person, der er i livsfare.')),
      rule=1),
    q('exam-acc-person',
      'En tilskadekommen er bevidstløs, men trækker vejret normalt. Hvordan forholder du dig?',
      'An injured person is unconscious but breathing normally. What do you do?',
      'آسیب‌دیده‌ای بیهوش است ولی عادی نفس می‌کشد. چه می‌کنید؟',
      st(True, 'Jeg lægger personen i aflåst sideleje.', 'I put the person in the recovery position.', 'او را در وضعیت ریکاوری می‌خوابانم.',
         ('وضعیت ریکاوری راه هوایی را باز نگه می‌دارد.', 'The recovery position keeps the airway open.', 'Aflåst sideleje holder luftvejene frie.')),
      st(True, 'Jeg holder øje med vejrtrækningen, til hjælpen kommer.', 'I keep watching the breathing until help arrives.', 'تا رسیدن امداد، تنفسش را زیر نظر دارم.',
         ('اگر نفس قطع شد، باید احیا را شروع کنید.', 'If the breathing stops, you must start CPR.', 'Stopper vejrtrækningen, skal du starte hjerte-lunge-redning.')),
      st(False, 'Jeg giver personen noget at drikke.', 'I give the person something to drink.', 'به او چیزی برای نوشیدن می‌دهم.',
         ('به آدم بیهوش نباید نوشیدنی داد.', 'You must never give an unconscious person a drink.', 'En bevidstløs må aldrig få noget at drikke.')),
      rule=2),
    q('exam-acc-park',
      'Du har lavet en lille skade på en parkeret bil. Ejeren er der ikke. Hvordan forholder du dig?',
      'You have made a small dent in a parked car. The owner is not there. What do you do?',
      'به خودرویی پارک‌شده خسارت کوچکی زده‌اید. صاحبش آن‌جا نیست. چه می‌کنید؟',
      st(True, 'Jeg giver ejeren eller politiet besked hurtigst muligt.', 'I tell the owner or the police as soon as possible.', 'هر چه زودتر به صاحبش یا پلیس خبر می‌دهم.',
         ('اگر کسی نیست که نام شما را بگیرد، باید به صاحب یا پلیس خبر بدهید.', 'If nobody is there to take your name, you must tell the owner or the police.', 'Er der ingen til at få dit navn, skal du give ejeren eller politiet besked.')),
      st(False, 'Jeg kører, fordi skaden er lille.', 'I drive away because the damage is small.', 'می‌روم، چون خسارت کوچک است.',
         ('اندازه‌ی خسارت وظیفه را از بین نمی‌برد.', 'The size of the damage does not remove the duty.', 'Skadens størrelse fjerner ikke pligten.')),
      rule=0),
    result(1),
    summary([('دخیل در تصادف: بایستید، کمک کنید، محل را ایمن کنید و نام و نشانی بدهید.', 'Involved in an accident: stop, help, make the place safe and give your name and address.', 'Impliceret i uheld: stands, hjælp, sikr stedet, og opgiv navn og adresse.'),
             ('آسیب جانی: پلیس؛ خسارت به مالِ کسی که نیست: صاحب یا پلیس.', 'Injuries: the police; damage to property whose owner is not there: the owner or the police.', 'Personskade: politiet; skade på ting uden ejer til stede: ejeren eller politiet.'),
             ('چهار اصل: ایمن کردن، کمک نجات‌بخش، ۱۱۲، کمک‌های معمولی.', 'The four points: make safe, life-saving first aid, 112, general first aid.', 'De fire hovedpunkter: stands ulykken, livreddende førstehjælp, 112, almindelig førstehjælp.'),
             ('بیهوش با نفس عادی: وضعیت ریکاوری؛ بدون نفس: احیا ۳۰ به ۲.', 'Unconscious and breathing: recovery position; not breathing: CPR 30:2.', 'Bevidstløs med vejrtrækning: aflåst sideleje; uden: hjerte-lunge-redning 30:2.')],
            ('law', 'firstaid', 'plan')),
])

BREAKDOWN = lesson('breakdown', 'BREAKDOWN', ('خرابی خودرو در جاده', 'Breaking down on the road', 'Motorstop på vejen'), 9, [
    intro(('خرابی خودرو در جاده (motorstop)', 'Breaking down on the road (motorstop)', 'Motorstop på vejen'),
          ('خودرویی که خراب شده و ایستاده، برای دیگران خطرناک است. آزمون می‌پرسد چطور هشدار بدهید، مثلث خطر را کجا بگذارید و در بزرگراه و روی ریل قطار چه کنید.',
           'A car that has broken down and stands still is a danger to others. The test asks how to warn, where to put the warning triangle, and what to do on the motorway and on a level crossing.',
           'En bil med motorstop, der holder stille, er en fare for andre. Prøven spørger, hvordan du advarer, hvor advarselstrekanten skal stå, og hvad du gør på motorvejen og på en jernbaneoverkørsel.'),
          [('بدانید کِی و کجا مثلث خطر می‌گذارید.', 'Know when and where you put the warning triangle.', 'Vide hvornår og hvor du stiller advarselstrekanten.'),
           ('در بزرگراه بی‌خطر رفتار کنید.', 'Act safely on the motorway.', 'Handle sikkert på motorvejen.'),
           ('بدانید اگر روی ریل قطار گیر کردید چه کنید.', 'Know what to do if you are stuck on a level crossing.', 'Vide hvad du gør, hvis du holder fast på en jernbaneoverkørsel.')],
          [('خرابی در بزرگراه.', 'A breakdown on the motorway.', 'Motorstop på motorvejen.'),
           ('خرابی درست بعد از پیچ.', 'A breakdown just after a bend.', 'Motorstop lige efter et sving.'),
           ('خودرویی که روی ریل قطار خاموش شده است.', 'A car that has stalled on a level crossing.', 'En bil, der er gået i stå på en jernbaneoverkørsel.')]),
    teach(('خودرو را بردارید یا هشدار بدهید', 'Move the car or warn others', 'Flyt bilen, eller advar andre'),
          ('اگر خودرو جایی خراب شد که توقف یا پارک ممنوع است یا خطرناک است، باید هر چه زودتر آن را به جای مناسبی ببرید. اگر ماند و خطر یا مزاحمت ایجاد کرد، باید به دیگران هشدار بدهید: چراغ خطر و مثلث خطر، طوری که رانندگانی که می‌آیند به موقع آن را ببینند: در جاده‌ی معمولی دست‌کم ۵۰ متر و در بزرگراه دست‌کم ۱۰۰ متر پشت خودرو. در پیچ یا پشت سربالایی، مثلث را پیش از پیچ یا سربالایی بگذارید. جلیقه‌ی شب‌نما بپوشید.',
           'If the car breaks down where stopping or parking is forbidden or dangerous, you must move it to a suitable place as soon as possible. If it stays and causes danger or trouble, you must warn others: hazard lights and the warning triangle, placed so that drivers coming up see it in good time: at least 50 m behind the car on an ordinary road and at least 100 m on a motorway. In a bend or behind a hilltop, put the triangle before the bend or the hilltop. Wear a reflective vest.',
           'Får bilen motorstop et sted, hvor standsning eller parkering er forbudt eller farlig, skal du snarest flytte den til et egnet sted. Bliver den holdende og er til fare eller ulempe, skal du advare de andre: havariblink og advarselstrekant, stillet så de bagfrakommende ser den i god tid: på almindelig vej mindst 50 m bag bilen og på motorvej mindst 100 m. I et sving eller bag en bakketop stiller du trekanten før svinget eller bakketoppen. Tag refleksvest på.'),
          art='bd-bend',
          rule=('چراغ خطر و مثلث خطر: دست‌کم ۵۰ متر عقب، در بزرگراه ۱۰۰ متر؛ در پیچ، پیش از پیچ.', 'Hazard lights and the triangle: at least 50 m behind, 100 m on the motorway; in a bend, before the bend.', 'Havariblink og advarselstrekant: mindst 50 m bagved, 100 m på motorvej; i et sving før svinget.'),
          law=law((31, 2)),
          trap=('«مثلث را درست پشت خودرو می‌گذارم تا خوب دیده شود» غلط است؛ خیلی دیر دیده می‌شود.', '«I put the triangle right behind the car so it is easy to see» is wrong; it is seen far too late.', '«Jeg stiller trekanten lige bag bilen, så den er let at se» er forkert; den ses alt for sent.')),
    teach(('خرابی در بزرگراه', 'Breaking down on the motorway', 'Motorstop på motorvejen'),
          ('خودرو را تا جای ممکن از سواره‌رو بیرون ببرید، به شانه‌ی اضطراری و تا جای ممکن به راست، و چراغ خطر را روشن کنید. همه از سمت راست، دور از ترافیک، پیاده شوند و پشت گاردریل بایستند. اگر بی‌خطر است، مثلث خطر را دست‌کم ۱۰۰ متر عقب بگذارید و با تلفن اضطراری یا موبایل کمک بخواهید. فقط وقتی تعمیر در محل مجازید که برای زود بردن خودرو از بزرگراه لازم باشد.',
           'Get the car as far off the carriageway as possible, onto the hard shoulder and as far to the right as you can, and switch on the hazard lights. Everyone gets out on the right side, away from the traffic, and waits behind the crash barrier. If it is safe, put the warning triangle at least 100 m behind, and call for help on the emergency phone or a mobile. A repair on the spot is only allowed if it is needed to get the car off the motorway quickly.',
           'Få bilen så langt væk fra kørebanen som muligt, ud i nødsporet og så langt til højre som muligt, og tænd havariblinket. Alle stiger ud i højre side, væk fra trafikken, og venter bag autoværnet. Kan det ske uden fare, stiller du advarselstrekanten mindst 100 m bagved og ringer efter hjælp fra nødtelefonen eller en mobil. Reparation på stedet må kun ske, hvis den er nødvendig for hurtigt at få bilen væk fra motorvejen.'),
          art='bd-motorway',
          rule=('بزرگراه: شانه‌ی اضطراری، چراغ خطر، همه پشت گاردریل؛ مثلث ۱۰۰ متر عقب اگر بی‌خطر است.', 'Motorway: hard shoulder, hazard lights, everyone behind the barrier; the triangle 100 m behind if it is safe.', 'Motorvej: nødsporet, havariblink, alle bag autoværnet; trekanten 100 m bagved, hvis det er sikkert.'),
          law=law((31, 2), (47, 1)),
          trap=('«در خودرو می‌نشینیم تا امداد برسد» خطرناک است؛ پشت گاردریل امن‌تر است.', '«We stay in the car until help comes» is dangerous; behind the crash barrier is safer.', '«Vi bliver i bilen, til hjælpen kommer» er farligt; bag autoværnet er sikrere.')),
    teach(('روی ریل قطار', 'On a level crossing', 'På en jernbaneoverkørsel'),
          ('وقتی قطاری دیده یا شنیده می‌شود، یا راه‌بندها بسته‌اند یا بالا و پایین می‌روند، از تقاطع راه‌آهن رد نشوید. روی آن هم نایستید؛ پس فقط وقتی واردش شوید که آن طرف برای خودرویتان جا هست. اگر خودرو روی ریل خاموش شد و نمی‌شود فوراً آن را برداشت، همه فوراً پیاده شوند و از ریل دور شوند. بعد با ۱۱۲ تماس بگیرید تا به قطار هشدار داده شود. جان آدم‌ها از خودرو مهم‌تر است.',
           'Do not cross a level crossing when a train can be seen or heard, or when the barriers are closed or moving. Do not stop on it either, so only drive onto it when there is room for your car on the other side. If the car stalls on the rails and cannot be moved at once, everyone gets out immediately and away from the rails. Then call 112 so that the train can be warned. People\'s lives matter more than the car.',
           'Kør ikke over en jernbaneoverkørsel, når det kan ses eller høres, at et tog nærmer sig, eller når bommene er nede eller er ved at gå op eller ned. Du må heller ikke standse på den, så kør kun ud på den, når der er plads til bilen på den anden side. Går bilen i stå på sporet og kan ikke flyttes med det samme, skal alle straks ud og væk fra sporet. Ring derefter 112, så toget kan blive advaret. Menneskeliv er vigtigere end bilen.'),
          art='bd-rail',
          rule=('روی ریل گیر کردید: همه فوراً بیرون و دور از ریل؛ بعد ۱۱۲.', 'Stuck on the rails: everyone out at once and away from the track; then 112.', 'Holder du fast på sporet: alle straks ud og væk fra sporet; derefter 112.'),
          law=law((5, 1), (5, 2), (29, 1), (31, 3)),
          trap=('«اول چند بار سعی می‌کنم روشنش کنم» غلط است؛ ممکن است قطار برسد.', '«First I try to start it a few times» is wrong; the train may arrive.', '«Først prøver jeg at starte den et par gange» er forkert; toget kan komme.')),
    teach(('وقتی در حین رانندگی چیزی خراب می‌شود', 'When something fails while you drive', 'Når noget svigter under kørslen'),
          ('بیشتر خرابی‌ها اول هشدار می‌دهند. چراغ هشدار قرمز (مثلاً ترمز، فشار روغن، باتری یا دمای موتور) یعنی هر جا بی‌خطر شد بایستید و ببینید چه شده؛ چراغ زرد یا نارنجی یعنی به‌زودی بررسی‌اش کنید. اگر پدال ترمز نرم شد یا خودرو هنگام ترمز به یک طرف کشیده شد، آهسته و با احتیاط تا جای امنی بروید و پیش از ادامه‌ی راه خودرو را تعمیر کنید.',
           'Most faults give a warning first. A red warning light (for example brakes, oil pressure, battery or engine temperature) means stop as soon as it is safe and find out what is wrong; a yellow or orange one means get it checked soon. If the brake pedal goes soft or the car pulls to one side when you brake, drive slowly and carefully to a safe place and get the car repaired before you drive on.',
           'De fleste fejl giver et varsel først. En rød advarselslampe (fx bremser, olietryk, batteri eller motortemperatur) betyder, at du skal standse, så snart det kan ske sikkert, og finde ud af, hvad der er galt; en gul eller orange lampe betyder, at bilen snart skal efterses. Bliver bremsepedalen blød, eller trækker bilen til den ene side, når du bremser, så kør langsomt og forsigtigt til et sikkert sted, og få bilen repareret, før du kører videre.'),
          rule=('چراغ هشدار قرمز: هر جا بی‌خطر شد بایستید. ترکیدن لاستیک: فرمان را محکم بگیرید و ترمز شدید نکنید.', 'Red warning light: stop where it is safe. Burst tyre: hold the wheel firmly and do not brake hard.', 'Rød advarselslampe: stands, hvor det er sikkert. Et dæk springer: hold fast i rattet, og brems ikke hårdt.'),
          law=law((67, 3)),
          points=[('ترکیدن لاستیک: فرمان را با دو دست محکم نگه دارید و ترمز شدید نکنید؛ پا را از گاز بردارید و وقتی سرعت کم شد کنار بزنید.', 'A tyre bursts: hold the wheel firmly with both hands and do not brake hard; ease off the accelerator and pull over when the car has slowed down.', 'Et dæk springer: hold rattet fast med begge hænder, og brems ikke hårdt; slip speederen, og hold ind, når farten er nede.'),
                  ('موتور خاموش شد: فرمان و ترمز هنوز کار می‌کنند ولی نیروی خیلی بیشتری می‌خواهند؛ محکم فرمان بدهید و ترمز کنید و کنار بزنید.', 'The engine stops: the steering and brakes still work but need much more force; steer and brake firmly and pull over.', 'Motoren går i stå: styring og bremser virker stadig, men kræver meget mere kraft; styr og brems bestemt, og hold ind.'),
                  ('پدال گاز گیر کرد: کلاچ بگیرید یا دنده را خلاص (N) کنید، ترمز کنید و کنار بزنید؛ موتور را فقط وقتی خاموش کنید که خودرو ایستاده است.', 'The accelerator sticks: press the clutch or select neutral (N), brake and pull over; switch off the engine only once the car has stopped.', 'Speederen sidder fast: træd koblingen ned, eller sæt gearet i frigear (N), brems, og hold ind; sluk først motoren, når bilen holder stille.'),
                  ('دود یا بوی سوختن از موتور: بایستید، موتور را خاموش کنید و همه پیاده شوند؛ به ۱۱۲ زنگ بزنید و کاپوت را کامل باز نکنید.', 'Smoke or a smell of burning from the engine: stop, switch off the engine and get everyone out; call 112 and do not open the bonnet fully.', 'Røg eller brandlugt fra motoren: hold ind, sluk motoren, og få alle ud; ring 112, og åbn ikke motorhjelmen helt.'),
                  ('بوی دود اگزوز داخل خودرو: پنجره‌ها را باز کنید، بایستید و پیش از ادامه‌ی راه اگزوز را تعمیر کنید.', 'A smell of exhaust inside the car: open the windows, stop and get the exhaust repaired before you drive on.', 'Lugter det af udstødning inde i bilen: åbn vinduerne, hold ind, og få udstødningen repareret, før du kører videre.')],
          trap=('«موتور خاموش شده، پس ترمز کار نمی‌کند» غلط است؛ ترمز کار می‌کند، ولی باید خیلی محکم‌تر فشار بدهید.', '«The engine has stopped, so the brakes do not work» is wrong; they work, but you must press much harder.', '«Motoren er gået i stå, så bremserne virker ikke» er forkert; de virker, men du skal træde meget hårdere.')),
    q('exam-bd-motorway',
      'Din bil har fået motorstop på motorvejen. Hvordan forholder du dig?',
      'Your car has broken down on the motorway. What do you do?',
      'خودروی شما در بزرگراه خراب شده است. چه می‌کنید؟',
      st(True, 'Jeg kører så langt ud i nødsporet som muligt og tænder havariblinket.', 'I get as far onto the hard shoulder as possible and switch on the hazard lights.', 'تا جای ممکن به شانه‌ی اضطراری می‌روم و چراغ خطر را روشن می‌کنم.',
         ('خودرو باید تا جای ممکن دور از سواره‌رو باشد.', 'The car must be as far off the carriageway as possible.', 'Bilen skal være så langt væk fra kørebanen som muligt.')),
      st(True, 'Alle stiger ud i højre side og går om bag autoværnet.', 'Everyone gets out on the right side and goes behind the crash barrier.', 'همه از سمت راست پیاده می‌شوند و پشت گاردریل می‌روند.',
         ('پشت گاردریل از ترافیک دورتر و امن‌تر است.', 'Behind the barrier you are further from the traffic and safer.', 'Bag autoværnet er man længere fra trafikken og mere sikker.')),
      st(False, 'Vi bliver siddende i bilen, til vejhjælpen kommer.', 'We stay sitting in the car until the breakdown service comes.', 'در خودرو می‌نشینیم تا امداد خودرو برسد.',
         ('ماندن در خودرو در بزرگراه خطرناک است.', 'Staying in the car on the motorway is dangerous.', 'At blive i bilen på motorvejen er farligt.')),
      rule=1),
    q('exam-bd-bend',
      'Din bil er gået i stå lige efter et uoverskueligt sving. Hvor stiller du advarselstrekanten?',
      'Your car has stalled just after a blind bend. Where do you put the warning triangle?',
      'خودروی شما درست بعد از پیچی با دید کم خاموش شده است. مثلث خطر را کجا می‌گذارید؟',
      st(True, 'Før svinget, så de bagfrakommende ser den i god tid.', 'Before the bend, so that those coming up behind see it in good time.', 'پیش از پیچ، تا رانندگانی که می‌آیند آن را به موقع ببینند.',
         ('مثلث باید به موقع دیده شود؛ بعد از پیچ دیگر دیر است.', 'The triangle must be seen in time; after the bend it is too late.', 'Trekanten skal ses i god tid; efter svinget er det for sent.')),
      st(False, 'Lige bag bilen.', 'Right behind the car.', 'درست پشت خودرو.',
         ('درست پشت خودرو، هشدار خیلی دیر دیده می‌شود.', 'Right behind the car, the warning is seen far too late.', 'Lige bag bilen ses advarslen alt for sent.')),
      rule=0),
    q('exam-bd-rail',
      'Din bil er gået i stå på jernbaneoverkørslen, og bommene går ned. Hvordan forholder du dig?',
      'Your car has stalled on the level crossing, and the barriers are coming down. What do you do?',
      'خودروی شما روی تقاطع راه‌آهن خاموش شده و راه‌بندها پایین می‌آیند. چه می‌کنید؟',
      st(True, 'Alle skal ud af bilen og væk fra sporet med det samme.', 'Everyone must get out of the car and away from the track at once.', 'همه باید فوراً از خودرو بیرون بیایند و از ریل دور شوند.',
         ('جان آدم‌ها از همه مهم‌تر است.', 'People\'s lives matter most.', 'Menneskeliv kommer først.')),
      st(False, 'Jeg prøver at starte bilen igen, før vi stiger ud.', 'I try to start the car again before we get out.', 'پیش از پیاده شدن، دوباره سعی می‌کنم خودرو را روشن کنم.',
         ('وقت تلف کردن روی ریل بسیار خطرناک است.', 'Losing time on the rails is very dangerous.', 'At spilde tid på sporet er meget farligt.')),
      rule=2),
    result(1),
    summary([('خودروی خراب را هر چه زودتر بردارید؛ وگرنه چراغ خطر و مثلث خطر.', 'Move a broken-down car as soon as possible; otherwise hazard lights and the warning triangle.', 'Flyt bilen snarest; ellers havariblink og advarselstrekant.'),
             ('مثلث: دست‌کم ۵۰ متر عقب، در بزرگراه ۱۰۰ متر؛ در پیچ، پیش از پیچ.', 'The triangle: at least 50 m behind, 100 m on the motorway; in a bend, before the bend.', 'Trekanten: mindst 50 m bagved, 100 m på motorvej; i et sving før svinget.'),
             ('بزرگراه: شانه‌ی اضطراری، چراغ خطر، همه پشت گاردریل.', 'Motorway: hard shoulder, hazard lights, everyone behind the barrier.', 'Motorvej: nødsporet, havariblink, alle bag autoværnet.'),
             ('روی ریل: همه فوراً بیرون و دور از ریل، بعد ۱۱۲.', 'On the rails: everyone out at once and away from the track, then 112.', 'På sporet: alle straks ud og væk, derefter 112.'),
             ('چراغ قرمز: هر جا بی‌خطر شد بایستید؛ ترکیدن لاستیک: فرمان محکم، بدون ترمز شدید.', 'Red warning light: stop where it is safe; burst tyre: hold the wheel firmly, no hard braking.', 'Rød advarselslampe: stands, hvor det er sikkert; et dæk springer: hold fast i rattet, ingen hård opbremsning.')]),
])

INCIDENTS_TEST = lesson('incidents-test', 'INCIDENTS_TEST', ('آزمون فصل', 'Chapter test', 'Kapiteltest'), 6, [
    intro(('آزمون فصل ۸', 'Chapter 8 test', 'Kapiteltest 8'),
          ('حالا خودروهای امدادی، تصادف، کمک‌های اولیه و خرابی خودرو را با هم مرور می‌کنیم. سؤال‌ها مثل آزمون واقعی‌اند و درس‌ها در هم آمده‌اند؛ هر علامت اشتباه یا جاافتاده یک اشتباه است.',
           'Now we go over emergency vehicles, accidents, first aid and breakdowns together. The questions are like the real test and the lessons are mixed; every wrong or missing tick is one mistake.',
           'Nu gennemgår vi udrykning, uheld, førstehjælp og motorstop samlet. Spørgsmålene er som ved den rigtige prøve, og lektionerne er blandet; hvert forkert eller manglende kryds er én fejl.'),
          [('نشان دهید در موقعیت‌های اضطراری درست رفتار می‌کنید.', 'Show that you act correctly in emergencies.', 'Vise at du handler rigtigt i nødsituationer.'),
           ('پیش از آزمون کامل، نقطه‌های ضعفتان را پیدا کنید.', 'Find your weak points before the full test.', 'Finde dine svage punkter før den fulde prøve.')],
          [('پارچه‌ی سفید جلوی خودرو، ترتیب کمک‌های اولیه و وضعیت ریکاوری.', 'A white cloth on the front of a car, the order of first aid and the recovery position.', 'Hvid dug foran på en bil, førstehjælpens rækkefølge og aflåst sideleje.'),
           ('تصادف کوچک، مثلث خطر در بزرگراه و تقاطع راه‌آهن.', 'A small collision, the triangle on the motorway and level crossings.', 'Et mindre uheld, trekanten på motorvej og jernbaneoverkørsler.')]),
    q('exam-em-cloth',
      'Bag dig kommer en almindelig bil med en hvid dug foran. Hvad betyder det?',
      'An ordinary car with a white cloth on its front is coming up behind you. What does it mean?',
      'پشت شما خودرویی معمولی می‌آید که جلویش پارچه‌ی سفیدی بسته شده است. یعنی چه؟',
      st(True, 'Den kører med en alvorligt syg eller tilskadekommen, og jeg skal give den plads som for en udrykning.', 'It is carrying a seriously ill or injured person, and I must make way for it as for an emergency vehicle.', 'بیمار یا مجروح بدحالی را می‌برد و باید مثل خودروی امدادی به آن راه بدهم.', ('خودرو با پارچه‌ی سفید در این رانندگی مثل خودروی امدادی است.', 'On such a drive, a car with a white cloth counts as an emergency vehicle.', 'Under sådan kørsel er en bil med hvid dug ligestillet med et udrykningskøretøj.')),
      st(False, 'Bilen er til salg.', 'The car is for sale.', 'خودرو فروشی است.', ('پارچه‌ی سفید جلوی خودرو نشانه‌ی رانندگی اضطراری است.', 'A white cloth on the front of a car is the sign of an emergency drive.', 'En hvid dug foran på en bil er tegn på en hastetur med syge eller tilskadekomne.'))),
    q('acc-scene',
      'Hvad gør du først, når du kommer til et færdselsuheld?',
      'What do you do first when you come upon a traffic accident?',
      'وقتی به تصادفی می‌رسید، اول چه می‌کنید؟',
      st(True, 'Jeg sikrer ulykkesstedet, så der ikke sker mere.', 'I make the scene safe so that nothing more happens.', 'محل را ایمن می‌کنم تا حادثه‌ی دیگری پیش نیاید.', ('اصل اول کمک‌های اولیه: جلوی ادامه‌ی حادثه را بگیرید.', 'First aid\'s first point: stop the accident.', 'Førstehjælpens første punkt: stands ulykken.')),
      st(False, 'Jeg giver almindelig førstehjælp, før jeg gør andet.', 'I give general first aid before I do anything else.', 'پیش از هر کاری کمک‌های معمولی می‌دهم.', ('کمک‌های معمولی اصل چهارم است.', 'General first aid is the fourth point.', 'Almindelig førstehjælp er fjerde punkt.'))),
    q('acc-minor',
      'Du har været impliceret i et mindre uheld uden personskade. Hvad skal du?',
      'You have been involved in a minor accident with no one hurt. What must you do?',
      'در تصادف کوچکی بدون آسیب جانی دخیل بوده‌اید. چه باید بکنید؟',
      st(True, 'Standse og opgive navn og adresse til den anden part.', 'Stop and give my name and address to the other party.', 'بایستم و نام و نشانی‌ام را به طرف دیگر بدهم.', ('همه‌ی دخیل‌ها باید بایستند و نام و نشانی بدهند.', 'Everyone involved must stop and give their name and address.', 'Alle impliceret skal standse og opgive navn og adresse.')),
      st(False, 'Køre videre, fordi ingen kom til skade.', 'Drive on because nobody was hurt.', 'ادامه بدهم، چون کسی آسیب ندیده است.', ('توقف همیشه لازم است، حتی بدون آسیب جانی.', 'Stopping is always required, even with no one hurt.', 'Du skal altid standse, også uden personskade.'))),
    q('bd-motorway',
      'Hvor langt bag bilen skal advarselstrekanten stå på motorvejen?',
      'How far behind the car must the warning triangle stand on the motorway?',
      'در بزرگراه، مثلث خطر چقدر پشت خودرو باید باشد؟',
      st(True, 'Mindst 100 m.', 'At least 100 m.', 'دست‌کم ۱۰۰ متر.', ('در بزرگراه سرعت زیاد است و هشدار باید زودتر دیده شود.', 'On the motorway speeds are high, and the warning must be seen earlier.', 'På motorvejen er farten høj, og advarslen skal ses tidligere.')),
      st(False, 'Mindst 20 m.', 'At least 20 m.', 'دست‌کم ۲۰ متر.', ('۲۰ متر حتی برای جاده‌ی معمولی هم کم است.', '20 m is too little even on an ordinary road.', '20 m er for lidt selv på almindelig vej.'))),
    q('bd-rail',
      'Hvornår må du køre ud på en jernbaneoverkørsel?',
      'When may you drive onto a level crossing?',
      'کِی می‌توانید وارد تقاطع راه‌آهن شوید؟',
      st(True, 'Kun når der er plads til bilen på den anden side.', 'Only when there is room for the car on the other side.', 'فقط وقتی آن طرف برای خودرو جا هست.', ('روی ریل نباید بایستید.', 'You must not stop on the rails.', 'Du må ikke holde på sporet.')),
      st(False, 'Når bommene er på vej ned, hvis jeg skynder mig.', 'When the barriers are coming down, if I hurry.', 'وقتی راه‌بندها پایین می‌آیند، اگر عجله کنم.', ('قرمز چشمک‌زن و راه‌بند یعنی بایستید.', 'Flashing red and barriers mean stop.', 'Rødt blink og bomme betyder stop.'))),
    q('acc-recovery',
      'Hvornår lægger du en tilskadekommen i aflåst sideleje?',
      'When do you put an injured person in the recovery position?',
      'کِی آسیب‌دیده را در وضعیت ریکاوری می‌خوابانید؟',
      st(True, 'Når personen er bevidstløs, men trækker vejret normalt.', 'When the person is unconscious but breathing normally.', 'وقتی بیهوش است ولی عادی نفس می‌کشد.', ('وضعیت ریکاوری راه هوایی آدم بیهوش را باز نگه می‌دارد.', 'The recovery position keeps an unconscious person\'s airway open.', 'Aflåst sideleje holder en bevidstløs persons luftveje frie.')),
      st(False, 'Når personen ikke trækker vejret.', 'When the person is not breathing.', 'وقتی نفس نمی‌کشد.', ('بدون تنفس، ۱۱۲ و احیای قلبی لازم است.', 'Without breathing, 112 and CPR are needed.', 'Uden vejrtrækning skal du ringe 112 og give hjerte-lunge-redning.'))),
    result(2),
    summary([('چراغ آبی و آژیر، یا پارچه‌ی سفید جلوی خودرو: به موقع راه باز کنید.', 'Blue lights and siren, or a white cloth on the front of a car: make way in good time.', 'Blåt blink og sirene eller hvid dug foran: hold vejen fri i god tid.'),
             ('در تصادف: اول محل را ایمن کنید؛ همیشه بایستید و نام و نشانی بدهید.', 'At an accident: first make the place safe; always stop and give your name and address.', 'Ved uheld: sikr først stedet; stands altid, og opgiv navn og adresse.'),
             ('مثلث در بزرگراه دست‌کم ۱۰۰ متر؛ روی ریل فقط وقتی آن طرف جا هست.', 'The triangle on the motorway at least 100 m; onto the rails only when there is room beyond.', 'Trekanten på motorvej mindst 100 m; ud på sporet kun, når der er plads på den anden side.'),
             ('وضعیت ریکاوری برای بیهوشی که نفس می‌کشد.', 'The recovery position for an unconscious person who is breathing.', 'Aflåst sideleje til en bevidstløs, der trækker vejret.')],
            ('law', 'firstaid', 'plan')),
])

CHAPTER = 'incidents'
LESSONS = [EMERGENCY, ACCIDENT, BREAKDOWN, INCIDENTS_TEST]
