# «آزمون جدید», batch 10 (5901–6000), part d: meeting (7.7), placement (7.2), road users beside you (7.6), moving off (7.1), lane
# changes (7.4), motorways (7.16), turning round (7.5), braking (7.3), distance (7.8), lights (7.19), signs (6.1), straight on at
# junctions (7.12) and left turns (7.14).
# Rules: Færdselsloven §§ 9 stk. 1 and stk. 2 nr. 3 (stop after an accident; give name and address on request), 14 stk. 1 and 5 (use
# the lane meant for your vehicle; only vehicles slower than the sign may use a crawler lane), 15 stk. 1 and 3, 16 stk. 3 (a left turn
# from close to the middle), 18 stk. 1–2 (turn round forwards to the left; make sure that moving off and lane changes can be done
# without danger), 21 stk. 1 and 4, 26 stk. 1 (special care at junctions, also on green) and stk. 6 (no left turn until it causes no
# inconvenience to oncoming traffic), 31 stk. 2 (move a vehicle stopped after an accident as soon as possible), 32 stk. 1–2 (the horn
# only to avert danger; signal before moving off, turning round and lane changes on a motorway), 33 stk. 3 nr. 1–2 and stk. 5 (main
# beam; auxiliary lamps only for their purpose), 46 stk. 2 (on a motorway no stopping outside the designated parking and rest areas),
# 55 a (no hand-held phone); BEK 425/2023: C 19 (no entry), C 32 (the total weight of a combination), E 37 (crawler lane), N 42 (edge
# marker plates are passed on the side the stripes slope down towards), N 44,2 and N 46 (cones and marker lamps mark off road works),
# Q 46 (an unbroken edge line may only be crossed to stop, park or drive onto or off the road).
# Guidance (not law): a motorcyclist leaning into a bend may reach over the centre line; a lorry that has stopped can hide road users
# behind it; oncoming drivers facing a low sun may not see you; a small child close to a car can be hidden from the driver; ABS keeps
# the car steerable while braking hard; wet leaves make the road slippery; only rest helps against tiredness; a green light does not
# protect you from a driver running a red light.
from nq import Q, S, above, picture, town, view

Q(5976, "7.7", view("""
THE SCENE: a two-lane country road with a centre line, curving to the RIGHT ahead of us; in the bend an oncoming motorcycle leans over
steeply towards the centre line (for the rider it is a left-hand bend), so that the rider's helmet and shoulders are above the centre
line, although the wheels are in his own lane.
MUST BE CLEARLY VISIBLE: the bend to the right, the leaning motorcyclist with helmet and shoulders above the centre line.
MUST NOT APPEAR: signs, text, readable number plates."""),
  "I et sving til højre kommer en motorcykel imod dig. Motorcyklisten lægger sig så meget ned i svinget, at hjelmen og skuldrene er inde "
  "over midterlinjen. Hvordan forholder du dig?",
  "In a bend to the right a motorcycle comes towards you. The rider leans so far into the bend that his helmet and shoulders are over "
  "the centre line. What do you do?",
  "در یک پیچ به راست، موتورسیکلتی از روبه‌رو می‌آید. موتورسوار آن‌قدر در پیچ خم شده که کلاه ایمنی و شانه‌هایش از روی خط وسط رد شده‌اند. "
  "چه می‌کنید؟",
  S(True, "Jeg holder godt til højre i min vognbane.", "I keep well to the right in my lane.", "در خط خودم کاملاً سمت راست می‌مانم.",
    "Selv om hjulene er i den anden side, kan motorcyklistens krop række ind i din vognbane.",
    "Even though the wheels are on the other side, the rider's body can reach into your lane.",
    "با این‌که چرخ‌ها در سمت دیگرند، بدن موتورسوار ممکن است وارد خط شما شود."),
  S(False, "Motorcyklen fylder så lidt, at jeg kan køre helt ude ved midterlinjen.",
    "The motorcycle takes up so little room that I can drive right out by the centre line.",
    "موتورسیکلت آن‌قدر جای کمی می‌گیرد که می‌توانم درست کنار خط وسط برانم.",
    "En motorcykel, der lægger sig ned i et sving, fylder mere i bredden, end man tror.",
    "A motorcycle leaning into a bend takes up more width than you might think.",
    "موتورسیکلتی که در پیچ خم می‌شود، بیش از آنچه فکر می‌کنید عرض جاده را می‌گیرد."),
  S(False, "Jeg skærer svinget, så jeg kommer hurtigere igennem.", "I cut the bend so that I get through it faster.",
    "پیچ را میان‌بر می‌زنم تا سریع‌تر رد شوم.",
    "Så kommer du ud mod midten af vejen, netop hvor motorcyklisten er.", "Then you move out towards the middle of the road, exactly where the "
    "motorcyclist is.", "در این صورت به سمت وسط جاده می‌روید، درست همان جایی که موتورسوار است."),
  S(False, "Motorcyklisten skal holde sig helt i sin egen side, så jeg behøver ikke gøre noget.",
    "The motorcyclist must keep entirely to his own side, so I need not do anything.",
    "موتورسوار باید کاملاً در سمت خودش بماند، پس لازم نیست کاری بکنم.",
    "Du skal give den modkørende den plads, han har brug for, og være klar til at reagere.",
    "You must give the oncoming rider the room he needs and be ready to react.",
    "باید جای لازم را به موتورسوارِ روبه‌رو بدهید و آماده‌ی واکنش باشید."),
)

Q(5977, "7.7", view("""
THE SCENE: a narrow country road without a centre line, with grass verges and a ditch on the right; we tow a caravan that is wider
than our car (its wide front corner is visible in the right door mirror at the right edge of the picture); an oncoming car approaches
a short distance ahead.
MUST BE CLEARLY VISIBLE: the narrow road, the wide caravan in the right door mirror, the oncoming car.
MUST NOT APPEAR: signs, text, readable number plates."""),
  "Du trækker en campingvogn, der er bredere end bilen, ad en smal vej. En bil kommer imod dig. Hvordan forholder du dig?",
  "You are towing a caravan that is wider than the car along a narrow road. A car comes towards you. What do you do?",
  "در جاده‌ای باریک یک کاروان را که از خودرو پهن‌تر است می‌کشید. خودرویی از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg sænker farten og holder så langt til højre, som det er forsvarligt.", "I slow down and keep as far to the right as is safe.",
    "سرعتم را کم می‌کنم و تا جایی که ایمن است به راست می‌روم.",
    "Kørende skal holde så langt til højre som muligt, og på en smal vej skal farten passe til mødet.",
    "Drivers must keep as far to the right as possible, and on a narrow road the speed must suit the meeting.",
    "رانندگان باید تا حد امکان سمت راست بمانند و در جاده‌ی باریک سرعت باید با عبور از کنار هم جور باشد."),
  S(True, "Jeg husker, at campingvognen fylder mere i bredden end bilen.", "I remember that the caravan is wider than the car.",
    "یادم هست که کاروان از خودرو پهن‌تر است.",
    "Det er vogntogets bredeste del, der afgør, hvor meget plads du har brug for.",
    "It is the widest part of the combination that decides how much room you need.",
    "پهن‌ترین بخشِ مجموعه‌ی خودرو و کاروان تعیین می‌کند به چه مقدار جا نیاز دارید."),
  S(True, "Bliver der for lidt plads, standser jeg et sted, hvor vi kan komme forbi hinanden.",
    "If there is too little room, I stop at a place where we can pass each other.",
    "اگر جا کم باشد، جایی می‌ایستم که بتوانیم از کنار هم رد شویم.",
    "Det er bedre at holde stille et øjeblik end at mødes, hvor der ikke er plads nok.",
    "It is better to stand still for a moment than to meet where there is not enough room.",
    "بهتر است لحظه‌ای بایستید تا این‌که جایی که جای کافی نیست از کنار هم رد شوید."),
  S(False, "Den modkørende skal holde tilbage for mig, fordi mit vogntog fylder mest.",
    "The oncoming driver must give way to me because my combination takes up the most room.",
    "راننده‌ی روبه‌رو باید به من راه بدهد، چون مجموعه‌ی من بیشترین جا را می‌گیرد.",
    "Størrelsen giver ingen forkørselsret; I skal begge vise hensyn ved mødet.",
    "Size gives no right of way; you must both show consideration when you meet.",
    "بزرگ‌تر بودن حق تقدم نمی‌آورد؛ هر دو باید هنگام عبور از کنار هم ملاحظه کنید."),
)

