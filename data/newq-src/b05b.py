# «آزمون جدید», batch 5 (5401–5500), part b: stopping and parking (7.18), overtaking (7.9), signs (6.1), people beside the road
# (7.6), speed (7.3), the car (1.2), straight on at junctions (7.12).
# Rules: Færdselsloven §§ 3 stk. 2, 21 stk. 1 and 3, 23 stk. 1 nr. 3 (no overtaking where the view at a hill or in a bend is
# limited), 26 stk. 3, 27 stk. 7, 28 stk. 2 (outside built-up areas use a car park on the right where possible; at the edge or,
# if possible, outside the carriageway), 28 stk. 3 (not on cycle path, central reserve, islands), 29 stk. 1 nr. 1 (also
# opposite the exit of a cycle path), 32 stk. 2, 41 stk. 1–2, 67 stk. 3; Bekendtgørelse om vejafmærkning (C 12 «Vending
# forbudt» only at that junction, C 22,1 motor vehicles, large mopeds, tractors and motorredskaber banned, D 16 «Valgfri
# passage», D 21 «Cykelsti» for cyclists and small mopeds only, E 68 zone sign, B 11 with S 11); Vejdirektoratet via FDM on
# 2-minus-1 roads.
from nq import Q, S, above, picture, town, view

Q(5426, "7.18", above("""
THE SCENE: a two-way country road seen from above; on each side of the road there is a small car park right beside it, the two
opposite each other.
VEHICLES (colour code used strictly): a RED car (ours) coming up in the right-hand lane; a SOLID GREEN arrow from it into the car
park on the right; a DASHED ORANGE arrow from it across the oncoming lane into the car park on the left.
MUST NOT APPEAR: signs, text."""),
  "Uden for byen er der en lille parkeringsplads på hver side af vejen, lige over for hinanden. Du vil holde pause. Hvad gælder?",
  "Outside town there is a small car park on each side of the road, opposite each other. You want to take a break. What applies?",
  "بیرون شهر در هر طرف جاده یک پارکینگ کوچک روبه‌روی هم هست. می‌خواهید استراحت کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal så vidt muligt bruge parkeringspladsen i højre side.", "As far as possible I must use the car park on the right.",
    "تا جایی که ممکن است باید از پارکینگ سمت راست استفاده کنم.",
    "Uden for tættere bebygget område skal du så vidt muligt bruge en parkeringsplads, der ligger til højre i kørselsretningen.",
    "Outside built-up areas you must, as far as possible, use a car park that lies on the right in your direction of travel.",
    "بیرون از محدوده‌ی شهری باید تا جایی که ممکن است از پارکینگی استفاده کنید که در جهت حرکت شما سمت راست است."),
  S(True, "Når jeg kører ud igen, skal jeg holde tilbage for trafikken på vejen.", "When I drive out again, I must give way to the traffic on the road.",
    "وقتی دوباره بیرون می‌آیم، باید به ترافیک جاده راه بدهم.",
    "Den, der kører ud fra en parkeringsplads, har ubetinget vigepligt.", "Anyone driving out of a car park must give way.",
    "هر کس از پارکینگ بیرون می‌آید باید بی‌قیدوشرط راه بدهد."),
  S(False, "Jeg må frit vælge pladsen til venstre, selv om jeg skal krydse de modkørende.",
    "I may freely choose the car park on the left, even though I have to cross the oncoming traffic.",
    "می‌توانم آزادانه پارکینگ سمت چپ را انتخاب کنم، با این‌که باید از جلوی ترافیک روبه‌رو رد شوم.",
    "Du skal så vidt muligt bruge pladsen i højre side, så du ikke skal krydse de modkørende.",
    "As far as possible you must use the one on the right, so that you do not have to cross the oncoming traffic.",
    "تا جایی که ممکن است باید از پارکینگ سمت راست استفاده کنید تا لازم نباشد از جلوی ترافیک روبه‌رو بگذرید."),
  S(False, "Svinger jeg ind på pladsen til højre, behøver jeg ikke give tegn.", "If I turn into the car park on the right, I do not need to signal.",
    "اگر به پارکینگ سمت راست بپیچم، لازم نیست راهنما بزنم.",
    "Du skal give tegn, før du svinger.", "You must signal before you turn.", "پیش از پیچیدن باید راهنما بزنید."),
)

Q(5427, "7.18", town("""
THE SCENE: the entrance to a town centre. On the right stands a white square sign with a thin black border: in its upper part a blue
square parking sign with a white P, under it a small parking-disc symbol and «2 t», and under that the word «Zone» (the Danish zone
sign, E 68).
MUST BE CLEARLY VISIBLE: the zone sign with the P, the parking-disc symbol, «2 t» and «Zone».
MUST NOT APPEAR: other signs, other text."""),
  "Du kører ind i bymidten forbi denne tavle. Hvad gælder?",
  "You drive into the town centre past this sign. What applies?",
  "از کنار این تابلو وارد مرکز شهر می‌شوید. چه قاعده‌ای برقرار است؟",
  S(True, "I hele området må jeg højst parkere 2 timer, medmindre andet er skiltet.", "In the whole area I may park for 2 hours at most, unless other signs say otherwise.",
    "در کل این منطقه حداکثر ۲ ساعت می‌توانم پارک کنم، مگر این‌که تابلوی دیگری چیز دیگری بگوید.",
    "Zonetavlen viser, at reglerne for de symboler, den viser, gælder i hele området, til zonen ophører.",
    "The zone sign shows that the rules for the symbols on it apply in the whole area until the zone ends.",
    "تابلوی منطقه نشان می‌دهد قواعد نمادهای روی آن در تمام منطقه برقرار است تا وقتی منطقه تمام شود."),
  S(True, "Jeg skal bruge P-skive, når jeg parkerer i området.", "I must use a parking disc when I park in the area.",
    "وقتی در این منطقه پارک می‌کنم، باید از صفحه‌ی ساعت پارک استفاده کنم.",
    "P-skive-symbolet viser, at parkeringstiden skal vises med P-skive.", "The parking-disc symbol shows that the parking time must be shown with a parking disc.",
    "نماد صفحه‌ی ساعت پارک نشان می‌دهد زمان پارک باید با این صفحه مشخص شود."),
  S(False, "Reglen gælder kun på den første gade efter tavlen.", "The rule only applies in the first street after the sign.",
    "این قاعده فقط در اولین خیابان بعد از تابلو برقرار است.",
    "Den gælder i hele zonen, indtil du passerer en tavle for zonens ophør.", "It applies in the whole zone until you pass a sign for the end of the zone.",
    "در تمام منطقه برقرار است تا وقتی از کنار تابلوی پایان منطقه بگذرید."),
  S(False, "Tavlen betyder, at parkering er forbudt i området.", "The sign means that parking is forbidden in the area.",
    "این تابلو یعنی پارک در این منطقه ممنوع است.",
    "Den tillader parkering i højst 2 timer.", "It allows parking for 2 hours at most.", "پارک را حداکثر تا ۲ ساعت مجاز می‌کند."),
)

Q(5428, "7.18", town("""
THE SCENE: a wide town road with two carriageways separated by a grassy central reserve; on the reserve there is a gap among the
bushes where a car could fit.
MUST BE CLEARLY VISIBLE: the grassy central reserve between the carriageways.
MUST NOT APPEAR: signs, text."""),
  "Midt på en bred vej i byen er der en græsklædt midterrabat. Du overvejer at parkere bilen på den. Hvad gælder?",
  "In the middle of a wide road in town there is a grassy central reserve. You are thinking of parking the car on it. What applies?",
  "وسط یک جاده‌ی پهن در شهر یک نوار چمنیِ میانی هست. به این فکر می‌کنید که خودرو را روی آن پارک کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Det er forbudt at standse og parkere på midterrabatten.", "Stopping and parking on the central reserve are forbidden.",
    "توقف و پارک روی نوار میانی ممنوع است.",
    "Standsning og parkering må ikke ske på midterrabat, skillerabat, helleanlæg og lignende.",
    "Stopping and parking must not take place on central reserves, separating verges, traffic islands and the like.",
    "توقف و پارک روی نوار میانی، نوار جداکننده، جزیره‌ی ترافیکی و مانند آن مجاز نیست."),
  S(False, "Det er tilladt, når bilen ikke står i vejen for trafikken.", "It is allowed when the car is not in the way of the traffic.",
    "اگر خودرو سر راه ترافیک نباشد، مجاز است.",
    "Forbuddet gælder, uanset om bilen er i vejen.", "The ban applies whether or not the car is in the way.", "این ممنوعیت برقرار است، چه خودرو سر راه باشد چه نباشد."),
  S(False, "Det er tilladt om natten, når der er lidt trafik.", "It is allowed at night when there is little traffic.", "شب‌ها که ترافیک کم است، مجاز است.",
    "Forbuddet gælder hele døgnet.", "The ban applies round the clock.", "این ممنوعیت در تمام شبانه‌روز برقرار است."),
)

