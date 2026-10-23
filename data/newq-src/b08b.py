# «آزمون جدید», batch 8 (5701–5800), part b: stopping and parking (7.18), overtaking (7.9), signs (6.1), people and animals
# beside the road (7.6), speed (7.3), the car (1.2), driving beside others (7.17) and other road users (4.5).
# Rules: Færdselsloven §§ 3 stk. 2 (special care for people with poor sight), 10 stk. 5 (pedestrians use a footbridge or tunnel
# nearby if possible), 11 (someone pushing a bicycle is a pedestrian), 14 stk. 1, 21 stk. 1, 3 nr. 1 (no other obstacle in the
# overtaking lane) and nr. 4, 21 stk. 4, 22 stk. 1, 23 stk. 1 nr. 1 and nr. 2 (no overtaking just before or on a level crossing,
# with no exception for several lanes), 27 stk. 1, 7 and 8 (avoid stopping on the pedestrian crossing), 28 stk. 2 (stop at the
# outer edge of the carriageway) and stk. 3 (not on the pavement), 29 stk. 1 nr. 8 (the 3 m rule does not apply when a broken
# line lies between the vehicle and the unbroken line), 32 stk. 1 and 4 (an arm raised: stopping or slowing sharply), 41 stk. 1
# (be able to stop within the distance you can see), 42, 67 stk. 3; Bekendtgørelse om vejafmærkning (BEK 425/2023): § 9 U 2
# (distances from the sign to the start and end of the stretch) and U 4, Q 41–44 (with a double line follow the nearest line),
# Q 46 (an edge line may be crossed to pass a left-turner only when the lane beyond is not a special lane), A 46,2 (the number is
# the steepest gradient), C 55 (not ended by a junction), C 62, E 26, E 68 and E 69, E 68,9 (environmental zone: special
# requirements for lorries, buses, cars and vans until the end sign), V 20 (e-scooter box only for e-scooters), V 42 (bus lane).
from nq import Q, S, above, picture, town, view

Q(5726, "7.18", town("""
THE SCENE: a town street; along the right kerb, between parked cars, a rectangular box is painted on the carriageway with white lines
and a large white symbol of an electric kick scooter inside it; two e-scooters stand in one end of the box; the rest of the box is
empty and would be big enough for a small car.
MUST BE CLEARLY VISIBLE: the painted box with the e-scooter symbol, the two e-scooters in it, the free part of the box.
MUST NOT APPEAR: signs, text."""),
  "Langs kantstenen er der malet et felt med et symbol for elektrisk løbehjul. Der er god plads i feltet. Du vil standse et øjeblik og "
  "sætte en passager af. Hvad gælder?",
  "Along the kerb a box with a symbol for electric kick scooters is painted. There is plenty of room in the box. You want to stop for a "
  "moment and let a passenger out. What applies?",
  "کنار جدول، محدوده‌ای با نماد اسکوتر برقی رنگ شده و جای زیادی در آن خالی است. می‌خواهید لحظه‌ای بایستید و مسافری را پیاده کنید. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Feltet må kun bruges til at stille elektriske løbehjul.", "The box may only be used for leaving electric kick scooters.",
    "این محدوده فقط برای گذاشتن اسکوترهای برقی است.",
    "En afmærket løbehjulsboks er til hensætning af motoriserede løbehjul og må kun benyttes af dem.",
    "A marked e-scooter box is for leaving motorised kick scooters and may only be used by them.",
    "محدوده‌ی خط‌کشی‌شده‌ی اسکوتر برای گذاشتن اسکوترهای موتوری است و فقط آن‌ها می‌توانند از آن استفاده کنند."),
  S(False, "Jeg må godt standse i feltet, når jeg bliver siddende i bilen.", "I may stop in the box as long as I stay in the car.",
    "اگر در خودرو بمانم، می‌توانم در این محدوده بایستم.",
    "Feltet er forbeholdt løbehjul, uanset om føreren bliver i bilen.", "The box is reserved for kick scooters, whether or not the driver stays in the car.",
    "این محدوده مخصوص اسکوتر است، چه راننده در خودرو بماند چه نماند."),
  S(False, "Feltet er en almindelig parkeringsbås, hvor der også må holde biler.",
    "The box is an ordinary parking bay where cars may stand too.", "این محدوده جای پارک معمولی است که خودرو هم می‌تواند در آن بایستد.",
    "Symbolet viser, at feltet kun er til løbehjul.", "The symbol shows that the box is only for kick scooters.",
    "نماد نشان می‌دهد که این محدوده فقط برای اسکوتر است."),
)

Q(5727, "7.18", town("""
THE SCENE: a town street with two lanes in our direction; the right lane, next to the kerb, has the word BUS painted on it and is
separated from our lane by an unbroken white line; a shop on the right; our car drives in the left lane; no bus in sight.
MUST BE CLEARLY VISIBLE: the bus lane with the word BUS, the unbroken white line between the lanes, the shop at the kerb.
MUST NOT APPEAR: other text, signs."""),
  "Langs kantstenen er der en vognbane med »BUS«, adskilt fra din vognbane med en ubrudt linje. Du vil sætte en passager af ved en "
  "butik. Hvad gælder?",
  "Along the kerb there is a lane marked «BUS», separated from your lane by an unbroken line. You want to let a passenger out at a "
  "shop. What applies?",
  "کنار جدول خطی با نوشته‌ی «BUS» هست که با خطی پیوسته از خط شما جدا شده است. می‌خواهید مسافری را جلوی مغازه‌ای پیاده کنید. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre ind i busbanen for at standse.", "I must not drive into the bus lane to stop.",
    "نباید برای توقف وارد خط اتوبوس شوم.",
    "En vognbane med »BUS« må kun benyttes af busser i rutekørsel og af dem, som symboler i banen ellers giver lov.",
    "A lane marked «BUS» may only be used by scheduled buses and by those that symbols in the lane otherwise allow.",
    "خطی که «BUS» دارد فقط برای اتوبوس‌های خطی و وسیله‌هایی است که نمادهای داخل آن اجازه می‌دهند."),
  S(True, "Jeg kører videre og finder et sted, hvor jeg lovligt kan standse.", "I drive on and find a place where I may legally stop.",
    "ادامه می‌دهم و جایی پیدا می‌کنم که توقف در آن مجاز باشد.",
    "Du må kun standse, hvor det er tilladt og ikke er til fare eller ulempe.", "You may only stop where it is allowed and causes no danger or inconvenience.",
    "فقط جایی می‌توانید بایستید که مجاز باشد و خطر یا مزاحمتی نداشته باشد."),
  S(False, "Jeg må standse i busbanen, når der ikke kommer en bus lige nu.", "I may stop in the bus lane when no bus is coming right now.",
    "وقتی همین حالا اتوبوسی نمی‌آید، می‌توانم در خط اتوبوس بایستم.",
    "Busbanen er forbeholdt busserne hele tiden, når der ikke er skiltet andet.", "The bus lane is reserved for buses all the time unless signs say otherwise.",
    "خط اتوبوس همیشه مخصوص اتوبوس‌هاست، مگر تابلویی چیز دیگری بگوید."),
  S(False, "Jeg må standse i min egen vognbane, mens passageren stiger ud og går over busbanen.",
    "I may stop in my own lane while the passenger gets out and walks across the bus lane.",
    "می‌توانم در خط خودم بایستم تا مسافر پیاده شود و از خط اتوبوس رد شود.",
    "Ved standsning skal bilen holde ved kørebanens yderkant, ikke midt på kørebanen.",
    "When stopping, the car must stand at the outer edge of the carriageway, not in the middle of it.",
    "هنگام توقف، خودرو باید لبه‌ی بیرونی سواره‌رو بایستد، نه وسط آن."),
)

Q(5728, "7.18", town("""
THE SCENE: a town street; at the right kerb stands a round no-parking sign (blue centre, red border, one red diagonal bar) and under
it a white rectangular plate with a black lorry symbol; a free space at the kerb just after the sign; no other signs.
MUST BE CLEARLY VISIBLE: the no-parking sign, the plate with the lorry symbol, the free space after them.
MUST NOT APPEAR: other signs, text."""),
  "Ved kantstenen står denne tavle med undertavle. Du kører i personbil og vil parkere lige efter tavlen. Hvad gælder?",
  "This sign with a plate stands at the kerb. You are driving a car and want to park just after the sign. What applies?",
  "کنار جدول این تابلو با زیرتابلو قرار دارد. با خودروی سواری هستید و می‌خواهید درست بعد از تابلو پارک کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må parkere her, hvis det ellers er tilladt, fordi forbuddet kun gælder lastbiler.",
    "I may park here if it is otherwise allowed, because the ban only applies to lorries.",
    "اگر از نظر قوانین دیگر مجاز باشد، می‌توانم این‌جا پارک کنم، چون این ممنوعیت فقط برای کامیون‌هاست.",
    "Et symbol på undertavlen kan begrænse tavlens angivelse til den viste færdselsart, her lastbiler.",
    "A symbol on the plate can limit the sign to the kind of traffic shown, here lorries.",
    "نماد روی زیرتابلو می‌تواند حکم تابلو را به همان نوع وسیله، این‌جا کامیون، محدود کند."),
  S(False, "Undertavlen betyder, at kun lastbiler må parkere her.", "The plate means that only lorries may park here.",
    "زیرتابلو یعنی فقط کامیون‌ها می‌توانند این‌جا پارک کنند.",
    "Undertavlen viser, hvem forbuddet gælder for, ikke hvem der må parkere.", "The plate shows whom the ban applies to, not who may park.",
    "زیرتابلو نشان می‌دهد ممنوعیت برای چه کسانی است، نه این‌که چه کسانی می‌توانند پارک کنند."),
  S(False, "Forbuddet gælder alle køretøjer, fordi undertavlen kun er til oplysning.",
    "The ban applies to all vehicles, because the plate is only for information.",
    "ممنوعیت برای همه‌ی وسیله‌هاست، چون زیرتابلو فقط اطلاع‌رسانی است.",
    "Undertavlen indskrænker forbuddet til lastbiler.", "The plate narrows the ban down to lorries.",
    "زیرتابلو ممنوعیت را به کامیون‌ها محدود می‌کند."),
  S(False, "Jeg må kun holde her et øjeblik for at sætte en passager af.", "I may only stop here for a moment to let a passenger out.",
    "این‌جا فقط لحظه‌ای برای پیاده کردن مسافر می‌توانم بایستم.",
    "Parkeringsforbuddet gælder ikke din personbil, så du må også parkere, hvis ingen anden regel forbyder det.",
    "The parking ban does not apply to your car, so you may also park if no other rule forbids it.",
    "ممنوعیت پارک شامل خودروی سواری شما نمی‌شود، پس اگر قاعده‌ی دیگری منع نکند، پارک هم می‌توانید بکنید."),
)

