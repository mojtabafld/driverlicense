# «آزمون جدید», batch 4 (5301–5400), part b: the car (1.2), stopping and parking (7.18), overtaking (7.9), signs (6.1),
# people beside the road (7.6), speed (7.3).
# Rules: Færdselsloven §§ 2 nr. 18 (a broken-down vehicle counts as parked after 18 hours), 3, 4, 15 stk. 3, 21–23 (§ 23
# stk. 1 nr. 3: at blind hills unless two lanes without oncoming traffic), 28 stk. 3–4, 31 stk. 2, 32 stk. 1, 41 stk. 1–2,
# 67 stk. 3; Bekendtgørelse om vejafmærkning (A 20 «Kø», A 38 «Lunke», A 91 «Oplukkelig bro», C 62, C 92, E 49 «Gågade»,
# E 80 «Generelle hastighedsbegrænsninger» with UE 80, E 90 «Automatisk trafikkontrol», E 91 «Fartviser», T 33 bays kept
# for the vehicle whose symbol is in them); FDM on times on plates (black: weekdays, in brackets: Saturdays, red: Sundays
# and public holidays).
from nq import Q, S, above, picture, town, view

Q(5326, "1.2", picture("""
A close-up of a car's footwell seen from the driver's seat: the driver's right foot presses the brake pedal, which has gone almost
all the way down to the floor mat; the accelerator pedal beside it.
MUST BE CLEARLY VISIBLE: the brake pedal pressed almost to the floor.
MUST NOT APPEAR: text, numbers, brand names."""),
  "Under kørslen mærker du, at bremsepedalen er blød og skal trædes meget længere ned end normalt. Hvad gør du?",
  "While driving, you notice that the brake pedal is soft and has to be pressed much further down than usual. What do you do?",
  "هنگام رانندگی متوجه می‌شوید پدال ترمز نرم شده و باید خیلی بیشتر از معمول پایینش ببرید. چه می‌کنید؟",
  S(True, "Jeg standser forsigtigt et sikkert sted og kører ikke videre, før bremserne er efterset.",
    "I stop carefully at a safe place and do not drive on until the brakes have been checked.",
    "با احتیاط جایی امن می‌ایستم و تا ترمزها بررسی نشده‌اند، ادامه نمی‌دهم.",
    "Bremserne kan svigte helt, og det er farligt at køre videre.", "The brakes may fail completely, and it is dangerous to drive on.",
    "ممکن است ترمزها کاملاً از کار بیفتند و ادامه‌ی رانندگی خطرناک است."),
  S(False, "Jeg kan køre videre, hvis jeg bare træder hårdere på pedalen.", "I can drive on if I just press the pedal harder.",
    "اگر پدال را محکم‌تر فشار دهم، می‌توانم ادامه دهم.",
    "Fejlen kan blive værre, og som fører skal du sikre dig, at bremserne virker.",
    "The fault can get worse, and as the driver you must make sure that the brakes work.",
    "عیب ممکن است بدتر شود و شما به‌عنوان راننده باید مطمئن شوید ترمزها کار می‌کنند."),
  S(True, "Det kan skyldes for lidt bremsevæske eller en utæthed i bremsesystemet.", "It may be caused by too little brake fluid or a leak in the brake system.",
    "علتش می‌تواند کم بودن روغن ترمز یا نشتی در سیستم ترمز باشد.",
    "Det er typiske årsager til en blød bremsepedal, ligesom luft i systemet.", "Those are typical causes of a soft brake pedal, as is air in the system.",
    "این‌ها، مثل هوا در سیستم، علت‌های رایج نرم شدن پدال ترمزند."),
  S(False, "Det er nok at få bremserne set efter ved næste service.", "It is enough to have the brakes looked at at the next service.",
    "کافی است ترمزها در سرویس بعدی بررسی شوند.",
    "En fejl ved bremserne skal udbedres, før du kører videre.", "A brake fault must be put right before you drive on.",
    "عیب ترمز باید پیش از ادامه‌ی رانندگی برطرف شود."),
)

Q(5327, "1.2", above("""
THE SCENE: a straight two-way road seen from above, one lane in each direction.
VEHICLES (colour code used strictly): a RED car (ours) braking, its brake lights lit; a DASHED ORANGE line shows its path curving
away to the right towards the edge of the road, and a SOLID GREEN arrow shows the straight path it should keep.
MUST NOT APPEAR: other vehicles, signs, text."""),
  "Når du bremser, trækker bilen tydeligt til den ene side. Hvad gælder?",
  "When you brake, the car clearly pulls to one side. What applies?",
  "وقتی ترمز می‌گیرید، خودرو به‌وضوح به یک طرف کشیده می‌شود. چه قاعده‌ای برقرار است؟",
  S(True, "Bremserne virker ikke ens i begge sider, og bilen skal efterses hurtigst muligt.",
    "The brakes do not work equally on both sides, and the car must be checked as soon as possible.",
    "ترمزها در دو طرف یکسان کار نمی‌کنند و خودرو باید هرچه زودتر بررسی شود.",
    "Ved en hård opbremsning kan bilen skride ud; skævtræk kan også skyldes forskelligt dæktryk.",
    "In hard braking the car may skid; pulling can also be caused by different tyre pressures.",
    "در ترمز شدید ممکن است خودرو منحرف شود؛ کشیده شدن می‌تواند از فشار باد متفاوت لاستیک‌ها هم باشد."),
  S(False, "Det er normalt, at en bil trækker lidt, så jeg retter bare op med rattet.",
    "It is normal for a car to pull a little, so I just correct it with the steering wheel.",
    "طبیعی است که خودرو کمی کشیده شود، پس فقط با فرمان اصلاحش می‌کنم.",
    "En bil i orden bremser lige ud; skævtræk er tegn på en fejl.", "A car in good order brakes in a straight line; pulling is a sign of a fault.",
    "خودروی سالم در خط مستقیم ترمز می‌کند؛ کشیده شدن نشانه‌ی عیب است."),
  S(False, "Det skyldes vejens hældning og har intet med bilen at gøre.", "It is caused by the slope of the road and has nothing to do with the car.",
    "علتش شیب جاده است و ربطی به خودرو ندارد.",
    "Trækker bilen tydeligt, hver gang du bremser, er der noget galt med bilen.",
    "If the car clearly pulls every time you brake, something is wrong with the car.",
    "اگر خودرو هر بار که ترمز می‌گیرید به‌وضوح کشیده شود، خودرو ایراد دارد."),
)

Q(5328, "1.2", picture("""
The rear of a small open box trailer hitched to a car's tow bar, seen from behind: the trailer's rear lights, brake lights and left
indicator are lit; its electric cable runs from the trailer's drawbar and is plugged into the socket beside the car's tow bar.
MUST BE CLEARLY VISIBLE: the trailer's lit rear lights and indicator, the plugged-in cable.
MUST NOT APPEAR: text, characters on number plates, brand names."""),
  "Du har koblet en trailer på bilen og skal til at køre. Hvad gælder om trailerens lygter?",
  "You have hitched a trailer to the car and are about to drive. What applies to the trailer's lights?",
  "یک تریلر به خودرو وصل کرده‌اید و می‌خواهید راه بیفتید. درباره‌ی چراغ‌های تریلر چه قاعده‌ای برقرار است؟",
  S(True, "Jeg sætter stikket i og kontrollerer, at baglygter, bremselys og blinklys virker.",
    "I plug in the connector and check that the rear lights, brake lights and indicators work.",
    "دوشاخه‌ی برق تریلر را وصل می‌کنم و بررسی می‌کنم چراغ‌های عقب، چراغ ترمز و راهنماها کار کنند.",
    "Som fører skal du sikre dig, at lygter og signaler virker, også på traileren.",
    "As the driver you must make sure that the lights and signals work, also on the trailer.",
    "شما به‌عنوان راننده باید مطمئن شوید چراغ‌ها و راهنماها کار می‌کنند، روی تریلر هم."),
  S(True, "Trailerens lygter skal virke, fordi bilens baglygter er skjult bag traileren.",
    "The trailer's lights must work because the car's rear lights are hidden behind the trailer.",
    "چراغ‌های تریلر باید کار کنند، چون چراغ‌های عقب خودرو پشت تریلر پنهان می‌شوند.",
    "Bagfra er det trailerens lygter og blinklys, der viser de andre, hvad du gør.",
    "From behind, it is the trailer's lights and indicators that show the others what you are doing.",
    "از پشت، چراغ‌ها و راهنماهای تریلر هستند که به دیگران نشان می‌دهند چه می‌کنید."),
  S(False, "Det er nok, at bilens egne baglygter virker.", "It is enough that the car's own rear lights work.",
    "کافی است چراغ‌های عقب خود خودرو کار کنند.",
    "Traileren skjuler dem; dens egne lygter skal virke.", "The trailer hides them; its own lights must work.",
    "تریلر آن‌ها را می‌پوشاند؛ چراغ‌های خود تریلر باید کار کنند."),
  S(True, "En hjælper kan stå bag traileren og se, om lygterne lyser, når jeg tænder dem og træder på bremsen.",
    "A helper can stand behind the trailer and see whether the lights come on when I switch them on and press the brake.",
    "کسی می‌تواند پشت تریلر بایستد و ببیند وقتی چراغ‌ها را روشن می‌کنم و ترمز می‌گیرم، روشن می‌شوند یا نه.",
    "Så kan du kontrollere bremselys og blinklys, som du ikke selv kan se fra førersædet.",
    "That way you can check brake lights and indicators that you cannot see yourself from the driver's seat.",
    "این‌طور چراغ ترمز و راهنماهایی را که از صندلی راننده نمی‌بینید بررسی می‌کنید."),
)

