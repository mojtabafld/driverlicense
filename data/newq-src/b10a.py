# «آزمون جدید», batch 10 (5901–6000), part a: stopping and parking (7.18), overtaking (7.9), signs (6.1) and people and animals
# beside the road (7.6).
# Rules: Færdselsloven §§ 2 nr. 18 (setting down a passenger is not parking), 9 stk. 2, 20 (the vehicle with the obstruction on its
# side stops if necessary), 21 stk. 3 nr. 2 and 4 (do not overtake one who is overtaking; be able to rejoin without inconvenience),
# 19 (the duty to let a bus leave its stop applies in built-up areas), 28 stk. 1–2, 29 stk. 3 nr. 3 (no parking on the carriageway
# of a main road outside built-up areas), 31 stk. 2, 32 stk. 1, 41 stk. 1–3; BEK 425/2023: § 6 (temporary signs on a yellow plate),
# § 18 stk. 3 (beboerkørsel: the vehicle is driven by or carries someone who lives or has a business on the stretch), A 37, A 43,3,
# A 97, B 16, C 22,2, C 31 (for a combination the limit applies to each vehicle), C 62, E 18 (a thin white line: the road goes on
# as a path), V 50 (a sign symbol on the carriageway supplements the sign), § 69 Z 93 (yellow flashing light, e.g. at pedestrian
# crossings: take special care).
from nq import Q, S, above, picture, town, view

Q(5901, "7.18", view("""
THE SCENE: a straight main road outside town; on the right verge stands the Danish main-road sign (a yellow square turned on its
corner, with a white border); a little ahead on the right a house with a garden gate and, beyond it, a wide firm grass verge.
MUST BE CLEARLY VISIBLE: the main-road sign, the house with the gate, the firm verge.
MUST NOT APPEAR: other signs, text."""),
  "Du kører på en hovedvej uden for byen. Du vil standse kort i vejkanten og lade en passager stige ud ved et hus. Bagefter overvejer du at "
  "blive holdende og vente en halv time på passageren. Hvad gælder?",
  "You are driving on a main road outside town. You want to stop briefly at the roadside and let a passenger out at a house. Afterwards "
  "you are thinking of staying there and waiting half an hour for the passenger. What applies?",
  "در یک جاده‌ی اصلی بیرون شهر می‌رانید. می‌خواهید کوتاه کنار جاده بایستید و مسافری را جلوی خانه‌ای پیاده کنید. بعد فکر می‌کنید همان‌جا "
  "بمانید و نیم ساعت منتظر مسافر باشید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må godt standse kort og lade passageren stige ud, hvis det ikke er til fare eller ulempe.",
    "I may stop briefly and let the passenger out if it causes no danger or inconvenience.",
    "اگر خطر یا مزاحمتی نداشته باشد، می‌توانم کوتاه بایستم و مسافر را پیاده کنم.",
    "På hovedvejen er det parkering på kørebanen, der er forbudt, og af- og påstigning er ikke parkering.",
    "On the main road it is parking on the carriageway that is forbidden, and setting down or picking up is not parking.",
    "در جاده‌ی اصلی پارک روی سواره‌رو ممنوع است و سوار و پیاده کردن مسافر پارک حساب نمی‌شود."),
  S(True, "Jeg må ikke blive holdende på kørebanen og vente en halv time.", "I must not stay on the carriageway and wait for half an hour.",
    "نباید نیم ساعت روی سواره‌رو بمانم و منتظر باشم.",
    "At vente så længe er parkering, og parkering på kørebanen er forbudt på hovedveje uden for byen.",
    "Waiting that long is parking, and parking on the carriageway is forbidden on main roads outside towns.",
    "این‌قدر منتظر ماندن پارک است و پارک روی سواره‌روِ جاده‌های اصلیِ بیرون شهر ممنوع است."),
  S(True, "Vil jeg vente, holder jeg helt uden for kørebanen, fx på en parkeringsplads eller i den faste rabat, hvis det ikke er forbudt.",
    "If I want to wait, I stand completely off the carriageway, for example in a car park or on the firm verge if it is not forbidden.",
    "اگر بخواهم منتظر بمانم، کاملاً بیرون از سواره‌رو می‌ایستم، مثلاً در پارکینگ یا روی شانه‌ی سفت جاده، اگر ممنوع نباشد.",
    "Forbuddet gælder kørebanen; uden for den må du parkere, hvis ingen anden regel forbyder det.",
    "The ban applies to the carriageway; off it you may park if no other rule forbids it.",
    "این ممنوعیت برای سواره‌روست؛ بیرون از آن، اگر قاعده‌ی دیگری منع نکند، می‌توانید پارک کنید."),
  S(False, "På en hovedvej må jeg heller ikke standse kort for at lade en passager stige ud.",
    "On a main road I must not even stop briefly to let a passenger out.", "در جاده‌ی اصلی حتی برای پیاده کردن مسافر هم نباید کوتاه بایستم.",
    "Forbuddet gælder parkering på kørebanen, ikke en kort standsning for af- og påstigning.",
    "The ban applies to parking on the carriageway, not to a short stop to set down or pick up.",
    "این ممنوعیت برای پارک روی سواره‌روست، نه برای توقف کوتاه جهت سوار و پیاده کردن."),
)

Q(5902, "7.18", town("""
THE SCENE: a town street with parking along the right kerb; at the kerb stands a temporary sign: a round parking-ban sign (blue centre,
red border and one red diagonal bar) mounted on a yellow rectangular background plate with a black border, with a small white plate
under it carrying black text that cannot be read; the space at the kerb by the sign is free.
MUST BE CLEARLY VISIBLE: the temporary parking-ban sign on its yellow background plate, the free space at the kerb.
MUST NOT APPEAR: readable text, other signs."""),
  "Ved kantstenen står en midlertidig tavle med parkeringsforbud på en gul plade. Undertavlen viser, at forbuddet gælder i dag kl. 7–16. "
  "Klokken er 10. Hvad gælder?",
  "At the kerb stands a temporary parking-ban sign on a yellow plate. The plate under it shows that the ban applies today from 7 to 16. "
  "It is 10 o'clock. What applies?",
  "کنار جدول یک تابلوی موقتِ ممنوعیت پارک روی صفحه‌ای زرد نصب شده است. زیرتابلو نشان می‌دهد که ممنوعیت امروز از ساعت ۷ تا ۱۶ است. ساعت "
  "۱۰ است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke parkere her nu.", "I must not park here now.", "الان نباید این‌جا پارک کنم.",
    "En midlertidig tavle på gul plade skal følges lige så vel som en fast tavle.",
    "A temporary sign on a yellow plate must be obeyed just like a permanent one.", "تابلوی موقت روی صفحه‌ی زرد هم مثل تابلوی دائمی باید رعایت شود."),
  S(True, "Jeg må godt standse kort og lade en passager stige ud, hvis det kan ske uden fare.",
    "I may stop briefly and let a passenger out if it can be done without danger.", "اگر بی‌خطر باشد، می‌توانم کوتاه بایستم و مسافری را پیاده کنم.",
    "Tavlen forbyder parkering, og en kort standsning for af- og påstigning er ikke parkering.",
    "The sign forbids parking, and a short stop to let someone get out is not parking.",
    "این تابلو پارک را ممنوع می‌کند و توقف کوتاه برای پیاده کردن مسافر پارک حساب نمی‌شود."),
  S(False, "Midlertidige tavler er kun anbefalinger.", "Temporary signs are only recommendations.", "تابلوهای موقت فقط توصیه‌اند.",
    "Midlertidige tavler gælder på samme måde som faste tavler.", "Temporary signs apply in the same way as permanent signs.",
    "تابلوهای موقت مثل تابلوهای دائمی معتبرند."),
  S(False, "Forbuddet gælder ikke, fordi der ikke er nogen gul linje på kantstenen.",
    "The ban does not apply because there is no yellow line on the kerb.", "این ممنوعیت برقرار نیست، چون روی جدول خط زردی نیست.",
    "Tavlen alene er nok til at forbyde parkering.", "The sign on its own is enough to forbid parking.", "خود تابلو برای ممنوع کردن پارک کافی است."),
)

