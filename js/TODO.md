
Cortex: figure out how/where to save files
(Including "volume" on Digital Ocean)
  - 'elevation-models/cache/'
  - 'elevation-models/'

Make endpoints for Migrations &amp; Elevation Models

use `ST_MakeEnvelope` to derive geography(polygon) from coordinates


--

- IP tracking is just localhost rn lol
- set up ping/pong for websockets to handle `kill -9 [pid]`
- Lepidopterist / Proboscis
    admin-only authentication!
    crud operations
    web socket monitoring
    user management
    user session info
    datbase schema!
  - Admin view!
  - `process.memoryUsage()`?
  - websocket status! (that updates real-time)
  - view logz
  - what branch / commit is Hello Decco on?

- run ros2 thru Docker
- test for brute-force passwort attempts
- handle DDoS for upgrade requests for websockets

handle these cases consistently:
  - fails to be unique (email, etc)
  - specified thing not found

get configuration from the database (per organization?)
  - max login attempts

--

Things to change on the other end:
  - ORGANIZAITON_ID on Decco `.env`
  - authentication paths changed

--

SQL Stuff
  - split back into separate seed file
  - have just one big shell script that takes an argument
    e.g. `db restart`
