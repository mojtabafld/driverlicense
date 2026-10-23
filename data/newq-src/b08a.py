# «آزمون جدید», batch 8 (5701–5800), part a: stopping and parking (7.18), overtaking (7.9), signs (6.1), people beside the
# road (7.6), speed (7.3), the car (1.2) and tunnels (7.20).
# Rules: Færdselsloven §§ 3 stk. 2 (special care for children and school patrols), 10 stk. 2 (on the carriageway pedestrians walk
# at the far left), 11 (a skateboarder counts as a pedestrian), 18 stk. 4, 21 stk. 3–4, 22 stk. 1, 23 stk. 1 nr. 1 a (lanes
# reserved for the same direction) and stk. 2 (the exception only for two-wheeled bicycles and small mopeds, not large mopeds),
# 27 stk. 1 and 7, 28 stk. 1–2, 29 stk. 1 nr. 2, stk. 2 (at a bus stop the ban covers the whole marked stretch; 12 m only where
# nothing is marked) and stk. 3 nr. 2 (not so that driving to or from a property is made substantially harder), 32 stk. 1–2,
# 41 stk. 1 and stk. 2 nr. 4 and 10, 42 stk. 1, 67 stk. 3, 82 stk. 1 and 3; Bekendtgørelse om vejafmærkning (BEK 425/2023): § 6
# (temporary signs on a yellow background plate with a black border), § 9 U 4 (a symbol on the plate limits the sign to that
# kind of traffic), § 18 stk. 3 nr. 3 («Varekørsel tilladt»: goods that would be unreasonably hard to carry without the
# vehicle), C 43 (length including load, also combinations), C 51–52 (until an end sign or a distance plate, also past
# junctions; not two-wheeled bicycles and small mopeds), E 33, E 68 (a zone's rules can be changed inside it by local signs),
# E 91 (shows the speed; a white flash above the limit), § 60 T 33 (outside a car park, parking outside marked bays is allowed
# if no other rule forbids it), T 61 (an unbroken yellow kerb line can mark the bus-stop ban), T 63 (a yellow kerb triangle marks
# the end of the stop and parking ban at a junction), § 69 Z 93 (yellow flashing light at working school patrols: special care).
from nq import Q, S, above, picture, town, view

Q(5701, "7.18", town("""
THE SCENE: a town street; ahead on the right a bus stop: a pole with a bus-stop sign stands at the kerb; an unbroken yellow line is
painted along the kerb from about 20 m before the pole to about 20 m after it; a free stretch of kerb inside the yellow-lined part,
some 15 m before the pole; no bus in sight.
MUST BE CLEARLY VISIBLE: the bus-stop sign on its pole, the long unbroken yellow line on the kerb on both sides of it, the free kerb
inside the yellow-lined stretch.
MUST NOT APPEAR: buses, other signs, text."""),
  "Ved et busstoppested er der malet en ubrudt gul linje på kantstenen. Den går ca. 20 m til hver side af stoppestedsskiltet. Du vil "
  "standse 15 m før skiltet og sætte en passager af. Hvad gælder?",
  "At a bus stop an unbroken yellow line is painted on the kerb. It runs about 20 m to each side of the bus-stop sign. You want to "
  "stop 15 m before the sign and let a passenger out. What applies?",
  "کنار یک ایستگاه اتوبوس، خطی زرد و پیوسته روی جدول کشیده شده که از هر طرفِ تابلوی ایستگاه حدود ۲۰ متر ادامه دارد. می‌خواهید ۱۵ متر "
  "پیش از تابلو بایستید و مسافری را پیاده کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke standse nogen steder langs den gule linje.", "I must not stop anywhere along the yellow line.",
    "در هیچ جای امتداد خط زرد نباید توقف کنم.",
    "Ved et busstoppested er det forbudt at standse og parkere på hele den afmærkede strækning, og den ubrudte gule linje markerer "
    "standsningsforbuddet.",
    "At a bus stop, stopping and parking are forbidden along the whole marked stretch, and the unbroken yellow line marks the ban on "
    "stopping.",
    "در ایستگاه اتوبوس، توقف و پارک در تمام طولِ بخشِ علامت‌گذاری‌شده ممنوع است و خط زرد پیوسته همین ممنوعیت توقف را نشان می‌دهد."),
  S(False, "Jeg må godt standse, fordi jeg er mere end 12 m fra skiltet.", "I may stop because I am more than 12 m from the sign.",
    "می‌توانم بایستم، چون بیش از ۱۲ متر از تابلو فاصله دارم.",
    "Reglen om 12 m gælder kun, hvor der ikke er nogen afmærkning; her gælder forbuddet hele den afmærkede strækning.",
    "The 12 m rule only applies where there is no marking; here the ban covers the whole marked stretch.",
    "قاعده‌ی ۱۲ متر فقط جایی است که علامت‌گذاری‌ای نباشد؛ این‌جا ممنوعیت تمام بخش علامت‌گذاری‌شده را می‌گیرد."),
  S(True, "Jeg kører videre og sætter passageren af efter den gule linje, hvor det ellers er tilladt.",
    "I drive on and let the passenger out after the yellow line, where it is otherwise allowed.",
    "ادامه می‌دهم و مسافر را بعد از خط زرد، جایی که از نظر قوانین دیگر مجاز است، پیاده می‌کنم.",
    "Uden for den afmærkede strækning må du standse, hvis ingen anden regel forbyder det.",
    "Outside the marked stretch you may stop if no other rule forbids it.",
    "بیرون از بخش علامت‌گذاری‌شده، اگر قاعده‌ی دیگری منع نکند، می‌توانید بایستید."),
  S(False, "Den gule linje gælder kun, når der holder en bus ved stoppestedet.",
    "The yellow line only applies when a bus is standing at the stop.", "خط زرد فقط وقتی معتبر است که اتوبوسی در ایستگاه ایستاده باشد.",
    "Standsningsforbuddet gælder hele tiden, også når der ikke er nogen bus.", "The ban on stopping applies all the time, also when there is no bus.",
    "ممنوعیت توقف همیشه برقرار است، حتی وقتی هیچ اتوبوسی آن‌جا نیست."),
)

Q(5702, "7.18", town("""
THE SCENE: a town street approaching a junction with a side street on the right; cars are parked along the right kerb up to a point
about 10 m before the corner of the side street; exactly there a small bright yellow triangle is painted on the kerb; between the
triangle and the corner the kerb is free.
MUST BE CLEARLY VISIBLE: the small yellow triangle on the kerb, the empty stretch of kerb between it and the corner.
MUST NOT APPEAR: signs, text, yellow lines."""),
  "På kantstenen før et kryds er der malet en lille gul trekant. Mellem trekanten og hjørnet holder der ingen biler. Hvad betyder trekanten?",
  "Before a junction a small yellow triangle is painted on the kerb. No cars stand between the triangle and the corner. What does the "
  "triangle mean?",
  "پیش از یک تقاطع، مثلث زرد کوچکی روی جدول رنگ شده است. بین مثلث و سرِ نبش هیچ خودرویی پارک نیست. این مثلث چه معنایی دارد؟",
  S(True, "Mellem trekanten og krydset må jeg hverken standse eller parkere.",
    "Between the triangle and the junction I may neither stop nor park.", "بین مثلث و تقاطع نه می‌توانم توقف کنم و نه پارک.",
    "Den gule trekant markerer grænsen for forbuddet mod at standse og parkere inden for 10 m fra den tværgående kørebanes nærmeste kant.",
    "The yellow triangle marks the limit of the ban on stopping and parking within 10 m of the nearest edge of the crossing carriageway.",
    "مثلث زرد مرزِ ممنوعیت توقف و پارک را در فاصله‌ی ۱۰ متری از نزدیک‌ترین لبه‌ی سواره‌روی عرضی نشان می‌دهد."),
  S(False, "Trekanten varsler, at jeg har ubetinget vigepligt i krydset.", "The triangle warns that I must give way unconditionally at the junction.",
    "این مثلث هشدار می‌دهد که در تقاطع حق تقدم مطلق با دیگران است.",
    "Ubetinget vigepligt vises med vigepligtstavle og hajtænder på kørebanen, ikke med en gul trekant på kantstenen.",
    "An unconditional duty to give way is shown by a give-way sign and shark's teeth on the carriageway, not by a yellow triangle on the kerb.",
    "حق تقدم مطلق با تابلوی رعایت حق تقدم و دندان‌کوسه‌ای روی سواره‌رو نشان داده می‌شود، نه با مثلث زرد روی جدول."),
  S(False, "Trekanten viser, at jeg må parkere helt hen til hjørnet.", "The triangle shows that I may park right up to the corner.",
    "این مثلث نشان می‌دهد که می‌توانم تا خودِ سرِ نبش پارک کنم.",
    "Den viser tværtimod, hvor forbudszonen ved krydset begynder.", "On the contrary, it shows where the banned zone at the junction begins.",
    "برعکس، نشان می‌دهد منطقه‌ی ممنوع کنار تقاطع از کجا شروع می‌شود."),
)

