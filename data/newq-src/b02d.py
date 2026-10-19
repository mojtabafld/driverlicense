# «آزمون جدید», batch 2 (5101–5200), part d: lane choice and merging (7.4), starting and stopping (7.1), position on the
# road (7.2), lights (7.19), the motorway (7.16), emergency vehicles and the horn (6.2), roundabouts (7.15), road risks
# (5.2), distance (7.8), turning round (7.5), the vehicle (1.2), meeting (7.7).
# Rules: Færdselsloven §§ 7, 15, 16, 18, 20, 28, 32, 33, 33 a, 46, 82; Bekendtgørelse om vejafmærkning (B 15, B 19, D 12,
# Q 44); FDM / Rådet for Sikker Trafik on following distance.
from nq import Q, S, above, picture, town, view

Q(5176, "7.4", above("""
THE SCENE: a road seen from above with TWO lanes in our direction before a junction (a broken lane line between them); straight on the
road continues with two lanes, side roads go off to the left and right.
VEHICLES (colour code used strictly): a RED car (ours) in the right lane, going straight on (a SOLID GREEN arrow straight through the
junction); a GREY car in the left lane, also going straight on; a DASHED ORANGE arrow from the red car swerving into the left lane
inside the junction.
MUST NOT APPEAR: lane arrows, signs, text."""),
  "Vejen har to vognbaner i din retning før krydset, og du skal ligeud. Hvad gælder?",
  "The road has two lanes in your direction before the junction, and you are going straight on. What applies?",
  "جاده پیش از تقاطع در جهت شما دو خط دارد و می‌خواهید مستقیم بروید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg kan bruge den vognbane, der passer bedst til trafikken og min videre kørsel.", "I can use the lane that best suits the traffic and where I am going next.",
    "می‌توانم از خطی استفاده کنم که با ترافیک و ادامه‌ی مسیرم بیشتر جور است.",
    "Skal du ligeud, kan du bruge den vognbane, der er mest hensigtsmæssig.", "If you are going straight on, you may use the lane that is most suitable.", "اگر مستقیم می‌روید، می‌توانید از مناسب‌ترین خط استفاده کنید."),
  S(True, "Jeg vælger vognbane i god tid før krydset.", "I choose my lane in good time before the junction.", "به موقع پیش از تقاطع خطم را انتخاب می‌کنم.",
    "Placeringen skal ske i god tid før vejkrydset.", "You must take up your position in good time before the junction.", "قرار گرفتن در خط باید به موقع پیش از تقاطع انجام شود."),
  S(False, "Jeg skal altid bruge den venstre vognbane, når jeg skal ligeud.", "I must always use the left lane when I am going straight on.", "وقتی مستقیم می‌روم، همیشه باید از خط چپ استفاده کنم.",
    "Der er ingen sådan regel; vælg den mest hensigtsmæssige vognbane.", "There is no such rule; choose the most suitable lane.", "چنین قاعده‌ای نیست؛ مناسب‌ترین خط را انتخاب کنید."),
  S(False, "Jeg skifter vognbane inde i krydset, hvis den anden vognbane kører hurtigere.", "I change lanes inside the junction if the other lane is moving faster.",
    "اگر خط دیگر سریع‌تر حرکت کند، داخل تقاطع خطم را عوض می‌کنم.",
    "Et vognbaneskift i krydset kan overraske dem ved siden af dig og skabe fare.", "A lane change in the junction can surprise those beside you and cause danger.",
    "تغییر خط داخل تقاطع ممکن است کناری‌ها را غافلگیر کند و خطر بسازد."),
)

Q(5177, "7.4", above("""
THE SCENE: a road seen from above with TWO lanes in our direction approaching a junction; for the last 80 m before the junction the
two lanes are separated by an UNBROKEN white line instead of the broken one further back.
VEHICLES (colour code used strictly): a RED car (ours) in the right lane, alongside the unbroken line; a DASHED ORANGE arrow shows it
moving across the unbroken line into the left lane.
MUST NOT APPEAR: signs, text."""),
  "Mellem din vognbane og vognbanen til venstre er der nu en ubrudt linje. Du vil gerne over i venstre vognbane. Hvad gælder?",
  "Between your lane and the lane to the left there is now an unbroken line. You would like to move into the left lane. What applies?",
  "اکنون بین خط شما و خط سمت چپ یک خط ممتد است. می‌خواهید به خط چپ بروید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke skifte vognbane over den ubrudte linje.", "I must not change lanes across the unbroken line.", "نباید از روی خط ممتد تغییر خط بدهم.",
    "En spærrelinje adskiller vognbanerne og må ikke overskrides.", "A barrier line separates the lanes and must not be crossed.", "خط ممتد خط‌ها را از هم جدا می‌کند و نباید از آن رد شد."),
  S(False, "Jeg må skifte, hvis jeg blinker i god tid.", "I may change if I signal in good time.", "اگر به موقع راهنما بزنم، می‌توانم خطم را عوض کنم.",
    "Blinklyset gør det ikke tilladt at overskride spærrelinjen.", "The indicator does not make it allowed to cross the barrier line.", "راهنما عبور از خط ممتد را مجاز نمی‌کند."),
  S(False, "Linjen gælder kun for lastbiler.", "The line only applies to lorries.", "این خط فقط برای کامیون‌هاست.",
    "Linjen gælder alle kørende.", "The line applies to all drivers.", "این خط برای همه‌ی رانندگان است."),
)

Q(5178, "7.4", view("""
THE SCENE: a road where our carriageway is about to join another carriageway coming in from the right; ahead the two become one road.
On the right verge stands an upright white rectangular sign with a thin red border showing a red symbol of two lanes joining into one,
pointing up (the Danish merge sign). Cars on the other carriageway approach the merging point beside us.
MUST BE CLEARLY VISIBLE: the merge sign, the two carriageways joining ahead, the cars on the other carriageway.
MUST NOT APPEAR: give-way signs, shark teeth, text."""),
  "Du kører forbi denne tavle, og to kørebaner løber sammen længere fremme. Hvad gælder?",
  "You pass this sign, and two carriageways join further ahead. What applies?",
  "از کنار این تابلو رد می‌شوید و کمی جلوتر دو سواره‌رو به هم می‌پیوندند. چه قاعده‌ای برقرار است؟",
  S(True, "Kørebanerne løber sammen længere fremme.", "The carriageways join further ahead.", "سواره‌روها کمی جلوتر به هم می‌پیوندند.",
    "Tavlen (B 15) angiver, at kørebaner løber sammen.", "The sign (B 15) shows that carriageways join.", "این تابلو (B 15) نشان می‌دهد سواره‌روها به هم می‌پیوندند."),
  S(True, "Vi skal under gensidig hensyntagen lette sammenfletningen.", "We must make the merging easier with mutual consideration.", "باید با ملاحظه‌ی متقابل ادغام را آسان کنیم.",
    "Ved tavlen skal trafikanterne under gensidig hensyntagen lette sammenfletningen.", "At the sign road users must make the merging easier with mutual consideration.",
    "کنار این تابلو کاربران راه باید با ملاحظه‌ی متقابل ادغام را آسان کنند."),
  S(True, "Jeg tilpasser farten, så jeg kan flette ind i et hul.", "I adjust my speed so that I can merge into a gap.", "سرعتم را تنظیم می‌کنم تا در یک فاصله ادغام شوم.",
    "Med passende fart og afstand kan begge kørebaners trafik glide sammen.", "With a suitable speed and distance the traffic from both carriageways can flow together.",
    "با سرعت و فاصله‌ی مناسب، ترافیک هر دو سواره‌رو روان به هم می‌پیوندد."),
  S(False, "Den, der kører på den største vej, har altid forkørselsret.", "Whoever is on the bigger road always has the right of way.", "هر که در جاده‌ی بزرگ‌تر باشد، همیشه حق تقدم دارد.",
    "Ved sammenfletning skal begge parter vise hensyn.", "When merging, both sides must show consideration.", "در ادغام هر دو طرف باید ملاحظه کنند."),
)

