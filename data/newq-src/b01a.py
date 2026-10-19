# «آزمون جدید», batch 1 (5001–5100), part a: stopping and parking (7.18), overtaking (7.9), signs and markings (6.1).
# Rules: Færdselsloven §§ 21–23, 25, 26, 28, 29, 41, 42; Bekendtgørelse om vejafmærkning; FDM on the parking disc.
from nq import Q, S, above, picture, town, view

Q(5001, "7.18", town("""
THE SCENE: we drive slowly along a town street, one lane in our direction, parked cars along the right kerb. About 15 m ahead is a
zebra crossing (white stripes across the road) with the blue square pedestrian-crossing sign on a pole beside it. Right before the
crossing, between the last parked car and the stripes, there is one free space at the kerb, about one car long. A pedestrian waits
on the pavement beside the crossing.
MUST BE CLEARLY VISIBLE: the free space right before the crossing, the stripes, the sign, the waiting pedestrian.
MUST NOT APPEAR: no-stopping signs, yellow kerb lines, text."""),
  "Du vil standse og sætte en passager af. Den ledige plads ved kantstenen ligger lige før fodgængerfeltet. Hvad gælder?",
  "You want to stop and let a passenger out. The free space at the kerb is right before the pedestrian crossing. What applies?",
  "می‌خواهید بایستید و مسافری را پیاده کنید. جای خالی کنار جدول درست پیش از گذرگاه عابر پیاده است. چه قاعده‌ای برقرار است؟",
  S(False, "Jeg må gerne standse her, fordi det kun er et kort ophold.", "I may stop here because it is only a short stop.",
    "می‌توانم این‌جا بایستم، چون فقط توقفی کوتاه است.",
    "Standsning er forbudt på fodgængerfeltet og inden for 5 m før det, også et kort ophold.",
    "Stopping is forbidden on the crossing and within 5 m before it, even for a short while.",
    "توقف روی گذرگاه عابر و تا ۵ متر پیش از آن ممنوع است، حتی کوتاه."),
  S(True, "Jeg må ikke standse nærmere end 5 m før fodgængerfeltet.", "I must not stop closer than 5 m before the pedestrian crossing.",
    "نباید نزدیک‌تر از ۵ متر پیش از گذرگاه عابر بایستم.",
    "Færdselsloven § 29 forbyder standsning og parkering på fodgængerfeltet og inden for 5 m før det.",
    "Færdselsloven § 29 forbids stopping and parking on the crossing and within 5 m before it.",
    "ماده‌ی ۲۹ قانون، توقف و پارک روی گذرگاه عابر و تا ۵ متر پیش از آن را ممنوع می‌کند."),
  S(True, "En bil, der holder lige før feltet, kan skjule fodgængere for andre trafikanter.", "A car standing right before the crossing can hide pedestrians from other road users.",
    "خودرویی که درست پیش از گذرگاه ایستاده، می‌تواند عابران را از دید دیگران پنهان کند.",
    "Det er grunden til forbuddet: andre kan ikke se den, der går ud foran den holdende bil.",
    "That is why it is forbidden: others cannot see someone stepping out in front of the standing car.",
    "دلیل این ممنوعیت همین است: دیگران کسی را که از جلوی خودروی ایستاده وارد خیابان می‌شود نمی‌بینند."),
  S(False, "Jeg må standse på selve fodgængerfeltet, hvis jeg tænder havariblinket.", "I may stop on the crossing itself if I switch on the hazard lights.",
    "اگر چراغ خطر را روشن کنم، می‌توانم روی خود گذرگاه بایستم.",
    "Havariblink giver ikke ret til at standse på et fodgængerfelt.",
    "Hazard lights do not give a right to stop on a pedestrian crossing.",
    "چراغ خطر اجازه‌ی توقف روی گذرگاه عابر را نمی‌دهد."),
)

Q(5002, "7.18", town("""
THE SCENE: a town street, one lane in our direction. Between our lane and the pavement on the right runs a cycle path, raised a little
above the road with a kerb, a few cyclists on it further ahead. On the right, past the pavement, a small shop front. The edge of our
lane along the cycle path's kerb is free for some distance.
MUST BE CLEARLY VISIBLE: the raised cycle path with its kerb, the pavement, the shop, the free road edge.
MUST NOT APPEAR: parking signs, no-stopping signs, yellow lines, text."""),
  "Du vil standse et øjeblik for at aflevere en pakke i butikken til højre. Hvor må du holde?",
  "You want to stop for a moment to drop off a parcel at the shop on the right. Where may you stop?",
  "می‌خواهید لحظه‌ای بایستید تا بسته‌ای را به مغازه‌ی سمت راست بدهید. کجا می‌توانید بایستید؟",
  S(False, "På cykelstien, hvis jeg tænder havariblinket.", "On the cycle path, if I switch on the hazard lights.",
    "روی مسیر دوچرخه، اگر چراغ خطر را روشن کنم.",
    "Standsning og parkering er forbudt på cykelstier, også med havariblink.",
    "Stopping and parking are forbidden on cycle paths, hazard lights or not.",
    "توقف و پارک روی مسیر دوچرخه ممنوع است، با چراغ خطر یا بدون آن."),
  S(False, "Halvt oppe på fortovet, så jeg ikke generer trafikken.", "Half up on the pavement, so that I am not in the way of traffic.",
    "نیمی روی پیاده‌رو، تا مزاحم ترافیک نباشم.",
    "Det er forbudt at standse eller parkere på fortovet.",
    "It is forbidden to stop or park on the pavement.",
    "توقف یا پارک روی پیاده‌رو ممنوع است."),
  S(True, "Ved kørebanens yderkant, hvis der ikke gælder andre forbud.", "At the edge of the carriageway, if no other ban applies.",
    "کنار لبه‌ی سواره‌رو، اگر ممنوعیت دیگری نباشد.",
    "Man standser i vejens højre side ved kørebanens yderkant, når det ikke er forbudt eller til fare.",
    "You stop on the right side of the road at the edge of the carriageway, where it is not forbidden or dangerous.",
    "توقف در سمت راست جاده و کنار لبه‌ی سواره‌رو است، جایی که ممنوع یا خطرناک نباشد."),
  S(False, "På kørebanen ved siden af en bil, der holder ved kanten.", "On the carriageway beside a car that is standing at the edge.",
    "روی سواره‌رو، کنار خودرویی که لب جدول ایستاده.",
    "Du skal holde ved kørebanens yderkant; ved siden af en anden bil spærrer du for trafikken.",
    "You must stop at the edge of the carriageway; beside another car you block the traffic.",
    "باید کنار لبه‌ی سواره‌رو بایستید؛ کنار خودروی دیگر راه ترافیک را می‌بندید."),
)

Q(5003, "7.18", town("""
THE SCENE: a town street, one lane in our direction, parked cars along the right kerb. About 20 m ahead a side street joins from the
right (a T-junction). Right before the corner of the side street there is one free space at the kerb; its front end is only about
5 m from the edge of the side street's carriageway.
MUST BE CLEARLY VISIBLE: the side street on the right, the free space close to its corner.
MUST NOT APPEAR: signs, yellow lines, other road users in the junction, text."""),
  "Du vil parkere på den ledige plads lige før sidevejen til højre. Pladsen ligger omkring 5 m fra hjørnet. Hvad gælder?",
  "You want to park in the free space just before the side road on the right. The space is about 5 m from the corner. What applies?",
  "می‌خواهید در جای خالی درست پیش از فرعیِ سمت راست پارک کنید. این جا حدود ۵ متر با گوشه فاصله دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må hverken standse eller parkere nærmere end 10 m fra den tværgående kørebanes nærmeste kant.",
    "I may neither stop nor park closer than 10 m to the nearest edge of the crossing carriageway.",
    "نه می‌توانم بایستم و نه پارک کنم، اگر کمتر از ۱۰ متر با نزدیک‌ترین لبه‌ی سواره‌روی متقاطع فاصله داشته باشم.",
    "Færdselsloven § 29 forbyder standsning og parkering inden for 10 m fra et vejkryds.",
    "Færdselsloven § 29 forbids stopping and parking within 10 m of a junction.",
    "ماده‌ی ۲۹ قانون، توقف و پارک تا ۱۰ متری تقاطع را ممنوع می‌کند."),
  S(False, "Jeg må gerne parkere her, hvis jeg holder helt inde ved kantstenen.", "I may park here if I stand right in at the kerb.",
    "اگر کاملاً کنار جدول بایستم، می‌توانم این‌جا پارک کنم.",
    "Afstanden til krydset er for kort, uanset hvor tæt på kantstenen bilen holder.",
    "The distance to the junction is too short, however close to the kerb the car stands.",
    "فاصله تا تقاطع کم است، هر قدر هم خودرو به جدول نزدیک باشد."),
  S(False, "Reglen om de 10 m gælder kun parkering, ikke en kort standsning.", "The 10 m rule only applies to parking, not to a short stop.",
    "قاعده‌ی ۱۰ متر فقط برای پارک است، نه توقف کوتاه.",
    "Både standsning og parkering er forbudt nærmere end 10 m fra krydset, fordi en holdende bil tager oversigten fra andre.",
    "Both stopping and parking are forbidden closer than 10 m to the junction, because a standing car blocks other people's view.",
    "هم توقف و هم پارک در فاصله‌ی کمتر از ۱۰ متر از تقاطع ممنوع است، چون خودروی ایستاده دید دیگران را می‌گیرد."),
  S(False, "Forbuddet gælder kun i kryds med lyssignal.", "The ban only applies at junctions with traffic lights.",
    "این ممنوعیت فقط در تقاطع‌های چراغ‌دار است.",
    "Forbuddet gælder ved alle vejkryds.",
    "The ban applies at every junction.",
    "این ممنوعیت در همه‌ی تقاطع‌ها برقرار است."),
)

