import { Router } from 'express'
import authenticationRouter from './authentication/router.js'
import checkAuthentication from '../../middleware/check-authentication.js'
import cortexRouter from './cortex/router.js'

let router = new Router()

router.use('/authentication', authenticationRouter)
router.use(checkAuthentication)
router.use('/cortex', cortexRouter)

export default router
