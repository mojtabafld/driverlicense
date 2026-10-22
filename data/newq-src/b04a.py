# «آزمون جدید», batch 4 (5301–5400), part a: stopping and parking (7.18), overtaking (7.9), signs (6.1), people beside the
# road (7.6), speed (7.3), the car (1.2).
# Rules: Færdselsloven §§ 2 nr. 18 and 27, 10, 21, 22, 23, 24, 27, 28, 29, 41, 42, 49; Bekendtgørelse om vejafmærkning
# (A 43, C 21, C 23, C 53, C 56, D 11, E 19, E 32, Q 42, T 33, T 61, T 62); Bekendtgørelse om parkeringsskiver
# (BEK 1529/2016 §§ 3–6).
from nq import Q, S, above, picture, town, view

TOWN_PLAIN = "Scenery is reduced to simple flat house fronts, pavements and a few trees."

Q(5301, "7.18", view("""
THE SCENE: a car park with parking bays marked by white lines, seen from the driver's seat as we drive slowly along its lane. One bay
on the right is free; in the bay beside it a car stands crookedly across the dividing line.
MUST BE CLEARLY VISIBLE: the white bay lines, the free bay, the crooked car across the line.
MUST NOT APPEAR: signs, text, people.""", scenery=TOWN_PLAIN),
  "Du vil parkere på en parkeringsplads med afmærkede båse. Hvad gælder?",
  "You want to park in a car park with marked bays. What applies?",
  "می‌خواهید در پارکینگی با جاهای خط‌کشی‌شده پارک کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen skal holde inden for båsens linjer.", "The car must stand inside the bay's lines.", "خودرو باید داخل خط‌های جای پارک بایستد.",
    "Ved parkering i afmærkede parkeringsbåse skal køretøjet parkeres inden for båsen.", "When parking in marked bays, the vehicle must be parked inside the bay.",
    "هنگام پارک در جاهای خط‌کشی‌شده، خودرو باید داخل همان جا پارک شود."),
  S(False, "Jeg må godt holde hen over to båse, når der er mange ledige.", "I may stand across two bays when many are free.", "وقتی جاهای خالی زیاد است، می‌توانم روی دو جا پارک کنم.",
    "Bilen skal holde inden for én bås, uanset hvor mange der er ledige.", "The car must stand inside one bay, however many are free.", "خودرو باید داخل یک جا بایستد، هر چقدر هم جای خالی باشد."),
  S(True, "Hjulene må gerne stå på en bred kantlinje ud mod kørebanen, men ikke ud over den.",
    "The wheels may stand on a broad edge line towards the carriageway, but not beyond it.",
    "چرخ‌ها می‌توانند روی خط کناری پهنِ سمت سواره‌رو باشند، ولی نه بیرون از آن.",
    "Ved båse langs vejen med en bred kantlinje ud mod kørebanen må hjulene stå på linjen, ikke uden for den.",
    "With bays along the road and a broad edge line towards the carriageway, the wheels may stand on the line, not outside it.",
    "در جاهای پارکِ کنار جاده که خط کناری پهن به سمت سواره‌رو دارند، چرخ‌ها می‌توانند روی خط باشند، نه بیرون آن."),
  S(True, "Jeg holder, så de andre kan komme ind i deres biler.", "I park so that the others can get into their cars.", "طوری پارک می‌کنم که دیگران بتوانند سوار خودروهایشان شوند.",
    "Det er forbudt at parkere, så adgangen til et andet køretøj hindres.", "It is forbidden to park so that access to another vehicle is blocked.",
    "پارک به شکلی که دسترسی به خودروی دیگر را ببندد ممنوع است."),
)

Q(5302, "7.18", town("""
THE SCENE: a town street with shops. Along the right kerb runs a BROKEN (dotted) yellow line painted on the kerb's edge, and the space
along it is free. Further back, at another stretch of kerb, an unbroken yellow line can be seen.
MUST BE CLEARLY VISIBLE: the broken yellow line along the free kerb.
MUST NOT APPEAR: signs, text."""),
  "Langs kantstenen er der en stiplet gul linje. Du vil sætte en passager af og derefter køre videre. Hvad gælder?",
  "Along the kerb there is a broken yellow line. You want to let a passenger out and then drive on. What applies?",
  "کنار جدول یک خط زرد خط‌چین هست. می‌خواهید مسافری را پیاده کنید و بعد ادامه دهید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må godt standse et øjeblik og lade passageren stige ud.", "I may stop briefly to let the passenger out.", "می‌توانم کوتاه بایستم تا مسافر پیاده شود.",
    "Den stiplede gule linje angiver parkeringsforbud, og standsning for af- og påstigning er ikke parkering.",
    "The broken yellow line marks a parking ban, and stopping to let people in or out is not parking.",
    "خط زرد خط‌چین ممنوعیت پارک را نشان می‌دهد و توقف برای سوار و پیاده شدن پارک حساب نمی‌شود."),
  S(False, "Jeg må parkere her i op til en time.", "I may park here for up to an hour.", "می‌توانم تا یک ساعت اینجا پارک کنم.",
    "Parkering er forbudt langs den stiplede gule linje.", "Parking is forbidden along the broken yellow line.", "پارک کنار خط زرد خط‌چین ممنوع است."),
  S(True, "En ubrudt gul linje ville betyde, at jeg slet ikke må standse.", "An unbroken yellow line would mean that I may not stop at all.",
    "خط زرد ممتد یعنی اصلاً نمی‌توانم توقف کنم.",
    "Den ubrudte gule linje angiver standsningsforbud.", "The unbroken yellow line marks a stopping ban.", "خط زرد ممتد ممنوعیت توقف را نشان می‌دهد."),
  S(False, "Den stiplede gule linje betyder, at der kommer et fodgængerfelt.", "The broken yellow line means that a pedestrian crossing is coming.",
    "خط زرد خط‌چین یعنی جلوتر گذرگاه عابر پیاده هست.",
    "Gule linjer langs kantstenen handler om standsning og parkering.", "Yellow lines along the kerb are about stopping and parking.",
    "خط‌های زرد کنار جدول مربوط به توقف و پارک‌اند."),
)

Q(5303, "7.18", town("""
THE SCENE: a town street. At the right kerb a short stretch is marked as a taxi stand: a blue square sign with the white word «TAXI»
stands at its start, and the white word «TAXI» is painted in the bay. No taxis are waiting there now.
MUST BE CLEARLY VISIBLE: the TAXI sign and the empty taxi bay.
MUST NOT APPEAR: taxis, other text."""),
  "Ved kantstenen er der en afmærket holdeplads for taxier. Den er tom. Du vil standse og hente en ven. Hvad gælder?",
  "At the kerb there is a marked taxi stand. It is empty. You want to stop and pick up a friend. What applies?",
  "کنار جدول یک ایستگاه تاکسیِ خط‌کشی‌شده هست که خالی است. می‌خواهید بایستید و دوستتان را سوار کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke standse på taxiholdepladsen.", "I must not stop on the taxi stand.", "نباید در ایستگاه تاکسی توقف کنم.",
    "Det er forbudt at standse eller parkere på en afmærket holdeplads for hyrevogne.", "Stopping or parking on a marked taxi stand is forbidden.",
    "توقف یا پارک در ایستگاه تاکسیِ خط‌کشی‌شده ممنوع است."),
  S(False, "Jeg må standse, fordi der ikke holder nogen taxier.", "I may stop because no taxis are there.", "چون تاکسی‌ای آنجا نیست، می‌توانم بایستم.",
    "Forbuddet gælder også, når holdepladsen er tom.", "The ban also applies when the stand is empty.", "این ممنوعیت وقتی ایستگاه خالی است هم برقرار است."),
  S(False, "Jeg må standse kort, hvis jeg bliver siddende i bilen.", "I may stop briefly if I stay in the car.", "اگر داخل خودرو بمانم، می‌توانم کوتاه بایستم.",
    "Forbuddet gælder enhver standsning, også med føreren i bilen.", "The ban covers every stop, also with the driver in the car.",
    "این ممنوعیت هر توقفی را شامل می‌شود، حتی اگر راننده داخل خودرو باشد."),
)

