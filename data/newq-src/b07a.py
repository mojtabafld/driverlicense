# «آزمون جدید», batch 7 (5601–5700), part a: stopping and parking (7.18), overtaking (7.9), signs (6.1), people and animals
# beside the road (7.6), speed (7.3), the car (1.2) and the driving licence (10.3).
# Rules: Færdselsloven §§ 10 stk. 2 (a pedestrian pushing a bicycle walks at the far right), 11, 19 stk. 2 (special care also
# when a school bus leaves), 21 stk. 2 (a light-rail vehicle may be overtaken on the right with special care when it does not
# block the view), 21 stk. 3–4, 22 stk. 1, 23 stk. 1–2 (the junction exception only for two-wheeled bicycles and small mopeds),
# 27 stk. 1 and 7, 28 stk. 1, 3 and 5, 29 stk. 1 nr. 2 (10 m from the cycle path's nearest edge where carriageway and cycle path
# open out together) and nr. 6 (hilltop), 31 stk. 1 (parked within 2 m of a rail: stay near, move without being asked when a
# train comes), 32 stk. 1, 33 stk. 5, 41 stk. 1 and stk. 2 nr. 9, 11 and 12, 82 stk. 2–3, 125 stk. 1 nr. 3 (more than 40 % over
# a temporary limit at road works); Bekendtgørelse om vejafmærkning (BEK 425/2023): § 9 U 3 (black times: weekdays except
# Saturdays), § 19 (parking signs only on their own side), A 39, A 42,1, A 43,1, A 75, A 95, C 31 (actual total weight; for a
# combination each vehicle), E 33 with UE 33 (a horizontal arrow: parking crosswise, e.g. at turning places), UC 60,8, Q 46
# (parking lanes with a broad line: inside the lane, wheels on the line but not beyond it).
from nq import Q, S, above, picture, town, view

Q(5601, "7.18", above("""
THE SCENE: a town street seen from above running up the picture; a side street joins from the RIGHT; along the near side of the side
street runs a cycle path, which meets our street together with the side street's carriageway; along our right kerb, a free space
ends 8 m before the cycle path's edge.
VEHICLES (colour code used strictly): a RED car (ours) beside the free space with its right indicator flashing.
MUST NOT APPEAR: signs, text."""),
  "Du vil parkere lige før en sidevej til højre. Langs sidevejen er der en cykelsti, som munder ud sammen med sidevejens kørebane. Den "
  "ledige plads ligger 8 m fra cykelstien og 11 m fra sidevejens kørebane. Hvad gælder?",
  "You want to park just before a side street on the right. Along the side street there is a cycle path that opens out together with "
  "the side street's carriageway. The free space is 8 m from the cycle path and 11 m from the side street's carriageway. What applies?",
  "می‌خواهید درست پیش از خیابانی فرعی در سمت راست پارک کنید. کنار خیابان فرعی مسیر دوچرخه‌ای هست که همراه با سواره‌روی آن به "
  "خیابان شما می‌رسد. جای خالی ۸ متر با مسیر دوچرخه و ۱۱ متر با سواره‌روی خیابان فرعی فاصله دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Afstanden på 10 m regnes her fra cykelstiens nærmeste kant.", "Here the 10 m are measured from the nearest edge of the cycle path.",
    "این‌جا ۱۰ متر از نزدیک‌ترین لبه‌ی مسیر دوچرخه حساب می‌شود.",
    "Hvor kørebane og cykelsti munder ud sammen, regnes afstanden fra cykelstiens nærmeste kant.",
    "Where carriageway and cycle path open out together, the distance is measured from the cycle path's nearest edge.",
    "جایی که سواره‌رو و مسیر دوچرخه با هم به خیابان می‌رسند، فاصله از نزدیک‌ترین لبه‌ی مسیر دوچرخه حساب می‌شود."),
  S(True, "Jeg må ikke parkere på pladsen.", "I must not park in the space.", "نباید در آن جا پارک کنم.",
    "Pladsen ligger mindre end 10 m fra cykelstien, og der må hverken standses eller parkeres.",
    "The space is less than 10 m from the cycle path, and neither stopping nor parking is allowed there.",
    "این جا کمتر از ۱۰ متر با مسیر دوچرخه فاصله دارد و آن‌جا نه توقف مجاز است نه پارک."),
  S(False, "Jeg må parkere, fordi der er mere end 10 m til sidevejens kørebane.",
    "I may park because it is more than 10 m to the side street's carriageway.",
    "می‌توانم پارک کنم، چون تا سواره‌روی خیابان فرعی بیش از ۱۰ متر فاصله است.",
    "Når cykelstien munder ud sammen med kørebanen, er det afstanden til cykelstien, der tæller.",
    "When the cycle path opens out together with the carriageway, it is the distance to the cycle path that counts.",
    "وقتی مسیر دوچرخه همراه با سواره‌رو به خیابان می‌رسد، فاصله تا مسیر دوچرخه ملاک است."),
  S(False, "Jeg må godt standse et øjeblik på pladsen og lade en passager stige ud.",
    "I may stop in the space for a moment and let a passenger out.",
    "می‌توانم لحظه‌ای آن‌جا بایستم تا مسافری پیاده شود.",
    "Forbuddet gælder både standsning og parkering.", "The ban covers both stopping and parking.",
    "این ممنوعیت هم توقف را شامل می‌شود و هم پارک را."),
)

Q(5602, "7.18", view("""
THE SCENE: a two-lane country road just past the top of a hill; the road behind us (in the interior rear-view mirror at the top of the
picture) drops away so that the road before the crest cannot be seen; the verge on the right is narrow; we are slowing down with our
right indicator lamp glowing on the dashboard strip.
MUST BE CLEARLY VISIBLE: the crest just behind us in the mirror, the narrow verge.
MUST NOT APPEAR: signs, text, other vehicles."""),
  "Du vil holde ind lige efter toppen af en bakke på landevejen og se på kortet. Hvad gælder?",
  "You want to pull in just after the top of a hill on a country road and look at the map. What applies?",
  "می‌خواهید درست بعد از بالای یک تپه در جاده‌ی بیرون شهر کنار بکشید و به نقشه نگاه کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må hverken standse eller parkere på eller i nærheden af bakketoppen.",
    "I may neither stop nor park on or near the hilltop.", "روی بالای تپه یا نزدیک آن نه می‌توانم توقف کنم و نه پارک.",
    "Biler, der kommer over bakken bagfra, kan ikke se din bil i tide.", "Cars coming over the hill from behind cannot see your car in time.",
    "خودروهایی که از پشت از بالای تپه می‌آیند، نمی‌توانند خودروی شما را به‌موقع ببینند."),
  S(False, "Det er tilladt, så længe havariblinket er tændt.", "It is allowed as long as the hazard lights are on.",
    "تا وقتی چراغ‌های فلاشر روشن است، مجاز است.",
    "Havariblinket gør ikke standsning tilladt, hvor den er forbudt.", "The hazard lights do not make stopping allowed where it is forbidden.",
    "چراغ فلاشر توقف را جایی که ممنوع است مجاز نمی‌کند."),
  S(False, "Det er tilladt, hvis jeg kun holder et par minutter.", "It is allowed if I only stand there for a couple of minutes.",
    "اگر فقط چند دقیقه بایستم، مجاز است.",
    "Forbuddet gælder også en kort standsning.", "The ban also covers a short stop.", "این ممنوعیت توقف کوتاه را هم شامل می‌شود."),
)

