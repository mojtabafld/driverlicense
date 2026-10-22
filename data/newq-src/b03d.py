# «آزمون جدید», batch 3 (5201–5300), part d: meeting (7.7), lane changes (7.4), pulling out from the kerb (7.1), position on
# the road (7.2), lights (7.19), the motorway (7.16), keeping the traffic flowing (6.2), road risks (5.2), distance (7.8),
# reversing (7.5), the road's design (5.1).
# Rules: Færdselsloven §§ 2 nr. 12, 15, 18, 20, 21, 28, 31, 32, 33, 41, 46, 47, 80; Bekendtgørelse om vejafmærkning (A 36,
# E 34, Q 46, R 11, V 42); FDM (warning triangle).
from nq import Q, S, above, picture, town, view

TOWN_PLAIN = "Scenery is reduced to simple flat house fronts, pavements and a few trees."

Q(5276, "7.7", view("""
THE SCENE: a straight two-lane country road with a broken centre line. About 150 m ahead an oncoming car is overtaking a lorry and is
coming towards us in OUR lane; the lorry is in its own lane beside it.
MUST BE CLEARLY VISIBLE: the oncoming car in our lane, the lorry it is overtaking, the room at our right edge.
MUST NOT APPEAR: signs, text."""),
  "En modkørende bil overhaler en lastbil og kommer imod dig i din vognbane. Hvordan forholder du dig?",
  "An oncoming car is overtaking a lorry and coming towards you in your lane. What do you do?",
  "خودرویی از روبه‌رو در حال سبقت از یک کامیون است و در خط شما به سمتتان می‌آید. چه می‌کنید؟",
  S(True, "Jeg sænker farten med det samme, så den overhalende kan nå at komme ind.", "I slow down at once so that the overtaking car has time to get back in.",
    "فوراً سرعتم را کم می‌کنم تا خودروی سبقت‌گیرنده بتواند به خط خودش برگردد.",
    "Jo lavere farten er, jo mere tid og plads bliver der til, at den overhalende kan nå ind.",
    "The lower your speed, the more time and room there is for the overtaking car to get back in.",
    "هرچه سرعت کمتر باشد، زمان و جای بیشتری برای برگشتن خودروی سبقت‌گیرنده می‌ماند."),
  S(True, "Jeg holder så langt til højre, som det kan ske sikkert.", "I keep as far to the right as can be done safely.", "تا جایی که بی‌خطر باشد به راست می‌روم.",
    "Så bliver der mere plads midt på vejen.", "That leaves more room in the middle of the road.", "این کار جای بیشتری در وسط جاده باز می‌کند."),
  S(True, "Om nødvendigt standser jeg helt.", "If necessary I stop completely.", "در صورت لزوم کاملاً می‌ایستم.",
    "Det er bedre at standse end at risikere et frontalt sammenstød.", "It is better to stop than to risk a head-on collision.", "توقف بهتر از خطر برخورد رودررو است."),
  S(False, "Jeg holder farten og blinker med lyset, for det er den overhalende, der skal vige.", "I keep my speed and flash my lights, as it is the overtaking car that must give way.",
    "سرعتم را حفظ می‌کنم و چراغ می‌زنم، چون خودروی سبقت‌گیرنده باید کنار برود.",
    "Den overhalende har bedømt situationen forkert, men du skal gøre, hvad du kan, for at undgå et uheld.",
    "The overtaking driver has misjudged the situation, but you must do what you can to avoid an accident.",
    "راننده‌ی سبقت‌گیرنده اشتباه کرده، ولی شما باید هر کاری می‌توانید برای جلوگیری از تصادف انجام دهید."),
)

Q(5277, "7.7", view("""
THE SCENE: a narrow country road between fields. An oncoming tractor pulls a very wide harrow with orange-and-white warning panels on
its ends and a yellow flashing beacon on the cab; the implement sticks out over the middle of the road into our side.
MUST BE CLEARLY VISIBLE: the tractor, the wide implement reaching into our side, the narrow road.
MUST NOT APPEAR: signs, text."""),
  "En traktor med et bredt redskab kommer imod dig på en smal vej. Redskabet fylder mere end traktorens side af vejen. Hvordan forholder du dig?",
  "A tractor with a wide implement is coming towards you on a narrow road. The implement takes up more than the tractor's side of the road. What do you do?",
  "تراکتوری با یک ادوات پهن در جاده‌ای باریک از روبه‌رو می‌آید. ادواتش بیشتر از سهم تراکتور از جاده جا گرفته است. چه می‌کنید؟",
  S(True, "Jeg sænker farten, holder helt til højre og standser om nødvendigt, hvor der er plads.",
    "I slow down, keep right over and stop if necessary where there is room.", "سرعتم را کم می‌کنم، کاملاً به راست می‌روم و در صورت لزوم جایی که جا هست می‌ایستم.",
    "Ved møde på en smal vej skal du holde en passende lav hastighed og give god plads.", "When meeting on a narrow road you must keep a suitably low speed and give plenty of room.",
    "هنگام روبه‌رو شدن در جاده‌ی باریک باید سرعت مناسبِ کمی داشته باشید و جای کافی بدهید."),
  S(False, "Jeg kører forbi i samme fart, fordi traktoren skal holde sig i sin egen side.", "I drive past at the same speed, as the tractor must keep to its own side.",
    "با همان سرعت رد می‌شوم، چون تراکتور باید در سمت خودش بماند.",
    "Redskabet kan ramme dig; du skal tage hensyn og give plads.", "The implement may hit you; you must take care and give room.",
    "ادوات ممکن است به شما بخورد؛ باید ملاحظه کنید و جا بدهید."),
  S(False, "Traktoren skal standse for mig, fordi den kører langsommere.", "The tractor must stop for me because it is slower.", "تراکتور باید برای من بایستد، چون کندتر است.",
    "Langsomme køretøjer har ikke pligt til at standse for dig; I skal begge vise hensyn.", "Slow vehicles have no duty to stop for you; you must both show consideration.",
    "وسایل کُند وظیفه ندارند برایتان بایستند؛ هر دو باید ملاحظه کنید."),
  S(False, "Jeg blinker med fjernlyset, så traktoren kører ind til siden.", "I flash my high beam so that the tractor pulls in to the side.",
    "با نور بالا چراغ می‌زنم تا تراکتور کنار بکشد.",
    "Et lyssignal giver dig ingen ret og kan misforstås, og traktoren har måske ingen plads at køre ind på.",
    "A light signal gives you no right and can be misunderstood, and the tractor may have nowhere to pull in.",
    "علامت نوری به شما حقی نمی‌دهد و ممکن است اشتباه فهمیده شود و شاید تراکتور جایی برای کنار کشیدن نداشته باشد."),
)

Q(5278, "7.7", view("""
THE SCENE: a narrow gravel road through a forest, one lane wide with loose gravel at the edges. An oncoming car approaches, raising a
cloud of dust and small stones behind it.
MUST BE CLEARLY VISIBLE: the gravel surface, the oncoming car, the dust behind it.
MUST NOT APPEAR: signs, text."""),
  "Du kører på en smal grusvej, og en bil kommer imod dig. Hvordan forholder du dig?",
  "You are driving on a narrow gravel road and a car is coming towards you. What do you do?",
  "در یک جاده‌ی خاکی باریک رانندگی می‌کنید و خودرویی از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg sænker farten, så vi ikke slynger sten op mod hinanden.", "I slow down so that we do not throw stones up at each other.",
    "سرعتم را کم می‌کنم تا سنگ‌ریزه به سمت هم پرتاب نکنیم.",
    "Ved møde på smal vej skal farten være lav, og på grus kan sten ramme ruder og lak.", "When meeting on a narrow road the speed must be low, and on gravel stones can hit windows and paint.",
    "هنگام روبه‌رو شدن در جاده‌ی باریک سرعت باید کم باشد و روی شن، سنگ‌ریزه ممکن است به شیشه و رنگ بخورد."),
  S(True, "Jeg holder godt til højre, men passer på, at hjulene ikke glider i det løse grus i kanten.",
    "I keep well to the right, but take care that the wheels do not slide in the loose gravel at the edge.",
    "به خوبی سمت راست می‌مانم، ولی مراقبم چرخ‌ها در شن‌های شلِ لبه نلغزند.",
    "Det løse grus i kanten giver dårligt vejgreb.", "The loose gravel at the edge gives poor grip.", "شن‌های شلِ لبه چسبندگی کمی دارند."),
  S(False, "På grus er bremselængden kortere end på asfalt.", "On gravel the braking distance is shorter than on asphalt.", "روی شن مسافت ترمز کوتاه‌تر از آسفالت است.",
    "Bremselængden bliver længere på grus, fordi hjulene har mindre greb.", "The braking distance becomes longer on gravel because the wheels have less grip.",
    "روی شن مسافت ترمز بیشتر می‌شود، چون چرخ‌ها چسبندگی کمتری دارند."),
)