Q(5729, "7.18", above("""
THE SCENE: a residential street in town seen from above, with a pavement running along the houses; a short driveway leads from a
garage across the pavement to the street.
VEHICLES (colour code used strictly): a RED car (ours) parked in the driveway so short that its rear end stands on the pavement and
blocks it.
PEOPLE: a pedestrian with a pram approaches along the pavement.
MUST NOT APPEAR: signs, text."""),
  "Du bor i et hus i byen og parkerer i din egen indkørsel. Indkørslen er kort, så bilens bagende kommer til at stå ude på fortovet. "
  "Hvad gælder?",
  "You live in a house in town and park in your own driveway. The driveway is short, so the rear of the car ends up standing on the "
  "pavement. What applies?",
  "در خانه‌ای در شهر زندگی می‌کنید و در ورودیِ ملک خودتان پارک می‌کنید. ورودی کوتاه است و قسمت عقب خودرو روی پیاده‌رو می‌ماند. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Det er ikke tilladt, fordi en del af bilen holder på fortovet.", "It is not allowed, because part of the car stands on the pavement.",
    "مجاز نیست، چون بخشی از خودرو روی پیاده‌رو است.",
    "Standsning og parkering må ikke ske på fortov, og i tættere bebygget område gælder det også en del af bilen.",
    "Stopping and parking must not take place on the pavement, and in a built-up area that also goes for part of the car.",
    "توقف و پارک روی پیاده‌رو ممنوع است و در منطقه‌ی شهری این شامل بخشی از خودرو هم می‌شود."),
  S(False, "Det er tilladt, fordi det er min egen indkørsel.", "It is allowed because it is my own driveway.",
    "مجاز است، چون ورودیِ ملک خودم است.",
    "Fortovet foran indkørslen er stadig fortov, selv om indkørslen er din.", "The pavement across the driveway is still pavement, even if the driveway is yours.",
    "پیاده‌روی جلوی ورودی، حتی اگر ورودی مال شما باشد، باز هم پیاده‌رو است."),
  S(True, "Jeg skal parkere, så de gående kan komme uhindret forbi.", "I must park so that pedestrians can get past unhindered.",
    "باید طوری پارک کنم که عابران بی‌مانع رد شوند.",
    "Fortovet er til de gående, og de må ikke tvinges ud på kørebanen.", "The pavement is for pedestrians, and they must not be forced out onto the carriageway.",
    "پیاده‌رو مال عابران است و نباید مجبور شوند به سواره‌رو بروند."),
  S(False, "Det er tilladt, så længe der er 1 m fri plads på fortovet.", "It is allowed as long as 1 m of the pavement is left free.",
    "تا وقتی یک متر از پیاده‌رو آزاد بماند، مجاز است.",
    "Der er ingen sådan regel; bilen må ikke holde på fortovet.", "There is no such rule; the car must not stand on the pavement.",
    "چنین قاعده‌ای وجود ندارد؛ خودرو نباید روی پیاده‌رو باشد."),
)

Q(5730, "7.18", above("""
THE SCENE: a narrow two-lane road seen from above, running up the picture; in the middle a double line: on our side a broken line,
on the oncoming side an unbroken line next to it.
VEHICLES (colour code used strictly): a RED car (ours) stopped at the right edge so that only about 2 m are left between it and the
double line; a grey car behind us passes us by crossing the broken line; no oncoming traffic.
MUST NOT APPEAR: signs, text."""),
  "Du vil standse ved kanten af en smal vej. Midt på vejen er der en dobbelt linje: nærmest dig er den punkteret, og på den anden side "
  "er den ubrudt. Der vil kun være 2 m mellem bilen og linjerne. Hvad gælder?",
  "You want to stop at the edge of a narrow road. In the middle of the road there is a double line: nearest you it is broken, and on "
  "the other side it is unbroken. There will only be 2 m between the car and the lines. What applies?",
  "می‌خواهید لبه‌ی جاده‌ای باریک بایستید. وسط جاده خطی دوتایی هست: سمت شما بریده‌بریده و سمت مقابل پیوسته. بین خودرو و این خط‌ها فقط "
  "۲ متر فاصله خواهد ماند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må standse her, hvis det ikke er til fare eller ulempe.", "I may stop here if it causes no danger or inconvenience.",
    "اگر خطر یا مزاحمتی نداشته باشد، می‌توانم این‌جا بایستم.",
    "Forbuddet mod at standse under 3 m fra en spærrelinje gælder ikke, når der er en punkteret linje mellem bilen og spærrelinjen.",
    "The ban on stopping less than 3 m from an unbroken line does not apply when a broken line lies between the car and the unbroken line.",
    "ممنوعیتِ توقف در کمتر از ۳ متری خط ممتد، وقتی بین خودرو و خط ممتد یک خط بریده‌بریده باشد، اعمال نمی‌شود."),
  S(False, "Jeg må ikke standse, fordi der er under 3 m til den ubrudte linje.", "I must not stop because it is less than 3 m to the unbroken line.",
    "نباید بایستم، چون تا خط پیوسته کمتر از ۳ متر فاصله است.",
    "Den punkterede linje på din side gør, at forbuddet ikke gælder her.", "The broken line on your side means that the ban does not apply here.",
    "خط بریده‌بریده‌ی سمت شما باعث می‌شود این ممنوعیت این‌جا اعمال نشود."),
  S(True, "Biler bag mig må køre forbi ved at krydse den punkterede linje, når det kan ske uden fare.",
    "Cars behind me may get past by crossing the broken line when it can be done without danger.",
    "خودروهای پشت سرم می‌توانند با عبور از خط بریده‌بریده، اگر بی‌خطر باشد، رد شوند.",
    "Ved dobbeltlinjer retter de kørende sig efter den linje, der er nærmest dem.", "With double lines, drivers follow the line nearest to them.",
    "در خط‌های دوتایی، هر راننده از خطی پیروی می‌کند که به او نزدیک‌تر است."),
  S(False, "Var linjen nærmest mig også ubrudt, måtte jeg stadig gerne standse her.",
    "If the line nearest me were unbroken too, I could still stop here.", "اگر خطِ نزدیک به من هم پیوسته بود، باز هم می‌توانستم این‌جا بایستم.",
    "Så ville der være under 3 m til en spærrelinje uden punkteret linje imellem, og så er standsning forbudt.",
    "Then there would be less than 3 m to an unbroken line with no broken line in between, and then stopping is forbidden.",
    "در آن صورت کمتر از ۳ متر تا خطی ممتد بدون خط بریده‌بریده‌ای در میان فاصله بود و توقف ممنوع می‌شد."),
)