Q(5004, "7.18", town("""
THE SCENE: a town street, one lane in our direction. On the right pavement, close to the kerb, stands a bus stop: a pole with the
Danish bus-stop sign (a yellow sign with a black bus symbol) and a small shelter. No markings on the road at the stop. No bus in
sight. A person waits at the stop and waves to us.
MUST BE CLEARLY VISIBLE: the bus-stop sign at the kerb, the free road edge on both sides of it, the waiting person.
MUST NOT APPEAR: a bus, road markings at the stop, text other than the sign's own design."""),
  "Du vil standse ved stoppestedet for at hente en ven. Der er ingen afmærkning på kørebanen. Hvad gælder?",
  "You want to stop at the bus stop to pick up a friend. There are no markings on the road. What applies?",
  "می‌خواهید کنار ایستگاه اتوبوس بایستید تا دوستی را سوار کنید. روی سواره‌رو خط‌کشی نیست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke standse inden for 12 m på hver side af stoppestedsskiltet.", "I must not stop within 12 m on either side of the bus-stop sign.",
    "نباید تا ۱۲ متر در هر دو طرف تابلوی ایستگاه بایستم.",
    "Uden afmærkning gælder forbuddet mod standsning og parkering 12 m på hver side af skiltet.",
    "Without markings, the ban on stopping and parking covers 12 m on each side of the sign.",
    "بدون خط‌کشی، ممنوعیت توقف و پارک ۱۲ متر در هر طرف تابلو است."),
  S(False, "Jeg må standse, når der ikke er nogen bus i nærheden.", "I may stop when there is no bus nearby.",
    "وقتی اتوبوسی نزدیک نیست، می‌توانم بایستم.",
    "Forbuddet gælder hele tiden, ikke kun når der kommer en bus.",
    "The ban applies all the time, not only when a bus is coming.",
    "این ممنوعیت همیشه هست، نه فقط وقتی اتوبوس می‌آید."),
  S(False, "Forbuddet gælder kun parkering, ikke en kort standsning.", "The ban only covers parking, not a short stop.",
    "این ممنوعیت فقط برای پارک است، نه توقف کوتاه.",
    "Ved stoppestedet er både standsning og parkering forbudt.",
    "At the bus stop both stopping and parking are forbidden.",
    "کنار ایستگاه، هم توقف و هم پارک ممنوع است."),
  S(False, "Jeg må standse, hvis jeg bliver siddende i bilen.", "I may stop if I stay sitting in the car.", "اگر داخل خودرو بمانم، می‌توانم بایستم.",
    "Forbuddet gælder også, selv om føreren bliver i bilen.", "The ban applies even if the driver stays in the car.", "این ممنوعیت حتی اگر راننده در خودرو بماند هم برقرار است."),
)

Q(5005, "7.18", above("""
THE SCENE: a quiet residential one-way street in town, seen from above, one wide lane, all traffic going up the picture; a blue
rectangular one-way sign with a white arrow pointing up stands at the street's start (bottom). Houses with front gardens on both
sides, pavements with kerbs. On the LEFT side there is a free stretch at the kerb.
VEHICLES (colour code used strictly): a RED car (ours) in the middle of the street, a short DASHED ORANGE arrow showing it moving
to the free stretch at the LEFT kerb, ending parallel to the kerb; a few GREY cars parked along both kerbs elsewhere.
MUST NOT APPEAR: oncoming traffic, no-parking signs, text."""),
  "Du kører i en ensrettet gade og vil parkere i venstre side. Hvad gælder?",
  "You are driving in a one-way street and want to park on the left side. What applies?",
  "در یک خیابان یک‌طرفه می‌رانید و می‌خواهید در سمت چپ پارک کنید. چه قاعده‌ای برقرار است؟",
  S(True, "På en vej med ensrettet færdsel må jeg standse og parkere i venstre side.", "On a one-way road I may stop and park on the left side.",
    "در جاده‌ی یک‌طرفه می‌توانم در سمت چپ بایستم و پارک کنم.",
    "Færdselsloven § 28 tillader standsning og parkering i venstre side på ensrettede veje og mindre befærdede veje.",
    "Færdselsloven § 28 allows stopping and parking on the left on one-way roads and roads with little traffic.",
    "ماده‌ی ۲۸ قانون، توقف و پارک در سمت چپ را در جاده‌های یک‌طرفه و کم‌تردد مجاز می‌داند."),
  S(True, "Bilen skal holde i vejens længderetning ved kanten.", "The car must stand lengthwise along the road at the edge.",
    "خودرو باید در امتداد طول جاده و کنار لبه بایستد.",
    "Køretøjer skal holde parallelt med vejen ved kørebanens yderkant.",
    "Vehicles must stand parallel to the road at the edge of the carriageway.",
    "خودروها باید موازی جاده و کنار لبه‌ی سواره‌رو بایستند."),
  S(False, "Man må aldrig parkere i venstre side af vejen.", "You may never park on the left side of the road.",
    "هرگز نمی‌توان در سمت چپ جاده پارک کرد.",
    "På ensrettede veje og mindre befærdede veje er det tilladt.",
    "On one-way roads and roads with little traffic it is allowed.",
    "در جاده‌های یک‌طرفه و کم‌تردد مجاز است."),
)

Q(5006, "7.18", picture("""
A theory-test illustration seen from the driver's seat of a parked car: through the windscreen, a blue square Danish parking sign
with a white letter P stands at the kerb, with a white plate under it showing a parking-disc symbol and «2 t». Inside the car, at the
lower right corner of the windscreen, lies a blue Danish parking disc (a square card with a round clock dial and one pointer).
MUST BE CLEARLY VISIBLE: the parking sign with its plate, the parking disc on the dashboard at the lower right of the windscreen.
MUST NOT APPEAR: people, other text."""),
  "Du parkerer kl. 14.05 ved denne tavle. Hvordan stiller du P-skiven?",
  "You park at 14:05 at this sign. How do you set the parking disc?",
  "ساعت ۱۴:۰۵ کنار این تابلو پارک می‌کنید. صفحه‌ی پارک (P-skive) را چطور تنظیم می‌کنید؟",
  S(True, "På kl. 14.15.", "To 14:15.", "روی ساعت ۱۴:۱۵.",
    "P-skiven stilles på det kvarter, der kommer efter ankomsttidspunktet.",
    "The disc is set to the quarter hour that follows the time you arrived.",
    "صفحه‌ی پارک روی ربع‌ساعتی تنظیم می‌شود که بعد از زمان رسیدن می‌آید."),
  S(False, "På kl. 14.00.", "To 14:00.", "روی ساعت ۱۴:۰۰.",
    "Skiven må ikke stilles på et tidspunkt før ankomsten.",
    "The disc must not be set to a time before you arrived.",
    "صفحه را نباید روی زمانی پیش از رسیدن تنظیم کرد."),
  S(False, "På kl. 16.05, når jeg skal køre igen.", "To 16:05, when I have to drive off again.", "روی ساعت ۱۶:۰۵، وقتی باید دوباره حرکت کنم.",
    "Skiven viser ankomsten, ikke hvornår du kører; tavlen siger, hvor længe du må holde.",
    "The disc shows when you arrived, not when you leave; the sign says how long you may stay.",
    "صفحه زمان رسیدن را نشان می‌دهد، نه زمان رفتن را؛ تابلو می‌گوید چقدر می‌توانید بمانید."),
  S(False, "På kl. 14.05.", "To 14:05.", "روی ساعت ۱۴:۰۵.",
    "Skiven stilles ikke på det præcise klokkeslæt, men på det næste hele kvarter efter ankomsten, her 14.15.",
    "The disc is not set to the exact time but to the next quarter hour after you arrive, here 14:15.",
    "صفحه روی ساعت دقیق تنظیم نمی‌شود، بلکه روی ربع‌ساعت بعد از رسیدن؛ این‌جا ۱۴:۱۵."),
)