Q(5603, "7.18", town("""
THE SCENE: the end of a dead-end residential street widening into a round turning area; at its edge stands a blue square parking sign
with a white «P», and under it a blue plate showing a white horizontal arrow with heads at both ends; two cars stand crosswise at the
edge of the turning area, their fronts towards the kerb.
MUST BE CLEARLY VISIBLE: the turning area, the P sign with the horizontal arrow plate, the cars standing crosswise.
MUST NOT APPEAR: other signs, any text except the P."""),
  "For enden af en blind vej er der en vendeplads. Ved den står en P-tavle med en undertavle, der viser en vandret pil. Hvad gælder?",
  "At the end of a dead-end road there is a turning area. Beside it stands a P sign with a plate showing a horizontal arrow. What applies?",
  "در انتهای یک بن‌بست جای دور زدنی هست. کنار آن تابلوی P با زیرتابلویی قرار دارد که یک پیکان افقی نشان می‌دهد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må parkere på tværs af kørselsretningen.", "I may park crosswise to the direction of travel.",
    "می‌توانم عمود بر جهت حرکت پارک کنم.",
    "En undertavle med vandret pil under P-tavlen angiver parkering på tværs, fx på vendepladser.",
    "A plate with a horizontal arrow under the P sign means parking crosswise, for example at turning areas.",
    "زیرتابلو با پیکان افقی زیر تابلوی P یعنی پارک عمود بر جهت حرکت، مثلاً در جای دور زدن."),
  S(True, "Jeg skal stadig parkere, så andre kan vende og komme frem.", "I must still park so that others can turn round and get by.",
    "باز هم باید طوری پارک کنم که دیگران بتوانند دور بزنند و رد شوند.",
    "Parkering må ikke ske, så der opstår fare eller ulempe for færdslen.", "Parking must not cause danger or inconvenience to the traffic.",
    "پارک نباید برای ترافیک خطر یا مزاحمت ایجاد کند."),
  S(False, "Pilen viser, hvilken vej jeg skal køre for at finde en ledig plads.", "The arrow shows which way I must drive to find a free space.",
    "پیکان نشان می‌دهد برای پیدا کردن جای خالی به کدام طرف بروم.",
    "Pilen viser, hvordan bilerne må stå, ikke en vej at køre.", "The arrow shows how the cars may stand, not a way to drive.",
    "پیکان نشان می‌دهد خودروها چطور می‌توانند بایستند، نه این‌که از کدام طرف بروید."),
  S(False, "Pilen betyder, at der kun må parkeres på langs.", "The arrow means that parking is only allowed lengthwise.",
    "این پیکان یعنی فقط موازی با جاده می‌توان پارک کرد.",
    "Den vandrette pil angiver netop parkering på tværs.", "The horizontal arrow means precisely parking crosswise.",
    "پیکان افقی دقیقاً پارک عمودی را نشان می‌دهد."),
)

Q(5604, "7.18", town("""
THE SCENE: a town street; along the right kerb runs a parking lane separated from the carriageway by a broad unbroken white line;
cars are parked inside it; one free space is ahead; in the left door mirror (at the left edge of the picture) a car approaches from
behind.
MUST BE CLEARLY VISIBLE: the parking lane with its broad white line, the free space, the car in the door mirror.
MUST NOT APPEAR: signs, text."""),
  "Langs kantstenen er der en parkeringsbane, som er adskilt fra kørebanen med en bred hvid linje. Du vil parkere. Hvad gælder?",
  "Along the kerb there is a parking lane, separated from the carriageway by a broad white line. You want to park. What applies?",
  "کنار جدول یک خط پارک هست که با خطی سفید و پهن از سواره‌رو جدا شده است. می‌خواهید پارک کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen skal holde inden for parkeringsbanen.", "The car must stand inside the parking lane.", "خودرو باید داخل خط پارک بایستد.",
    "Er en parkeringsbane afmærket med bred kantlinje, skal køretøjet parkeres inden for den.",
    "Where a parking lane is marked with a broad edge line, the vehicle must be parked inside it.",
    "وقتی خط پارک با خط کناری پهن مشخص شده، خودرو باید داخل آن پارک شود."),
  S(True, "Hjulene må gerne stå på den brede linje, men ikke ud over den.", "The wheels may stand on the broad line, but not beyond it.",
    "چرخ‌ها می‌توانند روی خط پهن باشند، ولی نه بیرون از آن.",
    "Det er tilladt at holde med hjulene på afmærkningen, men de må ikke overskride den brede linje.",
    "You may stand with the wheels on the marking, but they must not cross the broad line.",
    "ایستادن با چرخ روی خط مجاز است، ولی چرخ‌ها نباید از خط پهن عبور کنند."),
  S(True, "Før jeg åbner døren mod kørebanen, ser jeg efter trafik bagfra.", "Before I open the door towards the carriageway, I look for traffic from behind.",
    "پیش از باز کردن درِ سمت سواره‌رو، ترافیکی را که از پشت می‌آید می‌پایم.",
    "Døre skal åbnes, så der ikke opstår fare eller unødig ulempe.", "Doors must be opened so that no danger or undue inconvenience arises.",
    "درها باید طوری باز شوند که خطر یا مزاحمت بی‌دلیل پیش نیاید."),
  S(False, "Er bilen bred, må den stå lidt ude på kørebanen.", "If the car is wide, it may stand a little out in the carriageway.",
    "اگر خودرو پهن باشد، می‌تواند کمی بیرون، روی سواره‌رو بایستد.",
    "Hjulene må ikke komme ud over den brede linje, uanset bilens bredde.", "The wheels must not go beyond the broad line, whatever the car's width.",
    "چرخ‌ها، هر قدر هم خودرو پهن باشد، نباید از خط پهن بیرون بروند."),
)

Q(5605, "7.18", town("""
THE SCENE: a harbour area paved with cobbles; railway tracks are set into the paving and run along a quay; our car is parked close beside
the nearest rail; warehouses in the background; no train in sight.
MUST BE CLEARLY VISIBLE: the rails set into the paving, our car parked close beside them.
MUST NOT APPEAR: signs, text, trains."""),
  "Du har parkeret på en havneplads, hvor der ligger jernbanespor i belægningen. Bilen holder under 2 m fra den nærmeste skinne. "
  "Hvad gælder?",
  "You have parked in a harbour area with railway tracks set into the paving. The car is less than 2 m from the nearest rail. What applies?",
  "در محوطه‌ای در بندر پارک کرده‌اید که ریل قطار در سنگفرش آن هست. خودرو کمتر از ۲ متر با نزدیک‌ترین ریل فاصله دارد. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg må ikke gå længere væk, end at jeg hele tiden kan holde øje med trafikken på sporet.",
    "I must not go further away than I can keep an eye on the traffic on the track all the time.",
    "نباید آن‌قدر دور شوم که نتوانم همیشه مراقب تردد روی ریل باشم.",
    "Holder køretøjet inden for 2 m fra nærmeste skinne, må føreren ikke fjerne sig længere, end at han kan være opmærksom på sporet.",
    "If the vehicle stands within 2 m of the nearest rail, the driver must not go further away than he can watch the track.",
    "اگر وسیله کمتر از ۲ متر با نزدیک‌ترین ریل فاصله داشته باشد، راننده نباید آن‌قدر دور شود که نتواند ریل را زیر نظر داشته باشد."),
  S(True, "Kommer der et tog, skal jeg flytte bilen, uden at nogen beder mig om det.",
    "If a train comes, I must move the car without anyone asking me to.",
    "اگر قطاری بیاید، باید خودرو را بی‌آن‌که کسی بخواهد جابه‌جا کنم.",
    "Når det kan ses eller høres, at et tog nærmer sig, skal føreren uopfordret fjerne køretøjet.",
    "When it can be seen or heard that a train is approaching, the driver must move the vehicle without being asked.",
    "وقتی دیده یا شنیده شود که قطاری نزدیک می‌شود، راننده باید خودش وسیله را بردارد."),
  S(False, "Jeg må gå fra bilen, når jeg har tændt havariblinket.", "I may leave the car once I have switched on the hazard lights.",
    "وقتی چراغ‌های فلاشر را روشن کردم، می‌توانم از خودرو دور شوم.",
    "Havariblinket ændrer ikke din pligt til at blive i nærheden.", "The hazard lights do not change your duty to stay nearby.",
    "چراغ فلاشر وظیفه‌ی شما برای ماندن در نزدیکی خودرو را تغییر نمی‌دهد."),
  S(False, "Toget må vente, til jeg kommer tilbage.", "The train must wait until I come back.", "قطار باید صبر کند تا من برگردم.",
    "Det er dig, der skal flytte bilen, når et tog nærmer sig.", "It is you who must move the car when a train approaches.",
    "این شما هستید که باید وقتی قطار نزدیک می‌شود خودرو را جابه‌جا کنید."),
)

