export default async function(session, request) {
  return new Promise((resolve, reject)=> {
    session(request, {}, ()=> {
      if (request.session.authenticated) resolve()
      else reject(new Error('authentication failed'))
    })
  })
}
