import decco from '../api/entities/decco/model.js'

export default function(chest) {
  let { client, server, webSocketServers, droneName } = chest
  client.on('close', ()=> {
    webSocketServers.get(droneName).close()
    webSocketServers.delete(droneName)
    deccoModel.setStatus(droneName, 'OFFLINE')
  })
  return chest
}
