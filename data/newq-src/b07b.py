# «آزمون جدید», batch 7 (5601–5700), part b: stopping and parking (7.18), overtaking (7.9), signs (6.1), people beside the road
# (7.6), traffic-calmed areas (7.10), speed (7.3), the car (1.2), large vehicles (3.2) and passengers (8.1).
# Rules: Færdselsloven §§ 2 nr. 18, 7 stk. 5 (not so near a fire or accident that the rescue work is hampered), 7 stk. 6 (free
# passage for the defence forces' columns), 4 stk. 2, 21 stk. 3–4, 24 stk. 2 (passing a vehicle in a lane reserved for one kind of
# traffic is not overtaking), 27 stk. 1, 29 stk. 1 nr. 1, 32 stk. 1, 70 (one trailer to a car), 80 stk. 4 and 80 a stk. 1, 3 and 6
# (child restraints; no rear-facing seat at an active front airbag; the driver sees to it), 80 b (no more passengers than seats
# with belts, front and back), 83 a (no people carried in a caravan); Bekendtgørelse om vejafmærkning (BEK 425/2023): § 19 (the
# law goes before parking signs where it is stricter; the signs only apply on their own side), C 21, C 25,1, C 55 (a weight plate:
# vehicles and combinations whose permitted total weight together exceeds it; the plate «Støj»), C 61 (bans stopping that is not
# for the sake of the other traffic), UC 60,6, D 26, E 47 (cykelgade: speed like the cyclists', normally under 30 km/h, parking only
# in marked places), E 49 (gågade: parking only in marked places), E 51 (opholds- og legeområde), R 11, Y 17 (red cross: lane closed;
# green arrow: open).
from nq import Q, S, above, picture, town, view

Q(5626, "7.18", town("""
THE SCENE: a pedestrian street paved with flagstones and lined with shops; at its entrance a blue square sign showing two white walking
people (the Danish pedestrian-street sign) with a plate below; pedestrians walk in the street; a delivery van has just been unloaded in
front of a shop; there are no marked parking spaces.
MUST BE CLEARLY VISIBLE: the pedestrian-street sign, the pedestrians, the van in front of the shop.
MUST NOT APPEAR: marked parking spaces, readable text on the plate, brand names."""),
  "Du har tilladelse til varekørsel i gågaden og har afleveret dine varer. Nu vil du parkere bilen i gågaden, mens du spiser frokost. "
  "Hvad gælder?",
  "You have permission to make deliveries in the pedestrian street and have delivered your goods. Now you want to park the car in the "
  "street while you have lunch. What applies?",
  "اجازه‌ی تحویل کالا در خیابان پیاده دارید و کالاها را تحویل داده‌اید. حالا می‌خواهید تا وقتی ناهار می‌خورید، خودرو را در همان خیابان "
  "پارک کنید. چه قاعده‌ای برقرار است؟",
  S(True, "I en gågade må jeg kun parkere på særligt afmærkede pladser.", "In a pedestrian street I may only park in specially marked spaces.",
    "در خیابان پیاده فقط در جاهای پارکِ مشخص‌شده می‌توانم پارک کنم.",
    "Parkering i en gågade må ikke ske uden for særligt afmærkede pladser.", "Parking in a pedestrian street must not take place outside specially marked spaces.",
    "در خیابان پیاده، پارک بیرون از جاهای مشخص‌شده ممنوع است."),
  S(True, "Når jeg kører i gågaden, skal farten være meget lav.", "When I drive in the pedestrian street, the speed must be very low.",
    "وقتی در خیابان پیاده می‌رانم، سرعت باید خیلی کم باشد.",
    "Kørsel i en gågade må kun ske med meget lav hastighed, normalt under 15 km/t.",
    "Driving in a pedestrian street may only be done at a very low speed, normally under 15 km/h.",
    "رانندگی در خیابان پیاده فقط با سرعت خیلی کم، معمولاً کمتر از ۱۵ کیلومتر بر ساعت، مجاز است."),
  S(False, "Med tilladelse til varekørsel må jeg parkere, hvor jeg vil i gågaden.",
    "With permission to make deliveries I may park wherever I like in the pedestrian street.",
    "با اجازه‌ی تحویل کالا می‌توانم هر جای خیابان پیاده که بخواهم پارک کنم.",
    "Tilladelsen gælder kørsel; parkering må kun ske på afmærkede pladser.", "The permission covers driving; parking may only be done in marked spaces.",
    "این اجازه برای رانندگی است؛ پارک فقط در جاهای مشخص‌شده مجاز است."),
  S(False, "Når butikkerne er lukkede, må biler parkere overalt i gågaden.", "When the shops are closed, cars may park anywhere in the pedestrian street.",
    "وقتی مغازه‌ها بسته‌اند، خودروها می‌توانند هر جای خیابان پیاده پارک کنند.",
    "Reglen om parkering gælder hele døgnet.", "The parking rule applies around the clock.", "قاعده‌ی پارک در تمام شبانه‌روز برقرار است."),
)

Q(5627, "7.18", town("""
THE SCENE: a street where bicycles dominate: at its start stands a blue square sign showing a white bicycle above a small white car (the
Danish sign for a cycle street) with a plate allowing cars; several cyclists ride in the street; along the kerb there are a few marked
parking bays, all taken; the rest of the kerb has no markings.
MUST BE CLEARLY VISIBLE: the cycle-street sign, the cyclists, the marked bays that are all taken, the unmarked kerb.
MUST NOT APPEAR: readable text, brand names."""),
  "Du kører i en cykelgade, hvor undertavlen tillader kørsel med bil. Alle de afmærkede parkeringspladser er optaget. Du vil parkere. "
  "Hvad gælder?",
  "You are driving in a cycle street where the plate allows cars. All the marked parking spaces are taken. You want to park. What applies?",
  "در یک خیابان دوچرخه می‌رانید که زیرتابلوی آن ورود خودرو را مجاز کرده است. همه‌ی جاهای پارکِ مشخص‌شده پُرند. می‌خواهید پارک کنید. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "I en cykelgade må jeg kun parkere på særligt afmærkede pladser.", "In a cycle street I may only park in specially marked spaces.",
    "در خیابان دوچرخه فقط در جاهای مشخص‌شده می‌توانم پارک کنم.",
    "Parkering i en cykelgade må ikke ske uden for særligt afmærkede pladser.", "Parking in a cycle street must not take place outside specially marked spaces.",
    "در خیابان دوچرخه، پارک بیرون از جاهای مشخص‌شده ممنوع است."),
  S(True, "Mens jeg kører i gaden, skal farten svare til cyklisternes.", "While I drive in the street, my speed must match the cyclists'.",
    "تا وقتی در این خیابان می‌رانم، سرعتم باید هم‌اندازه‌ی سرعت دوچرخه‌سواران باشد.",
    "I en cykelgade må der kun køres med en hastighed som cyklisternes, normalt under 30 km/t.",
    "In a cycle street you may only drive at a speed like the cyclists', normally under 30 km/h.",
    "در خیابان دوچرخه فقط با سرعتی مثل دوچرخه‌سواران، معمولاً کمتر از ۳۰ کیلومتر بر ساعت، می‌توان راند."),
  S(False, "Jeg må parkere ved kantstenen, når der ikke kører cyklister forbi.", "I may park at the kerb when no cyclists are passing.",
    "وقتی دوچرخه‌سواری رد نمی‌شود، می‌توانم کنار جدول پارک کنم.",
    "Parkering uden for de afmærkede pladser er forbudt, uanset trafikken.", "Parking outside the marked spaces is forbidden whatever the traffic.",
    "پارک بیرون از جاهای مشخص‌شده، صرف‌نظر از ترافیک، ممنوع است."),
  S(False, "I en cykelgade har biler forkørselsret for cyklister.", "In a cycle street cars have right of way over cyclists.",
    "در خیابان دوچرخه، خودروها بر دوچرخه‌سواران حق تقدم دارند.",
    "Gaden er reserveret til cykler, og de kørende skal vise hinanden særlig hensynsfuldhed.",
    "The street is reserved for bicycles, and road users must show each other particular consideration.",
    "این خیابان مخصوص دوچرخه است و همه باید ملاحظه‌ی ویژه‌ی یکدیگر را داشته باشند."),
)

