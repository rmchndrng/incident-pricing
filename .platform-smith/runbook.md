## build
no build step — sources run directly

## deploy
Node.js interpreted sources run in place from /app (inferred — low confidence: no original Dockerfile to reference deployment pattern)

## stop
pkill -TERM -f 'node.*index.js'

## start
node index.js

## health
TCP :3000
