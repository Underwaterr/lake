import vine from '@vinejs/vine'

export default function(model, validator, overrides={}) {
  let defaults = {

    async create(request, response, next) {
      try {
        let data = await validator.validate(request.body)
        response.json(await model.create(data))
      }
      catch(error) { next(error) }
    },

    async getAll(request, response) {
      response.json(await model.getAll())
    },

    async getById(request, response) {
      let id = request.params['id']
      response.json(await model.getById(id))
    },

    async update(request, response, next) {
      try {
        let id = request.params['id']
        let data = request.body
        response.json(await model.update(id, data))
      }
      catch(error) { next(error) }
    },

    async destroy(request, response) {
      let id = request.params['id']
      response.json(await model.destroy(id))
    }
  }

  return { ...defaults, ...overrides }
}
