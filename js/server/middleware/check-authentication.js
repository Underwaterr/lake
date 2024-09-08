export default function(request, response, next) {
  if(request.session.authenticated) next()
  else {
    console.log('missing authentication, request rejected')

    // Don't send descriptive error messages in production
    process.env.NODE_ENV == 'production'
      ? response.status(500).end()
      : response.status(403).end()
  }
}
