# «آزمون جدید», batch 1 (5001–5100), part c: right turns (7.13), the vehicle and its equipment (1.2), meeting (7.7),
# approaching junctions (7.11), lane changes and merging (7.4), starting and stopping at the kerb (7.1), position (7.2),
# darkness and lights (7.19), the motorway (7.16).
# Rules: Færdselsloven §§ 15, 16, 18, 20, 26, 27, 32, 33, 35, 41, 44, 46; Bekendtgørelse om vejafmærkning; Detailforskrifter.
from nq import Q, S, above, picture, town, view

Q(5051, "7.13", town("""
THE SCENE: a junction in town with traffic lights; our light shows GREEN and we want to turn RIGHT (our right indicator lamp glows on
the dashboard strip). On the side street we are turning into, a group of three pedestrians is crossing on the zebra crossing just
past the corner; their pedestrian light shows green.
MUST BE CLEARLY VISIBLE: our green light, the side street on the right, the pedestrians on its crossing.
MUST NOT APPEAR: text."""),
  "Du har grønt lys og vil svinge til højre. Fodgængere går over den vej, du skal ind på. Hvordan forholder du dig?",
  "You have a green light and want to turn right. Pedestrians are crossing the road you are turning into. What do you do?",
  "چراغ شما سبز است و می‌خواهید به راست بپیچید. عابران از جاده‌ای که می‌خواهید واردش شوید رد می‌شوند. چه می‌کنید؟",
  S(True, "Jeg holder tilbage for fodgængerne, til de er kommet over.", "I wait for the pedestrians until they are across.", "تا رد شدن عابران صبر می‌کنم.",
    "Når du svinger gennem et fodgængerfelt, skal du sænke farten og om nødvendigt standse for de gående.",
    "When you turn through a pedestrian crossing you must slow down and stop if necessary for the pedestrians.",
    "وقتی از روی گذرگاه عابر می‌پیچید، باید سرعت را کم کنید و در صورت لزوم برای عابران بایستید."),
  S(False, "Fodgængerne skal vente, fordi jeg også har grønt.", "The pedestrians must wait because I have green too.", "عابران باید صبر کنند، چون چراغ من هم سبز است.",
    "Fodgængerne har grønt samtidig med dig; du skal vente på dem.", "The pedestrians have green at the same time as you; you must wait for them.", "عابران هم‌زمان با شما سبزند؛ شما باید منتظرشان بمانید."),
  S(False, "Jeg kører forsigtigt ind mellem fodgængerne.", "I drive carefully in between the pedestrians.", "با احتیاط از میان عابران رد می‌شوم.",
    "Du må ikke køre ind på feltet, mens de gående er på det.", "You must not drive onto the crossing while the pedestrians are on it.", "وقتی عابران روی گذرگاه‌اند، نباید واردش شوید."),
  S(False, "Jeg dytter for at advare dem om, at jeg svinger.", "I sound the horn to warn them that I am turning.", "بوق می‌زنم تا بدانند می‌پیچم.",
    "Hornet bruges kun for at afværge fare; her skal du blot vente.", "The horn is only for averting danger; here you just wait.", "بوق فقط برای دفع خطر است؛ این‌جا فقط باید صبر کنید."),
)

Q(5052, "7.13", above("""
THE SCENE: a junction in town seen from above. Our road comes up from the bottom; a side road goes off to the RIGHT. Along the right
side of our road, between the carriageway and the pavement, runs a TWO-WAY cycle path (white arrows painted on it pointing both ways)
that crosses the mouth of the side road.
VEHICLES AND PEOPLE (colour code used strictly): a RED car (ours), its RIGHT indicator flashing, about to turn right; a SOLID GREEN
arrow shows its turn. On the two-way cycle path a cyclist comes DOWN the picture towards our car (riding against our direction), about
to cross the mouth of the side road; another cyclist far behind us rides up in our direction.
MUST NOT APPEAR: traffic lights, signs, text."""),
  "Du vil svinge til højre. Cykelstien er dobbeltrettet, og en cyklist kommer imod dig på den. Hvordan forholder du dig?",
  "You want to turn right. The cycle path is two-way, and a cyclist is coming towards you on it. What do you do?",
  "می‌خواهید به راست بپیچید. مسیر دوچرخه دوطرفه است و دوچرخه‌سواری روی آن از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg holder tilbage for cyklisten, der kommer imod mig på cykelstien.", "I give way to the cyclist coming towards me on the cycle path.",
    "به دوچرخه‌سواری که روی مسیر دوچرخه از روبه‌رو می‌آید راه می‌دهم.",
    "Ved højresving må du ikke være til ulempe for cyklister, der kører ligeud; på en dobbeltrettet cykelsti også dem, der kommer imod dig.",
    "When turning right you must not inconvenience cyclists going straight ahead; on a two-way cycle path that includes those coming towards you.",
    "هنگام گردش به راست نباید مزاحم دوچرخه‌سوارانی شوید که مستقیم می‌روند؛ در مسیر دوچرخه‌ی دوطرفه، این شامل کسانی هم می‌شود که از روبه‌رو می‌آیند."),
  S(True, "Jeg ser efter cyklister fra begge retninger.", "I look for cyclists coming from both directions.", "دوچرخه‌سواران هر دو جهت را نگاه می‌کنم.",
    "På en dobbeltrettet cykelsti kan der komme cyklister både bagfra og forfra.", "On a two-way cycle path cyclists can come both from behind and from ahead.", "روی مسیر دوچرخه‌ی دوطرفه، دوچرخه‌سواران هم از پشت و هم از جلو می‌آیند."),
  S(False, "Cyklister på cykelstien kommer kun fra én retning.", "Cyclists on the cycle path only come from one direction.", "دوچرخه‌سواران روی این مسیر فقط از یک جهت می‌آیند.",
    "Pilene viser, at stien er dobbeltrettet.", "The arrows show that the path is two-way.", "فلش‌ها نشان می‌دهند که مسیر دوطرفه است."),
  S(False, "Jeg har forkørselsret, fordi cyklisten kører mod færdselsretningen.", "I have the right of way because the cyclist is riding against the traffic.",
    "حق تقدم با من است، چون دوچرخه‌سوار خلاف جهت ترافیک می‌رود.",
    "På en dobbeltrettet cykelsti kører cyklisten lovligt i begge retninger.", "On a two-way cycle path the cyclist may lawfully ride in both directions.", "روی مسیر دوچرخه‌ی دوطرفه، دوچرخه‌سوار مجاز است در هر دو جهت برود."),
)

Q(5053, "1.2", picture("""
A close-up of a car tyre's tread with a small tread-depth gauge pushed into one of the main grooves. Simple, clear view of the tread
blocks and grooves, the gauge's scale shown as plain marks without numbers.
MUST BE CLEARLY VISIBLE: the tread grooves and the gauge in a main groove.
MUST NOT APPEAR: brand names, numbers, text."""),
  "Hvad er den mindste lovlige mønsterdybde i hovedmønsteret på en almindelig bils dæk?",
  "What is the smallest legal tread depth in the main grooves of an ordinary car's tyres?",
  "کمترین عمق مجاز آج در شیارهای اصلی لاستیک یک خودروی معمولی چقدر است؟",
  S(True, "1,6 mm.", "1.6 mm.", "۱٫۶ میلی‌متر.",
    "Mønsterdybden skal være mindst 1,6 mm i hovedmønsteret.", "The tread depth must be at least 1.6 mm in the main grooves.", "عمق آج در شیارهای اصلی باید دست‌کم ۱٫۶ میلی‌متر باشد."),
  S(False, "1,0 mm.", "1.0 mm.", "۱٫۰ میلی‌متر.",
    "1,0 mm er under den lovlige grænse.", "1.0 mm is below the legal limit.", "۱٫۰ میلی‌متر کمتر از حد مجاز است."),
  S(False, "3 mm.", "3 mm.", "۳ میلی‌متر.",
    "Mere mønster er godt især om vinteren, men kravet er 1,6 mm.", "More tread is good, especially in winter, but the requirement is 1.6 mm.", "آج بیشتر به‌ویژه در زمستان خوب است، ولی حد قانونی ۱٫۶ میلی‌متر است."),
  S(False, "Der er intet krav, så længe dækket holder luft.", "There is no requirement as long as the tyre holds air.", "تا وقتی لاستیک باد نگه دارد، شرطی نیست.",
    "Der er et lovkrav til mønsterdybden.", "There is a legal requirement for the tread depth.", "برای عمق آج حد قانونی وجود دارد."),
)

