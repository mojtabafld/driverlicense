# «آزمون جدید», batch 6 (5501–5600), part c: straight on at junctions (7.12), left turns (7.14), right turns (7.13),
# approaching junctions (7.11), meeting (7.7).
# Rules: Færdselsloven §§ 4 stk. 1–2 (signals and markings followed; police directions before them), 5 stk. 1–2 (level
# crossings: special care, no crossing while a signal shows stop or the barriers close or open), 15 stk. 1 and 4, 16 stk. 3,
# 26 stk. 2–4 (ubetinget vigepligt shown by marking; out of a car park, property, path, and at any exit from a road over a
# pavement, cycle path or verge; the right-hand rule) and stk. 6 (left turns not to the inconvenience of oncoming traffic,
# right turns not to the inconvenience of cyclists going straight on), 26 stk. 7, 27 stk. 2 (crossing a pavement: give way to
# pedestrians), 32 stk. 2 and 5, 41 stk. 1–3 (a bus standing for passengers: a suitably low speed; no sudden braking);
# Bekendtgørelse om vejafmærkning (BEK 425/2023): B 11 (with S 11 shark teeth), B 16 (side roads give way unless B 11, B 13
# or B 15 stands on the main road), § 65 (red and red-and-yellow stop; yellow stop unless that is dangerous), § 66 (an arrow
# signal is for the arrow's direction).
from nq import Q, S, above, town, view

Q(5551, "7.12", town("""
THE SCENE: a junction in town with traffic lights; we stand first at the stop line and want to go straight on; our signal head has
arrow-shaped lamps, and a GREEN arrow pointing straight ahead is lit; the road after the junction is free.
MUST BE CLEARLY VISIBLE: the green arrow pointing straight ahead, the free road after the junction.
MUST NOT APPEAR: signs, text."""),
  "Du skal ligeud. Dit signal viser en grøn pil, der peger ligeud. Hvad gælder?",
  "You are going straight on. Your signal shows a green arrow pointing straight ahead. What applies?",
  "می‌خواهید مستقیم بروید. چراغ شما پیکان سبزی را نشان می‌دهد که رو به جلوست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må køre ligeud.", "I may go straight on.", "می‌توانم مستقیم بروم.",
    "Et pilsignal gælder for den retning, pilen viser.", "An arrow signal applies to the direction the arrow shows.",
    "چراغ پیکان‌دار برای جهتی است که پیکان نشان می‌دهد."),
  S(False, "Pilen giver mig også lov til at svinge til højre.", "The arrow also allows me to turn right.",
    "این پیکان به من اجازه‌ی پیچیدن به راست را هم می‌دهد.",
    "Den grønne pil gælder kun kørsel ligeud.", "The green arrow only applies to going straight on.",
    "پیکان سبز فقط برای حرکت مستقیم است."),
  S(False, "Med en grøn pil må jeg køre ind i krydset, selv om der holder kø lige efter det.",
    "With a green arrow I may drive into the junction even if there is a queue just after it.",
    "با پیکان سبز می‌توانم وارد تقاطع شوم، حتی اگر درست بعد از آن صف باشد.",
    "Du må ikke køre ind i et kryds, hvis du ikke kan komme ud af det igen.", "You must not drive into a junction that you cannot get out of.",
    "نباید وارد تقاطعی شوید که نمی‌توانید از آن خارج شوید."),
  S(False, "Pilen viser, at jeg skal skifte til en anden vognbane.", "The arrow shows that I must change to another lane.",
    "این پیکان نشان می‌دهد که باید به خط دیگری بروم.",
    "Pilen viser, hvilken retning signalet gælder for.", "The arrow shows which direction the signal applies to.",
    "پیکان نشان می‌دهد چراغ برای کدام جهت است."),
)

Q(5552, "7.12", town("""
THE SCENE: a junction in town controlled by traffic lights; our light shows RED; a police officer in uniform stands in the middle of the
junction, faces us and waves us on with one arm.
MUST BE CLEARLY VISIBLE: our red light, the police officer waving us on.
MUST NOT APPEAR: signs, text."""),
  "Dit lys er rødt, men politibetjenten i krydset giver dig tegn til at køre. Hvad gør du?",
  "Your light is red, but the police officer in the junction signals you to drive on. What do you do?",
  "چراغ شما قرمز است، ولی مأمور پلیس در تقاطع به شما علامت می‌دهد که حرکت کنید. چه می‌کنید؟",
  S(True, "Jeg kører, fordi politiets tegn går forud for lyssignalet.", "I drive on, because the police officer's signal comes before the traffic light.",
    "حرکت می‌کنم، چون علامت پلیس بر چراغ راهنمایی مقدم است.",
    "Anvisninger fra politiet skal følges forud for lyssignaler, tavler og afmærkning.",
    "Directions from the police must be followed before traffic lights, signs and markings.",
    "دستورهای پلیس بر چراغ‌ها، تابلوها و خط‌کشی مقدم‌اند."),
  S(True, "Jeg kører forsigtigt og holder øje med andre, der måske ikke har set betjenten.",
    "I drive carefully and watch for others who may not have seen the officer.",
    "با احتیاط حرکت می‌کنم و مراقب کسانی هستم که شاید مأمور را ندیده باشند.",
    "Andre kan tro, at deres grønne lys gælder.", "Others may think that their green light applies.",
    "ممکن است دیگران فکر کنند چراغ سبزشان معتبر است."),
  S(False, "Jeg venter på grønt lys, fordi lyssignalet altid går forud.", "I wait for a green light, because the traffic light always comes first.",
    "منتظر چراغ سبز می‌مانم، چون چراغ همیشه مقدم است.",
    "Politiets tegn går forud for lyssignalet.", "The police officer's signal comes before the traffic light.",
    "علامت پلیس بر چراغ راهنمایی مقدم است."),
  S(False, "Jeg dytter for at vise betjenten, at jeg har set ham.", "I sound the horn to show the officer that I have seen him.",
    "بوق می‌زنم تا به مأمور نشان دهم که او را دیده‌ام.",
    "Hornet må kun bruges for at forebygge eller afværge fare.", "The horn may only be used to prevent or avert danger.",
    "بوق فقط برای پیشگیری یا دفع خطر است."),
)

Q(5553, "7.12", town("""
THE SCENE: we drive straight along a town street; on the right a side street joins, but the pavement and the cycle path along our street
continue at their own raised level across the side street's mouth, with kerbs on both sides; in the side street a car approaches the
raised crossing.
MUST BE CLEARLY VISIBLE: the pavement and cycle path continuing across the side street's mouth, the car in the side street.
MUST NOT APPEAR: signs, shark teeth, text."""),
  "Du kører ligeud ad gaden. Til højre munder en sidevej ud, men fortovet og cykelstien fortsætter hen over sidevejens udmunding. "
  "En bil kommer ad sidevejen. Hvad gælder?",
  "You are driving straight along the street. On the right a side street joins, but the pavement and the cycle path continue across "
  "its mouth. A car is coming along the side street. What applies?",
  "در خیابان مستقیم می‌رانید. در سمت راست یک خیابان فرعی وصل می‌شود، ولی پیاده‌رو و مسیر دوچرخه از روی دهانه‌ی آن ادامه دارند. "
  "خودرویی از خیابان فرعی می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen fra sidevejen har ubetinget vigepligt for mig.", "The car from the side street must give way to me.",
    "خودروی خیابان فرعی باید بی‌قیدوشرط به من حق تقدم بدهد.",
    "Ubetinget vigepligt gælder ved enhver udkørsel fra en vej, der sker over et fortov, en cykelsti eller en rabat, som er hævet over "
    "kørebanen på den vej, der køres ind på.",
    "Drivers must give way at any exit from a road that crosses a pavement, cycle path or verge raised above the carriageway of the "
    "road they are entering.",
    "در هر خروجی از جاده که از روی پیاده‌رو، مسیر دوچرخه یا حاشیه‌ای بگذرد که از سواره‌روی جاده‌ی مقصد بالاتر است، باید بی‌قیدوشرط "
    "حق تقدم داد."),
  S(True, "Jeg holder øje med, om føreren overser sin vigepligt og kører ud.", "I watch whether the driver overlooks the duty to give way and drives out.",
    "مراقبم که آیا راننده وظیفه‌ی حق تقدم دادن را نادیده می‌گیرد و بیرون می‌آید یا نه.",
    "Du skal være klar til, at andre ikke overholder reglerne.", "You must be ready for others not to follow the rules.",
    "باید آماده باشید که دیگران قواعد را رعایت نکنند."),
  S(False, "Bilen har forkørselsret, fordi den kommer fra højre.", "The car has right of way because it comes from the right.",
    "آن خودرو حق تقدم دارد، چون از راست می‌آید.",
    "Højre vigepligt gælder ikke her, fordi bilen skal køre over fortovet og cykelstien.",
    "The right-hand rule does not apply here, because the car has to cross the pavement and the cycle path.",
    "قاعده‌ی حق تقدم دست راست این‌جا برقرار نیست، چون آن خودرو باید از روی پیاده‌رو و مسیر دوچرخه بگذرد."),
  S(False, "Den bil, der først når frem til krydset, kører først.", "The car that reaches the junction first goes first.",
    "خودرویی که زودتر به تقاطع برسد، اول می‌رود.",
    "Hvem der kommer først, afgør ikke vigepligten.", "Who comes first does not decide who must give way.",
    "این‌که چه کسی زودتر برسد، حق تقدم را تعیین نمی‌کند."),
)

