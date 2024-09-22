// web socket servers are grouped by organization id
// servers are referenced by decco id
// clients are referenced by user id
let webSocketStore = new Map()

export default {

  getClients(organizationId, deccoId) {
    return webSocketStore
      .get(organizationId).webSocketServers
      .get(deccoId).clients

  },

  getStore() {
    return webSocketStore
  },

  removeServer(organizationId, deccoId) {
    webSocketStore
      .get(organizationId).webSocketServers
      .delete(deccoId)
  },

  storeServer(decco, organization, webSocketServer) {

    // add organization if it's not already there
    if(!webSocketStore.has(organization.id)) {
      webSocketStore.set(organization.id, {
        organizationName: organization.name,
        webSocketServers: new Map()
      })
    }

    // throw error if web socket server already exists!
    else if(webSocketStore.get(organization.id).webSocketServers.has(decco.id)) {
      throw new Error('WebSocket server already exists')
    }

    // add webSocketServer to the webSocketStore
    webSocketStore
      .get(organization.id).webSocketServers
      .set(decco.id, {
        deccoName: decco.name,
        webSocket: webSocketServer,
        clients: new Map(),
        createdAt: Date.now()
      })

    // Log the event!
    console.log(`${organization.name}'s ${decco.name} has connected!`)

  },

  storeClient(user, decco, webSocketClient) {

    /*
    // organization should already be there!
    if(!webSocketStore.has(organization.id)) {
      throw new Error('WebSocket organization not found')
    }
    // Web Socket server definitely needs to be there
    else if(!webSocketStore.get(organization.id).has(decco.id)) {
      throw new Error('WebSocket server not found')
    }
    */

    let server = webSocketStore
      .get(organization.id)
      .get(decco.id).socket

    let webSocketClientStore = {
      userEmail: user.email,
      socket: webSocketClient,
      createdAt: Date.now()
    }

    webSocketStore
      .get(organization.id)
      .get(decco.id).clients
      .set(user.id, webSocketClient)

    return webSocketClient
  }


}
