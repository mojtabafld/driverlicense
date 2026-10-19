# «آزمون جدید», batch 2 (5101–5200), part b: stopping and parking (7.18), overtaking (7.9), signs (6.1), passing
# pedestrians and stationary vehicles (7.6), straight on at junctions (7.12), meeting (7.7), other road users (4.5).
# Rules: Færdselsloven §§ 3, 20–23, 26–29, 32, 33, 41; Bekendtgørelse om vejafmærkning (A, C and D signs, light signals).
from nq import Q, S, above, picture, town, view

Q(5126, "7.18", town("""
THE SCENE: a town street, one lane in each direction. On the right pavement at the kerb stands a round sign with a blue centre, a red
border and ONE red diagonal bar from top left to bottom right (the Danish no-parking sign), with no plate under it. The kerb ahead on
the right is free; a friend waits on the pavement a little ahead.
MUST BE CLEARLY VISIBLE: the no-parking sign with its single red bar, the free kerb, the waiting person.
MUST NOT APPEAR: other signs, yellow lines, text."""),
  "Du kører forbi denne tavle og vil sætte en passager af lidt længere fremme. Hvad gælder?",
  "You pass this sign and want to let a passenger out a little further on. What applies?",
  "از کنار این تابلو رد می‌شوید و می‌خواهید کمی جلوتر مسافری را پیاده کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må godt standse kort for at lade passageren stige ud.", "I may stop briefly to let the passenger get out.", "می‌توانم کوتاه بایستم تا مسافر پیاده شود.",
    "Tavlen (C 62) forbyder parkering, ikke en kort standsning for at lade passagerer stige af.", "The sign (C 62) forbids parking, not a short stop to let passengers off.",
    "این تابلو (C 62) پارک را ممنوع می‌کند، نه توقف کوتاه برای پیاده کردن مسافر."),
  S(True, "Jeg må ikke parkere i denne side af vejen.", "I must not park on this side of the road.", "در این سمت جاده نباید پارک کنم.",
    "Forbuddet gælder i den vejside, hvor tavlen står.", "The ban applies on the side of the road where the sign stands.", "این ممنوعیت در همان سمتی از جاده است که تابلو نصب شده."),
  S(True, "Forbuddet gælder frem til næste vejkryds, når der ikke er andre tavler.", "The ban applies up to the next junction when there are no other signs.",
    "وقتی تابلوی دیگری نباشد، این ممنوعیت تا تقاطع بعدی برقرار است.",
    "Parkeringsforbuddet gælder i færdselsretningen frem til næste kryds.", "The parking ban applies in the direction of travel up to the next junction.", "ممنوعیت پارک در جهت حرکت تا تقاطع بعدی برقرار است."),
  S(False, "Tavlen forbyder også en kort standsning for at sætte en passager af.", "The sign also forbids a short stop to let a passenger out.",
    "این تابلو توقف کوتاه برای پیاده کردن مسافر را هم ممنوع می‌کند.",
    "Det er tavlen med det røde kryds (C 61), der forbyder standsning.", "It is the sign with the red cross (C 61) that forbids stopping.", "تابلوی ضربدر قرمز (C 61) است که توقف را ممنوع می‌کند."),
)

Q(5127, "7.18", above("""
THE SCENE: a T-junction in town seen from above: our street runs up the picture; a side street joins from the RIGHT. Parked cars line
the right kerb of our street before the junction. Just AFTER the junction, on the right, there is a free space at the kerb starting
only about 5 m past the side street's edge.
VEHICLES (colour code used strictly): a RED car (ours) in our street just before the junction, its right indicator off, a DASHED
ORANGE arrow showing it going into the free space just after the junction.
MUST NOT APPEAR: signs, text."""),
  "Du vil parkere på pladsen lige efter krydset, omkring 5 m efter den tværgående vej. Hvad gælder?",
  "You want to park in the space just after the junction, about 5 m past the crossing road. What applies?",
  "می‌خواهید در جای خالی درست بعد از تقاطع، حدود ۵ متر بعد از جاده‌ی متقاطع، پارک کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Det er forbudt, fordi forbuddet gælder inden for 10 m fra den tværgående kørebanes kant, også efter krydset.",
    "It is forbidden, because the ban applies within 10 m of the edge of the crossing carriageway, also after the junction.",
    "ممنوع است، چون این ممنوعیت تا ۱۰ متری لبه‌ی سواره‌روی متقاطع است، بعد از تقاطع هم.",
    "Standsning og parkering er forbudt i vejkryds og inden for 10 m fra den tværgående kørebanes nærmeste kant.",
    "Stopping and parking are forbidden in a junction and within 10 m of the nearest edge of the crossing carriageway.",
    "توقف و پارک در تقاطع و تا ۱۰ متری نزدیک‌ترین لبه‌ی سواره‌روی متقاطع ممنوع است."),
  S(False, "Forbuddet gælder kun før krydset.", "The ban only applies before the junction.", "این ممنوعیت فقط پیش از تقاطع است.",
    "Afstanden regnes fra den tværgående kørebane, så den gælder på begge sider af den.", "The distance is counted from the crossing carriageway, so it applies on both sides of it.",
    "فاصله از سواره‌روی متقاطع حساب می‌شود، پس در هر دو طرف آن برقرار است."),
  S(False, "Det er tilladt, fordi jeg holder i højre side.", "It is allowed because I am standing on the right-hand side.", "مجاز است، چون در سمت راست می‌ایستم.",
    "Den rigtige side gør ikke afstanden til krydset lovlig.", "The right side does not make the distance to the junction legal.", "سمت درست، فاصله‌ی کم از تقاطع را مجاز نمی‌کند."),
  S(True, "Holdende biler tæt ved krydset kan tage oversigten fra dem, der svinger.", "Cars standing close to the junction can block the view of those turning.",
    "خودروهای ایستاده نزدیک تقاطع می‌توانند دید کسانی را که می‌پیچند بگیرند.",
    "Derfor skal der være fri oversigt omkring krydset.", "That is why there must be a clear view around the junction.", "به همین دلیل اطراف تقاطع باید دید آزاد باشد."),
)

Q(5128, "7.18", view("""
THE SCENE: a fairly narrow two-way road with an unbroken white centre line (a barrier line). At the right edge of our lane there is a
little free space, but the lane is so narrow that a car standing there would be only about 2 m from the barrier line.
MUST BE CLEARLY VISIBLE: the narrow lane, the barrier line, the free space at the edge.
MUST NOT APPEAR: other vehicles, signs, text."""),
  "Du vil standse ved kanten af en smal vej. Mellem bilen og spærrelinjen midt på vejen vil der kun være 2 m. Hvad gælder?",
  "You want to stop at the edge of a narrow road. Between the car and the barrier line in the middle of the road there will only be 2 m. What applies?",
  "می‌خواهید کنار یک جاده‌ی باریک بایستید. بین خودرو و خط ممتد وسط جاده فقط ۲ متر فاصله خواهد بود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke standse her, fordi afstanden til spærrelinjen er under 3 m.", "I must not stop here because the distance to the barrier line is under 3 m.",
    "نباید این‌جا بایستم، چون فاصله تا خط ممتد کمتر از ۳ متر است.",
    "Standsning og parkering er forbudt ved siden af en spærrelinje, hvis afstanden mellem køretøjet og linjen er mindre end 3 m.",
    "Stopping and parking are forbidden beside a barrier line if the distance between the vehicle and the line is less than 3 m.",
    "توقف و پارک کنار خط ممتد، اگر فاصله‌ی خودرو تا خط کمتر از ۳ متر باشد، ممنوع است."),
  S(False, "Det er tilladt, hvis jeg tænder havariblinket.", "It is allowed if I switch on the hazard lights.", "اگر چراغ خطر را روشن کنم، مجاز است.",
    "Havariblinket ændrer ikke på forbuddet.", "The hazard lights do not change the ban.", "چراغ خطر ممنوعیت را تغییر نمی‌دهد."),
  S(False, "Reglen gælder kun for lastbiler.", "The rule only applies to lorries.", "این قاعده فقط برای کامیون‌هاست.",
    "Reglen gælder alle køretøjer.", "The rule applies to all vehicles.", "این قاعده برای همه‌ی وسایل است."),
)

