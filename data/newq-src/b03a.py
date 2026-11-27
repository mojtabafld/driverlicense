# «آزمون جدید», batch 3 (5201–5300), part a: stopping and parking (7.18), overtaking (7.9), warning signs (6.1), people
# beside the road and standing vehicles (7.6), speed (7.3), the tyres (1.2).
# Rules: Færdselsloven §§ 10, 18, 20, 21, 27, 28, 29, 32, 41, 42, 43; Bekendtgørelse om vejafmærkning (A 35, A 41, UA 41,
# A 43, UA 43, A 46, A 74, UA 72, C 61, E 23, E 33, E 43, E 55, E 56, E 68, E 69, Q 44).
from nq import Q, S, above, picture, town, view

TOWN_PLAIN = "Scenery is reduced to simple flat house fronts, pavements and a few trees."

Q(5201, "7.18", town("""
THE SCENE: a town street with one lane in each direction. About 20 m ahead a zebra crossing (broad white stripes) crosses the street,
with the Danish crossing sign beside it (a blue square with a white triangle showing a black walking person on a crossing). At the
right kerb the space right AFTER the crossing (beyond it) is free; the cars parked along the kerb start further on. Nobody is on the
crossing.
MUST BE CLEARLY VISIBLE: the zebra crossing, the free kerb space right after it.
MUST NOT APPEAR: yellow lines, no-stopping signs, text."""),
  "Du vil standse og lade en passager stige ud. Der er en ledig plads ved kantstenen lige efter fodgængerfeltet. Hvad gælder?",
  "You want to stop and let a passenger out. There is a free space at the kerb just after the pedestrian crossing. What applies?",
  "می‌خواهید بایستید تا مسافری پیاده شود. درست بعد از گذرگاه عابر پیاده، کنار جدول جای خالی هست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må godt standse lige efter fodgængerfeltet.", "I may stop just after the pedestrian crossing.", "می‌توانم درست بعد از گذرگاه عابر پیاده بایستم.",
    "Forbuddet gælder på fodgængerfeltet og på de 5 m før det, ikke efter det.", "The ban covers the crossing and the 5 m before it, not the space after it.",
    "ممنوعیت برای خود گذرگاه و ۵ متر پیش از آن است، نه بعد از آن."),
  S(False, "Jeg må standse på fodgængerfeltet, når passageren hurtigt kan stige ud.", "I may stop on the pedestrian crossing when the passenger can get out quickly.",
    "اگر مسافر سریع پیاده شود، می‌توانم روی گذرگاه عابر پیاده بایستم.",
    "Det er altid forbudt at standse på et fodgængerfelt.", "Stopping on a pedestrian crossing is always forbidden.", "ایستادن روی گذرگاه عابر پیاده همیشه ممنوع است."),
  S(False, "Jeg må standse 3 m før fodgængerfeltet.", "I may stop 3 m before the pedestrian crossing.", "می‌توانم ۳ متر پیش از گذرگاه عابر پیاده بایستم.",
    "Standsning er forbudt nærmere end 5 m før fodgængerfeltet.", "Stopping is forbidden less than 5 m before the crossing.", "ایستادن در فاصله‌ی کمتر از ۵ متر پیش از گذرگاه ممنوع است."),
  S(False, "Efter et fodgængerfelt må jeg først standse 10 m efter feltet.", "After a pedestrian crossing I may only stop 10 m beyond it.",
    "بعد از گذرگاه عابر پیاده فقط از ۱۰ متر بعد از آن می‌توانم بایستم.",
    "Der er ingen sådan regel; reglen om 10 m gælder ved vejkryds.", "There is no such rule; the 10 m rule applies at junctions.", "چنین قاعده‌ای نیست؛ قاعده‌ی ۱۰ متر برای تقاطع است."),
)

Q(5202, "7.18", town("""
THE SCENE: a town street with one lane in each direction, a park on the right. A cycle path comes out of the park at a right angle and
meets the street at the right kerb (a short dropped kerb where the path ends); a cyclist is riding along the path towards the street.
The kerb is free on both sides of the path's end.
MUST BE CLEARLY VISIBLE: the cycle path meeting the street at a right angle, the cyclist on it, the free kerb on both sides.
MUST NOT APPEAR: signs, yellow lines, text."""),
  "En cykelsti fra en park munder ud i vejen til højre. Du vil standse ved kantstenen lige der, hvor stien kommer ud. Hvad gælder?",
  "A cycle path from a park comes out onto the road on the right. You want to stop at the kerb right where the path comes out. What applies?",
  "یک مسیر دوچرخه از پارک، سمت راست به جاده می‌رسد. می‌خواهید کنار جدول درست جلوی دهانه‌ی مسیر بایستید. چه قاعده‌ای برقرار است؟",
  S(False, "Jeg må standse lige ud for stien, når jeg kun holder kort.", "I may stop right where the path comes out if I only stop briefly.",
    "اگر کوتاه بایستم، می‌توانم درست جلوی دهانه‌ی مسیر بایستم.",
    "Det er forbudt at standse ud for udkørslen fra en cykelsti, også kort.", "Stopping where a cycle path comes out is forbidden, even briefly.",
    "ایستادن جلوی خروجی مسیر دوچرخه ممنوع است، حتی کوتاه."),
  S(True, "Jeg skal holde mindst 5 m fra stiens udmunding til begge sider.", "I must stop at least 5 m from the end of the path on either side.",
    "باید دست‌کم ۵ متر از دهانه‌ی مسیر، در هر دو طرف، فاصله داشته باشم.",
    "Ved en cykelsti, der er tværgående i forhold til kørebanen, er standsning forbudt 5 m på hver side af udkørslen.",
    "Where a cycle path meets the carriageway from the side, stopping is forbidden 5 m on each side of its exit.",
    "جایی که مسیر دوچرخه از کنار به سواره‌رو می‌رسد، ایستادن در ۵ متریِ هر دو طرف خروجی ممنوع است."),
  S(True, "En bil foran stien kan skjule cyklisterne og spærre for dem.", "A car in front of the path can hide the cyclists and block their way.",
    "خودرویی جلوی مسیر ممکن است دوچرخه‌سوارها را پنهان کند و راهشان را ببندد.",
    "Derfor er standsning forbudt der; cyklister og bilister skal kunne se hinanden.", "That is why stopping is forbidden there; cyclists and drivers must be able to see each other.",
    "به همین دلیل ایستادن آنجا ممنوع است؛ دوچرخه‌سوار و راننده باید یکدیگر را ببینند."),
  S(False, "Forbuddet gælder kun, hvis der står en tavle.", "The ban only applies if there is a sign.", "این ممنوعیت فقط وقتی هست که تابلو باشد.",
    "Forbuddet står i færdselsloven og gælder uden tavle.", "The ban is in the Road Traffic Act and applies without a sign.",
    "این ممنوعیت در قانون راهنمایی و رانندگی آمده و بدون تابلو هم برقرار است."),
)

Q(5203, "7.18", town("""
THE SCENE: a busy town street with one lane in each direction and steady traffic both ways. All the spaces along the right kerb are
taken by parked cars; on the LEFT side of the street, across the oncoming lane, there is one free space at the kerb.
MUST BE CLEARLY VISIBLE: the full right kerb, the free space at the left kerb, the oncoming traffic.
MUST NOT APPEAR: one-way signs, signs, text."""),
  "Du vil parkere på en befærdet vej med trafik i begge retninger. Den eneste ledige plads er i venstre side af vejen. Hvad gælder?",
  "You want to park on a busy road with traffic in both directions. The only free space is on the left-hand side of the road. What applies?",
  "می‌خواهید در جاده‌ای شلوغ با ترافیک دوطرفه پارک کنید. تنها جای خالی، سمت چپ جاده است. چه قاعده‌ای برقرار است؟",
  S(False, "Jeg må krydse over og parkere i venstre side.", "I may cross over and park on the left-hand side.", "می‌توانم به آن طرف بروم و سمت چپ پارک کنم.",
    "På en befærdet vej med trafik i begge retninger skal standsning og parkering ske i højre side.",
    "On a busy road with traffic in both directions, stopping and parking must be on the right.", "در جاده‌ی شلوغ دوطرفه، توقف و پارک باید سمت راست باشد."),
  S(True, "Jeg skal finde en plads i højre side af vejen.", "I must find a space on the right-hand side of the road.", "باید جایی سمت راست جاده پیدا کنم.",
    "Standsning og parkering må kun ske i højre side i kørselsretningen, med få undtagelser.",
    "Stopping and parking may only take place on the right in the direction of travel, with few exceptions.", "توقف و پارک فقط سمت راستِ جهت حرکت مجاز است، با چند استثنا."),
  S(True, "Var vejen ensrettet, måtte jeg gerne parkere i venstre side.", "If the road were one-way, I would be allowed to park on the left.",
    "اگر جاده یک‌طرفه بود، می‌توانستم سمت چپ پارک کنم.",
    "På ensrettet vej og på mindre befærdet vej må der standses og parkeres i venstre side.",
    "On a one-way road and on a road with little traffic, you may stop and park on the left.", "در جاده‌ی یک‌طرفه و جاده‌ی کم‌تردد، توقف و پارک سمت چپ مجاز است."),
)

