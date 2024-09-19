import http from 'node:http'
import app from './middleware/app.js'
import session from './middleware/session.js'
import handleUpgrade from './handle-upgrade.js'
import handleListen from './handle-listen.js'
import handleError from './handle-error.js'

export default function() {
  let httpServer =  http.createServer()
  httpServer.on('request', app) // pass requests to Express middleware
  httpServer.on('upgrade', handleUpgrade(session)) // for webSocket connections
  httpServer.on('listening', handleListen(httpServer))
  httpServer.on('error', handleError)
  httpServer.listen(process.env.PORT)
}
