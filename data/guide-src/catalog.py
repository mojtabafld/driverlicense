# All Danish road signs, markings and signals in the order and groups of the road-marking order (Bekendtgørelse om
# vejafmærkning): A–Z and the sub-signs U, UA–UE, US. The list of signs follows that order; every text here is our own.
# An item is either a code already written in signs.py (its texts and `look` are taken from there) or
# n(code, Danish name, Persian title, Persian text, look) where `look` is the official design in English, for the
# picture prompt when there is no official drawing to start from.
# A category: id, Persian title, a one-line blurb for its card, the intro (rules for the whole group), the prompt of its
# card's thumbnail, and its items.

C = []

def cat(id, title, blurb, intro, thumb, items):
    C.append({'id': id, 'title': title, 'blurb': blurb, 'intro': intro, 'thumb': thumb, 'items': items})

def n(code, da, fa, text, look):
    return {'code': code, 'da': da, 'fa': fa, 'text': text, 'look': look}

TRI = 'an upright equilateral triangle (point up) with a broad red border and a white centre; black symbol: '
CIR = 'a round sign with a broad red border and a white centre; black symbol: '
BAN = CIR + 'crossed by a thin red diagonal bar from top left to bottom right; '
BLUE = 'a round blue sign with a thin white edge; white symbol: '
RECT = 'a blue square sign with a thin white edge; white symbol: '
GUIDE = 'a rectangular direction sign; any words are drawn as short abstract white or black bars, no readable letters; '
SERV = 'a square service sign: a blue square with a broad blue frame around a white inner square holding a black pictogram: '
PLATE = 'a small white rectangular sub-sign (plate) with a red border, black content: '
PLATEB = 'a small blue rectangular sub-sign (plate) with a white edge, white content: '
SYM = 'a black pictogram on a plain white plate, as used on sub-signs: '
ROAD = 'a short piece of grey asphalt road seen from above with white road markings: '

# ---------------------------------------------------------------- A
cat('A', 'تابلوهای هشدار', 'مثلث با حاشیه‌ی قرمز؛ خطری در پیش است.',
    'مثلث با رأس رو به بالا، حاشیه‌ی قرمز و زمینه‌ی سفید با علامت سیاه. خطری را نشان می‌دهند که دیدنش سخت است یا از حد انتظار بیشتر است. خارج از شهر معمولاً ۱۵۰ تا ۲۵۰ متر قبل از خطر نصب می‌شوند؛ اگر فاصله فرق کند روی تابلوی زیرین نوشته می‌شود. داخل شهر می‌توانند نزدیک‌تر و بدون ذکر فاصله باشند. با دیدن آن‌ها سرعت را کم کنید و آماده‌ی واکنش باشید.',
    'Three Danish warning signs on short grey poles at slightly different heights: white triangles with a red border, point up, with simple black symbols (a deer, a curve arrow, an exclamation mark).',
    ['A11',
     n('A12.1', 'Farligt vejkryds, hvor den krydsende trafik har ubetinget vigepligt (sidevej fra højre)', 'تقاطع خطرناک با فرعی از راست (نوعی از A 11)',
       'نوعی از تابلوی A 11: تقاطعی با دید کم در پیش است که جاده‌ی فرعی‌اش فقط از **سمت راست** به جاده‌ی شما وصل می‌شود و ترافیک آن فرعی باید بی‌قید و شرط به شما راه بدهد. شما حق تقدم دارید، ولی با احتیاط نزدیک شوید. در مقررات فعلی این طرح جزو همان A 11 است، نه تابلویی جدا.',
       TRI + 'a thick vertical black bar (the priority road) with a thinner black bar joining it from the right only.'),
     'A16', 'A17', 'A18', 'A19', 'A20', 'A21', 'A22', 'A23', 'A26', 'A27', 'A31', 'A33', 'A34', 'A35', 'A36', 'A37',
     n('A38', 'Lunke', 'گودی جاده (جمع شدن آب)', 'جاده در اینجا گود می‌شود و در باران شدید ممکن است آب روی سواره‌رو جمع شود. سرعت را کم کنید تا خودرو روی آب سُر نخورد (آکواپلنینگ).',
       TRI + 'a black road surface line that dips down into a shallow hollow in the middle.'),
     'A39', 'A41.1',
     n('A41.2', 'Venstresving', 'پیچ خطرناک به چپ', 'پیچ تندی به **چپ** در پیش است. قبل از پیچ سرعت را کم کنید.',
       TRI + 'a thick black arrow-less road line going up and bending sharply to the left.'),
     'A42.1',
     n('A42.2', 'Flere sving, det første til venstre', 'چند پیچ پشت‌سرهم، اولی به چپ', 'چند پیچ پشت‌سرهم در پیش است که اولی به **چپ** است. طول بخش پیچ‌دار ممکن است روی تابلوی زیرین آمده باشد.',
       TRI + 'a thick black winding line going up, first bending left, then right.'),
     'A43.1',
     n('A43.2', 'Indsnævret vej i venstre side', 'باریک شدن جاده از سمت چپ', 'جاده از سمت **چپ** باریک می‌شود. به ترافیک روبه‌رو و دوچرخه‌سوارها توجه کنید.',
       TRI + 'two vertical black lines; the left one bends inwards towards the right one, the right one stays straight.'),
     n('A43.3', 'Indsnævret vej i højre side', 'باریک شدن جاده از سمت راست', 'جاده از سمت **راست** باریک می‌شود. اگر لازم است، به ترافیک پشت یا کنار خود راه بدهید.',
       TRI + 'two vertical black lines; the right one bends inwards towards the left one, the left one stays straight.'),
     'A44', 'A46.1',
     n('A46.2', 'Stejl stigning', 'سربالایی تند', 'سربالایی تند در پیش است؛ عدد شیب را به درصد نشان می‌دهد. ممکن است لازم باشد دنده‌ی سنگین‌تری بگیرید و حواستان به خودروهای کُند باشد.',
       TRI + 'a black right-angled wedge rising from left to right (an uphill slope) with "10 %" written above the slope.'),
     n('A71', 'Letbane', 'تراموا (letbane)؛ تابلوی قدیمی', 'ریل تراموا از جاده رد می‌شود یا در کنار آن است. تراموا تقریباً بی‌صداست و نمی‌تواند سریع بایستد؛ با احتیاط نزدیک شوید. این تابلو در مقررات فعلی (۲۰۲۳) نیامده است؛ امروز ریل تراموا در تقاطع با تابلوی زیرین **UB 11,3** زیر تابلوی «حق تقدم بدهید» نشان داده می‌شود.',
       TRI + 'a black modern light-rail tram seen from the side with a small pantograph on its roof.'),
     'A72', 'A73', 'A74.1',
     n('A74.2', 'Krydsmærke for flersporet jernbaneoverkørsel', 'صلیب گذرگاه راه‌آهن چندخطه', 'درست کنار گذرگاه راه‌آهنی که **بیش از یک ریل** دارد نصب می‌شود. وقتی یک قطار رد شد، ممکن است قطار دیگری از ریل دیگر بیاید؛ تا مطمئن نشده‌اید عبور نکنید.',
       'a double St Andrew\'s cross: two red-and-white striped diagonal boards crossing in an X, with a second, smaller pair of crossed boards directly below.'),
     'A75',
     n('A91', 'Oplukkelig bro', 'پل متحرک', 'پلی در پیش است که برای عبور کشتی باز می‌شود. وقتی چراغ‌ها روشن یا راه‌بند پایین است بایستید.',
       TRI + 'a black bridge deck with one half lifted up at an angle above black water waves.'),
     'A92', 'A95',
     n('A96', 'Lavtgående fly', 'پرواز هواپیما در ارتفاع کم', 'نزدیک فرودگاه هواپیماها در ارتفاع کم پرواز می‌کنند. صدای ناگهانی بلند ممکن است شما را غافلگیر کند؛ تمرکزتان را حفظ کنید.',
       TRI + 'a black aeroplane seen from above, flying to the right.'),
     n('A97', 'Lavtgående helikopter', 'پرواز هلیکوپتر در ارتفاع کم', 'هلیکوپترها اینجا در ارتفاع کم پرواز می‌کنند (مثلاً نزدیک بیمارستان). صدا و باد شدید ممکن است غافلگیرکننده باشد.',
       TRI + 'a black helicopter seen from the side.'),
     'A99'])

# ---------------------------------------------------------------- B
cat('B', 'تابلوهای حق تقدم', 'مثلث وارونه، ایست و لوزی جاده‌ی اصلی.',
    'این تابلوها درست در جایی نصب می‌شوند که قاعده‌ی حق تقدم از آنجا اعتبار دارد. حق تقدم «مطلق» (ubetinget vigepligt) یعنی باید به همه‌ی ترافیکِ جاده‌ای که واردش می‌شوید، از هر دو طرف، راه بدهید. یادتان باشد: اگر چراغ راهنمایی تقاطع کار کند، چراغ بر تابلوهای حق تقدم مقدم است.',
    'Three Danish priority signs on short grey poles: an inverted white triangle with a red border (give way), a red octagon (stop, blank without letters) and a white diamond with a yellow centre and black edge (main road).',
    ['B11', 'B13',
     n('B13', 'Stop (historisk udformning)', 'ایست (طرح قدیمی)', 'طرح قدیمی تابلوی ایست: دایره‌ی قرمز با مثلث وارونه و کلمه‌ی STOP. همان معنی را دارد: **توقف کامل** پشت خط ایست و راه دادن بی‌قید و شرط. امروز تابلوی ایست هشت‌ضلعی است (B 13)؛ کنار گذرگاه راه‌آهن هم همان تابلوی هشت‌ضلعی زیر صلیب گذرگاه (A 74) نصب می‌شود.',
       'a round sign with a broad red border and a white centre containing an inverted red-bordered white triangle with the black word "STOP" in its upper part.'),
     'B15', 'B16', 'B17', 'B18', 'B19'])

# ---------------------------------------------------------------- C
cat('C', 'تابلوهای ممنوعیت', 'دایره با حاشیه‌ی قرمز؛ چه کاری ممنوع است.',
    'دایره با حاشیه‌ی قرمز و علامت سیاه. معمولاً درست در محلی نصب می‌شوند که ممنوعیت از آنجا شروع می‌شود. ممنوعیت معمولاً **تا تقاطع بعدی** اعتبار دارد، مگر زودتر با تابلوی پایان لغو شود یا تابلوی زیرین چیز دیگری بگوید. استثنا: سبقت ممنوع و سرعت مجاز تا تابلوی پایان ادامه دارند. تابلوی زیرین می‌تواند ممنوعیت را محدود کند، مثلاً «Gælder kun gennemkørsel» (فقط عبور) یا «Varekørsel tilladt» (رساندن بار مجاز).',
    'Three Danish prohibition signs on short grey poles: round white signs with a red border, one with a black "60", one with a red and a black car side by side (no overtaking), and a blue one with a red cross (no stopping).',
    [n('C11.1', 'Højresving forbudt', 'گردش به راست ممنوع', 'در تقاطع بعدی نباید به **راست** بپیچید.',
       BAN + 'a black arrow going up and turning right.'),
     'C11.2', 'C12', 'C19', 'C21', 'C22.1',
     n('C22.2', 'Motorcykel og stor knallert forbudt', 'ورود موتورسیکلت و موتور بزرگ ممنوع', 'موتورسیکلت و موپد بزرگ (۴۵ کیلومتری) نباید وارد شوند.',
       BAN + 'a black motorcycle seen from the side.'),
     'C23.1',
     n('C23.2', 'Bus forbudt', 'ورود اتوبوس ممنوع', 'اتوبوس (خودروی سواری با بیش از ۸ صندلی مسافر) نباید وارد شود.',
       BAN + 'a black bus seen from the side.'),
     n('C23.3', 'Kørsel med farligt gods forbudt', 'ورود خودروی حامل کالای خطرناک ممنوع', 'خودروهایی که کالای خطرناک (ADR، با پلاک نارنجی) حمل می‌کنند نباید وارد شوند؛ مثلاً قبل از تونل.',
       CIR + 'a plain orange rectangle (the ADR plate) above a small black lorry rear, without a red diagonal bar.'),
     n('C24.1', 'Traktor og motorredskab forbudt', 'ورود تراکتور و ماشین‌آلات موتوری ممنوع', 'تراکتور و ماشین‌آلات موتوری (motorredskab) نباید وارد شوند.',
       BAN + 'a black farm tractor seen from the side.'),
     n('C24.2', 'Hestevogn og lignende forbudt', 'ورود درشکه و گاری ممنوع', 'درشکه و وسایلی که با حیوان کشیده می‌شوند نباید وارد شوند.',
       BAN + 'a black horse pulling a small two-wheeled cart with a driver.'),
     'C25.1',
     n('C25.2', 'Lille knallert forbudt', 'ورود موپد کوچک ممنوع', 'موپد کوچک (۳۰ کیلومتری) نباید وارد شود. دوچرخه مجاز است.',
       BAN + 'a black small moped (scooter) seen from the side.'),
     n('C26.1', 'Ridning og føring af hest forbudt', 'اسب‌سواری و بردن اسب ممنوع', 'سوار بر اسب یا با افسار کشیدن اسب نباید وارد شوید.',
       BAN + 'a black horse with a rider seen from the side.'),
     'C26.2', 'C31',
     n('C32', 'Totalvægt af vogntog', 'حداکثر وزن کل خودرو با یدک', 'خودرو با تریلر یا یدک که وزن کلشان بیش از عدد تابلو باشد نباید وارد شود.',
       CIR + 'the black text "20 t" above a small black lorry with a trailer seen from the side.'),
     n('C35', 'Akseltryk', 'حداکثر بار محور', 'خودرویی که بار روی یک محورش بیش از عدد تابلو باشد نباید وارد شود؛ مثلاً روی پلی ضعیف.',
       CIR + 'the black text "2 t" above a small black arrow pointing down at a black axle with two pairs of wheels seen from behind.'),
     n('C36', 'Bogietryk', 'حداکثر بار محورهای جفت (بوژی)', 'خودرویی که بار روی محورهای جفتش (بوژی) بیش از عدد تابلو باشد نباید وارد شود.',
       CIR + 'the black text "7 t" above a small black arrow pointing down at two black wheels side by side seen from the side.'),
     n('C41', 'Køretøjsbredde', 'حداکثر عرض خودرو', 'خودرویی که عرضش (با بار) بیش از عدد تابلو باشد نباید وارد شود.',
       CIR + 'the black text "2 m" between two small black triangles pointing inwards from the left and the right.'),
     'C42',
     n('C43', 'Køretøjslængde', 'حداکثر طول خودرو', 'خودرو یا خودرو با یدکی که طولش بیش از عدد تابلو باشد نباید وارد شود.',
       CIR + 'a small black lorry seen from the side above a double-headed black arrow with "10 m".'),
     'C51',
     n('C51', 'Overhaling forbudt (historisk udformning)', 'سبقت ممنوع (طرح قدیمی)', 'طرح قدیمی تابلوی سبقت ممنوع با همان معنی (C 51): تا تابلوی پایان سبقت ممنوع سبقت نگیرید. فقط از دوچرخه و موپد کوچک دوچرخ، و از وسیله‌ای که از جاده خارج می‌شود، می‌توانید سبقت بگیرید.',
       BAN + 'two black cars seen from the front side by side.'),
     'C52', 'C53',
     n('C54', 'Ophør af overhaling med lastbil forbudt', 'پایان سبقت ممنوع برای کامیون', 'از اینجا کامیون‌ها دوباره می‌توانند سبقت بگیرند.',
       'a round white sign with a thin grey edge showing a grey lorry and a grey car side by side, crossed by several thin black diagonal lines.'),
     'C55', 'C56', 'C59', 'C61', 'C62', 'C92'])

