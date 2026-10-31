#!/usr/bin/env bash
# Sets up Teoripro on an Oracle Cloud Ampere (ARM) server running Ubuntu 22.04 or 24.04, once:
#   curl -fsSL https://raw.githubusercontent.com/mojtabafld/driverlicense/main/deploy/oracle/setup.sh | sudo bash -s teori.bitlane.app
# Behind a Cloudflare Tunnel (the site reached through cloudflared, no port opened; Mojtaba's server), add «tunnel»:
#   ... | sudo bash -s teori.bitlane.app tunnel
# then Caddy and the firewall are left alone and the tunnel points at http://localhost:3000 (README).
# Node.js 22, Caddy (HTTPS), the app in /opt/teoripro run by its own user, its settings in /etc/teoripro/env (to fill in
# afterwards), the update every two minutes from GitHub, and ports 80 and 443 opened in the server's own firewall.
# Running it again is harmless.
set -euo pipefail
DOMAIN=${1:-teori.bitlane.app}
MODE=${2:-caddy}
REPO=${REPO:-https://github.com/mojtabafld/driverlicense.git}
[ "$(id -u)" = 0 ] || { echo "Run it with sudo."; exit 1; }
. /etc/os-release; [ "$ID" = ubuntu ] || { echo "This script is for Ubuntu (this server: $ID)."; exit 1; }

# Something else on the server (e.g. a web page of Containerlab, or another proxy) already on the ports Caddy and the app
# need: stop here and say which, rather than break it (FORCE=1 to go on anyway).
PORTS='80|443|3000'; [ "$MODE" = tunnel ] && PORTS=3000
busy=$(ss -ltnpH 2>/dev/null | awk -v p="$PORTS" '$4 ~ ":(" p ")$"' | grep -v -e '"caddy"' -e '"node"' || true)
if [ -n "$busy" ] && [ "${FORCE:-}" != 1 ]; then
  echo "These ports are in use by another program (Teoripro needs 80 and 443 for HTTPS, and 3000):"
  echo "$busy"
  echo "Free them, or run again with FORCE=1 if you know they will not clash."
  exit 1
fi

echo "== packages"
apt-get update -q
apt-get install -y -q git curl ca-certificates gnupg debian-keyring debian-archive-keyring apt-transport-https iptables-persistent
if ! command -v node >/dev/null || [ "$(node -v | cut -c2- | cut -d. -f1)" -lt 22 ]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y -q nodejs
fi
if [ "$MODE" != tunnel ] && ! command -v caddy >/dev/null; then
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
if [ ! -f /etc/teoripro/env ]; then
  cp deploy/oracle/env.example /etc/teoripro/env
  # (the visitor's address: from Cloudflare's header behind the tunnel, from Caddy's otherwise; server.js clientIp)
  if [ "$MODE" = tunnel ]; then sed -i 's/^CLIENT_IP_HEADER=.*/CLIENT_IP_HEADER=cf-connecting-ip/' /etc/teoripro/env; fi
fi
chown -R root:teoripro /etc/teoripro && chmod 750 /etc/teoripro /etc/teoripro/wallet && chmod 640 /etc/teoripro/env

echo "== services"
cp deploy/oracle/teoripro.service deploy/oracle/teoripro-update.service deploy/oracle/teoripro-update.timer /etc/systemd/system/
# (the service fenced in: what it may write and its share of the machine; teoripro-hardening.conf)
mkdir -p /etc/systemd/system/teoripro.service.d && cp deploy/oracle/teoripro-hardening.conf /etc/systemd/system/teoripro.service.d/hardening.conf
systemctl daemon-reload
systemctl enable -q teoripro teoripro-update.timer
systemctl start teoripro-update.timer
if [ "$MODE" = tunnel ]; then
  echo "Cloudflare Tunnel: Caddy and the firewall are left as they are; point the tunnel's public hostname $DOMAIN at http://localhost:3000."
else
  # Caddy may be there already, serving other sites (Mojtaba's server: a Containerlab page): Teoripro's site is added to
  # the Caddyfile it runs with, never written over it; a copy is kept first, and it goes back if Caddy refuses the new one.
  CF=$(ps -o args= -C caddy 2>/dev/null | grep -o -- '--config [^ ]*' | head -1 | cut -d' ' -f2 || true)
  CF=${CF:-/etc/caddy/Caddyfile}
  if [ -f "$CF" ] && grep -q "^$DOMAIN\b" "$CF"; then
    echo "Caddy: $DOMAIN is in $CF already."
  elif [ -f "$CF" ] || [ ! -e "$CF" ]; then
    [ -f "$CF" ] && cp "$CF" "$CF.before-teoripro"
    { [ -s "$CF" ] && echo; sed "s/^DOMAIN {/$DOMAIN {/" deploy/oracle/Caddyfile; } >> "$CF"
    if caddy validate --config "$CF" --adapter caddyfile >/dev/null 2>&1; then
      if systemctl is-active -q caddy; then systemctl reload caddy; else caddy reload --config "$CF" --adapter caddyfile || systemctl restart caddy; fi
      echo "Caddy: $DOMAIN added to $CF (the old one: $CF.before-teoripro)."
    else
      [ -f "$CF.before-teoripro" ] && mv "$CF.before-teoripro" "$CF"
      echo "Caddy did not take the new site; $CF is back as it was. Add this to Caddy's settings yourself:"
      sed "s/^DOMAIN {/$DOMAIN {/" deploy/oracle/Caddyfile
    fi
  fi

  echo "== firewall (the server's own; the cloud's Security List is opened in the console)"
  for p in 80 443; do
    iptables -C INPUT -p tcp --dport $p -m state --state NEW -j ACCEPT 2>/dev/null || iptables -I INPUT 5 -p tcp --dport $p -m state --state NEW -j ACCEPT
  done
  netfilter-persistent save >/dev/null

fi

echo
echo "Done. Next: fill in /etc/teoripro/env (sudo nano /etc/teoripro/env), then: sudo systemctl restart teoripro"
echo "Its log: sudo journalctl -u teoripro -f"