Q(5628, "7.18", town("""
THE SCENE: a town street; at the kerb stands a blue square parking sign with a white «P» and a plate showing «2 timer»; the only free
kerb space ends just 3 m before a zebra crossing.
MUST BE CLEARLY VISIBLE: the P sign with its plate, the free space, the zebra crossing just after it.
MUST NOT APPEAR: other signs, any other text."""),
  "Langs gaden står en P-tavle, der tillader parkering i 2 timer. Den eneste ledige plads ligger 3 m før et fodgængerfelt. Hvad gælder?",
  "Along the street there is a P sign that allows parking for 2 hours. The only free space is 3 m before a pedestrian crossing. What applies?",
  "کنار خیابان تابلوی P هست که پارک تا ۲ ساعت را مجاز می‌کند. تنها جای خالی ۳ متر پیش از خط عابر پیاده است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke parkere så tæt på fodgængerfeltet, selv om tavlen tillader parkering.",
    "I must not park that close to the pedestrian crossing, even though the sign allows parking.",
    "نباید این‌قدر نزدیک خط عابر پیاده پارک کنم، حتی اگر تابلو پارک را مجاز کرده باشد.",
    "Hvor færdselsloven er strengere end tavlen, går loven forud, og der må ikke standses eller parkeres 5 m før et fodgængerfelt.",
    "Where the traffic act is stricter than the sign, the law comes first, and you must not stop or park 5 m before a pedestrian crossing.",
    "جایی که قانون رانندگی سخت‌گیرتر از تابلوست، قانون مقدم است و تا ۵ متر پیش از خط عابر پیاده نباید توقف یا پارک کرد."),
  S(False, "P-tavlen går forud for færdselslovens regler.", "The P sign comes before the rules of the traffic act.", "تابلوی P بر قواعد قانون رانندگی مقدم است.",
    "Er loven strengere end tavlen, gælder loven.", "If the law is stricter than the sign, the law applies.", "اگر قانون سخت‌گیرتر از تابلو باشد، قانون معتبر است."),
  S(False, "Det er tilladt, når jeg stiller P-skiven.", "It is allowed when I set the parking disc.", "اگر دیسک پارک را تنظیم کنم، مجاز است.",
    "P-skiven ændrer ikke forbuddet tæt ved fodgængerfeltet.", "The parking disc does not change the ban close to the crossing.",
    "دیسک پارک ممنوعیتِ نزدیکِ خط عابر را تغییر نمی‌دهد."),
)

Q(5629, "7.18", town("""
THE SCENE: a town street with one lane in our direction; on the right pavement stands a round sign with a blue field, a red border and
a red X (the Danish no-stopping sign); we stand still in a queue of cars waiting at a red traffic light ahead; a passenger in our car
reaches for the door handle.
MUST BE CLEARLY VISIBLE: the no-stopping sign, the queue, the red light ahead.
MUST NOT APPEAR: other signs, text."""),
  "I en gade med denne tavle holder du i kø for rødt lys. Hvad gælder?",
  "In a street with this sign you are standing in a queue at a red light. What applies?",
  "در خیابانی که این تابلو را دارد، پشت چراغ قرمز در صف ایستاده‌اید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må gerne holde stille i køen.", "I may stand still in the queue.", "می‌توانم در صف ایستاده بمانم.",
    "Tavlen forbyder kun standsning, som ikke sker af hensyn til den øvrige færdsel.",
    "The sign only bans stopping that is not done because of the other traffic.",
    "این تابلو فقط توقفی را ممنوع می‌کند که به‌خاطر ترافیک دیگر نیست."),
  S(True, "Jeg må ikke holde ind her for at lade passageren stige ud.", "I must not pull in here to let the passenger out.",
    "نباید این‌جا کنار بکشم تا مسافر پیاده شود.",
    "En standsning for at lade en passager stige ud sker ikke af hensyn til færdslen.",
    "A stop to let a passenger out is not done because of the traffic.", "توقف برای پیاده شدن مسافر به‌خاطر ترافیک نیست."),
  S(False, "Jeg skal køre ud af gaden, selv om lyset er rødt.", "I must drive out of the street even though the light is red.",
    "باید از خیابان بیرون بروم، حتی اگر چراغ قرمز باشد.",
    "Du må gerne holde i køen, og rødt lys betyder stop.", "You may stand in the queue, and a red light means stop.",
    "می‌توانید در صف بمانید و چراغ قرمز یعنی ایست."),
  S(False, "Standsningsforbuddet gælder i begge sider af gaden.", "The no-stopping ban applies on both sides of the street.",
    "ممنوعیت توقف در هر دو سمت خیابان برقرار است.",
    "Tavler for standsning og parkering gælder kun i den side af vejen, hvor de står.",
    "Signs for stopping and parking only apply on the side of the road where they stand.",
    "تابلوهای توقف و پارک فقط در همان سمتی از جاده که نصب شده‌اند معتبرند."),
)

Q(5630, "7.18", view("""
THE SCENE: a country road with a wide grass verge on the right; at the edge of the verge stands a sign showing a car on a verge under
a red-bordered blue roundel with one red diagonal bar (the Danish sign that bans parking on the verge); we are slowing down with our
right indicator lamp glowing on the dashboard strip; a passenger sits beside us.
MUST BE CLEARLY VISIBLE: the sign banning parking on the verge, the wide grass verge.
MUST NOT APPEAR: other signs, text."""),
  "Uden for byen står en tavle, der forbyder parkering på rabatten. Du vil standse et øjeblik og lade en passager stige ud på rabatten. "
  "Hvad gælder?",
  "Outside town there is a sign that bans parking on the verge. You want to stop for a moment and let a passenger get out onto the "
  "verge. What applies?",
  "بیرون شهر تابلویی هست که پارک روی حاشیه را ممنوع می‌کند. می‌خواهید لحظه‌ای بایستید تا مسافری روی حاشیه پیاده شود. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg må gerne standse kort på rabatten for at lade passageren stige ud.", "I may stop briefly on the verge to let the passenger out.",
    "می‌توانم کوتاه روی حاشیه بایستم تا مسافر پیاده شود.",
    "Tavlen forbyder parkering, og en standsning for at lade en passager stige ud er ikke parkering.",
    "The sign bans parking, and a stop to let a passenger out is not parking.",
    "این تابلو پارک را ممنوع می‌کند و توقف برای پیاده شدن مسافر پارک حساب نمی‌شود."),
  S(False, "Tavlen forbyder også at standse på rabatten.", "The sign also bans stopping on the verge.", "این تابلو توقف روی حاشیه را هم ممنوع می‌کند.",
    "Standsning på rabat forbydes med en anden tavle.", "Stopping on the verge is banned with a different sign.",
    "توقف روی حاشیه با تابلوی دیگری ممنوع می‌شود."),
  S(False, "Jeg må parkere på rabatten, så længe havariblinket er tændt.", "I may park on the verge as long as the hazard lights are on.",
    "تا وقتی چراغ‌های فلاشر روشن است، می‌توانم روی حاشیه پارک کنم.",
    "Havariblinket gør ikke parkering tilladt, hvor den er forbudt.", "The hazard lights do not make parking allowed where it is forbidden.",
    "چراغ فلاشر پارک را جایی که ممنوع است مجاز نمی‌کند."),
)

Q(5631, "7.9", view("""
THE SCENE: a two-lane road with a broken centre line; about 30 m ahead a cyclist rides at the right edge; a little further ahead a
raised traffic island lies in the middle of the road, so the lane beside it is narrow; an oncoming car is far away.
MUST BE CLEARLY VISIBLE: the cyclist, the traffic island making the lane narrow.
MUST NOT APPEAR: signs, text."""),
  "Du vil overhale en cyklist. Lidt længere fremme ligger en helle midt på vejen, så vognbanen bliver smal. Hvad gælder?",
  "You want to overtake a cyclist. A little further ahead there is a traffic island in the middle of the road, so the lane becomes "
  "narrow. What applies?",
  "می‌خواهید از دوچرخه‌سواری سبقت بگیرید. کمی جلوتر وسط جاده جزیره‌ای هست و خط باریک می‌شود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg venter med at overhale, til cyklisten er forbi hellen.", "I wait to overtake until the cyclist is past the island.",
    "صبر می‌کنم تا دوچرخه‌سوار از کنار جزیره رد شود و بعد سبقت می‌گیرم.",
    "Ved hellen er der ikke plads til at holde tilstrækkelig afstand til siden.", "At the island there is no room to keep enough side distance.",
    "کنار جزیره جای کافی برای نگه داشتن فاصله‌ی پهلو نیست."),
  S(True, "Jeg holder god afstand bag cyklisten, mens jeg venter.", "I keep a good distance behind the cyclist while I wait.",
    "تا وقتی منتظرم، فاصله‌ی کافی پشت دوچرخه‌سوار نگه می‌دارم.",
    "Cyklisten kan blive nødt til at bremse eller svinge lidt ud ved hellen.", "The cyclist may have to brake or swerve out a little at the island.",
    "ممکن است دوچرخه‌سوار کنار جزیره مجبور شود ترمز کند یا کمی به بیرون بپیچد."),
  S(False, "Jeg når lige forbi før hellen, hvis jeg sætter farten op.", "I can just make it past before the island if I speed up.",
    "اگر سرعتم را بالا ببرم، درست پیش از جزیره رد می‌شوم.",
    "Det kan ende med, at du presser cyklisten ved hellen.", "It may end with you squeezing the cyclist at the island.",
    "ممکن است کار به جایی بکشد که کنار جزیره دوچرخه‌سوار را در تنگنا بگذارید."),
  S(False, "Cyklisten skal standse og lade mig komme forbi.", "The cyclist must stop and let me get past.", "دوچرخه‌سوار باید بایستد و بگذارد من رد شوم.",
    "Cyklisten har ingen pligt til at standse for dig.", "The cyclist has no duty to stop for you.", "دوچرخه‌سوار موظف نیست برای شما بایستد."),
)

