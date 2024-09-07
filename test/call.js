let url = 'http://localhost:9000/'

export default async function(endpoint, method='GET', body=null) {
  let fetchOptions = {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  let response = await fetch(url + endpoint, fetchOptions)
  return response.json()
}