Q(5429, "7.18", view("""
THE SCENE: a two-way country road with no lay-bys; along the right side runs a wide, firm, flat grass verge; there are no signs.
MUST BE CLEARLY VISIBLE: the wide firm verge beside the carriageway.
MUST NOT APPEAR: signs, text."""),
  "Uden for byen vil du holde ind og spise din madpakke. Der er ingen parkeringsplads, men en bred, fast rabat. Hvad gælder?",
  "Outside town you want to pull in and eat your packed lunch. There is no car park, but there is a wide, firm verge. What applies?",
  "بیرون شهر می‌خواهید کنار بکشید و غذایتان را بخورید. پارکینگی نیست، ولی شانه‌ی خاکی پهن و سفتی هست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder så vidt muligt ude på rabatten, uden for kørebanen.", "As far as possible I stand out on the verge, off the carriageway.",
    "تا جایی که ممکن است روی شانه‌ی جاده و بیرون از سواره‌رو می‌ایستم.",
    "Ved standsning og parkering skal køretøjet anbringes ved kørebanens yderkant eller om muligt uden for den.",
    "When stopping or parking, the vehicle must be placed at the outer edge of the carriageway or, if possible, outside it.",
    "هنگام توقف و پارک، خودرو باید کنار لبه‌ی بیرونی سواره‌رو یا در صورت امکان بیرون از آن قرار بگیرد."),
  S(True, "Bilen skal holde på langs af vejen.", "The car must stand lengthwise along the road.", "خودرو باید در امتداد جاده بایستد.",
    "Køretøjet skal anbringes i vejens længderetning.", "The vehicle must be placed lengthwise along the road.", "خودرو باید در امتداد طول جاده قرار بگیرد."),
  S(False, "Jeg holder på kørebanen, så rabatten ikke bliver ødelagt.", "I stand on the carriageway so that the verge is not damaged.",
    "روی سواره‌رو می‌ایستم تا شانه‌ی جاده خراب نشود.",
    "Er det muligt, skal du holde uden for kørebanen; det er også det sikreste.", "If it is possible, you must stand off the carriageway; that is also the safest.",
    "اگر ممکن است، باید بیرون از سواره‌رو بایستید؛ امن‌ترین کار هم همین است."),
  S(False, "Tænder jeg havariblinket, må jeg holde midt på kørebanen.", "If I switch on the hazard lights, I may stand in the middle of the carriageway.",
    "اگر چراغ خطر را روشن کنم، می‌توانم وسط سواره‌رو بایستم.",
    "Havariblinket gør det ikke tilladt at holde, hvor du er til fare.", "The hazard lights do not make it allowed to stand where you are a danger.",
    "چراغ خطر ایستادن در جایی را که خطرناک است مجاز نمی‌کند."),
)

Q(5430, "7.18", town("""
THE SCENE: a town street with one lane in each direction. On the opposite (left) side a cycle path from a park comes out into the
street; on our right side, directly opposite the end of the cycle path, there is a free stretch at the kerb.
MUST BE CLEARLY VISIBLE: the cycle path coming out on the opposite side, the free stretch at our kerb opposite it.
MUST NOT APPEAR: signs, text."""),
  "På den modsatte side af gaden munder en cykelsti fra en park ud. Du vil standse ved kantstenen i din side lige over for stien. Hvad gælder?",
  "On the opposite side of the street a cycle path from a park comes out. You want to stop at the kerb on your side, directly opposite the path. What applies?",
  "در طرف مقابل خیابان یک مسیر دوچرخه از پارک به خیابان می‌رسد. می‌خواهید کنار جدولِ سمت خودتان، درست روبه‌روی این مسیر، بایستید. چه قاعده‌ای برقرار است؟",
  S(True, "Det er forbudt at standse lige over for udmundingen af en cykelsti.", "Stopping directly opposite the end of a cycle path is forbidden.",
    "توقف درست روبه‌روی محل اتصال مسیر دوچرخه به خیابان ممنوع است.",
    "Standsning er forbudt ud for og over for en cykelstis udmunding, så cyklisterne har plads til at komme ud og svinge.",
    "Stopping is forbidden at and opposite the end of a cycle path, so that cyclists have room to come out and turn.",
    "توقف کنار و روبه‌روی محل خروج مسیر دوچرخه ممنوع است تا دوچرخه‌سواران برای بیرون آمدن و پیچیدن جا داشته باشند."),
  S(True, "Jeg kører lidt længere frem og standser et lovligt sted.", "I drive a little further on and stop at a lawful place.",
    "کمی جلوتر می‌روم و جایی مجاز می‌ایستم.",
    "Så spærrer du ikke for cyklister, der kommer ud af stien.", "That way you do not block cyclists coming out of the path.",
    "این‌طور راه دوچرخه‌سوارانی را که از مسیر بیرون می‌آیند نمی‌بندید."),
  S(False, "Det er tilladt, fordi stien ligger i den modsatte side af gaden.", "It is allowed because the path is on the opposite side of the street.",
    "مجاز است، چون مسیر در طرف مقابل خیابان است.",
    "Forbuddet gælder også over for udmundingen.", "The ban also applies opposite the end of the path.", "این ممنوعیت روبه‌روی محل خروج مسیر هم برقرار است."),
  S(False, "Det er tilladt, hvis jeg kun standser for at sætte en passager af.", "It is allowed if I only stop to let a passenger out.",
    "اگر فقط برای پیاده کردن مسافر بایستم، مجاز است.",
    "Det er standsning, der er forbudt her, også en kort standsning.", "It is stopping that is forbidden here, also a short stop.",
    "اینجا توقف ممنوع است، حتی توقف کوتاه."),
)

Q(5431, "7.9", view("""
THE SCENE: a two-lane country road with a broken centre line curving gently to the left through open, flat fields without hedges, so
that the road far beyond the bend can be seen and is empty; a slow tractor drives ahead of us.
MUST BE CLEARLY VISIBLE: the gentle bend with a clear view far ahead, the empty oncoming lane, the tractor.
MUST NOT APPEAR: signs, text."""),
  "Vejen svinger, men der er frit udsyn langt frem, og der kommer ingen. Foran dig kører en langsom traktor. Hvad gælder?",
  "The road bends, but there is a clear view far ahead, and nothing is coming. A slow tractor is in front of you. What applies?",
  "جاده پیچ دارد، ولی دید تا دوردست باز است و کسی نمی‌آید. جلوی شما یک تراکتور کُند می‌رود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må overhale, hvis jeg kan se, at der er fri bane langt nok frem.", "I may overtake if I can see that the road is clear far enough ahead.",
    "اگر ببینم جاده تا فاصله‌ی کافی خالی است، می‌توانم سبقت بگیرم.",
    "Før du overhaler, skal den modsatte vognbane være fri på en tilstrækkelig lang strækning.",
    "Before you overtake, the opposite lane must be clear for a long enough stretch.",
    "پیش از سبقت باید خط مقابل در طول کافی خالی باشد."),
  S(True, "Forbuddet mod at overhale i sving gælder, hvor oversigten er begrænset.", "The ban on overtaking in bends applies where the view is limited.",
    "ممنوعیت سبقت در پیچ جایی برقرار است که دید محدود باشد.",
    "Det er det begrænsede udsyn, der gør overhaling i et sving forbudt.", "It is the limited view that makes overtaking in a bend forbidden.",
    "این محدود بودن دید است که سبقت در پیچ را ممنوع می‌کند."),
  S(False, "Det er altid forbudt at overhale i et sving.", "It is always forbidden to overtake in a bend.", "سبقت در پیچ همیشه ممنوع است.",
    "Det er kun forbudt, hvor oversigten er begrænset.", "It is only forbidden where the view is limited.", "فقط جایی ممنوع است که دید محدود باشد."),
  S(False, "Jeg må overhale i et sving, selv om jeg kun kan se kort frem, hvis jeg skynder mig.",
    "I may overtake in a bend even if I can only see a short way ahead, if I hurry.",
    "حتی اگر فقط فاصله‌ی کوتاهی را ببینم، با عجله می‌توانم در پیچ سبقت بگیرم.",
    "Hvor oversigten er begrænset, er overhaling forbudt.", "Where the view is limited, overtaking is forbidden.", "جایی که دید محدود است، سبقت ممنوع است."),
)