Q(5007, "7.18", town("""
THE SCENE: a town street, one lane in our direction. Along the right kerb runs a solid (unbroken) yellow line painted on the kerb
edge, along the whole stretch ahead. A bakery front on the right pavement. The road edge along the yellow line is free.
MUST BE CLEARLY VISIBLE: the unbroken yellow line along the kerb.
MUST NOT APPEAR: signs, parked cars on the yellow stretch, text."""),
  "Langs kantstenen er der en ubrudt gul linje. Du vil hente brød i bageren og regner med at være væk i 2 minutter. Hvad gælder?",
  "There is an unbroken yellow line along the kerb. You want to fetch bread at the bakery and expect to be gone for 2 minutes. What applies?",
  "کنار جدول خط زرد ممتدی کشیده شده است. می‌خواهید از نانوایی نان بخرید و فکر می‌کنید ۲ دقیقه طول بکشد. چه قاعده‌ای برقرار است؟",
  S(False, "Jeg må holde her i 2 minutter, fordi det ikke er parkering.", "I may stand here for 2 minutes because it is not parking.",
    "می‌توانم ۲ دقیقه این‌جا بایستم، چون پارک حساب نمی‌شود.",
    "En ubrudt gul linje betyder, at også standsning er forbudt.",
    "An unbroken yellow line means that stopping is forbidden too.",
    "خط زرد ممتد یعنی توقف هم ممنوع است."),
  S(True, "Her er både standsning og parkering forbudt.", "Here both stopping and parking are forbidden.", "این‌جا هم توقف و هم پارک ممنوع است.",
    "Den ubrudte gule kantlinje forbyder standsning og parkering i den side af vejen.",
    "The unbroken yellow kerb line forbids stopping and parking on that side of the road.",
    "خط زرد ممتد کنار جدول، توقف و پارک را در آن سمت جاده ممنوع می‌کند."),
  S(False, "Den gule linje gælder kun om natten.", "The yellow line only applies at night.", "خط زرد فقط شب‌ها معتبر است.",
    "Linjen gælder hele døgnet, medmindre en tavle siger andet.",
    "The line applies all day and night unless a sign says otherwise.",
    "این خط در تمام شبانه‌روز معتبر است، مگر تابلویی چیز دیگری بگوید."),
  S(False, "Den gule linje betyder, at jeg højst må holde her i 15 minutter.", "The yellow line means that I may stand here for at most 15 minutes.",
    "خط زرد یعنی حداکثر ۱۵ دقیقه می‌توانم این‌جا بایستم.",
    "En ubrudt gul linje giver ingen tid at holde i; den forbyder standsning og parkering.",
    "An unbroken yellow line gives no time to stand at all; it forbids stopping and parking.",
    "خط زرد ممتد هیچ زمانی برای ایستادن نمی‌دهد؛ توقف و پارک را ممنوع می‌کند."),
)

Q(5008, "7.18", picture("""
A theory-test illustration seen from the side: a RED car parked at the right-hand kerb of a steep town street that slopes DOWN
towards the front of the car. The car's front wheels are turned in towards the kerb. Simple house fronts and a pavement behind.
MUST BE CLEARLY VISIBLE: the steep slope, the front wheel turned towards the kerb.
MUST NOT APPEAR: people, other vehicles moving, text."""),
  "Du parkerer på en stejl vej ned ad bakke. Hvordan sikrer du bilen?",
  "You park on a steep road going downhill. How do you secure the car?",
  "در یک سراشیبی تند پارک می‌کنید. خودرو را چطور ایمن می‌کنید؟",
  S(True, "Jeg trækker parkeringsbremsen.", "I apply the parking brake.", "ترمز دستی را می‌کشم.",
    "Når du forlader bilen, skal du sikre, at den ikke kan sætte i gang af sig selv.",
    "When you leave the car you must make sure it cannot start moving by itself.",
    "وقتی خودرو را ترک می‌کنید، باید مطمئن شوید خودبه‌خود راه نمی‌افتد."),
  S(True, "Jeg drejer forhjulene ind mod kantstenen.", "I turn the front wheels in towards the kerb.", "چرخ‌های جلو را به سمت جدول می‌چرخانم.",
    "Så stopper kantstenen bilen, hvis den alligevel begynder at rulle.",
    "Then the kerb stops the car if it starts to roll anyway.",
    "این‌طور اگر خودرو باز هم راه بیفتد، جدول جلویش را می‌گیرد."),
  S(False, "Det er nok at sætte gearet i frigear.", "Putting the gear in neutral is enough.", "کافی است دنده را خلاص بگذارم.",
    "I frigear kan bilen rulle; det sikrer den ikke.",
    "In neutral the car can roll; it does not secure it.",
    "در دنده‌ی خلاص خودرو می‌تواند حرکت کند؛ ایمنش نمی‌کند."),
  S(True, "Jeg sætter bilen i bakgear, eller i P, hvis den har automatgear.", "I put the car in reverse gear, or in P if it is an automatic.",
    "خودرو را در دنده‌عقب می‌گذارم، یا اگر اتوماتیک است، روی P.",
    "Et gear, der modvirker bakken, holder bilen ekstra igen, hvis bremsen skulle svigte.",
    "A gear that works against the slope holds the car back further if the brake should fail.",
    "دنده‌ای که خلاف شیب کار می‌کند، اگر ترمز از کار بیفتد، خودرو را بیشتر نگه می‌دارد."),
)

Q(5009, "7.18", above("""
THE SCENE: a town street seen from above, one lane in each direction, a broken centre line. Along the right kerb a row of parked
cars; one of them, a RED car (ours), has just parked, its driver's door (on the left, the traffic side) still closed.
VEHICLES AND PEOPLE (colour code used strictly): a cyclist coming up from behind (from the bottom of the picture) in our lane, close
past the left side of the parked RED car; a SOLID GREEN arrow shows the cyclist's way straight on.
MUST NOT APPEAR: open doors, signs, text."""),
  "Du har parkeret og vil stige ud. Bag dig kommer en cyklist. Hvordan forholder du dig?",
  "You have parked and want to get out. A cyclist is coming up behind you. What do you do?",
  "پارک کرده‌اید و می‌خواهید پیاده شوید. از پشت سر دوچرخه‌سواری می‌آید. چه می‌کنید؟",
  S(True, "Jeg venter med at åbne døren, til cyklisten er kørt forbi.", "I wait to open the door until the cyclist has passed.",
    "باز کردن در را تا رد شدن دوچرخه‌سوار عقب می‌اندازم.",
    "Når du åbner døren eller stiger ud, må der ikke opstå fare for andre.",
    "Opening the door or getting out must not put others in danger.",
    "باز کردن در یا پیاده شدن نباید دیگران را به خطر بیندازد."),
  S(True, "Jeg kigger i spejlet og over skulderen, før jeg åbner døren.", "I look in the mirror and over my shoulder before I open the door.",
    "پیش از باز کردن در، در آینه و از روی شانه نگاه می‌کنم.",
    "Så ser du cyklister og biler bagfra, også i den blinde vinkel.",
    "That way you see cyclists and cars behind you, also in the blind spot.",
    "این‌طور دوچرخه‌ها و خودروهای پشت سر را، حتی در نقطه‌ی کور، می‌بینید."),
  S(False, "Jeg åbner døren langsomt, så cyklisten kan nå at se den.", "I open the door slowly so that the cyclist has time to see it.",
    "در را آهسته باز می‌کنم تا دوچرخه‌سوار فرصت دیدنش را داشته باشد.",
    "Også en dør, der åbnes langsomt, kan få cyklisten til at styrte.",
    "Even a door opened slowly can make the cyclist crash.",
    "حتی دری که آهسته باز شود، می‌تواند دوچرخه‌سوار را زمین بزند."),
  S(True, "Mine passagerer skal også sikre sig, at de kan åbne døren uden fare.", "My passengers must also make sure that they can open the door safely.",
    "مسافرانم هم باید مطمئن شوند که می‌توانند بی‌خطر در را باز کنند.",
    "Pligten til at åbne døre uden fare for andre gælder alle i bilen, ikke kun føreren.",
    "The duty to open doors without danger to others applies to everyone in the car, not only the driver.",
    "وظیفه‌ی باز کردن در بدون خطر برای دیگران، برای همه‌ی سرنشینان است، نه فقط راننده."),
)

