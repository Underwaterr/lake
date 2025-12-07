# Lake

Robotics 88 back-end server.

- `gdal.sh` is for managing the Geospatial Data Abstraction Library (GDAL) container.
- `/sql` includes scripts for managing a Postgres Docker container, as well as seed data and migrations.
- `/js` is the heart of the app, a Node.js API.

## API Endpoints

The API is split into two sections, `services` and `entities`. 
- `services`
    - `authentication`, session management for both User and Drone API access
    - `cortex`, convenience functions for processing Geospatial data on the server
    - `monitoring`, health checks for websocket connections, the database and the server itself
- `entities`, for RESTful CRUD operations on relational SQL data. Entities included `user`, `flight`, `burn-unit` and more.
