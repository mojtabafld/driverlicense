# «آزمون جدید», batch 1 (5001–5100), part d: the motorway (7.16), safe traffic (6.2), roundabouts (7.15), distance (7.8),
# reversing (7.5), road risks (5.2), other road users (4.5), fitness to drive (4.4), special risks (8.1), large vehicles (3.2),
# road design (5.1), the licence (10.3), play-and-living areas (7.10), tunnels (7.20), driving beside others (7.17).
# Rules: Færdselsloven §§ 4, 7, 15, 18, 21, 22, 26, 27, 29, 31, 41, 43, 46, 53, 54, 55 a; Bekendtgørelse om vejafmærkning
# (E 51); Bekendtgørelse om kørekort (kategori B); Færdselsstyrelsen on medicine; Vejdirektoratet on 2-minus-1 roads.
from nq import Q, S, above, picture, town, view

Q(5076, "7.16", view("""
THE SCENE: a motorway with two lanes in our direction and a hard shoulder on the right. We have just passed an exit: its slip road
branches off to the right and is already a little behind us, visible at the right edge of the picture curving away. Ahead the motorway
continues straight with light traffic.
MUST BE CLEARLY VISIBLE: the passed slip road at the right edge, the hard shoulder, the motorway continuing ahead.
MUST NOT APPEAR: signs, text, vehicles stopped on the hard shoulder."""),
  "Du har lige kørt forbi den frakørsel, du skulle have taget. Hvad gør du?",
  "You have just driven past the exit you should have taken. What do you do?",
  "همین الان از خروجی‌ای که باید می‌گرفتید رد شده‌اید. چه می‌کنید؟",
  S(True, "Jeg kører videre til den næste frakørsel.", "I drive on to the next exit.", "تا خروجی بعدی ادامه می‌دهم.",
    "Du må hverken bakke eller vende på motorvejen; brug den næste frakørsel.", "You may neither reverse nor turn round on the motorway; use the next exit.",
    "در بزرگراه نه می‌توانید دنده‌عقب بروید و نه دور بزنید؛ از خروجی بعدی استفاده کنید."),
  S(False, "Jeg bakker tilbage i nødsporet til frakørslen.", "I reverse back along the hard shoulder to the exit.", "در شانه‌ی اضطراری دنده‌عقب تا خروجی برمی‌گردم.",
    "Det er forbudt at bakke på motorvejen og på dens til- og frakørselsveje.", "Reversing is forbidden on the motorway and on its slip roads.", "دنده‌عقب رفتن در بزرگراه و راه‌های ورودی و خروجی آن ممنوع است."),
  S(False, "Jeg vender gennem en åbning i midterrabatten.", "I turn round through a gap in the central reservation.", "از شکافی در جداکننده‌ی وسط دور می‌زنم.",
    "Kørsel over midterrabatten eller gennem åbninger i den er ikke tilladt.", "Driving over the central reservation or through gaps in it is not allowed.", "رد شدن از روی جداکننده‌ی وسط یا از شکاف‌های آن مجاز نیست."),
  S(False, "Jeg standser i nødsporet og ser på kortet, hvor jeg skal køre.", "I stop on the hard shoulder and look at the map to see where to go.", "در شانه‌ی اضطراری می‌ایستم و روی نقشه نگاه می‌کنم کجا بروم.",
    "På motorvejen må du kun standse på de anviste parkerings- og rastepladser eller ved en nødtelefon for at bruge den.",
    "On the motorway you may only stop at the designated parking and rest areas, or at an emergency phone in order to use it.",
    "در بزرگراه فقط در پارکینگ‌ها و استراحتگاه‌های تعیین‌شده، یا کنار تلفن اضطراری برای استفاده از آن، می‌توانید بایستید."),
)

Q(5077, "7.16", above("""
THE SCENE: a straight motorway seen from above with THREE lanes in our direction (going up the picture), separated by broken lane
lines, a hard shoulder on the right and the central reservation with a crash barrier on the left.
VEHICLES (colour code used strictly): a RED car (ours) towing a small box trailer, the two together clearly longer than a car alone,
in the MIDDLE lane; ahead of it in the middle lane a slower white van; a few grey cars in the left lane further back.
MUST NOT APPEAR: signs, text, numbers."""),
  "Du kører bil med trailer på en motorvej med tre vognbaner i din retning. Vogntoget er over 7 m langt. Hvad gælder?",
  "You are driving a car with a trailer on a motorway with three lanes in your direction. The combination is more than 7 m long. What applies?",
  "با خودرو و تریلر در بزرگراهی با سه خط در جهت خودتان رانندگی می‌کنید. طول مجموعه بیش از ۷ متر است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må kun bruge en af de to vognbaner længst til højre.", "I may only use one of the two lanes furthest to the right.", "فقط می‌توانم از یکی از دو خط سمت راست استفاده کنم.",
    "Vogntog, der er over 7 m lange, må på en motorvej med tre eller flere vognbaner i samme retning kun bruge de to vognbaner længst til højre.",
    "Combinations longer than 7 m may only use the two right-hand lanes on a motorway with three or more lanes in the same direction.",
    "در بزرگراهی با سه خط یا بیشتر در یک جهت، مجموعه‌های بلندتر از ۷ متر فقط می‌توانند از دو خط سمت راست استفاده کنند."),
  S(False, "Jeg må bruge vognbanen længst til venstre, når jeg overhaler varevognen.", "I may use the left-hand lane when I overtake the van.", "وقتی از ون سبقت می‌گیرم، می‌توانم از چپ‌ترین خط استفاده کنم.",
    "Forbuddet gælder også, når du vil overhale; her må du blive bag varevognen.", "The ban applies when you want to overtake too; here you must stay behind the van.", "این ممنوعیت هنگام سبقت هم برقرار است؛ این‌جا باید پشت ون بمانید."),
  S(False, "Reglen om vognbanerne gælder kun for lastbiler.", "The lane rule only applies to lorries.", "قاعده‌ی خط‌ها فقط برای کامیون‌هاست.",
    "Den gælder både biler med en tilladt totalvægt over 3,5 t og vogntog, der er over 7 m lange.", "It applies both to vehicles with a permitted total weight over 3.5 t and to combinations longer than 7 m.",
    "هم برای خودروهای با وزن کل مجاز بالای ۳٫۵ تن و هم برای مجموعه‌های بلندتر از ۷ متر است."),
  S(False, "Med trailer må jeg køre 130 km/t, når vejen er fri.", "With a trailer I may drive at 130 km/h when the road is clear.", "با تریلر وقتی جاده خالی است، می‌توانم ۱۳۰ کیلومتر بر ساعت بروم.",
    "Bil med trailer må højst køre 80 km/t, på motorvej dog 100 km/t, hvis vogntoget opfylder betingelserne for det.",
    "A car with a trailer may drive at most 80 km/h, though 100 km/h on the motorway if the combination meets the conditions for it.",
    "خودرو با تریلر حداکثر ۸۰ کیلومتر بر ساعت می‌تواند برود؛ در بزرگراه اگر مجموعه شرایطش را داشته باشد، ۱۰۰."),
)

Q(5078, "6.2", above("""
THE SCENE: a two-way country road seen from above, one lane in each direction, a broken centre line, with a sharp bend; tall bushes on
the inside of the bend hide the view through it.
VEHICLES AND PEOPLE (colour code used strictly): a RED car (ours) stands at the right edge of its lane just AFTER the bend, its hazard
lights flashing (all four orange corner lights lit). A person in a yellow reflective vest has placed a red-and-white warning triangle at
the right edge of the road BEFORE the bend, far behind the red car, so that traffic coming through the bend sees it in good time. A grey
car approaches the bend from behind, still before the triangle.
MUST NOT APPEAR: signs, text."""),
  "Din bil er gået i stå lige efter et skarpt sving, og du kan ikke flytte den med det samme. Hvad gør du?",
  "Your car has broken down just after a sharp bend, and you cannot move it straight away. What do you do?",
  "خودروی شما درست بعد از یک پیچ تند خراب شده و نمی‌توانید فوراً جابه‌جایش کنید. چه می‌کنید؟",
  S(True, "Jeg tænder havariblinket.", "I switch on the hazard lights.", "چراغ خطر را روشن می‌کنم.",
    "Havariblinket advarer de andre trafikanter om, at bilen holder der.", "The hazard lights warn other road users that the car is standing there.", "چراغ خطر به دیگران هشدار می‌دهد که خودرو آن‌جا ایستاده است."),
  S(True, "Jeg stiller advarselstrekanten op før svinget, så de bagfrakommende bliver advaret i god tid.",
    "I put up the warning triangle before the bend, so that those coming from behind are warned in good time.",
    "مثلث خطر را پیش از پیچ می‌گذارم تا کسانی که از پشت می‌آیند به موقع باخبر شوند.",
    "Trekanten skal stå sådan, at de, der nærmer sig, bliver advaret i god tid; her skjuler svinget bilen.",
    "The triangle must stand so that those approaching are warned in good time; here the bend hides the car.",
    "مثلث باید طوری باشد که نزدیک‌شوندگان به موقع باخبر شوند؛ این‌جا پیچ خودرو را پنهان کرده است."),
  S(False, "Havariblinket er nok, så advarselstrekanten kan blive i bagagerummet.", "The hazard lights are enough, so the warning triangle can stay in the boot.",
    "چراغ خطر کافی است، پس مثلث خطر می‌تواند در صندوق بماند.",
    "En bil, der holder til fare og ikke kan fjernes straks, skal afmærkes med en advarselstrekant.",
    "A car that stands where it is a danger and cannot be removed at once must be marked with a warning triangle.",
    "خودرویی که جای خطرناکی ایستاده و نمی‌شود فوراً جابه‌جایش کرد، باید با مثلث خطر مشخص شود."),
  S(True, "Jeg sørger for at få bilen flyttet hurtigst muligt.", "I make sure the car is moved as quickly as possible.", "ترتیبی می‌دهم که خودرو هر چه زودتر جابه‌جا شود.",
    "Et køretøj, der holder til fare, skal fjernes snarest muligt.", "A vehicle standing where it is a danger must be removed as soon as possible.", "وسیله‌ای که جای خطرناکی ایستاده، باید هر چه زودتر برداشته شود."),
)

