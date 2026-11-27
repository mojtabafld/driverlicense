# «آزمون جدید», batch 5 (5401–5500), part a: stopping and parking (7.18), overtaking (7.9), warning signs (6.1), people
# beside the road (7.6), speed (7.3), the car (1.2).
# Rules: Færdselsloven §§ 2 nr. 18 (any leaving of a vehicle, with or without the driver, is parking; stops under 3 minutes and
# for people or goods getting on or off are not), 3 stk. 2, 21 stk. 3–4, 22, 25, 28 stk. 2 (left side on less busy roads,
# lengthwise at the edge), 28 stk. 5, 29 stk. 3 nr. 2 and nr. 4 (no parking beside a vehicle at the edge, except beside a
# two-wheeled bicycle, moped or motorcycle without sidecar), 32 stk. 1, 41 stk. 1–2, 67 stk. 3; Bekendtgørelse om
# vejafmærkning (A 23 «Ridende», A 31 «Glat vej», A 33 «Løse sten», A 46 steep descent, A 92 «Havnekaj», T 33 no parking
# outside the bays in a car park, Q 44, plates limiting a sign to some vehicles).
from nq import Q, S, above, picture, town, view

Q(5401, "7.18", town("""
THE SCENE: a town street with one lane in each direction. Along the right kerb a row of parked cars with one gap, in which a
motorcycle is parked close to the kerb; the space beside the motorcycle, between it and the rest of the carriageway, is free.
MUST BE CLEARLY VISIBLE: the motorcycle parked at the kerb, the free space beside it.
MUST NOT APPEAR: signs, text, people."""),
  "Ved kantstenen holder en motorcykel parkeret. Du overvejer at parkere ved siden af den, mellem motorcyklen og resten af kørebanen. Hvad gælder?",
  "A motorcycle is parked at the kerb. You are thinking of parking beside it, between the motorcycle and the rest of the carriageway. What applies?",
  "یک موتورسیکلت کنار جدول پارک شده است. به این فکر می‌کنید که کنار آن، بین موتورسیکلت و بقیه‌ی سواره‌رو، پارک کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Det er tilladt at parkere ved siden af en tohjulet motorcykel, der holder ved kantstenen.",
    "It is allowed to park beside a two-wheeled motorcycle standing at the kerb.",
    "پارک کردن کنار موتورسیکلت دوچرخ‌ای که کنار جدول ایستاده مجاز است.",
    "Forbuddet mod at parkere ved siden af et køretøj ved kørebanens kant gælder ikke ved siden af tohjulede cykler, knallerter og motorcykler uden sidevogn.",
    "The ban on parking beside a vehicle at the edge of the carriageway does not apply beside two-wheeled bicycles, mopeds and motorcycles without a sidecar.",
    "ممنوعیت پارک کنار وسیله‌ای که لبه‌ی سواره‌رو ایستاده، کنار دوچرخه، موتور گازی و موتورسیکلتِ دوچرخِ بدون سایدکار برقرار نیست."),
  S(False, "Jeg må også parkere ved siden af en personbil, der holder ved kantstenen.", "I may also park beside a car standing at the kerb.",
    "کنار خودروی سواری‌ای که کنار جدول ایستاده هم می‌توانم پارک کنم.",
    "Det er forbudt at parkere ved siden af et køretøj ved kørebanens kant, når det ikke er tohjulet.",
    "It is forbidden to park beside a vehicle at the edge of the carriageway when it is not two-wheeled.",
    "پارک کنار وسیله‌ای که لبه‌ی سواره‌رو ایستاده، وقتی دوچرخ نباشد، ممنوع است."),
  S(True, "Bilen skal stadig holde, så den ikke er til fare eller unødig ulempe for andre.",
    "The car must still stand so that it is no danger or undue inconvenience to others.",
    "خودرو همچنان باید طوری بایستد که برای دیگران خطر یا مزاحمتی نداشته باشد.",
    "Også hvor parkering er tilladt, skal du tage hensyn til den øvrige færdsel.", "Even where parking is allowed, you must take the other traffic into account.",
    "حتی جایی که پارک مجاز است، باید ملاحظه‌ی بقیه‌ی ترافیک را بکنید."),
  S(False, "Havde motorcyklen haft sidevogn, måtte jeg også parkere ved siden af den.", "If the motorcycle had a sidecar, I could also park beside it.",
    "اگر موتورسیکلت سایدکار داشت، باز هم می‌توانستم کنارش پارک کنم.",
    "Undtagelsen gælder kun motorcykler uden sidevogn.", "The exception only covers motorcycles without a sidecar.",
    "این استثنا فقط شامل موتورسیکلت بدون سایدکار است."),
)

Q(5402, "7.18", town("""
THE SCENE: a town street with one lane in each direction. At the kerb stands a round sign with a blue field, a red border and one red
diagonal bar (the Danish no-parking sign). A car stands at the kerb outside a furniture shop with its boot open; a man carries a large
flat box from the shop towards the car.
MUST BE CLEARLY VISIBLE: the no-parking sign, the car with the open boot, the man carrying the box.
MUST NOT APPEAR: shop names, other text."""),
  "På gaden er der parkeringsforbud. Du skal hente en tung kasse i en butik og læsse den ind i bilen. Det tager omkring 10 minutter. Hvad gælder?",
  "There is a parking ban in the street. You have to collect a heavy box from a shop and load it into the car. It takes about 10 minutes. What applies?",
  "در این خیابان پارک ممنوع است. باید یک جعبه‌ی سنگین را از مغازه‌ای بیاورید و در خودرو بار بزنید. حدود ۱۰ دقیقه طول می‌کشد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må godt holde der, mens jeg læsser kassen ind.", "I may stand there while I load the box in.", "تا وقتی جعبه را بار می‌زنم، می‌توانم آنجا بایستم.",
    "Standsning for af- eller pålæsning af gods regnes ikke som parkering.", "Stopping to load or unload goods does not count as parking.",
    "توقف برای بار زدن یا تخلیه‌ی کالا پارک حساب نمی‌شود."),
  S(True, "Jeg holder, så jeg ikke er til fare eller unødig ulempe for andre.", "I stand so that I am no danger or undue inconvenience to others.",
    "طوری می‌ایستم که برای دیگران خطر یا مزاحمتی نداشته باشم.",
    "Af- og pålæsning skal ske, så der ikke opstår fare eller unødig ulempe.", "Loading and unloading must be done without danger or undue inconvenience.",
    "بار زدن و تخلیه باید طوری انجام شود که خطر یا مزاحمتی پیش نیاید."),
  S(False, "Jeg må højst holde der i 3 minutter.", "I may stand there for 3 minutes at most.", "حداکثر ۳ دقیقه می‌توانم آنجا بایستم.",
    "De 3 minutter gælder almindelig standsning; af- og pålæsning af gods er ikke parkering, selv om det tager længere tid.",
    "The 3 minutes apply to ordinary stopping; loading or unloading goods is not parking, even if it takes longer.",
    "۳ دقیقه مربوط به توقف معمولی است؛ بار زدن یا تخلیه‌ی کالا پارک نیست، حتی اگر بیشتر طول بکشد."),
  S(True, "Når kassen er læsset, kører jeg videre og parkerer et andet sted, hvis jeg skal blive.",
    "When the box is loaded, I drive on and park somewhere else if I am staying.",
    "وقتی جعبه بار شد، حرکت می‌کنم و اگر بخواهم بمانم، جای دیگری پارک می‌کنم.",
    "Holder bilen der længere end nødvendigt for læsningen, er det parkering, og det er forbudt her.",
    "If the car stays there longer than the loading needs, it is parking, and that is forbidden here.",
    "اگر خودرو بیش از مدت لازم برای بار زدن آنجا بماند، پارک حساب می‌شود و اینجا ممنوع است."),
)

