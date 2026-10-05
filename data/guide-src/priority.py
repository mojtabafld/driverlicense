# Right of way in Denmark, from Færdselsloven (LBK 168 af 14/02/2023): §§ 4, 5, 7, 16, 18, 19, 20, 25, 26, 27 and the
# road-marking order (B 11, B 13, B 15, B 16, B 18, B 19, S 11). Each scenario: a title, the situation, who goes first,
# the legal basis and `scene` (a top-down diagram for the picture prompt).
# In every picture: the BLUE car goes first (solid green arrow), the RED car gives way (dashed orange arrow that stops
# before the conflict point); pedestrians are drawn in yellow clothes, cyclists in purple.

P = []

def cat(id, title, intro, items):
    P.append({'id': id, 'title': title, 'intro': intro, 'items': items})

def sc(key, title, text, first, law, scene):
    return {'key': 'p-' + key, 'title': title, 'text': text, 'first': first, 'law': law, 'scene': scene}

X4 = 'a four-way crossroads of two equal two-lane roads with no signs, no markings at the junction and no traffic lights, seen straight from above'

cat('order', 'ترتیب اعتبار',
    'وقتی چند دستور با هم فرق دارند: ۱) دستور پلیس، ۲) چراغ راهنمایی، ۳) تابلو و خط‌کشی، ۴) قوانین عمومی مثل قاعده‌ی دست راست. هر مرحله بر مرحله‌ی بعدی مقدم است.', [
    sc('order-police', 'دستور پلیس مقدم بر همه چیز است',
       'پلیس در تقاطع ترافیک را هدایت می‌کند. حتی اگر چراغ برای شما سبز باشد، باید از اشاره‌ی پلیس پیروی کنید.',
       'هر کسی که پلیس به او اجازه دهد.', '§ 4، بند ۲',
       'a crossroads with traffic lights showing green for the red car coming from the bottom; a police officer in a yellow high-visibility vest stands in the middle of the junction with one arm raised towards the red car (stop) and the other arm waving the blue car on from the left; the red car waits before the stop line with a dashed orange arrow, the blue car crosses with a solid green arrow.'),
    sc('order-signal', 'چراغ راهنمایی مقدم بر تابلوی حق تقدم است',
       'در تقاطعی که چراغ کار می‌کند، تابلوی «حق تقدم بدهید» هم نصب است. تا وقتی چراغ کار می‌کند، فقط از چراغ پیروی کنید. اگر چراغ خاموش باشد یا زرد چشمک بزند، تابلوها اعتبار دارند.',
       'هر کسی که چراغش سبز است.', '§ 4، بند ۴',
       'a crossroads where the side road from the bottom has an inverted red-white give-way triangle sign and shark-teeth markings, but also a traffic light; the side road\'s light is green and the main road\'s light is red; the red car on the main road (from the left) waits at its red light with a dashed orange arrow, the blue car from the side road (bottom) drives through on green with a solid green arrow.'),
])

