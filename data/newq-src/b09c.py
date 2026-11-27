# «آزمون جدید», batch 9 (5801–5900), part c: junctions and right of way (7.12), turning left (7.14) and right (7.13), give-way
# signs and signals (7.11), meeting (7.7), driving beside others (7.17), the car (1.2), changing lanes (7.4) and moving off (7.1).
# Rules: Færdselsloven §§ 1 and 2 nr. 14 (an electric wheelchair of at most 15 km/h follows the rules for cycles) and nr. 28, 5 stk. 1
# (cross the tracks without unnecessary stopping), 7 stk. 2, 16 stk. 2, 18 stk. 2, 19 (in town let a signalling bus leave its stop),
# 20, 21 stk. 1 (a vehicle turning left is overtaken on the right) and stk. 3, 26 stk. 2–7, 27 stk. 2–3 and 6–8, 32 stk. 1–2 and 5,
# 33 stk. 5, 67 stk. 1; BEK 425/2023: yellow marking for temporary regulation is obeyed before white marking (§ 54), E 18, E 49
# (pedestrian street: very low speed, make sure people have noticed you), Q 46 (a solid broad edge line to a bus lane may not be
# crossed except in the listed cases), § 69 Z 72,1 (red flashing light: stop, unless you are so close when it comes on that stopping
# would cause danger).
from nq import Q, S, above, picture, town, view

Q(5851, "7.12", view("""
THE SCENE: a road works zone before a crossroads: orange cones along the right edge and a small road-works trailer at the side;
across our lane, just before the junction, a row of YELLOW triangles is painted on the road (yellow shark teeth); in the side roads to
the left and right old, faded WHITE shark teeth can still be seen across their lanes; a car approaches on the crossing road from the left.
MUST BE CLEARLY VISIBLE: the yellow shark teeth across our lane, the faded white shark teeth in the side roads, the cones.
MUST NOT APPEAR: signs, text."""),
  "Ved et vejarbejde er der malet gule hajtænder på tværs af din vognbane foran et kryds. I sidevejene kan man stadig se de gamle hvide "
  "hajtænder. Hvad gælder?",
  "At road works, yellow shark teeth have been painted across your lane before a junction. In the side roads the old white shark teeth "
  "can still be seen. What applies?",
  "در محل کار جاده‌ای، پیش از یک تقاطع، دندان‌کوسه‌های زرد در عرض خط شما کشیده شده است. در فرعی‌ها هنوز دندان‌کوسه‌های سفیدِ قدیمی دیده "
  "می‌شوند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg retter mig efter de gule hajtænder og holder tilbage for trafikken på den tværgående vej.",
    "I follow the yellow shark teeth and give way to the traffic on the crossing road.",
    "از دندان‌کوسه‌های زرد پیروی می‌کنم و به ترافیک جاده‌ی متقاطع راه می‌دهم.",
    "De gule hajtænder betyder, at du har ubetinget vigepligt for den kørende færdsel fra begge sider.",
    "The yellow shark teeth mean that you must give way to traffic from both sides.",
    "دندان‌کوسه‌های زرد یعنی باید به ترافیکِ هر دو طرف راه بدهید."),
  S(True, "Gul afmærkning ved et vejarbejde gælder forud for den hvide afmærkning.",
    "Yellow markings at road works take precedence over the white markings.", "خط‌کشی زرد در محل کار جاده‌ای بر خط‌کشی سفید مقدم است.",
    "Gul afmærkning bruges til midlertidig regulering, fx ved vejarbejde, og skal følges forud for hvid afmærkning.",
    "Yellow marking is used for temporary regulation, for example at road works, and must be obeyed before white marking.",
    "خط‌کشی زرد برای مقررات موقت، مثلاً هنگام کار جاده‌ای، به کار می‌رود و باید پیش از خط‌کشی سفید رعایت شود."),
  S(False, "Jeg følger den hvide afmærkning, fordi den er den faste regulering af krydset.",
    "I follow the white marking because it is the permanent regulation of the junction.",
    "از خط‌کشی سفید پیروی می‌کنم، چون مقررات دائمیِ تقاطع است.",
    "Så længe den gule afmærkning er der, er det den, der gælder.", "As long as the yellow marking is there, it is the one that applies.",
    "تا وقتی خط‌کشی زرد هست، همان معتبر است."),
  S(False, "De gule hajtænder gælder kun for lastbiler og arbejdskøretøjer.", "The yellow shark teeth only apply to lorries and work vehicles.",
    "دندان‌کوسه‌های زرد فقط برای کامیون‌ها و وسیله‌های کاری است.",
    "Gul afmærkning gælder for alle trafikanter.", "Yellow marking applies to all road users.", "خط‌کشی زرد برای همه‌ی کاربران جاده است."),
)

Q(5852, "7.12", view("""
THE SCENE: we wait at the end of a side road, behind a row of white shark teeth, before a wide main road with two carriageways
separated by a grassy central reservation; the gap in the central reservation straight ahead is short, only about one car long; in the
right exterior mirror a long trailer coupled to our car can be seen; cars approach on the main road from both sides.
MUST BE CLEARLY VISIBLE: the short gap in the central reservation, the trailer in the mirror, the traffic from both sides.
MUST NOT APPEAR: signs, text."""),
  "Du kører bil med en lang trailer og skal ligeud over en bred hovedvej med midterrabat. Åbningen i midterrabatten er så kort, at "
  "vogntoget ikke kan holde der uden at rage ud i kørebanen. Hvad gælder?",
  "You are driving a car with a long trailer and must go straight across a wide main road with a central reservation. The gap in the "
  "central reservation is so short that the combination cannot wait there without sticking out into the carriageway. What applies?",
  "با خودرو و یک یدک بلند می‌رانید و باید مستقیم از یک جاده‌ی اصلیِ پهن با جداکننده‌ی میانی عبور کنید. بازشوی جداکننده آن‌قدر کوتاه "
  "است که این مجموعه نمی‌تواند بدون بیرون‌زدگی در سواره‌رو آن‌جا بایستد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg venter i sidevejen, til der er hul fra begge sider, så jeg kan køre over i ét stræk.",
    "I wait in the side road until there is a gap from both sides so that I can cross in one go.",
    "در فرعی منتظر می‌مانم تا از هر دو طرف فاصله‌ی کافی پیدا شود و بتوانم یک‌باره عبور کنم.",
    "Holder vogntoget i åbningen, rager det ud i kørebanen og spærrer for trafikken.",
    "If the combination waits in the gap, it sticks out into the carriageway and blocks the traffic.",
    "اگر این مجموعه در بازشو بایستد، در سواره‌رو بیرون می‌زند و راه ترافیک را می‌بندد."),
  S(True, "Jeg regner med, at det tager længere tid at komme over med traileren.",
    "I count on it taking longer to get across with the trailer.", "در نظر دارم که با یدک عبورم بیشتر طول می‌کشد.",
    "Vogntoget er langt og accelererer langsomt, så du skal bruge et større hul i trafikken.",
    "The combination is long and accelerates slowly, so you need a bigger gap in the traffic.",
    "این مجموعه بلند است و کند شتاب می‌گیرد، پس به فاصله‌ی بزرگ‌تری در ترافیک نیاز دارید."),
  S(False, "Jeg kører ud i åbningen og venter der med traileren ude i den første kørebane.",
    "I drive into the gap and wait there with the trailer sticking out into the first carriageway.",
    "وارد بازشو می‌شوم و همان‌جا منتظر می‌مانم، با این‌که یدک در سواره‌روِ اول بیرون زده است.",
    "Så spærrer du for den trafik, du skal holde tilbage for.", "Then you block the traffic you have to give way to.",
    "در این صورت راه همان ترافیکی را می‌بندید که باید به آن راه بدهید."),
  S(False, "Fordi jeg har trailer, skal trafikken på hovedvejen holde tilbage for mig.",
    "Because I have a trailer, the traffic on the main road must give way to me.", "چون یدک دارم، ترافیک جاده‌ی اصلی باید به من راه بدهد.",
    "Traileren ændrer ikke vigepligten; du skal holde tilbage for trafikken fra begge sider.",
    "The trailer does not change the duty to give way; you must give way to the traffic from both sides.",
    "یدک وظیفه‌ی راه دادن را عوض نمی‌کند؛ باید به ترافیکِ هر دو طرف راه بدهید."),
)

Q(5853, "7.12", town("""
THE SCENE: a street in town; on the right a side road with white shark teeth across its mouth; a lorry waits in the side road, but the
front of its cab sticks out past the line of the kerb, about a metre into our lane; an oncoming car can be seen far away.
MUST BE CLEARLY VISIBLE: the lorry cab sticking out into our lane, the shark teeth in the side road.
MUST NOT APPEAR: signs, text, logos."""),
  "En lastbil holder i en sidevej til højre med hajtænder og venter på at køre ud. Fronten af lastbilen rager et stykke ud i din "
  "vognbane. Hvordan forholder du dig?",
  "A lorry waits in a side road on the right with shark teeth, ready to pull out. The front of the lorry sticks some way out into your "
  "lane. What do you do?",
  "کامیونی در فرعیِ سمت راست که دندان‌کوسه دارد منتظر خروج است. جلوی کامیون کمی وارد خط شما شده است. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og kører udenom med god afstand, når det kan ske uden fare.",
    "I slow down and drive round it with a good distance when it can be done without danger.",
    "سرعتم را کم می‌کنم و وقتی بی‌خطر بود، با فاصله‌ی کافی از کنارش رد می‌شوم.",
    "Lastbilen spærrer en del af din vognbane, og du skal undgå at ramme den.", "The lorry blocks part of your lane, and you must avoid hitting it.",
    "کامیون بخشی از خط شما را گرفته و باید از برخورد با آن پرهیز کنید."),
  S(True, "Jeg er forberedt på, at chaufføren ikke har set mig.", "I am prepared for the driver not to have seen me.",
    "آماده‌ام که راننده مرا ندیده باشد.",
    "Fra det høje førerhus kan det være svært at se biler tæt på, og lastbilen kan pludselig køre frem.",
    "From the high cab it can be hard to see cars close by, and the lorry may suddenly move forward.",
    "از کابین بلند دیدن خودروهای نزدیک سخت است و کامیون ممکن است ناگهان جلو بیاید."),
  S(False, "Jeg holder min plads i vognbanen, fordi lastbilen har vigepligt.", "I keep my place in the lane because the lorry has to give way.",
    "جای خودم را در خط حفظ می‌کنم، چون کامیون باید راه بدهد.",
    "Selv om lastbilen har vigepligt, skal du gøre, hvad du kan, for at undgå et sammenstød.",
    "Even though the lorry has to give way, you must do what you can to avoid a collision.",
    "حتی اگر کامیون باید راه بدهد، باید هر کاری می‌توانید برای جلوگیری از برخورد بکنید."),
  S(False, "Jeg dytter længe, så chaufføren bakker tilbage.", "I sound the horn for a long time so that the driver reverses.",
    "مدتی طولانی بوق می‌زنم تا راننده دنده‌عقب برود.",
    "Hornet må kun bruges for at forebygge eller afværge fare og ikke længere end nødvendigt.",
    "The horn may only be used to prevent or avert danger and not for longer than necessary.",
    "بوق فقط برای پیشگیری یا دفع خطر و نه بیش از حد لازم مجاز است."),
)