Q(5632, "7.9", view("""
THE SCENE: a two-lane country road; ahead of us a column of six green military lorries drives in our lane at even distances, the last
one with a flag at its rear; the oncoming lane is free for a long way.
MUST BE CLEARLY VISIBLE: the column of military lorries, the gaps between them, the free oncoming lane.
MUST NOT APPEAR: signs, text, weapons."""),
  "En kolonne af militærkøretøjer kører foran dig på landevejen. Hvad gælder?",
  "A column of military vehicles is driving in front of you on the country road. What applies?",
  "ستونی از خودروهای نظامی جلوی شما در جاده‌ی بیرون شهر حرکت می‌کند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre ind imellem køretøjerne i kolonnen.", "I must not drive in between the vehicles in the column.",
    "نباید بین خودروهای این ستون وارد شوم.",
    "Trafikanter skal give fri passage for forsvarets kolonner.", "Road users must give free passage to the defence forces' columns.",
    "کاربران راه باید به ستون‌های ارتش راه عبور آزاد بدهند."),
  S(True, "Vil jeg overhale, skal jeg kunne komme forbi hele kolonnen uden at skulle ind i den.",
    "If I want to overtake, I must be able to pass the whole column without having to cut into it.",
    "اگر بخواهم سبقت بگیرم، باید بتوانم از کل ستون رد شوم بی‌آن‌که مجبور شوم وارد آن شوم.",
    "Du må ikke bryde ind i kolonnen, så overhalingen skal kunne gennemføres helt.",
    "You must not break into the column, so the overtaking must be possible all the way.",
    "نباید وارد ستون شوید، پس سبقت باید تا آخر ممکن باشد."),
  S(False, "Kolonnen skal holde ind til siden, så jeg kan komme forbi.", "The column must pull in so that I can get past.",
    "ستون باید کنار بکشد تا من رد شوم.",
    "Det er dig, der skal give kolonnen fri passage.", "It is you who must give the column free passage.",
    "این شما هستید که باید به ستون راه آزاد بدهید."),
  S(False, "Jeg må køre ind i et hul i kolonnen, hvis der er plads.", "I may move into a gap in the column if there is room.",
    "اگر جا باشد، می‌توانم وارد فاصله‌ای در ستون شوم.",
    "Kolonnen skal have fri passage, og du må ikke bryde ind i den.", "The column must have free passage, and you must not break into it.",
    "ستون باید راه آزاد داشته باشد و نباید وارد آن شوید."),
)

Q(5633, "7.9", town("""
THE SCENE: a road with two lanes in our direction before a junction; the left lane has a white arrow pointing left painted in it, the
right lane an arrow pointing straight ahead; in the right lane, ahead of us, the cars drive slowly; the left-turn lane is empty.
MUST BE CLEARLY VISIBLE: the left-turn arrow in the left lane, the straight-ahead arrow in the right lane, the slow cars.
MUST NOT APPEAR: signs, text."""),
  "Før krydset er der en vognbane med pil til venstre. Du skal ligeud, men bilerne i vognbanen ligeud kører langsomt. Hvad gælder?",
  "Before the junction there is a lane with an arrow to the left. You are going straight on, but the cars in the straight-ahead lane are "
  "slow. What applies?",
  "پیش از تقاطع خطی با پیکان چپ هست. شما مستقیم می‌روید، ولی خودروهای خط مستقیم آهسته حرکت می‌کنند. چه قاعده‌ای برقرار است؟",
  S(True, "Kører jeg ind i vognbanen med pil til venstre, skal jeg svinge til venstre.",
    "If I move into the lane with the arrow to the left, I must turn left.", "اگر وارد خط پیکان چپ شوم، باید به چپ بپیچم.",
    "Pile foran et kryds angiver, at den, der er i vognbanen ved indkørslen i krydset, skal køre i den viste retning.",
    "Arrows before a junction mean that whoever is in the lane when entering the junction must go the way shown.",
    "پیکان‌های پیش از تقاطع یعنی هر کس هنگام ورود به تقاطع در آن خط است، باید در جهت نشان‌داده‌شده برود."),
  S(False, "Jeg må bruge venstresvingsbanen og køre ligeud, hvis der er frit.", "I may use the left-turn lane and go straight on if it is clear.",
    "اگر خالی باشد، می‌توانم از خط گردش به چپ استفاده کنم و مستقیم بروم.",
    "Fra vognbanen med pil til venstre skal du svinge til venstre.", "From the lane with the left arrow you must turn left.",
    "از خطی که پیکان چپ دارد باید به چپ بپیچید."),
  S(False, "Jeg må overhale i venstresvingsbanen og køre tilbage i min vognbane inde i krydset.",
    "I may overtake in the left-turn lane and move back into my lane inside the junction.",
    "می‌توانم در خط گردش به چپ سبقت بگیرم و داخل تقاطع به خط خودم برگردم.",
    "Pilene skal følges, og du skal være i den rigtige vognbane i god tid før krydset.",
    "The arrows must be followed, and you must be in the right lane in good time before the junction.",
    "پیکان‌ها را باید رعایت کرد و باید به‌موقع پیش از تقاطع در خط درست باشید."),
)

Q(5634, "7.9", view("""
THE SCENE: a two-lane country road; we are in the oncoming lane, just passing a cyclist who rides at the right edge; in the interior
rear-view mirror at the top of the picture the cyclist can be seen still close behind our car's rear; the oncoming lane ahead is free.
MUST BE CLEARLY VISIBLE: the cyclist close behind in the mirror, our car in the oncoming lane, the free road ahead.
MUST NOT APPEAR: signs, text."""),
  "Du har næsten overhalet en cyklist på landevejen og vil køre ind til højre igen. Hvordan forholder du dig?",
  "You have almost overtaken a cyclist on a country road and want to move back to the right. What do you do?",
  "تقریباً از دوچرخه‌سواری در جاده‌ی بیرون شهر سبقت گرفته‌اید و می‌خواهید دوباره به راست برگردید. چه می‌کنید؟",
  S(True, "Jeg venter med at køre ind, til jeg er et godt stykke foran cyklisten.", "I wait to move in until I am a good way ahead of the cyclist.",
    "صبر می‌کنم تا فاصله‌ی خوبی جلوی دوچرخه‌سوار بگیرم و بعد برمی‌گردم.",
    "Du skal holde tilstrækkelig afstand til siden, indtil du er helt forbi.", "You must keep enough side distance until you are fully past.",
    "تا کاملاً رد نشده‌اید، باید فاصله‌ی کافی از پهلو داشته باشید."),
  S(True, "Jeg ser i spejlet, at cyklisten er kommet godt bag mig, før jeg trækker ind.",
    "I check in the mirror that the cyclist is well behind me before I pull in.",
    "پیش از برگشتن، در آینه مطمئن می‌شوم که دوچرخه‌سوار به اندازه‌ی کافی پشت سرم است.",
    "Så ved du, at der er plads til at køre ind.", "Then you know that there is room to move in.", "این‌طور می‌دانید که جا برای برگشتن هست."),
  S(True, "Jeg må ikke være til ulempe for cyklisten, når jeg kører ind.", "I must not cause the cyclist inconvenience when I move in.",
    "هنگام برگشتن نباید برای دوچرخه‌سوار مزاحمت ایجاد کنم.",
    "Efter overhalingen skal du kunne føre bilen ind i trafikstrømmen uden at være til ulempe for den.",
    "After overtaking you must be able to bring the car back into the traffic without inconveniencing it.",
    "پس از سبقت باید بتوانید بدون مزاحمت به جریان ترافیک برگردید."),
  S(False, "Jeg kører ind lige foran cyklisten, så jeg hurtigt er tilbage i min vognbane.",
    "I move in right in front of the cyclist so that I am quickly back in my lane.",
    "درست جلوی دوچرخه‌سوار برمی‌گردم تا زود در خط خودم باشم.",
    "Så kan cyklisten blive presset og være nødt til at bremse.", "Then the cyclist may be squeezed and have to brake.",
    "این‌طور ممکن است دوچرخه‌سوار در تنگنا بیفتد و مجبور به ترمز شود."),
)