Q(5903, "7.18", view("""
THE SCENE: a country road with a small lay-by on the right; our car has pulled into the lay-by, but the lay-by is too short, so the rear
of our car still sticks out into the right lane, as seen in the right exterior mirror; a car approaches from behind.
MUST BE CLEARLY VISIBLE: the short lay-by, our car's rear sticking out into the lane in the mirror, the car approaching behind.
MUST NOT APPEAR: signs, text."""),
  "Du holder ind i en parkeringslomme ved landevejen for at tale i telefon. Lommen er lidt for kort, så bagenden af din bil rager ud i "
  "vognbanen. Hvad gælder?",
  "You pull into a lay-by on the country road to make a phone call. The lay-by is a little too short, so the back of your car sticks out "
  "into the lane. What applies?",
  "برای تلفن زدن به یک فضای توقف کنار جاده‌ی بیرون شهر می‌روید. این فضا کمی کوتاه است و عقب خودرو در خط عبور بیرون مانده است. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg kører videre og finder et sted, hvor bilen kan holde helt uden for kørebanen.",
    "I drive on and find a place where the car can stand completely off the carriageway.",
    "ادامه می‌دهم و جایی پیدا می‌کنم که خودرو کاملاً بیرون از سواره‌رو بایستد.",
    "Bilen må ikke holde, så den er til fare eller ulempe for den øvrige færdsel.",
    "The car must not stand where it causes danger or inconvenience to other traffic.", "خودرو نباید جایی بایستد که برای بقیه‌ی ترافیک خطر یا مزاحمت ایجاد کند."),
  S(False, "Det er i orden, når jeg tænder havariblinket.", "It is fine when I switch on the hazard lights.", "اگر چراغ‌های خطر را روشن کنم، مشکلی نیست.",
    "Havariblinket gør det ikke ufarligt at holde ude i vognbanen.", "The hazard lights do not make it safe to stand out in the lane.",
    "چراغ‌های خطر ایستادن در خط عبور را بی‌خطر نمی‌کنند."),
  S(False, "Det er i orden, fordi det kun er bagenden, der rager ud.", "It is fine because only the back sticks out.",
    "مشکلی نیست، چون فقط عقب خودرو بیرون است.",
    "Også en bagende ude i vognbanen kan blive ramt af en bil, der kommer bagfra.",
    "Even the back of a car out in the lane can be hit by a car coming from behind.", "حتی عقبِ خودرو در خط عبور هم ممکن است با خودرویی که از پشت می‌آید برخورد کند."),
)

Q(5904, "7.9", view("""
THE SCENE: a two-lane country road; we are in the oncoming lane overtaking a car and have almost drawn level with it; that car's LEFT
indicator has just started flashing, and a little ahead on the left a driveway leads off the road; no oncoming traffic.
MUST BE CLEARLY VISIBLE: the car beside and slightly ahead of us with its left indicator flashing, the driveway on the left.
MUST NOT APPEAR: signs, text."""),
  "Du er ved at overhale en bil på landevejen. Da du næsten er ved siden af den, begynder den at blinke til venstre mod en indkørsel. "
  "Hvordan forholder du dig?",
  "You are overtaking a car on the country road. When you are almost alongside it, it starts signalling left towards a driveway. What do "
  "you do?",
  "در جاده‌ی بیرون شهر در حال سبقت از خودرویی هستید. وقتی تقریباً کنارش رسیده‌اید، به سمت ورودی‌ای در چپ راهنما می‌زند. چه می‌کنید؟",
  S(True, "Jeg bremser og er klar til at opgive overhalingen.", "I brake and am ready to abandon the overtaking.",
    "ترمز می‌کنم و آماده‌ام از سبقت منصرف شوم.",
    "Bilen kan svinge ind foran dig, og du skal gøre, hvad du kan, for at undgå et sammenstød.",
    "The car may turn in front of you, and you must do what you can to avoid a collision.",
    "ممکن است آن خودرو جلوی شما بپیچد و باید هر کاری می‌توانید برای جلوگیری از برخورد بکنید."),
  S(True, "Er det nødvendigt for at undgå et sammenstød, advarer jeg føreren med et kort dyt.", "If it is necessary to avoid a collision, I warn the driver with a short hoot.",
    "اگر برای جلوگیری از برخورد لازم باشد، با یک بوق کوتاه به راننده هشدار می‌دهم.",
    "Lydsignal må bruges, når det er nødvendigt for at forebygge eller afværge fare.", "The horn may be used when it is necessary to prevent or avert danger.",
    "بوق وقتی مجاز است که برای پیشگیری یا دفع خطر لازم باشد."),
  S(False, "Jeg sætter farten op, fordi føreren skal vente, når jeg allerede er i gang med at overhale.",
    "I speed up because the driver has to wait when I am already overtaking.", "سرعتم را بیشتر می‌کنم، چون وقتی در حال سبقتم، راننده باید صبر کند.",
    "Du kan ikke regne med, at føreren har set dig, og et sammenstød skal undgås.",
    "You cannot count on the driver having seen you, and a collision must be avoided.", "نمی‌توانید مطمئن باشید راننده شما را دیده و باید از برخورد پرهیز کرد."),
  S(False, "Jeg trækker hurtigt over i højre side og overhaler bilen der.", "I quickly move across to the right and overtake the car there.",
    "سریع به سمت راست می‌روم و از آن طرف سبقت می‌گیرم.",
    "En hurtig manøvre tæt forbi bilen er farlig; brems hellere og bliv bag den.",
    "A quick manoeuvre close past the car is dangerous; rather brake and stay behind it.", "مانور سریع از نزدیکِ خودرو خطرناک است؛ بهتر است ترمز کنید و پشتش بمانید."),
)

Q(5905, "7.9", view("""
THE SCENE: a long straight two-lane country road; in front of us a slow car; far ahead in the oncoming lane a motorcycle approaches,
seen as a narrow shape with a single headlight.
MUST BE CLEARLY VISIBLE: the slow car ahead, the distant motorcycle with its single headlight.
MUST NOT APPEAR: signs, text."""),
  "Du vil overhale en langsom bil. Langt fremme kommer en motorcykel imod dig. Hvad gælder?",
  "You want to overtake a slow car. Far ahead a motorcycle is coming towards you. What applies?",
  "می‌خواهید از خودرویی آهسته سبقت بگیرید. خیلی جلوتر موتورسیکلتی از روبه‌رو می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Det kan være svært at bedømme, hvor langt væk motorcyklen er, og hvor hurtigt den kører.",
    "It can be hard to judge how far away the motorcycle is and how fast it is going.",
    "سنجیدن این‌که موتورسیکلت چقدر دور است و با چه سرعتی می‌آید ممکن است سخت باشد.",
    "En motorcykel er smal og har ofte kun én forlygte, så den kan virke længere væk, end den er.",
    "A motorcycle is narrow and often has only one headlight, so it may seem further away than it is.",
    "موتورسیکلت باریک است و اغلب فقط یک چراغ جلو دارد، پس ممکن است دورتر از آنچه هست به نظر برسد."),
  S(True, "Jeg venter med at overhale, til jeg er helt sikker på, at der er plads nok.", "I wait to overtake until I am quite sure that there is enough room.",
    "سبقت را تا وقتی کاملاً مطمئن شوم جای کافی هست عقب می‌اندازم.",
    "Vognbanen skal være fri for modkørende på en tilstrækkeligt lang strækning.",
    "The lane must be clear of oncoming traffic for a long enough stretch.", "خط باید در مسافتی کافی از ترافیک روبه‌رو خالی باشد."),
  S(False, "En motorcykel fylder så lidt, at vi godt kan passere hinanden, selv om jeg er i dens vognbane.",
    "A motorcycle takes up so little room that we can pass each other even if I am in its lane.",
    "موتورسیکلت جای کمی می‌گیرد و حتی اگر در خط آن باشم، می‌توانیم از کنار هم رد شویم.",
    "Du må ikke overhale ind i vognbanen for en modkørende, uanset hvor lille den er.",
    "You must not overtake into the lane of an oncoming vehicle, however small it is.", "هر قدر هم وسیله‌ی روبه‌رو کوچک باشد، نباید با سبقت وارد خط آن شوید."),
  S(False, "Motorcyklisten kan bare køre ud i rabatten, hvis det bliver nødvendigt.", "The motorcyclist can just ride onto the verge if necessary.",
    "موتورسوار اگر لازم شد می‌تواند به شانه‌ی جاده برود.",
    "Du kan ikke regne med, at den modkørende kan eller vil vige for dig.", "You cannot count on the oncoming rider being able or willing to get out of your way.",
    "نمی‌توانید روی این حساب کنید که وسیله‌ی روبه‌رو بتواند یا بخواهد برایتان کنار برود."),
)

