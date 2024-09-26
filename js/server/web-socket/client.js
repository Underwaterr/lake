export default function(webSocket) {
  webSocket.on('error', console.error)
  webSocket.on('message', message=> console.log(message.toString()))
  webSocket.on('close', ()=> {console.log('web socket close event')}) // todo: delete from map
}
