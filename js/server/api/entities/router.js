import Router from '@koa/router'

export default new Router()
  .get('/entities', ctx=> ctx.body = 'test entities endpoint')