Q(5279, "7.7", view("""
THE SCENE: a sharp bend to the left on a two-lane road with a broken centre line, a hedge on the inside of the bend. An oncoming lorry
is cutting the corner: its left wheels are well over the centre line in our lane.
MUST BE CLEARLY VISIBLE: the lorry over the centre line, the sharp bend, the room at our right edge.
MUST NOT APPEAR: signs, text."""),
  "I et skarpt sving kommer en lastbil imod dig, og den kommer et stykke over midterlinjen. Hvordan forholder du dig?",
  "In a sharp bend a lorry is coming towards you, and it is some way over the centre line. What do you do?",
  "در یک پیچ تند، کامیونی از روبه‌رو می‌آید و کمی از خط وسط رد شده است. چه می‌کنید؟",
  S(True, "Jeg sænker farten og holder helt ind til højre.", "I slow down and keep well in to the right.", "سرعتم را کم می‌کنم و کاملاً به راست می‌روم.",
    "Et langt køretøj har brug for plads i et skarpt sving; giv det plads og vær klar til at standse.", "A long vehicle needs room in a sharp bend; give it room and be ready to stop.",
    "وسیله‌ی بلند در پیچ تند جا لازم دارد؛ به آن جا بدهید و آماده‌ی توقف باشید."),
  S(False, "Jeg bliver midt i min vognbane, for det er lastbilen, der kører forkert.", "I stay in the middle of my lane, as it is the lorry that is in the wrong.",
    "در وسط خط خودم می‌مانم، چون کامیون اشتباه می‌کند.",
    "Du skal gøre, hvad du kan, for at undgå et sammenstød.", "You must do what you can to avoid a collision.", "باید هر کاری می‌توانید برای جلوگیری از برخورد انجام دهید."),
  S(False, "Jeg skærer selv svinget, så jeg hurtigere kommer forbi lastbilen.", "I cut the bend myself so that I get past the lorry sooner.",
    "خودم هم پیچ را میان‌بر می‌زنم تا زودتر از کنار کامیون رد شوم.",
    "Så kommer du endnu tættere på lastbilen; hold dig til højre.", "Then you get even closer to the lorry; keep to the right.", "این‌طور به کامیون نزدیک‌تر می‌شوید؛ سمت راست بمانید."),
  S(False, "Jeg accelererer, så jeg er forbi lastbilen, før svinget bliver skarpest.", "I accelerate so that I am past the lorry before the bend gets sharpest.",
    "گاز می‌دهم تا پیش از تندترین قسمت پیچ از کامیون رد شوم.",
    "Høj fart i svinget giver mindre tid og plads; sæt farten ned.", "High speed in the bend gives less time and room; slow down.", "سرعت زیاد در پیچ زمان و جای کمتری می‌دهد؛ سرعت را کم کنید."),
)

Q(5280, "7.4", above("""
THE SCENE: a motorway seen from above with TWO lanes in our direction and an acceleration lane joining from the right.
VEHICLES (colour code used strictly): a RED car (ours) in the right lane, level with the end of the acceleration lane; a GREY car on the
acceleration lane beside it, about to merge; the left lane free behind us; a DASHED ORANGE arrow from the red car into the left lane.
MUST NOT APPEAR: signs, text."""),
  "Du kører i højre vognbane på motorvejen. En bil på accelerationsbanen skal ind på motorvejen lige ved siden af dig. Hvordan forholder du dig?",
  "You are in the right lane on the motorway. A car on the acceleration lane is about to join the motorway right beside you. What do you do?",
  "در خط راست آزادراه هستید. خودرویی در خط شتاب‌گیری درست کنار شما می‌خواهد وارد آزادراه شود. چه می‌کنید؟",
  S(True, "Jeg letter indkørslen, fx ved at skifte til venstre vognbane, hvis den er fri.", "I make it easier for it to join, for example by moving into the left lane if it is free.",
    "ورودش را آسان می‌کنم، مثلاً اگر خط چپ خالی باشد به آن می‌روم.",
    "Den, der kører i vognbanen ved accelerationsbanen, skal så vidt muligt lette indkørslen.", "Whoever is driving in the lane by the acceleration lane must make the joining easier where possible.",
    "کسی که در خطِ کنار خط شتاب‌گیری می‌راند، باید تا جای ممکن ورود را آسان کند."),
  S(True, "Kan jeg ikke skifte vognbane, tilpasser jeg farten, så der bliver et hul.", "If I cannot change lanes, I adjust my speed so that a gap opens.",
    "اگر نتوانم خط عوض کنم، سرعتم را طوری تنظیم می‌کنم که فاصله‌ای باز شود.",
    "Så kan bilen glide ind foran eller bag dig.", "Then the car can slip in in front of or behind you.", "این‌طور آن خودرو می‌تواند جلو یا پشت شما وارد شود."),
  S(False, "Bilen på accelerationsbanen skal altid vente, til motorvejen er helt fri.", "The car on the acceleration lane must always wait until the motorway is completely free.",
    "خودروی خط شتاب‌گیری همیشه باید صبر کند تا آزادراه کاملاً خالی شود.",
    "Den skal tilpasse farten og køre ind, når det kan ske uden fare, og trafikken skal lette det.", "It must adjust its speed and join when it can do so safely, and the traffic must make it easier.",
    "باید سرعتش را تنظیم کند و وقتی بی‌خطر شد وارد شود، و ترافیک هم باید ورود را آسان کند."),
  S(False, "Jeg accelererer, så bilen ikke kommer ind foran mig.", "I speed up so that the car does not get in in front of me.", "گاز می‌دهم تا آن خودرو جلوی من وارد نشود.",
    "Det gør det sværere og farligere for bilen at komme ind.", "That makes it harder and more dangerous for the car to join.", "این کار ورود آن خودرو را سخت‌تر و خطرناک‌تر می‌کند."),
)

Q(5281, "7.4", above("""
THE SCENE: a road seen from above approaching a junction with TWO lanes in our direction, separated by an UNBROKEN line for the last
40 m. The right lane has a large white arrow on the asphalt pointing to the right; the left lane has a white arrow pointing straight on.
VEHICLES (colour code used strictly): a RED car (ours) in the right lane just before the junction; a SOLID GREEN arrow from it turning
right; a DASHED ORANGE arrow from it going straight on.
MUST NOT APPEAR: signs, text."""),
  "Du er havnet i vognbanen med pil til højre, men du skal ligeud. Linjen mellem vognbanerne er ubrudt. Hvad gælder?",
  "You have ended up in the lane with an arrow to the right, but you are going straight on. The line between the lanes is unbroken. What applies?",
  "در خطی قرار گرفته‌اید که فلش به راست دارد، ولی می‌خواهید مستقیم بروید. خط بین خط‌های عبور ممتد است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg svinger til højre, som pilen viser, og finder en anden vej tilbage.", "I turn right as the arrow shows and find another way back.",
    "همان‌طور که فلش نشان می‌دهد به راست می‌پیچم و راه دیگری برای برگشتن پیدا می‌کنم.",
    "Pile foran et kryds angiver, at de kørende i vognbanen skal følge pilens retning.", "Arrows before a junction show that drivers in that lane must follow the arrow's direction.",
    "فلش‌های پیش از تقاطع یعنی رانندگانِ آن خط باید جهت فلش را دنبال کنند."),
  S(False, "Jeg må køre ligeud fra højre vognbane, når der ikke kommer nogen.", "I may go straight on from the right lane when nobody is coming.",
    "اگر کسی نیاید، می‌توانم از خط راست مستقیم بروم.",
    "Du skal følge pilen, uanset trafikken.", "You must follow the arrow, whatever the traffic.", "باید فلش را دنبال کنید، ترافیک هر چه باشد."),
  S(False, "Jeg må skifte over den ubrudte linje i sidste øjeblik, hvis jeg blinker.", "I may change across the unbroken line at the last moment if I signal.",
    "اگر راهنما بزنم، می‌توانم در آخرین لحظه از روی خط ممتد خط عوض کنم.",
    "Den ubrudte linje må ikke overskrides, og et sent vognbaneskift er farligt.", "The unbroken line must not be crossed, and a late lane change is dangerous.",
    "نباید از خط ممتد رد شد و تغییر خط دیرهنگام خطرناک است."),
  S(False, "Jeg standser ved krydset og venter på et hul i venstre vognbane.", "I stop at the junction and wait for a gap in the left lane.",
    "کنار تقاطع می‌ایستم و منتظر فاصله‌ای در خط چپ می‌مانم.",
    "En unødig standsning overrasker dem bag dig, og du må alligevel ikke skifte over den ubrudte linje.",
    "A needless stop surprises those behind you, and you may not change across the unbroken line anyway.",
    "توقف بی‌جا پشت‌سری‌ها را غافلگیر می‌کند و در هر حال نباید از روی خط ممتد خط عوض کنید."),
)

