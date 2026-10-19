# «آزمون جدید», batch 1 (5001–5100), part b: passing parked vehicles and pedestrians (7.6), speed (7.3), straight on in
# junctions (7.12), left turns (7.14) and right turns (7.13).
# Rules: Færdselsloven §§ 3, 10, 16, 19, 20, 26, 27, 32, 33, 41–43; Bekendtgørelse om vejafmærkning.
from nq import Q, S, above, town, view

Q(5026, "7.6", town("""
THE SCENE: a town street, one lane in each direction, a broken centre line. About 30 m ahead on the right a city bus stands at a
bus stop beside the pavement (a yellow bus-stop sign on a pole); its LEFT indicator is flashing (bright orange), it is about to
pull out into our lane. The oncoming lane has some traffic.
MUST BE CLEARLY VISIBLE: the bus at the stop, its flashing left indicator, the bus-stop sign.
MUST NOT APPEAR: passengers on the road, text other than the sign's own design."""),
  "Bussen ved stoppestedet blinker til venstre. Hvordan forholder du dig?",
  "The bus at the stop is indicating left. What do you do?",
  "اتوبوس کنار ایستگاه راهنمای چپ زده است. چه می‌کنید؟",
  S(True, "Jeg sænker farten og standser om nødvendigt, så bussen kan køre ud.", "I slow down and stop if necessary so that the bus can pull out.",
    "سرعتم را کم می‌کنم و در صورت لزوم می‌ایستم تا اتوبوس بتواند حرکت کند.",
    "I tættere bebygget område skal du give bussen mulighed for at køre fra stoppestedet, når den giver tegn.",
    "In built-up areas you must let the bus pull away from the stop when it signals.",
    "در منطقه‌ی مسکونی، وقتی اتوبوس علامت می‌دهد، باید بگذارید از ایستگاه حرکت کند."),
  S(False, "Jeg har forkørselsret, fordi jeg allerede er på kørebanen.", "I have the right of way because I am already on the carriageway.",
    "حق تقدم با من است، چون از قبل روی سواره‌رو هستم.",
    "Færdselsloven § 19 pålægger dig at give bussen plads til at køre ud.",
    "Færdselsloven § 19 requires you to give the bus room to pull out.",
    "ماده‌ی ۱۹ قانون از شما می‌خواهد به اتوبوس جا بدهید تا حرکت کند."),
  S(True, "Buschaufføren skal stadig være forsigtig, når bussen kører ud.", "The bus driver must still be careful when pulling out.",
    "راننده‌ی اتوبوس هم هنگام حرکت باید مراقب باشد.",
    "Reglen fritager ikke bussens fører for at udvise særlig forsigtighed.",
    "The rule does not free the bus driver from taking special care.",
    "این قاعده راننده‌ی اتوبوس را از احتیاط ویژه معاف نمی‌کند."),
  S(False, "Reglen gælder kun uden for byen.", "The rule only applies outside town.", "این قاعده فقط بیرون شهر است.",
    "Reglen gælder netop i tættere bebygget område.",
    "The rule applies precisely in built-up areas.",
    "این قاعده دقیقاً برای مناطق مسکونی است."),
)

Q(5027, "7.6", view("""
THE SCENE: a two-way country road, one lane in each direction. About 50 m ahead on the right a school bus has stopped at the edge
of the road: a yellow-and-white bus with a square sign on its back showing two children. A few children are getting off; one child
stands on the verge behind the bus, looking towards the road.
MUST BE CLEARLY VISIBLE: the stopped school bus with its sign, the children getting off, the child behind the bus.
MUST NOT APPEAR: oncoming traffic, text."""),
  "Skolebussen holder for at lade børn stige af. Hvordan forholder du dig?",
  "The school bus has stopped to let children off. What do you do?",
  "اتوبوس مدرسه ایستاده تا بچه‌ها پیاده شوند. چه می‌کنید؟",
  S(True, "Jeg viser særlig agtpågivenhed og sænker farten.", "I take special care and slow down.", "احتیاط ویژه می‌کنم و سرعتم را کم می‌کنم.",
    "Ved en skolebus, der holder for at lade passagerer stige af, skal du vise særlig agtpågivenhed.",
    "Near a school bus stopped to let passengers off you must take special care.",
    "کنار اتوبوس مدرسه‌ای که برای پیاده شدن مسافران ایستاده، باید احتیاط ویژه کنید."),
  S(True, "Et barn kan løbe ud foran eller bag bussen.", "A child may run out in front of or behind the bus.", "ممکن است بچه‌ای از جلو یا پشت اتوبوس وارد جاده شود.",
    "Børn ser ikke altid efter trafikken, når de skal over vejen.",
    "Children do not always look out for traffic when they cross the road.",
    "بچه‌ها همیشه هنگام عبور از جاده به ترافیک نگاه نمی‌کنند."),
  S(False, "Jeg kører forbi med uændret fart, fordi bussen holder i sin egen side.", "I drive past at the same speed because the bus is on its own side.",
    "با همان سرعت رد می‌شوم، چون اتوبوس در سمت خودش ایستاده است.",
    "Børnene kan komme ud på vejen; du skal være klar til at standse.",
    "The children may come out onto the road; you must be ready to stop.",
    "بچه‌ها ممکن است وارد جاده شوند؛ باید آماده‌ی ایستادن باشید."),
  S(False, "Jeg dytter, så børnene ved, at jeg kommer.", "I sound the horn so that the children know I am coming.", "بوق می‌زنم تا بچه‌ها بفهمند می‌آیم.",
    "Et dyt kan forskrække børnene, så de gør noget uventet; hornet bruges kun for at afværge fare.",
    "A horn can startle the children into doing something unexpected; the horn is only for averting danger.",
    "بوق ممکن است بچه‌ها را بترساند و کار غیرمنتظره‌ای بکنند؛ بوق فقط برای دفع خطر است."),
)

Q(5028, "7.6", view("""
THE SCENE: a narrow two-way country road without pavements, one lane in each direction, no centre line, grass verges. About 60 m
ahead two adults walk at the far LEFT edge of the road, coming towards us (facing the traffic). Far ahead an oncoming car.
MUST BE CLEARLY VISIBLE: the two pedestrians at the left edge facing us, the narrow road, the oncoming car far away.
MUST NOT APPEAR: signs, text."""),
  "To fodgængere går i venstre side af vejen og kommer imod dig. Hvordan forholder du dig?",
  "Two pedestrians are walking on the left side of the road towards you. What do you do?",
  "دو عابر در سمت چپ جاده به طرف شما می‌آیند. چه می‌کنید؟",
  S(True, "Jeg sænker farten og giver dem god plads, når jeg passerer.", "I slow down and give them plenty of room when I pass.",
    "سرعتم را کم می‌کنم و هنگام رد شدن جای زیادی به آن‌ها می‌دهم.",
    "Når du passerer gående, skal du give dem tid til at vige og god plads på vejen.",
    "When you pass pedestrians you must give them time to step aside and plenty of room on the road.",
    "هنگام رد شدن از کنار عابران، باید به آن‌ها فرصت کنار رفتن و جای کافی بدهید."),
  S(False, "Fodgængerne går forkert, fordi de går i venstre side af vejen.", "The pedestrians are walking wrongly because they are on the left side.",
    "عابران اشتباه راه می‌روند، چون در سمت چپ جاده‌اند.",
    "Gående på vejen skal gå yderst i venstre side, så de møder trafikken.",
    "Pedestrians on the road must walk at the far left, facing the traffic.",
    "عابرانی که روی جاده راه می‌روند باید در منتهی‌الیه سمت چپ، رو به ترافیک، بروند."),
  S(False, "Jeg dytter, så de går ud i rabatten.", "I sound the horn so that they step onto the verge.", "بوق می‌زنم تا به کنار جاده بروند.",
    "Hornet må kun bruges for at afværge fare, ikke for at få andre til at flytte sig.",
    "The horn may only be used to avert danger, not to make others move.",
    "بوق فقط برای دفع خطر است، نه برای کنار زدن دیگران."),
  S(True, "Hvis den modkørende bil og fodgængerne mødes ved mig, venter jeg bag fodgængerne.",
    "If the oncoming car and the pedestrians meet where I am, I wait behind the pedestrians.",
    "اگر خودروی روبه‌رو و عابران هم‌زمان به من برسند، پشت عابران صبر می‌کنم.",
    "Så kan du give fodgængerne plads uden at komme for tæt på den modkørende.",
    "That way you can give the pedestrians room without getting too close to the oncoming car.",
    "این‌طور می‌توانید به عابران جا بدهید بی‌آنکه به خودروی روبه‌رو خیلی نزدیک شوید."),
)