Q(5635, "7.9", town("""
THE SCENE: a town road with one lane in our direction; along the right side runs a painted cycle lane separated from our lane by a broad
unbroken white line, with white bicycle symbols in it; about 20 m ahead a cyclist rides in the cycle lane; a little further ahead a
parked delivery bike stands partly in the cycle lane.
MUST BE CLEARLY VISIBLE: the cycle lane with its broad line and symbols, the cyclist, the delivery bike partly in the cycle lane.
MUST NOT APPEAR: signs, text."""),
  "Langs vejen er der en cykelbane, adskilt fra din vognbane med en bred hvid linje. Du kommer op bag en cyklist i cykelbanen. Hvad gælder?",
  "Along the road there is a cycle lane, separated from your lane by a broad white line. You come up behind a cyclist in the cycle lane. "
  "What applies?",
  "کنار جاده یک خط دوچرخه هست که با خطی سفید و پهن از خط شما جدا شده است. پشت دوچرخه‌سواری در خط دوچرخه می‌رسید. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Det regnes ikke som overhaling, når jeg kører forbi cyklisten i min egen vognbane.",
    "Passing the cyclist in my own lane does not count as overtaking.", "رد شدن از کنار دوچرخه‌سوار در خط خودم سبقت حساب نمی‌شود.",
    "Kører et køretøj forbi et andet, som er i en vognbane forbeholdt en bestemt art af færdsel, anses det ikke som overhaling.",
    "When a vehicle passes another that is in a lane reserved for one kind of traffic, it does not count as overtaking.",
    "وقتی وسیله‌ای از کنار وسیله‌ی دیگری که در خطِ مخصوصِ یک نوع ترافیک است رد می‌شود، سبقت حساب نمی‌شود."),
  S(True, "Jeg er klar på, at cyklisten kan svinge ud af cykelbanen for at komme uden om noget.",
    "I am ready for the cyclist to swerve out of the cycle lane to get round something.",
    "آماده‌ام که دوچرخه‌سوار برای دور زدن چیزی از خط دوچرخه بیرون بیاید.",
    "Den parkerede ladcykel kan tvinge cyklisten ud i din vognbane.", "The parked delivery bike may force the cyclist out into your lane.",
    "دوچرخه‌ی باریِ پارک‌شده ممکن است دوچرخه‌سوار را به خط شما براند."),
  S(False, "Jeg må ikke køre forbi cyklisten, før cykelbanen ophører.", "I must not pass the cyclist until the cycle lane ends.",
    "تا خط دوچرخه تمام نشده، نباید از کنار دوچرخه‌سوار رد شوم.",
    "Du må godt køre forbi i din egen vognbane, når det kan ske uden fare.", "You may pass in your own lane when it can be done safely.",
    "وقتی بی‌خطر باشد، می‌توانید در خط خودتان از کنارش رد شوید."),
  S(False, "Jeg dytter, så cyklisten bliver i cykelbanen.", "I sound the horn so that the cyclist stays in the cycle lane.",
    "بوق می‌زنم تا دوچرخه‌سوار در خط دوچرخه بماند.",
    "Hornet må kun bruges for at forebygge eller afværge fare.", "The horn may only be used to prevent or avert danger.",
    "بوق فقط برای پیشگیری یا دفع خطر است."),
)

Q(5636, "6.1", town("""
THE SCENE: the entrance to a narrow street between old houses; at the entrance stands a round white sign with a broad red border and no
symbol at all (the Danish sign banning driving in both directions).
MUST BE CLEARLY VISIBLE: the round white sign with the red border and nothing in the middle.
MUST NOT APPEAR: other signs, text, plates."""),
  "Ved indkørslen til en vej står denne tavle uden undertavle. Hvad betyder den?",
  "This sign without a plate stands at the entrance to a road. What does it mean?",
  "در ورودی یک راه این تابلو بدون زیرتابلو قرار دارد. معنی‌اش چیست؟",
  S(True, "Det er forbudt at køre ad vejen i begge retninger.", "Driving along the road is forbidden in both directions.",
    "رانندگی در این راه در هر دو جهت ممنوع است.",
    "Tavlen forbyder kørsel i begge retninger.", "The sign bans driving in both directions.", "این تابلو رانندگی در هر دو جهت را ممنوع می‌کند."),
  S(True, "Jeg må ikke køre ind ad vejen i bil.", "I must not drive into the road by car.", "نباید با خودرو وارد این راه شوم.",
    "Forbuddet gælder kørsel med køretøjer.", "The ban covers driving with vehicles.", "این ممنوعیت برای رانندگی با وسایل نقلیه است."),
  S(False, "Jeg må køre ind, hvis jeg skal aflevere en pakke.", "I may drive in if I have a parcel to deliver.", "اگر بسته‌ای برای تحویل داشته باشم، می‌توانم وارد شوم.",
    "Uden en undertavle, der tillader det, gælder forbuddet også kørsel med et ærinde.",
    "Without a plate that allows it, the ban also covers driving on an errand.", "بدون زیرتابلویی که اجازه دهد، این ممنوعیت شامل رفت‌وآمد برای کار هم می‌شود."),
  S(False, "Tavlen betyder, at vejen er ensrettet.", "The sign means that the road is one-way.", "این تابلو یعنی این راه یک‌طرفه است.",
    "Ensretning vises med en anden tavle; denne forbyder kørsel i begge retninger.", "One-way traffic is shown with another sign; this one bans driving in both directions.",
    "یک‌طرفه بودن با تابلوی دیگری نشان داده می‌شود؛ این تابلو رانندگی در هر دو جهت را ممنوع می‌کند."),
)

Q(5637, "6.1", view("""
THE SCENE: a narrow road leading into a park; at its entrance stands a round white sign with a red border showing a black bicycle above
a black small moped (the Danish sign banning bicycles and small mopeds); a car drives into the road.
MUST BE CLEARLY VISIBLE: the round sign with the bicycle and the small moped.
MUST NOT APPEAR: other signs, text."""),
  "Du kører bil og kommer til en vej med denne tavle. Hvad gælder?",
  "You are driving a car and come to a road with this sign. What applies?",
  "با خودرو به راهی می‌رسید که این تابلو را دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Cyklister og førere af lille knallert må ikke køre ad vejen.", "Cyclists and riders of small mopeds must not use the road.",
    "دوچرخه‌سواران و رانندگان موتور گازی کوچک نباید از این راه بروند.",
    "Tavlen forbyder cykel og lille knallert.", "The sign bans bicycles and small mopeds.", "این تابلو دوچرخه و موتور گازی کوچک را ممنوع می‌کند."),
  S(True, "Jeg må gerne køre ad vejen i bil.", "I may use the road by car.", "می‌توانم با خودرو از این راه بروم.",
    "Forbuddet gælder kun de køretøjer, som tavlen viser.", "The ban only covers the vehicles shown on the sign.",
    "این ممنوعیت فقط برای وسایلی است که تابلو نشان می‌دهد."),
  S(False, "Forbuddet gælder alle køretøjer.", "The ban covers all vehicles.", "این ممنوعیت برای همه‌ی وسایل نقلیه است.",
    "Tavlen viser kun en cykel og en lille knallert.", "The sign only shows a bicycle and a small moped.",
    "این تابلو فقط یک دوچرخه و یک موتور گازی کوچک را نشان می‌دهد."),
  S(False, "Cyklister må køre ad vejen, når de kører langsomt.", "Cyclists may use the road when they ride slowly.",
    "دوچرخه‌سواران اگر آهسته بروند، می‌توانند از این راه استفاده کنند.",
    "Forbuddet gælder uanset farten.", "The ban applies whatever the speed.", "این ممنوعیت به سرعت بستگی ندارد."),
)

