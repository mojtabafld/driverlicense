# «آزمون جدید», batch 7 (5601–5700), part c: straight on at junctions (7.12), right turns (7.13), left turns (7.14), approaching
# junctions (7.11), meeting (7.7).
# Rules: Færdselsloven §§ 4 stk. 4 (signals before give-way markings while they work), 5 stk. 1–3 (stop in good time before the
# signal or barrier; no crossing while the barriers go down), 7 stk. 2 and 6 (free passage for funeral processions), 16 stk. 3
# (left turn as near the middle of the carriageway as possible), 18 stk. 2, 20, 21 stk. 1 (only cyclists and small mopeds may
# overtake on the right), 26 stk. 3, 5–7, 32 stk. 1, 41 stk. 2 nr. 6; Bekendtgørelse om vejafmærkning (BEK 425/2023): B 11 with
# U 1 (advance warning of B 11), B 16, A 43,3, E 49 point 8 (ubetinget vigepligt out of a pedestrian street), § 57 R 11 and R 13
# (double arrows for two junctions in a row), § 59 S 11, S 13, S 16 (where to stop in the turn lane if the rules for turning
# traffic require it), S 22 (cycle box in front of a right-turn lane), Q 47, § 65 stk. 2–4 (leave the junction when red comes;
# red and yellow next to a level crossing can go back to red), § 66 X 12, § 69 Z 72,1 (red flashing at fire-station exits) and
# Z 72,2 (a green arrow under the red flashing signal for those turning that way).
from nq import Q, S, above, town, view

Q(5651, "7.12", town("""
THE SCENE: a junction in town with traffic lights; our light is GREEN; a funeral procession crosses the junction from the left: a black
hearse in front followed by a line of cars with their headlights on, driving close together; the last cars are still entering the
junction.
MUST BE CLEARLY VISIBLE: our green light, the hearse, the line of cars following it with headlights on.
MUST NOT APPEAR: signs, text."""),
  "Dit lys er grønt, men et ligtog kører i en sluttet række gennem krydset foran dig. Hvordan forholder du dig?",
  "Your light is green, but a funeral procession is driving through the junction in front of you in a closed line. What do you do?",
  "چراغ شما سبز است، ولی یک کاروان تشییع جنازه به‌صورت ستونی پیوسته از تقاطعِ جلوی شما رد می‌شود. چه می‌کنید؟",
  S(True, "Jeg venter, til hele ligtoget er kørt igennem krydset.", "I wait until the whole funeral procession has passed through the junction.",
    "صبر می‌کنم تا کل کاروان تشییع از تقاطع رد شود.",
    "Trafikanter skal give fri passage for ligtog og andre sluttede optog.", "Road users must give free passage to funeral processions and other closed processions.",
    "کاربران راه باید به کاروان‌های تشییع و دیگر ستون‌های پیوسته راه عبور آزاد بدهند."),
  S(True, "Jeg må ikke køre ind imellem bilerne i ligtoget.", "I must not drive in between the cars in the procession.",
    "نباید بین خودروهای کاروان تشییع وارد شوم.",
    "Et sluttet optog må ikke brydes.", "A closed procession must not be broken.", "ستون پیوسته را نباید از هم جدا کرد."),
  S(False, "Jeg har grønt, så ligtoget skal holde tilbage for mig.", "I have green, so the procession must give way to me.",
    "چراغ من سبز است، پس کاروان باید به من راه بدهد.",
    "Ligtoget skal have fri passage, også når du har grønt.", "The procession must have free passage, also when you have green.",
    "کاروان باید راه عبور آزاد داشته باشد، حتی وقتی چراغ شما سبز است."),
  S(False, "Jeg dytter, så de sidste biler i ligtoget skynder sig.", "I sound the horn so that the last cars in the procession hurry up.",
    "بوق می‌زنم تا خودروهای آخر کاروان عجله کنند.",
    "Hornet må kun bruges for at forebygge eller afværge fare.", "The horn may only be used to prevent or avert danger.",
    "بوق فقط برای پیشگیری یا دفع خطر است."),
)

Q(5652, "7.12", view("""
THE SCENE: a junction with traffic lights; immediately beyond the junction the road crosses a railway with barriers (raised); our signal
shows RED and YELLOW together; we stand first at the stop line.
MUST BE CLEARLY VISIBLE: our signal showing red and yellow, the level crossing just beyond the junction.
MUST NOT APPEAR: signs other than the crossing's own, text, trains."""),
  "Ved et lyskryds lige før en jernbaneoverkørsel viser dit signal rødt og gult. Hvad gælder?",
  "At a junction with traffic lights just before a level crossing, your signal shows red and yellow. What applies?",
  "در تقاطعی چراغ‌دار، درست پیش از یک تقاطع راه‌آهن، چراغ شما قرمز و زرد را با هم نشان می‌دهد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg bliver holdende, og signalet kan skifte tilbage til rødt, hvis et tog nærmer sig.",
    "I stay where I am, and the signal may go back to red if a train approaches.",
    "سر جایم می‌مانم و اگر قطاری نزدیک شود، ممکن است چراغ دوباره قرمز شود.",
    "Rødt og gult betyder stop, og ved kryds lige ved en jernbaneoverkørsel kan signalet skifte tilbage til rødt.",
    "Red and yellow means stop, and at a junction right by a level crossing the signal can go back to red.",
    "قرمز و زرد یعنی ایست و در تقاطعی که درست کنار تقاطع راه‌آهن است، چراغ ممکن است دوباره قرمز شود."),
  S(False, "Rødt og gult betyder, at jeg må køre.", "Red and yellow means that I may go.", "قرمز و زرد یعنی می‌توانم حرکت کنم.",
    "Rødt og gult har samme betydning som rødt lys.", "Red and yellow has the same meaning as a red light.", "قرمز و زرد همان معنای چراغ قرمز را دارد."),
  S(False, "Efter rødt og gult kommer der altid grønt.", "Red and yellow is always followed by green.", "بعد از قرمز و زرد همیشه سبز می‌آید.",
    "Her kan signalet gå tilbage til rødt, når et tog nærmer sig.", "Here the signal can go back to red when a train approaches.",
    "این‌جا وقتی قطاری نزدیک شود، چراغ ممکن است دوباره قرمز شود."),
)

Q(5653, "7.12", above("""
THE SCENE: a road seen from above with two lanes in our direction; two junctions follow close after each other; in our lane (the right
lane) a double arrow is painted: a straight arrow whose shaft continues and then bends to the right, showing straight on at the first
junction and right at the second.
VEHICLES (colour code used strictly): a RED car (ours) in the right lane before the first junction; a SOLID GREEN arrow from it straight
through the first junction and right at the second.
MUST NOT APPEAR: signs, text."""),
  "I din vognbane er der malet dobbelte pile: først ligeud og derefter til højre. Der kommer to kryds lige efter hinanden. Hvad gælder?",
  "Double arrows are painted in your lane: first straight on and then to the right. Two junctions follow right after each other. What "
  "applies?",
  "در خط شما پیکان دوتایی کشیده شده است: اول مستقیم و بعد به راست. دو تقاطع پشت سر هم می‌آیند. چه قاعده‌ای برقرار است؟",
  S(True, "Fra denne vognbane skal jeg køre ligeud i det første kryds og til højre i det næste.",
    "From this lane I must go straight on at the first junction and right at the next.",
    "از این خط باید در تقاطع اول مستقیم و در تقاطع بعدی به راست بروم.",
    "Dobbelte vognbanepile gælder for to kryds, der følger lige efter hinanden.", "Double lane arrows apply to two junctions that follow right after each other.",
    "پیکان‌های دوتایی برای دو تقاطعی است که پشت سر هم می‌آیند."),
  S(True, "Skal jeg noget andet, vælger jeg en anden vognbane i god tid før det første kryds.",
    "If I want to go another way, I choose another lane in good time before the first junction.",
    "اگر بخواهم به راه دیگری بروم، به‌موقع پیش از تقاطع اول خط دیگری انتخاب می‌کنم.",
    "Pilene skal følges fra den vognbane, du er i, når du kører ind i krydset.", "The arrows must be followed from the lane you are in when entering the junction.",
    "پیکان‌ها را باید از همان خطی که هنگام ورود به تقاطع در آن هستید رعایت کرد."),
  S(False, "Pilene gælder kun for det første kryds.", "The arrows only apply to the first junction.", "این پیکان‌ها فقط برای تقاطع اول‌اند.",
    "Dobbelte pile gælder for begge kryds.", "Double arrows apply to both junctions.", "پیکان‌های دوتایی برای هر دو تقاطع‌اند."),
  S(False, "I det andet kryds må jeg frit vælge retning.", "At the second junction I may choose my direction freely.",
    "در تقاطع دوم می‌توانم آزادانه جهت را انتخاب کنم.",
    "Pilen viser, at du skal til højre i det andet kryds.", "The arrow shows that you must go right at the second junction.",
    "پیکان نشان می‌دهد که در تقاطع دوم باید به راست بروید."),
)