Q(5029, "7.6", town("""
THE SCENE: a town street, one lane in each direction, a broken centre line. About 30 m ahead in OUR lane a white delivery lorry has
stopped at the right kerb with its hazard lights flashing; it blocks most of our lane. In the oncoming lane a grey car is coming
towards us and is about level with the lorry's front.
MUST BE CLEARLY VISIBLE: the lorry in our lane, the oncoming grey car.
MUST NOT APPEAR: signs, pedestrians on the road, text."""),
  "En lastbil holder i din side af vejen. En bil kommer imod dig. Hvordan forholder du dig?",
  "A lorry has stopped on your side of the road. A car is coming towards you. What do you do?",
  "کامیونی در سمت شما ایستاده است. خودرویی از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg holder tilbage for den modkørende, fordi forhindringen er i min side.", "I give way to the oncoming car because the obstacle is on my side.",
    "به خودروی روبه‌رو راه می‌دهم، چون مانع در سمت من است.",
    "Den, der har forhindringen i sin side, skal holde tilbage.",
    "The driver who has the obstacle on their side must give way.",
    "کسی که مانع در سمت اوست، باید راه بدهد."),
  S(False, "Den modkørende skal holde tilbage, fordi jeg kom først.", "The oncoming driver must give way because I came first.", "راننده‌ی روبه‌رو باید راه بدهد، چون من اول رسیدم.",
    "Det afgørende er, i hvis side forhindringen er, ikke hvem der kom først.",
    "What matters is whose side the obstacle is on, not who came first.",
    "مهم این است که مانع در سمت کیست، نه این‌که چه کسی اول رسید."),
  S(False, "Jeg kører tæt op bag lastbilen, så jeg hurtigt kan komme forbi.", "I drive up close behind the lorry so that I can get past quickly.",
    "نزدیک پشت کامیون می‌روم تا زود رد شوم.",
    "Tæt bag lastbilen kan du ikke se forbi den, og du får svært ved at køre ud; vent med god afstand.",
    "Close behind the lorry you cannot see past it, and it is hard to pull out; wait at a good distance.",
    "نزدیک پشت کامیون نه جلو را می‌بینید و نه به‌راحتی می‌توانید بیرون بیایید؛ با فاصله‌ی خوب صبر کنید."),
  S(False, "Jeg kører ud og blinker med lyset, så den modkørende standser.", "I pull out and flash my lights so that the oncoming driver stops.",
    "وارد خط روبه‌رو می‌شوم و چراغ می‌زنم تا راننده‌ی روبه‌رو بایستد.",
    "Lyssignaler giver ikke forkørselsret; du skal holde tilbage.",
    "Flashing lights does not give you the right of way; you must give way.",
    "چراغ زدن حق تقدم نمی‌دهد؛ باید راه بدهید."),
)

Q(5030, "7.6", town("""
THE SCENE: a residential street near a school, one lane in each direction, parked cars along both kerbs. On the right verge stands
a triangular warning sign (white with a red border) showing two running children. On the right pavement a few children with school
bags walk towards a school building; one child on a bicycle rides on the pavement towards the kerb between two parked cars.
MUST BE CLEARLY VISIBLE: the children warning sign, the children, the child on the bicycle near the kerb.
MUST NOT APPEAR: plates under the sign, text."""),
  "Du kører forbi denne tavle nær en skole. Hvordan forholder du dig?",
  "You pass this sign near a school. What do you do?",
  "نزدیک یک مدرسه از کنار این تابلو رد می‌شوید. چه می‌کنید؟",
  S(True, "Jeg sænker farten og er klar til at bremse.", "I slow down and am ready to brake.", "سرعتم را کم می‌کنم و آماده‌ی ترمز هستم.",
    "Nær børn skal hastigheden være passende lav.",
    "Near children your speed must be suitably low.",
    "نزدیک بچه‌ها، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(False, "Jeg kan køre med normal fart, når jeg ikke kan se nogen børn på kørebanen.", "I can drive at normal speed when I cannot see any children on the carriageway.",
    "وقتی کودکی روی سواره‌رو نمی‌بینم، می‌توانم با سرعت معمول برانم.",
    "Børn kan pludselig komme frem mellem de parkerede biler; tavlen varsler, at der kan være børn, og der skal vises særligt hensyn.",
    "Children may suddenly appear between the parked cars; the sign warns that there may be children, and special consideration must be shown.",
    "بچه‌ها ممکن است ناگهان از میان خودروهای پارک‌شده بیرون بیایند؛ تابلو هشدار می‌دهد که ممکن است بچه باشد و باید ملاحظه‌ی ویژه داشت."),
  S(False, "Jeg kan regne med, at børnene har set mig.", "I can count on the children having seen me.", "می‌توانم مطمئن باشم که بچه‌ها مرا دیده‌اند.",
    "Børn har svært ved at vurdere trafikken og ser ikke altid bilerne.",
    "Children find it hard to judge traffic and do not always see the cars.",
    "بچه‌ها در سنجیدن ترافیک مشکل دارند و همیشه خودروها را نمی‌بینند."),
  S(False, "Tavlen gælder kun i skolens åbningstid.", "The sign only applies during school hours.", "این تابلو فقط در ساعات کار مدرسه معتبر است.",
    "Tavlen gælder hele tiden, når der ikke er en undertavle med tidspunkter.",
    "The sign applies all the time when there is no plate under it with times.",
    "وقتی زیر تابلو تابلوی کوچکی با ساعت نیست، همیشه معتبر است."),
)

Q(5031, "7.6", town("""
THE SCENE: a town street, one lane in our direction. About 25 m ahead a zebra crossing (white stripes) with the blue square crossing
sign. On the right kerb at the crossing stands a person holding a long white cane, about to step onto the crossing.
MUST BE CLEARLY VISIBLE: the zebra crossing, the person with the white cane at the kerb.
MUST NOT APPEAR: traffic lights, other pedestrians, text."""),
  "En person med en hvid stok står ved fodgængerfeltet. Hvordan forholder du dig?",
  "A person with a white cane is standing at the pedestrian crossing. What do you do?",
  "کسی با عصای سفید کنار گذرگاه عابر ایستاده است. چه می‌کنید؟",
  S(True, "Jeg standser og lader personen gå over.", "I stop and let the person cross.", "می‌ایستم و می‌گذارم آن شخص رد شود.",
    "Før et fodgængerfelt skal du afpasse hastigheden og om nødvendigt standse for den, der er på vej ud.",
    "Before a crossing you must adjust your speed and stop if necessary for someone about to step out.",
    "پیش از گذرگاه عابر باید سرعت را تنظیم کنید و در صورت لزوم برای کسی که می‌خواهد رد شود بایستید."),
  S(True, "Den hvide stok viser, at personen ser dårligt eller er blind.", "The white cane shows that the person has poor sight or is blind.",
    "عصای سفید نشان می‌دهد که آن شخص کم‌بیناست یا نابیناست.",
    "Over for personer med nedsat syn skal der vises særligt hensyn.",
    "Special consideration must be shown to people with impaired sight.",
    "باید نسبت به افراد کم‌بینا ملاحظه‌ی ویژه داشت."),
  S(False, "Jeg dytter, så personen ved, at jeg kommer.", "I sound the horn so that the person knows I am coming.", "بوق می‌زنم تا آن شخص بفهمد می‌آیم.",
    "Et dyt kan forskrække og forvirre; du skal i stedet standse.",
    "A horn can startle and confuse; you must stop instead.",
    "بوق می‌تواند بترساند و گیج کند؛ باید به‌جایش بایستید."),
  S(False, "Jeg kører forbi, fordi personen ikke kan se, om der kommer biler.", "I drive past because the person cannot see whether cars are coming.",
    "رد می‌شوم، چون آن شخص نمی‌تواند ببیند خودرویی می‌آید یا نه.",
    "Netop derfor skal du tage særligt hensyn og lade personen gå over.",
    "That is exactly why you must take special care and let the person cross.",
    "دقیقاً به همین دلیل باید ملاحظه کنید و بگذارید رد شود."),
)

