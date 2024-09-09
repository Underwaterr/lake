#!/usr/bin/env bash

docker image prune -f && \
docker compose down --volumes && \
docker compose up --build --force-recreate --detach && \
docker compose ps