Q(5731, "7.9", view("""
THE SCENE: a long straight country road; ahead of us a group of six motorcycles rides in a staggered formation with short gaps between
them; no oncoming traffic as far as can be seen.
MUST BE CLEARLY VISIBLE: the six motorcycles with the short gaps between them, the long empty road ahead.
MUST NOT APPEAR: signs, text."""),
  "Foran dig kører en gruppe på seks motorcykler med korte afstande imellem. Vejen er lang og lige, og der kommer ingen imod dig. Du "
  "vil overhale. Hvad gælder?",
  "A group of six motorcycles rides in front of you with short gaps between them. The road is long and straight, and nobody is coming "
  "towards you. You want to overtake. What applies?",
  "جلوی شما گروهی شش‌تایی از موتورسیکلت‌ها با فاصله‌های کم از هم حرکت می‌کنند. جاده طولانی و مستقیم است و کسی از روبه‌رو نمی‌آید. "
  "می‌خواهید سبقت بگیرید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal kunne komme forbi hele gruppen, eller der skal være plads nok til at komme sikkert ind mellem motorcyklerne.",
    "I must be able to get past the whole group, or there must be enough room to get safely in between the motorcycles.",
    "باید بتوانم از کل گروه بگذرم، یا بین موتورسیکلت‌ها آن‌قدر جا باشد که بی‌خطر برگردم.",
    "Efter overhalingen skal du utvivlsomt kunne komme ind i trafikstrømmen igen uden at være til ulempe for den.",
    "After overtaking you must without doubt be able to get back into the flow of traffic without inconveniencing it.",
    "بعد از سبقت باید بی‌تردید بتوانید بدون مزاحمت دوباره وارد جریان ترافیک شوید."),
  S(False, "Jeg kan altid køre ind i et af de små huller, hvis der kommer en modkørende.",
    "I can always pull into one of the small gaps if an oncoming vehicle appears.",
    "اگر خودرویی از روبه‌رو پیدا شد، همیشه می‌توانم وارد یکی از فاصله‌های کوچک شوم.",
    "De korte afstande mellem motorcyklerne er ikke beregnet til en bil, og du kan tvinge dem til at bremse.",
    "The short gaps between the motorcycles are not meant for a car, and you may force them to brake.",
    "فاصله‌های کوتاه بین موتورسیکلت‌ها برای یک خودرو نیست و ممکن است مجبورشان کنید ترمز کنند."),
  S(True, "Jeg holder god afstand til siden, mens jeg kører forbi motorcyklerne.",
    "I keep a good distance to the side while I pass the motorcycles.", "هنگام رد شدن از موتورسیکلت‌ها فاصله‌ی جانبی کافی نگه می‌دارم.",
    "Den, der overhaler, skal holde tilstrækkelig afstand til siden.", "Whoever overtakes must keep enough distance to the side.",
    "کسی که سبقت می‌گیرد باید فاصله‌ی جانبی کافی نگه دارد."),
  S(True, "Kan jeg ikke se langt nok frem til at komme forbi hele gruppen, venter jeg.",
    "If I cannot see far enough ahead to get past the whole group, I wait.", "اگر آن‌قدر جلو را نمی‌بینم که از کل گروه بگذرم، صبر می‌کنم.",
    "Vognbanen skal være fri for modkørende på hele den strækning, overhalingen tager.",
    "The lane must be clear of oncoming traffic for the whole stretch the overtaking takes.",
    "خط باید در تمام مسافتی که سبقت طول می‌کشد از ترافیک روبه‌رو خالی باشد."),
)

Q(5732, "7.9", town("""
THE SCENE: a town road with two lanes in our direction separated by a broken white line; about 50 m ahead a railway level crossing
with half barriers, raised, and red lights that are off; a slow car drives in the right lane, and we drive in the left lane just
behind it; light traffic.
MUST BE CLEARLY VISIBLE: the two lanes, the slow car in the right lane, the level crossing ahead with its raised barriers.
MUST NOT APPEAR: trains, signs, text."""),
  "Vejen har to vognbaner i din retning. Lidt før en jernbaneoverkørsel kommer du i venstre vognbane op på siden af en langsom bil i "
  "højre vognbane. Trafikken er let. Hvad gælder?",
  "The road has two lanes in your direction. A little before a railway level crossing you come up alongside a slow car in the right "
  "lane while you are in the left lane. The traffic is light. What applies?",
  "جاده در جهت شما دو خط دارد. کمی پیش از یک گذرگاه راه‌آهن، در خط چپ به کنار خودرویی آهسته در خط راست می‌رسید. ترافیک سبک است. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke overhale bilen lige før eller på overkørslen.", "I must not overtake the car just before or on the level crossing.",
    "درست پیش از گذرگاه راه‌آهن یا روی آن نباید از آن خودرو سبقت بگیرم.",
    "Overhaling er forbudt umiddelbart foran og på en jernbaneoverkørsel, også når der er flere vognbaner i samme retning.",
    "Overtaking is forbidden immediately before and on a level crossing, also when there are several lanes in the same direction.",
    "سبقت درست پیش از گذرگاه راه‌آهن و روی آن ممنوع است، حتی وقتی چند خطِ هم‌جهت وجود دارد."),
  S(False, "Jeg må overhale, fordi vi kører i hver sin vognbane.", "I may overtake because we are driving in separate lanes.",
    "می‌توانم سبقت بگیرم، چون هر کدام در خطی جدا هستیم.",
    "Undtagelsen for vognbaner i samme retning gælder kun i kryds, ikke ved jernbaneoverkørsler.",
    "The exception for lanes in the same direction only applies at junctions, not at level crossings.",
    "استثنای خط‌های هم‌جهت فقط برای تقاطع‌هاست، نه برای گذرگاه راه‌آهن."),
  S(True, "Jeg venter med at køre forbi, til vi er over sporene.", "I wait to pass until we are across the tracks.",
    "برای رد شدن صبر می‌کنم تا از روی ریل‌ها بگذریم.",
    "Så overhaler du ikke foran eller på overkørslen.", "Then you do not overtake before or on the crossing.",
    "این‌طور پیش از گذرگاه یا روی آن سبقت نمی‌گیرید."),
  S(False, "Det er kun forbudt at overhale, når lysene ved overkørslen blinker.", "Overtaking is only forbidden when the lights at the crossing are flashing.",
    "سبقت فقط وقتی ممنوع است که چراغ‌های گذرگاه چشمک بزنند.",
    "Forbuddet gælder hele tiden; når lysene blinker, må du slet ikke køre over.",
    "The ban applies all the time; when the lights flash you must not cross at all.",
    "این ممنوعیت همیشه برقرار است؛ وقتی چراغ‌ها چشمک می‌زنند، اصلاً نباید عبور کنید."),
)

Q(5733, "7.9", view("""
THE SCENE: a two-lane country road with a broken centre line; ahead of us a slow van; about 100 m ahead a side road joins from the
right; an oncoming car stands near the junction in the oncoming lane with its left indicator flashing, waiting to turn into the side
road on our side.
MUST BE CLEARLY VISIBLE: the slow van ahead, the side road on the right, the oncoming car with its left indicator flashing.
MUST NOT APPEAR: signs, text."""),
  "Du vil overhale en langsom varevogn. Lidt fremme kommer en sidevej til højre, og en modkørende bil blinker til venstre for at svinge "
  "ind ad den. Hvad gælder?",
  "You want to overtake a slow van. A little ahead a side road joins on the right, and an oncoming car is signalling left to turn into "
  "it. What applies?",
  "می‌خواهید از یک ون آهسته سبقت بگیرید. کمی جلوتر راهی فرعی از سمت راست جدا می‌شود و خودرویی از روبه‌رو راهنمای چپ زده تا وارد آن شود. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Jeg venter med at overhale, til vi er forbi sidevejen.", "I wait to overtake until we are past the side road.",
    "برای سبقت صبر می‌کنم تا از راه فرعی بگذریم.",
    "Overhaling umiddelbart foran og i et kryds er forbudt, og den modkørende kan svinge ind foran dig.",
    "Overtaking immediately before and in a junction is forbidden, and the oncoming car may turn across in front of you.",
    "سبقت درست پیش از تقاطع و داخل آن ممنوع است و خودروی روبه‌رو ممکن است جلوی شما بپیچد."),
  S(True, "Den modkørende bil holder i den vognbane, jeg skulle bruge til overhalingen.",
    "The oncoming car is standing in the lane I would need for the overtaking.", "خودروی روبه‌رو در همان خطی است که برای سبقت لازم داشتم.",
    "Før overhaling skal du sikre dig, at vognbanen er fri, og at der ikke er nogen hindring.",
    "Before overtaking you must make sure that the lane is clear and that there is no obstacle.",
    "پیش از سبقت باید مطمئن شوید که خط خالی است و مانعی وجود ندارد."),
  S(False, "Jeg må overhale, fordi den modkørende skal holde tilbage for mig.", "I may overtake because the oncoming car must give way to me.",
    "می‌توانم سبقت بگیرم، چون خودروی روبه‌رو باید به من حق تقدم بدهد.",
    "Den skal holde tilbage for dig, men du må ikke overhale foran krydset, og bilen holder netop, hvor du ville køre.",
    "It must give way to you, but you must not overtake before the junction, and the car stands just where you would drive.",
    "آن خودرو باید به شما حق تقدم بدهد، ولی شما نباید پیش از تقاطع سبقت بگیرید و آن خودرو درست همان‌جایی است که می‌خواستید بروید."),
  S(False, "Jeg blinker med forlygterne, så den modkørende venter, mens jeg overhaler.",
    "I flash my headlights so that the oncoming car waits while I overtake.",
    "چراغ‌های جلو را چشمک می‌زنم تا خودروی روبه‌رو تا پایان سبقت من صبر کند.",
    "Et lyssignal giver dig ingen ret og kan misforstås.", "A light signal gives you no right and can be misunderstood.",
    "علامت نوری هیچ حقی به شما نمی‌دهد و ممکن است اشتباه فهمیده شود."),
)