Q(5032, "7.3", view("""
THE SCENE: a Danish motorway, two lanes in our direction, a wide central reserve with a crash barrier, a broad solid edge line and a
hard shoulder on the right, light traffic. No speed-limit signs in sight. A blue motorway sign (white bridge-and-road symbol) stands
on the right verge.
MUST BE CLEARLY VISIBLE: the motorway layout, the motorway sign.
MUST NOT APPEAR: speed-limit signs, text."""),
  "Du kører i en almindelig bil på motorvejen. Der er ingen hastighedstavler. Hvad gælder?",
  "You are driving an ordinary car on the motorway. There are no speed-limit signs. What applies?",
  "با خودروی معمولی در بزرگراه می‌رانید. تابلوی سرعتی نیست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må højst køre 130 km/t.", "I may drive at most 130 km/h.", "حداکثر ۱۳۰ کیلومتر بر ساعت می‌توانم برانم.",
    "Den generelle grænse på motorvej er 130 km/t.", "The general limit on the motorway is 130 km/h.", "حد عمومی سرعت در بزرگراه ۱۳۰ کیلومتر بر ساعت است."),
  S(False, "Jeg må højst køre 110 km/t.", "I may drive at most 110 km/h.", "حداکثر ۱۱۰ کیلومتر بر ساعت می‌توانم برانم.",
    "110 km/t gælder kun, hvor det er skiltet.", "110 km/h only applies where it is signed.", "۱۱۰ کیلومتر بر ساعت فقط جایی است که تابلو داشته باشد."),
  S(False, "Der er ingen hastighedsgrænse på motorvejen.", "There is no speed limit on the motorway.", "در بزرگراه حد سرعتی وجود ندارد.",
    "Der gælder altid en højeste hastighed, også på motorvej.", "There is always a highest speed, also on the motorway.", "همیشه حداکثر سرعتی هست، در بزرگراه هم."),
  S(False, "Jeg må køre hurtigere end 130 km/t, mens jeg overhaler.", "I may drive faster than 130 km/h while I am overtaking.",
    "هنگام سبقت می‌توانم تندتر از ۱۳۰ کیلومتر بر ساعت برانم.",
    "Hastighedsgrænsen gælder også under overhaling.", "The speed limit also applies while overtaking.", "حد سرعت هنگام سبقت هم برقرار است."),
)

Q(5033, "7.3", view("""
THE SCENE: a two-way country road outside town, one lane in each direction, a broken centre line, fields. In the right door mirror
(at the right edge of the picture) we can see that our car pulls a small open trailer. No speed-limit signs in sight.
MUST BE CLEARLY VISIBLE: the trailer behind our car in the door mirror, the country road.
MUST NOT APPEAR: speed-limit signs, text."""),
  "Du kører med en almindelig trailer på en landevej uden hastighedstavler. Hvad gælder?",
  "You are towing an ordinary trailer on a country road with no speed-limit signs. What applies?",
  "با یک تریلر معمولی در جاده‌ای بیرون شهر و بدون تابلوی سرعت می‌رانید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må højst køre 80 km/t.", "I may drive at most 80 km/h.", "حداکثر ۸۰ کیلومتر بر ساعت می‌توانم برانم.",
    "Bil med påhængskøretøj må højst køre 80 km/t uden for motorvej.",
    "A car with a trailer may drive at most 80 km/h off the motorway.",
    "خودرو با یدک بیرون از بزرگراه حداکثر ۸۰ کیلومتر بر ساعت می‌تواند برود."),
  S(False, "Jeg må køre lige så hurtigt som uden trailer.", "I may drive as fast as without a trailer.", "می‌توانم به همان سرعتِ بدون تریلر برانم.",
    "Med trailer gælder en lavere grænse end for bilen alene.", "With a trailer a lower limit applies than for the car alone.", "با تریلر حد سرعت پایین‌تری از خودروی تنها برقرار است."),
  S(True, "På motorvej må jeg højst køre 100 km/t, hvis vogntoget opfylder betingelserne for det.",
    "On the motorway I may drive at most 100 km/h if the combination meets the conditions for it.",
    "در بزرگراه اگر خودرو با یدک شرایطش را داشته باشد، حداکثر ۱۰۰ کیلومتر بر ساعت می‌توانم برانم.",
    "Færdselsloven § 43 tillader 100 km/t på motorvej for vogntog, der opfylder bestemte krav.",
    "Færdselsloven § 43 allows 100 km/h on the motorway for combinations that meet certain requirements.",
    "ماده‌ی ۴۳ قانون برای خودرو با یدکی که شرایط خاصی دارد، ۱۰۰ کیلومتر بر ساعت در بزرگراه را مجاز می‌داند."),
  S(False, "En trailer påvirker ikke bremselængden.", "A trailer does not affect the braking distance.", "تریلر روی مسافت ترمز اثری ندارد.",
    "Et vogntog er tungere og får længere bremselængde.", "A combination is heavier and has a longer braking distance.", "خودرو با یدک سنگین‌تر است و مسافت ترمزش بیشتر است."),
)

Q(5034, "7.3", view("""
THE SCENE: a two-way country road in dense fog: everything beyond about 40 m disappears in grey-white fog. The edge lines and the
broken centre line fade into the fog; the red rear lights of a car ahead are just visible at the limit of the fog.
MUST BE CLEARLY VISIBLE: how short the visibility is, the faint rear lights ahead.
MUST NOT APPEAR: signs, text.""", cond="dense fog, visibility about 40 m, grey daylight"),
  "Der er tæt tåge. Hvordan forholder du dig?",
  "There is dense fog. What do you do?",
  "مه غلیظی است. چه می‌کنید؟",
  S(True, "Jeg kører så langsomt, at jeg kan standse på den strækning, jeg kan se.", "I drive so slowly that I can stop within the distance I can see.",
    "آن‌قدر آهسته می‌رانم که بتوانم در فاصله‌ای که می‌بینم بایستم.",
    "Du skal altid kunne standse på den del af vejen, du har udsyn over.",
    "You must always be able to stop within the part of the road you can see.",
    "همیشه باید بتوانید در بخشی از جاده که می‌بینید بایستید."),
  S(False, "Jeg kører tæt bag bilen foran og følger dens baglygter.", "I drive close behind the car ahead and follow its rear lights.",
    "نزدیک پشت خودروی جلو می‌رانم و چراغ‌های عقبش را دنبال می‌کنم.",
    "Tæt afstand giver ingen tid til at bremse, hvis bilen foran standser.",
    "A short distance leaves no time to brake if the car ahead stops.",
    "فاصله‌ی کم، اگر خودروی جلو بایستد، فرصتی برای ترمز نمی‌گذارد."),
  S(True, "Jeg må bruge tågeforlygter.", "I may use front fog lights.", "می‌توانم از چراغ‌های مه‌شکن جلو استفاده کنم.",
    "Tågelygter må bruges i tåge og under kraftig nedbør.",
    "Fog lights may be used in fog and heavy precipitation.",
    "چراغ مه‌شکن در مه و بارش شدید مجاز است."),
  S(False, "Jeg tænder fjernlyset, så jeg kan se længere.", "I switch on the high beam so that I can see further.", "نور بالا را روشن می‌کنم تا دورتر را ببینم.",
    "I tåge kaster fjernlyset lyset tilbage og blænder dig selv.",
    "In fog the high beam reflects back and dazzles you.",
    "در مه، نور بالا بازمی‌تابد و خودتان را خیره می‌کند."),
)

