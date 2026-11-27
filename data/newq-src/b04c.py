# «آزمون جدید», batch 4 (5301–5400), part c: straight on (7.12), left turns (7.14), right turns (7.13), meeting (7.7),
# approaching junctions (7.11), lane changes (7.4).
# Rules: Færdselsloven §§ 7 stk. 2, 16 stk. 1 and 4, 18 stk. 2, 20 stk. 1, 26 stk. 3–7 (ubetinget vigepligt out of a car park
# or a pedestrian street, the right-hand rule, turning across a cycle path), 29 stk. 1 nr. 3, 41 stk. 2, 49 stk. 3 (a
# cyclist going straight on may wait at the line between a right-turn lane and the next lane); Bekendtgørelse om
# vejafmærkning (A 19 «Lyssignal», A 99 with UA 99 «Uheldskryds», B 18, E 15 «Vognbaner ved kryds», E 16,2 «Vognbaneforløb
# med vognbaneskift»: the one changing lanes makes sure it is safe, E 49/E 50, Q 44; § 65 red, yellow and green, § 66 an
# arrow signal is for those going the arrow's way).
from nq import Q, S, above, town, view

Q(5351, "7.12", town("""
THE SCENE: we are at the end of a pedestrian street, paved all over, where it meets an ordinary street running left to right in front
of us. On the right at the end stands the Danish sign for the end of a pedestrian street (E 50) in its official design. The crossing
street has a pavement and a cycle path on both sides; a cyclist approaches on the near cycle path from the left, and a car comes along
the street from the right.
MUST BE CLEARLY VISIBLE: the end of the pedestrian street, the crossing street, the cyclist from the left, the car from the right.
MUST NOT APPEAR: shop names, other text."""),
  "Du har afleveret varer i gågaden og vil køre ud af den og ligeud over vejen for enden. Hvad gælder?",
  "You have delivered goods in the pedestrian street and want to drive out of it and straight across the road at its end. What applies?",
  "در خیابان پیاده کالا تحویل داده‌اید و می‌خواهید از آن خارج شوید و مستقیم از عرض جاده‌ی انتهای آن رد شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg har ubetinget vigepligt over for trafikken på vejen.", "I must give way to the traffic on the road.",
    "باید بی‌قیدوشرط به ترافیک جاده راه بدهم.",
    "Kørende har ubetinget vigepligt ved udkørsel fra en gågade.", "Drivers must give way when they drive out of a pedestrian street.",
    "رانندگان هنگام خروج از خیابان پیاده باید بی‌قیدوشرط راه بدهند."),
  S(True, "Jeg holder også tilbage for cyklisten på cykelstien.", "I also give way to the cyclist on the cycle path.",
    "به دوچرخه‌سوارِ مسیر دوچرخه هم راه می‌دهم.",
    "Vigepligten gælder over for alle kørende på den vej, du kører ud på, også cyklister.",
    "The duty applies to all traffic on the road you drive out onto, cyclists too.",
    "این وظیفه در برابر همه‌ی وسایلِ جاده‌ای است که واردش می‌شوید، دوچرخه‌سواران هم."),
  S(False, "Biler fra venstre skal holde tilbage for mig, fordi jeg kommer fra højre.",
    "Cars from the left must give way to me because I come from the right.",
    "خودروهای سمت چپ باید به من راه بدهند، چون من از راست می‌آیم.",
    "Højre vigepligt hjælper ikke dig, når du kører ud fra en gågade.", "The right-hand rule does not help you when you drive out of a pedestrian street.",
    "قاعده‌ی حق تقدم سمت راست هنگام خروج از خیابان پیاده به نفع شما نیست."),
  S(False, "Jeg har kun vigepligt, hvis der er hajtænder.", "I only have to give way if there are shark teeth.",
    "فقط وقتی باید راه بدهم که دندان‌کوسه باشد.",
    "Vigepligten ved udkørsel fra en gågade gælder også uden afmærkning.",
    "The duty to give way when leaving a pedestrian street applies also without markings.",
    "وظیفه‌ی راه دادن هنگام خروج از خیابان پیاده بدون خط‌کشی هم برقرار است."),
)

Q(5352, "7.12", town("""
THE SCENE: a crossroads in town with traffic lights whose lamps are all dark (switched off by a fault). There are no signs and no
shark teeth on our road or on the others. A car approaches the junction from the road on the right.
MUST BE CLEARLY VISIBLE: the dark traffic lights, the car from the right, the absence of signs and markings.
MUST NOT APPEAR: signs, text."""),
  "Lyssignalerne i krydset er slukket på grund af en fejl. Der er ingen tavler eller hajtænder. En bil kommer fra højre. Hvad gælder?",
  "The traffic lights at the junction are switched off because of a fault. There are no signs or shark teeth. A car is coming from the right. What applies?",
  "چراغ‌های راهنمایی تقاطع به‌خاطر نقص خاموش‌اند. هیچ تابلو یا دندان‌کوسه‌ای نیست. خودرویی از راست می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen fra højre skal have lov at køre først.", "The car from the right must be allowed to go first.", "خودروی سمت راست باید اول برود.",
    "Når signalerne er slukket, og der ikke er anden afmærkning, gælder højre vigepligt.",
    "When the signals are off and there is no other marking, the right-hand rule applies.",
    "وقتی چراغ‌ها خاموش‌اند و علامت دیگری نیست، حق تقدم سمت راست برقرار است."),
  S(False, "Jeg har forkørselsret, fordi jeg kører på den største vej.", "I have priority because I am on the larger road.",
    "چون در جاده‌ی بزرگ‌تر هستم، حق تقدم دارم.",
    "Vejens størrelse giver ikke forkørselsret; det gør kun tavler og afmærkning.", "The size of the road does not give priority; only signs and markings do.",
    "بزرگی جاده حق تقدم نمی‌دهد؛ فقط تابلو و خط‌کشی می‌دهد."),
  S(False, "Den, der kommer først til krydset, må køre først.", "Whoever reaches the junction first may go first.",
    "هر کس اول به تقاطع برسد، اول می‌رود.",
    "Det er højre vigepligt, der gælder, ikke hvem der kom først.", "It is the right-hand rule that applies, not who came first.",
    "قاعده‌ی سمت راست برقرار است، نه این‌که چه کسی اول رسیده."),
  S(False, "Krydset må ikke bruges, før signalerne virker igen.", "The junction must not be used until the signals work again.",
    "تا وقتی چراغ‌ها دوباره کار نکنند، نباید از تقاطع استفاده کرد.",
    "Du må køre gennem krydset efter de almindelige vigepligtsregler.", "You may drive through the junction under the ordinary give-way rules.",
    "می‌توانید طبق قواعد معمول حق تقدم از تقاطع رد شوید."),
)

Q(5353, "7.12", above("""
THE SCENE: a crossroads in a residential area seen from above, one lane in each direction on both roads, no signs, no markings, no
traffic lights.
VEHICLES (colour code used strictly): a RED car (ours) coming up from the bottom to go straight on; a city BUS in a plain colour
(no text) coming from the RIGHT road, also going straight on, both about to reach the junction.
MUST NOT APPEAR: signs, text, arrows."""),
  "Du vil køre ligeud i et kryds uden tavler og afmærkning. Fra højre kommer en bybus, som også skal ligeud. Hvad gælder?",
  "You want to go straight on at a junction without signs or markings. A city bus is coming from the right, also going straight on. What applies?",
  "می‌خواهید در تقاطعی بدون تابلو و خط‌کشی مستقیم بروید. از سمت راست یک اتوبوس شهری می‌آید که آن هم مستقیم می‌رود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder tilbage for bussen.", "I give way to the bus.", "به اتوبوس راه می‌دهم.",
    "Højre vigepligt gælder over for alle køretøjer fra højre, også busser.", "The right-hand rule applies to all vehicles from the right, buses too.",
    "حق تقدم سمت راست برای همه‌ی وسایلی است که از راست می‌آیند، از جمله اتوبوس."),
  S(False, "Bussen skal holde tilbage for mig, fordi den er langsom og stor.", "The bus must give way to me because it is slow and big.",
    "اتوبوس باید به من راه بدهد، چون کُند و بزرگ است.",
    "Et køretøjs fart og størrelse har intet med vigepligten at gøre.", "A vehicle's speed and size have nothing to do with the duty to give way.",
    "سرعت و اندازه‌ی وسیله ربطی به حق تقدم ندارد."),
  S(False, "Busser i rutekørsel skal altid holde tilbage for personbiler i kryds.",
    "Buses on regular routes must always give way to cars at junctions.",
    "اتوبوس‌های خط همیشه باید در تقاطع به خودروهای سواری راه بدهند.",
    "Der er ingen sådan regel; i et kryds uden tavler gælder højre vigepligt for alle.",
    "There is no such rule; at a junction without signs the right-hand rule applies to everyone.",
    "چنین قاعده‌ای نیست؛ در تقاطع بدون تابلو حق تقدم سمت راست برای همه برقرار است."),
)

