// web socket servers are grouped by organization id
// servers are referenced by decco id
// clients are referenced by user id
let organizations = new Map()

export default {

  storeServer(organization, decco, webSocketServer) {

    // add organization if it's not already there
    if(!organizations.has(organization.id)) {
      let organization = {
        organizationName: organization.name,
        webSocketServers: new Map()
      }
      organizations.set(organization.id, organization)
    }

    // throw error if web socket server already exists!
    else if(organizations.get(organization.id).has(decco.id)) {
      throw new Error('WebSocket server already exists')
    }

    let webSocketServerStore = {
      deccoName: decco.name,
      webSocket: webSocketServer,
      clients: new Map(),
      createdAt: Date.now()
    }

    organizations
      .get(organization.id)
      .set(decco.id, webSocketServer)

    return webSocketServer
  },

  storeClient(user, decco, webSocketClient) {

    /*
    // organization should already be there!
    if(!organizations.has(organization.id)) {
      throw new Error('WebSocket organization not found')
    }
    // Web Socket server definitely needs to be there
    else if(!organizations.get(organization.id).has(decco.id)) {
      throw new Error('WebSocket server not found')
    }
    */

    let server = organizations
      .get(organization.id)
      .get(decco.id).socket

    let webSocketClientStore = {
      userEmail: user.email,
      socket: webSocketClient,
      createdAt: Date.now()
    }

    organizations
      .get(organization.id)
      .get(decco.id).clients
      .set(user.id, webSocketClient)

    return webSocketClient
  }

}