Q(5703, "7.18", town("""
THE SCENE: a residential street; along the right kerb parking bays are marked on the carriageway with short white lines; every bay
is occupied; after the last bay the kerb continues without markings, with room for one car, far from the next junction; no signs.
MUST BE CLEARLY VISIBLE: the marked bays with cars in them, the free unmarked kerb after the last bay.
MUST NOT APPEAR: signs, text, yellow lines, driveways."""),
  "Langs kantstenen i en gade er der afmærket parkeringsbåse på kørebanen. Alle båsene er optaget. Efter den sidste bås er der plads "
  "ved kantstenen uden afmærkning. Hvad gælder?",
  "Along the kerb of a street parking bays are marked on the carriageway. All the bays are taken. After the last bay there is room at "
  "the kerb without markings. What applies?",
  "کنار جدول یک خیابان، جاهای پارک روی سواره‌رو خط‌کشی شده‌اند و همه پرند. بعد از آخرین جای پارک، کنار جدول جایی بدون خط‌کشی خالی "
  "است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må parkere uden for båsene, hvis det ikke er forbudt efter andre regler.",
    "I may park outside the bays if it is not forbidden by other rules.", "اگر قانون دیگری منع نکند، می‌توانم بیرون از جاهای خط‌کشی‌شده پارک کنم.",
    "Hvor båse er afmærket på eller ved kørebanen uden for en parkeringsplads, må der parkeres uden for en bås, hvis det ikke strider "
    "mod andre bestemmelser.",
    "Where bays are marked on or by the carriageway outside a car park, you may park outside a bay if this does not break other rules.",
    "جایی که جاهای پارک روی سواره‌رو یا کنار آن، بیرون از یک پارکینگ، خط‌کشی شده‌اند، پارک بیرون از آن‌ها مجاز است، به شرطی که خلاف "
    "قوانین دیگر نباشد."),
  S(True, "Jeg skal stadig holde afstand til kryds og fodgængerfelter og må ikke spærre en indkørsel.",
    "I must still keep my distance from junctions and pedestrian crossings and must not block a driveway.",
    "باز هم باید از تقاطع‌ها و گذرگاه‌های عابر پیاده فاصله بگیرم و نباید جلوی ورودی ملکی را بگیرم.",
    "Reglerne om fx 10 m fra kryds, 5 m før fodgængerfelter og om indkørsler gælder også her.",
    "The rules about, for example, 10 m from junctions, 5 m before pedestrian crossings and driveways apply here too.",
    "قاعده‌هایی مثل ۱۰ متر فاصله از تقاطع، ۵ متر پیش از گذرگاه عابر و ورودی ملک‌ها این‌جا هم برقرارند."),
  S(False, "Jeg må aldrig parkere uden for en bås, når der er afmærket båse i gaden.",
    "I may never park outside a bay when bays are marked in the street.",
    "وقتی در خیابان جای پارک خط‌کشی شده، هرگز نمی‌توانم بیرون از آن‌ها پارک کنم.",
    "Det forbud gælder på en parkeringsplads med afmærkede båse, ikke langs en gade.",
    "That ban applies in a car park with marked bays, not along a street.",
    "این ممنوعیت برای پارکینگی با جاهای خط‌کشی‌شده است، نه کنار خیابان."),
  S(False, "Jeg må parkere i anden række ved siden af bilerne i båsene.", "I may park in a second row beside the cars in the bays.",
    "می‌توانم در ردیف دوم، کنار خودروهای داخل جاهای پارک، پارک کنم.",
    "Det er forbudt at parkere ved siden af et andet køretøj, der holder ved kørebanens kant.",
    "It is forbidden to park beside another vehicle that stands at the edge of the carriageway.",
    "پارک کردن کنار خودروی دیگری که لبه‌ی سواره‌رو ایستاده ممنوع است."),
)

Q(5704, "7.18", above("""
THE SCENE: a narrow residential street seen from above, running up the picture; on the LEFT side a driveway leads from a house
across the pavement onto the street; on the RIGHT side, exactly opposite the driveway, a free space at the kerb; the street is so
narrow that a car parked there would leave little room for a car turning out of the driveway.
VEHICLES (colour code used strictly): a RED car (ours) slowing beside the free space with its right indicator flashing; a grey car
standing in the driveway, ready to drive out.
MUST NOT APPEAR: signs, text."""),
  "Gaden er smal. Du vil parkere ved kantstenen lige over for en indkørsel i den anden side af gaden. Holder du der, bliver det meget "
  "svært for bilerne fra indkørslen at komme ud. Hvad gælder?",
  "The street is narrow. You want to park at the kerb right opposite a driveway on the other side of the street. If you stand there, "
  "it becomes very hard for the cars from the driveway to get out. What applies?",
  "خیابان باریک است. می‌خواهید کنار جدول، درست روبه‌روی ورودی ملکی در آن طرف خیابان، پارک کنید. اگر آن‌جا بایستید، بیرون آمدن از آن ورودی "
  "برای خودروها خیلی سخت می‌شود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke parkere der.", "I must not park there.", "نباید آن‌جا پارک کنم.",
    "Parkering må ikke ske, så kørsel til eller fra en ejendom væsentligt vanskeliggøres, heller ikke fra den anden side af vejen.",
    "Parking must not make driving to or from a property substantially harder, not even from the other side of the road.",
    "پارک نباید رفت‌وآمد به یک ملک را به‌طور جدی دشوار کند، حتی اگر از آن طرف خیابان باشد."),
  S(False, "Det er kun forbudt at parkere lige ud for en indkørsel i samme side af vejen.",
    "It is only forbidden to park right in front of a driveway on the same side of the road.",
    "فقط پارک درست جلوی ورودیِ همان سمت خیابان ممنوع است.",
    "Forbuddet gælder også, hvor du på anden måde gør det væsentligt sværere at køre ind eller ud, fx over for en indkørsel på en smal vej.",
    "The ban also applies where you make it substantially harder in another way to drive in or out, for example opposite a driveway on "
    "a narrow road.",
    "این ممنوعیت جایی هم هست که به شکل دیگری ورود یا خروج را به‌طور جدی سخت کنید، مثلاً روبه‌روی یک ورودی در خیابانی باریک."),
  S(True, "Jeg finder en plads, hvor jeg ikke spærrer for andre.", "I find a space where I do not block others.",
    "جایی پیدا می‌کنم که راه دیگران را نبندم.",
    "Parkering må ikke ske, så der opstår fare eller ulempe for færdslen.", "Parking must not cause danger or inconvenience to the traffic.",
    "پارک نباید برای ترافیک خطر یا مزاحمت ایجاد کند."),
  S(False, "Det er tilladt, hvis jeg lægger en seddel med mit telefonnummer i forruden.",
    "It is allowed if I leave a note with my phone number behind the windscreen.",
    "اگر یادداشتی با شماره‌ی تلفنم پشت شیشه‌ی جلو بگذارم، مجاز است.",
    "En seddel ændrer ikke på, at du gør det svært for andre at komme ud.",
    "A note does not change the fact that you make it hard for others to get out.",
    "یک یادداشت این را تغییر نمی‌دهد که بیرون آمدن را برای دیگران سخت کرده‌اید."),
)

Q(5705, "7.18", view("""
THE SCENE: a rest area beside a country road; at the start of a long, empty parking strip stands a blue square sign with a white
«P», and under it a blue rectangular plate with a white bus symbol; next to the strip a smaller car park with marked bays for cars.
MUST BE CLEARLY VISIBLE: the P sign with the bus plate, the empty strip, the car park for cars beside it.
MUST NOT APPEAR: other signs, any text except the P."""),
  "På en rasteplads står denne tavle ved et langt, tomt parkeringsareal. Du kører i personbil. Hvad gælder?",
  "At a rest area this sign stands beside a long, empty parking area. You are driving a car. What applies?",
  "در یک استراحتگاه بین‌راهی، این تابلو کنار محوطه‌ی پارکی دراز و خالی قرار دارد. با خودروی سواری هستید. چه قاعده‌ای برقرار است؟",
  S(True, "Arealet er kun beregnet til parkering af busser.", "The area is only meant for parking buses.",
    "این محوطه فقط برای پارک اتوبوس‌هاست.",
    "Et symbol på undertavlen viser, at tavlens angivelse kun gælder for den viste færdselsart, her busser.",
    "A symbol on the plate shows that the sign only applies to the kind of traffic shown, here buses.",
    "نماد روی زیرتابلو نشان می‌دهد که حکم تابلو فقط برای همان نوع وسیله است؛ این‌جا اتوبوس."),
  S(False, "Jeg må parkere der, når der ikke holder nogen busser.", "I may park there when no buses are standing there.",
    "وقتی هیچ اتوبوسی آن‌جا نیست، می‌توانم پارک کنم.",
    "Arealet er forbeholdt busser, også når det er tomt.", "The area is reserved for buses, also when it is empty.",
    "این محوطه حتی وقتی خالی است هم مخصوص اتوبوس‌هاست."),
  S(False, "Undertavlen viser, at busser ikke må parkere der.", "The plate shows that buses must not park there.",
    "زیرتابلو نشان می‌دهد که اتوبوس‌ها نباید آن‌جا پارک کنند.",
    "Symbolet begrænser parkeringen til busser; det forbyder dem ikke.", "The symbol limits the parking to buses; it does not forbid them.",
    "این نماد پارک را به اتوبوس‌ها محدود می‌کند؛ آن‌ها را منع نمی‌کند."),
  S(False, "Jeg må parkere der, hvis bilen er lang, fx med en trailer koblet på.",
    "I may park there if the car is long, for example with a trailer coupled on.",
    "اگر خودرو بلند باشد، مثلاً یدک‌کش داشته باشد، می‌توانم آن‌جا پارک کنم.",
    "Det er køretøjsarten, der tæller; en personbil med trailer er ikke en bus.",
    "It is the kind of vehicle that counts; a car with a trailer is not a bus.",
    "نوع وسیله ملاک است؛ خودروی سواری با یدک، اتوبوس نیست."),
)

