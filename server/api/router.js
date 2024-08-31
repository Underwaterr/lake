import Router from '@koa/router'
import entitiesRouter from './entities/router.js'
import servicesRouter from './services/router.js'

// Services router should come before entities router
// otherwise all services will require authentication
// and then users won't be able to log in!
export default new Router()
  .use(servicesRouter.routes())
  .use(entitiesRouter.routes())