Q(5354, "7.12", view("""
THE SCENE: a road crossing a railway at a level crossing with half barriers, which are up; the red light signals at the crossing are
dark. Just after the crossing a queue of cars stands still in our lane; the last car stands only a few metres past the tracks.
MUST BE CLEARLY VISIBLE: the level crossing with the raised barriers and dark signals, the queue just after the tracks.
MUST NOT APPEAR: trains, text."""),
  "Du skal ligeud over en jernbaneoverkørsel med bomme. Lige efter overkørslen holder bilerne i kø. Hvordan forholder du dig?",
  "You are going straight on over a level crossing with barriers. Just after the crossing the cars are standing in a queue. What do you do?",
  "باید مستقیم از روی یک تقاطع راه‌آهنِ دارای راهبند رد شوید. درست بعد از آن خودروها در صف ایستاده‌اند. چه می‌کنید؟",
  S(True, "Jeg venter før overkørslen, til der er plads til hele bilen på den anden side.",
    "I wait before the crossing until there is room for the whole car on the other side.",
    "پیش از ریل صبر می‌کنم تا آن طرف برای تمام خودرو جا باشد.",
    "Du må ikke risikere at blive holdende på sporet.", "You must not risk being left standing on the tracks.",
    "نباید این خطر را بپذیرید که روی ریل بمانید."),
  S(True, "Det er forbudt at standse på en jernbaneoverkørsel.", "Stopping on a level crossing is forbidden.", "توقف روی تقاطع راه‌آهن ممنوع است.",
    "Standsning og parkering er forbudt på en jernbaneoverkørsel.", "Stopping and parking are forbidden on a level crossing.",
    "توقف و پارک روی تقاطع راه‌آهن ممنوع است."),
  S(False, "Går bommene ned, mens jeg holder på sporet, bliver jeg stående og venter, til toget er kørt forbi.",
    "If the barriers come down while I am on the tracks, I stay where I am and wait until the train has passed.",
    "اگر وقتی روی ریل هستم راهبندها پایین بیایند، همان‌جا می‌مانم تا قطار رد شود.",
    "Du skal straks væk fra sporet; et tog kan ikke standse i tide.", "You must get off the tracks at once; a train cannot stop in time.",
    "باید فوراً از روی ریل دور شوید؛ قطار نمی‌تواند به‌موقع بایستد."),
  S(True, "Blinker de røde lys, eller er bommene på vej ned, standser jeg før overkørslen.",
    "If the red lights flash or the barriers are coming down, I stop before the crossing.",
    "اگر چراغ‌های قرمز چشمک بزنند یا راهبندها در حال پایین آمدن باشند، پیش از تقاطع می‌ایستم.",
    "Så nærmer der sig et tog, og du må ikke køre ud på overkørslen.", "Then a train is approaching, and you must not drive onto the crossing.",
    "یعنی قطاری نزدیک می‌شود و نباید وارد تقاطع شوید."),
)

Q(5355, "7.12", town("""
THE SCENE: a town street with one lane in each direction. About 25 m ahead on the right the exit of a supermarket car park crosses
the pavement; a grey car is rolling slowly out of it towards the street.
MUST BE CLEARLY VISIBLE: the car-park exit, the grey car rolling out.
MUST NOT APPEAR: signs, shop names, text."""),
  "Du kører ligeud ad gaden. Fra en parkeringsplads til højre er en bil ved at køre ud. Hvad gælder?",
  "You are driving straight along the street. From a car park on the right a car is about to drive out. What applies?",
  "در خیابان مستقیم می‌رانید. از یک پارکینگ در سمت راست خودرویی در حال بیرون آمدن است. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen fra parkeringspladsen har ubetinget vigepligt over for mig.", "The car from the car park must give way to me.",
    "خودرویی که از پارکینگ بیرون می‌آید باید بی‌قیدوشرط به من راه بدهد.",
    "Den, der kører ud fra en parkeringsplads, har ubetinget vigepligt.", "Anyone driving out of a car park must give way.",
    "هر کس از پارکینگ بیرون می‌آید، باید بی‌قیدوشرط راه بدهد."),
  S(True, "Jeg holder øje med bilen og er klar til at bremse, hvis den kører ud foran mig.",
    "I watch the car and am ready to brake if it drives out in front of me.",
    "مراقب آن خودرو هستم و اگر جلویم بیرون بیاید، آماده‌ی ترمزم.",
    "Du skal være forberedt på, at føreren kan overse dig.", "You must be prepared for the driver to overlook you.",
    "باید آماده باشید که راننده شما را نبیند."),
  S(False, "Jeg har vigepligt, fordi bilen kommer fra min højre side.", "I have to give way because the car comes from my right-hand side.",
    "باید راه بدهم، چون آن خودرو از سمت راست من می‌آید.",
    "Højre vigepligt gælder ikke for den, der kører ud fra en parkeringsplads.", "The right-hand rule does not apply to someone driving out of a car park.",
    "قاعده‌ی سمت راست برای کسی که از پارکینگ بیرون می‌آید برقرار نیست."),
  S(False, "Bilen må køre ud, så snart den har givet tegn.", "The car may drive out as soon as it has signalled.",
    "آن خودرو به محض راهنما زدن می‌تواند بیرون بیاید.",
    "Blinklyset giver ikke ret til at køre ud foran andre.", "The indicator gives no right to drive out in front of others.",
    "راهنما حق بیرون آمدن جلوی دیگران را نمی‌دهد."),
)

Q(5356, "7.12", above("""
THE SCENE: a T-junction seen from above with no signs, no markings and no traffic lights; our road runs straight up the picture, and a
side road joins it from the LEFT.
VEHICLES (colour code used strictly): a RED car (ours) coming up our road to go straight on past the junction; a GREY car waiting
at the end of the side road on the left.
MUST NOT APPEAR: signs, text, arrows."""),
  "Du kører ligeud gennem et T-kryds uden tavler og afmærkning. Sidevejen kommer fra venstre, og der holder en bil i den. Hvad gælder?",
  "You are driving straight through a T-junction without signs or markings. The side road joins from the left, and a car is waiting in it. What applies?",
  "از یک سه‌راهی بدون تابلو و خط‌کشی مستقیم می‌گذرید. خیابان فرعی از چپ وصل می‌شود و خودرویی در آن منتظر است. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen i sidevejen skal holde tilbage for mig.", "The car in the side road must give way to me.", "خودروی داخل خیابان فرعی باید به من راه بدهد.",
    "Højre vigepligt gælder også i T-kryds, og for bilen i sidevejen kommer du fra højre.",
    "The right-hand rule also applies at T-junctions, and for the car in the side road you come from the right.",
    "قاعده‌ی سمت راست در سه‌راهی هم برقرار است و برای خودروی خیابان فرعی، شما از راست می‌آیید."),
  S(False, "Jeg skal holde tilbage, fordi bilen allerede holder ved krydset.", "I must give way because the car is already waiting at the junction.",
    "باید راه بدهم، چون آن خودرو زودتر به تقاطع رسیده است.",
    "Det afgørende er, hvem der kommer fra højre, ikke hvem der kom først.", "What decides it is who comes from the right, not who arrived first.",
    "تعیین‌کننده این است که چه کسی از راست می‌آید، نه این‌که چه کسی زودتر رسیده."),
  S(False, "I et T-kryds skal den, der kører ligeud, altid holde tilbage.", "At a T-junction the one going straight on must always give way.",
    "در سه‌راهی کسی که مستقیم می‌رود همیشه باید راه بدهد.",
    "Det er højre vigepligt, der gælder; lå sidevejen til højre, skulle du holde tilbage for bilen i den.",
    "It is the right-hand rule that applies; if the side road were on the right, you would have to give way to the car in it.",
    "قاعده‌ی سمت راست برقرار است؛ اگر خیابان فرعی سمت راست بود، باید به خودروی داخل آن راه می‌دادید."),
)

