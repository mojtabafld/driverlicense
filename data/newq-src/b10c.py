# «آزمون جدید», batch 10 (5901–6000), part c: straight on at junctions (7.12), right turns (7.13), left turns (7.14), junctions in
# general and level crossings (7.11) and roundabouts (7.15).
# Rules: Færdselsloven §§ 2 (the rules for drivers also apply to riders), 5 stk. 1 (no crossing when a train can be seen or heard;
# cross without unnecessary delay), 7 stk. 2 (keep the way open for emergency vehicles), 16 stk. 2–3, 17 (the turning rules also apply
# when turning off the road away from a junction), 20 stk. 1 (an obstruction on your side: you stop and let the oncoming pass), 21
# (overtaking on the right only past a vehicle turning left), 26 stk. 2–7 (ubetinget vigepligt, also out of a filling station; right-hand
# rule; showing the duty in good time; turning left/right and cyclists and moped riders going straight on; not blocking a junction),
# 27 stk. 8, 32 stk. 2 and 4 (arm horizontally out for a turn, raised for stopping); BEK 425/2023: E 51 nr. 6 and E 52 (ubetinget
# vigepligt when leaving a play street), X 16 (the cyclist signal also applies to small mopeds on the same area), Z 72,2 (flashing red at level crossings means stop),
# A 74,2 (crossing with more than one track), hajtænder (traffic from the side the points face has ubetinget vigepligt).
# Guidance (not law): convex traffic mirrors make things look smaller and further away; long lorries swing out and need room.
from nq import Q, S, above, picture, town, view

Q(5951, "7.12", view("""
THE SCENE: a crossroads in a village without signs or road markings; from the road on the RIGHT a rider on a brown horse is
approaching the junction at a walk, about to ride straight across; the rider looks towards us.
MUST BE CLEARLY VISIBLE: the rider on the horse coming from the right, the unmarked crossroads.
MUST NOT APPEAR: signs, road markings, text."""),
  "Du skal ligeud i et kryds uden tavler og afmærkning. Ad vejen fra højre kommer en rytter til hest, som også skal ligeud. Hvad gælder?",
  "You are going straight on at a junction without signs or markings. A rider on horseback is coming along the road from the right and is "
  "also going straight on. What applies?",
  "در تقاطعی بدون تابلو و خط‌کشی می‌خواهید مستقیم بروید. از جاده‌ی سمت راست سوارکاری با اسب می‌آید که او هم می‌خواهد مستقیم برود. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Jeg skal lade rytteren komme over først.", "I must let the rider cross first.", "باید بگذارم سوارکار اول رد شود.",
    "Færdselsreglerne for kørende gælder også for ridende, så højre vigepligt gælder også over for en rytter fra højre.",
    "The traffic rules for drivers also apply to riders, so you must also give way to a rider from the right.",
    "قواعد رانندگان برای سوارکاران هم برقرار است، پس باید به سوارکارِ سمت راست هم راه بدهید."),
  S(True, "Jeg holder god afstand til hesten, mens jeg venter.", "I keep a good distance from the horse while I wait.",
    "در حال انتظار فاصله‌ی کافی با اسب نگه می‌دارم.",
    "En hest kan blive bange for en bil, der kommer for tæt på.", "A horse may be frightened by a car that comes too close.",
    "اسب ممکن است از خودرویی که خیلی نزدیک شود بترسد."),
  S(False, "En rytter er ikke et køretøj, så rytteren skal holde tilbage for mig.", "A rider is not a vehicle, so the rider must give way to "
    "me.", "سوارکار وسیله‌ی نقلیه نیست، پس او باید به من راه بدهد.",
    "En hest er ikke et køretøj, men ridende skal følge reglerne for kørende, også i kryds.",
    "A horse is not a vehicle, but riders must follow the rules for drivers, also at junctions.",
    "اسب وسیله‌ی نقلیه نیست، ولی سوارکاران باید قواعد رانندگان را، از جمله در تقاطع، رعایت کنند."),
  S(False, "Jeg må køre først, fordi bilen kører hurtigere end hesten.", "I may go first because the car is faster than the horse.",
    "می‌توانم اول بروم، چون خودرو از اسب سریع‌تر است.",
    "Vigepligten afhænger ikke af farten; rytteren kommer fra højre.", "Priority does not depend on speed; the rider is coming from the right.",
    "حق تقدم به سرعت بستگی ندارد؛ سوارکار از سمت راست می‌آید."),
)

Q(5952, "7.12", town("""
THE SCENE: a crossroads in a residential area without signs or road markings; from the road on the RIGHT a car approaches the junction
with its LEFT indicator flashing, so it will turn into the road we are coming along, crossing in front of us.
MUST BE CLEARLY VISIBLE: the car from the right with its flashing left indicator, the unmarked crossroads.
MUST NOT APPEAR: signs, road markings, text, readable number plates."""),
  "Du skal ligeud i et kryds uden tavler og afmærkning. Fra højre kommer en bil, der blinker til venstre. Hvad gælder?",
  "You are going straight on at a junction without signs or markings. A car is coming from the right with its left indicator on. What "
  "applies?",
  "در تقاطعی بدون تابلو و خط‌کشی می‌خواهید مستقیم بروید. از سمت راست خودرویی می‌آید که راهنمای چپ زده است. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen fra højre må køre før mig, selv om den skal svinge til venstre.", "The car from the right may go before me even though it is "
    "turning left.", "خودروی سمت راست، با این‌که می‌خواهد به چپ بپیچد، می‌تواند پیش از من برود.",
    "I et kryds uden tavler skal du holde tilbage for kørende fra højre, uanset hvor de skal hen.",
    "At a junction without signs you must give way to traffic from the right, wherever it is going.",
    "در تقاطع بدون تابلو باید به وسایلِ سمت راست راه بدهید، هر جا که بخواهند بروند."),
  S(True, "Jeg viser tydeligt, at jeg holder tilbage, ved at sætte farten ned i god tid.", "I show clearly that I am giving way by slowing "
    "down in good time.", "با کم کردن به‌موقع سرعت به‌روشنی نشان می‌دهم که راه می‌دهم.",
    "Den, der har vigepligt, skal i god tid vise det ved at nedsætte farten eller standse.",
    "Whoever must give way must show it in good time by slowing down or stopping.",
    "کسی که باید راه بدهد، باید با کم کردن سرعت یا توقفِ به‌موقع آن را نشان دهد."),
  S(True, "Bilens vej skærer min, når den svinger ind på den vej, jeg kommer fra.", "Its path crosses mine when it turns into the road I am "
    "coming from.", "وقتی به جاده‌ای که من از آن می‌آیم می‌پیچد، مسیرش مسیر مرا قطع می‌کند.",
    "Den kører ind foran dig for at komme over i den modsatte vognbane på din vej.", "It drives in front of you to get into the opposite lane "
    "of your road.", "از جلوی شما رد می‌شود تا به خط مقابلِ جاده‌ی شما برود."),
  S(False, "En bil, der svinger til venstre, skal altid holde tilbage for mig.", "A car that is turning left must always give way to me.",
    "خودرویی که به چپ می‌پیچد همیشه باید به من راه بدهد.",
    "Den skal holde tilbage for sine modkørende, men du kommer fra dens venstre side.",
    "It must give way to its oncoming traffic, but you are coming from its left.",
    "باید به وسایلِ روبه‌روی خودش راه بدهد، ولی شما از سمت چپِ آن می‌آیید."),
)

Q(5953, "7.12", town("""
THE SCENE: a junction with traffic lights in town; our light is green; directly in front of us a tall white box van drives straight on
into the junction; in the oncoming direction a car waits in the middle of the junction with its left indicator flashing, ready to turn
left across our path; the van hides us from that driver.
MUST BE CLEARLY VISIBLE: the tall van just ahead of us, the oncoming car waiting to turn left, the green light.
MUST NOT APPEAR: text, logos, readable number plates."""),
  "Du har grønt og kører ligeud gennem krydset lige bag en høj varevogn. En modkørende bil venter i krydset på at svinge til venstre. "
  "Hvordan forholder du dig?",
  "You have a green light and are driving straight on through the junction right behind a tall van. An oncoming car is waiting in the "
  "junction to turn left. What do you do?",
  "چراغ سبز است و درست پشت یک ون بلند مستقیم از تقاطع رد می‌شوید. خودرویی از روبه‌رو در تقاطع منتظر است تا به چپ بپیچد. چه می‌کنید؟",
  S(True, "Jeg er forberedt på, at føreren ikke kan se mig bag varevognen.", "I am prepared for the driver not being able to see me behind "
    "the van.", "آماده‌ام که راننده نتواند مرا پشت ون ببیند.",
    "Varevognen skjuler dig, og føreren kan tro, at der er frit, når den er kørt forbi.",
    "The van hides you, and the driver may think the way is clear once it has passed.",
    "ون شما را پنهان می‌کند و راننده ممکن است فکر کند بعد از رد شدنِ ون راه باز است."),
  S(True, "Jeg holder større afstand til varevognen, så jeg bedre kan ses og selv kan se.", "I keep a greater distance from the van so that I "
    "can be seen better and see better myself.", "فاصله‌ام را با ون بیشتر می‌کنم تا بهتر دیده شوم و خودم هم بهتر ببینم.",
    "Tæt bag en høj bil er du skjult, og du kan ikke se, hvad der sker foran.",
    "Close behind a tall vehicle you are hidden, and you cannot see what is happening ahead.",
    "درست پشت خودروی بلند پنهان می‌شوید و نمی‌بینید جلو چه می‌گذرد."),
  S(True, "Jeg er klar til at bremse, hvis bilen begynder at svinge.", "I am ready to brake if the car starts to turn.",
    "آماده‌ی ترمزم اگر آن خودرو شروع به پیچیدن کند.",
    "Selv om den skal holde tilbage for dig, skal du kunne undgå et sammenstød.",
    "Even though it must give way to you, you must be able to avoid a collision.",
    "با این‌که باید به شما راه بدهد، باید بتوانید از برخورد پرهیز کنید."),
  S(False, "Den modkørende har vigepligt, så jeg behøver ikke tage hensyn til den.", "The oncoming car must give way, so I need not pay "
    "attention to it.", "خودروی روبه‌رو باید راه بدهد، پس لازم نیست به آن توجه کنم.",
    "Du skal være forberedt på, at andre begår fejl, især når de ikke kan se dig.",
    "You must be prepared for others to make mistakes, especially when they cannot see you.",
    "باید آماده‌ی اشتباه دیگران باشید، به‌خصوص وقتی شما را نمی‌بینند."),
)