Q(5854, "7.12", view("""
THE SCENE: a road outside town; ahead a separate two-way cycle path running through the fields crosses the road at right angles;
before the crossing, across our lane, a row of white shark teeth is painted; two cyclists approach the crossing from the right on the
path; the path continues on the left side.
MUST BE CLEARLY VISIBLE: the cycle path crossing the road, the shark teeth across our lane, the two cyclists coming from the right.
MUST NOT APPEAR: signs, text."""),
  "En dobbeltrettet cykelsti krydser vejen. Før stien er der malet hajtænder på tværs af din vognbane. To cyklister nærmer sig fra højre. "
  "Hvad gælder?",
  "A two-way cycle path crosses the road. Before the path, shark teeth have been painted across your lane. Two cyclists are approaching "
  "from the right. What applies?",
  "یک مسیر دوچرخه‌ی دوطرفه از عرض جاده می‌گذرد. پیش از مسیر، در عرض خط شما دندان‌کوسه کشیده شده است. دو دوچرخه‌سوار از راست نزدیک "
  "می‌شوند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal holde tilbage for cyklisterne på stien.", "I must give way to the cyclists on the path.",
    "باید به دوچرخه‌سوارانِ مسیر راه بدهم.",
    "Hajtænderne betyder, at du har ubetinget vigepligt, og stien er også en vej.",
    "The shark teeth mean that you must give way, and the path is also a road.",
    "دندان‌کوسه یعنی باید راه بدهید و مسیر دوچرخه هم جاده حساب می‌شود."),
  S(True, "Jeg ser efter cyklister fra begge sider, før jeg kører over stien.", "I look for cyclists from both sides before I cross the path.",
    "پیش از عبور از مسیر، به دنبال دوچرخه‌سوارانِ هر دو طرف می‌گردم.",
    "Stien er dobbeltrettet, så der kan komme cyklister fra både højre og venstre.",
    "The path is two-way, so cyclists may come from both right and left.", "مسیر دوطرفه است و ممکن است از راست و چپ دوچرخه‌سوار بیاید."),
  S(False, "Cyklister fra en sti skal altid holde tilbage for biler på vejen.", "Cyclists coming from a path must always give way to cars on the road.",
    "دوچرخه‌سوارانی که از مسیر می‌آیند همیشه باید به خودروهای جاده راه بدهند.",
    "Ofte har cyklister fra en sti vigepligt, men hajtænderne her viser, at det er dig, der skal holde tilbage.",
    "Cyclists from a path often have to give way, but the shark teeth here show that it is you who must give way.",
    "اغلب دوچرخه‌سوارانِ مسیر باید راه بدهند، ولی دندان‌کوسه‌ها این‌جا نشان می‌دهند که شما باید راه بدهید."),
  S(False, "Hajtænderne gælder kun cyklisterne.", "The shark teeth only apply to the cyclists.", "دندان‌کوسه‌ها فقط برای دوچرخه‌سواران است.",
    "Hajtænderne ligger på tværs af din vognbane og gælder for dig.", "The shark teeth lie across your lane and apply to you.",
    "دندان‌کوسه‌ها در عرض خط شما هستند و برای شما معتبرند."),
)

Q(5855, "7.12", view("""
THE SCENE: a large car park at a shopping centre with long rows of parked cars; we drive slowly along one of the aisles; just ahead
another aisle meets ours from the RIGHT, and a car is coming along it towards the meeting point; a woman pushes a shopping trolley
between the parked cars on the left.
MUST BE CLEARLY VISIBLE: the two aisles meeting, the car coming from the right, the woman with the trolley.
MUST NOT APPEAR: signs, text, road markings at the meeting point."""),
  "På en stor parkeringsplads ved et indkøbscenter kører du ad et af køresporene. Fra et kørespor til højre kommer en bil. Der er ingen "
  "tavler eller afmærkning. Hvad gælder?",
  "On a large car park at a shopping centre you are driving along one of the aisles. A car is coming from an aisle on the right. There "
  "are no signs or markings. What applies?",
  "در پارکینگ بزرگ یک مرکز خرید در یکی از راهروهای عبور می‌رانید. از راهرویی در سمت راست خودرویی می‌آید. تابلو یا خط‌کشی‌ای نیست. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Færdselsloven gælder også på parkeringspladsen, så jeg holder tilbage for bilen fra højre.",
    "The Road Traffic Act also applies on the car park, so I give way to the car from the right.",
    "قانون راهنمایی و رانندگی در پارکینگ هم برقرار است، پس به خودروی سمت راست راه می‌دهم.",
    "Loven gælder på arealer, der bruges til almindelig færdsel, og uden tavler og afmærkning har du vigepligt for kørende fra højre.",
    "The Act applies on areas used for general traffic, and without signs or markings you must give way to drivers from the right.",
    "این قانون در جاهایی که برای رفت‌وآمد عمومی استفاده می‌شوند برقرار است و بدون تابلو و خط‌کشی باید به رانندگانِ سمت راست راه بدهید."),
  S(True, "Jeg kører langsomt, fordi der kan komme gående og biler, der bakker ud.",
    "I drive slowly because there may be pedestrians and cars reversing out.", "آهسته می‌رانم، چون ممکن است عابر بیاید یا خودرویی دنده‌عقب بیرون بیاید.",
    "På en parkeringsplads går mange mennesker mellem bilerne, og bilister bakker ud af båsene.",
    "On a car park many people walk between the cars, and drivers reverse out of the bays.",
    "در پارکینگ افراد زیادی بین خودروها راه می‌روند و رانندگان از جای پارک دنده‌عقب بیرون می‌آیند."),
  S(False, "På en parkeringsplads gælder der ingen vigepligtsregler.", "No give-way rules apply on a car park.",
    "در پارکینگ هیچ قاعده‌ی حق تقدمی برقرار نیست.",
    "Også her gælder færdselslovens regler, herunder højrevigepligt.", "The rules of the Road Traffic Act apply here too, including giving way to the right.",
    "این‌جا هم قاعده‌های قانون راهنمایی و رانندگی، از جمله حق تقدمِ سمت راست، برقرارند."),
  S(False, "Den, der kører i det bredeste kørespor, har altid forkørselsret.", "Whoever drives in the widest aisle always has priority.",
    "کسی که در پهن‌ترین راهرو می‌راند همیشه حق تقدم دارد.",
    "Bredden giver ikke forkørselsret; uden tavler eller afmærkning gælder højrevigepligt.",
    "Width does not give priority; without signs or markings you give way to the right.",
    "پهنا حق تقدم نمی‌دهد؛ بدون تابلو یا خط‌کشی، حق تقدم با سمت راست است."),
)

Q(5856, "7.12", town("""
THE SCENE: a signal-controlled junction in town; our signal shows GREEN; just after the junction a city bus stands at a bus stop at the
right kerb in our lane, and its left indicator is flashing; there is not room for our car between the junction and the bus.
MUST BE CLEARLY VISIBLE: our green signal, the bus at the stop just after the junction with its left indicator on.
MUST NOT APPEAR: signs, text, logos."""),
  "Du har grønt lys og vil køre ligeud. Lige efter krydset holder en bus ved et stoppested i din vognbane og blinker til venstre for at "
  "køre ud. Hvad gælder?",
  "You have a green light and want to go straight on. Just after the junction a bus stands at a stop in your lane and signals left to "
  "pull out. What applies?",
  "چراغ سبز است و می‌خواهید مستقیم بروید. درست بعد از تقاطع اتوبوسی در ایستگاهی در خط شما ایستاده و برای حرکت راهنمای چپ زده است. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Jeg lader bussen køre ud fra stoppestedet.", "I let the bus pull out from the stop.", "می‌گذارم اتوبوس از ایستگاه حرکت کند.",
    "I byen skal du sætte farten ned og om nødvendigt standse, når en bus ved et stoppested giver tegn til at køre ud.",
    "In town you must slow down and stop if necessary when a bus at a stop signals that it is pulling out.",
    "در شهر وقتی اتوبوسِ ایستاده در ایستگاه برای حرکت علامت می‌دهد، باید سرعت را کم کنید و در صورت لزوم بایستید."),
  S(True, "Jeg kører ikke ind i krydset, hvis jeg risikerer at blive holdende i det.",
    "I do not drive into the junction if I risk being left standing in it.", "اگر ممکن است داخل تقاطع گیر کنم، واردش نمی‌شوم.",
    "Selv for grønt må du ikke køre ind i krydset, hvis du må indse, at du ikke kan nå ud af det, før lyset skifter for de andre.",
    "Even on green you must not enter the junction if you must realise that you cannot get out of it before the light changes for the others.",
    "حتی با چراغ سبز نباید وارد تقاطع شوید، اگر می‌دانید پیش از تغییر چراغ برای دیگران نمی‌توانید از آن خارج شوید."),
  S(False, "Jeg har grønt, så bussen må vente på mig.", "I have green, so the bus must wait for me.", "چراغ من سبز است، پس اتوبوس باید منتظر من بماند.",
    "Det grønne lys gælder krydset; bussen ved stoppestedet skal du lade komme ud.",
    "The green light applies to the junction; you must let the bus at the stop pull out.",
    "چراغ سبز مربوط به تقاطع است؛ باید بگذارید اتوبوسِ ایستگاه حرکت کند."),
  S(False, "Jeg kører hurtigt forbi bussen, før den kommer ud.", "I drive quickly past the bus before it pulls out.",
    "پیش از حرکت اتوبوس، سریع از کنارش رد می‌شوم.",
    "Bussen er ved at køre ud, og du skal lade den komme ud i stedet for at presse dig forbi.",
    "The bus is about to pull out, and you must let it out instead of squeezing past.",
    "اتوبوس در حال حرکت است و باید بگذارید بیرون بیاید، نه این‌که به‌زور از کنارش رد شوید."),
)