Q(5329, "7.18", town("""
THE SCENE: a town street with one lane in each direction. A grey car stands at the right kerb with its bonnet open and its hazard
lights flashing. On the pavement beside it stands a round sign with a blue field, a red border and one red diagonal bar (the Danish
no-parking sign).
MUST BE CLEARLY VISIBLE: the car with the open bonnet, the no-parking sign.
MUST NOT APPEAR: people, text."""),
  "Din bil er gået i stykker, og du har måttet efterlade den ved kantstenen på en gade med parkeringsforbud. Den kan først blive hentet i morgen. Hvad gælder?",
  "Your car has broken down, and you have had to leave it at the kerb in a street with a parking ban. It can only be collected tomorrow. What applies?",
  "خودروتان خراب شده و مجبور شده‌اید آن را کنار جدولِ خیابانی با ممنوعیت پارک بگذارید. فقط فردا می‌شود آن را برد. چه قاعده‌ای برقرار است؟",
  S(True, "Når bilen har holdt der i 18 timer, regnes den for parkeret.", "When the car has stood there for 18 hours, it counts as parked.",
    "وقتی خودرو ۱۸ ساعت آنجا مانده باشد، پارک‌شده حساب می‌شود.",
    "Et køretøj, der efterlades, fordi det efter et uheld eller en teknisk fejl ikke kan køre videre, anses for parkeret 18 timer efter, at det er hensat.",
    "A vehicle left because it cannot go on after an accident or a technical fault counts as parked 18 hours after it was left.",
    "وسیله‌ای که به‌خاطر تصادف یا نقص فنی نمی‌تواند ادامه دهد و رها شده، ۱۸ ساعت پس از رها شدن پارک‌شده حساب می‌شود."),
  S(True, "Holder bilen, så den er til fare for andre, skal den fjernes hurtigst muligt, og andre skal advares.",
    "If the car stands where it is a danger to others, it must be removed as soon as possible and others must be warned.",
    "اگر خودرو طوری ایستاده که برای دیگران خطرناک است، باید هرچه زودتر برداشته شود و به دیگران هشدار داده شود.",
    "Et køretøj, der holder, så det er til fare, skal fjernes snarest muligt, og der skal advares, fx med en advarselstrekant.",
    "A vehicle standing where it is a danger must be removed as soon as possible, and a warning must be given, for example with a warning triangle.",
    "وسیله‌ای که در جای خطرناک ایستاده باید هرچه زودتر برداشته شود و هشدار داده شود، مثلاً با مثلث خطر."),
  S(False, "En bil med en teknisk fejl må holde der, lige så længe det tager at få den repareret.",
    "A car with a technical fault may stand there for as long as the repair takes.",
    "خودروی دارای نقص فنی تا هر وقت تعمیرش طول بکشد می‌تواند آنجا بماند.",
    "Efter 18 timer gælder parkeringsreglerne, også parkeringsforbuddet.", "After 18 hours the parking rules apply, including the parking ban.",
    "پس از ۱۸ ساعت قواعد پارک، از جمله ممنوعیت پارک، برقرار می‌شوند."),
  S(False, "Bilen regnes først for parkeret, når den har holdt der en uge.", "The car only counts as parked once it has stood there for a week.",
    "خودرو فقط وقتی پارک‌شده حساب می‌شود که یک هفته آنجا مانده باشد.",
    "Grænsen er 18 timer.", "The limit is 18 hours.", "این مدت ۱۸ ساعت است."),
)

Q(5330, "7.18", town("""
THE SCENE: the right kerb of a town street, free of cars. At the kerb stands a round sign with a blue field, a red border and one red
diagonal bar (the Danish no-parking sign); under it a white rectangular plate with the black times «9–17» on the first line and
«(9–13)» on the second line.
MUST BE CLEARLY VISIBLE: the no-parking sign and the plate with both lines of times.
MUST NOT APPEAR: other signs, other text."""),
  "Ved kantstenen står en tavle med parkeringsforbud. Undertavlen viser »9–17« og »(9–13)« med sort skrift. Hvad gælder?",
  "At the kerb stands a no-parking sign. The plate under it shows «9–17» and «(9–13)» in black. What applies?",
  "کنار جدول تابلوی پارک ممنوع هست. زیرتابلو با رنگ مشکی «9–17» و «(9–13)» را نشان می‌دهد. چه قاعده‌ای برقرار است؟",
  S(True, "En tirsdag kl. 18 må jeg parkere her.", "On a Tuesday at 6 pm I may park here.", "سه‌شنبه ساعت ۱۸ می‌توانم اینجا پارک کنم.",
    "Tider med sort skrift gælder på hverdage, og kl. 18 ligger efter forbuddets tidsrum.",
    "Times in black apply on weekdays, and 6 pm is after the ban's hours.",
    "ساعت‌های مشکی برای روزهای کاری‌اند و ساعت ۱۸ بعد از بازه‌ی ممنوعیت است."),
  S(False, "En lørdag kl. 11 må jeg parkere her.", "On a Saturday at 11 am I may park here.", "شنبه ساعت ۱۱ می‌توانم اینجا پارک کنم.",
    "Tiden i parentes gælder lørdage, så forbuddet gælder lørdag fra 9 til 13.",
    "The time in brackets applies on Saturdays, so the ban applies on Saturday from 9 to 13.",
    "ساعت داخل پرانتز برای شنبه‌هاست، پس ممنوعیت شنبه از ۹ تا ۱۳ برقرار است."),
  S(True, "En søndag må jeg parkere her hele dagen.", "On a Sunday I may park here all day.", "یکشنبه تمام روز می‌توانم اینجا پارک کنم.",
    "Tider for søn- og helligdage står med rød skrift; her er der ingen, så forbuddet gælder ikke om søndagen.",
    "Times for Sundays and public holidays are in red; there are none here, so the ban does not apply on Sundays.",
    "ساعت‌های یکشنبه و تعطیلات رسمی با رنگ قرمز نوشته می‌شوند؛ اینجا چنین ساعتی نیست، پس ممنوعیت یکشنبه برقرار نیست."),
  S(False, "Tiden i parentes gælder søn- og helligdage.", "The time in brackets applies on Sundays and public holidays.",
    "ساعت داخل پرانتز برای یکشنبه‌ها و تعطیلات رسمی است.",
    "Tider i parentes gælder lørdage; søn- og helligdage står med rød skrift.", "Times in brackets apply on Saturdays; Sundays and public holidays are in red.",
    "ساعت‌های داخل پرانتز برای شنبه‌هاست؛ یکشنبه‌ها و تعطیلات با رنگ قرمز نوشته می‌شوند."),
)

Q(5331, "7.18", town("""
THE SCENE: a car park with bays marked by white lines, seen from the driver's seat as we drive slowly along its lane. The only free bay
ahead is narrower than the others and has a white motorcycle symbol painted in it; in the narrow bay beside it two motorcycles are
parked; all the other bays are taken by cars.
MUST BE CLEARLY VISIBLE: the free narrow bay with the motorcycle symbol.
MUST NOT APPEAR: signs, text, people."""),
  "Den eneste ledige bås på parkeringspladsen er afmærket med et motorcykelsymbol. Du kører i bil. Hvad gælder?",
  "The only free bay in the car park is marked with a motorcycle symbol. You are driving a car. What applies?",
  "تنها جای خالی پارکینگ با نماد موتورسیکلت مشخص شده است. شما با خودرو هستید. چه قاعده‌ای برقرار است؟",
  S(True, "Båsen er forbeholdt motorcykler, så jeg må ikke parkere bilen der.", "The bay is reserved for motorcycles, so I must not park the car there.",
    "این جا مخصوص موتورسیکلت است، پس نباید خودرو را آنجا پارک کنم.",
    "Et symbol i båsen, fx for motorcykel, bus eller taxi, forbeholder båsen til den slags køretøjer.",
    "A symbol in the bay, for example for motorcycle, bus or taxi, reserves the bay for that kind of vehicle.",
    "نمادی داخل جای پارک، مثلاً موتورسیکلت، اتوبوس یا تاکسی، آن جا را مخصوص همان نوع وسیله می‌کند."),
  S(False, "Jeg må parkere der, når der ikke holder nogen motorcykler.", "I may park there when no motorcycles are parked there.",
    "وقتی موتورسیکلتی آنجا نیست، می‌توانم پارک کنم.",
    "Båsen er forbeholdt motorcykler, også når den er tom.", "The bay is reserved for motorcycles, also when it is empty.",
    "این جا حتی وقتی خالی است مخصوص موتورسیکلت است."),
  S(False, "Jeg må parkere der, hvis bilen kan være inden for linjerne.", "I may park there if the car fits inside the lines.",
    "اگر خودرو داخل خط‌ها جا شود، می‌توانم آنجا پارک کنم.",
    "Det er symbolet, der bestemmer, hvem båsen er til, ikke dens størrelse.", "It is the symbol that decides whom the bay is for, not its size.",
    "نماد تعیین می‌کند آن جا برای کیست، نه اندازه‌اش."),
)

