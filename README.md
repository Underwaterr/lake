# Lake

Robotics 88 back-end server.

- `gdal.sh` is for managing the Geospatial Data Abstraction Library (GDAL) container.
- `/sql` includes scripts for managing a Postgres Docker container, as well as seed data and migrations.
- `/js` is the heart of the app, a Node.js API.
- `/test` is for integration tests

## API Endpoints

The API is split into two sections, `services` and `entities`. 
- `/entities`, RESTful CRUD operations on relational SQL data. 
    - `/user` for user data
    - `/flight` for flight data
    - etc...
- `/services`
    - `/authentication`, session management for both User and Drone API access
    - `/cortex`, convenience functions for processing Geospatial data on the server
    - `/monitoring`, health checks for websocket connections, the database and the server itself