Q(5304, "7.18", above("""
THE SCENE: a single-lane roundabout seen from above with a round grass central island and four roads joining it; a house lies beside the
roundabout between two of its exits.
VEHICLES (colour code used strictly): a RED car (ours) going round the roundabout; a DASHED ORANGE arrow from it to the roundabout's
outer edge beside the house, as if to stop there; a SOLID GREEN arrow from it leaving by the next exit and stopping at the kerb well
down the exit road.
MUST NOT APPEAR: signs, text."""),
  "Din passager vil stige ud ved et hus, der ligger ved rundkørslen. Du overvejer at standse i rundkørslen. Hvad gælder?",
  "Your passenger wants to get out at a house beside the roundabout. You are thinking of stopping in the roundabout. What applies?",
  "مسافرتان می‌خواهد کنار خانه‌ای که کنار میدان است پیاده شود. به توقف در میدان فکر می‌کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Det er forbudt at standse i rundkørslen.", "Stopping in the roundabout is forbidden.", "توقف در میدان ممنوع است.",
    "En rundkørsel er et vejkryds, og i vejkryds er standsning og parkering forbudt.", "A roundabout is a junction, and in a junction stopping and parking are forbidden.",
    "میدان یک تقاطع است و توقف و پارک در تقاطع ممنوع است."),
  S(True, "Jeg kører ud af rundkørslen og standser et lovligt sted, mindst 10 m fra krydset.", "I leave the roundabout and stop at a lawful place, at least 10 m from the junction.",
    "از میدان بیرون می‌روم و جایی مجاز، دست‌کم ۱۰ متر دورتر از تقاطع، می‌ایستم.",
    "Standsning er forbudt i et vejkryds og nærmere end 10 m fra den tværgående kørebanes kant.",
    "Stopping is forbidden in a junction and closer than 10 m to the edge of the crossing carriageway.",
    "توقف در تقاطع و کمتر از ۱۰ متر از لبه‌ی سواره‌روی عرضی ممنوع است."),
  S(False, "Jeg må standse helt ude i kanten af rundkørslen, hvis jeg tænder havariblinket.", "I may stop right at the roundabout's edge if I switch on the hazard lights.",
    "اگر چراغ خطر را روشن کنم، می‌توانم کاملاً لبه‌ی میدان بایستم.",
    "Havariblinket gør ikke standsning tilladt, hvor den er forbudt.", "The hazard lights do not make stopping allowed where it is forbidden.",
    "چراغ خطر توقف را در جایی که ممنوع است مجاز نمی‌کند."),
  S(False, "Det er tilladt, hvis passageren skynder sig.", "It is allowed if the passenger hurries.", "اگر مسافر عجله کند، مجاز است.",
    "Forbuddet gælder enhver standsning, også en kort.", "The ban covers every stop, also a short one.", "این ممنوعیت هر توقفی را شامل می‌شود، حتی کوتاه."),
)

Q(5305, "7.18", town("""
THE SCENE: a busy town street; our car is parked at the right kerb, seen from the driver's seat looking back over the shoulder: two
children sit on the back seat; cars pass close by on the street side, and the pavement with a few pedestrians is on the right.
MUST BE CLEARLY VISIBLE: the two children on the back seat, the passing traffic on the left, the pavement on the right.
MUST NOT APPEAR: text, signs."""),
  "Du har parkeret ved kantstenen i en befærdet gade. To børn på bagsædet skal ud. Hvordan forholder du dig?",
  "You have parked at the kerb in a busy street. Two children on the back seat are getting out. What do you do?",
  "در خیابانی شلوغ کنار جدول پارک کرده‌اید. دو کودک روی صندلی عقب می‌خواهند پیاده شوند. چه می‌کنید؟",
  S(True, "Jeg lader børnene stige ud i fortovssiden.", "I let the children get out on the pavement side.", "می‌گذارم بچه‌ها از سمت پیاده‌رو پیاده شوند.",
    "Afstigning skal ske uden fare; i fortovssiden er børnene væk fra trafikken.", "Getting out must be done without danger; on the pavement side the children are away from the traffic.",
    "پیاده شدن باید بی‌خطر باشد؛ در سمت پیاده‌رو بچه‌ها از ترافیک دورند."),
  S(True, "Jeg bruger børnesikringen i bagdørene, så de ikke åbner døren i vejsiden.", "I use the child locks in the rear doors so that they do not open the door on the street side.",
    "قفل کودک درهای عقب را فعال می‌کنم تا در سمت خیابان را باز نکنند.",
    "Børn kan åbne døren uden at se sig for.", "Children may open the door without looking.", "بچه‌ها ممکن است بدون نگاه کردن در را باز کنند."),
  S(False, "Det er hurtigst at lade dem stige ud i vejsiden, hvor døren er nærmest.", "It is quickest to let them out on the street side, where the door is nearest.",
    "سریع‌تر است از سمت خیابان پیاده شوند، چون در به آن‌ها نزدیک‌تر است.",
    "I vejsiden kan de blive ramt af den forbikørende trafik.", "On the street side they can be hit by passing traffic.", "در سمت خیابان ممکن است ترافیک عبوری به آن‌ها بزند."),
  S(True, "Jeg holder øje med cyklister og gående, når dørene åbnes.", "I watch out for cyclists and pedestrians when the doors are opened.",
    "هنگام باز شدن درها مراقب دوچرخه‌سواران و عابران هستم.",
    "Døre skal åbnes, så der ikke opstår fare eller unødig ulempe for andre.", "Doors must be opened so that there is no danger or undue inconvenience to others.",
    "درها باید طوری باز شوند که برای دیگران خطر یا مزاحمتی پیش نیاید."),
)

Q(5306, "7.18", picture("""
A close-up seen from outside, through the windscreen of a parked car: a blue parking disc lies just inside the windscreen at the bottom
right, its clock face clearly readable. Beside the car, at the kerb, a blue square parking sign with a white P and a white plate under
it showing a small parking-disc symbol and «2 t».
MUST BE CLEARLY VISIBLE: the parking disc inside the windscreen, the P sign with its plate.
MUST NOT APPEAR: other text, people, brand names."""),
  "Du har parkeret med P-skive på en plads, hvor du må holde 2 timer. Tiden er snart gået, men du er ikke færdig med at handle. Hvad gælder?",
  "You have parked with a parking disc at a place where you may stay 2 hours. The time is nearly up, but you have not finished shopping. What applies?",
  "با صفحه‌ی ساعت پارک (P-skive) جایی پارک کرده‌اید که ۲ ساعت مجاز است. وقت تقریباً تمام است، ولی خریدتان تمام نشده. چه قاعده‌ای برقرار است؟",
  S(False, "Jeg går ud og stiller P-skiven frem, så har jeg 2 timer mere.", "I go out and set the parking disc forward, and then I have 2 more hours.",
    "می‌روم و صفحه‌ی ساعت پارک را جلو می‌کشم تا ۲ ساعت دیگر وقت داشته باشم.",
    "P-skivens indstilling må ikke ændres, mens bilen holder parkeret.", "The parking disc's setting must not be changed while the car is parked.",
    "تا وقتی خودرو پارک است، تنظیم صفحه‌ی ساعت پارک نباید تغییر کند."),
  S(True, "Jeg skal køre bilen væk, inden de 2 timer er gået.", "I must drive the car away before the 2 hours are up.", "باید پیش از پایان ۲ ساعت خودرو را از آنجا ببرم.",
    "Parkeringen skal ophøre senest, når den tilladte tid er udløbet.", "The parking must end at the latest when the permitted time has run out.",
    "پارک باید حداکثر تا پایان مدت مجاز تمام شود."),
  S(True, "P-skiven skal ligge lige inden for forruden, så den kan læses udefra.", "The parking disc must lie just inside the windscreen so that it can be read from outside.",
    "صفحه‌ی ساعت پارک باید درست پشت شیشه‌ی جلو باشد تا از بیرون خوانده شود.",
    "Skiven skal anbringes umiddelbart inden for forruden og tydeligt kunne aflæses udefra.", "The disc must be placed immediately inside the windscreen and be clearly readable from outside.",
    "صفحه باید درست پشت شیشه‌ی جلو گذاشته شود و از بیرون به‌روشنی خوانده شود."),
  S(False, "Reglerne gælder ikke, hvis jeg lægger en seddel med mit telefonnummer i ruden.", "The rules do not apply if I leave a note with my phone number in the window.",
    "اگر یادداشتی با شماره‌تلفنم پشت شیشه بگذارم، این قواعد برقرار نیستند.",
    "En seddel ændrer ikke på tidsbegrænsningen.", "A note does not change the time limit.", "یادداشت محدودیت زمانی را تغییر نمی‌دهد."),
)