Q(5954, "7.12", town("""
THE SCENE: a crossroads in a residential area with hedges, without signs or road markings; from the road on the LEFT a child of about
nine on a bicycle rides quickly towards the junction without looking, about to ride straight across.
MUST BE CLEARLY VISIBLE: the child on the bicycle coming from the left, the unmarked crossroads.
MUST NOT APPEAR: signs, road markings, text."""),
  "Du skal ligeud i et kryds uden tavler i et villakvarter. Fra venstre kommer et barn på cykel hurtigt hen mod krydset uden at se sig for. "
  "Hvordan forholder du dig?",
  "You are going straight on at a junction without signs in a residential area. A child on a bicycle is riding quickly towards the junction "
  "from the left without looking. What do you do?",
  "در یک محله‌ی ویلایی، در تقاطعی بدون تابلو می‌خواهید مستقیم بروید. از سمت چپ کودکی دوچرخه‌سوار، بی‌آن‌که نگاه کند، تند به تقاطع "
  "نزدیک می‌شود. چه می‌کنید؟",
  S(True, "Jeg sænker farten og gør mig klar til at standse for barnet.", "I reduce speed and get ready to stop for the child.",
    "سرعتم را کم می‌کنم و آماده‌ی توقف برای کودک می‌شوم.",
    "Barnet skal holde tilbage for dig, men det ser ikke ud til at ville gøre det.",
    "The child must give way to you, but does not look as if it will.", "کودک باید به شما راه بدهد، ولی به نظر نمی‌رسد این کار را بکند."),
  S(True, "Jeg regner med, at barnet ikke kender eller overholder vigepligten.", "I count on the child not knowing or keeping to the give-way "
    "rule.", "در نظر دارم که کودک قاعده‌ی حق تقدم را نداند یا رعایت نکند.",
    "Børn kan ikke altid overskue trafikken og glemmer let reglerne.", "Children cannot always take in the traffic and easily forget the rules.",
    "کودکان همیشه نمی‌توانند ترافیک را درک کنند و قواعد را زود فراموش می‌کنند."),
  S(False, "Jeg holder farten, fordi barnet skal holde tilbage for mig.", "I keep my speed because the child must give way to me.",
    "سرعتم را حفظ می‌کنم، چون کودک باید به من راه بدهد.",
    "Barnet skal holde tilbage, men du skal kunne standse, hvis det ikke gør det.",
    "The child must give way, but you must be able to stop if it does not.", "کودک باید راه بدهد، ولی شما باید بتوانید بایستید اگر این کار را نکرد."),
  S(False, "Barnet kommer fra venstre, så jeg behøver ikke holde øje med det.", "The child is coming from the left, so I need not keep an eye "
    "on it.", "کودک از سمت چپ می‌آید، پس لازم نیست حواسم به او باشد.",
    "Du skal holde øje med alle, der nærmer sig krydset, også fra venstre.", "You must watch everyone approaching the junction, also from the "
    "left.", "باید حواستان به همه‌ی کسانی که به تقاطع نزدیک می‌شوند باشد، از جمله از سمت چپ."),
)

Q(5955, "7.12", town("""
THE SCENE: we are about to leave a play street, paved on one level from house to house with planters and benches, where it meets an
ordinary residential road with kerbs; at the exit stands a blue sign with pictograms of a house, an adult, a child playing and a car,
crossed by a red diagonal bar (the end of the play street); there are NO triangles or lines painted at the exit; on the ordinary road a
car approaches from the LEFT.
MUST BE CLEARLY VISIBLE: the end-of-play-street sign, the exit without painted markings, the car coming from the left.
MUST NOT APPEAR: other signs, text, readable number plates."""),
  "Du kører ud af et opholds- og legeområde forbi denne tavle og ind på en almindelig vej. Der er ingen hajtænder. Fra venstre kommer en bil. "
  "Hvad gælder?",
  "You are leaving a play street past this sign and driving onto an ordinary road. There are no give-way lines. A car is coming from the "
  "left. What applies?",
  "از کنار این تابلو از یک «منطقه‌ی بازی و اقامت» خارج می‌شوید و وارد خیابانی عادی می‌شوید. خط دندان‌کوسه‌ای نیست. از سمت چپ خودرویی "
  "می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg har ubetinget vigepligt og skal lade bilen fra venstre køre først.", "I must give way to all traffic and let the car from the "
    "left go first.", "باید به همه راه بدهم و بگذارم خودروی سمت چپ اول برود.",
    "Ved udkørsel fra et opholds- og legeområde har du ubetinget vigepligt, også uden hajtænder.",
    "When leaving a play street you must give way to all traffic, even without give-way lines.",
    "هنگام خروج از منطقه‌ی بازی و اقامت باید به همه راه بدهید، حتی بدون خط دندان‌کوسه‌ای."),
  S(False, "Uden hajtænder gælder højre vigepligt, så bilen fra venstre skal holde tilbage for mig.", "Without give-way lines the right-hand "
    "rule applies, so the car from the left must give way to me.", "بدون خط دندان‌کوسه‌ای قاعده‌ی حق تقدم سمت راست برقرار است، پس "
    "خودروی سمت چپ باید به من راه بدهد.",
    "Udkørslen fra området giver dig ubetinget vigepligt uden særlig afmærkning.",
    "Leaving the area means that you must give way to all, without any special marking.",
    "خروج از این منطقه، بدون هیچ علامت خاصی، شما را موظف به راه دادن به همه می‌کند."),
  S(False, "Jeg skal kun holde tilbage for gående og legende børn.", "I only have to give way to pedestrians and children playing.",
    "فقط باید به عابران و کودکانِ در حال بازی راه بدهم.",
    "Du skal holde tilbage for den kørende færdsel fra begge sider.", "You must give way to vehicles from both sides.",
    "باید به وسایل نقلیه از هر دو طرف راه بدهید."),
)

Q(5956, "7.13", town("""
THE SCENE: we are about to turn right into a side street; a little way into the side street a bus stands at a bus stop on the far side
(the side for traffic coming out), with passengers getting off; a car coming out of the side street has pulled out round the bus and is
now on our side of the side street.
MUST BE CLEARLY VISIBLE: the bus at the stop on the far side, the car pulling out round it on our side, the passengers.
MUST NOT APPEAR: signs, text, logos, readable number plates."""),
  "Du vil svinge til højre ind ad en sidevej. I sidevejen holder en bus ved et stoppested i den modsatte side, og en bil er ved at køre ud "
  "forbi bussen i din side af vejen. Hvordan forholder du dig?",
  "You want to turn right into a side road. In the side road a bus is standing at a stop on the opposite side, and a car is pulling out "
  "past the bus on your side of the road. What do you do?",
  "می‌خواهید به راست وارد فرعی شوید. در فرعی اتوبوسی در سمت مقابل کنار ایستگاه ایستاده و خودرویی در حال عبور از کنار اتوبوس، در سمت "
  "شما بیرون می‌آید. چه می‌کنید؟",
  S(True, "Jeg svinger langsomt ind, så jeg kan standse, hvis bilen stadig er i min side.", "I turn in slowly so that I can stop if the car is "
    "still on my side.", "آهسته می‌پیچم تا اگر آن خودرو هنوز در سمت من بود بتوانم بایستم.",
    "Bilen, der kører forbi bussen, skal lade dig passere, men den kan allerede være ude i din side.",
    "The car passing the bus must let you pass, but it may already be out on your side.",
    "خودرویی که از کنار اتوبوس رد می‌شود باید بگذارد شما رد شوید، ولی ممکن است همین حالا در سمت شما باشد."),
  S(True, "Jeg er forberedt på, at passagerer kan gå ud på vejen bag bussen.", "I am prepared for passengers to walk out into the road behind "
    "the bus.", "آماده‌ام که مسافران از پشت اتوبوس وارد خیابان شوند.",
    "Folk, der lige er steget af, vil ofte hurtigt over vejen.", "People who have just got off often want to cross the road quickly.",
    "کسانی که تازه پیاده شده‌اند اغلب می‌خواهند سریع از خیابان رد شوند."),
  S(False, "Jeg svinger ind i normal fart, fordi bilen skal holde tilbage for mig.", "I turn in at normal speed because the car must give way "
    "to me.", "با سرعت عادی می‌پیچم، چون آن خودرو باید به من راه بدهد.",
    "Du skal kunne standse, hvis den ikke gør det, og der kan komme gående frem bag bussen.",
    "You must be able to stop if it does not, and pedestrians may appear from behind the bus.",
    "اگر راه نداد باید بتوانید بایستید و ممکن است عابرانی از پشت اتوبوس بیرون بیایند."),
  S(False, "Bussen holder i den modsatte side, så den har ingen betydning for mig.", "The bus is on the opposite side, so it does not matter "
    "to me.", "اتوبوس در سمت مقابل است، پس برای من اهمیتی ندارد.",
    "Bussen får andre til at køre ud i din side, og den skjuler gående.", "The bus makes others pull out onto your side, and it hides "
    "pedestrians.", "اتوبوس باعث می‌شود دیگران به سمت شما بیایند و عابران را پنهان می‌کند."),
)