Q(5978, "7.7", view("""
THE SCENE: a two-lane country road; in the oncoming lane a group of six racing cyclists in colourful clothing rides towards us in
pairs at the right edge of their lane; directly behind them an oncoming car has moved out towards the centre line, as if its driver
is about to overtake them.
MUST BE CLEARLY VISIBLE: the group of cyclists in the oncoming lane, the car behind them moved out towards the centre line.
MUST NOT APPEAR: signs, text, readable number plates."""),
  "En gruppe cykelryttere kommer imod dig. Lige bag dem kører en bil, som er trukket ud mod midten af vejen. Hvordan forholder du dig?",
  "A group of racing cyclists is coming towards you. Right behind them is a car that has moved out towards the middle of the road. "
  "What do you do?",
  "گروهی از دوچرخه‌سواران مسابقه‌ای از روبه‌رو می‌آیند. درست پشت سرشان خودرویی است که به سمت وسط جاده کشیده است. چه می‌کنید؟",
  S(True, "Jeg er forberedt på, at bilen kan trække ud i min vognbane for at overhale cyklisterne.",
    "I am prepared for the car to pull out into my lane to overtake the cyclists.",
    "آماده‌ام که خودرو برای سبقت از دوچرخه‌سواران وارد خط من شود.",
    "Når en bil bag langsomme trafikanter trækker ud mod midten, kan føreren være ved at overhale.",
    "When a car behind slow road users moves out towards the middle, its driver may be about to overtake.",
    "وقتی خودرویی پشت کاربران کُند به سمت وسط جاده می‌کشد، ممکن است راننده‌اش در حال سبقت باشد."),
  S(True, "Jeg letter på speederen og holder ind mod højre kant af vejen.", "I ease off the accelerator and keep in towards the right "
    "edge of the road.", "پایم را از روی پدال گاز برمی‌دارم و به سمت لبه‌ی راست جاده می‌روم.",
    "Så har du mere tid og plads, hvis bilen kommer ud foran dig.", "Then you have more time and room if the car comes out in front of you.",
    "این‌طور اگر خودرو جلوی شما بیاید، وقت و جای بیشتری دارید."),
  S(False, "Bilen må ikke overhale, når jeg kommer, så jeg behøver ikke tage hensyn til den.",
    "The car must not overtake while I am coming, so I need not take it into account.",
    "آن خودرو وقتی من می‌آیم حق سبقت ندارد، پس لازم نیست ملاحظه‌اش را بکنم.",
    "Andre trafikanter kan begå fejl, og du skal køre, så et uheld kan undgås.",
    "Other road users may make mistakes, and you must drive so that an accident can be avoided.",
    "دیگران ممکن است اشتباه کنند و شما باید طوری برانید که بتوان از تصادف جلوگیری کرد."),
  S(False, "Jeg sætter farten op, så jeg er forbi, før bilen når at overhale.",
    "I speed up so that I am past before the car has time to overtake.", "سرعتم را زیاد می‌کنم تا پیش از سبقتِ آن خودرو رد شده باشم.",
    "Med højere fart får du mindre tid til at reagere, hvis bilen trækker ud.",
    "At a higher speed you have less time to react if the car pulls out.",
    "با سرعت بیشتر، اگر خودرو بیرون بکشد، وقت کمتری برای واکنش دارید."),
)