Q(5282, "7.4", above("""
THE SCENE: a motorway seen from above with THREE lanes in our direction.
VEHICLES (colour code used strictly): a RED car (ours) in the left lane with a DASHED ORANGE arrow into the middle lane; a GREY car in the
right lane, level with us, its left indicator flashing, also about to move into the middle lane; the middle lane free between them.
MUST NOT APPEAR: signs, text."""),
  "Du vil skifte fra venstre vognbane til midtervognbanen på motorvejen. En bil i højre vognbane blinker også for at komme over i midtervognbanen. Hvordan forholder du dig?",
  "You want to move from the left lane to the middle lane on the motorway. A car in the right lane is also signalling to move into the middle lane. What do you do?",
  "در آزادراه می‌خواهید از خط چپ به خط وسط بروید. خودرویی در خط راست هم راهنما زده تا به خط وسط بیاید. چه می‌کنید؟",
  S(True, "Jeg venter med at skifte, til jeg er sikker på, at den anden bil ikke kommer over ved siden af mig.",
    "I wait to change until I am sure the other car is not coming over beside me.",
    "صبر می‌کنم تا مطمئن شوم آن خودرو کنار من به خط وسط نمی‌آید، بعد خط عوض می‌کنم.",
    "Et vognbaneskift må kun ske, når det kan ske uden fare eller ulempe for andre.", "A lane change may only be made when it can be done without danger or inconvenience to others.",
    "تغییر خط فقط وقتی مجاز است که برای دیگران خطر یا مزاحمتی نداشته باشد."),
  S(True, "Jeg ser over skulderen, før jeg skifter vognbane.", "I look over my shoulder before I change lanes.", "پیش از تغییر خط از روی شانه نگاه می‌کنم.",
    "En bil kan være i den blinde vinkel, hvor spejlene ikke viser den.", "A car may be in the blind spot where the mirrors do not show it.",
    "ممکن است خودرویی در نقطه‌ی کور باشد که آینه‌ها نشانش نمی‌دهند."),
  S(False, "Jeg har ret til midtervognbanen, fordi jeg kommer fra venstre.", "I have the right to the middle lane because I am coming from the left.",
    "حق خط وسط با من است، چون از چپ می‌آیم.",
    "Ingen af jer har ret til vognbanen før den anden; begge skal sikre sig, at skiftet kan ske uden fare.", "Neither has priority to the lane; both must make sure the change can be made safely.",
    "هیچ‌کس حق تقدم خط را ندارد؛ هر دو باید مطمئن شوند تغییر خط بی‌خطر است."),
  S(True, "Jeg giver tegn i god tid, før jeg skifter vognbane.", "I signal in good time before I change lanes.", "به موقع پیش از تغییر خط راهنما می‌زنم.",
    "På motorvej skal du give tegn før vognbaneskift.", "On the motorway you must signal before changing lanes.", "در آزادراه پیش از تغییر خط باید راهنما بزنید."),
)

Q(5283, "7.1", town("""
THE SCENE: a town street with one lane in each direction. Our car is parked at the right kerb, close behind another parked car; we are
about to pull out (our left indicator lamp glows on the dashboard strip). In the left door mirror (at the left edge of the picture) a
car is visible some way back in our lane.
MUST BE CLEARLY VISIBLE: the parked car close in front of us, the car in the left door mirror.
MUST NOT APPEAR: signs, text."""),
  "Du holder parkeret tæt bag en anden bil ved kantstenen og skal køre ud. Hvordan forholder du dig?",
  "You are parked close behind another car at the kerb and are going to pull out. What do you do?",
  "کنار جدول، درست پشت خودروی دیگری پارک کرده‌اید و می‌خواهید حرکت کنید. چه می‌کنید؟",
  S(True, "Jeg ser i spejlet og over venstre skulder, før jeg kører ud.", "I look in the mirror and over my left shoulder before I pull out.",
    "پیش از حرکت در آینه و از روی شانه‌ی چپ نگاه می‌کنم.",
    "Du må kun køre ud, når det kan ske uden fare eller ulempe for andre, og spejlet viser ikke alt.",
    "You may only pull out when it can be done without danger or inconvenience to others, and the mirror does not show everything.",
    "فقط وقتی می‌توانید حرکت کنید که برای دیگران خطر یا مزاحمتی نداشته باشد، و آینه همه چیز را نشان نمی‌دهد."),
  S(True, "Jeg giver tegn, før jeg kører ud fra kanten.", "I signal before I pull out from the kerb.", "پیش از حرکت از کنار جدول راهنما می‌زنم.",
    "Du skal give tegn før igangsætning fra kanten af vejen.", "You must signal before pulling away from the edge of the road.", "پیش از حرکت از کنار جاده باید راهنما بزنید."),
  S(True, "Jeg passer på, at fronten af min bil ikke rammer bilen foran, når jeg drejer ud.", "I take care that the front of my car does not hit the car in front as I turn out.",
    "مراقبم جلوی خودرویم هنگام بیرون آمدن به خودروی جلویی نخورد.",
    "Når du drejer ud tæt bag en bil, svinger din front ud mod den.", "When you turn out close behind a car, your front swings out towards it.",
    "وقتی درست پشت خودرویی فرمان می‌دهید، جلوی خودروی شما به سمت آن می‌چرخد."),
  S(False, "Jeg kører ud, når der er et lille hul, og lader de andre bremse for mig.", "I pull out when there is a small gap and let the others brake for me.",
    "وقتی فاصله‌ی کوچکی پیدا شد بیرون می‌روم و می‌گذارم بقیه برایم ترمز کنند.",
    "Andre må ikke tvinges til at bremse eller svinge ud for dig.", "Others must not be forced to brake or swerve for you.", "دیگران نباید مجبور شوند برای شما ترمز کنند یا منحرف شوند."),
)

Q(5284, "7.1", town("""
THE SCENE: a one-way town street with one wide lane; cars are parked along both kerbs. Our car is parked at the LEFT kerb, about to pull
out to the right into the lane. In the interior rear-view mirror at the top of the picture, a car is seen some way back.
MUST BE CLEARLY VISIBLE: the parked cars on the left kerb (ours among them), the one-way lane, the car in the rear-view mirror.
MUST NOT APPEAR: signs, text."""),
  "Du holder i venstre side af en ensrettet gade og vil køre ud. Hvordan forholder du dig?",
  "You are parked on the left side of a one-way street and want to pull out. What do you do?",
  "در سمت چپ یک خیابان یک‌طرفه پارک کرده‌اید و می‌خواهید حرکت کنید. چه می‌کنید؟",
  S(True, "Jeg giver tegn til højre, fordi jeg kører ud mod højre.", "I signal right because I am pulling out to the right.", "راهنمای راست می‌زنم، چون به سمت راست حرکت می‌کنم.",
    "Tegnet skal vise, hvilken vej du kører ud fra kanten.", "The signal must show which way you are pulling away from the edge.", "راهنما باید نشان بدهد از کنار جاده به کدام سمت حرکت می‌کنید."),
  S(True, "Jeg ser over højre skulder efter trafik bagfra, før jeg kører ud.", "I look over my right shoulder for traffic from behind before I pull out.",
    "پیش از حرکت، از روی شانه‌ی راست ترافیک پشت سر را نگاه می‌کنم.",
    "Når du holder i venstre side, kommer trafikken bagfra forbi på din højre side.", "When you are on the left side, traffic from behind passes on your right.",
    "وقتی در سمت چپ ایستاده‌اید، ترافیکِ پشت سر از سمت راست شما رد می‌شود."),
  S(False, "Jeg giver tegn til venstre, fordi jeg holder i venstre side.", "I signal left because I am standing on the left side.", "راهنمای چپ می‌زنم، چون در سمت چپ ایستاده‌ام.",
    "Tegnet viser den retning, du vil køre i; her er det mod højre.", "The signal shows the direction you are going to move in; here it is to the right.",
    "راهنما جهتی را نشان می‌دهد که می‌خواهید به آن بروید؛ اینجا راست است."),
  S(False, "I en ensrettet gade kommer der ingen bagfra, så jeg behøver ikke se mig for.", "In a one-way street nobody comes from behind, so I need not look.",
    "در خیابان یک‌طرفه کسی از پشت نمی‌آید، پس لازم نیست نگاه کنم.",
    "Al trafikken i gaden kommer netop bagfra.", "All the traffic in the street comes precisely from behind.", "همه‌ی ترافیک این خیابان دقیقاً از پشت می‌آید."),
)

