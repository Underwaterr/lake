import webSocketStore from '../../../web-socket/store.js'

export default {

  async webSockets(request, response) {
    console.log(webSocketStore.getStore())
    response.json(webSocketStore.getStore())
  },
}