Q(5654, "7.12", view("""
THE SCENE: a junction with traffic lights that are all dark (out of order); on our road, before the junction, stands a square sign
turned on its corner: a yellow diamond with a white border (the Danish main-road sign); in the side road on the right a car waits at
shark teeth beside a give-way sign.
MUST BE CLEARLY VISIBLE: the dark traffic lights, the main-road sign on our road, the car waiting at the shark teeth on the right.
MUST NOT APPEAR: other signs, text."""),
  "Lyssignalerne i krydset er slukket. Du kører på en vej med denne tavle, og i sidevejen til højre er der hajtænder. Hvad gælder?",
  "The traffic lights at the junction are out. You are driving on a road with this sign, and in the side road on the right there are "
  "shark teeth. What applies?",
  "چراغ‌های تقاطع خاموش‌اند. شما در جاده‌ای با این تابلو می‌رانید و در راه فرعیِ سمت راست خط‌های دندانه‌کوسه‌ای هست. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Når lyssignalerne er slukket, gælder tavlerne og afmærkningen, så trafikken fra sidevejen har ubetinget vigepligt for mig.",
    "When the lights are out, the signs and markings apply, so the traffic from the side road must give way to me.",
    "وقتی چراغ‌ها خاموش‌اند، تابلوها و خط‌کشی معتبرند، پس ترافیک راه فرعی باید بی‌قیدوشرط به من حق تقدم بدهد.",
    "Signalanlægget går kun forud for vigepligtsafmærkningen, mens det er i funktion.",
    "The traffic lights only come before the give-way markings while they are working.",
    "چراغ راهنمایی فقط تا وقتی کار می‌کند بر علائم حق تقدم مقدم است."),
  S(True, "Jeg holder øje med, om bilen fra sidevejen overser sin vigepligt.", "I watch whether the car from the side road overlooks its duty to give way.",
    "مراقبم که آیا خودروی راه فرعی وظیفه‌ی حق تقدم دادن را نادیده می‌گیرد.",
    "Når signalerne er ude af drift, kan andre være i tvivl om, hvad der gælder.", "When the signals are out of order, others may be unsure what applies.",
    "وقتی چراغ‌ها از کار افتاده‌اند، ممکن است دیگران مطمئن نباشند چه قاعده‌ای برقرار است."),
  S(False, "Når lyset er slukket, gælder højre vigepligt.", "When the lights are out, the right-hand rule applies.",
    "وقتی چراغ‌ها خاموش‌اند، قاعده‌ی حق تقدم دست راست برقرار است.",
    "Her er der tavler og hajtænder, og de gælder, når lyset er slukket.", "Here there are signs and shark teeth, and they apply when the lights are out.",
    "این‌جا تابلو و خط دندانه‌کوسه‌ای هست و وقتی چراغ خاموش است، همان‌ها معتبرند."),
  S(False, "Jeg skal standse ved stoplinjen, som om lyset var rødt.", "I must stop at the stop line as if the light were red.",
    "باید پشت خط ایست بایستم، انگار چراغ قرمز است.",
    "Et slukket signal betyder ikke rødt; så gælder tavlerne og afmærkningen.", "A dark signal does not mean red; then the signs and markings apply.",
    "چراغ خاموش به معنای قرمز نیست؛ آن‌وقت تابلوها و خط‌کشی معتبرند."),
)

Q(5655, "7.12", town("""
THE SCENE: we drive straight along a town street; on the right a pedestrian street (paved with flagstones, with a blue square
pedestrian-street sign at its mouth facing out of it) meets our street; a delivery van is driving slowly out of the pedestrian street
towards our street.
MUST BE CLEARLY VISIBLE: the pedestrian street on the right, the van coming out of it.
MUST NOT APPEAR: other signs, text, brand names."""),
  "Du kører ligeud ad gaden. Fra en gågade til højre er en varevogn ved at køre ud på din gade. Hvad gælder?",
  "You are driving straight along the street. From a pedestrian street on the right a van is about to drive out onto your street. What "
  "applies?",
  "در خیابان مستقیم می‌رانید. از یک خیابان پیاده در سمت راست، یک ون در حال بیرون آمدن به خیابان شماست. چه قاعده‌ای برقرار است؟",
  S(True, "Varevognen har ubetinget vigepligt for mig.", "The van must give way to me.", "آن ون باید بی‌قیدوشرط به من حق تقدم بدهد.",
    "Kørende har ubetinget vigepligt ved udkørsel fra en gågade.", "Drivers must give way when coming out of a pedestrian street.",
    "رانندگان هنگام خروج از خیابان پیاده باید بی‌قیدوشرط حق تقدم بدهند."),
  S(True, "Jeg er klar på, at føreren kan overse mig.", "I am ready for the driver to overlook me.", "آماده‌ام که راننده‌ی آن ون مرا نبیند.",
    "Du skal være forberedt på, at andre ikke overholder deres vigepligt.", "You must be prepared for others not to keep their duty to give way.",
    "باید آماده باشید که دیگران حق تقدم را رعایت نکنند."),
  S(False, "Varevognen har forkørselsret, fordi den kommer fra højre.", "The van has right of way because it comes from the right.",
    "آن ون حق تقدم دارد، چون از راست می‌آید.",
    "Højre vigepligt gælder ikke ved udkørsel fra en gågade.", "The right-hand rule does not apply when coming out of a pedestrian street.",
    "قاعده‌ی حق تقدم دست راست هنگام خروج از خیابان پیاده برقرار نیست."),
  S(False, "Kørsel ud fra en gågade er ligestillet med kørsel fra en almindelig sidevej uden afmærkning.",
    "Driving out of a pedestrian street is the same as driving out of an ordinary side road without markings.",
    "خروج از خیابان پیاده مثل خروج از یک راه فرعیِ معمولیِ بدون علامت است.",
    "Fra en gågade har den kørende altid ubetinget vigepligt.", "From a pedestrian street the driver always has to give way.",
    "از خیابان پیاده، راننده همیشه باید بی‌قیدوشرط حق تقدم بدهد."),
)

Q(5656, "7.12", above("""
THE SCENE: a junction with traffic lights seen from above; our road runs up the picture; the crossing road runs left to right.
VEHICLES (colour code used strictly): a RED car (ours) standing in the middle of the junction, having entered on green; in front of it a
GREY car that has stopped just past the junction because of a queue; our signal (at the stop line behind us) has turned RED; cars on the
crossing road wait at their stop lines; a SOLID GREEN arrow from the red car forward out of the junction once the grey car moves; a
DASHED ORANGE arrow from the red car reversing back to the stop line.
MUST NOT APPEAR: signs, text."""),
  "Du er kørt ind i krydset for grønt, men bilen foran dig standser. Nu skifter dit lys til rødt, mens du holder inde i krydset. Hvad gør du?",
  "You entered the junction on green, but the car in front of you stops. Now your light turns red while you are standing in the junction. "
  "What do you do?",
  "با چراغ سبز وارد تقاطع شده‌اید، ولی خودروی جلو می‌ایستد. حالا وقتی داخل تقاطع هستید، چراغ شما قرمز می‌شود. چه می‌کنید؟",
  S(True, "Jeg forlader krydset, så snart det kan ske uden fare.", "I leave the junction as soon as it can be done safely.",
    "هرچه زودتر که بی‌خطر باشد، از تقاطع بیرون می‌روم.",
    "Trafikanter, der er kommet ind på det regulerede område, skal så vidt muligt forlade det.",
    "Road users who have entered the controlled area must leave it as far as possible.",
    "کاربرانی که وارد محدوده‌ی تحت کنترل چراغ شده‌اند، باید تا حد ممکن آن را ترک کنند."),
  S(False, "Jeg bakker, så jeg kommer bag stoplinjen igen.", "I reverse so that I am behind the stop line again.",
    "دنده‌عقب می‌روم تا دوباره پشت خط ایست قرار بگیرم.",
    "Bakning inde i krydset kan ikke ske uden fare for de andre.", "Reversing in the junction cannot be done without danger to the others.",
    "دنده‌عقب داخل تقاطع بدون خطر برای دیگران ممکن نیست."),
  S(False, "Jeg bliver holdende, til mit lys bliver grønt igen.", "I stay where I am until my light turns green again.",
    "سر جایم می‌مانم تا چراغم دوباره سبز شود.",
    "Så spærrer du krydset for den tværgående trafik.", "Then you block the junction for the crossing traffic.",
    "این‌طور تقاطع را برای ترافیک عرضی می‌بندید."),
  S(False, "Jeg dytter ad bilen foran, så den kører.", "I sound the horn at the car in front so that it moves.", "برای خودروی جلو بوق می‌زنم تا حرکت کند.",
    "Hornet må kun bruges for at forebygge eller afværge fare.", "The horn may only be used to prevent or avert danger.",
    "بوق فقط برای پیشگیری یا دفع خطر است."),
)