Q(5906, "7.9", view("""
THE SCENE: a two-lane country road outside town; ahead on the right a bus stands at a bus stop at the roadside next to a small shelter,
with its LEFT indicator flashing; a passenger who has just got off walks along the shelter towards the front of the bus.
MUST BE CLEARLY VISIBLE: the bus at the stop with its left indicator on, the passenger near its front.
MUST NOT APPEAR: signs, text, logos."""),
  "Uden for byen holder en bus ved et stoppested i vejkanten. Den blinker til venstre for at køre ud, da du kommer bagfra. Hvordan forholder "
  "du dig?",
  "Outside town a bus stands at a stop at the roadside. It signals left to pull out as you come up behind it. What do you do?",
  "بیرون شهر اتوبوسی کنار جاده در ایستگاه ایستاده است. وقتی از پشت به آن نزدیک می‌شوید، برای حرکت راهنمای چپ می‌زند. چه می‌کنید؟",
  S(True, "Jeg er klar til at bremse, hvis bussen kører ud foran mig.", "I am ready to brake if the bus pulls out in front of me.",
    "آماده‌ی ترمزم، اگر اتوبوس جلوی من حرکت کند.",
    "Du skal gøre, hvad du kan, for at undgå et uheld, også selv om bussen skal sikre sig, at den kan køre ud.",
    "You must do what you can to avoid an accident, even though the bus must make sure it can pull out.",
    "باید هر کاری می‌توانید برای جلوگیری از تصادف بکنید، با این‌که اتوبوس هم باید مطمئن شود که می‌تواند حرکت کند."),
  S(True, "Jeg er forberedt på, at der kan komme gående frem foran bussen.", "I am prepared for pedestrians to step out in front of the bus.",
    "آماده‌ام که عابری از جلوی اتوبوس بیرون بیاید.",
    "Passagerer, der er stået af, går ofte over vejen foran bussen.", "Passengers who have got off often cross the road in front of the bus.",
    "مسافرانی که پیاده شده‌اند اغلب از جلوی اتوبوس از جاده رد می‌شوند."),
  S(False, "Uden for byen skal jeg altid standse og lade bussen køre ud.", "Outside town I must always stop and let the bus pull out.",
    "بیرون شهر همیشه باید بایستم و بگذارم اتوبوس حرکت کند.",
    "Pligten til at lade en bus køre ud fra et stoppested gælder i byen; uden for byen skal bussen selv sikre sig, at den kan køre ud uden fare.",
    "The duty to let a bus leave a stop applies in town; outside town the bus itself must make sure it can pull out without danger.",
    "وظیفه‌ی راه دادن به اتوبوسی که از ایستگاه حرکت می‌کند در شهر است؛ بیرون شهر خود اتوبوس باید مطمئن شود که بی‌خطر حرکت می‌کند."),
  S(False, "Jeg dytter, så bussen bliver holdende, til jeg er forbi.", "I sound the horn so that the bus stays put until I have passed.",
    "بوق می‌زنم تا اتوبوس تا رد شدن من همان‌جا بماند.",
    "Hornet må kun bruges for at forebygge eller afværge fare, ikke for at kræve plads.",
    "The horn may only be used to prevent or avert danger, not to demand room.", "بوق فقط برای پیشگیری یا دفع خطر است، نه برای جا خواستن."),
)

Q(5907, "7.9", view("""
THE SCENE: a two-lane country road between fields in late summer; ahead of us drives a wide combine harvester with an amber flashing
light on its roof; it fills its whole lane and part of the oncoming lane; a field entrance is visible a little further ahead on the right.
MUST BE CLEARLY VISIBLE: the wide combine harvester filling its lane and part of the other, the field entrance ahead.
MUST NOT APPEAR: signs, text, logos."""),
  "Foran dig kører en bred mejetærsker. Den fylder hele sin vognbane og en del af den modsatte. Du vil gerne forbi. Hvad gælder?",
  "A wide combine harvester is driving in front of you. It fills its whole lane and part of the opposite one. You would like to get past. "
  "What applies?",
  "جلوی شما یک کمباین پهن حرکت می‌کند. تمام خط خودش و بخشی از خط مقابل را گرفته است. دوست دارید از آن رد شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg overhaler kun, hvis hele den modsatte vognbane er fri på en lang strækning.",
    "I only overtake if the whole opposite lane is clear for a long stretch.", "فقط وقتی سبقت می‌گیرم که تمام خط مقابل در مسافتی طولانی خالی باشد.",
    "Mejetærskeren er bred og lang, så du skal bruge hele den modsatte vognbane i lang tid.",
    "The combine is wide and long, so you need the whole opposite lane for a long time.",
    "کمباین پهن و بلند است و مدتی طولانی به تمام خط مقابل نیاز دارید."),
  S(True, "Jeg er forberedt på, at den kan svinge ind på en mark uden at give tydeligt tegn.",
    "I am prepared for it to turn into a field without giving a clear signal.", "آماده‌ام که بدون علامت واضح به داخل مزرعه بپیچد.",
    "Landbrugsmaskiner svinger ofte ind på marker, og deres tegn kan være svære at se.",
    "Farm machines often turn into fields, and their signals can be hard to see.", "ماشین‌های کشاورزی اغلب به داخل مزرعه می‌پیچند و دیدن علامتشان ممکن است سخت باشد."),
  S(True, "Jeg holder god afstand, så føreren kan se mig i spejlene, og jeg kan se forbi den.",
    "I keep a good distance so that the driver can see me in the mirrors and I can see past it.",
    "فاصله‌ی کافی نگه می‌دارم تا راننده مرا در آینه‌ها ببیند و من هم بتوانم از کنارش جلو را ببینم.",
    "Tæt bag maskinen er du skjult for føreren og kan ikke se vejen foran.", "Close behind the machine you are hidden from the driver and cannot see the road ahead.",
    "نزدیکِ پشت ماشین از دید راننده پنهان می‌مانید و جاده‌ی جلو را نمی‌بینید."),
  S(False, "Jeg kører tæt bag den, så jeg er klar, når der kommer et hul.", "I drive close behind it so that I am ready when a gap comes.",
    "نزدیکِ پشتش می‌رانم تا هر وقت فرصتی شد آماده باشم.",
    "Tæt bag mejetærskeren kan du netop ikke se, om vejen er fri.", "Close behind the combine you cannot see whether the road is clear.",
    "درست نزدیکِ پشت کمباین نمی‌بینید که جاده خالی است یا نه."),
)

Q(5908, "7.9", view("""
THE SCENE: a two-lane country road with a broken centre line; in front of us a slow car; about 200 m ahead a side road leads off to the
RIGHT; no oncoming traffic.
MUST BE CLEARLY VISIBLE: the slow car ahead, the side road on the right a little further on.
MUST NOT APPEAR: signs, text."""),
  "Du kører bag en langsom bil. Om ca. 200 m skal du svinge til højre ad en sidevej. Du overvejer at overhale bilen først. Hvad gælder?",
  "You are driving behind a slow car. In about 200 m you are turning right into a side road. You are thinking of overtaking the car first. "
  "What applies?",
  "پشت خودرویی آهسته می‌رانید. حدود ۲۰۰ متر جلوتر باید به راست وارد یک فرعی شوید. فکر می‌کنید اول از آن خودرو سبقت بگیرید. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg overhaler ikke, fordi jeg så skal bremse kraftigt lige foran bilen for at nå at svinge.",
    "I do not overtake, because I would then have to brake hard right in front of the car to make the turn.",
    "سبقت نمی‌گیرم، چون در آن صورت باید درست جلوی آن خودرو شدید ترمز کنم تا به پیچ برسم.",
    "Efter en overhaling skal du kunne køre ind uden at være til ulempe, og du må ikke bremse pludseligt uden rimelig grund.",
    "After overtaking you must be able to pull in without causing inconvenience, and you must not brake suddenly without good reason.",
    "بعد از سبقت باید بتوانید بدون مزاحمت به خط برگردید و نباید بی‌دلیلِ موجه ناگهان ترمز کنید."),
  S(True, "Jeg giver tegn i god tid og sætter roligt farten ned før sidevejen.", "I signal in good time and slow down calmly before the side road.",
    "به‌موقع راهنما می‌زنم و پیش از فرعی آرام سرعتم را کم می‌کنم.",
    "Så kan de bag dig se, hvad du vil, og nå at tilpasse farten.", "Then those behind you can see what you intend and adjust their speed in time.",
    "این‌طور پشت‌سری‌ها می‌فهمند چه می‌خواهید و به‌موقع سرعتشان را تنظیم می‌کنند."),
  S(False, "Det er bedst at komme foran, så bilen ikke forsinker mig, når jeg svinger.",
    "It is best to get in front so that the car does not delay me when I turn.", "بهتر است جلو بیفتم تا آن خودرو هنگام پیچیدن معطلم نکند.",
    "Overhalingen sparer næsten ingen tid og skaber en farlig situation lige før svinget.",
    "The overtaking saves almost no time and creates a dangerous situation just before the turn.",
    "این سبقت تقریباً وقتی صرفه‌جویی نمی‌کند و درست پیش از پیچ وضعیت خطرناکی می‌سازد."),
  S(False, "Jeg må gerne overhale og bremse hårdt, fordi den overhalede bil skal holde afstand til mig.",
    "I may overtake and brake hard, because the overtaken car must keep its distance from me.",
    "می‌توانم سبقت بگیرم و شدید ترمز کنم، چون خودرویی که از آن سبقت گرفته‌ام باید از من فاصله بگیرد.",
    "Du skal kunne køre ind igen uden at være til ulempe; du kan ikke lægge ansvaret over på den anden.",
    "You must be able to pull back in without causing inconvenience; you cannot shift the responsibility onto the other driver.",
    "باید بتوانید بدون مزاحمت به خط برگردید؛ نمی‌توانید مسئولیت را به گردن دیگری بیندازید."),
)