Q(5554, "7.12", town("""
THE SCENE: a junction in town with traffic lights; we stand first, right at the stop line; our light shows RED; the crossing road is
empty in both directions; just before the stop line a rectangular cut in the asphalt (a vehicle detector) can be seen in our lane.
MUST BE CLEARLY VISIBLE: our red light, the empty crossing road, the stop line.
MUST NOT APPEAR: signs, text."""),
  "Du holder for rødt i et kryds. Der kommer ingen på den tværgående vej, men lyset bliver ved med at være rødt. Hvad gælder?",
  "You are waiting at a red light at a junction. Nothing is coming on the crossing road, but the light stays red. What applies?",
  "پشت چراغ قرمز تقاطعی ایستاده‌اید. کسی در جاده‌ی عرضی نمی‌آید، ولی چراغ همچنان قرمز است. چه قاعده‌ای برقرار است؟",
  S(True, "Rødt lys betyder stop, også når der ikke kommer nogen.", "A red light means stop, even when nobody is coming.",
    "چراغ قرمز یعنی ایست، حتی وقتی کسی نمی‌آید.",
    "Ved rødt skal du standse og må ikke køre, før lyset skifter.", "At red you must stop and must not drive until the light changes.",
    "با چراغ قرمز باید بایستید و تا عوض شدن چراغ نباید حرکت کنید."),
  S(True, "Signalet kan være styret af biler, der registreres ved stoplinjen, så jeg holder helt frem til den.",
    "The signal may be controlled by cars detected at the stop line, so I stand right up to it.",
    "ممکن است چراغ با خودروهایی که کنار خط ایست شناسایی می‌شوند کار کند، پس تا خود خط جلو می‌روم.",
    "Mange signaler skifter først, når de registrerer, at der holder nogen.", "Many signals only change when they detect that someone is waiting.",
    "بسیاری از چراغ‌ها فقط وقتی عوض می‌شوند که تشخیص دهند کسی منتظر است."),
  S(False, "Har jeg ventet mere end to minutter, må jeg køre over for rødt.", "If I have waited more than two minutes, I may drive through the red.",
    "اگر بیش از دو دقیقه صبر کرده باشم، می‌توانم از چراغ قرمز رد شوم.",
    "Der er ingen tidsgrænse, efter hvilken du må køre over for rødt.", "There is no time limit after which you may drive through a red light.",
    "هیچ محدودیت زمانی‌ای نیست که پس از آن بتوان از چراغ قرمز رد شد."),
  S(False, "Jeg må køre lidt frem over stoplinjen for at se bedre.", "I may move a little over the stop line to see better.",
    "می‌توانم کمی از خط ایست جلوتر بروم تا بهتر ببینم.",
    "Ved rødt skal du holde før stoplinjen.", "At red you must stay behind the stop line.", "با چراغ قرمز باید پشت خط ایست بمانید."),
)

Q(5555, "7.12", view("""
THE SCENE: a road in winter with packed snow, approaching a junction; on the right at the junction stands a triangular sign with its point
DOWN, completely covered with snow so that its face cannot be seen; the road markings are hidden under snow; a car approaches on the
crossing road from the left.
MUST BE CLEARLY VISIBLE: the snow-covered triangular sign with its point down, the junction, the car on the crossing road.
MUST NOT APPEAR: other signs, text.""", cond="winter, overcast, packed snow on the road"),
  "Ved krydset står en tavle, der er helt dækket af sne. Du kan se, at den er trekantet med spidsen nedad. Hvad gælder?",
  "At the junction there is a sign completely covered with snow. You can see that it is triangular with its point down. What applies?",
  "کنار تقاطع تابلویی هست که کاملاً زیر برف پوشیده شده است. می‌بینید که مثلثی است و رأس آن رو به پایین است. چه قاعده‌ای برقرار است؟",
  S(True, "Det er en vigepligtstavle, så jeg har ubetinget vigepligt.", "It is a give-way sign, so I must give way.",
    "این تابلوی حق تقدم است، پس باید بی‌قیدوشرط حق تقدم بدهم.",
    "Kun vigepligtstavlen er trekantet med spidsen nedad.", "Only the give-way sign is triangular with its point down.",
    "فقط تابلوی حق تقدم مثلثی با رأس رو به پایین است."),
  S(True, "Vigepligtstavlen har sin egen form, så den kan kendes, selv når forsiden er dækket.",
    "The give-way sign has its own shape so that it can be recognised even when its face is covered.",
    "تابلوی حق تقدم شکل خاص خودش را دارد تا حتی وقتی رویش پوشیده است شناخته شود.",
    "Formen viser tavlens betydning, også når du ikke kan se forsiden.", "The shape shows the sign's meaning even when you cannot see its face.",
    "شکل تابلو معنای آن را نشان می‌دهد، حتی وقتی روی آن دیده نمی‌شود."),
  S(False, "Når jeg ikke kan se tavlens forside, gælder højre vigepligt.", "When I cannot see the face of the sign, the right-hand rule applies.",
    "وقتی روی تابلو را نمی‌بینم، قاعده‌ی حق تقدم دست راست برقرار است.",
    "Tavlen gælder, selv om den er dækket af sne.", "The sign applies even though it is covered with snow.",
    "این تابلو حتی زیر برف هم معتبر است."),
  S(False, "En tavle, der er dækket af sne, gælder ikke.", "A sign covered with snow does not apply.", "تابلویی که زیر برف است معتبر نیست.",
    "Du kan kende tavlen på formen, og den gælder stadig.", "You can recognise the sign by its shape, and it still applies.",
    "تابلو را از شکلش می‌شناسید و همچنان معتبر است."),
)

Q(5556, "7.12", view("""
THE SCENE: a straight main road outside town (a yellow diamond main-road sign stood earlier, not visible now); ahead at a junction, on OUR
side, stands a give-way sign (a white triangle with a red border, point down), and white shark teeth lie across our lane; a car
approaches on the crossing road from the right.
MUST BE CLEARLY VISIBLE: the give-way sign on our side, the shark teeth across our lane, the car on the crossing road.
MUST NOT APPEAR: other signs, text."""),
  "Du kører på en hovedvej. Ved næste kryds står der en vigepligtstavle, og der er hajtænder på tværs af din vognbane. Hvad gælder?",
  "You are driving on a main road. At the next junction there is a give-way sign, and there are shark teeth across your lane. What applies?",
  "در جاده‌ی اصلی می‌رانید. در تقاطع بعدی تابلوی حق تقدم هست و خط‌های دندانه‌کوسه‌ای عرض خط شما را گرفته است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg har ubetinget vigepligt i dette kryds.", "I must give way at this junction.", "در این تقاطع باید بی‌قیدوشرط حق تقدم بدهم.",
    "Hovedvejen giver ikke forkørselsret i et kryds, hvor der står en vigepligtstavle på hovedvejen.",
    "The main road gives no right of way at a junction where a give-way sign stands on the main road.",
    "جاده‌ی اصلی در تقاطعی که روی خودِ آن تابلوی حق تقدم نصب شده، حق تقدم نمی‌دهد."),
  S(False, "Som hovedvej har jeg altid forkørselsret.", "As a main road I always have right of way.", "چون در جاده‌ی اصلی هستم، همیشه حق تقدم دارم.",
    "En vigepligtstavle på hovedvejen går forud.", "A give-way sign on the main road comes first.", "تابلوی حق تقدم روی جاده‌ی اصلی مقدم است."),
  S(False, "Vigepligtstavlen gælder kun for cyklister.", "The give-way sign only applies to cyclists.", "تابلوی حق تقدم فقط برای دوچرخه‌سواران است.",
    "Tavlen gælder alle trafikanter, der kører ind på eller over vejen.", "The sign applies to all road users entering or crossing the road.",
    "این تابلو برای همه‌ی کسانی است که وارد جاده می‌شوند یا از آن می‌گذرند."),
)