Q(5706, "7.18", town("""
THE SCENE: a street in a town centre; at the right kerb stands a blue square sign with a white «P», and under it a blue rectangular
plate with the white text «2 timer» and a small white parking-disc symbol; cars are parked along the kerb beyond the sign.
MUST BE CLEARLY VISIBLE: the P sign with its plate, the parked cars.
MUST NOT APPEAR: other signs, any text except the P and «2 timer»."""),
  "Ved indkørslen til bymidten kørte du forbi en zonetavle med parkeringsforbud. I en af gaderne i zonen står denne P-tavle med "
  "undertavlen »2 timer« og et symbol for P-skive. Hvad gælder?",
  "At the entrance to the town centre you passed a zone sign with a parking ban. In one of the streets in the zone stands this P sign "
  "with the plate «2 timer» (2 hours) and a parking-disc symbol. What applies?",
  "هنگام ورود به مرکز شهر از کنار تابلوی منطقه‌ای با ممنوعیت پارک گذشتید. در یکی از خیابان‌های این منطقه، این تابلوی P با زیرتابلوی "
  "«۲ ساعت» و نماد کارت زمان پارک قرار دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må parkere her i højst 2 timer.", "I may park here for at most 2 hours.", "این‌جا حداکثر ۲ ساعت می‌توانم پارک کنم.",
    "Inden for en zone kan zonetavlens bestemmelser fraviges ved lokal afmærkning, fx en P-tavle.",
    "Inside a zone, the zone sign's rules can be changed by local signs, for example a P sign.",
    "داخل یک منطقه، قاعده‌های تابلوی منطقه را می‌توان با علامت‌گذاری محلی، مثلاً تابلوی P، تغییر داد."),
  S(True, "Jeg skal stille P-skiven, når jeg parkerer.", "I must set the parking disc when I park.",
    "وقتی پارک می‌کنم، باید کارت زمان پارک را تنظیم کنم.",
    "Symbolet for P-skive på undertavlen viser, at du skal vise parkeringstiden med P-skive.",
    "The parking-disc symbol on the plate shows that you must show the parking time with a parking disc.",
    "نماد کارت زمان پارک روی زیرتابلو نشان می‌دهد که باید زمان پارک را با این کارت نشان دهید."),
  S(True, "Hvor der ikke er skiltet andet, gælder zonens parkeringsforbud stadig.",
    "Where nothing else is signed, the zone's parking ban still applies.", "جایی که تابلوی دیگری نیست، ممنوعیت پارکِ منطقه هنوز برقرار است.",
    "Zonetavlens bestemmelser gælder i hele området, indtil zonen ophører, medmindre lokal afmærkning siger noget andet.",
    "The zone sign's rules apply throughout the area until the zone ends, unless local signs say otherwise.",
    "قاعده‌های تابلوی منطقه در کل محدوده تا پایان منطقه برقرارند، مگر علامت‌گذاری محلی چیز دیگری بگوید."),
  S(False, "Zonens parkeringsforbud går altid forud for P-tavlen.", "The zone's parking ban always comes before the P sign.",
    "ممنوعیت پارکِ منطقه همیشه بر تابلوی P مقدم است.",
    "Det er omvendt: lokal afmærkning inden for zonen kan fravige zonetavlens regler.",
    "It is the other way round: local signs inside the zone can change the zone sign's rules.",
    "برعکس است: علامت‌گذاری محلی داخل منطقه می‌تواند قاعده‌های تابلوی منطقه را تغییر دهد."),
)

Q(5707, "7.9", view("""
THE SCENE: a two-lane country road with a broken white centre line; a slow white van drives ahead of us; a small side road joins
from the right a little behind us; the road ahead is straight and empty of oncoming traffic.
MUST BE CLEARLY VISIBLE: the broken centre line, the slow van ahead, the side road just behind us on the right.
MUST NOT APPEAR: signs, text."""),
  "For 2 km siden kørte du forbi en tavle med overhaling forbudt. Siden er du kørt gennem et kryds, og nu er midterlinjen punkteret. Du "
  "har ikke set nogen tavle for ophør af forbuddet. Foran dig kører en langsom varevogn. Hvad gælder?",
  "2 km ago you passed a no-overtaking sign. Since then you have driven through a junction, and now the centre line is broken. You "
  "have not seen any sign ending the ban. A slow van drives in front of you. What applies?",
  "۲ کیلومتر پیش از کنار تابلوی سبقت ممنوع گذشتید. از آن موقع از یک تقاطع رد شده‌اید و حالا خط وسط جاده بریده‌بریده است. هیچ تابلوی "
  "پایان ممنوعیت ندیده‌اید. جلوی شما یک ون آهسته حرکت می‌کند. چه قاعده‌ای برقرار است؟",
  S(True, "Overhalingsforbuddet gælder stadig.", "The overtaking ban still applies.", "ممنوعیت سبقت هنوز برقرار است.",
    "Et overhalingsforbud gælder, indtil det ophæves med en ophørstavle eller ved en afstand på en undertavle; det ophører ikke ved et kryds.",
    "An overtaking ban applies until it is lifted by an end sign or by a distance on a plate; it does not end at a junction.",
    "ممنوعیت سبقت تا وقتی با تابلوی پایان یا با فاصله‌ای که روی زیرتابلو آمده لغو نشود، برقرار است؛ با رسیدن به تقاطع تمام نمی‌شود."),
  S(False, "Den punkterede midterlinje ophæver forbuddet.", "The broken centre line lifts the ban.", "خط وسطِ بریده‌بریده ممنوعیت را لغو می‌کند.",
    "Afmærkningen på kørebanen ophæver ikke tavlens forbud.", "The road marking does not lift the sign's ban.",
    "خط‌کشی روی سواره‌رو ممنوعیتِ تابلو را لغو نمی‌کند."),
  S(False, "Forbuddet ophørte ved krydset, så jeg må overhale varevognen.", "The ban ended at the junction, so I may overtake the van.",
    "ممنوعیت در تقاطع تمام شد، پس می‌توانم از ون سبقت بگیرم.",
    "I modsætning til mange andre forbud gælder overhalingsforbuddet også efter vejkryds.",
    "Unlike many other bans, the overtaking ban also applies after junctions.",
    "برخلاف بسیاری از ممنوعیت‌های دیگر، ممنوعیت سبقت بعد از تقاطع هم برقرار است."),
  S(True, "Jeg må gerne overhale en tohjulet cykel på strækningen, hvis det kan ske uden fare.",
    "I may overtake a two-wheeled bicycle on the stretch if it can be done without danger.",
    "در این مسیر می‌توانم از دوچرخه‌ی دوچرخ سبقت بگیرم، اگر بی‌خطر باشد.",
    "Overhalingsforbuddet gælder ikke overhaling af tohjulede cykler og tohjulede små knallerter.",
    "The overtaking ban does not apply to overtaking two-wheeled bicycles and two-wheeled small mopeds.",
    "ممنوعیت سبقت شامل سبقت از دوچرخه‌های دوچرخ و موتورگازی‌های کوچکِ دوچرخ نمی‌شود."),
)

Q(5708, "7.9", view("""
THE SCENE: a road approaching an unsigned junction with a side road on the right about 30 m ahead; in front of us a rider on a large
moped (a sturdy scooter with a small number plate) rides at the right edge; no oncoming traffic.
MUST BE CLEARLY VISIBLE: the moped rider ahead, the side road just ahead on the right.
MUST NOT APPEAR: signs, text, shark's teeth."""),
  "Lige før et kryds uden tavler kører en stor knallert foran dig. Den kører omkring 40 km/t. Hvad gælder for overhaling?",
  "Just before a junction without signs a large moped rides in front of you. It is doing about 40 km/h. What applies to overtaking?",
  "درست پیش از تقاطعی بدون تابلو، یک موتورگازی بزرگ جلوی شما با سرعت حدود ۴۰ کیلومتر در ساعت می‌رود. درباره‌ی سبقت چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg må ikke overhale den lige før eller i krydset.", "I must not overtake it just before or in the junction.",
    "درست پیش از تقاطع یا داخل آن نباید از آن سبقت بگیرم.",
    "Overhaling lige før og i et kryds er forbudt; undtagelsen gælder kun tohjulede cykler og tohjulede små knallerter.",
    "Overtaking just before and in a junction is forbidden; the exception only covers two-wheeled bicycles and two-wheeled small mopeds.",
    "سبقت درست پیش از تقاطع و داخل آن ممنوع است؛ استثنا فقط برای دوچرخه‌ها و موتورگازی‌های کوچکِ دوچرخ است."),
  S(False, "Jeg må overhale, fordi alle knallerter er undtaget fra forbuddet.", "I may overtake because all mopeds are exempt from the ban.",
    "می‌توانم سبقت بگیرم، چون همه‌ی موتورگازی‌ها از این ممنوعیت مستثنا هستند.",
    "Undtagelsen gælder kun lille knallert, ikke stor knallert.", "The exception only covers small mopeds, not large mopeds.",
    "این استثنا فقط برای موتورگازی کوچک است، نه بزرگ."),
  S(True, "Jeg venter med at overhale, til jeg er kommet igennem krydset, og det kan ske uden fare.",
    "I wait to overtake until I am through the junction and it can be done without danger.",
    "صبر می‌کنم تا از تقاطع رد شوم و سبقت بی‌خطر ممکن شود.",
    "Efter krydset gælder de almindelige regler for overhaling igen.", "After the junction the ordinary rules for overtaking apply again.",
    "بعد از تقاطع، قاعده‌های معمولِ سبقت دوباره برقرارند."),
  S(False, "Jeg må overhale, når der ikke kommer nogen ad sidevejen.", "I may overtake when nobody is coming along the side road.",
    "وقتی کسی از راه فرعی نمی‌آید، می‌توانم سبقت بگیرم.",
    "Forbuddet gælder, uanset om der er trafik på sidevejen.", "The ban applies whether or not there is traffic on the side road.",
    "این ممنوعیت برقرار است، چه در راه فرعی ترافیکی باشد چه نباشد."),
)