Q(5079, "6.2", town("""
THE SCENE: a junction in town controlled by traffic lights; our light shows GREEN. In the middle of the junction stands a police officer
in a dark uniform with a yellow high-visibility vest, facing us, one arm stretched straight out towards us with the palm raised (a clear
stop signal to us). Traffic on the crossing road is moving.
MUST BE CLEARLY VISIBLE: our green light, the police officer's stop signal to us.
MUST NOT APPEAR: text."""),
  "Du har grønt lys, men politibetjenten i krydset giver dig tegn til at standse. Hvad gør du?",
  "You have a green light, but the police officer in the junction signals you to stop. What do you do?",
  "چراغ شما سبز است، ولی مأمور پلیس در تقاطع به شما علامت ایست می‌دهد. چه می‌کنید؟",
  S(True, "Jeg standser, fordi politiets anvisninger går forud for lyssignalet.", "I stop, because the police's directions take precedence over the traffic light.",
    "می‌ایستم، چون دستور پلیس بر چراغ راهنمایی مقدم است.",
    "Trafikanter skal følge politiets anvisninger, og de skal efterkommes forud for lyssignaler, tavler og afmærkning.",
    "Road users must follow the police's directions, and these must be obeyed before traffic lights, signs and markings.",
    "کاربران راه باید از دستور پلیس پیروی کنند و این دستور بر چراغ، تابلو و خط‌کشی مقدم است."),
  S(False, "Jeg kører, fordi jeg har grønt lys.", "I drive on because I have a green light.", "حرکت می‌کنم، چون چراغم سبز است.",
    "Politiets tegn går forud for lyssignalet.", "The police officer's signal takes precedence over the traffic light.", "علامت پلیس بر چراغ راهنمایی مقدم است."),
  S(True, "Politiets anvisninger går også forud for færdselstavler og afmærkning.", "The police's directions also take precedence over road signs and markings.",
    "دستور پلیس بر تابلوها و خط‌کشی‌ها هم مقدم است.",
    "Anvisninger fra politiet skal efterkommes før alle andre anvisninger og før færdselsreglerne.", "Directions from the police must be obeyed before all other directions and before the traffic rules.",
    "دستور پلیس پیش از همه‌ی علائم دیگر و پیش از قوانین عمومی رانندگی باید اجرا شود."),
  S(False, "Jeg skal kun følge betjenten, hvis lyssignalet er slukket.", "I only have to follow the officer if the traffic lights are switched off.", "فقط وقتی چراغ‌ها خاموش‌اند باید از مأمور پیروی کنم.",
    "Politiets anvisninger gælder, uanset hvad lyssignalet viser.", "The police's directions apply whatever the traffic light shows.", "دستور پلیس، هر رنگی که چراغ نشان دهد، معتبر است."),
)

Q(5080, "6.2", view("""
THE SCENE: a two-way country road, one lane in each direction, a broken centre line, a firm grass verge on the right. In the interior
rear-view mirror at the top of the picture an ambulance is visible close behind us, its blue lights flashing (drawn as bright blue
flashes). Ahead the road is clear, with an oncoming car far away.
MUST BE CLEARLY VISIBLE: the ambulance with blue lights in the rear-view mirror, the clear road ahead.
MUST NOT APPEAR: text."""),
  "Bag dig kommer en ambulance med blå blink og sirene. Hvad gør du?",
  "An ambulance with flashing blue lights and siren is coming up behind you. What do you do?",
  "از پشت سر شما آمبولانسی با چراغ آبی چشمک‌زن و آژیر می‌آید. چه می‌کنید؟",
  S(True, "Jeg gør i god tid plads, så ambulancen kan komme forbi.", "I make room in good time so that the ambulance can get past.", "به موقع جا باز می‌کنم تا آمبولانس رد شود.",
    "Andre trafikanter skal i god tid holde vejen åben for et køretøj under udrykning.", "Other road users must keep the road open in good time for a vehicle on an emergency call.",
    "دیگران باید به موقع راه را برای خودروی امدادی در مأموریت باز کنند."),
  S(True, "Jeg kører ind til højre og standser om nødvendigt.", "I pull over to the right and stop if necessary.", "به سمت راست می‌کشم و در صورت لزوم می‌ایستم.",
    "Kørende skal om nødvendigt standse for udrykningskøretøjet.", "Drivers must stop for the emergency vehicle if necessary.", "رانندگان باید در صورت لزوم برای خودروی امدادی بایستند."),
  S(False, "Jeg bremser hårdt og standser midt på vejen.", "I brake hard and stop in the middle of the road.", "محکم ترمز می‌کنم و وسط جاده می‌ایستم.",
    "Midt på vejen spærrer du for ambulancen, og en pludselig opbremsning kan give en påkørsel.", "In the middle of the road you block the ambulance, and sudden braking can cause a collision.",
    "وسط جاده راه آمبولانس را می‌بندید و ترمز ناگهانی ممکن است باعث تصادف شود."),
  S(False, "Jeg øger farten, så ambulancen ikke skal vente på mig.", "I speed up so that the ambulance does not have to wait for me.", "سرعتم را زیاد می‌کنم تا آمبولانس منتظر من نماند.",
    "Du skal give plads, ikke køre om kap med ambulancen.", "You must make room, not race the ambulance.", "باید جا باز کنید، نه این‌که با آمبولانس مسابقه بدهید."),
)

Q(5081, "7.15", above("""
THE SCENE: a single-lane roundabout seen from above with a round grass central island and four roads joining it. At our entry (the road
coming up from the bottom) a give-way sign (a white triangle with a red border, point down) stands on the right and white shark teeth lie
across our lane at the edge of the roundabout. There is no separate cycle path; cyclists ride on the roundabout's carriageway.
VEHICLES AND PEOPLE (colour code used strictly): a RED car (ours) waiting at our entry; a SOLID GREEN arrow shows its way straight on
(into the roundabout, anticlockwise round the island, and out by the opposite road). In the roundabout a white car coming from the left
is about to pass in front of our entry, and a cyclist rides at the outer edge of the roundabout, also coming from the left.
MUST NOT APPEAR: other signs, text."""),
  "Du vil køre ind i rundkørslen og fortsætte ligeud. Hvad gælder?",
  "You want to enter the roundabout and carry straight on. What applies?",
  "می‌خواهید وارد میدان شوید و مستقیم ادامه دهید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg har ubetinget vigepligt for bilen, der allerede kører i rundkørslen.", "I must give way unconditionally to the car already driving in the roundabout.",
    "باید بی‌قیدوشرط به خودرویی که در میدان است راه بدهم.",
    "Vigepligtstavlen og hajtænderne betyder, at du har ubetinget vigepligt for dem, der kører i rundkørslen.",
    "The give-way sign and the shark teeth mean that you must give way unconditionally to those driving in the roundabout.",
    "تابلوی رعایت حق تقدم و دندان‌کوسه یعنی باید بی‌قیدوشرط به کسانی که در میدان‌اند راه بدهید."),
  S(True, "Jeg har også ubetinget vigepligt for cyklisten i rundkørslen.", "I must also give way unconditionally to the cyclist in the roundabout.", "به دوچرخه‌سوار داخل میدان هم باید بی‌قیدوشرط راه بدهم.",
    "Vigepligten gælder alle, der kører i rundkørslen, også cyklister.", "The duty to give way applies to everyone driving in the roundabout, cyclists too.", "وظیفه‌ی راه دادن برای همه‌ی کسانی است که در میدان‌اند، دوچرخه‌سواران هم."),
  S(False, "Bilen i rundkørslen skal holde tilbage for mig, fordi jeg kommer fra højre.", "The car in the roundabout must give way to me because I am coming from the right.",
    "خودروی داخل میدان باید به من راه بدهد، چون از سمت راست می‌آیم.",
    "Højrereglen gælder ikke her, fordi tavlen og hajtænderne giver dig ubetinget vigepligt.", "The right-hand rule does not apply here, because the sign and the shark teeth make you give way unconditionally.",
    "قاعده‌ی دست راست این‌جا اعمال نمی‌شود، چون تابلو و دندان‌کوسه شما را مکلف به راه دادن بی‌قیدوشرط می‌کنند."),
  S(False, "Jeg skal blinke til venstre, når jeg kører ind i rundkørslen.", "I must signal left when I enter the roundabout.", "هنگام ورود به میدان باید راهنمای چپ بزنم.",
    "Skal du ligeud, behøver du ikke blinke, når du kører ind; du blinker til højre, før du kører ud.",
    "If you are going straight on, you need not signal as you enter; you signal right before you leave.",
    "اگر مستقیم می‌روید، لازم نیست هنگام ورود راهنما بزنید؛ پیش از خروج راهنمای راست می‌زنید."),
)

