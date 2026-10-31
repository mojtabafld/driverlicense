#!/usr/bin/env bash
# The new server's deploy, in place of DigitalOcean's: when GitHub's main has moved, the server takes it in (the
# built web app is in the repository, so there is nothing to build), installs the packages again if they changed, and
# restarts. Run by teoripro-update.timer; also by hand: sudo /opt/teoripro/deploy/oracle/update.sh
# A version that does not come up (its /api/health not answering with the database within 2 minutes) is rolled back
# at once to the one before, and remembered (data/.bad-version), so it is not taken in again; the next version on main
# is (Mojtaba 2026-10-31). Pull requests are checked first by .github/workflows/ci.yml.
# (All of it in main(), read whole before it runs: the reset below rewrites this very file.)
set -euo pipefail

main() {
  cd /opt/teoripro
  # (git as the app's user, who owns the folder: git refuses a folder owned by someone else)
  g() { sudo -u teoripro git "$@"; }
  local BAD=/opt/teoripro/data/.bad-version PORT now new
  PORT=$(grep -oP '^PORT=\K[0-9]+' /etc/teoripro/env 2>/dev/null || echo 3000)
  g fetch -q origin main
  now=$(g rev-parse HEAD); new=$(g rev-parse origin/main)
  [ "$now" = "$new" ] && return 0
  [ -f "$BAD" ] && [ "$(cat "$BAD")" = "$new" ] && return 0

  # Moves the folder to a version: its packages when the lock file differs, the units when they changed, a restart.
  go() {
    local from=$1 to=$2 changed
    changed=$(g diff --name-only "$from" "$to")
    g reset -q --hard "$to"
    if grep -qx 'package-lock.json' <<<"$changed"; then sudo -u teoripro npm ci --omit=dev --no-audit --no-fund; fi
    # (this script itself, and the units, as the repository has them now)
    if grep -q '^deploy/oracle/' <<<"$changed"; then
      cp deploy/oracle/teoripro.service deploy/oracle/teoripro-update.service deploy/oracle/teoripro-update.timer /etc/systemd/system/
      systemctl daemon-reload
    fi
    systemctl restart teoripro
  }
  # Up: the server answers /api/health with its database within 2 minutes (the vault and the database take a while).
  up() {
    for _ in $(seq 1 40); do
      curl -sf --max-time 5 "http://127.0.0.1:$PORT/api/health" | grep -q '"db":true' && return 0
      sleep 3
    done
    return 1
  }

  go "$now" "$new"
  if up; then
    rm -f "$BAD"
    echo "updated ${now:0:7} -> ${new:0:7}"
  else
    echo "version ${new:0:7} did not come up; rolling back to ${now:0:7}" >&2
    echo "$new" > "$BAD"
    go "$new" "$now"
    if up; then echo "rolled back to ${now:0:7}"; else echo "rolled back to ${now:0:7}, but it does not answer either" >&2; fi
    return 1
  fi
}
main "$@"; exit $?
