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
      if(deccoAlreadyConnected) throw new Error(`Decco ${decco.name} already connected`)

      // create the "server"
      let webSocketServer = new WebSocketServer({ noServer: true })

      // store it
      webSocketStore.storeServer(organization, decco, webSocketServer)

      // events wow
      webSocketServer.on('connection', (ws, request, path)=> {

        if (request.session.decco) {
          console.log(`${organization.name}'s ${decco.name} has connected!`)
        }
        else {
          console.log(
            request.session.user.name,
            'has connected to',
            organization.name, decco.name
          )
        }

        // set a property on the websocket object to identify its direction
        ws.path = path
        // set a listener for messages to each client added to the server
        ws.on('message', message=> {
          let url = request.url.split('?')[0]
          webSocketServer.clients.forEach(client => {
            // if the destination and the source don't match, then send the message
            // this avoids sending any message back to their source
            if(client.path != url) client.send(message)
          })
        })
      })

      // now upgrade!
      webSocketServer.handleUpgrade(request, socket, head, webSocket=> {
        //console.log(`${organization.name}'s ${decco.name} has connected!`)

        webSocketServer.emit('connection', webSocket, request, path)

        webSocket.on('close', ()=> {
          // Log the event
          let organizationName = request.session.organization.name
          let deccoName = request.session.decco.name
          console.log(`${organizationName}'s ${deccoName} has disconnected!`)

          // disconnect from all clients
          let clients = webSocketServer.clients
          clients.forEach(ws=> {
            // todo: format in topic/gossip form!
            //ws.send('web socket server closed')
            ws.terminate()
          })

          // Update the store
          //store.removeServer(organization.id, decco.id)
        })

        webSocket.on('error', ()=> { console.error('OH NO WEBSOCKET ERROR!!') })
      })
    }

    else if(path=='/to-decco') {

      // get query parameter
      // we gotta do this b/c we aren't using Express
      let parsedUrl = url.parse(request.url, true)
      let deccoId = parseInt(parsedUrl.query['deccoId'])

      // get the organization form the session
      let organizationId = request.session.user.organizationId

      let webSocketServer = webSocketStore.getServer(organizationId, deccoId)
      webSocketServer.handleUpgrade(request, socket, head, webSocket=> {
        webSocketServer.emit('connection', webSocket, request, path)
      })

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
