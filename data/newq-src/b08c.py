# «آزمون جدید», batch 8 (5701–5800), part c: straight on at junctions (7.12), left turns (7.14), right turns (7.13),
# approaching junctions (7.11), meeting (7.7) and the car (1.2).
# Rules: Færdselsloven §§ 3 stk. 1, 4 stk. 1, 16 stk. 1–3 (on a one-way carriageway a left turn is made from its left edge),
# 18 stk. 2, 20 stk. 1, 21 stk. 1, 23 stk. 1 nr. 1 b (a vehicle turning left may be overtaken on the right also in a junction),
# 26 stk. 1, 2 (unconditional duty to give way is shown by markings; the sign alone is enough), 4 (giving way to the right also
# applies to a cyclist lawfully riding against a one-way street and in a raised junction), 5 and 6 (left-turners give way to
# all oncoming traffic, also in a bus lane; right-turners to cyclists going straight on), 27 stk. 5 and 7, 32 stk. 1 (the horn
# only to prevent or avert danger), 41 stk. 2 nr. 3, 67 stk. 3–4, 90 (at road works the authority in charge may regulate the
# traffic); Bekendtgørelse om vejafmærkning (BEK 425/2023): B 11, B 19, Q 45 (no driving, stopping or parking on a hatched area;
# where its line is broken, it may be crossed from that side when turning), § 61 V 11 (a triangle on the carriageway warns of
# unconditional duty to give way at the next junction, with the distance before it), V 42 (bus lane), § 65 stk. 2 and 4, § 66
# X 12 (an arrow signal only applies in its direction), X 19 (white bus and light-rail signals apply to scheduled buses, light
# rail and zero-emission cars, not an ordinary petrol car), § 9 U 7 (cyclists may turn right on red; Vejdirektoratet: they still
# give way to pedestrians crossing on green and to crossing cyclists), § 69 Z 93 (yellow flashing light: special care).
from nq import Q, S, above, picture, town, view

Q(5751, "7.12", town("""
THE SCENE: a signal-controlled junction in town; we stand first at the stop line in an ordinary lane, and our traffic light shows red;
to our right is a bus lane with the word BUS, and above it a separate signal head with three openings using white light: the lowest
opening now shows a white vertical bar; a bus in the bus lane is starting to move.
MUST BE CLEARLY VISIBLE: our red light, the separate signal with the white vertical bar, the bus in the bus lane.
MUST NOT APPEAR: other text, signs."""),
  "Du kører i en benzinbil og holder for rødt i en almindelig vognbane. Ved busbanen til højre for dig står et signal med hvidt lys, "
  "som nu viser en lodret hvid streg. Hvad gælder?",
  "You are driving a petrol car and waiting at red in an ordinary lane. By the bus lane to your right there is a signal with white "
  "light, which now shows a vertical white bar. What applies?",
  "با خودرویی بنزینی در خطی معمولی پشت چراغ قرمز ایستاده‌اید. کنار خط اتوبوسِ سمت راست شما چراغی با نور سفید هست که حالا یک نوار "
  "سفیدِ عمودی نشان می‌دهد. چه قاعده‌ای برقرار است؟",
  S(True, "Signalet med hvidt lys gælder busser og letbaner, ikke min benzinbil.", "The signal with white light applies to buses and light rail, not my petrol car.",
    "چراغ سفید برای اتوبوس‌ها و قطار شهری است، نه خودروی بنزینی من.",
    "Signalet med hvidt lys gælder for busser i rutekørsel, letbanekøretøjer og nulemissionsbiler.",
    "The signal with white light applies to scheduled buses, light-rail vehicles and zero-emission cars.",
    "چراغی که نور سفید دارد برای اتوبوس‌های خطی، قطار شهری و خودروهای بدون آلایندگی است."),
  S(True, "Jeg bliver holdende, til signalet for min vognbane viser grønt.", "I stay where I am until the signal for my lane shows green.",
    "می‌مانم تا چراغِ خط خودم سبز شود.",
    "Du skal rette dig efter det signal, der gælder for dig.", "You must follow the signal that applies to you.",
    "باید از چراغی پیروی کنید که برای شما در نظر گرفته شده است."),
  S(False, "Den lodrette hvide streg betyder, at alle i krydset må køre.", "The vertical white bar means that everyone at the junction may go.",
    "نوار سفید عمودی یعنی همه در تقاطع می‌توانند حرکت کنند.",
    "Det hvide signal gælder kun bestemte køretøjer.", "The white signal only applies to certain vehicles.",
    "چراغ سفید فقط برای وسیله‌های مشخصی است."),
  S(False, "Jeg må køre over i busbanen og køre samtidig med bussen.", "I may move over into the bus lane and go at the same time as the bus.",
    "می‌توانم به خط اتوبوس بروم و هم‌زمان با اتوبوس حرکت کنم.",
    "Busbanen og dens signal er ikke for din bil.", "The bus lane and its signal are not for your car.",
    "خط اتوبوس و چراغش برای خودروی شما نیست."),
)

Q(5752, "7.12", above("""
THE SCENE: a junction of two residential streets seen from above; the whole junction area is a raised plateau paved in red, with
short ramps up to it on all four approaches; there are no signs and no shark's teeth anywhere.
VEHICLES (colour code used strictly): a RED car (ours) approaching from the bottom, going straight on; a grey car approaching from
the RIGHT, going straight on.
MUST NOT APPEAR: signs, text."""),
  "Hele krydset er hævet som en flade med rød belægning, og der er ramper op til det fra alle fire veje. Der er ingen tavler eller "
  "hajtænder. En bil kommer fra højre. Hvad gælder?",
  "The whole junction is raised as a plateau with red paving, with ramps up to it from all four roads. There are no signs or shark's "
  "teeth. A car is coming from the right. What applies?",
  "کل تقاطع به شکل سکویی بلندتر با سنگفرش قرمز ساخته شده و از هر چهار خیابان سطح شیب‌داری به آن می‌رسد. نه تابلویی هست نه "
  "دندان‌کوسه‌ای. خودرویی از سمت راست می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen fra højre har forret, også her på den hævede flade.", "The car from the right has priority, also here on the raised plateau.",
    "خودروی سمت راست، این‌جا روی سکوی بلند هم، حق تقدم دارد.",
    "Uden tavler og afmærkning gælder højrevigepligt, også i et hævet kryds.",
    "Without signs or markings you must give way to the right, also in a raised junction.",
    "بدون تابلو و علامت‌گذاری، حق تقدم با سمت راست است، حتی در تقاطعِ بلندشده."),
  S(False, "Den, der kører op på den hævede flade, har ubetinget vigepligt.", "Whoever drives up onto the raised plateau must give way unconditionally.",
    "هر کس وارد سکوی بلند شود، باید به همه حق تقدم بدهد.",
    "Ubetinget vigepligt gælder ved udkørsel over et hævet fortov, en cykelsti eller en rabat, ikke over en hævet flade i et kryds.",
    "The unconditional duty applies when driving out over a raised pavement, cycle path or verge, not over a raised plateau in a junction.",
    "حق تقدمِ مطلق برای خروج از روی پیاده‌رو، مسیر دوچرخه یا شانه‌ی بلندتر است، نه از روی سکوی بلندِ یک تقاطع."),
  S(False, "Den, der først når op på fladen, har forkørselsret.", "Whoever reaches the plateau first has the right of way.",
    "هر کس زودتر به سکو برسد، حق تقدم دارد.",
    "Det er højrevigepligten, der gælder, ikke hvem der kommer først.", "It is the duty to give way to the right that applies, not who arrives first.",
    "قاعده‌ی حق تقدمِ سمت راست برقرار است، نه این‌که چه کسی زودتر برسد."),
  S(False, "Den røde belægning viser, at gående har forrang i hele krydset.", "The red paving shows that pedestrians have priority in the whole junction.",
    "سنگفرش قرمز نشان می‌دهد که عابران در کل تقاطع حق تقدم دارند.",
    "Belægningen giver ikke gående særlige rettigheder; fladen skal blot dæmpe farten.",
    "The paving gives pedestrians no special rights; the plateau is just meant to slow traffic down.",
    "این سنگفرش حق ویژه‌ای به عابران نمی‌دهد؛ این سکو فقط برای کم کردن سرعت است."),
)

