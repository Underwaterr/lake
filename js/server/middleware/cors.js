export default function(request, response, next) {

  // Mitigate XSS and data injection attacks
  // Requires all content to come from the site's own origin
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  response.header("Content-Security-Policy", "default-src 'self'")

  // Isolate browsing context exclusively to same-origin documents
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy
  response.header("Cross-Origin-Opener-Policy", "same-origin")

  // Omit Referer request header
  // https://developer.mozilla.org/en-US/docs/Web/Security/Referer_header:_privacy_and_security_concerns
  response.header("Referrer-Policy", "no-referrer")

  response.header("X-Frame-Options", "deny")
  response.header("X-Download-Options", "noopen")
  response.header("X-Content-Type-Options", "nosniff")
  response.header("X-Permitted-Cross-Domain-Policies", "none")

  response.header("Access-Control-Allow-Origin", process.env.FRONT_END_URL)
  response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  response.header("Access-Control-Allow-Credentials", "true")
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  if(request.method == 'OPTIONS') {
    console.log(
      ' ',
      request.ip.includes('::ffff:') 
        ? request.ip.split(':').reverse()[0] 
        : request.ip,
      request.method
    )
    response.end()
  }
  else next()
}