Q(5204, "7.18", view("""
THE SCENE: a car park with bays marked by white lines, seen from the driver's seat. Straight ahead one bay is free; at its head stands
a blue square sign with a large white letter "P", and under it a smaller blue square plate with a white wheelchair symbol; the same
white wheelchair symbol is painted on the ground in the bay. The bays on both sides are taken.
MUST BE CLEARLY VISIBLE: the free bay, the P sign with the wheelchair plate, the wheelchair symbol on the ground.
MUST NOT APPEAR: people, text other than the letter P.""", scenery="Scenery is reduced to a flat supermarket front behind the car park and a few trees."),
  "Den ledige plads er afmærket med denne tavle. Du har ikke et parkeringskort for personer med handicap. Hvad gælder?",
  "The free space is marked with this sign. You do not have a parking permit for people with disabilities. What applies?",
  "جای خالی با این تابلو مشخص شده است. شما کارت پارک افراد دارای معلولیت ندارید. چه قاعده‌ای برقرار است؟",
  S(True, "Pladsen er forbeholdt køretøjer med et parkeringskort for personer med handicap.", "The space is reserved for vehicles with a parking permit for people with disabilities.",
    "این جا مخصوص خودروهایی است که کارت پارک افراد دارای معلولیت دارند.",
    "Med undertavlen med kørestolen må pladsen kun bruges af køretøjer med en særlig tilladelse.",
    "With the plate showing a wheelchair, the space may only be used by vehicles with a special permit.",
    "با تابلوی زیرینِ ویلچر، فقط خودروهای دارای مجوز ویژه می‌توانند از این جا استفاده کنند."),
  S(False, "Jeg må parkere der, hvis jeg kun er væk i få minutter.", "I may park there if I am only away for a few minutes.", "اگر فقط چند دقیقه دور باشم، می‌توانم آنجا پارک کنم.",
    "Pladsen er forbeholdt dem med tilladelse, også til kortvarig parkering.", "The space is reserved for permit holders, also for short parking.",
    "این جا برای دارندگان مجوز است، حتی برای پارک کوتاه."),
  S(True, "Jeg må heller ikke standse der for at sætte en passager af.", "I may not stop there to let a passenger out either.", "برای پیاده کردن مسافر هم نباید آنجا بایستم.",
    "Pladsen må kun benyttes til standsning og parkering af køretøjer med tilladelse.", "The space may only be used for stopping and parking by vehicles with a permit.",
    "این جا فقط برای توقف و پارکِ خودروهای دارای مجوز است."),
  S(False, "Jeg må bruge pladsen, når der er flere ledige handicappladser ved siden af.", "I may use the space when there are more free disabled spaces next to it.",
    "اگر کنارش چند جای معلولین دیگر هم خالی باشد، می‌توانم از آن استفاده کنم.",
    "Det ændrer ikke på, at pladserne er forbeholdt dem med tilladelse.", "That does not change that the spaces are reserved for permit holders.",
    "این چیزی را عوض نمی‌کند؛ این جاها برای دارندگان مجوز است."),
)

Q(5205, "7.18", town("""
THE SCENE: the entrance to a town area: a street lined with houses. On the right stands a white square sign with a thin black border;
in its upper part a round sign with a blue field, a red border and a red X across it (the Danish no-stopping sign), and under it the
black word "Zone".
MUST BE CLEARLY VISIBLE: the zone sign with the no-stopping symbol and the word "Zone".
MUST NOT APPEAR: other signs, text other than "Zone"."""),
  "Du kører ind i et område forbi denne tavle. Hvad gælder?",
  "You drive into an area past this sign. What applies?",
  "از کنار این تابلو وارد یک محدوده می‌شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Standsning er forbudt i hele området, til jeg kører forbi en tavle for zonens ophør.", "Stopping is forbidden throughout the area until I pass a sign for the end of the zone.",
    "توقف در کل محدوده ممنوع است تا وقتی از کنار تابلوی پایان زون رد شوم.",
    "En zonetavle gælder i hele området, indtil den ophæves af tavlen for zonens ophør.", "A zone sign applies throughout the area until it is lifted by the end-of-zone sign.",
    "تابلوی زون در کل محدوده برقرار است تا تابلوی پایان زون آن را لغو کند."),
  S(False, "Forbuddet gælder kun til næste vejkryds.", "The ban only applies up to the next junction.", "این ممنوعیت فقط تا تقاطع بعدی است.",
    "Inden for zonen gælder forbuddet også efter krydsene.", "Inside the zone the ban also applies after the junctions.", "داخل زون، ممنوعیت بعد از تقاطع‌ها هم برقرار است."),
  S(False, "Jeg må standse et øjeblik på kørebanen for at sætte en passager af.", "I may stop briefly on the carriageway to let a passenger out.",
    "می‌توانم لحظه‌ای روی سواره‌رو بایستم تا مسافری پیاده شود.",
    "Et standsningsforbud gælder også en kort standsning for af- og påstigning.", "A no-stopping ban also covers a short stop to let people out or in.",
    "ممنوعیت توقف، توقف کوتاه برای پیاده و سوار شدن را هم شامل می‌شود."),
  S(False, "Forbuddet gælder kun for lastbiler i området.", "The ban only applies to lorries in the area.", "این ممنوعیت فقط برای کامیون‌های داخل محدوده است.",
    "Tavlen viser et almindeligt standsningsforbud, der gælder alle køretøjer.", "The sign shows an ordinary no-stopping ban, which applies to all vehicles.",
    "تابلو یک ممنوعیت توقف عادی را نشان می‌دهد که برای همه‌ی وسایل نقلیه است."),
)

Q(5206, "7.18", town("""
THE SCENE: a narrow town street with one lane in each direction between rows of houses; a pavement on each side with a mother pushing a
pram on the right pavement further ahead. A free space at the right kerb a little ahead; the street is so narrow that a parked car
would leave little room for passing traffic.
MUST BE CLEARLY VISIBLE: the narrow street, the free kerb space, the pavement with the pram.
MUST NOT APPEAR: signs, yellow lines, text."""),
  "Gaden i byen er smal. Du vil parkere med to hjul oppe på fortovet, så der bliver mere plads på kørebanen. Hvad gælder?",
  "The street in town is narrow. You want to park with two wheels up on the pavement so that there is more room on the carriageway. What applies?",
  "خیابانِ داخل شهر باریک است. می‌خواهید با دو چرخ روی پیاده‌رو پارک کنید تا روی سواره‌رو جای بیشتری بماند. چه قاعده‌ای برقرار است؟",
  S(False, "Det er tilladt, fordi det giver mere plads til trafikken.", "It is allowed because it gives more room to the traffic.", "مجاز است، چون جای بیشتری برای ترافیک باز می‌کند.",
    "I byen må man ikke standse eller parkere på fortovet, heller ikke med en del af bilen.", "In town you may not stop or park on the pavement, not even with part of the car.",
    "داخل شهر توقف و پارک روی پیاده‌رو ممنوع است، حتی با بخشی از خودرو."),
  S(True, "Jeg må ikke parkere med en del af bilen på fortovet i byen.", "I may not park with part of the car on the pavement in town.",
    "داخل شهر نباید با بخشی از خودرو روی پیاده‌رو پارک کنم.",
    "Standsning og parkering må ikke ske på fortov.", "Stopping and parking must not take place on the pavement.", "توقف و پارک روی پیاده‌رو ممنوع است."),
  S(True, "Uden for tættere bebygget område må en bil med en tilladt totalvægt på højst 3.500 kg holde med en del af bilen på fortovet.",
    "Outside built-up areas a car with a permitted total weight of at most 3,500 kg may stand with part of it on the pavement.",
    "بیرون از محدوده‌ی شهری، خودرویی با وزن کل مجاز حداکثر ۳٬۵۰۰ کیلوگرم می‌تواند با بخشی از خود روی پیاده‌رو بایستد.",
    "Det er en undtagelse, der kun gælder uden for tættere bebygget område.", "That is an exception which only applies outside built-up areas.",
    "این استثنایی است که فقط بیرون از محدوده‌ی شهری برقرار است."),
  S(False, "Det er tilladt, hvis der stadig er plads til en barnevogn på fortovet.", "It is allowed if there is still room for a pram on the pavement.",
    "اگر هنوز روی پیاده‌رو جا برای کالسکه باشد، مجاز است.",
    "Reglen har ingen sådan undtagelse.", "The rule has no such exception.", "این قاعده چنین استثنایی ندارد."),
)