Q(5753, "7.12", above("""
THE SCENE: a crossroads seen from above; our road (bottom to top) has no signs or markings; the side road from the LEFT has shark's
teeth across its mouth and a give-way sign; the side road from the RIGHT has no signs or markings.
VEHICLES (colour code used strictly): a RED car (ours) approaching from the bottom, going straight on; a grey car approaching from the
RIGHT; a blue car waiting at the shark's teeth on the LEFT.
MUST NOT APPEAR: other signs, text."""),
  "Du skal ligeud i et kryds. Din vej har hverken tavler eller hajtænder. Sidevejen fra venstre har hajtænder og en vigepligtstavle, men "
  "sidevejen fra højre har ingen afmærkning. En bil kommer fra højre, og en anden holder ved hajtænderne til venstre. Hvad gælder?",
  "You are going straight on at a junction. Your road has neither signs nor shark's teeth. The side road from the left has shark's teeth "
  "and a give-way sign, but the side road from the right has no markings. A car is coming from the right, and another is waiting at "
  "the shark's teeth on the left. What applies?",
  "در تقاطعی می‌خواهید مستقیم بروید. راه شما نه تابلو دارد نه دندان‌کوسه‌ای. راه فرعیِ سمت چپ دندان‌کوسه‌ای و تابلوی رعایت حق تقدم "
  "دارد، ولی راه فرعیِ سمت راست هیچ علامتی ندارد. خودرویی از راست می‌آید و خودرویی دیگر کنار دندان‌کوسه‌ای‌های سمت چپ ایستاده است. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Jeg skal lade bilen fra højre køre før mig.", "I must let the car from the right go before me.", "باید بگذارم خودروی سمت راست پیش از من برود.",
    "Fra højre er der ingen afmærkning, så her gælder højrevigepligt.", "From the right there are no markings, so the duty to give way to the right applies.",
    "از سمت راست علامتی نیست، پس این‌جا حق تقدم با سمت راست است."),
  S(True, "Bilen ved hajtænderne til venstre skal holde tilbage for mig.", "The car at the shark's teeth on the left must give way to me.",
    "خودرویی که کنار دندان‌کوسه‌ای‌های سمت چپ است باید به من حق تقدم بدهد.",
    "Hajtænderne og tavlen giver den ubetinget vigepligt for trafikken fra begge sider.",
    "The shark's teeth and the sign give it an unconditional duty to give way to traffic from both sides.",
    "دندان‌کوسه‌ای و تابلو آن خودرو را موظف می‌کنند به ترافیکِ هر دو طرف حق تقدم بدهد."),
  S(False, "Fordi sidevejen til venstre har hajtænder, har jeg også forkørselsret over for bilen fra højre.",
    "Because the side road on the left has shark's teeth, I also have right of way over the car from the right.",
    "چون راه فرعیِ سمت چپ دندان‌کوسه‌ای دارد، بر خودروی سمت راست هم حق تقدم دارم.",
    "Hajtænderne gælder kun den vej, hvor de er malet; fra højre gælder højrevigepligten.",
    "The shark's teeth only apply to the road where they are painted; from the right the duty to give way to the right applies.",
    "دندان‌کوسه‌ای فقط برای راهی است که روی آن کشیده شده؛ برای سمت راست قاعده‌ی حق تقدم با راست برقرار است."),
  S(False, "Jeg skal holde tilbage for begge biler.", "I must give way to both cars.", "باید به هر دو خودرو حق تقدم بدهم.",
    "Bilen ved hajtænderne har ubetinget vigepligt over for dig.", "The car at the shark's teeth has an unconditional duty to give way to you.",
    "خودرویی که کنار دندان‌کوسه‌ای است باید بی‌قید و شرط به شما حق تقدم بدهد."),
)

Q(5754, "7.12", above("""
THE SCENE: a crossroads in town seen from above; no signs at our approach and no shark's teeth anywhere; the cross street is one-way
from LEFT to RIGHT, shown at the corner by a blue rectangular one-way sign with a white arrow and under it a white plate with a black
bicycle symbol and the word «undtaget».
VEHICLES (colour code used strictly): a RED car (ours) approaching from the bottom, going straight on; a cyclist on the cross street
coming from the RIGHT, riding against the one-way direction.
MUST NOT APPEAR: other signs, other text."""),
  "Du skal ligeud i et kryds uden tavler og hajtænder. Den tværgående gade er ensrettet fra venstre mod højre, men cyklister må køre "
  "begge veje. En cyklist kommer fra højre mod ensretningen. Hvad gælder?",
  "You are going straight on at a junction without signs or shark's teeth. The cross street is one-way from left to right, but cyclists "
  "may ride both ways. A cyclist is coming from the right against the one-way direction. What applies?",
  "در تقاطعی بدون تابلو و دندان‌کوسه‌ای می‌خواهید مستقیم بروید. خیابانِ عرضی از چپ به راست یک‌طرفه است، ولی دوچرخه‌سواران می‌توانند در "
  "هر دو جهت بروند. دوچرخه‌سواری از سمت راست، خلاف جهت یک‌طرفه، می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal holde tilbage for cyklisten fra højre.", "I must give way to the cyclist from the right.", "باید به دوچرخه‌سوارِ سمت راست حق تقدم بدهم.",
    "Uden tavler og afmærkning gælder højrevigepligt, også over for en cyklist, der lovligt kører mod ensretningen.",
    "Without signs or markings you must give way to the right, also to a cyclist lawfully riding against the one-way direction.",
    "بدون تابلو و علامت‌گذاری، حق تقدم با سمت راست است، حتی برای دوچرخه‌سواری که قانوناً خلاف جهتِ یک‌طرفه می‌آید."),
  S(True, "I en ensrettet gade, hvor cykler er undtaget, kan der komme cyklister fra begge sider.",
    "In a one-way street where bicycles are exempt, cyclists may come from both sides.",
    "در خیابان یک‌طرفه‌ای که دوچرخه‌ها از آن مستثنا هستند، دوچرخه‌سوار ممکن است از هر دو طرف بیاید.",
    "Undtagelsen betyder, at cyklister må køre mod ensretningen.", "The exemption means that cyclists may ride against the one-way direction.",
    "این استثنا یعنی دوچرخه‌سواران می‌توانند خلاف جهت یک‌طرفه بروند."),
  S(False, "Jeg behøver kun se til venstre, fordi gaden er ensrettet.", "I only need to look left because the street is one-way.",
    "فقط کافی است به چپ نگاه کنم، چون خیابان یک‌طرفه است.",
    "Cyklister kan komme fra højre, når de er undtaget fra ensretningen.", "Cyclists may come from the right when they are exempt from the one-way rule.",
    "وقتی دوچرخه‌ها از یک‌طرفه بودن مستثنا هستند، ممکن است دوچرخه‌سوار از راست بیاید."),
  S(False, "Cyklisten skal holde tilbage, fordi han kører mod ensretningen.", "The cyclist must give way because he is riding against the one-way direction.",
    "دوچرخه‌سوار باید حق تقدم بدهد، چون خلاف جهتِ یک‌طرفه می‌آید.",
    "Han kører lovligt, og du har ham på din højre side.", "He is riding lawfully, and he is on your right.",
    "او قانونی می‌آید و در سمت راست شماست."),
)

Q(5755, "7.12", view("""
THE SCENE: an unsigned crossroads in a small town; the car ahead of us stands still near the centre line with its left indicator
flashing, waiting for an oncoming car; to its right there is a wide free strip of our lane; there is no cycle lane; we want to go
straight on.
MUST BE CLEARLY VISIBLE: the waiting car with its left indicator, the free room to its right, the junction.
MUST NOT APPEAR: signs, text, traffic lights."""),
  "I et kryds uden lyssignal holder bilen foran dig ved midterlinjen og venter på at svinge til venstre. Til højre for den er der god "
  "plads i din vognbane. Du skal ligeud. Hvad gælder?",
  "At a junction without traffic lights, the car in front of you stands at the centre line waiting to turn left. To its right there is "
  "plenty of room in your lane. You are going straight on. What applies?",
  "در تقاطعی بدون چراغ راهنمایی، خودروی جلویی کنار خط وسط ایستاده و منتظر است به چپ بپیچد. سمت راستش در خط شما جای زیادی هست. شما "
  "مستقیم می‌روید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må køre forbi bilen i højre side, hvis det kan ske uden fare.", "I may pass the car on the right if it can be done without danger.",
    "اگر بی‌خطر باشد، می‌توانم از سمت راستِ آن خودرو رد شوم.",
    "En bil, der svinger til venstre, skal overhales højre om, og det er tilladt også i krydset.",
    "A car turning left must be overtaken on the right, and that is allowed also in the junction.",
    "از خودرویی که به چپ می‌پیچد باید از راست سبقت گرفت و این کار داخل تقاطع هم مجاز است."),
  S(True, "Jeg holder øje med gående og cyklister, som bilen kan skjule.", "I watch out for pedestrians and cyclists that the car may hide.",
    "مراقب عابران و دوچرخه‌سوارانی هستم که ممکن است پشت آن خودرو پنهان باشند.",
    "Bilen kan fx skjule en gående, der går over vejen foran den.", "The car may, for example, hide a pedestrian crossing the road in front of it.",
    "آن خودرو ممکن است مثلاً عابری را که جلویش از خیابان رد می‌شود پنهان کند."),
  S(True, "Jeg skal stadig holde tilbage for trafik fra højre i krydset.", "I must still give way to traffic from the right in the junction.",
    "باز هم باید در تقاطع به ترافیکِ سمت راست حق تقدم بدهم.",
    "Vigepligten i krydset gælder også, når du kører forbi en svingende bil.", "The duty to give way at the junction also applies when you pass a turning car.",
    "حق تقدم در تقاطع وقتی هم که از کنار خودرویی در حال پیچیدن رد می‌شوید، برقرار است."),
  S(False, "Jeg skal vente bag bilen, fordi det er forbudt at overhale i et kryds.", "I must wait behind the car because overtaking in a junction is forbidden.",
    "باید پشت آن خودرو بمانم، چون سبقت در تقاطع ممنوع است.",
    "Forbuddet gælder ikke, når der overhales højre om et køretøj, der svinger til venstre.",
    "The ban does not apply when overtaking on the right of a vehicle turning left.",
    "این ممنوعیت برای سبقت از سمت راستِ وسیله‌ای که به چپ می‌پیچد، اعمال نمی‌شود."),
)