Q(5357, "7.14", above("""
THE SCENE: a crossroads seen from above, one lane in each direction on both roads, no signs, no markings, no traffic lights.
VEHICLES (colour code used strictly): a RED car (ours) coming up from the bottom, its LEFT indicator flashing, about to turn left;
an oncoming BLUE car coming down from the top, going straight on; a GREY car coming from the RIGHT road, going straight on.
MUST NOT APPEAR: signs, text, arrows."""),
  "Du vil svinge til venstre i et kryds uden tavler og afmærkning. En bil kommer imod dig og skal ligeud, og en anden bil kommer fra højre. Hvad gælder?",
  "You want to turn left at a junction without signs or markings. A car is coming towards you and going straight on, and another car is coming from the right. What applies?",
  "می‌خواهید در تقاطعی بدون تابلو و خط‌کشی به چپ بپیچید. خودرویی از روبه‌رو می‌آید و مستقیم می‌رود و خودروی دیگری از راست می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder tilbage for den modkørende, der skal ligeud.", "I give way to the oncoming car going straight on.",
    "به خودروی روبه‌رو که مستقیم می‌رود راه می‌دهم.",
    "Den, der svinger til venstre, skal holde tilbage for modkørende.", "Anyone turning left must give way to oncoming traffic.",
    "کسی که به چپ می‌پیچد باید به ترافیک روبه‌رو راه بدهد."),
  S(True, "Jeg holder også tilbage for bilen fra højre.", "I also give way to the car from the right.", "به خودروی سمت راست هم راه می‌دهم.",
    "I et kryds uden tavler og afmærkning gælder højre vigepligt.", "At a junction without signs or markings the right-hand rule applies.",
    "در تقاطع بدون تابلو و خط‌کشی حق تقدم سمت راست برقرار است."),
  S(False, "Jeg må svinge først, fordi jeg kom først til krydset.", "I may turn first because I reached the junction first.",
    "چون اول به تقاطع رسیدم، می‌توانم اول بپیچم.",
    "Hvem der kom først, betyder ikke noget for vigepligten.", "Who came first does not matter for the duty to give way.",
    "این‌که چه کسی اول رسیده در حق تقدم اثری ندارد."),
  S(False, "Den modkørende skal holde tilbage for mig, fordi jeg blinker.", "The oncoming car must give way to me because I am signalling.",
    "خودروی روبه‌رو باید به من راه بدهد، چون من راهنما زده‌ام.",
    "Blinklyset viser, hvad du vil, men giver dig ingen ret.", "The indicator shows what you intend to do, but gives you no right.",
    "راهنما نشان می‌دهد چه می‌خواهید بکنید، ولی حقی به شما نمی‌دهد."),
)

Q(5358, "7.14", above("""
THE SCENE: a large junction with traffic lights seen from above. Our road has TWO left-turn lanes, each with a white arrow pointing
left; the road to the left has two lanes in each direction.
VEHICLES (colour code used strictly): a RED car (ours) in the RIGHT one of the two left-turn lanes; a GREY car beside it in the LEFT
left-turn lane; a SOLID GREEN arrow from the red car turning into the right lane of the new road; a DASHED ORANGE arrow from the red
car cutting across into the left lane of the new road.
MUST NOT APPEAR: text."""),
  "Der er to vognbaner til venstresving i krydset, og du holder i den højre af dem. Hvordan svinger du?",
  "There are two left-turn lanes at the junction, and you are in the right one. How do you turn?",
  "در تقاطع دو خط گردش به چپ هست و شما در خط سمت راستیِ آن دو هستید. چطور می‌پیچید؟",
  S(True, "Jeg bliver i min egen bane gennem svinget og ender i den højre vognbane på den nye vej.",
    "I stay in my own lane through the turn and end up in the right lane of the new road.",
    "در طول پیچ در خط خودم می‌مانم و در خط راستِ جاده‌ی جدید قرار می‌گیرم.",
    "Bilen ved siden af svinger samtidig; skifter du bane i svinget, kan I støde sammen.",
    "The car beside you turns at the same time; if you change lanes in the turn, you may collide.",
    "خودروی کناری هم‌زمان می‌پیچد؛ اگر وسط پیچ خط عوض کنید، ممکن است با هم برخورد کنید."),
  S(True, "Jeg holder øje med bilen i vognbanen til venstre for mig.", "I keep an eye on the car in the lane to my left.",
    "مراقب خودروی خط سمت چپم هستم.",
    "Den kan komme for tæt på eller skære svinget.", "It may come too close or cut the turn.", "ممکن است بیش از حد نزدیک شود یا پیچ را میان‌بُر بزند."),
  S(False, "Jeg må skære over i den venstre vognbane i svinget, hvis den er fri.", "I may cut across into the left lane during the turn if it is free.",
    "اگر خط چپ خالی باشد، می‌توانم وسط پیچ به آن بروم.",
    "Et vognbaneskift i krydset kan overraske bilen ved siden af; skift først bane efter krydset, når det kan ske uden fare.",
    "A lane change in the junction can surprise the car beside you; change lanes only after the junction, when it can be done safely.",
    "تغییر خط داخل تقاطع ممکن است خودروی کناری را غافلگیر کند؛ فقط بعد از تقاطع و وقتی بی‌خطر است خط عوض کنید."),
  S(False, "Bilen i den venstre vognbane skal vente, til jeg har svunget.", "The car in the left lane must wait until I have turned.",
    "خودروی خط چپ باید صبر کند تا من بپیچم.",
    "I svinger samtidig, hver i sin egen vognbane.", "You turn at the same time, each in your own lane.", "هم‌زمان می‌پیچید، هر کدام در خط خودش."),
)

Q(5359, "7.14", view("""
THE SCENE: we stand in the middle of a crossroads near the centre line, waiting to turn left (our left indicator lamp glows on the
dashboard strip). Opposite us a large oncoming lorry also waits to turn left, its left indicator flashing; its big body hides the
oncoming lane behind it, so we cannot see whether anything is coming.
MUST BE CLEARLY VISIBLE: the oncoming lorry waiting to turn left, the hidden lane behind it.
MUST NOT APPEAR: signs, text."""),
  "Du vil svinge til venstre. En modkørende lastbil vil også svinge til venstre og holder i krydset. Den skjuler, om der kommer noget bag den. Hvordan forholder du dig?",
  "You want to turn left. An oncoming lorry also wants to turn left and is waiting in the junction. It hides whether anything is coming behind it. What do you do?",
  "می‌خواهید به چپ بپیچید. یک کامیون از روبه‌رو هم می‌خواهد به چپ بپیچد و داخل تقاطع ایستاده است و نمی‌گذارد ببینید پشتش چیزی می‌آید یا نه. چه می‌کنید؟",
  S(True, "Jeg venter, til jeg kan se, at der ikke kommer modkørende ligeud.", "I wait until I can see that no oncoming traffic is going straight on.",
    "صبر می‌کنم تا ببینم ترافیکی از روبه‌رو مستقیم نمی‌آید.",
    "Du skal holde tilbage for modkørende; kan du ikke se dem, ved du ikke, om vejen er fri.",
    "You must give way to oncoming traffic; if you cannot see it, you do not know whether the way is clear.",
    "باید به ترافیک روبه‌رو راه بدهید؛ وقتی آن را نمی‌بینید، نمی‌دانید راه باز است یا نه."),
  S(True, "En motorcykel eller en cyklist kan være skjult bag lastbilen.", "A motorcycle or a cyclist may be hidden behind the lorry.",
    "ممکن است یک موتورسیکلت یا دوچرخه‌سوار پشت کامیون پنهان باشد.",
    "Små trafikanter ses dårligt bag store køretøjer.", "Small road users are hard to see behind large vehicles.",
    "کاربران کوچک راه پشت وسایل بزرگ به‌سختی دیده می‌شوند."),
  S(True, "Jeg kan køre lidt frem, så jeg bedre kan se forbi lastbilen, hvis det kan ske uden fare.",
    "I can move forward a little to see better past the lorry, if it can be done safely.",
    "اگر بی‌خطر باشد، می‌توانم کمی جلو بروم تا کنار کامیون را بهتر ببینم.",
    "En bedre placering kan give dig udsyn, men du svinger først, når du kan se, at der er fri bane.",
    "A better position can give you a view, but you only turn when you can see that the way is clear.",
    "جای بهتر می‌تواند دید بدهد، ولی فقط وقتی می‌پیچید که ببینید راه باز است."),
  S(False, "Når lastbilen holder stille, kan jeg regne med, at der ikke kommer andre.", "When the lorry is standing still, I can assume that no one else is coming.",
    "وقتی کامیون ایستاده، می‌توانم فرض کنم کس دیگری نمی‌آید.",
    "Lastbilen holder for at svinge; der kan sagtens komme trafik ligeud bag den.",
    "The lorry is waiting to turn; traffic may well be coming straight on behind it.",
    "کامیون برای پیچیدن ایستاده؛ ممکن است پشتش ترافیکی مستقیم بیاید."),
)