Q(5035, "7.3", view("""
THE SCENE: a dark, unlit two-way country road at night, one lane in each direction. Our high beam lights up the road far ahead.
Far ahead an oncoming car appears over a slight rise with its headlights on.
MUST BE CLEARLY VISIBLE: our long high-beam light on the road, the oncoming car's headlights far away.
MUST NOT APPEAR: street lamps, signs, text.""", cond="night, dark unlit road, dry"),
  "Du kører med fjernlys, og langt fremme kommer en bil imod dig. Hvordan forholder du dig?",
  "You are driving with high beam, and far ahead a car is coming towards you. What do you do?",
  "با نور بالا می‌رانید و دورتر خودرویی از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg skifter til nærlys i god tid, så den modkørende ikke bliver blændet.", "I switch to dipped beam in good time so that the oncoming driver is not dazzled.",
    "به موقع به نور پایین می‌روم تا راننده‌ی روبه‌رو خیره نشود.",
    "Fjernlys må ikke bruges, når en modkørende kan blive blændet.",
    "High beam must not be used when an oncoming driver could be dazzled.",
    "وقتی ممکن است راننده‌ی روبه‌رو خیره شود، نباید از نور بالا استفاده کرد."),
  S(True, "Jeg afpasser farten efter det kortere udsyn med nærlys.", "I adjust my speed to the shorter view with dipped beam.",
    "سرعتم را با دید کوتاه‌ترِ نور پایین تنظیم می‌کنم.",
    "Før du skifter til nærlys, skal hastigheden passe til det nye, kortere udsyn.",
    "Before you dip, your speed must suit the new, shorter view.",
    "پیش از رفتن به نور پایین، سرعت باید با دید تازه و کوتاه‌تر جور باشد."),
  S(False, "Jeg beholder fjernlyset, til bilen er lige ud for mig.", "I keep the high beam on until the car is right beside me.",
    "نور بالا را تا رسیدن خودرو به کنارم روشن نگه می‌دارم.",
    "Så bliver den modkørende blændet i lang tid.", "Then the oncoming driver is dazzled for a long time.", "این‌طور راننده‌ی روبه‌رو مدت زیادی خیره می‌شود."),
  S(False, "Jeg blinker med fjernlyset, så den modkørende ved, at jeg er her.", "I flash my high beam so that the oncoming driver knows I am here.",
    "با نور بالا چراغ می‌زنم تا راننده‌ی روبه‌رو بداند من این‌جا هستم.",
    "Det blænder og er ikke nødvendigt; den modkørende kan se dit lys.",
    "It dazzles and is not needed; the oncoming driver can see your lights.",
    "این کار خیره می‌کند و لازم نیست؛ راننده‌ی روبه‌رو چراغ‌های شما را می‌بیند."),
)

Q(5036, "7.3", view("""
THE SCENE: a two-way road outside town. On the right verge a triangular warning sign (white with a red border) showing a person
digging with a shovel (road works). About 60 m ahead the right part of our lane is closed by a row of orange-and-white traffic
cones; behind them two road workers in orange high-visibility clothing work beside a small digger. Temporary yellow lines on the
road lead traffic a little to the left, past the works.
MUST BE CLEARLY VISIBLE: the road-works sign, the cones, the workers, the yellow temporary lines.
MUST NOT APPEAR: text."""),
  "Du nærmer dig et vejarbejde, hvor der arbejder folk tæt ved vejen. Hvordan forholder du dig?",
  "You are approaching road works with people working close to the road. What do you do?",
  "به محل کار جاده‌ای نزدیک می‌شوید که کارگرانی نزدیک جاده کار می‌کنند. چه می‌کنید؟",
  S(True, "Jeg sænker farten.", "I slow down.", "سرعتم را کم می‌کنم.",
    "Ved vejarbejde skal hastigheden være passende lav.", "At road works your speed must be suitably low.", "در محل کار جاده‌ای سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Jeg følger de gule linjer på kørebanen.", "I follow the yellow lines on the road.", "خط‌های زرد روی جاده را دنبال می‌کنم.",
    "Midlertidig gul afmærkning gælder forud for den hvide.", "Temporary yellow markings take priority over the white ones.", "خط‌کشی موقت زرد بر خط‌کشی سفید مقدم است."),
  S(False, "Jeg holder farten, så jeg hurtigt er forbi.", "I keep my speed so that I am past quickly.", "سرعتم را حفظ می‌کنم تا زود رد شوم.",
    "Vejarbejdere kan træde ud på vejen; der skal være tid til at reagere.",
    "Road workers may step onto the road; there must be time to react.",
    "کارگران ممکن است وارد جاده شوند؛ باید فرصت واکنش داشت."),
  S(False, "Tavlen gælder kun, når der er maskiner på vejen.", "The sign only applies when there are machines on the road.", "این تابلو فقط وقتی ماشین‌آلات روی جاده‌اند معتبر است.",
    "Tavlen advarer om vejarbejde, uanset om der er maskiner.",
    "The sign warns of road works whether there are machines or not.",
    "این تابلو از کار جاده‌ای هشدار می‌دهد، چه ماشین‌آلات باشند چه نه."),
)

Q(5037, "7.3", view("""
THE SCENE: a two-way country road, one lane in each direction, a broken centre line. We drive slowly: in the interior rear-view
mirror at the top centre, a queue of three cars is close behind us. About 100 m ahead on the right there is a lay-by with a blue
parking sign (white P).
MUST BE CLEARLY VISIBLE: the queue in the mirror, the lay-by with its P sign.
MUST NOT APPEAR: oncoming traffic, text other than the sign's own design."""),
  "Du er i tvivl om vejen og kører meget langsomt. Bag dig er der dannet kø. Hvad gælder?",
  "You are unsure of the way and are driving very slowly. A queue has formed behind you. What applies?",
  "مسیر را مطمئن نیستید و خیلی آهسته می‌رانید. پشت سرتان صف تشکیل شده است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke uden rimelig grund køre så langsomt, at jeg hindrer andre.", "I must not, without good reason, drive so slowly that I hinder others.",
    "نباید بی‌دلیل آن‌قدر آهسته برانم که مانع دیگران شوم.",
    "Færdselsloven § 41 forbyder at hindre andre ved unødigt lav hastighed.",
    "Færdselsloven § 41 forbids hindering others by needlessly low speed.",
    "ماده‌ی ۴۱ قانون مانع شدن دیگران با سرعت بی‌دلیل کم را ممنوع می‌کند."),
  S(True, "Jeg kører ind i rastepladsen og finder vejen, når jeg holder stille.", "I pull into the lay-by and work out the way while I am standing still.",
    "وارد توقفگاه کنار جاده می‌شوم و وقتی ایستاده‌ام مسیر را پیدا می‌کنم.",
    "Så kan køen komme forbi, og du kan læse kort eller skilte i ro.",
    "Then the queue can get past, and you can read a map or signs in peace.",
    "این‌طور صف رد می‌شود و شما با خیال راحت نقشه یا تابلو را می‌خوانید."),
  S(False, "Jeg bremser pludseligt, hver gang jeg skal læse et vejskilt.", "I brake suddenly every time I need to read a road sign.",
    "هر بار که باید تابلویی را بخوانم، ناگهان ترمز می‌کنم.",
    "Pludselig opbremsning uden grund kan få bilerne bag dig til at køre ind i dig.",
    "Sudden braking without reason can make the cars behind run into you.",
    "ترمز ناگهانی بی‌دلیل ممکن است باعث شود خودروهای پشت سر به شما بزنند."),
  S(False, "Det er altid sikrest at køre så langsomt som muligt.", "It is always safest to drive as slowly as possible.", "همیشه امن‌ترین کار آهسته‌ترین رانندگی است.",
    "En meget lav fart kan skabe farlige overhalinger og kø.",
    "Very low speed can cause dangerous overtaking and queues.",
    "سرعت خیلی کم می‌تواند به سبقت‌های خطرناک و صف منجر شود."),
)

