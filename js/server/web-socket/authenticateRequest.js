import reject from './reject.js'
import model from '../../api/services/authentication/model'


let authenticate = model.authenticateDrone

let parseAuthToken = authToken=>
  atob(authToken.split(" ")[1]).split(":")


export default async function(chest) {

  // check the request header for the authorization token
  let authToken = chest.request.headers.authorization

  // if no authentication token is found, authentication fails
  if (authToken == null) 
    throw new Error('WebSocket connection rejected; missing auth token', { cause: chest })

  // parse the username & password from the auth token
  // "username" is the drone's name, "password" is their secret key
  let [ username, password ] = parseAuthToken(authToken)

  // confirm our secret key is valid with the drone model's authenticate method
  try {
    let authorized = await authenticate(username, password)
    if(authorized) return { droneName: username, ...chest }
    else throw new Error('not authorized', { cause: chest })
  }
  catch(error) {
  }
}
