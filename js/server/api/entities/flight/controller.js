import model from './model.js'
import validator from './validator.js'
import createController from '../create-controller.js'

export default createController(model, validator, {
  async addPoint(request, response, next) {
    try {
      let id = request.params['id']
      let data = request.body
      response.json(await model.addPoint(id, data))
    }
    catch(error) { next(error) }
  }
})