Q(5285, "7.1", town("""
THE SCENE: a town street in winter covered with glazed ice and patches of snow. Our car stands at the right kerb, about to pull away;
snow lies on the pavement and the parked cars.
MUST BE CLEARLY VISIBLE: the icy street surface, the snow.
MUST NOT APPEAR: signs, text, other moving vehicles.""", cond="winter, glazed ice and snow on the street, overcast"),
  "Du holder ved kantstenen på en isglat gade og vil køre ud. Hjulene begynder at spinde. Hvordan forholder du dig?",
  "You are at the kerb on an icy street and want to pull out. The wheels begin to spin. What do you do?",
  "کنار جدول در خیابانی یخ‌زده ایستاده‌اید و می‌خواهید حرکت کنید. چرخ‌ها شروع به سُر خوردن می‌کنند. چه می‌کنید؟",
  S(True, "Jeg giver mindre gas, så hjulene kan få fat.", "I ease off the accelerator so that the wheels can grip.", "گاز را کم می‌کنم تا چرخ‌ها بتوانند بگیرند.",
    "Spinder hjulene, har de mistet grebet; mindre gas giver dem greb igen.", "Spinning wheels have lost their grip; less throttle gives them grip again.",
    "چرخی که می‌چرخد و جلو نمی‌رود چسبندگی‌اش را از دست داده؛ گاز کمتر آن را برمی‌گرداند."),
  S(True, "Jeg starter med hjulene lige og drejer først, når bilen ruller.", "I start with the wheels straight and only steer once the car is rolling.",
    "با چرخ‌های صاف حرکت را شروع می‌کنم و وقتی خودرو راه افتاد فرمان می‌دهم.",
    "Lige hjul får bedre fat end drejede.", "Straight wheels grip better than turned ones.", "چرخ صاف بهتر از چرخ چرخیده می‌گیرد."),
  S(False, "Jeg giver fuld gas, så bilen hurtigt kommer ud.", "I put my foot down so that the car gets out quickly.", "تا ته گاز می‌دهم تا خودرو زود بیرون برود.",
    "Fuld gas får hjulene til at spinde endnu mere, og bilen kan skride ud.", "Full throttle makes the wheels spin even more, and the car may slide out.",
    "گاز کامل چرخ‌ها را بیشتر می‌چرخاند و خودرو ممکن است بلغزد."),
  S(False, "Spinder hjulene, er det et tegn på, at jeg skal give mere gas.", "If the wheels spin, it is a sign that I must give more throttle.",
    "اگر چرخ‌ها درجا بچرخند، یعنی باید بیشتر گاز بدهم.",
    "Det er omvendt: giv mindre gas.", "It is the other way round: give less throttle.", "برعکس است: گاز کمتری بدهید."),
)

Q(5286, "7.2", town("""
THE SCENE: a wide town street with two lanes in our direction. The right lane is marked with the large white word «BUS» on the asphalt
and separated from the left lane by an unbroken white line; a city bus drives in it ahead, and a cyclist rides at its right edge. Our
car is in the left lane.
MUST BE CLEARLY VISIBLE: the word BUS in the right lane, the unbroken line, the bus and the cyclist in the bus lane.
MUST NOT APPEAR: other text, signs."""),
  "Den højre vognbane er afmærket med »BUS« og adskilt fra din med en ubrudt linje. Du kører i en almindelig bil. Hvad gælder?",
  "The right lane is marked «BUS» and separated from yours by an unbroken line. You are driving an ordinary car. What applies?",
  "خط راست با «BUS» علامت‌گذاری شده و با یک خط ممتد از خط شما جدا شده است. با یک خودروی معمولی رانندگی می‌کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal blive i den venstre vognbane.", "I must stay in the left lane.", "باید در خط چپ بمانم.",
    "Vognbanen med »BUS« må kun bruges af busser i rutekørsel, og af dem, som symboler i banen ellers giver lov.",
    "The lane marked «BUS» may only be used by buses on regular routes, and by those that other symbols in the lane allow.",
    "خطی که «BUS» دارد فقط برای اتوبوس‌های خطی است و برای کسانی که نمادهای دیگرِ داخل خط اجازه بدهند."),
  S(False, "Jeg må køre i busbanen, når der ikke kommer en bus.", "I may drive in the bus lane when no bus is coming.", "اگر اتوبوسی نیاید، می‌توانم در خط اتوبوس برانم.",
    "Busbanen er forbeholdt busser, også når der ikke er nogen.", "The bus lane is reserved for buses, also when there are none.",
    "خط اتوبوس حتی وقتی اتوبوسی نیست برای اتوبوس‌ها نگه داشته شده است."),
  S(True, "Der kan køre cyklister i busbanen.", "There may be cyclists riding in the bus lane.", "ممکن است دوچرخه‌سوارها در خط اتوبوس برانند.",
    "Cyklister og førere af lille knallert skal bruge en busbane, der ligger til højre.", "Cyclists and riders of small mopeds must use a bus lane on the right.",
    "دوچرخه‌سواران و موپدسواران کوچک باید از خط اتوبوسِ سمت راست استفاده کنند."),
  S(False, "Busbanen må bruges af alle biler uden for myldretiden.", "The bus lane may be used by all cars outside the rush hours.", "خارج از ساعت شلوغی، همه‌ی خودروها می‌توانند از خط اتوبوس استفاده کنند.",
    "Afmærkningen gælder hele døgnet, når der ikke er andet skiltet.", "The marking applies round the clock unless something else is signed.",
    "این علامت‌گذاری در تمام شبانه‌روز برقرار است، مگر تابلویی چیز دیگری بگوید."),
)

Q(5287, "7.2", town("""
THE SCENE: a town street with one lane in each direction and a long row of cars parked along the right kerb. In one of the parked cars
a person sits in the driver's seat; between two cars a small pair of feet is visible on the pavement side.
MUST BE CLEARLY VISIBLE: the row of parked cars, the person in the driver's seat.
MUST NOT APPEAR: signs, text."""),
  "Du kører forbi en lang række parkerede biler. Hvordan placerer du bilen?",
  "You are driving past a long row of parked cars. How do you position the car?",
  "از کنار ردیف بلندی از خودروهای پارک‌شده رد می‌شوید. خودرو را چطور قرار می‌دهید؟",
  S(True, "Jeg holder så meget afstand, at jeg ikke rammer en dør, der pludselig bliver åbnet.", "I keep enough distance not to hit a door that is suddenly opened.",
    "آن‌قدر فاصله می‌گیرم که اگر دری ناگهان باز شد، به آن نخورم.",
    "En bildør kan åbnes uden varsel; hold cirka en dørs bredde fra bilerne, hvis der er plads.",
    "A car door can open without warning; keep about a door's width from the cars if there is room.",
    "در خودرو ممکن است بی‌خبر باز شود؛ اگر جا هست، حدود عرض یک در فاصله بگیرید."),
  S(True, "Jeg holder øje med folk i bilerne og med børn, der kan komme frem mellem dem.", "I watch for people in the cars and for children who may come out between them.",
    "مراقب آدم‌های داخل خودروها و بچه‌هایی هستم که ممکن است از بینشان بیرون بیایند.",
    "De parkerede biler skjuler gående, især små børn.", "The parked cars hide pedestrians, especially small children.", "خودروهای پارک‌شده عابران، به‌خصوص بچه‌های کوچک، را پنهان می‌کنند."),
  S(False, "Jeg kører helt tæt på de parkerede biler, så de modkørende får bedre plads.", "I drive right next to the parked cars so that the oncoming traffic has more room.",
    "کاملاً نزدیک خودروهای پارک‌شده می‌رانم تا ترافیک روبه‌رو جای بیشتری داشته باشد.",
    "Tæt på de parkerede biler har du ingen plads, hvis en dør åbnes eller nogen træder ud.", "Close to the parked cars you have no room if a door opens or someone steps out.",
    "نزدیکِ خودروهای پارک‌شده، اگر دری باز شود یا کسی بیرون بیاید، جایی ندارید."),
)