Q(5756, "7.12", view("""
THE SCENE: a side road approaching a bigger road; at the right stands a red-bordered triangular give-way sign with its point down; the
shark's teeth on the carriageway are worn away and almost invisible; traffic passes on the bigger road.
MUST BE CLEARLY VISIBLE: the give-way sign, the worn-away shark's teeth, the traffic on the bigger road.
MUST NOT APPEAR: other signs, text."""),
  "Du kommer ad en sidevej mod en større vej. Ved krydset står en vigepligtstavle, men hajtænderne på kørebanen er slidt væk. Du skal "
  "ligeud over vejen. Hvad gælder?",
  "You are coming along a side road towards a bigger road. At the junction there is a give-way sign, but the shark's teeth on the "
  "carriageway have worn away. You are going straight across. What applies?",
  "از راهی فرعی به سمت راهی بزرگ‌تر می‌آیید. کنار تقاطع تابلوی رعایت حق تقدم هست، ولی دندان‌کوسه‌ای‌های روی سواره‌رو پاک شده‌اند. "
  "می‌خواهید مستقیم از عرض جاده بگذرید. چه قاعده‌ای برقرار است؟",
  S(True, "Tavlen giver mig ubetinget vigepligt, selv om hajtænderne er væk.", "The sign gives me an unconditional duty to give way, even though the shark's teeth are gone.",
    "تابلو مرا موظف می‌کند بی‌قید و شرط حق تقدم بدهم، حتی اگر دندان‌کوسه‌ای‌ها پاک شده باشند.",
    "Ubetinget vigepligt kan vises med tavlen alene; den gælder, selv om hajtænderne mangler.",
    "The unconditional duty can be shown by the sign alone; it applies even when the shark's teeth are missing.",
    "حق تقدمِ مطلق را می‌توان فقط با تابلو نشان داد؛ حتی اگر دندان‌کوسه‌ای نباشد، برقرار است."),
  S(False, "Når hajtænderne mangler, gælder højrevigepligten.", "When the shark's teeth are missing, giving way to the right applies.",
    "وقتی دندان‌کوسه‌ای نیست، قاعده‌ی حق تقدمِ سمت راست برقرار است.",
    "Tavlen er nok til at give dig ubetinget vigepligt.", "The sign is enough to give you an unconditional duty to give way.",
    "تابلو به‌تنهایی کافی است که حق تقدم با دیگران باشد."),
  S(False, "Jeg skal kun holde tilbage for trafikken fra højre.", "I only have to give way to traffic from the right.",
    "فقط باید به ترافیکِ سمت راست حق تقدم بدهم.",
    "Ubetinget vigepligt gælder for trafikken fra begge sider.", "The unconditional duty applies to traffic from both sides.",
    "حق تقدمِ مطلق برای ترافیکِ هر دو طرف است."),
)

Q(5757, "7.12", town("""
THE SCENE: a signal-controlled junction; we stand first at the stop line in the right lane, whose white road arrow points both straight
ahead and to the right; our signal head shows a red light, and beside it a green arrow pointing right is lit; in the interior
rear-view mirror the car behind us has its right indicator on.
MUST BE CLEARLY VISIBLE: the combined straight-and-right arrow in our lane, the red light and the green right arrow, the car behind.
MUST NOT APPEAR: signs, text."""),
  "Du holder forrest i højre vognbane, som både er til ligeud og højresving. Signalet viser rødt, men ved siden af lyser en grøn pil mod "
  "højre. Du skal ligeud, og bilen bag dig vil til højre. Hvad gælder?",
  "You are first in the right lane, which is for both straight on and turning right. The signal shows red, but beside it a green arrow "
  "to the right is lit. You are going straight on, and the car behind you wants to turn right. What applies?",
  "در خط راست، که هم برای مستقیم و هم برای گردش به راست است، نفر اول ایستاده‌اید. چراغ قرمز است، ولی کنارش فلشی سبز به سمت راست روشن "
  "شده. شما مستقیم می‌روید و خودروی پشتی می‌خواهد به راست بپیچد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal blive holdende, til der er grønt for ligeud.", "I must stay where I am until there is green for straight on.",
    "باید بمانم تا چراغِ مستقیم سبز شود.",
    "Et pilsignal gælder kun for dem, der vil køre i pilens retning.", "An arrow signal only applies to those who want to go in the direction of the arrow.",
    "چراغ فلش‌دار فقط برای کسانی است که می‌خواهند در جهت فلش بروند."),
  S(False, "Jeg må køre ligeud, fordi signalet viser grønt.", "I may go straight on because the signal shows green.",
    "می‌توانم مستقیم بروم، چون چراغ سبز است.",
    "Den grønne pil gælder kun højresving; for ligeud viser signalet rødt.", "The green arrow only applies to turning right; for straight on the signal shows red.",
    "فلش سبز فقط برای گردش به راست است؛ برای مستقیم چراغ قرمز است."),
  S(False, "Jeg kører et stykke frem over stoplinjen, så bilen bag mig kan komme forbi.",
    "I move forward a little past the stop line so that the car behind me can get by.",
    "کمی از خط ایست جلوتر می‌روم تا خودروی پشتی بتواند رد شود.",
    "Ved rødt skal du holde før stoplinjen.", "At red you must stop before the stop line.", "پشت چراغ قرمز باید پیش از خط ایست بایستید."),
  S(True, "Jeg lader mig ikke presse, selv om bilen bag mig dytter.", "I do not let myself be pushed, even if the car behind me sounds its horn.",
    "حتی اگر خودروی پشتی بوق بزند، تحت فشار قرار نمی‌گیرم.",
    "Du skal rette dig efter signalet for den retning, du skal køre i.", "You must follow the signal for the direction you are going in.",
    "باید از چراغِ مربوط به جهتی که می‌خواهید بروید پیروی کنید."),
)

Q(5758, "7.12", town("""
THE SCENE: a signal-controlled junction; our traffic light has just turned green; the car first in the queue in front of us has not
started; we are second in the queue; the far side of the junction is partly hidden by that car.
MUST BE CLEARLY VISIBLE: the green light, the first car standing still, our position second in the queue.
MUST NOT APPEAR: signs, text."""),
  "Du holder som nummer to ved et lyskryds. Lyset skifter til grønt, men bilen forrest kører ikke. Hvordan forholder du dig?",
  "You are second in line at traffic lights. The light turns green, but the first car does not move. What do you do?",
  "پشت چراغ راهنمایی نفر دوم هستید. چراغ سبز می‌شود، ولی خودروی اول حرکت نمی‌کند. چه می‌کنید؟",
  S(True, "Jeg venter roligt, fordi føreren kan have en god grund til at holde stille.", "I wait calmly, because the driver may have a good reason to stay put.",
    "آرام صبر می‌کنم، چون ممکن است راننده دلیل خوبی برای ایستادن داشته باشد.",
    "Der kan fx være en gående eller et udrykningskøretøj, som du ikke kan se.",
    "There may be, for example, a pedestrian or an emergency vehicle that you cannot see.",
    "ممکن است مثلاً عابر یا خودروی امدادی‌ای باشد که شما نمی‌بینید."),
  S(False, "Jeg dytter med det samme, så føreren opdager, at der er grønt.", "I sound the horn at once so that the driver notices it is green.",
    "فوراً بوق می‌زنم تا راننده بفهمد چراغ سبز شده.",
    "Lydsignal må kun bruges, når det er nødvendigt for at forebygge eller afværge fare.",
    "The horn may only be used when it is needed to prevent or avert danger.",
    "بوق فقط وقتی مجاز است که برای پیشگیری یا دفع خطر لازم باشد."),
  S(False, "Jeg kører uden om bilen og ind i krydset.", "I drive round the car and into the junction.", "دور آن خودرو می‌زنم و وارد تقاطع می‌شوم.",
    "Du ved ikke, hvorfor bilen holder, og du kan køre ind i det, den holder for.",
    "You do not know why the car is standing, and you may drive into whatever it is waiting for.",
    "نمی‌دانید چرا آن خودرو ایستاده و ممکن است به همان چیزی بزنید که به خاطرش ایستاده است."),
)

Q(5759, "7.14", town("""
THE SCENE: a town street with two light-rail tracks laid in the middle of the carriageway, one for each direction; ahead a side road
goes off to the left; there are no traffic lights; we are near the centre with our left indicator on; in the left door mirror (at the
left edge of the picture) a light-rail tram approaches from behind on the track; an oncoming car is far away.
MUST BE CLEARLY VISIBLE: the two tracks in the middle, the side road to the left, the tram in the door mirror.
MUST NOT APPEAR: traffic lights, signs, text."""),
  "Du vil svinge til venstre ind på en sidevej. Midt på gaden ligger to letbanespor, og der er ingen lyssignaler i krydset. Hvad gælder?",
  "You want to turn left into a side road. Two light-rail tracks run along the middle of the street, and there are no traffic lights at "
  "the junction. What applies?",
  "می‌خواهید به چپ وارد راهی فرعی شوید. وسط خیابان دو ریل قطار شهری هست و تقاطع چراغ راهنمایی ندارد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg ser efter letbanetog både bagfra og forfra, før jeg kører over sporene.",
    "I look for light-rail trams both from behind and from ahead before I cross the tracks.",
    "پیش از رد شدن از ریل‌ها، هم از پشت و هم از جلو مراقب قطار شهری هستم.",
    "Før du svinger, skal du sikre dig, at det kan ske uden fare for dem, der kører i samme retning, og uden ulempe for de modkørende.",
    "Before turning you must make sure it can be done without danger to those going the same way and without inconvenience to oncoming traffic.",
    "پیش از پیچیدن باید مطمئن شوید که برای هم‌جهت‌ها خطری ندارد و برای روبه‌روها مزاحمتی نیست."),
  S(True, "Jeg venter ikke ude på sporene, mens de modkørende kører forbi.", "I do not wait out on the tracks while the oncoming traffic passes.",
    "وقتی خودروهای روبه‌رو رد می‌شوند، روی ریل‌ها منتظر نمی‌مانم.",
    "Et letbanetog kan ikke vige og har lang bremselængde.", "A light-rail tram cannot swerve and has a long braking distance.",
    "قطار شهری نمی‌تواند کنار بکشد و مسافت ترمزش طولانی است."),
  S(True, "Jeg kører først over sporene, når der ikke kommer et letbanetog.", "I only cross the tracks when no tram is coming.",
    "فقط وقتی از ریل‌ها رد می‌شوم که قطار شهری‌ای نیاید.",
    "Et letbanetog kører på skinner og kan hverken svinge uden om dig eller standse hurtigt.",
    "A tram runs on rails and can neither steer round you nor stop quickly.",
    "قطار شهری روی ریل حرکت می‌کند و نه می‌تواند دور شما بزند و نه سریع بایستد."),
  S(False, "Letbanetoget skal holde tilbage for mig, når jeg har blinket i god tid.", "The tram must give way to me when I have signalled in good time.",
    "وقتی به‌موقع راهنما زده‌ام، قطار شهری باید به من راه بدهد.",
    "Blinklyset giver dig ingen ret, og et letbanetog kan ikke standse på kort afstand.",
    "The indicator gives you no right, and a tram cannot stop in a short distance.",
    "راهنما هیچ حقی به شما نمی‌دهد و قطار شهری نمی‌تواند در فاصله‌ی کوتاه بایستد."),
)