Q(5360, "7.14", view("""
THE SCENE: a large junction with traffic lights. We stand in a left-turn lane (a white arrow pointing left painted on the lane). The
signal head for our lane has arrow-shaped lamps and shows a RED ARROW pointing left; the signal head for the lanes going straight on,
beside it, shows a full GREEN light, and the cars beside us drive straight on.
MUST BE CLEARLY VISIBLE: the red left arrow for our lane, the green light for straight on.
MUST NOT APPEAR: text."""),
  "Du holder i venstresvingsbanen. Signalet for din vognbane viser en rød pil mod venstre, mens signalet for ligeud viser grønt. Hvad gælder?",
  "You are in the left-turn lane. The signal for your lane shows a red arrow to the left, while the signal for straight on shows green. What applies?",
  "در خط گردش به چپ هستید. چراغِ خط شما یک فلش قرمز رو به چپ نشان می‌دهد، در حالی که چراغِ مستقیم سبز است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder for rødt, til min pil bliver grøn.", "I wait at red until my arrow turns green.", "پشت چراغ قرمز می‌مانم تا فلش من سبز شود.",
    "Et pilsignal gælder for dem, der vil køre i den retning, pilen viser.", "An arrow signal applies to those who want to go the way the arrow shows.",
    "چراغ فلش‌دار برای کسانی است که می‌خواهند در جهت فلش بروند."),
  S(False, "Jeg må svinge, når der ikke kommer modkørende, fordi der er grønt for ligeud.",
    "I may turn when no oncoming traffic is coming, because it is green for straight on.",
    "وقتی ترافیکی از روبه‌رو نمی‌آید، می‌توانم بپیچم، چون چراغ مستقیم سبز است.",
    "Det grønne lys for ligeud gælder ikke for dig, der skal til venstre.", "The green light for straight on does not apply to you turning left.",
    "چراغ سبزِ مستقیم برای شما که به چپ می‌روید نیست."),
  S(False, "Den røde pil betyder, at jeg skal svinge forsigtigt.", "The red arrow means that I must turn carefully.", "فلش قرمز یعنی باید با احتیاط بپیچم.",
    "Rødt betyder stop, også når lyset har form som en pil.", "Red means stop, also when the light is shaped like an arrow.",
    "قرمز یعنی ایست، حتی وقتی چراغ به شکل فلش است."),
)

Q(5361, "7.14", view("""
THE SCENE: a crossroads at night; we wait near the centre line to turn left (our left indicator lamp glows on the dashboard strip).
An oncoming vehicle approaches with only ONE headlight lit, so its size and shape cannot be seen in the dark.
MUST BE CLEARLY VISIBLE: the single headlight of the oncoming vehicle.
MUST NOT APPEAR: signs, text.""", cond="night, dark, dry road, a few street lights"),
  "Det er mørkt, og du vil svinge til venstre. Et køretøj med kun én forlygte kommer imod dig. Hvordan forholder du dig?",
  "It is dark, and you want to turn left. A vehicle with only one headlight is coming towards you. What do you do?",
  "هوا تاریک است و می‌خواهید به چپ بپیچید. وسیله‌ای با فقط یک چراغ جلو از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Det kan være en motorcykel, men også en bil, hvor den ene forlygte ikke virker.",
    "It may be a motorcycle, but also a car with one headlight not working.",
    "ممکن است موتورسیکلت باشد، ولی ممکن است خودرویی باشد که یکی از چراغ‌های جلویش کار نمی‌کند.",
    "I mørke kan du ikke se køretøjets bredde, kun lygten.", "In the dark you cannot see the vehicle's width, only the light.",
    "در تاریکی پهنای وسیله را نمی‌بینید، فقط چراغش را."),
  S(True, "Er jeg i tvivl om dens afstand og fart, venter jeg, til den er kørt forbi.",
    "If I am unsure of its distance and speed, I wait until it has passed.",
    "اگر درباره‌ی فاصله و سرعتش مطمئن نیستم، صبر می‌کنم تا رد شود.",
    "Afstand og fart er svære at bedømme ud fra én lygte i mørke.", "Distance and speed are hard to judge from one light in the dark.",
    "تخمین فاصله و سرعت از روی یک چراغ در تاریکی سخت است."),
  S(False, "Én forlygte betyder altid en motorcykel, så den fylder kun lidt på vejen.",
    "One headlight always means a motorcycle, so it only takes up a little of the road.",
    "یک چراغ جلو همیشه یعنی موتورسیکلت، پس جای کمی از جاده را می‌گیرد.",
    "Det kan lige så godt være en bil med en defekt forlygte.", "It may just as well be a car with a faulty headlight.",
    "ممکن است همان‌قدر خودرویی با چراغ خراب باشد."),
  S(False, "Jeg svinger hurtigt foran den, fordi den er langt væk.", "I turn quickly in front of it because it is far away.",
    "سریع جلویش می‌پیچم، چون دور است.",
    "Du kan ikke vide, hvor langt væk den er, eller hvor hurtigt den kører.", "You cannot know how far away it is or how fast it is going.",
    "نمی‌توانید بدانید چقدر دور است یا با چه سرعتی می‌آید."),
)

Q(5362, "7.14", above("""
THE SCENE: a two-way road seen from above with an UNBROKEN white centre line along its whole length. On the LEFT side of the road a
driveway leads to a house.
VEHICLES (colour code used strictly): a RED car (ours) in our lane, its LEFT indicator flashing, level with the driveway; a DASHED
ORANGE arrow from the red car crossing the unbroken line into the driveway.
MUST NOT APPEAR: signs, text."""),
  "Du vil svinge til venstre ind i en indkørsel. Midt på vejen er der en ubrudt linje. Hvad gælder?",
  "You want to turn left into a driveway. There is an unbroken line in the middle of the road. What applies?",
  "می‌خواهید به چپ وارد یک ورودیِ خانه شوید. وسط جاده یک خط ممتد هست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre over den ubrudte linje for at svinge ind.", "I must not cross the unbroken line to turn in.",
    "نباید برای پیچیدن از روی خط ممتد رد شوم.",
    "En spærrelinje må ikke overskrides; du må finde en anden vej, fx vende et sted, hvor det er tilladt.",
    "A barrier line must not be crossed; you must find another way, for example turn round somewhere it is allowed.",
    "از خط ممتد نباید رد شد؛ باید راه دیگری پیدا کنید، مثلاً جایی که مجاز است دور بزنید."),
  S(False, "Jeg må gerne krydse linjen, når der ikke kommer modkørende.", "I may cross the line when there is no oncoming traffic.",
    "وقتی ترافیکی از روبه‌رو نمی‌آید، می‌توانم از روی خط رد شوم.",
    "Forbuddet gælder, uanset om der kommer nogen.", "The ban applies whether or not anyone is coming.", "این ممنوعیت برقرار است، چه کسی بیاید چه نیاید."),
  S(False, "Den ubrudte linje gælder kun for overhaling, ikke for svingning.", "The unbroken line only applies to overtaking, not to turning.",
    "خط ممتد فقط برای سبقت است، نه برای پیچیدن.",
    "Spærrelinjen må ikke overskrides, heller ikke for at svinge.", "The barrier line must not be crossed, not even to turn.",
    "از خط ممتد نباید رد شد، حتی برای پیچیدن."),
  S(False, "Jeg må krydse linjen, hvis jeg giver tegn i god tid.", "I may cross the line if I signal in good time.",
    "اگر به‌موقع راهنما بزنم، می‌توانم از روی خط رد شوم.",
    "Blinklyset ændrer ikke ved forbuddet.", "The indicator does not change the ban.", "راهنما این ممنوعیت را تغییر نمی‌دهد."),
)

Q(5363, "7.13", above("""
THE SCENE: a crossroads seen from above, one lane in each direction on both roads, no signs, no traffic lights.
VEHICLES (colour code used strictly): a RED car (ours) coming up from the bottom, its RIGHT indicator flashing, about to turn right;
an oncoming BLUE car coming down from the top, its LEFT indicator flashing, about to turn left into the same road on the right; a
SOLID GREEN arrow from the red car turning right; a DASHED ORANGE arrow from the blue car turning into the same road.
MUST NOT APPEAR: signs, text."""),
  "Du vil svinge til højre. En modkørende bil vil svinge til venstre ind på samme vej. Hvad gælder?",
  "You want to turn right. An oncoming car wants to turn left into the same road. What applies?",
  "می‌خواهید به راست بپیچید. خودرویی از روبه‌رو می‌خواهد به چپ وارد همان خیابان شود. چه قاعده‌ای برقرار است؟",
  S(True, "Den modkørende skal holde tilbage for mig.", "The oncoming car must give way to me.", "خودروی روبه‌رو باید به من راه بدهد.",
    "Den, der svinger til venstre, skal holde tilbage for modkørende, også for dem, der svinger til højre.",
    "Anyone turning left must give way to oncoming traffic, including those turning right.",
    "کسی که به چپ می‌پیچد باید به ترافیک روبه‌رو راه بدهد، از جمله به کسانی که به راست می‌پیچند."),
  S(True, "Jeg holder øje med, om den modkørende faktisk venter, før jeg svinger.", "I watch whether the oncoming car actually waits before I turn.",
    "پیش از پیچیدن نگاه می‌کنم که خودروی روبه‌رو واقعاً منتظر می‌ماند یا نه.",
    "Du skal være forberedt på, at andre ikke overholder deres vigepligt.", "You must be prepared for others not to keep their duty to give way.",
    "باید آماده باشید که دیگران وظیفه‌ی راه دادنشان را رعایت نکنند."),
  S(False, "Jeg skal holde tilbage, fordi den modkørende kom først til krydset.", "I must give way because the oncoming car reached the junction first.",
    "باید راه بدهم، چون خودروی روبه‌رو زودتر به تقاطع رسید.",
    "Hvem der kom først, betyder ikke noget; den venstresvingende har vigepligt.", "Who came first does not matter; the one turning left must give way.",
    "این‌که چه کسی اول رسیده مهم نیست؛ کسی که به چپ می‌پیچد باید راه بدهد."),
  S(False, "Vi må begge svinge samtidig ind i samme vognbane.", "We may both turn into the same lane at the same time.",
    "هر دو می‌توانیم هم‌زمان وارد یک خط شویم.",
    "Det kan ikke ske uden fare; den venstresvingende venter.", "That cannot be done safely; the one turning left waits.",
    "این کار بی‌خطر نیست؛ کسی که به چپ می‌پیچد صبر می‌کند."),
)