Q(5129, "7.18", above("""
THE SCENE: a small car park seen from above with marked bays. A GREY car is parked in a bay; in front of it there is a driving lane.
VEHICLES (colour code used strictly): a RED car (ours) about to stop across the driving lane right in front of the grey car, so that
the grey car could not drive out; a DASHED ORANGE arrow shows this.
MUST NOT APPEAR: signs, people, text."""),
  "Du vil parkere, så du kommer til at holde lige foran en anden bil, der så ikke kan køre ud. Hvad gælder?",
  "You want to park so that you will stand right in front of another car, which then cannot drive out. What applies?",
  "می‌خواهید طوری پارک کنید که درست جلوی خودروی دیگری قرار بگیرید و آن خودرو نتواند بیرون برود. چه قاعده‌ای برقرار است؟",
  S(True, "Det er forbudt at parkere, så en anden bil ikke kan komme ud.", "It is forbidden to park so that another car cannot get out.", "پارکی که خودروی دیگری را گیر بیندازد ممنوع است.",
    "Parkering må ikke ske, så adgangen til et andet køretøj hindres, eller det ikke kan køre væk.",
    "Parking must not block access to another vehicle or stop it from being driven away.",
    "پارک نباید راه دسترسی به وسیله‌ی دیگر را ببندد یا مانع حرکتش شود."),
  S(False, "Det er tilladt, når jeg kun er væk i kort tid.", "It is allowed when I am only gone for a short while.", "اگر فقط مدت کوتاهی دور باشم، مجاز است.",
    "Også kort tid kan forhindre den anden i at køre.", "Even a short while can stop the other driver from leaving.", "حتی مدت کوتاه هم می‌تواند مانع رفتن دیگری شود."),
  S(False, "Det er den andens problem, når jeg holder ved kanten.", "It is the other driver's problem as long as I stand at the edge.", "اگر کنار لبه بایستم، مشکل خود اوست.",
    "Forbuddet gælder, uanset hvor du holder.", "The ban applies wherever you stand.", "این ممنوعیت هر جا بایستید برقرار است."),
)

Q(5130, "7.18", town("""
THE SCENE: a town street. A RED car is parked at the right kerb with its boot open; a man stands behind the car lifting heavy boxes out
of the boot towards a shop door on the pavement. Traffic passes in our lane to the left of the parked car. The car's driver's door is
also open towards the traffic.
MUST BE CLEARLY VISIBLE: the parked car with open boot and open driver's door, the man unloading, the passing traffic.
MUST NOT APPEAR: signs, text."""),
  "Du holder ved kantstenen og skal læsse tunge kasser ud. Hvordan forholder du dig?",
  "You are standing at the kerb and need to unload heavy boxes. What do you do?",
  "کنار جدول ایستاده‌اید و باید جعبه‌های سنگینی را خالی کنید. چه می‌کنید؟",
  S(True, "Jeg læsser ud, så der ikke opstår fare eller unødig ulempe for andre.", "I unload so that there is no danger or undue inconvenience to others.",
    "طوری بار را خالی می‌کنم که برای دیگران خطر یا مزاحمت بی‌جا پیش نیاید.",
    "Åbning af døre og af- og pålæsning skal ske, så der ikke opstår fare eller unødig ulempe.", "Opening doors and loading and unloading must not cause danger or undue inconvenience.",
    "باز کردن در و بار زدن یا خالی کردن نباید خطر یا مزاحمت بی‌جا ایجاد کند."),
  S(True, "Jeg holder øje med trafikken, mens jeg står ved bilen.", "I keep an eye on the traffic while I am standing by the car.", "وقتی کنار خودرو ایستاده‌ام، مراقب ترافیک هستم.",
    "Bilister og cyklister kører tæt forbi bilen.", "Drivers and cyclists pass close to the car.", "رانندگان و دوچرخه‌سواران از نزدیک خودرو رد می‌شوند."),
  S(False, "Jeg må stille kasserne på kørebanen, mens jeg bærer dem ind.", "I may put the boxes on the carriageway while I carry them in.", "می‌توانم جعبه‌ها را تا بردنشان روی سواره‌رو بگذارم.",
    "Kasser på kørebanen er en fare for trafikken.", "Boxes on the carriageway are a danger to traffic.", "جعبه روی سواره‌رو برای ترافیک خطرناک است."),
  S(False, "Jeg må lade førerdøren stå åben ud mod kørebanen, mens jeg læsser.", "I may leave the driver's door open towards the carriageway while I unload.",
    "می‌توانم در راننده را رو به سواره‌رو باز بگذارم تا بار را خالی کنم.",
    "En åben dør ud mod trafikken kan blive ramt og skabe fare.", "An open door towards the traffic can be hit and cause danger.", "در باز رو به ترافیک ممکن است ضربه بخورد و خطر ایجاد کند."),
)

Q(5131, "7.9", town("""
THE SCENE: a junction in town controlled by traffic lights; our light shows GREEN. Our road has TWO lanes in our direction (a broken
lane line between them). In the right lane, just before the junction, a slow white delivery van drives straight on; our lane (the
left one) is free. On the crossing road the cars wait at their red lights; a pedestrian waits at a crossing at the far side.
MUST BE CLEARLY VISIBLE: our green light, the two lanes, the slow van in the right lane, the waiting crossing traffic.
MUST NOT APPEAR: text."""),
  "Du har grønt lys og kører i venstre af to vognbaner. Den langsomme varevogn i højre vognbane skal også ligeud. Hvad gælder for overhaling i krydset?",
  "You have a green light and are in the left of two lanes. The slow van in the right lane is also going straight on. What applies to overtaking at the junction?",
  "چراغ شما سبز است و در خط چپ از دو خط می‌رانید. ون آهسته در خط راست هم مستقیم می‌رود. درباره‌ی سبقت در تقاطع چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må overhale i krydset, fordi færdslen reguleres af lyssignal, hvis det kan ske uden fare.",
    "I may overtake at the junction because the traffic is controlled by traffic lights, if it can be done safely.",
    "می‌توانم در تقاطع سبقت بگیرم، چون ترافیک با چراغ کنترل می‌شود، به شرط آن‌که بی‌خطر باشد.",
    "Forbuddet mod overhaling i kryds gælder ikke, hvor færdslen reguleres af lyssignal eller politi.",
    "The ban on overtaking at junctions does not apply where traffic is controlled by traffic lights or police.",
    "ممنوعیت سبقت در تقاطع، جایی که ترافیک با چراغ یا پلیس کنترل می‌شود، اعمال نمی‌شود."),
  S(False, "Det er altid forbudt at overhale i et kryds.", "Overtaking at a junction is always forbidden.", "سبقت در تقاطع همیشه ممنوع است.",
    "Der er undtagelser, fx i kryds med lyssignal.", "There are exceptions, for example at junctions with traffic lights.", "استثناهایی هست، مثلاً تقاطع چراغ‌دار."),
  S(True, "Jeg holder øje med fodgængere og cyklister, der kan krydse.", "I watch out for pedestrians and cyclists who may cross.", "مراقب عابران و دوچرخه‌سوارانی هستم که ممکن است رد شوند.",
    "Også med grønt lys skal du være opmærksom i krydset.", "Even with a green light you must be attentive at the junction.", "حتی با چراغ سبز هم باید در تقاطع حواستان جمع باشد."),
  S(False, "Jeg må overhale, selv om mit lys skifter til gult lige før krydset.", "I may overtake even if my light changes to yellow just before the junction.",
    "حتی اگر چراغم درست پیش از تقاطع زرد شود، می‌توانم سبقت بگیرم.",
    "Gult lys betyder stop, medmindre du er så tæt på, at en standsning vil skabe fare.", "Yellow means stop, unless you are so close that stopping would be dangerous.",
    "چراغ زرد یعنی ایست، مگر آن‌قدر نزدیک باشید که ایستادن خطرناک باشد."),
)

