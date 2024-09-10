import model from './model.js'
import validator from './validator.js'

export default {
  async centroidSplitter(request, response, next) {
    try {
      let data = await validator.validate(request.body)
      let raw = JSON.stringify(data)
      let result = await model.centroidSplitter(raw)
      response.json(result)
    }
    catch(error) {
      next(error)
    }
  }
}
