//import defaultController from 

let defaults = {
  async create(ctx) {
    ctx.body = 'default create'
  },
  async getAll(ctx) {
    ctx.body = 'default get all'
  },
  async getById(ctx) {
    ctx.body = 'default get by id'
  },
  async update(ctx) {
    ctx.body='default update'
  },
  async delete(ctx) {
    ctx.body = 'default delete'
  }
}

let overrides = {
}

export default {
  ...defaults,
  ...overrides
}