Q(5432, "7.9", view("""
THE SCENE: a two-lane country road with a broken centre line; a slow van drives ahead of us. In the oncoming lane there are no cars,
but about 150 m ahead a cyclist rides towards us at the far edge of the oncoming lane.
MUST BE CLEARLY VISIBLE: the slow van ahead, the oncoming cyclist at the far edge.
MUST NOT APPEAR: signs, text."""),
  "Du vil overhale en langsom varevogn. Der kommer ingen biler imod dig, men længere fremme kommer en cyklist imod dig i den modsatte vejkant. Hvad gælder?",
  "You want to overtake a slow van. No cars are coming towards you, but further ahead a cyclist is coming towards you at the far edge of the road. What applies?",
  "می‌خواهید از یک ون کُند سبقت بگیرید. خودرویی از روبه‌رو نمی‌آید، ولی جلوتر دوچرخه‌سواری در لبه‌ی مقابل جاده به سمت شما می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må kun overhale, hvis jeg kan gøre det uden at komme for tæt på cyklisten.",
    "I may only overtake if I can do it without coming too close to the cyclist.",
    "فقط وقتی می‌توانم سبقت بگیرم که بیش از حد به دوچرخه‌سوار نزدیک نشوم.",
    "Den modsatte vognbane skal være fri for modkørende og andre forhindringer.", "The opposite lane must be clear of oncoming traffic and other obstacles.",
    "خط مقابل باید از ترافیک روبه‌رو و موانع دیگر خالی باشد."),
  S(True, "Cyklisten tæller også som modkørende.", "The cyclist also counts as oncoming traffic.", "دوچرخه‌سوار هم ترافیک روبه‌رو حساب می‌شود.",
    "Overhalingen må ikke bringe nogen i den modsatte vognbane i fare.", "The overtaking must not put anyone in the opposite lane in danger.",
    "سبقت نباید کسی را در خط مقابل به خطر بیندازد."),
  S(False, "Cyklisten kører i vejkanten, så han har ingen betydning for min overhaling.",
    "The cyclist is riding at the edge, so he makes no difference to my overtaking.",
    "دوچرخه‌سوار لبه‌ی جاده می‌راند، پس تأثیری در سبقت من ندارد.",
    "Du kan komme meget tæt på ham, og han kan blive presset ud af vejen.", "You may come very close to him, and he may be forced off the road.",
    "ممکن است خیلی به او نزدیک شوید و او از جاده بیرون رانده شود."),
)

Q(5433, "7.9", view("""
THE SCENE: a narrow road with one shared middle lane for cars in both directions and a broad edge lane on each side, separated from
it by broken lines (a 2-minus-1 road). A slow car drives ahead of us in the middle lane; a cyclist rides in our edge lane further
ahead; an oncoming car can be seen far ahead.
MUST BE CLEARLY VISIBLE: the shared middle lane, the two edge lanes, the slow car, the cyclist, the oncoming car.
MUST NOT APPEAR: signs, text."""),
  "Du kører på en vej med én fælles kørebane i midten og kantbaner i begge sider. Foran dig kører en langsom bil. Hvad gælder for overhaling?",
  "You are on a road with one shared lane in the middle and edge lanes on both sides. A slow car is in front of you. What applies to overtaking?",
  "در جاده‌ای با یک خط مشترک در وسط و خط‌های کناری در دو طرف می‌رانید. جلوی شما خودرویی کُند می‌رود. درباره‌ی سبقت چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må kun overhale, hvis jeg kan se, at der ikke kommer nogen imod mig i den fælles kørebane.",
    "I may only overtake if I can see that nothing is coming towards me in the shared lane.",
    "فقط وقتی می‌توانم سبقت بگیرم که ببینم کسی در خط مشترک از روبه‌رو نمی‌آید.",
    "De modkørende bruger den samme kørebane i midten.", "Oncoming traffic uses the same lane in the middle.", "ترافیک روبه‌رو از همان خط وسط استفاده می‌کند."),
  S(False, "Jeg overhaler i højre kantbane, fordi den er fri.", "I overtake in the right edge lane because it is free.", "در خط کناری راست سبقت می‌گیرم، چون خالی است.",
    "Kantbanen er ikke til overhaling; bilerne bruger den kun, når de skal gøre plads for modkørende.",
    "The edge lane is not for overtaking; cars only use it when they have to make room for oncoming traffic.",
    "خط کناری برای سبقت نیست؛ خودروها فقط وقتی از آن استفاده می‌کنند که باید برای ترافیک روبه‌رو جا باز کنند."),
  S(False, "Kantbanerne er til biler, der vil køre langsomt.", "The edge lanes are for cars that want to drive slowly.", "خط‌های کناری برای خودروهایی است که می‌خواهند آهسته برانند.",
    "Kantbanerne bruges af cyklister og gående og af biler, når de skal vige for modkørende.",
    "The edge lanes are used by cyclists and pedestrians, and by cars when they have to give way to oncoming traffic.",
    "خط‌های کناری را دوچرخه‌سواران و عابران استفاده می‌کنند و خودروها وقتی باید برای ترافیک روبه‌رو کنار بروند."),
  S(False, "Jeg må gerne overhale, når den modkørende bil er langt væk, for den kan bare køre ud i sin kantbane.",
    "I may overtake when the oncoming car is far away, because it can just move out into its edge lane.",
    "وقتی خودروی روبه‌رو دور است، می‌توانم سبقت بگیرم، چون او می‌تواند به خط کناری خودش برود.",
    "Du må ikke regne med, at den modkørende kan vige; der kan være cyklister i kantbanen.",
    "You must not count on the oncoming car being able to give way; there may be cyclists in its edge lane.",
    "نباید روی کنار رفتن خودروی روبه‌رو حساب کنید؛ ممکن است در خط کناری‌اش دوچرخه‌سوار باشد."),
)

Q(5434, "7.9", view("""
THE SCENE: a two-lane country road with a broken centre line; the car ahead of us has its LEFT indicator flashing, but there is no side
road or driveway on the left for a long way, and it keeps driving straight on at a steady speed.
MUST BE CLEARLY VISIBLE: the car ahead with its left indicator flashing, the long stretch without side roads.
MUST NOT APPEAR: signs, text."""),
  "Bilen foran dig har længe haft venstre blinklys tændt, men der er ingen sidevej, og den fortsætter ligeud. Hvordan forholder du dig?",
  "The car in front of you has had its left indicator on for a long time, but there is no side road, and it carries on straight ahead. What do you do?",
  "خودروی جلوی شما مدتی است راهنمای چپ زده، ولی خیابان فرعی‌ای نیست و مستقیم ادامه می‌دهد. چه می‌کنید؟",
  S(True, "Jeg er forsigtig, fordi føreren kan have glemt blinklyset, men også pludselig kan svinge.",
    "I am careful, because the driver may have forgotten the indicator but may also suddenly turn.",
    "محتاطم، چون ممکن است راننده راهنما را فراموش کرده باشد، ولی ممکن است ناگهان هم بپیچد.",
    "Du ved ikke, hvad føreren vil.", "You do not know what the driver intends.", "نمی‌دانید راننده چه می‌خواهد بکند."),
  S(True, "Jeg overhaler først, når jeg er sikker på, hvad bilen foran vil.", "I only overtake once I am sure what the car in front is going to do.",
    "فقط وقتی سبقت می‌گیرم که مطمئن شوم خودروی جلو چه می‌خواهد بکند.",
    "Svinger den til venstre, mens du overhaler i venstre side, kan I støde sammen.", "If it turns left while you overtake on its left, you may collide.",
    "اگر وقتی از سمت چپش سبقت می‌گیرید به چپ بپیچد، ممکن است برخورد کنید."),
  S(False, "Jeg overhaler den i højre side, fordi den blinker til venstre.", "I overtake it on the right because it is signalling left.",
    "از سمت راستش سبقت می‌گیرم، چون راهنمای چپ زده.",
    "Højre side må kun bruges, når bilen tydeligt er ved at svinge til venstre og har trukket ind mod midten.",
    "The right side may only be used when the car is clearly turning left and has moved over towards the middle.",
    "فقط وقتی می‌شود از راست رد شد که خودرو آشکارا در حال گردش به چپ باشد و به سمت وسط رفته باشد."),
  S(False, "Jeg overhaler den hurtigt i venstre side, før den når at svinge.", "I quickly overtake it on the left before it has time to turn.",
    "پیش از این‌که بپیچد، سریع از سمت چپش سبقت می‌گیرم.",
    "Svinger den til venstre, kører du ind i den.", "If it turns left, you will run into it.", "اگر به چپ بپیچد، به آن می‌زنید."),
)

