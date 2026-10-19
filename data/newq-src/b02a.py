# «آزمون جدید», batch 2 (5101–5200), part a: stopping and parking (7.18), overtaking (7.9), signs (6.1), passing
# pedestrians and stationary vehicles (7.6), speed (7.3), the vehicle (1.2).
# Rules: Færdselsloven §§ 3, 19, 21–23, 27–29, 41, 42, 67, 82; Bekendtgørelse om vejafmærkning (A, C and D signs, Q
# lines); Motorstyrelsen on the extra number plate.
from nq import Q, S, above, picture, town, view

Q(5101, "7.18", view("""
THE SCENE: a two-way country road, one lane in each direction. About 60 m ahead the road crosses a railway at a level crossing with
half barriers (raised) and the red-and-white St Andrew's cross signs on both sides. About 20 m before the crossing, at the right edge
of our lane, the verge is wide and firm, a tempting place to stop. No train in sight.
MUST BE CLEARLY VISIBLE: the level crossing with its barriers and signs, the free road edge shortly before it.
MUST NOT APPEAR: a train, text."""),
  "Du vil parkere i vejkanten omkring 20 m før jernbaneoverkørslen. Hvad gælder?",
  "You want to park at the edge of the road about 20 m before the level crossing. What applies?",
  "می‌خواهید حدود ۲۰ متر پیش از تقاطع راه‌آهن کنار جاده پارک کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke parkere nærmere end 30 m fra overkørslen.", "I must not park closer than 30 m to the crossing.", "نباید نزدیک‌تر از ۳۰ متر به تقاطع پارک کنم.",
    "Parkering er forbudt nærmere end 30 m fra en jernbaneoverkørsel.", "Parking is forbidden closer than 30 m to a level crossing.", "پارک در فاصله‌ی کمتر از ۳۰ متر از تقاطع راه‌آهن ممنوع است."),
  S(True, "Jeg må gerne standse kort for at lade en passager stige ud, hvis det ikke er til fare.",
    "I may stop briefly to let a passenger get out, if it is not dangerous.", "اگر خطری نداشته باشد، می‌توانم کوتاه بایستم تا مسافری پیاده شود.",
    "Forbuddet inden for 30 m gælder parkering; standsning er kun forbudt på selve overkørslen.",
    "The 30 m ban covers parking; stopping is only forbidden on the crossing itself.", "ممنوعیت ۳۰ متر برای پارک است؛ توقف فقط روی خود تقاطع ممنوع است."),
  S(False, "Forbuddet gælder kun, når bommene er nede.", "The ban only applies when the barriers are down.", "این ممنوعیت فقط وقتی است که راه‌بندها پایین‌اند.",
    "Forbuddet gælder hele tiden.", "The ban applies all the time.", "این ممنوعیت همیشه برقرار است."),
  S(False, "Jeg må parkere, hvis jeg lader havariblinket være tændt.", "I may park if I leave the hazard lights on.", "اگر چراغ خطر را روشن بگذارم، می‌توانم پارک کنم.",
    "Havariblinket giver ikke ret til at parkere, hvor det er forbudt.", "Hazard lights do not give a right to park where it is forbidden.", "چراغ خطر اجازه‌ی پارک در جای ممنوع را نمی‌دهد."),
)

Q(5102, "7.18", town("""
THE SCENE: a residential street in town, one lane in each direction, a pavement on the right with a low kerb. About 15 m ahead on the
right a private driveway crosses the pavement to a house with a garage; the kerb is lowered at the driveway. The road edge right in
front of the driveway is free, the rest of the kerb is taken by parked cars.
MUST BE CLEARLY VISIBLE: the driveway with the lowered kerb, the free space in front of it, the parked cars on both sides of it.
MUST NOT APPEAR: signs, text."""),
  "Den eneste ledige plads ved kantstenen er lige ud for en indkørsel til et hus. Du vil parkere. Hvad gælder?",
  "The only free space at the kerb is right in front of the driveway to a house. You want to park. What applies?",
  "تنها جای خالی کنار جدول درست جلوی ورودی ماشین‌روی یک خانه است. می‌خواهید پارک کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Det er forbudt at parkere ud for ind- og udkørslen til en ejendom.", "Parking in front of the entrance and exit of a property is forbidden.",
    "پارک جلوی ورودی و خروجی یک ملک ممنوع است.",
    "Parkering må ikke ske ud for ind- og udkørsel til og fra en ejendom.", "Parking is not allowed in front of the way in and out of a property.", "پارک جلوی راه ورود و خروج یک ملک مجاز نیست."),
  S(False, "Det er tilladt, når jeg kun holder der i en time.", "It is allowed as long as I only stand there for an hour.", "اگر فقط یک ساعت آن‌جا بمانم، مجاز است.",
    "Forbuddet gælder uanset hvor længe, du parkerer.", "The ban applies however long you park.", "این ممنوعیت هر قدر هم کوتاه پارک کنید، برقرار است."),
  S(False, "Det er tilladt, hvis jeg lægger mit telefonnummer i forruden.", "It is allowed if I put my phone number in the windscreen.", "اگر شماره‌ی تلفنم را پشت شیشه بگذارم، مجاز است.",
    "Et telefonnummer ændrer ikke på forbuddet.", "A phone number does not change the ban.", "شماره‌ی تلفن ممنوعیت را تغییر نمی‌دهد."),
  S(False, "Det er tilladt om natten, når ingen skal ud.", "It is allowed at night, when nobody is going out.", "شب، وقتی کسی بیرون نمی‌رود، مجاز است.",
    "Forbuddet gælder hele døgnet.", "The ban applies day and night.", "این ممنوعیت در تمام شبانه‌روز برقرار است."),
)

Q(5103, "7.18", town("""
THE SCENE: a shopping street in town, one lane in each direction, a broken centre line. All places at the right kerb are taken by
parked cars as far as can be seen. On the right pavement a small shop. Traffic comes towards us in the other lane.
MUST BE CLEARLY VISIBLE: the full row of parked cars at the kerb, the shop, the oncoming traffic.
MUST NOT APPEAR: signs, text."""),
  "Alle pladser ved kantstenen er optaget. Du vil hurtigt hente en vare i butikken. Hvad gælder?",
  "All the places at the kerb are taken. You want to fetch something quickly from the shop. What applies?",
  "همه‌ی جاهای کنار جدول پر است. می‌خواهید سریع چیزی از مغازه بگیرید. چه قاعده‌ای برقرار است؟",
  S(False, "Jeg må parkere ved siden af en bil, der holder ved kantstenen, hvis jeg tænder havariblinket.",
    "I may park beside a car standing at the kerb if I switch on the hazard lights.", "اگر چراغ خطر را روشن کنم، می‌توانم کنار خودرویی که لب جدول ایستاده پارک کنم.",
    "Det er forbudt at parkere ved siden af et andet køretøj, der holder ved kørebanens kant.", "It is forbidden to park beside another vehicle standing at the edge of the carriageway.",
    "پارک کنار وسیله‌ی دیگری که لب سواره‌رو ایستاده، ممنوع است."),
  S(True, "Jeg skal finde en lovlig plads, også selv om det tager længere tid.", "I must find a legal place, even if it takes longer.", "باید جای مجازی پیدا کنم، حتی اگر بیشتر طول بکشد.",
    "Du må kun standse og parkere, hvor det er tilladt og ikke til fare eller ulempe.", "You may only stop and park where it is allowed and not dangerous or a nuisance.",
    "فقط جایی می‌توانید بایستید یا پارک کنید که مجاز باشد و خطر یا مزاحمتی نداشته باشد."),
  S(True, "En bil, der holder ved siden af de parkerede, kan spærre for trafikken og skjule fodgængere.",
    "A car standing beside the parked ones can block the traffic and hide pedestrians.", "خودرویی که کنار خودروهای پارک‌شده بایستد، می‌تواند راه را ببندد و عابران را پنهان کند.",
    "Derfor er dobbeltparkering forbudt.", "That is why double parking is forbidden.", "به همین دلیل پارک دوبل ممنوع است."),
  S(False, "Det er tilladt i op til 3 minutter.", "It is allowed for up to 3 minutes.", "تا ۳ دقیقه مجاز است.",
    "Også en kort standsning skal ske ved kørebanens kant; ved siden af parkerede biler må du hverken standse eller parkere.",
    "Even a short stop must be made at the edge of the carriageway; beside parked cars you may neither stop nor park.",
    "حتی توقف کوتاه هم باید کنار لبه‌ی سواره‌رو باشد؛ کنار خودروهای پارک‌شده نه می‌توانید بایستید و نه پارک کنید."),
)