Q(5054, "1.2", picture("""
A theory-test illustration of the back of a RED car at a red traffic light in town, seen from the car behind: the car's brake lights
are on, but only the LEFT brake light shines bright red; the RIGHT brake light is dark (not working).
MUST BE CLEARLY VISIBLE: one shining and one dark brake light.
MUST NOT APPEAR: number plates with text, people, other text."""),
  "Du opdager, at det ene af bilens bremselys ikke virker. Hvad gælder?",
  "You find out that one of the car's brake lights is not working. What applies?",
  "متوجه می‌شوید یکی از چراغ‌های ترمز خودرو کار نمی‌کند. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen er ikke i lovlig stand, og jeg skal have det repareret.", "The car is not in a lawful condition and I must get it repaired.",
    "خودرو در وضعیت قانونی نیست و باید تعمیرش کنم.",
    "Alle påbudte lygter skal virke.", "All required lights must work.", "همه‌ی چراغ‌های الزامی باید کار کنند."),
  S(False, "Jeg kan vente med at få det repareret, til bilen skal til syn næste gang.", "I can wait to have it repaired until the car's next inspection.",
    "می‌توانم تعمیرش را تا معاینه‌ی فنی بعدی خودرو عقب بیندازم.",
    "Bilen skal være i lovlig stand, hver gang du kører; bremselyset advarer dem bag dig og skal virke.",
    "The car must be in a lawful condition every time you drive; the brake light warns those behind you and must work.",
    "خودرو هر بار که رانندگی می‌کنید باید در وضعیت قانونی باشد؛ چراغ ترمز به پشت‌سری‌ها هشدار می‌دهد و باید کار کند."),
  S(False, "Det er lovligt, så længe det andet bremselys virker.", "It is legal as long as the other brake light works.", "تا وقتی چراغ ترمز دیگر کار کند، قانونی است.",
    "Begge bremselys skal virke.", "Both brake lights must work.", "هر دو چراغ ترمز باید کار کنند."),
  S(False, "Jeg kan bruge havariblinket i stedet, når jeg bremser.", "I can use the hazard lights instead when I brake.", "هنگام ترمز می‌توانم به‌جایش چراغ خطر بزنم.",
    "Havariblinket er ikke en erstatning for bremselyset.", "The hazard lights are no substitute for the brake light.", "چراغ خطر جایگزین چراغ ترمز نیست."),
)

Q(5055, "1.2", view("""
THE SCENE: a two-way country road in winter: the road is covered with wet snow and grey slush, with only two darker wheel tracks in
our lane; light snow is falling; snowy fields and bare trees on both sides. A car comes towards us slowly with its lights on.
MUST BE CLEARLY VISIBLE: the snow and slush on the road, the falling snow.
MUST NOT APPEAR: signs, text.""", cond="winter day, light snowfall, snow and slush on the road"),
  "Det er vinter, og der ligger sne og sjap på vejen. Hvad gælder om bilens dæk?",
  "It is winter, and there is snow and slush on the road. What applies to the car's tyres?",
  "زمستان است و روی جاده برف و برفابه است. درباره‌ی لاستیک‌های خودرو چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre med dæk, der er åbenbart uegnede til føret.", "I must not drive on tyres that are obviously unsuitable for the road conditions.",
    "نباید با لاستیک‌هایی برانم که آشکارا برای وضعیت جاده مناسب نیستند.",
    "Siden 1. juli 2025 er det ulovligt at køre med dæk, der er åbenbart uegnede til føret, fx sommerdæk i sne og sjap.",
    "Since 1 July 2025 it is illegal to drive on tyres that are obviously unsuitable for the conditions, for example summer tyres in snow and slush.",
    "از ۱ ژوئیه‌ی ۲۰۲۵ رانندگی با لاستیک‌هایی که آشکارا برای وضعیت جاده نامناسب‌اند، مثلاً لاستیک تابستانی در برف و برفابه، غیرقانونی است."),
  S(False, "Sommerdæk er lovlige i alt slags føre, når bare mønsterdybden er mindst 1,6 mm.", "Summer tyres are legal in all road conditions as long as the tread depth is at least 1.6 mm.",
    "لاستیک تابستانی در هر وضعیتی از جاده قانونی است، به شرط آن‌که عمق آجش دست‌کم ۱٫۶ میلی‌متر باشد.",
    "Sommerdæk i sne, sjap og slud anses i praksis for uegnede og dermed ulovlige.", "Summer tyres in snow, slush and sleet are in practice considered unsuitable and so illegal.",
    "لاستیک تابستانی در برف، برفابه و باران‌برف در عمل نامناسب و در نتیجه غیرقانونی شمرده می‌شود."),
  S(True, "Pigdæk må bruges i perioden fra 1. november til 15. april.", "Studded tyres may be used in the period from 1 November to 15 April.",
    "لاستیک میخ‌دار را می‌توان از ۱ نوامبر تا ۱۵ آوریل استفاده کرد.",
    "I Danmark er pigdæk tilladt fra 1. november til 15. april.", "In Denmark studded tyres are allowed from 1 November to 15 April.", "در دانمارک لاستیک میخ‌دار از ۱ نوامبر تا ۱۵ آوریل مجاز است."),
  S(True, "Det er mig som fører, der har ansvaret for, at dækkene passer til føret.", "It is me, the driver, who is responsible for the tyres suiting the conditions.",
    "این من، یعنی راننده، هستم که مسئولم لاستیک‌ها با وضعیت جاده جور باشند.",
    "Føreren skal selv sørge for, at bilen, også dækkene, er i forsvarlig stand til den kørsel, der skal ske.",
    "The driver must make sure that the car, including its tyres, is in a safe condition for the driving to be done.",
    "راننده خودش باید مطمئن شود خودرو، از جمله لاستیک‌ها، برای رانندگی پیش رو در وضعیت ایمنی است."),
)

Q(5056, "1.2", picture("""
A side view of the driver's seat of a car with a person sitting in it. The head restraint (head rest) on the seat is set high: its
top edge is level with the top of the person's head, and it is close behind the head.
MUST BE CLEARLY VISIBLE: the head restraint's position against the head.
MUST NOT APPEAR: text, brand names."""),
  "Hvordan skal nakkestøtten være indstillet?",
  "How should the head restraint be set?",
  "پشت‌سری صندلی چطور باید تنظیم شود؟",
  S(True, "Overkanten skal være i højde med toppen af hovedet og tæt ved hovedet.", "Its top edge should be level with the top of the head and close to the head.",
    "لبه‌ی بالایش باید هم‌سطح بالای سر و نزدیک سر باشد.",
    "Så støtter den hovedet bedst ved et stød bagfra.", "Then it supports the head best in an impact from behind.", "این‌طور در ضربه از پشت، بهترین پشتیبانی را از سر می‌کند."),
  S(True, "Den beskytter mod nakkeskader ved påkørsel bagfra.", "It protects against neck injuries in a rear-end collision.", "در تصادف از پشت، از آسیب گردن جلوگیری می‌کند.",
    "Nakkestøtten forhindrer, at hovedet slynges bagover.", "The head restraint stops the head from being thrown backwards.", "پشت‌سری نمی‌گذارد سر به عقب پرتاب شود."),
  S(False, "Den skal sidde så lavt som muligt for at give udsyn bagud.", "It should be as low as possible to give a view to the rear.", "باید تا جای ممکن پایین باشد تا دید عقب بهتر شود.",
    "En lav nakkestøtte kan give alvorlige nakkeskader.", "A low head restraint can cause serious neck injuries.", "پشت‌سری پایین می‌تواند آسیب جدی به گردن بزند."),
  S(True, "Nakkestøtten skal indstilles efter den, der sidder i sædet.", "The head restraint must be set for the person sitting in the seat.", "پشت‌سری باید برای همان کسی تنظیم شود که روی صندلی نشسته است.",
    "Folk er forskellige høje; tjek indstillingen, når en anden skal sidde i sædet.", "People are of different heights; check the setting when someone else is going to sit in the seat.", "قد آدم‌ها فرق دارد؛ وقتی کس دیگری روی صندلی می‌نشیند، تنظیم را بررسی کنید."),
)

