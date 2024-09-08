export default {
  async login(request, response, next) {
    let user = { id: 0, username: 'fake' }
    request.session.authenticated = true
    request.session.user = user
    response.json(user)
  },
  async logout(request, response, next) {
    request.session.destroy(error=> {
      if(error) next(error)
      else {
        response.clearCookie()
        response.json({ok: true})
      }
    })
  },
  async check(request, response) {
    if(request.session.authenticated) response.json(request.session.user)
    else response.json(null)
  },
}
