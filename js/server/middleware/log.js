export default function (request, response, next) {

  console.log(

    // Timestamp
    // `MM/DD/YYYY HH:MM::SS a` format
    new Date().toLocaleString(),

    // log if session is authenticated
    request.session.authenticated ? '✓' : ' ',

    // Log IP address
    request.ip.includes('::ffff:')
      ? request.ip.split(':').reverse()[0]
      : request.ip,

    // Log Request Method + Path
    request.method,
    request.path
  )

  next()
}