Q(5857, "7.14", view("""
THE SCENE: the end of a motorway exit ramp where it meets a two-lane country road in a T-junction; across our lane a row of white
shark teeth and a give-way sign (a white triangle with a red border, point down); on the country road cars approach from both the
left and the right at good speed.
MUST BE CLEARLY VISIBLE: the shark teeth and the give-way sign, the cars from both sides.
MUST NOT APPEAR: other signs, text."""),
  "Du har kørt længe på motorvejen og kommer nu til enden af frakørslen, hvor der er hajtænder. Du skal til venstre ad landevejen. Hvad "
  "gælder?",
  "You have been driving on the motorway for a long time and now reach the end of the exit ramp, where there are shark teeth. You are "
  "turning left onto the country road. What applies?",
  "مدتی طولانی در آزادراه رانده‌اید و حالا به انتهای راه خروجی رسیده‌اید که دندان‌کوسه دارد. باید به چپ وارد جاده‌ی بیرون شهر شوید. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Jeg holder tilbage for trafikken fra både venstre og højre.", "I give way to the traffic from both left and right.",
    "به ترافیکِ چپ و راست راه می‌دهم.",
    "Hajtænderne betyder ubetinget vigepligt for den kørende færdsel fra begge sider.",
    "The shark teeth mean that you must give way to the traffic from both sides.", "دندان‌کوسه یعنی باید به ترافیکِ هر دو طرف راه بدهید."),
  S(True, "Jeg er forsigtig med at bedømme de andres fart, fordi jeg har vænnet mig til høj fart.",
    "I am careful in judging the others' speed because I have got used to high speed.",
    "در سنجیدن سرعت دیگران محتاطم، چون به سرعت بالا عادت کرده‌ام.",
    "Efter lang tids hurtig kørsel kan du let tage fejl af både din egen og de andres fart.",
    "After driving fast for a long time you can easily misjudge both your own speed and that of others.",
    "بعد از مدتی طولانی رانندگی تند، ممکن است سرعت خودتان و دیگران را اشتباه بسنجید."),
  S(True, "Jeg venter på et hul, der er stort nok til, at jeg kan køre over den nærmeste vognbane og ind i den fjerneste.",
    "I wait for a gap big enough for me to cross the nearer lane and get into the farther one.",
    "منتظر فاصله‌ای می‌مانم که آن‌قدر بزرگ باشد که از خط نزدیک بگذرم و وارد خط دورتر شوم.",
    "Når du svinger til venstre, krydser du først trafikken fra venstre og skal derefter ind i trafikken fra højre.",
    "When you turn left you first cross the traffic from the left and then have to join the traffic from the right.",
    "وقتی به چپ می‌پیچید، اول از ترافیکِ سمت چپ می‌گذرید و بعد باید وارد ترافیکِ سمت راست شوید."),
  S(False, "Fordi jeg kommer fra motorvejen, har jeg forkørselsret.", "Because I am coming from the motorway, I have priority.",
    "چون از آزادراه می‌آیم، حق تقدم با من است.",
    "Det er hajtænderne og tavlen, der afgør vigepligten, ikke hvor du kommer fra.",
    "It is the shark teeth and the sign that decide who gives way, not where you come from.",
    "دندان‌کوسه و تابلو تعیین می‌کنند چه کسی راه بدهد، نه این‌که از کجا می‌آیید."),
)

Q(5858, "7.14", view("""
THE SCENE: we stand at a junction ready to turn LEFT into a narrow side road (our left indicator lamp glows on the dashboard strip);
an oncoming lorry with a long trailer has started to turn RIGHT into the same side road and swings wide to get round the corner.
MUST BE CLEARLY VISIBLE: the oncoming lorry swinging wide into the side road, the narrow side road.
MUST NOT APPEAR: signs, text, logos."""),
  "Du vil svinge til venstre ind på en smal sidevej. En modkørende lastbil vil svinge til højre ind på den samme vej og skal bruge meget "
  "plads for at komme rundt. Hvad gælder?",
  "You want to turn left into a narrow side road. An oncoming lorry wants to turn right into the same road and needs a lot of room to "
  "get round. What applies?",
  "می‌خواهید به چپ وارد یک فرعیِ باریک شوید. کامیونی از روبه‌رو می‌خواهد به راست وارد همان جاده شود و برای پیچیدن جای زیادی لازم دارد. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Lastbilen må svinge før mig, fordi jeg som venstresvingende skal holde tilbage for den.",
    "The lorry may turn before me, because as the driver turning left I must give way to it.",
    "کامیون پیش از من می‌پیچد، چون من که به چپ می‌پیچم باید به آن راه بدهم.",
    "Du må ikke svinge til venstre, før det kan ske uden ulempe for modkørende færdsel.",
    "You must not turn left until it can be done without inconvenience to oncoming traffic.",
    "نباید به چپ بپیچید، مگر این‌که برای ترافیک روبه‌رو مزاحمتی نداشته باشد."),
  S(True, "Jeg venter, til lastbilen er kommet helt rundt i svinget, før jeg selv svinger.",
    "I wait until the lorry has got all the way round the corner before I turn myself.",
    "صبر می‌کنم تا کامیون کاملاً پیچ را رد کند و بعد خودم می‌پیچم.",
    "En lang lastbil kan få brug for en del af den anden side af sidevejen, når den svinger.",
    "A long lorry may need part of the other side of the side road when it turns.",
    "کامیون بلند ممکن است هنگام پیچیدن به بخشی از سمت دیگرِ فرعی نیاز داشته باشد."),
  S(False, "Jeg skynder mig at svinge ind foran lastbilen, så jeg ikke skal vente.",
    "I hurry to turn in front of the lorry so that I do not have to wait.", "عجله می‌کنم که جلوی کامیون بپیچم تا منتظر نمانم.",
    "Du skal holde tilbage for lastbilen, og den kan spærre sidevejen, mens den svinger.",
    "You must give way to the lorry, and it may block the side road while it turns.",
    "باید به کامیون راه بدهید و ممکن است هنگام پیچیدن فرعی را ببندد."),
  S(False, "Lastbilen skal vente, fordi den er større og langsommere.", "The lorry must wait because it is bigger and slower.",
    "کامیون باید صبر کند، چون بزرگ‌تر و کندتر است.",
    "Størrelsen er ligegyldig; den modkørende, der svinger til højre, skal ikke holde tilbage for dig.",
    "Size does not matter; the oncoming driver turning right does not have to give way to you.",
    "اندازه مهم نیست؛ وسیله‌ی روبه‌رو که به راست می‌پیچد لازم نیست به شما راه بدهد."),
)

Q(5859, "7.14", town("""
THE SCENE: we are turning LEFT at a signal-controlled junction in town with a green signal; in the road we are turning into, just after
the corner, there is a pedestrian crossing with its own pedestrian signals showing a GREEN walking figure; several pedestrians are
crossing and one more is just stepping onto the stripes.
MUST BE CLEARLY VISIBLE: our green signal, the pedestrian crossing after the corner with the green walking figure, the pedestrians.
MUST NOT APPEAR: signs, text."""),
  "Du har grønt lys og svinger til venstre. På den vej, du svinger ind på, er der et fodgængerfelt med lyssignal, og de gående har også "
  "grønt. Hvad gælder?",
  "You have a green light and are turning left. In the road you are turning into there is a pedestrian crossing with signals, and the "
  "pedestrians also have green. What applies?",
  "چراغ سبز است و به چپ می‌پیچید. در جاده‌ای که واردش می‌شوید گذرگاه عابرِ چراغ‌دار هست و چراغ عابران هم سبز است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder tilbage for de gående, der er i fodgængerfeltet eller på vej ud i det.",
    "I give way to the pedestrians who are on the crossing or about to step onto it.",
    "به عابرانی که در گذرگاه هستند یا در حال وارد شدن به آن‌اند راه می‌دهم.",
    "Efter svingning skal du ved et fodgængerfelt i krydset køre med passende lav fart og om nødvendigt standse for de gående.",
    "After turning, at a pedestrian crossing at the junction you must drive at a suitably low speed and stop if necessary for the "
    "pedestrians.",
    "بعد از پیچیدن، کنار گذرگاه عابرِ تقاطع باید با سرعت کم برانید و در صورت لزوم برای عابران بایستید."),
  S(True, "Jeg svinger med lav fart, så jeg kan nå at standse.", "I turn at a low speed so that I can stop in time.",
    "با سرعت کم می‌پیچم تا به‌موقع بتوانم بایستم.",
    "De gående kan være skjult af bilens forstolpe, og nogle når først ud i feltet, mens du svinger.",
    "Pedestrians may be hidden by the car's front pillar, and some only step onto the crossing while you are turning.",
    "ممکن است عابران پشت ستون جلوی خودرو پنهان باشند و بعضی درست وقتی می‌پیچید وارد گذرگاه شوند."),
  S(False, "De gående skal vente, fordi jeg også har grønt.", "The pedestrians must wait because I have green too.",
    "عابران باید صبر کنند، چون چراغ من هم سبز است.",
    "Selv om du har grønt, skal du holde tilbage for de gående i feltet.", "Even though you have green, you must give way to the pedestrians on the crossing.",
    "با این‌که چراغ شما سبز است، باید به عابرانِ گذرگاه راه بدهید."),
  S(False, "Jeg må holde inde i fodgængerfeltet, mens de gående går uden om bilen.",
    "I may wait on the crossing while the pedestrians walk round the car.", "می‌توانم داخل گذرگاه بایستم تا عابران از کنار خودرو رد شوند.",
    "Du skal så vidt muligt undgå at standse i fodgængerfeltet.", "You must avoid stopping on the pedestrian crossing as far as possible.",
    "تا جای ممکن باید از ایستادن روی گذرگاه عابر پرهیز کنید."),
)