Q(5307, "7.9", view("""
THE SCENE: a two-lane country road with a broken centre line on a sunny day. About 40 m ahead two cyclists ride side by side in our lane,
the inner one close to the centre line; far ahead in the oncoming lane a car approaches.
MUST BE CLEARLY VISIBLE: the two cyclists side by side, the oncoming car far ahead.
MUST NOT APPEAR: signs, text."""),
  "Foran dig kører to cyklister ved siden af hinanden. Du vil overhale dem. Hvad gælder?",
  "In front of you two cyclists are riding side by side. You want to overtake them. What applies?",
  "جلوی شما دو دوچرخه‌سوار کنار هم رکاب می‌زنند. می‌خواهید از آن‌ها سبقت بگیرید. چه قاعده‌ای برقرار است؟",
  S(True, "Cyklisterne må godt køre ved siden af hinanden, når der er plads, og det kan ske uden fare.",
    "The cyclists may ride side by side when there is room and it can be done safely.",
    "دوچرخه‌سواران وقتی جا هست و بی‌خطر است، می‌توانند کنار هم برانند.",
    "Hvor der er tilstrækkelig plads, må to cyklister køre ved siden af hinanden, hvis det kan ske uden fare eller unødig ulempe.",
    "Where there is enough room, two cyclists may ride side by side if it can be done without danger or undue inconvenience.",
    "جایی که جای کافی هست، دو دوچرخه‌سوار می‌توانند کنار هم برانند، اگر خطر یا مزاحمتی نداشته باشد."),
  S(True, "Jeg overhaler først, når jeg kan holde god afstand til siden og ikke kommer i vejen for den modkørende.",
    "I only overtake when I can keep a good distance to the side and do not get in the way of the oncoming car.",
    "فقط وقتی سبقت می‌گیرم که بتوانم فاصله‌ی کافی از پهلو داشته باشم و سر راه خودروی روبه‌رو قرار نگیرم.",
    "Den modsatte vognbane skal være fri på en tilstrækkeligt lang strækning, og du skal holde tilstrækkelig sideafstand.",
    "The opposite lane must be free for a long enough stretch, and you must keep enough side distance.",
    "خط مقابل باید در طول کافی خالی باشد و باید فاصله‌ی کافی از پهلو داشته باشید."),
  S(False, "Cyklister må aldrig køre ved siden af hinanden.", "Cyclists may never ride side by side.", "دوچرخه‌سواران هیچ‌وقت نباید کنار هم برانند.",
    "Det er tilladt, når der er plads, og det kan ske uden fare.", "It is allowed when there is room and it can be done safely.", "وقتی جا هست و بی‌خطر است، مجاز است."),
  S(False, "Når de kører ved siden af hinanden, må jeg overhale tæt forbi dem.", "When they ride side by side, I may overtake close past them.",
    "وقتی کنار هم می‌رانند، می‌توانم از نزدیکشان سبقت بگیرم.",
    "Du skal altid holde tilstrækkelig afstand til siden, når du overhaler.", "You must always keep enough distance to the side when overtaking.",
    "هنگام سبقت همیشه باید فاصله‌ی کافی از پهلو داشته باشید."),
)

Q(5308, "7.9", view("""
THE SCENE: a two-lane country road. The broken centre line ahead changes into a line of LONG white dashes with short gaps (a warning
line), and further on, before a bend, it becomes an unbroken line. A slow car drives ahead of us.
MUST BE CLEARLY VISIBLE: the change from short dashes to long dashes, the unbroken line further ahead, the slow car.
MUST NOT APPEAR: signs, text."""),
  "Midterlinjen skifter til lange streger med korte mellemrum, og længere fremme bliver den ubrudt. Foran dig kører en langsom bil. Hvad gælder?",
  "The centre line changes to long dashes with short gaps, and further ahead it becomes unbroken. A slow car is in front of you. What applies?",
  "خط وسط به خط‌چین‌های بلند با فاصله‌ی کم تبدیل می‌شود و جلوتر ممتد می‌شود. یک خودروی کُند جلوی شماست. چه قاعده‌ای برقرار است؟",
  S(True, "De lange streger er en varsellinje, der advarer om, at der snart kommer en ubrudt linje eller et farligt sted.",
    "The long dashes are a warning line telling that an unbroken line or a dangerous place is coming soon.",
    "خط‌چین‌های بلند خط هشدارند و خبر می‌دهند که به‌زودی خط ممتد یا جای خطرناکی می‌آید.",
    "Varsellinjen varsler en spærrelinje eller et farligt sted, og den kræver særlig opmærksomhed.",
    "The warning line announces a barrier line or a dangerous place, and it calls for extra care.",
    "خط هشدار از نزدیک بودن خط ممتد یا جای خطرناک خبر می‌دهد و توجه ویژه می‌خواهد."),
  S(True, "Jeg begynder ikke en overhaling, som jeg ikke kan nå at afslutte, før den ubrudte linje begynder.",
    "I do not start an overtaking that I cannot finish before the unbroken line begins.", "سبقتی را که پیش از شروع خط ممتد تمام نمی‌شود شروع نمی‌کنم.",
    "Den ubrudte linje må ikke overskrides, heller ikke for at afslutte en overhaling.", "The unbroken line must not be crossed, not even to finish an overtaking.",
    "نباید از خط ممتد رد شد، حتی برای تمام کردن سبقت."),
  S(False, "Jeg må køre over den ubrudte linje, hvis jeg begyndte overhalingen før den.", "I may cross the unbroken line if I began overtaking before it.",
    "اگر سبقت را پیش از خط ممتد شروع کرده باشم، می‌توانم از روی آن رد شوم.",
    "Spærrelinjen må ikke overskrides; overhalingen skal være afsluttet inden.", "The barrier line must not be crossed; the overtaking must be finished before it.",
    "از خط ممتد نباید رد شد؛ سبقت باید پیش از آن تمام شده باشد."),
  S(False, "De lange streger betyder, at jeg slet ikke må krydse dem.", "The long dashes mean that I may not cross them at all.", "خط‌چین‌های بلند یعنی اصلاً نباید از رویشان رد شوم.",
    "En varsellinje må krydses med forsigtighed; det er den ubrudte linje, der ikke må.", "A warning line may be crossed with care; it is the unbroken line that may not.",
    "از خط هشدار با احتیاط می‌توان رد شد؛ این خط ممتد است که نباید از آن گذشت."),
)

