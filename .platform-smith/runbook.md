## build
no build step — sources run directly

## deploy
The service runs directly from source via Node.js without a compilation step. Code changes take effect on restart.

## stop
pkill -TERM -f 'node .*index.js'

## start
node index.js

## health
GET /health