Q(5104, "7.18", view("""
THE SCENE: a two-way road on a bridge that crosses over a motorway: low railings on both sides, and below them, at the sides of the
picture, the motorway with fast traffic is visible. A wide view over the landscape. The road on the bridge has a broad edge on the
right.
MUST BE CLEARLY VISIBLE: the bridge railings, the motorway below.
MUST NOT APPEAR: signs, text."""),
  "Du kører over en bro over motorvejen og vil standse og tage et billede af udsigten. Hvad gælder?",
  "You are driving over a bridge over the motorway and want to stop and take a picture of the view. What applies?",
  "از روی پلی بالای بزرگراه می‌گذرید و می‌خواهید بایستید و از منظره عکس بگیرید. چه قاعده‌ای برقرار است؟",
  S(True, "Det er forbudt at standse og parkere på en bro over en motorvej.", "Stopping and parking on a bridge over a motorway are forbidden.", "توقف و پارک روی پل بالای بزرگراه ممنوع است.",
    "Standsning og parkering er forbudt på bro over motorvej, i viadukt og i tunnel.", "Stopping and parking are forbidden on a bridge over a motorway, in a viaduct and in a tunnel.",
    "توقف و پارک روی پل بالای بزرگراه، در زیرگذر و در تونل ممنوع است."),
  S(False, "Jeg må standse kort, hvis jeg tænder havariblinket.", "I may stop briefly if I switch on the hazard lights.", "اگر چراغ خطر را روشن کنم، می‌توانم کوتاه بایستم.",
    "Havariblinket gør ikke en forbudt standsning tilladt.", "Hazard lights do not make a forbidden stop allowed.", "چراغ خطر توقف ممنوع را مجاز نمی‌کند."),
  S(False, "Forbuddet gælder kun på selve motorvejen, ikke på broen.", "The ban only applies on the motorway itself, not on the bridge.", "این ممنوعیت فقط در خود بزرگراه است، نه روی پل.",
    "Forbuddet gælder netop på broen over motorvejen.", "The ban applies precisely on the bridge over the motorway.", "این ممنوعیت دقیقاً روی پل بالای بزرگراه است."),
)

Q(5105, "7.18", view("""
THE SCENE: a two-way country road, one lane in each direction, a broken centre line. Just ahead the road bends sharply to the left
around a small wood; the trees hide what comes round the bend. At the right edge just inside the bend there is a little room on the
verge.
MUST BE CLEARLY VISIBLE: the blind bend, the trees hiding the view.
MUST NOT APPEAR: other vehicles, signs, text."""),
  "Du vil standse i vejkanten lige i et uoverskueligt sving. Hvad gælder?",
  "You want to stop at the edge of the road right in a blind bend. What applies?",
  "می‌خواهید درست در یک پیچ بی‌دید کنار جاده بایستید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke standse i eller ved et uoverskueligt sving.", "I must not stop in or near a blind bend.", "نباید در پیچ بی‌دید یا نزدیک آن بایستم.",
    "Standsning og parkering er forbudt i eller ved uoverskueligt vejsving og på eller nær en bakketop.",
    "Stopping and parking are forbidden in or near a blind bend and on or near a hilltop.", "توقف و پارک در پیچ بی‌دید یا نزدیک آن و روی تپه یا نزدیک آن ممنوع است."),
  S(True, "Andre kan komme rundt i svinget og pludselig have bilen lige foran sig.", "Others may come round the bend and suddenly have the car right in front of them.",
    "دیگران ممکن است از پیچ بیایند و ناگهان خودرو را درست جلوی خود ببینند.",
    "De kan ikke se den holdende bil i tide.", "They cannot see the standing car in time.", "آن‌ها خودروی ایستاده را به موقع نمی‌بینند."),
  S(False, "Forbuddet gælder kun om natten.", "The ban only applies at night.", "این ممنوعیت فقط شب‌هاست.",
    "Forbuddet gælder hele døgnet.", "The ban applies day and night.", "این ممنوعیت در تمام شبانه‌روز برقرار است."),
  S(True, "Jeg kører videre og standser et sted, hvor der er god oversigt.", "I drive on and stop at a place with a good view.", "ادامه می‌دهم و جایی می‌ایستم که دید خوبی دارد.",
    "Find et sted, hvor andre kan se bilen i god tid.", "Find a place where others can see the car in good time.", "جایی پیدا کنید که دیگران خودرو را به موقع ببینند."),
)

Q(5106, "7.18", town("""
THE SCENE: a town street, one lane in each direction. On the right pavement, at the kerb, stands a round sign with a blue centre, a
red border and a red X across it (the Danish no-stopping sign), with no plate under it. The kerb ahead on the right is free for a long
stretch; about 80 m ahead a side street joins from the right. On the left side of the street cars are parked.
MUST BE CLEARLY VISIBLE: the no-stopping sign on the right, the free kerb, the side street further ahead.
MUST NOT APPEAR: other signs, yellow lines, text."""),
  "Du kører forbi denne tavle i højre side af vejen. Hvad gælder?",
  "You pass this sign on the right-hand side of the road. What applies?",
  "از کنار این تابلو در سمت راست جاده رد می‌شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke standse på kørebanen i denne side af vejen.", "I must not stop on the carriageway on this side of the road.", "در این سمت جاده نباید روی سواره‌رو بایستم.",
    "Tavlen (C 61) forbyder standsning på kørebanen, som ikke sker af hensyn til den øvrige færdsel.",
    "The sign (C 61) forbids stopping on the carriageway that is not for the sake of the other traffic.",
    "این تابلو (C 61) توقف روی سواره‌رو را، جز به‌خاطر ترافیک، ممنوع می‌کند."),
  S(True, "Forbuddet gælder frem til næste vejkryds, hvis det ikke ophæves før.", "The ban applies up to the next junction, unless it is lifted before.",
    "این ممنوعیت تا تقاطع بعدی برقرار است، مگر زودتر لغو شود.",
    "Standsnings- og parkeringsforbud gælder i færdselsretningen frem til næste vejkryds.", "Stopping and parking bans apply in the direction of travel up to the next junction.",
    "ممنوعیت توقف و پارک در جهت حرکت تا تقاطع بعدی برقرار است."),
  S(False, "Forbuddet gælder i begge sider af vejen.", "The ban applies on both sides of the road.", "این ممنوعیت در هر دو سمت جاده است.",
    "Tavlen gælder kun i den vejside, hvor den er sat op.", "The sign only applies on the side of the road where it stands.", "این تابلو فقط در همان سمتی از جاده که نصب شده معتبر است."),
  S(False, "Jeg må standse kort for at sætte en passager af.", "I may stop briefly to let a passenger out.", "می‌توانم کوتاه بایستم تا مسافری پیاده شود.",
    "Ved denne tavle er også en kort standsning forbudt.", "At this sign even a short stop is forbidden.", "با این تابلو حتی توقف کوتاه هم ممنوع است."),
)