cat('right', 'قاعده‌ی دست راست',
    'وقتی مسیر دو خودرو با هم تلاقی می‌کند و هیچ چراغ، تابلو یا خط‌کشی حق تقدم نیست، راننده‌ای که خودروی دیگر را **در سمت راست خود** دارد باید راه بدهد (højrevigepligt). این قاعده برای دوچرخه و موتور هم هست. کسی که راه می‌دهد باید با کم کردن به‌موقع سرعت یا توقف، این را واضح نشان دهد.', [
    sc('right-basic', 'تقاطع بدون علامت',
       'دو خودرو هم‌زمان به تقاطعی بدون هیچ علامتی می‌رسند. خودروی قرمز، خودروی آبی را در سمت راست خود دارد.',
       'خودروی آبی (که از سمت راستِ قرمز می‌آید).', '§ 26، بند ۴',
       X4 + '; the red car approaches from the bottom going straight up, the blue car approaches from the right going straight to the left; the red car stops before the junction (dashed orange arrow), the blue car crosses first (solid green arrow).'),
    sc('right-t', 'سه‌راهی بدون علامت',
       'در سه‌راهی بدون علامت، جاده‌ی «مستقیم» هیچ حق تقدمی ندارد. خودروی قرمز روی جاده‌ی مستقیم است و خودروی آبی از جاده‌ی فرعی در سمت راستش می‌آید.',
       'خودروی آبی؛ قاعده‌ی دست راست اینجا هم برقرار است.', '§ 26، بند ۴',
       'a T-junction with no signs and no markings, seen straight from above: a straight road running left to right and a side road joining it from the bottom; the red car drives along the straight road from LEFT to RIGHT; the blue car comes up the side road from the bottom, which is on the red car\'s right; the red car slows and waits before the junction (dashed orange arrow), the blue car turns onto the straight road first (solid green arrow).'),

    sc('right-left-turn', 'گردش به چپ در تقاطع بدون علامت',
       'خودروی قرمز می‌خواهد به چپ بپیچد و خودروی آبی از روبه‌رو مستقیم می‌آید. کسی که به چپ می‌پیچد نباید مزاحم ترافیک روبه‌رو شود.',
       'خودروی آبی (مستقیم از روبه‌رو).', '§ 26، بند ۶',
       X4 + '; the red car comes from the bottom and wants to turn left (dashed orange arrow curving left, stopping at the centre of the junction), the blue car comes from the top going straight down (solid green arrow) and passes first.'),
    sc('right-three-cars', 'سه خودرو در تقاطع بدون علامت',
       'خودروی آبی از راست، قرمز از پایین و یک خودروی خاکستری از چپ می‌آیند. هر کس به خودروی سمت راستش راه می‌دهد: اول آبی (کسی سمت راستش نیست)، بعد قرمز، و آخر خاکستری.',
       'به ترتیب: آبی، قرمز، خاکستری.', '§ 26، بند ۴',
       X4 + '; three cars arrive at the same time: the blue car from the right, the red car from the bottom, and a grey car from the left, all going straight; the blue car crosses first with a solid green arrow; the red car waits with a dashed orange arrow; the grey car waits further back with a dashed grey arrow; small number badges are NOT drawn.'),
])

cat('yield', 'حق تقدم مطلق، ایست و جاده‌ی اصلی',
    'حق تقدم مطلق (ubetinget vigepligt) یعنی به **همه‌ی ترافیک از هر دو طرف** راه بدهید. با تابلوی B 11 (مثلث وارونه) و خط‌کشی دندان‌کوسه (S 11) نشان داده می‌شود؛ تابلوی ایست (B 13) یعنی علاوه بر آن کاملاً بایستید. روی جاده‌ی اصلی (B 16) حق تقدم با شماست.', [
    sc('yield-b11', 'تابلوی «حق تقدم بدهید» و دندان‌کوسه',
       'خودروی قرمز از جاده‌ای با تابلوی مثلث وارونه و دندان‌کوسه وارد جاده‌ی اصلی می‌شود. باید به خودروها و دوچرخه‌هایی که از چپ و راست می‌آیند راه بدهد.',
       'همه‌ی ترافیک جاده‌ی اصلی، از هر دو طرف.', '§ 26، بند ۲ · B 11 · S 11',
       'a side road from the bottom meeting a main road running left-right; at the end of the side road an inverted red-bordered give-way triangle sign and a row of white shark-teeth triangles across the lane pointing at the driver; the red car waits at the shark teeth (dashed orange arrow), the blue car on the main road from the left and a purple-clad cyclist on the main road from the right both pass first (solid green arrows).'),
    sc('yield-stop', 'تابلوی ایست',
       'خودروی قرمز به تابلوی STOP می‌رسد. باید پشت خط ایست کاملاً بایستد، حتی اگر جاده خالی باشد، و بعد به ترافیک هر دو طرف راه بدهد.',
       'همه‌ی ترافیک جاده‌ی متقاطع؛ و توقف کامل در هر حال.', 'B 13 · S 13',
       'a side road from the bottom meeting a main road; a red octagonal STOP sign at the corner and a broad white stop line across the side road lane with "STOP" painted before it; the red car stands fully stopped exactly at the stop line (dashed orange arrow), the blue car passes along the main road from the right (solid green arrow).'),
    sc('yield-main', 'روی جاده‌ی اصلی',
       'خودروی آبی روی جاده‌ی اصلی (لوزی زرد) است. ترافیک جاده‌های فرعی باید به او راه بدهد. با این حال اگر کسی راه نداد، آبی باید برای جلوگیری از تصادف بایستد.',
       'خودروی آبی روی جاده‌ی اصلی.', 'B 16 · § 26، بند ۲',
       'a main road running bottom to top with a yellow diamond main-road sign at its side; a side road joins from the left with shark-teeth markings; the blue car drives up the main road (solid green arrow), the red car waits at the end of the side road (dashed orange arrow).'),
    sc('yield-cycle-2way', 'مسیر دوچرخه‌ی دوطرفه',
       'قبل از جاده‌ی اصلی یک مسیر دوچرخه‌ی دوطرفه هست (تابلوی زیرین UB 11,2). دوچرخه‌ها از هر دو جهت می‌آیند؛ به هر دو طرف نگاه کنید.',
       'دوچرخه‌سواران از هر دو جهت، و بعد ترافیک جاده.', 'UB 11,2 · § 26، بند ۶',
       'a side road from the bottom meeting a main road; between them runs a two-way cycle path parallel to the main road; a give-way sign with a small sub-plate showing a bicycle and two opposite arrows; two purple-clad cyclists ride on the cycle path in opposite directions; the red car waits before the cycle path (dashed orange arrow); the cyclists pass first (solid green arrows).'),
])