Q(5082, "7.15", above("""
THE SCENE: a single-lane roundabout seen from above with a round grass central island and four roads joining it. There is no separate
cycle path; cyclists ride at the outer edge of the roundabout's carriageway.
VEHICLES AND PEOPLE (colour code used strictly): a RED car (ours) driving anticlockwise in the roundabout, its RIGHT indicator flashing,
about to leave by the next road on its right; a SOLID GREEN arrow shows its way out. On the RIGHT side of the red car, slightly ahead of
it at the outer edge of the roundabout, a cyclist rides on round the island; a short DASHED ORANGE arrow in front of the cyclist shows
that the cyclist continues round, past the exit.
MUST NOT APPEAR: signs, text."""),
  "Du skal ud ved den næste vej. En cyklist i yderkanten af rundkørslen skal videre rundt. Hvordan forholder du dig?",
  "You are leaving at the next road. A cyclist at the outer edge of the roundabout is going further round. What do you do?",
  "می‌خواهید از خیابان بعدی خارج شوید. دوچرخه‌سواری در لبه‌ی بیرونی میدان می‌خواهد دور را ادامه دهد. چه می‌کنید؟",
  S(True, "Jeg giver tegn til højre, før jeg kører ud.", "I signal right before I leave.", "پیش از خروج راهنمای راست می‌زنم.",
    "At køre ud af rundkørslen er et højresving, og du skal give tegn i god tid.", "Leaving the roundabout is a right turn, and you must signal in good time.", "خروج از میدان گردش به راست است و باید به موقع راهنما بزنید."),
  S(True, "Jeg kigger over højre skulder efter cyklister, før jeg kører ud.", "I look over my right shoulder for cyclists before I leave.", "پیش از خروج از روی شانه‌ی راست دوچرخه‌سواران را نگاه می‌کنم.",
    "Cyklister kan være i din blinde vinkel i højre side.", "Cyclists may be in your blind spot on the right.", "دوچرخه‌سواران ممکن است در نقطه‌ی کور سمت راست شما باشند."),
  S(True, "Jeg holder tilbage for cyklisten, der skal videre rundt.", "I give way to the cyclist who is going further round.", "به دوچرخه‌سواری که دور را ادامه می‌دهد راه می‌دهم.",
    "Når du svinger til højre ud af rundkørslen, må du ikke være til ulempe for cyklister, der kører videre.",
    "When you turn right out of the roundabout, you must not inconvenience cyclists who carry on.",
    "وقتی برای خروج از میدان به راست می‌پیچید، نباید مزاحم دوچرخه‌سوارانی شوید که ادامه می‌دهند."),
  S(False, "Cyklisten skal holde tilbage for mig, fordi jeg blinker.", "The cyclist must give way to me because I am signalling.", "دوچرخه‌سوار باید به من راه بدهد، چون راهنما زده‌ام.",
    "Blinklyset giver dig ikke forkørselsret.", "The indicator does not give you the right of way.", "راهنما به شما حق تقدم نمی‌دهد."),
)

Q(5083, "7.8", view("""
THE SCENE: a two-way country road outside town, one lane in each direction, a broken centre line. About 60 m ahead of us drives a
large white lorry. In the left door mirror (at the left edge of the picture) our own small box trailer is visible behind our car, and
behind the trailer a grey car is pulling out towards the centre line as if it wants to overtake.
MUST BE CLEARLY VISIBLE: the lorry ahead with a clear gap to it, our trailer and the overtaking grey car in the door mirror.
MUST NOT APPEAR: signs, text."""),
  "Du kører med trailer uden for byen bag en lastbil. Hvilken afstand holder du til lastbilen?",
  "You are towing a trailer outside town behind a lorry. What distance do you keep to the lorry?",
  "بیرون از شهر با تریلر پشت یک کامیون می‌رانید. چه فاصله‌ای با کامیون نگه می‌دارید؟",
  S(True, "Så stor, at biler, der overhaler mig, uden fare kan komme ind mellem mig og lastbilen.",
    "Large enough that cars overtaking me can pull in safely between me and the lorry.",
    "آن‌قدر که خودروهایی که از من سبقت می‌گیرند، بی‌خطر بتوانند بین من و کامیون جا بگیرند.",
    "Køretøjer med en særlig hastighedsgrænse, fx bil med trailer, skal uden for byen holde så stor afstand til den forankørende, at overhalende kan køre ind imellem.",
    "Vehicles with a special speed limit, such as a car with a trailer, must outside town keep such a distance to the vehicle ahead that overtakers can pull in between.",
    "وسایلی که محدودیت سرعت ویژه دارند، مثل خودرو با تریلر، بیرون از شهر باید آن‌قدر از جلویی فاصله بگیرند که سبقت‌گیرندگان بتوانند بینشان جا بگیرند."),
  S(True, "Så stor, at jeg ikke kører ind i lastbilen, hvis den bremser.", "Large enough that I will not run into the lorry if it brakes.", "آن‌قدر که اگر کامیون ترمز کرد، به آن نخورم.",
    "Afstanden til den forankørende skal være så stor, at der ikke er fare for påkørsel, hvis den standser eller sætter farten ned.",
    "The distance to the vehicle ahead must be such that there is no risk of a collision if it stops or slows down.",
    "فاصله با جلویی باید آن‌قدر باشد که اگر بایستد یا سرعتش را کم کند، خطر تصادف نباشد."),
  S(False, "Jeg lægger mig tæt bag lastbilen, så ingen kan køre ind foran mig.", "I keep close behind the lorry so that nobody can pull in in front of me.",
    "نزدیک پشت کامیون می‌مانم تا کسی نتواند جلوی من بیاید.",
    "Så kan de, der overhaler, ikke komme ind, og du har ikke plads til at bremse.", "Then those overtaking cannot pull in, and you have no room to brake.",
    "این‌طور سبقت‌گیرندگان جا ندارند و خودتان هم جای ترمز ندارید."),
  S(True, "Med trailer må jeg her højst køre 80 km/t.", "With a trailer I may drive at most 80 km/h here.", "با تریلر این‌جا حداکثر می‌توانم ۸۰ کیلومتر بر ساعت بروم.",
    "Bil med trailer må højst køre 80 km/t uden for motorvej.", "A car with a trailer may drive at most 80 km/h off the motorway.", "خودرو با تریلر بیرون از بزرگراه حداکثر ۸۰ کیلومتر بر ساعت می‌تواند برود."),
)

Q(5084, "7.8", view("""
THE SCENE: a two-way country road, one lane in each direction, a broken centre line. In the interior rear-view mirror at the top of the
picture a dark car is visible VERY close behind us (its front fills most of the mirror). About 50 m ahead of us drives a blue car.
MUST BE CLEARLY VISIBLE: the car very close behind in the rear-view mirror, the blue car ahead.
MUST NOT APPEAR: signs, text."""),
  "En bil kører meget tæt bag dig. Hvordan forholder du dig?",
  "A car is driving very close behind you. What do you do?",
  "خودرویی خیلی نزدیک پشت سر شما می‌آید. چه می‌کنید؟",
  S(True, "Jeg holder ekstra god afstand til bilen foran, så jeg kan bremse roligt, hvis det bliver nødvendigt.",
    "I keep an extra good distance to the car ahead so that I can brake gently if it becomes necessary.",
    "فاصله‌ی بیشتری با خودروی جلو نگه می‌دارم تا اگر لازم شد، آرام ترمز کنم.",
    "Når du kan bremse blødt, får bilen bag dig mere tid til at reagere.", "When you can brake smoothly, the car behind you gets more time to react.",
    "وقتی بتوانید نرم ترمز کنید، خودروی پشتی وقت بیشتری برای واکنش دارد."),
  S(False, "Jeg bremser kort for at få bilen bag mig til at holde mere afstand.", "I brake briefly to make the car behind keep more distance.", "کوتاه ترمز می‌کنم تا خودروی پشتی فاصله بگیرد.",
    "Du må ikke bremse brat uden grund; det kan give en påkørsel bagfra.", "You must not brake sharply without reason; it can cause a rear-end collision.", "نباید بی‌دلیل ناگهانی ترمز کنید؛ ممکن است از پشت به شما بزنند."),
  S(False, "Jeg øger farten, så bilen bag mig får mere plads.", "I speed up so that the car behind me gets more room.", "سرعتم را زیاد می‌کنم تا خودروی پشتی جای بیشتری داشته باشد.",
    "Du skal ikke lade dig presse til at køre hurtigere, end det er sikkert og lovligt.", "You must not let yourself be pushed into driving faster than is safe and legal.",
    "نباید بگذارید شما را وادار کنند تندتر از حد ایمن و مجاز برانید."),
  S(False, "Jeg kører ud mod midten af vejen, så bilen ikke kan overhale.", "I move out towards the middle of the road so that the car cannot overtake.", "به سمت وسط جاده می‌روم تا خودرو نتواند سبقت بگیرد.",
    "Du skal holde til højre og gøre det lettere, ikke sværere, at overhale dig.", "You must keep right and make it easier, not harder, to overtake you.", "باید سمت راست بمانید و سبقت گرفتن از خودتان را آسان‌تر کنید، نه سخت‌تر."),
)