Q(5606, "7.18", town("""
THE SCENE: a narrow town street with houses close to the pavement; on the right pavement stands a blue square sign showing a white car
standing with its right-hand wheels up on a raised pavement (the Danish sign that allows stopping and parking partly on the pavement);
the opposite side of the street has no such sign.
MUST BE CLEARLY VISIBLE: the sign on the right, the raised pavement, the opposite side without a sign.
MUST NOT APPEAR: other signs, text."""),
  "I en smal gade står denne tavle, som tillader standsning og parkering med en del af køretøjet på fortovet. Hvad gælder?",
  "In a narrow street there is this sign, which allows stopping and parking with part of the vehicle on the pavement. What applies?",
  "در خیابانی باریک این تابلو قرار دارد که توقف و پارک با بخشی از خودرو روی پیاده‌رو را مجاز می‌کند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må parkere med en del af bilen på fortovet i den side af gaden, hvor tavlen står.",
    "I may park with part of the car on the pavement on the side of the street where the sign stands.",
    "می‌توانم در همان سمتی از خیابان که تابلو هست، با بخشی از خودرو روی پیاده‌رو پارک کنم.",
    "Tavlen tillader det, og den gælder i den vejside, hvor den er sat op.", "The sign allows it, and it applies on the side of the road where it is put up.",
    "این تابلو آن را مجاز می‌کند و در همان سمتی از جاده معتبر است که نصب شده."),
  S(False, "Jeg må parkere med hele bilen på fortovet.", "I may park with the whole car on the pavement.", "می‌توانم کل خودرو را روی پیاده‌رو پارک کنم.",
    "Tavlen tillader kun, at en del af køretøjet står på fortovet.", "The sign only allows part of the vehicle to stand on the pavement.",
    "این تابلو فقط اجازه می‌دهد بخشی از خودرو روی پیاده‌رو باشد."),
  S(False, "Tavlen gælder også i den modsatte side af gaden.", "The sign also applies on the opposite side of the street.",
    "این تابلو در سمت مقابل خیابان هم معتبر است.",
    "Tavler for standsning og parkering gælder kun i den vejside, hvor de er sat op.",
    "Signs for stopping and parking only apply on the side of the road where they are put up.",
    "تابلوهای توقف و پارک فقط در همان سمتی از جاده معتبرند که نصب شده‌اند."),
  S(False, "Det ville også være tilladt uden tavlen.", "It would also be allowed without the sign.", "بدون این تابلو هم مجاز بود.",
    "I byen må du ikke standse eller parkere på fortovet, medmindre det er tilladt ved afmærkning.",
    "In town you must not stop or park on the pavement unless markings allow it.",
    "در شهر نباید روی پیاده‌رو توقف یا پارک کنید، مگر آن‌که علائم اجازه دهند."),
)

Q(5607, "7.9", town("""
THE SCENE: a wide town street; a light-rail tram runs ahead of us on tracks in the middle of the road; to the right of the tram there is
a free lane in our direction; the road ahead beside the tram can be seen clearly.
MUST BE CLEARLY VISIBLE: the tram in the middle of the road, the free lane to its right.
MUST NOT APPEAR: signs, text."""),
  "Et letbanetog kører foran dig i sporet midt på vejen. Du vil gerne forbi det. Hvad gælder?",
  "A light-rail tram is running ahead of you on the track in the middle of the road. You would like to get past it. What applies?",
  "یک قطار شهری سبک جلوی شما روی ریل وسط خیابان حرکت می‌کند. می‌خواهید از آن رد شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må overhale letbanetoget højre om, når det ikke spærrer udsynet, så det kan ske uden fare.",
    "I may overtake the tram on the right when it does not block the view, so that it can be done safely.",
    "وقتی قطار جلوی دید را نگرفته و بی‌خطر است، می‌توانم از سمت راست از آن سبقت بگیرم.",
    "Overhaling højre om et letbanekøretøj er tilladt, hvis det ikke spærrer for udsynet i en sådan grad, at det ikke kan ske uden fare.",
    "Overtaking a light-rail vehicle on the right is allowed if it does not block the view so much that it cannot be done safely.",
    "سبقت از سمت راستِ قطار شهری سبک مجاز است، اگر آن‌قدر جلوی دید را نگیرد که سبقت بی‌خطر ممکن نباشد."),
  S(True, "Jeg skal være særligt agtpågivende, når jeg overhaler letbanetoget.", "I must take special care when I overtake the tram.",
    "هنگام سبقت از قطار شهری سبک باید احتیاط ویژه داشته باشم.",
    "Overhaling højre om letbanen skal ske med særlig agtpågivenhed.", "Overtaking the light rail on the right must be done with special care.",
    "سبقت از سمت راست قطار شهری سبک باید با احتیاط ویژه انجام شود."),
  S(False, "Et letbanetog må aldrig overhales.", "A tram may never be overtaken.", "هیچ‌وقت نباید از قطار شهری سبک سبقت گرفت.",
    "Det er tilladt at overhale letbanen højre om, når det kan ske uden fare.", "It is allowed to overtake the light rail on the right when it can be done safely.",
    "سبقت از سمت راست قطار شهری سبک، وقتی بی‌خطر باشد، مجاز است."),
  S(False, "Holder toget ved et stoppested, kører jeg hurtigt forbi, så jeg ikke er i vejen for passagererne.",
    "If the tram stops at a stop, I drive past quickly so that I am not in the passengers' way.",
    "اگر قطار در ایستگاه بایستد، سریع رد می‌شوم تا سر راه مسافران نباشم.",
    "Når letbanen holder for passagerer, skal farten være passende lav.", "When the light rail stops for passengers, the speed must be suitably low.",
    "وقتی قطار شهری سبک برای مسافران می‌ایستد، سرعت باید به اندازه‌ی کافی کم باشد."),
)

Q(5608, "7.9", view("""
THE SCENE: a street approaching a junction about 20 m ahead with no signs and no markings; just ahead of us a three-wheeled cargo bike
with a large box in front rides at the right edge.
MUST BE CLEARLY VISIBLE: the three-wheeled cargo bike with its two front wheels, the junction just ahead.
MUST NOT APPEAR: signs, text, brand names."""),
  "Lige før et kryds uden tavler kører en ladcykel med tre hjul foran dig. Hvad gælder for overhaling?",
  "Just before a junction without signs, a three-wheeled cargo bike is riding in front of you. What applies to overtaking?",
  "درست پیش از تقاطعی بدون تابلو، یک دوچرخه‌ی باری سه‌چرخ جلوی شما حرکت می‌کند. درباره‌ی سبقت چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke overhale ladcyklen lige før eller i krydset.", "I must not overtake the cargo bike just before or in the junction.",
    "درست پیش از تقاطع یا داخل آن نباید از دوچرخه‌ی باری سبقت بگیرم.",
    "Undtagelsen, der tillader overhaling i kryds, gælder kun tohjulede cykler og tohjulede små knallerter.",
    "The exception that allows overtaking at junctions only covers two-wheeled bicycles and two-wheeled small mopeds.",
    "استثنایی که سبقت در تقاطع را مجاز می‌کند فقط برای دوچرخه‌ها و موتور گازی‌های کوچکِ دوچرخ است."),
  S(False, "Jeg må overhale, fordi cykler altid må overhales i kryds.", "I may overtake because bicycles may always be overtaken at junctions.",
    "می‌توانم سبقت بگیرم، چون همیشه می‌شود در تقاطع از دوچرخه سبقت گرفت.",
    "Det gælder kun tohjulede cykler; en ladcykel med tre hjul er ikke omfattet.", "That only applies to two-wheeled bicycles; a three-wheeled cargo bike is not covered.",
    "این فقط برای دوچرخه‌های دوچرخ است؛ دوچرخه‌ی باری سه‌چرخ شامل آن نمی‌شود."),
  S(False, "Jeg må overhale, hvis jeg giver lydsignal først.", "I may overtake if I sound the horn first.", "اگر اول بوق بزنم، می‌توانم سبقت بگیرم.",
    "Hornet må kun bruges for at forebygge eller afværge fare, og det gør ikke overhalingen tilladt.",
    "The horn may only be used to prevent or avert danger, and it does not make the overtaking allowed.",
    "بوق فقط برای پیشگیری یا دفع خطر است و سبقت را مجاز نمی‌کند."),
)