cat('exit', 'خروج از پارکینگ، ملک و مسیرهای فرعی',
    'وقتی از پارکینگ، خانه، پمپ‌بنزین، مسیر دوچرخه یا عابر، راه خاکی یا خیابان پیاده خارج می‌شوید، یا از روی پیاده‌رو، مسیر دوچرخه یا جدولِ بالاتر از سطح جاده وارد آن می‌شوید، همیشه حق تقدم مطلق با دیگران است، **حتی بدون هیچ تابلویی**. به عابران پیاده‌رو هم باید راه بدهید.', [
    sc('exit-property', 'خروج از پارکینگ یا خانه',
       'خودروی قرمز از پارکینگ بیرون می‌آید و از روی پیاده‌رو و مسیر دوچرخه می‌گذرد. اول به عابر پیاده‌رو، بعد به دوچرخه‌سوار و در آخر به خودروهای جاده راه می‌دهد.',
       'عابر، دوچرخه‌سوار و همه‌ی خودروهای جاده.', '§ 26، بند ۳ · § 27، بند ۲',
       'a parking lot at the bottom with an exit crossing a pavement and a cycle path to reach a road running left-right; a yellow-clad pedestrian walks along the pavement, a purple-clad cyclist rides on the cycle path, and the blue car drives along the road; the red car waits at the exit before the pavement (dashed orange arrow); the others pass first (solid green arrows).'),
    sc('exit-kerb', 'خروج از روی جدول بالاتر (overkørsel)',
       'خیابان فرعی با یک جدولِ برآمده یا پیاده‌روی ممتد به جاده‌ی اصلی وصل شده است. این «ورودی ملک» حساب می‌شود و حق تقدم مطلق با ترافیک جاده است، حتی بدون تابلو.',
       'همه‌ی ترافیک جاده.', '§ 26، بند ۳',
       'a small side street from the bottom that meets a road through a continuous raised pavement (the pavement and kerb run unbroken across the mouth of the side street, slightly raised and paved differently); the red car waits on the side street before the raised pavement (dashed orange arrow); the blue car on the road passes first (solid green arrow).'),
    sc('exit-kerb-start', 'حرکت از کنار جدول',
       'خودروی قرمز پارک بوده و می‌خواهد حرکت کند. قبل از حرکت باید مطمئن شود که بدون خطر یا مزاحمت برای دیگران است: آینه، نقطه‌ی کور و راهنما.',
       'خودروهایی که در خیابان می‌آیند.', '§ 18، بند ۲',
       'a street running bottom to top with cars parked along the right kerb; the red car is one of the parked cars, its left indicator flashing, with a dashed orange arrow curving out into the lane but stopping short; the blue car approaches from behind in the lane (solid green arrow) and passes first.'),
])