Q(5860, "7.14", view("""
THE SCENE: we wait in the middle of a junction to turn LEFT into a side road (our left indicator lamp glows on the dashboard strip); on
the right side of the oncoming lane there is a cycle lane separated by a broad white line; in it a young person on an electric scooter
rides towards us at a steady speed; no other oncoming vehicles.
MUST BE CLEARLY VISIBLE: the person on the electric scooter in the oncoming cycle lane, the side road to the left.
MUST NOT APPEAR: signs, text."""),
  "Du venter på at svinge til venstre ind på en sidevej. Imod dig kommer en person på elløbehjul i cykelbanen. Hvad gælder?",
  "You are waiting to turn left into a side road. A person on an electric scooter is coming towards you in the cycle lane. What applies?",
  "منتظرید به چپ وارد یک فرعی شوید. از روبه‌رو شخصی با اسکوتر برقی در خط دوچرخه به سمت شما می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder tilbage for personen på elløbehjulet, der kører ligeud.", "I give way to the person on the electric scooter, who is going straight on.",
    "به شخصِ سوار بر اسکوتر برقی که مستقیم می‌رود راه می‌دهم.",
    "Du må ikke svinge til venstre, før det kan ske uden ulempe for den modkørende færdsel, også den i cykelbanen.",
    "You must not turn left until it can be done without inconvenience to oncoming traffic, also that in the cycle lane.",
    "نباید به چپ بپیچید، مگر این‌که برای ترافیک روبه‌رو، از جمله کسانی که در خط دوچرخه‌اند، مزاحمتی نداشته باشد."),
  S(True, "Jeg er forberedt på, at elløbehjulet kører hurtigere, end jeg tror.", "I am prepared for the scooter to be faster than I think.",
    "آماده‌ام که اسکوتر تندتر از آنچه فکر می‌کنم بیاید.",
    "Et lille køretøj som et elløbehjul kan være svært at bedømme farten på.", "The speed of a small vehicle such as an electric scooter can be hard to judge.",
    "سنجیدن سرعت وسیله‌ی کوچکی مثل اسکوتر برقی ممکن است سخت باشد."),
  S(False, "Elløbehjul er legetøj, så jeg behøver ikke holde tilbage for det.", "Electric scooters are toys, so I need not give way to one.",
    "اسکوتر برقی اسباب‌بازی است، پس لازم نیست به آن راه بدهم.",
    "Personen kører i cykelbanen som en del af den modkørende færdsel, og du skal holde tilbage.",
    "The person is riding in the cycle lane as part of the oncoming traffic, and you must give way.",
    "این شخص در خط دوچرخه و به‌عنوان بخشی از ترافیک روبه‌رو می‌آید و باید به او راه بدهید."),
  S(False, "Personen skal standse, fordi jeg har blinket i god tid.", "The person must stop because I signalled in good time.",
    "آن شخص باید بایستد، چون من به‌موقع راهنما زده‌ام.",
    "Blinklyset viser kun, hvad du vil gøre; det giver dig ingen ret til at svinge.",
    "The indicator only shows what you intend to do; it gives you no right to turn.",
    "راهنما فقط نشان می‌دهد چه می‌خواهید بکنید؛ حقی برای پیچیدن به شما نمی‌دهد."),
)

Q(5861, "7.14", view("""
THE SCENE: a two-lane country road; just ahead on the left a field track leaves the road; we have slowed down and our left indicator
lamp glows on the dashboard strip; in the left exterior door mirror a car behind us is pulling out into the oncoming lane to overtake us.
MUST BE CLEARLY VISIBLE: the field track on the left, the overtaking car in the left door mirror.
MUST NOT APPEAR: signs, text."""),
  "Du blinker til venstre og vil svinge ind på en markvej. I sidespejlet ser du, at bilen bag dig alligevel trækker ud for at overhale "
  "dig. Hvad gælder?",
  "You are signalling left and want to turn into a field track. In the door mirror you see the car behind you pulling out to overtake "
  "you anyway. What applies?",
  "راهنمای چپ زده‌اید و می‌خواهید وارد یک راه مزرعه شوید. در آینه‌ی بغل می‌بینید که خودروی پشت سر با این حال برای سبقت از شما بیرون "
  "می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg venter med at svinge og lader bilen komme forbi.", "I wait with the turn and let the car get past.",
    "پیچیدن را عقب می‌اندازم و می‌گذارم آن خودرو رد شود.",
    "Du må først svinge, når det kan ske uden fare for dem, der kører i samme retning.",
    "You may only turn when it can be done without danger to those travelling in the same direction.",
    "فقط وقتی می‌توانید بپیچید که برای کسانی که هم‌جهت با شما می‌رانند خطری نداشته باشد."),
  S(True, "Jeg ser i spejlet og over skulderen, lige før jeg svinger.", "I check the mirror and over my shoulder just before I turn.",
    "درست پیش از پیچیدن، در آینه و از روی شانه نگاه می‌کنم.",
    "Lige før svinget skal du sikre dig, at ingen er ved at overhale dig.", "Just before the turn you must make sure nobody is overtaking you.",
    "درست پیش از پیچیدن باید مطمئن شوید که کسی در حال سبقت از شما نیست."),
  S(True, "Bilen må ikke overhale mig til venstre, når jeg tydeligt forbereder et venstresving.",
    "The car must not overtake me on the left when I am clearly preparing to turn left.",
    "وقتی آشکارا آماده‌ی پیچیدن به چپ هستم، آن خودرو نباید از سمت چپم سبقت بگیرد.",
    "Et køretøj, der svinger til venstre eller tydeligt forbereder det, skal overhales højre om.",
    "A vehicle that is turning left or clearly preparing to do so must be overtaken on the right.",
    "از وسیله‌ای که به چپ می‌پیچد یا آشکارا آماده‌ی آن است، باید از سمت راست سبقت گرفت."),
  S(False, "Jeg har blinket i god tid, så jeg svinger alligevel.", "I signalled in good time, so I turn anyway.",
    "به‌موقع راهنما زده‌ام، پس به هر حال می‌پیچم.",
    "Selv om den anden kører forkert, skal du gøre, hvad du kan, for at undgå et sammenstød.",
    "Even if the other driver is in the wrong, you must do what you can to avoid a collision.",
    "حتی اگر راننده‌ی دیگر اشتباه کند، باید هر کاری می‌توانید برای جلوگیری از برخورد بکنید."),
)

Q(5862, "7.13", town("""
THE SCENE: we are about to turn RIGHT into a pedestrian street paved with stones; at its entrance stands a blue rectangular sign showing
a white adult walking with a child, and under it a white plate with the black text «Varekørsel tilladt»; many pedestrians walk in the
street, some with their backs to us, a child runs ahead of its parents.
MUST BE CLEARLY VISIBLE: the pedestrian-street sign with its plate, the many pedestrians, the running child.
MUST NOT APPEAR: other signs, any other text."""),
  "Du har varer med og vil svinge til højre ind i en gågade, hvor varekørsel er tilladt. Der går mange mennesker i gaden. Hvad gælder?",
  "You are carrying goods and want to turn right into a pedestrian street where delivery traffic is allowed. Many people are walking in "
  "the street. What applies?",
  "بار همراه دارید و می‌خواهید به راست وارد یک خیابان پیاده که در آن رفت‌وآمد برای تحویل کالا مجاز است بپیچید. افراد زیادی در خیابان "
  "راه می‌روند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder tilbage for de gående, når jeg kører ind i gågaden.", "I give way to the pedestrians when I drive into the pedestrian street.",
    "هنگام ورود به خیابان پیاده به عابران راه می‌دهم.",
    "Ved kørsel ind på en gågade skal kørende holde tilbage for gående.", "When driving into a pedestrian street, drivers must give way to pedestrians.",
    "هنگام ورود به خیابان پیاده، رانندگان باید به عابران راه بدهند."),
  S(True, "Jeg kører først forbi de gående, når jeg har sikret mig, at de har set bilen og har givet plads.",
    "I only drive past the pedestrians once I have made sure that they have seen the car and made room.",
    "فقط وقتی از کنار عابران رد می‌شوم که مطمئن شوم خودرو را دیده‌اند و جا باز کرده‌اند.",
    "I en gågade må du ikke køre tæt forbi gående, før du har sikret dig, at de er opmærksomme på bilen.",
    "In a pedestrian street you must not drive close past pedestrians until you have made sure that they have noticed the car.",
    "در خیابان پیاده نباید از نزدیکِ عابران رد شوید، مگر این‌که مطمئن شوید متوجه خودرو شده‌اند."),
  S(True, "Jeg er forberedt på børn, der løber, og folk, der ikke ser sig for.",
    "I am prepared for children running and people not looking where they are going.",
    "آماده‌ی کودکانی هستم که می‌دوند و آدم‌هایی که حواسشان نیست.",
    "I en gågade regner de gående ikke med biler.", "In a pedestrian street pedestrians do not expect cars.",
    "در خیابان پیاده عابران انتظار خودرو ندارند."),
  S(False, "Med tilladelse til varekørsel har jeg forkørselsret i gågaden.",
    "With permission for delivery traffic I have priority in the pedestrian street.",
    "با اجازه‌ی تحویل کالا، در خیابان پیاده حق تقدم با من است.",
    "Gågaden er for gående, og du skal vise dem særlig hensynsfuldhed.", "The pedestrian street is for pedestrians, and you must show them special consideration.",
    "خیابان پیاده برای عابران است و باید ملاحظه‌ی ویژه‌ای نسبت به آن‌ها داشته باشید."),
)

