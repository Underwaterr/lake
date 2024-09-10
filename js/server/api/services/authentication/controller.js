import model from './model.js'

export default {
  async login(request, response, next) {

    try {
      let email = request.body.email
      let password = request.body.password
      let user = await model.loginUser(email, password)

      request.session.authenticated = true
      request.session.user = user

      // call `response.json` inside the `request.session.save` callback
      // this avoids a race condition
      request.session.save(()=> {
        response.json(user)
      })
    }
    catch(error) {
      next(error)
    }
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