Q(5010, "7.9", view("""
THE SCENE: a straight two-way country road, one lane in each direction, a broken white centre line, solid edge lines, fields.
About 40 m ahead in our lane a slow green tractor drives at the right edge. The oncoming lane is empty as far as can be seen, about
500 m. In the interior rear-view mirror at the top centre, the road behind is empty.
MUST BE CLEARLY VISIBLE: the tractor, the long empty oncoming lane, the broken centre line, the empty mirror.
MUST NOT APPEAR: signs, side roads, text."""),
  "Du vil overhale traktoren. Hvad skal du sikre dig, før du begynder?",
  "You want to overtake the tractor. What must you make sure of before you start?",
  "می‌خواهید از تراکتور سبقت بگیرید. پیش از شروع، از چه چیزهایی باید مطمئن شوید؟",
  S(True, "At den modkørende vognbane er fri over en tilstrækkelig lang strækning.", "That the oncoming lane is clear over a long enough distance.",
    "این‌که خط روبه‌رو به اندازه‌ی کافی خالی است.",
    "Den, der overhaler, skal sikre sig, at vognbanen er fri for modkørende og andre hindringer langt nok frem.",
    "The overtaking driver must make sure the lane is free of oncoming traffic and obstacles far enough ahead.",
    "سبقت‌گیرنده باید مطمئن شود که خط تا فاصله‌ی کافی از خودروی روبه‌رو و مانع خالی است."),
  S(True, "At ingen bagfra er begyndt at overhale mig.", "That nobody behind me has started to overtake me.",
    "این‌که کسی از پشت شروع به سبقت از من نکرده است.",
    "Du må ikke begynde at overhale, hvis en bagfra allerede er i gang med at overhale dig.",
    "You must not start overtaking if someone behind has already started to overtake you.",
    "اگر کسی از پشت سبقت از شما را شروع کرده، نباید سبقت را آغاز کنید."),
  S(True, "At jeg kan komme tilbage i højre side uden fare for traktoren.", "That I can get back to the right without danger to the tractor.",
    "این‌که بتوانم بی‌خطر برای تراکتور به سمت راست برگردم.",
    "Du skal kunne vende tilbage til højre side, uden at den overhalede kommer i fare eller ulejlighed.",
    "You must be able to return to the right without putting the overtaken vehicle in danger or trouble.",
    "باید بتوانید بی‌آنکه وسیله‌ی سبقت‌گرفته به خطر یا زحمت بیفتد، به سمت راست برگردید."),
  S(True, "At der ikke er andre hindringer for overhalingen længere fremme.", "That there are no other obstacles to the overtaking further ahead.",
    "این‌که جلوتر مانع دیگری برای سبقت نباشد.",
    "Ud over modkørende må der heller ikke være andre hindringer, fx en vejindsnævring eller et kryds.",
    "Besides oncoming traffic, there must be no other obstacles either, for example a narrowing of the road or a junction.",
    "به‌جز ترافیک روبه‌رو، نباید مانع دیگری هم باشد، مثلاً باریک شدن جاده یا تقاطع."),
)

Q(5011, "7.9", view("""
THE SCENE: a straight two-way country road, one lane in each direction, a broken centre line. We drive in the right lane. Our left
door mirror (at the left edge of the picture) and the interior rear-view mirror (top centre) both show a dark blue car that has
moved out into the oncoming lane and is coming up alongside us to overtake. The road ahead is clear.
MUST BE CLEARLY VISIBLE: the overtaking car in both mirrors, its left indicator lit.
MUST NOT APPEAR: oncoming traffic, signs, text."""),
  "En bil er ved at overhale dig. Hvordan forholder du dig?",
  "A car is overtaking you. What do you do?",
  "خودرویی در حال سبقت از شماست. چه می‌کنید؟",
  S(True, "Jeg holder så langt til højre som muligt.", "I keep as far to the right as possible.", "تا جای ممکن سمت راست می‌مانم.",
    "Den, der bliver overhalet, skal holde så langt til højre som muligt.",
    "The driver being overtaken must keep as far to the right as possible.",
    "کسی که از او سبقت می‌گیرند، باید تا جای ممکن سمت راست بماند."),
  S(False, "Jeg øger farten, så overhalingen går hurtigere.", "I speed up so that the overtaking goes faster.", "سرعتم را زیاد می‌کنم تا سبقت زودتر تمام شود.",
    "Det gør overhalingen længere og farligere; du må ikke øge hastigheden.",
    "That makes the overtaking longer and more dangerous; you must not increase your speed.",
    "این کار سبقت را طولانی‌تر و خطرناک‌تر می‌کند؛ نباید سرعت را زیاد کنید."),
  S(False, "Jeg bremser hårdt, så bilen hurtigt kan komme forbi.", "I brake hard so that the car can get past quickly.", "محکم ترمز می‌کنم تا خودرو زود رد شود.",
    "Pludselig hård opbremsning kan skabe fare for bilerne bag dig.",
    "Sudden hard braking can put the cars behind you in danger.",
    "ترمز ناگهانی و محکم می‌تواند خودروهای پشت سر را به خطر بیندازد."),
  S(False, "Jeg blinker til venstre for at vise, at bilen kan overhale.", "I signal left to show that the car can overtake.", "راهنمای چپ می‌زنم تا نشان دهم خودرو می‌تواند سبقت بگیرد.",
    "Et blink til venstre betyder, at du selv vil ud til venstre, og kan misforstås farligt.",
    "A left signal means that you yourself are going to move left, and it can be dangerously misunderstood.",
    "راهنمای چپ یعنی خودتان می‌خواهید به چپ بروید و ممکن است به‌طرز خطرناکی اشتباه فهمیده شود."),
)

Q(5012, "7.9", town("""
THE SCENE: a town street with two lanes in our direction (a broken lane line between them). We drive in the LEFT lane. In the RIGHT
lane, next to us and a little ahead, a city bus has stopped just before a zebra crossing (white stripes across both lanes); the bus
hides the right part of the crossing and the pavement behind it. Our lane up to the crossing is free.
MUST BE CLEARLY VISIBLE: the bus stopped right before the crossing, the stripes in front of us, the hidden area beside the bus.
MUST NOT APPEAR: pedestrians that can be seen, traffic lights, text."""),
  "Bussen i højre vognbane holder stille lige før fodgængerfeltet. Du kører i venstre vognbane. Hvordan forholder du dig?",
  "The bus in the right-hand lane has stopped just before the pedestrian crossing. You are in the left-hand lane. What do you do?",
  "اتوبوس در خط راست درست پیش از گذرگاه عابر ایستاده است. شما در خط چپ می‌رانید. چه می‌کنید؟",
  S(False, "Jeg kører forbi bussen, fordi min vognbane er fri.", "I drive past the bus because my lane is free.", "از کنار اتوبوس رد می‌شوم، چون خط من خالی است.",
    "Du må ikke køre forbi et køretøj, der skjuler udsynet over fodgængerfeltet.",
    "You must not drive past a vehicle that blocks your view of the pedestrian crossing.",
    "نباید از کنار وسیله‌ای که دیدتان را به گذرگاه عابر بسته است رد شوید."),
  S(True, "Jeg sænker farten og er klar til at standse før feltet.", "I slow down and am ready to stop before the crossing.", "سرعتم را کم می‌کنم و آماده‌ی ایستادن پیش از گذرگاه هستم.",
    "Bussen kan holde for en fodgænger, du ikke kan se.",
    "The bus may be waiting for a pedestrian you cannot see.",
    "ممکن است اتوبوس برای عابری ایستاده باشد که شما نمی‌بینید."),
  S(True, "Der kan gå en fodgænger ud foran bussen, som jeg ikke kan se.", "A pedestrian I cannot see may step out in front of the bus.",
    "ممکن است عابری که نمی‌بینم از جلوی اتوبوس وارد گذرگاه شود.",
    "Derfor forbyder Færdselsloven § 25 at køre forbi.",
    "That is why Færdselsloven § 25 forbids driving past.",
    "به همین دلیل ماده‌ی ۲۵ قانون، رد شدن از کنار آن را ممنوع کرده است."),
)