Q(5557, "7.12", town("""
THE SCENE: a junction in a residential area at night, with no signs, no markings and no street lights; on the right a house stands close to
the corner and hides the crossing road; on the house wall and on the road surface at the right corner, the light beams of an approaching
car can be seen, while the car itself is still hidden.
MUST BE CLEARLY VISIBLE: the light beams on the house wall and road, the corner hiding the car.
MUST NOT APPEAR: signs, text.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt. Du nærmer dig et kryds uden tavler og afmærkning. Til højre ser du lysskær fra en bil, der nærmer sig bag et hus. "
  "Hvordan forholder du dig?",
  "It is dark. You are approaching a junction without signs or markings. On the right you see the glow of a car approaching behind a "
  "house. What do you do?",
  "هوا تاریک است. به تقاطعی بدون تابلو و خط‌کشی نزدیک می‌شوید. در سمت راست نور خودرویی را می‌بینید که پشت یک خانه نزدیک می‌شود. "
  "چه می‌کنید؟",
  S(True, "Lysskæret viser, at der kommer en bil fra højre, som jeg skal holde tilbage for.",
    "The glow shows that a car is coming from the right, which I must give way to.",
    "این نور نشان می‌دهد که خودرویی از راست می‌آید که باید به آن حق تقدم بدهم.",
    "I et kryds uden tavler og afmærkning har du vigepligt for trafik fra højre.",
    "At a junction without signs or markings you must give way to traffic from the right.",
    "در تقاطع بدون تابلو و خط‌کشی باید به ترافیک سمت راست حق تقدم بدهید."),
  S(True, "Jeg sætter farten ned i god tid og er parat til at holde tilbage.", "I slow down in good time and am ready to give way.",
    "به‌موقع سرعتم را کم می‌کنم و آماده‌ام که حق تقدم بدهم.",
    "Du skal i god tid vise, at du vil holde tilbage.", "You must show in good time that you are going to give way.",
    "باید به‌موقع نشان دهید که حق تقدم می‌دهید."),
  S(False, "Når jeg ikke kan se selve bilen, har jeg forkørselsret.", "When I cannot see the car itself, I have right of way.",
    "وقتی خود خودرو را نمی‌بینم، حق تقدم با من است.",
    "Bilen fra højre har forkørselsret, også før du kan se den.", "The car from the right has right of way, also before you can see it.",
    "خودروی سمت راست حتی پیش از آن‌که آن را ببینید، حق تقدم دارد."),
  S(False, "Jeg blinker med fjernlyset for at vise, at jeg kører først.", "I flash my high beam to show that I am going first.",
    "با نور بالا چراغ می‌زنم تا نشان دهم اول می‌روم.",
    "Du har vigepligt, og et lyssignal giver dig ingen ret.", "You must give way, and a light signal gives you no right.",
    "شما باید حق تقدم بدهید و علامت نوری حقی به شما نمی‌دهد."),
)

Q(5558, "7.12", town("""
THE SCENE: a junction in town with traffic lights in winter; the road is shiny with ice; our light has just changed from green to YELLOW,
and we are about 20 m from the stop line; a car waits on the crossing road from the left.
MUST BE CLEARLY VISIBLE: the yellow light, the icy road, the stop line about 20 m ahead.
MUST NOT APPEAR: signs, text.""", cond="winter, overcast, icy road"),
  "Vejen er isglat. Lyset skifter til gult, da du er ca. 20 m fra stoplinjen, og du kan ikke standse uden at skride. Hvad gælder?",
  "The road is icy. The light changes to yellow when you are about 20 m from the stop line, and you cannot stop without skidding. What applies?",
  "جاده یخ‌زده است. وقتی حدود ۲۰ متر تا خط ایست فاصله دارید، چراغ زرد می‌شود و نمی‌توانید بدون لغزیدن بایستید. چه قاعده‌ای برقرار است؟",
  S(True, "Kan jeg ikke standse uden fare, må jeg køre videre over for gult.", "If I cannot stop safely, I may drive on through the yellow.",
    "اگر نتوانم بی‌خطر بایستم، می‌توانم با چراغ زرد ادامه دهم.",
    "Gult lys betyder stop, medmindre standsningen vil være farlig.", "A yellow light means stop, unless stopping would be dangerous.",
    "چراغ زرد یعنی ایست، مگر آن‌که ایستادن خطرناک باشد."),
  S(True, "Jeg burde have kørt langsommere mod krydset, så jeg kunne standse.", "I should have driven more slowly towards the junction so that I could stop.",
    "باید آهسته‌تر به تقاطع نزدیک می‌شدم تا بتوانم بایستم.",
    "Farten skal passe til føret, så du kan standse, når det er nødvendigt.", "The speed must suit the road conditions so that you can stop when needed.",
    "سرعت باید با وضع جاده جور باشد تا هر وقت لازم شد بتوانید بایستید."),
  S(True, "Jeg holder øje med trafikken fra siderne, når jeg kører over.", "I watch the traffic from the sides as I drive through.",
    "هنگام عبور، مراقب ترافیک دو طرف هستم.",
    "Den tværgående trafik får snart grønt.", "The crossing traffic will soon get green.", "ترافیک عرضی به‌زودی چراغ سبز می‌گیرد."),
  S(False, "Gult betyder altid, at jeg skal bremse så hårdt, jeg kan.", "Yellow always means that I must brake as hard as I can.",
    "زرد همیشه یعنی باید تا جای ممکن محکم ترمز بگیرم.",
    "På is kan en hård opbremsning få bilen til at skride ud i krydset.", "On ice hard braking can make the car skid out into the junction.",
    "روی یخ، ترمز شدید ممکن است خودرو را به داخل تقاطع بلغزاند."),
)

Q(5559, "7.14", view("""
THE SCENE: we wait near the centre line of a two-way town street to turn LEFT into a side street (our left indicator lamp glows on the
dashboard strip); the oncoming lane has a standing queue; a van in the queue has stopped, leaving a gap at the side street, and its driver
waves us through; along the far side of the street, behind the queue, runs a cycle path, partly hidden by the queue, and a cyclist's head
can just be seen above the cars on it.
MUST BE CLEARLY VISIBLE: the gap in the queue, the waving van driver, the cycle path behind the queue, the cyclist partly hidden.
MUST NOT APPEAR: signs, text."""),
  "Du vil svinge til venstre. Den modkørende kø holder stille, og en varevogn har lavet et hul og vinker dig igennem. Langs den modsatte "
  "side er der en cykelsti. Hvordan forholder du dig?",
  "You want to turn left. The oncoming queue is standing still, and a van has left a gap and waves you through. Along the far side there "
  "is a cycle path. What do you do?",
  "می‌خواهید به چپ بپیچید. صف خودروهای روبه‌رو ایستاده و یک ون جا باز کرده و به شما اشاره می‌کند که رد شوید. در طرف مقابل مسیر دوچرخه "
  "هست. چه می‌کنید؟",
  S(True, "En cyklist kan komme på cykelstien bag køen, hvor jeg ikke kan se ham.",
    "A cyclist may come along the cycle path behind the queue, where I cannot see him.",
    "ممکن است دوچرخه‌سواری در مسیر دوچرخه‌ی پشت صف بیاید، جایی که او را نمی‌بینم.",
    "Køen skjuler cykelstien.", "The queue hides the cycle path.", "صف خودروها مسیر دوچرخه را پنهان می‌کند."),
  S(True, "Jeg kører langsomt frem gennem hullet og er klar til at standse for cyklister.",
    "I move slowly through the gap and am ready to stop for cyclists.",
    "آهسته از میان فاصله جلو می‌روم و آماده‌ی توقف برای دوچرخه‌سواران هستم.",
    "Du må ikke svinge til venstre, før det kan ske uden ulempe for modkørende, også cyklister.",
    "You must not turn left until it can be done without inconvenience to oncoming traffic, cyclists included.",
    "تا وقتی پیچیدن به چپ بدون مزاحمت برای ترافیک روبه‌رو، از جمله دوچرخه‌سواران، ممکن نیست نباید بپیچید."),
  S(False, "Når varevognen vinker, har jeg forkørselsret.", "When the van driver waves, I have right of way.",
    "وقتی راننده‌ی ون اشاره می‌کند، حق تقدم با من است.",
    "Et vink giver dig ingen ret; du skal selv sikre dig, at svinget kan ske uden fare.",
    "A wave gives you no right; you must make sure yourself that the turn can be made safely.",
    "اشاره‌ی دست حقی به شما نمی‌دهد؛ خودتان باید مطمئن شوید که پیچیدن بی‌خطر است."),
  S(False, "Cyklister på cykelstien skal holde tilbage for mig, fordi køen holder stille.",
    "Cyclists on the cycle path must give way to me because the queue is standing still.",
    "دوچرخه‌سواران مسیر دوچرخه باید به من حق تقدم بدهند، چون صف ایستاده است.",
    "Cyklisterne kører ligeud og skal ikke holde tilbage for dig.", "The cyclists are going straight on and need not give way to you.",
    "دوچرخه‌سواران مستقیم می‌روند و لازم نیست به شما حق تقدم بدهند."),
)

Q(5560, "7.14", above("""
THE SCENE: a junction seen from above; our road runs up the picture with one lane in each direction; a side road goes off to the LEFT, and
a long raised traffic island lies in the middle of the side road, starting right at the junction.
VEHICLES (colour code used strictly): a RED car (ours) at the centre line, about to turn left; a SOLID GREEN arrow from the red car turning
left round the front end of the island into the right-hand half of the side road; a DASHED ORANGE arrow from the red car cutting the corner
into the left-hand half of the side road, to the left of the island.
MUST NOT APPEAR: signs, text."""),
  "Du vil svinge til venstre ind på en sidevej, hvor der ligger en helle midt på vejen lige fra krydset. Hvordan svinger du?",
  "You want to turn left into a side road with a traffic island in its middle starting right at the junction. How do you turn?",
  "می‌خواهید به چپ وارد راهی فرعی شوید که از همان تقاطع، جزیره‌ای وسطش دارد. چطور می‌پیچید؟",
  S(True, "Jeg svinger, så jeg kommer ind i højre side af hellen.", "I turn so that I enter on the right-hand side of the island.",
    "طوری می‌پیچم که از سمت راستِ جزیره وارد شوم.",
    "Du skal holde til højre for heller, og svinget skal ende i højre side af den vej, du svinger ind på.",
    "You must keep to the right of islands, and the turn must end on the right-hand side of the road you turn into.",
    "باید از سمت راست جزیره‌ها رد شوید و پیچیدن باید در سمت راستِ راهی که وارد آن می‌شوید تمام شود."),
  S(False, "Jeg må skære svinget og køre venstre om hellen, når der ikke kommer nogen.",
    "I may cut the corner and pass to the left of the island when nobody is coming.",
    "وقتی کسی نمی‌آید، می‌توانم پیچ را میان‌بُر بزنم و از سمت چپ جزیره بروم.",
    "Så kommer du ind i den forkerte side af vejen.", "Then you enter the wrong side of the road.", "این‌طور وارد سمت اشتباه راه می‌شوید."),
  S(False, "Hellen betyder, at jeg ikke må svinge ind på sidevejen.", "The island means that I must not turn into the side road.",
    "این جزیره یعنی نباید وارد راه فرعی شوم.",
    "Hellen deler vejen; du må svinge ind, når du holder til højre for den.", "The island divides the road; you may turn in when you keep to its right.",
    "جزیره راه را تقسیم می‌کند؛ اگر از سمت راستش بروید، می‌توانید وارد شوید."),
)

Q(5561, "7.14", view("""
THE SCENE: seen from the driver's seat while turning LEFT at a junction in town; the left windscreen pillar of our car is thick and hides
part of the view to the left; just beside the pillar a pedestrian is stepping off the kerb to cross the road we are turning into.
MUST BE CLEARLY VISIBLE: the thick left windscreen pillar, the pedestrian partly hidden beside it.
MUST NOT APPEAR: signs, text."""),
  "Du svinger til venstre i et kryds. Bilens venstre forstolpe skjuler en del af udsynet. Hvad gælder?",
  "You are turning left at a junction. The car's left windscreen pillar hides part of the view. What applies?",
  "در تقاطعی به چپ می‌پیچید. ستون جلوی سمت چپ خودرو بخشی از دید را پوشانده است. چه قاعده‌ای برقرار است؟",
  S(True, "Stolpen kan skjule en fodgænger eller cyklist, der er på vej over.", "The pillar can hide a pedestrian or cyclist who is crossing.",
    "این ستون ممکن است عابر یا دوچرخه‌سواری را که در حال عبور است پنهان کند.",
    "Forstolperne giver en blind vinkel, der kan skjule en hel person.", "The windscreen pillars create a blind spot that can hide a whole person.",
    "ستون‌های جلو نقطه‌ی کوری ایجاد می‌کنند که می‌تواند یک انسان کامل را پنهان کند."),
  S(True, "Jeg flytter hovedet, så jeg kan se rundt om stolpen.", "I move my head so that I can see round the pillar.",
    "سرم را جابه‌جا می‌کنم تا اطراف ستون را ببینم.",
    "Så kan du se det, stolpen ellers skjuler.", "Then you can see what the pillar would otherwise hide.", "این‌طور چیزی را که ستون پنهان می‌کند می‌بینید."),
  S(True, "Jeg svinger langsomt, så jeg kan nå at opdage dem, der er skjult.", "I turn slowly so that I can spot those who are hidden in time.",
    "آهسته می‌پیچم تا بتوانم به‌موقع کسانی را که پنهان‌اند ببینم.",
    "Ved svingning må du ikke være til fare for gående, der krydser den vej, du svinger ind på.",
    "When turning you must not endanger pedestrians crossing the road you turn into.",
    "هنگام پیچیدن نباید برای عابرانی که از راه مقصد می‌گذرند خطری ایجاد کنید."),
  S(False, "Stolpen er så smal, at den ikke kan skjule en voksen person.", "The pillar is so narrow that it cannot hide an adult.",
    "این ستون آن‌قدر باریک است که نمی‌تواند یک بزرگسال را پنهان کند.",
    "Selv en smal stolpe tæt på øjnene kan skjule en person et stykke væk.", "Even a narrow pillar close to your eyes can hide a person some way off.",
    "حتی ستونی باریک که نزدیک چشم است می‌تواند فردی را در فاصله‌ای دورتر پنهان کند."),
)

Q(5562, "7.14", view("""
THE SCENE: we stand at the exit of a supermarket car park, about to turn LEFT onto a two-way road (our left indicator lamp glows on the
dashboard strip); the exit crosses a pavement and a cycle path; there is a cycle path on both sides of the road; on the near cycle path a
cyclist approaches from the left, on the far cycle path one approaches from the right, and a car approaches on the road from the right.
MUST BE CLEARLY VISIBLE: the pavement and cycle path across the exit, both cycle paths with their cyclists, the car from the right.
MUST NOT APPEAR: signs, text."""),
  "Du vil svinge til venstre ud fra en parkeringsplads. Der er cykelstier i begge sider af vejen. Hvad gælder?",
  "You want to turn left out of a car park. There are cycle paths on both sides of the road. What applies?",
  "می‌خواهید از یک پارکینگ به چپ بپیچید و خارج شوید. در هر دو طرف جاده مسیر دوچرخه هست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg har ubetinget vigepligt for trafikken på vejen og på cykelstierne.",
    "I must give way to the traffic on the road and on the cycle paths.",
    "باید به ترافیک جاده و مسیرهای دوچرخه بی‌قیدوشرط حق تقدم بدهم.",
    "Ved udkørsel fra en parkeringsplads har du ubetinget vigepligt.", "When driving out of a car park you must give way.",
    "هنگام خروج از پارکینگ باید بی‌قیدوشرط حق تقدم بدهید."),
  S(True, "Jeg skal holde øje med cyklister fra begge sider på begge cykelstier.",
    "I must watch for cyclists from both directions on both cycle paths.",
    "باید مراقب دوچرخه‌سواران از هر دو طرف در هر دو مسیر دوچرخه باشم.",
    "Når du svinger til venstre, skal du over begge cykelstier.", "When you turn left, you have to cross both cycle paths.",
    "وقتی به چپ می‌پیچید، باید از هر دو مسیر دوچرخه بگذرید."),
  S(True, "Jeg skal også holde tilbage for gående på fortovet, som jeg kører over.",
    "I must also give way to pedestrians on the pavement that I drive across.",
    "باید به عابران پیاده‌رویی که از رویش می‌گذرم هم راه بدهم.",
    "Kørende, der kører over et fortov, skal holde tilbage for gående.", "Drivers crossing a pavement must give way to pedestrians.",
    "رانندگانی که از روی پیاده‌رو می‌گذرند باید به عابران راه بدهند."),
  S(True, "Er der meget trafik, kan det være sikrere at svinge til højre og vende et sikkert sted.",
    "If there is a lot of traffic, it may be safer to turn right and turn round somewhere safe.",
    "اگر ترافیک زیاد است، شاید امن‌تر باشد به راست بپیچم و جایی امن دور بزنم.",
    "Et højresving kræver kun et hul i trafikken fra én side.", "A right turn only needs a gap in the traffic from one side.",
    "پیچیدن به راست فقط به فاصله‌ای در ترافیک یک طرف نیاز دارد."),
)

Q(5563, "7.14", above("""
THE SCENE: a junction seen from above: a main road runs left to right; two side roads join it opposite each other, one from the bottom of
the picture and one from the top; both side roads have give-way signs and shark teeth at the main road; the main road is empty.
VEHICLES (colour code used strictly): a RED car (ours) at the shark teeth of the bottom side road with its left indicator flashing, about
to turn LEFT onto the main road; a GREY car at the shark teeth of the top side road, about to drive straight across into our side road.
MUST NOT APPEAR: arrows, text."""),
  "Du holder ved hajtænderne i en sidevej og vil svinge til venstre ad hovedvejen. Over for dig holder en bil ved hajtænderne i den anden "
  "sidevej og skal ligeud. Hovedvejen er fri. Hvad gælder?",
  "You are waiting at the shark teeth in a side road and want to turn left onto the main road. Opposite you a car is waiting at the shark "
  "teeth in the other side road and is going straight on. The main road is clear. What applies?",
  "در یک راه فرعی پشت خط‌های دندانه‌کوسه‌ای ایستاده‌اید و می‌خواهید به چپ وارد جاده‌ی اصلی شوید. روبه‌روی شما، در راه فرعی دیگر، خودرویی "
  "پشت دندانه‌کوسه‌ای‌ها ایستاده و می‌خواهد مستقیم برود. جاده‌ی اصلی خالی است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal lade den modkørende bil køre først, fordi jeg svinger til venstre.",
    "I must let the oncoming car go first, because I am turning left.",
    "باید بگذارم خودروی روبه‌رو اول برود، چون من به چپ می‌پیچم.",
    "Du må ikke svinge til venstre, før det kan ske uden ulempe for den modkørende færdsel.",
    "You must not turn left until it can be done without inconvenience to oncoming traffic.",
    "تا وقتی پیچیدن به چپ بدون مزاحمت برای ترافیک روبه‌رو ممکن نیست، نباید بپیچید."),
  S(False, "Jeg kører først, fordi den anden bil har samme vigepligt som mig.", "I go first, because the other car must give way just as I must.",
    "من اول می‌روم، چون آن خودرو هم مثل من موظف به حق تقدم دادن است.",
    "Mellem jer to gælder reglen om venstresving: du skal holde tilbage for den modkørende.",
    "Between the two of you the left-turn rule applies: you must give way to the oncoming car.",
    "بین شما دو نفر قاعده‌ی پیچیدن به چپ برقرار است: باید به خودروی روبه‌رو راه بدهید."),
  S(False, "Højre vigepligt afgør, hvem der kører først.", "The right-hand rule decides who goes first.",
    "قاعده‌ی حق تقدم دست راست تعیین می‌کند چه کسی اول برود.",
    "I kommer imod hinanden, så ingen af jer har den anden på sin højre side.",
    "You are coming towards each other, so neither of you has the other on the right.",
    "شما روبه‌روی هم هستید، پس هیچ‌کدام دیگری را در سمت راست خود ندارد."),
  S(False, "Den modkørende bil skal holde tilbage for mig, fordi den skal krydse hovedvejen.",
    "The oncoming car must give way to me because it has to cross the main road.",
    "خودروی روبه‌رو باید به من حق تقدم بدهد، چون باید از جاده‌ی اصلی عبور کند.",
    "Begge har vigepligt for trafikken på hovedvejen, men indbyrdes skal du som venstresvingende holde tilbage.",
    "Both must give way to the traffic on the main road, but between you, you as the left-turner must give way.",
    "هر دو باید به ترافیک جاده‌ی اصلی حق تقدم بدهید، ولی بین خودتان، شما که به چپ می‌پیچید باید راه بدهید."),
)

Q(5564, "7.13", view("""
THE SCENE: we approach a junction in town where we want to turn RIGHT (our right indicator lamp glows on the dashboard strip); a cycle path
runs along the right side of our road; in the right door mirror (at the right edge of the picture) a cyclist on an electric bicycle
approaches on the cycle path, still some way behind but riding fast.
MUST BE CLEARLY VISIBLE: the cycle path, the cyclist on the electric bicycle in the door mirror.
MUST NOT APPEAR: signs, text, brand names."""),
  "Du vil svinge til højre. I spejlet ser du en cyklist på en elcykel et stykke bag dig på cykelstien. Hvordan forholder du dig?",
  "You want to turn right. In the mirror you see a cyclist on an electric bicycle some way behind you on the cycle path. What do you do?",
  "می‌خواهید به راست بپیچید. در آینه دوچرخه‌سواری را با دوچرخه‌ی برقی می‌بینید که کمی عقب‌تر روی مسیر دوچرخه می‌آید. چه می‌کنید؟",
  S(True, "Elcyklen kan køre hurtigt, så cyklisten kan nå frem til krydset før mig.",
    "The electric bicycle can go fast, so the cyclist may reach the junction before me.",
    "دوچرخه‌ی برقی می‌تواند سریع برود، پس ممکن است دوچرخه‌سوار زودتر از من به تقاطع برسد.",
    "Det er let at undervurdere, hvor hurtigt en elcykel kommer.", "It is easy to underestimate how fast an electric bicycle is coming.",
    "دست‌کم گرفتن سرعت دوچرخه‌ی برقی آسان است."),
  S(True, "Jeg holder tilbage og lader cyklisten køre ligeud først.", "I hold back and let the cyclist go straight on first.",
    "صبر می‌کنم و می‌گذارم دوچرخه‌سوار اول مستقیم برود.",
    "Ved højresving må du ikke være til ulempe for cyklister, der kører ligeud.",
    "When turning right you must not inconvenience cyclists going straight on.",
    "هنگام پیچیدن به راست نباید برای دوچرخه‌سوارانی که مستقیم می‌روند مزاحمت ایجاد کنید."),
  S(False, "Cyklisten er så langt væk, at jeg altid kan nå at svinge først.", "The cyclist is so far away that I can always turn first.",
    "دوچرخه‌سوار آن‌قدر دور است که همیشه می‌توانم زودتر بپیچم.",
    "En hurtig elcykel kan være ved krydset, mens du svinger.", "A fast electric bicycle may be at the junction while you are turning.",
    "دوچرخه‌ی برقیِ سریع ممکن است وقتی می‌پیچید به تقاطع رسیده باشد."),
)

Q(5565, "7.13", view("""
THE SCENE: a straight two-lane country road between fields; about 80 m ahead a field track goes off to the RIGHT; in the interior
rear-view mirror at the top of the picture a car follows close behind us.
MUST BE CLEARLY VISIBLE: the field track ahead on the right, the car close behind in the interior mirror.
MUST NOT APPEAR: signs, text."""),
  "Du vil svinge til højre ad en markvej. Bilen bag dig kører tæt. Hvordan forholder du dig?",
  "You want to turn right into a field track. The car behind you is driving close. What do you do?",
  "می‌خواهید به راست وارد یک راه مزرعه شوید. خودروی پشت سرتان نزدیک می‌آید. چه می‌کنید؟",
  S(True, "Jeg giver tegn i god tid, så bilen bag mig kan nå at reagere.", "I signal in good time so that the car behind me can react.",
    "به‌موقع راهنما می‌زنم تا خودروی پشتی فرصت واکنش داشته باشد.",
    "Tegn skal gives i god tid før svingning.", "Signals must be given in good time before turning.",
    "راهنما باید به‌موقع پیش از پیچیدن زده شود."),
  S(True, "Jeg bremser tidligt og roligt i stedet for pludseligt.", "I brake early and gently instead of suddenly.",
    "زود و آرام ترمز می‌گیرم، نه ناگهانی.",
    "Pludselige opbremsninger uden grund er forbudt og kan give en påkørsel bagfra.",
    "Sudden braking without reason is forbidden and can lead to a rear-end collision.",
    "ترمز ناگهانیِ بی‌دلیل ممنوع است و ممکن است باعث تصادف از پشت شود."),
  S(True, "Jeg holder øje med cyklister og gående i højre side, før jeg svinger.",
    "I look out for cyclists and pedestrians on the right before I turn.",
    "پیش از پیچیدن، مراقب دوچرخه‌سواران و عابران سمت راست هستم.",
    "Der kan være nogen i vejkanten, som du skal holde tilbage for.", "There may be someone at the edge of the road you must give way to.",
    "ممکن است کسی کنار جاده باشد که باید به او راه بدهید."),
  S(False, "Jeg venter med at blinke, til jeg er lige ved markvejen, så bilen bag mig ikke tror, at jeg standser.",
    "I wait to signal until I am right at the field track, so that the car behind does not think I am stopping.",
    "تا نزدیک راه مزرعه صبر می‌کنم و بعد راهنما می‌زنم تا خودروی پشتی فکر نکند می‌ایستم.",
    "Et sent tegn giver bilen bag dig for lidt tid til at reagere.", "A late signal gives the car behind you too little time to react.",
    "راهنمای دیرهنگام به خودروی پشتی زمان کافی برای واکنش نمی‌دهد."),
)

Q(5566, "7.13", town("""
THE SCENE: we are turning RIGHT from a town street into a side street; the pavement along our street continues at its own raised level
across the side street's mouth; a pedestrian walks along the pavement towards the side street's mouth and is about to cross it.
MUST BE CLEARLY VISIBLE: the pavement continuing across the side street, the pedestrian walking along it.
MUST NOT APPEAR: signs, zebra crossings, text."""),
  "Du svinger til højre ind på en sidevej. Fortovet langs vejen fortsætter hen over sidevejen, og en fodgænger går ad fortovet. Hvad gælder?",
  "You are turning right into a side street. The pavement along the road continues across the side street, and a pedestrian is walking "
  "along it. What applies?",
  "به راست وارد خیابانی فرعی می‌شوید. پیاده‌روی کنار خیابان از روی دهانه‌ی خیابان فرعی ادامه دارد و عابری در آن راه می‌رود. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg skal holde tilbage for fodgængeren, fordi jeg kører over fortovet.", "I must give way to the pedestrian because I am crossing the pavement.",
    "باید به عابر راه بدهم، چون از روی پیاده‌رو می‌گذرم.",
    "Kørende, der kører over et fortov, skal holde tilbage for gående.", "Drivers crossing a pavement must give way to pedestrians.",
    "رانندگانی که از روی پیاده‌رو می‌گذرند باید به عابران راه بدهند."),
  S(False, "Fodgængeren skal vente, fordi jeg er i gang med at svinge.", "The pedestrian must wait because I am already turning.",
    "عابر باید صبر کند، چون من در حال پیچیدن هستم.",
    "Gående på fortovet har fortrinsret, når du kører over det.", "Pedestrians on the pavement have priority when you cross it.",
    "وقتی از روی پیاده‌رو می‌گذرید، عابرانِ آن مقدم‌اند."),
  S(False, "Jeg må køre, fordi der ikke er et fodgængerfelt.", "I may drive on because there is no pedestrian crossing.",
    "چون خط عابر پیاده نیست، می‌توانم بروم.",
    "Pligten gælder, selv om der ikke er et fodgængerfelt.", "The duty applies even though there is no pedestrian crossing.",
    "این وظیفه حتی بدون خط عابر پیاده هم برقرار است."),
)

Q(5567, "7.13", town("""
THE SCENE: we are turning RIGHT into a town street; just after the corner a city bus stands at a bus stop in that street with its doors
open, and passengers are getting off; one passenger walks towards the rear of the bus as if to cross the street behind it.
MUST BE CLEARLY VISIBLE: the bus at the stop just after the corner, the passengers getting off, the one walking behind the bus.
MUST NOT APPEAR: signs, text, route numbers."""),
  "Du svinger til højre ind på en gade, hvor en bus holder ved et stoppested lige efter hjørnet. Passagerer er ved at stige af. "
  "Hvordan forholder du dig?",
  "You are turning right into a street where a bus is standing at a stop just after the corner. Passengers are getting off. What do you do?",
  "به راست وارد خیابانی می‌شوید که درست بعد از نبش آن اتوبوسی در ایستگاه ایستاده و مسافران پیاده می‌شوند. چه می‌کنید؟",
  S(True, "Jeg holder en passende lav fart, når jeg kører forbi bussen.", "I keep a suitably low speed when I pass the bus.",
    "هنگام رد شدن از کنار اتوبوس، سرعتم را به اندازه‌ی کافی پایین نگه می‌دارم.",
    "Når en bus holder ved et stoppested for at lade passagerer stige af eller på, skal farten være passende lav.",
    "When a bus is standing at a stop to let passengers off or on, the speed must be suitably low.",
    "وقتی اتوبوسی برای پیاده و سوار شدن مسافران در ایستگاه ایستاده، سرعت باید به اندازه‌ی کافی پایین باشد."),
  S(True, "Passagerer kan gå ud på kørebanen foran eller bag bussen.", "Passengers may step out into the road in front of or behind the bus.",
    "ممکن است مسافران از جلو یا پشت اتوبوس وارد خیابان شوند.",
    "Bussen skjuler dem, der går om bag den.", "The bus hides those who walk round behind it.", "اتوبوس کسانی را که از پشتش رد می‌شوند پنهان می‌کند."),
  S(False, "Jeg kører hurtigt forbi, før bussen kører igen.", "I drive past quickly before the bus moves off again.",
    "پیش از راه افتادن دوباره‌ی اتوبوس، سریع از کنارش رد می‌شوم.",
    "Høj fart forbi en holdende bus er farlig for passagererne.", "High speed past a standing bus is dangerous for the passengers.",
    "سرعت زیاد هنگام رد شدن از کنار اتوبوس ایستاده برای مسافران خطرناک است."),
  S(False, "Passagererne skal vente på fortovet, til jeg er kørt forbi.", "The passengers must wait on the pavement until I have passed.",
    "مسافران باید تا رد شدن من در پیاده‌رو صبر کنند.",
    "Du kan ikke regne med, at de venter, og du skal køre, så du kan standse for dem.",
    "You cannot count on them waiting, and you must drive so that you can stop for them.",
    "نمی‌توانید روی صبر کردن آن‌ها حساب کنید و باید طوری برانید که بتوانید برایشان بایستید."),
)

Q(5568, "7.11", view("""
THE SCENE: we stand at a level crossing with half barriers and TWO tracks; a train has just passed and can be seen leaving to the left; the
barriers have started to rise but are only half up, and the red lights beside them are still flashing.
MUST BE CLEARLY VISIBLE: the half-raised barriers, the flashing red lights, the two tracks, the train leaving.
MUST NOT APPEAR: signs other than the crossing's own signals, text."""),
  "Toget er lige kørt forbi. Bommene er ved at gå op, men de røde lys blinker stadig. Hvad gør du?",
  "The train has just passed. The barriers are rising, but the red lights are still flashing. What do you do?",
  "قطار تازه رد شده است. راه‌بندها در حال بالا رفتن‌اند، ولی چراغ‌های قرمز هنوز چشمک می‌زنند. چه می‌کنید؟",
  S(True, "Jeg venter, til bommene er helt oppe, og lyset er holdt op med at blinke.",
    "I wait until the barriers are fully up and the light has stopped flashing.",
    "صبر می‌کنم تا راه‌بندها کاملاً بالا بروند و چراغ دیگر چشمک نزند.",
    "Du må ikke køre over, mens bommene åbnes, eller mens signalet viser, at du skal standse.",
    "You must not cross while the barriers are opening or while the signal shows that you must stop.",
    "تا وقتی راه‌بندها در حال باز شدن‌اند یا چراغ نشان می‌دهد باید بایستید، نباید رد شوید."),
  S(True, "Der kan komme et tog mere, især hvor der er flere spor.", "Another train may come, especially where there are several tracks.",
    "ممکن است قطار دیگری بیاید، به‌ویژه جایی که چند ریل هست.",
    "Et tog kan skjule et andet, der kommer fra den modsatte side.", "One train can hide another coming from the other side.",
    "یک قطار ممکن است قطار دیگری را که از سمت مقابل می‌آید پنهان کند."),
  S(False, "Jeg må køre, så snart toget er passeret.", "I may go as soon as the train has passed.", "به محض رد شدن قطار می‌توانم بروم.",
    "Du skal vente, til signalet er slukket, og bommene er oppe.", "You must wait until the signal is off and the barriers are up.",
    "باید صبر کنید تا چراغ خاموش شود و راه‌بندها بالا باشند."),
  S(False, "Jeg kører uden om bommene, så jeg sparer tid.", "I drive round the barriers to save time.", "برای صرفه‌جویی در وقت، از کنار راه‌بندها دور می‌زنم.",
    "Det er livsfarligt og forbudt at køre over, når bommene ikke er oppe.", "It is deadly dangerous and forbidden to cross when the barriers are not up.",
    "عبور وقتی راه‌بندها بالا نیستند بسیار خطرناک و ممنوع است."),
)

Q(5569, "7.11", view("""
THE SCENE: we stand second in line at the end of a side road with a give-way sign and shark teeth; the car in front of us is just pulling
out onto the main road to the right; on the main road a car approaches from the left at some distance.
MUST BE CLEARLY VISIBLE: the car in front pulling out, the shark teeth ahead of it, the car approaching from the left.
MUST NOT APPEAR: other signs, text."""),
  "Bilen foran dig har holdt ved hajtænderne og kører nu ud på hovedvejen. Hvad gælder for dig?",
  "The car in front of you has waited at the shark teeth and is now pulling out onto the main road. What applies to you?",
  "خودروی جلوی شما پشت خط‌های دندانه‌کوسه‌ای ایستاده بود و حالا وارد جاده‌ی اصلی می‌شود. برای شما چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal selv køre frem til hajtænderne og se mig for, før jeg kører ud.",
    "I must move up to the shark teeth myself and look before I pull out.",
    "باید خودم تا خط‌های دندانه‌کوسه‌ای جلو بروم و پیش از خروج به اطراف نگاه کنم.",
    "Vigepligten gælder for hver enkelt, der skal ud på vejen.", "The duty to give way applies to each driver who is entering the road.",
    "وظیفه‌ی حق تقدم دادن برای تک‌تک کسانی است که وارد جاده می‌شوند."),
  S(False, "Når bilen foran kan nå at køre ud, kan jeg også.", "If the car in front can get out in time, so can I.",
    "اگر خودروی جلو بتواند به‌موقع خارج شود، من هم می‌توانم.",
    "Situationen kan have ændret sig, når det bliver din tur.", "The situation may have changed when it is your turn.",
    "ممکن است وقتی نوبت شما می‌شود، وضعیت عوض شده باشد."),
  S(False, "Jeg kører tæt efter den, så vi kommer ud sammen.", "I follow closely so that we get out together.",
    "پشت سرش نزدیک حرکت می‌کنم تا با هم خارج شویم.",
    "Du skal selv overholde din vigepligt og holde afstand.", "You must keep your own duty to give way and keep your distance.",
    "خودتان باید حق تقدم را رعایت کنید و فاصله نگه دارید."),
)