Q(5085, "7.5", above("""
THE SCENE: a quiet residential street seen from above: a pavement runs along the street, and a private driveway crosses the pavement
from a house plot at the top of the picture. A tall, thick hedge stands along the plot's edge on both sides of the driveway, right up to
the pavement, hiding the pavement from the driveway.
VEHICLES AND PEOPLE (colour code used strictly): a RED car (ours) in the driveway, facing the house, about to reverse out across the
pavement onto the street; a SOLID GREEN arrow shows its way backwards. On the pavement, hidden from the car by the hedge, a woman walks
with a pram towards the driveway; a grey car drives along the street.
MUST NOT APPEAR: signs, text."""),
  "Du vil bakke ud fra din indkørsel. En høj hæk skjuler fortovet. Hvordan forholder du dig?",
  "You want to reverse out of your driveway. A tall hedge hides the pavement. What do you do?",
  "می‌خواهید با دنده‌عقب از ورودی خانه‌تان بیرون بیایید. پرچین بلندی جلوی دید پیاده‌رو را گرفته است. چه می‌کنید؟",
  S(True, "Jeg bakker meget langsomt og er klar til at standse.", "I reverse very slowly and am ready to stop.", "خیلی آهسته دنده‌عقب می‌روم و آماده‌ی ایستادنم.",
    "Før du bakker, skal du sikre dig, at det kan ske uden fare eller ulempe for andre; når du ikke kan se, må det kun gå meget langsomt.",
    "Before reversing you must make sure it can be done without danger or inconvenience to others; when you cannot see, you may only go very slowly.",
    "پیش از دنده‌عقب باید مطمئن شوید که برای دیگران خطر یا مزاحمتی ندارد؛ وقتی دید ندارید، فقط باید خیلی آهسته بروید."),
  S(True, "Jeg skal holde tilbage for fodgængere på fortovet og for trafikken på vejen.", "I must give way to pedestrians on the pavement and to the traffic on the street.",
    "باید به عابران پیاده‌رو و به ترافیک خیابان راه بدهم.",
    "Når du kører ud fra en ejendom over et fortov, skal du holde tilbage for de gående, og du har ubetinget vigepligt for de kørende.",
    "When you drive out of a property across a pavement, you must give way to pedestrians, and you must give way unconditionally to traffic.",
    "وقتی از یک ملک از روی پیاده‌رو بیرون می‌آیید، باید به عابران راه بدهید و بی‌قیدوشرط به رانندگان هم."),
  S(False, "Bakkameraet viser alt, så jeg behøver ikke se mig omkring.", "The reversing camera shows everything, so I do not need to look around.",
    "دوربین عقب همه‌چیز را نشان می‌دهد، پس لازم نیست اطرافم را نگاه کنم.",
    "Kameraet viser ikke det hele, fx ikke det, der kommer fra siden bag hækken.", "The camera does not show everything, for example not what is coming from the side behind the hedge.",
    "دوربین همه‌چیز را نشان نمی‌دهد، مثلاً آن‌چه از کنار و پشت پرچین می‌آید."),
  S(False, "Fodgængerne skal vente, fordi jeg er i gang med at bakke.", "The pedestrians must wait because I am already reversing.", "عابران باید صبر کنند، چون من دارم دنده‌عقب می‌روم.",
    "Du skal holde tilbage for de gående, når du kører over fortovet.", "You must give way to pedestrians when you drive across the pavement.", "وقتی از روی پیاده‌رو رد می‌شوید، باید به عابران راه بدهید."),
)

Q(5086, "5.2", view("""
THE SCENE: a two-way country road in winter on a cold, clear morning: the road surface is dry and grey, with white frost on the grass
verges and on the bare trees. About 80 m ahead the road crosses a short bridge over a small river; the surface of the bridge has a faint
glossy sheen (thin ice), while the road before it looks dry.
MUST BE CLEARLY VISIBLE: the dry road, the frost on the verges, the bridge with its faintly glossy surface.
MUST NOT APPEAR: signs, text.""", cond="cold, clear winter morning, frost on the verges, dry road"),
  "Det er frostvejr, og vejen har været tør. Nu nærmer du dig en bro. Hvad skal du være opmærksom på?",
  "There is frost, and the road has been dry. Now you are approaching a bridge. What should you be aware of?",
  "هوا یخبندان است و جاده تا این‌جا خشک بوده. حالا به یک پل نزدیک می‌شوید. به چه چیزی باید توجه کنید؟",
  S(True, "Broen kan være glat, selv om resten af vejen ikke er det.", "The bridge may be slippery even if the rest of the road is not.", "پل ممکن است لغزنده باشد، حتی اگر بقیه‌ی جاده نباشد.",
    "En bro køles ned både oven- og nedefra og kan derfor fryse til før resten af vejen.", "A bridge is cooled from both above and below and can therefore freeze before the rest of the road.",
    "پل هم از بالا و هم از پایین سرد می‌شود و برای همین زودتر از بقیه‌ی جاده یخ می‌زند."),
  S(False, "Glatte veje er kun et problem, når der ligger sne.", "Slippery roads are only a problem when there is snow.", "جاده‌ی لغزنده فقط وقتی برف هست مشکل است.",
    "Is kan være næsten usynlig på en vej uden sne.", "Ice can be almost invisible on a road without snow.", "یخ روی جاده‌ی بی‌برف تقریباً دیده نمی‌شود."),
  S(False, "Jeg kan holde samme fart, fordi vejen har været tør.", "I can keep the same speed because the road has been dry.", "می‌توانم با همان سرعت ادامه دهم، چون جاده خشک بوده.",
    "Sænk farten før broen, så du ikke skal bremse eller dreje kraftigt på den.", "Slow down before the bridge so that you do not have to brake or steer hard on it.",
    "پیش از پل سرعت را کم کنید تا مجبور نشوید روی آن محکم ترمز کنید یا فرمان بدهید."),
  S(False, "Broer bliver først glatte længe efter resten af vejen.", "Bridges only become slippery long after the rest of the road.", "پل‌ها خیلی دیرتر از بقیه‌ی جاده لغزنده می‌شوند.",
    "Det er omvendt: broer bliver ofte glatte først.", "It is the other way round: bridges often become slippery first.", "برعکس است: پل‌ها اغلب زودتر لغزنده می‌شوند."),
)

Q(5087, "4.5", town("""
THE SCENE: a residential street in town with cars parked along the right kerb. About 25 m ahead a red ball rolls out onto the road from
between two of the parked cars. No person is visible yet. Houses with small front gardens lie behind the parked cars.
MUST BE CLEARLY VISIBLE: the ball rolling out between the parked cars.
MUST NOT APPEAR: people, signs, text."""),
  "En bold triller ud på vejen mellem to parkerede biler. Hvordan forholder du dig?",
  "A ball rolls out onto the road between two parked cars. What do you do?",
  "توپی از میان دو خودروی پارک‌شده به جاده می‌غلتد. چه می‌کنید؟",
  S(True, "Jeg bremser og er klar til at standse.", "I brake and am ready to stop.", "ترمز می‌کنم و آماده‌ی ایستادنم.",
    "Du skal kunne standse, hvis der pludselig kommer nogen ud på vejen.", "You must be able to stop if someone suddenly comes out onto the road.", "باید بتوانید اگر کسی ناگهان وارد جاده شد، بایستید."),
  S(True, "Der kan komme et barn løbende efter bolden.", "A child may come running after the ball.", "ممکن است کودکی دنبال توپ بدود.",
    "Børn tænker på bolden og ikke på trafikken.", "Children think about the ball, not about the traffic.", "کودکان به توپ فکر می‌کنند، نه به ترافیک."),
  S(True, "Jeg holder øje med, om der er flere børn mellem bilerne.", "I watch out for more children between the cars.", "مراقبم که بچه‌های دیگری میان خودروها نباشند.",
    "Hvor ét barn leger, kan der også være flere.", "Where one child is playing, there may be more.", "جایی که یک کودک بازی می‌کند، ممکن است بچه‌های دیگری هم باشند."),
  S(False, "Jeg dytter og kører videre med samme fart.", "I sound the horn and drive on at the same speed.", "بوق می‌زنم و با همان سرعت ادامه می‌دهم.",
    "Et barn, der løber efter en bold, reagerer måske ikke på hornet.", "A child running after a ball may not react to the horn.", "کودکی که دنبال توپ می‌دود، شاید به بوق واکنشی نشان ندهد."),
)

