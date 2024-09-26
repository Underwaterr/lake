import model from './model.js'
import validator from './validator.js'
import createController from '../create-controller.js'

export default createController(model, validator, {

    async getAll(request, response) {
      let flightId = request.query['flightId']
      response.json(await model.getAll(flightId))
    },
})
