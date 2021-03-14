#!/bin/bash
set -e

if [ -f .env ]; then
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

echo "stop & remove old docker and starting new instance of [$DB_NAME]"
(docker kill $DB_NAME || :) && \
  (docker rm $DB_NAME || :) && \
  docker run --name $DB_NAME \
  -e MONGO_INITDB_ROOT_USERNAME=$DB_USER \
  -e MONGO_INITDB_ROOT_PASSWORD=$DB_PASS \
  -p 27017:27017 --rm -it \
  -d mongo

echo "database on: mongodb://$DB_USER:$DB_PASS@${DB_HOST}:27017/admin";
