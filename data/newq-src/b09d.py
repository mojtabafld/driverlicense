# «آزمون جدید», batch 9 (5801–5900), part d: meeting (7.7), lanes and lane changes (7.4), moving off (7.1), placement (7.2),
# motorways (7.16), lights (7.19), general duties (6.2), anticipating others (4.5), road conditions (5.2), reversing and turning
# round (7.5), distance (7.8), roundabouts (7.15) and the car (1.2).
# Rules: Færdselsloven §§ 6 stk. 1 (nobody may jump on or off a moving vehicle) and stk. 2 (no sledge or the like may be hung behind
# a vehicle), 15 stk. 3, 18 stk. 1–3 and 5 (a turning lane must be used from its start), 20, 21 stk. 3, 26 stk. 2 and 4, 27 stk. 7–8,
# 32 stk. 1, 2 and 5, 33 stk. 2–5 (main beam not when an oncoming or followed driver can be dazzled; fog lamps only in fog or heavy
# rain), 2 nr. 12 (the lighting-up time starts at sunset), 41 stk. 1, 46 stk. 1–2, 47, 67 stk. 1, 87 stk. 2 (anything dropped from
# a vehicle that may be dangerous must be removed at once or others warned); BEK 425/2023: R 11 (lane arrows before a junction),
# yellow marking at road works (§ 54).
from nq import Q, S, above, picture, town, view

Q(5876, "7.7", view("""
THE SCENE: a two-lane country road without a cycle path; ahead, at the right edge of OUR lane, a cyclist rides TOWARDS us, on the wrong
side of the road; further away an oncoming car approaches in the opposite lane.
MUST BE CLEARLY VISIBLE: the cyclist coming towards us in our lane, the oncoming car in the other lane.
MUST NOT APPEAR: signs, text."""),
  "En cyklist kommer imod dig i højre side af din vognbane. Han kører altså i den forkerte side af vejen. Længere fremme kommer en bil imod "
  "dig i den anden vognbane. Hvordan forholder du dig?",
  "A cyclist is coming towards you on the right-hand side of your lane, so he is riding on the wrong side of the road. Further ahead a car "
  "is coming towards you in the other lane. What do you do?",
  "دوچرخه‌سواری در سمت راستِ خط شما به طرف شما می‌آید؛ یعنی در سمت اشتباه جاده می‌راند. جلوتر خودرویی در خط مقابل به سمت شما می‌آید. "
  "چه می‌کنید؟",
  S(True, "Jeg sætter farten ned, så jeg kan passere cyklisten med god afstand, når det kan ske uden fare.",
    "I slow down so that I can pass the cyclist with a good distance when it can be done without danger.",
    "سرعتم را کم می‌کنم تا وقتی بی‌خطر بود، با فاصله‌ی کافی از کنار دوچرخه‌سوار رد شوم.",
    "Du skal holde tilstrækkelig afstand til siden og vise særlig agtpågivenhed over for trafikanter i kørebanens højre side.",
    "You must keep enough distance to the side and take special care with road users on the right-hand side of the carriageway.",
    "باید فاصله‌ی جانبی کافی نگه دارید و نسبت به کسانی که در سمت راست سواره‌رو هستند احتیاط ویژه کنید."),
  S(True, "Jeg er forberedt på, at cyklisten pludselig krydser over til den anden side af vejen.",
    "I am prepared for the cyclist suddenly to cross over to the other side of the road.",
    "آماده‌ام که دوچرخه‌سوار ناگهان به سمت دیگر جاده برود.",
    "En cyklist, der kører i den forkerte side, kan opdage sin fejl og pludselig skifte side.",
    "A cyclist on the wrong side may realise the mistake and suddenly change sides.",
    "دوچرخه‌سواری که در سمت اشتباه است ممکن است متوجه اشتباهش شود و ناگهان تغییر سمت دهد."),
  S(False, "Jeg holder min linje, fordi det er cyklisten, der kører forkert.", "I keep my line because it is the cyclist who is in the wrong.",
    "مسیرم را حفظ می‌کنم، چون این دوچرخه‌سوار است که اشتباه می‌راند.",
    "Du skal gøre, hvad du kan, for at undgå et uheld, også når en anden kører forkert.",
    "You must do what you can to avoid an accident, also when someone else is in the wrong.",
    "باید هر کاری می‌توانید برای جلوگیری از تصادف بکنید، حتی وقتی دیگری اشتباه می‌کند."),
  S(False, "Jeg kører straks ud i den modsatte vognbane for at give plads, selv om bilen kommer imod mig.",
    "I move straight out into the opposite lane to make room, even though the car is coming towards me.",
    "فوراً برای باز کردن جا به خط مقابل می‌روم، با این‌که آن خودرو به طرفم می‌آید.",
    "Du må ikke komme i vejen for den modkørende; vent hellere, til du kan passere cyklisten uden fare.",
    "You must not get in the way of the oncoming car; rather wait until you can pass the cyclist without danger.",
    "نباید سر راه خودروی روبه‌رو قرار بگیرید؛ بهتر است صبر کنید تا بتوانید بی‌خطر از کنار دوچرخه‌سوار رد شوید."),
)

Q(5877, "7.7", view("""
THE SCENE: a country road leading to a short, narrow old stone bridge over a stream, only wide enough for one car at a time; there are
no signs; on the far side an oncoming car approaches the bridge, about as far from it as we are.
MUST BE CLEARLY VISIBLE: the narrow bridge, the oncoming car on the far side, the absence of signs.
MUST NOT APPEAR: signs, text."""),
  "Vejen fører over en smal bro, hvor kun én bil kan komme over ad gangen. Der er ingen tavler. En modkørende bil er lige så langt fra "
  "broen som dig. Hvad gælder?",
  "The road leads over a narrow bridge where only one car can cross at a time. There are no signs. An oncoming car is as far from the "
  "bridge as you are. What applies?",
  "جاده از روی پلی باریک می‌گذرد که هر بار فقط یک خودرو می‌تواند از آن رد شود. تابلویی نیست. خودرویی از روبه‌رو به همان اندازه‌ی شما "
  "از پل فاصله دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Ingen af os har forkørselsret, så vi må vise hinanden hensyn.", "Neither of us has priority, so we must show each other consideration.",
    "هیچ‌کدام حق تقدم نداریم، پس باید ملاحظه‌ی همدیگر را بکنیم.",
    "Uden tavler er der ingen særlig regel om, hvem der skal vente ved en smal bro.",
    "Without signs there is no special rule about who has to wait at a narrow bridge.",
    "بدون تابلو قاعده‌ی خاصی درباره‌ی این‌که چه کسی کنار پل باریک صبر کند وجود ندارد."),
  S(True, "Jeg sætter farten ned og er klar til at vente, hvis den anden kører ind på broen først.",
    "I slow down and am ready to wait if the other driver drives onto the bridge first.",
    "سرعتم را کم می‌کنم و آماده‌ام صبر کنم، اگر راننده‌ی دیگر زودتر وارد پل شد.",
    "Er den modkørende først på broen, skal du lade den komme over.", "If the oncoming car is on the bridge first, you must let it cross.",
    "اگر خودروی روبه‌رو زودتر روی پل باشد، باید بگذارید رد شود."),
  S(False, "Den, der kommer fra højre, har forkørselsret over broen.", "Whoever comes from the right has priority over the bridge.",
    "کسی که از سمت راست می‌آید برای عبور از پل حق تقدم دارد.",
    "Højrevigepligt gælder, hvor færdselsretningerne skærer hinanden, ikke når I møder hinanden.",
    "Giving way to the right applies where paths cross, not when you meet each other.",
    "حق تقدمِ سمت راست جایی است که مسیرها همدیگر را قطع می‌کنند، نه وقتی با هم روبه‌رو می‌شوید."),
  S(False, "Den, der kører hurtigst, skal køre først.", "Whoever is driving fastest should go first.", "کسی که تندتر می‌راند باید اول برود.",
    "Høj fart giver ingen ret, og et kapløb mod broen er farligt.", "High speed gives no right, and a race to the bridge is dangerous.",
    "سرعت بالا حقی نمی‌دهد و مسابقه برای رسیدن به پل خطرناک است."),
)

Q(5878, "7.4", view("""
THE SCENE: a road approaching a junction; about 100 m before the junction a separate right-turn lane begins, branching off to the right
of our lane behind a broken line, with a white right-turn arrow painted in it; our lane continues with a straight-ahead arrow; a short
queue of cars waits in our lane ahead.
MUST BE CLEARLY VISIBLE: the start of the right-turn lane with its arrow, our lane with the straight arrow, the queue.
MUST NOT APPEAR: signs, text."""),
  "Lidt før krydset begynder en særlig vognbane til højresving. Du skal til højre i krydset. Hvad gælder?",
  "A little before the junction a separate lane for turning right begins. You are turning right at the junction. What applies?",
  "کمی پیش از تقاطع، یک خط ویژه‌ی گردش به راست شروع می‌شود. شما در تقاطع به راست می‌پیچید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skifter over i svingbanen der, hvor den begynder.", "I move into the turning lane where it begins.",
    "از همان جایی که خط گردش شروع می‌شود واردش می‌شوم.",
    "En vognbane, der skal benyttes ved svingning, skal benyttes straks fra banens begyndelse.",
    "A lane to be used for turning must be used straight from its beginning.", "خطی که برای گردش است باید از همان ابتدایش استفاده شود."),
  S(True, "Jeg blinker og ser mig for, før jeg kører over i svingbanen.", "I signal and look around before I move into the turning lane.",
    "پیش از رفتن به خط گردش، راهنما می‌زنم و اطرافم را نگاه می‌کنم.",
    "Før du ændrer placering til siden, skal du sikre dig, at det kan ske uden fare.",
    "Before moving sideways you must make sure that it can be done without danger.", "پیش از تغییر جای خود به کنار باید مطمئن شوید که بی‌خطر است."),
  S(False, "Jeg bliver i vognbanen ligeud og skifter først helt fremme ved krydset.",
    "I stay in the straight-ahead lane and only move over right at the junction.", "در خط مستقیم می‌مانم و فقط درست کنار تقاطع خط عوض می‌کنم.",
    "Svingbanen skal bruges fra begyndelsen, og et sent vognbaneskift kan overraske de andre.",
    "The turning lane must be used from its beginning, and a late lane change can surprise the others.",
    "خط گردش باید از ابتدا استفاده شود و تغییر خطِ دیرهنگام ممکن است دیگران را غافلگیر کند."),
  S(False, "Jeg må bruge svingbanen til at køre forbi køen og så køre ligeud i krydset.",
    "I may use the turning lane to drive past the queue and then go straight on at the junction.",
    "می‌توانم از خط گردش برای رد شدن از کنار صف استفاده کنم و بعد در تقاطع مستقیم بروم.",
    "Pile før krydset viser, hvilken retning du skal køre i fra den vognbane, du er i.",
    "Arrows before the junction show which direction you must take from the lane you are in.",
    "فلش‌های پیش از تقاطع نشان می‌دهند از خطی که در آن هستید به کدام جهت باید بروید."),
)