Q(5734, "7.9", town("""
THE SCENE: a town street with one lane in our direction; along the right side runs a cycle lane separated by a broad unbroken white
line, with a white bicycle symbol on it; the car ahead of us stands still at the centre line with its left indicator flashing,
waiting for oncoming traffic; the only space to its right is the cycle lane.
MUST BE CLEARLY VISIBLE: the waiting car with its left indicator, the cycle lane with its line and symbol to its right.
MUST NOT APPEAR: signs, text."""),
  "Bilen foran dig holder stille med venstre blinklys tændt og venter på at svinge til venstre. Til højre for den er der kun "
  "cykelbanen. Hvad gælder?",
  "The car in front of you stands still with its left indicator on, waiting to turn left. To its right there is only the cycle lane. "
  "What applies?",
  "خودروی جلویی با راهنمای چپِ روشن ایستاده و منتظر است به چپ بپیچد. سمت راستش فقط خط دوچرخه هست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg venter bag bilen.", "I wait behind the car.", "پشت آن خودرو صبر می‌کنم.",
    "Du må kun køre forbi i højre side, hvis det kan ske uden at bruge cykelbanen.",
    "You may only pass on the right if it can be done without using the cycle lane.",
    "فقط وقتی می‌توانید از سمت راست رد شوید که لازم نباشد وارد خط دوچرخه شوید."),
  S(True, "Jeg må ikke køre ind i cykelbanen for at komme forbi.", "I must not drive into the cycle lane to get past.",
    "نباید برای رد شدن وارد خط دوچرخه شوم.",
    "En kantlinje må overskrides for at passere en venstresvingende, men ikke når banen på den anden side er en særlig bane som en cykelbane.",
    "An edge line may be crossed to pass a left-turning vehicle, but not when the lane beyond it is a special lane such as a cycle lane.",
    "می‌شود برای رد شدن از خودرویی که به چپ می‌پیچد از خط کناری عبور کرد، ولی نه وقتی آن طرف خط، خطی ویژه مثل خط دوچرخه باشد."),
  S(False, "Jeg må godt køre forbi i cykelbanen, når der ikke kommer cyklister.",
    "I may pass in the cycle lane when no cyclists are coming.", "وقتی دوچرخه‌سواری نمی‌آید، می‌توانم از داخل خط دوچرخه رد شوم.",
    "Cykelbanen må kun bruges af cyklister og førere af lille knallert, også når den er tom.",
    "The cycle lane may only be used by cyclists and riders of small mopeds, also when it is empty.",
    "خط دوچرخه، حتی وقتی خالی است، فقط برای دوچرخه‌سواران و رانندگان موتورگازی کوچک است."),
)

Q(5735, "7.9", view("""
THE SCENE: a two-lane country road with a broken centre line; ahead of us a slow tractor; further ahead, about 150 m away, a car is
parked at the left verge, partly in the oncoming lane, with its hazard lights flashing; no oncoming traffic.
MUST BE CLEARLY VISIBLE: the tractor ahead, the parked car partly in the oncoming lane further ahead.
MUST NOT APPEAR: signs, text."""),
  "Du vil overhale en langsom traktor. Længere fremme holder en bil parkeret i den modsatte vejside og fylder en del af den modkørende "
  "vognbane. Der kommer ingen imod dig. Hvad gælder?",
  "You want to overtake a slow tractor. Further ahead a car is parked on the opposite side of the road and takes up part of the "
  "oncoming lane. Nobody is coming towards you. What applies?",
  "می‌خواهید از یک تراکتور آهسته سبقت بگیرید. جلوتر خودرویی در سمت مقابل جاده پارک است و بخشی از خطِ روبه‌رو را گرفته است. کسی از "
  "روبه‌رو نمی‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Den parkerede bil er en hindring i den vognbane, jeg skal bruge til overhalingen.",
    "The parked car is an obstacle in the lane I need for the overtaking.", "خودروی پارک‌شده مانعی در خطی است که برای سبقت لازم دارم.",
    "Før overhaling skal du sikre dig, at der ikke er nogen hindring i den vognbane, hvor overhalingen skal foregå.",
    "Before overtaking you must make sure there is no obstacle in the lane where the overtaking is to take place.",
    "پیش از سبقت باید مطمئن شوید در خطی که سبقت در آن انجام می‌شود مانعی نیست."),
  S(True, "Jeg overhaler kun, hvis jeg kan nå helt forbi traktoren og ind igen, før jeg når den parkerede bil.",
    "I only overtake if I can get fully past the tractor and back in before I reach the parked car.",
    "فقط وقتی سبقت می‌گیرم که پیش از رسیدن به خودروی پارک‌شده کاملاً از تراکتور بگذرم و به خطم برگردم.",
    "Ellers kan du blive klemt mellem traktoren og den parkerede bil.", "Otherwise you may get squeezed between the tractor and the parked car.",
    "وگرنه ممکن است بین تراکتور و خودروی پارک‌شده گیر بیفتید."),
  S(False, "Jeg kan altid presse mig ind mellem traktoren og den parkerede bil.", "I can always squeeze in between the tractor and the parked car.",
    "همیشه می‌توانم خودم را بین تراکتور و خودروی پارک‌شده جا بدهم.",
    "Der er måske ikke plads, og traktoren kan ikke nå at vige.", "There may be no room, and the tractor cannot get out of the way in time.",
    "شاید جا نباشد و تراکتور هم نتواند به‌موقع کنار برود."),
  S(False, "Den parkerede bil har ingen betydning, fordi der ikke kommer modkørende.",
    "The parked car does not matter, because there is no oncoming traffic.", "خودروی پارک‌شده اهمیتی ندارد، چون کسی از روبه‌رو نمی‌آید.",
    "Det er ikke kun modkørende, der kan gøre overhalingen farlig; det kan en hindring i vognbanen også.",
    "It is not only oncoming traffic that can make overtaking dangerous; an obstacle in the lane can too.",
    "فقط ترافیک روبه‌رو نیست که سبقت را خطرناک می‌کند؛ مانعی در خط هم می‌تواند."),
)

Q(5736, "6.1", view("""
THE SCENE: a country road starting to climb steeply; on the right a red-bordered triangular warning sign with a white centre showing a
black slope rising to the right and the text «12 %»; ahead a slow lorry climbs the hill; the hilltop is further ahead.
MUST BE CLEARLY VISIBLE: the warning sign with the rising slope and «12 %», the climbing lorry, the steep hill.
MUST NOT APPEAR: other signs, any other text."""),
  "Du kører forbi denne tavle. Hvad betyder den, og hvad skal du være opmærksom på?",
  "You pass this sign. What does it mean, and what must you look out for?",
  "از کنار این تابلو می‌گذرید. معنایش چیست و باید به چه چیزی توجه کنید؟",
  S(True, "Der kommer en stejl stigning, og tallet viser den største hældning.", "A steep climb is coming, and the number shows the steepest gradient.",
    "سربالاییِ تندی در پیش است و عدد، بیشترین شیب را نشان می‌دهد.",
    "Tavlen advarer om stejl stigning, og tallet angiver den maksimale hældning.",
    "The sign warns of a steep climb, and the number gives the maximum gradient.",
    "این تابلو از سربالایی تند هشدار می‌دهد و عدد آن بیشترین شیب است."),
  S(True, "Tunge køretøjer kan køre meget langsomt op ad bakken.", "Heavy vehicles may go up the hill very slowly.",
    "وسیله‌های سنگین ممکن است خیلی آهسته از تپه بالا بروند.",
    "Lastbiler og vogntog mister fart på en stejl stigning.", "Lorries and combinations lose speed on a steep climb.",
    "کامیون‌ها و مجموعه‌های یدک‌دار در سربالایی تند سرعتشان کم می‌شود."),
  S(True, "Skal jeg standse og sætte i gang op ad bakken, sørger jeg for, at bilen ikke ruller tilbage.",
    "If I have to stop and pull away uphill, I make sure the car does not roll back.",
    "اگر مجبور شوم در سربالایی بایستم و دوباره راه بیفتم، مراقبم خودرو به عقب نغلتد.",
    "Brug parkeringsbremsen eller bilens bakkestarthjælp, så bilen ikke ruller ind i den bagved.",
    "Use the parking brake or the car's hill-start assist so that the car does not roll into the one behind.",
    "از ترمز دستی یا کمک‌حرکت در سربالایی استفاده کنید تا خودرو به خودروی پشتی نخورد."),
  S(False, "Tavlen advarer om en stejl nedkørsel.", "The sign warns of a steep descent.", "این تابلو از سرازیریِ تند هشدار می‌دهد.",
    "Den advarer om en stigning; en stejl nedkørsel har sin egen tavle.", "It warns of a climb; a steep descent has its own sign.",
    "این تابلو از سربالایی هشدار می‌دهد؛ سرازیری تند تابلوی خودش را دارد."),
)

Q(5737, "6.1", town("""
THE SCENE: a residential street leading out of a housing area; on the right a white rectangular zone sign with the word «ZONE» and a
round 40 km/h speed-limit sign on it, crossed by a broad diagonal grey band; beyond it a larger street.
MUST BE CLEARLY VISIBLE: the zone sign with the 40 symbol and the diagonal band across it.
MUST NOT APPEAR: other signs, any text except «ZONE» and 40."""),
  "Du har kørt i et boligområde, der er en zone med 40 km/t. Nu kører du forbi denne tavle. Der er ingen andre tavler. Hvad gælder?",
  "You have been driving in a housing area that is a 40 km/h zone. Now you pass this sign. There are no other signs. What applies?",
  "در محله‌ای مسکونی بوده‌اید که منطقه‌ای با حداکثر سرعت ۴۰ کیلومتر در ساعت است. حالا از کنار این تابلو می‌گذرید و تابلوی دیگری "
  "نیست. چه قاعده‌ای برقرار است؟",
  S(True, "Zonen med 40 km/t ophører, og i byen gælder nu 50 km/t, når der ikke er andre tavler.",
    "The 40 km/h zone ends, and in town 50 km/h now applies when there are no other signs.",
    "منطقه‌ی ۴۰ کیلومتر در ساعت تمام می‌شود و در شهر، اگر تابلوی دیگری نباشد، حالا ۵۰ کیلومتر در ساعت برقرار است.",
    "Tavlen for ophør af zone ophæver zonetavlens bestemmelser, og så gælder den generelle grænse for tættere bebygget område.",
    "The end-of-zone sign lifts the zone sign's rules, and then the general limit for built-up areas applies.",
    "تابلوی پایان منطقه قاعده‌های تابلوی منطقه را لغو می‌کند و آن‌وقت حد سرعتِ عمومیِ منطقه‌ی شهری برقرار است."),
  S(False, "Nu må jeg køre 80 km/t.", "Now I may drive 80 km/h.", "حالا می‌توانم ۸۰ کیلومتر در ساعت برانم.",
    "80 km/t gælder kun uden for tættere bebygget område; tavlen siger ikke, at byen ophører.",
    "80 km/h only applies outside built-up areas; the sign does not say that the town ends.",
    "۸۰ کیلومتر در ساعت فقط بیرون از منطقه‌ی شهری است؛ این تابلو نمی‌گوید شهر تمام شده."),
  S(False, "Den skrå streg betyder, at grænsen på 40 km/t gælder til næste kryds.",
    "The diagonal band means that the 40 km/h limit applies up to the next junction.",
    "نوار مورب یعنی حد ۴۰ کیلومتر در ساعت تا تقاطع بعدی برقرار است.",
    "Den skrå streg betyder, at zonen ophører her.", "The diagonal band means that the zone ends here.",
    "نوار مورب یعنی منطقه همین‌جا تمام می‌شود."),
)

