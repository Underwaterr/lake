let url = 'http://localhost:9000/'


let cookie = null

async function getCookie() {
  let response = await fetch(url + 'login', { method: 'POST' })
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
