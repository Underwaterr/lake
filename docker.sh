#!/usr/bin/env bash

docker build --tag lake . &&
docker container run -it --rm -p 9000:9000 --name lake lake