Q(5609, "7.9", view("""
THE SCENE: a two-lane country road with a broken centre line; ahead of us a grey car is pulling out to overtake a long lorry; the grey
car hides the oncoming lane beyond it; there is a short gap in front of the lorry.
MUST BE CLEARLY VISIBLE: the grey car pulling out, the lorry, the hidden oncoming lane beyond the grey car.
MUST NOT APPEAR: signs, text."""),
  "Bilen foran dig trækker ud for at overhale en lastbil. Du overvejer at følge lige efter og overhale samtidig. Hvad gælder?",
  "The car in front of you pulls out to overtake a lorry. You are considering following right behind and overtaking at the same time. "
  "What applies?",
  "خودروی جلوی شما برای سبقت از یک کامیون به چپ می‌رود. فکر می‌کنید درست پشت سرش بروید و هم‌زمان سبقت بگیرید. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen foran skjuler vejen, så jeg ikke selv kan se, om der kommer modkørende.",
    "The car in front hides the road, so that I cannot see for myself whether anything is coming.",
    "خودروی جلو جاده را پنهان می‌کند، پس خودم نمی‌توانم ببینم کسی از روبه‌رو می‌آید یا نه.",
    "Du skal selv sikre dig, at vognbanen er fri for modkørende på en tilstrækkeligt lang strækning.",
    "You must make sure yourself that the lane is clear of oncoming traffic for a long enough stretch.",
    "خودتان باید مطمئن شوید که خط در مسافت کافی از ترافیک روبه‌رو خالی است."),
  S(True, "Jeg venter, til jeg selv kan se, at der er frit, og at der er plads til at komme ind foran lastbilen.",
    "I wait until I can see for myself that the road is clear and that there is room to get in in front of the lorry.",
    "صبر می‌کنم تا خودم ببینم راه باز است و جلوی کامیون جا برای برگشتن هست.",
    "Efter overhalingen skal du kunne køre ind igen uden at være til ulempe.", "After the overtaking you must be able to get back in without causing inconvenience.",
    "پس از سبقت باید بتوانید بدون ایجاد مزاحمت به خط برگردید."),
  S(False, "Når bilen foran kan nå det, kan jeg også.", "If the car in front can make it, so can I.", "اگر خودروی جلو بتواند، من هم می‌توانم.",
    "Du har brug for mere tid og plads end bilen foran, og der skal være plads til jer begge.",
    "You need more time and room than the car in front, and there must be room for you both.",
    "شما زمان و جای بیشتری از خودروی جلو لازم دارید و باید برای هر دو نفرتان جا باشد."),
  S(False, "Der er altid plads til to biler foran en lastbil.", "There is always room for two cars in front of a lorry.",
    "جلوی کامیون همیشه برای دو خودرو جا هست.",
    "Det er ikke sikkert, og lastbilen må ikke presses til at bremse.", "That is not certain, and the lorry must not be forced to brake.",
    "این مطمئن نیست و کامیون نباید مجبور به ترمز شود."),
)

Q(5610, "7.9", view("""
THE SCENE: a two-lane country road; we are in the oncoming lane alongside the rear half of a slow grey car we are overtaking; ahead an
oncoming car is much closer than it seemed, its headlights on.
MUST BE CLEARLY VISIBLE: the slow car beside us, the oncoming car close ahead in our lane.
MUST NOT APPEAR: signs, text."""),
  "Du er begyndt at overhale en langsom bil, men opdager, at en modkørende bil er meget nærmere, end du troede. Hvad gør du?",
  "You have started to overtake a slow car, but you notice that an oncoming car is much closer than you thought. What do you do?",
  "سبقت از خودرویی کُند را شروع کرده‌اید، ولی می‌بینید خودروی روبه‌رو خیلی نزدیک‌تر از آن است که فکر می‌کردید. چه می‌کنید؟",
  S(True, "Jeg afbryder overhalingen og kører ind bag bilen igen, hvis jeg kan nå det.",
    "I abandon the overtaking and get back in behind the car if I can make it.",
    "سبقت را رها می‌کنم و اگر برسم، دوباره پشت آن خودرو برمی‌گردم.",
    "Det er den sikreste løsning, når der ikke er plads til at gennemføre overhalingen.",
    "That is the safest solution when there is no room to complete the overtaking.",
    "وقتی جا برای تمام کردن سبقت نیست، این امن‌ترین راه است."),
  S(False, "Jeg sætter farten op og regner med, at den modkørende bremser.", "I speed up and count on the oncoming car braking.",
    "سرعتم را بالا می‌برم و روی ترمز گرفتن خودروی روبه‌رو حساب می‌کنم.",
    "Du kan ikke regne med, at den modkørende kan standse i tide.", "You cannot count on the oncoming car being able to stop in time.",
    "نمی‌توانید روی این حساب کنید که خودروی روبه‌رو به‌موقع بایستد."),
  S(False, "Jeg blinker med lyset, så den modkørende kører ud i rabatten.", "I flash my lights so that the oncoming car drives onto the verge.",
    "چراغ می‌زنم تا خودروی روبه‌رو به حاشیه برود.",
    "Den modkørende har måske ingen plads, og et lyssignal giver dig ingen ret.",
    "The oncoming car may have no room, and a light signal gives you no right.",
    "ممکن است خودروی روبه‌رو جایی نداشته باشد و علامت نوری به شما حقی نمی‌دهد."),
  S(False, "Jeg fortsætter med samme fart; det går nok.", "I carry on at the same speed; it will probably be fine.",
    "با همان سرعت ادامه می‌دهم؛ احتمالاً مشکلی پیش نمی‌آید.",
    "Er afstanden for kort, kan det ende i et frontalsammenstød.", "If the distance is too short, it can end in a head-on collision.",
    "اگر فاصله خیلی کم باشد، ممکن است به تصادف رودررو بینجامد."),
)

Q(5611, "7.9", view("""
THE SCENE: a two-lane country road with a broken centre line; about 40 m ahead a slow tractor drives in our lane; on the right verge
stands a red-bordered white warning triangle (point up) showing a road whose two edges come closer together (the warning sign for a
narrowing road); further ahead the road narrows between two kerbed islands.
MUST BE CLEARLY VISIBLE: the tractor, the warning sign for the narrowing road, the narrowing further ahead.
MUST NOT APPEAR: other signs, text."""),
  "Du vil overhale en traktor på landevejen. Lidt længere fremme står denne tavle. Hvad gælder?",
  "You want to overtake a tractor on a country road. A little further ahead stands this sign. What applies?",
  "می‌خواهید در جاده‌ی بیرون شهر از یک تراکتور سبقت بگیرید. کمی جلوتر این تابلو قرار دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Tavlen advarer om, at vejen bliver smallere længere fremme.", "The sign warns that the road becomes narrower further ahead.",
    "این تابلو هشدار می‌دهد که جاده جلوتر باریک‌تر می‌شود.",
    "Det er advarselstavlen for indsnævret vej.", "It is the warning sign for a narrowing road.", "این تابلوی هشدارِ باریک شدن جاده است."),
  S(True, "Jeg overhaler kun, hvis jeg kan komme helt forbi og ind igen før indsnævringen.",
    "I only overtake if I can get fully past and back in before the narrowing.",
    "فقط وقتی سبقت می‌گیرم که بتوانم پیش از باریک‌شدگی کاملاً رد شوم و برگردم.",
    "Der må ikke være nogen hindring for overhalingen, og du skal kunne køre ind igen uden at være til ulempe.",
    "There must be no obstacle to the overtaking, and you must be able to get back in without causing inconvenience.",
    "نباید مانعی برای سبقت باشد و باید بتوانید بدون مزاحمت برگردید."),
  S(True, "Kan jeg ikke nå det, bliver jeg bag traktoren, til vejen er bred igen.",
    "If I cannot make it, I stay behind the tractor until the road is wide again.",
    "اگر نرسم، پشت تراکتور می‌مانم تا جاده دوباره پهن شود.",
    "Det er sikrere at vente end at blive klemt i indsnævringen.", "It is safer to wait than to be squeezed in the narrowing.",
    "صبر کردن امن‌تر از گیر افتادن در باریک‌شدگی است."),
  S(False, "Traktoren skal holde ind ved indsnævringen, så jeg kan komme forbi.", "The tractor must pull in at the narrowing so that I can get past.",
    "تراکتور باید در باریک‌شدگی کنار بکشد تا من رد شوم.",
    "Ved indsnævringen er der ikke plads, og du kan ikke kræve, at traktoren gør plads der.",
    "At the narrowing there is no room, and you cannot demand that the tractor makes room there.",
    "در باریک‌شدگی جایی نیست و نمی‌توانید از تراکتور بخواهید آن‌جا جا باز کند."),
)

Q(5612, "6.1", view("""
THE SCENE: a two-lane road; on the right verge stands a red-bordered white warning triangle (point up) showing a black worker digging
with a shovel beside a small heap (the Danish warning sign for road works); further ahead cones and a small excavator can be seen at
the right edge.
MUST BE CLEARLY VISIBLE: the road-works warning sign, the cones and the excavator further ahead.
MUST NOT APPEAR: other signs, text, workers close to the camera."""),
  "Du kører forbi denne tavle. Hvad betyder den?",
  "You pass this sign. What does it mean?",
  "از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Der er vejarbejde længere fremme.", "There are road works further ahead.", "جلوتر کار جاده‌ای در جریان است.",
    "Tavlen advarer om vejarbejde.", "The sign warns of road works.", "این تابلو درباره‌ی کار جاده‌ای هشدار می‌دهد."),
  S(True, "Hvor der arbejdes på vejen, skal jeg holde en passende lav hastighed.", "Where work is being done on the road, I must keep a suitably low speed.",
    "جایی که روی جاده کار می‌شود، باید سرعتم به اندازه‌ی کافی کم باشد.",
    "Ved arbejde på vejen skal farten være passende lav.", "Where there is work on the road, the speed must be suitably low.",
    "هنگام کار روی جاده، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(False, "Vejen er lukket for biler.", "The road is closed to cars.", "جاده برای خودروها بسته است.",
    "Det er en advarselstavle, ikke en forbudstavle.", "It is a warning sign, not a prohibitory sign.", "این تابلوی هشدار است، نه تابلوی ممنوعیت."),
  S(False, "Jeg skal standse ved tavlen og vente på et tegn fra vejarbejderne.", "I must stop at the sign and wait for a signal from the road workers.",
    "باید کنار تابلو بایستم و منتظر علامت کارگران بمانم.",
    "Tavlen er en advarsel; den giver ikke pligt til at standse.", "The sign is a warning; it gives no duty to stop.",
    "این تابلو هشدار است و وظیفه‌ی توقف ایجاد نمی‌کند."),
)