Q(5979, "7.7", view("""
THE SCENE: a two-lane country road at night without street lights; in our dipped beam a cyclist with a small red rear light rides at
the right edge of our lane a little ahead of us; in the oncoming lane the headlights of a car approach, not far away.
MUST BE CLEARLY VISIBLE: the cyclist with the red rear light ahead in our lane, the oncoming headlights.
MUST NOT APPEAR: street lights, signs, text.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt. Foran dig i din side af vejen kører en cyklist, og en bil kommer imod dig. Hvordan forholder du dig?",
  "It is dark. Ahead of you on your side of the road there is a cyclist, and a car is coming towards you. What do you do?",
  "هوا تاریک است. جلوی شما در سمت شما یک دوچرخه‌سوار حرکت می‌کند و خودرویی از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg bliver bag cyklisten, til bilen er kørt forbi.", "I stay behind the cyclist until the car has gone past.",
    "تا وقتی خودرو رد نشده، پشت دوچرخه‌سوار می‌مانم.",
    "Der er ikke plads til både at give cyklisten god afstand og møde bilen på samme tid.",
    "There is not room both to give the cyclist a good distance and to meet the car at the same time.",
    "جا برای این‌که هم فاصله‌ی کافی با دوچرخه‌سوار داشته باشید و هم هم‌زمان از کنار خودرو رد شوید، نیست."),
  S(True, "Jeg sænker farten, så jeg kan standse bag cyklisten, hvis det bliver nødvendigt.",
    "I reduce my speed so that I can stop behind the cyclist if necessary.",
    "سرعتم را کم می‌کنم تا در صورت لزوم بتوانم پشت دوچرخه‌سوار بایستم.",
    "Lyset fra den modkørende kan blænde dig, så du et øjeblik mister cyklisten af syne.",
    "The lights of the oncoming car may dazzle you so that you lose sight of the cyclist for a moment.",
    "نور خودروی روبه‌رو ممکن است چشمتان را بزند و برای لحظه‌ای دوچرخه‌سوار را نبینید."),
  S(False, "Jeg kører forbi cyklisten, mens bilen passerer, fordi der lige akkurat er plads.",
    "I pass the cyclist while the car goes by, because there is just enough room.",
    "هم‌زمان با رد شدن خودرو از کنار دوچرخه‌سوار می‌گذرم، چون جا درست به اندازه است.",
    "Så kommer du alt for tæt på enten cyklisten eller den modkørende bil.",
    "Then you come far too close to either the cyclist or the oncoming car.",
    "در این صورت بیش از حد به دوچرخه‌سوار یا خودروی روبه‌رو نزدیک می‌شوید."),
  S(False, "Cyklisten har baglygte, så jeg kan holde min fart.", "The cyclist has a rear light, so I can keep my speed.",
    "دوچرخه‌سوار چراغ عقب دارد، پس می‌توانم سرعتم را حفظ کنم.",
    "Selv med baglygte kan cyklisten forsvinde i genskinnet fra den modkørendes lygter.",
    "Even with a rear light the cyclist may disappear in the glare from the oncoming car's lights.",
    "حتی با چراغ عقب، دوچرخه‌سوار ممکن است در نور خیره‌کننده‌ی خودروی روبه‌رو دیده نشود."),
)

Q(5980, "7.7", view("""
THE SCENE: a two-lane country road in the late afternoon; the sun is low BEHIND us, so long shadows of our car and of the roadside
trees stretch forward along the road; a little ahead an oncoming car, driving straight towards the low sun, waits with its left
indicator flashing to turn into a farm track on our side of the road.
MUST BE CLEARLY VISIBLE: the long shadows pointing forward, the oncoming car waiting to turn left across our lane, the farm track.
MUST NOT APPEAR: signs, text, readable number plates.""", cond="late afternoon, low sun behind the camera, dry road"),
  "Solen står lavt bag dig, så de modkørende kører lige mod solen. En modkørende bil blinker til venstre for at svinge ind ad en markvej "
  "i din side. Hvad skal du være opmærksom på?",
  "The sun is low behind you, so oncoming drivers are driving straight into it. An oncoming car is indicating left to turn into a farm "
  "track on your side. What must you be aware of?",
  "خورشید پشت سر شما پایین است، پس رانندگانِ روبه‌رو مستقیم به سمت آفتاب می‌رانند. خودرویی از روبه‌رو راهنمای چپ زده تا وارد یک راه "
  "مزرعه در سمت شما شود. به چه چیزی باید توجه کنید؟",
  S(True, "Føreren kan være blændet af solen og have svært ved at se mig.", "The driver may be dazzled by the sun and find it hard to see me.",
    "ممکن است آفتاب چشم راننده را زده باشد و نتواند مرا به‌خوبی ببیند.",
    "Med solen lige i øjnene kan en fører overse de modkørende.", "With the sun straight in the eyes a driver may fail to see oncoming "
    "traffic.", "راننده‌ای که آفتاب مستقیم در چشمش است ممکن است خودروهای روبه‌رو را نبیند."),
  S(True, "Jeg er forberedt på, at bilen svinger ind foran mig.", "I am prepared for the car to turn in front of me.",
    "آماده‌ام که آن خودرو جلوی من بپیچد.",
    "En blændet fører kan tro, at der er frit, og svinge, selv om han skal holde tilbage for dig.",
    "A dazzled driver may think the way is clear and turn, even though he must give way to you.",
    "راننده‌ی خیره‌شده ممکن است فکر کند راه باز است و بپیچد، با این‌که باید به شما راه بدهد."),
  S(False, "Bilen skal holde tilbage for mig, så jeg kan holde min fart.", "The car must give way to me, so I can keep my speed.",
    "آن خودرو باید به من راه بدهد، پس می‌توانم سرعتم را حفظ کنم.",
    "Den skal holde tilbage, men du skal være klar til at undgå et uheld, hvis føreren ikke ser dig.",
    "It must give way, but you must be ready to avoid an accident if the driver does not see you.",
    "باید راه بدهد، ولی اگر راننده شما را نبیند، باید آماده‌ی جلوگیری از تصادف باشید."),
)

Q(5981, "7.7", town("""
THE SCENE: a road on the edge of town with one lane in each direction and a cycle lane along each side, separated from the car lanes
by a broad unbroken white line with painted bicycle symbols; a wide bus comes towards us close to the centre line; in our cycle lane
a cyclist rides a little ahead of us.
MUST BE CLEARLY VISIBLE: the cycle lanes with the broad line and bicycle symbols, the wide oncoming bus, the cyclist in our cycle lane.
MUST NOT APPEAR: text, readable number plates, logos."""),
  "Vejen har en cykelbane i hver side. En bred bus kommer imod dig tæt ved midterlinjen, og i din cykelbane kører en cyklist. Hvordan "
  "forholder du dig?",
  "The road has a cycle lane on each side. A wide bus is coming towards you close to the centre line, and a cyclist is riding in your "
  "cycle lane. What do you do?",
  "جاده در هر طرف یک خط دوچرخه دارد. اتوبوس پهنی نزدیک به خط وسط از روبه‌رو می‌آید و در خط دوچرخه‌ی سمت شما یک دوچرخه‌سوار حرکت "
  "می‌کند. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og holder til højre i min egen vognbane.", "I slow down and keep to the right in my own lane.",
    "سرعتم را کم می‌کنم و در خط خودم سمت راست می‌مانم.",
    "Så får bussen den plads, den har brug for, uden at du kommer ind i cykelbanen.",
    "Then the bus gets the room it needs without you entering the cycle lane.",
    "این‌طور اتوبوس جای لازم را پیدا می‌کند، بی‌آن‌که شما وارد خط دوچرخه شوید."),
  S(True, "Bliver der for smalt, standser jeg hellere i min vognbane end at køre ud i cykelbanen.",
    "If it gets too narrow, I would rather stop in my lane than drive out into the cycle lane.",
    "اگر جا خیلی تنگ شود، ترجیح می‌دهم در خط خودم بایستم تا این‌که وارد خط دوچرخه شوم.",
    "Kørende skal benytte den bane, der er bestemt for deres køretøj, og cykelbanen er for cyklister.",
    "Drivers must use the lane intended for their vehicle, and the cycle lane is for cyclists.",
    "رانندگان باید از خطی استفاده کنند که برای وسیله‌ی آن‌ها در نظر گرفته شده و خط دوچرخه مال دوچرخه‌سواران است."),
  S(False, "Jeg må køre ud i cykelbanen for at give bussen plads.", "I may drive out into the cycle lane to give the bus room.",
    "می‌توانم برای جا دادن به اتوبوس وارد خط دوچرخه شوم.",
    "Kantlinjen ind til cykelbanen må ikke overskrides for at køre i cykelbanen.",
    "The edge line next to the cycle lane must not be crossed in order to drive in the cycle lane.",
    "نباید از خط کناریِ خط دوچرخه عبور کنید تا در خط دوچرخه برانید."),
  S(False, "Jeg kører tæt forbi cyklisten for at give bussen mere plads.", "I pass close to the cyclist to give the bus more room.",
    "از نزدیکِ دوچرخه‌سوار رد می‌شوم تا جای بیشتری به اتوبوس بدهم.",
    "Du skal også give cyklisten god plads; vent hellere bag cyklisten, til bussen er forbi.",
    "You must also give the cyclist plenty of room; rather wait behind the cyclist until the bus has passed.",
    "باید به دوچرخه‌سوار هم جای کافی بدهید؛ بهتر است تا رد شدن اتوبوس پشت دوچرخه‌سوار بمانید."),
)

Q(5982, "7.7", view("""
THE SCENE: a narrow country road without a centre line, just wide enough for one vehicle; a little ahead on the oncoming side there
is a short passing place, where an oncoming lorry has pulled in and stopped to let us pass; the lorry is so big that we cannot see
what is behind it.
MUST BE CLEARLY VISIBLE: the lorry standing in the passing place, the narrow road beside it.
MUST NOT APPEAR: signs, text, readable number plates, logos."""),
  "På en smal vej er en modkørende lastbil kørt ind i en vigeplads og holder stille for at lade dig komme forbi. Hvordan forholder du "
  "dig?",
  "On a narrow road an oncoming lorry has pulled into a passing place and is standing still to let you pass. What do you do?",
  "در جاده‌ای باریک، کامیونی از روبه‌رو وارد یک جای کناری شده و ایستاده تا شما رد شوید. چه می‌کنید؟",
  S(True, "Jeg kører langsomt forbi, fordi lastbilen kan skjule en cyklist eller en bil bag sig.",
    "I drive past slowly because the lorry may hide a cyclist or a car behind it.",
    "آهسته رد می‌شوم، چون ممکن است دوچرخه‌سوار یا خودرویی پشت کامیون پنهان باشد.",
    "En trafikant bag lastbilen kan pludselig trække ud for at komme forbi den.",
    "A road user behind the lorry may suddenly pull out to get past it.",
    "کسی که پشت کامیون است ممکن است ناگهان برای رد شدن از آن بیرون بکشد."),
  S(False, "Jeg kører hurtigt forbi, så lastbilen ikke skal vente længe på mig.",
    "I drive past quickly so that the lorry need not wait long for me.", "سریع رد می‌شوم تا کامیون مدت زیادی منتظر من نماند.",
    "Hastværk gør det sværere at nå at reagere, hvis der kommer nogen frem bag lastbilen.",
    "Hurrying makes it harder to react in time if someone comes out from behind the lorry.",
    "عجله کردن واکنش به‌موقع را، اگر کسی از پشت کامیون بیرون بیاید، سخت‌تر می‌کند."),
  S(False, "Lastbilen holder stille, så der kan ikke komme nogen fra den side.",
    "The lorry is standing still, so nobody can come from that side.", "کامیون ایستاده است، پس کسی از آن سمت نمی‌تواند بیاید.",
    "En holdende lastbil kan skjule både fodgængere, cyklister og biler.",
    "A standing lorry can hide pedestrians, cyclists and cars alike.",
    "کامیونِ ایستاده می‌تواند عابران، دوچرخه‌سواران و خودروها را از دید پنهان کند."),
  S(False, "Jeg dytter, når jeg kører forbi, for at sige tak.", "I sound the horn as I pass to say thank you.",
    "هنگام رد شدن برای تشکر بوق می‌زنم.",
    "Hornet må kun bruges for at afværge fare.", "The horn may only be used to avert danger.", "بوق فقط برای دفع خطر است."),
)

Q(5983, "7.2", town("""
THE SCENE: a town street with one lane in our direction; along the right side runs a parking lane, separated from our lane by a
broad unbroken white line; only one car is parked in it, far ahead; in our lane a queue of cars stands still all the way up to a
traffic light at a junction.
MUST BE CLEARLY VISIBLE: the queue in our lane, the almost empty parking lane with the broad unbroken line.
MUST NOT APPEAR: text, readable number plates."""),
  "Bilerne i din vognbane holder i kø op til et lyskryds. Til højre er der en næsten tom parkeringsbane, adskilt fra din vognbane af en "
  "bred, ubrudt linje. Hvad gælder?",
  "The cars in your lane are standing in a queue up to a traffic-light junction. On the right there is an almost empty parking lane, "
  "separated from your lane by a broad unbroken line. What applies?",
  "خودروهای خط شما تا یک تقاطع چراغ‌دار در صف ایستاده‌اند. سمت راست یک خط پارک تقریباً خالی هست که با یک خط پهن و ممتد از خط شما "
  "جدا شده است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre i parkeringsbanen for at komme forbi køen.", "I must not drive in the parking lane to get past the queue.",
    "نباید برای رد شدن از صف در خط پارک برانم.",
    "Kantlinjen må kun overskrides i forbindelse med standsning eller parkering eller ved kørsel ind på eller ud fra vejen.",
    "The edge line may only be crossed in order to stop or park or to drive onto or off the road.",
    "از این خط کناری فقط برای توقف، پارک یا ورود به جاده و خروج از آن می‌توان عبور کرد."),
  S(False, "Jeg må køre i parkeringsbanen, når den er tom, og jeg blinker først.",
    "I may drive in the parking lane when it is empty and I indicate first.", "وقتی خط پارک خالی است و اول راهنما بزنم، می‌توانم در آن برانم.",
    "Parkeringsbanen er ikke til at køre i, heller ikke når den er tom.", "The parking lane is not for driving in, not even when it is "
    "empty.", "خط پارک برای رانندگی نیست، حتی وقتی خالی است."),
  S(False, "Jeg må køre i parkeringsbanen, hvis jeg kører langsomt og ser mig godt for.",
    "I may drive in the parking lane if I drive slowly and look out carefully.", "اگر آهسته بروم و خوب اطرافم را نگاه کنم، می‌توانم در خط پارک برانم.",
    "Det er ikke farten, der afgør det; kantlinjen må ikke overskrides for at køre forbi køen.",
    "It is not the speed that decides it; the edge line must not be crossed to drive past the queue.",
    "سرعت تعیین‌کننده نیست؛ نباید برای رد شدن از صف از خط کناری عبور کرد."),
)

Q(5984, "7.2", view("""
THE SCENE: a long uphill country road with two lanes in our direction; the right lane is a crawler lane, and at its start stands a
blue square sign showing a slow lorry symbol and the number 50 (the Danish crawler-lane sign); the crawler lane is empty; in the
ordinary lane a car drives a short distance ahead of us.
MUST BE CLEARLY VISIBLE: the empty crawler lane, the sign with 50, the car ahead in the ordinary lane.
MUST NOT APPEAR: other signs, any other text."""),
  "Op ad en bakke er der et krybespor, og tavlen viser 50 km/t. Krybesporet er tomt. Bilen foran dig i den almindelige vognbane kører 60 "
  "km/t, og du vil gerne køre hurtigere. Hvad gælder?",
  "Up a hill there is a crawler lane, and the sign shows 50 km/h. The crawler lane is empty. The car ahead of you in the ordinary lane "
  "is doing 60 km/h, and you would like to go faster. What applies?",
  "در یک سربالایی خطی مخصوص وسایل کُند هست و تابلو ۵۰ کیلومتر در ساعت را نشان می‌دهد. این خط خالی است. خودروی جلوی شما در خط معمولی "
  "۶۰ کیلومتر در ساعت می‌رود و شما می‌خواهید تندتر بروید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre op i krybesporet for at komme forbi bilen.", "I must not move into the crawler lane to get past the car.",
    "نباید برای رد شدن از آن خودرو وارد خط وسایل کُند شوم.",
    "Krybesporet må kun bruges af køretøjer, der kører langsommere end hastigheden på tavlen.",
    "The crawler lane may only be used by vehicles going slower than the speed on the sign.",
    "خط وسایل کُند فقط برای وسایلی است که آهسته‌تر از سرعتِ روی تابلو حرکت می‌کنند."),
  S(True, "Vil jeg overhale, skal det ske til venstre og kun, når det kan ske uden fare.",
    "If I want to overtake, it must be on the left and only when it can be done without danger.",
    "اگر بخواهم سبقت بگیرم، باید از چپ باشد و فقط وقتی که بی‌خطر باشد.",
    "Overhaling skal ske til venstre, og du skal sikre dig, at den kan ske uden fare.",
    "Overtaking must be done on the left, and you must make sure it can be done without danger.",
    "سبقت باید از چپ انجام شود و باید مطمئن شوید که بی‌خطر است."),
  S(False, "Krybesporet må bruges af alle, når der ikke kører langsomme køretøjer i det.",
    "Anyone may use the crawler lane when there are no slow vehicles in it.", "وقتی وسیله‌ی کُندی در خط وسایل کُند نیست، همه می‌توانند از آن استفاده کنند.",
    "Andre køretøjer end dem, der kører langsommere end tavlens hastighed, må ikke køre i krybesporet.",
    "Vehicles other than those going slower than the speed on the sign must not drive in the crawler lane.",
    "وسایلی جز آن‌هایی که آهسته‌تر از سرعتِ تابلو می‌روند، نباید در این خط برانند."),
  S(False, "Jeg må overhale højre om i krybesporet, når jeg giver tegn.", "I may overtake on the right in the crawler lane if I signal.",
    "اگر راهنما بزنم، می‌توانم در خط وسایل کُند از سمت راست سبقت بگیرم.",
    "Det er en overhaling højre om, og en hurtig bil må slet ikke køre i krybesporet.",
    "That is overtaking on the right, and a fast car must not drive in the crawler lane at all.",
    "این سبقت از سمت راست است و خودروی تند اصلاً نباید در خط وسایل کُند براند."),
)

Q(5985, "7.2", town("""
THE SCENE: a narrow one-way street in town; all cars drive the same way as we do; along the LEFT side runs a narrow cycle lane,
separated by a white line and marked with painted bicycle symbols and arrows pointing towards us, in which a cyclist comes towards us;
a little ahead a side street goes off to the left.
MUST BE CLEARLY VISIBLE: the cycle lane on the left with arrows pointing towards us, the oncoming cyclist in it, the side street on the
left.
MUST NOT APPEAR: text, readable number plates."""),
  "Du kører i en ensrettet gade. Langs venstre side er der en cykelbane, hvor cyklisterne kører imod dig. Hvad gælder?",
  "You are driving in a one-way street. Along the left-hand side there is a cycle lane in which cyclists ride towards you. What applies?",
  "در یک خیابان یک‌طرفه می‌رانید. در سمت چپ یک خط دوچرخه هست که دوچرخه‌سواران در آن به طرف شما می‌آیند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må regne med cyklister, der kommer imod mig i cykelbanen.", "I must expect cyclists coming towards me in the cycle lane.",
    "باید منتظر دوچرخه‌سوارانی باشم که در خط دوچرخه به طرف من می‌آیند.",
    "Cykelbanen giver cyklisterne lov til at køre mod ensretningen.", "The cycle lane allows cyclists to ride against the one-way "
    "direction.", "این خط دوچرخه به دوچرخه‌سواران اجازه می‌دهد خلاف جهت یک‌طرفه برانند."),
  S(True, "Svinger jeg til venstre, skal jeg holde tilbage for de cyklister, der kommer imod mig.",
    "If I turn left, I must give way to the cyclists coming towards me.", "اگر به چپ بپیچم، باید به دوچرخه‌سوارانی که به طرفم می‌آیند راه بدهم.",
    "Du må ikke svinge til venstre, før det kan ske uden ulempe for den modkørende færdsel.",
    "You must not turn left until it can be done without inconvenience to oncoming traffic.",
    "تا وقتی پیچیدن به چپ برای ترافیک روبه‌رو مزاحمتی ایجاد کند، نباید بپیچید."),
  S(False, "Cyklisterne kører mod ensretningen, så de skal holde tilbage for mig.",
    "The cyclists are riding against the one-way direction, so they must give way to me.",
    "دوچرخه‌سواران خلاف جهت یک‌طرفه می‌رانند، پس باید به من راه بدهند.",
    "De kører lovligt i cykelbanen, og du skal tage hensyn til dem.", "They are riding lawfully in the cycle lane, and you must show them "
    "consideration.", "آن‌ها قانونی در خط دوچرخه می‌رانند و شما باید ملاحظه‌شان را بکنید."),
  S(False, "Jeg må bruge cykelbanen, når der ikke kommer cyklister.", "I may use the cycle lane when no cyclists are coming.",
    "وقتی دوچرخه‌سواری نمی‌آید، می‌توانم از خط دوچرخه استفاده کنم.",
    "Kørende skal benytte den bane, der er bestemt for deres køretøj.", "Drivers must use the lane intended for their vehicle.",
    "رانندگان باید از خطی استفاده کنند که برای وسیله‌ی آن‌ها در نظر گرفته شده است."),
)

Q(5986, "7.6", town("""
THE SCENE: a town street with a cycle lane along the right side, separated from our lane by a broad unbroken white line with painted
bicycle symbols; a little ahead a delivery van stands parked in the cycle lane with its hazard lights flashing; a cyclist in the cycle
lane is just about to reach the back of the van, a short distance ahead of us.
MUST BE CLEARLY VISIBLE: the van standing in the cycle lane, the cyclist approaching it, the broad line with bicycle symbols.
MUST NOT APPEAR: text, logos, readable number plates."""),
  "En varevogn holder i cykelbanen foran dig. En cyklist i cykelbanen er ved at nå op bag varevognen. Hvordan forholder du dig?",
  "A van is standing in the cycle lane ahead of you. A cyclist in the cycle lane is about to reach the back of the van. What do you do?",
  "یک ون جلوی شما در خط دوچرخه ایستاده است. دوچرخه‌سواری در خط دوچرخه دارد به پشت ون می‌رسد. چه می‌کنید؟",
  S(True, "Jeg er forberedt på, at cyklisten svinger ud i min vognbane.", "I am prepared for the cyclist to swing out into my lane.",
    "آماده‌ام که دوچرخه‌سوار به داخل خط من بپیچد.",
    "Cyklisten skal uden om varevognen og ser sig måske ikke tilbage først.",
    "The cyclist has to get round the van and may not look back first.", "دوچرخه‌سوار باید از کنار ون رد شود و شاید پیش از آن پشت سرش را نگاه نکند."),
  S(True, "Jeg sænker farten, så cyklisten kan komme forbi varevognen foran mig.",
    "I slow down so that the cyclist can get past the van in front of me.", "سرعتم را کم می‌کنم تا دوچرخه‌سوار بتواند جلوتر از من از کنار ون رد شود.",
    "Det er sikrere, at cyklisten kommer forbi foran dig, end at I er ved siden af hinanden ved varevognen.",
    "It is safer for the cyclist to get past in front of you than for you to be side by side at the van.",
    "ایمن‌تر است دوچرخه‌سوار جلوتر از شما رد شود تا این‌که کنار ون شانه‌به‌شانه‌ی هم باشید."),
  S(True, "Når jeg kører forbi cyklisten, holder jeg god afstand til siden.", "When I pass the cyclist, I keep a good distance to the side.",
    "وقتی از کنار دوچرخه‌سوار رد می‌شوم، فاصله‌ی جانبی کافی نگه می‌دارم.",
    "Cyklisten kan slingre, når han skal ud og ind igen.", "The cyclist may wobble when he has to go out and back in again.",
    "دوچرخه‌سوار وقتی باید بیرون برود و دوباره برگردد ممکن است تلوتلو بخورد."),
  S(False, "Cyklisten skal vente bag varevognen, til der er plads i cykelbanen.",
    "The cyclist must wait behind the van until there is room in the cycle lane.", "دوچرخه‌سوار باید پشت ون صبر کند تا در خط دوچرخه جا باز شود.",
    "Cyklisten må gerne køre uden om varevognen, og du skal tage hensyn til ham.",
    "The cyclist may ride round the van, and you must show him consideration.",
    "دوچرخه‌سوار اجازه دارد از کنار ون رد شود و شما باید ملاحظه‌اش را بکنید."),
)

Q(5987, "7.1", town("""
THE SCENE: a street outside a kindergarten in the afternoon, seen from the driver's seat of our car parked at the right kerb; parents
with small children walk along the pavement and between the parked cars; just in front of our bonnet the top of a small child's red
cap can barely be seen.
MUST BE CLEARLY VISIBLE: the children and parents near the parked cars, the small child's cap just in front of our bonnet.
MUST NOT APPEAR: text, readable number plates, logos."""),
  "Du har hentet dit barn i børnehaven og vil køre fra kantstenen. Der er mange børn og forældre omkring bilerne. Hvordan forholder du "
  "dig?",
  "You have picked up your child at the kindergarten and want to pull away from the kerb. There are many children and parents around "
  "the cars. What do you do?",
  "فرزندتان را از مهدکودک گرفته‌اید و می‌خواهید از کنار جدول حرکت کنید. کودکان و والدین زیادی اطراف خودروها هستند. چه می‌کنید؟",
  S(True, "Jeg sikrer mig, at der ikke står et lille barn tæt foran eller bag bilen.",
    "I make sure that there is no small child standing close in front of or behind the car.",
    "مطمئن می‌شوم که کودک کوچکی درست جلو یا پشت خودرو نایستاده باشد.",
    "Et lille barn tæt ved bilen kan være helt skjult for føreren.", "A small child close to the car can be completely hidden from the "
    "driver.", "کودک کوچکی که نزدیک خودرو است ممکن است کاملاً از دید راننده پنهان باشد."),
  S(True, "Jeg kører meget langsomt ud og er klar til at standse.", "I pull out very slowly and am ready to stop.",
    "خیلی آهسته حرکت می‌کنم و آماده‌ی ایستادن هستم.",
    "Børn kan pludselig løbe ud mellem de parkerede biler.", "Children may suddenly run out between the parked cars.",
    "کودکان ممکن است ناگهان از میان خودروهای پارک‌شده بیرون بدوند."),
  S(True, "Jeg giver tegn, før jeg kører ud fra kantstenen.", "I signal before I pull out from the kerb.",
    "پیش از حرکت از کنار جدول راهنما می‌زنم.",
    "Du skal give tegn før igangsætning fra kanten af vejen.", "You must signal before moving off from the edge of the road.",
    "پیش از حرکت از لبه‌ی جاده باید علامت بدهید."),
  S(False, "Når jeg har set i spejlene, ved jeg, at der ikke er nogen ved bilen.",
    "Once I have looked in the mirrors, I know that there is nobody by the car.", "وقتی در آینه‌ها نگاه کردم، مطمئنم کسی کنار خودرو نیست.",
    "Spejlene viser ikke det hele; tæt foran og bag bilen er der steder, du ikke kan se.",
    "The mirrors do not show everything; close in front of and behind the car there are places you cannot see.",
    "آینه‌ها همه‌چیز را نشان نمی‌دهند؛ درست جلو و پشت خودرو جاهایی هست که نمی‌بینید."),
)

Q(5988, "6.1", view("""
THE SCENE: a two-lane country road; ahead in the middle of the road lies a narrow traffic island; on its nose facing us stands a tall,
narrow plate with diagonal red and white stripes that slope down towards the RIGHT.
MUST BE CLEARLY VISIBLE: the traffic island, the tall plate with red and white stripes sloping down to the right.
MUST NOT APPEAR: other signs, text."""),
  "Midt på vejen ligger en helle. På spidsen af den står en plade med røde og hvide striber, der hælder ned mod højre. Hvad betyder den?",
  "There is a traffic island in the middle of the road. On its nose stands a plate with red and white stripes that slope down to the "
  "right. What does it mean?",
  "وسط جاده یک جزیره‌ی ترافیکی هست. روی نوک آن تابلویی با نوارهای قرمز و سفید است که به سمت راست پایین آمده‌اند. معنی آن چیست؟",
  S(True, "Jeg skal køre forbi pladen i højre side.", "I must pass the plate on the right.", "باید از سمت راستِ تابلو عبور کنم.",
    "Pladen skal passeres på den side, striberne hælder ned imod.", "The plate must be passed on the side the stripes slope down "
    "towards.", "باید از سمتی از تابلو رد شد که نوارها به طرف آن پایین آمده‌اند."),
  S(True, "Pladen giver en særlig kraftig markering af hellen.", "The plate gives a particularly strong marking of the island.",
    "این تابلو جزیره را به‌طور ویژه پررنگ مشخص می‌کند.",
    "Den bruges, hvor trafikanterne skal gøres ekstra opmærksomme på kanten.",
    "It is used where road users have to be made especially aware of the edge.",
    "جایی به کار می‌رود که باید توجه کاربران جاده را به‌طور ویژه به لبه جلب کرد."),
  S(False, "Jeg må selv vælge, om jeg kører forbi pladen i højre eller venstre side.",
    "I may choose myself whether to pass the plate on the right or on the left.", "خودم می‌توانم انتخاب کنم از راستِ تابلو رد شوم یا از چپ.",
    "Striberne viser, hvilken side du skal køre forbi på.", "The stripes show which side you must pass on.",
    "نوارها نشان می‌دهند از کدام سمت باید رد شوید."),
  S(False, "Pladen betyder, at vejen er spærret lige efter hellen.", "The plate means that the road is closed just after the island.",
    "این تابلو یعنی جاده درست بعد از جزیره بسته است.",
    "Pladen markerer hellen og viser, hvor du skal passere; den spærrer ikke vejen.",
    "The plate marks the island and shows where to pass; it does not close the road.",
    "این تابلو جزیره را مشخص می‌کند و جای عبور را نشان می‌دهد؛ جاده را نمی‌بندد."),
)

Q(5989, "7.4", view("""
THE SCENE: a motorway with two lanes in our direction, seen from our car in the right lane; far ahead in our lane drives a lorry; a car
is just passing us in the left lane and is almost level with our front; in our left door mirror the front of a second car can be seen
close behind the first one in the left lane.
MUST BE CLEARLY VISIBLE: the car passing us on the left, the second car close behind it in the left door mirror, the lorry ahead.
MUST NOT APPEAR: signs, text, readable number plates."""),
  "På motorvejen bliver du overhalet af en bil. Når den er kørt forbi, vil du selv skifte til venstre vognbane for at overhale en "
  "lastbil. Hvad skal du være opmærksom på?",
  "On the motorway a car is overtaking you. When it has gone past, you want to move to the left lane yourself to overtake a lorry. What "
  "must you be aware of?",
  "در آزادراه خودرویی از شما سبقت می‌گیرد. وقتی رد شد، خودتان می‌خواهید برای سبقت از یک کامیون به خط چپ بروید. به چه چیزی باید توجه "
  "کنید؟",
  S(True, "Der kan komme en bil mere lige bag den, der overhaler mig.", "Another car may be coming right behind the one overtaking me.",
    "ممکن است درست پشت خودرویی که از من سبقت می‌گیرد، خودروی دیگری هم بیاید.",
    "En bil tæt bag den overhalende kan være skjult i din blinde vinkel.",
    "A car close behind the overtaking one may be hidden in your blind spot.",
    "خودرویی که نزدیکِ پشتِ خودروی سبقت‌گیرنده است ممکن است در نقطه‌ی کور شما پنهان باشد."),
  S(True, "Jeg ser i spejlet og over skulderen igen, lige før jeg skifter vognbane.",
    "I look in the mirror and over my shoulder again just before I change lanes.", "درست پیش از تغییر خط، دوباره در آینه و از روی شانه نگاه می‌کنم.",
    "Før vognbaneskift skal du sikre dig, at det kan ske uden fare eller unødig ulempe for andre.",
    "Before changing lanes you must make sure that it can be done without danger or unnecessary inconvenience to others.",
    "پیش از تغییر خط باید مطمئن شوید که بدون خطر یا مزاحمت بی‌مورد برای دیگران انجام می‌شود."),
  S(True, "Jeg giver tegn med blinklyset i god tid før vognbaneskiftet.", "I signal with the indicator in good time before the lane change.",
    "پیش از تغییر خط، به‌موقع راهنما می‌زنم.",
    "På motorvejen skal du give tegn før vognbaneskift.", "On a motorway you must signal before changing lanes.",
    "در آزادراه پیش از تغییر خط باید علامت بدهید."),
  S(False, "Når den første bil er kørt forbi, er venstre vognbane fri.", "Once the first car has gone past, the left lane is clear.",
    "وقتی خودروی اول رد شد، خط چپ خالی است.",
    "Der kan sagtens komme flere biler tæt efter hinanden.", "Several cars may well come close behind one another.",
    "ممکن است چند خودرو نزدیک به هم پشت سر هم بیایند."),
)

Q(5990, "7.16", view("""
THE SCENE: a long, straight motorway at dusk with little traffic; at the right a blue sign with a white picnic-table symbol announces
a rest area ahead.
MUST BE CLEARLY VISIBLE: the long straight motorway, the rest-area sign with the picnic-table symbol.
MUST NOT APPEAR: readable text or numbers.""", cond="dusk, dry road"),
  "Du har kørt længe på motorvejen. Du begynder at gabe, og øjenlågene bliver tunge. Hvad gør du?",
  "You have been driving on the motorway for a long time. You start to yawn, and your eyelids feel heavy. What do you do?",
  "مدت زیادی در آزادراه رانده‌اید. شروع به خمیازه کشیدن کرده‌اید و پلک‌هایتان سنگین شده است. چه می‌کنید؟",
  S(True, "Jeg kører ind på den næste rasteplads og holder en pause.", "I pull into the next rest area and take a break.",
    "در نزدیک‌ترین استراحتگاه توقف می‌کنم و استراحت می‌کنم.",
    "Træthed gør dig langsom til at reagere, og du kan falde i søvn et kort øjeblik uden at opdage det.",
    "Tiredness makes you slow to react, and you may fall asleep for a moment without noticing.",
    "خستگی واکنش شما را کُند می‌کند و ممکن است لحظه‌ای بی‌آن‌که متوجه شوید خوابتان ببرد."),
  S(False, "Jeg holder ind i nødsporet og sover lidt.", "I pull onto the hard shoulder and have a little sleep.",
    "در شانه‌ی اضطراری می‌ایستم و کمی می‌خوابم.",
    "På motorvejen må du kun standse på de anviste parkerings- og rastepladser; nødsporet er til nødsituationer.",
    "On a motorway you may only stop at the designated parking and rest areas; the hard shoulder is for emergencies.",
    "در آزادراه فقط در پارکینگ‌ها و استراحتگاه‌های تعیین‌شده می‌توانید بایستید؛ شانه‌ی اضطراری برای موارد اضطراری است."),
  S(False, "Jeg skruer op for musikken og åbner vinduet, så kan jeg sagtens køre videre.",
    "I turn up the music and open the window, and then I can easily drive on.", "صدای موسیقی را بلند و پنجره را باز می‌کنم، آن وقت به‌راحتی می‌توانم ادامه دهم.",
    "Det hjælper kun kortvarigt; det er hvile og søvn, der virker mod træthed.",
    "That only helps for a short while; rest and sleep are what work against tiredness.",
    "این کار فقط برای مدت کوتاهی کمک می‌کند؛ چیزی که با خستگی مقابله می‌کند استراحت و خواب است."),
)

Q(5991, "7.16", view("""
THE SCENE: a motorway with a crash barrier in the central reservation; on the opposite carriageway beyond the barrier a crashed car
stands at an angle, with an ambulance and a police car with flashing blue lights beside it; in our direction the cars ahead of us
have their brake lights on, as their drivers slow down to look.
MUST BE CLEARLY VISIBLE: the accident on the opposite carriageway, the brake lights of the cars ahead of us.
MUST NOT APPEAR: text, readable number plates, injured people."""),
  "På den anden side af midterrabatten er der sket et uheld. Bilerne foran dig sætter farten ned, fordi førerne kigger. Hvordan "
  "forholder du dig?",
  "There has been an accident on the other side of the central reservation. The cars ahead of you are slowing down because their drivers "
  "are looking. What do you do?",
  "آن سوی جداکننده‌ی میانی آزادراه تصادفی رخ داده است. خودروهای جلوی شما سرعتشان را کم می‌کنند، چون رانندگانشان نگاه می‌کنند. چه می‌کنید؟",
  S(True, "Jeg holder øjnene på trafikken foran mig.", "I keep my eyes on the traffic in front of me.", "چشمم را به ترافیک جلوی خودم می‌دوزم.",
    "Når førerne foran kigger på uheldet, kan de bremse pludselig.", "When the drivers ahead look at the accident, they may brake "
    "suddenly.", "وقتی رانندگانِ جلو به تصادف نگاه می‌کنند، ممکن است ناگهان ترمز کنند."),
  S(True, "Jeg sørger for at have afstand nok til at kunne standse, hvis bilerne foran bremser brat.",
    "I make sure I have enough distance to stop if the cars ahead brake sharply.",
    "مطمئن می‌شوم فاصله‌ی کافی دارم تا اگر خودروهای جلو ناگهان ترمز کردند، بتوانم بایستم.",
    "Når mange kigger på et uheld, sker der let påkørsler bagfra.", "When many people look at an accident, rear-end collisions easily "
    "happen.", "وقتی خیلی‌ها به یک تصادف نگاه می‌کنند، تصادف از پشت به‌راحتی رخ می‌دهد."),
  S(False, "Jeg sætter også farten ned for at se, hvad der er sket.", "I also slow down to see what has happened.",
    "من هم سرعتم را کم می‌کنم تا ببینم چه شده است.",
    "Politi og redningsfolk tager sig af uheldet; din opgave er at køre sikkert videre.",
    "The police and rescue workers are dealing with the accident; your job is to drive on safely.",
    "پلیس و امدادگران به تصادف رسیدگی می‌کنند؛ وظیفه‌ی شما این است که ایمن به راهتان ادامه دهید."),
  S(False, "Jeg filmer uheldet med telefonen, mens jeg kører forbi.", "I film the accident with my phone as I drive past.",
    "هنگام رد شدن با تلفنم از تصادف فیلم می‌گیرم.",
    "Du må ikke bruge en håndholdt telefon under kørslen, og det tager din opmærksomhed fra vejen.",
    "You must not use a hand-held phone while driving, and it takes your attention away from the road.",
    "در حین رانندگی نباید از تلفن دستی استفاده کنید و این کار حواستان را از جاده پرت می‌کند."),
)

Q(5992, "7.16", view("""
THE SCENE: a slow queue on a motorway; our car has just bumped into the back of the car in front, which has a small dent in its rear
bumper; both cars have their hazard lights on; the hard shoulder on the right is free, and beyond it there is a crash barrier and a
grass verge.
MUST BE CLEARLY VISIBLE: the small dent in the car in front, the hazard lights, the free hard shoulder, the crash barrier.
MUST NOT APPEAR: text, readable number plates, injured people."""),
  "I en langsom kø på motorvejen kører du op bag i bilen foran. Ingen er kommet til skade, og begge biler kan køre. Hvad gælder?",
  "In a slow queue on the motorway you bump into the back of the car in front. Nobody is hurt, and both cars can be driven. What "
  "applies?",
  "در صف کُند آزادراه به پشت خودروی جلویی می‌زنید. کسی آسیب ندیده و هر دو خودرو قابل رانندگی‌اند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal standse, selv om skaden er lille.", "I must stop, even though the damage is slight.",
    "باید بایستم، حتی اگر خسارت کم باشد.",
    "Den, der bliver indblandet i et færdselsuheld, skal straks standse.", "Anyone involved in a road accident must stop at once.",
    "هر کس درگیر تصادفی شود، باید فوراً بایستد."),
  S(True, "Vi flytter bilerne væk fra vognbanen, fx ud i nødsporet.", "We move the cars out of the lane, for example onto the hard "
    "shoulder.", "خودروها را از خط بیرون می‌بریم، مثلاً به شانه‌ی اضطراری.",
    "Et køretøj, der efter et uheld holder et sted, hvor det er forbudt at standse, skal snarest muligt flyttes.",
    "A vehicle standing after an accident where stopping is forbidden must be moved as soon as possible.",
    "وسیله‌ای که پس از تصادف در جایی ایستاده که توقف ممنوع است، باید هر چه زودتر جابه‌جا شود."),
  S(True, "Jeg opgiver mit navn og min adresse, hvis den anden fører beder om det.",
    "I give my name and address if the other driver asks for them.", "اگر راننده‌ی دیگر بخواهد، نام و نشانی‌ام را به او می‌دهم.",
    "Det skal den, der er indblandet i et uheld, gøre, når en anden indblandet beder om det.",
    "Anyone involved in an accident must do so when another person involved asks.",
    "هر کس درگیر تصادف باشد، اگر طرف دیگر بخواهد، باید این کار را بکند."),
  S(False, "Vi bliver stående i vognbanen, til vi har udfyldt skadeanmeldelsen.",
    "We stay standing in the lane until we have filled in the accident report.", "تا پر کردن فرم گزارش خسارت در همان خط می‌مانیم.",
    "Biler, der holder i vognbanen på motorvejen, er til stor fare for andre; flyt dem først.",
    "Cars standing in a motorway lane are a great danger to others; move them first.",
    "خودروهایی که در خط آزادراه ایستاده‌اند برای دیگران بسیار خطرناک‌اند؛ اول جابه‌جایشان کنید."),
)

Q(5993, "7.5", town("""
THE SCENE: a wide residential street with one lane in each direction, seen from our car parked at the right kerb; far behind us a car
approaches in our lane (seen in the left door mirror), and a little ahead a cyclist comes towards us in the other lane.
MUST BE CLEARLY VISIBLE: the wide street, the car in the left door mirror, the oncoming cyclist.
MUST NOT APPEAR: signs, text, readable number plates."""),
  "Du holder ved kantstenen og vil vende og køre den modsatte vej. Gaden er bred nok til at vende i én manøvre. Hvordan forholder du "
  "dig?",
  "You are parked at the kerb and want to turn round and drive the opposite way. The street is wide enough to turn in one go. What do "
  "you do?",
  "کنار جدول پارک کرده‌اید و می‌خواهید دور بزنید و در جهت مخالف برانید. خیابان آن‌قدر پهن هست که در یک حرکت دور بزنید. چه می‌کنید؟",
  S(True, "Jeg giver tegn til venstre, før jeg kører ud og vender.", "I signal left before I pull out and turn round.",
    "پیش از حرکت و دور زدن، راهنمای چپ می‌زنم.",
    "Du skal give tegn før igangsætning fra kanten af vejen og før vending.",
    "You must signal before moving off from the edge of the road and before turning round.",
    "پیش از حرکت از لبه‌ی جاده و پیش از دور زدن باید علامت بدهید."),
  S(True, "Jeg venter, til jeg kan vende uden at genere hverken bilen bagfra eller cyklisten forfra.",
    "I wait until I can turn round without bothering either the car from behind or the cyclist from the front.",
    "صبر می‌کنم تا بتوانم بدون مزاحمت برای خودروی پشتی یا دوچرخه‌سوارِ روبه‌رو دور بزنم.",
    "Før vending skal du sikre dig, at den kan ske uden fare eller ulempe for andre.",
    "Before turning round you must make sure that it can be done without danger or inconvenience to others.",
    "پیش از دور زدن باید مطمئن شوید که بدون خطر یا مزاحمت برای دیگران انجام می‌شود."),
  S(False, "Jeg behøver kun se efter trafikken bagfra, fordi jeg holder i højre side.",
    "I only need to look out for traffic from behind, because I am parked on the right-hand side.",
    "فقط لازم است به ترافیکِ پشت سر نگاه کنم، چون سمت راست پارک کرده‌ام.",
    "Når du vender, kører du også over den modkørende vognbane.", "When you turn round, you also cross the oncoming lane.",
    "وقتی دور می‌زنید، از خط مقابل هم عبور می‌کنید."),
  S(False, "Jeg bakker ud på vejen og vender baglæns, så går det hurtigere.",
    "I reverse out onto the road and turn round backwards, as that is quicker.", "دنده‌عقب وارد خیابان می‌شوم و با دنده‌عقب دور می‌زنم تا سریع‌تر شود.",
    "Vending skal ske forlæns til venstre, medmindre forholdene ikke tillader det.",
    "Turning round must be done forwards to the left unless the conditions do not allow it.",
    "دور زدن باید رو به جلو و به سمت چپ انجام شود، مگر این‌که شرایط اجازه ندهد."),
)

Q(5994, "7.4", view("""
THE SCENE: a road with two lanes in our direction at night, with street lights and little traffic; a little ahead the right lane, in
which we drive, is closed by a row of orange cones placed diagonally across it, with lamps flashing white light along the cones;
behind them road-works machines stand in the closed lane; the left lane is open.
MUST BE CLEARLY VISIBLE: the diagonal row of orange cones closing our lane, the flashing white lamps, the open left lane.
MUST NOT APPEAR: signs, text, readable number plates.""", cond="night, dark, dry road, street lights"),
  "Det er mørkt, og der er kun lidt trafik. Lidt fremme er din vognbane spærret med orange kegler og lamper, der blinker med hvidt lys. "
  "Vognbanen til venstre er åben. Hvordan forholder du dig?",
  "It is dark, and there is only a little traffic. A little ahead your lane is closed with orange cones and lamps flashing white light. "
  "The lane to the left is open. What do you do?",
  "هوا تاریک است و ترافیک کم است. کمی جلوتر خط شما با مخروط‌های نارنجی و چراغ‌هایی که نور سفید چشمک‌زن دارند بسته شده است. خط سمت چپ "
  "باز است. چه می‌کنید؟",
  S(True, "Jeg skifter i god tid over i den åbne vognbane, når det kan ske uden fare.",
    "I move over to the open lane in good time, when it can be done without danger.", "به‌موقع و وقتی بی‌خطر باشد به خط باز می‌روم.",
    "Keglerne og lamperne afgrænser arbejdsområdet, og du skal sikre dig, at vognbaneskiftet kan ske uden fare.",
    "The cones and lamps mark off the work area, and you must make sure that the lane change can be done without danger.",
    "مخروط‌ها و چراغ‌ها محدوده‌ی کار را مشخص می‌کنند و باید مطمئن شوید که تغییر خط بی‌خطر است."),
  S(True, "Jeg sætter farten ned, fordi der kan være vejarbejdere og maskiner bag keglerne.",
    "I slow down because there may be road workers and machines behind the cones.",
    "سرعتم را کم می‌کنم، چون ممکن است پشت مخروط‌ها کارگران و ماشین‌آلات باشند.",
    "Ved vejarbejde skal du være særlig opmærksom på dem, der arbejder.", "At road works you must pay special attention to those working "
    "there.", "در محل کارهای جاده‌ای باید به‌طور ویژه مراقب کسانی باشید که کار می‌کنند."),
  S(False, "Jeg kører helt frem til keglerne med uændret fart og skifter først i sidste øjeblik.",
    "I drive right up to the cones at unchanged speed and change lanes only at the last moment.",
    "با همان سرعت تا خودِ مخروط‌ها می‌روم و فقط در آخرین لحظه خط عوض می‌کنم.",
    "Et sent vognbaneskift giver dårlig tid til at se, om der er plads, og kan tvinge andre til at bremse.",
    "A late lane change gives little time to see whether there is room and may force others to brake.",
    "تغییر خطِ دیرهنگام فرصت کمی برای دیدن جای خالی می‌دهد و ممکن است دیگران را به ترمز وادار کند."),
  S(False, "De blinkende hvide lamper betyder, at vejarbejdet er slut, og at vognbanen snart åbner.",
    "The flashing white lamps mean that the road works are over and that the lane will soon open.",
    "چراغ‌های سفید چشمک‌زن یعنی کار جاده تمام شده و خط به‌زودی باز می‌شود.",
    "Lamperne markerer, ligesom keglerne, det område, der er spærret på grund af vejarbejdet.",
    "Like the cones, the lamps mark the area that is closed because of the road works.",
    "این چراغ‌ها هم مثل مخروط‌ها محدوده‌ای را مشخص می‌کنند که به خاطر کار جاده‌ای بسته است."),
)

Q(5995, "7.3", town("""
THE SCENE: a residential street with cars parked along the right kerb; just ahead of us a small child suddenly runs out onto the road
from between two parked cars.
MUST BE CLEARLY VISIBLE: the child running out between the parked cars close ahead of us.
MUST NOT APPEAR: signs, text, readable number plates."""),
  "Et barn løber pludselig ud på vejen lige foran dig, og du må nødbremse. Bilen har ABS-bremser. Hvad gælder?",
  "A child suddenly runs onto the road just in front of you, and you have to make an emergency stop. The car has ABS brakes. What "
  "applies?",
  "کودکی ناگهان درست جلوی شما به خیابان می‌دود و باید ترمز اضطراری بگیرید. خودرو ترمز ABS دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg træder bremsepedalen hårdt ned og holder den nede.", "I press the brake pedal down hard and keep it down.",
    "پدال ترمز را محکم فشار می‌دهم و پایین نگه می‌دارم.",
    "Med ABS skal du bremse så kraftigt som muligt og blive ved, til bilen holder stille, eller faren er ovre.",
    "With ABS you must brake as hard as possible and keep doing so until the car has stopped or the danger is over.",
    "با ABS باید هر چه محکم‌تر ترمز کنید و ادامه دهید تا خودرو بایستد یا خطر رفع شود."),
  S(True, "Jeg kan stadig styre bilen, mens jeg bremser hårdt.", "I can still steer the car while braking hard.",
    "در حین ترمز شدید هم می‌توانم فرمان را کنترل کنم.",
    "ABS forhindrer hjulene i at låse, så bilen kan styres under opbremsningen.",
    "ABS stops the wheels from locking, so the car can be steered while braking.",
    "ABS از قفل شدن چرخ‌ها جلوگیری می‌کند، پس در حین ترمز می‌توان خودرو را هدایت کرد."),
  S(True, "Det er normalt, at bremsepedalen ryster og brummer under opbremsningen.",
    "It is normal for the brake pedal to shake and buzz during the braking.", "طبیعی است که پدال ترمز هنگام ترمز گرفتن بلرزد و صدا بدهد.",
    "Rystelserne betyder, at ABS arbejder; du skal ikke slippe bremsen.",
    "The shaking means that the ABS is working; you must not release the brake.",
    "این لرزش یعنی ABS کار می‌کند؛ نباید ترمز را رها کنید."),
  S(True, "Har bilen manuelt gear, træder jeg også koblingen helt ned.", "If the car has a manual gearbox, I also press the clutch "
    "right down.", "اگر خودرو دنده‌ی دستی دارد، کلاچ را هم تا ته فشار می‌دهم.",
    "Så går motoren ikke i stå, og du kan bruge al din opmærksomhed på at bremse og styre.",
    "Then the engine does not stall, and you can give all your attention to braking and steering.",
    "این‌طور موتور خاموش نمی‌شود و می‌توانید تمام حواستان را روی ترمز و هدایت خودرو بگذارید."),
)

Q(5996, "7.8", view("""
THE SCENE: a country road through a beech forest in autumn; the road surface is covered with wet, yellow-brown leaves; a car drives a
short distance ahead of us.
MUST BE CLEARLY VISIBLE: the wet leaves covering the road, the car ahead.
MUST NOT APPEAR: signs, text, readable number plates.""", cond="autumn, overcast, wet road covered with leaves"),
  "Det er efterår, og vejen er dækket af vådt løv. Du kører bag en anden bil. Hvad gælder for afstanden?",
  "It is autumn, and the road is covered with wet leaves. You are driving behind another car. What applies to the distance?",
  "پاییز است و جاده پوشیده از برگ‌های خیس است. پشت خودروی دیگری می‌رانید. درباره‌ی فاصله چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder længere afstand end på tør vej, fordi bremselængden bliver længere.",
    "I keep a longer distance than on a dry road because the braking distance becomes longer.",
    "فاصله‌ام را بیشتر از جاده‌ی خشک نگه می‌دارم، چون مسافت ترمز بیشتر می‌شود.",
    "Vådt løv gør vejen glat, så det tager længere tid at standse.", "Wet leaves make the road slippery, so it takes longer to stop.",
    "برگ‌های خیس جاده را لغزنده می‌کنند، پس ایستادن بیشتر طول می‌کشد."),
  S(False, "Jeg kan holde samme afstand som på tør vej, fordi bilen har gode dæk.",
    "I can keep the same distance as on a dry road because the car has good tyres.",
    "می‌توانم همان فاصله‌ی جاده‌ی خشک را نگه دارم، چون لاستیک‌های خودرو خوب‌اند.",
    "Gode dæk hjælper, men de kan ikke give det samme greb på vådt løv.", "Good tyres help, but they cannot give the same grip on wet "
    "leaves.", "لاستیک خوب کمک می‌کند، ولی روی برگ خیس همان چسبندگی را ندارد."),
  S(False, "Jeg kører tæt bag den, så jeg kan køre i dens hjulspor, hvor løvet er kørt væk.",
    "I drive close behind it so that I can drive in its wheel tracks, where the leaves have been cleared.",
    "نزدیکِ پشتش می‌رانم تا در جای چرخ‌هایش که برگ‌ها کنار رفته‌اند حرکت کنم.",
    "Afstanden skal være så stor, at du kan standse, hvis bilen foran bremser.",
    "The distance must be large enough for you to stop if the car in front brakes.",
    "فاصله باید آن‌قدر باشد که اگر خودروی جلو ترمز کرد، بتوانید بایستید."),
)

Q(5997, "7.19", picture("""
A car seen from the front at dusk, parked on a gravel lay-by beside a country road: besides its ordinary headlights it has two extra
round lamps mounted on the front bumper.
MUST BE CLEARLY VISIBLE: the two extra round lamps on the front bumper, the ordinary headlights.
MUST NOT APPEAR: text, letters or numbers on the number plate, logos."""),
  "Din bil har to ekstra fjernlyslygter monteret foran. Hvad gælder om at bruge dem?",
  "Your car has two extra main-beam lamps fitted at the front. What applies to using them?",
  "خودروی شما دو چراغ نور بالای اضافه در جلو دارد. درباره‌ی استفاده از آن‌ها چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må kun bruge dem, når jeg også må bruge fjernlys.", "I may only use them when I may also use main beam.",
    "فقط وقتی می‌توانم از آن‌ها استفاده کنم که استفاده از نور بالا هم مجاز باشد.",
    "Ekstra fjernlyslygter er fjernlys, og reglerne for fjernlys gælder også for dem.",
    "Extra main-beam lamps are main beam, and the rules for main beam also apply to them.",
    "چراغ‌های نور بالای اضافه هم نور بالا هستند و قواعد نور بالا برای آن‌ها هم برقرار است."),
  S(True, "Jeg skal slukke dem, når jeg møder en bil, hvis fører kan blive blændet.",
    "I must switch them off when I meet a car whose driver may be dazzled.", "وقتی به خودرویی می‌رسم که ممکن است راننده‌اش خیره شود، باید خاموششان کنم.",
    "Fjernlys må ikke bruges ved møde i en afstand, hvor den modkørende kan blændes.",
    "Main beam must not be used when meeting another vehicle at a distance at which its driver may be dazzled.",
    "هنگام عبور از کنار خودروی روبه‌رو در فاصله‌ای که ممکن است راننده‌اش خیره شود، نباید از نور بالا استفاده کرد."),
  S(False, "Jeg må bruge dem i tæt tåge, fordi de lyser langt frem.", "I may use them in thick fog because they light far ahead.",
    "در مه غلیظ می‌توانم از آن‌ها استفاده کنم، چون تا دوردست را روشن می‌کنند.",
    "Hjælpelygter må kun bruges til det, de er beregnet til, og fjernlys i tåge blænder dig selv.",
    "Auxiliary lamps may only be used for their intended purpose, and main beam in fog dazzles you yourself.",
    "چراغ‌های کمکی فقط برای کاری که برایش ساخته شده‌اند مجازند و نور بالا در مه خودتان را خیره می‌کند."),
  S(False, "Jeg må bruge dem på en godt oplyst vej, så jeg bliver bedre set.",
    "I may use them on a well-lit road so that I am seen better.", "در جاده‌ی پرنور می‌توانم از آن‌ها استفاده کنم تا بهتر دیده شوم.",
    "Fjernlys må ikke bruges på en strækning, hvor vejen er tilstrækkeligt oplyst.",
    "Main beam must not be used on a stretch where the road is sufficiently lit.",
    "در بخشی از جاده که به اندازه‌ی کافی روشن است، نباید از نور بالا استفاده کرد."),
)

Q(5998, "6.1", view("""
THE SCENE: the entrance to a narrow road over an old bridge; at the entrance stands a round white sign with a red border showing a black
silhouette of a vehicle pulling a trailer and below it the black text «3,5 t»; in the right exterior mirror a small trailer coupled to
our car can be seen.
MUST BE CLEARLY VISIBLE: the round sign with the vehicle-and-trailer silhouette and «3,5 t», the trailer in the mirror.
MUST NOT APPEAR: other signs, any other text."""),
  "Ved en bro står denne tavle, der viser et køretøj med påhængsvogn og »3,5 t«. Du trækker en trailer. Bilen vejer med fører og bagage "
  "1,9 t, og traileren vejer med last 1,4 t. Hvad gælder?",
  "By a bridge stands this sign showing a vehicle with a trailer and «3.5 t». You are towing a trailer. The car weighs 1.9 t with driver "
  "and luggage, and the trailer weighs 1.4 t with its load. What applies?",
  "کنار یک پل این تابلو قرار دارد که یک وسیله با یدک و عدد «۳٫۵ تن» را نشان می‌دهد. یدک می‌کشید. خودرو با راننده و بار ۱٫۹ تن و یدک با "
  "بارش ۱٫۴ تن وزن دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må godt køre over broen, fordi vogntoget i alt vejer 3,3 t.", "I may drive over the bridge because the combination weighs "
    "3.3 t in all.", "می‌توانم از پل رد شوم، چون مجموعه روی هم ۳٫۳ تن وزن دارد.",
    "Tavlen forbyder vogntog, hvis samlede faktiske totalvægt er større end den angivne.",
    "The sign prohibits combinations whose combined actual total weight is greater than the one shown.",
    "این تابلو مجموعه‌هایی را ممنوع می‌کند که وزن واقعیِ کلِ آن‌ها بیشتر از عدد نوشته‌شده باشد."),
  S(True, "Lægger jeg så meget mere last i traileren, at vogntoget vejer over 3,5 t, må jeg ikke køre over broen.",
    "If I put so much more load in the trailer that the combination weighs over 3.5 t, I must not drive over the bridge.",
    "اگر آن‌قدر بار بیشتری در یدک بگذارم که وزن مجموعه از ۳٫۵ تن بیشتر شود، نباید از پل رد شوم.",
    "Det er bilens og trailerens samlede faktiske vægt, der tæller.", "It is the combined actual weight of the car and the trailer that "
    "counts.", "وزن واقعیِ مجموعِ خودرو و یدک ملاک است."),
  S(False, "Tavlen gælder kun bilen; traileren tæller ikke med.", "The sign only applies to the car; the trailer does not count.",
    "این تابلو فقط برای خودروست و یدک حساب نمی‌شود.",
    "Tavlen gælder netop hele vogntoget, altså bil og trailer tilsammen.",
    "The sign applies precisely to the whole combination, that is car and trailer together.",
    "این تابلو دقیقاً برای کل مجموعه، یعنی خودرو و یدک با هم، است."),
  S(False, "Det er de tilladte totalvægte i registreringsattesterne, der tæller.",
    "It is the permitted total weights in the registration certificates that count.", "وزن‌های کلِ مجاز در کارت‌های ثبت خودرو ملاک‌اند.",
    "Det er den faktiske vægt med last, der tæller.", "It is the actual weight with the load that counts.", "وزن واقعی با بار ملاک است."),
)

Q(5999, "7.12", town("""
THE SCENE: a junction with traffic lights in town; our light has just turned green; from the RIGHT on the crossing road a car comes fast
towards the junction and is already close to its stop line, although its light is now red, and it does not seem able to stop.
MUST BE CLEARLY VISIBLE: our green light, the car from the right approaching fast close to the junction.
MUST NOT APPEAR: text, readable number plates."""),
  "Dit lys skifter til grønt. Fra højre kommer en bil med høj fart tæt på krydset, selv om den nu har rødt, og den ser ikke ud til at "
  "kunne standse. Hvad gør du?",
  "Your light turns green. From the right a car is coming fast close to the junction, although it now has red, and it does not look "
  "able to stop. What do you do?",
  "چراغ شما سبز می‌شود. از سمت راست خودرویی با سرعت زیاد به تقاطع نزدیک می‌شود، با این‌که حالا چراغش قرمز است، و به نظر نمی‌رسد "
  "بتواند بایستد. چه می‌کنید؟",
  S(True, "Jeg venter med at køre, til jeg er sikker på, at bilen standser eller er kørt forbi.",
    "I wait to drive off until I am sure that the car stops or has gone past.", "صبر می‌کنم تا مطمئن شوم آن خودرو می‌ایستد یا رد شده است.",
    "Grønt lys giver dig lov til at køre, men du skal stadig vise særlig forsigtighed i krydset.",
    "A green light allows you to go, but you must still take special care in the junction.",
    "چراغ سبز به شما اجازه‌ی حرکت می‌دهد، ولی همچنان باید در تقاطع احتیاط ویژه کنید."),
  S(False, "Jeg kører med det samme, fordi jeg har grønt lys.", "I drive off at once because I have a green light.",
    "فوراً حرکت می‌کنم، چون چراغم سبز است.",
    "Det hjælper ikke at have ret, hvis den anden bil kører ind i dig.", "Being in the right does not help if the other car runs into "
    "you.", "اگر آن خودرو به شما بزند، حق داشتن کمکی نمی‌کند."),
  S(False, "Jeg dytter og kører, så føreren ved, at jeg har grønt.", "I sound the horn and go so that the driver knows I have green.",
    "بوق می‌زنم و حرکت می‌کنم تا راننده بداند چراغ من سبز است.",
    "Hornet kan ikke standse bilen; vent, til der ikke længere er fare.", "The horn cannot stop the car; wait until there is no longer "
    "any danger.", "بوق نمی‌تواند آن خودرو را متوقف کند؛ صبر کنید تا دیگر خطری نباشد."),
)

Q(6000, "7.14", view("""
THE SCENE: a two-lane road leading over a motorway on a bridge; just before the bridge a ramp goes off to the LEFT, and at its start
stands a round red sign with a white horizontal bar (no entry), because it is the exit ramp coming up from the motorway; just after
the bridge another ramp goes off to the left, the on-ramp down to the motorway; an oncoming car approaches in the other lane.
MUST BE CLEARLY VISIBLE: the ramp before the bridge with the no-entry sign, the on-ramp after the bridge, the oncoming car.
MUST NOT APPEAR: other signs, text, readable number plates."""),
  "Du skal til venstre ad tilkørslen til motorvejen, som ligger lige efter broen. Før broen går der også en rampe til venstre, men ved "
  "den står en tavle med indkørsel forbudt. En bil kommer imod dig. Hvad gælder?",
  "You are to turn left onto the on-ramp to the motorway, just after the bridge. Before the bridge there is also a ramp to the left, but "
  "a no-entry sign stands at it. A car is coming towards you. What applies?",
  "باید به چپ وارد ورودیِ آزادراه شوید که درست بعد از پل است. پیش از پل هم رمپی به چپ هست، ولی کنارش تابلوی ورود ممنوع قرار دارد. "
  "خودرویی از روبه‌رو می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg svinger først til venstre efter broen, hvor tilkørslen er.", "I only turn left after the bridge, where the on-ramp is.",
    "فقط بعد از پل، جایی که ورودی است، به چپ می‌پیچم.",
    "Rampen før broen er en frakørsel, hvor tavlen forbyder indkørsel med ethvert køretøj.",
    "The ramp before the bridge is an exit ramp, where the sign prohibits entry with any vehicle.",
    "رمپِ پیش از پل یک خروجی است که تابلو ورود هر وسیله‌ای را به آن ممنوع کرده است."),
  S(True, "Jeg holder tilbage for den modkørende bil, før jeg svinger.", "I give way to the oncoming car before I turn.",
    "پیش از پیچیدن به خودروی روبه‌رو راه می‌دهم.",
    "Du må ikke svinge til venstre, før det kan ske uden ulempe for den modkørende færdsel.",
    "You must not turn left until it can be done without inconvenience to oncoming traffic.",
    "تا وقتی پیچیدن به چپ برای ترافیک روبه‌رو مزاحمت ایجاد کند، نباید بپیچید."),
  S(True, "Jeg placerer mig i god tid ind mod midten af vejen og giver tegn til venstre.",
    "I position myself towards the middle of the road in good time and signal left.",
    "به‌موقع به سمت وسط جاده می‌روم و راهنمای چپ می‌زنم.",
    "Ved venstresving skal bilen føres så langt ind mod kørebanens midte som muligt, og tegnet skal gives i god tid.",
    "When turning left the car must be driven as close to the middle of the carriageway as possible, and the signal must be given in "
    "good time.", "هنگام پیچیدن به چپ باید خودرو را تا حد امکان به وسط سواره‌رو برد و به‌موقع علامت داد."),
  S(False, "Jeg kan lige så godt svinge ind ad rampen før broen, fordi begge ramper fører til motorvejen.",
    "I may just as well turn onto the ramp before the bridge because both ramps lead to the motorway.",
    "می‌توانم همان رمپِ پیش از پل را بگیرم، چون هر دو رمپ به آزادراه می‌روند.",
    "Rampen før broen er frakørslen; kører du ind ad den, kommer du til at køre mod kørselsretningen på motorvejen.",
    "The ramp before the bridge is the exit; if you drive in there, you end up driving against the traffic on the motorway.",
    "رمپِ پیش از پل خروجی است؛ اگر واردش شوید، در آزادراه خلاف جهت حرکت خواهید راند."),
)