Q(5038, "7.12", town("""
THE SCENE: a junction in a residential area with no signs, no road markings and no traffic lights; low hedges at the corners. We
want to drive straight on. From the side road on the RIGHT a white car approaches the junction; from the side road on the LEFT a
cyclist approaches.
MUST BE CLEARLY VISIBLE: the unmarked junction, the white car from the right, the cyclist from the left.
MUST NOT APPEAR: signs, shark teeth, text."""),
  "Du vil køre ligeud i krydset. Fra højre kommer en bil, og fra venstre kommer en cyklist. Hvordan forholder du dig?",
  "You want to drive straight on in the junction. A car is coming from the right and a cyclist from the left. What do you do?",
  "می‌خواهید مستقیم از تقاطع رد شوید. از راست خودرویی و از چپ دوچرخه‌سواری می‌آید. چه می‌کنید؟",
  S(True, "Jeg holder tilbage for bilen fra højre.", "I give way to the car from the right.", "به خودروی سمت راست راه می‌دهم.",
    "Uden tavler og afmærkning gælder højrereglen: du holder tilbage for trafik fra højre.",
    "Without signs or markings the right-hand rule applies: you give way to traffic from the right.",
    "بدون تابلو و خط‌کشی، قاعده‌ی دست راست برقرار است: به ترافیک سمت راست راه می‌دهید."),
  S(True, "Cyklisten fra venstre skal holde tilbage for mig.", "The cyclist from the left must give way to me.", "دوچرخه‌سوار سمت چپ باید به من راه بدهد.",
    "Højrereglen gælder også for cyklister: cyklisten har dig på sin højre side.",
    "The right-hand rule also applies to cyclists: the cyclist has you on their right.",
    "قاعده‌ی دست راست برای دوچرخه‌سواران هم هست: شما در سمت راست او هستید."),
  S(False, "Jeg har forkørselsret, fordi jeg kører ligeud.", "I have the right of way because I am going straight on.", "حق تقدم با من است، چون مستقیم می‌روم.",
    "At køre ligeud giver ikke forkørselsret over for trafik fra højre.",
    "Going straight on does not give you the right of way over traffic from the right.",
    "مستقیم رفتن در برابر ترافیک سمت راست حق تقدم نمی‌دهد."),
  S(False, "Jeg kan regne med, at cyklisten holder tilbage, så jeg behøver ikke se efter den.", "I can count on the cyclist giving way, so I do not need to watch it.",
    "می‌توانم مطمئن باشم دوچرخه‌سوار راه می‌دهد، پس لازم نیست حواسم به او باشد.",
    "Du skal altid være opmærksom på, om andre overholder deres vigepligt.",
    "You must always watch whether others keep their duty to give way.",
    "همیشه باید ببینید دیگران به وظیفه‌ی راه دادنشان عمل می‌کنند یا نه."),
)

Q(5039, "7.12", town("""
THE SCENE: we approach a junction in town to drive straight on. Across our lane, just before the junction, there is a row of
white shark-teeth triangles pointing towards us; there is NO sign. On the crossing street a car comes slowly from the left.
MUST BE CLEARLY VISIBLE: the shark teeth across our lane, the car on the crossing street.
MUST NOT APPEAR: signs, traffic lights, text."""),
  "Der er hajtænder på kørebanen foran dig, men ingen tavle. Hvad gælder?",
  "There are shark teeth on the road ahead of you, but no sign. What applies?",
  "روی جاده جلوی شما دندان‌کوسه هست، ولی تابلویی نیست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg har ubetinget vigepligt for trafikken på den tværgående vej.", "I must give way unconditionally to the traffic on the crossing road.",
    "باید بی‌قیدوشرط به ترافیک جاده‌ی متقاطع راه بدهم.",
    "Hajtænderne betyder ubetinget vigepligt, også uden tavle.",
    "The shark teeth mean unconditional give-way, also without a sign.",
    "دندان‌کوسه حتی بدون تابلو یعنی راه دادن بی‌قیدوشرط."),
  S(False, "Hajtænder gælder kun sammen med en vigepligtstavle.", "Shark teeth only apply together with a give-way sign.", "دندان‌کوسه فقط همراه تابلوی راه بدهید معتبر است.",
    "Afmærkningen alene giver vigepligt.", "The marking alone gives the duty to give way.", "خود خط‌کشی به‌تنهایی وظیفه‌ی راه دادن می‌دهد."),
  S(True, "Bilen fra venstre skal have lov at køre først.", "The car from the left must be allowed to go first.", "باید بگذارم خودروی سمت چپ اول برود.",
    "Ubetinget vigepligt gælder for trafikken fra begge sider.", "Unconditional give-way applies to traffic from both sides.", "راه دادن بی‌قیدوشرط برای ترافیک هر دو طرف است."),
)

Q(5040, "7.12", town("""
THE SCENE: a junction in town controlled by traffic lights; our light shows GREEN and we want to drive straight on. Just after the
junction, on the far side, a queue of cars stands still in our direction, filling the road right up to the edge of the junction,
so there is no room for us on the other side. Cars wait on the crossing street at their red lights.
MUST BE CLEARLY VISIBLE: our green light, the queue right after the junction, the empty junction.
MUST NOT APPEAR: text."""),
  "Du har grønt lys, men der holder en kø lige efter krydset. Hvordan forholder du dig?",
  "You have a green light, but there is a queue just after the junction. What do you do?",
  "چراغ سبز است، ولی درست بعد از تقاطع صف ایستاده است. چه می‌کنید؟",
  S(True, "Jeg venter før krydset, til der er plads på den anden side.", "I wait before the junction until there is room on the other side.",
    "پیش از تقاطع صبر می‌کنم تا آن طرف جا باز شود.",
    "Du må ikke køre ind på grønt, hvis du ikke kan komme ud af krydset, før de tværgående får grønt.",
    "You must not drive in on green if you cannot get out of the junction before the crossing traffic gets green.",
    "اگر نتوانید پیش از سبز شدن چراغ ترافیک متقاطع از تقاطع خارج شوید، نباید با چراغ سبز واردش شوید."),
  S(False, "Jeg kører ind i krydset, fordi jeg har grønt.", "I drive into the junction because I have a green light.", "وارد تقاطع می‌شوم، چون چراغم سبز است.",
    "Grønt lys giver ikke ret til at blive holdende midt i krydset.", "A green light does not give a right to stand in the middle of the junction.", "چراغ سبز اجازه‌ی ماندن وسط تقاطع را نمی‌دهد."),
  S(False, "Jeg må køre ind i krydset, hvis jeg tænder havariblinket.", "I may drive into the junction if I switch on the hazard lights.",
    "اگر چراغ خطر را روشن کنم، می‌توانم وارد تقاطع شوم.",
    "Havariblinket ændrer ikke, at du spærrer krydset for den tværgående trafik.", "The hazard lights do not change the fact that you block the junction for the crossing traffic.",
    "چراغ خطر این را تغییر نمی‌دهد که تقاطع را برای ترافیک متقاطع می‌بندید."),
  S(False, "Jeg kører frem og stiller mig skråt, så andre kan komme forbi.", "I drive forward and stand at an angle so that others can get past.",
    "جلو می‌روم و کج می‌ایستم تا دیگران رد شوند.",
    "Du skal slet ikke køre ind i krydset, når der ikke er plads.", "You must not drive into the junction at all when there is no room.", "وقتی جا نیست، اصلاً نباید وارد تقاطع شوید."),
)