Q(5179, "7.1", view("""
THE SCENE: we are parked at the right kerb of a town street, about to drive off; our left indicator lamp glows on the dashboard strip.
In the left door mirror (at the left edge of the picture) a car is visible approaching from behind in our lane, about 40 m away.
MUST BE CLEARLY VISIBLE: the approaching car in the left door mirror, the kerb on our right.
MUST NOT APPEAR: signs, text.""", scenery="Scenery is reduced to simple flat house fronts, pavements and a few trees."),
  "Du holder ved kantstenen og vil køre ud. En bil nærmer sig bagfra. Hvordan forholder du dig?",
  "You are standing at the kerb and want to drive off. A car is approaching from behind. What do you do?",
  "کنار جدول ایستاده‌اید و می‌خواهید حرکت کنید. خودرویی از پشت نزدیک می‌شود. چه می‌کنید؟",
  S(True, "Jeg venter, til bilen er kørt forbi.", "I wait until the car has gone past.", "صبر می‌کنم تا آن خودرو رد شود.",
    "Du må kun køre ud fra vejkanten, når det kan ske uden fare eller unødig ulempe for andre.", "You may only pull away from the kerb when it can be done without danger or undue inconvenience to others.",
    "فقط وقتی می‌توانید از کنار جاده حرکت کنید که برای دیگران خطر یا مزاحمت بی‌جا نداشته باشد."),
  S(True, "Jeg giver tegn, før jeg kører ud fra kanten.", "I signal before I pull away from the kerb.", "پیش از حرکت از کنار جدول علامت می‌دهم.",
    "Du skal give tegn før igangsætning fra vejkanten.", "You must signal before pulling away from the edge of the road.", "پیش از حرکت از کنار جاده باید علامت بدهید."),
  S(False, "Bilen bag mig skal sænke farten, når jeg blinker.", "The car behind me must slow down when I signal.", "خودروی پشتی وقتی راهنما بزنم باید سرعتش را کم کند.",
    "Blinklyset giver dig ikke ret til at køre ud.", "The indicator does not give you the right to pull out.", "راهنما به شما حق حرکت نمی‌دهد."),
  S(False, "Jeg kører hurtigt ud foran bilen.", "I pull out quickly in front of the car.", "سریع جلوی آن خودرو بیرون می‌روم.",
    "Bilen kan blive tvunget til at bremse eller svinge ud.", "The car may be forced to brake or swerve.", "ممکن است آن خودرو مجبور به ترمز یا انحراف شود."),
)

Q(5180, "7.1", view("""
THE SCENE: we are parked at the right kerb of a steep street going UP a hill in town; the road rises in front of us. Our left indicator
lamp glows on the dashboard strip. The street behind us (in the left door mirror at the left edge of the picture) is empty.
MUST BE CLEARLY VISIBLE: the steep uphill street ahead, the empty street in the door mirror.
MUST NOT APPEAR: other vehicles, signs, text.""", scenery="Scenery is reduced to simple flat house fronts, pavements and a few trees."),
  "Du holder ved kantstenen på en stejl vej op ad bakke og skal køre ud. Hvordan forholder du dig?",
  "You are standing at the kerb on a steep road uphill and are going to drive off. What do you do?",
  "کنار جدول در سربالایی تندی ایستاده‌اید و می‌خواهید حرکت کنید. چه می‌کنید؟",
  S(True, "Jeg bruger parkeringsbremsen eller bilens bakkestart, så bilen ikke ruller tilbage.", "I use the parking brake or the car's hill-start aid so that the car does not roll back.",
    "از ترمز دستی یا سیستم کمک شروع در سربالایی استفاده می‌کنم تا خودرو به عقب نرود.",
    "Ruller bilen tilbage, kan den ramme den bil eller cyklist, der holder bag den.", "If the car rolls back, it may hit a car or cyclist standing behind it.",
    "اگر خودرو به عقب برود، ممکن است به خودرو یا دوچرخه‌سوار پشتی بخورد."),
  S(True, "Jeg ser mig for og giver tegn, før jeg kører ud.", "I look around and signal before I pull out.", "پیش از حرکت اطراف را نگاه می‌کنم و علامت می‌دهم.",
    "Før igangsætning fra vejkanten skal du give tegn og sikre dig, at det kan ske uden fare.", "Before pulling away from the edge you must signal and make sure it can be done safely.",
    "پیش از حرکت از کنار جاده باید علامت بدهید و مطمئن شوید بی‌خطر است."),
  S(False, "Det gør ikke noget, at bilen ruller lidt tilbage, når jeg starter.", "It does not matter if the car rolls back a little when I start.", "اشکالی ندارد اگر خودرو هنگام حرکت کمی به عقب برود.",
    "Selv lidt kan være nok til at ramme nogen bag dig.", "Even a little can be enough to hit someone behind you.", "حتی کمی هم ممکن است برای برخورد با کسی پشت سرتان کافی باشد."),
  S(False, "Jeg giver fuld gas, så jeg hurtigt kommer op ad bakken.", "I put my foot down so that I get up the hill quickly.", "تا ته گاز می‌دهم تا زود از تپه بالا بروم.",
    "Kør roligt ud; fuld gas kan få bilen til at skride eller springe frem.", "Pull away calmly; full throttle can make the car skid or jump forward.", "آرام حرکت کنید؛ گاز کامل ممکن است خودرو را بلغزاند یا به جلو پرتاب کند."),
)

Q(5181, "7.1", town("""
THE SCENE: a town street, one lane in each direction. About 30 m ahead at the right kerb there is a free space where we want to stop
and let a passenger out. A cyclist rides along the right edge a little ahead of us; cars follow us (visible in the interior rear-view
mirror at the top of the picture).
MUST BE CLEARLY VISIBLE: the free space at the kerb, the cyclist, the cars in the rear-view mirror.
MUST NOT APPEAR: signs, yellow lines, text."""),
  "Du vil standse ved kantstenen for at sætte en passager af. Hvordan forholder du dig?",
  "You want to stop at the kerb to let a passenger out. What do you do?",
  "می‌خواهید کنار جدول بایستید تا مسافری پیاده شود. چه می‌کنید؟",
  S(True, "Jeg standser i vejens længderetning tæt ved kørebanens kant.", "I stop lengthwise along the road close to the edge of the carriageway.", "در امتداد طول جاده و نزدیک لبه‌ی سواره‌رو می‌ایستم.",
    "Ved standsning skal køretøjet anbringes i vejens længderetning ved kørebanens yderkant.", "When stopping, the vehicle must be placed lengthwise along the road at the edge of the carriageway.",
    "هنگام توقف، خودرو باید در امتداد طول جاده و کنار لبه‌ی سواره‌رو قرار بگیرد."),
  S(True, "Jeg sikrer mig, at passageren kan stige ud uden fare.", "I make sure that the passenger can get out safely.", "مطمئن می‌شوم مسافر بی‌خطر پیاده شود.",
    "Åbning af døre og afstigning skal ske uden fare eller unødig ulempe.", "Opening doors and getting out must be done without danger or undue inconvenience.", "باز کردن در و پیاده شدن باید بدون خطر یا مزاحمت بی‌جا باشد."),
  S(True, "Jeg ser i spejlet og giver tegn i god tid.", "I look in the mirror and signal in good time.", "در آینه نگاه می‌کنم و به موقع علامت می‌دهم.",
    "Dem bag dig skal kunne se, at du vil standse.", "Those behind you must be able to see that you are going to stop.", "پشت‌سری‌ها باید بتوانند ببینند که می‌خواهید بایستید."),
  S(False, "Jeg standser skråt, så jeg hurtigt kan køre ud igen.", "I stop at an angle so that I can drive off again quickly.", "کج می‌ایستم تا زود دوباره حرکت کنم.",
    "En skrå bil kan spærre for cyklister og anden trafik.", "A car at an angle can block cyclists and other traffic.", "خودروی کج ممکن است راه دوچرخه‌سواران و دیگر ترافیک را ببندد."),
)