Q(5638, "6.1", view("""
THE SCENE: a path beside a road; at its start stands a round blue sign showing a white bicycle on the left and a white walking person on
the right, separated by a white vertical line (the Danish sign for a divided path); the path itself is divided along its length by a
white line, with a bicycle symbol on one side and a walking-person symbol on the other.
MUST BE CLEARLY VISIBLE: the round blue sign with the dividing line, the path divided into two lanes.
MUST NOT APPEAR: other signs, text."""),
  "Ved en sti står denne tavle. Hvad betyder den?",
  "This sign stands at a path. What does it mean?",
  "کنار یک مسیر این تابلو قرار دارد. معنی‌اش چیست؟",
  S(True, "Stien er delt i baner for forskellige trafikanter.", "The path is divided into lanes for different road users.",
    "این مسیر برای کاربران مختلف به چند خط تقسیم شده است.",
    "Tavlen angiver en delt sti med flere baner, adskilt ved afstribning, rabat eller lignende.",
    "The sign marks a divided path with several lanes, separated by lines, a verge or the like.",
    "این تابلو مسیری تقسیم‌شده با چند خط را نشان می‌دهد که با خط‌کشی، حاشیه یا مانند آن از هم جدا شده‌اند."),
  S(True, "Hver bane må kun bruges af den trafikantgruppe, som symbolet viser.", "Each lane may only be used by the group of road users that the symbol shows.",
    "هر خط فقط برای گروهی از کاربران است که نمادش نشان می‌دهد.",
    "Hver bane skal benyttes af den færdselsart, der angives med symbol, og må kun benyttes af denne.",
    "Each lane must be used by the kind of traffic shown by its symbol, and only by it.",
    "هر خط را باید همان نوع ترافیکی استفاده کند که نمادش نشان می‌دهد و فقط همان."),
  S(True, "Går jeg på stien, skal jeg bruge den bane, der er for gående.", "If I walk on the path, I must use the lane for pedestrians.",
    "اگر در این مسیر پیاده بروم، باید از خطِ مخصوص عابران استفاده کنم.",
    "Gående har deres egen bane på en delt sti.", "Pedestrians have their own lane on a divided path.", "عابران در مسیر تقسیم‌شده خط مخصوص خود را دارند."),
  S(False, "Alle må bruge hele stien, som de vil.", "Everyone may use the whole path as they like.", "همه می‌توانند هر طور بخواهند از کل مسیر استفاده کنند.",
    "På en delt sti har hver trafikantgruppe sin egen bane.", "On a divided path each group of road users has its own lane.",
    "در مسیر تقسیم‌شده هر گروه از کاربران خط خودش را دارد."),
)

Q(5639, "6.1", view("""
THE SCENE: a motorway with three lanes in our direction under an overhead gantry; above our lane (the right lane) a lane signal shows a
red X; above the middle lane a lane signal shows a green arrow pointing down; further ahead cones close the right lane.
MUST BE CLEARLY VISIBLE: the red X above our lane, the green downward arrow above the middle lane, the cones further ahead.
MUST NOT APPEAR: signs, text."""),
  "På motorvejen lyser et rødt kryds over den vognbane, du kører i. Over vognbanen ved siden af lyser en grøn pil nedad. Hvad gælder?",
  "On the motorway a red cross lights up above the lane you are in. Above the next lane a green arrow pointing down is lit. What applies?",
  "در آزادراه بالای خطی که در آن می‌رانید ضربدر قرمز روشن شده و بالای خط کناری پیکان سبزِ رو به پایین. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke fortsætte i vognbanen under det røde kryds.", "I must not continue in the lane under the red cross.",
    "نباید در خطِ زیر ضربدر قرمز ادامه دهم.",
    "Rødt kryds betyder, at kørsel i vognbanen er forbudt.", "A red cross means that driving in the lane is forbidden.",
    "ضربدر قرمز یعنی رانندگی در آن خط ممنوع است."),
  S(True, "Jeg skal snarest skifte til vognbanen med den grønne pil, når det kan ske uden fare.",
    "I must change to the lane with the green arrow as soon as possible, when it can be done safely.",
    "باید هرچه زودتر، وقتی بی‌خطر است، به خطی که پیکان سبز دارد بروم.",
    "Viser signalet rødt kryds, skal du snarest køre over i en vognbane, der er åben for kørsel.",
    "When the signal shows a red cross, you must move over to a lane that is open as soon as possible.",
    "وقتی چراغ ضربدر قرمز نشان می‌دهد، باید هرچه زودتر به خطی بروید که باز است."),
  S(False, "Det røde kryds betyder, at der er fartkontrol længere fremme.", "The red cross means that there is a speed check further ahead.",
    "ضربدر قرمز یعنی جلوتر کنترل سرعت هست.",
    "Det betyder, at vognbanen er lukket.", "It means that the lane is closed.", "یعنی آن خط بسته است."),
  S(False, "Jeg må blive i vognbanen, så længe jeg ikke kan se nogen forhindring.", "I may stay in the lane as long as I cannot see any obstacle.",
    "تا وقتی مانعی نمی‌بینم، می‌توانم در همان خط بمانم.",
    "Forbuddet gælder, selv om du endnu ikke kan se, hvorfor vognbanen er lukket.",
    "The ban applies even though you cannot yet see why the lane is closed.", "این ممنوعیت برقرار است، حتی اگر هنوز نبینید چرا خط بسته شده."),
)

Q(5640, "7.6", town("""
THE SCENE: a town road with two lanes in our direction; we are in the LEFT lane; in the RIGHT lane just ahead a grey car has stopped
where there is no crossing; in front of it a woman is walking across the road towards our lane, partly hidden by the grey car.
MUST BE CLEARLY VISIBLE: the stopped grey car, the woman crossing in front of it, partly hidden.
MUST NOT APPEAR: signs, zebra crossings, text."""),
  "Bilen i vognbanen ved siden af dig standser, og en gående går over vejen foran den. Der er ikke noget fodgængerfelt. Hvordan "
  "forholder du dig?",
  "The car in the lane next to you stops, and a pedestrian is crossing the road in front of it. There is no pedestrian crossing. What do "
  "you do?",
  "خودروی خط کناری شما می‌ایستد و عابری از جلوی آن از عرض خیابان رد می‌شود. خط عابر پیاده‌ای نیست. چه می‌کنید؟",
  S(True, "Jeg standser og lader den gående komme over.", "I stop and let the pedestrian get across.", "می‌ایستم و می‌گذارم عابر رد شود.",
    "Den gående er allerede på kørebanen, og du skal give den gående tid og plads.",
    "The pedestrian is already in the carriageway, and you must give the pedestrian time and room.",
    "عابر همین حالا روی سواره‌روست و باید به او فرصت و جا بدهید."),
  S(True, "Bilen kan skjule flere gående.", "The car may hide more pedestrians.", "ممکن است آن خودرو عابران دیگری را هم پنهان کرده باشد.",
    "Du kan ikke se, hvad der er foran bilen.", "You cannot see what is in front of the car.", "نمی‌بینید جلوی آن خودرو چه هست."),
  S(False, "Jeg kører videre, fordi den gående ikke går i et fodgængerfelt.", "I drive on because the pedestrian is not on a pedestrian crossing.",
    "ادامه می‌دهم، چون عابر روی خط عابر نیست.",
    "Du skal også passe på gående uden for fodgængerfelter.", "You must also look out for pedestrians outside pedestrian crossings.",
    "باید مراقب عابرانِ بیرون از خط عابر هم باشید."),
  S(False, "Jeg dytter, så den gående bliver stående foran bilen.", "I sound the horn so that the pedestrian stays in front of the car.",
    "بوق می‌زنم تا عابر جلوی آن خودرو بماند.",
    "Et dyt kan forskrække den gående, og du skal i stedet standse.", "A toot may startle the pedestrian, and you must stop instead.",
    "بوق ممکن است عابر را بترساند و شما باید به‌جای آن بایستید."),
)

Q(5641, "7.6", town("""
THE SCENE: a residential street on a dark winter morning, lit only by a few weak street lamps; cars are parked along the right kerb with
frost on their windows; a person in a dark coat stands out in the carriageway beside one of them, scraping ice off its windscreen with
their back to us.
MUST BE CLEARLY VISIBLE: the person in the dark coat standing in the carriageway, the frosty parked cars.
MUST NOT APPEAR: signs, text.""", cond="dark winter morning, frost, weak street lighting"),
  "Det er en mørk vintermorgen. En person står ude på kørebanen og skraber is af ruderne på sin parkerede bil. Hvordan forholder du dig?",
  "It is a dark winter morning. A person is standing out in the carriageway scraping ice off the windows of their parked car. What do you do?",
  "صبح تاریک زمستانی است. فردی بیرون، روی سواره‌رو ایستاده و یخِ شیشه‌های خودروی پارک‌شده‌اش را می‌تراشد. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og kører i god afstand forbi personen.", "I slow down and pass the person at a good distance.",
    "سرعتم را کم می‌کنم و با فاصله‌ی کافی از کنار او رد می‌شوم.",
    "Du skal give den gående fornøden plads på vejen.", "You must give the pedestrian enough room on the road.",
    "باید به عابر جای کافی روی جاده بدهید."),
  S(True, "Personen kan træde et skridt tilbage ud foran mig uden at se sig for.", "The person may take a step back in front of me without looking.",
    "ممکن است او بی‌آن‌که نگاه کند یک قدم عقب بیاید و جلوی من قرار بگیرد.",
    "Den, der er optaget af at skrabe ruder, holder ikke øje med trafikken.", "Someone busy scraping windows is not watching the traffic.",
    "کسی که سرگرم تراشیدن یخ است، حواسش به ترافیک نیست."),
  S(True, "Personen kan være svær at se i mørket, når tøjet er mørkt.", "The person may be hard to see in the dark when the clothes are dark.",
    "وقتی لباسش تیره است، ممکن است در تاریکی به‌سختی دیده شود.",
    "Gående i mørkt tøj ses sent i mørke.", "Pedestrians in dark clothes are seen late in the dark.", "عابرانِ تیره‌پوش در تاریکی دیر دیده می‌شوند."),
  S(True, "Jeg er parat til at standse, hvis personen bevæger sig ud mod mig.", "I am ready to stop if the person moves out towards me.",
    "اگر او به سمت من بیاید، آماده‌ی ایستادن هستم.",
    "Så kan du undgå at ramme personen.", "Then you can avoid hitting the person.", "این‌طور می‌توانید از برخورد با او جلوگیری کنید."),
)

