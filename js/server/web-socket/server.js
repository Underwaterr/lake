import { WebSocketServer } from 'ws'
import store from './store.js'

export default function(request, socket, head, webSocketServers) {
  return new Promise((resolve, reject)=> {
    let webSocketServer = new WebSocketServer({ noServer: true })
    webSocketServer.handleUpgrade(request, socket, head, webSocket=> {

      let organizationId = request.session.organization.id
      let organizationName = request.session.organization.name
      let deccoId = request.session.decco.id
      let deccoName = request.session.decco.name

      webSocket.on('connection', ()=> {
        console.log('WOOOO')
      })

      webSocket.on('open', ()=> {
        console.log('YEAHHH')
      })

      webSocket.on('close', ()=> {

        // Log the event
        console.log(`${organizationName}'s ${deccoName} has disconnected!`)

        // disconnect from all clients
        let clients = store.getClients(organizationId, deccoId)
        clients.forEach(ws=> { ws.terminate() })

        // Update the store
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
