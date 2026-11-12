# Labs MCP

Claude's DevOps tools on the server, over MCP: Containerlab labs (list, inspect, deploy, redeploy, destroy, exec,
save, graph, any `containerlab` command), Docker and Compose (containers, logs, stats, images, networks, pull, run,
exec, start/stop/rm, any `docker` command), systemd services (status, logs, and start/stop/restart for allowed
units), the lab files in `/opt/labs`, and optionally any shell command. A service of its own, apart from Teoripro:
it needs root, and Teoripro runs fenced in as its own user.

Install or update (on the server, from the repository Teoripro's update already keeps in `/opt/teoripro`):

    sudo bash /opt/teoripro/tools/labs-mcp/install.sh

The first run writes `/etc/labs-mcp/env` with a new `LABS_MCP_TOKEN` and shows it once. Settings there:
`LABS_DIR` (default `/opt/labs`), `LABS_MCP_SHELL=1` to turn on `run_command`, `LABS_MCP_UNITS` (the units
`service_action` may start, stop or restart). After a change: `sudo systemctl restart labs-mcp`.

It listens on `127.0.0.1:8790` only. To reach it from Claude, add a public hostname to the server's Cloudflare
Tunnel (e.g. `labs.bitlane.app` → `http://localhost:8790`). Clients send the token as `Authorization: Bearer …`, or
use `https://labs.bitlane.app/mcp/<token>` where no header can be set (a claude.ai custom connector). Calls are
logged in `/var/log/labs-mcp.log` (tool, arguments with secret-looking values hidden, exit code), never the output.
