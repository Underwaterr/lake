// web socket servers are grouped by organization id
// servers are referenced by decco id
// clients are referenced by user id
let webSocketStore = new Map()

export default {

  getServer(organizationId, deccoId) {

    if (!webSocketStore.has(organizationId)) {
      throw new Error(`Organization ${organizationId} not in web socket store!`)
    }
    else if (!webSocketStore.get(organizationId).webSocketServers.has(deccoId)) {
      throw new Error(`Decco ${deccoId} not found in web socket store!`)
    }
    else return webSocketStore
      .get(organizationId).webSocketServers
      .get(deccoId).webSocket
  },

  check(organizationId, deccoId) {
    return
      webSocketStore.has(organizationId) &&
      webSocketstore.get(organizationId).webSocketServers.has(deccoId)
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

  storeServer(organization, decco, webSocketServer) {
    // add organization if it's not already there
    if(!webSocketStore.has(organization.id)) {
      webSocketStore.set(organization.id, {
        organizationName: organization.name,
        webSocketServers: new Map()
          .set(decco.id, {
            deccoName: decco.name,
            webSocket: webSocketServer,
            clients: new Map(),
            createdAt: Date.now()
          })
      })
    }
    // otherwise, add to existing organization
    else {
      webSocketStore
        .get(organization.id).webSocketServers
        .set(decco.id, {
          deccoName: decco.name,
          webSocket: webSocketServer,
          clients: new Map(),
          createdAt: Date.now()
        })
    }
  }
}