Q(5107, "7.9", view("""
THE SCENE: a straight two-way country road, one lane in each direction, a broken centre line. About 30 m ahead of us drives a grey
car with its LEFT indicator flashing, already moving out towards the centre line to overtake a slow green tractor further ahead. The
oncoming lane is empty.
MUST BE CLEARLY VISIBLE: the grey car's flashing left indicator and its position towards the centre line, the tractor ahead of it.
MUST NOT APPEAR: signs, text."""),
  "Bilen foran dig er ved at trække ud for at overhale en traktor. Hvad gælder for dig?",
  "The car in front of you is moving out to overtake a tractor. What applies to you?",
  "خودروی جلوی شما دارد بیرون می‌کشد تا از یک تراکتور سبقت بگیرد. برای شما چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke begynde at overhale, mens bilen foran giver tegn til at overhale.", "I must not start overtaking while the car in front is signalling to overtake.",
    "تا وقتی خودروی جلو علامت سبقت می‌دهد، نباید سبقت را شروع کنم.",
    "Før du overhaler, skal du sikre dig, at den foran ikke giver tegn til at overhale et andet køretøj.",
    "Before you overtake, you must make sure that the one in front is not signalling to overtake another vehicle.",
    "پیش از سبقت باید مطمئن شوید که جلویی علامت سبقت از وسیله‌ی دیگری نمی‌دهد."),
  S(True, "Jeg venter, til bilen er færdig med sin overhaling.", "I wait until the car has finished its overtaking.", "صبر می‌کنم تا سبقت آن خودرو تمام شود.",
    "Derefter kan du selv vurdere, om du kan overhale uden fare.", "After that you can judge for yourself whether you can overtake safely.", "بعد از آن خودتان می‌سنجید که آیا بی‌خطر می‌توانید سبقت بگیرید."),
  S(False, "Jeg kan overhale begge køretøjer på én gang, hvis jeg skynder mig.", "I can overtake both vehicles at once if I hurry.", "اگر عجله کنم، می‌توانم هم‌زمان از هر دو سبقت بگیرم.",
    "Du må ikke begynde, når den foran selv er ved at overhale.", "You must not start when the one in front is overtaking itself.", "وقتی جلویی خودش در حال سبقت است، نباید شروع کنید."),
  S(False, "Bilen foran skal lade mig komme først, fordi jeg kører hurtigere.", "The car in front must let me go first because I am driving faster.",
    "خودروی جلو باید اجازه دهد اول من بروم، چون تندتر می‌رانم.",
    "Det er dig, der skal vente; fart giver ingen ret.", "It is you who must wait; speed gives no right.", "شما باید صبر کنید؛ سرعت حقی به شما نمی‌دهد."),
)

Q(5108, "7.9", above("""
THE SCENE: a straight road seen from above with TWO lanes in our direction (going up the picture), separated by a broken lane line,
and a central reservation on the left.
VEHICLES (colour code used strictly): a RED car (ours) in the LEFT lane, having just passed a WHITE lorry in the right lane (the red car
is a little ahead of the lorry's front). About 150 m further ahead in the right lane drives a second WHITE lorry. A short DASHED ORANGE
arrow shows the red car moving back into the right lane between the two lorries; a SOLID GREEN arrow shows it staying in the left lane
past the second lorry.
MUST NOT APPEAR: signs, text."""),
  "Du har lige overhalet en lastbil. Lidt længere fremme kører endnu en lastbil, som du også vil overhale med det samme. Hvad gælder?",
  "You have just overtaken a lorry. A little further ahead there is another lorry that you also want to overtake straight away. What applies?",
  "همین الان از یک کامیون سبقت گرفته‌اید. کمی جلوتر کامیون دیگری است که می‌خواهید فوراً از آن هم سبقت بگیرید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må blive i venstre vognbane, når jeg straks skal overhale den næste lastbil.", "I may stay in the left lane when I am going to overtake the next lorry straight away.",
    "وقتی قرار است فوراً از کامیون بعدی سبقت بگیرم، می‌توانم در خط چپ بمانم.",
    "Du behøver ikke køre tilbage til højre, hvis du straks vil overhale endnu et køretøj, og betingelserne er opfyldt.",
    "You need not move back to the right if you are going to overtake another vehicle straight away and the conditions are met.",
    "اگر قصد دارید فوراً از وسیله‌ی دیگری سبقت بگیرید و شرایط فراهم است، لازم نیست به راست برگردید."),
  S(True, "Ellers skal jeg tilbage til højre, så snart det kan ske uden fare eller ulempe.", "Otherwise I must move back to the right as soon as it can be done without danger or inconvenience.",
    "در غیر این صورت باید به محض این‌که بی‌خطر و بی‌مزاحمت باشد، به راست برگردم.",
    "Efter en overhaling til venstre skal du holde til højre igen, så snart det kan ske uden fare eller ulempe.",
    "After overtaking on the left you must keep right again as soon as it can be done without danger or inconvenience.",
    "پس از سبقت از چپ، باید به محض این‌که بی‌خطر و بی‌مزاحمت باشد، دوباره سمت راست بمانید."),
  S(False, "Jeg må blive i venstre vognbane, så længe jeg vil.", "I may stay in the left lane for as long as I like.", "تا هر وقت بخواهم می‌توانم در خط چپ بمانم.",
    "Venstre vognbane bruges til at overhale, ikke til at blive i.", "The left lane is for overtaking, not for staying in.", "خط چپ برای سبقت است، نه برای ماندن."),
  S(False, "Jeg skal straks trække ind lige foran den første lastbil.", "I must pull in right in front of the first lorry at once.", "باید فوراً درست جلوی کامیون اول برگردم.",
    "Du må ikke trække ind så tæt, at du generer den, du har overhalet.", "You must not pull in so close that you inconvenience the one you have overtaken.", "نباید آن‌قدر نزدیک برگردید که مزاحم وسیله‌ی سبقت‌گرفته شوید."),
)

Q(5109, "7.9", view("""
THE SCENE: a fairly narrow two-way country road, one lane in each direction, a broken centre line. About 30 m ahead a cyclist rides
at the right edge of our lane. A car comes towards us in the other lane, about 150 m away. A light wind bends the grass on the
verge.
MUST BE CLEARLY VISIBLE: the cyclist ahead, the oncoming car, the narrow road.
MUST NOT APPEAR: signs, text."""),
  "Du vil overhale cyklisten, men en bil kommer imod dig. Hvordan forholder du dig?",
  "You want to overtake the cyclist, but a car is coming towards you. What do you do?",
  "می‌خواهید از دوچرخه‌سوار سبقت بگیرید، ولی خودرویی از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg venter med at overhale, til jeg kan give cyklisten god plads til siden.", "I wait to overtake until I can give the cyclist plenty of room to the side.",
    "صبر می‌کنم تا بتوانم از پهلو فاصله‌ی زیادی به دوچرخه‌سوار بدهم.",
    "Den, der overhaler, skal holde tilstrækkelig afstand til siden.", "The overtaking driver must keep enough distance to the side.", "سبقت‌گیرنده باید فاصله‌ی پهلوی کافی نگه دارد."),
  S(True, "Cyklisten kan svaje, fx i blæst eller for at undgå et hul i vejen.", "The cyclist may wobble, for example in the wind or to avoid a hole in the road.",
    "دوچرخه‌سوار ممکن است منحرف شود، مثلاً در باد یا برای دور زدن یک چاله.",
    "Derfor skal der være god plads mellem bilen og cyklisten.", "That is why there must be plenty of room between the car and the cyclist.", "به همین دلیل باید بین خودرو و دوچرخه‌سوار فاصله‌ی خوبی باشد."),
  S(False, "Jeg kan presse mig forbi, fordi cyklisten fylder så lidt.", "I can squeeze past because the cyclist takes up so little room.", "می‌توانم به زور رد شوم، چون دوچرخه‌سوار جای کمی می‌گیرد.",
    "En overhaling tæt på cyklisten kan få den til at vælte.", "Overtaking close to the cyclist can make them fall.", "سبقت از نزدیک ممکن است دوچرخه‌سوار را زمین بزند."),
  S(True, "Jeg kører et stykke bag cyklisten, til den modkørende er kørt forbi.", "I drive some way behind the cyclist until the oncoming car has passed.",
    "تا رد شدن خودروی روبه‌رو با فاصله پشت دوچرخه‌سوار می‌رانم.",
    "Så kan du overhale med god plads, når vejen er fri.", "Then you can overtake with plenty of room when the road is clear.", "این‌طور وقتی جاده خالی شد، با فاصله‌ی خوب سبقت می‌گیرید."),
)