Q(5013, "7.9", view("""
THE SCENE: a straight two-way country road, one lane in each direction, a broken centre line, good view. About 80 m ahead a small
side road joins from the right; across the end of the side road there are white shark-teeth triangles and a give-way sign (a white
triangle with red border, point down) facing the side road. Ahead of us in our lane a slow white van. The oncoming lane is clear.
MUST BE CLEARLY VISIBLE: the side road with its shark teeth and sign, the slow van, the clear oncoming lane.
MUST NOT APPEAR: a solid centre line, traffic in the side road, text."""),
  "Du kører på en vej, hvor trafikken fra sidevejen har ubetinget vigepligt. Hvad gælder for overhaling af varevognen lige før krydset?",
  "You are on a road where traffic from the side road must give way unconditionally. What applies to overtaking the van just before the junction?",
  "در جاده‌ای هستید که ترافیک فرعی باید بی‌قیدوشرط راه بدهد. درباره‌ی سبقت از ون درست پیش از تقاطع چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må overhale, fordi den tværgående trafik har ubetinget vigepligt, hvis det i øvrigt kan ske uden fare.",
    "I may overtake because the crossing traffic must give way unconditionally, if it can otherwise be done safely.",
    "می‌توانم سبقت بگیرم، چون ترافیک متقاطع باید بی‌قیدوشرط راه بدهد، به شرط آن‌که از نظر دیگر هم بی‌خطر باشد.",
    "Forbuddet mod overhaling i kryds gælder ikke, når den tværgående trafik har ubetinget vigepligt.",
    "The ban on overtaking at junctions does not apply when the crossing traffic must give way unconditionally.",
    "ممنوعیت سبقت در تقاطع، وقتی ترافیک متقاطع باید بی‌قیدوشرط راه بدهد، اعمال نمی‌شود."),
  S(False, "Det er altid forbudt at overhale i et vejkryds.", "Overtaking at a junction is always forbidden.", "سبقت در تقاطع همیشه ممنوع است.",
    "Der er undtagelser, blandt andet når den tværgående trafik har ubetinget vigepligt.",
    "There are exceptions, for example when the crossing traffic must give way unconditionally.",
    "استثنا وجود دارد، از جمله وقتی ترافیک متقاطع باید بی‌قیدوشرط راه بدهد."),
  S(True, "Jeg skal stadig sikre mig, at varevognen ikke skal svinge til venstre.", "I must still make sure the van is not going to turn left.",
    "باز هم باید مطمئن شوم که ون قصد گردش به چپ ندارد.",
    "En bil, der svinger til venstre, må ikke overhales i venstre side.",
    "A car turning left must not be overtaken on its left.",
    "از خودرویی که به چپ می‌پیچد نباید از سمت چپ سبقت گرفت."),
  S(True, "Jeg skal sikre mig, at ingen bagfra er begyndt at overhale mig.", "I must make sure that nobody behind has started to overtake me.",
    "باید مطمئن شوم که کسی از پشت شروع به سبقت از من نکرده است.",
    "Det skal du altid sikre dig, før du begynder at overhale.", "You must always make sure of that before you start overtaking.",
    "همیشه پیش از شروع سبقت باید از این مطمئن شوید."),
)

Q(5014, "7.9", town("""
THE SCENE: a town street, one lane in each direction, a broken centre line. About 30 m ahead is a junction with no signs, no
markings and no traffic lights. In our lane, near the right edge, a cyclist rides straight towards the junction. The oncoming lane
is clear; nothing is coming from the side streets.
MUST BE CLEARLY VISIBLE: the unmarked junction, the cyclist ahead, the clear oncoming lane.
MUST NOT APPEAR: signs, signals, text."""),
  "Lige før krydset kører en cyklist foran dig. Hvad gælder for overhaling af cyklisten?",
  "Just before the junction a cyclist is riding in front of you. What applies to overtaking the cyclist?",
  "درست پیش از تقاطع، دوچرخه‌سواری جلوی شما می‌رود. درباره‌ی سبقت از او چه قاعده‌ای برقرار است؟",
  S(True, "Forbuddet mod overhaling i kryds gælder ikke overhaling af en tohjulet cykel.", "The ban on overtaking at junctions does not apply to a two-wheeled bicycle.",
    "ممنوعیت سبقت در تقاطع شامل دوچرخه‌ی دوچرخ نمی‌شود.",
    "Færdselsloven § 23 undtager overhaling af tohjulede cykler og små knallerter.",
    "Færdselsloven § 23 makes an exception for overtaking two-wheeled bicycles and small mopeds.",
    "ماده‌ی ۲۳ قانون، سبقت از دوچرخه و موپد کوچک دوچرخ را استثنا کرده است."),
  S(True, "Det skal kunne ske uden fare, og jeg skal holde god afstand til siden.", "It must be safe, and I must keep a good side distance.",
    "باید بی‌خطر باشد و باید فاصله‌ی پهلوی خوبی نگه دارم.",
    "Undtagelsen fritager ikke for kravet om sikkerhed og sideafstand.",
    "The exception does not remove the need for safety and side distance.",
    "این استثنا نیاز به ایمنی و فاصله‌ی پهلوی را از بین نمی‌برد."),
  S(False, "Jeg behøver ikke holde tilbage for trafik fra højre, når jeg er i gang med at overhale.",
    "I do not need to give way to traffic from the right while I am overtaking.",
    "وقتی در حال سبقت هستم، لازم نیست به ترافیک سمت راست راه بدهم.",
    "Højrevigepligten i krydset gælder stadig.",
    "The duty to give way to the right in the junction still applies.",
    "حق تقدم دست راست در تقاطع همچنان برقرار است."),
  S(True, "Jeg holder øje med, om cyklisten vil svinge, fx til venstre i krydset.", "I watch whether the cyclist is going to turn, for example left at the junction.",
    "مراقبم که آیا دوچرخه‌سوار می‌خواهد بپیچد، مثلاً در تقاطع به چپ.",
    "Cyklisten kan svinge i krydset; se efter tegn, før du overhaler.", "The cyclist may turn at the junction; look for signals before you overtake.",
    "دوچرخه‌سوار ممکن است در تقاطع بپیچد؛ پیش از سبقت دنبال علامتش باشید."),
)

Q(5015, "7.9", view("""
THE SCENE: a two-way country road, one lane in each direction, a broken centre line, rising towards a blind hilltop about 100 m
ahead: the road disappears over the crest, nothing beyond it can be seen. Ahead of us in our lane a slow white van climbs the hill.
MUST BE CLEARLY VISIBLE: the hilltop hiding the road beyond, the slow van, the broken centre line.
MUST NOT APPEAR: oncoming traffic, signs, text."""),
  "Foran dig kører en langsom varevogn op mod en bakketop, hvor du ikke kan se, hvad der kommer. Hvad gælder?",
  "In front of you a slow van is driving up towards a hilltop where you cannot see what is coming. What applies?",
  "جلوی شما ونی آهسته به سمت بالای تپه‌ای می‌رود که نمی‌بینید پشتش چه می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke overhale ved en uoverskuelig bakketop.", "I must not overtake at a blind hilltop.", "در بالای تپه‌ی بی‌دید نباید سبقت بگیرم.",
    "Overhaling er forbudt, hvor udsynet fremad er begrænset ved bakker og sving.",
    "Overtaking is forbidden where the view ahead is restricted by hills and bends.",
    "سبقت جایی که دید جلو به‌خاطر تپه یا پیچ محدود است، ممنوع است."),
  S(False, "Jeg må overhale, hvis jeg giver fuld gas og skynder mig.", "I may overtake if I accelerate hard and hurry.", "اگر گاز بدهم و عجله کنم، می‌توانم سبقت بگیرم.",
    "Fart ændrer ikke, at en modkørende kan dukke op over bakken.",
    "Speed does not change that an oncoming car may appear over the hill.",
    "سرعت این واقعیت را عوض نمی‌کند که ممکن است خودرویی از روبه‌رو از پشت تپه برسد."),
  S(True, "Forbuddet gælder ikke, hvis der er mindst to vognbaner i min retning, som modkørende ikke må bruge.",
    "The ban does not apply if there are at least two lanes in my direction that oncoming traffic may not use.",
    "اگر در جهت من دست‌کم دو خط باشد که ترافیک روبه‌رو اجازه‌ی استفاده از آن را ندارد، این ممنوعیت نیست.",
    "Så kan du overhale uden at komme over i de modkørendes side.",
    "Then you can overtake without moving into the oncoming side.",
    "در این حالت می‌توانید بدون رفتن به سمت ترافیک روبه‌رو سبقت بگیرید."),
)

