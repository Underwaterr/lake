import model from './model.js'
import { centroidSplitterValidator, elevationModelValidator } from './validator.js'

export default {

  async centroidSplitter(request, response, next) {
    try {
      let data = await centroidSplitterValidator.validate(request.body)
      let raw = JSON.stringify(data)
      let result = await model.centroidSplitter(raw)
      response.json(result)
    }
    catch(error) { next(error) }
  },

  async elevationModel(request, response, next) {
    try {
      let { boundingBox } = await elevationModelValidator.validate(request.body)
      let result = await model.elevationModel(boundingBox)
      response.json(result)
    }
    catch(error) { next(error) }
  }
}