Q(5332, "7.18", picture("""
A small car parked in a marked parking space at the kerb in front of a little corner shop with newspapers on a stand outside. The
driver, a few steps away from the car and walking towards the shop, points the car key back at the car; the car's indicator lights
flash once to show that it is locking.
MUST BE CLEARLY VISIBLE: the parked car, the driver with the key in hand.
MUST NOT APPEAR: text, shop names, brand names."""),
  "Du skal handle i en kiosk og regner med at være væk fra bilen i omkring 10 minutter. Hvordan forholder du dig?",
  "You are going shopping in a kiosk and expect to be away from the car for about 10 minutes. What do you do?",
  "می‌خواهید از یک فروشگاه کوچک خرید کنید و حدود ۱۰ دقیقه از خودرو دور می‌شوید. چه می‌کنید؟",
  S(True, "Jeg trækker håndbremsen, så bilen ikke kan rulle.", "I apply the handbrake so that the car cannot roll.",
    "ترمزدستی را می‌کشم تا خودرو حرکت نکند.",
    "Når føreren forlader køretøjet, skal det sikres, så det ikke kan sætte sig i gang af sig selv.",
    "When the driver leaves the vehicle, it must be secured so that it cannot start moving by itself.",
    "وقتی راننده از خودرو دور می‌شود، باید آن را طوری ایمن کند که خودبه‌خود راه نیفتد."),
  S(True, "Jeg låser bilen og tager nøglen med mig.", "I lock the car and take the key with me.", "درها را قفل می‌کنم و سوئیچ را با خودم می‌برم.",
    "Føreren skal sikre, at bilen ikke uberettiget kan bruges af andre.", "The driver must make sure that the car cannot be used by others without permission.",
    "راننده باید مطمئن شود دیگران بدون اجازه نمی‌توانند از خودرو استفاده کنند."),
  S(False, "Jeg lader motoren køre og nøglen sidde, fordi jeg snart er tilbage.", "I leave the engine running and the key in, because I will soon be back.",
    "موتور را روشن و سوئیچ را سر جایش می‌گذارم، چون زود برمی‌گردم.",
    "Så kan andre køre væk i bilen; den skal sikres, også når du kun er væk kort tid.",
    "Then others can drive off in the car; it must be secured, also when you are only away for a short time.",
    "این‌طور دیگران می‌توانند با خودرو بروند؛ حتی وقتی کوتاه دور هستید، باید ایمن شود."),
  S(True, "Jeg holder et sted, hvor det er tilladt at parkere.", "I stop at a place where parking is allowed.", "جایی می‌ایستم که پارک در آن مجاز است.",
    "Holder bilen i mere end 3 minutter, er det parkering, og så skal parkeringsreglerne overholdes.",
    "If the car stands for more than 3 minutes, it is parking, and then the parking rules must be kept.",
    "اگر خودرو بیش از ۳ دقیقه بایستد، پارک حساب می‌شود و باید قواعد پارک رعایت شود."),
)

Q(5333, "7.18", view("""
THE SCENE: a two-way country road outside town, no houses. Along the right side a wide grass strip separates the carriageway from a
cycle path with its own kerb; beyond the cycle path, fields.
MUST BE CLEARLY VISIBLE: the carriageway, the wide grass strip, the cycle path beside it.
MUST NOT APPEAR: signs, text, other vehicles."""),
  "Uden for byen vil du holde ind og ringe til nogen. Mellem kørebanen og cykelstien er der en bred græsrabat. Hvad gælder?",
  "Outside town you want to pull in and phone someone. Between the carriageway and the cycle path there is a wide grass verge. What applies?",
  "بیرون شهر می‌خواهید کنار بکشید و به کسی زنگ بزنید. بین سواره‌رو و مسیر دوچرخه یک نوار چمنی پهن هست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må holde med en del af bilen på græsrabatten.", "I may stand with part of the car on the grass verge.",
    "می‌توانم با بخشی از خودرو روی نوار چمنی بایستم.",
    "Uden for tættere bebygget område må et køretøj på højst 3.500 kg standse eller parkere med en del af køretøjet på fortov eller skillerabat.",
    "Outside built-up areas a vehicle of at most 3,500 kg may stop or park with part of the vehicle on a pavement or a separating verge.",
    "بیرون از محدوده‌ی شهری، وسیله‌ای با وزن کل مجاز حداکثر ۳٬۵۰۰ کیلوگرم می‌تواند با بخشی از خود روی پیاده‌رو یا نوار جداکننده توقف یا پارک کند."),
  S(False, "Jeg må holde på cykelstien, når der ikke kommer cyklister.", "I may stand on the cycle path when no cyclists are coming.",
    "وقتی دوچرخه‌سواری نمی‌آید، می‌توانم روی مسیر دوچرخه بایستم.",
    "Standsning og parkering på cykelsti er forbudt.", "Stopping and parking on a cycle path are forbidden.", "توقف و پارک روی مسیر دوچرخه ممنوع است."),
  S(True, "Inde i byen må jeg ikke holde med hjulene oppe på fortovet.", "In town I must not stand with the wheels up on the pavement.",
    "داخل شهر نباید با چرخ‌ها روی پیاده‌رو بایستم.",
    "Undtagelsen for fortov og skillerabat gælder kun uden for tættere bebygget område.",
    "The exception for pavements and separating verges only applies outside built-up areas.",
    "استثنای پیاده‌رو و نوار جداکننده فقط بیرون از محدوده‌ی شهری برقرار است."),
  S(False, "Rabatten må kun bruges af lastbiler.", "The verge may only be used by lorries.", "از نوار چمنی فقط کامیون‌ها می‌توانند استفاده کنند.",
    "Undtagelsen gælder netop køretøjer på højst 3.500 kg, fx almindelige personbiler.",
    "The exception is precisely for vehicles of at most 3,500 kg, such as ordinary cars.",
    "این استثنا دقیقاً برای وسایل حداکثر ۳٬۵۰۰ کیلوگرمی، مثل خودروهای سواری معمولی، است."),
)

Q(5334, "7.9", view("""
THE SCENE: a road climbing a long hill. On our side there are TWO lanes going uphill, separated by a broken white line; on the left,
separated from them by an unbroken white centre line, one lane for oncoming traffic. A slow white lorry climbs in the right lane
about 40 m ahead of us; our left lane is free. Ahead the road disappears over the crest of the hill, so nothing behind the crest can
be seen.
MUST BE CLEARLY VISIBLE: the two uphill lanes, the unbroken centre line, the slow lorry in the right lane, the crest.
MUST NOT APPEAR: signs, text."""),
  "Op ad en lang bakke har din side af vejen to vognbaner, mens de modkørende har én. En langsom lastbil kører i den højre vognbane, og du kan ikke se over bakketoppen. Hvad gælder?",
  "Up a long hill, your side of the road has two lanes, while the oncoming traffic has one. A slow lorry is in the right lane, and you cannot see over the hilltop. What applies?",
  "در یک سربالایی طولانی، سمت شما دو خط دارد و سمت مقابل یک خط. یک کامیون کُند در خط راست می‌رود و آن طرف بالای تپه را نمی‌بینید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må godt overhale lastbilen i min venstre vognbane, selv om jeg ikke kan se over bakketoppen.",
    "I may overtake the lorry in my left lane, even though I cannot see over the hilltop.",
    "می‌توانم در خط چپِ سمت خودم از کامیون سبقت بگیرم، با این‌که آن طرف تپه را نمی‌بینم.",
    "Forbuddet mod overhaling ved uoverskuelige bakker gælder ikke, når kørebanen i din retning har mindst to vognbaner, hvor der ikke må komme modkørende.",
    "The ban on overtaking at blind hills does not apply when the carriageway in your direction has at least two lanes where oncoming traffic is not allowed.",
    "ممنوعیت سبقت در تپه‌های بی‌دید وقتی برقرار نیست که سواره‌روی سمت شما دست‌کم دو خط داشته باشد که ترافیک روبه‌رو حق ورود به آن‌ها را ندارد."),
  S(False, "Jeg må aldrig overhale før en bakketop.", "I may never overtake before a hilltop.", "هیچ‌وقت نباید پیش از بالای تپه سبقت بگیرم.",
    "Med mindst to vognbaner i din retning uden modkørende er det tilladt.", "With at least two lanes in your direction and no oncoming traffic in them, it is allowed.",
    "با دست‌کم دو خط در جهت شما و بدون ترافیک روبه‌رو در آن‌ها، مجاز است."),
  S(True, "Jeg må ikke køre over i de modkørendes vognbane.", "I must not move over into the oncoming lane.", "نباید وارد خط ترافیک روبه‌رو شوم.",
    "Midterlinjen er ubrudt, og over bakketoppen kan der komme modkørende, som du ikke kan se.",
    "The centre line is unbroken, and oncoming traffic you cannot see may come over the hilltop.",
    "خط وسط ممتد است و ممکن است از آن طرف تپه وسایلی بیایند که آن‌ها را نمی‌بینید."),
  S(False, "Lastbilen skal køre over i venstre vognbane, så jeg kan komme forbi i højre.",
    "The lorry must move over into the left lane so that I can get past on the right.",
    "کامیون باید به خط چپ برود تا من از راست رد شوم.",
    "Langsomme køretøjer skal holde til højre, og overhaling sker til venstre.", "Slow vehicles must keep right, and overtaking is done on the left.",
    "وسایل کُند باید سمت راست بمانند و سبقت از چپ انجام می‌شود."),
)