Q(5909, "7.9", view("""
THE SCENE: a two-lane road outside town; in front of us at the right edge rides a cyclist towing a two-wheeled child trailer with a small
orange flag on a pole; a child sits in the trailer; the oncoming lane is clear for a good distance.
MUST BE CLEARLY VISIBLE: the cyclist with the child trailer and its flag, the clear oncoming lane.
MUST NOT APPEAR: signs, text."""),
  "Foran dig kører en cyklist med en cykelanhænger, hvor der sidder et barn. Du vil overhale. Hvad gælder?",
  "In front of you a cyclist is towing a bicycle trailer with a child in it. You want to overtake. What applies?",
  "جلوی شما دوچرخه‌سواری یک یدک دوچرخه را می‌کشد که کودکی در آن نشسته است. می‌خواهید سبقت بگیرید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder ekstra god afstand til siden, fordi anhængeren gør cyklen bredere.",
    "I keep an extra good distance to the side because the trailer makes the bicycle wider.",
    "فاصله‌ی جانبیِ بیشتری نگه می‌دارم، چون یدک دوچرخه را پهن‌تر می‌کند.",
    "Anhængeren rager ud til siden og bag cyklen, og den kan slingre.", "The trailer sticks out to the side and behind the bicycle, and it may sway.",
    "یدک از کنار و پشت دوچرخه بیرون زده و ممکن است تاب بخورد."),
  S(True, "Jeg overhaler først, når den modsatte vognbane er fri, så jeg kan give god plads.",
    "I only overtake when the opposite lane is clear so that I can give plenty of room.", "فقط وقتی سبقت می‌گیرم که خط مقابل خالی باشد تا بتوانم جای کافی بدهم.",
    "Vognbanen skal være fri for modkørende, og du skal holde tilstrækkelig afstand til siden.",
    "The lane must be clear of oncoming traffic, and you must keep enough distance to the side.",
    "خط باید از ترافیک روبه‌رو خالی باشد و باید فاصله‌ی جانبیِ کافی نگه دارید."),
  S(False, "Anhængeren er lav, så den er ikke i vejen, når jeg kører forbi.", "The trailer is low, so it is not in the way when I drive past.",
    "یدک کوتاه است، پس هنگام رد شدن مزاحم نیست.",
    "En lav anhænger kan være svær at se tæt på bilen, og den er bredere end cyklen.",
    "A low trailer can be hard to see close to the car, and it is wider than the bicycle.", "یدکِ کوتاه از نزدیکِ خودرو سخت دیده می‌شود و از دوچرخه پهن‌تر است."),
  S(False, "Jeg dytter kort, så cyklisten kører ud i rabatten.", "I give a short hoot so that the cyclist rides onto the verge.",
    "یک بوق کوتاه می‌زنم تا دوچرخه‌سوار به شانه‌ی جاده برود.",
    "Hornet må kun bruges for at afværge fare, og cyklisten har ret til at køre på vejen.",
    "The horn may only be used to avert danger, and the cyclist has the right to ride on the road.",
    "بوق فقط برای دفع خطر است و دوچرخه‌سوار حق دارد در جاده براند."),
)

Q(5910, "7.9", picture("""
Inside a car seen from the middle of the back seat: the driver holds the steering wheel; the front-seat passenger points eagerly forward
past a slow van in front of them; through the windscreen the road curves gently to the left, and the van hides part of the oncoming
lane.
MUST BE CLEARLY VISIBLE: the passenger pointing forward, the van ahead hiding part of the road.
MUST NOT APPEAR: text, logos."""),
  "Du kører bag en langsom varevogn. Din passager siger, at der ikke kommer nogen, og at du godt kan overhale. Hvad gælder?",
  "You are behind a slow van. Your passenger says that nobody is coming and that you can overtake. What applies?",
  "پشت یک ون آهسته می‌رانید. مسافرتان می‌گوید کسی نمی‌آید و می‌توانید سبقت بگیرید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg overhaler kun, hvis jeg selv kan se, at det kan ske uden fare.", "I only overtake if I can see for myself that it can be done without danger.",
    "فقط وقتی سبقت می‌گیرم که خودم ببینم بی‌خطر است.",
    "Det er føreren, der skal sikre sig, at overhalingen kan ske uden fare.", "It is the driver who must make sure that the overtaking can be done without danger.",
    "این راننده است که باید مطمئن شود سبقت بی‌خطر است."),
  S(True, "Fra passagersædet kan man se mindre af den modkørende vognbane end fra førersædet.",
    "From the passenger seat you can see less of the oncoming lane than from the driver's seat.",
    "از صندلی مسافر کمتر از صندلی راننده می‌توان خط مقابل را دید.",
    "Passageren sidder længere ude til højre, så varevognen skjuler mere af vejen for ham.",
    "The passenger sits further to the right, so the van hides more of the road from him.",
    "مسافر بیشتر سمت راست نشسته و ون بخش بیشتری از جاده را از دید او پنهان می‌کند."),
  S(False, "Jeg overhaler, for det er passageren, der har ansvaret, når han siger, at der er frit.",
    "I overtake, because it is the passenger who is responsible when he says the road is clear.",
    "سبقت می‌گیرم، چون وقتی مسافر می‌گوید راه باز است، مسئولیت با اوست.",
    "Ansvaret for kørslen er altid førerens.", "The responsibility for the driving always lies with the driver.",
    "مسئولیت رانندگی همیشه با راننده است."),
  S(False, "Jeg lader passageren give mig et tegn, når der er frit, så jeg kan holde øjnene på varevognen.",
    "I let the passenger give me a sign when the road is clear so that I can keep my eyes on the van.",
    "می‌گذارم مسافر وقتی راه باز شد علامت بدهد تا چشمم به ون باشد.",
    "Du skal selv vurdere, om vejen er fri, og ikke overlade det til andre.", "You must judge yourself whether the road is clear and not leave it to others.",
    "خودتان باید باز بودن راه را بسنجید و آن را به دیگری نسپارید."),
)

Q(5911, "7.9", view("""
THE SCENE: a two-lane country road; ahead of us a car has pulled out into the oncoming lane and is overtaking a cyclist; we are behind
both of them; the oncoming lane beyond is clear for some distance.
MUST BE CLEARLY VISIBLE: the car overtaking the cyclist, our position behind them.
MUST NOT APPEAR: signs, text."""),
  "Bilen foran dig er ved at overhale en cyklist. Du overvejer at overhale både bilen og cyklisten på én gang. Hvad gælder?",
  "The car in front of you is overtaking a cyclist. You are thinking of overtaking both the car and the cyclist in one go. What applies?",
  "خودروی جلوی شما در حال سبقت از یک دوچرخه‌سوار است. فکر می‌کنید هم‌زمان از هر دو، خودرو و دوچرخه‌سوار، سبقت بگیرید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg venter, til bilen er færdig med at overhale.", "I wait until the car has finished overtaking.", "صبر می‌کنم تا سبقت آن خودرو تمام شود.",
    "Du må ikke overhale, når den forankørende er i gang med at overhale et andet køretøj.",
    "You must not overtake when the vehicle in front is overtaking another vehicle.",
    "وقتی وسیله‌ی جلویی در حال سبقت از وسیله‌ی دیگری است، نباید سبقت بگیرید."),
  S(True, "Tre køretøjer ved siden af hinanden fylder hele vejen og giver ingen plads til fejl.",
    "Three vehicles side by side fill the whole road and leave no room for mistakes.", "سه وسیله کنار هم کل جاده را پر می‌کنند و جایی برای خطا نمی‌ماند.",
    "Du ville komme helt ud i siden af vejen, hvor du ikke har plads til at undvige.",
    "You would end up at the far side of the road with no room to take avoiding action.",
    "به کنارِ دیگرِ جاده می‌رسید، جایی که برای فرار از خطر جا ندارید."),
  S(False, "Det er tilladt, når der ikke kommer nogen imod mig.", "It is allowed when nobody is coming towards me.",
    "وقتی کسی از روبه‌رو نمی‌آید، مجاز است.",
    "Det er forbudt at overhale en, der selv er i gang med at overhale.", "It is forbidden to overtake someone who is overtaking.",
    "سبقت گرفتن از کسی که خودش در حال سبقت است ممنوع است."),
  S(False, "Cyklisten fylder så lidt, at det er det samme som at overhale én bil.",
    "The cyclist takes up so little room that it is the same as overtaking one car.", "دوچرخه‌سوار جای کمی می‌گیرد و مثل سبقت از یک خودرو است.",
    "Du ville overhale to trafikanter på én gang, mens den ene selv overhaler.", "You would be overtaking two road users at once while one of them is overtaking.",
    "شما هم‌زمان از دو نفر سبقت می‌گیرید، در حالی که یکی از آن‌ها خودش در حال سبقت است."),
)