Q(5110, "7.9", view("""
THE SCENE: a straight two-way country road; along the middle of the road run two unbroken white lines side by side (a double barrier
line). About 30 m ahead in our lane a slow green tractor. The oncoming lane is empty as far as can be seen.
MUST BE CLEARLY VISIBLE: the unbroken double centre line, the tractor, the empty oncoming lane.
MUST NOT APPEAR: signs, text."""),
  "Midt på vejen er der en dobbelt spærrelinje. Foran dig kører en langsom traktor. Hvad gælder?",
  "In the middle of the road there is a double barrier line. A slow tractor is driving in front of you. What applies?",
  "وسط جاده خط ممتد دوبل است. جلوی شما تراکتوری آهسته می‌رود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke overskride spærrelinjen for at overhale.", "I must not cross the barrier line to overtake.", "برای سبقت نباید از خط ممتد عبور کنم.",
    "En spærrelinje må ikke overskrides, heller ikke for at overhale en langsom traktor.", "A barrier line must not be crossed, not even to overtake a slow tractor.",
    "از خط ممتد نباید عبور کرد، حتی برای سبقت از یک تراکتور آهسته."),
  S(False, "Jeg må overhale, hvis traktoren kører under 30 km/t.", "I may overtake if the tractor is doing under 30 km/h.", "اگر تراکتور کمتر از ۳۰ کیلومتر بر ساعت برود، می‌توانم سبقت بگیرم.",
    "Der er ingen sådan undtagelse.", "There is no such exception.", "چنین استثنایی وجود ندارد."),
  S(False, "Jeg må overhale, når der ikke er modkørende.", "I may overtake when there is no oncoming traffic.", "وقتی ترافیک روبه‌رو نیست، می‌توانم سبقت بگیرم.",
    "Spærrelinjen gælder, også når vejen er fri.", "The barrier line applies even when the road is clear.", "خط ممتد حتی وقتی جاده خالی است هم معتبر است."),
  S(False, "Jeg må overhale, hvis jeg kun kører lidt ind over linjen.", "I may overtake if I only drive a little over the line.", "اگر فقط کمی روی خط بروم، می‌توانم سبقت بگیرم.",
    "Linjen må slet ikke overskrides.", "The line must not be crossed at all.", "اصلاً نباید از این خط عبور کرد."),
)

Q(5111, "7.9", town("""
THE SCENE: a quiet street in a residential area, one lane in each direction, no centre line. About 30 m ahead a crossroads with no
signs, no markings and no traffic lights; hedges on the corners. Ahead of us in our lane a slow small delivery van drives towards the
crossroads.
MUST BE CLEARLY VISIBLE: the unmarked crossroads, the slow van ahead.
MUST NOT APPEAR: signs, signals, text."""),
  "Du nærmer dig et kryds uden tavler og afmærkning. Foran dig kører en langsom varevogn. Hvad gælder?",
  "You are approaching a junction with no signs or markings. A slow van is driving in front of you. What applies?",
  "به تقاطعی بدون تابلو و خط‌کشی نزدیک می‌شوید. جلوی شما ونی آهسته می‌رود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke overhale varevognen i krydset.", "I must not overtake the van at the junction.", "در تقاطع نباید از ون سبقت بگیرم.",
    "Overhaling i vejkryds er forbudt, når der ikke gælder en af undtagelserne, fx at den tværgående trafik har ubetinget vigepligt.",
    "Overtaking at a junction is forbidden unless one of the exceptions applies, for example that the crossing traffic must give way unconditionally.",
    "سبقت در تقاطع ممنوع است، مگر یکی از استثناها برقرار باشد، مثلاً ترافیک متقاطع باید بی‌قیدوشرط راه بدهد."),
  S(False, "Jeg må overhale, fordi jeg kører på den største vej.", "I may overtake because I am on the bigger road.", "می‌توانم سبقت بگیرم، چون در جاده‌ی بزرگ‌تر هستم.",
    "Her gælder højrereglen; vejens størrelse giver ingen ret.", "The right-hand rule applies here; the size of the road gives no right.", "این‌جا قاعده‌ی دست راست برقرار است؛ بزرگی جاده حقی نمی‌دهد."),
  S(False, "Jeg må overhale, hvis jeg blinker i god tid.", "I may overtake if I signal in good time.", "اگر به موقع راهنما بزنم، می‌توانم سبقت بگیرم.",
    "Blinklyset ændrer ikke på forbuddet.", "The indicator does not change the ban.", "راهنما ممنوعیت را تغییر نمی‌دهد."),
)

Q(5112, "6.1", view("""
THE SCENE: a straight two-way country road outside town, fields on both sides. On the right verge stands a triangular warning sign
(white with a red border, point up) showing a black symbol of a cow (the livestock warning sign). There is no plate under the sign.
The road ahead looks empty.
MUST BE CLEARLY VISIBLE: the warning sign with the cow symbol, without a plate.
MUST NOT APPEAR: animals, other signs, text."""),
  "Du kører forbi denne advarselstavle uden for byen. Der er ingen undertavle. Hvad gælder?",
  "You pass this warning sign outside town. There is no plate under it. What applies?",
  "بیرون از شهر از کنار این تابلوی هشدار رد می‌شوید. زیرش تابلوی کوچکی نیست. چه قاعده‌ای برقرار است؟",
  S(True, "Faren er normalt mellem 150 og 250 m fremme.", "The danger is normally between 150 and 250 m ahead.", "خطر معمولاً ۱۵۰ تا ۲۵۰ متر جلوتر است.",
    "Uden for tættere bebygget område sættes advarselstavler normalt op mellem 150 og 250 m før farestedet.",
    "Outside built-up areas warning signs are normally put up between 150 and 250 m before the danger.",
    "بیرون از مناطق مسکونی، تابلوهای هشدار معمولاً ۱۵۰ تا ۲۵۰ متر پیش از محل خطر نصب می‌شوند."),
  S(True, "Der kan være kreaturer på vejen.", "There may be livestock on the road.", "ممکن است دام روی جاده باشد.",
    "Tavlen (A 27) advarer om kreaturer.", "The sign (A 27) warns of livestock.", "این تابلو (A 27) درباره‌ی دام هشدار می‌دهد."),
  S(False, "Faren er lige ved tavlen.", "The danger is right at the sign.", "خطر درست کنار تابلوست.",
    "Uden for byen står tavlen normalt et godt stykke før faren.", "Outside town the sign normally stands a good way before the danger.", "بیرون از شهر تابلو معمولاً مسافتی پیش از خطر است."),
  S(False, "Faren er mindst 1 km fremme.", "The danger is at least 1 km ahead.", "خطر دست‌کم ۱ کیلومتر جلوتر است.",
    "Er afstanden en anden end normalt, står den på en undertavle.", "If the distance is other than normal, it is shown on a plate under the sign.", "اگر فاصله غیرعادی باشد، روی تابلوی کوچک زیرین نوشته می‌شود."),
)