Q(5132, "7.9", view("""
THE SCENE: a two-way country road with a broken centre line, bending to the right around a high hedge so that the road beyond the bend
cannot be seen. About 30 m ahead in our lane drives a slow lorry; its RIGHT indicator flashes briefly as if the driver were waving us
past.
MUST BE CLEARLY VISIBLE: the blind bend hidden by the hedge, the lorry ahead with its right indicator lit.
MUST NOT APPEAR: oncoming traffic, signs, text."""),
  "Vejen svinger, og du kan ikke se, om der kommer modkørende. Lastbilen foran dig blinker til højre. Hvad gælder?",
  "The road bends, and you cannot see whether anything is coming. The lorry in front of you is indicating right. What applies?",
  "جاده می‌پیچد و نمی‌بینید خودرویی از روبه‌رو می‌آید یا نه. کامیون جلوی شما راهنمای راست زده است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke overhale ved det uoverskuelige sving.", "I must not overtake at the blind bend.", "در این پیچ بی‌دید نباید سبقت بگیرم.",
    "Overhaling er forbudt, hvor oversigten er begrænset, fx i uoverskuelige sving.", "Overtaking is forbidden where the view is limited, for example in blind bends.",
    "سبقت جایی که دید محدود است، مثلاً در پیچ بی‌دید، ممنوع است."),
  S(False, "Jeg må overhale, fordi lastbilchaufføren viser, at vejen er fri.", "I may overtake because the lorry driver is showing that the road is clear.",
    "می‌توانم سبقت بگیرم، چون راننده‌ی کامیون نشان می‌دهد راه باز است.",
    "Du skal selv sikre dig, at overhalingen kan ske uden fare; et blink er ikke en garanti.", "You must make sure yourself that the overtaking is safe; an indicator is no guarantee.",
    "خودتان باید مطمئن شوید سبقت بی‌خطر است؛ چراغ راهنما تضمین نیست."),
  S(False, "Jeg må overhale, hvis jeg tænder fjernlyset først.", "I may overtake if I switch on the high beam first.", "اگر اول نور بالا را روشن کنم، می‌توانم سبقت بگیرم.",
    "Lyset ændrer ikke på, at du ikke kan se de modkørende.", "The lights do not change the fact that you cannot see oncoming traffic.", "چراغ این واقعیت را تغییر نمی‌دهد که ترافیک روبه‌رو را نمی‌بینید."),
)

Q(5133, "7.9", view("""
THE SCENE: a straight two-way country road with a broken centre line and a round speed-limit sign showing 80 on the right verge. About
20 m ahead of us drives a grey car at only slightly lower speed than ours. The oncoming lane is empty for a long way.
MUST BE CLEARLY VISIBLE: the 80 sign, the car just ahead, the empty oncoming lane.
MUST NOT APPEAR: other signs, text."""),
  "Bilen foran dig kører 75 km/t, og grænsen er 80 km/t. Du overvejer at overhale. Hvad gælder?",
  "The car in front of you is doing 75 km/h, and the limit is 80 km/h. You are thinking of overtaking. What applies?",
  "خودروی جلو ۷۵ کیلومتر بر ساعت می‌رود و حد سرعت ۸۰ است. به سبقت فکر می‌کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre hurtigere end 80 km/t under overhalingen.", "I must not drive faster than 80 km/h during the overtaking.", "هنگام سبقت نباید تندتر از ۸۰ کیلومتر بر ساعت برانم.",
    "Hastighedsgrænsen gælder også, mens du overhaler.", "The speed limit also applies while you are overtaking.", "حد سرعت هنگام سبقت هم برقرار است."),
  S(True, "Overhalingen vil tage lang tid, fordi forskellen i fart er lille.", "The overtaking will take a long time because the difference in speed is small.",
    "سبقت طول می‌کشد، چون اختلاف سرعت کم است.",
    "Jo mindre forskel, jo længere er du i den modkørende vognbane.", "The smaller the difference, the longer you are in the oncoming lane.", "هر چه اختلاف کمتر باشد، مدت بیشتری در خط مقابل می‌مانید."),
  S(False, "Det er tilladt at køre hurtigere end grænsen, når jeg overhaler.", "It is allowed to drive faster than the limit when I overtake.", "هنگام سبقت مجازم از حد سرعت تندتر بروم.",
    "Der er ingen undtagelse fra hastighedsgrænsen ved overhaling.", "There is no exception from the speed limit for overtaking.", "برای سبقت استثنایی از حد سرعت وجود ندارد."),
  S(True, "Det kan være bedre at blive bag bilen.", "It may be better to stay behind the car.", "شاید بهتر باشد پشت آن خودرو بمانم.",
    "En lang overhaling med lille fartforskel giver meget lidt og øger risikoen.", "A long overtaking with little difference in speed gains very little and increases the risk.",
    "سبقت طولانی با اختلاف سرعت کم سود کمی دارد و خطر را بیشتر می‌کند."),
)

Q(5134, "7.9", view("""
THE SCENE: a two-way country road with a broken centre line. In the left door mirror (at the left edge of the picture) a dark car is
visible alongside the rear of our car in the oncoming lane, overtaking us. Far ahead in the oncoming lane a lorry has appeared and comes
towards us.
MUST BE CLEARLY VISIBLE: the overtaking car in the door mirror, the oncoming lorry ahead.
MUST NOT APPEAR: signs, text."""),
  "En bil er i gang med at overhale dig, og der kommer en lastbil imod den. Hvordan forholder du dig?",
  "A car is overtaking you, and a lorry is coming towards it. What do you do?",
  "خودرویی در حال سبقت از شماست و کامیونی از روبه‌رو به سمتش می‌آید. چه می‌کنید؟",
  S(True, "Jeg sænker farten, så den overhalende hurtigt kan komme ind foran mig.", "I slow down so that the overtaking car can quickly pull in in front of me.",
    "سرعتم را کم می‌کنم تا سبقت‌گیرنده زود جلوی من برگردد.",
    "Du kan hjælpe med at undgå en farlig situation ved at give plads.", "You can help avoid a dangerous situation by making room.", "با جا دادن می‌توانید از یک موقعیت خطرناک جلوگیری کنید."),
  S(True, "Jeg holder så langt til højre som muligt.", "I keep as far to the right as possible.", "تا جای ممکن سمت راست می‌مانم.",
    "Den, der bliver overhalet, skal holde så langt til højre som muligt.", "The driver being overtaken must keep as far to the right as possible.", "کسی که از او سبقت می‌گیرند باید تا جای ممکن سمت راست بماند."),
  S(False, "Jeg øger farten, så den overhalende må opgive og trække ind bag mig.", "I speed up so that the overtaking car has to give up and pull in behind me.",
    "سرعتم را زیاد می‌کنم تا سبقت‌گیرنده منصرف شود و پشت سرم برگردد.",
    "Den, der bliver overhalet, må ikke øge hastigheden.", "The driver being overtaken must not increase speed.", "کسی که از او سبقت می‌گیرند نباید سرعتش را زیاد کند."),
  S(True, "Jeg er klar til at bremse, hvis det bliver nødvendigt.", "I am ready to brake if it becomes necessary.", "اگر لازم شد، آماده‌ی ترمز هستم.",
    "Situationen kan ændre sig hurtigt.", "The situation can change quickly.", "این موقعیت ممکن است سریع تغییر کند."),
)

