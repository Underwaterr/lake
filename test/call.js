let url = 'http://localhost:9000/'


let cookie = null

async function getCookie() {
  let user = {
    email: "test@example.com",
    password: "1234"
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

export default async function(endpoint, method='GET', body=null) {

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