Q(5912, "7.9", view("""
THE SCENE: a two-lane country road; in front of us a car drives slowly with its hazard lights flashing; no visible reason; the oncoming
lane is clear for some distance.
MUST BE CLEARLY VISIBLE: the slow car ahead with its hazard lights flashing.
MUST NOT APPEAR: signs, text."""),
  "Bilen foran dig kører langsomt med havariblinket tændt. Du vil gerne forbi. Hvad gælder?",
  "The car in front of you is driving slowly with its hazard lights on. You would like to get past. What applies?",
  "خودروی جلوی شما با چراغ‌های خطرِ روشن آهسته می‌رود. دوست دارید رد شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder god afstand, fordi bilen kan standse pludseligt.", "I keep a good distance because the car may stop suddenly.",
    "فاصله‌ی کافی نگه می‌دارم، چون آن خودرو ممکن است ناگهان بایستد.",
    "Havariblinket kan betyde, at bilen har et problem eller snart holder ind.", "The hazard lights may mean that the car has a problem or will soon pull in.",
    "چراغ‌های خطر ممکن است یعنی خودرو مشکلی دارد یا به‌زودی کنار می‌کشد."),
  S(True, "Jeg overhaler kun, når det kan ske uden fare, og med god afstand til siden.",
    "I only overtake when it can be done without danger and with a good distance to the side.",
    "فقط وقتی سبقت می‌گیرم که بی‌خطر باشد و با فاصله‌ی جانبیِ کافی.",
    "Bilen kan pludselig dreje ind til siden eller standse, mens du kører forbi.", "The car may suddenly turn to the side or stop while you pass.",
    "ممکن است آن خودرو هنگام رد شدن شما ناگهان به کنار بپیچد یا بایستد."),
  S(False, "Havariblinket betyder, at føreren giver mig tegn til at overhale.", "The hazard lights mean that the driver is signalling me to overtake.",
    "چراغ‌های خطر یعنی راننده به من علامت می‌دهد سبقت بگیرم.",
    "Havariblink er en advarsel og ikke et tegn til at overhale.", "Hazard lights are a warning, not a signal to overtake.",
    "چراغ‌های خطر هشدارند، نه علامتی برای سبقت."),
  S(False, "Jeg kører tæt op og dytter, så føreren kører ind til siden.", "I drive up close and sound the horn so that the driver pulls over.",
    "نزدیک می‌شوم و بوق می‌زنم تا راننده کنار بکشد.",
    "Tæt bagved har du ikke plads til at bremse, og hornet må kun bruges for at afværge fare.",
    "Close behind you have no room to brake, and the horn may only be used to avert danger.",
    "از نزدیک جایی برای ترمز ندارید و بوق فقط برای دفع خطر است."),
)

Q(5913, "6.1", view("""
THE SCENE: the entrance to a narrow road over a small old bridge; at the entrance stands a round white sign with a red border showing the
black text «2 t»; in the right exterior mirror a small trailer coupled to our car can be seen.
MUST BE CLEARLY VISIBLE: the round sign with «2 t», the trailer in the mirror.
MUST NOT APPEAR: other signs, any other text."""),
  "Ved indkørslen til en vej står denne tavle. Din bil vejer med fører og bagage 1,8 t, og traileren vejer med last 1,2 t. Hvad gælder?",
  "This sign stands at the entrance to a road. Your car weighs 1.8 t with driver and luggage, and the trailer weighs 1.2 t with its load. "
  "What applies?",
  "این تابلو در ورودی یک جاده قرار دارد. خودرویتان با راننده و بار ۱٫۸ تن و یدک با بارش ۱٫۲ تن وزن دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må godt køre ind, fordi både bilen og traileren hver for sig vejer under 2 t.",
    "I may drive in because the car and the trailer each weigh less than 2 t.", "می‌توانم وارد شوم، چون خودرو و یدک هر کدام جداگانه کمتر از ۲ تن وزن دارند.",
    "Ved vogntog gælder tavlens vægtgrænse hvert enkelt køretøj i vogntoget.",
    "For a vehicle combination the weight limit on this sign applies to each vehicle in the combination.",
    "برای مجموعه‌ی وسیله‌ها، حد وزن این تابلو برای هر وسیله جداگانه است."),
  S(True, "Det er den faktiske vægt, der tæller, ikke den tilladte totalvægt.", "It is the actual weight that counts, not the permitted total weight.",
    "وزن واقعی ملاک است، نه وزن کلِ مجاز.",
    "Tavlen forbyder køretøjer, hvis faktiske totalvægt er større end den angivne.",
    "The sign forbids vehicles whose actual total weight is greater than shown.", "این تابلو وسیله‌هایی را ممنوع می‌کند که وزن واقعی‌شان بیش از عدد تابلو باشد."),
  S(False, "Vogntoget vejer i alt 3 t, så jeg må ikke køre ind.", "The combination weighs 3 t in total, so I must not drive in.",
    "این مجموعه روی هم ۳ تن است، پس نباید وارد شوم.",
    "Denne tavle gælder hvert køretøj for sig; et forbud for hele vogntogets vægt har sin egen tavle.",
    "This sign applies to each vehicle on its own; a ban on the weight of the whole combination has its own sign.",
    "این تابلو برای هر وسیله جداگانه است؛ ممنوعیت بر اساس وزن کل مجموعه تابلوی جداگانه‌ای دارد."),
  S(False, "Vægtgrænsen gælder kun lastbiler og busser.", "The weight limit only applies to lorries and buses.", "این حد وزن فقط برای کامیون‌ها و اتوبوس‌هاست.",
    "Vægtgrænsen gælder alle køretøjer.", "The weight limit applies to all vehicles.", "این حد وزن برای همه‌ی وسیله‌هاست."),
)

Q(5914, "6.1", view("""
THE SCENE: the entrance to a gravel road into a forest; at the entrance stands a round white sign with a red border showing a black
motorcycle; no plate under it.
MUST BE CLEARLY VISIBLE: the round sign with the motorcycle, the forest road.
MUST NOT APPEAR: other signs, text."""),
  "Ved indkørslen til en skovvej står denne tavle. Du kører bil. Hvad gælder?",
  "This sign stands at the entrance to a forest road. You are driving a car. What applies?",
  "این تابلو در ورودی یک جاده‌ی جنگلی قرار دارد. با خودرو می‌رانید. چه قاعده‌ای برقرار است؟",
  S(True, "Tavlen forbyder kørsel med motorcykel og stor knallert.", "The sign bans motorcycles and large mopeds.",
    "این تابلو رانندگی با موتورسیکلت و موتورگازیِ بزرگ را ممنوع می‌کند.",
    "Tavlen med en motorcykel forbyder kørsel med motorcykel og stor knallert.", "The sign with a motorcycle bans motorcycles and large mopeds.",
    "تابلوی دارای نقش موتورسیکلت رانندگی با موتورسیکلت و موتورگازیِ بزرگ را ممنوع می‌کند."),
  S(True, "Jeg må godt køre ind ad vejen i bil, hvis ingen anden tavle forbyder det.",
    "I may drive into the road by car if no other sign forbids it.", "اگر تابلوی دیگری منع نکند، می‌توانم با خودرو وارد این جاده شوم.",
    "Forbuddet gælder kun de køretøjer, tavlen viser.", "The ban only applies to the vehicles the sign shows.",
    "این ممنوعیت فقط برای وسیله‌هایی است که تابلو نشان می‌دهد."),
  S(False, "Tavlen forbyder kørsel med alle motorkøretøjer.", "The sign bans all motor vehicles.", "این تابلو همه‌ی وسیله‌های موتوری را ممنوع می‌کند.",
    "Et forbud for biler og motorcykler vises med en bil over en motorcykel.", "A ban on cars and motorcycles is shown with a car above a motorcycle.",
    "ممنوعیتِ خودرو و موتورسیکلت با نقش خودرو بالای موتورسیکلت نشان داده می‌شود."),
  S(False, "Tavlen advarer om, at der kan komme motorcykler, så jeg skal være forsigtig.",
    "The sign warns that motorcycles may come, so I must be careful.", "این تابلو هشدار می‌دهد که ممکن است موتورسیکلت بیاید و باید مراقب باشم.",
    "Det er en rund forbudstavle, ikke en trekantet advarselstavle.", "It is a round prohibition sign, not a triangular warning sign.",
    "این یک تابلوی گرد ممنوعیت است، نه تابلوی مثلثی هشدار."),
)