Q(5657, "7.12", above("""
THE SCENE: a wide main road seen from above, running left to right, with two lanes in each direction and a raised central reserve
between them; in the central reserve there is an opening long enough for one car; our side road comes from the bottom of the picture
and continues on the far side; shark teeth lie across our side road at the main road, and more shark teeth lie across the opening in
the central reserve, facing us.
VEHICLES (colour code used strictly): a RED car (ours) at the shark teeth of the side road; GREY cars approaching on the near half of
the main road from the LEFT and on the far half from the RIGHT; a SOLID GREEN arrow from the red car across the near half into the
opening, then across the far half.
MUST NOT APPEAR: signs, text."""),
  "Du skal ligeud over en bred hovedvej med midterrabat. Der er hajtænder både ved din sidevej og i åbningen i midterrabatten. Hvad gælder?",
  "You are going straight across a wide main road with a central reserve. There are shark teeth both at your side road and in the "
  "opening in the central reserve. What applies?",
  "می‌خواهید مستقیم از یک جاده‌ی اصلیِ پهن با میانه‌ی جداکننده بگذرید. هم سر راه فرعیِ شما و هم در شکافِ میانه‌ی جاده خط‌های "
  "دندانه‌کوسه‌ای هست. چه قاعده‌ای برقرار است؟",
  S(True, "Over den første halvdel af vejen holder jeg tilbage for trafikken fra venstre.",
    "Across the first half of the road I give way to the traffic from the left.", "برای عبور از نیمه‌ی اول جاده، به ترافیکِ سمت چپ حق تقدم می‌دهم.",
    "Hajtænderne ved sidevejen viser, at du har ubetinget vigepligt for trafikken på hovedvejen.",
    "The shark teeth at the side road show that you must give way to the traffic on the main road.",
    "خط‌های دندانه‌کوسه‌ای سر راه فرعی نشان می‌دهند که باید به ترافیک جاده‌ی اصلی حق تقدم بدهید."),
  S(True, "I åbningen i midterrabatten holder jeg igen tilbage, nu for trafikken fra højre.",
    "In the opening in the central reserve I give way again, now to the traffic from the right.",
    "در شکاف میانه‌ی جاده دوباره حق تقدم می‌دهم، این بار به ترافیکِ سمت راست.",
    "Hajtænderne i åbningen betyder, at du igen har ubetinget vigepligt.", "The shark teeth in the opening mean that you must give way again.",
    "خط‌های دندانه‌کوسه‌ای داخل شکاف یعنی باید دوباره بی‌قیدوشرط حق تقدم بدهید."),
  S(True, "Jeg kører kun ud i åbningen, hvis der er plads til hele bilen, så jeg ikke spærrer.",
    "I only move into the opening if there is room for the whole car, so that I do not block the road.",
    "فقط وقتی وارد شکاف می‌شوم که جای کل خودرو باشد تا راه را نبندم.",
    "Du skal køre, så du ikke er til unødig ulempe for den tværgående trafik, hvis du må standse.",
    "You must drive so that you are no undue inconvenience to the crossing traffic if you have to stop.",
    "باید طوری برانید که اگر مجبور به توقف شدید، برای ترافیک عرضی مزاحمت بی‌دلیل ایجاد نکنید."),
  S(False, "Når jeg er nået ud til midterrabatten, har jeg forkørselsret over resten af vejen.",
    "Once I have reached the central reserve, I have right of way over the rest of the road.",
    "وقتی به میانه‌ی جاده رسیدم، برای باقی جاده حق تقدم با من است.",
    "Hajtænderne i åbningen viser, at du igen skal holde tilbage.", "The shark teeth in the opening show that you must give way again.",
    "خط‌های دندانه‌کوسه‌ای داخل شکاف نشان می‌دهند که باید دوباره حق تقدم بدهید."),
)

Q(5658, "7.12", view("""
THE SCENE: a junction; just beyond it, on the road straight ahead, a level crossing with barriers; before the junction on our side a red
flashing signal is lit, and under it a green arrow pointing to the right is lit; we want to go straight on.
MUST BE CLEARLY VISIBLE: the red flashing signal with the green arrow to the right beneath it, the level crossing straight ahead.
MUST NOT APPEAR: other signs, text, trains."""),
  "Lige efter krydset er der en jernbaneoverkørsel. Det røde blinksignal lyser, og under det lyser en grøn pil mod højre. Du skal ligeud. "
  "Hvad gælder?",
  "Just after the junction there is a level crossing. The red flashing signal is lit, and below it a green arrow to the right is lit. You "
  "are going straight on. What applies?",
  "درست بعد از تقاطع، تقاطع راه‌آهن هست. چراغ چشمک‌زن قرمز روشن است و زیر آن پیکان سبزِ رو به راست. شما مستقیم می‌روید. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg skal standse, fordi pilen kun gælder dem, der svinger til højre.", "I must stop, because the arrow only applies to those turning right.",
    "باید بایستم، چون پیکان فقط برای کسانی است که به راست می‌پیچند.",
    "En grøn pil under det røde blinksignal betyder, at kun de, der svinger i pilens retning, må passere signalet.",
    "A green arrow under the red flashing signal means that only those turning in the arrow's direction may pass the signal.",
    "پیکان سبز زیر چراغ چشمک‌زن قرمز یعنی فقط کسانی که در جهت پیکان می‌پیچند می‌توانند از چراغ رد شوند."),
  S(False, "Den grønne pil betyder, at alle må køre.", "The green arrow means that everyone may go.", "پیکان سبز یعنی همه می‌توانند بروند.",
    "Pilen gælder kun den retning, den viser.", "The arrow only applies to the direction it shows.", "پیکان فقط برای جهتی است که نشان می‌دهد."),
  S(False, "Jeg må køre ligeud, hvis jeg ikke kan se noget tog.", "I may go straight on if I cannot see a train.",
    "اگر قطاری نبینم، می‌توانم مستقیم بروم.",
    "Det røde blinksignal betyder stop, også når du ikke kan se et tog.", "The red flashing signal means stop, also when you cannot see a train.",
    "چراغ چشمک‌زن قرمز یعنی ایست، حتی وقتی قطاری نمی‌بینید."),
)

Q(5659, "7.13", town("""
THE SCENE: a junction in town with traffic lights; we wait at RED first in the right-turn lane, behind the stop line; in front of the
stop line, ahead of us, a box is painted on the road with a white bicycle symbol, and two cyclists wait in it; a cycle path runs on our
right.
MUST BE CLEARLY VISIBLE: the cycle box with the bicycle symbol in front of our lane, the cyclists waiting in it, our stop line.
MUST NOT APPEAR: signs, text."""),
  "Du holder for rødt i højresvingsbanen. Foran stoplinjen er der et felt med et cykelsymbol, hvor to cyklister holder. Hvad gælder?",
  "You are waiting at a red light in the right-turn lane. In front of the stop line there is a box with a bicycle symbol, where two "
  "cyclists are waiting. What applies?",
  "در خط گردش به راست پشت چراغ قرمز ایستاده‌اید. جلوی خط ایست محدوده‌ای با نماد دوچرخه هست که دو دوچرخه‌سوار در آن ایستاده‌اند. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Cyklisterne må gerne holde i feltet foran mig.", "The cyclists may wait in the box in front of me.",
    "دوچرخه‌سواران اجازه دارند در محدوده‌ی جلوی من بایستند.",
    "Cykelboksen foran højresvingsbanen er et felt, som cyklister og førere af lille knallert kan benytte.",
    "The cycle box in front of the right-turn lane is an area that cyclists and riders of small mopeds may use.",
    "جعبه‌ی دوچرخه‌ی جلوی خط گردش به راست محدوده‌ای است که دوچرخه‌سواران و موتور گازی‌های کوچک می‌توانند از آن استفاده کنند."),
  S(True, "Når lyset bliver grønt, lader jeg cyklisterne, der skal ligeud, køre først.",
    "When the light turns green, I let the cyclists who are going straight on go first.",
    "وقتی چراغ سبز شد، می‌گذارم دوچرخه‌سوارانی که مستقیم می‌روند اول بروند.",
    "Ved højresving må du ikke være til ulempe for cyklister, der kører ligeud.", "When turning right you must not inconvenience cyclists going straight on.",
    "هنگام پیچیدن به راست نباید برای دوچرخه‌سوارانی که مستقیم می‌روند مزاحمت ایجاد کنید."),
  S(False, "Feltet er til biler, der skal svinge til højre.", "The box is for cars turning right.", "این محدوده برای خودروهایی است که به راست می‌پیچند.",
    "Feltet med cykelsymbolet er til cyklister og små knallerter.", "The box with the bicycle symbol is for cyclists and small mopeds.",
    "محدوده‌ی دارای نماد دوچرخه برای دوچرخه‌ها و موتور گازی‌های کوچک است."),
  S(False, "Jeg må køre frem i feltet og holde der for rødt.", "I may move forward into the box and wait there at red.",
    "می‌توانم جلو بروم و داخل این محدوده پشت چراغ قرمز بایستم.",
    "Ved rødt skal du standse ved stoplinjen.", "At red you must stop at the stop line.", "با چراغ قرمز باید پشت خط ایست بایستید."),
)

