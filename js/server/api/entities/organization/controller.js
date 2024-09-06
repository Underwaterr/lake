import model from './model.js'

let defaults = {
  async create(ctx) {
    ctx.body = await model.create()
  },
  async getAll(ctx) {
    ctx.body = { ok: true }
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