Q(5057, "1.2", picture("""
The open boot of a car seen from behind: heavy cardboard boxes stand low and well forward against the back of the rear seat, held by
a cargo strap; a loose heavy toolbox lies on top of the rear parcel shelf.
MUST BE CLEARLY VISIBLE: the strapped boxes low and forward, the loose toolbox on the shelf.
MUST NOT APPEAR: people, text, brand names."""),
  "Du skal køre med tunge kasser i bilen. Hvordan forholder du dig?",
  "You are going to drive with heavy boxes in the car. What do you do?",
  "باید با جعبه‌های سنگین در خودرو رانندگی کنید. چه می‌کنید؟",
  S(True, "Jeg sikrer lasten, så den ikke kan flytte sig.", "I secure the load so that it cannot move.", "بار را محکم می‌کنم تا جابه‌جا نشود.",
    "Løs last kan blive kastet frem ved en kraftig opbremsning.", "A loose load can be thrown forward in hard braking.", "بار شل در ترمز شدید به جلو پرتاب می‌شود."),
  S(True, "Tunge ting lægges så lavt og så langt frem i bagagerummet som muligt.", "Heavy items go as low and as far forward in the boot as possible.",
    "وسایل سنگین تا جای ممکن پایین و جلوی صندوق گذاشته می‌شوند.",
    "Så påvirker de bilens køreegenskaber mindst og bliver bedst holdt på plads.", "Then they affect the car's handling least and are held in place best.", "این‌طور کمترین اثر را بر رفتار خودرو دارند و بهتر سر جایشان می‌مانند."),
  S(False, "Værktøjskassen kan godt ligge løst på hattehylden.", "The toolbox can lie loose on the parcel shelf.", "جعبه‌ابزار می‌تواند شل روی طاقچه‌ی عقب بماند.",
    "En tung, løs genstand på hattehylden kan ramme dem i bilen ved et brat stop.", "A heavy loose object on the parcel shelf can hit the people in the car in a sudden stop.", "شیء سنگین و شل روی طاقچه‌ی عقب، در توقف ناگهانی به سرنشینان می‌خورد."),
  S(False, "Lasten påvirker ikke bilens bremselængde.", "The load does not affect the car's braking distance.", "بار روی مسافت ترمز خودرو اثری ندارد.",
    "En tungt lastet bil har længere bremselængde.", "A heavily loaded car has a longer braking distance.", "خودروی پربار مسافت ترمز بیشتری دارد."),
)

Q(5058, "7.7", view("""
THE SCENE: a narrow single-track country road with grass verges, wide enough for only one car. About 40 m ahead, on OUR right side,
there is a passing place (a short widening of the road). Further ahead, about 100 m away, a small van comes towards us.
MUST BE CLEARLY VISIBLE: the narrow road, the passing place on our right, the oncoming van.
MUST NOT APPEAR: signs, text."""),
  "Vejen er så smal, at to biler ikke kan passere hinanden. En varevogn kommer imod dig. Hvordan forholder du dig?",
  "The road is so narrow that two cars cannot pass each other. A van is coming towards you. What do you do?",
  "جاده آن‌قدر باریک است که دو خودرو نمی‌توانند از کنار هم رد شوند. ونی از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg kører ind på vigepladsen i min side og lader varevognen passere.", "I pull into the passing place on my side and let the van pass.",
    "وارد جای کنار جاده در سمت خودم می‌شوم و می‌گذارم ون رد شود.",
    "Ved møde på smal vej skal den, der kan, give plads; her har du vigepladsen i din side.",
    "When meeting on a narrow road, whoever can must make room; here the passing place is on your side.",
    "در برخورد در جاده‌ی باریک، هر که بتواند باید جا بدهد؛ این‌جا جای کنار جاده در سمت شماست."),
  S(True, "Jeg sænker farten og holder så langt til højre som muligt.", "I slow down and keep as far to the right as possible.", "سرعتم را کم می‌کنم و تا جای ممکن سمت راست می‌مانم.",
    "Ved møde skal du holde til højre og tilpasse farten.", "When meeting you must keep right and adjust your speed.", "در برخورد با خودروی روبه‌رو باید سمت راست بمانید و سرعت را تنظیم کنید."),
  S(False, "Den, der kører hurtigst, skal holde tilbage.", "Whoever is driving fastest must give way.", "هر که تندتر می‌رود باید راه بدهد.",
    "Der er ingen sådan regel; I skal sammen finde en sikker løsning.", "There is no such rule; together you must find a safe solution.", "چنین قاعده‌ای نیست؛ باید با هم راه ایمنی پیدا کنید."),
  S(False, "Jeg blinker med lyset for at få varevognen til at bakke.", "I flash my lights to make the van reverse.", "چراغ می‌زنم تا ون دنده‌عقب برود.",
    "Lyssignaler giver ikke forkørselsret, og bakning er ofte farligere.", "Flashing lights gives no right of way, and reversing is often more dangerous.", "چراغ زدن حق تقدم نمی‌دهد و دنده‌عقب رفتن اغلب خطرناک‌تر است."),
)

Q(5059, "7.7", view("""
THE SCENE: a dark, unlit two-way country road at night, one lane in each direction. An oncoming car with very bright headlights
(drawn as large white glare with rays) comes towards us and dazzles us; the road ahead behind the glare is hard to see. The right
edge line of our lane is still faintly visible.
MUST BE CLEARLY VISIBLE: the dazzling oncoming headlights, the faint right edge line.
MUST NOT APPEAR: street lamps, signs, text.""", cond="night, dark unlit road, dry"),
  "Du bliver blændet af en modkørende bil. Hvordan forholder du dig?",
  "You are dazzled by an oncoming car. What do you do?",
  "خودروی روبه‌رو چشم شما را خیره کرده است. چه می‌کنید؟",
  S(True, "Jeg sænker farten.", "I slow down.", "سرعتم را کم می‌کنم.",
    "Når du ikke kan se, hvad der er foran, skal hastigheden ned.", "When you cannot see what is ahead, your speed must come down.", "وقتی جلو را نمی‌بینید، باید سرعت را کم کنید."),
  S(True, "Jeg ser mod højre vejkant.", "I look towards the right edge of the road.", "به لبه‌ی راست جاده نگاه می‌کنم.",
    "Så bliver du mindre blændet og kan holde din plads på vejen.", "That way you are dazzled less and can keep your place on the road.", "این‌طور کمتر خیره می‌شوید و جایتان را در جاده حفظ می‌کنید."),
  S(True, "Jeg er klar til at standse, hvis jeg ikke kan se vejen.", "I am ready to stop if I cannot see the road.", "اگر جاده را نبینم، آماده‌ی ایستادن هستم.",
    "Du skal kunne standse på den strækning, du kan overskue.", "You must be able to stop within the distance you can see.", "باید بتوانید در فاصله‌ای که می‌بینید بایستید."),
  S(False, "Jeg tænder fjernlyset for at blænde den modkørende igen.", "I switch on my high beam to dazzle the oncoming driver back.", "نور بالا را روشن می‌کنم تا راننده‌ی روبه‌رو را هم خیره کنم.",
    "Så kan I begge ikke se noget; det er farligt.", "Then neither of you can see anything; it is dangerous.", "این‌طور هیچ‌کدام چیزی نمی‌بینید؛ خطرناک است."),
)