Q(5182, "7.2", view("""
THE SCENE: a two-way country road with a broken centre line, bending to the LEFT around a field of tall maize, so that the road beyond
the bend cannot be seen. No traffic in sight.
MUST BE CLEARLY VISIBLE: the left bend, the maize hiding the view.
MUST NOT APPEAR: other vehicles, signs, text."""),
  "Vejen svinger til venstre, og du kan ikke se langt frem. Hvordan placerer du bilen?",
  "The road bends to the left, and you cannot see far ahead. How do you position the car?",
  "جاده به چپ می‌پیچد و دور را نمی‌بینید. خودرو را چطور قرار می‌دهید؟",
  S(True, "Jeg holder mig i højre side af min vognbane.", "I keep to the right-hand side of my lane.", "در سمت راست خط خودم می‌مانم.",
    "Kørende skal holde så langt til højre som muligt; i et venstresving kan en modkørende være tæt på midterlinjen.",
    "Drivers must keep as far right as possible; in a left bend an oncoming car may be close to the centre line.",
    "رانندگان باید تا جای ممکن سمت راست بمانند؛ در پیچ به چپ ممکن است خودروی روبه‌رو نزدیک خط وسط باشد."),
  S(False, "Jeg skærer svinget for at køre mere jævnt.", "I cut the corner to drive more smoothly.", "پیچ را میان‌بر می‌زنم تا نرم‌تر برانم.",
    "Så kommer du over i den modkørendes side, hvor du ikke kan se, hvad der kommer.", "Then you move into the oncoming side, where you cannot see what is coming.", "این‌طور وارد سمت مقابل می‌شوید، جایی که نمی‌بینید چه می‌آید."),
  S(False, "Jeg kører midt på vejen, så jeg kan se længere.", "I drive in the middle of the road so that I can see further.", "وسط جاده می‌رانم تا دورتر را ببینم.",
    "Midt på vejen risikerer du at møde en modkørende frontalt.", "In the middle of the road you risk meeting an oncoming car head-on.", "وسط جاده خطر برخورد رودررو با خودروی مقابل هست."),
)

Q(5183, "7.2", view("""
THE SCENE: a wide road outside town with TWO lanes in our direction (a broken lane line between them) and a central reservation with a
crash barrier on the left. Light traffic; nobody ahead of us in the right lane for a long way.
MUST BE CLEARLY VISIBLE: the two lanes in our direction, the empty right lane ahead.
MUST NOT APPEAR: signs, text."""),
  "Du kører uden for byen på en vej med to vognbaner i din retning og har ikke tænkt dig at overhale. Hvor kører du?",
  "You are driving outside town on a road with two lanes in your direction and are not planning to overtake. Where do you drive?",
  "بیرون از شهر در جاده‌ای با دو خط در جهت خودتان می‌رانید و قصد سبقت ندارید. کجا می‌رانید؟",
  S(True, "I højre vognbane.", "In the right-hand lane.", "در خط راست.",
    "Kørende skal holde så langt til højre som muligt; venstre vognbane bruges til at overhale.", "Drivers must keep as far right as possible; the left lane is used for overtaking.",
    "رانندگان باید تا جای ممکن سمت راست بمانند؛ خط چپ برای سبقت است."),
  S(False, "I venstre vognbane, fordi den er hurtigst.", "In the left lane, because it is the fastest.", "در خط چپ، چون سریع‌تر است.",
    "Du må kun ligge i venstre vognbane, mens du overhaler.", "You may only be in the left lane while you are overtaking.", "فقط هنگام سبقت می‌توانید در خط چپ باشید."),
  S(False, "Midt mellem vognbanerne, så jeg kan vælge senere.", "In the middle between the lanes, so that I can choose later.", "وسط دو خط، تا بعداً انتخاب کنم.",
    "Du skal køre inden for én vognbane.", "You must drive within one lane.", "باید داخل یک خط برانید."),
  S(False, "I den vognbane, hvor der er færrest biler.", "In the lane with the fewest cars.", "در خطی که خودروی کمتری دارد.",
    "Hovedreglen er at holde til højre.", "The main rule is to keep right.", "قاعده‌ی اصلی سمت راست ماندن است."),
)

Q(5184, "7.2", view("""
THE SCENE: a fairly wide country road with no centre line and no edge lines, room for two cars to meet. About 60 m ahead a man walks
with a dog at the right edge of the road. A gentle right bend further ahead.
MUST BE CLEARLY VISIBLE: the road without lines, the man with the dog at the right edge, the bend.
MUST NOT APPEAR: signs, other vehicles, text."""),
  "Vejen har ingen midterlinje, men er bred nok til to biler. Hvordan placerer du dig?",
  "The road has no centre line but is wide enough for two cars. How do you position yourself?",
  "جاده خط وسط ندارد، ولی برای دو خودرو جا دارد. خودتان را چطور قرار می‌دهید؟",
  S(True, "Jeg holder så langt til højre, som forholdene tillader.", "I keep as far to the right as the conditions allow.", "تا جایی که شرایط اجازه دهد سمت راست می‌مانم.",
    "Reglen om at holde til højre gælder, også når der ikke er en midterlinje.", "The keep-right rule applies even when there is no centre line.", "قاعده‌ی سمت راست ماندن حتی وقتی خط وسط نیست برقرار است."),
  S(True, "Jeg giver manden med hunden god plads, når jeg kører forbi.", "I give the man with the dog plenty of room when I pass.", "هنگام عبور جای زیادی به مرد و سگش می‌دهم.",
    "Du skal give gående tid til at vige og fornøden plads.", "You must give pedestrians time to step aside and the room they need.", "باید به عابران فرصت کنار رفتن و جای لازم بدهید."),
  S(False, "Jeg kører midt på vejen, når der ikke er en midterlinje.", "I drive in the middle of the road when there is no centre line.", "وقتی خط وسط نیست، وسط جاده می‌رانم.",
    "Så kan du møde en modkørende, der heller ikke kan se dig, fx i svinget.", "Then you may meet an oncoming car that cannot see you either, for example in the bend.", "این‌طور ممکن است با خودروی مقابلی روبه‌رو شوید که شما را نمی‌بیند، مثلاً در پیچ."),
  S(True, "Jeg er særligt opmærksom på modkørende i svinget.", "I pay special attention to oncoming traffic in the bend.", "در پیچ به ترافیک روبه‌رو توجه ویژه دارم.",
    "Uden midterlinje kan modkørende ligge tæt på midten af vejen.", "Without a centre line oncoming cars may be close to the middle of the road.", "بدون خط وسط، خودروهای روبه‌رو ممکن است نزدیک وسط جاده باشند."),
)