Q(5570, "7.11", view("""
THE SCENE: a country road in dense fog approaching a junction; a give-way sign is barely visible on the right; the crossing road can only be
seen for about 30 m in each direction before it disappears into the fog.
MUST BE CLEARLY VISIBLE: the dense fog, the faint give-way sign, the crossing road disappearing into the fog.
MUST NOT APPEAR: other signs, text, vehicles.""", cond="dense fog, wet road, poor visibility"),
  "Det er tæt tåge, og du nærmer dig et kryds, hvor du har vigepligt. Du kan kun se et kort stykke ud ad den tværgående vej. Hvordan "
  "forholder du dig?",
  "It is foggy, and you are approaching a junction where you must give way. You can only see a short way along the crossing road. What do "
  "you do?",
  "مه غلیظ است و به تقاطعی نزدیک می‌شوید که در آن باید حق تقدم بدهید. فقط مسافت کوتاهی از جاده‌ی عرضی را می‌بینید. چه می‌کنید؟",
  S(True, "Jeg sænker farten i god tid og standser, hvis det er nødvendigt for at se.",
    "I slow down in good time and stop if that is necessary to see.",
    "به‌موقع سرعتم را کم می‌کنم و اگر برای دیدن لازم باشد، می‌ایستم.",
    "Du skal kunne opfylde din vigepligt, selv når du ser dårligt.", "You must be able to give way even when you can see badly.",
    "حتی وقتی دید کم است، باید بتوانید حق تقدم را رعایت کنید."),
  S(True, "Jeg kan rulle vinduet ned for at lytte efter trafik.", "I can wind the window down to listen for traffic.",
    "می‌توانم شیشه را پایین بکشم تا صدای ترافیک را بشنوم.",
    "I tåge kan du ofte høre en bil, før du kan se den.", "In fog you can often hear a car before you can see it.",
    "در مه اغلب صدای خودرو را پیش از دیدنش می‌شنوید."),
  S(True, "Jeg kører først ud, når jeg er sikker på, at der er frit.", "I only pull out when I am sure the road is clear.",
    "فقط وقتی مطمئنم راه باز است، خارج می‌شوم.",
    "Du har vigepligt for trafikken fra begge sider.", "You must give way to the traffic from both sides.",
    "باید به ترافیک هر دو طرف حق تقدم بدهید."),
  S(False, "Jeg kører hurtigt over, så jeg er mindst mulig tid i krydset.", "I drive across quickly so that I spend as little time as possible in the junction.",
    "سریع رد می‌شوم تا کمترین زمان را در تقاطع باشم.",
    "Du kan ikke se, om der kommer nogen, og skal derfor holde tilbage.", "You cannot see whether anyone is coming and must therefore hold back.",
    "نمی‌بینید کسی می‌آید یا نه، پس باید صبر کنید."),
)