Q(5879, "7.4", view("""
THE SCENE: a motorway with two lanes in our direction; our car is drifting slightly over the broken line to the left without the
indicator on; on the dashboard strip a small symbol of a car between two lines glows, showing that the lane-keeping assistant is
active; the left lane behind us cannot be seen.
MUST BE CLEARLY VISIBLE: our car crossing the broken line, the lane-assistant symbol on the dashboard strip.
MUST NOT APPEAR: signs, text."""),
  "Din bil har en vognbaneassistent. Da du vil skifte vognbane på motorvejen uden at blinke, drejer rattet en smule tilbage. Hvad gælder?",
  "Your car has a lane-keeping assistant. When you try to change lanes on the motorway without signalling, the steering wheel turns back "
  "a little. What applies?",
  "خودرویتان دستیار حفظ خط دارد. وقتی می‌خواهید در آزادراه بدون راهنما خط عوض کنید، فرمان کمی به عقب برمی‌گردد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal blinke, før jeg skifter vognbane på motorvejen.", "I must signal before I change lanes on the motorway.",
    "در آزادراه پیش از تغییر خط باید راهنما بزنم.",
    "På motorvej skal du altid give tegn før vognbaneskift, og assistenten reagerer, fordi du ikke har blinket.",
    "On a motorway you must always signal before changing lanes, and the assistant reacts because you did not signal.",
    "در آزادراه همیشه باید پیش از تغییر خط علامت بدهید و دستیار به این دلیل واکنش نشان می‌دهد که راهنما نزده‌اید."),
  S(False, "Vognbaneassistenten holder altid bilen sikkert i vognbanen, så jeg kan slappe af.",
    "The lane assistant always keeps the car safely in its lane, so I can relax.", "دستیار حفظ خط همیشه خودرو را با اطمینان در خط نگه می‌دارد، پس می‌توانم راحت باشم.",
    "Assistenten kan svigte, fx når striberne er utydelige, og du skal selv styre bilen.",
    "The assistant can fail, for example when the lines are unclear, and you must steer the car yourself.",
    "این دستیار ممکن است کار نکند، مثلاً وقتی خط‌ها واضح نیستند، و خودتان باید خودرو را هدایت کنید."),
  S(False, "Med vognbaneassistent behøver jeg ikke se i spejlet, før jeg skifter vognbane.",
    "With a lane assistant I need not look in the mirror before changing lanes.", "با دستیار حفظ خط لازم نیست پیش از تغییر خط در آینه نگاه کنم.",
    "Assistenten holder ikke øje med andre køretøjer; du skal selv sikre dig, at der er plads.",
    "The assistant does not watch other vehicles; you must make sure yourself that there is room.",
    "این دستیار حواسش به وسیله‌های دیگر نیست؛ خودتان باید مطمئن شوید جا هست."),
  S(False, "Når rattet drejer tilbage, er der altid en bil i vognbanen ved siden af.",
    "When the steering wheel turns back, there is always a car in the lane alongside.",
    "وقتی فرمان به عقب برمی‌گردد، همیشه خودرویی در خط کناری هست.",
    "Vognbaneassistenten reagerer på striberne på vejen, ikke på andre biler.", "The lane assistant reacts to the lines on the road, not to other cars.",
    "دستیار حفظ خط به خط‌کشی جاده واکنش نشان می‌دهد، نه به خودروهای دیگر."),
)

Q(5880, "7.1", town("""
THE SCENE: an empty residential street early in the morning; we are parked at the right kerb behind another parked car; there are no
other road users anywhere in sight; our left indicator lamp glows on the dashboard strip.
MUST BE CLEARLY VISIBLE: the empty street, our position at the kerb.
MUST NOT APPEAR: people, moving vehicles, signs, text.""", cond="early morning, daylight, dry road"),
  "Du holder ved kantstenen og vil køre ud. Gaden er helt tom, og du kan ikke se andre trafikanter. Hvad gælder?",
  "You are parked at the kerb and want to pull out. The street is completely empty, and you cannot see any other road users. What applies?",
  "کنار جدول ایستاده‌اید و می‌خواهید حرکت کنید. خیابان کاملاً خالی است و هیچ کاربر دیگری نمی‌بینید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg giver tegn med blinklyset, før jeg kører ud.", "I signal with the indicator before I pull out.",
    "پیش از حرکت با راهنما علامت می‌دهم.",
    "Du skal give tegn før igangsætning fra kanten af vejen, også når du ikke kan se nogen.",
    "You must signal before moving off from the edge of the road, also when you cannot see anyone.",
    "پیش از حرکت از کنار جاده باید علامت بدهید، حتی وقتی کسی را نمی‌بینید."),
  S(True, "Jeg ser mig godt for, også over skulderen, før jeg kører.", "I look around carefully, also over my shoulder, before I move off.",
    "پیش از حرکت به‌دقت اطرافم را، از جمله از روی شانه، نگاه می‌کنم.",
    "Der kan være nogen, du ikke har set, fx en cyklist i den blinde vinkel eller en gående mellem bilerne.",
    "There may be someone you have not seen, for example a cyclist in the blind spot or a pedestrian between the cars.",
    "ممکن است کسی باشد که ندیده‌اید، مثلاً دوچرخه‌سواری در نقطه‌ی کور یا عابری بین خودروها."),
  S(False, "Når der ikke er nogen i nærheden, behøver jeg ikke blinke.", "When nobody is around, I do not need to signal.",
    "وقتی کسی در اطراف نیست، لازم نیست راهنما بزنم.",
    "Pligten til at give tegn, når du kører ud fra kanten af vejen, gælder altid.",
    "The duty to signal when you pull out from the edge of the road always applies.", "وظیفه‌ی علامت دادن هنگام حرکت از کنار جاده همیشه برقرار است."),
  S(False, "Jeg lader blinklyset blinke, til jeg kommer til det næste kryds.", "I leave the indicator flashing until I reach the next junction.",
    "راهنما را تا تقاطع بعدی روشن می‌گذارم.",
    "Tegnet skal være holdt op, når manøvren er afsluttet, ellers kan andre misforstå, hvad du vil.",
    "The signal must have stopped once the manoeuvre is finished, otherwise others may misunderstand what you intend.",
    "علامت باید با پایان حرکت قطع شود، وگرنه دیگران ممکن است منظورتان را اشتباه بفهمند."),
)

Q(5881, "7.2", view("""
THE SCENE: road works on a motorway; the lanes have been narrowed and are marked with YELLOW lane lines, with a row of orange-and-white
cones along the left edge; in the narrow right lane drives a lorry; we drive in the narrow left lane a little behind the lorry.
MUST BE CLEARLY VISIBLE: the narrow lanes with yellow lines, the cones, the lorry in the right lane.
MUST NOT APPEAR: signs, text."""),
  "Ved et vejarbejde på motorvejen er vognbanerne gjort smallere og afmærket med gule linjer. I højre vognbane kører en lastbil. Du kører i "
  "venstre vognbane. Hvordan forholder du dig?",
  "At road works on the motorway the lanes have been made narrower and are marked with yellow lines. A lorry is driving in the right lane. "
  "You are in the left lane. What do you do?",
  "در محل کار جاده‌ای در آزادراه، خط‌ها باریک‌تر شده و با خط‌های زرد مشخص شده‌اند. در خط راست کامیونی می‌رود. شما در خط چپ هستید. چه می‌کنید؟",
  S(True, "Jeg undgår at køre ved siden af lastbilen på det smalle stykke.", "I avoid driving alongside the lorry on the narrow stretch.",
    "در بخش باریک از رانندگی در کنار کامیون پرهیز می‌کنم.",
    "I de smalle vognbaner er der kun lidt plads til siden, og lastbilen kan komme over i din vognbane.",
    "In the narrow lanes there is little room to the side, and the lorry may drift into your lane.",
    "در خط‌های باریک جای کمی در کنار هست و کامیون ممکن است وارد خط شما شود."),
  S(True, "Jeg holder den hastighed, der er skiltet ved vejarbejdet.", "I keep to the speed that is signed at the road works.",
    "به سرعتی که در محل کار جاده‌ای اعلام شده پایبندم.",
    "Hastighedsgrænsen ved vejarbejdet gælder, og i smalle vognbaner er der brug for lav fart.",
    "The speed limit at the road works applies, and narrow lanes call for a low speed.",
    "حد سرعتِ محل کار جاده‌ای برقرار است و خط‌های باریک سرعت کم می‌طلبند."),
  S(True, "Jeg holder godt fast i rattet og kører midt i min vognbane.", "I hold the steering wheel firmly and drive in the middle of my lane.",
    "فرمان را محکم نگه می‌دارم و وسط خط خودم می‌رانم.",
    "Så har du lidt plads til både lastbilen og afspærringen.", "Then you have a little room both to the lorry and to the barrier.",
    "این‌طور هم تا کامیون و هم تا موانع کمی جا دارید."),
  S(False, "Jeg kører tæt op ad lastbilen, så jeg hurtigt kommer forbi den.", "I drive close up to the lorry so that I get past it quickly.",
    "نزدیکِ کامیون می‌رانم تا سریع از آن رد شوم.",
    "Tæt på lastbilen har du ingen plads, hvis den kommer ud mod dig.", "Close to the lorry you have no room if it moves out towards you.",
    "نزدیکِ کامیون، اگر به سمت شما بیاید، جایی ندارید."),
)