Q(5135, "7.9", town("""
THE SCENE: a town street in slow, queuing traffic; we stand still in a queue of cars. In the right door mirror (at the right edge of
the picture) a cyclist is visible coming up along the right side of our car between the cars and the kerb. Ahead on the right a side
street joins.
MUST BE CLEARLY VISIBLE: the queue, the cyclist in the right door mirror, the side street on the right.
MUST NOT APPEAR: a cycle path, signs, text."""),
  "Du holder i kø. En cyklist kører op langs højre side af din bil. Hvad gælder?",
  "You are standing in a queue. A cyclist is riding up along the right side of your car. What applies?",
  "در صف ایستاده‌اید. دوچرخه‌سواری از سمت راست خودرو جلو می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Cyklister må overhale biler i højre side.", "Cyclists may overtake cars on the right.", "دوچرخه‌سواران می‌توانند از سمت راست از خودروها سبقت بگیرند.",
    "Cyklister og førere af lille knallert kan overhale andre køretøjer til højre.", "Cyclists and riders of small mopeds may overtake other vehicles on the right.",
    "دوچرخه‌سواران و موپدسواران کوچک می‌توانند از سمت راست از وسایل دیگر سبقت بگیرند."),
  S(True, "Jeg ser efter cyklister i højre side, før jeg svinger til højre.", "I look for cyclists on the right before I turn right.", "پیش از گردش به راست، دوچرخه‌سواران سمت راست را نگاه می‌کنم.",
    "En cyklist kan være i din blinde vinkel i højre side.", "A cyclist may be in your blind spot on the right.", "دوچرخه‌سوار ممکن است در نقطه‌ی کور سمت راستتان باشد."),
  S(False, "Cyklisten gør noget ulovligt.", "The cyclist is doing something illegal.", "دوچرخه‌سوار کار غیرقانونی می‌کند.",
    "Cyklister må gerne overhale biler i højre side.", "Cyclists may well overtake cars on the right.", "دوچرخه‌سواران اجازه دارند از سمت راست از خودروها سبقت بگیرند."),
  S(False, "Jeg kører tæt ind mod kantstenen, så cyklisten ikke kan komme forbi.", "I move close to the kerb so that the cyclist cannot get past.",
    "به جدول نزدیک می‌شوم تا دوچرخه‌سوار نتواند رد شود.",
    "Du må ikke spærre for cyklisten; det kan skabe fare.", "You must not block the cyclist; it can be dangerous.", "نباید راه دوچرخه‌سوار را ببندید؛ ممکن است خطرناک باشد."),
)

Q(5136, "6.1", view("""
THE SCENE: a two-way country road near a village. On the right verge a triangular warning sign (white with a red border, point up)
showing a black bicycle. About 200 m ahead a cycle path crosses the road; two cyclists approach it from the left.
MUST BE CLEARLY VISIBLE: the cyclist warning sign, the cycle path crossing ahead, the cyclists.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle. Hvad betyder den, og hvordan forholder du dig?",
  "You pass this sign. What does it mean, and what do you do?",
  "از کنار این تابلو رد می‌شوید. یعنی چه و چه می‌کنید؟",
  S(True, "Der er særlig fare, fordi cyklister kan køre ind på eller over kørebanen.", "There is a special danger because cyclists may ride onto or across the carriageway.",
    "خطر ویژه‌ای هست، چون ممکن است دوچرخه‌سواران وارد سواره‌رو شوند یا از عرض آن رد شوند.",
    "Tavlen (A 21) advarer om steder, hvor cyklister og førere af lille knallert kører ind på eller over kørebanen.",
    "The sign (A 21) warns of places where cyclists and riders of small mopeds ride onto or across the carriageway.",
    "این تابلو (A 21) درباره‌ی جاهایی هشدار می‌دهد که دوچرخه‌سواران و موپدسواران کوچک وارد سواره‌رو می‌شوند یا از آن رد می‌شوند."),
  S(True, "Jeg sænker farten og holder øje med cyklisterne.", "I slow down and watch the cyclists.", "سرعتم را کم می‌کنم و مراقب دوچرخه‌سواران هستم.",
    "Ved en advarselstavle skal du være klar til at reagere.", "At a warning sign you must be ready to react.", "کنار تابلوی هشدار باید آماده‌ی واکنش باشید."),
  S(False, "Tavlen betyder, at cyklisterne skal holde tilbage for mig.", "The sign means that the cyclists must give way to me.", "این تابلو یعنی دوچرخه‌سواران باید به من راه بدهند.",
    "En advarselstavle siger ikke noget om vigepligt.", "A warning sign says nothing about who gives way.", "تابلوی هشدار چیزی درباره‌ی حق تقدم نمی‌گوید."),
  S(False, "Tavlen betyder, at der er cykelsti langs hele vejen.", "The sign means that there is a cycle path all along the road.", "این تابلو یعنی در تمام طول جاده مسیر دوچرخه هست.",
    "Det er en advarsel om en særlig fare, ikke en oplysning om cykelsti.", "It is a warning of a special danger, not information about a cycle path.", "این هشدار خطر ویژه است، نه اطلاع درباره‌ی مسیر دوچرخه."),
)

Q(5137, "6.1", view("""
THE SCENE: a two-way country road through a forest at dusk. On the right verge a triangular warning sign (white with a red border,
point up) showing a black leaping deer. Dense trees on both sides close to the road; the light is fading.
MUST BE CLEARLY VISIBLE: the deer warning sign, the forest close to the road.
MUST NOT APPEAR: animals, other signs, text.""", cond="dusk, fading light, dry road"),
  "Du kører forbi denne tavle i skumringen. Hvordan forholder du dig?",
  "You pass this sign at dusk. What do you do?",
  "هنگام غروب از کنار این تابلو رد می‌شوید. چه می‌کنید؟",
  S(True, "Jeg regner med, at der pludselig kan komme dyr ud på vejen.", "I expect that animals may suddenly come out onto the road.", "انتظار دارم ناگهان حیوانی وارد جاده شود.",
    "Tavlen (A 26) advarer om vildt; i skumringen er dyrene særligt aktive.", "The sign (A 26) warns of wild animals; at dusk they are especially active.",
    "این تابلو (A 26) درباره‌ی حیوانات وحشی هشدار می‌دهد؛ هنگام غروب این حیوانات فعال‌ترند."),
  S(True, "Kommer der ét dyr over vejen, kan der komme flere.", "If one animal crosses the road, more may follow.", "اگر یک حیوان از جاده رد شود، ممکن است بقیه هم بیایند.",
    "Hjorte og rådyr går ofte i flok.", "Deer often move in groups.", "آهوها و گوزن‌ها اغلب گروهی حرکت می‌کنند."),
  S(True, "Jeg sænker farten og er klar til at bremse.", "I slow down and am ready to brake.", "سرعتم را کم می‌کنم و آماده‌ی ترمز هستم.",
    "Med lavere fart kan du nå at standse, hvis et dyr springer frem.", "At a lower speed you can stop in time if an animal jumps out.", "با سرعت کمتر، اگر حیوانی بیرون بپرد، به موقع می‌ایستید."),
  S(False, "Tavlen gælder kun om dagen.", "The sign only applies in the daytime.", "این تابلو فقط روزها معتبر است.",
    "Tavlen gælder hele døgnet, og faren er ofte størst i skumring og mørke.", "The sign applies day and night, and the danger is often greatest at dusk and in the dark.",
    "این تابلو در تمام شبانه‌روز معتبر است و خطر اغلب در غروب و تاریکی بیشتر است."),
)

Q(5138, "6.1", view("""
THE SCENE: a wide road outside town with two lanes in our direction. On the right verge stands a round BLUE sign with the white number
50 (the Danish minimum-speed sign). A cyclist rides on a cycle path beside the road.
MUST BE CLEARLY VISIBLE: the blue round sign with 50, the cyclist on the cycle path.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle. Hvad betyder den?",
  "You pass this sign. What does it mean?",
  "از کنار این تابلو رد می‌شوید. یعنی چه؟",
  S(True, "Tavlen angiver en mindste hastighed for strækningen.", "The sign gives a minimum speed for the stretch.", "این تابلو حداقل سرعت این مسیر را نشان می‌دهد.",
    "Den blå runde tavle med et tal (D 55) er et påbud om mindste hastighed.", "The round blue sign with a number (D 55) is an order to keep a minimum speed.",
    "تابلوی گرد آبی با عدد (D 55) دستور حداقل سرعت است."),
  S(True, "Påbuddet gælder ikke cyklister og førere af lille knallert.", "The order does not apply to cyclists and riders of small mopeds.", "این دستور برای دوچرخه‌سواران و موپدسواران کوچک نیست.",
    "Mindste hastighed gælder kørende bortset fra cyklister og førere af lille knallert.", "The minimum speed applies to drivers other than cyclists and riders of small mopeds.",
    "حداقل سرعت برای همه به‌جز دوچرخه‌سواران و موپدسواران کوچک است."),
  S(False, "Tavlen angiver den højst tilladte hastighed.", "The sign gives the highest permitted speed.", "این تابلو حداکثر سرعت مجاز را نشان می‌دهد.",
    "Den højst tilladte hastighed vises på en hvid tavle med rød kant.", "The highest permitted speed is shown on a white sign with a red border.", "حداکثر سرعت روی تابلوی سفید با حاشیه‌ی قرمز نشان داده می‌شود."),
  S(False, "Påbuddet ophører ved næste kryds.", "The order ends at the next junction.", "این دستور در تقاطع بعدی تمام می‌شود.",
    "Det gælder, indtil det ophæves af tavlen for ophør af mindste hastighed eller en afstand på en undertavle.",
    "It applies until it is lifted by the end-of-minimum-speed sign or a distance on a plate.",
    "تا وقتی تابلوی پایان حداقل سرعت یا فاصله‌ی روی تابلوی زیرین آن را لغو کند، برقرار است."),
)

Q(5139, "6.1", view("""
THE SCENE: a road leading under a low railway viaduct. Before the viaduct on the right stands a round white sign with a red border
showing «3,5 m» in black between two black triangles, one pointing down from the top and one pointing up from the bottom (the
Danish height-limit sign).
MUST BE CLEARLY VISIBLE: the height-limit sign with 3,5 m, the low viaduct.
MUST NOT APPEAR: other signs, other text."""),
  "Du kører en varevogn med last på taget; den samlede højde er 3,7 m. Foran viadukten står denne tavle. Hvad gælder?",
  "You are driving a van with a load on the roof; the total height is 3.7 m. This sign stands before the viaduct. What applies?",
  "با یک ون که روی سقفش بار دارد می‌رانید؛ ارتفاع کل ۳٫۷ متر است. پیش از پل این تابلو هست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre under viadukten, fordi højden med last er over 3,5 m.", "I must not drive under the viaduct because the height with the load is over 3.5 m.",
    "نباید از زیر پل رد شوم، چون ارتفاع با بار بیش از ۳٫۵ متر است.",
    "Tavlen (C 42) forbyder kørsel med køretøjer, hvis højde inklusive læs er større end den angivne.",
    "The sign (C 42) forbids driving with vehicles whose height including the load is greater than the one shown.",
    "این تابلو (C 42) عبور وسایلی را که ارتفاعشان با بار بیش از عدد نشان‌داده است، ممنوع می‌کند."),
  S(False, "Tavlen gælder kun bilens egen højde uden last.", "The sign only applies to the car's own height without the load.", "این تابلو فقط برای ارتفاع خود خودرو بدون بار است.",
    "Højden regnes inklusive læs.", "The height is counted including the load.", "ارتفاع با احتساب بار حساب می‌شود."),
  S(False, "Jeg må køre igennem, hvis jeg kører meget langsomt.", "I may drive through if I go very slowly.", "اگر خیلی آهسته بروم، می‌توانم رد شوم.",
    "Lav fart gør ikke køretøjet lavere.", "Low speed does not make the vehicle lower.", "سرعت کم وسیله را کوتاه‌تر نمی‌کند."),
  S(False, "Tavlen gælder kun for lastbiler.", "The sign only applies to lorries.", "این تابلو فقط برای کامیون‌هاست.",
    "Tavlen gælder alle køretøjer, der er højere end angivet.", "The sign applies to every vehicle that is higher than shown.", "این تابلو برای هر وسیله‌ای است که بلندتر از عدد نشان‌داده باشد."),
)

