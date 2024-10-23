export default function (request, response, next) {

  console.log(

    // Timestamp
    // `MM/DD/YYYY HH:MM::SS a` format
    new Date().toLocaleString(),

    // log if session is authenticated
    request.session.authenticated ? '✓' : ' ',

    /* Don't bother logging the IP address
       since it's behind a proxy in production
       and just shows up as localhost */

    // Log Request Method + Path
    request.method,
    request.path
  )

  next()
}