Q(5738, "6.1", town("""
THE SCENE: the entrance to a big city centre; on the right a large white rectangular sign with the word «MILJØZONE» in black at the
top; a wide city street beyond with buses and cars.
MUST BE CLEARLY VISIBLE: the white sign with the word «MILJØZONE».
MUST NOT APPEAR: other signs, any other text."""),
  "Du kører forbi denne tavle ved indkørslen til en storby. Hvad betyder den?",
  "You pass this sign at the entrance to a city. What does it mean?",
  "هنگام ورود به یک شهر بزرگ از کنار این تابلو می‌گذرید. معنایش چیست؟",
  S(True, "Området er en miljøzone, hvor der gælder særlige miljøkrav til bl.a. lastbiler, busser, personbiler og varebiler.",
    "The area is an environmental zone with special environmental requirements for lorries, buses, cars and vans among others.",
    "این محدوده منطقه‌ی زیست‌محیطی است که در آن برای کامیون، اتوبوس، خودروی سواری و ون، از جمله، شرایط زیست‌محیطی ویژه‌ای برقرار است.",
    "Miljøzonetavlen angiver et område med særlige miljøkrav til køretøjer som lastbiler, busser, personbiler og varebiler.",
    "The environmental-zone sign marks an area with special environmental requirements for vehicles such as lorries, buses, cars and vans.",
    "تابلوی منطقه‌ی زیست‌محیطی محدوده‌ای را نشان می‌دهد که برای وسیله‌هایی مثل کامیون، اتوبوس، سواری و ون شرایط زیست‌محیطی ویژه دارد."),
  S(False, "Kravene gælder kun frem til næste vejkryds.", "The requirements only apply up to the next junction.",
    "این شرایط فقط تا تقاطع بعدی برقرارند.",
    "Miljøzonen gælder, indtil den ophæves med tavlen for ophør af miljøzone.",
    "The environmental zone applies until it is lifted by the end-of-environmental-zone sign.",
    "منطقه‌ی زیست‌محیطی تا وقتی با تابلوی پایان آن لغو نشود، برقرار است."),
  S(False, "Tavlen gælder kun lastbiler og busser.", "The sign only applies to lorries and buses.", "این تابلو فقط برای کامیون و اتوبوس است.",
    "Miljøzonen kan også stille krav til personbiler og varebiler.", "The environmental zone can also set requirements for cars and vans.",
    "منطقه‌ی زیست‌محیطی می‌تواند برای خودروی سواری و ون هم شرایطی بگذارد."),
  S(False, "Tavlen betyder, at jeg skal slukke motoren, når jeg holder for rødt.",
    "The sign means that I must switch off the engine when I stop at red.", "این تابلو یعنی وقتی پشت چراغ قرمز می‌ایستم، باید موتور را خاموش کنم.",
    "Tavlen handler om køretøjernes miljøkrav, ikke om at slukke motoren.", "The sign is about the vehicles' environmental requirements, not about switching off the engine.",
    "این تابلو درباره‌ی شرایط زیست‌محیطیِ وسیله‌هاست، نه خاموش کردن موتور."),
)

Q(5739, "6.1", view("""
THE SCENE: a busy road with traffic; on the right a blue square information sign showing a white walking figure on a short flight of
steps; a little further ahead a footbridge for pedestrians crosses over the road, with stairs at both ends.
MUST BE CLEARLY VISIBLE: the blue sign with the walking figure on steps, the footbridge over the road.
MUST NOT APPEAR: other signs, text."""),
  "Ved vejen står denne tavle, og lidt længere fremme går en gangbro over vejen. Hvad betyder tavlen?",
  "This sign stands by the road, and a little further ahead a footbridge crosses the road. What does the sign mean?",
  "کنار جاده این تابلو هست و کمی جلوتر پلی عابرپیاده از روی جاده می‌گذرد. این تابلو چه معنایی دارد؟",
  S(True, "Den viser, at der er en tunnel eller bro for gående.", "It shows that there is a tunnel or bridge for pedestrians.",
    "نشان می‌دهد که تونل یا پلی برای عابران پیاده هست.",
    "Tavlen angiver fodgængertunnel eller fodgængerbro.", "The sign shows a pedestrian tunnel or footbridge.",
    "این تابلو تونل یا پل عابر پیاده را نشان می‌دهد."),
  S(True, "Gående, der vil over vejen i nærheden, skal bruge broen, hvis det er muligt.",
    "Pedestrians who want to cross the road nearby must use the bridge if possible.",
    "عابرانی که می‌خواهند نزدیک این‌جا از جاده رد شوند، باید در صورت امکان از پل استفاده کنند.",
    "Findes en fodgængerbro eller -tunnel i nærheden, skal den om muligt bruges.",
    "If there is a footbridge or pedestrian tunnel nearby, it must be used if possible.",
    "اگر پل یا تونل عابر پیاده در نزدیکی باشد، باید در صورت امکان از آن استفاده شود."),
  S(False, "Vejen går gennem en tunnel længere fremme.", "The road goes through a tunnel further ahead.", "جاده جلوتر از یک تونل می‌گذرد.",
    "Tavlen er for de gående; en tunnel for køretøjer har sine egne tavler.", "The sign is for pedestrians; a tunnel for vehicles has its own signs.",
    "این تابلو برای عابران است؛ تونلِ وسیله‌ها تابلوهای خودش را دارد."),
  S(True, "Jeg skal stadig være opmærksom på gående, der alligevel går over vejen.",
    "I must still watch out for pedestrians who cross the road anyway.", "باز هم باید مراقب عابرانی باشم که با این حال از عرض جاده رد می‌شوند.",
    "Ikke alle bruger broen, og du skal altid tage hensyn til gående på vejen.",
    "Not everyone uses the bridge, and you must always show consideration for pedestrians on the road.",
    "همه از پل استفاده نمی‌کنند و همیشه باید ملاحظه‌ی عابرانِ روی جاده را داشته باشید."),
)

Q(5740, "7.6", town("""
THE SCENE: a town street; on the right a woman with a guide dog in a white harness stands at the kerb, away from any pedestrian
crossing, and seems about to cross; no crossing nearby.
MUST BE CLEARLY VISIBLE: the woman with the guide dog and its harness at the kerb.
MUST NOT APPEAR: signs, text, pedestrian crossings."""),
  "En kvinde med en førerhund står ved kantstenen og ser ud til at ville gå over vejen. Der er ikke noget fodgængerfelt i nærheden. "
  "Hvordan forholder du dig?",
  "A woman with a guide dog stands at the kerb and seems about to cross the road. There is no pedestrian crossing nearby. What do you do?",
  "زنی با سگ راهنما کنار جدول ایستاده و به نظر می‌رسد می‌خواهد از خیابان رد شود. در آن نزدیکی گذرگاه عابری نیست. چه می‌کنید؟",
  S(True, "Jeg viser særligt hensyn, fordi kvinden sandsynligvis ser dårligt.", "I show special consideration, because the woman probably has poor sight.",
    "ملاحظه‌ی ویژه دارم، چون احتمالاً بینایی این زن ضعیف است.",
    "Der skal vises særligt hensyn over for personer med svækket syn.", "Special consideration must be shown towards people with poor sight.",
    "نسبت به افرادِ کم‌بینا باید ملاحظه‌ی ویژه داشت."),
  S(True, "Jeg sætter farten ned og er klar til at standse.", "I slow down and am ready to stop.", "سرعتم را کم می‌کنم و آماده‌ی ایستادنم.",
    "Hun kan gå ud på kørebanen uden at kunne se dig.", "She may step onto the carriageway without being able to see you.",
    "او ممکن است بی‌آن‌که شما را ببیند، به سواره‌رو برود."),
  S(True, "Går hun ud på vejen, standser jeg og lader hende gå over.", "If she steps onto the road, I stop and let her cross.",
    "اگر وارد خیابان شود، می‌ایستم و می‌گذارم رد شود.",
    "Hun kan ikke altid se, om der kommer biler, og du skal undgå at bringe hende i fare.",
    "She cannot always see whether cars are coming, and you must avoid putting her in danger.",
    "او همیشه نمی‌تواند ببیند خودرویی می‌آید یا نه و شما باید از به خطر انداختنش پرهیز کنید."),
  S(True, "Jeg dytter ikke, fordi det kan forskrække hende og hunden.", "I do not sound the horn, because it may startle her and the dog.",
    "بوق نمی‌زنم، چون ممکن است او و سگ را بترساند.",
    "Lydsignal må kun bruges for at forebygge fare, og et pludseligt dyt kan forvirre.",
    "The horn may only be used to prevent danger, and a sudden hoot can confuse.",
    "بوق فقط برای پیشگیری از خطر است و یک بوقِ ناگهانی می‌تواند گیج‌کننده باشد."),
)