cat('turn', 'گردش به چپ و راست',
    'کسی که می‌پیچد به ترافیک مستقیم و به عابران راه می‌دهد. در گردش به راست مراقب دوچرخه‌سوارانی باشید که کنار یا پشت شما مستقیم می‌روند (نقطه‌ی کور). در گردش به چپ به ترافیک روبه‌رو راه بدهید؛ این‌ها با چراغ سبز هم صادق است.', [
    sc('turn-left', 'گردش به چپ با ترافیک روبه‌رو',
       'خودروی قرمز با چراغ سبز می‌خواهد به چپ بپیچد. باید وسط تقاطع منتظر بماند تا خودروی آبیِ روبه‌رو که مستقیم یا به راست می‌رود رد شود.',
       'خودروی آبی (روبه‌رو).', '§ 26، بند ۶',
       'a signal-controlled crossroads with green lights; the red car comes from the bottom and waits in the middle of the junction wanting to turn left (dashed orange arrow curving left), with its wheels straight; the blue car comes from the top going straight down (solid green arrow) and passes first.'),
    sc('turn-right-cyclist', 'گردش به راست و دوچرخه‌سوار',
       'خودروی قرمز می‌خواهد به راست بپیچد. یک دوچرخه‌سوار در مسیر دوچرخه سمت راستش مستقیم می‌رود. قرمز باید آینه و نقطه‌ی کور را نگاه کند و منتظر بماند.',
       'دوچرخه‌سوار (مستقیم).', '§ 26، بند ۶',
       'a crossroads; the road from the bottom has a cycle path on its right side; the red car comes from the bottom with its right indicator on, wanting to turn right (dashed orange arrow curving right, stopping before the cycle path); a purple-clad cyclist rides straight on along the cycle path beside it (solid green arrow) and goes first.'),
    sc('turn-pedestrian', 'گردش و عابران',
       'خودروی قرمز به راست می‌پیچد. عابرانی که از عرض جاده‌ای که واردش می‌شود رد می‌شوند حق تقدم دارند، حتی با چراغ سبز.',
       'عابران.', '§ 27، بندهای ۵ و ۶',
       'a crossroads with zebra crossings on every arm; the red car comes from the bottom turning right (dashed orange arrow stopping before the zebra crossing on the road to the right); two yellow-clad pedestrians are walking across that zebra crossing (solid green arrow along their path).'),
    sc('turn-two-left', 'دو خودروی روبه‌روی هم که هر دو به چپ می‌پیچند',
       'دو خودرو از روبه‌روی هم وارد تقاطع می‌شوند و هر دو به چپ می‌پیچند. اگر بی‌خطر باشد، از سمت چپ از کنار هم رد می‌شوند (جلوی هم می‌پیچند).',
       'هر دو، اگر بی‌خطر باشد هم‌زمان.', '§ 16، بند ۵',
       'a crossroads seen from above; a blue car from the bottom and a second blue car from the top both turn left, their curved solid green arrows passing in front of each other (each turns in front of the other, passing left side to left side) without crossing paths.'),
])

cat('signals', 'تقاطع‌های چراغ‌دار',
    'چراغ سبز یعنی «اگر راه باز است برو»، نه «حق تقدم کامل». باز هم باید به عابران و (در گردش) به ترافیک روبه‌رو و دوچرخه‌ها راه بدهید و اگر نمی‌توانید از تقاطع خارج شوید، وارد آن نشوید.', [
    sc('signal-blocked', 'چراغ سبز ولی تقاطع پر است',
       'چراغ برای خودروی قرمز سبز است، اما آن طرف تقاطع ترافیک ایستاده است. اگر بداند نمی‌تواند قبل از سبز شدن چراغ طرف دیگر از تقاطع خارج شود، نباید وارد شود.',
       'ترافیکِ جاده‌ی متقاطع (وقتی چراغشان سبز شود).', '§ 26، بند ۷',
       'a signal-controlled crossroads; beyond the junction the lane going up is full of queuing grey cars; the red car waits before the stop line despite its green light (dashed orange arrow), leaving the junction box clear; the blue car crosses from the left (solid green arrow).'),
    sc('signal-arrow', 'فلش سبز',
       'فلش سبز به چپ روشن است: خودروی قرمز می‌تواند بدون ترافیک روبه‌روی متقاطع به چپ بپیچد، چون ترافیک روبه‌رو چراغ قرمز دارد. باز هم مراقب عابران باشید.',
       'خودرویی که فلش سبز دارد.', 'X 12',
       'a signal-controlled crossroads; the left-turn lane from the bottom has a green left arrow lit, the oncoming traffic from the top has red and waits at its stop line (grey car); the car turning left is BLUE with a solid green arrow curving left.'),
    sc('signal-ped-green', 'گذرگاه عابر در تقاطع چراغ‌دار',
       'عابری هنوز روی گذرگاه است که چراغ شما سبز می‌شود. باید منتظر بمانید تا از گذرگاه خارج شود.',
       'عابری که روی گذرگاه است.', '§ 27، بند ۶',
       'a signal-controlled pedestrian crossing; the light for cars has just turned green; a yellow-clad elderly pedestrian is still in the middle of the zebra crossing (solid green arrow); the red car waits before the crossing (dashed orange arrow).'),
])