Q(5088, "4.5", view("""
THE SCENE: a two-way road just outside a village, one lane in each direction. About 30 m ahead a cyclist rides at the right edge of our
lane and holds the LEFT arm stretched straight out to the left side, horizontally. A little further ahead a small side road goes off to
the left.
MUST BE CLEARLY VISIBLE: the cyclist's left arm stretched out horizontally, the side road on the left.
MUST NOT APPEAR: signs, text."""),
  "Cyklisten foran dig rækker venstre arm ud til siden. Hvad betyder det?",
  "The cyclist in front of you holds the left arm out to the side. What does it mean?",
  "دوچرخه‌سوار جلوی شما دست چپش را به پهلو دراز کرده است. یعنی چه؟",
  S(True, "Cyklisten vil svinge til venstre.", "The cyclist is going to turn left.", "دوچرخه‌سوار می‌خواهد به چپ بپیچد.",
    "En arm strakt ud til venstre er cyklistens tegn til at svinge til venstre; vent med at overhale.", "An arm stretched out to the left is the cyclist's signal for turning left; wait before overtaking.",
    "دست دراز به چپ علامت گردش به چپ دوچرخه‌سوار است؛ برای سبقت صبر کنید."),
  S(False, "Cyklisten vil standse.", "The cyclist is going to stop.", "دوچرخه‌سوار می‌خواهد بایستد.",
    "Den udstrakte venstre arm viser et venstresving, ikke en standsning.", "The outstretched left arm shows a left turn, not a stop.", "دست دراز چپ گردش به چپ را نشان می‌دهد، نه ایستادن."),
  S(False, "Cyklisten vil svinge til højre.", "The cyclist is going to turn right.", "دوچرخه‌سوار می‌خواهد به راست بپیچد.",
    "Et højresving vises med højre arm.", "A right turn is shown with the right arm.", "گردش به راست با دست راست نشان داده می‌شود."),
  S(False, "Cyklisten giver mig tegn til at overhale.", "The cyclist is signalling me to overtake.", "دوچرخه‌سوار به من علامت می‌دهد که سبقت بگیرم.",
    "Cyklisten viser, hvad han selv vil gøre; overhal ikke, mens han svinger til venstre.", "The cyclist shows what he himself is going to do; do not overtake while he is turning left.",
    "دوچرخه‌سوار نشان می‌دهد خودش چه می‌خواهد بکند؛ وقتی به چپ می‌پیچد، سبقت نگیرید."),
)

Q(5089, "4.4", picture("""
A simple still life on a plain light background: a set of car keys lying on a table next to a half-full glass of beer and a cup of
coffee. Nothing else.
MUST BE CLEARLY VISIBLE: the car keys, the glass of beer, the cup of coffee.
MUST NOT APPEAR: brand names, text, people."""),
  "Hvad gælder om alkohol og bilkørsel?",
  "What applies to alcohol and driving?",
  "درباره‌ی الکل و رانندگی چه قاعده‌ای برقرار است؟",
  S(True, "De første 3 år efter mit første kørekort til bil må min promille ikke være over 0,2.",
    "For the first 3 years after my first car licence my blood alcohol must not be over 0.2 per mille.",
    "در ۳ سال اول پس از نخستین گواهینامه‌ی خودرو، الکل خونم نباید بیش از ۰٫۲ در هزار باشد.",
    "Siden 1. juli 2025 er grænsen for nye bilister 0,20 promille i blodet (0,10 mg pr. liter udåndingsluft); ellers er den 0,50 promille.",
    "Since 1 July 2025 the limit for new drivers is 0.20 per mille in the blood (0.10 mg per litre of exhaled air); otherwise it is 0.50 per mille.",
    "از ۱ ژوئیه‌ی ۲۰۲۵ حد راننده‌ی تازه‌کار ۰٫۲۰ در هزار در خون (۰٫۱۰ میلی‌گرم در هر لیتر هوای بازدم) است؛ برای بقیه ۰٫۵۰ در هزار."),
  S(True, "Jeg kan straffes, selv om min promille er under grænsen, hvis jeg ikke kan køre fuldt betryggende.",
    "I can be punished even if my blood alcohol is under the limit if I cannot drive in a fully safe manner.",
    "اگر نتوانم کاملاً ایمن رانندگی کنم، حتی با الکل کمتر از حد مجاز هم ممکن است مجازات شوم.",
    "Det er forbudt at køre, når alkohol gør, at du ikke kan føre bilen på fuldt betryggende måde, uanset promillen.",
    "It is forbidden to drive when alcohol means you cannot drive the car in a fully safe manner, whatever the level.",
    "اگر الکل باعث شود نتوانید کاملاً ایمن رانندگی کنید، رانندگی ممنوع است، میزانش هر چه باشد."),
  S(False, "Kaffe og frisk luft får promillen hurtigere ned.", "Coffee and fresh air bring the level down faster.", "قهوه و هوای تازه الکل خون را زودتر پایین می‌آورند.",
    "Kun tiden får promillen ned; kroppen forbrænder alkohol i sit eget tempo.", "Only time brings the level down; the body burns alcohol at its own pace.",
    "فقط زمان الکل خون را پایین می‌آورد؛ بدن الکل را با سرعت خودش می‌سوزاند."),
  S(True, "Alkohol gør min reaktionstid længere.", "Alcohol makes my reaction time longer.", "الکل زمان واکنش مرا طولانی‌تر می‌کند.",
    "Selv lidt alkohol nedsætter din evne til at opfatte og reagere.", "Even a little alcohol reduces your ability to notice and react.", "حتی کمی الکل توانایی شما در دیدن و واکنش را کم می‌کند."),
)

Q(5090, "4.4", picture("""
A simple illustration on a plain light background: a person sitting on a sofa wrapped in a blanket, with a thermometer in the mouth,
looking pale and tired; a set of car keys lies on the low table in front of them.
MUST BE CLEARLY VISIBLE: the sick person, the car keys on the table.
MUST NOT APPEAR: text, brand names."""),
  "Du har høj feber og føler dig sløj, men du skal hente dit barn i børnehaven. Hvad gælder?",
  "You have a high temperature and feel unwell, but you need to pick up your child from the kindergarten. What applies?",
  "تب بالایی دارید و حالتان خوب نیست، ولی باید فرزندتان را از مهدکودک بیاورید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre, hvis jeg på grund af sygdom ikke kan køre på fuldt betryggende måde.",
    "I must not drive if, because of illness, I cannot drive in a fully safe manner.",
    "اگر به خاطر بیماری نتوانم کاملاً ایمن رانندگی کنم، نباید برانم.",
    "Det er forbudt at køre, når sygdom, svækkelse, overanstrengelse eller mangel på søvn gør, at du ikke kan køre fuldt betryggende.",
    "It is forbidden to drive when illness, weakness, exhaustion or lack of sleep means you cannot drive in a fully safe manner.",
    "اگر بیماری، ضعف، خستگی شدید یا کم‌خوابی نگذارد کاملاً ایمن برانید، رانندگی ممنوع است."),
  S(False, "Sygdom har kun betydning, hvis jeg også har drukket alkohol.", "Illness only matters if I have also been drinking alcohol.", "بیماری فقط وقتی مهم است که الکل هم خورده باشم.",
    "Sygdom alene kan gøre det forbudt at køre.", "Illness alone can make it forbidden to drive.", "بیماری به‌تنهایی می‌تواند رانندگی را ممنوع کند."),
  S(False, "Jeg kan godt køre, hvis jeg åbner vinduet og kører langsomt.", "I can drive if I open the window and drive slowly.", "اگر پنجره را باز کنم و آهسته برانم، می‌توانم رانندگی کنم.",
    "Det ændrer ikke på, at du ikke er i stand til at køre sikkert.", "That does not change the fact that you are not fit to drive safely.", "این تغییری در این واقعیت نمی‌دهد که توان رانندگی ایمن ندارید."),
  S(False, "Reglen gælder kun sygdomme, som lægen har skrevet ned.", "The rule only applies to illnesses that the doctor has written down.", "این قاعده فقط درباره‌ی بیماری‌هایی است که پزشک ثبت کرده.",
    "Det afgørende er, hvordan du har det, når du skal køre.", "What matters is how you feel when you are going to drive.", "مهم این است که وقتی می‌خواهید رانندگی کنید، حالتان چطور است."),
)

