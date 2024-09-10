//import startWebSocket from './web-socket/start.js'

export default session=> (request, socket, head)=> {
  // When handling websocket upgrade, include session data
  session(request, {}, ()=> {
    //startWebSocket(request, socket, head)
  })
}