cat('round', 'میدان',
    'در دانمارک قانون جداگانه‌ای برای میدان نیست؛ حق تقدم با علائم مشخص می‌شود. ورودی بیشتر میدان‌ها تابلوی B 11 و دندان‌کوسه دارد: به ترافیک داخل میدان راه بدهید. اگر هیچ علامتی نباشد، قاعده‌ی دست راست برقرار است. هنگام خروج راهنمای راست بزنید و به دوچرخه‌ها و عابران راه بدهید.', [
    sc('round-yield', 'ورود به میدان با دندان‌کوسه',
       'ورودی میدان تابلوی حق تقدم و دندان‌کوسه دارد. خودروی قرمز باید به خودروی آبیِ داخل میدان (که از چپ می‌آید) راه بدهد.',
       'خودروی آبی داخل میدان.', 'B 11 · S 11 · § 26، بند ۲',
       'a single-lane roundabout seen from above with a round green central island; each entry has a give-way triangle sign and shark-teeth markings; traffic circulates counter-clockwise; the blue car is already in the roundabout coming from the left (solid green arrow around the circle); the red car waits at the shark teeth of the bottom entry (dashed orange arrow).'),
    sc('round-none', 'میدان بدون علامت',
       'میدانی کوچک هیچ تابلو یا خط‌کشی حق تقدم ندارد. اینجا قاعده‌ی دست راست برقرار است: خودروی قرمزِ داخل میدان باید به خودروی آبی که از سمت راستش وارد می‌شود راه بدهد.',
       'خودروی آبی که از راستِ قرمز وارد میدان می‌شود.', '§ 26، بند ۴',
       'a small roundabout with NO signs and NO markings at the entries; the red car is inside the roundabout circulating counter-clockwise (dashed orange arrow that stops), the blue car enters from the entry on the red car\'s right (solid green arrow).'),
    sc('round-exit', 'خروج از میدان',
       'خودروی قرمز با راهنمای راست از میدان خارج می‌شود. دوچرخه‌سواری که در حاشیه‌ی میدان مستقیم می‌رود و عابری که روی گذرگاه خروجی است حق تقدم دارند.',
       'دوچرخه‌سوار و عابر.', '§ 26، بند ۶ · § 27، بند ۵',
       'a roundabout with a cycle lane around its outer edge and a zebra crossing on each exit; the red car is leaving at the right exit with its indicator on (dashed orange arrow stopping before the cycle lane); a purple-clad cyclist continues around the roundabout in the cycle lane and a yellow-clad pedestrian crosses the exit zebra (solid green arrows).'),
])