Q(5288, "7.2", view("""
THE SCENE: a two-lane country road with a broken centre line. Along the right side runs an unbroken white edge line, and outside it a
narrow paved strip about 1 m wide before the grass verge; a pedestrian walks on the strip far ahead.
MUST BE CLEARLY VISIBLE: the unbroken edge line, the narrow strip outside it, the pedestrian on the strip.
MUST NOT APPEAR: signs, text."""),
  "Langs højre side af vejen er der en ubrudt kantlinje og uden for den en smal asfalteret kant. Hvad gælder?",
  "Along the right side of the road there is an unbroken edge line and outside it a narrow paved strip. What applies?",
  "در سمت راست جاده یک خط کناری ممتد هست و بیرون آن یک نوار آسفالتِ باریک. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg kører inden for kantlinjen.", "I drive inside the edge line.", "داخل خط کناری می‌رانم.",
    "Den ubrudte kantlinje afgrænser den del af kørebanen, der er beregnet til motorkøretøjer.", "The unbroken edge line marks off the part of the carriageway meant for motor vehicles.",
    "خط کناری ممتد بخشی از سواره‌رو را که برای وسایل موتوری است مشخص می‌کند."),
  S(True, "Jeg må køre over kantlinjen, når jeg skal standse eller parkere.", "I may cross the edge line when I am going to stop or park.",
    "وقتی می‌خواهم توقف یا پارک کنم، می‌توانم از خط کناری رد شوم.",
    "Motorkøretøjer må krydse kantlinjen for at standse, parkere eller køre ind på eller ud fra vejen.",
    "Motor vehicles may cross the edge line to stop, park, or drive onto or off the road.",
    "وسایل موتوری برای توقف، پارک یا ورود و خروج از جاده می‌توانند از خط کناری رد شوند."),
  S(False, "Jeg må køre uden for kantlinjen, hvis det går hurtigere.", "I may drive outside the edge line if it is quicker.", "اگر سریع‌تر باشد، می‌توانم بیرون خط کناری برانم.",
    "Kanten uden for linjen er ikke til almindelig kørsel med bil.", "The strip outside the line is not for ordinary driving by car.", "نوار بیرون خط برای رانندگی معمولی با خودرو نیست."),
  S(True, "Uden for kantlinjen kan der gå fodgængere og køre cyklister.", "Outside the edge line there may be pedestrians walking and cyclists riding.",
    "بیرون خط کناری ممکن است عابر پیاده و دوچرخه‌سوار باشد.",
    "Kanten uden for linjen bruges ofte af gående og cyklister.", "The strip outside the line is often used by pedestrians and cyclists.", "نوار بیرون خط اغلب محل رفت‌وآمد عابران و دوچرخه‌سواران است."),
)

Q(5289, "7.19", view("""
THE SCENE: a straight country road at night with no street lights; a railway line runs right beside the road on the left, behind a low
fence. An oncoming train with bright headlights approaches on the track. Our high beam lights the road far ahead.
MUST BE CLEARLY VISIBLE: the railway beside the road, the oncoming train's lights, our high beam on the road.
MUST NOT APPEAR: other vehicles, signs, text.""", cond="night, dark, dry road, no street lights"),
  "Du kører med fjernlys på en mørk vej, der løber langs en jernbane. Et tog kommer imod dig på sporet. Hvad gælder?",
  "You are driving with high beam on a dark road running alongside a railway. A train is coming towards you on the track. What applies?",
  "با نور بالا در جاده‌ای تاریک کنار راه‌آهن رانندگی می‌کنید. قطاری روی ریل از روبه‌رو می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg blænder ned, så lokomotivføreren ikke bliver blændet.", "I dip my lights so that the train driver is not dazzled.", "نور را پایین می‌آورم تا راننده‌ی قطار خیره نشود.",
    "Fjernlys må ikke bruges ved møde med tog, der kører langs vejen, hvis det kan blænde.", "High beam must not be used when meeting a train running alongside the road if it may dazzle.",
    "هنگام روبه‌رو شدن با قطاری که کنار جاده حرکت می‌کند، اگر خطر خیرگی باشد نباید نور بالا زد."),
  S(False, "Jeg må beholde fjernlyset, fordi toget ikke kører på vejen.", "I may keep the high beam because the train is not on the road.", "می‌توانم نور بالا را نگه دارم، چون قطار روی جاده نیست.",
    "Reglen gælder også tog langs vejen.", "The rule also covers trains alongside the road.", "این قاعده قطارهای کنار جاده را هم شامل می‌شود."),
  S(False, "Jeg slukker alt lyset, indtil toget er kørt forbi.", "I switch off all my lights until the train has passed.", "تا رد شدن قطار همه‌ی چراغ‌ها را خاموش می‌کنم.",
    "Du skal bruge nærlys; i mørke skal de påbudte lygter være tændt.", "You must use dipped beam; in the dark the required lights must be on.",
    "باید از نور پایین استفاده کنید؛ در تاریکی چراغ‌های الزامی باید روشن باشند."),
  S(False, "Jeg tænder tågelygterne i stedet for nærlyset.", "I switch on the fog lights instead of the dipped beam.", "به جای نور پایین، چراغ مه‌شکن را روشن می‌کنم.",
    "Tågelygter må kun bruges i tåge og kraftig nedbør.", "Fog lights may only be used in fog and heavy precipitation.", "چراغ مه‌شکن فقط در مه و بارش شدید مجاز است."),
)

Q(5290, "7.19", view("""
THE SCENE: a country road in the middle of the day in thick fog and rain; visibility is short. About 60 m ahead a grey car is hard to
make out because its rear lights are not lit.
MUST BE CLEARLY VISIBLE: the fog and rain, the grey car ahead without rear lights.
MUST NOT APPEAR: signs, text.""", cond="daytime, thick fog and rain, wet road, short visibility"),
  "Det er midt på dagen, men tåge og regn gør det svært at se. Hvad gælder om lyset?",
  "It is the middle of the day, but fog and rain make it hard to see. What applies to the lights?",
  "وسط روز است، ولی مه و باران دیدن را سخت کرده‌اند. درباره‌ی چراغ‌ها چه قاعده‌ای برقرار است؟",
  S(True, "Det er lygtetændingstid, så de påbudte lygter skal være tændt.", "It is lighting-up time, so the required lights must be on.",
    "اکنون «زمان روشن کردن چراغ‌ها» است و چراغ‌های الزامی باید روشن باشند.",
    "Lygtetændingstid er også, når tåge, regn eller lignende gør lygterne nødvendige for at blive set eller for at se.",
    "Lighting-up time also covers times when fog, rain or the like make the lights necessary to be seen or to see.",
    "«زمان روشن کردن چراغ‌ها» شامل وقتی هم می‌شود که مه، باران و مانند آن چراغ را برای دیده شدن یا دیدن لازم کنند."),
  S(True, "Jeg tænder nærlyset, så baglygterne også lyser.", "I switch on the dipped beam so that the rear lights are lit too.", "نور پایین را روشن می‌کنم تا چراغ‌های عقب هم روشن شوند.",
    "Kørelys alene tænder ofte ikke baglygterne, og så kan bilen være svær at se bagfra.", "Daytime running lights alone often do not light the rear lights, and then the car can be hard to see from behind.",
    "چراغ روز به‌تنهایی اغلب چراغ‌های عقب را روشن نمی‌کند و خودرو از پشت سخت دیده می‌شود."),
  S(False, "Kørelys er altid nok om dagen, uanset vejret.", "Daytime running lights are always enough by day, whatever the weather.", "روز، چراغ روز همیشه کافی است، هوا هر طور که باشد.",
    "Når sigtbarheden er dårlig, skal de påbudte lygter være tændt.", "When visibility is poor, the required lights must be on.", "وقتی دید کم است، چراغ‌های الزامی باید روشن باشند."),
  S(True, "Er sigtbarheden meget nedsat af tåge, må jeg bruge tågelygterne.", "If visibility is much reduced by fog, I may use the fog lights.",
    "اگر مه دید را خیلی کم کرده باشد، می‌توانم از چراغ مه‌شکن استفاده کنم.",
    "Tågelygter må bruges i tåge og under kraftig nedbør.", "Fog lights may be used in fog and in heavy precipitation.", "چراغ مه‌شکن در مه و بارش شدید مجاز است."),
)

