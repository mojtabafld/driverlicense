#!/usr/bin/env bash
# Sets up Teoripro on an Oracle Cloud Ampere (ARM) server running Ubuntu 22.04 or 24.04, once:
#   curl -fsSL https://raw.githubusercontent.com/mojtabafld/driverlicense/main/deploy/oracle/setup.sh | sudo bash -s teori.bitlane.app
# Node.js 22, Caddy (HTTPS), the app in /opt/teoripro run by its own user, its settings in /etc/teoripro/env (to fill in
# afterwards), the update every two minutes from GitHub, and ports 80 and 443 opened in the server's own firewall.
# Running it again is harmless.
set -euo pipefail
DOMAIN=${1:-teori.bitlane.app}
REPO=${REPO:-https://github.com/mojtabafld/driverlicense.git}
[ "$(id -u)" = 0 ] || { echo "Run it with sudo."; exit 1; }
. /etc/os-release; [ "$ID" = ubuntu ] || { echo "This script is for Ubuntu (this server: $ID)."; exit 1; }

echo "== packages"
apt-get update -q
apt-get install -y -q git curl ca-certificates gnupg debian-keyring debian-archive-keyring apt-transport-https iptables-persistent
if ! command -v node >/dev/null || [ "$(node -v | cut -c2- | cut -d. -f1)" -lt 22 ]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y -q nodejs
fi
if ! command -v caddy >/dev/null; then
  curl -1sLf https://dl.cloudsmith.io/public/caddy/stable/gpg.key | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt > /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -q && apt-get install -y -q caddy
fi

echo "== the app"
id teoripro >/dev/null 2>&1 || useradd --system --create-home --home-dir /home/teoripro --shell /usr/sbin/nologin teoripro
if [ ! -d /opt/teoripro/.git ]; then git clone -q "$REPO" /opt/teoripro; fi
chown -R teoripro:teoripro /opt/teoripro
cd /opt/teoripro && sudo -u teoripro npm ci --omit=dev --no-audit --no-fund
chmod +x deploy/oracle/update.sh
mkdir -p /etc/teoripro/wallet
[ -f /etc/teoripro/env ] || cp deploy/oracle/env.example /etc/teoripro/env
chown -R root:teoripro /etc/teoripro && chmod 750 /etc/teoripro /etc/teoripro/wallet && chmod 640 /etc/teoripro/env

echo "== services"
cp deploy/oracle/teoripro.service deploy/oracle/teoripro-update.service deploy/oracle/teoripro-update.timer /etc/systemd/system/
systemctl daemon-reload
systemctl enable -q teoripro teoripro-update.timer
systemctl start teoripro-update.timer
sed "s/^DOMAIN {/$DOMAIN {/" deploy/oracle/Caddyfile > /etc/caddy/Caddyfile
systemctl reload caddy || systemctl restart caddy

echo "== firewall (the server's own; the cloud's Security List is opened in the console)"
for p in 80 443; do
  iptables -C INPUT -p tcp --dport $p -m state --state NEW -j ACCEPT 2>/dev/null || iptables -I INPUT 5 -p tcp --dport $p -m state --state NEW -j ACCEPT
done
netfilter-persistent save >/dev/null

echo
echo "Done. Next: fill in /etc/teoripro/env (sudo nano /etc/teoripro/env), then: sudo systemctl restart teoripro"
echo "Its log: sudo journalctl -u teoripro -f"