# ---------------------------------------------------------------- D
_dir = 'فقط در جهتی که فلش نشان می‌دهد می‌توانید بروید.'
cat('D', 'تابلوهای الزامی', 'دایره‌ی آبی؛ چه کاری باید بکنید.',
    'دایره‌ی آبی با علامت سفید. کاری را که باید انجام دهید یا مسیری را که باید استفاده کنید نشان می‌دهند و درست در محلی که الزام از آنجا شروع می‌شود نصب می‌شوند.',
    'Three round blue Danish mandatory signs on short grey poles: one with a white arrow turning right, one with a white bicycle, one with white curved arrows in a circle (roundabout).',
    [n('D11.1', 'Påbudt kørselsretning – ligeud', 'جهت اجباری: فقط مستقیم', 'فقط **مستقیم** می‌توانید بروید؛ گردش به چپ و راست ممنوع است.', BLUE + 'a thick white arrow pointing straight up.'),
     n('D11.2', 'Påbudt kørselsretning – til venstre', 'جهت اجباری: فقط به چپ', 'فقط به **چپ** می‌توانید بروید (مثلاً قبل از تابلو یا جزیره).', BLUE + 'a thick white arrow pointing to the left.'),
     n('D11.3', 'Påbudt kørselsretning – til højre', 'جهت اجباری: فقط به راست', 'فقط به **راست** می‌توانید بروید.', BLUE + 'a thick white arrow pointing to the right.'),
     n('D11.4', 'Påbudt kørselsretning – venstresving', 'جهت اجباری: گردش به چپ', 'در تقاطع بعدی فقط باید به **چپ** بپیچید.', BLUE + 'a thick white arrow going up and turning left.'),
     n('D11.5', 'Påbudt kørselsretning – højresving', 'جهت اجباری: گردش به راست', 'در تقاطع بعدی فقط باید به **راست** بپیچید.', BLUE + 'a thick white arrow going up and turning right.'),
     n('D11.6', 'Påbudt kørselsretning – ligeud eller til venstre', 'جهت اجباری: مستقیم یا چپ', 'فقط **مستقیم یا به چپ** می‌توانید بروید؛ گردش به راست ممنوع است.', BLUE + 'a white arrow pointing straight up with a branch turning left.'),
     n('D11.7', 'Påbudt kørselsretning – ligeud eller til højre', 'جهت اجباری: مستقیم یا راست', 'فقط **مستقیم یا به راست** می‌توانید بروید؛ گردش به چپ ممنوع است.', BLUE + 'a white arrow pointing straight up with a branch turning right.'),
     n('D11.8', 'Påbudt kørselsretning – til venstre eller højre', 'جهت اجباری: چپ یا راست', 'فقط به **چپ یا راست** می‌توانید بروید؛ مستقیم رفتن ممنوع است.', BLUE + 'a white arrow coming up from the bottom and splitting into two branches, one turning left and one turning right.'),
     'D12',
     n('D15.2', 'Påbudt passage – venstre side', 'عبور اجباری از سمت چپ', 'باید از سمت **چپ** تابلو (یا مانع و جزیره‌ای که رویش است) عبور کنید؛ مثلاً در کارگاه جاده‌ای.', BLUE + 'a thick white arrow pointing diagonally down to the left.'),
     n('D15.3', 'Påbudt passage – højre side', 'عبور اجباری از سمت راست', 'باید از سمت **راست** تابلو (یا جزیره‌ی وسط جاده) عبور کنید.', BLUE + 'a thick white arrow pointing diagonally down to the right.'),
     'D16', 'D21', 'D22',
     n('D23', 'Ridesti', 'مسیر اسب‌سواری', 'مسیری فقط برای اسب‌سواران. دیگران (پیاده، دوچرخه، خودرو) نباید از آن استفاده کنند.', BLUE + 'a white horse with a rider seen from the side.'),
     'D26',
     n('D26.1', 'Delt sti – gående og ridende', 'مسیر تقسیم‌شده: پیاده و اسب‌سوار', 'مسیر دو بخش دارد: یک طرف برای **عابران پیاده** و طرف دیگر برای **اسب‌سواران**؛ هر کدام فقط از بخش خودش استفاده کند.', BLUE + 'a vertical white line splitting the circle; on the left two white walking people, on the right a white horse with a rider.'),
     n('D26.2', 'Delt sti – cyklende og gående', 'مسیر تقسیم‌شده: دوچرخه و پیاده', 'مسیر دو بخش دارد: سمت چپ برای **دوچرخه** و سمت راست برای **عابران پیاده**؛ ترتیب علامت‌ها همان ترتیب بخش‌های مسیر است.', BLUE + 'a vertical white line splitting the circle; on the left a white bicycle, on the right two white walking people.'),
     n('D26.3', 'Delt sti – ridende, gående og cyklende', 'مسیر تقسیم‌شده: اسب‌سوار، پیاده و دوچرخه', 'یک بخش برای **اسب‌سواران** و بخش دیگر برای **عابران پیاده و دوچرخه‌سواران** مشترک است.', BLUE + 'a vertical white line; on the left a white horse with a rider; on the right two walking people above a bicycle.'),
     n('D26.4', 'Delt sti – gående og cyklende samt ridende', 'مسیر تقسیم‌شده: پیاده و دوچرخه / اسب‌سوار', 'یک بخش برای **عابران پیاده و دوچرخه** و بخش دیگر برای **اسب‌سواران** است.', BLUE + 'a vertical white line; on the left two walking people above a bicycle; on the right a white horse with a rider.'),
     n('D26.5', 'Delt sti – ridende og gående', 'مسیر تقسیم‌شده: اسب‌سوار و پیاده', 'سمت چپ برای **اسب‌سواران** و سمت راست برای **عابران پیاده** است.', BLUE + 'a vertical white line; on the left a white horse with a rider, on the right two white walking people.'),
     'D27',
     n('D27.1', 'Fællessti – gående, cyklende og ridende', 'مسیر مشترک: پیاده، دوچرخه و اسب‌سوار', 'مسیری مشترک برای **عابران پیاده، دوچرخه‌سواران و اسب‌سواران**. همه با ملاحظه‌ی یکدیگر از آن استفاده می‌کنند.', BLUE + 'a white horse with a rider, two walking people and a bicycle together without a dividing line.'),
     'D55',
     n('D56', 'Ophør af mindste hastighed', 'پایان حداقل سرعت', 'از اینجا الزام حداقل سرعت تمام می‌شود.', BLUE + 'a white number "50" crossed by a red diagonal bar.')])