Q(5041, "7.12", view("""
THE SCENE: we are at the exit of a petrol station, about to drive out onto a town street. Directly in front of us: a pavement, then
a cycle path, then the carriageway. A pedestrian walks on the pavement from the left towards our exit; on the cycle path a cyclist
comes from the right. On the street a car passes from the left. No signs at the exit.
MUST BE CLEARLY VISIBLE: the pavement, the cycle path and the street in front of us, the pedestrian, the cyclist, the car.
MUST NOT APPEAR: signs, text.""", scenery="Scenery is reduced to simple flat house fronts across the street, the petrol station's pumps at the picture's edges."),
  "Du vil køre ud fra tankstationen. Hvordan forholder du dig?",
  "You want to drive out of the petrol station. What do you do?",
  "می‌خواهید از پمپ بنزین خارج شوید. چه می‌کنید؟",
  S(True, "Jeg har ubetinget vigepligt for trafikken på vejen.", "I must give way unconditionally to the traffic on the road.", "باید بی‌قیدوشرط به ترافیک جاده راه بدهم.",
    "Kørsel ud fra en tankstation giver ubetinget vigepligt.", "Driving out of a petrol station means unconditional give-way.", "خروج از پمپ بنزین یعنی راه دادن بی‌قیدوشرط."),
  S(True, "Jeg skal holde tilbage for fodgængeren og cyklisten.", "I must give way to the pedestrian and the cyclist.", "باید به عابر و دوچرخه‌سوار راه بدهم.",
    "Du skal holde tilbage for gående på fortovet og for cyklister på cykelstien, når du krydser dem.",
    "You must give way to pedestrians on the pavement and cyclists on the cycle path when you cross them.",
    "هنگام عبور از پیاده‌رو و مسیر دوچرخه، باید به عابران و دوچرخه‌سواران راه بدهید."),
  S(False, "Højrereglen gælder, fordi der ikke er nogen tavle.", "The right-hand rule applies because there is no sign.", "قاعده‌ی دست راست برقرار است، چون تابلویی نیست.",
    "Højrereglen gælder ikke ved udkørsel fra en tankstation.", "The right-hand rule does not apply when driving out of a petrol station.", "قاعده‌ی دست راست در خروج از پمپ بنزین اعمال نمی‌شود."),
  S(False, "Fodgængeren skal vente, fordi jeg skal over fortovet.", "The pedestrian must wait because I have to cross the pavement.", "عابر باید صبر کند، چون من باید از پیاده‌رو رد شوم.",
    "Det er dig, der skal vente på fodgængeren.", "It is you who must wait for the pedestrian.", "شما هستید که باید منتظر عابر بمانید."),
)

Q(5042, "7.12", view("""
THE SCENE: a junction outside town with traffic lights. The lights for us show a FLASHING yellow light (drawn as a yellow lamp with
small rays). On the right at the junction stands a give-way sign (a white triangle with a red border, point down), and there are
shark teeth across our lane. A lorry comes along the crossing road from the left.
MUST BE CLEARLY VISIBLE: the flashing yellow light, the give-way sign and shark teeth, the lorry.
MUST NOT APPEAR: text."""),
  "Lyssignalet i krydset blinker gult. Hvordan forholder du dig?",
  "The traffic light at the junction is flashing yellow. What do you do?",
  "چراغ راهنمایی تقاطع زرد چشمک‌زن است. چه می‌کنید؟",
  S(True, "Jeg følger tavlen og hajtænderne og har ubetinget vigepligt.", "I follow the sign and the shark teeth and give way unconditionally.",
    "از تابلو و دندان‌کوسه پیروی می‌کنم و بی‌قیدوشرط راه می‌دهم.",
    "Når signalet blinker gult, gælder tavler og afmærkning.", "When the signal flashes yellow, the signs and markings apply.", "وقتی چراغ زرد چشمک می‌زند، تابلوها و خط‌کشی‌ها معتبرند."),
  S(True, "Jeg kører frem med særlig forsigtighed.", "I drive on with special care.", "با احتیاط ویژه جلو می‌روم.",
    "Blinkende gult advarer om, at du skal være ekstra opmærksom.", "A flashing yellow light warns you to be extra attentive.", "زرد چشمک‌زن هشدار می‌دهد که باید بیشتر مراقب باشید."),
  S(False, "Blinkende gult betyder, at jeg har forkørselsret.", "A flashing yellow light means I have the right of way.", "زرد چشمک‌زن یعنی حق تقدم با من است.",
    "Blinkende gult giver ikke forkørselsret; tavlen giver dig vigepligt.", "A flashing yellow light gives no right of way; the sign makes you give way.", "زرد چشمک‌زن حق تقدم نمی‌دهد؛ تابلو شما را موظف به راه دادن می‌کند."),
  S(False, "Lastbilen skal holde tilbage for mig, fordi den kommer fra venstre.", "The lorry must give way to me because it comes from the left.",
    "کامیون باید به من راه بدهد، چون از سمت چپ می‌آید.",
    "Med vigepligtstavlen holder du tilbage for trafikken fra begge sider.", "With the give-way sign you give way to traffic from both sides.", "با تابلوی راه بدهید، به ترافیک هر دو طرف راه می‌دهید."),
)

Q(5043, "7.12", town("""
THE SCENE: a junction in town with traffic lights; our light has just turned GREEN and we want to drive straight on. On the zebra
crossing right in front of us, across our lane, an elderly man with a walking stick is still crossing; he is in the middle of our
lane. The pedestrian light for him (on the far side) shows red.
MUST BE CLEARLY VISIBLE: our green light, the elderly man on the crossing in front of us.
MUST NOT APPEAR: text."""),
  "Du får grønt lys, men en ældre mand er stadig på fodgængerfeltet foran dig. Hvordan forholder du dig?",
  "You get a green light, but an elderly man is still on the pedestrian crossing in front of you. What do you do?",
  "چراغ شما سبز می‌شود، ولی مرد مسنی هنوز روی گذرگاه عابر جلوی شماست. چه می‌کنید؟",
  S(True, "Jeg holder tilbage og lader ham komme over.", "I wait and let him get across.", "صبر می‌کنم تا رد شود.",
    "Ved et reguleret fodgængerfelt skal du holde tilbage for gående, der allerede er på feltet.",
    "At a controlled crossing you must give way to pedestrians already on it.",
    "در گذرگاه چراغ‌دار، باید به عابرانی که روی گذرگاه‌اند راه بدهید."),
  S(False, "Jeg kører, fordi jeg har grønt, og han har rødt.", "I drive because I have green and he has red.", "حرکت می‌کنم، چون چراغ من سبز و چراغ او قرمز است.",
    "Grønt lys giver ikke ret til at køre ind på en, der allerede er på feltet.",
    "A green light gives no right to drive at someone who is already on the crossing.",
    "چراغ سبز اجازه نمی‌دهد به سمت کسی که روی گذرگاه است برانید."),
  S(True, "Ældre mennesker kan have brug for længere tid til at gå over.", "Elderly people may need more time to cross.", "افراد مسن ممکن است برای رد شدن به زمان بیشتری نیاز داشته باشند.",
    "Der skal vises særligt hensyn over for ældre mennesker.", "Special consideration must be shown to elderly people.", "نسبت به افراد مسن باید ملاحظه‌ی ویژه داشت."),
  S(False, "Jeg dytter, så han skynder sig.", "I sound the horn so that he hurries.", "بوق می‌زنم تا عجله کند.",
    "Et dyt kan forskrække og få ham til at falde.", "A horn can startle him and make him fall.", "بوق می‌تواند او را بترساند و باعث افتادنش شود."),
)

Q(5044, "7.14", town("""
THE SCENE: a junction in town with traffic lights; our light shows a full GREEN light (no arrows). We want to turn LEFT (our left
indicator lamp glows on the dashboard strip). In the oncoming direction a blue car approaches the junction to drive straight on,
and behind it a cyclist on the oncoming cycle path, also going straight.
MUST BE CLEARLY VISIBLE: our green light, the oncoming car and the oncoming cyclist.
MUST NOT APPEAR: arrows in the lights, text."""),
  "Du har grønt lys og vil svinge til venstre. En bil og en cyklist kommer imod dig. Hvordan forholder du dig?",
  "You have a green light and want to turn left. A car and a cyclist are coming towards you. What do you do?",
  "چراغ سبز است و می‌خواهید به چپ بپیچید. یک خودرو و یک دوچرخه‌سوار از روبه‌رو می‌آیند. چه می‌کنید؟",
  S(True, "Jeg holder tilbage for den modkørende bil.", "I give way to the oncoming car.", "به خودروی روبه‌رو راه می‌دهم.",
    "Når du svinger til venstre, må du ikke genere de modkørende.", "When you turn left you must not inconvenience oncoming traffic.", "هنگام گردش به چپ نباید مزاحم ترافیک روبه‌رو شوید."),
  S(True, "Jeg holder også tilbage for den modkørende cyklist.", "I also give way to the oncoming cyclist.", "به دوچرخه‌سوار روبه‌رو هم راه می‌دهم.",
    "Reglen gælder alle modkørende, også cyklister.", "The rule applies to all oncoming traffic, cyclists too.", "این قاعده برای همه‌ی ترافیک روبه‌رو، از جمله دوچرخه‌سواران، است."),
  S(False, "Jeg har forkørselsret, fordi jeg har grønt.", "I have the right of way because I have green.", "حق تقدم با من است، چون چراغم سبز است.",
    "De modkørende har også grønt, og den venstresvingende skal vente.", "The oncoming traffic also has green, and the left-turner must wait.", "ترافیک روبه‌رو هم سبز است و کسی که به چپ می‌پیچد باید صبر کند."),
  S(True, "Jeg kan køre lidt frem i krydset og vente der, hvis det ikke generer andre.", "I may drive a little into the junction and wait there if it does not hinder others.",
    "اگر مزاحم دیگران نباشد، می‌توانم کمی وارد تقاطع شوم و آن‌جا صبر کنم.",
    "Så er du klar til at svinge, når de modkørende er passeret.", "Then you are ready to turn when the oncoming traffic has passed.", "این‌طور وقتی ترافیک روبه‌رو رد شد، آماده‌ی پیچیدن هستید."),
)