Q(5364, "7.13", above("""
THE SCENE: a junction in town seen from above; our road comes up from the bottom, and we turn right into a side road. On the corner
there is a cycle path and a pavement, and a cyclist waits at the corner on the cycle path.
VEHICLES (colour code used strictly): a RED car (ours) pulling a long trailer, turning right; a DASHED ORANGE line shows the
trailer's wheels tracking inside the car's path and cutting over the kerb at the corner, close to the cyclist.
MUST NOT APPEAR: signs, text."""),
  "Du kører med en lang trailer og skal svinge til højre i et kryds. Hvad skal du være opmærksom på?",
  "You are pulling a long trailer and have to turn right at a junction. What must you be aware of?",
  "با یک تریلر بلند می‌رانید و باید در تقاطعی به راست بپیچید. به چه چیزی باید توجه کنید؟",
  S(True, "Traileren skærer hjørnet og kører tættere på kantstenen end bilen.", "The trailer cuts the corner and runs closer to the kerb than the car.",
    "تریلر گوشه را میان‌بُر می‌زند و از خودرو به جدول نزدیک‌تر می‌شود.",
    "I et sving følger traileren ikke bilens spor, men kører længere inde i svinget.",
    "In a turn the trailer does not follow the car's track but runs further inside the turn.",
    "در پیچ، تریلر رد خودرو را دنبال نمی‌کند و از داخلِ پیچ می‌گذرد."),
  S(True, "Jeg holder øje med cyklister og gående ved hjørnet, som traileren kan ramme.",
    "I watch out for cyclists and pedestrians at the corner, who could be hit by the trailer.",
    "مراقب دوچرخه‌سواران و عابران کنار گوشه هستم که ممکن است تریلر به آن‌ها بخورد.",
    "Den, der venter ved hjørnet, regner måske ikke med, at traileren kommer så tæt på.",
    "Someone waiting at the corner may not expect the trailer to come so close.",
    "کسی که کنار گوشه منتظر است شاید انتظار نداشته باشد تریلر آن‌قدر نزدیک بیاید."),
  S(True, "Jeg kører lidt længere frem, før jeg drejer, så traileren ikke rammer kantstenen.",
    "I drive a little further forward before I turn, so that the trailer does not hit the kerb.",
    "کمی بیشتر جلو می‌روم و بعد می‌پیچم تا تریلر به جدول نخورد.",
    "Et lidt større sving giver plads til trailerens kortere spor.", "A slightly wider turn leaves room for the trailer's tighter track.",
    "پیچیدنِ کمی بازتر برای مسیر تنگ‌ترِ تریلر جا باز می‌کند."),
  S(False, "Traileren følger nøjagtigt bilens spor gennem svinget.", "The trailer follows exactly the car's track through the turn.",
    "تریلر دقیقاً رد خودرو را در پیچ دنبال می‌کند.",
    "Traileren skærer svinget og kører længere inde end bilen.", "The trailer cuts the turn and runs further inside than the car.",
    "تریلر پیچ را میان‌بُر می‌زند و از داخل‌تر از خودرو می‌گذرد."),
)

Q(5365, "7.13", view("""
THE SCENE: at a junction with traffic lights we stand in a right-turn lane (a white arrow to the right on our lane). On our left,
right on the line between our lane and the lane going straight on, a cyclist waits; the signals show red.
MUST BE CLEARLY VISIBLE: our right-turn lane with its arrow, the cyclist on the line between the lanes, the red signals.
MUST NOT APPEAR: text."""),
  "Du holder i en højresvingsbane ved et lyskryds. Til venstre for dig holder en cyklist på linjen mellem din vognbane og vognbanen ligeud. Cyklisten skal ligeud. Hvad gælder?",
  "You are in a right-turn lane at a junction with traffic lights. To your left a cyclist is waiting on the line between your lane and the lane going straight on. The cyclist is going straight on. What applies?",
  "در خط گردش به راستِ یک تقاطع چراغ‌دار ایستاده‌اید. سمت چپ شما دوچرخه‌سواری روی خطِ بین خط شما و خط مستقیم ایستاده و می‌خواهد مستقیم برود. چه قاعده‌ای برقرار است؟",
  S(True, "Cyklisten må gerne placere sig ved linjen mellem vognbanerne.", "The cyclist may position himself at the line between the lanes.",
    "دوچرخه‌سوار مجاز است روی خطِ بین دو خط بایستد.",
    "Hvor der er afmærket vognbaner til højresving, må en cyklist, der skal ligeud, placere sig ved linjen mellem højresvingsbanen og den nærmeste vognbane.",
    "Where lanes are marked for right turns, a cyclist going straight on may position himself at the line between the right-turn lane and the nearest lane.",
    "جایی که خط ویژه‌ی گردش به راست مشخص شده، دوچرخه‌سواری که مستقیم می‌رود می‌تواند روی خطِ بین خط گردش به راست و خط کناری‌اش بایستد."),
  S(False, "Cyklisten skal holde yderst til højre i højresvingsbanen.", "The cyclist must keep to the far right of the right-turn lane.",
    "دوچرخه‌سوار باید در منتهی‌الیه سمت راستِ خط گردش به راست بایستد.",
    "Reglen giver netop cyklisten lov til at holde ved linjen, så han ikke er i vejen for dem, der svinger til højre.",
    "The rule specifically allows the cyclist to wait at the line, so that he is not in the way of those turning right.",
    "قاعده دقیقاً اجازه می‌دهد دوچرخه‌سوار روی خط بایستد تا سر راه کسانی که به راست می‌پیچند نباشد."),
  S(False, "Cyklisten holder ulovligt og skal flytte sig, før jeg kører.", "The cyclist is waiting illegally and must move before I go.",
    "دوچرخه‌سوار غیرمجاز ایستاده و باید پیش از حرکت من کنار برود.",
    "Placeringen er tilladt.", "The position is allowed.", "این جایگاه مجاز است."),
  S(True, "Når jeg svinger til højre, krydser jeg ikke cyklistens vej, men jeg holder øje med ham.",
    "When I turn right, I do not cross the cyclist's path, but I keep an eye on him.",
    "وقتی به راست می‌پیچم، از مسیر دوچرخه‌سوار عبور نمی‌کنم، ولی مراقبش هستم.",
    "Cyklisten kører ligeud på din venstre side; han kan alligevel slingre eller ændre mening.",
    "The cyclist goes straight on at your left side; he may still wobble or change his mind.",
    "دوچرخه‌سوار در سمت چپ شما مستقیم می‌رود؛ با این حال ممکن است تلوتلو بخورد یا تصمیمش را عوض کند."),
)

