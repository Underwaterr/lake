import webSocketStore from '../../../web-socket/store.js'

export default {

  async webSockets(request, response) {
    let organizationId = parseInt(request.query['organizationId'])
    let store = webSocketStore.getStore()
    console.log(store)
    response.json(store.get(organizationId))
  },
}