Q(5882, "7.16", view("""
THE SCENE: we drive along the acceleration lane of a motorway; in the right lane of the motorway there is a dense, slow queue of cars
with small gaps; the acceleration lane continues ahead for a good distance; the hard shoulder lies further to the right ahead.
MUST BE CLEARLY VISIBLE: the acceleration lane, the slow queue in the right lane.
MUST NOT APPEAR: signs, text."""),
  "Du kører på accelerationsbanen ind mod motorvejen. Der er tæt kø i højre vognbane, og bilerne kører langsomt. Hvordan forholder du dig?",
  "You are driving along the acceleration lane onto the motorway. There is a dense queue in the right lane, and the cars are moving slowly. "
  "What do you do?",
  "در خط شتاب به سمت آزادراه می‌رانید. در خط راستِ آزادراه صف فشرده‌ای است و خودروها آهسته حرکت می‌کنند. چه می‌کنید؟",
  S(True, "Jeg tilpasser farten til køen og kører ind i et hul, når det kan ske uden fare.",
    "I match my speed to the queue and move into a gap when it can be done without danger.",
    "سرعتم را با صف هماهنگ می‌کنم و وقتی بی‌خطر بود وارد یک فاصله می‌شوم.",
    "Du skal tilpasse farten til trafikken i den vognbane, du skal over i, og forlade accelerationsbanen, når det kan ske uden fare.",
    "You must match your speed to the traffic in the lane you are joining and leave the acceleration lane when it can be done without danger.",
    "باید سرعت را با ترافیکِ خطی که واردش می‌شوید هماهنگ کنید و وقتی بی‌خطر بود از خط شتاب خارج شوید."),
  S(True, "Jeg bruger accelerationsbanen så langt, som det er nødvendigt for at finde et hul.",
    "I use the acceleration lane as far as necessary to find a gap.", "تا هر جا لازم باشد از خط شتاب استفاده می‌کنم تا فاصله‌ای پیدا کنم.",
    "Ved tæt trafik glider det bedst, når bilerne fletter roligt ind efter tur.", "In dense traffic it flows best when cars merge calmly in turn.",
    "در ترافیک فشرده، وقتی خودروها آرام و به‌نوبت وارد شوند، روان‌تر پیش می‌رود."),
  S(False, "I kø må jeg køre ud i nødsporet og ind på motorvejen længere fremme.",
    "In a queue I may drive along the hard shoulder and join the motorway further ahead.",
    "در صف می‌توانم از شانه‌ی اضطراری بروم و جلوتر وارد آزادراه شوم.",
    "Nødsporet må kun bruges i nødsituationer, ikke til at komme forbi en kø.",
    "The hard shoulder may only be used in emergencies, not to get past a queue.", "شانه‌ی اضطراری فقط برای موارد اضطراری است، نه برای رد شدن از صف."),
  S(False, "Bilerne i køen skal standse og lukke mig ind med det samme.", "The cars in the queue must stop and let me in straight away.",
    "خودروهای صف باید فوراً بایستند و مرا راه بدهند.",
    "De skal om nødvendigt lette din indkørsel, men det er dig, der skal finde et hul.",
    "They must make it easier for you to join if necessary, but it is you who must find a gap.",
    "آن‌ها در صورت لزوم باید ورودتان را آسان کنند، ولی این شمایید که باید فاصله‌ای پیدا کنید."),
)

Q(5883, "7.16", view("""
THE SCENE: a motorway seen from our car; the overhead direction signs ahead are seen from behind (plain grey backs without text);
oncoming cars in both lanes come towards us and flash their headlights; the hard shoulder and the crash barrier are on our LEFT.
MUST BE CLEARLY VISIBLE: the backs of the overhead signs, the oncoming cars in our lanes flashing their lights, the hard shoulder on the
left.
MUST NOT APPEAR: text."""),
  "På motorvejen kommer bilerne imod dig i dine vognbaner og blinker med lyset. Du opdager, at du kører mod kørselsretningen. Hvad gør du?",
  "On the motorway the cars are coming towards you in your lanes and flashing their lights. You realise that you are driving against "
  "the traffic. What do you do?",
  "در آزادراه خودروها در خط‌های شما به طرفتان می‌آیند و چراغ می‌زنند. متوجه می‌شوید که خلاف جهت می‌رانید. چه می‌کنید؟",
  S(True, "Jeg standser så langt ude til siden som muligt, helst i nødsporet, og tænder havariblinket.",
    "I stop as far to the side as possible, preferably on the hard shoulder, and switch on the hazard lights.",
    "تا جای ممکن در کنار، ترجیحاً در شانه‌ی اضطراری، می‌ایستم و چراغ‌های خطر را روشن می‌کنم.",
    "Du skal hurtigst muligt væk fra trafikken og advare de andre.", "You must get away from the traffic as quickly as possible and warn the others.",
    "باید هر چه زودتر از مسیر ترافیک دور شوید و به دیگران هشدار دهید."),
  S(True, "Jeg forlader bilen og går i sikkerhed bag autoværnet.", "I leave the car and get to safety behind the crash barrier.",
    "از خودرو پیاده می‌شوم و پشت گاردریل در امان می‌مانم.",
    "Bilen kan blive ramt, så du er mere sikker uden for den.", "The car may be hit, so you are safer outside it.",
    "ممکن است به خودرو برخورد شود، پس بیرون از آن امن‌ترید."),
  S(True, "Jeg ringer 1-1-2 og fortæller, hvor jeg er.", "I call 1-1-2 and say where I am.", "با ۱۱۲ تماس می‌گیرم و می‌گویم کجا هستم.",
    "Politiet kan advare de andre bilister og hjælpe dig væk.", "The police can warn the other drivers and help you away.",
    "پلیس می‌تواند به رانندگان دیگر هشدار دهد و به شما کمک کند دور شوید."),
  S(False, "Jeg vender bilen, så jeg kører den rigtige vej.", "I turn the car round so that I am driving the right way.",
    "خودرو را دور می‌زنم تا در جهت درست برانم.",
    "Det er forbudt at vende på motorvejen, og en vending midt i trafikken er meget farlig.",
    "Turning round on the motorway is forbidden, and turning in the middle of the traffic is very dangerous.",
    "دور زدن در آزادراه ممنوع است و دور زدن وسط ترافیک بسیار خطرناک است."),
)

