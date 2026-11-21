#!/usr/bin/env bash
# Installs or updates Labs MCP from this folder (Mojtaba 2026-11-12):
#   sudo bash /opt/teoripro/tools/labs-mcp/install.sh
# - copies server.js to /opt/labs-mcp and the unit to /etc/systemd/system/labs-mcp.service;
# - the first time, writes /etc/labs-mcp/env with a new random LABS_MCP_TOKEN (shown once) and makes /opt/labs;
# - (re)starts the service. Later runs keep the settings and only update the code.
set -euo pipefail
[ "$(id -u)" = 0 ] || { echo "run it with sudo"; exit 1; }
here=$(cd "$(dirname "$0")" && pwd)
command -v node >/dev/null || { echo "node is not installed"; exit 1; }
install -d -m 755 /opt/labs-mcp /opt/labs
install -m 644 "$here/server.js" /opt/labs-mcp/server.js
install -m 644 "$here/labs-mcp.service" /etc/systemd/system/labs-mcp.service
sed -i "s#/usr/bin/node#$(command -v node)#" /etc/systemd/system/labs-mcp.service
if [ ! -f /etc/labs-mcp/env ]; then
  install -d -m 700 /etc/labs-mcp
  token=$(openssl rand -hex 32)
  umask 077
  cat > /etc/labs-mcp/env <<ENV
# Labs MCP settings (server.js). After a change: sudo systemctl restart labs-mcp
LABS_MCP_TOKEN=$token
LABS_MCP_PORT=8790
LABS_DIR=/opt/labs
# 1 = the run_command tool (any shell command as root) is on
LABS_MCP_SHELL=0
# the units service_action may start, stop or restart, comma-separated (e.g. docker,teoripro)
LABS_MCP_UNITS=
ENV
  chmod 600 /etc/labs-mcp/env
  echo
  echo "LABS_MCP_TOKEN (shown this once; it is in /etc/labs-mcp/env):"
  echo "  $token"
  echo
fi
touch /var/log/labs-mcp.log && chmod 600 /var/log/labs-mcp.log
systemctl daemon-reload
systemctl enable -q labs-mcp
systemctl restart labs-mcp
sleep 1
curl -fsS http://127.0.0.1:8790/health >/dev/null && echo "labs-mcp is running on 127.0.0.1:8790" || { echo "labs-mcp did not start:"; journalctl -u labs-mcp -n 20 --no-pager; exit 1; }