Q(5760, "7.14", above("""
THE SCENE: a one-way street in town seen from above, traffic going up the picture; cycle paths on both sides; a side road joins from
the LEFT.
VEHICLES (colour code used strictly): a RED car (ours) at the left edge of the carriageway with its left indicator flashing, about to
turn left; a cyclist on the LEFT cycle path riding straight on, a little behind our car.
MUST NOT APPEAR: signs, text."""),
  "Du kører i en ensrettet gade med cykelsti i begge sider og vil svinge til venstre. Hvad gælder?",
  "You are driving in a one-way street with cycle paths on both sides and want to turn left. What applies?",
  "در خیابانی یک‌طرفه با مسیر دوچرخه در هر دو طرف رانندگی می‌کنید و می‌خواهید به چپ بپیچید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg placerer bilen så langt ind mod kørebanens venstre kant som muligt.", "I place the car as far over towards the left edge of the carriageway as possible.",
    "خودرو را تا جای ممکن به لبه‌ی چپ سواره‌رو نزدیک می‌کنم.",
    "Ved venstresving fra en kørebane med ensrettet færdsel skal bilen føres ind mod kørebanens venstre kant.",
    "When turning left from a one-way carriageway, the car must be brought over to the left edge of the carriageway.",
    "هنگام گردش به چپ از سواره‌روی یک‌طرفه، خودرو باید به لبه‌ی چپ سواره‌رو برده شود."),
  S(True, "Jeg holder tilbage for cyklister på cykelstien til venstre, der skal ligeud.",
    "I give way to cyclists on the left cycle path who are going straight on.", "به دوچرخه‌سوارانِ مسیر دوچرخه‌ی سمت چپ که مستقیم می‌روند حق تقدم می‌دهم.",
    "Før du svinger, skal du sikre dig, at det kan ske uden fare eller unødig ulempe for dem, der færdes i samme retning.",
    "Before turning you must make sure it can be done without danger or undue inconvenience to those going in the same direction.",
    "پیش از پیچیدن باید مطمئن شوید برای کسانی که در همان جهت می‌روند خطر یا مزاحمتِ بی‌دلیلی ندارد."),
  S(True, "Jeg kigger over venstre skulder efter cyklister, før jeg svinger.", "I look over my left shoulder for cyclists before I turn.",
    "پیش از پیچیدن از روی شانه‌ی چپ به دنبال دوچرخه‌سوار نگاه می‌کنم.",
    "En cyklist kan være i den blinde vinkel til venstre for dig.", "A cyclist may be in the blind spot on your left.",
    "ممکن است دوچرخه‌سواری در نقطه‌ی کورِ سمت چپ شما باشد."),
  S(False, "Cyklisterne til venstre skal holde tilbage for mig, fordi de har mig på deres højre side.",
    "The cyclists on the left must give way to me because I am on their right.", "دوچرخه‌سوارانِ سمت چپ باید به من راه بدهند، چون من سمت راست آن‌ها هستم.",
    "Højrevigepligten gælder ikke her; cyklisterne kører ligeud i samme retning, og du skal lade dem passere.",
    "Giving way to the right does not apply here; the cyclists are going straight on in the same direction, and you must let them pass.",
    "قاعده‌ی حق تقدمِ سمت راست این‌جا مطرح نیست؛ دوچرخه‌سواران در همان جهت مستقیم می‌روند و شما باید بگذارید رد شوند."),
)

Q(5761, "7.14", above("""
THE SCENE: a main road seen from above, running up the picture; ahead a left-turn lane opens in the middle; just before it, between
our lane and the start of the turn lane, lies a hatched area of white diagonal stripes bounded by an unbroken white line; at the end of
the hatched area its boundary becomes a broken line where the turn lane begins.
VEHICLES (colour code used strictly): a RED car (ours) with its left indicator flashing, driving in the normal lane beside the hatched
area.
MUST NOT APPEAR: signs, text."""),
  "Du vil svinge til venstre længere fremme. Før venstresvingsbanen er der et skraveret felt, som er omgivet af en ubrudt linje. Hvordan "
  "kører du ind i svingbanen?",
  "You want to turn left further ahead. Before the left-turn lane there is a hatched area surrounded by an unbroken line. How do you "
  "get into the turn lane?",
  "می‌خواهید جلوتر به چپ بپیچید. پیش از خط گردش به چپ، محدوده‌ای هاشورخورده هست که دورش خطی پیوسته کشیده شده است. چطور وارد خط "
  "گردش می‌شوید؟",
  S(True, "Jeg kører ind i svingbanen der, hvor linjen er punkteret.", "I move into the turn lane where the line is broken.",
    "جایی وارد خط گردش می‌شوم که خط بریده‌بریده است.",
    "Det skraverede felt og den ubrudte linje må ikke overskrides; hvor linjen er punkteret, må du køre over, når du skal svinge.",
    "The hatched area and the unbroken line must not be crossed; where the line is broken you may cross when you are going to turn.",
    "از محدوده‌ی هاشورخورده و خط پیوسته نباید عبور کرد؛ جایی که خط بریده‌بریده است، برای پیچیدن می‌توانید عبور کنید."),
  S(False, "Jeg må køre over det skraverede felt, så jeg kommer hurtigere ind i svingbanen.",
    "I may drive across the hatched area so that I get into the turn lane sooner.",
    "می‌توانم از روی محدوده‌ی هاشورخورده بروم تا زودتر وارد خط گردش شوم.",
    "På en spærreflade må der ikke køres, standses eller parkeres.", "On a hatched area you must not drive, stop or park.",
    "روی محدوده‌ی هاشورخورده نباید رانندگی، توقف یا پارک کرد."),
  S(True, "Jeg blinker og ser i spejlet i god tid, før jeg skifter over i svingbanen.",
    "I signal and check my mirror in good time before I move over into the turn lane.",
    "پیش از رفتن به خط گردش، به‌موقع راهنما می‌زنم و آینه را نگاه می‌کنم.",
    "Du skal sikre dig, at skiftet kan ske uden fare, og give tegn i god tid.", "You must make sure the change can be done without danger, and signal in good time.",
    "باید مطمئن شوید این تغییر بی‌خطر است و به‌موقع علامت بدهید."),
  S(False, "Jeg må holde stille på det skraverede felt, mens jeg venter på et hul i trafikken.",
    "I may stand on the hatched area while I wait for a gap in the traffic.", "تا پیدا شدن فاصله‌ای در ترافیک، می‌توانم روی محدوده‌ی هاشورخورده بایستم.",
    "Det er forbudt at standse på en spærreflade.", "Stopping on a hatched area is forbidden.", "توقف روی محدوده‌ی هاشورخورده ممنوع است."),
)

Q(5762, "7.14", view("""
THE SCENE: an unsigned junction; we wait to turn left, our left indicator lamp glowing on the dashboard strip; an oncoming car
approaches with its right indicator flashing, but it has not yet slowed down much; behind it, further back, a second oncoming car.
MUST BE CLEARLY VISIBLE: the oncoming car with its right indicator flashing, the second car behind it, the side road on the left.
MUST NOT APPEAR: signs, text."""),
  "Du venter på at svinge til venstre i et kryds. En modkørende bil blinker til højre, men den har ikke sat farten tydeligt ned. "
  "Hvordan forholder du dig?",
  "You are waiting to turn left at a junction. An oncoming car is signalling right, but it has not clearly slowed down. What do you do?",
  "در تقاطعی منتظرید به چپ بپیچید. خودرویی از روبه‌رو راهنمای راست زده، ولی سرعتش را به‌وضوح کم نکرده است. چه می‌کنید؟",
  S(True, "Jeg venter, til jeg er sikker på, at bilen virkelig svinger.", "I wait until I am sure that the car is really turning.",
    "صبر می‌کنم تا مطمئن شوم آن خودرو واقعاً می‌پیچد.",
    "Føreren kan have glemt at slukke blinklyset eller kan ombestemme sig.", "The driver may have forgotten to switch off the indicator or may change their mind.",
    "ممکن است راننده خاموش کردن راهنما را فراموش کرده باشد یا تصمیمش را عوض کند."),
  S(True, "Svinger bilen ind på samme vej som mig, skal jeg stadig holde tilbage for den.",
    "If the car turns into the same road as me, I must still give way to it.", "اگر آن خودرو به همان راهی بپیچد که من می‌روم، باز هم باید به آن حق تقدم بدهم.",
    "Du må ikke svinge til venstre, før det kan ske uden ulempe for modkørende færdsel.",
    "You must not turn left until it can be done without inconvenience to oncoming traffic.",
    "تا وقتی گردش به چپ بدون مزاحمت برای ترافیک روبه‌رو ممکن نباشد، نباید بپیچید."),
  S(False, "Jeg svinger med det samme, fordi bilen blinker til højre.", "I turn at once because the car is signalling right.",
    "فوراً می‌پیچم، چون آن خودرو راهنمای راست زده است.",
    "Et blinklys er ingen garanti for, hvad føreren gør.", "An indicator is no guarantee of what the driver will do.",
    "راهنما تضمینی نیست که راننده چه کاری می‌کند."),
  S(True, "Jeg holder også øje med, om der kommer andre bag den modkørende bil.", "I also watch whether others are coming behind the oncoming car.",
    "مراقبم که پشت خودروی روبه‌رو کسان دیگری هم نیایند.",
    "Selv om den første bil svinger, kan der komme flere modkørende, som du skal holde tilbage for.",
    "Even if the first car turns, more oncoming traffic may follow that you must give way to.",
    "حتی اگر خودروی اول بپیچد، ممکن است خودروهای روبه‌روی دیگری بیایند که باید به آن‌ها هم حق تقدم بدهید."),
)