Q(5185, "7.19", view("""
THE SCENE: a dark, unlit two-way country road at night with no street lamps; we drive with dipped beam, which lights only a short
stretch of the road ahead, after which everything is dark. No oncoming traffic and nobody ahead of us.
MUST BE CLEARLY VISIBLE: the short lit stretch in dipped beam, the darkness beyond.
MUST NOT APPEAR: other vehicles, street lamps, text.""", cond="night, dark unlit road, dry"),
  "Du kører på en mørk landevej uden gadelys. Ingen kommer imod dig, og der kører ingen foran dig. Hvilket lys bruger du?",
  "You are driving on a dark country road without street lights. Nobody is coming towards you, and nobody is driving in front of you. Which lights do you use?",
  "در جاده‌ای تاریک و بدون چراغ خیابان می‌رانید. کسی از روبه‌رو نمی‌آید و کسی هم جلوی شما نیست. از کدام چراغ استفاده می‌کنید؟",
  S(True, "Fjernlys, når nærlyset ikke lyser langt nok frem til min fart.", "High beam, when the dipped beam does not reach far enough ahead for my speed.",
    "نور بالا، وقتی نور پایین برای سرعتم به اندازه‌ی کافی دور را روشن نمی‌کند.",
    "Fjernlys skal bruges, når førerens synsvidde under hensyn til hastigheden ellers er utilstrækkelig.",
    "High beam must be used when the driver's range of vision would otherwise be too short for the speed.",
    "وقتی دید راننده با توجه به سرعت در غیر این صورت کافی نیست، باید از نور بالا استفاده کرد."),
  S(True, "Jeg blænder ned i god tid, når der kommer en modkørende.", "I dip in good time when an oncoming vehicle appears.", "وقتی وسیله‌ای از روبه‌رو پیدا شد، به موقع نور را پایین می‌آورم.",
    "Fjernlys må ikke bruges ved møde, hvor den modkørende kan blændes.", "High beam must not be used when meeting someone who could be dazzled.", "هنگام برخورد با وسیله‌ای که ممکن است خیره شود، نور بالا ممنوع است."),
  S(False, "Fjernlys må kun bruges på motorvej.", "High beam may only be used on the motorway.", "نور بالا فقط در بزرگراه مجاز است.",
    "Fjernlys bruges på alle uoplyste veje, når der er behov for det.", "High beam is used on all unlit roads when it is needed.", "نور بالا در همه‌ی جاده‌های بی‌چراغ، وقتی لازم باشد، استفاده می‌شود."),
  S(False, "Jeg kører altid med nærlys om natten for ikke at genere nogen.", "I always drive with dipped beam at night so as not to bother anyone.", "شب‌ها همیشه با نور پایین می‌رانم تا مزاحم کسی نشوم.",
    "Er udsynet for kort til farten, skal du bruge fjernlys eller køre langsommere.", "If your view is too short for your speed, you must use high beam or drive more slowly.",
    "اگر دیدتان برای سرعتتان کوتاه است، باید از نور بالا استفاده کنید یا آهسته‌تر برانید."),
)

Q(5186, "7.19", picture("""
A simple illustration of the light switch on a car's dashboard with its symbols for position lights, dipped beam and automatic lights
(as simple pictograms, no text), and through the windscreen a road in the late afternoon with the sun low on the horizon.
MUST BE CLEARLY VISIBLE: the light switch with its pictograms, the low sun.
MUST NOT APPEAR: brand names, readable text."""),
  "Hvad gælder om bilens lys?",
  "What applies to the car's lights?",
  "درباره‌ی چراغ‌های خودرو چه قاعده‌ای برقرار است؟",
  S(True, "I lygtetændingstiden, fra solnedgang til solopgang, skal de påbudte lygter være tændt.", "During lighting-up time, from sunset to sunrise, the required lights must be on.",
    "در زمان روشن کردن چراغ‌ها، از غروب تا طلوع، چراغ‌های الزامی باید روشن باشند.",
    "Lygtetændingstiden er fra solnedgang til solopgang.", "Lighting-up time is from sunset to sunrise.", "زمان روشن کردن چراغ‌ها از غروب تا طلوع آفتاب است."),
  S(True, "Også om dagen skal bilen køre med nærlys eller kørelys.", "In the daytime too the car must drive with dipped beam or daytime running lights.",
    "روزها هم خودرو باید با نور پایین یا چراغ روز حرکت کند.",
    "Uden for lygtetændingstiden skal der køres med nærlys eller kørelys.", "Outside lighting-up time you must drive with dipped beam or daytime running lights.",
    "بیرون از زمان روشن کردن چراغ‌ها باید با نور پایین یا چراغ روز رانندگی کرد."),
  S(False, "Om dagen må jeg køre helt uden lys.", "In the daytime I may drive with no lights at all.", "روزها می‌توانم کاملاً بدون چراغ برانم.",
    "Bilen skal også om dagen køre med lys.", "The car must have lights on in the daytime too.", "خودرو روزها هم باید با چراغ حرکت کند."),
  S(False, "Lygtetændingstiden er kun fra midnat til kl. 5.", "Lighting-up time is only from midnight to 5 am.", "زمان روشن کردن چراغ‌ها فقط از نیمه‌شب تا ساعت ۵ است.",
    "Den følger solen: fra solnedgang til solopgang.", "It follows the sun: from sunset to sunrise.", "این زمان از خورشید پیروی می‌کند: از غروب تا طلوع."),
)

Q(5187, "7.19", view("""
THE SCENE: a dry, clear night on an unlit two-way country road: no fog, no rain, stars visible. We drive with dipped beam; the front
fog lights are also switched on, lighting the verges brightly close to the car.
MUST BE CLEARLY VISIBLE: the clear dry night, the extra bright light from the fog lights near the car.
MUST NOT APPEAR: other vehicles, text.""", cond="clear dry night, unlit road"),
  "Det er tørt og klart vejr i mørke. Hvad gælder om tågelygterne?",
  "It is dry and clear weather in the dark. What applies to the fog lights?",
  "در تاریکی، هوا خشک و صاف است. درباره‌ی چراغ‌های مه‌شکن چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke bruge dem, fordi der ikke er tåge eller kraftig nedbør.", "I must not use them because there is no fog or heavy precipitation.", "نباید از آن‌ها استفاده کنم، چون مه یا بارش شدیدی نیست.",
    "Tågelygter må kun bruges i tåge og under kraftig nedbør.", "Fog lights may only be used in fog and heavy precipitation.", "چراغ مه‌شکن فقط در مه و بارش شدید مجاز است."),
  S(False, "Jeg må bruge dem i stedet for nærlys, når jeg vil se bedre.", "I may use them instead of dipped beam when I want to see better.", "وقتی بخواهم بهتر ببینم، می‌توانم به‌جای نور پایین از آن‌ها استفاده کنم.",
    "Det må de kun i tåge og under kraftig nedbør.", "They may only do that in fog and heavy precipitation.", "این کار فقط در مه و بارش شدید مجاز است."),
  S(False, "Tågebaglygten må altid være tændt i mørke.", "The rear fog light may always be on in the dark.", "چراغ مه‌شکن عقب در تاریکی همیشه می‌تواند روشن باشد.",
    "Den kraftige tågebaglygte blænder dem bag dig i klart vejr.", "The bright rear fog light dazzles those behind you in clear weather.", "چراغ مه‌شکن پرنور عقب، در هوای صاف پشت‌سری‌ها را خیره می‌کند."),
  S(False, "Tågelygter må bruges, når vejen er våd.", "Fog lights may be used when the road is wet.", "وقتی جاده خیس است، چراغ مه‌شکن مجاز است.",
    "En våd vej er ikke tåge eller kraftig nedbør.", "A wet road is not fog or heavy precipitation.", "جاده‌ی خیس به معنای مه یا بارش شدید نیست."),
)