Q(5091, "8.1", picture("""
A simple illustration on a plain light background of a white medicine box lying flat, seen from slightly above; in one corner of its
front a clear RED warning triangle (a red triangle outline, point up) is printed, and a blister pack of tablets lies next to the box.
MUST BE CLEARLY VISIBLE: the red warning triangle on the box.
MUST NOT APPEAR: brand names, readable text."""),
  "Din medicin har en rød advarselstrekant på pakningen. Hvad gælder?",
  "Your medicine has a red warning triangle on the package. What applies?",
  "روی بسته‌ی داروی شما مثلث هشدار قرمز هست. چه قاعده‌ای برقرار است؟",
  S(True, "Medicinen kan påvirke min evne til at køre bil sikkert.", "The medicine may affect my ability to drive safely.", "این دارو ممکن است توانایی‌ام در رانندگی ایمن را تحت تأثیر قرار دهد.",
    "Den røde trekant bruges på medicin, der kan være trafikfarlig.", "The red triangle is used on medicine that can be dangerous in traffic.", "مثلث قرمز روی داروهایی است که ممکن است در ترافیک خطرناک باشند."),
  S(False, "Jeg må aldrig køre bil, mens jeg tager medicinen.", "I may never drive while I am taking the medicine.", "تا وقتی این دارو را مصرف می‌کنم، هرگز نباید رانندگی کنم.",
    "I nogle tilfælde er det tilladt at køre, når medicinen tages som anvist; det afhænger af, hvordan den påvirker dig.",
    "In some cases driving is allowed when the medicine is taken as directed; it depends on how it affects you.",
    "در برخی موارد اگر دارو طبق دستور مصرف شود، رانندگی مجاز است؛ بستگی دارد چه اثری روی شما بگذارد."),
  S(True, "Jeg spørger min læge, om jeg kan køre bil, mens jeg tager medicinen.", "I ask my doctor whether I can drive while taking the medicine.",
    "از پزشکم می‌پرسم که آیا با مصرف این دارو می‌توانم رانندگی کنم.",
    "Lægen kan vurdere, om medicinen gør det usikkert for dig at køre.", "The doctor can judge whether the medicine makes it unsafe for you to drive.", "پزشک می‌تواند بسنجد که آیا دارو رانندگی را برایتان ناایمن می‌کند."),
  S(False, "Medicin uden rød advarselstrekant kan aldrig påvirke min kørsel.", "Medicine without a red warning triangle can never affect my driving.",
    "دارویی که مثلث قرمز ندارد، هرگز روی رانندگی‌ام اثر نمی‌گذارد.",
    "Trafikfarlig medicin er ofte, men ikke altid, mærket med den røde trekant.", "Medicine that is dangerous in traffic is often, but not always, marked with the red triangle.",
    "داروی خطرناک برای ترافیک اغلب، ولی نه همیشه، با مثلث قرمز مشخص شده است."),
)

Q(5092, "8.1", view("""
THE SCENE: a motorway at dusk, two lanes in our direction, light traffic. On the right verge a blue information sign shows the symbol
for a rest area (a simple white picnic table and a tree, no text), and a slip road leads off to the right to the rest area about 300 m
ahead.
MUST BE CLEARLY VISIBLE: the rest-area sign and the slip road to the rest area.
MUST NOT APPEAR: text, numbers.""", cond="dusk, dry road"),
  "Du kører på motorvejen og bliver meget søvnig. Hvad gør du?",
  "You are driving on the motorway and become very sleepy. What do you do?",
  "در بزرگراه رانندگی می‌کنید و خیلی خواب‌آلود می‌شوید. چه می‌کنید؟",
  S(True, "Jeg kører ind på rastepladsen og holder pause, gerne med en kort lur.", "I pull into the rest area and take a break, preferably with a short nap.",
    "وارد استراحتگاه می‌شوم و استراحت می‌کنم، ترجیحاً با یک چرت کوتاه.",
    "Kun hvile og søvn hjælper mod træthed.", "Only rest and sleep help against tiredness.", "فقط استراحت و خواب در برابر خستگی کمک می‌کند."),
  S(False, "Jeg skruer op for musikken og åbner vinduet, så går det over.", "I turn the music up and open the window, and then it will pass.",
    "صدای موسیقی را بلند می‌کنم و پنجره را باز می‌کنم، خوب می‌شوم.",
    "Det hjælper højst et øjeblik; trætheden forsvinder ikke.", "That helps for a moment at most; the tiredness does not go away.", "این حداکثر برای لحظه‌ای کمک می‌کند؛ خستگی از بین نمی‌رود."),
  S(False, "Jeg drikker en kop kaffe i bilen og kører videre uden pause.", "I drink a cup of coffee in the car and drive on without a break.",
    "در خودرو یک فنجان قهوه می‌خورم و بی‌استراحت ادامه می‌دهم.",
    "Kaffe kan ikke erstatte hvile; du kan stadig falde i søvn bag rattet.", "Coffee cannot replace rest; you may still fall asleep at the wheel.", "قهوه جای استراحت را نمی‌گیرد؛ هنوز ممکن است پشت فرمان خوابتان ببرد."),
  S(False, "Jeg kører hurtigere, så jeg hurtigere er fremme.", "I drive faster so that I arrive sooner.", "تندتر می‌رانم تا زودتر برسم.",
    "Højere fart gør det endnu farligere at være træt.", "Higher speed makes being tired even more dangerous.", "سرعت بیشتر، خستگی را خطرناک‌تر می‌کند."),
)

Q(5093, "8.1", picture("""
The inside of a car seen from the driver's eye position, looking slightly down and forward: the top of the steering wheel at the bottom
of the picture (no hands on it), the passenger seat at the lower right with a smartphone lying on it, its screen lit up by an incoming
call (only a glowing screen with a simple green phone symbol); through the windscreen a red traffic light in town and the back of a grey
car standing in front of us.
MUST BE CLEARLY VISIBLE: the red light ahead, the glowing phone on the passenger seat.
MUST NOT APPEAR: text, numbers, brand names, people."""),
  "Du holder for rødt lys, og din telefon ringer. Hvad gælder?",
  "You are waiting at a red light, and your phone rings. What applies?",
  "پشت چراغ قرمز ایستاده‌اید و تلفنتان زنگ می‌زند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke tage telefonen i hånden og tale i den.", "I must not pick up the phone and talk on it holding it in my hand.", "نباید تلفن را با دست بردارم و صحبت کنم.",
    "Førere må under kørsel ikke bruge håndholdt telefon eller andre håndholdte kommunikationsapparater.",
    "Drivers must not use a hand-held phone or other hand-held communication devices while driving.",
    "رانندگان در حین رانندگی نباید از تلفن یا دیگر وسایل ارتباطی دستی استفاده کنند."),
  S(True, "Forbuddet mod håndholdt telefon gælder også, mens jeg holder for rødt lys.", "The ban on hand-held phones also applies while I am waiting at a red light.",
    "ممنوعیت تلفن دستی وقتی پشت چراغ قرمزم هم برقرار است.",
    "At holde for rødt lys er stadig en del af kørslen.", "Waiting at a red light is still part of driving.", "ایستادن پشت چراغ قرمز هنوز بخشی از رانندگی است."),
  S(True, "Jeg kan ringe tilbage, når jeg har parkeret et sikkert sted.", "I can call back when I have parked in a safe place.", "وقتی جای امنی پارک کردم، می‌توانم تماس بگیرم.",
    "Når du holder parkeret, er du ikke længere under kørsel.", "When you are parked, you are no longer driving.", "وقتی پارک کرده‌اید، دیگر در حال رانندگی نیستید."),
  S(False, "Jeg må godt skrive en sms, når jeg kører langsomt i kø.", "I may write a text message when I am driving slowly in a queue.", "وقتی در ترافیک آهسته می‌رانم، می‌توانم پیامک بنویسم.",
    "Forbuddet gælder al brug af håndholdt telefon under kørsel, også i kø.", "The ban covers all use of a hand-held phone while driving, in queues too.",
    "ممنوعیت شامل هر نوع استفاده از تلفن دستی در حین رانندگی است، در ترافیک هم."),
)

Q(5094, "3.2", above("""
THE SCENE: a junction in town seen from above. Our road comes up from the bottom; a side road goes off to the RIGHT. A cycle path runs
along the right side of our road, separated from it by a kerb, and continues across the mouth of the side road.
VEHICLES AND PEOPLE (colour code used strictly): a long white lorry ahead of us in our lane, its RIGHT indicator flashing, about to turn
right into the side road; to make room for the turn its front has moved slightly out towards the centre line. A RED car (ours) behind
the lorry. A cyclist rides on the cycle path level with the lorry's rear wheels, going straight on.
MUST NOT APPEAR: signs, traffic lights, text."""),
  "Lastbilen foran dig vil svinge til højre. Hvad skal du være opmærksom på?",
  "The lorry in front of you is going to turn right. What should you be aware of?",
  "کامیون جلوی شما می‌خواهد به راست بپیچد. به چه چیزی باید توجه کنید؟",
  S(True, "Lastbilen kan have brug for at trække ud mod venstre for at komme rundt i svinget.", "The lorry may need to move out to the left to get round the turn.",
    "کامیون ممکن است برای پیچیدن لازم داشته باشد اول کمی به چپ بکشد.",
    "Lange køretøjer har brug for meget plads i sving, og baghjulene kører tættere på indersiden af svinget end forhjulene.",
    "Long vehicles need a lot of room in turns, and the rear wheels run closer to the inside of the turn than the front wheels.",
    "وسایل بلند در پیچ جای زیادی لازم دارند و چرخ‌های عقب نزدیک‌تر از چرخ‌های جلو به داخل پیچ حرکت می‌کنند."),
  S(True, "Jeg holder god afstand og kører ikke op i højre side af lastbilen.", "I keep a good distance and do not drive up on the right-hand side of the lorry.",
    "فاصله‌ی خوبی نگه می‌دارم و از سمت راست کامیون جلو نمی‌روم.",
    "I højre side af lastbilen kan du blive klemt, når den svinger.", "On the right-hand side of the lorry you can get squeezed when it turns.", "در سمت راست کامیون ممکن است هنگام پیچیدنش گیر بیفتید."),
  S(False, "Lastbilen kan svinge lige så skarpt som en personbil.", "The lorry can turn as sharply as a car.", "کامیون می‌تواند به تندی یک سواری بپیچد.",
    "En lastbil er lang og har brug for et meget større sving.", "A lorry is long and needs a much wider turn.", "کامیون بلند است و به پیچ خیلی بازتری نیاز دارد."),
  S(True, "Chaufføren kan have svært ved at se cyklisten ved siden af lastbilen.", "The driver may find it hard to see the cyclist beside the lorry.",
    "راننده ممکن است دوچرخه‌سوار کنار کامیون را به‌سختی ببیند.",
    "Lastbiler har store blinde vinkler, især i højre side.", "Lorries have large blind spots, especially on the right-hand side.", "کامیون‌ها نقاط کور بزرگی دارند، به‌خصوص در سمت راست."),
)

