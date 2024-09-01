import http from 'node:http'
import app from './koa.js'
import handleListen from './handle-listen.js'
import handleError from './handle-error.js'

let httpServer =  http.createServer(app.callback())

httpServer.on('upgrade', (request, socket, head)=> { }) // websocket connections
httpServer.on('listening', handleListen(httpServer))
httpServer.on('error', handleError)

httpServer.listen(process.env.PORT)