Q(5335, "7.9", view("""
THE SCENE: a two-lane country road in heavy rain, with a broken centre line. About 25 m ahead a large lorry throws up a thick cloud
of spray from its wheels that hides most of the road beyond it; our windscreen is streaked with water.
MUST BE CLEARLY VISIBLE: the lorry, the cloud of spray hiding the road ahead.
MUST NOT APPEAR: signs, text.""", cond="heavy rain, wet road, poor visibility"),
  "Det regner kraftigt, og lastbilen foran dig sprøjter så meget vand op, at du dårligt kan se. Du vil overhale den. Hvordan forholder du dig?",
  "It is raining heavily, and the lorry in front of you throws up so much spray that you can hardly see. You want to overtake it. What do you do?",
  "باران شدیدی می‌بارد و کامیونِ جلو آن‌قدر آب به هوا می‌پاشد که به‌سختی می‌بینید. می‌خواهید از آن سبقت بگیرید. چه می‌کنید؟",
  S(True, "Jeg holder større afstand til lastbilen, så jeg bedre kan se frem forbi den.",
    "I keep a larger distance to the lorry so that I can see better ahead past it.",
    "فاصله‌ام را با کامیون بیشتر می‌کنم تا جلوی مسیر را از کنار آن بهتر ببینم.",
    "Tæt bag lastbilen er du inde i vandtågen og kan hverken se de modkørende eller vejen.",
    "Close behind the lorry you are inside the spray and can see neither the oncoming traffic nor the road.",
    "نزدیک کامیون وسط مه آب هستید و نه ترافیک روبه‌رو را می‌بینید نه جاده را."),
  S(True, "Jeg overhaler kun, hvis jeg kan se, at den modsatte vognbane er fri langt nok frem.",
    "I only overtake if I can see that the opposite lane is clear far enough ahead.",
    "فقط وقتی سبقت می‌گیرم که ببینم خط مقابل تا فاصله‌ی کافی خالی است.",
    "Før du overhaler, skal du sikre dig, at den modsatte vognbane er fri på en tilstrækkelig lang strækning.",
    "Before you overtake, you must make sure that the opposite lane is clear for a long enough stretch.",
    "پیش از سبقت باید مطمئن شوید خط مقابل در طول کافی خالی است."),
  S(True, "Jeg sætter viskerne på højeste hastighed, før jeg trækker ud.", "I set the wipers to the highest speed before I pull out.",
    "پیش از بیرون رفتن، برف‌پاک‌کن‌ها را روی بیشترین سرعت می‌گذارم.",
    "Når du kører op langs lastbilen, får du ekstra meget vand på forruden.", "When you drive up alongside the lorry, you get a lot of extra water on the windscreen.",
    "وقتی کنار کامیون می‌رسید، آب خیلی بیشتری روی شیشه‌ی جلو می‌ریزد."),
  S(False, "Jeg lægger mig tæt bag lastbilen, så overhalingen tager kortere tid.",
    "I move up close behind the lorry so that the overtaking takes less time.",
    "نزدیک پشت کامیون می‌روم تا سبقت کوتاه‌تر شود.",
    "Tæt bag den ser du endnu mindre, og du har ikke tid til at reagere, hvis den bremser.",
    "Close behind it you see even less, and you have no time to react if it brakes.",
    "نزدیکش حتی کمتر می‌بینید و اگر ترمز کند فرصت واکنش ندارید."),
)

Q(5336, "7.9", view("""
THE SCENE: a straight two-lane country road with a broken centre line. Ahead of us, four cars drive in a close queue behind a slow
green tractor; the oncoming lane is free as far as can be seen, about 300 m, to where the road bends.
MUST BE CLEARLY VISIBLE: the queue of four cars, the tractor at its head, the bend far ahead.
MUST NOT APPEAR: signs, text."""),
  "Foran dig kører fire biler i kø bag en traktor. Du vil gerne forbi. Hvad gælder?",
  "In front of you, four cars are driving in a queue behind a tractor. You would like to get past. What applies?",
  "جلوی شما چهار خودرو پشت یک تراکتور صف کشیده‌اند و می‌روند. می‌خواهید رد شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Skal jeg forbi hele køen på én gang, skal den modsatte vognbane være fri over en meget lang strækning.",
    "If I am to pass the whole queue in one go, the opposite lane must be clear over a very long stretch.",
    "اگر بخواهم یک‌جا از کل صف رد شوم، خط مقابل باید در مسافت خیلی طولانی خالی باشد.",
    "Jo flere køretøjer du skal forbi, jo længere tid er du i den modsatte vognbane.",
    "The more vehicles you have to pass, the longer you are in the opposite lane.",
    "هرچه از وسایل بیشتری بخواهید رد شوید، مدت بیشتری در خط مقابل هستید."),
  S(False, "Kommer der en modkørende, kan jeg bare presse mig ind i et hul i køen.",
    "If an oncoming car appears, I can just squeeze into a gap in the queue.",
    "اگر خودرویی از روبه‌رو بیاید، کافی است خودم را در یک فاصله‌ی خالیِ صف جا بدهم.",
    "Du må kun begynde, når du har plads til at komme ind igen uden fare; et hul i køen kan være for lille.",
    "You may only begin when you have room to get back in safely; a gap in the queue may be too small.",
    "فقط وقتی می‌توانید شروع کنید که جای کافی برای برگشتن بی‌خطر داشته باشید؛ فاصله‌ی داخل صف ممکن است خیلی کم باشد."),
  S(True, "Jeg må ikke begynde at overhale, hvis bilen foran mig selv har givet tegn til at overhale.",
    "I must not begin overtaking if the car in front of me has itself signalled to overtake.",
    "اگر خودروی جلوی من خودش برای سبقت راهنما زده باشد، نباید سبقت را شروع کنم.",
    "Før du overhaler, skal du sikre dig, at den forankørende ikke har givet tegn til, at den vil overhale.",
    "Before you overtake, you must make sure that the one in front has not signalled that it is going to overtake.",
    "پیش از سبقت باید مطمئن شوید وسیله‌ی جلویی برای سبقت علامت نداده است."),
  S(False, "Jeg må overhale køen i højre side, hvis der er en bred rabat.", "I may overtake the queue on the right if there is a wide verge.",
    "اگر شانه‌ی جاده پهن باشد، می‌توانم از سمت راست از صف سبقت بگیرم.",
    "Overhaling skal ske til venstre, og rabatten er ikke til at køre på.", "Overtaking must be done on the left, and the verge is not for driving on.",
    "سبقت باید از چپ باشد و شانه‌ی جاده برای رانندگی نیست."),
)

Q(5337, "7.9", view("""
THE SCENE: a narrow two-lane country road with a broken centre line. About 20 m ahead a tractor has moved over to the right edge and
slowed down; its driver holds his arm out of the cab, waving us past. About 120 m ahead the road bends to the left behind a tall hedge,
so the road after the bend cannot be seen.
MUST BE CLEARLY VISIBLE: the tractor at the right edge, the driver's waving arm, the hedge hiding the bend.
MUST NOT APPEAR: signs, text."""),
  "Traktoren foran dig kører ind til højre, og føreren vinker dig forbi. Hvordan forholder du dig?",
  "The tractor in front of you moves in to the right, and the driver waves you past. What do you do?",
  "تراکتورِ جلو به راست کنار می‌کشد و راننده‌اش با دست اشاره می‌کند که رد شوید. چه می‌کنید؟",
  S(True, "Jeg sikrer mig selv, at vejen foran er fri, før jeg overhaler.", "I make sure myself that the road ahead is clear before I overtake.",
    "خودم مطمئن می‌شوم جاده‌ی جلو خالی است و بعد سبقت می‌گیرم.",
    "Det er dig, der overhaler, og dig, der skal sikre, at det kan ske uden fare.",
    "You are the one overtaking, and you must make sure that it can be done safely.",
    "سبقت‌گیرنده شما هستید و شما باید مطمئن شوید بی‌خطر است."),
  S(False, "Vinket betyder, at jeg trygt kan overhale med det samme.", "The wave means that I can safely overtake straight away.",
    "اشاره‌ی دست یعنی می‌توانم فوراً و با خیال راحت سبقت بگیرم.",
    "Traktorføreren kan tage fejl eller se noget andet end dig; svinget foran skjuler vejen.",
    "The tractor driver may be mistaken or see something different from you; the bend ahead hides the road.",
    "راننده‌ی تراکتور ممکن است اشتباه کند یا چیز دیگری ببیند؛ پیچ جلو جاده را پنهان کرده است."),
  S(False, "Når traktorføreren vinker, er det ham, der har ansvaret, hvis der sker noget.",
    "When the tractor driver waves, he is the one responsible if something happens.",
    "وقتی راننده‌ی تراکتور اشاره می‌کند، اگر اتفاقی بیفتد او مسئول است.",
    "Ansvaret for overhalingen er dit.", "The responsibility for the overtaking is yours.", "مسئولیت سبقت با شماست."),
)