Q(5571, "7.11", view("""
THE SCENE: a two-lane road approaching a junction about 60 m ahead, where a give-way sign stands on our side and shark teeth lie across our
lane; traffic passes on the crossing road; in the interior rear-view mirror at the top of the picture a car follows very close behind us.
MUST BE CLEARLY VISIBLE: the give-way sign and shark teeth ahead, the traffic on the crossing road, the car close behind in the mirror.
MUST NOT APPEAR: other signs, text."""),
  "Du nærmer dig et kryds, hvor du har vigepligt. Bilen bag dig kører meget tæt. Hvordan forholder du dig?",
  "You are approaching a junction where you must give way. The car behind you is driving very close. What do you do?",
  "به تقاطعی نزدیک می‌شوید که در آن باید حق تقدم بدهید. خودروی پشت سرتان خیلی نزدیک می‌آید. چه می‌کنید؟",
  S(True, "Jeg bremser tidligt og roligt, så bilen bag mig kan nå at reagere.", "I brake early and gently so that the car behind me can react.",
    "زود و آرام ترمز می‌گیرم تا خودروی پشتی فرصت واکنش داشته باشد.",
    "Så undgår du en påkørsel bagfra.", "That way you avoid being hit from behind.", "این‌طور از تصادف از پشت جلوگیری می‌کنید."),
  S(True, "Jeg lader mig ikke presse til at køre ud, før der er frit.", "I do not let myself be pushed into pulling out before the road is clear.",
    "اجازه نمی‌دهم مجبورم کنند پیش از باز شدن راه خارج شوم.",
    "Din vigepligt gælder, uanset hvordan bilen bag dig kører.", "Your duty to give way applies however the car behind you is driving.",
    "وظیفه‌ی حق تقدم دادن شما، صرف‌نظر از نحوه‌ی رانندگی خودروی پشتی، برقرار است."),
  S(False, "Jeg kører ud uden at standse, så bilen bag mig ikke kører op i mig.",
    "I pull out without stopping so that the car behind me does not run into me.",
    "بدون توقف وارد می‌شوم تا خودروی پشتی به من نزند.",
    "Du skal opfylde din vigepligt; det er den bagfrakørende, der skal holde afstand.",
    "You must give way; it is the driver behind who must keep the distance.",
    "باید حق تقدم بدهید؛ این راننده‌ی پشتی است که باید فاصله نگه دارد."),
  S(False, "Jeg tænder havariblinket for at få bilen bag mig til at holde afstand.",
    "I switch on the hazard lights to make the car behind me keep its distance.",
    "چراغ‌های فلاشر را روشن می‌کنم تا خودروی پشتی فاصله بگیرد.",
    "Havariblinket er ikke til at regulere afstanden; giv tegn og brems i god tid.",
    "The hazard lights are not for controlling the distance; signal and brake in good time.",
    "چراغ فلاشر برای تنظیم فاصله نیست؛ به‌موقع راهنما بزنید و ترمز بگیرید."),
)