Q(5207, "7.9", view("""
THE SCENE: a straight two-way country road with good visibility far ahead and no oncoming traffic. In the middle of the road a DOUBLE
line: the line nearest our lane is BROKEN (dashes), the line on the oncoming side is UNBROKEN. A slow green tractor drives in our lane
about 40 m ahead.
MUST BE CLEARLY VISIBLE: the double centre line with the broken line on our side and the unbroken one on the other, the tractor.
MUST NOT APPEAR: oncoming vehicles, signs, text."""),
  "Midt på vejen er der en dobbelt linje: nærmest dig er linjen brudt, og på de modkørendes side er den ubrudt. Foran dig kører en langsom traktor. Hvad gælder?",
  "There is a double line in the middle of the road: the line nearest you is broken, and on the oncoming side it is unbroken. A slow tractor is driving in front of you. What applies?",
  "وسط جاده خط دوتایی است: خطِ نزدیک به شما بریده‌بریده و خطِ سمت خودروهای روبه‌رو ممتد است. جلوی شما یک تراکتور آهسته می‌رود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må overhale traktoren, hvis det kan ske uden fare.", "I may overtake the tractor if it can be done without danger.", "اگر بی‌خطر باشد، می‌توانم از تراکتور سبقت بگیرم.",
    "Ved en dobbelt linje gælder den linje, der er nærmest dig; her den brudte.", "With a double line, the line nearest you applies; here the broken one.",
    "در خط دوتایی، خطِ نزدیک‌تر به شما معتبر است؛ این‌جا خط بریده‌بریده."),
  S(True, "Før jeg trækker ud, sikrer jeg mig, at der er plads til at komme ind igen foran traktoren.", "Before I pull out, I make sure there is room to get back in front of the tractor.",
    "پیش از بیرون رفتن مطمئن می‌شوم که جلوی تراکتور جا برای برگشتن هست.",
    "Der skal være plads til at vende tilbage til højre side uden fare.", "There must be room to return to the right without danger.", "باید جا برای برگشتن بی‌خطر به سمت راست باشد."),
  S(False, "Jeg må ikke overhale, fordi der er en ubrudt linje midt på vejen.", "I may not overtake because there is an unbroken line in the middle of the road.",
    "نمی‌توانم سبقت بگیرم، چون وسط جاده خط ممتد هست.",
    "Den ubrudte linje er på de modkørendes side; for dig gælder den brudte.", "The unbroken line is on the oncoming side; for you the broken one applies.",
    "خط ممتد سمت خودروهای روبه‌روست؛ برای شما خط بریده‌بریده معتبر است."),
  S(False, "De modkørende må også køre over linjerne for at overhale.", "Oncoming drivers may also cross the lines to overtake.", "خودروهای روبه‌رو هم می‌توانند برای سبقت از خطوط رد شوند.",
    "For dem er den ubrudte linje nærmest, så de må ikke køre over.", "For them the unbroken line is nearest, so they may not cross.",
    "برای آن‌ها خط ممتد نزدیک‌تر است، پس نباید از آن رد شوند."),
)

Q(5208, "7.9", view("""
THE SCENE: a two-way country road curving gently, with a DOUBLE line in the middle: the line nearest our lane is UNBROKEN, the line on
the oncoming side is BROKEN (dashes). A grey car drives in our lane about 30 m ahead, rather slowly; an oncoming car is far away.
MUST BE CLEARLY VISIBLE: the double centre line with the unbroken line on our side and the broken one on the other, the grey car.
MUST NOT APPEAR: signs, text."""),
  "Midt på vejen er der en dobbelt linje: nærmest dig er linjen ubrudt, og på de modkørendes side er den brudt. Hvad gælder?",
  "There is a double line in the middle of the road: the line nearest you is unbroken, and on the oncoming side it is broken. What applies?",
  "وسط جاده خط دوتایی است: خطِ نزدیک به شما ممتد و خطِ سمت خودروهای روبه‌رو بریده‌بریده است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre over linjerne for at overhale.", "I may not cross the lines to overtake.", "برای سبقت نباید از خطوط رد شوم.",
    "Den ubrudte linje er nærmest dig, og den må du ikke overskride.", "The unbroken line is nearest you, and you must not cross it.",
    "خط ممتد نزدیک‌تر به شماست و نباید از آن رد شوید."),
  S(True, "De modkørende må gerne køre over linjerne for at overhale, hvis det kan ske uden fare.", "Oncoming drivers may cross the lines to overtake if it can be done without danger.",
    "خودروهای روبه‌رو اگر بی‌خطر باشد، می‌توانند برای سبقت از خطوط رد شوند.",
    "For dem er den brudte linje nærmest.", "For them the broken line is nearest.", "برای آن‌ها خط بریده‌بریده نزدیک‌تر است."),
  S(False, "Jeg må køre over linjerne, hvis bilen foran kører under 50 km/t.", "I may cross the lines if the car in front is going under 50 km/h.",
    "اگر خودروی جلو کمتر از ۵۰ کیلومتر بر ساعت برود، می‌توانم از خطوط رد شوم.",
    "Den ubrudte linje må ikke overskrides for at overhale, uanset hvor langsomt bilen foran kører.",
    "The unbroken line must not be crossed to overtake, however slowly the car in front is going.",
    "برای سبقت نباید از خط ممتد رد شد، خودروی جلو هر قدر هم آهسته برود."),
)

Q(5209, "7.9", above("""
THE SCENE: a motorway seen from above, two lanes in our direction (a broken white line between them), a hard shoulder on the right.
VEHICLES (colour code used strictly): a long white lorry with a trailer in the right lane; a RED car (ours) in the left lane, its rear
just past the front of the lorry. A SOLID GREEN arrow from the red car goes on in the left lane and moves back into the right lane
well ahead of the lorry, with a long gap in front of the lorry; a DASHED ORANGE arrow from the red car cuts into the right lane
immediately in front of the lorry's cab.
MUST NOT APPEAR: other vehicles, signs, text."""),
  "Du er ved at overhale en lastbil på motorvejen. Hvornår kører du tilbage i højre vognbane?",
  "You are overtaking a lorry on the motorway. When do you move back into the right-hand lane?",
  "در بزرگراه در حال سبقت از یک کامیون هستید. کی به خط راست برمی‌گردید؟",
  S(True, "Når jeg kan gøre det uden fare eller ulempe for lastbilen.", "When I can do it without danger or inconvenience to the lorry.",
    "وقتی بتوانم بدون خطر یا مزاحمت برای کامیون برگردم.",
    "Efter overhalingen skal du tilbage til højre, så snart det kan ske uden fare eller ulempe for den overhalede.",
    "After overtaking you must return to the right as soon as it can be done without danger or inconvenience to the one overtaken.",
    "بعد از سبقت باید به محض این‌که بدون خطر یا مزاحمت برای وسیله‌ی سبقت‌گرفته ممکن شد، به راست برگردید."),
  S(True, "Først når der er god afstand til lastbilen, fx når jeg kan se den i det indvendige bakspejl.",
    "Only when there is a good distance to the lorry, for example when I can see it in the interior mirror.",
    "فقط وقتی فاصله‌ی خوبی با کامیون دارم، مثلاً وقتی آن را در آینه‌ی داخلی می‌بینم.",
    "En tung lastbil har lang bremselængde og skal have plads foran sig.", "A heavy lorry has a long braking distance and needs room in front of it.",
    "کامیون سنگین مسافت ترمز طولانی دارد و جلویش جا لازم دارد."),
  S(False, "Lige så snart min bil er forbi lastbilens front.", "As soon as my car is past the front of the lorry.", "به محض این‌که خودرویم از جلوی کامیون رد شد.",
    "Så skærer du ind tæt foran lastbilen, og den kan blive nødt til at bremse.", "Then you cut in close in front of the lorry, and it may have to brake.",
    "در این صورت درست جلوی کامیون می‌پیچید و ممکن است مجبور به ترمز شود."),
  S(True, "Jeg giver tegn, før jeg skifter tilbage.", "I signal before I move back.", "پیش از برگشتن راهنما می‌زنم.",
    "På motorvej skal du give tegn før vognbaneskift.", "On the motorway you must signal before changing lanes.", "در بزرگراه باید پیش از تغییر خط راهنما بزنید."),
)

