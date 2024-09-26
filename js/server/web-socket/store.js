// web socket servers are grouped by organization id
// servers are referenced by decco id
// clients are referenced by user id
let webSocketStore = new Map()

export default {

  getServer(organizationId, deccoId) {
    return webSocketStore
      .get(organizationId).webSocketServers
      .get(deccoId)
  },

  checkIfTaken(organization, decco) {

    // add organization if it's not already there
    let hasOrganization = webSocketStore.has(organization.id)
    if(!hasOrganization) {
      webSocketStore.set(organization.id, {
        organizationName: organization.name,
        webSocketServers: new Map()
      })
      // we can safely assume the server is available
      // since the organization is not there
      return false
    }

    // check if the decco is already there,
    // if so return true!
    let serverIsTaken = webSocketStore.get(organization.id).webSocketServers.has(decco.id)
    return serverIsTaken
  },

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
    webSocketStore
      .get(organization.id).webSocketServers
      .set(decco.id, {
        deccoName: decco.name,
        webSocket: webSocketServer,
        clients: new Map(),
        createdAt: Date.now()
      })
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