Q(5291, "7.19", view("""
THE SCENE: a dark country road at night. In the interior rear-view mirror at the top of the picture, the very bright headlights of a car
close behind glare and dazzle; the road ahead is lit only by our dipped beam.
MUST BE CLEARLY VISIBLE: the dazzling headlights in the rear-view mirror.
MUST NOT APPEAR: signs, text.""", cond="night, dark, dry road"),
  "Det er mørkt, og bilen bag dig kører tæt på med fjernlys, så du bliver blændet i spejlet. Hvad gælder?",
  "It is dark, and the car behind you is close with its high beam on, so you are dazzled in the mirror. What applies?",
  "هوا تاریک است و خودروی پشتی با نور بالا نزدیک شما می‌آید و در آینه خیره‌تان می‌کند. چه قاعده‌ای برقرار است؟",
  S(True, "Føreren bag mig må ikke bruge fjernlys, når det kan blænde mig.", "The driver behind me must not use high beam when it can dazzle me.",
    "راننده‌ی پشتی وقتی ممکن است مرا خیره کند، نباید نور بالا بزند.",
    "Fjernlys må ikke bruges bag et andet køretøj, hvis føreren foran kan blændes.", "High beam must not be used behind another vehicle if its driver can be dazzled.",
    "پشت وسیله‌ی دیگر، اگر راننده‌ی جلویی خیره شود، نباید نور بالا زد."),
  S(True, "Jeg kan vippe bakspejlet til nattestilling.", "I can tilt the rear-view mirror to its night setting.", "می‌توانم آینه‌ی وسط را روی حالت شب بگذارم.",
    "Nattestillingen dæmper lyset fra bilen bag dig.", "The night setting dims the light from the car behind you.", "حالت شب نور خودروی پشتی را کم می‌کند."),
  S(False, "Jeg bremser hårdt, så føreren lærer at blænde ned.", "I brake hard so that the driver learns to dip.", "محکم ترمز می‌کنم تا راننده یاد بگیرد نورش را پایین بیاورد.",
    "Du må ikke bremse pludseligt uden grund; det kan give en påkørsel bagfra.", "You must not brake suddenly without reason; it can cause a rear-end collision.",
    "نباید بی‌دلیل ناگهان ترمز کنید؛ ممکن است از پشت با شما تصادف شود."),
  S(False, "Jeg tænder tågebaglygten, så føreren bliver blændet tilbage.", "I switch on the rear fog light so that the driver is dazzled back.",
    "چراغ مه‌شکن عقب را روشن می‌کنم تا راننده هم خیره شود.",
    "Tågebaglygten må kun bruges i tåge og kraftig nedbør, og lygter må ikke bruges, så andre blændes.",
    "The rear fog light may only be used in fog and heavy precipitation, and lights must not be used so that others are dazzled.",
    "چراغ مه‌شکن عقب فقط در مه و بارش شدید مجاز است و نباید چراغ را طوری به کار برد که دیگران خیره شوند."),
)

Q(5292, "7.16", picture("""
An illustration of a motorway: a car with its hazard lights flashing stands on the hard shoulder as far to the right as possible. Behind
the crash barrier, on the grass, its driver in a high-visibility vest stands with a phone in his hand; a warning triangle stands on the
hard shoulder far behind the car. Traffic passes in the lanes.
MUST BE CLEARLY VISIBLE: the car on the hard shoulder with hazard lights, the driver behind the crash barrier, the warning triangle far behind.
MUST NOT APPEAR: text, brand names."""),
  "Din bil får motorstop på motorvejen. Hvad gør du?",
  "Your car breaks down on the motorway. What do you do?",
  "خودروی شما در آزادراه خاموش می‌شود و از کار می‌افتد. چه می‌کنید؟",
  S(True, "Jeg får så vidt muligt bilen ud af kørebanen, fx ind i nødsporet, og tænder havariblinket.",
    "I get the car off the carriageway as far as possible, for example onto the hard shoulder, and switch on the hazard lights.",
    "تا جای ممکن خودرو را از سواره‌رو بیرون می‌برم، مثلاً به خط اضطراری، و چراغ خطر را روشن می‌کنم.",
    "Et køretøj, der må standse på motorvejen, skal så vidt muligt placeres uden for kørebanen og fjernes snarest muligt.",
    "A vehicle that has to stop on the motorway must be placed off the carriageway as far as possible and removed as soon as possible.",
    "وسیله‌ای که مجبور به توقف در آزادراه شود، باید تا جای ممکن بیرون از سواره‌رو قرار بگیرد و هرچه زودتر برده شود."),
  S(True, "Står bilen, hvor den kan være til fare, advarer jeg de andre, fx med en advarselstrekant langt bag bilen.",
    "If the car stands where it can be a danger, I warn the others, for example with a warning triangle well behind the car.",
    "اگر خودرو جایی ایستاده که ممکن است خطرناک باشد، به دیگران هشدار می‌دهم، مثلاً با مثلث هشدار در فاصله‌ی زیادی پشت خودرو.",
    "Andre trafikanter skal advares i god tid; på motorvej sættes trekanten omkring 100 m bag bilen.",
    "Other road users must be warned in good time; on the motorway the triangle is put about 100 m behind the car.",
    "باید به موقع به دیگران هشدار داد؛ در آزادراه مثلث را حدود ۱۰۰ متر پشت خودرو می‌گذارند."),
  S(True, "Jeg og passagererne stiger ud i højre side og venter bag autoværnet.", "The passengers and I get out on the right side and wait behind the crash barrier.",
    "من و سرنشینان از سمت راست پیاده می‌شویم و پشت گاردریل منتظر می‌مانیم.",
    "I nødsporet er I tæt på trafikken; bag autoværnet er I i sikkerhed.", "On the hard shoulder you are close to the traffic; behind the crash barrier you are safe.",
    "در خط اضطراری به ترافیک نزدیکید؛ پشت گاردریل در امانید."),
  S(False, "Jeg reparerer bilen i nødsporet, så længe det tager.", "I repair the car on the hard shoulder for as long as it takes.", "هر قدر طول بکشد، خودرو را در خط اضطراری تعمیر می‌کنم.",
    "Reparation på stedet må kun ske, hvis den er nødvendig for at få bilen hurtigt væk fra motorvejen.",
    "Repairs on the spot may only be done if they are needed to get the car off the motorway quickly.",
    "تعمیر در محل فقط وقتی مجاز است که برای بردن سریع خودرو از آزادراه لازم باشد."),
)

Q(5293, "7.16", view("""
THE SCENE: a motorway with two lanes in our direction. At the right verge stands a blue rectangular sign showing a white lay-by bulging
out from the road edge, with the letters «SOS» beside it (the Danish emergency lay-by sign). A short lay-by with an orange emergency
telephone post lies a little further on.
MUST BE CLEARLY VISIBLE: the blue sign with the lay-by symbol and SOS, the lay-by and the telephone post.
MUST NOT APPEAR: other signs, other text."""),
  "På motorvejen kører du forbi denne tavle. Hvad betyder den?",
  "On the motorway you pass this sign. What does it mean?",
  "در آزادراه از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Der kommer en nødplads, hvor jeg kan standse i en nødsituation.", "An emergency lay-by is coming where I can stop in an emergency.",
    "جلوتر یک جای توقف اضطراری هست که در شرایط اضطراری می‌توانم آنجا بایستم.",
    "Tavlen angiver en nødplads, der kan bruges ved nødstop.", "The sign shows an emergency lay-by that can be used for emergency stops.",
    "این تابلو جای توقف اضطراری را نشان می‌دهد که برای توقف اضطراری است."),
  S(False, "Det er en rasteplads, hvor jeg kan holde pause og spise.", "It is a rest area where I can take a break and eat.", "این یک استراحتگاه است که می‌توانم آنجا استراحت کنم و غذا بخورم.",
    "Nødpladsen er kun til nødsituationer; til pauser bruger du en rasteplads.", "The emergency lay-by is only for emergencies; for breaks you use a rest area.",
    "جای توقف اضطراری فقط برای اضطرار است؛ برای استراحت از استراحتگاه استفاده کنید."),
  S(False, "Jeg må holde der for at ringe til en ven.", "I may stop there to call a friend.", "می‌توانم آنجا بایستم و به دوستم زنگ بزنم.",
    "På motorvejen må du kun standse på parkerings- og rastepladser, ved en nødtelefon for at bruge den, eller når du er tvunget til det.",
    "On the motorway you may only stop at car parks and rest areas, at an emergency phone to use it, or when you are forced to.",
    "در آزادراه فقط در پارکینگ‌ها و استراحتگاه‌ها، کنار تلفن اضطراری برای استفاده از آن، یا وقتی ناچار باشید می‌توانید بایستید."),
)