Q(5060, "7.7", view("""
THE SCENE: a fairly narrow two-way country road, one lane in each direction, a broken centre line, grass verges. A large lorry comes
towards us; it is so wide that it fills its whole lane and touches the centre line. Just ahead on our right the verge is wide and
firm.
MUST BE CLEARLY VISIBLE: the wide oncoming lorry close to the centre line, the narrow space, the wide verge on our right.
MUST NOT APPEAR: signs, text."""),
  "En bred lastbil kommer imod dig på en smal vej. Hvordan forholder du dig?",
  "A wide lorry is coming towards you on a narrow road. What do you do?",
  "کامیون پهنی در جاده‌ای باریک از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg sænker farten og holder godt til højre.", "I slow down and keep well to the right.", "سرعتم را کم می‌کنم و خوب سمت راست می‌مانم.",
    "Ved møde skal du give den modkørende tilstrækkelig plads.", "When meeting you must give the oncoming vehicle enough room.", "در برخورد باید به وسیله‌ی روبه‌رو جای کافی بدهید."),
  S(True, "Jeg standser om nødvendigt, hvor der er plads nok.", "I stop if necessary where there is enough room.", "در صورت لزوم جایی که جای کافی هست می‌ایستم.",
    "Det er bedre at vente kort end at møde lastbilen, hvor der ikke er plads.", "It is better to wait briefly than to meet the lorry where there is no room.", "بهتر است کمی صبر کنید تا این‌که جایی که جا نیست با کامیون روبه‌رو شوید."),
  S(True, "Luftsuget fra lastbilen kan rykke i min bil.", "The air pressure from the lorry may pull at my car.", "جریان هوای کامیون ممکن است خودروی مرا تکان بدهد.",
    "Hold derfor godt fast i rattet og god afstand.", "So hold the wheel firmly and keep a good distance.", "پس فرمان را محکم نگه دارید و فاصله‌ی خوبی بگیرید."),
  S(False, "Jeg holder fast i midten af min vognbane, fordi det er min side.", "I stay in the middle of my lane because it is my side.", "وسط خط خودم می‌مانم، چون سمت من است.",
    "Du skal tilpasse dig og give plads, når den modkørende fylder meget.", "You must adapt and make room when the oncoming vehicle takes up a lot of space.", "وقتی وسیله‌ی روبه‌رو جای زیادی می‌گیرد، باید خودتان را تطبیق دهید و جا بدهید."),
)

Q(5061, "7.11", view("""
THE SCENE: we approach a junction in the countryside where our small road meets a bigger road. Shark teeth lie across our lane at the
junction. High hedges on both corners hide the view along the bigger road, both to the left and to the right.
MUST BE CLEARLY VISIBLE: the shark teeth, the high hedges hiding the crossing road.
MUST NOT APPEAR: vehicles on the crossing road, signs, text."""),
  "Du skal ud på den tværgående vej. Hækkene skjuler udsynet. Hvordan forholder du dig?",
  "You are going to drive onto the crossing road. The hedges hide the view. What do you do?",
  "می‌خواهید وارد جاده‌ی متقاطع شوید. پرچین‌ها جلوی دید را گرفته‌اند. چه می‌کنید؟",
  S(True, "Jeg sænker farten i god tid.", "I slow down in good time.", "به موقع سرعتم را کم می‌کنم.",
    "Du har ubetinget vigepligt og skal vise det i god tid.", "You must give way unconditionally and show it in good time.", "باید بی‌قیدوشرط راه بدهید و این را به موقع نشان دهید."),
  S(True, "Jeg kører langsomt frem, til jeg kan se, om der kommer nogen.", "I edge forward slowly until I can see whether anyone is coming.", "آهسته جلو می‌روم تا ببینم کسی می‌آید یا نه.",
    "Først når du kan se, at vejen er fri, kan du køre ud uden fare.", "Only when you can see that the road is clear can you drive out safely.", "فقط وقتی ببینید جاده خالی است، می‌توانید بی‌خطر وارد شوید."),
  S(False, "Jeg kører ud, når jeg ikke kan høre nogen biler.", "I drive out when I cannot hear any cars.", "وقتی صدای خودرویی نمی‌شنوم، وارد می‌شوم.",
    "Du kan ikke høre alle køretøjer, fx cyklister og elbiler.", "You cannot hear every vehicle, for example cyclists and electric cars.", "صدای همه‌ی وسایل، مثلاً دوچرخه و خودروی برقی، را نمی‌شنوید."),
  S(False, "Hajtænderne gælder kun trafikken fra venstre.", "The shark teeth only apply to traffic from the left.", "دندان‌کوسه فقط برای ترافیک سمت چپ است.",
    "Du har ubetinget vigepligt for trafikken fra begge sider.", "You must give way unconditionally to traffic from both sides.", "باید بی‌قیدوشرط به ترافیک هر دو طرف راه بدهید."),
)

