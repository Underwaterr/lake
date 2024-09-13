import authenticateWebSocket from './web-socket/authenticate.js'
import setWebSocketClient from './web-socket/client.js'
import startWebSocketServer from './web-socket/server.js'

// keeping track of our webSocketServers
let webSocketServers = new Map()

export default session=> async (request, socket, head)=> {
  try {

    // check authentication
    await authenticateWebSocket(session, request)

    // two types of incoming websocket connections
    //  - to Hello Decco (from Decco)
    //  - to Decco (from Hello Decco)
    // the former is in charge of creating the websocket server
    // the latter find and connect to it
    let path = request.url.split('?')[0]
    if(path=='/to-hello-decco') await startWebSocketServer(request, socket, head, webSocketServers)
    else if(path=='/to-decco') await startWebSocketClient(request, socket, head, webSocketServers)
    else throw new Error('Invalid websocket path')
  }
  catch(error) {
    console.log('WebSocket Error')
    console.error(error)
    socket.destroy()
  }
}