Q(5660, "7.13", view("""
THE SCENE: a junction in town where we are about to turn RIGHT; our right indicator lamp glows on the dashboard strip; in the right door
mirror (at the right edge of the picture) the cycle path behind us looks empty, but a cyclist is just level with our rear right door,
where the mirror does not show him.
MUST BE CLEARLY VISIBLE: the empty-looking right door mirror, the cyclist beside the rear right door, outside the mirror's view.
MUST NOT APPEAR: signs, text."""),
  "Du skal svinge til højre. I sidespejlet kan du ikke se nogen cyklister. Hvad gælder?",
  "You are about to turn right. You cannot see any cyclists in the door mirror. What applies?",
  "می‌خواهید به راست بپیچید. در آینه‌ی بغل هیچ دوچرخه‌سواری نمی‌بینید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg kigger over skulderen, før jeg svinger.", "I look over my shoulder before I turn.", "پیش از پیچیدن، از روی شانه نگاه می‌کنم.",
    "Et kig over skulderen viser det, spejlet ikke viser.", "A look over your shoulder shows what the mirror does not.",
    "نگاه از روی شانه چیزی را نشان می‌دهد که آینه نشان نمی‌دهد."),
  S(True, "En cyklist kan være i den blinde vinkel, hvor spejlet ikke viser ham.", "A cyclist may be in the blind spot, where the mirror does not show him.",
    "ممکن است دوچرخه‌سواری در نقطه‌ی کور باشد، جایی که آینه او را نشان نمی‌دهد.",
    "Spejlene dækker ikke hele området ved siden af bilen.", "The mirrors do not cover the whole area beside the car.",
    "آینه‌ها همه‌ی فضای کنار خودرو را پوشش نمی‌دهند."),
  S(True, "Cyklister må gerne overhale mig højre om, så de kan komme op på siden af mig.",
    "Cyclists may overtake me on the right, so they may come up beside me.", "دوچرخه‌سواران اجازه دارند از سمت راست از من سبقت بگیرند و کنارم برسند.",
    "Cyklister og førere af lille knallert må overhale andre køretøjer højre om.",
    "Cyclists and riders of small mopeds may overtake other vehicles on the right.",
    "دوچرخه‌سواران و رانندگان موتور گازی کوچک می‌توانند از سمت راستِ وسایل دیگر سبقت بگیرند."),
  S(False, "Når spejlet er tomt, kan jeg roligt svinge.", "When the mirror is empty, I can turn without worry.", "وقتی آینه خالی است، با خیال راحت می‌پیچم.",
    "Spejlet viser ikke den blinde vinkel.", "The mirror does not show the blind spot.", "آینه نقطه‌ی کور را نشان نمی‌دهد."),
)

Q(5661, "7.13", above("""
THE SCENE: a junction seen from above; our road runs up the picture with two lanes for turning RIGHT, both with right-turn arrows, and
the road we turn into has two lanes in our new direction.
VEHICLES (colour code used strictly): a RED car (ours) in the LEFT of the two right-turn lanes; a GREY car in the RIGHT right-turn lane
beside it; a SOLID GREEN arrow from the red car turning right and ending in the left lane of the new road; a DASHED ORANGE arrow from the
red car cutting across into the right lane of the new road.
MUST NOT APPEAR: signs, text."""),
  "Der er to vognbaner til højresving, og du holder i den venstre af dem. Ved siden af dig holder en bil, som også skal til højre. Hvad gælder?",
  "There are two lanes for turning right, and you are in the left one. Beside you there is a car that is also turning right. What applies?",
  "دو خط برای گردش به راست هست و شما در خط چپِ آن‌ها هستید. کنار شما خودرویی است که آن هم به راست می‌پیچد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg bliver i min bane gennem svinget og holder øje med bilen ved siden af mig.",
    "I stay in my lane through the turn and keep an eye on the car beside me.",
    "در طول پیچ در خط خودم می‌مانم و حواسم به خودروی کناری هست.",
    "Begge biler svinger samtidig, så du må ikke skære over i den andens vej.", "Both cars turn at the same time, so you must not cut across into the other's path.",
    "هر دو خودرو هم‌زمان می‌پیچند، پس نباید به مسیر دیگری وارد شوید."),
  S(False, "Jeg må skifte over i den højre vognbane midt i svinget.", "I may move into the right lane in the middle of the turn.",
    "می‌توانم وسط پیچ به خط راست بروم.",
    "Så kan du støde sammen med bilen, der svinger ved siden af dig.", "Then you may collide with the car turning beside you.",
    "این‌طور ممکن است با خودرویی که کنار شما می‌پیچد برخورد کنید."),
  S(False, "Bilen i den højre vognbane skal holde tilbage for mig.", "The car in the right lane must give way to me.",
    "خودروی خط راست باید به من حق تقدم بدهد.",
    "I svinger begge i hver jeres vognbane, og ingen af jer skal holde tilbage for den anden.",
    "You are both turning in your own lanes, and neither of you has to give way to the other.",
    "هر دو در خط خودتان می‌پیچید و هیچ‌کدام لازم نیست به دیگری راه بدهد."),
  S(False, "Jeg må køre ligeud fra vognbanen, hvis der er frit.", "I may go straight on from the lane if it is clear.",
    "اگر راه باز باشد، می‌توانم از این خط مستقیم بروم.",
    "Pilene foran krydset viser, at du skal til højre fra denne vognbane.", "The arrows before the junction show that you must turn right from this lane.",
    "پیکان‌های پیش از تقاطع نشان می‌دهند که از این خط باید به راست بپیچید."),
)

Q(5662, "7.13", town("""
THE SCENE: a town road with a bus lane along the right side, marked with the white word BUS and separated from our lane by a broad
unbroken line that changes to a broad dotted line for the last stretch before a junction; we want to turn right at the junction (our
right indicator lamp glows on the dashboard strip); in the right door mirror (at the right edge of the picture) a bus approaches in the
bus lane.
MUST BE CLEARLY VISIBLE: the bus lane with BUS, the line changing from unbroken to dotted before the junction, the bus in the mirror.
MUST NOT APPEAR: signs, any other text."""),
  "Langs højre side er der en busbane. Lige før krydset bliver linjen mellem din vognbane og busbanen stiplet. Du skal til højre. Hvad gælder?",
  "Along the right side there is a bus lane. Just before the junction the line between your lane and the bus lane becomes dotted. You "
  "are turning right. What applies?",
  "در سمت راست یک خط اتوبوس هست. درست پیش از تقاطع، خطِ بین خط شما و خط اتوبوس بریده‌بریده می‌شود. شما به راست می‌پیچید. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg må køre ind i busbanen, hvor linjen er stiplet, og svinge til højre derfra.",
    "I may move into the bus lane where the line is dotted and turn right from there.",
    "جایی که خط بریده‌بریده است، می‌توانم وارد خط اتوبوس شوم و از آن‌جا به راست بپیچم.",
    "En punkteret kantlinje må krydses, når det ikke strider mod andre bestemmelser.", "A dotted edge line may be crossed when it does not conflict with other rules.",
    "از خط کناریِ بریده‌بریده می‌توان عبور کرد، اگر با قواعد دیگر در تضاد نباشد."),
  S(True, "Før jeg kører ind i busbanen, sikrer jeg mig, at det kan ske uden fare for bussen og cyklister.",
    "Before I move into the bus lane, I make sure it can be done without danger to the bus and to cyclists.",
    "پیش از ورود به خط اتوبوس مطمئن می‌شوم که برای اتوبوس و دوچرخه‌سواران خطری ندارد.",
    "Ved ændring af placering til siden skal du sikre dig, at det kan ske uden fare eller unødig ulempe for andre.",
    "When moving to the side you must make sure it can be done without danger or undue inconvenience to others.",
    "هنگام تغییر جای خودرو به پهلو باید مطمئن شوید که برای دیگران خطر یا مزاحمت بی‌دلیل ندارد."),
  S(False, "Jeg må køre i busbanen hele vejen fra dens begyndelse.", "I may drive in the bus lane all the way from its start.",
    "می‌توانم از ابتدای خط اتوبوس تمام مسیر را در آن برانم.",
    "Busbanen er en særlig bane; du må kun køre ind i den, hvor linjen er stiplet.",
    "The bus lane is a special lane; you may only move into it where the line is dotted.",
    "خط اتوبوس خطی ویژه است؛ فقط جایی که خط بریده‌بریده است می‌توانید وارد آن شوید."),
  S(False, "Bussen i busbanen skal holde tilbage for mig, når jeg blinker.", "The bus in the bus lane must give way to me when I signal.",
    "وقتی راهنما می‌زنم، اتوبوسِ خط اتوبوس باید به من راه بدهد.",
    "Blinklyset giver ingen ret; du skal sikre dig, at der er plads.", "The indicator gives no right; you must make sure there is room.",
    "راهنما حقی نمی‌دهد؛ باید مطمئن شوید جا هست."),
)

