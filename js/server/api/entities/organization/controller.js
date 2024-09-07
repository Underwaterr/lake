import model from './model.js'

export default {
  async create(ctx) {
    let organization = ctx.request.body
    ctx.body = await model.create(organization)
  },
  async getAll(ctx) {
    ctx.body = await model.getAll()
  },
  async getById(ctx) {
    let id = ctx.params['id']
    ctx.body = await model.getById(id)
  },
  async update(ctx) {
    let organization = ctx.request.body.organization
    let id = ctx.params['id']
    ctx.body = await model.update(id, organization)
  },
  async delete(ctx) {
    let id = ctx.params['id']
    ctx.body = await model.delete(id)
  }
}
