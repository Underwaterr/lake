
Right now, doing `kill -9 [pid]` on Tymbal doesn't let the process "hang up", so the websocket will just hang! so we need to set up ping/pong to auto-disconnect


write tests for "prevent brute-force password attempts"

avoid DDoS for websocket connections

handle these cases consistently:
  - fails to be unique (email, etc)
  - specified thing not found

get configuration from the database (per organization?)
  - max login attempts

handle websocket timeouts with pings
https://github.com/websockets/ws/tree/master?tab=readme-ov-file#how-to-detect-and-close-broken-connections

admin page features...
  - `process.memoryUsage()`?
  - websocket status!
  - view logz

--

Things to change on the other end:
  - ORGANIZAITON_ID on Decco `.env`
  - authentication paths changed
  - GeoJSON for storing points/paths/locations