Q(5663, "7.13", view("""
THE SCENE: a town junction where we are about to turn RIGHT into a side street; our right indicator lamp glows on the dashboard strip;
there is no cycle path; in the right door mirror (at the right edge of the picture) a motorcycle is moving up along our right side,
between our car and the kerb.
MUST BE CLEARLY VISIBLE: the motorcycle in the right door mirror moving up between our car and the kerb.
MUST NOT APPEAR: signs, text."""),
  "Du skal svinge til højre. I spejlet ser du en motorcykel, der kører op i højre side af dig mellem bilen og kantstenen. Hvad gælder?",
  "You are about to turn right. In the mirror you see a motorcycle moving up on your right, between the car and the kerb. What applies?",
  "می‌خواهید به راست بپیچید. در آینه موتورسیکلتی را می‌بینید که از سمت راست شما، بین خودرو و جدول، جلو می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Motorcyklen må ikke overhale mig højre om, men jeg skal alligevel undgå et sammenstød.",
    "The motorcycle must not overtake me on the right, but I must still avoid a collision.",
    "موتورسیکلت نباید از سمت راست از من سبقت بگیرد، ولی من باز هم باید از برخورد جلوگیری کنم.",
    "Kun cyklister og førere af lille knallert må overhale andre køretøjer højre om, men du skal gøre, hvad du kan for at undgå et uheld.",
    "Only cyclists and riders of small mopeds may overtake other vehicles on the right, but you must do what you can to avoid an accident.",
    "فقط دوچرخه‌سواران و رانندگان موتور گازی کوچک می‌توانند از سمت راست سبقت بگیرند، ولی شما باید هر کاری می‌توانید برای جلوگیری از تصادف بکنید."),
  S(True, "Jeg venter med at svinge, til motorcyklen er kørt forbi eller er standset.",
    "I wait to turn until the motorcycle has gone past or has stopped.", "صبر می‌کنم تا موتورسیکلت رد شود یا بایستد و بعد می‌پیچم.",
    "Svinger du nu, kan du ramme motorcyklen.", "If you turn now, you may hit the motorcycle.", "اگر حالا بپیچید، ممکن است با موتورسیکلت برخورد کنید."),
  S(False, "Jeg svinger, fordi motorcyklen kører ulovligt.", "I turn, because the motorcycle is riding illegally.",
    "می‌پیچم، چون موتورسیکلت خلاف می‌کند.",
    "Andres fejl giver dig ikke lov til at køre ind i dem.", "Other people's mistakes do not allow you to drive into them.",
    "اشتباه دیگران به شما اجازه نمی‌دهد با آن‌ها برخورد کنید."),
  S(False, "Motorcykler må altid overhale biler højre om i byen.", "Motorcycles may always overtake cars on the right in town.",
    "موتورسیکلت‌ها در شهر همیشه می‌توانند از سمت راست از خودروها سبقت بگیرند.",
    "Overhaling skal ske til venstre; kun cyklister og små knallerter må overhale højre om.",
    "Overtaking must be on the left; only cyclists and small mopeds may overtake on the right.",
    "سبقت باید از چپ باشد؛ فقط دوچرخه‌ها و موتور گازی‌های کوچک می‌توانند از راست سبقت بگیرند."),
)

Q(5664, "7.14", town("""
THE SCENE: a junction in town at night in rain; we wait in the junction to turn LEFT; several oncoming cars with bright headlights come
towards us, and their lights glare on the wet road; beside the oncoming cars, on the far cycle path, a cyclist without lights is hardly
visible.
MUST BE CLEARLY VISIBLE: the glaring headlights, the faint cyclist without lights on the far cycle path.
MUST NOT APPEAR: signs, text.""", cond="night, rain, wet road, street lights"),
  "Det er mørkt, og du vil svinge til venstre. Lyset fra de modkørende blænder dig. Hvordan forholder du dig?",
  "It is dark, and you want to turn left. The lights of the oncoming traffic are dazzling you. What do you do?",
  "هوا تاریک است و می‌خواهید به چپ بپیچید. نور خودروهای روبه‌رو چشمتان را خیره می‌کند. چه می‌کنید؟",
  S(True, "Jeg venter, til jeg kan se, at der er frit, også for cyklister og gående.",
    "I wait until I can see that the way is clear, also of cyclists and pedestrians.",
    "صبر می‌کنم تا ببینم راه باز است، از جمله از دوچرخه‌سواران و عابران.",
    "Du må ikke svinge til venstre, før det kan ske uden ulempe for de modkørende.", "You must not turn left until it can be done without inconvenience to oncoming traffic.",
    "تا وقتی پیچیدن به چپ بدون مزاحمت برای ترافیک روبه‌رو ممکن نیست، نباید بپیچید."),
  S(True, "En cyklist uden lys kan være skjult i blændingen.", "A cyclist without lights may be hidden in the glare.",
    "ممکن است دوچرخه‌سواری بدون چراغ در نور خیره‌کننده پنهان باشد.",
    "Når du er blændet, ser du dårligt det, der ikke selv lyser.", "When you are dazzled, you see badly what is not lit itself.",
    "وقتی چشمتان خیره است، چیزهایی را که خودشان نور ندارند بد می‌بینید."),
  S(False, "Jeg svinger hurtigt, mens der er et lille hul mellem lygterne.", "I turn quickly while there is a small gap between the lights.",
    "تا فاصله‌ی کوچکی بین چراغ‌ها هست، سریع می‌پیچم.",
    "Du kan ikke se, hvad der er i hullet.", "You cannot see what is in the gap.", "نمی‌بینید داخل آن فاصله چه هست."),
  S(False, "Jeg blinker med fjernlyset, så de modkørende blænder ned.", "I flash my high beam so that the oncoming drivers dip their lights.",
    "با نور بالا چراغ می‌زنم تا خودروهای روبه‌رو نورشان را پایین بیاورند.",
    "De bruger sandsynligvis nærlys, og dit fjernlys kan blænde dem.", "They are probably using dipped beam, and your high beam may dazzle them.",
    "احتمالاً آن‌ها نور پایین دارند و نور بالای شما ممکن است چشمشان را خیره کند."),
)

Q(5665, "7.14", above("""
THE SCENE: a junction with traffic lights seen from above; our road runs up the picture with a left-turn lane; inside the junction a
broad dotted line is painted across the left-turn path, near the centre of the junction.
VEHICLES (colour code used strictly): a RED car (ours) in the left-turn lane, about to enter on green; GREY oncoming cars coming down the
picture; a SOLID GREEN arrow from the red car forward to the broad dotted line, then left after the oncoming cars.
MUST NOT APPEAR: signs, text."""),
  "Du holder i venstresvingsbanen og har grønt. Inde i krydset er der en bred stiplet linje på tværs af svingbanen. Der kommer modkørende. "
  "Hvad gælder?",
  "You are in the left-turn lane and have green. Inside the junction there is a broad dotted line across the turning lane. There is "
  "oncoming traffic. What applies?",
  "در خط گردش به چپ هستید و چراغتان سبز است. داخل تقاطع یک خط پهنِ بریده‌بریده عرض مسیر گردش را گرفته است. خودروهایی از روبه‌رو "
  "می‌آیند. چه قاعده‌ای برقرار است؟",
  S(True, "Linjen viser, hvor jeg skal standse, hvis jeg må vente på de modkørende.", "The line shows where I must stop if I have to wait for oncoming traffic.",
    "این خط نشان می‌دهد اگر مجبور شوم منتظر ترافیک روبه‌رو بمانم، کجا بایستم.",
    "Linjen for afslutning af svingbanen angiver, hvor du skal standse, hvis reglerne for svingende trafik kræver det.",
    "The line at the end of the turning lane shows where to stop if the rules for turning traffic require it.",
    "خطِ پایان مسیر گردش نشان می‌دهد اگر قواعد گردش لازم کند، کجا باید ایستاد."),
  S(True, "Jeg kører frem til linjen og venter der, til der er frit.", "I drive up to the line and wait there until the way is clear.",
    "تا آن خط جلو می‌روم و همان‌جا صبر می‌کنم تا راه باز شود.",
    "Du må ikke svinge til venstre, før det kan ske uden ulempe for de modkørende.", "You must not turn left until it can be done without inconvenience to oncoming traffic.",
    "تا وقتی پیچیدن به چپ بدون مزاحمت برای ترافیک روبه‌رو ممکن نیست، نباید بپیچید."),
  S(True, "Skifter lyset, mens jeg holder ved linjen, kører jeg ud af krydset, så snart det kan ske uden fare.",
    "If the light changes while I am at the line, I leave the junction as soon as it can be done safely.",
    "اگر وقتی کنار آن خط ایستاده‌ام چراغ عوض شود، هرچه زودتر که بی‌خطر باشد از تقاطع خارج می‌شوم.",
    "Den, der er kommet ind på det regulerede område, skal så vidt muligt forlade det.",
    "Anyone who has entered the controlled area must leave it as far as possible.",
    "کسی که وارد محدوده‌ی تحت کنترل چراغ شده، باید تا حد ممکن آن را ترک کند."),
  S(False, "Linjen betyder, at jeg altid skal standse der, også når der ikke kommer nogen.",
    "The line means that I must always stop there, even when nobody is coming.", "این خط یعنی همیشه باید آن‌جا بایستم، حتی وقتی کسی نمی‌آید.",
    "Du skal kun standse ved linjen, hvis det er nødvendigt.", "You only have to stop at the line if it is necessary.",
    "فقط وقتی لازم باشد، باید کنار این خط بایستید."),
)

