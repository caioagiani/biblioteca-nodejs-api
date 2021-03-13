#!/bin/bash
set -e

if [ -f .env ]; then
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

echo "stop & remove old docker and starting new instance of [$PROJECT_NAME]"
(docker kill $PROJECT_NAME || :) && \
  (docker rm $PROJECT_NAME || :) && \
  docker run --name $PROJECT_NAME \
  -e MONGO_INITDB_ROOT_USERNAME=$DB_NAME \
  -e MONGO_INITDB_ROOT_PASSWORD=$DB_PASS \
  -p 27017:27017 --rm -it \
  -d mongo

echo "database on: mongodb://$DB_NAME:$DB_PASS@localhost:27017/admin";