Q(5741, "7.6", town("""
THE SCENE: a town street with slow queuing traffic; ahead a pedestrian crossing (zebra stripes); the car in front of us has just
crossed it and stopped right after it, so there is no room for our car after the crossing; pedestrians wait on the pavement beside
the crossing.
MUST BE CLEARLY VISIBLE: the zebra crossing, the car standing just after it, the waiting pedestrians.
MUST NOT APPEAR: signs, text, traffic lights."""),
  "Du kører i kø mod et fodgængerfelt. Bilen foran dig holder lige efter feltet, og der er ikke plads til din bil efter det. Hvordan "
  "forholder du dig?",
  "You are driving in a queue towards a pedestrian crossing. The car in front of you stands just after the crossing, and there is no "
  "room for your car after it. What do you do?",
  "در صفی به سمت گذرگاه عابر پیاده می‌روید. خودروی جلویی درست بعد از گذرگاه ایستاده و بعد از آن برای خودروی شما جا نیست. چه می‌کنید؟",
  S(True, "Jeg standser før feltet og venter, til der er plads efter det.", "I stop before the crossing and wait until there is room after it.",
    "پیش از گذرگاه می‌ایستم و صبر می‌کنم تا بعد از آن جا باز شود.",
    "Kørende skal så vidt muligt undgå at standse i fodgængerfeltet.", "Drivers must as far as possible avoid stopping on the pedestrian crossing.",
    "رانندگان باید تا جای ممکن از ایستادن روی گذرگاه عابر پرهیز کنند."),
  S(True, "Jeg holder øje med gående, der vil over foran min bil.", "I watch for pedestrians who want to cross in front of my car.",
    "مراقب عابرانی هستم که می‌خواهند جلوی خودروی من رد شوند.",
    "Gående, der er på vej ud i feltet, skal kunne passere.", "Pedestrians on their way onto the crossing must be able to cross.",
    "عابرانی که وارد گذرگاه می‌شوند باید بتوانند رد شوند."),
  S(False, "Jeg kører ud på feltet, så jeg ikke mister min plads i køen.", "I drive onto the crossing so that I do not lose my place in the queue.",
    "روی گذرگاه می‌روم تا جایم را در صف از دست ندهم.",
    "En bil, der holder i feltet, spærrer for de gående og tvinger dem ud mellem bilerne.",
    "A car standing on the crossing blocks the pedestrians and forces them out between the cars.",
    "خودرویی که روی گذرگاه بایستد راه عابران را می‌بندد و مجبورشان می‌کند از بین خودروها رد شوند."),
  S(True, "Jeg kører først frem, når der er plads til hele bilen efter feltet.", "I only move forward when there is room for the whole car after the crossing.",
    "فقط وقتی جلو می‌روم که بعد از گذرگاه برای کل خودرو جا باشد.",
    "Så undgår du at blive holdende i feltet, hvis køen standser igen.", "Then you avoid being left standing on the crossing if the queue stops again.",
    "این‌طور اگر صف دوباره بایستد، روی گذرگاه نمی‌مانید."),
)

Q(5742, "7.6", view("""
THE SCENE: a country road beside a lake; a duck with a line of small ducklings is crossing the road ahead of us; in the interior
rear-view mirror at the top of the picture a car follows close behind us.
MUST BE CLEARLY VISIBLE: the duck and ducklings on the road, the car close behind in the mirror.
MUST NOT APPEAR: signs, text, oncoming vehicles."""),
  "En and med ællinger går over vejen foran dig. Bag dig kører en bil tæt på. Hvordan forholder du dig?",
  "A duck with ducklings is crossing the road in front of you. A car is driving close behind you. What do you do?",
  "مرغابی‌ای با جوجه‌هایش جلوی شما از جاده رد می‌شود. خودرویی از پشت به شما نزدیک است. چه می‌کنید؟",
  S(True, "Jeg bremser roligt og i god tid, hvis det kan ske uden fare.", "I brake calmly and in good time if it can be done without danger.",
    "اگر بی‌خطر باشد، آرام و به‌موقع ترمز می‌کنم.",
    "Bremser du pludselig, kan bilen bag dig køre ind i dig.", "If you brake suddenly, the car behind you may run into you.",
    "اگر ناگهان ترمز کنید، ممکن است خودروی پشتی به شما بزند."),
  S(True, "Jeg kigger i spejlet, før jeg bremser.", "I look in the mirror before I brake.", "پیش از ترمز به آینه نگاه می‌کنم.",
    "Du skal vide, hvor tæt bilen bag dig er.", "You need to know how close the car behind you is.",
    "باید بدانید خودروی پشتی چقدر نزدیک است."),
  S(False, "Jeg svinger hurtigt ud i den modkørende vognbane for at undgå ænderne.",
    "I swerve quickly into the oncoming lane to avoid the ducks.", "برای دوری از مرغابی‌ها سریع به خط مقابل می‌پیچم.",
    "Et pludseligt sving kan føre til en langt alvorligere ulykke, fx med en modkørende.",
    "A sudden swerve can lead to a far more serious accident, for example with an oncoming vehicle.",
    "یک پیچیدنِ ناگهانی می‌تواند به تصادفی بسیار جدی‌تر، مثلاً با خودروی روبه‌رو، منجر شود."),
  S(False, "Jeg dytter længe, så ænderne skynder sig væk.", "I sound the horn for a long time so that the ducks hurry away.",
    "مدتی طولانی بوق می‌زنم تا مرغابی‌ها زودتر بروند.",
    "Lydsignal må kun bruges for at forebygge fare og ikke længere end nødvendigt.",
    "The horn may only be used to prevent danger and no longer than necessary.",
    "بوق فقط برای پیشگیری از خطر است و نه طولانی‌تر از حد لازم."),
)

Q(5743, "7.6", town("""
THE SCENE: a town street with a pedestrian crossing (zebra stripes) without traffic lights; a man who walks and pushes his bicycle
beside him is stepping onto the crossing from the right kerb.
MUST BE CLEARLY VISIBLE: the man walking and pushing the bicycle, the zebra crossing.
MUST NOT APPEAR: signs, text, traffic lights."""),
  "En mand trækker sin cykel og er ved at gå ud på et fodgængerfelt uden lyssignal. Hvordan forholder du dig?",
  "A man pushing his bicycle is about to step onto a pedestrian crossing without traffic lights. What do you do?",
  "مردی که دوچرخه‌اش را کنار خود می‌برد، در حال وارد شدن به گذرگاه عابری بدون چراغ است. چه می‌کنید؟",
  S(True, "Manden regnes som gående, når han trækker cyklen.", "The man counts as a pedestrian when he pushes the bicycle.",
    "وقتی دوچرخه را کنار خود می‌برد، عابر پیاده به حساب می‌آید.",
    "Den, der trækker en cykel, anses som gående.", "Someone pushing a bicycle is regarded as a pedestrian.",
    "کسی که دوچرخه را با دست می‌برد، عابر پیاده محسوب می‌شود."),
  S(True, "Jeg standser og lader ham gå over feltet.", "I stop and let him cross.", "می‌ایستم و می‌گذارم از گذرگاه رد شود.",
    "Ved et fodgængerfelt uden lyssignal skal du om nødvendigt standse for gående, der er på vej ud i feltet.",
    "At a pedestrian crossing without traffic lights you must stop if necessary for pedestrians on their way onto the crossing.",
    "در گذرگاه عابرِ بدون چراغ، در صورت لزوم باید برای عابرانی که وارد گذرگاه می‌شوند بایستید."),
  S(True, "Jeg sætter farten ned i god tid, så han kan se, at jeg holder tilbage.", "I slow down in good time so that he can see I am giving way.",
    "به‌موقع سرعتم را کم می‌کنم تا ببیند که دارم به او حق تقدم می‌دهم.",
    "Du skal afpasse farten, så der ikke opstår fare for gående i eller på vej ud i feltet.",
    "You must adjust your speed so that no danger arises for pedestrians on or stepping onto the crossing.",
    "باید سرعت را طوری تنظیم کنید که برای عابرانِ روی گذرگاه یا در حال ورود به آن خطری پیش نیاید."),
  S(False, "Han skal vente, fordi cyklister ikke har ret til at krydse i fodgængerfeltet.",
    "He must wait, because cyclists have no right to cross on the pedestrian crossing.",
    "او باید صبر کند، چون دوچرخه‌سواران حقی برای رد شدن از گذرگاه عابر ندارند.",
    "Når han trækker cyklen, er han gående og har samme ret som andre gående i feltet.",
    "When he pushes the bicycle he is a pedestrian and has the same rights as other pedestrians on the crossing.",
    "وقتی دوچرخه را با دست می‌برد، عابر است و همان حقِ عابران دیگر را در گذرگاه دارد."),
)