Q(5016, "7.9", above("""
THE SCENE: a two-way road seen from above, one lane in each direction, a broken centre line. A side road joins from the LEFT about in
the middle of the picture.
VEHICLES (colour code used strictly): a GREY car in our lane just before the side road, placed close to the centre line, its LEFT
indicator flashing (drawn bright orange), waiting to turn left; a DASHED ORANGE arrow shows its coming turn into the side road. A RED
car (ours) behind it, with a SOLID GREEN arrow passing the grey car on its RIGHT side, in our own lane. There is enough room on the
grey car's right. The oncoming lane has a BLUE car coming down.
MUST NOT APPEAR: signs, pedestrians, text."""),
  "Den grå bil foran dig blinker til venstre og holder ved midterlinjen for at svinge. Hvordan må du køre forbi?",
  "The grey car in front of you is indicating left and waiting at the centre line to turn. How may you pass it?",
  "خودروی خاکستری جلوی شما راهنمای چپ زده و کنار خط وسط ایستاده تا بپیچد. چطور می‌توانید از کنارش رد شوید؟",
  S(True, "Jeg må overhale den i højre side, hvis det kan ske uden fare.", "I may overtake it on the right, if it can be done safely.",
    "اگر بی‌خطر باشد، می‌توانم از سمت راستش سبقت بگیرم.",
    "En bil, der svinger til venstre, må overhales i højre side.",
    "A car turning left may be overtaken on its right.",
    "از خودرویی که به چپ می‌پیچد، می‌توان از سمت راست سبقت گرفت."),
  S(False, "Jeg skal overhale den i venstre side.", "I must overtake it on the left.", "باید از سمت چپش سبقت بگیرم.",
    "Det ville være farligt: bilen er ved at svinge den vej, og der kommer en modkørende.",
    "That would be dangerous: the car is about to turn that way, and an oncoming car is coming.",
    "خطرناک است: خودرو در حال پیچیدن به همان سمت است و از روبه‌رو هم خودرویی می‌آید."),
  S(True, "Jeg holder øje med cyklister og fodgængere i højre side.", "I watch out for cyclists and pedestrians on the right.",
    "مراقب دوچرخه‌سواران و عابران سمت راست هستم.",
    "Når du kører forbi i højre side, er du tæt på vejkanten, hvor der kan være bløde trafikanter.",
    "When you pass on the right you are close to the road edge, where there may be vulnerable road users.",
    "وقتی از سمت راست رد می‌شوید، به لبه‌ی جاده نزدیکید و ممکن است کاربران آسیب‌پذیر آن‌جا باشند."),
)

Q(5017, "7.9", view("""
THE SCENE: a two-way country road, one lane in each direction, a broken centre line. About 60 m ahead the road crosses a railway
at a level crossing with half barriers (raised) and red-and-white crossing signs at both sides. Between us and the crossing, in our
lane, a slow green tractor. The oncoming lane is clear.
MUST BE CLEARLY VISIBLE: the level crossing and its barriers, the tractor before it.
MUST NOT APPEAR: a train, text."""),
  "Foran dig kører en traktor. Lidt længere fremme er en jernbaneoverkørsel. Hvad gælder for overhaling?",
  "A tractor is driving in front of you. A little further ahead there is a level crossing. What applies to overtaking?",
  "جلوی شما تراکتوری می‌رود. کمی جلوتر تقاطع راه‌آهن است. درباره‌ی سبقت چه قاعده‌ای برقرار است؟",
  S(False, "Jeg må overhale, hvis der ikke kommer noget tog.", "I may overtake if no train is coming.", "اگر قطاری نیاید، می‌توانم سبقت بگیرم.",
    "Overhaling er forbudt umiddelbart før og på en jernbaneoverkørsel, uanset tog.",
    "Overtaking is forbidden immediately before and on a level crossing, train or not.",
    "سبقت درست پیش از تقاطع راه‌آهن و روی آن ممنوع است، چه قطار بیاید چه نه."),
  S(True, "Jeg må ikke overhale umiddelbart før og på overkørslen.", "I must not overtake immediately before and on the level crossing.",
    "درست پیش از تقاطع راه‌آهن و روی آن نباید سبقت بگیرم.",
    "Det står i Færdselsloven § 23.", "That is in Færdselsloven § 23.", "این در ماده‌ی ۲۳ قانون آمده است."),
  S(True, "Jeg venter, til vi er over overkørslen, og det i øvrigt er sikkert.", "I wait until we are over the crossing and it is otherwise safe.",
    "صبر می‌کنم تا از تقاطع رد شویم و سبقت از نظر دیگر هم بی‌خطر باشد.",
    "Efter overkørslen gælder de almindelige regler for overhaling igen.",
    "After the crossing the ordinary overtaking rules apply again.",
    "بعد از تقاطع، قاعده‌های معمول سبقت دوباره برقرارند."),
  S(True, "Jeg må heller ikke standse på selve overkørslen.", "I must not stop on the level crossing itself either.", "روی خود تقاطع راه‌آهن هم نباید بایستم.",
    "Det er forbudt at standse og parkere på en jernbaneoverkørsel.", "Stopping and parking on a level crossing are forbidden.", "توقف و پارک روی تقاطع راه‌آهن ممنوع است."),
)

Q(5018, "7.9", above("""
THE SCENE: a narrow, winding two-way country road seen from above, one lane in each direction, a broken centre line, hedges on both
sides. A little ahead on the right there is a wide lay-by beside the road.
VEHICLES (colour code used strictly): a RED car (ours) pulling a white caravan, driving slowly in our lane; behind it a queue of three
GREY cars close together; a DASHED ORANGE arrow from the red car into the lay-by on the right.
MUST NOT APPEAR: oncoming traffic, signs, text."""),
  "Du kører langsomt med campingvogn på en smal, snoet vej, og der er dannet kø bag dig. Hvordan forholder du dig?",
  "You are driving slowly with a caravan on a narrow, winding road, and a queue has formed behind you. What do you do?",
  "با کاروان در جاده‌ای باریک و پرپیچ آهسته می‌رانید و پشت سرتان صف تشکیل شده است. چه می‌کنید؟",
  S(True, "Jeg holder øje med trafikken bagfra.", "I keep an eye on the traffic behind.", "ترافیک پشت سر را زیر نظر دارم.",
    "Den, der kører langsomt eller fylder meget, skal være særligt opmærksom på trafikken bagfra.",
    "Someone driving slowly or taking up much space must pay special attention to the traffic behind.",
    "کسی که آهسته می‌رود یا جای زیادی می‌گیرد، باید به ترافیک پشت سر توجه ویژه داشته باشد."),
  S(True, "Jeg sænker farten og kører ind til siden, så snart det er muligt, så de andre kan komme forbi.",
    "I slow down and pull over as soon as possible so that the others can get past.",
    "به محض این‌که شد، سرعت را کم می‌کنم و کنار می‌کشم تا بقیه رد شوند.",
    "Færdselsloven § 22 kræver, at du gør det lettere at overhale dig, og om nødvendigt standser.",
    "Færdselsloven § 22 requires you to make it easier to overtake you, stopping if necessary.",
    "ماده‌ی ۲۲ قانون می‌خواهد که سبقت از خودتان را آسان کنید و در صورت لزوم بایستید."),
  S(False, "Jeg kører hurtigere end sikkert, så køen kan følge med.", "I drive faster than is safe so that the queue can keep up.",
    "تندتر از حد ایمن می‌رانم تا صف بتواند همراهم بیاید.",
    "Du må aldrig køre hurtigere, end forholdene og vogntoget tillader.",
    "You must never drive faster than the conditions and the combination allow.",
    "هرگز نباید تندتر از آن‌چه شرایط و خودرو با یدک اجازه می‌دهد برانید."),
  S(False, "Det er de andres ansvar at vente; jeg behøver ikke gøre noget.", "It is the others' job to wait; I do not need to do anything.",
    "صبر کردن وظیفه‌ی بقیه است؛ من لازم نیست کاری بکنم.",
    "Loven giver også den langsomme et ansvar for at lette overhalingen.",
    "The law also gives the slow driver a duty to make overtaking easier.",
    "قانون به راننده‌ی کندرو هم وظیفه‌ی آسان کردن سبقت را می‌دهد."),
)