Q(5613, "6.1", view("""
THE SCENE: a two-lane country road; on the right verge stands a red-bordered white warning triangle (point up) showing a black road that
first bends to the right and then to the left; the road ahead disappears into a right-hand bend.
MUST BE CLEARLY VISIBLE: the warning sign with the double bend, the bend ahead.
MUST NOT APPEAR: other signs, text, vehicles."""),
  "Du kører forbi denne tavle. Hvad betyder den?",
  "You pass this sign. What does it mean?",
  "از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Der kommer flere farlige sving, og det første går til højre.", "Several dangerous bends are coming, and the first one is to the right.",
    "چند پیچ خطرناک در پیش است و اولی به راست است.",
    "Tavlen advarer om flere farlige vejsving, det første til højre.", "The sign warns of several dangerous bends, the first to the right.",
    "این تابلو درباره‌ی چند پیچ خطرناک هشدار می‌دهد که اولی به راست است."),
  S(False, "Der kommer ét farligt sving til venstre.", "One dangerous bend to the left is coming.", "یک پیچ خطرناک به چپ در پیش است.",
    "Tavlen viser flere sving, og det første er til højre.", "The sign shows several bends, and the first one is to the right.",
    "این تابلو چند پیچ را نشان می‌دهد و اولی به راست است."),
  S(False, "Vejen deler sig længere fremme.", "The road forks further ahead.", "جاده جلوتر دو شاخه می‌شود.",
    "Tavlen advarer om sving, ikke om en vejforgrening.", "The sign warns of bends, not of a fork in the road.",
    "این تابلو درباره‌ی پیچ هشدار می‌دهد، نه دوشاخه شدن جاده."),
)

Q(5614, "6.1", view("""
THE SCENE: a two-lane country road; on the right verge stand three tall white rectangular boards one after another, each with red
diagonal stripes; far ahead the road crosses a railway.
MUST BE CLEARLY VISIBLE: the three boards with red diagonal stripes, the railway crossing far ahead.
MUST NOT APPEAR: other signs, text, trains."""),
  "Langs vejen står disse hvide tavler med røde skråstriber. Hvad betyder de?",
  "These white boards with red diagonal stripes stand along the road. What do they mean?",
  "کنار جاده این تابلوهای سفید با نوارهای مورب قرمز قرار دارند. معنی‌شان چیست؟",
  S(True, "De viser afstanden til en jernbaneoverkørsel.", "They show the distance to a level crossing.", "فاصله تا یک تقاطع راه‌آهن را نشان می‌دهند.",
    "Afstandsmærkerne angiver afstanden til jernbaneoverkørslen.", "The distance markers show the distance to the level crossing.",
    "این علامت‌های فاصله، فاصله تا تقاطع راه‌آهن را نشان می‌دهند."),
  S(True, "Jeg afpasser farten, så jeg kan standse før sporene, hvis det bliver nødvendigt.",
    "I adjust my speed so that I can stop before the tracks if necessary.",
    "سرعتم را طوری تنظیم می‌کنم که در صورت لزوم بتوانم پیش از ریل‌ها بایستم.",
    "Ved en jernbaneoverkørsel skal farten afpasses, så standsning om nødvendigt kan ske før sporene.",
    "At a level crossing the speed must be adjusted so that you can stop before the tracks if necessary.",
    "در تقاطع راه‌آهن سرعت باید طوری باشد که در صورت لزوم بتوان پیش از ریل‌ها ایستاد."),
  S(False, "De viser, at vejen snart ender.", "They show that the road will soon end.", "نشان می‌دهند که جاده به‌زودی تمام می‌شود.",
    "De angiver afstanden til en jernbaneoverkørsel.", "They show the distance to a level crossing.", "فاصله تا تقاطع راه‌آهن را نشان می‌دهند."),
)

Q(5615, "6.1", view("""
THE SCENE: an open country road on an embankment between flat fields; on the right verge stands a red-bordered white warning triangle
(point up) showing a black windsock blowing out sideways (the warning sign for side wind); a windsock on a pole beside the road stands
out straight.
MUST BE CLEARLY VISIBLE: the warning sign with the windsock, the real windsock blowing.
MUST NOT APPEAR: other signs, text, aircraft.""", cond="windy day, dry road"),
  "Du kører forbi denne tavle. Hvad betyder den, og hvordan forholder du dig?",
  "You pass this sign. What does it mean, and what do you do?",
  "از کنار این تابلو می‌گذرید. معنی‌اش چیست و چه می‌کنید؟",
  S(True, "Der kan komme kraftige vindstød fra siden.", "There may be strong gusts from the side.", "ممکن است تندبادهای شدیدی از پهلو بوزد.",
    "Tavlen advarer om sidevind.", "The sign warns of side wind.", "این تابلو درباره‌ی باد پهلو هشدار می‌دهد."),
  S(True, "Jeg holder godt fast i rattet og sætter farten ned, hvis det blæser meget.",
    "I hold the wheel firmly and slow down if it is very windy.", "فرمان را محکم نگه می‌دارم و اگر باد شدید باشد، سرعتم را کم می‌کنم.",
    "Et vindstød kan skubbe bilen til siden.", "A gust can push the car to the side.", "تندباد ممکن است خودرو را به کنار هل دهد."),
  S(True, "Høje køretøjer, trailere og cyklister kan blive skubbet ud mod min vognbane.",
    "High vehicles, trailers and cyclists may be pushed out towards my lane.",
    "وسایل بلند، تریلرها و دوچرخه‌سواران ممکن است به سمت خط من رانده شوند.",
    "Høje og lette køretøjer er særligt følsomme for sidevind.", "High and light vehicles are especially sensitive to side wind.",
    "وسایل بلند و سبک به‌ویژه در برابر باد پهلو حساس‌اند."),
  S(False, "Tavlen viser, at der er en lufthavn i nærheden.", "The sign shows that there is an airport nearby.", "این تابلو نشان می‌دهد که فرودگاهی در نزدیکی است.",
    "Tavlen viser en vindpose og advarer om sidevind; lavtgående fly har en anden tavle.",
    "The sign shows a windsock and warns of side wind; low-flying aircraft have another sign.",
    "این تابلو یک بادنما نشان می‌دهد و درباره‌ی باد پهلو هشدار می‌دهد؛ هواپیمای کم‌ارتفاع تابلوی دیگری دارد."),
)

