## build
npm install

## deploy
The service runs directly from source (interpreted Node.js) — dependencies are installed in-place under node_modules/, and the running process re-reads the updated index.js when restarted.

## stop
pkill -TERM -f 'node index.js'

## start
node index.js

## health
GET /health