Q(5045, "7.14", above("""
THE SCENE: a two-way road seen from above, one lane in each direction, a broken centre line; a side road joins from the LEFT in the
middle of the picture.
VEHICLES (colour code used strictly): a RED car (ours) coming up in our lane, with a SOLID GREEN arrow showing the correct path: it
moves close to the centre line before the side road, turns left in a smooth curve and ends in the RIGHT-hand side of the side road.
A DASHED ORANGE arrow shows a wrong path that cuts the corner into the left side of the side road.
MUST NOT APPEAR: other vehicles, signs, text."""),
  "Du vil svinge til venstre ind på sidevejen. Hvordan placerer du bilen?",
  "You want to turn left into the side road. How do you position the car?",
  "می‌خواهید به چپ وارد فرعی شوید. خودرو را چطور قرار می‌دهید؟",
  S(True, "Så tæt på midten af vejen som muligt, før jeg svinger.", "As close to the middle of the road as possible before I turn.", "پیش از پیچیدن، تا جای ممکن نزدیک وسط جاده.",
    "Ved venstresving skal du holde nær midten af kørebanen.", "When turning left you must keep near the middle of the carriageway.", "در گردش به چپ باید نزدیک وسط سواره‌رو بمانید."),
  S(True, "Efter svinget kører jeg i højre side af sidevejen.", "After the turn I drive on the right side of the side road.", "بعد از پیچیدن در سمت راست فرعی می‌رانم.",
    "Svinget skal ende i højre side af den vej, du kører ind på.", "The turn must end on the right side of the road you enter.", "گردش باید در سمت راستِ جاده‌ای که واردش می‌شوید تمام شود."),
  S(False, "Jeg skærer svinget, så jeg hurtigt kommer ud af krydset.", "I cut the corner so that I get out of the junction quickly.", "گوشه را میان‌بر می‌زنم تا زود از تقاطع بیرون بروم.",
    "Så kommer du over i venstre side af sidevejen og kan ramme en, der kommer ud.",
    "Then you end up on the left side of the side road and may hit someone coming out.",
    "این‌طور به سمت چپ فرعی می‌روید و ممکن است با کسی که بیرون می‌آید برخورد کنید."),
  S(False, "Jeg kører først ind til højre kant for at få et bredere sving.", "I first move to the right edge to get a wider turn.", "اول به لبه‌ی راست می‌روم تا گردش بازتری داشته باشم.",
    "Det forvirrer trafikken bag dig, som tror, du vil svinge til højre.",
    "It confuses the traffic behind you, who think you are turning right.",
    "این کار ترافیک پشت سر را که خیال می‌کنند به راست می‌پیچید، گیج می‌کند."),
)

Q(5046, "7.14", town("""
THE SCENE: a junction in town without traffic lights. We have moved near the centre line to turn LEFT into the side street on the
left. On the side street, just past the corner, two pedestrians are crossing the side street from one pavement to the other.
MUST BE CLEARLY VISIBLE: the side street on the left, the two pedestrians crossing it.
MUST NOT APPEAR: traffic lights, other vehicles in the junction, text."""),
  "Du vil svinge til venstre. To fodgængere går over sidevejen, du skal ind på. Hvordan forholder du dig?",
  "You want to turn left. Two pedestrians are crossing the side road you are turning into. What do you do?",
  "می‌خواهید به چپ بپیچید. دو عابر در حال عبور از فرعی‌ای هستند که می‌خواهید واردش شوید. چه می‌کنید؟",
  S(True, "Jeg venter, til fodgængerne er kommet over.", "I wait until the pedestrians are across.", "صبر می‌کنم تا عابران رد شوند.",
    "Når du svinger, må du ikke være til fare for gående, der går over den vej, du svinger ind på.",
    "When you turn you must not endanger pedestrians crossing the road you turn into.",
    "هنگام پیچیدن نباید عابرانی را که از جاده‌ی مقصد رد می‌شوند به خطر بیندازید."),
  S(False, "Fodgængerne skal vente, fordi jeg allerede er i gang med at svinge.", "The pedestrians must wait because I am already turning.",
    "عابران باید صبر کنند، چون من در حال پیچیدن هستم.",
    "Det er dig, der skal tage hensyn til fodgængerne.", "It is you who must take care of the pedestrians.", "شما هستید که باید مراقب عابران باشید."),
  S(True, "Jeg ser efter fodgængere i sidevejen, før jeg begynder at svinge.", "I look for pedestrians in the side road before I start to turn.",
    "پیش از شروع پیچیدن، عابران فرعی را نگاه می‌کنم.",
    "Så kan du vente det rigtige sted uden at spærre for andre.", "Then you can wait in the right place without blocking others.", "این‌طور می‌توانید در جای درست صبر کنید بی‌آنکه راه را ببندید."),
)

Q(5047, "7.14", above("""
THE SCENE: a crossroads seen from above, two-way roads, one lane in each direction, no signs and no traffic lights.
VEHICLES (colour code used strictly): a RED car (ours) coming up from the bottom and a BLUE car coming down from the top; BOTH have
their LEFT indicators flashing (bright orange) and both turn left. SOLID GREEN arrows show the two turns: each car keeps the other
on its LEFT side as they pass each other in the middle, and each ends on the right side of the road it turns into. A
GREY car further back behind the blue car goes straight on.
MUST NOT APPEAR: signs, pedestrians, text."""),
  "Både du og den modkørende vil svinge til venstre i krydset. Hvad gælder?",
  "Both you and the oncoming driver want to turn left in the junction. What applies?",
  "هم شما و هم راننده‌ی روبه‌رو می‌خواهید در تقاطع به چپ بپیچید. چه قاعده‌ای برقرار است؟",
  S(True, "Vi kan køre forbi hinanden til venstre, hvis det kan ske uden fare.",
    "We may pass each other on the left if it can be done safely.",
    "اگر بی‌خطر باشد، می‌توانیم از سمت چپ از کنار هم رد شویم.",
    "Modkørende venstresvingende må køre forbi hinanden til venstre.", "Oncoming left-turners may pass each other on the left.", "دو خودروی روبه‌رو که به چپ می‌پیچند، می‌توانند از سمت چپ از کنار هم رد شوند."),
  S(False, "Den, der kom først til krydset, har forkørselsret og svinger først.", "Whoever reached the junction first has the right of way and turns first.",
    "هر کس اول به تقاطع رسیده، حق تقدم دارد و اول می‌پیچد.",
    "Der er ingen sådan regel; I kan svinge samtidig og passere hinanden til venstre.",
    "There is no such rule; you can turn at the same time and pass each other on the left.",
    "چنین قاعده‌ای نیست؛ می‌توانید هم‌زمان بپیچید و از سمت چپ از کنار هم رد شوید."),
  S(True, "Vi skal begge holde tilbage for modkørende, der kører ligeud.", "We must both give way to oncoming traffic going straight on.",
    "هر دو باید به ترافیک روبه‌رویی که مستقیم می‌رود راه بدهیم.",
    "Den grå bil, der kører ligeud, skal kunne passere først.", "The grey car going straight on must be allowed to pass first.", "باید بگذاریم خودروی خاکستری که مستقیم می‌رود اول رد شود."),
)