Q(5763, "7.14", town("""
THE SCENE: a town road with two lanes in our direction, both with straight-ahead arrows; about 200 m ahead a junction where we want
to turn left; we drive in the right lane; in the left door mirror (at the left edge of the picture) a car in the left lane is a little
behind us.
MUST BE CLEARLY VISIBLE: the two lanes, the junction ahead, the car in the left lane in the door mirror.
MUST NOT APPEAR: signs, text."""),
  "Vejen har to vognbaner i din retning. Du kører i højre vognbane og skal til venstre i et kryds om ca. 200 m. Hvad gælder?",
  "The road has two lanes in your direction. You are in the right lane and have to turn left at a junction in about 200 m. What applies?",
  "جاده در جهت شما دو خط دارد. در خط راست هستید و باید حدود ۲۰۰ متر جلوتر در یک تقاطع به چپ بپیچید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skifter til venstre vognbane i god tid før krydset, når det kan ske uden fare.",
    "I move into the left lane in good time before the junction, when it can be done without danger.",
    "به‌موقع، پیش از تقاطع، وقتی بی‌خطر باشد، به خط چپ می‌روم.",
    "Den, der skal svinge til venstre, skal i god tid anbringe sig i vognbanen længst til venstre.",
    "Anyone turning left must in good time get into the lane furthest to the left.",
    "کسی که می‌خواهد به چپ بپیچد، باید به‌موقع در چپ‌ترین خط قرار بگیرد."),
  S(False, "Jeg bliver i højre vognbane og svinger til venstre derfra.", "I stay in the right lane and turn left from there.",
    "در خط راست می‌مانم و از همان‌جا به چپ می‌پیچم.",
    "Så krydser du vognbanen til venstre for dig, hvor der kan være biler, der kører ligeud.",
    "Then you cut across the lane to your left, where there may be cars going straight on.",
    "در این صورت از جلوی خطِ سمت چپتان رد می‌شوید که ممکن است در آن خودروهایی مستقیم بروند."),
  S(True, "Jeg kigger i spejlet og over venstre skulder, før jeg skifter vognbane.", "I look in the mirror and over my left shoulder before I change lanes.",
    "پیش از تغییر خط، به آینه و از روی شانه‌ی چپ نگاه می‌کنم.",
    "Der kan være en bil i den blinde vinkel.", "There may be a car in the blind spot.", "ممکن است خودرویی در نقطه‌ی کور باشد."),
  S(True, "Jeg blinker til venstre, før jeg skifter vognbane.", "I signal left before I change lanes.", "پیش از تغییر خط، راهنمای چپ می‌زنم.",
    "Blinket fortæller de andre, hvad du vil, så de kan indrette sig.", "The signal tells the others what you intend, so that they can adjust.",
    "راهنما به دیگران می‌گوید چه قصدی دارید تا بتوانند خود را تطبیق دهند."),
)

Q(5764, "7.14", above("""
THE SCENE: a town street seen from above; in the oncoming direction there is an ordinary lane with a queue of stationary cars and, to
the right of it as seen by the oncoming drivers, a bus lane marked BUS; a van in the queue has left a gap opposite a side road on our
LEFT.
VEHICLES (colour code used strictly): a RED car (ours) waiting at the centre line with its left indicator flashing, wanting to turn left
through the gap into the side road; a bus coming fast along the bus lane towards the gap.
MUST NOT APPEAR: signs, other text."""),
  "Du vil svinge til venstre gennem et hul i den modkørende kø. Til højre for køen, set fra de modkørende, er der en busbane. Hvordan "
  "forholder du dig?",
  "You want to turn left through a gap in the oncoming queue. To the right of the queue, as the oncoming drivers see it, there is a bus "
  "lane. What do you do?",
  "می‌خواهید از میان فاصله‌ای در صفِ خودروهای روبه‌رو به چپ بپیچید. سمت راستِ این صف، از دید رانندگان روبه‌رو، خط اتوبوس هست. چه می‌کنید؟",
  S(True, "Jeg kører langsomt frem og ser efter busser og cyklister i busbanen.", "I move forward slowly and look for buses and cyclists in the bus lane.",
    "آهسته جلو می‌روم و مراقب اتوبوس‌ها و دوچرخه‌سواران در خط اتوبوس هستم.",
    "I busbanen kan der komme busser og cyklister, som du ikke kan se for køen.",
    "In the bus lane there may be buses and cyclists that you cannot see because of the queue.",
    "در خط اتوبوس ممکن است اتوبوس یا دوچرخه‌سوارانی بیایند که به خاطر صف آن‌ها را نمی‌بینید."),
  S(True, "Jeg holder tilbage for alle modkørende, også dem i busbanen.", "I give way to all oncoming traffic, also those in the bus lane.",
    "به همه‌ی روبه‌روها، از جمله آن‌هایی که در خط اتوبوس‌اند، حق تقدم می‌دهم.",
    "Du må ikke svinge til venstre, før det kan ske uden ulempe for modkørende færdsel.",
    "You must not turn left until it can be done without inconvenience to oncoming traffic.",
    "تا وقتی گردش به چپ بدون مزاحمت برای ترافیک روبه‌رو ممکن نباشد، نباید بپیچید."),
  S(False, "Når føreren i køen har lavet et hul til mig, må jeg svinge med det samme.",
    "When the driver in the queue has left a gap for me, I may turn at once.", "وقتی راننده‌ی داخل صف برایم جا باز کرده، می‌توانم فوراً بپیچم.",
    "Føreren i køen kan kun lade dig passere sin egen vognbane, ikke busbanen.",
    "The driver in the queue can only let you cross their own lane, not the bus lane.",
    "راننده‌ی داخل صف فقط می‌تواند اجازه دهد از جلوی خط خودش رد شوید، نه از خط اتوبوس."),
  S(True, "Jeg venter, hvis bussen er tæt på.", "I wait if the bus is close.", "اگر اتوبوس نزدیک است، صبر می‌کنم.",
    "En bus kan ikke standse på kort afstand.", "A bus cannot stop in a short distance.", "اتوبوس نمی‌تواند در فاصله‌ی کوتاه بایستد."),
)

Q(5765, "7.13", town("""
THE SCENE: a signal-controlled junction; we wait at red in a right-turn lane; to our right runs a cycle path with its own small, low
signal for cyclists; under that small signal sits a white rectangular plate showing a black bicycle and a black arrow bending to the
right; a cyclist on the path is turning right although the signal is red.
MUST BE CLEARLY VISIBLE: our red light, the small cyclists' signal with the plate under it, the cyclist turning right.
MUST NOT APPEAR: other signs, text."""),
  "Du holder for rødt i en højresvingsbane. Under det lille signal for cyklisterne sidder en undertavle med et cykelsymbol og en pil, "
  "der drejer til højre. En cyklist svinger til højre, selv om der er rødt. Hvad gælder?",
  "You are waiting at red in a right-turn lane. Under the small signal for cyclists there is a plate with a bicycle symbol and an arrow "
  "bending to the right. A cyclist turns right even though it is red. What applies?",
  "در خط گردش به راست پشت چراغ قرمز ایستاده‌اید. زیر چراغِ کوچکِ دوچرخه‌سواران زیرتابلویی با نماد دوچرخه و فلشی که به راست می‌پیچد "
  "هست. دوچرخه‌سواری با وجود چراغ قرمز به راست می‌پیچد. چه قاعده‌ای برقرار است؟",
  S(True, "Undertavlen betyder, at cyklister må svinge til højre, selv om signalet viser rødt.",
    "The plate means that cyclists may turn right even though the signal shows red.",
    "این زیرتابلو یعنی دوچرخه‌سواران می‌توانند با وجود چراغ قرمز به راست بپیچند.",
    "Undertavlen under signalet betyder, at det røde lys ikke gælder for cyklister, der svinger til højre.",
    "The plate under the signal means that the red light does not apply to cyclists turning right.",
    "زیرتابلوی زیر چراغ یعنی چراغ قرمز برای دوچرخه‌سوارانی که به راست می‌پیچند اعمال نمی‌شود."),
  S(True, "Jeg skal selv vente, til mit eget signal viser grønt.", "I must wait myself until my own signal shows green.",
    "خودم باید صبر کنم تا چراغ خودم سبز شود.",
    "Undertavlen gælder kun cyklister.", "The plate only applies to cyclists.", "این زیرتابلو فقط برای دوچرخه‌سواران است."),
  S(False, "Undertavlen betyder, at også jeg må svinge til højre for rødt, når der ikke kommer nogen.",
    "The plate means that I may also turn right at red when nobody is coming.",
    "این زیرتابلو یعنی من هم وقتی کسی نمی‌آید می‌توانم با چراغ قرمز به راست بپیچم.",
    "Undertavlen gælder kun den færdselsart, den viser, her cyklister.", "The plate only applies to the kind of traffic it shows, here cyclists.",
    "زیرتابلو فقط برای همان نوع ترافیکی است که نشان می‌دهد؛ این‌جا دوچرخه‌سواران."),
  S(False, "Cyklisten, der svinger for rødt, har forret for gående, der går over for grønt.",
    "The cyclist turning at red has priority over pedestrians crossing on green.",
    "دوچرخه‌سواری که با چراغ قرمز می‌پیچد، بر عابرانی که با چراغ سبز رد می‌شوند حق تقدم دارد.",
    "Cyklister, der svinger til højre for rødt, skal fortsat holde tilbage for gående, der krydser for grønt.",
    "Cyclists turning right at red must still give way to pedestrians crossing on green.",
    "دوچرخه‌سوارانی که با چراغ قرمز به راست می‌پیچند، همچنان باید به عابرانی که با چراغ سبز رد می‌شوند حق تقدم بدهند."),
)