Q(5210, "7.9", above("""
THE SCENE: a straight two-way country road seen from above, a broken centre line, clear far ahead in both directions.
VEHICLES (colour code used strictly): a RED car (ours) towing a small grey box trailer, in our lane; about 30 m ahead of it a slow
GREEN tractor in the same lane. A SOLID GREEN arrow from the red car swings out into the oncoming lane, passes the tractor and comes
back into our lane far enough ahead of the tractor that the whole trailer is clear of it; no oncoming vehicles.
MUST NOT APPEAR: other vehicles, signs, text."""),
  "Du kører bil med trailer og vil overhale en langsom traktor på landevejen. Hvad gælder?",
  "You are driving a car with a trailer and want to overtake a slow tractor on a country road. What applies?",
  "با خودرو و تریلر می‌رانید و می‌خواهید در جاده‌ی بیرون شهر از یک تراکتور آهسته سبقت بگیرید. چه قاعده‌ای برقرار است؟",
  S(True, "Overhalingen tager længere tid og kræver mere plads end uden trailer.", "The overtaking takes longer and needs more room than without a trailer.",
    "سبقت بیشتر طول می‌کشد و جای بیشتری از حالت بدون تریلر لازم دارد.",
    "Vogntoget er længere og accelererer langsommere.", "The combination is longer and accelerates more slowly.", "خودرو با تریلر بلندتر است و آهسته‌تر شتاب می‌گیرد."),
  S(True, "Jeg må højst køre 80 km/t, også mens jeg overhaler.", "I may drive at most 80 km/h, also while I am overtaking.",
    "حداکثر ۸۰ کیلومتر بر ساعت می‌توانم برانم، حتی هنگام سبقت.",
    "Bil med påhængskøretøj må højst køre 80 km/t (på motorvej 100 km/t, hvis vogntoget er godkendt til det).",
    "A car with a trailer may drive at most 80 km/h (on the motorway 100 km/h if the combination is approved for it).",
    "خودرو با تریلر حداکثر ۸۰ کیلومتر بر ساعت می‌تواند برود (در بزرگراه ۱۰۰، اگر مجوزش را داشته باشد)."),
  S(False, "Jeg må køre op til 100 km/t, så overhalingen bliver kortere.", "I may drive up to 100 km/h so that the overtaking is shorter.",
    "می‌توانم تا ۱۰۰ کیلومتر بر ساعت بروم تا سبقت کوتاه‌تر شود.",
    "Grænsen på 80 km/t gælder også under en overhaling.", "The 80 km/h limit also applies while overtaking.", "حد ۸۰ کیلومتر بر ساعت هنگام سبقت هم برقرار است."),
  S(False, "Jeg kan køre ind igen, så snart bilen er forbi traktoren.", "I can pull back in as soon as the car is past the tractor.",
    "به محض این‌که خودرو از تراکتور رد شد، می‌توانم برگردم.",
    "Traileren skal også være godt forbi, før du kører ind.", "The trailer must also be well past before you pull in.", "تریلر هم باید کاملاً رد شده باشد تا برگردید."),
)

Q(5211, "7.9", view("""
THE SCENE: a dark country road at night without street lights, a broken centre line. About 40 m ahead the red tail lights of a car in
our lane; far ahead, on the other side of the road, the two white headlights of an oncoming car. The road is lit only by our dipped
headlights.
MUST BE CLEARLY VISIBLE: the tail lights ahead, the distant oncoming headlights, the darkness.
MUST NOT APPEAR: street lights, signs, text.""", cond='night, dark, dry road'),
  "Det er mørkt, og du vil overhale en langsom bil på landevejen. Langt fremme ser du lygterne fra en modkørende bil. Hvad gælder?",
  "It is dark, and you want to overtake a slow car on a country road. Far ahead you see the lights of an oncoming car. What applies?",
  "هوا تاریک است و می‌خواهید در جاده‌ی بیرون شهر از خودرویی آهسته سبقت بگیرید. دورتر چراغ‌های یک خودروی روبه‌رو را می‌بینید. چه قاعده‌ای برقرار است؟",
  S(True, "I mørke er det sværere at bedømme, hvor langt væk den modkørende er, og hvor hurtigt den kører.",
    "In the dark it is harder to judge how far away the oncoming car is and how fast it is going.",
    "در تاریکی سخت‌تر است فاصله و سرعت خودروی روبه‌رو را تخمین زد.",
    "Du ser kun lygterne, ikke bilen og vejen omkring den.", "You only see the lights, not the car and the road around it.",
    "فقط چراغ‌ها را می‌بینید، نه خودرو و جاده‌ی اطرافش را."),
  S(True, "Er jeg i tvivl, venter jeg med at overhale.", "If I am in doubt, I wait before overtaking.", "اگر شک دارم، صبر می‌کنم و سبقت نمی‌گیرم.",
    "Du må kun overhale, når du er sikker på, at det kan ske uden fare.", "You may only overtake when you are sure it can be done without danger.",
    "فقط وقتی می‌توانید سبقت بگیرید که مطمئن باشید بی‌خطر است."),
  S(False, "Jeg kan altid nå det, når lygterne er langt væk.", "I can always make it when the lights are far away.", "وقتی چراغ‌ها دورند، همیشه وقت دارم.",
    "Lygterne kan være tættere på, end de ser ud, og bilen kan køre hurtigt.", "The lights may be closer than they look, and the car may be going fast.",
    "چراغ‌ها ممکن است نزدیک‌تر از آن باشند که به نظر می‌رسند و خودرو تند برود."),
)

Q(5212, "6.1", view("""
THE SCENE: a country road with a grass verge that looks soft and muddy along the right edge. On the right verge stands a red-bordered
white warning triangle showing a black car tilting over at the edge of the road, its right wheels sinking down beside a hatched road
edge; under it a white rectangular plate with the black words "Blød rabat".
MUST BE CLEARLY VISIBLE: the warning triangle with the tilting car, the plate with the words "Blød rabat", the soft verge.
MUST NOT APPEAR: other vehicles, other signs, other text."""),
  "Du kører forbi denne tavle med undertavlen »Blød rabat«. Hvad betyder den?",
  "You pass this sign with the plate “Blød rabat” (soft verge). What does it mean?",
  "از کنار این تابلو با تابلوی زیرینِ «Blød rabat» (شانه‌ی نرم) رد می‌شوید. معنی‌اش چیست؟",
  S(True, "Rabatten langs vejen er blød, så hjulene kan synke ned, hvis jeg kører ud på den.", "The verge beside the road is soft, so the wheels may sink if I drive onto it.",
    "شانه‌ی کنار جاده نرم است و اگر رویش بروم، چرخ‌ها ممکن است فرو بروند.",
    "Tavlen advarer om farlig rabat; undertavlen angiver årsagen.", "The sign warns of a dangerous verge; the plate gives the cause.",
    "تابلو درباره‌ی شانه‌ی خطرناک هشدار می‌دهد و تابلوی زیرین دلیلش را می‌گوید."),
  S(False, "Vejen bliver smallere længere fremme.", "The road narrows further ahead.", "جاده کمی جلوتر باریک می‌شود.",
    "Det angives med tavlen for indsnævret vej.", "That is shown by the sign for a road narrowing.", "این را تابلوی باریک شدن جاده نشان می‌دهد."),
  S(False, "Der er vejarbejde i rabatten.", "There are road works on the verge.", "روی شانه‌ی جاده کار راه‌سازی در جریان است.",
    "Vejarbejde har sin egen advarselstavle.", "Road works have their own warning sign.", "کار راه‌سازی تابلوی هشدار خودش را دارد."),
  S(False, "Ved møde med en bred lastbil kører jeg helt ud på rabatten.", "When meeting a wide lorry, I drive right out onto the verge.",
    "هنگام روبه‌رو شدن با کامیونی پهن، کاملاً روی شانه‌ی جاده می‌روم.",
    "En blød rabat kan få bilen til at skride ud eller vælte; sæt hellere farten ned og stands om nødvendigt.",
    "A soft verge can make the car slide off or tip over; slow down instead and stop if necessary.",
    "شانه‌ی نرم ممکن است خودرو را بلغزاند یا واژگون کند؛ بهتر است سرعت را کم کنید و در صورت لزوم بایستید."),
)