Q(5666, "7.14", town("""
THE SCENE: a junction in town; we wait in the middle of the junction to turn LEFT (our left indicator lamp glows on the dashboard strip);
an ambulance with flashing blue lights comes towards us in the oncoming lane, close to the junction.
MUST BE CLEARLY VISIBLE: the ambulance with blue lights coming towards us.
MUST NOT APPEAR: signs, text."""),
  "Du holder midt i krydset og venter på at svinge til venstre. En ambulance med blå blink og sirene kommer imod dig. Hvad gør du?",
  "You are waiting in the middle of the junction to turn left. An ambulance with blue lights and siren is coming towards you. What do you do?",
  "وسط تقاطع ایستاده‌اید و منتظرید به چپ بپیچید. یک آمبولانس با چراغ آبی و آژیر از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg venter med at svinge, til ambulancen er kørt forbi.", "I wait to turn until the ambulance has gone past.",
    "تا آمبولانس رد نشده، نمی‌پیچم.",
    "Du skal i god tid holde vejen åben for et udrykningskøretøj.", "You must keep the road open in good time for an emergency vehicle.",
    "باید به‌موقع راه را برای خودروی امدادی باز نگه دارید."),
  S(False, "Jeg svinger hurtigt foran ambulancen, så jeg ikke er i vejen.", "I turn quickly in front of the ambulance so that I am not in the way.",
    "سریع جلوی آمبولانس می‌پیچم تا سر راهش نباشم.",
    "Så kan du komme lige ud foran ambulancen.", "Then you may end up right in front of the ambulance.", "این‌طور ممکن است درست جلوی آمبولانس قرار بگیرید."),
  S(False, "Ambulancen skal holde tilbage for mig, fordi jeg allerede er i krydset.",
    "The ambulance must give way to me because I am already in the junction.",
    "آمبولانس باید به من راه بدهد، چون من زودتر داخل تقاطع بوده‌ام.",
    "Det er dig, der skal holde vejen åben for ambulancen.", "It is you who must keep the road open for the ambulance.",
    "این شما هستید که باید راه را برای آمبولانس باز نگه دارید."),
)

Q(5667, "7.14", view("""
THE SCENE: a narrow road without a centre line between hedges; ahead on the left a side road goes off; our left indicator lamp glows on
the dashboard strip; nothing is coming towards us.
MUST BE CLEARLY VISIBLE: the narrow road without a centre line, the side road on the left.
MUST NOT APPEAR: signs, text, other vehicles."""),
  "Du kører på en smal vej uden midterlinje og vil svinge til venstre ind ad en sidevej. Hvordan placerer du bilen?",
  "You are driving on a narrow road without a centre line and want to turn left into a side road. How do you position the car?",
  "در جاده‌ای باریک بدون خط وسط می‌رانید و می‌خواهید به چپ وارد راهی فرعی شوید. خودرو را کجای جاده قرار می‌دهید؟",
  S(True, "Jeg placerer bilen så langt ind mod midten af vejen, som det kan ske uden fare.",
    "I place the car as far towards the middle of the road as can be done safely.",
    "خودرو را تا جایی که بی‌خطر است به سمت وسط جاده می‌برم.",
    "Ved svingning til venstre skal køretøjet føres så langt som muligt ind mod kørebanens midte.",
    "When turning left, the vehicle must be taken as far as possible towards the middle of the carriageway.",
    "هنگام پیچیدن به چپ، خودرو باید تا جای ممکن به سمت وسط سواره‌رو برده شود."),
  S(False, "Jeg holder helt ude til højre og svinger i en stor bue.", "I stay right out to the right and turn in a wide curve.",
    "کاملاً سمت راست می‌مانم و با قوسی بزرگ می‌پیچم.",
    "Så skærer du hen over hele vejen og kan forvirre andre.", "Then you cut across the whole road and may confuse others.",
    "این‌طور از عرض کل جاده می‌گذرید و ممکن است دیگران را گیج کنید."),
  S(False, "Uden midterlinje er der ingen regler for, hvordan jeg placerer bilen.", "Without a centre line there are no rules for how I position the car.",
    "بدون خط وسط، قاعده‌ای برای جای خودرو وجود ندارد.",
    "Reglen om at placere sig mod midten gælder også uden afmærkning.", "The rule to move towards the middle applies also without markings.",
    "قاعده‌ی رفتن به سمت وسط بدون خط‌کشی هم برقرار است."),
)

Q(5668, "7.14", town("""
THE SCENE: a junction in town with traffic lights; we wait first in the left-turn lane; our signal head shows a full green light (the
green arrow beside it has just gone out); oncoming cars are starting to move; on the road to the left, pedestrians wait at a crossing.
MUST BE CLEARLY VISIBLE: our full green light with the dark arrow lamp, the oncoming cars, the pedestrians at the crossing on the left.
MUST NOT APPEAR: signs, text."""),
  "Du holder i venstresvingsbanen. Signalet viste en grøn pil, men nu er pilen slukket, og der lyser almindeligt grønt lys. Hvad gælder?",
  "You are in the left-turn lane. The signal showed a green arrow, but now the arrow has gone out and an ordinary green light is lit. "
  "What applies?",
  "در خط گردش به چپ هستید. چراغ پیکان سبز نشان می‌داد، ولی حالا پیکان خاموش شده و چراغ سبزِ معمولی روشن است. چه قاعده‌ای برقرار است؟",
  S(True, "Nu kan de modkørende også have grønt, så jeg må kun svinge, når det kan ske uden ulempe for dem.",
    "Now the oncoming traffic may also have green, so I may only turn when it can be done without inconvenience to them.",
    "حالا ممکن است ترافیک روبه‌رو هم سبز داشته باشد، پس فقط وقتی می‌پیچم که برایشان مزاحمتی نداشته باشد.",
    "Med almindeligt grønt lys gælder reglen om, at venstresving ikke må være til ulempe for modkørende.",
    "With an ordinary green light the rule applies that a left turn must not inconvenience oncoming traffic.",
    "با چراغ سبز معمولی این قاعده برقرار است که پیچیدن به چپ نباید برای ترافیک روبه‌رو مزاحمت ایجاد کند."),
  S(True, "Gående på den vej, jeg svinger ind på, kan også have grønt.", "Pedestrians on the road I turn into may also have green.",
    "ممکن است عابرانِ راهی که واردش می‌شوم هم چراغ سبز داشته باشند.",
    "Ved svingning må du ikke være til fare for gående, der går over den vej, du svinger ind på.",
    "When turning you must not endanger pedestrians crossing the road you turn into.",
    "هنگام پیچیدن نباید برای عابرانی که از راه مقصد می‌گذرند خطری ایجاد کنید."),
  S(False, "Det grønne lys betyder, at jeg stadig har vejen for mig selv.", "The green light means that I still have the road to myself.",
    "چراغ سبز یعنی هنوز راه فقط برای من است.",
    "Det var kun pilen, der gav dig en fri bane; almindeligt grønt gør ikke.", "Only the arrow gave you a free path; an ordinary green does not.",
    "فقط پیکان راه را برای شما خالی می‌کرد؛ سبزِ معمولی این کار را نمی‌کند."),
  S(False, "Jeg skal standse, fordi pilen er slukket.", "I must stop because the arrow has gone out.", "باید بایستم، چون پیکان خاموش شده است.",
    "Grønt lys betyder kør, men du skal holde tilbage for de modkørende.", "A green light means go, but you must give way to the oncoming traffic.",
    "چراغ سبز یعنی حرکت، ولی باید به ترافیک روبه‌رو حق تقدم بدهید."),
)

