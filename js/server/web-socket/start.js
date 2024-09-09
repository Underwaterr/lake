import reject from './reject.js'
import initialize from './initialize.js'
import connect from './connect.js'
import accept from './accept.js'
import events from './events.js'
import authenticateRequest from './authenticateRequest.js'
import authenticateSession from './authenticateSession.js'


// Each drone has their own dedicated WebSocket server
// mapping from the drone's name to their server
let webSocketServers = new Map()


export default function(request, socket, head) {
  // the following is a long run of functions
  // each passing a 'chest' object that collects data
  // similar to the 'request' object with Express middleware
  let chest = { request, socket, head, webSocketServers, error:null, path:null }

  // The websocket upgrade URL has two valid paths:
  //   `/to-decco`, connecting from Hello Decco to the drone
  //   `/to-hello-decco`, connecting from the drone to Hello Decco
  // we parse the path from the request URL
  let path = request.url.split('?')[0]
  chest.path = path

  if(path=='/to-hello-decco') {
    authenticateRequest(chest)  // authentication that checks for request header
      .then(initialize)         // creates & adds the websocket server object
      .then(accept)             // "handle upgrade" method, emit "connection" event
      .then(events)             // set ping/pong listening events & more!
      .catch(reject)            // asynchronously handle errors
  }
  else if (path=='/to-decco') {
    authenticateSession(chest)  // authentication that checks the session object
      .then(connect)            // finds the existing server & connects to it
      .then(accept)
      .catch(reject)
  }
  else reject(chest)
}
