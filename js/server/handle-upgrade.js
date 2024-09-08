export default session=> (request, socket, head)=> {
  // When handling websocket upgrade, include session data
  session(request, {}, ()=> {
    webSocket(request, socket, head)
  })
}