Q(5140, "7.6", town("""
THE SCENE: a quiet town street, one lane in each direction, no pedestrian crossing nearby. About 25 m ahead an elderly man with a
walking stick has stepped off the right kerb and is slowly crossing the road in front of us, halfway into our lane.
MUST BE CLEARLY VISIBLE: the elderly man crossing slowly with his stick.
MUST NOT APPEAR: a pedestrian crossing, signs, text."""),
  "En ældre mand går langsomt over vejen et stykke fra et fodgængerfelt. Hvordan forholder du dig?",
  "An elderly man is slowly crossing the road some way from a pedestrian crossing. What do you do?",
  "مرد مسنی دور از گذرگاه عابر آهسته از عرض خیابان رد می‌شود. چه می‌کنید؟",
  S(True, "Jeg sænker farten og lader ham komme over.", "I slow down and let him get across.", "سرعتم را کم می‌کنم و می‌گذارم رد شود.",
    "Du skal vise særligt hensyn over for ældre og give gående tid og plads.", "You must show special consideration for the elderly and give pedestrians time and room.",
    "باید به سالمندان ملاحظه‌ی ویژه نشان دهید و به عابران وقت و جا بدهید."),
  S(True, "Ældre kan have svært ved at bedømme bilernes fart.", "Elderly people may find it hard to judge the speed of cars.", "سالمندان ممکن است سرعت خودروها را به‌سختی بسنجند.",
    "De kan også bevæge sig langsommere end ventet.", "They may also move more slowly than expected.", "ممکن است آهسته‌تر از انتظار هم حرکت کنند."),
  S(False, "Han skal vente, fordi han ikke går i et fodgængerfelt.", "He has to wait because he is not on a pedestrian crossing.", "او باید صبر کند، چون از گذرگاه عابر رد نمی‌شود.",
    "Også uden for et fodgængerfelt skal du undgå at bringe gående i fare.", "Even outside a pedestrian crossing you must avoid putting pedestrians in danger.", "حتی بیرون از گذرگاه عابر هم نباید عابران را به خطر بیندازید."),
  S(False, "Jeg dytter, så han skynder sig.", "I sound the horn so that he hurries.", "بوق می‌زنم تا عجله کند.",
    "Hornet kan forskrække ham, så han falder eller standser midt på vejen.", "The horn may startle him so that he falls or stops in the middle of the road.", "بوق ممکن است او را بترساند تا بیفتد یا وسط خیابان بایستد."),
)