Q(5709, "7.9", view("""
THE SCENE: a two-lane country road in thick fog; a lorry drives ahead of us at a distance, its rear lights glowing; beyond it the road
disappears in the fog after about 100 m.
MUST BE CLEARLY VISIBLE: the lorry ahead with its rear lights, the fog hiding the road beyond.
MUST NOT APPEAR: signs, text, oncoming vehicles.""", cond="thick fog, wet road"),
  "Der er tæt tåge, og du kan se omkring 100 m frem. Foran dig kører en lastbil 70 km/t, hvor grænsen er 80 km/t. Du vil gerne overhale. "
  "Hvad gælder?",
  "There is thick fog, and you can see about 100 m ahead. In front of you a lorry is doing 70 km/h where the limit is 80 km/h. You "
  "would like to overtake. What applies?",
  "مه غلیظی است و حدود ۱۰۰ متر جلو را می‌بینید. جلوی شما کامیونی با ۷۰ کیلومتر در ساعت می‌رود، جایی که حداکثر سرعت ۸۰ است. دلتان "
  "می‌خواهد سبقت بگیرید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg overhaler ikke, fordi jeg ikke kan se, om vejen er fri for modkørende langt nok frem.",
    "I do not overtake, because I cannot see whether the road is clear of oncoming traffic far enough ahead.",
    "سبقت نمی‌گیرم، چون نمی‌بینم جاده به اندازه‌ی کافی از خودروهای روبه‌رو خالی است یا نه.",
    "Før en overhaling skal du sikre dig, at vognbanen er fri for modkørende på en tilstrækkeligt lang strækning; det kan du ikke i tæt tåge.",
    "Before overtaking you must make sure the lane is clear of oncoming traffic for a long enough stretch; you cannot in thick fog.",
    "پیش از سبقت باید مطمئن شوید که خط به اندازه‌ی کافی از ترافیک روبه‌رو خالی است؛ در مه غلیظ نمی‌توانید."),
  S(False, "Med tågelygterne tændt kan de modkørende se mig, så jeg kan godt overhale.",
    "With the fog lamps on, oncoming drivers can see me, so I can overtake.",
    "با چراغ‌های مه‌شکنِ روشن، رانندگان روبه‌رو مرا می‌بینند، پس می‌توانم سبقت بگیرم.",
    "At andre kan se dig, betyder ikke, at du kan se, om der er plads til overhalingen.",
    "That others can see you does not mean that you can see whether there is room to overtake.",
    "این‌که دیگران شما را ببینند، به این معنا نیست که شما می‌بینید جای سبقت هست."),
  S(True, "Jeg holder god afstand til lastbilen.", "I keep a good distance from the lorry.", "از کامیون فاصله‌ی کافی نگه می‌دارم.",
    "I tåge skal du kunne nå at standse, hvis lastbilen bremser, og tæt bag den ser du heller ikke mere.",
    "In fog you must be able to stop in time if the lorry brakes, and close behind it you see no more anyway.",
    "در مه باید بتوانید به‌موقع بایستید اگر کامیون ترمز کرد، و نزدیکِ آن هم چیز بیشتری نمی‌بینید."),
  S(False, "Jeg kører tæt på lastbilen, så jeg kan bruge dens baglygter til at se, hvor vejen går.",
    "I drive close to the lorry so that I can use its rear lights to see where the road goes.",
    "نزدیکِ کامیون می‌رانم تا از چراغ‌های عقبش بفهمم جاده کجا می‌رود.",
    "Så kan du ikke nå at standse, hvis den bremser.", "Then you cannot stop in time if it brakes.",
    "در این صورت اگر ترمز کند، نمی‌توانید به‌موقع بایستید."),
)

Q(5710, "7.9", view("""
THE SCENE: a country road with two lanes in our direction, separated from the single oncoming lane by a central safety barrier; we
drive in the left of our two lanes beside a slow lorry in the right lane; ahead a blue rectangular sign shows two white arrows where
the left one bends into the right one, and the lane markings show that our left lane ends about 300 m ahead.
MUST BE CLEARLY VISIBLE: the central barrier, the lorry in the right lane, the blue sign showing the left lane ending.
MUST NOT APPEAR: other signs, text."""),
  "Du kører på en vej, hvor der i din retning er to vognbaner, adskilt fra de modkørende med et autoværn. Om 300 m ophører den venstre "
  "vognbane. Du vil overhale en lastbil, der kører 70 km/t. Hvad gælder?",
  "You are driving on a road with two lanes in your direction, separated from oncoming traffic by a safety barrier. In 300 m the left "
  "lane ends. You want to overtake a lorry doing 70 km/h. What applies?",
  "در جاده‌ای هستید که در جهت شما دو خط دارد و با گاردریل از خودروهای روبه‌رو جدا شده است. ۳۰۰ متر جلوتر خط چپ تمام می‌شود. "
  "می‌خواهید از کامیونی که با ۷۰ کیلومتر در ساعت می‌رود سبقت بگیرید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg begynder kun at overhale, hvis jeg kan nå forbi og ind foran lastbilen, før min vognbane ophører.",
    "I only start overtaking if I can get past and in front of the lorry before my lane ends.",
    "فقط وقتی سبقت را شروع می‌کنم که بتوانم پیش از تمام شدن خطم از کامیون بگذرم و جلویش برگردم.",
    "Når vognbanen ophører, skal du kunne komme ind i den højre vognbane uden fare; ellers er overhalingen ikke sikker.",
    "When the lane ends you must be able to get into the right lane without danger; otherwise the overtaking is not safe.",
    "وقتی خط تمام می‌شود، باید بتوانید بی‌خطر به خط راست بروید؛ وگرنه سبقت امن نیست."),
  S(True, "Kan jeg ikke nå det, bliver jeg bag lastbilen og venter på en strækning, hvor der er plads.",
    "If I cannot make it, I stay behind the lorry and wait for a stretch where there is room.",
    "اگر نرسم، پشت کامیون می‌مانم و منتظر بخشی از جاده می‌شوم که جا باشد.",
    "Det er sikrere end at presse dig ind foran lastbilen der, hvor vognbanen ophører.",
    "That is safer than squeezing in front of the lorry where the lane ends.",
    "این امن‌تر از آن است که جایی که خط تمام می‌شود خودتان را به‌زور جلوی کامیون جا بدهید."),
  S(False, "Lastbilen skal altid lukke mig ind, når min vognbane ophører.", "The lorry must always let me in when my lane ends.",
    "وقتی خطم تمام می‌شود، کامیون همیشه باید جا بدهد که وارد شوم.",
    "Hvor antallet af vognbaner bliver mindre, skal de kørende tilpasse sig under gensidig hensyntagen; ingen har ret til at blive lukket ind.",
    "Where the number of lanes falls, drivers must adapt with mutual consideration; nobody has a right to be let in.",
    "جایی که تعداد خط‌ها کم می‌شود، رانندگان باید با ملاحظه‌ی متقابل خود را تطبیق دهند؛ هیچ‌کس حقِ وارد شدن ندارد."),
  S(True, "Når jeg skal ind foran lastbilen, blinker jeg til højre i god tid.",
    "When I am to move in front of the lorry, I signal right in good time.", "وقتی می‌خواهم جلوی کامیون بروم، به‌موقع راهنمای راست می‌زنم.",
    "Ved vognbaneskift skal du give tegn, når det er nødvendigt for at vejlede de andre, og det er det her.",
    "When changing lanes you must signal when it is needed to guide others, and it is needed here.",
    "هنگام تغییر خط، وقتی برای راهنمایی دیگران لازم است باید علامت بدهید، و این‌جا لازم است."),
)

Q(5711, "7.9", town("""
THE SCENE: a town road with two lanes in our direction separated by a broken white line, approaching a junction without traffic
lights; white road arrows in both lanes point straight ahead; a slow van drives in the right lane; we drive in the left lane just
behind it.
MUST BE CLEARLY VISIBLE: the two lanes with their straight-ahead arrows, the slow van in the right lane, the junction ahead.
MUST NOT APPEAR: traffic lights, signs, text."""),
  "Før et kryds uden lyssignal har vejen to vognbaner i din retning, og pilene viser ligeud i begge. Du kører i venstre vognbane, og en "
  "langsom varevogn kører i højre vognbane. I skal begge ligeud. Hvad gælder?",
  "Before a junction without traffic lights the road has two lanes in your direction, and the arrows show straight ahead in both. You "
  "are in the left lane, and a slow van is in the right lane. You are both going straight on. What applies?",
  "پیش از تقاطعی بدون چراغ راهنمایی، جاده در جهت شما دو خط دارد و فلش‌های هر دو خط مستقیم را نشان می‌دهند. شما در خط چپ هستید و یک "
  "ون آهسته در خط راست. هر دو مستقیم می‌روید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må godt køre forbi varevognen i krydset, fordi vi er i hver sin vognbane i samme retning.",
    "I may pass the van in the junction because we are in separate lanes for the same direction.",
    "می‌توانم داخل تقاطع از ون بگذرم، چون هر کدام در خطی جدا و هم‌جهت هستیم.",
    "Forbuddet mod overhaling i kryds gælder ikke, når køretøjerne er i vognbaner, der er forbeholdt færdslen i samme retning.",
    "The ban on overtaking in junctions does not apply when the vehicles are in lanes reserved for traffic in the same direction.",
    "ممنوعیت سبقت در تقاطع وقتی که وسیله‌ها در خط‌های مخصوص یک جهت هستند، اعمال نمی‌شود."),
  S(False, "Det er altid forbudt at overhale i et kryds uden lyssignal.", "It is always forbidden to overtake in a junction without traffic lights.",
    "سبقت در تقاطعِ بدون چراغ همیشه ممنوع است.",
    "Der er undtagelser, fx når der er flere vognbaner i samme retning.", "There are exceptions, for example when there are several lanes in the same direction.",
    "استثناهایی وجود دارد، مثلاً وقتی چند خطِ هم‌جهت هست."),
  S(True, "Jeg holder øje med, om varevognen pludselig skifter vognbane eller svinger.",
    "I watch whether the van suddenly changes lanes or turns.", "مراقبم که ون ناگهان خط عوض نکند یا نپیچد.",
    "Overhaling skal kunne ske uden fare, også i krydset.", "Overtaking must be possible without danger, also in the junction.",
    "سبقت باید بی‌خطر باشد، داخل تقاطع هم."),
  S(False, "Jeg skal holde tilbage for varevognen, fordi den er til højre for mig.", "I must give way to the van because it is on my right.",
    "باید به ون حق تقدم بدهم، چون سمت راست من است.",
    "Vigepligten over for højre gælder, når kørendes retninger skærer hinanden, ikke for to biler, der kører ligeud ved siden af hinanden.",
    "Giving way to the right applies when drivers' paths cross, not to two cars driving straight on side by side.",
    "حق تقدمِ سمت راست وقتی است که مسیر رانندگان همدیگر را قطع کند، نه برای دو خودرو که کنار هم مستقیم می‌روند."),
)