Q(5744, "7.3", view("""
THE SCENE: a country road; on the right a round speed-limit sign 60 with a white rectangular plate under it showing «0–400 m»; ahead,
close to the road, a school building and a bus stop.
MUST BE CLEARLY VISIBLE: the 60 sign with its «0–400 m» plate, the school building ahead.
MUST NOT APPEAR: other signs, any other text."""),
  "Uden for byen står en tavle med 60 km/t og undertavlen »0–400 m«. Hvad gælder?",
  "Outside town there is a 60 km/h sign with the plate «0–400 m». What applies?",
  "بیرون شهر تابلوی ۶۰ کیلومتر در ساعت با زیرتابلوی «۰ تا ۴۰۰ متر» قرار دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Grænsen på 60 km/t gælder fra tavlen og 400 m frem.", "The 60 km/h limit applies from the sign and for 400 m on.",
    "حد ۶۰ کیلومتر در ساعت از تابلو تا ۴۰۰ متر جلوتر برقرار است.",
    "Tallene på undertavlen viser, hvor strækningen begynder og slutter, regnet fra tavlen.",
    "The numbers on the plate show where the stretch begins and ends, measured from the sign.",
    "عددهای زیرتابلو شروع و پایانِ مسیر را، از خودِ تابلو، نشان می‌دهند."),
  S(True, "Efter de 400 m gælder grænsen på 60 km/t ikke længere.", "After the 400 m the 60 km/h limit no longer applies.",
    "بعد از آن ۴۰۰ متر، حد ۶۰ کیلومتر در ساعت دیگر برقرار نیست.",
    "En lokal hastighedsgrænse kan ophæves ved en afstand på en undertavle.", "A local speed limit can be ended by a distance on a plate.",
    "حد سرعت محلی را می‌توان با فاصله‌ای که روی زیرتابلو آمده پایان داد."),
  S(False, "Grænsen begynder først 400 m efter tavlen.", "The limit only begins 400 m after the sign.", "این حد تازه ۴۰۰ متر بعد از تابلو شروع می‌شود.",
    "0 betyder, at strækningen begynder ved tavlen.", "0 means that the stretch begins at the sign.", "صفر یعنی مسیر از خودِ تابلو شروع می‌شود."),
  S(False, "Grænsen ophører ved næste kryds, selv om det kommer før de 400 m.",
    "The limit ends at the next junction, even if it comes before the 400 m.", "این حد در تقاطع بعدی تمام می‌شود، حتی اگر پیش از ۴۰۰ متر باشد.",
    "En lokal hastighedsgrænse ophører ikke ved et kryds.", "A local speed limit does not end at a junction.",
    "حد سرعت محلی با رسیدن به تقاطع تمام نمی‌شود."),
)

Q(5745, "7.3", view("""
THE SCENE: a long country road through fields with light traffic; on the right a round speed-limit sign 80.
MUST BE CLEARLY VISIBLE: the 80 sign, the long road ahead.
MUST NOT APPEAR: other signs, text."""),
  "Du er forsinket og skal køre 20 km på landevejen, hvor grænsen er 80 km/t. Du overvejer at køre 90 km/t hele vejen. Hvad gælder?",
  "You are late and have to drive 20 km on the country road, where the limit is 80 km/h. You are thinking of doing 90 km/h all the "
  "way. What applies?",
  "دیر کرده‌اید و باید ۲۰ کیلومتر در جاده‌ی بیرون شهر، با حداکثر سرعت ۸۰ کیلومتر در ساعت، برانید. به فکرتان رسیده تمام راه را ۹۰ "
  "برانید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg sparer under 2 minutter, selv om det lykkes at holde 90 km/t hele vejen.",
    "I save less than 2 minutes, even if I manage to keep 90 km/h all the way.",
    "حتی اگر بتوانم تمام راه ۹۰ برانم، کمتر از ۲ دقیقه صرفه‌جویی می‌کنم.",
    "20 km tager 15 minutter ved 80 km/t og godt 13 minutter ved 90 km/t.",
    "20 km takes 15 minutes at 80 km/h and just over 13 minutes at 90 km/h.",
    "۲۰ کیلومتر با ۸۰ کیلومتر در ساعت ۱۵ دقیقه و با ۹۰ کیلومتر در ساعت کمی بیش از ۱۳ دقیقه طول می‌کشد."),
  S(True, "Det er ulovligt, og jeg kan få en bøde.", "It is illegal, and I may get a fine.", "غیرقانونی است و ممکن است جریمه شوم.",
    "90 km/t er over grænsen på 80 km/t.", "90 km/h is above the 80 km/h limit.", "۹۰ کیلومتر در ساعت بالاتر از حد ۸۰ است."),
  S(True, "Ved den højere fart bliver bremselængden længere, og et uheld bliver mere alvorligt.",
    "At the higher speed the braking distance gets longer, and an accident becomes more serious.",
    "با سرعت بالاتر مسافت ترمز بیشتر و تصادف جدی‌تر می‌شود.",
    "Bremselængden og kræfterne ved et sammenstød vokser hurtigt med farten.",
    "The braking distance and the forces in a collision grow quickly with speed.",
    "مسافت ترمز و نیروهای برخورد با افزایش سرعت به‌سرعت زیاد می‌شوند."),
  S(False, "Jeg når frem en hel del hurtigere, så det er risikoen værd.", "I will arrive a good deal sooner, so it is worth the risk.",
    "خیلی زودتر می‌رسم، پس ارزش این خطر را دارد.",
    "Tidsgevinsten er lille, mens risikoen bliver større.", "The time gained is small, while the risk grows.",
    "زمانی که به دست می‌آید کم است، ولی خطر بیشتر می‌شود."),
)