Q(5435, "6.1", town("""
THE SCENE: a road approaching a junction in town; on the right before the junction stands a round white sign with a red border
showing a black U-turn arrow crossed by a red diagonal bar (the Danish no-U-turn sign, C 12).
MUST BE CLEARLY VISIBLE: the no-U-turn sign, the junction.
MUST NOT APPEAR: other signs, text."""),
  "Ved krydset står denne tavle. Hvad betyder den?",
  "This sign stands at the junction. What does it mean?",
  "کنار تقاطع این تابلو قرار دارد. معنی‌اش چیست؟",
  S(True, "Jeg må ikke vende i krydset.", "I must not turn round at the junction.", "نباید در تقاطع دور بزنم.",
    "Tavlen forbyder vending i det kryds eller ved den indkørsel, hvor den står.", "The sign bans turning round at the junction or entrance where it stands.",
    "این تابلو دور زدن را در همان تقاطع یا ورودی‌ای که نصب شده ممنوع می‌کند."),
  S(False, "Tavlen forbyder også venstresving i krydset.", "The sign also bans turning left at the junction.",
    "این تابلو پیچیدن به چپ در تقاطع را هم ممنوع می‌کند.",
    "Tavlen forbyder kun vending; venstresving er tilladt.", "The sign only bans turning round; turning left is allowed.",
    "این تابلو فقط دور زدن را ممنوع می‌کند؛ گردش به چپ مجاز است."),
  S(False, "Forbuddet gælder resten af vejen, indtil en ophørstavle.", "The ban applies for the rest of the road until an end sign.",
    "این ممنوعیت تا تابلوی پایان در بقیه‌ی جاده برقرار است.",
    "Forbuddet gælder kun i det kryds, hvor tavlen står, medmindre en undertavle siger andet.",
    "The ban only applies at the junction where the sign stands, unless a plate says otherwise.",
    "این ممنوعیت فقط در همان تقاطعی است که تابلو نصب شده، مگر زیرتابلو چیز دیگری بگوید."),
  S(False, "Tavlen betyder, at jeg ikke må bakke i krydset, men gerne vende.", "The sign means that I must not reverse at the junction but may turn round.",
    "این تابلو یعنی در تقاطع نباید دنده‌عقب بروم، ولی دور زدن مجاز است.",
    "Det er netop vending, tavlen forbyder.", "It is precisely turning round that the sign bans.", "دقیقاً دور زدن است که این تابلو ممنوع می‌کند."),
)

Q(5436, "6.1", view("""
THE SCENE: the entrance to a road through a park; at the entrance stands the Danish sign C 22,1 in its official design (a round white
sign with a red border showing a black car above a black motorcycle); two cyclists ride along the road.
MUST BE CLEARLY VISIBLE: the round sign with the car and the motorcycle, the cyclists on the road.
MUST NOT APPEAR: other signs, text."""),
  "Ved indkørslen til vejen står denne tavle. Du kører bil. Hvad gælder?",
  "This sign stands at the entrance to the road. You are driving a car. What applies?",
  "در ورودی این راه این تابلو قرار دارد. شما با خودرو هستید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre ind på vejen i bil.", "I must not drive into the road by car.", "نباید با خودرو وارد این راه شوم.",
    "Tavlen forbyder kørsel med motorkøretøj, stor knallert, traktor og motorredskab.",
    "The sign bans motor vehicles, large mopeds, tractors and motor implements.",
    "این تابلو رانندگی با وسیله‌ی موتوری، موتور گازیِ بزرگ، تراکتور و ماشین‌آلات موتوری را ممنوع می‌کند."),
  S(True, "Motorcykler og store knallerter må heller ikke køre ind.", "Motorcycles and large mopeds may not drive in either.",
    "موتورسیکلت و موتور گازیِ بزرگ هم نباید وارد شوند.",
    "Forbuddet gælder alle motorkøretøjer og store knallerter.", "The ban covers all motor vehicles and large mopeds.",
    "این ممنوعیت همه‌ی وسایل موتوری و موتور گازی‌های بزرگ را شامل می‌شود."),
  S(True, "Cyklister må gerne køre ind.", "Cyclists may ride in.", "دوچرخه‌سواران می‌توانند وارد شوند.",
    "Tavlen forbyder ikke cykler.", "The sign does not ban bicycles.", "این تابلو دوچرخه را ممنوع نمی‌کند."),
  S(False, "Jeg må køre ind, hvis jeg kører langsomt.", "I may drive in if I drive slowly.", "اگر آهسته برانم، می‌توانم وارد شوم.",
    "Forbuddet gælder uanset farten.", "The ban applies whatever the speed.", "این ممنوعیت با هر سرعتی برقرار است."),
)

Q(5437, "6.1", town("""
THE SCENE: a road in town where both lanes go our way; in the middle of the carriageway lies a small raised traffic island, and on it
stands a round blue sign with two white arrows pointing diagonally down, one to the left and one to the right (the Danish sign for
passing on either side, D 16).
MUST BE CLEARLY VISIBLE: the traffic island, the blue sign with its two arrows.
MUST NOT APPEAR: other signs, text."""),
  "Midt på kørebanen ligger en helle med denne blå tavle. Hvad betyder den?",
  "In the middle of the carriageway there is a traffic island with this blue sign. What does it mean?",
  "وسط سواره‌رو جزیره‌ای با این تابلوی آبی هست. معنی‌اش چیست؟",
  S(True, "Jeg må køre forbi tavlen i begge sider.", "I may pass the sign on either side.", "می‌توانم از هر دو طرف این تابلو رد شوم.",
    "Tavlen angiver, at motorkøretøjer og store knallerter kan passere den på begge sider.",
    "The sign shows that motor vehicles and large mopeds may pass it on either side.",
    "این تابلو نشان می‌دهد وسایل موتوری و موتور گازی‌های بزرگ می‌توانند از هر دو طرفش رد شوند."),
  S(False, "Jeg skal køre forbi i højre side.", "I must pass on the right side.", "باید از سمت راست رد شوم.",
    "Tavlen tillader passage i begge sider.", "The sign allows passing on either side.", "این تابلو عبور از هر دو طرف را مجاز می‌کند."),
  S(False, "Tavlen betyder, at jeg skal svinge lige efter hellen.", "The sign means that I must turn just after the island.",
    "این تابلو یعنی باید درست بعد از جزیره بپیچم.",
    "Den handler kun om, hvilken side du må passere tavlen.", "It is only about which side you may pass the sign.",
    "فقط درباره‌ی این است که از کدام طرف تابلو می‌توانید رد شوید."),
)