Q(5188, "7.16", above("""
THE SCENE: a motorway seen from above with two lanes in our direction; on the right a deceleration lane (exit lane) begins and runs
alongside the right lane for a while before curving off as an exit road that ends in a sharp bend.
VEHICLES (colour code used strictly): a RED car (ours) in the right lane at the start of the exit lane, its RIGHT indicator flashing;
a SOLID GREEN arrow shows it moving into the exit lane right where it begins and slowing down there; a DASHED ORANGE arrow shows it
staying in the motorway lane until the very end of the exit lane.
MUST NOT APPEAR: signs, text."""),
  "Du skal forlade motorvejen ved den næste frakørsel. Hvordan forholder du dig?",
  "You are going to leave the motorway at the next exit. What do you do?",
  "می‌خواهید در خروجی بعدی از بزرگراه خارج شوید. چه می‌کنید؟",
  S(True, "Jeg kører ind på frakørselsbanen, så snart den begynder.", "I move into the exit lane as soon as it begins.", "به محض شروع خط خروج واردش می‌شوم.",
    "Frakørselsbanen skal benyttes med det samme, når den begynder.", "The exit lane must be used straight away, as soon as it begins.", "از خط خروج باید به محض شروعش استفاده کرد."),
  S(True, "Jeg sætter farten ned på frakørselsbanen og ikke på motorvejen.", "I slow down in the exit lane, not on the motorway.", "سرعتم را در خط خروج کم می‌کنم، نه در بزرگراه.",
    "Så generer du ikke trafikken på motorvejen.", "That way you do not hold up the traffic on the motorway.", "این‌طور مزاحم ترافیک بزرگراه نمی‌شوید."),
  S(True, "Jeg giver tegn i god tid, før jeg skifter over på frakørselsbanen.", "I signal in good time before I move over into the exit lane.", "پیش از رفتن به خط خروج، به موقع راهنما می‌زنم.",
    "På motorvej skal du give tegn før et vognbaneskift.", "On the motorway you must signal before a lane change.", "در بزرگراه پیش از تغییر خط باید علامت بدهید."),
  S(True, "Jeg holder øje med farten, fordi frakørselsvejen kan ende i et skarpt sving.", "I watch my speed because the exit road may end in a sharp bend.",
    "مراقب سرعتم هستم، چون راه خروجی ممکن است به پیچ تندی برسد.",
    "Efter motorvejen føles farten lavere, end den er.", "After the motorway your speed feels lower than it is.", "بعد از بزرگراه سرعت کمتر از مقدار واقعی‌اش حس می‌شود."),
)

Q(5189, "7.16", view("""
THE SCENE: a motorway with two lanes in our direction, a hard shoulder on the right and a central reservation on the left. We drive in
the right lane; ahead in the left lane traffic is queuing slowly, while the right lane moves a little. The hard shoulder is empty.
MUST BE CLEARLY VISIBLE: the two lanes, the queue, the empty hard shoulder.
MUST NOT APPEAR: signs, text."""),
  "Du kører på motorvejen med to vognbaner i din retning. Hvad gælder?",
  "You are driving on the motorway with two lanes in your direction. What applies?",
  "در بزرگراهی با دو خط در جهت خودتان می‌رانید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg kører i højre vognbane, når jeg ikke overhaler.", "I drive in the right lane when I am not overtaking.", "وقتی سبقت نمی‌گیرم، در خط راست می‌رانم.",
    "Kørende skal holde så langt til højre som muligt.", "Drivers must keep as far to the right as possible.", "رانندگان باید تا جای ممکن سمت راست بمانند."),
  S(True, "Jeg giver tegn, før jeg skifter vognbane.", "I signal before I change lanes.", "پیش از تغییر خط علامت می‌دهم.",
    "På motorvej skal der gives tegn før vognbaneskift.", "On the motorway a signal must be given before a lane change.", "در بزرگراه پیش از تغییر خط باید علامت داد."),
  S(False, "Jeg må køre i nødsporet, når der er kø.", "I may drive on the hard shoulder when there is a queue.", "وقتی صف است، می‌توانم در شانه‌ی اضطراری برانم.",
    "Nødsporet er til nødsituationer, ikke til at køre forbi en kø.", "The hard shoulder is for emergencies, not for driving past a queue.", "شانه‌ی اضطراری برای مواقع اضطراری است، نه برای عبور از کنار صف."),
  S(False, "Jeg må blive i venstre vognbane, så længe jeg kører 130 km/t.", "I may stay in the left lane as long as I am doing 130 km/h.", "تا وقتی ۱۳۰ می‌رانم، می‌توانم در خط چپ بمانم.",
    "Fart giver ingen ret til at blive i venstre vognbane.", "Speed gives no right to stay in the left lane.", "سرعت حق ماندن در خط چپ را نمی‌دهد."),
)

Q(5190, "6.2", picture("""
A simple illustration of a car's steering wheel seen from the driver's seat, with the horn symbol (a small trumpet pictogram) in the
centre of the wheel, and through the windscreen a quiet town street with a few parked cars.
MUST BE CLEARLY VISIBLE: the steering wheel with the horn symbol.
MUST NOT APPEAR: hands, brand names, readable text."""),
  "Hvornår må du bruge bilens horn?",
  "When may you use the car's horn?",
  "کی می‌توانید از بوق خودرو استفاده کنید؟",
  S(True, "Når det er nødvendigt for at forebygge eller afværge fare.", "When it is necessary to prevent or avert danger.", "وقتی برای پیشگیری یا دفع خطر لازم باشد.",
    "Lydsignal må kun bruges, når det er nødvendigt for at forebygge eller afværge fare, og ikke længere end nødvendigt.",
    "The horn may only be used when it is necessary to prevent or avert danger, and no longer than necessary.",
    "بوق فقط وقتی مجاز است که برای پیشگیری یا دفع خطر لازم باشد، و نه بیشتر از حد لازم."),
  S(False, "For at hilse på en ven.", "To greet a friend.", "برای سلام کردن به یک دوست.",
    "Hornet må ikke bruges til andet end at afværge fare.", "The horn must not be used for anything other than averting danger.", "از بوق فقط برای دفع خطر می‌توان استفاده کرد."),
  S(False, "For at få bilen foran til at køre, når lyset bliver grønt.", "To make the car in front go when the light turns green.", "برای این‌که خودروی جلو با سبز شدن چراغ حرکت کند.",
    "At skynde på andre er ikke at afværge fare.", "Hurrying others is not averting danger.", "عجله‌ دادن به دیگران دفع خطر نیست."),
  S(True, "I lygtetændingstiden skal jeg bruge lyssignal i stedet, medmindre faren er overhængende.",
    "During lighting-up time I must use a light signal instead, unless the danger is immediate.",
    "در زمان روشن کردن چراغ‌ها باید به‌جای بوق چراغ بزنم، مگر خطر فوری باشد.",
    "I lygtetændingstiden skal fører af motorkøretøj bruge lyssignal i stedet for lydsignal, medmindre faren er overhængende.",
    "During lighting-up time the driver of a motor vehicle must use a light signal instead of the horn, unless the danger is immediate.",
    "در زمان روشن کردن چراغ‌ها راننده‌ی وسیله‌ی موتوری باید به‌جای بوق چراغ بزند، مگر خطر فوری باشد."),
)

Q(5191, "6.2", town("""
THE SCENE: a junction in town with traffic lights; our light shows GREEN. From the crossing road on the left a red fire engine with
flashing blue lights is about to drive into the junction against its red light.
MUST BE CLEARLY VISIBLE: our green light, the fire engine with blue lights coming into the junction from the left.
MUST NOT APPEAR: text."""),
  "Du har grønt lys, men en brandbil med blå blink og sirene er ved at køre ind i krydset fra venstre. Hvordan forholder du dig?",
  "You have a green light, but a fire engine with flashing blue lights and siren is about to drive into the junction from the left. What do you do?",
  "چراغ شما سبز است، ولی یک ماشین آتش‌نشانی با چراغ آبی و آژیر از چپ وارد تقاطع می‌شود. چه می‌کنید؟",
  S(True, "Jeg holder tilbage og lader brandbilen komme igennem.", "I hold back and let the fire engine through.", "صبر می‌کنم و می‌گذارم ماشین آتش‌نشانی رد شود.",
    "Kørende skal holde vejen åben for et udrykningskøretøj og om nødvendigt standse.", "Drivers must keep the road open for an emergency vehicle and stop if necessary.",
    "رانندگان باید راه را برای خودروی امدادی باز نگه دارند و در صورت لزوم بایستند."),
  S(True, "Jeg gør det i god tid, så brandbilen ikke skal bremse.", "I do it in good time so that the fire engine does not have to brake.", "این کار را به موقع انجام می‌دهم تا ماشین آتش‌نشانی مجبور به ترمز نشود.",
    "Vejen skal holdes åben i god tid.", "The road must be kept open in good time.", "راه باید به موقع باز نگه داشته شود."),
  S(False, "Jeg kører, fordi jeg har grønt lys.", "I go because I have a green light.", "حرکت می‌کنم، چون چراغم سبز است.",
    "Grønt lys giver ikke ret til at spærre for et udrykningskøretøj.", "A green light gives no right to block an emergency vehicle.", "چراغ سبز حق بستن راه خودروی امدادی را نمی‌دهد."),
  S(True, "Jeg holder øje med, om der kommer flere udrykningskøretøjer.", "I watch whether more emergency vehicles are coming.", "مراقبم که خودروهای امدادی دیگری هم می‌آیند یا نه.",
    "Udrykningskøretøjer kører ofte flere sammen.", "Emergency vehicles often come several at a time.", "خودروهای امدادی اغلب چندتایی با هم می‌آیند."),
)