Q(5746, "7.3", view("""
THE SCENE: a dark country road at night; several oncoming cars with dipped headlights approach in a row; our dipped beam lights only a
short stretch of the road ahead; beyond it the road and the right verge are dark; a round 80 sign at the right.
MUST BE CLEARLY VISIBLE: the short stretch lit by our dipped beam, the oncoming headlights, the dark right verge.
MUST NOT APPEAR: other signs, text.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt, og der kommer mange biler imod dig, så du må køre med nærlys. Nærlyset oplyser kun et kort stykke af vejen. Grænsen "
  "er 80 km/t. Hvordan forholder du dig?",
  "It is dark, and many cars are coming towards you, so you must drive on dipped beam. The dipped beam only lights a short stretch of "
  "the road. The limit is 80 km/h. What do you do?",
  "تاریک است و خودروهای زیادی از روبه‌رو می‌آیند، پس باید با نور پایین برانید. نور پایین فقط تکه‌ی کوتاهی از جاده را روشن می‌کند. حد "
  "سرعت ۸۰ کیلومتر در ساعت است. چه می‌کنید؟",
  S(True, "Jeg tilpasser farten, så jeg kan standse inden for det stykke vej, nærlyset oplyser.",
    "I adjust my speed so that I can stop within the piece of road the dipped beam lights up.",
    "سرعتم را طوری تنظیم می‌کنم که بتوانم در همان تکه‌ای از جاده که نور پایین روشن می‌کند، بایستم.",
    "Du skal kunne standse på den del af kørebanen, du har udsyn over, og foran enhver hindring, der kan påregnes.",
    "You must be able to stop within the part of the carriageway you can see, and before any obstacle that can be expected.",
    "باید بتوانید در بخشی از سواره‌رو که می‌بینید، و پیش از هر مانعِ قابل‌انتظاری، بایستید."),
  S(False, "Jeg holder 80 km/t, fordi grænsen tillader det.", "I keep to 80 km/h because the limit allows it.",
    "با ۸۰ کیلومتر در ساعت می‌رانم، چون حد سرعت اجازه می‌دهد.",
    "Grænsen er det højeste, du må køre; mørket og nærlyset kan kræve mindre.",
    "The limit is the most you may drive; the darkness and the dipped beam may require less.",
    "حد سرعت بیشترینِ مجاز است؛ تاریکی و نور پایین ممکن است سرعت کمتری بطلبد."),
  S(True, "Jeg holder øje med vejens højre side, hvor der kan være cyklister og gående uden lys.",
    "I watch the right side of the road, where there may be cyclists and pedestrians without lights.",
    "سمت راست جاده را می‌پایم که ممکن است دوچرخه‌سوار یا عابری بدون چراغ آن‌جا باشد.",
    "Dem ser du sent i nærlys, især når du bliver blændet af de modkørende.",
    "You see them late on dipped beam, especially when you are dazzled by oncoming traffic.",
    "با نور پایین آن‌ها را دیر می‌بینید، به‌خصوص وقتی نور روبه‌رو چشمتان را می‌زند."),
  S(False, "Jeg tænder fjernlyset kort, når en modkørende er tæt på, så jeg kan se bedre.",
    "I switch on the main beam briefly when an oncoming car is close, so that I can see better.",
    "وقتی خودروی روبه‌رو نزدیک است، برای بهتر دیدن نور بالا را لحظه‌ای روشن می‌کنم.",
    "Fjernlys må ikke bruges, når en modkørende kan blive blændet.", "Main beam must not be used when an oncoming driver can be dazzled.",
    "وقتی ممکن است راننده‌ی روبه‌رو خیره شود، نور بالا مجاز نیست."),
)

Q(5747, "7.3", view("""
THE SCENE: a country road on a quiet Sunday; on the right road works: orange cones, a fenced-off strip, a parked excavator; nobody is
working; at the start of the road works a round speed-limit sign 50 on a yellow background plate with a black border.
MUST BE CLEARLY VISIBLE: the 50 sign, the road works with the parked machine and nobody working.
MUST NOT APPEAR: other signs, any other text, people."""),
  "Ved et vejarbejde er hastigheden sat ned til 50 km/t. Det er søndag, og der arbejder ingen. Hvad gælder?",
  "At road works the speed limit has been lowered to 50 km/h. It is Sunday, and nobody is working. What applies?",
  "کنار یک محل کار جاده‌ای، حد سرعت به ۵۰ کیلومتر در ساعت کاهش یافته است. یکشنبه است و کسی کار نمی‌کند. چه قاعده‌ای برقرار است؟",
  S(True, "Grænsen på 50 km/t gælder stadig.", "The 50 km/h limit still applies.", "حد ۵۰ کیلومتر در ساعت هنوز برقرار است.",
    "En færdselstavle gælder, uanset om der arbejdes på stedet.", "A traffic sign applies whether or not anyone is working there.",
    "تابلوی راهنمایی و رانندگی برقرار است، چه آن‌جا کسی کار کند چه نکند."),
  S(False, "Når ingen arbejder, må jeg køre den hastighed, der gjaldt før vejarbejdet.",
    "When nobody is working, I may drive at the speed that applied before the road works.",
    "وقتی کسی کار نمی‌کند، می‌توانم با سرعتی که پیش از کار جاده‌ای مجاز بود برانم.",
    "Tavlen gælder, til den fjernes eller ophæves.", "The sign applies until it is removed or lifted.",
    "تابلو تا وقتی برداشته یا لغو نشود، برقرار است."),
  S(False, "Jeg må køre hurtigere, hvis der ikke står kegler i min vognbane.", "I may drive faster if there are no cones in my lane.",
    "اگر در خط من مخروطی نباشد، می‌توانم تندتر برانم.",
    "Tavlen gælder hele strækningen, ikke kun der, hvor der står kegler.", "The sign applies to the whole stretch, not only where the cones are.",
    "این تابلو برای کل مسیر است، نه فقط جایی که مخروط گذاشته‌اند."),
)

Q(5748, "1.2", picture("""
A car's windscreen seen from the driver's seat; a long crack runs from a small star-shaped stone chip in the lower middle of the glass
right across the part in front of the driver; low sunlight from ahead catches the crack so that it glitters; the road beyond is
slightly blurred.
MUST BE CLEARLY VISIBLE: the long crack across the driver's field of view, the stone-chip star where it starts.
MUST NOT APPEAR: text, logos."""),
  "Et stenslag har lavet en lang revne i forruden lige foran dig. Hvad gælder?",
  "A stone chip has caused a long crack in the windscreen right in front of you. What applies?",
  "سنگ‌ریزه‌ای ترکی بلند درست جلوی دیدِ شما روی شیشه‌ی جلو انداخته است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg får ruden skiftet hurtigst muligt.", "I have the windscreen replaced as soon as possible.", "هرچه زودتر شیشه را عوض می‌کنم.",
    "Bilen skal holdes i en sådan stand, at den kan bruges uden fare, og en revne i førerens synsfelt kan nedsætte udsynet.",
    "The car must be kept in a state where it can be used without danger, and a crack in the driver's field of view can reduce visibility.",
    "خودرو باید در وضعی نگه داشته شود که استفاده از آن بی‌خطر باشد و ترکی در میدان دید راننده می‌تواند دید را کم کند."),
  S(True, "Revnen kan genere udsynet, fx når solen eller modkørende lys rammer ruden.",
    "The crack can disturb the view, for example when the sun or oncoming lights hit the windscreen.",
    "این ترک ممکن است دید را مختل کند، مثلاً وقتی آفتاب یا نور خودروهای روبه‌رو به شیشه می‌تابد.",
    "Lyset brydes i revnen, så det kan blænde dig.", "The light is scattered in the crack, so it can dazzle you.",
    "نور در ترک می‌شکند و ممکن است چشمتان را بزند."),
  S(False, "Revnen har ingen betydning, så længe vinduesviskerne virker.", "The crack does not matter as long as the wipers work.",
    "تا وقتی برف‌پاک‌کن‌ها کار می‌کنند، این ترک اهمیتی ندارد.",
    "Viskerne fjerner ikke revnen; den kan genere udsynet og svække ruden.", "The wipers do not remove the crack; it can disturb the view and weaken the glass.",
    "برف‌پاک‌کن ترک را از بین نمی‌برد؛ ترک می‌تواند دید را مختل و شیشه را ضعیف کند."),
  S(False, "Jeg kan vente, til bilen alligevel skal synes.", "I can wait until the car has to be inspected anyway.",
    "می‌توانم صبر کنم تا خودرو به هر حال برای معاینه‌ی فنی برود.",
    "Føreren skal hele tiden være opmærksom på, at bilen er i forsvarlig stand.",
    "The driver must always make sure that the car is in a safe condition.",
    "راننده همیشه باید مراقب باشد که خودرو در وضعیتی ایمن باشد."),
)

Q(5749, "7.17", view("""
THE SCENE: a motorway with two lanes in our direction on a very windy day; we drive in the left lane; in the right lane, slightly
ahead of us, a car tows a tall caravan that sways visibly from side to side; trees beside the motorway bend in the wind.
MUST BE CLEARLY VISIBLE: the swaying caravan in the right lane just ahead of us, the bending trees.
MUST NOT APPEAR: signs, text.""", cond="very windy day, dry road"),
  "På motorvejen kommer du op på siden af en bil med campingvogn i højre vognbane. Det blæser kraftigt, og campingvognen slingrer. "
  "Hvordan forholder du dig?",
  "On the motorway you come up alongside a car with a caravan in the right lane. It is very windy, and the caravan is swaying. What do you do?",
  "در آزادراه به کنار خودرویی با کاروان در خط راست می‌رسید. باد شدیدی می‌وزد و کاروان به این طرف و آن طرف تاب می‌خورد. چه می‌کنید؟",
  S(True, "Jeg undgår at køre ved siden af vogntoget længere end nødvendigt.", "I avoid driving alongside the combination longer than necessary.",
    "از این‌که بیش از حد لازم کنار این مجموعه برانم پرهیز می‌کنم.",
    "Slingrer campingvognen, kan den komme ind i din vognbane.", "If the caravan sways, it may come into your lane.",
    "اگر کاروان تاب بخورد، ممکن است وارد خط شما شود."),
  S(True, "Jeg holder god afstand til siden og er klar til at bremse.", "I keep a good distance to the side and am ready to brake.",
    "فاصله‌ی جانبی کافی نگه می‌دارم و آماده‌ی ترمزم.",
    "Så har du plads og tid, hvis vogntoget kommer ud mod dig.", "Then you have room and time if the combination comes out towards you.",
    "این‌طور اگر مجموعه به سمت شما بیاید، جا و فرصت دارید."),
  S(False, "Jeg dytter for at gøre føreren opmærksom på, at campingvognen slingrer.",
    "I sound the horn to make the driver aware that the caravan is swaying.", "بوق می‌زنم تا راننده متوجه شود کاروان تاب می‌خورد.",
    "Et dyt kan forskrække føreren og gøre det værre.", "A hoot may startle the driver and make things worse.",
    "یک بوق ممکن است راننده را بترساند و اوضاع را بدتر کند."),
  S(False, "Jeg kører tæt ind på vogntoget for at komme hurtigt forbi.", "I drive close to the combination to get past quickly.",
    "برای این‌که سریع رد شوم، نزدیکِ مجموعه می‌رانم.",
    "Tæt på vogntoget kan du blive ramt, hvis campingvognen svinger ud.", "Close to the combination you may be hit if the caravan swings out.",
    "نزدیکِ مجموعه، اگر کاروان به بیرون تاب بخورد، ممکن است به شما بخورد."),
)

Q(5750, "4.5", town("""
THE SCENE: a town street with a cycle lane on the right; ahead in the cycle lane a woman cyclist rides with one arm raised straight up
above her head; a junction further ahead.
MUST BE CLEARLY VISIBLE: the woman cyclist with one arm raised straight up.
MUST NOT APPEAR: signs, text."""),
  "Cyklisten foran dig rækker den ene arm lodret op i luften. Hvad betyder det?",
  "The cyclist in front of you raises one arm straight up in the air. What does it mean?",
  "دوچرخه‌سوارِ جلوی شما یکی از دست‌هایش را صاف به بالا برده است. معنایش چیست؟",
  S(True, "Cyklisten vil standse eller hurtigt sætte farten ned.", "The cyclist is going to stop or slow down quickly.",
    "دوچرخه‌سوار می‌خواهد بایستد یا سریع سرعتش را کم کند.",
    "Kørende uden stoplygter giver tegn til standsning ved at række en arm i vejret.",
    "Road users without brake lights signal that they are stopping by raising an arm.",
    "کسانی که چراغ ترمز ندارند، با بالا بردن دست نشان می‌دهند که می‌ایستند."),
  S(False, "Cyklisten viser, at hun vil dreje til venstre.", "The cyclist is showing that she is going to turn left.",
    "دوچرخه‌سوار نشان می‌دهد که می‌خواهد به چپ بپیچد.",
    "Tegn til sving gives med en arm vandret ud til siden.", "A signal for turning is given with an arm held out sideways.",
    "علامت پیچیدن با دستی است که افقی به کنار دراز می‌شود."),
  S(False, "Cyklisten hilser og vil lade mig køre forbi.", "The cyclist is waving and wants to let me pass.",
    "دوچرخه‌سوار سلام می‌کند و می‌خواهد بگذارد رد شوم.",
    "En arm i vejret er et tegn til standsning.", "An arm raised is a signal for stopping.", "دستِ بالا برده علامت ایستادن است."),
)