Q(5863, "7.13", view("""
THE SCENE: we are in the stem of a T-junction in a residential area, about to turn RIGHT onto the through road; there are no signs and
no markings; from the LEFT a car approaches along the through road; hedges stand at the corners.
MUST BE CLEARLY VISIBLE: the T-junction, the car approaching from the left, the absence of signs and markings.
MUST NOT APPEAR: signs, text, shark teeth."""),
  "Du kommer ad sidevejen i et T-kryds uden tavler og afmærkning og vil svinge til højre. Fra venstre kommer en bil ad den gennemgående "
  "vej. Hvad gælder?",
  "You are coming along the side road at a T-junction without signs or markings and want to turn right. A car is coming from the left "
  "along the through road. What applies?",
  "از فرعیِ یک تقاطع سه‌راه بدون تابلو و خط‌کشی می‌آیید و می‌خواهید به راست بپیچید. از چپ خودرویی در جاده‌ی اصلیِ سه‌راه می‌آید. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Føreren af bilen fra venstre skal lade mig køre først.", "The driver of the car from the left must let me go first.",
    "راننده‌ی خودروی سمت چپ باید بگذارد اول من بروم.",
    "Uden tavler og afmærkning har den, der har en anden kørende på sin højre side, vigepligt, også selv om den kører på den "
    "gennemgående vej.",
    "Without signs or markings, the driver who has another driver on their right must give way, even when on the through road.",
    "بدون تابلو و خط‌کشی، کسی که راننده‌ی دیگری در سمت راستش باشد باید راه بدهد، حتی اگر در جاده‌ی اصلیِ سه‌راه باشد."),
  S(True, "Jeg sikrer mig, at føreren har set mig og holder tilbage, før jeg kører ud.",
    "I make sure that the driver has seen me and is giving way before I pull out.",
    "پیش از حرکت مطمئن می‌شوم که راننده مرا دیده و راه می‌دهد.",
    "Du kan ikke være sikker på, at den anden overholder sin vigepligt.", "You cannot be sure that the other driver will give way as required.",
    "نمی‌توانید مطمئن باشید که طرف مقابل وظیفه‌ی راه دادنش را انجام می‌دهد."),
  S(False, "Jeg skal holde tilbage, fordi bilen kører på den gennemgående vej.", "I must give way because the car is on the through road.",
    "باید راه بدهم، چون آن خودرو در جاده‌ی اصلیِ سه‌راه است.",
    "Uden tavler og afmærkning giver den gennemgående vej ingen forkørselsret.",
    "Without signs or markings, the through road does not give priority.", "بدون تابلو و خط‌کشی، جاده‌ی اصلیِ سه‌راه حق تقدم نمی‌دهد."),
  S(False, "Den, der skal svinge, skal altid holde tilbage.", "The one who is turning must always give way.",
    "کسی که می‌پیچد همیشه باید راه بدهد.",
    "Her afgør højrereglen vigepligten.", "Here the rule of giving way to the right decides who gives way.",
    "این‌جا قاعده‌ی حق تقدمِ سمت راست تعیین‌کننده است."),
)

Q(5864, "7.13", town("""
THE SCENE: we are about to turn RIGHT into a side road (our right indicator lamp glows on the dashboard strip); on the cycle path to our
right, alongside us, a person in an electric wheelchair rides straight ahead towards the side road.
MUST BE CLEARLY VISIBLE: the electric wheelchair on the cycle path beside us, the side road to the right.
MUST NOT APPEAR: signs, text."""),
  "Du vil svinge til højre ind på en sidevej. På cykelstien til højre for dig kører en person i el-kørestol ligeud. Hvad gælder?",
  "You want to turn right into a side road. On the cycle path to your right a person in an electric wheelchair is going straight on. "
  "What applies?",
  "می‌خواهید به راست وارد یک فرعی شوید. در مسیر دوچرخه‌ی سمت راستتان شخصی با ویلچر برقی مستقیم می‌رود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder tilbage for personen i el-kørestolen.", "I give way to the person in the electric wheelchair.",
    "به شخصِ سوار بر ویلچر برقی راه می‌دهم.",
    "En el-kørestol på cykelstien følger reglerne for cykler, og når du svinger til højre, må du ikke være til ulempe for dem, der kører ligeud.",
    "An electric wheelchair on the cycle path follows the rules for cycles, and when you turn right you must not inconvenience those going straight on.",
    "ویلچر برقی در مسیر دوچرخه از قاعده‌های دوچرخه پیروی می‌کند و هنگام پیچیدن به راست نباید برای کسانی که مستقیم می‌روند مزاحمت ایجاد کنید."),
  S(False, "Personen i kørestolen er gående og skal vente, til jeg har svinget.",
    "The person in the wheelchair is a pedestrian and must wait until I have turned.",
    "شخصِ روی ویلچر عابر پیاده است و باید صبر کند تا من بپیچم.",
    "Kører kørestolen på cykelstien, gælder cykelreglerne, og du skal holde tilbage.",
    "When the wheelchair uses the cycle path, the cycle rules apply, and you must give way.",
    "وقتی ویلچر در مسیر دوچرخه می‌رود، قاعده‌های دوچرخه برقرار است و باید راه بدهید."),
  S(False, "Jeg kan nå at svinge foran den, fordi en el-kørestol kører langsomt.",
    "I can turn in front of it in time because an electric wheelchair is slow.", "می‌توانم جلوی آن بپیچم، چون ویلچر برقی آهسته است.",
    "Du skal holde tilbage og må ikke skære ind foran den.", "You must give way and must not cut in front of it.",
    "باید راه بدهید و نباید جلوی آن بپیچید."),
)

Q(5865, "7.11", view("""
THE SCENE: a road with a side road joining from the RIGHT a little ahead; at the mouth of the side road stands a blue square sign with a
white vertical bar topped by a red crossbar (a white «T» with a red top), the sign for a dead-end road; a car is coming out of the side
road towards our road; there are no other signs and no shark teeth.
MUST BE CLEARLY VISIBLE: the dead-end sign at the side road, the car coming out of it, the absence of shark teeth.
MUST NOT APPEAR: other signs, text."""),
  "Lidt fremme kommer en sidevej fra højre. Ved den står en tavle, der viser, at det er en blind vej. Der er ingen andre tavler eller "
  "hajtænder. En bil kommer ud fra sidevejen. Hvad gælder?",
  "A little ahead a side road joins from the right. At it stands a sign showing that it is a dead-end road. There are no other signs or "
  "shark teeth. A car is coming out of the side road. What applies?",
  "کمی جلوتر فرعی‌ای از راست وارد می‌شود. کنارش تابلویی است که نشان می‌دهد بن‌بست است. تابلو یا دندان‌کوسه‌ی دیگری نیست. خودرویی از "
  "فرعی بیرون می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal lade bilen fra den blinde vej køre først.", "I must let the car from the dead-end road go first.",
    "باید بگذارم خودرویی که از بن‌بست می‌آید اول برود.",
    "Tavlen for blind vej ændrer ikke vigepligten, og uden andre tavler eller hajtænder gælder højrevigepligt.",
    "The dead-end sign does not change who gives way, and without other signs or shark teeth you give way to the right.",
    "تابلوی بن‌بست حق تقدم را تغییر نمی‌دهد و بدون تابلو یا دندان‌کوسه‌ی دیگر، حق تقدم با سمت راست است."),
  S(False, "Biler fra en blind vej har altid vigepligt.", "Cars coming from a dead-end road always have to give way.",
    "خودروهایی که از بن‌بست می‌آیند همیشه باید راه بدهند.",
    "Tavlen oplyser kun, at vejen ikke fører videre; den regulerer ikke vigepligten.",
    "The sign only tells you that the road leads nowhere; it does not regulate who gives way.",
    "این تابلو فقط می‌گوید جاده ادامه ندارد؛ حق تقدم را تعیین نمی‌کند."),
  S(False, "Min vej er bredest, så bilen fra sidevejen skal vente på mig.", "My road is the widest, so the car from the side road must wait for me.",
    "جاده‌ی من پهن‌تر است، پس خودروی فرعی باید منتظر من بماند.",
    "Vejens størrelse giver ikke forkørselsret.", "The size of the road does not give priority.", "بزرگیِ جاده حق تقدم نمی‌دهد."),
)