Q(5669, "7.11", view("""
THE SCENE: a road passing a fire station on the right; over the road hangs a signal with two red lamps, one of them flashing; a broad
stop line is painted across our lane about 30 m ahead; the doors of the fire station are open, but no fire engine can be seen yet.
MUST BE CLEARLY VISIBLE: the flashing red signal over the road, the stop line, the open doors of the fire station.
MUST NOT APPEAR: signs, text, fire engines."""),
  "Ved en brandstation lyser et rødt blinksignal over vejen. Du er 30 m fra stoplinjen. Hvad gælder?",
  "At a fire station a red flashing signal is lit over the road. You are 30 m from the stop line. What applies?",
  "کنار یک ایستگاه آتش‌نشانی، چراغ چشمک‌زن قرمز بالای جاده روشن است. شما ۳۰ متر با خط ایست فاصله دارید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal standse før stoplinjen.", "I must stop before the stop line.", "باید پیش از خط ایست بایستم.",
    "Rødt blinksignal betyder, at du skal standse før stoplinjen.", "A red flashing signal means that you must stop before the stop line.",
    "چراغ چشمک‌زن قرمز یعنی باید پیش از خط ایست بایستید."),
  S(True, "Brandbiler kan være på vej ud fra brandstationen.", "Fire engines may be about to come out of the fire station.",
    "ممکن است خودروهای آتش‌نشانی در حال بیرون آمدن از ایستگاه باشند.",
    "Signalet bruges ved udkørsler for udrykningskøretøjer.", "The signal is used at exits for emergency vehicles.",
    "این چراغ کنار خروجی خودروهای امدادی نصب می‌شود."),
  S(False, "Rødt blinksignal betyder, at jeg skal være forsigtig, men gerne må køre.", "A red flashing signal means that I must be careful but may drive on.",
    "چراغ چشمک‌زن قرمز یعنی باید احتیاط کنم، ولی می‌توانم بروم.",
    "Det er gult blinksignal, der betyder særlig forsigtighed; rødt betyder stop.", "It is a yellow flashing signal that means special care; red means stop.",
    "چراغ چشمک‌زن زرد یعنی احتیاط ویژه؛ قرمز یعنی ایست."),
  S(False, "Jeg må køre, hvis jeg ikke kan se nogen brandbil.", "I may drive on if I cannot see a fire engine.", "اگر خودروی آتش‌نشانی نبینم، می‌توانم بروم.",
    "Signalet skal følges, også når du ikke kan se en brandbil.", "The signal must be obeyed, also when you cannot see a fire engine.",
    "این چراغ را باید رعایت کرد، حتی وقتی خودروی آتش‌نشانی نمی‌بینید."),
)

Q(5670, "7.11", view("""
THE SCENE: a country road; on the right verge stands a give-way sign (a white triangle with a red border, point down) with a white
rectangular plate under it showing «150 m»; the road continues straight; no junction is close by yet.
MUST BE CLEARLY VISIBLE: the give-way sign with the «150 m» plate, the road without a junction nearby.
MUST NOT APPEAR: other signs, any other text."""),
  "Du kører forbi en vigepligtstavle med undertavlen »150 m«. Hvad betyder det?",
  "You pass a give-way sign with the plate «150 m». What does it mean?",
  "از کنار تابلوی حق تقدم با زیرتابلوی «۱۵۰ متر» می‌گذرید. معنی‌اش چیست؟",
  S(True, "Om ca. 150 m kommer et kryds, hvor jeg har ubetinget vigepligt.", "In about 150 m there is a junction where I must give way.",
    "حدود ۱۵۰ متر جلوتر تقاطعی هست که در آن باید بی‌قیدوشرط حق تقدم بدهم.",
    "Med en afstandsangivelse på undertavlen er vigepligtstavlen en forvarsling.", "With a distance on the plate, the give-way sign is an advance warning.",
    "وقتی روی زیرتابلو فاصله آمده، تابلوی حق تقدم هشدارِ پیشاپیش است."),
  S(False, "Jeg skal holde tilbage lige her ved tavlen.", "I must give way right here at the sign.", "باید همین‌جا کنار تابلو حق تقدم بدهم.",
    "Tavlen varsler krydset længere fremme.", "The sign warns of the junction further ahead.", "این تابلو از تقاطعِ جلوتر خبر می‌دهد."),
  S(False, "Vigepligten gælder kun på de næste 150 m.", "The duty to give way only applies for the next 150 m.",
    "وظیفه‌ی حق تقدم فقط تا ۱۵۰ متر بعد برقرار است.",
    "Tallet viser afstanden til krydset, ikke en strækning.", "The number shows the distance to the junction, not a stretch.",
    "این عدد فاصله تا تقاطع را نشان می‌دهد، نه طول یک مسیر را."),
)

Q(5671, "7.11", view("""
THE SCENE: a road approaching a level crossing with half barriers about 50 m ahead; the red lights beside the crossing have just started
to flash, and the barriers are still up; a broad stop line lies across our lane before the crossing.
MUST BE CLEARLY VISIBLE: the flashing red lights, the raised barriers, the stop line, the 50 m to the crossing.
MUST NOT APPEAR: other signs, text, trains."""),
  "De røde lys ved en jernbaneoverkørsel med halvbomme begynder at blinke, da du er ca. 50 m fra overkørslen. Hvordan forholder du dig?",
  "The red lights at a level crossing with half barriers start to flash when you are about 50 m from the crossing. What do you do?",
  "چراغ‌های قرمز یک تقاطع راه‌آهن با نیم‌راه‌بند وقتی شروع به چشمک زدن می‌کنند که حدود ۵۰ متر با آن فاصله دارید. چه می‌کنید؟",
  S(True, "Jeg standser før stoplinjen ved overkørslen.", "I stop before the stop line at the crossing.", "پیش از خط ایستِ تقاطع راه‌آهن می‌ایستم.",
    "Standsning skal ske i betryggende afstand fra sporene og før signal eller bom.", "You must stop at a safe distance from the tracks and before the signal or barrier.",
    "باید با فاصله‌ی ایمن از ریل‌ها و پیش از چراغ یا راه‌بند ایستاد."),
  S(True, "Jeg må ikke køre over, mens bommene går ned.", "I must not cross while the barriers are coming down.",
    "تا وقتی راه‌بندها پایین می‌آیند، نباید رد شوم.",
    "Det er forbudt at passere en jernbaneoverkørsel, mens bommene lukkes.", "It is forbidden to cross a level crossing while the barriers are closing.",
    "رد شدن از تقاطع راه‌آهن وقتی راه‌بندها بسته می‌شوند ممنوع است."),
  S(True, "Jeg bliver holdende, til lysene er slukket og bommene er oppe.", "I stay where I am until the lights are off and the barriers are up.",
    "می‌مانم تا چراغ‌ها خاموش و راه‌بندها بالا باشند.",
    "Så længe signalet viser stop, må du ikke køre over.", "As long as the signal shows stop, you must not cross.",
    "تا وقتی چراغ ایست نشان می‌دهد، نباید رد شوید."),
  S(False, "Jeg sætter farten op for at nå over, før bommene går ned.", "I speed up to get across before the barriers come down.",
    "سرعتم را بالا می‌برم تا پیش از پایین آمدن راه‌بندها رد شوم.",
    "Når signalet viser stop, må du ikke køre over, og du kan sagtens nå at standse.",
    "When the signal shows stop, you must not cross, and you can easily stop in time.",
    "وقتی چراغ ایست نشان می‌دهد، نباید رد شوید و به‌راحتی می‌توانید به‌موقع بایستید."),
)

Q(5672, "7.11", view("""
THE SCENE: a two-lane country road; about 50 m ahead on the right a field track joins the road; a large tractor with a trailer is
creeping out of the field track towards the road, its front wheels at the road's edge.
MUST BE CLEARLY VISIBLE: the field track, the tractor with its front at the road's edge.
MUST NOT APPEAR: signs, text."""),
  "Fra en markvej til højre er en traktor ved at køre ud på landevejen foran dig. Hvordan forholder du dig?",
  "From a field track on the right a tractor is about to drive out onto the country road in front of you. What do you do?",
  "از یک راه مزرعه در سمت راست، تراکتوری در حال ورود به جاده‌ی جلوی شماست. چه می‌کنید؟",
  S(True, "Traktoren har ubetinget vigepligt for mig.", "The tractor must give way to me.", "تراکتور باید بی‌قیدوشرط به من حق تقدم بدهد.",
    "Ubetinget vigepligt gælder ved udkørsel fra en markvej.", "There is a duty to give way when coming out of a field track.",
    "هنگام خروج از راه مزرعه باید بی‌قیدوشرط حق تقدم داد."),
  S(True, "Jeg er klar til at bremse, fordi føreren måske ikke har set mig.", "I am ready to brake because the driver may not have seen me.",
    "آماده‌ی ترمز هستم، چون شاید راننده مرا ندیده باشد.",
    "Du skal være forberedt på, at andre ikke overholder deres vigepligt.", "You must be prepared for others not to keep their duty to give way.",
    "باید آماده باشید که دیگران حق تقدم را رعایت نکنند."),
  S(True, "Kører traktoren ud, kommer den langsomt op i fart, så jeg hurtigt kan nå op bag den.",
    "If the tractor pulls out, it picks up speed slowly, so I may quickly come up behind it.",
    "اگر تراکتور وارد جاده شود، آهسته سرعت می‌گیرد، پس ممکن است زود پشت سرش برسم.",
    "Et tungt køretøj accelererer langsomt.", "A heavy vehicle accelerates slowly.", "وسیله‌ی سنگین آهسته شتاب می‌گیرد."),
  S(False, "Jeg dytter længe, så traktoren bliver holdende.", "I sound the horn for a long time so that the tractor stays where it is.",
    "مدت زیادی بوق می‌زنم تا تراکتور سر جایش بماند.",
    "Hornet må kun bruges for at forebygge eller afværge fare og ikke vare længere end nødvendigt.",
    "The horn may only be used to prevent or avert danger and must not last longer than necessary.",
    "بوق فقط برای پیشگیری یا دفع خطر است و نباید بیش از حد لازم طول بکشد."),
)

