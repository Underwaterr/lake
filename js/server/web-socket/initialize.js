import { WebSocketServer } from 'ws'


export default function(chest) {

  let socketAlreadyExists = chest.webSocketServers.has(chest.droneName)
  if(socketAlreadyExists) throw new Error('Socket already initialized', { cause: chest })

  let webSocketServer = new WebSocketServer({ noServer: true })

  //a listener to add a new ws to the WSserver
  webSocketServer.on('connection', (ws, request, path) => {
    //set a property on the websocket object to identify its direction
    ws.path = path

    //set a listener for messages to each client added to the server
    ws.on('message', message => {
      //remove any parameters
        //could this be useful when clients are subscribing to mulitple drones?
      let url = request.url.split('?')[0]
      webSocketServer.clients.forEach(client => {
        //if the destination and the source don't match, then send the message
        //this avoids sending any message back to their source
        if(client.path != url) client.send(message)
      })
    })
  });

  chest.webSocketServers.set(chest.droneName, webSocketServer)
  return chest
}
