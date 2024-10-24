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
      //let boundingBox = request.query['bounding-box']
      let boundingBox = '-97.76454448699953,30.254841317410484,-97.72167205810547,30.27956387570935'
      let sseSession = await createSession(request, response)
      let file = await model.elevationModel(boundingBox, sseSession)
      sseSession.push(file, "complete")
      response.end()
    }
    catch(error) { next(error) }
  }
}