Q(5403, "7.18", town("""
THE SCENE: a car park with bays marked by white lines, seen from the driver's seat; every bay is taken. At the end of one row there is
an unmarked stretch of asphalt, outside the bays, where a car could fit.
MUST BE CLEARLY VISIBLE: the full bays, the unmarked stretch at the end of the row.
MUST NOT APPEAR: signs, text, people."""),
  "Alle båse på parkeringspladsen er optaget. For enden af en række er der et stykke asfalt uden bås, hvor bilen kan være. Hvad gælder?",
  "All the bays in the car park are taken. At the end of a row there is a stretch of asphalt without a bay where the car would fit. What applies?",
  "همه‌ی جاهای پارکینگ پر است. انتهای یک ردیف تکه‌ای آسفالت بدون خط‌کشی هست که خودرو در آن جا می‌شود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke parkere uden for de afmærkede båse.", "I must not park outside the marked bays.", "نباید بیرون از جاهای خط‌کشی‌شده پارک کنم.",
    "På en parkeringsplads med afmærkede båse må der ikke parkeres uden for båsene.", "In a car park with marked bays, parking outside the bays is not allowed.",
    "در پارکینگی که جاهایش خط‌کشی شده، پارک بیرون از این جاها مجاز نیست."),
  S(False, "Jeg må parkere der, når jeg ikke spærrer for andre.", "I may park there when I do not block anyone.",
    "اگر راه کسی را نبندم، می‌توانم آنجا پارک کنم.",
    "Parkering uden for båsene er ikke tilladt, uanset om du spærrer.", "Parking outside the bays is not allowed, whether or not you block anyone.",
    "پارک بیرون از جاها مجاز نیست، چه راه کسی را ببندید چه نه."),
  S(False, "Jeg må parkere der, hvis jeg kun er væk en times tid.", "I may park there if I am only away for an hour or so.",
    "اگر فقط حدود یک ساعت دور باشم، می‌توانم آنجا پارک کنم.",
    "Tiden ændrer ikke på, at der ikke må parkeres uden for båsene.", "The time does not change the fact that you must not park outside the bays.",
    "مدت زمان این را تغییر نمی‌دهد که بیرون از جاها نباید پارک کرد."),
)

Q(5404, "7.18", town("""
THE SCENE: a quiet residential street with very little traffic, one lane in each direction and no centre line. On the LEFT side, at the
kerb in front of a house, there is a free space; there are no signs.
MUST BE CLEARLY VISIBLE: the quiet street, the free space at the left kerb.
MUST NOT APPEAR: signs, text."""),
  "Du vil parkere på en villavej med meget lidt trafik. Den ledige plads er i venstre side af vejen. Hvad gælder?",
  "You want to park in a residential street with very little traffic. The free space is on the left side of the road. What applies?",
  "می‌خواهید در یک خیابان مسکونی با ترافیک خیلی کم پارک کنید. جای خالی در سمت چپ خیابان است. چه قاعده‌ای برقرار است؟",
  S(True, "På en mindre befærdet vej må jeg godt parkere i venstre side.", "On a road with little traffic I may park on the left side.",
    "در خیابانی با ترافیک کم می‌توانم در سمت چپ پارک کنم.",
    "På mindre befærdet vej og vej med ensrettet færdsel kan standsning og parkering ske i venstre side.",
    "On roads with little traffic and on one-way roads, stopping and parking may take place on the left side.",
    "در خیابان کم‌تردد و خیابان یک‌طرفه، توقف و پارک در سمت چپ مجاز است."),
  S(True, "Bilen skal holde på langs ved kørebanens kant.", "The car must stand lengthwise at the edge of the carriageway.",
    "خودرو باید در امتداد لبه‌ی سواره‌رو بایستد.",
    "Ved standsning og parkering skal køretøjet anbringes i vejens længderetning ved kørebanens yderkant.",
    "When stopping or parking, the vehicle must be placed lengthwise along the road at the outer edge of the carriageway.",
    "هنگام توقف و پارک، خودرو باید در امتداد جاده و کنار لبه‌ی بیرونی سواره‌رو قرار بگیرد."),
  S(False, "Jeg må aldrig parkere i venstre side af en vej med trafik i begge retninger.",
    "I may never park on the left side of a road with traffic in both directions.",
    "هیچ‌وقت نباید در سمت چپ خیابانی که ترافیک دوطرفه دارد پارک کنم.",
    "På mindre befærdede veje er det tilladt.", "On roads with little traffic it is allowed.", "در خیابان‌های کم‌تردد مجاز است."),
  S(False, "Jeg må parkere på tværs, fordi vejen er bred.", "I may park crosswise because the road is wide.", "چون خیابان پهن است، می‌توانم عمود بر آن پارک کنم.",
    "Bilen skal holde på langs ad kørebanens kant, medmindre andet er afmærket.", "The car must stand lengthwise along the edge, unless marked otherwise.",
    "خودرو باید در امتداد لبه بایستد، مگر این‌که خط‌کشی چیز دیگری نشان دهد."),
)

Q(5405, "7.18", town("""
THE SCENE: a residential street with one lane in each direction. At the right kerb there is a free stretch directly in front of a
house's driveway, where the kerb is lowered and leads to a garage; there are no signs.
MUST BE CLEARLY VISIBLE: the driveway with the lowered kerb, the free stretch in front of it.
MUST NOT APPEAR: signs, text."""),
  "Du vil sætte en passager af. Den eneste ledige plads ved kantstenen er lige ud for en indkørsel til et hus. Hvad gælder?",
  "You want to let a passenger out. The only free space at the kerb is directly in front of a driveway to a house. What applies?",
  "می‌خواهید مسافری را پیاده کنید. تنها جای خالی کنار جدول درست جلوی ورودی ماشین‌روی یک خانه است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må godt standse kort og lade passageren stige ud.", "I may stop briefly and let the passenger out.",
    "می‌توانم کوتاه بایستم و مسافر را پیاده کنم.",
    "Det er parkering ud for en indkørsel, der er forbudt; en standsning for af- og påstigning er ikke parkering.",
    "It is parking in front of a driveway that is forbidden; a stop to let people in or out is not parking.",
    "آنچه جلوی ورودی ممنوع است پارک است؛ توقف برای سوار و پیاده کردن پارک حساب نمی‌شود."),
  S(False, "Det er forbudt også at standse et øjeblik ud for en indkørsel.", "It is forbidden even to stop for a moment in front of a driveway.",
    "حتی یک لحظه توقف جلوی ورودی هم ممنوع است.",
    "Forbuddet ud for ind- og udkørsler gælder parkering, ikke standsning for af- og påstigning.",
    "The ban in front of driveways covers parking, not stopping to let people in or out.",
    "ممنوعیتِ جلوی ورودی‌ها مربوط به پارک است، نه توقف برای سوار و پیاده کردن."),
  S(True, "Jeg holder kun, mens passageren stiger ud, og kører så videre.", "I only stand there while the passenger gets out, then drive on.",
    "فقط تا وقتی مسافر پیاده می‌شود می‌ایستم و بعد حرکت می‌کنم.",
    "Bliver du holdende, er det parkering, og det er forbudt ud for en indkørsel.", "If you stay, it is parking, and that is forbidden in front of a driveway.",
    "اگر بمانید، پارک حساب می‌شود و جلوی ورودی ممنوع است."),
  S(False, "Jeg må parkere der, hvis jeg bliver siddende i bilen.", "I may park there if I stay sitting in the car.",
    "اگر داخل خودرو بنشینم، می‌توانم آنجا پارک کنم.",
    "Parkering er enhver hensætning af et køretøj, med eller uden fører.", "Parking is any leaving of a vehicle, with or without the driver.",
    "پارک یعنی هر بار که خودرو را نگه دارید و بگذارید بماند، چه راننده داخلش باشد چه نباشد."),
)