Q(5572, "7.7", view("""
THE SCENE: road works close one lane of a two-lane road; before the narrowing a portable traffic light on a stand shows RED; the narrowed
stretch with cones and barriers curves to the left, so its far end cannot be seen; no oncoming traffic is visible.
MUST BE CLEARLY VISIBLE: the portable red light, the cones narrowing the road to one lane, the curve hiding the far end.
MUST NOT APPEAR: signs, text, workers."""),
  "Ved et vejarbejde skiftes trafikken til at køre i én vognbane, styret af midlertidige lyssignaler. Dit lys er rødt, men du kan ikke se "
  "nogen modkørende. Hvad gør du?",
  "At road works the traffic takes turns to use one lane, controlled by temporary traffic lights. Your light is red, but you cannot see any "
  "oncoming traffic. What do you do?",
  "کنار یک کار جاده‌ای، ترافیک به‌نوبت از یک خط عبور می‌کند و چراغ‌های موقت آن را کنترل می‌کنند. چراغ شما قرمز است، ولی خودرویی از "
  "روبه‌رو نمی‌بینید. چه می‌کنید؟",
  S(True, "Jeg venter, til lyset bliver grønt.", "I wait until the light turns green.", "صبر می‌کنم تا چراغ سبز شود.",
    "Også midlertidige lyssignaler skal følges.", "Temporary traffic lights must be obeyed too.", "چراغ‌های موقت را هم باید رعایت کرد."),
  S(True, "Der kan være modkørende på strækningen, som jeg ikke kan se.", "There may be oncoming traffic on the stretch that I cannot see.",
    "ممکن است در آن مسیر خودروهایی از روبه‌رو باشند که نمی‌بینم.",
    "Svinget skjuler den anden ende af strækningen.", "The bend hides the other end of the stretch.", "پیچ، انتهای دیگر مسیر را پنهان می‌کند."),
  S(False, "Jeg må køre, når der ikke kommer nogen, fordi lyset kun er midlertidigt.",
    "I may go when nobody is coming, because the light is only temporary.",
    "وقتی کسی نمی‌آید، می‌توانم بروم، چون چراغ موقت است.",
    "Rødt betyder stop, også ved et midlertidigt signal.", "Red means stop, also at a temporary signal.", "قرمز یعنی ایست، حتی در چراغ موقت."),
  S(False, "Jeg må køre over for rødt, hvis jeg dytter først.", "I may drive through the red if I sound the horn first.",
    "اگر اول بوق بزنم، می‌توانم از چراغ قرمز رد شوم.",
    "Hornet giver ingen ret til at køre over for rødt.", "The horn gives no right to drive through a red light.",
    "بوق حق عبور از چراغ قرمز را نمی‌دهد."),
)

