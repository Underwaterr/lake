import { WebSocketServer } from 'ws'

export default function(request, socket, head, webSocketServers) {
  return new Promise((resolve, reject)=> {
    let webSocketServer = new WebSocketServer({ noServer: true })
    webSocketServer.handleUpgrade(request, socket, head, webSocket=> {
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