Q(5438, "6.1", view("""
THE SCENE: a road with a separate path beside it on the right, separated by a grass strip; at the start of the path stands a round
blue sign with a white bicycle (the Danish cycle-path sign, D 21); a cyclist rides on the path.
MUST BE CLEARLY VISIBLE: the blue cycle-path sign, the separate path.
MUST NOT APPEAR: other signs, text."""),
  "Langs vejen er der en sti med denne tavle. Hvad gælder?",
  "Along the road there is a path with this sign. What applies?",
  "کنار جاده مسیری با این تابلو هست. چه قاعده‌ای برقرار است؟",
  S(True, "Stien skal bruges af cyklister og førere af lille knallert.", "The path must be used by cyclists and riders of small mopeds.",
    "دوچرخه‌سواران و رانندگان موتور گازیِ کوچک باید از این مسیر استفاده کنند.",
    "Tavlen angiver en bane, som skal benyttes af cyklister og førere af lille knallert.",
    "The sign shows a track that must be used by cyclists and riders of small mopeds.",
    "این تابلو مسیری را نشان می‌دهد که دوچرخه‌سواران و رانندگان موتور گازیِ کوچک باید از آن استفاده کنند."),
  S(False, "Jeg må køre på stien i bil for at komme uden om en kø.", "I may drive on the path by car to get round a queue.",
    "می‌توانم برای دور زدن صف با خودرو روی این مسیر برانم.",
    "Stien må kun benyttes af cyklister og førere af lille knallert.", "The path may only be used by cyclists and riders of small mopeds.",
    "فقط دوچرخه‌سواران و رانندگان موتور گازیِ کوچک می‌توانند از این مسیر استفاده کنند."),
  S(False, "Store knallerter må også køre på stien.", "Large mopeds may also ride on the path.", "موتور گازی‌های بزرگ هم می‌توانند روی این مسیر برانند.",
    "Stien er kun for cyklister og førere af lille knallert.", "The path is only for cyclists and riders of small mopeds.",
    "این مسیر فقط برای دوچرخه‌سواران و رانندگان موتور گازیِ کوچک است."),
  S(True, "Jeg må ikke standse eller parkere på stien.", "I must not stop or park on the path.", "نباید روی این مسیر توقف یا پارک کنم.",
    "Standsning og parkering på cykelsti er forbudt.", "Stopping and parking on a cycle path are forbidden.", "توقف و پارک روی مسیر دوچرخه ممنوع است."),
)

Q(5439, "7.6", town("""
THE SCENE: a town street with one lane in each direction. About 25 m ahead there is a zebra crossing with the Danish crossing sign;
just before the crossing on the right a tall van is parked at the kerb, hiding the pavement at the crossing.
MUST BE CLEARLY VISIBLE: the zebra crossing, the tall van just before it hiding the pavement.
MUST NOT APPEAR: pedestrians, other text."""),
  "Lige før et fodgængerfelt holder en høj varevogn parkeret, så du ikke kan se fortovet ved feltet. Hvordan forholder du dig?",
  "Just before a pedestrian crossing a tall van is parked, so that you cannot see the pavement at the crossing. What do you do?",
  "درست پیش از گذرگاه عابر پیاده یک ون بلند پارک شده و پیاده‌روی کنار گذرگاه را نمی‌بینید. چه می‌کنید؟",
  S(True, "Jeg sænker farten, så jeg kan standse, hvis en gående træder ud bag varevognen.",
    "I slow down so that I can stop if a pedestrian steps out from behind the van.",
    "سرعتم را کم می‌کنم تا اگر عابری از پشت ون بیرون آمد، بتوانم بایستم.",
    "Før et fodgængerfelt skal du holde en passende lav hastighed og kunne standse for gående, der er på vej ud.",
    "Before a pedestrian crossing you must keep a suitably low speed and be able to stop for pedestrians about to step out.",
    "پیش از گذرگاه عابر پیاده باید سرعت مناسبِ کمی داشته باشید و بتوانید برای عابرانی که می‌خواهند وارد شوند بایستید."),
  S(True, "En gående kan være skjult bag varevognen.", "A pedestrian may be hidden behind the van.", "ممکن است عابری پشت ون پنهان باشد.",
    "Varevognen skjuler dem, der står ved feltet.", "The van hides those standing at the crossing.", "ون کسانی را که کنار گذرگاه ایستاده‌اند پنهان می‌کند."),
  S(True, "Jeg er særligt opmærksom på børn, som slet ikke kan ses bag varevognen.", "I am particularly alert to children, who cannot be seen at all behind the van.",
    "به‌ویژه مراقب کودکانم که پشت ون اصلاً دیده نمی‌شوند.",
    "Små børn er helt skjult bag en høj bil.", "Small children are completely hidden behind a tall vehicle.", "کودکان کوچک پشت یک خودروی بلند کاملاً پنهان‌اند."),
  S(False, "Når der ikke er nogen på feltet, kan jeg køre med normal fart.", "When there is nobody on the crossing, I can drive at normal speed.",
    "وقتی کسی روی گذرگاه نیست، می‌توانم با سرعت معمول برانم.",
    "Du kan ikke se, om nogen er på vej ud på feltet.", "You cannot see whether someone is about to step onto the crossing.",
    "نمی‌توانید ببینید کسی در حال ورود به گذرگاه هست یا نه."),
)

Q(5440, "7.6", view("""
THE SCENE: a two-lane country road at dusk; about 60 m ahead a man in a reflective vest stands at the right edge of the road waving
both arms; behind him, further ahead, a car lies in the ditch.
MUST BE CLEARLY VISIBLE: the man waving both arms, the car in the ditch further ahead.
MUST NOT APPEAR: blood, signs, text.""", cond="dusk, dry road"),
  "En mand står i vejkanten og vinker med begge arme til, at du skal standse. Længere fremme ligger en bil i grøften. Hvordan forholder du dig?",
  "A man stands at the edge of the road waving both arms for you to stop. Further ahead a car lies in the ditch. What do you do?",
  "مردی کنار جاده ایستاده و با هر دو دست اشاره می‌کند که بایستید. جلوتر خودرویی در گودال کنار جاده افتاده است. چه می‌کنید؟",
  S(True, "Jeg sænker farten og standser, når det kan ske uden fare.", "I slow down and stop when it can be done safely.",
    "سرعتم را کم می‌کنم و وقتی بی‌خطر باشد می‌ایستم.",
    "Der kan være sket et uheld, og der kan være personer på vejen eller brug for hjælp.",
    "There may have been an accident, and there may be people on the road or a need for help.",
    "ممکن است تصادفی رخ داده باشد و افرادی روی جاده باشند یا به کمک نیاز باشد."),
  S(False, "Jeg kører hurtigt forbi, så jeg ikke er i vejen for redningskøretøjerne.", "I drive past quickly so that I am not in the way of the rescue vehicles.",
    "سریع رد می‌شوم تا سر راه خودروهای امدادی نباشم.",
    "Ved et uheldssted skal du sænke farten; der kan være folk på vejen.", "At an accident site you must slow down; there may be people on the road.",
    "در محل تصادف باید سرعت را کم کنید؛ ممکن است افرادی روی جاده باشند."),
  S(False, "Jeg dytter og kører uden om manden.", "I sound the horn and drive round the man.", "بوق می‌زنم و از کنار آن مرد رد می‌شوم.",
    "Du skal sænke farten og være klar til at standse og hjælpe.", "You must slow down and be ready to stop and help.",
    "باید سرعت را کم کنید و آماده‌ی ایستادن و کمک کردن باشید."),
  S(False, "Jeg standser midt på vejen uden at tænde havariblinket.", "I stop in the middle of the road without switching on the hazard lights.",
    "وسط جاده می‌ایستم، بدون این‌که چراغ خطر را روشن کنم.",
    "Standser du, skal det ske, så du ikke selv skaber fare, og du skal advare de andre.",
    "If you stop, it must be done so that you do not create a danger yourself, and you must warn the others.",
    "اگر می‌ایستید، باید طوری باشد که خودتان خطری ایجاد نکنید و به دیگران هشدار بدهید."),
)