Q(5766, "7.13", above("""
THE SCENE: a large junction seen from above; a separate right-turn lane branches off before the junction and is separated from it by a
triangular traffic island; near its end the turn lane crosses a zebra crossing and then meets the road we turn into, where it ends
with shark's teeth.
VEHICLES (colour code used strictly): a RED car (ours) in the right-turn lane approaching the zebra crossing; cars approaching on the
road we turn into from the LEFT.
PEOPLE: a pedestrian waiting at the zebra crossing.
MUST NOT APPEAR: signs, text, traffic lights for the turn lane."""),
  "Du svinger til højre ad en særlig svingbane, der er adskilt fra krydset med en helle. Svingbanen krydser et fodgængerfelt og ender "
  "med hajtænder ved den vej, du skal ind på. Hvad gælder?",
  "You are turning right along a separate turn lane, divided from the junction by a traffic island. The turn lane crosses a pedestrian "
  "crossing and ends with shark's teeth at the road you are entering. What applies?",
  "از خطی جداگانه برای گردش به راست، که با جزیره‌ای از تقاطع جدا شده، می‌پیچید. این خط از روی یک گذرگاه عابر می‌گذرد و کنار جاده‌ای "
  "که وارد آن می‌شوید با دندان‌کوسه‌ای تمام می‌شود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder tilbage for gående, der er på vej ud i fodgængerfeltet.", "I give way to pedestrians on their way onto the pedestrian crossing.",
    "به عابرانی که وارد گذرگاه عابر می‌شوند حق تقدم می‌دهم.",
    "Ved et fodgængerfelt uden lyssignal skal du om nødvendigt standse for at lade gående passere.",
    "At a pedestrian crossing without traffic lights you must stop if necessary to let pedestrians cross.",
    "در گذرگاه عابرِ بدون چراغ، در صورت لزوم باید بایستید تا عابران رد شوند."),
  S(True, "Ved hajtænderne har jeg ubetinget vigepligt for trafikken på den vej, jeg kører ind på.",
    "At the shark's teeth I have an unconditional duty to give way to the traffic on the road I am entering.",
    "کنار دندان‌کوسه‌ای‌ها باید بی‌قید و شرط به ترافیکِ جاده‌ای که واردش می‌شوم حق تقدم بدهم.",
    "Hajtænderne viser, at du har ubetinget vigepligt.", "The shark's teeth show that you must give way unconditionally.",
    "دندان‌کوسه‌ای نشان می‌دهد که حق تقدم بی‌قید و شرط با دیگران است."),
  S(False, "I en særlig svingbane har jeg forkørselsret, fordi der ikke er lyssignal her.",
    "In a separate turn lane I have right of way because there are no traffic lights here.",
    "در خط گردشِ جداگانه حق تقدم دارم، چون این‌جا چراغ راهنمایی نیست.",
    "At svingbanen ikke har signal, giver dig ingen forkørselsret; hajtænderne giver dig vigepligt.",
    "That the turn lane has no signal gives you no right of way; the shark's teeth make you give way.",
    "نبودنِ چراغ در خط گردش حق تقدمی به شما نمی‌دهد؛ دندان‌کوسه‌ای شما را موظف به رعایت حق تقدم می‌کند."),
  S(False, "Jeg ser kun til højre, fordi trafikken på vejen kommer derfra.", "I only look to the right because the traffic on the road comes from there.",
    "فقط به راست نگاه می‌کنم، چون ترافیکِ آن جاده از آن طرف می‌آید.",
    "Når du svinger til højre ind på en vej, kommer trafikken på den fra venstre.",
    "When you turn right into a road, its traffic comes from the left.",
    "وقتی به راست وارد جاده‌ای می‌شوید، ترافیک آن از سمت چپ می‌آید."),
)

Q(5767, "7.13", town("""
THE SCENE: a junction in town; we want to turn right across a cycle path that continues past the side road in a blue-painted strip; a
cyclist on the path has stopped just before the blue strip and waves us on with his hand; further back on the path two more cyclists
approach.
MUST BE CLEARLY VISIBLE: the waving cyclist, the two cyclists approaching behind him, the blue strip across the side road.
MUST NOT APPEAR: signs, text."""),
  "Du vil svinge til højre over cykelstien. En cyklist på stien er standset og vinker dig forbi. Længere tilbage på stien kommer flere "
  "cyklister. Hvordan forholder du dig?",
  "You want to turn right across the cycle path. A cyclist on the path has stopped and waves you on. Further back on the path more "
  "cyclists are coming. What do you do?",
  "می‌خواهید از روی مسیر دوچرخه به راست بپیچید. دوچرخه‌سواری روی مسیر ایستاده و با دست به شما اشاره می‌کند که بروید. عقب‌تر روی مسیر "
  "دوچرخه‌سواران دیگری می‌آیند. چه می‌کنید؟",
  S(True, "Jeg svinger kun, hvis jeg kan nå det uden at være til ulempe for de andre cyklister.",
    "I only turn if I can do it without inconveniencing the other cyclists.", "فقط وقتی می‌پیچم که برای دوچرخه‌سواران دیگر مزاحمتی نداشته باشد.",
    "Ved højresving må du ikke være til ulempe for cyklister, der kører ligeud.",
    "When turning right you must not inconvenience cyclists going straight on.",
    "هنگام گردش به راست نباید برای دوچرخه‌سوارانی که مستقیم می‌روند مزاحمت ایجاد کنید."),
  S(True, "Jeg ser grundigt efter, om der kommer cyklister forbi den, der vinker.",
    "I look carefully to see whether cyclists are coming past the one who is waving.",
    "به‌دقت نگاه می‌کنم که دوچرخه‌سوارانی از کنارِ کسی که اشاره می‌کند رد نشوند.",
    "Den, der vinker, kan kun give afkald på sin egen ret, ikke de andres.", "The one waving can only give up their own right, not the others'.",
    "کسی که اشاره می‌کند فقط می‌تواند از حق خودش بگذرد، نه حقِ دیگران."),
  S(False, "Når cyklisten vinker, må jeg svinge med det samme.", "When the cyclist waves, I may turn at once.",
    "وقتی دوچرخه‌سوار اشاره می‌کند، می‌توانم فوراً بپیچم.",
    "De andre cyklister har stadig ret til at køre ligeud.", "The other cyclists still have the right to go straight on.",
    "دوچرخه‌سواران دیگر همچنان حق دارند مستقیم بروند."),
  S(False, "Cyklisten har vinket, så det er hans ansvar, hvis der sker noget.", "The cyclist waved, so it is his responsibility if something happens.",
    "دوچرخه‌سوار اشاره کرده، پس اگر اتفاقی بیفتد مسئولیتش با اوست.",
    "Du har selv ansvaret for at sikre dig, at svinget kan ske uden fare.", "You are responsible yourself for making sure the turn can be made without danger.",
    "مسئولیتِ اطمینان از بی‌خطر بودن پیچیدن با خود شماست."),
)

Q(5768, "7.13", town("""
THE SCENE: a signal-controlled junction; we have green and want to turn right across a cycle path; beside the corner a yellow lamp with
a black bicycle symbol is flashing; a cyclist approaches on the path from behind us.
MUST BE CLEARLY VISIBLE: the flashing yellow lamp with the bicycle symbol, the cyclist on the path behind us, our green light.
MUST NOT APPEAR: signs, text."""),
  "Du har grønt og vil svinge til højre. Ved hjørnet blinker en gul lampe med et cykelsymbol. Hvad betyder det?",
  "You have green and want to turn right. At the corner a yellow lamp with a bicycle symbol is flashing. What does it mean?",
  "چراغ شما سبز است و می‌خواهید به راست بپیچید. کنار نبش، چراغی زرد با نماد دوچرخه چشمک می‌زند. معنایش چیست؟",
  S(True, "Jeg skal være særligt forsigtig, fordi der kan komme cyklister ligeud.", "I must take special care, because cyclists may be coming straight on.",
    "باید احتیاط ویژه کنم، چون ممکن است دوچرخه‌سوارانی مستقیم بیایند.",
    "Gult blinksignal angiver, at trafikanterne skal udvise særlig forsigtighed.", "A flashing yellow signal means that road users must take special care.",
    "چراغ زرد چشمک‌زن یعنی کاربران راه باید احتیاط ویژه کنند."),
  S(False, "Cyklisterne har rødt, når lampen blinker.", "The cyclists have red when the lamp is flashing.",
    "وقتی این چراغ چشمک می‌زند، چراغ دوچرخه‌سواران قرمز است.",
    "Lampen siger ikke noget om cyklisternes signal; den advarer dig.", "The lamp says nothing about the cyclists' signal; it warns you.",
    "این چراغ چیزی درباره‌ی چراغ دوچرخه‌سواران نمی‌گوید؛ به شما هشدار می‌دهد."),
  S(False, "Det gule blink betyder, at jeg skal standse helt, før jeg svinger.", "The yellow flash means that I must come to a full stop before I turn.",
    "چشمک زرد یعنی باید پیش از پیچیدن کاملاً بایستم.",
    "Gult blink betyder særlig forsigtighed, ikke pligt til at standse; du skal dog holde tilbage for cyklisterne.",
    "A yellow flash means special care, not a duty to stop; you must still give way to the cyclists.",
    "چشمک زرد یعنی احتیاط ویژه، نه الزام به ایستادن؛ با این حال باید به دوچرخه‌سواران حق تقدم بدهید."),
)