# ---------------------------------------------------------------- E
cat('E', 'تابلوهای اطلاع‌رسانی و منطقه', 'مستطیل آبی؛ اطلاعات و قواعد یک منطقه.',
    'مستطیل یا مربع، معمولاً آبی با علامت سفید. اطلاعات یا قواعد ویژه‌ی یک منطقه را نشان می‌دهند. تابلوهای «منطقه» (مثل بزرگراه، داخل شهر، خیابان پیاده، زون) قواعدشان را تا تابلوی پایانِ همان منطقه حفظ می‌کنند.',
    'Three blue square Danish information signs on short grey poles: one with a big white letter P, one with a white T shape with a red top bar (dead end), one green with a white motorway symbol.',
    [n('E11', 'Ophængt pilafmærkning', 'فلش‌های خطوط (آویزان بالای جاده)', 'تابلوهای کوچک آبی با فلش سفید که بالای هر خط نصب می‌شوند و نشان می‌دهند از هر خط به کدام جهت می‌توان رفت. خطی را انتخاب کنید که با مسیرتان جور است.',
       'a row of small blue square signs, each with one white lane arrow (left, straight, right, straight-or-left), as hung above the lanes.'),
     n('E15', 'Vognbaner ved kryds', 'خطوط در تقاطع پیش رو', 'نشان می‌دهد در تقاطع پیش رو چند خط هست و هر خط به کدام جهت می‌رود. از قبل در خط درست قرار بگیرید.',
       RECT + 'three white lane arrows side by side from the bottom: left lane turning left, middle lane straight, right lane straight and right.'),
     n('E16.1', 'Vognbaneforløb med sammenfletning', 'مسیر خطوط با یکی شدن', 'نشان می‌دهد جلوتر دو خط یکی می‌شوند و باید به نوبت (زیپی) ادغام شوید.',
       RECT + 'two white lane lines on the left that merge into one, beside a straight lane arrow.'),
     n('E16.2', 'Vognbaneforløb med vognbaneskift', 'مسیر خطوط با تغییر خط', 'نشان می‌دهد جلوتر خطی تمام می‌شود و باید خط عوض کنید؛ کسی که خط عوض می‌کند باید به ترافیک خط دیگر راه بدهد.',
       RECT + 'two white lane arrows where the right lane ends and bends into the left lane, with a broken white line between them.'),
     'E17', 'E18',
     n('E18.1.1', 'Blind vej – undtagen for cyklister', 'بن‌بست، جز برای دوچرخه', 'برای خودروها بن‌بست است، ولی **دوچرخه‌سوارها** می‌توانند از انتهای آن عبور کنند.',
       RECT + 'a white vertical bar with a red horizontal bar on top (a T, dead end) and a small white bicycle above the red bar.'),
     n('E18.1.2', 'Blind vej – sti fortsætter til højre', 'بن‌بست؛ مسیر پیاده و دوچرخه از راست ادامه دارد', 'برای خودروها بن‌بست است، ولی مسیر **پیاده و دوچرخه** از سمت راست ادامه پیدا می‌کند.',
       RECT + 'a white T with a red top bar (dead end); a thin white line branches off to the right with small white pedestrian and bicycle symbols.'),
     n('E18.1.3', 'Blind vej – sti fortsætter til venstre', 'بن‌بست؛ مسیر پیاده و دوچرخه از چپ ادامه دارد', 'برای خودروها بن‌بست است، ولی مسیر **پیاده و دوچرخه** از سمت چپ ادامه پیدا می‌کند.',
       RECT + 'a white T with a red top bar (dead end); a thin white line branches off to the left with small white pedestrian and bicycle symbols.'),
     'E19',
     n('E21.1', 'Anbefalet rute for cyklister', 'مسیر پیشنهادی برای دوچرخه', 'مسیر پیشنهادیِ دوچرخه‌سواران (مثلاً یک مسیر گردشگری دوچرخه). فقط پیشنهاد است: اجباری نیست و برای دیگران هم ممنوعیتی نمی‌سازد. در بخش‌هایی از این مسیرها ممکن است موپد کوچک ممنوع باشد.', RECT + 'a white bicycle seen from the side.'),
     n('E21.2', 'Anbefalet rute for vandrere', 'مسیر پیشنهادی برای پیاده‌روی', 'مسیر پیشنهادی برای پیاده‌روی و گردش (vandrere)؛ اجباری نیست.', RECT + 'a white walking person.'),
     n('E21.3', 'Anbefalet rute for ridende', 'مسیر پیشنهادی برای اسب‌سواران', 'مسیر پیشنهادیِ اسب‌سواران.', RECT + 'a white horse with a rider.'),
     n('E21.4', 'Anbefalet rute for lille knallert', 'مسیر پیشنهادی برای موپد کوچک', 'مسیر پیشنهادیِ موپدهای کوچک (۳۰ کیلومتری).', RECT + 'a white small moped seen from the side.'),
     n('E22.1', 'Anbefalet rute for lastbiler', 'مسیر پیشنهادی برای کامیون', 'مسیر پیشنهادیِ کامیون‌ها؛ مثلاً برای دور زدن مرکز شهر.', RECT + 'a white lorry seen from the side.'),
     n('E22.2', 'Anbefalet rute for køretøjer med farligt gods', 'مسیر پیشنهادی برای حمل کالای خطرناک', 'مسیر پیشنهادیِ خودروهای حامل کالای خطرناک (با پلاک نارنجی).', RECT + 'a plain orange rectangle above a small white lorry rear.'),
     n('E22.3', 'Anbefalet rute for traktor og motorredskab', 'مسیر پیشنهادی برای تراکتور', 'مسیر پیشنهادیِ تراکتورها و ماشین‌آلات موتوری کُند.', RECT + 'a white farm tractor seen from the side.'),
     n('E22.4', 'Anbefalet rute for bus', 'مسیر پیشنهادی برای اتوبوس', 'مسیر پیشنهادیِ اتوبوس‌ها.', RECT + 'a white bus seen from the side.'),
     n('E23', 'Vejledning for invalide', 'راهنمای افراد دارای معلولیت', 'مسیر یا امکاناتی که برای افراد دارای معلولیت حرکتی (ویلچر) مناسب است.', RECT + 'a white wheelchair user symbol.'),
     n('E24', 'Vejledning for synshandicappede', 'راهنمای افراد نابینا و کم‌بینا', 'مسیری که برای افراد نابینا یا کم‌بینا مناسب‌سازی شده است. احتمال حضور عابر با عصای سفید بیشتر است.', RECT + 'a white walking person holding a long thin white cane.'),
     n('E26.1', 'Fodgængertunnel eller fodgængerbro', 'تونل یا پل عابر پیاده', 'محل تونل یا پل عابر پیاده را نشان می‌دهد تا عابران از آن برای عبور ایمن استفاده کنند.', RECT + 'a white person walking up a white staircase.'),
     n('E30', 'Letbaneholdeplads', 'ایستگاه تراموا', 'محل ایستگاه تراموا (letbane). مراقب مسافرانی باشید که سوار و پیاده می‌شوند.', 'a yellow rectangular sign with a thick black border showing a black modern tram seen from the side with a pantograph.'),
     'E31',
     n('E32', 'Taxiholdeplads', 'ایستگاه تاکسی', 'محل توقف مخصوص تاکسی‌ها. خودروهای دیگر نباید آنجا بایستند.', 'a blue rectangular sign with a thin white edge and the white word "TAXI".'),
     n('E33.1', 'Parkering', 'پارکینگ', 'محل مجاز برای پارک. تابلوی زیرین ممکن است مدت مجاز، ساعت یا لزوم کارت پارک (P-skive) را بگوید.', RECT + 'a large white letter "P".'),
     n('E33.2', 'Indendørs parkering', 'پارکینگ سرپوشیده', 'پارکینگ طبقاتی یا سرپوشیده.', RECT + 'a large white letter "P" under a white roof shape.'),
     'E34', 'E37', 'E39',
     n('E40', 'Anbefalet hastighed ophører', 'پایان سرعت پیشنهادی', 'سرعت پیشنهادی از اینجا تمام می‌شود.', RECT + 'a white number "60" crossed by a red diagonal bar.'),
     n('E41', 'Hastighedsangivelse for frakørsel', 'سرعت پیشنهادی خروجی', 'سرعتی که برای پیچِ خروجی پیش رو (مثلاً از بزرگراه) توصیه می‌شود.', 'a white square sign with a thin black border showing a red arrow curving up to the right and the black number "40".'),
     'E42', 'E43',
     n('E44', 'Motorvej ophører', 'پایان بزرگراه', 'بزرگراه اینجا تمام می‌شود و قواعد معمول جاده دوباره اعتبار دارند (مثلاً سرعت مجاز عمومی).', 'a green rectangular sign with a white motorway symbol (two lanes under a bridge), crossed by a red diagonal bar.'),
     n('E45', 'Motortrafikvej ophører', 'پایان جاده‌ی موتوری', 'جاده‌ی موتوری (motortrafikvej) اینجا تمام می‌شود و قواعد ویژه‌ی آن دیگر اعتبار ندارند.', RECT + 'a white car seen from the front, crossed by a red diagonal bar.'),
     n('E47', 'Cykelgade', 'خیابان دوچرخه', 'منطقه‌ای که **سواره‌روی آن مخصوص دوچرخه و موپد کوچک** است. وسایل دیگر فقط وقتی می‌توانند وارد شوند که تابلوی زیرین (مثلاً «Kørsel tilladt») اجازه بدهد؛ آن وقت با سرعتی **هم‌اندازه‌ی دوچرخه‌ها** (معمولاً کمتر از ۳۰ کیلومتر بر ساعت)، با احتیاط ویژه و بدون مزاحمت برای آن‌ها برانید. پارک فقط در جاهای مشخص‌شده مجاز است.', 'a blue rectangle with a white bicycle above the black word "Zone" on a white panel.'),
     n('E48', 'Ophør af cykelgade', 'پایان خیابان دوچرخه', 'خیابان دوچرخه اینجا تمام می‌شود.', 'the cycle-street sign drawn in grey and crossed by several thin black diagonal lines.'),
     'E49',
     n('E50', 'Ophør af gågade', 'پایان خیابان پیاده', 'خیابان پیاده اینجا تمام می‌شود.', 'the pedestrian-street sign drawn in grey and crossed by several thin black diagonal lines.'),
     'E51',
     n('E52', 'Ophør af opholds- og legeområde', 'پایان محدوده‌ی بازی و اقامت', 'محدوده‌ی بازی و اقامت اینجا تمام می‌شود. هنگام خروج از آن به ترافیک دیگر راه بدهید.', 'the play-and-living area sign drawn in grey and crossed by several thin black diagonal lines.'),
     'E53',
     n('E54', 'Ophør af område med fartdæmpning', 'پایان محدوده‌ی کاهش سرعت', 'محدوده‌ی کاهش سرعت اینجا تمام می‌شود.', 'the speed-reduced zone sign drawn in grey and crossed by several thin black diagonal lines.'),
     'E55', 'E56',
     n('E68.2', 'Zonetavle – standsning forbudt', 'زون توقف ممنوع', 'در **کل منطقه** توقف ممنوع است تا تابلوی پایان زون.', 'a white square sign with a thin black border: a round blue sign with a red border and a red X in the upper half and the black word "Zone" below.'),
     n('E68.3', 'Parkeringszone', 'زون پارک', 'قاعده‌ی پارکی که روی تابلو یا تابلوی زیرین است در **کل منطقه** اعتبار دارد.', 'a white square sign with a thin black border: a blue square with a white "P" in the upper half and the black word "Zone" below.'),
     n('E68.4', 'Zone med hastighedsbegrænsning', 'زون محدودیت سرعت', 'سرعت مجاز روی تابلو در **کل منطقه** اعتبار دارد تا تابلوی پایان زون.', 'a white square sign with a thin black border: a round red-bordered speed sign with "40" in the upper half and the black word "Zone" below.'),
     n('E68.9', 'Miljøzonetavle', 'زون محیط‌زیستی', 'در زون محیط‌زیستی، خودروهای دیزلی سنگین (و از ۲۰۲۲ سواری‌های دیزلی قدیمی) باید استاندارد آلایندگی مشخصی داشته باشند.', 'a white tall rectangular sign: a round red-bordered empty prohibition sign above a small text box and the black word "Miljøzone".'),
     n('E69', 'Ophør af zone', 'پایان زون', 'قاعده‌ی زون (مثلاً توقف ممنوع) اینجا تمام می‌شود.', 'a white square sign with a grey round crossed-out symbol above the grey word "Zone", all crossed by several thin black diagonal lines.'),
     n('E69.3', 'Ophør af parkeringszone', 'پایان زون پارک', 'زون پارک اینجا تمام می‌شود.', 'the parking-zone sign drawn in grey and crossed by several thin black diagonal lines.'),
     n('E69.4', 'Ophør af fartbegrænset zone', 'پایان زون محدودیت سرعت', 'زون محدودیت سرعت اینجا تمام می‌شود و سرعت مجاز عمومی دوباره اعتبار دارد.', 'the 40-zone sign drawn in grey and crossed by several thin black diagonal lines.'),
     n('E69.5', 'Ophør af zone med lastbilforbud', 'پایان زون ممنوعیت کامیون', 'زونی که ورود کامیون در آن ممنوع بود اینجا تمام می‌شود.', 'a zone sign with a grey round lorry-prohibition sign above the grey word "Zone", crossed by several thin black diagonal lines.'),
     n('E69.9', 'Ophør af miljøzone', 'پایان زون محیط‌زیستی', 'زون محیط‌زیستی اینجا تمام می‌شود.', 'the environmental-zone sign drawn in grey and crossed by several thin black diagonal lines.'),
     n('E70', 'Zoneoplysning', 'اطلاعات زون پارک', 'اطلاعات بیشتری درباره‌ی قواعد پارکِ زون (مثلاً جای دستگاه پرداخت) می‌دهد.', RECT + 'a white letter "P" with the small word "info" below it.'),
     n('E80', 'Generelle hastighedsbegrænsninger', 'سرعت‌های مجاز عمومی دانمارک', 'در مرزهای ورودی کشور نصب می‌شود و سرعت‌های عمومی را نشان می‌دهد: داخل شهر **۵۰**، خارج شهر **۸۰** و بزرگراه **۱۳۰** کیلومتر بر ساعت.', 'a tall blue rectangular sign: at the top a white bar with abstract letters, below it three rows, each with a small white symbol (town, open road, motorway) beside a round red-bordered speed sign "50", "80" and "130".'),
     'E90',
     n('E91', 'Fartviser', 'نمایشگر سرعت', 'سرعت فعلی شما را نشان می‌دهد تا اگر از حد مجاز بیشتر است، آن را کم کنید. جریمه نمی‌کند.', 'a white rectangular sign with a grey frame showing two small round lamps and a black digital display with the number "44" and "km".'),
     n('E92', 'Variabel teksttavle', 'تابلوی متغیر الکترونیکی', 'تابلوی الکترونیکی که پیام‌های لحظه‌ای مثل تصادف، صف یا کار جاده‌ای را نشان می‌دهد. به پیامش عمل کنید.', 'a black rectangular electronic sign with two short lines of glowing yellow dot-matrix text drawn as abstract dots.'),
     n('E93', 'Videoovervågning', 'دوربین نظارتی', 'منطقه با دوربین تحت نظارت تصویری است.', RECT + 'a white surveillance camera on a short arm.')])