Q(5884, "7.19", view("""
THE SCENE: an unlit motorway at night with two lanes in each direction separated by a central reservation with a low crash barrier and no
screen; on the other carriageway oncoming cars approach with their headlights on; our main beam lights the road far ahead (the blue
main-beam lamp glows on the dashboard strip); a car drives in our direction far ahead.
MUST BE CLEARLY VISIBLE: the oncoming headlights on the other carriageway, the low central barrier, our main beam on the road.
MUST NOT APPEAR: street lights, signs, text.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt, og du kører med fjernlys på en motorvej uden gadelys. På den anden side af midterrabatten kommer der biler imod dig. "
  "Hvad gælder?",
  "It is dark, and you are driving with main beam on an unlit motorway. On the other side of the central reservation cars are coming "
  "towards you. What applies?",
  "هوا تاریک است و در آزادراهی بدون چراغ خیابان با نور بالا می‌رانید. آن سوی جداکننده‌ی میانی خودروهایی به طرفتان می‌آیند. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg blænder ned, hvis de modkørende på den anden side af midterrabatten kan blive blændet.",
    "I dip my lights if the oncoming drivers on the other side of the central reservation may be dazzled.",
    "اگر رانندگانِ روبه‌رو در آن سوی جداکننده ممکن است خیره شوند، نور را پایین می‌آورم.",
    "Fjernlys må ikke bruges ved møde med andre, der kan blive blændet, heller ikke på motorvej.",
    "Main beam must not be used when meeting others who may be dazzled, also on a motorway.",
    "وقتی دیگرانی از روبه‌رو می‌آیند که ممکن است خیره شوند، نباید از نور بالا استفاده کرد، حتی در آزادراه."),
  S(True, "Jeg blænder også ned, når jeg kommer tæt op bag en bil i samme retning.",
    "I also dip my lights when I come close behind a car going the same way.", "وقتی به خودرویی هم‌جهت نزدیک می‌شوم هم نور را پایین می‌آورم.",
    "Fjernlyset kan blænde føreren foran dig gennem spejlene.", "Main beam can dazzle the driver in front of you through the mirrors.",
    "نور بالا ممکن است از طریق آینه‌ها راننده‌ی جلویی را خیره کند."),
  S(False, "På motorvejen må jeg altid køre med fjernlys, fordi kørebanerne er adskilt.",
    "On the motorway I may always use main beam because the carriageways are separated.",
    "در آزادراه همیشه می‌توانم نور بالا داشته باشم، چون سواره‌روها از هم جدا هستند.",
    "Midterrabatten forhindrer ikke altid blænding, så du skal blænde ned, når andre kan blive blændet.",
    "The central reservation does not always prevent dazzle, so you must dip when others may be dazzled.",
    "جداکننده‌ی میانی همیشه جلوی خیرگی را نمی‌گیرد، پس وقتی دیگران ممکن است خیره شوند، باید نور را پایین بیاورید."),
  S(False, "Fjernlys må aldrig bruges på motorvej.", "Main beam must never be used on a motorway.", "در آزادراه هرگز نباید از نور بالا استفاده کرد.",
    "Fjernlys skal bruges, når vejen ikke er oplyst, og du ellers ikke kan se langt nok frem, så længe du ikke blænder andre.",
    "Main beam must be used when the road is unlit and you could not otherwise see far enough ahead, as long as you do not dazzle others.",
    "وقتی جاده روشن نیست و بدون نور بالا به اندازه‌ی کافی جلو را نمی‌بینید، باید از آن استفاده کنید، به شرطی که کسی را خیره نکنید."),
)

Q(5885, "7.19", view("""
THE SCENE: a country road just after sunset; the sun has gone down behind the fields, but the sky is still fairly light; an oncoming
car has its dipped headlights on; the dashboard strip shows that only our daytime running lights are on.
MUST BE CLEARLY VISIBLE: the light sky just after sunset, the oncoming car with headlights on.
MUST NOT APPEAR: signs, text.""", cond="just after sunset, dusk, dry road"),
  "Solen er lige gået ned, men det er stadig nogenlunde lyst. Du kører på landevejen med bilens kørelys tændt. Hvad gælder?",
  "The sun has just set, but it is still fairly light. You are driving on the country road with the car's daytime running lights on. "
  "What applies?",
  "آفتاب همین حالا غروب کرده، ولی هوا هنوز تا حدی روشن است. در جاده‌ی بیرون شهر با چراغ‌های روشنایی روز می‌رانید. چه قاعده‌ای برقرار است؟",
  S(True, "Lygtetændingstiden er begyndt, fordi solen er gået ned.", "The lighting-up time has begun because the sun has set.",
    "زمان روشن کردن چراغ‌ها شروع شده، چون آفتاب غروب کرده است.",
    "Lygtetændingstiden er tiden fra solnedgang til solopgang og i øvrigt, når mørke eller dårligt vejr gør lygterne nødvendige.",
    "The lighting-up time runs from sunset to sunrise and also whenever darkness or bad weather makes the lights necessary.",
    "زمان روشن کردن چراغ‌ها از غروب تا طلوع آفتاب است و هر وقت تاریکی یا هوای بد چراغ‌ها را لازم کند."),
  S(True, "Kørelyset alene er ikke nok nu.", "The daytime running lights alone are not enough now.", "حالا چراغ‌های روشنایی روز به‌تنهایی کافی نیستند.",
    "I lygtetændingstiden skal de påbudte lygter være tændt, også baglygterne, og kørelyset tænder ofte ikke baglygterne.",
    "In the lighting-up time the required lights must be on, including the rear lights, and the daytime running lights often do not switch "
    "on the rear lights.",
    "در این زمان چراغ‌های الزامی، از جمله چراغ‌های عقب، باید روشن باشند و چراغ روشنایی روز اغلب چراغ‌های عقب را روشن نمی‌کند."),
  S(False, "Jeg skal først tænde nærlyset, når det er helt mørkt.", "I only have to switch on the dipped beam when it is completely dark.",
    "فقط وقتی هوا کاملاً تاریک شد باید نور پایین را روشن کنم.",
    "Lygtetændingstiden begynder allerede ved solnedgang.", "The lighting-up time already begins at sunset.",
    "زمان روشن کردن چراغ‌ها از همان غروب آفتاب شروع می‌شود."),
  S(False, "Jeg tænder tågeforlygterne, så jeg bliver lettere at se i skumringen.", "I switch on the front fog lamps so that I am easier to see at dusk.",
    "مه‌شکن‌های جلو را روشن می‌کنم تا در گرگ‌ومیش بهتر دیده شوم.",
    "Tågelygter må kun bruges i tåge og under kraftig nedbør.", "Fog lamps may only be used in fog and in heavy rain or snow.",
    "چراغ مه‌شکن فقط در مه و بارش شدید مجاز است."),
)

Q(5886, "6.2", picture("""
A quiet residential road covered in snow; a parked car with a tow bar; two children stand behind it holding a wooden sledge with a long
rope and look hopefully at the tow bar; snow-covered gardens on both sides.
MUST BE CLEARLY VISIBLE: the car's tow bar, the children with the sledge and rope.
MUST NOT APPEAR: text, letters or numbers on the number plate, logos."""),
  "Det har sneet, og børnene vil gerne have, at du trækker deres kælk efter bilen på en stille villavej. Hvad gælder?",
  "It has snowed, and the children would like you to tow their sledge behind the car on a quiet residential road. What applies?",
  "برف آمده و بچه‌ها دوست دارند سورتمه‌شان را پشت خودرو در یک خیابان آرام مسکونی بکشید. چه قاعده‌ای برقرار است؟",
  S(True, "Det er forbudt at hænge en kælk efter en bil.", "It is forbidden to hitch a sledge behind a car.", "بستن سورتمه به پشت خودرو ممنوع است.",
    "Slæde, trækvogn eller lignende må ikke hænges efter et køretøj.", "A sledge, a handcart or the like must not be hitched behind a vehicle.",
    "سورتمه، گاری دستی یا چیزی مشابه را نباید به پشت وسیله‌ی نقلیه بست."),
  S(False, "Det er tilladt, hvis jeg kører meget langsomt.", "It is allowed if I drive very slowly.", "اگر خیلی آهسته برانم، مجاز است.",
    "Forbuddet gælder uanset farten, og barnet på kælken kan komme ind under bilen.",
    "The ban applies whatever the speed, and the child on the sledge may end up under the car.",
    "این ممنوعیت در هر سرعتی برقرار است و کودکِ روی سورتمه ممکن است زیر خودرو برود."),
  S(False, "Det er tilladt på en stille villavej, hvor der næsten ikke kommer biler.",
    "It is allowed on a quiet residential road where hardly any cars come.", "در خیابان مسکونیِ آرامی که تقریباً خودرویی نمی‌آید، مجاز است.",
    "Forbuddet gælder på alle veje, også på stille villaveje.", "The ban applies on all roads, also on quiet residential roads.",
    "این ممنوعیت در همه‌ی جاده‌ها، از جمله خیابان‌های مسکونیِ آرام، برقرار است."),
)

Q(5887, "6.2", picture("""
A two-lane country road seen from a little above: a car with an open trailer has stopped at the right edge of the road with its hazard
lights flashing; some way behind it a long wooden plank lies across the right lane; the driver, in a yellow high-visibility vest,
walks back along the verge towards the plank; no other vehicles are near.
MUST BE CLEARLY VISIBLE: the stopped car with the trailer, the plank lying on the road behind it, the driver walking back.
MUST NOT APPEAR: text, letters or numbers on the number plates, logos."""),
  "Et brædt falder af din trailer og bliver liggende på kørebanen. Hvad gør du?",
  "A plank falls off your trailer and stays lying on the carriageway. What do you do?",
  "تخته‌ای از یدکتان می‌افتد و روی سواره‌رو می‌ماند. چه می‌کنید؟",
  S(True, "Jeg holder ind til siden, hvor det er sikkert, og tænder havariblinket.", "I pull in to the side where it is safe and switch on the hazard lights.",
    "جایی که امن است کنار می‌کشم و چراغ‌های خطر را روشن می‌کنم.",
    "Så kan du tage dig af det tabte uden at bringe dig selv eller andre i fare.", "Then you can deal with what you dropped without putting yourself or others in danger.",
    "این‌طور می‌توانید به چیزی که افتاده رسیدگی کنید، بی‌آن‌که خودتان یا دیگران را به خطر بیندازید."),
  S(True, "Kan det ske uden fare, fjerner jeg brædtet fra vejen med det samme.",
    "If it can be done without danger, I remove the plank from the road at once.", "اگر بی‌خطر باشد، فوراً تخته را از جاده برمی‌دارم.",
    "Taber du noget fra køretøjet, som kan være til fare eller ulempe, skal det straks fjernes.",
    "If something that may cause danger or inconvenience falls from your vehicle, it must be removed at once.",
    "اگر چیزی از وسیله‌ی شما بیفتد که ممکن است خطر یا مزاحمت ایجاد کند، باید فوراً برداشته شود."),
  S(True, "Kan jeg ikke fjerne det, advarer jeg de andre, fx med advarselstrekanten, og kontakter politiet.",
    "If I cannot remove it, I warn the others, for example with the warning triangle, and contact the police.",
    "اگر نتوانم برش دارم، با مثلث هشدار یا راهی مشابه به دیگران هشدار می‌دهم و با پلیس تماس می‌گیرم.",
    "Indtil faren er fjernet, skal andre gøres opmærksom på den ved afmærkning eller på lignende måde.",
    "Until the danger has been removed, others must be warned of it by marking or in a similar way.",
    "تا وقتی خطر برطرف نشده، باید با علامت‌گذاری یا روشی مشابه دیگران را باخبر کرد."),
  S(False, "Jeg kører videre, fordi vejvæsenet sørger for at fjerne ting, der ligger på vejen.",
    "I drive on, because the road authority takes care of removing things lying on the road.",
    "به راهم ادامه می‌دهم، چون اداره‌ی راه چیزهای روی جاده را برمی‌دارد.",
    "Det er dit ansvar at fjerne det, du har tabt, eller at advare andre.", "It is your responsibility to remove what you dropped or to warn others.",
    "برداشتن چیزی که انداخته‌اید یا هشدار دادن به دیگران مسئولیت خودتان است."),
)

Q(5888, "6.2", view("""
THE SCENE: a quiet road leading to a driveway on the right with a closed wooden gate; we roll slowly towards the gate; the gate is
just ahead at the roadside.
MUST BE CLEARLY VISIBLE: the closed gate at the driveway just ahead.
MUST NOT APPEAR: people, signs, text."""),
  "Du kører langsomt hen mod en indkørsel med en lukket låge. Din passager vil springe ud, mens bilen stadig ruller, for hurtigt at åbne "
  "lågen. Hvad gælder?",
  "You are driving slowly towards a driveway with a closed gate. Your passenger wants to jump out while the car is still rolling, to open "
  "the gate quickly. What applies?",
  "آهسته به سمت ورودی‌ای با دری بسته می‌رانید. مسافرتان می‌خواهد در حالی که خودرو هنوز حرکت می‌کند بیرون بپرد تا زود در را باز کند. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Jeg standser helt, før passageren stiger ud.", "I stop completely before the passenger gets out.",
    "پیش از پیاده شدن مسافر، کاملاً می‌ایستم.",
    "Ingen må springe af eller på et køretøj, der er i bevægelse.", "Nobody may jump on or off a vehicle that is moving.",
    "هیچ‌کس نباید روی وسیله‌ای که در حرکت است بپرد یا از آن بیرون بپرد."),
  S(False, "Det er i orden, når bilen kører langsommere end gangfart.", "It is fine when the car is moving slower than walking pace.",
    "وقتی خودرو آهسته‌تر از سرعت راه رفتن حرکت می‌کند، اشکالی ندارد.",
    "Forbuddet gælder, uanset hvor langsomt bilen kører.", "The ban applies however slowly the car is moving.",
    "این ممنوعیت، هر قدر هم خودرو آهسته باشد، برقرار است."),
  S(False, "Det er i orden, hvis passageren holder fast i døren.", "It is fine if the passenger holds on to the door.",
    "اگر مسافر در را محکم بگیرد، اشکالی ندارد.",
    "Passageren kan falde og komme ind under bilen; ingen må springe af et køretøj i bevægelse.",
    "The passenger may fall and end up under the car; nobody may jump off a moving vehicle.",
    "مسافر ممکن است بیفتد و زیر خودرو برود؛ هیچ‌کس نباید از وسیله‌ی در حال حرکت بیرون بپرد."),
)

Q(5889, "4.5", view("""
THE SCENE: a road approaching a roundabout; in front of us a car with a foreign number plate (an EU-style plate with a blue strip on the
left, the characters unreadable) drives slowly; its brake lights are on, and the driver leans forward looking at the signs.
MUST BE CLEARLY VISIBLE: the car with the foreign plate braking ahead, the roundabout further ahead.
MUST NOT APPEAR: readable text or numbers, signs."""),
  "Foran dig kører en bil med udenlandsk nummerplade. Føreren kører langsomt, bremser flere gange og ser ud til at lede efter vej. Hvordan "
  "forholder du dig?",
  "In front of you is a car with a foreign number plate. The driver is going slowly, brakes several times and seems to be looking for the "
  "way. What do you do?",
  "جلوی شما خودرویی با پلاک خارجی می‌رود. راننده آهسته می‌راند، چند بار ترمز می‌کند و به نظر می‌رسد دنبال راه می‌گردد. چه می‌کنید؟",
  S(True, "Jeg holder god afstand, fordi bilen kan standse eller svinge uventet.",
    "I keep a good distance because the car may stop or turn unexpectedly.", "فاصله‌ی کافی نگه می‌دارم، چون آن خودرو ممکن است غیرمنتظره بایستد یا بپیچد.",
    "En fører, der leder efter vej, træffer ofte beslutninger i sidste øjeblik.", "A driver looking for the way often makes last-minute decisions.",
    "راننده‌ای که دنبال راه می‌گردد اغلب در لحظه‌ی آخر تصمیم می‌گیرد."),
  S(True, "Jeg er forberedt på, at føreren ikke kender vejen og de danske regler så godt.",
    "I am prepared for the driver not to know the road and the Danish rules very well.",
    "آماده‌ام که راننده جاده و قوانین دانمارک را خوب نشناسد.",
    "En fremmed fører kan være usikker på skilte, cykelstier og vigepligt.", "A visiting driver may be unsure about signs, cycle paths and right of way.",
    "راننده‌ی غریبه ممکن است درباره‌ی تابلوها، مسیرهای دوچرخه و حق تقدم مطمئن نباشد."),
  S(False, "Jeg dytter, så føreren forstår, at han skal køre hurtigere.", "I sound the horn so that the driver understands he must go faster.",
    "بوق می‌زنم تا راننده بفهمد باید تندتر برود.",
    "Hornet må kun bruges for at forebygge eller afværge fare, og det kan gøre føreren endnu mere usikker.",
    "The horn may only be used to prevent or avert danger, and it may make the driver even less sure.",
    "بوق فقط برای پیشگیری یا دفع خطر مجاز است و ممکن است راننده را مضطرب‌تر کند."),
  S(False, "Jeg overhaler med det samme, selv om vi er tæt på rundkørslen.", "I overtake straight away, even though we are close to the roundabout.",
    "فوراً سبقت می‌گیرم، با این‌که به میدان نزدیکیم.",
    "Lige før et kryds eller en rundkørsel må du ikke overhale, og føreren kan svinge uventet.",
    "You must not overtake just before a junction or roundabout, and the driver may turn unexpectedly.",
    "درست پیش از تقاطع یا میدان نباید سبقت بگیرید و راننده ممکن است غیرمنتظره بپیچد."),
)

Q(5890, "4.5", town("""
THE SCENE: a residential street; a little ahead on the right a driveway runs out between two high hedges; the rear of a car is slowly
coming backwards out of the driveway with its reversing lights on; the hedges hide the street from its driver.
MUST BE CLEARLY VISIBLE: the car reversing out between the high hedges, its reversing lights.
MUST NOT APPEAR: signs, text."""),
  "En bil er ved at bakke ud fra en indkørsel til højre foran dig. Høje hække skjuler udsynet for føreren. Hvordan forholder du dig?",
  "A car is reversing out of a driveway on the right in front of you. High hedges block the driver's view. What do you do?",
  "خودرویی جلوی شما در حال بیرون آمدن با دنده‌عقب از ورودی‌ای در سمت راست است. پرچین‌های بلند دید راننده را گرفته‌اند. چه می‌کنید؟",
  S(True, "Jeg sænker farten og holder mig klar til at standse, hvis bilen fortsætter ud.",
    "I reduce speed and keep ready to stop if the car keeps coming out.", "سرعتم را کم می‌کنم و آماده‌ام اگر خودرو بیرون‌تر آمد بایستم.",
    "Bilen kan komme helt ud på vejen foran dig.", "The car may come right out into the road in front of you.",
    "ممکن است آن خودرو کاملاً وارد جاده‌ی جلوی شما شود."),
  S(True, "Jeg regner med, at føreren ikke kan se mig.", "I assume that the driver cannot see me.", "فرض می‌کنم راننده مرا نمی‌بیند.",
    "Hækkene skjuler vejen, så føreren ser dig måske først, når bilen er ude på kørebanen.",
    "The hedges hide the road, so the driver may only see you once the car is out on the carriageway.",
    "پرچین‌ها جاده را پنهان کرده‌اند و ممکن است راننده تنها وقتی شما را ببیند که در سواره‌رو است."),
  S(True, "Om nødvendigt giver jeg et kort lydsignal for at advare føreren.", "If necessary I give a short hoot to warn the driver.",
    "در صورت لزوم با یک بوق کوتاه به راننده هشدار می‌دهم.",
    "Lydsignal må bruges, når det er nødvendigt for at forebygge eller afværge fare.", "The horn may be used when it is necessary to prevent or avert danger.",
    "بوق وقتی مجاز است که برای پیشگیری یا دفع خطر لازم باشد."),
  S(False, "Den, der bakker, har ansvaret, så jeg kan køre videre som normalt.",
    "The one who is reversing is responsible, so I can carry on as normal.", "کسی که دنده‌عقب می‌رود مسئول است، پس می‌توانم عادی ادامه دهم.",
    "Selv om den anden skal passe på, skal du gøre, hvad du kan, for at undgå et uheld.",
    "Even though the other driver has to take care, you must do what you can to avoid an accident.",
    "با این‌که طرف مقابل باید مراقب باشد، شما هم باید هر کاری می‌توانید برای جلوگیری از تصادف بکنید."),
)

Q(5891, "4.5", town("""
THE SCENE: a town street with a pavement on the right but no cycle path; a cyclist rides on the pavement a little ahead of us, heading
towards a lowered kerb at a driveway, as if about to ride down onto the carriageway.
MUST BE CLEARLY VISIBLE: the cyclist on the pavement, the lowered kerb at the driveway ahead of him.
MUST NOT APPEAR: signs, text."""),
  "En cyklist kører på fortovet lidt foran dig. Ved en indkørsel ser det ud til, at han vil køre ned på kørebanen. Hvordan forholder du dig?",
  "A cyclist is riding on the pavement a little ahead of you. At a driveway it looks as if he is going to ride down onto the carriageway. "
  "What do you do?",
  "دوچرخه‌سواری کمی جلوتر از شما روی پیاده‌رو می‌راند. کنار یک ورودی به نظر می‌رسد می‌خواهد وارد سواره‌رو شود. چه می‌کنید؟",
  S(True, "Jeg er forberedt på, at cyklisten pludselig kører ud foran mig uden at se sig for.",
    "I am prepared for the cyclist to ride out in front of me suddenly without looking.",
    "آماده‌ام که دوچرخه‌سوار ناگهان و بدون نگاه کردن جلوی من بیاید.",
    "En cyklist, der allerede kører forkert, kan også overse trafikken på kørebanen.",
    "A cyclist who is already riding where he should not may also overlook the traffic on the carriageway.",
    "دوچرخه‌سواری که از قبل در جای نادرست می‌راند، ممکن است ترافیک سواره‌رو را هم نبیند."),
  S(True, "Jeg sætter farten ned og holder afstand, til jeg ved, hvad han gør.", "I slow down and keep my distance until I know what he will do.",
    "سرعتم را کم می‌کنم و فاصله می‌گیرم تا بفهمم چه می‌کند.",
    "Så har du tid og plads til at reagere.", "Then you have time and room to react.", "این‌طور زمان و جا برای واکنش دارید."),
  S(False, "Cyklister på fortovet kører aldrig ud på kørebanen.", "Cyclists on the pavement never ride out onto the carriageway.",
    "دوچرخه‌سوارانِ روی پیاده‌رو هرگز وارد سواره‌رو نمی‌شوند.",
    "En cyklist kan når som helst køre ned fra fortovet, fx ved en indkørsel.", "A cyclist may come down off the pavement at any time, for example at a driveway.",
    "دوچرخه‌سوار ممکن است هر لحظه، مثلاً کنار یک ورودی، از پیاده‌رو پایین بیاید."),
  S(False, "Han kører ulovligt på fortovet, så det er hans eget ansvar, hvis der sker noget.",
    "He is riding illegally on the pavement, so it is his own responsibility if something happens.",
    "او غیرقانونی روی پیاده‌رو می‌راند، پس اگر اتفاقی بیفتد مسئولیتش با خودش است.",
    "Du skal gøre, hvad du kan, for at undgå et uheld, også når en anden kører forkert.",
    "You must do what you can to avoid an accident, also when someone else is riding wrongly.",
    "باید هر کاری می‌توانید برای جلوگیری از تصادف بکنید، حتی وقتی دیگری اشتباه می‌راند."),
)

Q(5892, "5.2", view("""
THE SCENE: a country road on a cold, clear winter morning; the road surface looks dark and glossy as if wet, while the verges are white
with frost; on the dashboard strip the outside temperature display shows a small snowflake symbol.
MUST BE CLEARLY VISIBLE: the dark, glossy road, the white frost on the verges, the snowflake symbol.
MUST NOT APPEAR: signs, text, readable numbers.""", cond="cold winter morning, frost, black ice"),
  "Det er en kold vintermorgen. Hvad kan tyde på, at der er isglat på vejen?",
  "It is a cold winter morning. What can suggest that there is black ice on the road?",
  "صبح سرد زمستانی است. چه چیزهایی می‌تواند نشان دهد که جاده یخ‌زده و لغزنده است؟",
  S(True, "Dækstøjen bliver pludselig næsten væk.", "The tyre noise suddenly almost disappears.", "صدای لاستیک‌ها ناگهان تقریباً قطع می‌شود.",
    "På is kører dækkene næsten lydløst, fordi de ikke har det normale greb i asfalten.",
    "On ice the tyres run almost silently because they do not have their normal grip on the asphalt.",
    "روی یخ لاستیک‌ها تقریباً بی‌صدا حرکت می‌کنند، چون چسبندگی عادی‌شان به آسفالت را ندارند."),
  S(True, "Rattet føles let, når jeg drejer.", "The steering feels light when I turn.", "فرمان هنگام چرخاندن سبک به نظر می‌رسد.",
    "Når hjulene mister grebet, kræver det næsten ingen kraft at dreje rattet.", "When the wheels lose grip, it takes almost no force to turn the wheel.",
    "وقتی چرخ‌ها چسبندگی را از دست می‌دهند، چرخاندن فرمان تقریباً نیرویی نمی‌خواهد."),
  S(True, "Vejen ser blank og mørk ud, som om den er våd.", "The road looks glossy and dark, as if it were wet.",
    "جاده براق و تیره به نظر می‌رسد، انگار خیس است.",
    "Et tyndt lag is kan ligne en våd vej.", "A thin layer of ice can look like a wet road.", "لایه‌ی نازکی از یخ ممکن است شبیه جاده‌ی خیس باشد."),
  S(True, "Bilens termometer viser omkring 0 °C eller lavere.", "The car's thermometer shows about 0 °C or below.",
    "دماسنج خودرو حدود صفر درجه یا کمتر نشان می‌دهد.",
    "Omkring og under frysepunktet kan fugt på vejen fryse til is.", "Around and below freezing, moisture on the road can freeze into ice.",
    "در دمای نزدیک یا زیر صفر، رطوبت روی جاده ممکن است یخ بزند."),
)

Q(5893, "5.2", view("""
THE SCENE: an open country road between flat fields in winter; a strong side wind blows loose snow across the road in white streaks,
and a low snowdrift has formed across part of our lane ahead; visibility is reduced by the blowing snow.
MUST BE CLEARLY VISIBLE: the blowing snow across the road, the snowdrift in our lane.
MUST NOT APPEAR: signs, text.""", cond="cold, strong wind, blowing snow"),
  "Det blæser kraftigt, og sneen fyger hen over den åbne landevej. Hvordan forholder du dig?",
  "There is a strong wind, and snow is blowing across the open country road. What do you do?",
  "باد شدیدی می‌وزد و برف روی جاده‌ی بازِ بیرون شهر پخش می‌شود. چه می‌کنید؟",
  S(True, "Jeg sænker farten, fordi der pludselig kan ligge snedriver på vejen.",
    "I reduce speed because there may suddenly be snowdrifts on the road.", "سرعتم را کم می‌کنم، چون ممکن است ناگهان تپه‌های برف روی جاده باشد.",
    "Fygesne samler sig hurtigt i driver, især hvor vejen er åben for vinden.",
    "Blowing snow quickly piles up in drifts, especially where the road is open to the wind.",
    "برفِ بادآورده به‌سرعت جمع می‌شود و تپه درست می‌کند، به‌خصوص جایی که جاده در معرض باد است."),
  S(True, "Jeg tænder nærlyset, så jeg er lettere at se i fygesneen.", "I switch on the dipped beam so that I am easier to see in the blowing snow.",
    "نور پایین را روشن می‌کنم تا در برفِ بادآورده بهتر دیده شوم.",
    "Når sigtbarheden er nedsat, skal de påbudte lygter være tændt.", "When visibility is reduced, the required lights must be on.",
    "وقتی دید کم است، چراغ‌های الزامی باید روشن باشند."),
  S(False, "Jeg kører hurtigt gennem snedriverne, så jeg ikke sætter mig fast.", "I drive quickly through the snowdrifts so that I do not get stuck.",
    "با سرعت از تپه‌های برف رد می‌شوم تا گیر نکنم.",
    "Med høj fart kan bilen blive kastet til siden eller skride ud, når den rammer en snedrive.",
    "At high speed the car may be thrown sideways or skid when it hits a snowdrift.",
    "در سرعت بالا خودرو ممکن است هنگام برخورد با تپه‌ی برف به کنار پرتاب شود یا بلغزد."),
  S(False, "Snefygning har kun betydning for lastbiler.", "Blowing snow only matters for lorries.", "برفِ بادآورده فقط برای کامیون‌ها مهم است.",
    "Snedriver og dårligt udsyn er farlige for alle bilister.", "Snowdrifts and poor visibility are dangerous for all drivers.",
    "تپه‌های برف و دید کم برای همه‌ی رانندگان خطرناک است."),
)

Q(5894, "5.2", view("""
THE SCENE: we approach the entry of a roundabout on a grey day; on the circulating carriageway, in the curve right in front of us, a large
patch of spilled diesel shows as a rainbow-coloured sheen on the dark asphalt; no other vehicles in the roundabout.
MUST BE CLEARLY VISIBLE: the rainbow-coloured diesel sheen on the road in the roundabout.
MUST NOT APPEAR: signs, text.""", cond="overcast, damp road"),
  "I rundkørslen foran dig er der spildt diesel, som ses som en regnbuefarvet hinde på asfalten. Hvordan forholder du dig?",
  "Diesel has been spilled in the roundabout ahead, showing as a rainbow-coloured film on the asphalt. What do you do?",
  "در میدانِ جلوی شما گازوئیل ریخته که مثل لایه‌ای رنگین‌کمانی روی آسفالت دیده می‌شود. چه می‌کنید؟",
  S(True, "Jeg kører meget langsomt og undgår at bremse eller dreje kraftigt på det glatte stykke.",
    "I drive very slowly and avoid braking or steering hard on the slippery patch.",
    "خیلی آهسته می‌رانم و روی بخش لغزنده از ترمز یا فرمانِ شدید پرهیز می‌کنم.",
    "Diesel gør vejen meget glat, især i et sving, hvor bilen let skrider ud.",
    "Diesel makes the road very slippery, especially in a curve where the car easily skids.",
    "گازوئیل جاده را بسیار لغزنده می‌کند، به‌خصوص در پیچ که خودرو به‌راحتی سُر می‌خورد."),
  S(False, "Diesel gør asfalten mere ru, så bilen får bedre greb.", "Diesel makes the asphalt rougher, so the car gets better grip.",
    "گازوئیل آسفالت را زبرتر می‌کند و چسبندگی خودرو بیشتر می‌شود.",
    "Det er omvendt: diesel gør vejen glat.", "It is the other way round: diesel makes the road slippery.",
    "برعکس است: گازوئیل جاده را لغزنده می‌کند."),
  S(False, "Jeg sætter farten op, så jeg hurtigt kommer over det glatte stykke.", "I speed up so that I get over the slippery patch quickly.",
    "سرعتم را بیشتر می‌کنم تا سریع از بخش لغزنده رد شوم.",
    "Med højere fart er der større risiko for at skride ud i rundkørslens sving.", "At higher speed there is a greater risk of skidding in the curve of the roundabout.",
    "با سرعت بیشتر، خطر لغزیدن در پیچِ میدان بیشتر است."),
  S(False, "Det er kun glat for motorcykler og cykler.", "It is only slippery for motorcycles and bicycles.", "فقط برای موتورسیکلت و دوچرخه لغزنده است.",
    "Diesel på vejen er farligt for alle køretøjer, selv om tohjulede er særligt udsatte.",
    "Diesel on the road is dangerous for all vehicles, even though two-wheelers are especially at risk.",
    "گازوئیل روی جاده برای همه‌ی وسیله‌ها خطرناک است، هرچند وسیله‌های دوچرخ بیشتر در خطرند."),
)

Q(5895, "7.5", view("""
THE SCENE: a four-lane road in town, two lanes each way, divided by a raised central reservation with low bushes; a little ahead there
is a gap in the central reservation with white shark teeth painted across it, facing traffic that drives through the gap; no signs
forbid turning; on the far carriageway oncoming cars approach.
MUST BE CLEARLY VISIBLE: the gap in the central reservation with the shark teeth, the oncoming cars on the far carriageway.
MUST NOT APPEAR: signs, text."""),
  "Du er kørt forbi den adresse, du skal til. Lidt fremme er der en åbning i midterrabatten med hajtænder. Der er ingen tavle, der forbyder "
  "at vende. Du vil vende i åbningen. Hvad gælder?",
  "You have driven past the address you are going to. A little ahead there is a gap in the central reservation with shark teeth. No sign "
  "forbids turning round. You want to turn round in the gap. What applies?",
  "از نشانی‌ای که می‌خواستید گذشته‌اید. کمی جلوتر در جداکننده‌ی میانی بازشویی با دندان‌کوسه هست. تابلویی دور زدن را ممنوع نکرده است. "
  "می‌خواهید در این بازشو دور بزنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal holde tilbage for trafikken i de modkørende vognbaner, før jeg kører ud.",
    "I must give way to the traffic in the oncoming lanes before I pull out.", "پیش از ورود باید به ترافیکِ خط‌های مقابل راه بدهم.",
    "Hajtænderne betyder ubetinget vigepligt, og du skal sikre dig, at vendingen kan ske uden fare eller ulempe for andre.",
    "The shark teeth mean that you must give way, and you must make sure the turn can be made without danger or inconvenience to others.",
    "دندان‌کوسه یعنی باید راه بدهید و باید مطمئن شوید دور زدن برای دیگران خطر یا مزاحمتی ندارد."),
  S(True, "Jeg blinker til venstre og placerer mig i god tid ind mod midten.", "I signal left and move towards the middle in good time.",
    "راهنمای چپ می‌زنم و به‌موقع به سمت وسط می‌روم.",
    "Du skal give tegn før vending og placere dig, så de bagfrakommende kan se, hvad du vil.",
    "You must signal before turning round and position yourself so that those behind can see what you intend.",
    "پیش از دور زدن باید علامت بدهید و طوری قرار بگیرید که پشت‌سری‌ها بفهمند چه می‌خواهید."),
  S(False, "Det er altid forbudt at vende i byen.", "Turning round is always forbidden in town.", "دور زدن در شهر همیشه ممنوع است.",
    "Vending er tilladt, hvor ingen tavle forbyder det, og den kan ske uden fare eller ulempe.",
    "Turning round is allowed where no sign forbids it and it can be done without danger or inconvenience.",
    "دور زدن جایی که تابلویی منعش نکرده و بی‌خطر و بی‌مزاحمت باشد، مجاز است."),
  S(False, "Trafikken i de modkørende vognbaner skal holde tilbage, når jeg har blinket.",
    "The traffic in the oncoming lanes must give way once I have signalled.", "ترافیکِ خط‌های مقابل باید بعد از راهنما زدنم به من راه بدهد.",
    "Blinklyset giver dig ingen ret; det er dig, der har vigepligt.", "The indicator gives you no right; it is you who must give way.",
    "راهنما حقی به شما نمی‌دهد؛ شمایید که باید راه بدهید."),
)

Q(5896, "7.5", town("""
THE SCENE: a town street with cars parked along the right kerb; there is one free space; we have stopped in the lane just ahead of the
free space with the right indicator flashing, ready to reverse into it; in the interior rear-view mirror at the top of the picture a car
has stopped very close behind us.
MUST BE CLEARLY VISIBLE: the free space at the kerb behind us on the right, the car close behind in the mirror.
MUST NOT APPEAR: signs, text."""),
  "Du har standset lidt foran en ledig plads ved kantstenen og vil bakke ind på den. Bag dig holder en bil helt tæt. Hvordan forholder du "
  "dig?",
  "You have stopped just ahead of a free space at the kerb and want to reverse into it. A car has stopped right behind you. What do you do?",
  "کمی جلوتر از یک جای خالیِ کنار جدول ایستاده‌اید و می‌خواهید با دنده‌عقب واردش شوید. خودرویی خیلی نزدیک پشت شما ایستاده است. چه می‌کنید؟",
  S(True, "Jeg giver tegn mod højre, så føreren bag mig kan se, at jeg vil parkere.",
    "I signal right so that the driver behind me can see that I want to park.", "راهنمای راست می‌زنم تا راننده‌ی پشت سر بفهمد می‌خواهم پارک کنم.",
    "Tegnet viser de andre, hvad du vil, så de kan indrette sig efter det.", "The signal shows the others what you intend so that they can adapt.",
    "علامت به دیگران نشان می‌دهد چه می‌خواهید تا خودشان را با آن هماهنگ کنند."),
  S(True, "Jeg bakker først, når jeg har sikret mig, at det kan ske uden fare.", "I only reverse once I have made sure it can be done without danger.",
    "فقط وقتی دنده‌عقب می‌روم که مطمئن شوم بی‌خطر است.",
    "Før bakning skal du sikre dig, at manøvren kan udføres uden fare eller ulempe for andre.",
    "Before reversing you must make sure that the manoeuvre can be done without danger or inconvenience to others.",
    "پیش از دنده‌عقب باید مطمئن شوید که این کار برای دیگران خطر یا مزاحمتی ندارد."),
  S(True, "Kan bilen bag mig ikke give plads, opgiver jeg pladsen og finder en anden.",
    "If the car behind me cannot make room, I give up the space and find another.",
    "اگر خودروی پشت سر نتواند جا باز کند، از آن جا صرف‌نظر می‌کنم و جای دیگری پیدا می‌کنم.",
    "Du må ikke bakke ind i den bil, der holder bag dig, og den kan være forhindret i at bakke.",
    "You must not reverse into the car behind you, and it may be unable to reverse.",
    "نباید با دنده‌عقب به خودروی پشت سر بزنید و ممکن است آن خودرو نتواند عقب برود."),
  S(False, "Bilen bag mig skal altid bakke, så jeg kan komme ind.", "The car behind me must always reverse so that I can get in.",
    "خودروی پشت سر همیشه باید عقب برود تا من بتوانم وارد شوم.",
    "Du kan ikke kræve, at andre bakker; det er dig, der skal sikre dig, at manøvren kan ske uden fare.",
    "You cannot demand that others reverse; it is you who must make sure the manoeuvre can be done without danger.",
    "نمی‌توانید از دیگران بخواهید عقب بروند؛ این شمایید که باید مطمئن شوید این کار بی‌خطر است."),
)

Q(5897, "7.8", town("""
THE SCENE: a town street; we drive behind a city bus; a little ahead at the right kerb there is a bus stop with people waiting.
MUST BE CLEARLY VISIBLE: the bus in front of us, the bus stop with waiting people ahead.
MUST NOT APPEAR: signs, text, logos."""),
  "Du kører i byen bag en bybus. Hvilken afstand holder du?",
  "You are driving in town behind a city bus. What distance do you keep?",
  "در شهر پشت یک اتوبوس شهری می‌رانید. چه فاصله‌ای نگه می‌دارید؟",
  S(True, "Jeg holder god afstand, fordi bussen ofte standser ved stoppestederne.",
    "I keep a good distance because the bus often stops at the bus stops.", "فاصله‌ی کافی نگه می‌دارم، چون اتوبوس اغلب در ایستگاه‌ها می‌ایستد.",
    "Med god afstand kan du nå at standse og se forbi bussen, når den holder ind.",
    "With a good distance you can stop in time and see past the bus when it pulls in.",
    "با فاصله‌ی کافی می‌توانید به‌موقع بایستید و وقتی اتوبوس کنار می‌کشد، از کنارش ببینید."),
  S(False, "Jeg kører tæt bag bussen, så andre biler ikke kan komme ind foran mig.",
    "I drive close behind the bus so that other cars cannot get in front of me.", "نزدیکِ پشت اتوبوس می‌رانم تا خودروهای دیگر جلوی من نیایند.",
    "Tæt bag bussen kan du hverken se, hvad der sker foran den, eller nå at bremse.",
    "Close behind the bus you can neither see what is happening in front of it nor brake in time.",
    "نزدیکِ پشت اتوبوس نه می‌بینید جلوی آن چه خبر است و نه به‌موقع ترمز می‌کنید."),
  S(False, "Afstanden er ligegyldig, fordi bussen altid bremser blødt af hensyn til passagererne.",
    "The distance does not matter because the bus always brakes gently for the sake of its passengers.",
    "فاصله مهم نیست، چون اتوبوس به خاطر مسافرانش همیشه نرم ترمز می‌کند.",
    "En bus kan også være nødt til at bremse kraftigt, og du kan ikke se, hvad der sker foran den.",
    "A bus may also have to brake hard, and you cannot see what is happening in front of it.",
    "اتوبوس هم ممکن است مجبور به ترمز شدید شود و شما نمی‌بینید جلوی آن چه خبر است."),
)

Q(5898, "7.8", view("""
THE SCENE: a steep uphill street in town with a slow queue of cars; the car in front of us has stopped on the slope; the steepness of
the hill is clear from the angle of the road and the houses.
MUST BE CLEARLY VISIBLE: the steep slope, the car in front stopped on the hill.
MUST NOT APPEAR: signs, text."""),
  "Du holder i kø op ad en stejl bakke bag en anden bil. Hvad gælder for afstanden?",
  "You are queueing up a steep hill behind another car. What applies to the distance?",
  "در صفی در سربالاییِ تند پشت خودرویی ایستاده‌اید. درباره‌ی فاصله چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder ekstra god afstand, fordi bilen foran kan rulle lidt tilbage, når den sætter i gang.",
    "I keep an extra good distance because the car in front may roll back a little when it moves off.",
    "فاصله‌ی بیشتری نگه می‌دارم، چون خودروی جلو ممکن است هنگام حرکت کمی عقب بیاید.",
    "Ved igangsætning op ad bakke kan en bil rulle et stykke tilbage, før den kører frem.",
    "When moving off uphill a car may roll back a little before it moves forward.",
    "هنگام حرکت در سربالایی ممکن است خودرو پیش از جلو رفتن کمی عقب بیاید."),
  S(True, "Er vejen glat, holder jeg endnu mere afstand, fordi bilen foran kan få svært ved at komme op ad bakken.",
    "If the road is slippery, I keep even more distance because the car in front may have trouble getting up the hill.",
    "اگر جاده لغزنده باشد، فاصله‌ی بیشتری می‌گیرم، چون ممکن است خودروی جلو به‌سختی از سربالایی بالا برود.",
    "På glat føre kan hjulene spinde, og bilen kan glide tilbage.", "On a slippery surface the wheels may spin and the car may slide back.",
    "در سطح لغزنده چرخ‌ها ممکن است درجا بچرخند و خودرو به عقب سُر بخورد."),
  S(False, "Afstanden er ligegyldig, når bilerne holder stille.", "The distance does not matter when the cars are standing still.",
    "وقتی خودروها ایستاده‌اند، فاصله اهمیتی ندارد.",
    "Selv i kø kan bilen foran rulle tilbage, og du har brug for plads til at komme fri.",
    "Even in a queue the car in front may roll back, and you need room to get clear.",
    "حتی در صف ممکن است خودروی جلو عقب بیاید و شما برای رها شدن به جا نیاز دارید."),
)

Q(5899, "7.15", view("""
THE SCENE: we approach the entry of a roundabout; just before the white shark teeth at the entry there is a zebra crossing across our
lane; a woman with a pram is about to step onto the crossing from the right; at the same time cars are driving round in the
roundabout from the left.
MUST BE CLEARLY VISIBLE: the zebra crossing before the shark teeth, the woman with the pram, the cars in the roundabout.
MUST NOT APPEAR: signs, text."""),
  "Ved indkørslen til en rundkørsel er der et fodgængerfelt før hajtænderne. En kvinde med en barnevogn er på vej ud på feltet, og samtidig "
  "kommer der biler i rundkørslen fra venstre. Hvordan forholder du dig?",
  "At the entry to a roundabout there is a pedestrian crossing before the shark teeth. A woman with a pram is about to step onto the "
  "crossing, and at the same time cars are coming round the roundabout from the left. What do you do?",
  "در ورودی یک میدان، پیش از دندان‌کوسه‌ها گذرگاه عابری هست. زنی با کالسکه در حال وارد شدن به گذرگاه است و هم‌زمان خودروهایی از چپ در "
  "میدان می‌آیند. چه می‌کنید؟",
  S(True, "Jeg standser før fodgængerfeltet og lader kvinden gå over.", "I stop before the crossing and let the woman cross.",
    "پیش از گذرگاه می‌ایستم و می‌گذارم آن زن رد شود.",
    "Ved et fodgængerfelt uden signal skal du om nødvendigt standse for gående, der er på vej ud i feltet.",
    "At a crossing without signals you must stop if necessary for pedestrians who are about to step onto it.",
    "در گذرگاه بدون چراغ باید در صورت لزوم برای عابرانی که در حال وارد شدن به آن‌اند بایستید."),
  S(True, "Jeg holder ikke stille i fodgængerfeltet, mens jeg venter på et hul i rundkørslen.",
    "I do not wait on the crossing while I wait for a gap in the roundabout.", "هنگام انتظار برای فاصله در میدان، روی گذرگاه نمی‌ایستم.",
    "Du skal så vidt muligt undgå at standse i fodgængerfeltet.", "You must avoid stopping on the pedestrian crossing as far as possible.",
    "تا جای ممکن باید از ایستادن روی گذرگاه عابر پرهیز کنید."),
  S(True, "Jeg ser både efter de gående og efter trafikken i rundkørslen, før jeg kører.",
    "I look both for the pedestrians and for the traffic in the roundabout before I drive.",
    "پیش از حرکت هم به عابران و هم به ترافیک میدان نگاه می‌کنم.",
    "Ser du kun til venstre efter et hul, kan du overse en gående foran bilen.", "If you only look left for a gap, you may miss a pedestrian in front of the car.",
    "اگر فقط برای پیدا کردن فاصله به چپ نگاه کنید، ممکن است عابرِ جلوی خودرو را نبینید."),
  S(False, "Jeg ser kun til venstre efter trafikken i rundkørslen, for de gående skal vente på bilerne.",
    "I only look left for the traffic in the roundabout, because pedestrians must wait for cars.",
    "فقط به چپ به ترافیک میدان نگاه می‌کنم، چون عابران باید منتظر خودروها بمانند.",
    "Ved fodgængerfeltet er det de gående, der skal have lov at gå over.", "At the crossing it is the pedestrians who must be allowed to cross.",
    "در گذرگاه این عابران‌اند که باید اجازه‌ی عبور داشته باشند."),
)

Q(5900, "1.2", view("""
THE SCENE: a main road in winter; a lorry ahead throws up dirty, salty spray; our windscreen is getting grey and smeared, with a dull film
over most of it; on the dashboard strip a small warning symbol for empty washer fluid glows.
MUST BE CLEARLY VISIBLE: the grey, smeared windscreen, the spray from the lorry, the washer-fluid warning symbol.
MUST NOT APPEAR: signs, text.""", cond="winter, wet salty road"),
  "Det er vinter, og bilerne foran sprøjter saltvand op. Sprinklervæsken er brugt op, og forruden bliver mere og mere grå. Hvad gør du?",
  "It is winter, and the vehicles in front throw up salty spray. The washer fluid has run out, and the windscreen is getting greyer and "
  "greyer. What do you do?",
  "زمستان است و خودروهای جلویی آب نمک به هوا می‌پاشند. مایع شیشه‌شوی تمام شده و شیشه‌ی جلو هر لحظه کدرتر می‌شود. چه می‌کنید؟",
  S(True, "Jeg holder ind et sikkert sted, gør ruden ren og fylder sprinklervæske på, før jeg kører videre.",
    "I pull in at a safe place, clean the windscreen and fill up with washer fluid before driving on.",
    "جایی امن کنار می‌کشم، شیشه را تمیز می‌کنم و پیش از ادامه‌ی راه مایع شیشه‌شوی می‌ریزم.",
    "Du skal have frit udsyn, og en snavset rude kan blænde dig, især i modlys og mørke.",
    "You must have a clear view, and a dirty windscreen can dazzle you, especially against the light and in the dark.",
    "باید دید آزاد داشته باشید و شیشه‌ی کثیف، به‌خصوص در نور روبه‌رو و تاریکی، ممکن است شما را خیره کند."),
  S(False, "Jeg bruger viskerne uden væske; så bliver ruden ren nok.", "I use the wipers without fluid; then the windscreen will be clean enough.",
    "برف‌پاک‌کن را بدون مایع روشن می‌کنم؛ شیشه به اندازه‌ی کافی تمیز می‌شود.",
    "Uden væske tværer viskerne saltet og snavset ud, så du ser endnu dårligere.",
    "Without fluid the wipers smear the salt and dirt, so you see even worse.", "بدون مایع، برف‌پاک‌کن نمک و کثیفی را پخش می‌کند و دیدتان بدتر می‌شود."),
  S(False, "Jeg kører tættere på bilen foran, så jeg bedre kan se dens baglygter.",
    "I drive closer to the vehicle in front so that I can see its rear lights better.", "به خودروی جلو نزدیک‌تر می‌شوم تا چراغ‌های عقبش را بهتر ببینم.",
    "Tæt bagved får du endnu mere snavs på ruden og har ikke plads til at bremse.",
    "Close behind you get even more dirt on the windscreen and have no room to brake.",
    "از نزدیک کثیفیِ بیشتری روی شیشه می‌نشیند و جایی برای ترمز ندارید."),
)
