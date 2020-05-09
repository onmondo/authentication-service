#!/usr/bin/env bash

docker-compose down
rm .env
cat ./config/.auth.env ./config/.sms.env ./config/.users.env> .env
docker-compose up --build --detach