Q(5406, "7.9", town("""
THE SCENE: a town street with one lane in each direction. About 30 m ahead there is a zebra crossing with the Danish crossing sign;
the car in front of us is braking (brake lights lit) just before the crossing. Parked vans along both kerbs hide the pavements near the
crossing.
MUST BE CLEARLY VISIBLE: the braking car just before the crossing, the zebra crossing, the vans hiding the pavements.
MUST NOT APPEAR: pedestrians, other text."""),
  "Bilen foran dig sætter farten ned lige før et fodgængerfelt. Hvad gælder?",
  "The car in front of you slows down just before a pedestrian crossing. What applies?",
  "خودروی جلوی شما درست پیش از گذرگاه عابر پیاده سرعتش را کم می‌کند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre forbi bilen, fordi den kan skjule en gående på feltet.", "I must not pass the car, because it may hide a pedestrian on the crossing.",
    "نباید از کنار آن خودرو رد شوم، چون ممکن است عابری را روی گذرگاه پنهان کند.",
    "Lige før et fodgængerfelt må du ikke overhale eller køre forbi et køretøj, der skjuler feltet.",
    "Just before a pedestrian crossing you must not overtake or pass a vehicle that hides the crossing.",
    "درست پیش از گذرگاه عابر پیاده نباید از وسیله‌ای که گذرگاه را پنهان می‌کند سبقت بگیرید یا از کنارش بگذرید."),
  S(True, "Bilen kan være ved at standse for at lade en gående gå over.", "The car may be stopping to let a pedestrian cross.",
    "ممکن است آن خودرو برای عبور یک عابر در حال ایستادن باشد.",
    "Den forankørende kan have set en gående, som du ikke kan se.", "The driver in front may have seen a pedestrian you cannot see.",
    "راننده‌ی جلویی ممکن است عابری را دیده باشد که شما نمی‌بینید."),
  S(True, "Jeg holder så stor afstand, at jeg kan standse, hvis bilen standser.", "I keep such a distance that I can stop if the car stops.",
    "آن‌قدر فاصله می‌گیرم که اگر آن خودرو ایستاد، بتوانم بایستم.",
    "Du skal kunne standse, hvis den forankørende standser.", "You must be able to stop if the one in front stops.",
    "باید بتوانید اگر وسیله‌ی جلویی ایستاد، بایستید."),
  S(False, "Jeg kører forbi i den modsatte vognbane, når der ikke kommer nogen.", "I pass it in the opposite lane when nothing is coming.",
    "وقتی کسی از روبه‌رو نمی‌آید، از خط مقابل از کنارش رد می‌شوم.",
    "Det er netop forbudt at køre forbi et køretøj, der skjuler fodgængerfeltet.", "That is exactly what is forbidden: passing a vehicle that hides the crossing.",
    "دقیقاً همین ممنوع است: رد شدن از کنار وسیله‌ای که گذرگاه را پنهان می‌کند."),
)

Q(5407, "7.9", view("""
THE SCENE: a two-lane country road with an UNBROKEN white centre line. About 30 m ahead a cyclist rides at the right edge of our lane;
the oncoming lane is free.
MUST BE CLEARLY VISIBLE: the unbroken centre line, the cyclist at the right edge.
MUST NOT APPEAR: signs, text."""),
  "Midt på vejen er der en ubrudt linje. Foran dig kører en cyklist i højre side af vejen. Hvad gælder?",
  "There is an unbroken line in the middle of the road. A cyclist is riding in front of you on the right side of the road. What applies?",
  "وسط جاده یک خط ممتد هست. دوچرخه‌سواری جلوی شما در سمت راست جاده می‌راند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må overhale cyklisten, hvis jeg kan holde god afstand til siden uden at køre over den ubrudte linje.",
    "I may overtake the cyclist if I can keep a good side distance without crossing the unbroken line.",
    "اگر بتوانم بدون رد شدن از خط ممتد فاصله‌ی کافی از پهلو بگیرم، می‌توانم از دوچرخه‌سوار سبقت بگیرم.",
    "Spærrelinjen må ikke overskrides, men overhaling er tilladt, hvis der er plads nok i din egen vognbane.",
    "The barrier line must not be crossed, but overtaking is allowed if there is enough room in your own lane.",
    "از خط ممتد نباید رد شد، ولی اگر در خط خودتان جای کافی باشد، سبقت مجاز است."),
  S(True, "Er der ikke plads nok, venter jeg bag cyklisten.", "If there is not enough room, I wait behind the cyclist.",
    "اگر جای کافی نباشد، پشت دوچرخه‌سوار صبر می‌کنم.",
    "Du skal altid holde tilstrækkelig afstand til siden, når du overhaler.", "You must always keep enough side distance when overtaking.",
    "هنگام سبقت همیشه باید فاصله‌ی کافی از پهلو داشته باشید."),
  S(False, "Jeg må gerne køre over linjen, når det er for at overhale en cyklist.", "I may cross the line when it is to overtake a cyclist.",
    "اگر برای سبقت از دوچرخه‌سوار باشد، می‌توانم از روی خط رد شوم.",
    "Spærrelinjen må ikke overskrides, heller ikke for at overhale en cyklist.", "The barrier line must not be crossed, not even to overtake a cyclist.",
    "از خط ممتد نباید رد شد، حتی برای سبقت از دوچرخه‌سوار."),
  S(False, "Jeg må aldrig overhale en cyklist, hvor der er en ubrudt midterlinje.", "I may never overtake a cyclist where there is an unbroken centre line.",
    "هیچ‌وقت نباید جایی که خط وسط ممتد است از دوچرخه‌سوار سبقت بگیرم.",
    "Det er tilladt, hvis det kan ske med god afstand og uden at overskride linjen.", "It is allowed if it can be done with a good distance and without crossing the line.",
    "اگر با فاصله‌ی کافی و بدون رد شدن از خط انجام شود، مجاز است."),
)

Q(5408, "7.9", view("""
THE SCENE: a two-lane country road with a broken centre line; close ahead of us a tall white van fills most of the view forward, so
the road ahead cannot be seen.
MUST BE CLEARLY VISIBLE: the tall van close ahead hiding the road.
MUST NOT APPEAR: signs, text."""),
  "Du kører bag en høj varevogn og vil overhale, men du kan ikke se forbi den. Hvordan forholder du dig?",
  "You are driving behind a tall van and want to overtake, but you cannot see past it. What do you do?",
  "پشت یک ون بلند می‌رانید و می‌خواهید سبقت بگیرید، ولی نمی‌توانید جلوی آن را ببینید. چه می‌کنید؟",
  S(True, "Jeg holder større afstand, så jeg kan se mere af vejen foran.", "I keep a larger distance so that I can see more of the road ahead.",
    "فاصله‌ام را بیشتر می‌کنم تا بخش بیشتری از جاده‌ی جلو را ببینم.",
    "Jo længere tilbage du ligger, jo mere kan du se forbi varevognen.", "The further back you are, the more you can see past the van.",
    "هرچه عقب‌تر باشید، بیشتر می‌توانید کنار ون را ببینید."),
  S(False, "Jeg lægger mig tæt bag varevognen, så jeg er klar til at trække ud.", "I move up close behind the van so that I am ready to pull out.",
    "نزدیک پشت ون می‌روم تا برای بیرون رفتن آماده باشم.",
    "Tæt på ser du endnu mindre, og du kan ikke nå at reagere, hvis den bremser.", "Close up you see even less, and you cannot react in time if it brakes.",
    "از نزدیک حتی کمتر می‌بینید و اگر ترمز کند نمی‌توانید به‌موقع واکنش نشان دهید."),
  S(False, "Jeg trækker halvt ud i den modsatte vognbane og kører der, til jeg kan se.",
    "I pull half out into the opposite lane and drive there until I can see.",
    "نیمی از خودرو را وارد خط مقابل می‌کنم و همان‌جا می‌رانم تا بتوانم ببینم.",
    "Så kører du i de modkørendes vognbane uden at vide, om den er fri.", "Then you are driving in the oncoming lane without knowing whether it is clear.",
    "این‌طور در خط ترافیک روبه‌رو می‌رانید بدون این‌که بدانید خالی است یا نه."),
  S(False, "Blinker varevognen til højre, kan jeg regne med, at vejen er fri.", "If the van signals right, I can assume that the road is clear.",
    "اگر ون راهنمای راست بزند، می‌توانم فرض کنم جاده خالی است.",
    "Et blinklys viser ikke, at vejen er fri; det skal du selv kunne se.", "An indicator does not show that the road is clear; you must be able to see that yourself.",
    "راهنما نشان نمی‌دهد جاده خالی است؛ خودتان باید این را ببینید."),
)