Q(5866, "7.11", view("""
THE SCENE: a road passing the exit of an ambulance station on the right; over the road hangs a pair of red lamps, one of which has just
started flashing; the white stop line across our lane is only a few metres in front of us; the nose of an ambulance appears at the
station gate.
MUST BE CLEARLY VISIBLE: the red flashing lamp over the road, the stop line just in front of us, the ambulance at the gate.
MUST NOT APPEAR: signs, text."""),
  "Du kører 50 km/t forbi udkørslen fra en ambulancestation. Det røde blinksignal over vejen tænder, da du kun er få meter fra stoplinjen. "
  "Hvad gælder?",
  "You are doing 50 km/h past the exit of an ambulance station. The red flashing signal over the road comes on when you are only a few "
  "metres from the stop line. What applies?",
  "با سرعت ۵۰ کیلومتر در ساعت از کنار خروجی یک ایستگاه آمبولانس می‌گذرید. چراغ چشمک‌زن قرمز بالای جاده وقتی روشن می‌شود که فقط چند "
  "متر با خط ایست فاصله دارید. چه قاعده‌ای برقرار است؟",
  S(True, "Kan jeg ikke standse uden fare, må jeg fortsætte forbi signalet.",
    "If I cannot stop without danger, I may continue past the signal.", "اگر نتوانم بی‌خطر بایستم، می‌توانم از کنار چراغ رد شوم.",
    "Du skal ikke standse, hvis du, da signalet tændes, er så tæt på, at standsningen vil medføre fare.",
    "You need not stop if, when the signal comes on, you are so close that stopping would cause danger.",
    "اگر وقتی چراغ روشن می‌شود آن‌قدر نزدیک باشید که ایستادن خطرناک باشد، لازم نیست بایستید."),
  S(True, "Kører jeg videre, er jeg ekstra opmærksom på ambulancen ved udkørslen.",
    "If I drive on, I pay extra attention to the ambulance at the exit.", "اگر ادامه دهم، حواسم بیشتر به آمبولانسِ کنار خروجی است.",
    "Signalet tænder, fordi et udrykningskøretøj skal ud.", "The signal comes on because an emergency vehicle is coming out.",
    "این چراغ روشن می‌شود چون خودرویی امدادی می‌خواهد بیرون بیاید."),
  S(False, "Jeg skal standse før stoplinjen, også selv om jeg skal bremse så hårdt, at bilen bag mig kan køre ind i mig.",
    "I must stop before the stop line even if I have to brake so hard that the car behind may run into me.",
    "باید پیش از خط ایست بایستم، حتی اگر آن‌قدر شدید ترمز کنم که خودروی پشت سر به من بزند.",
    "Vil standsningen medføre fare, skal du ikke standse.", "If stopping would cause danger, you need not stop.",
    "اگر ایستادن خطرناک باشد، لازم نیست بایستید."),
  S(False, "Når signalet lige er tændt, må jeg altid køre videre.", "When the signal has only just come on, I may always drive on.",
    "وقتی چراغ تازه روشن شده، همیشه می‌توانم ادامه دهم.",
    "Du må kun fortsætte, hvis du er så tæt på, at standsning vil medføre fare; ellers skal du standse.",
    "You may only continue if you are so close that stopping would cause danger; otherwise you must stop.",
    "فقط وقتی می‌توانید ادامه دهید که آن‌قدر نزدیک باشید که ایستادن خطرناک باشد؛ وگرنه باید بایستید."),
)

Q(5867, "7.11", view("""
THE SCENE: we are in the middle of a railway level crossing with half barriers, on the tracks; the red lights on the posts are flashing
and the half barrier on the far side, which closes the oncoming lane, is starting to come down; the exit ahead in our lane is free.
MUST BE CLEARLY VISIBLE: the tracks under us, the flashing red lights, the barrier coming down over the oncoming lane, our free exit.
MUST NOT APPEAR: trains, signs, text."""),
  "Du er midt på en jernbaneoverkørsel med halvbomme, da de røde lys begynder at blinke, og bommene begynder at gå ned. Hvad gør du?",
  "You are in the middle of a level crossing with half barriers when the red lights start flashing and the barriers start to come down. "
  "What do you do?",
  "وسط یک گذرگاه راه‌آهن با نیم‌راهبند هستید که چراغ‌های قرمز شروع به چشمک زدن می‌کنند و راهبندها پایین می‌آیند. چه می‌کنید؟",
  S(True, "Jeg kører roligt, men uden ophold, videre over sporene.", "I drive calmly, but without stopping, on over the tracks.",
    "آرام ولی بدون توقف از روی ریل‌ها ادامه می‌دهم.",
    "Sporene skal passeres uden unødigt ophold, og halvbommene spærrer kun indkørslen, så du kan komme ud.",
    "The tracks must be crossed without unnecessary delay, and the half barriers only close the way in, so you can get out.",
    "باید بدون توقفِ بی‌مورد از ریل‌ها گذشت و نیم‌راهبندها فقط راه ورود را می‌بندند، پس می‌توانید خارج شوید."),
  S(False, "Jeg standser og venter, til bommene er helt nede.", "I stop and wait until the barriers are fully down.",
    "می‌ایستم و صبر می‌کنم تا راهبندها کاملاً پایین بیایند.",
    "På sporene er du i fare; du skal køre videre og ud af overkørslen.", "On the tracks you are in danger; you must drive on and off the crossing.",
    "روی ریل‌ها در خطرید؛ باید ادامه دهید و از گذرگاه خارج شوید."),
  S(False, "Jeg bakker tilbage, så jeg kommer væk fra sporene.", "I reverse back so that I get off the tracks.",
    "دنده‌عقب می‌روم تا از روی ریل‌ها دور شوم.",
    "Bag dig kan der holde biler, og vejen frem er fri, så du skal køre fremad.",
    "There may be cars behind you, and the way ahead is free, so you must drive forwards.",
    "ممکن است پشت سرتان خودرو باشد و راه جلو باز است، پس باید رو به جلو برانید."),
  S(False, "Jeg standser og tænder havariblinket, så lokomotivføreren kan se mig.",
    "I stop and switch on the hazard lights so that the train driver can see me.",
    "می‌ایستم و چراغ‌های خطر را روشن می‌کنم تا راننده‌ی قطار مرا ببیند.",
    "Et tog kan ikke standse på kort afstand, så du skal køre væk fra sporene.", "A train cannot stop within a short distance, so you must drive off the tracks.",
    "قطار نمی‌تواند در فاصله‌ی کوتاه بایستد، پس باید از روی ریل‌ها دور شوید."),
)

Q(5868, "7.7", view("""
THE SCENE: a two-lane country road across an open plain on a very windy day; trees and bushes bend in the wind; an oncoming car tows a
caravan, and the caravan swings from side to side behind it, close to the centre line.
MUST BE CLEARLY VISIBLE: the oncoming car with the swaying caravan, the bending trees.
MUST NOT APPEAR: signs, text.""", cond="very windy day, dry road"),
  "Det blæser kraftigt. En modkørende bil trækker en campingvogn, der slingrer fra side til side. Hvordan forholder du dig?",
  "It is very windy. An oncoming car is towing a caravan that is swaying from side to side. What do you do?",
  "باد شدیدی می‌وزد. خودرویی از روبه‌رو کاروانی را می‌کشد که به چپ و راست تاب می‌خورد. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og holder så langt til højre som muligt.", "I slow down and keep as far to the right as possible.",
    "سرعتم را کم می‌کنم و تا جای ممکن به راست می‌روم.",
    "En slingrende campingvogn kan komme over midterlinjen, og så har du mere plads og tid.",
    "A swaying caravan may cross the centre line, and then you have more room and time.",
    "کاروانِ تاب‌خورنده ممکن است از خط وسط رد شود و این‌طور جا و زمان بیشتری دارید."),
  S(True, "Jeg er klar til at bremse og eventuelt standse i rabatten, hvis den er fast.",
    "I am ready to brake and if necessary stop on the verge if it is firm.", "آماده‌ی ترمزم و اگر شانه‌ی جاده سفت باشد، در صورت لزوم آن‌جا می‌ایستم.",
    "Så kan du undgå et sammenstød, hvis campingvognen kommer ind i din vognbane.",
    "Then you can avoid a collision if the caravan comes into your lane.", "این‌طور اگر کاروان وارد خط شما شود، می‌توانید از برخورد جلوگیری کنید."),
  S(True, "Jeg er forberedt på, at vindstødet også kan tage fat i min egen bil.",
    "I am prepared for the gust to catch my own car too.", "آماده‌ام که تندباد خودروی خودم را هم تکان دهد.",
    "Kraftig sidevind kan skubbe alle biler til siden, især på åben vej.", "A strong side wind can push any car sideways, especially on an open road.",
    "باد جانبیِ شدید، به‌خصوص در جاده‌ی باز، می‌تواند هر خودرویی را به کنار براند."),
  S(False, "Jeg blinker med fjernlyset, så føreren kører ind til siden og standser.",
    "I flash my main beam so that the driver pulls over and stops.", "با نور بالا چراغ می‌زنم تا راننده کنار بکشد و بایستد.",
    "Et lysblink kan forvirre føreren, som har nok at gøre med at styre vogntoget.",
    "Flashing your lights may confuse the driver, who has enough to do steering the combination.",
    "چراغ زدن ممکن است راننده را که مشغول کنترل این مجموعه است گیج کند."),
)

