// TODO:
// add validation layer

export default function(model, overrides={}) {
  let defaults = {
    async create(request, response) {
      let data = request.body
      response.json(await model.create(data))
    },
    async getAll(request, response) {
      response.json(await model.getAll())
    },
    async getById(request, response) {
      let id = request.params['id']
      response.json(await model.getById(id))
    },
    async update(request, response) {
      let data = request.body
      let id = request.params['id']
      response.json(await model.update(id, data))
    },
    async delete(request, response) {
      let id = request.params['id']
      response.json(await model.delete(id))
    }
  }

  return { ...defaults, ...overrides }
}