Q(5366, "7.13", town("""
THE SCENE: a town street at night; we approach a junction where we will turn right (our right indicator lamp glows on the dashboard
strip). Along the right side runs a cycle path separated by a kerb, lit only weakly by the street lights. In the right door mirror (at
the right edge of the picture) a cyclist without lights and in dark clothes can just be seen on the cycle path behind us.
MUST BE CLEARLY VISIBLE: the cycle path, the dark cyclist without lights in the right door mirror.
MUST NOT APPEAR: signs, text.""", cond="night, dark, dry road, weak street lights"),
  "Det er mørkt, og du vil svinge til højre over en cykelsti. Hvordan forholder du dig?",
  "It is dark, and you want to turn right across a cycle path. What do you do?",
  "هوا تاریک است و می‌خواهید به راست بپیچید و از روی یک مسیر دوچرخه بگذرید. چه می‌کنید؟",
  S(True, "Jeg kigger ekstra grundigt i spejlet og over højre skulder.", "I look extra carefully in the mirror and over my right shoulder.",
    "با دقت بیشتری در آینه و از روی شانه‌ی راستم نگاه می‌کنم.",
    "I mørke er cyklister svære at se, og de kan være i den blinde vinkel.", "In the dark cyclists are hard to see, and they may be in the blind spot.",
    "در تاریکی دوچرخه‌سواران به‌سختی دیده می‌شوند و ممکن است در نقطه‌ی کور باشند."),
  S(True, "Jeg sænker farten, så jeg kan nå at standse for en cyklist, jeg først ser sent.",
    "I slow down so that I can stop in time for a cyclist I only see late.",
    "سرعتم را کم می‌کنم تا برای دوچرخه‌سواری که دیر می‌بینم به‌موقع بایستم.",
    "Du skal svinge uden ulempe for cyklister, der kører ligeud på cykelstien.", "You must turn without inconvenience to cyclists going straight on along the cycle path.",
    "باید طوری بپیچید که برای دوچرخه‌سوارانی که در مسیر دوچرخه مستقیم می‌روند مزاحمتی نباشد."),
  S(False, "En cyklist uden lys har mistet sin ret, så jeg skal ikke holde tilbage for ham.",
    "A cyclist without lights has lost his right, so I do not have to give way to him.",
    "دوچرخه‌سوارِ بدون چراغ حقش را از دست داده، پس لازم نیست به او راه بدهم.",
    "Cyklisten bryder reglerne ved at køre uden lys, men du skal stadig holde tilbage for ham.",
    "The cyclist breaks the rules by riding without lights, but you must still give way to him.",
    "دوچرخه‌سوار با راندن بدون چراغ قانون را زیر پا می‌گذارد، ولی شما همچنان باید به او راه بدهید."),
  S(True, "Der kan komme cyklister uden lys, som er svære at se.", "Cyclists without lights may come, and they are hard to see.",
    "ممکن است دوچرخه‌سوارانی بدون چراغ بیایند که به‌سختی دیده می‌شوند.",
    "Du må regne med, at ikke alle cyklister har lys på.", "You must expect that not all cyclists have their lights on.",
    "باید انتظار داشته باشید همه‌ی دوچرخه‌سواران چراغ روشن نداشته باشند."),
)

Q(5367, "7.7", view("""
THE SCENE: a two-way road narrowing ahead to a single lane over a short stone bridge. Before the narrowing on our right stands a round
sign with a red border and a white field showing a black arrow pointing down on the left and a red arrow pointing up on the right (the
Danish sign: give way to oncoming traffic, B 18). An oncoming car is about to enter the narrow part from the other side.
MUST BE CLEARLY VISIBLE: the round give-way-to-oncoming sign, the narrowing, the oncoming car.
MUST NOT APPEAR: other signs, text."""),
  "Før en smal strækning, hvor kun én bil kan komme frem ad gangen, står denne tavle. En bil kommer imod dig. Hvad gælder?",
  "Before a narrow stretch where only one car can pass at a time stands this sign. A car is coming towards you. What applies?",
  "پیش از یک بخش باریک که هر بار فقط یک خودرو می‌تواند از آن بگذرد، این تابلو هست. خودرویی از روبه‌رو می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal holde tilbage for den modkørende.", "I must give way to the oncoming car.", "باید به خودروی روبه‌رو راه بدهم.",
    "Tavlen betyder, at du har ubetinget vigepligt over for modkørende på den smalle strækning.",
    "The sign means that you must give way to oncoming traffic on the narrow stretch.",
    "این تابلو یعنی در بخش باریک باید بی‌قیدوشرط به ترافیک روبه‌رو راه بدهید."),
  S(False, "Den modkørende bil skal vente på mig.", "The oncoming car must wait for me.", "خودروی روبه‌رو باید منتظر من بماند.",
    "Det er dig, der har vigepligt; den modkørende har en tavle, der giver den forkørselsret.",
    "You are the one who must give way; the oncoming traffic has a sign giving it priority.",
    "این شما هستید که باید راه بدهید؛ طرف مقابل تابلویی دارد که به او حق تقدم می‌دهد."),
  S(False, "Den, der kommer først til den smalle strækning, må køre først.", "Whoever reaches the narrow stretch first may go first.",
    "هر کس اول به بخش باریک برسد، اول می‌رود.",
    "Tavlen afgør, hvem der skal vente, ikke hvem der kom først.", "The sign decides who must wait, not who arrived first.",
    "تابلو تعیین می‌کند چه کسی صبر کند، نه این‌که چه کسی اول رسیده."),
  S(False, "Tavlen betyder, at kørsel er forbudt.", "The sign means that driving is forbidden.", "این تابلو یعنی رانندگی ممنوع است.",
    "Du må køre, når de modkørende er kommet forbi.", "You may go once the oncoming traffic has passed.", "وقتی ترافیک روبه‌رو رد شد، می‌توانید بروید."),
)

Q(5368, "7.7", view("""
THE SCENE: a narrow two-way country road without pavement or path. About 40 m ahead a pedestrian walks at the right edge of the road
in our direction, with his back to us; at the same time an oncoming car approaches in the other lane and will reach the pedestrian at
about the same moment as we would.
MUST BE CLEARLY VISIBLE: the pedestrian at the right edge, the oncoming car.
MUST NOT APPEAR: signs, text."""),
  "En fodgænger går i højre vejkant foran dig, og samtidig kommer en bil imod dig. Vejen er smal. Hvordan forholder du dig?",
  "A pedestrian is walking at the right edge of the road in front of you, and at the same time a car is coming towards you. The road is narrow. What do you do?",
  "عابری جلوی شما در لبه‌ی راست جاده راه می‌رود و هم‌زمان خودرویی از روبه‌رو می‌آید. جاده باریک است. چه می‌کنید؟",
  S(True, "Jeg sænker farten og venter med at køre forbi fodgængeren, til bilen er passeret.",
    "I slow down and wait to pass the pedestrian until the car has gone by.",
    "سرعتم را کم می‌کنم و تا آن خودرو رد نشده از کنار عابر نمی‌گذرم.",
    "Ved møde skal du tage hensyn til dem, der færdes i vejkanten, og der er ikke plads til både fodgængeren og den modkørende.",
    "When meeting, you must take care of those at the edge of the road, and there is not room for both the pedestrian and the oncoming car.",
    "هنگام روبه‌رو شدن باید مراقب کسانی باشید که لبه‌ی جاده حرکت می‌کنند، و جای کافی برای عابر و خودروی روبه‌رو با هم نیست."),
  S(True, "Jeg giver fodgængeren god plads, når jeg kører forbi.", "I give the pedestrian plenty of room when I drive past.",
    "وقتی از کنار عابر می‌گذرم، جای کافی به او می‌دهم.",
    "Du skal holde tilstrækkelig afstand til siden.", "You must keep enough distance to the side.", "باید فاصله‌ی کافی از پهلو داشته باشید."),
  S(False, "Jeg kører forbi fodgængeren med det samme, så jeg er forbi, før bilen kommer.",
    "I drive past the pedestrian at once, so that I am past before the car arrives.",
    "فوراً از کنار عابر می‌گذرم تا پیش از رسیدن آن خودرو رد شده باشم.",
    "Så risikerer I at mødes lige ved fodgængeren.", "Then you risk meeting right next to the pedestrian.",
    "این‌طور ممکن است درست کنار عابر به هم برسید."),
  S(True, "Fodgængeren kan træde ud på vejen, fx for at gå uden om en vandpyt.", "The pedestrian may step out into the road, for example to go round a puddle.",
    "ممکن است عابر وارد جاده شود، مثلاً برای دور زدن یک چاله‌ی آب.",
    "Gående med ryggen til trafikken ser ikke, at du kommer.", "Pedestrians with their backs to the traffic do not see you coming.",
    "عابری که پشتش به ترافیک است آمدن شما را نمی‌بیند."),
)