Q(5048, "7.14", above("""
THE SCENE: a one-way street in town seen from above, two lanes, all traffic going up the picture; a blue one-way sign with a white
arrow at the bottom. A side street joins from the LEFT in the upper half.
VEHICLES (colour code used strictly): a RED car (ours) in the LEFT lane close to the left edge, its LEFT indicator flashing, with a
SOLID GREEN arrow turning left into the side street; a GREY car in the right lane going straight on.
MUST NOT APPEAR: oncoming traffic, text."""),
  "Du kører på en ensrettet vej og vil svinge til venstre. Hvordan placerer du dig?",
  "You are on a one-way road and want to turn left. How do you position yourself?",
  "در جاده‌ی یک‌طرفه می‌رانید و می‌خواهید به چپ بپیچید. چطور قرار می‌گیرید؟",
  S(True, "Så langt til venstre som muligt.", "As far to the left as possible.", "تا جای ممکن سمت چپ.",
    "På en ensrettet vej skal du ved venstresving holde nær venstre kant.", "On a one-way road you keep near the left edge when turning left.", "در جاده‌ی یک‌طرفه برای گردش به چپ باید نزدیک لبه‌ی چپ باشید."),
  S(False, "Nær midten af vejen, som når jeg svinger til venstre fra en almindelig vej.", "Near the middle of the road, as when I turn left from an ordinary road.",
    "نزدیک وسط جاده، مثل گردش به چپ از یک جاده‌ی معمولی.",
    "Der er ingen modkørende; du placerer dig ved venstre kant.", "There is no oncoming traffic; you position yourself at the left edge.", "ترافیک روبه‌رو نیست؛ کنار لبه‌ی چپ قرار می‌گیرید."),
  S(True, "Jeg blinker i god tid og sikrer mig, at svinget kan ske uden fare for trafikken bag mig.", "I indicate in good time and make sure the turn can be made without danger to the traffic behind me.",
    "به موقع راهنما می‌زنم و مطمئن می‌شوم گردش برای ترافیک پشت سرم بی‌خطر است.",
    "Signalet skal gives i god tid, og du må ikke bringe trafikken bag dig i fare.",
    "The signal must be given in good time, and you must not endanger the traffic behind you.",
    "علامت باید به موقع داده شود و نباید ترافیک پشت سر را به خطر بیندازید."),
)

Q(5049, "7.13", town("""
THE SCENE: we approach a junction in town where we want to turn RIGHT (our right indicator lamp glows on the dashboard strip). On the
right, between our lane and the pavement, runs a cycle path raised by a kerb; on it, level with our front door, a cyclist rides
straight on towards the junction.
MUST BE CLEARLY VISIBLE: the cycle path, the cyclist beside us going straight on, the side street on the right.
MUST NOT APPEAR: traffic lights, signs, text."""),
  "Du vil svinge til højre. På cykelstien til højre for dig kører en cyklist ligeud. Hvordan forholder du dig?",
  "You want to turn right. On the cycle path to your right a cyclist is going straight on. What do you do?",
  "می‌خواهید به راست بپیچید. روی مسیر دوچرخه‌ی سمت راستتان دوچرخه‌سواری مستقیم می‌رود. چه می‌کنید؟",
  S(True, "Jeg holder tilbage for cyklisten, der kører ligeud.", "I give way to the cyclist going straight on.", "به دوچرخه‌سواری که مستقیم می‌رود راه می‌دهم.",
    "Ved højresving må du ikke genere cyklister, der kører ligeud.", "When turning right you must not inconvenience cyclists going straight on.", "در گردش به راست نباید مزاحم دوچرخه‌سوارانی شوید که مستقیم می‌روند."),
  S(True, "Jeg kigger over højre skulder for at se i den blinde vinkel.", "I look over my right shoulder to check the blind spot.", "از روی شانه‌ی راست به نقطه‌ی کور نگاه می‌کنم.",
    "En cyklist tæt ved bilen kan være skjult i den blinde vinkel.", "A cyclist close to the car may be hidden in the blind spot.", "دوچرخه‌سواری نزدیک خودرو ممکن است در نقطه‌ی کور پنهان باشد."),
  S(False, "Cyklisten skal holde tilbage, fordi jeg blinker.", "The cyclist must give way because I am indicating.", "دوچرخه‌سوار باید راه بدهد، چون من راهنما زده‌ام.",
    "Blinklyset giver dig ikke forkørselsret.", "The indicator does not give you the right of way.", "راهنما به شما حق تقدم نمی‌دهد."),
  S(False, "Jeg skynder mig at svinge, før cyklisten når krydset.", "I hurry to turn before the cyclist reaches the junction.", "عجله می‌کنم پیش از رسیدن دوچرخه‌سوار به تقاطع بپیچم.",
    "Det er farligt; cyklisten kan være tættere på, end du tror.", "That is dangerous; the cyclist may be closer than you think.", "خطرناک است؛ ممکن است دوچرخه‌سوار نزدیک‌تر از آن باشد که فکر می‌کنید."),
)

Q(5050, "7.13", above("""
THE SCENE: a two-way road seen from above, one lane in each direction, a broken centre line; a side road joins from the RIGHT in the
middle of the picture.
VEHICLES (colour code used strictly): a RED car (ours) coming up in our lane, its RIGHT indicator flashing, with a SOLID GREEN arrow
showing the correct path close to the right edge and a small, tight right turn into the right-hand side of the side road. A DASHED
ORANGE arrow shows a wrong path that first swings out towards the centre line and then makes a wide turn.
MUST NOT APPEAR: other vehicles, signs, text."""),
  "Du vil svinge til højre ind på sidevejen. Hvordan kører du?",
  "You want to turn right into the side road. How do you drive?",
  "می‌خواهید به راست وارد فرعی شوید. چطور می‌رانید؟",
  S(True, "Jeg holder så tæt ind til højre kant som muligt og gør svinget lille.", "I keep as close to the right edge as possible and make the turn small.",
    "تا جای ممکن نزدیک لبه‌ی راست می‌مانم و گردش را کوچک می‌گیرم.",
    "Ved højresving skal du holde nær højre kant og svinge så lidt som muligt.", "When turning right you keep near the right edge and turn as tightly as possible.", "در گردش به راست باید نزدیک لبه‌ی راست بمانید و تا جای ممکن کوچک بپیچید."),
  S(False, "Jeg trækker først ud mod midten for at få et bredere sving.", "I first pull out towards the middle to get a wider turn.", "اول به سمت وسط می‌روم تا گردش بازتری داشته باشم.",
    "Så kan en bagfra eller en cyklist komme ind i højre side af dig.", "Then someone from behind or a cyclist may come up on your right.", "این‌طور ممکن است کسی از پشت یا دوچرخه‌سواری از سمت راستتان بیاید."),
  S(False, "Jeg holder farten i svinget, så jeg ikke generer trafikken bag mig.", "I keep my speed in the turn so that I do not hold up the traffic behind me.",
    "سرعتم را در پیچ حفظ می‌کنم تا مزاحم ترافیک پشت سرم نشوم.",
    "Ved sving skal farten ned, så du kan svinge sikkert og se efter cyklister og gående.", "When turning your speed must come down so that you can turn safely and look for cyclists and pedestrians.",
    "هنگام پیچیدن باید سرعت را کم کنید تا ایمن بپیچید و دوچرخه‌سواران و عابران را ببینید."),
  S(False, "Jeg svinger ind i venstre side af sidevejen for ikke at ramme kantstenen.", "I turn into the left side of the side road so as not to hit the kerb.",
    "به سمت چپ فرعی می‌پیچم تا به جدول نخورم.",
    "Du skal ende i højre side af den vej, du kører ind på.", "You must end up on the right side of the road you enter.", "باید در سمت راستِ جاده‌ای که واردش می‌شوید قرار بگیرید."),
)