# ---------------------------------------------------------------- F
cat('F', 'تابلوهای راهنمای مسیر (فلش‌دار)', 'فلش‌هایی که جهت شهرها و اماکن را نشان می‌دهند.',
    'تابلوهای فلش‌دار جهت رسیدن به مقصدها را نشان می‌دهند. رنگ تابلو نوع مقصد را می‌گوید: **سفید با نوشته و حاشیه‌ی قرمز** برای مقصدهای معمولی (شهرها و جاده‌ها)، **سبز** برای مقصدهایی که مسیرشان از **بزرگراه** می‌گذرد، **سفید با نوشته‌ی آبی** برای مقصدهای خدماتی و تجاری (ایستگاه، فرودگاه، جاذبه، هتل، شرکت‌ها)، **آبی با P** برای پارکینگ، **آبی** برای مسیرهای دوچرخه و پیاده و **زرد** برای مسیر موقت. عدد کنار نام، فاصله به کیلومتر است.',
    'Several Danish arrow-shaped direction signs on one grey pole pointing left and right, in white with a red border, green, blue and yellow; words drawn as abstract bars, no readable text.',
    [n('F11', 'Hvid/rød pilvejviser', 'تابلوی فلش‌دار سفید/قرمز', 'جهت و فاصله‌ی مقصدهایی که از جاده‌های معمولی به آن‌ها می‌رسید. شماره‌ی مسیر در کادر کوچک کنار نام است.', GUIDE + 'arrow-shaped, white with a red border, red abstract text bars and a small boxed route number on the left, pointing right.'),
     n('F12', 'Grøn/hvid pilvejviser', 'تابلوی فلش‌دار سبز', 'جهت مقصدهایی که مسیرشان از **بزرگراه** می‌گذرد. شماره‌ی بزرگراه (مثل E45) روی آن است.', GUIDE + 'arrow-shaped, green with a white edge, white abstract text bars, a small white motorway symbol and a boxed route number, pointing right.'),
     n('F13', 'Hvid/blå pilvejviser', 'تابلوی فلش‌دار سفید/آبی', 'جهت مقصدهای **خدماتی و تجاری**: ایستگاه قطار، فرودگاه، بندر، جاذبه‌ها و دیدنی‌ها، هتل و کمپینگ، شرکت‌ها و مانند آن. اغلب علامت خدماتی (گروه M) هم روی آن است.', GUIDE + 'two arrow-shaped signs, white with a blue border and blue abstract text bars, pointing left.'),
     n('F14', 'Midlertidig pilvejviser', 'تابلوی فلش‌دار موقت (زرد)', 'مسیر **موقت**، مثلاً هنگام کار جاده‌ای یا برای یک رویداد. بر تابلوهای معمولی مقدم است.', GUIDE + 'arrow-shaped, yellow with a black border and black abstract text bars, pointing right.'),
     n('F16', 'Frakørselsvejviser', 'تابلوی جهت خروجی', 'درست سر خروجی نصب می‌شود و نشان می‌دهد این خروجی به کدام مقصدها می‌رود.', GUIDE + 'white with a red border, a yellow box with a black number, two lines of abstract text and a red arrow pointing up to the right.'),
     n('F18', 'Tabelvejviser', 'تابلوی جدولی جهت‌ها', 'چند مقصد را در یک تابلو با فلش‌های جداگانه نشان می‌دهد.', GUIDE + 'four stacked white panels with red borders, each with a red arrow (up, up, left, right) and abstract text bars.'),
     n('F21.1', 'Stirutetavle', 'تابلوی مسیر دوچرخه', 'شماره‌ی مسیر دوچرخه‌سواری را نشان می‌دهد.', 'a blue square sign with rounded corners: a white bicycle above a red square with the white number "4".'),
     n('F21.2', 'Stipilvejviser', 'فلش راهنمای مسیر دوچرخه و پیاده', 'جهت و فاصله‌ی مقصدها برای دوچرخه‌سواران و دیگر کاربران مسیرهای ویژه.', GUIDE + 'two arrow-shaped blue signs with white abstract text bars and small white bicycle and horse-rider symbols.'),
     n('F21.3', 'Stitabelvejviser', 'تابلوی جدولی مسیر دوچرخه', 'چند مقصد برای دوچرخه‌سواران در یک تابلو با فلش‌های جدا.', GUIDE + 'a blue rectangular board with white rows, each with a small bicycle symbol, a white arrow and abstract text bars.'),
     n('F21.4', 'Stidiagramtavle', 'نقشه‌ی مسیر دوچرخه', 'نقشه‌ی ساده‌ی تقاطع پیش رو برای دوچرخه‌سواران با شماره‌ی مسیرها.', 'a blue square board showing a white diagram of a roundabout with roads leaving it, small bicycle route number boxes at the ends.'),
     n('F30', 'Pilvejviser til virksomhed', 'تابلوی جهت کسب‌وکار (سیاه، قدیمی)', 'طرح قدیمیِ تابلوی جهت یک کسب‌وکار یا جاذبه‌ی محلی، با زمینه‌ی سیاه. در مقررات فعلی (۲۰۲۳) نیامده است؛ امروز برای کسب‌وکارها و جاذبه‌ها تابلوی سفید با نوشته‌ی آبی (F 13) به کار می‌رود.', GUIDE + 'arrow-shaped, black with white abstract text bars and a white number, pointing right.'),
     n('F33.1', 'Parkeringspilvejviser', 'فلش راهنمای پارکینگ', 'جهت پارکینگ را نشان می‌دهد.', GUIDE + 'arrow-shaped, blue with a white edge, a white box with a blue "P" and abstract white text bars, pointing right.'),
     n('F33.2', 'Parkeringstabelvejviser', 'تابلوی جدولی راهنمای پارکینگ', 'تابلوی مستطیلیِ راهنمای پارکینگ، درست قبل از تقاطع یا در آن: برای هر جهت یک ردیف با فلش و نام پارکینگ. ممکن است تعداد جاهای خالی، یا «Fri» (جا هست)، «Optaget» (پر) و «Lukket» (بسته) را هم نشان دهد.', GUIDE + 'rectangular, blue with a white edge, one row with a white arrow pointing left, a white box with a blue "P" and abstract white text bars.'),
     n('F34.1', 'Omkørselsrute', 'مسیر انحرافی', 'شماره‌ی مسیر انحرافی، مثلاً وقتی بزرگراه بسته است. همین علامت را دنبال کنید.', 'a small green sign with a white motorway symbol above a white hexagon with a green number, and a small white arrow.'),
     n('F34.2', 'Pilvejviser for omkørselsrute', 'فلش مسیر انحرافی', 'جهت مسیر انحرافی را نشان می‌دهد.', GUIDE + 'arrow-shaped, white with a green edge, a small green route box and a green hexagon number, pointing right.'),
     n('F34.3', 'Diagramorienteringstavle for omkørselsrute', 'نقشه‌ی مسیر انحرافی', 'نقشه‌ی ساده‌ی مسیر انحرافی در تقاطع پیش رو.', 'a small green sign with a white diagram of a road and a curved detour arrow with small green hexagon numbers.')])

# ---------------------------------------------------------------- G
cat('G', 'تابلوهای جهت‌یابی پیش از تقاطع', 'نقشه و جدول مسیرها قبل از تقاطع.',
    'این تابلوها **قبل از تقاطع** نصب می‌شوند تا از قبل بدانید برای هر مقصد کدام خط یا کدام جهت را باید انتخاب کنید.',
    'A large Danish blue overhead gantry sign above a road and a smaller white diagram sign with red lines at the roadside; words drawn as abstract bars, no readable text.',
    [n('G11', 'Portalorienteringstavle', 'تابلوی جهت‌یابی روی دروازه', 'بالای خطوط نصب می‌شود و نشان می‌دهد هر خط به کدام مقصد می‌رود.', GUIDE + 'a long blue board on an overhead gantry with white arrows and abstract text above each lane.'),
     n('G14', 'Diagramorienteringstavle', 'نقشه‌ی تقاطع پیش رو', 'نقشه‌ی ساده‌ی تقاطع پیش رو (مثلاً میدان) و مقصدهای هر خروجی.', GUIDE + 'white with a red border, showing a red diagram of a roundabout with three roads leaving it and abstract text at each.'),
     n('G15', 'Vognbaneorienteringstavle', 'تابلوی جهت‌یابی خطوط', 'نشان می‌دهد هر خط در تقاطع پیش رو به کدام مقصد می‌رود.', GUIDE + 'white with a red border, a thick red line going straight up with a branch to the left, abstract text and a yellow route box.'),
     n('G18', 'Tabelorienteringstavle', 'تابلوی جدولی جهت‌یابی', 'چند ردیف مقصد با فلش، قبل از تقاطع.', GUIDE + 'three stacked white panels with coloured borders (blue, red, red), each with an arrow, small symbols and abstract text.')])

# ---------------------------------------------------------------- H
cat('H', 'تابلوهای فاصله و نام مکان', 'فاصله تا شهرها، نام مکان و مرزها.',
    'فاصله تا شهرهای پیش رو و نام مکان‌ها، مناطق و مرزها را نشان می‌دهند. تابلوی نام مکان (H 45) **قاعده‌ی داخل شهر را شروع نمی‌کند**؛ آن کار تابلوی E 55 است.',
    'A blue Danish distance sign with three rows of abstract white text and numbers, beside a smaller blue place-name board; no readable text.',
    [n('H41', 'Afstandstavle', 'تابلوی فاصله', 'فاصله تا مکان‌های بعدیِ همین مسیر را به کیلومتر نشان می‌دهد؛ بیشتر بعد از تقاطع‌های مهم نصب می‌شود. شماره‌ی مسیر بالای آن است و نزدیک‌ترین مکان در پایین.', GUIDE + 'a blue board with yellow route number boxes at the top and three rows of white abstract text with numbers on the right.'),
     n('H42', 'Delt afstandstavle', 'تابلوی فاصله‌ی دوقسمتی', 'آخرین تابلوی فاصله قبل از تقاطع: مکان‌هایی که از جاده‌ی متقاطع یا انشعابی به آن‌ها می‌رسید، در بخش جداگانه‌ی پایین تابلو آمده‌اند.', GUIDE + 'two blue boards one above the other, each with yellow route boxes and rows of white abstract text with numbers.'),
     n('H45', 'Stedtavle', 'تابلوی نام مکان', 'نام روستا یا محل را نشان می‌دهد؛ برخلاف E 55، سرعت داخل شهر را شروع نمی‌کند.', GUIDE + 'a blue rectangular board with a white edge and one word of white abstract text.'),
     n('H46', 'Regionsgrænsetavle', 'تابلوی مرز منطقه (ریگیون)', 'ورود به یکی از پنج منطقه‌ی اداری دانمارک را نشان می‌دهد.', GUIDE + 'a blue rectangular board with two lines of white abstract text.'),
     n('H47', 'Kommunegrænsetavle', 'تابلوی مرز شهرداری', 'ورود به محدوده‌ی یک شهرداری (کمون) را نشان می‌دهد؛ گاهی با نشان آن شهرداری.', GUIDE + 'a brown rectangular board with a small white crest on the left and white abstract text.'),
     n('H51', 'Landegrænsetavle', 'تابلوی مرز کشور', 'ورود به دانمارک را در مرز نشان می‌دهد؛ دایره‌ی ستاره‌های اتحادیه‌ی اروپا روی آن است.', 'a blue rectangular sign with a circle of yellow stars and abstract white text in the middle.')])

# ---------------------------------------------------------------- I
cat('I', 'تابلوهای خروجی بزرگراه', 'سبز یا آبی؛ خروجی‌ها و تقاطع‌های بزرگراه.',
    'در بزرگراه، خروجی‌ها از قبل اعلام می‌شوند: تابلوی **۱۵۰۰ متر**، تابلوی **۵۰۰ متر** و تابلوی سر خروجی. تابلوی آبی یعنی خروجی به جاده‌ی معمولی می‌رود؛ تابلوی سبز یعنی به بزرگراه دیگری (تقاطع بزرگراهی). شماره‌ی خروجی با رنگ **قرمز** در کادر سفید شش‌ضلعی است.',
    'A green Danish motorway sign on a gantry above a motorway announcing an exit, with abstract white text, a white motorway symbol and a yellow number box; no readable text.',
    [n('I11', 'Frakørselsvejviser 0-m tavle', 'تابلوی سر خروجی', 'درست سر خروجی بزرگراه نصب می‌شود؛ فلش مایل یعنی همین‌جا خارج شوید.', GUIDE + 'a blue board with a white number box on the left, two lines of white abstract text and a white arrow pointing up to the right.'),
     n('I12', '500-m frakørselstavle', 'تابلوی ۵۰۰ متر تا خروجی', 'خروجی ۵۰۰ متر دیگر است. به خط راست بروید.', GUIDE + 'a blue board with a white number box, two lines of white abstract text and "500 m" at the bottom.'),
     n('I13', '1500-m frakørselstavle', 'تابلوی ۱۵۰۰ متر تا خروجی', 'خروجی ۱۵۰۰ متر دیگر است؛ وقت دارید آماده‌ی تغییر خط شوید.', GUIDE + 'a tall stack of small blue and green panels with number boxes and abstract white text, "1500 m" at the bottom.'),
     n('I16', 'Frakørselsvejviser 0-m tavle i motorvejskryds', 'سر خروجی در تقاطع بزرگراهی', 'سر خروجی به بزرگراه دیگر (سبز).', GUIDE + 'a green board with a white motorway symbol, a yellow number box, two lines of white abstract text and a white arrow up to the right.'),
     n('I17', '500-m frakørselstavle i motorvejskryds', '۵۰۰ متر تا تقاطع بزرگراهی', 'خروجی به بزرگراه دیگر ۵۰۰ متر دیگر است.', GUIDE + 'a green board with a white motorway symbol, a yellow number box, two lines of white abstract text and "500 m".'),
     n('I18', '1500-m frakørselstavle i motorvejskryds', '۱۵۰۰ متر تا تقاطع بزرگراهی', 'خروجی به بزرگراه دیگر ۱۵۰۰ متر دیگر است.', GUIDE + 'a green board with a white motorway symbol, a yellow number box, two lines of white abstract text and "1500 m".'),
     n('I20', 'Motorvejskryds', 'تابلوی تقاطع بزرگراهی', 'نام تقاطع بزرگراهی را نشان می‌دهد.', GUIDE + 'a green square board with a white symbol of two crossing motorways, one line of white abstract text and a small white number.')])

