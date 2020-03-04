#!/bin/bash
container=hobbytaste_mongodb
sudo docker stop ${container}
sudo docker rm ${container}
trap 'exit 1' INT TERM QUIT HUP
trap 'sudo docker stop ${container} > /dev/null && sudo docker rm ${container} > /dev/null' EXIT
sudo docker pull mongo && sudo docker run -dp 27017:27017 --name ${container} mongo &&
NODE_APP_INSTANCE=secrets NODE_ENV=development ts-node-dev --project server/tsconfig.json --clear --respawn --transpileOnly ./server/app.ts