Q(5642, "7.6", town("""
THE SCENE: a town street; a red fire engine stands with flashing blue lights outside a house with smoke coming from a window;
firefighters work beside it, and fire hoses lie across the carriageway; further back a police officer stands in the street.
MUST BE CLEARLY VISIBLE: the fire engine, the hoses across the road, the firefighters, the police officer.
MUST NOT APPEAR: flames close to people, injured people, text."""),
  "En brandbil holder ved et brandsted i gaden, og der ligger brandslanger hen over kørebanen. Hvordan forholder du dig?",
  "A fire engine stands at a fire in the street, and fire hoses lie across the carriageway. What do you do?",
  "یک خودروی آتش‌نشانی کنار محل آتش‌سوزی در خیابان ایستاده و شیلنگ‌های آتش‌نشانی عرض سواره‌رو را گرفته‌اند. چه می‌کنید؟",
  S(True, "Jeg må ikke komme så tæt på, at slukningsarbejdet bliver hæmmet.", "I must not come so close that the firefighting is hampered.",
    "نباید آن‌قدر نزدیک شوم که کار خاموش کردن آتش مختل شود.",
    "Uvedkommende må ikke komme så nær et brandsted, at slukningsarbejdet hæmmes.", "Outsiders must not come so near a fire that the firefighting is hampered.",
    "افراد متفرقه نباید آن‌قدر به محل آتش‌سوزی نزدیک شوند که کار اطفا مختل شود."),
  S(True, "Dirigerer politiet trafikken, følger jeg politiets anvisninger.", "If the police are directing the traffic, I follow their directions.",
    "اگر پلیس ترافیک را هدایت می‌کند، از دستورهای پلیس پیروی می‌کنم.",
    "Politiets anvisninger skal følges forud for tavler og regler.", "Police directions must be followed before signs and rules.",
    "دستورهای پلیس بر تابلوها و قواعد مقدم‌اند."),
  S(True, "Jeg finder om nødvendigt en anden vej.", "If necessary, I find another way.", "اگر لازم باشد، راه دیگری پیدا می‌کنم.",
    "Så holder du vejen fri for redningskøretøjerne.", "That way you keep the road free for the rescue vehicles.",
    "این‌طور راه را برای خودروهای امدادی باز نگه می‌دارید."),
  S(False, "Jeg standser tæt ved brandstedet for at se, hvad der sker.", "I stop close to the fire to see what is happening.",
    "نزدیک محل آتش‌سوزی می‌ایستم تا ببینم چه خبر است.",
    "Det kan hæmme redningsarbejdet og spærre for udrykningskøretøjer.", "That can hamper the rescue work and block emergency vehicles.",
    "این کار ممکن است کار امداد را مختل کند و راه خودروهای امدادی را ببندد."),
)

Q(5643, "7.10", town("""
THE SCENE: a residential area with houses and small gardens; at its entrance stands a blue rectangular sign showing white figures of an
adult, a child playing with a ball, a house and a car (the Danish sign for a living-and-play area); in the middle of the road two
children play with a ball.
MUST BE CLEARLY VISIBLE: the living-and-play area sign, the children playing in the middle of the road.
MUST NOT APPEAR: other signs, text."""),
  "Du kører ind i et område med denne tavle. Midt på vejen leger nogle børn med en bold. Hvordan forholder du dig?",
  "You drive into an area with this sign. In the middle of the road some children are playing with a ball. What do you do?",
  "وارد منطقه‌ای با این تابلو می‌شوید. وسط راه چند کودک با توپ بازی می‌کنند. چه می‌کنید؟",
  S(True, "Børnene må gerne lege på vejen i hele dens bredde.", "The children may play on the road across its whole width.",
    "بچه‌ها اجازه دارند در تمام عرض راه بازی کنند.",
    "I et opholds- og legeområde er det tilladt at opholde sig og lege på vejen i hele dens bredde.",
    "In a living-and-play area it is allowed to stay and play on the road across its whole width.",
    "در منطقه‌ی اقامت و بازی، ماندن و بازی کردن در تمام عرض راه مجاز است."),
  S(True, "Jeg kører med meget lav hastighed.", "I drive at a very low speed.", "با سرعت خیلی کم می‌رانم.",
    "I et opholds- og legeområde må der kun køres med meget lav hastighed, normalt under 15 km/t.",
    "In a living-and-play area you may only drive at a very low speed, normally under 15 km/h.",
    "در منطقه‌ی اقامت و بازی فقط با سرعت خیلی کم، معمولاً کمتر از ۱۵ کیلومتر بر ساعت، می‌توان راند."),
  S(True, "Jeg kører først forbi, når børnene har set bilen og har givet plads.", "I only pass when the children have seen the car and made room.",
    "فقط وقتی رد می‌شوم که بچه‌ها خودرو را دیده و جا باز کرده باشند.",
    "Du skal sikre dig, at de er opmærksomme på bilen og har givet plads, før du fortsætter.",
    "You must make sure that they are aware of the car and have made room before you carry on.",
    "پیش از ادامه دادن باید مطمئن شوید که متوجه خودرو شده‌اند و جا باز کرده‌اند."),
  S(False, "Børnene skal gå ind på fortovet, når der kommer en bil.", "The children must go onto the pavement when a car comes.",
    "وقتی خودرویی می‌آید، بچه‌ها باید به پیاده‌رو بروند.",
    "De må lege på vejen; de må bare ikke unødigt hindre dig i at komme frem.",
    "They may play on the road; they just must not needlessly stop you getting through.",
    "آن‌ها می‌توانند در راه بازی کنند؛ فقط نباید بی‌دلیل جلوی عبور شما را بگیرند."),
)

Q(5644, "7.3", view("""
THE SCENE: a country road seen from a car towing a box trailer (its front corner visible in the right door mirror at the right edge of
the picture); on the right verge stands a round white speed-limit sign with a red border showing 60, and under it a white plate with
the black text «3,5 t».
MUST BE CLEARLY VISIBLE: the 60 sign with the «3,5 t» plate, the trailer in the mirror.
MUST NOT APPEAR: other signs, any other text."""),
  "Uden for byen står en tavle med 60 km/t og undertavlen »3,5 t«. Din bil har en tilladt totalvægt på 2.000 kg og trækker en trailer "
  "med en tilladt totalvægt på 1.800 kg. Hvad gælder?",
  "Outside town there is a 60 km/h sign with the plate «3,5 t». Your car has a permitted total weight of 2,000 kg and tows a trailer with "
  "a permitted total weight of 1,800 kg. What applies?",
  "بیرون شهر تابلوی ۶۰ کیلومتر بر ساعت با زیرتابلوی «۳٫۵ تن» قرار دارد. وزن کل مجاز خودروی شما ۲۰۰۰ کیلوگرم است و تریلری با وزن کل "
  "مجاز ۱۸۰۰ کیلوگرم را می‌کشد. چه قاعده‌ای برقرار است؟",
  S(True, "Grænsen på 60 km/t gælder for mig, fordi bil og trailer tilsammen har en tilladt totalvægt over 3,5 t.",
    "The 60 km/h limit applies to me, because the car and trailer together have a permitted total weight over 3.5 t.",
    "حد ۶۰ کیلومتر بر ساعت برای من معتبر است، چون وزن کل مجاز خودرو و تریلر روی هم بیش از ۳٫۵ تن است.",
    "Med vægtangivelse på undertavlen gælder grænsen for køretøjer, herunder vogntog, hvis samlede tilladte totalvægt overstiger den.",
    "With a weight on the plate, the limit applies to vehicles, combinations included, whose permitted total weight together exceeds it.",
    "با وزنِ روی زیرتابلو، این حد برای وسایل، از جمله خودرو با تریلر، است که وزن کل مجازشان روی هم از آن بیشتر باشد."),
  S(False, "Undertavlen betyder, at grænsen kun gælder for lastbiler.", "The plate means that the limit only applies to lorries.",
    "زیرتابلو یعنی این حد فقط برای کامیون‌هاست.",
    "Den gælder alle køretøjer og vogntog over vægtgrænsen.", "It applies to all vehicles and combinations above the weight shown.",
    "برای همه‌ی وسایل و خودروهای با تریلرِ بالاتر از این وزن است."),
  S(False, "Det er kun bilens egen vægt, der tæller, så grænsen gælder ikke for mig.", "Only the car's own weight counts, so the limit does not apply to me.",
    "فقط وزن خود خودرو حساب می‌شود، پس این حد برای من نیست.",
    "For et vogntog er det den samlede tilladte totalvægt, der tæller.", "For a combination it is the permitted total weight together that counts.",
    "برای خودرو با تریلر، وزن کل مجازِ روی هم ملاک است."),
  S(False, "Med trailer må jeg altid køre 80 km/t uden for byen.", "With a trailer I may always drive at 80 km/h outside town.",
    "با تریلر همیشه می‌توانم بیرون شهر ۸۰ کیلومتر بر ساعت برانم.",
    "En lavere grænse på en tavle skal overholdes.", "A lower limit on a sign must be obeyed.", "حد پایین‌ترِ روی تابلو را باید رعایت کرد."),
)

