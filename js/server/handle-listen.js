export default httpServer=> ()=> {

  // log when the server started
  let timestampLocaleOptions = { timeZone: 'America/New_York' }
  let timestamp = new Date().toLocaleString('en-US', timestampLocaleOptions)
  process.stdout.write(`Server started at ${timestamp}\n`)

  // log the IP address of the server
  let addressInfo = httpServer.address()
  process.stdout.write(`${addressInfo.address}:${addressInfo.port}\n`)
}