Q(5019, "6.1", view("""
THE SCENE: we approach a junction where our road ends at a wider crossing road. On the right at the junction stands a give-way
sign (a white triangle with a red border, point down), and across our lane at the junction there is a row of white shark-teeth
triangles pointing towards us. On the crossing road a car comes from the left and another from the right.
MUST BE CLEARLY VISIBLE: the give-way sign, the shark teeth, the cars on the crossing road from both sides.
MUST NOT APPEAR: traffic lights, a stop sign, text."""),
  "Du nærmer dig dette kryds. Hvad betyder tavlen og hajtænderne?",
  "You are approaching this junction. What do the sign and the shark teeth mean?",
  "به این تقاطع نزدیک می‌شوید. تابلو و دندان‌کوسه‌ها یعنی چه؟",
  S(True, "Jeg har ubetinget vigepligt for trafikken på den tværgående vej fra begge sider.",
    "I must give way unconditionally to the traffic on the crossing road from both sides.",
    "باید بی‌قیدوشرط به ترافیک جاده‌ی متقاطع از هر دو طرف راه بدهم.",
    "Tavle B 11 og hajtænder betyder ubetinget vigepligt.",
    "Sign B 11 and shark teeth mean you must give way unconditionally.",
    "تابلوی B 11 و دندان‌کوسه یعنی باید بی‌قیدوشرط راه بدهید."),
  S(False, "Jeg skal altid standse helt, selv om vejen er fri.", "I must always stop completely, even if the road is clear.",
    "باید همیشه کامل بایستم، حتی اگر جاده خالی باشد.",
    "Fuldt stop kræves ved stoptavlen B 13, ikke ved B 11.",
    "A full stop is required at the stop sign B 13, not at B 11.",
    "توقف کامل برای تابلوی ایست B 13 لازم است، نه برای B 11."),
  S(False, "Jeg må køre ud foran en bil på den tværgående vej, hvis den kan nå at bremse.", "I may drive out in front of a car on the crossing road if it has time to brake.",
    "می‌توانم جلوی خودرویی در جاده‌ی متقاطع وارد شوم، اگر فرصت ترمز کردن داشته باشد.",
    "Du må kun køre ud, hvis det kan ske uden fare eller ulempe for dem, du skal holde tilbage for; de må ikke skulle bremse for dig.",
    "You may only drive out if it can be done without danger or inconvenience to those you must give way to; they must not have to brake for you.",
    "فقط وقتی می‌توانید وارد شوید که برای کسانی که باید به آن‌ها راه بدهید خطر یا مزاحمتی نداشته باشد؛ آن‌ها نباید مجبور شوند برایتان ترمز کنند."),
  S(False, "Jeg har kun vigepligt for trafikken fra højre.", "I only have to give way to traffic from the right.", "فقط باید به ترافیک سمت راست راه بدهم.",
    "Ubetinget vigepligt gælder for trafikken fra begge sider.",
    "Unconditional give-way applies to traffic from both sides.",
    "راه دادن بی‌قیدوشرط برای ترافیک هر دو طرف است."),
)

Q(5020, "6.1", view("""
THE SCENE: we approach a junction with a crossing road. On the right at the junction stands a red octagonal STOP sign, and across
our lane there is a wide solid white stop line. The crossing road is completely empty in both directions as far as can be seen.
MUST BE CLEARLY VISIBLE: the stop sign, the stop line, the empty crossing road.
MUST NOT APPEAR: traffic lights, other road users, text other than the sign's own design."""),
  "Vejen på tværs er helt fri. Hvordan forholder du dig ved tavlen?",
  "The crossing road is completely clear. What do you do at the sign?",
  "جاده‌ی متقاطع کاملاً خالی است. کنار این تابلو چه می‌کنید؟",
  S(True, "Jeg standser helt ved stoplinjen.", "I stop completely at the stop line.", "کنار خط ایست کاملاً می‌ایستم.",
    "Ved stoptavlen B 13 skal du altid standse helt ved stoplinjen.",
    "At the stop sign B 13 you must always stop completely at the stop line.",
    "کنار تابلوی ایست B 13 همیشه باید پشت خط ایست کاملاً بایستید."),
  S(False, "Jeg må køre over uden at standse, når der ikke kommer nogen.", "I may drive across without stopping when nobody is coming.",
    "وقتی کسی نمی‌آید، می‌توانم بدون ایستادن رد شوم.",
    "Stoppligten gælder også, når vejen er fri.",
    "The duty to stop applies even when the road is clear.",
    "وظیفه‌ی ایستادن حتی وقتی جاده خالی است هم برقرار است."),
  S(True, "Jeg har ubetinget vigepligt for trafikken fra begge sider.", "I must give way unconditionally to traffic from both sides.",
    "باید بی‌قیدوشرط به ترافیک هر دو طرف راه بدهم.",
    "Stoptavlen giver både stoppligt og ubetinget vigepligt.",
    "The stop sign gives both a duty to stop and unconditional give-way.",
    "تابلوی ایست هم وظیفه‌ی ایستادن می‌دهد و هم راه دادن بی‌قیدوشرط."),
)

