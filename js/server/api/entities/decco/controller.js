import model from './model.js'
import { defaultValidator, setStatusValidator } from './validator.js'
import createController from '../create-controller.js'

export default createController(model, defaultValidator, {})
