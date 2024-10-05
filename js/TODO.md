
- IP tracking is just localhost rn lol
- set up ping/pong for websockets to handle `kill -9 [pid]`
- Lepidopterist / Proboscis
    admin-only authentication!

    crud operations
    web socket monitoring
    user management
    user session info
  - Admin view!
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

--

SQL Stuff
  - split back into separate seed file
  - have just one big shell script that takes an argument
    e.g. `db restart`