# ---------------------------------------------------------------- J
cat('J', 'تابلوهای خطوط بزرگراه', 'کدام خط به کدام مقصد می‌رود.',
    'در بزرگراه این تابلوها نشان می‌دهند هر خط به کدام مقصد می‌رود و جلوتر خطوط چطور جدا می‌شوند. زود در خط درست قرار بگیرید تا ناگهانی خط عوض نکنید.',
    'Blue and green Danish motorway lane signs on a gantry, each with white arrows pointing down to a lane and abstract white text; no readable text.',
    [n('J11', 'Anviste vognbaner', 'خطوط مشخص‌شده', 'روی دروازه بالای هر خط نصب می‌شود و مقصد هر خط را نشان می‌دهد.', GUIDE + 'three stacked small green and blue panels with route boxes and abstract white text.'),
     n('J12', 'Forvarsling af vognbaneforløb', 'هشدار تقسیم خطوط', 'نشان می‌دهد جلوتر خطوط چگونه تقسیم می‌شوند و کدام خط به خروجی می‌رود.', GUIDE + 'a blue board with route boxes at the top, two long white arrows straight up and a third bending right to a red-bordered number box, "500 m" at the bottom.'),
     n('J13', 'Diagramorienteringstavle for motorveje', 'نقشه‌ی جدا شدن بزرگراه‌ها', 'نقشه‌ی ساده‌ی جایی که بزرگراه به دو بزرگراه تقسیم می‌شود.', GUIDE + 'a green board with a white Y-shaped diagram of a motorway splitting left and right, route boxes and abstract text at each branch, "1500 m" below.')])

# ---------------------------------------------------------------- K
cat('K', 'تابلوهای تأیید، فاصله و گردشگری در بزرگراه', 'بعد از ورود به بزرگراه و جاذبه‌های گردشگری.',
    'بعد از ورود به بزرگراه، تابلوی تأیید (K 11) نشان می‌دهد در کدام بزرگراه و به کدام سمت هستید. تابلوهای قهوه‌ای جاذبه‌های گردشگری را معرفی می‌کنند.',
    'A green Danish motorway confirmation sign with a route number box and abstract text beside a brown tourist sign with a simple white castle drawing; no readable text.',
    [n('K11', 'Bekræftelsestavle', 'تابلوی تأیید مسیر', 'بعد از ورود به بزرگراه تأیید می‌کند در کدام مسیر هستید و تا مقصد چقدر مانده است.', GUIDE + 'a green board with a white route number box and a row of white abstract text with a number, above a blue panel with a route number and text.'),
     n('K12', 'Afstandstavle', 'تابلوی فاصله در بزرگراه', 'فاصله تا مقصدهای بعدی در بزرگراه.', GUIDE + 'a green board with yellow route number boxes and two rows of white abstract text with numbers.'),
     n('K30', 'Turistoplysningstavle', 'تابلوی جاذبه‌ی گردشگری', 'یک جاذبه‌ی گردشگری نزدیک بزرگراه را معرفی می‌کند (زمینه‌ی قهوه‌ای).', GUIDE + 'a large dark red-brown board with a simple white line drawing of a castle and two lines of white abstract text.')])

# ---------------------------------------------------------------- L
cat('L', 'شماره‌ی مسیرها', 'شماره‌ی جاده‌ها و مسیرهای دوچرخه.',
    'شماره‌ی جاده را نشان می‌دهند تا بتوانید با شماره مسیر را دنبال کنید: **سبز** برای جاده‌های اروپایی (E)، **زرد** برای مسیرهای اصلی، **سفید** برای مسیرهای فرعی، و برای مسیرهای دوچرخه **قرمز** (ملی) یا **آبی** (منطقه‌ای و محلی).',
    'Four small Danish route number plates in a row: a green one, a yellow one, a white one with a black border and a red one, each with abstract numbers drawn as simple bars.',
    [n('L41', 'Rutenummer for Europavej', 'شماره‌ی جاده‌ی اروپایی', 'شماره‌ی جاده‌ی بین‌المللی اروپا، مثل E20 یا E45.', 'two green rectangular plates with a white edge and the white text "E20" and "E45".'),
     n('L42', 'Rutenummer for primære ruter', 'شماره‌ی مسیر اصلی', 'شماره‌ی مسیرهای اصلی کشور (۱ تا ۹۹).', 'two yellow rectangular plates with a black border and black numbers "15" and "11".'),
     n('L43', 'Rutenummer for sekundære ruter', 'شماره‌ی مسیر فرعی', 'شماره‌ی مسیرهای فرعی (۱۰۰ به بالا).', 'two white rectangular plates with a black border and black numbers "189" and "453".'),
     n('L44', 'Rutenummer for ringruter', 'شماره‌ی کمربندی', 'شماره‌ی جاده‌ی کمربندی دور شهر؛ حرف O با یک عدد.', 'a yellow and a white rectangular plate with black borders showing "O 2" and "O 3".'),
     n('L45', 'Rutenummer for cykelruter', 'شماره‌ی مسیر دوچرخه', 'شماره‌ی مسیر دوچرخه: مسیرهای ملی (۱ تا ۱۵) سفید روی **قرمز**، مسیرهای منطقه‌ای و محلی سفید روی **آبی**.', 'a red square plate with a white "3" beside a blue rectangular plate with a white "41".'),
     n('L46', 'Ruteidentifikation for supercykelsti', 'علامت سوپر مسیر دوچرخه', 'نشان «سوپر مسیر دوچرخه»؛ مسیرهای سریع دوچرخه بین شهرها.', 'a round orange symbol shaped like a thick letter C around a small white circle.'),
     n('L47', 'Ruteidentifikation for EuroVelo-cykelrute', 'علامت مسیر دوچرخه‌ی اروپایی', 'شماره‌ی مسیر دوچرخه‌ی EuroVelo که از چند کشور می‌گذرد.', 'a small blue square with a circle of yellow stars around a white number "1".'),
     n('L50', 'Ruteidentifikation for Margueritruten', 'مسیر گردشگری مارگریت', 'نشان مسیر گردشگری «مارگریت» که از مناظر زیبای دانمارک می‌گذرد.', 'a brown square sign with a white daisy flower with a yellow centre.')])

# ---------------------------------------------------------------- M
_s = 'تابلوی خدماتی؛ نشان می‌دهد این امکان در نزدیکی هست: '
cat('M', 'تابلوهای خدماتی', 'امکانات نزدیک: پمپ‌بنزین، پارکینگ، رستوران…',
    'تابلوهای خدماتی مربعِ آبی با کادر سفید و علامت سیاه‌اند و امکانات نزدیک را نشان می‌دهند (علامت کمک‌های اولیه قرمز است). اغلب با تابلوی جهت یا فاصله همراه‌اند. تابلوهای قهوه‌ای برای میراث جهانی یونسکو و پارک ملی‌اند.',
    'Three Danish blue square service signs with a white inner square on short grey poles: a black fuel pump, a black knife and fork, and a black bed.',
    [n('M9', 'Erhvervs- og containerhavn', 'بندر تجاری و کانتینری', _s + 'بندر تجاری و کانتینری.', SERV + 'a cargo ship with containers under a crane.'),
     n('M10', 'Færge for cyklende og gående', 'کشتی برای دوچرخه‌سوار و پیاده', _s + 'قایق یا کشتی‌ای که فقط عابر پیاده و دوچرخه سوار می‌کند.', SERV + 'a small ferry boat on waves carrying a bicycle and a walking person.'),
     n('M11', 'Færge', 'کشتی (فری)', _s + 'محل سوار شدن به کشتی (فری) که خودرو هم می‌برد.', SERV + 'a ferry ship on water seen from the side.'),
     n('M12', 'Lufthavn', 'فرودگاه', _s + 'فرودگاه.', SERV + 'an aeroplane seen from above, flying to the left.'),
     n('M13', 'Jernbanestation', 'ایستگاه قطار', _s + 'ایستگاه قطار.', SERV + 'a steam locomotive seen from the side under a station roof with a small clock.'),
     n('M13.1', 'S-tog', 'ایستگاه قطار شهری (S-tog)', _s + 'ایستگاه قطار شهری کپنهاگ (S-tog).', 'a small blue square sign with a white inner square and a black-and-white circular "S" logo.'),
     n('M13.2', 'Metro', 'ایستگاه مترو', _s + 'ایستگاه مترو.', 'a small blue square sign with a white inner square and a bold black letter "M".'),
     n('M13.3', 'Letbane', 'ایستگاه تراموا', _s + 'ایستگاه تراموا (letbane).', 'a small blue square sign with a white inner square and a black modern tram.'),
     n('M14', 'Busterminal', 'پایانه‌ی اتوبوس', _s + 'پایانه‌ی اتوبوس.', SERV + 'a bus seen from the side under a station roof with a small clock.'),
     n('M15', 'Transportcenter', 'مرکز حمل‌ونقل', _s + 'مرکز حمل‌ونقل و بارگیری کامیون‌ها.', SERV + 'a lorry seen from the side under a roof.'),
     n('M16', 'Parker og rejs', 'پارک کن و سفر کن', _s + 'پارکینگی کنار ایستگاه که خودرو را می‌گذارید و با قطار یا اتوبوس ادامه می‌دهید.', 'a wide blue rectangular sign with a white inner panel: a black "P", a plus sign and a black locomotive under a station roof.'),
     n('M17', 'Posthus', 'اداره‌ی پست', _s + 'اداره‌ی پست.', SERV + 'a post horn with a crown above it.'),
     n('M18', 'Knudepunkt', 'گره‌ی حمل‌ونقل', _s + 'محلی که چند نوع حمل‌ونقل عمومی به هم وصل می‌شوند.', 'a small blue square sign with a white inner square and a black stylised looping arrow symbol.'),
     n('M21', 'Førstehjælp', 'کمک‌های اولیه', _s + 'محل کمک‌های اولیه یا اورژانس.', SERV + 'a red cross.'),
     n('M22', 'Telefon', 'تلفن', _s + 'تلفن عمومی یا تلفن اضطراری.', SERV + 'a telephone handset.'),
     n('M23', 'Værksted', 'تعمیرگاه', _s + 'تعمیرگاه خودرو.', SERV + 'a wrench (spanner) standing upright.'),
     n('M24', 'Tankanlæg', 'پمپ‌بنزین', _s + 'پمپ‌بنزین یا ایستگاه سوخت/شارژ.', SERV + 'a fuel pump with a hose.'),
     n('M30', 'Primitiv teltplads for stitrafikanter', 'محل ساده‌ی چادر زدن', _s + 'محل ساده‌ی چادر زدن برای پیاده‌روها و دوچرخه‌سوارها.', SERV + 'a small tent beside two small fir trees.'),
     n('M31', 'Campingplads', 'کمپینگ', _s + 'محل کمپینگ.', SERV + 'a tent.'),
     n('M32', 'Campingplads for autocampere', 'کمپینگ کاروان', _s + 'محل کمپینگ برای خودروهای کاروان (autocamper).', SERV + 'a motorhome seen from the side.'),
     n('M33', 'Campinghytter', 'کلبه‌های اقامتی', _s + 'کلبه‌های اجاره‌ای.', SERV + 'a small house.'),
     n('M34', 'Rasteplads', 'محل استراحت', _s + 'محل استراحت کنار جاده، اغلب با میز و نیمکت.', SERV + 'a picnic table beside a fir tree.'),
     n('M35', 'Badested', 'محل شنا', _s + 'محل شنا (ساحل یا دریاچه).', SERV + 'a swimmer in water waves.'),
     n('M36', 'Golfbane', 'زمین گلف', _s + 'زمین گلف.', SERV + 'a golfer swinging a club.'),
     n('M37', 'Fiskesø', 'دریاچه‌ی ماهیگیری', _s + 'دریاچه‌ی ماهیگیری.', SERV + 'a fish hanging from a fishing line.'),
     n('M38', 'Udsigtstårn ved naturområder', 'برج دیدبانی طبیعت', _s + 'برج دیدبانی برای تماشای طبیعت.', 'a small blue square sign with a white inner square and a black wooden lookout tower.'),
     n('M41', 'Vandrerhjem', 'خوابگاه جوانان (هاستل)', _s + 'هاستل.', SERV + 'a fir tree beside a house.'),
     n('M42', 'Hotel', 'هتل', _s + 'هتل.', SERV + 'a bed seen from the side.'),
     n('M43', 'Restaurant', 'رستوران', _s + 'رستوران.', SERV + 'a fork and a knife.'),
     n('M45', 'Cafeteria', 'کافه', _s + 'کافه یا کافه‌تریا.', SERV + 'a cup on a saucer.'),
     n('M46', 'WC', 'توالت', _s + 'توالت عمومی (با علامت ویلچر یعنی مناسب افراد دارای معلولیت).', SERV + 'the letters "WC" with a small wheelchair symbol above.'),
     n('M47', 'Tømning af kemisk toilet', 'تخلیه‌ی توالت شیمیایی', _s + 'محل تخلیه‌ی توالت کاروان‌ها.', SERV + 'a motorhome above a drain basin.'),
     n('M51', 'Kirke', 'کلیسا', _s + 'کلیسا، کنیسه یا عبادتگاه مشابه.', SERV + 'a simple church with a tower.'),
     n('M52', 'Seværdighed eller attraktion', 'جاذبه‌ی دیدنی', _s + 'جاذبه‌ی دیدنی.', SERV + 'a looped square knot symbol (the place-of-interest symbol).'),
     n('M53', 'UNESCO verdensarvsmonument', 'میراث جهانی یونسکو', 'یک اثر ثبت‌شده در فهرست میراث جهانی یونسکو در نزدیکی است (تابلوی قهوه‌ای).', 'a brown square sign with a white edge and the white UNESCO world-heritage emblem (a square inside a circle).'),
     n('M54', 'Nationalpark', 'پارک ملی', 'ورود یا نزدیکی به پارک ملی (تابلوی قهوه‌ای).', 'a brown square sign with a white edge and a white royal crown (the Danish crown with a small cross on top) in the middle; not the round UNESCO emblem.'),
     n('M57', 'Industriområde', 'منطقه‌ی صنعتی', _s + 'منطقه‌ی صنعتی.', SERV + 'a factory with saw-tooth roofs and a chimney.'),
     n('M61', 'Information', 'اطلاعات گردشگری', _s + 'مرکز اطلاعات.', SERV + 'a lower-case letter "i".'),
     n('M101', 'Dagligvareforretning', 'فروشگاه مواد غذایی', _s + 'فروشگاه مواد غذایی.', 'a black square sign with a white inner square and a black shopping trolley.'),
     n('M102', 'Værelse til leje', 'اتاق اجاره‌ای', _s + 'اتاق برای اجاره (مثلاً Bed & Breakfast).', 'a black square sign with a white inner square showing a black bed under the black letters "B & B".')])