Q(5645, "7.3", view("""
THE SCENE: a straight road through a suburb at night, lit by street lamps; houses stand close to the road on both sides; on the right
stands a round white speed-limit sign with a red border showing 60, and under it a white plate with the black text «Støj»; the road is
empty.
MUST BE CLEARLY VISIBLE: the 60 sign with the «Støj» plate, the houses close to the road, the empty road.
MUST NOT APPEAR: other signs, any other text.""", cond="night, street lights, dry road"),
  "Om natten kører du forbi en tavle med 60 km/t og undertavlen »Støj«. Vejen er tom. Hvad gælder?",
  "At night you pass a 60 km/h sign with the plate «Støj» (noise). The road is empty. What applies?",
  "شب از کنار تابلوی ۶۰ کیلومتر بر ساعت با زیرتابلوی «Støj» (سروصدا) می‌گذرید. جاده خالی است. چه قاعده‌ای برقرار است؟",
  S(True, "Grænsen på 60 km/t gælder også om natten, når vejen er tom.", "The 60 km/h limit also applies at night when the road is empty.",
    "حد ۶۰ کیلومتر بر ساعت شب‌ها و وقتی جاده خالی است هم معتبر است.",
    "Der er ingen tidsangivelse på tavlen, så den gælder hele døgnet.", "There are no times on the sign, so it applies around the clock.",
    "روی تابلو زمانی نوشته نشده، پس در تمام شبانه‌روز معتبر است."),
  S(True, "Grænsen er sat for at mindske støjen for dem, der bor ved vejen.", "The limit is there to reduce the noise for those living by the road.",
    "این حد برای کم کردن سروصدا برای ساکنان کنار جاده گذاشته شده است.",
    "Undertavlen »Støj« viser, at støj er årsagen til hastighedsbegrænsningen.", "The plate «Støj» shows that noise is the reason for the limit.",
    "زیرتابلوی «Støj» نشان می‌دهد که دلیل این محدودیت سرعت، سروصداست."),
  S(False, "En hastighedsbegrænsning på grund af støj er kun en anbefaling.", "A speed limit because of noise is only a recommendation.",
    "محدودیت سرعتی که به‌خاطر سروصداست، فقط توصیه است.",
    "Den er en lokal hastighedsbegrænsning, som skal overholdes.", "It is a local speed limit that must be obeyed.",
    "این یک محدودیت سرعت محلی است که باید رعایت شود."),
  S(False, "Grænsen gælder kun for tunge køretøjer, fordi de larmer mest.", "The limit only applies to heavy vehicles, because they make the most noise.",
    "این حد فقط برای وسایل سنگین است، چون بیشترین سروصدا را دارند.",
    "Tavlen gælder alle køretøjer, når ingen undertavle begrænser den.", "The sign applies to all vehicles when no plate limits it.",
    "وقتی زیرتابلویی آن را محدود نکرده، این تابلو برای همه‌ی وسایل است."),
)

Q(5646, "1.2", picture("""
A car in a driveway with a caravan hitched behind it, and behind the caravan a small box trailer that someone is about to hitch to the
back of the caravan; the trailer's drawbar is lifted towards the caravan's rear.
MUST BE CLEARLY VISIBLE: the car, the caravan hitched to it, the small trailer about to be hitched behind the caravan.
MUST NOT APPEAR: text, number-plate characters, brand names."""),
  "Du vil trække både en campingvogn og en lille trailer efter bilen på én gang. Hvad gælder?",
  "You want to tow both a caravan and a small trailer behind the car at the same time. What applies?",
  "می‌خواهید هم‌زمان هم یک کاروان و هم یک تریلر کوچک را پشت خودرو بکشید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må kun koble ét påhængskøretøj til bilen.", "I may only hitch one trailer to the car.", "فقط یک یدک را می‌توانم به خودرو ببندم.",
    "Til en bil må der kun kobles ét påhængskøretøj.", "Only one trailer may be hitched to a car.", "به خودرو فقط یک یدک می‌توان بست."),
  S(False, "Det er tilladt, hvis den samlede vægt er under 3.500 kg.", "It is allowed if the total weight is under 3,500 kg.",
    "اگر وزن کل کمتر از ۳۵۰۰ کیلوگرم باشد، مجاز است.",
    "Reglen om ét påhængskøretøj gælder uanset vægten.", "The rule of one trailer applies whatever the weight.",
    "قاعده‌ی یک یدک به وزن بستگی ندارد."),
  S(False, "Det er tilladt uden for byen, men ikke i byen.", "It is allowed outside town but not in town.", "بیرون شهر مجاز است، ولی در شهر نه.",
    "Det er ikke tilladt nogen steder at koble to påhængskøretøjer til en bil.", "Hitching two trailers to a car is not allowed anywhere.",
    "بستن دو یدک به یک خودرو هیچ‌جا مجاز نیست."),
)

Q(5647, "1.2", picture("""
A car towing a caravan on a road, seen from the side; through the caravan's window two children can be seen sitting at the table inside
the caravan, playing cards.
MUST BE CLEARLY VISIBLE: the car towing the caravan, the children inside the caravan.
MUST NOT APPEAR: text, number-plate characters, brand names."""),
  "Børnene vil gerne sidde i campingvognen og spille kort, mens I kører til feriestedet. Hvad gælder?",
  "The children would like to sit in the caravan and play cards while you drive to the holiday place. What applies?",
  "بچه‌ها می‌خواهند تا رسیدن به محل تعطیلات، داخل کاروان بنشینند و ورق بازی کنند. چه قاعده‌ای برقرار است؟",
  S(True, "Campingvognen må ikke bruges til at befordre personer.", "The caravan must not be used to carry people.",
    "از کاروان نباید برای حمل سرنشین استفاده کرد.",
    "En campingvogn må ikke benyttes til befordring af personer.", "A caravan must not be used to carry people.",
    "کاروان نباید برای جابه‌جایی افراد به کار رود."),
  S(False, "Det er tilladt, hvis campingvognen har sikkerhedsseler.", "It is allowed if the caravan has seat belts.",
    "اگر کاروان کمربند ایمنی داشته باشد، مجاز است.",
    "Forbuddet gælder, uanset hvordan campingvognen er indrettet.", "The ban applies however the caravan is fitted.",
    "این ممنوعیت، هر طور هم کاروان تجهیز شده باشد، برقرار است."),
  S(False, "Det er tilladt, når der er en voksen med i campingvognen.", "It is allowed when there is an adult in the caravan too.",
    "اگر یک بزرگسال هم داخل کاروان باشد، مجاز است.",
    "Ingen må befordres i en campingvogn.", "Nobody may be carried in a caravan.", "هیچ‌کس نباید در کاروان جابه‌جا شود."),
  S(False, "Det er tilladt på korte ture med lav fart.", "It is allowed on short trips at low speed.", "در مسیرهای کوتاه با سرعت کم مجاز است.",
    "Forbuddet gælder også på korte ture.", "The ban also applies on short trips.", "این ممنوعیت در مسیرهای کوتاه هم برقرار است."),
)