Q(5095, "3.2", view("""
THE SCENE: a straight two-way country road, one lane in each direction, a broken centre line. About 30 m ahead of us drives a very long
lorry with a trailer (a long road train) that fills much of the view of the road ahead. The oncoming lane is visible to the left of the
lorry, with an oncoming car far away.
MUST BE CLEARLY VISIBLE: the long lorry with trailer ahead, the oncoming car in the distance.
MUST NOT APPEAR: signs, text."""),
  "Du overvejer at overhale et langt vogntog på landevejen. Hvad gælder?",
  "You are considering overtaking a long lorry combination on a country road. What applies?",
  "در جاده‌ی بیرون شهر به سبقت از یک کامیون با تریلر بلند فکر می‌کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Overhalingen tager længere tid end forbi en personbil, så den modkørende vognbane skal være fri over en længere strækning.",
    "The overtaking takes longer than past a car, so the oncoming lane must be clear over a longer stretch.",
    "سبقت از آن بیشتر از سواری طول می‌کشد، پس خط مقابل باید در مسافت طولانی‌تری خالی باشد.",
    "Jo længere køretøjet er, jo længere tid er du i den modkørende vognbane.", "The longer the vehicle, the longer you are in the oncoming lane.",
    "هر چه وسیله بلندتر باشد، مدت بیشتری در خط مقابل می‌مانید."),
  S(True, "Luftsuget fra vogntoget kan rykke i min bil, når jeg kører forbi.", "The air pressure from the lorry may pull at my car as I pass.",
    "جریان هوای کامیون ممکن است هنگام عبور، خودروی مرا تکان دهد.",
    "Hold godt fast i rattet og god afstand til siden.", "Hold the wheel firmly and keep a good distance to the side.", "فرمان را محکم نگه دارید و از کنار فاصله‌ی خوبی بگیرید."),
  S(False, "Jeg lægger mig helt tæt bag vogntoget, så jeg er klar til at overhale.", "I keep right up close behind the lorry so that I am ready to overtake.",
    "کاملاً نزدیک پشت کامیون می‌مانم تا آماده‌ی سبقت باشم.",
    "Tæt bag vogntoget kan du ikke se forbi det, og chaufføren kan ikke se dig.", "Close behind the lorry you cannot see past it, and the driver cannot see you.",
    "نزدیک پشت کامیون نه شما جلو را می‌بینید، نه راننده شما را."),
  S(False, "Jeg kan regne med, at chaufføren sætter farten ned, når jeg overhaler.", "I can count on the driver slowing down when I overtake.",
    "می‌توانم مطمئن باشم که راننده هنگام سبقت من سرعتش را کم می‌کند.",
    "Du skal selv sikre dig, at overhalingen kan ske uden fare; du kan ikke regne med hjælp fra chaufføren.",
    "You must make sure yourself that the overtaking can be done safely; you cannot count on help from the driver.",
    "خودتان باید مطمئن شوید سبقت بی‌خطر است؛ نمی‌توانید روی کمک راننده حساب کنید."),
)

Q(5096, "5.1", view("""
THE SCENE: a straight, quiet road outside a village laid out as a "2-minus-1" road: one shared driving lane in the middle for cars in
both directions, and on each side a wide edge lane for cyclists, separated from the middle by a broken wide white line (long white
dashes). There is no centre line. About 100 m ahead an oncoming car approaches in the middle; about 40 m ahead a cyclist rides in the
edge lane on our right.
MUST BE CLEARLY VISIBLE: the single middle lane, the two edge lanes with their broken lines, the oncoming car, the cyclist on the right.
MUST NOT APPEAR: signs, text."""),
  "Vejen har én fælles kørebane i midten og kantbaner i begge sider. En bil kommer imod dig. Hvordan forholder du dig?",
  "The road has one shared driving lane in the middle and edge lanes on both sides. A car is coming towards you. What do you do?",
  "جاده یک خط مشترک در وسط و خط‌های کناری در دو طرف دارد. خودرویی از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg kører midt på vejen og trækker kun ud i kantbanen, når der kommer en modkørende bil.",
    "I drive in the middle of the road and only move out into the edge lane when an oncoming car comes.",
    "وسط جاده می‌رانم و فقط وقتی خودرویی از روبه‌رو می‌آید، به خط کناری می‌روم.",
    "På en 2-minus-1-vej kører bilerne i midten; kantbanerne bruges kun til at vige for modkørende.",
    "On a 2-minus-1 road the cars drive in the middle; the edge lanes are only used to make way for oncoming traffic.",
    "در جاده‌ی «۲ منهای ۱» خودروها وسط می‌رانند و از خط‌های کناری فقط برای راه دادن به خودروی روبه‌رو استفاده می‌شود."),
  S(True, "Er cyklisten i kantbanen, når vi mødes, holder jeg tilbage og standser om nødvendigt.",
    "If the cyclist is in the edge lane when we meet, I hold back and stop if necessary.",
    "اگر هنگام برخورد دوچرخه‌سوار در خط کناری باشد، صبر می‌کنم و در صورت لزوم می‌ایستم.",
    "Kantbanen er for cyklister og gående; du må kun trække ud i den, når der er plads.", "The edge lane is for cyclists and pedestrians; you may only move out into it when there is room.",
    "خط کناری مال دوچرخه‌سواران و عابران است؛ فقط وقتی جا هست می‌توانید واردش شوید."),
  S(False, "Jeg kører hele tiden i kantbanen i højre side.", "I drive in the edge lane on the right all the time.", "همیشه در خط کناری سمت راست می‌رانم.",
    "Kantbanen er ikke din vognbane; du kører i midten.", "The edge lane is not your lane; you drive in the middle.", "خط کناری خط شما نیست؛ شما وسط می‌رانید."),
  S(True, "Jeg sænker farten, fordi vejen er smal, og der kan komme modkørende.", "I slow down because the road is narrow and oncoming traffic may come.",
    "سرعتم را کم می‌کنم، چون جاده باریک است و ممکن است خودرویی از روبه‌رو بیاید.",
    "Vejen giver kun plads til én bil ad gangen i midten.", "The road only has room for one car at a time in the middle.", "جاده هر بار فقط برای یک خودرو در وسط جا دارد."),
)

Q(5097, "10.3", picture("""
A simple illustration on a plain light background of a credit-card-sized driving licence card lying next to a car key: the card shows
only a small portrait silhouette and coloured fields without any readable text; beside it a small icon of an ordinary passenger car and
a small icon of a light box trailer.
MUST BE CLEARLY VISIBLE: the licence card, the car icon, the trailer icon.
MUST NOT APPEAR: readable text, numbers, flags."""),
  "Hvad må du med et almindeligt kørekort til kategori B?",
  "What may you do with an ordinary category B driving licence?",
  "با گواهینامه‌ی معمولی رده‌ی B چه کارهایی مجاز است؟",
  S(True, "Køre bil med en tilladt totalvægt på højst 3.500 kg.", "Drive a car with a permitted total weight of at most 3,500 kg.", "رانندگی با خودرویی با وزن کل مجاز حداکثر ۳٬۵۰۰ کیلوگرم.",
    "Kategori B gælder biler med en tilladt totalvægt på højst 3.500 kg.", "Category B covers cars with a permitted total weight of at most 3,500 kg.", "رده‌ی B برای خودروهایی با وزن کل مجاز حداکثر ۳٬۵۰۰ کیلوگرم است."),
  S(True, "Have højst 8 passagerer med ud over mig selv.", "Carry at most 8 passengers besides myself.", "حداکثر ۸ مسافر به‌جز خودم سوار کنم.",
    "Bilen må højst være indrettet til 8 personer ud over føreren.", "The car may be built for at most 8 people besides the driver.", "خودرو حداکثر برای ۸ نفر به‌جز راننده ساخته شده باشد."),
  S(False, "Køre en minibus med 12 passagerer, hvis den vejer under 3.500 kg.", "Drive a minibus with 12 passengers if it weighs under 3,500 kg.",
    "رانندگی مینی‌بوس با ۱۲ مسافر، اگر وزنش کمتر از ۳٬۵۰۰ کیلوگرم باشد.",
    "Med B må du højst have 8 passagerer, uanset vægten.", "With B you may have at most 8 passengers, whatever the weight.", "با B حداکثر ۸ مسافر مجاز است، وزن هر چه باشد."),
  S(False, "Trække en hvilken som helst trailer, så længe bilen er under 3.500 kg.", "Tow any trailer at all as long as the car is under 3,500 kg.",
    "هر تریلری را بکشم، به شرط آن‌که خودرو کمتر از ۳٬۵۰۰ کیلوگرم باشد.",
    "Med B må traileren højst have en tilladt totalvægt på 750 kg, ellers må bil og trailer tilsammen højst veje 3.500 kg.",
    "With B the trailer's permitted total weight may be at most 750 kg; otherwise the car and trailer together may weigh at most 3,500 kg.",
    "با B وزن کل مجاز تریلر حداکثر ۷۵۰ کیلوگرم است؛ وگرنه مجموع خودرو و تریلر حداکثر ۳٬۵۰۰ کیلوگرم."),
)