Q(5769, "7.11", view("""
THE SCENE: an unsigned junction in a residential area; in the side road on the RIGHT a car stands just before the junction, and its
driver waves us on through the side window; beside that car, partly hidden by it, a cyclist on the side road approaches the junction.
MUST BE CLEARLY VISIBLE: the waving driver in the car on the right, the cyclist partly hidden beside it.
MUST NOT APPEAR: signs, text, shark's teeth.""", scenery="Scenery is reduced to simple flat house fronts with hedges and a few trees."),
  "Du nærmer dig et kryds uden tavler. I sidevejen til højre holder en bil, og føreren vinker dig frem. Ved siden af bilen kommer en "
  "cyklist i samme retning. Hvad gælder?",
  "You are approaching a junction without signs. In the side road on the right a car is waiting, and its driver waves you on. Beside "
  "the car a cyclist is coming in the same direction. What applies?",
  "به تقاطعی بدون تابلو نزدیک می‌شوید. در راه فرعیِ سمت راست خودرویی ایستاده و راننده‌اش به شما اشاره می‌کند که بروید. کنار آن خودرو "
  "دوچرخه‌سواری در همان جهت می‌آید. چه قاعده‌ای برقرار است؟",
  S(False, "Når føreren vinker, gælder det også cyklisten ved siden af.", "When the driver waves, it also applies to the cyclist beside the car.",
    "وقتی راننده اشاره می‌کند، این برای دوچرخه‌سوارِ کنار او هم صدق می‌کند.",
    "Føreren kan kun give afkald på sin egen ret, og cyklisten kommer også fra højre.",
    "The driver can only give up their own right, and the cyclist is also coming from the right.",
    "راننده فقط می‌تواند از حق خودش بگذرد و دوچرخه‌سوار هم از سمت راست می‌آید."),
  S(True, "Jeg kører kun, hvis jeg er sikker på, at cyklisten har set mig og holder tilbage.",
    "I only go if I am sure that the cyclist has seen me and is holding back.",
    "فقط وقتی می‌روم که مطمئن باشم دوچرخه‌سوار مرا دیده و منتظر می‌ماند.",
    "Cyklisten kommer fra højre, så du har vigepligt over for ham.", "The cyclist comes from the right, so you must give way to him.",
    "دوچرخه‌سوار از راست می‌آید، پس شما باید به او حق تقدم بدهید."),
  S(False, "Jeg må køre med det samme, når føreren vinker.", "I may go at once when the driver waves.", "وقتی راننده اشاره می‌کند، می‌توانم فوراً بروم.",
    "Et vink giver dig ikke ret til at køre, før du selv har sikret dig, at det kan ske uden fare.",
    "A wave does not give you the right to go before you have made sure yourself that it can be done without danger.",
    "یک اشاره به شما حق نمی‌دهد پیش از آن‌که خودتان از بی‌خطر بودن مطمئن شوید، حرکت کنید."),
  S(False, "Bilen fra højre har mistet sin ret, fordi den holder stille.", "The car from the right has lost its right because it is standing still.",
    "خودروی سمت راست چون ایستاده، حقش را از دست داده است.",
    "Den bevarer sin ret, også når den holder stille; føreren kan vælge at lade dig køre.",
    "It keeps its right even when standing still; the driver can choose to let you go.",
    "حتی وقتی ایستاده، حقش را حفظ می‌کند؛ راننده می‌تواند انتخاب کند که بگذارد شما بروید."),
)

Q(5770, "7.11", view("""
THE SCENE: a country road; painted on our lane a large white triangle with its point towards us, and nearer to us, before the triangle,
the number «100» painted in white; further ahead a junction with a bigger road can be seen; no signs yet.
MUST BE CLEARLY VISIBLE: the white triangle on the carriageway, the number 100 before it, the junction further ahead.
MUST NOT APPEAR: signs, any other text."""),
  "På kørebanen er der malet en stor hvid trekant med spidsen mod dig, og foran den står tallet 100. Hvad betyder det?",
  "A large white triangle is painted on the carriageway with its point towards you, and before it is the number 100. What does it mean?",
  "روی سواره‌رو مثلثی سفید و بزرگ کشیده شده که نوکش به طرف شماست و جلوی آن عدد ۱۰۰ نوشته شده است. معنایش چیست؟",
  S(True, "Om ca. 100 m kommer et kryds, hvor jeg har ubetinget vigepligt.", "In about 100 m there is a junction where I must give way unconditionally.",
    "حدود ۱۰۰ متر جلوتر تقاطعی هست که در آن حق تقدم بی‌قید و شرط با دیگران است.",
    "Trekantsymbolet varsler ubetinget vigepligt i et følgende kryds, og tallet viser afstanden.",
    "The triangle symbol warns of an unconditional duty to give way at a following junction, and the number shows the distance.",
    "نماد مثلث از حق تقدمِ مطلق در تقاطعِ بعدی خبر می‌دهد و عدد، فاصله را نشان می‌دهد."),
  S(False, "Jeg har ubetinget vigepligt allerede her ved trekanten.", "I have an unconditional duty to give way already here at the triangle.",
    "از همین‌جا، کنار مثلث، حق تقدم با دیگران است.",
    "Trekanten er en forvarsel; vigepligten gælder ved krydset.", "The triangle is an advance warning; the duty applies at the junction.",
    "مثلث هشدار پیشاپیش است؛ رعایت حق تقدم مربوط به خودِ تقاطع است."),
  S(False, "Trekanten viser, at jeg kører på en hovedvej.", "The triangle shows that I am driving on a main road.",
    "این مثلث نشان می‌دهد که در راه اصلی هستم.",
    "Den varsler tværtimod, at du skal holde tilbage.", "On the contrary, it warns that you must give way.",
    "برعکس، هشدار می‌دهد که باید حق تقدم را رعایت کنید."),
)

Q(5771, "7.11", view("""
THE SCENE: an unsigned junction in the countryside; a hedge on the left partly hides the side road; a car approaches the junction from
the LEFT quite fast; we approach from the bottom going straight on; no signs or shark's teeth.
MUST BE CLEARLY VISIBLE: the car coming fast from the left, the hedge, the junction.
MUST NOT APPEAR: signs, text."""),
  "Du nærmer dig et kryds uden tavler. Fra venstre kommer en bil ret hurtigt mod krydset. Den skal holde tilbage for dig. Hvordan "
  "forholder du dig?",
  "You are approaching a junction without signs. From the left a car is coming rather fast towards the junction. It must give way to "
  "you. What do you do?",
  "به تقاطعی بدون تابلو نزدیک می‌شوید. خودرویی نسبتاً تند از سمت چپ به تقاطع می‌آید. او باید به شما حق تقدم بدهد. چه می‌کنید؟",
  S(True, "Jeg holder øje med, om føreren sætter farten ned.", "I watch whether the driver slows down.", "مراقبم که آیا راننده سرعتش را کم می‌کند.",
    "Den, der har vigepligt, skal vise det tydeligt og i god tid; gør føreren ikke det, skal du være klar.",
    "Whoever must give way has to show it clearly and in good time; if the driver does not, you must be ready.",
    "کسی که باید حق تقدم بدهد، باید آن را به‌روشنی و به‌موقع نشان دهد؛ اگر راننده این کار را نکند، باید آماده باشید."),
  S(True, "Jeg er klar til at bremse, hvis bilen ikke holder tilbage.", "I am ready to brake if the car does not give way.",
    "اگر آن خودرو حق تقدم را رعایت نکند، آماده‌ی ترمزم.",
    "Det hjælper ikke at have ret, hvis der sker et sammenstød.", "Being in the right does not help if there is a collision.",
    "حق با شما بودن، اگر تصادف کنید، کمکی نمی‌کند."),
  S(True, "Jeg kører ind mod krydset med en passende lav hastighed.", "I approach the junction at a suitably low speed.",
    "با سرعتی به اندازه‌ی کافی کم به تقاطع نزدیک می‌شوم.",
    "Ved vejkryds skal hastigheden være passende lav, og du skal være særligt forsigtig.",
    "At junctions your speed must be suitably low, and you must take special care.",
    "در تقاطع‌ها سرعت باید به اندازه‌ی کافی کم باشد و باید احتیاط ویژه کنید."),
  S(False, "Jeg sætter farten op, så jeg er igennem krydset før den anden bil.", "I speed up so that I am through the junction before the other car.",
    "سرعتم را زیاد می‌کنم تا پیش از خودروی دیگر از تقاطع رد شوم.",
    "Så får du mindre tid til at reagere, hvis den ikke holder tilbage.", "Then you have less time to react if it does not give way.",
    "در این صورت اگر حق تقدم را رعایت نکند، فرصت کمتری برای واکنش دارید."),
)

Q(5772, "7.7", view("""
THE SCENE: a country road with road works; one lane is closed with orange cones for a stretch; at the start of the narrow stretch a road
worker in an orange high-visibility suit holds up a round sign on a pole showing a red «STOP» towards us; no oncoming traffic can be
seen at the moment.
MUST BE CLEARLY VISIBLE: the road worker holding up the STOP sign, the closed lane with cones.
MUST NOT APPEAR: other signs, any other text."""),
  "Ved et vejarbejde kan trafikken kun køre i én vognbane ad gangen. En vejarbejder holder et skilt med STOP op mod dig. Du kan ikke se "
  "nogen modkørende. Hvad gør du?",
  "At road works the traffic can only use one lane at a time. A road worker holds up a sign with STOP towards you. You cannot see any "
  "oncoming traffic. What do you do?",
  "کنار یک محل کار جاده‌ای، ترافیک هر بار فقط از یک خط می‌تواند عبور کند. کارگری تابلویی با نوشته‌ی STOP رو به شما بالا گرفته است. "
  "خودرویی از روبه‌رو نمی‌بینید. چه می‌کنید؟",
  S(True, "Jeg standser og venter, til vejarbejderen giver tegn til at køre.", "I stop and wait until the road worker signals me to go.",
    "می‌ایستم و صبر می‌کنم تا کارگر علامت حرکت بدهد.",
    "Ved vejarbejde må den myndighed, der står for arbejdet, regulere færdslen, og anvisningerne skal følges.",
    "At road works the authority in charge of the work may regulate the traffic, and its directions must be followed.",
    "در کار جاده‌ای، نهادی که کار را انجام می‌دهد می‌تواند ترافیک را تنظیم کند و باید از دستوراتش پیروی کرد."),
  S(False, "Jeg kører forsigtigt forbi, fordi der ikke kommer nogen.", "I drive carefully past because nobody is coming.",
    "با احتیاط رد می‌شوم، چون کسی نمی‌آید.",
    "Der kan komme modkørende eller arbejdskøretøjer, som du ikke kan se.", "Oncoming traffic or work vehicles that you cannot see may be coming.",
    "ممکن است خودروهای روبه‌رو یا وسیله‌های کار بیایند که شما آن‌ها را نمی‌بینید."),
  S(True, "Jeg holder god afstand til vejarbejderen og det afspærrede område.", "I keep a good distance from the road worker and the closed-off area.",
    "از کارگر و محدوده‌ی بسته‌شده فاصله‌ی کافی نگه می‌دارم.",
    "Folk og maskiner kan pludselig bevæge sig ud på vejen.", "People and machines may suddenly move out onto the road.",
    "آدم‌ها و ماشین‌آلات ممکن است ناگهان وارد جاده شوند."),
  S(False, "Vejarbejderens skilt er kun en anbefaling.", "The road worker's sign is only a recommendation.", "تابلوی کارگر فقط یک توصیه است.",
    "Anvisninger ved vejarbejde skal efterkommes.", "Directions given at road works must be obeyed.", "دستورهایی که در محل کار جاده‌ای داده می‌شود باید رعایت شود."),
)