Q(5369, "7.7", view("""
THE SCENE: a narrow two-way country road between hedges; about 150 m ahead an ambulance comes towards us with its blue lights
flashing; on our right there is a firm, wide grass verge.
MUST BE CLEARLY VISIBLE: the oncoming ambulance with blue lights, the verge on our right.
MUST NOT APPEAR: signs, text."""),
  "På en smal vej kommer en ambulance med blå blink og sirene imod dig. Hvordan forholder du dig?",
  "On a narrow road an ambulance with blue lights and siren is coming towards you. What do you do?",
  "در یک جاده‌ی باریک آمبولانسی با چراغ گردان آبی و آژیر از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg holder helt ind til højre og standser om nødvendigt.", "I pull right over to the right and stop if necessary.",
    "کاملاً به راست کنار می‌کشم و در صورت لزوم می‌ایستم.",
    "Du skal i god tid give fri bane for et udrykningskøretøj og om nødvendigt standse.",
    "You must make way for an emergency vehicle in good time and stop if necessary.",
    "باید به‌موقع راه را برای خودروی امدادی باز کنید و در صورت لزوم بایستید."),
  S(False, "Jeg fortsætter med samme fart, fordi ambulancen ikke skal forbi mig bagfra.",
    "I carry on at the same speed because the ambulance is not coming past me from behind.",
    "با همان سرعت ادامه می‌دهم، چون آمبولانس از پشت سر من نمی‌آید.",
    "Pligten til at give fri bane gælder også over for et modkørende udrykningskøretøj.",
    "The duty to make way also applies to an oncoming emergency vehicle.",
    "وظیفه‌ی باز کردن راه در برابر خودروی امدادیِ روبه‌رو هم برقرار است."),
  S(True, "Jeg vælger et sted at holde ind, hvor ambulancen kan komme uhindret forbi.",
    "I choose a place to pull in where the ambulance can get past unhindered.",
    "جایی را برای کنار کشیدن انتخاب می‌کنم که آمبولانس بتواند بدون مانع رد شود.",
    "På en smal vej skal der være plads nok til, at ambulancen kan passere.", "On a narrow road there must be enough room for the ambulance to pass.",
    "در جاده‌ی باریک باید جای کافی برای عبور آمبولانس باشد."),
  S(False, "Jeg standser midt på vejen, så ambulancen kan se mig.", "I stop in the middle of the road so that the ambulance can see me.",
    "وسط جاده می‌ایستم تا آمبولانس مرا ببیند.",
    "Så spærrer du vejen for ambulancen.", "Then you block the road for the ambulance.", "این‌طور راه آمبولانس را می‌بندید."),
)

Q(5370, "7.7", view("""
THE SCENE: a narrow road without a centre line climbing to a hilltop between grass verges; the road beyond the crest cannot be seen.
MUST BE CLEARLY VISIBLE: the narrow road without a centre line, the crest hiding the road beyond.
MUST NOT APPEAR: vehicles, signs, text."""),
  "Vejen er smal og har ingen midterlinje. Du nærmer dig en bakketop. Hvordan forholder du dig?",
  "The road is narrow and has no centre line. You are approaching a hilltop. What do you do?",
  "جاده باریک است و خط وسط ندارد. به بالای یک تپه نزدیک می‌شوید. چه می‌کنید؟",
  S(True, "Jeg holder godt til højre, fordi der kan komme nogen imod mig over bakketoppen.",
    "I keep well to the right, because someone may come towards me over the hilltop.",
    "کاملاً سمت راست می‌مانم، چون ممکن است کسی از آن طرف تپه به سمتم بیاید.",
    "Ved møde skal du holde til højre, og over bakketoppen kan du ikke se de modkørende.",
    "When meeting you must keep right, and you cannot see oncoming traffic over the hilltop.",
    "هنگام روبه‌رو شدن باید سمت راست بمانید و از آن طرف تپه ترافیک روبه‌رو را نمی‌بینید."),
  S(True, "Jeg sænker farten, så jeg kan standse, hvis der kommer en bil midt på vejen.",
    "I slow down so that I can stop if a car comes in the middle of the road.",
    "سرعتم را کم می‌کنم تا اگر خودرویی وسط جاده آمد، بتوانم بایستم.",
    "Foran en bakketop skal farten være passende lav, og du skal kunne standse på den strækning, du kan se.",
    "Before a hilltop the speed must be suitably low, and you must be able to stop within the distance you can see.",
    "پیش از بالای تپه سرعت باید به اندازه‌ی کافی کم باشد و باید بتوانید در مسافتی که می‌بینید بایستید."),
  S(False, "Jeg kører midt på vejen, så jeg bedre kan se over bakketoppen.", "I drive in the middle of the road so that I can see better over the hilltop.",
    "وسط جاده می‌رانم تا آن طرف تپه را بهتر ببینم.",
    "Midt på vejen kan du støde ind i en modkørende, som du først ser på toppen.",
    "In the middle of the road you may run into an oncoming car that you only see at the top.",
    "وسط جاده ممکن است با خودرویی از روبه‌رو برخورد کنید که فقط بالای تپه آن را می‌بینید."),
)