Q(5098, "7.10", town("""
THE SCENE: the entrance to a residential street in town. On the right stands a blue rectangular sign with white pictograms: a house, an
adult walking, a child playing with a ball and a car, all drawn on one level (the sign for a play-and-living street). Behind the sign the
street has no kerbs: it is paved all over at one level with red bricks, with a few trees and benches; two children play with a ball in
the middle of the street, and some parking bays are marked with white lines at the side.
MUST BE CLEARLY VISIBLE: the blue sign with its pictograms, the children playing, the marked parking bays.
MUST NOT APPEAR: text, other signs."""),
  "Du kører forbi denne tavle ind i et område. Hvad gælder?",
  "You pass this sign into an area. What applies?",
  "از کنار این تابلو وارد یک محدوده می‌شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må kun køre med meget lav hastighed, normalt under 15 km/t.", "I may only drive at a very low speed, normally under 15 km/h.",
    "فقط با سرعت خیلی کم، معمولاً کمتر از ۱۵ کیلومتر بر ساعت، می‌توانم برانم.",
    "I et opholds- og legeområde må der kun køres med meget lav hastighed (normalt under 15 km/t).",
    "In a play-and-living area you may only drive at a very low speed (normally under 15 km/h).",
    "در محدوده‌ی اقامت و بازی فقط با سرعت خیلی کم (معمولاً زیر ۱۵ کیلومتر بر ساعت) می‌توان راند."),
  S(True, "Børn må lege på hele vejens bredde.", "Children may play across the whole width of the street.", "بچه‌ها می‌توانند در تمام عرض خیابان بازی کنند.",
    "Det er tilladt at opholde sig og lege på vejen i hele dens bredde, og de kørende skal holde tilbage for de gående.",
    "It is allowed to stay and play on the road across its whole width, and drivers must give way to pedestrians.",
    "ماندن و بازی در تمام عرض خیابان مجاز است و رانندگان باید به عابران راه بدهند."),
  S(True, "Jeg må kun parkere på de særligt afmærkede pladser.", "I may only park in the specially marked places.", "فقط در جاهای مخصوص علامت‌گذاری‌شده می‌توانم پارک کنم.",
    "Parkering må ikke ske uden for særligt afmærkede pladser.", "Parking must not take place outside specially marked places.", "پارک بیرون از جاهای مخصوص علامت‌گذاری‌شده مجاز نیست."),
  S(True, "Når jeg kører ud af området, har jeg ubetinget vigepligt.", "When I drive out of the area, I must give way unconditionally.", "وقتی از این محدوده بیرون می‌روم، باید بی‌قیدوشرط راه بدهم.",
    "Kørende har ubetinget vigepligt ved udkørsel fra et opholds- og legeområde.", "Drivers must give way unconditionally when leaving a play-and-living area.",
    "رانندگان هنگام خروج از محدوده‌ی اقامت و بازی باید بی‌قیدوشرط راه بدهند."),
)

Q(5099, "7.20", view("""
THE SCENE: a road about to enter a long road tunnel: the tunnel mouth is about 80 m ahead, its inside lit by rows of yellowish lamps
along the ceiling, while bright sunshine lights the road outside. Two lanes in our direction, separated by a broken line.
MUST BE CLEARLY VISIBLE: the tunnel entrance, the lit tunnel inside, the contrast between the bright outside and the darker tunnel.
MUST NOT APPEAR: signs, text, numbers.""", cond="bright sunny day, dry road"),
  "Du skal køre gennem en lang tunnel. Hvad gælder?",
  "You are going to drive through a long tunnel. What applies?",
  "قرار است از یک تونل طولانی عبور کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg tænder nærlyset, inden jeg kører ind i tunnelen.", "I switch on the dipped beam before I drive into the tunnel.", "پیش از ورود به تونل نور پایین را روشن می‌کنم.",
    "I tunnelen skal du kunne se og blive set; nærlyset tænder også baglygterne.", "In the tunnel you must be able to see and be seen; the dipped beam also switches on the rear lights.",
    "در تونل باید ببینید و دیده شوید؛ نور پایین چراغ‌های عقب را هم روشن می‌کند."),
  S(True, "Jeg må ikke standse eller parkere i tunnelen, medmindre jeg er tvunget til det.", "I must not stop or park in the tunnel unless I am forced to.",
    "در تونل نباید توقف یا پارک کنم، مگر ناچار باشم.",
    "Det er forbudt at standse og parkere i en tunnel.", "Stopping and parking in a tunnel are forbidden.", "توقف و پارک در تونل ممنوع است."),
  S(False, "Jeg tager solbrillerne på, fordi lyset i tunnelen blænder.", "I put on my sunglasses because the light in the tunnel dazzles.", "عینک آفتابی می‌زنم، چون نور تونل چشم را می‌زند.",
    "Solbriller gør det sværere at se i tunnelen; tag dem af, før du kører ind.", "Sunglasses make it harder to see in the tunnel; take them off before you go in.",
    "عینک آفتابی دیدن در تونل را سخت‌تر می‌کند؛ پیش از ورود آن را بردارید."),
  S(True, "Går bilen i stå, holder jeg ind til siden, tænder havariblinket og bruger en nødtelefon.",
    "If the car breaks down, I pull in to the side, switch on the hazard lights and use an emergency phone.",
    "اگر خودرو خراب شد، کنار می‌کشم، چراغ خطر را روشن می‌کنم و از تلفن اضطراری استفاده می‌کنم.",
    "Så advarer du de andre, og nødtelefonen viser straks, hvor du er.", "That way you warn the others, and the emergency phone shows at once where you are.",
    "این‌طور به دیگران هشدار می‌دهید و تلفن اضطراری فوراً محل شما را نشان می‌دهد."),
)

Q(5100, "7.17", view("""
THE SCENE: a road with two lanes in our direction, separated by a broken lane line. We drive in the LEFT lane; in the RIGHT lane, just
ahead of us and to our right, drives a large lorry, so that we are level with its rear half. The lorry's left door mirror is far ahead
at its cab, small in the picture.
MUST BE CLEARLY VISIBLE: the lorry beside us in the right lane, its left door mirror far ahead at the cab.
MUST NOT APPEAR: signs, text."""),
  "Du har længe kørt ved siden af en lastbil i vognbanen til højre for dig. Hvordan forholder du dig?",
  "You have been driving for a long time beside a lorry in the lane to your right. What do you do?",
  "مدتی است کنار کامیونی در خط سمت راستتان می‌رانید. چه می‌کنید؟",
  S(True, "Jeg undgår at blive liggende i lastbilens blinde vinkel.", "I avoid staying in the lorry's blind spot.", "از ماندن در نقطه‌ی کور کامیون پرهیز می‌کنم.",
    "Chaufføren kan ikke se dig, og lastbilen kan skifte vognbane ind over dig.", "The driver cannot see you, and the lorry may change lanes into you.",
    "راننده شما را نمی‌بیند و ممکن است کامیون به سمت شما تغییر خط دهد."),
  S(True, "Jeg kører forbi lastbilen eller lægger mig bag den.", "I drive past the lorry or drop back behind it.", "یا از کامیون رد می‌شوم یا پشت سرش قرار می‌گیرم.",
    "Så kan chaufføren se dig i spejlene, eller du er ude af vejen.", "Then the driver can see you in the mirrors, or you are out of the way.",
    "این‌طور راننده شما را در آینه‌ها می‌بیند یا از سر راه کنار رفته‌اید."),
  S(False, "Chaufføren kan altid se mig i sine spejle.", "The driver can always see me in his mirrors.", "راننده همیشه مرا در آینه‌هایش می‌بیند.",
    "Lastbiler har store blinde vinkler, som spejlene ikke dækker.", "Lorries have large blind spots that the mirrors do not cover.", "کامیون‌ها نقاط کور بزرگی دارند که آینه‌ها پوشش نمی‌دهند."),
  S(False, "Jeg bliver ved siden af lastbilen, så chaufføren ved, hvor jeg er.", "I stay beside the lorry so that the driver knows where I am.", "کنار کامیون می‌مانم تا راننده بداند کجا هستم.",
    "Ved siden af lastbilen er netop der, hvor chaufføren kan have svært ved at se dig.", "Beside the lorry is exactly where the driver may find it hard to see you.",
    "درست کنار کامیون جایی است که راننده ممکن است شما را به‌سختی ببیند."),
)
