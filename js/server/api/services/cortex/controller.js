import model from './model.js'
import { centroidSplitterValidator, generateElevationModelValidator } from './validator.js'

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

  async generateElevationModel(request, response, next) {
    try {
      let { boundingBox } = await generateElevationModelValidator.validate(request.body)
      let result = await model.generateElevationModel(boundingBox)
      response.json(result)
    }
    catch(error) { next(error) }
  }
}