Q(5648, "1.2", picture("""
The front passenger seat of a car seen through the open passenger door: a rear-facing baby seat is being placed on the seat; on the
dashboard in front of the seat the airbag cover can be seen, and a small switch beside it.
MUST BE CLEARLY VISIBLE: the rear-facing baby seat on the front seat, the airbag cover, the switch.
MUST NOT APPEAR: text, brand names, people's faces."""),
  "Du vil have din baby med i en bagudvendt autostol på forsædet. Der er airbag foran passagersædet. Hvad gælder?",
  "You want to take your baby in a rear-facing car seat on the front seat. There is an airbag in front of the passenger seat. What applies?",
  "می‌خواهید نوزادتان را در صندلی کودکِ رو به عقب روی صندلی جلو ببرید. جلوی صندلی سرنشین کیسه‌ی هوا هست. چه قاعده‌ای برقرار است؟",
  S(True, "Airbaggen skal være slået fra, før den bagudvendte stol må bruges på sædet.",
    "The airbag must be switched off before the rear-facing seat may be used there.",
    "پیش از استفاده از صندلی رو به عقب روی آن جا، کیسه‌ی هوا باید غیرفعال شود.",
    "Børn må ikke befordres i en bagudvendt barnestol på en plads med frontairbag, medmindre airbaggen er deaktiveret.",
    "Children must not be carried in a rear-facing child seat on a seat with a front airbag unless the airbag is deactivated.",
    "کودک نباید در صندلیِ رو به عقب روی جایی با کیسه‌ی هوای جلو جابه‌جا شود، مگر آن‌که کیسه‌ی هوا غیرفعال باشد."),
  S(True, "Stolen skal være godkendt og passe til barnets højde og vægt.", "The seat must be approved and suit the child's height and weight.",
    "صندلی باید تأییدشده و متناسب با قد و وزن کودک باشد.",
    "Børn under 135 cm skal bruge godkendt sikkerhedsudstyr tilpasset deres højde og vægt.",
    "Children under 135 cm must use approved safety equipment suited to their height and weight.",
    "کودکانِ کوتاه‌تر از ۱۳۵ سانتی‌متر باید از تجهیزات ایمنیِ تأییدشده و متناسب با قد و وزنشان استفاده کنند."),
  S(True, "Det er mig som fører, der skal sørge for, at barnet er sikret rigtigt.", "It is me as the driver who must make sure the child is secured correctly.",
    "این من به‌عنوان راننده هستم که باید مطمئن شوم کودک درست ایمن شده است.",
    "Føreren skal påse, at reglerne om sikkerhedsudstyr til børn overholdes.", "The driver must see to it that the rules on child safety equipment are kept.",
    "راننده باید مراقب رعایت قواعد تجهیزات ایمنی کودکان باشد."),
  S(False, "Det er tilladt, hvis jeg skubber sædet helt tilbage.", "It is allowed if I push the seat right back.", "اگر صندلی را کاملاً عقب ببرم، مجاز است.",
    "Airbaggen skal være deaktiveret, uanset hvor sædet står.", "The airbag must be deactivated wherever the seat is.",
    "کیسه‌ی هوا باید، هر جا که صندلی باشد، غیرفعال شود."),
)

Q(5649, "3.2", above("""
THE SCENE: a junction seen from above; our road runs up the picture with one lane in each direction; a crossing road runs left to right.
VEHICLES (colour code used strictly): a RED car (ours) waiting at the stop line in our lane; a long articulated lorry coming from the
RIGHT on the crossing road and turning LEFT into our road, into the lane beside ours; its trailer cuts the corner and passes close to
the front of the red car; a DASHED ORANGE line shows the trailer's path close to the red car.
MUST NOT APPEAR: signs, text."""),
  "Du holder ved stoplinjen. En lang lastbil kommer fra højre og svinger til venstre ind på din vej, forbi din bil. Hvad skal du være "
  "opmærksom på?",
  "You are waiting at the stop line. A long lorry comes from the right and turns left into your road, past your car. What must you be "
  "aware of?",
  "پشت خط ایست ایستاده‌اید. کامیونی بلند از راست می‌آید و به چپ وارد خیابان شما می‌شود و از کنار خودروی شما رد می‌شود. به چه "
  "چیزی باید توجه کنید؟",
  S(True, "Lastbilens anhænger kan skære hjørnet og komme tæt på min bil.", "The lorry's trailer may cut the corner and come close to my car.",
    "ممکن است تریلرِ کامیون از گوشه میان‌بُر بزند و به خودروی من نزدیک شود.",
    "I et sving følger anhængerens hjul en mindre bue end lastbilens forhjul.", "In a turn the trailer's wheels follow a tighter curve than the lorry's front wheels.",
    "در پیچ، چرخ‌های تریلر مسیر تنگ‌تری از چرخ‌های جلوی کامیون طی می‌کنند."),
  S(True, "Jeg holder bag stoplinjen og giver lastbilen god plads.", "I stay behind the stop line and give the lorry plenty of room.",
    "پشت خط ایست می‌مانم و به کامیون جای کافی می‌دهم.",
    "Lange køretøjer har brug for meget plads, når de svinger.", "Long vehicles need a lot of room when they turn.",
    "وسایل بلند هنگام پیچیدن به جای زیادی نیاز دارند."),
  S(False, "Lastbilen skal holde sig inden for sin egen vognbane hele vejen gennem svinget.",
    "The lorry must stay within its own lane all the way through the turn.", "کامیون باید در تمام پیچ داخل خط خودش بماند.",
    "Et langt køretøj kan ikke altid svinge uden at bruge mere plads.", "A long vehicle cannot always turn without using more room.",
    "یک وسیله‌ی بلند همیشه نمی‌تواند بدون استفاده از جای بیشتر بپیچد."),
  S(False, "Jeg kører lidt frem over stoplinjen, så lastbilen kan se mig.", "I move a little forward over the stop line so that the lorry can see me.",
    "کمی از خط ایست جلوتر می‌روم تا کامیون مرا ببیند.",
    "Så kommer du endnu tættere på anhængerens vej.", "Then you come even closer to the trailer's path.", "این‌طور حتی به مسیر تریلر نزدیک‌تر می‌شوید."),
)

Q(5650, "8.1", picture("""
The back seat of a car seen through the open rear door: three seat belts are visible for three seats; four small children are trying to
squeeze onto the seat, one sitting on another's lap; two booster cushions lie on the seat.
MUST BE CLEARLY VISIBLE: the three seat belts, the four children, the child on another's lap.
MUST NOT APPEAR: text, brand names."""),
  "Bagsædet har tre pladser med sikkerhedssele. Du vil have fire børn med på bagsædet til en fødselsdag. Hvad gælder?",
  "The back seat has three places with seat belts. You want to take four children on the back seat to a birthday party. What applies?",
  "صندلی عقب سه جای نشستن با کمربند ایمنی دارد. می‌خواهید چهار کودک را روی صندلی عقب به یک جشن تولد ببرید. چه قاعده‌ای برقرار است؟",
  S(True, "Der må ikke være flere passagerer på bagsædet, end der er pladser med sikkerhedssele.",
    "There must not be more passengers on the back seat than there are places with seat belts.",
    "روی صندلی عقب نباید بیش از تعداد جاهای دارای کمربند مسافر باشد.",
    "Antallet af passagerer må ikke overstige antallet af pladser med sikkerhedsseler, heller ikke på bagsædet.",
    "The number of passengers must not exceed the number of seats with belts, also on the back seat.",
    "تعداد مسافران نباید از تعداد جاهای دارای کمربند بیشتر باشد، روی صندلی عقب هم."),
  S(True, "Børn under 135 cm skal bruge godkendt sikkerhedsudstyr, der passer til deres højde og vægt.",
    "Children under 135 cm must use approved safety equipment that suits their height and weight.",
    "کودکانِ کوتاه‌تر از ۱۳۵ سانتی‌متر باید تجهیزات ایمنیِ تأییدشده و متناسب با قد و وزنشان داشته باشند.",
    "Selepuder eller barnestole skal passe til det enkelte barn.", "Booster cushions or child seats must suit each child.",
    "صندلی یا بالشتک کودک باید متناسب با هر کودک باشد."),
  S(True, "Som fører har jeg ansvaret for, at børn under 15 år er spændt fast.", "As the driver I am responsible for children under 15 being belted.",
    "به‌عنوان راننده مسئولم که کودکانِ زیر ۱۵ سال کمربند بسته باشند.",
    "Føreren skal påse, at passagerer under 15 år bruger sikkerhedssele.", "The driver must see to it that passengers under 15 wear seat belts.",
    "راننده باید مراقب باشد که مسافرانِ زیر ۱۵ سال کمربند ببندند."),
  S(False, "På en kort tur må et barn sidde på skødet af et andet barn.", "On a short trip a child may sit on another child's lap.",
    "در مسیر کوتاه، کودکی می‌تواند روی پای کودک دیگری بنشیند.",
    "Hvert barn skal have sin egen plads med sele og det rette sikkerhedsudstyr.", "Each child must have its own seat with a belt and the right safety equipment.",
    "هر کودک باید جای خودش را با کمربند و تجهیزات ایمنی مناسب داشته باشد."),
)