Q(5192, "7.15", view("""
THE SCENE: we approach the entry of a roundabout with a round grass central island. At the entry stands a round BLUE sign with three
white arrows chasing each other in a circle (anticlockwise), the Danish sign for the required direction in a roundabout; a give-way
sign and shark teeth are also at the entry.
MUST BE CLEARLY VISIBLE: the blue roundabout sign with the three arrows, the central island.
MUST NOT APPEAR: other vehicles, text."""),
  "Du kører ind i en rundkørsel med denne blå tavle. Hvad gælder?",
  "You are entering a roundabout with this blue sign. What applies?",
  "وارد میدانی با این تابلوی آبی می‌شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg kører rundt med midterøen på min venstre side.", "I drive round with the central island on my left.", "با جزیره‌ی وسط در سمت چپم دور میدان می‌چرخم.",
    "Kørende skal holde til højre for helleanlæg og lignende, så rundkørslen køres mod uret.", "Drivers must keep to the right of islands and the like, so the roundabout is driven anticlockwise.",
    "رانندگان باید سمت راست جزیره‌ها بمانند، پس میدان خلاف جهت عقربه‌های ساعت دور زده می‌شود."),
  S(True, "Tavlen viser den påbudte kørselsretning i rundkørslen.", "The sign shows the required direction in the roundabout.", "این تابلو جهت اجباری حرکت در میدان را نشان می‌دهد.",
    "Den blå tavle (D 12) er et påbud om kørselsretningen i rundkørslen.", "The blue sign (D 12) is an order about the direction in the roundabout.", "تابلوی آبی (D 12) دستوری درباره‌ی جهت حرکت در میدان است."),
  S(False, "Jeg må køre den korteste vej til venstre om øen.", "I may take the shortest way round the island to the left.", "می‌توانم از کوتاه‌ترین راه از سمت چپ جزیره بروم.",
    "Det er at køre mod den påbudte retning.", "That is driving against the required direction.", "این یعنی رانندگی خلاف جهت اجباری."),
  S(False, "Tavlen betyder, at jeg har forkørselsret i rundkørslen.", "The sign means that I have the right of way in the roundabout.", "این تابلو یعنی در میدان حق تقدم با من است.",
    "Tavlen siger kun noget om retningen; ved indkørslen har du her ubetinget vigepligt.", "The sign only says something about direction; at the entry here you must give way unconditionally.",
    "این تابلو فقط درباره‌ی جهت است؛ این‌جا هنگام ورود باید بی‌قیدوشرط راه بدهید."),
)

Q(5193, "7.15", above("""
THE SCENE: a single-lane roundabout seen from above with a round central island surrounded by a low, cobbled ring that long vehicles
may drive over.
VEHICLES (colour code used strictly): a long white articulated lorry going round the roundabout, its trailer cutting in over the cobbled
ring; a RED car (ours) following behind the lorry at a good distance (a SOLID GREEN arrow behind the lorry); a DASHED ORANGE arrow shows
the red car trying to drive up beside the lorry inside the roundabout.
MUST NOT APPEAR: signs, text."""),
  "Foran dig i rundkørslen kører en lang lastbil. Hvordan forholder du dig?",
  "A long lorry is driving in front of you in the roundabout. What do you do?",
  "جلوی شما در میدان یک کامیون بلند حرکت می‌کند. چه می‌کنید؟",
  S(True, "Jeg holder god afstand og kører ikke op ved siden af lastbilen.", "I keep a good distance and do not drive up beside the lorry.", "فاصله‌ی خوبی نگه می‌دارم و کنار کامیون نمی‌روم.",
    "Ved siden af lastbilen kan du blive klemt, når den svinger.", "Beside the lorry you may get squeezed when it turns.", "کنار کامیون ممکن است هنگام پیچیدنش گیر بیفتید."),
  S(True, "Lastbilen kan have brug for hele rundkørslens bredde.", "The lorry may need the whole width of the roundabout.", "کامیون ممکن است به تمام عرض میدان نیاز داشته باشد.",
    "Lange køretøjer skærer svinget og kan køre over den brostensbelagte kant ved midterøen.", "Long vehicles cut the corner and may drive over the cobbled ring by the island.",
    "وسایل بلند از داخل پیچ می‌گذرند و ممکن است از روی حلقه‌ی سنگ‌فرش کنار جزیره رد شوند."),
  S(False, "Jeg overhaler lastbilen i rundkørslen.", "I overtake the lorry in the roundabout.", "در میدان از کامیون سبقت می‌گیرم.",
    "I en rundkørsel med én vognbane er der ikke plads til at overhale lastbilen sikkert.", "In a single-lane roundabout there is no room to overtake the lorry safely.", "در میدان یک‌خطه جای کافی برای سبقت ایمن از کامیون نیست."),
  S(False, "Lastbilen skal holde helt ind til højre kant hele vejen rundt.", "The lorry must keep right in to the right edge all the way round.", "کامیون باید تمام مسیر کاملاً به لبه‌ی راست بچسبد.",
    "Det kan en lang lastbil ikke; dens bagende skærer svinget.", "A long lorry cannot do that; its rear cuts the corner.", "کامیون بلند نمی‌تواند؛ قسمت عقبش از داخل پیچ می‌گذرد."),
)

Q(5194, "5.2", view("""
THE SCENE: a two-way road through a park in autumn after rain: wet yellow and brown leaves lie in a thick layer over the road surface,
especially along the edges and in a bend ahead.
MUST BE CLEARLY VISIBLE: the wet leaves covering the road, the bend ahead.
MUST NOT APPEAR: signs, other vehicles, text.""", cond="overcast autumn day after rain, wet road"),
  "Det er efterår, og der ligger våde blade på vejen. Hvordan forholder du dig?",
  "It is autumn, and there are wet leaves on the road. What do you do?",
  "پاییز است و برگ‌های خیس روی جاده ریخته است. چه می‌کنید؟",
  S(True, "Jeg regner med, at vejen kan være glat.", "I expect that the road may be slippery.", "انتظار دارم جاده لغزنده باشد.",
    "Våde blade kan gøre vejen lige så glat som is.", "Wet leaves can make the road as slippery as ice.", "برگ‌های خیس می‌توانند جاده را به لغزندگی یخ کنند."),
  S(True, "Jeg sænker farten og holder større afstand.", "I slow down and keep a greater distance.", "سرعتم را کم می‌کنم و فاصله‌ی بیشتری نگه می‌دارم.",
    "På glat vej bliver bremselængden længere.", "On a slippery road the braking distance gets longer.", "روی جاده‌ی لغزنده مسافت ترمز بیشتر می‌شود."),
  S(True, "Jeg bremser blødt og undgår at dreje brat.", "I brake gently and avoid steering sharply.", "نرم ترمز می‌کنم و از فرمان دادن تند پرهیز می‌کنم.",
    "Bratte manøvrer kan få bilen til at skride.", "Sharp manoeuvres can make the car skid.", "حرکات ناگهانی ممکن است خودرو را بلغزاند."),
  S(False, "Blade har ingen betydning for bremselængden.", "Leaves make no difference to the braking distance.", "برگ‌ها روی مسافت ترمز اثری ندارند.",
    "Blade, især våde, nedsætter dækkenes greb.", "Leaves, especially wet ones, reduce the tyres' grip.", "برگ‌ها، به‌ویژه خیس، چسبندگی لاستیک را کم می‌کنند."),
)

