#!/usr/bin/env bash

cat ./config/.config.auth.env ./config/.config.sms.env > .env
docker-compose up --build