Q(5573, "7.7", view("""
THE SCENE: a two-lane country road; an escort car with flashing amber lights on its roof comes towards us, and close behind it follows a
very wide transport carrying a large house module that takes up much of the road, part of it over the centre line.
MUST BE CLEARLY VISIBLE: the escort car with its amber lights, the very wide transport behind it over the centre line.
MUST NOT APPEAR: signs, text."""),
  "En følgebil med gule blink kommer imod dig, og bag den kører en meget bred transport. Hvordan forholder du dig?",
  "An escort car with flashing amber lights is coming towards you, and behind it a very wide transport. What do you do?",
  "یک خودروی اسکورت با چراغ‌های چشمک‌زن زرد از روبه‌رو می‌آید و پشت آن یک بار بسیار پهن حرکت می‌کند. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og holder helt ind til højre.", "I slow down and keep right in to the right.",
    "سرعتم را کم می‌کنم و کاملاً سمت راست می‌روم.",
    "Transporten fylder mere end sin egen vognbane.", "The transport takes up more than its own lane.", "این بار بیش از خط خودش جا می‌گیرد."),
  S(True, "Jeg standser, hvis der ikke er plads til at mødes.", "I stop if there is not enough room to meet.",
    "اگر جای کافی برای رد شدن از کنار هم نباشد، می‌ایستم.",
    "Det er bedre at holde stille ved kanten end at blive klemt.", "It is better to stand still at the edge than to be squeezed.",
    "بهتر است کنار جاده بایستید تا این‌که در تنگنا قرار بگیرید."),
  S(True, "Følgebilen advarer om, at der kommer et køretøj, som fylder mere end normalt.",
    "The escort car warns that a vehicle wider than normal is coming.",
    "خودروی اسکورت هشدار می‌دهد که وسیله‌ای پهن‌تر از معمول در راه است.",
    "Derfor skal du være klar til at gøre plads.", "That is why you must be ready to make room.", "به همین دلیل باید آماده‌ی جا باز کردن باشید."),
  S(False, "Transporten skal holde sig i sin egen vognbane, så jeg kører videre som normalt.",
    "The transport must stay in its own lane, so I carry on as normal.",
    "این بار باید در خط خودش بماند، پس مثل همیشه ادامه می‌دهم.",
    "Den kan ikke være i sin egen vognbane, og du skal tilpasse dig.", "It cannot fit in its own lane, and you must adapt.",
    "این وسیله در خط خودش جا نمی‌شود و شما باید خودتان را تطبیق دهید."),
)