Q(5113, "6.1", view("""
THE SCENE: a two-way country road. On the right verge stands a round white sign with a thin black border, crossed by several thin
black diagonal lines from top right to bottom left (the Danish sign ending all local prohibitions). Behind us (not visible) was a
stretch with a no-overtaking sign and a 60 km/h speed limit.
MUST BE CLEARLY VISIBLE: the end-of-prohibitions sign.
MUST NOT APPEAR: other signs, text."""),
  "Du har kørt på en strækning med overhalingsforbud og en lokal hastighedsgrænse. Nu kører du forbi denne tavle. Hvad gælder?",
  "You have been driving on a stretch with a no-overtaking ban and a local speed limit. Now you pass this sign. What applies?",
  "در مسیری با ممنوعیت سبقت و حد سرعت محلی رانده‌اید. حالا از کنار این تابلو رد می‌شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Overhalingsforbuddet og den lokale hastighedsgrænse er ophævet.", "The no-overtaking ban and the local speed limit are lifted.", "ممنوعیت سبقت و حد سرعت محلی لغو شده‌اند.",
    "Tavlen (C 59) ophæver alle forbudstavler på den forudgående strækning undtagen standsnings- og parkeringsforbud.",
    "The sign (C 59) lifts all prohibition signs on the stretch before it except stopping and parking bans.",
    "این تابلو (C 59) همه‌ی تابلوهای ممنوعیت مسیر قبلی را، جز ممنوعیت توقف و پارک، لغو می‌کند."),
  S(True, "Et standsnings- eller parkeringsforbud gælder stadig.", "A stopping or parking ban still applies.", "ممنوعیت توقف یا پارک هنوز برقرار است.",
    "Standsnings- og parkeringsforbud ophæves ikke af denne tavle.", "Stopping and parking bans are not lifted by this sign.", "ممنوعیت توقف و پارک با این تابلو لغو نمی‌شود."),
  S(False, "Nu gælder der ingen hastighedsgrænse.", "Now there is no speed limit at all.", "حالا هیچ حد سرعتی وجود ندارد.",
    "Den generelle hastighedsgrænse gælder igen, fx 80 km/t uden for byen.", "The general speed limit applies again, for example 80 km/h outside town.",
    "حد سرعت عمومی دوباره برقرار است، مثلاً بیرون شهر ۸۰ کیلومتر بر ساعت."),
  S(False, "Tavlen betyder, at vejen snart ender.", "The sign means that the road ends soon.", "این تابلو یعنی جاده به‌زودی تمام می‌شود.",
    "Tavlen handler om forbud, ikke om vejens forløb.", "The sign is about prohibitions, not about where the road goes.", "این تابلو درباره‌ی ممنوعیت‌هاست، نه مسیر جاده."),
)

Q(5114, "6.1", town("""
THE SCENE: a town street; a side street goes off to the RIGHT. At the mouth of the side street stands a round red sign with a broad
white horizontal bar across the middle (the Danish no-entry sign), with no plate under it. In the side street a delivery van is parked
in front of a shop.
MUST BE CLEARLY VISIBLE: the no-entry sign at the side street, the shop in the side street.
MUST NOT APPEAR: other signs, text."""),
  "Du vil svinge ind på sidevejen med denne tavle for at aflevere en pakke i butikken. Hvad gælder?",
  "You want to turn into the side road with this sign to deliver a parcel at the shop. What applies?",
  "می‌خواهید وارد فرعی‌ای با این تابلو شوید تا بسته‌ای را به مغازه بدهید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre ind på vejen med noget køretøj.", "I must not drive into the road with any vehicle.", "با هیچ وسیله‌ای نباید وارد این راه شوم.",
    "Tavlen (C 19) forbyder indkørsel med ethvert køretøj.", "The sign (C 19) forbids entry with any vehicle.", "این تابلو (C 19) ورود با هر وسیله‌ای را ممنوع می‌کند."),
  S(False, "Jeg må køre ind, når jeg kun skal aflevere en pakke.", "I may drive in when I only have to deliver a parcel.", "وقتی فقط باید بسته‌ای بدهم، می‌توانم وارد شوم.",
    "Et kort ærinde er ikke en undtagelse fra forbuddet.", "A short errand is no exception to the ban.", "کار کوتاه از این ممنوعیت مستثنا نیست."),
  S(False, "Tavlen gælder kun for lastbiler.", "The sign only applies to lorries.", "این تابلو فقط برای کامیون‌هاست.",
    "Den gælder alle køretøjer, når der ikke er en undertavle.", "It applies to all vehicles when there is no plate under it.", "وقتی تابلوی زیرین نباشد، برای همه‌ی وسایل است."),
  S(False, "Jeg må køre ind, hvis der ikke kommer nogen ud.", "I may drive in if nobody is coming out.", "اگر کسی بیرون نیاید، می‌توانم وارد شوم.",
    "Forbuddet gælder, uanset om der er trafik.", "The ban applies whether or not there is traffic.", "این ممنوعیت، چه ترافیک باشد چه نباشد، برقرار است."),
)