Q(5773, "7.7", view("""
THE SCENE: a road narrowing to a single lane over a short bridge; at the right a blue square sign with a white arrow pointing up and a
smaller red arrow pointing down; an oncoming car has already driven onto the narrow stretch and is coming towards us.
MUST BE CLEARLY VISIBLE: the blue priority sign, the narrow stretch, the oncoming car already on it.
MUST NOT APPEAR: other signs, text."""),
  "Før en smal strækning står denne tavle, som giver dig forkørselsret. En modkørende bil er dog allerede kørt ind på strækningen. Hvad "
  "gør du?",
  "Before a narrow stretch stands this sign, which gives you priority. However, an oncoming car has already driven onto the stretch. What "
  "do you do?",
  "پیش از بخشی باریک از جاده این تابلو هست که حق تقدم را به شما می‌دهد. با این حال خودرویی از روبه‌رو همین حالا وارد آن بخش شده است. "
  "چه می‌کنید؟",
  S(True, "Jeg standser før strækningen og lader bilen komme igennem.", "I stop before the stretch and let the car come through.",
    "پیش از آن بخش می‌ایستم و می‌گذارم آن خودرو رد شود.",
    "Du må ikke fremtvinge din ret; et sammenstød skal undgås.", "You must not force your right; a collision must be avoided.",
    "نباید حقتان را به زور بگیرید؛ باید از تصادف پرهیز کرد."),
  S(False, "Jeg kører ind, fordi den modkørende skal holde tilbage for mig.", "I drive in because the oncoming car must give way to me.",
    "وارد می‌شوم، چون خودروی روبه‌رو باید به من حق تقدم بدهد.",
    "Den modkørende burde have holdt tilbage, men nu er den der, og I kan ikke passere hinanden.",
    "The oncoming car should have waited, but now it is there, and you cannot pass each other.",
    "خودروی روبه‌رو باید صبر می‌کرد، ولی حالا آن‌جاست و نمی‌توانید از کنار هم رد شوید."),
  S(True, "Tavlen betyder, at de modkørende normalt skal holde tilbage for mig.", "The sign means that oncoming traffic must normally give way to me.",
    "این تابلو یعنی معمولاً خودروهای روبه‌رو باید به من حق تقدم بدهند.",
    "Tavlen viser, at modkørende færdsel skal holde tilbage.", "The sign shows that oncoming traffic must give way.",
    "این تابلو نشان می‌دهد که ترافیک روبه‌رو باید حق تقدم را رعایت کند."),
  S(False, "Jeg blinker med forlygterne, så føreren bakker tilbage.", "I flash my headlights so that the driver reverses back.",
    "چراغ‌های جلو را چشمک می‌زنم تا راننده دنده‌عقب برگردد.",
    "Et lyssignal giver dig ingen ret, og det er farligere at bakke end at vente.",
    "A light signal gives you no right, and reversing is more dangerous than waiting.",
    "علامت نوری حقی به شما نمی‌دهد و دنده‌عقب رفتن از صبر کردن خطرناک‌تر است."),
)

Q(5774, "7.7", view("""
THE SCENE: a narrow country road without pavement; on the oncoming side a pedestrian walks at the edge with a dog on a lead; an
oncoming car approaches and is about to swing out around the pedestrian towards the middle of the road.
MUST BE CLEARLY VISIBLE: the pedestrian with the dog on the oncoming side, the oncoming car swinging out.
MUST NOT APPEAR: signs, text."""),
  "Vejen er smal. I den modsatte vejside går en fodgænger med en hund, og en modkørende bil skal forbi fodgængeren, samtidig med at den "
  "møder dig. Hvordan forholder du dig?",
  "The road is narrow. On the opposite side a pedestrian is walking with a dog, and an oncoming car has to get past the pedestrian at the "
  "same time as it meets you. What do you do?",
  "جاده باریک است. در سمت مقابل عابری با سگی راه می‌رود و خودرویی از روبه‌رو باید هم‌زمان با رسیدن به شما از کنار آن عابر رد شود. چه "
  "می‌کنید؟",
  S(True, "Jeg sætter farten ned og holder godt til højre.", "I slow down and keep well to the right.", "سرعتم را کم می‌کنم و کاملاً سمت راست می‌روم.",
    "Ved møde skal I holde til højre og have tilstrækkelig afstand til siden.", "When meeting you must keep to the right and have enough distance to the side.",
    "هنگام روبه‌رو شدن باید سمت راست بروید و فاصله‌ی جانبی کافی داشته باشید."),
  S(True, "Jeg er klar til at standse, så bilen kan komme forbi fodgængeren med god afstand.",
    "I am ready to stop so that the car can get past the pedestrian with a good distance.",
    "آماده‌ام بایستم تا آن خودرو بتواند با فاصله‌ی کافی از کنار عابر بگذرد.",
    "Det er bedre, at I passerer fodgængeren én ad gangen.", "It is better for you to pass the pedestrian one at a time.",
    "بهتر است یکی‌یکی از کنار عابر بگذرید."),
  S(False, "Jeg holder farten, fordi det er den modkørende, der skal vente.", "I keep my speed because it is the oncoming car that must wait.",
    "سرعتم را حفظ می‌کنم، چون این خودروی روبه‌روست که باید صبر کند.",
    "Selv om den modkørende burde vente, skal du gøre, hvad du kan, for at undgå fare.",
    "Even if the oncoming car ought to wait, you must do what you can to avoid danger.",
    "حتی اگر خودروی روبه‌رو باید صبر کند، شما باید هر کاری می‌توانید برای پرهیز از خطر بکنید."),
  S(False, "Jeg dytter, så fodgængeren går helt ud i grøften.", "I sound the horn so that the pedestrian moves right into the ditch.",
    "بوق می‌زنم تا عابر کاملاً به داخل جوی کنار جاده برود.",
    "Lydsignal bruges kun for at afværge fare, og fodgængeren har ret til at gå i vejkanten.",
    "The horn is only used to avert danger, and the pedestrian has the right to walk at the edge of the road.",
    "بوق فقط برای دفع خطر است و عابر حق دارد کنار جاده راه برود."),
)

Q(5775, "1.2", picture("""
A car's instrument cluster seen close up; an amber warning lamp in the shape of an engine outline is lit; all other warning lamps are
off; the speedometer shows normal driving speed.
MUST BE CLEARLY VISIBLE: the lit amber engine-outline lamp.
MUST NOT APPEAR: text, logos, other lit warning lamps."""),
  "Under kørslen begynder denne gule lampe med et motorsymbol at lyse konstant. Bilen kører normalt. Hvad gælder som regel?",
  "While you are driving, this yellow lamp with an engine symbol comes on and stays lit. The car is running normally. What usually applies?",
  "در حین رانندگی این چراغ زرد با نماد موتور روشن می‌شود و ثابت روشن می‌ماند. خودرو عادی کار می‌کند. معمولاً چه قاعده‌ای برقرار است؟",
  S(True, "Der er en fejl i motorens styring eller udstødning, som skal undersøges snarest.",
    "There is a fault in the engine management or the exhaust system that must be checked soon.",
    "در سیستم کنترل موتور یا اگزوز ایرادی هست که باید هرچه زودتر بررسی شود.",
    "Lampen viser en fejl, der kan påvirke motoren og bilens udstødning; lyser den konstant, kan du som regel køre forsigtigt til et værksted.",
    "The lamp shows a fault that can affect the engine and the exhaust; if it stays lit, you can usually drive carefully to a workshop.",
    "این چراغ ایرادی را نشان می‌دهد که می‌تواند روی موتور و اگزوز اثر بگذارد؛ اگر ثابت روشن باشد، معمولاً می‌توانید با احتیاط تا تعمیرگاه برانید."),
  S(False, "Jeg skal standse med det samme og tilkalde vejhjælp.", "I must stop at once and call for roadside assistance.",
    "باید فوراً بایستم و امداد جاده‌ای خبر کنم.",
    "En gul lampe, der lyser konstant, mens bilen kører normalt, betyder som regel, at noget skal efterses snart.",
    "A yellow lamp that stays lit while the car runs normally usually means that something must be checked soon.",
    "چراغ زردی که ثابت روشن است و خودرو عادی کار می‌کند، معمولاً یعنی چیزی باید به‌زودی بررسی شود."),
  S(False, "Lampen viser, at motorolien er for varm, og at jeg straks skal slukke motoren.",
    "The lamp shows that the engine oil is too hot and that I must switch off the engine at once.",
    "این چراغ نشان می‌دهد روغن موتور خیلی داغ است و باید فوراً موتور را خاموش کنم.",
    "Alvorlige fejl som for lavt olietryk vises med røde lamper.", "Serious faults such as too low oil pressure are shown by red lamps.",
    "ایرادهای جدی مثل فشار کم روغن با چراغ‌های قرمز نشان داده می‌شوند."),
  S(False, "Jeg kan se bort fra lampen, så længe bilen kører normalt.", "I can ignore the lamp as long as the car runs normally.",
    "تا وقتی خودرو عادی کار می‌کند، می‌توانم به این چراغ توجه نکنم.",
    "Føreren skal være opmærksom på forhold ved motoren og det udstyr, der begrænser forureningen.",
    "The driver must keep an eye on the engine and the equipment that limits pollution.",
    "راننده باید به وضعیت موتور و تجهیزاتی که آلودگی را کم می‌کنند توجه داشته باشد."),
)