Q(5616, "6.1", town("""
THE SCENE: the entrance to a narrow street over a small old bridge; at the entrance stands a round white sign with a red border showing
the black text «2 t» (the Danish sign for a total-weight limit).
MUST BE CLEARLY VISIBLE: the round sign with «2 t», the small bridge.
MUST NOT APPEAR: other signs, any other text."""),
  "Ved indkørslen til en vej står denne tavle. Din bil med passagerer og bagage vejer i alt omkring 2,3 t. Hvad gælder?",
  "This sign stands at the entrance to a road. Your car with passengers and luggage weighs about 2.3 t in all. What applies?",
  "در ورودی یک راه این تابلو قرار دارد. خودروی شما با سرنشینان و بار روی هم حدود ۲٫۳ تن وزن دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre ind ad vejen, fordi bilens faktiske vægt er over 2 t.", "I must not drive into the road, because the car's actual weight is over 2 t.",
    "نباید وارد این راه شوم، چون وزن واقعی خودرو بیش از ۲ تن است.",
    "Tavlen forbyder kørsel med køretøjer, hvis faktiske totalvægt er større end den angivne.",
    "The sign bans vehicles whose actual total weight is greater than the one shown.",
    "این تابلو تردد وسایلی را ممنوع می‌کند که وزن کل واقعی‌شان بیشتر از عدد روی تابلو است."),
  S(False, "Tavlen gælder kun for lastbiler og busser.", "The sign only applies to lorries and buses.", "این تابلو فقط برای کامیون‌ها و اتوبوس‌هاست.",
    "Den gælder for alle køretøjer, hvis faktiske vægt er over grænsen.", "It applies to all vehicles whose actual weight is over the limit.",
    "برای همه‌ی وسایلی است که وزن واقعی‌شان از این حد بیشتر است."),
  S(False, "Det er den tilladte totalvægt i registreringsattesten, der tæller.", "It is the permitted total weight in the registration certificate that counts.",
    "وزن کل مجازِ ثبت‌شده در مدارک خودرو ملاک است.",
    "Det er den faktiske vægt, der tæller, altså bilen med det, den er lastet med.",
    "It is the actual weight that counts, that is, the car with what it is carrying.",
    "وزن واقعی ملاک است، یعنی خودرو همراه با هر چه با خود دارد."),
  S(False, "Kører jeg med trailer, gælder grænsen for bil og trailer tilsammen.", "If I tow a trailer, the limit applies to car and trailer together.",
    "اگر تریلر داشته باشم، این حد برای خودرو و تریلر روی هم است.",
    "Ved vogntog gælder vægtgrænsen for hvert enkelt køretøj i vogntoget.", "For a combination the weight limit applies to each vehicle in it.",
    "در خودرو با تریلر، این حد برای هر کدام از وسایل جداگانه است."),
)

Q(5617, "7.6", view("""
THE SCENE: a country road; a yellow school bus has just pulled away from a stop on the right and drives off ahead; three children with
school bags still stand on the verge at the stop, one of them looking across the road towards a house on the left.
MUST BE CLEARLY VISIBLE: the school bus driving away, the children on the verge, the child looking across the road.
MUST NOT APPEAR: signs other than the bus-stop pole, text."""),
  "En skolebus er lige kørt fra et stoppested. Nogle børn står stadig i vejkanten. Hvordan forholder du dig?",
  "A school bus has just left a stop. Some children are still standing at the edge of the road. What do you do?",
  "یک اتوبوس مدرسه همین حالا از ایستگاه راه افتاده است. چند کودک هنوز کنار جاده ایستاده‌اند. چه می‌کنید؟",
  S(True, "Jeg er særligt agtpågivende, også nu hvor bussen kører fra stedet.", "I take special care, also now that the bus is leaving.",
    "احتیاط ویژه دارم، حتی حالا که اتوبوس در حال رفتن است.",
    "Der skal udvises særlig agtpågivenhed, både når en skolebus holder, og når den forlader stedet.",
    "Special care must be taken both when a school bus has stopped and when it leaves.",
    "هم وقتی اتوبوس مدرسه ایستاده و هم وقتی راه می‌افتد، باید احتیاط ویژه داشت."),
  S(True, "Et barn kan løbe over vejen, når bussen er kørt.", "A child may run across the road once the bus has gone.",
    "ممکن است کودکی پس از رفتن اتوبوس از عرض جاده بدود.",
    "Børnene har måske ventet på, at bussen kørte, før de vil over.", "The children may have waited for the bus to go before crossing.",
    "شاید بچه‌ها منتظر رفتن اتوبوس بوده‌اند تا از جاده رد شوند."),
  S(True, "Jeg holder farten nede, indtil jeg er forbi børnene.", "I keep my speed down until I am past the children.",
    "تا از کنار بچه‌ها رد نشده‌ام، سرعتم را پایین نگه می‌دارم.",
    "Der skal holdes en passende lav hastighed, hvor du nærmer dig børn på eller ved vejen.",
    "A suitably low speed must be kept where you approach children on or beside the road.",
    "جایی که به کودکانِ روی جاده یا کنار آن نزدیک می‌شوید، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(False, "Når bussen er kørt, er der ikke længere grund til at være forsigtig.", "Once the bus has gone, there is no longer any reason to be careful.",
    "وقتی اتوبوس رفت، دیگر دلیلی برای احتیاط نیست.",
    "Børnene står stadig ved vejen og kan gå ud på kørebanen.", "The children are still beside the road and may step into the carriageway.",
    "بچه‌ها هنوز کنار جاده‌اند و ممکن است وارد سواره‌رو شوند."),
)

Q(5618, "7.6", view("""
THE SCENE: a two-lane country road between fields; about 40 m ahead a horse pulls a small two-wheeled cart with a driver at the right
edge of the road; an oncoming car can be seen far away.
MUST BE CLEARLY VISIBLE: the horse and cart at the right edge, the oncoming car far away.
MUST NOT APPEAR: signs, text."""),
  "Foran dig kører en hestevogn i højre side af vejen. Hvordan forholder du dig?",
  "A horse-drawn cart is driving on the right side of the road in front of you. What do you do?",
  "جلوی شما یک درشکه در سمت راست جاده حرکت می‌کند. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og kører først forbi, når jeg kan give god plads.", "I slow down and only pass when I can give plenty of room.",
    "سرعتم را کم می‌کنم و فقط وقتی جای کافی هست از کنارش رد می‌شوم.",
    "Hvor du nærmer dig heste på vejen, skal du holde en passende lav hastighed.", "Where you approach horses on the road, you must keep a suitably low speed.",
    "وقتی به اسب‌هایی روی جاده نزدیک می‌شوید، باید سرعت به اندازه‌ی کافی کم باشد."),
  S(True, "Jeg undgår at dytte og kører roligt forbi.", "I avoid sounding the horn and pass calmly.", "از بوق زدن پرهیز می‌کنم و آرام رد می‌شوم.",
    "Hesten kan blive skræmt og springe ud.", "The horse may be frightened and jump out.", "ممکن است اسب بترسد و به بیرون بپرد."),
  S(False, "Jeg kører tæt forbi, så jeg hurtigt er væk fra hesten.", "I pass close by so that I am quickly away from the horse.",
    "از نزدیکش رد می‌شوم تا زود از اسب دور شوم.",
    "En hest kan bevæge sig uforudsigeligt, så du skal give god plads.", "A horse can move unpredictably, so you must give plenty of room.",
    "اسب ممکن است رفتار غیرقابل‌پیش‌بینی داشته باشد، پس باید جای کافی بدهید."),
  S(False, "Hestevogne må ikke køre på landevejen.", "Horse-drawn carts are not allowed on the country road.", "درشکه نباید در جاده‌ی بیرون شهر حرکت کند.",
    "Hestekøretøjer må gerne køre på vejen.", "Horse-drawn vehicles may use the road.", "وسایل اسب‌کش اجازه دارند روی جاده حرکت کنند."),
)

Q(5619, "7.6", town("""
THE SCENE: a town street; about 25 m ahead a zebra crossing without traffic lights; a man stands at the kerb right at the crossing,
talking on a phone and looking down; nobody is on the crossing.
MUST BE CLEARLY VISIBLE: the zebra crossing, the man at the kerb on the phone.
MUST NOT APPEAR: signs other than the crossing's own sign, text."""),
  "Ved et fodgængerfelt uden lyssignal står en mand og taler i telefon. Du kan ikke se, om han vil gå over. Hvordan forholder du dig?",
  "A man is standing at a pedestrian crossing without traffic lights, talking on the phone. You cannot tell whether he will cross. What "
  "do you do?",
  "مردی کنار خط عابر پیاده‌ی بدون چراغ ایستاده و با تلفن صحبت می‌کند. نمی‌دانید می‌خواهد رد شود یا نه. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned, så jeg kan standse, hvis han går ud i feltet.", "I slow down so that I can stop if he steps onto the crossing.",
    "سرعتم را کم می‌کنم تا اگر وارد خط عابر شد، بتوانم بایستم.",
    "Du skal afpasse farten, så der ikke opstår fare for gående, der er i feltet eller på vej ud i det.",
    "You must adjust your speed so that no danger arises for pedestrians on the crossing or about to step onto it.",
    "باید سرعت را طوری تنظیم کنید که برای عابرانی که روی خط عابرند یا می‌خواهند وارد آن شوند خطری پیش نیاید."),
  S(True, "Han kan pludselig gå ud uden at se sig for, fordi han er optaget af telefonen.",
    "He may suddenly step out without looking, because he is busy with the phone.",
    "ممکن است چون سرگرم تلفن است، ناگهان بی‌آن‌که نگاه کند وارد خیابان شود.",
    "En uopmærksom fodgænger kan handle uforudsigeligt.", "An inattentive pedestrian can act unpredictably.",
    "عابرِ بی‌حواس ممکن است رفتار غیرقابل‌پیش‌بینی داشته باشد."),
  S(False, "Han står stille, så jeg kan køre forbi med samme fart.", "He is standing still, so I can drive past at the same speed.",
    "او ایستاده است، پس می‌توانم با همان سرعت رد شوم.",
    "Han kan når som helst gå ud i feltet.", "He may step onto the crossing at any moment.", "او هر لحظه ممکن است وارد خط عابر شود."),
  S(False, "Jeg dytter, så han ved, at jeg kommer.", "I sound the horn so that he knows I am coming.", "بوق می‌زنم تا بداند که می‌آیم.",
    "Hornet må kun bruges for at forebygge eller afværge fare.", "The horn may only be used to prevent or avert danger.",
    "بوق فقط برای پیشگیری یا دفع خطر است."),
)