Q(5141, "7.6", town("""
THE SCENE: a narrow town street with a row of cars parked along the right kerb. In one of the parked cars about 20 m ahead the driver
is visible through the rear window, sitting in the driver's seat with the car's brake lights just switched off, as if about to get
out. Our lane passes close to the parked cars.
MUST BE CLEARLY VISIBLE: the row of parked cars, the person in the driver's seat of one of them.
MUST NOT APPEAR: open doors, signs, text."""),
  "Du kører forbi en række parkerede biler. I en af dem sidder føreren og ser ud til at ville stige ud. Hvordan forholder du dig?",
  "You are passing a row of parked cars. In one of them the driver is sitting and seems about to get out. What do you do?",
  "از کنار ردیفی از خودروهای پارک‌شده رد می‌شوید. راننده‌ی یکی از آن‌ها نشسته و به نظر می‌رسد می‌خواهد پیاده شود. چه می‌کنید؟",
  S(True, "Jeg holder god afstand til siden, så jeg ikke rammer en dør, der åbnes.", "I keep a good distance to the side so that I do not hit a door that opens.",
    "از پهلو فاصله‌ی خوبی نگه می‌دارم تا به دری که باز می‌شود نخورم.",
    "En dør kan pludselig blive åbnet ud mod kørebanen.", "A door may suddenly be opened out into the carriageway.", "ممکن است دری ناگهان رو به سواره‌رو باز شود."),
  S(True, "Jeg sænker farten og er klar til at bremse.", "I slow down and am ready to brake.", "سرعتم را کم می‌کنم و آماده‌ی ترمز هستم.",
    "Så kan du standse, hvis døren åbnes, eller føreren træder ud.", "Then you can stop if the door opens or the driver steps out.", "این‌طور اگر در باز شد یا راننده بیرون آمد، می‌توانید بایستید."),
  S(True, "Jeg kigger efter folk i de parkerede biler.", "I look for people in the parked cars.", "به دنبال آدم‌هایی در خودروهای پارک‌شده نگاه می‌کنم.",
    "En person i en parkeret bil kan være på vej ud.", "A person in a parked car may be about to get out.", "کسی که در خودروی پارک‌شده نشسته، ممکن است در حال پیاده شدن باشد."),
  S(False, "Føreren skal se sig for, så jeg behøver ikke gøre noget.", "The driver must look out, so I need not do anything.", "راننده باید خودش نگاه کند، پس لازم نیست کاری بکنم.",
    "Du skal selv være forberedt på, at andre laver fejl.", "You must be prepared yourself for others to make mistakes.", "خودتان باید برای اشتباه دیگران آماده باشید."),
)

Q(5142, "7.6", town("""
THE SCENE: a residential street on a summer afternoon. On the right side an ice-cream van has stopped at the kerb with its serving
window open; several children stand around it, and one child is running across the road from the other side towards the van.
MUST BE CLEARLY VISIBLE: the ice-cream van, the children around it, the child running across the road.
MUST NOT APPEAR: signs, text.""", cond="sunny summer afternoon, dry road"),
  "En isbil holder ved vejen, og der er børn omkring den. Hvordan forholder du dig?",
  "An ice-cream van has stopped by the road, and there are children around it. What do you do?",
  "ماشین بستنی‌فروشی کنار خیابان ایستاده و بچه‌ها دورش هستند. چه می‌کنید؟",
  S(True, "Jeg sænker farten kraftigt og er klar til at standse.", "I slow down a lot and am ready to stop.", "سرعتم را خیلی کم می‌کنم و آماده‌ی ایستادنم.",
    "Når du nærmer dig børn på eller ved vejen, skal hastigheden være passende lav.", "When you approach children on or by the road, your speed must be suitably low.",
    "وقتی به بچه‌هایی روی جاده یا کنار آن نزدیک می‌شوید، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Børn kan løbe over vejen uden at se sig for.", "Children may run across the road without looking.", "بچه‌ها ممکن است بی‌آنکه نگاه کنند از خیابان رد شوند.",
    "Børn tænker på isen og ikke på trafikken.", "Children think about the ice cream, not about the traffic.", "بچه‌ها به بستنی فکر می‌کنند، نه به ترافیک."),
  S(True, "Jeg holder øje med begge sider af vejen.", "I watch both sides of the road.", "مراقب هر دو طرف خیابان هستم.",
    "Børn kan komme løbende fra den anden side.", "Children may come running from the other side.", "ممکن است بچه‌ها از طرف دیگر بدوند."),
  S(False, "Jeg dytter, så børnene holder sig på fortovet.", "I sound the horn so that the children stay on the pavement.", "بوق می‌زنم تا بچه‌ها در پیاده‌رو بمانند.",
    "Hornet kan få et barn til at gøre noget uventet; sænk i stedet farten.", "The horn can make a child do something unexpected; slow down instead.", "بوق ممکن است کودک را به کار غیرمنتظره‌ای وادارد؛ به‌جایش سرعت را کم کنید."),
)

Q(5143, "7.6", view("""
THE SCENE: a two-way country road with a broken centre line. About 80 m ahead a grey car stands in our lane at the right edge with its
hazard lights flashing (both orange lights lit). The oncoming lane is clear near the car, but a car approaches from far away.
MUST BE CLEARLY VISIBLE: the standing car with its hazard lights, the oncoming car far away.
MUST NOT APPEAR: people on the road, signs, text."""),
  "En bil holder i din vognbane med havariblinket tændt. Hvordan forholder du dig?",
  "A car is standing in your lane with its hazard lights on. What do you do?",
  "خودرویی با چراغ خطر روشن در خط شما ایستاده است. چه می‌کنید؟",
  S(True, "Jeg sænker farten og kører forbi med god afstand, når det kan ske uden fare.", "I slow down and pass with a good distance when it can be done safely.",
    "سرعتم را کم می‌کنم و وقتی بی‌خطر باشد، با فاصله‌ی خوب رد می‌شوم.",
    "Havariblinket advarer om fare; der kan være folk ved bilen.", "Hazard lights warn of danger; there may be people by the car.", "چراغ خطر از خطر خبر می‌دهد؛ ممکن است کسی کنار خودرو باشد."),
  S(False, "Jeg dytter, så bilen flytter sig.", "I sound the horn so that the car moves.", "بوق می‌زنم تا خودرو جابه‌جا شود.",
    "Bilen holder sandsynligvis på grund af et problem; dyt hjælper ikke.", "The car is probably standing because of a problem; the horn does not help.", "خودرو احتمالاً به‌خاطر مشکلی ایستاده؛ بوق کمکی نمی‌کند."),
  S(False, "Jeg kører forbi med det samme, selv om der kommer en modkørende.", "I drive past straight away, even though a car is coming the other way.",
    "فوراً رد می‌شوم، حتی اگر خودرویی از روبه‌رو بیاید.",
    "Hindringen er i din side, så du skal om nødvendigt standse og lade den modkørende passere.", "The obstacle is on your side, so you must stop if necessary and let the oncoming car pass.",
    "مانع در سمت شماست، پس در صورت لزوم باید بایستید و بگذارید خودروی روبه‌رو رد شود."),
  S(False, "Havariblinket betyder, at bilen snart kører igen, så jeg venter tæt bag den.", "The hazard lights mean that the car will soon drive on, so I wait close behind it.",
    "چراغ خطر یعنی خودرو به‌زودی راه می‌افتد، پس نزدیک پشتش صبر می‌کنم.",
    "Havariblink er en advarsel; hold god afstand.", "Hazard lights are a warning; keep a good distance.", "چراغ خطر هشدار است؛ فاصله‌ی خوبی نگه دارید."),
)

Q(5144, "7.12", town("""
THE SCENE: a junction in town with traffic lights. Our light has just changed from green to YELLOW. We are still about 40 m from the
stop line, driving at moderate speed; the road is dry and nobody is close behind us.
MUST BE CLEARLY VISIBLE: the yellow light, the stop line some way ahead.
MUST NOT APPEAR: text."""),
  "Lyset skifter til gult, mens du er 40 m fra krydset og roligt kan standse. Hvordan forholder du dig?",
  "The light changes to yellow while you are 40 m from the junction and can stop calmly. What do you do?",
  "چراغ زرد می‌شود، وقتی ۴۰ متر با تقاطع فاصله دارید و می‌توانید آرام بایستید. چه می‌کنید؟",
  S(True, "Jeg standser før stoplinjen.", "I stop before the stop line.", "پیش از خط ایست می‌ایستم.",
    "Gult lys betyder stop.", "Yellow means stop.", "چراغ زرد یعنی ایست."),
  S(False, "Gult lys betyder, at jeg skal skynde mig over.", "Yellow means that I must hurry across.", "چراغ زرد یعنی باید عجله کنم و رد شوم.",
    "Gult lys betyder stop, ikke kør hurtigere.", "Yellow means stop, not drive faster.", "زرد یعنی ایست، نه تندتر رفتن."),
  S(True, "Jeg må kun køre videre, hvis jeg er så tæt på, at en standsning vil skabe fare.", "I may only drive on if I am so close that stopping would be dangerous.",
    "فقط وقتی می‌توانم ادامه دهم که آن‌قدر نزدیک باشم که ایستادن خطرناک باشد.",
    "Den, der er nået så langt frem, at standsning vil medføre fare, behøver ikke standse.", "Whoever has come so far that stopping would cause danger need not stop.",
    "کسی که آن‌قدر جلو آمده که ایستادن خطر ایجاد کند، لازم نیست بایستد."),
  S(False, "Gult lys gælder kun fodgængere.", "Yellow only applies to pedestrians.", "چراغ زرد فقط برای عابران است.",
    "Lyssignalet gælder de kørende.", "The traffic light applies to drivers.", "این چراغ برای رانندگان است."),
)