Q(5213, "6.1", view("""
THE SCENE: a two-way country road in heavy rain, wet and shiny, approaching a sharp bend to the RIGHT. On the right verge stands a
red-bordered white warning triangle with a thick black arrow bending to the right; under it a square white plate with a red border
showing the black number "40".
MUST BE CLEARLY VISIBLE: the bend sign, the plate with 40, the bend ahead, the rain.
MUST NOT APPEAR: other vehicles, other signs, text other than "40".""", cond='heavy rain, wet road, daylight'),
  "Du kører forbi denne tavle uden for byen. Undertavlen viser 40. Det regner kraftigt. Hvad gælder?",
  "You pass this sign outside a built-up area. The plate shows 40. It is raining heavily. What applies?",
  "بیرون از شهر از کنار این تابلو رد می‌شوید. تابلوی زیرین عدد ۴۰ را نشان می‌دهد. باران شدیدی می‌بارد. چه قاعده‌ای برقرار است؟",
  S(True, "Der kommer et farligt sving til højre.", "A dangerous bend to the right is coming.", "یک پیچ خطرناک به راست در پیش است.",
    "Tavlen advarer om et farligt vejsving.", "The sign warns of a dangerous bend.", "تابلو درباره‌ی پیچ خطرناک هشدار می‌دهد."),
  S(True, "40 er den hastighed, svinget kan køres med under normale forhold; i kraftig regn kan jeg være nødt til at køre langsommere.",
    "40 is the speed at which the bend can be taken in normal conditions; in heavy rain I may have to go slower.",
    "۴۰ سرعتی است که در شرایط عادی می‌توان پیچ را با آن رد کرد؛ در باران شدید شاید لازم باشد آهسته‌تر بروم.",
    "Undertavlen angiver den hastighed, svinget under normale forhold kan gennemkøres med.", "The plate gives the speed at which the bend can be driven in normal conditions.",
    "تابلوی زیرین سرعتی را نشان می‌دهد که پیچ در شرایط عادی با آن پیموده می‌شود."),
  S(False, "Tallet er en hastighedsgrænse, så jeg må køre 40 km/t i svinget uanset vejret.", "The number is a speed limit, so I may drive 40 km/h in the bend whatever the weather.",
    "این عدد حد سرعت است، پس در هر هوایی می‌توانم پیچ را با ۴۰ کیلومتر بر ساعت بروم.",
    "Tallet er en vejledning for normale forhold; farten skal altid passe til vej og vejr.", "The number is guidance for normal conditions; the speed must always suit the road and the weather.",
    "این عدد راهنما برای شرایط عادی است؛ سرعت همیشه باید با جاده و هوا جور باشد."),
  S(False, "Jeg skal køre mindst 40 km/t i svinget.", "I must drive at least 40 km/h in the bend.", "باید پیچ را دست‌کم با ۴۰ کیلومتر بر ساعت بروم.",
    "Undertavlen angiver ikke en mindste hastighed.", "The plate does not give a minimum speed.", "تابلوی زیرین حداقل سرعت را نشان نمی‌دهد."),
)

Q(5214, "6.1", view("""
THE SCENE: a two-way country road. On the right verge stands a red-bordered white warning triangle showing two black lines that come
closer together towards the top (the road narrowing on both sides); under it a white rectangular plate with a red border showing the
black text "3,5 m" between two small black triangles pointing inwards. About 150 m ahead the road visibly narrows between two kerbs,
and a large lorry approaches from the other end.
MUST BE CLEARLY VISIBLE: the narrowing sign, the plate with "3,5 m", the narrowing ahead, the oncoming lorry.
MUST NOT APPEAR: other signs, text other than "3,5 m"."""),
  "Du kører forbi denne tavle. Undertavlen viser 3,5 m. En lastbil kommer imod dig. Hvad gælder?",
  "You pass this sign. The plate shows 3.5 m. A lorry is coming towards you. What applies?",
  "از کنار این تابلو رد می‌شوید. تابلوی زیرین «۳٫۵ متر» را نشان می‌دهد. کامیونی از روبه‌رو می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Vejen bliver smallere længere fremme.", "The road gets narrower further ahead.", "جاده کمی جلوتر باریک‌تر می‌شود.",
    "Tavlen advarer om indsnævret vej.", "The sign warns of a road narrowing.", "تابلو درباره‌ی باریک شدن جاده هشدار می‌دهد."),
  S(True, "Vejen er kun 3,5 m bred på det smalle stykke.", "The road is only 3.5 m wide on the narrow stretch.", "عرض جاده در بخش باریک فقط ۳٫۵ متر است.",
    "Undertavlen angiver den fri bredde på den indsnævrede strækning.", "The plate gives the free width of the narrowed stretch.",
    "تابلوی زیرین عرض آزاد بخش باریک را نشان می‌دهد."),
  S(True, "Lastbilen og jeg kan ikke passere hinanden på det smalle stykke, så jeg er klar til at vente.",
    "The lorry and I cannot pass each other on the narrow stretch, so I am ready to wait.",
    "من و کامیون در بخش باریک نمی‌توانیم از کنار هم رد شویم، پس آماده‌ی صبر کردنم.",
    "En lastbil og en bil er tilsammen bredere end 3,5 m.", "A lorry and a car together are wider than 3.5 m.", "عرض کامیون و خودرو روی هم بیش از ۳٫۵ متر است."),
  S(False, "Undertavlen betyder, at køretøjer, der er bredere end 3,5 m, ikke må køre ind.", "The plate means that vehicles wider than 3.5 m may not drive in.",
    "تابلوی زیرین یعنی وسایل نقلیه‌ی پهن‌تر از ۳٫۵ متر نباید وارد شوند.",
    "Undertavlen fortæller den fri bredde; et forbud for brede køretøjer har sin egen tavle.", "The plate tells the free width; a ban on wide vehicles has its own sign.",
    "تابلوی زیرین عرض آزاد را می‌گوید؛ ممنوعیت وسایل پهن تابلوی جداگانه دارد."),
)

Q(5215, "6.1", view("""
THE SCENE: a road at the top of a hill; beyond the top the road goes steeply downhill. On the right verge stands a red-bordered white
warning triangle showing a black slope falling from left to right with the black text "10%" above it.
MUST BE CLEARLY VISIBLE: the warning triangle with the slope and "10%", the steep descent ahead.
MUST NOT APPEAR: other vehicles, other signs, other text."""),
  "Du kører forbi denne tavle. Hvad betyder den, og hvordan forholder du dig?",
  "You pass this sign. What does it mean, and what do you do?",
  "از کنار این تابلو رد می‌شوید. معنی‌اش چیست و چه می‌کنید؟",
  S(True, "Der kommer en stejl nedkørsel med en hældning på op til 10 %.", "A steep descent with a gradient of up to 10 % is coming.",
    "سرپایینی تندی با شیب حداکثر ۱۰ درصد در پیش است.",
    "Tavlen advarer om stejl nedkørsel; tallet angiver den største hældning.", "The sign warns of a steep descent; the number gives the greatest gradient.",
    "تابلو درباره‌ی سرپایینی تند هشدار می‌دهد؛ عدد بیشترین شیب را نشان می‌دهد."),
  S(True, "Jeg holder farten nede, fx med et lavere gear, så bremserne ikke bliver for varme.", "I keep my speed down, for example with a lower gear, so that the brakes do not get too hot.",
    "سرعت را پایین نگه می‌دارم، مثلاً با دنده‌ی سنگین‌تر، تا ترمزها بیش از حد داغ نشوند.",
    "Motorbremsning aflaster bremserne på en lang nedkørsel.", "Engine braking takes load off the brakes on a long descent.",
    "ترمز موتور در سرپایینی طولانی بار ترمزها را کم می‌کند."),
  S(True, "Ned ad bakke bliver bremselængden længere end på flad vej.", "Downhill the braking distance becomes longer than on a flat road.",
    "در سرپایینی مسافت ترمز از جاده‌ی صاف طولانی‌تر است.",
    "Tyngdekraften trækker bilen fremad, mens du bremser.", "Gravity pulls the car forward while you brake.", "گرانش هنگام ترمز خودرو را به جلو می‌کشد."),
  S(False, "Der kommer en stejl stigning, hvor jeg skal give mere gas.", "A steep climb is coming where I need to accelerate more.",
    "سربالایی تندی در پیش است که باید بیشتر گاز بدهم.",
    "En stigning har sin egen tavle; denne viser en nedkørsel.", "A climb has its own sign; this one shows a descent.",
    "سربالایی تابلوی خودش را دارد؛ این یکی سرپایینی را نشان می‌دهد."),
)