Q(5620, "7.6", view("""
THE SCENE: a narrow country road without pavement or path; about 40 m ahead a person walks at the far right edge of the road pushing
a bicycle, with their back to us.
MUST BE CLEARLY VISIBLE: the person pushing the bicycle at the right edge.
MUST NOT APPEAR: signs, text, other vehicles."""),
  "En person trækker en cykel i højre side af kørebanen med ryggen til dig. Der er hverken fortov eller sti. Hvad gælder?",
  "A person is pushing a bicycle on the right side of the carriageway with their back to you. There is neither pavement nor path. "
  "What applies?",
  "فردی در سمت راست سواره‌رو، پشت به شما، دوچرخه‌ای را با دست می‌برد. نه پیاده‌رو هست نه مسیر. چه قاعده‌ای برقرار است؟",
  S(True, "Personen regnes som gående.", "The person counts as a pedestrian.", "این فرد عابر پیاده حساب می‌شود.",
    "Den, der trækker en cykel, anses som gående.", "Someone pushing a bicycle is regarded as a pedestrian.",
    "کسی که دوچرخه را با دست می‌برد، عابر پیاده محسوب می‌شود."),
  S(True, "En gående, der trækker en cykel, skal gå yderst i højre side af kørebanen.",
    "A pedestrian pushing a bicycle must walk at the far right of the carriageway.",
    "عابری که دوچرخه را با دست می‌برد، باید در منتهی‌الیه سمت راست سواره‌رو راه برود.",
    "Gående på kørebanen går normalt i venstre side, men den, der trækker en cykel, skal gå i højre side.",
    "Pedestrians on the carriageway normally walk on the left, but someone pushing a bicycle must walk on the right.",
    "عابران روی سواره‌رو معمولاً در سمت چپ راه می‌روند، ولی کسی که دوچرخه را با دست می‌برد باید در سمت راست برود."),
  S(True, "Jeg giver personen god plads til siden, når jeg kører forbi.", "I give the person plenty of room to the side when I pass.",
    "هنگام رد شدن، از پهلو به او جای کافی می‌دهم.",
    "Kørende skal give gående fornøden plads på vejen.", "Drivers must give pedestrians enough room on the road.",
    "رانندگان باید به عابران جای کافی روی جاده بدهند."),
  S(False, "Personen burde gå i venstre side, så jeg dytter.", "The person ought to walk on the left, so I sound the horn.",
    "او باید در سمت چپ راه برود، پس بوق می‌زنم.",
    "Den, der trækker en cykel, skal netop gå i højre side, og hornet må kun bruges for at forebygge eller afværge fare.",
    "Someone pushing a bicycle must walk precisely on the right, and the horn may only be used to prevent or avert danger.",
    "کسی که دوچرخه را با دست می‌برد دقیقاً باید در سمت راست برود و بوق فقط برای پیشگیری یا دفع خطر است."),
)