# ---------------------------------------------------------------- N
cat('N', 'علائم لبه‌ی جاده', 'تیرک‌ها و صفحه‌هایی که لبه و مانع را نشان می‌دهند.',
    'این علائم لبه‌ی جاده، جزیره‌ها و موانع را در تاریکی و هوای بد قابل‌دیدن می‌کنند. خطوط مایل قرمز و سفید همیشه به سمتی پایین می‌روند که باید از آن طرف عبور کنید.',
    'Danish road-edge markers on a light grey ground: white edge posts with a sloping top and a yellow reflector, a red-and-white striped board and an orange traffic cylinder.',
    [n('N41', 'Kantpæle', 'تیرک‌های کنار جاده', 'تیرک‌های سفید با سرِ مایل، معمولاً هر **۱۰۰ متر**: شبرنگ **زرد** در سمت **راست** جاده و شبرنگ **سفید** در سمت **چپ**. خودرو باید از طرفی رد شود که سرِ مایل تیرک به آن سمت پایین می‌رود. شبرنگ **قرمز** کوچک کنار جاده ورودی یک مزرعه یا ملک را نشان می‌دهد.', 'three slim white roadside posts with a top that slopes down towards the road and a thin red band along the sloping top: the left post has a white reflector, the right post a yellow reflector and a small plate with black numbers, the middle post a yellow reflector on one side and a white one on the other.'),
     n('N42', 'Kantafmærkningsplader', 'صفحه‌های لبه', 'صفحه‌ی راه‌راه قرمز و سفید برای نشان دادن لبه یا مانع؛ خطوط مایل به سمتی پایین می‌روند که باید از آن عبور کنید.', 'two tall narrow white boards with diagonal red stripes, the stripes sloping down in opposite directions.'),
     n('N43', 'Spidsmarkering', 'علامت نوک جزیره', 'نوک جزیره یا جایی که جاده دوشاخه می‌شود؛ می‌توانید از هر دو طرف عبور کنید.', 'a red rectangular board with white chevrons pointing up.'),
     n('N44.1', 'Markeringscylinder', 'استوانه‌ی علامت', 'استوانه‌ی قرمز یا نارنجی با نوار شبرنگ؛ در کار جاده‌ای و مانند آن، محدوده‌ی کارگاه را مشخص می‌کند.', 'an orange cylinder with a white reflective band and a red band, standing on a black base.'),
     n('N44.2', 'Markeringskegle', 'مخروط ترافیکی', 'مخروط قرمز یا نارنجی با نوار شبرنگ؛ در کار جاده‌ای و مانند آن، محدوده‌ی کارگاه را مشخص می‌کند.', 'an orange traffic cone with white and red reflective bands on a square base.'),
     n('N44.3', 'Vognbanedeler', 'جداکننده‌ی خط', 'در کار جاده‌ای، خطوطی را که ترافیکشان در **دو جهت مخالف** است از هم جدا می‌کند؛ از آن عبور نکنید.', 'a row of low lane separator posts with white reflective panels standing on a line between two lanes with traffic in opposite directions.'),
     n('N46', 'Markeringslygter', 'چراغ علامت', 'چراغ‌هایی با نور **سفید** ثابت یا چشمک‌زن که در کار جاده‌ای محدوده‌ی کارگاه را مشخص می‌کنند.', 'a row of small lamps with white light standing along the edge of a road works area.')])

# ---------------------------------------------------------------- O
cat('O', 'علائم پس‌زمینه', 'فلش‌های جهت و راه‌بندها.',
    'صفحه‌های بزرگ قرمز و سفید که جهت پیچ یا بسته بودن جاده را واضح نشان می‌دهند.',
    'Danish background markings: a long red board with white chevron arrows at a bend, and a red-and-white striped barrier across a road.',
    [n('O41-42', 'Retningspile', 'فلش‌های جهت', 'در پیچ یا انتهای جاده نشان می‌دهند جاده به کدام طرف می‌رود؛ فلش دوطرفه یعنی باید به چپ یا راست بپیچید.', 'four red boards with white chevrons: one pointing left, one with several chevrons left, one with chevrons right, and one with chevrons pointing both ways.'),
     n('O43-45', 'Spærrebomme', 'راه‌بندها', 'راه‌بند قرمز و سفید: جاده یا بخشی از آن بسته است. خطوط مایل به سمتی پایین می‌روند که باید از آن عبور کنید.', 'four red-and-white barrier boards: two with diagonal stripes in opposite directions, one with stripes meeting in the middle, one with vertical stripes.')])

# ---------------------------------------------------------------- P
cat('P', 'چراغ جزیره', 'چراغ زرد روی جزیره‌ی وسط جاده.',
    'چراغ جزیره در شب جزیره‌ی وسط جاده را نشان می‌دهد تا با آن برخورد نکنید و بدانید از کدام طرفش بروید.',
    'A yellow illuminated island beacon (a short yellow glowing column) standing on a traffic island at night-blue dusk, in a simple setting.',
    [n('P11', 'Hellefyr', 'چراغ جزیره', 'ستون زرد (معمولاً نورانی) روی جزیره‌ی وسط جاده: باید از **سمت راست** آن رد شوید، مگر علامت دیگری عبور از چپ را مجاز کرده باشد یا جاده یک‌طرفه باشد.', 'a short upright yellow glowing column with grey ends, standing on a traffic island.')])

# ---------------------------------------------------------------- Q
cat('Q', 'خطوط طولی', 'خط‌چین، خط ممتد و خطوط کنار جاده.',
    'خط‌کشی‌ها سفیدند. خط‌کشی **زرد** برای کار جاده‌ای و تغییر موقت است و بر خط سفید مقدم است. هرچه خط کوتاه‌تر و فاصله‌اش بیشتر باشد، عبور از آن آزادتر است؛ از خط ممتد نباید عبور کنید.',
    'A short stretch of grey asphalt road seen from above with white markings: a broken centre line turning into a solid line, and solid edge lines.',
    ['Q41', 'Q42', 'Q44', 'Q45', 'Q46', 'Q47'])

# ---------------------------------------------------------------- R
cat('R', 'فلش‌های روی جاده', 'فلش‌هایی که جهت هر خط را نشان می‌دهند.',
    'فلش‌های روی سواره‌رو جهتی را نشان می‌دهند که از آن خط می‌توان رفت. در خطی که فلش دارد باید در جهت فلش حرکت کنید. این فلش‌ها برای دوچرخه و موپد کوچک نیستند، مگر علامت دوچرخه کنارشان باشد.',
    'Grey asphalt lanes seen from above with big white lane arrows painted on them: left, straight and right.',
    ['R11',
     n('R13', 'Dobbelte vognbanepile', 'فلش‌های دوتایی (دو تقاطع پشت سر هم)', 'یک فلش بلند با دو سرِ گردش: برای **دو تقاطعِ پشت سر هم** است. از این خط می‌توانید در تقاطع اول یا در تقاطع بعدی به همان سمت بپیچید.', ROAD + 'one long white lane arrow running along the lane with TWO arrowheads bending to the same side one after the other: the first branches off halfway along, the second at the end (one arrow for two junctions in a row).'),
     n('R14', 'Vognbanepile med svingningsforbud', 'فلش با گردش ممنوع', 'فلش برای تقاطعی است که **بعد از** یک جاده‌ی فرعی می‌آید؛ پیچیدن به آن فرعیِ نزدیک‌تر ممنوع است. شاخه‌ی کوتاهِ بی‌نوک روی فلش همان فرعی است.', ROAD + 'one long white lane arrow with a short stub branching off halfway WITHOUT an arrowhead (the side road where turning is forbidden) and an arrowhead turning to the side at its end.'),
     n('R15', 'Pile for vognbaneskift', 'فلش‌های تغییر خط', 'فلش‌های مایل بین خط‌چین‌ها: هرچه زودتر به خطی که فلش نشان می‌دهد بروید. اگر خط‌چین ادامه دارد، شما که خط عوض می‌کنید باید مطمئن شوید بی‌خطر و بدون مزاحمت است؛ اگر خط‌چین تمام می‌شود (دو خط یکی می‌شوند)، همه باید با ملاحظه‌ی متقابل ادغام شوند.', ROAD + 'a lane with a long thin white arrow bending diagonally into the next lane, broken lane lines.')])

# ---------------------------------------------------------------- S
cat('S', 'خطوط عرضی', 'خط ایست، دندان کوسه و گذرگاه‌ها.',
    'خط‌کشی‌هایی که عرض جاده را قطع می‌کنند: جای توقف، حق تقدم یا عبور عابر و دوچرخه را نشان می‌دهند.',
    'Grey asphalt seen from above at a junction with white transverse markings: a stop line, a row of white shark-teeth triangles and a zebra crossing.',
    ['S11', 'S13',
     n('S16', 'Afslutning af svingbane', 'خط انتظارِ انتهای خط گردش', 'خط‌چین پهن در عرضِ انتهای خط گردش (معمولاً داخل تقاطع، مثلاً در گردش به چپ): اگر برای راه دادن (مثلاً به ترافیک روبه‌رو یا عابران) باید بایستید، پشت همین خط منتظر بمانید.', ROAD + 'seen from above inside a junction: a left-turn lane drawn with dashed white lines curves into the junction and ends at a short broad dashed white line across the lane, where turning cars wait.'),
     'S17',
     n('S18', 'Rumlestriber', 'نوارهای لرزاننده', 'نوارهای عرضی برجسته که هنگام عبور صدا و لرزش ایجاد می‌کنند تا به شما هشدار دهند (مثلاً قبل از تقاطع یا ورود به شهر).', ROAD + 'a group of many short parallel white raised stripes across the lane.'),
     n('S20', 'Løbehjulsboks', 'جای پارک اسکوتر برقی', 'محل خط‌کشی‌شده برای پارک اسکوتر برقی؛ فقط آنجا پارک کنید.', ROAD + 'a rectangular white outlined box on the pavement with a white electric scooter symbol.'),
     'S21',
     n('S22', 'Cykelboks', 'جای انتظار دوچرخه', 'محدوده‌ای با علامت دوچرخه **جلوی خط گردش به راستِ** خودروها در تقاطع: دوچرخه‌سوارها و موپدهای کوچک می‌توانند آنجا جلوتر از خودروها منتظر بمانند تا راست‌گردها آن‌ها را ببینند. خودروها پشت خط ایست خودشان می‌ایستند.', ROAD + 'a junction with a cycle box: a white bicycle symbol in an area in front of the cars\' stop line, a second stop line further back.'),
     n('S32', 'Bump', 'علامت سرعت‌گیر', 'مربع‌های سفید در عرض جاده: سرعت‌گیر (بامپ) هست؛ سرعت را کم کنید.', ROAD + 'a band of white chequered squares (two rows) across the lane on a speed bump.')])

