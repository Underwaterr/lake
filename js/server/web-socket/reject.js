export default function(error) {
  console.log(error.message)

  //Adding conditional as a stop-gap until permanent fix
  if(error.cause && error.cause.chest){
    let socket = error.cause.chest.socket
    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
    socket.destroy()
  }
}
