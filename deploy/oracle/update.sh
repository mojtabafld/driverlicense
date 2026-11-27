#!/usr/bin/env bash
# The server's deploy: when the branch it follows on GitHub has moved, the server takes it in, installs the packages
# again if they changed, and restarts. Run by teoripro-update.timer (production) and teoripro-staging-update.timer
# (staging); also by hand: sudo /opt/teoripro/deploy/oracle/update.sh
# A version that does not come up (its /api/health not answering with the database within 2 minutes) is rolled back
# at once to the one before, and remembered (data/.bad-version), so it is not taken in again; the next version is
# (Mojtaba 2026-10-31).
#
# CI/CD (Mojtaba 2026-11-15, «CI/CD کامل … با محیط staging جدا از production»): GitHub Actions tests and builds every
# merge into main and publishes the result, with the web app built, to the branch deploy/staging
# (.github/workflows/deploy.yml); «Promote to production» (promote.yml) copies what staging runs to deploy/production.
# Which instance this is, from the unit (Environment=…), production's as before when nothing is set:
#   TP_DIR      the checkout                 /opt/teoripro
#   TP_BRANCH   the branch it follows        main (deploy/production once production follows the builds)
#   TP_SERVICE  its systemd unit             teoripro
#   TP_ENV      its settings (for its PORT)  /etc/teoripro/env
# Only the newest commit is fetched (--depth 1), and after a good update the old ones are let go (git gc), so the
# checkout stays small; the one running before stays until then, for the rollback.
# (All of it in main(), read whole before it runs: the reset below rewrites this very file.)
set -euo pipefail
main() {
  local DIR=${TP_DIR:-/opt/teoripro} BRANCH=${TP_BRANCH:-main} SERVICE=${TP_SERVICE:-teoripro} ENVF=${TP_ENV:-/etc/teoripro/env}
  cd "$DIR"
  # (git as the app's user, who owns the folder: git refuses a folder owned by someone else)
  g() { sudo -u teoripro git "$@"; }
  local BAD="$DIR/data/.bad-version" PORT now new
  PORT=$(grep -oP '^PORT=\K[0-9]+' "$ENVF" 2>/dev/null || echo 3000)
  g fetch -q --depth 1 origin "$BRANCH"
  now=$(g rev-parse HEAD); new=$(g rev-parse FETCH_HEAD)
  [ "$now" = "$new" ] && return 0
  [ -f "$BAD" ] && [ "$(cat "$BAD")" = "$new" ] && return 0
  # This instance's units, as the repository has them (production's, or staging's).
  local units
  if [ "$SERVICE" = teoripro ]; then units="teoripro.service teoripro-update.service teoripro-update.timer"
  else units="$SERVICE.service $SERVICE-update.service $SERVICE-update.timer"; fi
  # Moves the folder to a version: its packages when the lock file differs, the units when they changed, a restart.
  go() {
    local from=$1 to=$2 changed
    changed=$(g diff --name-only "$from" "$to")
    g reset -q --hard "$to"
    if grep -qx 'package-lock.json' <<<"$changed"; then sudo -u teoripro npm ci --omit=dev --no-audit --no-fund; fi
    # (this script itself, and the units, as the repository has them now)
    if grep -q '^deploy/oracle/' <<<"$changed"; then
      local u; for u in $units; do if [ -f "deploy/oracle/$u" ]; then cp "deploy/oracle/$u" /etc/systemd/system/; fi; done
      systemctl daemon-reload
    fi
    systemctl restart "$SERVICE"
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
    echo "updated ${now:0:7} -> ${new:0:7} ($BRANCH)"
    # (the versions before are not needed any more: let them go, so the checkout does not grow)
    g reflog expire --expire=now --all >/dev/null 2>&1 || true
    g gc -q --prune=now >/dev/null 2>&1 || true
  else
    echo "version ${new:0:7} did not come up; rolling back to ${now:0:7}" >&2
    echo "$new" > "$BAD"
    go "$new" "$now"
    if up; then echo "rolled back to ${now:0:7}"; else echo "rolled back to ${now:0:7}, but it does not answer either" >&2; fi
    return 1
  fi
}
main "$@"; exit $?