Q(5957, "7.13", town("""
THE SCENE: a town junction with a tight corner to the right; directly ahead of us a long lorry with its RIGHT indicator flashing has
moved out towards the middle of the road to get round the corner, so a wide gap has opened between the lorry and the right kerb; a
cycle path runs along the right side of the road.
MUST BE CLEARLY VISIBLE: the lorry with its flashing right indicator out towards the middle, the gap on its right, the cycle path.
MUST NOT APPEAR: signs, text, logos."""),
  "Lastbilen foran dig blinker til højre, men trækker først ud mod midten af vejen for at komme rundt om hjørnet. Du skal også til højre. "
  "Hvordan forholder du dig?",
  "The lorry in front of you is indicating right but first pulls out towards the middle of the road to get round the corner. You are also "
  "turning right. What do you do?",
  "کامیونِ جلوی شما راهنمای راست زده، ولی اول به سمت وسط جاده می‌رود تا بتواند از گوشه بپیچد. شما هم می‌خواهید به راست بپیچید. چه "
  "می‌کنید؟",
  S(True, "Jeg bliver bag lastbilen og kører ikke ind i hullet til højre for den.", "I stay behind the lorry and do not drive into the gap on "
    "its right.", "پشت کامیون می‌مانم و وارد فضای خالیِ سمت راستش نمی‌شوم.",
    "Når lastbilen svinger, lukker den hullet, og du kan blive klemt.", "When the lorry turns, it closes the gap, and you may be crushed.",
    "وقتی کامیون می‌پیچد، آن فضا بسته می‌شود و ممکن است گیر بیفتید."),
  S(True, "Jeg holder god afstand, så jeg kan se, hvad lastbilen gør.", "I keep a good distance so that I can see what the lorry is doing.",
    "فاصله‌ی کافی نگه می‌دارم تا ببینم کامیون چه می‌کند.",
    "Lange køretøjer har brug for meget plads, når de svinger.", "Long vehicles need a lot of room when they turn.",
    "وسایل بلند هنگام پیچیدن جای زیادی لازم دارند."),
  S(True, "Jeg er opmærksom på cyklister, der kan køre op i højre side af lastbilen.", "I watch out for cyclists who may ride up on the "
    "lorry's right-hand side.", "حواسم به دوچرخه‌سوارانی هست که ممکن است از سمت راست کامیون جلو بروند.",
    "Lastbilens fører kan have svært ved at se dem, og du skal også selv holde tilbage for dem, når du svinger.",
    "The lorry driver may find it hard to see them, and you must also give way to them yourself when you turn.",
    "راننده‌ی کامیون ممکن است آن‌ها را نبیند و شما هم هنگام پیچیدن باید به آن‌ها راه بدهید."),
  S(False, "Jeg kører op i højre side af lastbilen og svinger før den.", "I drive up on the lorry's right-hand side and turn before it.",
    "از سمت راست کامیون جلو می‌روم و پیش از آن می‌پیچم.",
    "Det er at overhale til højre, og lastbilens fører regner ikke med dig dér.",
    "That is overtaking on the right, and the lorry driver does not expect you there.",
    "این سبقت از راست است و راننده‌ی کامیون انتظار ندارد شما آن‌جا باشید."),
)

Q(5958, "7.13", town("""
THE SCENE: a town street with a cycle path along the right, separated from the carriageway by a kerb; just ahead a side street goes off
to the right; our right indicator is flashing; in the right-hand door mirror a small moped (a rider with a helmet on a small scooter) is
seen coming quickly along the cycle path behind us, going straight on.
MUST BE CLEARLY VISIBLE: the side street to the right, the cycle path, the small moped in the door mirror.
MUST NOT APPEAR: signs, text, readable number plates."""),
  "Du vil svinge til højre ind ad en sidevej. På cykelstien bag dig kommer en lille knallert, der skal ligeud. Hvad gælder?",
  "You want to turn right into a side road. On the cycle path behind you a small moped is coming and is going straight on. What applies?",
  "می‌خواهید به راست وارد یک فرعی شوید. روی مسیر دوچرخه، پشت سر شما، یک موپد کوچک می‌آید که می‌خواهد مستقیم برود. چه قاعده‌ای برقرار "
  "است؟",
  S(True, "Jeg skal holde tilbage for knallerten.", "I must give way to the moped.", "باید به موپد راه بدهم.",
    "Når du svinger til højre, må du ikke være til ulempe for cyklister og knallertkørere, der kører ligeud.",
    "When you turn right, you must not get in the way of cyclists and moped riders going straight on.",
    "وقتی به راست می‌پیچید، نباید مزاحم دوچرخه‌سواران و موپدسوارانی شوید که مستقیم می‌روند."),
  S(False, "Vigepligten over for kørende på cykelstien gælder kun cyklister.", "The duty to give way to riders on the cycle path only applies "
    "to cyclists.", "وظیفه‌ی راه دادن به کسانی که در مسیر دوچرخه‌اند فقط درباره‌ی دوچرخه‌سواران است.",
    "Den gælder også knallertkørere, der kører ligeud.", "It also applies to moped riders going straight on.",
    "درباره‌ی موپدسوارانی که مستقیم می‌روند هم صدق می‌کند."),
  S(False, "Jeg kan nå at svinge foran den, fordi en knallert kører lige så langsomt som en cyklist.", "I have time to turn in front of it "
    "because a moped is as slow as a bicycle.", "فرصت دارم جلویش بپیچم، چون موپد هم مثل دوچرخه آهسته است.",
    "En lille knallert kan køre op til 30 km/t og er der hurtigere, end du tror.", "A small moped can do up to 30 km/h and gets there faster "
    "than you think.", "موپد کوچک تا ۳۰ کیلومتر در ساعت می‌رود و زودتر از آنچه فکر می‌کنید می‌رسد."),
  S(False, "Knallerten skal holde tilbage for mig, fordi jeg blinker.", "The moped must give way to me because I am indicating.",
    "موپد باید به من راه بدهد، چون راهنما زده‌ام.",
    "Blinklyset giver dig ingen ret til at svinge foran andre.", "Your indicator gives you no right to turn in front of others.",
    "راهنما به شما حقی برای پیچیدن جلوی دیگران نمی‌دهد."),
)

Q(5959, "7.13", town("""
THE SCENE: a junction with traffic lights in town; our light is red and about to change; directly in front of our car a cyclist waits
at the stop line at the right edge of the lane, stretching his RIGHT arm out to the side to show that he is turning right; the street
to the right is just ahead.
MUST BE CLEARLY VISIBLE: the cyclist in front of us with his right arm out, the red light, the street to the right.
MUST NOT APPEAR: text, readable number plates."""),
  "Du holder for rødt og skal til højre. Foran dig ved stoplinjen holder en cyklist, som rækker højre arm ud. Lyset skifter til grønt. "
  "Hvordan forholder du dig?",
  "You are waiting at red and turning right. In front of you at the stop line a cyclist is waiting with his right arm stretched out. The "
  "light turns green. What do you do?",
  "پشت چراغ قرمز ایستاده‌اید و می‌خواهید به راست بپیچید. جلوی شما پشت خط توقف دوچرخه‌سواری ایستاده که دست راستش را دراز کرده است. "
  "چراغ سبز می‌شود. چه می‌کنید؟",
  S(True, "Jeg lader cyklisten svinge først og følger efter med god afstand.", "I let the cyclist turn first and follow at a good distance.",
    "می‌گذارم دوچرخه‌سوار اول بپیچد و با فاصله‌ی کافی دنبالش می‌روم.",
    "Så kommer du ikke for tæt på cyklisten i svinget.", "Then you do not get too close to the cyclist in the turn.",
    "این‌طور در پیچ بیش از حد به دوچرخه‌سوار نزدیک نمی‌شوید."),
  S(True, "Jeg er forberedt på, at cyklisten svinger langsomt og lidt bredt.", "I am prepared for the cyclist to turn slowly and a little wide.",
    "آماده‌ام که دوچرخه‌سوار آهسته و کمی با دور باز بپیچد.",
    "En cyklist, der starter fra stilstand, kan slingre lidt.", "A cyclist starting from a standstill may wobble a little.",
    "دوچرخه‌سواری که از حالت ایستاده راه می‌افتد ممکن است کمی تلوتلو بخورد."),
  S(False, "Jeg kører op ved siden af cyklisten, så vi kan svinge samtidig.", "I drive up beside the cyclist so that we can turn at the same "
    "time.", "کنار دوچرخه‌سوار می‌روم تا هم‌زمان بپیچیم.",
    "I svinget kan du komme til at klemme cyklisten mod kantstenen.", "In the turn you may squeeze the cyclist against the kerb.",
    "در پیچ ممکن است دوچرخه‌سوار را به لبه‌ی جدول فشار دهید."),
  S(False, "Cyklisten skal vente, fordi bilen kommer hurtigst rundt.", "The cyclist must wait because the car gets round fastest.",
    "دوچرخه‌سوار باید صبر کند، چون خودرو سریع‌تر می‌پیچد.",
    "Cyklisten holder foran dig og skal ikke vente på dig.", "The cyclist is in front of you and need not wait for you.",
    "دوچرخه‌سوار جلوی شماست و لازم نیست منتظر شما بماند."),
)

