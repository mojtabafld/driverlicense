#!/usr/bin/env bash
# The new server's deploy, in place of DigitalOcean's: when GitHub's main has moved, the server takes it in (the
# built web app is in the repository, so there is nothing to build), installs the packages again if they changed, and
# restarts. Run by teoripro-update.timer; also by hand: sudo /opt/teoripro/deploy/oracle/update.sh
set -euo pipefail
cd /opt/teoripro
# (git as the app's user, who owns the folder: git refuses a folder owned by someone else)
g() { sudo -u teoripro git "$@"; }
g fetch -q origin main
now=$(g rev-parse HEAD) new=$(g rev-parse origin/main)
[ "$now" = "$new" ] && exit 0
changed=$(g diff --name-only "$now" "$new")
g reset -q --hard "$new"
if grep -qx 'package-lock.json' <<<"$changed"; then sudo -u teoripro npm ci --omit=dev --no-audit --no-fund; fi
# (this script itself, and the units, as the repository has them now)
if grep -q '^deploy/oracle/' <<<"$changed"; then
  cp deploy/oracle/teoripro.service deploy/oracle/teoripro-update.service deploy/oracle/teoripro-update.timer /etc/systemd/system/
  systemctl daemon-reload
fi
systemctl restart teoripro
echo "updated ${now:0:7} -> ${new:0:7}"
