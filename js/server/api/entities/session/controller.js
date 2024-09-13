import model from './model.js'

export default {
  async getAll(request, response) {
    response.json(await model.getAll())
  },
  async destroy(request, response) {
    let sid = request.params['sid']
    response.json(await model.destroy(sid))
  }
}
