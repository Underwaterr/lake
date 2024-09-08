import { Router } from 'express'
import entitiesRouter from './entities/router.js'
import servicesRouter from './services/router.js'

// Services router should come before entities router
// otherwise all services will require authentication
// and then users won't be able to log in!
let router = new Router()
router.use(servicesRouter)
router.use(entitiesRouter)

export default router
