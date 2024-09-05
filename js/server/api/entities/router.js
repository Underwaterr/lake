import Router from '@koa/router'
import organizationRouter from './organization/router.js'

export default new Router()
  .use('/organization', organizationRouter.routes())
