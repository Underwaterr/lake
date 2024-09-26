
For Alex...
  - what are we getting with Burn Unit? Survey? etc..
  - we'll do some GeoJSON formatting tooo

- get multiple (fake?) Hello Decco websocket connections going
- set up ping/pong for websockets to handle `kill -9 [pid]`
- start Lepidopterist!
  - `process.memoryUsage()`?
  - websocket status! (that updates real-time)
  - view logz

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
  - GeoJSON for storing points/paths/locations

--

Patch it all up Wednesday
Deploy on Thors-day
Fix Decco stuff on Friday
Saturday YIKEzzz packing up
Sunday moving
