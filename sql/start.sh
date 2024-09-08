#!/usr/bin/env bash

docker compose up --build --force-recreate --detach && \
docker compose ps
