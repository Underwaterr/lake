import model from './model.js'
import validator from './validator.js'
import createController from '../create-controller.js'

export default createController(model, validator, {})