Q(5574, "7.7", view("""
THE SCENE: a narrow country road between hedges, one lane in each direction; about 50 m ahead a rider on a horse comes towards us at the
far edge of the road; the horse tosses its head and looks nervous.
MUST BE CLEARLY VISIBLE: the rider coming towards us, the nervous horse, the narrow road.
MUST NOT APPEAR: signs, text, other vehicles."""),
  "På en smal vej kommer en rytter til hest imod dig. Hesten virker urolig. Hvordan forholder du dig?",
  "On a narrow road a rider on a horse is coming towards you. The horse seems nervous. What do you do?",
  "در جاده‌ای باریک سوارکاری با اسب از روبه‌رو می‌آید. اسب ناآرام به نظر می‌رسد. چه می‌کنید؟",
  S(True, "Jeg kører langsomt forbi og giver hesten så meget plads som muligt.", "I pass slowly and give the horse as much room as possible.",
    "آهسته رد می‌شوم و تا جای ممکن به اسب جا می‌دهم.",
    "Heste kan blive bange for biler og springe til siden.", "Horses can be frightened by cars and jump to the side.",
    "اسب‌ها ممکن است از خودرو بترسند و به کنار بپرند."),
  S(True, "Er hesten meget urolig, standser jeg og lader rytteren passere.", "If the horse is very nervous, I stop and let the rider pass.",
    "اگر اسب خیلی ناآرام باشد، می‌ایستم و می‌گذارم سوارکار رد شود.",
    "En stillestående bil gør hesten mindre bange.", "A standing car frightens the horse less.", "خودروی ایستاده اسب را کمتر می‌ترساند."),
  S(False, "Jeg dytter, så rytteren ved, at jeg kommer.", "I sound the horn so that the rider knows I am coming.",
    "بوق می‌زنم تا سوارکار بداند که می‌آیم.",
    "Et dyt kan skræmme hesten, og hornet må kun bruges for at forebygge eller afværge fare.",
    "A toot can frighten the horse, and the horn may only be used to prevent or avert danger.",
    "بوق ممکن است اسب را بترساند و فقط برای پیشگیری یا دفع خطر است."),
  S(False, "Jeg sætter farten op for hurtigt at komme forbi hesten.", "I speed up to get past the horse quickly.",
    "سرعتم را بالا می‌برم تا سریع از کنار اسب رد شوم.",
    "Høj fart og motorstøj kan få hesten til at gå i panik.", "High speed and engine noise can make the horse panic.",
    "سرعت زیاد و صدای موتور ممکن است اسب را وحشت‌زده کند."),
)

Q(5575, "7.7", view("""
THE SCENE: a two-lane country road in rain; the road is wet and shiny; an oncoming lorry throws up a large cloud of spray from its wheels
and is about to pass us.
MUST BE CLEARLY VISIBLE: the oncoming lorry, the cloud of spray around it, the wet road.
MUST NOT APPEAR: signs, text.""", cond="rain, wet road"),
  "Det regner, og en lastbil kommer imod dig på den våde vej. Hvad skal du være opmærksom på?",
  "It is raining, and a lorry is coming towards you on the wet road. What must you be aware of?",
  "باران می‌بارد و کامیونی در جاده‌ی خیس از روبه‌رو می‌آید. به چه چیزی باید توجه کنید؟",
  S(True, "Når lastbilen passerer, kan der pludselig komme så meget vand på forruden, at jeg ikke kan se.",
    "When the lorry passes, so much water may suddenly hit the windscreen that I cannot see.",
    "وقتی کامیون رد می‌شود، ممکن است ناگهان آن‌قدر آب روی شیشه‌ی جلو بپاشد که چیزی نبینم.",
    "Store køretøjer sprøjter meget vand op på våd vej.", "Large vehicles throw up a lot of water on a wet road.",
    "وسایل بزرگ در جاده‌ی خیس آب زیادی به هوا می‌پاشند."),
  S(True, "Jeg sætter viskerne på højere hastighed i god tid.", "I switch the wipers to a higher speed in good time.",
    "به‌موقع سرعت برف‌پاک‌کن‌ها را بیشتر می‌کنم.",
    "Så bliver forruden hurtigere klar igen.", "Then the windscreen clears again more quickly.", "این‌طور شیشه زودتر پاک می‌شود."),
  S(True, "Jeg holder godt til højre og sænker eventuelt farten lidt.", "I keep well to the right and perhaps slow down a little.",
    "کاملاً سمت راست می‌مانم و شاید کمی سرعتم را کم کنم.",
    "Så har du bedre plads og tid, hvis du et øjeblik ikke kan se.", "Then you have more room and time if you cannot see for a moment.",
    "این‌طور اگر لحظه‌ای نبینید، جا و زمان بیشتری دارید."),
  S(False, "Jeg kører tættere på midterlinjen, så lastbilen kan komme forbi.", "I drive closer to the centre line so that the lorry can get past.",
    "به خط وسط نزدیک‌تر می‌شوم تا کامیون بتواند رد شود.",
    "Du skal holde til højre, især når du møder et stort køretøj.", "You must keep right, especially when meeting a large vehicle.",
    "باید سمت راست بمانید، به‌ویژه وقتی با وسیله‌ای بزرگ روبه‌رو می‌شوید."),
)