Q(5409, "7.9", view("""
THE SCENE: a two-lane country road with a broken centre line between fields. About 30 m ahead a slow tractor drives without any
indicator flashing; about 80 m further on a field track goes off to the LEFT.
MUST BE CLEARLY VISIBLE: the tractor, the field track on the left ahead.
MUST NOT APPEAR: signs, text."""),
  "Foran dig kører en traktor uden at blinke. Lidt længere fremme går en markvej til venstre. Hvad gælder?",
  "A tractor is driving in front of you without signalling. A little further ahead a field track goes off to the left. What applies?",
  "جلوی شما تراکتوری بدون راهنما می‌رود. کمی جلوتر یک راه مزرعه به سمت چپ جدا می‌شود. چه قاعده‌ای برقرار است؟",
  S(True, "Traktoren kan svinge til venstre ind på markvejen, så jeg overhaler ikke lige der.",
    "The tractor may turn left into the field track, so I do not overtake just there.",
    "ممکن است تراکتور به چپ وارد راه مزرعه شود، پس درست آنجا سبقت نمی‌گیرم.",
    "Landbrugskøretøjer svinger ofte ind på marker, og blinklyset kan være snavset eller svært at se.",
    "Farm vehicles often turn into fields, and the indicator may be dirty or hard to see.",
    "وسایل کشاورزی اغلب وارد مزرعه می‌شوند و راهنمایشان ممکن است کثیف یا سخت‌دیدنی باشد."),
  S(True, "Jeg holder øje med tegn fra føreren, fx blinklys eller arm.", "I watch for signs from the driver, such as an indicator or an arm.",
    "مراقب علامت‌های راننده، مثل راهنما یا اشاره‌ی دست، هستم.",
    "Så kan du se, hvad traktoren vil, før du overhaler.", "That way you can see what the tractor is going to do before you overtake.",
    "این‌طور پیش از سبقت می‌بینید تراکتور چه می‌خواهد بکند."),
  S(False, "Når traktoren ikke blinker, kan jeg regne med, at den kører ligeud.", "When the tractor is not signalling, I can assume that it is going straight on.",
    "وقتی تراکتور راهنما نزده، می‌توانم فرض کنم مستقیم می‌رود.",
    "Blinklyset kan være glemt, skjult eller snavset.", "The indicator may be forgotten, hidden or dirty.", "ممکن است راهنما فراموش شده، پنهان یا کثیف باشد."),
)

Q(5410, "7.9", above("""
THE SCENE: a motorway seen from above with two lanes in our direction.
VEHICLES (colour code used strictly): a RED car (ours) in the right lane; a long LORRY in the left lane has just passed us, its rear
level with our front bumper, its right indicator flashing; the gap in front of our car is small.
MUST NOT APPEAR: signs, text."""),
  "En lastbil har overhalet dig på motorvejen og vil ind foran dig, men afstanden er lille. Hvordan forholder du dig?",
  "A lorry has overtaken you on the motorway and wants to move in in front of you, but the gap is small. What do you do?",
  "کامیونی در آزادراه از شما سبقت گرفته و می‌خواهد جلوی شما به خط راست بیاید، ولی فاصله کم است. چه می‌کنید؟",
  S(True, "Jeg slipper speederen, så lastbilen hurtigere kan komme ind.", "I ease off the accelerator so that the lorry can get in sooner.",
    "پایم را از روی گاز برمی‌دارم تا کامیون زودتر بتواند وارد شود.",
    "Du gør det lettere og sikrere for den, der overhaler, at komme ind igen.", "You make it easier and safer for the one overtaking to get back in.",
    "این کار برگشتن سبقت‌گیرنده را آسان‌تر و امن‌تر می‌کند."),
  S(True, "Jeg må ikke sætte farten op, mens jeg bliver overhalet.", "I must not speed up while I am being overtaken.",
    "تا وقتی از من سبقت گرفته می‌شود، نباید سرعتم را بالا ببرم.",
    "Når du bliver overhalet, skal du holde til højre og ikke øge farten.", "When you are being overtaken, you must keep right and not increase your speed.",
    "وقتی از شما سبقت گرفته می‌شود، باید سمت راست بمانید و سرعت را زیاد نکنید."),
  S(False, "Jeg sætter farten op, så lastbilen ikke kan komme ind foran mig.", "I speed up so that the lorry cannot get in in front of me.",
    "سرعتم را بالا می‌برم تا کامیون نتواند جلوی من بیاید.",
    "Det er forbudt at øge farten, når man bliver overhalet, og det er farligt.", "Speeding up while being overtaken is forbidden, and it is dangerous.",
    "بالا بردن سرعت هنگام سبقت گرفتن دیگری از شما ممنوع و خطرناک است."),
  S(False, "Jeg blinker med fjernlyset for at vise, at den ikke må komme ind.", "I flash my high beam to show that it must not move in.",
    "با نور بالا چراغ می‌زنم تا نشان دهم نباید وارد شود.",
    "Et lyssignal giver dig ingen ret og kan blænde føreren; giv i stedet lastbilen plads til at komme ind.",
    "A light signal gives you no right and can dazzle the driver; give the lorry room to move in instead.",
    "علامت نوری به شما حقی نمی‌دهد و ممکن است چشم راننده را خیره کند؛ به‌جایش به کامیون جا بدهید تا وارد شود."),
)

