#!/usr/bin/env bash

rm .env
cat ./config/.auth.env ./config/.sms.env ./config/.users.env > .env
docker-compose up --build