cat('people', 'عابران و دوچرخه‌سواران',
    'عابران و دوچرخه‌سواران آسیب‌پذیرند. به عابری که روی گذرگاه است یا می‌خواهد واردش شود راه بدهید، از خودرویی که جلوی گذرگاه ایستاده سبقت نگیرید و در خیابان‌های پیاده، منطقه‌ی بازی و خیابان دوچرخه با سرعت خیلی کم برانید.', [
    sc('ped-zebra', 'گذرگاه عابرِ بدون چراغ',
       'عابری در حال وارد شدن به گذرگاه است. باید با سرعتی نزدیک شوید که بتوانید بایستید و اگر لازم شد، بایستید.',
       'عابر.', '§ 27، بند ۷',
       'a straight road with a zebra crossing and blue pedestrian-crossing signs at both ends; a yellow-clad pedestrian is stepping onto the crossing from the right pavement (solid green arrow across); the red car stops before the crossing (dashed orange arrow).'),
    sc('ped-blocked', 'خودروی ایستاده جلوی گذرگاه',
       'خودروی خاکستری در خط کناری جلوی گذرگاه ایستاده است و دید را گرفته است. ممکن است عابری پشتش باشد: نباید از آن سبقت بگیرید یا از کنارش رد شوید.',
       'عابری که شاید دیده نشود.', '§ 25',
       'a road with two lanes in the same direction approaching a zebra crossing; in the right lane a grey van has stopped just before the crossing, hiding a yellow-clad child who is crossing in front of it (solid green arrow); the red car in the left lane stops behind the crossing line instead of passing (dashed orange arrow).'),
    sc('ped-cycle-street', 'خیابان دوچرخه (cykelgade)',
       'در خیابان دوچرخه سواره‌رو برای دوچرخه است. خودرو فقط اگر مجاز شده باشد، با سرعتی برابر دوچرخه‌ها (معمولاً زیر ۳۰) و بدون مزاحمت برای آن‌ها حرکت می‌کند.',
       'دوچرخه‌سواران.', 'E 47',
       'a narrow street with a blue cycle-street sign (white bicycle) at its start; several purple-clad cyclists ride in the middle of the street (solid green arrows); the red car follows slowly behind them at their speed (dashed orange arrow), not overtaking.'),
])

cat('special', 'اتوبوس، خودروهای امدادی، قطار و تراموا',
    'برخی وسایل حق تقدم ویژه دارند: خودروی امدادی با آژیر و چراغ آبی، قطار در گذرگاه راه‌آهن، و داخل شهر اتوبوسی که از ایستگاه حرکت می‌کند.', [
    sc('special-emergency', 'خودروی امدادی',
       'آمبولانس با آژیر و چراغ آبی چشمک‌زن نزدیک می‌شود. باید به‌موقع راه را باز کنید و در صورت لزوم کنار بکشید و بایستید؛ حتی در تقاطع.',
       'خودروی امدادی.', '§ 7، بند ۲',
       'a two-lane road; a white ambulance with flashing blue lights comes from behind in the middle of the road (solid green arrow); the red car and a grey car have pulled over to the right side and stopped (dashed orange arrows ending at the kerb).'),
    sc('special-bus', 'اتوبوس در حال حرکت از ایستگاه (داخل شهر)',
       'داخل شهر، اتوبوسی در ایستگاه ایستاده و راهنمای چپ زده است تا حرکت کند. باید سرعت را کم کنید و در صورت لزوم بایستید تا بتواند خارج شود (راننده‌ی اتوبوس هم باید احتیاط کند).',
       'اتوبوس.', '§ 19، بند ۱',
       'a town street with a bus stop bay on the right; a yellow-and-white city bus in the bay with its left indicator flashing, its solid green arrow pulling out into the lane; the red car behind slows down and leaves space (dashed orange arrow).'),
    sc('special-train', 'گذرگاه راه‌آهن',
       'چراغ قرمز گذرگاه چشمک می‌زند و راه‌بند پایین می‌آید. قطار همیشه حق تقدم دارد. در فاصله‌ی امن قبل از چراغ یا راه‌بند بایستید و هرگز وقتی قطار دیده یا شنیده می‌شود عبور نکنید.',
       'قطار.', '§ 5',
       'a road crossing a railway at a level crossing with red-and-white barriers coming down, red flashing lights and a St Andrew\'s cross; a train approaches from the left on the tracks (solid green arrow); the red car waits well before the stop line (dashed orange arrow).'),
    sc('special-tram', 'ریل تراموا (letbane)',
       'در جاده‌ای که واردش می‌شوید ریل تراموا هست (تابلوی زیرین UB 11,3 زیر B 11). تراموا ممکن است از هر دو جهت بیاید؛ به آن راه بدهید و هرگز روی ریل نایستید.',
       'تراموا (از هر دو جهت).', 'B 11 · UB 11,3',
       'a side road from the bottom meeting a road with light-rail tracks along its middle; a give-way sign with a sub-plate showing a tram and two opposite arrows; a modern light-rail tram passes along the tracks from the right (solid green arrow); the red car waits at the shark teeth before the tracks (dashed orange arrow).'),
])