Q(5915, "6.1", view("""
THE SCENE: a two-lane country road; on the right verge stands a red-bordered white warning triangle (point up) showing a black road
profile with two humps in a row (the Danish sign for an uneven road); ahead the asphalt is patched and wavy.
MUST BE CLEARLY VISIBLE: the warning sign for an uneven road, the wavy, patched asphalt ahead.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle på landevejen. Hvad betyder den?",
  "You pass this sign on the country road. What does it mean?",
  "در جاده‌ی بیرون شهر از کنار این تابلو می‌گذرید. معنایش چیست؟",
  S(True, "Der kommer farlige ujævnheder på vejen, så jeg sætter farten ned.", "Dangerous unevenness is coming on the road, so I slow down.",
    "جلوتر ناهمواری‌های خطرناکی در جاده هست، پس سرعتم را کم می‌کنم.",
    "Tavlen advarer om farlige ujævnheder, som kan få bilen til at hoppe og miste grebet.",
    "The sign warns of dangerous unevenness that can make the car bounce and lose grip.",
    "این تابلو از ناهمواری‌های خطرناکی هشدار می‌دهد که ممکن است خودرو را بپراند و چسبندگی را کم کند."),
  S(False, "Der kommer et bump, der skal få bilisterne til at køre langsomt i et boligområde.",
    "A speed hump is coming to make drivers slow down in a residential area.", "جلوتر یک سرعت‌گیر برای کم کردن سرعت در منطقه‌ی مسکونی هست.",
    "Bump har sin egen advarselstavle; denne tavle advarer om ujævn vej.", "Speed humps have their own warning sign; this sign warns of an uneven road.",
    "سرعت‌گیر تابلوی هشدار جداگانه‌ای دارد؛ این تابلو از جاده‌ی ناهموار هشدار می‌دهد."),
  S(False, "Vejen er glat, fordi den er nylagt.", "The road is slippery because it is newly laid.", "جاده لغزنده است، چون تازه آسفالت شده.",
    "Glat vej varsles med en anden tavle.", "A slippery road is warned of with another sign.", "جاده‌ی لغزنده با تابلوی دیگری اعلام می‌شود."),
)

Q(5916, "6.1", view("""
THE SCENE: a road entering a residential area; on the right stands a round speed-limit sign 40; just after it a large white circle with
a red ring and the number 40 is painted on the surface of our lane.
MUST BE CLEARLY VISIBLE: the 40 sign, the large painted 40 symbol on the carriageway.
MUST NOT APPEAR: other signs, any other text."""),
  "Lige efter en tavle med 40 km/t er der malet et stort rundt symbol med tallet 40 på kørebanen. Hvad betyder det?",
  "Just after a 40 km/h sign a large round symbol with the number 40 is painted on the carriageway. What does it mean?",
  "درست بعد از تابلوی ۴۰ کیلومتر در ساعت، نشانه‌ی گرد بزرگی با عدد ۴۰ روی سواره‌رو کشیده شده است. معنایش چیست؟",
  S(True, "Symbolet gentager tavlen og minder om, at grænsen er 40 km/t.", "The symbol repeats the sign and reminds you that the limit is 40 km/h.",
    "این نشانه تابلو را تکرار می‌کند و یادآوری می‌کند که حد سرعت ۴۰ است.",
    "Et færdselstavlesymbol på kørebanen supplerer den tilsvarende færdselstavle.",
    "A sign symbol on the carriageway supplements the corresponding traffic sign.", "نشانه‌ی تابلو روی سواره‌رو مکمل همان تابلوی راهنمایی است."),
  S(False, "Grænsen gælder kun i den vognbane, hvor symbolet er malet.", "The limit only applies in the lane where the symbol is painted.",
    "این حد فقط در خطی است که نشانه رویش کشیده شده.",
    "Symbolet supplerer tavlen, og tavlen gælder for al trafik i kørselsretningen.",
    "The symbol supplements the sign, and the sign applies to all traffic in the direction of travel.",
    "این نشانه مکمل تابلوست و تابلو برای همه‌ی ترافیکِ آن جهت است."),
  S(False, "Symbolet på kørebanen er kun en anbefaling.", "The symbol on the carriageway is only a recommendation.",
    "نشانه‌ی روی سواره‌رو فقط یک توصیه است.",
    "Symbolet gentager en tavle, som skal følges.", "The symbol repeats a sign that must be obeyed.", "این نشانه تابلویی را تکرار می‌کند که باید رعایت شود."),
  S(False, "Den malede 40 betyder, at jeg mindst skal køre 40 km/t.", "The painted 40 means that I must drive at least 40 km/h.",
    "عدد ۴۰ روی جاده یعنی باید دست‌کم ۴۰ کیلومتر در ساعت برانم.",
    "Det røde kantede symbol viser en højeste hastighed, ikke en mindste.", "The red-ringed symbol shows a maximum speed, not a minimum.",
    "نشانه‌ی با حاشیه‌ی قرمز بیشترین سرعت را نشان می‌دهد، نه کمترین."),
)

Q(5917, "6.1", town("""
THE SCENE: a town street with a zebra crossing a little ahead; above the crossing, on a pole at the kerb, a single yellow lamp is
flashing; there is no school patrol; a man stands at the kerb near the crossing.
MUST BE CLEARLY VISIBLE: the flashing yellow lamp above the crossing, the zebra stripes, the man at the kerb.
MUST NOT APPEAR: traffic lights, signs, text."""),
  "Over et fodgængerfelt blinker en gul lampe. Der er ingen skolepatrulje. Hvad betyder det?",
  "A yellow lamp is flashing above a pedestrian crossing. There is no school patrol. What does it mean?",
  "بالای یک گذرگاه عابر چراغ زردی چشمک می‌زند. گشت مدرسه‌ای نیست. معنایش چیست؟",
  S(True, "Jeg skal være særligt forsigtig ved fodgængerfeltet.", "I must take special care at the pedestrian crossing.",
    "باید کنار گذرگاه عابر احتیاط ویژه کنم.",
    "Gult blinksignal betyder, at trafikanterne skal være særligt forsigtige; det bruges bl.a. ved fodgængerfelter.",
    "A yellow flashing signal means that road users must take special care; it is used among other places at pedestrian crossings.",
    "چراغ چشمک‌زن زرد یعنی کاربران جاده باید احتیاط ویژه کنند؛ از جمله کنار گذرگاه‌های عابر نصب می‌شود."),
  S(True, "Jeg holder tilbage for gående, der er i feltet eller på vej ud i det.",
    "I give way to pedestrians who are on the crossing or about to step onto it.",
    "به عابرانی که در گذرگاه هستند یا در حال وارد شدن به آن‌اند راه می‌دهم.",
    "Ved et fodgængerfelt uden lyssignal skal du om nødvendigt standse for de gående.",
    "At a crossing without traffic lights you must stop if necessary for the pedestrians.", "در گذرگاه بدون چراغ راهنمایی باید در صورت لزوم برای عابران بایستید."),
  S(False, "Det gule blink betyder, at de gående skal vente på bilerne.", "The yellow flashing means that pedestrians must wait for the cars.",
    "چشمک زرد یعنی عابران باید منتظر خودروها بمانند.",
    "Blinket advarer de kørende; de gående har stadig fortrinsret i feltet.", "The flashing warns drivers; pedestrians still have priority on the crossing.",
    "این چشمک به رانندگان هشدار می‌دهد؛ عابران همچنان در گذرگاه حق تقدم دارند."),
  S(False, "Jeg skal altid standse helt ved feltet, også når der ikke er nogen gående.",
    "I must always stop completely at the crossing, even when there are no pedestrians.", "همیشه باید کنار گذرگاه کاملاً بایستم، حتی وقتی عابری نیست.",
    "Gult blink kræver særlig forsigtighed; du skal standse, når der er gående, som skal over.",
    "Yellow flashing calls for special care; you must stop when there are pedestrians who are crossing.",
    "چشمک زرد احتیاط ویژه می‌خواهد؛ وقتی عابرانی در حال عبورند، باید بایستید."),
)

Q(5918, "6.1", view("""
THE SCENE: a two-lane country road; on the right verge stands a red-bordered white warning triangle (point up) showing a road whose
RIGHT edge bends inwards so that the road becomes narrower on the right side; ahead the road narrows on our side at a short bridge
railing; an oncoming car approaches.
MUST BE CLEARLY VISIBLE: the warning sign for a narrowing on the right, the narrowing on our side ahead, the oncoming car.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle. Lidt længere fremme kommer en bil imod dig. Hvad gælder?",
  "You pass this sign. A little further ahead a car is coming towards you. What applies?",
  "از کنار این تابلو می‌گذرید. کمی جلوتر خودرویی از روبه‌رو می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Vejen bliver smallere i min side.", "The road gets narrower on my side.", "جاده در سمت من باریک‌تر می‌شود.",
    "Tavlen advarer om, at vejen er indsnævret i højre side.", "The sign warns that the road is narrowed on the right-hand side.",
    "این تابلو هشدار می‌دهد که جاده در سمت راست باریک شده است."),
  S(True, "Er der ikke plads til os begge, holder jeg tilbage og lader den modkørende komme forbi.",
    "If there is not room for both of us, I hold back and let the oncoming car through.",
    "اگر برای هر دو جا نباشد، صبر می‌کنم و می‌گذارم خودروی روبه‌رو رد شود.",
    "Er vejen delvist spærret, skal den, i hvis side spærringen er, om nødvendigt standse og lade den modkørende passere.",
    "If the road is partly blocked, the driver on whose side the obstruction is must stop if necessary and let the oncoming driver pass.",
    "اگر بخشی از جاده بسته باشد، کسی که مانع در سمت اوست باید در صورت لزوم بایستد و بگذارد وسیله‌ی روبه‌رو رد شود."),
  S(True, "Jeg sætter farten ned, før jeg kommer til indsnævringen.", "I slow down before I reach the narrowing.",
    "پیش از رسیدن به بخش باریک سرعتم را کم می‌کنم.",
    "Så har du tid til at vurdere, om I kan passere hinanden.", "Then you have time to judge whether you can pass each other.",
    "این‌طور فرصت دارید بسنجید که می‌توانید از کنار هم رد شوید یا نه."),
  S(False, "Det er den modkørende, der skal holde tilbage, fordi indsnævringen er i min side.",
    "It is the oncoming driver who must hold back, because the narrowing is on my side.",
    "این راننده‌ی روبه‌روست که باید صبر کند، چون بخش باریک در سمت من است.",
    "Det er omvendt: den, i hvis side spærringen er, skal om nødvendigt vente.", "It is the other way round: the one on whose side the obstruction is must wait if necessary.",
    "برعکس است: کسی که مانع در سمت اوست باید در صورت لزوم منتظر بماند."),
)