Q(5712, "6.1", town("""
THE SCENE: the entrance to a narrow shopping street; at the entrance stands a round sign with a red border and a white centre showing
a black car above a black motorcycle; under it a white rectangular plate with the black text «Varekørsel tilladt»; shops along the
street, a few pedestrians.
MUST BE CLEARLY VISIBLE: the round sign with the car and motorcycle, the plate with its text.
MUST NOT APPEAR: other signs, any other text."""),
  "Ved indkørslen til en gade står denne tavle med undertavlen »Varekørsel tilladt«. Hvad gælder?",
  "At the entrance to a street stands this sign with the plate «Varekørsel tilladt» (delivery of goods allowed). What applies?",
  "در ورودی یک خیابان این تابلو با زیرتابلوی «Varekørsel tilladt» (رفت‌وآمد برای تحویل کالا مجاز است) قرار دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må køre ind for at aflevere en vaskemaskine i et af husene.", "I may drive in to deliver a washing machine to one of the houses.",
    "می‌توانم برای تحویل یک ماشین لباس‌شویی به یکی از خانه‌ها وارد شوم.",
    "Varekørsel er kørsel for at aflevere eller afhente varer, som det vil være urimeligt besværligt at bringe uden bilen.",
    "Delivery driving means driving to deliver or collect goods that would be unreasonably hard to bring without the vehicle.",
    "رفت‌وآمد برای کالا یعنی رانندگی برای تحویل یا برداشتن کالایی که بردنش بدون خودرو بی‌اندازه سخت باشد."),
  S(False, "Jeg må køre ind for at købe en avis i kiosken.", "I may drive in to buy a newspaper at the kiosk.",
    "می‌توانم برای خریدن روزنامه از کیوسک وارد شوم.",
    "En avis kan let bæres, så det er ikke varekørsel.", "A newspaper is easy to carry, so it is not delivery driving.",
    "روزنامه را به‌راحتی می‌شود حمل کرد، پس این رفت‌وآمد برای کالا نیست."),
  S(True, "Jeg må køre ind for at hente en stor kasse med fliser i en butik i gaden.",
    "I may drive in to collect a big box of tiles from a shop in the street.",
    "می‌توانم برای برداشتن جعبه‌ی بزرگی از کاشی از مغازه‌ای در این خیابان وارد شوم.",
    "Tunge eller store varer, som ikke med rimelighed kan bæres, må hentes i bil, når varekørsel er tilladt.",
    "Heavy or bulky goods that cannot reasonably be carried may be collected by car when delivery driving is allowed.",
    "کالای سنگین یا حجیمی را که منطقی نیست با دست برد، وقتی رفت‌وآمد برای کالا مجاز است می‌توان با خودرو برداشت."),
  S(False, "Jeg må køre ind og parkere, mens jeg spiser frokost på en café i gaden.",
    "I may drive in and park while I have lunch at a café in the street.",
    "می‌توانم وارد شوم و تا وقتی در کافه‌ای در این خیابان ناهار می‌خورم، پارک کنم.",
    "Det er ikke varekørsel at parkere for at besøge en café.", "Parking to visit a café is not delivery driving.",
    "پارک کردن برای رفتن به کافه رفت‌وآمد برای کالا نیست."),
)

Q(5713, "6.1", view("""
THE SCENE: a country road; at the entrance to a narrow side road on the right stands a round sign with a red border and a white
centre showing a black lorry silhouette with short horizontal arrow marks at its front and rear and the text «10 m» below it.
MUST BE CLEARLY VISIBLE: the round length-limit sign with «10 m», the narrow side road.
MUST NOT APPEAR: other signs, any other text."""),
  "Du kører bil med campingvogn, og hele vogntoget er 11,5 m langt. Ved indkørslen til en smal vej står denne tavle. Hvad gælder?",
  "You are driving a car with a caravan, and the whole combination is 11.5 m long. At the entrance to a narrow road stands this sign. "
  "What applies?",
  "با خودرویی که کاروان یدک می‌کشد رانندگی می‌کنید و طول کل مجموعه ۱۱٫۵ متر است. در ورودی جاده‌ای باریک این تابلو قرار دارد. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre ind ad vejen med campingvognen.", "I must not drive into the road with the caravan.",
    "با کاروان نباید وارد این جاده شوم.",
    "Tavlen forbyder kørsel med køretøjer og vogntog, hvis længde inklusive læs er større end den angivne.",
    "The sign forbids driving with vehicles and combinations whose length including the load is greater than shown.",
    "این تابلو رانندگیِ وسیله‌ها و مجموعه‌هایی را که طولشان با بار بیشتر از عدد تابلوست ممنوع می‌کند."),
  S(False, "Tavlen gælder kun lastbiler, så jeg må godt køre ind.", "The sign only applies to lorries, so I may drive in.",
    "این تابلو فقط برای کامیون‌هاست، پس می‌توانم وارد شوم.",
    "Forbuddet gælder alle køretøjer og vogntog, der er længere end angivet, også bil med campingvogn.",
    "The ban applies to all vehicles and combinations longer than shown, also a car with a caravan.",
    "این ممنوعیت برای همه‌ی وسیله‌ها و مجموعه‌های بلندتر از عدد تابلوست، خودرو با کاروان هم."),
  S(False, "Det er kun bilens egen længde, der tæller.", "Only the car's own length counts.", "فقط طول خودِ خودرو حساب می‌شود.",
    "For et vogntog er det hele vogntogets længde, der tæller.", "For a combination, the length of the whole combination counts.",
    "برای یک مجموعه، طول کل مجموعه ملاک است."),
)

Q(5714, "6.1", view("""
THE SCENE: a country road with road works ahead: orange cones narrow the road, a work vehicle with a flashing amber light stands far
ahead, two workers in orange suits beside it; on the right stands a round speed-limit sign showing 50, mounted on a yellow rectangular
background plate with a black border.
MUST BE CLEARLY VISIBLE: the 50 sign on its yellow background plate with the black border, the road works ahead.
MUST NOT APPEAR: other signs, any text except 50."""),
  "Ved et vejarbejde står denne tavle. Hvad gælder?",
  "This sign stands at road works. What applies?",
  "کنار یک محل کار جاده‌ای این تابلو قرار دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Den gule baggrund viser, at det er en midlertidig tavle.", "The yellow background shows that it is a temporary sign.",
    "زمینه‌ی زرد نشان می‌دهد که این تابلو موقت است.",
    "Midlertidige færdselstavler sættes op på en gul baggrundsplade med sort kant.",
    "Temporary traffic signs are put up on a yellow background plate with a black border.",
    "تابلوهای موقت روی صفحه‌ای زرد با حاشیه‌ی سیاه نصب می‌شوند."),
  S(True, "Jeg må højst køre 50 km/t, så længe tavlen gælder.", "I may drive at most 50 km/h as long as the sign applies.",
    "تا وقتی این تابلو معتبر است، حداکثر ۵۰ کیلومتر در ساعت می‌توانم برانم.",
    "En midlertidig tavle har samme betydning som en almindelig tavle og skal overholdes.",
    "A temporary sign has the same meaning as an ordinary sign and must be obeyed.",
    "تابلوی موقت همان معنای تابلوی معمولی را دارد و باید رعایت شود."),
  S(False, "Det er kun en anbefaling, fordi tavlen sidder på en gul plade.", "It is only a recommendation because the sign is on a yellow plate.",
    "چون تابلو روی صفحه‌ی زرد است، فقط یک توصیه است.",
    "Den gule baggrund ændrer ikke tavlens betydning; det er en hastighedsgrænse.",
    "The yellow background does not change the sign's meaning; it is a speed limit.",
    "زمینه‌ی زرد معنای تابلو را تغییر نمی‌دهد؛ این یک حد سرعت است."),
  S(False, "Tavlen gælder kun lastbiler og vejarbejdskøretøjer.", "The sign only applies to lorries and road-works vehicles.",
    "این تابلو فقط برای کامیون‌ها و وسیله‌های کار جاده‌ای است.",
    "Tavlen gælder al trafik i kørselsretningen.", "The sign applies to all traffic in the direction of travel.",
    "این تابلو برای همه‌ی ترافیکِ این جهت است."),
)

Q(5715, "6.1", town("""
THE SCENE: a residential street in town; a little ahead on the right a round speed-limit sign 50; after it, beside the road, an
electronic speed display panel showing «58» in bright lit digits, with a white light flashing on the panel.
MUST BE CLEARLY VISIBLE: the 50 sign, the electronic panel with «58», the white flash on the panel.
MUST NOT APPEAR: other signs, any other text."""),
  "Du kører i byen, hvor grænsen er 50 km/t, og kommer forbi denne tavle. Den viser 58, og et hvidt lys blinker. Hvad betyder det?",
  "You are driving in town where the limit is 50 km/h and pass this sign. It shows 58, and a white light is flashing. What does it mean?",
  "در شهر، جایی که حداکثر سرعت ۵۰ کیلومتر در ساعت است، از کنار این تابلو می‌گذرید. عدد ۵۸ را نشان می‌دهد و نوری سفید چشمک می‌زند. "
  "معنایش چیست؟",
  S(True, "Tallet på tavlen er min egen hastighed.", "The number on the sign is my own speed.", "عدد روی تابلو سرعت خودِ من است.",
    "En fartviser viser hastigheden.", "A speed display shows the speed.", "نمایشگر سرعت، سرعت را نشان می‌دهد."),
  S(True, "Det hvide blink betyder, at jeg kører hurtigere end tilladt.", "The white flash means that I am driving faster than allowed.",
    "چشمک سفید یعنی تندتر از حد مجاز می‌رانم.",
    "Fartviseren blinker hvidt, når den registrerer en hastighed over den tilladte.",
    "The speed display flashes white when it registers a speed above the permitted one.",
    "نمایشگر سرعت وقتی سرعتی بالاتر از حد مجاز ثبت کند، سفید چشمک می‌زند."),
  S(True, "Jeg sætter farten ned til højst 50 km/t.", "I slow down to at most 50 km/h.", "سرعتم را به حداکثر ۵۰ کیلومتر در ساعت کم می‌کنم.",
    "Grænsen gælder, og fartviseren viser, at du er over den.", "The limit applies, and the display shows that you are above it.",
    "حد سرعت برقرار است و نمایشگر نشان می‌دهد که از آن بالاترید."),
  S(False, "Tavlen viser den nye hastighedsgrænse for strækningen.", "The sign shows the new speed limit for the stretch.",
    "این تابلو حد سرعت جدیدِ این مسیر را نشان می‌دهد.",
    "Fartviseren viser din fart, ikke en hastighedsgrænse.", "The speed display shows your speed, not a speed limit.",
    "نمایشگر سرعت سرعت شما را نشان می‌دهد، نه حد سرعت را."),
)