Q(5441, "7.6", town("""
THE SCENE: a residential street with one lane in each direction. On the right pavement about 25 m ahead a large dog without a lead
runs back and forth close to the kerb, sniffing; nobody holds it.
MUST BE CLEARLY VISIBLE: the loose dog near the kerb.
MUST NOT APPEAR: signs, text."""),
  "En stor hund uden snor løber frem og tilbage på fortovet tæt ved kantstenen. Hvordan forholder du dig?",
  "A large dog without a lead is running back and forth on the pavement close to the kerb. What do you do?",
  "یک سگ بزرگِ بدون قلاده روی پیاده‌رو و نزدیک جدول این‌طرف و آن‌طرف می‌دود. چه می‌کنید؟",
  S(True, "Jeg tager foden fra speederen og er parat til at bremse.", "I take my foot off the accelerator and am ready to brake.",
    "پایم را از روی گاز برمی‌دارم و آماده‌ی ترمز گرفتن هستم.",
    "Hunden kan pludselig løbe ud på vejen.", "The dog may suddenly run out into the road.", "ممکن است سگ ناگهان وارد خیابان شود."),
  S(True, "Jeg regner med, at hunden kan løbe ud foran mig uden varsel.", "I expect that the dog may run out in front of me without warning.",
    "انتظار دارم سگ بدون هشدار جلوی من بدود.",
    "Dyr kan ikke forudse trafikken.", "Animals cannot anticipate the traffic.", "حیوانات نمی‌توانند ترافیک را پیش‌بینی کنند."),
  S(False, "Hunden bliver på fortovet, fordi den kan høre bilen.", "The dog will stay on the pavement because it can hear the car.",
    "سگ روی پیاده‌رو می‌ماند، چون صدای خودرو را می‌شنود.",
    "Du kan ikke regne med, at et dyr reagerer på bilen.", "You cannot count on an animal reacting to the car.", "نمی‌توانید روی واکنش حیوان به خودرو حساب کنید."),
  S(False, "Jeg kører tæt forbi, så hunden bliver bange og løber væk.", "I drive close past so that the dog gets frightened and runs away.",
    "از نزدیکش رد می‌شوم تا سگ بترسد و فرار کند.",
    "Det kan få hunden til at løbe ud på vejen.", "That may make the dog run out into the road.", "این کار ممکن است باعث شود سگ وارد خیابان شود."),
)

Q(5442, "7.6", town("""
THE SCENE: a street outside a school in the morning; several cars stand at the kerb with their doors open, and children with school
bags get out and walk between the cars; a parent crosses the street holding a child's hand.
MUST BE CLEARLY VISIBLE: the stopped cars with open doors, the children between them, the parent and child crossing.
MUST NOT APPEAR: signs, text."""),
  "Uden for en skole holder flere biler i vejkanten, og børn stiger ud. Hvordan forholder du dig?",
  "Outside a school several cars are standing at the edge of the road, and children are getting out. What do you do?",
  "بیرون یک مدرسه چند خودرو کنار خیابان ایستاده‌اند و بچه‌ها پیاده می‌شوند. چه می‌کنید؟",
  S(True, "Jeg kører meget langsomt forbi skolen og er klar til at standse.", "I drive very slowly past the school and am ready to stop.",
    "خیلی آهسته از کنار مدرسه رد می‌شوم و آماده‌ی توقف هستم.",
    "Der skal vises særligt hensyn over for børn.", "Particular consideration must be shown to children.", "باید نسبت به کودکان ملاحظه‌ی ویژه داشت."),
  S(True, "Et barn kan løbe ud mellem bilerne.", "A child may run out between the cars.", "ممکن است کودکی از بین خودروها بیرون بدود.",
    "Børn kan være skjult af de holdende biler.", "Children may be hidden by the stationary cars.", "ممکن است کودکان پشت خودروهای ایستاده پنهان باشند."),
  S(True, "Døre kan blive åbnet i vejsiden.", "Doors may be opened on the road side.", "ممکن است درهایی در سمت خیابان باز شوند.",
    "Passagerer i de holdende biler kan åbne døren uden at se sig for.", "Passengers in the stationary cars may open the door without looking.",
    "مسافران خودروهای ایستاده ممکن است بدون نگاه کردن در را باز کنند."),
  S(False, "Bilerne holder stille, så jeg kan køre forbi med normal fart.", "The cars are standing still, so I can pass at normal speed.",
    "خودروها ایستاده‌اند، پس می‌توانم با سرعت معمول رد شوم.",
    "Børn og døre kan dukke op lige foran dig.", "Children and doors may appear right in front of you.", "ممکن است کودکان و درها درست جلوی شما ظاهر شوند."),
)

Q(5443, "7.3", view("""
THE SCENE: a two-lane country road early in the morning; the sun stands very low straight ahead, and the wet road reflects it, so the
road and a cyclist far ahead are hard to see in the glare.
MUST BE CLEARLY VISIBLE: the low sun straight ahead, the glare on the wet road, the faint cyclist far ahead.
MUST NOT APPEAR: signs, text.""", cond="early morning, low sun straight ahead, wet road, strong glare"),
  "Solen står lavt lige foran dig, og den våde vej spejler lyset, så du har svært ved at se. Hvordan forholder du dig?",
  "The sun is low straight ahead of you, and the wet road reflects the light, so you find it hard to see. What do you do?",
  "خورشید درست روبه‌روی شما پایین است و جاده‌ی خیس نور را منعکس می‌کند و دیدن برایتان سخت است. چه می‌کنید؟",
  S(True, "Jeg sænker farten, så jeg kan nå at standse, selv om solen blænder mig.", "I slow down so that I can stop in time even though the sun is dazzling me.",
    "سرعتم را کم می‌کنم تا با وجود خیرگی آفتاب بتوانم به‌موقع بایستم.",
    "Ved risiko for blænding skal du holde en passende lav hastighed.", "Where there is a risk of being dazzled, you must keep a suitably low speed.",
    "وقتی خطر خیره شدن چشم هست، باید سرعت مناسبِ کمی داشته باشید."),
  S(True, "Jeg bruger solskærmen og eventuelt solbriller.", "I use the sun visor and possibly sunglasses.", "از آفتاب‌گیر و در صورت لزوم عینک آفتابی استفاده می‌کنم.",
    "Det kan mindske blændingen.", "That can reduce the glare.", "این کار می‌تواند خیرگی را کم کند."),
  S(True, "Jeg holder øje med cyklister og gående, som er svære at se i modlyset.", "I watch out for cyclists and pedestrians, who are hard to see against the light.",
    "مراقب دوچرخه‌سواران و عابرانی هستم که در نور روبه‌رو به‌سختی دیده می‌شوند.",
    "I modlys kan du let overse dem.", "Against the light you may easily miss them.", "در نور روبه‌رو ممکن است به‌راحتی آن‌ها را نبینید."),
  S(False, "Jeg holder farten, fordi jeg kender vejen.", "I keep my speed because I know the road.", "سرعتم را نگه می‌دارم، چون جاده را می‌شناسم.",
    "Du skal kunne standse på den strækning, du kan se, også når du kender vejen.", "You must be able to stop within the distance you can see, even when you know the road.",
    "باید بتوانید در مسافتی که می‌بینید بایستید، حتی اگر جاده را بشناسید."),
)

Q(5444, "7.3", view("""
THE SCENE: a motorway in heavy rain; water lies on the road surface and the cars ahead throw up spray; the cruise-control symbol is lit
on the dashboard strip.
MUST BE CLEARLY VISIBLE: the heavy rain and water on the road, the cruise-control symbol on the dashboard strip.
MUST NOT APPEAR: signs, text.""", cond="heavy rain, water on the road, spray"),
  "Du kører på motorvejen med fartpiloten slået til. Det begynder at regne kraftigt. Hvordan forholder du dig?",
  "You are driving on the motorway with the cruise control on. It starts to rain heavily. What do you do?",
  "در آزادراه با کروز کنترلِ روشن می‌رانید. باران شدیدی شروع می‌شود. چه می‌کنید؟",
  S(True, "Jeg slår fartpiloten fra, så jeg selv styrer farten.", "I switch off the cruise control so that I control the speed myself.",
    "کروز کنترل را خاموش می‌کنم تا خودم سرعت را کنترل کنم.",
    "På våd og glat vej skal du selv kunne reagere og tilpasse farten.", "On a wet, slippery road you must be able to react and adjust the speed yourself.",
    "در جاده‌ی خیس و لغزنده باید خودتان بتوانید واکنش نشان دهید و سرعت را تنظیم کنید."),
  S(True, "Jeg sænker farten efter forholdene.", "I reduce my speed to suit the conditions.", "سرعتم را متناسب با شرایط کم می‌کنم.",
    "Farten skal passe til vejr og føre.", "The speed must suit the weather and the road surface.", "سرعت باید با هوا و وضعیت جاده جور باشد."),
  S(False, "Fartpiloten sørger for, at farten altid passer til forholdene.", "The cruise control makes sure that the speed always suits the conditions.",
    "کروز کنترل مطمئن می‌شود سرعت همیشه با شرایط جور باشد.",
    "Den holder kun en bestemt fart; den ved ikke, hvordan vejen er.", "It only holds a set speed; it does not know what the road is like.",
    "فقط سرعت معینی را نگه می‌دارد؛ از وضعیت جاده خبر ندارد."),
  S(False, "Med fartpilot kan jeg slappe mere af og se mindre på vejen.", "With cruise control I can relax more and look less at the road.",
    "با کروز کنترل می‌توانم راحت‌تر باشم و کمتر به جاده نگاه کنم.",
    "Du har det fulde ansvar for kørslen og skal være opmærksom hele tiden.", "You are fully responsible for the driving and must pay attention all the time.",
    "مسئولیت کامل رانندگی با شماست و باید همیشه حواستان جمع باشد."),
)

