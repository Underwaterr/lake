import authenticate from './web-socket/authenticate.js'
import startWebSocketServer from './web-socket/server.js'
import startWebSocketClient from './web-socket/client.js'
import webSocketStore from './web-socket/store.js'

export default session=> async (request, socket, head)=> {
  try {

    // check authentication
    await authenticate(session, request)

    // two types of incoming websocket connections
    //  - to Hello Decco (from Decco)
    //  - to Decco (from Hello Decco)
    // the former is in charge of creating the base websocket connection
    // which we refer to as the "server" (tho it really isn't!)
    // the latter find and connect to it
    let path = request.url.split('?')[0]

    if(path=='/to-hello-decco') {
      let { decco, organization } = request.session

      // did this decco already connect?
      let isTaken = webSocketStore.checkIfTaken(organization, decco)

      if(!isTaken) {
        let webSocketServer = await startWebSocketServer(request, socket, head)
        webSocketStore.storeServer(decco, organization, webSocketServer)
      }
      else socket.end()
    }
    else if(path=='/to-decco') {
      await startWebSocketClient(request, socket, head)
    }
    else throw new Error('Invalid WebSocket Path')
  }
  catch(error) {
    console.log('WebSocket Error')
    console.error(error)
    socket.destroy()
  }
}