Q(5919, "6.1", town("""
THE SCENE: the entrance to a residential road; at the entrance on the right stands a blue square sign with a white vertical bar topped by
a red crossbar (a white «T» with a red top), and above the red crossbar a thin white line continues to the top of the sign; at the far
end of the road a footpath and cycle path continue between the houses, and a cyclist comes along it towards the road.
MUST BE CLEARLY VISIBLE: the dead-end sign with the thin white line above the red bar, the path at the far end with the cyclist.
MUST NOT APPEAR: other signs, text."""),
  "Ved indkørslen til en vej står denne tavle. Den tynde hvide streg fortsætter forbi den røde bjælke. Hvad betyder det?",
  "This sign stands at the entrance to a road. The thin white line continues past the red bar. What does it mean?",
  "این تابلو در ورودی یک جاده قرار دارد. خط نازک سفید از بالای میله‌ی قرمز ادامه پیدا کرده است. معنایش چیست؟",
  S(True, "Vejen er blind for biler.", "The road is a dead end for cars.", "این جاده برای خودروها بن‌بست است.",
    "Tavlen viser en blind vej, som biler ikke kan køre igennem.", "The sign shows a dead-end road that cars cannot drive through.",
    "این تابلو جاده‌ی بن‌بستی را نشان می‌دهد که خودروها نمی‌توانند از آن عبور کنند."),
  S(True, "Vejen fortsætter som en sti, så der kan komme cyklister og gående fra den anden ende.",
    "The road continues as a path, so cyclists and pedestrians may come from the other end.",
    "جاده به‌صورت مسیر پیاده و دوچرخه ادامه دارد و ممکن است از انتهای دیگر دوچرخه‌سوار و عابر بیاید.",
    "Med en tynd hvid streg kan det angives, at vejen fortsætter i en sti.", "A thin white line can show that the road continues as a path.",
    "خط نازک سفید می‌تواند نشان دهد که جاده به‌صورت مسیر ادامه دارد."),
  S(True, "Jeg må regne med at skulle vende for enden af vejen.", "I must expect to have to turn round at the end of the road.",
    "باید انتظار داشته باشم که در انتهای جاده دور بزنم.",
    "Med bil kan du ikke køre videre, når vejen slutter.", "By car you cannot go on when the road ends.", "با خودرو در انتهای جاده نمی‌توانید ادامه دهید."),
  S(False, "Den tynde streg betyder, at biler kan køre videre ad stien.", "The thin line means that cars can carry on along the path.",
    "خط نازک یعنی خودروها می‌توانند در مسیر پیاده و دوچرخه ادامه دهند.",
    "Stien er ikke for biler; stregen viser kun, at gående og cyklister kan komme videre.",
    "The path is not for cars; the line only shows that pedestrians and cyclists can get through.",
    "این مسیر برای خودرو نیست؛ خط فقط نشان می‌دهد عابران و دوچرخه‌سواران می‌توانند عبور کنند."),
)

Q(5920, "6.1", town("""
THE SCENE: the entrance to a narrow residential street in an old town; at the entrance stands a round white sign with a red border
showing a black car above a black motorcycle, and under it a white rectangular plate with the black text «Beboerkørsel tilladt».
MUST BE CLEARLY VISIBLE: the round sign and its plate, the narrow street.
MUST NOT APPEAR: other signs, any other text."""),
  "Ved indkørslen til en gade står denne tavle med undertavlen »Beboerkørsel tilladt«. Du bor ikke selv i gaden. Hvornår må du køre ind?",
  "This sign with the plate «Residents' traffic allowed» stands at the entrance to a street. You do not live in the street yourself. When "
  "may you drive in?",
  "در ورودی یک خیابان این تابلو با زیرتابلوی «رفت‌وآمد ساکنان مجاز است» قرار دارد. خودتان در این خیابان ساکن نیستید. کی می‌توانید وارد "
  "شوید؟",
  S(True, "Når jeg kører en person hjem, som bor i gaden.", "When I am driving home a person who lives in the street.",
    "وقتی کسی را که در این خیابان زندگی می‌کند به خانه‌اش می‌برم.",
    "Beboerkørsel er kørsel, hvor bilen føres af eller har en person med, der bor eller har sin virksomhed på strækningen.",
    "Residents' traffic means driving where the car is driven by, or carries, someone who lives or has their business on the stretch.",
    "رفت‌وآمد ساکنان یعنی خودرو را کسی براند یا کسی را همراه داشته باشد که در این بخش زندگی یا کسب‌وکار دارد."),
  S(False, "Når jeg skal aflevere en pakke i en butik i gaden.", "When I have to deliver a parcel to a shop in the street.",
    "وقتی باید بسته‌ای را به مغازه‌ای در این خیابان تحویل بدهم.",
    "Det er varekørsel og ikke beboerkørsel, så det er ikke tilladt her.", "That is delivery traffic, not residents' traffic, so it is not allowed here.",
    "این رفت‌وآمد برای تحویل کالاست، نه رفت‌وآمد ساکنان، پس این‌جا مجاز نیست."),
  S(False, "Når jeg vil finde en parkeringsplads tæt på centrum.", "When I want to find a parking space close to the centre.",
    "وقتی می‌خواهم نزدیک مرکز شهر جای پارک پیدا کنم.",
    "Undertavlen tillader kun beboerkørsel.", "The plate only allows residents' traffic.", "زیرتابلو فقط رفت‌وآمد ساکنان را مجاز می‌کند."),
  S(False, "Altid, så længe jeg kører langsomt.", "Always, as long as I drive slowly.", "همیشه، تا وقتی آهسته برانم.",
    "Forbuddet gælder alle andre end beboerkørsel, uanset farten.", "The ban applies to everyone except residents' traffic, whatever the speed.",
    "این ممنوعیت، با هر سرعتی، برای همه به‌جز رفت‌وآمد ساکنان برقرار است."),
)

Q(5921, "6.1", view("""
THE SCENE: a road passing a hospital; on the right verge stands a red-bordered white warning triangle (point up) showing a black
helicopter; beyond the trees a helicopter is coming in low towards a landing pad next to the hospital buildings.
MUST BE CLEARLY VISIBLE: the warning sign with the helicopter, the low helicopter near the hospital.
MUST NOT APPEAR: other signs, text, logos."""),
  "Nær et hospital kører du forbi denne tavle. Hvad betyder den?",
  "Near a hospital you pass this sign. What does it mean?",
  "نزدیک یک بیمارستان از کنار این تابلو می‌گذرید. معنایش چیست؟",
  S(True, "Der kan komme helikoptere lavt hen over vejen, fx når de lander og letter.", "Helicopters may come low over the road, for example when they land and take off.",
    "ممکن است هلی‌کوپترها، مثلاً هنگام فرود و برخاستن، در ارتفاع کم از روی جاده بگذرند.",
    "Tavlen advarer om lavtgående helikoptere, som kan forskrække og distrahere.", "The sign warns of low-flying helicopters, which may startle and distract.",
    "این تابلو از هلی‌کوپترهای کم‌ارتفاع هشدار می‌دهد که ممکن است باعث ترس و حواس‌پرتی شوند."),
  S(False, "Det er forbudt at standse ved hospitalet.", "It is forbidden to stop at the hospital.", "توقف کنار بیمارستان ممنوع است.",
    "Tavlen er en advarsel og siger ikke noget om standsning.", "The sign is a warning and says nothing about stopping.",
    "این تابلو هشدار است و چیزی درباره‌ی توقف نمی‌گوید."),
  S(False, "Vejen er forbeholdt ambulancer.", "The road is reserved for ambulances.", "این جاده مخصوص آمبولانس‌هاست.",
    "Tavlen advarer om helikoptere og forbyder ikke anden trafik.", "The sign warns of helicopters and does not ban other traffic.",
    "این تابلو از هلی‌کوپتر هشدار می‌دهد و ترافیک دیگر را ممنوع نمی‌کند."),
)

Q(5922, "7.6", view("""
THE SCENE: a residential road in the outskirts of a town; a cat runs across the road a short distance in front of us from the right;
in the interior rear-view mirror at the top of the picture a car follows close behind us; an oncoming car is in the other lane.
MUST BE CLEARLY VISIBLE: the cat running across the road, the car close behind in the mirror, the oncoming car.
MUST NOT APPEAR: signs, text."""),
  "En kat løber pludselig ud på vejen foran dig. Bag dig kører en bil tæt på, og der kommer en bil imod dig. Hvad gør du?",
  "A cat suddenly runs out onto the road in front of you. A car is close behind you, and a car is coming towards you. What do you do?",
  "گربه‌ای ناگهان جلوی شما به جاده می‌دود. خودرویی نزدیکِ پشت سرتان است و خودرویی از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg undgår at svinge voldsomt ud for at undgå katten.", "I avoid swerving violently to miss the cat.",
    "برای نزدن به گربه، فرمان را به‌شدت نمی‌چرخانم.",
    "Et voldsomt undvigelsesforsøg kan få dig til at ramme den modkørende eller køre af vejen.",
    "A violent attempt to swerve can make you hit the oncoming car or leave the road.",
    "تلاش شدید برای فرار ممکن است باعث برخورد با خودروی روبه‌رو یا خروج از جاده شود."),
  S(False, "Jeg bremser altid så hårdt som muligt, uanset bilen bag mig.", "I always brake as hard as possible, whatever the car behind me does.",
    "همیشه تا جای ممکن شدید ترمز می‌کنم، هر کاری که خودروی پشت سر بکند.",
    "En hård opbremsning kan få bilen bag dig til at køre ind i dig; tænk på den samlede fare.",
    "Hard braking can make the car behind run into you; consider the overall danger.", "ترمز شدید ممکن است باعث شود خودروی پشت سر به شما بزند؛ خطر کلی را در نظر بگیرید."),
  S(False, "Jeg svinger over i den modsatte vognbane for at undgå katten.", "I swerve into the opposite lane to avoid the cat.",
    "برای نزدن به گربه به خط مقابل می‌روم.",
    "Der kommer en bil imod dig, så det kan ende i et frontalt sammenstød.", "A car is coming towards you, so it could end in a head-on collision.",
    "خودرویی از روبه‌رو می‌آید و ممکن است به تصادف رودررو بینجامد."),
  S(False, "Jeg sætter farten op, så katten når at løbe væk.", "I speed up so that the cat has time to run away.",
    "سرعتم را بیشتر می‌کنم تا گربه فرصت فرار داشته باشد.",
    "Højere fart giver mindre tid til at reagere, både for dig og for dyret.", "Higher speed gives less time to react, both for you and for the animal.",
    "سرعت بیشتر هم به شما و هم به حیوان فرصت کمتری برای واکنش می‌دهد."),
)