Q(5338, "7.9", above("""
THE SCENE: a straight two-way country road seen from above, one lane in each direction, a broken centre line.
VEHICLES (colour code used strictly): a RED car (ours) in the oncoming lane, level with a GREY car in our lane that we are
overtaking; small motion lines behind the grey car show that it is speeding up; far ahead at the top of the picture a BLUE car
approaches in the oncoming lane; a SOLID GREEN arrow from the red car curving back into our lane behind the grey car; a DASHED
ORANGE arrow from the red car going on past the grey car.
MUST NOT APPEAR: signs, text."""),
  "Du er ved at overhale en bil på landevejen, men den sætter farten op, så du ikke kommer forbi. Hvordan forholder du dig?",
  "You are overtaking a car on a country road, but it speeds up so that you cannot get past. What do you do?",
  "در جاده‌ی بیرون شهر در حال سبقت از یک خودرو هستید، ولی سرعتش را بالا می‌برد و نمی‌توانید رد شوید. چه می‌کنید؟",
  S(True, "Jeg opgiver overhalingen og lægger mig ind bag bilen igen.", "I give up the overtaking and move back in behind the car.",
    "از سبقت منصرف می‌شوم و دوباره پشت آن خودرو قرار می‌گیرم.",
    "Kan overhalingen ikke gennemføres uden fare, skal du afbryde den i tide.",
    "If the overtaking cannot be completed safely, you must break it off in time.",
    "اگر سبقت بی‌خطر تمام نمی‌شود، باید به‌موقع آن را رها کنید."),
  S(False, "Jeg sætter farten op over hastighedsgrænsen for at komme forbi.", "I speed up above the speed limit to get past.",
    "سرعتم را از حد مجاز بالاتر می‌برم تا رد شوم.",
    "Hastighedsgrænsen gælder også under overhaling.", "The speed limit also applies when overtaking.", "حد سرعت هنگام سبقت هم برقرار است."),
  S(True, "Den, der bliver overhalet, må ikke sætte farten op.", "The one being overtaken must not speed up.",
    "کسی که از او سبقت گرفته می‌شود نباید سرعتش را بالا ببرد.",
    "Når du bliver overhalet, skal du holde til højre og ikke øge farten.", "When you are being overtaken, you must keep right and not increase your speed.",
    "وقتی از شما سبقت گرفته می‌شود، باید سمت راست بمانید و سرعت را زیاد نکنید."),
  S(False, "Jeg trækker ind foran bilen, så snart min front er forbi den.", "I pull in in front of the car as soon as my front is past it.",
    "به محض این‌که جلوی خودرویم از آن رد شد، جلویش می‌پیچم.",
    "Du skal have plads til at komme ind igen uden fare for den, du overhaler.",
    "You must have room to get back in without danger to the one you are overtaking.",
    "باید جای کافی داشته باشید تا بدون خطر برای کسی که از او سبقت گرفته‌اید برگردید."),
)

Q(5339, "6.1", view("""
THE SCENE: a motorway with two lanes in our direction and moderate traffic. On the right verge stands a red-bordered white warning
triangle showing a short row of black cars, one behind the other (the Danish queue warning sign, A 20).
MUST BE CLEARLY VISIBLE: the queue warning sign.
MUST NOT APPEAR: other signs, text, a queue."""),
  "Du kører forbi denne tavle på motorvejen. Hvad betyder den?",
  "You pass this sign on the motorway. What does it mean?",
  "در آزادراه از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Der er særlig risiko for kø længere fremme.", "There is a particular risk of queues further ahead.",
    "جلوتر خطر ویژه‌ی تشکیل صف وجود دارد.",
    "Tavlen angiver særlig risiko for kødannelse; sænk farten, hold afstand, og vær klar til at bremse.",
    "The sign shows a particular risk of queues forming; slow down, keep your distance and be ready to brake.",
    "این تابلو خطر ویژه‌ی تشکیل صف را نشان می‌دهد؛ سرعت را کم کنید، فاصله بگیرید و آماده‌ی ترمز باشید."),
  S(False, "Jeg skal skifte til venstre vognbane.", "I must change to the left lane.", "باید به خط چپ بروم.",
    "Tavlen er en advarsel og siger ikke noget om, hvilken vognbane du skal bruge.",
    "The sign is a warning and says nothing about which lane to use.",
    "این تابلو هشدار است و درباره‌ی این‌که از کدام خط استفاده کنید چیزی نمی‌گوید."),
  S(False, "Tavlen viser, at der er vejarbejde.", "The sign shows that there are road works.", "این تابلو نشان می‌دهد کار جاده‌ای در جریان است.",
    "Vejarbejde har sin egen advarselstavle med en person, der graver.", "Road works have their own warning sign showing a person digging.",
    "کار جاده‌ای تابلوی هشدار خودش را دارد که فردی را در حال کندن نشان می‌دهد."),
  S(False, "Tavlen betyder, at overhaling er forbudt.", "The sign means that overtaking is forbidden.", "این تابلو یعنی سبقت ممنوع است.",
    "Det er en advarselstavle, ikke et forbud.", "It is a warning sign, not a ban.", "این تابلوی هشدار است، نه ممنوعیت."),
)

Q(5340, "6.1", view("""
THE SCENE: a two-way country road that dips into a shallow hollow ahead and rises again; it has been raining heavily, and a broad sheet
of water lies across the road at the bottom of the hollow. On the right verge stands a red-bordered white warning triangle with the
official Danish symbol for a dip in the road (A 38 «Lunke»).
MUST BE CLEARLY VISIBLE: the warning sign, the hollow with water across the road.
MUST NOT APPEAR: other signs, text.""", cond="overcast after heavy rain, wet road"),
  "Du kører forbi denne tavle uden for byen. Det har regnet kraftigt. Hvad betyder tavlen?",
  "You pass this sign outside town. It has been raining heavily. What does the sign mean?",
  "بیرون شهر از کنار این تابلو می‌گذرید. باران شدیدی باریده است. معنی تابلو چیست؟",
  S(True, "Der er en lavning i vejen, hvor der kan stå vand på kørebanen.", "There is a dip in the road where water may lie on the carriageway.",
    "در جاده یک گودی هست که ممکن است روی سواره‌رو آب جمع شده باشد.",
    "Tavlen angiver en lunke i vejen, hvor der ved kraftig nedbør kan være vand på kørebanen.",
    "The sign shows a dip in the road where there may be water on the carriageway in heavy rain.",
    "این تابلو گودی‌ای در جاده را نشان می‌دهد که در بارش شدید ممکن است روی سواره‌رو آب باشد."),
  S(False, "Der er et vejbump længere fremme.", "There is a speed hump further ahead.", "جلوتر یک سرعت‌گیر هست.",
    "Vejbump har deres egen advarselstavle.", "Speed humps have their own warning sign.", "سرعت‌گیر تابلوی هشدار خودش را دارد."),
  S(False, "Vejen fører ned til en havn eller et færgeleje.", "The road leads down to a harbour or a ferry berth.", "جاده به بندر یا اسکله‌ی کشتی می‌رسد.",
    "Det er en anden tavle, der advarer om havnekaj og færgeleje.", "It is a different sign that warns of a quay or a ferry berth.",
    "تابلوی دیگری درباره‌ی اسکله و محل پهلوگیری کشتی هشدار می‌دهد."),
  S(False, "Tavlen gælder kun, når det sner.", "The sign only applies when it snows.", "این تابلو فقط وقتی برف می‌بارد برقرار است.",
    "Advarslen gælder især ved kraftig regn, hvor der kan samle sig vand i lavningen.",
    "The warning matters especially in heavy rain, when water can collect in the dip.",
    "این هشدار به‌ویژه در باران شدید است که آب در گودی جمع می‌شود."),
)