Q(5145, "7.12", town("""
THE SCENE: a junction in town with traffic lights. We are standing first at the stop line. Our signal shows RED and YELLOW at the same
time. On the crossing road the last cars are passing.
MUST BE CLEARLY VISIBLE: our signal with red and yellow lit together, the stop line, the crossing traffic.
MUST NOT APPEAR: text."""),
  "Du holder ved stoplinjen, og dit lyssignal viser rødt og gult på samme tid. Hvordan forholder du dig?",
  "You are waiting at the stop line, and your traffic light shows red and yellow at the same time. What do you do?",
  "پشت خط ایست ایستاده‌اید و چراغ شما هم‌زمان قرمز و زرد را نشان می‌دهد. چه می‌کنید؟",
  S(True, "Jeg holder stille, til lyset bliver grønt.", "I stay where I am until the light turns green.", "تا سبز شدن چراغ می‌ایستم.",
    "Rødt og gult lys samtidig betyder stop; det viser, at lyset snart skifter til grønt.", "Red and yellow together mean stop; they show that the light will soon change to green.",
    "قرمز و زرد با هم یعنی ایست؛ نشان می‌دهد چراغ به‌زودی سبز می‌شود."),
  S(False, "Jeg må køre, fordi lyset snart bliver grønt.", "I may go because the light will soon turn green.", "می‌توانم حرکت کنم، چون چراغ به‌زودی سبز می‌شود.",
    "Du må først køre, når lyset er grønt.", "You may only go when the light is green.", "فقط وقتی چراغ سبز شد می‌توانید حرکت کنید."),
  S(False, "Rødt og gult betyder, at jeg må køre, hvis vejen er fri.", "Red and yellow mean that I may go if the road is clear.", "قرمز و زرد یعنی اگر راه باز باشد می‌توانم بروم.",
    "Rødt og gult betyder stop, uanset trafikken.", "Red and yellow mean stop whatever the traffic.", "قرمز و زرد یعنی ایست، ترافیک هر چه باشد."),
  S(False, "Jeg må køre lidt frem over stoplinjen og vente der.", "I may move a little forward over the stop line and wait there.", "می‌توانم کمی از خط ایست جلوتر بروم و آن‌جا صبر کنم.",
    "Du skal holde før stoplinjen.", "You must wait before the stop line.", "باید پیش از خط ایست بایستید."),
)

Q(5146, "7.12", view("""
THE SCENE: we are on a narrow gravel field road between fields and have come to its end where it meets a paved country road. There are
no signs and no markings at the end of the field road. On the country road a car comes from the right and a tractor from the left.
MUST BE CLEARLY VISIBLE: the gravel field road under us, the paved road across, the car from the right, the tractor from the left.
MUST NOT APPEAR: signs, markings, text."""),
  "Du kommer ad en markvej og skal ud på landevejen. Der er ingen tavler. Hvad gælder?",
  "You are coming along a field road and are going to drive onto the country road. There are no signs. What applies?",
  "از یک راه خاکی میان مزرعه می‌آیید و می‌خواهید وارد جاده‌ی اصلی شوید. تابلویی نیست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg har ubetinget vigepligt for trafikken på landevejen fra begge sider.", "I must give way unconditionally to the traffic on the country road from both sides.",
    "باید بی‌قیدوشرط به ترافیک جاده از هر دو طرف راه بدهم.",
    "Kørende ud fra en markvej har ubetinget vigepligt.", "Drivers coming out of a field road must give way unconditionally.", "کسی که از راه خاکی مزرعه بیرون می‌آید، باید بی‌قیدوشرط راه بدهد."),
  S(False, "Højrereglen gælder, fordi der ikke er tavler.", "The right-hand rule applies because there are no signs.", "قاعده‌ی دست راست برقرار است، چون تابلویی نیست.",
    "Højrereglen gælder ikke for den, der kommer fra en markvej.", "The right-hand rule does not apply to someone coming from a field road.", "قاعده‌ی دست راست برای کسی که از راه خاکی مزرعه می‌آید اعمال نمی‌شود."),
  S(False, "Traktoren fra venstre skal holde tilbage for mig.", "The tractor from the left must give way to me.", "تراکتوری که از چپ می‌آید باید به من راه بدهد.",
    "Du skal holde tilbage for både bilen og traktoren.", "You must give way to both the car and the tractor.", "باید هم به خودرو و هم به تراکتور راه بدهید."),
)

Q(5147, "7.12", above("""
THE SCENE: a crossroads in a residential area seen from above, no signs, no markings, no traffic lights; hedges on the corners.
VEHICLES AND PEOPLE (colour code used strictly): a RED car (ours) coming up from the bottom, going straight on (a SOLID GREEN arrow
shows it waiting before the junction). A cyclist comes from the RIGHT, going straight on across the junction. A BLUE car comes from
the LEFT, also going straight on.
MUST NOT APPEAR: signs, text."""),
  "I krydset uden tavler kommer en cyklist fra højre og en bil fra venstre. Alle skal ligeud. Hvad gælder?",
  "At the junction with no signs a cyclist is coming from the right and a car from the left. Everyone is going straight on. What applies?",
  "در تقاطع بدون تابلو، دوچرخه‌سواری از راست و خودرویی از چپ می‌آید. همه مستقیم می‌روند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder tilbage for cyklisten fra højre.", "I give way to the cyclist from the right.", "به دوچرخه‌سوار سمت راست راه می‌دهم.",
    "Højrereglen gælder også over for cyklister.", "The right-hand rule also applies to cyclists.", "قاعده‌ی دست راست برای دوچرخه‌سواران هم برقرار است."),
  S(False, "Cyklister skal altid holde tilbage for biler.", "Cyclists must always give way to cars.", "دوچرخه‌سواران همیشه باید به خودروها راه بدهند.",
    "Der er ingen regel om, at cyklister altid skal holde tilbage.", "There is no rule that cyclists must always give way.", "قاعده‌ای نیست که دوچرخه‌سوار همیشه راه بدهد."),
  S(True, "Bilen fra venstre skal holde tilbage for mig.", "The car from the left must give way to me.", "خودروی سمت چپ باید به من راه بدهد.",
    "For bilen fra venstre kommer du fra højre.", "For the car from the left, you are coming from the right.", "برای خودروی سمت چپ، شما از سمت راست می‌آیید."),
  S(False, "Jeg har forkørselsret, fordi jeg kører ligeud.", "I have the right of way because I am going straight on.", "حق تقدم با من است، چون مستقیم می‌روم.",
    "At køre ligeud giver ingen forkørselsret.", "Going straight on gives no right of way.", "مستقیم رفتن حق تقدم نمی‌دهد."),
)