Q(5869, "7.7", view("""
THE SCENE: a narrow country road between high hedges, only wide enough for one car; an oncoming car towing a small trailer has stopped
in front of us; about 50 m behind us there is a widening of the road on our side (a passing place), visible in the interior rear-view
mirror at the top of the picture.
MUST BE CLEARLY VISIBLE: the narrow road, the oncoming car with its trailer, the passing place behind us in the mirror.
MUST NOT APPEAR: signs, text."""),
  "Vejen er så smal, at to biler ikke kan passere hinanden. En modkørende bil med trailer holder foran dig. Omkring 50 m bag dig er der en "
  "vigeplads i din side. Hvordan forholder du dig?",
  "The road is so narrow that two cars cannot pass each other. An oncoming car with a trailer has stopped in front of you. About 50 m "
  "behind you there is a passing place on your side. What do you do?",
  "جاده آن‌قدر باریک است که دو خودرو نمی‌توانند از کنار هم رد شوند. خودرویی با یدک از روبه‌رو جلوی شما ایستاده است. حدود ۵۰ متر پشت "
  "سرتان، در سمت شما، جای کنار کشیدن هست. چه می‌کنید؟",
  S(True, "Jeg bakker forsigtigt tilbage til vigepladsen.", "I reverse carefully back to the passing place.",
    "با احتیاط دنده‌عقب تا جای کنار کشیدن می‌روم.",
    "Det er meget sværere at bakke med trailer, så det er lettest og sikrest, at du bakker.",
    "Reversing with a trailer is much harder, so it is easiest and safest for you to reverse.",
    "دنده‌عقب رفتن با یدک خیلی سخت‌تر است، پس آسان‌تر و امن‌تر است که شما دنده‌عقب بروید."),
  S(True, "Før og under bakningen ser jeg mig godt for.", "I look carefully around before and while reversing.",
    "پیش از دنده‌عقب و در حین آن به‌خوبی اطرافم را نگاه می‌کنم.",
    "Før bakning skal du sikre dig, at den kan ske uden fare eller ulempe for andre.",
    "Before reversing you must make sure that it can be done without danger or inconvenience to others.",
    "پیش از دنده‌عقب باید مطمئن شوید که برای دیگران خطر یا مزاحمتی ندارد."),
  S(True, "Når jeg holder i vigepladsen, lader jeg vogntoget køre forbi.", "When I am in the passing place, I let the combination drive past.",
    "وقتی در جای کنار کشیدن ایستادم، می‌گذارم آن مجموعه رد شود.",
    "Vigepladsen giver plads til, at I kan passere hinanden.", "The passing place gives room for you to pass each other.",
    "جای کنار کشیدن فضایی است که بتوانید از کنار هم رد شوید."),
  S(False, "Jeg bliver holdende, for det er altid den, der kører med trailer, der skal bakke.",
    "I stay where I am, because it is always the one with a trailer who must reverse.",
    "همان‌جا می‌مانم، چون همیشه کسی که یدک دارد باید دنده‌عقب برود.",
    "Der er ingen sådan regel; I skal hjælpe hinanden, og her er det lettest for dig at bakke.",
    "There is no such rule; you must help each other, and here it is easiest for you to reverse.",
    "چنین قاعده‌ای نیست؛ باید به هم کمک کنید و این‌جا دنده‌عقب رفتن برای شما آسان‌تر است."),
)

Q(5870, "7.17", view("""
THE SCENE: a motorway on a long, high bridge on a gusty day; in the lane to our right, slightly ahead of us, rides a motorcyclist
leaning into the wind; flags on the bridge railing stand straight out sideways.
MUST BE CLEARLY VISIBLE: the motorcyclist in the lane to our right, the flags showing the strong side wind.
MUST NOT APPEAR: signs, text.""", cond="gusty side wind, dry road"),
  "På en lang bro på motorvejen blæser det kraftigt fra siden. I vognbanen til højre for dig kører en motorcykel lidt foran dig. Hvordan "
  "forholder du dig?",
  "On a long motorway bridge there is a strong side wind. In the lane to your right a motorcycle is riding a little ahead of you. What "
  "do you do?",
  "روی پل بلندی در آزادراه باد شدیدی از کنار می‌وزد. در خط سمت راستتان یک موتورسیکلت کمی جلوتر از شما می‌رود. چه می‌کنید؟",
  S(True, "Jeg undgår at blive liggende ved siden af motorcyklen.", "I avoid staying alongside the motorcycle.",
    "از رانندگیِ طولانی در کنار موتورسیکلت پرهیز می‌کنم.",
    "Et vindstød kan skubbe motorcyklen ind mod din vognbane.", "A gust can push the motorcycle towards your lane.",
    "تندباد می‌تواند موتورسیکلت را به سمت خط شما براند."),
  S(True, "Når jeg kører forbi, holder jeg god afstand til siden.", "When I pass, I keep a good distance to the side.",
    "هنگام رد شدن فاصله‌ی جانبی کافی نگه می‌دارم.",
    "Så har motorcyklisten plads, hvis vinden tager fat.", "Then the motorcyclist has room if the wind catches him.",
    "این‌طور اگر باد موتورسوار را تکان دهد، جا دارد."),
  S(True, "Jeg er opmærksom på, at vinden også kan skubbe min egen bil.", "I am aware that the wind can also push my own car.",
    "حواسم هست که باد می‌تواند خودروی خودم را هم جابه‌جا کند.",
    "På en høj bro er sidevinden ofte særlig kraftig.", "On a high bridge the side wind is often especially strong.",
    "روی پل بلند باد جانبی اغلب شدیدتر است."),
  S(False, "Motorcykler er så tunge, at vinden ikke påvirker dem.", "Motorcycles are so heavy that the wind does not affect them.",
    "موتورسیکلت‌ها آن‌قدر سنگین‌اند که باد رویشان اثری ندارد.",
    "En motorcykel er let i forhold til sin side og kan let blive skubbet af et vindstød.",
    "A motorcycle is light for its side area and can easily be pushed by a gust.", "موتورسیکلت نسبت به سطح جانبی‌اش سبک است و تندباد به‌راحتی جابه‌جایش می‌کند."),
)

Q(5871, "1.2", picture("""
A close-up of the front of a parked car seen from the front left, with both front wheels visible: the left front tyre is a winter tyre
with a deep, jagged tread full of small slits; the right front tyre is a summer tyre with a smooth, flatter tread of a different size;
the difference between the two tyres is easy to see.
MUST BE CLEARLY VISIBLE: the two different front tyres on the same axle.
MUST NOT APPEAR: text, letters or numbers on the tyres or number plate, logos."""),
  "Et forhjul skal skiftes. Det billigste dæk, du kan få, er et brugt sommerdæk i en anden størrelse, men på det andet forhjul sidder et "
  "vinterdæk. Hvad gælder?",
  "A front tyre has to be replaced. The cheapest tyre you can get is a used summer tyre of another size, but the other front wheel "
  "has a winter tyre. What applies?",
  "یکی از لاستیک‌های جلو باید عوض شود. ارزان‌ترین لاستیکی که پیدا می‌کنید یک لاستیک تابستانیِ دست‌دوم با اندازه‌ای دیگر است، ولی روی "
  "چرخ جلوی دیگر لاستیک زمستانی است. چه قاعده‌ای برقرار است؟",
  S(True, "Dækkene på samme aksel skal være af samme type og størrelse.", "The tyres on the same axle must be of the same type and size.",
    "لاستیک‌های روی یک محور باید از یک نوع و یک اندازه باشند.",
    "Forskellige dæk på samme aksel kan få bilen til at trække skævt og skride, især når du bremser.",
    "Different tyres on the same axle can make the car pull to one side and skid, especially when you brake.",
    "لاستیک‌های متفاوت روی یک محور ممکن است باعث کشیدن خودرو به یک طرف و لغزش آن شوند، به‌خصوص هنگام ترمز."),
  S(False, "Det er i orden, når begge dæk har lovlig mønsterdybde.", "It is fine as long as both tyres have a legal tread depth.",
    "تا وقتی عمق آج هر دو لاستیک قانونی باشد، مشکلی نیست.",
    "Mønsterdybden er ikke nok; dækkene på samme aksel skal også være ens.", "Tread depth is not enough; the tyres on the same axle must also match.",
    "عمق آج کافی نیست؛ لاستیک‌های یک محور باید یکسان هم باشند."),
  S(False, "Det er kun vigtigt, at alle fire dæk har det samme tryk.", "It only matters that all four tyres have the same pressure.",
    "فقط مهم است که فشار هر چهار لاستیک یکسان باشد.",
    "Rigtigt dæktryk er vigtigt, men det gør ikke to forskellige dæk på samme aksel i orden.",
    "The right tyre pressure is important, but it does not make two different tyres on the same axle acceptable.",
    "فشار درستِ باد مهم است، ولی دو لاستیکِ متفاوت روی یک محور را قابل قبول نمی‌کند."),
  S(False, "Forskellige dæk på samme aksel har kun betydning ved kørsel på motorvej.",
    "Different tyres on the same axle only matter when driving on the motorway.", "لاستیک‌های متفاوت روی یک محور فقط در آزادراه اهمیت دارند.",
    "Bilens vejgreb og bremseevne bliver dårligere på alle veje.", "The car's grip and braking get worse on all roads.",
    "چسبندگی و توان ترمز خودرو در همه‌ی جاده‌ها بدتر می‌شود."),
)

Q(5872, "7.4", view("""
THE SCENE: a motorway with two lanes in our direction; we drive in the right lane; ahead a car stands on the hard shoulder with its
hazard lights flashing, and a person stands beside it; the left lane next to us is free.
MUST BE CLEARLY VISIBLE: the car on the hard shoulder with hazard lights, the person beside it, the free left lane.
MUST NOT APPEAR: signs, text."""),
  "Du kører i højre vognbane på motorvejen. I nødsporet foran dig holder en bil med havariblinket tændt, og en person står ved siden af "
  "den. Vognbanen til venstre er fri. Hvordan forholder du dig?",
  "You are in the right lane on the motorway. On the hard shoulder ahead a car stands with its hazard lights on, and a person is standing "
  "beside it. The left lane is free. What do you do?",
  "در خط راست آزادراه می‌رانید. جلوتر در شانه‌ی اضطراری خودرویی با چراغ‌های خطرِ روشن ایستاده و شخصی کنارش است. خط چپ خالی است. چه می‌کنید؟",
  S(True, "Jeg skifter til venstre vognbane, når jeg har sikret mig, at det kan ske uden fare.",
    "I move into the left lane once I have made sure it can be done without danger.",
    "وقتی مطمئن شدم بی‌خطر است، به خط چپ می‌روم.",
    "Så får personen ved bilen mere plads, og du kommer længere væk fra en mulig fare.",
    "Then the person by the car gets more room, and you get further away from a possible danger.",
    "این‌طور شخصِ کنار خودرو جای بیشتری دارد و شما از خطر احتمالی دورتر می‌شوید."),
  S(True, "Kan jeg ikke skifte vognbane, sætter jeg farten ned og kører forbi med så stor afstand som muligt.",
    "If I cannot change lanes, I slow down and pass with as much distance as possible.",
    "اگر نتوانم خط عوض کنم، سرعتم را کم می‌کنم و با بیشترین فاصله‌ی ممکن رد می‌شوم.",
    "Personen kan pludselig træde ud mod kørebanen.", "The person may suddenly step out towards the carriageway.",
    "ممکن است آن شخص ناگهان به سمت سواره‌رو قدم بگذارد."),
  S(True, "Jeg blinker, før jeg skifter vognbane.", "I signal before I change lanes.", "پیش از تغییر خط راهنما می‌زنم.",
    "På motorvej skal du altid give tegn før vognbaneskift.", "On a motorway you must always signal before changing lanes.",
    "در آزادراه همیشه باید پیش از تغییر خط علامت بدهید."),
  S(False, "Jeg holder min fart og plads, fordi bilen holder uden for kørebanen.",
    "I keep my speed and position because the car is standing off the carriageway.",
    "سرعت و جایم را حفظ می‌کنم، چون آن خودرو بیرون از سواره‌رو ایستاده است.",
    "Personen ved bilen er tæt på trafikken, og du skal tage hensyn til ham.", "The person by the car is close to the traffic, and you must show consideration for him.",
    "شخصِ کنار خودرو نزدیک ترافیک است و باید ملاحظه‌اش را بکنید."),
)

