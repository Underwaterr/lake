import { Router } from 'express'
import authenticationRouter from './authentication/router.js'
import checkAuthentication from '../../middleware/check-authentication.js'
import cortexRouter from './cortex/router.js'
import monitorRouter from './monitor/router.js'

let router = new Router()

// These routes don't check authentication
router.use('/authentication', authenticationRouter)

// These will
router.use(checkAuthentication)
router.use('/cortex', cortexRouter)
router.use('/monitor', monitorRouter)

export default router