Q(5673, "7.7", view("""
THE SCENE: a two-lane road with road works on OUR side: barriers and cones close our lane ahead; before them on the right verge stands
a red-bordered white warning triangle (point up) showing a road whose right edge comes in (the warning sign for a road narrowing on the
right); an oncoming car approaches in its own lane.
MUST BE CLEARLY VISIBLE: the barriers closing our lane, the warning sign, the oncoming car.
MUST NOT APPEAR: other signs, text, workers."""),
  "Ved et vejarbejde er din side af vejen spærret. Før spærringen står denne tavle. En bil kommer imod dig. Hvad gælder?",
  "At road works your side of the road is closed. Before the closure stands this sign. A car is coming towards you. What applies?",
  "کنار یک کار جاده‌ای، سمت شما از جاده بسته است. پیش از بخش بسته این تابلو قرار دارد. خودرویی از روبه‌رو می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Spærringen er i min side, så jeg skal om nødvendigt standse og lade den modkørende passere.",
    "The closure is on my side, so I must stop if necessary and let the oncoming car pass.",
    "بخش بسته در سمت من است، پس در صورت لزوم باید بایستم و بگذارم خودروی روبه‌رو رد شود.",
    "Er vejen delvist spærret, skal det køretøj, i hvis side spærringen er, om nødvendigt standse.",
    "If the road is partly blocked, the vehicle on whose side the obstruction is must stop if necessary.",
    "اگر جاده تا حدی بسته باشد، خودرویی که مانع در سمت آن است، در صورت لزوم باید بایستد."),
  S(True, "Tavlen advarer om, at vejen bliver smallere i højre side.", "The sign warns that the road becomes narrower on the right.",
    "این تابلو هشدار می‌دهد که جاده در سمت راست باریک‌تر می‌شود.",
    "Det er advarselstavlen for indsnævret vej i højre side.", "It is the warning sign for a road narrowing on the right.",
    "این تابلوی هشدارِ باریک شدن جاده در سمت راست است."),
  S(False, "Den modkørende skal holde tilbage, fordi jeg var der først.", "The oncoming car must give way because I was there first.",
    "خودروی روبه‌رو باید راه بدهد، چون من زودتر رسیده‌ام.",
    "Det er den, der har spærringen i sin side, der skal vente.", "It is the one with the obstruction on their side who must wait.",
    "کسی باید صبر کند که مانع در سمت اوست."),
  S(False, "Jeg kører forbi spærringen samtidig med den modkørende, hvis jeg kører langsomt.",
    "I pass the closure at the same time as the oncoming car if I drive slowly.",
    "اگر آهسته برانم، هم‌زمان با خودروی روبه‌رو از کنار بخش بسته رد می‌شوم.",
    "Der er ikke plads til at mødes ved spærringen.", "There is no room to meet at the closure.", "کنار بخش بسته جایی برای عبور هم‌زمان نیست."),
)

Q(5674, "7.7", view("""
THE SCENE: a two-lane country road; an oncoming car about 80 m ahead is slowly drifting over the centre line into our lane; its driver's
head can be seen leaning to one side; a firm verge lies on our right.
MUST BE CLEARLY VISIBLE: the oncoming car drifting into our lane, the driver's leaning head, the firm verge on our right.
MUST NOT APPEAR: signs, text."""),
  "En modkørende bil glider langsomt over midterlinjen og ind i din vognbane. Føreren ser ud til ikke at være opmærksom. Hvad gør du?",
  "An oncoming car is slowly drifting over the centre line into your lane. The driver does not seem to be paying attention. What do you do?",
  "خودرویی از روبه‌رو آرام از خط وسط رد می‌شود و وارد خط شما می‌شود. به نظر می‌رسد راننده حواسش نیست. چه می‌کنید؟",
  S(True, "Jeg bremser og holder så langt til højre, som jeg kan.", "I brake and keep as far to the right as I can.",
    "ترمز می‌گیرم و تا جایی که می‌توانم سمت راست می‌روم.",
    "Så får I mest mulig plads til at passere hinanden.", "That gives you both the most room possible to pass each other.",
    "این‌طور بیشترین جا را برای رد شدن از کنار هم دارید."),
  S(True, "Jeg må give lyd- eller lyssignal for at advare føreren.", "I may sound the horn or flash my lights to warn the driver.",
    "می‌توانم برای هشدار به راننده بوق بزنم یا چراغ بزنم.",
    "Signalerne må bruges, når det er nødvendigt for at forebygge eller afværge fare.", "Signals may be used when necessary to prevent or avert danger.",
    "وقتی برای پیشگیری یا دفع خطر لازم باشد، می‌توان از این علامت‌ها استفاده کرد."),
  S(False, "Jeg svinger ud i den modsatte vognbane for at komme uden om den.", "I swerve into the opposite lane to get round it.",
    "به خط مقابل می‌پیچم تا از کنارش رد شوم.",
    "Retter føreren op, kan I mødes netop dér.", "If the driver corrects, you may meet exactly there.",
    "اگر راننده مسیرش را اصلاح کند، ممکن است درست همان‌جا به هم برسید."),
  S(False, "Jeg holder min fart og min plads, fordi det er den anden, der kører forkert.",
    "I keep my speed and my position, because it is the other driver who is wrong.",
    "سرعت و جای خودم را حفظ می‌کنم، چون آن راننده است که اشتباه می‌کند.",
    "Du skal gøre, hvad du kan, for at undgå et sammenstød.", "You must do what you can to avoid a collision.",
    "باید هر کاری می‌توانید برای جلوگیری از برخورد بکنید."),
)

Q(5675, "7.7", view("""
THE SCENE: a road at night with a cycle path on the right beyond a grass strip; a cyclist comes towards us on the cycle path on our side
of the road with a very bright front lamp that dazzles; beside the cycle path a pedestrian walks, almost hidden by the glare.
MUST BE CLEARLY VISIBLE: the very bright bicycle lamp, the glare, the pedestrian almost hidden by it.
MUST NOT APPEAR: signs, text.""", cond="night, dark, dry road, few street lights"),
  "Det er mørkt. En cyklist kommer imod dig på cykelstien med en meget kraftig forlygte, der blænder dig. Hvordan forholder du dig?",
  "It is dark. A cyclist is coming towards you on the cycle path with a very bright front lamp that dazzles you. What do you do?",
  "هوا تاریک است. دوچرخه‌سواری با چراغ جلوی بسیار قوی که چشم شما را خیره می‌کند، در مسیر دوچرخه از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned, indtil jeg kan se ordentligt igen.", "I slow down until I can see properly again.",
    "سرعتم را کم می‌کنم تا دوباره به‌خوبی ببینم.",
    "Ved risiko for blænding skal farten være passende lav.", "Where there is a risk of being dazzled, the speed must be suitably low.",
    "وقتی خطر خیره شدن چشم هست، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Jeg ser ud mod højre vejkant og ikke direkte ind i lyset.", "I look towards the right edge of the road and not straight into the light.",
    "به لبه‌ی راست جاده نگاه می‌کنم، نه مستقیم به نور.",
    "Så bliver du mindre blændet og kan stadig følge vejen.", "Then you are dazzled less and can still follow the road.",
    "این‌طور کمتر خیره می‌شوید و همچنان می‌توانید جاده را دنبال کنید."),
  S(True, "Jeg holder særligt øje med gående og andre cyklister, som blændingen kan skjule.",
    "I keep a special eye out for pedestrians and other cyclists that the glare may hide.",
    "به‌ویژه مراقب عابران و دوچرخه‌سواران دیگری هستم که ممکن است در نور خیره‌کننده پنهان باشند.",
    "I blændingen kan du let overse dem, der ikke selv lyser.", "In the glare you can easily miss those who are not lit themselves.",
    "در نور خیره‌کننده، کسانی که خودشان نور ندارند به‌راحتی دیده نمی‌شوند."),
  S(False, "Jeg tænder fjernlyset, så cyklisten kan mærke, hvordan det er at blive blændet.",
    "I switch on my high beam so that the cyclist can feel what it is like to be dazzled.",
    "نور بالا را روشن می‌کنم تا دوچرخه‌سوار بفهمد خیره شدن چه حسی دارد.",
    "Du må ikke blænde andre, og det gør situationen farligere.", "You must not dazzle others, and it makes the situation more dangerous.",
    "نباید چشم دیگران را خیره کنید و این کار وضعیت را خطرناک‌تر می‌کند."),
)