Q(5960, "7.13", town("""
THE SCENE: we are about to turn right into a narrow side street; just after the corner a delivery van is parked at the right kerb of the
side street, so a car turning in must use the opposite side to get past it; a car is coming out along the side street towards the
junction; pavements on both sides.
MUST BE CLEARLY VISIBLE: the van parked just after the corner, the car coming out of the side street, the narrow side street.
MUST NOT APPEAR: signs, text, logos, readable number plates."""),
  "Du vil svinge til højre ind ad en smal sidevej. Lige efter hjørnet holder en varevogn parkeret i din side, og en bil kommer ud ad sidevejen. "
  "Hvad gælder?",
  "You want to turn right into a narrow side road. Just after the corner a van is parked on your side, and a car is coming out of the side "
  "road. What applies?",
  "می‌خواهید به راست وارد فرعی باریکی شوید. درست بعد از گوشه، یک ون در سمت شما پارک شده و خودرویی از فرعی بیرون می‌آید. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg skal lade bilen, der kommer ud, passere varevognen først.", "I must let the car coming out pass the van first.",
    "باید بگذارم خودرویی که بیرون می‌آید اول از کنار ون رد شود.",
    "Er vejen delvist spærret, skal den, i hvis side spærringen er, om nødvendigt standse og lade de mødende passere.",
    "If the road is partly blocked, the vehicle on whose side the obstruction is must stop if necessary and let oncoming vehicles pass.",
    "اگر جاده تا حدی بسته باشد، وسیله‌ای که مانع در سمت آن است باید در صورت لزوم بایستد و بگذارد وسایل روبه‌رو رد شوند."),
  S(True, "Jeg er forberedt på, at der kan komme gående frem bag varevognen.", "I am prepared for pedestrians to appear from behind the van.",
    "آماده‌ام که عابرانی از پشت ون بیرون بیایند.",
    "Varevognen skjuler fortovet og en del af vejen.", "The van hides the pavement and part of the road.",
    "ون پیاده‌رو و بخشی از جاده را پنهان می‌کند."),
  S(False, "Bilen, der kommer ud, skal vente, fordi jeg kommer fra den større vej.", "The car coming out must wait because I am coming from "
    "the bigger road.", "خودرویی که بیرون می‌آید باید صبر کند، چون من از جاده‌ی بزرگ‌تر می‌آیم.",
    "Det er din side af sidevejen, der er spærret, så det er dig, der skal vente.",
    "It is your side of the side road that is blocked, so it is you who must wait.",
    "سمتِ شما از فرعی بسته است، پس این شما هستید که باید صبر کنید."),
  S(False, "Jeg svinger hurtigt ind og kører forbi varevognen, før bilen når frem.", "I turn in quickly and pass the van before the car gets "
    "there.", "سریع می‌پیچم و پیش از رسیدن آن خودرو از کنار ون رد می‌شوم.",
    "Så kan I mødes ved varevognen uden plads til at komme forbi hinanden.", "Then you may meet at the van with no room to pass each other.",
    "در این صورت ممکن است کنار ون به هم برسید و جایی برای رد شدن نباشد."),
)

Q(5961, "7.13", town("""
THE SCENE: a junction with traffic lights in town; our light is green; we want to turn right; in the street to the right cars are
queuing right up to the junction; across the mouth of that street lie a cycle path and a zebra crossing, and there is no room for a car
between them and the last car in the queue.
MUST BE CLEARLY VISIBLE: the queue in the street to the right, the cycle path and the zebra crossing across its mouth, the green light.
MUST NOT APPEAR: text, readable number plates."""),
  "Du har grønt og vil svinge til højre, men på vejen, du skal ind på, holder bilerne i kø helt hen til fodgængerfeltet. Hvad gør du?",
  "You have a green light and want to turn right, but on the road you are turning into the cars are queuing right up to the pedestrian "
  "crossing. What do you do?",
  "چراغ سبز است و می‌خواهید به راست بپیچید، ولی در جاده‌ای که باید واردش شوید خودروها تا خود گذرگاه عابر پیاده در صف‌اند. چه می‌کنید؟",
  S(True, "Jeg venter før krydset, til der er plads til min bil efter fodgængerfeltet.", "I wait before the junction until there is room for "
    "my car after the pedestrian crossing.", "پیش از تقاطع صبر می‌کنم تا بعد از گذرگاه عابر پیاده برای خودرویم جا باشد.",
    "Du må ikke køre ind, hvis du må standse, så du spærrer for den krydsende færdsel, cyklisterne eller de gående.",
    "You must not drive in if you would have to stop so that you block crossing traffic, cyclists or pedestrians.",
    "اگر مجبور شوید طوری بایستید که راه ترافیک عرضی، دوچرخه‌سواران یا عابران را ببندید، نباید وارد شوید."),
  S(False, "Jeg svinger ind og holder på cykelstien og fodgængerfeltet, til køen kører.", "I turn in and wait on the cycle path and the "
    "pedestrian crossing until the queue moves.", "می‌پیچم و تا راه افتادن صف روی مسیر دوچرخه و گذرگاه عابر می‌ایستم.",
    "Så spærrer du for cyklister og gående, og du skal så vidt muligt undgå at holde i fodgængerfeltet.",
    "Then you block cyclists and pedestrians, and you must avoid stopping on the crossing as far as possible.",
    "در این صورت راه دوچرخه‌سواران و عابران را می‌بندید و باید تا جای ممکن از توقف روی گذرگاه پرهیز کنید."),
  S(False, "Når jeg har grønt, må jeg altid køre ind i krydset.", "When I have green, I may always drive into the junction.",
    "وقتی چراغ سبز است، همیشه می‌توانم وارد تقاطع شوم.",
    "Grønt lys giver ikke lov til at køre ind, hvis du ikke kan komme ud af krydset igen.",
    "A green light does not allow you to drive in if you cannot get out of the junction again.",
    "چراغ سبز اجازه‌ی ورود نمی‌دهد، اگر نتوانید دوباره از تقاطع بیرون بروید."),
)

Q(5962, "7.13", town("""
THE SCENE: a junction with traffic lights in town; we wait at red in our lane and want to turn right; on the cycle path to our right a
small cyclist signal (smaller than ours, with a little bicycle plate above its red lamp) shows green, and several cyclists are starting
to ride straight on; our own signal still shows red.
MUST BE CLEARLY VISIBLE: our red signal, the small cyclist signal showing green, the cyclists riding straight on.
MUST NOT APPEAR: text, readable number plates."""),
  "Du holder for rødt og vil svinge til højre. Det lille signal for cyklisterne skifter til grønt før dit, og cyklisterne kører ligeud. Hvad "
  "gælder?",
  "You are waiting at red and want to turn right. The small signal for cyclists turns green before yours, and the cyclists ride straight "
  "on. What applies?",
  "پشت چراغ قرمز ایستاده‌اید و می‌خواهید به راست بپیچید. چراغ کوچکِ دوچرخه‌سواران پیش از چراغ شما سبز می‌شود و دوچرخه‌سواران مستقیم "
  "می‌روند. چه قاعده‌ای برقرار است؟",
  S(True, "Cyklisterne må køre, selv om jeg stadig har rødt.", "The cyclists may go even though I still have red.",
    "دوچرخه‌سواران می‌توانند بروند، با این‌که چراغ من هنوز قرمز است.",
    "Cyklistsignalet gælder for cyklisterne, og de må køre, når det viser grønt.",
    "The cyclist signal applies to cyclists, and they may go when it shows green.", "چراغ دوچرخه برای دوچرخه‌سواران است و وقتی سبز شود "
    "می‌توانند بروند."),
  S(True, "Når jeg får grønt, skal jeg stadig holde tilbage for cyklister, der kører ligeud.", "When I get green, I must still give way to "
    "cyclists going straight on.", "وقتی چراغ من سبز شد، باز هم باید به دوچرخه‌سوارانی که مستقیم می‌روند راه بدهم.",
    "Ved højresving må du ikke være til ulempe for cyklister, der kører ligeud.",
    "When turning right, you must not get in the way of cyclists going straight on.",
    "هنگام گردش به راست نباید مزاحم دوچرخه‌سوارانی شوید که مستقیم می‌روند."),
  S(False, "Cyklistsignalet gælder også for mig, så jeg må køre nu.", "The cyclist signal also applies to me, so I may go now.",
    "چراغ دوچرخه برای من هم هست، پس الان می‌توانم بروم.",
    "Det gælder kun cyklister og førere af lille knallert, der bruger samme areal som cyklisterne.",
    "It only applies to cyclists and riders of small mopeds using the same area as the cyclists.",
    "فقط برای دوچرخه‌سواران و موپدسوارانی است که از همان مسیرِ دوچرخه‌سواران استفاده می‌کنند."),
  S(False, "Når jeg får grønt, skal cyklisterne holde tilbage for mig.", "When I get green, the cyclists must give way to me.",
    "وقتی چراغ من سبز شد، دوچرخه‌سواران باید به من راه بدهند.",
    "Det er dig, der skal holde tilbage, når du svinger til højre over deres vej.",
    "It is you who must give way when you turn right across their path.", "وقتی به راست از مسیر آن‌ها می‌گذرید، شما باید راه بدهید."),
)

