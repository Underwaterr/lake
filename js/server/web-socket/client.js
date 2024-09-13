export default function(request, socket, head, webSocketServers) {
  let parameters = getParametersFromUrl(request.url)
  let webSocketServerName = parameters.get('decco')
  let webSocketServer = webSocketServers.get(webSocketServerName)
  webSocketServer.handleUpgrade(request, socket, head, webSocket=> {
    // TODO: update decco status!
    webSocket.on('error', console.error)
    webSocket.on('message', message=> console.log(message.toString()))
    webSocket.on('close', ()=> {}) // todo: delete from map
  })
}
