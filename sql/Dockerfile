FROM postgis/postgis:16-3.4-alpine

ENV POSTGRES_USER=lake_admin
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=lake

COPY initialize.sql /docker-entrypoint-initdb.d/
COPY session.sql /docker-entrypoint-initdb.d/
#COPY seed.sql /docker-entrypoint-initdb.d/
