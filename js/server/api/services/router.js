import Router from '@koa/router'

export default new Router()
  .get('/test', ctx=> ctx.body = 'test services endpoint')