Q(5923, "7.6", view("""
THE SCENE: a road outside town at night without street lights; in the light of our dipped headlights a person lies motionless in the
middle of our lane; no vehicles nearby.
MUST BE CLEARLY VISIBLE: the person lying in our lane in the headlights.
MUST NOT APPEAR: blood, signs, text.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt. Midt i din vognbane ligger en person på vejen og bevæger sig ikke. Hvad gør du?",
  "It is dark. A person is lying in the middle of your lane and is not moving. What do you do?",
  "هوا تاریک است. شخصی وسط خط شما روی جاده افتاده و حرکت نمی‌کند. چه می‌کنید؟",
  S(True, "Jeg standser i god afstand og tænder havariblinket.", "I stop at a good distance and switch on the hazard lights.",
    "با فاصله‌ی کافی می‌ایستم و چراغ‌های خطر را روشن می‌کنم.",
    "Så kommer du ikke selv for tæt på, og andre bliver advaret.", "Then you do not get too close yourself, and others are warned.",
    "این‌طور خودتان خیلی نزدیک نمی‌شوید و به دیگران هم هشدار داده می‌شود."),
  S(True, "Jeg advarer andre trafikanter, fx med advarselstrekanten, så personen ikke bliver kørt ned.",
    "I warn other road users, for example with the warning triangle, so that the person is not run over.",
    "به دیگران، مثلاً با مثلث هشدار، هشدار می‌دهم تا کسی از روی آن شخص رد نشود.",
    "I mørke kan andre bilister først se personen meget sent.", "In the dark other drivers may only see the person very late.",
    "در تاریکی ممکن است رانندگان دیگر آن شخص را خیلی دیر ببینند."),
  S(True, "Jeg ringer 1-1-2 og hjælper personen, så godt jeg kan.", "I call 1-1-2 and help the person as well as I can.",
    "با ۱۱۲ تماس می‌گیرم و تا جایی که می‌توانم به او کمک می‌کنم.",
    "Personen kan være kommet til skade eller syg og have brug for hurtig hjælp.", "The person may be injured or ill and need help quickly.",
    "ممکن است آن شخص آسیب دیده یا بیمار باشد و به کمک فوری نیاز داشته باشد."),
  S(False, "Jeg kører forsigtigt udenom og fortsætter, fordi politiet nok allerede er på vej.",
    "I drive carefully round and carry on, because the police are probably already on their way.",
    "با احتیاط از کنارش رد می‌شوم و ادامه می‌دهم، چون احتمالاً پلیس در راه است.",
    "Du kan ikke vide, om nogen har slået alarm, og personen kan blive kørt ned.",
    "You cannot know whether anyone has raised the alarm, and the person may be run over.",
    "نمی‌دانید کسی خبر داده یا نه و ممکن است کسی از روی او رد شود."),
)

Q(5924, "7.6", view("""
THE SCENE: a narrow road running along the top of a grassy dike by the sea; sheep graze freely on both sides of the road without any
fence; one sheep stands right at the edge of the road.
MUST BE CLEARLY VISIBLE: the sheep grazing on both sides, the sheep at the road edge, the absence of fences.
MUST NOT APPEAR: signs, text, people."""),
  "Du kører ad en smal vej på et dige. Får går frit omkring på begge sider af vejen. Hvordan forholder du dig?",
  "You are driving along a narrow road on a dike. Sheep are wandering freely on both sides of the road. What do you do?",
  "در جاده‌ای باریک روی یک سد خاکی کنار دریا می‌رانید. گوسفندها آزادانه در دو طرف جاده می‌چرند. چه می‌کنید؟",
  S(True, "Jeg kører langsomt og er klar til at standse, hvis et får går ud på vejen.",
    "I drive slowly and am ready to stop if a sheep walks onto the road.", "آهسته می‌رانم و آماده‌ام اگر گوسفندی وارد جاده شد بایستم.",
    "Dyrene kan pludselig gå eller springe ud på vejen.", "The animals may suddenly walk or jump out onto the road.",
    "حیوانات ممکن است ناگهان وارد جاده شوند یا بپرند."),
  S(False, "Fårene er vant til biler, så jeg kan holde farten.", "The sheep are used to cars, so I can keep my speed.",
    "گوسفندها به خودرو عادت دارند، پس می‌توانم سرعتم را حفظ کنم.",
    "Du kan ikke regne med, hvad dyrene gør.", "You cannot count on what the animals will do.", "نمی‌توانید روی کار حیوانات حساب کنید."),
  S(False, "Jeg dytter, så fårene holder sig væk fra vejen.", "I sound the horn so that the sheep keep away from the road.",
    "بوق می‌زنم تا گوسفندها از جاده دور بمانند.",
    "Et dyt kan skræmme dyrene, så de løber ud foran bilen.", "A hoot may frighten the animals so that they run out in front of the car.",
    "بوق ممکن است حیوانات را بترساند و جلوی خودرو بدوند."),
)

Q(5925, "7.6", view("""
THE SCENE: a two-lane country road; ahead in our lane a tractor drives slowly along the right verge with a mowing machine on a long arm
reaching out over the grass; an amber light flashes on the tractor's roof; bits of grass fly from the mower.
MUST BE CLEARLY VISIBLE: the tractor with the mowing arm over the verge, the amber flashing light.
MUST NOT APPEAR: signs, text, logos."""),
  "En traktor med en græsslåmaskine på en lang arm slår græs i rabatten og kører langsomt i din side af vejen. Den har gult blink. Hvordan "
  "forholder du dig?",
  "A tractor with a mower on a long arm is cutting the grass on the verge and moving slowly on your side of the road. It has an amber "
  "flashing light. What do you do?",
  "تراکتوری با ماشین چمن‌زن روی بازویی بلند، چمن شانه‌ی جاده را می‌زند و آهسته در سمت شما حرکت می‌کند. چراغ چشمک‌زن زرد دارد. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og holder god afstand.", "I slow down and keep a good distance.", "سرعتم را کم می‌کنم و فاصله‌ی کافی نگه می‌دارم.",
    "Traktoren kører langsomt og kan standse pludseligt, mens den arbejder.", "The tractor is slow and may stop suddenly while it works.",
    "تراکتور آهسته است و ممکن است هنگام کار ناگهان بایستد."),
  S(True, "Jeg overhaler kun, når det kan ske uden fare og med god afstand til traktoren.",
    "I only overtake when it can be done without danger and with a good distance to the tractor.",
    "فقط وقتی سبقت می‌گیرم که بی‌خطر باشد و با فاصله‌ی کافی از تراکتور.",
    "Armen og maskinen kan rage ud, og den modsatte vognbane skal være fri.", "The arm and the machine may stick out, and the opposite lane must be clear.",
    "بازو و دستگاه ممکن است بیرون زده باشند و خط مقابل باید خالی باشد."),
  S(True, "Jeg er forberedt på, at der kan blive slynget sten og græs ud.", "I am prepared for stones and grass to be thrown out.",
    "آماده‌ام که سنگ و علف به بیرون پرتاب شود.",
    "Græsslåmaskinen kan kaste småsten og afklip ud mod vejen.", "The mower can throw small stones and cuttings out towards the road.",
    "چمن‌زن ممکن است سنگ‌ریزه و علف بریده را به سمت جاده پرتاب کند."),
  S(False, "Det gule blink betyder, at jeg skal standse, til traktoren er færdig.", "The amber flashing means that I must stop until the tractor has finished.",
    "چشمک زرد یعنی باید تا تمام شدن کار تراکتور بایستم.",
    "Gult blink betyder, at du skal være særligt forsigtig, ikke at du skal standse.", "Amber flashing means you must take special care, not that you must stop.",
    "چشمک زرد یعنی احتیاط ویژه، نه این‌که باید بایستید."),
)