Q(5021, "6.1", view("""
THE SCENE: a straight two-way country road outside town, one lane in each direction, a broken centre line. On the right verge
stands a square traffic sign turned on its corner: a yellow diamond with a white border (the Danish main-road sign). About 150 m
ahead a small side road joins from the left, with shark teeth at its end.
MUST BE CLEARLY VISIBLE: the yellow diamond sign, the side road on the left.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle uden for byen. Hvad betyder den?",
  "You pass this sign outside town. What does it mean?",
  "بیرون شهر از کنار این تابلو رد می‌شوید. یعنی چه؟",
  S(True, "Jeg kører på en hovedvej.", "I am driving on a main road.", "در جاده‌ی اصلی می‌رانم.",
    "Den gule rombe med hvid kant (B 16) betyder hovedvej.",
    "The yellow diamond with a white border (B 16) means main road.",
    "لوزی زرد با حاشیه‌ی سفید (B 16) یعنی جاده‌ی اصلی."),
  S(True, "Trafikken fra sidevejene skal holde tilbage for mig, men jeg skal stadig være opmærksom.",
    "Traffic from the side roads must give way to me, but I must still pay attention.",
    "ترافیک فرعی‌ها باید به من راه بدهد، ولی باز هم باید مراقب باشم.",
    "Trafikken ud fra sidevejene har ubetinget vigepligt, men du skal altid være agtpågivende.",
    "Traffic coming out of the side roads must give way unconditionally, but you must always be attentive.",
    "ترافیکی که از فرعی‌ها می‌آید باید بی‌قیدوشرط راه بدهد، ولی شما همیشه باید هوشیار باشید."),
  S(False, "Jeg skal holde tilbage for trafik fra højre.", "I must give way to traffic from the right.", "باید به ترافیک سمت راست راه بدهم.",
    "På hovedvejen gælder højrereglen ikke over for sidevejene.",
    "On the main road the right-hand rule does not apply towards the side roads.",
    "در جاده‌ی اصلی، قاعده‌ی دست راست در برابر فرعی‌ها اعمال نمی‌شود."),
  S(True, "Uden for tættere bebygget område må jeg ikke parkere på kørebanen på denne vej.",
    "Outside built-up areas I must not park on the carriageway of this road.",
    "بیرون از منطقه‌ی مسکونی، نباید روی سواره‌روی این جاده پارک کنم.",
    "Parkering på kørebanen af hovedveje uden for tættere bebygget område er forbudt.",
    "Parking on the carriageway of main roads outside built-up areas is forbidden.",
    "پارک روی سواره‌روی جاده‌های اصلی بیرون از مناطق مسکونی ممنوع است."),
)

Q(5022, "6.1", view("""
THE SCENE: a straight two-way country road, one lane in each direction, a broken centre line. On the right verge a round white sign
with a red ring showing a black car on the left and a red car on the right (the Danish no-overtaking sign). About 40 m ahead in our
lane a cyclist rides at the right edge; further ahead a grey car.
MUST BE CLEARLY VISIBLE: the no-overtaking sign, the cyclist, the car further ahead.
MUST NOT APPEAR: oncoming traffic, text."""),
  "Du kører forbi denne tavle. Foran dig kører en cyklist og længere fremme en bil. Hvad gælder?",
  "You pass this sign. In front of you there is a cyclist, and further ahead a car. What applies?",
  "از کنار این تابلو رد می‌شوید. جلوی شما یک دوچرخه‌سوار و جلوتر یک خودرو می‌رود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må overhale cyklisten, hvis det kan ske uden fare.", "I may overtake the cyclist if it can be done safely.",
    "اگر بی‌خطر باشد، می‌توانم از دوچرخه‌سوار سبقت بگیرم.",
    "Forbuddet (C 51) gælder ikke overhaling af tohjulede cykler og tohjulede små knallerter.",
    "The ban (C 51) does not cover overtaking two-wheeled bicycles and two-wheeled small mopeds.",
    "این ممنوعیت (C 51) شامل سبقت از دوچرخه و موپد کوچک دوچرخ نمی‌شود."),
  S(True, "Jeg må ikke overhale bilen på strækningen.", "I must not overtake the car on this stretch.", "در این مسیر نباید از خودرو سبقت بگیرم.",
    "Tavlen forbyder overhaling af alle andre køretøjer end tohjulede cykler og små knallerter, medmindre de svinger bort fra vejen.",
    "The sign forbids overtaking any vehicles other than two-wheeled bicycles and small mopeds, unless they are turning off the road.",
    "این تابلو سبقت از همه‌ی وسایل به‌جز دوچرخه و موپد کوچک دوچرخ را ممنوع می‌کند، مگر وسیله‌ای که از جاده خارج می‌شود."),
  S(False, "Jeg må overhale alle køretøjer, når der ikke er modkørende.", "I may overtake any vehicle when there is no oncoming traffic.",
    "وقتی ترافیک روبه‌رو نیست، می‌توانم از هر وسیله‌ای سبقت بگیرم.",
    "Forbuddet gælder, uanset om der er modkørende.",
    "The ban applies whether there is oncoming traffic or not.",
    "این ممنوعیت برقرار است، چه ترافیک روبه‌رو باشد چه نباشد."),
  S(False, "Jeg må overhale en motorcykel på strækningen.", "I may overtake a motorcycle on this stretch.", "در این مسیر می‌توانم از موتورسیکلت سبقت بگیرم.",
    "Undtagelsen gælder kun tohjulede cykler og små knallerter, ikke motorcykler.",
    "The exception only covers two-wheeled bicycles and small mopeds, not motorcycles.",
    "این استثنا فقط برای دوچرخه و موپد کوچک دوچرخ است، نه موتورسیکلت."),
)

Q(5023, "6.1", view("""
THE SCENE: a two-way country road, one lane in each direction, a broken centre line, a few houses far away. On the right verge a
round white sign with a red ring and the black number 70 (the Danish speed-limit sign). The road is wet after rain.
MUST BE CLEARLY VISIBLE: the speed-limit sign with 70, the wet road.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle uden for byen. Vejen er våd. Hvad gælder?",
  "You pass this sign outside town. The road is wet. What applies?",
  "بیرون شهر از کنار این تابلو رد می‌شوید. جاده خیس است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må højst køre 70 km/t på strækningen.", "I may drive at most 70 km/h on this stretch.", "در این مسیر حداکثر ۷۰ کیلومتر بر ساعت می‌توانم برانم.",
    "Tavle C 55 angiver den højst tilladte hastighed.",
    "Sign C 55 gives the highest permitted speed.",
    "تابلوی C 55 حداکثر سرعت مجاز را نشان می‌دهد."),
  S(False, "Jeg skal mindst køre 70 km/t.", "I must drive at least 70 km/h.", "باید دست‌کم ۷۰ کیلومتر بر ساعت برانم.",
    "Den røde ring betyder et forbud, altså en højeste hastighed, ikke en mindste.",
    "The red ring means a ban, a highest speed, not a lowest one.",
    "حلقه‌ی قرمز یعنی ممنوعیت، یعنی حداکثر سرعت، نه حداقل."),
  S(True, "Jeg skal køre langsommere, hvis forholdene kræver det.", "I must drive slower if the conditions call for it.", "اگر شرایط ایجاب کند، باید آهسته‌تر برانم.",
    "Hastigheden skal altid afpasses efter forholdene, fx en våd vej.",
    "Your speed must always suit the conditions, for example a wet road.",
    "سرعت همیشه باید با شرایط، مثلاً جاده‌ی خیس، جور باشد."),
)

Q(5024, "6.1", view("""
THE SCENE: a two-way road arriving at a village: the first houses begin a little ahead. On the right verge stands the Danish sign
for the start of a built-up area: a white rectangular sign with a black silhouette of a town (houses and a church tower). No
speed-limit sign anywhere.
MUST BE CLEARLY VISIBLE: the built-up-area sign, the first houses.
MUST NOT APPEAR: speed-limit signs, text."""),
  "Du kører forbi denne tavle. Hvad er den højst tilladte hastighed herefter, når der ikke er andre tavler?",
  "You pass this sign. What is the highest permitted speed after it when there are no other signs?",
  "از کنار این تابلو رد می‌شوید. اگر تابلوی دیگری نباشد، از این‌جا به بعد حداکثر سرعت مجاز چقدر است؟",
  S(True, "50 km/t.", "50 km/h.", "۵۰ کیلومتر بر ساعت.",
    "Tavlen (E 55) markerer tættere bebygget område, hvor grænsen er 50 km/t.",
    "The sign (E 55) marks a built-up area, where the limit is 50 km/h.",
    "این تابلو (E 55) شروع منطقه‌ی مسکونی است که حد سرعتش ۵۰ کیلومتر بر ساعت است."),
  S(False, "60 km/t.", "60 km/h.", "۶۰ کیلومتر بر ساعت.",
    "Den generelle grænse i tættere bebygget område er 50 km/t.",
    "The general limit in built-up areas is 50 km/h.",
    "حد عمومی سرعت در مناطق مسکونی ۵۰ کیلومتر بر ساعت است."),
  S(False, "70 km/t.", "70 km/h.", "۷۰ کیلومتر بر ساعت.",
    "70 km/t gælder kun, hvor en tavle viser det.", "70 km/h only applies where a sign shows it.", "۷۰ کیلومتر بر ساعت فقط جایی است که تابلویی آن را نشان دهد."),
  S(False, "80 km/t.", "80 km/h.", "۸۰ کیلومتر بر ساعت.",
    "80 km/t gælder uden for tættere bebygget område.",
    "80 km/h applies outside built-up areas.",
    "۸۰ کیلومتر بر ساعت برای بیرون از مناطق مسکونی است."),
)

Q(5025, "6.1", view("""
THE SCENE: a two-way country road with a gentle left bend ahead, one lane in each direction. Along the middle of the road run two
unbroken (solid) white lines side by side, a double barrier line separating the two directions. A little ahead on the left a farm
entrance (a gravel driveway) leaves the road.
MUST BE CLEARLY VISIBLE: the two unbroken white centre lines, the driveway on the left.
MUST NOT APPEAR: other road users, signs, text."""),
  "Midt på vejen er der to ubrudte hvide linjer side om side. Hvad gælder?",
  "In the middle of the road there are two unbroken white lines side by side. What applies?",
  "وسط جاده دو خط سفید ممتد کنار هم کشیده شده است. چه قاعده‌ای برقرار است؟",
  S(True, "Det er spærrelinjer, som jeg ikke må overskride.", "They are barrier lines that I must not cross.", "این‌ها خط ممتدند و نباید از آن‌ها رد شوم.",
    "Spærrelinjer (Q 44) må ikke overskrides eller krydses.", "Barrier lines (Q 44) must not be crossed.", "از خط‌های ممتد (Q 44) نباید عبور کرد."),
  S(False, "Jeg må overskride dem for at overhale, hvis vejen er fri.", "I may cross them to overtake if the road is clear.", "اگر جاده خالی باشد، برای سبقت می‌توانم از آن‌ها رد شوم.",
    "Linjerne må ikke overskrides for at overhale, heller ikke når vejen er fri.",
    "The lines must not be crossed to overtake, not even when the road is clear.",
    "حتی وقتی جاده خالی است، برای سبقت نباید از این خط‌ها عبور کرد."),
  S(True, "Jeg må heller ikke køre over dem for at svinge ind til ejendommen til venstre.",
    "I must not drive over them to turn into the property on the left either.",
    "برای پیچیدن به ملک سمت چپ هم نباید از آن‌ها رد شوم.",
    "Der er ingen undtagelse for at svinge ind til en ejendom.",
    "There is no exception for turning into a property.",
    "برای پیچیدن به یک ملک استثنایی وجود ندارد."),
  S(True, "Linjerne adskiller de to kørselsretninger.", "The lines separate the two directions of traffic.", "این خط‌ها دو جهت حرکت را از هم جدا می‌کنند.",
    "En dobbelt spærrelinje midt på vejen adskiller de modsatte kørselsretninger.", "A double barrier line in the middle of the road separates the opposite directions.",
    "خط ممتد دوبل وسط جاده، دو جهت مخالف را از هم جدا می‌کند."),
)