Q(5341, "6.1", view("""
THE SCENE: a road arriving at a border control point: a wide canopy over the road with small booths ahead. On the right before the
canopy stands the Danish sign «Passage uden stop forbudt» (C 92) in its official design, with the word «TOLD» on it.
MUST BE CLEARLY VISIBLE: the sign with the word TOLD, the control point ahead.
MUST NOT APPEAR: other text, people."""),
  "Ved grænsen kører du forbi denne tavle. Hvad betyder den?",
  "At the border you pass this sign. What does it mean?",
  "در مرز از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Jeg skal standse ved kontrolstedet og må ikke køre forbi uden at standse.",
    "I must stop at the check point and must not drive past without stopping.",
    "باید در محل بازرسی بایستم و بدون توقف نباید رد شوم.",
    "Tavlen forbyder passage uden stop; grunden, her told, står på tavlen.",
    "The sign bans passing without stopping; the reason, here customs, is on the sign.",
    "این تابلو عبور بدون توقف را ممنوع می‌کند؛ دلیلش، اینجا گمرک، روی تابلو نوشته شده است."),
  S(False, "Tavlen betyder, at kørsel er forbudt i begge retninger.", "The sign means that driving is forbidden in both directions.",
    "این تابلو یعنی رانندگی در هر دو جهت ممنوع است.",
    "Du må køre videre, når du har standset ved kontrollen.", "You may drive on once you have stopped at the check.",
    "پس از توقف در محل بازرسی می‌توانید ادامه دهید."),
  S(False, "Jeg skal kun standse, hvis en betjent vinker mig ind.", "I only have to stop if an officer waves me in.",
    "فقط وقتی باید بایستم که مأموری اشاره کند.",
    "Tavlen kræver, at du standser, også uden et tegn.", "The sign requires you to stop, also without a signal.",
    "این تابلو حتی بدون اشاره هم شما را ملزم به توقف می‌کند."),
  S(False, "Tavlen angiver en hastighedsgrænse ved grænsen.", "The sign shows a speed limit at the border.", "این تابلو حد سرعت در مرز را نشان می‌دهد.",
    "Det er et forbud mod at køre forbi uden at standse, ikke en hastighedsgrænse.", "It is a ban on passing without stopping, not a speed limit.",
    "این ممنوعیتِ عبور بدون توقف است، نه حد سرعت."),
)

