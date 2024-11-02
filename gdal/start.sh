#!/usr/bin/env bash

docker pull ghcr.io/osgeo/gdal:ubuntu-small-latest

# create the container if it doesn't exist
if [ ! $(docker ps -a -q -f name=gdal) ]; then
  docker run \
    --name gdal \
    --detach --interactive --tty \
    --volume /home/t/r88/jason/downloads:/data \
    ghcr.io/osgeo/gdal:ubuntu-small-latest
else echo "container exists"
fi

# restart the container if it is stopped
if [ $(docker ps -aq -f status=exited -f name=gdal) ]; then
  echo "starting container" && docker start gdal
else echo "container is running"
fi

docker ps
