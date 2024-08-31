import Router from '@koa/router'

export default new Router()
  .get('/services', ctx=> ctx.body = 'test services endpoint')