Q(5216, "6.1", view("""
THE SCENE: a country road reaching a level crossing with TWO railway tracks, with no barriers and no light signals; the land around is
open. Right before the crossing, on the right, a post carries a red-and-white St Andrew's cross with a second, smaller red-and-white
chevron under it (the Danish cross marker for a crossing with several tracks), and under that a white rectangular plate with a red
border showing the black words "Se efter tog" above two black arrows pointing towards each other. No train in sight.
MUST BE CLEARLY VISIBLE: the two tracks, the cross marker with its chevron, the plate "Se efter tog", that there are no barriers.
MUST NOT APPEAR: barriers, light signals, trains, text other than "Se efter tog"."""),
  "Du kommer til en jernbaneoverkørsel uden bomme og uden lyssignal. Lige før overkørslen står disse tavler. Hvad gælder?",
  "You come to a level crossing without barriers and without light signals. Just before the crossing stand these signs. What applies?",
  "به گذرگاه راه‌آهنی بدون راه‌بند و بدون چراغ می‌رسید. درست پیش از گذرگاه این تابلوها نصب شده‌اند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal selv se efter tog i begge retninger, før jeg kører over.", "I must look for trains in both directions myself before I cross.",
    "پیش از عبور باید خودم دو طرف را برای قطار نگاه کنم.",
    "Undertavlen »Se efter tog« bruges, hvor overkørslen kun er sikret med afmærkning.",
    "The plate “Se efter tog” (look for trains) is used where the crossing is protected by signs only.",
    "تابلوی زیرینِ «Se efter tog» (مراقب قطار باشید) جایی است که گذرگاه فقط با تابلو ایمن شده است."),
  S(True, "Der er mere end ét spor, så der kan komme endnu et tog, når det første er kørt forbi.",
    "There is more than one track, so another train may come when the first has gone by.",
    "بیش از یک ریل هست، پس بعد از رد شدن قطار اول ممکن است قطار دیگری بیاید.",
    "Det dobbelte krydsmærke betyder en overkørsel med flere spor.", "The double cross marker means a crossing with several tracks.",
    "صلیبِ دوتایی یعنی گذرگاهی با چند ریل."),
  S(False, "Tavlerne står 150–250 m før overkørslen.", "The signs stand 150–250 m before the crossing.", "این تابلوها ۱۵۰ تا ۲۵۰ متر پیش از گذرگاه نصب شده‌اند.",
    "Krydsmærket står umiddelbart foran overkørslen.", "The cross marker stands right in front of the crossing.", "صلیب درست جلوی گذرگاه نصب می‌شود."),
  S(False, "Jeg må standse på sporene, hvis der er kø på vejen efter overkørslen.", "I may stop on the tracks if there is a queue on the road after the crossing.",
    "اگر بعد از گذرگاه صف باشد، می‌توانم روی ریل‌ها بایستم.",
    "Det er forbudt at standse på en jernbaneoverkørsel; kør først ud på den, når du kan komme helt over.",
    "Stopping on a level crossing is forbidden; only drive onto it when you can get all the way across.",
    "توقف روی گذرگاه راه‌آهن ممنوع است؛ فقط وقتی واردش شوید که بتوانید کامل رد شوید."),
)

Q(5217, "7.6", town("""
THE SCENE: a town street with one lane in each direction. About 25 m ahead a zebra crossing without light signals, with the Danish
crossing sign beside it (a blue square with a white triangle showing a black walking person on a crossing). A woman with a shopping bag
stands at the right kerb at the crossing, facing the street and lifting one foot to step out.
MUST BE CLEARLY VISIBLE: the zebra crossing, the woman about to step onto it.
MUST NOT APPEAR: traffic lights, other vehicles in front of us, text."""),
  "Du nærmer dig et fodgængerfelt uden lyssignal. En kvinde står ved kantstenen og er på vej ud på feltet. Hvordan forholder du dig?",
  "You are approaching a pedestrian crossing without light signals. A woman is standing at the kerb and is about to step onto the crossing. What do you do?",
  "به گذرگاه عابر پیاده‌ای بدون چراغ نزدیک می‌شوید. زنی کنار جدول ایستاده و می‌خواهد وارد گذرگاه شود. چه می‌کنید؟",
  S(True, "Jeg sænker farten, så jeg kan standse, hvis hun går ud.", "I slow down so that I can stop if she steps out.",
    "سرعت را کم می‌کنم تا اگر وارد شد، بتوانم بایستم.",
    "Du skal tilpasse farten, så der ikke opstår fare eller ulempe for gående, der er på vej ud i feltet.",
    "You must adjust your speed so that there is no danger or inconvenience to pedestrians about to step onto the crossing.",
    "باید سرعت را طوری تنظیم کنید که برای عابری که می‌خواهد وارد گذرگاه شود خطر یا مزاحمتی پیش نیاید."),
  S(True, "Om nødvendigt standser jeg og lader hende gå over.", "If necessary, I stop and let her cross.", "در صورت لزوم می‌ایستم و می‌گذارم رد شود.",
    "Du skal standse, hvis det er nødvendigt for at lade de gående passere.", "You must stop if that is necessary to let the pedestrians cross.",
    "اگر لازم باشد، باید بایستید تا عابران رد شوند."),
  S(False, "Jeg kører videre, fordi hun endnu ikke er ude på feltet.", "I drive on because she is not on the crossing yet.",
    "ادامه می‌دهم، چون هنوز وارد گذرگاه نشده است.",
    "Reglen gælder også gående, der er på vej ud i feltet.", "The rule also covers pedestrians who are about to step onto the crossing.",
    "این قاعده عابری را هم که در حال وارد شدن به گذرگاه است شامل می‌شود."),
  S(False, "Jeg dytter, så hun ved, at jeg kommer.", "I sound the horn so that she knows I am coming.", "بوق می‌زنم تا بداند من دارم می‌آیم.",
    "Hornet må kun bruges for at forebygge eller afværge fare.", "The horn may only be used to prevent or avert danger.", "بوق فقط برای پیشگیری یا دفع خطر است."),
)

Q(5218, "7.6", town("""
THE SCENE: a residential street with one lane in each direction. A refuse lorry stands in our lane about 30 m ahead with its orange
lights flashing; two refuse collectors in high-visibility clothing wheel bins between the lorry and the houses on the right, one of
them just behind the lorry. A car comes towards us in the other lane further away.
MUST BE CLEARLY VISIBLE: the refuse lorry in our lane, the two workers, the oncoming car.
MUST NOT APPEAR: signs, text, brand names."""),
  "En skraldebil holder i din side af vejen, og skraldemændene går frem og tilbage mellem bilen og husene. Hvordan forholder du dig?",
  "A refuse lorry is standing on your side of the road, and the refuse collectors are walking back and forth between the lorry and the houses. What do you do?",
  "یک کامیون زباله در سمت شما ایستاده و کارگرانش میان کامیون و خانه‌ها رفت‌وآمد می‌کنند. چه می‌کنید؟",
  S(True, "Jeg sænker farten og er klar til at standse.", "I slow down and am ready to stop.", "سرعت را کم می‌کنم و آماده‌ی ایستادنم.",
    "En person kan pludselig træde ud bag skraldebilen.", "A person may suddenly step out from behind the refuse lorry.",
    "ممکن است کسی ناگهان از پشت کامیون زباله بیرون بیاید."),
  S(True, "Jeg kører først forbi, når der er plads, og ingen modkørende er i vejen.", "I only pass when there is room and no oncoming traffic is in the way.",
    "فقط وقتی رد می‌شوم که جا باشد و خودرویی از روبه‌رو مانع نباشد.",
    "Er spærringen i din side, skal du om nødvendigt standse og lade de modkørende passere.",
    "If the obstruction is on your side, you must stop if necessary and let oncoming traffic pass.",
    "اگر مانع در سمت شماست، در صورت لزوم باید بایستید تا خودروهای روبه‌رو رد شوند."),
  S(True, "Jeg holder god afstand til siden, når jeg kører forbi.", "I keep a good distance to the side when I pass.", "هنگام رد شدن فاصله‌ی جانبی خوبی نگه می‌دارم.",
    "Så har du plads, hvis en skraldemand træder frem.", "Then you have room if a refuse collector steps out.", "این‌طور اگر کارگری بیرون بیاید، جا دارید."),
  S(False, "Jeg dytter, så skraldemændene går til side.", "I sound the horn so that the refuse collectors step aside.", "بوق می‌زنم تا کارگرها کنار بروند.",
    "Hornet må kun bruges for at forebygge eller afværge fare, ikke for at skaffe plads.", "The horn may only be used to prevent or avert danger, not to make room.",
    "بوق فقط برای پیشگیری یا دفع خطر است، نه برای باز کردن راه."),
)