Q(5371, "7.11", view("""
THE SCENE: a two-way country road approaching a village; on the right verge stands a red-bordered white warning triangle showing a
vertical traffic light with red, yellow and green lamps (the Danish traffic-signal warning sign, A 19). The junction ahead cannot yet
be seen.
MUST BE CLEARLY VISIBLE: the warning sign with the traffic-light symbol.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle. Hvad betyder den?",
  "You pass this sign. What does it mean?",
  "از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Længere fremme er der et sted, hvor trafikken reguleres med lyssignal.", "Further ahead there is a place where the traffic is controlled by light signals.",
    "جلوتر جایی هست که ترافیک با چراغ راهنمایی کنترل می‌شود.",
    "Tavlen advarer om lyssignal, fx ved et kryds, du endnu ikke kan se.", "The sign warns of light signals, for example at a junction you cannot see yet.",
    "این تابلو درباره‌ی چراغ راهنمایی هشدار می‌دهد، مثلاً در تقاطعی که هنوز دیده نمی‌شود."),
  S(False, "Lyssignalet længere fremme er ude af drift.", "The traffic light further ahead is out of order.", "چراغ راهنمایی جلوتر خراب است.",
    "Tavlen siger kun, at der kommer et lyssignal.", "The sign only says that a light signal is coming.", "این تابلو فقط می‌گوید جلوتر چراغ راهنمایی هست."),
  S(False, "Tavlen betyder, at jeg har forkørselsret i krydset.", "The sign means that I have priority at the junction.",
    "این تابلو یعنی در تقاطع حق تقدم دارم.",
    "Det er lyssignalet, der regulerer trafikken; tavlen giver ingen forkørselsret.",
    "It is the light signal that controls the traffic; the sign gives no priority.",
    "چراغ راهنمایی ترافیک را کنترل می‌کند؛ این تابلو حق تقدمی نمی‌دهد."),
  S(False, "Tavlen betyder, at der kommer en rundkørsel.", "The sign means that a roundabout is coming.", "این تابلو یعنی جلوتر میدان هست.",
    "En rundkørsel har sin egen advarselstavle med tre pile i en cirkel.", "A roundabout has its own warning sign with three arrows in a circle.",
    "میدان تابلوی هشدار خودش را دارد که سه فلش در یک دایره است."),
)

Q(5372, "7.11", view("""
THE SCENE: a road with three lanes in our direction approaching a large junction. Beside the road stands a blue rectangular sign
showing three white arrows, one for each lane: the left lane's arrow turns left, the middle lane's goes straight on, and the right
lane's goes straight on and to the right (the Danish sign for lanes before a junction, E 15). We drive in the middle lane.
MUST BE CLEARLY VISIBLE: the blue lane sign with its three arrows, the three lanes.
MUST NOT APPEAR: text."""),
  "Før krydset kører du forbi denne tavle. Du skal til venstre. Hvad gælder?",
  "Before the junction you pass this sign. You are going left. What applies?",
  "پیش از تقاطع از کنار این تابلو می‌گذرید. باید به چپ بروید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal i god tid placere mig i den vognbane, som tavlen viser er til venstresving.",
    "I must move in good time into the lane that the sign shows is for turning left.",
    "باید به‌موقع در خطی قرار بگیرم که تابلو نشان می‌دهد برای گردش به چپ است.",
    "Tavlen viser, hvilke kørselsretninger i krydset de enkelte vognbaner er beregnet til.",
    "The sign shows which directions at the junction each lane is meant for.",
    "این تابلو نشان می‌دهد هر خط برای کدام جهت در تقاطع است."),
  S(False, "Tavlen viser, hvor mange vognbaner der er efter krydset.", "The sign shows how many lanes there are after the junction.",
    "این تابلو نشان می‌دهد بعد از تقاطع چند خط هست.",
    "Den viser, hvor de enkelte vognbaner fører hen i krydset.", "It shows where each lane leads at the junction.",
    "نشان می‌دهد هر خط در تقاطع به کجا می‌رود."),
  S(False, "Jeg må blive i midterbanen og skifte over i krydset.", "I may stay in the middle lane and move over in the junction.",
    "می‌توانم در خط وسط بمانم و داخل تقاطع خط عوض کنم.",
    "Du skal vælge vognbane før krydset; at skifte i krydset kan være farligt for andre.",
    "You must choose your lane before the junction; changing in the junction can be dangerous to others.",
    "باید پیش از تقاطع خط را انتخاب کنید؛ عوض کردن خط داخل تقاطع برای دیگران خطرناک است."),
  S(False, "Tavlen er et påbud om at køre ligeud.", "The sign is an order to go straight on.", "این تابلو دستور به مستقیم رفتن است.",
    "Den er en oplysningstavle om vognbanerne.", "It is an information sign about the lanes.", "این یک تابلوی اطلاعاتی درباره‌ی خط‌هاست."),
)

Q(5373, "7.11", view("""
THE SCENE: a two-way road approaching a junction; on the right verge stands a red-bordered white warning triangle with a black
exclamation mark (the Danish sign for other danger, A 99), with a white plate under it showing the black word «Uheldskryds».
MUST BE CLEARLY VISIBLE: the warning sign and the plate with the word.
MUST NOT APPEAR: other signs, other text."""),
  "Før krydset kører du forbi denne tavle. Hvad betyder den?",
  "Before the junction you pass this sign. What does it mean?",
  "پیش از تقاطع از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Der sker særligt mange uheld i krydset.", "Particularly many accidents happen at the junction.",
    "در این تقاطع تصادف‌های زیادی رخ می‌دهد.",
    "Undertavlen angiver, at krydset er særligt belastet af uheld.", "The plate shows that the junction has a particularly high number of accidents.",
    "زیرتابلو نشان می‌دهد این تقاطع به‌طور ویژه پرتصادف است."),
  S(True, "Jeg sænker farten og er ekstra opmærksom i krydset.", "I slow down and pay extra attention at the junction.",
    "سرعتم را کم می‌کنم و در تقاطع بیشتر حواسم را جمع می‌کنم.",
    "En advarselstavle betyder, at du skal være særligt agtpågivende.", "A warning sign means that you must take particular care.",
    "تابلوی هشدار یعنی باید احتیاط ویژه کنید."),
  S(False, "Tavlen betyder, at krydset er lukket.", "The sign means that the junction is closed.", "این تابلو یعنی تقاطع بسته است.",
    "Det er en advarsel, ikke et forbud.", "It is a warning, not a ban.", "این هشدار است، نه ممنوعیت."),
  S(False, "Tavlen betyder, at jeg har ubetinget vigepligt i krydset.", "The sign means that I must give way at the junction.",
    "این تابلو یعنی در تقاطع باید بی‌قیدوشرط راه بدهم.",
    "Tavlen siger intet om vigepligt; den har sin egen tavle og afmærkning.", "The sign says nothing about giving way; that has its own sign and markings.",
    "این تابلو چیزی درباره‌ی حق تقدم نمی‌گوید؛ حق تقدم تابلو و خط‌کشی خودش را دارد."),
)

Q(5374, "7.4", view("""
THE SCENE: a road with two lanes in our direction; we drive in the right lane. On the right verge stands a blue rectangular sign
showing two white lanes: the right one ends, and a broken line shows that its traffic has to change over into the left lane (the
Danish lane sign for a lane change, E 16,2). Further ahead the right lane ends, with white arrows on the road bending to the left.
MUST BE CLEARLY VISIBLE: the blue lane-change sign, the right lane ending ahead with its arrows.
MUST NOT APPEAR: text."""),
  "Du kører i højre vognbane og passerer denne tavle. Din vognbane ophører længere fremme. Hvad gælder?",
  "You are driving in the right lane and pass this sign. Your lane ends further ahead. What applies?",
  "در خط راست می‌رانید و از کنار این تابلو می‌گذرید. خط شما جلوتر تمام می‌شود. چه قاعده‌ای برقرار است؟",
  S(True, "Det er mig, der skal sikre mig, at vognbaneskiftet kan ske uden fare.", "It is I who must make sure that the lane change can be made safely.",
    "این من هستم که باید مطمئن شوم تغییر خط بی‌خطر انجام می‌شود.",
    "Tavlen viser et vognbaneskift, og den, der skifter vognbane, skal sikre sig, at det kan ske uden fare.",
    "The sign shows a lane change, and the one changing lanes must make sure that it can be done safely.",
    "این تابلو تغییر خط را نشان می‌دهد و کسی که خط عوض می‌کند باید مطمئن شود بی‌خطر است."),
  S(True, "Jeg ser i spejlet og over skulderen og giver tegn, før jeg skifter.", "I look in the mirror and over my shoulder and signal before I change.",
    "پیش از تغییر خط در آینه و از روی شانه نگاه می‌کنم و راهنما می‌زنم.",
    "Du skal give tegn i god tid og sikre dig, at vognbanen ved siden af er fri.",
    "You must signal in good time and make sure that the lane beside you is clear.",
    "باید به‌موقع راهنما بزنید و مطمئن شوید خط کناری خالی است."),
  S(False, "Bilerne i venstre vognbane skal lade mig komme ind efter tur, som ved sammenfletning.",
    "The cars in the left lane must let me in in turn, as when two lanes merge.",
    "خودروهای خط چپ باید به نوبت اجازه دهند وارد شوم، مثل وقتی دو خط ادغام می‌شوند.",
    "Her er det et vognbaneskift, ikke en sammenfletning; du skal finde et sikkert hul.",
    "Here it is a lane change, not a merge; you must find a safe gap.",
    "اینجا تغییر خط است، نه ادغام؛ باید یک فاصله‌ی امن پیدا کنید."),
  S(False, "Jeg kører helt frem til enden af vognbanen og presser mig ind.", "I drive right up to the end of the lane and push my way in.",
    "تا انتهای خط می‌روم و به‌زور وارد می‌شوم.",
    "Du skal skifte, når det kan ske uden fare, ikke presse dig ind.", "You must change when it can be done safely, not force your way in.",
    "باید وقتی بی‌خطر است خط عوض کنید، نه این‌که به‌زور وارد شوید."),
)

Q(5375, "7.4", view("""
THE SCENE: a motorway with two lanes in our direction; we drive in the right lane behind a slow lorry. In the left door mirror (at the
left edge of the picture) a car can be seen far behind in the left lane, approaching fast.
MUST BE CLEARLY VISIBLE: the slow lorry ahead, the fast car in the left door mirror.
MUST NOT APPEAR: signs, text."""),
  "Du vil skifte til venstre vognbane på motorvejen for at overhale. I spejlet ser du en bil langt tilbage i venstre vognbane, men den kommer meget hurtigt. Hvordan forholder du dig?",
  "You want to change to the left lane on the motorway to overtake. In the mirror you see a car far back in the left lane, but it is coming very fast. What do you do?",
  "در آزادراه می‌خواهید برای سبقت به خط چپ بروید. در آینه خودرویی را می‌بینید که در خط چپ خیلی عقب است، ولی خیلی سریع می‌آید. چه می‌کنید؟",
  S(True, "Jeg venter med at skifte vognbane, til bilen er kørt forbi.", "I wait to change lanes until the car has gone past.", "تا آن خودرو رد نشده، خط عوض نمی‌کنم.",
    "Vognbaneskift må kun ske, når det kan ske uden fare eller ulempe for andre.",
    "A lane change may only be made when it can be done without danger or inconvenience to others.",
    "تغییر خط فقط وقتی مجاز است که برای دیگران خطر یا مزاحمتی نداشته باشد."),
  S(True, "Jeg vurderer bilens fart, ikke kun hvor langt væk den er.", "I judge the car's speed, not only how far away it is.",
    "سرعت آن خودرو را می‌سنجم، نه فقط فاصله‌اش را.",
    "En bil, der kommer hurtigt, er hurtigt fremme, selv om den ser ud til at være langt væk.",
    "A car coming fast arrives quickly, even if it looks far away.",
    "خودرویی که سریع می‌آید زود می‌رسد، حتی اگر دور به نظر برسد."),
  S(False, "Bilen er langt væk, så jeg skifter vognbane med det samme og lader den bremse.",
    "The car is far away, so I change lanes at once and let it brake.",
    "آن خودرو دور است، پس فوراً خط عوض می‌کنم و می‌گذارم ترمز کند.",
    "Du må ikke tvinge andre til at bremse, når du skifter vognbane.", "You must not force others to brake when you change lanes.",
    "هنگام تغییر خط نباید دیگران را مجبور به ترمز کنید."),
  S(True, "Jeg giver tegn i god tid og kigger over skulderen, før jeg skifter.", "I signal in good time and look over my shoulder before I change.",
    "به‌موقع راهنما می‌زنم و پیش از تغییر خط از روی شانه نگاه می‌کنم.",
    "På motorvejen skal du give tegn før vognbaneskift, og spejlet viser ikke den blinde vinkel.",
    "On the motorway you must signal before changing lanes, and the mirror does not show the blind spot.",
    "در آزادراه باید پیش از تغییر خط راهنما بزنید و آینه نقطه‌ی کور را نشان نمی‌دهد."),
)
