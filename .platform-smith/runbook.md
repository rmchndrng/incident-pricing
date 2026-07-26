## build
no build step — Node.js source runs directly

## deploy
The service runs directly from source; no compilation or deployment artifacts required. The index.js file is the entry point.

## stop
pkill -TERM -f 'node index.js'

## start
node index.js

## health
GET /health
