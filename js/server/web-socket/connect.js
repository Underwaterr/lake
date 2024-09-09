export default function(chest) {
  let serverDoesNotExist = !(chest.webSocketServers.has(chest.droneName))
  if(serverDoesNotExist) throw new Error('server does not exist', { cause: chest })
  else return chest
}
