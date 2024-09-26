import url from 'node:url'
import store from './store.js'

// we gotta do this b/c we aren't using Express
// thus we can't just do `request.query`
let getDeccoId = function(request) {
  let parsedUrl = url.parse(request.url, true)
  return parseInt(parsedUrl.query['decco'])
}

export default function(request, socket, head) {

  let organizationId = request.session.user.organizationId
  let deccoId = getDeccoId(request)

  let webSocketServer = store.getServer(organizationId, deccoId)

  /*
  return new Promise((resolve, reject)=> {
    webSocketServer.handleUpgrade(request, socket, head, webSocket=> {
      resolve(webSocket)
    })
  })
  */
}

/*
    let parameters = getParametersFromUrl(request.url)
    let webSocketServerName = parameters.get('decco')
    let webSocketServer = webSocketServers.get(webSocketServerName)
    webSocketServer.handleUpgrade(request, socket, head, webSocket=> {
      resolve(webSocket)
      // TODO: update decco status!

      /*
      webSocket.on('error', console.error)
      webSocket.on('message', message=> console.log(message.toString()))
      webSocket.on('close', ()=> {}) // todo: delete from map
    })
  })
}
*/