Q(5411, "6.1", view("""
THE SCENE: a two-lane country road through fields; on the right verge stands a red-bordered white warning triangle showing a black
horse with a rider (the Danish warning sign for riders, A 23); further ahead a riding school with paddocks can be seen.
MUST BE CLEARLY VISIBLE: the warning sign with the horse and rider.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle. Hvad betyder den, og hvordan forholder du dig?",
  "You pass this sign. What does it mean, and what do you do?",
  "از کنار این تابلو می‌گذرید. معنی‌اش چیست و چه می‌کنید؟",
  S(True, "Der kan være ryttere på eller ved vejen.", "There may be riders on or beside the road.", "ممکن است سوارکارانی روی جاده یا کنار آن باشند.",
    "Tavlen advarer om ridende.", "The sign warns of riders.", "این تابلو درباره‌ی سوارکاران هشدار می‌دهد."),
  S(True, "Jeg sænker farten og kører forbi heste med god afstand.", "I slow down and pass horses at a good distance.",
    "سرعتم را کم می‌کنم و با فاصله‌ی کافی از کنار اسب‌ها رد می‌شوم.",
    "Når du nærmer dig heste på vejen, skal du holde en passende lav hastighed.", "When you approach horses on the road, you must keep a suitably low speed.",
    "وقتی به اسب‌های روی جاده نزدیک می‌شوید، باید سرعت مناسبِ کمی داشته باشید."),
  S(True, "Heste kan blive bange for støj og pludselige bevægelser.", "Horses can be frightened by noise and sudden movements.",
    "اسب‌ها ممکن است از سروصدا و حرکت‌های ناگهانی بترسند.",
    "En bange hest kan springe ud til siden, så du skal køre roligt forbi.", "A frightened horse can jump to the side, so you must pass calmly.",
    "اسبِ ترسیده ممکن است به کنار بپرد، پس باید آرام رد شوید."),
  S(False, "Jeg dytter, så rytterne ved, at jeg kommer.", "I sound the horn so that the riders know I am coming.",
    "بوق می‌زنم تا سوارکاران بدانند دارم می‌آیم.",
    "Hornet kan skræmme hestene; det må kun bruges for at forebygge eller afværge fare.",
    "The horn may frighten the horses; it may only be used to prevent or avert danger.",
    "بوق ممکن است اسب‌ها را بترساند؛ فقط برای پیشگیری یا دفع خطر می‌توان از آن استفاده کرد."),
)

Q(5412, "6.1", view("""
THE SCENE: a two-lane country road on a cold morning, frost on the verges; on the right verge stands a red-bordered white warning
triangle showing a black car with wavy skid marks behind it (the Danish slippery-road warning sign, A 31).
MUST BE CLEARLY VISIBLE: the slippery-road warning sign.
MUST NOT APPEAR: other signs, text.""", cond="cold morning, frost on the verges, low sun"),
  "Du kører forbi denne tavle uden for byen. Hvad betyder den?",
  "You pass this sign outside town. What does it mean?",
  "بیرون شهر از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Der er fare for glat vej længere fremme.", "There is a risk of a slippery road further ahead.", "جلوتر خطر لغزندگی جاده وجود دارد.",
    "Tavlen advarer om glat vej; årsagen kan stå på en undertavle.", "The sign warns of a slippery road; the cause may be shown on a plate under it.",
    "این تابلو درباره‌ی لغزندگی جاده هشدار می‌دهد؛ ممکن است علتش روی زیرتابلو نوشته شود."),
  S(False, "Tavlen betyder, at jeg skal have vinterdæk på.", "The sign means that I must have winter tyres on.", "این تابلو یعنی باید لاستیک زمستانی داشته باشم.",
    "Tavlen er en advarsel om glat føre, ikke et krav om bestemte dæk.", "The sign is a warning of slippery conditions, not a requirement for particular tyres.",
    "این تابلو هشدار لغزندگی است، نه الزام به لاستیک خاص."),
  S(False, "Tavlen advarer om et skarpt sving.", "The sign warns of a sharp bend.", "این تابلو درباره‌ی یک پیچ تند هشدار می‌دهد.",
    "Farlige sving har deres egen advarselstavle.", "Dangerous bends have their own warning sign.", "پیچ‌های خطرناک تابلوی هشدار خودشان را دارند."),
  S(False, "Tavlen gælder kun, når det regner.", "The sign only applies when it rains.", "این تابلو فقط وقتی باران می‌بارد برقرار است.",
    "Vejen kan være glat af mange grunde, fx is, sne, mudder eller olie.", "The road can be slippery for many reasons, for example ice, snow, mud or oil.",
    "جاده ممکن است به دلایل زیادی لغزنده باشد، مثلاً یخ، برف، گل یا روغن."),
)

Q(5413, "6.1", view("""
THE SCENE: a two-lane country road with a newly laid surface of loose chippings; on the right verge stands a red-bordered white warning
triangle showing a car throwing up small stones from its wheels (the Danish warning sign for loose stones, A 33).
MUST BE CLEARLY VISIBLE: the warning sign, the loose chippings on the road.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle. Hvad skal du være opmærksom på?",
  "You pass this sign. What must you be aware of?",
  "از کنار این تابلو می‌گذرید. به چه چیزی باید توجه کنید؟",
  S(True, "Der kan ligge løse sten på vejen, som kan slynges op af hjulene.", "There may be loose stones on the road that can be thrown up by the wheels.",
    "ممکن است روی جاده سنگ‌ریزه‌ی شل باشد که چرخ‌ها آن را به هوا پرتاب کنند.",
    "Tavlen advarer om løse sten, fx efter en ny vejbelægning.", "The sign warns of loose stones, for example after a new road surface has been laid.",
    "این تابلو درباره‌ی سنگ‌ریزه‌ی شل هشدار می‌دهد، مثلاً پس از آسفالت تازه."),
  S(True, "Jeg sætter farten ned og lader afstanden til bilen foran blive større.", "I slow down and let the distance to the car in front grow.",
    "سرعتم را کم می‌کنم و می‌گذارم فاصله‌ام با خودروی جلو بیشتر شود.",
    "Så får du færre sten op mod ruden, og vejgrebet kan være dårligere på de løse sten.",
    "That way fewer stones hit your windscreen, and the grip may be poorer on the loose stones.",
    "این‌طور سنگ کمتری به شیشه می‌خورد و چسبندگی روی سنگ‌ریزه‌ی شل ممکن است کمتر باشد."),
  S(False, "Tavlen advarer om sten, der kan falde ned fra en skrænt.", "The sign warns of stones that may fall from a slope.",
    "این تابلو درباره‌ی سنگ‌هایی هشدار می‌دهد که ممکن است از یک شیب بریزند.",
    "Det er en anden tavle; denne advarer om løse sten på kørebanen.", "That is a different sign; this one warns of loose stones on the carriageway.",
    "آن تابلوی دیگری است؛ این یکی درباره‌ی سنگ‌ریزه‌ی شل روی سواره‌رو هشدار می‌دهد."),
)

Q(5414, "6.1", view("""
THE SCENE: a road beginning a long, steep descent; on the right verge stands a red-bordered white warning triangle showing a slope
going steeply down to the right with «10%» (the Danish steep-descent warning sign, A 46).
MUST BE CLEARLY VISIBLE: the steep-descent sign with 10 %, the road falling away ahead.
MUST NOT APPEAR: other signs, other text."""),
  "Du kører forbi denne tavle. Hvordan forholder du dig?",
  "You pass this sign. What do you do?",
  "از کنار این تابلو می‌گذرید. چه می‌کنید؟",
  S(True, "Vejen falder stejlt, og tallet viser den største hældning.", "The road falls steeply, and the number shows the steepest gradient.",
    "جاده شیب تندی رو به پایین دارد و عدد بیشترین شیب را نشان می‌دهد.",
    "Tavlen advarer om en farlig nedkørsel, og tallet er den største hældning.", "The sign warns of a dangerous descent, and the number is the steepest gradient.",
    "این تابلو درباره‌ی سرازیری خطرناک هشدار می‌دهد و عدد بیشترین شیب است."),
  S(True, "Jeg sætter farten ned før nedkørslen og vælger et lavere gear, så motoren hjælper med at bremse.",
    "I slow down before the descent and choose a lower gear, so that the engine helps to brake.",
    "پیش از سرازیری سرعتم را کم می‌کنم و دنده‌ی سنگین‌تری انتخاب می‌کنم تا موتور در ترمز کمک کند.",
    "Så skal du ikke holde bremsen hele vejen ned.", "Then you do not have to keep the brake on all the way down.",
    "این‌طور لازم نیست تمام مسیر سرازیری ترمز بگیرید."),
  S(True, "På en lang nedkørsel undgår jeg at bremse hele tiden, så bremserne ikke bliver overophedede.",
    "On a long descent I avoid braking all the time, so that the brakes do not overheat.",
    "در سرازیری طولانی از ترمز گرفتنِ دائمی پرهیز می‌کنم تا ترمزها بیش از حد داغ نشوند.",
    "Overophedede bremser virker dårligere.", "Overheated brakes work less well.", "ترمزهای بیش از حد داغ ضعیف‌تر کار می‌کنند."),
  S(False, "Jeg sætter i frigear for at spare brændstof.", "I put the car in neutral to save fuel.", "برای صرفه‌جویی در سوخت دنده را خلاص می‌کنم.",
    "I frigear har du ingen motorbremse, og farten stiger.", "In neutral you have no engine braking, and the speed rises.",
    "در دنده‌ی خلاص ترمز موتور ندارید و سرعت بالا می‌رود."),
)

Q(5415, "6.1", view("""
THE SCENE: a road in a harbour town leading straight towards a quay, with water beyond its edge and a ferry in the distance; on the
right verge stands a red-bordered white warning triangle showing a car falling off the edge of a quay into water (the Danish warning
sign for a quay or ferry berth, A 92).
MUST BE CLEARLY VISIBLE: the warning sign, the quay edge with the water beyond.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle. Hvad betyder den?",
  "You pass this sign. What does it mean?",
  "از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Vejen kan føre ud til en kaj eller et færgeleje, hvor der er vand.", "The road may lead out to a quay or a ferry berth, where there is water.",
    "ممکن است جاده به یک اسکله یا محل پهلوگیری کشتی برسد که آنجا آب است.",
    "Tavlen advarer om færgeleje, kaj eller lignende.", "The sign warns of a ferry berth, a quay or the like.",
    "این تابلو درباره‌ی محل پهلوگیری کشتی، اسکله یا مانند آن هشدار می‌دهد."),
  S(False, "Længere fremme er der en bro, som kan åbnes.", "Further ahead there is a bridge that can be opened.", "جلوتر پلی هست که باز می‌شود.",
    "Det er en anden advarselstavle.", "That is a different warning sign.", "آن تابلوی هشدار دیگری است."),
  S(False, "Vejen er en blind vej.", "The road is a dead end.", "این راه بن‌بست است.",
    "Blind vej har sin egen blå tavle.", "A dead end has its own blue sign.", "بن‌بست تابلوی آبی خودش را دارد."),
  S(False, "Der kan stå vand på vejen ved kraftig regn.", "There may be water on the road in heavy rain.", "ممکن است در باران شدید روی جاده آب جمع شود.",
    "Det er tavlen for en lunke i vejen.", "That is the sign for a dip in the road.", "آن تابلوی گودیِ جاده است."),
)

Q(5416, "7.6", town("""
THE SCENE: a town street with one lane in each direction. A city bus stands at a stop on the opposite side of the street; on our
pavement, about 20 m ahead, a boy with a school bag runs towards the kerb, looking only at the bus.
MUST BE CLEARLY VISIBLE: the bus at the stop on the other side, the boy running towards the kerb on our side.
MUST NOT APPEAR: signs, text."""),
  "En bus holder ved stoppestedet i den modsatte side. På dit fortov løber en dreng hen mod kantstenen for at nå bussen. Hvordan forholder du dig?",
  "A bus is standing at the stop on the opposite side. On your pavement a boy is running towards the kerb to catch the bus. What do you do?",
  "اتوبوسی در ایستگاهِ سمت مقابل ایستاده است. روی پیاده‌روی سمت شما پسری به طرف جدول می‌دود تا به اتوبوس برسد. چه می‌کنید؟",
  S(True, "Jeg tager farten af og gør mig klar til at standse for drengen.", "I ease off and get ready to stop for the boy.",
    "سرعتم را کم می‌کنم و آماده می‌شوم که برای پسر بایستم.",
    "Drengen kan løbe ud på vejen uden at se sig for.", "The boy may run out into the road without looking.",
    "ممکن است پسر بدون نگاه کردن وارد خیابان شود."),
  S(True, "Jeg regner med, at han kan løbe over vejen uden at se efter biler.", "I expect that he may run across the road without looking for cars.",
    "انتظار دارم ممکن است بدون نگاه کردن به خودروها از عرض خیابان بدود.",
    "Børn, der skal nå en bus, har ofte kun øje for bussen.", "Children trying to catch a bus often have eyes only for the bus.",
    "کودکانی که می‌خواهند به اتوبوس برسند اغلب فقط اتوبوس را می‌بینند."),
  S(False, "Drengen skal holde tilbage for mig, så jeg kan køre videre med samme fart.",
    "The boy must give way to me, so I can carry on at the same speed.",
    "پسر باید برای من صبر کند، پس می‌توانم با همان سرعت ادامه دهم.",
    "Du skal vise særligt hensyn over for børn og kunne standse, hvis han løber ud.",
    "You must show particular consideration for children and be able to stop if he runs out.",
    "باید ملاحظه‌ی ویژه‌ای نسبت به کودکان داشته باشید و اگر بیرون دوید بتوانید بایستید."),
  S(False, "Når bussen holder i den modsatte side, behøver jeg ikke sætte farten ned.",
    "When the bus is standing on the opposite side, I do not need to slow down.",
    "وقتی اتوبوس در سمت مقابل ایستاده، لازم نیست سرعتم را کم کنم.",
    "Passagerer på vej til og fra bussen kan gå over vejen foran dig.", "Passengers on their way to and from the bus may cross the road in front of you.",
    "مسافرانی که به اتوبوس می‌روند یا از آن می‌آیند ممکن است از جلوی شما از خیابان رد شوند."),
)

Q(5417, "7.6", view("""
THE SCENE: a two-lane country road; about 60 m ahead a tow truck with flashing amber lights stands at the right edge, partly in our
lane, loading a broken-down car onto its platform; a man in a high-visibility vest stands beside it on the road side.
MUST BE CLEARLY VISIBLE: the tow truck with its amber lights, the man on the road side.
MUST NOT APPEAR: signs, text."""),
  "En autohjælpsbil med gule blink holder delvis i din vognbane og læsser en bil op. En mand står ved siden af den. Hvordan forholder du dig?",
  "A tow truck with flashing amber lights is standing partly in your lane, loading a car. A man is standing beside it. What do you do?",
  "یک خودروی امداد خودرو با چراغ‌های زرد چشمک‌زن تا حدی در خط شما ایستاده و خودرویی را بار می‌زند. مردی کنارش ایستاده است. چه می‌کنید؟",
  S(True, "Jeg sænker farten og kører forbi med god afstand, når der er fri bane.", "I slow down and pass at a good distance when the way is clear.",
    "سرعتم را کم می‌کنم و وقتی راه باز است با فاصله‌ی کافی رد می‌شوم.",
    "Du skal give dem, der arbejder ved vejen, god plads.", "You must give those working at the roadside plenty of room.",
    "باید به کسانی که کنار جاده کار می‌کنند جای کافی بدهید."),
  S(True, "Manden kan træde ud på vejen uden at se mig.", "The man may step out into the road without seeing me.",
    "ممکن است آن مرد بدون دیدن من وارد جاده شود.",
    "Den, der arbejder, har opmærksomheden rettet mod arbejdet.", "Someone who is working has their attention on the work.",
    "کسی که کار می‌کند حواسش به کارش است."),
  S(False, "De gule blink betyder, at jeg skal standse og vente, til bilen er læsset.",
    "The amber lights mean that I must stop and wait until the car has been loaded.",
    "چراغ‌های زرد یعنی باید بایستم و صبر کنم تا خودرو بار شود.",
    "De gule blink advarer om køretøjet; du må køre forbi, når det kan ske uden fare.",
    "The amber lights warn of the vehicle; you may pass when it can be done safely.",
    "چراغ‌های زرد درباره‌ی آن وسیله هشدار می‌دهند؛ وقتی بی‌خطر باشد می‌توانید رد شوید."),
  S(False, "Jeg kører tæt forbi, så jeg ikke kommer over i de modkørendes vognbane.",
    "I drive close past so that I do not move over into the oncoming lane.",
    "از نزدیکش رد می‌شوم تا وارد خط ترافیک روبه‌رو نشوم.",
    "Du skal holde god afstand til siden og vente, hvis der ikke er plads.", "You must keep a good side distance and wait if there is no room.",
    "باید فاصله‌ی کافی از پهلو بگیرید و اگر جا نیست صبر کنید."),
)

Q(5418, "7.6", view("""
THE SCENE: a narrow road without a pavement through a residential area; about 40 m ahead a group of small children in
high-visibility vests walks in a line at the right edge of the road, with two adults.
MUST BE CLEARLY VISIBLE: the line of small children in vests, the two adults.
MUST NOT APPEAR: signs, text."""),
  "En gruppe små børnehavebørn i refleksveste går i vejkanten sammen med to voksne. Hvordan forholder du dig?",
  "A group of small nursery children in reflective vests is walking at the edge of the road with two adults. What do you do?",
  "گروهی از کودکان کوچک مهدکودک با جلیقه‌ی شبرنگ همراه دو بزرگسال کنار جاده راه می‌روند. چه می‌کنید؟",
  S(True, "Jeg sænker farten og kører forbi med god afstand.", "I slow down and pass at a good distance.", "سرعتم را کم می‌کنم و با فاصله‌ی کافی رد می‌شوم.",
    "Der skal vises særligt hensyn over for børn.", "Particular consideration must be shown to children.", "باید نسبت به کودکان ملاحظه‌ی ویژه داشت."),
  S(True, "Et af børnene kan pludselig løbe fra gruppen og ud på vejen.", "One of the children may suddenly run from the group out into the road.",
    "ممکن است یکی از بچه‌ها ناگهان از گروه جدا شود و وارد خیابان شود.",
    "Små børn kan ikke overskue trafikken.", "Small children cannot take in the traffic.", "کودکان کوچک نمی‌توانند ترافیک را درست درک کنند."),
  S(True, "Kan jeg ikke holde god afstand, venter jeg.", "If I cannot keep a good distance, I wait.", "اگر نتوانم فاصله‌ی کافی بگیرم، صبر می‌کنم.",
    "Du må kun køre forbi, når det kan ske uden fare for børnene.", "You may only pass when it can be done without danger to the children.",
    "فقط وقتی می‌توانید رد شوید که برای کودکان خطری نداشته باشد."),
  S(False, "De voksne passer på børnene, så jeg kan køre forbi med normal fart.",
    "The adults are looking after the children, so I can pass at normal speed.",
    "بزرگسالان مراقب کودکان‌اند، پس می‌توانم با سرعت معمول رد شوم.",
    "Du skal selv vise særligt hensyn, også når der er voksne med.", "You must show particular consideration yourself, also when adults are with them.",
    "حتی وقتی بزرگسالان همراهشان هستند، خودتان باید ملاحظه‌ی ویژه داشته باشید."),
)

Q(5419, "7.6", view("""
THE SCENE: a two-lane country road; about 50 m ahead a car stands at the right edge with its hazard lights flashing and a warning
triangle placed some way behind it; on its road side a man crouches by a wheel, changing it.
MUST BE CLEARLY VISIBLE: the car with hazard lights, the warning triangle, the man crouching on the road side.
MUST NOT APPEAR: signs, text."""),
  "En bil holder i vejkanten med havariblinket tændt. En mand sidder på hug i vejsiden og skifter et hjul. Hvordan forholder du dig?",
  "A car is standing at the edge of the road with its hazard lights on. A man is crouching on the road side changing a wheel. What do you do?",
  "خودرویی با چراغ خطرِ روشن کنار جاده ایستاده است. مردی در سمت جاده نشسته و چرخ عوض می‌کند. چه می‌کنید؟",
  S(True, "Jeg sænker farten og kører forbi med meget god afstand.", "I slow down and pass at a very good distance.",
    "سرعتم را کم می‌کنم و با فاصله‌ی خیلی زیاد رد می‌شوم.",
    "Manden er ude på kørebanen og har fokus på hjulet.", "The man is out on the carriageway and focused on the wheel.",
    "آن مرد روی سواره‌روست و حواسش به چرخ است."),
  S(True, "Kommer der en modkørende, venter jeg, til jeg kan give god plads.", "If an oncoming car comes, I wait until I can give plenty of room.",
    "اگر خودرویی از روبه‌رو بیاید، صبر می‌کنم تا بتوانم جای کافی بدهم.",
    "Du skal holde tilstrækkelig afstand til siden.", "You must keep enough distance to the side.", "باید فاصله‌ی کافی از پهلو داشته باشید."),
  S(False, "Advarselstrekanten betyder, at jeg skal standse.", "The warning triangle means that I must stop.", "مثلث خطر یعنی باید بایستم.",
    "Den advarer om, at bilen holder; du må køre forbi, når det kan ske uden fare.", "It warns that the car is standing there; you may pass when it can be done safely.",
    "این مثلث هشدار می‌دهد خودرویی ایستاده است؛ وقتی بی‌خطر باشد می‌توانید رد شوید."),
  S(False, "Han er i vejsiden på egen risiko, så jeg kan køre forbi som normalt.", "He is on the road side at his own risk, so I can pass as normal.",
    "او با مسئولیت خودش در سمت جاده است، پس می‌توانم مثل همیشه رد شوم.",
    "Du skal altid tage hensyn til personer på kørebanen.", "You must always take care of people on the carriageway.",
    "همیشه باید مراقب افرادی باشید که روی سواره‌رو هستند."),
)

Q(5420, "7.3", view("""
THE SCENE: a straight, dry road; the car ahead of us brakes hard at some distance, its brake lights lit.
MUST BE CLEARLY VISIBLE: the braking car ahead with its brake lights.
MUST NOT APPEAR: signs, text."""),
  "Du kører 100 km/t i stedet for 80 km/t. Hvad betyder det for din bremselængde?",
  "You are driving at 100 km/h instead of 80 km/h. What does that mean for your braking distance?",
  "به‌جای ۸۰ با سرعت ۱۰۰ کیلومتر بر ساعت می‌رانید. این برای مسافت ترمز شما چه معنایی دارد؟",
  S(True, "Bremselængden bliver over halvanden gang så lang.", "The braking distance becomes more than one and a half times as long.",
    "مسافت ترمز بیش از یک‌ونیم برابر می‌شود.",
    "Bremselængden vokser med farten i anden potens: (100/80)² er godt 1,5.", "The braking distance grows with the square of the speed: (100/80)² is just over 1.5.",
    "مسافت ترمز با مجذور سرعت زیاد می‌شود: (۱۰۰/۸۰)² کمی بیش از ۱٫۵ است."),
  S(False, "Bremselængden bliver kun lidt længere, fordi bremserne er de samme.", "The braking distance only becomes a little longer, because the brakes are the same.",
    "مسافت ترمز فقط کمی بیشتر می‌شود، چون ترمزها همان‌اند.",
    "Den vokser meget mere end farten.", "It grows much more than the speed does.", "خیلی بیشتر از خود سرعت زیاد می‌شود."),
  S(False, "Ved 100 km/t kører bilen omkring 18 m i sekundet.", "At 100 km/h the car travels about 18 m a second.",
    "با سرعت ۱۰۰ کیلومتر بر ساعت خودرو در هر ثانیه حدود ۱۸ متر می‌رود.",
    "100 km/t er knap 28 m i sekundet.", "100 km/h is almost 28 m a second.", "۱۰۰ کیلومتر بر ساعت نزدیک ۲۸ متر در ثانیه است."),
  S(False, "Reaktionslængden er den samme ved 80 og 100 km/t.", "The reaction distance is the same at 80 and at 100 km/h.",
    "مسافت واکنش در ۸۰ و ۱۰۰ کیلومتر بر ساعت یکی است.",
    "Ved højere fart kører bilen længere i reaktionstiden.", "At a higher speed the car travels further during the reaction time.",
    "در سرعت بیشتر، خودرو در زمان واکنش مسافت بیشتری می‌رود."),
)

Q(5421, "7.3", view("""
THE SCENE: a two-lane country road approaching a sharp bend to the right; tall trees stand close to the outside of the bend.
MUST BE CLEARLY VISIBLE: the sharp bend ahead, the trees on its outside.
MUST NOT APPEAR: signs, text."""),
  "Du nærmer dig et skarpt sving på landevejen. Hvad gælder for farten?",
  "You are approaching a sharp bend on a country road. What applies to the speed?",
  "در جاده‌ی بیرون شهر به یک پیچ تند نزدیک می‌شوید. درباره‌ی سرعت چه قاعده‌ای برقرار است؟",
  S(True, "Jeg sætter farten ned før svinget, ikke inde i det.", "I slow down before the bend, not in it.", "پیش از پیچ سرعتم را کم می‌کنم، نه داخل آن.",
    "Bremser du hårdt inde i svinget, kan bilen skride ud.", "If you brake hard in the bend, the car may skid.",
    "اگر داخل پیچ ترمز شدید بگیرید، ممکن است خودرو منحرف شود."),
  S(True, "Ved dobbelt fart bliver de kræfter, der vil trække bilen ud af svinget, omkring fire gange så store.",
    "At twice the speed, the forces trying to pull the car out of the bend become about four times as large.",
    "با سرعت دو برابر، نیروهایی که می‌خواهند خودرو را از پیچ بیرون بکشند حدوداً چهار برابر می‌شوند.",
    "Kræfterne i svinget vokser med farten i anden potens.", "The forces in the bend grow with the square of the speed.",
    "نیروهای داخل پیچ با مجذور سرعت زیاد می‌شوند."),
  S(False, "Jeg accelererer kraftigt ind i svinget, så bilen ligger bedre.", "I accelerate hard into the bend so that the car holds the road better.",
    "با شتاب زیاد وارد پیچ می‌شوم تا خودرو بهتر روی جاده بماند.",
    "Høj fart ind i svinget øger risikoen for, at bilen skrider ud.", "High speed into the bend increases the risk that the car skids.",
    "سرعت زیاد هنگام ورود به پیچ خطر منحرف شدن خودرو را بیشتر می‌کند."),
  S(False, "Bilens vejgreb er det samme, uanset hvor hurtigt jeg kører i svinget.", "The car's grip is the same however fast I drive in the bend.",
    "چسبندگی خودرو، با هر سرعتی که در پیچ برانم، یکسان است.",
    "Jo højere fart, jo større kræfter skal dækkene klare.", "The higher the speed, the greater the forces the tyres have to handle.",
    "هرچه سرعت بیشتر باشد، لاستیک‌ها باید نیروهای بیشتری را تحمل کنند."),
)

Q(5422, "7.3", view("""
THE SCENE: a two-lane country road outside town; on the right verge a round speed-limit sign with a red ring and the number 60, with
a white plate under it showing a black lorry symbol.
MUST BE CLEARLY VISIBLE: the 60 sign and the plate with the lorry symbol.
MUST NOT APPEAR: other signs, other text."""),
  "Uden for byen står en tavle med 60 km/t, og undertavlen viser en lastbil. Du kører i personbil. Hvad gælder?",
  "Outside town there is a 60 km/h sign, and the plate under it shows a lorry. You are driving a car. What applies?",
  "بیرون شهر تابلوی ۶۰ کیلومتر بر ساعت هست و زیرتابلو یک کامیون نشان می‌دهد. شما با خودروی سواری هستید. چه قاعده‌ای برقرار است؟",
  S(True, "Grænsen på 60 km/t gælder kun lastbiler.", "The 60 km/h limit only applies to lorries.", "حد ۶۰ کیلومتر بر ساعت فقط برای کامیون‌هاست.",
    "Undertavlen begrænser tavlens betydning til de køretøjer, den viser.", "The plate limits the sign's meaning to the vehicles it shows.",
    "زیرتابلو معنای تابلو را به وسایلی که نشان می‌دهد محدود می‌کند."),
  S(True, "Jeg må køre efter den almindelige grænse på 80 km/t, hvis forholdene tillader det.",
    "I may drive at the ordinary 80 km/h limit if the conditions allow it.",
    "اگر شرایط اجازه دهد، می‌توانم طبق حد معمول ۸۰ کیلومتر بر ساعت برانم.",
    "For andre køretøjer gælder de generelle grænser.", "For other vehicles the general limits apply.", "برای وسایل دیگر حدهای عمومی برقرار است."),
  S(True, "Jeg skal stadig tilpasse farten efter forholdene.", "I must still adapt the speed to the conditions.", "همچنان باید سرعتم را با شرایط تطبیق دهم.",
    "Hastigheden skal altid passe til forholdene.", "The speed must always suit the conditions.", "سرعت همیشه باید با شرایط جور باشد."),
  S(False, "Grænsen gælder for alle køretøjer, fordi den står på en tavle.", "The limit applies to all vehicles because it is on a sign.",
    "این حد برای همه‌ی وسایل است، چون روی تابلو آمده.",
    "Undertavlen viser, at den kun gælder lastbiler.", "The plate shows that it only applies to lorries.", "زیرتابلو نشان می‌دهد فقط برای کامیون‌هاست."),
)

Q(5423, "7.3", picture("""
A small family car seen from behind on a country road, sitting low at the rear, packed with luggage up to the roof and with a roof box
on top; several passengers can be seen inside.
MUST BE CLEARLY VISIBLE: the low rear of the car, the luggage up to the roof, the roof box.
MUST NOT APPEAR: text, number-plate characters, brand names."""),
  "Bilen er fuldt lastet med passagerer og bagage. Hvad betyder det for kørslen?",
  "The car is fully loaded with passengers and luggage. What does that mean for the driving?",
  "خودرو پر از مسافر و بار است. این برای رانندگی چه معنایی دارد؟",
  S(True, "Bremselængden bliver længere, så jeg holder større afstand.", "The braking distance becomes longer, so I keep a larger distance.",
    "مسافت ترمز بیشتر می‌شود، پس فاصله‌ی بیشتری می‌گیرم.",
    "En tungere bil skal bremse en større masse ned.", "A heavier car has a greater mass to brake.", "خودروی سنگین‌تر باید جرم بیشتری را متوقف کند."),
  S(True, "Jeg kører lidt langsommere, især i sving.", "I drive a little more slowly, especially in bends.", "کمی آهسته‌تر می‌رانم، به‌ویژه در پیچ‌ها.",
    "Med tung last ændrer bilens køreegenskaber sig.", "With a heavy load the car's handling changes.", "با بار سنگین رفتار خودرو تغییر می‌کند."),
  S(False, "En tung bil ligger bedre på vejen, så jeg kan køre hurtigere i sving.",
    "A heavy car holds the road better, so I can drive faster in bends.",
    "خودروی سنگین بهتر روی جاده می‌ماند، پس می‌توانم در پیچ‌ها سریع‌تر برانم.",
    "Den tunge last gør bilen mere træg og øger kræfterne i svinget.", "The heavy load makes the car slower to respond and increases the forces in the bend.",
    "بار سنگین واکنش خودرو را کندتر و نیروهای داخل پیچ را بیشتر می‌کند."),
  S(False, "Lasten har ingen betydning for, hvor hurtigt jeg kan standse.", "The load makes no difference to how quickly I can stop.",
    "بار تأثیری روی این‌که چقدر سریع می‌توانم بایستم ندارد.",
    "Jo tungere bilen er, jo længere bliver bremselængden.", "The heavier the car, the longer the braking distance.",
    "هرچه خودرو سنگین‌تر باشد، مسافت ترمز بیشتر می‌شود."),
)

Q(5424, "1.2", picture("""
A close-up of a car's steering wheel held by two hands, with small curved arrows showing that the wheel can be turned a little back
and forth before the front wheels react.
MUST BE CLEARLY VISIBLE: the steering wheel, the hands, the small arrows showing the play.
MUST NOT APPEAR: text, numbers, brand names."""),
  "Rattet kan drejes et stykke frem og tilbage, før hjulene reagerer. Hvad gælder?",
  "The steering wheel can be turned some way back and forth before the wheels react. What applies?",
  "فرمان را می‌شود کمی به چپ و راست چرخاند، پیش از این‌که چرخ‌ها واکنش نشان دهند. چه قاعده‌ای برقرار است؟",
  S(True, "Styretøjet skal være i orden, så jeg får bilen efterset hurtigst muligt.", "The steering must be in order, so I have the car checked as soon as possible.",
    "سیستم فرمان باید سالم باشد، پس هرچه زودتر خودرو را برای بررسی می‌برم.",
    "Som fører skal du sikre dig, at styretøjet er i orden.", "As the driver you must make sure that the steering is in order.",
    "شما به‌عنوان راننده باید مطمئن شوید سیستم فرمان سالم است."),
  S(False, "Lidt slør i rattet er normalt og betyder ingenting.", "A little play in the steering wheel is normal and means nothing.",
    "کمی لقی فرمان طبیعی است و اهمیتی ندارد.",
    "Slør i styretøjet gør bilen sværere at styre præcist og kan være tegn på en farlig fejl.",
    "Play in the steering makes the car harder to steer precisely and can be a sign of a dangerous fault.",
    "لقی فرمان هدایت دقیق خودرو را سخت‌تر می‌کند و ممکن است نشانه‌ی عیبی خطرناک باشد."),
  S(False, "Jeg kan bare holde hårdere fast i rattet.", "I can just hold the steering wheel more firmly.", "کافی است فرمان را محکم‌تر بگیرم.",
    "Det fjerner ikke fejlen i styretøjet.", "That does not remove the fault in the steering.", "این کار عیب فرمان را برطرف نمی‌کند."),
  S(False, "Det er kun et problem, når jeg kører på motorvej.", "It is only a problem when I drive on the motorway.", "فقط وقتی در آزادراه می‌رانم مشکل است.",
    "Du skal kunne styre præcist overalt.", "You must be able to steer precisely everywhere.", "همه‌جا باید بتوانید دقیق فرمان بدهید."),
)

Q(5425, "1.2", picture("""
A car's instrument panel with the left indicator lamp lit (a green arrow), with small motion marks showing that it flashes much
faster than normal.
MUST BE CLEARLY VISIBLE: the lit left indicator lamp with the fast-flashing marks.
MUST NOT APPEAR: text, numbers, brand names."""),
  "Når du blinker til venstre, blinker kontrollampen meget hurtigere end normalt. Hvad betyder det som regel?",
  "When you signal left, the indicator lamp on the dashboard flashes much faster than normal. What does that usually mean?",
  "وقتی راهنمای چپ می‌زنید، چراغ نشانگرِ داشبورد خیلی سریع‌تر از معمول چشمک می‌زند. معمولاً این یعنی چه؟",
  S(True, "En pære i blinklyset er gået, og jeg får det repareret.", "A bulb in the indicator has gone, and I have it repaired.",
    "یکی از لامپ‌های راهنما سوخته است و آن را تعمیر می‌کنم.",
    "Hurtig blink er som regel tegn på, at et af blinklysene ikke virker.", "Fast flashing is usually a sign that one of the indicators is not working.",
    "چشمک زدنِ سریع معمولاً نشانه‌ی این است که یکی از راهنماها کار نمی‌کند."),
  S(False, "Det betyder, at havariblinket også er tændt.", "It means that the hazard lights are on as well.", "یعنی چراغ خطر هم روشن است.",
    "Havariblinket tænder i begge sider; hurtig blink i én side tyder på en defekt pære.",
    "The hazard lights flash on both sides; fast flashing on one side points to a faulty bulb.",
    "چراغ خطر هر دو طرف را روشن می‌کند؛ چشمک سریعِ یک طرف نشانه‌ی لامپ معیوب است."),
  S(False, "Det er normalt, når motoren er kold.", "It is normal when the engine is cold.", "وقتی موتور سرد است، طبیعی است.",
    "Blinkets hastighed afhænger ikke af motorens temperatur.", "The flashing speed does not depend on the engine's temperature.",
    "سرعت چشمک زدن به دمای موتور بستگی ندارد."),
)