Q(5963, "7.11", view("""
THE SCENE: night; we wait at a row of white triangles painted across our lane at the end of a side road, where it meets a main road
without street lights; far away to the left the headlights of a car approach; much closer, at the edge of the main road on the left, a
cyclist without lights in dark clothes can only just be made out; to the right the road is dark and empty.
MUST BE CLEARLY VISIBLE: the white triangles, the distant headlights on the left, the faint unlit cyclist much closer on the left.
MUST NOT APPEAR: street lights, signs, text.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt. Du holder ved hajtænderne og skal ud på en hovedvej uden gadelys. Langt til venstre ser du lygterne fra en bil. Hvordan "
  "forholder du dig?",
  "It is dark. You are waiting at the give-way line to pull out onto a main road without street lights. Far to the left you see the "
  "headlights of a car. What do you do?",
  "هوا تاریک است. پشت خط دندان‌کوسه‌ای منتظرید تا وارد جاده‌ی اصلیِ بدون چراغ خیابان شوید. خیلی دور در سمت چپ چراغ‌های یک خودرو را "
  "می‌بینید. چه می‌کنید؟",
  S(True, "Jeg bedømmer afstanden og farten forsigtigt, fordi det er svært at gøre i mørke.", "I judge the distance and speed carefully "
    "because that is hard to do in the dark.", "فاصله و سرعت را با احتیاط تخمین می‌زنم، چون در تاریکی دشوار است.",
    "I mørke ser du kun lygterne, og det er svært at vurdere, hvor hurtigt bilen kommer.",
    "In the dark you only see the lights, and it is hard to judge how fast the car is coming.",
    "در تاریکی فقط چراغ‌ها را می‌بینید و تشخیص سرعت آمدن خودرو سخت است."),
  S(True, "Jeg ser grundigt efter cyklister og gående, som kan være svære at se.", "I look carefully for cyclists and pedestrians, who may be "
    "hard to see.", "با دقت به دنبال دوچرخه‌سواران و عابرانی می‌گردم که ممکن است به‌سختی دیده شوند.",
    "En cyklist uden lys eller en gående i mørkt tøj kan være meget tættere på end bilen.",
    "A cyclist without lights or a pedestrian in dark clothes may be much closer than the car.",
    "دوچرخه‌سوار بدون چراغ یا عابری با لباس تیره ممکن است خیلی نزدیک‌تر از آن خودرو باشد."),
  S(True, "Jeg kører først ud, når jeg er sikker på, at det kan ske uden fare.", "I only pull out when I am sure that it can be done without "
    "danger.", "فقط وقتی بیرون می‌روم که مطمئن باشم بی‌خطر است.",
    "Du har ubetinget vigepligt og må kun køre, når det ikke giver fare eller ulempe for andre.",
    "You must give way to all and may only go when it causes no danger or inconvenience to others.",
    "باید به همه راه بدهید و فقط وقتی می‌توانید بروید که برای دیگران خطر یا مزاحمتی ایجاد نشود."),
  S(False, "Ser jeg ingen lygter tæt på, kommer der ingen.", "If I see no lights close by, nobody is coming.", "اگر چراغی در نزدیکی نبینم، "
    "کسی نمی‌آید.",
    "Ikke alle har lys tændt, og gående har sjældent lygter.", "Not everyone has their lights on, and pedestrians rarely carry lights.",
    "همه چراغ روشن ندارند و عابران به‌ندرت چراغ همراه دارند."),
)

Q(5964, "7.14", view("""
THE SCENE: we wait at the end of a side road at a row of white triangles painted across our lane, pointing towards us, where it meets a
main road; we want to turn left onto the main road; on the main road from the RIGHT a car approaches with its LEFT indicator flashing,
about to turn into our side road and pass close in front of our car.
MUST BE CLEARLY VISIBLE: the white triangles across our lane, the car from the right with its flashing left indicator.
MUST NOT APPEAR: text, readable number plates."""),
  "Du holder ved hajtænderne og vil svinge til venstre ud på hovedvejen. Fra højre kommer en bil ad hovedvejen og blinker til venstre for at "
  "svinge ind på din vej. Hvordan forholder du dig?",
  "You are waiting at the give-way line and want to turn left onto the main road. A car is coming along the main road from the right, "
  "indicating left to turn into your road. What do you do?",
  "پشت خط دندان‌کوسه‌ای ایستاده‌اید و می‌خواهید به چپ وارد جاده‌ی اصلی شوید. از سمت راست خودرویی در جاده‌ی اصلی می‌آید و راهنمای چپ "
  "زده تا وارد جاده‌ی شما شود. چه می‌کنید؟",
  S(True, "Jeg lader bilen svinge ind, før jeg selv kører ud.", "I let the car turn in before I pull out myself.",
    "می‌گذارم آن خودرو بپیچد و بعد خودم بیرون می‌روم.",
    "Du har ubetinget vigepligt over for trafikken på hovedvejen, også den, der svinger ind på din vej.",
    "You must give way to the traffic on the main road, also the traffic turning into your road.",
    "شما باید به ترافیک جاده‌ی اصلی، از جمله خودروهایی که وارد جاده‌ی شما می‌شوند، راه بدهید."),
  S(True, "Jeg holder bag hajtænderne, så bilen har plads til at svinge ind.", "I stay behind the give-way line so that the car has room to "
    "turn in.", "پشت خط دندان‌کوسه‌ای می‌مانم تا آن خودرو برای پیچیدن جا داشته باشد.",
    "Holder du for langt fremme, kan bilen få svært ved at komme ind forbi dig.",
    "If you stop too far forward, the car may find it hard to get in past you.", "اگر خیلی جلو بایستید، ممکن است آن خودرو به‌سختی از کنارتان "
    "وارد شود."),
  S(False, "Bilen skal holde tilbage for mig, fordi den svinger til venstre.", "The car must give way to me because it is turning left.",
    "آن خودرو باید به من راه بدهد، چون به چپ می‌پیچد.",
    "Du kommer fra en sidevej med hajtænder og skal holde tilbage for alle på hovedvejen.",
    "You are coming from a side road with give-way lines and must give way to everyone on the main road.",
    "از فرعیِ دارای خط دندان‌کوسه‌ای می‌آیید و باید به همه‌ی کسانی که در جاده‌ی اصلی‌اند راه بدهید."),
  S(False, "Jeg kører ud, mens bilen svinger ind, så vi begge kommer hurtigere afsted.", "I pull out while the car is turning in so that we "
    "both get going faster.", "هم‌زمان با پیچیدن آن خودرو بیرون می‌روم تا هر دو زودتر راه بیفتیم.",
    "Så kører I ind i hinandens vej midt i krydset.", "Then you drive into each other's path in the middle of the junction.",
    "در این صورت وسط تقاطع وارد مسیر یکدیگر می‌شوید."),
)

Q(5965, "7.14", town("""
THE SCENE: a town road with one lane in each direction; on the LEFT side a filling station with a combined entrance and exit across the
pavement; our left indicator is flashing; an oncoming car approaches in the other lane; at the filling station's exit a car waits to
come out.
MUST BE CLEARLY VISIBLE: the filling station on the left, the oncoming car, the car waiting at the station's exit.
MUST NOT APPEAR: brand names, logos, prices, other text, readable number plates."""),
  "Du vil svinge til venstre ind på en tankstation. En bil kommer imod dig, og ved tankstationens udkørsel holder en bil, der vil ud. Hvad "
  "gælder?",
  "You want to turn left into a filling station. A car is coming towards you, and at the filling station's exit a car is waiting to come "
  "out. What applies?",
  "می‌خواهید به چپ وارد پمپ‌بنزینی شوید. خودرویی از روبه‌رو می‌آید و در خروجی پمپ‌بنزین خودرویی منتظر است بیرون بیاید. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg skal lade den modkørende bil passere, før jeg svinger.", "I must let the oncoming car pass before I turn.",
    "باید پیش از پیچیدن بگذارم خودروی روبه‌رو رد شود.",
    "Du må ikke svinge til venstre, før det kan ske uden ulempe for de modkørende.",
    "You must not turn left until you can do so without getting in the way of oncoming traffic.",
    "تا وقتی بدون مزاحمت برای وسایلِ روبه‌رو ممکن نباشد، نباید به چپ بپیچید."),
  S(True, "Bilen, der vil ud fra tankstationen, skal holde tilbage for mig.", "The car that wants to leave the filling station must give way "
    "to me.", "خودرویی که می‌خواهد از پمپ‌بنزین بیرون بیاید باید به من راه بدهد.",
    "Den, der kører ud fra en tankstation, har ubetinget vigepligt.", "Anyone driving out of a filling station must give way to all.",
    "کسی که از پمپ‌بنزین بیرون می‌آید باید به همه راه بدهد."),
  S(False, "Jeg må svinge foran den modkørende, fordi jeg har blinket i god tid.", "I may turn in front of the oncoming car because I have "
    "indicated in good time.", "می‌توانم جلوی خودروی روبه‌رو بپیچم، چون به‌موقع راهنما زده‌ام.",
    "Blinket giver dig ikke ret til at svinge foran de modkørende.", "Indicating does not give you the right to turn in front of oncoming "
    "traffic.", "راهنما به شما حق نمی‌دهد جلوی وسایلِ روبه‌رو بپیچید."),
  S(False, "Når jeg svinger ind på en tankstation, gælder reglerne for svingning ikke.", "When I turn into a filling station, the rules for "
    "turning do not apply.", "وقتی به پمپ‌بنزین می‌پیچم، قواعد گردش برقرار نیست.",
    "Reglerne for svingning gælder også, når du svinger bort fra vejen uden for et kryds.",
    "The rules for turning also apply when you turn off the road away from a junction.",
    "قواعد گردش وقتی خارج از تقاطع از جاده می‌پیچید هم برقرار است."),
)

Q(5966, "7.14", picture("""
A car seen from behind and slightly to the left on a country road, approaching a side road that goes off to the left; the driver's
left arm is stretched straight out horizontally through the open window; the car's indicator lamps are dark.
MUST BE CLEARLY VISIBLE: the driver's arm stretched horizontally out to the left, the side road on the left, the dark indicators.
MUST NOT APPEAR: text, letters or numbers on the number plate, logos."""),
  "Bilens blinklys er gået i stykker, og du skal svinge til venstre ind ad en sidevej. Hvordan giver du tegn?",
  "The car's indicators have broken down, and you are turning left into a side road. How do you signal?",
  "راهنمای خودرو خراب شده و می‌خواهید به چپ وارد فرعی شوید. چگونه علامت می‌دهید؟",
  S(True, "Jeg rækker venstre arm vandret ud til siden.", "I stretch my left arm horizontally out to the side.", "دست چپم را افقی به کنار "
    "دراز می‌کنم.",
    "Tegn til svingning gives med blinklys eller ved at række en arm vandret ud til siden.",
    "A turn is signalled with the indicators or by stretching an arm horizontally out to the side.",
    "گردش با راهنما یا با دراز کردن افقیِ دست به کنار اعلام می‌شود."),
  S(False, "Når blinklyset ikke virker, behøver jeg ikke give tegn.", "When the indicators do not work, I need not signal.",
    "وقتی راهنما کار نمی‌کند، لازم نیست علامت بدهم.",
    "Du skal altid give tegn før svingning.", "You must always signal before turning.", "همیشه باید پیش از گردش علامت بدهید."),
  S(False, "Jeg rækker armen lodret i vejret.", "I raise my arm straight up.", "دستم را عمودی بالا می‌برم.",
    "En arm i vejret betyder, at du vil standse eller sætte farten kraftigt ned.",
    "A raised arm means that you are going to stop or slow down sharply.", "دستِ بالا یعنی می‌خواهید بایستید یا سرعت را به‌شدت کم کنید."),
  S(False, "Jeg tænder havariblinket i stedet.", "I switch on the hazard lights instead.", "به‌جای آن چراغ خطر را روشن می‌کنم.",
    "Havariblinket viser ikke, hvilken vej du vil svinge.", "The hazard lights do not show which way you are going to turn.",
    "چراغ خطر نشان نمی‌دهد به کدام سمت می‌پیچید."),
)

Q(5967, "7.14", view("""
THE SCENE: a junction without traffic lights on a road outside town; we wait near the middle of the road with our left indicator
flashing, to turn left into a side road on the left; an oncoming car is indicating RIGHT to turn into the same side road; just behind
it, at the right edge of the oncoming lane, a cyclist rides straight on; there is no cycle path.
MUST BE CLEARLY VISIBLE: the side road on the left, the oncoming car with its right indicator, the cyclist close behind it.
MUST NOT APPEAR: signs, text, readable number plates."""),
  "Du vil svinge til venstre ind ad en sidevej. En modkørende bil blinker til højre ind ad samme sidevej, og lige bag den kommer en cyklist, "
  "der skal ligeud. Hvordan forholder du dig?",
  "You want to turn left into a side road. An oncoming car is indicating right into the same side road, and right behind it comes a cyclist "
  "who is going straight on. What do you do?",
  "می‌خواهید به چپ وارد فرعی شوید. خودرویی از روبه‌رو برای ورود به همان فرعی راهنمای راست زده و درست پشت سرش دوچرخه‌سواری می‌آید که "
  "می‌خواهد مستقیم برود. چه می‌کنید؟",
  S(True, "Jeg lader den modkørende bil svinge ind først.", "I let the oncoming car turn in first.", "می‌گذارم خودروی روبه‌رو اول بپیچد.",
    "Som venstresvingende skal du holde tilbage for de modkørende, også dem, der svinger til højre.",
    "When turning left you must give way to oncoming traffic, also those turning right.",
    "هنگام گردش به چپ باید به وسایلِ روبه‌رو راه بدهید، از جمله آن‌هایی که به راست می‌پیچند."),
  S(True, "Jeg venter også på cyklisten, fordi han skal ligeud.", "I also wait for the cyclist because he is going straight on.",
    "منتظر دوچرخه‌سوار هم می‌مانم، چون او مستقیم می‌رود.",
    "Cyklisten er også modkørende færdsel, som du skal holde tilbage for.", "The cyclist is also oncoming traffic that you must give way to.",
    "دوچرخه‌سوار هم جزو ترافیک روبه‌روست که باید به آن راه بدهید."),
  S(True, "Jeg ser efter, om der kommer flere bag cyklisten, før jeg svinger.", "I check whether more are coming behind the cyclist before I "
    "turn.", "پیش از پیچیدن نگاه می‌کنم که پشت دوچرخه‌سوار کس دیگری می‌آید یا نه.",
    "Bilen og cyklisten kan skjule andre trafikanter.", "The car and the cyclist may hide other road users.",
    "آن خودرو و دوچرخه‌سوار ممکن است کاربران دیگری را پنهان کنند."),
  S(False, "Så snart bilen er svinget ind, kan jeg svinge med det samme.", "As soon as the car has turned in, I can turn straight away.",
    "به‌محض این‌که آن خودرو پیچید، می‌توانم فوراً بپیچم.",
    "Cyklisten bag bilen skal ligeud og har stadig forret for dig.", "The cyclist behind the car is going straight on and still has priority "
    "over you.", "دوچرخه‌سوارِ پشت خودرو مستقیم می‌رود و هنوز بر شما حق تقدم دارد."),
)

Q(5968, "7.11", view("""
THE SCENE: a country road with a railway level crossing ahead without barriers or lights; at the right before the crossing stands a
red-and-white St Andrew's cross sign for a crossing with more than one track; two tracks cross the road; a train has just passed and is
moving away to the left; the view to the right along the tracks is partly hidden by trees.
MUST BE CLEARLY VISIBLE: the two tracks, the St Andrew's cross sign, the train moving away to the left, the trees to the right.
MUST NOT APPEAR: barriers, signal lights, text."""),
  "Ved en jernbaneoverkørsel uden bomme og lyssignaler er der to spor. Et tog er lige kørt forbi. Hvordan forholder du dig?",
  "At a level crossing without barriers or lights there are two tracks. A train has just gone by. What do you do?",
  "در یک گذرگاه راه‌آهن بدون راه‌بند و چراغ دو خط ریل هست. قطاری همین الان رد شده است. چه می‌کنید؟",
  S(True, "Jeg ser grundigt efter i begge retninger igen, før jeg kører over.", "I look carefully in both directions again before I cross.",
    "پیش از عبور دوباره با دقت به هر دو طرف نگاه می‌کنم.",
    "Der kan komme et tog på det andet spor, måske skjult af det første tog.", "A train may come on the other track, perhaps hidden by the first "
    "train.", "ممکن است قطاری روی خط دیگر بیاید، شاید پشت قطار اول پنهان مانده باشد."),
  S(True, "Jeg kører ikke over, hvis jeg kan se eller høre, at et tog nærmer sig.", "I do not cross if I can see or hear that a train is "
    "approaching.", "اگر ببینم یا بشنوم که قطاری نزدیک می‌شود، رد نمی‌شوم.",
    "Færdsel over jernbaneoverkørsel må ikke ske, når det kan ses eller høres, at tog nærmer sig.",
    "Crossing must not take place when it can be seen or heard that a train is approaching.",
    "وقتی دیده یا شنیده شود که قطاری نزدیک می‌شود، نباید از گذرگاه رد شد."),
  S(False, "Når toget er kørt forbi, er overkørslen fri.", "Once the train has gone by, the crossing is clear.", "وقتی قطار رد شد، گذرگاه آزاد "
    "است.",
    "Med flere spor kan der komme endnu et tog.", "With several tracks another train may come.", "با چند خط ریل، ممکن است قطار دیگری هم بیاید."),
  S(False, "Jeg kører hurtigt over, inden der kommer et nyt tog.", "I drive across quickly before another train comes.",
    "سریع رد می‌شوم پیش از این‌که قطار دیگری بیاید.",
    "Du skal først sikre dig, at der ikke kommer tog, og så køre over uden unødigt ophold.",
    "You must first make sure that no train is coming and then cross without unnecessary delay.",
    "اول باید مطمئن شوید قطاری نمی‌آید و سپس بی‌توقفِ بی‌دلیل رد شوید."),
)

Q(5969, "7.11", view("""
THE SCENE: we wait at the end of a side road at a row of white triangles painted across our lane, pointing towards us, wanting to go
straight across a main road with one lane in each direction; from the LEFT a lorry approaches in the near lane; behind the lorry a
motorcycle is pulling out into the far lane to overtake it; to the right the far lane looks empty.
MUST BE CLEARLY VISIBLE: the lorry from the left, the motorcycle pulling out behind it into the far lane, the empty road to the right.
MUST NOT APPEAR: signs, text, readable number plates."""),
  "Du venter ved hajtænderne og skal ligeud over hovedvejen. Fra venstre kommer en lastbil, og fra højre kommer der ingen. Hvad skal du være "
  "opmærksom på?",
  "You are waiting at the give-way line and are going straight across the main road. A lorry is coming from the left, and nothing is coming "
  "from the right. What must you watch out for?",
  "پشت خط دندان‌کوسه‌ای منتظرید و می‌خواهید مستقیم از جاده‌ی اصلی رد شوید. از سمت چپ کامیونی می‌آید و از سمت راست کسی نمی‌آید. به چه "
  "چیزی باید توجه کنید؟",
  S(True, "Bag lastbilen kan der komme et køretøj, som overhaler den i den fjerneste vognbane.", "Behind the lorry a vehicle may come "
    "overtaking it in the far lane.", "پشت کامیون ممکن است وسیله‌ای بیاید که در خط دورتر از آن سبقت می‌گیرد.",
    "Så kommer der trafik fra venstre i den vognbane, hvor du ellers kun venter trafik fra højre.",
    "Then traffic from the left comes in the lane where you otherwise only expect traffic from the right.",
    "در این صورت ترافیکی از چپ در خطی می‌آید که معمولاً فقط از راستش انتظار ترافیک دارید."),
  S(False, "I den fjerneste vognbane kan der kun komme trafik fra højre.", "In the far lane traffic can only come from the right.",
    "در خط دورتر فقط از سمت راست ترافیک می‌آید.",
    "En overhalende kan komme fra venstre i den vognbane.", "An overtaking vehicle can come from the left in that lane.",
    "وسیله‌ای که سبقت می‌گیرد ممکن است در آن خط از سمت چپ بیاید."),
  S(False, "Når lastbilen er kørt forbi, kan jeg køre uden at se mig for igen.", "Once the lorry has passed, I can go without looking again.",
    "وقتی کامیون رد شد، می‌توانم بدون نگاه دوباره بروم.",
    "Lastbilen kan have skjult andre trafikanter bag sig.", "The lorry may have hidden other road users behind it.",
    "کامیون ممکن است کاربران دیگری را پشت سرش پنهان کرده باشد."),
  S(False, "Jeg skal kun holde tilbage for lastbilen, fordi den er den eneste, jeg kan se.", "I only have to give way to the lorry because it "
    "is the only one I can see.", "فقط باید به کامیون راه بدهم، چون تنها وسیله‌ای است که می‌بینم.",
    "Du skal holde tilbage for al trafik på hovedvejen, også den, du endnu ikke kan se.",
    "You must give way to all traffic on the main road, also traffic you cannot yet see.",
    "باید به همه‌ی ترافیک جاده‌ی اصلی راه بدهید، حتی آن‌هایی که هنوز نمی‌بینید."),
)

Q(5970, "7.11", town("""
THE SCENE: we are at the exit of a narrow lane between high brick walls where it meets a road; the wall on the right hides the view to
the right; on a post on the far side of the road, opposite the exit, hangs a large round convex traffic mirror that shows a stretch of
the road to the right with a small car in it.
MUST BE CLEARLY VISIBLE: the high wall blocking the view to the right, the convex mirror opposite with the small car in it.
MUST NOT APPEAR: signs, road markings, text."""),
  "Du skal ud fra en smal vej, hvor en høj mur skjuler udsynet til højre. Over for udkørslen hænger et trafikspejl. Hvad gælder?",
  "You are pulling out of a narrow road where a high wall hides the view to the right. A traffic mirror hangs opposite the exit. What "
  "applies?",
  "می‌خواهید از جاده‌ای باریک بیرون بیایید که دیوار بلندی دید به راست را گرفته است. روبه‌روی خروجی یک آینه‌ی ترافیکی نصب است. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Spejlet kan hjælpe mig med at se, om der kommer nogen fra højre.", "The mirror can help me see whether anyone is coming from the "
    "right.", "آینه می‌تواند کمکم کند ببینم کسی از راست می‌آید یا نه.",
    "Det viser en del af vejen, som muren skjuler.", "It shows part of the road that the wall hides.",
    "بخشی از جاده را که دیوار پنهان کرده نشان می‌دهد."),
  S(True, "I spejlet kan det være svært at bedømme afstand og fart.", "In the mirror it can be hard to judge distance and speed.",
    "در آینه تشخیص فاصله و سرعت ممکن است سخت باشد.",
    "Et krumt spejl får tingene til at se mindre og længere væk ud, end de er.",
    "A curved mirror makes things look smaller and further away than they are.", "آینه‌ی محدب چیزها را کوچک‌تر و دورتر از آنچه هستند نشان "
    "می‌دهد."),
  S(False, "Når spejlet ikke viser nogen, kan jeg køre ud uden at se mig for.", "When the mirror shows nobody, I can pull out without "
    "looking.", "وقتی آینه کسی را نشان نمی‌دهد، می‌توانم بدون نگاه کردن بیرون بروم.",
    "Spejlet viser ikke det hele; du skal selv se dig for, før du kører ud.", "The mirror does not show everything; you must look yourself "
    "before you pull out.", "آینه همه چیز را نشان نمی‌دهد؛ باید خودتان پیش از بیرون رفتن نگاه کنید."),
  S(False, "Spejlet betyder, at jeg har forkørselsret.", "The mirror means that I have priority.", "آینه یعنی من حق تقدم دارم.",
    "Et spejl ændrer ikke vigepligten.", "A mirror does not change who must give way.", "آینه قاعده‌ی حق تقدم را تغییر نمی‌دهد."),
)

Q(5971, "7.11", view("""
THE SCENE: a country road with a railway level crossing ahead without barriers; red lights flash on the posts beside the red-and-white
St Andrew's cross; a stop line is painted before the crossing; the car in front of us has just driven onto the tracks despite the
flashing lights; no train can be seen.
MUST BE CLEARLY VISIBLE: the flashing red lights, the stop line, the car in front on the tracks.
MUST NOT APPEAR: barriers, a train, text, readable number plates."""),
  "De røde lys ved en jernbaneoverkørsel uden bomme begynder at blinke. Du kan ikke se noget tog, og bilen foran dig kører over. Hvad gør du?",
  "The red lights at a level crossing without barriers start flashing. You cannot see a train, and the car in front of you drives across. "
  "What do you do?",
  "چراغ‌های قرمزِ یک گذرگاه راه‌آهن بدون راه‌بند شروع به چشمک زدن می‌کنند. قطاری نمی‌بینید و خودروی جلوی شما رد می‌شود. چه می‌کنید؟",
  S(True, "Jeg standser før stoplinjen og venter, til lysene holder op med at blinke.", "I stop before the stop line and wait until the "
    "lights stop flashing.", "پیش از خط توقف می‌ایستم و صبر می‌کنم تا چشمک زدن چراغ‌ها تمام شود.",
    "Rødt blinksignal betyder, at du skal standse, også når du ikke kan se toget.",
    "A flashing red signal means that you must stop, even when you cannot see the train.",
    "چراغ قرمز چشمک‌زن یعنی باید بایستید، حتی وقتی قطار را نمی‌بینید."),
  S(False, "Jeg følger efter bilen foran, fordi der ikke er noget tog at se.", "I follow the car in front because there is no train to be "
    "seen.", "دنبال خودروی جلویی می‌روم، چون قطاری دیده نمی‌شود.",
    "Toget kan komme meget hurtigt, og signalet skal følges, uanset hvad andre gør.",
    "The train can arrive very quickly, and the signal must be obeyed whatever others do.",
    "قطار ممکن است خیلی سریع برسد و چراغ باید رعایت شود، هر کاری دیگران بکنند."),
  S(False, "Uden bomme er de røde lys kun en advarsel.", "Without barriers the red lights are only a warning.",
    "بدون راه‌بند، چراغ‌های قرمز فقط هشدارند.",
    "Det røde blinksignal betyder stop, også uden bomme.", "The flashing red signal means stop, also without barriers.",
    "چراغ قرمز چشمک‌زن حتی بدون راه‌بند به معنای ایست است."),
)

Q(5972, "7.15", view("""
THE SCENE: we are driving in a single-lane roundabout; the interior rear-view mirror at the top of the windscreen shows an ambulance
with flashing blue lights close behind us; the next exit is just ahead on the right.
MUST BE CLEARLY VISIBLE: the roundabout, the ambulance with blue lights in the rear-view mirror, the next exit on the right.
MUST NOT APPEAR: signs, text other than plain ambulance markings."""),
  "Du kører i en rundkørsel. Bag dig kommer en ambulance med blå blink og sirene. Hvad gør du?",
  "You are driving in a roundabout. An ambulance with blue lights and siren is coming behind you. What do you do?",
  "در یک میدان در حال حرکتید. آمبولانسی با چراغ آبی و آژیر پشت سرتان می‌آید. چه می‌کنید؟",
  S(True, "Jeg kører ud af rundkørslen og holder ind til siden, så snart det kan ske uden fare.", "I leave the roundabout and pull in to the "
    "side as soon as it can be done safely.", "از میدان خارج می‌شوم و به‌محض این‌که بی‌خطر باشد کنار می‌کشم.",
    "Inde i rundkørslen er der sjældent plads til at lade ambulancen komme forbi; uden for den kan du give fri bane.",
    "Inside the roundabout there is rarely room to let the ambulance pass; outside it you can keep the way clear.",
    "داخل میدان معمولاً جایی برای عبور دادنِ آمبولانس نیست؛ بیرون از آن می‌توانید راه را باز کنید."),
  S(False, "Jeg standser med det samme inde i rundkørslen.", "I stop at once inside the roundabout.", "فوراً داخل میدان می‌ایستم.",
    "Så spærrer du rundkørslen, og ambulancen kan ikke komme forbi.", "Then you block the roundabout, and the ambulance cannot get past.",
    "در این صورت میدان را می‌بندید و آمبولانس نمی‌تواند رد شود."),
  S(False, "Jeg bliver i rundkørslen og kører rundt, til ambulancen er forbi.", "I stay in the roundabout and drive round until the ambulance "
    "has passed.", "در میدان می‌مانم و دور می‌زنم تا آمبولانس رد شود.",
    "Du ved ikke, hvilken vej ambulancen skal, og du kan komme i vejen for den.",
    "You do not know which way the ambulance is going, and you may get in its way.",
    "نمی‌دانید آمبولانس به کدام سمت می‌رود و ممکن است سر راهش قرار بگیرید."),
)

Q(5973, "7.15", view("""
THE SCENE: the entry to a roundabout with a row of white triangles painted across the lane; directly in front of us another car waits
at the triangles; cars circulate in the roundabout from the left, and a gap is coming.
MUST BE CLEARLY VISIBLE: the car waiting in front of us at the triangles, the traffic in the roundabout from the left.
MUST NOT APPEAR: signs, text, readable number plates."""),
  "Du holder bag en anden bil ved indkørslen til en rundkørsel og kigger til venstre efter et hul i trafikken. Hvordan forholder du dig?",
  "You are waiting behind another car at the entry to a roundabout and looking left for a gap in the traffic. What do you do?",
  "در ورودی یک میدان پشت خودروی دیگری منتظرید و به چپ نگاه می‌کنید تا فاصله‌ای در ترافیک پیدا کنید. چه می‌کنید؟",
  S(True, "Før jeg kører frem, ser jeg efter, at bilen foran faktisk er kørt.", "Before I move off, I check that the car in front has actually "
    "gone.", "پیش از حرکت مطمئن می‌شوم که خودروی جلویی واقعاً رفته است.",
    "Bilen foran kan standse igen, fx hvis føreren fortryder.", "The car in front may stop again, for example if the driver changes their mind.",
    "خودروی جلو ممکن است دوباره بایستد، مثلاً اگر راننده‌اش منصرف شود."),
  S(True, "Jeg holder så stor afstand, at jeg kan nå at standse, hvis bilen foran bliver holdende.", "I keep enough distance to be able to "
    "stop if the car in front stays put.", "آن‌قدر فاصله می‌گیرم که اگر خودروی جلو حرکت نکرد بتوانم به‌موقع بایستم.",
    "Den forreste kan blive holdende, mens du kigger til venstre.", "The front car may stay put while you are looking left.",
    "خودروی جلو ممکن است در حالی که شما به چپ نگاه می‌کنید حرکت نکند."),
  S(True, "Jeg ser selv efter trafikken i rundkørslen, når det er min tur.", "I check the traffic in the roundabout myself when it is my "
    "turn.", "وقتی نوبت من شد، خودم ترافیک داخل میدان را نگاه می‌کنم.",
    "Du kan ikke regne med, at det hul, bilen foran brugte, også er der for dig.",
    "You cannot count on the gap the car in front used also being there for you.",
    "نمی‌توانید مطمئن باشید فاصله‌ای که خودروی جلو از آن استفاده کرد برای شما هم هست."),
  S(False, "Jeg holder blikket mod venstre og kører, så snart der er et hul.", "I keep looking left and go as soon as there is a gap.",
    "نگاهم را به چپ نگه می‌دارم و به‌محض پیدا شدن فاصله حرکت می‌کنم.",
    "Så kan du køre op bag i bilen foran, hvis den ikke er kørt.", "Then you may run into the back of the car in front if it has not gone.",
    "در این صورت اگر خودروی جلو حرکت نکرده باشد، ممکن است به پشتش بزنید."),
)

Q(5974, "7.15", view("""
THE SCENE: a large roundabout with two lanes; we drive in the outer (right) lane; a long articulated lorry drives in the inner lane just
beside us and slightly ahead, its trailer close to the line between the lanes as it follows the curve.
MUST BE CLEARLY VISIBLE: the two lanes of the roundabout, the long lorry in the inner lane beside us.
MUST NOT APPEAR: signs, text, logos, readable number plates."""),
  "I en rundkørsel med to vognbaner kører en lang lastbil i den inderste vognbane ved siden af dig. Hvordan forholder du dig?",
  "In a roundabout with two lanes a long lorry is driving in the inner lane beside you. What do you do?",
  "در میدانی با دو خط، کامیونی بلند در خط داخلی کنار شما حرکت می‌کند. چه می‌کنید؟",
  S(True, "Jeg undgår at køre ved siden af lastbilen og lader den hellere komme foran.", "I avoid driving beside the lorry and rather let it "
    "get ahead.", "از رانندگی در کنار کامیون پرهیز می‌کنم و ترجیح می‌دهم جلو بیفتد.",
    "Bagenden af en lang lastbil kan skære ind over din vognbane, og føreren kan have svært ved at se dig.",
    "The rear of a long lorry may cut across your lane, and the driver may find it hard to see you.",
    "انتهای کامیون بلند ممکن است وارد خط شما شود و راننده ممکن است شما را به‌سختی ببیند."),
  S(True, "Jeg er forberedt på, at lastbilen kan skifte over i min vognbane for at køre ud.", "I am prepared for the lorry to move into my "
    "lane to get out.", "آماده‌ام که کامیون برای خروج وارد خط من شود.",
    "Fra den inderste vognbane skal den over i den yderste for at komme ud.", "From the inner lane it must cross the outer lane to get out.",
    "از خط داخلی باید از خط بیرونی عبور کند تا خارج شود."),
  S(False, "Lastbilen skal blive i sin vognbane, så jeg kan roligt køre ved siden af den.", "The lorry must stay in its lane, so I can calmly "
    "drive beside it.", "کامیون باید در خط خودش بماند، پس می‌توانم با خیال راحت کنارش برانم.",
    "En lang lastbil kan ikke altid holde sig inden for sin vognbane i et sving.", "A long lorry cannot always stay within its lane in a "
    "curve.", "کامیون بلند همیشه نمی‌تواند در پیچ داخل خط خودش بماند."),
  S(False, "Jeg giver gas, så jeg kommer forbi lastbilen, inden den kører ud.", "I accelerate to get past the lorry before it leaves.",
    "گاز می‌دهم تا پیش از خروج کامیون از کنارش رد شوم.",
    "Så risikerer du at være lige ved siden af den, når den skifter vognbane.", "Then you risk being right beside it when it changes lane.",
    "در این صورت ممکن است درست وقتی خط عوض می‌کند کنارش باشید."),
)

Q(5975, "7.15", view("""
THE SCENE: we are leaving a roundabout at an exit; a separate cycle path runs around the roundabout and crosses our exit; on the cycle
path, just before it crosses the exit, a row of small white triangles is painted across the path with their points facing the cyclists;
a cyclist approaches on the cycle path from the right.
MUST BE CLEARLY VISIBLE: the cycle path crossing the exit, the white triangles across the cycle path, the cyclist from the right.
MUST NOT APPEAR: signs, text."""),
  "Du kører ud af en rundkørsel. Cykelstien rundt om rundkørslen krydser udkørslen, og på cykelstien er der hajtænder før udkørslen. En "
  "cyklist kommer fra højre. Hvad gælder?",
  "You are leaving a roundabout. The cycle path around the roundabout crosses the exit, and there are give-way triangles on the cycle path "
  "before the exit. A cyclist is coming from the right. What applies?",
  "از میدان خارج می‌شوید. مسیر دوچرخه‌ی دور میدان از خروجی می‌گذرد و روی مسیر دوچرخه پیش از خروجی خط دندان‌کوسه‌ای کشیده شده است. "
  "دوچرخه‌سواری از سمت راست می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Cyklisten skal holde tilbage for mig.", "The cyclist must give way to me.", "دوچرخه‌سوار باید به من راه بدهد.",
    "Hajtænderne giver dem, der kommer fra den side, trekanternes spids vender mod, ubetinget vigepligt.",
    "The triangles mean that those coming from the side the points face must give way to all.",
    "خط دندان‌کوسه‌ای کسانی را که از سمتِ رو به نوک مثلث‌ها می‌آیند موظف به راه دادن به همه می‌کند."),
  S(True, "Jeg er alligevel forberedt på, at cyklisten ikke holder tilbage.", "I am nevertheless prepared for the cyclist not to give way.",
    "با این حال آماده‌ام که دوچرخه‌سوار راه ندهد.",
    "Du skal kunne standse, hvis en anden ikke overholder sin vigepligt.", "You must be able to stop if someone else does not give way.",
    "باید بتوانید بایستید اگر کسی دیگر حق تقدم را رعایت نکرد."),
  S(True, "Jeg kører langsomt ud, så jeg kan nå at standse.", "I drive out slowly so that I can stop in time.", "آهسته خارج می‌شوم تا بتوانم "
    "به‌موقع بایستم.",
    "Lav fart giver dig tid til at reagere, hvis cyklisten kører ud foran dig.", "Low speed gives you time to react if the cyclist rides out "
    "in front of you.", "سرعت کم به شما فرصت واکنش می‌دهد اگر دوچرخه‌سوار جلوی شما بیاید."),
  S(False, "Jeg skal holde tilbage for cyklisten, fordi han kører ligeud.", "I must give way to the cyclist because he is going straight on.",
    "باید به دوچرخه‌سوار راه بدهم، چون او مستقیم می‌رود.",
    "Her har cyklisten hajtænder og dermed ubetinget vigepligt.", "Here the cyclist has give-way triangles and so must give way to all.",
    "این‌جا دوچرخه‌سوار خط دندان‌کوسه‌ای دارد و باید به همه راه بدهد."),
)