# ---------------------------------------------------------------- T
cat('T', 'خط‌کشی توقف و پارک', 'جای پارک و خطوط زرد توقف ممنوع.',
    'خط‌کشی‌هایی که جای پارک یا ممنوعیت توقف و پارک را نشان می‌دهند. خط **زرد ممتد** کنار جدول یعنی توقف ممنوع و خط **زرد خط‌چین** یعنی پارک ممنوع.',
    'A kerb seen from above with a solid yellow line and a broken yellow line painted along it, beside white parking bays.',
    [n('T33', 'Parkeringsbås', 'جای پارک', 'خطوط سفید که هر جای پارک را مشخص می‌کنند؛ خودرو را داخل خطوط پارک کنید. در پارکینگی که جای پارک خط‌کشی شده، بیرون از آن‌ها پارک نکنید. اگر نوشته یا علامتی (مثل معلولیت، تاکسی یا اتوبوس) در جای پارک باشد، فقط مخصوص همان است.', ROAD + 'three rows of parking bays marked with white lines: parallel, angled and perpendicular.'),
     'T61',
     n('T62', 'Parkeringsforbud', 'پارک ممنوع (خط زرد خط‌چین)', 'خط زرد **خط‌چین** کنار جدول یعنی **پارک ممنوع** است؛ توقف کوتاه برای سوار و پیاده کردن مسافر یا بارگیری مجاز است.', ROAD + 'a broken yellow line painted along the kerb.'),
     n('T63', 'Markering af ophør af standsning og parkering', 'پایان ممنوعیت کنار تقاطع (روی جدول)', 'مثلث زرد رنگ‌شده روی جدول: نشان می‌دهد ممنوعیت توقف و پارکِ کنار تقاطع (قاعده‌ی ۱۰ متر) کجا تمام می‌شود.', 'a kerb stone with a yellow triangle painted on its top face, seen from the side.')])

# ---------------------------------------------------------------- U
cat('U', 'تابلوهای زیرین: فاصله، زمان و استثنا', 'زیر تابلوی اصلی؛ معنای آن را دقیق‌تر می‌کنند.',
    'تابلوی زیرین زیر تابلوی اصلی نصب می‌شود و معنایش را دقیق‌تر می‌کند: از کجا، تا کجا، چه زمانی یا برای چه کسانی. زیر تابلوهای هشدار، حق تقدم و ممنوعیت **زمینه‌ی سفید با حاشیه‌ی قرمز** دارند و زیر تابلوهای الزامی و اطلاع‌رسانی **زمینه‌ی آبی** (زیر تابلوی بزرگراه، سبز).',
    'A Danish round red-bordered prohibition sign on a grey pole with a small white rectangular sub-sign below it with a red border and black text drawn as abstract bars.',
    [n('U1', 'Afstand', 'فاصله تا محل اعتبار', 'فاصله از تابلو تا جایی که تابلوی اصلی از آن اعتبار دارد.', PLATE + 'the text "500 m".'),
     n('U2', 'Vejstrækning', 'طول مسیر اعتبار', 'تابلوی اصلی برای بخشی از جاده اعتبار دارد؛ اعداد، فاصله تا ابتدا و انتهای آن بخش‌اند.', PLATE + 'the text "200-800 m".'),
     n('U3', 'Tidsangivelse', 'زمان اعتبار', 'تابلوی اصلی فقط در زمان مشخص اعتبار دارد: عدد **سیاه یا سفید** برای روزهای کاری (جز شنبه)، **داخل پرانتز** برای شنبه و **قرمز** برای یکشنبه و تعطیلات.', PLATE + 'three lines of times: "8-17", "(8-14)" and a red "9-12".'),
     n('U4', 'Færdselsart', 'فقط برای این نوع وسیله', 'تابلوی اصلی فقط برای وسیله‌ای که علامتش روی تابلوی زیرین است اعتبار دارد.', PLATE + 'a black lorry seen from the side.'),
     n('U5', 'Undtaget færdselsart', 'به‌جز این نوع وسیله', 'تابلوی اصلی (یا چراغ) برای وسیله‌ای که روی تابلوی زیرین با کلمه‌ی «undtaget» آمده اعتبار **ندارد**.', PLATE + 'a black bicycle above the word "undtaget".'),
     n('U6', 'Tilstødende vej', 'برای جاده‌ی کناری', 'تابلوی اصلی برای جاده‌ای که در جهت فلش است اعتبار دارد، نه برای جاده‌ی خود شما.', PLATE + 'a black arrow going up and turning right.'),
     n('U7', 'Undtaget ved lyssignal', 'استثنا از چراغ برای دوچرخه', 'زیر چراغ راهنمایی: دوچرخه‌سوارها می‌توانند در جهت فلش (به راست) از چراغ قرمز بگذرند، به شرط اینکه بی‌قید و شرط به دیگران راه بدهند (در مسیر گردش به راستِ آن‌ها دندان‌کوسه هست).', PLATE + 'a black bicycle above an arrow turning right and the word "undtaget".')])

cat('UA', 'تابلوهای زیرین هشدار', 'زیر تابلوهای هشدار؛ نوع خطر را می‌گویند.',
    'این تابلوهای زیرین زیر تابلوهای هشدار نصب می‌شوند و نوع خطر یا محدودیت را دقیق‌تر بیان می‌کنند.',
    'A Danish warning triangle on a grey pole with a small white rectangular sub-sign below it with a red border showing a black snowflake.',
    [n('UA31', 'Isglat', 'یخ‌زدگی', 'زیر تابلوی «جاده‌ی لغزنده»: لغزندگی به‌خاطر یخ است.', PLATE + 'a black snowflake.'),
     n('UA41', 'Hastighedsangivelse', 'سرعت پیشنهادی در پیچ', 'زیر تابلوی پیچ خطرناک: سرعتی که در شرایط عادی می‌توان با آن از پیچ (یا پیچ‌ها) گذشت. در هوای بد یا جاده‌ی لغزنده آهسته‌تر برانید.', PLATE + 'the black number "40" on a square plate.'),
     n('UA43', 'Fri bredde', 'عرض آزاد', 'عرض آزاد جاده در بخش باریک.', PLATE + 'the text "3,5 m" between two black triangles pointing inwards.'),
     n('UA43.1', 'Smal vej (2-minus-1-vej)', 'جاده‌ی باریک «۲ منهای ۱»', 'جاده‌ی دوطرفه‌ای که وسطش یک خط برای هر دو جهت است و دو خودرو بدون رفتن روی خط کنار جاده نمی‌توانند از کنار هم رد شوند. روی خط وسط برانید و هنگام روبه‌رو شدن به راست بروید.', PLATE + 'the black words "Smal vej".'),
     n('UA72', 'Se efter tog', 'مراقب قطار باشید', 'در گذرگاه راه‌آهنی که راه‌بند و چراغ ندارد: قبل از عبور به دو طرف نگاه کنید.', PLATE + 'the black words "Se efter tog" above two black arrows pointing towards each other.'),
     n('UA73', 'Varsling af elektrificeret bane', 'سیم برق راه‌آهن', 'سیم‌های برق بالای ریل؛ ارتفاع آزاد را نشان می‌دهد.', PLATE + 'a black lightning arrow and the text "4,5 m" between two triangles pointing at each other from top and bottom.'),
     n('UA99', 'Uheldskryds', 'تقاطع حادثه‌خیز', 'زیر تابلوی هشدار: در این تقاطع تصادف زیاد رخ می‌دهد. بسیار محتاط باشید.', PLATE + 'two black cars crashed into each other.')])

cat('UB', 'تابلوهای زیرین حق تقدم', 'زیر تابلوهای حق تقدم.',
    'زیر تابلوهای حق تقدم نصب می‌شوند و می‌گویند کجا باید بایستید یا از چه جهتی ترافیک می‌آید.',
    'A Danish inverted red-bordered give-way triangle on a grey pole with a small white sub-sign below showing two black bicycles and two opposite arrows.',
    [n('UB11.1', 'Forvarsling for stop', 'هشدار ایست در پیش', 'زیر تابلوی «حق تقدم بدهید»: تابلوی ایست در فاصله‌ی نوشته‌شده است.', PLATE + 'the word "STOP" above "200 m".'),
     'UB11.2',
     n('UB11.3', 'Letbane', 'ریل تراموا', 'زیر B 11 یا B 13: جاده‌ای که واردش می‌شوید ریل تراموا دارد که ممکن است از هر دو جهت بیاید.', PLATE + 'a black tram above two black arrows pointing in opposite directions.')])

cat('UC', 'تابلوهای زیرین ممنوعیت', 'زیر تابلوهای توقف و پارک ممنوع.',
    'زیر تابلوهای ممنوعیت (به‌ویژه توقف و پارک ممنوع) نصب می‌شوند و محدوده یا شرایط ممنوعیت را دقیق‌تر می‌کنند.',
    'A Danish blue round no-parking sign with a red border and diagonal bar on a grey pole, with a small white sub-sign below showing a black double-headed vertical arrow.',
    [n('UC33', 'Begrænset parkering', 'پارک محدود', 'پارک فقط برای مدت نوشته‌شده مجاز است؛ معمولاً باید کارت پارک (P-skive) بگذارید.', PLATE + 'a blue square with a white "P" beside the text "1 time".'),
     n('UC60.1', 'Før og efter tavlen', 'قبل و بعد از تابلو', 'ممنوعیت **هم قبل و هم بعد** از تابلو اعتبار دارد.', PLATE + 'a vertical black arrow with heads at both ends, on a tall narrow plate.'),
     n('UC60.2', 'Begynder ved tavlen', 'از تابلو به بعد', 'ممنوعیت **از تابلو** شروع می‌شود.', PLATE + 'a vertical black arrow pointing up, on a tall narrow plate.'),
     n('UC60.3', 'Ophører ved tavlen', 'تا تابلو', 'ممنوعیت **در تابلو** تمام می‌شود.', PLATE + 'a vertical black arrow pointing down, on a tall narrow plate.'),
     n('UC60.5', 'Standsning på rabat forbudt', 'توقف روی شانه‌ی جاده ممنوع', 'توقف روی **شانه‌ی خاکی جاده** هم ممنوع است.', PLATE + 'a black line (the verge) and a small blue round sign with a red X above its end.'),
     n('UC60.6', 'Parkering på rabat forbudt', 'پارک روی شانه‌ی جاده ممنوع', 'پارک روی **شانه‌ی خاکی جاده** هم ممنوع است.', PLATE + 'a black line (the verge) and a small blue round sign with a red diagonal bar above its end.'),
     n('UC60.7', 'Standsning og parkering på rabat tilladt', 'توقف و پارک روی شانه مجاز', 'توقف و پارک روی شانه‌ی جاده مجاز است.', PLATE + 'a small car above a kerb line with a small blue "P".'),
     n('UC60.8', 'Parkering delvis på fortov tilladt', 'پارک نیمه روی پیاده‌رو مجاز', 'پارک با بخشی از خودرو روی پیاده‌رو مجاز است.', PLATE + 'a small car standing half on a kerb line with a small blue "P".'),
     n('UC61', 'Standsningsforbud', 'توقف ممنوع (تابلوی کوچک)', 'تابلوی کوچک توقف ممنوع، مثلاً روی تیرک.', 'a tall narrow white plate with a red border and a small blue round sign with a red border and red X.'),
     n('UC62', 'Parkeringsforbud', 'پارک ممنوع (تابلوی کوچک)', 'تابلوی کوچک پارک ممنوع، مثلاً روی تیرک.', 'a tall narrow white plate with a red border and a small blue round sign with a red border and one red diagonal bar.')])

