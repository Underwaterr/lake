import model from './model.js'
import { loginUserValidator, loginDeccoValidator } from './validators.js'

export default {

  async loginUser(request, response, next) {
    try {
      let { email, password } = await loginUserValidator.validate(request.body)
      let user = await model.loginUser(email, password)

      request.session.authenticated = true
      request.session.user = user

      // call `response.json` inside the `request.session.save` callback
      // this avoids a race condition
      request.session.save(()=> { response.json(user) })
    }
    catch(error) {
      next(error)
    }
  },

  async loginDecco(request, response, next) {
    try {
      let { name, organizationId, password } = await loginDeccoValidator.validate(request.body)
      let decco = await model.loginDecco(name, organizationId, password)

      request.session.authenticated = true
      request.session.decco = decco

      request.session.save(()=> { response.json(decco) })
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
