import 'dotenv/config'

let url = process.env['URL']
let cookie = null

async function getCookie() {
  let user = {
    email: process.env['EMAIL'],
    password: process.env['PASSWORD']
  }
  let fetchOptions = {
    method: 'POST',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  }
  let response = await fetch(url + 'authentication/user', fetchOptions)
  cookie = response.headers.get('set-cookie')
}

export default async function(method='GET', endpoint, body=null) {

  if(cookie == null) await getCookie()

  let fetchOptions = {
    method,
    credentials: 'include',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cookie': cookie
    },
    body: body ? JSON.stringify(body) : null
  }
  let response = await fetch(url + endpoint, fetchOptions)
  return response.json()
}
