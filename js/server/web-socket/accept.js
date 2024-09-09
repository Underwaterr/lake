import WebSocket from 'ws'
import droneModel from '../../api/entities/drone/model'

let handleUpgrade = function(server, { request, socket, head, path }) {
  return new Promise((resolve, reject)=> {
    server.handleUpgrade(request, socket, head, client=> {
      server.emit('connection', client, request, path)
      resolve(client)
    })
  })
}

export default async function(chest) {
  let server = chest.webSocketServers.get(chest.droneName)
  let client: WebSocket = await handleUpgrade(server, chest)

  server.on('connection', ()=> {
    droneModel.setStatus(chest.droneName, 'STANDBY')
  })

  return { client, server, ...chest }
}
