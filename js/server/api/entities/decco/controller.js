import model from './model.js'
import { defaultValidator, setStatusValidator } from './validator.js'
import createController from '../create-controller.js'

export default createController(model, defaultValidator, {
  async setStatus(request, response, next) {
    try {
      let id = request.params['id']
      let { status } = await setStatusValidator.validate(request.body)
      let result = await model.setStatus(id, status)
      response.json(result)
    }
    catch(error) {
      next(error)
    }
  }
})
