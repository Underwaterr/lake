import sse from 'better-sse'
let { createSession } = sse

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
      let boundingBox = request.query['bounding-box']
      let sseSession = await createSession(request, response)
      let file = await model.elevationModel(boundingBox, sseSession)
      response.end()
    }
    catch(error) { next(error) }
  }
}