Q(5115, "6.1", town("""
THE SCENE: we approach a junction in town in the middle of our road. On the right at the junction stands a round white sign with a
red border showing a black arrow turning to the LEFT, crossed by a red diagonal bar (the Danish no-left-turn sign). The road ahead
continues straight; side roads go off to the left and right.
MUST BE CLEARLY VISIBLE: the no-left-turn sign, the junction.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle ved et kryds. Hvad gælder?",
  "You pass this sign at a junction. What applies?",
  "در یک تقاطع از کنار این تابلو رد می‌شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke svinge til venstre i krydset.", "I must not turn left at the junction.", "در این تقاطع نباید به چپ بپیچم.",
    "Tavlen (C 11) forbyder venstresving i det kryds, hvor den står.", "The sign (C 11) forbids turning left at the junction where it stands.", "این تابلو (C 11) گردش به چپ را در همان تقاطع ممنوع می‌کند."),
  S(True, "Jeg må heller ikke vende i krydset.", "I must not turn round at the junction either.", "در این تقاطع دور زدن هم ممنوع است.",
    "Forbuddet mod venstresving gælder også vending.", "The ban on turning left also covers turning round.", "ممنوعیت گردش به چپ شامل دور زدن هم می‌شود."),
  S(False, "Forbuddet gælder frem til næste kryds.", "The ban applies up to the next junction.", "این ممنوعیت تا تقاطع بعدی است.",
    "Forbuddet gælder kun i det kryds, hvor tavlen er sat op.", "The ban only applies at the junction where the sign is put up.", "این ممنوعیت فقط در همان تقاطعی است که تابلو نصب شده."),
  S(False, "Jeg må svinge til venstre, hvis der ikke er modkørende.", "I may turn left if there is no oncoming traffic.", "اگر ترافیک روبه‌رو نباشد، می‌توانم به چپ بپیچم.",
    "Forbuddet gælder, uanset trafikken.", "The ban applies whatever the traffic.", "این ممنوعیت، ترافیک هر چه باشد، برقرار است."),
)

Q(5116, "6.1", view("""
THE SCENE: a two-way road outside town just after a crossroads: we have just driven across the junction. Behind us, before the
junction (not visible), stood a 60 km/h speed-limit sign. Ahead the road continues straight with no signs at all.
MUST BE CLEARLY VISIBLE: the empty road ahead without signs, the side roads of the junction we have just crossed at the edges of
the picture.
MUST NOT APPEAR: signs, text."""),
  "Før krydset kørte du forbi en tavle med 60 km/t. Efter krydset er der ingen nye tavler. Hvad gælder?",
  "Before the junction you passed a 60 km/h sign. After the junction there are no new signs. What applies?",
  "پیش از تقاطع از کنار تابلوی ۶۰ کیلومتر بر ساعت رد شدید. بعد از تقاطع تابلوی تازه‌ای نیست. چه قاعده‌ای برقرار است؟",
  S(True, "Grænsen på 60 km/t gælder stadig.", "The 60 km/h limit still applies.", "حد ۶۰ کیلومتر بر ساعت هنوز برقرار است.",
    "En lokal hastighedsgrænse gælder, til den ophæves af en ophørstavle, en afstand på en undertavle eller en anden grænse.",
    "A local speed limit applies until it is lifted by an end sign, a distance on a plate or another limit.",
    "حد سرعت محلی تا وقتی تابلوی پایان، فاصله‌ی روی تابلوی زیرین یا حد دیگری آن را لغو کند، برقرار است."),
  S(False, "Grænsen ophører i krydset, ligesom de fleste andre forbud.", "The limit ends at the junction, like most other bans.", "این حد، مثل بیشتر ممنوعیت‌ها، در تقاطع تمام می‌شود.",
    "Hastighedsgrænser fortsætter efter kryds; det gør de fleste andre forbud ikke.", "Speed limits continue after junctions; most other bans do not.", "حد سرعت بعد از تقاطع ادامه دارد؛ بیشتر ممنوعیت‌های دیگر نه."),
  S(False, "Nu gælder 80 km/t, fordi jeg er uden for byen.", "Now 80 km/h applies because I am outside town.", "حالا ۸۰ کیلومتر بر ساعت معتبر است، چون بیرون شهرم.",
    "Den lokale grænse gælder, indtil den bliver ophævet.", "The local limit applies until it is lifted.", "حد محلی تا لغو شدنش برقرار است."),
)

Q(5117, "7.6", town("""
THE SCENE: a town street, one lane in each direction. About 30 m ahead a city bus has stopped at a bus stop at the right kerb; its
doors are open and passengers are getting off. Behind the bus the view of the pavement is hidden. The bus's LEFT indicator is not yet
flashing.
MUST BE CLEARLY VISIBLE: the bus at the stop with open doors, the passengers getting off.
MUST NOT APPEAR: signs, text."""),
  "En bus holder ved stoppestedet foran dig, og passagerer stiger af. Hvordan forholder du dig?",
  "A bus is standing at the stop in front of you, and passengers are getting off. What do you do?",
  "اتوبوسی جلوی شما در ایستگاه ایستاده و مسافران پیاده می‌شوند. چه می‌کنید؟",
  S(True, "Jeg sænker farten, fordi passagerer kan gå ud på kørebanen foran bussen.", "I slow down because passengers may step out into the road in front of the bus.",
    "سرعتم را کم می‌کنم، چون ممکن است مسافران از جلوی اتوبوس وارد سواره‌رو شوند.",
    "Når du nærmer dig en bus, der holder for at sætte passagerer af, skal hastigheden være passende lav.",
    "When you approach a bus that has stopped to let passengers off, your speed must be suitably low.",
    "وقتی به اتوبوسی نزدیک می‌شوید که برای پیاده کردن مسافر ایستاده، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Blinker bussen til venstre for at køre ud, lader jeg den komme ud.", "If the bus signals left to pull out, I let it out.", "اگر اتوبوس برای حرکت راهنمای چپ بزند، می‌گذارم بیرون بیاید.",
    "I tættere bebygget område skal du give plads til en bus, der giver tegn til at køre ud fra et stoppested.",
    "In built-up areas you must make room for a bus that signals to pull out from a stop.",
    "در مناطق مسکونی باید به اتوبوسی که برای حرکت از ایستگاه علامت می‌دهد، جا بدهید."),
  S(False, "Jeg kører forbi med uændret fart, fordi bussen holder stille.", "I drive past at the same speed because the bus is standing still.", "با همان سرعت رد می‌شوم، چون اتوبوس ایستاده است.",
    "Netop når bussen holder, kan der komme passagerer ud foran den.", "It is precisely when the bus is standing that passengers may come out in front of it.",
    "درست وقتی اتوبوس ایستاده، ممکن است مسافران از جلویش بیرون بیایند."),
  S(False, "Passagererne skal vente, så jeg behøver ikke tage hensyn.", "The passengers have to wait, so I need not take care.", "مسافران باید صبر کنند، پس لازم نیست ملاحظه کنم.",
    "Du skal altid vise hensyn over for gående, også dem, der går ud ved en bus.", "You must always show consideration for pedestrians, including those stepping out by a bus.",
    "همیشه باید به عابران ملاحظه کنید، از جمله کسانی که کنار اتوبوس وارد جاده می‌شوند."),
)

Q(5118, "7.6", view("""
THE SCENE: a narrow two-way country road between fields, one lane in each direction. About 40 m ahead two riders on horses ride at the
right edge of our lane, one behind the other, wearing reflective vests. The oncoming lane is empty.
MUST BE CLEARLY VISIBLE: the two riders on horses at the right edge.
MUST NOT APPEAR: signs, text."""),
  "Foran dig rider to ryttere i vejkanten. Hvordan forholder du dig?",
  "Two riders on horseback are riding at the edge of the road in front of you. What do you do?",
  "جلوی شما دو سوارکار کنار جاده اسب‌سواری می‌کنند. چه می‌کنید؟",
  S(True, "Jeg sænker farten i god tid.", "I slow down in good time.", "به موقع سرعتم را کم می‌کنم.",
    "Når du nærmer dig heste på vejen, skal hastigheden være passende lav.", "When you approach horses on the road, your speed must be suitably low.", "وقتی به اسب‌ها روی جاده نزدیک می‌شوید، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Jeg kører forbi i god afstand og roligt.", "I pass at a good distance and calmly.", "با فاصله‌ی زیاد و آرام رد می‌شوم.",
    "En hest kan blive bange og springe til siden.", "A horse may take fright and jump to the side.", "اسب ممکن است بترسد و به کنار بپرد."),
  S(True, "Jeg undgår at dytte eller give gas tæt ved hestene.", "I avoid sounding the horn or revving up close to the horses.", "از بوق زدن یا گاز دادن نزدیک اسب‌ها پرهیز می‌کنم.",
    "Pludselige lyde kan skræmme hestene.", "Sudden noises can frighten the horses.", "صداهای ناگهانی می‌تواند اسب‌ها را بترساند."),
  S(False, "Hestene er vant til trafik, så jeg kan køre tæt forbi.", "The horses are used to traffic, so I can drive close past them.", "اسب‌ها به ترافیک عادت دارند، پس می‌توانم از نزدیک رد شوم.",
    "Du kan aldrig vide, hvordan en hest reagerer.", "You can never know how a horse will react.", "هرگز نمی‌دانید اسب چه واکنشی نشان می‌دهد."),
)

Q(5119, "7.6", view("""
THE SCENE: a dark, unlit two-way country road at night without a pavement. About 50 m ahead, at the LEFT edge of the road, two
pedestrians in dark clothes walk towards us on the road, only faintly visible in our dipped headlights; one of them wears a small
reflector that shines brightly.
MUST BE CLEARLY VISIBLE: the two pedestrians at the left edge, faint in the light, the bright reflector.
MUST NOT APPEAR: street lamps, signs, text.""", cond="night, dark unlit road, dry"),
  "Det er mørkt, og to fodgængere går i vejens venstre side og kommer imod dig. Hvordan forholder du dig?",
  "It is dark, and two pedestrians are walking on the left side of the road towards you. What do you do?",
  "هوا تاریک است و دو عابر در سمت چپ جاده به سمت شما می‌آیند. چه می‌کنید؟",
  S(True, "Jeg sænker farten og giver dem god plads, når jeg kører forbi.", "I slow down and give them plenty of room when I pass.", "سرعتم را کم می‌کنم و هنگام عبور جای زیادی به آن‌ها می‌دهم.",
    "Du skal give de gående tid til at vige og fornøden plads på vejen.", "You must give pedestrians time to step aside and the room they need on the road.",
    "باید به عابران فرصت کنار رفتن و جای لازم روی جاده بدهید."),
  S(False, "De går forkert, fordi de går i venstre side.", "They are walking wrongly because they are on the left side.", "اشتباه می‌روند، چون در سمت چپ‌اند.",
    "Gående på en vej uden fortov skal gå i venstre side, imod trafikken.", "Pedestrians on a road without a pavement must walk on the left, facing the traffic.",
    "عابران در جاده‌ی بدون پیاده‌رو باید سمت چپ و رو به ترافیک راه بروند."),
  S(True, "Mørkt tøj gør dem svære at se, så jeg må regne med, at der kan være flere.", "Dark clothes make them hard to see, so I must expect that there may be more.",
    "لباس تیره دیدنشان را سخت می‌کند، پس باید انتظار داشته باشم عابران دیگری هم باشند.",
    "Gående uden refleks ses først meget sent i nærlys.", "Pedestrians without reflectors are seen only very late in dipped beam.", "عابران بدون شبرنگ در نور پایین خیلی دیر دیده می‌شوند."),
  S(False, "Jeg dytter, så de går ud i rabatten.", "I sound the horn so that they move onto the verge.", "بوق می‌زنم تا به کنار جاده بروند.",
    "Hornet bruges kun for at afværge fare; sænk i stedet farten.", "The horn is only for averting danger; slow down instead.", "بوق فقط برای دفع خطر است؛ به‌جایش سرعت را کم کنید."),
)

Q(5120, "7.6", view("""
THE SCENE: a two-way country road. About 60 m ahead a car has gone off the road into the right verge and stands at an angle; a police
car with flashing blue lights stands behind it, and a police officer in a high-visibility vest stands at the edge of our lane waving
traffic slowly past in our lane. Two people stand beside the damaged car.
MUST BE CLEARLY VISIBLE: the accident car, the police car, the officer waving traffic past.
MUST NOT APPEAR: injured people, text."""),
  "Du kommer til et uheldssted, hvor politiet dirigerer trafikken forbi. Hvordan forholder du dig?",
  "You come to the scene of an accident where the police are directing traffic past. What do you do?",
  "به محل تصادفی می‌رسید که پلیس ترافیک را از کنارش هدایت می‌کند. چه می‌کنید؟",
  S(True, "Jeg sænker farten, når jeg kører forbi uheldsstedet.", "I slow down when I drive past the accident.", "هنگام عبور از کنار محل تصادف سرعتم را کم می‌کنم.",
    "Forbi et uheldssted skal hastigheden være passende lav.", "Past an accident your speed must be suitably low.", "هنگام عبور از محل تصادف سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Jeg følger politiets anvisninger.", "I follow the police's directions.", "از دستور پلیس پیروی می‌کنم.",
    "Politiets anvisninger skal efterkommes.", "The police's directions must be obeyed.", "دستور پلیس باید اجرا شود."),
  S(False, "Jeg kører langsomt forbi og filmer uheldet med telefonen.", "I drive past slowly and film the accident with my phone.", "آهسته رد می‌شوم و با تلفن از تصادف فیلم می‌گیرم.",
    "Du må ikke bruge håndholdt telefon under kørsel, og du skal holde opmærksomheden på vejen.", "You must not use a hand-held phone while driving, and you must keep your attention on the road.",
    "در حین رانندگی نباید از تلفن دستی استفاده کنید و باید حواستان به جاده باشد."),
  S(False, "Jeg standser for at se, hvad der er sket, selv om politiet har styr på det.", "I stop to see what has happened, even though the police have it in hand.",
    "می‌ایستم تا ببینم چه شده، با آن‌که پلیس اوضاع را در دست دارد.",
    "Nysgerrige, der standser, kan skabe nye uheld og hindre redningsarbejdet.", "Curious drivers who stop can cause new accidents and hinder the rescue work.",
    "کنجکاوهایی که می‌ایستند، ممکن است باعث تصادف تازه شوند و کار امداد را مختل کنند."),
)

Q(5121, "7.3", view("""
THE SCENE: a straight two-way country road outside town, one lane in each direction, a broken centre line, fields on both sides, no
houses. No speed-limit signs anywhere in sight.
MUST BE CLEARLY VISIBLE: the open country road without signs.
MUST NOT APPEAR: signs, text."""),
  "Du kører i en almindelig personbil uden for tættere bebygget område. Der er ingen hastighedstavler. Hvad er den højst tilladte hastighed?",
  "You are driving an ordinary car outside a built-up area. There are no speed-limit signs. What is the highest permitted speed?",
  "با یک سواری معمولی بیرون از منطقه‌ی مسکونی می‌رانید. تابلوی سرعتی نیست. حداکثر سرعت مجاز چقدر است؟",
  S(True, "80 km/t.", "80 km/h.", "۸۰ کیلومتر بر ساعت.",
    "Uden for tættere bebygget område er den generelle grænse 80 km/t.", "Outside built-up areas the general limit is 80 km/h.", "بیرون از مناطق مسکونی حد عمومی ۸۰ کیلومتر بر ساعت است."),
  S(False, "70 km/t.", "70 km/h.", "۷۰ کیلومتر بر ساعت.",
    "70 km/t gælder kun, hvor det er skiltet.", "70 km/h only applies where it is signed.", "۷۰ کیلومتر بر ساعت فقط جایی است که تابلو داشته باشد."),
  S(False, "90 km/t.", "90 km/h.", "۹۰ کیلومتر بر ساعت.",
    "90 km/t gælder kun, hvor det er skiltet.", "90 km/h only applies where it is signed.", "۹۰ کیلومتر بر ساعت فقط جایی است که تابلو داشته باشد."),
  S(False, "100 km/t.", "100 km/h.", "۱۰۰ کیلومتر بر ساعت.",
    "100 km/t er ikke den generelle grænse på landevej.", "100 km/h is not the general limit on a country road.", "۱۰۰ کیلومتر بر ساعت حد عمومی جاده‌ی بیرون شهر نیست."),
)

Q(5122, "7.3", view("""
THE SCENE: a two-way country road in thick fog: visibility is only about 50 m; the edge lines and the broken centre line fade into
grey fog ahead, and the red rear lights of a car ahead are just visible as a faint glow far away.
MUST BE CLEARLY VISIBLE: the thick fog, the fading road markings, the faint rear lights ahead.
MUST NOT APPEAR: signs, text.""", cond="thick fog, visibility about 50 m, daytime"),
  "Der er tæt tåge, og du kan kun se omkring 50 m frem. Hvordan forholder du dig?",
  "There is thick fog, and you can only see about 50 m ahead. What do you do?",
  "مه غلیظ است و فقط حدود ۵۰ متر جلو را می‌بینید. چه می‌کنید؟",
  S(True, "Jeg kører så langsomt, at jeg kan standse på den strækning, jeg kan se.", "I drive so slowly that I can stop within the distance I can see.",
    "آن‌قدر آهسته می‌رانم که بتوانم در فاصله‌ای که می‌بینم بایستم.",
    "Du skal kunne standse på den del af vejen, du har udsyn over.", "You must be able to stop within the part of the road you can see.", "باید بتوانید در بخشی از جاده که می‌بینید بایستید."),
  S(True, "Jeg holder større afstand til bilen foran.", "I keep a greater distance to the car in front.", "فاصله‌ی بیشتری با خودروی جلو نگه می‌دارم.",
    "I tåge har du brug for mere tid til at reagere.", "In fog you need more time to react.", "در مه به زمان بیشتری برای واکنش نیاز دارید."),
  S(False, "Jeg tænder fjernlyset for at se længere.", "I switch on the high beam to see further.", "نور بالا را روشن می‌کنم تا دورتر را ببینم.",
    "I tåge reflekteres fjernlyset og blænder dig selv.", "In fog the high beam is reflected and dazzles you yourself.", "در مه نور بالا بازتاب می‌شود و خودتان را خیره می‌کند."),
  S(True, "Jeg må bruge tågelygter.", "I may use fog lights.", "می‌توانم از چراغ مه‌شکن استفاده کنم.",
    "Tågelygter må bruges i tåge og under kraftig nedbør.", "Fog lights may be used in fog and heavy precipitation.", "چراغ مه‌شکن در مه و بارش شدید مجاز است."),
)

Q(5123, "7.3", town("""
THE SCENE: a town street after heavy rain: big puddles of water lie along the right kerb in our lane. On the pavement right next to
the puddles several pedestrians walk, one with a pram.
MUST BE CLEARLY VISIBLE: the puddles by the kerb, the pedestrians on the pavement next to them.
MUST NOT APPEAR: signs, text.""", cond="overcast after heavy rain, wet road"),
  "Der står store vandpytter langs kantstenen, og der går fodgængere på fortovet. Hvordan forholder du dig?",
  "There are big puddles along the kerb, and pedestrians are walking on the pavement. What do you do?",
  "کنار جدول چاله‌های بزرگ آب است و عابران در پیاده‌رو راه می‌روند. چه می‌کنید؟",
  S(True, "Jeg sænker farten, så jeg ikke sprøjter vand på dem.", "I slow down so that I do not splash water on them.", "سرعتم را کم می‌کنم تا آب روی آن‌ها نپاشد.",
    "I dårligt føre skal du afpasse hastigheden, så andre så vidt muligt ikke bliver tilstænket.",
    "In poor conditions you must adjust your speed so that others are not splashed as far as possible.",
    "در شرایط بد باید سرعت را طوری تنظیم کنید که تا جای ممکن آب روی دیگران پاشیده نشود."),
  S(False, "Det er fodgængernes eget ansvar at holde afstand til vandet.", "It is the pedestrians' own job to keep away from the water.", "دور ماندن از آب وظیفه‌ی خود عابران است.",
    "Det er den kørendes pligt at undgå at tilstænke andre.", "It is the driver's duty to avoid splashing others.", "وظیفه‌ی راننده است که آب روی دیگران نپاشد."),
  S(False, "Jeg kører hurtigt forbi, så det er hurtigt overstået.", "I drive past fast so that it is over quickly.", "تند رد می‌شوم تا زود تمام شود.",
    "Høj fart sprøjter mest.", "High speed splashes the most.", "سرعت زیاد بیشترین آب را می‌پاشد."),
)

Q(5124, "1.2", picture("""
The back of a RED car seen from behind: a bicycle rack is mounted on the tow bar with two bicycles on it; the bicycles cover most of the
car's rear number plate and its left rear light. The rack has no number plate and no lights of its own.
MUST BE CLEARLY VISIBLE: the bicycles covering the number plate and a rear light.
MUST NOT APPEAR: readable letters or numbers, people, text."""),
  "Cyklerne på din cykelholder dækker bilens nummerplade og den ene baglygte. Hvad gælder?",
  "The bicycles on your bike rack cover the car's number plate and one of the rear lights. What applies?",
  "دوچرخه‌های روی دوچرخه‌بر، پلاک خودرو و یکی از چراغ‌های عقب را پوشانده‌اند. چه قاعده‌ای برقرار است؟",
  S(True, "Lasten må ikke skjule nummerpladen eller de påbudte lygter.", "The load must not cover the number plate or the required lights.", "بار نباید پلاک یا چراغ‌های الزامی را بپوشاند.",
    "Gods skal anbringes, så påbudte lygter og nummerpladen ikke skjules.", "Goods must be placed so that the required lights and the number plate are not covered.",
    "بار باید طوری گذاشته شود که چراغ‌های الزامی و پلاک پوشانده نشوند."),
  S(True, "Jeg kan bruge en ekstra nummerplade på cykelholderen.", "I can use an extra number plate on the bike rack.", "می‌توانم روی دوچرخه‌بر یک پلاک اضافه بگذارم.",
    "En ekstra (tredje) nummerplade skal bruges, når bilens bageste nummerplade er helt eller delvis dækket.",
    "An extra (third) number plate must be used when the car's rear number plate is fully or partly covered.",
    "وقتی پلاک عقب خودرو کاملاً یا تا حدی پوشیده است، باید از پلاک اضافه (سوم) استفاده کرد."),
  S(False, "Det er tilladt, hvis jeg højst kører 50 km/t.", "It is allowed if I drive at most 50 km/h.", "اگر حداکثر ۵۰ کیلومتر بر ساعت بروم، مجاز است.",
    "Reglen gælder uanset farten.", "The rule applies whatever the speed.", "این قاعده، سرعت هر چه باشد، برقرار است."),
  S(False, "Det er tilladt, når cyklerne er spændt godt fast.", "It is allowed when the bicycles are firmly strapped on.", "وقتی دوچرخه‌ها محکم بسته شده‌اند، مجاز است.",
    "Lasten skal både sidde fast og lade lygter og nummerplade være synlige.", "The load must both be secure and leave the lights and number plate visible.",
    "بار هم باید محکم باشد و هم چراغ‌ها و پلاک را نپوشاند."),
)

Q(5125, "1.2", picture("""
A simple illustration of the dashboard and steering wheel of a car seen from the driver's seat, with a few warning lamps lit on the
instrument panel as simple symbols (an indicator arrow, a headlight symbol), and through the windscreen a garage wall: the car is
about to set off.
MUST BE CLEARLY VISIBLE: the steering wheel, the instrument panel with lamps.
MUST NOT APPEAR: brand names, readable text."""),
  "Du skal til at køre. Hvad skal du som fører holde øje med, at bilen er i orden?",
  "You are about to drive. What must you as the driver check that the car is in order?",
  "می‌خواهید راه بیفتید. به‌عنوان راننده باید مراقب سالم بودن چه چیزهایی در خودرو باشید؟",
  S(True, "Bremserne.", "The brakes.", "ترمزها.",
    "Føreren skal hele tiden påse, at styre-, bremse-, signal- og tegngivningsapparater samt lygter er i forsvarlig stand.",
    "The driver must always see to it that the steering, brakes, signalling equipment and lights are in a safe condition.",
    "راننده باید همیشه مراقب باشد فرمان، ترمز، وسایل علامت‌دهی و چراغ‌ها در وضعیت ایمنی باشند."),
  S(True, "Lygterne og blinklysene.", "The lights and the indicators.", "چراغ‌ها و راهنماها.",
    "Bilen skal kunne ses, og dine tegn skal kunne forstås.", "The car must be visible and your signals understood.", "خودرو باید دیده شود و علامت‌هایتان فهمیده شود."),
  S(True, "Styretøjet.", "The steering.", "فرمان.",
    "Fejl i styretøjet kan gøre bilen umulig at styre.", "A fault in the steering can make the car impossible to steer.", "عیب فرمان ممکن است هدایت خودرو را ناممکن کند."),
  S(False, "Intet; det er kun ejerens ansvar.", "Nothing; it is only the owner's job.", "هیچ؛ این فقط وظیفه‌ی مالک است.",
    "Ejeren har ansvaret for bilens lovlige stand, men føreren skal også selv kontrollere den.", "The owner is responsible for the car's lawful condition, but the driver must check it too.",
    "مالک مسئول وضعیت قانونی خودروست، ولی راننده هم باید خودش آن را بررسی کند."),
)