Q(5294, "6.2", view("""
THE SCENE: a motorway with two lanes in our direction. We drive in the LEFT lane although the right lane is free for a long way; in
the interior rear-view mirror at the top of the picture, a car approaches fast from behind in our lane.
MUST BE CLEARLY VISIBLE: the free right lane, the car approaching in the rear-view mirror.
MUST NOT APPEAR: signs, text."""),
  "Du kører i venstre vognbane på motorvejen, selv om der er plads i højre. En bil kommer hurtigt op bag dig. Hvordan forholder du dig?",
  "You are driving in the left lane on the motorway although there is room in the right one. A car is coming up fast behind you. What do you do?",
  "در آزادراه در خط چپ می‌رانید، با این‌که خط راست جا دارد. خودرویی با سرعت از پشت به شما نزدیک می‌شود. چه می‌کنید؟",
  S(True, "Jeg skifter til højre vognbane, så snart det kan ske uden fare.", "I move into the right lane as soon as it can be done safely.",
    "به محض این‌که بی‌خطر ممکن باشد، به خط راست می‌روم.",
    "Du skal holde så langt til højre som muligt; venstre vognbane er til overhaling.", "You must keep as far to the right as possible; the left lane is for overtaking.",
    "باید تا جای ممکن سمت راست بمانید؛ خط چپ برای سبقت است."),
  S(False, "Jeg bliver i venstre vognbane, fordi jeg holder hastighedsgrænsen.", "I stay in the left lane because I am keeping to the speed limit.",
    "در خط چپ می‌مانم، چون حد سرعت را رعایت می‌کنم.",
    "Du skal holde til højre, også når du kører lovligt hurtigt.", "You must keep right, also when you are driving at a lawful speed.",
    "حتی وقتی با سرعت مجاز می‌رانید، باید سمت راست بمانید."),
  S(False, "Jeg bremser lidt, så bilen bag mig holder større afstand.", "I brake a little so that the car behind me keeps a greater distance.",
    "کمی ترمز می‌کنم تا خودروی پشتی فاصله‌ی بیشتری بگیرد.",
    "Du må ikke bremse pludseligt uden grund; det kan give en påkørsel bagfra.", "You must not brake suddenly without reason; it can cause a rear-end collision.",
    "نباید بی‌دلیل ناگهان ترمز کنید؛ ممکن است از پشت با شما تصادف شود."),
  S(False, "Jeg bliver i venstre vognbane, så bilen kan overhale mig i højre side.", "I stay in the left lane so that the car can overtake me on the right.",
    "در خط چپ می‌مانم تا آن خودرو بتواند از سمت راستم سبقت بگیرد.",
    "Overhaling skal ske til venstre; giv plads ved at køre til højre.", "Overtaking must be done on the left; make room by moving to the right.",
    "سبقت باید از چپ باشد؛ با رفتن به راست جا باز کنید."),
)

Q(5295, "5.2", view("""
THE SCENE: a motorway in very heavy rain; water stands in the wheel ruts of the right lane, and the cars ahead throw up spray.
MUST BE CLEARLY VISIBLE: the water in the wheel ruts, the spray from the cars ahead.
MUST NOT APPEAR: signs, text.""", cond="very heavy rain, standing water on the road, spray"),
  "Det regner kraftigt, og der står vand i hjulsporene. Hvad skal du være opmærksom på?",
  "It is raining heavily and water is standing in the wheel ruts. What must you be aware of?",
  "باران شدید می‌بارد و در شیارهای چرخ آب جمع شده است. به چه چیزی باید توجه کنید؟",
  S(True, "Bilen kan begynde at flyde på vandet, så jeg ikke kan styre eller bremse.", "The car may start to float on the water so that I cannot steer or brake.",
    "خودرو ممکن است روی آب سُر بخورد و نتوانم فرمان بدهم یا ترمز کنم.",
    "Ved vandplaning kan dækkene ikke nå at fjerne vandet og mister kontakten med vejen.",
    "In aquaplaning the tyres cannot clear the water fast enough and lose contact with the road.",
    "در «آکواپلنینگ» تایرها نمی‌توانند آب را به‌موقع کنار بزنند و تماسشان با جاده قطع می‌شود."),
  S(True, "Jeg sænker farten, så dækkene bedre kan fjerne vandet.", "I slow down so that the tyres can clear the water better.", "سرعتم را کم می‌کنم تا تایرها بهتر آب را کنار بزنند.",
    "Jo højere fart, jo større risiko for vandplaning.", "The higher the speed, the greater the risk of aquaplaning.", "هرچه سرعت بیشتر باشد، خطر آکواپلنینگ بیشتر است."),
  S(True, "Mærker jeg, at rattet bliver let, slipper jeg speederen og holder rattet lige.", "If I feel the steering go light, I take my foot off the accelerator and hold the wheel straight.",
    "اگر حس کنم فرمان سبک شده، پایم را از پدال گاز برمی‌دارم و فرمان را صاف نگه می‌دارم.",
    "Så kan dækkene få fat igen; en hård opbremsning eller et ryk i rattet kan få bilen til at skride.",
    "Then the tyres can grip again; hard braking or a jerk of the wheel can make the car skid.",
    "این‌طور تایرها دوباره می‌گیرند؛ ترمز شدید یا چرخاندن ناگهانی فرمان ممکن است خودرو را بلغزاند."),
  S(False, "Slidte dæk har ingen betydning, når vandet er lavt.", "Worn tyres do not matter when the water is shallow.", "وقتی آب کم‌عمق است، تایر فرسوده اهمیتی ندارد.",
    "Jo mindre mønster, jo dårligere fjerner dækket vandet.", "The less tread, the worse the tyre clears the water.", "هرچه آج کمتر باشد، تایر آب را بدتر کنار می‌زند."),
)

Q(5296, "5.2", view("""
THE SCENE: a long high bridge over the sea in strong wind from the side; a windsock at the bridge's edge stands straight out, and the
water is rough with white crests. A tall white van ahead is leaning a little in the wind.
MUST BE CLEARLY VISIBLE: the bridge, the windsock standing out, the tall van ahead.
MUST NOT APPEAR: signs, text.""", cond="daylight, strong side wind, dry road, good visibility"),
  "Du kører over en lang bro i kraftig blæst fra siden. Hvordan forholder du dig?",
  "You are driving over a long bridge in a strong side wind. What do you do?",
  "در باد شدیدِ جانبی از روی یک پل طولانی می‌گذرید. چه می‌کنید؟",
  S(True, "Jeg sænker farten og holder godt fast i rattet.", "I slow down and hold the steering wheel firmly.", "سرعتم را کم می‌کنم و فرمان را محکم نگه می‌دارم.",
    "Et vindstød kan skubbe bilen til siden.", "A gust can push the car sideways.", "تندباد ممکن است خودرو را به کنار هل بدهد."),
  S(True, "Jeg er forberedt på et vindstød, når jeg kommer ud af læ, fx forbi en lastbil eller for enden af broen.",
    "I am prepared for a gust when I come out of shelter, for example past a lorry or at the end of the bridge.",
    "وقتی از پناه بیرون می‌آیم، مثلاً پس از رد شدن از کنار کامیون یا در انتهای پل، آماده‌ی تندباد هستم.",
    "Vinden rammer pludseligt, når læet forsvinder.", "The wind hits suddenly when the shelter disappears.", "وقتی پناه از بین برود، باد ناگهان می‌وزد."),
  S(True, "En høj vogn foran mig kan blive skubbet til siden, så jeg holder god afstand til den.", "A tall vehicle in front of me may be pushed sideways, so I keep a good distance to it.",
    "وسیله‌ی بلند جلوی من ممکن است به کنار رانده شود، پس فاصله‌ی زیادی با آن نگه می‌دارم.",
    "Høje køretøjer fanger mere vind.", "Tall vehicles catch more wind.", "وسایل بلند باد بیشتری می‌گیرند."),
  S(True, "Med tagboks eller trailer bliver min bil mere følsom for sidevind.", "With a roof box or a trailer my car becomes more sensitive to side wind.",
    "با باکس سقفی یا تریلر، خودروی من در برابر باد جانبی حساس‌تر می‌شود.",
    "Jo større flade vinden kan tage fat i, jo mere skubbes bilen.", "The bigger the surface the wind can catch, the more the car is pushed.",
    "هرچه سطحی که باد به آن می‌خورد بزرگ‌تر باشد، خودرو بیشتر رانده می‌شود."),
)

Q(5297, "7.8", town("""
THE SCENE: a town street; ahead a queue of cars stands at a red traffic light. We are coming to a stop behind the last car of the queue.
MUST BE CLEARLY VISIBLE: the queue, the last car's rear, the red light far ahead.
MUST NOT APPEAR: signs, text."""),
  "Du standser bag en bil i en kø. Hvor langt bag den holder du?",
  "You stop behind a car in a queue. How far behind it do you stand?",
  "در صف پشت خودرویی می‌ایستید. چقدر عقب‌تر از آن می‌ایستید؟",
  S(True, "Så langt, at jeg kan se dens baghjul og lidt af asfalten bag dem.", "Far enough back that I can see its rear wheels and a little of the road behind them.",
    "آن‌قدر عقب که چرخ‌های عقبش و کمی از آسفالت پشت آن‌ها را ببینم.",
    "Det er en god tommelfingerregel for afstanden, når du holder i kø.", "That is a good rule of thumb for the distance when you are standing in a queue.",
    "این یک قاعده‌ی سرانگشتی خوب برای فاصله در صف است."),
  S(True, "Så jeg kan køre uden om den, hvis den går i stå.", "So that I can drive round it if it breaks down.", "به اندازه‌ای که اگر خاموش شد، بتوانم از کنارش رد شوم.",
    "Med lidt plads foran dig kan du komme fri, og en påkørsel bagfra skubber dig ikke ind i den.",
    "With a little room in front of you, you can get clear, and a shunt from behind does not push you into it.",
    "با کمی جا در جلو می‌توانید خارج شوید و اگر از پشت به شما بزنند، به آن خودرو کوبیده نمی‌شوید."),
  S(False, "Helt tæt, så der kan være flere biler i køen.", "Right up close, so that there is room for more cars in the queue.", "کاملاً نزدیک، تا خودروهای بیشتری در صف جا شوند.",
    "Helt tæt på har du ingen plads til at komme fri eller undgå et uheld.", "Right up close you have no room to get clear or to avoid an accident.",
    "اگر خیلی نزدیک بایستید، جایی برای خارج شدن یا اجتناب از تصادف ندارید."),
)

