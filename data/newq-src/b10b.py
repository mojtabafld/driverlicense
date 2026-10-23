# «آزمون جدید», batch 10 (5901–6000), part b: people and animals beside the road (7.6), speed (7.3), the car (1.2), general duties
# (6.2), anticipating others (4.5), road conditions (5.2), distance (7.8) and lights (7.19).
# Rules: Færdselsloven §§ 4 stk. 2 (police directions are obeyed, before signs and signals), 21, 32 stk. 1 and 4 (horn only to prevent or
# avert danger; a raised arm signals stopping), 33 stk. 3 and 5 (main beam; fog lamps only in fog or heavy precipitation), 35 stk. 1,
# 36 stk. 1 (no parking lights needed on a road so well lit that the vehicle is clearly seen), 41 stk. 1, 42 (the speed limit also
# applies downhill), 56 stk. 1 (carry the licence and show it to the police), 82 (persons and goods must not block the driver's view);
# BEK 425/2023: E 39/E 40 (recommended speed), D 55 (minimum speed is a round blue sign), A 46,1 (steep descent).
# Guidance (not law): FDM — dip the lights when an animal is seen in the beam; dashboard lamps for airbag, tyre pressure, brakes and fuel;
# the driver, not the cruise control, is responsible for the speed.
from nq import Q, S, above, picture, town, view

