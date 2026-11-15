#!/usr/bin/env bash
# Sets up Teoripro's staging copy beside production (Mojtaba 2026-11-15), once, as root:
#   sudo bash /opt/teoripro/deploy/oracle/setup-staging.sh teori-staging.bitlane.app
# (one level under bitlane.app: Cloudflare's free certificate covers *.bitlane.app, not *.teori.bitlane.app)
# - /opt/teoripro-staging: the branch deploy/staging (what GitHub Actions built from main), owned by the app's user;
# - /etc/teoripro-staging/env: port 3001, its own file database (/opt/teoripro-staging/data/db.json), no vault, no
#   Oracle database, no bucket: nothing it does reaches production's data or keys;
# - teoripro-staging.service, and teoripro-staging-update.timer taking in each new build every two minutes.
# It touches neither production (/opt/teoripro, /etc/teoripro, its units) nor Caddy: the site block for the domain is
# printed at the end, to add to Caddy by hand. Run again, it leaves what is there and only fills in what is missing.
set -euo pipefail
DOMAIN=${1:?usage: setup-staging.sh <staging domain, e.g. teori-staging.bitlane.app>}
DIR=/opt/teoripro-staging ETC=/etc/teoripro-staging PORT=3001
[ "$(id -u)" = 0 ] || { echo "run as root (sudo)"; exit 1; }
REPO=$(sudo -u teoripro git -C /opt/teoripro remote get-url origin)
# (the client's address header as production has it: cf-connecting-ip behind Cloudflare's tunnel, else Caddy's)
IPH=$(grep -oP '^CLIENT_IP_HEADER=\K.*' /etc/teoripro/env 2>/dev/null || echo x-forwarded-for)
if [ ! -d "$DIR/.git" ]; then
  install -d -o teoripro -g teoripro "$DIR"
  sudo -u teoripro git clone -q --depth 1 --branch deploy/staging "$REPO" "$DIR"
fi
install -d -o teoripro -g teoripro "$DIR/data"
(cd "$DIR" && sudo -u teoripro npm ci --omit=dev --no-audit --no-fund)
install -d -m 750 -o root -g teoripro "$ETC"
if [ ! -f "$ETC/env" ]; then
  cat > "$ETC/env" <<ENV
# Teoripro staging (setup-staging.sh). No secrets here: AI, mail, payments and push stay off unless you add keys.
PORT=$PORT
HOST=127.0.0.1
TZ=Europe/Copenhagen
CLIENT_IP_HEADER=$IPH
DB_FILE=$DIR/data/db.json
PUBLIC_URL=https://$DOMAIN
PUBLIC_HOSTS=$DOMAIN
PUBLIC_ORIGIN=https://$DOMAIN
ADMIN_USERS=
ENV
  chmod 640 "$ETC/env"; chown root:teoripro "$ETC/env"
fi
chmod +x "$DIR/deploy/oracle/update.sh"
cp "$DIR/deploy/oracle/teoripro-staging.service" "$DIR/deploy/oracle/teoripro-staging-update.service" "$DIR/deploy/oracle/teoripro-staging-update.timer" /etc/systemd/system/
systemctl daemon-reload
systemctl enable -q --now teoripro-staging teoripro-staging-update.timer
for _ in $(seq 1 30); do curl -sf "http://127.0.0.1:$PORT/api/health" >/dev/null && break; sleep 2; done
curl -sf "http://127.0.0.1:$PORT/api/health" && echo && echo "staging is up on 127.0.0.1:$PORT"
cat <<NEXT

Now open $DOMAIN to it, the way production is opened:
- Cloudflare Tunnel: Zero Trust → Networks → Tunnels → this server's tunnel → Public hostnames → Add:
  $DOMAIN, Service HTTP, localhost:$PORT (and, to keep it to yourself, an Access application for $DOMAIN).
- or Caddy: add this site (e.g. /etc/caddy/Caddyfile), point $DOMAIN's DNS here, then sudo systemctl reload caddy
    $DOMAIN {
    	encode gzip
    	reverse_proxy 127.0.0.1:$PORT
    }
NEXT