Q(5298, "7.8", view("""
THE SCENE: a two-lane country road; we drive close behind a big lorry that fills most of the view ahead, so the road beyond it cannot be
seen; the lorry's large side mirrors are visible.
MUST BE CLEARLY VISIBLE: the lorry blocking the view, its side mirrors.
MUST NOT APPEAR: signs, text."""),
  "Du kører bag en stor lastbil på landevejen. Hvordan forholder du dig?",
  "You are driving behind a big lorry on a country road. What do you do?",
  "در جاده‌ی بیرون شهر پشت یک کامیون بزرگ رانندگی می‌کنید. چه می‌کنید؟",
  S(True, "Jeg holder god afstand, så jeg kan se forbi lastbilen og se, hvad der sker foran.", "I keep a good distance so that I can see past the lorry and what is happening ahead.",
    "فاصله‌ی زیادی نگه می‌دارم تا بتوانم از کنار کامیون جلوتر را ببینم.",
    "Tæt bag lastbilen skjuler den alt foran dig.", "Close behind the lorry, it hides everything in front of you.", "پشتِ نزدیکِ کامیون، همه‌ی جلوی شما پنهان می‌ماند."),
  S(True, "Kan jeg ikke se lastbilens spejle, kan føreren heller ikke se mig.", "If I cannot see the lorry's mirrors, the driver cannot see me either.",
    "اگر آینه‌های کامیون را نبینم، راننده هم مرا نمی‌بیند.",
    "Holder du afstand, ser lastbilens fører dig i sine spejle.", "If you keep your distance, the lorry driver sees you in the mirrors.",
    "اگر فاصله بگیرید، راننده‌ی کامیون شما را در آینه‌هایش می‌بیند."),
  S(False, "Jeg kører tæt bag den, så jeg er klar til at overhale med det samme.", "I drive close behind it so that I am ready to overtake at once.",
    "نزدیکش می‌رانم تا بلافاصله آماده‌ی سبقت باشم.",
    "Tæt bag lastbilen kan du netop ikke se, om vejen er fri til overhaling.", "Close behind the lorry you precisely cannot see whether the road is clear for overtaking.",
    "پشتِ نزدیکِ کامیون دقیقاً نمی‌بینید که جاده برای سبقت خالی است یا نه."),
  S(False, "Jeg kører tæt bag den for at spare brændstof i læet.", "I drive close behind it to save fuel in its slipstream.", "نزدیکش می‌رانم تا در پناه آن سوخت کمتری مصرف کنم.",
    "Afstanden skal være så stor, at du kan standse, hvis lastbilen bremser.", "The distance must be large enough for you to stop if the lorry brakes.",
    "فاصله باید آن‌قدر باشد که اگر کامیون ترمز کرد، بتوانید بایستید."),
)

Q(5299, "7.5", above("""
THE SCENE: a car park seen from above with marked parking bays.
VEHICLES (colour code used strictly): a RED car (ours) about to reverse into a free bay (a DASHED ORANGE arrow backwards into the bay);
a child on a kick scooter passes on the driving lane just behind the red car.
MUST NOT APPEAR: text, signs."""),
  "Du vil bakke ind i en parkeringsbås. Bilen har bakkamera. Hvad gælder?",
  "You want to reverse into a parking bay. The car has a reversing camera. What applies?",
  "می‌خواهید با دنده‌عقب در یک جای پارک بروید. خودرو دوربین دنده‌عقب دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg ser mig også selv for og stoler ikke kun på kameraet.", "I look around myself too and do not rely only on the camera.",
    "خودم هم اطراف را نگاه می‌کنم و فقط به دوربین تکیه نمی‌کنم.",
    "Kameraet viser ikke alt; et barn kan være uden for billedet.", "The camera does not show everything; a child may be outside the picture.",
    "دوربین همه چیز را نشان نمی‌دهد؛ ممکن است کودکی بیرون از تصویر باشد."),
  S(True, "Jeg skal sikre mig, at bakningen kan ske uden fare eller ulempe for andre.", "I must make sure the reversing can be done without danger or inconvenience to others.",
    "باید مطمئن شوم دنده‌عقب رفتن برای دیگران خطر یا مزاحمتی ندارد.",
    "Den, der bakker, har ansvaret for, at det sker uden fare.", "Whoever reverses is responsible for doing it safely.", "کسی که دنده‌عقب می‌رود، مسئول بی‌خطر بودن آن است."),
  S(True, "Mens jeg bakker, behøver jeg ikke have sikkerhedsselen på.", "While I am reversing, I need not wear my seat belt.", "هنگام دنده‌عقب رفتن لازم نیست کمربند ایمنی بسته باشم.",
    "Pligten til at bruge sikkerhedssele gælder ikke ved bakning.", "The duty to wear a seat belt does not apply when reversing.", "الزام بستن کمربند ایمنی هنگام دنده‌عقب برقرار نیست."),
  S(False, "Gående skal holde tilbage for mig, når baklygterne lyser.", "Pedestrians must give way to me when my reversing lights are on.",
    "وقتی چراغ دنده‌عقبم روشن است، عابران باید برایم صبر کنند.",
    "Baklygterne advarer kun; det er dig, der skal holde tilbage.", "The reversing lights only warn; it is you who must give way.", "چراغ دنده‌عقب فقط هشدار است؛ این شما هستید که باید صبر کنید."),
)

Q(5300, "5.1", town("""
THE SCENE: a residential street with houses and gardens. At the right stands a red-bordered triangular warning sign with a white field
showing a black hump on a road line (the Danish speed-hump sign). About 40 m ahead a raised speed hump crosses the street, marked with
white triangles.
MUST BE CLEARLY VISIBLE: the triangular sign with the hump symbol, the speed hump ahead.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle i et boligområde. Hvad betyder den?",
  "You pass this sign in a residential area. What does it mean?",
  "در یک محله‌ی مسکونی از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Der er bump på vejen længere fremme, som skal få trafikken til at køre langsomt.", "There are humps on the road further ahead, meant to make the traffic go slowly.",
    "کمی جلوتر روی جاده سرعت‌گیر هست که برای کند کردن ترافیک است.",
    "Tavlen angiver hastighedsdæmpende bump på vejen.", "The sign shows speed-reducing humps on the road.", "این تابلو سرعت‌گیرهای روی جاده را نشان می‌دهد."),
  S(False, "Jeg kan køre over bumpene i samme fart, når min bil er ny.", "I can drive over the humps at the same speed when my car is new.",
    "اگر خودرویم نو باشد، می‌توانم با همان سرعت از روی سرعت‌گیرها رد شوم.",
    "Bumpene er lavet til lav fart; i høj fart kan du miste herredømmet og skade bilen.", "The humps are made for low speed; at high speed you may lose control and damage the car.",
    "سرعت‌گیرها برای سرعت کم ساخته شده‌اند؛ با سرعت زیاد ممکن است کنترل را از دست بدهید و خودرو آسیب ببیند."),
  S(False, "Tavlen betyder, at vejen er ujævn på grund af vejarbejde.", "The sign means that the road is uneven because of road works.",
    "این تابلو یعنی جاده به خاطر کار راهسازی ناهموار است.",
    "Vejarbejde har sin egen advarselstavle.", "Road works have their own warning sign.", "کار راهسازی تابلوی هشدار خودش را دارد."),
  S(False, "Bumpene er kun for lastbiler og busser.", "The humps are only for lorries and buses.", "سرعت‌گیرها فقط برای کامیون و اتوبوس است.",
    "Bumpene gælder al trafik på vejen.", "The humps are for all traffic on the road.", "سرعت‌گیرها برای همه‌ی ترافیک جاده است."),
)