Q(5926, "7.6", view("""
THE SCENE: a two-lane road through a forest at night without street lights; we drive with main beam (the blue main-beam lamp glows on
the dashboard strip); in the long beam two eyes glow at the right edge of the road, where the shape of a deer can just be seen among the
trees.
MUST BE CLEARLY VISIBLE: the two glowing eyes at the road edge, the long main beam, the blue main-beam lamp, the dark forest.
MUST NOT APPEAR: signs, text, other vehicles.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt, og du kører med fjernlys gennem en skov. I vejkanten forude lyser to øjne op i lyset. Hvordan forholder du dig?",
  "It is dark, and you are driving through a forest with main beam on. At the roadside ahead two eyes light up in the beam. What do you "
  "do?",
  "هوا تاریک است و با نور بالا از میان جنگلی می‌رانید. کنار جاده، جلوتر، دو چشم در نور برق می‌زنند. چه می‌کنید؟",
  S(True, "Jeg sætter straks farten ned og gør mig klar til at bremse.", "I slow down at once and get ready to brake.",
    "فوراً سرعتم را کم می‌کنم و آماده‌ی ترمز می‌شوم.",
    "Dyret kan pludselig springe ud på vejen.", "The animal may suddenly jump out onto the road.", "حیوان ممکن است ناگهان به جاده بپرد."),
  S(True, "Jeg blænder ned, så dyret ikke bliver blændet af fjernlyset.", "I dip my lights so that the animal is not dazzled by the main beam.",
    "نور را پایین می‌آورم تا حیوان با نور بالا خیره نشود.",
    "Et dyr, der bliver blændet, kan blive stående på vejen eller løbe forvirret rundt.",
    "An animal that is dazzled may stand still on the road or run about confused.",
    "حیوانِ خیره‌شده ممکن است روی جاده بایستد یا گیج این‌طرف و آن‌طرف بدود."),
  S(True, "Jeg holder også øje med den anden side af vejen.", "I also keep an eye on the other side of the road.",
    "حواسم به طرف دیگر جاده هم هست.",
    "Dyret kan løbe over vejen, og der kan stå flere dyr i nærheden.", "The animal may run across the road, and there may be more animals nearby.",
    "حیوان ممکن است از عرض جاده بدود و ممکن است حیوانات دیگری هم آن نزدیکی باشند."),
  S(False, "Dyret bliver stående i lyset, så jeg kan køre forbi med samme fart.", "The animal will stay put in the light, so I can drive past at the "
    "same speed.", "حیوان در نور سر جایش می‌ماند، پس می‌توانم با همان سرعت رد شوم.",
    "Et dyr kan reagere uforudsigeligt og pludselig springe ud foran bilen.", "An animal can react unpredictably and suddenly jump out in front of "
    "the car.", "حیوان ممکن است رفتار غیرقابل‌پیش‌بینی داشته باشد و ناگهان جلوی خودرو بپرد."),
)

Q(5927, "7.6", town("""
THE SCENE: a town street; on the right pavement a group of four teenagers walk in our direction close to the kerb, laughing and pushing
each other for fun; one of them stumbles sideways towards the kerb; there is room on the left side of our lane.
MUST BE CLEARLY VISIBLE: the teenagers pushing each other close to the kerb, the one stumbling towards the kerb.
MUST NOT APPEAR: signs, text."""),
  "På fortovet går en flok unge tæt ved kantstenen. De skubber for sjov til hinanden. Hvordan forholder du dig?",
  "A group of young people are walking on the pavement close to the kerb. They are pushing each other for fun. What do you do?",
  "گروهی از جوانان روی پیاده‌رو، نزدیک لبه‌ی جدول، راه می‌روند و برای شوخی همدیگر را هل می‌دهند. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned, fordi en af dem kan blive skubbet ud på kørebanen.", "I slow down because one of them may be pushed out "
    "onto the carriageway.", "سرعتم را کم می‌کنم، چون ممکن است یکی از آن‌ها به سواره‌رو هل داده شود.",
    "Når de skubber til hinanden, kan en af dem pludselig træde eller falde ud foran bilen.",
    "When they push each other, one of them may suddenly step or fall out in front of the car.",
    "وقتی همدیگر را هل می‌دهند، ممکن است یکی ناگهان جلوی خودرو پا بگذارد یا بیفتد."),
  S(True, "Er der plads, holder jeg lidt længere væk fra kantstenen, når jeg kører forbi.", "If there is room, I keep a little further away from "
    "the kerb as I pass.", "اگر جا باشد، هنگام رد شدن کمی از لبه‌ی جدول فاصله می‌گیرم.",
    "Jo mere plads der er, jo bedre tid har du til at reagere.", "The more room there is, the more time you have to react.",
    "هر چه فاصله بیشتر باشد، زمان بیشتری برای واکنش دارید."),
  S(False, "De går på fortovet, så jeg kan holde farten.", "They are on the pavement, so I can keep my speed.",
    "آن‌ها روی پیاده‌رو هستند، پس می‌توانم سرعتم را حفظ کنم.",
    "En, der bliver skubbet, kan på et øjeblik havne ude på kørebanen.", "Someone who is pushed can end up on the carriageway in an instant.",
    "کسی که هل داده می‌شود ممکن است در یک لحظه به سواره‌رو بیفتد."),
  S(False, "Jeg kører tæt forbi dem, så de lægger mærke til bilen og holder sig fra kantstenen.", "I drive close past them so that they notice "
    "the car and keep away from the kerb.", "از نزدیکشان رد می‌شوم تا متوجه خودرو شوند و از لبه‌ی جدول دور بمانند.",
    "Kører du tæt forbi, har du mindre tid og plads til at undgå en, der falder ud på vejen.",
    "If you drive close past, you have less time and room to avoid someone who falls into the road.",
    "اگر از نزدیک رد شوید، زمان و جای کمتری برای پرهیز از برخورد با کسی که به جاده می‌افتد دارید."),
)

Q(5928, "7.6", town("""
THE SCENE: a residential street with cars parked along the right kerb; ahead one parked car has its left rear door open towards the
road; a mother stands on the carriageway in the open doorway, bending into the car to buckle a child into a child seat; beside her on the
carriageway stands a small child of about four holding a toy; an oncoming car approaches in the other lane.
MUST BE CLEARLY VISIBLE: the open rear door on the road side, the mother bending into the car, the small child standing beside her on the
carriageway, the oncoming car.
MUST NOT APPEAR: signs, text, readable number plates."""),
  "En mor står ude på vejen ved den åbne bagdør på sin parkerede bil og spænder et barn fast i autostolen. Ved siden af hende står et lille "
  "barn. En bil kommer imod dig. Hvordan forholder du dig?",
  "A mother is standing in the road at the open rear door of her parked car, buckling a child into the child seat. A small child is "
  "standing beside her. A car is coming towards you. What do you do?",
  "مادری کنار درِ بازِ عقبِ خودروی پارک‌شده‌اش در خیابان ایستاده و کمربند کودکی را در صندلی کودک می‌بندد. کودک کوچکی کنارش ایستاده است. "
  "خودرویی از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og kører først forbi, når jeg kan give dem god plads.", "I slow down and only pass when I can give them "
    "plenty of room.", "سرعتم را کم می‌کنم و فقط وقتی رد می‌شوم که بتوانم جای کافی به آن‌ها بدهم.",
    "Kan du ikke holde god afstand på grund af den modkørende, må du vente.", "If you cannot keep a good distance because of the oncoming car, "
    "you must wait.", "اگر به خاطر خودروی روبه‌رو نمی‌توانید فاصله‌ی کافی بگیرید، باید صبر کنید."),
  S(True, "Jeg er forberedt på, at det lille barn går ud foran bilen.", "I am prepared for the small child to step out in front of the car.",
    "آماده‌ام که کودک کوچک جلوی خودرو بیاید.",
    "Moren er optaget af at spænde barnet fast og kan ikke holde øje med det andet barn.",
    "The mother is busy buckling the child in and cannot keep an eye on the other child.",
    "مادر مشغول بستن کمربند کودک است و نمی‌تواند حواسش به کودک دیگر باشد."),
  S(False, "Moren har sikkert set mig, så jeg kan køre forbi i normal fart.", "The mother has probably seen me, so I can pass at normal speed.",
    "مادر حتماً مرا دیده، پس می‌توانم با سرعت عادی رد شوم.",
    "Du kan ikke vide, om hun har set dig, og det lille barn kan bevæge sig uventet.",
    "You cannot know whether she has seen you, and the small child may move unexpectedly.",
    "نمی‌توانید بدانید که او شما را دیده یا نه و کودک کوچک ممکن است ناگهان حرکت کند."),
  S(False, "Jeg presser mig forbi mellem dem og den modkørende bil.", "I squeeze past between them and the oncoming car.",
    "از فاصله‌ی بین آن‌ها و خودروی روبه‌رو به‌زور رد می‌شوم.",
    "Så kommer du alt for tæt på moren og barnet; vent, til den modkørende er forbi.",
    "Then you come far too close to the mother and the child; wait until the oncoming car has passed.",
    "در این صورت بیش از حد به مادر و کودک نزدیک می‌شوید؛ صبر کنید تا خودروی روبه‌رو رد شود."),
)

Q(5929, "7.6", town("""
THE SCENE: a shopping street; on the right pavement a window cleaner walks in our direction close to the kerb, carrying a long aluminium
ladder on his shoulder and a bucket in his other hand; the back end of the ladder reaches out behind him, and he is turning his head
towards a shop window.
MUST BE CLEARLY VISIBLE: the window cleaner with the long ladder on his shoulder close to the kerb.
MUST NOT APPEAR: signs, text, logos."""),
  "En vinduespudser går på fortovet tæt ved kantstenen med en lang stige på skulderen. Hvordan forholder du dig?",
  "A window cleaner is walking on the pavement close to the kerb with a long ladder on his shoulder. What do you do?",
  "یک شیشه‌پاک‌کن با نردبانی بلند روی شانه، نزدیک لبه‌ی جدول روی پیاده‌رو راه می‌رود. چه می‌کنید؟",
  S(True, "Jeg holder ekstra god afstand, fordi stigen kan svinge ud over kørebanen, hvis han vender sig.", "I keep an extra good distance "
    "because the ladder may swing out over the carriageway if he turns.", "فاصله‌ی بیشتری نگه می‌دارم، چون اگر برگردد، نردبان ممکن است به "
    "سمت سواره‌رو بچرخد.",
    "En lang stige rækker langt ud til siden, når den, der bærer den, drejer.", "A long ladder reaches far out to the side when the person "
    "carrying it turns.", "وقتی حامل نردبان بلند می‌چرخد، نردبان تا فاصله‌ی زیادی به کنار می‌رسد."),
  S(True, "Jeg sætter farten ned, til jeg er forbi ham.", "I slow down until I am past him.", "تا وقتی از کنارش رد نشده‌ام سرعتم را کم می‌کنم.",
    "Så har du tid til at reagere, hvis stigen eller han selv kommer ud på kørebanen.",
    "Then you have time to react if the ladder or he himself comes out onto the carriageway.",
    "این‌طور اگر نردبان یا خودش وارد سواره‌رو شود، برای واکنش وقت دارید."),
  S(True, "Jeg regner med, at han måske ikke har lagt mærke til bilen.", "I count on the possibility that he has not noticed the car.",
    "در نظر دارم که شاید متوجه خودرو نشده باشد.",
    "Han er optaget af sit arbejde og kan ikke let se sig tilbage med stigen på skulderen.",
    "He is busy with his work and cannot easily look back with the ladder on his shoulder.",
    "او مشغول کارش است و با نردبانی روی شانه نمی‌تواند به‌راحتی پشت سرش را نگاه کند."),
  S(False, "Jeg kører tæt forbi ham, så jeg hurtigt er forbi.", "I drive close past him so that I am soon past.",
    "از نزدیکش رد می‌شوم تا زود عبور کنم.",
    "Jo tættere du kører, jo større er risikoen for at ramme stigen, hvis den svinger ud.",
    "The closer you drive, the greater the risk of hitting the ladder if it swings out.",
    "هر چه نزدیک‌تر برانید، خطر برخورد با نردبان در صورت چرخیدنش بیشتر است."),
)

Q(5930, "7.6", view("""
THE SCENE: a country road in summer; on the right a farm shop stand with strawberries and a small car park on the verge, where several
cars are parked; two people with boxes of strawberries walk across the road towards the cars on the other side; one parked car has its
reversing lights on.
MUST BE CLEARLY VISIBLE: the farm shop, the parked cars on the verge, the people crossing the road, the car with reversing lights.
MUST NOT APPEAR: signs, text."""),
  "Ved en gårdbutik ved landevejen holder flere biler i rabatten, og folk går over vejen med deres indkøb. Hvordan forholder du dig?",
  "At a farm shop by the country road several cars are parked on the verge, and people are crossing the road with their shopping. What do "
  "you do?",
  "کنار یک فروشگاه مزرعه در جاده‌ی بیرون شهر چند خودرو روی شانه‌ی جاده پارک شده‌اند و مردم با خریدهایشان از جاده رد می‌شوند. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned, fordi der kan komme gående ud mellem bilerne.", "I slow down because pedestrians may step out between the cars.",
    "سرعتم را کم می‌کنم، چون ممکن است عابرانی از بین خودروها بیرون بیایند.",
    "Folk med hænderne fulde ser ikke altid efter trafikken.", "People with their hands full do not always look out for traffic.",
    "آدم‌هایی که دستشان پر است همیشه به ترافیک نگاه نمی‌کنند."),
  S(True, "Jeg er forberedt på, at en af bilerne pludselig kører ud på vejen.", "I am prepared for one of the cars suddenly to pull out onto the road.",
    "آماده‌ام که یکی از خودروها ناگهان وارد جاده شود.",
    "En bil, der bakker eller kører ud fra rabatten, kan komme ud foran dig.", "A car reversing or pulling out from the verge may come out in front of you.",
    "خودرویی که دنده‌عقب می‌رود یا از شانه‌ی جاده حرکت می‌کند ممکن است جلوی شما بیاید."),
  S(False, "Uden for byen kan jeg holde 80 km/t, når der ikke er noget fodgængerfelt.",
    "Outside town I can keep to 80 km/h when there is no pedestrian crossing.", "بیرون شهر، وقتی گذرگاه عابری نیست، می‌توانم ۸۰ کیلومتر در ساعت بمانم.",
    "Farten skal altid passe til forholdene, og her er der mennesker på og ved vejen.",
    "Your speed must always suit the conditions, and here there are people on and by the road.",
    "سرعت همیشه باید با شرایط جور باشد و این‌جا آدم‌هایی روی جاده و کنار آن هستند."),
  S(False, "De gående skal holde sig i rabatten, så jeg behøver ikke tage hensyn til dem.",
    "The pedestrians must stay on the verge, so I need not take them into account.", "عابران باید روی شانه‌ی جاده بمانند، پس لازم نیست ملاحظه‌شان را بکنم.",
    "Gående må gå over vejen, og du skal vise hensyn og give dem tid.", "Pedestrians may cross the road, and you must show consideration and give them time.",
    "عابران اجازه دارند از جاده رد شوند و باید ملاحظه کنید و به آن‌ها فرصت بدهید."),
)

Q(5931, "7.6", town("""
THE SCENE: a residential street with cars parked along both sides; on the LEFT pavement a child waves eagerly to another child standing
on the RIGHT pavement just ahead of us, between two parked cars.
MUST BE CLEARLY VISIBLE: the waving child on the left pavement, the other child on the right pavement between the parked cars.
MUST NOT APPEAR: signs, text."""),
  "På fortovet i venstre side står et barn og vinker til en kammerat på fortovet i din side. Hvordan forholder du dig?",
  "On the left-hand pavement a child is waving to a friend on the pavement on your side. What do you do?",
  "روی پیاده‌روی سمت چپ کودکی برای دوستش که روی پیاده‌روی سمت شما ایستاده دست تکان می‌دهد. چه می‌کنید؟",
  S(True, "Jeg er forberedt på, at et af børnene pludselig løber over vejen.", "I am prepared for one of the children suddenly to run across the road.",
    "آماده‌ام که یکی از کودکان ناگهان از عرض خیابان بدود.",
    "Børn, der vil hen til en kammerat, glemmer let at se sig for.", "Children who want to reach a friend easily forget to look.",
    "کودکانی که می‌خواهند پیش دوستشان بروند به‌راحتی فراموش می‌کنند نگاه کنند."),
  S(True, "Jeg sænker farten så meget, at jeg kan nå at standse.", "I reduce speed enough to be able to stop in time.",
    "سرعتم را آن‌قدر کم می‌کنم که بتوانم به‌موقع بایستم.",
    "Når du nærmer dig børn ved vejen, skal farten være passende lav.", "When you approach children by the road, your speed must be suitably low.",
    "وقتی به کودکانِ کنار جاده نزدیک می‌شوید، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(False, "Børnene står på fortovet, så de er ikke i fare.", "The children are on the pavement, so they are not in danger.",
    "کودکان روی پیاده‌رو هستند، پس در خطر نیستند.",
    "Et barn kan på et øjeblik løbe fra fortovet ud på kørebanen.", "A child can run from the pavement onto the carriageway in an instant.",
    "کودک ممکن است در یک لحظه از پیاده‌رو به سواره‌رو بدود."),
  S(False, "Jeg dytter, så børnene bliver stående.", "I sound the horn so that the children stay where they are.",
    "بوق می‌زنم تا کودکان سر جایشان بمانند.",
    "Et dyt kan forskrække et barn, så det løber ud.", "A hoot can startle a child so that it runs out.",
    "بوق ممکن است کودک را بترساند و به خیابان بدود."),
)

Q(5932, "7.6", town("""
THE SCENE: a residential street at dusk on Halloween; several children in dark costumes and masks walk from house to house along the
road edge; two of them are crossing the street between the houses carrying small buckets; jack-o'-lanterns glow on doorsteps.
MUST BE CLEARLY VISIBLE: the children in dark costumes and masks, the children crossing the street.
MUST NOT APPEAR: signs, text.""", cond="dusk, getting dark, dry road"),
  "Det er Halloween, og det er ved at blive mørkt. Børn i mørke kostumer og masker går fra hus til hus i et villakvarter. Hvordan forholder "
  "du dig?",
  "It is Halloween, and it is getting dark. Children in dark costumes and masks are going from house to house in a residential area. What "
  "do you do?",
  "هالووین است و هوا رو به تاریکی است. کودکانی با لباس‌ها و نقاب‌های تیره در یک محله‌ی ویلایی خانه به خانه می‌روند. چه می‌کنید؟",
  S(True, "Jeg kører langsomt, fordi børnene kan være svære at se i de mørke kostumer.",
    "I drive slowly because the children may be hard to see in their dark costumes.",
    "آهسته می‌رانم، چون دیدن کودکان در لباس‌های تیره ممکن است سخت باشد.",
    "I skumringen ser du mørkt tøj meget sent.", "At dusk you see dark clothing very late.", "در گرگ‌ومیش لباس تیره خیلی دیر دیده می‌شود."),
  S(True, "Jeg er forberedt på, at børn løber over vejen mellem husene.", "I am prepared for children to run across the road between the houses.",
    "آماده‌ام که کودکان بین خانه‌ها از عرض خیابان بدوند.",
    "Børnene har travlt med at nå det næste hus og ser ikke altid efter trafikken.",
    "The children are in a hurry to reach the next house and do not always look out for traffic.",
    "کودکان برای رسیدن به خانه‌ی بعدی عجله دارند و همیشه به ترافیک نگاه نمی‌کنند."),
  S(True, "Jeg regner med, at maskerne kan gøre det svært for børnene at se mig.", "I count on the masks making it hard for the children to see me.",
    "در نظر دارم که نقاب‌ها ممکن است دید کودکان را محدود کنند.",
    "En maske kan skjule meget af synsfeltet.", "A mask can block much of the field of vision.", "نقاب ممکن است بخش زیادی از میدان دید را بپوشاند."),
  S(False, "Børnene går sammen med voksne, så de passer selv på.", "The children are with adults, so they look after themselves.",
    "کودکان با بزرگ‌ترها هستند، پس خودشان مراقب‌اند.",
    "Også når der er voksne med, skal du køre, så du kan standse for et barn, der løber ud.",
    "Even when adults are with them, you must drive so that you can stop for a child who runs out.",
    "حتی وقتی بزرگ‌ترها همراهشان هستند، باید طوری برانید که بتوانید برای کودکی که بیرون می‌دود بایستید."),
)

Q(5933, "7.3", view("""
THE SCENE: a country road; we have just passed a round speed-limit sign 60 on the right; on the dashboard strip a small navigation
screen shows a round speed symbol with the number 80.
MUST BE CLEARLY VISIBLE: the 60 sign just passed at the right, the navigation screen with the 80 symbol.
MUST NOT APPEAR: other signs, any other text."""),
  "Du har lige kørt forbi en tavle med 60 km/t, men navigationen i bilen viser, at grænsen er 80 km/t. Hvad gælder?",
  "You have just passed a 60 km/h sign, but the car's navigation shows that the limit is 80 km/h. What applies?",
  "همین حالا از کنار تابلوی ۶۰ کیلومتر در ساعت گذشته‌اید، ولی مسیریاب خودرو حد سرعت را ۸۰ نشان می‌دهد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg følger tavlen og kører højst 60 km/t.", "I follow the sign and drive at no more than 60 km/h.",
    "از تابلو پیروی می‌کنم و حداکثر ۶۰ کیلومتر در ساعت می‌رانم.",
    "Det er færdselstavlerne, der gælder; navigationens oplysninger kan være forkerte eller forældede.",
    "It is the traffic signs that apply; the navigation's information may be wrong or out of date.",
    "تابلوهای راهنمایی معتبرند؛ اطلاعات مسیریاب ممکن است نادرست یا قدیمی باشد."),
  S(False, "Navigationen er altid opdateret, så jeg må køre 80 km/t.", "The navigation is always up to date, so I may drive at 80 km/h.",
    "مسیریاب همیشه به‌روز است، پس می‌توانم ۸۰ بروم.",
    "Navigationen kan tage fejl, og tavlen går forud.", "The navigation can be wrong, and the sign takes precedence.",
    "مسیریاب ممکن است اشتباه کند و تابلو مقدم است."),
  S(False, "Jeg vælger den højeste af de to grænser.", "I choose the higher of the two limits.", "بالاترینِ این دو حد را انتخاب می‌کنم.",
    "Den skiltede grænse er den højeste tilladte hastighed.", "The signed limit is the highest speed allowed.", "حدِ اعلام‌شده با تابلو بیشترین سرعت مجاز است."),
)

Q(5934, "7.3", view("""
THE SCENE: a long, straight downhill stretch of a country road; at the right stands a round speed-limit sign 80; on the dashboard strip
the cruise-control symbol is lit, and the speedometer needle points a little above 90 km/h; the road goes on down the hill ahead.
MUST BE CLEARLY VISIBLE: the downhill road, the 80 sign, the lit cruise-control symbol, the speedometer a little above 90.
MUST NOT APPEAR: other signs, any other text."""),
  "Du kører med fartpiloten indstillet på 80 km/t. Ned ad en lang bakke stiger farten alligevel til over 90 km/t. Hvad gælder?",
  "You are driving with the cruise control set to 80 km/h. Down a long hill the speed still rises to over 90 km/h. What applies?",
  "با کروز کنترلِ تنظیم‌شده روی ۸۰ کیلومتر در ساعت می‌رانید. در یک سرازیری طولانی سرعت با این حال به بیش از ۹۰ کیلومتر در ساعت می‌رسد. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Jeg bremser, så farten kommer ned under grænsen.", "I brake so that the speed comes down below the limit.",
    "ترمز می‌کنم تا سرعت به زیر حد مجاز برسد.",
    "Det er altid føreren, der har ansvaret for farten, også når fartpiloten er slået til.",
    "The driver is always responsible for the speed, also when the cruise control is switched on.",
    "مسئولیت سرعت همیشه با راننده است، حتی وقتی کروز کنترل روشن است."),
  S(False, "Fartpiloten sørger for, at jeg ikke kan komme til at køre for stærkt.",
    "The cruise control makes sure that I cannot end up driving too fast.", "کروز کنترل مطمئن می‌شود که نتوانم بیش از حد تند بروم.",
    "En almindelig fartpilot kan ikke altid holde farten nede ad bakke.", "An ordinary cruise control cannot always hold the speed down a "
    "hill.", "کروز کنترل معمولی همیشه نمی‌تواند در سرازیری سرعت را پایین نگه دارد."),
  S(False, "Ned ad bakke må jeg køre lidt over grænsen, fordi bilen selv tager fart.",
    "Downhill I may drive a little above the limit because the car picks up speed by itself.",
    "در سرازیری می‌توانم کمی بیشتر از حد مجاز بروم، چون خودرو خودبه‌خود سرعت می‌گیرد.",
    "Hastighedsgrænsen gælder også ned ad bakke.", "The speed limit also applies downhill.", "حد سرعت در سرازیری هم برقرار است."),
  S(False, "Bliver jeg målt, er det bilens fejl, fordi fartpiloten var slået til.",
    "If I am caught by a speed check, it is the car's fault because the cruise control was on.",
    "اگر سرعتم ثبت شود، تقصیر خودروست، چون کروز کنترل روشن بود.",
    "Føreren har ansvaret for kørslen, uanset hvilke hjælpesystemer bilen har.",
    "The driver is responsible for the driving, whatever assistance systems the car has.",
    "راننده، صرف‌نظر از سیستم‌های کمکیِ خودرو، مسئول رانندگی است."),
)

Q(5935, "7.3", view("""
THE SCENE: a two-lane country road outside town approaching a stretch of tight bends through a wood; at the right edge stands a square
blue sign with a large white number 40.
MUST BE CLEARLY VISIBLE: the square blue sign with the white 40, the bends ahead.
MUST NOT APPEAR: round signs, other signs, other text."""),
  "Du kører forbi denne blå, firkantede tavle uden for byen. Der er ingen andre hastighedstavler. Hvad gælder?",
  "You pass this square blue sign outside town. There are no other speed signs. What applies?",
  "بیرون شهر از کنار این تابلوی آبیِ مربعی می‌گذرید. تابلوی سرعت دیگری نیست. چه قاعده‌ای برقرار است؟",
  S(True, "Tavlen anbefaler, at jeg ikke kører hurtigere end 40 km/t.", "The sign recommends that I do not drive faster than 40 km/h.",
    "تابلو توصیه می‌کند سریع‌تر از ۴۰ کیلومتر در ساعت نرانم.",
    "Den angiver, at vejen ikke er egnet til kørsel med højere hastighed end 40 km/t.",
    "It shows that the road is not suitable for driving faster than 40 km/h.", "نشان می‌دهد که جاده برای سرعت بیش از ۴۰ کیلومتر مناسب نیست."),
  S(True, "Anbefalingen gælder, indtil den ophæves med en ophørstavle eller ved en afstand på en undertavle.", "The recommendation applies "
    "until it is ended by an end sign or by a distance on a plate.", "این توصیه تا وقتی با تابلوی پایان یا فاصله‌ی درج‌شده روی زیرتابلو لغو "
    "شود برقرار است.",
    "Så længe den ikke er ophævet, er vejen ikke egnet til en højere fart.", "As long as it has not been ended, the road is not suitable for a "
    "higher speed.", "تا وقتی لغو نشده، جاده برای سرعت بیشتر مناسب نیست."),
  S(False, "Tavlen viser den mindste hastighed, jeg skal holde.", "The sign shows the minimum speed I must keep.",
    "تابلو حداقل سرعتی را که باید حفظ کنم نشان می‌دهد.",
    "Mindste hastighed vises på en rund, blå tavle; den firkantede tavle anbefaler en højeste hastighed.",
    "A minimum speed is shown on a round blue sign; the square sign recommends a highest speed.",
    "حداقل سرعت با تابلوی گردِ آبی نشان داده می‌شود؛ تابلوی مربعی بیشترین سرعت پیشنهادی را نشان می‌دهد."),
  S(False, "Anbefalingen gælder kun, når vejen er våd eller glat.", "The recommendation only applies when the road is wet or slippery.",
    "این توصیه فقط وقتی است که جاده خیس یا لغزنده باشد.",
    "Den gælder i al slags vejr, indtil den bliver ophævet.", "It applies in all weathers until it is ended.",
    "این توصیه در هر هوایی برقرار است تا وقتی لغو شود."),
)

Q(5936, "7.3", view("""
THE SCENE: a country road on a clear evening; ahead the road dips into a hollow where a thick bank of white fog lies across the road,
hiding it completely; above the fog the sky is clear.
MUST BE CLEARLY VISIBLE: the dense fog bank in the hollow, the clear sky above.
MUST NOT APPEAR: signs, text.""", cond="clear evening, dry road, fog bank in a hollow"),
  "Det er en klar aften, men i en lavning foran dig ligger en tæt tågebanke hen over vejen. Hvordan forholder du dig?",
  "It is a clear evening, but in a hollow ahead of you a dense bank of fog lies across the road. What do you do?",
  "عصری صاف است، ولی در گودیِ جلوی شما مه غلیظی روی جاده نشسته است. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned, før jeg kører ind i tågen.", "I slow down before I drive into the fog.", "پیش از ورود به مه سرعتم را کم می‌کنم.",
    "I tågen kan du pludselig kun se et kort stykke frem, og du skal kunne standse på den strækning, du kan se.",
    "In the fog you may suddenly see only a short distance ahead, and you must be able to stop within the distance you can see.",
    "در مه ممکن است ناگهان فقط فاصله‌ی کوتاهی را ببینید و باید بتوانید در همان مسافتی که می‌بینید بایستید."),
  S(False, "Jeg kører hurtigt igennem, så jeg hurtigt er ude af tågen igen.", "I drive through quickly so that I am soon out of the fog again.",
    "سریع رد می‌شوم تا زود از مه بیرون بیایم.",
    "Inde i tågen kan der holde biler eller gå mennesker, som du ser alt for sent.",
    "Inside the fog there may be cars standing or people walking that you see far too late.",
    "داخل مه ممکن است خودروهایی ایستاده باشند یا آدم‌هایی راه بروند که خیلی دیر می‌بینید."),
  S(False, "Jeg holder farten og bremser først, når jeg er inde i tågen og kan se, hvor tæt den er.", "I keep my speed and only brake once I am "
    "in the fog and can see how dense it is.", "سرعتم را حفظ می‌کنم و فقط وقتی داخل مه شدم و دیدم چقدر غلیظ است ترمز می‌کنم.",
    "Så kan du pludselig være for hurtig, og en hård opbremsning inde i tågen kan få bilen bag dig til at køre op bag i dig.",
    "Then you may suddenly be too fast, and hard braking inside the fog may make the car behind you run into the back of you.",
    "در این صورت ممکن است ناگهان سرعتتان زیاد باشد و ترمز شدید داخل مه باعث شود خودروی پشت سر به شما بزند."),
)

Q(5937, "1.2", picture("""
A car parked outside a house on a snowy morning: its windows have been scraped clear, but a thick layer of snow still lies on the roof
and the bonnet; a person holding a snow brush stands beside the car.
MUST BE CLEARLY VISIBLE: the cleared windows, the thick snow on the roof, the snow brush.
MUST NOT APPEAR: text, letters or numbers on the number plate, logos."""),
  "Det har sneet i nat. Du har skrabet ruderne fri, men der ligger stadig et tykt lag sne på taget af bilen. Hvad gør du?",
  "It snowed during the night. You have scraped the windows clear, but there is still a thick layer of snow on the roof of the car. What "
  "do you do?",
  "دیشب برف آمده است. شیشه‌ها را تراشیده و تمیز کرده‌اید، ولی هنوز لایه‌ی ضخیمی از برف روی سقف خودرو است. چه می‌کنید؟",
  S(True, "Jeg fejer også sneen af taget, før jeg kører.", "I also sweep the snow off the roof before I drive.", "پیش از حرکت برفِ روی سقف را هم پاک می‌کنم.",
    "Sne på taget kan blive til fare for både dig og andre under kørslen.", "Snow on the roof can become a danger to you and to others while you drive.",
    "برفِ روی سقف ممکن است حین رانندگی برای شما و دیگران خطرساز شود."),
  S(True, "Ellers kan sneen glide ned over forruden, når jeg bremser.", "Otherwise the snow may slide down over the windscreen when I brake.",
    "وگرنه ممکن است هنگام ترمز، برف روی شیشه‌ی جلو بلغزد.",
    "Så kan du pludselig ikke se noget.", "Then you may suddenly see nothing at all.", "در این صورت ممکن است ناگهان چیزی نبینید."),
  S(True, "Sne fra taget kan blæse af og ramme bilerne bag mig.", "Snow from the roof can blow off and hit the cars behind me.",
    "برفِ سقف ممکن است با باد کنده شود و به خودروهای پشت سر بخورد.",
    "Sne og is, der flyver af bilen, kan ramme og skade andre.", "Snow and ice flying off the car can hit and hurt others.",
    "برف و یخی که از خودرو کنده می‌شود ممکن است به دیگران بخورد و آسیب بزند."),
  S(False, "Sneen blæser af af sig selv, når jeg kommer op i fart, så den kan blive liggende.",
    "The snow blows off by itself once I get up to speed, so it can stay there.", "وقتی سرعت بگیرم برف خودش کنده می‌شود، پس می‌تواند بماند.",
    "Netop når den blæser af, kan den ramme andre eller dække din egen forrude.",
    "It is exactly when it blows off that it may hit others or cover your own windscreen.",
    "درست وقتی کنده می‌شود ممکن است به دیگران بخورد یا شیشه‌ی خودتان را بپوشاند."),
)

Q(5938, "1.2", picture("""
A close-up of a car's driver's footwell seen from the side: a plastic water bottle has rolled forward and lies on the floor in front of
the brake pedal, next to the driver's shoe.
MUST BE CLEARLY VISIBLE: the bottle in front of the brake pedal, the pedals.
MUST NOT APPEAR: text, logos."""),
  "Under kørslen er en vandflaske trillet ned i førerens fodrum og ligger foran bremsepedalen. Hvad gør du?",
  "While you are driving, a water bottle has rolled into the driver's footwell and lies in front of the brake pedal. What do you do?",
  "در حین رانندگی یک بطری آب به جای پای راننده غلتیده و جلوی پدال ترمز افتاده است. چه می‌کنید؟",
  S(True, "Jeg holder ind, så snart det kan ske uden fare, og fjerner flasken.", "I pull in as soon as it can be done without danger and remove the bottle.",
    "به‌محض این‌که بی‌خطر باشد کنار می‌کشم و بطری را برمی‌دارم.",
    "Flasken kan komme i klemme under pedalen, så du ikke kan bremse.", "The bottle may get stuck under the pedal so that you cannot brake.",
    "بطری ممکن است زیر پدال گیر کند و نتوانید ترمز کنید."),
  S(False, "Jeg bøjer mig ned og fjerner den, mens jeg kører.", "I bend down and remove it while I am driving.", "در حین رانندگی خم می‌شوم و برش می‌دارم.",
    "Så har du hverken øjnene på vejen eller fuld kontrol over bilen.", "Then you have neither your eyes on the road nor full control of the car.",
    "در این صورت نه چشمتان به جاده است و نه کنترل کامل خودرو را دارید."),
  S(False, "Den er ikke farlig, fordi den er lavet af plastik.", "It is not dangerous because it is made of plastic.", "خطرناک نیست، چون پلاستیکی است.",
    "Også en plastikflaske kan blokere bremsepedalen.", "Even a plastic bottle can block the brake pedal.", "حتی بطری پلاستیکی هم می‌تواند جلوی پدال ترمز را بگیرد."),
)

Q(5939, "1.2", view("""
THE SCENE: a motorway with two lanes in our direction; on the dashboard strip the yellow fuel warning lamp (a petrol-pump symbol) glows;
far ahead on the right a blue service sign with a white petrol-pump symbol announces a service area.
MUST BE CLEARLY VISIBLE: the lit fuel warning lamp, the service sign with the petrol-pump symbol.
MUST NOT APPEAR: readable text or numbers."""),
  "På motorvejen begynder lampen for brændstof at lyse. Hvad gør du?",
  "On the motorway the fuel warning lamp comes on. What do you do?",
  "در آزادراه چراغ هشدار سوخت روشن می‌شود. چه می‌کنید؟",
  S(True, "Jeg tanker ved den næste tankstation eller kører af motorvejen for at tanke.",
    "I fill up at the next filling station or leave the motorway to fill up.", "در نزدیک‌ترین پمپ‌بنزین سوخت می‌زنم یا برای سوخت‌گیری از آزادراه خارج می‌شوم.",
    "Lampen viser, at der kun er lidt brændstof tilbage.", "The lamp shows that there is only a little fuel left.", "این چراغ نشان می‌دهد سوخت کمی باقی مانده است."),
  S(True, "Jeg kører roligt og jævnt, så brændstoffet rækker længere.", "I drive calmly and smoothly so that the fuel lasts longer.",
    "آرام و یکنواخت می‌رانم تا سوخت بیشتر دوام بیاورد.",
    "Rolig kørsel bruger mindre brændstof end hurtig kørsel med mange opbremsninger.",
    "Calm driving uses less fuel than fast driving with a lot of braking.", "رانندگی آرام سوخت کمتری از رانندگی تند با ترمزهای زیاد مصرف می‌کند."),
  S(False, "Det er i orden at køre, til tanken er helt tom, fordi jeg altid kan holde i nødsporet.",
    "It is fine to drive until the tank is completely empty, because I can always stop on the hard shoulder.",
    "اشکالی ندارد تا خالی شدن کامل باک برانم، چون همیشه می‌توانم در شانه‌ی اضطراری بایستم.",
    "Nødsporet er til nødsituationer; at løbe tør for brændstof på motorvejen er farligt og kan undgås.",
    "The hard shoulder is for emergencies; running out of fuel on the motorway is dangerous and can be avoided.",
    "شانه‌ی اضطراری برای موارد اضطراری است؛ تمام شدن سوخت در آزادراه خطرناک است و قابل پیشگیری است."),
  S(False, "Lampen lyser først, når tanken er helt tom.", "The lamp only comes on when the tank is completely empty.",
    "این چراغ تنها وقتی روشن می‌شود که باک کاملاً خالی باشد.",
    "Lampen tænder, mens der stadig er lidt brændstof tilbage, så du kan nå at tanke.",
    "The lamp comes on while there is still a little fuel left, so that you have time to fill up.",
    "چراغ وقتی روشن می‌شود که هنوز کمی سوخت مانده تا فرصت سوخت‌گیری داشته باشید."),
)

Q(5940, "1.2", picture("""
A close-up of a car's instrument panel: a red warning lamp is lit showing a seated person seen from the side with a large circle in front
of them (the airbag symbol); the other warning lamps are dark.
MUST BE CLEARLY VISIBLE: the lit airbag warning lamp.
MUST NOT APPEAR: text, numbers, logos."""),
  "Under kørslen begynder lampen for airbag at lyse, og den bliver ved med at lyse. Hvad gælder?",
  "While you are driving, the airbag warning lamp comes on and stays on. What applies?",
  "در حین رانندگی چراغ هشدار کیسه‌ی هوا روشن می‌شود و روشن می‌ماند. چه قاعده‌ای برقرار است؟",
  S(True, "Airbaggen virker måske ikke ved et uheld, så bilen skal snarest til eftersyn.",
    "The airbag may not work in an accident, so the car must be checked as soon as possible.",
    "ممکن است کیسه‌ی هوا در تصادف کار نکند، پس خودرو باید هر چه زودتر بازدید شود.",
    "Lampen viser en fejl i airbagsystemet.", "The lamp shows a fault in the airbag system.", "این چراغ خرابی‌ای را در سیستم کیسه‌ی هوا نشان می‌دهد."),
  S(False, "Lampen betyder, at airbaggen har udløst.", "The lamp means that the airbag has gone off.", "این چراغ یعنی کیسه‌ی هوا باز شده است.",
    "En udløst airbag ville du have mærket; lampen viser en fejl.", "You would have noticed an airbag going off; the lamp shows a fault.",
    "اگر کیسه‌ی هوا باز شده بود متوجه می‌شدید؛ این چراغ خرابی را نشان می‌دهد."),
  S(False, "Jeg kan fortsætte som normalt, fordi det kun har betydning for passageren.",
    "I can carry on as normal because it only matters for the passenger.", "می‌توانم عادی ادامه دهم، چون فقط برای مسافر مهم است.",
    "Fejlen kan også gælde førerens airbag.", "The fault may also affect the driver's airbag.", "این خرابی ممکن است کیسه‌ی هوای راننده را هم شامل شود."),
  S(False, "Lampen betyder, at jeg skal spænde sikkerhedsselen.", "The lamp means that I must fasten my seat belt.",
    "این چراغ یعنی باید کمربندم را ببندم.",
    "Selelampen har sit eget symbol; denne lampe gælder airbaggen.", "The seat-belt lamp has its own symbol; this lamp is about the airbag.",
    "چراغ کمربند نماد جداگانه‌ای دارد؛ این چراغ مربوط به کیسه‌ی هواست."),
)

Q(5941, "1.2", picture("""
A close-up of a car's instrument panel: a yellow warning lamp is lit showing the cross-section of a tyre (a horseshoe shape with a flat
bottom) with an exclamation mark inside it; the other warning lamps are dark.
MUST BE CLEARLY VISIBLE: the lit tyre-pressure warning lamp.
MUST NOT APPEAR: text, numbers, logos."""),
  "Under kørslen begynder lampen for dæktryk at lyse. Hvad gør du?",
  "While you are driving, the tyre-pressure warning lamp comes on. What do you do?",
  "در حین رانندگی چراغ هشدار فشار باد لاستیک روشن می‌شود. چه می‌کنید؟",
  S(True, "Jeg holder ind et sikkert sted og ser efter, om et dæk er punkteret eller mangler luft.",
    "I pull in at a safe place and check whether a tyre is punctured or low on air.",
    "جایی امن کنار می‌کشم و بررسی می‌کنم که لاستیکی پنچر شده یا بادش کم است یا نه.",
    "Lampen viser, at trykket i et eller flere dæk er for lavt.", "The lamp shows that the pressure in one or more tyres is too low.",
    "این چراغ نشان می‌دهد فشار باد یک یا چند لاستیک کم است."),
  S(True, "Jeg får kontrolleret dækkene og pumpet dem op til det rigtige tryk.", "I have the tyres checked and pumped up to the right pressure.",
    "فشار لاستیک‌ها را بررسی و به اندازه‌ی درست باد می‌کنم.",
    "For lavt dæktryk giver dårligere vejgreb og længere bremselængde.", "Tyre pressure that is too low gives poorer grip and a longer braking distance.",
    "فشار بادِ کم چسبندگی را کم و مسافت ترمز را بیشتر می‌کند."),
  S(False, "Lampen betyder kun, at det er tid til at skifte til vinterdæk.", "The lamp only means that it is time to change to winter tyres.",
    "این چراغ فقط یعنی وقت عوض کردن لاستیک‌ها با لاستیک زمستانی است.",
    "Lampen advarer om for lavt tryk i dækkene.", "The lamp warns that the pressure in the tyres is too low.", "این چراغ از کم بودن فشار باد لاستیک‌ها هشدار می‌دهد."),
  S(False, "Jeg kan fortsætte med høj fart, fordi lampen ofte lyser uden grund.", "I can carry on at high speed because the lamp often comes on for no reason.",
    "می‌توانم با سرعت زیاد ادامه دهم، چون این چراغ اغلب بی‌دلیل روشن می‌شود.",
    "Et dæk med for lidt luft kan blive overophedet og eksplodere ved høj fart.", "A tyre with too little air may overheat and burst at high speed.",
    "لاستیکِ کم‌باد ممکن است در سرعت بالا داغ کند و بترکد."),
)

Q(5942, "1.2", picture("""
Inside a car seen from just behind the driver's head: a large phone holder with a tablet is mounted in the middle of the windscreen, low
in the driver's line of sight; through the windscreen a town street, and a cyclist on the right is partly hidden behind the tablet.
MUST BE CLEARLY VISIBLE: the tablet blocking part of the view through the windscreen, the partly hidden cyclist.
MUST NOT APPEAR: readable text on the screen, logos."""),
  "Du har sat en stor holder med en tablet midt på forruden. Den skjuler en del af vejen foran dig. Hvad gælder?",
  "You have fixed a large holder with a tablet in the middle of the windscreen. It hides part of the road ahead of you. What applies?",
  "نگهدارنده‌ی بزرگی را با یک تبلت وسط شیشه‌ی جلو نصب کرده‌اید که بخشی از جاده‌ی جلوی شما را می‌پوشاند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg flytter holderen, så den ikke skjuler noget af udsynet.", "I move the holder so that it does not block any of the view.",
    "نگهدارنده را جابه‌جا می‌کنم تا جلوی دید را نگیرد.",
    "Bag en tablet midt i synsfeltet kan der gemme sig en cyklist eller en fodgænger.", "A cyclist or a pedestrian may be hidden behind a tablet in the middle of your field of view.",
    "ممکن است دوچرخه‌سوار یا عابری پشت تبلتی که وسط میدان دید است پنهان شود."),
  S(True, "Ting i bilen må ikke være anbragt, så føreren ikke har frit udsyn.", "Things in the car must not be placed so that the driver lacks a free view.",
    "وسایل داخل خودرو نباید طوری قرار بگیرند که راننده دید آزاد نداشته باشد.",
    "Føreren skal have frit udsyn og tilstrækkelig mulighed for at manøvrere bilen.", "The driver must have a free view and enough room to handle the car.",
    "راننده باید دید آزاد و امکان کافی برای کنترل خودرو داشته باشد."),
  S(False, "Det er i orden, når jeg kun bruger den til navigation.", "It is fine as long as I only use it for navigation.",
    "تا وقتی فقط برای مسیریابی از آن استفاده می‌کنم، اشکالی ندارد.",
    "Det afgørende er, at den skjuler udsynet, ikke hvad den bruges til.", "What matters is that it blocks the view, not what it is used for.",
    "مهم این است که جلوی دید را می‌گیرد، نه این‌که برای چه استفاده می‌شود."),
  S(False, "Det er i orden, fordi jeg kan se forbi den ved at bøje mig til siden.", "It is fine because I can see past it by leaning to the side.",
    "اشکالی ندارد، چون با خم شدن به کنار می‌توانم از کنارش ببینم.",
    "Du skal have frit udsyn hele tiden, uden at skulle flytte dig i sædet.", "You must have a free view all the time without having to move in your seat.",
    "باید همیشه دید آزاد داشته باشید، بی‌آن‌که لازم باشد روی صندلی جابه‌جا شوید."),
)

Q(5943, "1.2", picture("""
A close-up of a car's instrument panel: a red warning lamp is lit showing an exclamation mark inside a circle with curved brackets on
both sides (the brake warning symbol); the other warning lamps are dark.
MUST BE CLEARLY VISIBLE: the lit red brake warning lamp.
MUST NOT APPEAR: text, numbers, logos."""),
  "Under kørslen lyser den røde bremselampe med et udråbstegn i en cirkel, selv om du tror, at du har løsnet håndbremsen. Hvad gør du?",
  "While you are driving, the red brake lamp with an exclamation mark in a circle is lit, even though you think you have released the "
  "handbrake. What do you do?",
  "در حین رانندگی چراغ قرمز ترمز با علامت تعجب داخل دایره روشن است، با این‌که فکر می‌کنید ترمز دستی را آزاد کرده‌اید. چه می‌کنید؟",
  S(True, "Jeg standser, så snart det kan ske uden fare.", "I stop as soon as it can be done without danger.", "به‌محض این‌که بی‌خطر باشد می‌ایستم.",
    "Lampen kan betyde en fejl ved bremserne, og en rød lampe betyder som regel, at du skal standse.",
    "The lamp may mean a fault in the brakes, and a red lamp usually means that you must stop.",
    "این چراغ ممکن است نشانه‌ی خرابی ترمز باشد و چراغ قرمز معمولاً یعنی باید بایستید."),
  S(True, "Jeg kontrollerer, at håndbremsen er helt løsnet.", "I check that the handbrake is fully released.", "بررسی می‌کنم که ترمز دستی کاملاً آزاد باشد.",
    "En håndbremse, der ikke er helt løsnet, kan tænde lampen og overophede bremserne.",
    "A handbrake that is not fully released can switch on the lamp and overheat the brakes.",
    "ترمز دستی‌ای که کاملاً آزاد نشده ممکن است این چراغ را روشن و ترمزها را داغ کند."),
  S(True, "Jeg ser efter, om der mangler bremsevæske, eller får bilen tilset.", "I check whether brake fluid is missing or have the car looked at.",
    "بررسی می‌کنم که روغن ترمز کم نباشد یا خودرو را به تعمیرگاه می‌برم.",
    "For lidt bremsevæske kan betyde en utæthed, så bremserne kan svigte.", "Too little brake fluid can mean a leak, so the brakes may fail.",
    "کم بودن روغن ترمز ممکن است نشانه‌ی نشتی باشد و ترمزها از کار بیفتند."),
  S(True, "Jeg kører ikke videre, før jeg ved, at bremserne virker, som de skal.", "I do not drive on until I know that the brakes work as they should.",
    "تا مطمئن نشوم ترمزها درست کار می‌کنند، ادامه نمی‌دهم.",
    "Føreren skal sørge for, at bremserne virker forsvarligt.", "The driver must make sure that the brakes work safely.",
    "راننده باید مطمئن شود که ترمزها به‌درستی کار می‌کنند."),
)

Q(5944, "6.2", view("""
THE SCENE: a road at dusk; at the right edge a police car is parked behind a short row of orange cones, and a police officer in a
yellow high-visibility vest stands at the edge of our lane, waving a lit baton towards the space behind the cones to signal us to pull
in.
MUST BE CLEARLY VISIBLE: the police officer signalling with the lit baton, the police car, the cones marking where to pull in.
MUST NOT APPEAR: text other than plain police markings.""", cond="dusk, dry road"),
  "Politiet holder kontrol ved vejen. En betjent giver dig tegn til at køre ind til siden. Hvad gør du?",
  "The police are carrying out checks by the road. An officer signals you to pull in to the side. What do you do?",
  "پلیس کنار جاده بازرسی انجام می‌دهد. یک مأمور به شما علامت می‌دهد کنار بکشید. چه می‌کنید؟",
  S(True, "Jeg følger betjentens anvisning og kører ind, hvor han viser.", "I follow the officer's direction and pull in where he shows.",
    "از دستور مأمور پیروی می‌کنم و همان جایی که نشان می‌دهد کنار می‌کشم.",
    "Trafikanter skal efterkomme politiets anvisninger.", "Road users must comply with the directions given by the police.",
    "کاربران جاده باید از دستورهای پلیس پیروی کنند."),
  S(True, "Jeg sætter farten ned i god tid og giver tegn, før jeg kører ind til siden.",
    "I slow down in good time and signal before I pull in to the side.", "به‌موقع سرعتم را کم می‌کنم و پیش از کنار کشیدن علامت می‌دهم.",
    "Så kan de bag dig se, hvad du vil, og nå at tilpasse farten.", "Then those behind you can see what you intend and adjust their speed.",
    "این‌طور پشت‌سری‌ها می‌فهمند چه می‌خواهید و می‌توانند سرعتشان را تنظیم کنند."),
  S(True, "Jeg har kørekortet klar, hvis betjenten beder om det.", "I have my driving licence ready in case the officer asks for it.",
    "گواهینامه‌ام را آماده دارم، اگر مأمور خواست.",
    "Føreren skal have kørekortet med under kørslen og vise det til politiet på forlangende.",
    "The driver must carry the licence while driving and show it to the police on request.",
    "راننده باید هنگام رانندگی گواهینامه را همراه داشته باشد و در صورت درخواست به پلیس نشان دهد."),
  S(False, "Jeg må køre videre, hvis jeg ikke har gjort noget forkert.", "I may drive on if I have not done anything wrong.",
    "اگر کار اشتباهی نکرده‌ام، می‌توانم به راهم ادامه دهم.",
    "Politiets tegn skal følges, uanset om du mener, at du har gjort noget forkert.",
    "Police signals must be obeyed whether or not you think you have done anything wrong.",
    "علامت پلیس را باید رعایت کرد، چه فکر کنید کار اشتباهی کرده‌اید چه نه."),
)

Q(5945, "4.5", town("""
THE SCENE: a town street; ahead of us a cyclist rides at the right edge of the road and turns his head to look back over his LEFT
shoulder towards us; a little further ahead a side road goes off to the left.
MUST BE CLEARLY VISIBLE: the cyclist looking back over his left shoulder, the side road on the left.
MUST NOT APPEAR: signs, text."""),
  "Cyklisten foran dig kigger sig tilbage over venstre skulder. Hvad kan det betyde?",
  "The cyclist in front of you looks back over his left shoulder. What may it mean?",
  "دوچرخه‌سوارِ جلوی شما از روی شانه‌ی چپ به عقب نگاه می‌کند. این ممکن است به چه معنا باشد؟",
  S(True, "Cyklisten kan være ved at trække ud eller svinge til venstre.", "The cyclist may be about to pull out or turn left.",
    "ممکن است دوچرخه‌سوار بخواهد به سمت وسط بیاید یا به چپ بپیچد.",
    "Et blik tilbage er ofte tegn på, at cyklisten vil ændre placering.", "A look back is often a sign that the cyclist wants to change position.",
    "نگاه به عقب اغلب نشانه‌ی این است که دوچرخه‌سوار می‌خواهد جایش را تغییر دهد."),
  S(True, "Jeg venter med at overhale, til jeg kan se, hvad cyklisten vil.", "I wait to overtake until I can see what the cyclist intends.",
    "سبقت را تا وقتی ببینم دوچرخه‌سوار چه می‌خواهد عقب می‌اندازم.",
    "Overhaling skal kunne ske uden fare.", "Overtaking must be possible without danger.", "سبقت باید بی‌خطر باشد."),
  S(False, "Blikket betyder, at cyklisten giver mig lov til at overhale.", "The look means that the cyclist is letting me overtake.",
    "این نگاه یعنی دوچرخه‌سوار به من اجازه‌ی سبقت می‌دهد.",
    "Et blik tilbage er ikke et tegn til dig; cyklisten ser efter, om der er plads.",
    "A look back is not a signal to you; the cyclist is checking whether there is room.",
    "نگاه به عقب علامتی برای شما نیست؛ دوچرخه‌سوار نگاه می‌کند ببیند جا هست یا نه."),
  S(False, "Det betyder, at cyklisten vil standse.", "It means that the cyclist is going to stop.", "یعنی دوچرخه‌سوار می‌خواهد بایستد.",
    "En cyklist, der vil standse, rækker armen i vejret.", "A cyclist who intends to stop raises an arm.", "دوچرخه‌سواری که می‌خواهد بایستد دستش را بالا می‌برد."),
)

Q(5946, "5.2", view("""
THE SCENE: a two-lane country road in spring with fresh green trees; in a bend to the right ahead, loose grey gravel left from winter
gritting lies along the edge and across part of the lane; the rest of the road is dry.
MUST BE CLEARLY VISIBLE: the loose gravel in the bend, the dry road elsewhere.
MUST NOT APPEAR: signs, text.""", cond="spring, sunny, dry road"),
  "Det er forår, men i et sving ligger der stadig grus fra vinterens glatførebekæmpelse. Hvordan forholder du dig?",
  "It is spring, but in a bend there is still gravel left from the winter gritting. What do you do?",
  "بهار است، ولی در یک پیچ هنوز شن‌های پخش‌شده‌ی زمستان برای مقابله با یخ‌زدگی مانده است. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned før svinget.", "I slow down before the bend.", "پیش از پیچ سرعتم را کم می‌کنم.",
    "Det er farligt først at skulle bremse, når du er inde i svinget på gruset.", "It is dangerous to have to brake only once you are in the bend on the gravel.",
    "این‌که مجبور شوید وقتی روی شن‌ها در پیچ هستید ترمز کنید خطرناک است."),
  S(True, "Jeg undgår at bremse hårdt eller dreje brat på gruset.", "I avoid braking hard or turning sharply on the gravel.",
    "روی شن‌ها از ترمز شدید و چرخش تند پرهیز می‌کنم.",
    "Løst grus giver dårligt greb, så hjulene let skrider.", "Loose gravel gives poor grip, so the wheels easily slide.",
    "شن‌های شل چسبندگی کمی دارند و چرخ‌ها به‌راحتی می‌لغزند."),
  S(False, "Gruset giver bedre greb, ligesom om vinteren.", "The gravel gives better grip, just as in winter.", "این شن‌ها مثل زمستان چسبندگی را بیشتر می‌کنند.",
    "På tør asfalt virker løst grus som små kugler under hjulene og gør vejen glat.",
    "On dry asphalt loose gravel acts like small balls under the wheels and makes the road slippery.",
    "روی آسفالت خشک، شن‌های شل مثل گلوله‌های کوچکی زیر چرخ‌ها عمل می‌کنند و جاده را لغزنده می‌کنند."),
  S(False, "Grus har kun betydning for motorcykler.", "Gravel only matters for motorcycles.", "شن فقط برای موتورسیکلت‌ها مهم است.",
    "Også en bil kan skride ud på løst grus, især i et sving.", "A car can also skid on loose gravel, especially in a bend.",
    "خودرو هم ممکن است روی شن‌های شل، به‌خصوص در پیچ، بلغزد."),
)

Q(5947, "7.8", town("""
THE SCENE: a town street with one lane in our direction; an ambulance with flashing blue lights drives ahead of us in our lane, having
just overtaken us; the cars further ahead have pulled in to the right to let it through; further ahead a traffic light at a junction
shows red, and the ambulance is about to drive through it.
MUST BE CLEARLY VISIBLE: the ambulance with blue lights just ahead of us, the cars pulled in to the right, the red traffic light ahead.
MUST NOT APPEAR: text other than plain ambulance markings, readable number plates."""),
  "En ambulance med blå blink og sirene har lige overhalet dig. Du overvejer at lægge dig lige bag den for hurtigt at komme gennem "
  "trafikken. Hvad gælder?",
  "An ambulance with blue lights and siren has just overtaken you. You are thinking of tucking in right behind it to get through the "
  "traffic quickly. What applies?",
  "آمبولانسی با چراغ آبی و آژیر همین حالا از شما سبقت گرفته است. فکر می‌کنید درست پشت سرش بروید تا سریع از ترافیک عبور کنید. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg holder god afstand til ambulancen og følger ikke efter den.", "I keep a good distance from the ambulance and do not follow it.",
    "فاصله‌ی کافی با آمبولانس نگه می‌دارم و دنبالش نمی‌روم.",
    "Ambulancen kan standse eller svinge pludselig, og de andre trafikanter regner ikke med endnu et køretøj lige efter den.",
    "The ambulance may stop or turn suddenly, and other road users do not expect another vehicle right behind it.",
    "آمبولانس ممکن است ناگهان بایستد یا بپیچد و دیگران انتظار ندارند وسیله‌ی دیگری درست پشت سرش بیاید."),
  S(False, "Jeg må følge tæt efter den, fordi de andre alligevel holder til side.", "I may follow closely because the others are pulling over "
    "anyway.", "می‌توانم از نزدیک دنبالش بروم، چون بقیه در هر حال کنار می‌کشند.",
    "De andre holder til side for ambulancen, ikke for dig, og du skal holde så stor afstand, at du kan standse.",
    "The others pull over for the ambulance, not for you, and you must keep a distance that lets you stop.",
    "دیگران برای آمبولانس کنار می‌کشند، نه برای شما، و باید آن‌قدر فاصله بگیرید که بتوانید بایستید."),
  S(False, "Jeg må køre over for rødt sammen med ambulancen, når jeg følger lige efter den.", "I may drive through a red light together with "
    "the ambulance when I follow right behind it.", "وقتی درست پشت آمبولانس هستم، می‌توانم همراه آن از چراغ قرمز رد شوم.",
    "Kun udrykningskøretøjet må under udrykning fravige reglerne; du skal selv overholde signalet.",
    "Only the emergency vehicle may depart from the rules during an emergency run; you must obey the signal yourself.",
    "فقط خودروی امدادی در حین مأموریت می‌تواند از قواعد عدول کند؛ شما باید خودتان چراغ را رعایت کنید."),
)

Q(5948, "7.3", view("""
THE SCENE: a two-lane road leading down a long, steep hill through a wooded valley; at the right edge stands a red-bordered triangular
warning sign showing a black slope descending to the right and the number "10 %"; the road curves gently at the bottom of the hill.
MUST BE CLEARLY VISIBLE: the long steep descent, the warning sign with "10 %".
MUST NOT APPEAR: other signs, other text."""),
  "Du kører ned ad en lang, stejl bakke. Hvordan forholder du dig?",
  "You are driving down a long, steep hill. What do you do?",
  "از یک سراشیبی طولانی و تند پایین می‌روید. چه می‌کنید؟",
  S(True, "Jeg holder øje med farten, fordi den let bliver for høj ned ad bakken.", "I keep an eye on my speed because it easily becomes too "
    "high going downhill.", "حواسم به سرعت هست، چون در سراشیبی به‌راحتی زیاد می‌شود.",
    "Ned ad bakke øges farten af sig selv, og bremselængden bliver længere.", "Downhill the speed increases by itself, and the braking distance "
    "becomes longer.", "در سراشیبی سرعت خودبه‌خود زیاد می‌شود و مسافت ترمز طولانی‌تر می‌شود."),
  S(True, "Jeg bruger motorbremsen, fx ved at skifte til et lavere gear.", "I use engine braking, for example by changing to a lower gear.",
    "از ترمز موتور استفاده می‌کنم، مثلاً با رفتن به دنده‌ی سنگین‌تر.",
    "Så skal bremserne ikke klare det hele alene.", "Then the brakes do not have to do all the work alone.",
    "این‌طور ترمزها مجبور نیستند همه‌ی کار را به‌تنهایی انجام دهند."),
  S(True, "Jeg undgår at bremse uafbrudt hele vejen ned.", "I avoid braking continuously all the way down.",
    "از ترمز گرفتنِ پیوسته در تمام مسیر سراشیبی پرهیز می‌کنم.",
    "Bremserne kan blive overophedede og virke dårligere.", "The brakes may overheat and work less well.",
    "ترمزها ممکن است بیش از حد داغ شوند و ضعیف‌تر عمل کنند."),
  S(False, "Jeg sætter bilen i frigear, så den ruller let ned ad bakken.", "I put the car in neutral so that it rolls easily down the hill.",
    "خودرو را در دنده‌ی خلاص می‌گذارم تا راحت پایین بغلتد.",
    "I frigear har du ingen motorbremse, og bilen kan hurtigt få for høj fart.", "In neutral you have no engine braking, and the car can "
    "quickly pick up too much speed.", "در دنده‌ی خلاص ترمز موتور ندارید و خودرو ممکن است به‌سرعت بیش از حد تند شود."),
)

Q(5949, "7.19", town("""
THE SCENE: a town street in the evening, brightly lit by many tall street lights; our car is parked at the right kerb with its lights
off; the whole street, including the parked cars, is clearly visible.
MUST BE CLEARLY VISIBLE: the bright street lighting, our parked car with lights off.
MUST NOT APPEAR: signs, text.""", cond="evening, dark sky, well-lit street"),
  "Det er aften, og du parkerer ved kantstenen i en gade med god gadebelysning. Bilen kan tydeligt ses på lang afstand. Hvad gælder om "
  "lyset?",
  "It is evening, and you park at the kerb in a street with good street lighting. The car can be clearly seen from a long way off. What "
  "applies to the lights?",
  "عصر است و کنار جدول در خیابانی با روشنایی خوب پارک می‌کنید. خودرو از فاصله‌ی دور به‌وضوح دیده می‌شود. درباره‌ی چراغ‌ها چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg behøver ikke have parkeringslys tændt.", "I do not need to have parking lights on.", "لازم نیست چراغ پارک روشن باشد.",
    "Er vejen så godt oplyst, at køretøjet tydeligt kan ses på tilstrækkelig afstand, behøver det ikke have lys tændt.",
    "If the road is so well lit that the vehicle can be clearly seen from far enough away, it need not have its lights on.",
    "اگر خیابان آن‌قدر روشن باشد که وسیله از فاصله‌ی کافی به‌وضوح دیده شود، لازم نیست چراغی روشن باشد."),
  S(True, "Var gaden mørk, skulle bilen have parkeringslys tændt.", "If the street were dark, the car would have to have parking lights on.",
    "اگر خیابان تاریک بود، خودرو باید چراغ پارک روشن داشت.",
    "En bil, der holder på en mørk vej i lygtetændingstiden, skal have lys tændt, så andre kan se den.",
    "A car standing on a dark road in the lighting-up time must have lights on so that others can see it.",
    "خودرویی که در زمان روشن کردن چراغ‌ها در خیابان تاریک ایستاده، باید چراغ روشن داشته باشد تا دیگران آن را ببینند."),
  S(False, "Bilen skal have parkeringslys tændt, fordi det er lygtetændingstid.", "The car must have parking lights on because it is the "
    "lighting-up time.", "خودرو باید چراغ پارک روشن داشته باشد، چون زمان روشن کردن چراغ‌هاست.",
    "Kravet gælder ikke, når vejen er så godt oplyst, at bilen tydeligt kan ses på tilstrækkelig afstand.",
    "The requirement does not apply when the road is so well lit that the car can be clearly seen from far enough away.",
    "وقتی خیابان آن‌قدر روشن است که خودرو از فاصله‌ی کافی به‌وضوح دیده می‌شود، این الزام برقرار نیست."),
)

Q(5950, "7.19", view("""
THE SCENE: a two-lane road in heavy snowfall; thick snowflakes fill the air and visibility is poor; the rear lights of a car ahead are
only just visible; the verges are white.
MUST BE CLEARLY VISIBLE: the heavy snowfall, the poor visibility, the faint rear lights ahead.
MUST NOT APPEAR: signs, text.""", cond="heavy snowfall, poor visibility"),
  "Det sner så kraftigt, at sigtbarheden er dårlig. Hvad gælder om tågelygterne?",
  "It is snowing so heavily that visibility is poor. What applies to the fog lamps?",
  "برف آن‌قدر شدید می‌بارد که دید کم است. درباره‌ی چراغ‌های مه‌شکن چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må bruge tågelygterne, fordi der er kraftig nedbør.", "I may use the fog lamps because there is heavy precipitation.",
    "می‌توانم از چراغ‌های مه‌شکن استفاده کنم، چون بارش شدید است.",
    "Tågelygter må bruges i tåge og under kraftig nedbør, fx kraftigt snevejr.", "Fog lamps may be used in fog and in heavy precipitation, for example heavy snow.",
    "چراغ مه‌شکن در مه و بارش شدید، مثلاً برف سنگین، مجاز است."),
  S(True, "Jeg slukker tågebaglygten igen, når sigtbarheden bliver bedre.", "I switch the rear fog lamp off again when visibility improves.",
    "وقتی دید بهتر شد، چراغ مه‌شکن عقب را خاموش می‌کنم.",
    "Den kraftige tågebaglygte kan blænde dem bag dig, når der ikke længere er dårlig sigt.",
    "The strong rear fog lamp can dazzle those behind you once visibility is no longer poor.",
    "چراغ مه‌شکنِ قوی عقب وقتی دیگر دید کم نیست ممکن است پشت‌سری‌ها را خیره کند."),
  S(False, "Tågelygter må kun bruges i tåge, ikke i snevejr.", "Fog lamps may only be used in fog, not in snow.",
    "چراغ مه‌شکن فقط در مه مجاز است، نه در برف.",
    "De må også bruges under kraftig nedbør.", "They may also be used in heavy precipitation.", "در بارش شدید هم مجازند."),
  S(False, "Tågebaglygten må stå tændt, så længe det er vinter.", "The rear fog lamp may stay on for as long as it is winter.",
    "چراغ مه‌شکن عقب می‌تواند تا وقتی زمستان است روشن بماند.",
    "Tågelygter må kun bruges, mens der er tåge eller kraftig nedbør.", "Fog lamps may only be used while there is fog or heavy precipitation.",
    "چراغ مه‌شکن فقط تا وقتی مه یا بارش شدید هست مجاز است."),
)
