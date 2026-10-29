# انتقال Teoripro به Oracle Cloud

سرور: Ampere (ARM) رایگان، اوبونتو. دیتابیس: Autonomous Database رایگان («AI Database»، ۲۰ گیگ).
برنامه همان است؛ فقط وقتی `ORACLE_CONNECT_STRING` تنظیم شده باشد داده‌ها را در Oracle نگه می‌دارد (`store.js`).

ترتیب کار: ۱ دیتابیس → ۲ سرور → ۳ تنظیمات → ۴ انتقال داده → ۵ امتحان → ۶ تغییر DNS → ۷ پایان.
تا قدم ۶ سایت فعلی روی DigitalOcean بدون تغییر کار می‌کند.

## ۱. دیتابیس (Autonomous Database)

1. در کنسول Oracle Cloud: **Oracle Database → Autonomous Database → Create**.
   - Workload: **Transaction Processing** (یا JSON)، گزینه‌ی **Always Free** روشن.
   - یک رمز برای کاربر `ADMIN` بگذارید و نگه دارید.
2. بعد از ساخته شدن، در صفحه‌ی دیتابیس: **Network → Access control list → Edit**:
   آی‌پی عمومی سرور Ampere را اضافه کنید. بعد **Mutual TLS (mTLS) authentication → Edit → Not required**.
   (این‌طور به wallet نیازی نیست؛ ارتباط باز هم رمزنگاری‌شده است.)
3. **Database connection** → بخش **TLS** → رشته‌ی اتصالِ `..._tp` (یا `..._low`) را کپی کنید؛ چیزی شبیه
   `(description= (retry_count=20)... (host=adb....oraclecloud.com))(connect_data=(service_name=..._tp.adb.oraclecloud.com))...)`.

> اگر mTLS را نمی‌خواهید خاموش کنید: Wallet را دانلود کنید، روی سرور در `/etc/teoripro/wallet` باز کنید
> و `ORACLE_WALLET_DIR` و `ORACLE_WALLET_PASSWORD` را در تنظیمات بگذارید.

جدول‌ها را خود برنامه بار اول می‌سازد.

## ۲. سرور (Ampere)

1. در کنسول: **Networking → Virtual Cloud Networks → (VCN سرور) → Security Lists → Default**:
   دو **Ingress Rule** اضافه کنید: Source `0.0.0.0/0`، TCP، پورت `80` و پورت `443`.
2. با SSH به سرور وصل شوید و این را اجرا کنید (دامنه آخرش است):
   ```bash
   curl -fsSL https://raw.githubusercontent.com/mojtabafld/driverlicense/main/deploy/oracle/setup.sh | sudo bash -s teori.bitlane.app
   ```
   Node.js، Caddy (برای HTTPS)، خود برنامه در `/opt/teoripro`، سرویس‌ها و فایروال خود سرور را نصب و تنظیم می‌کند.
   برنامه هنوز روشن نمی‌شود.
   اگر Caddy از قبل روی سرور هست (مثلاً برای صفحه‌ی Containerlab)، همان می‌ماند: سایت Teoripro به آخر Caddyfileِ
   فعلی اضافه می‌شود و یک نسخه‌ی قبلی (`Caddyfile.before-teoripro`) کنارش نگه داشته می‌شود؛ سایت‌های دیگر دست نمی‌خورند.
   اگر برنامه‌ی دیگری (نه Caddy) پورت ۸۰، ۴۴۳ یا ۳۰۰۰ را گرفته باشد، اسکریپت پیش از هر کاری می‌ایستد و می‌گوید کدام.

## ۳. تنظیمات

```bash
sudo nano /etc/teoripro/env
```
- `ORACLE_USER=ADMIN`، `ORACLE_PASSWORD=...`، و `ORACLE_CONNECT_STRING='...'` (رشته‌ی قدم ۱، در یک خط، داخل ' ').
- بقیه را از DigitalOcean کپی کنید: **App → Settings → App-Level Environment Variables**، همان نام‌ها و مقدارها
  (`ANTHROPIC_API_KEY`، `STRIPE_*`، `RESEND_*`، `GOOGLE_*`، `ADMIN_USERS`، `DEFAULT_THEME`، `VAPID_*` و ...).
  `DATABASE_URL` را این‌جا **نگذارید**.
- مقداری که فاصله یا " دارد (مثل JSON سرویس‌اکانت گوگل‌پلی، در یک خط) را داخل ' ' بگذارید.

> مهم: تا `ORACLE_CONNECT_STRING` پر نشده برنامه را روشن نکنید؛ بدون آن برنامه داده‌ها را در یک فایل
> محلی نگه می‌دارد، نه در Oracle.

## ۴. انتقال داده از DigitalOcean

1. در DigitalOcean: **Databases → (دیتابیس) → Settings → Trusted sources**: آی‌پی سرور Ampere را اضافه کنید.
   از **Connection details** رشته‌ی اتصال (Connection string) را کپی کنید.
2. روی سرور (رشته‌ی اتصال DigitalOcean را به‌جای `...` بگذارید):
   ```bash
   cd /opt/teoripro
   sudo -u teoripro bash -c 'set -a; . /etc/teoripro/env; set +a; DATABASE_URL="..." node scripts/pg-to-oracle.js'
   ```
   حساب‌ها، نشست‌ها (کسی از حسابش بیرون نمی‌افتد)، تنظیمات سایت، حساب‌های حذف‌شده و تصویرهای ساخته‌شده کپی
   می‌شوند و در آخر تعدادها مقایسه می‌شوند: باید «Done: everything copied.» ببینید. اجرای دوباره بی‌خطر است.

## ۵. روشن کردن و امتحان

```bash
sudo systemctl start teoripro
sudo journalctl -u teoripro -n 20      # باید «Storage: Oracle Database (… users)» ببینید
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/   # 200
```

## ۶. تغییر DNS

1. در جایی که دامنه‌ی `bitlane.app` را مدیریت می‌کنید، رکورد **A** برای `teori` را به آی‌پی عمومی سرور Ampere
   تغییر دهید (اگر CNAME به DigitalOcean است، حذفش کنید و A بگذارید).
2. چند دقیقه بعد Caddy خودش گواهی HTTPS را می‌گیرد؛ `https://teori.bitlane.app` باید باز شود.
3. **درست بعد از تغییر DNS**، قدم ۴-۲ را یک بار دیگر اجرا کنید و بعد `sudo systemctl restart teoripro`؛ تا
   تغییرهایی که در این فاصله روی سرور قبلی ثبت شده‌اند هم بیایند. بهتر است این کار را در ساعت خلوت انجام دهید.

نشانی‌های Stripe webhook، Resend webhook و ورود با گوگل همان دامنه‌اند و تغییری لازم ندارند.

## ۷. پایان

- به‌روزرسانی: سرور هر دو دقیقه GitHub را نگاه می‌کند و هر تغییرِ merge‌شده به `main` را خودش می‌گیرد و
  برنامه را دوباره روشن می‌کند (`teoripro-update.timer`). دستی: `sudo /opt/teoripro/deploy/oracle/update.sh`.
- لاگ‌ها: `sudo journalctl -u teoripro -f` — وضعیت: `sudo systemctl status teoripro`.
- وقتی یکی دو روز همه‌چیز درست کار کرد، اپ و دیتابیس DigitalOcean را حذف کنید.
- حساب Oracle را اگر می‌توانید به **Pay As You Go** ارتقا دهید: منابع Always Free رایگان می‌مانند و Oracle
  سرورِ کم‌مصرف را پس نمی‌گیرد.