Q(5195, "7.8", view("""
THE SCENE: a straight two-way country road in good weather. About 45 m ahead of us drives a blue car; a road-side pole stands on the
right verge level with the blue car, the kind of fixed point used to count the seconds of distance.
MUST BE CLEARLY VISIBLE: the car ahead, the pole on the verge level with it.
MUST NOT APPEAR: signs, text."""),
  "Hvordan kan du vurdere, om du holder en passende afstand til bilen foran på landevejen?",
  "How can you judge whether you are keeping a suitable distance to the car in front on a country road?",
  "در جاده‌ی بیرون شهر چطور می‌توانید بسنجید که فاصله‌ی مناسبی با خودروی جلو دارید؟",
  S(True, "Jeg holder mindst 2 sekunders afstand i godt føre.", "I keep at least 2 seconds' distance in good conditions.", "در شرایط خوب دست‌کم ۲ ثانیه فاصله نگه می‌دارم.",
    "To sekunder er en god tommelfingerregel: når bilen foran passerer et fast punkt, skal du kunne tælle til to, før du selv er der.",
    "Two seconds is a good rule of thumb: when the car ahead passes a fixed point, you should be able to count to two before you get there.",
    "دو ثانیه قاعده‌ی خوبی است: وقتی خودروی جلو از یک نقطه‌ی ثابت رد شد، باید بتوانید تا دو بشمارید تا خودتان به آن برسید."),
  S(True, "På våd eller glat vej holder jeg større afstand.", "On a wet or slippery road I keep a greater distance.", "در جاده‌ی خیس یا لغزنده فاصله‌ی بیشتری نگه می‌دارم.",
    "Bremselængden er længere, når vejen er våd eller glat.", "The braking distance is longer when the road is wet or slippery.", "وقتی جاده خیس یا لغزنده است، مسافت ترمز بیشتر است."),
  S(True, "En anden tommelfingerregel er en afstand i meter på det halve af farten, fx 40 m ved 80 km/t.",
    "Another rule of thumb is a distance in metres of half the speed, for example 40 m at 80 km/h.",
    "قاعده‌ی دیگر فاصله‌ای به متر برابر نصف سرعت است، مثلاً ۴۰ متر در ۸۰ کیلومتر بر ساعت.",
    "Begge tommelfingerregler giver omtrent samme afstand.", "Both rules of thumb give roughly the same distance.", "هر دو قاعده تقریباً همان فاصله را می‌دهند."),
  S(False, "Det er nok, at jeg kan se bilens baglygter.", "It is enough that I can see the car's rear lights.", "کافی است چراغ‌های عقب آن خودرو را ببینم.",
    "Afstanden skal være så stor, at der ikke er fare for påkørsel, hvis bilen foran bremser.", "The distance must be so great that there is no risk of a collision if the car in front brakes.",
    "فاصله باید آن‌قدر باشد که اگر خودروی جلو ترمز کرد، خطر تصادف نباشد."),
)

Q(5196, "7.5", above("""
THE SCENE: a wide two-way country road seen from above with a broken centre line, a long straight stretch with a good view in both
directions; further along in one direction the road climbs to a hilltop.
VEHICLES (colour code used strictly): a RED car (ours) at the right edge; a SOLID GREEN arrow shows it turning round forwards to the
LEFT in one sweep on the straight stretch; a DASHED ORANGE arrow shows another turning-round place right at the hilltop.
MUST NOT APPEAR: other vehicles, signs, text."""),
  "Du vil vende på en bred vej uden for byen. Hvordan forholder du dig?",
  "You want to turn round on a wide road outside town. What do you do?",
  "می‌خواهید در جاده‌ای پهن بیرون از شهر دور بزنید. چه می‌کنید؟",
  S(True, "Jeg sikrer mig, at det kan ske uden fare eller ulempe for andre.", "I make sure that it can be done without danger or inconvenience to others.", "مطمئن می‌شوم که برای دیگران خطر یا مزاحمتی ندارد.",
    "Før vending skal du sikre dig, at manøvren kan udføres uden fare eller ulempe for andre.", "Before turning round you must make sure the manoeuvre can be done without danger or inconvenience to others.",
    "پیش از دور زدن باید مطمئن شوید که برای دیگران خطر یا مزاحمتی ندارد."),
  S(True, "Jeg vender forlæns til venstre.", "I turn round forwards to the left.", "رو به جلو و به سمت چپ دور می‌زنم.",
    "Vending skal ske forlæns til venstre.", "Turning round must be done forwards to the left.", "دور زدن باید رو به جلو و به سمت چپ انجام شود."),
  S(False, "Jeg må vende ved bakketoppen, hvis jeg skynder mig.", "I may turn round at the hilltop if I hurry.", "اگر عجله کنم، می‌توانم بالای تپه دور بزنم.",
    "Ved en bakketop kan du ikke se, om der kommer nogen, så vendingen kan ikke ske uden fare.", "At a hilltop you cannot see whether anyone is coming, so turning round cannot be done safely.",
    "بالای تپه نمی‌بینید کسی می‌آید یا نه، پس دور زدن بی‌خطر نیست."),
  S(False, "Jeg må vende på motorvejen, når der ikke er trafik.", "I may turn round on the motorway when there is no traffic.", "وقتی ترافیک نیست، می‌توانم در بزرگراه دور بزنم.",
    "Vending er altid forbudt på motorvej.", "Turning round is always forbidden on the motorway.", "دور زدن در بزرگراه همیشه ممنوع است."),
)

Q(5197, "1.2", picture("""
A RED car parked outside a house on a frosty winter morning: its windscreen, side windows, mirrors and headlights are covered with a
thick white layer of frost; only a small round hole has been scraped in the windscreen in front of the driver's seat.
MUST BE CLEARLY VISIBLE: the frost on all windows, mirrors and lights, the small scraped hole.
MUST NOT APPEAR: people, readable text."""),
  "Det har frosset i nat, og der er is på bilens ruder. Hvordan forholder du dig, før du kører?",
  "It froze last night, and there is ice on the car's windows. What do you do before you drive?",
  "دیشب یخبندان بوده و روی شیشه‌های خودرو یخ بسته است. پیش از رانندگی چه می‌کنید؟",
  S(True, "Jeg skraber alle ruderne helt fri.", "I scrape all the windows completely clear.", "همه‌ی شیشه‌ها را کاملاً تمیز می‌کنم.",
    "Du skal have frit udsyn til alle sider.", "You must have a clear view on all sides.", "باید از همه طرف دید آزاد داشته باشید."),
  S(True, "Jeg gør også spejlene og lygterne rene.", "I clean the mirrors and lights too.", "آینه‌ها و چراغ‌ها را هم تمیز می‌کنم.",
    "Spejlene skal kunne bruges, og lygterne skal kunne ses.", "The mirrors must be usable and the lights must be visible.", "آینه‌ها باید قابل استفاده و چراغ‌ها قابل دیدن باشند."),
  S(False, "Det er nok at skrabe et lille hul foran føreren.", "Scraping a small hole in front of the driver is enough.", "کافی است سوراخ کوچکی جلوی راننده باز کنم.",
    "Gennem et lille hul kan du ikke se cyklister og biler fra siden.", "Through a small hole you cannot see cyclists and cars from the side.", "از یک سوراخ کوچک دوچرخه‌سواران و خودروهای کناری را نمی‌بینید."),
  S(True, "Jeg venter med at køre, til ruderne er klare, hvis isen ikke kan skrabes af.", "I wait to drive until the windows are clear if the ice cannot be scraped off.",
    "اگر یخ کنده نشود، صبر می‌کنم تا شیشه‌ها شفاف شوند و بعد راه می‌افتم.",
    "Bilen må ikke bruges, før den kan køres uden fare.", "The car must not be used until it can be driven without danger.", "تا وقتی خودرو را نتوان بی‌خطر راند، نباید از آن استفاده کرد."),
)

