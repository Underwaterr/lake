import { WebSocketServer } from 'ws'
import url from 'node:url'
import authenticate from './web-socket/authenticate.js'
import onUpgrade from './web-socket/server.js'
import onClientUpgrade from './web-socket/client.js'
import startWebSocketClient from './web-socket/client.js'
import webSocketStore from './web-socket/store.js'

export default session=> async (request, socket, head)=> {
  try {
    // check authentication
    // they should already be logged in before sending an upgrade request
    await authenticate(session, request)

    // two types of incoming websocket connections
    //  - to Hello Decco (from Decco)
    //  - to Decco (from Hello Decco)
    // the former puts the Decco in charge of the base websocket connection
    // which we refer to as the "server" (tho it really isn't!)
    // the latter lets users connect to it, our "clients"
    let path = request.url.split('?')[0]

    if(path=='/to-hello-decco') {

      // get the organization and decco data from session
      let organization = request.session.organization
      let decco = request.session.decco

      // is that Decco already connected?
      let deccoAlreadyConnected = webSocketStore.check(organization.id, decco.id)
      if(deccoAlreadyConnected) throw new Error('Decco already connected')

      // create the "server"
      let webSocketServer = new WebSocketServer({ noServer: true })

      // store it
      webSocketStore.storeServer(organization, decco, webSocketServer)

      // now upgrade!
      webSocketServer.handleUpgrade(request, socket, head, onUpgrade(organization, decco))
    }

    else if(path=='/to-decco') {

      // get query parameter
      // we gotta do this b/c we aren't using Express
      let parsedUrl = url.parse(request.url, true)
      let deccoId = parseInt(parsedUrl.query['decco'])

      // get the organization form the session
      let organizationId = request.session.user.organizationId

      let webSocketServer = webSocketStore.getServer(organizationId, deccoId)
      webSocketServer.handleUpgrade(request, socket, head, onClientUpgrade)

      // TODO: store client!!
    }

    else throw new Error('Invalid WebSocket Path')
  }

  catch(error) {
    console.log('WebSocket Error')
    console.error(error)

    socket.write('HTTP/1.1 500 Internal Server Error\r\n\r\n')
    socket.destroy()
  }

}
