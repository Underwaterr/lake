FROM postgis/postgis:16-3.4-alpine

ENV POSTGRES_USER=lake_admin
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=lake

COPY migrations/001-initialize.sql      /docker-entrypoint-initdb.d/
COPY migrations/002-elevation-model.sql /docker-entrypoint-initdb.d/
COPY seed.sql                           /docker-entrypoint-initdb.d/