Q(5148, "7.7", view("""
THE SCENE: a two-way town-edge road, one lane in each direction, a broken centre line. About 50 m ahead a delivery van is parked at the
kerb in the ONCOMING lane, blocking most of it. An oncoming car is approaching the van from the other side and is about to reach it.
Our lane is free.
MUST BE CLEARLY VISIBLE: the van blocking the oncoming lane, the oncoming car behind it, our free lane.
MUST NOT APPEAR: signs, text.""", scenery="Scenery is reduced to simple flat house fronts, pavements and a few trees."),
  "En varevogn holder parkeret i den modkørendes side. En modkørende bil skal forbi den. Hvad gælder?",
  "A van is parked on the oncoming side. An oncoming car has to get past it. What applies?",
  "ونی در سمت ترافیک روبه‌رو پارک شده است. خودرویی از روبه‌رو باید از کنارش رد شود. چه قاعده‌ای برقرار است؟",
  S(True, "Den modkørende skal om nødvendigt standse og lade mig passere.", "The oncoming driver must stop if necessary and let me pass.", "راننده‌ی روبه‌رو در صورت لزوم باید بایستد و بگذارد من رد شوم.",
    "Er vejen delvis spærret, skal den, i hvis side spærringen er, om nødvendigt standse og lade de mødende passere.",
    "If the road is partly blocked, the driver on whose side the obstruction is must stop if necessary and let oncoming traffic pass.",
    "اگر جاده تا حدی بسته باشد، کسی که مانع در سمت اوست باید در صورت لزوم بایستد و بگذارد مقابلش رد شود."),
  S(True, "Jeg holder alligevel øje med, om den modkørende kører ud foran mig.", "I still watch whether the oncoming driver pulls out in front of me.",
    "با این حال مراقبم که خودروی روبه‌رو جلوی من بیرون نیاید.",
    "Du skal altid være klar til, at andre ikke overholder reglerne.", "You must always be ready for others not keeping the rules.", "همیشه باید آماده باشید که دیگران قوانین را رعایت نکنند."),
  S(False, "Jeg skal standse og lade den modkørende komme forbi varevognen først.", "I must stop and let the oncoming car get past the van first.",
    "باید بایستم و بگذارم خودروی روبه‌رو اول از کنار ون رد شود.",
    "Hindringen er i den modkørendes side; du har ikke pligt til at standse.", "The obstacle is on the oncoming side; you are not obliged to stop.", "مانع در سمت مقابل است؛ شما موظف به ایستادن نیستید."),
  S(False, "Den, der blinker først med lyset, har forkørselsret.", "Whoever flashes their lights first has the right of way.", "هر که اول چراغ بزند، حق تقدم دارد.",
    "Lyssignaler giver ingen forkørselsret.", "Flashing lights gives no right of way.", "چراغ زدن حق تقدم نمی‌دهد."),
)

Q(5149, "7.7", view("""
THE SCENE: a dark, unlit two-way country road at night. We drive with high beam (the road far ahead brightly lit). About 150 m ahead a
cyclist with a white front light comes towards us at the far edge of the oncoming lane.
MUST BE CLEARLY VISIBLE: our bright high beam on the road, the oncoming cyclist with a front light.
MUST NOT APPEAR: street lamps, other vehicles, text.""", cond="night, dark unlit road, dry"),
  "Du kører med fjernlys i mørke, og en cyklist med lygte kommer imod dig. Hvordan forholder du dig?",
  "You are driving with high beam in the dark, and a cyclist with a light is coming towards you. What do you do?",
  "در تاریکی با نور بالا می‌رانید و دوچرخه‌سواری با چراغ از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg skifter til nærlys, så cyklisten ikke bliver blændet.", "I switch to dipped beam so that the cyclist is not dazzled.", "به نور پایین می‌روم تا دوچرخه‌سوار خیره نشود.",
    "Fjernlys må ikke bruges ved møde med andet køretøj i en afstand, hvor føreren kan blændes; en cykel er også et køretøj.",
    "High beam must not be used when meeting another vehicle at a distance where its driver can be dazzled; a bicycle is a vehicle too.",
    "هنگام برخورد با وسیله‌ی دیگری در فاصله‌ای که راننده‌اش خیره شود، نور بالا ممنوع است؛ دوچرخه هم وسیله‌ی نقلیه است."),
  S(True, "Jeg tilpasser farten til det kortere udsyn med nærlys.", "I adjust my speed to the shorter view with dipped beam.", "سرعتم را با دید کوتاه‌تر نور پایین هماهنگ می‌کنم.",
    "Farten skal tilpasses de nye sigtforhold, før du blænder ned.", "Your speed must be adjusted to the new visibility before you dip.", "پیش از رفتن به نور پایین باید سرعت را با دید تازه هماهنگ کنید."),
  S(False, "Cyklister bliver ikke blændet, så jeg kan beholde fjernlyset.", "Cyclists are not dazzled, so I can keep the high beam.", "دوچرخه‌سواران خیره نمی‌شوند، پس می‌توانم نور بالا را نگه دارم.",
    "En blændet cyklist kan køre ud i vejen eller vælte.", "A dazzled cyclist may ride out into the road or fall.", "دوچرخه‌سوار خیره‌شده ممکن است به وسط جاده برود یا زمین بخورد."),
  S(False, "Jeg blinker med fjernlyset, så cyklisten ved, at jeg kommer.", "I flash the high beam so that the cyclist knows I am coming.", "با نور بالا چراغ می‌زنم تا دوچرخه‌سوار بداند می‌آیم.",
    "Blink med fjernlyset blænder også.", "Flashing the high beam dazzles too.", "چراغ زدن با نور بالا هم خیره می‌کند."),
)

Q(5150, "4.5", view("""
THE SCENE: a two-way country road on a sunny weekend. About 50 m ahead a group of five young cyclists rides in our lane, two of them
side by side, chatting; one of them looks back over her shoulder. The oncoming lane has a car far away.
MUST BE CLEARLY VISIBLE: the group of cyclists, the one looking back, the car far away in the oncoming lane.
MUST NOT APPEAR: signs, text.""", cond="sunny day, dry road"),
  "Foran dig kører en gruppe unge cyklister, nogle ved siden af hinanden. Hvordan forholder du dig?",
  "A group of young cyclists is riding in front of you, some of them side by side. What do you do?",
  "جلوی شما گروهی از دوچرخه‌سواران جوان می‌رانند و برخی کنار هم هستند. چه می‌کنید؟",
  S(True, "Jeg må regne med, at en af dem pludselig kan svinge ud.", "I must expect that one of them may suddenly swerve out.", "باید انتظار داشته باشم یکی‌شان ناگهان به وسط بیاید.",
    "En cyklist, der kigger sig tilbage, kan være ved at svinge.", "A cyclist looking back may be about to turn.", "دوچرخه‌سواری که به عقب نگاه می‌کند، ممکن است بخواهد بپیچد."),
  S(True, "Jeg overhaler først, når jeg kan give hele gruppen god plads.", "I only overtake when I can give the whole group plenty of room.", "فقط وقتی سبقت می‌گیرم که بتوانم به کل گروه جای کافی بدهم.",
    "En gruppe er længere og bredere end én cyklist.", "A group is longer and wider than one cyclist.", "یک گروه از یک دوچرخه‌سوار درازتر و پهن‌تر است."),
  S(False, "Jeg dytter, så de kører ind til siden.", "I sound the horn so that they move to the side.", "بوق می‌زنم تا به کنار بروند.",
    "Hornet kan forskrække dem og få nogen til at vælte.", "The horn can startle them and make someone fall.", "بوق ممکن است آن‌ها را بترساند و یکی زمین بخورد."),
  S(False, "Jeg kører tæt forbi for at vise, at de fylder for meget.", "I drive close past to show them that they take up too much room.", "از نزدیک رد می‌شوم تا نشانشان دهم زیادی جا گرفته‌اند.",
    "At køre tæt forbi cyklister er farligt.", "Driving close past cyclists is dangerous.", "رد شدن از نزدیک دوچرخه‌سواران خطرناک است."),
)