Q(5342, "6.1", view("""
THE SCENE: a road leading to a low bascule bridge over a harbour channel. On the right verge stands a red-bordered white warning
triangle with the official Danish symbol for an opening bridge (A 91 «Oplukkelig bro»). At the start of the bridge red traffic lights
are lit and red-and-white barriers are coming down across the road; the bridge deck is still flat.
MUST BE CLEARLY VISIBLE: the warning sign, the red lights, the barriers coming down.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle. Lidt længere fremme begynder de røde lys ved broen at lyse, og bommene går ned. Hvad gælder?",
  "You pass this sign. A little further ahead the red lights at the bridge come on and the barriers come down. What applies?",
  "از کنار این تابلو می‌گذرید. کمی جلوتر چراغ‌های قرمز کنار پل روشن می‌شوند و راهبندها پایین می‌آیند. چه قاعده‌ای برقرار است؟",
  S(True, "Tavlen advarer om en bro, der kan åbnes for skibe.", "The sign warns of a bridge that can be opened for ships.",
    "این تابلو درباره‌ی پلی هشدار می‌دهد که برای عبور کشتی‌ها باز می‌شود.",
    "Tavlen advarer om en oplukkelig bro.", "The sign warns of an opening bridge.", "این تابلو درباره‌ی پل متحرک (بازشونده) هشدار می‌دهد."),
  S(True, "Jeg standser før bommen og venter, til broen er lukket, og bommene er oppe igen.",
    "I stop before the barrier and wait until the bridge has closed and the barriers are up again.",
    "پیش از راهبند می‌ایستم و صبر می‌کنم تا پل بسته شود و راهبندها دوباره بالا بروند.",
    "Rødt lys betyder stop, og broen er spærret, mens den er åben for skibe.",
    "A red light means stop, and the bridge is closed to traffic while it is open for ships.",
    "چراغ قرمز یعنی ایست، و تا وقتی پل برای کشتی‌ها باز است، عبور بسته است."),
  S(False, "Jeg skynder mig over, før bommene er helt nede.", "I hurry across before the barriers are fully down.",
    "عجله می‌کنم تا پیش از پایین آمدن کامل راهبندها رد شوم.",
    "Rødt lys betyder stop, og broen kan begynde at åbne sig.", "A red light means stop, and the bridge may begin to open.",
    "چراغ قرمز یعنی ایست و ممکن است پل شروع به باز شدن کند."),
  S(False, "Tavlen betyder, at broen altid er lukket for biler.", "The sign means that the bridge is always closed to cars.",
    "این تابلو یعنی پل همیشه به روی خودروها بسته است.",
    "Broen er kun spærret, når den åbnes for skibe.", "The bridge is only closed when it opens for ships.",
    "پل فقط وقتی بسته است که برای کشتی‌ها باز می‌شود."),
)

Q(5343, "7.6", town("""
THE SCENE: a town street with one lane in each direction. About 20 m ahead of us a taxi drives in our lane with its roof sign lit (it
is free). A little further ahead on the right pavement a man raises his arm high towards the taxi.
MUST BE CLEARLY VISIBLE: the taxi with its lit roof sign, the man raising his arm.
MUST NOT APPEAR: text on the taxi or its roof sign, other text."""),
  "Foran dig kører en ledig taxi. Lidt længere fremme står en mand på fortovet og rækker armen op mod den. Hvordan forholder du dig?",
  "A free taxi is driving in front of you. A little further ahead a man stands on the pavement holding his arm up towards it. What do you do?",
  "جلوی شما یک تاکسی آزاد می‌رود. کمی جلوتر مردی روی پیاده‌رو ایستاده و دستش را به طرف تاکسی بالا برده است. چه می‌کنید؟",
  S(True, "Jeg holder større afstand, fordi taxien kan bremse og holde ind uden ret meget varsel.",
    "I keep a larger distance because the taxi may brake and pull in without much warning.",
    "فاصله‌ی بیشتری می‌گیرم، چون تاکسی ممکن است بدون هشدار زیاد ترمز کند و کنار بکشد.",
    "Du skal holde så stor afstand, at du ikke kører ind i den forankørende, hvis den standser.",
    "You must keep such a distance that you do not run into the one in front if it stops.",
    "باید آن‌قدر فاصله بگیرید که اگر وسیله‌ی جلویی ایستاد، به آن نزنید."),
  S(True, "Manden kan træde ud på kørebanen for at komme hen til taxien.", "The man may step out onto the carriageway to get to the taxi.",
    "آن مرد ممکن است برای رسیدن به تاکسی وارد سواره‌رو شود.",
    "Gående, der har travlt med at nå en taxi, ser sig ikke altid for.", "Pedestrians in a hurry to catch a taxi do not always look out.",
    "عابرانی که برای رسیدن به تاکسی عجله دارند همیشه حواسشان به اطراف نیست."),
  S(False, "Taxien skal blinke i mindst 5 sekunder, før den holder ind.", "The taxi must signal for at least 5 seconds before it pulls in.",
    "تاکسی باید پیش از کنار کشیدن دست‌کم ۵ ثانیه راهنما بزند.",
    "Der er ingen sådan regel; der skal gives tegn i god tid, men du må regne med, at det kan komme sent.",
    "There is no such rule; a signal must be given in good time, but you must expect that it may come late.",
    "چنین قاعده‌ای نیست؛ باید به‌موقع راهنما زد، ولی باید انتظار داشته باشید دیر زده شود."),
  S(False, "Holder taxien ind, må jeg dytte, så passageren skynder sig.", "If the taxi pulls in, I may sound the horn so that the passenger hurries.",
    "اگر تاکسی کنار بکشد، می‌توانم بوق بزنم تا مسافر عجله کند.",
    "Hornet må kun bruges for at forebygge eller afværge fare.", "The horn may only be used to prevent or avert danger.",
    "از بوق فقط برای پیشگیری یا دفع خطر می‌توان استفاده کرد."),
)

Q(5344, "7.6", town("""
THE SCENE: a town street with one lane in each direction. About 15 m ahead a cyclist rides at the right edge of our lane; about 20 m
in front of the cyclist a white van is parked at the right kerb, so the cyclist will have to go round it. In the oncoming lane a car
approaches.
MUST BE CLEARLY VISIBLE: the cyclist, the parked van ahead of the cyclist, the oncoming car.
MUST NOT APPEAR: signs, text."""),
  "En cyklist kører foran dig i højre side af vejen. Lidt længere fremme holder en varevogn parkeret ved kantstenen, og en bil kommer imod dig. Hvordan forholder du dig?",
  "A cyclist is riding in front of you on the right side of the road. A little further ahead a van is parked at the kerb, and a car is coming towards you. What do you do?",
  "دوچرخه‌سواری جلوی شما در سمت راست جاده می‌راند. کمی جلوتر یک ون کنار جدول پارک شده و خودرویی از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg regner med, at cyklisten trækker ud for at komme forbi varevognen.", "I expect the cyclist to pull out to get past the van.",
    "انتظار دارم دوچرخه‌سوار برای رد شدن از کنار ون به سمت وسط جاده بیاید.",
    "Cyklisten skal uden om varevognen og kommer derfor længere ud på vejen.", "The cyclist has to go round the van and so comes further out into the road.",
    "دوچرخه‌سوار باید دور ون بزند و بنابراین بیشتر وارد جاده می‌شود."),
  S(True, "Jeg sænker farten og venter med at køre forbi cyklisten, til der er plads.",
    "I slow down and wait to drive past the cyclist until there is room.",
    "سرعتم را کم می‌کنم و تا جا باز نشده از کنار دوچرخه‌سوار رد نمی‌شوم.",
    "Ved varevognen og med en modkørende bliver der ikke plads til at give cyklisten god sideafstand.",
    "At the van, with an oncoming car, there will not be room to give the cyclist a good side distance.",
    "کنار ون و با وجود خودروی روبه‌رو، جای کافی برای فاصله‌ی مناسب از دوچرخه‌سوار نمی‌ماند."),
  S(False, "Jeg skynder mig forbi cyklisten, før vi når varevognen.", "I hurry past the cyclist before we reach the van.",
    "عجله می‌کنم تا پیش از رسیدن به ون از دوچرخه‌سوار رد شوم.",
    "Så kan I ende side om side lige ved varevognen, hvor cyklisten trækker ud.",
    "Then you may end up side by side right at the van, where the cyclist pulls out.",
    "ممکن است درست کنار ون، جایی که دوچرخه‌سوار به وسط می‌آید، کنار هم قرار بگیرید."),
  S(True, "Der kan også stige nogen ud af varevognen eller gå frem bag den.", "Someone may also get out of the van or step out from behind it.",
    "ممکن است کسی هم از ون پیاده شود یا از پشتش بیرون بیاید.",
    "Holdende køretøjer kan skjule gående og døre, der bliver åbnet.", "Stationary vehicles can hide pedestrians and doors being opened.",
    "وسایل متوقف ممکن است عابران و درهایی را که باز می‌شوند پنهان کنند."),
)

Q(5345, "7.6", town("""
THE SCENE: a town street with one lane in each direction. On the right the pavement is closed off by red-and-white barriers around
road works; about 30 m ahead two pedestrians, one pushing a pram, walk on the carriageway at the right edge of our lane beside the
barriers.
MUST BE CLEARLY VISIBLE: the barriers on the pavement, the two pedestrians walking in our lane.
MUST NOT APPEAR: signs, text."""),
  "Fortovet er spærret på grund af vejarbejde, så de gående må gå ude på kørebanen. Hvordan forholder du dig?",
  "The pavement is closed because of road works, so pedestrians have to walk out on the carriageway. What do you do?",
  "پیاده‌رو به‌خاطر کار جاده‌ای بسته شده و عابران مجبورند روی سواره‌رو راه بروند. چه می‌کنید؟",
  S(True, "Jeg sænker farten og giver de gående god plads.", "I slow down and give the pedestrians plenty of room.",
    "سرعتم را کم می‌کنم و به عابران جای کافی می‌دهم.",
    "Hvor der arbejdes på vejen, og gående færdes på kørebanen, skal farten være passende lav.",
    "Where there is work on the road and pedestrians are on the carriageway, the speed must be suitably low.",
    "جایی که روی جاده کار می‌کنند و عابران روی سواره‌رو هستند، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Er der ikke plads til at komme forbi, venter jeg bag dem.", "If there is no room to get past, I wait behind them.",
    "اگر جا برای رد شدن نیست، پشتشان صبر می‌کنم.",
    "Du må først køre forbi, når det kan ske uden fare for de gående.", "You may only drive past when it can be done without danger to the pedestrians.",
    "فقط وقتی می‌توانید رد شوید که برای عابران خطری نداشته باشد."),
  S(False, "De gående har ikke lov at gå på kørebanen, så de skal vige for mig.",
    "The pedestrians are not allowed to walk on the carriageway, so they must give way to me.",
    "عابران اجازه ندارند روی سواره‌رو راه بروند، پس باید برای من کنار بروند.",
    "Når fortovet ikke kan bruges, må de gå på kørebanen, og du skal tage hensyn til dem.",
    "When the pavement cannot be used, they may walk on the carriageway, and you must take care of them.",
    "وقتی نمی‌شود از پیاده‌رو استفاده کرد، می‌توانند روی سواره‌رو راه بروند و شما باید مراقبشان باشید."),
)

Q(5346, "7.6", town("""
THE SCENE: a road beside a park in the evening; a concert has just ended, and many people walk along both pavements and cross the road
in groups, some between parked cars. A police officer in a high-visibility vest stands at the side of the road, directing the people.
MUST BE CLEARLY VISIBLE: the many pedestrians, some crossing the road, the police officer.
MUST NOT APPEAR: signs, text.""", cond="evening, dusk, dry road"),
  "En koncert i parken er lige slut, og mange mennesker går langs vejen og over den. Hvordan forholder du dig?",
  "A concert in the park has just ended, and many people are walking along the road and across it. What do you do?",
  "یک کنسرت در پارک تازه تمام شده و افراد زیادی کنار جاده و از عرض آن رد می‌شوند. چه می‌کنید؟",
  S(True, "Jeg kører meget langsomt og er klar til at standse.", "I drive very slowly and am ready to stop.",
    "خیلی آهسته می‌رانم و آماده‌ی توقف هستم.",
    "Mange gående på og ved vejen kræver en passende lav hastighed.", "Many pedestrians on and beside the road call for a suitably low speed.",
    "عابران زیاد روی جاده و کنار آن سرعت مناسبِ کمی می‌طلبد."),
  S(True, "Jeg må regne med, at nogle går ud på vejen uden at se sig for.", "I must expect some people to step onto the road without looking.",
    "باید انتظار داشته باشم برخی بدون نگاه کردن وارد جاده شوند.",
    "I en menneskemængde holder den enkelte ikke altid øje med trafikken.", "In a crowd, individuals do not always keep an eye on the traffic.",
    "در جمعیت، افراد همیشه حواسشان به ترافیک نیست."),
  S(False, "Jeg dytter, så folk går ind til siden.", "I sound the horn so that people move to the side.", "بوق می‌زنم تا مردم کنار بروند.",
    "Hornet må kun bruges for at forebygge eller afværge fare.", "The horn may only be used to prevent or avert danger.",
    "بوق فقط برای پیشگیری یا دفع خطر است."),
  S(True, "Dirigerer politiet trafikken, følger jeg deres tegn.", "If the police are directing the traffic, I follow their signals.",
    "اگر پلیس ترافیک را هدایت می‌کند، از علامت‌هایش پیروی می‌کنم.",
    "Politiets anvisninger går forud for tavler, signaler og færdselsreglerne.",
    "Police directions take precedence over signs, signals and the traffic rules.",
    "دستورهای پلیس بر تابلوها، چراغ‌ها و قواعد رانندگی مقدم است."),
)

Q(5347, "7.3", town("""
THE SCENE: the entrance to a pedestrian street paved all over, with shops on both sides and many people walking across its whole
width. On the right at the entrance stands the blue rectangular Danish pedestrian-street sign (white figures of walking people, E 49),
and under it a blue plate with a small white van symbol and the hours «6–11».
MUST BE CLEARLY VISIBLE: the pedestrian-street sign with its plate, the people in the street.
MUST NOT APPEAR: other signs, shop names, other text."""),
  "Ved indkørslen til gågaden står denne tavle med en undertavle, der tillader varekørsel om morgenen. Du skal aflevere varer i en butik i gaden. Hvad gælder?",
  "At the entrance to the pedestrian street stands this sign with a plate that allows deliveries in the morning. You have to deliver goods to a shop in the street. What applies?",
  "در ورودی خیابان پیاده این تابلو با زیرتابلویی هست که صبح‌ها رفت‌وآمد برای حمل کالا را مجاز می‌کند. باید به مغازه‌ای در این خیابان کالا تحویل دهید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må kun køre meget langsomt, normalt under 15 km/t.", "I may only drive very slowly, normally under 15 km/h.",
    "فقط خیلی آهسته، معمولاً زیر ۱۵ کیلومتر بر ساعت، می‌توانم برانم.",
    "I en gågade må der kun køres med meget lav hastighed (normalt under 15 km/t).",
    "In a pedestrian street, driving may only be done at a very low speed (normally under 15 km/h).",
    "در خیابان پیاده فقط با سرعت خیلی کم (معمولاً زیر ۱۵ کیلومتر بر ساعت) می‌توان راند."),
  S(False, "Når kørsel er tilladt, gælder den almindelige grænse på 50 km/t i byen.",
    "When driving is allowed, the ordinary 50 km/h limit in town applies.",
    "وقتی رانندگی مجاز است، همان حد معمول ۵۰ کیلومتر بر ساعتِ شهر برقرار است.",
    "Gaden er beregnet til gående, og du må kun køre meget langsomt.", "The street is meant for pedestrians, and you may only drive very slowly.",
    "این خیابان برای عابران است و فقط خیلی آهسته می‌توانید برانید."),
  S(True, "Jeg må kun parkere på særligt afmærkede pladser.", "I may only park in specially marked places.",
    "فقط در جاهای مخصوصِ مشخص‌شده می‌توانم پارک کنم.",
    "Parkering i en gågade må ikke ske uden for særligt afmærkede pladser.", "Parking in a pedestrian street must not take place outside specially marked places.",
    "پارک در خیابان پیاده بیرون از جاهای مخصوصِ مشخص‌شده مجاز نیست."),
  S(False, "Jeg må køre ind i gågaden når som helst, fordi jeg har varer med.", "I may drive into the pedestrian street at any time because I am carrying goods.",
    "چون کالا همراهم دارم، هر وقت بخواهم می‌توانم وارد خیابان پیاده شوم.",
    "Undertavlen bestemmer, hvornår kørslen er tilladt.", "The plate decides when driving is allowed.",
    "زیرتابلو تعیین می‌کند چه زمانی رانندگی مجاز است."),
)

Q(5348, "7.3", view("""
THE SCENE: a motorway just after the national border, two lanes in our direction. On the right verge stands the large Danish sign
for the general speed limits (E 80) in its official design: under the word «DANMARK», three panels with a town symbol and 50, a
country-road symbol and 80, and a motorway symbol and 130; under it a plate with symbols for dipped headlights, a seat belt and a
child seat.
MUST BE CLEARLY VISIBLE: the general-speed-limits sign with its three limits, the plate with the three symbols.
MUST NOT APPEAR: other text."""),
  "Du kører ind i Danmark og passerer denne tavle. Hvad gælder?",
  "You drive into Denmark and pass this sign. What applies?",
  "وارد دانمارک می‌شوید و از کنار این تابلو می‌گذرید. چه قاعده‌ای برقرار است؟",
  S(True, "Tavlen viser de generelle hastighedsgrænser i landet.", "The sign shows the general speed limits in the country.",
    "این تابلو حدهای سرعت عمومی کشور را نشان می‌دهد.",
    "Tavlen angiver de generelle hastighedsbegrænsninger, som gælder i landet.", "The sign shows the general speed limits that apply in the country.",
    "این تابلو محدودیت‌های سرعت عمومی کشور را نشان می‌دهد."),
  S(True, "Uden andre tavler er grænsen 50 km/t i byen, 80 km/t uden for byen og 130 km/t på motorvej.",
    "Without other signs the limit is 50 km/h in town, 80 km/h outside town and 130 km/h on the motorway.",
    "بدون تابلوهای دیگر، حد سرعت در شهر ۵۰، بیرون شهر ۸۰ و در آزادراه ۱۳۰ کیلومتر بر ساعت است.",
    "Det er de generelle grænser for personbiler i Danmark.", "Those are the general limits for cars in Denmark.",
    "این‌ها حدهای عمومی برای خودروهای سواری در دانمارک‌اند."),
  S(True, "Undertavlen minder om, at kørelys, sikkerhedssele og sikkerhedsudstyr til børn er påbudt.",
    "The plate is a reminder that daytime running lights, seat belts and child safety equipment are compulsory.",
    "زیرتابلو یادآوری می‌کند که چراغ روشن در روز، کمربند ایمنی و تجهیزات ایمنی کودک الزامی‌اند.",
    "Undertavlen angiver, at det er påbudt at bruge kørelys, sikkerhedsseler og sikkerhedsudstyr til børn.",
    "The plate shows that using daytime running lights, seat belts and child safety equipment is compulsory.",
    "زیرتابلو نشان می‌دهد استفاده از چراغ روشن در روز، کمربند ایمنی و تجهیزات ایمنی کودک الزامی است."),
  S(False, "Grænserne gælder kun for biler med danske nummerplader.", "The limits only apply to cars with Danish number plates.",
    "این حدها فقط برای خودروهای دارای پلاک دانمارکی است.",
    "Reglerne gælder for alle, der kører i Danmark.", "The rules apply to everyone driving in Denmark.",
    "این قواعد برای همه‌ی کسانی است که در دانمارک رانندگی می‌کنند."),
)

Q(5349, "7.3", town("""
THE SCENE: a road entering a town. On the right stands a blue square sign with a white symbol of a camera (the Danish sign for
automatic traffic control, E 90).
MUST BE CLEARLY VISIBLE: the blue sign with the camera symbol.
MUST NOT APPEAR: speed cameras, other signs, text."""),
  "Du kører forbi denne tavle. Hvad betyder den?",
  "You pass this sign. What does it mean?",
  "از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Der kan være automatisk trafikkontrol, fx fartkontrol med kamera.", "There may be automatic traffic control, for example speed checks with a camera.",
    "ممکن است کنترل خودکار ترافیک باشد، مثلاً کنترل سرعت با دوربین.",
    "Tavlen angiver, at der kan være automatisk trafikkontrol (ATK).", "The sign shows that there may be automatic traffic control (ATK).",
    "این تابلو نشان می‌دهد ممکن است کنترل خودکار ترافیک (ATK) باشد."),
  S(False, "Hastighedsgrænsen er sat ned på strækningen.", "The speed limit has been lowered on the stretch.", "حد سرعت در این مسیر کم شده است.",
    "Tavlen ændrer ikke hastighedsgrænsen.", "The sign does not change the speed limit.", "این تابلو حد سرعت را تغییر نمی‌دهد."),
  S(False, "Tavlen viser, hvor hurtigt jeg kører.", "The sign shows how fast I am driving.", "این تابلو نشان می‌دهد با چه سرعتی می‌رانم.",
    "Det gør en fartviser, som er en anden tavle.", "A speed display does that, which is a different sign.",
    "این کار را نمایشگر سرعت انجام می‌دهد که تابلوی دیگری است."),
  S(False, "Jeg må køre lidt over grænsen, fordi kameraet kun registrerer store overskridelser.",
    "I may drive a little over the limit because the camera only registers large excesses.",
    "می‌توانم کمی بیشتر از حد مجاز برانم، چون دوربین فقط تخلف‌های بزرگ را ثبت می‌کند.",
    "Hastighedsgrænsen gælder altid, uanset om der er kontrol.", "The speed limit always applies, whether or not there is a check.",
    "حد سرعت همیشه برقرار است، چه کنترل باشد چه نباشد."),
)

Q(5350, "7.3", view("""
THE SCENE: a two-way main road outside town; on our verge stands a yellow diamond main-road sign. About 80 m ahead side roads join
from the left and the right; on both side roads white shark teeth (triangles) lie across their lanes at the junction, and a car waits
in the side road on the right, its front close to the shark teeth.
MUST BE CLEARLY VISIBLE: the junction, the shark teeth on the side roads, the waiting car.
MUST NOT APPEAR: text."""),
  "Du kører på en hovedvej og nærmer dig et kryds. På sidevejene er der hajtænder, og en bil holder i sidevejen til højre. Hvordan forholder du dig?",
  "You are driving on a main road and approaching a junction. The side roads have shark teeth, and a car is waiting in the side road on the right. What do you do?",
  "در یک جاده‌ی اصلی می‌رانید و به تقاطعی نزدیک می‌شوید. در خیابان‌های فرعی دندان‌کوسه هست و خودرویی در خیابان فرعیِ سمت راست منتظر است. چه می‌کنید؟",
  S(True, "Jeg holder en passende lav hastighed ved krydset, selv om jeg har forkørselsret.",
    "I keep a suitably low speed at the junction, even though I have priority.",
    "با این‌که حق تقدم دارم، در تقاطع سرعتم را به اندازه‌ی کافی پایین نگه می‌دارم.",
    "Ved vejkryds skal kørende holde en efter forholdene passende lav hastighed.",
    "At junctions drivers must keep a speed suitably low for the conditions.",
    "در تقاطع‌ها رانندگان باید سرعتی متناسب با شرایط و به اندازه‌ی کافی پایین داشته باشند."),
  S(True, "Bilen i sidevejen kan have overset mig.", "The car in the side road may have overlooked me.", "ممکن است خودروی خیابان فرعی مرا ندیده باشد.",
    "Du skal være forberedt på, at andre begår fejl.", "You must be prepared for others to make mistakes.", "باید آماده باشید که دیگران اشتباه کنند."),
  S(False, "Med forkørselsret må jeg køre gennem krydset med fuld fart.", "With priority I may drive through the junction at full speed.",
    "با حق تقدم می‌توانم با سرعت کامل از تقاطع رد شوم.",
    "Forkørselsret fjerner ikke kravet om passende lav hastighed ved kryds.", "Priority does not remove the requirement for a suitably low speed at junctions.",
    "حق تقدم الزام سرعت مناسبِ پایین در تقاطع را از بین نمی‌برد."),
  S(False, "Hajtænderne betyder, at jeg skal holde tilbage for bilerne fra sidevejene.",
    "The shark teeth mean that I must give way to the cars from the side roads.",
    "دندان‌کوسه‌ها یعنی من باید به خودروهای خیابان‌های فرعی راه بدهم.",
    "Hajtænderne gælder for dem på sidevejene; det er dem, der har ubetinget vigepligt.",
    "The shark teeth apply to those on the side roads; they are the ones who must give way.",
    "دندان‌کوسه‌ها برای کسانی است که در خیابان‌های فرعی‌اند؛ آن‌ها باید بی‌قیدوشرط راه بدهند."),
)
