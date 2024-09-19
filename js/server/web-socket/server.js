import { WebSocketServer } from 'ws'
import store from './store.js'

export default function(request, socket, head, webSocketServers) {
  return new Promise((resolve, reject)=> {
    let webSocketServer = new WebSocketServer({ noServer: true })
    webSocketServer.handleUpgrade(request, socket, head, webSocket=> {
      webSocket.on('close', ()=> {

        // Log the event
        let deccoName = request.session.decco.name
        let organizationName = request.session.organization.name
        console.log(`${organizationName}'s ${deccoName} has disconnected!`)

        // Update the store
        let organizationId = request.session.organization.id
        let deccoId = request.session.decco.id
        store.removeServer(organizationId, deccoId)
      })
      webSocket.on('error', ()=> { console.log('OH NO WEBSOCKET ERROR!') })
      resolve(webSocket)
    })
  })
}


    /*
    let decco = request.session.decco
    let webSocketServerName = `${decco.organizationId}_${decco.name}`

    // web socket server needs to be unique
    if(webSocketServers.has(webSocketServerName)) {
      reject(new Error('web socket server alreay exists'))
    }

    let webSocketServer = new WebSocketServer({ noServer: true })
    webSocketServers.set(webSocketServerName, webSocketServer)
    webSocketServer.handleUpgrade(request, socket, head, webSocket=> {
      webSocket.on('error', console.error)
      webSocket.on('message', message=> {
        webSocketServer.clients.forEach(client=> {
          // TODO:
          // only send message if the destination & source paths don't match
          // this avoids sending messages back to their source
          client.send(message)
        })
      })
      webSocket.on('close', ()=> {
        webSocketServers.delete(webSocketServerName)
        // TODO: update decco status!
      })
      resolve()
    })
  })
}
*/
