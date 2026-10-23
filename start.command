#!/bin/zsh
# Double-click to start Grønpil, then open http://localhost:3000
cd "$(dirname "$0")"
(sleep 1 && open http://localhost:3000) &
node server.js