cat('lanes', 'ادغام، تغییر خط و ورود به بزرگراه',
    'کسی که خط عوض می‌کند باید مطمئن شود این کار بدون خطر و مزاحمت برای دیگران است. ولی وقتی تعداد خطوط کم می‌شود یا دو خط یکی می‌شوند، همه باید با ملاحظه‌ی متقابل (معمولاً به نوبت، «زیپی») ادغام شوند.', [
    sc('lane-zip', 'یکی شدن خطوط (ادغام زیپی)',
       'دو خط یکی می‌شوند (تابلوی B 15). خودروها از هر دو خط به نوبت ادغام می‌شوند؛ هیچ‌کدام حق تقدم کامل ندارند و همه با ملاحظه‌ی متقابل رانندگی می‌کنند.',
       'به نوبت، با ملاحظه‌ی متقابل.', '§ 18، بند ۴ · B 15',
       'a road where two lanes in the same direction merge into one, with a white rectangular merge sign (red symbol of two lanes joining) at the side; cars from both lanes take turns like a zipper: alternating blue cars from the left and right lanes merge with solid green arrows into the single lane.'),
    sc('lane-change', 'تغییر خط',
       'خطی که خودروی قرمز در آن است تمام می‌شود و خط‌کشی ادامه دارد (فلش‌های تغییر خط R 15). قرمز باید خط عوض کند و به خودروی آبیِ خط کناری راه بدهد.',
       'خودروی آبی در خطی که قرمز واردش می‌شود.', '§ 18، بند ۲ · R 15',
       'a road with two lanes where the right lane ends; diagonal white arrows painted in the right lane point to the left lane, and the dashed lane line continues; the red car in the ending right lane waits for a gap with its left indicator on (dashed orange arrow), the blue car continues in the left lane (solid green arrow).'),
    sc('lane-motorway', 'ورود به بزرگراه از خط شتاب',
       'خودروی قرمز از خط شتاب وارد بزرگراه می‌شود. باید سرعتش را با ترافیک بزرگراه یکی کند و وقتی بی‌خطر بود وارد شود. خودروهای بزرگراه هم در صورت لزوم با کم کردن سرعت به ورودش کمک می‌کنند.',
       'خودروی آبیِ داخل بزرگراه؛ با کمک متقابل.', '§ 18، بند ۳',
       'a motorway with two lanes seen from above and an acceleration lane joining from the right; the red car in the acceleration lane adapts its speed and indicates left (dashed orange arrow merging later), the blue car in the right motorway lane continues (solid green arrow) and has left a gap behind it.'),
])

cat('meet', 'روبه‌رو شدن در جاده‌ی باریک',
    'وقتی جاده به‌طور کامل برای عبور هم‌زمان جا ندارد، کسی که مانع در سمت اوست باید صبر کند. تابلوهای B 18 و B 19 مشخص می‌کنند که در بخش باریک چه کسی اول می‌رود.', [
    sc('meet-obstacle', 'مانع در سمت شما',
       'یک خودروی پارک‌شده در سمت خودروی قرمز است و جا برای دو خودرو نیست. قرمز باید صبر کند تا خودروی آبیِ روبه‌رو رد شود.',
       'خودروی آبی (مانع در سمت او نیست).', '§ 20، بند ۱',
       'a narrow two-way road; a grey parked van blocks part of the red car\'s lane on the right; the red car waits behind the van (dashed orange arrow), the blue car comes from the opposite direction in its own lane and passes first (solid green arrow).'),
    sc('meet-b18', 'بخش باریک با تابلوی B 18 / B 19',
       'سمت خودروی قرمز تابلوی B 18 (فلش قرمز رو به بالا) است و سمت آبی تابلوی B 19 (مربع آبی). قرمز فقط وقتی وارد بخش باریک می‌شود که بتواند بدون مجبور کردن آبی به توقف از آن عبور کند.',
       'خودروی آبی (سمت B 19).', 'B 18 · B 19',
       'a narrow single-lane bridge on a two-way road; at the red car\'s end a round red-bordered sign with a black down arrow and a red up arrow; at the blue car\'s end a blue square sign with a white up arrow and a red down arrow; the blue car is crossing the bridge (solid green arrow), the red car waits before it (dashed orange arrow).'),
])