Q(5445, "7.3", view("""
THE SCENE: a narrow gravel road through a forest, with loose gravel on the surface and a bend ahead.
MUST BE CLEARLY VISIBLE: the loose gravel surface, the bend ahead.
MUST NOT APPEAR: signs, text, other vehicles."""),
  "Du kører på en grusvej med løst grus. Hvordan forholder du dig?",
  "You are driving on a gravel road with loose gravel. What do you do?",
  "در جاده‌ای شنی با شن‌های شل می‌رانید. چه می‌کنید؟",
  S(True, "Jeg kører langsommere end på asfalt, fordi vejgrebet er dårligere.", "I drive more slowly than on asphalt because the grip is poorer.",
    "آهسته‌تر از روی آسفالت می‌رانم، چون چسبندگی کمتر است.",
    "På løst grus er bremselængden længere, og bilen kan lettere skride.", "On loose gravel the braking distance is longer, and the car skids more easily.",
    "روی شن شل مسافت ترمز بیشتر است و خودرو راحت‌تر منحرف می‌شود."),
  S(True, "Jeg bremser og drejer blødt.", "I brake and steer gently.", "به‌نرمی ترمز می‌گیرم و فرمان می‌دهم.",
    "Hårde manøvrer kan få bilen til at skride.", "Sharp manoeuvres can make the car skid.", "حرکات تند ممکن است خودرو را منحرف کند."),
  S(False, "Den generelle grænse på 80 km/t er altid en passende fart på grusvej.", "The general 80 km/h limit is always a suitable speed on a gravel road.",
    "حد عمومی ۸۰ کیلومتر بر ساعت همیشه سرعت مناسبی برای جاده‌ی شنی است.",
    "Farten skal passe til forholdene; 80 km/t er kun den højeste tilladte.", "The speed must suit the conditions; 80 km/h is only the highest allowed.",
    "سرعت باید با شرایط جور باشد؛ ۸۰ کیلومتر بر ساعت فقط بیشترین سرعت مجاز است."),
)

Q(5446, "1.2", picture("""
A car's instrument panel with the amber ABS warning lamp lit (the letters ABS in a circle); the other warning lamps are dark.
MUST BE CLEARLY VISIBLE: the lit amber ABS lamp.
MUST NOT APPEAR: other text, numbers, brand names."""),
  "Under kørslen begynder ABS-lampen at lyse. Hvad gælder som regel?",
  "While you are driving, the ABS lamp comes on. What usually applies?",
  "هنگام رانندگی چراغ ABS روشن می‌شود. معمولاً چه چیزی درست است؟",
  S(True, "Bremserne virker, men uden ABS, så hjulene kan blokere ved en hård opbremsning, og jeg får fejlen undersøgt.",
    "The brakes work, but without ABS, so the wheels may lock in hard braking, and I have the fault checked.",
    "ترمزها کار می‌کنند ولی بدون ABS، پس در ترمز شدید ممکن است چرخ‌ها قفل شوند، و عیب را بررسی می‌کنم.",
    "Lampen viser en fejl i ABS-systemet; de almindelige bremser virker normalt stadig.",
    "The lamp shows a fault in the ABS system; the ordinary brakes normally still work.",
    "این چراغ عیب سیستم ABS را نشان می‌دهد؛ ترمزهای معمولی معمولاً همچنان کار می‌کنند."),
  S(False, "Bilen kan slet ikke bremse, så jeg skal standse med håndbremsen.", "The car cannot brake at all, so I must stop with the handbrake.",
    "خودرو اصلاً ترمز نمی‌کند، پس باید با ترمزدستی بایستم.",
    "De almindelige bremser virker normalt stadig.", "The ordinary brakes normally still work.", "ترمزهای معمولی معمولاً همچنان کار می‌کنند."),
  S(False, "Lampen betyder, at bremserne er ekstra gode på glat vej.", "The lamp means that the brakes are extra good on a slippery road.",
    "این چراغ یعنی ترمزها روی جاده‌ی لغزنده بهترند.",
    "Den betyder, at ABS ikke virker.", "It means that the ABS is not working.", "یعنی ABS کار نمی‌کند."),
  S(False, "Lampen er kun en påmindelse om service, som jeg kan vente et år med.", "The lamp is only a service reminder that I can leave for a year.",
    "این چراغ فقط یادآور سرویس است که می‌توانم یک سال صبر کنم.",
    "En fejl ved bremsesystemet skal undersøges snarest.", "A fault in the brake system must be checked as soon as possible.",
    "عیب سیستم ترمز باید هرچه زودتر بررسی شود."),
)

Q(5447, "1.2", picture("""
The front of a car in winter, covered with grey slush and road salt; the headlights and the number plate are so dirty that the plate
cannot be read and the lights shine weakly.
MUST BE CLEARLY VISIBLE: the dirty headlights, the unreadable dirty number plate.
MUST NOT APPEAR: readable characters, brand names."""),
  "Det er vinter, og bilens lygter og nummerplade er dækket af snavs og salt. Hvad gælder?",
  "It is winter, and the car's lights and number plate are covered in dirt and salt. What applies?",
  "زمستان است و چراغ‌ها و پلاک خودرو زیر گل و نمک پوشیده شده‌اند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg gør lygter og nummerplade rene, før jeg kører.", "I clean the lights and the number plate before I drive.",
    "پیش از رانندگی چراغ‌ها و پلاک را تمیز می‌کنم.",
    "Lygterne skal kunne lyse ordentligt, og nummerpladen skal kunne læses.", "The lights must be able to shine properly, and the number plate must be readable.",
    "چراغ‌ها باید درست نور بدهند و پلاک باید خوانا باشد."),
  S(True, "Snavsede forlygter lyser dårligere og kan blænde andre.", "Dirty headlights give less light and may dazzle others.",
    "چراغ‌های جلوی کثیف نور کمتری می‌دهند و ممکن است چشم دیگران را بزنند.",
    "Snavset spreder lyset.", "The dirt scatters the light.", "گل و کثیفی نور را پخش می‌کند."),
  S(True, "Jeg tørrer også baglygter og blinklys af.", "I also wipe the rear lights and indicators.", "چراغ‌های عقب و راهنماها را هم تمیز می‌کنم.",
    "De andre skal kunne se dig og se, hvad du vil gøre.", "The others must be able to see you and see what you are going to do.",
    "دیگران باید شما را ببینند و بفهمند چه می‌خواهید بکنید."),
  S(False, "Det er ligegyldigt, så længe jeg selv kan se ud af ruderne.", "It does not matter as long as I can see out of the windows myself.",
    "تا وقتی خودم از شیشه‌ها بیرون را می‌بینم، اهمیتی ندارد.",
    "Andre skal kunne se dig og læse nummerpladen.", "Others must be able to see you and read the number plate.",
    "دیگران باید شما را ببینند و پلاک را بخوانند."),
)

