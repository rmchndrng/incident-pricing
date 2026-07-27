## build
npm install

## deploy
Node.js interpreted stack — dependencies installed in place, no binary artifact to deploy. The service runs directly from /workspace via `node index.js`.

## stop
pkill -TERM -f 'node .*index.js'

## start
node index.js

## health
GET /health