Q(5309, "7.9", view("""
THE SCENE: a two-lane country road. On the right verge stands a red-bordered white warning triangle showing two black lines that come
closer together towards the top (the road-narrowing sign). Ahead of us a slow van drives along, and about 200 m ahead the road visibly
narrows between two walls of a small bridge.
MUST BE CLEARLY VISIBLE: the warning sign, the slow van, the narrowing ahead.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle. Foran dig kører en langsom varevogn. Hvad gælder for overhaling?",
  "You pass this sign. A slow van is driving in front of you. What applies to overtaking?",
  "از کنار این تابلو می‌گذرید. یک ون کُند جلوی شما می‌رود. درباره‌ی سبقت چه قاعده‌ای برقرار است؟",
  S(True, "Jeg venter med at overhale, til vejen er bred igen.", "I wait to overtake until the road is wide again.", "تا پهن شدن دوباره‌ی جاده برای سبقت صبر می‌کنم.",
    "Der skal være plads til at komme ind igen uden fare; ved indsnævringen er der ikke det.", "There must be room to get back in safely; at the narrowing there is not.",
    "باید جای کافی برای برگشتن بی‌خطر باشد؛ در باریک‌شدگی چنین جایی نیست."),
  S(False, "Jeg skynder mig at overhale, før vejen bliver smal.", "I hurry to overtake before the road becomes narrow.", "عجله می‌کنم تا پیش از باریک شدن جاده سبقت بگیرم.",
    "Når du skynder dig mod en indsnævring, risikerer du at møde nogen der, hvor ingen kan vige.",
    "Hurrying towards a narrowing, you risk meeting someone there where nobody can give way.",
    "با عجله به سمت باریک‌شدگی، خطر دارد در جایی با کسی روبه‌رو شوید که هیچ‌کس نمی‌تواند کنار برود."),
  S(True, "Tavlen advarer om, at vejen bliver smallere.", "The sign warns that the road becomes narrower.", "این تابلو هشدار می‌دهد که جاده باریک‌تر می‌شود.",
    "Tavlen advarer om indsnævret vej.", "The sign warns of a narrowing road.", "این تابلو درباره‌ی باریک‌شدگی جاده هشدار می‌دهد."),
  S(False, "Tavlen betyder, at overhaling er forbudt på resten af vejen.", "The sign means that overtaking is forbidden for the rest of the road.",
    "این تابلو یعنی سبقت در بقیه‌ی جاده ممنوع است.",
    "Tavlen er en advarsel, ikke et overhalingsforbud.", "The sign is a warning, not a ban on overtaking.", "این تابلو هشدار است، نه ممنوعیت سبقت."),
)

Q(5310, "7.9", view("""
THE SCENE: a two-lane country road. A slow tractor drives ahead of us. In the left door mirror (at the left edge of the picture) a car
behind us has already pulled out into the oncoming lane to overtake us.
MUST BE CLEARLY VISIBLE: the tractor ahead, the overtaking car in the left door mirror.
MUST NOT APPEAR: signs, text."""),
  "Du vil overhale traktoren foran dig. I spejlet ser du, at bilen bag dig allerede er trukket ud for at overhale. Hvad gælder?",
  "You want to overtake the tractor in front of you. In the mirror you see that the car behind you has already pulled out to overtake. What applies?",
  "می‌خواهید از تراکتور جلویی سبقت بگیرید. در آینه می‌بینید خودروی پشتی برای سبقت بیرون آمده است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg venter, til bilen bag mig er kommet forbi.", "I wait until the car behind me has passed.", "صبر می‌کنم تا خودروی پشتی رد شود.",
    "Du må ikke begynde at overhale, når et køretøj bagfra er begyndt at overhale.", "You must not start overtaking when a vehicle from behind has begun to overtake.",
    "وقتی وسیله‌ای از پشت سبقت را شروع کرده، نباید سبقت را آغاز کنید."),
  S(False, "Jeg trækker ud alligevel, fordi jeg var først bag traktoren.", "I pull out anyway because I was first behind the tractor.",
    "به هر حال بیرون می‌روم، چون اول پشت تراکتور بودم.",
    "Så kan I støde sammen; den, der allerede er i gang, skal kunne gøre overhalingen færdig.", "Then you may collide; the one already overtaking must be able to finish.",
    "ممکن است با هم برخورد کنید؛ کسی که سبقت را شروع کرده باید بتواند تمامش کند."),
  S(True, "Jeg holder til højre og farten jævn, så bilen let kan komme forbi.", "I keep right and my speed steady so that the car can get past easily.",
    "سمت راست می‌مانم و سرعتم را ثابت نگه می‌دارم تا آن خودرو راحت رد شود.",
    "Den, der bliver overhalet, skal holde til højre og ikke sætte farten op.", "The one being overtaken must keep right and not speed up.",
    "کسی که از او سبقت گرفته می‌شود باید سمت راست بماند و سرعتش را بالا نبرد."),
  S(False, "Jeg giver tegn til venstre, så bilen bag mig må vente.", "I signal left so that the car behind me has to wait.", "راهنمای چپ می‌زنم تا خودروی پشتی مجبور به صبر شود.",
    "Blinklyset giver dig ikke ret til at trække ud foran en, der allerede overhaler.", "The indicator does not give you the right to pull out in front of someone already overtaking.",
    "راهنما به شما حق نمی‌دهد جلوی کسی که در حال سبقت است بیرون بروید."),
)

Q(5311, "7.9", above("""
THE SCENE: a motorway seen from above with TWO lanes in our direction.
VEHICLES (colour code used strictly): a GREY car driving slowly in the LEFT lane; the right lane free ahead and beside it; a RED car
(ours) behind the grey car in the left lane; a DASHED ORANGE arrow from the red car passing the grey car on its RIGHT.
MUST NOT APPEAR: signs, text."""),
  "På motorvejen kører en bil langsomt i venstre vognbane, selv om højre vognbane er fri. Du kommer bagfra. Hvad gælder?",
  "On the motorway a car is driving slowly in the left lane although the right lane is free. You come up behind it. What applies?",
  "در آزادراه خودرویی آهسته در خط چپ می‌رود، با این‌که خط راست خالی است. شما از پشت می‌رسید. چه قاعده‌ای برقرار است؟",
  S(False, "Jeg må overhale den i højre side, fordi den kører forkert.", "I may overtake it on the right because it is in the wrong.",
    "چون آن خودرو اشتباه می‌کند، می‌توانم از سمت راستش سبقت بگیرم.",
    "Overhaling skal ske til venstre; kun i tæt kø i flere rækker regnes det ikke som overhaling at køre forbi i en anden vognbane.",
    "Overtaking must be done on the left; only in dense queues in several rows does passing in another lane not count as overtaking.",
    "سبقت باید از چپ باشد؛ فقط در صف‌های سنگین چندردیفه رد شدن در خط دیگر سبقت حساب نمی‌شود."),
  S(True, "Jeg bliver bag den og holder god afstand, til den kører ind til højre.", "I stay behind it and keep a good distance until it moves to the right.",
    "پشتش می‌مانم و فاصله‌ی کافی نگه می‌دارم تا به راست برود.",
    "Så undgår du både en farlig overhaling og at køre for tæt på.", "That way you avoid both a dangerous overtaking and driving too close.",
    "این‌طور هم از سبقت خطرناک و هم از نزدیک شدن بیش از حد پرهیز می‌کنید."),
  S(False, "Jeg kører tæt op bag den og blinker med fjernlyset, så den flytter sig.", "I drive right up behind it and flash my high beam so that it moves.",
    "به آن خیلی نزدیک می‌شوم و با نور بالا چراغ می‌زنم تا کنار برود.",
    "Du skal holde afstand, og lyssignal er kun til at advare om fare.", "You must keep your distance, and a light signal is only for warning of danger.",
    "باید فاصله بگیرید و علامت نوری فقط برای هشدار خطر است."),
  S(True, "Normalt skal overhaling ske i venstre side.", "Overtaking must normally be done on the left.", "سبقت معمولاً باید از سمت چپ انجام شود.",
    "Overhaling skal ske til venstre, med få undtagelser som et køretøj, der svinger til venstre.", "Overtaking must be done on the left, with a few exceptions such as a vehicle turning left.",
    "سبقت باید از چپ باشد، با چند استثنا مثل وسیله‌ای که به چپ می‌پیچد."),
)

Q(5312, "6.1", view("""
THE SCENE: the entrance to a narrow lane leading into a park. At the entrance stands a round sign with a broad red ring and a plain white
field with nothing inside it (the Danish sign banning driving in both directions). Two people walk along the lane.
MUST BE CLEARLY VISIBLE: the round sign with the red ring and empty white field, the lane behind it.
MUST NOT APPEAR: other signs, text, vehicles in the lane."""),
  "Ved indkørslen til vejen står denne tavle. Hvad betyder den?",
  "At the entrance to the road stands this sign. What does it mean?",
  "در ورودی راه این تابلو قرار دارد. معنی‌اش چیست؟",
  S(True, "Kørsel i begge retninger er forbudt.", "Driving in both directions is forbidden.", "رانندگی در هر دو جهت ممنوع است.",
    "Tavlen forbyder kørsel i begge retninger.", "The sign bans driving in both directions.", "این تابلو رانندگی در هر دو جهت را ممنوع می‌کند."),
  S(False, "Tavlen forbyder kun indkørsel fra denne side; fra den anden ende må jeg gerne køre ind.", "The sign only bans entry from this side; from the other end I may drive in.",
    "این تابلو فقط ورود از این طرف را ممنوع می‌کند؛ از سر دیگر می‌توانم وارد شوم.",
    "Forbuddet gælder kørsel i begge retninger.", "The ban covers driving in both directions.", "این ممنوعیت رانندگی در هر دو جهت را شامل می‌شود."),
  S(False, "Cykler må gerne køre ind, fordi tavlen kun gælder motorkøretøjer.", "Bicycles may ride in because the sign only applies to motor vehicles.",
    "دوچرخه‌ها می‌توانند وارد شوند، چون این تابلو فقط برای وسایل موتوری است.",
    "Forbuddet gælder al kørsel; et forbud kun for motorkøretøjer har sin egen tavle.", "The ban covers all driving; a ban only for motor vehicles has its own sign.",
    "این ممنوعیت همه‌ی رانندگی‌ها را شامل می‌شود؛ ممنوعیتِ فقط وسایل موتوری تابلوی خودش را دارد."),
  S(False, "Tavlen gælder kun om natten.", "The sign only applies at night.", "این تابلو فقط شب‌ها برقرار است.",
    "Uden undertavle med et tidsrum gælder forbuddet hele døgnet.", "Without a sub-plate giving times, the ban applies round the clock.",
    "بدون زیرتابلوی ساعت، این ممنوعیت در تمام شبانه‌روز برقرار است."),
)

Q(5313, "6.1", view("""
THE SCENE: the entrance to a residential road. At the entrance stands a round sign with a red ring and a white field showing a black
lorry, with a white rectangular plate under it showing «12 t».
MUST BE CLEARLY VISIBLE: the round sign with the lorry, the plate with 12 t.
MUST NOT APPEAR: other signs, other text."""),
  "Du kører i en almindelig personbil. Ved indkørslen til vejen står denne tavle. Hvad gælder?",
  "You are driving an ordinary car. At the entrance to the road stands this sign. What applies?",
  "با یک خودروی سواری معمولی رانندگی می‌کنید. در ورودی راه این تابلو هست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må køre ind på vejen i min personbil.", "I may drive into the road in my car.", "با خودروی سواری‌ام می‌توانم وارد این راه شوم.",
    "Tavlen forbyder lastbiler, ikke personbiler.", "The sign bans lorries, not cars.", "این تابلو کامیون را ممنوع می‌کند، نه خودروی سواری."),
  S(True, "Forbuddet gælder lastbiler over den vægt, undertavlen viser.", "The ban applies to lorries above the weight shown on the sub-plate.",
    "این ممنوعیت برای کامیون‌های سنگین‌تر از وزنی است که زیرتابلو نشان می‌دهد.",
    "Med en vægtangivelse på undertavlen er forbuddet begrænset til lastbiler over den vægt.", "With a weight on the sub-plate, the ban is limited to lorries above that weight.",
    "با قید وزن در زیرتابلو، ممنوعیت به کامیون‌های سنگین‌تر از آن وزن محدود می‌شود."),
  S(False, "Tavlen forbyder alle biler at køre ind.", "The sign bans all cars from driving in.", "این تابلو ورود همه‌ی خودروها را ممنوع می‌کند.",
    "Symbolet viser en lastbil; forbuddet gælder kun lastbiler.", "The symbol shows a lorry; the ban applies only to lorries.",
    "نماد تابلو کامیون است؛ ممنوعیت فقط برای کامیون است."),
  S(True, "En varebil på højst 3,5 t er ikke en lastbil og må køre ind.", "A van of at most 3.5 t is not a lorry and may drive in.",
    "یک ون حداکثر ۳٫۵ تنی کامیون حساب نمی‌شود و می‌تواند وارد شود.",
    "Godsbiler op til 3.500 kg er varebiler; lastbiler er tungere.", "Goods vehicles up to 3,500 kg are vans; lorries are heavier.",
    "خودروهای باری تا ۳٬۵۰۰ کیلوگرم ون حساب می‌شوند؛ کامیون‌ها سنگین‌ترند."),
)

Q(5314, "6.1", view("""
THE SCENE: a two-lane country road. On the right verge stands a round white sign with a thin black border showing a grey car and a
black car side by side, crossed by several thin black diagonal lines (the Danish end-of-no-overtaking sign).
MUST BE CLEARLY VISIBLE: the end sign with the two cars and the diagonal lines.
MUST NOT APPEAR: other signs, text."""),
  "Du har kørt på en strækning med overhalingsforbud. Nu kører du forbi denne tavle. Hvad betyder den?",
  "You have been driving on a stretch with an overtaking ban. Now you pass this sign. What does it mean?",
  "در مسیری با ممنوعیت سبقت رانندگی کرده‌اید. حالا از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Overhalingsforbuddet ophører her.", "The overtaking ban ends here.", "ممنوعیت سبقت اینجا تمام می‌شود.",
    "Tavlen angiver ophør af overhalingsforbud.", "The sign shows the end of the overtaking ban.", "این تابلو پایان ممنوعیت سبقت را نشان می‌دهد."),
  S(True, "Jeg må overhale igen efter de almindelige regler.", "I may overtake again under the ordinary rules.", "دوباره می‌توانم طبق قواعد معمول سبقت بگیرم.",
    "Der skal stadig være fri bane, og overhalingen skal kunne ske uden fare.", "The road must still be clear, and the overtaking must be possible without danger.",
    "هنوز باید جاده خالی باشد و سبقت بی‌خطر انجام شود."),
  S(False, "Nu må jeg overhale overalt, også i kryds og ved bakketoppe.", "Now I may overtake anywhere, also in junctions and at hilltops.",
    "حالا هر جا می‌توانم سبقت بگیرم، حتی در تقاطع و بالای تپه.",
    "Lovens forbud mod overhaling i kryds og ved uoverskuelige bakker gælder stadig.", "The law's bans on overtaking in junctions and at blind hills still apply.",
    "ممنوعیت‌های قانونی سبقت در تقاطع و تپه‌های بی‌دید همچنان برقرارند."),
  S(False, "Tavlen ophæver også en lokal hastighedsgrænse.", "The sign also ends a local speed limit.", "این تابلو حد سرعت محلی را هم لغو می‌کند.",
    "Tavlen gælder kun overhalingsforbuddet.", "The sign only concerns the overtaking ban.", "این تابلو فقط درباره‌ی ممنوعیت سبقت است."),
)

Q(5315, "6.1", view("""
THE SCENE: a road approaching a junction in town. On the right, just before the junction, stands a round BLUE sign with a white arrow
pointing to the RIGHT (the Danish required-direction sign).
MUST BE CLEARLY VISIBLE: the blue round sign with the arrow to the right, the junction.
MUST NOT APPEAR: other signs, text."""),
  "Ved krydset står denne blå tavle. Hvad betyder den?",
  "At the junction stands this blue sign. What does it mean?",
  "کنار تقاطع این تابلوی آبی قرار دارد. معنی‌اش چیست؟",
  S(True, "Jeg skal svinge til højre.", "I must turn right.", "باید به راست بپیچم.",
    "Tavlen er et påbud: kørselsretningen er den, pilen viser.", "The sign is a requirement: the direction of travel is the one the arrow shows.",
    "این تابلو الزامی است: جهت حرکت همانی است که فلش نشان می‌دهد."),
  S(False, "Jeg må køre ligeud, hvis der ikke kommer nogen.", "I may go straight on if nobody is coming.", "اگر کسی نیاید، می‌توانم مستقیم بروم.",
    "Påbuddet gælder, uanset trafikken.", "The requirement applies whatever the traffic.", "این الزام، ترافیک هر چه باشد، برقرار است."),
  S(False, "Tavlen anbefaler, at jeg kører til højre, men jeg må selv vælge.", "The sign recommends turning right, but I may choose for myself.",
    "این تابلو پیشنهاد می‌کند به راست بپیچم، ولی خودم می‌توانم انتخاب کنم.",
    "Runde blå tavler er påbud, ikke anbefalinger.", "Round blue signs are requirements, not recommendations.", "تابلوهای گرد آبی الزام‌اند، نه پیشنهاد."),
)

Q(5316, "6.1", town("""
THE SCENE: we turn into a town street lined with parked cars on both sides. At the corner hangs a blue rectangular sign with a large
white arrow pointing along the street in our direction (the Danish one-way sign).
MUST BE CLEARLY VISIBLE: the blue sign with the white arrow, the street with cars parked on both sides facing the same way.
MUST NOT APPEAR: other signs, text, oncoming vehicles."""),
  "Du drejer ind på en gade med denne tavle. Hvad betyder den?",
  "You turn into a street with this sign. What does it mean?",
  "وارد خیابانی با این تابلو می‌شوید. معنی‌اش چیست؟",
  S(True, "Gaden er ensrettet i den retning, pilen viser.", "The street is one-way in the direction the arrow shows.", "این خیابان در جهتی که فلش نشان می‌دهد یک‌طرفه است.",
    "Tavlen angiver ensrettet færdsel.", "The sign shows one-way traffic.", "این تابلو ترافیک یک‌طرفه را نشان می‌دهد."),
  S(True, "Jeg må parkere i venstre side af gaden.", "I may park on the left side of the street.", "می‌توانم در سمت چپ خیابان پارک کنم.",
    "På vej med ensrettet færdsel må der standses og parkeres i venstre side.", "On a one-way road you may stop and park on the left side.",
    "در راه یک‌طرفه توقف و پارک در سمت چپ مجاز است."),
  S(False, "Der kan komme biler imod mig i gaden.", "Cars may come towards me in the street.", "ممکن است در این خیابان خودروها از روبه‌رو بیایند.",
    "Gaden er ensrettet, så biler kører kun i din retning.", "The street is one-way, so cars only drive in your direction.",
    "خیابان یک‌طرفه است، پس خودروها فقط در جهت شما می‌روند."),
  S(False, "Tavlen betyder, at jeg skal køre ligeud i næste kryds.", "The sign means that I must go straight on at the next junction.",
    "این تابلو یعنی در تقاطع بعدی باید مستقیم بروم.",
    "Et påbud om kørselsretning vises på en rund blå tavle.", "A required direction is shown on a round blue sign.", "جهت الزامی با تابلوی گرد آبی نشان داده می‌شود."),
)

Q(5317, "7.6", town("""
THE SCENE: a wide town street with one lane in each direction and a zebra crossing split by a raised traffic island in the middle. A
woman has crossed the far half and now stands on the island, about to step out onto the half in front of us.
MUST BE CLEARLY VISIBLE: the zebra crossing, the island, the woman on the island about to step onto our half.
MUST NOT APPEAR: traffic lights, text."""),
  "Fodgængerfeltet foran dig er delt af en helle. En kvinde står på hellen og vil gå videre over din side. Hvordan forholder du dig?",
  "The pedestrian crossing in front of you is split by a traffic island. A woman is standing on the island and wants to carry on across your side. What do you do?",
  "گذرگاه عابر پیاده‌ی جلوی شما با یک جزیره‌ی میانی دو قسمت شده است. زنی روی جزیره ایستاده و می‌خواهد از سمت شما ادامه دهد. چه می‌کنید؟",
  S(True, "Jeg standser og lader hende gå over.", "I stop and let her cross.", "می‌ایستم و می‌گذارم رد شود.",
    "Ved et fodgængerfelt uden signal skal du om nødvendigt standse for gående, der er ved at gå ud i feltet.",
    "At a crossing without signals you must stop if necessary for pedestrians about to step onto it.",
    "در گذرگاه بدون چراغ، در صورت لزوم باید برای عابرانی که می‌خواهند وارد گذرگاه شوند بایستید."),
  S(False, "Hun skal vente, fordi hun står på hellen og ikke på feltet.", "She must wait because she is standing on the island, not on the crossing.",
    "او باید صبر کند، چون روی جزیره ایستاده نه روی گذرگاه.",
    "Hun er på vej ud i feltet, og du skal lade hende gå over uden fare.", "She is about to step onto the crossing, and you must let her cross safely.",
    "او در حال ورود به گذرگاه است و باید بگذارید بی‌خطر رد شود."),
  S(True, "Jeg sænker farten i god tid, når der er gående ved feltet.", "I slow down in good time when there are pedestrians at the crossing.",
    "وقتی کنار گذرگاه عابر هست، به موقع سرعتم را کم می‌کنم.",
    "Før et fodgængerfelt skal du holde en passende lav hastighed.", "Before a pedestrian crossing you must keep a suitably low speed.",
    "پیش از گذرگاه عابر پیاده باید سرعت مناسبِ کمی داشته باشید."),
)

Q(5318, "7.6", town("""
THE SCENE: a town street with light-rail tracks in the middle. A light-rail tram stands at a platform in the middle of the street, and
passengers are getting off and walking towards a pedestrian crossing at the end of the platform; our lane runs beside the platform.
MUST BE CLEARLY VISIBLE: the tram at the platform, the passengers, the crossing at the platform's end.
MUST NOT APPEAR: text, signs."""),
  "En letbane holder ved et stoppested midt på vejen, og passagerer stiger af. Hvordan forholder du dig?",
  "A light-rail tram is standing at a stop in the middle of the road, and passengers are getting off. What do you do?",
  "یک قطار شهری سبک (letbane) در ایستگاهی وسط خیابان ایستاده و مسافرها پیاده می‌شوند. چه می‌کنید؟",
  S(True, "Jeg sænker farten, fordi passagerer kan gå over vejen til og fra stoppestedet.", "I slow down because passengers may cross the road to and from the stop.",
    "سرعتم را کم می‌کنم، چون مسافرها ممکن است برای رفتن به ایستگاه یا آمدن از آن از خیابان رد شوند.",
    "Når du nærmer dig et letbanekøretøj, der holder for at sætte passagerer af, skal du holde en passende lav hastighed.",
    "When you approach a light-rail vehicle standing to let passengers off, you must keep a suitably low speed.",
    "وقتی به قطار شهری‌ای نزدیک می‌شوید که برای پیاده کردن مسافر ایستاده، باید سرعت مناسبِ کمی داشته باشید."),
  S(True, "Jeg er klar til at standse for gående.", "I am ready to stop for pedestrians.", "آماده‌ی توقف برای عابرانم.",
    "Gående på vej til og fra stoppestedet kan træde ud foran dig.", "Pedestrians on their way to and from the stop may step out in front of you.",
    "عابرانی که به ایستگاه می‌روند یا از آن می‌آیند ممکن است جلوی شما بیایند."),
  S(True, "Gående kan dukke frem bag letbanen.", "Pedestrians may appear from behind the tram.", "ممکن است عابران از پشت قطار بیرون بیایند.",
    "Letbanen skjuler dem, der går om bag den.", "The tram hides those who walk round behind it.", "قطار کسانی را که از پشتش رد می‌شوند پنهان می‌کند."),
  S(False, "Jeg kører hurtigt forbi, før letbanen kører igen.", "I drive past quickly before the tram leaves again.", "پیش از راه افتادن دوباره‌ی قطار، سریع رد می‌شوم.",
    "Høj fart her giver ingen tid til at standse for gående.", "High speed here leaves no time to stop for pedestrians.", "سرعت زیاد اینجا فرصتی برای توقف برای عابران نمی‌گذارد."),
)

Q(5319, "7.6", view("""
THE SCENE: a country road at night with no street lights. In our dipped beam, about 50 m ahead, two runners in dark clothes run at the
right edge of the road in our direction, with their backs to us; only small reflective strips on their shoes shine.
MUST BE CLEARLY VISIBLE: the two runners in dark clothes at the right edge, their small reflective strips.
MUST NOT APPEAR: signs, text, other vehicles.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt. To løbere i mørkt tøj løber i højre vejkant med ryggen til dig. Hvordan forholder du dig?",
  "It is dark. Two runners in dark clothes are running at the right edge of the road with their backs to you. What do you do?",
  "هوا تاریک است. دو دونده با لباس تیره، پشت به شما، در لبه‌ی راست جاده می‌دوند. چه می‌کنید؟",
  S(True, "Jeg sænker farten og giver løberne god plads, når jeg kører forbi.", "I slow down and give them plenty of room when I drive past.",
    "سرعتم را کم می‌کنم و هنگام رد شدن جای کافی به آن‌ها می‌دهم.",
    "Du skal give gående fornøden plads, og i mørke ser du dem sent.", "You must give pedestrians the room they need, and in the dark you see them late.",
    "باید به عابران جای کافی بدهید، و در تاریکی آن‌ها را دیر می‌بینید."),
  S(True, "Uden refleks kan gående i mørkt tøj først ses meget sent.", "Without reflectors, pedestrians in dark clothes can only be seen very late.",
    "عابران با لباس تیره و بدون شبرنگ خیلی دیر دیده می‌شوند.",
    "Mørkt tøj ses kun på kort afstand i nærlys; refleks ses langt længere væk.", "Dark clothes are only seen at a short distance in dipped beam; reflectors are seen much further away.",
    "لباس تیره در نور پایین فقط از فاصله‌ی کم دیده می‌شود؛ شبرنگ از فاصله‌ی خیلی بیشتر."),
  S(False, "De skal flytte sig, fordi de løber i den forkerte side.", "They must move because they are running on the wrong side.", "باید کنار بروند، چون در سمت اشتباه می‌دوند.",
    "Gående på kørebanen skal som regel gå i venstre side, men du skal alligevel tage hensyn til dem.",
    "Pedestrians on the carriageway must as a rule walk on the left, but you must still take care of them.",
    "عابران روی سواره‌رو معمولاً باید سمت چپ بروند، ولی شما در هر حال باید مراقبشان باشید."),
  S(True, "Kommer der en bil imod mig, venter jeg bag løberne, til der er plads.", "If a car comes towards me, I wait behind the runners until there is room.",
    "اگر خودرویی از روبه‌رو بیاید، پشت دونده‌ها صبر می‌کنم تا جا باز شود.",
    "Ved møde skal du tage hensyn til dem, der færdes i vejkanten.", "When meeting, you must take care of those using the edge of the road.",
    "هنگام روبه‌رو شدن باید مراقب کسانی باشید که لبه‌ی جاده حرکت می‌کنند."),
)

Q(5320, "7.6", town("""
THE SCENE: a town street with one lane in each direction. An elderly man in a wheelchair is crossing the street slowly on the zebra
crossing in front of us; he is in the middle of our lane.
MUST BE CLEARLY VISIBLE: the man in the wheelchair on the zebra crossing.
MUST NOT APPEAR: traffic lights, text."""),
  "En mand i kørestol er ved at krydse vejen i fodgængerfeltet foran dig. Det går langsomt. Hvordan forholder du dig?",
  "A man in a wheelchair is crossing the road on the pedestrian crossing in front of you. He is slow. What do you do?",
  "مردی با ویلچر در گذرگاه عابر پیاده‌ی جلوی شما در حال رد شدن از خیابان است و آهسته پیش می‌رود. چه می‌کنید؟",
  S(True, "Jeg venter tålmodigt, til han er kommet over.", "I wait patiently until he has crossed.", "با حوصله صبر می‌کنم تا رد شود.",
    "Gående i et fodgængerfelt skal kunne komme over uden fare, uanset hvor langsomt det går.", "Pedestrians on a crossing must be able to get across safely, however slowly they go.",
    "عابر در گذرگاه باید بتواند بی‌خطر رد شود، هر قدر هم آهسته باشد."),
  S(False, "Jeg kører uden om ham i den modsatte vognbane.", "I drive round him in the opposite lane.", "از خط مقابل دورش می‌زنم و رد می‌شوم.",
    "Du må ikke køre ind på feltet, mens han krydser.", "You must not drive onto the crossing while he is crossing.", "تا وقتی او در حال رد شدن است، نباید وارد گذرگاه شوید."),
  S(False, "Jeg ruller lidt frem, så han kan se, at jeg gerne vil videre.", "I roll forward a little so that he can see that I want to move on.",
    "کمی جلو می‌روم تا ببیند می‌خواهم ادامه دهم.",
    "Det kan skræmme ham og presse ham; vent stille.", "That can frighten and pressure him; wait quietly.", "این کار ممکن است او را بترساند و تحت فشار بگذارد؛ آرام صبر کنید."),
)

Q(5321, "7.3", view("""
THE SCENE: a straight, dry country road; the car ahead of us has its brake lights on, braking hard, at some distance.
MUST BE CLEARLY VISIBLE: the car ahead with its brake lights lit.
MUST NOT APPEAR: signs, text."""),
  "Du kører dobbelt så hurtigt som før. Hvad sker der med bremselængden?",
  "You are driving twice as fast as before. What happens to the braking distance?",
  "دو برابر قبل سریع می‌رانید. مسافت ترمز چه تغییری می‌کند؟",
  S(True, "Den bliver cirka fire gange så lang.", "It becomes about four times as long.", "تقریباً چهار برابر می‌شود.",
    "Bremselængden vokser med farten i anden potens: dobbelt fart giver omkring fire gange så lang bremselængde.",
    "The braking distance grows with the square of the speed: twice the speed gives about four times the braking distance.",
    "مسافت ترمز با مجذور سرعت زیاد می‌شود: سرعت دو برابر یعنی مسافت ترمز حدوداً چهار برابر."),
  S(False, "Den bliver dobbelt så lang.", "It becomes twice as long.", "دو برابر می‌شود.",
    "Den bliver længere end det: omkring fire gange.", "It becomes longer than that: about four times.", "بیشتر از این می‌شود: حدود چهار برابر."),
  S(False, "Den er den samme, hvis bremserne er gode.", "It is the same if the brakes are good.", "اگر ترمزها خوب باشند، همان می‌ماند.",
    "Selv med gode bremser bliver bremselængden meget længere ved højere fart.", "Even with good brakes the braking distance becomes much longer at a higher speed.",
    "حتی با ترمز خوب، در سرعت بیشتر مسافت ترمز خیلی بیشتر می‌شود."),
)

Q(5322, "7.3", town("""
THE SCENE: a residential street; a child suddenly runs out onto the road from between two parked cars about 25 m ahead of us.
MUST BE CLEARLY VISIBLE: the child running out between the parked cars.
MUST NOT APPEAR: signs, text."""),
  "Du kører 50 km/t, og et barn løber pludselig ud på vejen. Hvad gælder for din reaktion?",
  "You are driving at 50 km/h and a child suddenly runs out onto the road. What applies to your reaction?",
  "با ۵۰ کیلومتر بر ساعت می‌رانید و کودکی ناگهان وارد خیابان می‌دود. درباره‌ی واکنش شما چه درست است؟",
  S(True, "Før jeg når at træde på bremsen, kører bilen cirka 14 m, hvis min reaktionstid er 1 sekund.",
    "Before I manage to press the brake, the car travels about 14 m if my reaction time is 1 second.",
    "اگر زمان واکنشم ۱ ثانیه باشد، پیش از رسیدن پایم به ترمز، خودرو حدود ۱۴ متر جلو می‌رود.",
    "Ved 50 km/t kører bilen knap 14 m i sekundet.", "At 50 km/h the car travels almost 14 m a second.", "در ۵۰ کیلومتر بر ساعت خودرو در هر ثانیه نزدیک ۱۴ متر می‌رود."),
  S(True, "Er jeg træt eller uopmærksom, bliver reaktionstiden længere.", "If I am tired or inattentive, the reaction time becomes longer.",
    "اگر خسته یا بی‌حواس باشم، زمان واکنشم بیشتر می‌شود.",
    "Så kører bilen længere, før bremsningen overhovedet begynder.", "Then the car travels further before the braking even begins.", "در این صورت خودرو پیش از شروع ترمز مسافت بیشتری می‌رود."),
  S(False, "Reaktionslængden afhænger kun af bremserne.", "The reaction distance only depends on the brakes.", "مسافت واکنش فقط به ترمزها بستگی دارد.",
    "Reaktionslængden afhænger af farten og af, hvor hurtigt du reagerer.", "The reaction distance depends on the speed and on how quickly you react.",
    "مسافت واکنش به سرعت و به سرعت واکنش شما بستگی دارد."),
  S(True, "Stopafstanden er reaktionslængden plus bremselængden.", "The stopping distance is the reaction distance plus the braking distance.",
    "مسافت توقف برابر است با مسافت واکنش به‌علاوه‌ی مسافت ترمز.",
    "Bilen kører, mens du reagerer, og derefter, mens den bremser.", "The car travels while you react, and then while it brakes.", "خودرو هم در زمان واکنش شما و هم در زمان ترمز جلو می‌رود."),
)

Q(5323, "7.3", view("""
THE SCENE: a country road passing through a small village: a few houses close to the road on both sides, a farm gate, a bus stop
shelter; there is no town-name sign and no speed sign anywhere.
MUST BE CLEARLY VISIBLE: the houses close to the road, the bus stop shelter, the absence of signs.
MUST NOT APPEAR: any sign, text."""),
  "Vejen fører gennem en lille landsby. Der er ingen byzonetavle og ingen hastighedstavler. Hvad gælder?",
  "The road goes through a small village. There is no built-up-area sign and no speed signs. What applies?",
  "جاده از یک روستای کوچک می‌گذرد. نه تابلوی ورود به منطقه‌ی شهری هست و نه تابلوی سرعت. چه قاعده‌ای برقرار است؟",
  S(True, "Den højst tilladte hastighed er 80 km/t.", "The highest permitted speed is 80 km/h.", "حداکثر سرعت مجاز ۸۰ کیلومتر بر ساعت است.",
    "Tættere bebygget område er kun der, hvor det er afmærket med tavler; ellers gælder 80 km/t.", "A built-up area only exists where it is marked with signs; otherwise 80 km/h applies.",
    "«منطقه‌ی مسکونیِ متراکم» فقط جایی است که با تابلو مشخص شده؛ وگرنه ۸۰ کیلومتر بر ساعت برقرار است."),
  S(True, "Jeg sænker alligevel farten, fordi der kan være børn, gående og biler, der kører ud fra husene.",
    "I slow down anyway, because there may be children, pedestrians and cars coming out of the houses.",
    "با این حال سرعتم را کم می‌کنم، چون ممکن است بچه‌ها، عابران و خودروهایی که از خانه‌ها بیرون می‌آیند باشند.",
    "Farten skal altid passe til forholdene, også under grænsen.", "The speed must always suit the conditions, also below the limit.",
    "سرعت همیشه باید با شرایط جور باشد، حتی زیر حد مجاز."),
  S(False, "Der gælder automatisk 50 km/t, fordi der ligger huse ved vejen.", "50 km/h applies automatically because there are houses by the road.",
    "چون کنار جاده خانه هست، خودبه‌خود ۵۰ کیلومتر بر ساعت برقرار است.",
    "Grænsen på 50 km/t gælder kun, hvor byzonetavlen står.", "The 50 km/h limit only applies where the built-up-area sign stands.",
    "حد ۵۰ فقط جایی برقرار است که تابلوی ورود به منطقه‌ی شهری نصب شده باشد."),
  S(False, "Jeg må køre 80 km/t uanset forholdene.", "I may drive at 80 km/h whatever the conditions.", "در هر شرایطی می‌توانم ۸۰ برانم.",
    "80 km/t er det højeste; forholdene kan kræve mindre.", "80 km/h is the most; the conditions may call for less.", "۸۰ حداکثر است؛ شرایط ممکن است سرعت کمتری بخواهد."),
)

Q(5324, "7.3", view("""
THE SCENE: a country road outside town. On the right verge stands a round white sign with a thin black border showing the grey number
60, crossed by several thin black diagonal lines (the Danish end-of-local-speed-limit sign).
MUST BE CLEARLY VISIBLE: the end sign with the grey 60 and the diagonal lines.
MUST NOT APPEAR: other signs, other text."""),
  "Du har kørt på en strækning med en lokal hastighedsgrænse på 60 km/t. Nu kører du forbi denne tavle uden for byen. Hvad gælder?",
  "You have been driving on a stretch with a local speed limit of 60 km/h. Now you pass this sign outside town. What applies?",
  "در مسیری با حد سرعت محلی ۶۰ کیلومتر بر ساعت رانده‌اید. حالا بیرون شهر از کنار این تابلو می‌گذرید. چه قاعده‌ای برقرار است؟",
  S(True, "Den lokale grænse ophører, og nu gælder den generelle grænse på 80 km/t uden for byen.",
    "The local limit ends, and now the general limit of 80 km/h outside town applies.",
    "حد محلی تمام می‌شود و حالا حد عمومی ۸۰ کیلومتر بر ساعتِ بیرون شهر برقرار است.",
    "Tavlen ophæver den lokale hastighedsbegrænsning, så den generelle grænse gælder igen.", "The sign ends the local speed limit, so the general limit applies again.",
    "این تابلو حد سرعت محلی را لغو می‌کند و حد عمومی دوباره برقرار می‌شود."),
  S(False, "Nu er der ingen hastighedsgrænse.", "Now there is no speed limit.", "حالا هیچ حد سرعتی وجود ندارد.",
    "Den generelle grænse gælder altid, når der ikke er en lokal.", "The general limit always applies when there is no local one.", "وقتی حد محلی نیست، حد عمومی همیشه برقرار است."),
  S(False, "Jeg skal blive ved med at køre højst 60 km/t til næste kryds.", "I must keep to at most 60 km/h until the next junction.",
    "تا تقاطع بعدی باید همچنان حداکثر ۶۰ برانم.",
    "Grænsen ophører ved tavlen.", "The limit ends at the sign.", "حد سرعت در محل تابلو تمام می‌شود."),
  S(False, "Tavlen ophæver også et overhalingsforbud på strækningen.", "The sign also ends an overtaking ban on the stretch.", "این تابلو ممنوعیت سبقت را هم لغو می‌کند.",
    "Tavlen gælder kun hastighedsgrænsen; overhalingsforbud har sin egen ophørstavle.", "The sign only concerns the speed limit; an overtaking ban has its own end sign.",
    "این تابلو فقط درباره‌ی حد سرعت است؛ ممنوعیت سبقت تابلوی پایان خودش را دارد."),
)

Q(5325, "1.2", picture("""
A car parked at the side of a road with a narrow temporary spare wheel ("space saver", a slim tyre on a brightly coloured rim) fitted on
its rear wheel; the normal punctured wheel lies in the open boot.
MUST BE CLEARLY VISIBLE: the narrow spare wheel on the car, the punctured wheel in the boot.
MUST NOT APPEAR: text, numbers, brand names."""),
  "Du har skiftet et punkteret hjul med bilens smalle nødhjul. Hvad gælder?",
  "You have changed a punctured wheel for the car's narrow spare wheel. What applies?",
  "چرخ پنچر را با زاپاس باریکِ خودرو عوض کرده‌اید. چه قاعده‌ای برقرار است؟",
  S(True, "Nødhjulet er kun til kortvarig brug, og jeg kører langsommere, som regel højst 80 km/t.",
    "The spare wheel is only for short-term use, and I drive more slowly, usually at most 80 km/h.",
    "زاپاس باریک فقط برای استفاده‌ی کوتاه است و آهسته‌تر می‌رانم، معمولاً حداکثر ۸۰ کیلومتر بر ساعت.",
    "Et smalt nødhjul har dårligere greb, og fabrikkens højeste hastighed står på hjulet eller i instruktionsbogen.",
    "A narrow spare wheel has less grip, and the maker's top speed is on the wheel or in the handbook.",
    "زاپاس باریک چسبندگی کمتری دارد و حداکثر سرعتِ سازنده روی چرخ یا در دفترچه‌ی راهنما آمده است."),
  S(True, "Jeg får det punkterede dæk repareret eller skiftet så hurtigt som muligt.", "I have the punctured tyre repaired or replaced as soon as possible.",
    "هرچه زودتر تایر پنچر را تعمیر یا عوض می‌کنم.",
    "Nødhjulet er ikke beregnet til almindelig kørsel.", "The spare wheel is not meant for ordinary driving.", "زاپاس باریک برای رانندگی معمولی ساخته نشده است."),
  S(False, "Nødhjulet kan blive siddende, så længe der er luft i det.", "The spare wheel can stay on as long as it has air in it.", "تا وقتی باد دارد، زاپاس می‌تواند روی خودرو بماند.",
    "Det er kun til at komme frem til et værksted.", "It is only for getting to a workshop.", "فقط برای رساندن خودرو به تعمیرگاه است."),
  S(False, "Jeg kan køre lige så hurtigt som med almindelige hjul, hvis jeg er forsigtig i sving.",
    "I can drive as fast as with ordinary wheels if I am careful in bends.", "اگر در پیچ‌ها مراقب باشم، می‌توانم به همان سرعت چرخ‌های معمولی برانم.",
    "Med nødhjul gælder fabrikkens lavere højeste hastighed.", "With a spare wheel the maker's lower top speed applies.", "با زاپاس باریک، حداکثر سرعت کمترِ سازنده برقرار است."),
)