Q(5716, "7.6", town("""
THE SCENE: a pedestrian crossing (zebra stripes) without traffic lights near a school; two school-patrol children in bright yellow
vests stand at the kerb and hold out a sign on a short pole towards the traffic; a group of small children waits behind them; above
the crossing a yellow lamp is flashing.
MUST BE CLEARLY VISIBLE: the school patrol holding out the sign, the waiting children, the flashing yellow lamp, the zebra crossing.
MUST NOT APPEAR: text, traffic lights."""),
  "Ved et fodgængerfelt nær en skole blinker et gult lys, og en skolepatrulje er ved at standse trafikken, så nogle børn kan gå over. "
  "Hvordan forholder du dig?",
  "At a pedestrian crossing near a school a yellow light is flashing, and a school patrol is stopping the traffic so that some "
  "children can cross. What do you do?",
  "کنار گذرگاه عابر پیاده‌ای نزدیک یک مدرسه، چراغی زرد چشمک می‌زند و گشت مدرسه دارد ترافیک را نگه می‌دارد تا چند کودک رد شوند. چه "
  "می‌کنید؟",
  S(True, "Jeg sætter farten ned og standser, så børnene kan gå over.", "I slow down and stop so that the children can cross.",
    "سرعتم را کم می‌کنم و می‌ایستم تا کودکان رد شوند.",
    "Ved et fodgængerfelt uden lyssignal skal du om nødvendigt standse for gående, der er på vej ud i feltet.",
    "At a pedestrian crossing without traffic lights you must stop if necessary for pedestrians on their way onto the crossing.",
    "در گذرگاه عابرِ بدون چراغ، در صورت لزوم باید برای عابرانی که وارد گذرگاه می‌شوند بایستید."),
  S(True, "Jeg viser særligt hensyn til skolepatruljen og børnene.", "I show special consideration for the school patrol and the children.",
    "نسبت به گشت مدرسه و کودکان ملاحظه‌ی ویژه دارم.",
    "Færdselsloven kræver, at der vises særligt hensyn over for børn og skolepatruljer.",
    "The Road Traffic Act requires special consideration for children and school patrols.",
    "قانون راهنمایی و رانندگی ملاحظه‌ی ویژه نسبت به کودکان و گشت‌های مدرسه را لازم می‌داند."),
  S(True, "Det gule blinklys betyder, at jeg skal være særligt forsigtig.", "The flashing yellow light means that I must take special care.",
    "چراغ زرد چشمک‌زن یعنی باید احتیاط ویژه کنم.",
    "Gult blinksignal sættes bl.a. op ved arbejdende skolepatruljer og betyder, at trafikanterne skal udvise særlig forsigtighed.",
    "A flashing yellow signal is put up, among other places, at working school patrols and means that road users must take special care.",
    "چراغ زرد چشمک‌زن از جمله کنار گشت‌های مدرسه‌ی در حال کار نصب می‌شود و یعنی کاربران راه باید احتیاط ویژه کنند."),
  S(False, "Jeg må køre, så snart børnene er forbi min vognbane, selv om de ikke er kommet helt over.",
    "I may drive on as soon as the children are past my lane, even if they have not got all the way across.",
    "به‌محض این‌که کودکان از خط من گذشتند، حتی اگر کاملاً رد نشده باشند، می‌توانم بروم.",
    "Vent, til alle børnene er kommet over, og patruljen er gået tilbage; et barn kan vende om eller løbe.",
    "Wait until all the children are across and the patrol has stepped back; a child may turn round or run.",
    "صبر کنید تا همه‌ی کودکان رد شوند و گشت عقب برود؛ ممکن است کودکی برگردد یا بدود."),
)

Q(5717, "7.6", view("""
THE SCENE: a narrow country road without pavement or cycle path; on the right side of the road, with his back to us, a teenager rides
a skateboard; no oncoming traffic.
MUST BE CLEARLY VISIBLE: the skateboarder at the right side of the road with his back to us, the missing pavement and path.
MUST NOT APPEAR: signs, text."""),
  "På en vej uden fortov og sti kører en ung på skateboard i højre side af vejen med ryggen til dig. Hvad gælder?",
  "On a road without pavement or path a young person rides a skateboard on the right side of the road with their back to you. What applies?",
  "در جاده‌ای بدون پیاده‌رو و مسیر جداگانه، نوجوانی با اسکیت‌برد در سمت راست جاده، پشت به شما، حرکت می‌کند. چه قاعده‌ای برقرار است؟",
  S(True, "Den, der kører på skateboard, regnes som gående.", "Someone riding a skateboard counts as a pedestrian.",
    "کسی که اسکیت‌برد سوار است، عابر پیاده به حساب می‌آید.",
    "Som gående anses også den, der løber på ski, skøjter, rulleskøjter, skateboard eller lignende.",
    "Anyone on skis, skates, roller skates, a skateboard or the like also counts as a pedestrian.",
    "کسی که با اسکی، اسکیت، اسکیت چرخ‌دار، اسکیت‌برد یا مانند آن حرکت می‌کند هم عابر پیاده به حساب می‌آید."),
  S(True, "Jeg sætter farten ned og kører forbi med god afstand.", "I slow down and pass with a good distance.",
    "سرعتم را کم می‌کنم و با فاصله‌ی کافی رد می‌شوم.",
    "Kørende skal give gående tid til at vige til side og give dem fornøden plads på vejen.",
    "Drivers must give pedestrians time to step aside and give them the room they need on the road.",
    "رانندگان باید به عابران فرصت کنار رفتن و جای لازم در جاده بدهند."),
  S(False, "Skateboarderen skal følge de samme regler som cyklister.", "The skateboarder must follow the same rules as cyclists.",
    "اسکیت‌بازی باید همان قاعده‌های دوچرخه‌سواران را رعایت کند.",
    "Skateboarderen er gående og ikke cyklist.", "The skateboarder is a pedestrian, not a cyclist.",
    "اسکیت‌باز عابر پیاده است، نه دوچرخه‌سوار."),
  S(False, "Skateboarderen er i den rigtige side, fordi gående på kørebanen altid skal holde til højre.",
    "The skateboarder is on the right side, because pedestrians on the carriageway must always keep to the right.",
    "اسکیت‌باز در سمت درستی است، چون عابرانی که روی سواره‌رو هستند همیشه باید از سمت راست بروند.",
    "Gående, der bruger kørebanen, skal som hovedregel gå yderst i venstre side, så de kan se de kørende komme imod sig.",
    "Pedestrians using the carriageway must as a rule walk at the far left, so that they can see the traffic coming towards them.",
    "عابرانی که از سواره‌رو استفاده می‌کنند، اصولاً باید منتهی‌الیه سمت چپ بروند تا وسیله‌هایی را که به سمتشان می‌آیند ببینند."),
)

Q(5718, "7.6", town("""
THE SCENE: a residential street lined with parked cars on the right; under one of the parked cars ahead, between its front and rear
wheels, a pair of small feet in children's shoes can be seen on the far side of the car; the child itself is hidden between that car
and the next one.
MUST BE CLEARLY VISIBLE: the small feet visible under the parked car.
MUST NOT APPEAR: signs, text, the child's body."""),
  "Under en af de parkerede biler forude kan du se et par små fødder. Barnet står skjult mellem bilerne. Hvordan forholder du dig?",
  "Under one of the parked cars ahead you can see a pair of small feet. The child is hidden between the cars. What do you do?",
  "زیر یکی از خودروهای پارک‌شده‌ی جلوتر، یک جفت پای کوچک دیده می‌شود. کودک بین خودروها پنهان است. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og er klar til at bremse.", "I slow down and am ready to brake.", "سرعتم را کم می‌کنم و آماده‌ی ترمز هستم.",
    "Barnet kan pludselig løbe ud mellem bilerne, og når du nærmer dig børn, skal farten være passende lav.",
    "The child may suddenly run out between the cars, and when you approach children your speed must be suitably low.",
    "کودک ممکن است ناگهان از بین خودروها بیرون بدود و وقتی به کودکان نزدیک می‌شوید، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Jeg holder så stor afstand til de parkerede biler, som trafikken tillader.",
    "I keep as much distance from the parked cars as the traffic allows.", "تا جایی که ترافیک اجازه بدهد، از خودروهای پارک‌شده فاصله می‌گیرم.",
    "Så får du lidt mere tid og plads, hvis barnet kommer ud.", "Then you have a little more time and room if the child comes out.",
    "این‌طور اگر کودک بیرون بیاید، کمی وقت و جای بیشتری دارید."),
  S(True, "Jeg holder øje med, om der er flere børn ved bilerne.", "I watch whether there are more children by the cars.",
    "مراقبم که کودکان دیگری هم کنار خودروها نباشند.",
    "Hvor der er ét barn, kan der være flere, fx i en leg mellem bilerne.", "Where there is one child, there may be more, for example playing between the cars.",
    "جایی که یک کودک هست، ممکن است کودکان دیگری هم باشند، مثلاً در حال بازی بین خودروها."),
  S(False, "Jeg kører videre med samme fart, fordi barnet står på fortovet.", "I drive on at the same speed because the child is on the pavement.",
    "با همان سرعت ادامه می‌دهم، چون کودک روی پیاده‌رو ایستاده است.",
    "Barnet kan træde ud på kørebanen, før du når forbi.", "The child may step onto the carriageway before you get past.",
    "کودک ممکن است پیش از آن‌که رد شوید، پا به سواره‌رو بگذارد."),
)