Q(5873, "7.4", town("""
THE SCENE: a city street with two lanes in our direction; we have driven into the right-hand lane, on whose surface the white word
«BUS» is painted just ahead of us; a broad solid white line separates it from the ordinary lane on our left; further ahead the solid
line changes into a broken line; in the interior rear-view mirror at the top of the picture a city bus approaches behind us.
MUST BE CLEARLY VISIBLE: the word BUS on our lane, the solid line that becomes broken further ahead, the bus in the mirror.
MUST NOT APPEAR: signs, any other text."""),
  "Du er ved en fejl kommet over i en busbane. Linjen mellem busbanen og den almindelige vognbane er ubrudt, men længere fremme bliver den "
  "punkteret. Hvad gør du?",
  "By mistake you have ended up in a bus lane. The line between the bus lane and the ordinary lane is solid, but further ahead it becomes "
  "broken. What do you do?",
  "به اشتباه وارد خط ویژه‌ی اتوبوس شده‌اید. خط بین خط اتوبوس و خط معمولی ممتد است، ولی جلوتر بریده‌بریده می‌شود. چه می‌کنید؟",
  S(True, "Jeg kører ud af busbanen, så snart linjen bliver punkteret, og det kan ske uden fare.",
    "I leave the bus lane as soon as the line becomes broken and it can be done without danger.",
    "به‌محض این‌که خط بریده‌بریده شد و بی‌خطر بود، از خط اتوبوس بیرون می‌روم.",
    "Den ubrudte linje må ikke overskrides her, så du forlader busbanen der, hvor linjen er punkteret.",
    "The solid line must not be crossed here, so you leave the bus lane where the line is broken.",
    "این خط ممتد را این‌جا نباید رد کرد، پس جایی که خط بریده‌بریده است از خط اتوبوس خارج می‌شوید."),
  S(False, "Jeg kører straks over den ubrudte linje til venstre.", "I immediately cross the solid line to the left.",
    "فوراً از روی خط ممتد به چپ می‌روم.",
    "Den ubrudte linje må ikke overskrides; vent, til den bliver punkteret.", "The solid line must not be crossed; wait until it becomes broken.",
    "از خط ممتد نباید رد شد؛ صبر کنید تا بریده‌بریده شود."),
  S(False, "Jeg standser i busbanen og venter, til der bliver plads til venstre.",
    "I stop in the bus lane and wait until there is room on the left.", "در خط اتوبوس می‌ایستم و صبر می‌کنم تا سمت چپ جا باز شود.",
    "I en busbane er det forbudt at standse, og du spærrer for bussen bag dig.",
    "Stopping in a bus lane is forbidden, and you block the bus behind you.", "توقف در خط اتوبوس ممنوع است و راه اتوبوسِ پشت سر را می‌بندید."),
  S(False, "Når jeg først er kommet ind i busbanen, må jeg blive i den resten af vejen.",
    "Once I have got into the bus lane, I may stay in it for the rest of the way.", "حالا که وارد خط اتوبوس شده‌ام، می‌توانم تا آخر راه در آن بمانم.",
    "Busbanen er forbeholdt busser, og du skal forlade den hurtigst muligt.", "The bus lane is reserved for buses, and you must leave it as soon as possible.",
    "خط اتوبوس مخصوص اتوبوس‌هاست و باید هر چه زودتر از آن خارج شوید."),
)

Q(5874, "7.4", view("""
THE SCENE: a motorway in heavy rain; we drive in the right lane behind a lorry that throws up a thick cloud of spray; in the left lane
cars with dipped headlights are half hidden in the spray; the windscreen wipers are at full speed.
MUST BE CLEARLY VISIBLE: the spray behind the lorry, the half-hidden cars in the left lane.
MUST NOT APPEAR: signs, text.""", cond="heavy rain, wet road, spray"),
  "Det regner kraftigt på motorvejen, og bilerne sprøjter så meget vand op, at det er svært at se. Du vil skifte vognbane. Hvad gælder?",
  "It is raining heavily on the motorway, and the cars throw up so much spray that it is hard to see. You want to change lanes. What "
  "applies?",
  "در آزادراه باران شدیدی می‌بارد و خودروها آن‌قدر آب به هوا می‌پاشند که دیدن سخت است. می‌خواهید خط عوض کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skifter kun vognbane, hvis det er nødvendigt, og først når jeg har sikret mig grundigt, at der er plads.",
    "I only change lanes if necessary, and only once I have made thoroughly sure that there is room.",
    "فقط در صورت لزوم خط عوض می‌کنم و تنها وقتی که کاملاً مطمئن شوم جا هست.",
    "Vandtågen gør det svært at se andre biler i spejlene, og de kan også have svært ved at se dig.",
    "The spray makes it hard to see other cars in the mirrors, and they may also find it hard to see you.",
    "مه ناشی از پاشش آب دیدن خودروهای دیگر را در آینه سخت می‌کند و آن‌ها هم ممکن است شما را سخت ببینند."),
  S(False, "Spejlene viser altid, om der er plads, også i vandtåge.", "The mirrors always show whether there is room, also in spray.",
    "آینه‌ها همیشه نشان می‌دهند جا هست یا نه، حتی در مه ناشی از پاشش آب.",
    "Vandtåge og regn på ruderne kan skjule biler i spejlene.", "Spray and rain on the windows can hide cars in the mirrors.",
    "مه ناشی از پاشش آب و باران روی شیشه‌ها ممکن است خودروها را در آینه پنهان کند."),
  S(False, "Jeg slukker lyset, så de andre ikke bliver blændet i vandtågen.", "I switch off my lights so that the others are not dazzled in the spray.",
    "چراغ‌ها را خاموش می‌کنم تا دیگران در مه ناشی از پاشش آب خیره نشوند.",
    "Du skal have lys tændt, så du kan ses; i kraftig nedbør må du også bruge tågelygter.",
    "You must have your lights on so that you can be seen; in heavy rain you may also use fog lamps.",
    "باید چراغ‌ها روشن باشند تا دیده شوید؛ در بارش شدید می‌توانید چراغ مه‌شکن هم روشن کنید."),
)

Q(5875, "7.1", town("""
THE SCENE: a town street; we have pulled in to the right kerb and stopped to let an ambulance pass; the ambulance is now moving away
ahead with its blue lights flashing; in the left exterior door mirror, further back, a police car with flashing blue lights approaches;
other cars ahead are also standing at the kerb.
MUST BE CLEARLY VISIBLE: the ambulance driving away ahead, the police car with blue lights in the door mirror.
MUST NOT APPEAR: signs, text."""),
  "Du har holdt ind til kantstenen for at lade en ambulance komme forbi. Nu er den kørt videre, og du vil køre ud igen. Hvad gælder?",
  "You have pulled in to the kerb to let an ambulance pass. It has now gone, and you want to pull out again. What applies?",
  "برای این‌که آمبولانس رد شود، کنار جدول ایستاده‌اید. حالا آمبولانس رفته و می‌خواهید دوباره حرکت کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg ser mig grundigt for efter flere udrykningskøretøjer og anden trafik, før jeg kører ud.",
    "I look carefully for more emergency vehicles and other traffic before I pull out.",
    "پیش از حرکت، به‌دقت به دنبال خودروهای امدادیِ دیگر و بقیه‌ی ترافیک نگاه می‌کنم.",
    "Der kommer ofte flere udrykningskøretøjer efter hinanden, og du skal sikre dig, at du kan køre ud uden fare.",
    "Several emergency vehicles often come one after another, and you must make sure that you can pull out without danger.",
    "اغلب چند خودروی امدادی پشت سر هم می‌آیند و باید مطمئن شوید که بی‌خطر می‌توانید حرکت کنید."),
  S(False, "Jeg kører ud med det samme og følger tæt efter ambulancen.", "I pull out straight away and follow close behind the ambulance.",
    "فوراً حرکت می‌کنم و از نزدیک پشت آمبولانس می‌روم.",
    "Kører du tæt bag ambulancen, kan du komme i vejen for flere udrykningskøretøjer, og ambulancen kan standse brat.",
    "If you drive close behind the ambulance, you may get in the way of more emergency vehicles, and the ambulance may stop abruptly.",
    "اگر نزدیکِ پشت آمبولانس برانید، ممکن است سر راه خودروهای امدادیِ دیگر قرار بگیرید و آمبولانس ممکن است ناگهان بایستد."),
  S(False, "Jeg behøver ikke give tegn, fordi de andre biler også holder stille.",
    "I need not signal because the other cars are standing still too.", "لازم نیست علامت بدهم، چون خودروهای دیگر هم ایستاده‌اند.",
    "Du skal give tegn, før du kører ud fra kanten af vejen.", "You must signal before you pull out from the edge of the road.",
    "پیش از حرکت از کنار جاده باید علامت بدهید."),
)