Q(5621, "7.3", view("""
THE SCENE: a dark country road at night without street lights; our dipped beam lights the road straight ahead and the field beyond it,
while the road itself bends sharply to the left into darkness; reflecting edge posts curve away to the left.
MUST BE CLEARLY VISIBLE: the dipped beam lighting the field straight ahead, the dark bend to the left.
MUST NOT APPEAR: signs, text, other vehicles.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt. Du nærmer dig et sving til venstre, og nærlyset lyser lige frem ud over marken i stedet for ind i svinget. Hvordan "
  "forholder du dig?",
  "It is dark. You are approaching a bend to the left, and the dipped beam lights straight ahead over the field instead of into the bend. "
  "What do you do?",
  "هوا تاریک است. به پیچی به چپ نزدیک می‌شوید و نور پایین به‌جای داخل پیچ، مستقیم روی مزرعه می‌تابد. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned før svinget, fordi jeg ikke kan se, hvad der er inde i det.",
    "I slow down before the bend because I cannot see what is in it.", "پیش از پیچ سرعتم را کم می‌کنم، چون نمی‌بینم داخل آن چه هست.",
    "Der skal kunne standses på den strækning, du har udsyn over.", "You must be able to stop within the stretch you can see.",
    "باید بتوانید در مسافتی که می‌بینید بایستید."),
  S(True, "Jeg holder godt til højre gennem svinget.", "I keep well to the right through the bend.", "در طول پیچ کاملاً سمت راست می‌مانم.",
    "En modkørende kan dukke pludselig op i svinget.", "An oncoming vehicle may suddenly appear in the bend.",
    "ممکن است خودرویی از روبه‌رو ناگهان در پیچ ظاهر شود."),
  S(False, "Jeg tænder tågeforlygterne for at se længere ind i svinget.", "I switch on the front fog lights to see further into the bend.",
    "چراغ‌های مه‌شکن جلو را روشن می‌کنم تا داخل پیچ را بهتر ببینم.",
    "Tågelygter må kun bruges i tåge og under kraftig nedbør.", "Fog lights may only be used in fog and heavy precipitation.",
    "چراغ مه‌شکن فقط در مه و بارش شدید مجاز است."),
  S(False, "Jeg holder farten, fordi vejen var fri, før svinget begyndte.", "I keep my speed because the road was clear before the bend began.",
    "سرعتم را حفظ می‌کنم، چون جاده پیش از شروع پیچ خالی بود.",
    "Du kan ikke se, om der er noget inde i svinget.", "You cannot see whether there is anything in the bend.",
    "نمی‌بینید که داخل پیچ چیزی هست یا نه."),
)

Q(5622, "7.3", town("""
THE SCENE: a street outside a school on a quiet morning; on the right pavement stands a round white speed-limit sign with a red border
showing 40, and under it a white plate with the black text «7–17»; the school yard is empty.
MUST BE CLEARLY VISIBLE: the 40 sign, the plate with «7–17» in black.
MUST NOT APPEAR: other signs, any other text."""),
  "Ved en skole står en tavle med 40 km/t og undertavlen »7–17« med sort skrift. Det er lørdag formiddag. Hvad gælder?",
  "Outside a school there is a 40 km/h sign with the plate «7–17» in black. It is Saturday morning. What applies?",
  "کنار مدرسه‌ای تابلوی ۴۰ کیلومتر بر ساعت با زیرتابلوی «۷–۱۷» با نوشته‌ی سیاه قرار دارد. صبح شنبه است. چه قاعده‌ای برقرار است؟",
  S(True, "Grænsen på 40 km/t gælder kun på hverdage undtagen lørdage mellem kl. 7 og 17.",
    "The 40 km/h limit only applies on weekdays except Saturdays between 7 and 17.",
    "حد ۴۰ کیلومتر بر ساعت فقط روزهای کاری، به‌جز شنبه، بین ساعت ۷ تا ۱۷ معتبر است.",
    "Klokkeslæt med sort skrift gælder for hverdage undtagen lørdage.", "Times in black apply on weekdays except Saturdays.",
    "ساعت‌هایی که با رنگ سیاه نوشته شده‌اند برای روزهای کاری به‌جز شنبه است."),
  S(False, "Grænsen gælder hele døgnet alle dage.", "The limit applies around the clock every day.", "این حد در تمام شبانه‌روز و همه‌ی روزها معتبر است.",
    "Undertavlen begrænser tavlen til bestemte tidspunkter.", "The plate limits the sign to certain times.",
    "زیرتابلو اعتبار تابلو را به زمان‌های مشخصی محدود می‌کند."),
  S(False, "Tider med sort skrift gælder også om lørdagen.", "Times in black also apply on Saturdays.", "ساعت‌های سیاه شنبه‌ها هم معتبرند.",
    "Tider for lørdage står i parentes.", "Times for Saturdays are shown in brackets.", "ساعت‌های شنبه داخل پرانتز نوشته می‌شوند."),
)

Q(5623, "7.3", view("""
THE SCENE: a motorway with two lanes in our direction; on the dashboard strip a small lit symbol of a car with distance bars in front of
it (adaptive cruise control, no text); ahead in our lane the traffic is slowing down and a queue is forming.
MUST BE CLEARLY VISIBLE: the cruise-control symbol, the queue forming ahead.
MUST NOT APPEAR: signs, text, brand names."""),
  "Du kører på motorvejen med adaptiv fartpilot, som selv holder afstand til bilen foran. Hvad gælder?",
  "You are driving on the motorway with adaptive cruise control, which keeps the distance to the car in front by itself. What applies?",
  "در آزادراه با کروز کنترل تطبیقی می‌رانید که خودش فاصله را با خودروی جلو حفظ می‌کند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg har stadig selv ansvaret for farten og afstanden.", "I am still responsible myself for the speed and the distance.",
    "مسئولیت سرعت و فاصله همچنان با خودم است.",
    "Det er føreren, der skal afpasse farten efter forholdene.", "It is the driver who must adjust the speed to the conditions.",
    "این راننده است که باید سرعت را با شرایط تطبیق دهد."),
  S(True, "Systemet opdager ikke altid alt, fx en bil, der holder stille i køen.",
    "The system does not always detect everything, for example a car standing still in the queue.",
    "سیستم همیشه همه‌چیز را تشخیص نمی‌دهد، مثلاً خودرویی که در صف ایستاده است.",
    "Du skal holde øje med trafikken, som om du selv styrede farten.", "You must watch the traffic as if you were controlling the speed yourself.",
    "باید ترافیک را طوری زیر نظر داشته باشید که انگار خودتان سرعت را کنترل می‌کنید."),
  S(True, "Jeg er klar til selv at bremse.", "I am ready to brake myself.", "آماده‌ام خودم ترمز بگیرم.",
    "Du skal kunne gribe ind, hvis systemet ikke reagerer i tide.", "You must be able to step in if the system does not react in time.",
    "اگر سیستم به‌موقع واکنش نشان ندهد، باید بتوانید خودتان وارد عمل شوید."),
  S(False, "Systemet tager højde for vejr og føre, så det behøver jeg ikke selv tænke på.",
    "The system takes weather and road conditions into account, so I need not think about them myself.",
    "سیستم هوا و وضع جاده را در نظر می‌گیرد، پس لازم نیست خودم به آن فکر کنم.",
    "Systemet kan ikke vurdere fx glat vej; det skal du selv.", "The system cannot judge, for example, a slippery road; you must do that yourself.",
    "سیستم نمی‌تواند مثلاً لغزنده بودن جاده را بسنجد؛ این کار شماست."),
)

Q(5624, "1.2", picture("""
A car with a small open box trailer parked in a driveway; the trailer is heaped with loose, light garden waste (leaves, twigs and grass
cuttings); a folded net lies on the ground beside it; some leaves are already blowing off the top.
MUST BE CLEARLY VISIBLE: the loose garden waste on the open trailer, the folded net, the leaves blowing off.
MUST NOT APPEAR: text, number-plate characters, brand names."""),
  "Du skal køre haveaffald på genbrugspladsen i en åben trailer. Affaldet er løst og let. Hvad gælder?",
  "You are taking garden waste to the recycling centre in an open trailer. The waste is loose and light. What applies?",
  "می‌خواهید زباله‌ی باغچه را با تریلری روباز به مرکز بازیافت ببرید. زباله‌ها شل و سبک‌اند. چه قاعده‌ای برقرار است؟",
  S(True, "Lasten skal være sikret, så intet kan falde eller blæse af på vejen.", "The load must be secured so that nothing can fall or blow off onto the road.",
    "بار باید طوری محکم شود که چیزی روی جاده نیفتد یا باد نبرد.",
    "Gods må ikke kunne falde af på vejbanen eller være til fare for andre.", "Goods must not be able to fall onto the road or endanger others.",
    "بار نباید بتواند روی جاده بیفتد یا برای دیگران خطرناک باشد."),
  S(True, "Et net eller en presenning over lasten kan forhindre, at affaldet blæser af.",
    "A net or a tarpaulin over the load can stop the waste blowing off.", "یک تور یا برزنت روی بار می‌تواند جلوی پراکنده شدن زباله را بگیرد.",
    "Løst og let gods kan blæse af under kørslen.", "Loose and light goods can blow off while driving.",
    "بار شل و سبک ممکن است هنگام رانندگی با باد بیرون بریزد."),
  S(False, "Det er i orden, når jeg kører langsomt.", "It is fine as long as I drive slowly.", "اگر آهسته برانم، اشکالی ندارد.",
    "Gods skal være sikret uanset farten.", "Goods must be secured whatever the speed.", "بار با هر سرعتی باید محکم شده باشد."),
  S(False, "Lasten må gerne dække trailerens baglygter og nummerplade på en kort tur.",
    "On a short trip the load may cover the trailer's rear lights and number plate.",
    "در مسیری کوتاه، بار می‌تواند چراغ‌های عقب و پلاک تریلر را بپوشاند.",
    "Gods må ikke skjule påbudte lygter eller nummerpladen.", "Goods must not hide required lights or the number plate.",
    "بار نباید چراغ‌های الزامی یا پلاک را بپوشاند."),
)

Q(5625, "10.3", view("""
THE SCENE: a road with road works on the right side, marked with cones and a barrier; at the start stands a temporary round white
speed-limit sign with a red border showing 50 on a yellow board; a worker in a high-visibility jacket stands near the cones.
MUST BE CLEARLY VISIBLE: the temporary 50 sign, the cones, the worker.
MUST NOT APPEAR: other signs, text."""),
  "Ved et vejarbejde er hastigheden midlertidigt sat ned til 50 km/t. Du kører 75 km/t. Hvad gælder?",
  "At road works the speed limit has been temporarily lowered to 50 km/h. You are doing 75 km/h. What applies?",
  "کنار یک کار جاده‌ای، حد سرعت موقتاً به ۵۰ کیلومتر بر ساعت کاهش یافته است. شما ۷۵ کیلومتر بر ساعت می‌رانید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg risikerer at miste kørekortet, fordi jeg kører mere end 40 % for hurtigt ved et vejarbejde.",
    "I risk losing my licence, because I am going more than 40 % too fast at road works.",
    "در خطر از دست دادن گواهینامه هستم، چون کنار کار جاده‌ای بیش از ۴۰ درصد سریع‌تر از حد می‌رانم.",
    "Overskrides en midlertidig hastighedsgrænse ved vejarbejde med mere end 40 %, frakendes førerretten betinget; i de første 3 år "
    "med kørekort giver det i stedet kørselsforbud.",
    "If a temporary speed limit at road works is exceeded by more than 40 %, the right to drive is withdrawn conditionally; in the first "
    "3 years with a licence it means a driving ban instead.",
    "اگر حد سرعت موقتِ کنار کار جاده‌ای بیش از ۴۰ درصد رد شود، حق رانندگی به‌طور مشروط سلب می‌شود؛ در ۳ سال اولِ داشتن گواهینامه "
    "به‌جای آن ممنوعیت رانندگی داده می‌شود."),
  S(True, "Vejarbejderne kan komme i fare, når jeg kører for hurtigt.", "The road workers may be put in danger when I drive too fast.",
    "وقتی خیلی سریع می‌رانم، ممکن است کارگران جاده در خطر بیفتند.",
    "Ved et vejarbejde arbejder der folk tæt ved trafikken.", "At road works people are working close to the traffic.",
    "کنار کار جاده‌ای، افراد نزدیک به ترافیک کار می‌کنند."),
  S(False, "Det koster kun en bøde, fordi man først mister kørekortet ved mere end 60 % for hurtigt.",
    "It only costs a fine, because you only lose your licence at more than 60 % over.",
    "فقط جریمه دارد، چون گواهینامه فقط با بیش از ۶۰ درصد سرعت اضافه از دست می‌رود.",
    "Ved midlertidige grænser ved vejarbejde er grænsen 40 %.", "For temporary limits at road works the threshold is 40 %.",
    "برای حدهای موقتِ کنار کار جاده‌ای، این مرز ۴۰ درصد است."),
  S(False, "Midlertidige hastighedsgrænser ved vejarbejde er kun vejledende.", "Temporary speed limits at road works are only advisory.",
    "حدهای سرعت موقتِ کنار کار جاده‌ای فقط توصیه‌اند.",
    "En midlertidig hastighedsgrænse skal overholdes som enhver anden.", "A temporary speed limit must be obeyed like any other.",
    "حد سرعت موقت را هم باید مثل هر حد دیگری رعایت کرد."),
)