Q(5719, "7.6", view("""
THE SCENE: a residential road with houses and letterboxes at the garden gates; ahead on the right a postal worker on a small electric
moped with large bags has just stopped at a letterbox; a few houses further on there are more letterboxes by the road.
MUST BE CLEARLY VISIBLE: the postal moped stopped at a letterbox, the next letterboxes further on.
MUST NOT APPEAR: signs, text, logos.""", scenery="Scenery is reduced to simple flat house fronts with front gardens, letterboxes at the "
  "gates and a few trees."),
  "Foran dig kører et postbud på knallert. Postbuddet standser ved hver postkasse i vejkanten og kører så videre. Hvordan forholder du dig?",
  "A postal worker on a moped rides in front of you. The postal worker stops at every letterbox by the road and then rides on. What do you do?",
  "جلوی شما نامه‌رسانی با موتورگازی حرکت می‌کند. نامه‌رسان کنار هر صندوق پست می‌ایستد و بعد دوباره راه می‌افتد. چه می‌کنید؟",
  S(True, "Jeg holder god afstand og regner med, at knallerten standser igen ved næste postkasse.",
    "I keep a good distance and expect the moped to stop again at the next letterbox.",
    "فاصله‌ی کافی نگه می‌دارم و انتظار دارم موتورگازی کنار صندوق پست بعدی دوباره بایستد.",
    "Når et køretøj ofte standser, skal du have afstand nok til selv at kunne standse.",
    "When a vehicle stops often, you must have enough distance to be able to stop yourself.",
    "وقتی وسیله‌ای مرتب می‌ایستد، باید آن‌قدر فاصله داشته باشید که خودتان هم بتوانید بایستید."),
  S(True, "Jeg kører kun forbi, når jeg kan gøre det uden fare og med god afstand til siden.",
    "I only pass when I can do it without danger and with a good distance to the side.",
    "فقط وقتی رد می‌شوم که بی‌خطر و با فاصله‌ی جانبی کافی ممکن باشد.",
    "Den, der kører forbi, skal holde tilstrækkelig afstand til siden og må ikke skabe fare.",
    "Whoever passes must keep enough distance to the side and must not create danger.",
    "کسی که رد می‌شود باید فاصله‌ی جانبی کافی نگه دارد و نباید خطر ایجاد کند."),
  S(False, "Jeg dytter, så postbuddet ved, at jeg vil forbi.", "I sound the horn so that the postal worker knows I want to get by.",
    "بوق می‌زنم تا نامه‌رسان بداند می‌خواهم رد شوم.",
    "Lydsignal må kun bruges, når det er nødvendigt for at forebygge eller afværge fare.",
    "The horn may only be used when it is needed to prevent or avert danger.",
    "بوق فقط وقتی مجاز است که برای پیشگیری یا دفع خطر لازم باشد."),
  S(False, "Jeg kører tæt bag knallerten, så jeg kan komme forbi, så snart den standser.",
    "I drive close behind the moped so that I can get past as soon as it stops.",
    "نزدیکِ موتورگازی می‌رانم تا به‌محض ایستادنش رد شوم.",
    "Så kan du ikke nå at reagere, hvis den standser brat eller svinger ud.",
    "Then you cannot react in time if it stops sharply or swings out.",
    "در این صورت اگر ناگهان بایستد یا به بیرون بپیچد، نمی‌توانید به‌موقع واکنش نشان دهید."),
)

Q(5720, "7.3", view("""
THE SCENE: a two-lane country road; at the right a round speed-limit sign 80; several cars ahead of us pull away fast; in the interior
rear-view mirror at the top of the picture a car follows close behind us.
MUST BE CLEARLY VISIBLE: the 80 sign, the cars pulling away ahead, the car close behind in the mirror.
MUST NOT APPEAR: other signs, text."""),
  "På landevejen, hvor grænsen er 80 km/t, kører de fleste andre biler omkring 95 km/t. Hvad gælder?",
  "On the country road, where the limit is 80 km/h, most other cars are doing about 95 km/h. What applies?",
  "در جاده‌ی بیرون شهر که حداکثر سرعت ۸۰ کیلومتر در ساعت است، بیشترِ خودروهای دیگر حدود ۹۵ کیلومتر در ساعت می‌رانند. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg må højst køre 80 km/t, selv om de andre kører hurtigere.", "I may drive at most 80 km/h, even if the others drive faster.",
    "حتی اگر دیگران تندتر برانند، من حداکثر ۸۰ کیلومتر در ساعت می‌توانم برانم.",
    "Hastighedsgrænsen gælder for alle, uanset hvad andre gør.", "The speed limit applies to everyone, whatever others do.",
    "حد سرعت برای همه است، هر کاری دیگران بکنند."),
  S(True, "Jeg holder mig til højre, så de hurtigere biler kan komme forbi.", "I keep to the right so that the faster cars can get past.",
    "از سمت راست می‌روم تا خودروهای تندتر بتوانند رد شوند.",
    "Når en bagfra kommende vil overhale, skal du holde så langt til højre som muligt og må ikke øge farten.",
    "When someone from behind wants to overtake, you must keep as far right as possible and must not speed up.",
    "وقتی کسی از پشت می‌خواهد سبقت بگیرد، باید تا جای ممکن به راست بروید و سرعتتان را زیاد نکنید."),
  S(True, "Det er ingen undskyldning for at køre for stærkt, at andre gør det.", "That others drive too fast is no excuse for doing it too.",
    "این‌که دیگران تند می‌رانند، بهانه‌ای برای تند راندن نیست.",
    "Du har selv ansvaret for din hastighed.", "You are responsible for your own speed.", "مسئولیت سرعتتان با خودتان است."),
  S(False, "Jeg skal følge med de andre, så jeg ikke er til hinder.", "I must keep up with the others so that I am not in the way.",
    "باید هم‌پای دیگران برانم تا مانع نباشم.",
    "Du hindrer ikke færdslen ved at overholde grænsen; det er kun forbudt at køre unødigt langsomt uden grund.",
    "You do not obstruct the traffic by keeping to the limit; it is only forbidden to drive needlessly slowly without reason.",
    "با رعایت حد سرعت مانع ترافیک نمی‌شوید؛ فقط آهسته راندنِ بی‌دلیل و بیش از حد ممنوع است."),
)

Q(5721, "7.3", view("""
THE SCENE: a country road approaching a town; ahead on the right stands the white rectangular town sign with a black silhouette of
houses and a church tower; the first houses begin some way after the sign; no speed-limit signs.
MUST BE CLEARLY VISIBLE: the town sign, the first houses some way after it.
MUST NOT APPEAR: other signs, any text."""),
  "Du kører 80 km/t og nærmer dig denne tavle, hvor byen begynder. Der er ingen hastighedstavler. Hvornår skal din fart være nede på 50 km/t?",
  "You are doing 80 km/h and approaching this sign where the town begins. There are no speed-limit signs. When must your speed be "
  "down to 50 km/h?",
  "با سرعت ۸۰ کیلومتر در ساعت به این تابلو، جایی که شهر شروع می‌شود، نزدیک می‌شوید. تابلوی حد سرعت نیست. سرعتتان کِی باید به ۵۰ "
  "کیلومتر در ساعت رسیده باشد؟",
  S(True, "Senest når jeg kører forbi tavlen.", "At the latest when I pass the sign.", "حداکثر وقتی از کنار تابلو رد می‌شوم.",
    "Grænsen på 50 km/t gælder fra tavlen, så du skal bremse i god tid før den.",
    "The 50 km/h limit applies from the sign, so you must brake in good time before it.",
    "حد ۵۰ کیلومتر در ساعت از خودِ تابلو شروع می‌شود، پس باید خیلی پیش از آن ترمز کنید."),
  S(False, "Først når jeg kommer til de første huse.", "Only when I reach the first houses.", "تازه وقتی به اولین خانه‌ها می‌رسم.",
    "Det er tavlen, der bestemmer, hvor reglerne for tættere bebygget område begynder.",
    "It is the sign that decides where the rules for built-up areas begin.",
    "این تابلوست که تعیین می‌کند قاعده‌های منطقه‌ی شهری از کجا شروع شوند."),
  S(False, "Jeg har 100 m efter tavlen til at sætte farten ned.", "I have 100 m after the sign to slow down.",
    "بعد از تابلو ۱۰۰ متر فرصت دارم سرعتم را کم کنم.",
    "Der er ingen sådan frist; grænsen gælder fra tavlen.", "There is no such allowance; the limit applies from the sign.",
    "چنین فرصتی وجود ندارد؛ حد سرعت از خودِ تابلو برقرار است."),
)

Q(5722, "7.3", view("""
THE SCENE: an icy country road on a frosty winter morning; the road surface glistens with ice; frost on the verges and trees; a car
ahead at a distance.
MUST BE CLEARLY VISIBLE: the glistening icy road surface, the frost.
MUST NOT APPEAR: signs, text.""", cond="winter morning, frost, icy road"),
  "Din bil har ABS, antiskrid (ESC) og gode vinterdæk. Vejen er isglat. Hvad gælder?",
  "Your car has ABS, stability control (ESC) and good winter tyres. The road is icy. What applies?",
  "خودروی شما ترمز ضدقفل (ABS)، سیستم پایداری (ESC) و لاستیک زمستانیِ خوب دارد. جاده یخ‌زده و لغزنده است. چه قاعده‌ای برقرار است؟",
  S(True, "Bremselængden er stadig meget længere end på tør vej, så jeg kører langsomt og holder stor afstand.",
    "The braking distance is still much longer than on a dry road, so I drive slowly and keep a long distance.",
    "مسافت ترمز هنوز خیلی بیشتر از جاده‌ی خشک است، پس آهسته می‌رانم و فاصله‌ی زیادی نگه می‌دارم.",
    "Elektronik og vinterdæk kan ikke give dækkene mere greb, end isen tillader.",
    "Electronics and winter tyres cannot give the tyres more grip than the ice allows.",
    "سامانه‌های الکترونیکی و لاستیک زمستانی نمی‌توانند چسبندگی‌ای بیش از آنچه یخ اجازه می‌دهد به لاستیک‌ها بدهند."),
  S(False, "ABS gør bremselængden lige så kort på is som på tør asfalt.", "ABS makes the braking distance as short on ice as on dry asphalt.",
    "ترمز ضدقفل مسافت ترمز روی یخ را به کوتاهیِ آسفالت خشک می‌کند.",
    "ABS hjælper dig med at styre, mens du bremser; det giver ikke en kort bremselængde på is.",
    "ABS helps you steer while braking; it does not give a short braking distance on ice.",
    "ترمز ضدقفل کمک می‌کند هنگام ترمز بتوانید فرمان بدهید؛ مسافت ترمز روی یخ را کوتاه نمی‌کند."),
  S(False, "Med vinterdæk og antiskrid kan jeg køre lige så hurtigt som på tør vej.",
    "With winter tyres and stability control I can drive as fast as on a dry road.",
    "با لاستیک زمستانی و سیستم پایداری می‌توانم به همان تندیِ جاده‌ی خشک برانم.",
    "Grebet på is er meget mindre, uanset dæk og elektronik.", "The grip on ice is much lower, whatever the tyres and electronics.",
    "چسبندگی روی یخ، هر لاستیک و سامانه‌ای هم که باشد، خیلی کمتر است."),
  S(False, "Antiskrid forhindrer altid, at bilen skrider ud i et sving.", "Stability control always stops the car from skidding in a bend.",
    "سیستم پایداری همیشه جلوی لغزیدن خودرو در پیچ را می‌گیرد.",
    "Kører du for stærkt, kan systemet ikke holde bilen på vejen.", "If you drive too fast, the system cannot keep the car on the road.",
    "اگر تند برانید، این سیستم نمی‌تواند خودرو را در جاده نگه دارد."),
)