Q(5219, "7.6", view("""
THE SCENE: driving slowly along an aisle in a car park, seen from the driver's seat; parking bays with cars on both sides. A little
ahead on the right, a car standing nose-in in its bay has its white reversing lights on; its rear points towards the aisle.
MUST BE CLEARLY VISIBLE: the car with its white reversing lights on, the aisle ahead.
MUST NOT APPEAR: people, signs, text.""", scenery="Scenery is reduced to a flat supermarket front behind the car park and a few trees."),
  "Du kører langsomt på en parkeringsplads. Lidt fremme lyser baklygterne på en bil, der holder i en bås. Hvordan forholder du dig?",
  "You are driving slowly in a car park. A little ahead, the reversing lights of a car standing in a bay are on. What do you do?",
  "در پارکینگ آهسته می‌رانید. کمی جلوتر چراغ دنده‌عقبِ خودرویی که در جای پارک ایستاده روشن است. چه می‌کنید؟",
  S(True, "Jeg sænker farten og er klar til at standse, fordi bilen kan bakke ud foran mig.", "I slow down and am ready to stop because the car may reverse out in front of me.",
    "سرعت را کم می‌کنم و آماده‌ی ایستادنم، چون ممکن است آن خودرو جلوی من دنده‌عقب بیرون بیاید.",
    "Baklygterne viser, at bilen er sat i bakgear.", "The reversing lights show that the car is in reverse gear.", "چراغ دنده‌عقب نشان می‌دهد خودرو در دنده‌عقب است."),
  S(False, "Jeg kan regne med, at føreren har set mig.", "I can count on the driver having seen me.", "می‌توانم مطمئن باشم راننده مرا دیده است.",
    "Føreren kan have svært ved at se dig bag bilen; vær klar til at standse.", "The driver may find it hard to see you behind the car; be ready to stop.",
    "ممکن است راننده شما را پشت خودرو به‌سختی ببیند؛ آماده‌ی ایستادن باشید."),
  S(True, "Den, der bakker, skal sikre sig, at det kan ske uden fare eller ulempe for andre.", "Whoever is reversing must make sure it can be done without danger or inconvenience to others.",
    "کسی که دنده‌عقب می‌رود باید مطمئن شود برای دیگران خطر یا مزاحمتی ندارد.",
    "Det følger af reglerne om bakning; du skal alligevel være klar til at standse.", "That follows from the rules on reversing; you must still be ready to stop.",
    "این از قواعد دنده‌عقب است؛ با این حال شما هم باید آماده‌ی ایستادن باشید."),
)

Q(5220, "7.6", view("""
THE SCENE: a two-way country road without pavement or path, a broken centre line, fields on both sides. About 50 m ahead a man in
dark clothes walks along the RIGHT edge of the road in our direction, with his back to us. Further ahead the road is clear.
MUST BE CLEARLY VISIBLE: the pedestrian at the right edge with his back to us, that there is no pavement.
MUST NOT APPEAR: other vehicles, signs, text."""),
  "En fodgænger går i højre side af landevejen med ryggen til dig. Der er hverken fortov eller sti. Hvordan forholder du dig?",
  "A pedestrian is walking on the right-hand side of the country road with his back to you. There is neither a pavement nor a path. What do you do?",
  "عابری در سمت راست جاده‌ی بیرون شهر، پشت به شما راه می‌رود. نه پیاده‌رو هست و نه مسیر. چه می‌کنید؟",
  S(True, "Jeg sænker farten og giver fodgængeren god plads, når jeg kører forbi.", "I slow down and give the pedestrian plenty of room when I pass.",
    "سرعت را کم می‌کنم و هنگام رد شدن جای کافی به عابر می‌دهم.",
    "Du skal give gående tid til at gå til side og i øvrigt give dem fornøden plads på vejen.",
    "You must give pedestrians time to step aside and otherwise give them enough room on the road.",
    "باید به عابر وقت بدهید کنار برود و جای کافی روی جاده به او بدهید."),
  S(True, "Fodgængeren burde gå i venstre side, men jeg skal tage hensyn til ham alligevel.", "The pedestrian should be walking on the left, but I must take care of him anyway.",
    "عابر باید سمت چپ راه برود، ولی من به هر حال باید مراقبش باشم.",
    "Gående på kørebanen skal gå i venstre side; din pligt til at tage hensyn gælder dog altid.",
    "Pedestrians on the carriageway must walk on the left; but your duty to take care always applies.",
    "عابری که روی سواره‌رو راه می‌رود باید سمت چپ باشد؛ ولی وظیفه‌ی ملاحظه‌ی شما همیشه برقرار است."),
  S(True, "Før jeg kører ud omkring ham, sikrer jeg mig, at der ikke kommer modkørende.", "Before I swing out around him, I make sure that no oncoming traffic is coming.",
    "پیش از دور زدن او مطمئن می‌شوم خودرویی از روبه‌رو نمی‌آید.",
    "Er der modkørende, venter du bag fodgængeren, til der er plads.", "If there is oncoming traffic, you wait behind the pedestrian until there is room.",
    "اگر خودرویی از روبه‌رو بیاید، پشت عابر صبر می‌کنید تا جا باز شود."),
  S(False, "Jeg dytter tæt bag ham, så han går over i den rigtige side.", "I sound the horn close behind him so that he moves to the correct side.",
    "از نزدیک پشت سرش بوق می‌زنم تا به سمت درست برود.",
    "Et dyt tæt på kan forskrække ham, så han træder ud foran dig.", "A honk close by can startle him so that he steps out in front of you.",
    "بوقِ نزدیک ممکن است او را بترساند و جلوی شما بپرد."),
)

Q(5221, "7.3", view("""
THE SCENE: a country road entering a small town; the first houses begin just ahead. On the right verge stands a white rectangular
sign with a thin black border showing the black town name "Bakkeby" above a row of black silhouettes of houses and a church tower.
MUST BE CLEARLY VISIBLE: the town sign with the name and the silhouettes, the houses beginning.
MUST NOT APPEAR: speed-limit signs, other signs, text other than "Bakkeby"."""),
  "Du kører forbi denne tavle. Der er ingen hastighedstavler. Hvad gælder?",
  "You pass this sign. There are no speed signs. What applies?",
  "از کنار این تابلو رد می‌شوید. تابلوی سرعتی نیست. چه قاعده‌ای برقرار است؟",
  S(True, "Den højst tilladte hastighed er 50 km/t.", "The maximum permitted speed is 50 km/h.", "حداکثر سرعت مجاز ۵۰ کیلومتر بر ساعت است.",
    "Tavlen viser, at du kører ind i tættere bebygget område, hvor grænsen er 50 km/t.", "The sign shows that you are entering a built-up area, where the limit is 50 km/h.",
    "تابلو نشان می‌دهد وارد محدوده‌ی شهری می‌شوید که حد سرعتش ۵۰ کیلومتر بر ساعت است."),
  S(False, "Grænsen er 60 km/t, indtil jeg ser en tavle med 50.", "The limit is 60 km/h until I see a sign with 50.", "تا تابلوی ۵۰ را نبینم، حد سرعت ۶۰ است.",
    "Grænsen på 50 km/t gælder fra byzonetavlen.", "The 50 km/h limit applies from the built-up area sign.", "حد ۵۰ از همین تابلوی ورود به شهر برقرار است."),
  S(False, "Tavlen viser kun byens navn og har ingen betydning for hastigheden.", "The sign only shows the name of the town and means nothing for the speed.",
    "این تابلو فقط نام شهر است و ربطی به سرعت ندارد.",
    "Byzonetavlen angiver, at reglerne for tættere bebygget område gælder.", "The built-up area sign shows that the rules for built-up areas apply.",
    "تابلوی ورود به شهر یعنی قواعد محدوده‌ی شهری برقرار است."),
  S(False, "Grænsen på 50 km/t gælder kun om dagen.", "The 50 km/h limit only applies in the daytime.", "حد ۵۰ فقط در روز است.",
    "Grænsen gælder hele døgnet.", "The limit applies around the clock.", "این حد در تمام شبانه‌روز برقرار است."),
)