Q(5448, "7.12", view("""
THE SCENE: we wait at shark teeth (white triangles) at the end of a side road, to go straight across a main road; on the main road a
motorcycle with its headlight on approaches from the left at some distance; the road to the right is clear.
MUST BE CLEARLY VISIBLE: the shark teeth, the motorcycle approaching from the left.
MUST NOT APPEAR: text."""),
  "Du venter ved hajtænderne og skal ligeud over hovedvejen. Fra venstre kommer en motorcykel. Hvordan forholder du dig?",
  "You are waiting at the shark teeth to go straight across the main road. A motorcycle is coming from the left. What do you do?",
  "پشت دندان‌کوسه‌ها منتظرید تا مستقیم از عرض جاده‌ی اصلی رد شوید. از چپ یک موتورسیکلت می‌آید. چه می‌کنید؟",
  S(True, "Jeg venter, til jeg er sikker på, at motorcyklen er kørt forbi eller langt nok væk.",
    "I wait until I am sure that the motorcycle has passed or is far enough away.",
    "صبر می‌کنم تا مطمئن شوم موتورسیکلت رد شده یا به اندازه‌ی کافی دور است.",
    "Du har ubetinget vigepligt og skal være sikker på, at der er plads.", "You must give way and be sure that there is room.",
    "شما باید بی‌قیدوشرط راه بدهید و مطمئن شوید جا هست."),
  S(True, "Motorcyklens fart og afstand kan være svær at bedømme.", "The motorcycle's speed and distance can be hard to judge.",
    "تخمین سرعت و فاصله‌ی موتورسیکلت ممکن است سخت باشد.",
    "En motorcykel er smal, og dens fart undervurderes let.", "A motorcycle is narrow, and its speed is easily underestimated.",
    "موتورسیکلت باریک است و سرعتش را راحت کمتر از واقع تخمین می‌زنند."),
  S(False, "En motorcykel fylder lidt, så jeg kan godt nå over foran den.", "A motorcycle takes up little room, so I can make it across in front of it.",
    "موتورسیکلت جای کمی می‌گیرد، پس می‌توانم پیش از آن رد شوم.",
    "Du skal holde tilbage for alle på hovedvejen, uanset deres størrelse.", "You must give way to everyone on the main road, whatever their size.",
    "باید به همه‌ی کسانی که در جاده‌ی اصلی‌اند راه بدهید، اندازه‌شان هر چه باشد."),
  S(False, "Motorcyklen skal sætte farten ned, når den ser mig.", "The motorcycle must slow down when it sees me.", "موتورسیکلت وقتی مرا ببیند باید سرعتش را کم کند.",
    "Det er dig, der har vigepligt.", "You are the one who must give way.", "این شما هستید که باید راه بدهید."),
)

Q(5449, "7.12", above("""
THE SCENE: a crossroads seen from above: our side road comes up from the bottom and continues on the far side; a main road runs left
to right. Along the near side of the main road runs a TWO-WAY cycle path (white arrows pointing both ways), separated by a kerb,
crossing the mouth of our side road; shark teeth lie across our lane before the cycle path.
VEHICLES AND PEOPLE (colour code used strictly): a RED car (ours) waiting at the shark teeth to go straight across; a cyclist on the
cycle path coming from the RIGHT; another cyclist coming from the LEFT.
MUST NOT APPEAR: signs, text."""),
  "Du kommer ad en sidevej med hajtænder og skal ligeud over hovedvejen. Langs hovedvejen er der en dobbeltrettet cykelsti. Hvad gælder?",
  "You are coming along a side road with shark teeth and going straight across the main road. Along the main road there is a two-way cycle path. What applies?",
  "از یک خیابان فرعیِ دارای دندان‌کوسه می‌آیید و باید مستقیم از عرض جاده‌ی اصلی رد شوید. کنار جاده‌ی اصلی یک مسیر دوچرخه‌ی دوطرفه هست. چه قاعده‌ای برقرار است؟",
  S(True, "Der kan komme cyklister fra begge retninger på cykelstien.", "Cyclists may come from both directions on the cycle path.",
    "ممکن است در مسیر دوچرخه از هر دو جهت دوچرخه‌سوار بیاید.",
    "På en dobbeltrettet cykelsti kører cyklisterne begge veje.", "On a two-way cycle path cyclists ride both ways.",
    "در مسیر دوچرخه‌ی دوطرفه دوچرخه‌سواران در هر دو جهت حرکت می‌کنند."),
  S(True, "Jeg skal holde tilbage for cyklisterne fra begge sider.", "I must give way to the cyclists from both sides.",
    "باید به دوچرخه‌سواران هر دو طرف راه بدهم.",
    "Din ubetingede vigepligt gælder alle på hovedvejen, også cyklister på cykelstien.",
    "Your duty to give way covers everyone on the main road, cyclists on the cycle path too.",
    "وظیفه‌ی راه دادنِ شما شامل همه‌ی کسانی است که در جاده‌ی اصلی‌اند، دوچرخه‌سوارانِ مسیر دوچرخه هم."),
  S(True, "Jeg ser grundigt til begge sider, før jeg kører over cykelstien.", "I look carefully both ways before I drive across the cycle path.",
    "پیش از رد شدن از مسیر دوچرخه، با دقت به هر دو طرف نگاه می‌کنم.",
    "Cyklister fra højre overses let, når man mest venter trafik fra venstre.", "Cyclists from the right are easily missed when you mostly expect traffic from the left.",
    "وقتی بیشتر منتظر ترافیک از چپ هستید، دوچرخه‌سوارانِ سمت راست راحت دیده نمی‌شوند."),
  S(False, "Cyklister fra højre skal holde tilbage for mig, fordi de kører i den forkerte retning.",
    "Cyclists from the right must give way to me because they are riding the wrong way.",
    "دوچرخه‌سوارانِ سمت راست باید به من راه بدهند، چون در جهت اشتباه می‌رانند.",
    "På en dobbeltrettet cykelsti er begge retninger tilladt, og du har vigepligt.", "On a two-way cycle path both directions are allowed, and you must give way.",
    "در مسیر دوچرخه‌ی دوطرفه هر دو جهت مجاز است و شما باید راه بدهید."),
)

Q(5450, "7.12", view("""
THE SCENE: we drive along a wide asphalt road and approach a junction where a small gravel road crosses it; on our side, before the
junction, stands a give-way sign (a white triangle with a red border, point down), and white shark teeth lie across our lane.
MUST BE CLEARLY VISIBLE: the give-way sign and shark teeth on our wide road, the small gravel road crossing it.
MUST NOT APPEAR: other signs, text."""),
  "Du kører ad en stor, asfalteret vej og kommer til et kryds med en lille grusvej. Ved din vej er der en vigepligtstavle og hajtænder. Hvad gælder?",
  "You are driving along a large asphalt road and come to a junction with a small gravel road. On your road there is a give-way sign and shark teeth. What applies?",
  "در یک جاده‌ی بزرگِ آسفالته می‌رانید و به تقاطعی با یک جاده‌ی شنیِ کوچک می‌رسید. در مسیر شما تابلوی رعایت حق تقدم و دندان‌کوسه هست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal holde tilbage for trafikken på grusvejen.", "I must give way to the traffic on the gravel road.", "باید به ترافیک جاده‌ی شنی راه بدهم.",
    "Tavlen og hajtænderne giver dig ubetinget vigepligt, uanset hvor store vejene er.",
    "The sign and the shark teeth mean you must give way, however large the roads are.",
    "تابلو و دندان‌کوسه‌ها شما را موظف به راه دادن می‌کنند، اندازه‌ی جاده‌ها هر چه باشد."),
  S(False, "Den store vej har altid forkørselsret over en grusvej.", "The large road always has priority over a gravel road.",
    "جاده‌ی بزرگ همیشه بر جاده‌ی شنی حق تقدم دارد.",
    "Det er afmærkningen, der bestemmer vigepligten, ikke vejens størrelse eller belægning.",
    "It is the signs and markings that decide who gives way, not the size or surface of the road.",
    "تابلو و خط‌کشی حق تقدم را تعیین می‌کنند، نه بزرگی یا جنس سطح جاده."),
  S(False, "Jeg skal kun holde tilbage for biler, ikke for traktorer fra grusvejen.", "I only have to give way to cars, not to tractors from the gravel road.",
    "فقط باید به خودروها راه بدهم، نه به تراکتورهای جاده‌ی شنی.",
    "Vigepligten gælder over for alle køretøjer på den tværgående vej.", "The duty to give way covers all vehicles on the crossing road.",
    "وظیفه‌ی راه دادن در برابر همه‌ی وسایلِ جاده‌ی عرضی است."),
)