Q(5723, "7.3", town("""
THE SCENE: a town street approaching a pedestrian crossing (zebra stripes) without traffic lights; parked cars and a bus shelter near
the crossing hide part of the pavements on both sides; nobody can be seen on or by the crossing.
MUST BE CLEARLY VISIBLE: the zebra crossing, the parked cars and the bus shelter hiding the pavements.
MUST NOT APPEAR: traffic lights, signs, text, pedestrians."""),
  "Du nærmer dig et fodgængerfelt uden lyssignal. Du kan ikke se nogen gående, men parkerede biler og et busskur skjuler en del af "
  "fortovene. Hvordan forholder du dig?",
  "You are approaching a pedestrian crossing without traffic lights. You cannot see any pedestrians, but parked cars and a bus shelter "
  "hide part of the pavements. What do you do?",
  "به گذرگاه عابر پیاده‌ای بدون چراغ نزدیک می‌شوید. عابری نمی‌بینید، ولی خودروهای پارک‌شده و یک سایبان ایستگاه اتوبوس بخشی از "
  "پیاده‌روها را پنهان کرده‌اند. چه می‌کنید؟",
  S(True, "Jeg holder en passende lav hastighed og er klar til at standse, hvis en gående dukker op.",
    "I keep a suitably low speed and am ready to stop if a pedestrian appears.",
    "سرعت را به اندازه‌ی کافی پایین نگه می‌دارم و آماده‌ام اگر عابری پیدا شد، بایستم.",
    "Foran et fodgængerfelt skal hastigheden være passende lav, så du kan standse for gående, der er på vej ud i feltet.",
    "Before a pedestrian crossing your speed must be suitably low, so that you can stop for pedestrians on their way onto the crossing.",
    "جلوی گذرگاه عابر، سرعت باید آن‌قدر کم باشد که بتوانید برای عابرانی که وارد گذرگاه می‌شوند بایستید."),
  S(False, "Når jeg ikke kan se nogen, kan jeg køre forbi feltet uden at tage hensyn til det.",
    "When I cannot see anyone, I can drive past the crossing without paying attention to it.",
    "وقتی کسی را نمی‌بینم، می‌توانم بی‌توجه به گذرگاه از کنارش رد شوم.",
    "Gående kan være skjult bag bilerne og busskuret.", "Pedestrians may be hidden behind the cars and the bus shelter.",
    "ممکن است عابرانی پشت خودروها و سایبان ایستگاه پنهان باشند."),
  S(False, "Jeg skal altid standse helt før et fodgængerfelt.", "I must always come to a full stop before a pedestrian crossing.",
    "همیشه باید پیش از گذرگاه عابر کاملاً بایستم.",
    "Du skal standse, når det er nødvendigt for at lade gående passere, ikke hver gang.",
    "You must stop when it is needed to let pedestrians cross, not every time.",
    "باید وقتی بایستید که برای عبور عابران لازم باشد، نه هر بار."),
  S(False, "Jeg dytter, inden jeg kører over feltet.", "I sound the horn before I drive across the crossing.",
    "پیش از رد شدن از گذرگاه بوق می‌زنم.",
    "Lydsignal må kun bruges for at forebygge eller afværge fare, ikke som en fast vane.",
    "The horn may only be used to prevent or avert danger, not as a habit.",
    "بوق فقط برای پیشگیری یا دفع خطر است، نه یک عادت همیشگی."),
)

Q(5724, "1.2", picture("""
A small family car seen from the side and slightly from behind, standing on a residential street; on its roof bars a long aluminium
ladder is strapped down; the ladder sticks out about 1.5 m behind the rear of the car; the rear lights and the number plate are
visible below it.
MUST BE CLEARLY VISIBLE: the ladder on the roof bars, how far it sticks out behind the car.
MUST NOT APPEAR: text, letters or numbers on the number plate, logos."""),
  "Du skal køre en lang stige på bilens tagbøjler. Stigen rager 1,5 m ud bag bilen. Hvad gælder?",
  "You are going to carry a long ladder on the car's roof bars. The ladder sticks out 1.5 m behind the car. What applies?",
  "قرار است نردبانی بلند را روی باربندِ سقف خودرو ببرید. نردبان ۱٫۵ متر از پشت خودرو بیرون زده است. چه قاعده‌ای برقرار است؟",
  S(True, "Stigen skal være godt fastgjort, så den ikke kan forskubbe sig eller falde af.",
    "The ladder must be well secured so that it cannot shift or fall off.", "نردبان باید محکم بسته شود تا جابه‌جا نشود و نیفتد.",
    "Gods skal være anbragt, så det ikke kan falde af på vejen eller være til fare for andre.",
    "Goods must be placed so that they cannot fall onto the road or endanger others.",
    "بار باید طوری قرار بگیرد که روی جاده نیفتد و برای دیگران خطری نداشته باشد."),
  S(True, "Enden af stigen skal afmærkes, så de andre trafikanter kan se den.", "The end of the ladder must be marked so that other road users can see it.",
    "انتهای نردبان باید علامت‌گذاری شود تا دیگر کاربران راه آن را ببینند.",
    "Gods, der rager et godt stykke ud bag bilen, skal afmærkes, så de bagvedkørende ikke kører ind i det.",
    "Goods sticking out a good way behind the car must be marked so that those behind do not run into them.",
    "باری که فاصله‌ی قابل‌توجهی از پشت خودرو بیرون زده، باید علامت‌گذاری شود تا خودروهای پشتی به آن نخورند."),
  S(False, "Det er lige meget, hvor langt stigen rager ud, når bare den er bundet fast.",
    "It does not matter how far the ladder sticks out as long as it is tied down.",
    "مهم نیست نردبان چقدر بیرون زده، کافی است محکم بسته شده باشد.",
    "Der er grænser for, hvor langt gods må rage ud, og det skal afmærkes.",
    "There are limits to how far goods may stick out, and they must be marked.",
    "برای این‌که بار تا کجا می‌تواند بیرون بزند حدی هست و باید علامت‌گذاری شود."),
  S(False, "Jeg behøver ikke tænke på stigen, når jeg bakker eller svinger.", "I need not think about the ladder when I reverse or turn.",
    "وقتی دنده‌عقب می‌روم یا می‌پیچم، لازم نیست به نردبان فکر کنم.",
    "Stigen gør bilen længere bagtil, og den kan ramme noget eller nogen, når du bakker eller svinger.",
    "The ladder makes the car longer at the back, and it can hit something or someone when you reverse or turn.",
    "نردبان خودرو را از عقب بلندتر می‌کند و هنگام دنده‌عقب یا پیچیدن ممکن است به چیزی یا کسی بخورد."),
)

Q(5725, "7.20", view("""
THE SCENE: inside a long road tunnel lit by ceiling lights; the traffic ahead has stopped; further ahead thick grey smoke rises from a
stopped lorry and spreads under the tunnel roof; on the tunnel wall to the right a green illuminated emergency-exit sign with a
running figure and an arrow; our car stands in the queue.
MUST BE CLEARLY VISIBLE: the smoke ahead, the stopped queue, the green emergency-exit sign on the wall.
MUST NOT APPEAR: text, flames.""", cond="inside a road tunnel, artificial light", scenery="Scenery is the inside of a road tunnel: "
  "smooth walls, ceiling lights."),
  "I en lang tunnel holder trafikken stille. Længere fremme kommer der tæt røg fra en lastbil. Hvad gør du?",
  "In a long tunnel the traffic has stopped. Further ahead thick smoke is coming from a lorry. What do you do?",
  "در یک تونل طولانی ترافیک ایستاده است. جلوتر دودِ غلیظی از یک کامیون بیرون می‌آید. چه می‌کنید؟",
  S(True, "Jeg slukker motoren, lader nøglen sidde og går hurtigt til den nærmeste nødudgang væk fra røgen.",
    "I switch off the engine, leave the key in the car and walk quickly to the nearest emergency exit away from the smoke.",
    "موتور را خاموش می‌کنم، کلید را در خودرو می‌گذارم و سریع به نزدیک‌ترین خروجی اضطراری، دور از دود، می‌روم.",
    "Røg i en tunnel er livsfarlig, og med nøglen i bilen kan redningsfolkene flytte den.",
    "Smoke in a tunnel is deadly, and with the key in the car the rescuers can move it.",
    "دود در تونل مرگبار است و اگر کلید در خودرو باشد، امدادگران می‌توانند آن را جابه‌جا کنند."),
  S(False, "Jeg vender bilen og kører tilbage ud af tunnelen.", "I turn the car round and drive back out of the tunnel.",
    "دور می‌زنم و از تونل برمی‌گردم.",
    "At vende i tunnelen er meget farligt og kan spærre vejen for redningskøretøjerne.",
    "Turning round in the tunnel is very dangerous and can block the way for the rescue vehicles.",
    "دور زدن در تونل بسیار خطرناک است و ممکن است راه وسیله‌های امدادی را ببندد."),
  S(False, "Jeg bliver siddende i bilen med lukkede vinduer, til redningsfolkene kommer.",
    "I stay in the car with the windows closed until the rescuers arrive.",
    "با شیشه‌های بسته در خودرو می‌مانم تا امدادگران برسند.",
    "Røgen kan hurtigt nå dig; kom væk fra den til en nødudgang.", "The smoke can reach you quickly; get away from it to an emergency exit.",
    "دود می‌تواند سریع به شما برسد؛ از آن دور شوید و به خروجی اضطراری بروید."),
)