Q(5062, "7.11", view("""
THE SCENE: a two-way country road, one lane in each direction. On the right verge stands a triangular warning sign (white with a red
border, point up) whose symbol is a thick vertical black bar crossed by a thin horizontal black bar (a junction where the crossing
road must give way). About 200 m ahead a crossroads with small side roads.
MUST BE CLEARLY VISIBLE: the warning sign with its symbol, the crossroads ahead.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle. Hvad betyder den?",
  "You pass this sign. What does it mean?",
  "از کنار این تابلو رد می‌شوید. یعنی چه؟",
  S(True, "Der kommer et kryds, hvor trafikken fra sidevejene har ubetinget vigepligt.", "A junction is coming where traffic from the side roads must give way unconditionally.",
    "تقاطعی در پیش است که ترافیک فرعی‌ها در آن باید بی‌قیدوشرط راه بدهد.",
    "Tavle A 11 varsler et farligt vejkryds, hvor den krydsende trafik har ubetinget vigepligt.", "Sign A 11 warns of a dangerous junction where the crossing traffic must give way unconditionally.", "تابلوی A 11 از تقاطع خطرناکی هشدار می‌دهد که ترافیک متقاطع در آن باید بی‌قیدوشرط راه بدهد."),
  S(False, "Tavlen betyder, at jeg skal standse ved krydset.", "The sign means that I must stop at the junction.", "این تابلو یعنی باید در تقاطع بایستم.",
    "Tavlen er en advarsel; det er den krydsende trafik, der har ubetinget vigepligt, men vær klar til at reagere.",
    "The sign is a warning; it is the crossing traffic that must give way unconditionally, but be ready to react.",
    "این تابلو هشدار است؛ ترافیک متقاطع است که باید بی‌قیدوشرط راه بدهد، ولی آماده‌ی واکنش باشید."),
  S(False, "Jeg skal holde tilbage for trafik fra højre.", "I must give way to traffic from the right.", "باید به ترافیک سمت راست راه بدهم.",
    "Det er trafikken fra sidevejene, der skal holde tilbage for dig.", "It is the traffic from the side roads that must give way to you.", "ترافیک فرعی‌هاست که باید به شما راه بدهد."),
  S(False, "Tavlen betyder, at krydset er reguleret med lyssignal.", "The sign means the junction is controlled by traffic lights.", "این تابلو یعنی تقاطع چراغ راهنمایی دارد.",
    "Lyssignaler varsles med en anden tavle.", "Traffic lights are warned of with a different sign.", "برای چراغ راهنمایی تابلوی هشدار دیگری هست."),
)

Q(5063, "7.11", view("""
THE SCENE: a two-way country road entering a small village. On the right verge stands a square sign turned on its corner: a yellow
diamond with a white border, crossed by a black diagonal stripe (end of the main road). About 80 m ahead a side road joins from the
RIGHT, with no signs and no markings at its end.
MUST BE CLEARLY VISIBLE: the end-of-main-road sign, the unmarked side road on the right.
MUST NOT APPEAR: other signs, shark teeth, text."""),
  "Du kører forbi denne tavle. Lidt fremme kommer en sidevej fra højre uden tavler. Hvad gælder?",
  "You pass this sign. A little further on there is a side road from the right with no signs. What applies?",
  "از کنار این تابلو رد می‌شوید. کمی جلوتر فرعی‌ای بدون تابلو از سمت راست می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Hovedvejen ophører.", "The main road ends.", "جاده‌ی اصلی تمام می‌شود.",
    "Tavle B 17 viser, at hovedvejen ophører.", "Sign B 17 shows that the main road ends.", "تابلوی B 17 نشان می‌دهد جاده‌ی اصلی تمام شده است."),
  S(True, "Ved sidevejen gælder højrereglen, fordi der ikke er andre tavler.", "At the side road the right-hand rule applies because there are no other signs.",
    "کنار آن فرعی قاعده‌ی دست راست برقرار است، چون تابلوی دیگری نیست.",
    "Uden tavler og afmærkning skal du holde tilbage for trafik fra højre.", "Without signs or markings you must give way to traffic from the right.", "بدون تابلو و خط‌کشی باید به ترافیک سمت راست راه بدهید."),
  S(False, "Jeg har stadig forkørselsret i alle kryds.", "I still have the right of way at every junction.", "هنوز در همه‌ی تقاطع‌ها حق تقدم دارم.",
    "Forkørselsretten på hovedvejen ophører med tavlen.", "The right of way of the main road ends with the sign.", "حق تقدم جاده‌ی اصلی با این تابلو تمام می‌شود."),
  S(False, "Tavlen betyder, at vejen bliver ensrettet.", "The sign means the road becomes one-way.", "این تابلو یعنی جاده یک‌طرفه می‌شود.",
    "Ensretning har sin egen tavle.", "One-way traffic has its own sign.", "یک‌طرفه بودن تابلوی خودش را دارد."),
)

Q(5064, "7.11", view("""
THE SCENE: a road through a park area outside the town centre, one lane in each direction. About 30 m ahead a separate cycle path,
which runs through the park and is not part of any road, crosses our road; at the crossing the cycle path has white shark teeth
facing the cyclists. A cyclist on the path from the right is about to reach our road.
MUST BE CLEARLY VISIBLE: the separate cycle path through the park, its shark teeth, the cyclist from the right.
MUST NOT APPEAR: signs, text.""", scenery="Scenery is reduced to plain flat green lawns, a few simple trees and bushes; no buildings."),
  "En cyklist kommer fra højre ad en sti gennem parken og skal over vejen. Hvad gælder?",
  "A cyclist is coming from the right along a path through the park and is going to cross the road. What applies?",
  "دوچرخه‌سواری از سمت راست، از مسیری در پارک، می‌آید و می‌خواهد از جاده رد شود. چه قاعده‌ای برقرار است؟",
  S(True, "Cyklisten har ubetinget vigepligt, fordi stien ikke hører til en vej.", "The cyclist must give way unconditionally because the path is not part of a road.",
    "دوچرخه‌سوار باید بی‌قیدوشرط راه بدهد، چون این مسیر جزو جاده نیست.",
    "Cyklister fra en sti, der ikke er anlagt i forbindelse med en vej, har ubetinget vigepligt.", "Cyclists coming from a path not built as part of a road must give way unconditionally.", "دوچرخه‌سوارانی که از مسیری جدا از جاده می‌آیند، باید بی‌قیدوشرط راه بدهند."),
  S(True, "Jeg er alligevel klar til at bremse, hvis cyklisten ikke holder tilbage.", "I am still ready to brake if the cyclist does not give way.",
    "با این حال آماده‌ی ترمزم، اگر دوچرخه‌سوار راه ندهد.",
    "Du skal altid være opmærksom på, om andre overholder deres vigepligt.", "You must always watch whether others keep their duty to give way.", "همیشه باید ببینید دیگران وظیفه‌ی راه دادن را رعایت می‌کنند یا نه."),
  S(False, "Højrereglen gælder, så jeg skal holde tilbage for cyklisten.", "The right-hand rule applies, so I must give way to the cyclist.", "قاعده‌ی دست راست برقرار است، پس باید به دوچرخه‌سوار راه بدهم.",
    "Højrereglen gælder ikke for den, der kommer fra en sådan sti.", "The right-hand rule does not apply to someone coming from such a path.", "قاعده‌ی دست راست برای کسی که از چنین مسیری می‌آید اعمال نمی‌شود."),
)

Q(5065, "7.4", town("""
THE SCENE: a town road with two lanes in our direction, a broken lane line between them. We drive in the RIGHT lane and want to
change to the LEFT lane. In the left door mirror (at the left edge of the picture) a grey car is visible in the left lane, a little
behind us and coming closer.
MUST BE CLEARLY VISIBLE: the two lanes, the grey car in the left door mirror.
MUST NOT APPEAR: signs, text."""),
  "Du vil skifte til venstre vognbane. Hvordan forholder du dig?",
  "You want to change to the left-hand lane. What do you do?",
  "می‌خواهید به خط چپ بروید. چه می‌کنید؟",
  S(True, "Jeg ser i spejlet og over skulderen, før jeg skifter vognbane.", "I look in the mirror and over my shoulder before I change lanes.",
    "پیش از تغییر خط، در آینه و از روی شانه نگاه می‌کنم.",
    "Et skulderkig viser det, der er i den blinde vinkel.", "A look over the shoulder shows what is in the blind spot.", "نگاه از روی شانه آن‌چه را در نقطه‌ی کور است نشان می‌دهد."),
  S(True, "Jeg skifter først, når det kan ske uden fare eller unødig ulempe for bilen i venstre vognbane.",
    "I only change when it can be done without danger or undue inconvenience to the car in the left lane.",
    "فقط وقتی تغییر خط می‌دهم که برای خودروی خط چپ خطر یا مزاحمت بی‌جا نداشته باشد.",
    "Færdselsloven § 18 kræver, at vognbaneskift kan ske uden fare eller unødig ulempe for andre.",
    "Færdselsloven § 18 requires a lane change to be possible without danger or undue inconvenience to others.",
    "ماده‌ی ۱۸ قانون می‌خواهد تغییر خط بدون خطر یا مزاحمت بی‌جا برای دیگران باشد."),
  S(False, "Bilen i venstre vognbane skal sænke farten, når jeg blinker.", "The car in the left lane must slow down when I indicate.",
    "خودروی خط چپ وقتی راهنما می‌زنم، باید سرعتش را کم کند.",
    "Blinklyset giver dig ikke ret til at skifte vognbane.", "The indicator does not give you the right to change lanes.", "راهنما به شما حق تغییر خط نمی‌دهد."),
  S(True, "Jeg giver tegn med blinklyset i god tid, før jeg skifter vognbane.", "I signal with the indicator in good time before I change lanes.",
    "پیش از تغییر خط، به موقع راهنما می‌زنم.",
    "Andre skal kunne nå at se, hvad du vil gøre.", "Others must have time to see what you are going to do.", "دیگران باید فرصت داشته باشند ببینند چه می‌خواهید بکنید."),
)

Q(5066, "7.4", view("""
THE SCENE: a road with two lanes in our direction in slow, dense traffic. Ahead the RIGHT lane ends: white arrows on the road in the
right lane bend to the left, and a sign on the right shows two lanes becoming one. Cars in both lanes drive slowly side by side
towards the point where the lanes meet.
MUST BE CLEARLY VISIBLE: the ending right lane, the arrows, the lane-ends sign, the slow cars in both lanes.
MUST NOT APPEAR: text."""),
  "Den ene vognbane ophører, og der er tæt trafik i begge vognbaner. Hvad gælder?",
  "One of the lanes ends, and there is dense traffic in both lanes. What applies?",
  "یکی از خط‌ها تمام می‌شود و در هر دو خط ترافیک سنگین است. چه قاعده‌ای برقرار است؟",
  S(True, "Vi skal vise gensidigt hensyn og tilpasse farten.", "We must show each other consideration and adjust our speed.", "باید به هم ملاحظه نشان دهیم و سرعت را تنظیم کنیم.",
    "Når antallet af vognbaner bliver mindre, skal de kørende tilpasse sig under gensidig hensyntagen.", "When the number of lanes decreases, drivers must adapt with mutual consideration.", "وقتی تعداد خط‌ها کم می‌شود، رانندگان باید با ملاحظه‌ی متقابل خود را تطبیق دهند."),
  S(True, "Det er en god idé at flette skiftevis, én bil fra hver vognbane.", "It is a good idea to merge in turn, one car from each lane.", "خوب است به نوبت، یکی از هر خط، ادغام شویم.",
    "Fletning på skift får trafikken til at glide bedst.", "Merging in turn makes the traffic flow best.", "ادغام نوبتی باعث می‌شود ترافیک روان‌تر حرکت کند."),
  S(False, "Den, der kører i den vognbane, der fortsætter, behøver ikke tage hensyn.", "Whoever drives in the lane that continues need not show any consideration.",
    "کسی که در خطی می‌رود که ادامه دارد، لازم نیست ملاحظه کند.",
    "Hensynet gælder begge veje.", "Consideration applies both ways.", "ملاحظه از هر دو طرف لازم است."),
)

Q(5067, "7.16", view("""
THE SCENE: we drive on the acceleration lane of a motorway access road; to our left the motorway's right lane, with a gap opening
behind a white lorry; a grey car further back in the motorway's right lane. The acceleration lane is long, with a broken line on its
left side and its end still well ahead.
MUST BE CLEARLY VISIBLE: the acceleration lane, the gap in the motorway traffic, the broken line.
MUST NOT APPEAR: signs, text."""),
  "Du kører på accelerationsbanen ind mod motorvejen. Hvordan forholder du dig?",
  "You are on the acceleration lane onto the motorway. What do you do?",
  "در خط شتاب‌گیری به سمت بزرگراه می‌رانید. چه می‌کنید؟",
  S(True, "Jeg tilpasser farten til trafikken på motorvejen.", "I adjust my speed to the traffic on the motorway.", "سرعتم را با ترافیک بزرگراه هماهنگ می‌کنم.",
    "På accelerationsbanen skal du tilpasse farten til trafikken i den vognbane, du skal over i.", "On the acceleration lane you must match your speed to the traffic in the lane you are joining.", "در خط شتاب‌گیری باید سرعت را با ترافیک خطی که واردش می‌شوید هماهنگ کنید."),
  S(True, "Jeg kører ud på motorvejen, når det kan ske uden fare.", "I move onto the motorway when it can be done safely.", "وقتی بی‌خطر باشد وارد بزرگراه می‌شوم.",
    "Du skal forlade accelerationsbanen, når det kan ske uden fare.", "You must leave the acceleration lane when it can be done safely.", "وقتی بی‌خطر باشد، باید خط شتاب‌گیری را ترک کنید."),
  S(False, "Jeg standser for enden af banen og venter på et stort hul.", "I stop at the end of the lane and wait for a big gap.", "در انتهای خط می‌ایستم و منتظر فاصله‌ای بزرگ می‌مانم.",
    "At standse er farligt; brug banens længde til at tilpasse farten og find et hul.", "Stopping is dangerous; use the lane's length to match your speed and find a gap.", "ایستادن خطرناک است؛ از طول خط برای هماهنگ کردن سرعت و پیدا کردن فاصله استفاده کنید."),
  S(False, "Trafikken på motorvejen skal altid skifte vognbane for at lukke mig ind.", "The motorway traffic must always change lanes to let me in.",
    "ترافیک بزرگراه همیشه باید خط عوض کند تا مرا راه بدهد.",
    "De på motorvejen skal om nødvendigt lette din indkørsel, men du skal selv tilpasse farten og finde et sikkert hul.",
    "Those on the motorway should make it easier for you to join if needed, but you must match your speed and find a safe gap yourself.",
    "رانندگان بزرگراه در صورت لزوم ورود شما را آسان‌تر می‌کنند، ولی خودتان باید سرعت را هماهنگ کنید و فاصله‌ی امنی پیدا کنید."),
)

Q(5068, "7.1", view("""
THE SCENE: we are parked at the right kerb of a town street and are about to drive off. In the left door mirror (at the left edge of
the picture) a cyclist is visible coming from behind in our lane, close to the parked cars. The street ahead is clear.
MUST BE CLEARLY VISIBLE: the cyclist in the left door mirror, the kerb on our right.
MUST NOT APPEAR: signs, text.""", scenery="Scenery is reduced to simple flat house fronts, pavements and a few trees."),
  "Du holder ved kantstenen og vil køre ud. Bag dig kommer en cyklist. Hvordan forholder du dig?",
  "You are parked at the kerb and want to drive off. A cyclist is coming up behind you. What do you do?",
  "کنار جدول ایستاده‌اید و می‌خواهید حرکت کنید. از پشت دوچرخه‌سواری می‌آید. چه می‌کنید؟",
  S(True, "Jeg lader cyklisten passere, før jeg kører ud.", "I let the cyclist pass before I drive off.", "می‌گذارم دوچرخه‌سوار رد شود و بعد حرکت می‌کنم.",
    "Du må kun køre ud fra vejkanten, når det kan ske uden fare eller unødig ulempe for andre.", "You may only pull away from the kerb when it can be done without danger or undue inconvenience to others.", "فقط وقتی می‌توانید از کنار جاده حرکت کنید که برای دیگران خطر یا مزاحمت بی‌جا نداشته باشد."),
  S(True, "Jeg blinker og kigger over venstre skulder, før jeg kører ud.", "I indicate and look over my left shoulder before I pull out.", "راهنما می‌زنم و پیش از حرکت از روی شانه‌ی چپ نگاه می‌کنم.",
    "Du skal give tegn, før du kører ud fra vejkanten, og tjekke den blinde vinkel.", "You must signal before pulling away from the kerb and check the blind spot.", "پیش از حرکت از کنار جاده باید علامت بدهید و نقطه‌ی کور را بررسی کنید."),
  S(False, "Når jeg blinker, skal cyklisten holde tilbage.", "When I indicate, the cyclist must give way.", "وقتی راهنما بزنم، دوچرخه‌سوار باید راه بدهد.",
    "Blinklyset giver dig ikke ret til at køre ud.", "The indicator does not give you the right to pull out.", "راهنما به شما حق حرکت نمی‌دهد."),
  S(False, "Spejlene er nok; jeg behøver ikke dreje hovedet.", "The mirrors are enough; I do not need to turn my head.", "آینه‌ها کافی‌اند؛ لازم نیست سرم را بچرخانم.",
    "Spejlene viser ikke den blinde vinkel.", "The mirrors do not show the blind spot.", "آینه‌ها نقطه‌ی کور را نشان نمی‌دهند."),
)

Q(5069, "7.1", view("""
THE SCENE: a town street, one lane in our direction. We want to stop at the right kerb about 30 m ahead, where there is a free space.
Between our lane and the kerb there is no cycle path, but a cyclist rides along the right edge just ahead of us. Cars follow us,
visible in the interior rear-view mirror.
MUST BE CLEARLY VISIBLE: the free space at the kerb, the cyclist at the right edge, the cars in the mirror.
MUST NOT APPEAR: signs, yellow lines, text.""", scenery="Scenery is reduced to simple flat house fronts, pavements and a few trees."),
  "Du vil standse ved kantstenen lidt fremme. Hvordan forholder du dig?",
  "You want to stop at the kerb a little further ahead. What do you do?",
  "می‌خواهید کمی جلوتر کنار جدول بایستید. چه می‌کنید؟",
  S(True, "Jeg ser i spejlet og giver tegn i god tid.", "I look in the mirror and signal in good time.", "در آینه نگاه می‌کنم و به موقع علامت می‌دهم.",
    "Bilerne bag dig skal kunne forstå, hvad du vil.", "The cars behind you must be able to understand what you are doing.", "خودروهای پشت سر باید بفهمند چه قصدی دارید."),
  S(True, "Jeg holder øje med cyklisten i højre side.", "I keep an eye on the cyclist on the right.", "مراقب دوچرخه‌سوار سمت راست هستم.",
    "Du må ikke klemme cyklisten mellem bilen og kantstenen.", "You must not squeeze the cyclist between the car and the kerb.", "نباید دوچرخه‌سوار را بین خودرو و جدول گیر بیندازید."),
  S(False, "Jeg bremser hårdt, så jeg hurtigt kommer ind til kanten.", "I brake hard so that I get to the kerb quickly.", "محکم ترمز می‌کنم تا زود کنار جدول برسم.",
    "Pludselig opbremsning kan skabe fare for dem bag dig.", "Sudden braking can endanger those behind you.", "ترمز ناگهانی ممکن است پشت‌سری‌ها را به خطر بیندازد."),
)

Q(5070, "7.2", view("""
THE SCENE: a straight two-way country road, one lane in each direction, a broken centre line, solid edge lines, fields. No oncoming
traffic, nobody behind. About 80 m ahead a man walks at the far right edge of the road (on our side), pushing a bicycle.
MUST BE CLEARLY VISIBLE: the empty road, the man pushing a bicycle at the right edge.
MUST NOT APPEAR: signs, text."""),
  "Der er ingen modkørende. Hvordan placerer du bilen på vejen?",
  "There is no oncoming traffic. How do you position the car on the road?",
  "ترافیک روبه‌رو نیست. خودرو را در جاده چطور قرار می‌دهید؟",
  S(True, "Jeg holder så langt til højre, som forholdene tillader.", "I keep as far to the right as the conditions allow.", "تا جایی که شرایط اجازه دهد سمت راست می‌مانم.",
    "Kørende skal holde så langt til højre som muligt under hensyn til anden færdsel og forholdene.", "Drivers must keep as far right as possible, considering other traffic and the conditions.", "رانندگان باید با در نظر گرفتن ترافیک و شرایط، تا جای ممکن سمت راست بمانند."),
  S(False, "Jeg kører midt på vejen, fordi der ikke er nogen modkørende.", "I drive in the middle of the road because there is no oncoming traffic.", "وسط جاده می‌رانم، چون ترافیک روبه‌رو نیست.",
    "Reglen om at holde til højre gælder også på en tom vej.", "The keep-right rule applies on an empty road too.", "قاعده‌ی سمت راست ماندن در جاده‌ی خالی هم برقرار است."),
  S(True, "Når jeg passerer manden med cyklen, giver jeg ham god plads.", "When I pass the man with the bicycle, I give him plenty of room.", "وقتی از کنار مرد دوچرخه‌به‌دست رد می‌شوم، جای زیادی به او می‌دهم.",
    "Gående skal have god plads, når du passerer dem.", "Pedestrians must be given plenty of room when you pass them.", "هنگام رد شدن از کنار عابران باید جای کافی به آن‌ها بدهید."),
  S(False, "Manden går forkert, fordi han går i højre side.", "The man is walking wrongly because he is on the right side.", "آن مرد اشتباه می‌رود، چون در سمت راست است.",
    "Den, der trækker en cykel, skal gå i vejens højre side.", "Someone pushing a bicycle must walk on the right side of the road.", "کسی که دوچرخه را با دست می‌برد، باید در سمت راست جاده برود."),
)

Q(5071, "7.2", above("""
THE SCENE: a straight country road seen from above with THREE lanes and traffic in both directions: the right lane for traffic going
up, the left lane for traffic coming down, and a shared middle lane between them, marked off by broken lines.
VEHICLES (colour code used strictly): a RED car (ours) going up in the right lane behind a slow GREEN tractor; a BLUE car coming down
in the left lane; a GREY car coming down that has moved into the middle lane to overtake.
MUST NOT APPEAR: signs, text."""),
  "Vejen har tre vognbaner og trafik i begge retninger. Hvad gælder?",
  "The road has three lanes and traffic in both directions. What applies?",
  "جاده سه خط دارد و از هر دو طرف ترافیک دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke bruge vognbanen længst til venstre.", "I must not use the lane furthest to the left.", "نباید از چپ‌ترین خط استفاده کنم.",
    "På en vej med tre vognbaner og trafik i begge retninger må den venstre vognbane ikke bruges.", "On a road with three lanes and traffic in both directions the left lane must not be used.", "در جاده‌ی سه‌خطه‌ی دوطرفه، نباید از خط سمت چپ استفاده کرد."),
  S(True, "Den modkørende i midtervognbanen viser, at jeg ikke kan overhale traktoren lige nu.", "The oncoming car in the middle lane shows that I cannot overtake the tractor right now.",
    "خودروی روبه‌رو در خط وسط نشان می‌دهد که الان نمی‌توانم از تراکتور سبقت بگیرم.",
    "Midtervognbanen kan bruges til overhaling fra begge retninger.", "The middle lane can be used for overtaking from both directions.", "خط وسط برای سبقت از هر دو جهت قابل استفاده است."),
  S(False, "Midtervognbanen er kun for min retning.", "The middle lane is only for my direction.", "خط وسط فقط برای جهت من است.",
    "Den deles af begge retninger; vær særligt opmærksom på modkørende i den.", "It is shared by both directions; watch especially for oncoming traffic in it.", "هر دو جهت از آن استفاده می‌کنند؛ مراقب ترافیک روبه‌رو در آن باشید."),
)

Q(5072, "7.19", view("""
THE SCENE: a dark, unlit two-way country road at night outside town, no street lamps anywhere. About 40 m ahead, at the right edge
of the road in our lane, a dark grey car stands parked with all its lights switched off, so that it is only just visible in the
light of our own dipped headlights.
MUST BE CLEARLY VISIBLE: the dark, unlit road, the parked car without lights at the right edge.
MUST NOT APPEAR: other vehicles, text.""", cond="night, dark unlit road, dry"),
  "Du vil parkere i vejkanten på en mørk vej uden for byen om natten. Hvilke lygter skal være tændt, når bilen holder der?",
  "You want to park at the edge of a dark road outside town at night. Which lights must be on while the car is parked there?",
  "می‌خواهید شب کنار جاده‌ای تاریک بیرون از شهر پارک کنید. وقتی خودرو آن‌جا ایستاده، کدام چراغ‌ها باید روشن باشند؟",
  S(True, "Positionslys (parkeringslys).", "Position lights (parking lights).", "چراغ‌های موقعیت (چراغ پارک).",
    "I lygtetændingstiden skal en bil, der holder på vejen, have positionslys, baglygter og nummerpladelys tændt.", "During lighting-up time a car standing on the road must have its position lights, rear lights and number-plate light on.", "در زمان روشن کردن چراغ‌ها، خودرویی که در جاده ایستاده باید چراغ موقعیت، چراغ‌های عقب و چراغ پلاک را روشن داشته باشد."),
  S(True, "Baglygterne.", "The rear lights.", "چراغ‌های عقب.",
    "Baglygterne viser dem, der kommer bagfra, at bilen holder der.", "The rear lights show those coming from behind that the car is there.", "چراغ‌های عقب به کسانی که از پشت می‌آیند نشان می‌دهند خودرو آن‌جاست."),
  S(True, "Nummerpladelygten.", "The number-plate light.", "چراغ پلاک.",
    "Nummerpladelygten hører med til de lygter, der skal være tændt.", "The number-plate light is one of the lights that must be on.", "چراغ پلاک جزو چراغ‌هایی است که باید روشن باشند."),
  S(False, "Nærlyset, så modkørende kan se mig tydeligt.", "The dipped beam, so that oncoming drivers can see me clearly.", "نور پایین، تا رانندگان روبه‌رو مرا واضح ببینند.",
    "Andre lygter end positionslys, baglygter og nummerpladelys må ikke holdes tændt på en holdende bil.", "Lights other than the position lights, rear lights and number-plate light must not be kept on in a standing car.", "در خودروی ایستاده، چراغی جز چراغ موقعیت، چراغ‌های عقب و چراغ پلاک نباید روشن بماند."),
)

Q(5073, "7.19", town("""
THE SCENE: a well-lit town street in the evening: bright street lamps along both pavements light up the whole road. One lane in each
direction, some oncoming cars with their lights on.
MUST BE CLEARLY VISIBLE: the bright street lighting, the lit road.
MUST NOT APPEAR: text.""", cond="evening, dark sky, bright street lighting, dry"),
  "Du kører på en godt oplyst gade i byen om aftenen. Hvilket lys bruger du?",
  "You are driving on a well-lit street in town in the evening. Which lights do you use?",
  "عصر در خیابانی پرنور در شهر می‌رانید. از کدام چراغ استفاده می‌کنید؟",
  S(True, "Nærlys.", "Dipped beam.", "نور پایین.",
    "Fjernlys må ikke bruges på en tilstrækkeligt oplyst vej; så skal du bruge nærlys.", "High beam must not be used on a sufficiently lit road; then you must use dipped beam.", "در جاده‌ی به اندازه‌ی کافی روشن، نور بالا مجاز نیست و باید از نور پایین استفاده کنید."),
  S(False, "Fjernlys.", "High beam.", "نور بالا.",
    "Fjernlys er forbudt på en godt oplyst vej.", "High beam is forbidden on a well-lit road.", "نور بالا در جاده‌ی پرنور ممنوع است."),
  S(False, "Kun positionslys.", "Only the position lights.", "فقط چراغ‌های موقعیت.",
    "Under kørsel er positionslys ikke nok; du skal have nærlys.", "Position lights are not enough while driving; you must have dipped beam.", "هنگام رانندگی چراغ موقعیت کافی نیست؛ باید نور پایین روشن باشد."),
  S(False, "Tågeforlygter, fordi det er mørkt.", "Front fog lights, because it is dark.", "چراغ‌های مه‌شکن جلو، چون تاریک است.",
    "I mørke må tågelygter kun bruges i tåge eller under kraftig nedbør.", "In the dark, fog lights may only be used in fog or heavy precipitation.", "در تاریکی، چراغ مه‌شکن فقط در مه یا بارش شدید مجاز است."),
)

Q(5074, "7.19", view("""
THE SCENE: a dark, unlit two-way country road at night. We drive about 40 m behind another car; its red rear lights are clearly
visible ahead. No oncoming traffic.
MUST BE CLEARLY VISIBLE: the car ahead with its rear lights, the dark road.
MUST NOT APPEAR: street lamps, signs, text.""", cond="night, dark unlit road, dry"),
  "Du kører i mørke bag en anden bil. Hvilket lys bruger du?",
  "You are driving behind another car in the dark. Which lights do you use?",
  "در تاریکی پشت خودروی دیگری می‌رانید. از کدام چراغ استفاده می‌کنید؟",
  S(True, "Nærlys, fordi fjernlyset kan blænde føreren foran.", "Dipped beam, because the high beam can dazzle the driver ahead.", "نور پایین، چون نور بالا می‌تواند راننده‌ی جلویی را خیره کند.",
    "Fjernlys må ikke bruges, når du kører efter en, der kan blive blændet.", "High beam must not be used when you are following someone who could be dazzled.", "وقتی پشت کسی می‌رانید که ممکن است خیره شود، نباید از نور بالا استفاده کنید."),
  S(False, "Fjernlys, så jeg kan se længere frem.", "High beam, so that I can see further ahead.", "نور بالا، تا جلوتر را ببینم.",
    "Fjernlyset blænder føreren foran gennem spejlene.", "The high beam dazzles the driver ahead through the mirrors.", "نور بالا از طریق آینه‌ها راننده‌ی جلویی را خیره می‌کند."),
  S(True, "Fjernlyset kan blænde gennem bilens spejle.", "The high beam can dazzle through the car's mirrors.", "نور بالا می‌تواند از طریق آینه‌های خودرو خیره کند.",
    "Spejlene kaster dit lys ind i øjnene på føreren foran.", "The mirrors throw your light into the eyes of the driver ahead.", "آینه‌ها نور شما را به چشم راننده‌ی جلویی می‌اندازند."),
)

Q(5075, "7.16", view("""
THE SCENE: the start of a motorway access road: on the right verge stands the green square motorway sign (white symbol of a road under a
bridge). On the verge of the access road a cyclist and a person with a small 30 km/h moped (a light two-wheeler) stand looking at the
sign. A car drives ahead of us onto the access road.
MUST BE CLEARLY VISIBLE: the motorway sign, the cyclist and the moped rider by the access road.
MUST NOT APPEAR: text."""),
  "Hvem må køre på motorvejen?",
  "Who may drive on the motorway?",
  "چه کسانی می‌توانند در بزرگراه رانندگی کنند؟",
  S(True, "Motorkøretøjer, der kan og må køre mindst 50 km/t.", "Motor vehicles that can and may drive at least 50 km/h.", "وسایل موتوری‌ای که بتوانند و اجازه داشته باشند دست‌کم ۵۰ کیلومتر بر ساعت بروند.",
    "Motorvejen er forbeholdt motorkøretøjer, der på vandret vej kan og må køre mindst 50 km/t.", "The motorway is reserved for motor vehicles that can and may do at least 50 km/h on level road.", "بزرگراه مخصوص وسایل موتوری‌ای است که در جاده‌ی هموار بتوانند و اجازه داشته باشند دست‌کم ۵۰ کیلومتر بر ساعت بروند."),
  S(False, "Cyklister, hvis de holder i nødsporet.", "Cyclists, if they keep to the hard shoulder.", "دوچرخه‌سواران، اگر در شانه‌ی اضطراری بمانند.",
    "Cyklister må ikke færdes på motorvejen.", "Cyclists must not use the motorway.", "دوچرخه‌سواران اجازه‌ی رفت‌وآمد در بزرگراه را ندارند."),
  S(False, "En lille knallert, der højst kører 30 km/t.", "A small moped that does at most 30 km/h.", "موپد کوچکی که حداکثر ۳۰ کیلومتر بر ساعت می‌رود.",
    "Den kan ikke køre 50 km/t og må derfor ikke køre på motorvejen.", "It cannot do 50 km/h and therefore may not drive on the motorway.", "نمی‌تواند ۵۰ کیلومتر بر ساعت برود، پس اجازه‌ی رانندگی در بزرگراه ندارد."),
  S(False, "Alle motorkøretøjer, uanset hvor hurtigt de kan køre.", "All motor vehicles, however fast they can go.", "همه‌ی وسایل موتوری، هر قدر هم سرعتشان باشد.",
    "Et motorkøretøj, der ikke kan eller ikke må køre mindst 50 km/t, må ikke bruge motorvejen.",
    "A motor vehicle that cannot or may not do at least 50 km/h must not use the motorway.",
    "وسیله‌ی موتوری‌ای که نتواند یا اجازه نداشته باشد دست‌کم ۵۰ کیلومتر بر ساعت برود، نباید از بزرگراه استفاده کند."),
)
