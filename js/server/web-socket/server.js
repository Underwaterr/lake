import { WebSocketServer } from 'ws'
import store from './store.js'

let onClose = (organization, decco)=> ()=> {
  // Log the event
  console.log(`${organization.name}'s ${decco.name} has disconnected!`)

  // disconnect from all clients
  let clients = store.getClients(organization.id, decco.id)
  clients.forEach(ws=> { ws.terminate() })

  // Update the store
  store.removeServer(organization.id, decco.id)
}

export default (organization, decco)=> webSocket=> {
  console.log(`${organization.name}'s ${decco.name} has connected!`)
  webSocket.on('close', onClose(organization, decco))
  webSocket.on('error', ()=> { console.error('OH NO WEBSOCKET ERROR!!') })
  webSocket.emit('connection', webSocket)

  // TODO: set Decco status to 'STANDBY'

}
