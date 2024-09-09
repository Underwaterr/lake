import reject from './reject.js'


let getParametersFromUrl = url=> new URLSearchParams(url.split('?')[1])

let fakeAuth = async droneName=> true

export default async function(chest) {

  let { request } = chest

  let parameters = getParametersFromUrl(chest.request.url)
  let droneName = parameters.get('drone')

  let authenticated = request.session && request.session.authenticated
  if (!authenticated) throw new Error('Not authenticated', { cause: chest })

  let authorized = await fakeAuth(droneName)
  if(authorized) return { droneName, ...chest }
  else throw new Error('Not authorized', { cause: chest })

}