Q(5222, "7.3", view("""
THE SCENE: leaving a small town: the last houses are just behind, open fields ahead. On the right verge stands a white rectangular sign
with a thin black border showing the black town name "Bakkeby" above black silhouettes of houses and a church tower, the whole sign
crossed by a broad red diagonal bar.
MUST BE CLEARLY VISIBLE: the town sign crossed by the red bar, the open road ahead.
MUST NOT APPEAR: speed-limit signs, other signs, text other than "Bakkeby"."""),
  "Du kører forbi denne tavle ud af byen. Der er ingen hastighedstavler. Hvad gælder?",
  "You pass this sign on your way out of the town. There are no speed signs. What applies?",
  "هنگام خروج از شهر از کنار این تابلو رد می‌شوید. تابلوی سرعتی نیست. چه قاعده‌ای برقرار است؟",
  S(True, "Den højst tilladte hastighed er nu 80 km/t.", "The maximum permitted speed is now 80 km/h.", "اکنون حداکثر سرعت مجاز ۸۰ کیلومتر بر ساعت است.",
    "Tavlen angiver, at det tættere bebyggede område ophører; uden for gælder 80 km/t.", "The sign shows that the built-up area ends; outside it 80 km/h applies.",
    "تابلو پایان محدوده‌ی شهری را نشان می‌دهد؛ بیرون از آن حد ۸۰ است."),
  S(False, "Nu gælder der ingen hastighedsgrænse, indtil næste tavle.", "Now there is no speed limit until the next sign.", "تا تابلوی بعدی هیچ حد سرعتی برقرار نیست.",
    "Den generelle grænse uden for tættere bebygget område er 80 km/t.", "The general limit outside built-up areas is 80 km/h.",
    "حد عمومی بیرون از محدوده‌ی شهری ۸۰ کیلومتر بر ساعت است."),
  S(True, "Jeg skal stadig tilpasse farten til vejen og trafikken.", "I must still adjust my speed to the road and the traffic.", "همچنان باید سرعتم را با جاده و ترافیک تنظیم کنم.",
    "Hastighedsgrænsen er det højeste; forholdene kan kræve mindre.", "The limit is the highest; conditions may require less.",
    "حد سرعت حداکثر است؛ شرایط ممکن است کمتر بخواهد."),
)

Q(5223, "7.3", view("""
THE SCENE: a two-way road with one lane in each direction, wide verges and no houses, fenced off from the fields; no junctions in
sight. At the start of the road, on the right, stands a blue rectangular sign showing a white car seen from the front (the Danish sign
for a road reserved for motor vehicles).
MUST BE CLEARLY VISIBLE: the blue sign with the white car, the road ahead.
MUST NOT APPEAR: speed-limit signs, other signs, cyclists, text."""),
  "Du kører på en motortrafikvej. Der er ingen hastighedstavler. Hvad er den højst tilladte hastighed for en almindelig personbil?",
  "You are driving on a motortrafikvej (a road for motor vehicles only). There are no speed signs. What is the maximum permitted speed for an ordinary car?",
  "در یک جاده‌ی ویژه‌ی خودرو (motortrafikvej) می‌رانید. تابلوی سرعتی نیست. حداکثر سرعت مجاز برای یک خودروی سواری معمولی چقدر است؟",
  S(True, "80 km/t.", "80 km/h.", "۸۰ کیلومتر بر ساعت.",
    "Den generelle grænse på motortrafikvej er 80 km/t; med tavler kan den være højst 100 km/t.",
    "The general limit on a motortrafikvej is 80 km/h; signs can raise it to at most 100 km/h.",
    "حد عمومی در motortrafikvej ۸۰ است؛ با تابلو حداکثر تا ۱۰۰ می‌تواند بالا برود."),
  S(False, "90 km/t.", "90 km/h.", "۹۰ کیلومتر بر ساعت.",
    "90 km/t gælder kun, hvor det er skiltet.", "90 km/h only applies where it is signposted.", "۹۰ فقط جایی است که تابلو داشته باشد."),
  S(False, "110 km/t.", "110 km/h.", "۱۱۰ کیلومتر بر ساعت.",
    "På motortrafikvej må grænsen højst være 100 km/t.", "On a motortrafikvej the limit can be at most 100 km/h.", "در motortrafikvej حد سرعت حداکثر ۱۰۰ است."),
  S(False, "130 km/t.", "130 km/h.", "۱۳۰ کیلومتر بر ساعت.",
    "130 km/t er den generelle grænse på motorvej.", "130 km/h is the general limit on the motorway.", "۱۳۰ حد عمومی بزرگراه است."),
)

Q(5224, "7.3", view("""
THE SCENE: driving on a motorway with two lanes in our direction, in the right lane. We are towing a small grey box trailer: it is
visible behind our car in the right door mirror at the right edge of the picture. Light traffic.
MUST BE CLEARLY VISIBLE: the motorway, the trailer in the door mirror.
MUST NOT APPEAR: speed-limit signs, signs, text."""),
  "Du kører på motorvejen med en almindelig trailer, som ikke er godkendt til 100 km/t. Hvad er den højst tilladte hastighed?",
  "You are driving on the motorway with an ordinary trailer that is not approved for 100 km/h. What is the maximum permitted speed?",
  "در بزرگراه با یک تریلر معمولی می‌رانید که مجوز ۱۰۰ کیلومتر بر ساعت ندارد. حداکثر سرعت مجاز چقدر است؟",
  S(True, "80 km/t.", "80 km/h.", "۸۰ کیلومتر بر ساعت.",
    "Bil med påhængskøretøj må højst køre 80 km/t; på motorvej 100 km/t kun, hvis vogntoget er godkendt til det (Tempo 100).",
    "A car with a trailer may drive at most 80 km/h; on the motorway 100 km/h only if the combination is approved for it (Tempo 100).",
    "خودرو با تریلر حداکثر ۸۰ کیلومتر بر ساعت؛ در بزرگراه فقط اگر مجوزش را داشته باشد (Tempo 100)، ۱۰۰."),
  S(False, "100 km/t.", "100 km/h.", "۱۰۰ کیلومتر بر ساعت.",
    "100 km/t kræver en særlig godkendelse af vogntoget.", "100 km/h requires a special approval of the combination.", "۱۰۰ کیلومتر بر ساعت مجوز ویژه لازم دارد."),
  S(False, "110 km/t.", "110 km/h.", "۱۱۰ کیلومتر بر ساعت.",
    "Med trailer må du aldrig køre så hurtigt.", "With a trailer you may never drive that fast.", "با تریلر هیچ‌وقت نباید این‌قدر تند برانید."),
  S(False, "130 km/t.", "130 km/h.", "۱۳۰ کیلومتر بر ساعت.",
    "130 km/t gælder for biler uden påhængskøretøj.", "130 km/h applies to cars without a trailer.", "۱۳۰ برای خودروهای بدون تریلر است."),
)

Q(5225, "1.2", picture("""
A close-up of a car's front wheel on a plain light background: a hand holds a round tyre-pressure gauge pressed onto the tyre's valve;
beside the wheel, the open driver's door shows a small label in the door frame with simple tyre symbols (no readable text).
MUST BE CLEARLY VISIBLE: the gauge on the valve, the tyre, the label in the door frame.
MUST NOT APPEAR: readable text or numbers, brand names, people other than the hand."""),
  "Hvad gælder om bilens dæktryk?",
  "What applies to the car's tyre pressure?",
  "درباره‌ی فشار باد لاستیک‌های خودرو چه درست است؟",
  S(True, "Jeg måler trykket, når dækkene er kolde, fx før jeg kører.", "I check the pressure when the tyres are cold, for example before I drive.",
    "فشار را وقتی لاستیک‌ها سردند، مثلاً پیش از حرکت، اندازه می‌گیرم.",
    "Varme dæk viser et højere tryk, så målingen bliver forkert.", "Warm tyres show a higher pressure, so the reading is wrong.",
    "لاستیک گرم فشار بیشتری نشان می‌دهد و اندازه‌گیری نادرست می‌شود."),
  S(True, "For lavt dæktryk kan give dårligere vejgreb og en længere bremselængde.", "Too low a tyre pressure can give poorer grip and a longer braking distance.",
    "فشار باد خیلی کم ممکن است چسبندگی را کم و مسافت ترمز را بیشتر کند.",
    "Dækket bliver blødt og arbejder dårligere mod vejen.", "The tyre gets soft and works worse against the road.", "لاستیک نرم می‌شود و روی جاده بدتر کار می‌کند."),
  S(True, "Det rigtige tryk står i instruktionsbogen eller på et mærkat på bilen.", "The correct pressure is given in the owner's manual or on a label on the car.",
    "فشار درست در دفترچه‌ی راهنما یا روی برچسبی روی خودرو نوشته شده است.",
    "Fabrikken angiver trykket, ofte i dørkarmen eller i tankklappen.", "The manufacturer gives the pressure, often in the door frame or the fuel flap.",
    "کارخانه فشار را معمولاً روی چارچوب در یا درِ باک می‌نویسد."),
  S(False, "Trykket skal altid være det samme, uanset hvor meget bilen er lastet.", "The pressure must always be the same, however heavily the car is loaded.",
    "فشار باید همیشه یکی باشد، خودرو هر قدر هم بار داشته باشد.",
    "Ofte skal trykket være højere, når bilen er fuldt lastet.", "The pressure often needs to be higher when the car is fully loaded.",
    "اغلب وقتی خودرو پربار است، فشار باید بیشتر باشد."),
)