Q(5198, "1.2", picture("""
A RED car seen from the side at night, heavily loaded: the boot is full and a heavy box is in it, so that the rear of the car sits
low and the front points slightly upwards; its dipped headlight beams point too high, upwards onto the road far ahead.
MUST BE CLEARLY VISIBLE: the low rear and raised front, the headlight beams pointing too high.
MUST NOT APPEAR: people, readable text."""),
  "Bilen er tungt lastet bagi, og nærlyset peger højere end normalt. Hvad gør du?",
  "The car is heavily loaded at the back, and the dipped beam points higher than normal. What do you do?",
  "صندوق عقب خودرو پر از بار سنگین است و نور پایین بالاتر از معمول می‌تابد. چه می‌کنید؟",
  S(True, "Jeg indstiller lygtehøjden, så de modkørende ikke bliver blændet.", "I adjust the headlight height so that oncoming drivers are not dazzled.",
    "ارتفاع چراغ‌ها را تنظیم می‌کنم تا رانندگان روبه‌رو خیره نشوند.",
    "Lygter må ikke bruges, så andre førere kan blændes.", "Lights must not be used in a way that can dazzle other drivers.", "از چراغ‌ها نباید طوری استفاده کرد که رانندگان دیگر خیره شوند."),
  S(False, "Det har ingen betydning, når jeg kører med nærlys.", "It makes no difference when I am driving with dipped beam.", "وقتی با نور پایین می‌رانم، اهمیتی ندارد.",
    "Nærlys, der peger for højt, kan blænde lige så meget som fjernlys.", "Dipped beam pointing too high can dazzle as much as high beam.", "نور پایینی که زیادی بالا بتابد، می‌تواند به اندازه‌ی نور بالا خیره کند."),
  S(False, "Jeg kører med fjernlys i stedet.", "I drive with high beam instead.", "به‌جایش با نور بالا می‌رانم.",
    "Fjernlyset blænder endnu mere.", "The high beam dazzles even more.", "نور بالا حتی بیشتر خیره می‌کند."),
  S(False, "Jeg dækker lygterne delvis med tape.", "I partly cover the lights with tape.", "چراغ‌ها را تا حدی با چسب می‌پوشانم.",
    "Det ændrer lyset og gør bilen dårligere at se; brug lygtehøjdeindstillingen.", "That changes the light and makes the car harder to see; use the headlight levelling control.",
    "این کار نور را تغییر می‌دهد و دیدن خودرو را سخت‌تر می‌کند؛ از تنظیم ارتفاع چراغ استفاده کنید."),
)

Q(5199, "7.7", view("""
THE SCENE: a narrow two-way country road with soft, muddy grass verges and a ditch on the right. A large bus comes towards us and takes
up most of the road. About 60 m ahead on our right the verge widens into a firm gravel area.
MUST BE CLEARLY VISIBLE: the oncoming bus filling most of the road, the soft verge, the firm gravel area ahead.
MUST NOT APPEAR: signs, text."""),
  "Vejen er smal, og en bus kommer imod dig. Rabatten i din side er blød. Hvordan forholder du dig?",
  "The road is narrow, and a bus is coming towards you. The verge on your side is soft. What do you do?",
  "جاده باریک است و اتوبوسی از روبه‌رو می‌آید. شانه‌ی خاکی سمت شما نرم است. چه می‌کنید؟",
  S(True, "Jeg sænker farten og holder så langt til højre, som det kan ske sikkert.", "I slow down and keep as far to the right as it can be done safely.",
    "سرعتم را کم می‌کنم و تا جایی که ایمن باشد سمت راست می‌مانم.",
    "Ved møde på smal vej skal hastigheden være passende lav, og du skal holde til højre.", "When meeting on a narrow road your speed must be suitably low, and you must keep right.",
    "هنگام برخورد در جاده‌ی باریک سرعت باید به اندازه‌ی کافی کم باشد و باید سمت راست بمانید."),
  S(True, "Jeg standser om nødvendigt ved den faste plads og lader bussen passere.", "If necessary I stop at the firm place and let the bus pass.", "در صورت لزوم در جای سفت می‌ایستم و می‌گذارم اتوبوس رد شود.",
    "Det er sikrere at vente på et fast sted end at køre ud i en blød rabat.", "It is safer to wait in a firm place than to drive onto a soft verge.", "صبر کردن در جای سفت ایمن‌تر از رفتن به شانه‌ی نرم است."),
  S(False, "Jeg kører ud i den bløde rabat i fuld fart for at give plads.", "I drive onto the soft verge at full speed to make room.", "با سرعت کامل به شانه‌ی نرم می‌روم تا جا باز کنم.",
    "I en blød rabat kan bilen skride ud eller køre i grøften.", "On a soft verge the car may skid or end up in the ditch.", "در شانه‌ی نرم ممکن است خودرو بلغزد یا به گودال برود."),
  S(False, "Bussen skal bakke, fordi den er størst.", "The bus must reverse because it is the biggest.", "اتوبوس باید دنده‌عقب برود، چون بزرگ‌تر است.",
    "Der er ingen sådan regel; find sammen den sikreste løsning.", "There is no such rule; find the safest solution together.", "چنین قاعده‌ای نیست؛ با هم ایمن‌ترین راه را پیدا کنید."),
)

Q(5200, "7.7", view("""
THE SCENE: a two-way road narrowing to a single lane over a short old bridge. Before the bridge on our right stands a blue square sign
with a white arrow pointing up on the right and a red arrow pointing down on the left (the Danish sign telling oncoming traffic to give
way). A car on the far side of the bridge is waiting.
MUST BE CLEARLY VISIBLE: the blue square sign with the white and red arrows, the narrow bridge, the waiting car on the far side.
MUST NOT APPEAR: other signs, text."""),
  "Før en smal bro står denne tavle. Hvad gælder?",
  "This sign stands before a narrow bridge. What applies?",
  "پیش از یک پل باریک این تابلو هست. چه قاعده‌ای برقرار است؟",
  S(True, "De modkørende skal holde tilbage for mig.", "Oncoming traffic must give way to me.", "ترافیک روبه‌رو باید به من راه بدهد.",
    "Tavlen (B 19) betyder, at den modkørende færdsel skal holde tilbage.", "The sign (B 19) means that oncoming traffic must give way.", "این تابلو (B 19) یعنی ترافیک روبه‌رو باید راه بدهد."),
  S(True, "Jeg kører alligevel forsigtigt og er klar til at standse, hvis en modkørende allerede er på broen.",
    "I still drive carefully and am ready to stop if an oncoming vehicle is already on the bridge.",
    "با این حال با احتیاط می‌رانم و اگر وسیله‌ای از روبه‌رو روی پل باشد، آماده‌ی ایستادنم.",
    "En, der allerede er på broen, kan ikke vige.", "Someone already on the bridge cannot make way.", "کسی که روی پل است، نمی‌تواند کنار برود."),
  S(False, "Jeg skal holde tilbage for de modkørende.", "I must give way to oncoming traffic.", "باید به ترافیک روبه‌رو راه بدهم.",
    "Det er tavlen med rød kant og en rød pil op (B 18), der betyder det.", "It is the sign with a red border and a red arrow up (B 18) that means that.", "تابلوی با حاشیه‌ی قرمز و فلش قرمز رو به بالا (B 18) این معنا را دارد."),
  S(False, "Tavlen betyder, at broen er ensrettet.", "The sign means that the bridge is one-way.", "این تابلو یعنی پل یک‌طرفه است.",
    "Der er trafik i begge retninger; tavlen siger, hvem der skal vente.", "There is traffic in both directions; the sign says who must wait.", "ترافیک در هر دو جهت است؛ تابلو می‌گوید چه کسی باید صبر کند."),
)