cat('UD', 'تابلوهای زیرین الزامی', 'زیر تابلوهای آبی الزامی.',
    'زیر تابلوهای الزامی نصب می‌شوند و مشخص می‌کنند الزام برای کدام خط یا کدام جهت است.',
    'A Danish round blue bicycle-path sign on a grey pole with a small blue sub-sign below it showing two white arrows pointing up and down.',
    [n('UD1', 'Udpeget bane', 'خط مشخص‌شده', 'خطی را که فلش نشان می‌دهد فقط وسیله‌ی روی تابلوی اصلی می‌تواند استفاده کند.', PLATEB + 'a long white arrow pointing left.'),
     n('UD21.1', 'Dobbeltrettet cykeltrafik', 'دوچرخه‌ی دوطرفه', 'دوچرخه‌ها در این مسیر از **هر دو جهت** حرکت می‌کنند.', PLATEB + 'two thick white arrows side by side, one pointing down and one pointing up.'),
     n('UD21.2', 'Dobbeltrettet cykeltrafik ophører', 'پایان دوچرخه‌ی دوطرفه', 'حرکت دوطرفه‌ی دوچرخه اینجا تمام می‌شود.', PLATEB + 'two thick white arrows (down and up) crossed by a red diagonal bar.')])

cat('UE', 'تابلوهای زیرین اطلاع‌رسانی', 'زیر تابلوهای آبی اطلاع‌رسانی.',
    'زیر تابلوهای اطلاع‌رسانی (مثل پارکینگ) نصب می‌شوند و محدوده یا شرایط آن را مشخص می‌کنند.',
    'A Danish blue square parking sign with a white P on a grey pole, with a small blue sub-sign below showing a white electric plug.',
    [n('UE33.1', 'Før og efter tavlen', 'پارک قبل و بعد از تابلو', 'قاعده‌ی پارک **هم قبل و هم بعد** از تابلو اعتبار دارد.', PLATEB + 'a vertical white arrow with heads at both ends, on a tall narrow plate.'),
     n('UE33.2', 'Begynder ved tavlen', 'پارک از تابلو به بعد', 'قاعده‌ی پارک **از تابلو** شروع می‌شود.', PLATEB + 'a vertical white arrow pointing up, on a tall narrow plate.'),
     n('UE33.3', 'Ophæves ved tavlen', 'پارک تا تابلو', 'قاعده‌ی پارک **در تابلو** تمام می‌شود.', PLATEB + 'a vertical white arrow pointing down, on a tall narrow plate.'),
     n('UE33.4', 'Reserveret til elbil', 'مخصوص خودروی برقی', 'جای پارک فقط برای خودروهای برقی (که با برق بیرونی شارژ می‌شوند).', PLATEB + 'a white electric plug with a zigzag cable.'),
     n('UE34', 'Brandslukker og nødtelefon', 'کپسول آتش‌نشانی و تلفن اضطراری', 'در این محل توقف اضطراری کپسول آتش‌نشانی و تلفن اضطراری هست.', PLATEB + 'a white fire extinguisher and a white telephone handset.'),
     n('UE80', 'Påbudt sele og kørelys', 'کمربند و چراغ الزامی', 'زیر تابلوی سرعت‌های عمومی در مرز: در دانمارک بستن **کمربند ایمنی**، استفاده از **وسایل ایمنی کودک** و روشن بودن **چراغ** در همه‌ی ساعت‌ها الزامی است.', PLATEB + 'a white car with belted passengers and a yellow beam of light in front of it.')])

cat('US', 'علامت‌های تابلوهای زیرین', 'علامت وسایل نقلیه روی تابلوهای زیرین.',
    'این علامت‌ها روی تابلوهای زیرین می‌آیند و نوع وسیله‌ی نقلیه‌ای را که قاعده برایش هست (یا نیست) نشان می‌دهند.',
    'Four small flat white RECTANGULAR plates standing in a row on short grey posts, each with a thin black border and ONE simple black vehicle pictogram: a car, a lorry, a bus and a bicycle. They are NOT round signs: no red rings, no red bars, no circles.',
    [n('US1', 'Bil til og med 3.500 kg', 'خودرو تا ۳۵۰۰ کیلوگرم', 'خودروی سواری و وانت تا وزن کل ۳۵۰۰ کیلوگرم.', SYM + 'a car seen from the side.'),
     n('US2', 'Lastbil', 'کامیون', 'کامیون، با یا بدون یدک (تریلر).', SYM + 'a lorry seen from the side.'),
     n('US3', 'Bus', 'اتوبوس', 'خودروی بیش از ۳۵۰۰ کیلوگرم با بیش از ۸ صندلی مسافر.', SYM + 'a bus seen from the side.'),
     n('US4', 'Lastbilvogntog', 'کامیون با تریلر', 'کامیون با یدک یا تریلر.', SYM + 'a lorry with a trailer seen from the side.'),
     n('US5', 'Påhængskøretøj', 'یدک (تریلر)', 'یدک یا تریلر.', SYM + 'a small closed trailer seen from the side.'),
     n('US6', 'Campingvogn', 'کاروان', 'کاروان (campingvogn).', SYM + 'a caravan seen from the side.'),
     n('US7', 'Autocamper', 'خودروی کاروان', 'خودروی کاروان (autocamper).', SYM + 'a motorhome seen from the side.'),
     n('US8', 'Cykel og lille knallert', 'دوچرخه و موپد کوچک', 'دوچرخه و موپد کوچک.', SYM + 'a bicycle seen from the side.'),
     n('US9', 'Lille knallert', 'موپد کوچک', 'موپد کوچک (۳۰ کیلومتری).', SYM + 'a small moped seen from the side.'),
     n('US10', 'Motorcykel og stor knallert', 'موتورسیکلت و موپد بزرگ', 'موتورسیکلت و موپد بزرگ.', SYM + 'a motorcycle seen from the side.'),
     n('US11', 'Traktor og motorredskab', 'تراکتور و ماشین‌آلات', 'تراکتور و ماشین‌آلات موتوری.', SYM + 'a farm tractor seen from the side.'),
     n('US12', 'Invalid', 'فرد دارای معلولیت', 'افراد دارای معلولیت (مثلاً پارک با کارت معلولیت).', SYM + 'a wheelchair user.'),
     n('US13', 'Letbanekøretøj', 'تراموا', 'تراموا (letbane).', SYM + 'a modern tram seen from the side with a pantograph.')])

# ---------------------------------------------------------------- V
cat('V', 'نوشته‌ها و علامت‌های روی جاده', 'علامت‌هایی که روی سواره‌رو رنگ شده‌اند.',
    'نوشته‌ها و علامت‌هایی که روی سواره‌رو رنگ می‌شوند، تابلوها یا قواعد را تکرار یا خطی را برای وسیله‌ی خاصی مشخص می‌کنند.',
    'Grey asphalt seen from above with white symbols painted on the road: a long thin STOP word, a give-way triangle and a bicycle symbol.',
    [n('V11', 'Trekantsymbol', 'مثلث روی جاده', 'مثلث وارونه‌ی بلند روی جاده تابلوی «حق تقدم بدهید» را تکرار می‌کند.', ROAD + 'a long thin white inverted triangle outline painted on the lane.'),
     n('V12', 'STOP', 'نوشته‌ی STOP', 'نوشته‌ی STOP روی جاده قبل از خط ایست؛ تابلوی ایست را تکرار می‌کند.', ROAD + 'the word "STOP" painted in very tall, narrow white letters on the lane.'),
     n('V15', 'Rutesymbol', 'شماره‌ی مسیر روی جاده', 'شماره‌ی مسیر روی خط، تا خط درست را برای مقصدتان انتخاب کنید.', ROAD + 'a route number "E45" painted in tall narrow white letters on the lane.'),
     n('V20', 'Løbehjulssymbol', 'علامت اسکوتر برقی', 'علامت اسکوتر برقی روی جاده، مثلاً در جای پارک اسکوتر.', ROAD + 'a white electric scooter symbol.'),
     n('V21', 'Cykelsymbol', 'علامت دوچرخه', 'خط یا مسیری که برای دوچرخه است.', ROAD + 'a white bicycle symbol painted on the lane.'),
     n('V23', 'Invalidesymbol', 'علامت معلولیت', 'جای پارک مخصوص افراد دارای کارت معلولیت.', ROAD + 'a white wheelchair symbol in a parking bay.'),
     n('V33', 'Parkeringssymbol', 'علامت P روی جاده', 'این سطح فقط برای پارک است، نه برای رانندگی.', ROAD + 'a tall white letter "P" painted on the road.'),
     'V42',
     n('V43', 'Symbol for letbanekøretøj', 'علامت تراموا', 'خطی که مخصوص تراموا است.', ROAD + 'a white tram symbol painted on the lane.'),
     n('V44', 'Taxisymbol', 'نوشته‌ی TAXI', 'خط یا محل توقف مخصوص تاکسی.', ROAD + 'the word "TAXI" painted in tall narrow white letters.'),
     n('V45', 'Taxisymbol for nulemissionsbil', 'TAXI سبز (تاکسی بدون آلایندگی)', 'محل مخصوص تاکسی‌های بدون آلایندگی (برقی).', 'a green rectangle painted on grey asphalt with the word "TAXI" in tall narrow white letters.'),
     n('V46', 'Bilsymbol for nulemissionsbil', 'علامت خودروی بدون آلایندگی', 'خط یا محل مخصوص خودروهای بدون آلایندگی (برقی).', 'a green rectangle painted on grey asphalt with a white car seen from the front.'),
     n('V50', 'Færdselstavlesymbol', 'تابلو روی جاده', 'تابلوی سرعت یا تابلوی دیگری که روی جاده تکرار شده است.', ROAD + 'a round red-bordered speed sign with "60" painted on the lane.'),
     n('V60', 'Sikkerhedssymbol', 'علامت فاصله‌ی ایمنی', 'علامت‌های پیکان‌مانند روی جاده که فاصله‌ی ایمنیِ پیشنهادی را نشان می‌دهند: وقتی **دو علامت** بین شما و خودروی جلو باشد، حداقل فاصله را دارید.', ROAD + 'a long white chevron (arrow head) painted across the lane, pointing forward.'),
     n('V61', 'Symbol for frakørselsnummer', 'شماره‌ی خروجی روی جاده', 'شماره‌ی خروجی روی خط بزرگراه: خطی را نشان می‌دهد که برای رسیدن به آن خروجی پیشنهاد می‌شود.', ROAD + 'a white elongated hexagon outline with the number "59" inside, painted on the lane.'),
     n('V62', 'Ruteidentifikationssymbol for supercykelsti', 'علامت سوپر مسیر دوچرخه', 'نشان سوپر مسیر دوچرخه روی مسیر.', 'the orange letter-C supercycle-path symbol painted on grey asphalt.')])

# ---------------------------------------------------------------- X Y Z
cat('X', 'چراغ‌های راهنمایی', 'چراغ اصلی، فلش‌دار، دوچرخه و عابر.',
    'ترتیب اعتبار: دستور پلیس > چراغ راهنمایی > تابلو و خط‌کشی > قوانین عمومی. اگر چراغ تقاطع کار کند، باید از چراغ پیروی کنید، حتی اگر تابلوی حق تقدم آنجا باشد.',
    'A Danish traffic light pole at a junction with red, yellow and green lights, and a small pedestrian light beside it.',
    ['X11', 'X12', 'X13', 'X16', 'X18', 'X19'])

cat('Y', 'چراغ‌های خط', 'چراغ‌های بالای هر خط.',
    'چراغ‌های بالای خطوط (مثلاً در تونل، پل یا بزرگراه) نشان می‌دهند هر خط باز است یا بسته.',
    'Lane control signals above motorway lanes on a gantry: a red X, a yellow diagonal arrow and a green down arrow.',
    ['Y17'])

cat('Z', 'چراغ‌های چشمک‌زن', 'قرمز، زرد و آبی چشمک‌زن.',
    'چراغ چشمک‌زن **قرمز** یعنی توقف کامل (مثلاً در گذرگاه راه‌آهن یا پل متحرک)، **زرد** یعنی احتیاط ویژه (مثلاً پلیس مدرسه یا کار جاده‌ای) و **آبی** یعنی احتیاط ویژه به‌خاطر **تصادف یا آتش‌سوزی** در پیش.',
    'Two round red flashing lights side by side on a black panel beside a yellow flashing light, on a grey post.',
    [n('Z72.1', 'Rødt blinksignal', 'چراغ قرمز چشمک‌زن', 'یک یا دو چراغ قرمز چشمک‌زن: **باید بایستید**، پشت خط ایست یا در فاصله‌ی امن قبل از چراغ؛ مثلاً قبل از پل متحرک، راه‌بند متحرک، خروجی خودروهای امدادی یا جایی که هواپیما در ارتفاع کم از روی جاده می‌گذرد. اگر وقتی چراغ روشن شد آن‌قدر نزدیک بودید که ایستادن خطرناک بود، لازم نیست بایستید.', 'two large round red lights side by side on a black rectangular panel.'),
     'Z72.2', 'Z93',
     n('Z95', 'Blåt blinksignal', 'چراغ آبی چشمک‌زن', 'چراغ آبی چشمک‌زن یا گردان که پلیس و نیروهای امدادی می‌گذارند: به‌خاطر **تصادف یا آتش‌سوزی** در پیش با احتیاط ویژه رانندگی کنید.', 'one round blue light on a black square panel.')])
